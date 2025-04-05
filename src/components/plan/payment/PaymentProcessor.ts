
import { useAnalytics } from "@/context/AnalyticsContext";

interface PaymentOptions {
  amount: number;
  currency: string;
  jobTitle: string;
  companyName: string;
  planId: string;
}

export const usePaymentProcessor = () => {
  const { trackEvent } = useAnalytics();
  
  const getCurrencyCode = (language: string): string => {
    const currencyMap: Record<string, string> = {
      en: 'usd',
      pt: 'brl',
      es: 'eur'
    };
    return currencyMap[language] || 'brl';
  };
  
  const getPaymentAmount = (language: string): number => {
    const amountMap: Record<string, number> = {
      en: 599, // $5.99 USD
      pt: 599, // R$5.99 BRL
      es: 599  // €5.99 EUR
    };
    return amountMap[language] || 599;
  };
  
  const createCheckoutSession = async (
    language: string, 
    jobTitle: string, 
    companyName: string, 
    planId: string
  ) => {
    const currency = getCurrencyCode(language);
    const amount = getPaymentAmount(language);
    
    console.log("Creating checkout session...");
    console.log(`Amount: ${amount}, Currency: ${currency}`);
    
    // Call Supabase Edge Function with the full URL
    const response = await fetch(
      "https://shpxzvlqaykbsprgzbbe.supabase.co/functions/v1/create-premium-checkout",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          currency,
          jobTitle,
          companyName,
          planId: planId || "anonymous"
        }),
      }
    );

    const data = await response.json();
    
    if (!response.ok) {
      console.error("Error response from checkout endpoint:", data);
      throw new Error(data.error || "Failed to create checkout session");
    }
    
    // Track the checkout event
    if (data.url) {
      trackEvent("Premium Plan", "Checkout Started", `Job: ${jobTitle}`);
      return data.url;
    } else {
      console.error("No checkout URL received:", data);
      throw new Error("No checkout URL received");
    }
  };
  
  return { createCheckoutSession };
};
