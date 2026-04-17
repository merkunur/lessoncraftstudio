import type { AppContent } from '../types';

const content: AppContent = {
  seo: {
    primaryKeyword: 'puzzle piezas faltantes para imprimir',
    secondaryKeywords: [
      'rompecabezas ficha para imprimir',
      'completa el puzzle ejercicio',
      'observación visual ficha',
      'lógica visual para imprimir',
    ],
    lsiKeywords: [
      'rompecabezas',
      'completar',
      'observar',
      'razonamiento visual',
    ],
    titleTag: 'Generador de piezas faltantes | LessonCraftStudio',
    metaDescription: 'Cree fichas de "piezas faltantes" con imágenes temáticas y soluciones automáticas. PDF 300 DPI imprimibles. Prueba gratis.',
  },

  hero: {
    title: 'Generador de piezas faltantes — Crea imprimibles para vender en Etsy y KDP',
    tagline: 'Cree fichas de "piezas faltantes" con imágenes temáticas y soluciones automáticas — PDF 300 DPI.',
    description:
      'Cree puzzles profesionales de piezas faltantes donde una imagen tiene huecos recortados y los usuarios identifican qué opción numerada rellena cada espacio. El algoritmo inteligente de extracción de piezas encuentra áreas visualmente distintas con suficiente varianza de color, garantizando que cada puzzle sea resoluble y atractivo. Elija entre 6 formas de pieza — cuadrado, círculo, rectángulo vertical, rectángulo horizontal, elipse vertical y elipse horizontal — y configure la dificultad con 1–5 piezas faltantes y 2–6 opciones de solución que incluyen piezas distractoras para desafiar las habilidades de discriminación visual. Cada puzzle incluye una clave de respuestas generada automáticamente con etiquetas numéricas resaltadas en amarillo colocadas dentro de cada hueco mostrando la opción correcta. El encabezado generado automáticamente muestra "Piezas Faltantes" en turquesa (#06B6D4) con una descripción en rosa (#DB2777) enmarcado en un sistema de doble borde — borde exterior verde azulado (#14B8A6, 8px) y borde interior rosa intenso (#EC4899, 3px) — localizado en los 11 idiomas soportados. Piezas Faltantes NO es sensible al idioma: los puzzles son puramente visuales sin contenido dependiente del idioma, por lo que cada puzzle funciona idénticamente en todo el mundo. El Acceso Completo desbloquea los 104 temas con más de 3.100 ilustraciones y los 11 idiomas de interfaz. Añada temas de fondo y temas de borde con controles de opacidad independientes, y exporte PDFs y JPEGs listos para imprimir a 300 DPI en tamaños Carta, A4, Cuadrado o personalizado. Ya sea que vendas paquetes de puzzles visuales en Etsy, compiles libros de rompecabezas para Amazon KDP o crees actividades de pensamiento crítico para Hotmart, este generador produce puzzles listos para producción en minutos — pruebe gratis con todas las funciones — sin registro, sin tarjeta de crédito. Las descargas incluyen una marca de agua; compre una licencia para eliminarla.',
  },

  ctaHeading: 'Crear puzzles de piezas faltantes',

  howItWorks: {
    title: 'Cómo crear rompecabezas de piezas faltantes paso a paso',
    steps: [
      {
        title: 'Configure el diseño de página',
        description:
          'Genere rompecabezas de piezas faltantes para vender en Etsy, Amazon KDP o Hotmart. Los niños observan una imagen incompleta y seleccionan la pieza que falta de varias opciones — un formato que desarrolla la percepción visual y el razonamiento lógico. Con más de 3.000 imágenes en 104 temas, cree rompecabezas visualmente atractivos para cualquier estación o interés. Este formato es ideal para cuadernillos de actividades en Amazon KDP y paquetes de lógica visual en Etsy. Exporte PDFs a 300 DPI con solucionario automático y véndalos con la licencia comercial incluida. El formato es puramente visual — funciona en cualquier idioma sin traducción. Pruebe gratis con marca de agua — sin registro.',
      },
      {
        title: 'Configure el puzzle',
        description:
          'Abra el panel de Configuración del Puzzle y establezca el número de piezas faltantes de 1 a 5 — esto controla cuántos huecos se recortan de la imagen. Establezca el número de opciones de solución de 2 a 6, que incluye las piezas correctas más piezas distractoras que aumentan la dificultad. Seleccione una forma de pieza entre 6 opciones: cuadrado (predeterminado), círculo, rectángulo vertical, rectángulo horizontal, elipse vertical o elipse horizontal. Cada forma cree un desafío visual diferente.',
      },
      {
        title: 'Seleccione una imagen de la biblioteca o suba la tuya',
        description:
          'Abra el panel de Biblioteca de Imágenes y explore 104 colecciones temáticas con más de 3.100 ilustraciones coloridas — animales, comida, vehículos, naturaleza, festividades y docenas más. Filtra por tema usando el menú desplegable o busque por palabra clave con retardo de 300ms. Haga clic en una imagen para seleccionarla como fuente de su puzzle. También puede subir imágenes personalizadas en formato PNG, JPG o GIF usando el panel de Subir Imágenes Personalizadas para total libertad creativa en sus diseños de puzzles.',
      },
      {
        title: 'Genere el puzzle',
        description:
          'La aplicación recorta automáticamente huecos de la imagen seleccionada usando extracción inteligente de piezas. El algoritmo intenta hasta 150 colocaciones para encontrar piezas con suficiente varianza de color (varianza de brillo mínima de 15) y al menos 250 píxeles de distancia entre piezas para evitar superposición. Huecos blancos con trazo negro (2px) aparecen en las ubicaciones originales. Las opciones de solución numeradas — piezas correctas más distractoras — se muestran con etiquetas numéricas resaltadas en amarillo. Los diseños verticales colocan la imagen del puzzle arriba con las opciones debajo; los diseños horizontales dividen la vista 50/50.',
      },
      {
        title: 'Genere la clave de respuestas y descargue',
        description:
          'Cambie a la pestaña Clave de Respuestas para ver la clave generada automáticamente. La misma imagen del puzzle aparece con los huecos, y etiquetas numéricas resaltadas en amarillo (rgba(255,255,0,0.7)) dentro de cada hueco muestran el índice de la opción correcta. Descargue ambas versiones usando cuatro botones dedicados: JPEG de la Ficha, JPEG de la Clave, PDF de la Ficha y PDF de la Clave — todos renderizados a 300 DPI con calidad JPEG 1.0. Active escala de grises para versiones que ahorran tinta. Cada exportación está lista para producción en listados de Etsy, interiores de Amazon KDP y archivos de productos Hotmart.',
      },
    ],
  },

  keyFeatures: {
    title: 'Por qué los rompecabezas de piezas faltantes son populares',
    features: [
      {
        title: 'Puzzles Estilo Rompecabezas con Dificultad Configurable',
        description:
          'Cree puzzles donde una imagen tiene huecos recortados y los usuarios identifican qué opción numerada rellena cada espacio. Configure la dificultad con dos controles independientes: establezca 1–5 piezas faltantes para controlar la complejidad del puzzle, y establezca 2–6 opciones de solución para controlar cuántas opciones evalúan los usuarios. Más piezas faltantes significa más razonamiento espacial; más opciones de solución (incluyendo distractoras) significa discriminación visual más aguda. Este sistema de dificultad en dos ejes le permite crear puzzles que van desde identificación simple de una pieza hasta desafíos complejos de múltiples piezas.',
      },
      {
        title: 'Seis Formas de Pieza: Cuadrado, Círculo, Rectángulo y Variantes de Elipse',
        description:
          'Elija entre 6 formas de pieza distintas que cambian el carácter visual de cada puzzle. Las formas cuadrado (predeterminado) y círculo ofrecen cortes geométricos limpios. Las formas rectángulo vertical y rectángulo horizontal crean huecos alargados con diferentes orientaciones — vertical use 80% de ancho y 100% de alto, horizontal use 100% de ancho y 80% de alto. Las formas elipse vertical y elipse horizontal ofrecen cortes curvos más suaves con las mismas proporciones dimensionales. Cada forma interactúa de manera diferente con la imagen fuente, creando desafíos de identificación únicos incluso usando la misma ilustración.',
      },
      {
        title: 'Extracción Inteligente de Piezas con Detección de Varianza de Color',
        description:
          'El algoritmo de extracción de piezas garantiza que cada puzzle sea visualmente resoluble y atractivo. Intenta hasta 150 colocaciones para encontrar piezas con un umbral mínimo de varianza de brillo de 15 — garantizando que cada pieza extraída contenga suficiente detalle visual para ser identificable. Las piezas mantienen al menos 250 píxeles de distancia entre sí para evitar superposición. Las piezas distractoras se generan con hasta 200 intentos cada una, asegurando que provienen de áreas no superpuestas de la imagen. Esta extracción inteligente produce puzzles consistentemente de alta calidad a partir de cualquier imagen fuente.',
      },
      {
        title: 'Clave de Respuestas Automática con Etiquetas Numéricas Resaltadas en Amarillo',
        description:
          'Cada puzzle de piezas faltantes genere automáticamente una clave de respuestas complementaria en una pestaña separada del lienzo. La clave de respuestas muestra la misma imagen del puzzle con los huecos, y coloque etiquetas numéricas resaltadas en amarillo (rgba(255,255,0,0.7)) dentro de cada hueco mostrando el índice de opción correcto basado en 1. El tamaño de fuente se escala al 60% del tamaño de la pieza para una legibilidad clara. No necesita crear respuestas manualmente — la clave de respuestas se mantiene perfectamente sincronizada con el puzzle. Descargue la clave como answer_key.jpeg o answer_key.pdf junto con la ficha del usuario.',
      },
      {
        title: 'Opciones de Solución Numeradas con Piezas Distractoras',
        description:
          'Las opciones de solución se muestran en contenedores numerados (1–N) con etiquetas numéricas resaltadas en amarillo para identificación clara. Cuando las opciones de solución exceden el número de piezas faltantes, las opciones extra son piezas distractoras — extraídas de diferentes áreas de la misma imagen que no coinciden con ningún hueco. Las distractoras obligan a los usuarios a comparar cuidadosamente los detalles visuales en lugar de simplemente resolver por eliminación. Las fichas verticales organizan las opciones en una fila horizontal debajo del puzzle (75% del tamaño máximo); las fichas horizontales las colocan en el lado derecho (50% del ancho) en una fila horizontal.',
      },
      {
        title: 'Biblioteca de Imágenes con 104 Colecciones Temáticas y Más de 3.100 Ilustraciones',
        description:
          'Explore 104 colecciones de imágenes temáticas que cubren animales, comida, vehículos, naturaleza, profesiones, festividades, deportes, estaciones y docenas más. Cada tema proporciona ilustraciones coloridas que funcionan como fuentes de puzzles — las imágenes con colores variados y regiones distintas producen los puzzles de piezas faltantes más atractivos. Filtra por tema usando el menú desplegable o busque imágenes específicas por palabra clave. El nivel Comercial incluya 10 temas coloridos para empezar; el Acceso Completo desbloquea los 104 temas para máxima variedad creativa en todos sus diseños de puzzles.',
      },
      {
        title: 'Exportación Lista para Imprimir en PDF y JPEG a 300 DPI con Escala de Grises',
        description:
          'Descargue puzzles de piezas faltantes y claves de respuestas como imágenes JPEG de alta resolución o documentos PDF listos para imprimir renderizados a 300 DPI (multiplicador 6×) con calidad JPEG 1.0. Cuatro botones de descargue dedicados exportan la ficha y la clave de respuestas por separado. Los tamaños de página incluyen Carta Vertical, Carta Horizontal, A4 Vertical, A4 Horizontal, Cuadrado (1200×1200) y dimensiones totalmente personalizadas. Active escala de grises para versiones que ahorran tinta. Cada exportación está lista para producción en descargue digitales, libros de trabajo impresos y fichas para venta en línea.',
      },
      {
        title: 'Edición Completa del Lienzo con Herramientas de Texto, Alineación y Capas',
        description:
          'El lienzo Fabric.js proporciona control completo sobre cada elemento de su ficha de puzzle. Arrastre, redimensiona, rota y reposiciona imágenes, texto y contenido generado libremente. Los controles de capas gestionan el orden de apilamiento — trae elementos al frente o envíalos atrás. Bloquea elementos terminados mientras editas otros. Añada texto personalizado con siete opciones de fuente (Lexend Deca, Baloo 2, Nunito, Quicksand, Fredoka, Arial, Verdana), tamaño y color ajustables, y ancho de contorno de texto de 0 a 10 con granularidad de 0,5. Seis opciones de alineación más centrado en página mantienen los diseños precisos. Zoom del 25% al 300% en incrementos del 25% para trabajo de detalle. Deshacer y rehacer hasta 50 estados del historial con Ctrl+Z y Ctrl+Y.',
      },
    ],
  },

  businessUseCases: {
    title: 'Vender fichas de piezas faltantes en Etsy, KDP y Hotmart',
    cases: [
      {
        title: 'Paquetes Temáticos de Puzzles de Piezas Faltantes en Etsy',
        description:
          'Cree paquetes de puzzles temáticos usando las 104 colecciones de imágenes — puzzles de animales, vehículos, comida, naturaleza y docenas más. Cada tema proporciona ilustraciones coloridas que producen desafíos atractivos de piezas faltantes. Empaqueta 15–25 puzzles por tema con claves de respuestas incluidas, variando la dificultad desde 1 pieza faltante con 2 opciones (fácil) hasta 5 piezas faltantes con 6 opciones (difícil). Mezcla formas de pieza dentro de un paquete para variedad visual: piezas cuadradas en algunos puzzles, circulares en otros, variantes de elipse para desafíos avanzados. La clave de respuestas automática elimina la mayor pérdida de tiempo en la producción de puzzles.',
        platform: 'Etsy (etsy.com)',
      },
      {
        title: 'Libros de Puzzles Visuales en Amazon KDP',
        description:
          'Compila 50–100 puzzles de piezas faltantes en un libro de trabajo impreso formateado para Amazon KDP. Estructura su libro con dificultad progresiva: el Capítulo 1 use 1 pieza faltante con 2 opciones para principiantes, el Capítulo 2 use 3 piezas faltantes con 4 opciones para nivel intermedio, y el Capítulo 3 use 5 piezas faltantes con 6 opciones incluyendo distractoras para resolvedores avanzados. Incluya claves de respuestas al final del libro usando la función de clave automática. La opción de escala de grises produce páginas optimizadas para tinta, listas para interiores de libros en blanco y negro. Los puzzles puramente visuales no requieren traducción, haciendo que un solo libro sea vendible en todos los mercados.',
        platform: 'Amazon KDP (kdp.amazon.com)',
      },
      {
        title: 'Actividades de Puzzles para venta en línea en Hotmart',
        description:
          'Cree actividades listas para usar de discriminación visual y pensamiento crítico para Hotmart. Los puzzles de piezas faltantes fortalecen el razonamiento espacial, el análisis visual y la atención al detalle — habilidades valoradas en los catálogos de productos de educación infantil y primaria. Cree conjuntos alineados con el catálogo de productos: puzzles de hábitats de animales, puzzles de escenas estacionales, puzzles de ayudantes comunitarios y puzzles de grupos de alimentos. Cada conjunto incluya fichas para usuarios y claves de respuestas en formatos PDF y JPEG. La dificultad configurable le permite crear versiones diferenciadas del mismo puzzle para tiendas con niveles mixtos.',
        platform: 'Hotmart (hotmart.com)',
      },
      {
        title: 'Colecciones de Puzzles Estacionales y Festivos',
        description:
          'Las 104 colecciones de imágenes temáticas cubren cada ocasión estacional y festiva — Navidad, Halloween, Pascua, Día de San Valentín, vuelta al colegio, vacaciones de verano y más. Cree colecciones de puzzles de disponible ahora que se alineen con los períodos de mayor demanda comercial. Lanza paquetes de puzzles de Halloween en septiembre, colecciones de Navidad en octubre y paquetes de San Valentín en enero. Varía las formas de pieza y los niveles de dificultad dentro de cada conjunto estacional para máximo valor. Los productos estacionales obtienen precios más altos durante sus ventanas de mayor demanda y crean razones naturales para compre recurrentes de su base de clientes.',
        platform: 'Etsy / Amazon KDP / Hotmart (estacional)',
      },
      {
        title: 'Alcance en el Mercado Global — Los Puzzles Visuales No Necesitan Traducción',
        description:
          'Los puzzles de Piezas Faltantes son puramente visuales sin contenido de texto en la ficha — sin palabras, sin letras, sin elementos dependientes del idioma. Un puzzle creado en inglés funciona idénticamente para clientes en Alemania, Francia, Japón o Brasil. Esto hace que sus productos de puzzles sean instantáneamente vendibles en todos los mercados internacionales sin crear versiones en diferentes idiomas. Publique el mismo paquete de puzzles en Etsy con títulos y descripciones multilingües para captar tráfico de búsqueda global. Un producto, todos los mercados — máximo alcance sin trabajo de producción adicional.',
        platform: 'Mercados globales (todas las plataformas)',
      },
    ],
  },

  faq: [
    {
      question: '¿Cómo funciona el mecanismo del puzzle de piezas faltantes?',
      answer:
        'El generador toma una imagen de la biblioteca (o su imagen subida) y recorta 1–5 piezas, dejando huecos blancos con contornos de trazo negro en las ubicaciones originales. Luego muestra 2–6 opciones de solución numeradas debajo o al lado del puzzle — las piezas correctas más piezas distractoras extraídas de otras áreas de la misma imagen. Los usuarios examinan los huecos y las opciones numeradas, luego identifican qué opción rellena cada espacio basándose en color, patrón y detalle visual.',
    },
    {
      question: '¿Cuáles son las 6 formas de pieza disponibles?',
      answer:
        'Puede elegir entre cuadrado (predeterminado), círculo, rectángulo vertical (80% ancho, 100% alto), rectángulo horizontal (100% ancho, 80% alto), elipse vertical (80% rx, 100% ry) y elipse horizontal (100% rx, 80% ry). Cada forma cree un desafío visual diferente. Cuadrado y círculo ofrecen cortes geométricos limpios, mientras que las variantes de rectángulo y elipse crean formas alargadas o curvas que interactúan de manera diferente con la imagen fuente.',
    },
    {
      question: '¿Cómo funcionan los ajustes de dificultad?',
      answer:
        'La dificultad se controla con dos configuraciones independientes. El número de piezas faltantes (1–5) determine cuántos huecos se recortan de la imagen — más piezas significa más razonamiento espacial. El número de opciones de solución (2–6) determine cuántas opciones numeradas evalúan los usuarios — cuando las opciones exceden las piezas faltantes, las extras son distractoras que requieren comparación visual cuidadosa. Un puzzle con 1 pieza faltante y 2 opciones es fácil; 5 piezas faltantes con 6 opciones es desafiante.',
    },
    {
      question: '¿Qué son las piezas distractoras y cómo se generan?',
      answer:
        'Las piezas distractoras son opciones de solución adicionales que no coinciden con ningún hueco del puzzle. Se extraen de diferentes áreas de la misma imagen fuente usando hasta 200 intentos de colocación cada una, asegurando que no se superpongan con las piezas correctas. Las distractoras evitan que los usuarios resuelvan solo por eliminación — deben comparar cuidadosamente colores, patrones y detalles visuales para distinguir las opciones correctas de alternativas de apariencia similar.',
    },
    {
      question: '¿Cómo funciona el algoritmo inteligente de extracción de piezas?',
      answer:
        'El algoritmo utiliza hasta 150 intentos para encontrar piezas con suficiente detalle visual. Cada pieza candidata se analice por varianza de brillo (umbral mínimo de 15) para asegurar que contenga suficiente información de color para ser identificable. Las piezas mantienen al menos 250 píxeles de distancia entre sí para evitar superposición. El tamaño de pieza se calcula como el 12% del ancho de la imagen con un mínimo de 50 píxeles. Este proceso automatizado garantiza que cada puzzle sea visualmente resoluble independientemente de la imagen fuente.',
    },
    {
      question: '¿Cómo funciona la clave de respuestas generada automáticamente?',
      answer:
        'El generador usa un sistema de doble lienzo con una pestaña de Ficha y una pestaña de Clave de Respuestas. La clave de respuestas muestra la misma imagen del puzzle con los huecos pero omite las opciones de solución. En su lugar, etiquetas numéricas resaltadas en amarillo (rgba(255,255,0,0.7)) se colocan dentro de cada hueco mostrando el índice de opción correcto basado en 1. El tamaño de fuente se escala al 60% del tamaño de la pieza para legibilidad clara. Descargue la clave de respuestas por separado usando los botones dedicados de JPEG de la Clave y PDF de la Clave.',
    },
    {
      question: '¿Son los puzzles de piezas faltantes sensibles al idioma?',
      answer:
        'No. Piezas Faltantes es un formato de puzzle puramente visual sin contenido de texto en la ficha — sin palabras, sin letras, sin elementos dependientes del idioma. El único elemento dependiente del idioma es el texto del encabezado generado automáticamente ("Piezas Faltantes" / "¡Encuentra y coloque las piezas faltantes!"), que está localizado en los 11 idiomas soportados. El puzzle en sí funciona idénticamente en cualquier idioma, haciéndolo ideal para mercados globales.',
    },
    {
      question: '¿Cómo funciona el sistema de doble borde?',
      answer:
        'Cada puzzle generado presenta dos bordes decorativos. El borde exterior use verde azulado brillante (#14B8A6) con un trazo de 8px, márgenes de 34px y radio de borde de 12px. El borde interior use rosa intenso (#EC4899) con un trazo de 3px, márgenes de 46,5px, radio de borde de 8px y un ligero desplazamiento de 2px a la derecha y 3px hacia abajo. Juntos crean un marco pulido y profesional que aumenta la calidad visual de sus fichas de puzzles para listados en tiendas en línea.',
    },
    {
      question: '¿Hay una prueba gratis?',
      answer:
        'Sí. Puede acceder a todas las funciones — las 6 formas de pieza, piezas faltantes y opciones de solución configurables, la clave de respuestas automática, la biblioteca de imágenes completa, temas de fondo y de borde, y todos los formatos de descargue — sin crear una cuenta, ingresar una tarjeta de crédito ni instalar ningún software. Las descargas de la prueba gratis incluyen una pequeña marca de agua. Una licencia comercial elimina la marca de agua y otorga derechos completos de venta.',
    },
    {
      question: '¿Puedo añadir temas de fondo y temas de borde a los puzzles?',
      answer:
        'Sí. El panel de Configuración de Página incluye un selector de tema de fondo con un control deslizante de opacidad (0–1 en pasos de 0,05) y un selector de tema de borde con su propio control deslizante de opacidad independiente. Los temas de fondo añaden patrones decorativos detrás del contenido del puzzle, mientras que los temas de borde enmarcan la página. Ambos tienen controles de opacidad separados para que puedas crear fondos sutiles con bordes prominentes, o cualquier combinación que se ajusta a su diseño.',
    },
    {
      question: '¿Puedo vender puzzles de piezas faltantes creados con esta herramienta en Etsy y Amazon KDP?',
      answer:
        'Sí. Con una licencia comercial, tiene plenos derechos para vender sus puzzles de piezas faltantes como descargue digitales en Etsy, como libros de trabajo impresos en Amazon KDP, como recursos para venta en línea en Hotmart o a través de cualquier otro canal de venta. Las 6 formas de pieza, la dificultad configurable, las claves de respuestas automáticas y las 104 colecciones de imágenes temáticas le dan las herramientas creativas para producir productos de puzzles originales y vendibles.',
    },
    {
      question: '¿Cuál es la política de reembolso?',
      answer:
        'Como la prueba gratis le da acceso a todas las funciones, no ofrecemos reembolsos en compre de licencias comerciales. Puede probar las 6 formas de pieza, los ajustes de dificultad configurables, la clave de respuestas automática, la biblioteca de imágenes completa, los temas de fondo y de borde, y todos los formatos de descargue antes de comprar. La prueba gratis es la política de reembolso — asegúrese de que la herramienta se adapte a sus necesidades antes de adquirir una licencia.',
    },
    {
      question: '¿Cuál es la diferencia entre la licencia Comercial y el Acceso Completo?',
      answer:
        'La licencia Comercial incluya 10 temas de imágenes coloridos con el idioma de interfaz en inglés solamente — ideal para empezar a vender puzzles de piezas faltantes rápidamente. El Acceso Completo desbloquea los 104 temas con más de 3.100 ilustraciones y los 11 idiomas de interfaz (inglés, alemán, francés, español, portugués, italiano, neerlandés, sueco, danés, noruego y finés) — perfecto para maximizar la variedad de productos y el alcance en mercados internacionales.',
    },
  ],

  internalLinks: [
    {
      pageType: 'app',
      slug: 'encuentra-el-diferente-fichas',
      anchorText: 'Generador de Fichas de Encuentra el Diferente',
    },
    {
      pageType: 'app',
      slug: 'sudoku-fichas-ninos',
      anchorText: 'Generador de Fichas de Sudoku',
    },
    {
      pageType: 'app',
      slug: 'laberintos-imagenes-fichas',
      anchorText: 'Generador de Fichas de Laberintos de Imágenes',
    },
    {
      pageType: 'app',
      slug: 'buscar-contar-fichas',
      anchorText: 'Generador de Fichas de Buscar y Contar',
    },
    {
      pageType: 'app',
      slug: 'asociacion-sombras-fichas',
      anchorText: 'Generador de Fichas de Asociación de Sombras',
    },
    {
      pageType: 'app',
      slug: 'sopa-letras-fichas',
      anchorText: 'Generador de Fichas de Sopa de Letras',
    },
    {
      pageType: 'bundle',
      slug: 'paquete-puzzles-logica',
      anchorText: 'Paquete de Puzzles y Lógica — Todas las Apps de Puzzles en Un Paquete',
    },
    {
      pageType: 'guide',
      slug: 'crear-puzzles-piezas-faltantes',
      anchorText: 'Cómo Crear y Vender Fichas de Puzzles en Línea',
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
  ],

  visuals: {
    heroImages: {
      primary: '/samples/spanish/missing%20pieces/piezas-perdidas-1.webp',
      primaryAlt: 'Ficha de puzzle de piezas faltantes con huecos recortados de una imagen y opciones de solución numeradas incluyendo distractoras',
    },
    sampleGallery: [
      {
        src: '/samples/spanish/missing%20pieces/piezas-perdidas-2.webp',
        alt: 'Puzzle de piezas faltantes con huecos cuadrados recortados de una ilustración colorida',
        caption: 'Forma de pieza cuadrada — cortes geométricos limpios para identificación visual clara',
      },
      {
        src: '/samples/spanish/missing%20pieces/piezas-perdidas-3.webp',
        alt: 'Puzzle de piezas faltantes con huecos circulares y opciones de solución numeradas',
        caption: 'Forma de pieza circular — cortes redondeados con opciones distractoras para mayor desafío',
      },
      {
        src: '/samples/spanish/missing%20pieces/piezas-perdidas-1-answer-key.webp',
        alt: 'Clave de respuestas del puzzle de piezas faltantes con números resaltados en amarillo dentro de cada hueco',
        caption: 'Clave de respuestas automática — etiquetas amarillas muestran la opción correcta para cada hueco',
      },
    ],
    youtubeId: 'gb-xE_Ay4fc',
    videoTitle: 'Cómo Crear Puzzles de Piezas Faltantes con 6 Formas y Claves de Respuestas Automáticas — Tutorial Paso a Paso',
  },
};

export default content;
