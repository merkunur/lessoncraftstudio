import type { AppContent } from '../types';

const content: AppContent = {
  seo: {
    primaryKeyword: 'generador de laberintos con imágenes para vender',
    secondaryKeywords: [
      'fichas de laberintos imprimibles para vendedores de Etsy',
      'generador de fichas de recorridos con imágenes para Amazon KDP',
      'creador de fichas de laberintos licencia comercial TPT',
      'vender fichas de laberintos y caminos en Etsy y Amazon',
    ],
    lsiKeywords: [
      'productos digitales de laberintos imprimibles para emprendedores',
      'generador de fichas de recorridos con imágenes uso comercial',
      'herramientas de negocio de fichas de puzzles y laberintos',
    ],
    titleTag: 'Generador de Laberintos | Crear Fichas de Caminos',
    metaDescription:
      'Crea fichas de laberintos para vender en Etsy, KDP y TPT. 3 modos de juego, algoritmo LPF, clave de respuesta automática, 104 temas. Prueba gratis.',
  },

  hero: {
    title: 'Generador de Fichas de Laberintos con Imágenes para Actividades de Caminos y Laberintos',
    tagline: 'Tres modos de juego en un solo generador — Camino de Imágenes, Laberinto Clásico y Elige el Camino Correcto — impulsado por el algoritmo LPF (Camino Más Largo Primero) con claves de respuesta automáticas, personalización de paredes y diseño completamente visual que funciona en todo el mundo sin traducción.',
    description:
      'Crea fichas profesionales de laberintos y recorridos con tres modos de juego distintos. Camino de Imágenes crea una cuadrícula de imágenes donde los alumnos siguen el camino correcto desde el inicio hasta el final identificando las imágenes del camino entre distractores. Laberinto Clásico genera laberintos con paredes usando el algoritmo LPF (Camino Más Largo Primero) con imágenes coleccionables dispersas por los pasillos — configura tamaños de cuadrícula de 15×15 a 20×20, establece de 1 a 3 caminos con bloqueo de callejones sin salida, y personaliza el color, grosor (1–10px) y opacidad (10–100%) de las paredes. Elige el Camino Correcto presenta laberintos de tres caminos con cuatro opciones direccionales (de abajo hacia arriba, de arriba hacia abajo, de izquierda a derecha, de derecha a izquierda) donde los alumnos identifican el único camino correcto entre señuelos. Cada modo genera una clave de respuesta complementaria en una pestaña de lienzo separada — los caminos de solución se resaltan con círculos rosas a lo largo de la ruta correcta, y el modo Elige el Camino añade una etiqueta «✓ CORRECT PATH». Asigna imágenes a cinco roles distintos: Inicio, Fin, Camino, Distractor y Decoración. Explora 104 colecciones temáticas con más de 3100 ilustraciones o sube las tuyas propias. El encabezado «Camino de Imágenes» generado automáticamente con borde naranja muestra títulos e instrucciones localizados en los 11 idiomas soportados. Añade temas de fondo y de borde con controles de opacidad independientes, incluye campos de nombre y fecha, y exporta PDF y JPEG listos para imprimir a 300 DPI en formato Carta, A4, Cuadrado (1200×1200) o tamaños personalizados. Camino de Imágenes es completamente visual — los laberintos no requieren lectura ni comprensión lingüística, haciendo cada ficha vendible instantáneamente en cualquier mercado del mundo. Prueba gratis con todas las funciones — sin registro, sin tarjeta de crédito. Las descargas incluyen una marca de agua; compra una licencia para eliminarla.',
  },

  howItWorks: {
    title: 'Cómo Crear Fichas de Laberintos en 5 Pasos',
    steps: [
      {
        title: 'Configura el diseño de página',
        description:
          'Abre el panel de Página y Escena y elige un tamaño de página: Carta Vertical, Carta Horizontal, A4 Vertical, A4 Horizontal, Cuadrado (1200×1200) o cualquier dimensión personalizada. Selecciona un color de página con el selector de color. Elige un tema de fondo y ajusta su opacidad, luego selecciona un tema de borde con su propio control de opacidad independiente. Estas opciones de diseño enmarcan tu ficha de laberinto antes de configurar cualquier modo de juego.',
      },
      {
        title: 'Elige tu modo de juego y configura los ajustes',
        description:
          'Abre el panel de Configuración de Recorrido y selecciona uno de los tres modos de juego. Camino de Imágenes crea una cuadrícula de imágenes con un único camino correcto desde el inicio hasta el final. Laberinto Clásico genera laberintos con paredes usando el algoritmo LPF — configura el tamaño de cuadrícula (15×15 a 20×20), número de caminos (1, 2 o 3), cantidad y copias de imágenes coleccionables, color de pared, grosor (1–10px) y opacidad (10–100%). Elige el Camino Correcto crea laberintos de tres caminos con cuatro opciones direccionales. Activa «Incluir Campos de Nombre/Fecha» para añadir líneas de nombre y fecha del alumno.',
      },
      {
        title: 'Selecciona imágenes por rol desde la biblioteca',
        description:
          'Abre el panel de Biblioteca de Imágenes y asigna imágenes a cinco roles distintos usando el selector de rol: Imagen de Inicio (marcador del punto de entrada), Imagen de Fin (destino — 1 para Camino/Laberinto, 3 para Elige el Camino), Imágenes de Camino (ruta correcta o coleccionables), Imágenes Distractoras (relleno de celdas no pertenecientes al camino) y Decoración (colocación libre en el lienzo). Explora 104 colecciones temáticas con más de 3100 ilustraciones, filtra por tema o busca por palabra clave. Sube imágenes personalizadas en formato PNG, JPG o GIF para usar junto con el contenido de la biblioteca.',
      },
      {
        title: 'Genera la ficha de laberinto o recorrido',
        description:
          'Haz clic en Generar para crear el diseño del laberinto en tu modo de juego seleccionado. Camino de Imágenes organiza las imágenes en una cuadrícula con un camino correcto marcado por imágenes del camino entre distractores. Laberinto Clásico construye pasillos con paredes e imágenes coleccionables colocadas a lo largo de los caminos. Elige el Camino Correcto construye tres rutas distintas con un camino correcto y alternativas señuelo. El encabezado «Camino de Imágenes» generado automáticamente aparece en la parte superior con un borde exterior naranja, título localizado e instrucciones en el idioma seleccionado.',
      },
      {
        title: 'Genera la clave de respuesta y descarga',
        description:
          'Cambia a la pestaña Clave de Respuesta para ver la solución generada automáticamente. La clave de respuesta resalta el camino correcto con círculos rosas a lo largo de la ruta. El modo Elige el Camino añade una etiqueta «✓ CORRECT PATH» en el camino correcto. Laberinto Clásico incluye una leyenda de coleccionables mostrando los recuentos de imágenes. Descarga usando cuatro botones dedicados: JPEG de la Ficha, JPEG de la Clave, PDF de la Ficha y PDF de la Clave a 300 DPI. Activa la escala de grises para versiones que ahorran tinta. Cada exportación está lista para producción en listados de Etsy, interiores de Amazon KDP y archivos de productos de TPT.',
      },
    ],
  },

  keyFeatures: {
    title: 'Características Clave del Generador de Laberintos con Imágenes',
    features: [
      {
        title: 'Tres Modos de Juego: Camino de Imágenes, Laberinto Clásico y Elige el Camino Correcto',
        description:
          'Un solo generador produce tres tipos distintos de actividades de laberintos. Camino de Imágenes crea una cuadrícula de imágenes donde los alumnos siguen el camino correcto desde el inicio hasta el final identificando las imágenes del camino entre distractores — ideal para alumnos más pequeños y tareas de discriminación visual. Laberinto Clásico genera laberintos profesionales con paredes usando el algoritmo LPF con imágenes coleccionables dispersas por los pasillos para mayor interacción. Elige el Camino Correcto presenta laberintos de tres caminos donde los alumnos identifican la única ruta correcta entre señuelos, con cuatro opciones direccionales: de abajo hacia arriba, de arriba hacia abajo, de izquierda a derecha y de derecha a izquierda. Cada modo ofrece un desafío cognitivo diferente desde la misma biblioteca de imágenes, dándote tres líneas de productos con una sola herramienta.',
      },
      {
        title: 'Algoritmo Profesional LPF con Puntuación de Calidad y Bloqueo de Callejones Sin Salida',
        description:
          'El algoritmo LPF (Camino Más Largo Primero) genera laberintos con paredes de alta calidad usando un sistema de celdas de pasillo con colocación dinámica de paredes. La puntuación de calidad del camino evalúa giros, longitud y bloqueos para asegurar laberintos desafiantes pero resolubles cada vez. El soporte multicamino crea 1, 2 o 3 caminos con bloqueo automático de callejones sin salida en las rutas incorrectas. Configura longitudes mínimas y máximas del camino (4–30 celdas, predeterminado 8–12) para un control preciso de la dificultad. Los tamaños de cuadrícula van de 15×15 a 20×20, y el posicionamiento de inicio/fin consciente de las paredes asegura puntos de entrada y salida limpios. Este enfoque algorítmico produce laberintos que rivalizan en calidad con los diseñados a mano.',
      },
      {
        title: 'Cinco Roles de Imagen: Inicio, Fin, Camino, Distractor y Decoración',
        description:
          'Cada imagen colocada en la ficha cumple un rol específico en el diseño del laberinto. La Imagen de Inicio marca el punto de entrada. Las Imágenes de Fin marcan el destino — una para los modos Camino y Laberinto Clásico, tres para Elige el Camino Correcto. Las Imágenes de Camino definen la ruta correcta en el modo Camino o aparecen como coleccionables en Laberinto Clásico. Las Imágenes Distractoras rellenan las celdas que no pertenecen al camino para crear desafío visual. Las imágenes de Decoración se colocan libremente en el lienzo para mayor atractivo visual. El selector de roles en el panel de Biblioteca de Imágenes te permite asignar y reasignar roles rápidamente, con paneles dedicados que muestran las imágenes seleccionadas para cada rol.',
      },
      {
        title: 'Diseño de Paredes Personalizable con Controles de Color, Grosor y Opacidad',
        description:
          'Los modos Laberinto Clásico y Elige el Camino Correcto ofrecen personalización completa de paredes. Elige cualquier color de pared usando el selector de color. Ajusta el grosor de la pared de 1 a 10 píxeles (predeterminado 3px) para líneas elegantes y finas o paredes gruesas adaptadas a niños. Establece la opacidad de la pared del 10% al 100% (predeterminado 100%) para límites sutiles o prominentes del laberinto. Estos controles te permiten crear estilos visuales distintos — paredes grises finas para libros de puzzles sofisticados, paredes gruesas y coloridas para alumnos pequeños, o paredes semitransparentes para efectos de diseño en capas. Los ajustes de pared persisten entre regeneraciones del laberinto hasta que los cambies.',
      },
      {
        title: 'Clave de Respuesta Automática con Resaltado del Camino de Solución',
        description:
          'Cada ficha de laberinto genera automáticamente una clave de respuesta complementaria en una pestaña de lienzo separada. La clave de respuesta reproduce el diseño exacto del laberinto y resalta el camino de solución correcto con círculos rosas colocados a lo largo de la ruta. El modo Elige el Camino Correcto añade una etiqueta «✓ CORRECT PATH» identificando la ruta correcta entre las tres opciones. El modo Laberinto Clásico incluye una leyenda de coleccionables mostrando el recuento de cada imagen coleccionable encontrada a lo largo del camino. Las flechas de inicio y fin aparecen en las celdas correspondientes. Descarga la clave de respuesta por separado como answer_key.jpeg o answer_key.pdf junto con la ficha del alumno.',
      },
      {
        title: 'Biblioteca de Imágenes con 104 Colecciones Temáticas y Más de 3100 Ilustraciones',
        description:
          'Explora 104 colecciones temáticas de imágenes que cubren animales, comida, vehículos, naturaleza, profesiones, festividades, deportes, estaciones y docenas más. Cada tema proporciona ilustraciones coordinadas que funcionan juntas en actividades de laberintos — laberintos de animales donde los alumnos siguen gatos a través de una cuadrícula de distractores animales, laberintos festivos con coleccionables temáticos, y más. Filtra por tema usando el menú desplegable o busca imágenes específicas por palabra clave. El nivel Comercial incluye 10 temas coloridos para comenzar; el Acceso Completo desbloquea los 104 temas para máxima variedad creativa en los tres modos de juego.',
      },
      {
        title: 'Exportación PDF y JPEG Lista para Imprimir a 300 DPI con Opción de Escala de Grises',
        description:
          'Descarga fichas de laberintos y claves de respuesta como imágenes JPEG de alta resolución o documentos PDF listos para imprimir renderizados a 300 DPI con un multiplicador 6× para detalles nítidos. Cuatro botones de descarga dedicados exportan la ficha y la clave de respuesta por separado como JPEG y PDF. Los tamaños de página incluyen Carta Vertical, Carta Horizontal, A4 Vertical, A4 Horizontal, Cuadrado (1200×1200) y dimensiones completamente personalizadas. Activa la escala de grises para versiones que ahorran tinta manteniendo la claridad de las paredes del laberinto. Cada exportación está lista para producción en descargas digitales, cuadernos impresos y materiales para el aula.',
      },
      {
        title: 'Edición Completa del Lienzo con Herramientas de Texto, Campos de Nombre/Fecha e Historial de Deshacer',
        description:
          'El lienzo Fabric.js proporciona control completo sobre cada elemento de tu ficha de laberinto. Arrastra, redimensiona, rota y reposiciona imágenes, texto y contenido del laberinto generado libremente. Añade texto personalizado con siete opciones de fuente (Lexend Deca, Baloo 2, Nunito, Quicksand, Fredoka, Arial, Verdana), tamaño y color ajustables, y ancho de contorno de texto de 0 a 10 con granularidad de 0,5 pasos. Activa los campos de nombre y fecha para añadir líneas de identificación del alumno. Amplía y reduce o restablece al 100% para trabajo de detalle. Deshaz y rehaz hasta 20 estados del historial con Ctrl+Z y Ctrl+Y. Los controles de capas gestionan el orden de apilamiento para una disposición precisa de los elementos.',
      },
    ],
  },

  businessUseCases: {
    title: 'Cómo Vender Fichas de Laberintos en Línea',
    cases: [
      {
        title: 'Paquetes Temáticos de Actividades de Laberintos en Etsy',
        description:
          'Crea paquetes temáticos de laberintos usando las 104 colecciones de imágenes — laberintos de animales, laberintos festivos, laberintos de granja, laberintos del océano y docenas más. Cada tema proporciona suficientes ilustraciones para múltiples fichas de laberintos únicas en los tres modos de juego. Empaqueta 10–20 fichas de laberintos por tema con claves de respuesta incluidas, mezclando Camino de Imágenes, Laberinto Clásico y Elige el Camino Correcto para variedad dentro de cada paquete. Varía la dificultad ajustando tamaños de cuadrícula y cantidad de caminos. Vende a $3–$7 por paquete. La clave de respuesta automática elimina el mayor consumo de tiempo en la producción de fichas de laberintos.',
        platform: 'Etsy (etsy.com)',
      },
      {
        title: 'Cuadernos de Actividades de Laberintos en Amazon KDP',
        description:
          'Compila 40–80 fichas de laberintos en un cuaderno impreso formateado para Amazon KDP. Estructura tu libro por dificultad progresiva: comienza con laberintos de Camino de Imágenes para principiantes, avanza a Laberinto Clásico con cuadrículas de 15×15 y 1 camino, luego aumenta a cuadrículas de 20×20 con 3 caminos para resolvedores avanzados. Incluye claves de respuesta al final del libro. La opción de escala de grises produce páginas que ahorran tinta listas para interiores de libros en blanco y negro. Los libros de laberintos son una categoría comprobada en KDP — el formato completamente visual significa que cada libro funciona para compradores en todo el mundo sin traducción.',
        platform: 'Amazon KDP (kdp.amazon.com)',
      },
      {
        title: 'Actividades de Lógica y Resolución de Problemas para TPT',
        description:
          'Crea fichas de laberintos listas para usar con campos de nombre/fecha y claves de respuesta impresas para uso en el aula. Los profesores que buscan actividades de lógica en TPT valoran fichas que desarrollan razonamiento espacial y habilidades de resolución de problemas. Crea conjuntos alineados con el currículo: actividades de recorridos de hábitats de animales, colecciones de laberintos estacionales y paquetes de laberintos con dificultad progresiva. El modo Laberinto Clásico con imágenes coleccionables añade práctica de conteo junto con la resolución de caminos. Cada conjunto incluye fichas del alumno y claves de respuesta en formatos PDF y JPEG para uso flexible en el aula.',
        platform: 'Teachers Pay Teachers (teacherspayteachers.com)',
      },
      {
        title: 'Colecciones de Laberintos Estacionales y Festivos',
        description:
          'Las 104 colecciones temáticas de imágenes cubren cada ocasión estacional y festiva — Navidad, Halloween, Pascua, San Valentín, vuelta al cole, vacaciones de verano y más. Crea colecciones de laberintos por tiempo limitado que se alineen con los períodos de mayor demanda. Lanza paquetes de laberintos de Halloween en septiembre, colecciones de Navidad en octubre y paquetes de San Valentín en enero. Incluye los tres modos de juego en cada conjunto estacional para máximo valor. Los productos estacionales tienen precios más altos durante los períodos pico y crean razones naturales para compras repetidas de clientes recurrentes.',
        platform: 'Etsy / Amazon KDP / TPT (estacional)',
      },
      {
        title: 'Atractivo para el Mercado Global con Diseño Visual de Laberintos',
        description:
          'Las fichas de laberintos son completamente visuales — los alumnos navegan caminos, siguen imágenes y resuelven puzzles espaciales sin leer ningún texto. Esto hace que cada ficha de laberinto sea vendible instantáneamente en cualquier mercado del mundo sin traducción ni localización. Lista el mismo paquete de laberintos en tiendas internacionales de Etsy, publica cuadernos de laberintos dirigidos a mercados de Amazon en otros idiomas y alcanza compradores globales de TPT. El encabezado generado automáticamente se traduce a 11 idiomas automáticamente, pero el contenido del laberinto en sí es universalmente comprensible. Un producto, mercados ilimitados.',
        platform: 'Todas las plataformas (global)',
      },
    ],
  },

  faq: [
    {
      question: '¿Cuáles son los tres modos de juego y en qué se diferencian?',
      answer:
        'El generador ofrece tres modos distintos. Camino de Imágenes crea una cuadrícula de imágenes donde los alumnos siguen el camino correcto desde el inicio hasta el final identificando las imágenes del camino entre distractores. Laberinto Clásico genera laberintos con paredes usando el algoritmo LPF con imágenes coleccionables, tamaños de cuadrícula configurables (15×15 a 20×20) y de 1 a 3 caminos con bloqueo de callejones sin salida. Elige el Camino Correcto presenta laberintos de tres caminos con cuatro opciones direccionales donde los alumnos identifican la única ruta correcta. Cada modo produce un desafío diferente de razonamiento espacial desde la misma biblioteca de imágenes.',
    },
    {
      question: '¿Cómo funciona el algoritmo LPF de laberintos?',
      answer:
        'El algoritmo LPF (Camino Más Largo Primero) es un sistema profesional de generación de laberintos con paredes. Usa una estructura de celdas de pasillo con colocación dinámica de paredes para crear laberintos desafiantes pero resolubles. La puntuación de calidad del camino evalúa giros, longitud y bloqueos. El soporte multicamino genera 1, 2 o 3 caminos con bloqueo automático de callejones sin salida en las rutas incorrectas. Puedes configurar longitudes mínimas y máximas del camino (4–30 celdas, predeterminado 8–12), tamaños de cuadrícula de 15×15 a 20×20, y el posicionamiento de inicio/fin consciente de las paredes asegura puntos de entrada y salida limpios.',
    },
    {
      question: '¿Cuáles son los cinco roles de imagen y cómo se asignan?',
      answer:
        'Cada imagen cumple un rol específico en el diseño del laberinto. La Imagen de Inicio marca el punto de entrada. La Imagen de Fin marca el destino (1 para Camino y Laberinto Clásico, 3 para Elige el Camino Correcto). Las Imágenes de Camino definen la ruta correcta o aparecen como coleccionables. Las Imágenes Distractoras rellenan las celdas que no pertenecen al camino. Las imágenes de Decoración se colocan libremente en el lienzo. Usa el selector de roles en la parte superior del panel de Biblioteca de Imágenes para elegir un rol, luego haz clic en las imágenes para asignarlas. Los paneles dedicados debajo muestran las imágenes seleccionadas para cada rol.',
    },
    {
      question: '¿Cómo funciona la personalización de paredes en los modos Laberinto Clásico y Elige el Camino?',
      answer:
        'Ambos modos de laberinto ofrecen tres controles de pared. Color de Pared usa un selector de color para establecer cualquier color. Grosor de Pared se ajusta de 1 a 10 píxeles (predeterminado 3px). Opacidad de Pared va del 10% al 100% (predeterminado 100%). Estos ajustes te permiten crear paredes grises finas para libros de puzzles sofisticados, paredes gruesas y coloridas para alumnos pequeños, o paredes semitransparentes para efectos en capas. Los ajustes persisten entre regeneraciones del laberinto.',
    },
    {
      question: '¿Cuáles son las opciones direccionales en el modo Elige el Camino Correcto?',
      answer:
        'Elige el Camino Correcto ofrece cuatro opciones direccionales que determinan el flujo del laberinto: De Abajo hacia Arriba (predeterminado), De Arriba hacia Abajo, De Izquierda a Derecha y De Derecha a Izquierda. La dirección controla dónde aparecen las posiciones de inicio y fin y cómo fluyen los caminos a través de la cuadrícula. Los tamaños de cuadrícula van de 15×15 a 20×20. El modo requiere 3 Imágenes de Fin (autoseleccionadas del tema) y genera 1 camino correcto más alternativas señuelo.',
    },
    {
      question: '¿Cómo funciona el sistema de coleccionables en el modo Laberinto Clásico?',
      answer:
        'Laberinto Clásico dispersa imágenes coleccionables por los pasillos del laberinto. Configura el número de tipos de imágenes coleccionables (1, 2, 3 o 4 — predeterminado 4), copias mínimas por imagen (1, 2 o 3 — predeterminado 1) y copias máximas por imagen (1–10 — predeterminado 10). La clave de respuesta incluye una leyenda de coleccionables mostrando cada imagen y su recuento a lo largo del camino de solución. Los coleccionables añaden práctica de conteo y observación junto con la actividad de resolución del laberinto.',
    },
    {
      question: '¿Cómo funciona la clave de respuesta generada automáticamente?',
      answer:
        'El generador usa un sistema de doble lienzo con una pestaña de Ficha y una pestaña de Clave de Respuesta. La clave de respuesta reproduce el diseño exacto del laberinto y resalta el camino de solución correcto con círculos rosas colocados a lo largo de la ruta. El modo Elige el Camino Correcto añade una etiqueta «✓ CORRECT PATH» en la ruta correcta. Laberinto Clásico incluye una leyenda de coleccionables. Descarga ambas versiones por separado usando cuatro botones dedicados: JPEG de la Ficha, JPEG de la Clave, PDF de la Ficha y PDF de la Clave.',
    },
    {
      question: '¿Cómo funciona el encabezado generado automáticamente?',
      answer:
        'Cada ficha incluye un encabezado estilizado con un borde exterior naranja (trazo de 8px) y márgenes de 34px. El título «Camino de Imágenes» y la descripción «¡Sigue el camino desde el inicio hasta el final!» se traducen automáticamente a los 11 idiomas soportados. Las fichas en vertical muestran un encabezado de 240px; las fichas en horizontal usan un diseño compacto de 165px. El encabezado se renderiza en texto localizado para inglés, alemán (Bilderpfad), francés (Chemin d'Images), español (Camino de Imágenes) y todos los demás idiomas soportados.',
    },
    {
      question: '¿Hay una prueba gratis?',
      answer:
        'Sí. Puedes acceder a todas las funciones — los tres modos de juego, el algoritmo LPF de laberintos, cinco roles de imagen, personalización de paredes, la clave de respuesta automática, la biblioteca completa de imágenes, temas de fondo y borde, campos de nombre/fecha y todos los formatos de descarga — sin crear una cuenta, ingresar una tarjeta de crédito ni instalar ningún software. Las descargas de la prueba gratis incluyen una pequeña marca de agua. Una licencia comercial elimina la marca de agua y otorga derechos completos de venta.',
    },
    {
      question: '¿Las fichas de Camino de Imágenes dependen del idioma?',
      answer:
        'No. A diferencia de los generadores basados en palabras, las fichas de Camino de Imágenes son completamente visuales. Los alumnos navegan laberintos y siguen caminos de imágenes sin leer ningún texto. El encabezado generado automáticamente se traduce a 11 idiomas, pero el contenido del laberinto en sí no requiere comprensión lingüística. Esto hace que cada ficha sea utilizable y vendible instantáneamente en cualquier mercado del mundo sin modificación.',
    },
    {
      question: '¿Puedo vender fichas de laberintos creadas con esta herramienta en Etsy y Amazon KDP?',
      answer:
        'Sí. Con una licencia comercial, tienes derechos completos para vender tus fichas de laberintos como descargas digitales en Etsy, como cuadernos impresos en Amazon KDP, como recursos para el aula en TPT o a través de cualquier otro canal de venta. Los tres modos de juego, el algoritmo LPF, las 104 colecciones temáticas de imágenes y el formato completamente visual te dan las herramientas para producir productos de laberintos originales y vendibles a nivel global.',
    },
    {
      question: '¿Cuál es la política de reembolso?',
      answer:
        'Dado que la prueba gratis te da acceso a todas las funciones, no ofrecemos reembolsos en compras de licencias comerciales. Puedes probar los tres modos de juego, el algoritmo LPF de laberintos, cinco roles de imagen, personalización de paredes, la clave de respuesta automática, la biblioteca completa de imágenes, temas de fondo y borde, campos de nombre/fecha y todos los formatos de descarga antes de comprar. La prueba gratis es la política de reembolso — asegúrate de que la herramienta se adapta a tus necesidades antes de adquirir una licencia.',
    },
  ],

  internalLinks: [
    {
      pageType: 'app',
      slug: 'piezas-faltantes-fichas',
      anchorText: 'Generador de Fichas de Piezas Faltantes',
    },
    {
      pageType: 'app',
      slug: 'encuentra-el-diferente-fichas',
      anchorText: 'Generador de Fichas de Encuentra el Diferente',
    },
    {
      pageType: 'app',
      slug: 'sudoku-fichas-ninos',
      anchorText: 'Generador de Fichas de Sudoku con Imágenes',
    },
    {
      pageType: 'app',
      slug: 'buscar-contar-fichas',
      anchorText: 'Generador de Fichas de Buscar y Contar',
    },
    {
      pageType: 'app',
      slug: 'busqueda-tesoro-fichas',
      anchorText: 'Generador de Fichas de Búsqueda del Tesoro',
    },
    {
      pageType: 'bundle',
      slug: 'paquete-puzzles-logica',
      anchorText: 'Paquete de Puzzles y Lógica — Todas las Apps de Puzzles en Un Solo Paquete',
    },
    {
      pageType: 'tool',
      slug: 'generador-recorrido-imagenes',
      anchorText: 'Creador de Laberintos con Imágenes',
    },
    {
      pageType: 'start',
      slug: 'guia-completa-negocio-imprimibles',
      anchorText: 'La Guía Completa para Iniciar un Negocio de Imprimibles',
    },
    {
      pageType: 'guide',
      slug: 'crear-fichas-laberintos',
      anchorText: 'Cómo Crear y Vender Fichas de Laberintos',
    },
    {
      pageType: 'idea',
      slug: 'animales-granja-ideas-imprimibles',
      anchorText: 'Ideas de Imprimibles de Laberintos y Caminos con Imágenes',
    },
  ],

  visuals: {
    heroImages: {
      primary: '/samples/english/picture path/Picture Pathway.webp',
      primaryAlt: 'Ficha de laberinto con imágenes temáticas en una cuadrícula con borde naranja y encabezado Camino de Imágenes generado automáticamente',
    },
    sampleGallery: [
      {
        src: '/samples/english/picture path/Picture Pathway (1).webp',
        alt: 'Ficha del modo Camino de Imágenes con imágenes organizadas en una cuadrícula mostrando el camino correcto desde el inicio hasta el final',
        caption: 'Modo Camino de Imágenes — los alumnos siguen el camino correcto de imágenes desde el inicio hasta el final',
      },
      {
        src: '/samples/english/picture path/Picture Pathway (5).webp',
        alt: 'Ficha del modo Laberinto Clásico con pasillos de paredes e imágenes coleccionables dispersas por todo el laberinto',
        caption: 'Modo Laberinto Clásico — el algoritmo LPF genera laberintos con paredes e imágenes coleccionables',
      },
      {
        src: '/samples/english/picture path/Picture Pathway answer_key.webp',
        alt: 'Clave de respuesta del laberinto con el camino de solución resaltado por círculos rosas a lo largo de la ruta correcta',
        caption: 'Clave de respuesta generada automáticamente — el camino de solución resaltado con círculos rosas',
      },
    ],
    youtubeId: 'Sl1o0uPBDCg',
    videoTitle: 'Cómo Crear Fichas de Laberintos con 3 Modos de Juego y Algoritmo LPF — Tutorial Paso a Paso',
  },
};

export default content;
