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
    appId: 'writing',
    title: 'Ficha Gratis de Lectoescritura para Niños | Fichas Gratis',
    description: 'Crea fichas profesionales de lectoescritura y caligrafía con nuestro generador de fichas para imprimir. Genera fichas preescolar personalizadas de abecedario.',
    keywords: 'fichas de lectoescritura, fichas para imprimir, fichas de caligrafía, fichas preescolar, fichas infantil, abecedario, letra cursiva, letra de molde, material educativo gratis, fichas gratis, aprender las letras',
    canonicalUrl: 'https://www.lessoncraftstudio.com/es/apps/lectoescritura-fichas',
    images: [
      {
        url: 'https://www.lessoncraftstudio.com/samples/spanish/writing/sample-1.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Ficha gratis de lectoescritura para niños - ejercicios de grafomotricidad para preescolar'
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/spanish/writing/sample-2.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Ficha gratis de caligrafía para preescolar - práctica de abecedario para educación infantil'
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/spanish/writing/sample-3.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Imprimibles gratis de escritura para niños - fichas de grafomotricidad para primaria'
      },
    ],
  },

  // Hero Section - FULL text from writing.md paragraphs 1-3
  hero: {
    title: 'Ficha Gratis de Grafomotricidad para Niños - Imprimibles Gratis para Imprimir',
    subtitle: 'Generador de Ficha para Preescolar - Lectoescritura y Abecedario con Imprimibles Gratis',
    description: `Crea fichas profesionales de grafomotricidad y lectoescritura con nuestro generador de fichas para imprimir. Tu suscripción Acceso Completo te da creación ilimitada de fichas infantil sin costos adicionales por hoja. Genera fichas preescolar personalizadas de caligrafía, abecedario y números en menos de 3 minutos. Descarga material educativo gratis en PDF de alta calidad con tipografía cursiva y de imprenta.

Nuestro generador de fichas de grafomotricidad es la herramienta perfecta para maestros de educación infantil y primaria en México. Diseña fichas para imprimir que enseñan la formación correcta de letras tanto en letra cursiva como letra de molde. Cada ficha incluye guías visuales que ayudan a los niños a desarrollar sus habilidades de lectoescritura y coordinación motora fina.

Las fichas preescolar que creas son totalmente personalizables. Agrega imágenes de nuestra biblioteca de más de 3000 ilustraciones educativas. Sube tus propias imágenes para personalizar el material educativo gratis para tus alumnos. Combina fichas de grafomotricidad con ejercicios de abecedario, números y colorear en una sola hoja. Cada ficha infantil se descarga lista para imprimir en formato PDF o JPEG profesional.`,
    previewImageSrc: '/samples/spanish/writing/sample-1.jpeg',
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
        worksheetSrc: '/samples/spanish/writing/sample-1.jpeg',
        answerKeySrc: '/samples/spanish/writing/sample-1.jpeg',
        altText: 'Ficha gratis de lectoescritura para niños - ejercicios de grafomotricidad para preescolar',
        imageTitle: 'Ficha gratis de lectoescritura para niños',
      },
      {
        id: 'sample-2',
        worksheetSrc: '/samples/spanish/writing/sample-2.jpeg',
        answerKeySrc: '/samples/spanish/writing/sample-2.jpeg',
        altText: 'Ficha gratis de caligrafía para preescolar - práctica de abecedario para educación infantil',
        imageTitle: 'Ficha gratis de caligrafía para preescolar',
      },
      {
        id: 'sample-3',
        worksheetSrc: '/samples/spanish/writing/sample-3.jpeg',
        answerKeySrc: '/samples/spanish/writing/sample-3.jpeg',
        altText: 'Imprimibles gratis de escritura para niños - fichas de grafomotricidad para primaria',
        imageTitle: 'Imprimibles gratis de escritura para niños',
      },
    ],
    
  },

  // Features Grid - FULL text from writing.md feature sections
  features: {
    sectionTitle: 'Fichas Gratis y Ficha para Niños - Imprimibles Gratis y Ficha para Preescolar',
    sectionDescription: 'Nuestro generador de fichas de grafomotricidad incluye todas las herramientas profesionales que necesitan los maestros de educación infantil y primaria. Cada característica fue diseñada específicamente para crear fichas preescolar de alta calidad en minutos. Tu suscripción Acceso Completo te da acceso completo a todas estas funciones sin límites de creación. Genera fichas infantil ilimitadas sin costos adicionales por hoja.',
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

  // How-To Guide - FULL text from writing.md step sections
  howTo: {
    sectionTitle: 'Ficha Gratis para Niños Crear - Ficha para Preescolar',
    sectionDescription: 'Crear fichas infantil profesionales de lectoescritura toma menos de 3 minutos del inicio a la descarga. Esta guía paso por paso te muestra exactamente cómo generar fichas preescolar perfectas para tus alumnos. No necesitas habilidades de diseño. El generador hace todo el trabajo técnico.',
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
        title: 'Seleccionar Imagen y Configurar Página - Ficha Gratis para Niños de Abecedario y Números',
        description: `Comienza eligiendo el tamaño de página para tus fichas infantil. Selecciona entre Carta Vertical (8.5×11"), Carta Horizontal (11×8.5"), A4 Vertical o A4 Horizontal. Las escuelas mexicanas típicamente usan tamaño Carta. Escoge orientación vertical para fichas de grafomotricidad tradicionales. Selecciona horizontal para filas más largas con más espacio de práctica.

Agrega un fondo decorativo a tus fichas para imprimir si lo deseas. El generador incluye docenas de temas de fondo organizados por categoría. Los fondos temáticos hacen las fichas preescolar más atractivas visualmente para niños pequeños. Ajusta la opacidad del fondo entre 0% y 100%. Selecciona un borde decorativo para enmarcar la página.

Opcionalmente selecciona una imagen de ejercicio de la biblioteca. Explora más de 3000 imágenes organizadas por tema. Usa la barra de búsqueda para encontrar imágenes específicas escribiendo palabras clave en español.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Agregar Filas de Grafomotricidad - Crear Ficha para Preescolar con Abecedario e Imprimibles Gratis',
        description: `Haz clic en el botón "Agregar Fila" para crear tu primera fila de práctica. Aparece un panel de configuración con todas las opciones para esa fila. Puedes agregar tantas filas como quepan en tu página. Cada fila puede tener configuración completamente diferente. Una ficha para imprimir puede combinar práctica de abecedario mayúsculo en la fila 1, números del 0-9 en la fila 2, y letra cursiva minúscula en la fila 3.

Selecciona el tipo de fila entre tres opciones. "Calcar" muestra letras completas y sólidas para que los niños tracen encima. "Calcar Difuminado" presenta letras semi-transparentes que proporcionan guía pero requieren más independencia. "Copia Guiada" muestra la primera letra completamente sólida seguida de letras difuminadas para el resto de la fila.

Escoge el estilo de fuente entre cinco opciones. "Letra de Molde Regular" usa letras estándar sin adornos direccionales. "Letra de Molde con Flechas" agrega flechas que muestran dirección y orden de trazos. "Letra Punteada" presenta letras con contorno punteado perfecto para calcar. "Letra Cursiva" usa tipografía elegante para enseñar escritura conectada.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Generar y Previsualizar tu Ficha Gratis para Niños - Vista Instantánea de Imprimibles Gratis',
        description: `Después de configurar cada fila, tus fichas de grafomotricidad se generan automáticamente en el lienzo central. No hay botón de "generar" separado que presionar. Cada cambio que haces actualiza instantáneamente la vista previa. Ves exactamente cómo se verán tus fichas para imprimir antes de descargar. Esta previsualización en tiempo real elimina sorpresas y ahorra tiempo.

Las filas de lectoescritura aparecen con guías horizontales perfectamente espaciadas. La guía superior marca la altura máxima de letras mayúsculas. La guía media indica dónde se encuentran letras minúsculas cortas. La guía inferior define la base de todas las letras. Estas tres guías enseñan proporción correcta de letras.

Las letras para calcar aparecen en el color y opacidad que especificaste. Verifica que las letras sean suficientemente visibles para que los niños las vean claramente.`,
        icon: '👀',
      },
      {
        id: '4',
        number: 4,
        title: 'Editar en el Lienzo - Personalizar Ficha para Niños de Abecedario con Imprimibles Gratis',
        description: `Ahora personaliza el diseño arrastrando y redimensionando elementos. Haz clic en cualquier fila de lectoescritura para seleccionarla. Aparecen controles de esquina para redimensionamiento. Arrastra una esquina para hacer la fila más grande o pequeña. Las guías horizontales y letras se escalan proporcionalmente automáticamente.

Arrastra filas hacia arriba o abajo para reorganizar. Deja espacio entre filas para que los niños dibujen ilustraciones relacionadas. Las fichas infantil con espacio de dibujo combinan grafomotricidad con arte. Crea fichas gratis que integran aprender las letras del abecedario con dibujos para colorear temáticos.

Agrega bloques de texto personalizados a cualquier parte de la página. Escribe instrucciones para los estudiantes. Agrega el nombre del estudiante en la parte superior. Incluye la fecha o número de semana. El texto personalizado hace las fichas preescolar más organizadas y profesionales.`,
        icon: '✨',
      },
      {
        id: '5',
        number: 5,
        title: 'Descargar e Imprimir Fichas Gratis - PDF y JPEG de Alta Calidad',
        description: `Haz clic en el botón "Descargar" cuando tus fichas preescolar estén perfectas. Aparece un menú desplegable con dos opciones de formato. Selecciona "Descargar como PDF" para mejor calidad de impresión. El formato PDF mantiene nitidez perfecta sin importar el tamaño de página. Los archivos PDF funcionan universalmente en cualquier computadora o impresora.

Selecciona "Descargar como JPEG" si necesitas compartir digitalmente. Los archivos JPEG son más pequeños y se abren en cualquier dispositivo. Envía fichas infantil JPEG por correo electrónico a padres fácilmente. Súbelas a plataformas de aprendizaje en línea.

Activa la casilla "Escala de Grises" antes de descargar si quieres ahorrar tinta. Esta opción convierte todos los colores a tonos de gris. Las fichas de lectoescritura en escala de grises se imprimen con solo tinta negra. Ahorras tinta de color significativamente cuando imprimes cientos de fichas de grafomotricidad.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from writing.md use case sections
  useCases: {
    sectionTitle: 'Ficha Gratis para Niños - Ficha para Preescolar con Imprimibles Gratis. Ficha para Niños',
    sectionDescription: 'El generador de fichas de lectoescritura beneficia a múltiples tipos de educadores en diferentes contextos. Maestros de preescolar usan fichas infantil para enseñar formación básica de letras. Docentes de primaria crean fichas preescolar para reforzar habilidades de escritura. Padres que educan en casa generan material educativo gratis personalizado.',
    badgeText: 'Para Quién',
    readMoreLabel: 'Leer más',
    showLessLabel: 'Ver menos',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // FAQ Section - FULL text from writing.md FAQ sections
  faq: {
    sectionTitle: 'FAQ - Ficha Gratis para Niños y Ficha para Preescolar. Ficha para Niños',
    sectionDescription: 'Los maestros y padres tienen preguntas comunes sobre el generador de fichas infantil antes de suscribirse. Esta sección responde las 12 preguntas más frecuentes sobre crear fichas preescolar de caligrafía y escritura.',
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
    sectionDescription: 'Tu suscripción Acceso Completo incluye acceso a los 33 generadores de fichas para imprimir en la plataforma. El generador de fichas de lectoescritura funciona perfectamente con otros 32 generadores. Combina fichas infantil de escritura con generadores de matemáticas, dibujos para colorear, juegos educativos y más.',
    ctaTitle: '¿Listo para Crear Fichas de Grafomotricidad Increíbles?',
    ctaDescription: 'Únete a miles de educadores que crean fichas para imprimir profesionales con nuestros 33 generadores de hojas de trabajo.',
    primaryCtaText: 'Comenzar Prueba Gratis',
    secondaryCtaText: 'Ver las 33 Aplicaciones',
    badgeText: 'Combina Perfectamente Con',
    exploreText: 'Explorar todas las apps',
    trustBadges: {
      securePayment: 'Pago seguro',
      cancelAnytime: 'Cancela cuando quieras',
    },
    items: [], // Samples loaded dynamically from content manager
    
  },

  // Pricing Section - Full Access ($240/year)
  pricing: {
    title: 'Acceso Completo',
    price: '$240',
    priceInterval: '/año',
    priceSuffix: 'Facturado anualmente - Solo $25/mes',
    benefits: [
      'Acceso a los 33 generadores de fichas',
      'Creación ilimitada de fichas',
      'Biblioteca de 3000+ imágenes',
      'Soporte de 11 idiomas',
      'Licencia comercial POD incluida',
      'Exportación de 300 DPI',
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

export default writingEsContent;
