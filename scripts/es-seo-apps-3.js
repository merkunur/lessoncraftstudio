/**
 * ES SEO Part 3: Apps 18-33
 * Applies SEO strategy from spanish-complete-seo-prompt.md
 * Apps: missing-pieces, shadow-match, picture-path, picture-sort, prepositions,
 *       coloring, draw-and-color, alphabet-train, bingo, pattern-train,
 *       pattern-worksheet, treasure-hunt, sudoku, big-small, more-less, odd-one-out
 */
const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'frontend', 'config', 'app-content', 'es');

function esc(s) {
  return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

function replaceField(content, fieldName, newValue) {
  const re = new RegExp(`(${fieldName}:\\s*)(['"])(?:[^'"\\\\]|\\\\.)*\\2`);
  if (re.test(content)) {
    return content.replace(re, `$1'${esc(newValue)}'`);
  }
  const re2 = new RegExp(`(${fieldName}:\\s*\\n\\s*)(['"])(?:[^'"\\\\]|\\\\.)*\\2`);
  if (re2.test(content)) {
    return content.replace(re2, `$1'${esc(newValue)}'`);
  }
  console.warn(`  WARNING: Could not find field ${fieldName}`);
  return content;
}

function replaceArrayField(content, fieldName, newValues) {
  const re = new RegExp(`(${fieldName}:\\s*)\\[[\\s\\S]*?\\]`);
  if (re.test(content)) {
    const formatted = newValues.map(v => `      '${esc(v)}',`).join('\n');
    return content.replace(re, `$1[\n${formatted}\n    ]`);
  }
  console.warn(`  WARNING: Could not find array field ${fieldName}`);
  return content;
}

function replaceHeroTitle(content, newTitle) {
  const re = /(hero:\s*\{[\s\S]*?title:\s*)(['"])(?:[^'"\\]|\\.)*\2/;
  if (re.test(content)) {
    return content.replace(re, `$1'${esc(newTitle)}'`);
  }
  return content;
}

function replaceHeroDescription(content, newDesc) {
  const re = /(tagline:[\s\S]*?description:\s*\n?\s*)(['"])(?:[^'"\\]|\\.)*\2/;
  if (re.test(content)) {
    return content.replace(re, `$1'${esc(newDesc)}'`);
  }
  console.warn('  WARNING: Could not replace hero description');
  return content;
}

function replaceSectionTitle(content, sectionName, newTitle) {
  const re = new RegExp(`(${sectionName}:\\s*\\{[\\s\\S]*?title:\\s*)(['"])(?:[^'"\\\\]|\\\\.)*\\2`);
  if (re.test(content)) {
    return content.replace(re, `$1'${esc(newTitle)}'`);
  }
  return content;
}

const apps = [
  {
    file: 'missing-pieces.ts',
    seo: {
      primaryKeyword: 'rompecabezas de piezas faltantes para cuadernillos KDP',
      secondaryKeywords: [
        'fichas de piezas faltantes para vender en Etsy',
        'rompecabezas de completar imágenes para KDP',
        'fichas de piezas que faltan licencia comercial',
        'crear fichas de completar visual para vender',
      ],
      lsiKeywords: [
        'rompecabezas visual piezas faltantes vendedores',
        'fichas completar imágenes preescolar KDP',
        'negocio fichas lógica visual mercado hispano',
      ],
      titleTag: 'Piezas faltantes para cuadernillos KDP | LCS',
      metaDescription: 'Cree rompecabezas de piezas faltantes para vender en Etsy y KDP. Los niños completan imágenes. Licencia comercial incluida. Pruebe gratis.',
    },
    hero: {
      title: 'Genere rompecabezas de piezas faltantes para vender en Etsy y KDP',
      tagline: 'Cree fichas donde los niños encuentran la pieza que completa la imagen.',
      description: 'Genere rompecabezas de piezas faltantes para vender en Etsy, Amazon KDP o Hotmart. Los niños observan una imagen incompleta y seleccionan la pieza que falta de varias opciones — un formato que desarrolla la percepción visual y el razonamiento lógico. Con más de 3.000 imágenes en 104 temas, cree rompecabezas visualmente atractivos para cualquier estación o interés. Este formato es ideal para cuadernillos de actividades en Amazon KDP y paquetes de lógica visual en Etsy. Exporte PDFs a 300 DPI con solucionario automático y véndalos con la licencia comercial incluida. El formato es puramente visual — funciona en cualquier idioma sin traducción. Pruebe gratis con marca de agua — sin registro.',
    },
    sectionHeadings: {
      howItWorks: 'Cómo crear rompecabezas de piezas faltantes paso a paso',
      keyFeatures: 'Por qué los rompecabezas de piezas faltantes son populares',
      businessUseCases: 'Vender fichas de piezas faltantes en Etsy, KDP y Hotmart',
    },
  },
  {
    file: 'shadow-match.ts',
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
      metaDescription: 'Cree fichas de emparejar sombras para vender en Etsy y KDP. Los niños asocian imágenes con siluetas. Licencia comercial. Pruebe gratis.',
    },
    hero: {
      title: 'Genere fichas de sombras para vender en Etsy, KDP y Hotmart',
      tagline: 'Cree fichas donde los niños asocian imágenes con sus siluetas — un formato encantador.',
      description: 'Genere fichas de emparejar sombras para vender en Etsy, Amazon KDP o Hotmart. Los niños observan imágenes coloridas y las asocian con sus siluetas correspondientes — un ejercicio de percepción visual fundamental para preescolar e infantil. Con más de 3.000 ilustraciones en 104 temas, cree fichas de sombras para cualquier estación o interés. Las fichas de sombras son uno de los formatos más populares en Etsy para educación temprana por su atractivo visual inmediato. Exporte PDFs a 300 DPI con solucionario automático y véndalos con la licencia comercial incluida. El formato es puramente visual — cero barreras de idioma. Pruebe gratis con marca de agua — sin registro.',
    },
    sectionHeadings: {
      howItWorks: 'Cómo crear fichas de sombras en minutos',
      keyFeatures: 'Por qué las fichas de sombras se venden bien en Etsy',
      businessUseCases: 'Vender fichas de sombras en Etsy, KDP y Hotmart',
    },
  },
  {
    file: 'picture-path.ts',
    seo: {
      primaryKeyword: 'laberintos ilustrados para vender en Etsy',
      secondaryKeywords: [
        'generador de laberintos con imágenes para Etsy',
        'fichas de caminos ilustrados para Amazon KDP',
        'laberintos imprimibles licencia comercial',
        'crear fichas de laberintos temáticos para vender',
      ],
      lsiKeywords: [
        'laberintos ilustrados vendedores Etsy preescolar',
        'fichas caminos temáticos imprimibles KDP',
        'negocio fichas laberintos mercado hispano',
      ],
      titleTag: 'Laberintos ilustrados para vender en Etsy | LCS',
      metaDescription: 'Cree laberintos ilustrados con imágenes para vender en Etsy y KDP. 104 temas, dificultad ajustable. Licencia comercial incluida. Pruebe gratis.',
    },
    hero: {
      title: 'Genere laberintos ilustrados para vender en Etsy, KDP y Hotmart',
      tagline: 'Cree fichas de caminos temáticos donde los niños navegan entre imágenes.',
      description: 'Genere laberintos ilustrados para vender en Etsy, Amazon KDP o Hotmart. Las fichas de caminos temáticos combinan laberintos con imágenes — los niños navegan caminos entre ilustraciones coloridas, desarrollando coordinación visomotora y planificación espacial. Seleccione entre más de 3.000 imágenes en 104 temas y ajuste la dificultad del laberinto. Los laberintos son un género probado en Amazon KDP con ventas consistentes todo el año, y en Etsy como descarga digital individual. Exporte PDFs a 300 DPI con solucionario automático y véndalos con la licencia comercial incluida. El formato visual funciona en cualquier idioma. Pruebe gratis con marca de agua — sin registro.',
    },
    sectionHeadings: {
      howItWorks: 'Cómo crear laberintos ilustrados paso a paso',
      keyFeatures: 'Por qué los laberintos son un producto perenne',
      businessUseCases: 'Vender laberintos en Etsy, KDP y Hotmart',
    },
  },
  {
    file: 'picture-sort.ts',
    seo: {
      primaryKeyword: 'fichas de clasificación para negocio en Etsy',
      secondaryKeywords: [
        'generador de fichas de clasificación para vendedores',
        'fichas de ordenar imágenes para Amazon KDP',
        'ejercicios de categorización licencia comercial',
        'crear fichas de sorting para vender online',
      ],
      lsiKeywords: [
        'fichas clasificación categorización vendedores',
        'ejercicios ordenar imágenes preescolar KDP',
        'negocio fichas clasificación mercado hispano',
      ],
      titleTag: 'Fichas de clasificación para Etsy y KDP | LCS',
      metaDescription: 'Cree fichas de clasificación con imágenes para vender en Etsy y KDP. Los niños ordenan por categorías. Licencia comercial. Pruebe gratis.',
    },
    hero: {
      title: 'Genere fichas de clasificación para vender en Etsy, KDP y Hotmart',
      tagline: 'Cree fichas donde los niños clasifican imágenes por categorías temáticas.',
      description: 'Genere fichas de clasificación para vender en Etsy, Amazon KDP o Hotmart. Los niños observan imágenes y las clasifican en categorías — alimentos vs. animales, grandes vs. pequeños, estaciones del año, y más. Este formato desarrolla habilidades de pensamiento lógico y categorización que son fundamentales en preescolar e infantil. Con más de 3.000 imágenes en 104 temas, cree fichas de clasificación para cualquier contexto. Exporte PDFs a 300 DPI con solucionario automático y véndalos con la licencia comercial incluida. Las fichas de clasificación son puramente visuales y funcionan en cualquier idioma. El mercado hispano ofrece competencia mínima para este formato. Pruebe gratis con marca de agua — sin registro.',
    },
    sectionHeadings: {
      howItWorks: 'Cómo crear fichas de clasificación en minutos',
      keyFeatures: 'Por qué las fichas de clasificación se venden bien',
      businessUseCases: 'Vender fichas de clasificación en Etsy, KDP y Hotmart',
    },
  },
  {
    file: 'prepositions.ts',
    seo: {
      primaryKeyword: 'fichas de preposiciones para ELE en Etsy y Eduki',
      secondaryKeywords: [
        'generador de fichas de preposiciones para vendedores',
        'fichas de preposiciones español lengua extranjera',
        'ejercicios de preposiciones imprimibles licencia comercial',
        'crear fichas ELE para vender en Etsy y Hotmart',
      ],
      lsiKeywords: [
        'fichas preposiciones ELE vendedores Etsy Eduki',
        'ejercicios español lengua extranjera imprimibles',
        'negocio fichas idiomas mercado global ELE',
      ],
      titleTag: 'Fichas de preposiciones ELE para Etsy | LCS',
      metaDescription: 'Cree fichas de preposiciones para ELE y véndalas en Etsy, Eduki y Hotmart. 11 idiomas, imágenes temáticas. Licencia comercial. Pruebe gratis.',
    },
    hero: {
      title: 'Genere fichas de preposiciones para vender en Etsy, Eduki y Hotmart',
      tagline: 'Cree fichas de preposiciones con imágenes — ideales para ELE y educación bilingüe.',
      description: 'Genere fichas de preposiciones para vender en Etsy, Eduki, Hotmart o TPT. Las fichas de preposiciones con imágenes son un recurso esencial para la enseñanza de ELE (Español como Lengua Extranjera) — un mega-nicho global con 22 millones de estudiantes y compradores de alto poder adquisitivo. Soporte para 11 idiomas permite crear fichas para cualquier combinación de idiomas. Con más de 3.000 imágenes en 104 temas, las preposiciones se enseñan de forma visual e intuitiva. Ideal para academias de idiomas, profesores de español en el extranjero y educación bilingüe en EE.UU. Exporte PDFs a 300 DPI con solucionario y véndalos con la licencia comercial incluida. Pruebe gratis con marca de agua — sin registro.',
    },
    sectionHeadings: {
      howItWorks: 'Cómo crear fichas de preposiciones paso a paso',
      keyFeatures: 'Por qué las fichas de preposiciones son clave para ELE',
      businessUseCases: 'Vender fichas de preposiciones en Etsy, Eduki y Hotmart',
    },
  },
  {
    file: 'coloring.ts',
    seo: {
      primaryKeyword: 'generador de dibujos para colorear para vender en Etsy y KDP',
      secondaryKeywords: [
        'crear páginas para colorear para tienda Etsy',
        'generador de láminas para colorear para Amazon KDP',
        'dibujos para colorear imprimibles licencia comercial',
        'crear libros para colorear para vender online',
      ],
      lsiKeywords: [
        'dibujos colorear vendedores Etsy KDP Hotmart',
        'libros colorear imprimibles Amazon mercado hispano',
        'negocio páginas colorear ingreso pasivo',
      ],
      titleTag: 'Dibujos para colorear — Vender en Etsy y KDP | LCS',
      metaDescription: 'Cree dibujos para colorear para vender en Etsy y KDP. 104 temas, alta resolución, solucionario. Licencia comercial incluida. Pruebe gratis.',
    },
    hero: {
      title: 'Genere dibujos para colorear para vender en Etsy, KDP y Hotmart',
      tagline: 'Cree páginas para colorear con imágenes temáticas — el producto más vendido en Etsy.',
      description: 'Genere dibujos para colorear para vender en Etsy, Amazon KDP o Hotmart. Las páginas para colorear son el producto imprimible más vendido en Etsy y uno de los géneros más populares en Amazon KDP. Este generador crea dibujos para colorear con imágenes de más de 104 categorías temáticas — animales, festividades, vehículos, naturaleza y más. Cada dibujo se exporta en alta resolución lista para imprimir. Los libros para colorear en KDP son una fuente probada de ingreso pasivo, y en Etsy las descargas digitales de dibujos para colorear tienen demanda constante. Licencia comercial incluida. El mercado hispano de dibujos para colorear está masivamente desatendido. Pruebe gratis con marca de agua — sin registro.',
    },
    sectionHeadings: {
      howItWorks: 'Cómo crear dibujos para colorear en minutos',
      keyFeatures: 'Por qué colorear es el producto más vendido en Etsy',
      businessUseCases: 'Vender dibujos para colorear en Etsy, KDP y Hotmart',
    },
  },
  {
    file: 'draw-and-color.ts',
    seo: {
      primaryKeyword: 'fichas de dibujo y colorear para tienda Etsy',
      secondaryKeywords: [
        'generador de fichas de dibujar para vendedores Etsy',
        'fichas de dibujo guiado para Amazon KDP',
        'fichas de dibujar y colorear licencia comercial',
        'crear fichas de arte para vender online',
      ],
      lsiKeywords: [
        'fichas dibujo colorear vendedores Etsy KDP',
        'cuadernillos dibujo guiado imprimibles',
        'negocio fichas arte creativo mercado hispano',
      ],
      titleTag: 'Fichas de dibujo y colorear para Etsy | LCS',
      metaDescription: 'Cree fichas de dibujo y colorear para vender en Etsy y KDP. Dibujo guiado con imágenes temáticas. Licencia comercial incluida. Pruebe gratis.',
    },
    hero: {
      title: 'Genere fichas de dibujo y colorear para vender en Etsy, KDP y Hotmart',
      tagline: 'Cree fichas de dibujo guiado combinado con colorear — un formato creativo que se vende.',
      description: 'Genere fichas de dibujo y colorear para vender en Etsy, Amazon KDP o Hotmart. Este formato combina dos actividades favoritas: los niños primero dibujan siguiendo guías visuales y luego colorean su creación. Con más de 3.000 imágenes en 104 temas, cree fichas de dibujo para cualquier interés o estación. Las fichas de dibujo y colorear son un producto premium en Etsy porque ofrecen doble valor en una sola página. Ideales para cuadernillos de arte en Amazon KDP. Exporte PDFs a 300 DPI y véndalos con la licencia comercial incluida. El formato funciona en cualquier idioma — las instrucciones son visuales. Pruebe gratis con marca de agua — sin registro.',
    },
    sectionHeadings: {
      howItWorks: 'Cómo crear fichas de dibujo y colorear paso a paso',
      keyFeatures: 'Por qué las fichas de dibujo y colorear son premium',
      businessUseCases: 'Vender fichas de dibujo en Etsy, KDP y Hotmart',
    },
  },
  {
    file: 'alphabet-train.ts',
    seo: {
      primaryKeyword: 'fichas de abecedario para vender en Etsy y KDP',
      secondaryKeywords: [
        'generador de fichas de abecedario para Etsy',
        'fichas de tren del abecedario para Amazon KDP',
        'fichas de letras imprimibles licencia comercial',
        'crear cuadernillos de abecedario para vender',
      ],
      lsiKeywords: [
        'fichas abecedario tren letras vendedores Etsy',
        'cuadernillos letras preescolar imprimibles KDP',
        'negocio fichas alfabeto mercado hispano',
      ],
      titleTag: 'Fichas de abecedario para vender en Etsy | LCS',
      metaDescription: 'Cree fichas de abecedario con tren de letras para vender en Etsy y KDP. Imágenes temáticas, 11 idiomas. Licencia comercial. Pruebe gratis.',
    },
    hero: {
      title: 'Genere fichas de abecedario para vender en Etsy, KDP y Hotmart',
      tagline: 'Cree fichas de tren del abecedario con imágenes temáticas — un básico para preescolar.',
      description: 'Genere fichas de abecedario para vender en Etsy, Amazon KDP o Hotmart. El formato de tren del abecedario presenta cada letra en un vagón con imágenes temáticas correspondientes — una forma divertida y visual de aprender las letras. Con soporte para 11 idiomas y más de 3.000 imágenes en 104 temas, cree fichas de abecedario para el mercado hispano y otros mercados globales. Las fichas de abecedario son un producto perenne con demanda constante para preescolar e infantil. Cuadernillos de abecedario son un nicho probado en Amazon KDP. Exporte PDFs a 300 DPI con alta calidad y véndalos con la licencia comercial incluida. Pruebe gratis con marca de agua — sin registro.',
    },
    sectionHeadings: {
      howItWorks: 'Cómo crear fichas de abecedario paso a paso',
      keyFeatures: 'Por qué las fichas de abecedario son un perenne',
      businessUseCases: 'Vender fichas de abecedario en Etsy, KDP y Hotmart',
    },
  },
  {
    file: 'bingo.ts',
    seo: {
      primaryKeyword: 'creador de cartones de bingo para vender en Etsy',
      secondaryKeywords: [
        'generador de cartones de bingo con imágenes para Etsy',
        'bingo imprimible para fiestas para Amazon KDP',
        'cartones de bingo temáticos licencia comercial',
        'crear juegos de bingo para vender online',
      ],
      lsiKeywords: [
        'bingo temático vendedores Etsy fiestas educación',
        'cartones bingo imprimibles KDP Hotmart',
        'negocio juegos imprimibles mercado hispano',
      ],
      titleTag: 'Cartones de bingo para vender en Etsy y KDP | LCS',
      metaDescription: 'Cree cartones de bingo con imágenes para vender en Etsy y KDP. 104 temas, múltiples cartones únicos. Licencia comercial. Pruebe gratis.',
    },
    hero: {
      title: 'Genere cartones de bingo para vender en Etsy, KDP y Hotmart',
      tagline: 'Cree sets de bingo temático con imágenes — perfecto para fiestas y educación.',
      description: 'Genere cartones de bingo con imágenes para vender en Etsy, Amazon KDP o Hotmart. El bingo es un juego universal que se vende para fiestas infantiles, actividades escolares, eventos comunitarios y entretenimiento familiar. Este generador crea múltiples cartones únicos con imágenes temáticas de más de 104 categorías — cada cartón es diferente, como debe ser. Los sets de bingo temáticos son un producto estrella en Etsy para fiestas de cumpleaños y eventos estacionales. Exporte PDFs a 300 DPI y véndalos con la licencia comercial incluida. El formato visual funciona en cualquier idioma. El mercado hispano de juegos imprimibles para fiestas tiene competencia mínima. Pruebe gratis con marca de agua — sin registro.',
    },
    sectionHeadings: {
      howItWorks: 'Cómo crear cartones de bingo paso a paso',
      keyFeatures: 'Por qué el bingo es un producto estrella en Etsy',
      businessUseCases: 'Vender bingo temático en Etsy, KDP y Hotmart',
    },
  },
  {
    file: 'pattern-train.ts',
    seo: {
      primaryKeyword: 'fichas de patrones para negocio de imprimibles',
      secondaryKeywords: [
        'generador de fichas de secuencias para Etsy',
        'fichas de patrones con imágenes para Amazon KDP',
        'ejercicios de secuencias lógicas licencia comercial',
        'crear fichas de patrones para vender online',
      ],
      lsiKeywords: [
        'fichas patrones secuencias vendedores Etsy',
        'ejercicios lógica secuencial preescolar KDP',
        'negocio fichas patrones mercado hispano',
      ],
      titleTag: 'Fichas de patrones para negocio imprimibles | LCS',
      metaDescription: 'Cree fichas de patrones y secuencias para vender en Etsy y KDP. Formato tren con imágenes temáticas. Licencia comercial incluida. Pruebe gratis.',
    },
    hero: {
      title: 'Genere fichas de patrones para vender en Etsy, KDP y Hotmart',
      tagline: 'Cree fichas de secuencias lógicas en formato tren con imágenes temáticas.',
      description: 'Genere fichas de patrones para vender en Etsy, Amazon KDP o Hotmart. El formato de tren de patrones presenta secuencias de imágenes que los niños deben continuar — una habilidad matemática fundamental que desarrolla el pensamiento lógico. Con más de 3.000 imágenes en 104 temas, cree fichas de patrones visualmente atractivas para cualquier contexto. Las fichas de patrones y secuencias son un producto de alta demanda para preescolar e infantil. Exporte PDFs a 300 DPI con solucionario automático y véndalos con la licencia comercial incluida. El formato puramente visual funciona en cualquier idioma. Pruebe gratis con marca de agua — sin registro.',
    },
    sectionHeadings: {
      howItWorks: 'Cómo crear fichas de patrones paso a paso',
      keyFeatures: 'Por qué las fichas de patrones desarrollan pensamiento lógico',
      businessUseCases: 'Vender fichas de patrones en Etsy, KDP y Hotmart',
    },
  },
  {
    file: 'pattern-worksheet.ts',
    seo: {
      primaryKeyword: 'fichas de reconocimiento de patrones para vendedores Etsy',
      secondaryKeywords: [
        'generador de fichas de patrones para vendedores',
        'fichas de completar patrones para Amazon KDP',
        'ejercicios de reconocimiento de secuencias licencia comercial',
        'crear fichas de lógica de patrones para vender',
      ],
      lsiKeywords: [
        'fichas reconocimiento patrones vendedores Etsy',
        'ejercicios secuencias lógicas imprimibles KDP',
        'negocio fichas lógica patrones mercado hispano',
      ],
      titleTag: 'Reconocimiento de patrones para Etsy y KDP | LCS',
      metaDescription: 'Cree fichas de reconocimiento de patrones para vender en Etsy y KDP. Imágenes temáticas, dificultad ajustable. Licencia comercial. Pruebe gratis.',
    },
    hero: {
      title: 'Genere fichas de reconocimiento de patrones para Etsy, KDP y Hotmart',
      tagline: 'Cree fichas de completar patrones con imágenes — formato avanzado de lógica visual.',
      description: 'Genere fichas de reconocimiento de patrones para vender en Etsy, Amazon KDP o Hotmart. Los niños analizan secuencias de imágenes y seleccionan la opción correcta para completar el patrón — un formato que desarrolla habilidades de razonamiento lógico esenciales. Con más de 3.000 imágenes en 104 temas y dificultad ajustable, cree fichas para diferentes niveles. Las fichas de reconocimiento de patrones tienen alta demanda en Etsy para preescolar, infantil y educación especial. Exporte PDFs a 300 DPI con solucionario automático y véndalos con la licencia comercial incluida. Formato puramente visual — funciona en cualquier idioma. Pruebe gratis con marca de agua — sin registro.',
    },
    sectionHeadings: {
      howItWorks: 'Cómo crear fichas de reconocimiento de patrones',
      keyFeatures: 'Por qué las fichas de patrones tienen alta demanda',
      businessUseCases: 'Vender fichas de patrones en Etsy, KDP y Hotmart',
    },
  },
  {
    file: 'treasure-hunt.ts',
    seo: {
      primaryKeyword: 'generador de búsqueda del tesoro para Etsy y KDP',
      secondaryKeywords: [
        'crear fichas de búsqueda del tesoro para Etsy',
        'juego de búsqueda del tesoro imprimible para KDP',
        'fichas de treasure hunt licencia comercial',
        'crear actividades de búsqueda del tesoro para vender',
      ],
      lsiKeywords: [
        'búsqueda tesoro imprimible vendedores Etsy',
        'juegos búsqueda imprimibles fiestas KDP',
        'negocio juegos imprimibles mercado hispano',
      ],
      titleTag: 'Búsqueda del tesoro para Etsy y KDP | LCS',
      metaDescription: 'Cree juegos de búsqueda del tesoro imprimibles para vender en Etsy y KDP. Imágenes temáticas, solucionario. Licencia comercial. Pruebe gratis.',
    },
    hero: {
      title: 'Genere juegos de búsqueda del tesoro para Etsy, KDP y Hotmart',
      tagline: 'Cree fichas de búsqueda del tesoro con imágenes — ideales para fiestas y educación.',
      description: 'Genere juegos de búsqueda del tesoro imprimibles para vender en Etsy, Amazon KDP o Hotmart. Los niños siguen pistas visuales para encontrar tesoros ocultos — un formato emocionante que combina resolución de problemas con aventura. Con más de 3.000 imágenes en 104 temas, cree búsquedas del tesoro para fiestas de cumpleaños, actividades estacionales y educación. Los juegos de búsqueda del tesoro son un producto de alta demanda en Etsy para fiestas infantiles y eventos. Exporte PDFs a 300 DPI con solucionario y véndalos con la licencia comercial incluida. El formato visual funciona en cualquier idioma. Pruebe gratis con marca de agua — sin registro.',
    },
    sectionHeadings: {
      howItWorks: 'Cómo crear búsquedas del tesoro paso a paso',
      keyFeatures: 'Por qué las búsquedas del tesoro se venden bien en Etsy',
      businessUseCases: 'Vender búsquedas del tesoro en Etsy, KDP y Hotmart',
    },
  },
  {
    file: 'sudoku.ts',
    seo: {
      primaryKeyword: 'generador de sudoku con imágenes para libros KDP',
      secondaryKeywords: [
        'crear sudoku con imágenes para Amazon KDP',
        'generador de sudoku visual para vendedores Etsy',
        'sudoku imprimible con imágenes licencia comercial',
        'crear libros de sudoku para vender online',
      ],
      lsiKeywords: [
        'sudoku imágenes niños vendedores KDP Etsy',
        'libros sudoku visual imprimibles Amazon',
        'negocio sudoku imprimible mercado hispano',
      ],
      titleTag: 'Sudoku con imágenes para libros KDP | LCS',
      metaDescription: 'Cree sudoku con imágenes para vender en Amazon KDP y Etsy. Formato visual para niños, solucionario. Licencia comercial incluida. Pruebe gratis.',
    },
    hero: {
      title: 'Genere sudoku con imágenes para vender en Amazon KDP y Etsy',
      tagline: 'Cree sudoku visual con imágenes temáticas — perfecto para libros de actividades KDP.',
      description: 'Genere sudoku con imágenes para vender en Amazon KDP, Etsy o Hotmart. En lugar de números, los niños completan cuadrículas con imágenes temáticas — un formato innovador que hace el sudoku accesible para preescolares y niños pequeños. Con más de 3.000 imágenes en 104 temas, cree sudokus visuales para cualquier interés. Los libros de sudoku son un género perenne en Amazon KDP con ventas consistentes, y el formato con imágenes abre un mercado infantil que el sudoku numérico no alcanza. Exporte PDFs a 300 DPI con solucionario automático y véndalos con la licencia comercial incluida. Pruebe gratis con marca de agua — sin registro.',
    },
    sectionHeadings: {
      howItWorks: 'Cómo crear sudoku con imágenes paso a paso',
      keyFeatures: 'Por qué el sudoku visual abre un mercado nuevo',
      businessUseCases: 'Vender sudoku con imágenes en KDP, Etsy y Hotmart',
    },
  },
  {
    file: 'big-small.ts',
    seo: {
      primaryKeyword: 'fichas de grande y pequeño para tienda Etsy',
      secondaryKeywords: [
        'generador de fichas de comparación de tamaños para Etsy',
        'fichas de grande y pequeño para Amazon KDP',
        'ejercicios de tamaño imprimibles licencia comercial',
        'crear fichas de comparación para vender',
      ],
      lsiKeywords: [
        'fichas grande pequeño vendedores preescolar',
        'ejercicios comparación tamaños imprimibles KDP',
        'negocio fichas comparación mercado hispano',
      ],
      titleTag: 'Fichas de grande y pequeño para Etsy | LCS',
      metaDescription: 'Cree fichas de comparación de tamaños para vender en Etsy y KDP. Los niños comparan grande y pequeño. Licencia comercial. Pruebe gratis.',
    },
    hero: {
      title: 'Genere fichas de grande y pequeño para vender en Etsy, KDP y Hotmart',
      tagline: 'Cree fichas de comparación de tamaños con imágenes — conceptos básicos de preescolar.',
      description: 'Genere fichas de grande y pequeño para vender en Etsy, Amazon KDP o Hotmart. Los niños comparan tamaños de imágenes temáticas — un concepto matemático fundamental para preescolar e infantil. Con más de 3.000 imágenes en 104 temas, cree fichas de comparación visualmente atractivas. Las fichas de conceptos básicos (grande/pequeño, más/menos) son un producto perenne para vendedores de preescolar — los padres y educadores las buscan todo el año. Exporte PDFs a 300 DPI con solucionario y véndalos con la licencia comercial incluida. El formato puramente visual funciona en cualquier idioma. Pruebe gratis con marca de agua — sin registro.',
    },
    sectionHeadings: {
      howItWorks: 'Cómo crear fichas de comparación de tamaños',
      keyFeatures: 'Por qué las fichas de conceptos básicos son perennes',
      businessUseCases: 'Vender fichas de grande y pequeño en Etsy, KDP y Hotmart',
    },
  },
  {
    file: 'more-less.ts',
    seo: {
      primaryKeyword: 'fichas de mayor y menor para vender en Etsy',
      secondaryKeywords: [
        'generador de fichas de comparación numérica para Etsy',
        'fichas de mayor que menor que para Amazon KDP',
        'ejercicios de comparación imprimibles licencia comercial',
        'crear fichas de mayor menor para vender',
      ],
      lsiKeywords: [
        'fichas mayor menor vendedores Etsy preescolar',
        'ejercicios comparación numérica imprimibles KDP',
        'negocio fichas matemáticas básicas mercado hispano',
      ],
      titleTag: 'Fichas de mayor y menor para Etsy y KDP | LCS',
      metaDescription: 'Cree fichas de mayor y menor para vender en Etsy y KDP. Comparación visual con imágenes temáticas. Licencia comercial incluida. Pruebe gratis.',
    },
    hero: {
      title: 'Genere fichas de mayor y menor para vender en Etsy, KDP y Hotmart',
      tagline: 'Cree fichas de comparación numérica con imágenes — un concepto que se enseña siempre.',
      description: 'Genere fichas de mayor y menor para vender en Etsy, Amazon KDP o Hotmart. Los niños cuentan imágenes temáticas y comparan cantidades usando los signos mayor que (>), menor que (<) e igual (=). Este formato visual hace que la comparación numérica sea concreta y accesible para preescolar e infantil. Con más de 3.000 imágenes en 104 temas, cree fichas para cualquier interés. Las fichas de comparación matemática son un producto con demanda constante en Etsy y Amazon KDP. Exporte PDFs a 300 DPI con solucionario automático y véndalos con la licencia comercial incluida. Pruebe gratis con marca de agua — sin registro.',
    },
    sectionHeadings: {
      howItWorks: 'Cómo crear fichas de mayor y menor paso a paso',
      keyFeatures: 'Por qué las fichas de comparación tienen demanda constante',
      businessUseCases: 'Vender fichas de mayor y menor en Etsy, KDP y Hotmart',
    },
  },
  {
    file: 'odd-one-out.ts',
    seo: {
      primaryKeyword: 'fichas de encuentra el intruso para vender en Etsy y KDP',
      secondaryKeywords: [
        'generador de fichas de odd one out para Etsy',
        'fichas de encuentra el diferente para Amazon KDP',
        'ejercicios de intruso imprimibles licencia comercial',
        'crear fichas de lógica visual para vender',
      ],
      lsiKeywords: [
        'fichas encuentra intruso vendedores Etsy KDP',
        'ejercicios lógica clasificación imprimibles',
        'negocio fichas razonamiento mercado hispano',
      ],
      titleTag: 'Encuentra el intruso para Etsy y KDP | LCS',
      metaDescription: 'Cree fichas de encuentra el intruso para vender en Etsy y KDP. Los niños identifican el elemento diferente. Licencia comercial. Pruebe gratis.',
    },
    hero: {
      title: 'Genere fichas de encuentra el intruso para Etsy, KDP y Hotmart',
      tagline: 'Cree fichas donde los niños identifican el elemento que no pertenece al grupo.',
      description: 'Genere fichas de encuentra el intruso para vender en Etsy, Amazon KDP o Hotmart. Los niños observan un grupo de imágenes y determinan cuál no pertenece — un formato que desarrolla razonamiento lógico, clasificación y pensamiento crítico. Con más de 3.000 imágenes en 104 temas y dificultad ajustable, cree fichas para diferentes niveles. Las fichas de encuentra el intruso son muy populares en Etsy para preescolar, infantil y educación especial. Ideales para cuadernillos de lógica en Amazon KDP. Exporte PDFs a 300 DPI con solucionario automático y véndalos con la licencia comercial incluida. Formato puramente visual — funciona en cualquier idioma. Pruebe gratis con marca de agua — sin registro.',
    },
    sectionHeadings: {
      howItWorks: 'Cómo crear fichas de encuentra el intruso paso a paso',
      keyFeatures: 'Por qué las fichas de intruso desarrollan pensamiento crítico',
      businessUseCases: 'Vender fichas de encuentra el intruso en Etsy, KDP y Hotmart',
    },
  },
];

// ============================================================
// APPLY CHANGES
// ============================================================
let totalUpdated = 0;
let errors = [];

for (const app of apps) {
  const filePath = path.join(BASE, app.file);
  console.log(`\nProcessing: ${app.file}`);

  if (!fs.existsSync(filePath)) {
    console.error(`  ERROR: File not found: ${filePath}`);
    errors.push(app.file);
    continue;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // Update SEO fields
  content = replaceField(content, 'primaryKeyword', app.seo.primaryKeyword);
  content = replaceArrayField(content, 'secondaryKeywords', app.seo.secondaryKeywords);
  content = replaceArrayField(content, 'lsiKeywords', app.seo.lsiKeywords);
  content = replaceField(content, 'titleTag', app.seo.titleTag);

  const mdRe = /(metaDescription:\s*\n?\s*)(['"])(?:[^'"\\]|\\.)*\2/;
  if (mdRe.test(content)) {
    content = content.replace(mdRe, `$1'${esc(app.seo.metaDescription)}'`);
  }

  content = replaceHeroTitle(content, app.hero.title);
  content = replaceField(content, 'tagline', app.hero.tagline);
  content = replaceHeroDescription(content, app.hero.description);

  if (app.sectionHeadings.howItWorks) {
    content = replaceSectionTitle(content, 'howItWorks', app.sectionHeadings.howItWorks);
  }
  if (app.sectionHeadings.keyFeatures) {
    content = replaceSectionTitle(content, 'keyFeatures', app.sectionHeadings.keyFeatures);
  }
  if (app.sectionHeadings.businessUseCases) {
    content = replaceSectionTitle(content, 'businessUseCases', app.sectionHeadings.businessUseCases);
  }

  // Replace Gumroad with Hotmart
  content = content.replace(/Gumroad/g, 'Hotmart');
  content = content.replace(/gumroad\.com/g, 'hotmart.com');
  content = content.replace(/teacherspayteachers\.com/g, 'hotmart.com');

  // Validate
  const titleMatch = content.match(/titleTag:\s*'([^']*)'/);
  if (titleMatch) {
    const len = titleMatch[1].length;
    if (len > 60) console.warn(`  WARNING: titleTag is ${len} chars (max 60)`);
    else console.log(`  titleTag: ${len} chars ✓`);
  }

  const metaMatch = content.match(/metaDescription:\s*\n?\s*'([^']*)'/);
  if (metaMatch) {
    const len = metaMatch[1].length;
    if (len > 155) console.warn(`  WARNING: metaDescription is ${len} chars (max 155)`);
    else console.log(`  metaDescription: ${len} chars ✓`);
  }

  if (/\\u[0-9a-fA-F]{4}/.test(content)) {
    console.warn('  WARNING: Found \\uXXXX unicode escapes!');
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`  ✓ Updated ${app.file}`);
  totalUpdated++;
}

console.log(`\n=== Done: ${totalUpdated}/16 files updated ===`);
if (errors.length) console.error(`Errors: ${errors.join(', ')}`);
