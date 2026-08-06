const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'frontend', 'config', 'start-content', 'es');

const updates = [
  {
    file: 'complete-guide-printable-business.ts',
    seo: {
      primaryKeyword: 'cómo empezar un negocio de imprimibles 2026',
      secondaryKeywords: [
        'guía completa negocio imprimibles desde cero',
        'iniciar tienda de fichas imprimibles paso a paso',
        'negocio de imprimibles para principiantes 2026',
        'vender fichas educativas en línea guía',
      ],
      lsiKeywords: [
        'modelo de negocio descargas digitales educativas',
        'generador de fichas para emprendedores',
        'tienda Etsy de imprimibles rentable',
      ],
      titleTag: 'Empezar negocio de imprimibles (2026) | LCS',
      metaDescription: 'Cómo empezar un negocio de imprimibles en 2026. Guía paso a paso para vender fichas educativas en Etsy, Amazon KDP y Hotmart con generadores profesionales.',
    },
    hero: {
      title: 'Cómo Empezar un Negocio de Imprimibles en 2026',
      tagline: 'De cero a su primera venta — todo lo que necesita saber para crear un negocio rentable de fichas imprimibles',
      description: 'Esta guía le acompaña en cada paso del lanzamiento de un negocio de fichas imprimibles en 2026. Aprenderá a elegir un nicho rentable, crear productos profesionales sin habilidades de diseño, publicar en las plataformas adecuadas, fijar precios para obtener beneficios y construir un catálogo que genere ventas constantes. Ya sea que planee vender en Etsy, Amazon KDP, Hotmart o su propia web, este es su punto de partida. Cada generador de fichas mencionado ofrece una prueba gratis con marca de agua para que evalúe la calidad antes de comprar una licencia comercial.',
    },
  },
  {
    file: 'create-worksheets-that-sell.ts',
    seo: {
      primaryKeyword: 'crear fichas que se vendan',
      secondaryKeywords: [
        'diseñar fichas imprimibles que generen ventas',
        'cómo crear imprimibles que los compradores quieran',
        'fichas educativas que se venden rápido',
        'secretos de fichas imprimibles rentables',
      ],
      lsiKeywords: [
        'diseño de fichas para vendedores exitosos',
        'optimizar imprimibles para conversión Etsy',
        'fichas profesionales que atraen compradores',
      ],
      titleTag: 'Crear fichas que se vendan | LCS',
      metaDescription: 'Aprenda a crear fichas imprimibles que se vendan. Técnicas de diseño, estrategias de producto y optimización para Etsy, Amazon KDP y Hotmart. Guía práctica.',
    },
    hero: {
      title: 'Cómo Crear Fichas Imprimibles Que Se Vendan',
      tagline: 'Las técnicas que separan los imprimibles que acumulan polvo de los que generan ventas constantes',
      description: 'Crear fichas imprimibles es fácil. Crear fichas que los compradores realmente quieran comprar requiere entender qué buscan, cómo toman decisiones de compra y qué elementos visuales y pedagógicos generan confianza a primera vista. Esta guía cubre las técnicas de diseño, estructura de producto y optimización visual que transforman fichas genéricas en productos que se venden de forma constante en Etsy, Amazon KDP y Hotmart. Aprenderá a identificar lo que funciona en su nicho, crear diferenciación real y producir imprimibles profesionales con los generadores de fichas. Cada generador ofrece una prueba gratis con marca de agua.',
    },
  },
  {
    file: 'printable-business-blueprint.ts',
    seo: {
      primaryKeyword: 'plan de negocio de imprimibles de idea a ingreso',
      secondaryKeywords: [
        'plan estratégico negocio imprimibles educativos',
        'hoja de ruta negocio de fichas imprimibles',
        'blueprint negocio de imprimibles paso a paso',
        'estrategia de negocio imprimibles rentable',
      ],
      lsiKeywords: [
        'planificación financiera negocio imprimibles',
        'modelo de negocio escalable fichas digitales',
        'cronograma de lanzamiento tienda imprimibles',
      ],
      titleTag: 'Plan de negocio: imprimibles | LCS',
      metaDescription: 'Plan de negocio de imprimibles de la idea al ingreso. Hoja de ruta paso a paso con cronograma, presupuesto y estrategia para vender fichas en Etsy y Hotmart.',
    },
    hero: {
      title: 'Plan de Negocio de Imprimibles: De la Idea al Ingreso',
      tagline: 'Su hoja de ruta completa con cronograma, presupuesto y metas medibles para los primeros 90 días',
      description: 'Un negocio de imprimibles sin plan es un pasatiempo. Esta guía le proporciona un plan de negocio estructurado con cronograma semana a semana, presupuesto realista, metas medibles y estrategia de crecimiento para transformar la idea de vender fichas educativas en un negocio que genere ingresos reales en 90 días. Cubriremos la selección de nicho con datos, la inversión mínima necesaria, la planificación de catálogo y la estrategia de plataformas para Etsy, Amazon KDP y Hotmart. Cada generador de fichas mencionado ofrece una prueba gratis con marca de agua para que comience sin riesgo.',
    },
  },
  {
    file: 'etsy-printable-business.ts',
    seo: {
      primaryKeyword: 'masterclass negocio Etsy imprimibles',
      secondaryKeywords: [
        'cómo vender imprimibles en Etsy guía completa',
        'tienda Etsy de fichas educativas paso a paso',
        'optimizar listados Etsy imprimibles educativos',
        'SEO Etsy para vendedores de fichas',
      ],
      lsiKeywords: [
        'algoritmo de búsqueda Etsy imprimibles',
        'fotografía de producto fichas Etsy',
        'estrategia de tags Etsy vendedores educativos',
      ],
      titleTag: 'Masterclass Etsy imprimibles | LCS',
      metaDescription: 'Masterclass para vender imprimibles en Etsy. SEO, optimización de listados, estrategia de precios y tácticas de visibilidad para fichas educativas.',
    },
    hero: {
      title: 'Masterclass: Negocio de Imprimibles en Etsy',
      tagline: 'SEO, listados optimizados y estrategias de visibilidad que funcionan para vendedores de fichas educativas',
      description: 'Etsy es el marketplace más grande del mundo para descargas digitales y el punto de entrada natural para vendedores de imprimibles educativos. Pero publicar un producto no garantiza ventas. Esta masterclass cubre las técnicas específicas de SEO, optimización de listados, estrategia de precios, fotografía de producto y tácticas de visibilidad que separan las tiendas de fichas que generan ingresos constantes de las que permanecen invisibles. Aprenderá a dominar el algoritmo de búsqueda de Etsy, crear listados que conviertan y construir una tienda de imprimibles rentable. Cada generador ofrece una prueba gratis con marca de agua.',
    },
  },
  {
    file: 'amazon-kdp-activity-books.ts',
    seo: {
      primaryKeyword: 'negocio de cuadernillos Amazon KDP guía',
      secondaryKeywords: [
        'publicar libros de actividades Amazon KDP',
        'cómo vender cuadernillos en Amazon KDP',
        'negocio de libros educativos KDP paso a paso',
        'crear libros de fichas para Amazon',
      ],
      lsiKeywords: [
        'formato interior KDP libros de actividades',
        'portada de cuadernillos Amazon vendedores',
        'categorías y palabras clave KDP educativos',
      ],
      titleTag: 'Negocio cuadernillos Amazon KDP | LCS',
      metaDescription: 'Guía para publicar cuadernillos de actividades en Amazon KDP. Formato, portada, categorías y estrategia de palabras clave para libros educativos impresos.',
    },
    hero: {
      title: 'Negocio de Cuadernillos de Actividades en Amazon KDP',
      tagline: 'Publique libros de actividades impresos bajo demanda sin inventario, almacén ni envíos',
      description: 'Amazon KDP permite publicar libros de actividades y cuadernillos educativos en formato impreso bajo demanda, accediendo a la base de compradores más grande del mundo sin inversión en inventario. Esta guía cubre el proceso completo: desde el formato interior con fichas generadas profesionalmente, el diseño de portada, la selección de categorías y palabras clave, hasta las estrategias de precios y promoción que funcionan para libros educativos en Amazon. Aprenderá a transformar las fichas creadas con los generadores de LessonCraftStudio en cuadernillos de actividades vendibles. Cada generador ofrece una prueba gratis con marca de agua.',
    },
  },
  {
    file: 'create-multilingual-worksheets.ts',
    seo: {
      primaryKeyword: 'crear fichas multilingües para vender',
      secondaryKeywords: [
        'negocio de imprimibles en varios idiomas',
        'fichas bilingües para vender en Etsy',
        'imprimibles multilingües mercado global',
        'vender fichas educativas en múltiples idiomas',
      ],
      lsiKeywords: [
        'generador de fichas multiidioma vendedores',
        'imprimibles en 11 idiomas negocio',
        'mercado global de fichas educativas',
      ],
      titleTag: 'Fichas multilingües para vender | LCS',
      metaDescription: 'Cómo crear fichas multilingües para vender globalmente. Imprimibles en 11 idiomas para Etsy, Amazon KDP y Hotmart. Multiplique su mercado sin esfuerzo extra.',
    },
    hero: {
      title: 'Crear Fichas Multilingües para Vender Globalmente',
      tagline: 'Multiplique su mercado potencial por 11 con fichas en varios idiomas generadas automáticamente',
      description: 'La mayoría de vendedores de imprimibles se limitan a un solo idioma, ignorando el 85% del mercado global. Los generadores de LessonCraftStudio soportan 11 idiomas — inglés, alemán, francés, español, portugués, italiano, neerlandés, sueco, danés, noruego y finés — permitiendo crear fichas multilingües con el mismo esfuerzo que una versión monolingüe. Esta guía cubre la estrategia de mercados por idioma, la optimización de listados en cada plataforma y las tácticas de posicionamiento para construir un catálogo multilingüe rentable en Etsy, Amazon KDP y Hotmart. Cada generador ofrece una prueba gratis con marca de agua.',
    },
  },
  {
    file: 'commercial-license-guide.ts',
    seo: {
      primaryKeyword: 'licencia comercial para vendedores de imprimibles',
      secondaryKeywords: [
        'qué cubre una licencia comercial de fichas',
        'licencia de uso comercial imprimibles educativos',
        'permisos de reventa imprimibles generados',
        'licencia comercial vs personal imprimibles',
      ],
      lsiKeywords: [
        'derechos de reventa fichas generadas',
        'términos de licencia imprimibles Etsy',
        'uso comercial generadores de fichas',
      ],
      titleTag: 'Licencia comercial para vendedores | LCS',
      metaDescription: 'Guía de licencia comercial para vendedores de imprimibles. Qué cubre, qué permite y cómo usarla para vender fichas en Etsy, Amazon KDP y Hotmart legalmente.',
    },
    hero: {
      title: 'Licencia Comercial para Vendedores de Imprimibles',
      tagline: 'Todo lo que necesita saber sobre los permisos de uso comercial para vender fichas generadas',
      description: 'La licencia comercial es el fundamento legal de su negocio de imprimibles. Sin ella, no puede vender legalmente las fichas que genera. Esta guía explica con claridad qué cubre la licencia comercial de LessonCraftStudio, qué plataformas permite, cuántas copias puede vender, qué modificaciones puede hacer y qué restricciones aplican. Cubriremos la diferencia entre licencia personal y comercial, los derechos específicos de reventa en Etsy, Amazon KDP y Hotmart, y las preguntas más frecuentes de los vendedores. Cada generador ofrece una prueba gratis con marca de agua para evaluar la calidad antes de invertir en la licencia.',
    },
  },
  {
    file: 'printable-business-income.ts',
    seo: {
      primaryKeyword: 'cuánto se puede ganar vendiendo imprimibles',
      secondaryKeywords: [
        'ingresos realistas negocio de imprimibles',
        'cuánto gana un vendedor de fichas en Etsy',
        'potencial de ingresos imprimibles educativos',
        'rentabilidad negocio de fichas imprimibles',
      ],
      lsiKeywords: [
        'margen de beneficio fichas digitales vendedores',
        'ingresos pasivos imprimibles educativos',
        'escalabilidad negocio descargas digitales',
      ],
      titleTag: 'Cuánto ganar vendiendo imprimibles | LCS',
      metaDescription: 'Cuánto se puede ganar vendiendo imprimibles. Análisis realista de ingresos, márgenes y factores de crecimiento para negocios de fichas en Etsy y Amazon KDP.',
    },
    hero: {
      title: 'Cuánto Se Puede Ganar Vendiendo Imprimibles',
      tagline: 'Análisis realista de ingresos, márgenes y factores de crecimiento — sin promesas infladas',
      description: 'La pregunta más común de los nuevos vendedores de imprimibles es cuánto pueden ganar. La respuesta honesta depende de múltiples factores: nicho elegido, tamaño del catálogo, calidad de los productos, optimización de listados y consistencia de producción. Esta guía presenta un análisis realista de los rangos de ingresos en cada etapa del negocio, los márgenes de beneficio reales descontando comisiones de plataforma, y los factores que determinan la velocidad de crecimiento. Sin promesas infladas ni cifras inventadas — solo datos prácticos para planificar su negocio de imprimibles. Cada generador ofrece una prueba gratis con marca de agua.',
    },
  },
  {
    file: 'tools-for-printable-business.ts',
    seo: {
      primaryKeyword: 'herramientas esenciales negocio de imprimibles',
      secondaryKeywords: [
        'software para crear imprimibles educativos',
        'herramientas para vendedores de fichas',
        'generadores de fichas para negocio',
        'kit de herramientas vendedor de imprimibles',
      ],
      lsiKeywords: [
        'comparativa generadores de fichas vendedores',
        'herramientas de diseño imprimibles profesionales',
        'software de productividad negocio digital',
      ],
      titleTag: 'Herramientas para negocio imprimibles | LCS',
      metaDescription: 'Herramientas esenciales para un negocio de imprimibles. Generadores de fichas, software de diseño y plataformas de venta comparadas para vendedores educativos.',
    },
    hero: {
      title: 'Herramientas Esenciales para un Negocio de Imprimibles',
      tagline: 'El kit completo de software, generadores y plataformas que necesita para producir y vender fichas',
      description: 'Las herramientas correctas marcan la diferencia entre producir una ficha por hora y producir veinte. Esta guía cubre el ecosistema completo de herramientas para vendedores de imprimibles: generadores de fichas para producción rápida, software de diseño para personalización, plataformas de venta para distribución, y herramientas de productividad para gestionar el negocio eficientemente. Compararemos opciones en cada categoría con sus ventajas, limitaciones y precios para que tome decisiones informadas. LessonCraftStudio ofrece 33 generadores especializados — cada uno con prueba gratis con marca de agua para evaluar la calidad.',
    },
  },
  {
    file: 'marketing-printable-business.ts',
    seo: {
      primaryKeyword: 'promocionar negocio de imprimibles en línea',
      secondaryKeywords: [
        'marketing para vendedores de fichas educativas',
        'cómo promocionar imprimibles en redes sociales',
        'estrategia de marketing negocio imprimibles',
        'atraer compradores a tienda de imprimibles',
      ],
      lsiKeywords: [
        'Pinterest marketing imprimibles educativos',
        'email marketing vendedores de fichas',
        'SEO para tiendas de imprimibles Etsy',
      ],
      titleTag: 'Promocionar negocio de imprimibles | LCS',
      metaDescription: 'Cómo promocionar un negocio de imprimibles en línea. Estrategias de Pinterest, email marketing y SEO para atraer compradores a su tienda de fichas educativas.',
    },
    hero: {
      title: 'Cómo Promocionar un Negocio de Imprimibles en Línea',
      tagline: 'Estrategias de marketing que funcionan para vendedores de fichas educativas — sin presupuesto de publicidad',
      description: 'Crear productos excelentes es solo la mitad del negocio. Sin una estrategia de marketing efectiva, incluso las mejores fichas permanecen invisibles. Esta guía cubre las tácticas de promoción que funcionan específicamente para vendedores de imprimibles educativos: Pinterest como motor de tráfico visual, email marketing para construir audiencia, SEO en marketplaces para visibilidad orgánica, redes sociales para construcción de marca y colaboraciones estratégicas para amplificar el alcance. Aprenderá a implementar cada canal sin necesidad de presupuesto publicitario. Cada generador de fichas ofrece una prueba gratis con marca de agua.',
    },
  },
  {
    file: 'scaling-printable-business.ts',
    seo: {
      primaryKeyword: 'de ingreso extra a negocio de imprimibles a tiempo completo',
      secondaryKeywords: [
        'escalar negocio de imprimibles educativos',
        'cómo crecer un negocio de fichas imprimibles',
        'de hobby a negocio completo imprimibles',
        'automatizar negocio de fichas digitales',
      ],
      lsiKeywords: [
        'delegación y automatización negocio imprimibles',
        'múltiples canales de venta fichas educativas',
        'ingresos a tiempo completo con imprimibles',
      ],
      titleTag: 'De ingreso extra a negocio completo | LCS',
      metaDescription: 'Cómo escalar de un ingreso extra a un negocio de imprimibles a tiempo completo. Automatización, múltiples canales y estrategias de crecimiento para vendedores.',
    },
    hero: {
      title: 'De Ingreso Extra a Negocio de Imprimibles a Tiempo Completo',
      tagline: 'El camino probado para escalar de las primeras ventas a un negocio que reemplace su sueldo',
      description: 'Muchos vendedores de imprimibles comienzan como un proyecto secundario y se preguntan si es posible convertirlo en su fuente principal de ingresos. La respuesta es sí, pero requiere una estrategia deliberada de escalamiento que va más allá de crear más productos. Esta guía cubre la transición de ingreso extra a negocio a tiempo completo: automatización de procesos, expansión a múltiples canales de venta, diversificación de productos, delegación de tareas y gestión financiera para sostener el crecimiento. Aprenderá el cronograma realista y los hitos clave de cada etapa. Cada generador ofrece una prueba gratis con marca de agua.',
    },
  },
  {
    file: 'printable-business-legal.ts',
    seo: {
      primaryKeyword: 'aspectos legales negocio de imprimibles',
      secondaryKeywords: [
        'requisitos legales vender imprimibles en línea',
        'impuestos negocio de fichas digitales',
        'regulaciones para vendedores de imprimibles',
        'aspectos fiscales negocio de descargas digitales',
      ],
      lsiKeywords: [
        'IVA productos digitales vendedores España',
        'obligaciones fiscales Etsy vendedores LATAM',
        'protección de propiedad intelectual imprimibles',
      ],
      titleTag: 'Negocio de imprimibles: legales | LCS',
      metaDescription: 'Aspectos legales de un negocio de imprimibles. Impuestos, regulaciones y propiedad intelectual para vendedores en España y Latinoamérica. Consulte un profesional.',
    },
    hero: {
      title: 'Aspectos Legales de un Negocio de Imprimibles',
      tagline: 'Impuestos, regulaciones y propiedad intelectual — lo que todo vendedor de imprimibles debe conocer',
      description: 'Los aspectos legales de un negocio de imprimibles varían significativamente según el país. En España necesitará darse de alta como autónomo y aplicar el IVA del 21%. En México deberá registrarse en el SAT con RFC bajo el régimen RESICO. En Argentina corresponde el monotributo. En Colombia necesitará el RUT. Esta guía cubre los temas legales más importantes para vendedores de imprimibles — impuestos sobre productos digitales, propiedad intelectual, términos de uso y protección de contenido — sin dar asesoramiento legal específico. Consulte siempre un profesional local para su situación particular. Cada generador ofrece una prueba gratis con marca de agua.',
    },
  },
];

