#!/usr/bin/env node
// SEO Part 233: DA Grade Keyword Cannibalization Audit
// Enhances 250 DA theme+grade pages with LSI keywords,
// question keywords, and cannibalization audit.
// Adapted from scripts/enhance-fi-grade-keywords.js (Part 172).

const fs = require('fs');
const path = require('path');

// ============================================================
// SECTION 1: GRADE-LEVEL LSI TEMPLATES
// ============================================================

// Educational vocabulary per developmental level (Danish)
const gradeLsiTemplates = {
  preschool: {
    label: 'F\u00f8rskole (3\u20134 \u00e5r)',
    gradeKey: 'preschool',
    gradeLabel: 'f\u00f8rskole',
    ageRange: '3-4 \u00e5r',
    // Core developmental skills at this level
    coreLsi: [
      'finmotorik \u00f8velse',
      'farvel\u00e6gning og sporing',
      'st\u00f8rrelsessortering',
      'simpel t\u00e6lling',
      'grundformer genkendelse',
      'blyantsgreb tr\u00e6ning',
      'sanseoplevelse',
      'visuel skelneevne',
    ],
    // Question templates: {theme} and {themeNoun} get replaced
    questionTemplates: [
      'Hvordan \u00f8ver jeg {themeNoun} t\u00e6lling i f\u00f8rskolen?',
      'Hvilke {theme}opgaver passer til 3\u20134-\u00e5rige?',
      'Hvordan bruger jeg {theme}tema til finmotorisk udvikling?',
    ],
    // Anti-cannibalization: grade pages use "{prefix}opgaver {gradeLabel}"
    primaryPattern: (themePrefix) => `${themePrefix}opgaver f\u00f8rskole`,
  },
  kindergarten: {
    label: 'B\u00f8rnehaveklasse (5\u20136 \u00e5r)',
    gradeKey: 'kindergarten',
    gradeLabel: 'b\u00f8rnehaveklasse',
    ageRange: '5-6 \u00e5r',
    coreLsi: [
      'begyndelsesbogstaver \u00f8velse',
      'bogstavgenkendelse',
      't\u00e6lling til 20',
      'm\u00f8nstergenkendelse',
      'klassificering og sortering',
      'visuel opfattelse',
      'ordforr\u00e5d udvidelse',
      'lydbevidsthed',
    ],
    questionTemplates: [
      'Hvordan \u00f8ver jeg {themeNoun} begyndelsesbogstaver i b\u00f8rnehaveklassen?',
      'Hvilke {theme}opgaver udvikler l\u00e6separathed?',
      'Hvordan bruger jeg {theme}tema til t\u00e6lleundervisning i b\u00f8rnehaveklassen?',
    ],
    primaryPattern: (themePrefix) => `${themePrefix}opgaver b\u00f8rnehaveklasse`,
  },
  'first-grade': {
    label: '1. Klasse (6\u20137 \u00e5r)',
    gradeKey: 'first-grade',
    gradeLabel: '1. klasse',
    ageRange: '6-7 \u00e5r',
    coreLsi: [
      'addition subtraktion',
      'syntetisk l\u00e6sning',
      'selvst\u00e6ndig skrivning',
      's\u00e6tningsopbygning',
      'tekstopgaver l\u00f8sning',
      'selvst\u00e6ndigt arbejde',
      'flertrinsinstruktioner',
      'm\u00f8nsterudfyldning',
    ],
    questionTemplates: [
      'Hvordan bruger jeg {theme}opgaver til additionsundervisning i 1. klasse?',
      'Hvilke {theme}opgaver udvikler l\u00e6seforst\u00e5else?',
      'Hvordan forbinder jeg {theme}tema med 1. klasses l\u00e6replan?',
    ],
    primaryPattern: (themePrefix) => `${themePrefix}opgaver 1. klasse`,
  },
  'second-grade': {
    label: '2. Klasse (7\u20138 \u00e5r)',
    gradeKey: 'second-grade',
    gradeLabel: '2. klasse',
    ageRange: '7-8 \u00e5r',
    coreLsi: [
      'multiplikation \u00f8velser',
      'dataanalyse b\u00f8rn',
      'faktatekster l\u00e6sning',
      'positionstal forst\u00e5else',
      'skriftlig fremstilling',
      'forskningsprojekt start',
      'm\u00e5ling og sammenligning',
      'tabelafl\u00e6sning',
    ],
    questionTemplates: [
      'Hvordan bruger jeg {theme}opgaver til multiplikations\u00f8velse i 2. klasse?',
      'Hvilke {theme}opgaver underst\u00f8tter forskningsprojekter?',
      'Hvordan forbinder jeg {theme}tema med dataanalyse i 2. klasse?',
    ],
    primaryPattern: (themePrefix) => `${themePrefix}opgaver 2. klasse`,
  },
  'third-grade': {
    label: '3. Klasse (8\u20139 \u00e5r)',
    gradeKey: 'third-grade',
    gradeLabel: '3. klasse',
    ageRange: '8-9 \u00e5r',
    coreLsi: [
      'multiplikation division',
      'br\u00f8ker introduktion',
      'forskningsrapport',
      'kritisk t\u00e6nkning',
      'informationss\u00f8gning',
      'analyse og konklusion',
      'evidensbaseret forklaring',
      'tabelopstilling og diagrammer',
    ],
    questionTemplates: [
      'Hvordan bruger jeg {theme}opgaver til forskningsrapportundervisning i 3. klasse?',
      'Hvilke {theme}opgaver udvikler kritisk t\u00e6nkning?',
      'Hvordan forbinder jeg {theme}tema med 3. klasses informationss\u00f8gning?',
    ],
    primaryPattern: (themePrefix) => `${themePrefix}opgaver 3. klasse`,
  },
};

