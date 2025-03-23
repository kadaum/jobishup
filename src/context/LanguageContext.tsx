
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

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
    'donate': 'Doar agora',
    'donate.callToAction': 'Curtiu o InterviewPrep?',
    'donate.description': 'Se esse plano te ajudou, você pode nos apoiar com uma doação.',
    'donate.button': 'Doar agora',
    'donate.processing': 'Processando...',
    'donate.error': 'Não foi possível processar sua doação. Por favor, tente novamente.',
    'donate.success': 'Obrigado pela sua doação!',
    'donate.canceled': 'Doação cancelada.'
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
    'donate': 'Donate now',
    'donate.callToAction': 'Like InterviewPrep?',
    'donate.description': 'If this plan helped you, you can support us with a donation.',
    'donate.button': 'Donate now',
    'donate.processing': 'Processing...',
    'donate.error': 'We could not process your donation. Please try again.',
    'donate.success': 'Thank you for your donation!',
    'donate.canceled': 'Donation canceled.'
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
    'donate': 'Donar ahora',
    'donate.callToAction': '¿Te gusta InterviewPrep?',
    'donate.description': 'Si este plan te ayudó, puedes apoyarnos con una donación.',
    'donate.button': 'Donar ahora',
    'donate.processing': 'Procesando...',
    'donate.error': 'No pudimos procesar tu donación. Por favor, inténtalo de nuevo.',
    'donate.success': '¡Gracias por tu donación!',
    'donate.canceled': 'Donación cancelada.'
  }
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'pt',
  setLanguage: () => {},
  t: () => '',
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  // Get the preferred language from localStorage or default to 'pt'
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('preferred-language');
    return savedLanguage || 'pt';
  });

  const t = (key: string): string => {
    const currentTranslations = translations[language as keyof typeof translations] || translations.pt;
    return currentTranslations[key as keyof typeof currentTranslations] || key;
  };

  useEffect(() => {
    // Update localStorage when language changes
    localStorage.setItem('preferred-language', language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
