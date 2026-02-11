/**
 * Theme URL slug mappings for /[locale]/worksheets/[theme]/ pages.
 *
 * Each theme has a localized slug per locale for SEO-friendly URLs.
 * The `id` is the internal theme identifier (matches image library folder names).
 *
 * Selected themes: top 50 by educational search-volume relevance,
 * prioritizing themes that exist in the image library and work across
 * many worksheet generator apps.
 */

export const THEME_SLUGS = [
  'animals',
  'food',
  'transportation',
  'nature',
  'school',
  'sports',
  'emotions',
  'body',
  'clothing',
  'household',
  'toys',
  'music',
  'jobs',
  'space',
  'seasons',
  'holidays',
  'weather',
  'colors',
  'shapes',
  'numbers',
  'alphabet',
  'furniture',
  'easter',
  'halloween',
  'xmas',
  'winter',
  'farm',
  'ocean',
  'dinosaurs',
  'insects',
  'fruits',
  'vegetables',
  'flowers',
  'birds',
  'pets',
  'zoo',
  'garden',
  'camping',
  'pirates',
  'fairy-tales',
  'robots',
  'superheroes',
  'construction',
  'cooking',
  'travel',
  'birthday',
  'circus',
  'forest',
  'spring',
  'summer',
] as const;

export type ThemeSlug = typeof THEME_SLUGS[number];

