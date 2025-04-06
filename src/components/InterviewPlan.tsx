
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { InterviewPlan as InterviewPlanType } from "@/types";
import PlanSection from "./plan/PlanSection";
import ExportOptions from "./plan/ExportOptions";
import DonationCard from "./DonationCard";
import PayPlan from "./plan/PayPlan";

interface InterviewPlanProps {
  plan: InterviewPlanType;
  jobTitle?: string;
  companyName?: string;
}

const InterviewPlan = ({ plan, jobTitle = "", companyName = "" }: InterviewPlanProps) => {
  const printRef = useRef<HTMLDivElement>(null);
  const [premiumUnlocked, setPremiumUnlocked] = useState(false);
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      }
    }
  };

  // Determine which sections to display
  const standardSections = [
    plan.process,
    ...(plan.preparationSchedule ? [plan.preparationSchedule] : []),
    plan.questions,
    ...(plan.industrySections || []),
    ...(plan.interviewTypeSections || []),
    plan.questionsToAsk,
    plan.studyMaterials,
    plan.finalTips
  ].filter(Boolean); // Filter out any undefined sections
  
  // Simulate premium content for testing if premiumUnlocked is true
  const simulatePremiumContent = () => {
    if (!plan.premiumContent) {
      // Create simulated premium content if it doesn't exist
      const currentLanguage = localStorage.getItem('language') || 'pt';
      
      const detailedQuestionTitle = 
        currentLanguage === 'en' ? 'Detailed Questions & Answers' :
        currentLanguage === 'es' ? 'Preguntas y Respuestas Detalladas' :
        'Perguntas e Respostas Detalhadas';
        
      const simulationTitle = 
        currentLanguage === 'en' ? 'Interview Simulation' :
        currentLanguage === 'es' ? 'Simulación de Entrevista' :
        'Simulação de Entrevista';
        
      const salaryTitle = 
        currentLanguage === 'en' ? 'Salary Negotiation' :
        currentLanguage === 'es' ? 'Negociación Salarial' :
        'Negociação Salarial';
        
      const matrixTitle = 
        currentLanguage === 'en' ? 'Competency Matrix' :
        currentLanguage === 'es' ? 'Matriz de Competencias' :
        'Matriz de Competências';
      
      plan.premiumContent = {
        detailedQuestions: {
          title: detailedQuestionTitle,
          emoji: "🎯",
          content: createDetailedQuestionsContent(currentLanguage)
        },
        interviewSimulation: {
          title: simulationTitle,
          emoji: "🎬",
          content: createInterviewSimulationContent(currentLanguage)
        },
        salaryNegotiation: {
          title: salaryTitle,
          emoji: "💰",
          content: createSalaryNegotiationContent(currentLanguage)
        },
        competencyMatrix: {
          title: matrixTitle,
          emoji: "📊",
          content: createCompetencyMatrixContent(currentLanguage)
        }
      };
    }
    
    return plan.premiumContent ? [
      plan.premiumContent.detailedQuestions,
      plan.premiumContent.interviewSimulation,
      plan.premiumContent.salaryNegotiation,
      plan.premiumContent.competencyMatrix
    ].filter(Boolean) : [];
  };
  
  // Premium sections to display if unlocked
  const premiumSections = premiumUnlocked ? simulatePremiumContent() : [];
  
  // Combine standard and premium sections
  const sections = [...standardSections, ...premiumSections].filter(Boolean);

  const handlePremiumUnlocked = () => {
    setPremiumUnlocked(true);
    
    // Show success toast
    const language = localStorage.getItem('language') || 'pt';
    const message = language === 'en' ? 'Premium plan unlocked successfully!' : 
                    language === 'es' ? '¡Plan premium desbloqueado con éxito!' : 
                    'Plano premium desbloqueado com sucesso!';
                     
    // Use toast from the component's scope
    toast.success(message);
  };
  
  // Helper functions to generate simulated premium content
  function createDetailedQuestionsContent(language: string) {
    if (language === 'en') {
      return `**Technical Expertise**\n\n1. **Question**: Describe a complex technical challenge you faced in a previous role and how you solved it.\n   **Model Answer**: Begin by contextualizing the situation – what was the business impact of this challenge? Then, walk through your analytical process, highlighting your technical skills and problem-solving approach. Conclude with measurable results and any lessons learned.\n\n2. **Question**: How do you stay updated with the latest developments in your field?\n   **Model Answer**: Mention specific resources (industry publications, forums, conferences) while emphasizing your continuous learning mindset. Include examples of how you've applied new knowledge to improve your work.\n\n**Problem-Solving Abilities**\n\n3. **Question**: Tell me about a time you identified and solved a problem before it became urgent.\n   **Model Answer**: Showcase your proactive approach and analytical thinking. Structure your response to highlight the initial observation, your diagnosis process, the action you took, and the outcome that benefited the team or company.\n\n4. **Question**: How do you approach a problem that you're unsure how to solve?\n   **Model Answer**: Emphasize your methodical approach – researching, consulting experts, breaking down complex problems into manageable parts. Include an example that demonstrates your resourcefulness and perseverance.`;
    } else if (language === 'es') {
      return `**Experiencia Técnica**\n\n1. **Pregunta**: Describe un desafío técnico complejo que enfrentaste en un rol anterior y cómo lo resolviste.\n   **Respuesta Modelo**: Comienza contextualizando la situación – ¿cuál fue el impacto empresarial de este desafío? Luego, explica tu proceso analítico, destacando tus habilidades técnicas y enfoque de resolución de problemas. Concluye con resultados medibles y lecciones aprendidas.\n\n2. **Pregunta**: ¿Cómo te mantienes actualizado con los últimos desarrollos en tu campo?\n   **Respuesta Modelo**: Menciona recursos específicos (publicaciones de la industria, foros, conferencias) mientras enfatizas tu mentalidad de aprendizaje continuo. Incluye ejemplos de cómo has aplicado nuevos conocimientos para mejorar tu trabajo.\n\n**Habilidades de Resolución de Problemas**\n\n3. **Pregunta**: Cuéntame sobre una ocasión en que identificaste y resolviste un problema antes de que se volviera urgente.\n   **Respuesta Modelo**: Muestra tu enfoque proactivo y pensamiento analítico. Estructura tu respuesta para destacar la observación inicial, tu proceso de diagnóstico, la acción que tomaste y el resultado que benefició al equipo o a la empresa.\n\n4. **Pregunta**: ¿Cómo abordas un problema que no estás seguro de cómo resolver?\n   **Respuesta Modelo**: Enfatiza tu enfoque metódico – investigar, consultar expertos, desglosar problemas complejos en partes manejables. Incluye un ejemplo que demuestre tu ingenio y perseverancia.`;
    } else {
      return `**Expertise Técnica**\n\n1. **Pergunta**: Descreva um desafio técnico complexo que você enfrentou em um cargo anterior e como o resolveu.\n   **Resposta Modelo**: Comece contextualizando a situação – qual foi o impacto nos negócios desse desafio? Em seguida, percorra seu processo analítico, destacando suas habilidades técnicas e abordagem de resolução de problemas. Conclua com resultados mensuráveis e lições aprendidas.\n\n2. **Pergunta**: Como você se mantém atualizado com os últimos desenvolvimentos em seu campo?\n   **Resposta Modelo**: Mencione recursos específicos (publicações do setor, fóruns, conferências) enquanto enfatiza sua mentalidade de aprendizado contínuo. Inclua exemplos de como você aplicou novos conhecimentos para melhorar seu trabalho.\n\n**Habilidades de Resolução de Problemas**\n\n3. **Pergunta**: Conte-me sobre uma ocasião em que identificou e resolveu um problema antes que se tornasse urgente.\n   **Resposta Modelo**: Mostre sua abordagem proativa e pensamento analítico. Estruture sua resposta para destacar a observação inicial, seu processo de diagnóstico, a ação que tomou e o resultado que beneficiou a equipe ou empresa.\n\n4. **Pergunta**: Como você aborda um problema que não tem certeza de como resolver?\n   **Resposta Modelo**: Enfatize sua abordagem metódica – pesquisar, consultar especialistas, dividir problemas complexos em partes gerenciáveis. Inclua um exemplo que demonstre sua engenhosidade e perseverança.`;
    }
  }
  
  function createInterviewSimulationContent(language: string) {
    if (language === 'en') {
      return `**Simulated Interview: Key Moments**\n\n**Introduction (First 2 Minutes)**\n• **Interviewer**: "Tell me about yourself and why you're interested in this role."\n• **Effective Response**: Start with a brief professional summary, then connect your experience to the specific role and company. End with enthusiasm about the opportunity.\n• **Feedback**: Maintain eye contact, speak clearly and confidently. Avoid rushing or giving overly detailed personal history.\n\n**Technical Discussion (Middle Section)**\n• **Interviewer**: "Can you walk me through how you would approach [specific job-related problem]?"\n• **Effective Approach**: Demonstrate your thinking process step by step. Ask clarifying questions if needed, outline your methodology, and explain your reasoning.\n• **Feedback**: Show confidence in your area of expertise. Don't be afraid to admit knowledge gaps, but explain how you would find the answers.\n\n**Challenging Question (Critical Moment)**\n• **Interviewer**: "Tell me about a time you failed at work."\n• **Effective Response**: Choose a genuine example, focus on what you learned, and explain how it improved your approach afterward.\n• **Feedback**: Be authentic and reflective rather than defensive. Show growth mindset and resilience.\n\n**Closing (Final Minutes)**\n• **Interviewer**: "Do you have any questions for me?"\n• **Effective Questions**: Ask thoughtful questions about the team, challenges, or company vision that weren't covered earlier.\n• **Feedback**: This demonstrates your research, engagement, and genuine interest in the role beyond just getting any job.`;
    } else if (language === 'es') {
      return `**Entrevista Simulada: Momentos Clave**\n\n**Introducción (Primeros 2 Minutos)**\n• **Entrevistador**: "Háblame de ti y por qué estás interesado en este puesto."\n• **Respuesta Efectiva**: Comienza con un breve resumen profesional, luego conecta tu experiencia con el puesto y la empresa específicos. Termina con entusiasmo por la oportunidad.\n• **Retroalimentación**: Mantén contacto visual, habla clara y confiadamente. Evita apresurarte o dar un historial personal demasiado detallado.\n\n**Discusión Técnica (Sección Media)**\n• **Entrevistador**: "¿Puedes explicarme cómo abordarías [problema específico relacionado con el trabajo]?"\n• **Enfoque Efectivo**: Demuestra tu proceso de pensamiento paso a paso. Haz preguntas aclaratorias si es necesario, describe tu metodología y explica tu razonamiento.\n• **Retroalimentación**: Muestra confianza en tu área de experiencia. No temas admitir lagunas de conocimiento, pero explica cómo encontrarías las respuestas.\n\n**Pregunta Desafiante (Momento Crítico)**\n• **Entrevistador**: "Cuéntame sobre una vez que fracasaste en el trabajo."\n• **Respuesta Efectiva**: Elige un ejemplo genuino, concéntrate en lo que aprendiste y explica cómo mejoró tu enfoque después.\n• **Retroalimentación**: Sé auténtico y reflexivo en lugar de defensivo. Muestra mentalidad de crecimiento y resiliencia.\n\n**Cierre (Minutos Finales)**\n• **Entrevistador**: "¿Tienes alguna pregunta para mí?"\n• **Preguntas Efectivas**: Haz preguntas reflexivas sobre el equipo, desafíos o visión de la empresa que no se cubrieron anteriormente.\n• **Retroalimentación**: Esto demuestra tu investigación, compromiso e interés genuino en el puesto más allá de simplemente conseguir cualquier trabajo.`;
    } else {
      return `**Entrevista Simulada: Momentos-Chave**\n\n**Introdução (Primeiros 2 Minutos)**\n• **Entrevistador**: "Fale-me sobre você e por que está interessado nesta função."\n• **Resposta Eficaz**: Comece com um breve resumo profissional, depois conecte sua experiência à função e empresa específicas. Termine com entusiasmo pela oportunidade.\n• **Feedback**: Mantenha contato visual, fale com clareza e confiança. Evite apressar-se ou dar um histórico pessoal excessivamente detalhado.\n\n**Discussão Técnica (Seção Intermediária)**\n• **Entrevistador**: "Você pode me explicar como abordaria [problema específico relacionado ao trabalho]?"\n• **Abordagem Eficaz**: Demonstre seu processo de pensamento passo a passo. Faça perguntas esclarecedoras se necessário, descreva sua metodologia e explique seu raciocínio.\n• **Feedback**: Mostre confiança em sua área de especialização. Não tenha medo de admitir lacunas de conhecimento, mas explique como encontraria as respostas.\n\n**Pergunta Desafiadora (Momento Crítico)**\n• **Entrevistador**: "Conte-me sobre uma vez em que você falhou no trabalho."\n• **Resposta Eficaz**: Escolha um exemplo genuíno, concentre-se no que aprendeu e explique como isso melhorou sua abordagem posteriormente.\n• **Feedback**: Seja autêntico e reflexivo em vez de defensivo. Mostre mentalidade de crescimento e resiliência.\n\n**Encerramento (Minutos Finais)**\n• **Entrevistador**: "Você tem alguma pergunta para mim?"\n• **Perguntas Eficazes**: Faça perguntas perspicazes sobre a equipe, desafios ou visão da empresa que não foram abordadas anteriormente.\n• **Feedback**: Isso demonstra sua pesquisa, engajamento e interesse genuíno na função além de simplesmente conseguir qualquer emprego.`;
    }
  }
  
  function createSalaryNegotiationContent(language: string) {
    if (language === 'en') {
      return `**Preparation Framework**\n\n**Research Parameters:**\n• Industry standard salary ranges for this position (use sites like Glassdoor, LinkedIn Salary, Payscale)\n• Company-specific compensation trends (if available)\n• Geographic adjustments (cost of living in your area)\n• Your unique value proposition (specialized skills, certifications, experience)\n\n**Negotiation Talking Points**\n\n**When Asked About Salary Expectations:**\n"Based on my research for similar roles in this industry and location, and considering my experience with [specific relevant skills], I'm looking for a salary in the range of X to Y. However, I'm also considering the entire compensation package including benefits and growth opportunities."\n\n**Responding to a Low Offer:**\n"Thank you for the offer. I'm excited about the opportunity to join your team. Based on my research and the value I can bring through my experience with [specific skills/achievements], I was expecting something closer to [your target number]. Can we discuss how we might bridge this gap?"\n\n**Additional Negotiable Elements:**\n• Flexible work arrangements (remote options, flexible hours)\n• Additional vacation days\n• Professional development budget\n• Performance bonus structure\n• Equity or stock options (if applicable)\n• Relocation assistance\n\n**Closing the Deal**\n\n**Final Response Template:**\n"Thank you for working with me on this. I'm pleased with the [specific improvements to the offer] and am excited to accept this position. I look forward to contributing to [specific company goals or projects] and growing with the team."`;
    } else if (language === 'es') {
      return `**Marco de Preparación**\n\n**Parámetros de Investigación:**\n• Rangos salariales estándar de la industria para este puesto (usa sitios como Glassdoor, LinkedIn Salary, Payscale)\n• Tendencias de compensación específicas de la empresa (si están disponibles)\n• Ajustes geográficos (costo de vida en tu área)\n• Tu propuesta de valor única (habilidades especializadas, certificaciones, experiencia)\n\n**Puntos de Conversación para la Negociación**\n\n**Cuando te Pregunten sobre tus Expectativas Salariales:**\n"Basándome en mi investigación para roles similares en esta industria y ubicación, y considerando mi experiencia con [habilidades relevantes específicas], estoy buscando un salario en el rango de X a Y. Sin embargo, también estoy considerando el paquete de compensación completo, incluyendo beneficios y oportunidades de crecimiento."\n\n**Respondiendo a una Oferta Baja:**\n"Gracias por la oferta. Estoy entusiasmado por la oportunidad de unirme a su equipo. Basándome en mi investigación y el valor que puedo aportar a través de mi experiencia con [habilidades/logros específicos], esperaba algo más cercano a [tu número objetivo]. ¿Podemos discutir cómo podríamos cerrar esta brecha?"\n\n**Elementos Adicionales Negociables:**\n• Acuerdos de trabajo flexibles (opciones remotas, horarios flexibles)\n• Días de vacaciones adicionales\n• Presupuesto para desarrollo profesional\n• Estructura de bonos por desempeño\n• Equidad u opciones de acciones (si aplica)\n• Asistencia para reubicación\n\n**Cerrando el Trato**\n\n**Plantilla de Respuesta Final:**\n"Gracias por trabajar conmigo en esto. Estoy satisfecho con [mejoras específicas a la oferta] y estoy entusiasmado de aceptar este puesto. Espero contribuir a [metas o proyectos específicos de la empresa] y crecer con el equipo."`;
    } else {
      return `**Estrutura de Preparação**\n\n**Parâmetros de Pesquisa:**\n• Faixas salariais padrão do setor para este cargo (use sites como Glassdoor, LinkedIn Salary, Payscale)\n• Tendências de remuneração específicas da empresa (se disponíveis)\n• Ajustes geográficos (custo de vida em sua área)\n• Sua proposta de valor única (habilidades especializadas, certificações, experiência)\n\n**Pontos de Discussão para Negociação**\n\n**Quando Perguntado Sobre Expectativas Salariais:**\n"Com base em minha pesquisa para funções semelhantes neste setor e localização, e considerando minha experiência com [habilidades relevantes específicas], estou buscando um salário na faixa de X a Y. No entanto, também estou considerando o pacote de remuneração completo, incluindo benefícios e oportunidades de crescimento."\n\n**Respondendo a uma Oferta Baixa:**\n"Obrigado pela oferta. Estou animado com a oportunidade de me juntar à sua equipe. Com base em minha pesquisa e no valor que posso trazer através da minha experiência com [habilidades/realizações específicas], eu esperava algo mais próximo de [seu número-alvo]. Podemos discutir como podemos diminuir essa diferença?"\n\n**Elementos Adicionais Negociáveis:**\n• Arranjos de trabalho flexíveis (opções remotas, horários flexíveis)\n• Dias adicionais de férias\n• Orçamento para desenvolvimento profissional\n• Estrutura de bônus de desempenho\n• Participação ou opções de ações (se aplicável)\n• Assistência para relocação\n\n**Fechando o Acordo**\n\n**Modelo de Resposta Final:**\n"Obrigado por trabalhar comigo nisso. Estou satisfeito com [melhorias específicas na oferta] e estou animado para aceitar esta posição. Estou ansioso para contribuir para [metas ou projetos específicos da empresa] e crescer com a equipe."`;
    }
  }
  
  function createCompetencyMatrixContent(language: string) {
    if (language === 'en') {
      return `**Self-Assessment Guide**\n\nRate yourself from 1-5 in each competency area (1=Developing, 5=Expert):\n\n**Technical Competencies**\n\n1. **Core Technical Skills**\n   • Industry-specific knowledge\n   • Relevant tools and technologies\n   • Technical problem-solving\n   • Technical communication\n   • _Self-rating: [?]/5_\n\n2. **Analytical Thinking**\n   • Data interpretation\n   • Pattern recognition\n   • Critical evaluation\n   • Solution development\n   • _Self-rating: [?]/5_\n\n**Behavioral Competencies**\n\n3. **Communication**\n   • Verbal clarity\n   • Active listening\n   • Writing skills\n   • Presentation abilities\n   • _Self-rating: [?]/5_\n\n4. **Adaptability**\n   • Openness to change\n   • Learning agility\n   • Handling ambiguity\n   • Stress management\n   • _Self-rating: [?]/5_\n\n**Leadership Competencies**\n\n5. **Team Collaboration**\n   • Working across functions\n   • Building relationships\n   • Conflict resolution\n   • Knowledge sharing\n   • _Self-rating: [?]/5_\n\n6. **Strategic Thinking**\n   • Big picture focus\n   • Long-term planning\n   • Resource prioritization\n   • Business acumen\n   • _Self-rating: [?]/5_\n\n**Preparation Strategy**\n\nFor areas where you rated yourself 3 or below:\n1. Prepare specific examples that demonstrate your capabilities\n2. Identify improvement actions you've taken or are taking\n3. Prepare to discuss how you compensate for these areas with other strengths`;
    } else if (language === 'es') {
      return `**Guía de Autoevaluación**\n\nCalifícate del 1 al 5 en cada área de competencia (1=En desarrollo, 5=Experto):\n\n**Competencias Técnicas**\n\n1. **Habilidades Técnicas Principales**\n   • Conocimiento específico de la industria\n   • Herramientas y tecnologías relevantes\n   • Resolución de problemas técnicos\n   • Comunicación técnica\n   • _Autoevaluación: [?]/5_\n\n2. **Pensamiento Analítico**\n   • Interpretación de datos\n   • Reconocimiento de patrones\n   • Evaluación crítica\n   • Desarrollo de soluciones\n   • _Autoevaluación: [?]/5_\n\n**Competencias Conductuales**\n\n3. **Comunicación**\n   • Claridad verbal\n   • Escucha activa\n   • Habilidades de escritura\n   • Capacidades de presentación\n   • _Autoevaluación: [?]/5_\n\n4. **Adaptabilidad**\n   • Apertura al cambio\n   • Agilidad de aprendizaje\n   • Manejo de la ambigüedad\n   • Gestión del estrés\n   • _Autoevaluación: [?]/5_\n\n**Competencias de Liderazgo**\n\n5. **Colaboración en Equipo**\n   • Trabajo entre funciones\n   • Construcción de relaciones\n   • Resolución de conflictos\n   • Compartir conocimiento\n   • _Autoevaluación: [?]/5_\n\n6. **Pensamiento Estratégico**\n   • Enfoque en el panorama general\n   • Planificación a largo plazo\n   • Priorización de recursos\n   • Perspicacia empresarial\n   • _Autoevaluación: [?]/5_\n\n**Estrategia de Preparación**\n\nPara áreas donde te calificaste 3 o menos:\n1. Prepara ejemplos específicos que demuestren tus capacidades\n2. Identifica acciones de mejora que has tomado o estás tomando\n3. Prepárate para discutir cómo compensas estas áreas con otras fortalezas`;
    } else {
      return `**Guia de Autoavaliação**\n\nAvalie-se de 1 a 5 em cada área de competência (1=Em desenvolvimento, 5=Especialista):\n\n**Competências Técnicas**\n\n1. **Habilidades Técnicas Principais**\n   • Conhecimento específico do setor\n   • Ferramentas e tecnologias relevantes\n   • Resolução de problemas técnicos\n   • Comunicação técnica\n   • _Autoavaliação: [?]/5_\n\n2. **Pensamento Analítico**\n   • Interpretação de dados\n   • Reconhecimento de padrões\n   • Avaliação crítica\n   • Desenvolvimento de soluções\n   • _Autoavaliação: [?]/5_\n\n**Competências Comportamentais**\n\n3. **Comunicação**\n   • Clareza verbal\n   • Escuta ativa\n   • Habilidades de escrita\n   • Capacidades de apresentação\n   • _Autoavaliação: [?]/5_\n\n4. **Adaptabilidade**\n   • Abertura à mudança\n   • Agilidade de aprendizado\n   • Lidar com ambiguidade\n   • Gerenciamento de estresse\n   • _Autoavaliação: [?]/5_\n\n**Competências de Liderança**\n\n5. **Colaboração em Equipe**\n   • Trabalho entre funções\n   • Construção de relacionamentos\n   • Resolução de conflitos\n   • Compartilhamento de conhecimento\n   • _Autoavaliação: [?]/5_\n\n6. **Pensamento Estratégico**\n   • Foco no panorama geral\n   • Planejamento de longo prazo\n   • Priorização de recursos\n   • Perspicácia de negócios\n   • _Autoavaliação: [?]/5_\n\n**Estratégia de Preparação**\n\nPara áreas onde você se avaliou com 3 ou menos:\n1. Prepare exemplos específicos que demonstrem suas capacidades\n2. Identifique ações de melhoria que você tomou ou está tomando\n3. Prepare-se para discutir como você compensa essas áreas com outros pontos fortes`;
    }
  }

  return (
    <motion.div
      className="w-full max-w-4xl mx-auto mt-8 px-4 pb-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div ref={printRef}>
        <motion.div 
          className="flex flex-col space-y-6 md:space-y-8"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {sections.map((section, index) => (
            <PlanSection key={index} section={section} />
          ))}
        </motion.div>
      </div>

      <motion.div 
        className="mt-10 flex flex-col space-y-8"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {!premiumUnlocked && (
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
            }}
            className="opacity-100 transition-opacity duration-300"
          >
            <PayPlan 
              plan={plan} 
              jobTitle={jobTitle} 
              companyName={companyName} 
              onPremiumPlanUnlocked={handlePremiumUnlocked}
            />
          </motion.div>
        )}

        <motion.div 
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
          }}
          className="opacity-80 hover:opacity-100 transition-opacity duration-300"
        >
          <DonationCard />
        </motion.div>

        <ExportOptions 
          plan={plan} 
          printRef={printRef} 
          jobTitle={jobTitle} 
          companyName={companyName} 
        />
      </motion.div>
    </motion.div>
  );
};

// Add the toast import that's used within the component
import { toast } from "sonner";

export default InterviewPlan;