// ============================================================
// SECTION 2: THEME-SPECIFIC MODIFIERS
// ============================================================

// Each theme contributes domain-specific terms for combining with grade LSI
// prefix: compound prefix from hub keywords (e.g., dyre from dyreopgaver)
// noun: genitive/possessive form for combined keywords
// domainLsi: 3 theme-specific educational terms
const themeModifiers = {
  alphabet: { prefix: 'alfabet', noun: 'bogstavers', domainLsi: ['bogstavdannelse', 'fonemisk bevidsthed', 'bogstav-lyd forbindelse'] },
  animals: { prefix: 'dyre', noun: 'dyrs', domainLsi: ['dyreklassifikation', 'levesteder', 'biologi grundbegreber'] },
  birds: { prefix: 'fugle', noun: 'fugles', domainLsi: ['fuglearter genkendelse', 'tr\u00e6kfugle', 'naturobservation'] },
  birthday: { prefix: 'f\u00f8dselsdags', noun: 'f\u00f8dselsdagens', domainLsi: ['fejring og traditioner', 'aldersforst\u00e5else', 'f\u00f8dselsdagskalender'] },
  body: { prefix: 'krops', noun: 'kroppens', domainLsi: ['kropsdele genkendelse', 'sundhedsundervisning', 'anatomi'] },
  camping: { prefix: 'camping', noun: 'campingens', domainLsi: ['friluftsliv', 'naturoplevelse', 'campingudstyr'] },
  circus: { prefix: 'cirkus', noun: 'cirkussets', domainLsi: ['akrobatik', 'optr\u00e6den', 'kreativ bev\u00e6gelse'] },
  clothing: { prefix: 't\u00f8j', noun: 't\u00f8jets', domainLsi: ['t\u00f8jordforr\u00e5d', 'p\u00e5kl\u00e6dning', '\u00e5rstider og t\u00f8j'] },
  colors: { prefix: 'farve', noun: 'farvers', domainLsi: ['farvegenkendelse', 'prim\u00e6rfarver', 'visuel farve\u00f8velse'] },
  construction: { prefix: 'bygge', noun: 'byggeriets', domainLsi: ['STEM-l\u00e6ring', 'byggemaskiner', 'm\u00e5ling'] },
  cooking: { prefix: 'madlavnings', noun: 'madlavningens', domainLsi: ['opskrift og m\u00e5ling', 'k\u00f8kkenordforr\u00e5d', 'ern\u00e6ringsundervisning'] },
  dinosaurs: { prefix: 'dinosaur', noun: 'dinosaurers', domainLsi: ['pal\u00e6ontologi', 'fossiler', 'geologiske perioder'] },
  easter: { prefix: 'p\u00e5ske', noun: 'p\u00e5skens', domainLsi: ['for\u00e5rsfest', 'p\u00e5ske\u00e6g', 's\u00e6sonbaseret l\u00e6ring'] },
  emotions: { prefix: 'f\u00f8lelses', noun: 'f\u00f8lelsers', domainLsi: ['f\u00f8lelsesm\u00e6ssig l\u00e6ring', 'empati', 'selvregulering'] },
  'fairy-tales': { prefix: 'eventyr', noun: 'eventyrs', domainLsi: ['historieforst\u00e5else', 'eventyrhelte', 'fantasi'] },
  farm: { prefix: 'bondeg\u00e5rds', noun: 'bondeg\u00e5rdens', domainLsi: ['bondeg\u00e5rdsdyr', 'f\u00f8devareproduktion', 'husdyr'] },
  flowers: { prefix: 'blomster', noun: 'blomsters', domainLsi: ['plantedele', 'v\u00e6kstobservation', 'planters livscyklus'] },
  food: { prefix: 'mad', noun: 'madens', domainLsi: ['ern\u00e6ring', 'madgrupper', 'sundt kostvalg'] },
  forest: { prefix: 'skov', noun: 'skovens', domainLsi: ['\u00f8kosystem', 'skovens lag', 'dansk natur'] },
  fruits: { prefix: 'frugt', noun: 'frugters', domainLsi: ['frugtgenkendelse', 'vitaminer', 'sundt mellemm\u00e5ltid'] },
  furniture: { prefix: 'm\u00f8bel', noun: 'm\u00f8blers', domainLsi: ['hjemmets genstande', 'stedord og placering', 'rumordforr\u00e5d'] },
  garden: { prefix: 'have', noun: 'havens', domainLsi: ['plantepleje', 'fr\u00f8spiring', 'milj\u00f8undervisning'] },
  halloween: { prefix: 'halloween-', noun: 'halloweens', domainLsi: ['gr\u00e6skar', 'efter\u00e5rsfest', 'festdag'] },
  holidays: { prefix: 'helligdags', noun: 'helligdages', domainLsi: ['helligdage', '\u00e5rets gang', 'festtraditioner'] },
  household: { prefix: 'husholdnings', noun: 'husholdningens', domainLsi: ['daglige f\u00e6rdigheder', 'huslige g\u00f8rem\u00e5l', 'hverdagsrutiner'] },
  insects: { prefix: 'insekt', noun: 'insekters', domainLsi: ['insekters livscyklus', 'sommerfuglens forvandling', 'sm\u00e5kryb'] },
  jobs: { prefix: 'job-', noun: 'jobs', domainLsi: ['jobgenkendelse', 'arbejdsbeskrivelser', 'samfundets erhverv'] },
  music: { prefix: 'musik', noun: 'musikkens', domainLsi: ['musikinstrumenter', 'rytme\u00f8velse', 'musikundervisning'] },
  nature: { prefix: 'natur', noun: 'naturens', domainLsi: ['milj\u00f8undervisning', 'naturf\u00e6nomener', '\u00f8kologi'] },
  numbers: { prefix: 'tal', noun: 'tals', domainLsi: ['talforst\u00e5else', 'grundl\u00e6ggende t\u00e6lling', 'talr\u00e6kke\u00f8velse'] },
  ocean: { prefix: 'hav', noun: 'havets', domainLsi: ['havdyr', 'undervandsliv', 'marinbiologi'] },
  pets: { prefix: 'k\u00e6ledyrs', noun: 'k\u00e6ledyrs', domainLsi: ['dyrepasning', 'ansvar', 'k\u00e6ledyrsarter'] },
  pirates: { prefix: 'pirat', noun: 'piraternes', domainLsi: ['skattejagt', 'kortl\u00e6sning', 's\u00f8eventyr'] },
  robots: { prefix: 'robot', noun: 'robotters', domainLsi: ['teknologi', 'programmeringst\u00e6nkning', 'STEM-l\u00e6ring'] },
  school: { prefix: 'skole', noun: 'skolens', domainLsi: ['skoleordforr\u00e5d', 'skolematerialer', 'skoleforberedelse'] },
  seasons: { prefix: '\u00e5rstids', noun: '\u00e5rstiders', domainLsi: ['\u00e5rstidsskift', 'vejrf\u00e6nomener', 'naturens forandringer'] },
  shapes: { prefix: 'form', noun: 'formers', domainLsi: ['geometriske former', 'rumlig opfattelse', 'trekant firkant cirkel'] },
  space: { prefix: 'rum', noun: 'rummets', domainLsi: ['planeter', 'solsystemet', 'astronomi'] },
  sports: { prefix: 'sport', noun: 'sportens', domainLsi: ['idr\u00e6tsundervisning', 'sportsgrene', 'fysisk aktivitet'] },
  spring: { prefix: 'for\u00e5rs', noun: 'for\u00e5rets', domainLsi: ['for\u00e5rstegn', 'v\u00e6kstobservation', 'naturens opv\u00e5gning'] },
  summer: { prefix: 'sommer', noun: 'sommerens', domainLsi: ['sommerferie\u00f8velser', 'sommeraktiviteter', 'ferie\u00f8velser'] },
  superheroes: { prefix: 'superhelte', noun: 'superheltes', domainLsi: ['heltetema', 'kreativ t\u00e6nkning', 'mod og v\u00e6rdier'] },
  toys: { prefix: 'leget\u00f8js', noun: 'leget\u00f8jets', domainLsi: ['leget\u00f8jssortering', 'leg og l\u00e6ring', 'leget\u00f8jst\u00e6lling'] },
  transportation: { prefix: 'transport', noun: 'transportens', domainLsi: ['transportmidler', 'trafiksikkerhed', 'land vand luft'] },
  travel: { prefix: 'rejse', noun: 'rejsens', domainLsi: ['geografi', 'verdens kulturer', 'kortl\u00e6sning'] },
  vegetables: { prefix: 'gr\u00f8ntsags', noun: 'gr\u00f8ntsagers', domainLsi: ['gr\u00f8ntsagsgenkendelse', 'ern\u00e6ringsundervisning', 'k\u00f8kkenhave'] },
  weather: { prefix: 'vejr', noun: 'vejrets', domainLsi: ['vejrf\u00e6nomener', 'temperatur', 'vejrdagbog'] },
  winter: { prefix: 'vinter', noun: 'vinterens', domainLsi: ['sne og is', 'vinterdyr', 'vinteraktiviteter'] },
  xmas: { prefix: 'jule', noun: 'julens', domainLsi: ['adventskalender', 'julehygge', 'juletraditioner'] },
  zoo: { prefix: 'zoo-', noun: 'zoos', domainLsi: ['eksotiske dyr', 'zoo-bes\u00f8g', 'vilde dyr'] },
};

