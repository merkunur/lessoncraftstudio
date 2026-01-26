import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Word Scramble Worksheets - Spanish (Mexican) Content
 *
 * File: frontend/content/product-pages/es/word-scramble-worksheets.ts
 * URL: /es/apps/letras-revueltas-fichas (Spanish SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Spanish/word-scramble.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const wordScrambleEsContent: ProductPageContent = {
  // SEO Metadata - Spanish language-specific
  seo: {
    slug: 'letras-revueltas-fichas',
    appId: 'word-scramble',
    title: 'Fichas de Letras Revueltas Gratis para Imprimir | LessonCraft Studio',
    description: 'Crea fichas de letras revueltas para preescolar y primaria. Generador gratuito de ejercicios de lectoescritura. Descarga PDF en alta calidad en 3 minutos.',
    keywords: 'fichas para imprimir, letras revueltas, fichas preescolar, ejercicios de lectoescritura, fichas infantil, grafomotricidad, abecedario, fichas gratis, material educativo gratis, dibujos para colorear, fichas de matemáticas, números, tablas de multiplicar',
    canonicalUrl: 'https://www.lessoncraftstudio.com/es/apps/letras-revueltas-fichas',
      },

  // Hero Section - FULL text from word-scramble.md paragraphs 1-4
  hero: {
    title: 'Fichas para Imprimir de Letras Revueltas',
    subtitle: 'Generador de Ejercicios de Lectoescritura para Preescolar',
    description: `Crea fichas profesionales de letras revueltas con nuestro generador educativo. Tu suscripción Paquete Esencial te da creación ilimitada de fichas sin cargos adicionales por cada hoja. Genera fichas personalizadas de letras revueltas perfectas para preescolar y primaria. Descarga ejercicios de lectoescritura de alta calidad en PDF en menos de 3 minutos.

Nuestro generador de fichas para imprimir combina imágenes visuales con palabras revueltas. Los niños ordenan las letras mientras usan las imágenes como pistas. Esta combinación de estímulos visuales y lingüísticos refuerza el aprendizaje del abecedario y la lectoescritura. Cada ficha incluye material educativo gratis una vez que te suscribes al Paquete Esencial.

Las fichas infantil de letras revueltas son ideales para maestros de preescolar. También funcionan perfectamente para educación primaria temprana. Usa nuestras fichas gratis para enseñar vocabulario en español. Combina ejercicios de grafomotricidad con reconocimiento de letras. Crea ejercicios de matemáticas al incluir números en tus fichas personalizadas.

El generador soporta 11 idiomas completos. Cuando seleccionas español en la interfaz, las fichas usan vocabulario en español mexicano natural. Los nombres de las imágenes se traducen automáticamente. Esto hace que tus fichas para imprimir sean auténticas en español.`,
    previewImageSrc: '/samples/spanish/word-scramble/sample-1.jpeg',
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
    videos: {
      commonFeatures: {
        videoId: 'Df9fknBBRFA',
        buttonText: 'Mira cómo funciona',
        modalTitle: 'Vista rápida de funciones',
      },
      appSpecific: {
        videoId: 'Hc3g5VsSHEU',
        buttonText: 'Funciones Palabras revueltas',
        modalTitle: 'Tutorial Palabras revueltas',
      },
    },
  },

  // Sample Gallery - REAL file paths from samples/english/word scramble/
  samples: {
    sectionTitle: 'Ficha Gratis para Niños - Fichas Gratis e Imprimibles Gratis',
    sectionDescription: 'Descarga imprimibles gratis - Ficha gratis para niños de calidad profesional. Ficha para niños perfecta para ficha para preescolar. Ficha gratis para niños y ficha para niños incluyen material educativo. Ficha gratis disponible',
    downloadLabel: 'Descargar Ejemplo Gratis',
    worksheetLabel: 'Ficha',
    answerKeyLabel: 'Respuestas',
    viewAllLabel: 'Ampliar',
    noPdfLabel: 'Solo vista previa',
    freePdfCountLabel: 'descargas gratis',
    badgeText: 'Ejemplos Gratis',
    downloadingLabel: 'Descargando...',
    ofLabel: 'de',
    items: [],
    
  },

  // Features Grid - FULL text from word-scramble.md feature sections
  features: {
    sectionTitle: 'Fichas Gratis y Ficha para Niños - Imprimibles Gratis y Ficha para Preescolar',
    sectionDescription: 'Nuestro generador de fichas infantil ofrece herramientas profesionales para crear ejercicios de lectoescritura personalizados. Cada característica está diseñada para maestros de preescolar y primaria. Crea fichas gratis ilimitadas con tu suscripción Paquete Esencial. Todas las funciones están incluidas sin cargos adicionales por $144 al año o $15 al mes.',
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

  // How-To Guide - FULL text from word-scramble.md step sections
  howTo: {
    sectionTitle: 'Ficha Gratis para Niños Crear - Ficha para Preescolar',
    sectionDescription: 'Genera fichas infantil profesionales en menos de 3 minutos siguiendo estos cinco pasos simples. No necesitas experiencia en diseño gráfico. El generador hace todo el trabajo técnico automáticamente. Solo selecciona tus preferencias y descarga material educativo gratis listo para usar.',
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
        title: 'Selecciona Contenido para Fichas Preescolar - Temas, Imágenes o Listas Personalizadas de Lectoescritura',
        description: `Comienza eligiendo el contenido de tus fichas infantil. Tienes tres opciones principales para crear ejercicios de lectoescritura personalizados. Selecciona un tema de la biblioteca para fichas rápidas. Elige imágenes individuales para control preciso. O usa listas de palabras personalizadas para vocabulario específico.

La opción de temas es perfecta para crear fichas para imprimir temáticas rápidamente. Selecciona "Animales" y el sistema muestra todas las imágenes de animales disponibles. Haz clic en el tema "Comida" para vocabulario de alimentos. Los temas de "Números" crean fichas de matemáticas visuales. Cada tema incluye docenas de imágenes de alta calidad.

Para control total, selecciona imágenes individuales de la biblioteca. Busca "abecedario" para encontrar letras específicas. Filtra por "colores" para crear ejercicios de vocabulario cromático. Combina imágenes de diferentes temas para fichas gratis personalizadas.

La opción de lista personalizada es perfecta para exámenes de ortografía. Escribe hasta 8 palabras en el área de texto. Una palabra por línea. El generador crea fichas infantil sin imágenes. Ideal para practicar listas de vocabulario semanales.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Personaliza Configuración de Fichas de Matemáticas y Grafomotricidad - Nivel de Dificultad y Opciones',
        description: `Ajusta la dificultad de tus fichas para imprimir según el nivel de tus alumnos. Selecciona cuántas palabras incluir por página: de 1 a 10 ejercicios. Para preescolar temprano, usa 2-3 palabras por ficha. Para primaria, incluye 8-10 palabras para más práctica de lectoescritura.

La configuración de dificultad es única en este generador. Elige "Sin pistas" para el desafío máximo: todas las letras revueltas. Selecciona "Fácil" para revelar la mitad de las letras en posición correcta. "Normal" muestra un cuarto de las letras. "Difícil" revela solo un sexto. Esta función de pistas progresivas permite diferenciar instrucción fácilmente.

Configura el tipo de letra para tus fichas gratis: mayúsculas o minúsculas. Preescolar generalmente usa mayúsculas para facilitar reconocimiento. Primaria practica con minúsculas para lectura real.

Selecciona colores de letras para ejercicios de grafomotricidad adicionales. "Código de colores" usa colores diferentes para vocales y consonantes. Los niños identifican patrones visuales mientras ordenan letras.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Genera tu Ficha Infantil - Vista Previa Instantánea de Ejercicios de Lectoescritura',
        description: `Haz clic en el botón "Generar" para crear tu ficha para imprimir. El generador procesa tu configuración en segundos. Las palabras se revuelven automáticamente. Las imágenes se colocan junto a cada ejercicio. El diseño se optimiza para máxima claridad.

La vista previa aparece instantáneamente en el lienzo de edición. Verifica que las palabras sean apropiadas para tus alumnos. Asegúrate de que la dificultad sea correcta. Revisa que el número de ejercicios quepa bien en la página.

Si algo no se ve perfecto, ajusta la configuración y regenera. No hay límite de regeneraciones con tu suscripción Paquete Esencial. Experimenta con diferentes niveles de dificultad. Prueba distintas combinaciones de imágenes.

La clave de respuestas se genera automáticamente cuando creas la ficha. Cambia a la pestaña "Respuestas" para ver las palabras ordenadas correctamente.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Edita Fichas Preescolar en el Lienzo - Personalización Total de Números y Abecedario',
        description: `Después de generar, personaliza cada elemento de tus fichas para imprimir directamente en el lienzo. Arrastra imágenes a nuevas posiciones. Cambia el tamaño de las letras para hacerlas más grandes o pequeñas. Rota elementos para crear diseños únicos. Todo es editable con tu ratón.

Agrega texto personalizado a tus fichas gratis haciendo clic en "Agregar Texto". Escribe instrucciones específicas para tus alumnos. Incluye el nombre de tu escuela o salón. Agrega conceptos de números junto a ejercicios de lectoescritura. Combina aprendizaje del abecedario con conteo visual.

Cambia colores de cualquier texto seleccionándolo. El selector de color te da control total. Ajusta el tamaño de fuente con el control deslizante. Selecciona entre múltiples fuentes profesionales. Agrega contornos a las letras para crear ejercicios de grafomotricidad adicionales.

Personaliza el fondo de tus fichas infantil con temas decorativos. Selecciona fondos de la biblioteca incluida. Ajusta la opacidad para que no interfiera con el contenido. Agrega marcos decorativos para fichas para imprimir más atractivas.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Descarga Fichas para Imprimir - PDF de Alta Calidad con Tablas de Multiplicar y Dibujos para Colorear',
        description: `Descarga tus fichas infantil terminadas en formato PDF o JPEG de alta resolución. Haz clic en el menú "Descargar" y selecciona tu formato preferido. PDF es ideal para imprimir directamente. JPEG funciona bien para compartir digitalmente.

La calidad de 300 DPI garantiza impresiones nítidas profesionales. Tus fichas para imprimir se ven perfectas en cualquier impresora. La alta resolución es esencial si vendes material educativo gratis en línea.

Marca la casilla "Escala de grises" antes de descargar para ahorrar tinta de color. Las fichas gratis se convierten automáticamente a blanco y negro. Esta versión es perfecta para escuelas con presupuestos limitados. Los niños pueden usar las fichas como dibujos para colorear después de completar los ejercicios.

Descarga la clave de respuestas por separado usando el mismo menú. La clave muestra todas las palabras correctamente ordenadas. Imprime múltiples copias según necesites sin cargos adicionales.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from word-scramble.md use case sections
  useCases: {
    sectionTitle: 'Ficha Gratis para Niños - Ficha para Preescolar con Imprimibles Gratis. Ficha para Niños',
    sectionDescription: 'El generador de fichas infantil sirve a diferentes tipos de educadores en México y toda Latinoamérica. Maestros de preescolar crean ejercicios de grafomotricidad diarios. Docentes de primaria generan material educativo gratis para lectoescritura. Padres homeschoolers diseñan fichas gratis personalizadas.',
    badgeText: 'Para Quién',
    readMoreLabel: 'Leer más',
    showLessLabel: 'Ver menos',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // FAQ Section - Selected FAQs from word-scramble.md
  faq: {
    sectionTitle: 'FAQ - Ficha Gratis para Niños y Ficha para Preescolar. Ficha para Niños',
    sectionDescription: 'Maestros y padres mexicanos tienen preguntas comunes sobre el generador antes de suscribirse. Esta sección responde las preguntas más frecuentes sobre fichas para imprimir de letras revueltas.',
    showMoreText: 'Ver más preguntas',
    showLessText: 'Ver menos',
    badgeText: 'FAQ',
    readMoreLabel: 'Leer más',
    showLessLabel: 'Ver menos',
    secureCheckout: 'Pago seguro',
    cancelAnytime: 'Cancela cuando quieras',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // Pricing - CORE BUNDLE for word-scramble
  pricing: {
    title: 'Paquete Esencial',
    price: '$144',
    priceInterval: '/año',
    priceSuffix: 'Facturación anual',
    benefits: [
      'Creación de fichas ilimitada',
      'Licencia comercial incluida',
      '11 idiomas soportados',
      '3000+ imágenes temáticas',
      'Calidad de impresión 300 DPI',
      'Claves de respuestas incluidas',
    ],
    ctaText: 'Comenzar Ahora',
    bundleDescription: 'Su suscripcion incluye acceso a 10 generadores de fichas:',
    bundleApps: [
      'Sumas con Imagenes',
      'Tren del Alfabeto',
      'Paginas para Colorear',
      'Fichas de Matematicas',
      'Palabras Revueltas',
      'Busca y Cuenta',
      'Emparejamiento',
      'Trazar Lineas',
      'Bingo de Imagenes',
      'Sudoku',
    ],
  },

  // Related Apps - FULL text from word-scramble.md related sections
  relatedApps: {
    sectionTitle: 'Fichas Gratis Combinar - Ficha para Niños e Imprimibles Gratis',
    sectionDescription: 'Tu suscripción Paquete Esencial incluye 10 generadores diferentes de fichas infantil. El generador de letras revueltas es solo uno de ellos. Combina múltiples tipos de fichas para imprimir para crear paquetes de aprendizaje completos.',
    ctaTitle: '¿Listo para Crear Fichas de Letras Revueltas Increíbles?',
    ctaDescription: 'Únete a miles de maestros que crean fichas profesionales. Generación ilimitada, licencia comercial incluida.',
    primaryCtaText: 'Comenzar Prueba Gratis',
    secondaryCtaText: 'Ver las 33 Aplicaciones',
    badgeText: 'Funciona Perfectamente Con',
    exploreText: 'Explorar todas las aplicaciones',
    trustBadges: {
      securePayment: 'Pago seguro',
      cancelAnytime: 'Cancela cuando quieras',
    },
    items: [], // Samples loaded dynamically from content manager
    
  },
};

export default wordScrambleEsContent;
