import type { ToolContent } from '../types';

const content: ToolContent = {
  seo: {
    primaryKeyword: 'generador discriminación visual',
    secondaryKeywords: [
      'creador de fichas de asociación de sombras para vendedores',
      'crear fichas de siluetas para vender uso comercial',
      'generador de fichas de sombras imprimibles para KDP y Etsy',
      'herramienta de asociación de sombras con clave de respuestas automática',
    ],
    lsiKeywords: [
      'generador de fichas de siluetas y división de imagen doble modo',
      'creador de siluetas a nivel de píxel con algoritmo de derangement',
      'clave de respuestas automática generador de fichas de sombras',
    ],
    titleTag: 'Generador Discriminación Visual | para Vender',
    metaDescription: 'Crea fichas de asociación de sombras con siluetas a nivel de píxel y modo Completa la Imagen, claves de respuestas automáticas y 104 temas. Prueba con marca.',
  },

  hero: {
    title: 'Generador de Discriminación Visual',
    tagline: 'Generador de fichas de asociación de sombras con doble modo: creación de siluetas a nivel de píxel y Completa la Imagen con división horizontal y vertical, algoritmo de derangement Fisher-Yates que garantiza cero coincidencias triviales, claves de respuestas autogeneradas con etiquetas letra-número, identificadores A/B/C/D y 1/2/3/4 activables/desactivables y 104 colecciones temáticas de imágenes para fichas de discriminación visual que se venden en todo el mundo',
    description: 'Crea fichas profesionales de asociación de sombras con dos modos de ejercicio distintos en un solo generador. El modo Asociación de Sombras coloca 4 imágenes a color etiquetadas A, B, C, D en la fila superior y 4 siluetas negras autogeneradas etiquetadas 1, 2, 3, 4 en la fila inferior — las siluetas se crean mediante procesamiento de imagen a nivel de píxel que convierte cada píxel con alfa > 10 a negro puro (R=0, G=0, B=0, A=255), produciendo contornos precisos que preservan el perfil de transparencia exacto de cada imagen. Esto es procesamiento real de píxeles, no filtros CSS ni recursos de sombra prefabricados. El modo Completa la Imagen divide 4 imágenes en mitades — elige la dirección de corte horizontal (mitades superior/inferior) o la dirección de corte vertical (mitades izquierda/derecha) — etiqueta las primeras mitades A–D y las segundas mitades 1–4, y los alumnos reconectan las piezas para completar cada imagen. Ambos modos usan un algoritmo de derangement Fisher-Yates que garantiza que ningún elemento aparezca en su posición original, eliminando coincidencias triviales y asegurando que cada ficha presente un desafío genuino de asociación. El derangement se recalcula en cada generación, produciendo disposiciones diferentes del mismo conjunto de imágenes. Activa o desactiva las etiquetas de los identificadores A/B/C/D y 1/2/3/4 — etiquetas activadas proporcionan andamiaje letra-número para alumnos más pequeños, etiquetas desactivadas crean un desafío de asociación puramente visual ideal para libros de puzzles y actividades avanzadas. Añade campos opcionales de nombre y fecha para responsabilidad en el aula. El sistema de lienzo dual genera simultáneamente una pestaña de ficha y una pestaña de clave de respuestas — la clave de respuestas muestra cada emparejamiento correcto letra-número (A → 2, B → 4, etc.) junto a las imágenes originales y sus siluetas o imágenes completas, eliminando la creación manual de claves de respuestas. El diseño se adapta automáticamente: páginas en horizontal disponen los elementos en 2 filas × 4 elementos, páginas en vertical usan 2 columnas × 4 elementos. Un encabezado estilizado aparece con fondo ámbar (#FFC107), contenedor blanco en forma de píldora y borde ámbar de 3px mostrando "Asociación de Sombras" e instrucciones en el idioma seleccionado. La Asociación de Sombras NO es sensible al idioma — la salida del puzzle es puramente visual sin contenido de texto localizado en la ficha, haciendo cada ficha universalmente vendible en todos los mercados sin traducción. Navega 104 colecciones temáticas con más de 3.100 ilustraciones o sube tus propias imágenes PNG, JPG o GIF. Aplica fondos temáticos y bordes temáticos con controles de opacidad independientes (0–1, paso 0,05). Añade texto personalizado con 7 opciones de fuente (Lexend Deca, Baloo 2, Nunito, Quicksand, Fredoka, Arial, Verdana) y contorno de texto 0–10. Exporta cuatro archivos por sesión: ficha JPEG, ficha PDF, clave de respuestas JPEG y clave de respuestas PDF — todo a 300 DPI (multiplicador 6×, calidad JPEG 1,0). Elige Carta, A4, Cuadrado (1200×1200) o tamaños personalizados con opción de escala de grises para salida con ahorro de tinta. Edita todo en el lienzo de Fabric.js con herramientas de alineación, capas, bloqueo/desbloqueo, zoom 25%–300% y deshacer/rehacer 20 estados. La prueba gratuita incluye todas las funciones con una marca de agua en las descargas. Compra una licencia para eliminar la marca de agua y vender con uso comercial.',
  },

  tutorial: {
    title: 'Cómo Crear Fichas de Asociación de Sombras en 8 Pasos',
    steps: [
      {
        title: 'Abre el Generador de Discriminación Visual',
        description: 'Haz clic en "Prueba Gratis Ahora" para abrir el generador de fichas de asociación de sombras en tu navegador. La herramienta carga instantáneamente con una barra lateral de ajustes a la izquierda y un lienzo de doble pestaña a la derecha — una pestaña para la ficha y otra para la clave de respuestas. Sin crear cuenta, sin descargar software, sin instalación — empieza a crear fichas de asociación de sombras de inmediato.',
      },
      {
        title: 'Elige Tu Modo de Ejercicio',
        description: 'Abre el panel de Configuración de Ejercicio y selecciona tu modo. El modo Asociación de Sombras genera siluetas negras a partir de tus imágenes seleccionadas usando procesamiento a nivel de píxel — cada píxel con alfa > 10 se convierte a negro puro, produciendo contornos precisos que preservan detalles finos como orejas de animales, formas de vehículos y contornos de objetos. El modo Completa la Imagen divide imágenes en mitades — elige la dirección de corte horizontal (mitades superior/inferior) o la dirección de corte vertical (mitades izquierda/derecha) usando los botones de radio que aparecen en este modo. Cada modo crea una actividad de asociación fundamentalmente diferente del mismo conjunto de imágenes.',
      },
      {
        title: 'Configura Etiquetas y Campos de Nombre/Fecha',
        description: 'Activa o desactiva la casilla "Mostrar Etiquetas" (activada por defecto) para mostrar los identificadores A, B, C, D en las imágenes o primeras mitades y los identificadores 1, 2, 3, 4 en las siluetas o segundas mitades. Con etiquetas activadas, los alumnos escriben pares letra-número como respuestas — andamiaje estructurado para alumnos más pequeños. Con etiquetas desactivadas, la ficha se convierte en un desafío de asociación puramente visual sin señales alfanuméricas — ideal para libros de puzzles o actividades avanzadas donde las respuestas escritas no son necesarias. Marca "Incluir Campos de Nombre/Fecha" para añadir líneas de nombre y fecha del alumno al pie de la ficha para responsabilidad en el aula.',
      },
      {
        title: 'Selecciona 4 Imágenes de la Biblioteca o Sube las Tuyas',
        description: 'Abre el panel de Biblioteca de Imágenes y navega 104 colecciones temáticas con más de 3.100 ilustraciones a color — animales, comida, vehículos, naturaleza, festividades, profesiones y docenas más. Filtra por tema usando el menú desplegable o busca por palabra clave. Haz clic en las imágenes para seleccionarlas — el contador muestra tu progreso hacia las 4 imágenes requeridas. Ambos modos siempre usan exactamente 4 imágenes por ficha. La vista previa de imágenes seleccionadas confirma tus elecciones antes de generar. Alternativamente, usa el panel de Subir Imágenes Personalizadas para cargar tus propios archivos PNG, JPG o GIF para fichas de asociación de sombras personalizadas — fotos familiares, obras de arte personalizadas, imágenes de marca o contenido específico del aula.',
      },
      {
        title: 'Configura el Diseño de Página y las Decoraciones',
        description: 'En la sección Configuración de Página, selecciona tu tamaño de página: Carta Vertical, Carta Horizontal, A4 Vertical, A4 Horizontal, Cuadrado (1200×1200) o introduce una dimensión personalizada. Elige un color de fondo de página. Selecciona un fondo decorativo temático y un borde decorativo temático de la biblioteca integrada, cada uno con un control de opacidad independiente (0–1, paso 0,05). Los fondos y bordes temáticos funcionan de forma independiente, permitiéndote combinar un fondo sutil con un borde decorativo llamativo o cualquier combinación que se ajuste a tu estilo de producto.',
      },
      {
        title: 'Genera la Ficha de Asociación de Sombras',
        description: 'Haz clic en Generar para crear la ficha de asociación. En el modo Asociación de Sombras, la aplicación procesa cada imagen a nivel de píxel — cargándola en un lienzo, extrayendo datos de píxeles vía getImageData y convirtiendo cada píxel con alfa > 10 a negro puro para producir siluetas precisas. En el modo Completa la Imagen, las imágenes se dividen según la dirección de corte seleccionada en mitades etiquetadas. Ambos modos aplican el derangement Fisher-Yates para garantizar que ningún elemento aparezca en su posición original — ninguna silueta queda debajo de su imagen correspondiente, ninguna segunda mitad queda adyacente a su primera mitad correspondiente. Un encabezado estilizado aparece con fondo ámbar (#FFC107), contenedor blanco en forma de píldora y borde ámbar de 3px mostrando "Asociación de Sombras" e instrucciones. El diseño se adapta automáticamente: páginas en horizontal usan 2 filas × 4 elementos, páginas en vertical usan 2 columnas × 4 elementos.',
      },
      {
        title: 'Revisa la Clave de Respuestas Autogenerada',
        description: 'Haz clic en la pestaña Clave de Respuestas para ver la solución generada automáticamente. En el modo Asociación de Sombras, cada celda muestra la imagen original junto a su silueta con una etiqueta como "A → 2" indicando la coincidencia correcta. En el modo Completa la Imagen, cada celda muestra la imagen original completa con su etiqueta de coincidencia. La cuadrícula usa 4 columnas con espaciado consistente. Alterna entre las pestañas de Ficha y Clave de Respuestas para comparar. La clave de respuestas se genera simultáneamente con la ficha — sin creación manual, sin proceso de diseño separado, sin posibilidad de respuestas incorrectas. Este sistema de lienzo dual es tu mayor ahorro de tiempo al crear paquetes de fichas de asociación de sombras.',
      },
      {
        title: 'Descarga los Cuatro Archivos',
        description: 'Activa la escala de grises para versiones con ahorro de tinta ideales para impresión en el aula e interiores de KDP. Descarga los cuatro archivos desde una sola sesión: ficha JPEG, ficha PDF, clave de respuestas JPEG y clave de respuestas PDF — todo renderizado a 300 DPI (multiplicador 6×, calidad JPEG 1,0). Cada pestaña tiene su propio par de botones de descarga. Los archivos están listos para producción en listados de Etsy, interiores de Amazon KDP y archivos de productos de TpT sin necesidad de posprocesamiento. Haz clic en Generar de nuevo con las mismas imágenes para producir una nueva ficha con diferentes disposiciones de derangement, o cambia de imágenes y modos para creación rápida de variedad en 104 colecciones temáticas.',
      },
    ],
  },

  whatYouCanCreate: [
    {
      title: 'Paquetes Temáticos de Asociación de Sombras por Modo',
      description: 'Crea paquetes de actividades de asociación de sombras organizados por modo y tema usando las 104 colecciones de imágenes. Un solo tema de animales produce tres tipos distintos de ficha: fichas de Asociación de Sombras para reconocimiento de siluetas, fichas de Completa la Imagen con cortes horizontales para recomposición superior/inferior, y fichas de Completa la Imagen con cortes verticales para recomposición izquierda/derecha. Empaqueta 15–20 fichas de asociación de sombras por paquete con claves de respuestas autogeneradas incluidas. El derangement Fisher-Yates se recalcula en cada generación, por lo que puedes crear múltiples fichas únicas de las mismas 4 imágenes simplemente regenerando — diferentes disposiciones de derangement producen diferentes desafíos de asociación sin necesitar imágenes fuente diferentes.',
    },
    {
      title: 'Cuadernos de Percepción Visual para KDP',
      description: 'Compila 50–80 fichas de asociación de sombras en cuadernos impresos para Amazon KDP. Estructura capítulos por tipo de actividad: el Capítulo 1 usa el modo Asociación de Sombras para reconocimiento de siluetas, el Capítulo 2 usa Completa la Imagen con cortes horizontales para razonamiento espacial superior/inferior, y el Capítulo 3 usa Completa la Imagen con cortes verticales para razonamiento espacial izquierda/derecha. Incluye páginas de clave de respuestas al final de cada capítulo mostrando los emparejamientos correctos letra-número junto a las imágenes originales. Activa la escala de grises para salida con ahorro de tinta que se imprime perfectamente en blanco y negro. El formato puramente visual no requiere traducción, por lo que un solo interior sirve para todos los mercados internacionales de KDP.',
    },
    {
      title: 'Actividades Rápidas de Puzzles de Sombras para el Aula',
      description: 'Crea fichas de asociación de sombras listas para el aula para trabajo matutino, alumnos que terminan antes y centros de enriquecimiento con campos de nombre/fecha y claves de respuestas impresas. Construye sets alineados con el currículo: puzzles de sombras de animales para unidades de ciencias, siluetas de vehículos para temas de transporte, asociación de sombras de alimentos para lecciones de nutrición. El selector de etiquetas te permite crear versiones con andamiaje (con etiquetas A/B/C/D y 1/2/3/4) para instrucción guiada y versiones de desafío (etiquetas ocultas) para trabajo independiente — ambas versiones de las mismas imágenes en la misma sesión de generación. Cada ficha se exporta con su clave de respuestas autogenerada, eliminando el tiempo de preparación del maestro.',
    },
    {
      title: 'Productos de Asociación de Sombras con Fotos Personalizadas',
      description: 'Usa la función de Subir Imágenes Personalizadas para crear fichas de asociación de sombras a partir de cualquier foto u obra de arte. Los puzzles de siluetas con fotos familiares son regalos personalizados únicos — los niños asocian miembros de la familia con sus siluetas negras. Puzzles de sombras con fotos de mascotas, siluetas de equipos deportivos y actividades de sombras con fotos del aula se convierten en productos únicos. La generación de siluetas a nivel de píxel funciona con cualquier imagen subida, convirtiendo el canal alfa en contornos negros precisos. El modo Completa la Imagen con fotos personalizadas añade variedad de imagen dividida a los productos de puzzles personalizados.',
    },
    {
      title: 'Colecciones Estacionales de Asociación de Sombras',
      description: 'Construye colecciones estacionales rotativas usando temas de festividades y naturaleza de la biblioteca de 104 temas. Las fichas de asociación de sombras de Halloween son naturalmente populares — las actividades de siluetas complementan perfectamente los temas de sombras y misterio de la temporada. Navidad, Pascua, San Valentín, vuelta al cole y verano soportan paquetes dedicados de puzzles de sombras. Incluye fichas tanto de Asociación de Sombras como de Completa la Imagen en cada set estacional para máxima variedad. Publica cada colección 4–6 semanas antes de la festividad para máxima visibilidad en el mercado. El algoritmo de derangement asegura que no haya dos fichas idénticas incluso dentro del mismo tema estacional.',
    },
    {
      title: 'Paquetes de Aprendizaje Visual Multi-Formato',
      description: 'Combina fichas de asociación de sombras con puzzles de cuadrícula, fichas de asociación, actividades de piezas faltantes y fichas de clasificación de imágenes usando temas coordinados en múltiples generadores. La Asociación de Sombras desarrolla reconocimiento de siluetas y discriminación visual. El modo Completa la Imagen desarrolla razonamiento espacial y percepción parte-todo. El Puzzle de Cuadrícula desafía la colocación espacial de piezas. Las fichas de asociación ejercitan habilidades de emparejamiento trazar-una-línea. Cada formato ejercita una habilidad cognitiva diferente mientras mantiene consistencia temática. Los paquetes multi-formato se venden a precios premium y brindan a los alumnos práctica variada de percepción visual a través de un tema unificado.',
    },
  ],

  businessIdeas: [
    {
      title: 'Tienda Etsy de Puzzles de Sombras Temáticos',
      description: 'Abre una tienda Etsy especializada en paquetes de puzzles de asociación de sombras organizados por tema usando las 104 colecciones de imágenes. Animales, vehículos, naturaleza, comida, festividades y profesiones se convierten en listados separados con fichas de Asociación de Sombras (siluetas) y fichas de Completa la Imagen (mitades divididas). Cada puzzle incluye la clave de respuestas autogenerada con etiquetas letra-número — un punto de venta crítico que diferencia tus listados de competidores que venden puzzles sin soluciones. La generación de siluetas a nivel de píxel produce sombras de calidad profesional que preservan detalles finos de las imágenes. Precio de paquetes individuales por tema a $3–$5 para 15–20 fichas con claves de respuestas y paquetes premium de modo mixto a $7–$12.',
      platform: 'Etsy',
    },
    {
      title: 'Serie de Cuadernos de Percepción Visual en Amazon KDP',
      description: 'Compila 50–80 fichas de asociación de sombras en cuadernos temáticos para Amazon KDP. Estructura una serie por tipo de actividad: "Puzzles de Asociación de Sombras" para reconocimiento de siluetas, "Puzzles Completa la Imagen" para recomposición de imagen dividida, y "Asociación Visual Completa" combinando ambos modos. Incluye páginas de clave de respuestas al final con las etiquetas correctas de coincidencia letra-número. Activa la escala de grises para salida con ahorro de tinta que se imprime perfectamente en blanco y negro. El formato puramente visual se publica idénticamente en todos los mercados internacionales de KDP sin traducción — un solo interior sirve para todos los países. Los cuadernos de puzzles de percepción visual funcionan bien durante todo el año en la categoría de libros de actividades.',
      platform: 'Amazon KDP',
    },
    {
      title: 'Paquetes de Actividades de Asociación de Sombras para TpT',
      description: 'Sube paquetes de actividades de asociación de sombras a TpT con campos de nombre/fecha, etiquetas activables/desactivables y claves de respuestas autogeneradas como puntos de venta clave. Los maestros que buscan actividades de discriminación visual valoran fichas que incluyen versiones con andamiaje y de desafío. Crea sets alineados con el currículo: asociación de sombras de animales para unidades de ciencias, siluetas de ayudantes comunitarios para estudios sociales, puzzles de sombras de alimentos para temas de nutrición. Cada paquete incluye versiones con etiquetas para instrucción guiada y versiones sin etiquetas para trabajo independiente, para que los maestros asignen por nivel del alumno. La clave de respuestas autogenerada elimina el tiempo de preparación del maestro.',
      platform: 'Teachers Pay Teachers',
    },
    {
      title: 'Embudo de Tráfico con Puzzles de Sombras en Pinterest',
      description: 'Las fichas de asociación de sombras crean pines visualmente impactantes en Pinterest — el contraste entre imágenes a color y sus siluetas negras crea un formato inmediatamente llamativo. Publica fichas de muestra mostrando el modo Asociación de Sombras con siluetas de animales distintivas y el modo Completa la Imagen con mitades de imagen dividida. Crea series de pines separadas para "puzzles de sombras de animales", "asociación de siluetas de festividades" y "actividades de percepción visual". Las actividades de sombras de Halloween funcionan especialmente bien en Pinterest durante la temporada de otoño. El formato puramente visual atrae a padres y maestros en todos los países. Enlaza cada pin a tus listados de productos en Etsy o TpT.',
      platform: 'Pinterest',
    },
    {
      title: 'Kit Completo de Asociación de Sombras en Gumroad',
      description: 'Agrupa fichas de asociación de sombras de los 104 temas y ambos modos de ejercicio en un kit integral en Gumroad. Incluye más de 300 fichas abarcando puzzles de siluetas de Asociación de Sombras, puzzles de corte horizontal de Completa la Imagen y puzzles de corte vertical de Completa la Imagen — tres tipos de actividad por tema. Cada ficha incluye su clave de respuestas autogenerada, duplicando tu conteo de archivos a más de 600 archivos en total. La variedad de tres modos (silueta, división horizontal, división vertical) proporciona enorme variedad de cada conjunto temático de imágenes. El formato de kit justifica precios premium porque los compradores obtienen una biblioteca completa de puzzles de sombras en lugar de paquetes individuales.',
      platform: 'Gumroad',
    },
    {
      title: 'Línea de Productos de Puzzles Visuales Globales',
      description: 'La Asociación de Sombras produce puzzles puramente visuales — imágenes, siluetas y mitades divididas son universales sin texto específico de idioma en la salida de la ficha. Los mismos archivos de producto funcionan en todos los países sin traducción ni modificación. Una sesión de creación produce un catálogo vendible globalmente. Vende archivos idénticos en tiendas Etsy dirigidas a diferentes países, publica los mismos interiores de KDP en todos los mercados internacionales de Amazon y lista en TpT para maestros internacionales. Sin versiones separadas por idioma, sin costos de traducción, sin mantenimiento por región. La función de subir imágenes personalizadas también permite servicios de personalización localizados sin cambiar el formato básico del producto.',
      platform: 'Etsy / Amazon KDP',
    },
  ],

  proTips: [
    {
      title: 'Elige Imágenes con Siluetas Distintivas para el Modo Asociación de Sombras',
      description: 'La calidad de las fichas de Asociación de Sombras depende de lo reconocible que sea cada silueta. Selecciona imágenes con contornos distintivos — animales con formas corporales únicas (jirafa, elefante, pulpo), vehículos con perfiles claros (avión, bicicleta, barco) y objetos con contornos identificables (guitarra, paraguas, corona). Evita imágenes con formas rectangulares similares que produzcan siluetas casi idénticas. El procesamiento a nivel de píxel preserva detalles finos como orejas, colas y asas, por lo que las imágenes con rasgos característicos producen los puzzles de sombras más atractivos.',
    },
    {
      title: 'Usa Ambas Direcciones de Corte en Completa la Imagen para Máxima Variedad',
      description: 'El modo Completa la Imagen ofrece direcciones de corte horizontal (superior/inferior) y vertical (izquierda/derecha). Incluye ambas en tus paquetes de productos — los cortes horizontales crean desafíos de asociación diferentes que los cortes verticales porque se revelan diferentes detalles en cada mitad. Un animal dividido horizontalmente muestra cabeza y cuerpo por separado; el mismo animal dividido verticalmente muestra perfiles izquierdo y derecho. Usar ambas direcciones de corte duplica tu conteo de fichas únicas del mismo conjunto de imágenes sin ninguna selección de imágenes adicional.',
    },
    {
      title: 'Desactiva las Etiquetas para Productos Premium de Libros de Puzzles',
      description: 'Cuando el selector Mostrar Etiquetas está desactivado, la ficha se convierte en un desafío de asociación puramente visual sin identificadores A/B/C/D y 1/2/3/4. Esto crea una página de puzzle más limpia y de aspecto más profesional, ideal para libros de puzzles impresos y descargas digitales premium. Sin etiquetas, los alumnos deben confiar enteramente en la asociación visual — identificando siluetas solo por su forma o reconectando mitades divididas por continuidad visual. Las fichas sin etiquetas se perciben con mayor valor en productos de libros de puzzles porque lucen más pulidas y presentan un desafío genuino.',
    },
    {
      title: 'Aprovecha el Algoritmo de Derangement para Creación Rápida de Paquetes',
      description: 'El derangement Fisher-Yates se recalcula en cada generación, produciendo disposiciones diferentes de las mismas 4 imágenes. Esto significa que hacer clic en Generar repetidamente con configuraciones idénticas crea múltiples fichas únicas donde las siluetas o mitades aparecen en posiciones diferentes. Usa esto para llenar rápidamente paquetes grandes sin necesitar imágenes fuente diferentes para cada página. Genera 5–10 fichas únicas por conjunto de imágenes, luego multiplica por 104 temas para catálogos de productos masivos con esfuerzo mínimo.',
    },
    {
      title: 'Explota el Formato Puramente Visual para Ventas Globales',
      description: 'Las fichas de Asociación de Sombras contienen solo imágenes, siluetas y mitades divididas — sin texto específico de idioma en la salida de la ficha. Cada puzzle que creas es instantáneamente vendible a nivel mundial sin traducción ni localización. Un set de puzzles de sombras sirve para todas las tiendas Etsy internacionales, todos los mercados de KDP y todos los compradores de TpT independientemente del idioma. Mientras los competidores crean versiones separadas por idioma de fichas con mucho texto, tus puzzles de sombras funcionan en todas partes desde un solo conjunto de archivos.',
    },
    {
      title: 'Aprovecha la Temporada de Halloween para Productos Temáticos de Sombras',
      description: 'Las actividades de sombras y siluetas tienen un atractivo estacional especial durante Halloween cuando el misterio, las sombras y los contornos oscuros son temáticamente relevantes. Crea colecciones dedicadas de asociación de sombras de Halloween usando imágenes de temas espeluznantes de la biblioteca y publícalas 4–6 semanas antes del 31 de octubre para máxima visibilidad en el mercado. El modo Asociación de Sombras con sus siluetas negras complementa naturalmente la estética de Halloween. Esta ventaja de temporalidad es única para productos temáticos de sombras y genera tasas de conversión más altas durante la ventana de compras de otoño.',
    },
    {
      title: 'Usa Fondos y Bordes Temáticos para Branding Cohesivo de Producto',
      description: 'El sistema independiente de fondos y bordes temáticos con controles de opacidad separados te permite crear una identidad visual consistente en tus paquetes de fichas de asociación de sombras. Configura un fondo temático sutil al 15–25% de opacidad para calidez visual sin distraer del contenido de asociación de sombras. Superpone un borde decorativo al 80–100% de opacidad para un marco pulido. Aplica la misma combinación de fondo y borde en cada ficha de un paquete para un aspecto de producto cohesivo que los compradores asocian con calidad y profesionalismo.',
    },
  ],

  faq: [
    {
      question: '¿Hay una prueba gratuita?',
      answer: 'Sí. La herramienta ofrece una prueba gratuita con todas las funciones — ambos modos de ejercicio (Asociación de Sombras y Completa la Imagen), generación de siluetas a nivel de píxel, direcciones de corte horizontal y vertical, la clave de respuestas autogenerada con etiquetas letra-número, identificadores A/B/C/D y 1/2/3/4 activables/desactivables, las 104 colecciones temáticas de imágenes con más de 3.100 ilustraciones, subida de imágenes personalizadas, fondos y bordes temáticos con opacidad independiente, campos de nombre/fecha, opción de escala de grises y todos los formatos de descarga. Sin registro, sin tarjeta de crédito. Las descargas de la prueba gratuita incluyen una marca de agua. Compra una licencia comercial para eliminar la marca de agua y desbloquear derechos de venta.',
    },
    {
      question: '¿Cuáles son los dos modos de ejercicio?',
      answer: 'El generador ofrece dos modos distintos en una sola herramienta. El modo Asociación de Sombras coloca 4 imágenes a color etiquetadas A–D en la fila superior y 4 siluetas negras autogeneradas etiquetadas 1–4 en la fila inferior — los alumnos asocian cada imagen con su sombra emparejando letras con números. Las siluetas se crean mediante procesamiento a nivel de píxel (alfa > 10 → negro puro), no filtros CSS. El modo Completa la Imagen divide 4 imágenes en mitades — primeras mitades etiquetadas A–D, segundas mitades etiquetadas 1–4 — y los alumnos reconectan las piezas para completar cada imagen. Elige la dirección de corte horizontal (superior/inferior) o vertical (izquierda/derecha) en el modo Completa la Imagen.',
    },
    {
      question: '¿Cómo funciona la generación de siluetas a nivel de píxel?',
      answer: 'En el modo Asociación de Sombras, la aplicación carga cada imagen seleccionada en un lienzo, extrae cada píxel usando getImageData y convierte todos los píxeles con un valor alfa mayor que 10 a negro puro (R=0, G=0, B=0, A=255). Esto preserva el perfil de transparencia exacto de cada imagen fuente, produciendo siluetas negras precisas que reflejan detalles finos como orejas, colas, asas y contornos distintivos. Esto es procesamiento real de píxeles — no filtros CSS, no recursos de sombra prefabricados, no superposiciones de imagen. El manejo de CORS asegura que las imágenes de la biblioteca de origen cruzado se procesen correctamente.',
    },
    {
      question: '¿Cómo funciona el algoritmo de derangement Fisher-Yates?',
      answer: 'Ambos modos de ejercicio usan un algoritmo de derangement basado en la aleatorización Fisher-Yates que garantiza que ningún elemento aparezca en su posición original. En el modo Asociación de Sombras, ninguna silueta queda directamente debajo de su imagen correspondiente. En el modo Completa la Imagen, ninguna segunda mitad aparece adyacente a su primera mitad correspondiente. Esto elimina la posibilidad de que los alumnos adivinen correctamente solo por la posición y asegura que cada ficha presente un desafío genuino de asociación. El derangement se recalcula en cada generación, produciendo disposiciones diferentes del mismo conjunto de imágenes.',
    },
    {
      question: '¿Cuáles son las opciones de dirección de corte en el modo Completa la Imagen?',
      answer: 'El modo Completa la Imagen ofrece dos opciones de dirección de corte mediante botones de radio en el panel de Configuración de Ejercicio. Los cortes horizontales dividen las imágenes en mitades superior e inferior, mientras que los cortes verticales dividen las imágenes en mitades izquierda y derecha. La dirección de corte se aplica a las 4 imágenes de la ficha. Diferentes direcciones de corte producen diferentes desafíos de asociación de las mismas imágenes — un animal dividido horizontalmente revela cabeza y cuerpo por separado, mientras que el mismo animal dividido verticalmente muestra perfiles izquierdo y derecho. Incluye ambas direcciones de corte en tus paquetes de productos para máxima variedad.',
    },
    {
      question: '¿Cómo funciona la clave de respuestas autogenerada?',
      answer: 'El sistema de lienzo dual genera simultáneamente una pestaña de ficha y una pestaña de clave de respuestas. En el modo Asociación de Sombras, la clave de respuestas muestra una cuadrícula donde cada celda muestra la imagen original junto a su silueta con una etiqueta como "A → 2" indicando la coincidencia correcta. En el modo Completa la Imagen, cada celda muestra la imagen original completa con su etiqueta de coincidencia. La cuadrícula usa 4 columnas con espaciado consistente. Descarga cada versión de forma independiente — ficha JPEG, ficha PDF, clave de respuestas JPEG y clave de respuestas PDF — obteniendo cuatro archivos listos para producción de una sola generación.',
    },
    {
      question: '¿Puedo activar y desactivar las etiquetas A/B/C/D y 1/2/3/4?',
      answer: 'Sí. La casilla "Mostrar Etiquetas" en el panel de Configuración de Ejercicio (activada por defecto) controla si las etiquetas A, B, C, D aparecen en las imágenes o primeras mitades y las etiquetas 1, 2, 3, 4 aparecen en las siluetas o segundas mitades. Con etiquetas activadas, los alumnos escriben pares letra-número como respuestas — andamiaje estructurado para instrucción guiada. Con etiquetas desactivadas, la ficha se convierte en un desafío de asociación puramente visual sin señales alfanuméricas — ideal para libros de puzzles, actividades avanzadas o productos donde se desea una presentación visual más limpia.',
    },
    {
      question: '¿Por qué siempre hay exactamente 4 elementos por ficha?',
      answer: 'Ambos modos de ejercicio usan un conteo fijo de 4 elementos de asociación por ficha. Esto proporciona el equilibrio óptimo para la asociación de sombras e imágenes divididas: suficiente variedad para crear un desafío genuino de asociación con el algoritmo de derangement, mientras mantiene cada imagen lo suficientemente grande para que los alumnos estudien detalles finos en siluetas y mitades divididas. El formato consistente de 4 elementos también funciona bien para productos empaquetados donde cada página tiene densidad de contenido y equilibrio visual predecibles.',
    },
    {
      question: '¿El generador es sensible al idioma?',
      answer: 'No. La Asociación de Sombras es puramente visual — la salida de la ficha contiene solo imágenes, siluetas y mitades divididas sin contenido de texto localizado en la ficha. La interfaz de la aplicación (menús, botones, texto del encabezado) soporta los 11 idiomas, pero la ficha generada funciona idénticamente independientemente de la selección de idioma. Esto hace que las fichas de asociación de sombras sean universalmente vendibles en todos los mercados sin traducción. Un set de puzzles de sombras sirve para todas las tiendas Etsy internacionales, mercados de KDP y compradores de TpT.',
    },
    {
      question: '¿Qué tamaños de página y formatos de exportación están disponibles?',
      answer: 'Los tamaños de página incluyen Carta Vertical, Carta Horizontal, A4 Vertical, A4 Horizontal, Cuadrado (1200×1200) y dimensiones personalizadas. Exporta como JPEG de alta resolución o PDF listo para imprimir a 300 DPI (multiplicador 6×, calidad JPEG 1,0). Activa la escala de grises para salida con ahorro de tinta. Cada generación produce cuatro archivos de descarga: ficha JPEG, ficha PDF, clave de respuestas JPEG y clave de respuestas PDF. Todas las exportaciones están listas para producción en descargas digitales, cuadernos impresos y fichas para el aula.',
    },
    {
      question: '¿Puedo vender fichas de asociación de sombras creadas con esta herramienta de forma comercial?',
      answer: 'Sí. Con una licencia comercial, tienes derechos completos para vender fichas de asociación de sombras como descargas digitales en Etsy, cuadernos impresos de percepción visual en Amazon KDP, recursos para el aula en TpT o a través de cualquier otro canal de venta. Los dos modos de ejercicio, la generación de siluetas a nivel de píxel, el derangement Fisher-Yates, las claves de respuestas autogeneradas, las etiquetas activables/desactivables, la subida de imágenes personalizadas y las 104 colecciones temáticas de imágenes te dan todo lo necesario para crear productos profesionales que compiten en categorías de asociación visual en todos los principales mercados.',
    },
    {
      question: '¿Cuál es la política de reembolso?',
      answer: 'Prueba antes de comprar con nuestra prueba gratuita — todas las funciones están disponibles para que puedas evaluar completamente la herramienta antes de comprar. Debido a que la prueba gratuita te da acceso completo a ambos modos de ejercicio, generación de siluetas a nivel de píxel, opciones de dirección de corte, la clave de respuestas autogenerada, los 104 temas, la subida de imágenes personalizadas, fondos y bordes temáticos, selector de etiquetas, campos de nombre/fecha, exportación en escala de grises y todos los formatos de descarga, no ofrecemos reembolsos en compras de licencias. Asegúrate de que la herramienta se adapta a tus necesidades usando la prueba gratuita antes de comprar.',
    },
  ],

  internalLinks: [
    { pageType: 'app', slug: 'asociacion-sombras-fichas', anchorText: 'Fichas de Asociación de Sombras — Detalles Completos del Producto' },
    { pageType: 'tool', slug: 'generador-fichas-asociacion', anchorText: 'Generador de Fichas de Asociación' },
    { pageType: 'tool', slug: 'generador-puzzle-cuadricula', anchorText: 'Generador de Puzzle de Cuadrícula' },
    { pageType: 'tool', slug: 'generador-tarjetas-bingo', anchorText: 'Generador de Tarjetas de Bingo' },
    { pageType: 'tool', slug: 'generador-piezas-faltantes', anchorText: 'Generador de Piezas Faltantes' },
    { pageType: 'tool', slug: 'generador-fichas-intruso', anchorText: 'Generador de Fichas del Intruso' },
    { pageType: 'tool', slug: 'generador-clasificacion-imagenes', anchorText: 'Generador de Clasificación de Imágenes' },
    { pageType: 'tool', slug: 'generador-paginas-colorear', anchorText: 'Generador de Páginas para Colorear' },
  ],

  visuals: {
    heroImages: {
      primary: '/samples/spanish/shadow match/Empareja las Sombras 1.webp',
      primaryAlt: 'Ficha de asociación de sombras con imágenes a color en la fila superior y siluetas negras autogeneradas en la fila inferior con encabezado ámbar y etiquetas letra-número para actividad de asociación',
    },
    sampleGallery: [
      {
        src: '/samples/spanish/shadow match/Empareja las Sombras 4.webp',
        alt: 'Ficha de asociación de sombras con cuatro imágenes a color asociadas a cuatro siluetas negras generadas a nivel de píxel con etiquetas A B C D y 1 2 3 4',
        caption: 'Modo Asociación de Sombras — los alumnos asocian imágenes con sus siluetas autogeneradas a nivel de píxel',
      },
      {
        src: '/samples/spanish/shadow match/Empareja las Sombras 3.webp',
        alt: 'Ficha Completa la Imagen con mitades de imagen dividida que los alumnos reconectan asociando primeras y segundas mitades etiquetadas A a D y 1 a 4',
        caption: 'Modo Completa la Imagen — los alumnos asocian mitades de imagen dividida para completar imágenes con cortes horizontales o verticales',
      },
      {
        src: '/samples/spanish/shadow match/Empareja las Sombras 1 answer-key.webp',
        alt: 'Clave de respuestas de asociación de sombras mostrando imágenes originales junto a siluetas con etiquetas de coincidencia correcta letra-número como A a 2',
        caption: 'Clave de respuestas autogenerada — etiquetas letra-número muestran las coincidencias correctas para ambos modos de ejercicio',
      },
    ],
    youtubeId: 'TYvUXJeMI98',
    videoTitle: 'Cómo Crear Fichas de Asociación de Sombras con Siluetas a Nivel de Píxel, Mitades de Imagen Dividida y Claves de Respuestas Automáticas — Tutorial Paso a Paso',
  },
};

export default content;
