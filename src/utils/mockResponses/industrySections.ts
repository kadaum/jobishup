
import { FormData, Section } from "@/types";

/**
 * Generates sections specific to the selected industry
 */
export const generateIndustrySections = (formData: FormData, outputLanguage: string): Section[] => {
  const industry = formData.industry;
  const isEnglish = outputLanguage === 'en';
  const isSpanish = outputLanguage === 'es';
  
  if (!industry || industry === 'other') {
    return [];
  }
  
  const sections: Section[] = [];
  
  // Add industry trends section
  if (isEnglish) {
    sections.push({
      title: `${capitalizeFirstLetter(industry)} Industry Trends`,
      emoji: "📈",
      content: generateIndustryTrendsContent(industry, outputLanguage)
    });
  } else if (isSpanish) {
    sections.push({
      title: `Tendencias de la Industria ${capitalizeFirstLetter(industry)}`,
      emoji: "📈",
      content: generateIndustryTrendsContent(industry, outputLanguage)
    });
  } else {
    sections.push({
      title: `Tendências da Indústria de ${capitalizeFirstLetter(industry)}`,
      emoji: "📈",
      content: generateIndustryTrendsContent(industry, outputLanguage)
    });
  }
  
  // Add industry-specific skills section
  if (isEnglish) {
    sections.push({
      title: `Essential Skills for ${capitalizeFirstLetter(industry)}`,
      emoji: "🛠️",
      content: generateIndustrySkillsContent(industry, outputLanguage)
    });
  } else if (isSpanish) {
    sections.push({
      title: `Habilidades Esenciales para ${capitalizeFirstLetter(industry)}`,
      emoji: "🛠️",
      content: generateIndustrySkillsContent(industry, outputLanguage)
    });
  } else {
    sections.push({
      title: `Habilidades Essenciais para ${capitalizeFirstLetter(industry)}`,
      emoji: "🛠️",
      content: generateIndustrySkillsContent(industry, outputLanguage)
    });
  }
  
  return sections;
};

/**
 * Generates content for industry trends section
 */
