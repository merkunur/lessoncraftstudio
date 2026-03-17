import type { ToolContent } from '../types';

const content: ToolContent = {
  seo: {
    primaryKeyword: 'generador tarjetas de bingo',
    secondaryKeywords: [
      'creador de tarjetas de bingo para vendedores uso comercial',
      'crear tarjetas de bingo para vender en Etsy y KDP',
      'generador de fichas de bingo imprimibles uso comercial',
      'herramienta de bingo con generación por lotes y exportación ZIP',
    ],
    lsiKeywords: [
      'generador de bingo por lotes con exportación ZIP y JSZip',
      'creador de bingo doble modo relleno imagen y palabra',
      'hoja de referencia bingo con cuadrícula dinámica de palabras',
    ],
    titleTag: 'Generador Tarjetas de Bingo | Crear y Vender',
    metaDescription: 'Crea tarjetas de bingo con cuadrículas de 3×3 a 5×5, lotes de 10 tarjetas únicas, exportación ZIP, hojas de referencia y 104 temas. Prueba con marca de agua.',
  },

  hero: {
    title: 'Generador de Tarjetas de Bingo',
    tagline: 'Generador de tarjetas de bingo con imágenes con cuadrículas configurables de 3×3 a 5×5, generación por lotes de 1–10 tarjetas únicas por set, exportación ZIP de todas las tarjetas en una sola descarga, doble modo de relleno para celdas y fichas circulares de forma independiente, hoja de referencia dedicada con cuadrícula dinámica de palabras, selección personalizada de referencia con contador en vivo y 104 colecciones temáticas de imágenes para tarjetas de bingo que se venden en todo el mundo',
    description: 'Crea tarjetas de bingo profesionales con imágenes donde cada jugador recibe una tarjeta única con diferentes imágenes en diferentes posiciones — esencial para que el bingo funcione como juego. Configura filas de 3 a 5 y columnas de 3 a 5 de forma independiente, creando cuadrículas desde 3×3 (9 celdas) hasta 5×5 (25 celdas) con un valor por defecto de 4×4 (16 celdas). Genera de 1 a 10 tarjetas de bingo únicas por lote, cada una extrayendo una selección aleatoria diferente del conjunto de imágenes para que ninguna tarjeta comparta el mismo diseño. Exporta todas las tarjetas generadas como JPEGs individuales en un solo archivo bingo_cards.zip usando compresión JSZip — un clic descarga un set completo de tarjetas de bingo listo para empaquetar en productos de mercado. Elige relleno de Imagen o Palabra de forma independiente para las celdas de la tarjeta y las fichas circulares, creando cuatro estilos distintos de tarjeta de bingo desde un solo generador. El relleno de Imagen muestra ilustraciones temáticas; el relleno de Palabra muestra nombres localizados de las imágenes de la Biblioteca de Imágenes, haciendo que el Generador de Tarjetas de Bingo sea sensible al idioma — al cambiar de idioma se actualizan las palabras en tarjetas, fichas y la hoja de referencia. Las fichas circulares presentan bordes punteados (#666, strokeDashArray [5,5]) y se barajan usando el ordenamiento Fisher-Yates para que nunca reflejen la disposición de la cuadrícula de la tarjeta, asegurando un juego de bingo auténtico donde las fichas sirven como referencia de asociación en lugar de revelar posiciones. Una hoja de referencia dedicada en una pestaña separada muestra una cuadrícula dinámica de palabras para el cantante — las columnas se calculan según la longitud de la palabra más larga (2–6 columnas) con tamaño de fuente uniforme en todas las entradas para una legibilidad limpia. Activa la selección personalizada de referencia para elegir imágenes específicas para el conjunto de referencia con un contador en vivo que muestra tu recuento de selección, dándote control preciso de alineación curricular sobre qué elementos aparecen en el juego. Navega 104 colecciones temáticas con más de 3.100 ilustraciones o sube tus propias imágenes PNG, JPG o GIF. Aplica fondos temáticos y bordes temáticos con controles de opacidad independientes (0–1, paso 0,05). Añade texto personalizado con 7 opciones de fuente (Lexend Deca, Baloo 2, Nunito, Quicksand, Fredoka, Arial, Verdana) y contorno de texto 0–10. Exporta ficha JPEG, hoja de referencia JPEG, ficha PDF y hoja de referencia PDF a 300 DPI (multiplicador 6×, calidad JPEG 1,0), más la exportación ZIP por lotes para todas las tarjetas. Elige Carta, A4, Cuadrado (1200×1200) o tamaños personalizados con opción de escala de grises para salida con ahorro de tinta. El área de la cuadrícula usa el 60% de la altura disponible del lienzo (límite de 500px) para proporciones óptimas de tarjeta. Edita todo en el lienzo de Fabric.js con herramientas de alineación, capas, bloqueo/desbloqueo, zoom 50%–200% en incrementos del 10% y deshacer/rehacer 20 estados. La prueba gratuita incluye todas las funciones con una marca de agua en las descargas. Compra una licencia para eliminar la marca de agua y vender con uso comercial.',
  },

  tutorial: {
    title: 'Cómo Crear Tarjetas de Bingo con Imágenes en 8 Pasos',
    steps: [
      {
        title: 'Abre el Generador de Tarjetas de Bingo',
        description: 'Haz clic en "Prueba Gratis Ahora" para abrir el generador de tarjetas de bingo en tu navegador. La herramienta carga instantáneamente con una barra lateral de ajustes a la izquierda y un lienzo de doble pestaña a la derecha — una pestaña para la tarjeta de bingo con fichas y otra para la hoja de referencia. Sin crear cuenta, sin descargar software, sin instalación — empieza a crear tarjetas de bingo de inmediato.',
      },
      {
        title: 'Configura el Tamaño de Cuadrícula y la Cantidad de Tarjetas',
        description: 'Abre el panel de Configuración de Tarjeta de Bingo y establece filas (3–5) y columnas (3–5) de forma independiente para definir el tamaño de tu cuadrícula — el valor por defecto es 4×4 con 16 celdas. Una cuadrícula de 3×3 es ideal para rondas rápidas de bingo con menos elementos a rastrear, mientras que una cuadrícula de 5×5 ofrece la experiencia clásica de bingo con 25 celdas. Establece la cantidad de tarjetas de 1 a 10 para generar por lotes múltiples tarjetas de bingo únicas. Cada tarjeta extrae una selección aleatoria diferente del conjunto de imágenes, garantizando que cada tarjeta del lote sea única — esencial para bingo donde cada jugador necesita una tarjeta diferente.',
      },
      {
        title: 'Elige los Modos de Relleno para Celdas y Fichas',
        description: 'Selecciona el relleno de celdas (Imagen o Palabra) y el relleno de fichas (Imagen o Palabra) de forma independiente en el panel de Configuración de Tarjeta de Bingo. El relleno de Imagen muestra ilustraciones temáticas en las celdas de la cuadrícula o en las fichas circulares. El relleno de Palabra muestra nombres localizados de las imágenes como texto — al cambiar el idioma de la aplicación se actualizan todas las palabras en tarjetas, fichas y la hoja de referencia. Mezcla modos para variedad creativa: tarjetas con imágenes y fichas con palabras crean un desafío de asociación visual-a-texto, tarjetas con palabras y fichas con imágenes invierten la dinámica, y combinar ambos iguales crea una experiencia de bingo puramente visual o puramente textual. Cuatro estilos distintos de tarjeta de bingo desde un solo generador.',
      },
      {
        title: 'Selecciona Imágenes de la Biblioteca',
        description: 'Abre el panel de Biblioteca de Imágenes y navega 104 colecciones temáticas con más de 3.100 ilustraciones a color — animales, comida, vehículos, naturaleza, festividades, profesiones y docenas más. Filtra por tema usando el menú desplegable o busca por palabra clave. Haz clic en las imágenes para seleccionarlas para tus tarjetas de bingo. Activa la casilla "Usar selección personalizada" para elegir imágenes específicas para el conjunto de referencia — un contador en vivo muestra tu recuento de selección mientras eliges. La selección personalizada de referencia te da control preciso sobre qué elementos aparecen en el juego de bingo, útil para actividades alineadas con el currículo o eventos temáticos.',
      },
      {
        title: 'Configura el Diseño de Página y las Decoraciones',
        description: 'En la sección Configuración de Página, selecciona tu tamaño de página: Carta Vertical, Carta Horizontal, A4 Vertical, A4 Horizontal, Cuadrado (1200×1200) o introduce una dimensión personalizada. Elige un color de fondo de página. Selecciona un fondo decorativo temático y un borde decorativo temático de la biblioteca integrada, cada uno con un control de opacidad independiente (0–1, paso 0,05). Los fondos y bordes temáticos funcionan de forma independiente, permitiéndote combinar un fondo sutil con un borde decorativo llamativo o cualquier combinación que se ajuste a tu estilo de producto. La hoja de referencia hereda los bordes y el fondo de la página del lienzo principal.',
      },
      {
        title: 'Genera las Tarjetas de Bingo',
        description: 'Haz clic en Generar para crear tus tarjetas de bingo. La aplicación llena tu cuadrícula configurada con imágenes o palabras del tema seleccionado y crea fichas circulares con bordes punteados (#666, strokeDashArray [5,5]) debajo de la tarjeta. Las fichas se barajan usando el ordenamiento Fisher-Yates para que nunca reflejen la disposición de la cuadrícula de la tarjeta, asegurando un juego de bingo auténtico. Si solicitaste múltiples tarjetas, cada una extrae una selección aleatoria diferente del conjunto de imágenes. La primera tarjeta aparece en el lienzo inmediatamente para vista previa. El área de la cuadrícula usa el 60% de la altura disponible del lienzo (límite de 500px) para proporciones óptimas.',
      },
      {
        title: 'Revisa la Hoja de Referencia',
        description: 'Haz clic en la pestaña de Hoja de Referencia para ver el acompañamiento para el cantante del bingo. La hoja de referencia muestra una cuadrícula dinámica de palabras con todos los elementos únicos del conjunto de imágenes — el cantante los lee en voz alta mientras los jugadores marcan sus tarjetas. Las columnas se calculan según la longitud de la palabra más larga (2–6 columnas) con tamaño de fuente uniforme en todas las entradas. La cuadrícula se centra en la página y hereda los bordes y el fondo de la página del lienzo principal. Esto no es una clave de respuestas — el bingo no tiene una sola respuesta correcta ya que cada tarjeta es diferente. La hoja de referencia es el documento de referencia para la persona que dirige el juego.',
      },
      {
        title: 'Descarga Tarjetas, Hoja de Referencia y Lote ZIP',
        description: 'Activa la escala de grises para versiones con ahorro de tinta ideales para impresión en el aula e interiores de KDP. Descarga archivos individuales usando los cuatro botones dedicados: ficha JPEG, hoja de referencia JPEG, ficha PDF y hoja de referencia PDF — todo renderizado a 300 DPI (multiplicador 6×, calidad JPEG 1,0). Para exportación por lotes, haz clic en el botón de descarga ZIP para recibir todas las tarjetas de bingo generadas como JPEGs individuales en un solo archivo bingo_cards.zip. La exportación ZIP por lotes es esencial para vendedores que crean sets de bingo con múltiples tarjetas — genera 10 tarjetas únicas y empaquétalas en una sola descarga. Los archivos están listos para producción en listados de Etsy, interiores de Amazon KDP y archivos de productos de TpT.',
      },
    ],
  },

  whatYouCanCreate: [
    {
      title: 'Sets Temáticos de Tarjetas de Bingo por Tamaño de Cuadrícula',
      description: 'Crea paquetes de tarjetas de bingo organizados por tema y tamaño de cuadrícula usando las 104 colecciones de imágenes. Cada tema soporta múltiples configuraciones de cuadrícula: tarjetas rápidas de 3×3 con 9 celdas para rondas cortas, tarjetas estándar de 4×4 con 16 celdas para juego equilibrado y tarjetas clásicas de 5×5 con 25 celdas para sesiones extendidas. Genera por lotes 10 tarjetas únicas por tamaño de cuadrícula y luego combina los tres tamaños en un solo paquete de producto con hojas de referencia incluidas. La exportación ZIP por lotes empaqueta cada set para entrega inmediata. El barajado Fisher-Yates de fichas asegura que cada tarjeta presente un desafío genuino de bingo donde las fichas nunca reflejan la disposición de la cuadrícula.',
    },
    {
      title: 'Productos de Bingo de Vocabulario Multilingüe',
      description: 'El Generador de Tarjetas de Bingo es sensible al idioma — el modo de relleno de Palabra muestra nombres localizados de las imágenes de la Biblioteca de Imágenes, así que al cambiar de idioma se actualizan las palabras en tarjetas, fichas y la hoja de referencia. Crea sets de bingo en inglés, alemán, francés, español, portugués, italiano, holandés, sueco, danés, noruego y finlandés desde las mismas imágenes sin reconstruir nada. Una imagen de gato muestra "Cat" en inglés, "Katze" en alemán y "Chat" en francés. Vende productos de bingo de vocabulario en mercados internacionales generando cada versión de idioma en minutos. Las tarjetas con palabras y fichas con imágenes son herramientas de repaso de vocabulario especialmente efectivas.',
    },
    {
      title: 'Cuadernos de Actividades de Bingo para KDP con Hojas de Referencia',
      description: 'Compila 40–80 tarjetas de bingo en cuadernos de actividades impresos para Amazon KDP. Estructura capítulos por tema: bingo de animales, bingo de comida, bingo de vehículos, bingo de festividades. Incluye hojas de referencia después de cada set para que el libro sea autosuficiente para jugar — los lectores pueden fotocopiar la página de referencia mientras los jugadores usan las páginas de tarjetas de bingo directamente. Mezcla tamaños de cuadrícula dentro de los capítulos para dificultad progresiva. Activa la escala de grises para salida con ahorro de tinta que mantiene bajos los costos de impresión de KDP. La función de generación por lotes produce 10 tarjetas únicas por set en segundos, haciendo eficientes las compilaciones grandes de cuadernos.',
    },
    {
      title: 'Kits de Juego de Bingo Listos para el Aula',
      description: 'Construye kits completos de juego de bingo para uso en el aula con 10 tarjetas únicas de jugador y una hoja de cantante por set. Los maestros que buscan actividades de bingo valoran productos que llegan listos para jugar — imprime las tarjetas, distribúyelas y empieza el juego de inmediato. Usa el modo de relleno de Palabra con vocabulario curricular para repaso de lengua, relleno de Imagen para ejercicios de reconocimiento visual o modos mixtos para instrucción diferenciada. La función de selección personalizada de referencia te permite curar exactamente qué elementos de vocabulario aparecen en el juego para alineación curricular precisa.',
    },
    {
      title: 'Colecciones de Bingo Estacionales y de Festividades',
      description: 'Construye colecciones estacionales rotativas usando temas de festividades y naturaleza de la biblioteca de 104 temas. Bingo de Navidad, bingo de Halloween, bingo de Pascua, bingo de San Valentín, bingo de vuelta al cole y bingo de verano soportan paquetes de productos dedicados. El bingo es un juego naturalmente social que alcanza su pico durante festividades cuando familias y aulas buscan actividades grupales. Incluye múltiples tamaños de cuadrícula y variantes de relleno tanto de imagen como de palabra en cada set estacional para máximo valor. Publica cada colección 4–6 semanas antes de la festividad para máxima visibilidad en el mercado.',
    },
    {
      title: 'Sets de Tarjetas de Bingo para Eventos y Fiestas',
      description: 'Crea sets de tarjetas de bingo para fiestas, baby showers, despedidas de soltera, eventos de team building y talleres educativos. Los tamaños de cuadrícula configurables y la biblioteca de imágenes temáticas producen juegos de bingo específicos para cada ocasión rápidamente — bingo de artículos de bebé para baby showers, bingo de comida para clases de cocina, bingo de animales para excursiones al zoo. Genera por lotes 10 tarjetas únicas por set de evento con una hoja de referencia, empaqueta como un paquete ZIP de descarga instantánea y vende en Etsy donde los organizadores de eventos buscan activamente juegos imprimibles para fiestas. La selección personalizada de referencia te permite curar los elementos exactos para cada ocasión.',
    },
  ],

  businessIdeas: [
    {
      title: 'Tienda Etsy de Tarjetas de Bingo Temáticas',
      description: 'Abre una tienda Etsy especializada en paquetes de tarjetas de bingo organizados por tema usando las 104 colecciones de imágenes. Animales, comida, vehículos, festividades, naturaleza y profesiones se convierten en listados separados con 10–30 tarjetas únicas por set y hojas de referencia incluidas. La función de generación por lotes crea 10 tarjetas únicas por clic y la exportación ZIP las empaqueta instantáneamente para entrega digital. Mezcla tamaños de cuadrícula dentro de los paquetes: tarjetas rápidas de 3×3, tarjetas estándar de 4×4 y tarjetas clásicas de 5×5 para variedad. Precio de paquetes individuales por tema a $3–$5 para 10–15 tarjetas con hojas de referencia y paquetes premium multi-tema a $8–$15.',
      platform: 'Etsy',
    },
    {
      title: 'Serie de Cuadernos de Actividades de Bingo en Amazon KDP',
      description: 'Compila 40–80 tarjetas de bingo en cuadernos temáticos de actividades para Amazon KDP. Estructura una serie por tema: "Bingo de Animales", "Bingo de Festividades", "Bingo de Comida" y "Bingo de Objetos Cotidianos". Incluye hojas de referencia después de cada set de tarjetas para que el libro sea autosuficiente para jugar. Mezcla tamaños de cuadrícula para dificultad progresiva dentro de cada libro — empieza con tarjetas de 3×3 y avanza hasta 5×5. Activa la escala de grises para salida con ahorro de tinta que se imprime perfectamente en blanco y negro. Los cuadernos de actividades de bingo se venden durante todo el año y aumentan durante las temporadas de festividades cuando las familias buscan actividades grupales.',
      platform: 'Amazon KDP',
    },
    {
      title: 'Paquetes de Actividades de Bingo para TpT',
      description: 'Sube paquetes de actividades de bingo para el aula a TpT con tarjetas únicas de jugador y hojas de cantante como puntos de venta clave. Los maestros que buscan actividades de bingo valoran productos que llegan listos para jugar — imprime, distribuye y empieza el juego. Crea sets alineados con el currículo: bingo de vocabulario usando el modo de relleno de Palabra, bingo de reconocimiento visual usando relleno de Imagen y bingo de modos mixtos para instrucción diferenciada. Incluye 10 tarjetas únicas por set con una hoja de referencia. El modo de relleno de Palabra con nombres localizados de imágenes convierte el bingo en una actividad de repaso de vocabulario que los maestros pueden usar en lengua, vocabulario de ciencias y unidades temáticas.',
      platform: 'Teachers Pay Teachers',
    },
    {
      title: 'Embudo de Tráfico con Tarjetas de Bingo en Pinterest',
      description: 'Las tarjetas de bingo crean pines visualmente impactantes en Pinterest — la cuadrícula colorida con imágenes temáticas y fichas circulares crea un formato de juego inmediatamente reconocible que padres y maestros adoran. Publica tarjetas de bingo de muestra mostrando diferentes temas: bingo de animales para tableros de preescolar, bingo de festividades para tableros estacionales y bingo de vocabulario para tableros educativos. Crea series de pines separadas para "bingo imprimible con imágenes", "juegos de bingo para el aula" y "actividades de bingo para festividades". El bingo es un juego universalmente reconocido, así que los pines atraen a audiencias de todos los países e idiomas. Enlaza cada pin a tus listados de productos en Etsy o TpT.',
      platform: 'Pinterest',
    },
    {
      title: 'Kit Completo de Tarjetas de Bingo en Gumroad',
      description: 'Agrupa tarjetas de bingo de los 104 temas, todos los tamaños de cuadrícula y ambos modos de relleno en un kit integral en Gumroad. Incluye más de 500 tarjetas de bingo únicas abarcando cuadrículas de 3×3, 4×4 y 5×5 con variantes de relleno de imagen y de palabra, más hojas de referencia para cada tema. La generación por lotes y la exportación ZIP hacen eficiente la producción a gran escala. El sistema de doble relleno produce cuatro estilos distintos de tarjeta por tema (imagen/imagen, imagen/palabra, palabra/imagen, palabra/palabra), multiplicando la variedad de cada conjunto de imágenes. El formato de kit justifica precios premium porque los compradores obtienen una biblioteca completa de juegos de bingo en lugar de paquetes individuales.',
      platform: 'Gumroad',
    },
    {
      title: 'Productos de Bingo Multilingüe para Mercados Globales',
      description: 'El Generador de Tarjetas de Bingo es sensible al idioma — el modo de relleno de Palabra usa nombres localizados de imágenes en 11 idiomas, facilitando la producción de tarjetas de bingo en inglés, alemán, francés, español, portugués, italiano, holandés, sueco, danés, noruego y finlandés desde las mismas imágenes. Crea productos de bingo de vocabulario dirigidos a tiendas Etsy internacionales, compradores multilingües de TpT y estudiantes de idiomas en todo el mundo. Vende el mismo set temático de bingo en múltiples versiones de idioma sin rediseño — simplemente cambia el idioma y regenera. Los paquetes multilingües consiguen precios premium y llegan a compradores que los competidores monolingües no pueden alcanzar.',
      platform: 'Etsy / TpT',
    },
  ],

  proTips: [
    {
      title: 'Usa la Generación por Lotes y la Exportación ZIP para Creación Eficiente de Productos',
      description: 'Establece la cantidad de tarjetas en 10 y genera un set completo de tarjetas de bingo únicas en un solo clic. Cada tarjeta extrae una selección aleatoria diferente de imágenes del conjunto, garantizando que ninguna tarjeta comparta el mismo diseño. Luego usa la exportación ZIP por lotes para descargar las 10 tarjetas como JPEGs individuales en un solo archivo bingo_cards.zip. Este flujo de trabajo produce un set completo de tarjetas de bingo listo para vender en segundos en lugar de generar y guardar tarjetas una por una. Para paquetes más grandes, genera múltiples lotes con diferentes tamaños de cuadrícula y temas.',
    },
    {
      title: 'Mezcla Modos de Relleno para Cuatro Estilos Distintos de Producto',
      description: 'Las celdas de la tarjeta y las fichas tienen selección de modo de relleno independiente — Imagen o Palabra. Esto crea cuatro estilos distintos de tarjeta de bingo desde un solo generador: tarjetas con imágenes y fichas con imágenes (completamente visual), tarjetas con imágenes y fichas con palabras (asociación visual-a-texto), tarjetas con palabras y fichas con imágenes (asociación texto-a-visual) y tarjetas con palabras y fichas con palabras (completamente textual). Incluye los cuatro estilos en paquetes premium para máxima variedad y valor. Cada estilo sirve un propósito educativo diferente — reconocimiento visual, asociación de vocabulario, práctica de lectura o aprendizaje combinado.',
    },
    {
      title: 'Aprovecha la Selección Personalizada de Referencia para Alineación Curricular',
      description: 'Activa la casilla "Usar selección personalizada" para elegir exactamente qué imágenes aparecen en el conjunto de referencia. El contador en vivo muestra tu recuento de selección mientras eliges de la Biblioteca de Imágenes. Esta función es crítica para crear juegos de bingo alineados con el currículo — selecciona solo las palabras de vocabulario que cubre tu lección, solo los animales de un hábitat específico o solo los alimentos de una unidad de nutrición. La selección personalizada de referencia transforma el bingo de un juego aleatorio en una herramienta de enseñanza dirigida, que es el punto de venta clave para productos de aula en TpT.',
    },
    {
      title: 'Explota el Relleno de Palabra Sensible al Idioma para Productos Multilingües',
      description: 'El modo de relleno de Palabra muestra nombres localizados de imágenes de la Biblioteca de Imágenes — al cambiar el idioma de la aplicación se actualizan todas las palabras en tarjetas, fichas y la hoja de referencia. Genera un set temático de bingo en inglés, luego cambia a alemán, francés, español o cualquiera de los 11 idiomas soportados y regenera el mismo set con vocabulario localizado. Esto produce productos de bingo multilingüe desde imágenes idénticas sin esfuerzo de rediseño. Los paquetes de bingo de vocabulario multilingüe están desatendidos en la mayoría de los mercados, dándote una ventaja competitiva.',
    },
    {
      title: 'Incluye Hojas de Referencia en Cada Listado de Producto',
      description: 'La hoja de referencia dedicada con su cuadrícula dinámica de palabras es lo que convierte tus tarjetas de bingo en un juego completo y jugable en lugar de solo imprimibles bonitos. Siempre incluye hojas de referencia en tus paquetes de productos y muéstralas en las imágenes de vista previa del listado. La hoja de referencia muestra todos los elementos únicos en una cuadrícula limpia con tamaño de fuente uniforme y columnas calculadas — el cantante lee los elementos en voz alta mientras los jugadores marcan sus tarjetas. Los productos que incluyen materiales para el cantante consistentemente superan en ventas a los listados de solo tarjetas porque los compradores quieren una experiencia completa y lista para jugar.',
    },
    {
      title: 'Usa Fondos y Bordes Temáticos para Branding Cohesivo de Producto',
      description: 'El sistema independiente de fondos y bordes temáticos con controles de opacidad separados te permite crear una identidad visual consistente en tus paquetes de tarjetas de bingo. Configura un fondo temático sutil al 15–25% de opacidad para calidez visual sin distraer del contenido de la cuadrícula de bingo. Superpone un borde decorativo al 80–100% de opacidad para un marco pulido. Aplica la misma combinación de fondo y borde en cada tarjeta de un paquete para un aspecto de producto cohesivo que los compradores asocian con calidad y profesionalismo. La hoja de referencia hereda estos ajustes automáticamente.',
    },
    {
      title: 'Apunta a Múltiples Tamaños de Cuadrícula para Máxima Cobertura de Mercado',
      description: 'Diferentes tamaños de cuadrícula sirven a diferentes audiencias. Las cuadrículas de 3×3 (9 celdas) funcionan mejor para bingo de preescolar y jardín de infantes con rondas rápidas y menos elementos a rastrear. Las cuadrículas de 4×4 (16 celdas) son ideales para aulas de primaria con juego equilibrado. Las cuadrículas de 5×5 (25 celdas) proporcionan la experiencia clásica de bingo para alumnos mayores y noches de juegos en familia. Incluye los tres tamaños en tus paquetes de productos y crea listados separados dirigidos a cada grupo de edad. La función de generación por lotes significa que cambiar tamaños de cuadrícula y regenerar toma segundos.',
    },
  ],

  faq: [
    {
      question: '¿Hay una prueba gratuita?',
      answer: 'Sí. La herramienta ofrece una prueba gratuita con todas las funciones — todos los tamaños de cuadrícula de 3×3 a 5×5, generación por lotes de hasta 10 tarjetas únicas, exportación ZIP por lotes, ambos modos de relleno de imagen y palabra para celdas y fichas de forma independiente, la hoja de referencia dedicada con cuadrícula dinámica de palabras, selección personalizada de referencia con contador en vivo, las 104 colecciones temáticas de imágenes con más de 3.100 ilustraciones, subida de imágenes personalizadas, fondos y bordes temáticos con opacidad independiente, opción de escala de grises y todos los formatos de descarga. Sin registro, sin tarjeta de crédito. Las descargas de la prueba gratuita incluyen una marca de agua. Compra una licencia comercial para eliminar la marca de agua y desbloquear derechos de venta.',
    },
    {
      question: '¿Cómo funciona la generación por lotes de tarjetas de bingo?',
      answer: 'Establece la cantidad de tarjetas de 1 a 10 en el panel de Configuración de Tarjeta de Bingo. Cada tarjeta extrae una selección aleatoria diferente del conjunto de imágenes, garantizando que cada tarjeta del lote sea única — esencial para bingo donde cada jugador necesita una tarjeta diferente. La primera tarjeta aparece en el lienzo inmediatamente para vista previa. Todas las tarjetas generadas están disponibles a través de la exportación ZIP por lotes para descarga como archivos JPEG individuales en un solo archivo bingo_cards.zip. Genera un set completo de 10 tarjetas de bingo únicas con un solo clic, listas para empaquetar en productos de mercado.',
    },
    {
      question: '¿Qué tamaños de cuadrícula están disponibles para las tarjetas de bingo?',
      answer: 'Las filas y columnas se configuran de forma independiente de 3 a 5, creando cuadrículas desde 3×3 (9 celdas) hasta 5×5 (25 celdas). El valor por defecto es 4×4 con 16 celdas. También puedes crear cuadrículas no cuadradas como 3×5 (15 celdas) o 5×3 (15 celdas) para formatos únicos de tarjeta de bingo. Las cuadrículas más pequeñas funcionan bien para rondas rápidas de preescolar con menos elementos a rastrear, mientras que las cuadrículas de 5×5 proporcionan la experiencia clásica de bingo para juegos más largos y audiencias mayores.',
    },
    {
      question: '¿Cuál es la diferencia entre el relleno de celdas y el relleno de fichas?',
      answer: 'Las celdas de la tarjeta y las fichas tienen un modo de relleno independiente: Imagen o Palabra. El relleno de celdas determina qué aparece en cada celda de la cuadrícula de bingo en la tarjeta. El relleno de fichas determina qué aparece en las fichas circulares con bordes punteados debajo de la tarjeta. Puedes mezclar modos libremente — tarjetas con imágenes y fichas con palabras crean un desafío de asociación visual-a-texto, tarjetas con palabras y fichas con imágenes invierten la dinámica, y combinar ambos iguales crea una experiencia de bingo completamente visual o completamente textual. Este sistema de doble relleno produce cuatro estilos distintos de tarjeta de bingo desde un solo generador.',
    },
    {
      question: '¿Cómo funcionan las fichas circulares?',
      answer: 'Las fichas circulares aparecen debajo de la cuadrícula de la tarjeta de bingo con bordes punteados (#666, strokeDashArray [5,5]). Muestran imágenes o palabras según tu selección de modo de relleno de fichas. Las fichas se barajan usando el ordenamiento Fisher-Yates para que nunca reflejen la disposición de la cuadrícula de la tarjeta — esto asegura un juego de bingo auténtico donde las fichas sirven como referencia de asociación en lugar de revelar respuestas por posición. Los jugadores usan las fichas para identificar qué elementos se están cantando durante el juego.',
    },
    {
      question: '¿Qué es la hoja de referencia y cómo funciona?',
      answer: 'La hoja de referencia es una página separada accesible a través de la pestaña de Hoja de Referencia que muestra una cuadrícula dinámica de palabras con todos los elementos únicos del conjunto de imágenes. El cantante lee estas palabras en voz alta mientras los jugadores marcan los elementos coincidentes en sus tarjetas de bingo. Las columnas se calculan según la longitud de la palabra más larga (2–6 columnas) con tamaño de fuente uniforme en todas las entradas para una legibilidad limpia. La cuadrícula se centra en la página y hereda los bordes y el fondo del lienzo principal. Esto no es una clave de respuestas — el bingo no tiene una sola respuesta correcta ya que cada tarjeta es diferente.',
    },
    {
      question: '¿Qué es la selección personalizada de referencia?',
      answer: 'Activa la casilla "Usar selección personalizada" en el panel de Configuración de Tarjeta de Bingo para elegir qué imágenes específicas aparecen en el conjunto de referencia. Cuando está activada, haz clic en las imágenes de la Biblioteca de Imágenes para añadirlas a tu selección personalizada de referencia — un contador en vivo muestra tu recuento de selección mientras eliges. Esto te da control preciso sobre qué elementos aparecen en el juego de bingo, útil para actividades de vocabulario alineadas con el currículo, eventos temáticos o cualquier situación donde quieras curar los elementos exactos que los jugadores encontrarán durante el juego.',
    },
    {
      question: '¿El Generador de Tarjetas de Bingo es sensible al idioma?',
      answer: 'Sí. Cuando usas el modo de relleno de Palabra para celdas o fichas, las palabras mostradas son nombres localizados de imágenes de la Biblioteca de Imágenes. Al cambiar el idioma en los Ajustes de la Ficha se actualizan las palabras en tarjetas, fichas y la hoja de referencia. Por ejemplo, una imagen de gato muestra "Cat" en inglés pero "Katze" en alemán y "Chat" en francés. Esto facilita la creación de productos de bingo de vocabulario multilingüe desde las mismas imágenes. El modo de relleno de Imagen no es sensible al idioma ya que muestra ilustraciones en lugar de palabras.',
    },
    {
      question: '¿Cómo funciona la exportación ZIP por lotes?',
      answer: 'Después de generar múltiples tarjetas de bingo, haz clic en el botón de exportación por lotes para descargar todas las tarjetas como archivos JPEG individuales de alta resolución empaquetados en un solo archivo bingo_cards.zip usando compresión JSZip. Cada tarjeta se nombra secuencialmente dentro del ZIP para fácil organización. Esto elimina descargar tarjetas una por una — genera un set completo de 10 tarjetas únicas y expórtalas todas en un solo clic. La exportación ZIP funciona junto con los botones estándar de descarga individual JPEG y PDF para la tarjeta actualmente mostrada y la hoja de referencia.',
    },
    {
      question: '¿Qué tamaños de página y formatos de exportación están disponibles?',
      answer: 'Los tamaños de página incluyen Carta Vertical, Carta Horizontal, A4 Vertical, A4 Horizontal, Cuadrado (1200×1200) y dimensiones personalizadas. Exporta como JPEG de alta resolución o PDF listo para imprimir a 300 DPI (multiplicador 6×, calidad JPEG 1,0). Activa la escala de grises para salida con ahorro de tinta. Cinco opciones de descarga: ficha JPEG, hoja de referencia JPEG, ficha PDF, hoja de referencia PDF y exportación ZIP por lotes de todas las tarjetas generadas. Todas las exportaciones están listas para producción en descargas digitales, cuadernos de actividades impresos y fichas para el aula.',
    },
    {
      question: '¿Puedo vender tarjetas de bingo creadas con esta herramienta de forma comercial?',
      answer: 'Sí. Con una licencia comercial, tienes derechos completos para vender tarjetas de bingo como descargas digitales en Etsy, cuadernos de actividades impresos en Amazon KDP, recursos para el aula en TpT o a través de cualquier otro canal de venta. Los tamaños de cuadrícula configurables, la generación por lotes, la exportación ZIP, los modos de relleno duales, las hojas de referencia dedicadas, la selección personalizada de referencia, el relleno de palabras multilingüe y las 104 colecciones temáticas de imágenes te dan todo lo necesario para crear productos profesionales de bingo que compiten en categorías de juegos imprimibles en todos los principales mercados.',
    },
    {
      question: '¿Cuál es la política de reembolso?',
      answer: 'Prueba antes de comprar con nuestra prueba gratuita — todas las funciones están disponibles para que puedas evaluar completamente la herramienta antes de comprar. Debido a que la prueba gratuita te da acceso completo a todos los tamaños de cuadrícula, generación por lotes de hasta 10 tarjetas, exportación ZIP, ambos modos de relleno para celdas y fichas, la hoja de referencia, selección personalizada de referencia, los 104 temas, subida de imágenes personalizadas, fondos y bordes temáticos, exportación en escala de grises y todos los formatos de descarga, no ofrecemos reembolsos en compras de licencias. Asegúrate de que la herramienta se adapta a tus necesidades usando la prueba gratuita antes de comprar.',
    },
  ],

  internalLinks: [
    { pageType: 'app', slug: 'bingo-fichas', anchorText: 'Tarjetas de Bingo con Imágenes — Detalles Completos del Producto' },
    { pageType: 'tool', slug: 'generador-fichas-asociacion', anchorText: 'Generador de Fichas de Asociación' },
    { pageType: 'tool', slug: 'generador-puzzle-cuadricula', anchorText: 'Generador de Puzzle de Cuadrícula' },
    { pageType: 'tool', slug: 'generador-discriminacion-visual', anchorText: 'Generador de Discriminación Visual' },
    { pageType: 'tool', slug: 'generador-clasificacion-imagenes', anchorText: 'Generador de Clasificación de Imágenes' },
    { pageType: 'tool', slug: 'generador-sopa-letras', anchorText: 'Generador de Sopa de Letras' },
    { pageType: 'tool', slug: 'generador-fichas-intruso', anchorText: 'Generador de Fichas del Intruso' },
    { pageType: 'tool', slug: 'generador-paginas-colorear', anchorText: 'Generador de Páginas para Colorear' },
  ],

  visuals: {
    heroImages: {
      primary: '/samples/spanish/bingo/Bingo de Imágenes 1.webp',
      primaryAlt: 'Tarjeta de bingo con imágenes temáticas en una cuadrícula configurable y fichas circulares con bordes punteados debajo para asociación durante el juego de bingo',
    },
    sampleGallery: [
      {
        src: '/samples/spanish/bingo/Bingo de Imágenes 2.webp',
        alt: 'Tarjeta de bingo con relleno de imagen mostrando ilustraciones temáticas a color en celdas de la cuadrícula y fichas circulares con imágenes y bordes punteados',
        caption: 'Modo de relleno de imagen — ilustraciones a color en celdas de la tarjeta y fichas circulares para bingo visual',
      },
      {
        src: '/samples/spanish/bingo/Bingo de Imágenes 3.webp',
        alt: 'Tarjeta de bingo con relleno de palabra mostrando nombres localizados de imágenes en celdas de la cuadrícula y fichas con palabras para bingo de vocabulario',
        caption: 'Modo de relleno de palabra — nombres localizados de imágenes para productos de bingo de vocabulario multilingüe',
      },
      {
        src: '/samples/spanish/bingo/Bingo de Imágenes 1 callout.webp',
        alt: 'Hoja de referencia de bingo con cuadrícula dinámica de palabras mostrando todos los elementos del juego organizados en columnas para el cantante',
        caption: 'Hoja de referencia — cuadrícula dinámica de palabras con columnas calculadas y tamaño de fuente uniforme para el cantante',
      },
    ],
    youtubeId: 'd6AOiDXoK1c',
    videoTitle: 'Cómo Crear Tarjetas de Bingo con Imágenes con Generación por Lotes, Exportación ZIP, Doble Modo de Relleno y Hojas de Referencia — Tutorial Paso a Paso',
  },
};

export default content;
