
/**
 * Generates section titles based on the selected language
 */
export const generateSectionTitles = (outputLanguage: string) => {
  const isEnglish = outputLanguage === 'en';
  const isSpanish = outputLanguage === 'es';
  
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
    processSectionTitleShort,
    questionsSectionTitleShort,
    questionsToAskSectionTitleShort,
    studyMaterialsSectionTitleShort,
    finalTipsSectionTitleShort
  };
};
