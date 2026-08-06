const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'frontend', 'config', 'bundle-content', 'es');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const bundles = [
  {
    bundleId: 'math-bundle',
    title: 'Pack Completo de Matem\u00e1ticas',
    tagline: '6 generadores de fichas de matem\u00e1ticas profesionales en un solo paquete',
    primaryKeyword: 'pack fichas matem\u00e1ticas imprimibles',
    secondaryKeywords: ['generadores matem\u00e1ticas profesionales', 'fichas matem\u00e1ticas imprimibles pack', 'paquete actividades matem\u00e1ticas', 'creador fichas matem\u00e1ticas', 'herramientas matem\u00e1ticas educativas'],
    lsiKeywords: ['fichas suma', 'fichas resta', 'puzzles matem\u00e1ticos', 'actividades matem\u00e1ticas imprimibles', 'fichas matem\u00e1ticas comerciales', 'fichas matem\u00e1ticas PDF', 'problemas visuales', 'sentido num\u00e9rico'],
    heroImg: '/samples/english/addition/Addition Fun 1.jpeg',
    heroAlt: 'Ficha de suma con im\u00e1genes coloridas de animales',
    heroImg2: '/samples/english/subtraction/Subtraction Fun 1.jpeg',
    heroAlt2: 'Ficha de resta con ejercicios visuales',
    gallery: [
      { src: '/samples/english/addition/Addition Fun 3.jpeg', alt: 'Ficha de suma con tema de veh\u00edculos', caption: 'Suma \u2014 Veh\u00edculos' },
      { src: '/samples/english/subtraction/Subtraction Fun 2.jpeg', alt: 'Ficha de resta con tema de frutas', caption: 'Resta \u2014 Frutas' },
      { src: '/samples/english/math puzzle/Math Puzzles (1).jpeg', alt: 'Puzzle matem\u00e1tico en cuadr\u00edcula', caption: 'Puzzle Matem\u00e1tico' },
    ],
    youtubeId: '6O5aCzHkh8M',
    apps: [
      { appId: 'addition', title: 'Generador de Fichas de Suma', description: 'Cree fichas de suma ilustradas con cuatro modos: Imagen + Imagen, Imagen + N\u00famero, Encontrar el Sumando y Mixto. Operandos de 1 a 99, 104 temas, respuestas autom\u00e1ticas.' },
      { appId: 'subtraction', title: 'Generador de Fichas de Resta', description: 'Genere fichas visuales de resta con modo de tachar. Los mismos cuatro modos y 104 temas que la suma para una cobertura completa de operaciones.' },
      { appId: 'code-addition', title: 'Generador de C\u00f3digo de Suma', description: 'Los alumnos resuelven sumas para descifrar mensajes secretos. Este formato de descifrar c\u00f3digos supera sistem\u00e1ticamente a las fichas est\u00e1ndar en participaci\u00f3n.' },
      { appId: 'more-less', title: 'Generador M\u00e1s o Menos', description: 'Desarrolle el sentido num\u00e9rico con fichas de comparaci\u00f3n visual. Los alumnos comparan grupos de im\u00e1genes tem\u00e1ticas para determinar cu\u00e1l tiene m\u00e1s o menos.' },
      { appId: 'math-puzzle', title: 'Generador de Puzzles Matem\u00e1ticos', description: 'Presente las operaciones en cuadr\u00edculas interconectadas donde los alumnos encuentran el camino correcto. Un enfoque diferente que desarrolla el razonamiento l\u00f3gico.' },
      { appId: 'math-worksheet', title: 'Generador de Fichas de Matem\u00e1ticas', description: 'Cree fichas de operaciones tradicionales con c\u00e1lculo horizontal y vertical. Soporta suma, resta y mixto con rangos de 1 a 999.' },
    ],
    description: `Construir un negocio de fichas de matem\u00e1ticas significa cubrir cada operaci\u00f3n, cada nivel y cada estilo de aprendizaje. El Pack de Matem\u00e1ticas le ofrece seis generadores especializados que trabajan juntos para crear un programa completo \u2014 desde el conteo b\u00e1sico hasta operaciones de m\u00faltiples d\u00edgitos y puzzles l\u00f3gicos. En lugar de comprar cada aplicaci\u00f3n por separado por 162 $ (27 $ \u00d7 6), obtiene la colecci\u00f3n completa por 79 $ con el Pack Comercial o 119 $ con el Acceso Completo.

Los generadores de Suma y Resta cubren los fundamentos con cuatro modos de ejercicio cada uno: Imagen + Imagen para principiantes, Imagen + N\u00famero para la transici\u00f3n a lo abstracto, Encontrar el N\u00famero Faltante para el razonamiento inverso, y Mixto para la evaluaci\u00f3n completa. El generador de C\u00f3digo de Suma a\u00f1ade una dimensi\u00f3n l\u00fadica donde los alumnos resuelven ecuaciones para descifrar mensajes secretos.

Cada generador comparte el mismo conjunto de funcionalidades profesionales: 104 temas ilustrados, un editor canvas para dise\u00f1os personalizados, m\u00faltiples fuentes, generaci\u00f3n autom\u00e1tica de respuestas y exportaci\u00f3n en PDF y JPEG. Ya sea que venda cuadernos de matem\u00e1ticas en Etsy, cree programas para Amazon KDP o produzca material complementario para su aula, este pack proporciona la variedad que sus clientes esperan.`,
  },
  {
    bundleId: 'literacy-bundle',
    title: 'Pack de Lectura y Escritura',
    tagline: '7 generadores para juegos de palabras, pr\u00e1ctica de escritura y aprendizaje de idiomas',
    primaryKeyword: 'pack fichas lectura escritura',
    secondaryKeywords: ['generadores lectura', 'fichas idiomas imprimibles', 'paquete actividades lectoescritura', 'herramientas lectura escritura', 'pack juegos de palabras'],
    lsiKeywords: ['sopa de letras', 'escritura manuscrita', 'vocabulario', 'fonemas', 'alfabeto', 'crucigramas', 'lectura', 'ortograf\u00eda'],
    heroImg: '/samples/english/wordsearch/Word Search 1.jpeg', heroAlt: 'Sopa de letras con im\u00e1genes',
    gallery: [{ src: '/samples/english/wordsearch/Word Search 1.jpeg', alt: 'Sopa de letras', caption: 'Sopa de Letras' }],
    youtubeId: '36keBFzJbPo',
    apps: [
      { appId: 'alphabet-train', title: 'Tren del Alfabeto', description: 'Cree fichas de alfabeto en forma de tren. Los ni\u00f1os aprenden las letras asoci\u00e1ndolas con im\u00e1genes tem\u00e1ticas en cada vag\u00f3n.' },
      { appId: 'wordsearch', title: 'Sopa de Letras', description: 'Genere cuadr\u00edculas de sopa de letras con im\u00e1genes o listas personalizadas. Modo texto para KDP, modo im\u00e1genes para los m\u00e1s peque\u00f1os.' },
      { appId: 'word-scramble', title: 'Letras Desordenadas', description: 'Los alumnos reconstruyen palabras a partir de letras desordenadas. Refuerza la ortograf\u00eda y el vocabulario de manera l\u00fadica.' },
      { appId: 'prepositions', title: 'Preposiciones', description: 'Ense\u00f1e las preposiciones de lugar con fichas ilustradas. Encima, debajo, delante, detr\u00e1s, al lado de.' },
      { appId: 'word-guess', title: 'Adivinar la Palabra', description: 'Los ni\u00f1os adivinan la palabra a partir de pistas visuales. Desarrolla el vocabulario y la inferencia.' },
      { appId: 'cryptogram', title: 'Criptogramas', description: 'Puzzles de sustituci\u00f3n de letras donde los alumnos descifran mensajes reemplazando s\u00edmbolos por letras.' },
      { appId: 'writing', title: 'Escritura', description: 'Genere fichas de escritura guiada con l\u00edneas y modelos. Cursiva y letra de molde para todos los niveles.' },
    ],
    description: `El Pack de Lectura y Escritura re\u00fane siete generadores que cubren todo el espectro de la lectoescritura \u2014 desde el reconocimiento de letras para los m\u00e1s peque\u00f1os hasta puzzles de palabras complejos para alumnos mayores. En lugar de comprar cada herramienta por separado por 189 $ (27 $ \u00d7 7), obtenga todo por 79 $ (Comercial) o 119 $ (Acceso Completo).

El generador del Tren del Alfabeto ayuda a los m\u00e1s peque\u00f1os a reconocer y escribir las letras. Las Sopas de Letras y Crucigramas desarrollan el vocabulario y la ortograf\u00eda. Las Letras Desordenadas refuerzan la conciencia ortogr\u00e1fica. El generador de Escritura ofrece l\u00edneas guiadas para la pr\u00e1ctica manuscrita.

Cada generador soporta 11 idiomas, lo que lo convierte en una herramienta ideal para los mercados multiling\u00fces. Los profesores de ELE, las familias biling\u00fces y los vendedores internacionales encuentran en este pack todo lo que necesitan para crear material pedag\u00f3gico de calidad.`,
  },
  {
    bundleId: 'visual-bundle',
    title: 'Pack de Aprendizaje Visual',
    tagline: '7 generadores para dibujo, colorear, patrones y percepci\u00f3n visual',
    primaryKeyword: 'pack fichas aprendizaje visual',
    secondaryKeywords: ['generadores visuales educativos', 'fichas colorear imprimibles pack', 'paquete actividades visuales', 'herramientas grafomotricidad preescolar', 'pack dibujo educativo'],
    lsiKeywords: ['colorear', 'dibujo guiado', 'patrones', 'grafomotricidad', 'percepci\u00f3n visual', 'motricidad fina', 'comparaci\u00f3n de tama\u00f1os', 'trazado'],
    heroImg: '/samples/english/coloring/Coloring 1.jpeg', heroAlt: 'P\u00e1gina para colorear tem\u00e1tica',
    gallery: [{ src: '/samples/english/coloring/Coloring 1.jpeg', alt: 'Colorear', caption: 'Colorear tem\u00e1tico' }],
    youtubeId: 'gQEk7dPTZUA',
    apps: [
      { appId: 'big-small', title: 'Grande y Peque\u00f1o', description: 'Fichas de comparaci\u00f3n de tama\u00f1os con im\u00e1genes ilustradas. Los ni\u00f1os identifican el m\u00e1s grande y el m\u00e1s peque\u00f1o.' },
      { appId: 'pattern-train', title: 'Tren de Patrones', description: 'Series l\u00f3gicas en forma de tren. Los ni\u00f1os completan la secuencia identificando el patr\u00f3n repetitivo.' },
      { appId: 'pattern-worksheet', title: 'Fichas de Patrones', description: 'Reconocimiento y completado de patrones visuales. Desarrolla el razonamiento l\u00f3gico y el pensamiento matem\u00e1tico.' },
      { appId: 'draw-and-color', title: 'Dibujar y Colorear', description: 'Fichas de dibujo guiado y colorear con temas ilustrados. Combina creatividad y motricidad fina.' },
      { appId: 'drawing-lines', title: 'Trazado de L\u00edneas', description: 'Ejercicios de grafomotricidad para trazar l\u00edneas entre im\u00e1genes. Preparaci\u00f3n para la escritura y desarrollo de la coordinaci\u00f3n.' },
      { appId: 'coloring', title: 'P\u00e1ginas para Colorear', description: 'P\u00e1ginas para colorear tem\u00e1ticas con 104 temas. Los libros para colorear son los productos m\u00e1s vendidos en volumen.' },
      { appId: 'chart-count', title: 'Contar y Colorear', description: 'Gr\u00e1ficos para completar contando y coloreando. Iniciaci\u00f3n a la lectura de datos y estad\u00edsticas.' },
    ],
    description: `El Pack de Aprendizaje Visual combina siete generadores que desarrollan las habilidades visuales, la motricidad fina y la creatividad \u2014 fundamentos esenciales para todo aprendizaje. Obtenga siete herramientas por 79 $ en lugar de 189 $ por separado.

Los libros para colorear son los productos imprimibles m\u00e1s vendidos en Etsy. A\u00f1ada las fichas de patrones, el dibujo guiado, el trazado y la comparaci\u00f3n de tama\u00f1os para crear un cat\u00e1logo completo de actividades visuales. El Pack de Aprendizaje Visual es particularmente adecuado para vendedores enfocados en preescolar e infantil, donde la demanda de actividades visuales es m\u00e1s fuerte.`,
  },
  {
    bundleId: 'matching-bundle',
    title: 'Pack de Asociaci\u00f3n y Clasificaci\u00f3n',
    tagline: '5 generadores para fichas de asociaci\u00f3n, clasificaci\u00f3n y correspondencia',
    primaryKeyword: 'pack fichas asociaci\u00f3n clasificaci\u00f3n',
    secondaryKeywords: ['generadores asociaci\u00f3n', 'fichas clasificaci\u00f3n imprimibles pack', 'paquete correspondencia', 'herramientas emparejamiento preescolar', 'pack juegos asociaci\u00f3n'],
    lsiKeywords: ['asociaci\u00f3n im\u00e1genes', 'sombras siluetas', 'bingo educativo', 'clasificaci\u00f3n categorizaci\u00f3n', 'cuadr\u00edcula correspondencia', 'discriminaci\u00f3n visual', 'emparejamiento', 'ordenaci\u00f3n'],
    heroImg: '/samples/english/matching/Matching 1.jpeg', heroAlt: 'Ficha de asociaci\u00f3n imagen-palabra',
    gallery: [{ src: '/samples/english/matching/Matching 1.jpeg', alt: 'Asociaci\u00f3n', caption: 'Asociaci\u00f3n de im\u00e1genes' }],
    youtubeId: 'gQEk7dPTZUA',
    apps: [
      { appId: 'matching', title: 'Fichas de Asociaci\u00f3n', description: 'Tres modos: imagen-imagen, imagen-palabra, imagen-letra inicial. Los alumnos trazan l\u00edneas entre los elementos correspondientes.' },
      { appId: 'grid-match', title: 'Cuadr\u00edculas de Correspondencia', description: 'Puzzles en cuadr\u00edcula donde los ni\u00f1os encuentran las im\u00e1genes en una tabla. Desarrolla la orientaci\u00f3n espacial.' },
      { appId: 'shadow-match', title: 'Asociaci\u00f3n de Sombras', description: 'Los ni\u00f1os asocian cada imagen con su sombra. Excelente para la discriminaci\u00f3n visual y el reconocimiento de formas.' },
      { appId: 'bingo', title: 'Tarjetas de Bingo', description: 'Genere conjuntos de tarjetas de bingo con im\u00e1genes o palabras. Los profesores las adoran para las actividades de clase.' },
      { appId: 'picture-sort', title: 'Clasificaci\u00f3n de Im\u00e1genes', description: 'Fichas de clasificaci\u00f3n donde los ni\u00f1os ordenan im\u00e1genes por categor\u00eda. Desarrolla el pensamiento l\u00f3gico y la categorizaci\u00f3n.' },
    ],
    description: `El Pack de Asociaci\u00f3n y Clasificaci\u00f3n agrupa cinco generadores centrados en las habilidades cognitivas fundamentales: asociaci\u00f3n, correspondencia, discriminaci\u00f3n visual y clasificaci\u00f3n. Por 79 $ en lugar de 135 $ por separado.

Estas fichas son de las m\u00e1s demandadas en preescolar porque desarrollan habilidades transversales utilizadas en todas las materias. La asociaci\u00f3n de sombras y el bingo son productos recurrentes de alta venta en Etsy y TPT.`,
  },
  {
    bundleId: 'puzzle-bundle',
    title: 'Pack de Puzzles y L\u00f3gica',
    tagline: '4 generadores de puzzles para desarrollar el razonamiento l\u00f3gico',
    primaryKeyword: 'pack puzzles l\u00f3gica ni\u00f1os',
    secondaryKeywords: ['generadores puzzles educativos', 'fichas l\u00f3gica imprimibles pack', 'paquete razonamiento ni\u00f1os', 'puzzles imprimibles preescolar', 'pack juegos l\u00f3gica'],
    lsiKeywords: ['piezas faltantes', 'intruso', 'sudoku ni\u00f1os', 'laberinto', 'razonamiento', 'deducci\u00f3n', 'observaci\u00f3n', 'pensamiento cr\u00edtico'],
    heroImg: '/samples/english/sudoku/Sudoku 1.jpeg', heroAlt: 'Sudoku para ni\u00f1os con im\u00e1genes',
    gallery: [{ src: '/samples/english/sudoku/Sudoku 1.jpeg', alt: 'Sudoku ni\u00f1os', caption: 'Sudoku 4x4' }],
    youtubeId: 'VXGKFQRT2rA',
    apps: [
      { appId: 'missing-pieces', title: 'Piezas Faltantes', description: 'Los ni\u00f1os encuentran la pieza que falta en una imagen. Desarrolla la atenci\u00f3n al detalle y el razonamiento espacial.' },
      { appId: 'odd-one-out', title: 'Encontrar el Intruso', description: 'Los ni\u00f1os identifican la imagen que no corresponde al grupo. Refuerza la categorizaci\u00f3n y el pensamiento cr\u00edtico.' },
      { appId: 'sudoku', title: 'Sudoku para Ni\u00f1os', description: 'Sudokus 4x4 con im\u00e1genes en lugar de n\u00fameros. Iniciaci\u00f3n a la l\u00f3gica y al razonamiento deductivo.' },
      { appId: 'picture-path', title: 'Camino de Im\u00e1genes', description: 'Laberintos visuales donde los ni\u00f1os siguen el camino correcto a trav\u00e9s de im\u00e1genes. Desarrolla la orientaci\u00f3n y la planificaci\u00f3n.' },
    ],
    description: `El Pack de Puzzles y L\u00f3gica re\u00fane cuatro generadores dise\u00f1ados para desarrollar el razonamiento l\u00f3gico, la atenci\u00f3n y la resoluci\u00f3n de problemas. Por 79 $ en lugar de 108 $ por separado.

Los puzzles son productos imprimibles de alto margen porque los padres y profesores los consideran herramientas de desarrollo cognitivo. Los sudokus y laberintos se venden particularmente bien en Amazon KDP como cuadernos de actividades.`,
  },
  {
    bundleId: 'search-bundle',
    title: 'Pack de Buscar y Encontrar',
    tagline: '4 generadores para actividades de b\u00fasqueda y descubrimiento',
    primaryKeyword: 'pack fichas buscar encontrar',
    secondaryKeywords: ['generadores b\u00fasqueda ni\u00f1os', 'fichas observaci\u00f3n imprimibles', 'paquete buscar encontrar', 'actividades concentraci\u00f3n ni\u00f1os', 'pack juegos observaci\u00f3n'],
    lsiKeywords: ['buscar y contar', 'objetos ocultos', 'crucigramas', 'b\u00fasqueda del tesoro', 'atenci\u00f3n visual', 'concentraci\u00f3n', 'observaci\u00f3n', 'conteo'],
    heroImg: '/samples/english/find and count/Find and Count 1.jpeg', heroAlt: 'Ficha de buscar y contar',
    gallery: [{ src: '/samples/english/find and count/Find and Count 1.jpeg', alt: 'Buscar y contar', caption: 'Buscar y Contar' }],
    youtubeId: 'hwMKyCpVzSQ',
    apps: [
      { appId: 'find-and-count', title: 'Buscar y Contar', description: 'Los ni\u00f1os buscan y cuentan im\u00e1genes tem\u00e1ticas en una escena. Combina la atenci\u00f3n visual y el conteo.' },
      { appId: 'find-objects', title: 'Objetos Ocultos', description: 'Escenas ilustradas donde los ni\u00f1os deben encontrar objetos espec\u00edficos. Desarrolla la concentraci\u00f3n y la discriminaci\u00f3n visual.' },
      { appId: 'crossword', title: 'Crucigramas', description: 'Crucigramas con pistas en im\u00e1genes. Los ni\u00f1os escriben el nombre de cada imagen en la cuadr\u00edcula. Refuerza vocabulario y ortograf\u00eda.' },
      { appId: 'treasure-hunt', title: 'B\u00fasqueda del Tesoro', description: 'Fichas de direcci\u00f3n y orientaci\u00f3n donde los ni\u00f1os siguen un recorrido con flechas para llegar al tesoro. Desarrolla la orientaci\u00f3n espacial.' },
    ],
    description: `El Pack de Buscar y Encontrar combina cuatro generadores que desarrollan la atenci\u00f3n visual, la concentraci\u00f3n y el vocabulario. Por 79 $ en lugar de 108 $ por separado.

Las actividades de b\u00fasqueda visual son extremadamente populares entre los profesores de preescolar y los padres. Las fichas de Buscar y Contar y Objetos Ocultos son productos recurrentes de alta venta porque los ni\u00f1os las disfrutan y desarrollan habilidades cognitivas esenciales.`,
  },
];

