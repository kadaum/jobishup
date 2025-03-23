import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

// Initialize Stripe with your publishable key
const stripePromise = loadStripe("pk_test_51Oi6d1Kt8rM5DFSYnFoeBHLIdBMtYpCmXhxA9FWu0vQPvyQlwAF1qU9CBRC7pPpF0eVD0jQCXeLdkFDjEEU0HKpz00VR9e1tPL");

// Predefined donation amounts
const DONATION_AMOUNTS = [
  { value: 10, label: "R$ 10" },
  { value: 25, label: "R$ 25" },
  { value: 50, label: "R$ 50" },
];

const DonationSection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(DONATION_AMOUNTS[0].value);

  const handleDonate = async () => {
    setIsLoading(true);
    
    try {
      // Get the current user (if logged in)
      const { data: { user } } = await supabase.auth.getUser();
      
      console.log("Starting donation process with amount:", selectedAmount);
      
      // Use supabase.functions.invoke() which handles authentication automatically
      const { data, error } = await supabase.functions.invoke('create-checkout-session', {
        body: {
          amount: selectedAmount,
          currency: 'brl',
          successUrl: `${window.location.origin}?donation=success`,
          cancelUrl: `${window.location.origin}?donation=canceled`,
          userId: user?.id,
        }
      });
      
      if (error) {
        console.error("Edge function error:", error);
        throw new Error(error.message || 'Failed to create checkout session');
      }
      
      console.log("Response data:", data);
      
      if (!data.sessionId) {
        console.error("No session ID received:", data);
        throw new Error('Invalid response from server');
      }
      
      // Redirect to Stripe Checkout
      const stripe = await stripePromise;
      if (stripe) {
        console.log("Redirecting to Stripe checkout with session ID:", data.sessionId);
        const { error: stripeError } = await stripe.redirectToCheckout({ sessionId: data.sessionId });
        
        if (stripeError) {
          console.error('Stripe redirect error:', stripeError);
          throw new Error(stripeError.message || 'Error redirecting to checkout');
        }
      } else {
        throw new Error('Failed to initialize Stripe');
      }
    } catch (error) {
      console.error('Donation error:', error);
      toast.error('Não foi possível processar sua doação. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  // Check for success or canceled status in URL params
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const donationStatus = urlParams.get('donation');
    
    if (donationStatus === 'success') {
      toast.success('Obrigado pela sua doação!');
      // Remove the query parameter
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (donationStatus === 'canceled') {
      toast.error('Doação cancelada.');
      // Remove the query parameter
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card className="glass-card overflow-hidden border border-white/20 p-6 relative">
        <div className="absolute -top-2 -right-2">
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          >
            <span className="inline-block bg-interview-light-purple text-interview-purple px-3 py-1 rounded-full text-sm font-medium">
              Apoie 💜
            </span>
          </motion.div>
        </div>
        
        <div className="text-center mb-6">
          <h3 className="text-xl font-medium mb-3">
            🫶 Curtiu o InterviewPrep?
          </h3>
          <p className="text-interview-dark-gray">
            Se esse plano te ajudou, você pode nos apoiar com uma doação.
          </p>
        </div>
        
        <div className="grid grid-cols-3 gap-2 mb-4">
          {DONATION_AMOUNTS.map((amount) => (
            <Button
              key={amount.value}
              variant="outline"
              onClick={() => setSelectedAmount(amount.value)}
              className={`${
                selectedAmount === amount.value
                  ? "bg-interview-light-purple border-interview-purple text-interview-purple"
                  : "bg-white text-interview-dark-gray"
              } font-medium transition-all`}
            >
              {amount.label}
            </Button>
          ))}
        </div>
        
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="flex justify-center"
        >
          <Button 
            onClick={handleDonate}
            disabled={isLoading}
            className="bg-white border border-interview-purple text-interview-purple hover:bg-interview-light-purple hover:text-interview-purple/90 button-hover shadow-sm w-full"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin h-4 w-4 border-2 border-interview-purple border-t-transparent rounded-full mr-2" />
                Processando...
              </div>
            ) : (
              <>
                <Heart className="mr-2 h-4 w-4 text-interview-purple" fill="#8B5CF6" />
                Apoiar com uma doação
              </>
            )}
          </Button>
        </motion.div>
      </Card>
    </motion.div>
  );
};

export default DonationSection;
