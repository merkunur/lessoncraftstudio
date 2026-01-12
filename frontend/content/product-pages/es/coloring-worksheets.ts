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
    previewImageSrc: '/samples/english/coloring/coloring portrait 1.png',
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
    items: [
      {
        id: '1',
        worksheetSrc: '/samples/english/coloring/coloring portrait 1.png',
        answerKeySrc: '',
        altText: 'Página de colorear vertical con imágenes temáticas para desarrollo de motricidad fina en preescolar',
        pdfDownloadUrl: '/samples/english/coloring/coloring portrait 1.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/english/coloring/coloring portrait 2.png',
        answerKeySrc: '',
        altText: 'Ficha de colorear imprimible con imágenes amigables para niños de preescolar y kinder',
        pdfDownloadUrl: '/samples/english/coloring/coloring portrait 2.pdf',
      },
      {
        id: '3',
        worksheetSrc: '/samples/english/coloring/coloring landscape 1.png',
        answerKeySrc: '',
        altText: 'Página de colorear horizontal con múltiples imágenes para actividades en el aula',
        pdfDownloadUrl: '/samples/english/coloring/coloring landscape 1.pdf',
      },
      {
        id: '4',
        worksheetSrc: '/samples/english/coloring/coloring portrait 3.png',
        answerKeySrc: '',
        altText: 'Ficha de colorear temática para educación infantil y escuela en casa',
        pdfDownloadUrl: '/samples/english/coloring/coloring portrait 3.pdf',
      },
    ],
  },

  // Features Grid - FULL text from coloring.md feature sections
  features: {
    sectionTitle: 'Características del Creador de Dibujos para Colorear - Todo lo Necesario para Fichas Infantil y Fichas para Imprimir Profesionales',
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
    items: [
      {
        id: '1',
        icon: '⚡',
        title: 'Crea Dibujos para Colorear en 3 Clics - Generador Rápido de Fichas Preescolar y Fichas para Imprimir',
        description: `Selecciona imágenes de temas predefinidos con un solo clic. El sistema muestra miniaturas organizadas por categorías educativas. Haz clic en cualquier imagen para añadirla instantáneamente a tu página. No necesitas habilidades de diseño ni experiencia técnica. Tres clics simples y tienes una página de colorear base lista para personalizar. Perfecto para maestros ocupados que necesitan fichas infantil rápidamente.

El proceso simple de tres pasos hace que la creación de fichas para imprimir sea accesible para todos los maestros. Elige un tema como animales, festividades o transporte para explorar imágenes temáticas. Añade múltiples imágenes para crear páginas de colorear complejas con varios objetos. Ajusta tamaños y posiciones con controles visuales que cualquiera puede usar. Genera fichas de primer grado y dibujos para colorear con el mismo flujo de trabajo sencillo.`,
        highlighted: false,
      },
      {
        id: '2',
        icon: '✏️',
        title: 'Edita Todo en tu Ficha para Imprimir - Personalización Completa de Dibujos para Colorear y Fichas Preescolar',
        description: `Cada elemento en el lienzo es completamente editable. Arrastra imágenes a nuevas posiciones con el mouse. Rota cualquier ilustración usando los controles circulares. Escala elementos más grandes o pequeños arrastrando las esquinas. Elimina imágenes que no necesitas con un clic. Ajusta la opacidad para crear efectos de capas. Reorganiza el orden de los elementos para controlar qué aparece adelante. Esta flexibilidad total te permite crear fichas para imprimir exactamente como las imaginas.

Control de capas te permite organizar múltiples imágenes profesionalmente. Trae objetos al frente para colocarlos delante de otros elementos. Envía elementos hacia atrás para crear escenas con capas. Alinea imágenes a los bordes del lienzo para márgenes ordenados. Centra objetos perfectamente para diseños de fichas equilibrados. Estas herramientas de edición funcionan idénticamente ya sea que crees dibujos para colorear o fichas del abecedario.`,
        highlighted: false,
      },
      {
        id: '3',
        icon: '📤',
        title: 'Sube tus Propias Imágenes - Personaliza Fichas Infantil con Fotos y Dibujos Únicos para Colorear',
        description: `Carga múltiples archivos de imagen simultáneamente. El sistema acepta formatos JPEG, PNG y GIF comunes. Sube fotos de tus estudiantes, mascotas de la clase, o proyectos escolares. Combina imágenes personalizadas con nuestra biblioteca de 3000+ ilustraciones. Crea fichas preescolar personalizadas que reflejan la vida diaria de tus estudiantes. Esta función transforma páginas genéricas en material educativo gratis profundamente relevante para tu grupo específico.

Maestros usan subidas de imágenes personalizadas para crear fichas de colorear diferenciadas. Sube imágenes simplificadas para estudiantes de necesidades especiales que requieren menos detalle. Añade imágenes complejas para estudiantes avanzados que necesitan páginas de colorear más desafiantes. Incluye nombres de estudiantes como imágenes para fichas de primaria personalizadas. Sube palabras de vista como imágenes para crear fichas de fonética personalizadas combinadas con actividades de colorear.`,
        highlighted: false,
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Creador de Dibujos para Colorear en 11 Idiomas - Fichas para Imprimir Multilingües para Educación Bilingüe',
        description: `La interfaz funciona en español, inglés, alemán, francés, italiano, portugués, holandés, danés, sueco, noruego y finés. Los nombres de archivos de imagen también cambian según el idioma seleccionado. Fundamental para maestros de programas bilingües o escuelas internacionales. Crea fichas infantil en el idioma materno de tus estudiantes. Apoya actividades de lectoescritura en múltiples idiomas. Esencial para enseñanza de lenguas extranjeras donde estudiantes necesitan vocabulario visual.

El soporte de 11 idiomas hace que este generador de fichas de colorear sea único entre los creadores de fichas imprimibles gratuitas. La mayoría de los creadores de páginas de colorear ofrecen solo imágenes en inglés. Nuestra biblioteca multilingüe sirve a aulas diversas y escuelas internacionales. Crea fichas de colorear en español, fichas del abecedario en francés, o fichas preescolar en alemán con igual facilidad. Los estudiantes de idiomas se benefician de páginas de colorear que enseñan vocabulario a través de asociación visual.`,
        highlighted: false,
      },
      {
        id: '5',
        icon: '💰',
        title: 'Licencia Comercial Incluida - Vende tus Fichas para Imprimir y Dibujos para Colorear en Plataformas Educativas',
        description: `Tu suscripción Paquete Esencial incluye licencia comercial completa de impresión bajo demanda sin costo adicional. Vende tus diseños en Teachers Pay Teachers, Etsy, y Amazon KDP. No se requiere atribución ni pagos de regalías. Calidad profesional de 300 DPI perfecta para productos impresos. Muchos maestros generan $500 a $5000 mensuales vendiendo fichas preescolar y material educativo gratis diseñado con nuestra plataforma. La licencia comercial convierte tu creatividad pedagógica en ingreso adicional.

Maestros emprendedores crean negocios vendiendo diseños originales en Teachers Pay Teachers, Etsy, y Amazon KDP. La licencia comercial incluida en tu suscripción Paquete Esencial permite ventas ilimitadas sin regalías adicionales. La calidad profesional de 300 DPI hace que tus productos compitan con editoriales establecidas. La inversión de $144 anuales se recupera típicamente con ventas de 30-50 productos dependiendo del precio.`,
        highlighted: true,
      },
      {
        id: '6',
        icon: '🎨',
        title: 'Biblioteca de 3000+ Imágenes - Ilustraciones Organizadas por Temas para Fichas Infantil y Dibujos para Colorear Educativos',
        description: `Accede a más de 3000 ilustraciones amigables para niños organizadas por categorías temáticas. Busca imágenes específicas usando la función de búsqueda integrada. Encuentra rápidamente elementos para actividades de grafomotricidad, lectoescritura, abecedario para aprender las letras, números para aprender los números, y más. Todas las imágenes están optimizadas para colorear con líneas claras y detalles apropiados para la edad. Los temas educativos cubren ciencias, matemáticas, lenguaje, estudios sociales, y desarrollo socioemocional. Nunca te quedarás sin opciones para crear fichas para imprimir variadas.

Los temas incluyen animales, comida, transporte, festividades, estaciones, naturaleza, personas, y más. Cada tema contiene docenas de imágenes perfectas para páginas de colorear. Las imágenes presentan contornos limpios ideales para las habilidades de colorear de niños pequeños. Todas las imágenes son libres de regalías e incluidas con tu suscripción.`,
        highlighted: false,
      },
      {
        id: '7',
        icon: '🖨️',
        title: 'Calidad Profesional de 300 DPI - Exporta Fichas Preescolar y Dibujos para Colorear en PDF y JPEG de Alta Resolución',
        description: `Descarga en formato PDF vectorial o JPEG de alta resolución. La calidad de 300 DPI garantiza impresiones nítidas sin pixelación. Activa la opción de escala de grises para ahorrar tinta de color en impresoras escolares. Los archivos PDF mantienen calidad perfecta sin importar el tamaño de impresión. Los archivos JPEG funcionan excelente para compartir digitalmente o imprimir en casa. La exportación de alta calidad asegura que tus fichas infantil se vean profesionales tanto en pantalla como impresas.

Elige formato PDF para la más alta calidad de fichas imprimibles. Los archivos PDF preservan diseños exactos en diferentes computadoras e impresoras. Los estudiantes pueden completar fichas de colorear digitalmente usando herramientas de anotación PDF. PDF es el formato preferido para subidas a Teachers Pay Teachers y ventas comerciales de fichas. La opción de escala de grises reduce el consumo de tinta de color en un 100%.`,
        highlighted: true,
      },
    ],
  },

  // How-To Guide - FULL text from coloring.md step sections
  howTo: {
    sectionTitle: 'Cómo Crear Dibujos para Colorear en 5 Pasos Simples - Guía Completa para Fichas Preescolar y Fichas para Imprimir Profesionales',
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
    sectionTitle: 'Perfecto para Maestros y Educadores - Dibujos para Colorear y Fichas para Imprimir para Todas las Necesidades Educativas',
    sectionDescription: 'El creador de páginas de colorear sirve a diversos profesionales educativos desde educación infantil hasta primaria. Cada grupo encuentra aplicaciones únicas que ahorran tiempo y mejoran resultados de aprendizaje. Maestros de preescolar, docentes de primaria, padres educadores en casa, profesores de idiomas, maestros de educación especial, y emprendedores educativos todos benefician del sistema. Las herramientas flexibles se adaptan a múltiples contextos pedagógicos y estilos de enseñanza.',
    badgeText: 'Para Quién',
    readMoreLabel: 'Leer más',
    showLessLabel: 'Ver menos',
    items: [
      {
        id: '1',
        icon: '👶',
        title: 'Maestros de Preescolar y Educación Infantil',
        subtitle: 'Crea Fichas para Imprimir con Actividades de Grafomotricidad y Abecedario para Aprender las Letras',
        description: `Docentes de preescolar usan el generador para crear actividades de grafomotricidad integradas con colorear. Diseña páginas que combinan imágenes para colorear con líneas de escritura para practicar trazos básicos. Añade letras grandes del abecedario para que niños las tracen y coloreen simultáneamente. Crea fichas donde cada letra se asocia con imágenes que comienzan con ese sonido.

El sistema permite crear material educativo gratis personalizado para cada etapa del desarrollo preescolar. Genera páginas simples con pocas imágenes grandes para niños de 3 años. Crea diseños más complejos con múltiples elementos para niños de 5-6 años listos para primer grado. Añade campos de nombre para que cada niño identifique su trabajo. Integra actividades de lectoescritura temprana combinando imágenes con palabras simples para trazar.

Maestros reportan que estudiantes se involucran más con páginas personalizadas que reflejan sus intereses actuales. Sube fotos de mascotas de la clase, proyectos recientes, o celebraciones escolares. Crea series temáticas mensuales alineadas con tu currículo de educación infantil. La capacidad de producir fichas para imprimir frescas semanalmente mantiene el interés alto y reduce comportamientos disruptivos durante tiempo de trabajo independiente.`,
        quote: '¡Mis estudiantes aman comenzar cada día con actividades de colorear temáticas!',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Docentes de Primaria',
        subtitle: 'Genera Material Educativo Gratis Combinando Números para Aprender los Números con Dibujos para Colorear Educativos',
        description: `Maestros de primero a tercer grado integran páginas de colorear en múltiples áreas curriculares. Crea fichas para imprimir que combinan práctica de números con colorear por código. Diseña actividades donde estudiantes colorean según resultados de problemas matemáticos simples. Añade instrucciones escritas que requieren lectura comprensiva antes de colorear.

El generador apoya actividades de lectoescritura en primaria creando páginas que refuerzan vocabulario de contenido. Después de lecciones de ciencias, crea dibujos para colorear del ciclo de vida de plantas o animales con etiquetas para completar. Para estudios sociales, diseña mapas para colorear de México o Latinoamérica con nombres de estados o países. Combina aprendizaje de números con geografía creando actividades de "colorea por número" de monumentos famosos.

Las páginas de colorear sirven perfectamente como actividades de consolidación después de lecciones principales. Proporcionan repetición necesaria del contenido mientras dan descanso de trabajo más intenso. Funcionan excelente para diferenciación dando a estudiantes avanzados versiones más complejas y a estudiantes en desarrollo versiones simplificadas. Muchos maestros las usan como carpetas de trabajo de emergencia para maestros sustitutos asegurando que el aprendizaje continúa durante ausencias.`,
        quote: '¡Las fichas de colorear hacen que el aprendizaje sea divertido para todos mis estudiantes!',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Familias Educadoras en Casa',
        subtitle: 'Fichas para Imprimir Personalizadas con Grafomotricidad y Lectoescritura para Aprendizaje Multinivel',
        description: `Padres que educan en casa aprecian la capacidad de crear material educativo gratis personalizado para múltiples niños de edades diferentes. Genera actividades apropiadas para cada nivel usando el mismo tema base. Crea versiones simples de grafomotricidad para preescolares mientras hermanos mayores trabajan en versiones con actividades de lectoescritura más complejas. Esta eficiencia hace posible la enseñanza multinivel efectiva.

El sistema permite integrar intereses específicos de tus hijos en el aprendizaje diario. Sube fotos familiares, mascotas, o vacaciones para crear fichas para imprimir ultra-personalizadas. Niños que normalmente resisten el trabajo escrito se motivan cuando las actividades incluyen elementos de su vida real. Combina fotos de excursiones educativas con vocabulario nuevo aprendido durante la experiencia.

Familias educadoras frecuentemente usan las páginas de colorear como recompensas o tiempo tranquilo durante el día. Crea diseños relajantes para pausas mentales entre materias desafiantes. Genera actividades del abecedario para aprender las letras que niños pueden completar independientemente mientras atiendes a otro hermano. La capacidad de producir material educativo gratis ilimitado elimina uno de los mayores gastos de la educación en casa manteniendo alta calidad.`,
        quote: '¡Una herramienta cubre todos mis hijos en diferentes niveles de grado!',
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Profesores de Español e Idiomas',
        subtitle: 'Material Educativo Gratis Multilingüe para Aprender Números, Abecedario y Lectoescritura en Español',
        description: `Maestros de español como segundo idioma y programas bilingües utilizan el generador en los 11 idiomas disponibles. Crea fichas para imprimir idénticas en español e inglés para comparación directa. Diseña actividades donde estudiantes aprenden vocabulario nuevo a través de imágenes para colorear con etiquetas en ambos idiomas. El sistema de búsqueda de imágenes funciona en español facilitando encontrar elementos específicos.

Las páginas de colorear proporcionan práctica de lectoescritura de bajo riesgo en el idioma objetivo. Estudiantes se enfocan en vocabulario y comprensión sin presión de producción oral inmediata. Añade palabras simples debajo de cada imagen que estudiantes pueden trazar o copiar. Crea actividades del abecedario específicas para español incluyendo la ñ y practicando sonidos únicos al idioma.

Programas de inmersión dual usan las fichas para reforzar contenido académico en el idioma minoritario. Después de lecciones de matemáticas en español, crea páginas para colorear que practican números y vocabulario matemático. Diseña actividades de grafomotricidad que preparan para escribir letras únicas al español. La capacidad de cambiar el idioma de la interfaz permite que estudiantes trabajen completamente en español desarrollando alfabetización digital simultáneamente.`,
        quote: '¡El soporte multilingüe es esencial para mi aula diversa!',
      },
      {
        id: '5',
        icon: '💜',
        title: 'Maestros de Educación Especial',
        subtitle: 'Fichas para Imprimir Adaptadas con Grafomotricidad, Números y Abecedario Diferenciados',
        description: `Docentes de educación especial personalizan páginas de colorear según necesidades individuales de cada estudiante. Crea diseños de alta complejidad para estudiantes con necesidades de enriquecimiento. Genera páginas extremadamente simples con una sola imagen grande para estudiantes que requieren modificaciones significativas. Ajusta la cantidad de elementos en cada página según capacidad de atención y habilidades motoras finas.

El sistema apoya intervenciones específicas de grafomotricidad y desarrollo motor fino. Diseña páginas con líneas extra anchas alrededor de imágenes para estudiantes desarrollando control de crayón. Crea actividades progresivas comenzando con imágenes muy grandes y gradualmente reduciendo tamaño. Añade guías visuales y estructuras que apoyan a estudiantes con desafíos de organización espacial.

Las páginas de colorear sirven como reforzadores efectivos en programas de modificación de conducta. Genera diseños de temas específicos que motivan a estudiantes individuales. Un estudiante obsesionado con trenes recibe páginas de colorear de trenes como recompensa por completar trabajo. Otro estudiante interesado en dinosaurios trabaja hacia ganar tiempo con páginas de colorear de dinosaurios. Personalización ilimitada hace posible motivación verdaderamente individualizada sin costo adicional de material educativo gratis especializado.`,
        quote: 'Puedo adaptar rápidamente las fichas para las metas del IEP de cada estudiante.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Emprendedores Educativos',
        subtitle: 'Vende Fichas para Imprimir con Lectoescritura, Grafomotricidad y Números en Plataformas Comerciales',
        description: `Maestros emprendedores crean negocios vendiendo diseños originales en Teachers Pay Teachers, Etsy, y Amazon KDP. La licencia comercial incluida en tu suscripción Paquete Esencial permite ventas ilimitadas sin regalías adicionales. Muchos educadores generan $500 a $5000 mensuales vendiendo paquetes temáticos de material educativo gratis diseñados profesionalmente.

El mercado de fichas para imprimir digitales está en crecimiento constante especialmente en nichos específicos. Crea paquetes especializados de grafomotricidad para terapeutas ocupacionales. Diseña series completas del abecedario para aprender las letras con temas populares como unicornios o superhéroes. Genera colecciones de actividades de lectoescritura alineadas con programas específicos de lectura. Productos de números para aprender los números siempre tienen demanda alta de padres y maestros.

La calidad profesional de 300 DPI y formatos PDF hacen que tus productos compitan con editoriales establecidas. Desarrolla una marca visual consistente usando bordes y estilos similares en todos tus productos. Crea productos en español dirigidos al creciente mercado hispanohablante en Estados Unidos y Latinoamérica. Muchos emprendedores comienzan con 10-20 horas mensuales de creación de fichas para imprimir y eventualmente convierten esto en ingreso de tiempo completo mientras mantienen control total de su tiempo y creatividad.`,
        quote: '¡Mi suscripción se pagó sola en el primer mes!',
      },
    ],
  },

  // FAQ Section - Selected FAQs from coloring.md
  faq: {
    sectionTitle: 'Preguntas Frecuentes sobre Dibujos para Colorear - Fichas para Imprimir con Grafomotricidad, Lectoescritura y Material Educativo Gratis',
    sectionDescription: 'Educadores tienen preguntas comunes sobre funcionalidad, costos, y aplicaciones pedagógicas del generador. Esta sección responde las doce preguntas más frecuentes que maestros de preescolar y primaria hacen. Las respuestas aclaran capacidades del sistema y ayudan a decidir si la herramienta se ajusta a tus necesidades específicas de enseñanza.',
    showMoreText: 'Mostrar más preguntas',
    showLessText: 'Mostrar menos',
    badgeText: 'Preguntas Frecuentes',
    readMoreLabel: 'Leer más',
    showLessLabel: 'Ver menos',
    secureCheckout: 'Pago seguro',
    cancelAnytime: 'Cancela cuando quieras',
    items: [
      {
        id: '1',
        question: '¿Este Generador de Fichas para Imprimir Realmente Requiere Suscripción para Crear Material Educativo Gratis?',
        answer: 'El creador de páginas de colorear requiere suscripción Paquete Esencial costando $144 anuales o $15 mensuales. Tu suscripción te da creación ilimitada de fichas para imprimir sin cargos adicionales por cada diseño. Genera tantas páginas de colorear como necesites sin costos extra. El término "material educativo gratis" se refiere a que una vez suscrito creas fichas ilimitadas sin tarifas por hoja. Paquete Esencial incluye 10 generadores populares de fichas. Acceso Completo cuesta $240 anuales e incluye los 33 tipos de generadores de fichas disponibles.',
      },
      {
        id: '2',
        question: '¿Puedo Imprimir Fichas para Imprimir en Casa con Impresora Regular?',
        answer: 'Absolutamente. Las páginas de colorear se diseñan específicamente para impresión en impresoras hogareñas o escolares estándar. Los archivos PDF se optimizan para tamaño carta y A4 que son formatos universales. No necesitas equipo especial ni papel de calidad profesional. Papel de copia regular de 75gsm funciona perfectamente para fichas de colorear. La opción de escala de grises convierte automáticamente diseños a blanco y negro ahorrando tinta de color. Maestros reportan imprimir 20-30 fichas para imprimir semanalmente sin problemas de calidad.',
      },
      {
        id: '3',
        question: '¿Necesito Habilidades de Diseño Gráfico para Crear Dibujos para Colorear con Actividades de Grafomotricidad?',
        answer: 'No se requiere experiencia en diseño. El sistema se construyó específicamente para maestros sin entrenamiento técnico. Haces clic en imágenes para añadirlas al lienzo. Arrastras elementos a posiciones deseadas. Todos los controles usan lenguaje simple sin jerga técnica. Maestros de 60+ años sin experiencia digital previa usan el generador exitosamente. La interfaz incluye deshacer/rehacer ilimitados permitiéndote experimentar sin miedo. Maestros reportan crear sus primeras fichas para imprimir profesionales en 5-10 minutos después de apertura inicial.',
      },
      {
        id: '4',
        question: '¿Puedo Usar Estas Fichas para Imprimir de Grafomotricidad en Mi Aula para Estudiantes?',
        answer: 'Tu suscripción Paquete Esencial incluye uso ilimitado en aula. Imprime tantas copias como necesites para todos tus estudiantes actuales. Comparte archivos digitalmente con familias para trabajo en casa. Usa las fichas en actividades grupales, trabajo independiente, centros de aprendizaje, y carpetas de tarea. No hay límites en aplicaciones educativas directas. Puedes compartir fichas con colegas en tu misma escuela para uso en sus propias aulas.',
      },
      {
        id: '5',
        question: '¿En Qué Idiomas Están Disponibles las Fichas para Imprimir con Abecedario y Números?',
        answer: 'El generador funciona en 11 idiomas diferentes. La interfaz de usuario se traduce completamente a español, inglés, alemán, francés, italiano, portugués brasileño, holandés, danés, sueco, noruego, y finés. Todos los botones, menús, y etiquetas aparecen en el idioma seleccionado. Los nombres de archivos de imagen también cambian según idioma seleccionado. Una imagen de "apple" en inglés se convierte en "manzana" cuando cambias a español. Esto permite práctica auténtica de lectoescritura.',
      },
      {
        id: '6',
        question: '¿Puedo Vender Fichas para Imprimir con Lectoescritura que Creo con Este Generador?',
        answer: 'Sí. Tu suscripción Paquete Esencial incluye licencia comercial completa de impresión bajo demanda. Vende tus diseños en Teachers Pay Teachers, Etsy, Amazon KDP, Gumroad, y tu propio sitio web. No se requiere atribución a LessonCraft Studio en tus productos. No pagas regalías por cada venta. La licencia comercial está incluida en tu tarifa de suscripción de $144 anuales sin costos adicionales. Muchos competidores cobran $50 a $200 anuales extra por licencias comerciales separadas.',
      },
      {
        id: '7',
        question: '¿Cómo Personalizo Fichas para Imprimir de Abecedario para Mis Estudiantes Específicos?',
        answer: 'Personalización ocurre en múltiples niveles. Nivel más simple es subir fotos de tus propios estudiantes, mascotas de clase, o proyectos escolares. El sistema acepta formatos JPEG, PNG, y GIF. Siguiente nivel es combinar imágenes de biblioteca con texto personalizado. Añade nombres individuales de estudiantes a páginas de colorear. Crea actividades del abecedario donde cada estudiante tiene su propia letra basada en inicial de su nombre. Nivel más profundo es ajustar complejidad visual según habilidades.',
      },
      {
        id: '8',
        question: '¿Para Qué Grupos de Edad Funcionan Mejor Estas Fichas para Imprimir con Números y Grafomotricidad?',
        answer: 'El generador es más efectivo para estudiantes de 3 a 9 años cubriendo preescolar hasta tercer grado de primaria. Niños de 3-4 años usan páginas simples con pocas imágenes muy grandes para practicar control básico de crayón. Niños de 5-6 años en kinder manejan diseños más complejos con múltiples elementos y pueden seguir códigos simples de color. Estudiantes de primero a tercer grado integran páginas de colorear con actividades académicas más avanzadas.',
      },
      {
        id: '9',
        question: '¿Puedo Subir Mis Propias Imágenes para Crear Material Educativo Gratis Personalizado?',
        answer: 'Sí, carga ilimitada de imágenes personalizadas está incluida. Haz clic en la sección "Subir Imágenes Personalizadas" en el panel izquierdo. Selecciona archivos desde tu computadora. El sistema acepta formatos JPEG, PNG, y GIF que son formatos universales de imagen. Sube múltiples archivos a la vez para mayor eficiencia. Imágenes cargadas aparecen en tu galería personal separada de la biblioteca principal. Persisten a través de sesiones permitiendo reutilización.',
      },
      {
        id: '10',
        question: '¿Cuánto Tiempo Toma Crear una Ficha para Imprimir de Lectoescritura Completa?',
        answer: 'Maestros reportan crear fichas para imprimir completas en 2-5 minutos después de familiarización inicial con controles. Tu primera página puede tomar 10-15 minutos mientras exploras funciones. Para la quinta página ya trabajas en ritmo eficiente. Seleccionar tema toma 15 segundos. Elegir y añadir 3-5 imágenes toma 30 segundos. Posicionar y escalar elementos toma 60 segundos. Añadir texto opcional toma 30 segundos. Descargar toma 15 segundos.',
      },
      {
        id: '11',
        question: '¿Las Fichas para Imprimir con Grafomotricidad Incluyen Respuestas o Guías?',
        answer: 'Las páginas de colorear no requieren claves de respuesta tradicionales ya que son actividades expresivas no evaluativas. No hay respuestas "correctas" en actividades de colorear. Cada estudiante expresa creatividad a su manera. Esto hace las fichas perfectas para diferenciación donde todos los estudiantes pueden exitosamente participar independiente de nivel académico. Para actividades integradas que añades creas tu propia clave informal simplemente haciendo segunda versión coloreada mostrando resultado esperado.',
      },
      {
        id: '12',
        question: '¿Puedo Crear Fichas para Imprimir sobre Temas Escolares Específicos con Abecedario y Números Integrados?',
        answer: 'Absolutamente. La biblioteca de 3000+ imágenes cubre temas académicos completos. Categorías incluyen ciencias (animales, plantas, ciclos de vida, clima, cuerpo humano), matemáticas (formas, números, patrones), estudios sociales (geografía, comunidad, celebraciones culturales), y desarrollo socioemocional (emociones, amistad, rutinas). Usa la función de búsqueda para encontrar imágenes específicas de tu unidad actual. La búsqueda funciona en los 11 idiomas facilitando encontrar vocabulario temático específico.',
      },
    ],
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
      guarantee: 'Garantía de devolución de 30 días',
      securePayment: 'Pago seguro',
      cancelAnytime: 'Cancela cuando quieras',
    },
    items: [
      {
        id: '1',
        slug: 'draw-and-color',
        name: 'Dibujo y Colorear',
        category: 'Arte y Creatividad',
        icon: '🖍️',
        description: 'Combina páginas de colorear con indicaciones de dibujo para actividades de arte completas desarrollando habilidades de trazo y colorear.',
      },
      {
        id: '2',
        slug: 'alphabet-train',
        name: 'Tren del Alfabeto',
        category: 'Aprendizaje Temprano',
        icon: '🚂',
        description: 'Combina actividades de colorear con práctica de reconocimiento de letras para desarrollo integral de alfabetización temprana.',
      },
      {
        id: '3',
        slug: 'matching-app',
        name: 'Fichas de Emparejar',
        category: 'Aprendizaje Visual',
        icon: '🔗',
        description: 'Añade ejercicios de emparejar a tus páginas de colorear para discriminación visual y desarrollo de habilidades cognitivas.',
      },
      {
        id: '4',
        slug: 'word-search',
        name: 'Sopa de Letras',
        category: 'Lenguaje',
        icon: '🔍',
        description: 'Recompensa actividades de colorear completadas con sopas de letras temáticas usando el mismo vocabulario.',
      },
      {
        id: '5',
        slug: 'image-addition',
        name: 'Fichas de Suma',
        category: 'Matemáticas',
        icon: '➕',
        description: 'Combina páginas de colorear con problemas de suma visual para integración de habilidades múltiples de matemáticas y arte.',
      },
      {
        id: '6',
        slug: 'writing-app',
        name: 'Práctica de Escritura',
        category: 'Lenguaje',
        icon: '✍️',
        description: 'Añade práctica de caligrafía a fichas de colorear para desarrollo completo de motricidad fina.',
      },
    ],
  },
};

export default coloringEsContent;
