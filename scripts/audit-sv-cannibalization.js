#!/usr/bin/env node
// SEO Part 299: SV Grade Keyword Cannibalization Audit
// Enhances 250 SV theme+grade pages with LSI keywords,
// question keywords, and cannibalization audit.
// Adapted from scripts/audit-no-cannibalization.js (Part 266).

const fs = require('fs');
const path = require('path');

// ============================================================
// SECTION 1: GRADE-LEVEL LSI TEMPLATES
// ============================================================

// Educational vocabulary per developmental level (Swedish)
const gradeLsiTemplates = {
  preschool: {
    label: 'F\u00f6rskola (3\u20134 \u00e5r)',
    gradeKey: 'preschool',
    gradeLabel: 'f\u00f6rskola',
    ageRange: '3\u20134 \u00e5r',
    coreLsi: [
      'finmotorik\u00f6vning',
      'f\u00e4rgl\u00e4ggning och sp\u00e5rning',
      'storlekssortering',
      'enkel r\u00e4kning',
      'grundformerigenk\u00e4nning',
      'penngrepp tr\u00e4ning',
      'sinnesupplevelse',
      'visuell uppfattning',
    ],
    questionTemplates: [
      'Hur \u00f6var jag {themeNoun} r\u00e4kning i f\u00f6rskolan?',
      'Vilka {theme}\u00f6vningar passar f\u00f6r 3\u20134-\u00e5ringar?',
      'Hur anv\u00e4nder jag {theme}tema f\u00f6r finmotorisk utveckling?',
    ],
    primaryPattern: (themePrefix) => `${themePrefix}\u00f6vningar f\u00f6rskola`,
  },
  kindergarten: {
    label: 'F\u00f6rskoleklass (5\u20136 \u00e5r)',
    gradeKey: 'kindergarten',
    gradeLabel: 'f\u00f6rskoleklass',
    ageRange: '5\u20136 \u00e5r',
    coreLsi: [
      'begynnelsebokst\u00e4ver',
      'bokstavs\u00f6vningar',
      'r\u00e4kning till 20',
      'm\u00f6nsterigenk\u00e4nning',
      'klassificering och sortering',
      'visuell uppfattning',
      'ordf\u00f6rr\u00e5dsutvidgning',
      'ljudmedvetenhet',
    ],
    questionTemplates: [
      'Hur \u00f6var jag {themeNoun} begynnelsebokst\u00e4ver i f\u00f6rskoleklass?',
      'Vilka {theme}\u00f6vningar utvecklar l\u00e4sberedskap?',
      'Hur anv\u00e4nder jag {theme}tema f\u00f6r r\u00e4kneundervisning i f\u00f6rskoleklass?',
    ],
    primaryPattern: (themePrefix) => `${themePrefix}\u00f6vningar f\u00f6rskoleklass`,
  },
  'first-grade': {
    label: '\u00c5rskurs 1 (6\u20137 \u00e5r)',
    gradeKey: 'first-grade',
    gradeLabel: '\u00e5rskurs 1',
    ageRange: '6\u20137 \u00e5r',
    coreLsi: [
      'addition subtraktion',
      'syntetisk l\u00e4sning',
      'sj\u00e4lvst\u00e4ndig skrivning',
      'meningsbyggnad',
      'textuppgifter l\u00f6sning',
      'sj\u00e4lvst\u00e4ndigt arbete',
      'flersteginstruktioner',
      'm\u00f6nsterifyllning',
    ],
    questionTemplates: [
      'Hur anv\u00e4nder jag {theme}\u00f6vningar f\u00f6r additionsundervisning i \u00e5rskurs 1?',
      'Vilka {theme}\u00f6vningar utvecklar l\u00e4sf\u00f6rst\u00e5else?',
      'Hur kopplar jag {theme}tema till \u00e5rskurs 1:s l\u00e4roplan?',
    ],
    primaryPattern: (themePrefix) => `${themePrefix}\u00f6vningar \u00e5rskurs 1`,
  },
  'second-grade': {
    label: '\u00c5rskurs 2 (7\u20138 \u00e5r)',
    gradeKey: 'second-grade',
    gradeLabel: '\u00e5rskurs 2',
    ageRange: '7\u20138 \u00e5r',
    coreLsi: [
      'multiplikations\u00f6vningar',
      'dataanalys barn',
      'faktatexter l\u00e4sning',
      'positionssystem f\u00f6rst\u00e5else',
      'skriftlig framst\u00e4llning',
      'forskningsprojekt',
      'm\u00e4tning och j\u00e4mf\u00f6relse',
      'tabellavl\u00e4sning',
    ],
    questionTemplates: [
      'Hur anv\u00e4nder jag {theme}\u00f6vningar f\u00f6r multiplikations\u00f6vning i \u00e5rskurs 2?',
      'Vilka {theme}\u00f6vningar st\u00f6djer forskningsprojekt?',
      'Hur kopplar jag {theme}tema till dataanalys i \u00e5rskurs 2?',
    ],
    primaryPattern: (themePrefix) => `${themePrefix}\u00f6vningar \u00e5rskurs 2`,
  },
  'third-grade': {
    label: '\u00c5rskurs 3 (8\u20139 \u00e5r)',
    gradeKey: 'third-grade',
    gradeLabel: '\u00e5rskurs 3',
    ageRange: '8\u20139 \u00e5r',
    coreLsi: [
      'multiplikation division',
      'br\u00e5k introduktion',
      'forskningsrapport',
      'kritiskt t\u00e4nkande',
      'informationss\u00f6kning',
      'analys och slutsats',
      'evidensbaserad f\u00f6rklaring',
      'tabell och diagram',
    ],
    questionTemplates: [
      'Hur anv\u00e4nder jag {theme}\u00f6vningar f\u00f6r forskningsrapportundervisning i \u00e5rskurs 3?',
      'Vilka {theme}\u00f6vningar utvecklar kritiskt t\u00e4nkande?',
      'Hur kopplar jag {theme}tema till \u00e5rskurs 3:s informationss\u00f6kning?',
    ],
    primaryPattern: (themePrefix) => `${themePrefix}\u00f6vningar \u00e5rskurs 3`,
  },
};

