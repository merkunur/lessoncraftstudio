import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Find and Count Worksheets - Spanish (Mexican) Content
 *
 * File: frontend/content/product-pages/es/find-and-count-worksheets.ts
 * URL: /es/apps/buscar-contar-fichas (Spanish SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Spanish/find-and-count.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const findAndCountEsContent: ProductPageContent = {
  // SEO Metadata - Spanish language-specific
  seo: {
    slug: 'buscar-contar-fichas',
    appId: 'find-and-count',
    title: 'Fichas para Imprimir Veo Veo | Material Educativo Gratis para Encontrar y Contar Objetos',
    description: 'Crea fichas para imprimir de buscar y contar objetos con nuestro generador profesional. Perfecto para maestros de educación infantil y preescolar. Genera fichas gratis ilimitadas en PDF de alta calidad en menos de 3 minutos.',
    keywords: 'fichas para imprimir, veo veo, buscar y contar, fichas preescolar, fichas infantil, fichas gratis, material educativo gratis, grafomotricidad, números, ejercicios matemáticas',
    canonicalUrl: 'https://www.lessoncraftstudio.com/es/apps/buscar-contar-fichas',
  },

  // Hero Section - FULL text from find-and-count.md paragraphs 1-4
  hero: {
    title: 'Fichas para Imprimir Veo Veo',
    subtitle: 'Material Educativo Gratis para Encontrar y Contar Objetos',
    description: `Crea fichas para imprimir de buscar y contar objetos en minutos con nuestro generador profesional. Tu suscripción Paquete Esencial te da acceso a fichas gratis ilimitadas sin cargos adicionales por cada ficha. Genera fichas preescolar personalizadas perfectas para desarrollar habilidades visuales y números. Descarga fichas infantil de alta calidad en formato PDF en menos de 3 minutos.

Nuestro generador de fichas para imprimir te permite crear actividades tipo "Veo Veo" donde los niños buscan objetos escondidos en una cuadrícula llena de imágenes coloridas. Cada ficha incluye instrucciones claras para encontrar objetos específicos. Los estudiantes practican contando números mientras buscan objetos en el tablero visual. Perfecto para preescolar y primeros grados de primaria.

Las fichas infantil creadas con nuestra herramienta desarrollan múltiples habilidades simultáneamente. Los niños practican discriminación visual al buscar objetos específicos entre muchas imágenes. Desarrollan habilidades de conteo y reconocimiento de números. Siguen instrucciones de varios pasos para completar diferentes tareas. Fortalecen la motricidad fina al encerrar objetos en círculos o cuadrados. Tu suscripción incluye más de 3000 imágenes infantiles apropiadas para crear fichas gratis variadas.

El generador produce fichas para imprimir con calidad profesional de 300 DPI ideal para vender en plataformas educativas. Las fichas preescolar descargan en formato PDF o JPEG según tus necesidades. La herramienta incluye licencia comercial POD sin costo adicional en tu suscripción Paquete Esencial. Crea material educativo gratis para tu aula o para vender en Teachers Pay Teachers y Etsy.`,
    previewImageSrc: '',
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

  // Sample Gallery - REAL file paths from samples/english/find and count/
  samples: {
    sectionTitle: 'Ejemplos de Fichas Veo Veo',
    sectionDescription: 'Descarga ejemplos gratuitos para ver nuestra calidad profesional',
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

  // Use Cases - FULL text from find-and-count.md use case sections
  useCases: {
    sectionTitle: 'Perfecto para Maestros y Padres',
    sectionDescription: 'Las fichas para imprimir de buscar y contar benefician múltiples tipos de educadores. Maestros de preescolar usan estas actividades diariamente. Docentes de primaria integran búsquedas visuales en lecciones variadas. Padres homeschoolers crean planes de lección completos. Maestros de idiomas desarrollan vocabulario visual. Cada grupo encuentra valor único en estas fichas infantil versátiles.',
    badgeText: 'Para Quién',
    readMoreLabel: 'Leer más',
    showLessLabel: 'Ver menos',
    items: [],
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
    sectionTitle: 'Combina con Otros Generadores de Fichas',
    sectionDescription: 'Crea paquetes de aprendizaje completos combinando las fichas de Veo Veo con estos generadores complementarios.',
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
    items: [],
  },
};

export default findAndCountEsContent;
