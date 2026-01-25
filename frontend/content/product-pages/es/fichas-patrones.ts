import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Pattern Worksheet - Spanish (Mexican) Content
 *
 * File: frontend/content/product-pages/es/fichas-patrones.ts
 * URL: /es/apps/fichas-patrones (Spanish SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Spanish/pattern-worksheet.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const patternWorksheetEsContent: ProductPageContent = {
  // SEO Metadata - Spanish language-specific
  seo: {
    slug: 'fichas-patrones',
    appId: 'pattern-worksheet',
    title: 'Fichas de Patrones para Imprimir | Generador de Ejercicios de Patrones',
    description: 'Crea fichas de patrones profesionales con nuestro generador de ejercicios de patrones. Genera fichas para imprimir personalizadas perfectas para educación.',
    keywords: 'fichas de patrones, ejercicios de patrones, fichas para imprimir, fichas infantil, fichas preescolar, material educativo gratis, fichas gratis, ejercicios matemáticas, grafomotricidad, lectoescritura, patrones AB, patrones ABC, tablas de multiplicar, abecedario, números',
    canonicalUrl: 'https://www.lessoncraftstudio.com/es/apps/fichas-patrones',
      },

  // Hero Section - FULL text from pattern-worksheet.md paragraphs 1-4
  hero: {
    title: 'Fichas de Patrones',
    subtitle: 'Generador de Ejercicios de Patrones - Material Educativo Gratis para Preescolar',
    description: `Crea fichas de patrones profesionales con nuestro generador de ejercicios de patrones. Tu suscripción Acceso Completo te da acceso ilimitado para crear material educativo gratis sin cargos por ficha. Genera fichas para imprimir personalizadas perfectas para educación infantil y educación primaria. Descarga ejercicios de matemáticas de alta calidad en formato PDF en menos de 3 minutos.

Los patrones son fundamentales en el desarrollo del pensamiento lógico de los niños. Nuestro generador permite crear fichas infantil con 9 tipos diferentes de patrones desde simples (AB) hasta complejos (ABCD). Cada ficha preescolar puede incluir de 1 a 8 ejercicios en una sola hoja. Perfecto para maestros que necesitan fichas de matemáticas personalizadas para diferentes niveles.

El reconocimiento de patrones desarrolla habilidades matemáticas esenciales. Estudios muestran que los niños que dominan patrones visuales aprenden las tablas de multiplicar más fácilmente. Nuestras fichas para imprimir ayudan a construir esta base desde preescolar hasta tercer grado. Con Acceso Completo ($240 anuales o $25 mensuales) creas actividades ilimitadas con licencia comercial incluida.`,
    previewImageSrc: '/samples/spanish/pattern/sample-1.jpeg',
    ctaLabels: {
      tryFree: 'Probar Gratis',
      viewSamples: 'Ver Ejemplos',
    },
    trustBadges: {
      languages: '11 Idiomas',
      images: '3000+ Imágenes',
      license: 'Licencia Comercial',
    },
    readMoreLabel: 'Leer más',
    showLessLabel: 'Ver menos',
    floatingStats: {
      time: '3 min',
      action: 'Crear y Descargar',
      quality: '300 DPI',
    },
  },

  // Sample Gallery - REAL file paths from samples/spanish/pattern/
  samples: {
    sectionTitle: 'Ficha Gratis para Niños - Fichas Gratis e Imprimibles Gratis',
    sectionDescription: 'Descarga imprimibles gratis - Ficha gratis para niños de calidad profesional. Ficha para niños perfecta para ficha para preescolar. Ficha gratis para niños y ficha para niños incluyen material educativo. Ficha gratis disponible',
    downloadLabel: 'Descargar Ejemplo Gratis',
    worksheetLabel: 'Ficha',
    answerKeyLabel: 'Clave de Respuestas',
    viewAllLabel: 'Ampliar',
    noPdfLabel: 'Solo vista previa',
    freePdfCountLabel: 'descargas gratis',
    badgeText: 'Ejemplos Gratis',
    downloadingLabel: 'Descargando...',
    ofLabel: 'de',
    items: [],
    
  },

  // Features Grid - FULL text from pattern-worksheet.md feature sections
  features: {
    sectionTitle: 'Fichas Gratis y Ficha para Niños - Imprimibles Gratis y Ficha para Preescolar',
    sectionDescription: 'Nuestro generador de fichas para imprimir incluye todas las herramientas profesionales que los maestros necesitan. Crea ejercicios de matemáticas personalizados en minutos. Acceso completo a biblioteca de imágenes y funciones de edición avanzadas. Cada característica está diseñada para ahorrar tiempo y producir fichas preescolar de calidad profesional.',
    highlightBadgeText: 'Característica Clave',
    readMoreLabel: 'Leer más',
    showLessLabel: 'Ver menos',
    badgeText: 'Características',
    trustBadges: {
      allFeatures: 'Todas las características incluidas',
      noHiddenFees: 'Sin cargos ocultos',
      cancelAnytime: 'Cancela cuando quieras',
    },
    items: [], // Samples loaded dynamically from content manager
    
  },

  // How-To Guide - FULL text from pattern-worksheet.md step sections
  howTo: {
    sectionTitle: 'Ficha Gratis para Niños Crear - Ficha para Preescolar',
    sectionDescription: 'Crear fichas infantil profesionales toma menos de 3 minutos. El proceso es intuitivo y rápido. No necesitas experiencia técnica. Estos cinco pasos te llevan desde idea hasta fichas para imprimir descargables. Cada paso incluye opciones de personalización para adaptar las fichas de matemáticas a tus necesidades exactas.',
    ctaText: 'Comenzar Ahora',
    badgeText: 'Cómo Funciona',
    stepLabel: 'Paso',
    completionTitle: '¡Listo!',
    completionSubtitle: 'Tu ficha está lista',
    readyTime: 'Lista en menos de 3 minutos',
    noSkillsNeeded: 'Sin conocimientos de diseño necesarios',
    readMoreLabel: 'Leer más',
    showLessLabel: 'Ver menos',
    steps: [
      {
        id: '1',
        number: 1,
        title: 'Configura tu Ficha - Fichas Preescolar con Números y Ejercicios de Grafomotricidad',
        description: `Selecciona el número de ejercicios para tu ficha. Elige entre 1 y 8 patrones por página. Más ejercicios crean práctica intensiva. Menos ejercicios dan espacio para aprender los números con claridad.

Decide si usarás un tema general para toda la ficha. La opción de tema general aplica las mismas imágenes a todos los ejercicios. Esto crea coherencia visual. Perfecto para fichas preescolar temáticas sobre animales, alimentos o transporte.

O configura cada ejercicio individualmente. Cada patrón puede tener su propio tema y tipo. Esta flexibilidad te permite crear fichas para imprimir variadas en una sola hoja. Combina patrones simples con complejos para diferenciación.

Activa "Incluir Números de Ejercicios" para mostrar numeración. Los números ayudan a los estudiantes a seguir el orden. Útil cuando combinas fichas de matemáticas con instrucciones verbales. La opción de inicio aleatorio varía dónde comienza cada patrón. Esto aumenta la dificultad y previene memorización.`,
      },
      {
        id: '2',
        number: 2,
        title: 'Selecciona Tipos de Patrones - Fichas Infantil desde AB Simple hasta ABCD Complejo para Tablas de Multiplicar',
        description: `Elige el tipo de patrón para cada ejercicio. Los 9 tipos van desde muy simple hasta muy complejo. Patrón AB alterna dos imágenes. AAB y ABB introducen repetición. ABC usa tres elementos diferentes.

Patrones más complejos como AABB, ABBC, AABC y ABCC desafían el pensamiento lógico. El patrón ABCD de cuatro elementos es el más difícil. Estos patrones avanzados preparan para aprender las tablas de multiplicar. Los estudiantes ven que los patrones son la base de la multiplicación.

Selecciona el tipo de pregunta. "Caja en Blanco" deja un espacio vacío para completar. Los estudiantes dibujan o pegan la imagen correcta. Este formato apoya el desarrollo de grafomotricidad cuando dibujan la respuesta.

"Elegir entre Opciones" presenta múltiples respuestas posibles. Los estudiantes marcan o colorean la respuesta correcta. Este formato es ideal para evaluaciones rápidas. Combina reconocimiento de patrones con ejercicios de matemáticas de opción múltiple.

Activa "Posición aleatoria de caja en blanco" para variar dónde aparece el espacio. Esto previene que los estudiantes memoricen posiciones. Cada variación crea una ficha única. Genera múltiples versiones para diferentes estudiantes con un clic.`,
      },
      {
        id: '3',
        number: 3,
        title: 'Asigna Imágenes del Abecedario, Números y Temas - Fichas para Imprimir con 3000+ Imágenes',
        description: `Selecciona el tema de imágenes para tus patrones. La biblioteca organiza más de 3000 imágenes por categorías. Temas educativos incluyen números del 1 al 20. Fichas de matemáticas con números enseñan reconocimiento numérico mientras practican patrones.

El tema del abecedario incluye todas las letras mayúsculas y minúsculas. Combina aprender las letras con pensamiento lógico. Perfecto para lectoescritura temprana. Los estudiantes reconocen letras mientras resuelven secuencias.

Temas temáticos incluyen animales, alimentos, transporte, formas geométricas y más. Cada tema contiene docenas de imágenes de alta calidad. Haz clic en cualquier imagen para asignarla a tu patrón. Las imágenes aparecen en el área de "Imágenes Asignadas".

Usa la función de búsqueda para encontrar imágenes específicas. Escribe "manzana" para ver todas las frutas. Escribe "perro" para ver animales domésticos. La búsqueda filtra miles de imágenes instantáneamente.

Cambia el idioma de contenido en la configuración de idioma. El mismo tema muestra diferentes nombres según el idioma. Útil para programas bilingües. Crea fichas preescolar en español e inglés de la misma unidad temática.

Sube tus propias imágenes personalizadas. Haz clic en "Elegir archivos" en la sección de carga. Selecciona múltiples imágenes simultáneamente. Tus fotos aparecen en "Imágenes Cargadas". Haz clic en ellas para asignar a patrones igual que imágenes de biblioteca.`,
      },
      {
        id: '4',
        number: 4,
        title: 'Personaliza en el Canvas - Fichas de Matemáticas Editables con Texto y Grafomotricidad',
        description: `Haz clic en "Crear Ficha" y tu hoja aparece en el canvas. Todos los elementos son completamente editables. Arrastra imágenes para reposicionarlas. Haz clic en las esquinas para cambiar tamaño. Mantén Shift mientras cambias tamaño para proporciones perfectas.

Agrega texto personalizado con el botón "Agregar Texto". Escribe instrucciones en español. "Completa el patrón" o "¿Qué sigue?". Cambia el tamaño de texto de 8 a 200 píxeles. Selecciona entre 7 fuentes apropiadas para niños.

Cambia colores de texto con el selector de color. Agrega contorno para mejor legibilidad. El contorno negro sobre texto de color destaca en fondos ocupados. Perfecto para fichas para imprimir con fondos decorativos.

Aplica fondos temáticos con la sección de Fondos. Selecciona un tema y aparecen miniaturas. Haz clic en cualquier fondo para aplicarlo. Ajusta la opacidad con el deslizador. Fondos sutiles no distraen de los ejercicios.

Aplica bordes decorativos igual que fondos. Más de 100 bordes temáticos disponibles. Bordes de animales, estrellas, flores y más. El borde enmarca tus fichas infantil profesionalmente. Ajusta opacidad para efecto sutil o llamativo.

Usa controles de alineación para organizar elementos. Selecciona múltiples objetos con Ctrl+clic. Alinéalos a la izquierda, centro o derecha. Centra todo en la página horizontal o verticalmente. Los elementos alineados se ven profesionales.

Bloquea elementos cuando estés satisfecho. Objetos bloqueados no se mueven accidentalmente. El ícono de candado en la barra de herramientas bloquea/desbloquea. "Desbloquear Todo" libera todos los elementos a la vez.`,
      },
      {
        id: '5',
        number: 5,
        title: 'Genera Clave de Respuestas y Descarga - Fichas Gratis en PDF y JPEG para Imprimir',
        description: `Haz clic en "Clave de Respuestas" en el menú Crear. La clave se genera automáticamente. Muestra el patrón completado con todas las respuestas. Cambia entre pestañas "Ficha" y "Clave de Respuestas" para ver ambas.

Edita la clave de respuestas igual que la ficha principal. Agrega texto explicativo. Colorea las respuestas correctas para énfasis visual. Algunos maestros agregan notas sobre patrones para padres que ayudan con tarea.

Activa la opción "Escala de Grises" en el menú Descargar. Esto convierte todo a blanco y negro. Perfecto para fichas gratis diseñadas como dibujos para colorear. Los estudiantes completan el patrón y luego colorean las imágenes.

Selecciona tu formato de descarga. JPEG para compartir digital o insertar en presentaciones. PDF para impresión directa. Ambos formatos mantienen 300 DPI de calidad profesional.

Descarga "Ficha (JPEG)" para el ejercicio. Descarga "Clave de Respuestas (JPEG)" para la solución. O descarga versiones PDF de ambas. Puedes descargar las cuatro versiones sin límites. Tu suscripción Acceso Completo incluye descargas ilimitadas.

Las fichas para imprimir están listas inmediatamente. Imprime en casa o en copistería. Comparte digitalmente con estudiantes remotos. Sube a plataformas de aprendizaje en línea. Vende en Teachers Pay Teachers con la licencia comercial incluida. Desde concepto hasta material educativo gratis profesional en menos de 3 minutos.`,
      },
    ],
  },

  // Use Cases Section - FULL text from pattern-worksheet.md use cases
  useCases: {
    sectionTitle: 'Ficha Gratis para Niños - Ficha para Preescolar con Imprimibles Gratis. Ficha para Niños',
    sectionDescription: 'Nuestro generador de fichas para imprimir sirve a educadores en múltiples contextos. Maestros de educación infantil lo usan diariamente. Padres que educan en casa crean fichas preescolar personalizadas. Maestros emprendedores venden material educativo gratis que generan. Cada usuario encuentra valor único en las herramientas profesionales.',
    badgeText: 'Casos de Uso',
    readMoreLabel: 'Leer más',
    showLessLabel: 'Ver menos',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // FAQ Section
  faq: {
    sectionTitle: 'FAQ - Ficha Gratis para Niños y Ficha para Preescolar. Ficha para Niños',
    sectionDescription: 'Maestros hacen preguntas específicas antes de suscribir. Estas respuestas abordan las dudas más comunes. Cada pregunta ha sido respondida por el equipo de LessonCraft Studio basado en experiencia de miles de usuarios.',
    showMoreText: 'Mostrar más preguntas',
    showLessText: 'Mostrar menos',
    badgeText: 'Preguntas Frecuentes',
    readMoreLabel: 'Leer más',
    showLessLabel: 'Ver menos',
    secureCheckout: 'Pago seguro',
    cancelAnytime: 'Cancela cuando quieras',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // Related Apps Section
  relatedApps: {
    sectionTitle: 'Fichas Gratis Combinar - Ficha para Niños e Imprimibles Gratis',
    sectionDescription: 'Maestros exitosos combinan múltiples generadores de LessonCraft Studio. Crea paquetes temáticos completos para vender o usar en clase. Tu suscripción Acceso Completo incluye todos los generadores sin límites. Estas combinaciones populares crean material educativo profesional que se vende bien.',
    ctaTitle: '¿Listo para Crear Fichas de Patrones Profesionales?',
    ctaDescription: 'Únete a miles de educadores que crean material profesional con nuestro generador de fichas.',
    primaryCtaText: 'Comenzar Prueba Gratis',
    secondaryCtaText: 'Ver las 33 Apps',
    badgeText: 'Combina Con',
    exploreText: 'Explorar todas las apps',
    trustBadges: {
      securePayment: 'Pago seguro',
      cancelAnytime: 'Cancela cuando quieras',
    },
    items: [], // Samples loaded dynamically from content manager
    
  },

  // Pricing Section - FULL ACCESS ($240/year)
  pricing: {
    title: 'Acceso Completo',
    price: '$240',
    priceInterval: '/año',
    priceSuffix: 'Facturación anual',
    benefits: [
      'Creación de fichas ilimitada',
      'Licencia comercial incluida',
      '11 idiomas soportados',
      '3000+ imágenes temáticas',
      'Calidad de impresión 300 DPI',
      'Claves de respuestas incluidas',
      'Acceso a los 33 generadores',
    ],
    ctaText: 'Comenzar Ahora',
    bundleDescription: 'Su suscripción incluye acceso a los 33 generadores de fichas:',
    bundleApps: [
      'Sumas con Imágenes',
      'Tren del Alfabeto',
      'Grande o Pequeño',
      'Bingo de Imágenes',
      'Gráficos y Conteo',
      'Suma con Código',
      'Páginas para Colorear',
      'Crucigramas',
      'Criptogramas',
      'Dibujo en Cuadrícula',
      'Trazar Líneas',
      'Busca y Cuenta',
      'Buscar Objetos',
      'Rompecabezas de Cuadrícula',
      'Emparejamiento',
      'Rompecabezas Matemáticos',
      'Fichas de Matemáticas',
      'Piezas Faltantes',
      'Mayor o Menor',
      'Encuentra el Diferente',
      'Tren de Patrones',
      'Fichas de Patrones',
      'Laberintos de Imágenes',
      'Clasificar Imágenes',
      'Preposiciones',
      'Asociación de Sombras',
      'Resta',
      'Sudoku',
      'Búsqueda del Tesoro',
      'Adivinar Palabras',
      'Palabras Revueltas',
      'Sopa de Letras',
      'Lectoescritura',
    ],
  },
};

export default patternWorksheetEsContent;
