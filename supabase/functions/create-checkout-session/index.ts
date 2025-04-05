
import { Stripe } from 'https://esm.sh/stripe@12.0.0?target=deno';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Handle CORS preflight requests
const handleCors = (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  return null;
};

Deno.serve(async (req) => {
  console.log("Regular donation checkout function called");
  
  // Handle CORS
  const corsResponse = handleCors(req);
  if (corsResponse) {
    return corsResponse;
  }

  try {
    // Only accept POST requests
    if (req.method !== 'POST') {
      console.log("Method not allowed:", req.method);
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        { 
          status: 405, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Get the secret key from environment variables
    const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY');
    if (!stripeSecretKey) {
      console.error('STRIPE_SECRET_KEY is not defined');
      return new Response(
        JSON.stringify({ error: 'Server configuration error' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Initialize Stripe
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2023-10-16', // Use a recent API version
      httpClient: Stripe.createFetchHttpClient(),
    });

    // Parse request body
    const requestData = await req.json();
    console.log("Request data:", JSON.stringify(requestData, null, 2));
    
    const { amount, currency = 'brl' } = requestData;
    
    if (!amount || typeof amount !== 'number') {
      console.log("Invalid amount:", amount);
      return new Response(
        JSON.stringify({ error: 'Amount is required and must be a number' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log(`Creating donation checkout session for amount: ${amount} ${currency}`);

    // Get the origin for success/cancel URLs
    const origin = req.headers.get("origin") || "https://jobish-up.vercel.app";
    console.log("Using origin for redirects:", origin);

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: currency,
            product_data: {
              name: 'Donation',
              description: 'Thank you for supporting our work!'
            },
            unit_amount: amount, // Amount in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/?donation_success=true`,
      cancel_url: `${origin}/?donation_cancel=true`,
    });

    console.log(`Created donation session: ${session.id}`);
    console.log(`Checkout URL: ${session.url}`);

    // Return the session ID
    return new Response(
      JSON.stringify({ 
        sessionId: session.id,
        url: session.url
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  } catch (error) {
    console.error('Error creating donation checkout session:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Unknown error occurred' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
