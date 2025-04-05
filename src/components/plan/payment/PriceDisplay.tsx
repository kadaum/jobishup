
import { useLanguage } from "@/context/LanguageContext";

export const getPriceDisplay = (language: string): string => {
  const currencyMap: Record<string, { symbol: string, amount: number }> = {
    en: { symbol: '$', amount: 5.99 },
    pt: { symbol: 'R$', amount: 5.99 },
    es: { symbol: '€', amount: 5.99 }
  };
  
  const { symbol, amount } = currencyMap[language] || currencyMap.pt;
  return `${symbol}${amount.toFixed(2)}`;
};

const PriceDisplay = () => {
  const { language } = useLanguage();
  
  return (
    <div className="bg-blue-50 p-3 rounded-md mb-4 text-center">
      <span className="text-sm text-gray-500">
        {language === 'en' ? 'One-time payment' : 
         language === 'es' ? 'Pago único' : 
         'Pagamento único'}
      </span>
      <div className="text-2xl font-bold text-blue-600">
        {getPriceDisplay(language)}
      </div>
    </div>
  );
};

export default PriceDisplay;