let updated = 0;
let errors = [];

for (const item of updates) {
  const filePath = path.join(BASE, item.file);

  if (!fs.existsSync(filePath)) {
    errors.push(`NOT FOUND: ${item.file}`);
    continue;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // Replace SEO block
  const seoRegex = /seo:\s*\{[^}]*(?:\{[^}]*\}[^}]*)*\}/;
  const seoBlock = `seo: {
    primaryKeyword: '${item.seo.primaryKeyword.replace(/'/g, "\\'")}',
    secondaryKeywords: [
      '${item.seo.secondaryKeywords.map(k => k.replace(/'/g, "\\'")).join("',\n      '")}',
    ],
    lsiKeywords: [
      '${item.seo.lsiKeywords.map(k => k.replace(/'/g, "\\'")).join("',\n      '")}',
    ],
    titleTag: '${item.seo.titleTag.replace(/'/g, "\\'")}',
    metaDescription: '${item.seo.metaDescription.replace(/'/g, "\\'")}',
  }`;

  if (seoRegex.test(content)) {
    content = content.replace(seoRegex, seoBlock);
  } else {
    errors.push(`SEO REGEX FAILED: ${item.file}`);
    continue;
  }

  // Replace hero block (start content has title + tagline + description)
  const heroRegex = /hero:\s*\{[^}]*\}/;
  const heroBlock = `hero: {
    title: '${item.hero.title.replace(/'/g, "\\'")}',
    tagline: '${item.hero.tagline.replace(/'/g, "\\'")}',
    description: '${item.hero.description.replace(/'/g, "\\'")}',
  }`;

  if (heroRegex.test(content)) {
    content = content.replace(heroRegex, heroBlock);
  } else {
    errors.push(`HERO REGEX FAILED: ${item.file}`);
    continue;
  }

  // Replace Gumroad with Hotmart
  content = content.replace(/\bGumroad\b/g, 'Hotmart');

  fs.writeFileSync(filePath, content, 'utf8');
  updated++;
  console.log(`OK: ${item.file} — titleTag: ${item.seo.titleTag} (${item.seo.titleTag.length} chars)`);
}

console.log(`\nDone: ${updated} updated, ${errors.length} errors`);
if (errors.length > 0) {
  console.log('ERRORS:');
  errors.forEach(e => console.log(`  - ${e}`));
}
