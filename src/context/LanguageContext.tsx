
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Language } from "@/types";
import { getTranslation } from "@/translations";
import { useLocation, useNavigate } from "react-router-dom";

interface LanguageContextProps {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextProps>({
  language: "pt",
  setLanguage: () => {},
  t: () => "",
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [language, setLanguageState] = useState<Language>(() => {
    // Try to detect language from URL path first
    const path = location.pathname;
    if (path.startsWith('/en')) {
      return "en";
    } else if (path.startsWith('/es')) {
      return "es";
    }
    
    // If not in URL, check localStorage
    const savedLanguage = localStorage.getItem("language") as Language;
    return savedLanguage || "pt";
  });

  // Update language in localStorage and URL
  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    localStorage.setItem("language", newLanguage);
    
    // Update URL to reflect language change
    const currentPath = location.pathname;
    let newPath = currentPath;
    
    // Remove any existing language prefix
    if (currentPath.startsWith('/en/') || currentPath.startsWith('/es/')) {
      newPath = currentPath.substring(3); // Remove the /xx/ prefix
    } else if (currentPath === '/en' || currentPath === '/es') {
      newPath = '/';
    }
    
    // Add new language prefix if not default (pt)
    if (newLanguage === "en") {
      newPath = newPath === '/' ? '/en' : `/en${newPath}`;
    } else if (newLanguage === "es") {
      newPath = newPath === '/' ? '/es' : `/es${newPath}`;
    }
    
    // Only navigate if path actually changes
    if (newPath !== currentPath) {
      navigate(newPath);
    }
    
    // Dispatch a custom event so other components can react to the language change
    window.dispatchEvent(new CustomEvent("languageChanged", { 
      detail: { language: newLanguage } 
    }));
  };

  // Effect to listen for language changes
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "language" && e.newValue) {
        setLanguageState(e.newValue as Language);
      }
    };
    
    window.addEventListener("storage", handleStorageChange);
    
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Update language when route changes
  useEffect(() => {
    const path = location.pathname;
    if (path.startsWith('/en')) {
      setLanguageState("en");
    } else if (path.startsWith('/es')) {
      setLanguageState("es");
    } else if (language !== "pt") {
      // Only set to pt if current language is different to avoid unnecessary re-renders
      setLanguageState("pt");
    }
  }, [location.pathname]);

  const t = (key: string): string => {
    return getTranslation(language, key);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