// ============================================================
// SECTION 3: KEYWORD GENERATION LOGIC
// ============================================================

const GRADES = ['preschool', 'kindergarten', 'first-grade', 'second-grade', 'third-grade'];

function buildGradeKeywords(theme, grade) {
  const gradeTemplate = gradeLsiTemplates[grade];
  const themeMod = themeModifiers[theme];
  if (!gradeTemplate || !themeMod) return null;

  const primary = gradeTemplate.primaryPattern(themeMod.prefix);

  // Combine: primary + 4 grade-level LSI + 3 theme-domain LSI + 1-2 grade-theme combos = ~10
  const keywords = [primary];

  // Add 4 grade-level LSI terms
  const gradeLsi = gradeTemplate.coreLsi.slice(0, 4);
  for (const term of gradeLsi) {
    keywords.push(term);
  }

  // Add 3 theme-domain LSI terms
  for (const term of themeMod.domainLsi) {
    if (!keywords.includes(term)) {
      keywords.push(term);
    }
  }

  // Add 1-2 combined grade+theme terms
  // combined1: use "\u00f8velser" instead of "opgaver" for differentiation
  const combined1 = `${themeMod.prefix}\u00f8velser ${gradeTemplate.gradeLabel}`;
  if (!keywords.some(k => k === combined1)) {
    keywords.push(combined1);
  }

  // combined2: genitive noun + "l\u00e6ring" + age range
  const combined2 = `${themeMod.noun} l\u00e6ring ${gradeTemplate.ageRange}`;
  keywords.push(combined2);

  return {
    primary,
    keywordString: keywords.join(', '),
    keywordCount: keywords.length,
    lsiKeywords: [...gradeLsi, ...themeMod.domainLsi],
  };
}

