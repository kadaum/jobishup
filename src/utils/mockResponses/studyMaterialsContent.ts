
import { FormData } from "@/types";

/**
 * Generates tech role study materials content
 */
export const generateTechStudyMaterialsContent = (formData: FormData, outputLanguage: string): string => {
  if (outputLanguage === 'en') {
    return `Before your interview, review these key areas:

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
  } else if (outputLanguage === 'es') {
    return `Antes de tu entrevista, revisa estas áreas clave:

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
    return `Antes da sua entrevista, revise estas áreas-chave:

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
};

/**
 * Generates management role study materials content
 */
export const generateManagementStudyMaterialsContent = (formData: FormData, outputLanguage: string): string => {
  if (outputLanguage === 'en') {
    return `Before your interview, focus on these key areas:

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
  } else if (outputLanguage === 'es') {
    return `Antes de tu entrevista, concéntrate en estas áreas clave:

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
    return `Antes da sua entrevista, concentre-se nestas áreas-chave:

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
};

/**
 * Generates general role study materials content
 */
export const generateGeneralStudyMaterialsContent = (formData: FormData, outputLanguage: string): string => {
  if (outputLanguage === 'en') {
    return `Before your interview, review these key areas:

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
  } else if (outputLanguage === 'es') {
    return `Antes de tu entrevista, revisa estas áreas clave:

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
    return `Antes da sua entrevista, revise estas áreas-chave:

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
};
