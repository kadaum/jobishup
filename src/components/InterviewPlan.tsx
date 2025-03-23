
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { InterviewPlan as InterviewPlanType } from "@/types";
import { Download, Mail, Heart } from "lucide-react";
import { motion } from "framer-motion";
import DonationSection from "./DonationSection";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

interface InterviewPlanProps {
  plan: InterviewPlanType;
}

const InterviewPlan = ({ plan }: InterviewPlanProps) => {
  const printRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = async () => {
    if (!printRef.current) return;
    
    const canvas = await html2canvas(printRef.current, {
      scale: 2,
      useCORS: true,
      logging: false,
    });
    
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });
    
    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    pdf.save('plano-entrevista.pdf');
  };

  const handleEmailPlan = () => {
    const subject = "Meu plano de preparação para entrevista";
    const body = `Aqui está meu plano de preparação para entrevista:\n\n${plan.rawText}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
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
            <h3 className="text-lg font-medium mb-4">Exportar plano</h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={handleDownloadPDF}
                className="flex-1 bg-interview-blue hover:bg-interview-blue/90 text-white button-hover"
              >
                <Download className="mr-2 h-4 w-4" />
                Baixar PDF
              </Button>
              <Button 
                onClick={handleEmailPlan}
                className="flex-1 bg-interview-purple hover:bg-interview-purple/90 text-white button-hover"
              >
                <Mail className="mr-2 h-4 w-4" />
                Enviar por email
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default InterviewPlan;
