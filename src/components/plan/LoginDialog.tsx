
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { InterviewPlan } from "@/types";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import AuthForm from "./auth/AuthForm";
import AuthToggle from "./auth/AuthToggle";
import { usePlanSave } from "./auth/usePlanSave";

interface LoginDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  plan: InterviewPlan;
  jobTitle: string;
  companyName: string;
  onSaveSuccess?: () => void;
}

const LoginDialog = ({ 
  isOpen, 
  onOpenChange, 
  plan, 
  jobTitle, 
  companyName, 
  onSaveSuccess 
}: LoginDialogProps) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const { t, language } = useLanguage();
  const { handleSavePlan } = usePlanSave();

  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);
  };

  const handleAuthSuccess = async (userId?: string) => {
    // If there's a userId, we can save the plan right away (sign in flow)
    if (userId) {
      const saved = await handleSavePlan(plan, jobTitle, companyName);
      if (saved && onSaveSuccess) {
        onSaveSuccess();
      }
    }
    
    // Close the dialog in either case
    onOpenChange(false);
  };

  // Helper function to get proper dialog text based on language
  const getDialogText = (isSignUp: boolean) => {
    if (language === 'en') {
      return isSignUp 
        ? 'Create an account to save your interview plan'
        : 'Sign in to save your interview plan';
    } else if (language === 'es') {
      return isSignUp 
        ? 'Crea una cuenta para guardar tu plan de entrevista'
        : 'Inicia sesión para guardar tu plan de entrevista';
    } else {
      return isSignUp 
        ? 'Crie uma conta para salvar seu plano de entrevista'
        : 'Entre para salvar seu plano de entrevista';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isSignUp ? t('auth.signUp') : t('auth.signIn')}
          </DialogTitle>
          <DialogDescription>
            {getDialogText(isSignUp)}
          </DialogDescription>
        </DialogHeader>
        
        <AuthForm 
          isSignUp={isSignUp} 
          onSuccess={handleAuthSuccess} 
        />

        <AuthToggle 
          isSignUp={isSignUp} 
          onToggle={toggleAuthMode} 
        />
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
