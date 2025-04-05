
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download, Share2, Linkedin, Twitter, Facebook, Instagram, ArrowRight, Save } from "lucide-react";
import { toast } from "sonner";
import { InterviewPlan } from "@/types";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import LoginDialog from "./LoginDialog";
import { savePlan } from "@/integrations/supabase/customClient";
import { useAnalytics } from "@/context/AnalyticsContext";

interface ExportOptionsProps {
  plan: InterviewPlan;
  printRef: React.RefObject<HTMLDivElement>;
  jobTitle?: string;
  companyName?: string;
}

const ExportOptions = ({ plan, printRef, jobTitle = "", companyName = "" }: ExportOptionsProps) => {
  const { t, language } = useLanguage();
  const { isAuthenticated, user } = useAuth();
  const { trackEvent } = useAnalytics();
  const [pdfGenerating, setPdfGenerating] = useState(false);
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

  const handleDownloadPDF = async () => {
    if (!printRef.current) return;
    
    setPdfGenerating(true);
    
    try {
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });
      
      const sections = Array.from(printRef.current.querySelectorAll('.card-hover'));
      
      // Generate PDF for each section
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        
        // Add new page for sections after the first one
        if (i > 0) {
          pdf.addPage();
        }
        
        const canvas = await html2canvas(section as HTMLElement, {
          scale: 2,
          useCORS: true,
          logging: false,
        });
        
        const imgData = canvas.toDataURL('image/png');
        const imgWidth = 210; // A4 width in mm
        const pageHeight = 297;  // A4 height in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      }
      
      pdf.save('interview-plan.pdf');
      
      toast.success(
        language === 'en' ? 'PDF downloaded successfully!' : 
        language === 'es' ? '¡PDF descargado con éxito!' : 
        'PDF baixado com sucesso!'
      );
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error(
        language === 'en' ? 'Error generating PDF' : 
        language === 'es' ? 'Error al generar PDF' : 
        'Erro ao gerar PDF'
      );
    } finally {
      setPdfGenerating(false);
    }
  };

  const handleGenericShare = async () => {
    try {
      // Create text content for sharing
      let textContent = `${shareText}${shareUrl}`;
      
      // Check if navigator.share is available (mobile devices)
      if (navigator.share) {
        await navigator.share({
          title: shareTitle,
          text: textContent,
          url: shareUrl
        });
        
        toast.success(
          language === 'en' ? 'Plan shared successfully!' : 
          language === 'es' ? '¡Plan compartido con éxito!' : 
          'Plano compartilhado com sucesso!'
        );
      } else {
        // Fallback for desktop - copy to clipboard
        await navigator.clipboard.writeText(textContent);
        
        toast.success(
          language === 'en' ? 'Link copied to clipboard!' : 
          language === 'es' ? '¡Enlace copiado al portapapeles!' : 
          'Link copiado para a área de transferência!'
        );
        
        // Show social options
        setShowSocialOptions(true);
      }
    } catch (error) {
      console.error('Error sharing plan:', error);
      toast.error(
        language === 'en' ? 'Error sharing plan' : 
        language === 'es' ? 'Error al compartir el plan' : 
        'Erro ao compartilhar o plano'
      );
    }
  };
  
  // Social media sharing functions
  const shareOnLinkedIn = () => {
    const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    window.open(linkedInShareUrl, '_blank');
  };
  
  const shareOnTwitter = () => {
    const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(twitterShareUrl, '_blank');
  };
  
  const shareOnFacebook = () => {
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(facebookShareUrl, '_blank');
  };
  
  const shareOnWhatsApp = () => {
    const whatsAppShareUrl = `https://wa.me/?text=${encodeURIComponent(`${shareTitle} ${shareUrl}`)}`;
    window.open(whatsAppShareUrl, '_blank');
  };

  const handleSavePlan = async () => {
    if (!isAuthenticated) {
      // Show login dialog if not authenticated
      setShowLoginDialog(true);
      trackEvent("Plan", "Save Attempt", "Not Authenticated");
      return;
    }
    
    try {
      await savePlan({
        job_title: jobTitle,
        company_name: companyName,
        content: plan,
        raw_text: plan.rawText
      });
      
      trackEvent(
        "Plan", 
        "Save Success", 
        `Job: ${jobTitle} at ${companyName}`
      );
      
      toast.success(t('plan.saved'));
    } catch (error) {
      console.error("Error saving plan:", error);
      
      trackEvent(
        "Plan", 
        "Save Error", 
        `Job: ${jobTitle} at ${companyName}`
      );
      
      toast.error(t('plan.saveError'));
    }
  };

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
          <Button 
            onClick={handleDownloadPDF}
            className="flex-1 bg-interview-blue hover:bg-interview-blue/90 text-white button-hover"
            disabled={pdfGenerating}
          >
            <Download className="mr-2 h-4 w-4" />
            {pdfGenerating ? 
              (language === 'en' ? 'Generating...' : 
              language === 'es' ? 'Generando...' : 
              'Gerando...') : 
              t('downloadPDF')}
          </Button>
          <Button 
            onClick={handleGenericShare}
            className="flex-1 bg-interview-purple hover:bg-interview-purple/90 text-white button-hover"
          >
            <Share2 className="mr-2 h-4 w-4" />
            {t('sharePlan')}
          </Button>
        </div>
        
        {/* Save Plan Button */}
        <div className="mt-4">
          <Button 
            onClick={handleSavePlan}
            className="w-full bg-green-600 hover:bg-green-700 text-white button-hover"
          >
            <Save className="mr-2 h-4 w-4" />
            {t('plan.savePlan')}
          </Button>
        </div>
        
        {showSocialOptions && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
            className="mt-4"
          >
            <p className="text-sm mb-3">
              {language === 'en' ? 'Share on:' : 
               language === 'es' ? 'Compartir en:' : 
               'Compartilhar em:'}
            </p>
            <div className="flex flex-wrap gap-2">
              <Button 
                onClick={shareOnLinkedIn} 
                variant="outline"
                className="flex items-center gap-2 hover:bg-blue-100"
                size="sm"
              >
                <Linkedin className="h-4 w-4 text-blue-600" />
                LinkedIn
              </Button>
              <Button 
                onClick={shareOnTwitter} 
                variant="outline"
                className="flex items-center gap-2 hover:bg-blue-100"
                size="sm"
              >
                <Twitter className="h-4 w-4 text-blue-400" />
                Twitter
              </Button>
              <Button 
                onClick={shareOnFacebook} 
                variant="outline"
                className="flex items-center gap-2 hover:bg-blue-100"
                size="sm"
              >
                <Facebook className="h-4 w-4 text-blue-600" />
                Facebook
              </Button>
              <Button 
                onClick={shareOnWhatsApp} 
                variant="outline"
                className="flex items-center gap-2 hover:bg-green-100"
                size="sm"
              >
                <ArrowRight className="h-4 w-4 text-green-500" />
                WhatsApp
              </Button>
            </div>
          </motion.div>
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
