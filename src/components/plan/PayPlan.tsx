
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { InterviewPlan } from "@/types";
import LoginDialog from "./LoginDialog";
import FeaturesList from "./payment/FeaturesList";
import PriceDisplay from "./payment/PriceDisplay";
import UnlockButton from "./payment/UnlockButton";
import { usePaymentProcessor } from "./payment/PaymentProcessor";

interface PayPlanProps {
  plan: InterviewPlan;
  jobTitle: string;
  companyName: string;
  onPremiumPlanUnlocked: () => void;
}

const PayPlan = ({ plan, jobTitle, companyName, onPremiumPlanUnlocked }: PayPlanProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const { language } = useLanguage();
  const { isAuthenticated } = useAuth();
  const { createCheckoutSession } = usePaymentProcessor();
  
  // Store payment attempt in state so we can process it after login
  const [pendingPaymentAttempt, setPendingPaymentAttempt] = useState(false);
  
  // Effect to handle processing payment after successful authentication
  useEffect(() => {
    // If user is authenticated and there's a pending payment attempt
    if (isAuthenticated && pendingPaymentAttempt) {
      // Clear the pending flag
      setPendingPaymentAttempt(false);
      
      // Process the payment with a small delay to ensure auth state is fully updated
      setTimeout(() => {
        handleUnlockPremium();
      }, 300);
    }
  }, [isAuthenticated, pendingPaymentAttempt]);

  const handleUnlockPremium = async () => {
    if (!isAuthenticated) {
      // Set pending payment flag and open login dialog
      setPendingPaymentAttempt(true);
      setIsLoginDialogOpen(true);
      return;
    }
    
    setIsLoading(true);
    try {
      const url = await createCheckoutSession(
        language,
        jobTitle,
        companyName,
        plan.id || ""
      );
      
      // Immediately redirect to payment
      window.location.href = url;
      
    } catch (error: any) {
      console.error("Error processing premium upgrade:", error);
      toast.error(
        language === 'en' ? 'Error unlocking premium plan. Please try again.' : 
        language === 'es' ? 'Error al desbloquear el plan premium. Por favor, inténtalo de nuevo.' : 
        'Erro ao desbloquear o plano premium. Por favor, tente novamente.'
      );
      setPendingPaymentAttempt(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle login success
  const handleLoginSuccess = () => {
    // We'll let the useEffect handle the payment process
    // It will detect isAuthenticated and pendingPaymentAttempt
    console.log("Login successful, payment will process automatically");
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
          
          <FeaturesList />
          <PriceDisplay />
        </CardContent>
        
        <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 flex flex-col gap-2">
          <UnlockButton 
            onClick={handleUnlockPremium}
            isLoading={isLoading || (isAuthenticated && pendingPaymentAttempt)}
          />
        </div>
      </Card>
      
      <LoginDialog 
        isOpen={isLoginDialogOpen} 
        onOpenChange={setIsLoginDialogOpen}
        plan={plan}
        jobTitle={jobTitle}
        companyName={companyName}
        onSaveSuccess={handleLoginSuccess}
      />
    </motion.div>
  );
};

export default PayPlan;
