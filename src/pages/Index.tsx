
import { useState } from "react";
import { FormData, InterviewPlan as InterviewPlanType } from "@/types";
import InterviewForm from "@/components/InterviewForm";
import InterviewPlan from "@/components/InterviewPlan";
import LoadingAnimation from "@/components/LoadingAnimation";
import Header from "@/components/Header";
import { generateInterviewPlan } from "@/utils/api";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [plan, setPlan] = useState<InterviewPlanType | null>(null);

  const handleSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      setPlan(null);
      
      const generatedPlan = await generateInterviewPlan(data);
      
      setPlan(generatedPlan);
      toast.success("Seu plano de preparação está pronto!");
    } catch (error) {
      console.error("Error generating plan:", error);
      toast.error("Erro ao gerar o plano. Por favor, tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient pt-4 pb-20">
      <div className="w-full max-w-7xl mx-auto">
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
              <div className="mt-6 flex justify-center">
                <motion.button
                  onClick={() => setPlan(null)}
                  className="text-interview-blue underline text-sm hover:text-interview-dark-blue transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  ← Voltar ao formulário
                </motion.button>
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
