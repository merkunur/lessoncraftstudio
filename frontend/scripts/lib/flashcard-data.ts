/**
 * flashcard-data.ts — Pillar 4 Arc 1 Phase 2 data substrate.
 *
 * Vocabulary loader + per-locale sentence templates + theme palette +
 * soft-hyphen substrate (cross-locale long-word handling) + image-key
 * aliases (filename → vocab-key for the 72 mismatches per inventory).
 *
 * Consumed by flashcard-render.ts + generate-flashcards.ts.
 */

import * as fs from 'fs';
import * as path from 'path';

export const PLATFORM_LOCALES = [
  'en', 'de', 'es', 'nl', 'fr', 'it', 'pt', 'sv', 'da', 'no', 'fi',
] as const;

export type Locale = typeof PLATFORM_LOCALES[number];

// ----- IMAGE_VOCABULARY loader -----

/**
 * Loads IMAGE_VOCABULARY from REFERENCE TRANSLATIONS/image-vocabulary.js.
 * The file is a browser-shaped script (uses `window`), so we extract the
 * IMAGE_VOCABULARY object literal via regex slice + Function-eval.
 */
export interface VocabEntry {
  en: [string, string];
  de: [string, string, string];
  fr: [string, string, string];
  es: [string, string, string];
  pt: [string, string, string];
  it: [string, string, string];
  nl: [string, string, string];
  sv: [string, string, string];
  da: [string, string, string];
  no: [string, string, string];
  fi: [string, string];
}

let _vocabCache: Record<string, VocabEntry> | null = null;

export function loadVocab(repoRoot: string): Record<string, VocabEntry> {
  if (_vocabCache) return _vocabCache;
  const filePath = path.join(repoRoot, 'REFERENCE TRANSLATIONS', 'image-vocabulary.js');
  const src = fs.readFileSync(filePath, 'utf-8');
  const match = src.match(/const IMAGE_VOCABULARY = (\{[\s\S]*?\n\});\n/);
  if (!match) throw new Error('IMAGE_VOCABULARY block not found in image-vocabulary.js');
  // eslint-disable-next-line @typescript-eslint/no-implied-eval
  _vocabCache = Function(`return ${match[1]};`)() as Record<string, VocabEntry>;
  return _vocabCache;
}

// ----- Image-filename → vocab-key alias table -----
// Resolves the 72 cross-reference mismatches per flashcard-image-inventory.md.

const TREE_THEME_KEYS = new Set([
  'ash', 'aspen', 'banyan', 'baobab', 'beech', 'birch', 'cedar', 'chestnut',
  'cypress', 'dogwood', 'elm', 'fir', 'hemlock', 'juniper', 'maple', 'oak',
  'palm', 'pine', 'poplar', 'redbud', 'redwood', 'sequoia', 'spruce',
  'sycamore', 'walnut',
]);

const SPELLING_ALIASES: Record<string, string> = {
  'chilli-pepper': 'chili-pepper',
  'octogon': 'octagon',
  'calender': 'calendar',
  'sceptical': 'skeptical',
  'yoghurt': 'yogurt',
  'sallad': 'salad',
  'clown-fish': 'clownfish',
  'dragonfruit': 'dragon-fruit',
  'hotdog': 'hot-dog',
  'biberon': 'baby-bottle',
};

const TRUNCATED_ALIASES: Record<string, string> = {
  'cruise': 'cruise-ship',
  'double-decker': 'double-decker-bus',
  'pickup': 'pickup-truck',
  'dumper-truck': 'dump-truck',
  'preserver-ring': 'life-ring',
  'rocker': 'rocking-chair',
  'spanner': 'wrench',
  'frame': 'photo-frame',
  'bulb': 'light-bulb',
  'gown': 'dress',
  'note': 'musical-note',
  'conversation': 'conversation-heart',
  // 'crystal-ball' self-alias removed at Arc 2 Phase 1 — vocab gap; no
  // target key in IMAGE_VOCABULARY for "crystal ball". Per CLAUDE.md §10.3
  // (NEVER modify image-vocabulary.js without operator approval), this is
  // operator-coordinated; flashcard falls back to filename until vocab
  // entry added.
  'lounge': 'lounge-chair',
  // 'monitor': 'monitor' self-alias → 'heart-monitor' (Arc 2 Phase 1 fix)
  'monitor': 'heart-monitor',
  'mortar': 'mortar',
  // 'cocoa': 'cocoa' self-alias → 'hot-cocoa' (Arc 2 Phase 1 fix)
  'cocoa': 'hot-cocoa',
  'puffer': 'pufferfish',
  'postman': 'mail-carrier',
  'page': 'book-page',
  // 'chart': 'bar-chart' → 'medical-chart' (Arc 2 Phase 1 fix; 'bar-chart'
  // not in vocab; 'medical-chart' is the right target for hospital/chart.png)
  'chart': 'medical-chart',
  'mixer-truck': 'cement-mixer',
  'golf-': 'golf-club',
  // Arc 2 Phase 1 substrate audit additions:
  // winter/pine.png needs explicit fallback to pine-tree (TREE_THEME_KEYS
  // path only fires when themeDir startsWith 'tree'; winter is not tree).
  'pine': 'pine-tree',
};

