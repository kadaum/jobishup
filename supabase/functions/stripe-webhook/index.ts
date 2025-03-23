
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
    console.log("Stripe webhook function called");
    
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
      apiVersion: "2023-10-16",
    });
    
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    // Get the signature from the header
    const signature = req.headers.get("stripe-signature");
    
    if (!signature) {
      console.error("No Stripe signature in webhook request");
      return new Response(
        JSON.stringify({ error: "No signature provided" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get the raw body as text
    const body = await req.text();
    console.log("Received webhook body (length):", body.length);
    
    // Verify and construct the event
    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
    if (!webhookSecret) {
      console.error("Missing STRIPE_WEBHOOK_SECRET environment variable");
      return new Response(
        JSON.stringify({ error: "Webhook secret not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    let event;
    
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
      console.log("Webhook event constructed successfully:", event.type);
    } catch (err) {
      console.error(`Webhook signature verification failed: ${err.message}`);
      return new Response(
        JSON.stringify({ error: `Webhook Error: ${err.message}` }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Handle the event
    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object;
      console.log("Payment succeeded for intent:", paymentIntent.id);
      
      // Update donation status in database
      const { error, data } = await supabaseClient
        .from("donations")
        .update({ status: "completed" })
        .eq("payment_intent_id", paymentIntent.id)
        .select();
      
      if (error) {
        console.error("Error updating donation:", error);
        return new Response(
          JSON.stringify({ error: "Error updating donation" }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      console.log("Donation status updated to completed:", data);
    }

    return new Response(
      JSON.stringify({ received: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error handling webhook:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
