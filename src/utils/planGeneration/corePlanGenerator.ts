
import { FormData, InterviewPlan, Section } from "@/types";
import { generateProcessContent } from "../mockResponses/processContent";
import { generateTechQuestionsContent, generateManagementQuestionsContent } from "../mockResponses/questionContent";
import { generateQuestionsToAskContent } from "../mockResponses/questionsToAskContent";
import { generateTechStudyMaterialsContent, generateManagementStudyMaterialsContent, generateGeneralStudyMaterialsContent } from "../mockResponses/studyMaterialsContent";
import { generateFinalTipsContent } from "../mockResponses/finalTipsContent";
import { generatePreparationScheduleContent } from "../mockResponses/preparationScheduleContent";
import { generateSectionTitles } from "./sectionTitles";
import { generateRawText } from "./rawTextGenerator";

/**
 * Generates a unique ID for the plan
 */
const generatePlanId = (): string => {
  return `plan_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
};

/**
 * Generates the core interview plan structure
 */
export const generateCorePlan = (formData: FormData): InterviewPlan => {
  // Determine the output language
  const outputLanguage = formData.selectedLanguage || 'pt';
  
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
  
  // Get section titles
  const sectionTitles = generateSectionTitles(outputLanguage);
  
  // Create the response object
  const response: InterviewPlan = {
    id: generatePlanId(),
    process: {
      title: sectionTitles.processSectionTitleShort,
      emoji: "📋",
      content: processContent
    },
    questions: {
      title: sectionTitles.questionsSectionTitleShort,
      emoji: "❓",
      content: questionsContent
    },
    questionsToAsk: {
      title: sectionTitles.questionsToAskSectionTitleShort,
      emoji: "💬",
      content: questionsToAskContent
    },
    studyMaterials: {
      title: sectionTitles.studyMaterialsSectionTitleShort,
      emoji: "📚",
      content: studyMaterialsContent
    },
    finalTips: {
      title: sectionTitles.finalTipsSectionTitleShort,
      emoji: "🌟",
      content: finalTipsContent
    }
  };

  // Add preparation schedule if interview date is provided
  if (formData.interviewDate && preparationSchedule) {
    response.preparationSchedule = {
      title: preparationSchedule.title,
      emoji: "📅",
      content: preparationSchedule.content
    };
  }
  
  // Generate raw text
  response.rawText = generateRawText(formData, response, outputLanguage);

  return response;
};
