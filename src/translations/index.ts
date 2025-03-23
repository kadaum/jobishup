
import { translations as enTranslations } from './en';
import { translations as ptTranslations } from './pt';
import { translations as esTranslations } from './es';
import { Language } from '@/types';

export const translations: Record<Language, Record<string, string>> = {
  en: enTranslations,
  pt: ptTranslations,
  es: esTranslations
};

export const getTranslation = (language: Language, key: string): string => {
  return translations[language][key] || key;
};
