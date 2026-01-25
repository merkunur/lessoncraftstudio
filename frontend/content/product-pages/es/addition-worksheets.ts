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
    title: 'Fichas de Sumas para Imprimir | Generador de Ejercicios de',
    description: 'Crea fichas de sumas profesionales con imágenes usando nuestro generador de ejercicios matemáticas. Genera fichas para imprimir personalizadas perfectas para.',
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
    previewImageSrc: '/samples/spanish/addition/sample-1.jpeg',
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

  // Features Grid - FULL text from addition.md feature sections
  features: {
    sectionTitle: 'Fichas Gratis y Ficha para Niños - Imprimibles Gratis y Ficha para Preescolar',
    sectionDescription: 'Nuestro generador de fichas para imprimir incluye todas las herramientas que los maestros necesitan para crear ejercicios matemáticas de alta calidad. Desde la selección de imágenes hasta la personalización completa del diseño, cada característica está diseñada para ahorrarte tiempo y crear material educativo profesional. La suscripción Paquete Esencial te da acceso ilimitado a todas estas funciones por $144 al año o $15 al mes.',
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

  // How-To Guide - FULL text from addition.md step sections
  howTo: {
    sectionTitle: 'Ficha Gratis para Niños Crear - Ficha para Preescolar',
    sectionDescription: 'Crear fichas para imprimir profesionales con nuestro generador toma menos de 3 minutos del inicio al final. No necesitas experiencia técnica. No necesitas conocimientos de diseño gráfico. Solo sigue estos cinco pasos simples y tendrás ejercicios matemáticas listos para tus estudiantes. El proceso es tan intuitivo que lo dominarás desde el primer uso.',
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
        title: 'Selecciona Tus Imágenes para Fichas de Matemáticas - Temas de la Biblioteca o Carga Tus Propias Fotos',
        description: `Comienza eligiendo las imágenes que aparecerán en tus ejercicios matemáticas. Tienes dos opciones principales. Primero, selecciona un tema de nuestra biblioteca de más de 3000 imágenes. Los temas incluyen animales, frutas, juguetes, vehículos, objetos escolares y muchos más. Cada tema contiene docenas de imágenes relacionadas.

Haz clic en el menú desplegable de temas. Elige el tema que quieras usar. El generador muestra instantáneamente todas las imágenes disponibles en ese tema. Haz clic en las imágenes que quieres incluir en tus fichas de matemáticas. Cada imagen seleccionada se marca con un borde azul.

La segunda opción es subir tus propias imágenes. Haz clic en el botón de carga de archivos. Selecciona una o múltiples imágenes de tu computadora. El generador acepta formatos JPEG, PNG y GIF. Tus imágenes subidas aparecen en una sección separada lista para usar.

Puedes combinar imágenes de la biblioteca con tus fotos personales. Por ejemplo, usa imágenes de frutas de nuestra biblioteca y agrega fotos de objetos del salón de clases. Esta flexibilidad te permite crear fichas para imprimir verdaderamente personalizadas para tus estudiantes.

El generador necesita suficientes imágenes para crear todos los ejercicios. Si configuraste 6 ejercicios de sumas, selecciona al menos 12 imágenes diferentes. El sistema te avisa si necesitas seleccionar más imágenes antes de generar.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Configura los Ajustes de Tus Fichas para Imprimir - Nivel de Dificultad y Aprender los Números Personalizados',
        description: `Ajusta la configuración de tus ejercicios matemáticas para que coincidan con el nivel de tus estudiantes. Primero, selecciona cuántos ejercicios quieres en cada ficha. El rango va de 1 a 10 ejercicios por página. Para niños de preescolar, 3 a 5 ejercicios funcionan bien. Para primer grado, puedes usar 6 a 10 ejercicios.

Configura el rango numérico mínimo y máximo. Esto controla cuántos objetos aparecen en cada grupo de la suma. Para principiantes, configura mínimo 1 y máximo 3. Los estudiantes contarán grupos pequeños y fáciles. Para niveles más avanzados, configura mínimo 1 y máximo 10.

Selecciona el modo de ejercicio. Tienes cuatro opciones diferentes. El modo "Imagen + Imagen" muestra dos grupos de imágenes sin números. El modo "Imagen + Número" muestra un grupo de imágenes y un número. El modo "Encontrar Sumando" presenta un ejercicio con una casilla vacía que los niños llenan. El modo "Mixto" combina los tres tipos en una misma ficha para imprimir.

Elige el tamaño de página. Las opciones incluyen Carta Vertical, Carta Horizontal, A4 Vertical, A4 Horizontal y Cuadrado. La mayoría de los maestros usan Carta Vertical para Estados Unidos o A4 Vertical para México y otros países.

Activa opciones adicionales con casillas de verificación. Marca "Incluir campos de Nombre/Fecha" si quieres espacios en la parte superior. Marca "Mostrar signo +" si quieres que el símbolo de suma aparezca entre grupos. Marca "Incluir números de ejercicio" para numerar cada problema.

Todos estos ajustes se guardan en tiempo real. Puedes cambiarlos después de generar si decides ajustar la dificultad. El generador recuerda tus preferencias para la próxima vez.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Genera Tu Hoja de Trabajo de Sumas - Fichas Gratis de Material Educativo Listas en Segundos',
        description: `Haz clic en el botón grande "Generar" cuando hayas terminado de configurar todo. El generador crea instantáneamente tu ficha de matemáticas. La vista previa aparece en el lienzo principal en menos de 3 segundos. No hay tiempo de espera. No hay procesamiento lento.

El generador distribuye automáticamente las imágenes de manera uniforme en la página. Cada ejercicio de suma tiene espacio suficiente para trabajar. Los grupos de imágenes están claramente separados. Las casillas de respuesta son del tamaño adecuado para que los niños escriban números.

Si seleccionaste la opción de generar hoja de respuestas, el sistema crea automáticamente una segunda página con todas las respuestas correctas. La hoja de respuestas usa exactamente el mismo diseño que la ficha de trabajo pero muestra los resultados.

Revisa la vista previa en pantalla. Verifica que las imágenes se vean bien. Confirma que el nivel de dificultad es apropiado. Asegúrate de que el diseño funciona para tus estudiantes.

Si algo no te gusta, simplemente cambia la configuración y haz clic en "Generar" nuevamente. El generador crea una nueva versión instantáneamente. Puedes generar fichas para imprimir ilimitadas sin costo adicional. Experimenta con diferentes configuraciones hasta obtener exactamente lo que necesitas.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Edita en el Lienzo - Personaliza Tus Fichas Infantil y Fichas Preescolar Completamente',
        description: `Ahora viene la parte donde personalizas completamente tus ejercicios matemáticas. Todo en el lienzo es editable. Haz clic en cualquier imagen para seleccionarla. Aparecen controles de redimensionamiento en las esquinas. Arrastra las esquinas para hacer la imagen más grande o más pequeña.

Arrastra cualquier elemento a una nueva posición. Las imágenes, los números, el texto, todo se puede mover. Si quieres reorganizar el diseño completo, adelante. El generador te da control total sobre cada elemento.

Rota objetos haciendo clic y arrastrando el control de rotación que aparece arriba del objeto seleccionado. Esto es útil si quieres dar variedad visual a tus fichas infantil. Las imágenes rotadas hacen que los ejercicios se vean menos repetitivos.

Agrega texto personalizado usando la herramienta de texto. Escribe instrucciones específicas. Agrega el nombre de cada estudiante. Incluye mensajes motivadores. Cambia el color del texto, el tamaño y la fuente. Agrega contornos al texto para que resalte sobre fondos coloridos.

Sube fondos decorativos o bordes desde las opciones de página. Más de 100 fondos temáticos están disponibles. Más de 150 bordes diferentes complementan cualquier tema educativo. Arrastra el control deslizante de opacidad para que el fondo no interfiera con los ejercicios.

Usa las herramientas de alineación para organizar elementos perfectamente. Alinea múltiples objetos a la izquierda, derecha, arriba o abajo. Centra elementos horizontal o verticalmente en la página. Las herramientas de capas te permiten traer objetos al frente o enviarlos atrás.

Cada cambio que hagas se puede deshacer con Ctrl+Z. Si cometes un error, simplemente presiona deshacer. El historial completo de cambios está disponible. Haz clic en Rehacer (Ctrl+Y) si deshiciste algo por accidente.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Descarga e Imprime Tus Fichas de Matemáticas - PDF y JPEG de Alta Calidad para Ejercicios Profesionales',
        description: `Cuando tus fichas para imprimir estén perfectas, es hora de descargar. Haz clic en el botón "Descargar" en la parte superior derecha. Aparece un menú con todas las opciones de descarga disponibles.

Selecciona "Ficha de Trabajo (PDF)" para descargar la hoja de ejercicios en formato PDF. Este formato es perfecto para imprimir. Los archivos PDF mantienen la calidad profesional de 300 DPI. El tamaño de archivo es pequeño para compartir por correo electrónico.

Selecciona "Hoja de Respuestas (PDF)" para descargar la versión con respuestas. Guarda este archivo para tu referencia. Úsalo para calificar rápidamente el trabajo de los estudiantes. Compártelo con asistentes de enseñanza o padres voluntarios.

Si prefieres formato de imagen, selecciona las opciones JPEG. Los archivos JPEG funcionan bien para compartir en redes sociales. Los maestros que venden en Teachers Pay Teachers a menudo usan JPEG para vistas previas de productos.

Marca la casilla "Escala de grises" antes de descargar si quieres ahorrar tinta de la impresora. El generador convierte todos los colores a tonos grises. Las imágenes siguen siendo claras y reconocibles. Los estudiantes pueden colorear las imágenes si quieres combinar ejercicios matemáticas con actividades de arte.

La descarga comienza inmediatamente. El archivo se guarda en tu carpeta de descargas predeterminada. Abre el archivo para verificar que todo se ve perfecto. Imprime la cantidad de copias que necesites. Repite el proceso para crear fichas gratis de matemáticas ilimitadas para toda la semana.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from addition.md use case sections
  useCases: {
    sectionTitle: 'Ficha Gratis para Niños - Ficha para Preescolar con Imprimibles Gratis. Ficha para Niños',
    sectionDescription: 'Nuestro generador de ejercicios matemáticas sirve a educadores en múltiples contextos. Maestros de escuelas públicas y privadas lo usan diariamente. Padres educadores en casa crean planes de estudio completos. Maestros de educación especial adaptan materiales para necesidades individuales. Profesores de educación bilingüe enseñan en múltiples idiomas. Emprendedores educativos construyen negocios vendiendo material educativo gratis personalizado.',
    badgeText: 'Para Quién',
    readMoreLabel: 'Leer más',
    showLessLabel: 'Ver menos',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // FAQ Section - Selected FAQs from addition.md
  faq: {
    sectionTitle: 'FAQ - Ficha Gratis para Niños y Ficha para Preescolar. Ficha para Niños',
    sectionDescription: 'Los maestros y padres tienen preguntas comunes sobre nuestro generador de ejercicios matemáticas. Aquí respondemos las preguntas más frecuentes sobre crear fichas infantil profesionales.',
    showMoreText: 'Ver más preguntas',
    showLessText: 'Ver menos',
    badgeText: 'FAQ',
    readMoreLabel: 'Leer más',
    showLessLabel: 'Ver menos',
    secureCheckout: 'Pago seguro',
    cancelAnytime: 'Cancela cuando quieras',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // Pricing - CORE BUNDLE for addition
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

  // Related Apps - FULL text from addition.md related sections
  relatedApps: {
    sectionTitle: 'Fichas Gratis Combinar - Ficha para Niños e Imprimibles Gratis',
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
    items: [], // Samples loaded dynamically from content manager
    
  },
};

export default additionEsContent;
