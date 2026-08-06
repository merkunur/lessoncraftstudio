const fs = require('fs');
const path = require('path');
const BASE = path.join(__dirname, '..', 'frontend', 'config', 'guide-content', 'es');

function esc(s) { return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'"); }
function replaceField(content, fieldName, newValue) {
  const re = new RegExp(`(${fieldName}:\\s*)(['"])(?:[^'"\\\\]|\\\\.)*\\2`);
  if (re.test(content)) return content.replace(re, `$1'${esc(newValue)}'`);
  const re2 = new RegExp(`(${fieldName}:\\s*\\n\\s*)(['"])(?:[^'"\\\\]|\\\\.)*\\2`);
  if (re2.test(content)) return content.replace(re2, `$1'${esc(newValue)}'`);
  console.warn(`  WARNING: Could not find field ${fieldName}`); return content;
}
function replaceArrayField(content, fieldName, newValues) {
  const re = new RegExp(`(${fieldName}:\\s*)\\[[\\s\\S]*?\\]`);
  if (re.test(content)) {
    const formatted = newValues.map(v => `      '${esc(v)}',`).join('\n');
    return content.replace(re, `$1[\n${formatted}\n    ]`);
  }
  console.warn(`  WARNING: Could not find array field ${fieldName}`); return content;
}
function replaceHeroTitle(content, newTitle) {
  const re = /(hero:\s*\{[\s\S]*?title:\s*)(['"])(?:[^'"\\]|\\.)*\2/;
  if (re.test(content)) return content.replace(re, `$1'${esc(newTitle)}'`);
  return content;
}
function replaceHeroDescription(content, newDesc) {
  const re = /(hero:\s*\{[\s\S]*?title:[\s\S]*?description:\s*\n?\s*)(['"])(?:[^'"\\]|\\.)*\2/;
  if (re.test(content)) return content.replace(re, `$1'${esc(newDesc)}'`);
  const re2 = /(tagline:[\s\S]*?description:\s*\n?\s*)(['"])(?:[^'"\\]|\\.)*\2/;
  if (re2.test(content)) return content.replace(re2, `$1'${esc(newDesc)}'`);
  console.warn('  WARNING: Could not replace hero description'); return content;
}

const updates = [
  {
    file: 'create-worksheet-bundles.ts',
    primaryKeyword: 'crear paquetes de fichas que se vendan',
    secondaryKeywords: [
      'estrategia de bundling fichas imprimibles',
      'cómo agrupar fichas para vender más',
      'paquetes de fichas para Etsy y KDP',
      'bundling de productos educativos imprimibles',
    ],
    lsiKeywords: [
      'apilamiento de valor precio de anclaje descuento por volumen',
      'packaging profesional tabla de contenidos portada paquete',
      'venta cruzada upsell catálogo complementario imprimibles',
    ],
    titleTag: 'Crear paquetes de fichas que se vendan | LCS',
    metaDescription: 'Aprenda a crear paquetes de fichas que se vendan en Etsy, KDP y Hotmart. Bundling, precios de anclaje y packaging profesional para más ingresos.',
    heroTitle: 'Cómo crear paquetes de fichas que multipliquen sus ventas',
    heroDescription: 'Los paquetes de fichas son la forma más efectiva de aumentar el valor medio por pedido sin crear contenido nuevo. Un paquete bien estructurado transforma productos individuales en una oferta irresistible que los compradores perciben como mejor inversión. Esta guía le muestra la estrategia completa de bundling: qué agrupar, cómo fijar precios con anclaje psicológico y cómo presentar sus paquetes de forma profesional. Aplique estos principios en Etsy, Amazon KDP, Hotmart o cualquier marketplace donde venda. El mercado hispanohablante ofrece oportunidades únicas para vendedores que dominan el arte del bundling estratégico.',
  },
  {
    file: 'niche-selection-printables.ts',
    primaryKeyword: 'elegir nicho para negocio de imprimibles 2026',
    secondaryKeywords: [
      'selección de nicho imprimibles rentables',
      'cómo elegir nicho para vender fichas',
      'nichos de imprimibles con demanda 2026',
      'validar nicho de productos educativos',
    ],
    lsiKeywords: [
      'análisis de competencia demanda de mercado volumen de búsqueda',
      'nicho perenne nicho estacional público objetivo',
      'ajuste producto-mercado expansión de nicho segmentación',
    ],
    titleTag: 'Elegir nicho de imprimibles (2026) | LCS',
    metaDescription: 'Descubra cómo elegir un nicho rentable para su negocio de imprimibles en 2026. Marco de validación para Etsy, KDP y Hotmart con análisis de demanda real.',
    heroTitle: 'Cómo elegir el nicho perfecto para su negocio de imprimibles',
    heroDescription: 'La selección de nicho es la decisión más importante que tomará como vendedor de imprimibles. Un nicho bien elegido determina su audiencia, su poder de fijación de precios y su potencial de crecimiento a largo plazo. Esta guía le ofrece un marco sistemático para evaluar, validar y elegir su nicho de imprimibles en 2026. Aprenda a investigar la demanda real, analizar la competencia y evaluar la rentabilidad antes de comprometerse. Funciona para Etsy, Amazon KDP, Hotmart y cualquier plataforma. El mercado hispano tiene nichos desatendidos que representan oportunidades reales para nuevos vendedores.',
  },
  {
    file: 'create-printable-product-line.ts',
    primaryKeyword: 'crear una línea de productos imprimibles',
    secondaryKeywords: [
      'línea de productos educativos para vender',
      'construir catálogo de imprimibles paso a paso',
      'estrategia de producto para negocio de fichas',
      'planificar línea de imprimibles rentable',
    ],
    lsiKeywords: [
      'cohesión de catálogo branding de producto línea visual',
      'expansión de producto escalabilidad serie temática',
      'posicionamiento de marca diferenciación productos digitales',
    ],
    titleTag: 'Crear línea de productos imprimibles | LCS',
    metaDescription: 'Cree una línea de productos imprimibles cohesiva y rentable. Estrategia de catálogo paso a paso para Etsy, KDP y Hotmart con branding profesional.',
    heroTitle: 'Construya una línea de productos imprimibles que genere ingresos',
    heroDescription: 'Una línea de productos imprimibles cohesiva vende más que productos sueltos sin conexión. Cuando sus fichas comparten identidad visual, cubren necesidades complementarias y se refuerzan mutuamente, cada nuevo producto fortalece todo su catálogo. Esta guía le muestra cómo planificar, construir y escalar una línea de productos imprimibles profesional desde cero. Descubra la estrategia de catálogo que funciona en Etsy, Amazon KDP y Hotmart. El mercado hispanohablante está creciendo rápidamente y los vendedores con líneas cohesivas capturan la mayor parte de las ventas recurrentes.',
  },
  {
    file: 'pricing-educational-printables.ts',
    primaryKeyword: 'estrategia de precios para fichas educativas',
    secondaryKeywords: [
      'cómo fijar precios de fichas imprimibles',
      'precios de imprimibles educativos 2026',
      'psicología de precios productos digitales',
      'pricing para fichas en Etsy y KDP',
    ],
    lsiKeywords: [
      'precio de anclaje descuento por volumen valor percibido',
      'márgenes de beneficio coste por página punto de precio',
      'precios escalonados pruebas de precio conversión ventas',
    ],
    titleTag: 'Precios para fichas educativas | LCS',
    metaDescription: 'Descubra la estrategia de precios para fichas educativas que maximiza ingresos. Pricing escalonado para Etsy, KDP y Hotmart en 2026.',
    heroTitle: 'Estrategia de precios que maximiza sus ingresos por fichas',
    heroDescription: 'Fijar el precio correcto para sus fichas educativas es la diferencia entre un negocio rentable y uno que apenas sobrevive. Un precio demasiado bajo devalúa su trabajo; demasiado alto reduce las conversiones. Esta guía le enseña la psicología de precios aplicada a productos imprimibles educativos: anclaje, precios escalonados, pruebas A/B y estrategias específicas por plataforma. Aprenda a fijar precios que funcionen en Etsy, Amazon KDP y Hotmart. El mercado hispanohablante tiene dinámicas de precio propias que debe entender para maximizar cada venta.',
  },
  {
    file: 'scale-printable-business-guide.ts',
    primaryKeyword: 'escalar su negocio de imprimibles guía',
    secondaryKeywords: [
      'cómo escalar negocio de fichas educativas',
      'crecer negocio de imprimibles paso a paso',
      'estrategia de escalabilidad productos digitales',
      'escalar ventas de imprimibles multiplataforma',
    ],
    lsiKeywords: [
      'automatización de procesos delegación subcontratación',
      'expansión multicanal crecimiento sostenible sistemas',
      'eficiencia operativa flujos de trabajo escalabilidad',
    ],
    titleTag: 'Escalar su negocio de imprimibles | LCS',
    metaDescription: 'Aprenda a escalar su negocio de imprimibles con sistemas y automatización. Guía paso a paso para crecer en Etsy, KDP y Hotmart sin trabajar más horas.',
    heroTitle: 'Escale su negocio de imprimibles sin trabajar más horas',
    heroDescription: 'Escalar un negocio de imprimibles no significa crear más productos más rápido. Significa construir sistemas que multipliquen el impacto de cada hora que invierte. Esta guía le muestra cómo pasar de vendedor individual a empresario con procesos escalables: automatización, expansión multiplataforma, delegación estratégica y optimización de catálogo. Descubra cómo los vendedores exitosos en Etsy, Amazon KDP y Hotmart escalan sus operaciones. El mercado hispanohablante ofrece una ventaja competitiva enorme para quienes construyen sistemas de crecimiento desde el principio.',
  },
  {
    file: 'passive-income-worksheets.ts',
    primaryKeyword: 'ingresos pasivos con fichas educativas 2026',
    secondaryKeywords: [
      'ganar dinero vendiendo fichas imprimibles',
      'ingresos recurrentes con imprimibles educativos',
      'negocio de fichas ingresos pasivos',
      'monetizar fichas de ejercicios 2026',
    ],
    lsiKeywords: [
      'producto digital perenne catálogo compuesto regalías',
      'distribución multiplataforma automatización de ventas',
      'ingresos escalables coste marginal cero productos digitales',
    ],
    titleTag: 'Ingresos pasivos con fichas (2026) | LCS',
    metaDescription: 'Construya ingresos pasivos con fichas educativas en 2026. Catálogo perenne, distribución en Etsy, KDP y Hotmart, y efectos compuestos para ganar más.',
    heroTitle: 'Genere ingresos pasivos con fichas educativas en 2026',
    heroDescription: 'Cada ficha que crea sigue generando ingresos mucho después de que el esfuerzo inicial se haya completado. A diferencia de los servicios donde intercambia horas por dinero, un paquete de fichas puede venderse miles de veces en múltiples plataformas sin trabajo adicional. Esta guía le muestra cómo construir un negocio de fichas diseñado para ingresos recurrentes y compuestos. Aprenda la estrategia de catálogo perenne que funciona en Etsy, Amazon KDP y Hotmart. El mercado hispanohablante representa una oportunidad masiva con menos competencia y demanda creciente.',
  },
  {
    file: 'understanding-commercial-licenses.ts',
    primaryKeyword: 'licencia comercial para vendedores de imprimibles',
    secondaryKeywords: [
      'tipos de licencia para productos digitales',
      'licencia comercial imprimibles educativos',
      'derechos de uso comercial fichas',
      'licenciamiento de contenido imprimible',
    ],
    lsiKeywords: [
      'uso personal uso comercial derechos de reventa',
      'términos de licencia protección legal propiedad intelectual',
      'licencia extendida restricciones de uso distribución',
    ],
    titleTag: 'Licencia comercial para vendedores | LCS',
    metaDescription: 'Entienda las licencias comerciales para vendedores de imprimibles. Tipos de licencia, derechos de uso y protección legal para Etsy, KDP y Hotmart en 2026.',
    heroTitle: 'Licencias comerciales: lo que todo vendedor debe saber',
    heroDescription: 'Las licencias comerciales determinan qué puede hacer legalmente con los imprimibles que crea y vende. Entender los diferentes tipos de licencia protege su negocio y aumenta la confianza de sus compradores. Esta guía explica los tipos de licencia más comunes, cómo estructurar sus propios términos y qué derechos otorgar a sus clientes. Aprenda las mejores prácticas para Etsy, Amazon KDP y Hotmart. El mercado hispanohablante tiene particularidades legales que debe considerar para proteger su negocio de imprimibles en varios países.',
  },
  {
    file: 'research-profitable-niches.ts',
    primaryKeyword: 'encontrar nichos rentables de imprimibles',
    secondaryKeywords: [
      'investigación de nichos productos digitales',
      'nichos rentables fichas educativas 2026',
      'cómo encontrar nicho de imprimibles con demanda',
      'análisis de mercado para vendedores de fichas',
    ],
    lsiKeywords: [
      'volumen de búsqueda tendencias de mercado demanda estacional',
      'análisis competitivo brechas de mercado oportunidad',
      'validación de nicho señales de demanda palabras clave',
    ],
    titleTag: 'Nichos rentables de imprimibles | LCS',
    metaDescription: 'Encuentre nichos rentables de imprimibles con métodos probados de investigación. Análisis de demanda y competencia para Etsy, KDP y Hotmart en 2026.',
    heroTitle: 'Cómo encontrar nichos rentables para su negocio de imprimibles',
    heroDescription: 'Los vendedores más exitosos de imprimibles no adivinan qué crear: investigan la demanda real antes de producir. Esta guía le enseña métodos probados para encontrar nichos rentables de imprimibles con demanda sostenida y competencia manejable. Descubra cómo analizar tendencias, evaluar el volumen de búsqueda y identificar brechas de mercado que representan oportunidades reales. Aplique estas técnicas en Etsy, Amazon KDP y Hotmart. El mercado hispanohablante tiene nichos desatendidos con alta demanda que pocos vendedores están cubriendo actualmente.',
  },
  {
    file: 'multilingual-printable-business.ts',
    primaryKeyword: 'negocio de imprimibles multilingüe',
    secondaryKeywords: [
      'vender imprimibles en varios idiomas',
      'expandir negocio fichas a otros mercados',
      'imprimibles multilingüe estrategia de mercado',
      'negocio de fichas internacional multiplataforma',
    ],
    lsiKeywords: [
      'localización traducción adaptación cultural mercados',
      'expansión internacional demanda por idioma mercados emergentes',
      'catálogo multilingüe optimización SEO por idioma',
    ],
    titleTag: 'Negocio de imprimibles multilingüe | LCS',
    metaDescription: 'Expanda su negocio de imprimibles a múltiples idiomas y mercados. Estrategia de localización para Etsy, KDP y Hotmart con máximo alcance internacional.',
    heroTitle: 'Expanda su negocio de imprimibles a múltiples idiomas',
    heroDescription: 'Cada idioma que añade a su catálogo de imprimibles multiplica su mercado potencial sin crear contenido desde cero. La expansión multilingüe es la estrategia de crecimiento más eficiente para vendedores de productos digitales educativos. Esta guía le muestra cómo localizar sus fichas para nuevos mercados, adaptar el contenido culturalmente y optimizar sus listados por idioma. Descubra la estrategia que funciona en Etsy, Amazon KDP y Hotmart. El mercado hispanohablante abarca más de 20 países con demanda creciente de imprimibles educativos de calidad.',
  },
  {
    file: 'worksheets-multiple-languages.ts',
    primaryKeyword: 'crear fichas en varios idiomas para vender',
    secondaryKeywords: [
      'fichas multilingüe para vendedores',
      'crear imprimibles en múltiples idiomas',
      'expandir fichas educativas a otros idiomas',
      'producción de fichas multilingüe eficiente',
    ],
    lsiKeywords: [
      'traducción de fichas adaptación lingüística localización',
      'flujo de trabajo multilingüe eficiencia producción',
      'demanda por idioma mercados educativos internacionales',
    ],
    titleTag: 'Fichas en varios idiomas para vender | LCS',
    metaDescription: 'Aprenda a crear fichas en varios idiomas para multiplicar sus ventas. Flujo de trabajo eficiente para Etsy, KDP y Hotmart con adaptación cultural correcta.',
    heroTitle: 'Cómo crear fichas en varios idiomas y multiplicar ventas',
    heroDescription: 'Crear fichas en varios idiomas es la forma más rápida de multiplicar su catálogo y sus ingresos. Cada versión lingüística de un producto que ya funciona le abre un mercado completamente nuevo con trabajo mínimo. Esta guía le enseña el flujo de trabajo eficiente para producir fichas multilingüe: desde la traducción correcta hasta la adaptación cultural y la optimización de listados por idioma. Descubra cómo vender en Etsy, Amazon KDP y Hotmart en múltiples mercados. El mercado hispanohablante es especialmente atractivo por su tamaño y la escasez de imprimibles educativos de calidad.',
  },
  {
    file: 'copyright-printable-sellers.ts',
    primaryKeyword: 'derechos de autor para vendedores de imprimibles',
    secondaryKeywords: [
      'proteger imprimibles con derechos de autor',
      'copyright para productos digitales educativos',
      'protección legal fichas imprimibles',
      'derechos de propiedad intelectual imprimibles',
    ],
    lsiKeywords: [
      'registro de copyright infracción piratería digital',
      'marca registrada protección de diseño DMCA',
      'términos de uso licencia propiedad intelectual vendedores',
    ],
    titleTag: 'Derechos de autor para vendedores | LCS',
    metaDescription: 'Proteja sus imprimibles con derechos de autor. Guía legal para vendedores en Etsy, KDP y Hotmart: registro, piratería y protección de diseños.',
    heroTitle: 'Proteja sus imprimibles: derechos de autor para vendedores',
    heroDescription: 'Sus imprimibles son propiedad intelectual con valor real y merecen protección legal adecuada. Entender los derechos de autor le permite proteger su trabajo, actuar contra la piratería y establecer términos claros para sus compradores. Esta guía cubre todo lo que un vendedor de imprimibles necesita saber sobre copyright: desde la protección automática hasta el registro formal y las acciones contra infracciones. Aprenda las mejores prácticas para Etsy, Amazon KDP y Hotmart. El mercado hispanohablante abarca múltiples jurisdicciones legales que debe considerar para una protección completa.',
  },
  {
    file: 'customer-support-digital-products.ts',
    primaryKeyword: 'atención al cliente para productos digitales',
    secondaryKeywords: [
      'soporte al cliente imprimibles educativos',
      'gestionar consultas de compradores fichas',
      'servicio postventa productos digitales',
      'atención al cliente vendedores de imprimibles',
    ],
    lsiKeywords: [
      'FAQ preguntas frecuentes resolución de problemas',
      'reseñas positivas satisfacción del cliente retención',
      'automatización de soporte plantillas de respuesta eficiencia',
    ],
    titleTag: 'Atención al cliente productos digitales | LCS',
    metaDescription: 'Optimice la atención al cliente para productos digitales. Sistemas de soporte para vendedores en Etsy, KDP y Hotmart que generan reseñas positivas.',
    heroTitle: 'Atención al cliente que genera reseñas y ventas repetidas',
    heroDescription: 'Un buen servicio de atención al cliente transforma compradores únicos en clientes recurrentes y genera las reseñas positivas que impulsan nuevas ventas. Para vendedores de productos digitales, el soporte eficiente es una ventaja competitiva real. Esta guía le muestra cómo construir un sistema de atención al cliente que resuelva problemas rápidamente, reduzca reembolsos y genere valoraciones positivas. Descubra las plantillas y automatizaciones que funcionan en Etsy, Amazon KDP y Hotmart. El mercado hispanohablante valora especialmente la atención personalizada en su idioma.',
  },
  {
    file: 'automate-printable-business.ts',
    primaryKeyword: 'automatizar su negocio de imprimibles',
    secondaryKeywords: [
      'automatización para vendedores de fichas',
      'sistemas automáticos negocio de imprimibles',
      'herramientas de automatización productos digitales',
      'flujos de trabajo automatizados imprimibles',
    ],
    lsiKeywords: [
      'eficiencia operativa herramientas digitales productividad',
      'publicación automática programación de contenido',
      'integración de plataformas APIs flujos automatizados',
    ],
    titleTag: 'Automatizar negocio de imprimibles | LCS',
    metaDescription: 'Automatice su negocio de imprimibles con sistemas probados. Herramientas y flujos de trabajo para Etsy, KDP y Hotmart que le ahorran horas cada semana.',
    heroTitle: 'Automatice su negocio de imprimibles y trabaje menos',
    heroDescription: 'La automatización es lo que separa a los vendedores que trabajan 60 horas semanales de los que ganan más trabajando menos. Cada tarea repetitiva en su negocio de imprimibles puede sistematizarse o automatizarse: desde la creación de productos hasta la publicación, el marketing y la atención al cliente. Esta guía le muestra las herramientas y flujos de trabajo específicos que los vendedores exitosos usan para automatizar sus operaciones. Aplique estos sistemas en Etsy, Amazon KDP y Hotmart. El mercado hispanohablante crece rápido y la automatización le permite capturar esa demanda sin multiplicar sus horas de trabajo.',
  },
  {
    file: 'social-media-printable-marketing.ts',
    primaryKeyword: 'redes sociales para vendedores de imprimibles',
    secondaryKeywords: [
      'marketing en redes sociales imprimibles',
      'promocionar fichas en Instagram y TikTok',
      'estrategia social media productos digitales',
      'redes sociales para negocio de fichas',
    ],
    lsiKeywords: [
      'contenido visual engagement seguidores conversión',
      'calendario editorial hashtags tendencias virales',
      'tráfico orgánico comunidad construcción de audiencia',
    ],
    titleTag: 'Redes sociales para vendedores | LCS',
    metaDescription: 'Domine las redes sociales para vender más imprimibles. Estrategia de Instagram, TikTok y Pinterest para vendedores en Etsy, KDP y Hotmart con resultados.',
    heroTitle: 'Redes sociales que impulsan ventas de imprimibles',
    heroDescription: 'Las redes sociales son el canal de marketing más accesible para vendedores de imprimibles que quieren tráfico sin pagar publicidad. Pero publicar al azar no genera ventas: necesita una estrategia diseñada para convertir seguidores en compradores. Esta guía le enseña cómo usar Instagram, TikTok y Pinterest para promocionar sus fichas educativas de forma efectiva. Descubra qué tipo de contenido genera más engagement y ventas en cada plataforma. Venda en Etsy, Amazon KDP y Hotmart con tráfico social. El mercado hispanohablante es altamente activo en redes sociales, lo que representa una ventaja enorme.',
  },
  {
    file: 'pinterest-marketing-worksheets.ts',
    primaryKeyword: 'marketing en Pinterest para negocio de fichas',
    secondaryKeywords: [
      'Pinterest para vender imprimibles educativos',
      'estrategia de Pinterest vendedores de fichas',
      'pines para promocionar fichas imprimibles',
      'tráfico de Pinterest a tienda de imprimibles',
    ],
    lsiKeywords: [
      'SEO de Pinterest tableros palabras clave pines',
      'tráfico orgánico motor de búsqueda visual descubrimiento',
      'pines ricos descripciones clics conversión ventas',
    ],
    titleTag: 'Pinterest para negocio de fichas | LCS',
    metaDescription: 'Use Pinterest para generar tráfico y ventas de fichas. Estrategia SEO de Pinterest para vendedores en Etsy, KDP y Hotmart con pines que convierten.',
    heroTitle: 'Pinterest: el motor de ventas para su negocio de fichas',
    heroDescription: 'Pinterest es el canal de marketing más poderoso para vendedores de imprimibles porque funciona como motor de búsqueda visual con tráfico permanente. A diferencia de Instagram o TikTok, un pin bien optimizado sigue generando clics y ventas durante meses o años. Esta guía le enseña la estrategia completa de Pinterest para su negocio de fichas: desde la optimización SEO de pines hasta la creación de tableros que atraen compradores. Aplique estas técnicas para vender en Etsy, Amazon KDP y Hotmart. El mercado hispanohablante en Pinterest está creciendo rápidamente con menos competencia.',
  },
  {
    file: 'email-marketing-printables.ts',
    primaryKeyword: 'email marketing para vendedores de imprimibles',
    secondaryKeywords: [
      'lista de correo para negocio de fichas',
      'email marketing productos digitales educativos',
      'construir lista de emails vendedores imprimibles',
      'secuencias de email para vender fichas',
    ],
    lsiKeywords: [
      'lead magnet embudo de ventas automatización email',
      'segmentación tasa de apertura conversión suscriptores',
      'newsletter frecuencia de envío contenido de valor',
    ],
    titleTag: 'Email marketing para vendedores | LCS',
    metaDescription: 'Construya una lista de email que genere ventas de imprimibles. Email marketing para vendedores en Etsy, KDP y Hotmart con secuencias que convierten.',
    heroTitle: 'Email marketing que convierte suscriptores en compradores',
    heroDescription: 'El email marketing es el canal con mayor retorno de inversión para vendedores de imprimibles porque le da acceso directo a compradores interesados sin depender de algoritmos. Una lista de email bien construida genera ventas predecibles cada vez que lanza un producto nuevo. Esta guía le muestra cómo construir su lista desde cero, crear lead magnets irresistibles y diseñar secuencias de email que convierten. Aplique esta estrategia con productos en Etsy, Amazon KDP y Hotmart. El mercado hispanohablante responde especialmente bien al email marketing con contenido de valor.',
  },
  {
    file: 'get-reviews-printable-products.ts',
    primaryKeyword: 'obtener reseñas para productos imprimibles',
    secondaryKeywords: [
      'estrategia para conseguir reseñas imprimibles',
      'más reseñas para fichas educativas',
      'generar valoraciones positivas productos digitales',
      'reseñas de compradores imprimibles marketplace',
    ],
    lsiKeywords: [
      'prueba social confianza del comprador credibilidad',
      'seguimiento postventa solicitud de reseña timing',
      'reseñas verificadas valoraciones estrellas reputación',
    ],
    titleTag: 'Obtener reseñas para imprimibles | LCS',
    metaDescription: 'Consiga más reseñas para sus imprimibles con estrategias éticas. Sistemas de seguimiento para vendedores en Etsy, KDP y Hotmart que generan prueba social.',
    heroTitle: 'Cómo obtener reseñas que impulsen sus ventas de imprimibles',
    heroDescription: 'Las reseñas son el factor de conversión más poderoso en cualquier marketplace de productos digitales. Un producto con reseñas positivas vende significativamente más que uno idéntico sin valoraciones. Esta guía le enseña estrategias éticas y efectivas para obtener más reseñas de sus compradores: desde el seguimiento postventa hasta la experiencia del producto que motiva reseñas espontáneas. Aplique estos sistemas en Etsy, Amazon KDP y Hotmart para construir prueba social rápidamente. El mercado hispanohablante valora las reseñas en su idioma y los primeros vendedores con buenas valoraciones dominan.',
  },
  {
    file: 'seasonal-marketing-printables.ts',
    primaryKeyword: 'marketing estacional para vendedores de imprimibles',
    secondaryKeywords: [
      'calendario de marketing imprimibles por temporada',
      'ventas estacionales fichas educativas',
      'aprovechar temporadas para vender imprimibles',
      'marketing por temporada productos digitales',
    ],
    lsiKeywords: [
      'vuelta al cole Navidad verano temporadas de venta',
      'planificación anticipada calendario editorial tendencias',
      'picos de demanda ciclos de compra estacionalidad',
    ],
    titleTag: 'Marketing estacional para imprimibles | LCS',
    metaDescription: 'Domine el marketing estacional para vender más imprimibles. Calendario completo de temporadas para Etsy, KDP y Hotmart con planificación anticipada.',
    heroTitle: 'Marketing estacional: venda más imprimibles todo el año',
    heroDescription: 'Las temporadas marcan los picos de ventas más importantes para vendedores de imprimibles. Vuelta al cole, Navidad, fin de curso y vacaciones de verano son momentos donde la demanda se multiplica para quien está preparado. Esta guía le muestra el calendario completo de marketing estacional: cuándo crear, cuándo publicar y cómo capitalizar cada temporada para maximizar sus ingresos. Planifique sus ventas en Etsy, Amazon KDP y Hotmart con anticipación. El mercado hispanohablante tiene temporadas propias como el Día de Muertos y la vuelta al cole en febrero.',
  },
  {
    file: 'digital-vs-physical-printables.ts',
    primaryKeyword: 'imprimibles digitales vs físicos comparación',
    secondaryKeywords: [
      'vender imprimibles digitales o físicos',
      'diferencias entre digital y físico imprimibles',
      'modelo de negocio digital versus impresión',
      'comparar formatos de venta imprimibles',
    ],
    lsiKeywords: [
      'coste de producción márgenes logística envío',
      'escalabilidad inventario impresión bajo demanda',
      'experiencia del comprador formato entrega preferencias',
    ],
    titleTag: 'Digitales vs físicos: imprimibles | LCS',
    metaDescription: 'Compare imprimibles digitales vs físicos para su negocio. Márgenes, escalabilidad y modelos de venta para Etsy, KDP y Hotmart con análisis completo.',
    heroTitle: 'Imprimibles digitales vs físicos: cuál conviene más',
    heroDescription: 'Elegir entre vender imprimibles en formato digital o físico determina su modelo de negocio, sus márgenes y su capacidad de escalar. Cada formato tiene ventajas claras según su situación, mercado objetivo y recursos disponibles. Esta guía compara ambos modelos en detalle: costes de producción, márgenes de beneficio, logística, escalabilidad y preferencias del comprador. Descubra qué formato funciona mejor para Etsy, Amazon KDP y Hotmart según su estrategia. El mercado hispanohablante muestra preferencias distintas por formato según el país y el tipo de producto.',
  },
  {
    file: 'quality-standards-worksheets.ts',
    primaryKeyword: 'estándares de calidad para fichas vendibles',
    secondaryKeywords: [
      'calidad profesional fichas imprimibles',
      'estándares de fichas que generan ventas',
      'mejorar calidad de imprimibles educativos',
      'fichas profesionales que se vendan bien',
    ],
    lsiKeywords: [
      'diseño profesional formato legibilidad tipografía',
      'revisión de calidad checklist estándares mínimos',
      'diferenciación por calidad valor percibido premium',
    ],
    titleTag: 'Calidad para fichas que se vendan | LCS',
    metaDescription: 'Establezca estándares de calidad para fichas que se vendan. Checklist profesional para imprimibles en Etsy, KDP y Hotmart que generan reseñas positivas.',
    heroTitle: 'Estándares de calidad para fichas que generan ventas',
    heroDescription: 'La calidad profesional es lo que separa las fichas que se venden de las que acumulan polvo digital. Los compradores reconocen la calidad en segundos: diseño limpio, tipografía legible, contenido preciso y formato consistente. Esta guía establece los estándares de calidad que sus fichas deben cumplir para competir en marketplaces saturados y generar reseñas positivas. Aplique este checklist profesional para sus productos en Etsy, Amazon KDP y Hotmart. El mercado hispanohablante tiene menos competencia de alta calidad, lo que significa que fichas profesionales destacan rápidamente.',
  },
];

let processed = 0;
let errors = 0;
let gumroadReplacements = 0;

for (const u of updates) {
  const filePath = path.join(BASE, u.file);
  console.log(`\nProcessing: ${u.file}`);

  if (!fs.existsSync(filePath)) {
    console.error(`  ERROR: File not found: ${filePath}`);
    errors++;
    continue;
  }

  let content = fs.readFileSync(filePath, 'utf-8');

  // Replace Gumroad → Hotmart throughout
  const gumroadCount = (content.match(/Gumroad/g) || []).length;
  if (gumroadCount > 0) {
    content = content.replace(/Gumroad/g, 'Hotmart');
    gumroadReplacements += gumroadCount;
    console.log(`  Replaced ${gumroadCount} Gumroad → Hotmart`);
  }

  // SEO fields
  content = replaceField(content, 'primaryKeyword', u.primaryKeyword);
  content = replaceArrayField(content, 'secondaryKeywords', u.secondaryKeywords);
  content = replaceArrayField(content, 'lsiKeywords', u.lsiKeywords);
  content = replaceField(content, 'titleTag', u.titleTag);
  content = replaceField(content, 'metaDescription', u.metaDescription);

  // Hero fields
  content = replaceHeroTitle(content, u.heroTitle);
  content = replaceHeroDescription(content, u.heroDescription);

  // Verify lengths
  const titleLen = u.titleTag.length;
  const metaLen = u.metaDescription.length;
  const heroTitleLen = u.heroTitle.length;

  if (titleLen > 60) console.warn(`  WARNING: titleTag too long (${titleLen} chars): ${u.titleTag}`);
  if (metaLen > 155) console.warn(`  WARNING: metaDescription too long (${metaLen} chars)`);
  if (heroTitleLen > 70) console.warn(`  WARNING: hero.title too long (${heroTitleLen} chars)`);

  console.log(`  titleTag: ${titleLen} chars | metaDescription: ${metaLen} chars | H1: ${heroTitleLen} chars`);

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`  OK — saved`);
  processed++;
}

console.log(`\n========================================`);
console.log(`DONE: ${processed} files processed, ${errors} errors`);
console.log(`Gumroad → Hotmart replacements: ${gumroadReplacements}`);
console.log(`========================================`);
