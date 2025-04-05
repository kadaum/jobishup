
import { useState } from "react";
import { motion } from "framer-motion";
import { InterviewPlan } from "@/types";
import { useLanguage } from "@/context/LanguageContext";
import LoginDialog from "./LoginDialog";
import PdfExporter from "./PdfExporter";
import ShareButton from "./ShareButton";
import SocialShareOptions from "./SocialShareOptions";
import SavePlanButton from "./SavePlanButton";

interface ExportOptionsProps {
  plan: InterviewPlan;
  printRef: React.RefObject<HTMLDivElement>;
  jobTitle?: string;
  companyName?: string;
}

const ExportOptions = ({ plan, printRef, jobTitle = "", companyName = "" }: ExportOptionsProps) => {
  const { t, language } = useLanguage();
  const [showSocialOptions, setShowSocialOptions] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  
  // Get the current website URL for sharing
  const websiteUrl = window.location.origin;
  const shareTitle = language === 'en' ? 'Check out this Interview Preparation Plan' :
                  language === 'es' ? 'Mira este Plan de Preparación para Entrevista' :
                  'Confira este Plano de Preparação para Entrevista';
  const shareText = language === 'en' ? 'I created this interview preparation plan with JobishUp. Create yours at: ' :
                 language === 'es' ? 'Creé este plan de preparación para entrevista con JobishUp. Crea el tuyo en: ' :
                 'Criei este plano de preparação para entrevista com JobishUp. Crie o seu em: ';
  const shareUrl = `${websiteUrl}?utm_source=share`;

  // Animation variant
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div variants={item}>
      <div className="glass-card overflow-hidden border border-white/20 p-6">
        <h3 className="text-lg font-medium mb-4">{t('exportPlan')}</h3>
        <div className="flex flex-col sm:flex-row gap-4">
          <PdfExporter printRef={printRef} />
          <ShareButton 
            shareUrl={shareUrl}
            shareTitle={shareTitle}
            shareText={shareText}
            onShareSuccess={() => setShowSocialOptions(true)}
          />
        </div>
        
        {/* Save Plan Button */}
        <div className="mt-4">
          <SavePlanButton 
            plan={plan}
            jobTitle={jobTitle}
            companyName={companyName}
            onLoginRequired={() => setShowLoginDialog(true)}
          />
        </div>
        
        {showSocialOptions && (
          <SocialShareOptions 
            shareUrl={shareUrl} 
            shareTitle={shareTitle} 
          />
        )}
      </div>
      
      {/* Login Dialog */}
      <LoginDialog 
        isOpen={showLoginDialog}
        onOpenChange={setShowLoginDialog}
        plan={plan}
        jobTitle={jobTitle}
        companyName={companyName}
        onSaveSuccess={() => setShowLoginDialog(false)}
      />
    </motion.div>
  );
};

export default ExportOptions;
