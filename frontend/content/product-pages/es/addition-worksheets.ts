import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Addition Worksheets - Spanish (Mexican) Content
 *
 * File: frontend/content/product-pages/es/addition-worksheets.ts
 * URL: /es/apps/suma-fichas (Spanish SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Spanish/addition.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const additionEsContent: ProductPageContent = {
  // SEO Metadata - Spanish language-specific
  seo: {
    slug: 'suma-fichas',
    appId: 'addition',
    title: 'Fichas de Sumas para Imprimir | Generador de Ejercicios de Matemáticas para Educación Infantil y Primaria',
    description: 'Crea fichas de sumas profesionales con imágenes usando nuestro generador de ejercicios matemáticas. Genera fichas para imprimir personalizadas perfectas para preescolar y primaria. Descarga fichas gratis en PDF de alta calidad en menos de 3 minutos.',
    keywords: 'fichas de sumas, fichas para imprimir, ejercicios matemáticas, fichas de matemáticas, fichas infantil, fichas preescolar, grafomotricidad, lectoescritura, aprender los números, tablas de multiplicar, dibujos para colorear, fichas gratis, material educativo gratis',
    canonicalUrl: 'https://www.lessoncraftstudio.com/es/apps/suma-fichas',
  },

  // Hero Section - FULL text from addition.md paragraphs 1-3
  hero: {
    title: 'Fichas de Sumas para Imprimir',
    subtitle: 'Generador de Ejercicios de Matemáticas para Educación Infantil y Primaria',
    description: `Crea fichas de sumas profesionales con imágenes usando nuestro generador de ejercicios matemáticas. Tu suscripción Paquete Esencial te da acceso ilimitado a la creación de fichas para imprimir sin cargos por cada ficha. Genera fichas de matemáticas personalizadas perfectas para preescolar y los primeros grados de primaria. Descarga fichas gratis en PDF de alta calidad en menos de 3 minutos.

Nuestro generador de fichas de sumas utiliza más de 3000 imágenes infantiles para hacer que el aprendizaje de matemáticas sea divertido y visual. Los niños aprenden mejor cuando pueden contar objetos reales en lugar de solo números abstractos. Cada ficha de matemáticas incluye imágenes coloridas que los estudiantes pueden contar, ayudándoles a comprender los conceptos de suma de manera natural y entretenida.

El generador crea fichas para imprimir completamente personalizables en segundos. Selecciona temas de imágenes, ajusta la dificultad cambiando el rango de números, elige el tamaño de página y descarga tus ejercicios matemáticas listos para usar. Perfecto para maestros de educación infantil, docentes de primaria, padres educadores en casa y profesionales que venden material educativo en plataformas como Teachers Pay Teachers y Etsy.`,
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

  // Sample Gallery - REAL file paths from samples/english/addition/
  samples: {
    sectionTitle: 'Ejemplos de Fichas de Sumas',
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

  // Use Cases - FULL text from addition.md use case sections
  useCases: {
    sectionTitle: 'Perfecto para Maestros, Padres y Educadores - Fichas para Imprimir de Matemáticas para Cada Necesidad Educativa',
    sectionDescription: 'Nuestro generador de ejercicios matemáticas sirve a educadores en múltiples contextos. Maestros de escuelas públicas y privadas lo usan diariamente. Padres educadores en casa crean planes de estudio completos. Maestros de educación especial adaptan materiales para necesidades individuales. Profesores de educación bilingüe enseñan en múltiples idiomas. Emprendedores educativos construyen negocios vendiendo material educativo gratis personalizado.',
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

  // Related Apps - FULL text from addition.md related sections
  relatedApps: {
    sectionTitle: 'Combina con Otros Generadores de Fichas - Paquetes Completos de Material Educativo Gratis',
    sectionDescription: 'Tu suscripción Paquete Esencial incluye 10 generadores diferentes de fichas infantil. El generador de sumas es solo uno de ellos. Combina múltiples tipos de fichas para imprimir para crear paquetes de aprendizaje completos.',
    ctaTitle: '¿Listo para Crear Fichas de Matemáticas Increíbles?',
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

export default additionEsContent;
