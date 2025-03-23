
import React, { createContext, useState, useContext, ReactNode } from 'react';

type LanguageContextType = {
  language: string;
  setLanguage: (language: string) => void;
  t: (key: string) => string;
};

const translations = {
  pt: {
    'app.title': 'InterviewPrep',
    'app.subtitle': 'Use IA para se preparar para suas próximas entrevistas de emprego',
    'loading.title': 'Estamos analisando sua vaga',
    'loading.message': 'Estamos analisando sua vaga, seu perfil e preparando um plano sob medida para sua entrevista...',
    'backToForm': 'Voltar ao formulário',
    'downloadPDF': 'Baixar PDF',
    'sendEmail': 'Enviar por email',
    'exportPlan': 'Exportar plano',
    'donate': 'Doar agora'
  },
  en: {
    'app.title': 'InterviewPrep',
    'app.subtitle': 'Use AI to prepare for your next job interviews',
    'loading.title': 'We are analyzing your position',
    'loading.message': 'We are analyzing your position, your profile, and preparing a customized plan for your interview...',
    'backToForm': 'Back to form',
    'downloadPDF': 'Download PDF',
    'sendEmail': 'Send by email',
    'exportPlan': 'Export plan',
    'donate': 'Donate now'
  },
  es: {
    'app.title': 'InterviewPrep',
    'app.subtitle': 'Usa IA para prepararte para tus próximas entrevistas de trabajo',
    'loading.title': 'Estamos analizando tu puesto',
    'loading.message': 'Estamos analizando tu puesto, tu perfil y preparando un plan a medida para tu entrevista...',
    'backToForm': 'Volver al formulario',
    'downloadPDF': 'Descargar PDF',
    'sendEmail': 'Enviar por correo',
    'exportPlan': 'Exportar plan',
    'donate': 'Donar ahora'
  }
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'pt',
  setLanguage: () => {},
  t: () => '',
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState('pt');

  const t = (key: string): string => {
    const currentTranslations = translations[language as keyof typeof translations] || translations.pt;
    return currentTranslations[key as keyof typeof currentTranslations] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
