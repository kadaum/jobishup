
import { FormData, Section } from "@/types";

/**
 * Generates sections specific to the selected interview type
 */
export const generateInterviewTypeSections = (formData: FormData, outputLanguage: string): Section[] => {
  const interviewType = formData.interviewType;
  const isEnglish = outputLanguage === 'en';
  const isSpanish = outputLanguage === 'es';
  
  if (!interviewType) {
    return [];
  }
  
  const sections: Section[] = [];
  
  // Add interview format section
  if (isEnglish) {
    sections.push({
      title: `${capitalizeFirstLetter(interviewType)} Interview Format`,
      emoji: "🎯",
      content: generateInterviewFormatContent(interviewType, outputLanguage)
    });
  } else if (isSpanish) {
    sections.push({
      title: `Formato de Entrevista ${capitalizeFirstLetter(interviewType)}`,
      emoji: "🎯",
      content: generateInterviewFormatContent(interviewType, outputLanguage)
    });
  } else {
    sections.push({
      title: `Formato de Entrevista ${capitalizeFirstLetter(interviewType)}`,
      emoji: "🎯",
      content: generateInterviewFormatContent(interviewType, outputLanguage)
    });
  }
  
  return sections;
};

/**
 * Generates content for the interview format section
 */
const generateInterviewFormatContent = (interviewType: string, outputLanguage: string): string => {
  const isEnglish = outputLanguage === 'en';
  const isSpanish = outputLanguage === 'es';
  
  switch (interviewType) {
    case 'technical':
      if (isEnglish) {
        return `What to expect in a technical interview:

- **Format**: Usually includes coding challenges, system design questions, and technical discussions
- **Duration**: Typically 45-60 minutes per round, with potentially multiple rounds
- **Assessment Focus**: Problem-solving skills, coding ability, technical knowledge depth
- **Common Elements**:
  • Whiteboarding or online coding exercises
  • Questions about data structures and algorithms
  • Discussion of previous projects and technical decisions
  • System design problems for more senior roles

**Preparation Tips**:
- Practice coding problems on platforms like LeetCode or HackerRank
- Be prepared to explain your thought process clearly while solving problems
- Review fundamentals of computer science and relevant technologies
- Prepare questions about the tech stack and engineering culture`;
      } else if (isSpanish) {
        return `Qué esperar en una entrevista técnica:

- **Formato**: Generalmente incluye desafíos de codificación, preguntas de diseño de sistemas y discusiones técnicas
- **Duración**: Típicamente 45-60 minutos por ronda, con potencialmente múltiples rondas
- **Enfoque de Evaluación**: Habilidades de resolución de problemas, capacidad de codificación, profundidad de conocimiento técnico
- **Elementos Comunes**:
  • Ejercicios de pizarra o codificación en línea
  • Preguntas sobre estructuras de datos y algoritmos
  • Discusión de proyectos anteriores y decisiones técnicas
  • Problemas de diseño de sistemas para roles más senior

**Consejos de Preparación**:
- Practica problemas de codificación en plataformas como LeetCode o HackerRank
- Prepárate para explicar tu proceso de pensamiento claramente mientras resuelves problemas
- Revisa fundamentos de ciencias de la computación y tecnologías relevantes
- Prepara preguntas sobre el stack tecnológico y la cultura de ingeniería`;
      } else {
        return `O que esperar em uma entrevista técnica:

- **Formato**: Geralmente inclui desafios de codificação, questões de design de sistemas e discussões técnicas
- **Duração**: Tipicamente 45-60 minutos por rodada, com potencialmente múltiplas rodadas
- **Foco da Avaliação**: Habilidades de resolução de problemas, capacidade de codificação, profundidade de conhecimento técnico
- **Elementos Comuns**:
  • Exercícios em quadro branco ou codificação online
  • Perguntas sobre estruturas de dados e algoritmos
  • Discussão de projetos anteriores e decisões técnicas
  • Problemas de design de sistemas para funções mais seniores

**Dicas de Preparação**:
- Pratique problemas de codificação em plataformas como LeetCode ou HackerRank
- Esteja preparado para explicar seu processo de pensamento claramente enquanto resolve problemas
- Revise fundamentos de ciência da computação e tecnologias relevantes
- Prepare perguntas sobre a stack tecnológica e cultura de engenharia`;
      }
      
    case 'behavioral':
      if (isEnglish) {
        return `What to expect in a behavioral interview:

- **Format**: Questions about past experiences and how you handled specific situations
- **Duration**: Usually 30-45 minutes per interviewer
- **Assessment Focus**: Soft skills, cultural fit, work style, and interpersonal abilities
- **Common Elements**:
  • "Tell me about a time when..." questions
  • Scenarios that test your conflict resolution skills
  • Questions about teamwork and collaboration
  • Discussions about your career goals and motivations

**Preparation Tips**:
- Use the STAR method (Situation, Task, Action, Result) to structure your answers
- Prepare 5-7 stories from your experience that demonstrate different skills
- Research the company's values and culture to align your responses
- Be ready with specific, measurable results from your examples`;
      } else if (isSpanish) {
        return `Qué esperar en una entrevista conductual:

- **Formato**: Preguntas sobre experiencias pasadas y cómo manejaste situaciones específicas
- **Duración**: Usualmente 30-45 minutos por entrevistador
- **Enfoque de Evaluación**: Habilidades blandas, ajuste cultural, estilo de trabajo y habilidades interpersonales
- **Elementos Comunes**:
  • Preguntas del tipo "Cuéntame sobre una vez que..." 
  • Escenarios que prueban tus habilidades de resolución de conflictos
  • Preguntas sobre trabajo en equipo y colaboración
  • Discusiones sobre tus objetivos profesionales y motivaciones

**Consejos de Preparación**:
- Usa el método STAR (Situación, Tarea, Acción, Resultado) para estructurar tus respuestas
- Prepara 5-7 historias de tu experiencia que demuestren diferentes habilidades
- Investiga los valores y cultura de la empresa para alinear tus respuestas
- Ten listos resultados específicos y medibles de tus ejemplos`;
      } else {
        return `O que esperar em uma entrevista comportamental:

- **Formato**: Perguntas sobre experiências passadas e como você lidou com situações específicas
- **Duração**: Geralmente 30-45 minutos por entrevistador
- **Foco da Avaliação**: Habilidades interpessoais, adequação cultural, estilo de trabalho e habilidades interpessoais
- **Elementos Comuns**:
  • Perguntas do tipo "Me conte sobre uma vez em que..." 
  • Cenários que testam suas habilidades de resolução de conflitos
  • Perguntas sobre trabalho em equipe e colaboração
  • Discussões sobre seus objetivos de carreira e motivações

**Dicas de Preparação**:
- Use o método STAR (Situação, Tarefa, Ação, Resultado) para estruturar suas respostas
- Prepare 5-7 histórias de sua experiência que demonstrem diferentes habilidades
- Pesquise os valores e cultura da empresa para alinhar suas respostas
- Esteja pronto com resultados específicos e mensuráveis de seus exemplos`;
      }
      
    case 'strategic':
      if (isEnglish) {
        return `What to expect in a strategic interview:

- **Format**: Case studies, scenario-based questions, and discussions about business strategy
- **Duration**: Often 45-60 minutes, sometimes with multiple interviewers
- **Assessment Focus**: Strategic thinking, business acumen, decision-making process
- **Common Elements**:
  • Market sizing questions
  • Business case analyses
  • Hypothetical strategic challenges
  • Questions about industry trends and competitive landscape

**Preparation Tips**:
- Practice case interviews and framework-based problem solving
- Research the company's business model, competitors, and industry challenges
- Develop a structured approach to breaking down complex problems
- Prepare thoughtful questions about the company's strategic direction`;
      } else if (isSpanish) {
        return `Qué esperar en una entrevista estratégica:

- **Formato**: Estudios de caso, preguntas basadas en escenarios y discusiones sobre estrategia empresarial
- **Duración**: A menudo 45-60 minutos, a veces con múltiples entrevistadores
- **Enfoque de Evaluación**: Pensamiento estratégico, astucia empresarial, proceso de toma de decisiones
- **Elementos Comunes**:
  • Preguntas de dimensionamiento de mercado
  • Análisis de casos de negocio
  • Desafíos estratégicos hipotéticos
  • Preguntas sobre tendencias de la industria y panorama competitivo

**Consejos de Preparación**:
- Practica entrevistas de casos y resolución de problemas basada en marcos
- Investiga el modelo de negocio de la empresa, competidores y desafíos de la industria
- Desarrolla un enfoque estructurado para desglosar problemas complejos
- Prepara preguntas reflexivas sobre la dirección estratégica de la empresa`;
      } else {
        return `O que esperar em uma entrevista estratégica:

- **Formato**: Estudos de caso, perguntas baseadas em cenários e discussões sobre estratégia de negócios
- **Duração**: Frequentemente 45-60 minutos, às vezes com múltiplos entrevistadores
- **Foco da Avaliação**: Pensamento estratégico, perspicácia empresarial, processo de tomada de decisão
- **Elementos Comuns**:
  • Perguntas de dimensionamento de mercado
  • Análises de casos de negócios
  • Desafios estratégicos hipotéticos
  • Perguntas sobre tendências da indústria e panorama competitivo

**Dicas de Preparação**:
- Pratique entrevistas de caso e resolução de problemas baseada em frameworks
- Pesquise o modelo de negócios da empresa, concorrentes e desafios do setor
- Desenvolva uma abordagem estruturada para decompor problemas complexos
- Prepare perguntas perspicazes sobre a direção estratégica da empresa`;
      }
      
    case 'cultural':
      if (isEnglish) {
        return `What to expect in a cultural fit interview:

- **Format**: Conversations about values, work preferences, and team dynamics
- **Duration**: Typically 30-45 minutes, often with potential teammates
- **Assessment Focus**: Alignment with company values, team integration, work style
- **Common Elements**:
  • Questions about your ideal work environment
  • Discussions about how you handle workplace challenges
  • Scenarios related to company values
  • Team lunch or informal settings to assess interpersonal dynamics

**Preparation Tips**:
- Research the company's mission statement, values, and culture
- Prepare examples that show alignment with their values
- Consider what makes you thrive in a workplace
- Be authentic—cultural fit works both ways`;
      } else if (isSpanish) {
        return `Qué esperar en una entrevista de ajuste cultural:

- **Formato**: Conversaciones sobre valores, preferencias de trabajo y dinámica de equipo
- **Duración**: Típicamente 30-45 minutos, a menudo con compañeros de equipo potenciales
- **Enfoque de Evaluación**: Alineación con los valores de la empresa, integración en el equipo, estilo de trabajo
- **Elementos Comunes**:
  • Preguntas sobre tu entorno de trabajo ideal
  • Discusiones sobre cómo manejas desafíos en el lugar de trabajo
  • Escenarios relacionados con los valores de la empresa
  • Almuerzo con el equipo o entornos informales para evaluar dinámicas interpersonales

**Consejos de Preparación**:
- Investiga la declaración de misión, valores y cultura de la empresa
- Prepara ejemplos que muestren alineación con sus valores
- Considera qué te hace prosperar en un lugar de trabajo
- Sé auténtico—el ajuste cultural funciona en ambos sentidos`;
      } else {
        return `O que esperar em uma entrevista de adequação cultural:

- **Formato**: Conversas sobre valores, preferências de trabalho e dinâmica de equipe
- **Duração**: Normalmente 30-45 minutos, frequentemente com potenciais colegas de equipe
- **Foco da Avaliação**: Alinhamento com os valores da empresa, integração à equipe, estilo de trabalho
- **Elementos Comuns**:
  • Perguntas sobre seu ambiente de trabalho ideal
  • Discussões sobre como você lida com desafios no local de trabalho
  • Cenários relacionados aos valores da empresa
  • Almoço com a equipe ou ambientes informais para avaliar dinâmicas interpessoais

**Dicas de Preparação**:
- Pesquise a declaração de missão, valores e cultura da empresa
- Prepare exemplos que mostrem alinhamento com os valores deles
- Considere o que faz você prosperar em um local de trabalho
- Seja autêntico—a adequação cultural funciona nos dois sentidos`;
      }
      
    default:
      if (isEnglish) {
        return `General interview preparation tips:

- **Research**: Learn about the company, role, and interviewer beforehand
- **Practice**: Rehearse answers to common questions out loud
- **Prepare Examples**: Have specific stories ready to demonstrate your skills
- **Questions**: Prepare thoughtful questions to ask the interviewer
- **Follow-up**: Send a thank-you note after the interview

The more prepared you are, the more confident you'll feel during the interview.`;
      } else if (isSpanish) {
        return `Consejos generales de preparación para entrevistas:

- **Investigación**: Aprende sobre la empresa, el rol y el entrevistador de antemano
- **Práctica**: Ensaya respuestas a preguntas comunes en voz alta
- **Prepara Ejemplos**: Ten historias específicas listas para demostrar tus habilidades
- **Preguntas**: Prepara preguntas reflexivas para hacerle al entrevistador
- **Seguimiento**: Envía una nota de agradecimiento después de la entrevista

Cuanto más preparado estés, más seguro te sentirás durante la entrevista.`;
      } else {
        return `Dicas gerais de preparação para entrevistas:

- **Pesquisa**: Aprenda sobre a empresa, o cargo e o entrevistador antecipadamente
- **Prática**: Ensaie respostas para perguntas comuns em voz alta
- **Prepare Exemplos**: Tenha histórias específicas prontas para demonstrar suas habilidades
- **Perguntas**: Prepare perguntas perspicazes para fazer ao entrevistador
- **Acompanhamento**: Envie uma nota de agradecimento após a entrevista

Quanto mais preparado você estiver, mais confiante se sentirá durante a entrevista.`;
      }
  }
};

/**
 * Helper function to capitalize the first letter of a string
 */
const capitalizeFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
