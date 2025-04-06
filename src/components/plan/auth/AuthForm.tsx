
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { useAnalytics } from "@/context/AnalyticsContext";
import { Separator } from "@/components/ui/separator";
import { Linkedin, Mail, Github } from "lucide-react";

interface AuthFormProps {
  isSignUp: boolean;
  onSuccess: (userId?: string) => void;
}

const AuthForm = ({ isSignUp, onSuccess }: AuthFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn, signUp, signInWithSocial } = useAuth();
  const { t } = useLanguage();
  const { trackEvent } = useAnalytics();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        await signUp(email, password, fullName);
        trackEvent("Auth", "Sign Up", "Success");
        
        // For signup flow, we'll handle success but not save automatically
        // (since signup typically requires email verification)
        onSuccess();
      } else {
        const result = await signIn(email, password);
        trackEvent("Auth", "Sign In", "Success");
        
        // If successfully logged in, pass the user ID for plan saving
        if (result?.user) {
          onSuccess(result.user.id);
        }
      }
    } catch (error: any) {
      console.error("Auth error:", error);
      trackEvent("Auth", isSignUp ? "Sign Up" : "Sign In", "Error");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'linkedin') => {
    try {
      trackEvent("Auth", `Sign In with ${provider}`, "Attempt");
      await signInWithSocial(provider);
      // Note: onSuccess will be called via auth state change after redirect
    } catch (error: any) {
      console.error(`Error with ${provider} sign in:`, error);
      trackEvent("Auth", `Sign In with ${provider}`, "Error");
    }
  };

  return (
    <div className="space-y-4 mt-4">
      <form onSubmit={handleSubmit} className="space-y-4">
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

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            {t('auth.orContinueWith')}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button 
          variant="outline" 
          onClick={() => handleSocialLogin('google')}
          type="button"
          className="flex items-center justify-center gap-2"
        >
          <Mail className="h-4 w-4" />
          Google
        </Button>
        <Button 
          variant="outline" 
          onClick={() => handleSocialLogin('linkedin')}
          type="button"
          className="flex items-center justify-center gap-2"
        >
          <Linkedin className="h-4 w-4" />
          LinkedIn
        </Button>
      </div>
    </div>
  );
};

export default AuthForm;
