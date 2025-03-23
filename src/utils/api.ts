import { FormData, InterviewPlan } from "@/types";

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

const createPrompt = (formData: FormData): string => {
  // Determine the language for the prompt
  const outputLanguage = formData.selectedLanguage || formData.interviewLanguage || 'pt';
  let promptLanguage;
  
  switch(outputLanguage) {
    case 'en':
      promptLanguage = 'English';
      break;
    case 'es':
      promptLanguage = 'Spanish';
      break;
    default:
      promptLanguage = 'Portuguese';
  }
  
  // Create base prompt in the selected language
  let prompt = '';
  
  if (outputLanguage === 'en') {
    prompt = `Generate an interview preparation plan for a ${formData.jobTitle} position at ${formData.companyName}. Answer in English.`;
  } else if (outputLanguage === 'es') {
    prompt = `Genera un plan de preparación para una entrevista para el puesto de ${formData.jobTitle} en la empresa ${formData.companyName}. Responde en español.`;
  } else {
    prompt = `Gere um plano de preparação para uma entrevista para a vaga de ${formData.jobTitle} na empresa ${formData.companyName}. Responda em português.`;
  }
  
  // Add additional information to the prompt based on form data
  if (formData.jobUrl) {
    if (outputLanguage === 'en') {
      prompt += ` The job is available at this URL: ${formData.jobUrl}.`;
    } else if (outputLanguage === 'es') {
      prompt += ` El puesto está disponible en esta URL: ${formData.jobUrl}.`;
    } else {
      prompt += ` A vaga está disponível nesta URL: ${formData.jobUrl}.`;
    }
  }
  
  if (formData.candidateLinkedIn) {
    if (outputLanguage === 'en') {
      prompt += ` Candidate's LinkedIn: ${formData.candidateLinkedIn}.`;
    } else if (outputLanguage === 'es') {
      prompt += ` LinkedIn del candidato: ${formData.candidateLinkedIn}.`;
    } else {
      prompt += ` LinkedIn do candidato: ${formData.candidateLinkedIn}.`;
    }
  }
  
  if (formData.interviewerLinkedIn) {
    if (outputLanguage === 'en') {
      prompt += ` Interviewer's LinkedIn: ${formData.interviewerLinkedIn}.`;
    } else if (outputLanguage === 'es') {
      prompt += ` LinkedIn del entrevistador: ${formData.interviewerLinkedIn}.`;
    } else {
      prompt += ` LinkedIn do(s) entrevistador(es): ${formData.interviewerLinkedIn}.`;
    }
  }
  
  if (formData.interviewDate) {
    if (outputLanguage === 'en') {
      prompt += ` The interview is scheduled for: ${formData.interviewDate}.`;
    } else if (outputLanguage === 'es') {
      prompt += ` La entrevista está programada para: ${formData.interviewDate}.`;
    } else {
      prompt += ` A entrevista está agendada para: ${formData.interviewDate}.`;
    }
  }
  
  if (formData.interviewType) {
    const typeMap: Record<string, Record<string, string>> = {
      en: {
        technical: "technical",
        behavioral: "behavioral",
        strategic: "strategic",
        cultural: "cultural"
      },
      es: {
        technical: "técnica",
        behavioral: "comportamental",
        strategic: "estratégica",
        cultural: "cultural"
      },
      pt: {
        technical: "técnica",
        behavioral: "comportamental",
        strategic: "estratégica",
        cultural: "cultural"
      }
    };
    
    const languageKey = outputLanguage === 'en' ? 'en' : outputLanguage === 'es' ? 'es' : 'pt';
    const interviewTypeTranslated = typeMap[languageKey][formData.interviewType] || formData.interviewType;
    
    if (outputLanguage === 'en') {
      prompt += ` The interview type is: ${interviewTypeTranslated}.`;
    } else if (outputLanguage === 'es') {
      prompt += ` El tipo de entrevista es: ${interviewTypeTranslated}.`;
    } else {
      prompt += ` O tipo de entrevista é: ${interviewTypeTranslated}.`;
    }
  }
  
  if (formData.jobLevel) {
    const levelMap: Record<string, Record<string, string>> = {
      en: {
        junior: "junior",
        mid: "mid-level",
        senior: "senior",
        leadership: "leadership"
      },
      es: {
        junior: "junior",
        mid: "nivel medio",
        senior: "senior",
        leadership: "dirección"
      },
      pt: {
        junior: "júnior",
        mid: "pleno",
        senior: "sênior",
        leadership: "direção"
      }
    };
    
    const languageKey = outputLanguage === 'en' ? 'en' : outputLanguage === 'es' ? 'es' : 'pt';
    const jobLevelTranslated = levelMap[languageKey][formData.jobLevel] || formData.jobLevel;
    
    if (outputLanguage === 'en') {
      prompt += ` The job level is: ${jobLevelTranslated}.`;
    } else if (outputLanguage === 'es') {
      prompt += ` El nivel del puesto es: ${jobLevelTranslated}.`;
    } else {
      prompt += ` O nível da vaga é: ${jobLevelTranslated}.`;
    }
  }
  
  if (formData.interviewLanguage) {
    const languageMap: Record<string, Record<string, string>> = {
      en: {
        portuguese: "Portuguese",
        english: "English",
        spanish: "Spanish"
      },
      es: {
        portuguese: "portugués",
        english: "inglés",
        spanish: "español"
      },
      pt: {
        portuguese: "português",
        english: "inglês",
        spanish: "espanhol"
      }
    };
    
    const languageKey = outputLanguage === 'en' ? 'en' : outputLanguage === 'es' ? 'es' : 'pt';
    const interviewLanguageTranslated = languageMap[languageKey][formData.interviewLanguage] || formData.interviewLanguage;
    
    if (outputLanguage === 'en') {
      prompt += ` The interview will be in: ${interviewLanguageTranslated}.`;
    } else if (outputLanguage === 'es') {
      prompt += ` La entrevista será en: ${interviewLanguageTranslated}.`;
    } else {
      prompt += ` A entrevista será em: ${interviewLanguageTranslated}.`;
    }
  }
  
  if (formData.practicePoints) {
    if (outputLanguage === 'en') {
      prompt += ` The candidate wants to practice these points: ${formData.practicePoints}.`;
    } else if (outputLanguage === 'es') {
      prompt += ` El candidato quiere practicar estos puntos: ${formData.practicePoints}.`;
    } else {
      prompt += ` O candidato quer treinar estes pontos: ${formData.practicePoints}.`;
    }
  }
  
  if (formData.personalContext) {
    if (outputLanguage === 'en') {
      prompt += ` Candidate's personal context: ${formData.personalContext}.`;
    } else if (outputLanguage === 'es') {
      prompt += ` Contexto personal del candidato: ${formData.personalContext}.`;
    } else {
      prompt += ` Contexto pessoal do candidato: ${formData.personalContext}.`;
    }
  }
  
  return prompt;
};