/** Internal theme id -> localized URL slug per locale */
export const themeSlugMap: Record<string, Record<string, string>> = {
  animals: {
    en: 'animals', de: 'tiere', fr: 'animaux', es: 'animales',
    pt: 'animais', it: 'animali', nl: 'dieren', sv: 'djur',
    da: 'dyr', no: 'dyr', fi: 'elaimet',
  },
  food: {
    en: 'food', de: 'essen', fr: 'nourriture', es: 'comida',
    pt: 'comida', it: 'cibo', nl: 'eten', sv: 'mat',
    da: 'mad', no: 'mat', fi: 'ruoka',
  },
  transportation: {
    en: 'transportation', de: 'transport', fr: 'transport', es: 'transporte',
    pt: 'transporte', it: 'trasporti', nl: 'vervoer', sv: 'transport',
    da: 'transport', no: 'transport', fi: 'liikenne',
  },
  nature: {
    en: 'nature', de: 'natur', fr: 'nature', es: 'naturaleza',
    pt: 'natureza', it: 'natura', nl: 'natuur', sv: 'natur',
    da: 'natur', no: 'natur', fi: 'luonto',
  },
  school: {
    en: 'school', de: 'schule', fr: 'ecole', es: 'escuela',
    pt: 'escola', it: 'scuola', nl: 'school', sv: 'skola',
    da: 'skole', no: 'skole', fi: 'koulu',
  },
  sports: {
    en: 'sports', de: 'sport', fr: 'sports', es: 'deportes',
    pt: 'esportes', it: 'sport', nl: 'sport', sv: 'sport',
    da: 'sport', no: 'sport', fi: 'urheilu',
  },
  emotions: {
    en: 'emotions', de: 'emotionen', fr: 'emotions', es: 'emociones',
    pt: 'emocoes', it: 'emozioni', nl: 'emoties', sv: 'kanslor',
    da: 'folelser', no: 'folelser', fi: 'tunteet',
  },
  body: {
    en: 'body', de: 'koerper', fr: 'corps', es: 'cuerpo',
    pt: 'corpo', it: 'corpo', nl: 'lichaam', sv: 'kropp',
    da: 'krop', no: 'kropp', fi: 'keho',
  },
  clothing: {
    en: 'clothing', de: 'kleidung', fr: 'vetements', es: 'ropa',
    pt: 'roupas', it: 'abbigliamento', nl: 'kleding', sv: 'klader',
    da: 'toj', no: 'klaer', fi: 'vaatteet',
  },
  household: {
    en: 'household', de: 'haushalt', fr: 'maison', es: 'hogar',
    pt: 'casa', it: 'casa', nl: 'huishouden', sv: 'hushall',
    da: 'husholdning', no: 'husholdning', fi: 'koti',
  },
  toys: {
    en: 'toys', de: 'spielzeug', fr: 'jouets', es: 'juguetes',
    pt: 'brinquedos', it: 'giocattoli', nl: 'speelgoed', sv: 'leksaker',
    da: 'legetoj', no: 'leker', fi: 'lelut',
  },
  music: {
    en: 'music', de: 'musik', fr: 'musique', es: 'musica',
    pt: 'musica', it: 'musica', nl: 'muziek', sv: 'musik',
    da: 'musik', no: 'musikk', fi: 'musiikki',
  },
  jobs: {
    en: 'jobs', de: 'berufe', fr: 'metiers', es: 'trabajos',
    pt: 'profissoes', it: 'lavori', nl: 'beroepen', sv: 'yrken',
    da: 'job', no: 'yrker', fi: 'ammatit',
  },
  space: {
    en: 'space', de: 'weltraum', fr: 'espace', es: 'espacio',
    pt: 'espaco', it: 'spazio', nl: 'ruimte', sv: 'rymden',
    da: 'rum', no: 'rommet', fi: 'avaruus',
  },
  seasons: {
    en: 'seasons', de: 'jahreszeiten', fr: 'saisons', es: 'estaciones',
    pt: 'estacoes', it: 'stagioni', nl: 'seizoenen', sv: 'arstider',
    da: 'arstider', no: 'arstider', fi: 'vuodenajat',
  },
  holidays: {
    en: 'holidays', de: 'feiertage', fr: 'vacances', es: 'vacaciones',
    pt: 'feriados', it: 'vacanze', nl: 'vakanties', sv: 'helgdagar',
    da: 'helligdage', no: 'helligdager', fi: 'lomat',
  },
  weather: {
    en: 'weather', de: 'wetter', fr: 'meteo', es: 'clima',
    pt: 'clima', it: 'meteo', nl: 'weer', sv: 'vader',
    da: 'vejr', no: 'vaer', fi: 'saa',
  },
  colors: {
    en: 'colors', de: 'farben', fr: 'couleurs', es: 'colores',
    pt: 'cores', it: 'colori', nl: 'kleuren', sv: 'farger',
    da: 'farver', no: 'farger', fi: 'varit',
  },
  shapes: {
    en: 'shapes', de: 'formen', fr: 'formes', es: 'formas',
    pt: 'formas', it: 'forme', nl: 'vormen', sv: 'former',
    da: 'former', no: 'former', fi: 'muodot',
  },
  numbers: {
    en: 'numbers', de: 'zahlen', fr: 'nombres', es: 'numeros',
    pt: 'numeros', it: 'numeri', nl: 'getallen', sv: 'siffror',
    da: 'tal', no: 'tall', fi: 'numerot',
  },
  alphabet: {
    en: 'alphabet', de: 'alphabet', fr: 'alphabet', es: 'alfabeto',
    pt: 'alfabeto', it: 'alfabeto', nl: 'alfabet', sv: 'alfabet',
    da: 'alfabet', no: 'alfabet', fi: 'aakkoset',
  },
  furniture: {
    en: 'furniture', de: 'moebel', fr: 'meubles', es: 'muebles',
    pt: 'moveis', it: 'mobili', nl: 'meubels', sv: 'mobler',
    da: 'mobler', no: 'mobler', fi: 'huonekalut',
  },
  easter: {
    en: 'easter', de: 'ostern', fr: 'paques', es: 'pascua',
    pt: 'pascoa', it: 'pasqua', nl: 'pasen', sv: 'pask',
    da: 'paske', no: 'paske', fi: 'paasiaisnen',
  },
  halloween: {
    en: 'halloween', de: 'halloween', fr: 'halloween', es: 'halloween',
    pt: 'halloween', it: 'halloween', nl: 'halloween', sv: 'halloween',
    da: 'halloween', no: 'halloween', fi: 'halloween',
  },
  xmas: {
    en: 'christmas', de: 'weihnachten', fr: 'noel', es: 'navidad',
    pt: 'natal', it: 'natale', nl: 'kerstmis', sv: 'jul',
    da: 'jul', no: 'jul', fi: 'joulu',
  },
  winter: {
    en: 'winter', de: 'winter', fr: 'hiver', es: 'invierno',
    pt: 'inverno', it: 'inverno', nl: 'winter', sv: 'vinter',
    da: 'vinter', no: 'vinter', fi: 'talvi',
  },
  farm: {
    en: 'farm', de: 'bauernhof', fr: 'ferme', es: 'granja',
    pt: 'fazenda', it: 'fattoria', nl: 'boerderij', sv: 'bondgard',
    da: 'bondegard', no: 'bondegard', fi: 'maatila',
  },
  ocean: {
    en: 'ocean', de: 'ozean', fr: 'ocean', es: 'oceano',
    pt: 'oceano', it: 'oceano', nl: 'oceaan', sv: 'hav',
    da: 'hav', no: 'hav', fi: 'valtameri',
  },
  dinosaurs: {
    en: 'dinosaurs', de: 'dinosaurier', fr: 'dinosaures', es: 'dinosaurios',
    pt: 'dinossauros', it: 'dinosauri', nl: 'dinosaurussen', sv: 'dinosaurier',
    da: 'dinosaurer', no: 'dinosaurer', fi: 'dinosaurukset',
  },
  insects: {
    en: 'insects', de: 'insekten', fr: 'insectes', es: 'insectos',
    pt: 'insetos', it: 'insetti', nl: 'insecten', sv: 'insekter',
    da: 'insekter', no: 'insekter', fi: 'hyonteiset',
  },
  fruits: {
    en: 'fruits', de: 'fruechte', fr: 'fruits', es: 'frutas',
    pt: 'frutas', it: 'frutta', nl: 'fruit', sv: 'frukter',
    da: 'frugter', no: 'frukt', fi: 'hedelmat',
  },
  vegetables: {
    en: 'vegetables', de: 'gemuese', fr: 'legumes', es: 'verduras',
    pt: 'legumes', it: 'verdure', nl: 'groenten', sv: 'gronsaker',
    da: 'grontsager', no: 'gronnsaker', fi: 'vihannekset',
  },
  flowers: {
    en: 'flowers', de: 'blumen', fr: 'fleurs', es: 'flores',
    pt: 'flores', it: 'fiori', nl: 'bloemen', sv: 'blommor',
    da: 'blomster', no: 'blomster', fi: 'kukat',
  },
  birds: {
    en: 'birds', de: 'voegel', fr: 'oiseaux', es: 'pajaros',
    pt: 'passaros', it: 'uccelli', nl: 'vogels', sv: 'faglar',
    da: 'fugle', no: 'fugler', fi: 'linnut',
  },
  pets: {
    en: 'pets', de: 'haustiere', fr: 'animaux-domestiques', es: 'mascotas',
    pt: 'animais-domesticos', it: 'animali-domestici', nl: 'huisdieren', sv: 'husdjur',
    da: 'kaeldyr', no: 'kjaledyr', fi: 'lemmikit',
  },
  zoo: {
    en: 'zoo', de: 'zoo', fr: 'zoo', es: 'zoologico',
    pt: 'zoologico', it: 'zoo', nl: 'dierentuin', sv: 'djurpark',
    da: 'zoo', no: 'dyrepark', fi: 'elaintarha',
  },
  garden: {
    en: 'garden', de: 'garten', fr: 'jardin', es: 'jardin',
    pt: 'jardim', it: 'giardino', nl: 'tuin', sv: 'tradgard',
    da: 'have', no: 'hage', fi: 'puutarha',
  },
  camping: {
    en: 'camping', de: 'camping', fr: 'camping', es: 'camping',
    pt: 'acampamento', it: 'campeggio', nl: 'kamperen', sv: 'camping',
    da: 'camping', no: 'camping', fi: 'leiriytyminen',
  },
  pirates: {
    en: 'pirates', de: 'piraten', fr: 'pirates', es: 'piratas',
    pt: 'piratas', it: 'pirati', nl: 'piraten', sv: 'pirater',
    da: 'pirater', no: 'pirater', fi: 'merirosvot',
  },
  'fairy-tales': {
    en: 'fairy-tales', de: 'maerchen', fr: 'contes-de-fees', es: 'cuentos-de-hadas',
    pt: 'contos-de-fadas', it: 'fiabe', nl: 'sprookjes', sv: 'sagor',
    da: 'eventyr', no: 'eventyr', fi: 'sadut',
  },
  robots: {
    en: 'robots', de: 'roboter', fr: 'robots', es: 'robots',
    pt: 'robos', it: 'robot', nl: 'robots', sv: 'robotar',
    da: 'robotter', no: 'roboter', fi: 'robotit',
  },
  superheroes: {
    en: 'superheroes', de: 'superhelden', fr: 'super-heros', es: 'superheroes',
    pt: 'super-herois', it: 'supereroi', nl: 'superhelden', sv: 'superhjaltar',
    da: 'superhelter', no: 'superhelter', fi: 'supersankarit',
  },
  construction: {
    en: 'construction', de: 'baustelle', fr: 'construction', es: 'construccion',
    pt: 'construcao', it: 'costruzione', nl: 'bouw', sv: 'byggarbetsplats',
    da: 'byggeplads', no: 'byggeplass', fi: 'rakennustyomaa',
  },
  cooking: {
    en: 'cooking', de: 'kochen', fr: 'cuisine', es: 'cocina',
    pt: 'cozinha', it: 'cucina', nl: 'koken', sv: 'matlagning',
    da: 'madlavning', no: 'matlaging', fi: 'ruoanlaitto',
  },
  travel: {
    en: 'travel', de: 'reisen', fr: 'voyage', es: 'viajes',
    pt: 'viagens', it: 'viaggi', nl: 'reizen', sv: 'resor',
    da: 'rejser', no: 'reiser', fi: 'matkailu',
  },
  birthday: {
    en: 'birthday', de: 'geburtstag', fr: 'anniversaire', es: 'cumpleanos',
    pt: 'aniversario', it: 'compleanno', nl: 'verjaardag', sv: 'fodelsedag',
    da: 'fodselsdag', no: 'bursdag', fi: 'syntymapaiva',
  },
  circus: {
    en: 'circus', de: 'zirkus', fr: 'cirque', es: 'circo',
    pt: 'circo', it: 'circo', nl: 'circus', sv: 'cirkus',
    da: 'cirkus', no: 'sirkus', fi: 'sirkus',
  },
  forest: {
    en: 'forest', de: 'wald', fr: 'foret', es: 'bosque',
    pt: 'floresta', it: 'foresta', nl: 'bos', sv: 'skog',
    da: 'skov', no: 'skog', fi: 'metsa',
  },
  spring: {
    en: 'spring', de: 'fruehling', fr: 'printemps', es: 'primavera',
    pt: 'primavera', it: 'primavera', nl: 'lente', sv: 'var',
    da: 'forar', no: 'var', fi: 'kevat',
  },
  summer: {
    en: 'summer', de: 'sommer', fr: 'ete', es: 'verano',
    pt: 'verao', it: 'estate', nl: 'zomer', sv: 'sommar',
    da: 'sommer', no: 'sommer', fi: 'kesa',
  },
};

/** Reverse lookup: given a locale and slug, find the theme id */
export function getThemeIdFromSlug(locale: string, slug: string): string | undefined {
  for (const [themeId, slugs] of Object.entries(themeSlugMap)) {
    if (slugs[locale] === slug || slugs.en === slug) {
      return themeId;
    }
  }
  return undefined;
}

/** Get the localized slug for a theme and locale */
export function getThemeSlug(themeId: string, locale: string): string | undefined {
  return themeSlugMap[themeId]?.[locale] ?? themeSlugMap[themeId]?.en;
}
