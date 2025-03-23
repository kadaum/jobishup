
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "pt" | "en" | "es";

interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

const translations: Translations = {
  pt: {
    "app.title": "Interview Prep",
    "app.subtitle": "Domine suas entrevistas de emprego com um plano personalizado",
    "form.jobTitle": "Título da vaga",
    "form.jobTitlePlaceholder": "Ex: Desenvolvedor Frontend",
    "form.companyName": "Nome da empresa",
    "form.companyNamePlaceholder": "Ex: Google",
    "form.jobUrl": "URL da vaga (opcional)",
    "form.jobUrlPlaceholder": "Link para a descrição da vaga",
    "form.candidateLinkedIn": "LinkedIn do candidato (opcional)",
    "form.candidateLinkedInPlaceholder": "URL do perfil do LinkedIn",
    "form.interviewerLinkedIn": "LinkedIn do entrevistador (opcional)",
    "form.interviewerLinkedInPlaceholder": "URL do perfil do LinkedIn",
    "form.interviewDate": "Data da entrevista (opcional)",
    "form.interviewDatePlaceholder": "Quando será a entrevista?",
    "form.interviewType": "Tipo de entrevista",
    "form.interviewType.technical": "Técnica",
    "form.interviewType.behavioral": "Comportamental",
    "form.interviewType.strategic": "Estratégica",
    "form.interviewType.cultural": "Cultural",
    "form.jobLevel": "Nível da vaga",
    "form.jobLevel.junior": "Júnior",
    "form.jobLevel.mid": "Pleno",
    "form.jobLevel.senior": "Sênior",
    "form.jobLevel.leadership": "Liderança",
    "form.interviewLanguage": "Idioma da entrevista",
    "form.interviewLanguage.portuguese": "Português",
    "form.interviewLanguage.english": "Inglês",
    "form.interviewLanguage.spanish": "Espanhol",
    "form.practicePoints": "Pontos para praticar (opcional)",
    "form.practicePointsPlaceholder": "Ex: Quero trabalhar em explicações técnicas",
    "form.personalContext": "Contexto pessoal (opcional)",
    "form.personalContextPlaceholder": "Ex: Estou mudando de carreira",
    "form.submit": "Gerar Plano de Entrevista",
    "form.optional": "(opcional)",
    "loading.title": "Criando seu plano...",
    "loading.subtitle": "Isso pode levar alguns segundos",
    "backToForm": "Voltar ao formulário",
    "exportPlan": "Compartilhe seu plano",
    "downloadPDF": "Baixar como PDF",
    "sharePlan": "Compartilhar",
    "sendEmail": "Enviar por Email",
    "donate.title": "Gostou dessa ferramenta?",
    "donate.description": "Me ajude a manter este projeto gratuito.",
    "donate.button": "Fazer uma doação",
    "plan.ready": "Seu plano está pronto!",
    "plan.error": "Erro ao gerar o plano. Por favor, tente novamente.",
    "plan.savePlan": "Salvar plano",
    "plan.saved": "Plano salvo com sucesso!",
    "plan.saveError": "Erro ao salvar o plano. Por favor, tente novamente.",
    "auth.signIn": "Entrar",
    "auth.signUp": "Criar conta",
    "auth.email": "Email",
    "auth.password": "Senha",
    "auth.fullName": "Nome completo",
    "auth.signInButton": "Entrar",
    "auth.signUpButton": "Criar conta",
    "auth.loading": "Carregando...",
    "auth.alreadyHaveAccount": "Já tem uma conta? Entrar",
    "auth.dontHaveAccount": "Não tem uma conta? Criar",
    "auth.signOut": "Sair",
    "auth.loginRequired": "Você precisa estar logado para salvar o plano",
    "savedPlans.title": "Meus Planos Salvos",
    "savedPlans.myPlans": "Meus Planos",
    "savedPlans.loading": "Carregando seus planos...",
    "savedPlans.noPlans": "Você ainda não tem planos salvos",
    "savedPlans.createFirst": "Criar meu primeiro plano",
    "savedPlans.view": "Ver",
    "savedPlans.delete": "Excluir",
    "savedPlans.deleted": "Plano excluído com sucesso",
    "savedPlans.errorFetching": "Erro ao carregar planos",
    "savedPlans.errorDeleting": "Erro ao excluir plano"
  },
  en: {
    "app.title": "Interview Prep",
    "app.subtitle": "Master your job interviews with a personalized plan",
    "form.jobTitle": "Job Title",
    "form.jobTitlePlaceholder": "E.g., Frontend Developer",
    "form.companyName": "Company Name",
    "form.companyNamePlaceholder": "E.g., Google",
    "form.jobUrl": "Job URL (optional)",
    "form.jobUrlPlaceholder": "Link to job description",
    "form.candidateLinkedIn": "Candidate's LinkedIn (optional)",
    "form.candidateLinkedInPlaceholder": "LinkedIn profile URL",
    "form.interviewerLinkedIn": "Interviewer's LinkedIn (optional)",
    "form.interviewerLinkedInPlaceholder": "LinkedIn profile URL",
    "form.interviewDate": "Interview Date (optional)",
    "form.interviewDatePlaceholder": "When is the interview?",
    "form.interviewType": "Interview Type",
    "form.interviewType.technical": "Technical",
    "form.interviewType.behavioral": "Behavioral",
    "form.interviewType.strategic": "Strategic",
    "form.interviewType.cultural": "Cultural",
    "form.jobLevel": "Job Level",
    "form.jobLevel.junior": "Junior",
    "form.jobLevel.mid": "Mid-level",
    "form.jobLevel.senior": "Senior",
    "form.jobLevel.leadership": "Leadership",
    "form.interviewLanguage": "Interview Language",
    "form.interviewLanguage.portuguese": "Portuguese",
    "form.interviewLanguage.english": "English",
    "form.interviewLanguage.spanish": "Spanish",
    "form.practicePoints": "Points to Practice (optional)",
    "form.practicePointsPlaceholder": "E.g., I want to work on technical explanations",
    "form.personalContext": "Personal Context (optional)",
    "form.personalContextPlaceholder": "E.g., I am changing careers",
    "form.submit": "Generate Interview Plan",
    "form.optional": "(optional)",
    "loading.title": "Creating your plan...",
    "loading.subtitle": "This may take a few seconds",
    "backToForm": "Back to form",
    "exportPlan": "Share your plan",
    "downloadPDF": "Download as PDF",
    "sharePlan": "Share",
    "sendEmail": "Send via Email",
    "donate.title": "Did you like this tool?",
    "donate.description": "Help me keep this project free.",
    "donate.button": "Make a donation",
    "plan.ready": "Your plan is ready!",
    "plan.error": "Error generating the plan. Please try again.",
    "plan.savePlan": "Save plan",
    "plan.saved": "Plan saved successfully!",
    "plan.saveError": "Error saving the plan. Please try again.",
    "auth.signIn": "Sign In",
    "auth.signUp": "Sign Up",
    "auth.email": "Email",
    "auth.password": "Password",
    "auth.fullName": "Full Name",
    "auth.signInButton": "Sign In",
    "auth.signUpButton": "Sign Up",
    "auth.loading": "Loading...",
    "auth.alreadyHaveAccount": "Already have an account? Sign In",
    "auth.dontHaveAccount": "Don't have an account? Sign Up",
    "auth.signOut": "Sign Out",
    "auth.loginRequired": "You need to be logged in to save the plan",
    "savedPlans.title": "My Saved Plans",
    "savedPlans.myPlans": "My Plans",
    "savedPlans.loading": "Loading your plans...",
    "savedPlans.noPlans": "You don't have any saved plans yet",
    "savedPlans.createFirst": "Create my first plan",
    "savedPlans.view": "View",
    "savedPlans.delete": "Delete",
    "savedPlans.deleted": "Plan deleted successfully",
    "savedPlans.errorFetching": "Error loading plans",
    "savedPlans.errorDeleting": "Error deleting plan"
  },
  es: {
    "app.title": "Interview Prep",
    "app.subtitle": "Domina tus entrevistas de trabajo con un plan personalizado",
    "form.jobTitle": "Título del puesto",
    "form.jobTitlePlaceholder": "Ej: Desarrollador Frontend",
    "form.companyName": "Nombre de la empresa",
    "form.companyNamePlaceholder": "Ej: Google",
    "form.jobUrl": "URL del trabajo (opcional)",
    "form.jobUrlPlaceholder": "Enlace a la descripción del trabajo",
    "form.candidateLinkedIn": "LinkedIn del candidato (opcional)",
    "form.candidateLinkedInPlaceholder": "URL del perfil de LinkedIn",
    "form.interviewerLinkedIn": "LinkedIn del entrevistador (opcional)",
    "form.interviewerLinkedInPlaceholder": "URL del perfil de LinkedIn",
    "form.interviewDate": "Fecha de entrevista (opcional)",
    "form.interviewDatePlaceholder": "¿Cuándo es la entrevista?",
    "form.interviewType": "Tipo de entrevista",
    "form.interviewType.technical": "Técnica",
    "form.interviewType.behavioral": "Comportamental",
    "form.interviewType.strategic": "Estratégica",
    "form.interviewType.cultural": "Cultural",
    "form.jobLevel": "Nivel del puesto",
    "form.jobLevel.junior": "Junior",
    "form.jobLevel.mid": "Nivel medio",
    "form.jobLevel.senior": "Senior",
    "form.jobLevel.leadership": "Liderazgo",
    "form.interviewLanguage": "Idioma de la entrevista",
    "form.interviewLanguage.portuguese": "Portugués",
    "form.interviewLanguage.english": "Inglés",
    "form.interviewLanguage.spanish": "Español",
    "form.practicePoints": "Puntos a practicar (opcional)",
    "form.practicePointsPlaceholder": "Ej: Quiero trabajar en explicaciones técnicas",
    "form.personalContext": "Contexto personal (opcional)",
    "form.personalContextPlaceholder": "Ej: Estoy cambiando de carrera",
    "form.submit": "Generar Plan de Entrevista",
    "form.optional": "(opcional)",
    "loading.title": "Creando tu plan...",
    "loading.subtitle": "Esto puede tomar unos segundos",
    "backToForm": "Volver al formulario",
    "exportPlan": "Comparte tu plan",
    "downloadPDF": "Descargar como PDF",
    "sharePlan": "Compartir",
    "sendEmail": "Enviar por Email",
    "donate.title": "¿Te gustó esta herramienta?",
    "donate.description": "Ayúdame a mantener este proyecto gratuito.",
    "donate.button": "Hacer una donación",
    "plan.ready": "¡Tu plan está listo!",
    "plan.error": "Error al generar el plan. Por favor, inténtalo de nuevo.",
    "plan.savePlan": "Guardar plan",
    "plan.saved": "¡Plan guardado con éxito!",
    "plan.saveError": "Error al guardar el plan. Por favor, inténtalo de nuevo.",
    "auth.signIn": "Iniciar sesión",
    "auth.signUp": "Registrarse",
    "auth.email": "Email",
    "auth.password": "Contraseña",
    "auth.fullName": "Nombre completo",
    "auth.signInButton": "Iniciar sesión",
    "auth.signUpButton": "Registrarse",
    "auth.loading": "Cargando...",
    "auth.alreadyHaveAccount": "¿Ya tienes una cuenta? Iniciar sesión",
    "auth.dontHaveAccount": "¿No tienes una cuenta? Registrarse",
    "auth.signOut": "Cerrar sesión",
    "auth.loginRequired": "Debes iniciar sesión para guardar el plan",
    "savedPlans.title": "Mis Planes Guardados",
    "savedPlans.myPlans": "Mis Planes",
    "savedPlans.loading": "Cargando tus planes...",
    "savedPlans.noPlans": "Aún no tienes planes guardados",
    "savedPlans.createFirst": "Crear mi primer plan",
    "savedPlans.view": "Ver",
    "savedPlans.delete": "Eliminar",
    "savedPlans.deleted": "Plan eliminado con éxito",
    "savedPlans.errorFetching": "Error al cargar planes",
    "savedPlans.errorDeleting": "Error al eliminar plan"
  }
};

interface LanguageContextProps {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextProps>({
  language: "pt",
  setLanguage: () => {},
  t: () => "",
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    // Try to get language from localStorage
    const savedLanguage = localStorage.getItem("language") as Language;
    return savedLanguage || "pt";
  });

  // Update language in localStorage and trigger event for other components to update
  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    localStorage.setItem("language", newLanguage);
    
    // Dispatch a custom event so other components can react to the language change
    window.dispatchEvent(new CustomEvent("languageChanged", { 
      detail: { language: newLanguage } 
    }));
  };

  // Effect to listen for language changes
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "language" && e.newValue) {
        setLanguageState(e.newValue as Language);
      }
    };
    
    window.addEventListener("storage", handleStorageChange);
    
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
