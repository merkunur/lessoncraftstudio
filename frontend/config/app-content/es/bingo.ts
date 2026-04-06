import type { AppContent } from '../types';

const content: AppContent = {
  seo: {
    primaryKeyword: 'crear tarjetas de bingo',
    secondaryKeywords: [
      'generador de bingo',
      'bingo con imágenes para imprimir',
      'lotería para imprimir',
      'crear bingo personalizado',
    ],
    lsiKeywords: [
      'bingo',
      'lotería',
      'juego de mesa',
      'tarjetas',
      'clase',
      'fiesta',
    ],
    titleTag: 'Crear tarjetas de bingo | Generador bingo con imágenes',
    metaDescription: 'Cree tarjetas de bingo/lotería con 3.000+ imágenes temáticas. Tarjetas únicas por juego, PDF imprimibles. Prueba gratis — licencia comercial.',
  },

  hero: {
    title: 'Crear tarjetas de bingo — Generador de bingo/lotería con imágenes',
    tagline: 'Cree tarjetas de bingo/lotería con 3.000+ imágenes temáticas — tarjetas únicas por juego, PDF imprimibles.',
    description:
      'Genere cartones de bingo con imágenes para vender en Etsy, Amazon KDP o Hotmart. El bingo es un juego universal que se vende para fiestas infantiles, actividades escolares, eventos comunitarios y entretenimiento familiar. Este generador crea múltiples cartones únicos con imágenes temáticas de más de 104 categorías — cada cartón es diferente, como debe ser. Los sets de bingo temáticos son un producto estrella en Etsy para fiestas de cumpleaños y eventos estacionales. Exporte PDFs a 300 DPI y véndalos con la licencia comercial incluida. El formato visual funciona en cualquier idioma. El mercado hispano de juegos imprimibles para fiestas tiene competencia mínima. Pruebe gratis con marca de agua — sin registro.',
  },

  howItWorks: {
    title: 'Cómo crear cartones de bingo paso a paso',
    steps: [
      {
        title: 'Configurar el diseño de página',
        description:
          'Abra el panel Configuración de Página y elija un tamaño de página: Carta Vertical, Carta Horizontal, A4 Vertical, A4 Horizontal, Cuadrado (1200×1200) o cualquier dimensión personalizada. Seleccione un color de fondo con el selector de color. Elija un tema de fondo decorativo y ajuste su opacidad (0 a 1 en pasos de 0,05), luego seleccione un tema de borde con su propio control de opacidad independiente. Estas opciones de diseño enmarcan su tarjeta de bingo antes de configurar el contenido.',
      },
      {
        title: 'Configurar los ajustes de la tarjeta de bingo',
        description:
          'Abra el panel Ajustes de la Tarjeta de Bingo y establezca las filas (3 a 5) y las columnas (3 a 5) para definir el tamaño de su cuadrícula — el valor predeterminado es 4×4 con 16 celdas. Ajuste el número de tarjetas de 1 a 10 para generar por lotes múltiples tarjetas de bingo únicas. Elija el relleno de las celdas (Imagen o Palabra) y el relleno de las fichas (Imagen o Palabra) de forma independiente — mezcla tarjetas con imágenes y fichas con palabras, tarjetas con palabras y fichas con imágenes, o combine ambos. Active la casilla \"Usar selección personalizada\" para elegir manualmente las imágenes específicas para el cantado en lugar de la selección automática.',
      },
      {
        title: 'Seleccionar imágenes de la biblioteca',
        description:
          'Abra el panel Biblioteca de Imágenes y explore 104 colecciones temáticas con más de 3100 ilustraciones coloridas — animales, comida, vehículos, naturaleza, festividades y decenas más. Filtra por tema con el menú desplegable o busque por palabra clave. Haga clic en las imágenes para seleccionarlas para sus tarjetas de bingo. Cuando la selección personalizada de cantado está activada, las imágenes elegidas aparecen en el banco de cantado con un contador en tiempo real que muestra su número de selecciones. También puede subir imágenes personalizadas PNG, JPG o GIF a través del panel Subir Imágenes.',
      },
      {
        title: 'Generar las tarjetas de bingo',
        description:
          'Haga clic en Generar para crear sus tarjetas de bingo. La aplicación llena su cuadrícula configurada con imágenes o palabras del tema seleccionado, luego cree fichas circulares con bordes discontinuos debajo de la tarjeta — las fichas se barajan mediante el algoritmo Fisher-Yates para que nunca coincidan directamente con la disposición de la tarjeta. Si solicitaste múltiples tarjetas, cada una toma una selección aleatoria diferente del banco de imágenes, garantizando que cada tarjeta del lote sea única. La primera tarjeta aparece inmediatamente en el lienzo; todas las tarjetas se incluyen en la exportación ZIP por lotes.',
      },
      {
        title: 'Descargar tarjetas y hoja de cantado',
        description:
          'Alterna entre la pestaña Tarjetas + Fichas y la pestaña Cantado para previsualizar ambas salidas. La hoja de cantado muestra una cuadrícula dinámica de palabras con un tamaño de fuente uniforme y columnas calculadas según la longitud de la palabra más larga. Descargue tarjetas individuales en JPEG o PDF con los botones dedicados, o exporte por lotes todas las tarjetas generadas como archivos JPEG individuales en un solo archivo bingo_cards.zip. Active el modo escala de grises para versiones que ahorran tinta. Cada exportación se renderiza a 300 DPI y está lista para la producción: listados de Etsy, interiores de Amazon KDP y archivos de productos Hotmart.',
      },
    ],
  },

  keyFeatures: {
    title: 'Por qué el bingo es un producto estrella en Etsy',
    features: [
      {
        title: 'Cuadrícula de bingo configurable de 3×3 a 5×5 con controles independientes de filas y columnas',
        description:
          'Establezca las filas y las columnas de forma independiente de 3 a 5, creando cuadrículas de 3×3 (9 celdas) hasta 5×5 (25 celdas). El valor predeterminado es 4×4 (16 celdas), ideal para tarjetas de bingo estándar. Una cuadrícula 3×3 es perfecta para partidas rápidas con menos elementos a seguir, mientras que una cuadrícula 5×5 ofrece la experiencia clásica de bingo con 25 celdas para partidas más largas. El área de la cuadrícula utiliza el 60 % de la altura disponible del lienzo (máximo 500 px) para proporciones óptimas de la tarjeta. Los controles independientes de filas y columnas le permiten crear cuadrículas no cuadradas como 3×5 o 5×3 para formatos de tarjetas de bingo únicos que destacan en los listados de los marketplaces.',
      },
      {
        title: 'Generación por lotes de 1 a 10 tarjetas de bingo únicas por ficha',
        description:
          'Genere de 1 a 10 tarjetas de bingo únicas en un solo lote. Cada tarjeta toma una selección aleatoria diferente del banco de imágenes, garantizando que dos tarjetas del mismo lote nunca tengan la misma disposición. Esto es esencial para el bingo: cada jugador necesita una tarjeta diferente para que el juego funcione. La primera tarjeta se muestra en el lienzo para una vista previa inmediata. Todas las tarjetas generadas están disponibles para la exportación por lotes. Este enfoque por lotes significa que puede producir un conjunto completo de 10 tarjetas de bingo únicas con un solo clic en lugar de generarlas y guardarlas una por una.',
      },
      {
        title: 'Exportación ZIP por lotes de todas las tarjetas generadas como archivos JPEG individuales',
        description:
          'Exporte todas las tarjetas de bingo generadas en una sola descargue bingo_cards.zip. Cada tarjeta se guarda como un archivo JPEG individual de alta resolución dentro del archivo ZIP, nombrado secuencialmente para una organización fácil. Esta exportación por lotes elimina el tedioso proceso de descargar las tarjetas una por una — genere 10 tarjetas únicas, haga clic en un botón y recibe un conjunto completo de tarjetas de bingo listo para empaquetar en su producto del marketplace. La exportación ZIP utiliza JSZip para una compresión fiable en todos los navegadores y funciona junto con los botones estándar de descargue individual en JPEG y PDF.',
      },
      {
        title: 'Doble modo de relleno: Imagen o Palabra para las celdas y las fichas circulares',
        description:
          'Las celdas de la tarjeta y las fichas tienen cada una una selección de modo de relleno independiente — Imagen o Palabra. El relleno de imagen muestra ilustraciones temáticas en las celdas o como patrones de fichas circulares. El relleno de palabras muestra los nombres localizados de las imágenes como texto. Mezcla los modos para variedad creativa: tarjetas con imágenes y fichas con palabras crean un desafío de asociación visual-textual, mientras que tarjetas con palabras y fichas con imágenes invierten la dinámica. Las fichas circulares presentan bordes discontinuos (#666, strokeDashArray [5,5]) y se barajan mediante el algoritmo Fisher-Yates, garantizando que nunca reflejen la disposición de la cuadrícula. Este sistema de doble relleno produce cuatro estilos de tarjetas de bingo distintos a partir de un solo generador.',
      },
      {
        title: 'Hoja de cantado dedicada con cuadrícula dinámica de palabras para el cantador',
        description:
          'Cada conjunto de tarjetas de bingo incluye una hoja de cantado complementaria en una pestaña separada. La hoja de cantado muestra una cuadrícula dinámica de todas las palabras únicas del banco de imágenes — el cantador las lee en voz alta mientras los jugadores marcan sus tarjetas. Las columnas se calculan según la longitud de la palabra más larga (2 a 6 columnas) con un tamaño de fuente uniforme en todas las entradas para una legibilidad clara. La cuadrícula se centra en la página y hereda los bordes y el fondo del lienzo. Active la selección personalizada de cantado para elegir manualmente las imágenes específicas para el banco de cantado, con un contador en tiempo real que muestra el número de elementos seleccionados.',
      },
      {
        title: 'Biblioteca de imágenes con 104 colecciones temáticas y más de 3100 ilustraciones',
        description:
          'Explore 104 colecciones de imágenes temáticas que cubren animales, comida, vehículos, naturaleza, profesiones, festividades, deportes, estaciones y decenas más. Cada tema proporciona un conjunto coordinado de ilustraciones coloridas que funcionan juntas en actividades de bingo — las tarjetas de bingo temáticas están entre los productos imprimibles más populares en Etsy y Hotmart. Filtra por tema con el menú desplegable o busque imágenes específicas por palabra clave. La Licencia Comercial incluya 10 temas en color para empezar; el Acceso Completo desbloquea los 104 temas para la máxima variedad creativa en todos los tamaños de cuadrícula y modos de relleno.',
      },
      {
        title: 'Exportación PDF y JPEG lista para imprimir a 300 DPI con modo escala de grises',
        description:
          'Descargue tarjetas de bingo y hojas de cantado como imágenes JPEG de alta resolución o documentos PDF listos para imprimir renderizados a 300 DPI (multiplicador 6×, calidad JPEG 1.0). Cuatro botones dedicados exportan por separado el JPEG de la Ficha, el JPEG de Cantado, el PDF de la Ficha y el PDF de Cantado. Los tamaños de página incluyen Carta Vertical, Carta Horizontal, A4 Vertical, A4 Horizontal, Cuadrado (1200×1200) y dimensiones completamente personalizadas. La orientación del PDF se detecta automáticamente. Active el modo escala de grises para versiones que ahorran tinta. Cada exportación está lista para la producción: descargue digitales, juegos impresos y materiales para venta en línea.',
      },
      {
        title: 'Edición completa del lienzo con herramientas de texto, alineación y controles de capas',
        description:
          'El lienzo Fabric.js proporciona control total sobre cada elemento de su tarjeta de bingo. Arrastre, redimensiona, rota y reposiciona imágenes, texto y contenido generado libremente. Los controles de capas gestionan el orden de apilamiento — lleva elementos al frente o envíalos al fondo. Bloquea los elementos terminados mientras editas otros. Añada texto personalizado con siete opciones de fuente (Lexend Deca, Baloo 2, Nunito, Quicksand, Fredoka, Arial, Verdana), tamaño y color ajustables, y grosor de contorno de texto de 0 a 10 con granularidad de 0,5. Seis opciones de alineación más centrar en la página mantienen los diseños precisos. Zoom del 50 % al 200 % en incrementos del 10 % para trabajo de detalle. Deshacer y rehacer hasta 20 estados del historial con Ctrl+Z y Ctrl+Y.',
      },
    ],
  },

  businessUseCases: {
    title: 'Vender bingo temático en Etsy, KDP y Hotmart',
    cases: [
      {
        title: 'Packs temáticos de tarjetas de bingo en Etsy',
        description:
          'Cree packs de tarjetas de bingo temáticos utilizando las 104 colecciones de imágenes — bingo de animales, bingo de comida, bingo de vehículos, bingo de festividades y decenas más. Cada tema proporciona suficientes ilustraciones para tarjetas únicas en diferentes tamaños de cuadrícula. Agrupa de 10 a 30 tarjetas de bingo únicas por tema con las hojas de cantado incluidas, y vende a 3–8 $ por pack. Utiliza la generación por lotes para crear 10 tarjetas únicas por conjunto en segundos, luego mezcla tamaños de cuadrícula dentro de un solo pack: tarjetas 3×3 para partidas rápidas, tarjetas 4×4 estándar y tarjetas 5×5 para partidas extendidas. La exportación ZIP por lotes agiliza la producción para vendedores de alto volumen.',
        platform: 'Etsy (etsy.com)',
      },
      {
        title: 'Cuadernos de actividades de bingo en Amazon KDP',
        description:
          'Compila de 40 a 80 tarjetas de bingo en un cuaderno de actividades impreso formateado para Amazon KDP. Estructura su libro por capítulos temáticos: animales, comida, vehículos, festividades y más. Incluya las hojas de cantado después de cada serie de tarjetas para que el libro sea autónomo y listo para jugar. Utiliza el modo escala de grises para interiores que ahorran tinta y mantienen bajos los costos de impresión. Mezcla tamaños de cuadrícula para ofrecer dificultad progresiva — comience con tarjetas 3×3 para partidas rápidas y avanza a 5×5 para partidas más largas. Los cuadernos de actividades de bingo se venden bien todo el año y tienen picos durante las festividades cuando las familias buscan actividades grupales.',
        platform: 'Amazon KDP (kdp.amazon.com)',
      },
      {
        title: 'Actividades de bingo para venta en línea en Hotmart',
        description:
          'Construye sets de bingo listos para jugar con tarjetas únicas para cada jugador y hojas de cantado para el vendedor. Los vendedores que buscan actividades de bingo en Hotmart valoran los productos listos para usar — imprime las tarjetas, repártelas y empiece a jugar inmediatamente. Cree sets alineados con el catálogo de productos: bingo de vocabulario con el modo relleno de palabras, bingo de reconocimiento de imágenes con el modo relleno de imagen, y bingo en modo mixto para paquetes escalonados por nivel. Incluya 10 tarjetas únicas por set (suficiente para un grupo pequeño) con una hoja de cantado. El modo relleno de palabras con los nombres localizados de las imágenes convierte el bingo en una actividad de repaso de vocabulario.',
        platform: 'Hotmart (hotmart.com)',
      },
      {
        title: 'Colecciones de bingo estacionales y de festividades',
        description:
          'Las 104 colecciones de imágenes temáticas cubren cada ocasión estacional y festiva — Navidad, Halloween, Pascua, San Valentín, vuelta al colegio, vacaciones de verano y más. El bingo es un juego naturalmente social que tiene picos durante las festividades cuando las familias y las tiendas buscan actividades grupales. Publique los sets de bingo de Halloween en septiembre, las colecciones de Navidad en octubre y los packs de San Valentín en enero. Cada set estacional incluya múltiples tamaños de cuadrícula, variantes de relleno de imagen y de palabras, y hojas de cantado. Los productos de bingo estacionales obtienen precios premium durante sus ventanas de mayor demanda.',
        platform: 'Etsy / Amazon KDP / Hotmart (estacional)',
      },
      {
        title: 'Tarjetas de bingo para eventos, fiestas y ocasiones especiales',
        description:
          'Cree sets de tarjetas de bingo para fiestas, baby showers, despedidas de soltera, dinámicas de equipo y talleres educativos. Los tamaños de cuadrícula configurables y la biblioteca de imágenes temáticas facilitan la producción de juegos de bingo específicos para cada ocasión — bingo de artículos de bebé para baby showers, bingo de comida para clases de cocina, bingo de animales para excursiones al zoológico. Genere por lotes 10 tarjetas únicas por evento con una hoja de cantado, empaqueta todo como descargue instantánea en PDF, y vende en Etsy donde los organizadores de eventos buscan activamente juegos imprimibles. La selección personalizada de cantado le permite elegir exactamente qué elementos aparecen en el juego.',
        platform: 'Etsy (etsy.com / organizadores de eventos)',
      },
    ],
  },

  faq: [
    {
      question: '¿Qué tamaños de cuadrícula están disponibles para las tarjetas de bingo?',
      answer:
        'Las filas y las columnas son configurables de forma independiente de 3 a 5, creando cuadrículas de 3×3 (9 celdas) hasta 5×5 (25 celdas). El valor predeterminado es 4×4 con 16 celdas. También puede crear cuadrículas no cuadradas como 3×5 (15 celdas) o 5×3 (15 celdas) para formatos de tarjetas de bingo únicos. Las cuadrículas más pequeñas son ideales para partidas rápidas, mientras que las cuadrículas 5×5 ofrecen la experiencia clásica de bingo con más elementos a seguir.',
    },
    {
      question: '¿Cómo funciona la generación por lotes para múltiples tarjetas de bingo?',
      answer:
        'Ajuste el número de tarjetas de 1 a 10 en el panel Ajustes de la Tarjeta de Bingo. Cada tarjeta toma una selección aleatoria diferente del banco de imágenes, garantizando que cada tarjeta del lote sea única — esencial para el bingo donde cada jugador necesita una tarjeta diferente. La primera tarjeta aparece inmediatamente en el lienzo para una vista previa. Todas las tarjetas generadas están disponibles a través de la exportación ZIP por lotes para descargue como archivos JPEG individuales.',
    },
    {
      question: '¿Cómo funciona la exportación ZIP por lotes?',
      answer:
        'Después de generar múltiples tarjetas de bingo, haga clic en el botón de exportación por lotes para descargar todas las tarjetas como archivos JPEG individuales de alta resolución empaquetados en un solo archivo bingo_cards.zip. Cada tarjeta está nombrada secuencialmente dentro del ZIP para una organización fácil. Esto elimina la necesidad de descargar las tarjetas una por una — genere un conjunto completo de 10 tarjetas únicas y expórtalas todas con un solo clic mediante la compresión JSZip.',
    },
    {
      question: '¿Cuál es la diferencia entre el relleno de las celdas y el relleno de las fichas?',
      answer:
        'Las celdas de la tarjeta y las fichas tienen cada una un modo de relleno independiente: Imagen o Palabra. El relleno de las celdas determine qué aparece en cada celda de la cuadrícula de bingo. El relleno de las fichas determine qué aparece en las fichas circulares debajo de la tarjeta que los jugadores usan para la asociación. Puede mezclar los modos — tarjetas con imágenes y fichas con palabras, tarjetas con palabras y fichas con imágenes, o combinar ambos — creando cuatro estilos de tarjetas de bingo distintos a partir de un mismo conjunto de imágenes.',
    },
    {
      question: '¿Qué es la hoja de cantado y cómo funciona?',
      answer:
        'La hoja de cantado es una página separada (accesible a través de la pestaña Cantado) que muestra una cuadrícula dinámica de todos los elementos únicos del banco de imágenes. El cantador lee estas palabras en voz alta mientras los jugadores marcan sus tarjetas de bingo. Las columnas se calculan según la longitud de la palabra más larga (2 a 6 columnas) con un tamaño de fuente uniforme. La cuadrícula se centra en la página y hereda los bordes y el fondo del lienzo. Esto NO es una clave de respuestas — es una hoja de referencia para la persona que dirige el juego de bingo.',
    },
    {
      question: '¿Qué es la selección personalizada de cantado?',
      answer:
        'Active la casilla \"Usar selección personalizada\" en el panel Ajustes de la Tarjeta de Bingo para elegir manualmente qué imágenes específicas aparecen en el banco de cantado. Cuando está activada, haga clic en las imágenes en la Biblioteca de Imágenes para añadirlas a su selección personalizada — un contador en tiempo real muestra \"Seleccionados para cantado personalizado: X\" a medida que elija. Esto le da un control preciso sobre qué elementos aparecen en el juego de bingo, útil para actividades alineadas con el catálogo de productos o eventos temáticos que requieren vocabulario específico.',
    },
    {
      question: '¿Es el Generador de Tarjetas de Bingo con Imágenes sensible al idioma?',
      answer:
        'Sí. En modo relleno de palabras para las celdas o las fichas, las palabras mostradas son los nombres localizados de las imágenes de la Biblioteca de Imágenes. Cambiar el idioma en los Ajustes de la Ficha modifica las palabras en las tarjetas, las fichas y la hoja de cantado. Por ejemplo, una imagen de gato muestra \"Gato\" en español pero \"Katze\" en alemán y \"Cat\" en inglés. La Licencia Comercial incluya 10 temas en color con inglés únicamente; el Acceso Completo desbloquea los 104 temas y los 11 idiomas para contenido textual localizado.',
    },
    {
      question: '¿Por qué no hay clave de respuestas para las tarjetas de bingo?',
      answer:
        'Las tarjetas de bingo utilizan una hoja de cantado en lugar de una clave de respuestas. En el bingo, el cantador lee los elementos de la hoja de cantado mientras los jugadores marcan los elementos correspondientes en sus tarjetas únicas — no hay una única \"respuesta correcta\" ya que la tarjeta de cada jugador tiene elementos diferentes en posiciones diferentes. La hoja de cantado sirve como documento de referencia del juego, listando todos los elementos posibles que el cantador puede anunciar durante la partida.',
    },
    {
      question: '¿Hay una prueba gratis?',
      answer:
        'Sí. Puede acceder a todas las funciones — todos los tamaños de cuadrícula, la generación por lotes de hasta 10 tarjetas, la exportación ZIP por lotes, los modos de relleno de imagen y de palabras, la hoja de cantado, la biblioteca de imágenes completa, la selección personalizada de cantado, los temas de fondo y de borde, las herramientas de texto y todos los formatos de descargue — sin crear una cuenta, ingresar una tarjeta de crédito ni instalar ningún software. Las descargas de la prueba gratis incluyen una pequeña marca de agua. Una licencia comercial elimina la marca de agua y otorga derechos completos de venta.',
    },
    {
      question: '¿Se pueden añadir temas de fondo y de borde a las tarjetas de bingo?',
      answer:
        'Sí. El panel Configuración de Página incluye un selector de tema de fondo con un control deslizante de opacidad (0 a 1 en pasos de 0,05) y un selector de tema de borde con su propio control deslizante de opacidad independiente. Los temas de fondo añaden patrones decorativos detrás de la cuadrícula de bingo, mientras que los temas de borde enmarcan la página. La hoja de cantado hereda los bordes y el fondo del lienzo principal. Ambos tienen controles de opacidad separados para crear fondos sutiles con bordes prominentes, o cualquier combinación que se adapte a su diseño.',
    },
    {
      question: '¿Puedo vender tarjetas de bingo creadas con esta herramienta en Etsy y Amazon KDP?',
      answer:
        'Sí. Con una licencia comercial, tiene todos los derechos para vender sus tarjetas de bingo como descargue digitales en Etsy, como cuadernos de actividades impresos en Amazon KDP, como recursos educativos en Hotmart o a través de cualquier otro canal de venta. Los tamaños de cuadrícula configurables, la generación por lotes, la exportación ZIP, los dobles modos de relleno, las hojas de cantado y las 104 colecciones de imágenes temáticas le dan las herramientas creativas para producir productos de bingo originales y vendibles a gran escala.',
    },
    {
      question: '¿Cuál es la política de reembolso?',
      answer:
        'La prueba gratis le da acceso a todas las funciones, por lo que no ofrecemos reembolsos en las compre de licencia comercial. Puede probar todos los tamaños de cuadrícula, la generación por lotes, la exportación ZIP, los modos de relleno de imagen y de palabras, la hoja de cantado, la biblioteca de imágenes completa, la selección personalizada de cantado, los temas de fondo y de borde, las herramientas de texto y todos los formatos de descargue antes de comprar. La prueba gratis es la política de reembolso — asegúrese de que la herramienta satisface sus necesidades antes de adquirir una licencia.',
    },
  ],

  internalLinks: [
    {
      pageType: 'app',
      slug: 'relacionar-fichas',
      anchorText: 'Generador de Fichas de Relacionar',
    },
    {
      pageType: 'app',
      slug: 'rompecabezas-cuadricula-fichas',
      anchorText: 'Generador de Puzzles de Cuadrícula',
    },
    {
      pageType: 'app',
      slug: 'asociacion-sombras-fichas',
      anchorText: 'Generador de Fichas de Asociación de Sombras',
    },
    {
      pageType: 'app',
      slug: 'clasificar-imagenes-fichas',
      anchorText: 'Generador de Fichas de Clasificar Imágenes',
    },
    {
      pageType: 'app',
      slug: 'buscar-objetos-fichas',
      anchorText: 'Generador de Fichas de Buscar Objetos',
    },
    {
      pageType: 'app',
      slug: 'sopa-letras-fichas',
      anchorText: 'Generador de Sopa de Letras',
    },
    {
      pageType: 'bundle',
      slug: 'paquete-asociacion-clasificacion',
      anchorText: 'Paquete Asociación y Clasificación — Todas las Apps de Asociación en Uno',
    },
    {
      pageType: 'guide',
      slug: 'crear-tarjetas-bingo',
      anchorText: 'Cómo Crear y Vender Tarjetas de Bingo en Línea',
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
      primary: '/samples/spanish/bingo/Bingo de Imágenes 1.webp',
      primaryAlt: 'Tarjeta de bingo con imágenes temáticas en una cuadrícula y fichas circulares con bordes discontinuos debajo',
    },
    sampleGallery: [
      {
        src: '/samples/spanish/bingo/Bingo de Imágenes 2.webp',
        alt: 'Tarjeta de bingo con relleno de imagen mostrando ilustraciones temáticas coloridas en las celdas y fichas circulares con imágenes',
        caption: 'Modo relleno de imagen — ilustraciones coloridas en las celdas y las fichas circulares',
      },
      {
        src: '/samples/spanish/bingo/Bingo de Imágenes 3.webp',
        alt: 'Tarjeta de bingo con relleno de palabras mostrando nombres localizados de imágenes en las celdas y fichas con palabras',
        caption: 'Modo relleno de palabras — nombres localizados de imágenes para bingo basado en vocabulario',
      },
      {
        src: '/samples/spanish/bingo/Bingo de Imágenes 1 callout.webp',
        alt: 'Hoja de cantado de bingo con cuadrícula dinámica de palabras mostrando todos los elementos del juego para el cantador',
        caption: 'Hoja de cantado — cuadrícula dinámica de palabras para la persona que dirige el juego de bingo',
      },
    ],
    youtubeId: 'd6AOiDXoK1c',
    videoTitle: 'Cómo Crear Tarjetas de Bingo con Imágenes con Generación por Lotes y Hojas de Cantado — Tutorial Paso a Paso',
  },
};

export default content;
