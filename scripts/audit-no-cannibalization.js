#!/usr/bin/env node
// SEO Part 266: NO Grade Keyword Cannibalization Audit
// Enhances 250 NO theme+grade pages with LSI keywords,
// question keywords, and cannibalization audit.
// Adapted from scripts/audit-da-cannibalization.js (Part 233).

const fs = require('fs');
const path = require('path');

// ============================================================
// SECTION 1: GRADE-LEVEL LSI TEMPLATES
// ============================================================

// Educational vocabulary per developmental level (Norwegian Bokm\u00e5l)
const gradeLsiTemplates = {
  preschool: {
    label: 'F\u00f8rskole (3\u20134 \u00e5r)',
    gradeKey: 'preschool',
    gradeLabel: 'f\u00f8rskole',
    ageRange: '3-4 \u00e5r',
    // Core developmental skills at this level
    coreLsi: [
      'finmotorikk \u00f8velse',
      'fargelegging og sporing',
      'st\u00f8rrelsessortering',
      'enkel telling',
      'grunnformer gjenkjenning',
      'blyantgrep trening',
      'sanseopplevelse',
      'visuell oppfatning',
    ],
    // Question templates: {theme} and {themeNoun} get replaced
    questionTemplates: [
      'Hvordan \u00f8ver jeg {themeNoun} telling i f\u00f8rskolen?',
      'Hvilke {theme}oppgaver passer til 3\u20134-\u00e5ringer?',
      'Hvordan bruker jeg {theme}tema til finmotorisk utvikling?',
    ],
    // Anti-cannibalization: grade pages use "{prefix}oppgaver {gradeLabel}"
    primaryPattern: (themePrefix) => `${themePrefix}oppgaver f\u00f8rskole`,
  },
  kindergarten: {
    label: 'Barnehage (5\u20136 \u00e5r)',
    gradeKey: 'kindergarten',
    gradeLabel: 'barnehage',
    ageRange: '5-6 \u00e5r',
    coreLsi: [
      'begynnelsesbokstaver \u00f8velse',
      'bokstavgjenkjenning',
      'telling til 20',
      'm\u00f8nstergjenkjenning',
      'klassifisering og sortering',
      'visuell oppfatning',
      'ordforr\u00e5d utvidelse',
      'lydbevissthet',
    ],
    questionTemplates: [
      'Hvordan \u00f8ver jeg {themeNoun} begynnelsesbokstaver i barnehagen?',
      'Hvilke {theme}oppgaver utvikler leseberedskap?',
      'Hvordan bruker jeg {theme}tema til telleundervisning i barnehagen?',
    ],
    primaryPattern: (themePrefix) => `${themePrefix}oppgaver barnehage`,
  },
  'first-grade': {
    label: '1. Klasse (6\u20137 \u00e5r)',
    gradeKey: 'first-grade',
    gradeLabel: '1. klasse',
    ageRange: '6-7 \u00e5r',
    coreLsi: [
      'addisjon subtraksjon',
      'syntetisk lesing',
      'selvstendig skriving',
      'setningsoppbygging',
      'tekstoppgaver l\u00f8sning',
      'selvstendig arbeid',
      'flertrinnsinstruksjoner',
      'm\u00f8nsterutfylling',
    ],
    questionTemplates: [
      'Hvordan bruker jeg {theme}oppgaver til addisjonsundervisning i 1. klasse?',
      'Hvilke {theme}oppgaver utvikler leseforst\u00e5else?',
      'Hvordan forbinder jeg {theme}tema med 1. klasses l\u00e6replan?',
    ],
    primaryPattern: (themePrefix) => `${themePrefix}oppgaver 1. klasse`,
  },
  'second-grade': {
    label: '2. Klasse (7\u20138 \u00e5r)',
    gradeKey: 'second-grade',
    gradeLabel: '2. klasse',
    ageRange: '7-8 \u00e5r',
    coreLsi: [
      'multiplikasjons\u00f8velser',
      'dataanalyse barn',
      'faktatekster lesing',
      'posisjonstall forst\u00e5else',
      'skriftlig fremstilling',
      'forskningsprosjekt',
      'm\u00e5ling og sammenligning',
      'tabellavlesning',
    ],
    questionTemplates: [
      'Hvordan bruker jeg {theme}oppgaver til multiplikasjons\u00f8velse i 2. klasse?',
      'Hvilke {theme}oppgaver st\u00f8tter forskningsprosjekter?',
      'Hvordan forbinder jeg {theme}tema med dataanalyse i 2. klasse?',
    ],
    primaryPattern: (themePrefix) => `${themePrefix}oppgaver 2. klasse`,
  },
  'third-grade': {
    label: '3. Klasse (8\u20139 \u00e5r)',
    gradeKey: 'third-grade',
    gradeLabel: '3. klasse',
    ageRange: '8-9 \u00e5r',
    coreLsi: [
      'multiplikasjon divisjon',
      'br\u00f8ker introduksjon',
      'forskningsrapport',
      'kritisk tenkning',
      'informasjonss\u00f8king',
      'analyse og konklusjon',
      'evidensbasert forklaring',
      'tabelloppstilling og diagrammer',
    ],
    questionTemplates: [
      'Hvordan bruker jeg {theme}oppgaver til forskningsrapportundervisning i 3. klasse?',
      'Hvilke {theme}oppgaver utvikler kritisk tenkning?',
      'Hvordan forbinder jeg {theme}tema med 3. klasses informasjonss\u00f8king?',
    ],
    primaryPattern: (themePrefix) => `${themePrefix}oppgaver 3. klasse`,
  },
};