/**
 * Strips numeric-suffix variants per ImageVocab.keyFromPath shape.
 * "cat 2" → "cat"; "alligator-3" → "alligator".
 */
export function normalizeFilename(filename: string): string {
  const noExt = filename.replace(/\.\w+$/, '');
  const slugified = noExt.replace(/\s+/g, '-').replace(/,/g, '').toLowerCase();
  return slugified.replace(/-\d+$/, '').replace(/-+$/, '');
}

/**
 * Resolves an image filename + theme directory name to canonical vocab key.
 * Handles tree-theme suffix asymmetry, spelling normalization, truncated
 * compounds, and runtime numeric-suffix stripping.
 */
export function resolveVocabKey(filename: string, themeDir: string): string {
  const normalized = normalizeFilename(filename);

  // Tree-theme suffix
  if (themeDir.toLowerCase().startsWith('tree') && TREE_THEME_KEYS.has(normalized)) {
    return `${normalized}-tree`;
  }

  // Spelling normalization
  if (SPELLING_ALIASES[normalized]) return SPELLING_ALIASES[normalized];

  // Truncated compounds
  if (TRUNCATED_ALIASES[normalized]) return TRUNCATED_ALIASES[normalized];

  return normalized;
}

// Sentence-frame substrate REMOVED at Phase 4 iteration 2 per operator
// composition revision. Sky+v2 canonical simplified to two-element layout
// (image + word). buildSentence() and PER-LOCALE TEMPLATE TABLE gone.
// Finnish K-3 simplified frame NSR-flag no longer applies.
// Filing per spec §Phase 5: sentence-frame substrate NOT recommissioned
// for Arc 2 OR Pillar 4 Arc N+ unless operator explicitly resurfaces.

// ----- Theme color palette (3-4mm top accent rule) -----
// Per Sky+v2 spec: 3-4mm theme-color top accent rule for deck-navigation
// affordance on printed packs. Colors drawn from semantic theme groupings.

export const THEME_PALETTE: Record<string, string> = {
  // Animals — green
  'animals': '#4caf50',
  'farm animals': '#558b2f',
  'zoo animals': '#388e3c',
  'forest creatures': '#2e7d32',
  'pets': '#66bb6a',
  'birds': '#7cb342',
  'birds 2': '#7cb342',
  'ocean life': '#0288d1',
  'reptiles and Amphibians': '#689f38',
  'insects and bugs': '#827717',
  'dinosaurs': '#5d4037',

  // Foods — orange/red
  'fruits': '#e64a19',
  'vegetables': '#f57c00',
  'desserts and sweets': '#d81b60',
  'breakfast': '#f9a825',
  'bakery': '#bf6e1e',
  'At the Supermarket': '#f4511e',
  'kitchen tools': '#a1887f',

  // Vehicles + transport — blue
  'vehicles': '#1976d2',
  'Things That Fly': '#0277bd',

  // Clothing + accessories — purple
  'clothing': '#7b1fa2',
  'accessories': '#8e24aa',

  // Body parts + faces — pink
  'body parts': '#ec407a',

  // Home + house — brown
  'around the house': '#6d4c41',
  'furniture': '#795548',
  'household bw': '#8d6e63',

  // Classroom + occupations — teal
  'classroom': '#00838f',
  'occupations': '#00695c',

  // Nature + outdoors — light green
  'flowers': '#aed581',
  'tree': '#33691e',
  'beach': '#0097a7',
  'camping': '#33691e',

  // Sports + activities — orange
  'activities': '#ef6c00',

  // Toys + music — magenta
  'toys': '#c2185b',
  'music': '#9c27b0',

  // Weather + seasons — sky blue/yellow
  'weather': '#039be5',
  'spring': '#8bc34a',
  'summer': '#fb8c00',
  'winter': '#0288d1',

  // Holidays — themed
  '4th of July': '#1565c0',
  'christmas': '#c62828',
  'easter': '#f48fb1',
  'thanksgivinng': '#bf6e1e',

  // Shapes + colors + emotions — slate (abstract concepts)
  'shapes': '#546e7a',
  'colors': '#5e35b1',
  'emotions': '#fb8c00',

  // Misc + other — neutral gray
  'space': '#283593',
  'tools': '#455a64',
  'hospital': '#0288d1',
  'post office': '#0277bd',
  'miscellaneous': '#90a4ae',
};

