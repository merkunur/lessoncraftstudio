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
    images: [
      {
        url: 'https://www.lessoncraftstudio.com/samples/spanish/addition/sample-1.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Ficha de sumas gratis para imprimir - ejercicios matemáticas con imágenes para preescolar',
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/spanish/addition/sample-2.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Fichas infantil de sumas para imprimir - fichas de matemáticas para educación infantil',
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/spanish/addition/sample-3.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Fichas preescolar de sumas gratis - material educativo de grafomotricidad',
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/spanish/addition/sample-4.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Ejercicios matemáticas de sumas para imprimir - fichas gratis para primaria',
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/spanish/addition/sample-5.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Fichas de sumas para imprimir gratis - aprender los números con fichas infantil',
      },
    ],
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
    items: [
      {
        id: '1',
        worksheetSrc: '/samples/spanish/addition/sample-1.jpeg',
        answerKeySrc: '/samples/spanish/addition/sample-1-answer.jpeg',
        altText: 'Ficha de sumas gratis para imprimir - ejercicios matemáticas con imágenes para preescolar y primaria',
        pdfDownloadUrl: '/samples/spanish/addition/sample-1.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/spanish/addition/sample-2.jpeg',
        answerKeySrc: '/samples/spanish/addition/sample-2-answer.jpeg',
        altText: 'Fichas infantil de sumas para imprimir - fichas de matemáticas con dibujos para colorear',
        pdfDownloadUrl: '/samples/spanish/addition/sample-2.pdf',
      },
      {
        id: '3',
        worksheetSrc: '/samples/spanish/addition/sample-3.jpeg',
        answerKeySrc: '/samples/spanish/addition/sample-3-answer.jpeg',
        altText: 'Fichas preescolar de sumas gratis - material educativo de grafomotricidad y números',
        pdfDownloadUrl: '/samples/spanish/addition/sample-3.pdf',
      },
      {
        id: '4',
        worksheetSrc: '/samples/spanish/addition/sample-4.jpeg',
        answerKeySrc: '/samples/spanish/addition/sample-4-answer.jpeg',
        altText: 'Ejercicios matemáticas de sumas para imprimir - fichas gratis para educación infantil',
        pdfDownloadUrl: '/samples/spanish/addition/sample-4.pdf',
      },
      {
        id: '5',
        worksheetSrc: '/samples/spanish/addition/sample-5.jpeg',
        answerKeySrc: '/samples/spanish/addition/sample-5-answer.jpeg',
        altText: 'Fichas de sumas para imprimir gratis - aprender los números con fichas infantil',
        pdfDownloadUrl: '/samples/spanish/addition/sample-5.pdf',
      },
    ],
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
    items: [
      {
        id: '1',
        icon: '⚡',
        title: 'Crea Fichas de Sumas en 3 Clics - Generador Rápido de Ejercicios Matemáticas para Educación Infantil',
        description: `Crear fichas de matemáticas nunca fue tan fácil. Selecciona un tema de imágenes de nuestra biblioteca. Haz clic en generar. Descarga tu ficha para imprimir en PDF. Son tres pasos simples que toman menos de un minuto. No necesitas experiencia en diseño gráfico. No necesitas programas complicados. Solo tres clics y tienes ejercicios matemáticas listos para tus estudiantes.

El generador configura automáticamente el diseño óptimo para cada ficha. Las imágenes se distribuyen uniformemente. Los números son legibles. Los espacios para respuestas están bien definidos. Todo está pensado para que los niños de preescolar y primer grado puedan trabajar cómodamente.`,
        highlighted: false,
      },
      {
        id: '2',
        icon: '✏️',
        title: 'Edita Todo en el Lienzo - Fichas Infantil Completamente Personalizables para Tus Necesidades',
        description: `Cada elemento de tus fichas para imprimir es editable. Arrastra imágenes a nuevas posiciones. Rota objetos con el ratón. Cambia el tamaño de cualquier elemento. Elimina lo que no necesites. Agrega texto personalizado con diferentes fuentes y colores.

Esta flexibilidad completa significa que puedes adaptar cada ficha de matemáticas a las necesidades específicas de tus estudiantes. Si un niño necesita imágenes más grandes, simplemente arrástralas para hacerlas crecer. Si quieres reorganizar el diseño, mueve los elementos libremente. Tus ejercicios matemáticas reflejan exactamente lo que tus estudiantes necesitan.

El lienzo funciona como cualquier programa de diseño moderno pero mucho más simple. No hay curva de aprendizaje. Si puedes usar el ratón, puedes editar estas fichas gratis de matemáticas.`,
        highlighted: false,
      },
      {
        id: '3',
        icon: '📤',
        title: 'Sube Tus Propias Imágenes - Fichas Preescolar Personalizadas con Fotos de Tus Estudiantes',
        description: `Combina las imágenes de nuestra biblioteca con tus propias fotos. Sube múltiples archivos a la vez en formatos JPEG, PNG o GIF. Usa fotos de objetos del salón de clases. Incluye imágenes que tus estudiantes reconocen de su vida diaria.

Esta característica hace que las fichas de matemáticas sean aún más relevantes para tus niños. Los estudiantes se emocionan más cuando ven objetos familiares en sus ejercicios. Una ficha para imprimir con fotos de sus juguetes favoritos del salón tiene mucho más impacto que imágenes genéricas.

Sube fotos una vez y úsalas en fichas infantil ilimitadas durante todo el año. Crea una biblioteca personal de imágenes que funcionan perfectamente con tu programa de matemáticas.`,
        highlighted: false,
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Generador en 11 Idiomas - Fichas de Matemáticas para Estudiantes Bilingües y Aprender los Números en Varios Idiomas',
        description: `El generador funciona en 11 idiomas diferentes: español, inglés, alemán, francés, italiano, portugués brasileño, holandés, danés, sueco, noruego y finés. La interfaz completa se traduce a cada idioma. Los nombres de archivo de las imágenes se generan en el idioma que selecciones.

Para maestros de educación bilingüe, esta característica es invaluable. Crea ejercicios matemáticas en español para tus estudiantes hispanohablantes. Genera las mismas fichas para imprimir en inglés para estudiantes que están aprendiendo ese idioma. Usa el generador para enseñar números y vocabulario matemático en varios idiomas.

Escuelas internacionales y programas de idiomas del mundo usan estas fichas gratis de matemáticas para enseñar conceptos numéricos mientras desarrollan habilidades lingüísticas. Un solo generador sirve para múltiples programas educativos.`,
        highlighted: false,
      },
      {
        id: '5',
        icon: '💰',
        title: 'Licencia Comercial POD Incluida - Vende Tus Fichas Infantil en Teachers Pay Teachers, Etsy y Amazon KDP',
        description: `Tu suscripción Paquete Esencial incluye licencia comercial completa de impresión bajo demanda sin costo adicional. Vende las fichas de matemáticas que crees en Teachers Pay Teachers. Abre una tienda de material educativo para imprimir en Etsy. Publica cuadernos de ejercicios matemáticas en Amazon KDP.

No necesitas dar atribución. No hay regalías por cada venta. No hay límites en cuánto puedes vender. La licencia POD está incluida en tu suscripción mensual de $15. Maestros emprendedores ganan entre $500 y $5,000 dólares mensuales vendiendo fichas para imprimir creadas con nuestro generador.

La calidad profesional de 300 DPI asegura que tus productos impresos se vean perfectos. Los compradores en Teachers Pay Teachers buscan específicamente fichas gratis y premium de alta calidad. Tus productos competirán con los mejores del mercado.`,
        highlighted: true,
      },
      {
        id: '6',
        icon: '🎨',
        title: 'Biblioteca de Más de 3000 Imágenes - Fichas de Matemáticas con Temas Infantiles Organizados por Categorías',
        description: `Accede a más de 3000 imágenes infantiles diseñadas específicamente para educación. Todas las imágenes están organizadas por temas: animales, comida, juguetes, naturaleza, transporte y muchos más. Cada tema incluye docenas de imágenes relacionadas.

Selecciona un tema y el generador te muestra todas las imágenes disponibles. Busca imágenes específicas usando la función de búsqueda. Combina imágenes de diferentes temas en una sola ficha para imprimir. La flexibilidad total está en tus manos.

Las imágenes son coloridas, claras y apropiadas para niños de preescolar y primeros grados. Cada imagen funciona perfectamente en ejercicios matemáticas porque muestra objetos contables y reconocibles. Los fondos y bordes también están incluidos sin cargo adicional.`,
        highlighted: false,
      },
      {
        id: '7',
        icon: '🖨️',
        title: 'Calidad Profesional de 300 DPI - Fichas Gratis para Imprimir con Resolución Perfecta para Vender',
        description: `Todas las fichas de matemáticas se exportan a 300 puntos por pulgada, el estándar profesional de impresión. Descarga en formato PDF o JPEG. Elige modo a color completo o escala de grises para ahorrar tinta. La calidad siempre es impecable.

Las fichas para imprimir se ven nítidas tanto en impresoras caseras como en servicios de impresión comercial. Los bordes de las imágenes son suaves. El texto es perfectamente legible. Los colores son vibrantes y consistentes.

Esta calidad profesional significa que tus ejercicios matemáticas lucen tan bien como material educativo comercial que cuesta $5-10 dólares por paquete. Tus estudiantes reciben fichas gratis de calidad premium. Tus clientes compran productos que se ven profesionales.`,
        highlighted: true,
      },
    ],
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
    items: [
      {
        id: '1',
        icon: '👶',
        title: 'Maestras de Educación Infantil y Preescolar',
        subtitle: 'Fichas Preescolar de Sumas con Grafomotricidad y Aprender los Números',
        description: `Las maestras de educación infantil necesitan fichas preescolar que combinen múltiples habilidades de desarrollo. Nuestro generador crea ejercicios matemáticas que integran conteo visual con grafomotricidad cuando los niños escriben números. Los estudiantes de 3 a 5 años desarrollan coordinación motora fina mientras aprenden conceptos numéricos básicos.

Combina estas fichas de sumas con otras actividades de grafomotricidad en tu programa diario. Por la mañana, los niños practican trazos básicos. Después del recreo, trabajan con fichas para imprimir de sumas contando imágenes. La repetición de escribir números refuerza las habilidades de grafomotricidad desarrolladas en otras actividades.

Las imágenes grandes y coloridas mantienen la atención de niños pequeños. Los preescolares se motivan más cuando las fichas infantil incluyen sus animales o juguetes favoritos. Selecciona temas que conecten con tus unidades temáticas semanales. Si estás enseñando sobre la granja, usa imágenes de animales de granja en los ejercicios de suma.

Configura problemas con números del 1 al 3 para principiantes absolutos. Aumenta gradualmente a sumas hasta 5 conforme los niños dominan conceptos básicos. El rango personalizable significa que cada estudiante trabaja en su nivel apropiado de desarrollo.`,
        quote: '¡Mis alumnos aman contar las imágenes coloridas!',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Docentes de Primer a Tercer Grado de Primaria',
        subtitle: 'Fichas de Matemáticas que Integran Lectoescritura y Aprender las Letras',
        description: `Los maestros de primeros grados combinan ejercicios matemáticas con lectoescritura constantemente. Nuestras fichas para imprimir permiten agregar palabras escritas junto a las imágenes. Los estudiantes leen el nombre del objeto mientras cuentan. Esta integración refuerza vocabulario y habilidades de lectoescritura durante la práctica matemática.

Usa el generador para crear problemas verbales simples agregando texto personalizado. Los niños de primer grado leen la instrucción, cuentan las imágenes y escriben la respuesta. Practican lectura, comprensión y matemáticas simultáneamente. Un solo ejercicio desarrolla múltiples competencias.

Conecta las fichas de sumas con tu programa de aprender las letras del abecedario. Crea ejercicios donde todas las imágenes comienzan con la letra de la semana. Por ejemplo, durante la semana de la letra "M", usa imágenes de manzanas, mariposas y monos. Los estudiantes refuerzan el reconocimiento de letras mientras practican sumas.

Para segundo y tercer grado, aumenta la complejidad a sumas de dos dígitos. Configura rangos numéricos más altos. Agrega más ejercicios por página. Los estudiantes mayores completan 8 a 10 problemas de suma por ficha. La práctica repetida construye fluidez matemática necesaria para tablas de multiplicar futuras.`,
        quote: 'Las fichas de sumas preparan perfectamente para las tablas de multiplicar.',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Padres Educadores en Casa',
        subtitle: 'Material Educativo Gratis Personalizado para Fichas Infantil con Dibujos para Colorear',
        description: `Los padres que educan en casa valoran la flexibilidad completa de nuestro generador. Crea fichas para imprimir que se ajusten exactamente al ritmo de aprendizaje de tu hijo. Si un concepto necesita más práctica, genera 10 fichas adicionales en minutos. Si tu hijo domina un nivel, avanza inmediatamente al siguiente.

Combina ejercicios matemáticas con dibujos para colorear descargando en escala de grises. Los niños completan los problemas de suma primero. Después colorean las imágenes como recompensa. Esta combinación hace que la práctica matemática sea más atractiva. Los estudiantes anticipan la actividad de colorear después de terminar sus ejercicios.

Usa imágenes que reflejen los intereses específicos de tu hijo. Sube fotos de sus juguetes favoritos. Incluye imágenes de mascotas familiares. Las fichas infantil personalizadas con objetos conocidos aumentan la motivación y el compromiso. Tu hijo trabaja más entusiastamente cuando reconoce las imágenes.

Integra las fichas de sumas en unidades temáticas completas. Durante una unidad sobre el océano, usa solo imágenes de criaturas marinas. Combina con libros sobre el mar, proyectos de arte marino y dibujos para colorear de peces. El aprendizaje integrado refuerza conceptos a través de múltiples actividades relacionadas.`,
        quote: 'Una herramienta cubre todos los niveles de mis hijos.',
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Maestros de Inglés como Segunda Lengua',
        subtitle: 'Fichas Gratis Bilingües para Aprender los Números en Español e Inglés',
        description: `Los profesores de ESL y educación bilingüe necesitan fichas de matemáticas en múltiples idiomas. Nuestro generador crea las mismas fichas para imprimir en 11 idiomas diferentes. Enseña vocabulario numérico en español e inglés usando ejercicios idénticos. Los estudiantes comparan ambas versiones y aprenden términos matemáticos en dos idiomas.

Crea tarjetas de vocabulario matemático usando las imágenes del generador. Cada tarjeta muestra la imagen, la palabra en español y la palabra en inglés. Los estudiantes practican contar objetos mientras aprenden vocabulario en su segundo idioma. Las fichas de sumas se convierten en herramientas de desarrollo de lenguaje.

Para estudiantes recién llegados, las imágenes proporcionan apoyo visual crucial. Los niños que aún no leen con fluidez pueden completar ejercicios matemáticas contando objetos. Las imágenes universales trascienden barreras lingüísticas. Un estudiante puede demostrar competencia matemática antes de dominar el idioma.

Programas de inmersión dual usan nuestras fichas para imprimir para mantener consistencia curricular en ambos idiomas. La misma actividad matemática se presenta en español los lunes, miércoles y viernes. La versión en inglés se usa los martes y jueves. El contenido matemático permanece constante mientras el idioma varía.`,
        quote: 'El soporte multilingüe es esencial para mi clase.',
      },
      {
        id: '5',
        icon: '💜',
        title: 'Maestros de Educación Especial',
        subtitle: 'Fichas de Matemáticas Adaptables con Grafomotricidad para Necesidades Diversas',
        description: `Los educadores de educación especial necesitan material educativo gratis completamente adaptable. Nuestro generador permite modificar cada elemento para estudiantes con necesidades únicas. Agranda imágenes para niños con problemas visuales. Reduce el número de ejercicios por página para estudiantes que se abruman fácilmente. Ajusta cada ficha para imprimir a necesidades individuales.

Para estudiantes que trabajan en habilidades de grafomotricidad básica, configura solo 2 a 3 ejercicios por página. Los espacios grandes entre problemas dan amplio espacio para escribir números. Las imágenes extra grandes son más fáciles de contar. Los estudiantes tienen éxito sin sentirse frustrados por páginas abarrotadas.

Usa las mismas imágenes repetidamente para estudiantes que se benefician de consistencia y rutina. Crea todas las fichas infantil de la semana con el mismo tema. La familiaridad visual reduce ansiedad. Los estudiantes se enfocan en conceptos matemáticos en lugar de procesar imágenes nuevas constantemente.

Combina ejercicios de suma con sistemas de recompensa visual. Agrega calcomanías o estampas después de cada problema completado. Los estudiantes con necesidades especiales a menudo responden bien a refuerzo visual inmediato. Las fichas gratis adaptadas ayudan a cada niño progresar a su propio ritmo.`,
        quote: 'Puedo adaptar las fichas rápidamente para cada estudiante.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Emprendedores Educativos',
        subtitle: 'Vende Fichas para Imprimir de Sumas en Teachers Pay Teachers y Etsy con Material Educativo Premium',
        description: `Maestros emprendedores construyen negocios exitosos vendiendo fichas de matemáticas creadas con nuestro generador. Tu suscripción Paquete Esencial de $144 anuales incluye licencia comercial completa. Vende productos ilimitados sin regalías adicionales. Muchos vendedores recuperan el costo de suscripción con solo 10 ventas.

Crea paquetes temáticos de fichas para imprimir para Teachers Pay Teachers. Los compradores buscan conjuntos de 20 a 50 páginas organizados por tema o nivel de grado. Genera múltiples fichas infantil usando diferentes configuraciones. Combina en un solo PDF descargable. Cobra entre $3 y $8 dólares por paquete.

Diseña productos que combinen ejercicios matemáticas con dibujos para colorear. Los maestros compran más cuando obtienen doble funcionalidad. Ofrece versiones a color y en escala de grises. Los compradores aprecian opciones que ahorran tinta de impresora. Los productos versátiles reciben mejores calificaciones y más ventas.

La calidad profesional de 300 DPI asegura que tus productos compitan con editoriales educativas grandes. Las vistas previas se ven nítidas. Los compradores confían en la calidad. Los vendedores exitosos en Teachers Pay Teachers reportan ingresos de $500 a $5,000 dólares mensuales vendiendo material educativo gratis descargable creado con generadores como el nuestro.`,
        quote: '¡Mi suscripción se pagó sola en el primer mes!',
      },
    ],
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
    items: [
      {
        id: '1',
        question: '¿Este Generador de Fichas para Imprimir de Sumas es Realmente Gratuito o Requiere Suscripción?',
        answer: 'El generador de fichas de matemáticas requiere una suscripción Paquete Esencial que cuesta $144 anuales o $15 mensuales. Tu suscripción te da creación ilimitada de ejercicios matemáticas sin cargos por cada ficha. Genera tantas fichas para imprimir como necesites sin costos adicionales. No hay límites diarios ni mensuales de uso. Paquete Esencial incluye 10 generadores populares de fichas infantil por $144 al año. Acceso Completo cuesta $240 anuales e incluye los 33 tipos de generadores. Ambas suscripciones incluyen licencia comercial, soporte en 11 idiomas y exportación profesional de 300 DPI.',
      },
      {
        id: '2',
        question: '¿Puedo Imprimir Fichas de Matemáticas en Casa con una Impresora Regular sin Problemas?',
        answer: 'Sí. Las fichas para imprimir funcionan perfectamente en cualquier impresora casera estándar. Los archivos PDF se optimizan automáticamente para tamaño Carta y A4. No necesitas impresora profesional ni equipo especial. Una impresora de inyección de tinta básica de $50 dólares imprime ejercicios matemáticas de calidad profesional. Descarga en escala de grises para ahorrar tinta de color. Una sola ficha en escala de grises usa aproximadamente 3-5% de un cartucho de tinta negro. Los cartuchos estándar imprimen 200 a 300 páginas. Las fichas gratis en blanco y negro también permiten que los estudiantes coloreen después de completar ejercicios.',
      },
      {
        id: '3',
        question: '¿Necesito Habilidades de Diseño Gráfico para Crear Fichas Infantil y Fichas Preescolar Profesionales?',
        answer: 'No necesitas ninguna experiencia en diseño. El generador hace todo automáticamente. Selecciona imágenes, haz clic en generar y descarga. Tres pasos simples sin conocimientos técnicos. Si puedes usar el ratón, puedes crear fichas preescolar profesionales. La interfaz es tan simple que maestros de 60 y 70 años la dominan en minutos. No hay manuales complicados que estudiar. No hay tutoriales de YouTube que ver. Simplemente empieza a crear. El diseño intuitivo guía cada paso del proceso.',
      },
      {
        id: '4',
        question: '¿Puedo Usar Estas Fichas de Matemáticas en Mi Salón de Clase con Todos Mis Estudiantes?',
        answer: 'Tu suscripción Paquete Esencial incluye uso ilimitado en salón de clase. Imprime copias para todos tus estudiantes sin restricciones. Veinte estudiantes necesitan la misma ficha. Imprime 20 copias. Treinta estudiantes en dos secciones. Imprime 30 copias. No hay límites por estudiante ni por salón. Comparte archivos digitales con colegas en tu escuela. Múltiples maestros pueden usar las mismas fichas para imprimir. Los coordinadores académicos crean bancos de recursos para todo el personal docente. Una sola suscripción puede beneficiar a toda una escuela cuando se comparten recursos apropiadamente.',
      },
      {
        id: '5',
        question: '¿En Qué Idiomas Están Disponibles las Fichas para Imprimir para Enseñar el Abecedario y Aprender los Números?',
        answer: 'El generador funciona en 11 idiomas completos: español, inglés, alemán, francés, italiano, portugués brasileño, holandés, danés, sueco, noruego y finés. La interfaz completa se traduce a cada idioma. Los archivos de imagen se etiquetan en el idioma seleccionado. Puedes enseñar el abecedario y los números en cualquiera de estos idiomas. Para maestros bilingües, esto es transformador. Crea la misma ficha de matemáticas en español para estudiantes hispanohablantes. Genera la versión en inglés para estudiantes de ESL. Usa la versión en francés para programa de inmersión. Un generador sirve para múltiples programas lingüísticos simultáneamente.',
      },
      {
        id: '6',
        question: '¿Puedo Vender las Fichas Infantil que Creo con Este Generador en Teachers Pay Teachers?',
        answer: 'Sí. Paquete Esencial incluye licencia comercial completa de impresión bajo demanda sin costo adicional. Vende las fichas preescolar que crees en Teachers Pay Teachers sin regalías por venta. Abre tienda en Etsy vendiendo material educativo para imprimir. Publica cuadernos de ejercicios matemáticas en Amazon KDP. No hay límites de ingresos. La licencia POD está incluida en tu suscripción mensual de $15. No pagas extra por derechos comerciales. No hay comisiones sobre ventas. No necesitas dar atribución. Maestros emprendedores ganan entre $500 y $5,000 mensuales vendiendo fichas para imprimir creadas con nuestros generadores.',
      },
      {
        id: '7',
        question: '¿Cómo Personalizo Fichas de Grafomotricidad, Lectoescritura y Dibujos para Colorear para Mis Estudiantes?',
        answer: 'Cada elemento en tus fichas para imprimir es completamente editable. Arrastra imágenes a nuevas posiciones con el ratón. Cambia tamaños haciendo clic y arrastrando esquinas. Rota objetos para variedad visual. Elimina elementos que no necesites. Agrega texto personalizado con fuentes y colores diferentes. Para actividades de grafomotricidad, agranda los espacios de respuesta para escritura. Los niños pequeños necesitan áreas grandes para practicar números. Para ejercicios de lectoescritura, agrega etiquetas de texto a cada imagen. Los estudiantes leen la palabra mientras cuentan. Para crear dibujos para colorear, descarga en escala de grises. Los niños completan sumas y luego colorean.',
      },
      {
        id: '8',
        question: '¿Para Qué Edades Funcionan Mejor Estas Fichas de Matemáticas y Fichas Gratis de Sumas?',
        answer: 'Las fichas infantil de sumas funcionan mejor para niños de 3 a 8 años. Edad preescolar (3-5 años) practica conteo básico y sumas simples hasta 5. Kindergarten (5-6 años) domina sumas hasta 10. Primer grado (6-7 años) trabaja sumas hasta 20. Segundo grado (7-8 años) practica sumas de dos dígitos. Ajusta la dificultad configurando rangos numéricos. Para preescolares más jóvenes, configura mínimo 1 y máximo 2. Los niños cuentan solo 1 o 2 objetos por grupo. Para estudiantes de segundo grado avanzados, configura hasta 10 objetos por grupo. El mismo generador sirve desde educación infantil hasta tercer grado de primaria.',
      },
      {
        id: '9',
        question: '¿Puedo Subir Mis Propias Fotos para Crear Fichas Preescolar Personalizadas con Imágenes Familiares?',
        answer: 'Sí. Sube múltiples imágenes simultáneamente en formatos JPEG, PNG o GIF. Usa fotos de objetos del salón de clases. Incluye imágenes de mascotas de la escuela. Agrega fotos de proyectos estudiantiles. Las fichas preescolar con imágenes familiares aumentan motivación y compromiso enormemente. Combina imágenes subidas con las 3000 imágenes de nuestra biblioteca. Por ejemplo, usa nuestras imágenes de animales de granja más fotos del viaje escolar a la granja local. Los estudiantes se emocionan al ver lugares y objetos que conocen personalmente en sus ejercicios matemáticas.',
      },
      {
        id: '10',
        question: '¿Cuánto Tiempo Toma Crear Fichas de Matemáticas Profesionales desde Inicio hasta Descarga?',
        answer: 'Crear fichas para imprimir profesionales toma menos de 3 minutos del inicio al final. Treinta segundos para seleccionar imágenes del tema. Un minuto para ajustar configuración de dificultad. Treinta segundos para generar la vista previa. Un minuto para personalizaciones finales. Descarga instantánea. Total: menos de 3 minutos. Compara esto con métodos tradicionales. Diseñar manualmente fichas gratis en Word o PowerPoint toma 30 a 60 minutos. Buscar imágenes con licencia apropiada toma otros 15 minutos. Ajustar formato y espaciado toma 10 minutos más. Nuestro generador reduce 60 minutos a menos de 3 minutos. Ahorras 95% del tiempo.',
      },
      {
        id: '11',
        question: '¿Las Fichas Infantil de Sumas Incluyen Hojas de Respuestas para Facilitar la Calificación?',
        answer: 'Sí. El generador crea automáticamente hojas de respuestas con todas las soluciones correctas. La hoja de respuestas usa exactamente el mismo diseño que la ficha de trabajo pero muestra los resultados. Esto facilita enormemente la calificación rápida de múltiples estudiantes. Descarga ambas versiones simultáneamente. La ficha de trabajo va a los estudiantes. La hoja de respuestas queda contigo para referencia. Los asistentes de enseñanza y padres voluntarios pueden calificar usando las respuestas. Tú revisas rápidamente el trabajo de 20 estudiantes en minutos en lugar de media hora.',
      },
      {
        id: '12',
        question: '¿Puedo Crear Fichas para Imprimir que Integren Tablas de Multiplicar, Lectoescritura y el Abecedario Juntos?',
        answer: 'Si bien este generador se enfoca en sumas, tu suscripción Paquete Esencial incluye 10 generadores diferentes. Usa nuestro generador de sumas para matemáticas básicas. Combínalo con generadores de lectoescritura para práctica de letras. Agrega generadores del abecedario para alfabetización. Incluye actividades de grafomotricidad para desarrollo motor. Crea páginas para colorear para integración artística. Los maestros crean paquetes temáticos completos combinando múltiples generadores. Una unidad sobre animales incluye fichas de sumas con imágenes de animales, fichas de lectoescritura con nombres de animales, páginas del abecedario con una letra por animal, y dibujos para colorear de animales. Todo desde una sola suscripción.',
      },
    ],
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
    items: [
      {
        id: '1',
        slug: 'subtraction',
        name: 'Restas',
        category: 'Matemáticas',
        icon: '➖',
        description: 'Combina fichas de sumas con fichas de restas para práctica matemática completa. Los estudiantes dominan ambas operaciones básicas.',
      },
      {
        id: '2',
        slug: 'math-worksheet',
        name: 'Fichas de Matemáticas',
        category: 'Matemáticas',
        icon: '🔢',
        description: 'Crea ejercicios matemáticas variados incluyendo sumas, restas y operaciones mixtas para práctica integral.',
      },
      {
        id: '3',
        slug: 'code-addition',
        name: 'Suma con Código',
        category: 'Matemáticas',
        icon: '🔐',
        description: 'Añade desafío extra con sumas codificadas donde los estudiantes descifran imágenes para resolver problemas.',
      },
      {
        id: '4',
        slug: 'coloring',
        name: 'Colorear',
        category: 'Arte',
        icon: '🎨',
        description: 'Combina ejercicios de sumas con páginas para colorear. Los estudiantes completan matemáticas y luego colorean como recompensa.',
      },
      {
        id: '5',
        slug: 'find-and-count',
        name: 'Buscar y Contar',
        category: 'Matemáticas',
        icon: '🔍',
        description: 'Refuerza habilidades de conteo con actividades de buscar y contar que preparan para ejercicios de suma.',
      },
      {
        id: '6',
        slug: 'chart-count',
        name: 'Gráfica y Conteo',
        category: 'Matemáticas',
        icon: '📊',
        description: 'Integra conceptos de gráficas con conteo y sumas para comprensión matemática más profunda.',
      },
    ],
  },
};

export default additionEsContent;
