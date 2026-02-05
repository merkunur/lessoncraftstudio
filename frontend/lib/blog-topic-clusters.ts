/**
 * Blog Topic Cluster Matching
 *
 * Matches each blog post to a relevant educational topic cluster,
 * then selects apps from that cluster for sample display.
 *
 * This replaces the flat keyword-to-app scoring which showed the same
 * ~5 apps on all 112 blog posts because they all share identical keywords.
 */

import { appIdToProduct, type RelatedProduct } from './internal-linking';
import type { SupportedLocale } from '@/config/product-page-slugs';

// ---------------------------------------------------------------------------
// Topic Cluster Definitions
// ---------------------------------------------------------------------------

export interface TopicCluster {
  id: string;
  appIds: string[];
  /** High-confidence keywords (weight +10 each) */
  primaryKeywords: string[];
  /** Supporting keywords (weight +3 each) */
  secondaryKeywords: string[];
}

export const TOPIC_CLUSTERS: TopicCluster[] = [
  {
    id: 'math-arithmetic',
    appIds: ['image-addition', 'subtraction', 'code-addition', 'math-worksheet', 'math-puzzle', 'more-less'],
    primaryKeywords: ['addition', 'subtraction', 'arithmetic', 'cipher', 'calculation', 'math facts', 'number bonds'],
    secondaryKeywords: ['math', 'mathematics', 'compute', 'sum', 'difference', 'equations', 'operations'],
  },
  {
    id: 'counting-numbers',
    appIds: ['find-and-count', 'chart-count-color', 'more-less', 'math-worksheet', 'image-addition'],
    primaryKeywords: ['counting', 'count', 'chart', 'graph', 'tally', 'number sense', 'quantity'],
    secondaryKeywords: ['numbers', 'data', 'compare', 'greater', 'less', 'kindergarten math'],
  },
  {
    id: 'word-games',
    appIds: ['word-search', 'word-scramble', 'word-guess', 'image-crossword', 'image-cryptogram'],
    primaryKeywords: ['word search', 'crossword', 'vocabulary', 'spelling', 'cryptogram', 'word scramble', 'word puzzle'],
    secondaryKeywords: ['words', 'language', 'dictionary', 'phonics', 'decode', 'letters'],
  },
  {
    id: 'writing-literacy',
    appIds: ['writing-app', 'alphabet-train', 'story-dice', 'prepositions', 'drawing-lines'],
    primaryKeywords: ['writing', 'handwriting', 'alphabet', 'literacy', 'letter formation', 'story', 'narrative'],
    secondaryKeywords: ['tracing', 'penmanship', 'creative writing', 'grammar', 'preposition', 'sentence'],
  },
  {
    id: 'visual-perception',
    appIds: ['shadow-match', 'find-objects', 'missing-pieces', 'odd-one-out', 'picture-path', 'big-small-app'],
    primaryKeywords: ['visual perception', 'visual discrimination', 'shadow', 'hidden objects', 'frostig', 'spatial'],
    secondaryKeywords: ['observation', 'perception', 'figure-ground', 'constancy', 'visual memory', 'eye training'],
  },
  {
    id: 'logic-patterns',
    appIds: ['sudoku', 'pattern-worksheet', 'pattern-train', 'picture-sort', 'odd-one-out', 'image-cryptogram'],
    primaryKeywords: ['sudoku', 'pattern', 'logic', 'sequence', 'sorting', 'critical thinking', 'problem solving'],
    secondaryKeywords: ['puzzle', 'classify', 'categorize', 'reasoning', 'order', 'series'],
  },
  {
    id: 'art-motor-skills',
    appIds: ['coloring', 'draw-and-color', 'drawing-lines', 'picture-path', 'writing-app'],
    primaryKeywords: ['coloring', 'drawing', 'fine motor', 'motor skills', 'tracing', 'art', 'craft'],
    secondaryKeywords: ['color', 'pencil', 'grip', 'dexterity', 'hand-eye', 'coordination', 'creative'],
  },
  {
    id: 'games-activities',
    appIds: ['picture-bingo', 'treasure-hunt', 'matching-app', 'story-dice', 'grid-match'],
    primaryKeywords: ['bingo', 'treasure hunt', 'game', 'kinesthetic', 'movement', 'scavenger'],
    secondaryKeywords: ['play', 'activity', 'fun', 'interactive', 'engage', 'physical', 'group'],
  },
  {
    id: 'early-childhood',
    appIds: ['alphabet-train', 'coloring', 'matching-app', 'drawing-lines', 'big-small-app', 'find-and-count'],
    primaryKeywords: ['pre-k', 'preschool', 'toddler', 'ages 3', 'ages 4', 'early childhood', 'readiness'],
    secondaryKeywords: ['kindergarten', 'foundational', 'beginner', 'introduction', 'first', 'basic skills'],
  },
  {
    id: 'seasonal-thematic',
    appIds: ['coloring', 'word-search', 'picture-bingo', 'treasure-hunt', 'matching-app'],
    primaryKeywords: ['seasonal', 'holiday', 'christmas', 'halloween', 'spring', 'summer', 'winter', 'autumn'],
    secondaryKeywords: ['themed', 'celebration', 'festival', 'year-round', 'occasion', 'thematic'],
  },
];