const generateMockResponse = (formData: FormData): InterviewPlan => {
  // Determine the output language
  const outputLanguage = formData.selectedLanguage || 'pt';
  const isEnglish = outputLanguage === 'en';
  const isSpanish = outputLanguage === 'es';
  
  // Generate different content based on job title and company
  const position = formData.jobTitle.toLowerCase();
  const level = formData.jobLevel || 'mid';
  
  // Determine if this is a tech position
  const isTech = 
    position.includes('desenvolv') || 
    position.includes('program') || 
    position.includes('soft') || 
    position.includes('front') || 
    position.includes('back') || 
    position.includes('full') || 
    position.includes('engineer') || 
    position.includes('dev') ||
    position.includes('tech');
  
  // Determine if this is a management position
  const isManagement = 
    position.includes('gerente') || 
    position.includes('gestor') || 
    position.includes('coordenador') || 
    position.includes('manager') || 
    position.includes('diretor') || 
    level === 'leadership';
  
  // Format raw text with all content
  let processContent = "";
  
  if (isEnglish) {
    processContent = `The selection process at ${formData.companyName} typically includes several stages:

- Initial screening call with HR
- Technical assessment or case study
- 1-2 rounds of interviews with the team
- Final interview with the hiring manager
- Potential reference checks

Prepare for a mix of technical and behavioral questions throughout the process. The company values thoroughness and attention to detail in their hiring.`;
  } else if (isSpanish) {
    processContent = `El proceso de selección en ${formData.companyName} normalmente incluye varias etapas:

- Llamada inicial de selección con RRHH
- Evaluación técnica o estudio de caso
- 1-2 rondas de entrevistas con el equipo
- Entrevista final con el gerente de contratación
- Posibles verificaciones de referencias

Prepárate para una mezcla de preguntas técnicas y de comportamiento a lo largo del proceso. La empresa valora la minuciosidad y la atención al detalle en sus contrataciones.`;
  } else {
    processContent = `O processo seletivo na ${formData.companyName} normalmente inclui várias etapas:

- Chamada inicial de triagem com RH
- Avaliação técnica ou estudo de caso
- 1-2 rodadas de entrevistas com a equipe
- Entrevista final com o gerente de contratação
- Possíveis verificações de referências

Prepare-se para uma mistura de perguntas técnicas e comportamentais ao longo do processo. A empresa valoriza minuciosidade e atenção aos detalhes em suas contratações.`;
  }

  let techQuestionsContent = "";
  
  if (isEnglish) {
    techQuestionsContent = `Here are some common questions you might face and how to approach them:

Technical Questions:
- Explain your experience with the technologies listed in the job description.
- How would you solve [specific technical problem]?
- Can you discuss a challenging project you've worked on?

Approach: Provide concrete examples and use the STAR method (Situation, Task, Action, Result). Be ready to whiteboard or code if asked.

Behavioral Questions:
- Tell me about a time you faced a difficult technical challenge.
- How do you prioritize tasks when dealing with multiple deadlines?
- Describe a situation where you had to learn a new technology quickly.

Approach: Prepare 5-7 stories that highlight your skills and adaptability. Focus on measurable outcomes and lessons learned.`;
  } else if (isSpanish) {
    techQuestionsContent = `Aquí hay algunas preguntas comunes que podrías enfrentar y cómo abordarlas:

Preguntas Técnicas:
- Explica tu experiencia con las tecnologías enumeradas en la descripción del puesto.
- ¿Cómo resolverías [problema técnico específico]?
- ¿Puedes hablar sobre un proyecto desafiante en el que hayas trabajado?

Enfoque: Proporciona ejemplos concretos y utiliza el método STAR (Situación, Tarea, Acción, Resultado). Prepárate para explicar o codificar si te lo piden.

Preguntas de Comportamiento:
- Cuéntame sobre un momento en que enfrentaste un desafío técnico difícil.
- ¿Cómo priorizas tareas cuando tienes múltiples plazos?
- Describe una situación en la que tuviste que aprender una nueva tecnología rápidamente.

Enfoque: Prepara 5-7 historias que destaquen tus habilidades y adaptabilidad. Concéntrate en resultados medibles y lecciones aprendidas.`;
  } else {
    techQuestionsContent = `Aqui estão algumas perguntas comuns que você pode enfrentar e como abordá-las:

Perguntas Técnicas:
- Explique sua experiência com as tecnologias listadas na descrição da vaga.
- Como você resolveria [problema técnico específico]?
- Você pode discutir um projeto desafiador em que trabalhou?

Abordagem: Forneça exemplos concretos e use o método STAR (Situação, Tarefa, Ação, Resultado). Esteja pronto para explicar ou codificar se solicitado.

Perguntas Comportamentais:
- Conte-me sobre um momento em que você enfrentou um desafio técnico difícil.
- Como você prioriza tarefas ao lidar com vários prazos?
- Descreva uma situação em que você teve que aprender uma nova tecnologia rapidamente.

Abordagem: Prepare 5-7 histórias que destacam suas habilidades e adaptabilidade. Concentre-se em resultados mensuráveis e lições aprendidas.`;
  }

  let managementQuestionsContent = "";
  
  if (isEnglish) {
    managementQuestionsContent = `Here are some common questions you might face and how to approach them:

Leadership Questions:
- How do you motivate your team during challenging projects?
- Describe your leadership style and how it adapts to different situations.
- Tell me about a time you had to make a difficult decision for your team.

Approach: Focus on your philosophy of leadership, with examples of how you've grown teams and navigated challenges.

Strategic Questions:
- How would you improve our product/service based on what you know?
- How do you balance short-term results with long-term strategy?
- How do you stay informed about industry trends?

Approach: Research the company thoroughly and be ready to show your strategic thinking and vision.`;
  } else if (isSpanish) {
    managementQuestionsContent = `Aquí hay algunas preguntas comunes que podrías enfrentar y cómo abordarlas:

Preguntas de Liderazgo:
- ¿Cómo motivas a tu equipo durante proyectos desafiantes?
- Describe tu estilo de liderazgo y cómo se adapta a diferentes situaciones.
- Cuéntame sobre un momento en que tuviste que tomar una decisión difícil para tu equipo.

Enfoque: Concéntrate en tu filosofía de liderazgo, con ejemplos de cómo has desarrollado equipos y navegado desafíos.

Preguntas Estratégicas:
- ¿Cómo mejorarías nuestro producto/servicio basándote en lo que sabes?
- ¿Cómo equilibras los resultados a corto plazo con la estrategia a largo plazo?
- ¿Cómo te mantienes informado sobre las tendencias de la industria?

Enfoque: Investiga la empresa a fondo y prepárate para mostrar tu pensamiento estratégico y visión.`;
  } else {
    managementQuestionsContent = `Aqui estão algumas perguntas comuns que você pode enfrentar e como abordá-las:

Perguntas de Liderança:
- Como você motiva sua equipe durante projetos desafiadores?
- Descreva seu estilo de liderança e como ele se adapta a diferentes situações.
- Conte-me sobre uma vez em que você teve que tomar uma decisão difícil para sua equipe.

Abordagem: Concentre-se em sua filosofia de liderança, com exemplos de como você desenvolveu equipes e navegou por desafios.

Perguntas Estratégicas:
- Como você melhoraria nosso produto/serviço com base no que sabe?
- Como você equilibra resultados de curto prazo com estratégia de longo prazo?
- Como você se mantém informado sobre tendências do setor?

Abordagem: Pesquise a empresa detalhadamente e esteja pronto para mostrar seu pensamento estratégico e visão.`;
  }

  let questionsToAskContent = "";
  
  if (isEnglish) {
    questionsToAskContent = `Asking thoughtful questions shows your interest and engagement. Consider asking:

- What does success look like in this role after 3, 6, and 12 months?
- What are the biggest challenges the team is currently facing?
- How would you describe the team culture and working style?
- What opportunities exist for professional development?
- How is performance evaluated?
- What's the most exciting project the team has worked on recently?

Pro tip: Take notes during the interview to ask specific follow-up questions based on what was discussed.`;
  } else if (isSpanish) {
    questionsToAskContent = `Hacer preguntas bien pensadas muestra tu interés y compromiso. Considera preguntar:

- ¿Cómo se ve el éxito en este rol después de 3, 6 y 12 meses?
- ¿Cuáles son los mayores desafíos que enfrenta el equipo actualmente?
- ¿Cómo describirías la cultura del equipo y el estilo de trabajo?
- ¿Qué oportunidades existen para el desarrollo profesional?
- ¿Cómo se evalúa el desempeño?
- ¿Cuál es el proyecto más emocionante en el que ha trabajado el equipo recientemente?

Consejo profesional: Toma notas durante la entrevista para hacer preguntas específicas de seguimiento basadas en lo que se discutió.`;
  } else {
    questionsToAskContent = `Fazer perguntas bem pensadas mostra seu interesse e engajamento. Considere perguntar:

- Como é o sucesso nesta função após 3, 6 e 12 meses?
- Quais são os maiores desafios que a equipe está enfrentando atualmente?
- Como você descreveria a cultura da equipe e o estilo de trabalho?
- Que oportunidades existem para desenvolvimento profissional?
- Como o desempenho é avaliado?
- Qual foi o projeto mais empolgante em que a equipe trabalhou recentemente?

Dica profissional: Faça anotações durante a entrevista para fazer perguntas específicas de acompanhamento com base no que foi discutido.`;
  }

  // Study materials section - customize based on whether it's a tech role or not
  let studyMaterialsContent = "";
  
  if (isTech) {
    if (isEnglish) {
      studyMaterialsContent = `Before your interview, review these key areas:

Technical Preparation:
- Review fundamentals of the key technologies mentioned in the job description
- Practice coding challenges on platforms like LeetCode or HackerRank
- Review system design concepts if applying for a senior role
- Refresh your knowledge of relevant frameworks and tools

Company Research:
- Study ${formData.companyName}'s products/services and recent developments
- Research their technology stack and engineering culture
- Read their engineering blog or technical case studies if available

Recommended Resources:
- Recent industry articles related to the company's technology domain
- Documentation for technologies listed in the job description
- Company reviews on Glassdoor for interview insights`;
    } else if (isSpanish) {
      studyMaterialsContent = `Antes de tu entrevista, revisa estas áreas clave:

Preparación Técnica:
- Revisa los fundamentos de las tecnologías clave mencionadas en la descripción del puesto
- Practica desafíos de programación en plataformas como LeetCode o HackerRank
- Revisa conceptos de diseño de sistemas si estás aplicando para un rol senior
- Actualiza tu conocimiento sobre frameworks y herramientas relevantes

Investigación de la Empresa:
- Estudia los productos/servicios de ${formData.companyName} y desarrollos recientes
- Investiga su stack tecnológico y cultura de ingeniería
- Lee su blog de ingeniería o casos de estudio técnicos si están disponibles

Recursos Recomendados:
- Artículos recientes de la industria relacionados con el dominio tecnológico de la empresa
- Documentación de las tecnologías enumeradas en la descripción del puesto
- Reseñas de la empresa en Glassdoor para conocer detalles sobre las entrevistas`;
    } else {
      studyMaterialsContent = `Antes da sua entrevista, revise estas áreas-chave:

Preparação Técnica:
- Revise os fundamentos das principais tecnologias mencionadas na descrição da vaga
- Pratique desafios de codificação em plataformas como LeetCode ou HackerRank
- Revise conceitos de design de sistemas se estiver se candidatando a uma função sênior
- Atualize seu conhecimento sobre frameworks e ferramentas relevantes

Pesquisa da Empresa:
- Estude os produtos/serviços da ${formData.companyName} e desenvolvimentos recentes
- Pesquise sua stack de tecnologia e cultura de engenharia
- Leia o blog de engenharia ou estudos de caso técnicos, se disponíveis

Recursos Recomendados:
- Artigos recentes do setor relacionados ao domínio de tecnologia da empresa
- Documentação para tecnologias listadas na descrição da vaga
- Avaliações da empresa no Glassdoor para insights sobre entrevistas`;
    }
  } else if (isManagement) {
    if (isEnglish) {
      studyMaterialsContent = `Before your interview, focus on these key areas:

Leadership Preparation:
- Review your leadership accomplishments and be ready to quantify results
- Prepare examples of how you've developed teams and managed challenges
- Consider how your leadership style aligns with ${formData.companyName}'s culture

Business Research:
- Study ${formData.companyName}'s business model, market position, and competitors
- Analyze recent company news, earnings reports, and strategic initiatives
- Understand the industry landscape and current challenges

Recommended Resources:
- Annual reports and investor presentations
- Industry analysis reports relevant to ${formData.companyName}'s sector
- Recent interviews or talks by company executives
- Books on leadership and management that align with the company's values`;
    } else if (isSpanish) {
      studyMaterialsContent = `Antes de tu entrevista, concéntrate en estas áreas clave:

Preparación de Liderazgo:
- Revisa tus logros de liderazgo y prepárate para cuantificar resultados
- Prepara ejemplos de cómo has desarrollado equipos y gestionado desafíos
- Considera cómo tu estilo de liderazgo se alinea con la cultura de ${formData.companyName}

Investigación de Negocios:
- Estudia el modelo de negocio de ${formData.companyName}, posición en el mercado y competidores
- Analiza noticias recientes de la empresa, informes de ganancias e iniciativas estratégicas
- Comprende el panorama de la industria y los desafíos actuales

Recursos Recomendados:
- Informes anuales y presentaciones para inversores
- Informes de análisis de la industria relevantes para el sector de ${formData.companyName}
- Entrevistas o charlas recientes de ejecutivos de la empresa
- Libros sobre liderazgo y gestión que se alineen con los valores de la empresa`;
    } else {
      studyMaterialsContent = `Antes da sua entrevista, concentre-se nestas áreas-chave:

Preparação de Liderança:
- Revise suas realizações de liderança e esteja pronto para quantificar resultados
- Prepare exemplos de como você desenvolveu equipes e gerenciou desafios
- Considere como seu estilo de liderança se alinha à cultura da ${formData.companyName}

Pesquisa de Negócios:
- Estude o modelo de negócios da ${formData.companyName}, posição de mercado e concorrentes
- Analise notícias recentes da empresa, relatórios de lucros e iniciativas estratégicas
- Entenda o panorama do setor e os desafios atuais

Recursos Recomendados:
- Relatórios anuais e apresentações para investidores
- Relatórios de análise do setor relevantes para o setor da ${formData.companyName}
- Entrevistas ou palestras recentes de executivos da empresa
- Livros sobre liderança e gestão que se alinham aos valores da empresa`;
    }
  } else {
    if (isEnglish) {
      studyMaterialsContent = `Before your interview, review these key areas:

Role-Specific Preparation:
- Review the job description and identify key skills and requirements
- Prepare examples from your experience that demonstrate these skills
- Research industry best practices related to your role

Company Research:
- Study ${formData.companyName}'s products/services, mission, and values
- Research recent company news and developments
- Understand their market position and competitors

Recommended Resources:
- Company website, LinkedIn page, and social media
- Industry publications relevant to your role
- Informational interviews with connections who work in similar roles
- Online courses to refresh skills mentioned in the job description`;
    } else if (isSpanish) {
      studyMaterialsContent = `Antes de tu entrevista, revisa estas áreas clave:

Preparación Específica para el Rol:
- Revisa la descripción del puesto e identifica habilidades y requisitos clave
- Prepara ejemplos de tu experiencia que demuestren estas habilidades
- Investiga las mejores prácticas de la industria relacionadas con tu rol

Investigación de la Empresa:
- Estudia los productos/servicios, misión y valores de ${formData.companyName}
- Investiga noticias y desarrollos recientes de la empresa
- Comprende su posición en el mercado y competidores

Recursos Recomendados:
- Sitio web de la empresa, página de LinkedIn y redes sociales
- Publicaciones de la industria relevantes para tu rol
- Entrevistas informativas con conexiones que trabajan en roles similares
- Cursos en línea para actualizar habilidades mencionadas en la descripción del puesto`;
    } else {
      studyMaterialsContent = `Antes da sua entrevista, revise estas áreas-chave:

Preparação Específica para a Função:
- Revise a descrição do cargo e identifique habilidades e requisitos principais
- Prepare exemplos de sua experiência que demonstrem essas habilidades
- Pesquise as melhores práticas do setor relacionadas à sua função

Pesquisa da Empresa:
- Estude os produtos/serviços, missão e valores da ${formData.companyName}
- Pesquise notícias e desenvolvimentos recentes da empresa
- Entenda sua posição no mercado e concorrentes

Recursos Recomendados:
- Site da empresa, página do LinkedIn e redes sociais
- Publicações do setor relevantes para sua função
- Entrevistas informativas com conexões que trabalham em funções semelhantes
- Cursos online para atualizar habilidades mencionadas na descrição do cargo`;
    }
  }

  let finalTipsContent = "";
  
  if (isEnglish) {
    finalTipsContent = `Final personalized advice for your interview:

- Prepare your interview environment if it's a virtual interview. Test your technology, ensure good lighting and a professional background.

- Dress professionally according to ${formData.companyName}'s culture. When in doubt, slightly overdress.

- Practice your responses out loud, ideally with a friend for feedback. Record yourself to review your delivery.

- Prepare a concise "tell me about yourself" answer that highlights relevant experience.

- Bring copies of your resume and a notepad for in-person interviews.

- Send a thank-you note within 24 hours after the interview.

- Take care of yourself the day before - get enough sleep, eat well, and take time to relax. Your mental state significantly impacts your performance.`;
  } else if (isSpanish) {
    finalTipsContent = `Consejos finales personalizados para tu entrevista:

- Prepara tu entorno de entrevista si es una entrevista virtual. Prueba tu tecnología, asegura buena iluminación y un fondo profesional.

- Vístete profesionalmente de acuerdo con la cultura de ${formData.companyName}. En caso de duda, vístete un poco más formal.

- Practica tus respuestas en voz alta, idealmente con un amigo para recibir comentarios. Grábate para revisar tu presentación.

- Prepara una respuesta concisa para "háblame sobre ti" que destaque experiencia relevante.

- Lleva copias de tu currículum y un bloc de notas para entrevistas presenciales.

- Envía una nota de agradecimiento dentro de las 24 horas posteriores a la entrevista.

- Cuídate el día anterior - duerme lo suficiente, aliméntate bien y tómate tiempo para relajarte. Tu estado mental impacta significativamente en tu desempeño.`;
  } else {
    finalTipsContent = `Conselhos finais personalizados para sua entrevista:

- Prepare seu ambiente de entrevista se for uma entrevista virtual. Teste sua tecnologia, garanta boa iluminação e um fundo profissional.

- Vista-se profissionalmente de acordo com a cultura da ${formData.companyName}. Em caso de dúvida, vista-se um pouco mais formalmente.

- Pratique suas respostas em voz alta, idealmente com um amigo para feedback. Grave-se para revisar sua apresentação.

- Prepare uma resposta concisa para "fale sobre você" que destaque experiência relevante.

- Leve cópias do seu currículo e um bloco de notas para entrevistas presenciais.

- Envie uma nota de agradecimento dentro de 24 horas após a entrevista.

- Cuide de si mesmo no dia anterior - durma o suficiente, alimente-se bem e reserve um tempo para relaxar. Seu estado mental impacta significativamente seu desempenho.`;
  }

  // Build the full mock response
  const questionsContent = isTech || position.includes('dev') ? techQuestionsContent : managementQuestionsContent;

  let rawTextTitle = "";
  if (isEnglish) {
    rawTextTitle = "INTERVIEW PREPARATION PLAN";
  } else if (isSpanish) {
    rawTextTitle = "PLAN DE PREPARACIÓN PARA ENTREVISTA";
  } else {
    rawTextTitle = "PLANO DE PREPARAÇÃO PARA ENTREVISTA";
  }

  let positionTitle = "";
  if (isEnglish) {
    positionTitle = "POSITION:";
  } else if (isSpanish) {
    positionTitle = "PUESTO:";
  } else {
    positionTitle = "CARGO:";
  }

  let companyTitle = "";
  if (isEnglish) {
    companyTitle = "COMPANY:";
  } else if (isSpanish) {
    companyTitle = "EMPRESA:";
  } else {
    companyTitle = "EMPRESA:";
  }

  let processSectionTitle = "";
  if (isEnglish) {
    processSectionTitle = "1. EXPECTED SELECTION PROCESS";
  } else if (isSpanish) {
    processSectionTitle = "1. PROCESO DE SELECCIÓN ESPERADO";
  } else {
    processSectionTitle = "1. PROCESSO SELETIVO ESPERADO";
  }

  let questionsSectionTitle = "";
  if (isEnglish) {
    questionsSectionTitle = "2. COMMON QUESTIONS AND HOW TO ANSWER";
  } else if (isSpanish) {
    questionsSectionTitle = "2. PREGUNTAS COMUNES Y CÓMO RESPONDER";
  } else {
    questionsSectionTitle = "2. PERGUNTAS COMUNS E COMO RESPONDER";
  }

  let questionsToAskSectionTitle = "";
  if (isEnglish) {
    questionsToAskSectionTitle = "3. QUESTIONS TO ASK THE INTERVIEWER";
  } else if (isSpanish) {
    questionsToAskSectionTitle = "3. PREGUNTAS PARA HACER AL ENTREVISTADOR";
  } else {
    questionsToAskSectionTitle = "3. PERGUNTAS PARA FAZER AO ENTREVISTADOR";
  }

  let studyMaterialsSectionTitle = "";
  if (isEnglish) {
    studyMaterialsSectionTitle = "4. WHAT TO STUDY BEFORE THE INTERVIEW";
  } else if (isSpanish) {
    studyMaterialsSectionTitle = "4. QUÉ ESTUDIAR ANTES DE LA ENTREVISTA";
  } else {
    studyMaterialsSectionTitle = "4. O QUE ESTUDAR ANTES DA ENTREVISTA";
  }

  let finalTipsSectionTitle = "";
  if (isEnglish) {
    finalTipsSectionTitle = "5. FINAL PERSONALIZED TIPS";
  } else if (isSpanish) {
    finalTipsSectionTitle = "5. CONSEJOS FINALES PERSONALIZADOS";
  } else {
    finalTipsSectionTitle = "5. DICAS FINAIS PERSONALIZADAS";
  }

  const rawText = `
${rawTextTitle}

${positionTitle} ${formData.jobTitle}
${companyTitle} ${formData.companyName}

${processSectionTitle}
${processContent}

${questionsSectionTitle}
${questionsContent}

${questionsToAskSectionTitle}
${questionsToAskContent}

${studyMaterialsSectionTitle}
${studyMaterialsContent}

${finalTipsSectionTitle}
${finalTipsContent}
  `;

  // Create section titles based on the selected language
  let processSectionTitleShort = "";
  let questionsSectionTitleShort = "";
  let questionsToAskSectionTitleShort = "";
  let studyMaterialsSectionTitleShort = "";
  let finalTipsSectionTitleShort = "";

  if (isEnglish) {
    processSectionTitleShort = "Expected Selection Process";
    questionsSectionTitleShort = "Common Questions and How to Answer";
    questionsToAskSectionTitleShort = "Questions to Ask the Interviewer";
    studyMaterialsSectionTitleShort = "What to Study Before the Interview";
    finalTipsSectionTitleShort = "Final Personalized Tips";
  } else if (isSpanish) {
    processSectionTitleShort = "Proceso de selección esperado";
    questionsSectionTitleShort = "Preguntas comunes y cómo responder";
    questionsToAskSectionTitleShort = "Preguntas para hacer al entrevistador";
    studyMaterialsSectionTitleShort = "Qué estudiar antes de la entrevista";
    finalTipsSectionTitleShort = "Consejos finales personalizados";
  } else {
    processSectionTitleShort = "Processo seletivo esperado";
    questionsSectionTitleShort = "Perguntas comuns e como responder";
    questionsToAskSectionTitleShort = "Perguntas para fazer ao entrevistador";
    studyMaterialsSectionTitleShort = "O que estudar antes da entrevista";
    finalTipsSectionTitleShort = "Dicas finais personalizadas";
  }

  return {
    process: {
      title: processSectionTitleShort,
      emoji: "📋",
      content: processContent
    },
    questions: {
      title: questionsSectionTitleShort,
      emoji: "❓",
      content: questionsContent
    },
    questionsToAsk: {
      title: questionsToAskSectionTitleShort,
      emoji: "💬",
      content: questionsToAskContent
    },
    studyMaterials: {
      title: studyMaterialsSectionTitleShort,
      emoji: "📚",
      content: studyMaterialsContent
    },
    finalTips: {
      title: finalTipsSectionTitleShort,
      emoji: "🌟",
      content: finalTipsContent
    },
    rawText
  };
};
