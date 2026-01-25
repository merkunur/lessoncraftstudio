import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Crossword Worksheets - Spanish (Mexican) Content
 *
 * File: frontend/content/product-pages/es/crucigramas-imagenes-fichas.ts
 * URL: /es/apps/crucigramas-imagenes-fichas (Spanish SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Spanish/crossword.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const crosswordEsContent: ProductPageContent = {
  // SEO Metadata - Spanish language-specific
  seo: {
    slug: 'crucigramas-imagenes-fichas',
    appId: 'crossword',
    title: 'Crucigramas con Imágenes Gratis | Fichas para Preescolar',
    description: 'Crea crucigramas con imágenes en minutos. Genera fichas para imprimir gratis para preescolar y primaria. Descarga en PDF o JPEG. 3000+ imágenes incluidas.',
    keywords: 'crucigramas con imágenes, fichas para imprimir, crucigramas educativos, fichas preescolar, fichas infantil, material educativo gratis, lectoescritura, grafomotricidad, abecedario, vocabulario',
    canonicalUrl: 'https://www.lessoncraftstudio.com/es/apps/crucigramas-imagenes-fichas',
      },

  // Hero Section - FULL text from crossword.md paragraphs 1-5
  hero: {
    title: 'Crucigramas con Imágenes',
    subtitle: 'Fichas para Imprimir Gratis - Generador de Crucigramas para Preescolar y Primaria',
    description: `Crea crucigramas educativos con imágenes en minutos usando nuestro generador profesional. Tu suscripción Acceso Completo te da acceso ilimitado a todas las herramientas por $240 al año ($25 mensuales). Genera fichas para imprimir personalizadas perfectas para educación infantil, preescolar y primaria. Descarga crucigramas de alta calidad en formato PDF o JPEG en menos de 3 minutos.

Los crucigramas con imágenes son perfectas fichas educativas para enseñar lectoescritura y vocabulario. Los niños resuelven el crucigrama usando las imágenes como pistas visuales. Cada imagen representa una palabra que deben escribir en el crucigrama. Este método combina el reconocimiento visual con la práctica de escritura.

Nuestro generador crea crucigramas automáticamente desde una biblioteca de más de 3000 imágenes educativas. Selecciona un tema completo o escoge imágenes individuales. El sistema genera el crucigrama con las palabras entrecruzadas correctamente. Puedes personalizar todo en el lienzo antes de descargar. Agrega fondos, bordes, texto y tus propias imágenes.

Cada crucigrama incluye una hoja de respuestas con las soluciones. Perfecto para maestros de preescolar y primaria que necesitan fichas gratis para imprimir. Ideal para refuerzo de vocabulario, aprender el abecedario y practicar lectoescritura. El generador funciona en 11 idiomas con bibliotecas de imágenes específicas para cada lengua. Crea material educativo profesional sin habilidades de diseño.`,
    previewImageSrc: '/samples/spanish/crossword/sample-1.jpeg',
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

  // Sample Gallery - REAL file paths from samples/spanish/crossword/
  samples: {
    sectionTitle: 'Ficha Gratis para Niños - Fichas Gratis e Imprimibles Gratis',
    sectionDescription: 'Descarga imprimibles gratis - Ficha gratis para niños de calidad profesional. Ficha para niños perfecta para ficha para preescolar. Ficha gratis para niños y ficha para niños incluyen material educativo. Ficha gratis disponible',
    downloadLabel: 'Descargar Ejemplo Gratis',
    worksheetLabel: 'Crucigrama',
    answerKeyLabel: 'Respuestas',
    viewAllLabel: 'Ampliar',
    noPdfLabel: 'Solo vista previa',
    freePdfCountLabel: 'descargas gratis',
    badgeText: 'Ejemplos Gratis',
    downloadingLabel: 'Descargando...',
    ofLabel: 'de',
    items: [],
    
  },

  // Features Grid - FULL text from crossword.md feature sections
  features: {
    sectionTitle: 'Fichas Gratis y Ficha para Niños - Imprimibles Gratis y Ficha para Preescolar',
    sectionDescription: 'Nuestro generador de crucigramas incluye todas las herramientas que necesitas para crear fichas infantil profesionales. Tu suscripción Acceso Completo te da acceso completo a 33 herramientas educativas diferentes. Genera fichas para imprimir ilimitadas sin cargos adicionales por cada hoja. Todas las funciones están incluidas en tu suscripción de $240 al año.',
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

  // How-To Guide - FULL text from crossword.md step sections
  howTo: {
    sectionTitle: 'Ficha Gratis para Niños Crear - Ficha para Preescolar',
    sectionDescription: 'Crear crucigramas educativos con nuestro generador toma menos de 3 minutos. Sigue estos cinco pasos simples para generar fichas profesionales. No necesitas experiencia en diseño. La interfaz te guía en cada paso. Desde seleccionar contenido hasta descargar el archivo final, todo es intuitivo.',
    ctaText: 'Comenzar Ahora',
    badgeText: 'Cómo Funciona',
    stepLabel: 'Paso',
    completionTitle: '¡Listo!',
    completionSubtitle: 'Tu crucigrama está listo',
    readyTime: 'Lista en menos de 3 minutos',
    noSkillsNeeded: 'Sin conocimientos de diseño necesarios',
    readMoreLabel: 'Leer más',
    showLessLabel: 'Ver menos',
    steps: [
      {
        id: '1',
        number: 1,
        title: 'Selecciona el Contenido - Fichas Preescolar del Abecedario o Números para Grafomotricidad',
        description: `El primer paso es elegir qué imágenes aparecerán en tu crucigrama. Tienes tres opciones principales. Selecciona un tema completo de la biblioteca. Escoge imágenes individuales una por una. O activa la edición manual para personalizar los nombres.

Para seleccionar un tema completo, abre el acordeón "Biblioteca de Imágenes". En la sección "Generar desde Tema", despliega el menú. Verás temas como Animales, Alimentos, Transportes, Profesiones. Selecciona cualquier tema y automáticamente tendrás un conjunto de imágenes relacionadas.

Esta opción es perfecta para crear fichas preescolar temáticas rápidamente. Un tema de Animales genera crucigramas con vocabulario de fauna. El tema Alimentos crea ejercicios con frutas y verduras. El tema Números es ideal para combinar lectoescritura con práctica numérica. El tema Abecedario ayuda a niños que están aprendiendo las letras.

Para selección individual, ve a "Selección Individual de Imágenes" en el mismo acordeón. Primero selecciona un tema para filtrar las imágenes. Aparecerá la galería de imágenes disponibles. Haz clic en cada imagen que quieras incluir. Las imágenes seleccionadas aparecen en el área de vista previa.`,
        icon: '🎯',
      },
      {
        id: '2',
        number: 2,
        title: 'Personaliza la Configuración - Fichas Infantil y Dibujos para Colorear en Tamaño Carta o A4',
        description: `El segundo paso configura el tamaño y diseño de tu hoja. Abre el acordeón "Página" en la barra lateral. Aquí personalizas todos los aspectos de formato.

Primero selecciona el tamaño de página. Las opciones son Carta Vertical, Carta Horizontal, A4 Vertical, A4 Horizontal. Carta Vertical es estándar en México y Estados Unidos. A4 es común en otros países latinoamericanos. Selecciona el formato que uses en tu escuela.

Luego personaliza el fondo de tu ficha. Selecciona un color sólido usando el selector de color de respaldo. O elige un tema de fondo de la biblioteca. Los temas incluyen patrones educativos apropiados para fichas infantil.

Los fondos temáticos agregan interés visual sin distraer. Fondos sutiles funcionan mejor para crucigrama educativos. Puedes ajustar la opacidad del fondo para que no compita con el contenido. Usa fondos claros para crear dibujos para colorear que los niños puedan personalizar.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Genera Tu Crucigrama - Fichas de Matemáticas y Ejercicios de Lectoescritura Instantáneos',
        description: `El tercer paso genera automáticamente tu crucigrama. Haz clic en el botón "Crear" en la esquina superior derecha. Selecciona "Nuevo Crucigrama" del menú desplegable.

El generador procesa tus imágenes seleccionadas en segundos. Extrae los nombres de archivo de cada imagen. Usa un algoritmo para entrecruzar las palabras formando un crucigrama. Crea la cuadrícula con las palabras colocadas correctamente. Genera las pistas visuales con las imágenes correspondientes.

Este proceso toma entre 5 y 15 segundos dependiendo de cuántas imágenes seleccionaste. El crucigrama aparece en el lienzo central. La cuadrícula muestra los espacios donde los niños escribirán las letras. Cada palabra tiene un número que corresponde a una pista visual.

Si no te gusta el resultado, simplemente genera de nuevo. Cada generación puede producir una configuración diferente. Las palabras se entrecruzan de formas distintas. Prueba varias veces hasta encontrar el diseño que prefieras.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Edita en el Lienzo - Personaliza Fichas Gratis con las Tablas de Multiplicar o Aprender las Letras',
        description: `El cuarto paso personaliza el crucigrama generado. Todo en el lienzo es editable. Haz clic en cualquier elemento para seleccionarlo. Arrastra, rota, escala o elimina elementos libremente.

Haz clic en el crucigrama mismo para moverlo. Arrástralo a cualquier posición en la página. Esto es útil si quieres dejar espacio para instrucciones. O si planeas agregar elementos adicionales.

Agrega texto personalizado usando el acordeón "Herramientas de Texto". Escribe el contenido que quieres agregar. Haz clic en "Agregar Texto a la Hoja". El texto aparece en el lienzo. Selecciona el texto para cambiar color, tamaño, fuente. Agrega el nombre del estudiante, instrucciones o el título del tema.

Esta función es perfecta para agregar instrucciones en español. Escribe "Resuelve el crucigrama usando las imágenes como pistas". Para fichas gratis de tablas de multiplicar, agrega problemas matemáticos. Para ejercicios de aprender las letras, agrega el alfabeto completo como referencia.`,
        icon: '🎨',
      },
      {
        id: '5',
        number: 5,
        title: 'Descarga e Imprime - Material Educativo Gratis en PDF con Ejercicios Matemáticas y Grafomotricidad',
        description: `El quinto y último paso descarga tu crucigrama terminado. Haz clic en el botón "Descargar" en la esquina superior derecha. Se abre un menú con opciones de descarga.

Primero genera la hoja de respuestas. Haz clic en "Generar" y selecciona "Hoja de Respuestas". Esto crea una versión del crucigrama con todas las letras completadas. Útil para el maestro. Revisa que las respuestas sean correctas antes de descargar.

Descarga el crucigrama en blanco en formato JPEG o PDF. JPEG funciona bien para compartir digitalmente. PDF es mejor para imprimir. Ambos formatos mantienen calidad de 300 DPI. Tus fichas se ven nítidas y profesionales.

Activa la opción de escala de grises antes de descargar si quieres ahorrar tinta. La casilla "Escala de Grises" está en el menú de descarga. Esto convierte tu crucigrama a blanco y negro. Perfecto para imprimir muchas copias en casa.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from crossword.md use case sections
  useCases: {
    sectionTitle: 'Ficha Gratis para Niños - Ficha para Preescolar con Imprimibles Gratis. Ficha para Niños',
    sectionDescription: 'Nuestro generador de crucigramas beneficia a diversos tipos de educadores. Maestros de preescolar y primaria usan crucigramas para enseñar vocabulario. Padres homeschoolers crean fichas personalizadas para sus hijos. Maestros de idiomas generan material en múltiples lenguas. Cada grupo encuentra valor único en esta herramienta.',
    badgeText: 'Para Quién',
    readMoreLabel: 'Leer más',
    showLessLabel: 'Ver menos',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // FAQ Section - Selected FAQs from crossword.md
  faq: {
    sectionTitle: 'FAQ - Ficha Gratis para Niños y Ficha para Preescolar. Ficha para Niños',
    sectionDescription: 'Maestros y padres tienen preguntas comunes sobre nuestro generador. Esta sección responde las 12 preguntas más frecuentes. Aprende sobre funcionalidad, precios, licencias y uso pedagógico.',
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
    title: 'Acceso Completo',
    price: '$240',
    priceInterval: '/año',
    priceSuffix: 'Facturación anual',
    benefits: [
      'Creación de crucigramas ilimitada',
      'Licencia comercial incluida',
      '11 idiomas soportados',
      '3000+ imágenes temáticas',
      'Calidad de impresión 300 DPI',
      'Hojas de respuestas incluidas',
      'Acceso a los 33 generadores',
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

  // Related Apps
  relatedApps: {
    sectionTitle: 'Fichas Gratis Combinar - Ficha para Niños e Imprimibles Gratis',
    sectionDescription: 'Nuestra plataforma ofrece 33 herramientas diferentes de generación de fichas. Combina crucigramas con otras fichas para imprimir para crear paquetes de aprendizaje completos.',
    ctaTitle: '¿Listo para Crear Crucigramas Increíbles?',
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

export default crosswordEsContent;
