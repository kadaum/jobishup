
import { FormData, InterviewPlan } from "@/types";
import { generateCorePlan } from "./corePlanGenerator";
import { addIndustrySections } from "./industryContent";
import { addInterviewTypeSections } from "./interviewTypeContent";

/**
 * Generates a complete interview plan based on form data
 */
export const generateMockResponse = (formData: FormData): InterviewPlan => {
  // Generate the core plan structure
  let plan = generateCorePlan(formData);
  
  // Add industry-specific sections if applicable
  plan = addIndustrySections(formData, plan);
  
  // Add interview type-specific sections if applicable
  plan = addInterviewTypeSections(formData, plan);
  
  return plan;
};