export function themeColor(themeDir: string): string {
  return THEME_PALETTE[themeDir] || '#cbd2dc'; // muted gray default
}

// ----- Soft-hyphen substrate -----
// Per Sky+v2 spec: ~30 worst-offending compounds across long-word locales
// (de + sv + fi) get morpheme-segmented soft-hyphen markers. The CSS
// hyphens: auto + word-break: break-word respects U+00AD (soft hyphen).
// Authored at Phase 2; can extend at Arc 2.

export const SOFT_HYPHENS: Record<string, Partial<Record<Locale, string>>> = {
  // air-conditioning
  'air-conditioning': {
    de: 'Klima­anlage',
    sv: 'Luft­konditionering',
    fi: 'Ilmas­tointi',
  },
  // alarm-clock
  'alarm-clock': {
    de: 'Wecker',
    sv: 'Väckar­klocka',
    fi: 'Herätys­kello',
  },
  'analog-clock': {
    de: 'Analog­uhr',
    sv: 'Analog klocka',
    fi: 'Analog­inen kello',
  },
  'angelfish': {
    de: 'Kaiser­fisch',
    sv: 'Ängel­fisk',
    fi: 'Enkeli­kala',
  },
  'allosaurus': {
    de: 'Allo­saurus',
    sv: 'Allo­saurus',
    fi: 'Allo­saurus',
  },
  'ankylosaurus': {
    de: 'Ankylo­saurus',
    sv: 'Ankylo­saurus',
    fi: 'Ankylo­saurus',
  },
  'ambulance': {
    de: 'Kranken­wagen',
    sv: 'Ambu­lans',
    fi: 'Ambu­lanssi',
  },
  'airplane': {
    de: 'Flug­zeug',
    sv: 'Flyg­plan',
    fi: 'Lento­kone',
  },
  'actor': {
    de: 'Schau­spieler',
    sv: 'Skåde­spelare',
    fi: 'Näytte­lijä',
  },
  'strawberry': {
    de: 'Erd­beere',
    sv: 'Jord­gubbe',
    fi: 'Mansik­ka',
  },
  'elephant': {
    de: 'Elefant',
    sv: 'Elefant',
    fi: 'Norsu',
  },
  'hexagon': {
    de: 'Sechs­eck',
    sv: 'Sex­hörning',
    fi: 'Kuusi­kulmio',
  },
  // Long compounds frequently appearing in K-3 vocabulary
  'kindergarten': {
    de: 'Kinder­garten',
    sv: 'Förskole­klass',
    fi: 'Esi­opetus',
  },
  'caterpillar': {
    de: 'Raupe',
    sv: 'Larv',
    fi: 'Touk­ka',
  },
  'butterfly': {
    de: 'Schmetter­ling',
    sv: 'Fjäril',
    fi: 'Perho­nen',
  },
  'firefighter': {
    de: 'Feuer­wehrmann',
    sv: 'Brand­man',
    fi: 'Palo­mies',
  },
  'helicopter': {
    de: 'Hub­schrauber',
    sv: 'Heli­kopter',
    fi: 'Heli­kopteri',
  },
  'refrigerator': {
    de: 'Kühl­schrank',
    sv: 'Kyl­skåp',
    fi: 'Jää­kaappi',
  },
  'rhinoceros': {
    de: 'Nas­horn',
    sv: 'Nos­­hörning',
    fi: 'Sarvi­kuono',
  },
  'hippopotamus': {
    de: 'Fluss­pferd',
    sv: 'Flod­­häst',
    fi: 'Virta­hepo',
  },
  'hairdresser': {
    de: 'Friseur',
    sv: 'Frisör',
    fi: 'Kampaaja',
  },
  'wheelchair': {
    de: 'Roll­stuhl',
    sv: 'Rull­stol',
    fi: 'Pyörä­tuoli',
  },
  'screwdriver': {
    de: 'Schrauben­zieher',
    sv: 'Skruv­mejsel',
    fi: 'Ruuvi­meisseli',
  },
  'pediatrician': {
    de: 'Kinder­ärzt­in',
    sv: 'Barn­läkare',
    fi: 'Lasten­lääkäri',
  },
  'snowman': {
    de: 'Schnee­mann',
    sv: 'Snö­gubbe',
    fi: 'Lumi­ukko',
  },
  'sandcastle': {
    de: 'Sand­burg',
    sv: 'Sand­slott',
    fi: 'Hiekka­linna',
  },
  'paintbrush': {
    de: 'Pinsel',
    sv: 'Mål­arpensel',
    fi: 'Sivellin',
  },
  'lighthouse': {
    de: 'Leucht­turm',
    sv: 'Fyr',
    fi: 'Maja­kka',
  },

  // ===== Arc 2 Phase 1 extension (40 high-impact unique keys × de+sv+fi) =====
  // Curated subset of 416-candidate ≥11ch universe (audit at
  // docs/lesson-plans/flashcard-arc-2-substrate-audit.md). Picks emphasize
  // K-3 frequency + clear morpheme boundaries.
  // NSR-flag (sv + fi entries): native-speaker review pending per §17.5.1
  // Nordic posture. Operator may commission separate NSR pass; functional-
  // fallback acceptable until then (CSS hyphens:auto is the runtime
  // fallback when soft-hyphen entry absent).
  //
  // Occupations (10):
  'nurse': {
    de: 'Kranken­schwester',
    sv: 'Sjuk­sköterska',
    fi: 'Sairaan­hoitaja',
  },
  'librarian': {
    de: 'Biblio­thekar',
    sv: 'Biblio­tekarie',
    fi: 'Kirjaston­hoitaja',
  },
  'dishwasher': {
    de: 'Geschirr­spüler',
    sv: 'Disk­maskin',
    fi: 'Astian­pesu­kone',
  },
  'bus-driver': {
    de: 'Bus­fahrer',
    sv: 'Buss­chaufför',
    fi: 'Linja-auton­kuljettaja',
  },
  'construction-worker': {
    de: 'Bau­arbeiter',
    sv: 'Byggnads­arbetare',
    fi: 'Rakennus­työn­tekijä',
  },
  'flight-attendant': {
    de: 'Flug­begleiter',
    sv: 'Flyg­värdinna',
    fi: 'Lento­emäntä',
  },
  'office-worker': {
    de: 'Büro­angestellter',
    sv: 'Kontors­arbetare',
    fi: 'Toimisto­työn­tekijä',
  },
  'delivery-driver': {
    de: 'Liefer­fahrer',
    sv: 'Leverans­chaufför',
    fi: 'Kuljettaja',
  },
  'lifeguard': {
    de: 'Rettungs­schwimmer',
    sv: 'Liv­räddare',
    fi: 'Hengen­pelastaja',
  },
  'sanitation-worker': {
    de: 'Müllmann',
    sv: 'Renhållnings­arbetare',
    fi: 'Jätehuolto­työn­tekijä',
  },

  // Objects + tools (10):
  'toolbox': {
    de: 'Werkzeug­kasten',
    sv: 'Verktygs­låda',
    fi: 'Työkalu­laatikko',
  },
  'wrench': {
    de: 'Schrauben­schlüssel',
    sv: 'Skift­nyckel',
    fi: 'Jako­avain',
  },
  'desk-lamp': {
    de: 'Schreib­tisch­lampe',
    sv: 'Skriv­bords­lampa',
    fi: 'Työ­pöytä­lamppu',
  },
  'toilet-paper': {
    de: 'Toiletten­papier',
    sv: 'Toalett­papper',
    fi: 'Wc-paperi',
  },
  'shopping-bag': {
    de: 'Einkaufs­tasche',
    sv: 'Shopping­väska',
    fi: 'Ostos­kassi',
  },
  'extension-cord': {
    de: 'Verlängerungs­kabel',
    sv: 'Förlängnings­sladd',
    fi: 'Jatko­johto',
  },
  'remote-control': {
    de: 'Fern­bedienung',
    sv: 'Fjärr­kontroll',
    fi: 'Kauko­säädin',
  },
  'light-switch': {
    de: 'Licht­schalter',
    sv: 'Ström­brytare',
    fi: 'Valo­katkaisin',
  },
  'chandelier': {
    de: 'Kron­leuchter',
    sv: 'Kristall­krona',
    fi: 'Katto­kruunu',
  },
  'computer-keyboard': {
    de: 'Computer­tastatur',
    sv: 'Dator­tangentbord',
    fi: 'Tieto­kone­näppäimistö',
  },

  // Animals (8):
  'centipede': {
    de: 'Tausend­füßler',
    sv: 'Tusen­foting',
    fi: 'Juoksu­jalkainen',
  },
  'canary': {
    de: 'Kanarien­vogel',
    sv: 'Kanarie­fågel',
    fi: 'Kanaria­lintu',
  },
  'kingfisher': {
    de: 'Eis­vogel',
    sv: 'Kungs­fiskare',
    fi: 'Kuningas­kalastaja',
  },
  'cockatiel': {
    de: 'Nymphen­sittich',
    sv: 'Nymf­parakit',
    fi: 'Neito­kakadu',
  },
  'sea-turtle': {
    de: 'Meeres­schildkröte',
    sv: 'Havs­sköldpadda',
    fi: 'Meri­kilpikonna',
  },
  'hermit-crab': {
    de: 'Einsiedler­krebs',
    sv: 'Eremit­kräfta',
    fi: 'Erakko­rapu',
  },
  'komodo-dragon': {
    de: 'Komodo­waran',
    sv: 'Komodo­varan',
    fi: 'Komodon­varaani',
  },
  'scarecrow': {
    de: 'Vogel­scheuche',
    sv: 'Fågel­skrämma',
    fi: 'Linnun­pelätin',
  },

  // Foods (6):
  'gingerbread-man': {
    de: 'Lebkuchen­mann',
    sv: 'Pepparkaks­gubbe',
    fi: 'Piparkakku­ukko',
  },
  'gingerbread-house': {
    de: 'Lebkuchen­haus',
    sv: 'Pepparkaks­hus',
    fi: 'Piparkakku­talo',
  },
  'cheeseburger': {
    de: 'Cheese­burger',
    sv: 'Cheese­burgare',
    fi: 'Juusto­hampurilainen',
  },
  'peanut-butter': {
    de: 'Erdnuss­butter',
    sv: 'Jordnöts­smör',
    fi: 'Maa­pähkinä­voi',
  },
  'dragon-fruit': {
    de: 'Drachen­frucht',
    sv: 'Drak­frukt',
    fi: 'Lohi­käärme­hedelmä',
  },
  'espresso-machine': {
    de: 'Espresso­maschine',
    sv: 'Espresso­maskin',
    fi: 'Espresso­kone',
  },

  // Trees (3) — supports tree-bundle (Pillar 2 Arc 5 Phase 1):
  'chestnut-tree': {
    de: 'Kastanien­baum',
    sv: 'Kastanje­träd',
    fi: 'Kastanja­puu',
  },
  'walnut-tree': {
    de: 'Wal­nuss­baum',
    sv: 'Val­nöts­träd',
    fi: 'Saksan­pähkinä­puu',
  },
  'baobab-tree': {
    de: 'Affen­brot­baum',
    sv: 'Baobab­träd',
    fi: 'Apinan­leipä­puu',
  },

  // Hospital + medical (3):
  'hospital-bed': {
    de: 'Krankenhaus­bett',
    sv: 'Sjukhus­säng',
    fi: 'Sairaala­sänky',
  },
  'hospital-gown': {
    de: 'Krankenhaus­hemd',
    sv: 'Sjukhus­kläder',
    fi: 'Sairaala­takki',
  },
  'medical-chart': {
    de: 'Kranken­akte',
    sv: 'Patient­journal',
    fi: 'Potilas­kertomus',
  },
};

/**
 * Returns word for display, with soft-hyphens applied for long-word locales.
 * Falls back to the raw vocab word if no override exists.
 */
export function displayWord(vocabKey: string, vocab: VocabEntry, locale: Locale): string {
  const entry = vocab[locale] as readonly string[];
  if (!entry) return vocabKey;
  const override = SOFT_HYPHENS[vocabKey]?.[locale];
  return override ?? entry[0];
}