// ---------------------------------------------------------------------------
// Multilingual cluster keyword translations
// ---------------------------------------------------------------------------

/**
 * Maps locale -> cluster keywords (primary+secondary) in that language.
 * Only needs the high-value primary keywords; secondary are optional.
 */
export const CLUSTER_KEYWORD_TRANSLATIONS: Record<string, Record<string, string[]>> = {
  de: {
    'math-arithmetic': ['addition', 'subtraktion', 'rechnen', 'rechenaufgaben', 'kopfrechnen', 'zahlenverbindungen'],
    'counting-numbers': ['z\u00e4hlen', 'diagramm', 'zahlen', 'mengenlehre'],
    'word-games': ['wortsuche', 'kreuzwortr\u00e4tsel', 'wortschatz', 'rechtschreibung', 'buchstabenr\u00e4tsel'],
    'writing-literacy': ['schreiben', 'handschrift', 'alphabet', 'buchstaben', 'geschichte', 'erz\u00e4hlung'],
    'visual-perception': ['visuelle wahrnehmung', 'schatten', 'versteckte objekte', 'frostig', 'r\u00e4umlich'],
    'logic-patterns': ['sudoku', 'muster', 'logik', 'reihenfolge', 'sortieren', 'r\u00e4tsel'],
    'art-motor-skills': ['ausmalen', 'malen', 'zeichnen', 'feinmotorik', 'basteln', 'kunst'],
    'games-activities': ['bingo', 'schatzsuche', 'spiel', 'bewegung', 'kin\u00e4sthetisch'],
    'early-childhood': ['vorschule', 'kindergarten', 'kleinkind', 'fr\u00fchkindlich'],
    'seasonal-thematic': ['jahreszeitlich', 'weihnachten', 'halloween', 'fr\u00fchling', 'sommer', 'winter', 'herbst'],
  },
  fr: {
    'math-arithmetic': ['addition', 'soustraction', 'calcul', 'op\u00e9rations', 'chiffrement'],
    'counting-numbers': ['compter', 'graphique', 'nombres', 'quantit\u00e9'],
    'word-games': ['mots cach\u00e9s', 'mots crois\u00e9s', 'vocabulaire', 'orthographe'],
    'writing-literacy': ['\u00e9criture', 'alphabet', 'lettres', 'histoire', 'r\u00e9cit'],
    'visual-perception': ['perception visuelle', 'ombre', 'objets cach\u00e9s', 'frostig', 'spatial'],
    'logic-patterns': ['sudoku', 'motif', 'logique', 's\u00e9quence', 'tri'],
    'art-motor-skills': ['coloriage', 'dessin', 'motricit\u00e9 fine', 'art', 'bricolage'],
    'games-activities': ['bingo', 'chasse au tr\u00e9sor', 'jeu', 'mouvement'],
    'early-childhood': ['maternelle', 'pr\u00e9scolaire', 'tout-petit', 'petite enfance'],
    'seasonal-thematic': ['saisonnier', 'no\u00ebl', 'halloween', 'printemps', '\u00e9t\u00e9', 'hiver', 'automne'],
  },
  es: {
    'math-arithmetic': ['suma', 'resta', 'aritm\u00e9tica', 'c\u00e1lculo', 'operaciones'],
    'counting-numbers': ['contar', 'gr\u00e1fico', 'n\u00fameros', 'cantidad'],
    'word-games': ['sopa de letras', 'crucigrama', 'vocabulario', 'ortograf\u00eda'],
    'writing-literacy': ['escritura', 'alfabeto', 'letras', 'historia', 'narrativa'],
    'visual-perception': ['percepci\u00f3n visual', 'sombra', 'objetos ocultos', 'espacial'],
    'logic-patterns': ['sudoku', 'patr\u00f3n', 'l\u00f3gica', 'secuencia', 'clasificaci\u00f3n'],
    'art-motor-skills': ['colorear', 'dibujo', 'motricidad fina', 'arte', 'manualidades'],
    'games-activities': ['bingo', 'b\u00fasqueda del tesoro', 'juego', 'movimiento'],
    'early-childhood': ['preescolar', 'jard\u00edn de infantes', 'primera infancia'],
    'seasonal-thematic': ['estacional', 'navidad', 'halloween', 'primavera', 'verano', 'invierno', 'oto\u00f1o'],
  },
  pt: {
    'math-arithmetic': ['adi\u00e7\u00e3o', 'subtra\u00e7\u00e3o', 'aritm\u00e9tica', 'c\u00e1lculo', 'opera\u00e7\u00f5es'],
    'counting-numbers': ['contar', 'gr\u00e1fico', 'n\u00fameros', 'quantidade'],
    'word-games': ['sopa de letras', 'palavras cruzadas', 'vocabul\u00e1rio', 'ortografia'],
    'writing-literacy': ['escrita', 'alfabeto', 'letras', 'hist\u00f3ria', 'narrativa'],
    'visual-perception': ['percep\u00e7\u00e3o visual', 'sombra', 'objetos escondidos', 'espacial'],
    'logic-patterns': ['sudoku', 'padr\u00e3o', 'l\u00f3gica', 'sequ\u00eancia', 'classifica\u00e7\u00e3o'],
    'art-motor-skills': ['colorir', 'desenho', 'motricidade fina', 'arte', 'artesanato'],
    'games-activities': ['bingo', 'ca\u00e7a ao tesouro', 'jogo', 'movimento'],
    'early-childhood': ['pr\u00e9-escolar', 'educa\u00e7\u00e3o infantil', 'primeira inf\u00e2ncia'],
    'seasonal-thematic': ['sazonal', 'natal', 'halloween', 'primavera', 'ver\u00e3o', 'inverno', 'outono'],
  },
  it: {
    'math-arithmetic': ['addizione', 'sottrazione', 'aritmetica', 'calcolo', 'operazioni'],
    'counting-numbers': ['contare', 'grafico', 'numeri', 'quantit\u00e0'],
    'word-games': ['crucipuzzle', 'cruciverba', 'vocabolario', 'ortografia'],
    'writing-literacy': ['scrittura', 'alfabeto', 'lettere', 'storia', 'narrativa'],
    'visual-perception': ['percezione visiva', 'ombra', 'oggetti nascosti', 'spaziale'],
    'logic-patterns': ['sudoku', 'schema', 'logica', 'sequenza', 'classificazione'],
    'art-motor-skills': ['colorare', 'disegno', 'motricit\u00e0 fine', 'arte'],
    'games-activities': ['bingo', 'caccia al tesoro', 'gioco', 'movimento'],
    'early-childhood': ['prescolare', 'scuola materna', 'prima infanzia'],
    'seasonal-thematic': ['stagionale', 'natale', 'halloween', 'primavera', 'estate', 'inverno', 'autunno'],
  },
  nl: {
    'math-arithmetic': ['optellen', 'aftrekken', 'rekenen', 'berekeningen', 'sommen'],
    'counting-numbers': ['tellen', 'grafiek', 'getallen', 'hoeveelheid'],
    'word-games': ['woordzoeker', 'kruiswoordpuzzel', 'woordenschat', 'spelling'],
    'writing-literacy': ['schrijven', 'handschrift', 'alfabet', 'letters', 'verhaal'],
    'visual-perception': ['visuele waarneming', 'schaduw', 'verborgen voorwerpen', 'ruimtelijk'],
    'logic-patterns': ['sudoku', 'patroon', 'logica', 'volgorde', 'sorteren'],
    'art-motor-skills': ['kleuren', 'tekenen', 'fijne motoriek', 'kunst', 'knutselen'],
    'games-activities': ['bingo', 'schattenjacht', 'spel', 'beweging'],
    'early-childhood': ['kleuterschool', 'voorschool', 'peuter', 'vroege kinderjaren'],
    'seasonal-thematic': ['seizoensgebonden', 'kerst', 'halloween', 'lente', 'zomer', 'winter', 'herfst'],
  },
  sv: {
    'math-arithmetic': ['addition', 'subtraktion', 'r\u00e4kna', 'ber\u00e4kning', 'aritmetik'],
    'counting-numbers': ['r\u00e4kning', 'diagram', 'tal', 'antal'],
    'word-games': ['ordletare', 'korsord', 'ordf\u00f6rr\u00e5d', 'stavning'],
    'writing-literacy': ['skrivning', 'handstil', 'alfabet', 'bokst\u00e4ver', 'ber\u00e4ttelse'],
    'visual-perception': ['visuell perception', 'skugga', 'g\u00f6mda f\u00f6rem\u00e5l', 'rumslig'],
    'logic-patterns': ['sudoku', 'm\u00f6nster', 'logik', 'sekvens', 'sortering'],
    'art-motor-skills': ['f\u00e4rgl\u00e4ggning', 'rita', 'finmotorik', 'konst'],
    'games-activities': ['bingo', 'skattjakt', 'spel', 'r\u00f6relse'],
    'early-childhood': ['f\u00f6rskola', 'sm\u00e5barn', 'tidig barndom'],
    'seasonal-thematic': ['s\u00e4songsbetonad', 'jul', 'halloween', 'v\u00e5r', 'sommar', 'vinter', 'h\u00f6st'],
  },
  da: {
    'math-arithmetic': ['addition', 'subtraktion', 'regne', 'beregning', 'aritmetik'],
    'counting-numbers': ['t\u00e6lle', 'diagram', 'tal', 'antal'],
    'word-games': ['ords\u00f8gning', 'krydsordsopgave', 'ordforr\u00e5d', 'stavning'],
    'writing-literacy': ['skrivning', 'h\u00e5ndskrift', 'alfabet', 'bogstaver', 'fort\u00e6lling'],
    'visual-perception': ['visuel perception', 'skygge', 'gemte genstande', 'rumlig'],
    'logic-patterns': ['sudoku', 'm\u00f8nster', 'logik', 'sekvens', 'sortering'],
    'art-motor-skills': ['farvel\u00e6gning', 'tegne', 'finmotorik', 'kunst'],
    'games-activities': ['bingo', 'skattejagt', 'spil', 'bev\u00e6gelse'],
    'early-childhood': ['b\u00f8rnehave', 'sm\u00e5b\u00f8rn', 'tidlig barndom'],
    'seasonal-thematic': ['s\u00e6sonbetonet', 'jul', 'halloween', 'for\u00e5r', 'sommer', 'vinter', 'efter\u00e5r'],
  },
  no: {
    'math-arithmetic': ['addisjon', 'subtraksjon', 'regne', 'beregning', 'aritmetikk'],
    'counting-numbers': ['telle', 'diagram', 'tall', 'antall'],
    'word-games': ['ords\u00f8king', 'kryssord', 'ordforr\u00e5d', 'staving'],
    'writing-literacy': ['skriving', 'h\u00e5ndskrift', 'alfabet', 'bokstaver', 'fortelling'],
    'visual-perception': ['visuell persepsjon', 'skygge', 'gjemte gjenstander', 'romlig'],
    'logic-patterns': ['sudoku', 'm\u00f8nster', 'logikk', 'sekvens', 'sortering'],
    'art-motor-skills': ['fargelegging', 'tegne', 'finmotorikk', 'kunst'],
    'games-activities': ['bingo', 'skattejakt', 'spill', 'bevegelse'],
    'early-childhood': ['barnehage', 'sm\u00e5barn', 'tidlig barndom'],
    'seasonal-thematic': ['sesongbasert', 'jul', 'halloween', 'v\u00e5r', 'sommer', 'vinter', 'h\u00f8st'],
  },
  fi: {
    'math-arithmetic': ['yhteenlasku', 'v\u00e4hennyslasku', 'laskea', 'laskeminen', 'aritmetiikka'],
    'counting-numbers': ['laskeminen', 'kaavio', 'numerot', 'm\u00e4\u00e4r\u00e4'],
    'word-games': ['sanaristikko', 'ristikko', 'sanasto', 'oikeinkirjoitus'],
    'writing-literacy': ['kirjoitus', 'k\u00e4siala', 'aakkoset', 'kirjaimet', 'tarina'],
    'visual-perception': ['visuaalinen havainto', 'varjo', 'piilotetut esineet', 'spatiaalinen'],
    'logic-patterns': ['sudoku', 'kuvio', 'logiikka', 'sekvenssi', 'lajittelu'],
    'art-motor-skills': ['v\u00e4ritt\u00e4minen', 'piirt\u00e4minen', 'hienomotoriikka', 'taide'],
    'games-activities': ['bingo', 'aarteenmets\u00e4stys', 'peli', 'liike'],
    'early-childhood': ['esikoulu', 'taapero', 'varhaiskasvatuksen'],
    'seasonal-thematic': ['kausiluonteinen', 'joulu', 'halloween', 'kev\u00e4t', 'kes\u00e4', 'talvi', 'syksy'],
  },
};

