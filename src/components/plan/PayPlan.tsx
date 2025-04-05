
import { useState } from "react";
import { motion } from "framer-motion";
import { LockOpen, Lock, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { useAnalytics } from "@/context/AnalyticsContext";
import { toast } from "sonner";
import { InterviewPlan } from "@/types";
import LoginDialog from "./LoginDialog";

interface PayPlanProps {
  plan: InterviewPlan;
  jobTitle: string;
  companyName: string;
  onPremiumPlanUnlocked: () => void;
}

const PayPlan = ({ plan, jobTitle, companyName, onPremiumPlanUnlocked }: PayPlanProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const { t, language } = useLanguage();
  const { isAuthenticated } = useAuth();
  const { trackEvent } = useAnalytics();

  const getPriceDisplay = (): string => {
    const currencyMap: Record<string, { symbol: string, amount: number }> = {
      en: { symbol: '$', amount: 9.99 },
      pt: { symbol: 'R$', amount: 29.90 },
      es: { symbol: '€', amount: 8.99 }
    };
    
    const { symbol, amount } = currencyMap[language] || currencyMap.pt;
    return `${symbol}${amount.toFixed(2)}`;
  };

  const handleUnlockPremium = async () => {
    if (!isAuthenticated) {
      setIsLoginDialogOpen(true);
      trackEvent("Premium Plan", "Unlock Attempt", "Not Authenticated");
      return;
    }
    
    setIsLoading(true);
    try {
      // Get currency code based on language
      const currencyMap: Record<string, string> = {
        en: 'usd',
        pt: 'brl',
        es: 'eur'
      };
      const currency = currencyMap[language] || 'brl';
      
      // Get amount based on language (in cents)
      const amountMap: Record<string, number> = {
        en: 999,
        pt: 2990,
        es: 899
      };
      const amount = amountMap[language] || 2990;
      
      // Call Supabase Edge Function
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
            planId: plan.id || "anonymous"
          }),
        }
      );

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Failed to create checkout session");
      }
      
      // Redirect to Stripe Checkout
      if (data.url) {
        trackEvent("Premium Plan", "Checkout Started", `Job: ${jobTitle}`);
        window.open(data.url, "_blank");
        
        // In a real implementation, we would need a webhook to verify payment completion
        // For now, we'll simulate successful payment and unlock premium content
        toast.success(
          language === 'en' ? 'Premium plan unlocked!' : 
          language === 'es' ? '¡Plan premium desbloqueado!' : 
          'Plano premium desbloqueado!'
        );
        
        onPremiumPlanUnlocked();
      } else {
        throw new Error("No checkout URL received");
      }
    } catch (error) {
      console.error("Error processing premium upgrade:", error);
      toast.error(
        language === 'en' ? 'Error unlocking premium plan. Please try again.' : 
        language === 'es' ? 'Error al desbloquear el plan premium. Por favor, inténtalo de nuevo.' : 
        'Erro ao desbloquear o plano premium. Por favor, tente novamente.'
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
                rotate: [0, 15, 0, -15, 0],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "mirror"
              }}
            >
              <Lock className="h-6 w-6 mr-2 text-yellow-500" />
            </motion.div>
            <h3 className="text-lg font-medium">
              {language === 'en' ? 'Unlock Premium Plan' : 
               language === 'es' ? 'Desbloquear Plan Premium' : 
               'Desbloquear Plano Premium'}
            </h3>
          </div>
          
          <p className="text-gray-600 mb-4 text-sm">
            {language === 'en' ? 'Get an enhanced interview preparation plan with detailed questions, model answers, and personalized strategies.' : 
             language === 'es' ? 'Obtén un plan de preparación para entrevistas mejorado con preguntas detalladas, respuestas modelo y estrategias personalizadas.' : 
             'Obtenha um plano de preparação para entrevista aprimorado com perguntas detalhadas, respostas modelo e estratégias personalizadas.'}
          </p>
          
          <ul className="space-y-2 mb-4">
            {[
              language === 'en' ? '40+ additional tailored questions with model answers' : 
              language === 'es' ? '40+ preguntas personalizadas adicionales con respuestas modelo' : 
              '40+ perguntas personalizadas adicionais com respostas modelo',
              
              language === 'en' ? 'Interview simulation script with feedback points' : 
              language === 'es' ? 'Guión de simulación de entrevista con puntos de retroalimentación' : 
              'Roteiro de simulação de entrevista com pontos de feedback',
              
              language === 'en' ? 'Salary negotiation strategies and talking points' : 
              language === 'es' ? 'Estrategias de negociación salarial y puntos de conversación' : 
              'Estratégias de negociação salarial e pontos de discussão',
              
              language === 'en' ? 'Competency matrix with self-assessment guide' : 
              language === 'es' ? 'Matriz de competencias con guía de autoevaluación' : 
              'Matriz de competências com guia de autoavaliação'
            ].map((feature, i) => (
              <li key={i} className="flex items-start text-sm">
                <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          
          <div className="bg-blue-50 p-3 rounded-md mb-4 text-center">
            <span className="text-sm text-gray-500">
              {language === 'en' ? 'One-time payment' : 
               language === 'es' ? 'Pago único' : 
               'Pagamento único'}
            </span>
            <div className="text-2xl font-bold text-blue-600">
              {getPriceDisplay()}
            </div>
          </div>
        </CardContent>
        
        <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 flex justify-center">
          <Button
            onClick={handleUnlockPremium}
            disabled={isLoading}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md font-medium transition-all duration-200 w-full"
          >
            {isLoading ? (
              language === 'en' ? "Processing..." : 
              language === 'es' ? "Procesando..." : 
              "Processando..."
            ) : (
              <span className="flex items-center justify-center">
                {language === 'en' ? 'Unlock Premium' : 
                 language === 'es' ? 'Desbloquear Premium' : 
                 'Desbloquear Premium'}
                <LockOpen className="ml-2 h-4 w-4" />
              </span>
            )}
          </Button>
        </div>
      </Card>
      
      <LoginDialog 
        isOpen={isLoginDialogOpen} 
        onOpenChange={setIsLoginDialogOpen}
        plan={plan}
        jobTitle={jobTitle}
        companyName={companyName}
        onSaveSuccess={() => {
          // After login, automatically try to unlock premium again
          setTimeout(handleUnlockPremium, 500);
        }}
      />
    </motion.div>
  );
};

export default PayPlan;
