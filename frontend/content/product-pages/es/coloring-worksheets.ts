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
    title: 'Dibujos para Colorear Gratis | Creador de Fichas para Imprimir',
    description: 'Crea dibujos para colorear gratis con nuestro generador de fichas para imprimir. Descarga fichas preescolar en PDF de 300 DPI en menos de 3 minutos.',
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
    previewImageSrc: '/samples/spanish/coloring/sample-1.jpeg',
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
        videoId: 'ZdpCr2txHcc',
        buttonText: 'Funciones Dibujos para Colorear',
        modalTitle: 'Tutorial Dibujos para Colorear',
      },
    },
  },

  // Sample Gallery - REAL file paths from samples/spanish/coloring/
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

  // Features Grid - FULL text from coloring.md feature sections
  features: {
    sectionTitle: 'Fichas Gratis y Ficha para Niños - Imprimibles Gratis y Ficha para Preescolar',
    sectionDescription: 'Nuestro generador de páginas de colorear incluye todas las herramientas que maestros de preescolar y primaria necesitan. Crea fichas gratis ilimitadas con tu suscripción Paquete Esencial. Cada característica está diseñada para ahorrarte tiempo mientras produces material educativo gratis de calidad profesional. Las siete funciones principales transforman cómo creas actividades de colorear para tus estudiantes.',
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

  // How-To Guide - FULL text from coloring.md step sections
  howTo: {
    sectionTitle: 'Ficha Gratis para Niños Crear - Ficha para Preescolar',
    sectionDescription: 'Crea páginas de colorear personalizadas en menos de 3 minutos. Este proceso de cinco pasos funciona para cualquier nivel educativo desde educación infantil hasta tercero de primaria. No necesitas experiencia en diseño gráfico. Cada paso es intuitivo y directo. Maestros reportan crear fichas para imprimir completas en el tiempo que toma tomar un café. La rapidez del sistema permite producir material educativo gratis variado semanalmente.',
    ctaText: 'Comenzar a Crear Ahora',
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
        title: 'Selecciona tus Imágenes - Explora la Biblioteca para Crear Dibujos para Colorear y Fichas Infantil Temáticas',
        description: `Abre el selector de temas en el panel izquierdo. El menú desplegable organiza las 3000+ imágenes por categorías educativas. Elige un tema relacionado con tu unidad actual de estudio. El sistema muestra miniaturas de todas las imágenes disponibles en ese tema. Haz clic en cualquier imagen para añadirla instantáneamente al lienzo. La imagen aparece centrada y lista para posicionar.

Usa la función de búsqueda para encontrar imágenes específicas rápidamente. Escribe palabras clave en español relacionadas con tu lección. El sistema filtra la biblioteca completa mostrando solo coincidencias relevantes. Esto es especialmente útil para actividades de lectoescritura donde necesitas imágenes que comiencen con letras específicas. Combina imágenes de diferentes temas en una sola página para crear fichas preescolar multitemáticas.

Alternativamente, haz clic en "Subir Imágenes Personalizadas" para usar tus propias fotos o dibujos. Selecciona múltiples archivos simultáneamente desde tu computadora. El sistema acepta formatos JPEG, PNG y GIF. Sube fotos de estudiantes, proyectos de clase, o mascotas escolares. Las imágenes personalizadas aparecen en una galería separada lista para usar. Combina imágenes de la biblioteca con tus uploads para crear material educativo gratis totalmente personalizado.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Configura el Tamaño y Formato - Personaliza Fichas para Imprimir según tus Necesidades de Dibujos para Colorear',
        description: `Selecciona el tamaño de página apropiado para tu región e impresora. Tamaño carta funciona perfecto para escuelas en México y Estados Unidos. Formato A4 es estándar en muchos países latinoamericanos y España. Elige orientación vertical para páginas tradicionales de colorear. Selecciona horizontal para actividades de grafomotricidad que requieren espacio amplio para trazos.

El selector de tamaño personalizado te permite crear dimensiones exactas. Ingresa ancho y alto en píxeles para necesidades específicas. Páginas cuadradas funcionan excelente para publicar en redes sociales o crear cuadernillos. Haz clic en "Aplicar Tamaño" para actualizar el lienzo con tus dimensiones elegidas. El sistema redimensiona automáticamente manteniendo todos los elementos proporcionales.

Opcionalmente añade un borde decorativo desde el selector de temas de bordes. Los bordes temáticos enmarcan tu página profesionalmente. Elige bordes relacionados con estaciones del año, festividades, o temas académicos. Los bordes se ajustan automáticamente a cualquier tamaño de página. Esta característica transforma fichas infantil simples en productos de apariencia comercial.`,
        icon: '📐',
      },
      {
        id: '3',
        number: 3,
        title: 'Organiza y Edita Elementos - Diseña Fichas Preescolar Perfectas con Herramientas de Edición para Dibujos para Colorear',
        description: `Arrastra imágenes a posiciones exactas haciendo clic y moviendo con el mouse. Organiza elementos creando composiciones equilibradas y atractivas. Elementos más importantes generalmente van en la parte superior o central. Deja espacio amplio alrededor de cada imagen para que los niños coloreen cómodamente sin salirse de las líneas.

Redimensiona cualquier imagen arrastrando las esquinas de la caja de selección. Mantén proporciones presionando mientras arrastras. Imágenes más grandes sirven como elemento focal principal. Imágenes más pequeñas funcionan como detalles decorativos o elementos de conteo. Rota imágenes usando el ícono circular de rotación. Esto añade variedad visual y evita diseños rígidos.

Ajusta la transparencia de elementos usando el control deslizante de opacidad en la barra de herramientas. Elementos semi-transparentes crean efectos de fondo sutiles. Usa "Enviar al frente" o "Enviar atrás" para controlar qué elementos aparecen encima. Elimina elementos que no funcionan haciendo clic en el ícono de basurero. El sistema incluye deshacer/rehacer ilimitados permitiéndote experimentar sin miedo.`,
        icon: '🎨',
      },
      {
        id: '4',
        number: 4,
        title: 'Añade Texto Educativo - Crea Actividades de Lectoescritura Integradas con Dibujos para Colorear y Fichas Infantil',
        description: `Haz clic en la sección "Herramientas de Texto" en el panel izquierdo. Escribe el texto que quieres añadir en el campo de entrada. Puede ser un título, instrucciones, o palabras de vocabulario relacionadas con las imágenes. Haz clic en "Añadir Texto" para insertar el texto en el lienzo. El texto aparece como elemento editable que puedes mover libremente.

Personaliza el texto seleccionándolo primero. Cambia el color usando el selector de color para coordinarlo con tu tema. Ajusta el tamaño del texto desde 8 hasta 200 píxeles según la importancia. Elige entre siete fuentes diferentes diseñadas para legibilidad infantil. Añade contornos de color al texto usando los controles de trazo. Contornos hacen que el texto destaque sobre fondos complejos.

Usa el botón "Añadir Campo de Nombre" para insertar automáticamente "Nombre: ___" formateado. Este elemento esencial aparece en la mayoría de fichas preescolar y material educativo gratis para aulas. Haz clic en "Añadir Líneas de Escritura" para insertar líneas de práctica de caligrafía. Combina estas herramientas de aula con imágenes temáticas para crear actividades completas de grafomotricidad integradas con dibujos para colorear educativos.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Descarga e Imprime - Exporta tus Fichas para Imprimir y Dibujos para Colorear en Alta Calidad Profesional',
        description: `Haz clic en el botón "Descargar" en la barra de herramientas superior. El menú desplegable muestra dos opciones de formato. Selecciona "Descargar como PDF" para mejor calidad de impresión y escalabilidad. Los archivos PDF mantienen nitidez perfecta a cualquier tamaño. Elige "Descargar como JPEG" para compartir digitalmente o enviar por correo electrónico a familias.

Activa la casilla "Escala de Grises" antes de descargar para convertir automáticamente a blanco y negro. Esta opción ahorra tinta de color significativamente en impresoras escolares. Las imágenes en escala de grises mantienen todos los detalles pero imprimen usando solo tinta negra. Especialmente útil cuando imprimes múltiples copias para toda la clase.

El archivo se descarga inmediatamente a tu carpeta de descargas con nombre descriptivo automático. Abre el archivo para verificar que todo se ve correcto. Imprime una copia de prueba en papel regular antes de imprimir múltiples copias. Ajusta configuraciones de impresora para mejor calidad seleccionando "Alta calidad" o "Mejor" en las opciones. La calidad profesional de 300 DPI asegura que tus fichas infantil se vean tan buenas como material comercial publicado.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from coloring.md use case sections
  useCases: {
    sectionTitle: 'Ficha Gratis para Niños - Ficha para Preescolar con Imprimibles Gratis. Ficha para Niños',
    sectionDescription: 'El creador de páginas de colorear sirve a diversos profesionales educativos desde educación infantil hasta primaria. Cada grupo encuentra aplicaciones únicas que ahorran tiempo y mejoran resultados de aprendizaje. Maestros de preescolar, docentes de primaria, padres educadores en casa, profesores de idiomas, maestros de educación especial, y emprendedores educativos todos benefician del sistema. Las herramientas flexibles se adaptan a múltiples contextos pedagógicos y estilos de enseñanza.',
    badgeText: 'Para Quién',
    readMoreLabel: 'Leer más',
    showLessLabel: 'Ver menos',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // FAQ Section - Selected FAQs from coloring.md
  faq: {
    sectionTitle: 'FAQ - Ficha Gratis para Niños y Ficha para Preescolar. Ficha para Niños',
    sectionDescription: 'Educadores tienen preguntas comunes sobre funcionalidad, costos, y aplicaciones pedagógicas del generador. Esta sección responde las doce preguntas más frecuentes que maestros de preescolar y primaria hacen. Las respuestas aclaran capacidades del sistema y ayudan a decidir si la herramienta se ajusta a tus necesidades específicas de enseñanza.',
    showMoreText: 'Mostrar más preguntas',
    showLessText: 'Mostrar menos',
    badgeText: 'Preguntas Frecuentes',
    readMoreLabel: 'Leer más',
    showLessLabel: 'Ver menos',
    secureCheckout: 'Pago seguro',
    cancelAnytime: 'Cancela cuando quieras',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // Pricing - In Spanish with Paquete Esencial
  pricing: {
    title: 'Paquete Esencial',
    price: '$144',
    priceInterval: '/año',
    priceSuffix: 'Facturado anualmente',
    benefits: [
      'Creación ilimitada de fichas',
      'Licencia comercial incluida',
      '11 idiomas disponibles',
      '3000+ imágenes temáticas',
      'Calidad de impresión 300 DPI',
      'Sube tus propias imágenes',
    ],
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
    sectionTitle: 'Fichas Gratis Combinar - Ficha para Niños e Imprimibles Gratis',
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
    items: [], // Samples loaded dynamically from content manager
    
  },
};

export default coloringEsContent;
