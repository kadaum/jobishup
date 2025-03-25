
import { FormData } from "@/types";
import { format, differenceInDays } from "date-fns";

/**
 * Generates preparation schedule content if interview date is provided
 */
export const generatePreparationScheduleContent = (formData: FormData, outputLanguage: string): { title: string, content: string } | null => {
  if (!formData.interviewDate) {
    return null;
  }
  
  const currentDate = new Date();
  const interviewDate = new Date(formData.interviewDate);
  const daysUntilInterview = differenceInDays(interviewDate, currentDate);
  
  // Format the interview date
  let interviewDateFormatted = "";
  try {
    interviewDateFormatted = format(interviewDate, 'PPP');
  } catch (error) {
    interviewDateFormatted = formData.interviewDate;
  }
  
  let preparationScheduleTitle = "";
  let scheduleText = "";
  
  if (outputLanguage === 'en') {
    preparationScheduleTitle = "Preparation Schedule";
    scheduleText = `Your interview is on ${interviewDateFormatted}. Here's a recommended preparation schedule:\n\n`;
    
    if (daysUntilInterview <= 1) {
      scheduleText += `**Last Day Before Interview:**\n
- Review your notes and research about ${formData.companyName}
- Practice answering your prepared questions out loud
- Prepare your outfit and any materials you'll bring
- Get a good night's sleep (8+ hours)
- Plan your route or setup your virtual environment
- Avoid learning new content that could confuse you`;
    } else if (daysUntilInterview <= 3) {
      scheduleText += `**${daysUntilInterview} Days Until Interview:**\n
- **Days ${daysUntilInterview}-2:** Focus on company research and practice answers to common questions
- **Day Before:** Review your notes, prepare your outfit, and test your technology if it's a virtual interview
- **Interview Day:** Wake up early, review your key talking points, and arrive 15 minutes early`;
    } else if (daysUntilInterview <= 7) {
      scheduleText += `**${daysUntilInterview} Days Until Interview:**\n
- **Days ${daysUntilInterview}-5:** Research company thoroughly and prepare specific examples from your experience
- **Days 4-2:** Practice mock interviews with a friend or mentor, focusing on difficult questions
- **Day Before:** Light review, prepare your outfit, and get a good night's sleep
- **Interview Day:** Wake up early, stay calm, and be confident in your preparation`;
    } else {
      scheduleText += `**${daysUntilInterview} Days Until Interview:**\n
- **Weeks 1-2:** Research the company's culture, products, and recent news
- **Week 3:** Prepare specific examples from your experience that match the job requirements
- **Final Week:** Conduct mock interviews and refine your answers
- **Day Before:** Light review, prepare your outfit, and get a good night's sleep
- **Interview Day:** Wake up early, review key talking points, and arrive with time to spare`;
    }
  } else if (outputLanguage === 'es') {
    preparationScheduleTitle = "Calendario de Preparación";
    scheduleText = `Tu entrevista es el ${interviewDateFormatted}. Aquí tienes un calendario de preparación recomendado:\n\n`;
    
    if (daysUntilInterview <= 1) {
      scheduleText += `**Último Día Antes de la Entrevista:**\n
- Revisa tus notas e investigación sobre ${formData.companyName}
- Practica responder tus preguntas preparadas en voz alta
- Prepara tu vestimenta y cualquier material que llevarás
- Duerme bien (8+ horas)
- Planifica tu ruta o configura tu entorno virtual
- Evita aprender contenido nuevo que pueda confundirte`;
    } else if (daysUntilInterview <= 3) {
      scheduleText += `**${daysUntilInterview} Días Hasta la Entrevista:**\n
- **Días ${daysUntilInterview}-2:** Concéntrate en la investigación de la empresa y practica respuestas a preguntas comunes
- **Día Anterior:** Revisa tus notas, prepara tu vestimenta y prueba tu tecnología si es una entrevista virtual
- **Día de la Entrevista:** Despierta temprano, repasa tus puntos clave y llega 15 minutos antes`;
    } else if (daysUntilInterview <= 7) {
      scheduleText += `**${daysUntilInterview} Días Hasta la Entrevista:**\n
- **Días ${daysUntilInterview}-5:** Investiga la empresa a fondo y prepara ejemplos específicos de tu experiencia
- **Días 4-2:** Practica entrevistas simuladas con un amigo o mentor, centrándote en preguntas difíciles
- **Día Anterior:** Revisión ligera, prepara tu vestimenta y duerme bien
- **Día de la Entrevista:** Despierta temprano, mantén la calma y confía en tu preparación`;
    } else {
      scheduleText += `**${daysUntilInterview} Días Hasta la Entrevista:**\n
- **Semanas 1-2:** Investiga la cultura, productos y noticias recientes de la empresa
- **Semana 3:** Prepara ejemplos específicos de tu experiencia que coincidan con los requisitos del trabajo
- **Última Semana:** Realiza entrevistas simuladas y refina tus respuestas
- **Día Anterior:** Revisión ligera, prepara tu vestimenta y duerme bien
- **Día de la Entrevista:** Despierta temprano, repasa puntos clave y llega con tiempo de sobra`;
    }
  } else {
    preparationScheduleTitle = "Cronograma de Preparação";
    scheduleText = `Sua entrevista é em ${interviewDateFormatted}. Aqui está um cronograma de preparação recomendado:\n\n`;
    
    if (daysUntilInterview <= 1) {
      scheduleText += `**Último Dia Antes da Entrevista:**\n
- Revise suas anotações e pesquisas sobre a ${formData.companyName}
- Pratique suas respostas preparadas em voz alta
- Prepare sua roupa e qualquer material que você levará
- Durma bem (8+ horas)
- Planeje sua rota ou configure seu ambiente virtual
- Evite aprender conteúdo novo que possa confundi-lo`;
    } else if (daysUntilInterview <= 3) {
      scheduleText += `**${daysUntilInterview} Dias Até a Entrevista:**\n
- **Dias ${daysUntilInterview}-2:** Concentre-se na pesquisa da empresa e pratique respostas para perguntas comuns
- **Dia Anterior:** Revise suas anotações, prepare sua roupa e teste sua tecnologia se for uma entrevista virtual
- **Dia da Entrevista:** Acorde cedo, revise seus pontos-chave e chegue 15 minutos antes`;
    } else if (daysUntilInterview <= 7) {
      scheduleText += `**${daysUntilInterview} Dias Até a Entrevista:**\n
- **Dias ${daysUntilInterview}-5:** Pesquise a empresa detalhadamente e prepare exemplos específicos da sua experiência
- **Dias 4-2:** Pratique entrevistas simuladas com um amigo ou mentor, focando em perguntas difíceis
- **Dia Anterior:** Revisão leve, prepare sua roupa e durma bem
- **Dia da Entrevista:** Acorde cedo, mantenha a calma e confie na sua preparação`;
    } else {
      scheduleText += `**${daysUntilInterview} Dias Até a Entrevista:**\n
- **Semanas 1-2:** Pesquise a cultura, produtos e notícias recentes da empresa
- **Semana 3:** Prepare exemplos específicos da sua experiência que correspondam aos requisitos da vaga
- **Última Semana:** Realize entrevistas simuladas e refine suas respostas
- **Dia Anterior:** Revisão leve, prepare sua roupa e durma bem
- **Dia da Entrevista:** Acorde cedo, revise pontos-chave e chegue com tempo de sobra`;
    }
  }
  
  return {
    title: preparationScheduleTitle,
    content: scheduleText
  };
};
