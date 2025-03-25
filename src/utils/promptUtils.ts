
import { FormData } from "@/types";
import { format } from "date-fns";

/**
 * Creates a prompt for the interview plan generation based on form data
 */
export const createPrompt = (formData: FormData): string => {
  // Determine the language for the prompt
  const outputLanguage = formData.selectedLanguage || 'pt';
  
  // Create base prompt in the selected language
  let prompt = '';
  
  if (outputLanguage === 'en') {
    prompt = `Generate an interview preparation plan for a ${formData.jobTitle} position at ${formData.companyName}. Answer in English.`;
  } else if (outputLanguage === 'es') {
    prompt = `Genera un plan de preparación para una entrevista para el puesto de ${formData.jobTitle} en la empresa ${formData.companyName}. Responde en español.`;
  } else {
    prompt = `Gere um plano de preparação para uma entrevista para a vaga de ${formData.jobTitle} na empresa ${formData.companyName}. Responda em português.`;
  }
  
  // Add additional information to the prompt based on form data
  if (formData.jobUrl) {
    if (outputLanguage === 'en') {
      prompt += ` The job is available at this URL: ${formData.jobUrl}.`;
    } else if (outputLanguage === 'es') {
      prompt += ` El puesto está disponible en esta URL: ${formData.jobUrl}.`;
    } else {
      prompt += ` A vaga está disponível nesta URL: ${formData.jobUrl}.`;
    }
  }
  
  if (formData.candidateLinkedIn) {
    if (outputLanguage === 'en') {
      prompt += ` Candidate's LinkedIn: ${formData.candidateLinkedIn}.`;
    } else if (outputLanguage === 'es') {
      prompt += ` LinkedIn del candidato: ${formData.candidateLinkedIn}.`;
    } else {
      prompt += ` LinkedIn do candidato: ${formData.candidateLinkedIn}.`;
    }
  }
  
  if (formData.interviewerLinkedIn) {
    if (outputLanguage === 'en') {
      prompt += ` Interviewer's LinkedIn: ${formData.interviewerLinkedIn}.`;
    } else if (outputLanguage === 'es') {
      prompt += ` LinkedIn del entrevistador: ${formData.interviewerLinkedIn}.`;
    } else {
      prompt += ` LinkedIn do(s) entrevistador(es): ${formData.interviewerLinkedIn}.`;
    }
  }
  
  if (formData.interviewDate) {
    if (outputLanguage === 'en') {
      prompt += ` The interview is scheduled for: ${formData.interviewDate}.`;
    } else if (outputLanguage === 'es') {
      prompt += ` La entrevista está programada para: ${formData.interviewDate}.`;
    } else {
      prompt += ` A entrevista está agendada para: ${formData.interviewDate}.`;
    }
  }
  
  if (formData.interviewType) {
    const typeMap: Record<string, Record<string, string>> = {
      en: {
        technical: "technical",
        behavioral: "behavioral",
        strategic: "strategic",
        cultural: "cultural"
      },
      es: {
        technical: "técnica",
        behavioral: "comportamental",
        strategic: "estratégica",
        cultural: "cultural"
      },
      pt: {
        technical: "técnica",
        behavioral: "comportamental",
        strategic: "estratégica",
        cultural: "cultural"
      }
    };
    
    const languageKey = outputLanguage === 'en' ? 'en' : outputLanguage === 'es' ? 'es' : 'pt';
    const interviewTypeTranslated = typeMap[languageKey][formData.interviewType] || formData.interviewType;
    
    if (outputLanguage === 'en') {
      prompt += ` The interview type is: ${interviewTypeTranslated}.`;
    } else if (outputLanguage === 'es') {
      prompt += ` El tipo de entrevista es: ${interviewTypeTranslated}.`;
    } else {
      prompt += ` O tipo de entrevista é: ${interviewTypeTranslated}.`;
    }
  }
  
  if (formData.jobLevel) {
    const levelMap: Record<string, Record<string, string>> = {
      en: {
        junior: "junior",
        mid: "mid-level",
        senior: "senior",
        leadership: "leadership"
      },
      es: {
        junior: "junior",
        mid: "nivel medio",
        senior: "senior",
        leadership: "dirección"
      },
      pt: {
        junior: "júnior",
        mid: "pleno",
        senior: "sênior",
        leadership: "direção"
      }
    };
    
    const languageKey = outputLanguage === 'en' ? 'en' : outputLanguage === 'es' ? 'es' : 'pt';
    const jobLevelTranslated = levelMap[languageKey][formData.jobLevel] || formData.jobLevel;
    
    if (outputLanguage === 'en') {
      prompt += ` The job level is: ${jobLevelTranslated}.`;
    } else if (outputLanguage === 'es') {
      prompt += ` El nivel del puesto es: ${jobLevelTranslated}.`;
    } else {
      prompt += ` O nível da vaga é: ${jobLevelTranslated}.`;
    }
  }
  
  if (formData.personalContext) {
    if (outputLanguage === 'en') {
      prompt += ` Candidate's personal context: ${formData.personalContext}.`;
    } else if (outputLanguage === 'es') {
      prompt += ` Contexto personal del candidato: ${formData.personalContext}.`;
    } else {
      prompt += ` Contexto pessoal do candidato: ${formData.personalContext}.`;
    }
  }
  
  return prompt;
};
