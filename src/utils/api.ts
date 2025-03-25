
import { FormData, InterviewPlan } from "@/types";
import { createPrompt } from "./promptUtils";
import { generateMockResponse } from "./planGeneration";

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
  
  return mockResponse;
};
