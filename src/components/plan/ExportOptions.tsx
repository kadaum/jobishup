
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download, Share2 } from "lucide-react";
import { toast } from "sonner";
import { InterviewPlan } from "@/types";
import { useLanguage } from "@/context/LanguageContext";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

interface ExportOptionsProps {
  plan: InterviewPlan;
  printRef: React.RefObject<HTMLDivElement>;
}

const ExportOptions = ({ plan, printRef }: ExportOptionsProps) => {
  const { t, language } = useLanguage();
  const [pdfGenerating, setPdfGenerating] = useState(false);

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

  const handleSharePlan = async () => {
    try {
      // Create text content for sharing
      let textContent = plan.rawText;
      
      // Check if navigator.share is available (mobile devices)
      if (navigator.share) {
        await navigator.share({
          title: language === 'en' ? 'My Interview Preparation Plan' :
                language === 'es' ? 'Mi Plan de Preparación para Entrevista' :
                'Meu Plano de Preparação para Entrevista',
          text: textContent
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
          language === 'en' ? 'Plan copied to clipboard!' : 
          language === 'es' ? '¡Plan copiado al portapapeles!' : 
          'Plano copiado para a área de transferência!'
        );
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
            onClick={handleSharePlan}
            className="flex-1 bg-interview-purple hover:bg-interview-purple/90 text-white button-hover"
          >
            <Share2 className="mr-2 h-4 w-4" />
            {t('sharePlan')}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ExportOptions;
