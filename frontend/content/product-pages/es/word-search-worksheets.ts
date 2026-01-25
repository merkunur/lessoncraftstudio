import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Word Search Worksheets - Spanish (Mexican) Content
 *
 * File: frontend/content/product-pages/es/word-search-worksheets.ts
 * URL: /es/apps/sopa-letras-fichas (Spanish SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Spanish/wordsearch.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const wordSearchEsContent: ProductPageContent = {
  // SEO Metadata - Spanish language-specific
  seo: {
    slug: 'sopa-letras-fichas',
    appId: 'wordsearch',
    title: 'Generador de Sopas de Letras Gratis | Fichas para Imprimir Educación',
    description: 'Crea sopas de letras gratis con nuestro generador de fichas para imprimir. Perfecto para educación infantil y preescolar. Descarga PDF 300 DPI en 3 minutos.',
    keywords: 'sopa de letras, generador fichas gratis, fichas para imprimir, educación infantil, preescolar, fichas del abecedario, grafomotricidad, lectoescritura, tablas de multiplicar, dibujos para colorear',
    canonicalUrl: 'https://www.lessoncraftstudio.com/es/apps/sopa-letras-fichas',
    images: [
      {
        url: 'https://www.lessoncraftstudio.com/samples/spanish/wordsearch/sample-1.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Sopa de letras fichas gratis para imprimir - puzzles vocabulario para educación infantil',
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/spanish/wordsearch/sample-2.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Sopa de letras ficha gratis para niños - puzzles vocabulario para preescolar',
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/spanish/wordsearch/sample-3.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Sopa de letras fichas para imprimir personalizada - lista de palabras para educación infantil',
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/spanish/wordsearch/sample-4.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Generador sopa de letras gratis - fichas vocabulario para primaria',
      },
    ],
  },

  // Hero Section - FULL text from wordsearch.md paragraphs 1-3
  hero: {
    title: 'Generador de Sopas de Letras Gratis',
    subtitle: 'Fichas para Imprimir para Educación Infantil y Preescolar',
    description: `Crea sopas de letras profesionales en segundos con nuestro generador gratuito. Perfecto para maestros de educación infantil y preescolar. Genera fichas para imprimir personalizadas usando imágenes o palabras en tres clics. La versión gratuita incluye marca de agua para uso personal.

Nuestro creador de sopas de letras te ayuda a diseñar actividades educativas atractivas. Elige entre más de 3000 imágenes infantiles organizadas por tema. Cada sopa de letras se descarga como PDF o JPEG de alta calidad. Tus alumnos disfrutarán buscando palabras escondidas basadas en dibujos coloridos. La suscripción elimina la marca de agua e incluye licencia comercial.

Este generador funciona en 11 idiomas completos. Selecciona un tema como animales o transportes. La aplicación crea una sopa de letras completa con hoja de respuestas. Edita todo en el lienzo antes de descargar. Añade texto personalizado, cambia colores o sube tus propias imágenes. Genera fichas gratis ilimitadas para el aula o la educación en casa.`,
    previewImageSrc: '/samples/spanish/wordsearch/sample-1.jpeg',
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

  // Sample Gallery - REAL file paths from samples/english/wordsearch/
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
    items: [
      {
        id: 'sample-1',
        worksheetSrc: '/samples/spanish/wordsearch/sample-1.jpeg',
        answerKeySrc: '/samples/spanish/wordsearch/sample-1.jpeg',
        altText: 'Sopa de letras fichas gratis para imprimir - puzzles vocabulario para educación infantil',
        imageTitle: 'Sopa de letras fichas gratis para imprimir',
      },
      {
        id: 'sample-2',
        worksheetSrc: '/samples/spanish/wordsearch/sample-2.jpeg',
        answerKeySrc: '/samples/spanish/wordsearch/sample-2.jpeg',
        altText: 'Sopa de letras ficha gratis para niños - puzzles vocabulario para preescolar',
        imageTitle: 'Sopa de letras ficha gratis para niños',
      },
      {
        id: 'sample-3',
        worksheetSrc: '/samples/spanish/wordsearch/sample-3.jpeg',
        answerKeySrc: '/samples/spanish/wordsearch/sample-3.jpeg',
        altText: 'Sopa de letras fichas para imprimir personalizada - lista de palabras para educación infantil',
        imageTitle: 'Sopa de letras fichas para imprimir personalizada',
      },
      {
        id: 'sample-4',
        worksheetSrc: '/samples/spanish/wordsearch/sample-4.jpeg',
        answerKeySrc: '/samples/spanish/wordsearch/sample-4.jpeg',
        altText: 'Generador sopa de letras gratis - fichas vocabulario para primaria',
        imageTitle: 'Generador sopa de letras gratis',
      },
    ],
    
  },

  // Features Grid - FULL text from wordsearch.md feature sections
  features: {
    sectionTitle: 'Fichas Gratis y Ficha para Niños - Imprimibles Gratis y Ficha para Preescolar',
    sectionDescription: 'Nuestro generador de sopas de letras incluye siete características potentes. Crea fichas para imprimir profesionales más rápido que los métodos tradicionales. Personaliza cada ficha para tus alumnos.',
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

  // How-To Guide - FULL text from wordsearch.md step sections
  howTo: {
    sectionTitle: 'Ficha Gratis para Niños Crear - Ficha para Preescolar',
    sectionDescription: 'Crear sopas de letras toma menos de tres minutos. Sigue estos cinco pasos simples para generar fichas infantil profesionales. No se requiere experiencia en diseño.',
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
        title: 'Elige Tu Contenido',
        description: `Comienza seleccionando imágenes para tu sopa de letras. Tres métodos te dan flexibilidad completa. Elige un tema aleatorio para generación instantánea de fichas. Navega la biblioteca de 3000+ imágenes para imágenes específicas. Sube tus propias imágenes para fichas preescolar personalizadas. Cada método crea resultados profesionales. Los maestros cambian entre métodos según las necesidades de la lección.

La opción de tema aleatorio crea fichas en segundos. Haz clic en el menú desplegable. Selecciona "Usar Tema Aleatorio" y haz clic en generar. La aplicación escoge un tema automáticamente. Perfecto para planes de emergencia para sustitutos o actividades de último minuto. Obtienes una sopa de letras completa sin ninguna decisión. Los temas aleatorios funcionan genial para práctica general de vocabulario y actividades de tiempo libre.

La selección individual de imágenes te da control preciso. Abre el panel de biblioteca de imágenes. Elige una categoría de tema para filtrar imágenes. Animales, transporte, comida, útiles escolares y docenas de temas más disponibles. Busca por palabra clave para encontrar imágenes específicas. Selecciona hasta ocho imágenes haciendo clic en cada una. Tus imágenes seleccionadas aparecen en el área de vista previa. Este método crea fichas de lectoescritura enfocadas y materiales específicos de vocabulario.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Personaliza Ajustes',
        description: `Configura los ajustes de tu sopa de letras antes de generar. El tamaño de cuadrícula determina la dificultad del rompecabezas. Cuadrículas más pequeñas funcionan para fichas preescolar. Cuadrículas más grandes desafían a estudiantes de primaria. Ajusta filas y columnas independientemente. Configura desde 5x5 hasta 30x30 cuadros. La aplicación recuerda tus ajustes preferidos para futuras fichas.

Elige opciones de dirección del rompecabezas para controlar dificultad. Activa palabras en diagonal para desafío adicional. Permite palabras al revés para aumentar complejidad. Desactiva ambas opciones para lectores principiantes. Estos ajustes crean fichas de grafomotricidad y lectoescritura apropiadas para la edad. Los maestros de preescolar típicamente desactivan diagonal y reversa. Los maestros de primaria activan diagonal para estudiantes avanzados.

Selecciona tu formato y tamaño de página. Letter vertical funciona para aulas estadounidenses estándar. A4 vertical se ajusta a escuelas internacionales. La orientación horizontal proporciona cuadrículas de rompecabezas más anchas. Las dimensiones personalizadas acomodan necesidades especiales de impresión. El ajuste de tamaño de página afecta cómo se imprime tu sopa de letras.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Genera Tu Sopa de Letras',
        description: `Haz clic en el botón generar para crear tu sopa de letras. La aplicación construye el rompecabezas en segundos. Las palabras se colocan automáticamente en la cuadrícula. Las direcciones se asignan según tus ajustes. Las letras aleatorias llenan espacios vacíos. Tu sopa de letras completa aparece en el lienzo. El proceso de generación completo toma menos de cinco segundos.

La vista previa instantánea muestra tu sopa de letras exactamente como se imprimirá. Ves la cuadrícula de letras con palabras escondidas. La lista de palabras o imágenes aparece donde configuraste. Los fondos y bordes muestran en sus posiciones. Todos los elementos de texto se muestran con fuentes seleccionadas. Esta vista previa te permite verificar todo antes de descargar. No hay sorpresas cuando imprimes.

Si la disposición no se ve perfecta, regenera con un clic. El botón regenerar crea un nuevo rompecabezas usando las mismas configuraciones. Las palabras se colocan en diferentes posiciones. La distribución de letras cambia. Este botón te permite probar múltiples diseños. Encuentra el arreglo que se ve mejor para tus estudiantes.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Edita en el Lienzo',
        description: `Después de generar, personaliza cada elemento en el lienzo de edición. Haz clic en cualquier texto para cambiar su contenido. Selecciona diferentes fuentes del menú desplegable. Ajusta tamaños de fuente con el control deslizante. Cambia colores de texto con el selector de color. Añade contornos a las letras para mejor visibilidad. Estas herramientas de edición de texto te dan control completo.

Arrastra imágenes a nuevas posiciones con tu ratón. Haz clic y arrastra para mover elementos. Usa las manijas de esquina para cambiar el tamaño de imágenes. Rota imágenes usando el mango de rotación. Elimina imágenes que no necesitas con la tecla suprimir. Añade nuevas imágenes de la biblioteca en cualquier momento. Cada imagen se comporta como un objeto totalmente editable.

Las herramientas de capa organizan elementos superpuestos. Trae la lista de palabras al frente de imágenes de fondo. Envía bordes decorativos detrás del contenido principal. Los botones "Traer al Frente" y "Enviar Atrás" controlan el orden de apilamiento. Este control de capas previene que elementos importantes queden escondidos. Tu diseño se ve exactamente como lo planeas.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Descarga e Imprime',
        description: `Descarga tu sopa de letras terminada en dos formatos. El formato PDF preserva todo el diseño y fuentes. JPEG funciona para compartir en línea o publicar en redes sociales. Ambos formatos se exportan a resolución profesional de 300 DPI. Elige el formato que mejor se ajuste a tus necesidades. Muchos maestros descargan ambos formatos para diferentes usos.

La función de hoja de respuestas genera soluciones automáticamente. Cambia a la pestaña de hoja de respuestas antes de descargar. La hoja de respuestas resalta todas las palabras escondidas. Los estudiantes ven dónde estaba cada palabra. Los maestros usan hojas de respuestas para calificación rápida. Los padres ayudan a los niños a verificar su trabajo. La generación automática de respuestas ahorra tiempo de verificación manual.

La opción de escala de grises ahorra tinta de impresora costosa. Activa escala de grises antes de descargar. La sopa de letras se convierte a blanco y negro. Todas las imágenes y texto permanecen claramente visibles. La calidad no se degrada en modo escala de grises. Las escuelas con presupuestos limitados aprecian este ahorro.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from wordsearch.md use case sections
  useCases: {
    sectionTitle: 'Ficha Gratis para Niños - Ficha para Preescolar con Imprimibles Gratis. Ficha para Niños',
    sectionDescription: 'Nuestro generador de sopas de letras beneficia diferentes tipos de usuarios. Cada grupo encuentra valor único en la herramienta. Los maestros de educación infantil ahorran horas de preparación. Los padres crean actividades educativas en casa.',
    badgeText: 'Para Quién',
    readMoreLabel: 'Leer más',
    showLessLabel: 'Ver menos',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // FAQ Section - Selected FAQs from wordsearch.md
  faq: {
    sectionTitle: 'FAQ - Ficha Gratis para Niños y Ficha para Preescolar. Ficha para Niños',
    sectionDescription: 'Preguntas frecuentes sobre nuestro generador de sopas de letras y fichas para imprimir gratis.',
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
    sectionDescription: 'Crea paquetes de aprendizaje completos combinando las fichas de sopas de letras con estos generadores complementarios.',
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

export default wordSearchEsContent;