function buildGradeQuestions(theme, grade) {
  const gradeTemplate = gradeLsiTemplates[grade];
  const themeMod = themeModifiers[theme];
  if (!gradeTemplate || !themeMod) return [];

  return gradeTemplate.questionTemplates.map(template =>
    template
      .replace(/\{theme\}/g, themeMod.prefix)
      .replace(/\{themeNoun\}/g, themeMod.noun)
  );
}

// ============================================================
// SECTION 4: FILE PROCESSING
// ============================================================

const THEME_DIR = path.join(__dirname, '..', 'frontend', 'content', 'themes');
const KEYWORD_MAP_PATH = path.join(__dirname, '..', 'docs', 'seo-keywords', 'da-all-pages.md');
const REPORT_PATH = path.join(__dirname, '..', 'docs', 'audit-results', 'da-keyword-cannibalization.json');

function readFileContent(filePath) {
  return fs.readFileSync(filePath, 'utf-8');
}

/**
 * Update seoKeywords for a specific grade within a theme's da.ts file.
 * Uses a targeted regex that finds the grade block and replaces its seoKeywords.
 */
function updateGradeSeoKeywords(content, gradeKey, newKeywords) {
  // Match the grade block: 'preschool': { ... seoKeywords: '...' ... }
  // We need to find the specific grade key, then the first seoKeywords within that block
  const gradeRegex = new RegExp(
    `('${gradeKey}':\\s*\\{[\\s\\S]*?seoKeywords:\\s*')([^']+)(')`
  );
  const match = content.match(gradeRegex);
  if (!match) {
    return { content, success: false };
  }

  // Make sure we're replacing the right one by checking it's within the gradeContent block
  const gradeContentIdx = content.indexOf('gradeContent:');
  const matchIdx = content.indexOf(match[0]);
  if (gradeContentIdx === -1 || matchIdx < gradeContentIdx) {
    return { content, success: false };
  }

  const updated = content.replace(gradeRegex, `$1${newKeywords}$3`);
  return { content: updated, success: true };
}

