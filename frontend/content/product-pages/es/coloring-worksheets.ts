import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Coloring Worksheets - Spanish (Mexican) Content
 *
 * File: frontend/content/product-pages/es/coloring-worksheets.ts
 * URL: /es/apps/dibujos-colorear-fichas
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Spanish/coloring.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized for Mexican Spanish market
 */

export const coloringEsContent: ProductPageContent = {
  // SEO Section - Required for all product pages
  seo: {
    appId: 'coloring',
    slug: 'dibujos-colorear-fichas',
    title: 'Dibujos para Colorear Gratis | Creador de Fichas para Imprimir - Preescolar y Primaria',
    description: 'Crea dibujos para colorear profesionales con nuestro generador de páginas de colorear. Tu suscripción Paquete Esencial te permite crear fichas para imprimir ilimitadas. Genera material educativo gratis en PDF de alta calidad para educación infantil y primaria.',
    keywords: 'dibujos para colorear, fichas para imprimir, páginas de colorear, fichas preescolar, fichas infantil, material educativo gratis, grafomotricidad, lectoescritura, abecedario para aprender las letras, ejercicios matemáticas',
    canonicalUrl: 'https://www.lessoncraftstudio.com/es/apps/dibujos-colorear-fichas',
  },

  // Hero Section - FULL text from coloring.md paragraphs 1-2
  hero: {
    title: 'Dibujos para Colorear - Fichas para Imprimir Gratis',
    subtitle: 'Creador de Páginas de Colorear para Preescolar y Primaria',
    description: `Crea dibujos para colorear profesionales con nuestro generador de páginas de colorear diseñado especialmente para maestros. Tu suscripción Paquete Esencial te permite crear fichas para imprimir ilimitadas sin cargos adicionales por cada diseño. Genera material educativo gratis en formato PDF de alta calidad perfecto para educación infantil y primaria. Descarga tus páginas de colorear personalizadas en menos de 3 minutos.

Nuestro creador de fichas infantil te da control total sobre cada elemento del diseño. Selecciona imágenes de nuestra biblioteca con más de 3000 ilustraciones amigables para niños. Arrastra y posiciona cada imagen exactamente donde la necesitas. Personaliza el tamaño de página, añade texto educativo, y crea fichas preescolar únicas para tus estudiantes. Todo el proceso es intuitivo y rápido.

Las páginas de colorear que creas son completamente editables. Cambia tamaños, rota imágenes, ajusta posiciones, y elimina elementos con simples clics. Añade campos de nombre y líneas de escritura con un solo botón. Sube tus propias imágenes para personalizar las fichas gratis según las necesidades específicas de tu grupo. Combina múltiples elementos para crear actividades de grafomotricidad y lectoescritura integradas con colorear.`,
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

  // Sample Gallery - REAL file paths from samples/english/coloring/
  samples: {
    sectionTitle: 'Ejemplos de Dibujos para Colorear',
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

  // Use Cases - FULL text from coloring.md use case sections
  useCases: {
    sectionTitle: 'Perfecto para Maestros y Educadores - Dibujos para Colorear y Fichas para Imprimir para Todas las Necesidades Educativas',
    sectionDescription: 'El creador de páginas de colorear sirve a diversos profesionales educativos desde educación infantil hasta primaria. Cada grupo encuentra aplicaciones únicas que ahorran tiempo y mejoran resultados de aprendizaje. Maestros de preescolar, docentes de primaria, padres educadores en casa, profesores de idiomas, maestros de educación especial, y emprendedores educativos todos benefician del sistema. Las herramientas flexibles se adaptan a múltiples contextos pedagógicos y estilos de enseñanza.',
    badgeText: 'Para Quién',
    readMoreLabel: 'Leer más',
    showLessLabel: 'Ver menos',
    items: [],
    ctaText: 'Comenzar a Crear Ahora',
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

  // Related Apps - In Spanish
  relatedApps: {
    sectionTitle: 'Combina con Otros Generadores de Fichas',
    sectionDescription: 'Crea paquetes de aprendizaje completos combinando dibujos para colorear con estos generadores complementarios.',
    ctaTitle: '¿Listo para Crear Fichas Increíbles?',
    ctaDescription: 'Únete a miles de educadores creando fichas profesionales. Generación ilimitada, licencia comercial incluida.',
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

export default coloringEsContent;
