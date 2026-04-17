import type { AppContent } from '../types';

const content: AppContent = {
  seo: {
    primaryKeyword: 'busca y encuentra para imprimir',
    secondaryKeywords: [
      'objetos escondidos para imprimir',
      'juego de observación ficha',
      'encuentra los objetos ficha',
      'busca y encuentra niños',
    ],
    lsiKeywords: [
      'observación',
      'concentración',
      'atención visual',
      'buscar',
      'encontrar',
    ],
    titleTag: 'Generador de buscar y encontrar | LessonCraftStudio',
    metaDescription: 'Cree fichas de "busca y encuentra" con imágenes temáticas. Soluciones automáticas, PDF 300 DPI. Prueba gratis — venda en Etsy y KDP.',
  },

  hero: {
    title: 'Generador de buscar y encontrar — Crea imprimibles para vender en Etsy y KDP',
    tagline: 'Cree fichas de "busca y encuentra" con imágenes temáticas — soluciones automáticas, PDF 300 DPI.',
    description:
      'Genere fichas de busca y encuentra para vender en Etsy, Amazon KDP o Hotmart. Las fichas de objetos escondidos son un formato favorito de niños y adultos — los usuarios buscan imágenes específicas dentro de una escena temática compleja. Este generador crea fichas con imágenes de más de 104 categorías, con dificultad ajustable según la cantidad de objetos y la complejidad visual. Los libros de busca y encuentra son un género probado en Amazon KDP con ventas consistentes. Exporte PDFs a 300 DPI con solucionario automático y véndalos con la licencia comercial incluida. El formato es puramente visual y funciona en cualquier idioma. Pruebe gratis con marca de agua — sin registro.',
  },

  ctaHeading: 'Crear fichas de buscar y encontrar',

  howItWorks: {
    title: 'Cómo crear fichas de busca y encuentra paso a paso',
    steps: [
      {
        title: 'Configure el Diseño de Página',
        description:
          'Abra el panel Página y Escena y elija un tamaño de página: Carta Vertical, Carta Horizontal, A4 Vertical, A4 Horizontal o cualquier dimensión personalizada. Seleccione un color de fondo con el selector de color, elija un tema de fondo y ajuste su opacidad, y luego seleccione un tema de borde con su propio control de opacidad independiente. Estas opciones de diseño enmarcan su ficha de objetos ocultos antes de configurar cualquier contenido.',
      },
      {
        title: 'Elija Tu Modo de Actividad',
        description:
          'Seleccione entre dos modos en el panel de Selección de Objetos. El modo Yo Espío (predeterminado) cree escenas de objetos ocultos en forma libre donde los objetos se dispersan por la página usando un algoritmo de posicionamiento sin superposición — sin cuadrícula, solo una escena visual de aspecto natural. El modo Encuentra el Diferente organiza imágenes emparejadas en filas con elementos sin pareja mezclados para actividades de discriminación visual. Cada modo produce un tipo diferente de ficha de búsqueda y encuentro a partir de la misma biblioteca de imágenes.',
      },
      {
        title: 'Seleccione Imágenes y Configure la Cantidad de Objetos',
        description:
          'Explore 104 colecciones temáticas de imágenes con más de 3100 ilustraciones coloridas en el panel Biblioteca de Imágenes. Filtra por tema o busque por palabra clave. En el modo Yo Espío, configure de 1 a 5 objetos ocultos a encontrar y de 8 a 12 objetos distractores que llenan la escena. En el modo Encuentra el Diferente, establezca de 8 a 12 imágenes emparejadas y de 1 a 5 elementos sin pareja. También puede subir imágenes personalizadas en formato PNG, JPG o GIF para usar junto al contenido de la biblioteca.',
      },
      {
        title: 'Genere la Escena de Objetos Ocultos',
        description:
          'Haga clic en Generar para crear la ficha. En el modo Yo Espío, el algoritmo sin superposición coloque cada imagen probando 50 posiciones aleatorias y seleccionando la que tiene menor superposición, reduciendo adaptativamente el tamaño de la imagen cuando el espacio es limitado. Una leyenda aparece en la parte inferior mostrando a los usuarios qué objetos deben encontrar. En el modo Encuentra el Diferente, las imágenes se organizan en filas con elementos emparejados y sin pareja. El encabezado autoajustable muestra su título en fuente Fredoka con contenedores decorativos tipo píldora — el tamaño de fuente se ajusta automáticamente según la longitud del texto.',
      },
      {
        title: 'Genere la Clave de Respuestas y Descargue',
        description:
          'Cambie a la pestaña Clave de Respuestas para ver las anotaciones autogeneradas: círculos rojos dibujados alrededor de los objetos ocultos (modo Yo Espío) o los elementos sin pareja (modo Encuentra el Diferente), de 3 a 5 px más grandes que el objeto para mayor visibilidad. Descargue ambas versiones usando cuatro botones dedicados en el menú desplegable: JPEG de Ficha, JPEG de Clave, PDF de Ficha y PDF de Clave a 300 DPI. Active la escala de grises para versiones que ahorran tinta. Cada exportación está lista para producción en listados de Etsy, interiores de Amazon KDP y archivos de productos de Hotmart.',
      },
    ],
  },

  keyFeatures: {
    title: 'Por qué las fichas de busca y encuentra se venden bien',
    features: [
      {
        title: 'Dos Modos de Actividad: Yo Espío y Encuentra el Diferente',
        description:
          'Un solo generador cubre dos formatos de actividad distintos. El modo Yo Espío cree escenas de objetos ocultos en forma libre donde de 1 a 5 objetos objetivo se ocultan entre 8 a 12 distractores en una escena visual dispersa — los usuarios buscan en la página y rodean lo que encuentran. El modo Encuentra el Diferente organiza de 8 a 12 imágenes emparejadas en filas con 1 a 5 elementos sin pareja mezclados — los usuarios identifican las imágenes sin un par correspondiente. Las imágenes en el modo Encuentra el Diferente se muestran un 50% más grandes que en el modo Yo Espío para una comparación visual más clara. Cada modo produce un desafío cognitivo diferente a partir de la misma biblioteca de imágenes.',
      },
      {
        title: 'Generación de Escenas sin Superposición con Tamaño de Imagen Adaptativo',
        description:
          'El modo Yo Espío use un algoritmo de posicionamiento sofisticado en lugar de una cuadrícula fija. La función findBestPosition() pruebe 50 posiciones aleatorias por imagen y seleccione la ubicación con menor superposición. Cuando el espacio es limitado, el algoritmo reduce adaptativamente el tamaño de la imagen para encajar más objetos sin saturar la escena. Esto cree escenas de objetos ocultos de aspecto natural donde las imágenes se dispersan orgánicamente por la página — mucho más atractivas que las alternativas basadas en cuadrícula donde los objetos se ubican en filas y columnas predecibles.',
      },
      {
        title: 'Clave de Respuestas Autogenerada con Anotaciones de Círculos',
        description:
          'Cada ficha de objetos ocultos genere automáticamente una clave de respuestas complementaria en una pestaña de lienzo separada. La clave de respuestas reproduce exactamente el diseño de la ficha y dibuja círculos rojos alrededor de los objetos correctos — objetivos ocultos en el modo Yo Espío y elementos sin pareja en el modo Encuentra el Diferente. Los círculos son de 3 a 5 px más grandes que el objeto para mayor visibilidad. Sin marcado manual, sin creación de archivos separados — la clave de respuestas siempre está sincronizada con la ficha. Este enfoque de doble lienzo ahorra un tiempo de producción significativo para vendedores que crean paquetes de objetos ocultos.',
      },
      {
        title: 'Leyenda que Muestra los Objetos a Encontrar en Modo Yo Espío',
        description:
          'En el modo Yo Espío, una leyenda en el margen inferior de 120 px muestra los objetos objetivo que los usuarios necesitan encontrar. Esta referencia visual indica a los usuarios exactamente qué buscar sin instrucciones escritas — haciendo las fichas accesibles para prelectores y tiendas multilingües. La leyenda se genera automáticamente basándose en los objetos ocultos seleccionados. El modo Encuentra el Diferente use un margen inferior compacto de 50 px ya que los usuarios descubren los elementos sin pareja mediante comparación visual en lugar de una lista de referencia.',
      },
      {
        title: 'Campos de Nombre y Fecha con Control de Activación',
        description:
          'Una casilla de verificación en el panel Texto y Contenido añada campos de \"Nombre:\" y \"Fecha:\" a la ficha. Estas líneas de identificación del usuario aseguran la responsabilidad para uso comercial y dan a las fichas un aspecto profesional para listados en marketplaces. Actívalos para productos listos para vender o desactívalos para páginas de cuadernos de actividades donde la información del usuario aparece en la portada. Los campos se integran limpiamente con el encabezado autogenerado y la leyenda.',
      },
      {
        title: 'Biblioteca de Imágenes con 104 Colecciones Temáticas y Más de 3100 Ilustraciones',
        description:
          'Explore 104 colecciones temáticas que cubren animales, comida, vehículos, naturaleza, profesiones, festividades, deportes, estaciones y docenas más. Cada tema ofrece un conjunto coordinado de ilustraciones coloridas que funcionan como objetos ocultos y distractores en escenas Yo Espío, o como elementos emparejados y sin pareja en fichas Encuentra el Diferente. Filtra por tema usando el desplegable o busque imágenes específicas por palabra clave. El nivel Comercial incluya 10 temas coloridos (~300 imágenes); el Acceso Completo desbloquea los 104 temas con más de 3100 ilustraciones.',
      },
      {
        title: 'Exportación PDF y JPEG Lista para Imprimir a 300 DPI con Escala de Grises',
        description:
          'Descargue fichas de objetos ocultos y claves de respuestas como imágenes JPEG de alta resolución o documentos PDF listos para imprimir a 300 DPI (multiplicador 6×). Cuatro botones de descargue en el menú desplegable exportan JPEG de Ficha, JPEG de Clave, PDF de Ficha y PDF de Clave por separado. Los tamaños de página incluyen Carta Vertical, Carta Horizontal, A4 Vertical, A4 Horizontal y dimensiones totalmente personalizadas. Active la escala de grises para versiones que ahorran tinta. Cada exportación está lista para producción en descargue digitales, cuadernos impresos y materiales para venta en línea.',
      },
      {
        title: 'Edición Completa del Lienzo con Herramientas de Texto, Temas de Fondo y Temas de Borde',
        description:
          'El lienzo Fabric.js proporciona control completo sobre cada elemento de su ficha de objetos ocultos. Arrastre, redimensiona, rota y reposiciona imágenes, texto y contenido generado libremente. Los controles de capa gestionan el orden de apilamiento. Añada texto personalizado con seis opciones de fuente (Fredoka, Lexend Deca, Baloo 2, Nunito, Quicksand, Arial), tamaño y color ajustables, y ancho de contorno de texto de 0 a 10 con granularidad de 0,5. Los temas de fondo y de borde tienen controles de opacidad independientes. Zoom del 25% al 300% usando controles de botón (Acercar +25%, Alejar −25%, Restablecer 100%). Deshacer y rehacer hasta 20 estados del historial con Ctrl+Z y Ctrl+Y.',
      },
    ],
  },

  businessUseCases: {
    title: 'Vender fichas de busca y encuentra en Etsy, KDP y Hotmart',
    cases: [
      {
        title: 'Paquetes Temáticos de Actividades de Objetos Ocultos en Etsy',
        description:
          'Cree paquetes temáticos de fichas Yo Espío usando las 104 colecciones de imágenes — objetos ocultos de animales, Yo Espío de festividades, búsqueda de criaturas marinas, encuentra dinosaurios y docenas más. Cada tema proporciona suficientes ilustraciones para múltiples escenas únicas de objetos ocultos con dificultad variable. Empaqueta de 10 a 20 fichas de objetos ocultos por tema con claves de respuestas incluidas, y vende a $3–$7 por paquete. Aumenta la dificultad a lo largo del paquete añadiendo más objetos ocultos (1 → 5) y más distractores (8 → 12) conforme avanzan las páginas.',
        platform: 'Etsy (etsy.com)',
      },
      {
        title: 'Cuadernos de Actividades de Objetos Ocultos en Amazon KDP',
        description:
          'Compila de 40 a 80 fichas de objetos ocultos en un cuaderno impreso formateado para Amazon KDP. Estructura su libro por dificultad progresiva: los primeros capítulos ocultan 1–2 objetos entre 8 distractores para principiantes, los capítulos intermedios aumentan a 3–4 objetos ocultos con 10 distractores, y los capítulos avanzados usan 5 objetos ocultos entre 12 distractores. Incluya claves de respuestas al final del libro. La escala de grises produce páginas que ahorran tinta listas para interiores en blanco y negro. El diseño puramente visual significa que un solo cuaderno funciona para cualquier mercado lingüístico.',
        platform: 'Amazon KDP (kdp.amazon.com)',
      },
      {
        title: 'Fichas de Discriminación Visual Encuentra el Diferente para Hotmart',
        description:
          'Diseña fichas listas para usar de Encuentra el Diferente donde los usuarios identifican elementos sin pareja entre conjuntos emparejados. Los vendedores que buscan actividades de discriminación visual en Hotmart valoran fichas que desarrollan habilidades de observación y razonamiento lógico. Cree conjuntos alineados con el catálogo de productos: encuentra el diferente de animales de granja, reconocimiento de formas, clasificación estacional y clasificación por hábitats. Incluya campos de nombre y fecha para responsabilidad del usuario, y proporciona claves de respuestas que muestran qué elementos no tenían pareja. Cada conjunto se exporta en formato PDF y JPEG.',
        platform: 'Hotmart (hotmart.com)',
      },
      {
        title: 'Colecciones Estacionales de Actividades de Objetos Ocultos',
        description:
          'Las 104 colecciones temáticas cubren cada ocasión estacional y festiva — Navidad, Halloween, Pascua, San Valentín, vuelta al cole, vacaciones de verano y más. Cree colecciones de fichas de objetos ocultos por disponible ahora que se alineen con los períodos de mayor demanda. Publique paquetes de Yo Espío de Halloween en septiembre, colecciones de objetos ocultos de Navidad en octubre, y paquetes de busca y encuentra de San Valentín en enero. Incluya fichas tanto de Yo Espío como de Encuentra el Diferente en cada conjunto estacional para máximo valor.',
        platform: 'Etsy / Amazon KDP / Hotmart (estacional)',
      },
      {
        title: 'Paquetes Mixtos de Yo Espío y Encuentra el Diferente',
        description:
          'Combine ambos modos de actividad en paquetes variados premium. Cada paquete incluya escenas de Yo Espío donde los usuarios encuentran objetos específicos en una escena dispersa, más fichas de Encuentra el Diferente donde los usuarios identifican elementos sin pareja entre conjuntos emparejados. Esta combinación trabaja dos habilidades cognitivas diferentes — búsqueda visual y discriminación visual — en un solo producto. Los paquetes mixtos tienen precios más altos porque ofrecen más variedad de actividades y cubren más objetivos de aprendizaje que los productos de un solo modo.',
        platform: 'Etsy / Hotmart (paquetes variados)',
      },
    ],
  },

  faq: [
    {
      question: '¿Cuáles son los dos modos de actividad y en qué se diferencian?',
      answer:
        'El generador ofrece dos modos distintos. El modo Yo Espío (predeterminado) cree escenas de objetos ocultos en forma libre donde de 1 a 5 objetos objetivo se dispersan entre 8 a 12 distractores usando un algoritmo de posicionamiento sin superposición — los usuarios buscan en la página y rodean lo que encuentran, guiados por una leyenda en la parte inferior que muestra los objetos a localizar. El modo Encuentra el Diferente organiza de 8 a 12 imágenes emparejadas en filas con 1 a 5 elementos sin pareja mezclados — los usuarios identifican las imágenes que no tienen un par correspondiente. Las imágenes en el modo Encuentra el Diferente son un 50% más grandes que en el modo Yo Espío para una comparación visual más clara.',
    },
    {
      question: '¿Cómo funciona el algoritmo de posicionamiento sin superposición en el modo Yo Espío?',
      answer:
        'En lugar de colocar imágenes en una cuadrícula fija, el modo Yo Espío use un algoritmo findBestPosition() que pruebe 50 posiciones aleatorias para cada imagen y seleccione la ubicación con menor superposición. Cuando el espacio es limitado, el algoritmo reduce adaptativamente el tamaño de la imagen para encajar más objetos sin saturar la escena. Esto cree escenas de objetos ocultos de aspecto natural donde las imágenes se dispersan orgánicamente por la página, haciendo la experiencia de búsqueda más atractiva que los diseños predecibles basados en cuadrícula.',
    },
    {
      question: '¿Cuántos objetos ocultos y distractores puedo usar en el modo Yo Espío?',
      answer:
        'En el modo Yo Espío, puede configurar de 1 a 5 objetos ocultos (los objetivos que los usuarios necesitan encontrar) y de 8 a 12 objetos distractores (las imágenes circundantes que llenan la escena). Comience con 1–2 objetos ocultos y 8 distractores para fichas más fáciles, y aumenta a 5 objetos ocultos entre 12 distractores para escenas desafiantes. La leyenda en la parte inferior de la ficha muestra a los usuarios qué objetos deben encontrar.',
    },
    {
      question: '¿Cómo funciona el modo Encuentra el Diferente?',
      answer:
        'El modo Encuentra el Diferente organiza imágenes en filas con elementos emparejados y sin pareja. Configure de 8 a 12 imágenes emparejadas (cada una aparece dos veces en el diseño) y de 1 a 5 elementos sin pareja que aparecen solo una vez. Los usuarios examinan cada fila e identifican la imagen que no tiene un par correspondiente. Las imágenes se muestran un 50% más grandes que en el modo Yo Espío para una comparación visual más clara. No hay leyenda en la parte inferior ya que los usuarios descubren los elementos sin pareja mediante análisis visual en lugar de una lista de referencia.',
    },
    {
      question: '¿Qué muestra la leyenda en la parte inferior de la ficha?',
      answer:
        'En el modo Yo Espío, una leyenda en el margen inferior de 120 px muestra los objetos objetivo que los usuarios necesitan encontrar. Esta referencia visual indica a cada usuario exactamente qué buscar — haciendo las fichas accesibles para prelectores y tiendas multilingües sin necesidad de instrucciones escritas. El modo Encuentra el Diferente no incluya leyenda ya que la actividad se explica por sí sola: encontrar la imagen sin un par correspondiente.',
    },
    {
      question: '¿Cómo funciona la clave de respuestas autogenerada?',
      answer:
        'El generador usa un sistema de doble lienzo con una pestaña de Ficha y una pestaña de Clave de Respuestas. La ficha muestra la escena de objetos ocultos sin marcas — los usuarios buscan y rodean los objetos por sí mismos. La clave de respuestas reproduce el diseño idéntico y dibuja círculos rojos alrededor de los objetos correctos: objetivos ocultos en el modo Yo Espío y elementos sin pareja en el modo Encuentra el Diferente. Los círculos son de 3 a 5 px más grandes que el objeto para mayor visibilidad. Ambas versiones se exportan por separado usando cuatro botones de descargue: JPEG de Ficha, JPEG de Clave, PDF de Ficha y PDF de Clave.',
    },
    {
      question: '¿Puedo añadir campos de nombre y fecha a la ficha?',
      answer:
        'Sí. Una casilla de verificación en el panel Texto y Contenido añada campos de \"Nombre:\" y \"Fecha:\" a la ficha. Estas líneas de identificación del usuario aseguran la responsabilidad para uso comercial y dan a sus fichas un aspecto profesional para listados en marketplaces. Actívalos para productos listos para vender o desactívalos para páginas de cuadernos de actividades.',
    },
    {
      question: '¿Cómo funciona el encabezado autogenerado?',
      answer:
        'Cada ficha incluye un título autoajustable en fuente Fredoka (#4A4A4A gris oscuro) con contenedores decorativos blancos tipo píldora animados y sombras. El tamaño de fuente del título se ajusta automáticamente según la longitud del texto: 32 px para títulos cortos (menos de 12 caracteres), reduciéndose hasta 18 px para títulos más largos (más de 22 caracteres). También puede añadir un campo de descripción debajo del título. El sistema de encabezado asegura fichas de aspecto profesional independientemente de la longitud del título.',
    },
    {
      question: '¿Hay una prueba gratuita?',
      answer:
        'Sí. Puede acceder a todas las funciones — ambos modos de actividad, cantidades configurables de objetos ocultos y distractores, el algoritmo de posicionamiento sin superposición, la clave de respuestas autogenerada, la biblioteca completa de imágenes, temas de fondo y de borde, campos de nombre y fecha, y todos los formatos de descargue — sin crear una cuenta, introducir una tarjeta de crédito ni instalar ningún software. Las descargas de prueba gratuita incluyen una pequeña marca de agua. Una licencia comercial elimina la marca de agua y otorga derechos completos de venta.',
    },
    {
      question: '¿El generador de objetos ocultos depende del idioma?',
      answer:
        'No. El generador de objetos ocultos es puramente visual — no carga nombres de imagen localizados ni use el sistema de Vocabulario de Imágenes. La configuración de idioma afecta solo a las etiquetas de la interfaz (botones, títulos de paneles, tooltips), NO al contenido de las fichas en sí. Esto significa que cada ficha generada funciona universalmente en todos los idiomas sin ningún texto localizado en la página, haciendo sus productos vendibles en cualquier mercado sin modificaciones.',
    },
    {
      question: '¿Cuál es la política de reembolso?',
      answer:
        'Dado que la prueba gratuita le da acceso a todas las funciones, no ofrecemos reembolsos en compre de licencias comerciales. Puede probar ambos modos de actividad, el algoritmo de posicionamiento sin superposición, las cantidades configurables de objetos, la clave de respuestas autogenerada, la biblioteca completa de imágenes, temas de fondo y de borde, campos de nombre y fecha, y todos los formatos de descargue antes de comprar. La prueba gratuita es la política de reembolso — asegúrese de que la herramienta se adapta a sus necesidades antes de adquirir una licencia.',
    },
  ],

  internalLinks: [
    {
      pageType: 'app',
      slug: 'buscar-contar-fichas',
      anchorText: 'Generador de Fichas de Buscar y Contar',
    },
    {
      pageType: 'app',
      slug: 'crucigramas-imagenes-fichas',
      anchorText: 'Generador de Crucigramas con Imágenes',
    },
    {
      pageType: 'app',
      slug: 'busqueda-tesoro-fichas',
      anchorText: 'Generador de Fichas de Búsqueda del Tesoro',
    },
    {
      pageType: 'app',
      slug: 'clasificar-imagenes-fichas',
      anchorText: 'Generador de Fichas de Clasificar Imágenes',
    },
    {
      pageType: 'app',
      slug: 'relacionar-fichas',
      anchorText: 'Generador de Fichas de Relacionar',
    },
    {
      pageType: 'app',
      slug: 'encuentra-el-diferente-fichas',
      anchorText: 'Generador de Fichas de Encuentra el Diferente',
    },
    {
      pageType: 'bundle',
      slug: 'paquete-busca-encuentra',
      anchorText: 'Paquete Busca y Encuentra — Todas las Apps de Búsqueda en Un Solo Paquete',
    },
    {
      pageType: 'guide',
      slug: 'crear-fichas-objetos-ocultos',
      anchorText: 'Cómo Crear Fichas de Objetos Ocultos Que Se Vendan',
    },
    {
      pageType: 'idea',
      slug: 'camping-ideas-imprimibles',
      anchorText: 'Ideas de imprimibles de camping y aire libre',
    },
    {
      pageType: 'idea',
      slug: 'animales-marinos-ideas-imprimibles',
      anchorText: 'Ideas de imprimibles de animales marinos',
    },
    {
      pageType: 'start',
      slug: 'marketing-negocio-imprimibles',
      anchorText: 'Marketing para su negocio de imprimibles',
    },
  ],

  visuals: {
    heroImages: {
      primary: '/samples/spanish/find%20objects/encuentra-el-diferente-1.webp',
      primaryAlt: 'Ficha de objetos ocultos Yo Espío con imágenes dispersas usando algoritmo sin superposición, leyenda inferior mostrando objetos a encontrar y encabezado decorativo',
    },
    sampleGallery: [
      {
        src: '/samples/spanish/find%20objects/encuentra-el-diferente-2.webp',
        alt: 'Escena de objetos ocultos Yo Espío con imágenes dispersas y leyenda mostrando objetos objetivo en la parte inferior',
        caption: 'Modo Yo Espío — escena de objetos ocultos en forma libre con leyenda',
      },
      {
        src: '/samples/spanish/find%20objects/encuentra-el-diferente-3-v6.webp',
        alt: 'Ficha Encuentra el Diferente con imágenes emparejadas en filas y elementos sin pareja a identificar',
        caption: 'Modo Encuentra el Diferente — imágenes emparejadas con elementos sin pareja para discriminación visual',
      },
      {
        src: '/samples/spanish/find%20objects/encuentra-el-diferente-1-answer-key-v5.webp',
        alt: 'Clave de respuestas de ficha de objetos ocultos con círculos rojos dibujados alrededor de los objetos objetivo',
        caption: 'Clave de respuestas autogenerada — círculos rojos marcan objetos ocultos y sin pareja',
      },
    ],
    youtubeId: '8Y3jrVr1Phs',
    videoTitle: 'Cómo Crear Fichas de Objetos Ocultos con Modos Yo Espío y Encuentra el Diferente — Tutorial Paso a Paso',
  },
};

export default content;
