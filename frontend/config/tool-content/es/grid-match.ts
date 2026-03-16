import type { ToolContent } from '../types';

const content: ToolContent = {
  seo: {
    primaryKeyword: 'generador de puzzle de cuadrícula',
    secondaryKeywords: [
      'creador de fichas de rompecabezas de cuadrícula para vendedores',
      'crear puzzles de cuadrícula para vender uso comercial',
      'generador de fichas de piezas de imagen imprimibles para KDP y Etsy',
      'herramienta de puzzle de cuadrícula con clave de respuestas automática',
    ],
    lsiKeywords: [
      'generador de puzzle de cuadrícula con piezas numeradas',
      'clave de respuestas automática con círculos numerados superpuestos',
      'creador de fichas con celdas pista configurables',
    ],
    titleTag: 'Generador Puzzle de Cuadrícula | para Vender',
    metaDescription: 'Crea puzzles de cuadrícula con tamaño de 2×2 a 4×4, celdas pista ajustables, aleatorización Fisher-Yates y 104 temas ilustrados. Prueba gratuita con marca.',
  },

  hero: {
    title: 'Generador de Puzzle de Cuadrícula',
    tagline: 'Generador de puzzles de cuadrícula con tamaños configurables de 2×2 a 4×4, celdas pista ajustables para dificultad escalable, aleatorización Fisher-Yates de piezas, claves de respuestas autogeneradas con círculos numerados superpuestos y 104 colecciones temáticas de imágenes para fichas de rompecabezas de cuadrícula que se venden en todo el mundo',
    description: 'Crea fichas profesionales de puzzle de cuadrícula donde una sola imagen se divide en una cuadrícula de piezas y los alumnos asocian las piezas numeradas con sus posiciones correctas — un rompecabezas de razonamiento espacial construido a partir de una sola imagen. Configura la cuadrícula de 2×2 hasta 4×4 (2–4 filas × 2–4 columnas, por defecto 3×3) para crear puzzles que van desde 4 piezas hasta 16 piezas. Establece de 1 a 5 celdas pista (por defecto 1) que permanecen visibles en la ficha como pistas — menos pistas significan puzzles más difíciles, más pistas crean calentamientos accesibles. La aplicación baraja las piezas ocultas usando aleatorización Fisher-Yates y las muestra en una paleta numerada junto a o debajo de la cuadrícula, de modo que cada generación produce un orden de piezas diferente incluso con la misma imagen y configuración. Los alumnos estudian las celdas pista reveladas, examinan las piezas numeradas en la paleta y escriben qué número pertenece a cada celda vacía. El sistema de lienzo dual genera simultáneamente una pestaña de ficha y una pestaña de clave de respuestas — la clave de respuestas muestra la imagen completa sin cortar con círculos numerados superpuestos en cada celda de la cuadrícula (fondo amarillo #ffffe0, contorno negro, fuente Fredoka), mostrando exactamente qué número de la paleta corresponde a cada posición. El diseño responsivo se adapta automáticamente: páginas en vertical colocan la cuadrícula arriba (45% de altura) con la paleta debajo; páginas en horizontal posicionan la cuadrícula a la izquierda (48% de ancho) con la paleta a la derecha. Un encabezado estilizado aparece con fondo cian (#00BCD4), título en púrpura profundo (#6A1B9A) y marco de borde naranja (#FF8C42) mostrando "Puzzle de Cuadrícula" e instrucciones en el idioma seleccionado. El Puzzle de Cuadrícula NO es sensible al idioma — la salida del puzzle es puramente visual sin contenido de texto localizado en la ficha, haciendo cada ficha universalmente vendible en todos los mercados sin traducción. Navega 104 colecciones temáticas con más de 3.100 ilustraciones o sube tus propias imágenes PNG, JPG o GIF para puzzles de cuadrícula personalizados. Aplica fondos temáticos y bordes temáticos con controles de opacidad independientes (0–1, paso 0,05). Exporta cuatro archivos por sesión: ficha JPEG, ficha PDF, clave de respuestas JPEG y clave de respuestas PDF — todo a 300 DPI. Elige Carta, A4 o tamaños personalizados con opción de escala de grises para salida con ahorro de tinta. Edita todo en el lienzo de Fabric.js con 7 fuentes, contorno de texto 0–10, herramientas de alineación, capas, bloqueo/desbloqueo, zoom 25%–300% y deshacer/rehacer 20 estados. La prueba gratuita incluye todas las funciones con una marca de agua en las descargas. Compra una licencia para eliminar la marca de agua y vender con uso comercial.',
  },

  tutorial: {
    title: 'Cómo Crear Fichas de Puzzle de Cuadrícula en 8 Pasos',
    steps: [
      {
        title: 'Abre el Generador de Puzzle de Cuadrícula',
        description: 'Haz clic en "Prueba Gratis Ahora" para abrir el generador de puzzles de cuadrícula en tu navegador. La herramienta carga instantáneamente con una barra lateral de ajustes a la izquierda y un lienzo de doble pestaña a la derecha — una pestaña para la ficha y otra para la clave de respuestas. Sin crear cuenta, sin descargar software, sin instalación — empieza a crear puzzles de cuadrícula de inmediato.',
      },
      {
        title: 'Configura el Tamaño de la Cuadrícula',
        description: 'Abre el panel de Opciones de Cuadrícula y establece el número de filas (2–4, por defecto 3) y columnas (2–4, por defecto 3) de forma independiente. Una cuadrícula de 2×2 crea 4 piezas para puzzles introductorios sencillos. Una cuadrícula de 3×3 produce 9 piezas para una dificultad equilibrada. Una cuadrícula de 4×4 ofrece 16 piezas para desafíos avanzados de razonamiento espacial. También puedes mezclar filas y columnas — una cuadrícula de 2×4 crea un puzzle rectangular ancho con 8 piezas, mientras que una de 4×2 produce un diseño estrecho y alto. El tamaño de la cuadrícula determina directamente la complejidad y densidad visual del puzzle.',
      },
      {
        title: 'Ajusta las Celdas Pista para la Dificultad',
        description: 'Ajusta el control deslizante de celdas pista de 1 a 5 (por defecto 1). Las celdas pista son posiciones de la cuadrícula donde la pieza real de la imagen permanece visible como referencia para los alumnos. Con una cuadrícula de 3×3 y 1 pista, los alumnos deben asociar 8 piezas barajadas — un desafío genuino. Con 3 pistas en la misma cuadrícula, solo quedan 6 piezas por asociar. Con 5 pistas, solo 4 piezas permanecen ocultas — un calentamiento accesible para alumnos más pequeños. Este único control transforma la misma imagen en puzzles que abarcan desde fácil hasta avanzado, permitiéndote crear sets de puzzles graduados a partir de una sola imagen.',
      },
      {
        title: 'Selecciona una Imagen de la Biblioteca o Sube la Tuya',
        description: 'Abre el panel de Biblioteca de Imágenes y navega 104 colecciones temáticas con más de 3.100 ilustraciones a color — animales, comida, vehículos, naturaleza, festividades, profesiones y docenas más. Filtra por tema usando el menú desplegable o busca por palabra clave. Haz clic en cualquier imagen para seleccionarla como fuente de tu puzzle. Alternativamente, usa el panel de Subir Imágenes Personalizadas para cargar tus propios archivos PNG, JPG o GIF para puzzles de cuadrícula personalizados — fotos familiares, obras de arte personalizadas, imágenes de marca o contenido específico del aula. La vista previa de la imagen seleccionada muestra tu elección antes de generar.',
      },
      {
        title: 'Configura el Diseño de Página y las Decoraciones',
        description: 'En la sección Configuración de Página, selecciona tu tamaño de página: Carta Vertical, Carta Horizontal, A4 Vertical, A4 Horizontal o introduce una dimensión personalizada. El Puzzle de Cuadrícula no soporta tamaño Cuadrado. Elige un color de fondo de página. Selecciona un fondo decorativo temático y un borde decorativo temático de la biblioteca integrada, cada uno con un control de opacidad independiente (0–1, paso 0,05). Los fondos y bordes temáticos funcionan de forma independiente, permitiéndote combinar un fondo sutil con un borde decorativo llamativo o cualquier combinación que se ajuste a tu estilo de producto.',
      },
      {
        title: 'Genera el Puzzle de Cuadrícula',
        description: 'Haz clic en Generar para crear la ficha de puzzle de cuadrícula. La aplicación divide tu imagen seleccionada en la cuadrícula configurada, revela las celdas pista con las piezas reales de la imagen visibles y marca las celdas restantes con marcadores de posición "?". Todas las piezas ocultas se barajan usando aleatorización Fisher-Yates y se muestran como una paleta numerada. El diseño responsivo se adapta automáticamente: páginas en vertical colocan la cuadrícula arriba con la paleta debajo, páginas en horizontal posicionan la cuadrícula a la izquierda con la paleta a la derecha. Un encabezado estilizado con fondo cian (#00BCD4), título en púrpura profundo (#6A1B9A) y marco de borde naranja (#FF8C42) muestra "Puzzle de Cuadrícula" e instrucciones.',
      },
      {
        title: 'Revisa la Clave de Respuestas Autogenerada',
        description: 'Haz clic en la pestaña Clave de Respuestas para ver la solución generada automáticamente. La clave de respuestas muestra la imagen completa sin cortar con círculos numerados superpuestos en cada celda de la cuadrícula — círculos con fondo amarillo (#ffffe0), contorno negro y números en fuente Fredoka que muestran qué pieza de la paleta corresponde a cada posición. Alterna entre las pestañas de Ficha y Clave de Respuestas para comparar. La clave de respuestas se genera simultáneamente con la ficha — sin creación manual, sin proceso de diseño separado, sin posibilidad de respuestas incorrectas. Este sistema de lienzo dual es tu mayor ahorro de tiempo al crear paquetes de puzzles de cuadrícula.',
      },
      {
        title: 'Descarga los Cuatro Archivos',
        description: 'Activa la escala de grises para versiones con ahorro de tinta ideales para impresión en el aula e interiores de KDP. Descarga los cuatro archivos desde una sola sesión: ficha JPEG, ficha PDF, clave de respuestas JPEG y clave de respuestas PDF — todo renderizado a 300 DPI. Cada pestaña tiene su propio par de botones de descarga. Los archivos están listos para producción en listados de Etsy, interiores de Amazon KDP y archivos de productos de TpT sin necesidad de posprocesamiento. Haz clic en Generar de nuevo con la misma imagen para producir un nuevo puzzle con diferente aleatorización de piezas, o cambia de imagen y configuración de cuadrícula para creación rápida de variedad en 104 colecciones temáticas.',
      },
    ],
  },

  whatYouCanCreate: [
    {
      title: 'Paquetes Temáticos de Puzzles de Cuadrícula por Nivel de Dificultad',
      description: 'Crea paquetes de puzzles de cuadrícula organizados por tema y dificultad usando las 104 colecciones de imágenes. Cada tema produce múltiples niveles de dificultad a partir de un solo conjunto de imágenes: puzzles fáciles (cuadrícula de 2×2 con 3 pistas, solo 1 pieza por asociar), puzzles medios (3×3 con 2 pistas, 7 piezas por asociar) y puzzles difíciles (4×4 con 1 pista, 15 piezas por asociar). Empaqueta 15–20 puzzles por nivel de dificultad por tema con claves de respuestas autogeneradas incluidas. La aleatorización Fisher-Yates significa que cada generación produce un orden de piezas diferente, por lo que puedes crear múltiples puzzles únicos de la misma imagen simplemente regenerando — sin necesidad de imágenes fuente diferentes para llenar un paquete.',
    },
    {
      title: 'Cuadernos de Percepción Visual para KDP',
      description: 'Compila 60–80 puzzles de cuadrícula en cuadernos impresos para Amazon KDP. Estructura capítulos por dificultad progresiva: el Capítulo 1 usa cuadrículas de 2×2 con 3 pistas para principiantes que aprenden cómo funcionan los puzzles de cuadrícula, el Capítulo 2 usa cuadrículas de 3×3 con 2 pistas para resolvers intermedios, y el Capítulo 3 usa cuadrículas de 4×4 con 1 pista para desafíos avanzados de razonamiento espacial. Incluye páginas de clave de respuestas al final de cada capítulo mostrando la imagen completa con los círculos numerados superpuestos. Activa la escala de grises para salida con ahorro de tinta que se imprime perfectamente en blanco y negro. El formato puramente visual no requiere traducción, por lo que un solo interior sirve para todos los mercados internacionales de KDP.',
    },
    {
      title: 'Actividades de Puzzle Rápido para el Aula',
      description: 'Crea puzzles de cuadrícula listos para el aula para trabajo matutino, alumnos que terminan antes y centros de enriquecimiento. Construye sets alineados con el currículo: puzzles de imágenes de animales para unidades de ciencias, puzzles de monumentos para geografía, puzzles de alimentos para lecciones de nutrición. La dificultad configurable te permite diferenciar dentro de un solo producto — incluye puzzles de 2×2 para alumnos que necesitan apoyo y puzzles de 4×4 para alumnos avanzados, todo del mismo tema. Cada puzzle se exporta con su clave de respuestas autogenerada, eliminando el tiempo de preparación del maestro. El formato puramente visual significa que los puzzles de cuadrícula funcionan para cualquier alumno independientemente de su nivel de lectura o idioma.',
    },
    {
      title: 'Productos de Puzzle de Cuadrícula con Fotos Personalizadas',
      description: 'Usa la función de Subir Imágenes Personalizadas para crear puzzles de cuadrícula a partir de cualquier foto u obra de arte. Los puzzles de fotos familiares son regalos personalizados únicos. Los maestros pueden subir fotos del aula para actividades de fin de curso. Puzzles de fotos de mascotas, recuerdos de vacaciones, fotos de equipos deportivos e imágenes de marca personalizadas se convierten en productos de puzzle únicos. El tamaño de cuadrícula configurable y la cantidad de pistas te permiten ajustar la dificultad para cualquier audiencia — puzzles sencillos de 2×2 para niños pequeños a partir de una foto familiar, puzzles desafiantes de 4×4 para adultos a partir de fotografía de paisajes.',
    },
    {
      title: 'Colecciones de Puzzles de Cuadrícula Estacionales',
      description: 'Construye colecciones estacionales rotativas usando temas de festividades y naturaleza de la biblioteca de 104 temas. Navidad, Halloween, Pascua, San Valentín, vuelta al cole y verano soportan paquetes dedicados de puzzles de cuadrícula. Incluye múltiples tamaños de cuadrícula (2×2, 3×3, 4×4) y cantidades de pistas (1–5) en cada set estacional para máxima variedad y valor. Publica cada colección 4–6 semanas antes de la festividad para máxima visibilidad en el mercado. La aleatorización Fisher-Yates asegura que no haya dos puzzles idénticos incluso dentro del mismo tema estacional, previniendo contenido repetitivo.',
    },
    {
      title: 'Paquetes de Aprendizaje Visual Multi-Formato',
      description: 'Combina puzzles de cuadrícula con fichas de asociación, actividades de piezas faltantes, ejercicios de discriminación visual y fichas de clasificación de imágenes usando temas coordinados en múltiples generadores. Los puzzles de cuadrícula enseñan razonamiento espacial y análisis visual de una sola imagen. Las fichas de asociación desarrollan discriminación visual entre pares de imágenes. Las piezas faltantes desarrollan percepción parte-todo. Cada formato ejercita una habilidad cognitiva diferente mientras mantiene consistencia temática. Los paquetes multi-formato se venden significativamente más que los paquetes de formato único y brindan a los alumnos práctica variada de percepción visual a través de un tema unificado.',
    },
  ],

  businessIdeas: [
    {
      title: 'Tienda Etsy de Puzzles de Cuadrícula Temáticos',
      description: 'Abre una tienda Etsy especializada en paquetes de puzzles de cuadrícula organizados por tema usando las 104 colecciones de imágenes. Animales, vehículos, naturaleza, comida, festividades y profesiones se convierten en listados separados con versiones de dificultad fácil, media y difícil. Cada puzzle incluye la clave de respuestas autogenerada con círculos numerados superpuestos — un punto de venta crítico que diferencia tus listados de competidores que venden puzzles sin soluciones. La aleatorización Fisher-Yates asegura que cada ficha sea única. Precio de paquetes individuales por tema a $3–$5 para 15–20 puzzles con claves de respuestas y paquetes premium multi-dificultad a $8–$12.',
      platform: 'Etsy',
    },
    {
      title: 'Serie de Cuadernos de Percepción Visual en Amazon KDP',
      description: 'Compila 60–80 puzzles de cuadrícula en cuadernos temáticos para Amazon KDP. Estructura una serie por progresión de dificultad: "Puzzles de Cuadrícula Fáciles" usa cuadrículas de 2×2 con 3 pistas, "Puzzles de Cuadrícula Intermedios" usa cuadrículas de 3×3 con 2 pistas, y "Puzzles de Cuadrícula Avanzados" usa cuadrículas de 4×4 con 1 pista. Incluye páginas de clave de respuestas al final con círculos numerados superpuestos en la imagen completa. Activa la escala de grises para salida con ahorro de tinta que se imprime perfectamente en blanco y negro. El formato puramente visual se publica idénticamente en todos los mercados internacionales de KDP sin traducción — un solo interior sirve para todos los países.',
      platform: 'Amazon KDP',
    },
    {
      title: 'Paquetes de Actividades de Puzzle de Cuadrícula para TpT',
      description: 'Sube paquetes de actividades de puzzle de cuadrícula a TpT con dificultad diferenciada como punto de venta principal. Los maestros que buscan actividades de percepción visual valoran puzzles que incluyen múltiples niveles de dificultad y claves de respuestas. Crea sets alineados con el currículo: puzzles de cuadrícula de animales para unidades de ciencias, puzzles de alimentos para temas de nutrición, puzzles de vehículos para temas de transporte. Cada paquete incluye versiones fáciles (2×2), medias (3×3) y difíciles (4×4) de los mismos puzzles temáticos para que los maestros asignen por nivel del alumno. La clave de respuestas autogenerada con círculos numerados superpuestos elimina el tiempo de preparación del maestro.',
      platform: 'Teachers Pay Teachers',
    },
    {
      title: 'Embudo de Tráfico con Puzzles de Cuadrícula en Pinterest',
      description: 'Los puzzles de cuadrícula crean pines visualmente impactantes en Pinterest — la cuadrícula de imagen dividida con paleta de piezas numeradas y encabezado colorido crea un formato educativo inmediatamente reconocible. Publica puzzles de muestra mostrando diferentes tamaños de cuadrícula: un sencillo 2×2 para pines fáciles, un detallado 4×4 para pines de desafío y la clave de respuestas con círculos numerados para pines de solución. Crea series de pines separadas para "puzzles de cuadrícula de animales", "rompecabezas de imágenes de festividades" y "actividades de percepción visual". El formato puramente visual atrae a padres y maestros en todos los países. Enlaza cada pin a tus listados de productos en Etsy o TpT.',
      platform: 'Pinterest',
    },
    {
      title: 'Kit Completo de Puzzles de Cuadrícula en Gumroad',
      description: 'Agrupa puzzles de cuadrícula de los 104 temas y todos los niveles de dificultad en un kit integral en Gumroad. Incluye más de 300 puzzles abarcando configuraciones fáciles, medias y difíciles, cada uno con su clave de respuestas autogenerada — más de 600 archivos en total. El sistema de dificultad de tres niveles (cuadrículas de 2×2, 3×3, 4×4) con cantidades variables de pistas proporciona enorme variedad. El formato de kit justifica precios premium porque los compradores obtienen una biblioteca completa de puzzles en lugar de paquetes individuales. Añade nuevas colecciones estacionales trimestralmente para impulsar compras recurrentes.',
      platform: 'Gumroad',
    },
    {
      title: 'Línea de Productos de Puzzles Visuales Globales',
      description: 'El Puzzle de Cuadrícula produce puzzles puramente visuales — las piezas de imagen y los números son universales. Los mismos archivos de producto funcionan en todos los países sin traducción ni modificación. Una sesión de creación produce un catálogo vendible globalmente. Vende archivos idénticos en tiendas Etsy dirigidas a diferentes países, publica los mismos interiores de KDP en todos los mercados internacionales de Amazon y lista en TpT para maestros internacionales. Sin versiones separadas por idioma, sin costos de traducción, sin mantenimiento por región. La función de subir imágenes personalizadas también permite servicios de personalización localizados sin cambiar el formato básico del producto.',
      platform: 'Etsy / Amazon KDP',
    },
  ],

  proTips: [
    {
      title: 'Combina Tamaño de Cuadrícula y Celdas Pista para Sets de Dificultad Graduada',
      description: 'Los dos controles de dificultad independientes — tamaño de cuadrícula (2×2 a 4×4) y celdas pista (1–5) — crean un amplio espectro de niveles de desafío a partir de una sola imagen. Una cuadrícula de 2×2 con 3 pistas deja solo 1 pieza por asociar: un calentamiento trivial. Una cuadrícula de 4×4 con 1 pista requiere asociar 15 piezas: un desafío genuino de razonamiento espacial. Crea paquetes de dificultad graduada comenzando fácil y reduciendo progresivamente las pistas mientras aumentas el tamaño de cuadrícula. Los paquetes diferenciados se venden mejor que los de dificultad única porque los maestros necesitan puzzles para aulas con habilidades mixtas.',
    },
    {
      title: 'Usa la Aleatorización Fisher-Yates para Multiplicar Puzzles Únicos',
      description: 'Cada clic en Generar baraja la paleta de piezas usando aleatorización Fisher-Yates, produciendo un orden de piezas numeradas diferente. Esto significa que una sola imagen con configuración fija de cuadrícula genera múltiples fichas de puzzle únicas, cada una con diferentes números de piezas y posiciones de pistas. Usa esto para llenar rápidamente paquetes grandes sin necesitar imágenes fuente diferentes para cada página. Genera 10–15 puzzles únicos por imagen, luego multiplica por 104 temas para catálogos de productos masivos con esfuerzo mínimo.',
    },
    {
      title: 'Destaca la Clave de Respuestas con Círculos Numerados como Tu Punto de Venta',
      description: 'La clave de respuestas autogenerada muestra la imagen completa con círculos numerados indicando qué pieza de la paleta pertenece a cada posición — una presentación profesional que separa tus puzzles de cuadrícula de competidores que venden puzzles sin soluciones. Incluye siempre vistas previas de la clave de respuestas en las imágenes de tus listados en Etsy y TpT. Muestra la ficha y la clave de respuestas lado a lado para demostrar el paquete completo. El sistema de lienzo dual produce ambas versiones simultáneamente, por lo que incluir claves de respuestas no añade tiempo de producción extra.',
    },
    {
      title: 'Explota el Formato Puramente Visual para Ventas Globales',
      description: 'Los puzzles de cuadrícula contienen solo piezas de imagen y números — sin texto específico de idioma en la salida de la ficha. Esto significa que cada puzzle que creas es instantáneamente vendible a nivel mundial sin traducción ni localización. Un set de puzzles de cuadrícula sirve para todas las tiendas Etsy internacionales, todos los mercados de KDP y todos los compradores de TpT independientemente del idioma. Mientras los competidores crean versiones separadas por idioma de fichas con mucho texto, tus puzzles de cuadrícula funcionan en todas partes desde un solo conjunto de archivos.',
    },
    {
      title: 'Usa Imágenes Personalizadas para Productos Personalizados Premium',
      description: 'El panel de Subir Imágenes Personalizadas acepta archivos PNG, JPG y GIF, convirtiendo cualquier foto en un puzzle de cuadrícula. Ofrece la creación de puzzles de cuadrícula personalizados como un servicio premium en Etsy donde los clientes envían sus fotos y tú entregas fichas de puzzle impresas con claves de respuestas — fotos familiares, retratos de mascotas, recuerdos de vacaciones o fotos de grupo del aula. Los productos personalizados tienen márgenes más altos que los puzzles basados en la biblioteca porque cada pedido es único. El tamaño de cuadrícula configurable y la cantidad de pistas te permiten ajustar la dificultad para cualquier audiencia y grupo de edad.',
    },
    {
      title: 'Usa Fondos y Bordes Temáticos para Branding Cohesivo de Producto',
      description: 'El sistema independiente de fondos y bordes temáticos con controles de opacidad separados te permite crear una identidad visual consistente en tus paquetes de puzzles de cuadrícula. Configura un fondo temático sutil al 15–25% de opacidad para calidez visual sin distraer del contenido del puzzle. Superpone un borde decorativo al 80–100% de opacidad para un marco pulido. Aplica la misma combinación de fondo y borde en cada puzzle de un paquete para un aspecto de producto cohesivo que los compradores asocian con calidad y profesionalismo.',
    },
    {
      title: 'Elige el Tamaño de Cuadrícula Correcto para Tu Audiencia Objetivo',
      description: 'Adapta la configuración de la cuadrícula a las expectativas del comprador en cada mercado. Para recursos de TpT dirigidos a preescolar y primer grado, usa cuadrículas de 2×2 y 2×3 con 2–3 pistas para puzzles accesibles. Para paquetes de actividades en Etsy dirigidos a padres de alumnos de primaria, usa cuadrículas de 3×3 con 1–2 pistas para un desafío equilibrado. Para cuadernos de puzzles en KDP dirigidos a alumnos mayores y adultos, usa cuadrículas de 4×3 y 4×4 con 1 pista para desafíos genuinos de razonamiento espacial. Adaptar la complejidad de la cuadrícula a la edad de la audiencia asegura reseñas positivas y compras recurrentes.',
    },
  ],

  faq: [
    {
      question: '¿Hay una prueba gratuita?',
      answer: 'Sí. La herramienta ofrece una prueba gratuita con todas las funciones — todos los tamaños de cuadrícula de 2×2 a 4×4, celdas pista ajustables (1–5), aleatorización Fisher-Yates de piezas, la clave de respuestas autogenerada con círculos numerados superpuestos, las 104 colecciones temáticas de imágenes con más de 3.100 ilustraciones, subida de imágenes personalizadas, fondos y bordes temáticos con opacidad independiente, opción de escala de grises y todos los formatos de descarga. Sin registro, sin tarjeta de crédito. Las descargas de la prueba gratuita incluyen una marca de agua. Compra una licencia comercial para eliminar la marca de agua y desbloquear derechos de venta.',
    },
    {
      question: '¿Cómo funciona el puzzle de cuadrícula?',
      answer: 'La ficha muestra una sola imagen dividida en una cuadrícula donde algunas celdas muestran la pieza real de la imagen (celdas pista) y las celdas restantes muestran marcadores de posición "?". Junto a o debajo de la cuadrícula, una paleta numerada muestra todas las piezas ocultas en orden barajado. Los alumnos examinan las celdas pista visibles, estudian las piezas numeradas en la paleta y determinan qué número pertenece a cada posición vacía de la cuadrícula. El puzzle requiere razonamiento espacial — asociar el contenido de cada pieza individual con su ubicación correcta en la imagen general. Configura la cuadrícula de 2×2 (4 piezas) a 4×4 (16 piezas) y establece de 1 a 5 celdas pista para controlar la dificultad.',
    },
    {
      question: '¿Cómo funciona la clave de respuestas autogenerada?',
      answer: 'Cuando generas una ficha, la aplicación crea simultáneamente una clave de respuestas de asociación en una pestaña de lienzo separada. La clave de respuestas muestra la imagen completa sin cortar con círculos numerados superpuestos en cada celda de la cuadrícula — círculos con fondo amarillo (#ffffe0), contorno negro y números en fuente Fredoka que muestran qué pieza de la paleta pertenece a cada posición. Alterna entre las pestañas de Ficha y Clave de Respuestas para comparar. Descarga cada versión de forma independiente — ficha JPEG, ficha PDF, clave de respuestas JPEG y clave de respuestas PDF — obteniendo cuatro archivos listos para producción de una sola generación. La clave de respuestas automática elimina la creación manual y garantiza precisión perfecta.',
    },
    {
      question: '¿Qué tamaños de cuadrícula están disponibles?',
      answer: 'El generador soporta de 2 a 4 filas y de 2 a 4 columnas, configuradas de forma independiente. Esto crea cuadrículas desde 2×2 (4 piezas) hasta 4×4 (16 piezas). El valor por defecto es 3×3 (9 piezas). Puedes establecer filas y columnas en valores diferentes para puzzles rectangulares — una cuadrícula de 2×4 crea un diseño ancho con 8 piezas, mientras que una de 4×2 produce un puzzle estrecho y alto. Las cuadrículas más pequeñas funcionan bien para alumnos más pequeños y puzzles introductorios, mientras que las más grandes desafían a alumnos mayores y crean productos de puzzle premium.',
    },
    {
      question: '¿Cómo controlan las celdas pista la dificultad del puzzle?',
      answer: 'Las celdas pista son posiciones de la cuadrícula donde la pieza de la imagen permanece visible como referencia. Establece de 1 a 5 celdas pista usando el control deslizante en el panel de Opciones de Cuadrícula (por defecto 1). Más pistas hacen el puzzle más fácil porque los alumnos tienen más puntos de referencia para identificar dónde pertenecen las piezas. Para una cuadrícula de 3×3: 1 pista significa 8 piezas por asociar (desafiante), 3 pistas significan 6 piezas (moderado), 5 pistas significan 4 piezas (fácil). Para una cuadrícula de 4×4: 1 pista significa 15 piezas por asociar (muy desafiante), 5 pistas significan 11 piezas (aún considerable). Este único control crea sets de dificultad graduada a partir de una sola imagen.',
    },
    {
      question: '¿Puedo generar múltiples puzzles únicos de la misma imagen?',
      answer: 'Sí. Cada vez que haces clic en Generar, la aplicación baraja las piezas usando aleatorización Fisher-Yates, produciendo un orden de piezas numeradas diferente. Las posiciones de las celdas pista también cambian entre generaciones. Esto significa que puedes crear múltiples fichas de puzzle distintas a partir de una sola imagen sin cambiar ninguna configuración — cada una tendrá diferentes números de piezas y posiciones de pistas, haciéndolas experiencias de puzzle únicas. Esto es esencial para crear paquetes de productos grandes de forma eficiente.',
    },
    {
      question: '¿Puedo subir mis propias imágenes para puzzles de cuadrícula?',
      answer: 'Sí. El panel de Subir Imágenes Personalizadas te permite cargar archivos PNG, JPG o GIF desde tu ordenador. Las imágenes subidas aparecen en una galería debajo del área de carga. Haz clic en cualquier imagen subida para seleccionarla como fuente de tu puzzle. Esta función es ideal para crear puzzles personalizados a partir de fotos familiares, obras de arte personalizadas, imágenes de marca o contenido específico del aula. Combina imágenes subidas con la biblioteca integrada de 104 temas para máxima variedad creativa.',
    },
    {
      question: '¿Cómo se adapta el diseño a vertical y horizontal?',
      answer: 'El generador detecta automáticamente la orientación de tu página y reposiciona los elementos. Las páginas en vertical (alto > ancho) colocan la cuadrícula arriba usando el 45% de la altura disponible con la paleta numerada debajo y un encabezado a ancho completo (100px de altura, 15px de radio). Las páginas en horizontal (ancho > alto) posicionan la cuadrícula a la izquierda (48% del ancho disponible) con la paleta a la derecha y un encabezado compacto (70px de altura, 35px de radio). Este reposicionamiento automático asegura que los puzzles de cuadrícula se vean equilibrados y profesionales en cualquier orientación sin ajustes manuales de diseño.',
    },
    {
      question: '¿El Generador de Puzzle de Cuadrícula es sensible al idioma?',
      answer: 'No. El Puzzle de Cuadrícula es puramente visual — la salida del puzzle contiene solo piezas de imagen y números, sin contenido de texto localizado en la ficha. La interfaz de la aplicación (menús, botones, texto del encabezado) soporta los 11 idiomas, pero el puzzle generado funciona idénticamente independientemente de la selección de idioma. Esto hace que los puzzles de cuadrícula sean universalmente vendibles en todos los mercados sin traducción. Un set de puzzles sirve para todas las tiendas Etsy internacionales, mercados de KDP y compradores de TpT.',
    },
    {
      question: '¿Qué tamaños de página y formatos de exportación están disponibles?',
      answer: 'Los tamaños de página incluyen Carta Vertical, Carta Horizontal, A4 Vertical, A4 Horizontal y dimensiones personalizadas. El Puzzle de Cuadrícula no soporta el tamaño Cuadrado (1200×1200). Exporta como JPEG de alta resolución o PDF listo para imprimir a 300 DPI (multiplicador 6×, calidad JPEG 1,0). Activa la escala de grises para salida con ahorro de tinta. Cada generación produce cuatro archivos de descarga: ficha JPEG, ficha PDF, clave de respuestas JPEG y clave de respuestas PDF. Todas las exportaciones están listas para producción en descargas digitales, cuadernos impresos y fichas para el aula.',
    },
    {
      question: '¿Puedo vender puzzles de cuadrícula creados con esta herramienta de forma comercial?',
      answer: 'Sí. Con una licencia comercial, tienes derechos completos para vender puzzles de cuadrícula como descargas digitales en Etsy, cuadernos impresos de percepción visual en Amazon KDP, recursos para el aula en TpT o a través de cualquier otro canal de venta. Los tamaños de cuadrícula configurables, las celdas pista ajustables, la aleatorización Fisher-Yates, las claves de respuestas autogeneradas con círculos numerados superpuestos, la subida de imágenes personalizadas y las 104 colecciones temáticas de imágenes te dan todo lo necesario para crear productos profesionales que compiten en categorías de puzzles y percepción visual en todos los principales mercados.',
    },
    {
      question: '¿Cuál es la política de reembolso?',
      answer: 'Prueba antes de comprar con nuestra prueba gratuita — todas las funciones están disponibles para que puedas evaluar completamente la herramienta antes de comprar. Debido a que la prueba gratuita te da acceso completo a todos los tamaños de cuadrícula, celdas pista ajustables, la clave de respuestas autogenerada con círculos numerados superpuestos, los 104 temas, la subida de imágenes personalizadas, fondos y bordes temáticos, exportación en escala de grises y todos los formatos de descarga, no ofrecemos reembolsos en compras de licencias. Asegúrate de que la herramienta se adapta a tus necesidades usando la prueba gratuita antes de comprar.',
    },
  ],

  internalLinks: [
    { pageType: 'app', slug: 'rompecabezas-cuadricula-fichas', anchorText: 'Puzzles de Cuadrícula — Detalles Completos del Producto' },
    { pageType: 'tool', slug: 'generador-fichas-asociacion', anchorText: 'Generador de Fichas de Asociación' },
    { pageType: 'tool', slug: 'generador-discriminacion-visual', anchorText: 'Generador de Discriminación Visual' },
    { pageType: 'tool', slug: 'generador-tarjetas-bingo', anchorText: 'Generador de Tarjetas de Bingo' },
    { pageType: 'tool', slug: 'generador-piezas-faltantes', anchorText: 'Generador de Piezas Faltantes' },
    { pageType: 'tool', slug: 'generador-fichas-intruso', anchorText: 'Generador de Fichas del Intruso' },
    { pageType: 'tool', slug: 'generador-clasificacion-imagenes', anchorText: 'Generador de Clasificación de Imágenes' },
    { pageType: 'tool', slug: 'generador-fichas-suma', anchorText: 'Generador de Fichas de Suma' },
  ],

  visuals: {
    heroImages: {
      primary: '/samples/spanish/grid match/Puzzle de Cuadrícula 1.webp',
      primaryAlt: 'Ficha de puzzle de cuadrícula con imagen dividida en piezas, celdas pista reveladas y paleta de piezas numeradas para actividad de razonamiento espacial',
    },
    sampleGallery: [
      {
        src: '/samples/spanish/grid match/Puzzle de Cuadrícula 2.webp',
        alt: 'Puzzle de cuadrícula de tres por tres con una celda pista visible y ocho piezas numeradas en paleta barajada para asociar',
        caption: 'Puzzle de cuadrícula 3×3 — una celda pista revelada, ocho piezas por asociar de la paleta numerada',
      },
      {
        src: '/samples/spanish/grid match/Puzzle de Cuadrícula 3.webp',
        alt: 'Puzzle de cuadrícula avanzado de cuatro por cuatro con dieciséis piezas y pistas mínimas para actividad desafiante de percepción visual',
        caption: 'Puzzle avanzado 4×4 — tamaño máximo de cuadrícula con 16 piezas para razonamiento espacial desafiante',
      },
      {
        src: '/samples/spanish/grid match/Puzzle de Cuadrícula 1 answer_key.webp',
        alt: 'Clave de respuestas de puzzle de cuadrícula mostrando imagen completa con círculos amarillos numerados superpuestos en cada celda indicando la colocación correcta de piezas',
        caption: 'Clave de respuestas autogenerada — círculos numerados (#ffffe0) muestran la colocación correcta de piezas en la imagen completa',
      },
    ],
    youtubeId: 'RGtED1Bnut8',
    videoTitle: 'Cómo Crear Puzzles de Cuadrícula con Tamaños Configurables, Celdas Pista Ajustables y Claves de Respuestas Automáticas — Tutorial Paso a Paso',
  },
};

export default content;
