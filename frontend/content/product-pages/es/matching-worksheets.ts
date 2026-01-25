import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Matching Worksheets - Spanish (Mexican) Content
 *
 * File: frontend/content/product-pages/es/matching-worksheets.ts
 * URL: /es/apps/relacionar-fichas (Spanish SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Spanish/matching.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 *
 * Bundle: Paquete Esencial ($144/year)
 * App ID: matching-app
 */

export const matchingEsContent: ProductPageContent = {
  // SEO Metadata - Spanish language-specific
  seo: {
    slug: 'relacionar-fichas',
    appId: 'matching',
    title: 'Fichas de Relacionar Gratis para Imprimir | Generador Preescolar',
    description: 'Crea fichas de relacionar profesionales con nuestro generador gratuito. Fichas para imprimir personalizadas para preescolar y primaria. Descarga PDF en 3 min.',
    keywords: 'fichas para imprimir, fichas preescolar, fichas infantil, material educativo gratis, relacionar columnas, grafomotricidad, lectoescritura, abecedario, fichas de matemáticas, tablas de multiplicar',
    canonicalUrl: 'https://www.lessoncraftstudio.com/es/apps/relacionar-fichas',
      },

  // Hero Section - FULL text from matching.md paragraphs 1-6
  hero: {
    title: 'Fichas para Imprimir de Relacionar',
    subtitle: 'Fichas Preescolar y Material Educativo Gratis para Lectoescritura',
    description: `Crea fichas para imprimir profesionales de relacionar columnas con nuestro generador de fichas educativas. Tu suscripción al Paquete Esencial te da acceso ilimitado para crear fichas preescolar y fichas infantil sin costos adicionales por ficha. Genera fichas de relacionar personalizadas perfectas para preescolar, primer grado y segundo grado. Descarga fichas para imprimir de alta calidad en formato PDF en menos de 3 minutos.

Nuestro generador de fichas ofrece cuatro modos diferentes de relacionar. Conecta imágenes con letras iniciales para practicar el abecedario y aprender las letras. Relaciona imágenes con palabras para lectoescritura y desarrollo de vocabulario. Crea ejercicios de números y aprender los números con pares personalizados. Usa el modo personalizado para conectar imágenes con cualquier texto que necesites.

Cada ficha para imprimir es completamente editable. Arrastra, rota y escala cualquier elemento en el lienzo. Cambia colores, fuentes y tamaños de texto. Agrega tus propias imágenes personalizadas junto con las 3000+ imágenes de nuestra biblioteca. Crea fichas preescolar únicas que se adapten perfectamente a las necesidades de tus alumnos.

El generador funciona para grafomotricidad y preparación para escritura. Usa las fichas de relacionar para que los niños practiquen trazar líneas rectas conectando elementos. Combina con fichas de matemáticas para relacionar números con cantidades. Integra con dibujos para colorear creando fichas temáticas completas. El material educativo gratis que buscas está incluido en tu suscripción.

Tu suscripción al Paquete Esencial cuesta $144 anuales o $15 mensuales. Incluye acceso a 10 generadores populares de fichas. Crea fichas gratis ilimitadas sin límite de descargas. Todas las fichas para imprimir se exportan en 300 DPI de calidad profesional. Perfectas para imprimir en casa o vender en plataformas educativas.

El generador incluye soporte para 11 idiomas. Perfecto para clases bilingües de español-inglés. Los nombres de las imágenes cambian según el idioma seleccionado. Esto hace que las fichas para imprimir funcionen naturalmente para enseñanza de inglés como segundo idioma. Cambia entre español e inglés con un clic.`,
    previewImageSrc: '/samples/spanish/matching/sample-1.jpeg',
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

  // Sample Gallery - REAL file paths from samples/english/matching/
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

  // Features Grid - FULL text from matching.md feature sections
  features: {
    sectionTitle: 'Fichas Gratis y Ficha para Niños - Imprimibles Gratis y Ficha para Preescolar',
    sectionDescription: 'Nuestro generador de fichas para imprimir ofrece todas las herramientas que necesitas para crear material educativo gratis profesional. Cada característica está diseñada para maestros ocupados. Crea fichas infantil en minutos, no en horas. Todas las funciones trabajan juntas para facilitar tu trabajo.',
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

  // How-To Guide - FULL text from matching.md step sections
  howTo: {
    sectionTitle: 'Ficha Gratis para Niños Crear - Ficha para Preescolar',
    sectionDescription: 'Crear fichas para imprimir profesionales toma menos de 3 minutos. No necesitas experiencia en diseño. El generador hace el trabajo pesado. Tú decides el contenido y la apariencia. Sigue estos cinco pasos simples para tener tus fichas preescolar listas.',
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
        title: 'Elige tu Contenido - Fichas Infantil con el Abecedario, Números y Dibujos para Colorear',
        description: `Abre el generador y selecciona el modo de relacionar. Tienes cuatro opciones diferentes. Cada modo crea un tipo diferente de ficha para imprimir.

El modo "Imagen ↔ Letra Inicial" crea fichas para practicar el abecedario. Perfecto para preescolar y primer grado. Las imágenes se relacionan con su letra inicial. Los niños conectan A con Avión, B con Ballena. Este modo enseña aprender las letras de forma visual.

El modo "Imagen+Palabra ↔ Imagen+Palabra" muestra ambas columnas con imagen y texto. Los estudiantes relacionan pares idénticos. Excelente para reconocimiento visual y lectoescritura. Los niños ven la palabra mientras hacen la conexión.

El modo "Imagen/Palabra ↔ Imagen/Palabra" es el más flexible. Una columna puede tener solo imágenes. La otra solo palabras. O mezcla ambas. Úsalo para fichas infantil creativas donde los niños relacionan conceptos diferentes.

El modo "Imagen ↔ Palabra Personalizada" te da control total. Escribe cualquier palabra que necesites. Relaciona manzana con "fruta". Conecta números con sus nombres escritos. Perfecto para fichas de matemáticas donde relacionas operaciones con resultados. También funciona para tablas de multiplicar relacionando "3×4" con "12".

La biblioteca tiene más de 3000 imágenes organizadas por temas. Encuentra imágenes para el abecedario completo. Incluye números del 0 al 100. Hay dibujos para colorear con líneas claras. Usa el buscador para encontrar imágenes específicas rápidamente.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Personaliza la Configuración - Fichas de Matemáticas, Grafomotricidad y Tablas de Multiplicar',
        description: `Configura los ajustes antes de generar. Estos controlan cómo se ve tu ficha para imprimir.

Selecciona el tamaño de página. Carta Vertical funciona para la mayoría de maestros mexicanos. Carta Horizontal da más espacio horizontal. A4 Vertical y Horizontal funcionan en escuelas con impresoras europeas. Cuadrado crea diseños únicos. Personalizado te deja ingresar dimensiones exactas.

Decide si incluir campos de nombre y fecha. Activa esta opción para fichas preescolar que los niños llevan a casa. Los padres ven el nombre y fecha del trabajo. Desactívala para fichas infantil que usas solo en clase.

La opción de números de ejercicio numera cada par. "1. ___ 2. ___ 3. ___" aparece junto a cada elemento. Esto ayuda cuando revisas respuestas. Desactívala si no necesitas números.

La opción de puntos o viñetas muestra puntos guía. Los niños ven dónde empezar cada línea. Perfecto para actividades de grafomotricidad. Los puntos ayudan a niños pequeños. Desactívalos para estudiantes mayores que no necesitan guías.

Ajusta el número máximo de pares. Entre 4 y 12 pares funciona bien. Menos pares para preescolar. Más pares para segundo y tercer grado. Fichas de matemáticas con 8-10 pares funcionan bien. Tablas de multiplicar pueden tener hasta 12 pares.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Genera tu Ficha para Imprimir - Fichas Preescolar de Lectoescritura Listas en Segundos',
        description: `Haz clic en el botón "Generar Ficha". El sistema trabaja inmediatamente. Tu ficha para imprimir aparece en el lienzo en menos de 5 segundos.

El generador organiza las imágenes automáticamente. Las coloca en dos columnas. La columna izquierda tiene los elementos a relacionar. La columna derecha tiene las respuestas mezcladas. Los estudiantes trazan líneas conectando pares correctos.

Cada elemento tiene un número o punto guía. Esto ayuda a los estudiantes a seguir orden. También facilita la revisión del maestro. Las instrucciones aparecen en la parte superior. Todo está listo para usar.

La ficha para imprimir ya está balanceada visualmente. El espaciado es uniforme. Las imágenes tienen el tamaño apropiado. El texto es legible. No necesitas ajustar nada si no quieres.

El sistema también genera la clave de respuestas automáticamente. Haz clic en la pestaña "Clave de Respuestas". Ves la misma ficha con las líneas correctas dibujadas. Esto ahorra tiempo al calificar. Las fichas preescolar de lectoescritura vienen con respuestas incluidas.

Si seleccionaste "Tema Aleatorio", el generador eligió un tema coherente. Todas las imágenes se relacionan. Esto hace fichas infantil más educativas. Los estudiantes aprenden vocabulario temático mientras practican.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Edita en el Lienzo - Personaliza Fichas Infantil y Material Educativo Gratis',
        description: `Ahora personaliza tu ficha para imprimir. Todo en el lienzo es editable. Haz clic en cualquier elemento para seleccionarlo.

Mueve imágenes arrastrándolas. Cambia el espaciado entre columnas. Esto ajusta la dificultad de grafomotricidad. Columnas más separadas requieren líneas más largas. Los niños pequeños necesitan espacios más cortos. Tú controlas la dificultad.

Rota imágenes si lo necesitas. Algunas imágenes se ven mejor en ángulos. Esto también hace la ficha para imprimir más interesante visualmente. Los niños mantienen más atención con diseños variados.

Cambia el tamaño de cualquier imagen. Haz más grande la imagen principal. Reduce imágenes menos importantes. Esto guía la atención de los estudiantes. Las fichas preescolar funcionan mejor con jerarquía visual clara.

Haz clic en texto para editarlo. Cambia las instrucciones al español que usas en tu clase. Modifica los títulos. Agrega tu nombre o el de la escuela. Las fichas infantil personalizadas se sienten más profesionales.

Usa las herramientas de alineación. Alinea múltiples elementos a la vez. Centra todo en la página. Distribuye elementos uniformemente. Esto hace diseños más limpios y profesionales.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Descarga e Imprime - Fichas para Imprimir con Grafomotricidad y Aprender las Letras',
        description: `Tu ficha para imprimir está lista. Ahora descárgala en formato de alta calidad.

Haz clic en el menú de descarga. Ves cuatro opciones principales. "Ficha (JPEG)" descarga la ficha principal. "Clave de Respuestas (JPEG)" descarga las respuestas. "Ficha (PDF)" y "Clave de Respuestas (PDF)" dan formato PDF.

JPEG funciona bien para compartir digitalmente. Envía por WhatsApp a los padres. Sube a Google Classroom. El archivo es más pequeño. Se carga rápido en dispositivos móviles.

PDF funciona mejor para imprimir. El formato preserva la calidad exacta. No hay compresión. Las fichas preescolar se imprimen exactamente como las ves. El PDF es ideal para imprimir múltiples copias en la escuela.

Activa la opción de escala de grises antes de descargar. Esto convierte todo a blanco y negro. Ahorra mucha tinta de color. Perfecto cuando imprimes 30 copias para toda la clase. Las fichas infantil aún son claras en gris.

La escala de grises también crea dibujos para colorear automáticamente. Las imágenes en gris invitan a los niños a colorear. Combinas lectoescritura con arte. Una actividad se convierte en dos. Los estudiantes completan la ficha, luego la colorean.

Todas las descargas son 300 DPI. Esta es calidad profesional. Perfecta para imprimir. Perfecta para vender. Los bordes son nítidos. Las imágenes claras. El texto legible. Las fichas para imprimir lucen como material comercial.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from matching.md use case sections
  useCases: {
    sectionTitle: 'Ficha Gratis para Niños - Ficha para Preescolar con Imprimibles Gratis. Ficha para Niños',
    sectionDescription: 'Las fichas para imprimir de relacionar funcionan para muchos tipos de educadores. Cada grupo encuentra valor único. El generador se adapta a diferentes estilos de enseñanza. Maestros de preescolar hasta tercer grado usan estas fichas. Padres homeschoolers y maestros emprendedores también. Las necesidades son diferentes pero el generador sirve a todos.',
    badgeText: 'Para Quién',
    readMoreLabel: 'Leer más',
    showLessLabel: 'Ver menos',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // FAQ Section - Selected FAQs from matching.md
  faq: {
    sectionTitle: 'FAQ - Ficha Gratis para Niños y Ficha para Preescolar. Ficha para Niños',
    sectionDescription: 'Preguntas frecuentes sobre nuestro generador de fichas de relacionar y fichas para imprimir gratis.',
    showMoreText: 'Ver más preguntas',
    showLessText: 'Ver menos',
    badgeText: 'FAQ',
    readMoreLabel: 'Leer más',
    showLessLabel: 'Ver menos',
    secureCheckout: 'Pago seguro',
    cancelAnytime: 'Cancela cuando quieras',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // Pricing
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
      'Hojas de respuestas incluidas',
      '10 generadores de fichas populares',
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

  // Related Apps
  relatedApps: {
    sectionTitle: 'Fichas Gratis Combinar - Ficha para Niños e Imprimibles Gratis',
    sectionDescription: 'Crea paquetes de aprendizaje completos combinando las fichas de relacionar con estos generadores complementarios.',
    ctaTitle: '¿Listo para Crear Fichas Increíbles?',
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

export default matchingEsContent;
