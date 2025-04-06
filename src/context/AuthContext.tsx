
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User, Session, Provider } from "@supabase/supabase-js";
import { useLanguage } from "./LanguageContext";
import { toast } from "sonner";

interface AuthContextProps {
  user: User | null;
  session: Session | null;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<{ user: User } | null>;
  signInWithSocial: (provider: Provider) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  session: null,
  signUp: async () => {},
  signIn: async () => null,
  signInWithSocial: async () => {},
  signOut: async () => {},
  loading: true,
  isAuthenticated: false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { t, language } = useLanguage();

  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) throw error;
      
      toast.success(
        language === 'en' ? 'Sign up successful! Check your email to confirm.' : 
        language === 'es' ? '¡Registro exitoso! Verifica tu correo para confirmar.' : 
        'Cadastro realizado com sucesso! Verifique seu email para confirmar.'
      );
    } catch (error: any) {
      console.error("Error during sign up:", error);
      toast.error(error.message);
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      toast.success(
        language === 'en' ? 'Signed in successfully!' : 
        language === 'es' ? '¡Sesión iniciada con éxito!' : 
        'Login realizado com sucesso!'
      );
      
      return data ? { user: data.user } : null;
    } catch (error: any) {
      console.error("Error during sign in:", error);
      toast.error(error.message);
      throw error;
    }
  };

  const signInWithSocial = async (provider: Provider) => {
    try {
      // Use the correct provider
      const providerToUse = provider === 'linkedin' ? 'linkedin_oidc' : provider;
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: providerToUse,
        options: {
          redirectTo: window.location.origin
        }
      });

      if (error) throw error;
    } catch (error: any) {
      console.error(`Error during ${provider} sign in:`, error);
      toast.error(error.message);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast.success(
        language === 'en' ? 'Signed out successfully!' : 
        language === 'es' ? '¡Sesión cerrada con éxito!' : 
        'Logout realizado com sucesso!'
      );
    } catch (error: any) {
      console.error("Error during sign out:", error);
      toast.error(error.message);
      throw error;
    }
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        signUp,
        signIn,
        signInWithSocial,
        signOut,
        loading,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
