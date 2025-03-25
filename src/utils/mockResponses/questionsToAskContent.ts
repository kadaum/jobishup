
/**
 * Generates content for questions to ask the interviewer
 */
export const generateQuestionsToAskContent = (outputLanguage: string): string => {
  if (outputLanguage === 'en') {
    return `Asking thoughtful questions shows your interest and engagement. Consider asking:

- What does success look like in this role after 3, 6, and 12 months?
- What are the biggest challenges the team is currently facing?
- How would you describe the team culture and working style?
- What opportunities exist for professional development?
- How is performance evaluated?
- What's the most exciting project the team has worked on recently?

Pro tip: Take notes during the interview to ask specific follow-up questions based on what was discussed.`;
  } else if (outputLanguage === 'es') {
    return `Hacer preguntas bien pensadas muestra tu interés y compromiso. Considera preguntar:

- ¿Cómo se ve el éxito en este rol después de 3, 6 y 12 meses?
- ¿Cuáles son los mayores desafíos que enfrenta el equipo actualmente?
- ¿Cómo describirías la cultura del equipo y el estilo de trabajo?
- ¿Qué oportunidades existen para el desarrollo profesional?
- ¿Cómo se evalúa el desempeño?
- ¿Cuál es el proyecto más emocionante en el que ha trabajado el equipo recientemente?

Consejo profesional: Toma notas durante la entrevista para hacer preguntas específicas de seguimiento basadas en lo que se discutió.`;
  } else {
    return `Fazer perguntas bem pensadas mostra seu interesse e engajamento. Considere perguntar:

- Como é o sucesso nesta função após 3, 6 e 12 meses?
- Quais são os maiores desafios que a equipe está enfrentando atualmente?
- Como você descreveria a cultura da equipe e o estilo de trabalho?
- Que oportunidades existem para desenvolvimento profissional?
- Como o desempenho é avaliado?
- Qual foi o projeto mais empolgante em que a equipe trabalhou recentemente?

Dica profissional: Faça anotações durante a entrevista para fazer perguntas específicas de acompanhamento com base no que foi discutido.`;
  }
};
