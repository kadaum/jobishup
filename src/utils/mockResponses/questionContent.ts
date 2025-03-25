
import { FormData } from "@/types";

/**
 * Generates the technical questions content
 */
export const generateTechQuestionsContent = (outputLanguage: string): string => {
  if (outputLanguage === 'en') {
    return `Here are some common questions you might face and how to approach them:

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
  } else if (outputLanguage === 'es') {
    return `Aquí hay algunas preguntas comunes que podrías enfrentar y cómo abordarlas:

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
    return `Aqui estão algumas perguntas comuns que você pode enfrentar e como abordá-las:

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
};

/**
 * Generates the management questions content
 */
export const generateManagementQuestionsContent = (outputLanguage: string): string => {
  if (outputLanguage === 'en') {
    return `Here are some common questions you might face and how to approach them:

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
  } else if (outputLanguage === 'es') {
    return `Aquí hay algunas preguntas comunes que podrías enfrentar y cómo abordarlas:

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
    return `Aqui estão algumas perguntas comuns que você pode enfrentar e como abordá-las:

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
};
