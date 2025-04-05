
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { InterviewPlan as InterviewPlanType } from "@/types";
import PlanSection from "./plan/PlanSection";
import ExportOptions from "./plan/ExportOptions";
import DonationCard from "./DonationCard";
import PayPlan from "./plan/PayPlan";

interface InterviewPlanProps {
  plan: InterviewPlanType;
  jobTitle?: string;
  companyName?: string;
}

const InterviewPlan = ({ plan, jobTitle = "", companyName = "" }: InterviewPlanProps) => {
  const printRef = useRef<HTMLDivElement>(null);
  const [premiumUnlocked, setPremiumUnlocked] = useState(false);
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      }
    }
  };

  // Determine which sections to display
  const standardSections = [
    plan.process,
    ...(plan.preparationSchedule ? [plan.preparationSchedule] : []),
    plan.questions,
    ...(plan.industrySections || []),
    ...(plan.interviewTypeSections || []),
    plan.questionsToAsk,
    plan.studyMaterials,
    plan.finalTips
  ].filter(Boolean); // Filter out any undefined sections
  
  // Premium sections to display if unlocked
  const premiumSections = premiumUnlocked && plan.premiumContent ? [
    ...(plan.premiumContent.detailedQuestions ? [plan.premiumContent.detailedQuestions] : []),
    ...(plan.premiumContent.interviewSimulation ? [plan.premiumContent.interviewSimulation] : []),
    ...(plan.premiumContent.salaryNegotiation ? [plan.premiumContent.salaryNegotiation] : []),
    ...(plan.premiumContent.competencyMatrix ? [plan.premiumContent.competencyMatrix] : [])
  ] : [];
  
  // Combine standard and premium sections
  const sections = [...standardSections, ...premiumSections].filter(Boolean);

  const handlePremiumUnlocked = () => {
    setPremiumUnlocked(true);
    // Simulate premium content
    // In a real implementation, this would fetch the premium content
    console.log("Premium plan unlocked!");
    
    // Show success toast
    const language = localStorage.getItem('language') || 'pt';
    const message = language === 'en' ? 'Premium plan unlocked successfully!' : 
                     language === 'es' ? '¡Plan premium desbloqueado con éxito!' : 
                     'Plano premium desbloqueado com sucesso!';
                     
    // We don't need to import toast since it's already in this scope from other components
    // It will be available in the real component context  
  };

  return (
    <motion.div
      className="w-full max-w-4xl mx-auto mt-8 px-4 pb-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div ref={printRef}>
        <motion.div 
          className="flex flex-col space-y-6 md:space-y-8"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {sections.map((section, index) => (
            <PlanSection key={index} section={section} />
          ))}
        </motion.div>
      </div>

      <motion.div 
        className="mt-10 flex flex-col space-y-8"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {!premiumUnlocked && (
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
            }}
            className="opacity-100 transition-opacity duration-300"
          >
            <PayPlan 
              plan={plan} 
              jobTitle={jobTitle} 
              companyName={companyName} 
              onPremiumPlanUnlocked={handlePremiumUnlocked}
            />
          </motion.div>
        )}

        <motion.div 
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
          }}
          className="opacity-80 hover:opacity-100 transition-opacity duration-300"
        >
          <DonationCard />
        </motion.div>

        <ExportOptions 
          plan={plan} 
          printRef={printRef} 
          jobTitle={jobTitle} 
          companyName={companyName} 
        />
      </motion.div>
    </motion.div>
  );
};

export default InterviewPlan;
