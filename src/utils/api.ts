
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
  let prompt = `Gere um plano de preparação para uma entrevista para a vaga de ${formData.jobTitle} na empresa ${formData.companyName}.`;
  
  if (formData.jobUrl) {
    prompt += ` A vaga está disponível nesta URL: ${formData.jobUrl}.`;
  }
  
  if (formData.candidateLinkedIn) {
    prompt += ` O LinkedIn do candidato é: ${formData.candidateLinkedIn}.`;
  }
  
  if (formData.interviewerLinkedIn) {
    prompt += ` O LinkedIn do(s) entrevistador(es) é: ${formData.interviewerLinkedIn}.`;
  }
  
  if (formData.interviewDate) {
    prompt += ` A entrevista está agendada para: ${formData.interviewDate}.`;
  }
  
  if (formData.interviewType) {
    const typeMap: Record<string, string> = {
      technical: "técnica",
      behavioral: "comportamental",
      strategic: "estratégica",
      cultural: "cultural"
    };
    prompt += ` O tipo de entrevista é: ${typeMap[formData.interviewType] || formData.interviewType}.`;
  }
  
  if (formData.jobLevel) {
    const levelMap: Record<string, string> = {
      junior: "júnior",
      mid: "pleno",
      senior: "sênior",
      leadership: "direção"
    };
    prompt += ` O nível da vaga é: ${levelMap[formData.jobLevel] || formData.jobLevel}.`;
  }
  
  if (formData.interviewLanguage) {
    const languageMap: Record<string, string> = {
      portuguese: "português",
      english: "inglês",
      spanish: "espanhol"
    };
    prompt += ` A entrevista será em: ${languageMap[formData.interviewLanguage] || formData.interviewLanguage}.`;
  }
  
  if (formData.practicePoints) {
    prompt += ` O candidato quer treinar estes pontos: ${formData.practicePoints}.`;
  }
  
  if (formData.personalContext) {
    prompt += ` Contexto pessoal do candidato: ${formData.personalContext}.`;
  }
  
  return prompt;
};

