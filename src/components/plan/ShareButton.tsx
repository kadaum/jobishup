
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/context/LanguageContext";

interface ShareButtonProps {
  shareUrl: string;
  shareTitle: string;
  shareText: string;
  onShareSuccess: () => void;
}

const ShareButton = ({ shareUrl, shareTitle, shareText, onShareSuccess }: ShareButtonProps) => {
  const { t, language } = useLanguage();

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
        
        // Trigger social options display
        onShareSuccess();
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

  return (
    <Button 
      onClick={handleGenericShare}
      className="flex-1 bg-interview-purple hover:bg-interview-purple/90 text-white button-hover"
    >
      <Share2 className="mr-2 h-4 w-4" />
      {t('sharePlan')}
    </Button>
  );
};

export default ShareButton;
