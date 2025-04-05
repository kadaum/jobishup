
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/context/LanguageContext";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

interface PdfExporterProps {
  printRef: React.RefObject<HTMLDivElement>;
}

const PdfExporter = ({ printRef }: PdfExporterProps) => {
  const { language } = useLanguage();
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

  return (
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
        (language === 'en' ? 'Download PDF' : 
        language === 'es' ? 'Descargar PDF' : 
        'Baixar PDF')}
    </Button>
  );
};

export default PdfExporter;
