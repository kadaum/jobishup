
import { CheckCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const FeaturesList = () => {
  const { language } = useLanguage();
  
  const features = [
    language === 'en' ? '40+ additional tailored questions with model answers' : 
    language === 'es' ? '40+ preguntas personalizadas adicionales con respuestas modelo' : 
    '40+ perguntas personalizadas adicionais com respostas modelo',
    
    language === 'en' ? 'Interview simulation script with feedback points' : 
    language === 'es' ? 'Guión de simulación de entrevista con puntos de retroalimentación' : 
    'Roteiro de simulação de entrevista com pontos de feedback',
    
    language === 'en' ? 'Salary negotiation strategies and talking points' : 
    language === 'es' ? 'Estrategias de negociación salarial y puntos de conversación' : 
    'Estratégias de negociação salarial e pontos de discussão',
    
    language === 'en' ? 'Competency matrix with self-assessment guide' : 
    language === 'es' ? 'Matriz de competencias con guía de autoevaluación' : 
    'Matriz de competências com guia de autoavaliação'
  ];
  
  return (
    <ul className="space-y-2 mb-4">
      {features.map((feature, i) => (
        <li key={i} className="flex items-start text-sm">
          <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
  );
};

export default FeaturesList;
