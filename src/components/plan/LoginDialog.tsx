
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { InterviewPlan } from "@/types";
import { savePlan } from "@/integrations/supabase/customClient";
import { toast } from "sonner";
import { useAnalytics } from "@/context/AnalyticsContext";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const { t, language } = useLanguage();
  const { trackEvent } = useAnalytics();

  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);
    setEmail("");
    setPassword("");
    setFullName("");
  };

  const handleSavePlan = async (userId: string) => {
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
      
      toast.success(
        language === 'en' ? 'Plan saved successfully!' : 
        language === 'es' ? '¡Plan guardado con éxito!' : 
        'Plano salvo com sucesso!'
      );
      
      if (onSaveSuccess) {
        onSaveSuccess();
      }
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        await signUp(email, password, fullName);
        trackEvent("Auth", "Sign Up", "Success");
        
        // For signup flow, we'll save the plan when the user logs in later
        // (since signup typically requires email verification)
        toast.info(
          language === 'en' ? 'Please verify your email and login to save your plan' : 
          language === 'es' ? 'Verifica tu correo electrónico e inicia sesión para guardar tu plan' : 
          'Verifique seu e-mail e faça login para salvar seu plano'
        );
        
        onOpenChange(false);
      } else {
        const result = await signIn(email, password);
        trackEvent("Auth", "Sign In", "Success");
        
        // If successfully logged in, save the plan
        if (result?.user) {
          await handleSavePlan(result.user.id);
          onOpenChange(false);
        }
      }
    } catch (error) {
      console.error("Auth error:", error);
      trackEvent("Auth", isSignUp ? "Sign Up" : "Sign In", "Error");
    } finally {
      setLoading(false);
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
            {isSignUp 
              ? t('auth.signUpToSavePlan') || 'Create an account to save your interview plan'
              : t('auth.signInToSavePlan') || 'Sign in to save your interview plan'}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {isSignUp && (
            <div className="space-y-2">
              <Label htmlFor="fullName">{t('auth.fullName')}</Label>
              <Input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required={isSignUp}
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">{t('auth.email')}</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">{t('auth.password')}</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-interview-blue hover:bg-interview-blue/90"
          >
            {loading 
              ? t('auth.loading')
              : isSignUp 
                ? t('auth.signUpButton') 
                : t('auth.signInButton')}
          </Button>
        </form>

        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={toggleAuthMode}
            className="text-interview-blue hover:underline text-sm"
          >
            {isSignUp ? t('auth.alreadyHaveAccount') : t('auth.dontHaveAccount')}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
