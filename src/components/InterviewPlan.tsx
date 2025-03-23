
import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { InterviewPlan as InterviewPlanType } from "@/types";
import { Download, Share2, Heart } from "lucide-react";
import { motion } from "framer-motion";
import DonationSection from "./DonationSection";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { useLanguage } from "@/context/LanguageContext";
import { toast } from "sonner";

interface InterviewPlanProps {
  plan: InterviewPlanType;
}

const InterviewPlan = ({ plan }: InterviewPlanProps) => {
  const printRef = useRef<HTMLDivElement>(null);
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

  const formatContent = (content: string) => {
    // Split by line breaks
    const paragraphs = content.split("\n");
    
    return (
      <div>
        {paragraphs.map((paragraph, i) => {
          // Handle bullet points (both - and • formats)
          if (paragraph.trim().startsWith("-") || paragraph.trim().startsWith("•")) {
            return (
              <div key={i} className="flex items-start space-x-2 mb-2">
                <span>•</span>
                <span>{paragraph.trim().substring(1).trim()}</span>
              </div>
            );
          }
          
          // Handle bold text (markdown style)
          let formattedText = paragraph;
          const boldPattern = /\*\*(.*?)\*\*/g;
          
          // Replace markdown style bold with HTML bold
          if (paragraph.match(boldPattern)) {
            formattedText = paragraph.replace(boldPattern, (_, text) => {
              return `<strong>${text}</strong>`;
            });
            return (
              <p 
                key={i} 
                className="mb-3"
                dangerouslySetInnerHTML={{ __html: formattedText }}
              />
            );
          }
          
          return paragraph.trim() ? <p key={i} className="mb-3">{paragraph}</p> : <div key={i} className="h-3" />;
        })}
      </div>
    );
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
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
            <motion.div key={index} variants={item} className="card-hover">
              <Card className="glass-card overflow-hidden border border-white/20">
                <div className="bg-gradient-to-r from-interview-light-blue to-interview-light-purple p-4 border-b border-white/20">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{section.emoji}</span>
                    <h2 className="text-xl font-semibold">{section.title}</h2>
                  </div>
                </div>
                <div className="p-6">
                  {formatContent(section.content)}
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div 
        className="mt-10 flex flex-col space-y-8"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item}>
          <DonationSection />
        </motion.div>

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
      </motion.div>
    </motion.div>
  );
};

export default InterviewPlan;
