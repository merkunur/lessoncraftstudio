import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Matching Worksheets - Spanish (Mexican) Content
 *
 * File: frontend/content/product-pages/es/matching-worksheets.ts
 * URL: /es/apps/relacionar-fichas (Spanish SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Spanish/matching.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 *
 * Bundle: Paquete Esencial ($144/year)
 * App ID: matching-app
 */

export const matchingEsContent: ProductPageContent = {
  // SEO Metadata - Spanish language-specific
  seo: {
    slug: 'relacionar-fichas',
    appId: 'matching-app',
    title: 'Fichas para Imprimir de Relacionar | Fichas Preescolar y Material Educativo Gratis para Lectoescritura',
    description: 'Crea fichas para imprimir profesionales de relacionar columnas con nuestro generador de fichas educativas. Genera fichas preescolar y fichas infantil personalizadas perfectas para preescolar, primer grado y segundo grado. Descarga fichas en PDF de alta calidad en menos de 3 minutos.',
    keywords: 'fichas para imprimir, fichas preescolar, fichas infantil, material educativo gratis, relacionar columnas, grafomotricidad, lectoescritura, abecedario, fichas de matemáticas, tablas de multiplicar',
    canonicalUrl: 'https://www.lessoncraftstudio.com/es/apps/relacionar-fichas',
  },

  // Hero Section - FULL text from matching.md paragraphs 1-6
  hero: {
    title: 'Fichas para Imprimir de Relacionar',
    subtitle: 'Fichas Preescolar y Material Educativo Gratis para Lectoescritura',
    description: `Crea fichas para imprimir profesionales de relacionar columnas con nuestro generador de fichas educativas. Tu suscripción al Paquete Esencial te da acceso ilimitado para crear fichas preescolar y fichas infantil sin costos adicionales por ficha. Genera fichas de relacionar personalizadas perfectas para preescolar, primer grado y segundo grado. Descarga fichas para imprimir de alta calidad en formato PDF en menos de 3 minutos.

Nuestro generador de fichas ofrece cuatro modos diferentes de relacionar. Conecta imágenes con letras iniciales para practicar el abecedario y aprender las letras. Relaciona imágenes con palabras para lectoescritura y desarrollo de vocabulario. Crea ejercicios de números y aprender los números con pares personalizados. Usa el modo personalizado para conectar imágenes con cualquier texto que necesites.

Cada ficha para imprimir es completamente editable. Arrastra, rota y escala cualquier elemento en el lienzo. Cambia colores, fuentes y tamaños de texto. Agrega tus propias imágenes personalizadas junto con las 3000+ imágenes de nuestra biblioteca. Crea fichas preescolar únicas que se adapten perfectamente a las necesidades de tus alumnos.

El generador funciona para grafomotricidad y preparación para escritura. Usa las fichas de relacionar para que los niños practiquen trazar líneas rectas conectando elementos. Combina con fichas de matemáticas para relacionar números con cantidades. Integra con dibujos para colorear creando fichas temáticas completas. El material educativo gratis que buscas está incluido en tu suscripción.

Tu suscripción al Paquete Esencial cuesta $144 anuales o $15 mensuales. Incluye acceso a 10 generadores populares de fichas. Crea fichas gratis ilimitadas sin límite de descargas. Todas las fichas para imprimir se exportan en 300 DPI de calidad profesional. Perfectas para imprimir en casa o vender en plataformas educativas.

El generador incluye soporte para 11 idiomas. Perfecto para clases bilingües de español-inglés. Los nombres de las imágenes cambian según el idioma seleccionado. Esto hace que las fichas para imprimir funcionen naturalmente para enseñanza de inglés como segundo idioma. Cambia entre español e inglés con un clic.`,
    previewImageSrc: '/samples/english/matching/matching portrait.jpeg',
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

  // Sample Gallery - REAL file paths from samples/english/matching/
  samples: {
    sectionTitle: 'Ejemplos de Fichas de Relacionar',
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
        worksheetSrc: '/samples/english/matching/matching portrait.jpeg',
        answerKeySrc: '/samples/english/matching/matching portrait answer_key.jpeg',
        altText: 'Ficha de relacionar imagen con letra inicial en formato vertical para practicar el abecedario en preescolar',
        pdfDownloadUrl: '/samples/english/matching/matching portrait.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/english/matching/image and word.jpeg',
        answerKeySrc: '/samples/english/matching/image and word answer_key.jpeg',
        altText: 'Ficha de relacionar imagen con palabra para lectoescritura y desarrollo de vocabulario',
        pdfDownloadUrl: '/samples/english/matching/image and word.pdf',
      },
      {
        id: '3',
        worksheetSrc: '/samples/english/matching/image and custom word.jpeg',
        answerKeySrc: '/samples/english/matching/image and custom word answer_key.jpeg',
        altText: 'Ficha de relacionar imagen con texto personalizado para fichas de matemáticas y vocabulario específico',
        pdfDownloadUrl: '/samples/english/matching/image and custom word.pdf',
      },
    ],
  },

  // Features Grid - FULL text from matching.md feature sections
  features: {
    sectionTitle: 'Características del Generador de Fichas para Imprimir - Todo lo que Necesitas para Fichas Preescolar y Fichas de Matemáticas',
    sectionDescription: 'Nuestro generador de fichas para imprimir ofrece todas las herramientas que necesitas para crear material educativo gratis profesional. Cada característica está diseñada para maestros ocupados. Crea fichas infantil en minutos, no en horas. Todas las funciones trabajan juntas para facilitar tu trabajo.',
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
        title: 'Crea Fichas para Imprimir en 3 Clics - Generador Rápido de Fichas Preescolar y Lectoescritura',
        description: `El generador de fichas trabaja en tres pasos simples. Selecciona un tema de la biblioteca de imágenes. Elige el modo de relacionar que necesitas. Haz clic en generar y tu ficha para imprimir aparece lista.

Genera fichas preescolar para lectoescritura automáticamente. El sistema selecciona imágenes apropiadas para la edad. Las imágenes se organizan en dos columnas. Los números o puntos guían a los estudiantes. Todo está listo para imprimir en menos de 30 segundos.

No necesitas experiencia en diseño gráfico. El generador crea diseños balanceados automáticamente. Las fichas infantil lucen profesionales desde el primer intento. Perfecto para maestros que necesitan material educativo gratis rápidamente.

Cambia entre diferentes modos de relacionar con un clic. Prueba imagen con letra inicial para practicar el abecedario. Cambia a imagen con palabra para lectoescritura. Selecciona el modo personalizado para fichas de matemáticas. Cada modo genera automáticamente el formato correcto.`,
        highlighted: false,
      },
      {
        id: '2',
        icon: '✏️',
        title: 'Edita Completamente tus Fichas para Imprimir - Personalización Total de Fichas Infantil y Grafomotricidad',
        description: `Cada elemento en tu ficha para imprimir es completamente editable. Haz clic en cualquier imagen para seleccionarla. Arrastra para mover, rota para cambiar orientación. Escala para hacer más grande o más pequeña. Elimina cualquier elemento que no necesites.

Ajusta el espaciado para actividades de grafomotricidad. Mueve las columnas más cerca o más lejos. Esto cambia la dificultad del trazo de líneas. Espacios más largos son más difíciles para niños pequeños. Personaliza según las habilidades de tus alumnos.

Cambia colores de cualquier texto en las fichas preescolar. Usa colores brillantes para llamar la atención. Selecciona colores temáticos para unidades específicas. Cambia el tamaño de fuente para hacerlo más grande y legible. Todo se ajusta en tiempo real en el lienzo.

Agrega texto personalizado a tus fichas para imprimir. Escribe instrucciones en español. Agrega el nombre de la escuela o tu logo. Incluye campos de nombre y fecha. El editor de texto ofrece múltiples fuentes y estilos. Cada ficha infantil refleja tu estilo único.`,
        highlighted: false,
      },
      {
        id: '3',
        icon: '📤',
        title: 'Sube tus Propias Imágenes - Fichas para Imprimir Personalizadas con Dibujos para Colorear',
        description: `Sube múltiples imágenes a la vez desde tu computadora. Acepta formatos JPEG, PNG y GIF. Arrastra y suelta archivos directamente en el navegador. Tus imágenes aparecen en la galería de carga inmediatamente.

Combina imágenes subidas con la biblioteca incluida. Usa fotos de tus propios estudiantes. Agrega dibujos para colorear que ya tienes. Incluye imágenes específicas de tu comunidad o cultura. Esto hace que las fichas preescolar sean más relevantes para tus alumnos.

Sube imágenes de vocabulario específico que enseñas. Perfecto para fichas de matemáticas con objetos familiares. Crea fichas para imprimir sobre temas locales. Los estudiantes conectan mejor con imágenes que reconocen. Esto mejora la retención de lectoescritura.

El sistema redimensiona automáticamente las imágenes subidas. Mantiene las proporciones correctas. Tus imágenes se ven profesionales en las fichas infantil. No necesitas editar imágenes antes de subirlas. El generador maneja todo el procesamiento.`,
        highlighted: false,
      },
      {
        id: '4',
        icon: '🌍',
        title: '11 Idiomas para Fichas para Imprimir Bilingües - Material Educativo Gratis en Español e Inglés',
        description: `El generador funciona en 11 idiomas diferentes. La interfaz cambia completamente al idioma seleccionado. Los nombres de las imágenes también cambian. Esto crea fichas para imprimir auténticas en cada idioma.

Perfecto para clases bilingües de español e inglés. Genera la misma ficha en ambos idiomas. Los estudiantes relacionan conceptos entre idiomas. Esto apoya el desarrollo de lectoescritura bilingüe. Cambia el idioma con un clic en cualquier momento.

Usa fichas preescolar en español para enseñar el abecedario español. Las letras Ñ, CH, LL aparecen correctamente. Los nombres de imágenes usan vocabulario mexicano auténtico. Esto es más efectivo que traducciones automáticas. Los niños aprenden vocabulario natural.

El soporte multiidioma ayuda en escuelas internacionales. Crea fichas infantil para estudiantes de diferentes orígenes. Usa inglés para clases de ESL. Cambia a español para estudiantes nativos. Un solo generador sirve toda tu escuela.`,
        highlighted: false,
      },
      {
        id: '5',
        icon: '💰',
        title: 'Licencia Comercial Incluida - Vende Fichas para Imprimir y Material Educativo Gratis en Teachers Pay Teachers',
        description: `Tu suscripción al Paquete Esencial incluye licencia comercial completa. Vende las fichas para imprimir que creas. No hay costos adicionales de licencia. No se requiere atribución. Esta es una licencia de impresión bajo demanda completa.

Vende en Teachers Pay Teachers como muchos maestros emprendedores. Sube paquetes de fichas preescolar temáticas. Cobra $2 a $5 por paquete. Maestros ganan $500 a $5000 mensuales. Las fichas para imprimir se venden bien todo el año.

Abre una tienda de Etsy vendiendo fichas infantil descargables. Crea paquetes de lectoescritura completos. Ofrece fichas de matemáticas por grado. Los padres homeschoolers compran activamente material educativo gratis de calidad. Etsy tiene millones de compradores buscando recursos educativos.

Publica en Amazon KDP como libros de baja complejidad. Crea libros de actividades usando tus fichas para imprimir. Combina fichas preescolar con dibujos para colorear. Amazon imprime y envía automáticamente. Tú recibes regalías sin inventario. La licencia comercial cubre todo esto.`,
        highlighted: true,
      },
      {
        id: '6',
        icon: '🎨',
        title: 'Biblioteca de 3000+ Imágenes - Fichas para Imprimir con el Abecedario, Números y Dibujos para Colorear',
        description: `Accede a más de 3000 imágenes apropiadas para niños. Organizadas por temas educativos. Encuentra rápidamente lo que necesitas. Todas incluidas sin costo adicional en tu suscripción.

Las imágenes cubren todo el abecedario español. Cada letra tiene múltiples opciones. Aprender las letras es más fácil con variedad. Los estudiantes ven la misma letra con diferentes contextos. Esto refuerza el reconocimiento del abecedario.

La biblioteca incluye imágenes de números del 0 al 100. Perfectas para fichas de matemáticas. Aprender los números con representaciones visuales. Crea fichas para imprimir relacionando números con cantidades. Incluye objetos para contar que los niños reconocen.

Muchas imágenes funcionan como dibujos para colorear. Tienen líneas claras y negras. Los estudiantes pueden colorear después de completar el ejercicio. Esto combina lectoescritura con arte. Las fichas preescolar se convierten en actividades multifuncionales.`,
        highlighted: false,
      },
      {
        id: '7',
        icon: '🖨️',
        title: 'Calidad Profesional 300 DPI - Fichas para Imprimir y Fichas de Matemáticas Listas para Vender',
        description: `Todas las fichas para imprimir se exportan en 300 DPI. Esta es calidad profesional de imprenta. Perfectas para imprimir en casa. Perfectas para vender en línea. Los bordes se ven nítidos y las imágenes claras.

Descarga como archivo JPEG para compartir digitalmente. Descarga como PDF para imprimir múltiples copias. Ambos formatos mantienen la calidad de 300 DPI. Las fichas preescolar lucen profesionales en cualquier impresora.

Activa la opción de escala de grises al descargar. Esto ahorra tinta de impresora. Perfecto cuando imprimes muchas copias de fichas infantil. Los estudiantes aún pueden ver todas las imágenes claramente. Las escuelas con presupuesto limitado aprecian esta opción.

El formato PDF preserva todos los elementos exactamente. Las fichas de matemáticas se imprimen idénticas a la pantalla. No hay sorpresas desagradables. Los campos de nombre y fecha quedan en el lugar correcto. Las instrucciones son legibles. Material educativo gratis que luce profesional construye confianza con padres.`,
        highlighted: true,
      },
    ],
  },

  // How-To Guide - FULL text from matching.md step sections
  howTo: {
    sectionTitle: 'Cómo Crear Fichas para Imprimir en 5 Pasos Fáciles - Generador de Fichas Preescolar y Lectoescritura',
    sectionDescription: 'Crear fichas para imprimir profesionales toma menos de 3 minutos. No necesitas experiencia en diseño. El generador hace el trabajo pesado. Tú decides el contenido y la apariencia. Sigue estos cinco pasos simples para tener tus fichas preescolar listas.',
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
        title: 'Elige tu Contenido - Fichas Infantil con el Abecedario, Números y Dibujos para Colorear',
        description: `Abre el generador y selecciona el modo de relacionar. Tienes cuatro opciones diferentes. Cada modo crea un tipo diferente de ficha para imprimir.

El modo "Imagen ↔ Letra Inicial" crea fichas para practicar el abecedario. Perfecto para preescolar y primer grado. Las imágenes se relacionan con su letra inicial. Los niños conectan A con Avión, B con Ballena. Este modo enseña aprender las letras de forma visual.

El modo "Imagen+Palabra ↔ Imagen+Palabra" muestra ambas columnas con imagen y texto. Los estudiantes relacionan pares idénticos. Excelente para reconocimiento visual y lectoescritura. Los niños ven la palabra mientras hacen la conexión.

El modo "Imagen/Palabra ↔ Imagen/Palabra" es el más flexible. Una columna puede tener solo imágenes. La otra solo palabras. O mezcla ambas. Úsalo para fichas infantil creativas donde los niños relacionan conceptos diferentes.

El modo "Imagen ↔ Palabra Personalizada" te da control total. Escribe cualquier palabra que necesites. Relaciona manzana con "fruta". Conecta números con sus nombres escritos. Perfecto para fichas de matemáticas donde relacionas operaciones con resultados. También funciona para tablas de multiplicar relacionando "3×4" con "12".

La biblioteca tiene más de 3000 imágenes organizadas por temas. Encuentra imágenes para el abecedario completo. Incluye números del 0 al 100. Hay dibujos para colorear con líneas claras. Usa el buscador para encontrar imágenes específicas rápidamente.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Personaliza la Configuración - Fichas de Matemáticas, Grafomotricidad y Tablas de Multiplicar',
        description: `Configura los ajustes antes de generar. Estos controlan cómo se ve tu ficha para imprimir.

Selecciona el tamaño de página. Carta Vertical funciona para la mayoría de maestros mexicanos. Carta Horizontal da más espacio horizontal. A4 Vertical y Horizontal funcionan en escuelas con impresoras europeas. Cuadrado crea diseños únicos. Personalizado te deja ingresar dimensiones exactas.

Decide si incluir campos de nombre y fecha. Activa esta opción para fichas preescolar que los niños llevan a casa. Los padres ven el nombre y fecha del trabajo. Desactívala para fichas infantil que usas solo en clase.

La opción de números de ejercicio numera cada par. "1. ___ 2. ___ 3. ___" aparece junto a cada elemento. Esto ayuda cuando revisas respuestas. Desactívala si no necesitas números.

La opción de puntos o viñetas muestra puntos guía. Los niños ven dónde empezar cada línea. Perfecto para actividades de grafomotricidad. Los puntos ayudan a niños pequeños. Desactívalos para estudiantes mayores que no necesitan guías.

Ajusta el número máximo de pares. Entre 4 y 12 pares funciona bien. Menos pares para preescolar. Más pares para segundo y tercer grado. Fichas de matemáticas con 8-10 pares funcionan bien. Tablas de multiplicar pueden tener hasta 12 pares.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Genera tu Ficha para Imprimir - Fichas Preescolar de Lectoescritura Listas en Segundos',
        description: `Haz clic en el botón "Generar Ficha". El sistema trabaja inmediatamente. Tu ficha para imprimir aparece en el lienzo en menos de 5 segundos.

El generador organiza las imágenes automáticamente. Las coloca en dos columnas. La columna izquierda tiene los elementos a relacionar. La columna derecha tiene las respuestas mezcladas. Los estudiantes trazan líneas conectando pares correctos.

Cada elemento tiene un número o punto guía. Esto ayuda a los estudiantes a seguir orden. También facilita la revisión del maestro. Las instrucciones aparecen en la parte superior. Todo está listo para usar.

La ficha para imprimir ya está balanceada visualmente. El espaciado es uniforme. Las imágenes tienen el tamaño apropiado. El texto es legible. No necesitas ajustar nada si no quieres.

El sistema también genera la clave de respuestas automáticamente. Haz clic en la pestaña "Clave de Respuestas". Ves la misma ficha con las líneas correctas dibujadas. Esto ahorra tiempo al calificar. Las fichas preescolar de lectoescritura vienen con respuestas incluidas.

Si seleccionaste "Tema Aleatorio", el generador eligió un tema coherente. Todas las imágenes se relacionan. Esto hace fichas infantil más educativas. Los estudiantes aprenden vocabulario temático mientras practican.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Edita en el Lienzo - Personaliza Fichas Infantil y Material Educativo Gratis',
        description: `Ahora personaliza tu ficha para imprimir. Todo en el lienzo es editable. Haz clic en cualquier elemento para seleccionarlo.

Mueve imágenes arrastrándolas. Cambia el espaciado entre columnas. Esto ajusta la dificultad de grafomotricidad. Columnas más separadas requieren líneas más largas. Los niños pequeños necesitan espacios más cortos. Tú controlas la dificultad.

Rota imágenes si lo necesitas. Algunas imágenes se ven mejor en ángulos. Esto también hace la ficha para imprimir más interesante visualmente. Los niños mantienen más atención con diseños variados.

Cambia el tamaño de cualquier imagen. Haz más grande la imagen principal. Reduce imágenes menos importantes. Esto guía la atención de los estudiantes. Las fichas preescolar funcionan mejor con jerarquía visual clara.

Haz clic en texto para editarlo. Cambia las instrucciones al español que usas en tu clase. Modifica los títulos. Agrega tu nombre o el de la escuela. Las fichas infantil personalizadas se sienten más profesionales.

Usa las herramientas de alineación. Alinea múltiples elementos a la vez. Centra todo en la página. Distribuye elementos uniformemente. Esto hace diseños más limpios y profesionales.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Descarga e Imprime - Fichas para Imprimir con Grafomotricidad y Aprender las Letras',
        description: `Tu ficha para imprimir está lista. Ahora descárgala en formato de alta calidad.

Haz clic en el menú de descarga. Ves cuatro opciones principales. "Ficha (JPEG)" descarga la ficha principal. "Clave de Respuestas (JPEG)" descarga las respuestas. "Ficha (PDF)" y "Clave de Respuestas (PDF)" dan formato PDF.

JPEG funciona bien para compartir digitalmente. Envía por WhatsApp a los padres. Sube a Google Classroom. El archivo es más pequeño. Se carga rápido en dispositivos móviles.

PDF funciona mejor para imprimir. El formato preserva la calidad exacta. No hay compresión. Las fichas preescolar se imprimen exactamente como las ves. El PDF es ideal para imprimir múltiples copias en la escuela.

Activa la opción de escala de grises antes de descargar. Esto convierte todo a blanco y negro. Ahorra mucha tinta de color. Perfecto cuando imprimes 30 copias para toda la clase. Las fichas infantil aún son claras en gris.

La escala de grises también crea dibujos para colorear automáticamente. Las imágenes en gris invitan a los niños a colorear. Combinas lectoescritura con arte. Una actividad se convierte en dos. Los estudiantes completan la ficha, luego la colorean.

Todas las descargas son 300 DPI. Esta es calidad profesional. Perfecta para imprimir. Perfecta para vender. Los bordes son nítidos. Las imágenes claras. El texto legible. Las fichas para imprimir lucen como material comercial.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from matching.md use case sections
  useCases: {
    sectionTitle: 'Perfecto para Maestros y Padres - Fichas para Imprimir y Material Educativo Gratis para Cada Necesidad',
    sectionDescription: 'Las fichas para imprimir de relacionar funcionan para muchos tipos de educadores. Cada grupo encuentra valor único. El generador se adapta a diferentes estilos de enseñanza. Maestros de preescolar hasta tercer grado usan estas fichas. Padres homeschoolers y maestros emprendedores también. Las necesidades son diferentes pero el generador sirve a todos.',
    badgeText: 'Para Quién',
    readMoreLabel: 'Leer más',
    showLessLabel: 'Ver menos',
    items: [
      {
        id: '1',
        icon: '👶',
        title: 'Maestros de Preescolar - Fichas Infantil para Grafomotricidad, Lectoescritura y el Abecedario',
        subtitle: 'Fichas para Grafomotricidad y Desarrollo del Abecedario',
        description: `Los maestros de preescolar necesitan actividades de grafomotricidad diariamente. Las fichas para imprimir de relacionar desarrollan control del lápiz. Los niños trazan líneas de un elemento a otro. Esto fortalece los músculos de la mano. La práctica constante mejora la escritura futura.

El modo de letra inicial enseña el abecedario de forma divertida. Los niños de 4-5 años conectan imágenes con letras. Ven que Avión empieza con A. Ballena con B. Cada ficha infantil refuerza aprender las letras visualmente. Los estudiantes asocian sonidos con símbolos.

Las fichas preescolar de relacionar mantienen a los niños enfocados. La actividad tiene un inicio y fin claros. Los estudiantes saben cuándo terminaron. Esto desarrolla independencia. Los niños completan la tarea solos mientras tú trabajas con grupos pequeños.

La opción de dibujos para colorear extiende el tiempo de actividad. Los niños completan la ficha de relacionar primero. Después colorean las imágenes. Una actividad se convierte en dos. Esto es perfecto para centros de aprendizaje. Los estudiantes permanecen ocupados productivamente por más tiempo.

Ajusta la dificultad de grafomotricidad moviendo las columnas. Columnas cercanas para septiembre cuando las habilidades son nuevas. Columnas más separadas en abril cuando el control mejoró. Tú controlas el desafío según el desarrollo de los niños.`,
        quote: '¡Mis alumnos de preescolar aman conectar las imágenes!',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Docentes de Primaria - Fichas de Matemáticas, Tablas de Multiplicar y Aprender los Números',
        subtitle: 'Práctica de Matemáticas y Tablas de Multiplicar para Primaria',
        description: `Los docentes de primer grado usan fichas para imprimir para lectoescritura. El modo Imagen+Palabra fortalece el reconocimiento de palabras. Los estudiantes ven la palabra y la imagen juntas. Esto apoya la decodificación temprana. Las fichas preescolar del jardín de niños evolucionan a fichas de primer grado.

El modo personalizado crea fichas de matemáticas poderosas. Relaciona números escritos con cantidades. Conecta operaciones con respuestas. Escribe "5+3" en una columna. La imagen con 8 objetos va en la otra. Los estudiantes relacionan el problema con la respuesta visual.

Segundo grado usa fichas para practicar tablas de multiplicar. Escribe "3×4" y ponlo con imagen de 12 objetos. Los estudiantes relacionan la operación con el resultado. Esto refuerza hechos matemáticos. Las fichas de matemáticas hacen la práctica más visual que hojas de ejercicios tradicionales.

Las fichas para imprimir funcionan para práctica de vocabulario. Los maestros de segundo grado crean listas de palabras semanales. Relacionan palabra con definición. Palabra con sinónimo. Palabra con imagen. Cada semana genera nuevas fichas. El contenido siempre está fresco y relevante.

Los docentes aprecian la generación automática de claves de respuestas. Con 25-30 estudiantes, revisar toma mucho tiempo. La clave de respuestas hace la corrección rápida. Identifica errores comunes fácilmente. Esto informa tu enseñanza futura.`,
        quote: 'Las tablas de multiplicar son más fáciles con fichas visuales.',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Padres Homeschoolers - Material Educativo Gratis y Fichas Preescolar Personalizadas para Múltiples Niveles',
        subtitle: 'Material Adaptable para Educación en Casa',
        description: `Los padres homeschoolers enseñan múltiples niveles simultáneamente. Necesitan material educativo gratis que funcione para diferentes edades. El generador crea fichas para imprimir para cada hijo rápidamente. Una ficha simple de abecedario para el niño de 4 años. Fichas de matemáticas de multiplicación para el de 8 años.

Sube fotos familiares para hacer fichas preescolar personales. Los niños homeschool aprenden mejor con contexto familiar. Usa fotos de las vacaciones. Imágenes de mascotas. Fotos de miembros de la familia. Las fichas infantil se vuelven recuerdos significativos.

La flexibilidad de temas ayuda con unidades de estudio. Esta semana estudian océanos. Genera fichas para imprimir con animales marinos. La próxima semana es el sistema solar. Crea fichas con planetas. El material siempre se alinea con tu plan de estudios.

Los padres homeschoolers valoran el ahorro de tiempo. No necesitas buscar hojas imprimibles en internet. No necesitas comprar libros caros de actividades. No necesitas suscripciones a múltiples sitios. Una suscripción al Paquete Esencial por $144 anuales da acceso a todo. Esto es más económico que materiales tradicionales.

La licencia comercial beneficia a padres que venden currículos. Algunos padres homeschoolers crean y venden recursos. Puedes incluir estas fichas para imprimir en tus paquetes. Vende en co-ops locales. Ofrece en grupos de homeschool. La licencia lo permite todo.`,
        quote: 'Una herramienta para todos los niveles de mis hijos.',
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Maestros de Inglés - Fichas para Imprimir Bilingües para Lectoescritura en Dos Idiomas',
        subtitle: 'Fichas Bilingües para Programas de Inmersión',
        description: `Los maestros de inglés como segundo idioma necesitan material educativo gratis bilingüe. El generador ofrece contenido en 11 idiomas. Genera la misma ficha en español y en inglés. Los estudiantes comparan vocabulario entre idiomas.

Crea fichas preescolar donde los niños relacionan la imagen con la palabra en ambos idiomas. La imagen de manzana se conecta con "apple" en inglés. En la versión española conecta con "manzana". Los estudiantes ven ambas fichas. Esto refuerza equivalencias.

El modo personalizado es perfecto para vocabulario temático bilingüe. Enseñas colores esta semana. Crea fichas para imprimir relacionando colores con objetos. Usa el generador en inglés. Genera otra versión en español. Los estudiantes practican en ambos idiomas.

Las escuelas con programas de inmersión dual usan estas fichas infantil constantemente. Parte del día en español, parte en inglés. Necesitas materiales idénticos en ambos idiomas. El generador hace esto fácil. Cambia el idioma, genera nuevamente. Todo el texto se traduce automáticamente.

Los nombres de las imágenes cambian según el idioma seleccionado. Esto es crítico para que las fichas de lectoescritura funcionen correctamente. En español, la imagen se llama "gato". En inglés, la misma imagen es "cat". El sistema maneja esto automáticamente.`,
        quote: 'El soporte bilingüe es perfecto para mi clase de inmersión.',
      },
      {
        id: '5',
        icon: '💜',
        title: 'Educación Especial - Fichas Infantil Adaptables con Grafomotricidad y Dibujos para Colorear',
        subtitle: 'Fichas Personalizables para Necesidades Especiales',
        description: `Los maestros de educación especial necesitan material educativo gratis altamente adaptable. Cada estudiante tiene necesidades diferentes. Las fichas para imprimir se personalizan completamente. Ajusta todo para cada estudiante individual.

Estudiantes con retrasos en motricidad fina practican grafomotricidad intensivamente. Las fichas de relacionar son terapia disfrazada de actividad escolar. Los niños no sienten que están en terapia. Simplemente completan una ficha divertida. Las líneas de conexión fortalecen control del lápiz naturalmente.

Agranda las imágenes para estudiantes con problemas visuales. Haz el texto más grande. Usa colores de alto contraste. Todo es editable. Cada ficha preescolar se adapta exactamente a las necesidades de accesibilidad.

Reduce el número de pares para evitar sobrecargar. Un estudiante con autismo puede manejar solo 4 pares. Otro estudiante sin discapacidades hace 10 pares. Generas fichas infantil diferentes del mismo tema. Todos trabajan en la misma unidad pero a su nivel.

Los dibujos para colorear extienden el trabajo para estudiantes que terminan rápido. También calman a estudiantes que necesitan actividades repetitivas. Colorear es relajante. Combinar lectoescritura con arte apoya múltiples estilos de aprendizaje.`,
        quote: 'Puedo adaptar cada ficha a las necesidades de mis estudiantes.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Maestros Emprendedores - Vende Fichas para Imprimir y Material Educativo Gratis en Etsy y Teachers Pay Teachers',
        subtitle: 'Genera Ingresos Vendiendo Recursos Educativos',
        description: `Miles de maestros ganan ingresos extra vendiendo recursos educativos. Las fichas para imprimir se venden extremadamente bien. Los maestros buscan constantemente material educativo gratis de calidad para descargar. Tu suscripción al Paquete Esencial incluye licencia comercial completa.

Teachers Pay Teachers es el mercado más grande. Millones de maestros compran ahí mensualmente. Las fichas preescolar de relacionar son productos populares. Crea paquetes temáticos. "Relacionar Animales de Granja - 10 Fichas". Cobra $3-5 por paquete. Los maestros compran porque ahorran tiempo.

Combina fichas infantil con otros recursos para paquetes más grandes. Fichas de relacionar más dibujos para colorear más actividades de escritura. Cobra $8-12 por paquetes completos. Los compradores valoran recursos cohesivos. Un tema consistente a través de múltiples actividades.

Etsy es perfecto para vender a padres. Los padres homeschoolers compran activamente. Las fichas de matemáticas para practicar en casa se venden bien. Empaqueta por grado: "Fichas de Matemáticas Primer Grado - Paquete Completo". Los padres buscan soluciones completas.

Crea productos de nicho para mayores ganancias. "Fichas Bilingües Español-Inglés" atiende mercado específico. "Fichas de Grafomotricidad para Educación Especial" sirve necesidad particular. Los productos de nicho tienen menos competencia. Puedes cobrar más.`,
        quote: '¡Mi suscripción se pagó sola el primer mes vendiendo fichas!',
      },
    ],
  },

  // FAQ Section - Selected FAQs from matching.md
  faq: {
    sectionTitle: 'Preguntas Frecuentes sobre Fichas para Imprimir de Relacionar - Material Educativo Gratis y Fichas Preescolar',
    sectionDescription: 'Preguntas frecuentes sobre nuestro generador de fichas de relacionar y fichas para imprimir gratis.',
    showMoreText: 'Ver más preguntas',
    showLessText: 'Ver menos',
    badgeText: 'FAQ',
    readMoreLabel: 'Leer más',
    showLessLabel: 'Ver menos',
    secureCheckout: 'Pago seguro',
    cancelAnytime: 'Cancela cuando quieras',
    items: [
      {
        id: '1',
        question: '¿Este Generador de Fichas para Imprimir es Realmente Gratis? Material Educativo Gratis con Suscripción',
        answer: 'El generador de fichas para imprimir requiere una suscripción al Paquete Esencial que cuesta $144 anuales o $15 mensuales. Tu suscripción te da creación ilimitada de fichas sin cargos por ficha individual. Genera tantas fichas preescolar como necesites sin costos adicionales. Crea material educativo gratis ilimitado durante todo el año. El Paquete Esencial incluye 10 generadores populares de fichas. La suscripción Acceso Completo cuesta $240 anuales e incluye los 33 tipos de generadores. Ambas suscripciones incluyen licencia comercial, soporte para 11 idiomas y exportación en calidad profesional 300 DPI.',
      },
      {
        id: '2',
        question: '¿Puedo Imprimir las Fichas para Imprimir en Casa con una Impresora Normal? Fichas Preescolar para Cualquier Impresora',
        answer: 'Sí, todas las fichas para imprimir funcionan perfectamente en impresoras domésticas normales. Cualquier impresora de inyección de tinta o láser imprime estas fichas preescolar con calidad profesional. No necesitas impresora especial o papel especial. Las fichas infantil se imprimen en papel de 8.5×11 pulgadas normal o tamaño A4. Las fichas para imprimir se exportan en formato PDF de alta resolución que preserva toda la calidad. Activa la opción de escala de grises antes de descargar para ahorrar tinta de color.',
      },
      {
        id: '3',
        question: '¿Necesito Habilidades de Diseño para Crear Fichas Preescolar y Fichas Infantil Profesionales?',
        answer: 'No necesitas ninguna habilidad de diseño. El generador crea diseños profesionales automáticamente. Selecciona tus opciones. Haz clic en generar. Las fichas para imprimir aparecen completamente diseñadas. El espaciado es uniforme. Las imágenes están balanceadas. Todo luce profesional desde el primer intento. Si quieres personalizar, las herramientas de edición son simples. Arrastra elementos para mover. Haz clic para cambiar colores. Todo es visual y directo. La biblioteca de 3000+ imágenes está organizada por temas y lista para usar.',
      },
      {
        id: '4',
        question: '¿Puedo Usar las Fichas Infantil en Mi Clase con Mis Estudiantes? Fichas Preescolar para Uso Educativo',
        answer: 'La suscripción al Paquete Esencial incluye uso ilimitado en tu salón de clases. Imprime tantas copias como necesites para tus estudiantes. Usa las fichas para imprimir para tarea, trabajo en clase, centros de aprendizaje o evaluaciones. No hay restricciones en cómo usas el material con tus estudiantes. Comparte las fichas preescolar digitalmente con tus estudiantes en plataformas como Google Classroom. Los estudiantes pueden completar las fichas infantil en tabletas o imprimirlas en casa. Tu suscripción cubre todo uso educativo con tus propios estudiantes.',
      },
      {
        id: '5',
        question: '¿En Qué Idiomas Están Disponibles las Fichas para Imprimir? Lectoescritura Multiidioma y Fichas Bilingües',
        answer: 'Las fichas para imprimir funcionan en 11 idiomas diferentes: inglés, alemán, francés, español, italiano, portugués brasileño, holandés, danés, sueco, noruego y finlandés. La interfaz completa cambia al idioma seleccionado. Los nombres de las imágenes también cambian automáticamente. Esto es especialmente importante para fichas de lectoescritura. Cuando seleccionas español, las imágenes usan nombres en español. Genera la misma ficha en múltiples idiomas para comparación y apoyo de aprendizaje bilingüe. El soporte multiidioma está incluido sin costo adicional.',
      },
      {
        id: '6',
        question: '¿Puedo Vender las Fichas de Matemáticas y Tablas de Multiplicar que Creo? Licencia Comercial Incluida',
        answer: 'Sí. La suscripción al Paquete Esencial incluye licencia comercial completa de impresión bajo demanda sin costo adicional. Vende las fichas para imprimir que creas en Teachers Pay Teachers, Etsy, Amazon KDP o tu propia tienda. No hay límites en cuánto vendes. No se requiere atribución. Las fichas de matemáticas con tablas de multiplicar se venden particularmente bien. La licencia comercial normalmente cuesta $100-200 anuales extra con competidores. Con el Paquete Esencial está incluida en los $144 anuales.',
      },
      {
        id: '7',
        question: '¿Cómo Personalizo las Fichas para Imprimir para Grafomotricidad y Necesidades Específicas?',
        answer: 'Cada elemento en las fichas para imprimir es completamente editable. Haz clic en cualquier imagen para seleccionarla. Arrástrala para cambiar posición. Esto ajusta el espaciado entre columnas. Columnas más separadas crean líneas más largas para grafomotricidad avanzada. Columnas más cercanas son más fáciles para principiantes. Cambia el tamaño de cualquier imagen individualmente. Haz imágenes más grandes para estudiantes con problemas visuales. Reduce imágenes si necesitas más espacio. Agrega o edita texto completamente. La flexibilidad es ilimitada.',
      },
      {
        id: '8',
        question: '¿Para Qué Edades Funcionan Mejor Estas Fichas para Imprimir? Abecedario, Números y Desarrollo Apropiado',
        answer: 'Las fichas para imprimir de relacionar funcionan para edades 4-9 años principalmente. Esto cubre desde preescolar hasta tercer grado. El modo de letra inicial con el abecedario es perfecto para edades 4-6 años. Los niños están aprendiendo las letras en esta etapa. El modo de relacionar números con cantidades funciona para edades 5-7 años. Las tablas de multiplicar con el modo personalizado funcionan para edades 7-9 años. Ajusta la dificultad para cada edad con menos pares para niños más pequeños y más pares para estudiantes mayores.',
      },
      {
        id: '9',
        question: '¿Puedo Subir Mis Propias Imágenes a las Fichas Infantil? Dibujos para Colorear y Fotos Personales',
        answer: 'Sí, puedes subir múltiples imágenes a la vez. El generador acepta formatos JPEG, PNG y GIF. Arrastra y suelta archivos directamente desde tu computadora. Tus imágenes aparecen en una galería personal. Úsalas en cualquier ficha para imprimir que crees. Combina imágenes subidas con la biblioteca de 3000+ imágenes. Usa fotos de tus propios estudiantes. Agrega dibujos para colorear que ya tienes. Incluye imágenes de tu comunidad local. El sistema redimensiona las imágenes automáticamente manteniendo la calidad.',
      },
      {
        id: '10',
        question: '¿Cuánto Tiempo Toma Crear Fichas para Imprimir Profesionales de Relacionar?',
        answer: 'Crear una ficha para imprimir básica toma menos de 3 minutos. Selecciona tu modo de relacionar. Elige un tema o imágenes específicas. Haz clic en generar. Tu ficha preescolar aparece lista. Descarga inmediatamente en PDF o JPEG. Si personalizas la ficha, agrega 2-5 minutos adicionales. Mueve algunas imágenes. Cambia colores de texto. Agrega tu nombre. Ajusta el espaciado. Aun con personalización, terminas en menos de 10 minutos totales. Esto es 6 veces más rápido que crear fichas infantil desde cero.',
      },
      {
        id: '11',
        question: '¿Las Fichas de Matemáticas Incluyen Claves de Respuestas? Tablas de Multiplicar con Respuestas',
        answer: 'Sí, el generador crea claves de respuestas automáticamente para todas las fichas para imprimir. Haz clic en la pestaña "Clave de Respuestas" después de generar tu ficha. Verás la misma ficha con las líneas correctas dibujadas. Esto muestra exactamente qué elementos relacionar. Las claves de respuestas descargan en el mismo formato que la ficha principal. PDF o JPEG en 300 DPI. Para fichas de matemáticas con tablas de multiplicar, la clave muestra las conexiones correctas. Verificas respuestas en segundos. Identificas errores comunes fácilmente.',
      },
      {
        id: '12',
        question: '¿Puedo Crear Fichas para Imprimir sobre Temas Escolares Específicos? Números, Abecedario y Lectoescritura Curricular',
        answer: 'Sí, el generador es extremadamente flexible para temas curriculares. Usa el modo personalizado para crear fichas sobre cualquier tema que enseñes. Relaciona números con sus nombres escritos. Conecta letras del abecedario con palabras que empiezan con esa letra. Asocia vocabulario de lectoescritura con definiciones. Para matemáticas, relaciona fracciones con representaciones visuales. Conecta formas geométricas con sus nombres. Para lectoescritura, relaciona palabras con imágenes. Conecta sinónimos. El modo personalizado con el abecedario visual apoya aprendizaje en todas las materias.',
      },
    ],
  },

  // Pricing
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
      '10 generadores de fichas populares',
    ],
    ctaText: 'Comenzar Ahora',
    guaranteeText: 'Garantía de devolución de 30 días',
  },

  // Related Apps
  relatedApps: {
    sectionTitle: 'Combina Fichas para Imprimir de Relacionar con Otros Generadores - Fichas de Matemáticas, Grafomotricidad, Dibujos para Colorear y Tablas de Multiplicar',
    sectionDescription: 'Crea paquetes de aprendizaje completos combinando las fichas de relacionar con estos generadores complementarios.',
    ctaTitle: '¿Listo para Crear Fichas Increíbles?',
    ctaDescription: 'Únete a miles de maestros que crean fichas profesionales. Generación ilimitada, licencia comercial incluida.',
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
        slug: 'word-search',
        name: 'Sopa de Letras',
        category: 'Lenguaje',
        icon: '🔤',
        description: 'Combina fichas de relacionar con sopas de letras usando el mismo vocabulario para reforzar lectoescritura.',
      },
      {
        id: '2',
        slug: 'drawing-lines',
        name: 'Trazar Líneas',
        category: 'Grafomotricidad',
        icon: '✏️',
        description: 'Extiende la práctica de grafomotricidad con hojas de trazado de líneas rectas y curvas.',
      },
      {
        id: '3',
        slug: 'alphabet-train',
        name: 'Tren del Abecedario',
        category: 'Alfabeto',
        icon: '🚂',
        description: 'Complementa el aprendizaje del abecedario con actividades de secuencia de letras.',
      },
      {
        id: '4',
        slug: 'coloring',
        name: 'Colorear',
        category: 'Creatividad',
        icon: '🎨',
        description: 'Combina fichas de relacionar con mandalas y dibujos para colorear para sesiones artísticas completas.',
      },
      {
        id: '5',
        slug: 'find-and-count',
        name: 'Buscar y Contar',
        category: 'Matemáticas',
        icon: '🔍',
        description: 'Practica números y conteo con actividades visuales de buscar objetos escondidos.',
      },
      {
        id: '6',
        slug: 'addition',
        name: 'Suma',
        category: 'Matemáticas',
        icon: '➕',
        description: 'Refuerza conceptos de fichas de matemáticas con hojas de práctica de operaciones.',
      },
    ],
  },
};

export default matchingEsContent;