const generateMockResponse = (formData: FormData): InterviewPlan => {
  const isEnglish = formData.interviewLanguage === 'english';
  
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
  const processContent = isEnglish 
    ? `The selection process at ${formData.companyName} typically includes several stages:

- Initial screening call with HR
- Technical assessment or case study
- 1-2 rounds of interviews with the team
- Final interview with the hiring manager
- Potential reference checks

Prepare for a mix of technical and behavioral questions throughout the process. The company values thoroughness and attention to detail in their hiring.`
    : `O processo seletivo na ${formData.companyName} normalmente inclui várias etapas:

- Chamada inicial de triagem com RH
- Avaliação técnica ou estudo de caso
- 1-2 rodadas de entrevistas com a equipe
- Entrevista final com o gerente de contratação
- Possíveis verificações de referências

Prepare-se para uma mistura de perguntas técnicas e comportamentais ao longo do processo. A empresa valoriza minuciosidade e atenção aos detalhes em suas contratações.`;

  const techQuestionsContent = isEnglish
    ? `Here are some common questions you might face and how to approach them:

**Technical Questions:**
- Explain your experience with the technologies listed in the job description.
- How would you solve [specific technical problem]?
- Can you discuss a challenging project you've worked on?

**Approach:** Provide concrete examples and use the STAR method (Situation, Task, Action, Result). Be ready to whiteboard or code if asked.

**Behavioral Questions:**
- Tell me about a time you faced a difficult technical challenge.
- How do you prioritize tasks when dealing with multiple deadlines?
- Describe a situation where you had to learn a new technology quickly.

**Approach:** Prepare 5-7 stories that highlight your skills and adaptability. Focus on measurable outcomes and lessons learned.`
    : `Aqui estão algumas perguntas comuns que você pode enfrentar e como abordá-las:

**Perguntas Técnicas:**
- Explique sua experiência com as tecnologias listadas na descrição da vaga.
- Como você resolveria [problema técnico específico]?
- Você pode discutir um projeto desafiador em que trabalhou?

**Abordagem:** Forneça exemplos concretos e use o método STAR (Situação, Tarefa, Ação, Resultado). Esteja pronto para explicar ou codificar se solicitado.

**Perguntas Comportamentais:**
- Conte-me sobre um momento em que você enfrentou um desafio técnico difícil.
- Como você prioriza tarefas ao lidar com vários prazos?
- Descreva uma situação em que você teve que aprender uma nova tecnologia rapidamente.

**Abordagem:** Prepare 5-7 histórias que destacam suas habilidades e adaptabilidade. Concentre-se em resultados mensuráveis e lições aprendidas.`;

  const managementQuestionsContent = isEnglish
    ? `Here are some common questions you might face and how to approach them:

**Leadership Questions:**
- How do you motivate your team during challenging projects?
- Describe your leadership style and how it adapts to different situations.
- Tell me about a time you had to make a difficult decision for your team.

**Approach:** Focus on your philosophy of leadership, with examples of how you've grown teams and navigated challenges.

**Strategic Questions:**
- How would you improve our product/service based on what you know?
- How do you balance short-term results with long-term strategy?
- How do you stay informed about industry trends?

**Approach:** Research the company thoroughly and be ready to show your strategic thinking and vision.`
    : `Aqui estão algumas perguntas comuns que você pode enfrentar e como abordá-las:

**Perguntas de Liderança:**
- Como você motiva sua equipe durante projetos desafiadores?
- Descreva seu estilo de liderança e como ele se adapta a diferentes situações.
- Conte-me sobre uma vez em que você teve que tomar uma decisão difícil para sua equipe.

**Abordagem:** Concentre-se em sua filosofia de liderança, com exemplos de como você desenvolveu equipes e navegou por desafios.

**Perguntas Estratégicas:**
- Como você melhoraria nosso produto/serviço com base no que sabe?
- Como você equilibra resultados de curto prazo com estratégia de longo prazo?
- Como você se mantém informado sobre tendências do setor?

**Abordagem:** Pesquise a empresa detalhadamente e esteja pronto para mostrar seu pensamento estratégico e visão.`;

  const questionsToAskContent = isEnglish
    ? `Asking thoughtful questions shows your interest and engagement. Consider asking:

- What does success look like in this role after 3, 6, and 12 months?
- What are the biggest challenges the team is currently facing?
- How would you describe the team culture and working style?
- What opportunities exist for professional development?
- How is performance evaluated?
- What's the most exciting project the team has worked on recently?

**Pro tip:** Take notes during the interview to ask specific follow-up questions based on what was discussed.`
    : `Fazer perguntas bem pensadas mostra seu interesse e engajamento. Considere perguntar:

- Como é o sucesso nesta função após 3, 6 e 12 meses?
- Quais são os maiores desafios que a equipe está enfrentando atualmente?
- Como você descreveria a cultura da equipe e o estilo de trabalho?
- Que oportunidades existem para desenvolvimento profissional?
- Como o desempenho é avaliado?
- Qual foi o projeto mais empolgante em que a equipe trabalhou recentemente?

**Dica profissional:** Faça anotações durante a entrevista para fazer perguntas específicas de acompanhamento com base no que foi discutido.`;

  // Study materials section - customize based on whether it's a tech role or not
  let studyMaterialsContent = "";
  
  if (isTech) {
    studyMaterialsContent = isEnglish
      ? `Before your interview, review these key areas:

**Technical Preparation:**
- Review fundamentals of the key technologies mentioned in the job description
- Practice coding challenges on platforms like LeetCode or HackerRank
- Review system design concepts if applying for a senior role
- Refresh your knowledge of relevant frameworks and tools

**Company Research:**
- Study ${formData.companyName}'s products/services and recent developments
- Research their technology stack and engineering culture
- Read their engineering blog or technical case studies if available

**Recommended Resources:**
- Recent industry articles related to the company's technology domain
- Documentation for technologies listed in the job description
- Company reviews on Glassdoor for interview insights`
      : `Antes da sua entrevista, revise estas áreas-chave:

**Preparação Técnica:**
- Revise os fundamentos das principais tecnologias mencionadas na descrição da vaga
- Pratique desafios de codificação em plataformas como LeetCode ou HackerRank
- Revise conceitos de design de sistemas se estiver se candidatando a uma função sênior
- Atualize seu conhecimento sobre frameworks e ferramentas relevantes

**Pesquisa da Empresa:**
- Estude os produtos/serviços da ${formData.companyName} e desenvolvimentos recentes
- Pesquise sua stack de tecnologia e cultura de engenharia
- Leia o blog de engenharia ou estudos de caso técnicos, se disponíveis

**Recursos Recomendados:**
- Artigos recentes do setor relacionados ao domínio de tecnologia da empresa
- Documentação para tecnologias listadas na descrição da vaga
- Avaliações da empresa no Glassdoor para insights sobre entrevistas`;
  } else if (isManagement) {
    studyMaterialsContent = isEnglish
      ? `Before your interview, focus on these key areas:

**Leadership Preparation:**
- Review your leadership accomplishments and be ready to quantify results
- Prepare examples of how you've developed teams and managed challenges
- Consider how your leadership style aligns with ${formData.companyName}'s culture

**Business Research:**
- Study ${formData.companyName}'s business model, market position, and competitors
- Analyze recent company news, earnings reports, and strategic initiatives
- Understand the industry landscape and current challenges

**Recommended Resources:**
- Annual reports and investor presentations
- Industry analysis reports relevant to ${formData.companyName}'s sector
- Recent interviews or talks by company executives
- Books on leadership and management that align with the company's values`
      : `Antes da sua entrevista, concentre-se nestas áreas-chave:

**Preparação de Liderança:**
- Revise suas realizações de liderança e esteja pronto para quantificar resultados
- Prepare exemplos de como você desenvolveu equipes e gerenciou desafios
- Considere como seu estilo de liderança se alinha à cultura da ${formData.companyName}

**Pesquisa de Negócios:**
- Estude o modelo de negócios da ${formData.companyName}, posição de mercado e concorrentes
- Analise notícias recentes da empresa, relatórios de lucros e iniciativas estratégicas
- Entenda o panorama do setor e os desafios atuais

**Recursos Recomendados:**
- Relatórios anuais e apresentações para investidores
- Relatórios de análise do setor relevantes para o setor da ${formData.companyName}
- Entrevistas ou palestras recentes de executivos da empresa
- Livros sobre liderança e gestão que se alinham aos valores da empresa`;
  } else {
    studyMaterialsContent = isEnglish
      ? `Before your interview, review these key areas:

**Role-Specific Preparation:**
- Review the job description and identify key skills and requirements
- Prepare examples from your experience that demonstrate these skills
- Research industry best practices related to your role

**Company Research:**
- Study ${formData.companyName}'s products/services, mission, and values
- Research recent company news and developments
- Understand their market position and competitors

**Recommended Resources:**
- Company website, LinkedIn page, and social media
- Industry publications relevant to your role
- Informational interviews with connections who work in similar roles
- Online courses to refresh skills mentioned in the job description`
      : `Antes da sua entrevista, revise estas áreas-chave:

**Preparação Específica para a Função:**
- Revise a descrição do cargo e identifique habilidades e requisitos principais
- Prepare exemplos de sua experiência que demonstrem essas habilidades
- Pesquise as melhores práticas do setor relacionadas à sua função

**Pesquisa da Empresa:**
- Estude os produtos/serviços, missão e valores da ${formData.companyName}
- Pesquise notícias e desenvolvimentos recentes da empresa
- Entenda sua posição no mercado e concorrentes

**Recursos Recomendados:**
- Site da empresa, página do LinkedIn e redes sociais
- Publicações do setor relevantes para sua função
- Entrevistas informativas com conexões que trabalham em funções semelhantes
- Cursos online para atualizar habilidades mencionadas na descrição do cargo`;
  }

  const finalTipsContent = isEnglish
    ? `Final personalized advice for your interview:

- **Prepare your interview environment** if it's a virtual interview. Test your technology, ensure good lighting and a professional background.

- **Dress professionally** according to ${formData.companyName}'s culture. When in doubt, slightly overdress.

- **Practice your responses** out loud, ideally with a friend for feedback. Record yourself to review your delivery.

- **Prepare a concise "tell me about yourself"** answer that highlights relevant experience.

- **Bring copies of your resume** and a notepad for in-person interviews.

- **Send a thank-you note** within 24 hours after the interview.

- **Take care of yourself** the day before - get enough sleep, eat well, and take time to relax. Your mental state significantly impacts your performance.`
    : `Conselhos finais personalizados para sua entrevista:

- **Prepare seu ambiente de entrevista** se for uma entrevista virtual. Teste sua tecnologia, garanta boa iluminação e um fundo profissional.

- **Vista-se profissionalmente** de acordo com a cultura da ${formData.companyName}. Em caso de dúvida, vista-se um pouco mais formalmente.

- **Pratique suas respostas** em voz alta, idealmente com um amigo para feedback. Grave-se para revisar sua apresentação.

- **Prepare uma resposta concisa para "fale sobre você"** que destaque experiência relevante.

- **Leve cópias do seu currículo** e um bloco de notas para entrevistas presenciais.

- **Envie uma nota de agradecimento** dentro de 24 horas após a entrevista.

- **Cuide de si mesmo** no dia anterior - durma o suficiente, alimente-se bem e reserve um tempo para relaxar. Seu estado mental impacta significativamente seu desempenho.`;

  // Build the full mock response
  const questionsContent = isTech || position.includes('dev') ? techQuestionsContent : managementQuestionsContent;

  const rawText = `
PLANO DE PREPARAÇÃO PARA ENTREVISTA

CARGO: ${formData.jobTitle}
EMPRESA: ${formData.companyName}

1. PROCESSO SELETIVO ESPERADO
${processContent}

2. PERGUNTAS COMUNS E COMO RESPONDER
${questionsContent}

3. PERGUNTAS PARA FAZER AO ENTREVISTADOR
${questionsToAskContent}

4. O QUE ESTUDAR ANTES DA ENTREVISTA
${studyMaterialsContent}

5. DICAS FINAIS PERSONALIZADAS
${finalTipsContent}
  `;

  return {
    process: {
      title: isEnglish ? "Expected Selection Process" : "Processo seletivo esperado",
      emoji: "📋",
      content: processContent
    },
    questions: {
      title: isEnglish ? "Common Questions and How to Answer" : "Perguntas comuns e como responder",
      emoji: "❓",
      content: questionsContent
    },
    questionsToAsk: {
      title: isEnglish ? "Questions to Ask the Interviewer" : "Perguntas para fazer ao entrevistador",
      emoji: "💬",
      content: questionsToAskContent
    },
    studyMaterials: {
      title: isEnglish ? "What to Study Before the Interview" : "O que estudar antes da entrevista",
      emoji: "📚",
      content: studyMaterialsContent
    },
    finalTips: {
      title: isEnglish ? "Final Personalized Tips" : "Dicas finais personalizadas",
      emoji: "🌟",
      content: finalTipsContent
    },
    rawText
  };
};