/**
 * Extract current seoKeywords for a specific grade from file content.
 */
function extractGradeSeoKeywords(content, gradeKey) {
  const regex = new RegExp(
    `'${gradeKey}':\\s*\\{[\\s\\S]*?seoKeywords:\\s*'([^']+)'`
  );
  const match = content.match(regex);
  return match ? match[1] : null;
}

// ============================================================
// SECTION 5: CANNIBALIZATION AUDIT
// ============================================================

function runFullCannibalizationAudit(gradeKeywordsMap) {
  const issues = [];

  // Rule 1: Grade pages must NOT use product pattern "generator" or hub pattern "til b\u00f8rn"
  for (const [key, data] of Object.entries(gradeKeywordsMap)) {
    const primary = data.primary;
    if (primary.includes('generator')) {
      issues.push({
        type: 'PATTERN_VIOLATION',
        severity: 'critical',
        page: key,
        message: `Grade page uses product pattern "generator": ${primary}`,
      });
    }
    if (primary.includes('til b\u00f8rn')) {
      issues.push({
        type: 'PATTERN_VIOLATION',
        severity: 'critical',
        page: key,
        message: `Grade page uses hub pattern "til b\u00f8rn": ${primary}`,
      });
    }
  }

  // Rule 2: No two grade pages share the same primary keyword
  const primaries = {};
  for (const [key, data] of Object.entries(gradeKeywordsMap)) {
    const primary = data.primary;
    if (primaries[primary]) {
      issues.push({
        type: 'DUPLICATE_PRIMARY',
        severity: 'critical',
        page: key,
        message: `Primary "${primary}" also used by ${primaries[primary]}`,
      });
    }
    primaries[primary] = key;
  }

  // Rule 3: Check grade-specific differentiation within each theme
  const themeGrades = {};
  for (const [key, data] of Object.entries(gradeKeywordsMap)) {
    const [theme] = key.split('/');
    if (!themeGrades[theme]) themeGrades[theme] = [];
    themeGrades[theme].push({ key, primary: data.primary });
  }

  for (const [theme, grades] of Object.entries(themeGrades)) {
    const seenPrimaries = new Set();
    for (const { key, primary } of grades) {
      if (seenPrimaries.has(primary)) {
        issues.push({
          type: 'INTRA_THEME_CONFLICT',
          severity: 'critical',
          page: key,
          message: `Theme ${theme} has duplicate grade primary: ${primary}`,
        });
      }
      seenPrimaries.add(primary);
    }
  }

  // Rule 4: Product vs Grade overlap check
  // Products use "generator", grades use "opgaver {grade}" \u2014 should be naturally distinct
  const productPatterns = ['generator'];
  for (const [key, data] of Object.entries(gradeKeywordsMap)) {
    for (const pattern of productPatterns) {
      if (data.keywordString.split(',').some(k => k.trim().includes(pattern))) {
        issues.push({
          type: 'CROSS_TYPE_KEYWORD',
          severity: 'warning',
          page: key,
          message: `Grade page keywords contain product pattern "${pattern}"`,
        });
      }
    }
  }

  return issues;
}

