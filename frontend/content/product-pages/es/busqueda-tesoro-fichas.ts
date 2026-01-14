import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Treasure Hunt Worksheets - Spanish (Mexican) Content
 *
 * File: frontend/content/product-pages/es/busqueda-tesoro-fichas.ts
 * URL: /es/apps/busqueda-tesoro-fichas (Spanish SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Spanish/treasure-hunt.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const treasureHuntEsContent: ProductPageContent = {
  // SEO Metadata - Spanish language-specific
  seo: {
    slug: 'busqueda-tesoro-fichas',
    appId: 'treasure-hunt',
    title: 'Fichas para Imprimir de Búsqueda del Tesoro | Generador de Fichas Infantil con Direcciones',
    description: 'Crea fichas para imprimir profesionales de búsqueda del tesoro con nuestro generador especializado. Genera fichas gratis personalizadas perfectas para educación infantil y primaria. Descarga material educativo en PDF de alta calidad en menos de 3 minutos.',
    keywords: 'fichas para imprimir, búsqueda del tesoro, fichas infantil, fichas preescolar, direcciones, material educativo gratis, grafomotricidad, lectoescritura, ejercicios matemáticas, fichas gratis',
    canonicalUrl: 'https://www.lessoncraftstudio.com/es/apps/busqueda-tesoro-fichas',
  },

  // Hero Section - FULL text from treasure-hunt.md paragraphs 1-4
  hero: {
    title: 'Fichas de Búsqueda del Tesoro',
    subtitle: 'Generador de Fichas Infantil con Direcciones',
    description: `Crea fichas para imprimir profesionales de búsqueda del tesoro con nuestro generador especializado. Tu suscripción Acceso Completo te da creación ilimitada de fichas educativas sin cargos por ficha individual. Genera fichas gratis personalizadas de búsqueda del tesoro perfectas para educación infantil y educación primaria. Descarga material educativo gratis de alta calidad en PDF en menos de 3 minutos.

Las fichas de búsqueda del tesoro enseñan a los niños a seguir direcciones paso a paso mientras practican vocabulario espacial. Los estudiantes leen instrucciones como "mueve 2 hacia arriba" o "mueve 1 a la derecha" para encontrar el tesoro escondido en una cuadrícula de 5×5. Cada ficha para imprimir combina comprensión lectora con conceptos de direccionalidad. Los maestros utilizan estas fichas preescolar para desarrollar habilidades de seguimiento de instrucciones.

El generador ofrece dos tipos de direcciones según la edad de los estudiantes. Las direcciones básicas utilizan arriba abajo izquierda derecha para niños de preescolar a primer grado. Las direcciones cardinales usan norte sur este oeste para estudiantes de segundo grado en adelante. Ambas opciones crean fichas infantil efectivas que refuerzan conceptos espaciales. Elige el nivel apropiado para tus estudiantes y genera material educativo profesional.

Cada ficha incluye seis pasos de direcciones y una cuadrícula visual con imágenes temáticas. Los estudiantes marcan su camino siguiendo las instrucciones escritas. El generador crea automáticamente una clave de respuestas con un marcador rojo mostrando la ubicación del tesoro. Descarga fichas para imprimir personalizadas con tus propias imágenes o selecciona de nuestra biblioteca de 3000 imágenes. Acceso Completo incluye todos los generadores de fichas más licencia comercial para vender en plataformas digitales.`,
    previewImageSrc: '/samples/english/treasure hunt/up down.jpeg',
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

  // Sample Gallery - REAL file paths from samples/english/treasure hunt/
  samples: {
    sectionTitle: 'Ejemplos de Fichas de Búsqueda del Tesoro',
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
        worksheetSrc: '/samples/english/treasure hunt/up down.jpeg',
        answerKeySrc: '/samples/english/treasure hunt/up down answer_key.jpeg',
        altText: 'Ficha de búsqueda del tesoro con direcciones básicas arriba abajo izquierda derecha para preescolar',
        pdfDownloadUrl: '/samples/english/treasure hunt/up down.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/english/treasure hunt/north south.jpeg',
        answerKeySrc: '/samples/english/treasure hunt/north south answer_key.jpeg',
        altText: 'Ficha de búsqueda del tesoro con direcciones cardinales norte sur este oeste para primaria',
        pdfDownloadUrl: '/samples/english/treasure hunt/north south.pdf',
      },
    ],
  },

  // Features Grid - FULL text from treasure-hunt.md feature sections
  features: {
    sectionTitle: 'Características del Generador de Fichas para Imprimir - Todo lo que Necesitas para Material Educativo Gratis',
    sectionDescription: 'Nuestro generador de búsqueda del tesoro incluye todas las herramientas profesionales que los maestros necesitan. Crea fichas para imprimir personalizadas en minutos sin experiencia en diseño. Acceso Completo te da acceso a funciones avanzadas para crear material educativo de calidad. Los docentes de educación infantil y primaria utilizan estas características diariamente para crear fichas gratis efectivas.',
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
        title: 'Crea Fichas Infantil en 3 Clics - Generador Rápido de Fichas Preescolar',
        description: `Genera fichas para imprimir completas en menos de tres minutos. Selecciona un tema de la biblioteca y el generador crea automáticamente una cuadrícula de 5×5 con seis imágenes diferentes. Cada imagen aparece exactamente una vez en la cuadrícula sin repeticiones adyacentes. El sistema genera seis pasos de direcciones aleatorias apropiadas para la edad de tus estudiantes.

Elige entre direcciones básicas o cardinales según el nivel de tus alumnos. Las fichas preescolar usan arriba abajo izquierda derecha para estudiantes pequeños. Las fichas de segundo y tercer grado utilizan norte sur este oeste para reforzar conceptos cardinales. Tu ficha aparece instantáneamente con instrucciones completas en español. Descarga y usa tus fichas infantil en la misma sesión.`,
        highlighted: false,
      },
      {
        id: '2',
        icon: '✏️',
        title: 'Edita Todo en tu Ficha para Imprimir - Personalización Completa de Fichas Gratis',
        description: `Cada elemento en el lienzo es completamente editable después de generar. Arrastra mueve escala y rota cualquier imagen con el ratón. Cambia colores de texto con el selector de color RGB completo. Ajusta tamaños de fuente desde 8 píxeles hasta cualquier tamaño que necesites. Mueve la cuadrícula de direcciones a cualquier posición en la página.

Agrega texto adicional con siete fuentes diferentes incluidas. Crea títulos personalizados con el nombre de tu estudiante o la fecha. Las fichas gratis que generas son completamente tuyas para modificar. Bloquea elementos individuales cuando tengas el diseño perfecto. El sistema guarda tu historial de edición con deshacer y rehacer ilimitado para todas las fichas para imprimir.`,
        highlighted: false,
      },
      {
        id: '3',
        icon: '📤',
        title: 'Sube tus Propias Imágenes para Fichas Infantil Personalizadas',
        description: `Carga múltiples archivos de imagen simultáneamente sin límite de cantidad. El generador acepta JPEG PNG GIF y todos los formatos de imagen comunes. Combina imágenes de la biblioteca con tus fotos personales en la misma ficha. Crea fichas preescolar con imágenes de objetos de tu propia aula.

Los maestros suben fotos de manipulativos objetos del aula o materiales específicos de su currículo. Personaliza fichas para imprimir con imágenes relevantes para tus estudiantes mexicanos. Usa fotografías de lugares locales animales regionales o alimentos tradicionales. Las fichas gratis personalizadas aumentan el compromiso de los estudiantes con contenido culturalmente relevante.`,
        highlighted: false,
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Fichas para Imprimir en 11 Idiomas - Material Educativo Multilingüe',
        description: `Todas las instrucciones de dirección aparecen automáticamente en español mexicano. El generador traduce "Comienza en" y "Mueve" más todos los términos direccionales. Los nombres de imágenes también aparecen en el idioma seleccionado para comprensión completa. Cambia el idioma del contenido independientemente del idioma de la interfaz.

Crea fichas infantil bilingües para programas de inmersión dual. Genera la misma actividad en inglés y español para comparación directa. Los maestros de ESL utilizan las 11 opciones de idioma para estudiantes diversos. Perfecto para escuelas internacionales con poblaciones multilingües que necesitan fichas gratis adaptables.`,
        highlighted: false,
      },
      {
        id: '5',
        icon: '💰',
        title: 'Licencia Comercial Incluida para Vender Fichas para Imprimir',
        description: `Acceso Completo incluye licencia completa de impresión bajo demanda sin costos adicionales. Vende tus fichas infantil personalizadas en Etsy Teachers Pay Teachers o Amazon KDP. No se requiere atribución ni permisos especiales más allá de tu suscripción. La calidad de 300 DPI asegura impresiones profesionales para productos comerciales.

Los emprendedores docentes crean paquetes temáticos de fichas preescolar para vender mensualmente. Combina búsqueda del tesoro con otras fichas gratis de la plataforma en paquetes curriculares completos. Muchos maestros ganan $500 a $2000 mensuales vendiendo material educativo en plataformas digitales. Tu suscripción de $240 anuales se paga sola con pocas ventas mientras construyes ingresos pasivos.`,
        highlighted: true,
      },
      {
        id: '6',
        icon: '🎨',
        title: 'Biblioteca de 3000 Imágenes Infantiles - Fichas Gratis con Contenido Incluido',
        description: `Accede a más de 3000 imágenes organizadas por temas populares de educación infantil. Selecciona temas completos como animales transportes alimentos o profesiones. Cada imagen está optimizada para impresión clara en fichas para imprimir. La biblioteca incluye fondos decorativos y bordes temáticos sin cargo adicional.

Busca imágenes específicas por nombre usando la barra de búsqueda integrada. Los temas de la biblioteca se actualizan regularmente con nuevo contenido. Todas las imágenes son apropiadas para niños sin preocupaciones de derechos de autor. Combina imágenes de biblioteca con uploads personales en las mismas fichas infantil para máxima flexibilidad.`,
        highlighted: false,
      },
      {
        id: '7',
        icon: '🖨️',
        title: 'Calidad Profesional de 300 DPI - Fichas para Imprimir de Alta Resolución',
        description: `Descarga fichas en formato JPEG o PDF de alta resolución. Cada ficha exporta a 300 puntos por pulgada para impresión nítida. Elige la opción de escala de grises para ahorrar tinta manteniendo claridad. Las fichas gratis que descargas están listas para imprimir inmediatamente en cualquier impresora casera.

Los archivos PDF mantienen proporciones perfectas sin distorsión. Las exportaciones JPEG funcionan perfectamente para compartir digitalmente con familias. Incluye la clave de respuestas con marcador rojo mostrando la ubicación del tesoro. Ambas versiones de ficha y respuesta descargan simultáneamente con un clic manteniendo tu flujo de trabajo eficiente.`,
        highlighted: true,
      },
    ],
  },

  // How-To Guide - FULL text from treasure-hunt.md step sections
  howTo: {
    sectionTitle: 'Cómo Crear Fichas para Imprimir de Búsqueda del Tesoro - Guía Paso a Paso',
    sectionDescription: 'Crear fichas infantil profesionales toma menos de cinco minutos con nuestro generador. Este proceso simple permite a maestros sin experiencia en diseño producir material educativo de calidad. Combina búsqueda del tesoro con ejercicios matemáticas y lectoescritura para lecciones completas. Cada paso está optimizado para eficiencia permitiendo crear múltiples fichas para imprimir en una sesión.',
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
        title: 'Selecciona Contenido de Números y Aprender las Letras - Fichas Preescolar con Abecedario',
        description: `Abre el generador y elige tu método de selección de contenido. El sistema ofrece selección automática por tema o manual de seis imágenes individuales. Los temas populares incluyen números del 1 al 10 para ejercicios matemáticas básicas. Selecciona el tema de abecedario para crear fichas infantil enfocadas en aprender las letras.

La biblioteca temática organiza contenido por categorías educativas como animales colores formas y objetos del aula. Cada tema contiene suficientes imágenes para generar múltiples fichas gratis únicas. Los maestros de grafomotricidad encuentran útiles los temas de formas geométricas y líneas. Estudiantes practican direccionalidad mientras identifican letras del abecedario en la cuadrícula.

Para selección manual haz clic en seis imágenes diferentes de la biblioteca. El contador muestra "Seleccionadas 0/6" mientras eliges tu contenido. Combina imágenes de números con letras para lecciones de lectoescritura integradas. Sube tus propias fotografías de objetos del aula para fichas preescolar personalizadas que reflejan tu currículo específico.`,
        icon: '🎯',
      },
      {
        id: '2',
        number: 2,
        title: 'Configura Opciones para Fichas de Matemáticas y Colorear - Direcciones Básicas o Cardinales',
        description: `Selecciona el tipo de direcciones apropiado para la edad de tus estudiantes. Las direcciones básicas usan arriba abajo izquierda derecha para educación infantil. Estudiantes de segundo grado en adelante practican con direcciones cardinales norte sur este oeste. Esta configuración determina el vocabulario usado en las instrucciones escritas de tu ficha.

Elige el tamaño de página entre Carta vertical Carta horizontal A4 vertical A4 horizontal o cuadrado. La mayoría de fichas de matemáticas usan formato vertical para mejor organización de instrucciones. Formato horizontal funciona bien cuando planeas agregar ejercicios de colorear en los márgenes. Ajusta el color de fondo de la página con el selector de color completo.

Activa temas de fondo o borde si deseas fichas para imprimir decorativas. Controla la opacidad de fondos desde 10% hasta 100% para visibilidad perfecta. Los fondos sutiles funcionan mejor para fichas gratis que combinas con dibujos para colorear después. Estudiantes pueden colorear alrededor de la cuadrícula como actividad de grafomotricidad adicional complementando las direcciones escritas.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Genera tu Ficha Infantil con Tablas de Multiplicar y Lectoescritura',
        description: `Haz clic en el botón "Generar Nueva Ficha" para crear tu actividad instantáneamente. El generador construye una cuadrícula de 5×5 con tus seis imágenes distribuidas uniformemente. Cada imagen aparece exactamente una vez sin repeticiones adyacentes para claridad visual. El sistema genera automáticamente seis pasos de direcciones comenzando desde una posición aleatoria.

Las instrucciones aparecen en formato de lista numerada usando el vocabulario de dirección seleccionado. Estudiantes leen "Comienza en manzana" seguido por seis comandos direccionales como "Mueve 2 arriba". Esta actividad refuerza lectoescritura mientras practica seguir instrucciones de múltiples pasos. Los niños que pueden leer números practican conteo mientras mueven cantidades específicas.

Para lecciones de tablas de multiplicar crea fichas con imágenes de grupos de objetos. Instrucciones como "Mueve 3 a la derecha" refuerzan conceptos de multiplicación cuando llegan a tres grupos. Combina búsqueda del tesoro con ejercicios matemáticas agregando problemas en los márgenes. Tu ficha preescolar aparece completamente formada lista para edición o descarga inmediata con material educativo gratis de alta calidad.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Edita Fichas para Imprimir con Grafomotricidad y Dibujos para Colorear',
        description: `Después de generar personaliza cualquier elemento en el lienzo editable. Arrastra la cuadrícula a una nueva posición dejando espacio para ejercicios adicionales. Agrega texto con instrucciones de grafomotricidad como "Traza las letras" o "Sigue el camino". Crea títulos personalizados identificando la ficha como fichas de matemáticas o lectoescritura.

Sube imágenes adicionales de dibujos para colorear en el borde superior o inferior. Muchos maestros crean fichas gratis combinadas con una actividad de direcciones arriba y colorear abajo. Estudiantes completan la búsqueda del tesoro primero luego colorean como recompensa. Esta combinación mantiene diferentes niveles ocupados mientras terminas instrucción en grupos pequeños.

Ajusta colores de texto para visibilidad o impacto visual usando el selector RGB. Cambia tamaños de fuente para adaptarse a niveles de lectura de estudiantes. Las fuentes más grandes ayudan a lectores emergentes en fichas infantil de educación infantil. Bloquea elementos que no quieres mover accidentalmente mientras continúas editando otras partes de tu ficha para imprimir profesional.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Descarga Fichas Gratis con Números y Abecedario - PDF y JPEG de Alta Calidad',
        description: `Selecciona "Descargar Ficha" del menú desplegable para obtener tu archivo. Elige entre formato JPEG para compartir digitalmente o PDF para impresión profesional. Ambos formatos exportan a 300 DPI asegurando texto nítido y gráficos claros. Tu ficha de matemáticas descarga inmediatamente lista para imprimir en cualquier impresora.

Activa la opción de escala de grises si planeas hacer múltiples copias para toda la clase. Las fichas preescolar en blanco y negro ahorran tinta costosa manteniendo perfecta legibilidad. El sistema genera automáticamente una clave de respuestas mostrando la ubicación del tesoro con un círculo rojo. Ambos archivos ficha y respuesta descargan juntos manteniendo tu flujo de trabajo organizado.

Imprime tu ficha para imprimir inmediatamente o guárdala en tu biblioteca digital de recursos. Muchos maestros crean carpetas organizadas por tema como aprender las letras números tablas de multiplicar y colorear. Combina búsquedas del tesoro con otras fichas gratis de la plataforma en paquetes curriculares completos. Tu material educativo gratis personalizado está listo para usar en minutos sin complicaciones técnicas ni procesos largos de diseño.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from treasure-hunt.md use case sections
  useCases: {
    sectionTitle: 'Perfecto para Maestros Padres y Educadores',
    sectionDescription: 'Las fichas de búsqueda del tesoro benefician a múltiples tipos de educadores en diferentes contextos. Maestros de educación infantil hasta tercer grado utilizan estas fichas preescolar para desarrollar habilidades fundamentales. Combina direccionalidad con lectoescritura números y conceptos espaciales en una actividad. Cada grupo de usuarios encuentra aplicaciones únicas para este material educativo gratis versátil.',
    badgeText: 'Para Quién',
    readMoreLabel: 'Leer más',
    showLessLabel: 'Ver menos',
    items: [
      {
        id: '1',
        icon: '👶',
        title: 'Maestros de Educación Infantil y Preescolar',
        subtitle: 'Fichas Infantil con Números y Aprender las Letras',
        description: `Los docentes de educación infantil utilizan búsqueda del tesoro para introducir conceptos de direccionalidad. Estudiantes de 4 a 6 años practican arriba abajo izquierda derecha con apoyo visual concreto. Las fichas para imprimir refuerzan reconocimiento de letras cuando usas temas de abecedario. Niños pequeños practican aprender las letras mientras siguen instrucciones direccionales simples.

Maestros de preescolar integran estas fichas gratis en centros de alfabetización temprana. Combina búsqueda del tesoro con actividades de grafomotricidad agregando líneas punteadas para trazar. Estudiantes identifican números del 1 al 10 en la cuadrícula mientras practican conteo. Las imágenes coloridas mantienen la atención de niños pequeños durante instrucción de grupos pequeños o trabajo independiente en centros.`,
        quote: '¡Mis alumnos aman seguir las direcciones para encontrar el tesoro!',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Maestros de Primer Grado',
        subtitle: 'Fichas de Matemáticas y Lectoescritura Integradas',
        description: `Docentes de primer grado usan fichas infantil para reforzar lectura de instrucciones de múltiples pasos. Estudiantes de 6 a 7 años leen oraciones completas con vocabulario direccional académico. Las actividades integran ejercicios matemáticas cuando agregas problemas de suma en los márgenes. Practica contar hacia adelante mientras mueven cantidades específicas en cada instrucción direccional.

Crea fichas para imprimir temáticas alineadas con unidades curriculares de matemáticas y lenguaje. Durante unidades de números usa imágenes de cantidades para reforzar valor numérico. Las fichas gratis de búsqueda del tesoro complementan lecciones de lectoescritura practicando vocabulario de posición. Estudiantes demuestran comprensión siguiendo direcciones escritas sin apoyo verbal del maestro promoviendo independencia lectora.`,
        quote: 'Las actividades direccionales refuerzan la comprensión lectora.',
      },
      {
        id: '3',
        icon: '🎓',
        title: 'Maestros de Segundo y Tercer Grado',
        subtitle: 'Direcciones Cardinales con Tablas de Multiplicar',
        description: `Los maestros de segundo grado introducen direcciones cardinales norte sur este oeste con estas fichas preescolar avanzadas. Estudiantes de 7 a 9 años conectan direcciones cardinales con conceptos de geografía y mapas. Las actividades refuerzan vocabulario académico necesario para ciencias sociales y lectura de mapas. Combina búsqueda del tesoro con ejercicios de colorear para diferenciación de niveles múltiples.

Docentes de tercer grado integran tablas de multiplicar usando imágenes de grupos de objetos. Estudiantes calculan productos mientras mueven cantidades específicas en direcciones cardinales. Las fichas para imprimir sirven como repaso de direccionalidad mientras introduces conceptos matemáticos más complejos. Agrega desafíos de grafomotricidad pidiendo a estudiantes dibujar el camino seguido en la cuadrícula con marcador.`,
        quote: 'Las direcciones cardinales conectan con geografía y mapas.',
      },
      {
        id: '4',
        icon: '🏠',
        title: 'Familias Educando en Casa',
        subtitle: 'Material Educativo Gratis para Múltiples Niveles',
        description: `Padres educadores en casa necesitan fichas infantil que atienden múltiples niveles de edad simultáneamente. Crea búsquedas del tesoro con diferentes tipos de direcciones para hermanos de edades variadas. Hermanos mayores practican direcciones cardinales mientras pequeños usan arriba abajo izquierda derecha. Las fichas gratis te permiten generar contenido ilimitado sin comprar libros de trabajo costosos.

Familias mexicanas aprecian contenido completamente en español con vocabulario culturalmente relevante. Sube fotografías familiares o de tu comunidad para fichas para imprimir personalizadas. Combina búsqueda del tesoro con otras actividades como ejercicios matemáticas lectoescritura y dibujos para colorear. Genera paquetes semanales completos organizados por tema usando los 33 generadores de la plataforma ahorrando horas de planificación.`,
        quote: 'Una herramienta cubre todos los niveles de mis hijos.',
      },
      {
        id: '5',
        icon: '🌍',
        title: 'Maestros de Inglés como Segundo Idioma',
        subtitle: 'Fichas Preescolar Multilingües con Abecedario',
        description: `Instructores de ESL utilizan fichas infantil en 11 idiomas para estudiantes diversos. Genera la misma actividad en español e inglés para comparación directa de vocabulario. Estudiantes aprenden términos direccionales en ambos idiomas con contexto visual concreto. Las fichas de matemáticas con números funcionan bien para estudiantes con alfabetización emergente en inglés.

Crea fichas para imprimir enfocadas en vocabulario temático usando la biblioteca de imágenes organizadas. Temas como alimentos animales y transportes refuerzan vocabulario esencial de supervivencia. Combina búsqueda del tesoro con actividades de aprender las letras para alfabetización bilingüe. Las fichas gratis multilingües eliminan necesidad de comprar recursos separados para cada idioma reduciendo costos de programa significativamente.`,
        quote: 'El soporte multilingüe es esencial para mi clase diversa.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Emprendedores Docentes',
        subtitle: 'Vender Fichas Infantil con Material Educativo Gratis',
        description: `Maestros emprendedores crean paquetes de fichas para imprimir temáticas para vender mensualmente. Acceso Completo incluye licencia comercial completa sin costos adicionales ni restricciones. Combina búsqueda del tesoro con grafomotricidad ejercicios matemáticas lectoescritura colorear y números en paquetes completos. Vende en Teachers Pay Teachers Etsy o Amazon KDP con calidad profesional de 300 DPI.

Los paquetes más vendidos incluyen 20 a 30 fichas preescolar organizadas por tema o estación. Combina múltiples tipos de fichas gratis de la plataforma en paquetes curriculares completos. Muchos docentes ganan $800 a $3000 mensuales vendiendo material educativo digital. Tu suscripción de $240 anuales se recupera con 10 a 15 ventas mientras construyes biblioteca de productos que generan ingresos pasivos continuos.`,
        quote: '¡Mi suscripción se pagó sola en el primer mes!',
      },
    ],
  },

  // FAQ Section - Selected FAQs from treasure-hunt.md
  faq: {
    sectionTitle: 'Preguntas Frecuentes',
    sectionDescription: 'Preguntas frecuentes sobre nuestro generador de fichas de búsqueda del tesoro y fichas para imprimir.',
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
        question: '¿Este Generador de Fichas Infantil con Tablas de Multiplicar es Realmente Gratis?',
        answer: 'El generador de búsqueda del tesoro requiere suscripción Acceso Completo costando $240 anuales o $25 mensuales. Tu suscripción te da creación ilimitada de fichas para imprimir sin cargos por ficha individual. Genera tantas fichas gratis de búsqueda del tesoro números abecedario y colorear como necesites sin cargos adicionales. El valor excepcional se multiplica cuando consideras acceso a todos los 33 generadores de material educativo profesional. El Paquete Esencial incluye 10 generadores populares y cuesta $144 anuales. Acceso Completo cuesta $240 anuales e incluye todos los 33 tipos de generadores de fichas incluyendo búsqueda del tesoro. Ambas suscripciones incluyen licencia comercial soporte de 11 idiomas y exportaciones de calidad profesional de 300 DPI. Tu inversión elimina necesidad de comprar libros de trabajo costosos o suscripciones múltiples para diferentes tipos de fichas infantil.',
      },
      {
        id: '2',
        question: '¿Puedo Imprimir Fichas Preescolar con Grafomotricidad en Casa en una Impresora Normal?',
        answer: 'Sí. Todas las fichas para imprimir descargan en formato PDF o JPEG optimizado para impresoras domésticas estándar. La calidad de 300 DPI asegura texto nítido e imágenes claras en cualquier impresora. Imprime en papel carta estándar o A4 según tu región. Las fichas gratis se ven profesionales impresas en impresoras de inyección de tinta o láser económicas sin equipo especial. Activa la opción de escala de grises para ahorrar tinta de color costosa. Las fichas infantil en blanco y negro mantienen perfecta legibilidad para estudiantes. Muchos maestros imprimen versiones en blanco y negro para trabajo diario guardando color para ocasiones especiales. Combina búsqueda del tesoro con dibujos para colorear permitiendo a estudiantes agregar su propio color con crayones o marcadores después de completar la actividad direccional.',
      },
      {
        id: '3',
        question: '¿Necesito Habilidades de Diseño para Crear Fichas de Matemáticas con Números y Lectoescritura?',
        answer: 'No. El generador requiere cero experiencia en diseño o habilidades técnicas. Selecciona un tema haz clic en generar y tu ficha aparece instantáneamente completa. La interfaz intuitiva guía cada paso del proceso. Maestros sin conocimiento de computadoras crean fichas para imprimir profesionales en minutos. Todo el diseño formateo y organización sucede automáticamente. El lienzo editable usa controles de arrastrar y soltar que cualquiera entiende. Mueve imágenes con tu ratón como moverías papeles en un escritorio físico. Cambiar colores y fuentes requiere solo clics simples sin terminología técnica. Las fichas preescolar que creas se ven tan profesionales como materiales publicados comercialmente. Enfócate en contenido educativo mientras el generador maneja todos los aspectos técnicos de diseño y formato.',
      },
      {
        id: '4',
        question: '¿Puedo Usar Fichas Infantil con Abecedario y Colorear en mi Aula para Estudiantes?',
        answer: 'Acceso Completo incluye uso ilimitado en el aula sin restricciones de número de estudiantes. Imprime cuantas copias necesites para tu clase completa o escuela entera. Usa fichas para imprimir para instrucción diaria tarea centros de aprendizaje o evaluaciones. No hay límites en cuántas fichas gratis creas o distribuyes a estudiantes. Tu suscripción cubre todos los usos educativos en tu contexto de enseñanza. Comparte archivos PDF digitalmente con estudiantes de aprendizaje remoto o padres para práctica en casa. Las familias aprecian material educativo gratis de alta calidad para reforzar conceptos. Crea paquetes de ejercicios matemáticas grafomotricidad lectoescritura y colorear para carpetas de trabajo independiente. Acceso Completo te da flexibilidad completa para usar contenido como mejor sirve a tus estudiantes sin preocuparte por límites de licencia o cargos ocultos por distribución.',
      },
      {
        id: '5',
        question: '¿En Qué Idiomas Están Disponibles las Fichas para Imprimir con Tablas de Multiplicar?',
        answer: 'Las fichas de búsqueda del tesoro están disponibles en 11 idiomas completos. Genera contenido en español inglés alemán francés italiano portugués brasileño holandés sueco danés noruego y finlandés. Todas las instrucciones direccionales y nombres de imágenes aparecen automáticamente en el idioma seleccionado. Esta capacidad multilingüe es invaluable para programas bilingües escuelas internacionales y maestros de ESL. Cambia el idioma del contenido independientemente del idioma de la interfaz. Un maestro mexicano puede usar interfaz en español mientras genera fichas infantil en inglés para clase de ESL. Los nombres de imágenes se traducen automáticamente entonces "manzana" aparece en inglés como "apple" en francés como "pomme". Crea fichas preescolar paralelas en múltiples idiomas para comparación directa o estudiantes diversos sin comprar recursos separados para cada idioma ahorrando cientos de dólares anuales.',
      },
      {
        id: '6',
        question: '¿Puedo Vender Fichas Gratis de Búsqueda del Tesoro con Grafomotricidad que Creo?',
        answer: 'Sí. Acceso Completo incluye licencia completa de impresión bajo demanda sin costo adicional. Vende fichas para imprimir personalizadas en Teachers Pay Teachers Etsy Amazon KDP y otras plataformas digitales legalmente. No se requiere atribución ni permisos especiales más allá de tu suscripción. La calidad profesional de 300 DPI asegura productos comerciales que clientes pagan con confianza. Muchos maestros construyen negocios secundarios vendiendo paquetes de fichas infantil temáticas. Combina búsqueda del tesoro con ejercicios matemáticas lectoescritura colorear y grafomotricidad en colecciones completas. Los docentes emprendedores ganan $500 a $5000 mensuales vendiendo material educativo digital. Tu inversión de $240 anuales se recupera con 15 a 20 ventas de paquetes mientras construyes biblioteca de productos generando ingresos pasivos durante años después de creación inicial.',
      },
      {
        id: '7',
        question: '¿Cómo Personalizo Fichas Preescolar con Números y Dibujos para Colorear para Mis Estudiantes?',
        answer: 'El lienzo completamente editable permite personalización ilimitada después de generar. Arrastra imágenes a nuevas posiciones o elimina elementos que no necesitas. Agrega texto personalizado con el nombre del estudiante instrucciones específicas o vocabulario objetivo. Cambia colores de texto y tamaños de fuente para visibilidad o preferencias estéticas. Sube tus propias imágenes para contenido culturalmente relevante o temas específicos de currículo. Combina elementos de múltiples generadores en una ficha. Agrega bordes decorativos imágenes de colorear o problemas de ejercicios matemáticas en los márgenes. Bloquea elementos que quieres mantener fijos mientras continúas editando otras partes. El sistema de deshacer rehacer ilimitado te da libertad para experimentar sin miedo de arruinar tu trabajo. Las fichas para imprimir que creas son verdaderamente tuyas reflejando tu estilo de enseñanza único y necesidades específicas de estudiantes.',
      },
      {
        id: '8',
        question: '¿Para Qué Grupos de Edad Funcionan Mejor Estas Fichas Infantil con Abecedario y Lectoescritura?',
        answer: 'Las fichas de búsqueda del tesoro funcionan mejor para estudiantes de educación infantil hasta tercer grado. Niños de 4 a 6 años usan direcciones básicas arriba abajo izquierda derecha con apoyo visual fuerte. Estudiantes de primer grado practican lectura de instrucciones de múltiples pasos reforzando lectoescritura emergente. Segundo y tercer grado trabajan direcciones cardinales norte sur este oeste conectando con conceptos de geografía y mapas. Ajusta dificultad seleccionando tipo de dirección apropiado para nivel de desarrollo. Preescolar se beneficia de cuadrículas simples con imágenes grandes y pasos direccionales mínimos. Estudiantes mayores manejan seis pasos completos de instrucciones con vocabulario académico. Maestros de educación especial adaptan actividades para estudiantes de cualquier edad trabajando habilidades de direccionalidad y seguimiento de instrucciones. La flexibilidad del generador acomoda amplio rango de edades y niveles de habilidad.',
      },
      {
        id: '9',
        question: '¿Puedo Subir Mis Propias Imágenes a Fichas para Imprimir con Grafomotricidad y Tablas de Multiplicar?',
        answer: 'Sí. El generador acepta múltiples cargas de archivos de imagen en todos los formatos comunes JPEG PNG GIF. Sube fotografías de tu propia aula manipulativos o materiales curriculares específicos. Combina imágenes subidas con imágenes de biblioteca en las mismas fichas gratis. Familias mexicanas suben fotos de lugares locales celebraciones culturales o comidas tradicionales para contenido personalizado culturalmente relevante. Los maestros crean fichas infantil temáticas con fotografías de excursiones unidades de ciencia o proyectos de clase. Sube imágenes de estudiantes resolviendo problemas de ejercicios matemáticas para personalización máxima. Las fotos personalizadas aumentan compromiso significativamente comparado con clipart genérico. No hay límites en cuántas imágenes subes o usas manteniendo costos predecibles sin sorpresas por cargos de almacenamiento o uso de imagen.',
      },
      {
        id: '10',
        question: '¿Cuánto Tiempo Toma Crear Fichas Preescolar con Números y Colorear?',
        answer: 'Crear una ficha completa de búsqueda del tesoro toma menos de tres minutos de principio a fin. Seleccionar configuraciones toma 30 segundos. Generar la ficha es instantáneo. Personalizaciones opcionales agregando texto o moviendo elementos toman 1 a 2 minutos adicionales. Total del inicio al PDF descargado bajo 3 minutos. Los temas predefinidos aceleran dramáticamente el proceso. Comparado con creación manual el ahorro es enorme. Diseñar fichas preescolar desde cero toma 30 a 45 minutos cada una. Este proceso es 10 a 15 veces más rápido que creación manual. Diseñar búsqueda del tesoro manualmente requiere 30 a 45 minutos dibujando cuadrículas seleccionando imágenes escribiendo instrucciones y formateando. Genera 10 fichas para imprimir variadas en 30 minutos versus 5 a 7 horas manualmente. El tiempo ahorrado permite enfoque en planificación de lecciones diferenciación y trabajo directo con estudiantes en lugar de tareas administrativas tediosas de preparación de materiales.',
      },
      {
        id: '11',
        question: '¿Las Fichas Infantil con Lectoescritura y Ejercicios Matemáticas Incluyen Claves de Respuestas?',
        answer: 'Sí. Cada ficha de búsqueda del tesoro genera automáticamente una clave de respuestas con marcador visual. La clave muestra la ubicación exacta del tesoro marcada con círculo rojo en la cuadrícula. Ambos archivos ficha y respuesta descargan simultáneamente con un clic manteniendo tu flujo de trabajo organizado. Nunca pierdas tiempo determinando respuestas correctas después de generar fichas para imprimir. Las claves de respuestas facilitan calificación rápida o trabajo de centros autoverificados. Estudiantes mayores usan claves para verificar su propio trabajo promoviendo independencia. Asistentes de aula voluntarios padres o maestros sustitutos califican fácilmente con claves claras. Las fichas gratis con respuestas incluidas eliminan paso adicional de resolver manualmente cada actividad antes de distribuir a estudiantes ahorrando tiempo valioso de preparación.',
      },
      {
        id: '12',
        question: '¿Puedo Crear Fichas para Imprimir sobre Materias Escolares Específicas con Grafomotricidad?',
        answer: 'Sí. La biblioteca de 3000 imágenes incluye contenido para todas las materias principales. Crea fichas de matemáticas usando imágenes de números formas o patrones. Fichas de lectoescritura usan temas de abecedario letras o vocabulario. Ciencias tiene animales plantas clima y herramientas científicas. Estudios sociales incluye profesiones transportes y geografía para búsquedas del tesoro temáticas alineadas con currículo. Sube imágenes personalizadas para temas especializados no en biblioteca. Crea búsquedas del tesoro para unidades de dinosaurios espacio océano o selva tropical. Combina con ejercicios de grafomotricidad agregando líneas de trazado conectando imágenes relacionadas. Las fichas preescolar temáticas refuerzan vocabulario conceptos y conexiones curriculares mientras practican habilidades direccionales. Los 33 generadores de la plataforma permiten crear paquetes completos de material educativo gratis cubriendo todas las áreas de contenido y niveles de grado simultáneamente.',
      },
    ],
  },

  // Pricing
  pricing: {
    title: 'Acceso Completo',
    price: '$240',
    priceInterval: '/año',
    priceSuffix: 'Facturación anual',
    benefits: [
      'Creación de fichas ilimitada',
      'Licencia comercial incluida',
      '11 idiomas soportados',
      '3000+ imágenes temáticas',
      'Calidad de impresión 300 DPI',
      'Hojas de respuestas incluidas',
      'Acceso a los 33 generadores',
    ],
    ctaText: 'Comenzar Ahora',
    bundleDescription: 'Su suscripcion incluye acceso a los 33 generadores de fichas',
    bundleApps: [],
  },

  // Related Apps
  relatedApps: {
    sectionTitle: 'Combina con Otros Generadores de Fichas',
    sectionDescription: 'Crea paquetes de aprendizaje completos combinando las fichas de búsqueda del tesoro con estos generadores complementarios.',
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
    items: [
      {
        id: '1',
        slug: 'image-addition',
        name: 'Fichas de Suma',
        category: 'Matemáticas',
        icon: '➕',
        description: 'Complementa actividades de búsqueda del tesoro con ejercicios de suma usando las mismas imágenes temáticas.',
      },
      {
        id: '2',
        slug: 'picture-path',
        name: 'Laberintos de Imágenes',
        category: 'Visual',
        icon: '🛤️',
        description: 'Desarrolla habilidades de seguimiento visual con laberintos que refuerzan direccionalidad y coordinación.',
      },
      {
        id: '3',
        slug: 'drawing-lines',
        name: 'Trazar Líneas',
        category: 'Grafomotricidad',
        icon: '✏️',
        description: 'Combina búsqueda del tesoro con ejercicios de trazado para desarrollar motricidad fina y coordinación.',
      },
      {
        id: '4',
        slug: 'grid-match',
        name: 'Rompecabezas de Cuadrícula',
        category: 'Lógica',
        icon: '🔲',
        description: 'Extiende el trabajo con cuadrículas usando rompecabezas visuales que desarrollan razonamiento espacial.',
      },
      {
        id: '5',
        slug: 'prepositions',
        name: 'Preposiciones',
        category: 'Lenguaje',
        icon: '📍',
        description: 'Refuerza vocabulario de posición y direcciones espaciales para comprensión completa de ubicaciones.',
      },
      {
        id: '6',
        slug: 'coloring',
        name: 'Colorear',
        category: 'Creatividad',
        icon: '🎨',
        description: 'Combina búsqueda del tesoro con actividades de colorear para sesiones de aprendizaje completas.',
      },
    ],
  },
};

export default treasureHuntEsContent;