// ---------------------------------------------------------------------------
// Noise words to strip from matching input
// ---------------------------------------------------------------------------

const NOISE_WORDS = new Set([
  'free', 'worksheets', 'worksheet', 'complete', 'guide', 'teaching',
  'teachers', 'teacher', 'printable', 'download', 'pdf', 'educational',
  'education', 'classroom', 'school', 'student', 'students', 'children',
  'kids', 'child', 'learning', 'learn', 'the', 'and', 'for', 'with',
  'how', 'to', 'of', 'in', 'on', 'at', 'from', 'by', 'an', 'a',
  'that', 'this', 'your', 'their', 'our', 'are', 'is', 'was', 'were',
  'has', 'have', 'had', 'be', 'been', 'being', 'do', 'does', 'did',
  'will', 'would', 'can', 'could', 'should', 'may', 'might',
  'create', 'creating', 'make', 'making', 'using', 'use', 'best',
  'top', 'ultimate', 'comprehensive', 'essential', 'effective',
  'tools', 'tool', 'resource', 'resources', 'activity', 'activities',
  'generator', 'generators', 'ages',
]);

// ---------------------------------------------------------------------------
// Matching algorithm
// ---------------------------------------------------------------------------

interface ClusterMatch {
  cluster: TopicCluster;
  score: number;
}

