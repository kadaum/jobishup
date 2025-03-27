
import { useState } from "react";
import { FormData, InterviewPlan as InterviewPlanType } from "@/types";
import InterviewForm from "@/components/InterviewForm";
import InterviewPlan from "@/components/InterviewPlan";
import LoadingAnimation from "@/components/LoadingAnimation";
import Header from "@/components/Header";
import { generateInterviewPlan } from "@/utils/api";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { savePlan } from "@/integrations/supabase/customClient";
import { SparklesCore } from "@/components/ui/sparkles";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [plan, setPlan] = useState<InterviewPlanType | null>(null);
  const [formData, setFormData] = useState<FormData | null>(null);
  const { t, language } = useLanguage();
  const { isAuthenticated } = useAuth();

  const handleSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      setPlan(null);
      setFormData(data);
      
      // Ensure the selected language is passed to the API
      const dataWithLanguage = {
        ...data,
        selectedLanguage: language
      };
      
      const generatedPlan = await generateInterviewPlan(dataWithLanguage);
      
      setPlan(generatedPlan);
      toast.success(t('plan.ready'));
    } catch (error) {
      console.error("Error generating plan:", error);
      toast.error(t('plan.error'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSavePlan = async () => {
    if (!isAuthenticated) {
      toast.error(t('auth.loginRequired'));
      return;
    }

    if (!plan || !formData) return;

    try {
      await savePlan({
        job_title: formData.jobTitle,
        company_name: formData.companyName,
        content: plan,
        raw_text: plan.rawText
      });
      
      toast.success(t('plan.saved'));
    } catch (error) {
      console.error("Error saving plan:", error);
      toast.error(t('plan.saveError'));
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Sparkles Background */}
      <div className="absolute inset-0 z-0">
        <SparklesCore
          id="tsparticlesbackground"
          background="#f5f7ff"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={70}
          className="w-full h-full"
          particleColor="#3B82F6"
          speed={0.5}
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto pt-4 pb-20">
        <Header />
        
        <AnimatePresence mode="wait">
          {!isLoading && !plan && (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <InterviewForm onSubmit={handleSubmit} isLoading={isLoading} />
            </motion.div>
          )}

          {isLoading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <LoadingAnimation />
            </motion.div>
          )}

          {!isLoading && plan && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mt-6 flex justify-between items-center px-4">
                <motion.button
                  onClick={() => setPlan(null)}
                  className="text-interview-blue underline text-sm hover:text-interview-dark-blue transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  ← {t('backToForm')}
                </motion.button>
                
                {isAuthenticated && (
                  <Button
                    onClick={handleSavePlan}
                    className="bg-interview-blue hover:bg-interview-blue/90 text-white"
                    size="sm"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    {t('plan.savePlan')}
                  </Button>
                )}
              </div>
              <InterviewPlan plan={plan} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Index;