function generateFile(bundle) {
  const galleryStr = (bundle.gallery || []).map(g =>
    `      { src: '${g.src}', alt: '${g.alt.replace(/'/g, "\\'")}', caption: '${(g.caption || '').replace(/'/g, "\\'")}' }`
  ).join(',\n');

  const appsStr = bundle.apps.map(a =>
    `    {\n      appId: '${a.appId}',\n      title: '${a.title.replace(/'/g, "\\'")}',\n      description: '${a.description.replace(/'/g, "\\'")}',\n    }`
  ).join(',\n');

  const secondaryLine = bundle.heroImg2 ? `\n      secondary: '${bundle.heroImg2}',\n      secondaryAlt: '${(bundle.heroAlt2 || '').replace(/'/g, "\\'")}',` : '';

  return `import type { BundleContent } from '../types';

export const content: BundleContent = {
  bundleId: '${bundle.bundleId}',
  locale: 'es',

  seo: {
    titleTag: '${bundle.title.replace(/'/g, "\\'")} | ${bundle.apps.length} Generadores por 79 $',
    metaDescription: 'Obtenga ${bundle.apps.length} generadores profesionales en un solo pack. Ahorre m\u00e1s del 50 % en comparaci\u00f3n con la compra individual. Licencia comercial incluida.',
    primaryKeyword: '${bundle.primaryKeyword.replace(/'/g, "\\'")}',
    secondaryKeywords: ${JSON.stringify(bundle.secondaryKeywords)},
    lsiKeywords: ${JSON.stringify(bundle.lsiKeywords)},
  },

  visuals: {
    heroImages: {
      primary: '${bundle.heroImg}',
      primaryAlt: '${bundle.heroAlt.replace(/'/g, "\\'")}',${secondaryLine}
    },
    sampleGallery: [
${galleryStr}
    ],
    youtubeId: '${bundle.youtubeId}',
    videoTitle: 'Presentaci\u00f3n del ${bundle.title.replace(/'/g, "\\'")}',
  },

  hero: {
    title: '${bundle.title.replace(/'/g, "\\'")}',
    tagline: '${bundle.tagline.replace(/'/g, "\\'")}',
    description: \`${bundle.description}\`,
  },

  appsIncluded: [
${appsStr}
  ],

  bundleBenefits: [
    { title: 'Ahorro significativo', description: 'Pague un precio \u00fanico en lugar de comprar cada generador por separado. Ahorre m\u00e1s del 50 % respecto a la compra individual.' },
    { title: 'Licencia comercial completa', description: 'Venda las fichas creadas en Etsy, Amazon KDP, Teachers Pay Teachers, Gumroad y cualquier otra plataforma sin restricciones.' },
    { title: 'Generaci\u00f3n ilimitada', description: 'Cree tantas fichas como desee con cada generador. Sin l\u00edmites mensuales ni sistema de cr\u00e9ditos.' },
    { title: '104 temas ilustrados', description: 'Acceda a la biblioteca completa de 104 temas para crear fichas tem\u00e1ticas variadas.' },
    { title: '11 idiomas soportados', description: 'Cree fichas en espa\u00f1ol, ingl\u00e9s, alem\u00e1n, franc\u00e9s, portugu\u00e9s, italiano, neerland\u00e9s, sueco, dan\u00e9s, noruego y finland\u00e9s.' },
  ],

  businessUseCases: [
    { title: 'Crear un cat\u00e1logo completo en Etsy', description: 'Utilice todos los generadores para crear un cat\u00e1logo diversificado de fichas tem\u00e1ticas. La variedad aumenta la visibilidad en las b\u00fasquedas de Etsy.', appsUsed: ${JSON.stringify(bundle.apps.map(a => a.appId))} },
    { title: 'Publicar cuadernos en KDP', description: 'Compile fichas de diferentes tipos en cuadernos de actividades de 50-100 p\u00e1ginas para Amazon KDP.', appsUsed: ${JSON.stringify(bundle.apps.slice(0, 3).map(a => a.appId))} },
    { title: 'Packs para profesores en TPT', description: 'Cree packs multi-competencia para Teachers Pay Teachers. Los packs variados se venden mejor que los productos individuales.', appsUsed: ${JSON.stringify(bundle.apps.slice(0, 4).map(a => a.appId))} },
  ],

  faq: [
    { question: '\u00bfQu\u00e9 incluye este pack?', answer: '${bundle.apps.length} generadores profesionales con licencia comercial, 104 temas ilustrados, generaci\u00f3n ilimitada, respuestas autom\u00e1ticas y exportaci\u00f3n PDF/JPEG.' },
    { question: '\u00bfCu\u00e1l es la diferencia entre Comercial y Acceso Completo?', answer: 'El Pack Comercial (79 $) incluye todos los generadores con licencia comercial y temas populares. El Pack Acceso Completo (119 $) a\u00f1ade los 104 temas y todas las futuras actualizaciones.' },
    { question: '\u00bfPuedo probar antes de comprar?', answer: 'S\u00ed. Cada generador est\u00e1 disponible gratuitamente con una marca de agua. Pruebe todas las herramientas sin registro antes de decidir.' },
    { question: '\u00bfLa licencia cubre todas las plataformas?', answer: 'S\u00ed. La licencia comercial cubre Etsy, Amazon KDP, TPT, Gumroad, su propio sitio web y cualquier otra plataforma. Sin restricciones.' },
    { question: '\u00bfHay tarifas recurrentes?', answer: 'No. El pack es una compra \u00fanica. Sin suscripci\u00f3n, sin cuotas mensuales, sin renovaci\u00f3n.' },
    { question: '\u00bfCu\u00e1ntas fichas puedo crear?', answer: 'Ilimitadas. Cree tantas fichas como desee con cada generador, sin l\u00edmites ni cr\u00e9ditos.' },
    { question: '\u00bfLas actualizaciones est\u00e1n incluidas?', answer: 'El Pack Acceso Completo incluye todas las futuras actualizaciones y nuevos temas. El Pack Comercial incluye las actualizaciones de mantenimiento.' },
    { question: '\u00bfCu\u00e1l es su pol\u00edtica de reembolso?', answer: 'Todas las ventas son definitivas debido a la naturaleza digital del producto. Pruebe las versiones gratuitas de cada generador antes de comprar.' },
  ],

  internalLinks: [
${bundle.apps.map(a => `    { slug: '${a.appId}', pageType: 'app' as const, anchorText: '${a.title.replace(/'/g, "\\'")}' }`).join(',\n')}
  ],
};
`;
}

let count = 0;
for (const bundle of bundles) {
  const content = generateFile(bundle);
  fs.writeFileSync(path.join(outDir, `${bundle.bundleId}.ts`), content, 'utf8');
  count++;
}

console.log(`Generated ${count} Spanish bundle-content files in ${outDir}`);
