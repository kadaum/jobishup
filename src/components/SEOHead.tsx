
import { useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

interface SEOConfig {
  title: string;
  description: string;
  ogLocale: string;
  url: string;
}

const seoConfigs: Record<string, SEOConfig> = {
  pt: {
    title: "JobishUp | Domine suas entrevistas de emprego com um plano personalizado",
    description: "Digite a vaga e a empresa. A JobishUp gera um plano de preparação com base na cultura da empresa, possíveis perguntas e dicas práticas.",
    ogLocale: "pt_BR",
    url: "https://jobishup.com/"
  },
  en: {
    title: "JobishUp | Master your job interviews with a personalized prep plan",
    description: "Enter the job title and company. JobishUp creates a custom interview prep report with insights, likely questions, and company culture tips.",
    ogLocale: "en_US",
    url: "https://jobishup.com/en/"
  },
  es: {
    title: "JobishUp | Domina tus entrevistas laborales con un plan personalizado",
    description: "Ingresa el puesto y la empresa. JobishUp genera un informe con consejos, preguntas frecuentes y cómo prepararte según la cultura empresarial.",
    ogLocale: "es_ES",
    url: "https://jobishup.com/es/"
  }
};

const SEOHead = () => {
  const { language } = useLanguage();
  
  useEffect(() => {
    const config = seoConfigs[language] || seoConfigs.pt;
    
    // Update document title
    document.title = config.title;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', config.description);
    }
    
    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');
    const ogUrl = document.querySelector('meta[property="og:url"]');
    const ogLocale = document.querySelector('meta[property="og:locale"]');
    
    if (ogTitle) ogTitle.setAttribute('content', config.title);
    if (ogDescription) ogDescription.setAttribute('content', config.description);
    if (ogUrl) ogUrl.setAttribute('content', config.url);
    if (ogLocale) ogLocale.setAttribute('content', config.ogLocale);
    
    // Update HTML lang attribute
    const htmlTag = document.documentElement;
    if (language === 'en') {
      htmlTag.setAttribute('lang', 'en');
    } else if (language === 'es') {
      htmlTag.setAttribute('lang', 'es');
    } else {
      htmlTag.setAttribute('lang', 'pt-BR');
    }
  }, [language]);
  
  return null; // This component doesn't render anything
};

export default SEOHead;
