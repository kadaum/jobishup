import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { useAnalytics } from "@/context/AnalyticsContext";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import { Separator } from "@/components/ui/separator";
import { Linkedin, Mail } from "lucide-react";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn, signUp, signInWithSocial, isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const { trackEvent } = useAnalytics();
  const navigate = useNavigate();
  const location = useLocation();

  const getReturnUrl = () => {
    const searchParams = new URLSearchParams(location.search);
    const returnTo = searchParams.get('returnTo');
    return returnTo || '/';
  };

  useEffect(() => {
    if (isAuthenticated) {
      const returnUrl = getReturnUrl();
      navigate(returnUrl);
    }
  }, [isAuthenticated, navigate, location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        await signUp(email, password, fullName);
        trackEvent("Auth", "Sign Up", "Success");
      } else {
        await signIn(email, password);
        trackEvent("Auth", "Sign In", "Success");
      }
    } catch (error) {
      trackEvent("Auth", isSignUp ? "Sign Up" : "Sign In", "Error");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignIn = async (provider: 'google' | 'linkedin') => {
    try {
      trackEvent("Auth", `Sign In with ${provider}`, "Attempt");
      const returnUrl = getReturnUrl();
      await signInWithSocial(provider, returnUrl);
    } catch (error) {
      trackEvent("Auth", `Sign In with ${provider}`, "Error");
    }
  };

  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);
    setEmail("");
    setPassword("");
    setFullName("");
    trackEvent("Auth", "Toggle Mode", isSignUp ? "Sign In" : "Sign Up");
  };

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient pt-4 pb-20">
      <div className="w-full max-w-7xl mx-auto">
        <Header />

        <div className="flex justify-center items-center mt-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md mx-4"
          >
            <Card className="glass-card overflow-hidden border border-white/20 p-6">
              <h2 className="text-2xl font-bold mb-6 text-center">
                {isSignUp ? t('auth.signUp') : t('auth.signIn')}
              </h2>

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
                      className="bg-white/10 border-white/20"
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
                    className="bg-white/10 border-white/20"
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
                    className="bg-white/10 border-white/20"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-interview-blue hover:bg-interview-blue/90 mt-6"
                >
                  {loading 
                    ? t('auth.loading')
                    : isSignUp 
                      ? t('auth.signUpButton') 
                      : t('auth.signInButton')}
                </Button>
              </form>

              <div className="relative my-6">
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
                  onClick={() => handleSocialSignIn('google')}
                  type="button"
                  className="flex items-center justify-center gap-2"
                >
                  <Mail className="h-4 w-4" />
                  {t('auth.signInWithGoogle')}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => handleSocialSignIn('linkedin')}
                  type="button"
                  className="flex items-center justify-center gap-2"
                >
                  <Linkedin className="h-4 w-4" />
                  {t('auth.signInWithLinkedIn')}
                </Button>
              </div>

              <div className="mt-6 text-center">
                <button
                  type="button"
                  onClick={toggleAuthMode}
                  className="text-interview-blue hover:underline"
                >
                  {isSignUp ? t('auth.alreadyHaveAccount') : t('auth.dontHaveAccount')}
                </button>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
