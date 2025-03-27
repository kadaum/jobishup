import { en as enUS } from 'date-fns/locale';

export const en = {
  common: {
    edit: 'Edit',
    delete: 'Delete',
  },
  app: {
    title: "Job Interview Preparation",
    subtitle: "Ace your next job interview with our AI-powered tool. Get personalized interview plans tailored to your specific role and company, and land your dream job!",
  },
  plan: {
    ready: 'Your interview plan is ready!',
    error: 'Error generating interview plan. Please try again.',
    savePlan: 'Save Plan',
    saved: 'Plan saved successfully!',
    saveError: 'Error saving plan. Please try again.',
  },
  form: {
    jobTitle: 'Job Title',
    companyName: 'Company Name',
    yearsOfExperience: 'Years of Experience',
    optionalFields: 'Optional Fields',
    industry: 'Industry',
    additionalNotes: 'Additional Notes',
    submit: 'Generate Interview Plan',
    loading: 'Generating Interview Plan...',
  },
  interviewPlan: {
    companyResearch: 'Company Research',
    commonQuestions: 'Common Interview Questions',
    technicalQuestions: 'Technical Questions',
    behavioralQuestions: 'Behavioral Questions',
    questionsToAsk: 'Questions to Ask the Interviewer',
    thankYouNote: 'Thank You Note Template',
  },
  backToForm: 'Back to Form',
  auth: {
    signIn: 'Sign In',
    signOut: 'Sign Out',
    email: 'Email',
    password: 'Password',
    login: 'Login',
    register: 'Register',
    loginRequired: 'You must be logged in to save plans.',
    error: 'Authentication error. Please try again.',
    success: 'Authentication successful!',
  },
  savedPlans: {
    title: 'Saved Interview Plans',
    myPlans: 'My Plans',
    noPlans: 'No plans saved yet.',
    deleteConfirmation: 'Are you sure you want to delete this plan?',
    deleteSuccess: 'Plan deleted successfully!',
    deleteError: 'Error deleting plan. Please try again.',
  },
  footer: {
    builtBy: 'Built by',
    and: 'and',
    using: 'using',
  },
  dateFns: {
    locale: enUS,
  },
  notFound: {
    title: '404 - Not Found',
    description: 'The page you are looking for does not exist.',
    backToHome: 'Back to Home',
  },
  faq: {
    optionalFields: {
      title: "Optional Fields Guide",
      description: "Learn how to make the most of our optional fields",
      question1: "What are optional fields in the form?",
      answer1: "Optional fields provide additional context that helps our AI create more tailored interview plans. While not required, these details enhance the quality and specificity of your interview preparation.",
      question2: "How does specifying my industry help?",
      answer2: "Specifying your industry allows us to include industry-specific questions, technologies, and trends in your interview plan. This makes your preparation more relevant and targeted to your specific field.",
      question3: "Should I include additional notes?",
      answer3: "Additional notes are very helpful for customizing your plan. You can mention specific areas you want to focus on, technologies you're familiar with, or aspects of the job you're particularly interested in.",
    },
    contactInfo: {
      title: "Need more help?",
      description: "We're here to assist you with your interview preparation",
      buttonText: "Contact Support",
    }
  },
};

export default en;
