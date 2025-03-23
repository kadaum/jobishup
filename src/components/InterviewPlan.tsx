
import { useRef } from "react";
import { motion } from "framer-motion";
import { InterviewPlan as InterviewPlanType } from "@/types";
import PlanSection from "./plan/PlanSection";
import ExportOptions from "./plan/ExportOptions";

interface InterviewPlanProps {
  plan: InterviewPlanType;
}

const InterviewPlan = ({ plan }: InterviewPlanProps) => {
  const printRef = useRef<HTMLDivElement>(null);
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      }
    }
  };

  const sections = [
    plan.process,
    plan.questions,
    plan.questionsToAsk,
    plan.studyMaterials,
    plan.finalTips
  ];

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
        className="mt-10"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <ExportOptions plan={plan} printRef={printRef} />
      </motion.div>
    </motion.div>
  );
};

export default InterviewPlan;
