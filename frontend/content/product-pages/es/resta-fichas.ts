import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Subtraction Worksheets - Spanish (Mexican) Content
 *
 * File: frontend/content/product-pages/es/resta-fichas.ts
 * URL: /es/apps/resta-fichas (Spanish SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Spanish/subtraction.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 *
 * PRICING: Full Access ($240/year or $25/month)
 */

export const subtractionEsContent: ProductPageContent = {
  // SEO Metadata - Spanish language-specific
  seo: {
    slug: 'resta-fichas',
    appId: 'subtraction',
    title: 'Fichas de Restas para Imprimir | Generador de Ejercicios Matemáticas para Educación Infantil y Primaria',
    description: 'Crea fichas de restas profesionales con imágenes usando nuestro generador de ejercicios matemáticas. Genera fichas para imprimir personalizadas perfectas para preescolar y primaria. Descarga material educativo gratis en PDF de alta calidad en menos de 3 minutos.',
    keywords: 'fichas de restas, fichas para imprimir, ejercicios matemáticas, fichas de matemáticas, fichas infantil, fichas preescolar, grafomotricidad, lectoescritura, aprender los números, tablas de multiplicar, dibujos para colorear, fichas gratis, material educativo gratis',
    canonicalUrl: 'https://www.lessoncraftstudio.com/es/apps/resta-fichas',
  },

  // Hero Section - FULL text from subtraction.md paragraphs 1-3
  hero: {
    title: 'Fichas de Restas para Imprimir',
    subtitle: 'Generador de Ejercicios Matemáticas para Educación Infantil y Primaria',
    description: `Crea fichas de restas profesionales con nuestro generador de ejercicios matemáticas. Tu suscripción Acceso Completo te da creación ilimitada de fichas para imprimir sin cargos por hoja. Genera fichas infantil personalizadas perfectas para educación inicial y primaria. Descarga material educativo gratis de alta calidad en PDF en menos de 3 minutos.

Nuestro generador de fichas de restas ofrece cuatro modos únicos de ejercicio. El modo tradicional permite a los estudiantes tachar imágenes. El modo imagen-número combina ilustraciones con números. El modo encuentra-el-sustraendo presenta formato de imagen - ? = resultado. Los maestros pueden crear fichas de matemáticas adaptadas al nivel exacto de sus alumnos.

La plataforma incluye más de 3000 imágenes apropiadas para niños. Selecciona temas completos o imágenes individuales para tus fichas para imprimir. Ajusta la dificultad desde 2 hasta 20 para el número máximo. Cada hoja incluye clave de respuestas generada automáticamente. Tu suscripción Acceso Completo incluye licencia comercial para vender en plataformas como Etsy y Teachers Pay Teachers.`,
    previewImageSrc: '/samples/english/subtraction/cross out.jpeg',
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

  // Sample Gallery - REAL file paths from samples/english/subtraction/
  samples: {
    sectionTitle: 'Ejemplos de Fichas de Restas',
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
        worksheetSrc: '/samples/english/subtraction/cross out.jpeg',
        answerKeySrc: '/samples/english/subtraction/cross out answer_key.jpeg',
        altText: 'Ficha de restas modo tachar con imágenes para educación infantil y preescolar',
        pdfDownloadUrl: '/samples/english/subtraction/cross out.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/english/subtraction/image number.jpeg',
        answerKeySrc: '/samples/english/subtraction/image number answer_key.jpeg',
        altText: 'Ficha de restas con modo imagen y número para práctica de matemáticas en primaria',
        pdfDownloadUrl: '/samples/english/subtraction/image number.pdf',
      },
      {
        id: '3',
        worksheetSrc: '/samples/english/subtraction/find subtrahend.jpeg',
        answerKeySrc: '/samples/english/subtraction/find subtrahend answer_key.jpeg',
        altText: 'Ficha de encontrar sustraendo con ejercicios para resolver incógnitas en restas básicas',
        pdfDownloadUrl: '/samples/english/subtraction/find subtrahend.pdf',
      },
      {
        id: '4',
        worksheetSrc: '/samples/english/subtraction/mixed.jpeg',
        answerKeySrc: '/samples/english/subtraction/mixed answer_key.jpeg',
        altText: 'Ficha de restas en modo mixto combinando diferentes tipos de ejercicios matemáticos',
        pdfDownloadUrl: '/samples/english/subtraction/mixed.pdf',
      },
    ],
  },

  // Features Grid - FULL text from subtraction.md feature sections
  features: {
    sectionTitle: 'Características del Generador de Fichas de Restas - Todo lo que Necesitas para Ejercicios Matemáticas Efectivos',
    sectionDescription: 'Nuestro generador de fichas de matemáticas incluye características profesionales diseñadas específicamente para maestros. Cada función te ayuda a crear material educativo gratis personalizado en minutos. La plataforma combina facilidad de uso con control total sobre el diseño. La suscripción Acceso Completo te da acceso ilimitado a todas estas funciones por $240 al año o $25 al mes.',
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
        title: 'Crea Fichas para Imprimir en 3 Clics - Generador Rápido de Ejercicios Matemáticas',
        description: `Selecciona un tema de nuestra biblioteca de imágenes. Haz clic en generar. Tu hoja de fichas de restas aparece lista para imprimir. El proceso completo toma menos de 3 minutos. No necesitas habilidades de diseño. La interfaz guía cada paso. Ideal para maestros ocupados que necesitan fichas infantil rápidamente.

Elige entre temas organizados como animales, frutas, objetos escolares y más. O busca imágenes específicas usando la función de búsqueda. Combina imágenes de diferentes temas en una sola hoja. La flexibilidad permite crear fichas preescolar únicas para cada lección. Tu biblioteca incluye acceso completo a 3000+ imágenes con tu suscripción.`,
        highlighted: false,
      },
      {
        id: '2',
        icon: '🎯',
        title: 'Cuatro Modos de Ejercicio Únicos - Fichas de Matemáticas con Variedad Pedagógica',
        description: `El modo tradicional de tachar permite a los estudiantes cruzar imágenes físicamente. Muestra el total de objetos y los niños tachan la cantidad a restar. Este método concreto es perfecto para educación inicial. Los estudiantes desarrollan comprensión visual de la resta.

El modo imagen-número presenta formato [imágenes] - [número] = ___. Los estudiantes ven objetos visuales y restan un valor numérico. Esto construye el puente entre manipulativos concretos y matemáticas abstractas. Perfecto para transicionar de preescolar a primaria.

El modo encuentra-el-sustraendo usa formato [imágenes] - ? = [resultado]. Los estudiantes deben determinar qué número se restó. Este formato desarrolla pensamiento crítico y razonamiento inverso. Desafía a los estudiantes más avanzados. Las fichas de matemáticas en este modo son excelentes para diferenciación.

El modo mixto combina imagen-número y encuentra-el-sustraendo en una hoja. Proporciona variedad dentro del mismo ejercicio. Mantiene el interés de los estudiantes. Perfecto para práctica integral. Los maestros pueden evaluar múltiples habilidades simultáneamente.`,
        highlighted: true,
      },
      {
        id: '3',
        icon: '✏️',
        title: 'Edita Todo en el Lienzo - Fichas para Imprimir Completamente Personalizables',
        description: `Después de generar tu hoja, edita cualquier elemento directamente. Arrastra imágenes a nuevas posiciones. Rota objetos para crear diseños dinámicos. Escala imágenes más grandes o más pequeñas según necesites. Elimina elementos que no quieras. Cada objeto es completamente editable.

Agrega texto personalizado en cualquier lugar. Escribe instrucciones específicas para tus estudiantes. Incluye el nombre de tu escuela o clase. Personaliza encabezados. Cambia colores, tamaños y fuentes del texto. Usa contornos para hacer el texto más visible. La herramienta de texto es tan flexible como las imágenes.

Trae objetos al frente o envíalos atrás. Alinea elementos perfectamente con herramientas de alineación. Centra objetos en la página automáticamente. Deshacer y rehacer están disponibles si cometes errores. La edición completa del lienzo te da control total sobre el diseño final de tus fichas infantil.`,
        highlighted: false,
      },
      {
        id: '4',
        icon: '📤',
        title: 'Sube Tus Propias Imágenes - Material Educativo Gratis Personalizado para Tus Estudiantes',
        description: `Sube imágenes desde tu computadora en segundos. La función de carga múltiple acepta varios archivos simultáneamente. Formatos compatibles incluyen JPEG, PNG y GIF. Combina tus imágenes con nuestra biblioteca de 3000+ imágenes. Crea fichas de matemáticas verdaderamente únicas.

Personaliza para los intereses específicos de tus estudiantes. Sube fotos de objetos familiares de tu salón. Usa imágenes culturalmente relevantes. Incluye fotos de mascotas de la clase. Los estudiantes se involucran más cuando reconocen las imágenes. Tus imágenes subidas permanecen disponibles durante tu sesión.

Combina imágenes personalizadas con temas de la biblioteca. Agrega el logo de tu escuela a las fichas para imprimir. Incluye fotos de eventos escolares. Crea hojas temáticas para festividades mexicanas. Las posibilidades de personalización son infinitas con la carga de imágenes.`,
        highlighted: false,
      },
      {
        id: '5',
        icon: '🌍',
        title: '11 Idiomas Disponibles - Fichas Preescolar para Escuelas Bilingües e Internacionales',
        description: `La interfaz está disponible en 11 idiomas incluyendo español. El idioma controla el texto de la interfaz y el formato de números. Esto es esencial para escuelas bilingües. También beneficia a programas de inmersión dual. Maestros que enseñan en varios idiomas aprecian esta flexibilidad.

Cambia el idioma de la interfaz con un clic. Los nombres de las imágenes se actualizan al idioma seleccionado. Esto ayuda a maestros de ESL y educación bilingüe. Los estudiantes ven vocabulario matemático en su idioma de instrucción. Perfecto para clases de números donde el idioma importa.

Los idiomas incluyen inglés, alemán, francés, español, portugués, italiano, holandés, sueco, danés, noruego y finlandés. Esta amplitud sirve a escuelas internacionales en todo el mundo. Maestros pueden crear el mismo ejercicio en múltiples idiomas. Útil para programas de intercambio de idiomas.`,
        highlighted: false,
      },
      {
        id: '6',
        icon: '💰',
        title: 'Licencia Comercial POD Incluida - Vende Tus Fichas de Matemáticas en Etsy y Teachers Pay Teachers',
        description: `Tu suscripción Acceso Completo incluye licencia comercial de impresión bajo demanda sin costo adicional. Vende tus fichas para imprimir en Etsy, Teachers Pay Teachers o Amazon KDP. No se requiere atribución. La calidad de 300 DPI es perfecta para productos comerciales. Los maestros emprendedores pueden construir negocios vendiendo material educativo gratis.

La licencia POD te permite vender productos físicos e impresos. Crea cuadernos de ejercicios completos. Vende hojas individuales como descargas digitales. Empaqueta fichas temáticas para ocasiones especiales. Muchos maestros ganan $500-$5000 mensuales vendiendo hojas en Teachers Pay Teachers.

Comercializa tus fichas de matemáticas únicas en Pinterest. Construye seguidores mostrando tus diseños creativos. Ofrece muestras gratuitas para atraer compradores. Crea paquetes estacionales para demanda máxima. La licencia comercial incluida significa que todas las ganancias son tuyas sin regalías adicionales.`,
        highlighted: true,
      },
      {
        id: '7',
        icon: '🎨',
        title: 'Biblioteca de 3000+ Imágenes - Fichas Infantil con Ilustraciones Apropiadas para Niños',
        description: `Accede a más de 3000 imágenes infantiles cuidadosamente seleccionadas. Todas las imágenes son apropiadas para educación inicial y primaria. La organización por temas facilita encontrar lo que necesitas. Busca por palabra clave para imágenes específicas. La biblioteca se actualiza regularmente con nuevo contenido.

Los temas incluyen animales, frutas, vegetales, transporte, ropa, juguetes y más. Cada tema contiene docenas de variaciones. Encuentra imágenes perfectas para cualquier unidad de aprendizaje. Combina temas para crear fichas preescolar interdisciplinarias. Los estudiantes responden mejor cuando las imágenes coinciden con el contenido de la lección.

Todas las imágenes se exportan a 300 DPI de calidad profesional. Se ven nítidas en impresión y en pantalla. Los colores brillantes capturan la atención de niños pequeños. Los bordes claros facilitan que los estudiantes cuenten objetos. La calidad de imagen afecta directamente el compromiso y la efectividad del aprendizaje.`,
        highlighted: false,
      },
      {
        id: '8',
        icon: '🖨️',
        title: 'Calidad Profesional de 300 DPI - Material Educativo Gratis Perfecto para Imprimir y Vender',
        description: `Exporta tus fichas de restas como PDF o JPEG de alta resolución. La calidad de 300 DPI garantiza impresión profesional. Perfecto para hojas de clase o productos comerciales. Los archivos PDF mantienen calidad nítida a cualquier tamaño. Los archivos JPEG son ideales para compartir digitalmente.

La opción de escala de grises ahorra tinta de impresora. Especialmente útil para maestros que imprimen muchas copias. Las hojas en escala de grises mantienen claridad y contraste. Los estudiantes pueden distinguir fácilmente todos los elementos. Esto reduce costos de impresión significativamente.

Descarga hojas de estudiantes y claves de respuestas por separado. Imprime la cantidad exacta que necesitas. Sin marca de agua en las fichas para imprimir. Los archivos son tuyos para usar ilimitadamente. Imprime hoy, la próxima semana o el próximo año. Tus diseños guardados permanecen accesibles.`,
        highlighted: true,
      },
    ],
  },

  // How-To Guide - FULL text from subtraction.md step sections
  howTo: {
    sectionTitle: 'Cómo Crear Fichas de Matemáticas de Restas en 5 Pasos Fáciles - Genera Ejercicios Matemáticas Profesionales',
    sectionDescription: 'Crea fichas para imprimir profesionales en menos de 3 minutos. El proceso es intuitivo incluso para maestros sin experiencia en diseño. Cada paso te guía claramente. No necesitas habilidades técnicas. La interfaz en español facilita todo. Sigue estos cinco pasos simples para crear material educativo gratis personalizado para tus estudiantes.',
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
        title: 'Selecciona Imágenes para Tus Fichas Infantil - Números y Objetos Visuales',
        description: `Comienza seleccionando un tema de nuestra biblioteca. Los temas incluyen animales, frutas, juguetes, objetos escolares y más. Haz clic en el menú desplegable de temas. Elige el tema que coincida con tu lección actual. Las imágenes aparecen inmediatamente en la vista de diccionario.

Alternativamente, busca imágenes específicas usando la barra de búsqueda. Escribe palabras clave en español. La búsqueda filtra resultados instantáneamente. Encuentra exactamente las imágenes que necesitas. Esto es perfecto cuando enseñas números específicos o vocabulario temático.

Selecciona imágenes individuales haciendo clic en ellas. Aparece un borde azul alrededor de imágenes seleccionadas. Puedes elegir múltiples imágenes de diferentes temas. El contador muestra cuántas imágenes has seleccionado. Necesitas al menos suficientes imágenes para el número máximo en tus problemas de resta.

Sube tus propias imágenes si quieres personalización adicional. Haz clic en el botón de subir archivos. Selecciona múltiples archivos de tu computadora. Formatos aceptados incluyen JPEG, PNG y GIF. Tus imágenes aparecen en la sección de imágenes subidas. Combínalas con imágenes de la biblioteca para fichas preescolar únicas.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Configura el Modo de Ejercicio y Dificultad - Fichas de Matemáticas Adaptadas a Tu Grupo',
        description: `Selecciona tu modo de ejercicio preferido en Configuración de Ejercicio. El modo tradicional de tachar es perfecto para estudiantes visuales. El modo imagen-número construye conexión entre concreto y abstracto. El modo encuentra-el-sustraendo desarrolla razonamiento inverso. El modo mixto proporciona variedad en una sola hoja.

Ajusta el número de ejercicios usando el control deslizante. Elige entre 1 y 10 problemas por hoja. Menos problemas funcionan bien para estudiantes que luchan. Más problemas desafían a estudiantes avanzados. La mayoría de maestros elige 5-8 ejercicios para fichas infantil equilibradas.

Establece el número máximo a restar (minuendo máximo). El rango va de 2 a 20. Comienza con números pequeños para educación inicial. Aumenta gradualmente a medida que los estudiantes desarrollan confianza. Este control de dificultad te permite diferenciar fácilmente para múltiples niveles.

Marca las opciones adicionales según necesites. "Incluir campos de nombre/fecha" agrega encabezado para organización. "Incluir números de ejercicio" ayuda a los estudiantes seguir el progreso. "Usar caja amigable para niños" crea bordes decorativos alrededor de expresiones. Estas opciones mejoran la experiencia de aprendizaje para ejercicios matemáticas efectivos.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Ajusta Tamaño de Página y Diseño - Fichas para Imprimir en Formato Perfecto',
        description: `Selecciona tu tamaño de página en Configuración de Página. Opciones incluyen Carta Vertical, Carta Horizontal, A4 y más. El predeterminado es Carta Horizontal que funciona bien para la mayoría de ejercicios. Los maestros mexicanos generalmente usan tamaño Carta. Maestros europeos pueden preferir A4.

Elige un tema de fondo si quieres agregar interés visual. Los fondos temáticos hacen las fichas preescolar más atractivas. Ajusta la opacidad para que el fondo no interfiera con el contenido. Demasiado oscuro dificulta ver los problemas. Una opacidad ligera agrega color sin distracción.

Selecciona un borde temático para enmarcar tu hoja. Los bordes dan apariencia profesional. Muchos temas de borde coinciden con festividades y estaciones. Esto es especial para crear paquetes temáticos. Los estudiantes responden positivamente a hojas visualmente atractivas.

Cambia el color de página si quieres algo diferente del blanco. Los colores pastel suaves funcionan bien. Evita colores brillantes que dificulten la lectura. El color de página afecta el aspecto de impresión. Recuerda que colores oscuros consumen más tinta.`,
        icon: '📄',
      },
      {
        id: '4',
        number: 4,
        title: 'Genera y Edita en el Lienzo - Material Educativo Gratis con Control Total',
        description: `Haz clic en el botón "Generar Hoja" cuando hayas configurado todo. Tu hoja de fichas de matemáticas aparece en el lienzo en segundos. El generador crea automáticamente problemas usando tus imágenes seleccionadas. Cada problema usa el modo de ejercicio que elegiste. Los números se ajustan a tu dificultad máxima.

Revisa la hoja generada cuidadosamente. Asegúrate de que los problemas tengan sentido. Verifica que las imágenes sean apropiadas. Confirma que la dificultad coincida con tu intención. Si algo no se ve bien, haz clic en generar nuevamente para una nueva hoja aleatoria.

Ahora edita cualquier elemento directamente en el lienzo. Haz clic en cualquier objeto para seleccionarlo. Arrastra para mover a nueva posición. Usa las manijas de las esquinas para cambiar tamaño. Rota usando el control de rotación. Elimina objetos que no quieras con el botón de eliminar.

Agrega texto personalizado usando la herramienta de texto. Escribe instrucciones específicas para tus estudiantes. Cambia color, tamaño y fuente del texto. Agrega tu nombre o el nombre de tu escuela. El texto personalizado hace las fichas para imprimir verdaderamente tuyas. Todos los cambios suceden en tiempo real en el lienzo.`,
        icon: '✨',
      },
      {
        id: '5',
        number: 5,
        title: 'Descarga Fichas para Imprimir y Clave de Respuestas - Ejercicios Matemáticas Listos para Usar',
        description: `Haz clic en el menú desplegable de Descargar cuando tu hoja esté perfecta. Opciones incluyen descargar como PDF o JPEG. El formato PDF mantiene calidad nítida para impresión. El formato JPEG funciona bien para compartir digitalmente. Ambos formatos se exportan a 300 DPI profesional.

Descarga tanto la hoja del estudiante como la clave de respuestas. La clave de respuestas se genera automáticamente. Muestra las soluciones correctas para cada problema. Esto ahorra tiempo enorme en calificación. Los maestros pueden verificar trabajo rápidamente. También útil para que los estudiantes se autocalifiquen.

Marca la opción "Escala de grises" si quieres ahorrar tinta. Las impresiones en escala de grises mantienen claridad completa. Los estudiantes pueden ver todos los detalles. Esto reduce significativamente costos de impresión. Especialmente útil cuando imprimes múltiples copias de fichas infantil.

Guarda tus archivos descargados en ubicación organizada. Nómbralos claramente para encontrarlos fácilmente después. Puedes imprimir inmediatamente o guardar para más tarde. Los archivos son tuyos para siempre sin marca de agua. Imprime tantas copias como necesites. Reutiliza las mismas fichas de matemáticas año tras año. El material educativo gratis que creas permanece accesible ilimitadamente.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from subtraction.md use case sections
  useCases: {
    sectionTitle: 'Perfecto para Maestros, Padres y Educadores - Fichas para Imprimir para Cada Necesidad de Números',
    sectionDescription: 'Nuestro generador de fichas de restas sirve a educadores en múltiples contextos. Maestros de escuela encuentran herramientas profesionales para instrucción diaria. Padres que educan en casa aprecian la flexibilidad de dificultad. Maestros de educación especial valoran las opciones de diferenciación. Cada grupo de usuarios obtiene valor único de las características de la plataforma.',
    badgeText: 'Para Quién',
    readMoreLabel: 'Leer más',
    showLessLabel: 'Ver menos',
    items: [
      {
        id: '1',
        icon: '👶',
        title: 'Maestros de Educación Infantil y Preescolar - Fichas Preescolar con Enfoque Visual para Números',
        subtitle: 'Fichas preescolar con enfoque visual',
        description: `Los maestros de educación infantil trabajan con niños de 3-6 años. A esta edad, los conceptos matemáticos deben ser concretos y visuales. Nuestras fichas preescolar usan imágenes brillantes que los niños pequeños reconocen. Los objetos familiares como frutas, animales y juguetes hacen que la resta sea relevante. Los estudiantes conectan operaciones matemáticas con objetos del mundo real.

El modo de tachar es perfecto para preescolar. Los niños físicamente cruzan imágenes en el papel. Este acto kinestésico refuerza el concepto de "quitar". Los estudiantes ven claramente cómo disminuye la cantidad. El aprendizaje táctil es esencial en educación infantil. Nuestro generador crea exactamente este tipo de ejercicios matemáticas concretos.

Ajusta la dificultad comenzando con números 2-5 para niños más pequeños. Aumenta gradualmente a 6-10 a medida que desarrollan confianza. El control de dificultad permite diferenciación dentro de un solo salón de preescolar. Algunos estudiantes necesitan práctica con números pequeños. Otros están listos para desafíos mayores. Crea múltiples versiones de fichas infantil adaptadas a niveles individuales.`,
      },
      {
        id: '2',
        icon: '📚',
        title: 'Maestros de Educación Primaria - Fichas de Matemáticas para Primer, Segundo y Tercer Grado',
        subtitle: 'Fichas para primaria y grados superiores',
        description: `Los maestros de primaria enseñan estudiantes de 6-9 años en primero, segundo y tercer grado. Estos grados cubren desarrollo crítico de habilidades matemáticas. La resta es fundamental del currículo. Los estudiantes transicionan de concreto a abstracto durante estos años. Nuestro generador apoya esta progresión con múltiples modos de ejercicio.

Primer grado se beneficia del modo imagen-número. Los estudiantes ven imágenes concretas pero trabajan con números escritos. Este formato construye el puente entre manipulativos y matemáticas simbólicas. Usa números de 5-10 para práctica de primer grado. Los estudiantes desarrollan fluidez con hechos básicos de resta. Las fichas de matemáticas repetidas construyen automaticidad.

Segundo grado puede usar modo encuentra-el-sustraendo. Este formato desarrolla razonamiento inverso y pensamiento algebraico temprano. Los estudiantes deben determinar qué número falta. Esto requiere comprensión más profunda que simplemente calcular. Ajusta el rango de dificultad a 10-15 para segundo grado. Desafía sin abrumar a los estudiantes.

Tercer grado se beneficia del modo mixto. Combina diferentes tipos de problemas en una hoja. Esto mantiene el interés de los estudiantes y evalúa múltiples habilidades. Usa el rango completo de 2-20 para estudiantes de tercer grado avanzados.`,
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Padres que Educan en Casa - Material Educativo Gratis Adaptado a Múltiples Niveles',
        subtitle: 'Flexibilidad para educación en el hogar',
        description: `Los padres que educan en casa típicamente enseñan múltiples edades simultáneamente. Necesitan crear ejercicios matemáticas para diferentes niveles rápidamente. Nuestro generador permite crear fichas infantil diferenciadas en minutos. Genera una hoja fácil para un niño de 5 años. Luego ajusta la dificultad para crear una hoja desafiante para un niño de 8 años.

El ahorro de tiempo es crítico para familias que educan en casa. Los padres gestionan instrucción, preparación de lecciones y gestión del hogar. Dedicar 30-60 minutos a crear una hoja de resta no es práctico. Nuestro generador reduce esto a 3 minutos. Crea material educativo gratis profesional sin esfuerzo extenso. Esto libera tiempo para instrucción real.

La flexibilidad temática permite personalización para intereses del niño. Si tu hijo ama dinosaurios, usa el tema de dinosaurios. Los estudiantes se involucran más cuando el contenido coincide con sus pasiones. Los padres conocen mejor los intereses de sus hijos. Sube fotos familiares o de mascotas. Crea fichas de matemáticas verdaderamente personalizadas que ningún libro de trabajo puede igualar.`,
      },
      {
        id: '4',
        icon: '🌐',
        title: 'Maestros de ESL y Educación Bilingüe - Fichas para Imprimir en Español para Aprendices de Idiomas',
        subtitle: 'Apoyo multilingüe para ESL',
        description: `Los maestros de ESL y programas bilingües necesitan material en múltiples idiomas. Nuestro generador ofrece interfaz en 11 idiomas incluyendo español. Esto es esencial para instrucción en idioma nativo. Los estudiantes ven vocabulario matemático en español. Las imágenes proporcionan apoyo visual que trasciende barreras de idioma.

Los programas de inmersión dual usan nuestras fichas infantil para instrucción matemática en español. Los estudiantes aprenden números y vocabulario de resta simultáneamente. Las imágenes claras ayudan a la comprensión sin depender de traducción. Los estudiantes de inglés pueden participar completamente en lecciones de matemáticas. El aprendizaje visual apoya el desarrollo del lenguaje.

Las escuelas internacionales sirven a estudiantes de diversos orígenes lingüísticos. Necesitan flexibilidad para crear material en varios idiomas. Un maestro puede necesitar ejercicios matemáticas en español el lunes. El mismo maestro puede necesitar material en francés el martes. Nuestro generador cambia idiomas con un clic. Esta adaptabilidad es invaluable en entornos internacionales multilingües.`,
      },
      {
        id: '5',
        icon: '🎯',
        title: 'Maestros de Educación Especial - Fichas Infantil Diferenciadas con Control Total de Dificultad',
        subtitle: 'Diferenciación para necesidades especiales',
        description: `Los maestros de educación especial trabajan con diversos niveles de habilidad. Un estudiante puede necesitar práctica con resta 2-5. Otro estudiante en el mismo salón puede estar listo para 10-15. El control granular de dificultad permite diferenciación precisa. Crea fichas para imprimir específicamente adaptadas a cada IEP de estudiante.

Los apoyos visuales son esenciales para muchos estudiantes de educación especial. Las imágenes proporcionan representación concreta de problemas abstractos. Los estudiantes con discapacidades de aprendizaje se benefician del refuerzo visual. El modo de tachar es particularmente efectivo. Los estudiantes físicamente manipulan el papel mientras aprenden. El compromiso multisensorial mejora la retención.

La generación rápida permite modificación de lecciones en tiempo real. Si un estudiante lucha, reduce inmediatamente la dificultad. Si un estudiante domina, aumenta el desafío. Esta capacidad de respuesta apoya instrucción individualizada efectiva. Los maestros de educación especial pueden adaptar material educativo gratis durante la lección misma.`,
      },
      {
        id: '6',
        icon: '💼',
        title: 'Maestros Emprendedores - Vende Ejercicios Matemáticas en Teachers Pay Teachers y Etsy',
        subtitle: 'Oportunidades comerciales',
        description: `Los maestros emprendedores construyen negocios vendiendo recursos educativos. Teachers Pay Teachers es un mercado de $200 millones anuales. Los maestros exitosos ganan $2,000-$10,000 mensuales. Las fichas de matemáticas temáticas se venden especialmente bien. Los materiales de resta son demandados consistentemente por maestros de primaria.

Crea paquetes estacionales de fichas para imprimir. Las hojas temáticas de Navidad se venden bien en noviembre-diciembre. Los paquetes de regreso a clases tienen pico en julio-agosto. Las fichas de restas de Halloween son populares en octubre. La función temática te permite crear productos estacionales rápidamente. Genera 20 hojas diferentes en una hora. Empaquétalas como un paquete de PDF. Fija precio a $4-$8.

La calidad de 300 DPI es esencial para productos comerciales. Los compradores esperan impresiones profesionales nítidas. Nuestras exportaciones cumplen estándares comerciales. La licencia POD incluida elimina regalías adicionales. Toda ganancia de ventas es tuya. Los maestros emprendedores aprecian el modelo de precios transparente para fichas de matemáticas comerciales.`,
      },
    ],
  },

  // FAQ Section - FULL text from subtraction.md FAQ sections
  faq: {
    sectionTitle: 'Preguntas Frecuentes sobre Fichas para Imprimir de Restas - Material Educativo Gratis de Números',
    sectionDescription: 'Los maestros tienen preguntas comunes sobre nuestro generador. Esta sección responde las consultas más frecuentes. Cubrimos precios, uso en clase, opciones de personalización y más. Lee estas respuestas antes de suscribirte. Comprende exactamente qué obtienes con tu inversión.',
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
        question: '¿Este Generador de Fichas de Matemáticas Realmente Requiere Suscripción para Ejercicios de Números?',
        answer: `El generador de fichas de restas requiere suscripción Acceso Completo que cuesta $240 anuales o $25 mensuales. Tu suscripción te da creación ilimitada de fichas para imprimir sin cargos por hoja. Genera tantas fichas de matemáticas de números como necesites sin cargos adicionales. Crea 5 hojas o 500 hojas sin diferencia en precio.

La suscripción Acceso Completo incluye todos los 33 generadores de hojas de trabajo en la plataforma. No solo obtienes el generador de restas. También accedes a generadores de suma, multiplicación, división y más. El paquete Paquete Esencial cuesta $144 anuales e incluye 10 generadores populares. Ambas suscripciones incluyen licencia comercial, soporte de 11 idiomas y exportaciones de calidad profesional de 300 DPI.

A diferencia de competidores que cobran por hoja o por descarga, nuestra estructura de precios es transparente. Pagas una tarifa anual fija. Usas el generador tanto como necesites. No hay límites mensuales. Sin cargos ocultos. Sin tarifas por imagen. Sin costos de licencia adicionales. La previsibilidad facilita la presupuestación para maestros y escuelas.`,
      },
      {
        id: '2',
        question: '¿Puedo Imprimir Estas Fichas Infantil en Mi Impresora Regular en Casa?',
        answer: `Absolutamente. Nuestras fichas infantil están diseñadas específicamente para impresión casera. Cualquier impresora de inyección de tinta o láser funciona perfectamente. El archivo PDF descargado está optimizado para tamaño de papel estándar. Selecciona Carta para Estados Unidos y México. Selecciona A4 para la mayoría de otros países. El generador ajusta dimensiones automáticamente.

La opción de escala de grises ahorra tinta significativamente. Las hojas en blanco y negro mantienen claridad completa. Los estudiantes pueden distinguir fácilmente todas las imágenes y números. Los bordes permanecen nítidos. El texto permanece legible. Muchos maestros imprimen solo en escala de grises para reducir costos. Una hoja a color puede costar $0.50-$1.00 en tinta. La misma hoja en escala de grises cuesta $0.05-$0.10.

Los archivos PDF de alta calidad funcionan también para impresión profesional. Envía archivos a servicios de impresión como Staples o Office Depot. Ordena copias a granel para ahorrar aún más.`,
      },
      {
        id: '3',
        question: '¿Necesito Habilidades de Diseño para Crear Fichas de Matemáticas Profesionales con Números?',
        answer: `No necesitas absolutamente ninguna habilidad de diseño. La interfaz te guía paso por paso. Selecciona un tema de imágenes. Elige tu modo de ejercicio. Ajusta configuraciones de dificultad para números. Haz clic en generar. Tu hoja profesional aparece en segundos. El proceso es intuitivo incluso para usuarios no técnicos.

Los maestros sin experiencia en computadoras usan nuestro generador exitosamente. La interfaz en español elimina barreras de idioma. Cada botón está claramente etiquetado. Las funciones están organizadas lógicamente. Los menús desplegables muestran todas las opciones. No hay configuraciones ocultas que buscar. Todo lo que necesitas está visible y accesible.

Los tutoriales en video están disponibles si necesitas ayuda adicional. Muchos maestros aprenden simplemente experimentando. El botón deshacer permite corregir errores fácilmente. Puedes regenerar hojas tantas veces como quieras. La mayoría de usuarios crea hojas profesionales en su primer intento.`,
      },
      {
        id: '4',
        question: '¿Puedo Usar Estas Fichas para Imprimir de Restas en Mi Salón de Clase con Estudiantes?',
        answer: `La suscripción Acceso Completo incluye uso ilimitado en salón de clase. Imprime tantas copias como necesites para tus estudiantes. No hay límites por estudiante o por hoja. Úsalas para instrucción diaria. Úsalas para tarea. Úsalas para evaluaciones. Úsalas para centros de aprendizaje. Todas estas aplicaciones están completamente permitidas.

Comparte archivos digitalmente con estudiantes si enseñas en línea. Los estudiantes pueden completar fichas electrónicamente en tabletas. O los padres pueden imprimir en casa. La licencia cubre tanto uso digital como impreso. Esto es especialmente valioso para educación híbrida y remota. Los maestros necesitan flexibilidad en formatos de entrega.

Las escuelas pueden comprar una suscripción para múltiples maestros compartir. Una cuenta Acceso Completo puede servir a todo un departamento de matemáticas. Varios maestros pueden generar hojas usando las mismas credenciales de inicio de sesión.`,
      },
      {
        id: '5',
        question: '¿En Qué Idiomas Están Disponibles Estas Fichas Preescolar de Números y Restas?',
        answer: `La interfaz del generador está disponible en 11 idiomas. Selecciona español, inglés, alemán, francés, italiano, portugués, holandés, sueco, danés, noruego o finlandés. El idioma controla todo el texto de la interfaz. También afecta nombres de imágenes en la biblioteca. Los números se formatean según convenciones del idioma seleccionado.

Para maestros de educación bilingüe, esta flexibilidad es esencial. Enseña matemáticas de números en español por la mañana. Cambia a inglés por la tarde. El mismo generador sirve ambos contextos. No necesitas plataformas separadas o suscripciones múltiples. Esto ahorra dinero y simplifica flujo de trabajo. Los programas de inmersión dual aprecian particularmente esta característica.

Las escuelas internacionales usan múltiples idiomas semanalmente. Un maestro en una escuela internacional europea puede necesitar francés el lunes. El mismo maestro puede necesitar alemán el martes. La capacidad de cambiar idiomas con un clic es invaluable.`,
      },
      {
        id: '6',
        question: '¿Puedo Vender Fichas para Imprimir que Creo con Este Generador de Ejercicios Matemáticas?',
        answer: `Sí. La suscripción Acceso Completo incluye licencia comercial completa de impresión bajo demanda sin costo adicional. Vende tus creaciones en Teachers Pay Teachers, Etsy, Amazon KDP o cualquier plataforma. No se requiere atribución. Sin regalías más allá de tu tarifa de suscripción anual. Toda ganancia de ventas es completamente tuya.

Muchos maestros construyen negocios exitosos vendiendo fichas para imprimir. Los vendedores top en Teachers Pay Teachers ganan $2,000-$10,000 mensuales. Las fichas de matemáticas temáticas son consistentemente populares. Crea paquetes estacionales. Desarrolla recursos de nicho. Construye biblioteca de productos. El potencial de ingreso pasivo es significativo.

La calidad de exportación de 300 DPI cumple todos los estándares comerciales. Los compradores esperan impresiones profesionales nítidas. Nuestros archivos cumplen estas expectativas. Las reseñas positivas mencionan específicamente calidad de impresión.`,
      },
      {
        id: '7',
        question: '¿Cómo Personalizo Fichas Infantil de Números para Mis Estudiantes Específicos?',
        answer: `La personalización comienza con selección de imágenes. Elige temas que coincidan con intereses de tus estudiantes. Si enseñas unidad sobre animales, usa tema de animales. Si estudias frutas, selecciona imágenes de frutas. La relevancia temática aumenta compromiso. Los estudiantes se conectan más cuando reconocen imágenes familiares.

Sube tus propias fotos para personalización máxima. Fotografía objetos de tu salón de clase. Toma fotos de mascotas de estudiantes. Captura eventos escolares. Estas imágenes personales hacen las fichas preescolar únicas. Los estudiantes se emocionan viendo contenido familiar. Esta conexión personal aumenta motivación y participación.

Ajusta dificultad precisamente para cada estudiante. Un estudiante puede necesitar práctica con números 2-5. Otro estudiante necesita desafío con 15-20. Crea versiones diferenciadas en minutos. La edición del lienzo permite modificación adicional.`,
      },
      {
        id: '8',
        question: '¿Para Qué Grupos de Edad Funcionan Mejor Estas Fichas de Matemáticas de Números?',
        answer: `Nuestras fichas de restas funcionan mejor para estudiantes de 4-9 años. Educación infantil (4-6 años) usa modo de tachar con números pequeños. Los niños de preescolar se benefician de representaciones visuales concretas. El rango de dificultad 2-5 es perfecto para principiantes. Las imágenes grandes apoyan habilidades motoras en desarrollo.

Primer grado (6-7 años) transiciona a modo imagen-número. Los estudiantes están listos para conectar visual con simbólico. Usa rango de dificultad 5-10 para práctica de primer grado. Este formato construye fluidez con hechos básicos de resta. La práctica repetida con números variados construye automaticidad.

Segundo y tercer grado (7-9 años) pueden manejar todos los modos de ejercicio. El modo encuentra-el-sustraendo desarrolla razonamiento algebraico temprano. El modo mixto proporciona variedad y desafío. Usa rango completo de dificultad 2-20.`,
      },
      {
        id: '9',
        question: '¿Puedo Subir Mis Propias Imágenes a Estas Fichas para Imprimir de Números?',
        answer: `Sí. La carga de imágenes personalizadas es característica principal. Haz clic en el botón de subir archivos. Selecciona múltiples imágenes de tu computadora. Formatos compatibles incluyen JPEG, PNG y GIF. Las imágenes aparecen inmediatamente en tu vista previa de subidas. Combínalas con imágenes de biblioteca en la misma hoja.

Esta flexibilidad permite personalización infinita. Sube fotos de objetos de tu salón. Incluye fotos de estudiantes (con permisos apropiados). Usa imágenes específicas de currículo. Incorpora elementos culturalmente relevantes. Las posibilidades son ilimitadas.

Los maestros creativos usan esta función innovadoramente. Fotografía manipulativos matemáticos de tu clase. Crea hojas de resta usando bloques de patrón reales. Usa contadores que tus estudiantes conocen. Esta continuidad entre manipulativos concretos y fichas impresas refuerza aprendizaje.`,
      },
      {
        id: '10',
        question: '¿Cuánto Tiempo Toma Crear una Hoja de Ejercicios Matemáticas de Números con Este Generador?',
        answer: `La mayoría de maestros crean hojas completas en 2-3 minutos. Seleccionar tema de imágenes toma 15 segundos. Ajustar configuraciones de ejercicio toma 30 segundos. Hacer clic en generar y revisar toma 15 segundos. Ediciones menores toman 30-60 segundos. Descargar toma 15 segundos. Proceso total bajo 3 minutos.

Compara esto con creación manual que toma 30-60 minutos. Encontrar imágenes apropiadas toma 10-15 minutos. Organizar diseño toma 10-15 minutos. Crear problemas matemáticamente válidos toma 10 minutos. Formatear y refinar toma 10-15 minutos. Nuestro generador reduce 60 minutos a 3 minutos. Eso es ahorro de tiempo de 95%.

El ahorro de tiempo se multiplica al crear múltiples versiones. Crear 5 hojas diferenciadas manualmente toma 2-3 horas. Con nuestro generador, toma 15 minutos. Ajusta dificultad de números, regenera, descarga.`,
      },
      {
        id: '11',
        question: '¿Las Fichas de Números Incluyen Claves de Respuestas para Maestros?',
        answer: `Sí. Cada hoja viene con clave de respuestas generada automáticamente. La clave muestra soluciones correctas para todos los problemas. Se descarga como archivo separado. Los maestros pueden imprimir la clave solo para su uso. O compartir con estudiantes para autocalificación.

Las claves de respuestas ahorran tiempo enorme en calificación. Un maestro con 25 estudiantes ahorra 15-20 minutos por tarea. Simplemente compara trabajo de estudiantes con clave. Marca correcto o incorrecto rápidamente. Este tiempo ahorrado se acumula significativamente durante el año.

Los estudiantes mayores pueden usar claves para verificación independiente. Completar problemas, verificar respuestas, corregir errores. Este proceso desarrolla metacognición y autorregulación. Los estudiantes aprenden a identificar errores propios.`,
      },
      {
        id: '12',
        question: '¿Puedo Crear Fichas para Imprimir sobre Temas o Materias Escolares Específicos de Números?',
        answer: `Absolutamente. Nuestra biblioteca organizada temáticamente facilita crear hojas específicas de materia. Enseñando unidad de ciencias sobre animales? Usa tema de animales para problemas de resta de números. Estudiando nutrición? Selecciona imágenes de frutas y vegetales. La integración temática conecta matemáticas con otro contenido.

Crea hojas interdisciplinarias que refuercen múltiples objetivos de aprendizaje. Una hoja de resta usando imágenes de mapas enseña geografía y matemáticas simultáneamente. Problemas usando objetos históricos integran estudios sociales. Esta conexión de currículo hace el aprendizaje más significativo.

Los maestros de educación temática aprecian particularmente esta flexibilidad. Si tu escuela tiene mes de conciencia ambiental, crea hojas de resta de números con tema ecológico. Para semana de espíritu escolar, usa colores de la escuela. El generador se adapta a cualquier tema educativo.`,
      },
    ],
  },

  // Related Apps Section
  relatedApps: {
    sectionTitle: 'Combina Fichas de Restas con Otras Fichas para Imprimir - Material Educativo Gratis de Paquetes Completos',
    sectionDescription: 'Los maestros crean paquetes de aprendizaje integrales combinando múltiples tipos de hojas. Las fichas de restas funcionan excelentemente con material educativo gratis de otras materias. La plataforma ofrece 33 generadores diferentes de fichas para imprimir. Combina restas con lectoescritura, grafomotricidad, colorear y más. Crea paquetes temáticos que cubran múltiples habilidades simultáneamente.',
    ctaTitle: '¿Listo para Crear Fichas de Matemáticas Increíbles?',
    ctaDescription: 'Únete a miles de educadores que crean fichas para imprimir profesionales con nuestros 33 generadores de hojas de trabajo.',
    primaryCtaText: 'Comenzar Prueba Gratis',
    secondaryCtaText: 'Ver las 33 Aplicaciones',
    badgeText: 'Combina Perfectamente Con',
    exploreText: 'Explorar todas las apps',
    trustBadges: {
      securePayment: 'Pago seguro',
      cancelAnytime: 'Cancela cuando quieras',
    },
    items: [
      {
        id: '1',
        slug: 'addition',
        name: 'Fichas de Sumas',
        category: 'Matemáticas',
        icon: '➕',
        description: 'La suma y la resta son operaciones inversas fundamentales. Combinar fichas de sumas y restas ayuda a los estudiantes a entender la relación entre ambas operaciones. Los paquetes que incluyen ambos tipos refuerzan el sentido numérico.',
      },
      {
        id: '2',
        slug: 'math-worksheet',
        name: 'Fichas de Matemáticas',
        category: 'Matemáticas',
        icon: '🔢',
        description: 'Nuestros generadores de fichas de matemáticas incluyen multiplicación, división y más. Combina restas con otros tipos de ejercicios matemáticas para práctica variada.',
      },
      {
        id: '3',
        slug: 'coloring-app',
        name: 'Dibujos para Colorear',
        category: 'Arte',
        icon: '🎨',
        description: 'Las fichas de restas combinan perfectamente con dibujos para colorear. Después de resolver problemas de resta, los estudiantes colorean imágenes relacionadas.',
      },
      {
        id: '4',
        slug: 'drawing-lines',
        name: 'Grafomotricidad',
        category: 'Escritura',
        icon: '✏️',
        description: 'La grafomotricidad se integra naturalmente con práctica de números y restas. Las actividades de grafomotricidad desarrollan control de lápiz necesario para escribir números.',
      },
      {
        id: '5',
        slug: 'alphabet-train',
        name: 'Tren del Abecedario',
        category: 'Letras',
        icon: '🚂',
        description: 'Las fichas de abecedario funcionan excelentemente en paquetes con ejercicios de números. Aprender las letras y números ocurre simultáneamente en preescolar.',
      },
      {
        id: '6',
        slug: 'code-addition',
        name: 'Suma con Código',
        category: 'Matemáticas',
        icon: '🔐',
        description: 'La suma con código desarrolla habilidades de decodificación junto con matemáticas. Combina práctica de restas con suma con código para variedad de ejercicios.',
      },
    ],
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

export default subtractionEsContent;
