
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
    
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
      apiVersion: "2023-10-16",
    });

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    // Get the request payload
    const { amount, currency, successUrl, cancelUrl, userId } = await req.json();
    
    console.log("Received request data:", { amount, currency, userId });
    
    if (!amount || amount <= 0) {
      throw new Error("Invalid donation amount");
    }
    
    // Create a checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: currency || "brl",
            product_data: {
              name: "Donation to Interview Prep",
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

    console.log("Stripe session created:", session.id);

    // Store donation in database
    const { error: insertError } = await supabaseClient.from("donations").insert({
      user_id: userId || null,
      amount,
      currency: currency || "brl",
      payment_intent_id: session.payment_intent as string,
      status: "pending",
    });

    if (insertError) {
      console.error("Error inserting donation record:", insertError);
    } else {
      console.log("Donation record inserted successfully");
    }

    // Return the session ID
    return new Response(
      JSON.stringify({ sessionId: session.id }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