// ============================================================
// SECTION 6: MARKDOWN GENERATION
// ============================================================

function generateMarkdownAppendix(gradeResults) {
  let md = '\n\n---\n\n';
  md += '## Theme+Grade Pages \u2014 LSI & Question Keywords (Part 233 Enhancement)\n\n';
  md += '> Added by SEO Part 233. Covers 250 theme+grade pages (50 themes \u00d7 5 grades).\n\n';

  // Organize by grade level for readability
  for (const grade of GRADES) {
    const gradeTemplate = gradeLsiTemplates[grade];
    md += `### ${gradeTemplate.label} \u2014 Grade-Level LSI Keywords\n\n`;
    md += '**Core Educational LSI Terms:**\n';
    gradeTemplate.coreLsi.forEach((term, i) => {
      md += `${i + 1}. ${term}\n`;
    });
    md += '\n';

    // List all themes for this grade
    const gradeEntries = Object.entries(gradeResults)
      .filter(([key]) => key.endsWith(`/${grade}`))
      .sort(([a], [b]) => a.localeCompare(b));

    for (const [key, result] of gradeEntries) {
      const theme = key.split('/')[0];
      const themeMod = themeModifiers[theme];
      if (!themeMod) continue;

      md += `#### ${theme} / ${gradeTemplate.gradeLabel}\n\n`;
      md += `**Primary:** ${result.primary}\n\n`;

      md += '**LSI Keywords:**\n';
      result.lsiKeywords.forEach((k, i) => {
        md += `${i + 1}. ${k}\n`;
      });

      md += '\n**Question Keywords (PAA targets):**\n';
      result.questions.forEach((q, i) => {
        md += `${i + 1}. ${q}\n`;
      });

      md += `\n**SERP Competition:** Very Low | **Est. Volume:** 10-50/mo | **SERP Features:** Organic only\n\n`;
    }
  }

  return md;
}

// ============================================================
// SECTION 7: MAIN EXECUTION
// ============================================================

