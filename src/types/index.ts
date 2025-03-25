
export interface FormData {
  jobTitle: string;
  companyName: string;
  jobUrl?: string;
  candidateLinkedIn?: string;
  interviewerLinkedIn?: string;
  interviewDate?: string;
  interviewType?: "technical" | "behavioral" | "strategic" | "cultural";
  jobLevel?: "junior" | "mid" | "senior" | "leadership";
  industry?: "tech" | "finance" | "healthcare" | "retail" | "education" | "manufacturing" | "other";
  personalContext?: string;
  selectedLanguage?: string;
}

export interface Section {
  title: string;
  emoji: string;
  content: string;
}

export interface IndustrySections {
  tech?: Section[];
  finance?: Section[];
  healthcare?: Section[];
  retail?: Section[];
  education?: Section[];
  manufacturing?: Section[];
  other?: Section[];
}

export interface InterviewTypeSections {
  technical?: Section[];
  behavioral?: Section[];
  strategic?: Section[];
  cultural?: Section[];
}

export interface InterviewPlan {
  process: Section;
  questions: Section;
  questionsToAsk: Section;
  studyMaterials: Section;
  finalTips: Section;
  preparationSchedule?: Section;
  industrySections?: Section[];
  interviewTypeSections?: Section[];
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

export interface SavedPlan {
  id: string;
  user_id: string;
  job_title: string;
  company_name: string;
  content: InterviewPlan;
  raw_text?: string;
  created_at: string;
}

export type Language = "en" | "pt" | "es";