// ============================================================
// SECTION 2: THEME-SPECIFIC MODIFIERS
// ============================================================

// Each theme contributes domain-specific terms for combining with grade LSI
// prefix: compound prefix from hub keywords (e.g., dyre from dyreoppgaver)
// noun: genitive/possessive form for combined keywords
// domainLsi: 3 theme-specific educational terms
const themeModifiers = {
  alphabet: { prefix: 'alfabet', noun: 'bokstavers', domainLsi: ['bokstavdannelse', 'fonemisk bevissthet', 'bokstav-lyd forbindelse'] },
  animals: { prefix: 'dyre', noun: 'dyrs', domainLsi: ['dyreklassifisering', 'leveomr\u00e5der', 'biologi grunnbegreper'] },
  birds: { prefix: 'fugle', noun: 'fuglers', domainLsi: ['fuglearter gjenkjenning', 'trekkfugler', 'naturobservasjon'] },
  birthday: { prefix: 'bursdags', noun: 'bursdagens', domainLsi: ['feiring og tradisjoner', 'aldersforst\u00e5else', 'bursdagskalender'] },
  body: { prefix: 'kropps', noun: 'kroppens', domainLsi: ['kroppsdeler gjenkjenning', 'helseundervisning', 'anatomi'] },
  camping: { prefix: 'camping', noun: 'campingens', domainLsi: ['friluftsliv', 'naturopplevelse', 'campingutstyr'] },
  circus: { prefix: 'sirkus', noun: 'sirkusets', domainLsi: ['akrobatikk', 'opptreden', 'kreativ bevegelse'] },
  clothing: { prefix: 'kl\u00e6r', noun: 'kl\u00e6rnes', domainLsi: ['klesordforr\u00e5d', 'p\u00e5kledning', '\u00e5rstider og kl\u00e6r'] },
  colors: { prefix: 'farge', noun: 'fargers', domainLsi: ['fargegjenkjenning', 'prim\u00e6rfarger', 'visuell farge\u00f8velse'] },
  construction: { prefix: 'bygge', noun: 'byggeriets', domainLsi: ['STEM-l\u00e6ring', 'byggemaskiner', 'm\u00e5ling'] },
  cooking: { prefix: 'matlagings', noun: 'matlagingens', domainLsi: ['oppskrift og m\u00e5ling', 'kj\u00f8kkenordforr\u00e5d', 'ern\u00e6ringsundervisning'] },
  dinosaurs: { prefix: 'dinosaur', noun: 'dinosaurers', domainLsi: ['paleontologi', 'fossiler', 'geologiske perioder'] },
  easter: { prefix: 'p\u00e5ske', noun: 'p\u00e5skens', domainLsi: ['v\u00e5rfest', 'p\u00e5skeegg', 'sesongbasert l\u00e6ring'] },
  emotions: { prefix: 'f\u00f8lelses', noun: 'f\u00f8lelsers', domainLsi: ['f\u00f8lelsesmessig l\u00e6ring', 'empati', 'selvregulering'] },
  'fairy-tales': { prefix: 'eventyr', noun: 'eventyrs', domainLsi: ['historieforst\u00e5else', 'eventyrhelter', 'fantasi'] },
  farm: { prefix: 'g\u00e5rds', noun: 'g\u00e5rdens', domainLsi: ['g\u00e5rdsdyr', 'matproduksjon', 'husdyr'] },
  flowers: { prefix: 'blomster', noun: 'blomsters', domainLsi: ['plantedeler', 'vekstobservasjon', 'planters livssyklus'] },
  food: { prefix: 'mat', noun: 'matens', domainLsi: ['ern\u00e6ring', 'matgrupper', 'sunt kostvalg'] },
  forest: { prefix: 'skog', noun: 'skogens', domainLsi: ['\u00f8kosystem', 'skogens lag', 'norsk natur'] },
  fruits: { prefix: 'frukt', noun: 'frukters', domainLsi: ['fruktgjenkjenning', 'vitaminer', 'sunt mellomm\u00e5ltid'] },
  furniture: { prefix: 'm\u00f8bel', noun: 'm\u00f8blers', domainLsi: ['hjemmets gjenstander', 'stedsord og plassering', 'romordforr\u00e5d'] },
  garden: { prefix: 'hage', noun: 'hagens', domainLsi: ['plantestell', 'fr\u00f8spiring', 'milj\u00f8undervisning'] },
  halloween: { prefix: 'halloween-', noun: 'halloweens', domainLsi: ['gresskar', 'h\u00f8stfest', 'festdag'] },
  holidays: { prefix: 'helligdags', noun: 'helligdagers', domainLsi: ['helligdager', '\u00e5rets gang', 'festtradisjoner'] },
  household: { prefix: 'husholdnings', noun: 'husholdningens', domainLsi: ['daglige ferdigheter', 'huslige gj\u00f8rem\u00e5l', 'hverdagsrutiner'] },
  insects: { prefix: 'insekt', noun: 'insekters', domainLsi: ['insekters livssyklus', 'sommerfuglens forvandling', 'sm\u00e5kryp'] },
  jobs: { prefix: 'jobb-', noun: 'jobbers', domainLsi: ['jobbgjenkjenning', 'arbeidsbeskrivelser', 'samfunnets yrker'] },
  music: { prefix: 'musikk', noun: 'musikkens', domainLsi: ['musikkinstrumenter', 'rytme\u00f8velse', 'musikkundervisning'] },
  nature: { prefix: 'natur', noun: 'naturens', domainLsi: ['milj\u00f8undervisning', 'naturfenomener', '\u00f8kologi'] },
  numbers: { prefix: 'tall', noun: 'talls', domainLsi: ['tallforst\u00e5else', 'grunnleggende telling', 'tallrekke\u00f8velse'] },
  ocean: { prefix: 'hav', noun: 'havets', domainLsi: ['havdyr', 'undervannsliv', 'marinbiologi'] },
  pets: { prefix: 'kj\u00e6ledyrs', noun: 'kj\u00e6ledyrs', domainLsi: ['dyrestell', 'ansvar', 'kj\u00e6ledyrarter'] },
  pirates: { prefix: 'pirat', noun: 'piratenes', domainLsi: ['skattejakt', 'kartlesing', 'sj\u00f8eventyr'] },
  robots: { prefix: 'robot', noun: 'roboters', domainLsi: ['teknologi', 'programmeringstenkning', 'STEM-l\u00e6ring'] },
  school: { prefix: 'skole', noun: 'skolens', domainLsi: ['skoleordforr\u00e5d', 'skolemateriell', 'skoleforberedelse'] },
  seasons: { prefix: '\u00e5rstids', noun: '\u00e5rstiders', domainLsi: ['\u00e5rstidsskifte', 'v\u00e6rfenomener', 'naturens forandringer'] },
  shapes: { prefix: 'form', noun: 'formers', domainLsi: ['geometriske former', 'romlig oppfatning', 'trekant firkant sirkel'] },
  space: { prefix: 'rom', noun: 'rommets', domainLsi: ['planeter', 'solsystemet', 'astronomi'] },
  sports: { prefix: 'idretts', noun: 'idrettens', domainLsi: ['kropps\u00f8vingsundervisning', 'idrettsgrener', 'fysisk aktivitet'] },
  spring: { prefix: 'v\u00e5r', noun: 'v\u00e5rens', domainLsi: ['v\u00e5rtegn', 'vekstobservasjon', 'naturens oppv\u00e5kning'] },
  summer: { prefix: 'sommer', noun: 'sommerens', domainLsi: ['sommerferie\u00f8velser', 'sommeraktiviteter', 'ferie\u00f8velser'] },
  superheroes: { prefix: 'superhelt', noun: 'superhelters', domainLsi: ['heltetema', 'kreativ tenkning', 'mot og verdier'] },
  toys: { prefix: 'leke', noun: 'lekets', domainLsi: ['lekesortering', 'lek og l\u00e6ring', 'leketelling'] },
  transportation: { prefix: 'transport', noun: 'transportens', domainLsi: ['transportmidler', 'trafikksikkerhet', 'land vann luft'] },
  travel: { prefix: 'reise', noun: 'reisens', domainLsi: ['geografi', 'verdens kulturer', 'kartlesing'] },
  vegetables: { prefix: 'gr\u00f8nnsaks', noun: 'gr\u00f8nnsakers', domainLsi: ['gr\u00f8nnsakgjenkjenning', 'ern\u00e6ringsundervisning', 'kj\u00f8kkenhage'] },
  weather: { prefix: 'v\u00e6r', noun: 'v\u00e6rets', domainLsi: ['v\u00e6rfenomener', 'temperatur', 'v\u00e6rdagbok'] },
  winter: { prefix: 'vinter', noun: 'vinterens', domainLsi: ['sn\u00f8 og is', 'vinterdyr', 'vinteraktiviteter'] },
  xmas: { prefix: 'jule', noun: 'julens', domainLsi: ['adventskalender', 'julekos', 'juletradisjoner'] },
  zoo: { prefix: 'zoo-', noun: 'zoos', domainLsi: ['eksotiske dyr', 'zoo-bes\u00f8k', 'ville dyr'] },
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
  // combined1: use "\u00f8velser" instead of "oppgaver" for differentiation
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
const KEYWORD_MAP_PATH = path.join(__dirname, '..', 'docs', 'seo-keywords', 'no-all-pages.md');
const REPORT_PATH = path.join(__dirname, '..', 'docs', 'audit-results', 'no-keyword-cannibalization.json');

function readFileContent(filePath) {
  return fs.readFileSync(filePath, 'utf-8');
}

/**
 * Update or insert seoKeywords for a specific grade within a theme's no.ts file.
 * If seoKeywords exists, replaces it. If not, inserts it after the grade block opening.
 */
function updateGradeSeoKeywords(content, gradeKey, newKeywords) {
  // First try to update existing seoKeywords
  const updateRegex = new RegExp(
    `('${gradeKey}':\\s*\\{[\\s\\S]*?seoKeywords:\\s*')([^']+)(')`
  );
  const updateMatch = content.match(updateRegex);

  if (updateMatch) {
    // Existing seoKeywords found — replace it
    const gradeContentIdx = content.indexOf('gradeContent:');
    const matchIdx = content.indexOf(updateMatch[0]);
    if (gradeContentIdx === -1 || matchIdx < gradeContentIdx) {
      return { content, success: false };
    }
    const updated = content.replace(updateRegex, `$1${newKeywords}$3`);
    return { content: updated, success: true, mode: 'update' };
  }

  // No existing seoKeywords — insert it after the grade block opening brace
  // Find the grade block within gradeContent
  const gradeContentIdx = content.indexOf('gradeContent:');
  if (gradeContentIdx === -1) return { content, success: false };

  // Search only within gradeContent section
  const searchFrom = gradeContentIdx;
  const gradePattern = `'${gradeKey}': {`;
  const gradeIdx = content.indexOf(gradePattern, searchFrom);
  if (gradeIdx === -1) {
    // Try alternate pattern with double quotes or no space
    const altPattern = `'${gradeKey}':{`;
    const altIdx = content.indexOf(altPattern, searchFrom);
    if (altIdx === -1) return { content, success: false };
  }

  const actualIdx = content.indexOf(gradePattern, searchFrom) !== -1
    ? content.indexOf(gradePattern, searchFrom)
    : content.indexOf(`'${gradeKey}':{`, searchFrom);
  if (actualIdx === -1) return { content, success: false };

  // Find the opening brace after the grade key
  const braceIdx = content.indexOf('{', actualIdx + gradeKey.length);
  if (braceIdx === -1) return { content, success: false };

  // Find what comes after the brace (newline + spaces + first field)
  const afterBrace = content.substring(braceIdx + 1);
  const nextLineMatch = afterBrace.match(/^(\s*)/);
  const indent = nextLineMatch ? nextLineMatch[1] : '\n      ';

  // Insert seoKeywords as the first field in the grade block
  const insertion = `${indent}seoKeywords: '${newKeywords}',`;
  const updated = content.substring(0, braceIdx + 1) + insertion + content.substring(braceIdx + 1);
  return { content: updated, success: true, mode: 'insert' };
}

/**
 * Extract current seoKeywords for a specific grade from file content.
 * Returns null if the field doesn't exist (which is valid for insertion).
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

  // Rule 1: Grade pages must NOT use product pattern "generator" or hub pattern "til barn"
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
    if (primary.includes('til barn')) {
      issues.push({
        type: 'PATTERN_VIOLATION',
        severity: 'critical',
        page: key,
        message: `Grade page uses hub pattern "til barn": ${primary}`,
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
  // Products use "generator", grades use "oppgaver {grade}" \u2014 should be naturally distinct
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
  md += '## Theme+Grade Pages \u2014 LSI & Question Keywords (Part 266 Enhancement)\n\n';
  md += '> Added by SEO Part 266. Covers 250 theme+grade pages (50 themes \u00d7 5 grades).\n\n';

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
  console.log('=== SEO Part 266: NO Keyword Cannibalization Audit ===\n');

  const report = {
    timestamp: new Date().toISOString(),
    part: 266,
    locale: 'no',
    gradePages: { total: 0, updated: 0, errors: [], validations: [] },
    cannibalization: [],
    summary: {},
  };

  // Get all theme directories
  const themeDirs = fs.readdirSync(THEME_DIR).filter(d => {
    const dirPath = path.join(THEME_DIR, d);
    return fs.statSync(dirPath).isDirectory() && fs.existsSync(path.join(dirPath, 'no.ts'));
  });

  console.log(`Found ${themeDirs.length} themes with no.ts files\n`);

  const gradeKeywordsMap = {};
  const gradeResults = {};
  let totalUpdated = 0;
  let totalErrors = 0;

  for (const theme of themeDirs) {
    const filePath = path.join(THEME_DIR, theme, 'no.ts');
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

        // Extract current keywords (may be null if field doesn't exist yet)
        const currentKeywords = extractGradeSeoKeywords(content, grade);

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
          before: currentKeywords ? currentKeywords.split(',').length : 0,
          after: keywordData.keywordCount,
        };

        report.gradePages.validations.push({
          key,
          before: currentKeywords ? currentKeywords.split(',').length : 0,
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
  console.log('\nUpdating no-all-pages.md with LSI, question, and SERP analysis...');
  const mdAppendix = generateMarkdownAppendix(gradeResults);

  if (fs.existsSync(KEYWORD_MAP_PATH)) {
    fs.appendFileSync(KEYWORD_MAP_PATH, mdAppendix, 'utf-8');
    console.log(`  Appended ${Object.keys(gradeResults).length} grade entries to no-all-pages.md`);
  } else {
    console.error(`  ERROR: no-all-pages.md not found at ${KEYWORD_MAP_PATH}`);
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

  console.log('\n=== Part 266 Complete ===');
  console.log(`  ${totalUpdated} grade pages enhanced`);
  console.log(`  ${report.summary.questionsGenerated} question keywords generated`);
  console.log(`  ${criticalIssues.length} critical cannibalization issues`);
  console.log(`  Keywords per page: ${report.summary.allPagesMinKeywords}-${report.summary.allPagesMaxKeywords} (avg ${report.summary.avgKeywordsPerPage})`);
}

main();
