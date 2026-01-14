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
    appId: 'word-search',
    title: 'Generador de Sopas de Letras Gratis | Fichas para Imprimir Educación Infantil y Preescolar',
    description: 'Crea sopas de letras profesionales con nuestro generador de fichas gratis. Perfecto para maestros de educación infantil y preescolar. Genera fichas para imprimir personalizadas en PDF de alta calidad en menos de tres minutos.',
    keywords: 'sopa de letras, generador fichas gratis, fichas para imprimir, educación infantil, preescolar, fichas del abecedario, grafomotricidad, lectoescritura, tablas de multiplicar, dibujos para colorear',
    canonicalUrl: 'https://www.lessoncraftstudio.com/es/apps/sopa-letras-fichas',
  },

  // Hero Section - FULL text from wordsearch.md paragraphs 1-3
  hero: {
    title: 'Generador de Sopas de Letras Gratis',
    subtitle: 'Fichas para Imprimir para Educación Infantil y Preescolar',
    description: `Crea sopas de letras profesionales en segundos con nuestro generador gratuito. Perfecto para maestros de educación infantil y preescolar. Genera fichas para imprimir personalizadas usando imágenes o palabras en tres clics. La versión gratuita incluye marca de agua para uso personal.

Nuestro creador de sopas de letras te ayuda a diseñar actividades educativas atractivas. Elige entre más de 3000 imágenes infantiles organizadas por tema. Cada sopa de letras se descarga como PDF o JPEG de alta calidad. Tus alumnos disfrutarán buscando palabras escondidas basadas en dibujos coloridos. La suscripción elimina la marca de agua e incluye licencia comercial.

Este generador funciona en 11 idiomas completos. Selecciona un tema como animales o transportes. La aplicación crea una sopa de letras completa con hoja de respuestas. Edita todo en el lienzo antes de descargar. Añade texto personalizado, cambia colores o sube tus propias imágenes. Genera fichas gratis ilimitadas para el aula o la educación en casa.`,
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

  // Sample Gallery - REAL file paths from samples/english/wordsearch/
  samples: {
    sectionTitle: 'Ejemplos de Sopas de Letras',
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

  // Use Cases - FULL text from wordsearch.md use case sections
  useCases: {
    sectionTitle: 'Perfecto para Maestros y Padres',
    sectionDescription: 'Nuestro generador de sopas de letras beneficia diferentes tipos de usuarios. Cada grupo encuentra valor único en la herramienta. Los maestros de educación infantil ahorran horas de preparación. Los padres crean actividades educativas en casa.',
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
    items: [],
  },
};

export default wordSearchEsContent;
