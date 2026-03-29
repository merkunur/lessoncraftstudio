import type { AppContent } from '../types';

const content: AppContent = {
  seo: {
    primaryKeyword: 'fichas de sombras para vender en Etsy',
    secondaryKeywords: [
      'generador de fichas de sombras para vendedores Etsy',
      'fichas de emparejar sombras para Amazon KDP',
      'ejercicios de siluetas imprimibles licencia comercial',
      'crear fichas de shadow match para vender',
    ],
    lsiKeywords: [
      'fichas sombras siluetas vendedores preescolar',
      'ejercicios percepción visual imprimibles KDP',
      'negocio fichas sombras mercado hispano Etsy',
    ],
    titleTag: 'Fichas de sombras para vender en Etsy | LCS',
    metaDescription:
      'Cree fichas de emparejar sombras para vender en Etsy y KDP. Los niños asocian imágenes con siluetas. Licencia comercial. Pruebe gratis.',
  },

  hero: {
    title: 'Genere fichas de sombras para vender en Etsy, KDP y Hotmart',
    tagline: 'Cree fichas donde los niños asocian imágenes con sus siluetas — un formato encantador.',
    description:
      'Genere fichas de emparejar sombras para vender en Etsy, Amazon KDP o Hotmart. Los niños observan imágenes coloridas y las asocian con sus siluetas correspondientes — un ejercicio de percepción visual fundamental para preescolar e infantil. Con más de 3.000 ilustraciones en 104 temas, cree fichas de sombras para cualquier estación o interés. Las fichas de sombras son uno de los formatos más populares en Etsy para educación temprana por su atractivo visual inmediato. Exporte PDFs a 300 DPI con solucionario automático y véndalos con la licencia comercial incluida. El formato es puramente visual — cero barreras de idioma. Pruebe gratis con marca de agua — sin registro.',
  },

  howItWorks: {
    title: 'Cómo crear fichas de sombras en minutos',
    steps: [
      {
        title: 'Defina el Diseño de Página',
        description:
          'Abra el panel de Configuración de Página y elija un tamaño de página: Carta Vertical, Carta Horizontal, A4 Vertical, A4 Horizontal, Cuadrado (1200×1200) o cualquier dimensión personalizada. Seleccione un color de fondo predeterminado con el selector de color. Elija un tema de fondo y ajuste su opacidad (de 0 a 1 en pasos de 0,05), luego elija un tema de borde con su propio control de opacidad independiente. Estas opciones de diseño enmarcan su ficha de asociación de sombras antes de configurar el contenido.',
      },
      {
        title: 'Elija el Modo de Ejercicio y Configure las Opciones',
        description:
          'Abra el panel de Configuración del Ejercicio y seleccione su modo: Asociación de Sombras o Completa la Imagen. El modo Asociación de Sombras genere siluetas negras a partir de sus imágenes seleccionadas mediante procesamiento a nivel de píxeles. El modo Completa la Imagen divide las imágenes en mitades — elija la dirección de corte horizontal (arriba/abajo) o vertical (izquierda/derecha) con los botones de radio que aparecen en este modo. Active o desactive la casilla \"Mostrar Etiquetas\" (activada por defecto) para mostrar los identificadores A/B/C/D y 1/2/3/4 en la ficha. Active \"Incluir Campos Nombre/Fecha\" para añadir líneas de nombre y fecha para los usuarios.',
      },
      {
        title: 'Seleccione 4 Imágenes de la Biblioteca',
        description:
          'Abra el panel de Biblioteca de Imágenes y explore 104 colecciones temáticas con más de 3100 ilustraciones coloridas — animales, comida, vehículos, naturaleza, fiestas y muchas más. Filtra por tema con el menú desplegable o busque por palabra clave con retardo de 300 ms. Haga clic en las imágenes para seleccionarlas — el contador muestra su progreso hacia las 4 imágenes requeridas. Una vista previa de las imágenes seleccionadas confirma sus elecciones antes de generar. También puede subir imágenes personalizadas PNG, JPG o GIF a través del panel Subir Imágenes Personalizadas.',
      },
      {
        title: 'Genere la Ficha de Asociación de Sombras',
        description:
          'Haga clic en Generar para crear la ficha de correspondencia. En el modo Asociación de Sombras, la aplicación procesa cada imagen a nivel de píxeles — la carga en un lienzo, extrae los datos de píxeles vía getImageData, y convierte cada píxel con alpha > 10 en negro puro (R=0, G=0, B=0, A=255) para producir siluetas precisas. En el modo Completa la Imagen, las imágenes se dividen según la dirección de corte elegida. Ambos modos aplican un derangement Fisher-Yates para garantizar que ningún elemento aparece en su posición original. Un encabezado estilizado aparece con fondo ámbar (#FFC107), contenedor blanco tipo cápsula y borde ámbar de 3 px mostrando \"Asociación de Sombras\" e instrucciones en el idioma seleccionado.',
      },
      {
        title: 'Genere la Clave de Respuesta y Descargue',
        description:
          'Cambie a la pestaña Clave de Respuesta para ver la clave de respuesta auto-generada. En el modo Asociación de Sombras, cada celda muestra la imagen original junto a su silueta con una etiqueta como \"A → 2\" indicando la correspondencia correcta. En el modo Completa la Imagen, cada celda muestra la imagen original completa con su etiqueta de correspondencia. Descargue ambas versiones con los cuatro botones dedicados: JPEG Ficha de Trabajo, JPEG Clave de Respuesta, PDF Ficha de Trabajo y PDF Clave de Respuesta a 300 DPI. Active la escala de grises para versiones que ahorran tinta. Cada exportación está lista para la producción en anuncios de Etsy, interiores de Amazon KDP y archivos de productos Hotmart.',
      },
    ],
  },

  keyFeatures: {
    title: 'Por qué las fichas de sombras se venden bien en Etsy',
    features: [
      {
        title: 'Siluetas Auto-Generadas mediante Procesamiento de Imágenes a Nivel de Píxeles',
        description:
          'El modo Asociación de Sombras cree siluetas negras mediante una verdadera manipulación a nivel de píxeles — sin filtros CSS ni recursos prefabricados. La aplicación carga cada imagen en un lienzo, extrae los datos de píxeles vía getImageData, y convierte cada píxel cuyo valor alpha es superior a 10 en negro puro (R=0, G=0, B=0, A=255). Esto preserva el perfil de transparencia exacto de cada imagen, produciendo contornos de siluetas precisos que reflejan detalles finos como orejas de animales, formas de vehículos y contornos de objetos. La gestión CORS asegura el procesamiento correcto de imágenes cross-origin, con un respaldo a un rectángulo negro sólido si el lienzo está contaminado.',
      },
      {
        title: 'Dos Modos de Ejercicio: Asociación de Sombras y Completa la Imagen con Opciones de Dirección de Corte',
        description:
          'Un solo generador ofrece dos actividades de correspondencia visual distintas. El modo Asociación de Sombras coloque 4 imágenes en color en la fila superior y 4 siluetas auto-generadas en la fila inferior — los usuarios identifican cada imagen solo por la forma de su contorno. El modo Completa la Imagen divide 4 imágenes en mitades y presenta las primeras y segundas mitades por separado — los usuarios reconectan las piezas para completar cada imagen. En el modo Completa la Imagen, elija la dirección de corte horizontal (mitades arriba/abajo) o vertical (mitades izquierda/derecha). El diseño se adapta automáticamente: las páginas horizontales usan 2 filas × 4 elementos, las páginas verticales usan 2 columnas × 4 elementos.',
      },
      {
        title: 'Algoritmo de Derangement que Garantiza Cero Correspondencias Triviales',
        description:
          'Ambos modos de ejercicio utilizan un algoritmo de derangement Fisher-Yates que garantiza que ningún elemento aparece en su posición original. En el modo Asociación de Sombras, ninguna silueta se sitúa directamente debajo de su imagen correspondiente. En el modo Completa la Imagen, ninguna segunda mitad aparece adyacente a su primera mitad correspondiente. Esto elimina la posibilidad de adivinar correctamente solo por la posición y asegura que cada ficha presenta un verdadero desafío de correspondencia. El derangement se recalcula en cada generación, produciendo disposiciones diferentes a partir del mismo conjunto de imágenes.',
      },
      {
        title: 'Clave de Respuesta Auto-Generada con Etiquetas de Correspondencia Letra-Número',
        description:
          'Cada ficha de asociación de sombras genere automáticamente una clave de respuesta complementaria en una pestaña de lienzo separada. La clave de respuesta use un diseño de cuadrícula donde cada celda muestra la imagen original junto a su silueta o imagen completa, etiquetada con la correspondencia correcta como \"A → 2\". La cuadrícula use 4 columnas con un espacio de 50 px antes de la segunda fila y 15 px de espaciado vertical entre elementos. Sin creación manual de clave de respuesta — la clave de respuesta se mantiene sincronizada con la ficha. Descárgala por separado como answer_key.jpeg o answer_key.pdf junto a la ficha del usuario.',
      },
      {
        title: 'Biblioteca de Imágenes con 104 Colecciones Temáticas y Más de 3100 Ilustraciones',
        description:
          'Explore 104 colecciones de imágenes temáticas que cubren animales, comida, vehículos, naturaleza, profesiones, fiestas, deportes, estaciones y muchas más. Cada tema proporciona ilustraciones coloridas que producen siluetas distintivas con contornos reconocibles — formas de animales, perfiles de vehículos y contornos de objetos que estimulan la percepción visual. Filtra por tema con el menú desplegable o busque imágenes específicas por palabra clave. La Licencia Comercial incluya 10 temas coloridos para empezar; el Acceso Completo desbloquea los 104 temas para máxima variedad creativa en ambos modos de ejercicio.',
      },
      {
        title: 'Etiquetas Opcionales y Campos Nombre/Fecha para Usuarios',
        description:
          'Active o desactive la casilla \"Mostrar Etiquetas\" (activada por defecto) para mostrar los identificadores A, B, C, D en las imágenes o primeras mitades y 1, 2, 3, 4 en las siluetas o segundas mitades. Cuando las etiquetas están ocultas, la ficha se convierte en un desafío de correspondencia puramente visual sin ayuda alfanumérica — ideal para actividades avanzadas o cuadernos de puzzles donde no se necesitan respuestas escritas. La casilla \"Incluir Campos Nombre/Fecha\" añada líneas de nombre y fecha en la parte inferior de la página para la responsabilidad en línea y la organización.',
      },
      {
        title: 'Exportación PDF y JPEG Lista para Imprimir a 300 DPI con Modo Escala de Grises',
        description:
          'Descargue fichas de asociación de sombras y claves de respuesta como imágenes JPEG de alta resolución o documentos PDF listos para imprimir renderizados a 300 DPI (multiplicador 6×, calidad JPEG 1.0). Cuatro botones de descargue dedicados exportan los archivos de ficha de trabajo y clave de respuesta por separado. Los tamaños de página incluyen Carta Vertical, Carta Horizontal, A4 Vertical, A4 Horizontal, Cuadrado (1200×1200) y dimensiones totalmente personalizadas. La orientación del PDF se detecta automáticamente. Active la escala de grises para versiones que ahorran tinta. Cada exportación está lista para la producción en descargue digitales, cuadernos impresos y materiales del mercado.',
      },
      {
        title: 'Edición Completa del Lienzo con Herramientas de Texto, Alineación y Controles de Capas',
        description:
          'El lienzo Fabric.js ofrece control completo sobre cada elemento de su ficha de asociación de sombras. Arrastre, redimensiona, rota y reposiciona libremente imágenes, texto y contenido generado. Los controles de capas gestionan el orden de apilamiento — trae elementos al frente o envíalos al fondo. Bloquea elementos terminados mientras editas otros. Añada texto personalizado con siete opciones de fuente (Lexend Deca, Baloo 2, Nunito, Quicksand, Fredoka, Arial, Verdana), tamaño y color ajustables, y ancho de contorno de texto de 0 a 10 en pasos de 0,5. Seis opciones de alineación más centrado en la página mantienen diseños precisos. Zoom del 25 % al 300 % para trabajo de detalle. Deshacer y rehacer con historial ilimitado mediante Ctrl+Z y Ctrl+Y.',
      },
    ],
  },

  businessUseCases: {
    title: 'Vender fichas de sombras en Etsy, KDP y Hotmart',
    cases: [
      {
        title: 'Packs Temáticos de Asociación de Sombras en Etsy',
        description:
          'Cree packs temáticos de asociación de sombras usando las 104 colecciones de imágenes — puzzles de sombras de animales, correspondencia de siluetas de vehículos, desafíos de sombras de alimentos y muchos más. Cada tema proporciona ilustraciones con contornos distintivos que crean actividades de siluetas atractivas. Agrupa 15–20 fichas de asociación de sombras por tema con claves de respuesta incluidas, y vende entre $3 y $7 por pack. Mezcla ambos modos en un solo pack: fichas de Asociación de Sombras para reconocimiento de siluetas y fichas de Completa la Imagen para razonamiento espacial. Las siluetas auto-generadas y las claves de respuesta eliminan las partes más laboriosas de la producción.',
        platform: 'Etsy (etsy.com)',
      },
      {
        title: 'Cuadernos de Percepción Visual en Amazon KDP',
        description:
          'Compila 50–80 fichas de asociación de sombras en un cuaderno impreso formateado para Amazon KDP. Estructura su libro con capítulos alternados: los capítulos de Asociación de Sombras desarrollan el reconocimiento de siluetas mientras que los capítulos de Completa la Imagen desarrollan la conciencia espacial y el razonamiento parte-todo. Incluya las direcciones de corte horizontal y vertical en las secciones de Completa la Imagen para variedad. Coloque las claves de respuesta al final del libro usando la función de clave de respuesta auto-generada. El modo escala de grises produce páginas que ahorran tinta listas para interiores de libros en blanco y negro. Los cuadernos de puzzles de percepción visual se venden bien todo el año en la categoría de libros de actividades.',
        platform: 'Amazon KDP (kdp.amazon.com)',
      },
      {
        title: 'Actividades Rápidas de Fin de Clase para Hotmart',
        description:
          'Diseña actividades de asociación de sombras listas para usar con campos de nombre/fecha y claves de respuesta impresas para uso comercial. Los vendedores que buscan ejercicios de discriminación visual valoran fichas que llegan listas para imprimir. Cree conjuntos vinculados al catálogo de productos: correspondencia de sombras de animales para ciencias, siluetas de profesiones para estudios sociales, puzzles de sombras de alimentos para nutrición. La opción de etiquetas le permite crear versiones guiadas (con etiquetas A/B/C/D y 1/2/3/4) y versiones desafío (etiquetas ocultas) en el mismo producto para paquetes escalonados por nivel.',
        platform: 'Hotmart (hotmart.com)',
      },
      {
        title: 'Colecciones de Asociación de Sombras de Temporada',
        description:
          'Las 104 colecciones de imágenes temáticas cubren cada ocasión estacional y festiva — Navidad, Halloween, Pascua, San Valentín, vuelta al cole, vacaciones de verano y más. Las actividades de siluetas tienen un atractivo especial durante Halloween cuando los temas de sombras y misterio son naturalmente populares. Cree colecciones de asociación de sombras por disponible ahora alineadas con los períodos de mayor demanda. Incluya fichas de Asociación de Sombras y Completa la Imagen en cada conjunto estacional para máximo valor y variedad. Los productos estacionales pueden venderse a precios más altos durante sus períodos pico.',
        platform: 'Etsy / Amazon KDP / Hotmart (estacional)',
      },
      {
        title: 'Packs de Puzzles Multi-Modo como Paquetes Premium',
        description:
          'Combine ambos modos de ejercicio en packs de puzzles multi-modo premium que demuestran la versatilidad del generador. Cada pack incluya fichas de Asociación de Sombras (reconocimiento de siluetas), fichas de Completa la Imagen con cortes horizontales (reensamblaje arriba/abajo) y fichas de Completa la Imagen con cortes verticales (reensamblaje izquierda/derecha) — tres tipos de actividades distintos a partir de un mismo conjunto de imágenes temáticas. Este enfoque tres-en-uno justifica precios premium de $7–$12 por pack. Las claves de respuesta para cada ficha se incluyen automáticamente, añadiendo un acabado profesional que aumenta el valor percibido.',
        platform: 'Etsy / Amazon KDP (paquetes premium)',
      },
    ],
  },

  faq: [
    {
      question: '¿Cuáles son los dos modos de ejercicio y en qué se diferencian?',
      answer:
        'El generador ofrece dos modos distintos. El modo Asociación de Sombras coloque 4 imágenes en color en la fila superior y 4 siluetas negras auto-generadas en la fila inferior — los usuarios asocian cada imagen a su sombra emparejando letras (A–D) con números (1–4). El modo Completa la Imagen divide 4 imágenes en mitades y presenta las primeras mitades (A–D) y las segundas mitades (1–4) por separado — los usuarios asocian las mitades para completar cada imagen. Asociación de Sombras evalúa el reconocimiento de siluetas mientras que Completa la Imagen desarrolla la conciencia espacial y el razonamiento parte-todo.',
    },
    {
      question: '¿Cómo se generan las siluetas?',
      answer:
        'Las siluetas se crean mediante un verdadero procesamiento de imágenes a nivel de píxeles, no con filtros CSS ni recursos de sombras prefabricados. La aplicación carga cada imagen en un lienzo, extrae cada píxel vía getImageData, y convierte todos los píxeles cuyo valor alpha es superior a 10 en negro puro (R=0, G=0, B=0, A=255). Esto preserva el perfil de transparencia exacto de cada imagen fuente, produciendo siluetas negras precisas que reflejan detalles finos como orejas, colas, asas y otros contornos distintivos.',
    },
    {
      question: '¿Cuáles son las opciones de dirección de corte en el modo Completa la Imagen?',
      answer:
        'El modo Completa la Imagen ofrece dos opciones de dirección de corte mediante botones de radio: el corte horizontal divide las imágenes en mitades superior e inferior, mientras que el corte vertical divide las imágenes en mitades izquierda y derecha. La dirección de corte se aplica a las 4 imágenes de la ficha. El diseño se adapta automáticamente según la orientación de la página — las páginas horizontales disponen los elementos en 2 filas × 4 elementos, mientras que las páginas verticales usan 2 columnas × 4 elementos para un equilibrio visual óptimo.',
    },
    {
      question: '¿Cómo funciona el algoritmo de derangement?',
      answer:
        'Ambos modos utilizan un algoritmo de derangement Fisher-Yates que garantiza que ningún elemento aparece en su posición original. En el modo Asociación de Sombras, ninguna silueta se sitúa directamente debajo de su imagen correspondiente. En el modo Completa la Imagen, ninguna segunda mitad aparece adyacente a su primera mitad correspondiente. Esto garantiza que cada ficha presenta un verdadero desafío de correspondencia — los usuarios no pueden adivinar correctamente solo por la posición. El derangement se recalcula en cada generación, produciendo disposiciones diferentes a partir de las mismas imágenes.',
    },
    {
      question: '¿Se pueden activar o desactivar las etiquetas A/B/C/D y 1/2/3/4?',
      answer:
        'Sí. La casilla \"Mostrar Etiquetas\" en el panel de Configuración del Ejercicio (activada por defecto) controla si las etiquetas A, B, C, D aparecen en las imágenes o primeras mitades y si las etiquetas 1, 2, 3, 4 aparecen en las siluetas o segundas mitades. Cuando las etiquetas están activadas, los usuarios escriben pares letra-número como respuestas. Cuando las etiquetas están desactivadas, la ficha se convierte en un desafío de correspondencia puramente visual sin ayuda alfanumérica — útil para cuadernos de puzzles o actividades avanzadas.',
    },
    {
      question: '¿Por qué siempre hay exactamente 4 problemas por ficha?',
      answer:
        'La ficha usa un número fijo de 4 problemas de correspondencia (SELECT_COUNT = 4). Esto no es configurable. Cuatro elementos ofrecen el equilibrio óptimo para la correspondencia de siluetas e imágenes divididas: suficiente variedad para crear un verdadero desafío de correspondencia con el derangement, manteniendo cada imagen lo bastante grande para que los usuarios estudien los detalles finos de las siluetas y las mitades divididas. El formato constante de 4 elementos también funciona bien para productos en pack donde cada página tiene una densidad de contenido predecible.',
    },
    {
      question: '¿Cómo funcionan los campos de nombre y fecha?',
      answer:
        'Active la casilla \"Incluir Campos Nombre/Fecha\" en el panel de Configuración del Ejercicio para añadir líneas de nombre y fecha en la parte inferior de la ficha. Cuando está activada, los usuarios pueden escribir su nombre y la fecha directamente en la página impresa — esencial para la responsabilidad en línea y la valor percibido organizada. Cuando está desactivada, la ficha usa toda la superficie de la página para el contenido de correspondencia. Esta opción funciona con ambos modos, Asociación de Sombras y Completa la Imagen.',
    },
    {
      question: '¿Cómo funciona la clave de respuesta auto-generada?',
      answer:
        'El generador usa un sistema de doble lienzo con una pestaña de Ficha de Trabajo y una pestaña de Clave de Respuesta. En el modo Asociación de Sombras, la clave de respuesta muestra una cuadrícula donde cada celda presenta la imagen original junto a su silueta con una etiqueta como \"A → 2\". En el modo Completa la Imagen, cada celda muestra la imagen original completa con su etiqueta de correspondencia. La cuadrícula use 4 columnas con espaciado constante. Ambas versiones se exportan por separado mediante los cuatro botones de descargue dedicados: ficha JPEG, ficha PDF, clave de respuesta JPEG y clave de respuesta PDF.',
    },
    {
      question: '¿Hay una prueba gratis?',
      answer:
        'Sí. Puede acceder a todas las funciones — los dos modos de ejercicio, las siluetas auto-generadas, las opciones de dirección de corte, la clave de respuesta, la biblioteca de imágenes completa, los temas de fondo y de borde, la opción de etiquetas, los campos de nombre/fecha, las herramientas de texto y todos los formatos de descargue — sin crear una cuenta, introducir una tarjeta de crédito ni instalar ningún software. Las descargas de la prueba gratis incluyen una pequeña marca de agua. Una licencia comercial elimina la marca de agua y otorga derechos de venta completos.',
    },
    {
      question: '¿Es el Generador de Asociación de Sombras sensible al idioma?',
      answer:
        'No. La Asociación de Sombras es puramente visual — el resultado de la ficha contiene únicamente imágenes, siluetas y mitades divididas sin contenido textual localizado. La interfaz de la aplicación (menús, botones, texto del encabezado) soporta los 11 idiomas, pero la ficha generada funciona de forma idéntica independientemente de la selección de idioma. Esto hace que las fichas de asociación de sombras sean universalmente vendibles en todos los mercados sin traducción. La Licencia Comercial incluya 10 temas coloridos; el Acceso Completo desbloquea los 104 temas y los 11 idiomas de interfaz.',
    },
    {
      question: '¿Puedo vender fichas de asociación de sombras creadas con esta herramienta en Etsy y Amazon KDP?',
      answer:
        'Sí. Con una licencia comercial, tiene todos los derechos para vender sus fichas de asociación de sombras como descargue digitales en Etsy, como cuadernos impresos en Amazon KDP, como recursos para venta en línea en Hotmart, o a través de cualquier otro canal de venta. Los dos modos de ejercicio, las siluetas auto-generadas, el algoritmo de derangement, las claves de respuesta automáticas y las 104 colecciones de imágenes temáticas le dan las herramientas creativas para producir productos de correspondencia visual originales y vendibles.',
    },
    {
      question: '¿Cuál es la política de reembolso?',
      answer:
        'Como la prueba gratis le da acceso a todas las funciones, no ofrecemos reembolsos en las compre de licencia comercial. Puede probar los dos modos de ejercicio, las siluetas auto-generadas, las opciones de dirección de corte, la clave de respuesta, la biblioteca de imágenes completa, los temas de fondo y de borde, la opción de etiquetas, los campos de nombre/fecha, las herramientas de texto y todos los formatos de descargue antes de comprar. La prueba gratis es la política de reembolso — asegúrese de que la herramienta se adapta a sus necesidades antes de adquirir una licencia.',
    },
  ],

  internalLinks: [
    {
      pageType: 'app',
      slug: 'relacionar-fichas',
      anchorText: 'Generador de Fichas de Asociación',
    },
    {
      pageType: 'app',
      slug: 'rompecabezas-cuadricula-fichas',
      anchorText: 'Generador de Puzzles de Cuadrícula',
    },
    {
      pageType: 'app',
      slug: 'bingo-fichas',
      anchorText: 'Generador de Fichas de Bingo de Imágenes',
    },
    {
      pageType: 'app',
      slug: 'clasificar-imagenes-fichas',
      anchorText: 'Generador de Fichas de Clasificar Imágenes',
    },
    {
      pageType: 'app',
      slug: 'dibujos-colorear-fichas',
      anchorText: 'Generador de Fichas para Colorear',
    },
    {
      pageType: 'app',
      slug: 'buscar-objetos-fichas',
      anchorText: 'Generador de Fichas de Buscar Objetos',
    },
    {
      pageType: 'bundle',
      slug: 'paquete-asociacion-clasificacion',
      anchorText: 'Paquete Asociación y Clasificación — Todas las Apps de Asociación en Un Solo Paquete',
    },
    {
      pageType: 'idea',
      slug: 'preescolar-ideas-imprimibles',
      anchorText: 'Ideas de imprimibles para preescolar',
    },
    {
      pageType: 'idea',
      slug: 'infantil-ideas-imprimibles',
      anchorText: 'Ideas de imprimibles para jardín de infancia',
    },
    {
      pageType: 'start',
      slug: 'plan-negocio-imprimibles',
      anchorText: 'Plan de negocio de imprimibles',
    },
    {
      pageType: 'guide',
      slug: 'crear-fichas-discriminacion-visual',
      anchorText: 'Crear fichas de discriminación visual',
    },
  ],

  visuals: {
    heroImages: {
      primary: '/samples/spanish/shadow match/Empareja las Sombras 1.webp',
      primaryAlt: 'Ficha de asociación de sombras con imágenes en color en la fila superior y siluetas negras auto-generadas en la fila inferior con encabezado ámbar',
    },
    sampleGallery: [
      {
        src: '/samples/spanish/shadow match/Empareja las Sombras 4.webp',
        alt: 'Ficha de asociación de sombras mostrando cuatro imágenes en color asociadas a cuatro siluetas negras con etiquetas de letras y números',
        caption: 'Modo Asociación de Sombras — los usuarios asocian imágenes a sus siluetas auto-generadas',
      },
      {
        src: '/samples/spanish/shadow match/Empareja las Sombras 3.webp',
        alt: 'Ficha Completa la Imagen con mitades de imágenes divididas que los usuarios reconectan asociando primeras y segundas mitades',
        caption: 'Modo Completa la Imagen — los usuarios asocian las mitades de imágenes para completar las ilustraciones',
      },
      {
        src: '/samples/spanish/shadow match/Empareja las Sombras 1 answer-key.webp',
        alt: 'Clave de respuesta de asociación de sombras mostrando las imágenes originales con siluetas y etiquetas de correspondencia letra-número correctas',
        caption: 'Clave de respuesta auto-generada — las etiquetas letra-número muestran las correspondencias correctas',
      },
    ],
    youtubeId: 'TYvUXJeMI98',
    videoTitle: 'Cómo Crear Fichas de Asociación de Sombras con Siluetas e Imágenes Divididas — Tutorial Paso a Paso',
  },
};

export default content;
