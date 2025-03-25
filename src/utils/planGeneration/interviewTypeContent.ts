
import { FormData, Section } from "@/types";
import { generateInterviewTypeSections } from "../mockResponses/interviewTypeSections";

/**
 * Adds interview type-specific sections to the interview plan if an interview type is selected
 */
export const addInterviewTypeSections = (formData: FormData, plan: any) => {
  if (formData.interviewType) {
    plan.interviewTypeSections = generateInterviewTypeSections(formData, formData.selectedLanguage || 'en');
  }
  
  return plan;
};