function main() {
  console.log('=== SEO Part 233: DA Keyword Cannibalization Audit ===\n');

  const report = {
    timestamp: new Date().toISOString(),
    part: 233,
    locale: 'da',
    gradePages: { total: 0, updated: 0, errors: [], validations: [] },
    cannibalization: [],
    summary: {},
  };

  // Get all theme directories
  const themeDirs = fs.readdirSync(THEME_DIR).filter(d => {
    const dirPath = path.join(THEME_DIR, d);
    return fs.statSync(dirPath).isDirectory() && fs.existsSync(path.join(dirPath, 'da.ts'));
  });

  console.log(`Found ${themeDirs.length} themes with da.ts files\n`);

  const gradeKeywordsMap = {};
  const gradeResults = {};
  let totalUpdated = 0;
  let totalErrors = 0;

  for (const theme of themeDirs) {
    const filePath = path.join(THEME_DIR, theme, 'da.ts');
    let content = readFileContent(filePath);
    let fileModified = false;
    let themeUpdates = 0;
    let themeErrors = 0;

    for (const grade of GRADES) {
      const key = `${theme}/${grade}`;
      report.gradePages.total++;

      try {
        // Build new keywords
        const keywordData = buildGradeKeywords(theme, grade);
        if (!keywordData) {
          report.gradePages.errors.push({ key, error: `No template for theme=${theme} grade=${grade}` });
          themeErrors++;
          continue;
        }

        // Build question keywords
        const questions = buildGradeQuestions(theme, grade);

        // Extract current keywords
        const currentKeywords = extractGradeSeoKeywords(content, grade);
        if (!currentKeywords) {
          report.gradePages.errors.push({ key, error: `No seoKeywords found for grade ${grade}` });
          themeErrors++;
          continue;
        }

        // Update the file content
        const result = updateGradeSeoKeywords(content, grade, keywordData.keywordString);
        if (!result.success) {
          report.gradePages.errors.push({ key, error: `Regex replacement failed for grade ${grade}` });
          themeErrors++;
          continue;
        }

        content = result.content;
        fileModified = true;
        themeUpdates++;

        // Record results
        gradeKeywordsMap[key] = {
          primary: keywordData.primary,
          keywordString: keywordData.keywordString,
          keywordCount: keywordData.keywordCount,
        };
        gradeResults[key] = {
          primary: keywordData.primary,
          keywordString: keywordData.keywordString,
          keywordCount: keywordData.keywordCount,
          lsiKeywords: keywordData.lsiKeywords,
          questions,
          before: currentKeywords.split(',').length,
          after: keywordData.keywordCount,
        };

        report.gradePages.validations.push({
          key,
          before: currentKeywords.split(',').length,
          after: keywordData.keywordCount,
          valid: keywordData.keywordCount >= 8,
        });

      } catch (err) {
        report.gradePages.errors.push({ key, error: err.message });
        themeErrors++;
      }
    }

    // Write back if modified
    if (fileModified) {
      fs.writeFileSync(filePath, content, 'utf-8');
      totalUpdated += themeUpdates;
      console.log(`  \u2713 ${theme}: ${themeUpdates}/5 grades updated`);
    }

    if (themeErrors > 0) {
      totalErrors += themeErrors;
      console.log(`  \u2717 ${theme}: ${themeErrors} errors`);
    }
  }

  report.gradePages.updated = totalUpdated;

  console.log(`\n--- Summary ---`);
  console.log(`Total grade pages: ${report.gradePages.total}`);
  console.log(`Updated: ${totalUpdated}`);
  console.log(`Errors: ${totalErrors}`);

  // ---- Cannibalization Audit ----
  console.log('\nRunning cannibalization audit across 250 grade pages...');
  const cannibalizationIssues = runFullCannibalizationAudit(gradeKeywordsMap);
  report.cannibalization = cannibalizationIssues;

  const criticalIssues = cannibalizationIssues.filter(i => i.severity === 'critical');
  const warningIssues = cannibalizationIssues.filter(i => i.severity === 'warning');
  const infoIssues = cannibalizationIssues.filter(i => i.severity === 'info');

  console.log(`  Critical: ${criticalIssues.length}`);
  console.log(`  Warnings: ${warningIssues.length}`);
  console.log(`  Info: ${infoIssues.length}`);

  if (criticalIssues.length > 0) {
    console.log('\n  CRITICAL ISSUES:');
    for (const issue of criticalIssues) {
      console.log(`    - ${issue.message}`);
    }
  }

  // ---- Markdown Update ----
  console.log('\nUpdating da-all-pages.md with LSI, question, and SERP analysis...');
  const mdAppendix = generateMarkdownAppendix(gradeResults);

  if (fs.existsSync(KEYWORD_MAP_PATH)) {
    fs.appendFileSync(KEYWORD_MAP_PATH, mdAppendix, 'utf-8');
    console.log(`  Appended ${Object.keys(gradeResults).length} grade entries to da-all-pages.md`);
  } else {
    console.error(`  ERROR: da-all-pages.md not found at ${KEYWORD_MAP_PATH}`);
  }

  // ---- Save Report ----
  const reportDir = path.dirname(REPORT_PATH);
  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir, { recursive: true });
  }

  report.summary = {
    totalGradePages: report.gradePages.total,
    updated: totalUpdated,
    errors: totalErrors,
    criticalCannibalization: criticalIssues.length,
    warnings: warningIssues.length,
    allPagesMinKeywords: Math.min(
      ...Object.values(gradeResults).map(r => r.keywordCount)
    ),
    allPagesMaxKeywords: Math.max(
      ...Object.values(gradeResults).map(r => r.keywordCount)
    ),
    avgKeywordsPerPage: (
      Object.values(gradeResults).reduce((sum, r) => sum + r.keywordCount, 0) /
      Object.keys(gradeResults).length
    ).toFixed(1),
    questionsGenerated: Object.values(gradeResults).reduce((sum, r) => sum + r.questions.length, 0),
  };

  fs.writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2), 'utf-8');
  console.log(`\nReport saved to ${REPORT_PATH}`);

  console.log('\n=== Part 233 Complete ===');
  console.log(`  ${totalUpdated} grade pages enhanced`);
  console.log(`  ${report.summary.questionsGenerated} question keywords generated`);
  console.log(`  ${criticalIssues.length} critical cannibalization issues`);
  console.log(`  Keywords per page: ${report.summary.allPagesMinKeywords}-${report.summary.allPagesMaxKeywords} (avg ${report.summary.avgKeywordsPerPage})`);
}

main();
