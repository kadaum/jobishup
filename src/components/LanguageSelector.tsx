
import { useState, useRef, useEffect } from "react";
import { Check, ChevronDown, Globe } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Language } from "@/types";
import { useLocation } from "react-router-dom";

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  
  const languageOptions = [
    { value: "pt" as Language, label: "Português", url: "/" },
    { value: "en" as Language, label: "English", url: "/en/" },
    { value: "es" as Language, label: "Español", url: "/es/" }
  ];

  const toggleDropdown = () => setIsOpen(!isOpen);
  
  const handleLanguageSelect = (value: Language) => {
    setLanguage(value);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getLabelForLanguage = (lang: string): string => {
    const option = languageOptions.find(opt => opt.value === lang);
    return option ? option.label : languageOptions[0].label;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="outline"
        size="sm"
        onClick={toggleDropdown}
        className="flex items-center gap-1 border-0 bg-transparent hover:bg-white/10"
        aria-label="Select language"
      >
        <Globe className="h-4 w-4" />
        <span className="hidden sm:inline">{getLabelForLanguage(language)}</span>
        <ChevronDown className={`h-3 w-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute right-0 mt-2 w-40 bg-white dark:bg-slate-900 shadow-lg rounded-md overflow-hidden z-50 border border-slate-200 dark:border-slate-800"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
          >
            {languageOptions.map((option) => (
              <button
                key={option.value}
                className="flex items-center justify-between w-full px-4 py-2 text-sm text-left hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                onClick={() => handleLanguageSelect(option.value)}
                aria-current={language === option.value ? "true" : "false"}
              >
                {option.label}
                {language === option.value && <Check className="h-4 w-4" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSelector;