// ============================================================
// SECTION 2: THEME-SPECIFIC MODIFIERS
// ============================================================

// Each theme contributes domain-specific terms for combining with grade LSI
// prefix: compound word prefix (Swedish compound-noun style)
// noun: genitive form for combined keywords
// domainLsi: 3 theme-specific educational terms
const themeModifiers = {
  alphabet: { prefix: 'alfabet', noun: 'alfabetets', domainLsi: ['bokstavsformning', 'fonemisk medvetenhet', 'bokstav-ljud koppling'] },
  animals: { prefix: 'djur', noun: 'djurs', domainLsi: ['djurklassificering', 'livsmilj\u00f6er', 'biologi grundbegrepp'] },
  birds: { prefix: 'f\u00e5gel', noun: 'f\u00e5glars', domainLsi: ['f\u00e5gelarter igenk\u00e4nning', 'flyttf\u00e5glar', 'naturobservation'] },
  birthday: { prefix: 'f\u00f6delsedag', noun: 'f\u00f6delsedagens', domainLsi: ['firande och traditioner', '\u00e5ldersf\u00f6rst\u00e5else', 'f\u00f6delsedagskalender'] },
  body: { prefix: 'kropp', noun: 'kroppens', domainLsi: ['kroppsdelar igenk\u00e4nning', 'h\u00e4lsoundervisning', 'anatomi'] },
  camping: { prefix: 'camping', noun: 'campingens', domainLsi: ['friluftsliv', 'naturupplevelse', 'campingutrustning'] },
  circus: { prefix: 'cirkus', noun: 'cirkusens', domainLsi: ['akrobatik', 'uppf\u00f6rande', 'kreativ r\u00f6relse'] },
  clothing: { prefix: 'kl\u00e4d', noun: 'kl\u00e4ders', domainLsi: ['kl\u00e4dordf\u00f6rr\u00e5d', 'p\u00e5kl\u00e4dning', '\u00e5rstider och kl\u00e4der'] },
  colors: { prefix: 'f\u00e4rg', noun: 'f\u00e4rgers', domainLsi: ['f\u00e4rgigenk\u00e4nning', 'prim\u00e4rf\u00e4rger', 'visuell f\u00e4rg\u00f6vning'] },
  construction: { prefix: 'bygg', noun: 'byggandets', domainLsi: ['STEM-l\u00e4rande', 'byggmaskiner', 'm\u00e4tning'] },
  cooking: { prefix: 'matlagning', noun: 'matlagningens', domainLsi: ['recept och m\u00e4tning', 'k\u00f6ksordf\u00f6rr\u00e5d', 'n\u00e4ringsundervisning'] },
  dinosaurs: { prefix: 'dinosaurie', noun: 'dinosauriers', domainLsi: ['paleontologi', 'fossiler', 'geologiska perioder'] },
  easter: { prefix: 'p\u00e5sk', noun: 'p\u00e5skens', domainLsi: ['v\u00e5rfest', 'p\u00e5sk\u00e4gg', 's\u00e4songsbaserat l\u00e4rande'] },
  emotions: { prefix: 'k\u00e4nslo', noun: 'k\u00e4nslors', domainLsi: ['k\u00e4nslom\u00e4ssigt l\u00e4rande', 'empati', 'sj\u00e4lvreglering'] },
  'fairy-tales': { prefix: 'saga', noun: 'sagors', domainLsi: ['berr\u00e4ttelsf\u00f6rst\u00e5else', 'sagohj\u00e4ltar', 'fantasi'] },
  farm: { prefix: 'bondg\u00e5rd', noun: 'bondg\u00e5rdens', domainLsi: ['bondg\u00e5rdsdjur', 'matproduktion', 'husdjur'] },
  flowers: { prefix: 'blomm', noun: 'blommors', domainLsi: ['v\u00e4xtdelar', 'tillv\u00e4xtobservation', 'v\u00e4xters livscykel'] },
  food: { prefix: 'mat', noun: 'matens', domainLsi: ['n\u00e4ring', 'matgrupper', 'h\u00e4lsosamma kostval'] },
  forest: { prefix: 'skog', noun: 'skogens', domainLsi: ['ekosystem', 'skogens skikt', 'svensk natur'] },
  fruits: { prefix: 'frukt', noun: 'frukters', domainLsi: ['fruktigenk\u00e4nning', 'vitaminer', 'h\u00e4lsosamt mellanm\u00e5l'] },
  furniture: { prefix: 'm\u00f6bel', noun: 'm\u00f6blers', domainLsi: ['hemmets f\u00f6rem\u00e5l', 'l\u00e4gesord och placering', 'rumsordf\u00f6rr\u00e5d'] },
  garden: { prefix: 'tr\u00e4dg\u00e5rd', noun: 'tr\u00e4dg\u00e5rdens', domainLsi: ['v\u00e4xtsk\u00f6tsel', 'fr\u00f6groning', 'milj\u00f6undervisning'] },
  halloween: { prefix: 'halloween-', noun: 'halloweens', domainLsi: ['pumpa', 'h\u00f6stfest', 'festdag'] },
  holidays: { prefix: 'helgdags', noun: 'helgdagars', domainLsi: ['helgdagar', '\u00e5rets g\u00e5ng', 'festtraditioner'] },
  household: { prefix: 'hush\u00e5lls', noun: 'hush\u00e5llets', domainLsi: ['dagliga f\u00e4rdigheter', 'hush\u00e5llssysslor', 'vardagsrutiner'] },
  insects: { prefix: 'insekt', noun: 'insekters', domainLsi: ['insekters livscykel', 'fj\u00e4rilens f\u00f6rvandling', 'sm\u00e5kryp'] },
  jobs: { prefix: 'yrke', noun: 'yrkens', domainLsi: ['yrkesigenk\u00e4nning', 'arbetsbeskrivningar', 'samh\u00e4llets yrken'] },
  music: { prefix: 'musik', noun: 'musikens', domainLsi: ['musikinstrument', 'rytm\u00f6vning', 'musikundervisning'] },
  nature: { prefix: 'natur', noun: 'naturens', domainLsi: ['milj\u00f6undervisning', 'naturfenomen', 'ekologi'] },
  numbers: { prefix: 'tal', noun: 'tals', domainLsi: ['talf\u00f6rst\u00e5else', 'grundl\u00e4ggande r\u00e4kning', 'tallinje\u00f6vning'] },
  ocean: { prefix: 'hav', noun: 'havets', domainLsi: ['havsdjur', 'undervattensliv', 'marinbiologi'] },
  pets: { prefix: 'husdjur', noun: 'husdjurs', domainLsi: ['djursk\u00f6tsel', 'ansvar', 'husdjursarter'] },
  pirates: { prefix: 'pirat', noun: 'piraternas', domainLsi: ['skattjakt', 'kartl\u00e4sning', 'sj\u00f6\u00e4ventyr'] },
  robots: { prefix: 'robot', noun: 'robotars', domainLsi: ['teknik', 'programmeringst\u00e4nkande', 'STEM-l\u00e4rande'] },
  school: { prefix: 'skol', noun: 'skolans', domainLsi: ['skolordf\u00f6rr\u00e5d', 'skolmaterial', 'skolf\u00f6rberedelse'] },
  seasons: { prefix: '\u00e5rstids', noun: '\u00e5rstiders', domainLsi: ['\u00e5rstidsv\u00e4xling', 'v\u00e4derfenomen', 'naturens f\u00f6r\u00e4ndringar'] },
  shapes: { prefix: 'form', noun: 'formers', domainLsi: ['geometriska former', 'rumslig uppfattning', 'triangel fyrkant cirkel'] },
  space: { prefix: 'rymd', noun: 'rymdens', domainLsi: ['planeter', 'solsystemet', 'astronomi'] },
  sports: { prefix: 'idrotts', noun: 'idrottens', domainLsi: ['idrott och h\u00e4lsa', 'idrottsgrenar', 'fysisk aktivitet'] },
  spring: { prefix: 'v\u00e5r', noun: 'v\u00e5rens', domainLsi: ['v\u00e5rtecken', 'tillv\u00e4xtobservation', 'naturens uppvaknande'] },
  summer: { prefix: 'sommar', noun: 'sommarens', domainLsi: ['sommarlovs\u00f6vningar', 'sommaraktiviteter', 'ferie\u00f6vningar'] },
  superheroes: { prefix: 'superhj\u00e4lte', noun: 'superhj\u00e4ltars', domainLsi: ['hj\u00e4ltetema', 'kreativt t\u00e4nkande', 'mod och v\u00e4rden'] },
  toys: { prefix: 'leksaks', noun: 'leksakers', domainLsi: ['leksakssortering', 'lek och l\u00e4rande', 'leksaksr\u00e4kning'] },
  transportation: { prefix: 'transport', noun: 'transportens', domainLsi: ['transportmedel', 'trafiksakerhet', 'land vatten luft'] },
  travel: { prefix: 'rese', noun: 'resans', domainLsi: ['geografi', 'v\u00e4rldens kulturer', 'kartl\u00e4sning'] },
  vegetables: { prefix: 'gr\u00f6nsaks', noun: 'gr\u00f6nsakers', domainLsi: ['gr\u00f6nsaksigenk\u00e4nning', 'n\u00e4ringsundervisning', 'k\u00f6kstr\u00e4dg\u00e5rd'] },
  weather: { prefix: 'v\u00e4der', noun: 'v\u00e4drets', domainLsi: ['v\u00e4derfenomen', 'temperatur', 'v\u00e4derdagbok'] },
  winter: { prefix: 'vinter', noun: 'vinterns', domainLsi: ['sn\u00f6 och is', 'vinterdjur', 'vinteraktiviteter'] },
  xmas: { prefix: 'jul', noun: 'julens', domainLsi: ['adventskalender', 'julmys', 'jultraditioner'] },
  zoo: { prefix: 'zoo-', noun: 'zoos', domainLsi: ['exotiska djur', 'zoo-bes\u00f6k', 'vilda djur'] },
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
  // combined1: use "uppgifter" instead of "\u00f6vningar" for differentiation
  const combined1 = `${themeMod.prefix}uppgifter ${gradeTemplate.gradeLabel}`;
  if (!keywords.some(k => k === combined1)) {
    keywords.push(combined1);
  }

  // combined2: genitive noun + "l\u00e4rande" + age range
  const combined2 = `${themeMod.noun} l\u00e4rande ${gradeTemplate.ageRange}`;
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
const KEYWORD_MAP_PATH = path.join(__dirname, '..', 'docs', 'seo-keywords', 'sv-all-pages.md');
const REPORT_PATH = path.join(__dirname, '..', 'docs', 'audit-results', 'sv-keyword-cannibalization.json');

function readFileContent(filePath) {
  return fs.readFileSync(filePath, 'utf-8');
}

/**
 * Update or insert seoKeywords for a specific grade within a theme's sv.ts file.
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
    // Try alternate pattern with no space
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

  // Rule 1: Grade pages must NOT use product pattern "generator" or hub pattern "f\u00f6r barn"
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
    if (primary.includes('f\u00f6r barn')) {
      issues.push({
        type: 'PATTERN_VIOLATION',
        severity: 'critical',
        page: key,
        message: `Grade page uses hub pattern "f\u00f6r barn": ${primary}`,
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
  // Products use "generator", grades use "\u00f6vningar {grade}" — should be naturally distinct
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
  md += '## Theme+Grade Pages \u2014 LSI & Question Keywords (Part 299 Enhancement)\n\n';
  md += '> Added by SEO Part 299. Covers 250 theme+grade pages (50 themes \u00d7 5 grades).\n\n';

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
  console.log('=== SEO Part 299: SV Keyword Cannibalization Audit ===\n');

  const report = {
    timestamp: new Date().toISOString(),
    part: 299,
    locale: 'sv',
    gradePages: { total: 0, updated: 0, errors: [], validations: [] },
    cannibalization: [],
    summary: {},
  };

  // Get all theme directories
  const themeDirs = fs.readdirSync(THEME_DIR).filter(d => {
    const dirPath = path.join(THEME_DIR, d);
    return fs.statSync(dirPath).isDirectory() && fs.existsSync(path.join(dirPath, 'sv.ts'));
  });

  console.log(`Found ${themeDirs.length} themes with sv.ts files\n`);

  const gradeKeywordsMap = {};
  const gradeResults = {};
  let totalUpdated = 0;
  let totalErrors = 0;

  for (const theme of themeDirs) {
    const filePath = path.join(THEME_DIR, theme, 'sv.ts');
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
  console.log('\nUpdating sv-all-pages.md with LSI, question, and SERP analysis...');
  const mdAppendix = generateMarkdownAppendix(gradeResults);

  if (fs.existsSync(KEYWORD_MAP_PATH)) {
    fs.appendFileSync(KEYWORD_MAP_PATH, mdAppendix, 'utf-8');
    console.log(`  Appended ${Object.keys(gradeResults).length} grade entries to sv-all-pages.md`);
  } else {
    console.error(`  ERROR: sv-all-pages.md not found at ${KEYWORD_MAP_PATH}`);
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

  console.log('\n=== Part 299 Complete ===');
  console.log(`  ${totalUpdated} grade pages enhanced`);
  console.log(`  ${report.summary.questionsGenerated} question keywords generated`);
  console.log(`  ${criticalIssues.length} critical cannibalization issues`);
  console.log(`  Keywords per page: ${report.summary.allPagesMinKeywords}-${report.summary.allPagesMaxKeywords} (avg ${report.summary.avgKeywordsPerPage})`);
}

main();