const generateIndustryTrendsContent = (industry: string, outputLanguage: string): string => {
  const isEnglish = outputLanguage === 'en';
  const isSpanish = outputLanguage === 'es';
  
  switch (industry) {
    case 'tech':
      if (isEnglish) {
        return `Stay informed about these current tech industry trends:

- AI and machine learning are transforming product development and automation
- Cloud computing continues to evolve with multi-cloud and hybrid cloud strategies
- Cybersecurity has become more critical with the rise of remote work
- DevOps and CI/CD practices are becoming standard for software development
- Low-code/no-code platforms are enabling faster application development

Be prepared to discuss how these trends might impact the role you're applying for and how you've adapted to similar changes in the past.`;
      } else if (isSpanish) {
        return `Mantente informado sobre estas tendencias actuales de la industria tecnológica:

- La IA y el aprendizaje automático están transformando el desarrollo de productos y la automatización
- La computación en la nube continúa evolucionando con estrategias multi-nube e híbridas
- La ciberseguridad se ha vuelto más crítica con el aumento del trabajo remoto
- Las prácticas de DevOps y CI/CD se están convirtiendo en estándar para el desarrollo de software
- Las plataformas low-code/no-code están permitiendo un desarrollo de aplicaciones más rápido

Prepárate para discutir cómo estas tendencias podrían impactar el rol al que estás aplicando y cómo te has adaptado a cambios similares en el pasado.`;
      } else {
        return `Mantenha-se informado sobre estas tendências atuais da indústria de tecnologia:

- IA e aprendizado de máquina estão transformando o desenvolvimento de produtos e automação
- A computação em nuvem continua evoluindo com estratégias de múltiplas nuvens e nuvem híbrida
- A cibersegurança tornou-se mais crítica com o aumento do trabalho remoto
- Práticas de DevOps e CI/CD estão se tornando padrão para desenvolvimento de software
- Plataformas low-code/no-code estão permitindo desenvolvimento de aplicações mais rápido

Esteja preparado para discutir como essas tendências podem impactar o cargo para o qual você está se candidatando e como você se adaptou a mudanças semelhantes no passado.`;
      }
      
    case 'finance':
      if (isEnglish) {
        return `Be aware of these current finance industry trends:

- Digital transformation is reshaping traditional banking and financial services
- Blockchain and cryptocurrency are challenging conventional financial systems
- Fintech startups are disrupting established financial institutions
- Regulatory compliance is becoming more complex with new financial regulations
- ESG (Environmental, Social, Governance) investing is gaining momentum

In your interview, show awareness of how these trends affect the company and position you're applying for.`;
      } else if (isSpanish) {
        return `Ten en cuenta estas tendencias actuales de la industria financiera:

- La transformación digital está remodelando la banca tradicional y los servicios financieros
- Blockchain y criptomonedas están desafiando los sistemas financieros convencionales
- Las startups fintech están interrumpiendo las instituciones financieras establecidas
- El cumplimiento normativo se está volviendo más complejo con nuevas regulaciones financieras
- La inversión ESG (Ambiental, Social, Gobernanza) está ganando impulso

En tu entrevista, muestra conocimiento de cómo estas tendencias afectan a la empresa y al puesto al que te postulas.`;
      } else {
        return `Esteja ciente destas tendências atuais da indústria financeira:

- A transformação digital está remodelando os serviços bancários e financeiros tradicionais
- Blockchain e criptomoedas estão desafiando os sistemas financeiros convencionais
- Startups de fintech estão perturbando instituições financeiras estabelecidas
- A conformidade regulatória está se tornando mais complexa com novas regulamentações financeiras
- Investimentos ESG (Ambiental, Social, Governança) estão ganhando momentum

Em sua entrevista, demonstre consciência de como essas tendências afetam a empresa e a posição para a qual você está se candidatando.`;
      }
      
    case 'healthcare':
      if (isEnglish) {
        return `These are key healthcare industry trends to be familiar with:

- Telehealth and remote patient monitoring have accelerated dramatically
- AI and machine learning are being applied to diagnostics and treatment planning
- Electronic health records are evolving to improve interoperability
- Value-based care models are replacing fee-for-service approaches
- Personalized medicine is advancing with genomics and precision healthcare

Demonstrating knowledge of these trends will show your commitment to staying current in the healthcare field.`;
      } else if (isSpanish) {
        return `Estas son tendencias clave de la industria de la salud con las que debes estar familiarizado:

- La telesalud y el monitoreo remoto de pacientes se han acelerado dramáticamente
- La IA y el aprendizaje automático se están aplicando a diagnósticos y planificación de tratamientos
- Los registros electrónicos de salud están evolucionando para mejorar la interoperabilidad
- Los modelos de atención basados en valor están reemplazando los enfoques de pago por servicio
- La medicina personalizada está avanzando con la genómica y la atención médica de precisión

Demostrar conocimiento de estas tendencias mostrará tu compromiso de mantenerte actualizado en el campo de la salud.`;
      } else {
        return `Estas são tendências-chave da indústria de saúde com as quais você deve estar familiarizado:

- Telessaúde e monitoramento remoto de pacientes aceleraram dramaticamente
- IA e aprendizado de máquina estão sendo aplicados a diagnósticos e planejamento de tratamentos
- Registros eletrônicos de saúde estão evoluindo para melhorar a interoperabilidade
- Modelos de cuidados baseados em valor estão substituindo abordagens de pagamento por serviço
- A medicina personalizada está avançando com genômica e cuidados de saúde de precisão

Demonstrar conhecimento dessas tendências mostrará seu compromisso em se manter atualizado no campo da saúde.`;
      }
      
    default:
      if (isEnglish) {
        return `Research current trends specific to the ${industry} industry before your interview. Pay attention to:

- Major technological innovations affecting the industry
- Changes in consumer behavior and expectations
- Regulatory developments
- Sustainability initiatives
- Competitive landscape and recent mergers or acquisitions

Being able to discuss these trends intelligently will demonstrate your industry knowledge and proactive approach.`;
      } else if (isSpanish) {
        return `Investiga las tendencias actuales específicas de la industria ${industry} antes de tu entrevista. Presta atención a:

- Principales innovaciones tecnológicas que afectan a la industria
- Cambios en el comportamiento y expectativas de los consumidores
- Desarrollos regulatorios
- Iniciativas de sostenibilidad
- Panorama competitivo y fusiones o adquisiciones recientes

Poder discutir estas tendencias de manera inteligente demostrará tu conocimiento de la industria y enfoque proactivo.`;
      } else {
        return `Pesquise tendências atuais específicas da indústria de ${industry} antes da sua entrevista. Preste atenção a:

- Principais inovações tecnológicas que afetam a indústria
- Mudanças no comportamento e expectativas do consumidor
- Desenvolvimentos regulatórios
- Iniciativas de sustentabilidade
- Panorama competitivo e fusões ou aquisições recentes

Ser capaz de discutir essas tendências de forma inteligente demonstrará seu conhecimento da indústria e abordagem proativa.`;
      }
  }
};

