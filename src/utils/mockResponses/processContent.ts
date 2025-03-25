
import { FormData } from "@/types";

/**
 * Generates process content for the interview plan
 */
export const generateProcessContent = (formData: FormData, outputLanguage: string): string => {
  const isEnglish = outputLanguage === 'en';
  const isSpanish = outputLanguage === 'es';
  
  if (isEnglish) {
    return `The selection process at ${formData.companyName} typically includes several stages:

- Initial screening call with HR
- Technical assessment or case study
- 1-2 rounds of interviews with the team
- Final interview with the hiring manager
- Potential reference checks

Prepare for a mix of technical and behavioral questions throughout the process. The company values thoroughness and attention to detail in their hiring.`;
  } else if (isSpanish) {
    return `El proceso de selección en ${formData.companyName} normalmente incluye varias etapas:

- Llamada inicial de selección con RRHH
- Evaluación técnica o estudio de caso
- 1-2 rondas de entrevistas con el equipo
- Entrevista final con el gerente de contratación
- Posibles verificaciones de referencias

Prepárate para una mezcla de preguntas técnicas y de comportamiento a lo largo del proceso. La empresa valora la minuciosidad y la atención al detalle en sus contrataciones.`;
  } else {
    return `O processo seletivo na ${formData.companyName} normalmente inclui várias etapas:

- Chamada inicial de triagem com RH
- Avaliação técnica ou estudo de caso
- 1-2 rodadas de entrevistas com a equipe
- Entrevista final com o gerente de contratação
- Possíveis verificações de referências

Prepare-se para uma mistura de perguntas técnicas e comportamentais ao longo do processo. A empresa valoriza minuciosidade e atenção aos detalhes em suas contratações.`;
  }
};
