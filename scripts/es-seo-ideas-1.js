/**
 * ES SEO Ideas Part 1: 23 idea content files
 * E1 (8 themes) + E2 (10 seasons) + E3 first 5 (interests)
 */
const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'frontend', 'config', 'idea-content', 'es');

function esc(s) {
  return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

function replaceField(content, fieldName, newValue) {
  const re = new RegExp(`(${fieldName}:\\s*)(['"])(?:[^'\"\\\\]|\\\\.)*\\2`);
  if (re.test(content)) {
    return content.replace(re, `$1'${esc(newValue)}'`);
  }
  const re2 = new RegExp(`(${fieldName}:\\s*\\n\\s*)(['"])(?:[^'\"\\\\]|\\\\.)*\\2`);
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

function replaceHeroDescription(content, newDesc) {
  // Idea content has hero: { title, description } — NO tagline
  // Match description: after title: inside the hero block
  const re = /(hero:\s*\{[\s\S]*?title:\s*['"][^'"]*['"],?\s*\n\s*description:\s*\n?\s*)(['"])([\s\S]*?)\2/;
  if (re.test(content)) {
    return content.replace(re, `$1'${esc(newDesc)}'`);
  }
  // Fallback: just find description inside hero block
  const re2 = /(hero:\s*\{[\s\S]*?description:\s*\n?\s*)(['"])(?:[^'"\\]|\\.)*\2/;
  if (re2.test(content)) {
    return content.replace(re2, `$1'${esc(newDesc)}'`);
  }
  console.warn('  WARNING: Could not replace hero description');
  return content;
}

// ============================================================
// 23 IDEA FILES
// ============================================================
const ideas = [
  // === E1: BY THEME (8) ===
  {
    file: 'farm-animals-printable-ideas.ts',
    seo: {
      primaryKeyword: 'imprimibles de animales de granja para vender',
      secondaryKeywords: [
        'fichas de granja para Etsy y KDP',
        'negocio imprimibles animales corral',
        'vender fichas tema granja en línea',
        'actividades de granja imprimibles comerciales',
      ],
      lsiKeywords: [
        'nicho de imprimibles de granja demanda perenne',
        'fichas educativas temáticas para vendedores',
        'productos digitales animales de corral Hotmart',
      ],
      titleTag: 'Imprimibles animales de granja Etsy | LCS',
      metaDescription: 'Descubra ideas de imprimibles de animales de granja para vender en Etsy, KDP y Hotmart. Nicho perenne con picos en primavera y otoño — guía completa.',
    },
    hero: {
      title: 'Ideas de imprimibles de animales de granja para vender en Etsy y KDP',
      description: 'El nicho de animales de granja es uno de los más estables del mercado de imprimibles educativos. Vacas, cerdos, gallinas y caballos atraen a padres y emprendedores durante todo el año, con picos de demanda en primavera y durante la cosecha de otoño. Para los vendedores de imprimibles, este tema ofrece una combinación excepcional: demanda perenne, atractivo para múltiples edades y poca competencia en español. Ya venda en Etsy, Amazon KDP o Hotmart, los imprimibles de granja representan un nicho probado con amplio espacio para la diferenciación creativa. Esta guía le presenta ideas de productos específicos, estrategias de precios por plataforma y enfoques para construir una línea rentable de productos con temática de granja utilizando nuestras herramientas generadoras.',
    },
  },
  {
    file: 'ocean-animals-printable-ideas.ts',
    seo: {
      primaryKeyword: 'imprimibles de animales marinos ideas negocio',
      secondaryKeywords: [
        'fichas del océano para vender en Etsy',
        'imprimibles vida marina negocio digital',
        'actividades marinas comerciales KDP',
        'vender fichas animales del mar en línea',
      ],
      lsiKeywords: [
        'nicho imprimibles océano pico verano',
        'fichas educativas temáticas marinas vendedores',
        'productos digitales animales acuáticos Hotmart',
      ],
      titleTag: 'Imprimibles animales marinos — Negocio | LCS',
      metaDescription: 'Ideas rentables de imprimibles de animales marinos para su negocio en Etsy, KDP y Hotmart. Nicho con pico en verano y demanda constante todo el año.',
    },
    hero: {
      title: 'Ideas de negocio con imprimibles de animales marinos para vender',
      description: 'Los animales marinos capturan la imaginación de los niños y generan ventas constantes para los emprendedores de imprimibles. Ballenas, delfines, tiburones y pulpos son temas que los padres buscan activamente en Etsy y Amazon. El nicho del océano tiene un pico natural en verano, pero mantiene demanda todo el año gracias a proyectos escolares y la fascinación infantil por la vida marina. En el mercado hispano, la competencia es especialmente baja — hay miles de búsquedas mensuales en español para fichas de animales del mar, pero muy pocos vendedores que las ofrezcan. Esta guía le muestra ideas de productos específicos, estrategias de precios y cómo posicionar su tienda de imprimibles marinos en Etsy, KDP y Hotmart para capturar este nicho en crecimiento.',
    },
  },
  {
    file: 'safari-animals-printable-ideas.ts',
    seo: {
      primaryKeyword: 'imprimibles de animales de safari para vender',
      secondaryKeywords: [
        'fichas safari para tienda Etsy',
        'negocio imprimibles animales salvajes',
        'actividades de safari comerciales KDP',
        'vender fichas tema selva en línea',
      ],
      lsiKeywords: [
        'nicho imprimibles safari demanda todo el año',
        'fichas educativas animales exóticos vendedores',
        'productos digitales jungla sabana Hotmart',
      ],
      titleTag: 'Imprimibles safari para vender | LCS',
      metaDescription: 'Descubra ideas de imprimibles de animales de safari para vender en Etsy y KDP. Leones, elefantes y jirafas — nicho con demanda constante y alta conversión.',
    },
    hero: {
      title: 'Ideas de imprimibles de animales de safari para vender en línea',
      description: 'Los animales de safari generan un atractivo universal que trasciende estaciones y tendencias. Leones, elefantes, jirafas y cebras son protagonistas frecuentes en la decoración infantil, fiestas de cumpleaños y proyectos escolares — lo que crea múltiples puntos de entrada para los vendedores de imprimibles. A diferencia de los nichos estacionales, el tema de safari mantiene demanda constante durante todo el año con picos durante el verano y las fiestas temáticas. En el mercado hispano, los imprimibles de safari representan un nicho con alta demanda y poca competencia. Los padres buscan activamente fichas de animales salvajes en español, pero encuentran pocas opciones de calidad. Esta guía le ofrece ideas de productos, estrategias de precios y tácticas para posicionar su negocio de imprimibles de safari en Etsy, KDP y Hotmart.',
    },
  },
  {
    file: 'pets-printable-ideas.ts',
    seo: {
      primaryKeyword: 'imprimibles de mascotas para vender en Etsy',
      secondaryKeywords: [
        'fichas de mascotas negocio imprimibles',
        'actividades de perros y gatos comerciales',
        'vender imprimibles mascotas KDP Hotmart',
        'fichas temáticas animales domésticos Etsy',
      ],
      lsiKeywords: [
        'nicho imprimibles mascotas perros gatos demanda',
        'fichas educativas animales domésticos vendedores',
        'productos digitales tema mascotas ingreso pasivo',
      ],
      titleTag: 'Imprimibles de mascotas para Etsy | LCS',
      metaDescription: 'Ideas de imprimibles de mascotas para vender en Etsy, KDP y Hotmart. Perros, gatos y conejos — nicho con alta demanda emocional y ventas todo el año.',
    },
    hero: {
      title: 'Ideas de imprimibles de mascotas para vender en Etsy y Hotmart',
      description: 'Las mascotas son uno de los temas más populares en el mercado de imprimibles educativos. Perros, gatos, conejos y hámsteres generan una conexión emocional inmediata que impulsa las compras impulsivas — los padres quieren que las actividades de sus hijos reflejen lo que aman. Para los vendedores de imprimibles, el nicho de mascotas ofrece demanda constante todo el año sin depender de temporadas específicas. Los picos de ventas coinciden con el regreso a clases, las fiestas de cumpleaños con temática de mascotas y las campañas de adopción animal. En el mercado hispano, la competencia es mínima mientras la demanda crece. Esta guía le presenta ideas concretas de productos, precios por plataforma y estrategias para construir una línea rentable de imprimibles de mascotas en Etsy, KDP y Hotmart.',
    },
  },
  {
    file: 'dinosaur-printable-ideas.ts',
    seo: {
      primaryKeyword: 'imprimibles de dinosaurios ideas negocio Etsy',
      secondaryKeywords: [
        'fichas de dinosaurios para vender en línea',
        'negocio imprimibles tema prehistórico',
        'actividades dinosaurios comerciales KDP',
        'vender fichas dinos Etsy Hotmart',
      ],
      lsiKeywords: [
        'nicho imprimibles dinosaurios demanda alta niños',
        'fichas educativas prehistóricas vendedores',
        'productos digitales T-Rex triceratops Hotmart',
      ],
      titleTag: 'Imprimibles dinosaurios — Negocio | LCS',
      metaDescription: 'Ideas de negocio con imprimibles de dinosaurios para Etsy, KDP y Hotmart. Nicho con demanda altísima en niños de 3 a 8 años — guía de productos y precios.',
    },
    hero: {
      title: 'Ideas de negocio con imprimibles de dinosaurios para Etsy y KDP',
      description: 'Los dinosaurios son una obsesión infantil que genera oportunidades excepcionales para los vendedores de imprimibles. El T-Rex, el triceratops y el estegosaurio capturan la imaginación de niños de 3 a 8 años con una intensidad que pocos otros temas igualan — y esa fascinación se traduce directamente en ventas. Los padres buscan activamente fichas de dinosaurios en Etsy y Amazon, y los productos con temática prehistórica tienen tasas de conversión superiores a la media. En el mercado hispano, el nicho está especialmente desatendido: miles de búsquedas mensuales en español con muy pocos vendedores que ofrezcan productos de calidad. Esta guía le presenta ideas de productos específicos, estrategias de precios y tácticas para construir un negocio rentable de imprimibles de dinosaurios en Etsy, KDP y Hotmart.',
    },
  },
  {
    file: 'birds-printable-ideas.ts',
    seo: {
      primaryKeyword: 'imprimibles de aves para vender',
      secondaryKeywords: [
        'fichas de pájaros para Etsy y KDP',
        'negocio imprimibles aves educativas',
        'actividades de aves comerciales en línea',
        'vender fichas pájaros Hotmart',
      ],
      lsiKeywords: [
        'nicho imprimibles aves naturaleza demanda',
        'fichas educativas ornitología vendedores',
        'productos digitales tema pájaros primavera',
      ],
      titleTag: 'Imprimibles de aves para vender | LCS',
      metaDescription: 'Ideas de imprimibles de aves para vender en Etsy, KDP y Hotmart. Loros, búhos y flamencos — nicho con pico en primavera y demanda educativa constante.',
    },
    hero: {
      title: 'Ideas de imprimibles de aves para vender en Etsy, KDP y Hotmart',
      description: 'Las aves ofrecen un nicho versátil para los vendedores de imprimibles educativos. Loros, búhos, flamencos y águilas atraen tanto a niños fascinados por los colores como a familias que estudian la naturaleza. El tema de aves tiene un pico natural en primavera — cuando los proyectos sobre migración y nidos coinciden con la planificación escolar — pero mantiene demanda constante gracias a los programas de ciencias y la curiosidad infantil por el mundo animal. Para los emprendedores de imprimibles, las aves permiten crear productos que cruzan múltiples categorías: desde fichas de conteo y colorear hasta actividades de vocabulario y ciencias naturales. En el mercado hispano, este nicho tiene competencia mínima. Esta guía le presenta ideas de productos y estrategias para posicionar su tienda en Etsy, KDP y Hotmart.',
    },
  },
  {
    file: 'insects-printable-ideas.ts',
    seo: {
      primaryKeyword: 'imprimibles de insectos ideas negocio',
      secondaryKeywords: [
        'fichas de bichos para vender en Etsy',
        'negocio imprimibles insectos educativos',
        'actividades de insectos comerciales KDP',
        'vender fichas mariposas abejas en línea',
      ],
      lsiKeywords: [
        'nicho imprimibles insectos primavera pico',
        'fichas educativas entomología vendedores',
        'productos digitales mariposas catarinas Hotmart',
      ],
      titleTag: 'Imprimibles insectos — Ideas negocio | LCS',
      metaDescription: 'Ideas de negocio con imprimibles de insectos para Etsy, KDP y Hotmart. Mariposas, abejas y catarinas — nicho de primavera con alta demanda educativa.',
    },
    hero: {
      title: 'Ideas de negocio con imprimibles de insectos para vender en línea',
      description: 'Los insectos representan un nicho subestimado en el mercado de imprimibles educativos. Mariposas, abejas, catarinas y hormigas son protagonistas de proyectos de ciencias naturales en escuelas y hogares durante todo el año, con un pico explosivo en primavera cuando los programas escolares se centran en ciclos de vida, polinización y hábitats naturales. Para los vendedores de imprimibles, el tema de insectos permite crear productos diferenciados que cruzan múltiples habilidades: conteo, vocabulario, ciencias y motricidad fina. La fascinación natural de los niños por los bichos genera búsquedas constantes en Etsy y Amazon. En el mercado hispano, la competencia es prácticamente inexistente para fichas de insectos en español. Esta guía le muestra ideas de productos, precios y cómo construir una línea rentable en Etsy, KDP y Hotmart.',
    },
  },
  {
    file: 'forest-animals-printable-ideas.ts',
    seo: {
      primaryKeyword: 'imprimibles animales del bosque para Etsy',
      secondaryKeywords: [
        'fichas animales del bosque para vender',
        'negocio imprimibles tema bosque naturaleza',
        'actividades animales silvestres comerciales',
        'vender fichas bosque KDP Hotmart',
      ],
      lsiKeywords: [
        'nicho imprimibles bosque otoño invierno demanda',
        'fichas educativas animales silvestres vendedores',
        'productos digitales zorros osos búhos Hotmart',
      ],
      titleTag: 'Imprimibles bosque para vender | LCS',
      metaDescription: 'Ideas de imprimibles de animales del bosque para vender en Etsy y KDP. Zorros, osos y búhos — nicho con estética premium y demanda creciente en español.',
    },
    hero: {
      title: 'Ideas de imprimibles de animales del bosque para vender en Etsy',
      description: 'Los animales del bosque combinan un atractivo educativo sólido con una estética visual que los compradores valoran especialmente. Zorros, osos, búhos, ciervos y mapaches dominan las tendencias de decoración infantil y productos educativos — lo que se traduce en alta demanda para los vendedores de imprimibles. El nicho del bosque tiene picos naturales en otoño e invierno, cuando las familias y las tiendas exploran temas de hibernación, migración y preparación para el frío. La estética woodland ha mantenido su popularidad durante años en Etsy, con productos que alcanzan precios premium gracias a su atractivo visual sofisticado. En el mercado hispano, este nicho está prácticamente vacío — una oportunidad clara para emprendedores que creen productos de calidad. Esta guía le presenta ideas concretas para construir su línea de imprimibles de bosque en Etsy, KDP y Hotmart.',
    },
  },

  // === E2: BY SEASON/HOLIDAY (10) ===
  {
    file: 'christmas-printable-ideas.ts',
    seo: {
      primaryKeyword: 'imprimibles de Navidad para vender en Etsy',
      secondaryKeywords: [
        'fichas navideñas negocio Etsy KDP',
        'vender imprimibles de Navidad en línea',
        'actividades navideñas comerciales Hotmart',
        'negocio imprimibles temporada navideña',
      ],
      lsiKeywords: [
        'pico ventas diciembre imprimibles navideños',
        'fichas educativas Navidad vendedores hispanos',
        'productos digitales Papá Noel Reyes Magos',
      ],
      titleTag: 'Imprimibles de Navidad para Etsy | LCS',
      metaDescription: 'Ideas de imprimibles de Navidad para vender en Etsy, KDP y Hotmart. Temporada con el mayor pico de ventas del año — planifique desde octubre para maximizar.',
    },
    hero: {
      title: 'Ideas de imprimibles de Navidad para vender en Etsy y KDP',
      description: 'La Navidad es la temporada de mayor volumen de ventas para los imprimibles educativos — y los vendedores que planifican con anticipación capturan la mayor parte del ingreso. Desde fichas de conteo con renos hasta sopas de letras navideñas, la demanda se dispara entre octubre y diciembre. En el mercado hispano, tenga en cuenta las diferencias culturales: en España y Latinoamérica, los Reyes Magos (6 de enero) extienden la temporada de ventas más allá del 25 de diciembre, y muchos países celebran las posadas, la Nochebuena y tradiciones regionales únicas. Para los vendedores de imprimibles, esto significa más oportunidades de producto que en el mercado anglosajón. Esta guía le muestra ideas de productos específicos, cronograma de publicación, precios estacionales y estrategias para posicionar sus imprimibles navideños en Etsy, KDP y Hotmart antes del pico de demanda.',
    },
  },
  {
    file: 'halloween-printable-ideas.ts',
    seo: {
      primaryKeyword: 'imprimibles de Halloween ideas negocio',
      secondaryKeywords: [
        'fichas de Halloween para vender Etsy',
        'negocio imprimibles octubre Día de Muertos',
        'actividades Halloween comerciales KDP',
        'vender fichas terror niños en línea',
      ],
      lsiKeywords: [
        'pico ventas octubre imprimibles Halloween',
        'Día de los Muertos México noviembre imprimibles',
        'productos digitales calabazas fantasmas Hotmart',
      ],
      titleTag: 'Imprimibles Halloween — Negocio | LCS',
      metaDescription: 'Ideas de imprimibles de Halloween y Día de los Muertos para Etsy y KDP. Doble nicho octubre-noviembre con demanda explosiva en el mercado hispano.',
    },
    hero: {
      title: 'Ideas de negocio con imprimibles de Halloween y Día de los Muertos',
      description: 'Halloween y el Día de los Muertos crean una ventana de ventas excepcional para los emprendedores de imprimibles en el mercado hispano. Mientras que Halloween genera demanda explosiva en octubre con calabazas, fantasmas y brujas, el Día de los Muertos (1-2 de noviembre) extiende la temporada en México y comunidades latinas con calaveras de azúcar, ofrendas y cempasúchil. Para los vendedores inteligentes, esta combinación significa casi dos meses de ventas intensas con dos públicos distintos. Los padres hispanos en Estados Unidos buscan ambos temas activamente en Etsy y Amazon. En México, el Día de los Muertos genera aún más demanda que Halloween. Esta guía le presenta ideas de productos para ambas celebraciones, estrategias de precios estacionales y cómo posicionar su tienda en Etsy, KDP y Hotmart para capturar este doble pico de demanda.',
    },
  },
  {
    file: 'easter-printable-ideas.ts',
    seo: {
      primaryKeyword: 'imprimibles de Semana Santa Pascua para vender',
      secondaryKeywords: [
        'fichas de Pascua para Etsy y KDP',
        'negocio imprimibles Semana Santa primavera',
        'actividades pascuales comerciales Hotmart',
        'vender fichas conejo de Pascua en línea',
      ],
      lsiKeywords: [
        'pico ventas marzo abril imprimibles Pascua',
        'Semana Santa tradición hispana imprimibles',
        'productos digitales huevos conejitos primavera',
      ],
      titleTag: 'Imprimibles Pascua para vender | LCS',
      metaDescription: 'Ideas de imprimibles de Semana Santa y Pascua para vender en Etsy y KDP. Nicho de primavera con demanda cultural profunda en el mercado hispanohablante.',
    },
    hero: {
      title: 'Ideas de imprimibles de Semana Santa y Pascua para vender',
      description: 'La Semana Santa y la Pascua representan una de las temporadas de ventas más importantes para los imprimibles educativos en el mercado hispano. A diferencia del mercado anglosajón donde la Pascua es principalmente secular, en España y Latinoamérica la Semana Santa tiene un significado cultural profundo que extiende la demanda más allá de los conejos y huevos pintados. Para los vendedores de imprimibles, esto abre dos líneas de productos paralelas: actividades seculares de primavera con conejitos y pollitos para el mercado general, y materiales culturales de Semana Santa para familias hispanas. El pico de ventas ocurre entre febrero y abril, con la planificación de compra comenzando en enero. Esta guía le muestra ideas de productos específicos, estrategias de precios y cómo aprovechar ambos enfoques en Etsy, KDP y Hotmart.',
    },
  },
  {
    file: 'valentines-day-printable-ideas.ts',
    seo: {
      primaryKeyword: 'imprimibles de San Valentín para vender',
      secondaryKeywords: [
        'fichas de San Valentín Etsy KDP',
        'negocio imprimibles Día del Amor febrero',
        'actividades San Valentín comerciales',
        'vender fichas corazones en línea Hotmart',
      ],
      lsiKeywords: [
        'pico ventas enero febrero imprimibles Valentín',
        'Día del Amor y Amistad Latinoamérica',
        'productos digitales corazones cupidos primavera',
      ],
      titleTag: 'Imprimibles San Valentín para vender | LCS',
      metaDescription: 'Ideas de imprimibles de San Valentín para vender en Etsy y KDP. Temporada corta pero intensísima — publique en enero para maximizar ventas en febrero.',
    },
    hero: {
      title: 'Ideas de imprimibles de San Valentín para vender en Etsy y KDP',
      description: 'San Valentín — o el Día del Amor y la Amistad, como se conoce en varios países de Latinoamérica — genera un pico de ventas corto pero extremadamente intenso para los imprimibles educativos. La ventana de ventas principal va de enero a mediados de febrero, con los vendedores más exitosos publicando sus productos en diciembre para capturar las búsquedas tempranas. Corazones, cupidos, animales con mensajes de amistad y actividades de conteo temáticas dominan las búsquedas. En el mercado hispano, el énfasis en la amistad además del amor romántico amplía el público objetivo: las actividades no son solo para parejas sino para todo tipo de relaciones. Esta guía le presenta ideas de productos con alta conversión, precios estacionales y estrategias para posicionar sus imprimibles de San Valentín en Etsy, KDP y Hotmart.',
    },
  },
  {
    file: 'back-to-school-printable-ideas.ts',
    seo: {
      primaryKeyword: 'imprimibles de regreso a clases para vender Etsy',
      secondaryKeywords: [
        'fichas vuelta al colegio para Etsy KDP',
        'negocio imprimibles regreso escolar',
        'actividades inicio clases comerciales',
        'vender fichas escolares septiembre en línea',
      ],
      lsiKeywords: [
        'pico ventas agosto septiembre imprimibles escolares',
        'regreso a clases España septiembre México agosto',
        'productos digitales material escolar Hotmart',
      ],
      titleTag: 'Imprimibles regreso a clases Etsy | LCS',
      metaDescription: 'Ideas de imprimibles de regreso a clases para Etsy y KDP. Temporada con demanda masiva — las fechas varían por país hispano, lo que extiende sus ventas.',
    },
    hero: {
      title: 'Ideas de imprimibles de regreso a clases para vender en Etsy',
      description: 'El regreso a clases es una de las temporadas de mayor demanda para los imprimibles educativos — y en el mercado hispano, una ventaja única extiende su ventana de ventas. Mientras que en España las clases comienzan en septiembre, en México el ciclo arranca en agosto, y en Argentina y Chile el año escolar inicia en febrero-marzo. Para los vendedores de imprimibles, esto significa que puede vender productos de regreso a clases durante varios meses del año atacando diferentes mercados hispanos en diferentes momentos. Las fichas de repaso, actividades de evaluación inicial, kits de organización escolar y paquetes de bienvenida son los productos más buscados. Esta guía le muestra ideas de productos específicos, cronograma de publicación por país y estrategias para maximizar ventas en Etsy, KDP y Hotmart.',
    },
  },
  {
    file: 'summer-printable-ideas.ts',
    seo: {
      primaryKeyword: 'imprimibles de verano ideas negocio',
      secondaryKeywords: [
        'fichas de verano para vender Etsy',
        'negocio imprimibles actividades verano',
        'paquetes imprimibles vacaciones KDP',
        'vender fichas playa campamento Hotmart',
      ],
      lsiKeywords: [
        'pico ventas junio julio imprimibles verano',
        'actividades vacaciones para niños vendedores',
        'productos digitales playa sol helados temáticos',
      ],
      titleTag: 'Imprimibles de verano — Negocio | LCS',
      metaDescription: 'Ideas de imprimibles de verano para vender en Etsy y KDP. Paquetes anti-aburrimiento y actividades de viaje — temporada de alta demanda para vendedores.',
    },
    hero: {
      title: 'Ideas de negocio con imprimibles de verano para Etsy y KDP',
      description: 'El verano genera una demanda única para los imprimibles educativos: los padres buscan actividades que mantengan a sus hijos ocupados y aprendiendo durante las vacaciones. Paquetes anti-aburrimiento, fichas de viaje, cuadernillos de repaso y actividades temáticas de playa, camping y helados dominan las búsquedas desde mayo hasta agosto. Para los vendedores de imprimibles en el mercado hispano, el verano ofrece una oportunidad doble: las vacaciones de junio a agosto en el hemisferio norte coinciden con las vacaciones de invierno en el hemisferio sur, donde los padres también buscan actividades. Las fichas de verano se venden bien como paquetes grandes porque los padres quieren resolver varias semanas de actividades con una sola compra. Esta guía le presenta ideas de productos, precios por formato y estrategias para posicionar su tienda en Etsy, KDP y Hotmart.',
    },
  },
  {
    file: 'winter-printable-ideas.ts',
    seo: {
      primaryKeyword: 'imprimibles de invierno para vender en Etsy',
      secondaryKeywords: [
        'fichas de invierno negocio KDP',
        'negocio imprimibles temporada invernal',
        'actividades de nieve muñecos invierno',
        'vender fichas invierno Hotmart en línea',
      ],
      lsiKeywords: [
        'pico ventas diciembre enero imprimibles invierno',
        'fichas educativas copos nieve vendedores',
        'productos digitales pingüinos osos polares Hotmart',
      ],
      titleTag: 'Imprimibles de invierno para Etsy | LCS',
      metaDescription: 'Ideas de imprimibles de invierno para vender en Etsy y KDP. Copos de nieve, pingüinos y osos polares — temporada larga de noviembre a febrero.',
    },
    hero: {
      title: 'Ideas de imprimibles de invierno para vender en Etsy, KDP y Hotmart',
      description: 'El invierno ofrece una temporada de ventas extendida para los imprimibles educativos — desde noviembre hasta febrero — con múltiples ganchos temáticos que mantienen la demanda alta. Copos de nieve, pingüinos, osos polares, muñecos de nieve y actividades de días fríos en casa atraen a padres que buscan mantener a sus hijos entretenidos y aprendiendo durante los meses más cortos. A diferencia de los nichos navideños que caen después del 25 de diciembre, los imprimibles de invierno se venden bien hasta febrero. En el mercado hispano, tenga en cuenta que mientras España y México experimentan invierno de diciembre a febrero, los países del hemisferio sur tienen su invierno de junio a agosto. Esta guía le muestra ideas de productos, estrategias de precios y cómo extender sus ventas de invierno durante todo el año en Etsy, KDP y Hotmart.',
    },
  },
  {
    file: 'spring-printable-ideas.ts',
    seo: {
      primaryKeyword: 'imprimibles de primavera ideas negocio',
      secondaryKeywords: [
        'fichas de primavera para vender Etsy',
        'negocio imprimibles flores mariposas',
        'actividades primaverales comerciales KDP',
        'vender fichas jardín en línea Hotmart',
      ],
      lsiKeywords: [
        'pico ventas marzo abril imprimibles primavera',
        'fichas educativas flores insectos vendedores',
        'productos digitales jardín naturaleza Hotmart',
      ],
      titleTag: 'Imprimibles primavera — Negocio | LCS',
      metaDescription: 'Ideas de imprimibles de primavera para Etsy y KDP. Flores, mariposas y jardines — temporada de renovación con alta demanda educativa y decorativa.',
    },
    hero: {
      title: 'Ideas de negocio con imprimibles de primavera para Etsy y KDP',
      description: 'La primavera es una de las temporadas más rentables para los vendedores de imprimibles educativos. Flores, mariposas, jardines, lluvia y animales bebé generan una demanda que cruza múltiples categorías de productos. Los padres buscan actividades de ciencias naturales sobre crecimiento de plantas y ciclos de vida, mientras que las fichas temáticas de primavera se convierten en las más populares en Etsy desde marzo hasta mayo. Para los vendedores en el mercado hispano, la primavera coincide con la Semana Santa y la planificación del final del curso escolar, creando múltiples oportunidades de venta. Las fichas de primavera también se benefician de una estética visual atractiva que genera más clics y mayores tasas de conversión. Esta guía le presenta ideas de productos, estrategias de lanzamiento estacional y cómo posicionar su tienda en Etsy, KDP y Hotmart.',
    },
  },
  {
    file: 'thanksgiving-printable-ideas.ts',
    seo: {
      primaryKeyword: 'imprimibles de Día de Acción de Gracias vender',
      secondaryKeywords: [
        'fichas Thanksgiving para Etsy hispano',
        'negocio imprimibles Acción de Gracias KDP',
        'actividades Thanksgiving comerciales noviembre',
        'vender fichas pavo otoño en línea',
      ],
      lsiKeywords: [
        'pico ventas noviembre imprimibles Thanksgiving',
        'mercado hispano Estados Unidos Acción Gracias',
        'productos digitales otoño cosecha gratitud Hotmart',
      ],
      titleTag: 'Imprimibles Acción de Gracias | LCS',
      metaDescription: 'Ideas de imprimibles de Día de Acción de Gracias para Etsy y KDP. Mercado hispano en EE.UU. busca materiales en español — nicho con poca competencia.',
    },
    hero: {
      title: 'Ideas de imprimibles de Acción de Gracias para vender en Etsy',
      description: 'El Día de Acción de Gracias representa una oportunidad única en el mercado de imprimibles en español: millones de familias hispanas en Estados Unidos celebran Thanksgiving pero encuentran muy pocos materiales educativos en su idioma. Los padres hispanos buscan activamente fichas, actividades y decoraciones de Acción de Gracias en español para sus hijos, pero la oferta es escasa. Pavos, hojas de otoño, cosechas y temas de gratitud dominan las búsquedas en noviembre. La ventana de ventas es corta — de octubre a noviembre — pero la demanda es intensa y la conversión alta porque los compradores tienen pocas opciones en español. Para los vendedores de imprimibles, esto crea un nicho de alta rentabilidad con competencia mínima. Esta guía le muestra ideas de productos, precios y estrategias para capturar este mercado en Etsy, KDP y Hotmart.',
    },
  },
  {
    file: 'parents-day-printable-ideas.ts',
    seo: {
      primaryKeyword: 'imprimibles Día de la Madre Padre para vender',
      secondaryKeywords: [
        'fichas Día de la Madre para Etsy',
        'negocio imprimibles Día del Padre KDP',
        'actividades regalo padres comerciales',
        'vender fichas manualidades padres Hotmart',
      ],
      lsiKeywords: [
        'pico ventas mayo junio imprimibles padres',
        'Día de la Madre fechas varían por país hispano',
        'productos digitales regalos manualidades Hotmart',
      ],
      titleTag: 'Imprimibles Día de Madre/Padre | LCS',
      metaDescription: 'Ideas de imprimibles para Día de la Madre y Día del Padre para Etsy y KDP. Fechas varían por país hispano — más ventanas de venta para emprendedores.',
    },
    hero: {
      title: 'Ideas de imprimibles para Día de la Madre y Padre para vender',
      description: 'El Día de la Madre y el Día del Padre crean dos picos de ventas anuales con alta demanda emocional — y en el mercado hispano, una ventaja que muchos vendedores ignoran: las fechas varían por país. El Día de la Madre se celebra en mayo en la mayoría de los países, pero en Argentina cae en octubre, en Panamá en diciembre y en Bolivia en mayo 27. El Día del Padre varía igualmente. Para los vendedores de imprimibles, esto multiplica las ventanas de venta: puede lanzar y relanzar sus productos en diferentes momentos para diferentes mercados. Las tarjetas imprimibles, los cupones de regalo personalizables, las fichas de escritura creativa sobre la familia y las manualidades para regalar son los productos más buscados. Esta guía le presenta ideas concretas, precios y estrategias para Etsy, KDP y Hotmart.',
    },
  },

  // === E3: BY INTEREST — first 5 ===
  {
    file: 'space-printable-ideas.ts',
    seo: {
      primaryKeyword: 'imprimibles del espacio para vender en Etsy',
      secondaryKeywords: [
        'fichas del espacio para negocio Etsy KDP',
        'negocio imprimibles astronomía planetas',
        'actividades espaciales comerciales en línea',
        'vender fichas cohetes astronautas Hotmart',
      ],
      lsiKeywords: [
        'nicho imprimibles espacio demanda todo el año',
        'fichas educativas planetas sistema solar',
        'productos digitales NASA cohetes vendedores',
      ],
      titleTag: 'Imprimibles espacio para Etsy | LCS',
      metaDescription: 'Ideas de imprimibles del espacio para vender en Etsy y KDP. Planetas, cohetes y astronautas — nicho con demanda constante y fascinación infantil universal.',
    },
    hero: {
      title: 'Ideas de imprimibles del espacio para vender en Etsy y KDP',
      description: 'El espacio exterior es uno de los temas que más fascinan a los niños de todas las edades — y esa fascinación se traduce en ventas constantes para los emprendedores de imprimibles. Planetas, cohetes, astronautas, estrellas y el sistema solar generan búsquedas activas en Etsy y Amazon durante todo el año, con picos durante eventos espaciales y temporadas de proyectos de ciencias. Para los vendedores de imprimibles, el nicho del espacio ofrece versatilidad excepcional: desde fichas de conteo con planetas hasta sopas de letras con vocabulario espacial, pasando por actividades de colorear constelaciones. En el mercado hispano, la demanda crece mientras la competencia permanece baja. Esta guía le presenta ideas de productos específicos, precios por plataforma y estrategias para construir su negocio de imprimibles espaciales en Etsy, KDP y Hotmart.',
    },
  },
  {
    file: 'transportation-printable-ideas.ts',
    seo: {
      primaryKeyword: 'imprimibles de transportes ideas negocio',
      secondaryKeywords: [
        'fichas de vehículos para vender Etsy',
        'negocio imprimibles coches aviones trenes',
        'actividades transporte comerciales KDP',
        'vender fichas medios transporte Hotmart',
      ],
      lsiKeywords: [
        'nicho imprimibles transportes demanda niños',
        'fichas educativas vehículos vendedores',
        'productos digitales coches camiones aviones',
      ],
      titleTag: 'Imprimibles transportes — Negocio | LCS',
      metaDescription: 'Ideas de imprimibles de transportes para Etsy y KDP. Coches, aviones y trenes — nicho con demanda constante entre niños de 2 a 7 años.',
    },
    hero: {
      title: 'Ideas de negocio con imprimibles de transportes para vender',
      description: 'Los medios de transporte son un tema que captura la atención de los niños desde los dos años — coches, camiones, aviones, trenes y barcos generan una fascinación que los padres aprovechan para actividades educativas. Para los vendedores de imprimibles, el nicho de transportes ofrece demanda constante sin dependencia estacional, con públicos que van desde preescolares que aprenden a contar vehículos hasta niños de primaria que estudian vocabulario y clasificación. Las fichas de transporte se venden especialmente bien en paquetes temáticos: vehículos de construcción, vehículos de emergencia, transportes acuáticos y transportes aéreos. En el mercado hispano, la competencia es mínima para productos de calidad en español. Esta guía le presenta ideas de productos, estrategias de precios y cómo construir su línea en Etsy, KDP y Hotmart.',
    },
  },
  {
    file: 'food-cooking-printable-ideas.ts',
    seo: {
      primaryKeyword: 'imprimibles de alimentos para vender en Etsy',
      secondaryKeywords: [
        'fichas de comida para negocio Etsy KDP',
        'negocio imprimibles frutas verduras educativos',
        'actividades alimentos comerciales Hotmart',
        'vender fichas cocina nutrición en línea',
      ],
      lsiKeywords: [
        'nicho imprimibles alimentos demanda perenne',
        'fichas educativas nutrición vendedores',
        'productos digitales frutas verduras comida Hotmart',
      ],
      titleTag: 'Imprimibles alimentos para Etsy | LCS',
      metaDescription: 'Ideas de imprimibles de alimentos para vender en Etsy y KDP. Frutas, verduras y cocina — nicho educativo perenne con múltiples ángulos de producto.',
    },
    hero: {
      title: 'Ideas de imprimibles de alimentos para vender en Etsy y KDP',
      description: 'Los alimentos son un tema educativo universal que genera ventas constantes para los vendedores de imprimibles. Frutas, verduras, platos típicos y actividades de cocina atraen a padres que buscan enseñar nutrición, vocabulario y habilidades matemáticas a través de contextos cotidianos. Para los emprendedores de imprimibles, el nicho de alimentos ofrece versatilidad excepcional: fichas de conteo con frutas, actividades de clasificación por grupos alimenticios, sopas de letras de vocabulario culinario y páginas para colorear de platos del mundo. El tema no tiene dependencia estacional — los alimentos son relevantes todo el año. En el mercado hispano, la riqueza gastronómica de cada país crea oportunidades para productos culturalmente específicos que los vendedores anglosajones no pueden replicar. Esta guía le muestra ideas de productos, precios y estrategias para Etsy, KDP y Hotmart.',
    },
  },
  {
    file: 'sports-printable-ideas.ts',
    seo: {
      primaryKeyword: 'imprimibles de deportes ideas negocio',
      secondaryKeywords: [
        'fichas de deportes para vender Etsy',
        'negocio imprimibles fútbol béisbol',
        'actividades deportivas comerciales KDP',
        'vender fichas deportes Hotmart en línea',
      ],
      lsiKeywords: [
        'nicho imprimibles deportes demanda niños',
        'fichas educativas fútbol vendedores hispanos',
        'productos digitales deportes olimpiadas Mundial',
      ],
      titleTag: 'Imprimibles deportes — Negocio | LCS',
      metaDescription: 'Ideas de imprimibles de deportes para Etsy y KDP. Fútbol, béisbol y más — nicho con picos en eventos deportivos y demanda constante entre niños.',
    },
    hero: {
      title: 'Ideas de negocio con imprimibles de deportes para vender en línea',
      description: 'Los deportes generan una pasión que se traduce directamente en ventas de imprimibles educativos. El fútbol — el deporte más popular del mundo hispano — lidera las búsquedas, seguido por el béisbol en el Caribe y Centroamérica, y el baloncesto en mercados urbanos. Para los vendedores de imprimibles, el nicho deportivo ofrece demanda constante con picos predecibles durante el Mundial de Fútbol, las Olimpiadas, el inicio de temporadas y las ligas locales. Las fichas de conteo con balones, sopas de letras con vocabulario deportivo, actividades de lógica con equipamiento y páginas para colorear de atletas son productos que se venden bien todo el año. En el mercado hispano, el fútbol crea una oportunidad única — la pasión es tan intensa que los padres buscan activamente material educativo temático. Esta guía le presenta ideas, precios y estrategias para Etsy, KDP y Hotmart.',
    },
  },
  {
    file: 'music-printable-ideas.ts',
    seo: {
      primaryKeyword: 'imprimibles de música para vender',
      secondaryKeywords: [
        'fichas de música para negocio Etsy',
        'negocio imprimibles instrumentos musicales',
        'actividades musicales comerciales KDP',
        'vender fichas notas musicales Hotmart',
      ],
      lsiKeywords: [
        'nicho imprimibles música demanda educativa',
        'fichas educativas instrumentos vendedores',
        'productos digitales ritmo notas musicales Hotmart',
      ],
      titleTag: 'Imprimibles música para vender | LCS',
      metaDescription: 'Ideas de imprimibles de música para vender en Etsy y KDP. Instrumentos, notas y ritmos — nicho educativo con demanda constante y poca competencia.',
    },
    hero: {
      title: 'Ideas de imprimibles de música para vender en Etsy y Hotmart',
      description: 'La música es un nicho subestimado en el mercado de imprimibles educativos que ofrece oportunidades excepcionales para los emprendedores. Instrumentos musicales, notas, ritmos y compositores generan búsquedas constantes de padres y educadores que integran la música en el aprendizaje de otras materias. Las fichas de conteo con instrumentos, actividades de emparejamiento de sonidos, sopas de letras con vocabulario musical y páginas para colorear de instrumentos del mundo son productos con demanda real y competencia mínima. En el mercado hispano, la riqueza musical de cada país — desde la marimba guatemalteca hasta el charango andino — crea oportunidades para productos culturalmente auténticos que ningún otro vendedor ofrece. El nicho de música no depende de temporadas, aunque hay picos durante el Día de la Música y el inicio del curso escolar. Esta guía le muestra ideas de productos, precios y estrategias para Etsy, KDP y Hotmart.',
    },
  },
];

// ============================================================
// APPLY UPDATES
// ============================================================
let totalUpdated = 0;

for (const idea of ideas) {
  const filePath = path.join(BASE, idea.file);
  if (!fs.existsSync(filePath)) {
    console.error(`ERROR: File not found: ${idea.file}`);
    continue;
  }

  console.log(`\nProcessing ${idea.file}...`);
  let content = fs.readFileSync(filePath, 'utf8');

  // Update SEO fields
  content = replaceField(content, 'primaryKeyword', idea.seo.primaryKeyword);
  content = replaceArrayField(content, 'secondaryKeywords', idea.seo.secondaryKeywords);
  content = replaceArrayField(content, 'lsiKeywords', idea.seo.lsiKeywords);
  content = replaceField(content, 'titleTag', idea.seo.titleTag);

  // metaDescription might be on next line
  const mdRe = /(metaDescription:\s*\n?\s*)(['"])(?:[^'"\\]|\\.)*\2/;
  if (mdRe.test(content)) {
    content = content.replace(mdRe, `$1'${esc(idea.seo.metaDescription)}'`);
  }

  // Update hero title
  const heroTitleRe = /(hero:\s*\{[\s\S]*?title:\s*)(['"])(?:[^'"\\]|\\.)*\2/;
  if (heroTitleRe.test(content)) {
    content = content.replace(heroTitleRe, `$1'${esc(idea.hero.title)}'`);
  }

  // Update hero description (no tagline in idea content)
  content = replaceHeroDescription(content, idea.hero.description);

  // Replace Gumroad references with Hotmart
  content = content.replace(/Gumroad/g, 'Hotmart');
  content = content.replace(/gumroad\.com/g, 'hotmart.com');
  content = content.replace(/teacherspayteachers\.com/g, 'hotmart.com');

  // Validate lengths
  const titleMatch = content.match(/titleTag:\s*'([^']*)'/);
  if (titleMatch && titleMatch[1].length > 60) {
    console.warn(`  WARNING: titleTag is ${titleMatch[1].length} chars (max 60): "${titleMatch[1]}"`);
  } else if (titleMatch) {
    console.log(`  titleTag: ${titleMatch[1].length} chars OK`);
  }

  const metaMatch = content.match(/metaDescription:\s*\n?\s*'([^']*)'/);
  if (metaMatch && metaMatch[1].length > 155) {
    console.warn(`  WARNING: metaDescription is ${metaMatch[1].length} chars (max 155): "${metaMatch[1]}"`);
  } else if (metaMatch) {
    console.log(`  metaDescription: ${metaMatch[1].length} chars OK`);
  }

  // Check for unicode escapes
  if (/\\u[0-9a-fA-F]{4}/.test(content)) {
    console.warn('  WARNING: Found \\uXXXX unicode escapes!');
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`  Updated ${idea.file}`);
  totalUpdated++;
}

console.log(`\n=== Done: ${totalUpdated} of ${ideas.length} files updated ===`);
