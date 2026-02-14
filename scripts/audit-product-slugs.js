/**
 * Part 16: Audit Product Page Slug Completeness
 *
 * Validates product page slug configuration and hreflang consistency.
 * After Part 17 unification, both sitemap.ts and page.tsx use
 * getAlternateUrls() from product-page-slugs.ts as the single source of truth.
 *
 * 5 checks performed:
 *   1. SLUG_COMPLETENESS  - Every app has a non-empty slug for all 11 locales
 *   2. LANGUAGE_CORRECT   - Each slug appears to be in the correct language
 *   3. NO_COLLISIONS      - No two apps share the same slug within a locale
 *   4. SITEMAP_HTML_PARITY - getAlternateUrls produces correct URLs for every app x locale
 *   5. CONTENT_COVERAGE    - Every app x locale has a content file with seo.slug
 *
 * Usage (run from frontend directory):
 *   cd /opt/lessoncraftstudio/frontend
 *   NODE_PATH=./node_modules node ../scripts/audit-product-slugs.js
 *
 * Exit code: 0 = clean, 1 = issues found
 */

const path = require('path');

// ---------------------------------------------------------------------------
// Bootstrap ts-node so we can require .ts config files
// ---------------------------------------------------------------------------
require('ts-node').register({
  transpileOnly: true,
  skipProject: true,
  compilerOptions: {
    module: 'commonjs',
    moduleResolution: 'node',
    jsx: 'react-jsx',
    esModuleInterop: true,
    strict: false,
  },
});
require('tsconfig-paths').register({
  baseUrl: path.join(__dirname, '..', 'frontend'),
  paths: { '@/*': ['./*'] },
});

// ---------------------------------------------------------------------------
// Imports from the actual codebase
// ---------------------------------------------------------------------------
const {
  productPageSlugs,
  getAlternateUrls,
  SUPPORTED_LOCALES: SLUG_LOCALES,
} = require('../frontend/config/product-page-slugs');

const {
  contentRegistry,
  getContentByAppId,
} = require('../frontend/config/product-page-content');

const { getHreflangCode, hreflangMap } = require('../frontend/lib/schema-generator');

const { SUPPORTED_LOCALES } = require('../frontend/config/locales');