/**
 * Normalize text for matching: lowercase, strip noise, split into tokens.
 */
function normalizeText(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s\-]/g, ' ')
    .split(/[\s\-]+/)
    .filter(w => w.length > 1 && !NOISE_WORDS.has(w));
}

/**
 * Build a combined search string from title + slug + focusKeyword tokens.
 */
function buildSearchTokens(title: string, slug: string, focusKeyword?: string): string[] {
  const tokens: string[] = [];
  tokens.push(...normalizeText(title));
  tokens.push(...normalizeText(slug));
  if (focusKeyword) {
    tokens.push(...normalizeText(focusKeyword));
  }
  return tokens;
}

/**
 * Check if a multi-word keyword phrase appears in a token list.
 * For single-word keywords, checks token membership.
 * For multi-word keywords, checks if all words appear in the tokens.
 */
function keywordMatchesTokens(keyword: string, tokens: string[]): boolean {
  const kwParts = keyword.toLowerCase().split(/[\s\-]+/).filter(w => w.length > 1);
  if (kwParts.length === 0) return false;
  return kwParts.every(part => tokens.some(t => t === part || t.includes(part)));
}

/**
 * Match a blog post to the best topic cluster.
 *
 * @param title - Blog post title (English)
 * @param slug - Blog post slug
 * @param focusKeyword - SEO focus keyword (optional)
 * @param locale - Current locale (for localized keyword matching)
 * @returns The best-matching cluster and its score, or null if no confident match
 */
