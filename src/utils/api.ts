
import { FormData, InterviewPlan } from "@/types";
import { createPrompt } from "./promptUtils";
import { generateMockResponse } from "./planGenerator";
import { generateIndustrySections } from "./mockResponses/industrySections";
import { generateInterviewTypeSections } from "./mockResponses/interviewTypeSections";

// This is a mock function that simulates a ChatGPT API call
// In a real implementation, this would call the OpenAI API
export const generateInterviewPlan = async (formData: FormData): Promise<InterviewPlan> => {
  // Wait for 3-5 seconds to simulate API call
  const delay = 3000 + Math.random() * 2000;
  await new Promise(resolve => setTimeout(resolve, delay));
  
  // Create prompt based on the form data
  const prompt = createPrompt(formData);
  
  // In a real implementation, this would be replaced with an actual API call
  // For now, we return a mock response
  const mockResponse = generateMockResponse(formData);
  
  // Add industry-specific sections if an industry is selected
  if (formData.industry && formData.industry !== 'other') {
    mockResponse.industrySections = generateIndustrySections(formData, formData.selectedLanguage || 'en');
  }
  
  // Add interview type-specific sections if an interview type is selected
  if (formData.interviewType) {
    mockResponse.interviewTypeSections = generateInterviewTypeSections(formData, formData.selectedLanguage || 'en');
  }
  
  return mockResponse;
};
