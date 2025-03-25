
import { FormData, InterviewPlan, Section } from "@/types";
import { createPrompt } from "./promptUtils";
import { generateProcessContent } from "./mockResponses/processContent";
import { generateTechQuestionsContent, generateManagementQuestionsContent } from "./mockResponses/questionContent";
import { generateQuestionsToAskContent } from "./mockResponses/questionsToAskContent";
import { generateTechStudyMaterialsContent, generateManagementStudyMaterialsContent, generateGeneralStudyMaterialsContent } from "./mockResponses/studyMaterialsContent";
import { generateFinalTipsContent } from "./mockResponses/finalTipsContent";
import { generatePreparationScheduleContent } from "./mockResponses/preparationScheduleContent";

/**
 * Generates a mock response for the interview plan
 */
export const generateMockResponse = (formData: FormData): InterviewPlan => {
  // Determine the output language
  const outputLanguage = formData.selectedLanguage || 'pt';
  const isEnglish = outputLanguage === 'en';
  const isSpanish = outputLanguage === 'es';
  
  // Generate different content based on job title and company
  const position = formData.jobTitle.toLowerCase();
  const level = formData.jobLevel || 'mid';
  
  // Determine if this is a tech position
  const isTech = 
    position.includes('desenvolv') || 
    position.includes('program') || 
    position.includes('soft') || 
    position.includes('front') || 
    position.includes('back') || 
    position.includes('full') || 
    position.includes('engineer') || 
    position.includes('dev') ||
    position.includes('tech');
  
  // Determine if this is a management position
  const isManagement = 
    position.includes('gerente') || 
    position.includes('gestor') || 
    position.includes('coordenador') || 
    position.includes('manager') || 
    position.includes('diretor') || 
    level === 'leadership';

  // Generate process content
  const processContent = generateProcessContent(formData, outputLanguage);
  
  // Generate questions content based on role
  const questionsContent = isTech || position.includes('dev') 
    ? generateTechQuestionsContent(outputLanguage) 
    : generateManagementQuestionsContent(outputLanguage);
  
  // Generate questions to ask content
  const questionsToAskContent = generateQuestionsToAskContent(outputLanguage);
  
  // Generate study materials content based on role
  let studyMaterialsContent = "";
  if (isTech) {
    studyMaterialsContent = generateTechStudyMaterialsContent(formData, outputLanguage);
  } else if (isManagement) {
    studyMaterialsContent = generateManagementStudyMaterialsContent(formData, outputLanguage);
  } else {
    studyMaterialsContent = generateGeneralStudyMaterialsContent(formData, outputLanguage);
  }
  
  // Generate final tips content
  const finalTipsContent = generateFinalTipsContent(formData, outputLanguage);

  // Generate preparation schedule if interview date is provided
  const preparationSchedule = generatePreparationScheduleContent(formData, outputLanguage);
  
  // Build raw text with appropriate titles
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
${processContent}
`;

  // Add preparation schedule section if interview date is provided
  if (formData.interviewDate && preparationSchedule) {
    rawText += `
${preparationScheduleSectionTitle}
${preparationSchedule.content}
`;
  }

  // Add remaining sections
  rawText += `
${questionsSectionTitle}
${questionsContent}

${questionsToAskSectionTitle}
${questionsToAskContent}

${studyMaterialsSectionTitle}
${studyMaterialsContent}

${finalTipsSectionTitle}
${finalTipsContent}
  `;

  // Create section titles based on the selected language
  let processSectionTitleShort = "";
  let questionsSectionTitleShort = "";
  let questionsToAskSectionTitleShort = "";
  let studyMaterialsSectionTitleShort = "";
  let finalTipsSectionTitleShort = "";

  if (isEnglish) {
    processSectionTitleShort = "Expected Selection Process";
    questionsSectionTitleShort = "Common Questions and How to Answer";
    questionsToAskSectionTitleShort = "Questions to Ask the Interviewer";
    studyMaterialsSectionTitleShort = "What to Study Before the Interview";
    finalTipsSectionTitleShort = "Final Personalized Tips";
  } else if (isSpanish) {
    processSectionTitleShort = "Proceso de selección esperado";
    questionsSectionTitleShort = "Preguntas comunes y cómo responder";
    questionsToAskSectionTitleShort = "Preguntas para hacer al entrevistador";
    studyMaterialsSectionTitleShort = "Qué estudiar antes de la entrevista";
    finalTipsSectionTitleShort = "Consejos finales personalizados";
  } else {
    processSectionTitleShort = "Processo seletivo esperado";
    questionsSectionTitleShort = "Perguntas comuns e como responder";
    questionsToAskSectionTitleShort = "Perguntas para fazer ao entrevistador";
    studyMaterialsSectionTitleShort = "O que estudar antes da entrevista";
    finalTipsSectionTitleShort = "Dicas finais personalizadas";
  }

  // Create the response object
  const response: InterviewPlan = {
    process: {
      title: processSectionTitleShort,
      emoji: "📋",
      content: processContent
    },
    questions: {
      title: questionsSectionTitleShort,
      emoji: "❓",
      content: questionsContent
    },
    questionsToAsk: {
      title: questionsToAskSectionTitleShort,
      emoji: "💬",
      content: questionsToAskContent
    },
    studyMaterials: {
      title: studyMaterialsSectionTitleShort,
      emoji: "📚",
      content: studyMaterialsContent
    },
    finalTips: {
      title: finalTipsSectionTitleShort,
      emoji: "🌟",
      content: finalTipsContent
    },
    rawText
  };

  // Add preparation schedule if interview date is provided
  if (formData.interviewDate && preparationSchedule) {
    response.preparationSchedule = {
      title: preparationSchedule.title,
      emoji: "📅",
      content: preparationSchedule.content
    };
  }

  return response;
};