export function matchBlogToCluster(
  title: string,
  slug: string,
  focusKeyword?: string,
  locale: string = 'en'
): ClusterMatch | null {
  const titleTokens = normalizeText(title);
  const slugTokens = normalizeText(slug);
  const focusTokens = focusKeyword ? normalizeText(focusKeyword) : [];
  const allTokens = [...titleTokens, ...slugTokens, ...focusTokens];

  let bestMatch: ClusterMatch | null = null;

  for (const cluster of TOPIC_CLUSTERS) {
    let score = 0;

    // Score English primary keywords (weight: +10, title 2x)
    for (const kw of cluster.primaryKeywords) {
      if (keywordMatchesTokens(kw, titleTokens)) {
        score += 20; // title match = 2x
      } else if (keywordMatchesTokens(kw, slugTokens)) {
        score += 10;
      } else if (keywordMatchesTokens(kw, focusTokens)) {
        score += 10;
      }
    }

    // Score English secondary keywords (weight: +3, title 2x)
    for (const kw of cluster.secondaryKeywords) {
      if (keywordMatchesTokens(kw, titleTokens)) {
        score += 6; // title match = 2x
      } else if (keywordMatchesTokens(kw, allTokens)) {
        score += 3;
      }
    }

    // Score localized keywords if not English
    if (locale !== 'en') {
      const localizedKeywords = CLUSTER_KEYWORD_TRANSLATIONS[locale]?.[cluster.id];
      if (localizedKeywords) {
        for (const kw of localizedKeywords) {
          if (keywordMatchesTokens(kw, titleTokens)) {
            score += 15; // localized title match
          } else if (keywordMatchesTokens(kw, allTokens)) {
            score += 8;
          }
        }
      }
    }

    // Bonus: direct app name in slug (e.g., "word-search-generator" slug)
    for (const appId of cluster.appIds) {
      if (slug.includes(appId)) {
        score += 25; // strong signal: slug contains app name
      }
    }

    if (score > 0 && (!bestMatch || score > bestMatch.score)) {
      bestMatch = { cluster, score };
    }
  }

  // Minimum threshold for a confident match
  if (bestMatch && bestMatch.score >= 5) {
    return bestMatch;
  }

  return null;
}

