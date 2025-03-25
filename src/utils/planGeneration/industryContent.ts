
import { FormData, Section } from "@/types";
import { generateIndustrySections } from "../mockResponses/industrySections";

/**
 * Adds industry-specific sections to the interview plan if an industry is selected
 */
export const addIndustrySections = (formData: FormData, plan: any) => {
  if (formData.industry && formData.industry !== 'other') {
    plan.industrySections = generateIndustrySections(formData, formData.selectedLanguage || 'en');
  }
  
  return plan;
};
