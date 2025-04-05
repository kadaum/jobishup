
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LockOpen } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface UnlockButtonProps {
  onClick: () => void;
  isLoading: boolean;
}

const UnlockButton = ({ onClick, isLoading }: UnlockButtonProps) => {
  const { language } = useLanguage();
  
  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md font-medium transition-all duration-200 w-full"
    >
      {isLoading ? (
        language === 'en' ? "Processing..." : 
        language === 'es' ? "Procesando..." : 
        "Processando..."
      ) : (
        <span className="flex items-center justify-center">
          {language === 'en' ? 'Unlock Premium' : 
           language === 'es' ? 'Desbloquear Premium' : 
           'Desbloquear Premium'}
          <LockOpen className="ml-2 h-4 w-4" />
        </span>
      )}
    </Button>
  );
};

export default UnlockButton;