// ---------------------------------------------------------------------------
// Slug language profiles (heuristic word lists for language detection)
// Slugs are ASCII, hyphenated, transliterated. These contain distinctive
// locale-specific words commonly found in product page slugs.
// ---------------------------------------------------------------------------
const SLUG_LANG_PROFILES = {
  en: ['worksheets', 'worksheet', 'and', 'for', 'the', 'with', 'find', 'draw', 'color',
       'match', 'count', 'sort', 'search', 'guess', 'writing', 'train', 'hunt',
       'missing', 'pieces', 'pattern', 'picture', 'big', 'small', 'more', 'less',
       'odd', 'one', 'out', 'grid', 'code', 'chart', 'path', 'objects', 'lines',
       'bingo', 'sudoku', 'treasure', 'shadow', 'scramble', 'crossword', 'cryptogram',
       'addition', 'subtraction', 'math', 'puzzle', 'prepositions'],
  de: ['arbeitsblaetter', 'arbeitsblatt', 'und', 'zaehlen', 'suchen', 'gross', 'klein',
       'mehr', 'weniger', 'muster', 'bilder', 'ziehen', 'linien', 'sortieren',
       'kinder', 'raster', 'schatzsuche', 'schattenbilder', 'zuordnen', 'buchstabensalat',
       'woerter', 'raten', 'schreibuebungen', 'malvorlagen', 'fehlende', 'puzzleteile',
       'zug', 'raetsel', 'mathe', 'bilddiagramm', 'praepositionen', 'subtraktion',
       'addition', 'bilderkreuzwortraetsel', 'bildkryptogramm', 'suchbilder'],
  fr: ['fiches', 'fiche', 'cherche', 'compte', 'images', 'mots', 'grand', 'petit',
       'dessin', 'quadrillage', 'pieces', 'manquantes', 'comparaison', 'quantites',
       'intrus', 'train', 'suites', 'logiques', 'parcours', 'tri', 'prepositions',
       'discrimination', 'visuelle', 'soustraction', 'addition', 'chasse', 'tresor',
       'deviner', 'ecriture', 'coloriage', 'melanges', 'caches', 'codee',
       'graphique', 'puzzle', 'grille', 'croises', 'cryptogramme', 'graphisme',
       'bingo', 'sudoku', 'enfants', 'association', 'exercices', 'maths', 'sequences'],
  es: ['fichas', 'ficha', 'buscar', 'contar', 'grande', 'pequeno', 'mayor', 'menor',
       'dibujo', 'cuadricula', 'piezas', 'faltantes', 'encuentra', 'diferente',
       'tren', 'patrones', 'laberintos', 'clasificar', 'preposiciones', 'asociacion',
       'sombras', 'resta', 'suma', 'busqueda', 'tesoro', 'adivinar', 'palabras',
       'lectoescritura', 'dibujos', 'colorear', 'letras', 'revueltas', 'codigo',
       'graficos', 'conteo', 'rompecabezas', 'crucigramas', 'criptogramas',
       'grafomotricidad', 'bingo', 'sudoku', 'ninos', 'acertijos', 'matematicos',
       'sopa', 'alfabeto', 'relacionar', 'imagenes'],
  it: ['schede', 'scheda', 'trova', 'conta', 'grande', 'piccolo', 'confronto', 'numeri',
       'disegno', 'griglia', 'pezzi', 'mancanti', 'intruso', 'treno', 'sequenze',
       'percorso', 'illustrato', 'classificazione', 'preposizioni', 'abbinamento',
       'ombre', 'sottrazione', 'addizione', 'caccia', 'tesoro', 'indovina', 'parole',
       'scrittura', 'disegni', 'colorare', 'anagrammi', 'immagini', 'addizioni',
       'grafici', 'puzzle', 'matematici', 'cruciverba', 'crittogramma', 'pregrafismo',
       'bambini', 'abbinamenti', 'cerca', 'oggetti'],
  pt: ['fichas', 'ficha', 'encontre', 'conte', 'grande', 'pequeno', 'maior', 'menor',
       'desenho', 'grade', 'pecas', 'faltantes', 'diferente', 'trem', 'padroes',
       'labirinto', 'caminhos', 'classificacao', 'preposicoes', 'combinar', 'sombras',
       'subtracao', 'adicao', 'caca', 'tesouro', 'adivinhar', 'palavras', 'caligrafia',
       'desenhos', 'colorir', 'embaralhadas', 'codigo', 'pictorico', 'grafico',
       'quebra', 'cabeca', 'cruzadas', 'criptograma', 'tracar', 'linhas',
       'bingo', 'ilustrado', 'sudoku', 'criancas', 'ligar', 'encontrar', 'objetos',
       'sequencias', 'matematica', 'atividades'],
  nl: ['werkbladen', 'werkblad', 'zoek', 'tel', 'groot', 'klein', 'meer', 'minder',
       'lijnen', 'trekken', 'ontbrekende', 'puzzelstukjes', 'welke', 'hoort', 'niet',
       'patroontrein', 'patronen', 'doolhof', 'sorteer', 'voorzetsels', 'schaduw',
       'matching', 'aftrekken', 'optellen', 'schattenjacht', 'woordraadsel',
       'schrijfoefeningen', 'kleurplaten', 'woordkruisel', 'visuele', 'optelsommen',
       'telgrafieken', 'raster', 'puzzel', 'kruiswoordpuzzel', 'cryptogram',
       'rastertekenen', 'plaatjes', 'sudoku', 'woordzoeker', 'alfabet', 'trein',
       'verbindings', 'voorwerpen', 'bildsortering'],
  sv: ['arbetsblad', 'hitta', 'rakna', 'stort', 'litet', 'jamforelse', 'rita',
       'linjer', 'saknade', 'bitar', 'udda', 'bilden', 'monster', 'tag',
       'bildlabyrint', 'bildsortering', 'prepositioner', 'skuggmatchning',
       'subtraktion', 'skattjakt', 'gissa', 'ordet', 'skrivovningar',
       'malarbilder', 'ordpussel', 'kodaddition', 'diagram', 'rakning',
       'rutnatsmatching', 'bildkorsord', 'bildkryptogram', 'rutritning',
       'mattepussel', 'bildsudoku', 'bildlotto', 'ordletar', 'alfabettag',
       'matchnings', 'foremal', 'addition'],
  da: ['arbejdsark', 'find', 'tael', 'stor', 'lille', 'sammenligningsopgaver',
       'linjetraening', 'manglende', 'brikker', 'ulige', 'moenstertog', 'moenstre',
       'billedsti', 'billedsortering', 'praepositioner', 'skygge', 'match',
       'subtraktion', 'skattejagt', 'gaet', 'ordet', 'skriveopgaver', 'malebog',
       'bogstavblanding', 'kode', 'plusstykker', 'billediagram', 'raster',
       'puslespil', 'krydsord', 'kryptogram', 'tegn', 'farvelaeg',
       'matteleger', 'sudoku', 'bingo', 'alfabet', 'tog', 'matchning',
       'objekterne', 'addition', 'matematikopgaver'],
  no: ['arbeidsark', 'finn', 'tell', 'stor', 'liten', 'sammenligningsoppgaver',
       'tegning', 'linjer', 'manglende', 'biter', 'ulike', 'monstertog',
       'monsteroppgaver', 'bildesti', 'bildesortering', 'preposisjoner',
       'skyggematching', 'subtraksjon', 'skattejakt', 'gjetteoppgaver',
       'skriveark', 'fargeleggingsbilder', 'bokstavoppgaver', 'bildeaddisjon',
       'bildediagram', 'rutenett', 'tilpasning', 'bildekryssord', 'kryptogram',
       'rutenetttegning', 'matematikkgater', 'sudoku', 'bildlotto', 'ordsoek',
       'alfabet', 'tog', 'kobling', 'objektene', 'addisjon', 'matematikk',
       'oppgaver'],
  fi: ['tyoarkit', 'tyoarkit', 'etsi', 'laske', 'iso', 'pieni', 'enemman',
       'vahemman', 'viivojen', 'piirtaminen', 'puuttuvat', 'palat', 'poikkea',
       'joukosta', 'kuviojuna', 'kuviotehtava', 'kuvapolku', 'kuvalajittelu',
       'prepositio', 'varjoyhdistely', 'vahennyslasku', 'aarteenetsinta',
       'kuva', 'arvaus', 'kasinkirjoitus', 'varityskuvat', 'sanansekoitus',
       'yhteenlasku', 'kuvakaavio', 'ruudukko', 'sovitus', 'ristisanatehtavat',
       'kuvakryptogrammi', 'ruudukkopiirustus', 'matematiikkapulmat',
       'sudoku', 'bingo', 'sananhaku', 'aakkosjuna', 'yhdista', 'parit',
       'esineet', 'matematiikka'],
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Related language groups — languages that share too much slug vocabulary
 * for heuristic detection to reliably distinguish between them.
 * If the detected language is in the same group as the expected locale,
 * we don't flag it as a mismatch.
 */
const RELATED_LANG_GROUPS = [
  ['es', 'pt', 'it'],   // Romance languages share fichas/grande/pequeno etc.
  ['da', 'no', 'sv'],   // Scandinavian languages share many root words
];

function areRelatedLanguages(a, b) {
  return RELATED_LANG_GROUPS.some(group => group.includes(a) && group.includes(b));
}

/**
 * Heuristic language check for a slug.
 * Splits slug on hyphens and counts matching words from each language profile.
 * Returns the locale with the most matches, or null if no match.
 */
function detectSlugLanguage(slug) {
  const words = slug.split('-');
  let bestLocale = null;
  let bestScore = 0;

  for (const [locale, profile] of Object.entries(SLUG_LANG_PROFILES)) {
    const score = words.filter(w => profile.includes(w)).length;
    if (score > bestScore) {
      bestScore = score;
      bestLocale = locale;
    }
  }

  return bestScore > 0 ? bestLocale : null;
}

/**
 * Build a map from slugConfig.appId -> content seo.appId
 * by matching via the English slug.
 */
function buildAppIdBridge() {
  const bridge = {}; // slugConfigAppId -> contentAppId

  for (const config of productPageSlugs) {
    const enSlug = config.slugs.en;
    if (!enSlug) continue;

    // Look up this slug in the English content registry
    const enContent = contentRegistry.en?.[enSlug];
    if (enContent?.seo?.appId) {
      bridge[config.appId] = enContent.seo.appId;
    }
  }

  return bridge;
}

// ---------------------------------------------------------------------------
// Checks
// ---------------------------------------------------------------------------

const issues = [];

function addIssue(check, appId, locale, message) {
  issues.push({ check, appId, locale: locale || '-', message });
}

// ---- Check 1: Slug completeness ----
function checkSlugCompleteness() {
  let checked = 0;
  for (const config of productPageSlugs) {
    for (const locale of SUPPORTED_LOCALES) {
      checked++;
      const slug = config.slugs[locale];
      if (!slug || slug.trim() === '') {
        addIssue('SLUG_COMPLETENESS', config.appId, locale,
          `Missing slug for locale "${locale}"`);
      }
    }
  }
  return checked;
}

// ---- Check 2: Language correctness ----
function checkLanguageCorrectness() {
  let checked = 0;
  for (const config of productPageSlugs) {
    for (const locale of SUPPORTED_LOCALES) {
      const slug = config.slugs[locale];
      if (!slug) continue;
      checked++;

      const detected = detectSlugLanguage(slug);
      if (detected && detected !== locale) {
        // Skip closely related languages (pt/es/it, da/no/sv) — too much shared vocabulary
        if (areRelatedLanguages(detected, locale)) continue;

        // Skip very short slugs (1-2 words) as detection is unreliable
        const words = slug.split('-');
        if (words.length < 3) continue;

        addIssue('LANGUAGE_CORRECT', config.appId, locale,
          `Slug "${slug}" looks like "${detected}" (expected "${locale}")`);
      }
    }
  }
  return checked;
}

// ---- Check 3: No collisions ----
function checkNoCollisions() {
  let checked = 0;
  for (const locale of SUPPORTED_LOCALES) {
    const slugToApp = {};
    for (const config of productPageSlugs) {
      const slug = config.slugs[locale];
      if (!slug) continue;
      checked++;

      if (slugToApp[slug]) {
        addIssue('NO_COLLISIONS', config.appId, locale,
          `Slug "${slug}" also used by "${slugToApp[slug]}"`);
        addIssue('NO_COLLISIONS', slugToApp[slug], locale,
          `Slug "${slug}" also used by "${config.appId}"`);
      } else {
        slugToApp[slug] = config.appId;
      }
    }
  }
  return checked;
}

// ---- Check 4: Unified hreflang validity ----
// After Part 17, both sitemap and HTML use getAlternateUrls from product-page-slugs.
// This check verifies the unified function produces valid, complete URLs for every app.
function checkSitemapHtmlParity() {
  let checked = 0;
  const BASE = 'https://www.lessoncraftstudio.com';

  for (const config of productPageSlugs) {
    checked++;

    const urls = getAlternateUrls(config.appId, BASE);

    // Must have an entry for every locale
    for (const locale of SUPPORTED_LOCALES) {
      const hreflang = getHreflangCode(locale);
      if (!urls[hreflang]) {
        addIssue('SITEMAP_HTML_PARITY', config.appId, locale,
          `getAlternateUrls missing hreflang="${hreflang}" for locale "${locale}"`);
        continue;
      }

      // URL must match the expected pattern: BASE/locale/apps/slug
      const expectedSlug = config.slugs[locale];
      const expectedUrl = `${BASE}/${locale}/apps/${expectedSlug}`;
      if (urls[hreflang] !== expectedUrl) {
        addIssue('SITEMAP_HTML_PARITY', config.appId, locale,
          `URL mismatch: got "${urls[hreflang]}", expected "${expectedUrl}"`);
      }
    }

    // Must have x-default pointing to English URL
    if (!urls['x-default']) {
      addIssue('SITEMAP_HTML_PARITY', config.appId, null,
        `Missing x-default in hreflang output`);
    } else if (urls['x-default'] !== `${BASE}/en/apps/${config.slugs.en}`) {
      addIssue('SITEMAP_HTML_PARITY', config.appId, null,
        `x-default "${urls['x-default']}" does not match English URL`);
    }
  }
  return checked;
}

// ---- Check 5: Content file coverage ----
function checkContentCoverage() {
  let checked = 0;
  const appIdBridge = buildAppIdBridge();

  for (const config of productPageSlugs) {
    const contentAppId = appIdBridge[config.appId];

    for (const locale of SUPPORTED_LOCALES) {
      checked++;

      if (!contentAppId) {
        addIssue('CONTENT_COVERAGE', config.appId, locale,
          `No content appId mapping found (English slug "${config.slugs.en}" not in content registry)`);
        continue;
      }

      const content = getContentByAppId(locale, contentAppId);
      if (!content) {
        addIssue('CONTENT_COVERAGE', config.appId, locale,
          `No content file found for appId="${contentAppId}" in locale "${locale}"`);
      } else if (!content.seo?.slug) {
        addIssue('CONTENT_COVERAGE', config.appId, locale,
          `Content exists but seo.slug is missing/empty`);
      }
    }
  }
  return checked;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
function main() {
  console.log('='.repeat(70));
  console.log('  PRODUCT PAGE SLUG COMPLETENESS AUDIT');
  console.log('='.repeat(70));
  console.log();

  const appCount = productPageSlugs.length;
  const localeCount = SUPPORTED_LOCALES.length;
  console.log(`Apps: ${appCount}  |  Locales: ${localeCount}  |  Total combos: ${appCount * localeCount}`);
  console.log();

  // Run all 5 checks
  const counts = {};
  counts['SLUG_COMPLETENESS'] = checkSlugCompleteness();
  counts['LANGUAGE_CORRECT'] = checkLanguageCorrectness();
  counts['NO_COLLISIONS'] = checkNoCollisions();
  counts['SITEMAP_HTML_PARITY'] = checkSitemapHtmlParity();
  counts['CONTENT_COVERAGE'] = checkContentCoverage();

  // Report
  const checks = ['SLUG_COMPLETENESS', 'LANGUAGE_CORRECT', 'NO_COLLISIONS', 'SITEMAP_HTML_PARITY', 'CONTENT_COVERAGE'];

  for (const check of checks) {
    const checkIssues = issues.filter(i => i.check === check);
    const status = checkIssues.length === 0 ? 'PASS' : 'FAIL';
    const icon = status === 'PASS' ? '[OK]' : '[!!]';
    console.log(`${icon} ${check}: ${counts[check]} checked, ${checkIssues.length} issues`);

    if (checkIssues.length > 0) {
      for (const issue of checkIssues) {
        console.log(`     - [${issue.appId}] (${issue.locale}): ${issue.message}`);
      }
    }
  }

  console.log();
  console.log('-'.repeat(70));

  if (issues.length === 0) {
    console.log(`RESULT: ALL CLEAN - ${appCount} apps x ${localeCount} locales, 0 issues`);
    process.exit(0);
  } else {
    console.log(`RESULT: ${issues.length} ISSUES FOUND across ${checks.filter(c => issues.some(i => i.check === c)).length} checks`);
    process.exit(1);
  }
}

main();
