import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Math Worksheets - Spanish (Mexican) Content
 *
 * File: frontend/content/product-pages/es/math-worksheets.ts
 * URL: /es/apps/acertijos-matematicos-fichas (Spanish SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Spanish/math-worksheet.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 *
 * Spanish Keywords:
 * 1. Fichas de matemáticas
 * 2. Ejercicios matemáticas
 * 3. Fichas para imprimir
 * 4. Fichas infantil
 * 5. Fichas preescolar
 * 6. Grafomotricidad
 * 7. Lectoescritura
 * 8. Aprender los números
 * 9. Material educativo gratis
 * 10. Fichas gratis
 */

export const mathWorksheetsEsContent: ProductPageContent = {
  // SEO Metadata - Spanish language-specific
  seo: {
    slug: 'acertijos-matematicos-fichas',
    appId: 'math-worksheet',
    title: 'Generador de Fichas de Matemáticas - Ejercicios Matemáticas para Imprimir Gratis - Fichas Infantil',
    description: 'Crea fichas de matemáticas profesionales con nuestro generador de ejercicios matemáticas. Genera fichas para imprimir personalizadas perfectas para preescolar y primaria. Descarga ejercicios matemáticas en PDF de alta calidad en menos de 3 minutos.',
    keywords: 'fichas de matemáticas, ejercicios matemáticas, fichas para imprimir, fichas infantil, fichas preescolar, grafomotricidad, lectoescritura, aprender los números, material educativo gratis, fichas gratis, acertijos matemáticos',
    canonicalUrl: 'https://www.lessoncraftstudio.com/es/apps/acertijos-matematicos-fichas',
  },

  // Hero Section - FULL text from math-worksheet.md paragraphs 1-4
  hero: {
    title: 'Generador de Fichas de Matemáticas',
    subtitle: 'Ejercicios Matemáticas para Imprimir Gratis - Fichas Infantil',
    description: `Crea fichas de matemáticas profesionales con nuestro generador de ejercicios matemáticas. Tu suscripción al Paquete Básico te permite crear fichas para imprimir ilimitadas sin cargos adicionales por hoja de trabajo. Genera fichas infantil personalizadas perfectas para preescolar y primaria. Descarga ejercicios matemáticas en PDF de alta calidad en menos de 3 minutos.

Nuestro generador de fichas de matemáticas usa símbolos e imágenes para enseñar conceptos numéricos. Los estudiantes resuelven acertijos matemáticos donde cada imagen representa un número diferente. Este método visual hace que aprender números sea más divertido y efectivo para niños pequeños. Las fichas para imprimir ayudan a desarrollar pensamiento lógico y habilidades de resolución de problemas.

El sistema genera fichas gratis de diferentes niveles de dificultad. Elige entre 2 símbolos para principiantes o 4 símbolos para estudiantes avanzados. Cada ficha infantil incluye operaciones de suma, resta o ambas. Personaliza la cantidad de ejercicios matemáticas según las necesidades de tu grupo. El generador crea automáticamente hojas de respuestas separadas para facilitar la calificación.

Las fichas de matemáticas incluyen temas educativos adaptados a intereses infantiles. Selecciona animales, frutas, vehículos o cualquier tema del catálogo de 3000+ imágenes. Los niños aprenden números mientras trabajan con grafomotricidad y lectoescritura visual. Combina estos ejercicios con otras fichas preescolar para crear paquetes de aprendizaje completos. Accede a material educativo gratis diseñado por educadores profesionales.`,
    previewImageSrc: '/samples/english/math worksheet/math worksheet portrait.jpeg',
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

  // Sample Gallery - REAL file paths from samples/english/math worksheet/
  samples: {
    sectionTitle: 'Ejemplos de Fichas de Matemáticas',
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
        worksheetSrc: '/samples/english/math worksheet/math worksheet portrait.jpeg',
        answerKeySrc: '/samples/english/math worksheet/math worksheet portrait answer_key.jpeg',
        altText: 'Ficha de acertijos matemáticos en formato vertical con símbolos e imágenes para resolver ecuaciones en preescolar',
        pdfDownloadUrl: '/samples/english/math worksheet/math worksheet portrait.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/english/math worksheet/math worksheet landscape.jpeg',
        answerKeySrc: '/samples/english/math worksheet/math worksheet landscape answer_key.jpeg',
        altText: 'Ficha de matemáticas en formato horizontal con acertijos visuales para primaria y educación infantil',
        pdfDownloadUrl: '/samples/english/math worksheet/math worksheet landscape.pdf',
      },
    ],
  },

  // Features Grid - FULL text from math-worksheet.md feature sections
  features: {
    sectionTitle: 'Características del Generador de Fichas de Matemáticas - Todo lo que Necesitas para Crear Ejercicios Matemáticas y Fichas Infantil',
    sectionDescription: 'El generador de fichas de matemáticas incluye todas las herramientas que necesitan los maestros de preescolar y primaria. Crea ejercicios matemáticas personalizados en minutos sin experiencia en diseño. Cada característica está diseñada para ahorrar tiempo y producir fichas para imprimir de calidad profesional. Combina imágenes educativas con acertijos numéricos para enseñar conceptos de suma, resta y aprender los números de manera visual. Tu suscripción al Paquete Básico incluye acceso ilimitado a todas estas funciones sin cargos por uso.',
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
        title: 'Crea Fichas Preescolar y Fichas para Imprimir en 3 Clics - Generador Rápido de Ejercicios Matemáticas',
        description: `Genera fichas de matemáticas completas en menos de 3 minutos. Selecciona el nivel de dificultad desde muy fácil con 2 símbolos hasta difícil con 4 símbolos. Elige cuántos ejercicios necesitas entre 1 y 6 acertijos por hoja. Decide si quieres solo suma, solo resta o ambas operaciones combinadas. El sistema crea automáticamente fichas infantil profesionales listas para imprimir.

No necesitas experiencia técnica para crear ejercicios matemáticas efectivos. La interfaz guía cada paso del proceso de creación. Arrastra símbolos, ajusta números y personaliza cada elemento con el mouse. Las fichas preescolar se generan instantáneamente con vista previa en tiempo real. Descarga tus fichas gratis en formato PDF o JPEG según prefieras.

El generador incluye hojas de respuestas automáticas para cada ejercicio. Esto elimina horas de trabajo manual calculando soluciones. Los maestros imprimen fichas para imprimir y hojas de respuestas por separado. Facilita la calificación rápida y permite que los estudiantes verifiquen su propio trabajo. Perfecto para centros de aprendizaje independiente y trabajo en casa.`,
        highlighted: true,
      },
      {
        id: '2',
        icon: '✏️',
        title: 'Edita Todas las Fichas de Matemáticas en el Lienzo - Personalización Completa de Material Educativo Gratis',
        description: `Cada elemento en tus fichas para imprimir es completamente editable. Arrastra imágenes a cualquier posición en la página. Gira símbolos para crear diseños visuales atractivos. Cambia el tamaño de números y ecuaciones según el espacio disponible. Elimina elementos que no necesites con un clic. Esta flexibilidad total diferencia nuestras fichas gratis de plantillas rígidas.

Personaliza colores de texto, tamaños de fuente y estilos de letra. Agrega títulos personalizados en la parte superior de cada ficha infantil. Incluye descripciones o instrucciones específicas para tus estudiantes. Cambia colores de fondo de página para crear fichas temáticas. Ajusta la opacidad de bordes y fondos para lograr el efecto visual perfecto.

Las herramientas de edición funcionan como programas de diseño profesional pero son mucho más simples. Organiza capas trayendo elementos al frente o enviándolos atrás. Alinea múltiples objetos automáticamente para diseños ordenados. Usa las funciones de deshacer y rehacer para experimentar sin miedo. Cada ajuste se guarda automáticamente en el lienzo hasta que descargues tus ejercicios matemáticas finales.`,
        highlighted: false,
      },
      {
        id: '3',
        icon: '📤',
        title: 'Sube Imágenes Personalizadas para Fichas Preescolar - Crea Fichas Infantil con Fotos Propias',
        description: `Importa tus propias fotos e imágenes para crear fichas de matemáticas únicas. Sube múltiples archivos a la vez en formatos JPEG, PNG o GIF. Combina imágenes personalizadas con las 3000+ imágenes de nuestra biblioteca. Usa fotos de objetos del salón, mascotas de la clase o elementos locales familiares para los niños.

Las imágenes personalizadas hacen que ejercicios matemáticas sean más relevantes culturalmente. Incorpora elementos de festividades mexicanas, comidas tradicionales o símbolos regionales. Los estudiantes se conectan mejor con acertijos que usan imágenes de su entorno diario. Esta personalización aumenta el compromiso y mejora la comprensión de conceptos numéricos.

Todos los archivos subidos permanecen privados en tu cuenta. Reutiliza las mismas imágenes en múltiples fichas para imprimir. Mezcla fotos familiares con clipart profesional para variedad. El sistema mantiene la calidad original de cada imagen subida. Crea material educativo gratis verdaderamente personalizado que refleja la identidad de tu escuela o región.`,
        highlighted: false,
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Fichas para Imprimir en 11 Idiomas - Ejercicios Matemáticas Multilingües para Educación Bilingüe',
        description: `El generador soporta creación de fichas de matemáticas en 11 idiomas diferentes. Cambia entre español, inglés, francés, alemán, italiano, portugués brasileño, neerlandés, danés, sueco, noruego y finés. Esta función es esencial para maestros en programas bilingües o escuelas internacionales. Crea el mismo acertijo en múltiples idiomas para estudiantes de diferentes niveles lingüísticos.

Los nombres de archivos de imágenes y etiquetas de interfaz se traducen automáticamente. Personaliza etiquetas de acertijos en cualquier idioma que necesites. Escribe "Problema 1", "Acertijo 1" o cualquier término que uses en tu salón. Las fichas infantil mantienen coherencia lingüística en todos los elementos de texto. Perfecto para enseñar números mientras refuerzas vocabulario en lengua materna o segunda lengua.

Maestros de español como segundo idioma usan estas fichas para imprimir en lecciones de matemáticas. Estudiantes aprenden números y operaciones mientras practican lectura en español. Las instrucciones visuales reducen barreras lingüísticas para estudiantes principiantes. El mismo acertijo funciona en preescolar bilingüe, programas de inmersión y clases de español avanzado.`,
        highlighted: false,
      },
      {
        id: '5',
        icon: '💰',
        title: 'Licencia Comercial Incluida para Vender Fichas Gratis - Material Educativo Gratis con Derechos de Impresión bajo Demanda',
        description: `Tu suscripción al Paquete Básico incluye licencia comercial completa sin costo adicional. Vende ejercicios matemáticas que crees en plataformas como Teachers Pay Teachers, Etsy o Amazon KDP. No se requiere atribución ni pagos de regalías adicionales. Genera ingresos pasivos con fichas de matemáticas diseñadas una vez y vendidas infinitas veces.

Maestros emprendedores construyen negocios vendiendo fichas para imprimir temáticas. Crea paquetes de ejercicios por temporada, festividades o unidades curriculares. Las fichas infantil con temas populares se venden consistentemente durante todo el año. La calidad profesional de 300 DPI asegura que tus productos compitan con recursos comerciales caros.

La licencia cubre impresión bajo demanda, descargas digitales y membresías de suscripción. Incluye tus fichas preescolar en cuadernos de trabajo físicos o productos impresos. Usa el mismo material educativo gratis en tu blog educativo con productos descargables. Esta licencia comercial elimina preocupaciones legales sobre derechos de uso y distribución.`,
        highlighted: true,
      },
      {
        id: '6',
        icon: '🎨',
        title: 'Biblioteca de 3000+ Imágenes para Colorear y Aprender los Números - Fichas de Matemáticas Temáticas',
        description: `Accede a más de 3000 imágenes infantiles organizadas por temas educativos. Encuentra rápidamente imágenes de animales, frutas, vehículos, formas, comida y naturaleza. Cada tema incluye docenas de ilustraciones coloridas perfectas para fichas para imprimir. Las imágenes están diseñadas específicamente para captar la atención de niños pequeños en preescolar y primaria.

Filtra la biblioteca por tema para encontrar exactamente lo que necesitas. Busca imágenes específicas usando palabras clave en español. Previsualiza cada imagen antes de agregarla a tus ejercicios matemáticas. Todas las imágenes funcionan tanto para acertijos numéricos como para dibujos para colorear complementarios. Combina el generador con nuestro creador de fichas para colorear para lecciones integradas.

Los temas de imágenes se alinean con planes de estudio típicos de educación infantil. Usa frutas y verduras para unidades de nutrición con ejercicios de suma. Incorpora animales de granja en lecciones de ciencias con práctica de resta. Las imágenes de números ayudan a aprender los números mientras resuelven acertijos. Cada imagen incluida es apropiada para la edad y culturalmente neutral para uso global.`,
        highlighted: false,
      },
      {
        id: '7',
        icon: '🖨️',
        title: 'Calidad Profesional de 300 DPI - Descarga Fichas Gratis en PDF y JPEG de Alta Resolución',
        description: `Todas las fichas de matemáticas se exportan en resolución profesional de 300 DPI. Esta calidad asegura impresiones nítidas en cualquier impresora doméstica o comercial. Los bordes de símbolos e imágenes se ven perfectamente definidos sin pixelación. El texto permanece legible incluso cuando imprimes fichas para imprimir en tamaños más grandes.

Descarga ejercicios matemáticas en formato PDF para compartir digitalmente o JPEG para uso inmediato. El formato PDF mantiene calidad perfecta sin importar el tamaño de impresión. Los archivos JPEG funcionan bien en presentaciones digitales y pizarras interactivas. Ambos formatos incluyen opción de escala de grises para ahorrar tinta de color en impresiones masivas.

Las fichas infantil descargadas conservan todos los elementos editados en el lienzo. Los colores personalizados, fondos temáticos y bordes decorativos se exportan perfectamente. Funciones de deshacer y rehacer aseguran que solo descargues versiones finales aprobadas. La calidad profesional hace que tus fichas preescolar se vean tan bien como material educativo gratis comprado en tiendas especializadas.`,
        highlighted: true,
      },
    ],
  },

  // How-To Guide - FULL text from math-worksheet.md step sections
  howTo: {
    sectionTitle: 'Cómo Crear Fichas de Matemáticas para Imprimir en 5 Pasos Fáciles - Guía Completa de Ejercicios Matemáticas y Fichas Infantil',
    sectionDescription: 'Crear fichas para imprimir profesionales toma menos de 3 minutos siguiendo esta guía paso a paso. No necesitas experiencia en diseño gráfico ni habilidades técnicas avanzadas. El proceso completo desde la selección de imágenes hasta la descarga del PDF es intuitivo y rápido. Cada paso incluye opciones de personalización para adaptar los ejercicios matemáticas a tus necesidades específicas. Maestros de preescolar y primaria completan fichas infantil completas durante su hora de planificación.',
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
        title: 'Selecciona Imágenes para Aprender los Números y Crear Fichas Preescolar - Temas o Imágenes Individuales para Ejercicios Matemáticas',
        description: `Comienza eligiendo las imágenes que representarán números en tus acertijos matemáticos. Tienes dos opciones principales de selección de contenido visual. La primera opción es seleccionar un tema completo como animales, frutas o vehículos. El sistema incluye automáticamente todas las imágenes del tema elegido en tu biblioteca de trabajo.

La segunda opción te permite elegir imágenes individuales una por una. Esto da control total sobre qué símbolos aparecen en tus fichas para imprimir. Combina manzanas con plátanos, perros con gatos, o cualquier combinación que funcione para tu lección. Los estudiantes aprenden números mientras reconocen objetos familiares en los acertijos.

Usa el filtro de temas para explorar las 3000+ imágenes organizadas por categoría. Escribe palabras clave en español en la barra de búsqueda para encontrar imágenes específicas. Previsualiza cada imagen antes de agregarla a tu grupo de símbolos. Las imágenes seleccionadas aparecen en un panel especial mostrando tu biblioteca activa.

Sube tus propias imágenes si quieres personalizar completamente las fichas infantil. Haz clic en el botón de subir archivos y selecciona múltiples imágenes a la vez. El sistema acepta formatos JPEG, PNG y GIF sin restricciones de tamaño razonables. Las imágenes personalizadas se mezclan perfectamente con las imágenes de la biblioteca profesional.

La cantidad de imágenes que necesitas depende del nivel de dificultad. Nivel muy fácil y fácil requieren 2 imágenes diferentes para los símbolos. Nivel medio necesita 3 imágenes distintas en la biblioteca de trabajo. Nivel difícil usa 4 imágenes diferentes para crear acertijos más complejos. El sistema te avisa si necesitas agregar más imágenes antes de generar.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Configura Nivel de Dificultad y Operaciones para Fichas de Matemáticas - Ejercicios desde Grafomotricidad Básica hasta Niveles Avanzados',
        description: `Selecciona el nivel de dificultad apropiado para la edad y habilidad de tus estudiantes. Muy fácil usa solo 2 símbolos con números pequeños del 1 al 5. Fácil también usa 2 símbolos pero con rango numérico ligeramente mayor. Medio introduce 3 símbolos diferentes con números hasta 10 o más. Difícil desafía a estudiantes con 4 símbolos y rangos numéricos personalizables.

Decide cuántos ejercicios matemáticas quieres en cada hoja de trabajo. El generador permite entre 1 y 6 acertijos por página según el espacio disponible. Menos ejercicios crean fichas para imprimir con símbolos más grandes y visibles. Más ejercicios maximizan la práctica en una sola hoja de trabajo. La mayoría de maestros eligen 4 ejercicios para equilibrar práctica y claridad visual.

Elige qué operaciones incluir en los acertijos de esta ficha infantil. Solo suma genera ecuaciones donde estudiantes suman los valores de dos símbolos. Solo resta crea problemas de sustracción apropiados para primer grado. Suma y resta mezcladas combinan ambas operaciones en la misma hoja. Esta última opción desafía a estudiantes a identificar la operación correcta en cada problema.

Configura el rango de valores numéricos permitidos en los acertijos. Los campos de valor mínimo y máximo controlan qué números pueden asignarse a símbolos. Para preescolar usa rango de 1 a 5 para introducir conceptos básicos. Primer grado maneja bien rangos de 1 a 10 para construir fluidez numérica. Grados mayores practican con rangos de 1 a 20 o más.

Activa la casilla de permitir resultados negativos si enseñas números negativos. Esta opción es útil para tercer grado en adelante cuando estudian la recta numérica completa. Sin esta casilla activada el sistema solo genera restas donde el resultado es positivo. Esto previene confusión en estudiantes que aún no dominan conceptos de números negativos.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Genera Tu Ficha para Imprimir - Vista Previa Instantánea de Ejercicios Matemáticas y Fichas Infantil con Números y Lectoescritura',
        description: `Haz clic en el botón "Generar" para crear tu hoja de trabajo instantáneamente. El sistema procesa las configuraciones y genera los acertijos en menos de 2 segundos. Los símbolos elegidos aparecen distribuidos en ecuaciones matemáticas en el lienzo. Cada imagen representa un número específico que los estudiantes deben descubrir resolviendo los ejercicios.

La vista previa muestra exactamente cómo se verá la ficha infantil impresa. Revisa la distribución de ejercicios matemáticas en la página antes de descargar. Verifica que todos los símbolos sean claramente visibles y apropiadamente espaciados. El diseño automático optimiza el uso del espacio según la cantidad de ejercicios seleccionados.

El generador crea simultáneamente una hoja de respuestas separada automáticamente. Haz clic en la pestaña "Hoja de Respuestas" para ver las soluciones. Esta hoja muestra qué número corresponde a cada símbolo o imagen. También incluye las respuestas correctas para cada ecuación en los acertijos. Nunca más pierdas tiempo calculando manualmente las soluciones de tus fichas para imprimir.

Si el resultado no es exactamente lo que necesitas, simplemente genera nuevamente. Cada generación asigna números diferentes a los símbolos creando variaciones únicas. Esto te permite crear múltiples versiones del mismo tipo de ficha preescolar. Usa diferentes versiones para estudiantes en grupos de habilidades variadas o para evaluaciones alternativas.

Los números asignados a símbolos cambian con cada generación dentro de tu rango especificado. Un acertijo puede mostrar manzana = 3 y plátano = 5 en la primera generación. La siguiente generación podría asignar manzana = 7 y plátano = 2 usando las mismas imágenes. Esta variabilidad crea práctica ilimitada sin que los estudiantes memoricen respuestas específicas.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Edita en el Lienzo para Personalizar Fichas Gratis - Combina Grafomotricidad, Abecedario y Ejercicios de Colorear con Material Educativo Gratis',
        description: `Personaliza cada elemento directamente en el lienzo después de generar tu hoja de trabajo. Haz clic en cualquier símbolo, número o texto para seleccionarlo y editarlo. Arrastra elementos a nuevas posiciones con el mouse para ajustar el diseño. Gira imágenes usando los controles de rotación para crear efectos visuales atractivos. Cambia el tamaño de cualquier objeto agrandándolo o reduciéndolo según necesites.

Agrega texto personalizado en cualquier parte de la ficha para imprimir. Escribe instrucciones específicas, nombres de estudiantes o títulos descriptivos en el encabezado. Cambia colores de texto para resaltar información importante o crear diseños temáticos. Ajusta tamaños de fuente para asegurar legibilidad apropiada para la edad de tus estudiantes.

Aplica fondos temáticos para hacer las fichas infantil más atractivas visualmente. Elige entre docenas de fondos educativos que complementan los temas de tus imágenes. Usa fondos de naturaleza para acertijos con animales o plantas. Fondos de salón de clases funcionan bien para ejercicios matemáticas de práctica general. Ajusta la opacidad del fondo para que no distraiga de los ejercicios principales.

Agrega bordes decorativos alrededor de toda la página para dar acabado profesional. Los bordes temáticos coordinan con los fondos creando diseño cohesivo en tus fichas gratis. Escoge estrellas para fichas de motivación, frutas para unidades de nutrición o formas geométricas. La opacidad de bordes también es ajustable para lograr el efecto visual deseado.

Incorpora elementos del abecedario y lectoescritura en el encabezado de tus fichas. Agrega el título "Descubre los Números" o instrucciones como "Encuentra el valor de cada símbolo". Usa diferentes fuentes para hacer el texto más interesante y apropiado temáticamente. El editor de texto soporta contornos y sombras para mejor legibilidad sobre fondos coloridos.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Descarga Fichas Infantil en PDF o JPEG - Imprime Material Educativo Gratis de Alta Calidad para Aprender Números',
        description: `Selecciona el formato de descarga que mejor funcione para tu situación de enseñanza. El formato PDF es ideal para compartir digitalmente con padres o colegas. Los archivos PDF mantienen calidad perfecta sin importar cómo se visualicen o impriman. Este formato también funciona mejor para imprimir múltiples copias en impresoras profesionales.

El formato JPEG funciona excelentemente para insertar fichas de matemáticas en presentaciones. Usa archivos JPEG en Google Slides, PowerPoint o plataformas de aprendizaje en línea. Las imágenes JPEG cargan rápidamente en sitios web y blogs educativos. Este formato también es compatible con todas las aplicaciones de visualización de imágenes.

Descarga tanto la hoja de trabajo como la hoja de respuestas por separado. Haz clic en "Descargar Hoja de Trabajo (PDF)" para obtener los ejercicios para estudiantes. Luego descarga "Hoja de Respuestas (PDF)" para tu clave de calificación. Mantén las hojas de respuestas organizadas en carpetas separadas para evitar compartirlas accidentalmente con estudiantes.

Activa la opción de escala de grises si quieres ahorrar tinta de color. Esta función convierte todas las imágenes y colores a tonos de gris manteniendo claridad visual. Las fichas para imprimir en escala de grises cuestan significativamente menos en tinta. Los estudiantes aún pueden ver claramente todos los símbolos y números en versión gris.

Imprime las fichas gratis descargadas en cualquier impresora doméstica o escolar. La resolución de 300 DPI asegura texto nítido e imágenes claras en papel estándar. Usa papel blanco común para uso diario o cartulina para fichas reutilizables. Lamina las hojas de ejercicios matemáticas para crear recursos de centro de aprendizaje durables.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from math-worksheet.md use case sections
  useCases: {
    sectionTitle: 'Perfecto para Maestros, Padres y Educadores - Fichas para Imprimir de Grafomotricidad, Lectoescritura y Ejercicios Matemáticas para Cada Necesidad',
    sectionDescription: 'El generador de fichas de matemáticas beneficia a diversos tipos de educadores en diferentes contextos de enseñanza. Maestros de preescolar usan estas fichas para imprimir para introducir conceptos numéricos básicos. Docentes de primaria crean ejercicios matemáticas diferenciados para múltiples niveles de habilidad. Padres educadores en casa diseñan fichas infantil personalizadas para el ritmo de aprendizaje de sus hijos. Cada grupo de usuarios aprovecha las mismas herramientas profesionales adaptándolas a sus situaciones únicas de enseñanza.',
    badgeText: 'Para Quién',
    readMoreLabel: 'Leer más',
    showLessLabel: 'Ver menos',
    items: [
      {
        id: '1',
        icon: '👶',
        title: 'Maestros de Educación Inicial y Preescolar',
        subtitle: 'Fichas Infantil para Grafomotricidad, Aprender Números y Lectoescritura Temprana',
        description: `Educadoras de preescolar y educación inicial usan el generador para crear fichas infantil que combinan matemáticas con desarrollo de habilidades motoras. Los símbolos grandes y coloridos captan la atención de niños de 3 a 5 años. Los acertijos simples con 2 símbolos introducen conceptos de números sin abrumar a estudiantes principiantes. Las imágenes familiares de animales, frutas y juguetes conectan matemáticas con experiencias cotidianas de los niños.

Las fichas para imprimir apoyan múltiples áreas del desarrollo en educación inicial. Los estudiantes practican grafomotricidad al trazar símbolos y números en las hojas. Desarrollan lectoescritura temprana reconociendo patrones visuales y símbolos repetidos. Aprenden números del 1 al 5 en contexto significativo resolviendo acertijos. La naturaleza visual de los ejercicios reduce dependencia en habilidades de lectura avanzada.

Maestras de preescolar aprecian la flexibilidad para adaptar dificultad rápidamente. Crean versiones muy fáciles para septiembre cuando los niños están aprendiendo. Aumentan gradualmente a nivel fácil y medio durante el año escolar. Las mismas fichas gratis funcionan para centros de matemáticas, trabajo de mesa y actividades de tiempo de círculo. Imprimen múltiples copias para centros de aprendizaje rotativos.

El generador ahorra tiempo valioso de planificación para educadoras de educación inicial. Crear fichas infantil personalizadas toma minutos en vez de horas buscando y copiando recursos. Cambian temas semanalmente para mantener el interés de los niños sin empezar desde cero. Las imágenes de la biblioteca ya están optimizadas para la edad apropiada. Ninguna preocupación sobre contenido inadecuado o demasiado complejo para preescolar.`,
        quote: '¡Mis alumnos de preescolar aman los acertijos con símbolos coloridos!',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Docentes de Primaria de Primer a Tercer Grado',
        subtitle: 'Ejercicios Matemáticas para Aprender los Números y Lectoescritura Numérica',
        description: `Maestros de primer grado usan estas fichas para imprimir para reforzar suma y resta básica. Los acertijos proporcionan práctica adicional sin parecer hojas de trabajo repetitivas aburridas. Estudiantes que dominaron conteo avanzan a resolver acertijos con 3 símbolos. Los que todavía luchan trabajan con versiones de 2 símbolos en grupos pequeños. Esta diferenciación natural apoya todos los niveles en una sola aula.

Docentes de segundo grado integran las fichas infantil en unidades de resolución de problemas. Los estudiantes explican su razonamiento matemático al descubrir qué número representa cada símbolo. Practican habilidades de lectoescritura numérica escribiendo ecuaciones y soluciones. Desarrollan pensamiento algebraico temprano entendiendo que símbolos pueden representar valores desconocidos. Estas conexiones construyen bases para álgebra en grados superiores.

Maestros de tercer grado personalizan rangos numéricos para incluir números mayores. Configuran valores mínimos y máximos de 1 a 20 o incluso 1 a 50. Activan la opción de permitir resultados negativos para introducir números enteros. Algunos docentes comienzan a explorar conceptos matemáticos básicos usando el mismo formato de acertijos. Aunque el generador se enfoca en suma y resta, el formato funciona para enseñar conceptos matemáticos avanzados.

Las fichas gratis apoyan instrucción diferenciada en aulas de primaria multinivel. Maestros imprimen tres versiones del mismo tema con dificultades variadas. Grupo avanzado trabaja con 4 símbolos y rangos numéricos mayores. Grupo de nivel de grado usa 3 símbolos con números hasta 10. Grupo de intervención practica con 2 símbolos y números del 1 al 5. Todos trabajan en el mismo concepto con apoyos apropiados.`,
        quote: 'Las cuatro niveles de dificultad hacen la diferenciación muy fácil.',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Padres Educadores en Casa',
        subtitle: 'Material Educativo Gratis para Grafomotricidad, Números y Colorear Integrado',
        description: `Familias que educan en casa valoran la flexibilidad para crear fichas para imprimir según intereses únicos de sus hijos. Usan imágenes de dinosaurios para niños fascinados con paleontología. Seleccionan temas de princesas, superhéroes o deportes según preferencias individuales. Esta personalización mantiene a los niños motivados durante lecciones de matemáticas que de otro modo serían desafiantes.

Padres combinan el generador de fichas de matemáticas con otros recursos para lecciones integradas. Crean fichas infantil con frutas luego visitan el mercado para contar frutas reales. Usan símbolos de animales y después leen libros sobre esos animales. Incorporan ejercicios de colorear los símbolos después de resolver los acertijos. Esta integración multisensorial refuerza conceptos a través de múltiples modalidades de aprendizaje.

Educadores en casa aprecian poder enseñar múltiples hijos con un recurso. Generan versiones apropiadas para cada edad usando los mismos temas visuales. El hijo de 5 años trabaja nivel muy fácil mientras el de 7 años hace nivel medio. Ambos practican conceptos matemáticos simultáneamente en la mesa de cocina. Esta eficiencia es crucial para padres manejando múltiples niveles de grado solos.

La suscripción al Paquete Básico es económica comparada con currículos completos de matemáticas. Familias educadoras en casa crean material educativo gratis ilimitado por $144 anuales. Esto reemplaza cuadernos de trabajo desechables que cuestan $15-30 cada uno. Reutilizan las mismas fichas gratis con múltiples hijos o para repaso de verano. El ahorro se multiplica con familias de varios hijos educando en casa largo plazo.`,
        quote: 'Una herramienta cubre todos los niveles de matemáticas de mis tres hijos.',
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Maestros de Español como Segunda Lengua',
        subtitle: 'Fichas para Imprimir de Lectoescritura, Números y Abecedario en Contexto Matemático Bilingüe',
        description: `Profesores de español usan estas fichas infantil para enseñar vocabulario numérico y matemático. Estudiantes aprenden números en español mientras resuelven acertijos visuales. Las instrucciones en español exponen a aprendices a vocabulario de suma, resta y símbolos. El soporte multilingüe permite crear la misma ficha en inglés y español para comparación directa.

Maestros en programas de inmersión dual integran las fichas para imprimir en bloques de matemáticas en español. Estudiantes desarrollan lectoescritura matemática en su segundo idioma sin traducción constante. Los acertijos visuales reducen barreras lingüísticas para principiantes absolutos. Un niño que sabe poco español aún puede resolver acertijos usando lógica matemática y símbolos.

Docentes de español integran el abecedario y números simultáneamente usando etiquetas personalizadas. Etiquetan acertijos como "Problema A", "Problema B" para practicar letras. Escriben números como palabras en las instrucciones para reforzar lectura de números. Combinan las fichas de matemáticas con ejercicios de colorear donde estudiantes siguen instrucciones en español. Este aprendizaje integrado acelera adquisición del idioma.

Profesores en escuelas internacionales crean material educativo gratis en múltiples idiomas de sus estudiantes. Una clase con estudiantes de 5 países diferentes recibe acertijos en sus lenguas maternas. Esto valida identidades lingüísticas mientras todos practican los mismos conceptos matemáticos. Las fichas gratis bilingües son especialmente valiosas en comunidades con alta diversidad lingüística.`,
        quote: 'El soporte multilingüe es exactamente lo que mis estudiantes bilingües necesitan.',
      },
      {
        id: '5',
        icon: '💜',
        title: 'Maestros de Educación Especial',
        subtitle: 'Fichas Infantil Personalizadas para Grafomotricidad, Lectoescritura Adaptada y Aprender Números a Ritmo Individual',
        description: `Educadores de educación especial personalizan fichas para imprimir según necesidades individuales de IEP. Amplían símbolos para estudiantes con desafíos de motricidad fina o visión limitada. Usan solo 1-2 ejercicios por página para reducir sobrecarga visual. Seleccionan imágenes de alta motivación basadas en intereses especiales de cada estudiante. Esta individualización es crucial para acceso significativo al currículo de matemáticas.

Las fichas infantil apoyan múltiples objetivos de IEP simultáneamente en educación especial. Estudiantes practican grafomotricidad trazando símbolos grandes antes de resolver acertijos. Desarrollan habilidades de lectoescritura reconociendo y nombrando imágenes repetidas. Trabajan hacia objetivos de números contando símbolos y identificando cantidades. Un recurso cumple múltiples metas terapéuticas y educativas eficientemente.

Maestros de recursos crean fichas gratis diferenciadas para inclusión en aulas generales. Modifican las mismas fichas de matemáticas que usa la clase general para estudiantes con discapacidades. Reducen la cantidad de acertijos de 6 a 2 manteniendo el mismo tema. Usan números más pequeños dentro del mismo formato de hoja de trabajo. Esto permite participación significativa sin estigmatizar con materiales completamente diferentes.

Especialistas aprecian generar múltiples versiones para enseñanza de ensayos repetidos. Crean 10 versiones del mismo tipo de acertijo con diferentes asignaciones numéricas. Estudiantes practican la misma habilidad hasta dominar sin memorizar respuestas específicas. Esta repetición sin aburrimiento es ideal para estudiantes que necesitan práctica extendida. El material educativo gratis ilimitado elimina preocupaciones sobre consumir recursos costosos rápidamente.`,
        quote: 'Puedo crear rápidamente fichas individualizadas para cada IEP.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Maestros Emprendedores',
        subtitle: 'Vende Fichas para Imprimir de Grafomotricidad, Lectoescritura y Material Educativo en Tiendas Online',
        description: `Docentes emprendedores en Teachers Pay Teachers construyen negocios vendiendo paquetes de fichas infantil. Crean colecciones temáticas de 20-50 páginas sobre temporadas, festividades o temas curriculares. Combinan fichas de matemáticas con ejercicios de colorear y actividades de lectoescritura. Venden paquetes digitales por $3-8 cada uno generando ingresos pasivos mientras enseñan tiempo completo.

Emprendedores exitosos nichan sus productos hacia necesidades específicas de mercado. Algunos se especializan en fichas para imprimir bilingües para mercado de inmersión dual. Otros crean series de grafomotricidad para terapeutas ocupacionales y preescolar. Maestros de educación especial venden versiones adaptadas con símbolos extra grandes. Esta especialización reduce competencia y atrae clientes que pagan precios premium.

La licencia comercial del Paquete Básico elimina complicaciones legales de vender recursos. Maestros emprendedores no pagan regalías adicionales ni tarifas de licenciamiento por producto. Crean ilimitadas fichas gratis para vender sin cargos por uso o límites mensuales. Esta estructura de costos predecible permite modelar negocios precisamente. Inversión de $144 anuales se recupera vendiendo solo 20-30 paquetes pequeños.

Vendedores en Etsy y Amazon KDP convierten las fichas infantil en productos de impresión bajo demanda. Crean cuadernos de trabajo de 100 páginas enfocados en aprender números para primer grado. Diseñan libros de actividades combinando acertijos de matemáticas con páginas de colorear. Amazon imprime y envía bajo demanda sin inventario ni costos iniciales. Maestros ganan regalías pasivas de libros listados indefinidamente en la plataforma.`,
        quote: '¡Mi suscripción se pagó sola en el primer mes de ventas!',
      },
    ],
  },

  // FAQ Section - Selected FAQs from math-worksheet.md
  faq: {
    sectionTitle: 'Preguntas Frecuentes sobre Fichas para Imprimir de Matemáticas, Grafomotricidad, Lectoescritura y Ejercicios de Números',
    sectionDescription: 'Maestros, padres y educadores tienen preguntas comunes sobre el generador de fichas de matemáticas antes de suscribirse. Esta sección responde las preguntas más frecuentes sobre crear fichas para imprimir, usar material educativo en aulas, vender recursos y características específicas del generador.',
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
        question: '¿Este Generador de Fichas para Imprimir de Matemáticas es Realmente Gratuito para Usar?',
        answer: 'El generador de fichas de matemáticas requiere una suscripción al Paquete Básico que cuesta $144 anuales o $15 mensuales. Tu suscripción te da creación ilimitada de fichas para imprimir sin cargos adicionales por hoja de trabajo. Genera tantas fichas infantil de matemáticas como necesites sin costos adicionales. Esta estructura de precio único elimina preocupaciones sobre límites de uso o tarifas por descarga. El Paquete Básico incluye 10 generadores populares de hojas de trabajo diferentes. La suscripción de Acceso Completo cuesta $240 anuales e incluye los 33 tipos de generadores de fichas. Ambas suscripciones incluyen licencia comercial, soporte de 11 idiomas y exportaciones de calidad profesional de 300 DPI.',
      },
      {
        id: '2',
        question: '¿Puedo Imprimir Fichas de Matemáticas en Casa con una Impresora Regular?',
        answer: 'Sí, todas las fichas para imprimir están optimizadas para impresoras domésticas estándar. La resolución de 300 DPI asegura que símbolos, números y texto se vean nítidos en papel común. Las fichas infantil se imprimen perfectamente en impresoras de inyección de tinta o láser sin configuración especial. Usa papel blanco estándar de 8.5x11 pulgadas o A4 según tu región. La opción de escala de grises ahorra significativamente en costos de tinta de color. Esta función convierte todas las imágenes y colores a tonos de gris manteniendo claridad visual perfecta.',
      },
      {
        id: '3',
        question: '¿Necesito Habilidades de Diseño para Crear Fichas Infantil de Grafomotricidad y Ejercicios de Matemáticas?',
        answer: 'No se requiere experiencia en diseño gráfico para crear fichas para imprimir profesionales. La interfaz guía cada paso del proceso con opciones claras y vista previa en tiempo real. Maestros sin conocimiento técnico crean fichas infantil completas en su primera sesión. El sistema genera automáticamente diseños bien organizados basados en tus configuraciones elegidas. Las herramientas de edición funcionan como arrastrar y soltar sin aprender software complicado. Arrastra imágenes para moverlas, haz clic para seleccionar elementos, usa controles simples para rotar. Los maestros que nunca han usado programas de diseño dominan el generador en 10 minutos.',
      },
      {
        id: '4',
        question: '¿Puedo Usar Fichas de Matemáticas en Mi Salón de Clases para Estudiantes de Preescolar y Primaria?',
        answer: 'La suscripción al Paquete Básico incluye uso ilimitado en el aula sin restricciones. Imprime tantas copias como necesites para todos tus estudiantes durante todo el año escolar. Comparte fichas para imprimir con colegas en tu escuela para planificación colaborativa. Usa las fichas infantil para instrucción en clase, tareas, centros de aprendizaje y evaluaciones. El uso en el aula también cubre programas extraescolares, tutorías y campamentos de verano.',
      },
      {
        id: '5',
        question: '¿En Qué Idiomas Están Disponibles las Fichas para Imprimir de Números, Lectoescritura y Abecedario?',
        answer: 'El generador soporta creación de fichas infantil en 11 idiomas completos. Cambia entre español, inglés, francés, alemán, italiano, portugués brasileño, neerlandés, danés, sueco, noruego y finés. Los nombres de archivos de imágenes y etiquetas de interfaz se traducen automáticamente al idioma seleccionado. Esta funcionalidad multilingüe es esencial para programas bilingües y maestros de idiomas mundiales. Las etiquetas de acertijos y numeración también se personalizan en cualquier idioma que necesites.',
      },
      {
        id: '6',
        question: '¿Puedo Vender Fichas de Matemáticas que Creo con Este Generador en Teachers Pay Teachers, Etsy o Amazon?',
        answer: 'Sí, la suscripción al Paquete Básico incluye licencia comercial completa de impresión bajo demanda sin costo adicional. Vende fichas para imprimir que crees en plataformas como Teachers Pay Teachers, Etsy o Amazon KDP. No se requiere atribución ni pago de regalías por cada producto vendido. Esta licencia permite construir negocios secundarios vendiendo paquetes de fichas infantil temáticas. La licencia cubre descargas digitales, productos físicos impresos y modelos de membresía.',
      },
      {
        id: '7',
        question: '¿Cómo Personalizo Fichas Gratis de Grafomotricidad, Colorear y Abecedario para Mis Estudiantes Específicos?',
        answer: 'Personaliza cada elemento de las fichas para imprimir directamente en el lienzo después de generar. Arrastra símbolos a nuevas posiciones, cambia tamaños de imágenes y ajusta colores según preferencias. Agrega texto personalizado con nombres de estudiantes, instrucciones específicas o títulos temáticos. Sube tus propias imágenes para crear fichas infantil completamente únicas con contenido familiar para tus estudiantes. Aplica fondos temáticos y bordes decorativos que coordinen con unidades curriculares actuales.',
      },
      {
        id: '8',
        question: '¿Para Qué Grupos de Edad Funcionan Mejor Estas Fichas Infantil de Números y Lectoescritura?',
        answer: 'Las fichas para imprimir funcionan excelentemente para estudiantes de preescolar hasta tercer grado aproximadamente. Nivel muy fácil con 2 símbolos y números 1-5 es perfecto para preescolar de 3-5 años. Nivel fácil y medio sirven kindergarten y primer grado con números hasta 10. Nivel difícil con 4 símbolos desafía a segundo y tercer grado con rangos numéricos mayores. El generador también apoya estudiantes mayores con necesidades especiales o aprendiendo español. La naturaleza visual de los acertijos beneficia aprendices de todas las edades que necesitan apoyos concretos.',
      },
      {
        id: '9',
        question: '¿Puedo Subir Mis Propias Imágenes a Fichas de Matemáticas para Ejercicios de Colorear y Grafomotricidad Personalizados?',
        answer: 'Sí, el generador permite subir múltiples imágenes personalizadas en formatos JPEG, PNG o GIF. Haz clic en el botón de subir archivos y selecciona todas las imágenes que quieras usar simultáneamente. Las imágenes subidas se mezclan con la biblioteca de 3000+ imágenes profesionales del sistema. Usa fotos de mascotas del salón, objetos locales o elementos culturalmente relevantes para tus estudiantes. Las imágenes personalizadas permanecen privadas en tu cuenta para reutilización ilimitada.',
      },
      {
        id: '10',
        question: '¿Cuánto Tiempo Toma Crear Fichas para Imprimir de Abecedario y Números Completas?',
        answer: 'Crear fichas de matemáticas completas desde inicio hasta descarga toma menos de 3 minutos. Seleccionar imágenes toma 30 segundos navegando temas o subiendo archivos. Configurar dificultad y opciones requiere 45 segundos ajustando controles simples. La generación ocurre instantáneamente en menos de 2 segundos. Edición opcional en el lienzo agrega 60-90 segundos para personalización. Maestros experimentados crean múltiples versiones diferenciadas en 10 minutos totales.',
      },
      {
        id: '11',
        question: '¿Las Fichas Infantil de Matemáticas Incluyen Hojas de Respuestas para Facilitar la Calificación?',
        answer: 'Sí, el generador crea automáticamente hojas de respuestas separadas para cada ficha de trabajo. La hoja de respuestas muestra qué número corresponde a cada símbolo o imagen en los acertijos. También incluye las soluciones correctas para todas las ecuaciones matemáticas. Descarga tanto la hoja de trabajo como la hoja de respuestas en archivos PDF o JPEG separados. Las hojas de respuestas automáticas eliminan horas de trabajo manual calculando soluciones. Maestros nunca pierden tiempo resolviendo sus propios acertijos antes de dar a estudiantes.',
      },
      {
        id: '12',
        question: '¿Puedo Crear Fichas para Imprimir de Matemáticas sobre Materias Escolares Específicas como Ciencias o Lectoescritura?',
        answer: 'Sí, la biblioteca de 3000+ imágenes cubre todos los temas curriculares principales de preescolar y primaria. Crea fichas infantil con imágenes de animales para unidades de ciencias, frutas para nutrición o formas geométricas. Usa símbolos del abecedario para conectar matemáticas con lectoescritura temprana. Aunque el generador se enfoca en suma y resta, el formato funciona para introducir conceptos matemáticos básicos. Filtra imágenes por tema educativo para encontrar contenido relevante rápidamente. Temas disponibles incluyen animales, plantas, comida, vehículos, objetos del salón, clima y mucho más.',
      },
    ],
  },

  // Pricing - CORE BUNDLE for math-worksheet
  pricing: {
    title: 'Paquete Básico',
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
    guaranteeText: 'Garantía de devolución de 30 días',
  },

  // Related Apps - Combina Fichas de Matemáticas con otros generadores
  relatedApps: {
    sectionTitle: 'Combina con Otros Generadores de Fichas - Paquetes Completos de Material Educativo Gratis',
    sectionDescription: 'Tu suscripción al Paquete Básico incluye 10 generadores diferentes de fichas infantil. El generador de acertijos matemáticos es solo uno de ellos. Combina múltiples tipos de fichas para imprimir para crear paquetes de aprendizaje completos.',
    ctaTitle: '¿Listo para Crear Fichas de Matemáticas Increíbles?',
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
        slug: 'addition',
        name: 'Sumas',
        category: 'Matemáticas',
        icon: '➕',
        description: 'Combina acertijos matemáticos con fichas de sumas basadas en imágenes para práctica matemática completa.',
      },
      {
        id: '2',
        slug: 'subtraction',
        name: 'Restas',
        category: 'Matemáticas',
        icon: '➖',
        description: 'Complementa los acertijos con fichas de restas para dominar ambas operaciones fundamentales.',
      },
      {
        id: '3',
        slug: 'coloring',
        name: 'Colorear',
        category: 'Arte',
        icon: '🎨',
        description: 'Combina ejercicios matemáticos con páginas para colorear como recompensa creativa después de resolver acertijos.',
      },
      {
        id: '4',
        slug: 'alphabet-train',
        name: 'Tren del Abecedario',
        category: 'Lectoescritura',
        icon: '🚂',
        description: 'Integra aprendizaje de letras con práctica numérica para desarrollo educativo completo.',
      },
      {
        id: '5',
        slug: 'find-and-count',
        name: 'Buscar y Contar',
        category: 'Matemáticas',
        icon: '🔍',
        description: 'Refuerza habilidades de conteo con actividades visuales que preparan para acertijos matemáticos.',
      },
      {
        id: '6',
        slug: 'sudoku',
        name: 'Sudoku para Niños',
        category: 'Lógica',
        icon: '🧩',
        description: 'Expande pensamiento lógico con sudoku de imágenes como complemento a los acertijos numéricos.',
      },
    ],
  },
};

export default mathWorksheetsEsContent;
