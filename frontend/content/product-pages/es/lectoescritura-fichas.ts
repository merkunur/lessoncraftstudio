import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Writing Worksheets - Spanish (Mexican) Content
 *
 * File: frontend/content/product-pages/es/lectoescritura-fichas.ts
 * URL: /es/apps/lectoescritura-fichas (Spanish SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Spanish/writing.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 *
 * App ID: writing-app
 * PRICING: Full Access ($240/year or $25/month)
 */

export const writingEsContent: ProductPageContent = {
  // SEO Metadata - Spanish language-specific
  seo: {
    slug: 'lectoescritura-fichas',
    appId: 'writing-app',
    title: 'Fichas de Lectoescritura para Imprimir | Generador de Fichas de Caligrafía y Abecedario para Preescolar',
    description: 'Crea fichas profesionales de lectoescritura y caligrafía con nuestro generador de fichas para imprimir. Genera fichas preescolar personalizadas de abecedario, letra cursiva y números en menos de 3 minutos. Descarga material educativo gratis en PDF de alta calidad.',
    keywords: 'fichas de lectoescritura, fichas para imprimir, fichas de caligrafía, fichas preescolar, fichas infantil, abecedario, letra cursiva, letra de molde, material educativo gratis, fichas gratis, aprender las letras',
    canonicalUrl: 'https://www.lessoncraftstudio.com/es/apps/lectoescritura-fichas',
  },

  // Hero Section - FULL text from writing.md paragraphs 1-3
  hero: {
    title: 'Fichas de Grafomotricidad para Imprimir',
    subtitle: 'Generador de Fichas de Lectoescritura y Abecedario para Preescolar',
    description: `Crea fichas profesionales de grafomotricidad y lectoescritura con nuestro generador de fichas para imprimir. Tu suscripción Acceso Completo te da creación ilimitada de fichas infantil sin costos adicionales por hoja. Genera fichas preescolar personalizadas de caligrafía, abecedario y números en menos de 3 minutos. Descarga material educativo gratis en PDF de alta calidad con tipografía cursiva y de imprenta.

Nuestro generador de fichas de grafomotricidad es la herramienta perfecta para maestros de educación infantil y primaria en México. Diseña fichas para imprimir que enseñan la formación correcta de letras tanto en letra cursiva como letra de molde. Cada ficha incluye guías visuales que ayudan a los niños a desarrollar sus habilidades de lectoescritura y coordinación motora fina.

Las fichas preescolar que creas son totalmente personalizables. Agrega imágenes de nuestra biblioteca de más de 3000 ilustraciones educativas. Sube tus propias imágenes para personalizar el material educativo gratis para tus alumnos. Combina fichas de grafomotricidad con ejercicios de abecedario, números y colorear en una sola hoja. Cada ficha infantil se descarga lista para imprimir en formato PDF o JPEG profesional.`,
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

  // Sample Gallery - REAL file paths from samples/english/writing/
  samples: {
    sectionTitle: 'Ejemplos de Fichas de Grafomotricidad',
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

  // Use Cases - FULL text from writing.md use case sections
  useCases: {
    sectionTitle: 'Perfecto para Maestros y Padres - Fichas de Grafomotricidad para Cada Necesidad Educativa',
    sectionDescription: 'El generador de fichas de lectoescritura beneficia a múltiples tipos de educadores en diferentes contextos. Maestros de preescolar usan fichas infantil para enseñar formación básica de letras. Docentes de primaria crean fichas preescolar para reforzar habilidades de escritura. Padres que educan en casa generan material educativo gratis personalizado.',
    badgeText: 'Para Quién',
    readMoreLabel: 'Leer más',
    showLessLabel: 'Ver menos',
    items: [],
    ctaText: 'Comenzar Ahora',
    bundleDescription: 'Su suscripcion incluye acceso a los 33 generadores de fichas',
    bundleApps: [],
  },
};

export default writingEsContent;
