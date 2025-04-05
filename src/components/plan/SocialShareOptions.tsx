
import { Button } from "@/components/ui/button";
import { Linkedin, Twitter, Facebook, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

interface SocialShareOptionsProps {
  shareUrl: string;
  shareTitle: string;
}

const SocialShareOptions = ({ shareUrl, shareTitle }: SocialShareOptionsProps) => {
  const { language } = useLanguage();

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

  return (
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
  );
};

export default SocialShareOptions;
