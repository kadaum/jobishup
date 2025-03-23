
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";
import Stripe from "https://esm.sh/stripe@12.18.0?dts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: corsHeaders,
      status: 200,
    });
  }
  
  try {
    console.log("Create checkout session function called");
    
    // Get Stripe secret key from environment variables
    const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeSecretKey) {
      console.error("Missing STRIPE_SECRET_KEY environment variable");
      throw new Error("Server configuration error: missing Stripe key");
    }

    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2023-10-16",
    });

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    // Get the request payload
    const requestData = await req.json();
    const { amount, currency, successUrl, cancelUrl, userId } = requestData;
    
    console.log("Received request data:", { amount, currency, userId, successUrl, cancelUrl });
    
    if (!amount || amount <= 0) {
      throw new Error("Invalid donation amount");
    }
    
    // Create a checkout session with detailed error handling
    let session;
    try {
      session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: currency || "brl",
              product_data: {
                name: "Donation to Interview Prep",
                description: "Apoio ao projeto Interview Prep",
              },
              unit_amount: amount * 100, // Stripe expects amounts in cents
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: successUrl,
        cancel_url: cancelUrl,
        metadata: {
          userId,
        },
      });
      
      console.log("Stripe session created successfully:", session.id);
    } catch (stripeError) {
      console.error("Stripe session creation error:", stripeError);
      return new Response(
        JSON.stringify({ 
          error: "Stripe error", 
          message: stripeError.message 
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 500,
        }
      );
    }

    // Store donation in database
    try {
      const { error: insertError } = await supabaseClient.from("donations").insert({
        user_id: userId || null,
        amount,
        currency: currency || "brl",
        payment_intent_id: session.payment_intent as string,
        status: "pending",
      });

      if (insertError) {
        console.error("Error inserting donation record:", insertError);
        // Continue even if database insert fails, as the payment can still be processed
      } else {
        console.log("Donation record inserted successfully");
      }
    } catch (dbError) {
      console.error("Database error:", dbError);
      // Continue even if database insert fails, as the payment can still be processed
    }

    // Return the session ID
    return new Response(
      JSON.stringify({ 
        sessionId: session.id,
        status: "success" 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return new Response(
      JSON.stringify({ 
        error: "Failed to create checkout session", 
        message: error.message 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