// ---------------------------------------------------------------------------
// App selection
// ---------------------------------------------------------------------------

/**
 * Deterministic hash for consistent selection across requests.
 */
function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash + str.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

/**
 * Select apps from a cluster deterministically based on blog slug.
 * Rotates the starting position so different blog posts get different apps.
 *
 * @param cluster - The matched topic cluster
 * @param blogSlug - The blog post slug (used for deterministic rotation)
 * @param maxApps - Maximum number of apps to return (default: 3)
 * @returns Array of app IDs
 */
export function selectAppsFromCluster(
  cluster: TopicCluster,
  blogSlug: string,
  maxApps: number = 3
): string[] {
  const apps = cluster.appIds;
  if (apps.length <= maxApps) return [...apps];

  const offset = simpleHash(blogSlug) % apps.length;
  const selected: string[] = [];
  for (let i = 0; i < maxApps; i++) {
    selected.push(apps[(offset + i) % apps.length]);
  }
  return selected;
}

/**
 * Get a fallback cluster for posts that don't match any cluster.
 * Uses slug hash to distribute generic posts across different clusters,
 * ensuring variety rather than always showing the same apps.
 *
 * @param slug - The blog post slug
 * @returns A topic cluster (rotated deterministically)
 */
export function getFallbackCluster(slug: string): TopicCluster {
  const idx = simpleHash(slug) % TOPIC_CLUSTERS.length;
  return TOPIC_CLUSTERS[idx];
}

// ---------------------------------------------------------------------------
// High-level API used by blog page
// ---------------------------------------------------------------------------

export interface BlogSampleMatch {
  appId: string;
  productUrl: string;
  productName: string;
}

/**
 * Get matched apps for a blog post, ready for sample discovery.
 *
 * @param title - English title of the blog post
 * @param slug - Blog post slug
 * @param focusKeyword - SEO focus keyword
 * @param locale - Current locale
 * @param maxApps - Max number of apps (default: 3)
 * @returns Array of matched app info with product URLs/names
 */
export function getBlogSampleApps(
  title: string,
  slug: string,
  focusKeyword: string | undefined,
  locale: SupportedLocale,
  maxApps: number = 3
): BlogSampleMatch[] {
  // Step 1: Match to cluster
  const match = matchBlogToCluster(title, slug, focusKeyword, locale);
  const cluster = match ? match.cluster : getFallbackCluster(slug);

  // Step 2: Select apps from cluster
  const appIds = selectAppsFromCluster(cluster, slug, maxApps);

  // Step 3: Resolve to products
  const results: BlogSampleMatch[] = [];
  for (const appId of appIds) {
    const product = appIdToProduct(appId, locale);
    if (product) {
      results.push({
        appId: product.appId,
        productUrl: product.url,
        productName: product.name,
      });
    }
  }

  return results;
}
