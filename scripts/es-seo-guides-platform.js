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
  // Guide hero has title then description (no tagline)
  // Match description after title in hero block
  const re = /(hero:\s*\{[\s\S]*?title:[\s\S]*?description:\s*\n?\s*)(['"])(?:[^'"\\]|\\.)*\2/;
  if (re.test(content)) return content.replace(re, `$1'${esc(newDesc)}'`);
  // Try with tagline in between
  const re2 = /(tagline:[\s\S]*?description:\s*\n?\s*)(['"])(?:[^'"\\]|\\.)*\2/;
  if (re2.test(content)) return content.replace(re2, `$1'${esc(newDesc)}'`);
  console.warn('  WARNING: Could not replace hero description'); return content;
}

const guides = [
  {
    file: 'sell-math-worksheets-etsy.ts',
    primaryKeyword: 'vender fichas de matemáticas en Etsy guía',
    secondaryKeywords: [
      'cómo vender fichas de mates en Etsy paso a paso',
      'crear tienda Etsy de fichas matemáticas imprimibles',
      'anuncios optimizados Etsy para fichas de sumas y restas',
      'estrategia SEO Etsy vendedores fichas de matemáticas',
    ],
    lsiKeywords: [
      'etiquetas Etsy títulos anuncios descargas digitales fichas educativas',
      'precios paquetes sumas restas puzles matemáticos tienda rentable',
      'mockups fotografía producto fichas imprimibles tasa conversión Etsy',
    ],
    titleTag: 'Vender fichas de mates en Etsy | LCS',
    metaDescription: 'Aprenda a vender fichas de matemáticas en Etsy con SEO optimizado, fotos de anuncios profesionales y estrategias de precios. Configure su tienda hoy.',
    heroTitle: 'Cómo vender fichas de matemáticas en Etsy: guía paso a paso',
    heroDescription: 'Etsy es el marketplace líder para fichas de matemáticas imprimibles. Los compradores buscan activamente sumas, restas y puzles matemáticos para sus hijos o tiendas educativas. Esta guía le acompaña desde la investigación de demanda en Etsy hasta la optimización de anuncios con las 13 etiquetas, fotografía de producto que convierte y estrategias de precios para fichas individuales y paquetes. Aprenda a posicionar sus fichas de matemáticas en la búsqueda de Etsy, construir un catálogo de 6 formatos diferentes y generar ventas consistentes con timing estacional. Descubra cómo los generadores de LessonCraftStudio le permiten crear fichas profesionales a 300 DPI con claves de respuestas y temas variados para maximizar su cobertura de búsqueda.',
  },
  {
    file: 'sell-word-search-etsy.ts',
    primaryKeyword: 'vender sopas de letras en Etsy consejos',
    secondaryKeywords: [
      'cómo vender sopas de letras imprimibles en Etsy',
      'crear anuncios Etsy para sopas de letras educativas',
      'estrategia de paquetes sopas de letras en Etsy',
      'optimizar SEO Etsy para sopas de letras descargables',
    ],
    lsiKeywords: [
      'etiquetas Etsy sopas de letras vocabulario descarga digital PDF',
      'precios paquetes temáticos sopas de letras animales estaciones festividades',
      'fotografía producto mockups sopas de letras tasa conversión tienda',
    ],
    titleTag: 'Vender sopas de letras en Etsy | LCS',
    metaDescription: 'Descubra cómo vender sopas de letras en Etsy con anuncios optimizados, paquetes temáticos y SEO efectivo. Empiece a generar ventas consistentes hoy.',
    heroTitle: 'Cómo vender sopas de letras en Etsy y generar ingresos',
    heroDescription: 'Las sopas de letras son uno de los imprimibles más populares en Etsy porque combinan entretenimiento con aprendizaje de vocabulario. Los compradores buscan sopas de letras temáticas para fiestas, aulas y actividades familiares durante todo el año. Esta guía le muestra cómo crear anuncios de sopas de letras que se posicionen en la búsqueda de Etsy, fijar precios competitivos para fichas individuales y paquetes temáticos, crear fotos de anuncio que conviertan visitantes en compradores y aprovechar el timing estacional para maximizar las ventas. Aprenda a construir un catálogo diverso de sopas de letras en múltiples temas e idiomas usando los generadores de LessonCraftStudio.',
  },
  {
    file: 'start-etsy-printable-shop.ts',
    primaryKeyword: 'abrir tienda de imprimibles en Etsy guía',
    secondaryKeywords: [
      'cómo abrir tienda Etsy de imprimibles educativos',
      'configurar tienda Etsy para vender descargas digitales',
      'guía principiante tienda Etsy imprimibles paso a paso',
      'primeros pasos vendedor imprimibles en Etsy',
    ],
    lsiKeywords: [
      'registro cuenta vendedor Etsy políticas tienda perfil marca',
      'anuncios descargas digitales configuración entrega automática PDF',
      'comisiones Etsy tarifa publicación transacción procesamiento pago',
    ],
    titleTag: 'Abrir tienda de imprimibles en Etsy | LCS',
    metaDescription: 'Aprenda a abrir su tienda de imprimibles en Etsy desde cero. Configuración de cuenta, primeros anuncios y estrategia de lanzamiento paso a paso.',
    heroTitle: 'Cómo abrir una tienda de imprimibles en Etsy desde cero',
    heroDescription: 'Etsy es la plataforma ideal para lanzar un negocio de imprimibles educativos sin inversión inicial significativa. Millones de compradores buscan descargas digitales cada día, y los imprimibles educativos están entre las categorías de mayor crecimiento. Esta guía le acompaña paso a paso desde la creación de su cuenta de vendedor hasta la publicación de sus primeros anuncios optimizados. Aprenda a configurar las políticas de tienda, crear anuncios de descargas digitales con entrega automática, establecer precios competitivos y lanzar con suficientes productos para ganar tracción en el algoritmo de búsqueda de Etsy. Descubra las mejores prácticas para construir una marca reconocible desde el primer día.',
  },
  {
    file: 'create-etsy-coloring-pages.ts',
    primaryKeyword: 'crear dibujos para colorear que se vendan en Etsy',
    secondaryKeywords: [
      'cómo crear páginas para colorear vendibles en Etsy',
      'diseñar dibujos para colorear imprimibles negocio Etsy',
      'vender dibujos para colorear descarga digital Etsy',
      'anuncios Etsy páginas para colorear alta conversión',
    ],
    lsiKeywords: [
      'dibujos colorear temáticos animales naturaleza mandala infantil PDF',
      'paquetes colorear festividades Navidad Halloween Pascua estacional',
      'fotos anuncio mockups páginas colorear tasa clics Etsy',
    ],
    titleTag: 'Colorear que se venden en Etsy | LCS',
    metaDescription: 'Aprenda a crear dibujos para colorear que se vendan en Etsy. Temas populares, paquetes rentables y optimización de anuncios para máximas ventas.',
    heroTitle: 'Cómo crear dibujos para colorear rentables para Etsy',
    heroDescription: 'Las páginas para colorear son una de las categorías de imprimibles con mayor demanda en Etsy. Padres, profesores y adultos buscan dibujos para colorear temáticos durante todo el año, con picos estacionales en festividades como Navidad, Halloween y Pascua. Esta guía le muestra cómo crear dibujos para colorear que destaquen en un mercado competitivo, empaquetar sus diseños en paquetes temáticos atractivos, escribir anuncios que se posicionen en la búsqueda de Etsy y fijar precios que equilibren competitividad con rentabilidad. Descubra cómo los generadores de dibujos y colorear de LessonCraftStudio le permiten producir contenido profesional eficientemente para construir un catálogo diverso.',
  },
  {
    file: 'sell-educational-printables-etsy.ts',
    primaryKeyword: 'vender fichas educativas en Etsy principiante',
    secondaryKeywords: [
      'cómo empezar a vender fichas educativas en Etsy',
      'guía principiante venta imprimibles educativos Etsy',
      'fichas educativas más vendidas en Etsy categorías',
      'estrategia lanzamiento vendedor educativo en Etsy',
    ],
    lsiKeywords: [
      'descargas digitales educativas fichas actividades imprimibles Etsy',
      'categorías populares matemáticas lectoescritura ciencias infantil primaria',
      'reseñas clientes atención comprador tienda educativa Etsy',
    ],
    titleTag: 'Vender fichas educativas en Etsy | LCS',
    metaDescription: 'Guía para principiantes sobre cómo vender fichas educativas en Etsy. Categorías populares, optimización de anuncios y estrategia de crecimiento.',
    heroTitle: 'Cómo vender fichas educativas en Etsy: guía para principiantes',
    heroDescription: 'Los imprimibles educativos son una de las categorías de descargas digitales con mayor crecimiento en Etsy. Fichas de matemáticas, actividades de lectoescritura, puzles y páginas para colorear generan ventas consistentes durante todo el año. Esta guía está diseñada para principiantes que quieren lanzar su primera tienda de fichas educativas en Etsy. Aprenda a identificar las categorías más rentables, crear anuncios optimizados con las 13 etiquetas de Etsy, construir un catálogo inicial de 15-20 productos y establecer una estrategia de crecimiento sostenible. Descubra cómo utilizar los generadores de LessonCraftStudio para crear fichas profesionales en múltiples formatos y acelerar su lanzamiento.',
  },
  {
    file: 'price-etsy-printables.ts',
    primaryKeyword: 'cómo poner precio a imprimibles en Etsy',
    secondaryKeywords: [
      'estrategia de precios para imprimibles digitales en Etsy',
      'cuánto cobrar por fichas imprimibles en Etsy',
      'precios paquetes y fichas individuales Etsy',
      'márgenes beneficio vendedor imprimibles Etsy comisiones',
    ],
    lsiKeywords: [
      'tarifa anuncio transacción procesamiento pago Etsy coste real',
      'precios competitivos fichas individuales paquetes mega packs',
      'psicología precios valor percibido posicionamiento premium Etsy',
    ],
    titleTag: 'Poner precio a imprimibles en Etsy | LCS',
    metaDescription: 'Aprenda a fijar precios para imprimibles en Etsy. Estrategias para fichas individuales, paquetes y mega packs que maximicen sus márgenes de beneficio.',
    heroTitle: 'Cómo fijar precios para imprimibles en Etsy correctamente',
    heroDescription: 'Fijar el precio correcto para sus imprimibles en Etsy es la diferencia entre una tienda rentable y una que apenas cubre las comisiones de la plataforma. Etsy cobra tarifas de publicación, transacción y procesamiento de pago que pueden consumir hasta el 20-30% de sus ingresos si no planifica sus precios estratégicamente. Esta guía le muestra cómo calcular sus márgenes reales después de todas las comisiones de Etsy, establecer precios para fichas individuales, paquetes temáticos y mega packs, y utilizar la psicología de precios para maximizar el valor percibido. Aprenda a posicionar sus productos como premium sin ahuyentar compradores, y descubra los rangos de precios que mejor funcionan en cada categoría de imprimibles educativos.',
  },
  {
    file: 'etsy-seo-educational-printables.ts',
    primaryKeyword: 'SEO de Etsy para fichas educativas 2026',
    secondaryKeywords: [
      'optimización SEO Etsy fichas educativas imprimibles',
      'cómo posicionar anuncios Etsy fichas educativas',
      'algoritmo búsqueda Etsy imprimibles educativos 2026',
      'etiquetas títulos descripción Etsy fichas imprimibles',
    ],
    lsiKeywords: [
      'algoritmo Etsy puntuación calidad anuncio tasa clics conversión',
      '13 etiquetas Etsy búsqueda por frases emparejamiento palabras clave',
      'atributos categoría descargas digitales educativo posicionamiento',
    ],
    titleTag: 'SEO Etsy para fichas educativas (2026) | LCS',
    metaDescription: 'Domine el SEO de Etsy para fichas educativas en 2026. Aprenda a usar las 13 etiquetas, optimizar títulos y posicionar sus anuncios en la búsqueda.',
    heroTitle: 'SEO de Etsy para fichas educativas: guía actualizada 2026',
    heroDescription: 'El algoritmo de búsqueda de Etsy determina qué fichas educativas ven los compradores y cuáles permanecen invisibles. Comprender cómo funciona este algoritmo en 2026 es esencial para cualquier vendedor de imprimibles educativos que quiera generar tráfico orgánico consistente. Esta guía cubre las mecánicas actualizadas del algoritmo de Etsy, incluyendo cómo pondera títulos, las 13 etiquetas, descripciones y atributos de categoría. Aprenda a escribir títulos que posicionen para términos de búsqueda de compradores reales, maximizar sus etiquetas con frases diversificadas, completar los atributos de descargas digitales y mejorar la puntuación de calidad de sus anuncios a través de mejores tasas de clics y conversión.',
  },
  {
    file: 'create-etsy-worksheet-bundles.ts',
    primaryKeyword: 'crear paquetes de fichas para Etsy',
    secondaryKeywords: [
      'cómo crear paquetes de fichas educativas Etsy',
      'estrategia paquetes imprimibles Etsy mayor valor',
      'empaquetar fichas para vender más en Etsy',
      'paquetes temáticos fichas Etsy precios y formato',
    ],
    lsiKeywords: [
      'paquetes temáticos fichas matemáticas lectoescritura puzles colección',
      'valor percibido mega pack múltiples formatos claves respuestas',
      'venta cruzada productos relacionados catálogo agrupación Etsy',
    ],
    titleTag: 'Crear paquetes de fichas para Etsy | LCS',
    metaDescription: 'Aprenda a crear paquetes de fichas para Etsy que aumenten sus ventas. Estrategias de agrupación, precios y formato para máximo valor percibido.',
    heroTitle: 'Cómo crear paquetes de fichas rentables para Etsy',
    heroDescription: 'Los paquetes de fichas generan los mayores ingresos por transacción en Etsy porque ofrecen un valor percibido excepcional a los compradores. Un paquete de 20-50 fichas temáticas con claves de respuestas a un precio competitivo convierte significativamente mejor que fichas individuales. Esta guía le muestra cómo planificar, crear y empaquetar sus fichas en colecciones temáticas que maximicen las ventas. Aprenda a combinar fichas de diferentes generadores en paquetes coherentes, fijar precios que equilibren competitividad con rentabilidad, crear fotos de anuncio que comuniquen el valor del paquete y estructurar su catálogo para fomentar la venta cruzada entre productos relacionados.',
  },
  {
    file: 'math-activity-books-kdp.ts',
    primaryKeyword: 'crear libros de actividades de mates para KDP',
    secondaryKeywords: [
      'publicar libro actividades matemáticas Amazon KDP',
      'cómo crear cuadernillo de mates para KDP paso a paso',
      'libros de fichas matemáticas Amazon KDP formato interior',
      'ganar dinero libros actividades matemáticas KDP',
    ],
    lsiKeywords: [
      'formato interior KDP márgenes sangrado tamaño recorte matemáticas',
      'portada libro actividades matemáticas diseño profesional A+ Content',
      'palabras clave backend Amazon categorías BSR libros educativos',
    ],
    titleTag: 'Libros de mates para Amazon KDP | LCS',
    metaDescription: 'Aprenda a crear y publicar libros de actividades de matemáticas en Amazon KDP. Formato interior, portada profesional y palabras clave para posicionar.',
    heroTitle: 'Cómo crear libros de actividades de matemáticas para KDP',
    heroDescription: 'Amazon KDP permite publicar libros de actividades de matemáticas sin inventario ni inversión inicial. Los compradores de Amazon buscan activamente cuadernillos de sumas, restas y puzles matemáticos para sus hijos, generando ventas consistentes durante todo el año. Esta guía le acompaña desde el formateo del interior para cumplir las especificaciones de KDP hasta la creación de una portada profesional, la selección de palabras clave backend y la elección de categorías que maximicen la visibilidad. Aprenda a convertir las fichas generadas con LessonCraftStudio en libros de actividades publicados en Amazon, con márgenes de regalías optimizados y posicionamiento estratégico en la búsqueda.',
  },
  {
    file: 'publish-puzzle-books-kdp.ts',
    primaryKeyword: 'publicar libros de pasatiempos en Amazon KDP',
    secondaryKeywords: [
      'cómo publicar libros de puzles en Amazon KDP',
      'crear libros de pasatiempos para KDP formato y portada',
      'libros de puzles educativos Amazon KDP guía completa',
      'ganar dinero con libros de pasatiempos en KDP',
    ],
    lsiKeywords: [
      'sopas letras crucigramas sudoku criptogramas pasatiempos KDP',
      'formato interior libro puzles KDP márgenes recorte sangrado',
      'portada profesional libro pasatiempos categorías Amazon ranking',
    ],
    titleTag: 'Publicar pasatiempos en Amazon KDP | LCS',
    metaDescription: 'Publique libros de pasatiempos en Amazon KDP con formato profesional. Sopas de letras, sudoku, crucigramas y más. Guía paso a paso completa.',
    heroTitle: 'Cómo publicar libros de pasatiempos en Amazon KDP',
    heroDescription: 'Los libros de pasatiempos son una de las categorías más rentables en Amazon KDP porque la demanda es constante y los compradores buscan variedad. Sopas de letras, crucigramas, sudoku, criptogramas y puzles matemáticos tienen audiencias fieles que compran múltiples libros al año. Esta guía le muestra cómo formatear el interior de sus libros de pasatiempos según las especificaciones de KDP, diseñar portadas profesionales que destaquen en los resultados de búsqueda de Amazon, seleccionar palabras clave backend efectivas y elegir categorías con alta demanda y competencia manejable. Aprenda a convertir los puzles generados con LessonCraftStudio en libros publicados que generen regalías pasivas.',
  },
  {
    file: 'word-search-books-kdp.ts',
    primaryKeyword: 'crear libros de sopas de letras para KDP',
    secondaryKeywords: [
      'publicar libros de sopas de letras Amazon KDP',
      'cómo crear libro de sopa de letras para KDP paso a paso',
      'formato interior sopas de letras KDP especificaciones',
      'ganar dinero libros sopas de letras Amazon KDP',
    ],
    lsiKeywords: [
      'formato interior sopas letras KDP tamaño fuente cuadrícula márgenes',
      'portada libro sopas letras profesional atractiva Amazon búsqueda',
      'nichos sopas letras temáticas animales viajes cocina idiomas KDP',
    ],
    titleTag: 'Libros de sopas de letras para KDP | LCS',
    metaDescription: 'Cree y publique libros de sopas de letras en Amazon KDP. Formato interior, diseño de portada y estrategia de nichos temáticos para máximas ventas.',
    heroTitle: 'Cómo crear libros de sopas de letras para Amazon KDP',
    heroDescription: 'Los libros de sopas de letras son un nicho probado en Amazon KDP con demanda constante durante todo el año. Los compradores buscan sopas de letras temáticas para entretenimiento, aprendizaje de vocabulario y ejercicio mental, creando oportunidades en decenas de subnichos diferentes. Esta guía le acompaña desde la configuración del formato interior con cuadrículas legibles y fuentes apropiadas hasta el diseño de portadas atractivas, la selección de nichos temáticos rentables y la optimización de palabras clave para posicionar en la búsqueda de Amazon. Aprenda a utilizar el generador de sopas de letras de LessonCraftStudio para producir contenido profesional eficientemente y publicar libros que generen regalías consistentes.',
  },
  {
    file: 'make-money-kdp-activity-books.ts',
    primaryKeyword: 'ganar dinero con libros de actividades KDP',
    secondaryKeywords: [
      'cómo ganar dinero publicando cuadernillos en KDP',
      'ingresos pasivos libros de actividades Amazon KDP',
      'rentabilidad libros actividades KDP márgenes regalías',
      'negocio rentable cuadernillos educativos Amazon KDP',
    ],
    lsiKeywords: [
      'regalías KDP márgenes beneficio costes impresión precio venta',
      'volumen publicaciones catálogo diversificado ingresos recurrentes',
      'nichos rentables libros actividades infantiles educativos puzles',
    ],
    titleTag: 'Ganar dinero con cuadernillos KDP | LCS',
    metaDescription: 'Descubra cómo ganar dinero con libros de actividades en Amazon KDP. Márgenes reales, estrategia de catálogo y nichos más rentables para empezar.',
    heroTitle: 'Cómo ganar dinero con libros de actividades en Amazon KDP',
    heroDescription: 'Amazon KDP ofrece una oportunidad real de generar ingresos pasivos publicando libros de actividades educativos. Sin inventario, sin envíos y sin inversión inicial significativa, puede construir un catálogo de cuadernillos que genere regalías mes tras mes. Esta guía le muestra los números reales: márgenes de regalías después de costes de impresión, cuántos libros necesita publicar para alcanzar diferentes niveles de ingresos, qué nichos de actividades son más rentables y cómo escalar su catálogo estratégicamente. Aprenda a calcular la rentabilidad antes de publicar, elegir nichos con demanda probada y utilizar los generadores de LessonCraftStudio para producir contenido profesional eficientemente.',
  },
  {
    file: 'kdp-formatting-worksheets.ts',
    primaryKeyword: 'formato KDP para libros de fichas guía',
    secondaryKeywords: [
      'cómo formatear libro de fichas para Amazon KDP',
      'especificaciones formato interior KDP libros actividades',
      'márgenes sangrado recorte KDP libros educativos fichas',
      'guía formato PDF interior KDP cuadernillos fichas',
    ],
    lsiKeywords: [
      'márgenes interiores exteriores sangrado zona segura KDP fichas',
      'tamaño recorte 8.5x11 6x9 formatos populares KDP actividades',
      'resolución 300 DPI fuentes incrustadas PDF listo impresión KDP',
    ],
    titleTag: 'Formato KDP para libros de fichas | LCS',
    metaDescription: 'Guía completa de formato KDP para libros de fichas. Márgenes, sangrado, tamaño de recorte y especificaciones técnicas para publicar sin rechazos.',
    heroTitle: 'Cómo formatear libros de fichas para Amazon KDP sin errores',
    heroDescription: 'El formato correcto del interior es la barrera técnica más común para publicar libros de fichas en Amazon KDP. Márgenes incorrectos, sangrado insuficiente o resolución baja provocan rechazos que retrasan su publicación. Esta guía le proporciona las especificaciones técnicas exactas que necesita: márgenes interiores y exteriores según el número de páginas, zonas seguras de contenido, requisitos de sangrado, tamaños de recorte populares para libros de actividades y configuración correcta del PDF para impresión. Aprenda a exportar fichas generadas con LessonCraftStudio en el formato exacto que KDP acepta, evitando los errores más frecuentes que rechazan manuscritos.',
  },
  {
    file: 'best-kdp-activity-book-niches.ts',
    primaryKeyword: 'mejores nichos de cuadernillos KDP 2026',
    secondaryKeywords: [
      'nichos rentables libros actividades Amazon KDP 2026',
      'mejores categorías cuadernillos educativos KDP este año',
      'nichos de baja competencia libros actividades KDP',
      'investigación de nichos libros actividades Amazon KDP',
    ],
    lsiKeywords: [
      'demanda Amazon BSR ranking categorías libros actividades infantiles',
      'competencia análisis portadas reseñas palabras clave nicho KDP',
      'tendencias estacionales nichos perennes libros educativos puzles',
    ],
    titleTag: 'Mejores nichos cuadernillos KDP (2026) | LCS',
    metaDescription: 'Descubra los mejores nichos de cuadernillos para Amazon KDP en 2026. Análisis de demanda, competencia y rentabilidad para elegir su nicho ideal.',
    heroTitle: 'Mejores nichos de cuadernillos para Amazon KDP en 2026',
    heroDescription: 'Elegir el nicho correcto es la decisión más importante al publicar libros de actividades en Amazon KDP. Un nicho con alta demanda y competencia manejable puede generar ventas consistentes, mientras que un nicho saturado o sin demanda desperdicia su tiempo y esfuerzo. Esta guía analiza los nichos más rentables de cuadernillos para KDP en 2026, incluyendo categorías perennes con demanda constante y nichos emergentes con oportunidades de crecimiento. Aprenda a investigar la demanda usando BSR y análisis de palabras clave, evaluar la competencia real en cada nicho, identificar subnichos desatendidos y seleccionar categorías que se alineen con los generadores de LessonCraftStudio para producción eficiente.',
  },
  {
    file: 'sudoku-books-kdp.ts',
    primaryKeyword: 'crear libros de sudoku para Amazon KDP',
    secondaryKeywords: [
      'publicar libros de sudoku en Amazon KDP guía',
      'cómo crear libro de sudoku para KDP paso a paso',
      'formato interior sudoku KDP cuadrículas niveles dificultad',
      'ganar dinero libros sudoku Amazon KDP nichos',
    ],
    lsiKeywords: [
      'cuadrículas sudoku fácil medio difícil formato impresión KDP',
      'portada libro sudoku profesional atractiva Amazon resultados',
      'nichos sudoku adultos niños temáticos viaje gran formato KDP',
    ],
    titleTag: 'Libros de sudoku para Amazon KDP | LCS',
    metaDescription: 'Cree y publique libros de sudoku en Amazon KDP. Formato de cuadrículas, niveles de dificultad, diseño de portada y nichos rentables para empezar.',
    heroTitle: 'Cómo crear y publicar libros de sudoku para Amazon KDP',
    heroDescription: 'Los libros de sudoku tienen una audiencia fiel en Amazon que compra múltiples libros al año, creando una oportunidad de ingresos recurrentes para publicadores de KDP. Desde sudoku fácil para principiantes hasta desafíos expertos, cada nivel de dificultad atiende a un segmento diferente de compradores. Esta guía le muestra cómo formatear cuadrículas de sudoku legibles para impresión, organizar los puzles por nivel de dificultad progresivo, diseñar portadas que destaquen en los resultados de Amazon, seleccionar nichos específicos como sudoku para viajes o gran formato, y optimizar las palabras clave para máxima visibilidad. Aprenda a usar el generador de sudoku de LessonCraftStudio para producir contenido profesional eficientemente.',
  },
  {
    file: 'kdp-vs-etsy-printables.ts',
    primaryKeyword: 'Amazon KDP o Etsy para vender imprimibles',
    secondaryKeywords: [
      'KDP o Etsy cuál es mejor para vender imprimibles',
      'comparación Amazon KDP vs Etsy vendedores imprimibles',
      'dónde vender fichas imprimibles KDP o Etsy ventajas',
      'estrategia multiplataforma KDP y Etsy imprimibles',
    ],
    lsiKeywords: [
      'comisiones Etsy regalías KDP márgenes beneficio comparación real',
      'descarga digital PDF vs libro impreso bajo demanda formato',
      'tráfico algoritmo búsqueda Etsy vs Amazon A9 palabras clave',
    ],
    titleTag: 'KDP vs Etsy: dónde vender imprimibles | LCS',
    metaDescription: 'Compare Amazon KDP y Etsy para vender imprimibles. Comisiones, formatos, tráfico y estrategia multiplataforma para maximizar sus ingresos.',
    heroTitle: 'Amazon KDP o Etsy: dónde vender sus imprimibles en 2026',
    heroDescription: 'Amazon KDP y Etsy son las dos plataformas dominantes para vender contenido imprimible, pero sirven mercados fundamentalmente diferentes. Etsy vende descargas digitales PDF que los compradores imprimen en casa. KDP vende libros físicos que Amazon fabrica y envía. Esta guía compara ambas plataformas en las dimensiones que realmente importan: estructura de comisiones y márgenes de beneficio reales, mecánicas de tráfico y descubrimiento, tipos de producto que mejor funcionan en cada plataforma, flujo de trabajo de publicación y comportamiento del comprador. Aprenda a elegir dónde empezar según su contenido y objetivos, y descubra cómo una estrategia multiplataforma captura ingresos de ambos marketplaces.',
  },
  {
    file: 'create-sell-tpt-resources.ts',
    primaryKeyword: 'vender recursos educativos en Hotmart y TPT',
    secondaryKeywords: [
      'cómo vender fichas educativas en Hotmart paso a paso',
      'crear recursos para Hotmart y TPT guía vendedor',
      'vender imprimibles educativos en Hotmart y Editorial MD',
      'configurar tienda Hotmart recursos educativos digitales',
    ],
    lsiKeywords: [
      'marketplace educativo digital emprendedores Hotmart Editorial MD TPT',
      'comisiones vendedor plataforma educativa recursos descargables',
      'anuncio producto educativo vista previa optimización posicionamiento',
    ],
    titleTag: 'Vender recursos en Hotmart y TPT | LCS',
    metaDescription: 'Aprenda a vender recursos educativos en Hotmart, Editorial MD y TPT. Configuración de cuenta, optimización de anuncios y estrategia de crecimiento.',
    heroTitle: 'Cómo vender recursos educativos en Hotmart y TPT',
    heroDescription: 'Hotmart, Editorial MD y Teachers Pay Teachers son plataformas especializadas donde profesores y emprendedores educativos compran y venden recursos digitales. A diferencia de Etsy o Amazon, cada comprador en estas plataformas busca activamente materiales educativos listos para usar. Hotmart domina el mercado latinoamericano con millones de usuarios, Editorial MD atiende específicamente al mercado mexicano y TPT es líder en Estados Unidos. Esta guía le acompaña desde la configuración de su cuenta de vendedor hasta la publicación de recursos optimizados, cubriendo las particularidades de cada plataforma, el formateo adecuado de recursos, estrategia de precios y tácticas de lanzamiento para construir impulso de ventas.',
  },
  {
    file: 'tpt-store-optimization.ts',
    primaryKeyword: 'optimizar tienda en Hotmart y Editorial MD',
    secondaryKeywords: [
      'cómo optimizar tienda Hotmart para vender más recursos',
      'estrategia crecimiento tienda Editorial MD optimización',
      'mejorar posicionamiento productos Hotmart Editorial MD',
      'aumentar ventas tienda educativa Hotmart tips avanzados',
    ],
    lsiKeywords: [
      'algoritmo búsqueda Hotmart posicionamiento productos visibilidad',
      'marca tienda perfil profesional identidad visual educativa',
      'vistas previas descripciones conversión anuncios productos digitales',
    ],
    titleTag: 'Optimizar tienda Hotmart y Editorial MD | LCS',
    metaDescription: 'Optimice su tienda en Hotmart y Editorial MD para más ventas. Posicionamiento de búsqueda, vistas previas efectivas y estrategia de catálogo.',
    heroTitle: 'Cómo optimizar su tienda en Hotmart y Editorial MD',
    heroDescription: 'Tener productos publicados en Hotmart o Editorial MD es solo el primer paso. La diferencia entre una tienda con ventas ocasionales y una que genera ingresos mensuales consistentes está en la optimización. Cómo posicionan sus productos en la búsqueda, qué tan efectivamente sus vistas previas convierten visitantes en compradores y cómo su organización de tienda fomenta compras múltiples determinan su éxito. Esta guía cubre estrategias avanzadas de optimización para tiendas en Hotmart y Editorial MD: factores del algoritmo de búsqueda, descripciones de alta conversión, vistas previas profesionales, generación de reseñas, organización de catálogo y escalado basado en datos de rendimiento.',
  },
  {
    file: 'sell-printables-gumroad.ts',
    primaryKeyword: 'vender imprimibles en Hotmart guía',
    secondaryKeywords: [
      'cómo vender imprimibles en Hotmart paso a paso',
      'configurar negocio imprimibles Hotmart sin cuotas',
      'vender descargas digitales en Hotmart guía vendedor',
      'Hotmart para vendedores de imprimibles educativos',
    ],
    lsiKeywords: [
      'plataforma ventas directas creador descargas digitales Hotmart',
      'tienda Hotmart marca página producto imagen optimización',
      'email marketing audiencia lista seguidores Hotmart promoción',
    ],
    titleTag: 'Vender imprimibles en Hotmart | LCS',
    metaDescription: 'Aprenda a vender imprimibles en Hotmart con comisiones competitivas. Configuración de tienda, estrategia de precios y email marketing integrado.',
    heroTitle: 'Cómo vender imprimibles en Hotmart: guía completa',
    heroDescription: 'Hotmart es la plataforma líder en Latinoamérica para vender productos digitales directamente a compradores. A diferencia de marketplaces como Etsy donde compite con millones de vendedores por la atención del algoritmo, Hotmart le permite construir su propia audiencia, poseer las relaciones con sus clientes y conservar las direcciones de correo para marketing directo. Esta guía cubre todo lo que necesita para vender imprimibles en Hotmart con éxito: configuración de tienda, creación de páginas de producto optimizadas, opciones de precios flexibles, email marketing integrado para construcción de audiencia y estrategias de generación de tráfico. Descubra cómo Hotmart complementa su presencia en otros marketplaces con comisiones competitivas y control total de su negocio.',
  },
  {
    file: 'sell-creative-fabrica.ts',
    primaryKeyword: 'vender recursos educativos en Creative Fabrica',
    secondaryKeywords: [
      'cómo vender en Creative Fabrica guía vendedor',
      'publicar fichas educativas en Creative Fabrica',
      'Creative Fabrica para vendedores de imprimibles educativos',
      'ganar dinero vendiendo diseños en Creative Fabrica',
    ],
    lsiKeywords: [
      'marketplace diseño gráfico recursos digitales suscripción Creative Fabrica',
      'subir productos diseñador vendedor regalías comisiones CF',
      'fuentes gráficos plantillas imprimibles educativos marketplace creativo',
    ],
    titleTag: 'Vender en Creative Fabrica | LCS',
    metaDescription: 'Aprenda a vender recursos educativos en Creative Fabrica. Configuración de cuenta de diseñador, optimización de productos y estrategia de regalías.',
    heroTitle: 'Cómo vender recursos educativos en Creative Fabrica',
    heroDescription: 'Creative Fabrica es un marketplace de diseño digital en crecimiento donde diseñadores y creadores venden fuentes, gráficos, plantillas e imprimibles educativos a una audiencia global. A diferencia de Etsy o Amazon, Creative Fabrica opera con un modelo de suscripción que proporciona a los diseñadores regalías por descargas, además de ventas directas individuales. Esta guía le muestra cómo configurar su cuenta de diseñador, preparar sus fichas e imprimibles educativos para el marketplace, optimizar sus productos para la búsqueda interna de Creative Fabrica, comprender la estructura de regalías y construir un catálogo que genere ingresos consistentes tanto por suscripciones como por ventas directas.',
  },
];

let updated = 0;
let errors = 0;

for (const g of guides) {
  const filePath = path.join(BASE, g.file);
  if (!fs.existsSync(filePath)) {
    console.error(`ERROR: File not found: ${g.file}`);
    errors++;
    continue;
  }

  console.log(`\nProcessing: ${g.file}`);
  let content = fs.readFileSync(filePath, 'utf8');

  // SEO fields
  content = replaceField(content, 'primaryKeyword', g.primaryKeyword);
  content = replaceArrayField(content, 'secondaryKeywords', g.secondaryKeywords);
  content = replaceArrayField(content, 'lsiKeywords', g.lsiKeywords);
  content = replaceField(content, 'titleTag', g.titleTag);
  content = replaceField(content, 'metaDescription', g.metaDescription);

  // Hero fields
  content = replaceHeroTitle(content, g.heroTitle);
  content = replaceHeroDescription(content, g.heroDescription);

  // Validate lengths
  if (g.titleTag.length > 60) {
    console.warn(`  WARNING: titleTag is ${g.titleTag.length} chars (max 60): ${g.titleTag}`);
  }
  if (g.metaDescription.length > 155) {
    console.warn(`  WARNING: metaDescription is ${g.metaDescription.length} chars (max 155): ${g.metaDescription}`);
  }
  if (g.heroTitle.length > 70) {
    console.warn(`  WARNING: heroTitle is ${g.heroTitle.length} chars (max 70): ${g.heroTitle}`);
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`  OK: primaryKeyword, secondaryKeywords, lsiKeywords, titleTag, metaDescription, hero.title, hero.description`);
  updated++;
}

console.log(`\n=== DONE: ${updated} files updated, ${errors} errors ===`);
