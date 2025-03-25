
import { FormData } from "@/types";

/**
 * Generates final tips content
 */
export const generateFinalTipsContent = (formData: FormData, outputLanguage: string): string => {
  if (outputLanguage === 'en') {
    return `Final personalized advice for your interview:

- Prepare your interview environment if it's a virtual interview. Test your technology, ensure good lighting and a professional background.

- Dress professionally according to ${formData.companyName}'s culture. When in doubt, slightly overdress.

- Practice your responses out loud, ideally with a friend for feedback. Record yourself to review your delivery.

- Prepare a concise "tell me about yourself" answer that highlights relevant experience.

- Bring copies of your resume and a notepad for in-person interviews.

- Send a thank-you note within 24 hours after the interview.

- Take care of yourself the day before - get enough sleep, eat well, and take time to relax. Your mental state significantly impacts your performance.`;
  } else if (outputLanguage === 'es') {
    return `Consejos finales personalizados para tu entrevista:

- Prepara tu entorno de entrevista si es una entrevista virtual. Prueba tu tecnología, asegura buena iluminación y un fondo profesional.

- Vístete profesionalmente de acuerdo con la cultura de ${formData.companyName}. En caso de duda, vístete un poco más formal.

- Practica tus respuestas en voz alta, idealmente con un amigo para recibir comentarios. Grábate para revisar tu presentación.

- Prepara una respuesta concisa para "háblame sobre ti" que destaque experiencia relevante.

- Lleva copias de tu currículum y un bloc de notas para entrevistas presenciales.

- Envía una nota de agradecimiento dentro de las 24 horas posteriores a la entrevista.

- Cuídate el día anterior - duerme lo suficiente, aliméntate bien y tómate tiempo para relajarte. Tu estado mental impacta significativamente en tu desempeño.`;
  } else {
    return `Conselhos finais personalizados para sua entrevista:

- Prepare seu ambiente de entrevista se for uma entrevista virtual. Teste sua tecnologia, garanta boa iluminação e um fundo profissional.

- Vista-se profissionalmente de acordo com a cultura da ${formData.companyName}. Em caso de dúvida, vista-se um pouco mais formalmente.

- Pratique suas respostas em voz alta, idealmente com um amigo para feedback. Grave-se para revisar sua apresentação.

- Prepare uma resposta concisa para "fale sobre você" que destaque experiência relevante.

- Leve cópias do seu currículo e um bloco de notas para entrevistas presenciais.

- Envie uma nota de agradecimento dentro de 24 horas após a entrevista.

- Cuide de si mesmo no dia anterior - durma o suficiente, alimente-se bem e reserve um tempo para relaxar. Seu estado mental impacta significativamente seu desempenho.`;
  }
};
