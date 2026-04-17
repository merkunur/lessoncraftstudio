import type { AppContent } from '../types';

const content: AppContent = {
  seo: {
    primaryKeyword: 'generador de crucigramas',
    secondaryKeywords: [
      'crear crucigrama',
      'crucigrama para imprimir',
      'crucigrama con imágenes',
      'crear crucigrama personalizado',
    ],
    lsiKeywords: [
      'pistas',
      'grilla',
      'horizontal',
      'vertical',
      'definiciones',
      'solución',
    ],
    titleTag: 'Generador de crucigramas | LessonCraftStudio',
    metaDescription: 'Cree crucigramas con pistas de imágenes en una grilla 15×15. 4 modos de entrada, 104 temas, soluciones automáticas. Prueba gratis — licencia comercial.',
  },

  hero: {
    title: 'Generador de crucigramas — Crea imprimibles para vender en Etsy y KDP',
    tagline: 'Cree crucigramas con pistas de imágenes en grilla 15×15 — 104 temas, soluciones automáticas.',
    description:
      'Genere crucigramas con imágenes como pistas para vender en Etsy, Amazon KDP o Hotmart. En lugar de definiciones escritas, los usuarios ven imágenes temáticas y escriben las palabras correspondientes — un formato innovador que funciona para todas las edades y se vende mejor que los crucigramas tradicionales. Soporte para 11 idiomas permite crear productos para el mercado hispano, europeo y global simultáneamente. Seleccione entre más de 3.000 ilustraciones en 104 temas. Los crucigramas son un clásico perenne con demanda constante en Amazon KDP y Etsy. Exporte PDFs a 300 DPI con solucionario automático y véndalos con licencia comercial. Pruebe gratis con marca de agua — sin registro.',
  },

  ctaHeading: 'Crear crucigramas',

  howItWorks: {
    title: 'Cómo crear crucigramas profesionales paso a paso',
    steps: [
      {
        title: 'Configure el Diseño de Página',
        description:
          'Abra el panel de Página y elija un tamaño: Carta Vertical, Carta Horizontal, A4 Vertical, A4 Horizontal o cualquier dimensión personalizada. Seleccione un color de fondo con el selector de color, luego elija un tema de fondo y ajuste su opacidad. Escoge un tema de borde con su propio control de opacidad independiente. Estas opciones de diseño enmarcan su crucigrama antes de configurar cualquier contenido.',
      },
      {
        title: 'Elija Tu Método de Entrada',
        description:
          'Decide cómo proporcionar las 8 palabras para su crucigrama. La Generación Rápida por Tema (predeterminada) seleccione automáticamente 8 imágenes aleatorias del tema elegido y genere al instante. La Edición Manual de Nombres de Imagen le permite hacer clic en las imágenes y renombrarlas antes de generar. La Lista Personalizada de Palabras con Pistas habilita un área de texto donde introduces pares PALABRA: pista para crucigramas tradicionales con pistas de texto. Subir Imágenes Personalizadas le permite añadir sus propios archivos de imagen junto a la biblioteca.',
      },
      {
        title: 'Seleccione o Configure Tus 8 Imágenes o Palabras',
        description:
          'Para generación basada en temas, explore 104 colecciones temáticas con más de 3.100 ilustraciones coloridas — animales, comida, vehículos, naturaleza, festividades y docenas más. Filtra por tema usando el menú desplegable o busque por palabra clave. Para edición manual, haga clic en imágenes individuales y edita sus nombres. Para listas de palabras personalizadas, escriba 8 o más entradas PALABRA: pista. Para subidas, añada archivos JPEG, PNG, GIF o WebP. El generador requiere un mínimo de 8 elementos para construir el crucigrama.',
      },
      {
        title: 'Genere el Crucigrama con Imágenes',
        description:
          'Haga clic en Generar para crear el crucigrama en una cuadrícula fija de 15×15. El algoritmo extrae las palabras de los nombres de las imágenes, elimina espacios, convierte a mayúsculas, baraja y ordena por longitud (la más larga primero), y luego coloque las palabras en la cuadrícula para un cruce óptimo. Las posiciones de pista numeradas marcan el inicio de cada palabra. Las pistas con imágenes aparecen junto a la cuadrícula con sus números correspondientes. Un encabezado estilizado \"Crucigrama Ilustrado\" aparece en la parte superior con fondo azul (#5B9BD5), pastilla blanca, y título y descripción localizados en fuentes Fredoka y Quicksand.',
      },
      {
        title: 'Genere la Clave de Respuestas y Descargue',
        description:
          'Cambie a la pestaña de Clave de Respuestas para ver la cuadrícula completada con todas las respuestas del crucigrama visibles. Descargue ambas versiones usando los cuatro botones dedicados en el menú desplegable: JPEG de Ficha, JPEG de Clave de Respuestas, PDF de Ficha y PDF de Clave de Respuestas. Los archivos se exportan a 300 DPI para calidad lista para imprimir. Active la escala de grises para versiones que ahorran tinta. Cada exportación está lista para producción en listados de Etsy, interiores de Amazon KDP y archivos de productos Hotmart.',
      },
    ],
  },

  keyFeatures: {
    title: 'Por qué los crucigramas con imágenes se venden mejor',
    features: [
      {
        title: 'Crucigramas con Pistas Visuales en una Cuadrícula Fija de 15×15',
        description:
          'Genere crucigramas donde imágenes coloridas sustituyen las pistas de texto tradicionales. Ocho imágenes proporcionan ocho palabras que el algoritmo coloque en una cuadrícula fija de 15×15 — las celdas negras forman el fondo con contornos de color marcando las celdas de respuesta. El algoritmo de colocación extrae las palabras de los nombres de las imágenes, las ordena por longitud (la más larga primero) para una cobertura óptima de la cuadrícula, y posiciona las palabras con letras que se cruzan. Las posiciones de pista numeradas al inicio de cada palabra conectan las pistas con imágenes con sus ubicaciones en la cuadrícula. Este formato de pistas visuales cree una experiencia de crucigrama única que funciona para el aprendizaje de vocabulario en todas las edades.',
      },
      {
        title: 'Cuatro Métodos de Entrada: Selección Automática, Edición Manual, Lista de Palabras y Subida de Imágenes',
        description:
          'Un solo generador soporta cuatro formas distintas de proporcionar contenido para el crucigrama. La Generación Rápida por Tema seleccione 8 imágenes aleatorias de cualquier tema y genere al instante — el camino más rápido a un puzzle terminado. La Edición Manual de Nombres de Imagen le permite hacer clic en imágenes individuales para seleccionarlas y editar cada nombre antes de generar, dando control preciso sobre las palabras que aparecen en la cuadrícula. La Lista Personalizada de Palabras con Pistas cambie al modo de crucigrama tradicional: introduzca pares PALABRA: pista en un área de texto para pistas basadas en texto en lugar de imágenes. Subir Imágenes Personalizadas le permite añadir sus propios archivos JPEG, PNG, GIF o WebP junto a las imágenes de la biblioteca. Cada método produce un crucigrama completo desde el mismo motor de cuadrícula 15×15.',
      },
      {
        title: 'Clave de Respuestas Autogenerada con Cuadrícula de Crucigrama Completada',
        description:
          'Cada crucigrama con imágenes genere automáticamente una clave de respuestas complementaria en una pestaña de lienzo separada. La clave de respuestas reproduce el diseño exacto del puzzle y rellena la cuadrícula con todas las respuestas correctas visibles en las celdas. Sin creación manual de respuestas, sin archivo separado — la clave de respuestas se mantiene perfectamente sincronizada con el puzzle. Este enfoque de doble lienzo ahorra un tiempo de producción significativo para vendedores que crean paquetes de crucigramas donde cada puzzle necesita su propia clave. Descargue la clave como crossword_answer_key.jpeg o image-crossword-answer-key.pdf junto al puzzle del usuario.',
      },
      {
        title: 'Palabras del Puzzle Localizadas en 11 Idiomas vía Vocabulario de Imágenes',
        description:
          'El Generador de Crucigramas con Imágenes es sensible al idioma: las palabras del puzzle provienen de nombres de imagen localizados cargados a través del sistema de Vocabulario de Imágenes. Cambiar el idioma del contenido cambie las palabras reales colocadas en la cuadrícula del crucigrama. Por ejemplo, una imagen de gato genere \"CAT\" en inglés pero \"KATZE\" en alemán y \"CHAT\" en francés — produciendo crucigramas completamente diferentes con las mismas imágenes. Los 11 idiomas están soportados: inglés, alemán, francés, español, portugués, italiano, neerlandés, sueco, danés, noruego y finlandés. El nivel Comercial incluya contenido en inglés; el Acceso Completo desbloquea los 11 idiomas para palabras de puzzle localizadas.',
      },
      {
        title: 'Lista Personalizada de Palabras con Pistas de Texto para Crucigramas Tradicionales',
        description:
          'Active la casilla Lista Personalizada de Palabras con Pistas para cambiar de crucigramas con imágenes a crucigramas tradicionales con pistas de texto. Introduzca sus palabras y pistas en formato PALABRA: texto de pista, una por línea, con un mínimo de 8 entradas. El mismo algoritmo de cuadrícula 15×15 coloque sus palabras personalizadas con cruce óptimo, y las pistas de texto aparecen junto a la cuadrícula en lugar de las pistas con imágenes. Este modo le permite crear crucigramas de vocabulario, de ortografía o de cualquier tema específico con contenido definido por el vendedor — sin necesidad de biblioteca de imágenes.',
      },
      {
        title: 'Edición Manual de Nombres de Imagen Antes de Generar el Puzzle',
        description:
          'Active la casilla de Edición Manual de Nombres de Imagen para tomar control total sobre las palabras que aparecen en su cuadrícula de crucigrama. Haga clic en imágenes individuales de la biblioteca para seleccionarlas, luego edita el nombre de cada imagen en la interfaz de edición. Los nombres editados se convierten en las palabras del crucigrama — renombra \"Mariposa\" a \"Monarca\" o simplifica \"Camión de Bomberos\" a \"Camión\" para puzzles más sencillos. Esta función conecta la generación automática por tema con las listas de palabras totalmente manuales, ofreciéndote pistas basadas en imágenes con control preciso del vocabulario.',
      },
      {
        title: 'Exportación PDF y JPEG Lista para Imprimir a 300 DPI con Escala de Grises',
        description:
          'Descargue crucigramas y claves de respuestas como imágenes JPEG de alta resolución o documentos PDF listos para imprimir renderizados a 300 DPI (multiplicador 6×). Cuatro botones de descargue dedicados en el menú desplegable exportan crossword_worksheet.jpeg, crossword_answer_key.jpeg, image-crossword-worksheet.pdf e image-crossword-answer-key.pdf por separado. Los tamaños de página incluyen Carta Vertical, Carta Horizontal, A4 Vertical, A4 Horizontal y dimensiones totalmente personalizadas. Active la escala de grises para versiones que ahorran tinta y tóner. Cada exportación está lista para descargue digitales, cuadernos impresos y material para venta en línea.',
      },
    ],
  },

  businessUseCases: {
    title: 'Vender crucigramas en Etsy, KDP y Hotmart',
    cases: [
      {
        title: 'Paquetes Temáticos de Crucigramas con Imágenes en Etsy',
        description:
          'Cree paquetes temáticos de crucigramas usando las 104 colecciones de imágenes — crucigramas de animales, comida, vehículos, festividades y docenas más. Cada tema proporciona suficientes ilustraciones para múltiples puzzles únicos ya que el generador seleccione aleatoriamente 8 imágenes por puzzle. Empaqueta 10–20 crucigramas con imágenes por tema con claves de respuestas incluidas, y vende a $3–$7 por paquete. El formato de pistas visuales hace que estos crucigramas sean visualmente atractivos en las miniaturas de listados de Etsy, generando mayores tasas de clic que los productos de crucigramas solo con texto.',
        platform: 'Etsy (etsy.com)',
      },
      {
        title: 'Cuadernos de Actividades de Crucigramas Ilustrados en Amazon KDP',
        description:
          'Compila 40–80 crucigramas con imágenes en un cuaderno impreso formateado para Amazon KDP. Organiza capítulos por tema — animales, comida, naturaleza, festividades — con dificultad de vocabulario progresiva entre secciones. Incluya claves de respuestas al final del libro usando la función de clave autogenerada. La escala de grises produce páginas listas para interiores de libro en blanco y negro. Los crucigramas con imágenes llenan un nicho único en el mercado de cuadernos de actividades: combinan el atractivo visual de los puzzles con imágenes con el desafío de resolución de palabras de los crucigramas tradicionales.',
        platform: 'Amazon KDP (kdp.amazon.com)',
      },
      {
        title: 'Crucigramas Multilingües Usando Generación Sensible al Idioma',
        description:
          'Aprovecha la generación de palabras sensible al idioma para crear crucigramas con imágenes en 11 idiomas. Las mismas imágenes producen cuadrículas de crucigrama completamente diferentes al cambiar de idioma — una imagen de gato cree \"CAT\" en inglés, \"KATZE\" en alemán y \"GATTO\" en italiano. Cree paquetes de crucigramas multilingües donde cada versión de idioma use las mismas imágenes temáticas pero produce puzzles únicos con palabras localizadas. Esto es valioso para vendedores de ESL/EFL, tiendas bilingües y familias de trabajo desde casa internacionales. Vende paquetes por idioma o mega-paquetes multilingües a precios premium.',
        platform: 'Etsy / Hotmart (mercado multilingüe)',
      },
      {
        title: 'Crucigramas de Vocabulario Personalizado para Hotmart',
        description:
          'Use el modo Lista Personalizada de Palabras con Pistas para crear crucigramas alineados con el catálogo de productos con vocabulario definido por el vendedor. Introduzca términos y definiciones específicos por materia en formato PALABRA: pista — vocabulario de ciencias, términos de estudios sociales, palabras de comprensión lectora o listas de ortografía. Los vendedores que buscan actividades de crucigrama en Hotmart valoran puzzles que coincidan con su catálogo de productos exacto. Cree conjuntos de crucigramas de vocabulario por nivel con claves de respuestas en formatos PDF y JPEG. El modo de pistas de texto le permite crear crucigramas para cualquier materia sin depender de la biblioteca de imágenes.',
        platform: 'Hotmart (hotmart.com)',
      },
      {
        title: 'Colecciones de Crucigramas con Imágenes de Temporada',
        description:
          'Las 104 colecciones temáticas de imágenes cubren cada ocasión estacional y festiva — Navidad, Halloween, Pascua, San Valentín, vuelta al cole, vacaciones de verano y más. Cree colecciones de crucigramas con imágenes de disponible ahora alineadas con los períodos de mayor venta. Lanza paquetes de crucigramas de Halloween en septiembre, colecciones de Navidad en octubre y paquetes de San Valentín en enero. La naturaleza visual de los crucigramas con imágenes hace que los temas estacionales sean particularmente atractivos — imágenes festivas como pistas crean un atractivo estacional inmediato. Los productos estacionales tienen precios más altos durante sus períodos pico y generan compre recurrentes.',
        platform: 'Etsy / Amazon KDP / Hotmart (estacional)',
      },
    ],
  },

  faq: [
    {
      question: '¿Qué es un crucigrama con imágenes y en qué se diferencia de un crucigrama tradicional?',
      answer:
        'Un crucigrama con imágenes sustituye las pistas de texto tradicionales por pistas con imágenes. En lugar de leer una definición escrita y rellenar la respuesta, los solucionadores miran una imagen colorida y escriben la palabra que representa en la cuadrícula del crucigrama. El generador coloque 8 palabras derivadas de imágenes en una cuadrícula fija de 15×15 con posiciones numeradas que vinculan cada imagen a su celda de inicio. Este formato hace que los crucigramas sean accesibles para solucionadores más jóvenes y usuarios de idiomas, manteniendo el desafío de colocación de palabras de los crucigramas tradicionales.',
    },
    {
      question: '¿Por qué la cuadrícula es fija en 15×15 celdas?',
      answer:
        'La cuadrícula de 15×15 proporciona suficiente espacio para 8 palabras cruzadas de distintas longitudes mientras mantiene proporciones visuales limpias en tamaños de página Carta y A4. El tamaño está optimizado para el algoritmo de colocación — cuadrículas más grandes dejarían demasiado espacio vacío con 8 palabras, mientras que cuadrículas más pequeñas impedirían que las palabras más largas encajaran. El tamaño fijo asegura crucigramas consistentes y de aspecto profesional en todos los temas e idiomas.',
    },
    {
      question: '¿Cómo funciona el algoritmo de generación del puzzle?',
      answer:
        'El algoritmo extrae las palabras de los 8 nombres de imagen seleccionados, elimina espacios y convierte a mayúsculas. Luego baraja las palabras y las ordena por longitud (la más larga primero) para maximizar la cobertura de la cuadrícula. Las palabras se colocan secuencialmente en la cuadrícula de 15×15, intentando cruzarse con las palabras ya colocadas en letras compartidas. Solo las palabras que encajan con éxito aparecen en el puzzle final. Las posiciones numeradas marcan el inicio de cada palabra, y las pistas con imágenes correspondientes se muestran junto a la cuadrícula con números coincidentes.',
    },
    {
      question: '¿Cuáles son los cuatro métodos de entrada?',
      answer:
        'La Generación Rápida por Tema (predeterminada) seleccione automáticamente 8 imágenes aleatorias del tema elegido y genere al instante. La Edición Manual de Nombres de Imagen le permite hacer clic en imágenes individuales y renombrarlas antes de generar — útil para controlar el vocabulario exacto. La Lista Personalizada de Palabras con Pistas habilita un área de texto donde introduces pares PALABRA: pista para crucigramas tradicionales con pistas de texto sin imágenes. Subir Imágenes Personalizadas le permite añadir sus propios archivos JPEG, PNG, GIF o WebP junto a las imágenes de la biblioteca. Cada método alimenta el mismo algoritmo de colocación en cuadrícula 15×15.',
    },
    {
      question: '¿Cómo funciona el modo Lista Personalizada de Palabras con Pistas?',
      answer:
        'Active la casilla Lista Personalizada de Palabras con Pistas para cambiar de crucigramas con imágenes a crucigramas tradicionales con pistas de texto. Introduzca sus palabras y pistas en formato PALABRA: texto de pista, una por línea. Necesita un mínimo de 8 entradas. El algoritmo coloque sus palabras personalizadas en la cuadrícula de 15×15 usando la misma lógica de colocación, y las pistas de texto aparecen junto a la cuadrícula en lugar de las pistas con imágenes. Este modo es ideal para crucigramas de vocabulario específico por materia, práctica de ortografía o cualquier crucigrama donde quieras definir su propio contenido.',
    },
    {
      question: '¿Cómo funciona la Edición Manual de Nombres de Imagen?',
      answer:
        'Active la casilla de Edición Manual de Nombres de Imagen para tomar control de las palabras usadas en su crucigrama. Haga clic en imágenes individuales de la biblioteca para seleccionarlas, luego use la interfaz de edición para cambiar el nombre de cada imagen. Los nombres editados se convierten en las palabras del crucigrama que aparecen en la cuadrícula. Esto le permite simplificar nombres compuestos, corregir vocabulario para su público objetivo o personalizar palabras manteniendo las pistas visuales con imágenes. Necesita un mínimo de 8 imágenes seleccionadas antes de generar.',
    },
    {
      question: '¿Es el Generador de Crucigramas con Imágenes sensible al idioma?',
      answer:
        'Sí. Las palabras del puzzle provienen de nombres de imagen localizados cargados a través del sistema de Vocabulario de Imágenes. Cambiar el idioma del contenido cambie las palabras reales colocadas en la cuadrícula del crucigrama. Una imagen de gato genere \"CAT\" en inglés pero \"KATZE\" en alemán, \"CHAT\" en francés y \"GATTO\" en italiano — creando crucigramas completamente diferentes con selecciones de imágenes idénticas. El encabezado localizado \"Crucigrama Ilustrado\" también cambie con el idioma seleccionado. El nivel Comercial incluya contenido en inglés; el Acceso Completo desbloquea los 11 idiomas.',
    },
    {
      question: '¿Cómo funciona el encabezado autogenerado?',
      answer:
        'Cada crucigrama generado incluye un encabezado responsivo con fondo azul (#5B9BD5), pastilla blanca, y título y descripción localizados. El modo vertical muestra un encabezado de ancho completo (220 px de altura); el modo horizontal use un diseño centrado compacto (145 px de altura). El título \"Crucigrama Ilustrado\" se renderiza en fuente Fredoka con tamaño dinámico (48 px para títulos cortos hasta 28 px para traducciones más largas), y la descripción \"¡Mire las imágenes y completa las palabras!\" se renderiza en Quicksand. Ambos elementos de texto se traducen automáticamente a los 11 idiomas soportados. Un borde azul brillante (#4A90E2, 8 px de trazo, esquinas redondeadas de 12 px) enmarca el encabezado.',
    },
    {
      question: '¿Hay una prueba gratis?',
      answer:
        'Sí. Puede acceder a todas las funciones — los cuatro métodos de entrada, el generador de cuadrícula 15×15, la clave de respuestas autogenerada, la biblioteca completa de imágenes, temas de fondo y borde, todos los formatos de descargue y la escala de grises — sin crear una cuenta, introducir una tarjeta de crédito ni instalar ningún software. Las descargas de prueba gratis incluyen una pequeña marca de agua. Una licencia comercial elimina la marca de agua y otorga derechos completos de venta.',
    },
    {
      question: '¿Cómo funciona la clave de respuestas autogenerada?',
      answer:
        'El generador usa un sistema de doble lienzo con una pestaña de Ficha (el puzzle) y una pestaña de Clave de Respuestas (la cuadrícula completada). La ficha muestra la cuadrícula de crucigrama vacía con posiciones numeradas y pistas con imágenes o texto — lista para que los solucionadores la completen. La clave de respuestas reproduce el diseño idéntico y rellena cada celda con las letras correctas. Ambas versiones se exportan por separado usando cuatro botones de descargue dedicados: crossword_worksheet.jpeg, crossword_answer_key.jpeg, image-crossword-worksheet.pdf e image-crossword-answer-key.pdf.',
    },
    {
      question: '¿Cuál es la política de reembolso?',
      answer:
        'Dado que la prueba gratis le da acceso a todas las funciones, no ofrecemos reembolsos en compre de licencias comerciales. Puede probar los cuatro métodos de entrada, el generador de cuadrícula 15×15, la clave de respuestas autogenerada, la biblioteca completa de imágenes, temas de fondo y borde, y todos los formatos de descargue antes de comprar. La prueba gratis es la política de reembolso — asegúrese de que la herramienta se ajusta a sus necesidades antes de adquirir una licencia.',
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
      slug: 'buscar-objetos-fichas',
      anchorText: 'Generador de Fichas de Buscar Objetos',
    },
    {
      pageType: 'app',
      slug: 'busqueda-tesoro-fichas',
      anchorText: 'Generador de Fichas de Búsqueda del Tesoro',
    },
    {
      pageType: 'app',
      slug: 'sopa-letras-fichas',
      anchorText: 'Generador de Fichas de Sopa de Letras',
    },
    {
      pageType: 'app',
      slug: 'letras-revueltas-fichas',
      anchorText: 'Generador de Fichas de Letras Revueltas',
    },
    {
      pageType: 'app',
      slug: 'adivinar-palabras-fichas',
      anchorText: 'Generador de Fichas de Adivinar Palabras',
    },
    {
      pageType: 'app',
      slug: 'criptogramas-imagenes-fichas',
      anchorText: 'Generador de Fichas de Criptogramas',
    },
    {
      pageType: 'bundle',
      slug: 'paquete-busca-encuentra',
      anchorText: 'Paquete Busque y Encuentra — Todas las Apps de Búsqueda en Un Solo Paquete',
    },
    {
      pageType: 'idea',
      slug: 'primer-grado-ideas-imprimibles',
      anchorText: 'Ideas de imprimibles para primer grado',
    },
    {
      pageType: 'idea',
      slug: 'segundo-grado-ideas-imprimibles',
      anchorText: 'Ideas de imprimibles para segundo grado',
    },
    {
      pageType: 'start',
      slug: 'libros-actividades-amazon-kdp',
      anchorText: 'Publicar libros de actividades en Amazon KDP',
    },
    {
      pageType: 'guide',
      slug: 'crear-crucigramas',
      anchorText: 'Crear crucigramas que se vendan',
    },
    {
      pageType: 'tool',
      slug: 'crossword-worksheet-maker',
      anchorText: 'Looking for the free browser version? Try the free maker tool.',
    },
    {
      pageType: 'tool',
      slug: 'kdp-royalty-calculator',
      anchorText: 'Calculate KDP royalties for your activity books',
    },
    {
      pageType: 'tool',
      slug: 'kdp-size-calculator',
      anchorText: 'Pick the right KDP book size & margins',
    },
  ],

  visuals: {
    heroImages: {
      primary: '/samples/spanish/crossword/crucigrama-con-dibujos-1.webp',
      primaryAlt: 'Crucigrama con imágenes con pistas visuales en una cuadrícula de 15 por 15 con encabezado localizado Crucigrama Ilustrado y posiciones de pista numeradas',
    },
    sampleGallery: [
      {
        src: '/samples/spanish/crossword/crucigrama-con-dibujos-1.webp',
        alt: 'Crucigrama con imágenes con pistas visuales temáticas junto a una cuadrícula de crucigrama de 15 por 15',
        caption: 'Crucigrama con imágenes — las pistas visuales sustituyen las pistas de texto tradicionales en una cuadrícula de 15×15',
      },
      {
        src: '/samples/spanish/crossword/crucigrama-con-dibujos-3.webp',
        alt: 'Crucigrama con lista de palabras personalizadas con pistas de texto y cuadrícula de crucigrama completada',
        caption: 'Modo Lista de Palabras Personalizadas — crucigramas tradicionales con pistas de texto y su propio vocabulario',
      },
      {
        src: '/samples/spanish/crossword/crucigrama-con-dibujos-1-answer-key.webp',
        alt: 'Clave de respuestas del crucigrama con todas las letras correctas rellenadas en la cuadrícula',
        caption: 'Clave de respuestas autogenerada — la cuadrícula completada muestra todas las respuestas correctas',
      },
    ],
    youtubeId: 'b3WKDrzif-w',
    videoTitle: 'Cómo Crear Crucigramas con Imágenes con Pistas Visuales y Claves de Respuestas Automáticas — Tutorial Paso a Paso',
  },
};

export default content;
