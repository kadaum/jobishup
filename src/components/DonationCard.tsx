
import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Coffee, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";
import { toast } from "sonner";

const donationAmounts = [5, 10, 25, 50];

const DonationCard = () => {
  const [selectedAmount, setSelectedAmount] = useState<number>(10);
  const [isLoading, setIsLoading] = useState(false);
  const { t, language } = useLanguage();

  // Function to format currency based on current language
  const formatCurrency = (amount: number): string => {
    const currencyMap: Record<string, { currency: string, locale: string }> = {
      en: { currency: 'USD', locale: 'en-US' },
      pt: { currency: 'BRL', locale: 'pt-BR' },
      es: { currency: 'EUR', locale: 'es-ES' }
    };
    
    const { currency, locale } = currencyMap[language] || { currency: 'BRL', locale: 'pt-BR' };
    
    return new Intl.NumberFormat(locale, { 
      style: 'currency', 
      currency 
    }).format(amount);
  };

  const handleDonation = async () => {
    try {
      setIsLoading(true);
      console.log(`Processing donation of ${formatCurrency(selectedAmount)}`);
      
      // Convert dollars to cents for Stripe
      const amountInCents = selectedAmount * 100;
      
      // Get currency code based on language
      const currencyMap: Record<string, string> = {
        en: 'usd',
        pt: 'brl',
        es: 'eur'
      };
      const currency = currencyMap[language] || 'brl';
      
      console.log(`Calling donation endpoint with amount: ${amountInCents} ${currency}`);
      
      // Call our Supabase Edge Function
      const response = await fetch(
        "https://shpxzvlqaykbsprgzbbe.supabase.co/functions/v1/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: amountInCents,
            currency
          }),
        }
      );

      const data = await response.json();
      
      if (!response.ok) {
        console.error("Error response from donation endpoint:", data);
        throw new Error(data.error || "Failed to create checkout session");
      }
      
      // Redirect to Stripe Checkout
      if (data.url) {
        console.log("Redirecting to donation checkout URL:", data.url);
        window.location.href = data.url; // Redirect in same tab instead of opening new window
      } else {
        console.error("No checkout URL received:", data);
        throw new Error("No checkout URL received");
      }
    } catch (error) {
      console.error("Error processing donation:", error);
      toast.error(
        language === 'en' ? 'Error processing donation. Please try again.' : 
        language === 'es' ? 'Error al procesar la donación. Por favor, inténtalo de nuevo.' : 
        'Erro ao processar doação. Por favor, tente novamente.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto"
    >
      <Card className="overflow-hidden border border-blue-100 bg-gradient-to-br from-white to-blue-50">
        <CardContent className="p-6">
          <div className="flex items-center mb-4 text-blue-500">
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <Heart className="h-6 w-6 mr-2 text-red-400" />
            </motion.div>
            <h3 className="text-lg font-medium">{t('donate.title')}</h3>
          </div>
          
          <p className="text-gray-600 mb-4 text-sm">
            {t('donate.description')}
          </p>
          
          <div className="grid grid-cols-4 gap-2 my-4">
            {donationAmounts.map((amount) => (
              <motion.button
                key={amount}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedAmount(amount)}
                className={`${
                  selectedAmount === amount
                    ? "bg-blue-500 text-white"
                    : "bg-white text-blue-500 border border-blue-200"
                } rounded-md py-2 px-3 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300`}
              >
                {formatCurrency(amount)}
              </motion.button>
            ))}
          </div>
        </CardContent>
        
        <CardFooter className="px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 flex justify-between items-center">
          <div className="flex items-center text-sm text-gray-500">
            <Coffee className="h-4 w-4 mr-1" />
            <span>Support our work</span>
          </div>
          
          <Button
            onClick={handleDonation}
            disabled={isLoading}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-200"
          >
            {isLoading ? (
              language === 'en' ? "Processing..." : 
              language === 'es' ? "Procesando..." : 
              "Processando..."
            ) : (
              <span className="flex items-center">
                {t('donate.button')}
                <ArrowRight className="ml-1 h-4 w-4" />
              </span>
            )}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default DonationCard;