/**
 * Generates content for industry skills section
 */
const generateIndustrySkillsContent = (industry: string, outputLanguage: string): string => {
  const isEnglish = outputLanguage === 'en';
  const isSpanish = outputLanguage === 'es';
  
  switch (industry) {
    case 'tech':
      if (isEnglish) {
        return `Key skills valued in the tech industry today:

- **Technical Skills**: Proficiency in relevant programming languages, frameworks, and tools
- **Problem-Solving**: Ability to troubleshoot complex issues and develop innovative solutions
- **Continuous Learning**: Commitment to staying updated with rapidly evolving technologies
- **Collaboration**: Experience working in cross-functional teams using Agile methodologies
- **Communication**: Ability to explain technical concepts to non-technical stakeholders

Be prepared to provide specific examples that demonstrate these skills from your past experience.`;
      } else if (isSpanish) {
        return `Habilidades clave valoradas en la industria tecnológica hoy:

- **Habilidades Técnicas**: Dominio de lenguajes de programación, frameworks y herramientas relevantes
- **Resolución de Problemas**: Capacidad para solucionar problemas complejos y desarrollar soluciones innovadoras
- **Aprendizaje Continuo**: Compromiso para mantenerse actualizado con tecnologías en rápida evolución
- **Colaboración**: Experiencia trabajando en equipos multifuncionales utilizando metodologías Ágiles
- **Comunicación**: Capacidad para explicar conceptos técnicos a partes interesadas no técnicas

Prepárate para proporcionar ejemplos específicos que demuestren estas habilidades de tu experiencia pasada.`;
      } else {
        return `Habilidades-chave valorizadas na indústria de tecnologia hoje:

- **Habilidades Técnicas**: Proficiência em linguagens de programação, frameworks e ferramentas relevantes
- **Resolução de Problemas**: Capacidade de solucionar problemas complexos e desenvolver soluções inovadoras
- **Aprendizado Contínuo**: Compromisso em se manter atualizado com tecnologias em rápida evolução
- **Colaboração**: Experiência trabalhando em equipes multifuncionais usando metodologias Ágeis
- **Comunicação**: Capacidade de explicar conceitos técnicos para stakeholders não técnicos

Esteja preparado para fornecer exemplos específicos que demonstrem essas habilidades de sua experiência passada.`;
      }
      
    case 'finance':
      if (isEnglish) {
        return `Essential skills for success in the finance industry:

- **Analytical Thinking**: Ability to analyze complex financial data and make informed decisions
- **Regulatory Knowledge**: Understanding of relevant financial regulations and compliance requirements
- **Risk Management**: Experience identifying, assessing, and mitigating financial risks
- **Technological Proficiency**: Familiarity with financial software and digital banking platforms
- **Ethical Judgment**: Demonstrated integrity and ethical decision-making

During your interview, highlight specific instances where you've applied these skills successfully.`;
      } else if (isSpanish) {
        return `Habilidades esenciales para el éxito en la industria financiera:

- **Pensamiento Analítico**: Capacidad para analizar datos financieros complejos y tomar decisiones informadas
- **Conocimiento Regulatorio**: Comprensión de regulaciones financieras relevantes y requisitos de cumplimiento
- **Gestión de Riesgos**: Experiencia identificando, evaluando y mitigando riesgos financieros
- **Competencia Tecnológica**: Familiaridad con software financiero y plataformas de banca digital
- **Juicio Ético**: Integridad demostrada y toma de decisiones éticas

Durante tu entrevista, destaca instancias específicas donde has aplicado estas habilidades con éxito.`;
      } else {
        return `Habilidades essenciais para o sucesso na indústria financeira:

- **Pensamento Analítico**: Capacidade de analisar dados financeiros complexos e tomar decisões informadas
- **Conhecimento Regulatório**: Entendimento de regulamentações financeiras relevantes e requisitos de conformidade
- **Gestão de Riscos**: Experiência identificando, avaliando e mitigando riscos financeiros
- **Proficiência Tecnológica**: Familiaridade com software financeiro e plataformas de banco digital
- **Julgamento Ético**: Integridade demonstrada e tomada de decisões éticas

Durante sua entrevista, destaque exemplos específicos onde você aplicou essas habilidades com sucesso.`;
      }
      
    case 'healthcare':
      if (isEnglish) {
        return `Critical skills valued in the healthcare industry:

- **Patient-Centered Approach**: Focus on providing high-quality, compassionate care
- **Adaptability**: Ability to function effectively in fast-paced, changing environments
- **Attention to Detail**: Precision in all aspects of healthcare delivery
- **Teamwork**: Experience collaborating with interdisciplinary healthcare teams
- **Health IT Literacy**: Familiarity with electronic health records and healthcare technologies

Prepare examples that showcase these skills from your professional experience.`;
      } else if (isSpanish) {
        return `Habilidades críticas valoradas en la industria de la salud:

- **Enfoque Centrado en el Paciente**: Foco en proporcionar atención de alta calidad y compasiva
- **Adaptabilidad**: Capacidad para funcionar eficazmente en entornos acelerados y cambiantes
- **Atención al Detalle**: Precisión en todos los aspectos de la prestación de atención médica
- **Trabajo en Equipo**: Experiencia colaborando con equipos interdisciplinarios de atención médica
- **Alfabetización en TI de Salud**: Familiaridad con registros electrónicos de salud y tecnologías sanitarias

Prepara ejemplos que muestren estas habilidades de tu experiencia profesional.`;
      } else {
        return `Habilidades críticas valorizadas na indústria de saúde:

- **Abordagem Centrada no Paciente**: Foco em fornecer cuidados de alta qualidade e compassivos
- **Adaptabilidade**: Capacidade de funcionar efetivamente em ambientes acelerados e em mudança
- **Atenção aos Detalhes**: Precisão em todos os aspectos da prestação de cuidados de saúde
- **Trabalho em Equipe**: Experiência colaborando com equipes interdisciplinares de saúde
- **Alfabetização em TI de Saúde**: Familiaridade com registros eletrônicos de saúde e tecnologias de saúde

Prepare exemplos que demonstrem essas habilidades a partir de sua experiência profissional.`;
      }
      
    default:
      if (isEnglish) {
        return `Key skills to emphasize for your interview in the ${industry} industry:

- **Industry Knowledge**: Understanding of key concepts, terminology, and best practices
- **Adaptability**: Ability to respond effectively to industry changes and challenges
- **Technical Proficiency**: Familiarity with industry-specific tools and technologies
- **Problem-Solving**: Experience addressing common challenges in this field
- **Communication**: Clear and effective communication with various stakeholders

Research the specific skills most valued for your particular role and prepare examples that demonstrate your proficiency.`;
      } else if (isSpanish) {
        return `Habilidades clave para enfatizar en tu entrevista en la industria de ${industry}:

- **Conocimiento de la Industria**: Comprensión de conceptos clave, terminología y mejores prácticas
- **Adaptabilidad**: Capacidad para responder eficazmente a cambios y desafíos de la industria
- **Competencia Técnica**: Familiaridad con herramientas y tecnologías específicas de la industria
- **Resolución de Problemas**: Experiencia abordando desafíos comunes en este campo
- **Comunicación**: Comunicación clara y efectiva con varias partes interesadas

Investiga las habilidades específicas más valoradas para tu rol particular y prepara ejemplos que demuestren tu competencia.`;
      } else {
        return `Habilidades-chave para enfatizar em sua entrevista na indústria de ${industry}:

- **Conhecimento da Indústria**: Entendimento de conceitos-chave, terminologia e melhores práticas
- **Adaptabilidade**: Capacidade de responder efetivamente a mudanças e desafios da indústria
- **Proficiência Técnica**: Familiaridade com ferramentas e tecnologias específicas da indústria
- **Resolução de Problemas**: Experiência abordando desafios comuns neste campo
- **Comunicação**: Comunicação clara e eficaz com vários stakeholders

Pesquise as habilidades específicas mais valorizadas para seu papel particular e prepare exemplos que demonstrem sua proficiência.`;
      }
  }
};

/**
 * Helper function to capitalize the first letter of a string
 */
const capitalizeFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
