export interface FormData {
  jobTitle: string;
  companyName: string;
  jobUrl?: string;
  candidateLinkedIn?: string;
  interviewerLinkedIn?: string;
  interviewDate?: string;
  interviewType?: "technical" | "behavioral" | "strategic" | "cultural";
  jobLevel?: "junior" | "mid" | "senior" | "leadership";
  interviewLanguage?: "portuguese" | "english" | "spanish";
  practicePoints?: string;
  personalContext?: string;
  selectedLanguage?: string;
}

export interface Section {
  title: string;
  emoji: string;
  content: string;
}

export interface InterviewPlan {
  process: Section;
  questions: Section;
  questionsToAsk: Section;
  studyMaterials: Section;
  finalTips: Section;
  rawText?: string;
}

export interface Donation {
  id: string;
  user_id?: string;
  amount: number;
  currency: string;
  status: string;
  payment_intent_id?: string;
  created_at: string;
  updated_at: string;
}
