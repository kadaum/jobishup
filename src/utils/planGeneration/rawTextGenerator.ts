
import { FormData, InterviewPlan, Section } from "@/types";

/**
 * Generates the raw text version of the interview plan
 */
export const generateRawText = (formData: FormData, plan: InterviewPlan, outputLanguage: string): string => {
  const isEnglish = outputLanguage === 'en';
  const isSpanish = outputLanguage === 'es';
  
  // Define titles based on language
  let rawTextTitle = "";
  let positionTitle = "";
  let companyTitle = "";
  let processSectionTitle = "";
  let preparationScheduleSectionTitle = "";
  let questionsSectionTitle = "";
  let questionsToAskSectionTitle = "";
  let studyMaterialsSectionTitle = "";
  let finalTipsSectionTitle = "";

  if (isEnglish) {
    rawTextTitle = "INTERVIEW PREPARATION PLAN";
    positionTitle = "POSITION:";
    companyTitle = "COMPANY:";
    processSectionTitle = "1. EXPECTED SELECTION PROCESS";
    preparationScheduleSectionTitle = "2. PREPARATION SCHEDULE";
    questionsSectionTitle = `${formData.interviewDate ? "3" : "2"}. COMMON QUESTIONS AND HOW TO ANSWER`;
    questionsToAskSectionTitle = `${formData.interviewDate ? "4" : "3"}. QUESTIONS TO ASK THE INTERVIEWER`;
    studyMaterialsSectionTitle = `${formData.interviewDate ? "5" : "4"}. WHAT TO STUDY BEFORE THE INTERVIEW`;
    finalTipsSectionTitle = `${formData.interviewDate ? "6" : "5"}. FINAL PERSONALIZED TIPS`;
  } else if (isSpanish) {
    rawTextTitle = "PLAN DE PREPARACIÓN PARA ENTREVISTA";
    positionTitle = "PUESTO:";
    companyTitle = "EMPRESA:";
    processSectionTitle = "1. PROCESO DE SELECCIÓN ESPERADO";
    preparationScheduleSectionTitle = "2. CALENDARIO DE PREPARACIÓN";
    questionsSectionTitle = `${formData.interviewDate ? "3" : "2"}. PREGUNTAS COMUNES Y CÓMO RESPONDER`;
    questionsToAskSectionTitle = `${formData.interviewDate ? "4" : "3"}. PREGUNTAS PARA HACER AL ENTREVISTADOR`;
    studyMaterialsSectionTitle = `${formData.interviewDate ? "5" : "4"}. QUÉ ESTUDIAR ANTES DE LA ENTREVISTA`;
    finalTipsSectionTitle = `${formData.interviewDate ? "6" : "5"}. CONSEJOS FINALES PERSONALIZADOS`;
  } else {
    rawTextTitle = "PLANO DE PREPARAÇÃO PARA ENTREVISTA";
    positionTitle = "CARGO:";
    companyTitle = "EMPRESA:";
    processSectionTitle = "1. PROCESSO SELETIVO ESPERADO";
    preparationScheduleSectionTitle = "2. CRONOGRAMA DE PREPARAÇÃO";
    questionsSectionTitle = `${formData.interviewDate ? "3" : "2"}. PERGUNTAS COMUNS E COMO RESPONDER`;
    questionsToAskSectionTitle = `${formData.interviewDate ? "4" : "3"}. PERGUNTAS PARA FAZER AO ENTREVISTADOR`;
    studyMaterialsSectionTitle = `${formData.interviewDate ? "5" : "4"}. O QUE ESTUDAR ANTES DA ENTREVISTA`;
    finalTipsSectionTitle = `${formData.interviewDate ? "6" : "5"}. DICAS FINAIS PERSONALIZADAS`;
  }

  // Build raw text
  let rawText = `
${rawTextTitle}

${positionTitle} ${formData.jobTitle}
${companyTitle} ${formData.companyName}

${processSectionTitle}
${plan.process.content}
`;

  // Add preparation schedule section if interview date is provided
  if (formData.interviewDate && plan.preparationSchedule) {
    rawText += `
${preparationScheduleSectionTitle}
${plan.preparationSchedule.content}
`;
  }

  // Add remaining sections
  rawText += `
${questionsSectionTitle}
${plan.questions.content}

${questionsToAskSectionTitle}
${plan.questionsToAsk.content}

${studyMaterialsSectionTitle}
${plan.studyMaterials.content}

${finalTipsSectionTitle}
${plan.finalTips.content}
  `;

  return rawText;
};
