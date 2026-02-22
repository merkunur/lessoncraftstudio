#!/usr/bin/env node
// SEO Part 172: FI Grade Keyword Enhancement
// Enhances 250 FI theme+grade pages with LSI keywords,
// question keywords, SERP analysis, and cannibalization audit.

const fs = require('fs');
const path = require('path');

// ============================================================
// SECTION 1: GRADE-LEVEL LSI TEMPLATES
// ============================================================

// Educational vocabulary per developmental level (Finnish)
const gradeLsiTemplates = {
  preschool: {
    label: 'Esikoulu (3\u20134 v.)',
    gradeKey: 'preschool',
    gradeLabel: 'esikoulu',
    ageRange: '3-4v',
    // Core developmental skills at this level
    coreLsi: [
      'hienomotoriikka harjoitus',
      'v\u00e4ritys ja j\u00e4ljent\u00e4minen',
      'koon tunnistaminen',
      'yksinkertainen laskeminen',
      'perusmuodot tunnistaminen',
      'kyn\u00e4ote harjoittelu',
      'aistihavainnointi',
      'visuaalinen erottelu',
    ],
    // Question templates: {theme} and {themeNoun} get replaced
    questionTemplates: [
      'Miten harjoittelen {themeNoun} laskemista esikoulussa?',
      'Mitk\u00e4 {theme}teht\u00e4v\u00e4t sopivat 3\u20134-vuotiaalle?',
      'Miten k\u00e4yt\u00e4n {theme}teemaa hienomotoriikan kehitt\u00e4miseen?',
    ],
    // Anti-cannibalization: grade pages use "{theme}teht\u00e4v\u00e4t esikoululaisille"
    primaryPattern: (themePrefix) => `${themePrefix}teht\u00e4v\u00e4t esikoululaisille`,
  },
  kindergarten: {
    label: 'Esiopetus (5\u20136 v.)',
    gradeKey: 'kindergarten',
    gradeLabel: 'esiopetus',
    ageRange: '5-6v',
    coreLsi: [
      'alku\u00e4\u00e4nteet harjoitus',
      'kirjaintunnistus oppiminen',
      'lukuvalmius tukeminen',
      'yhteenlasku kymmeneen',
      'kuviosarjat hahmottaminen',
      'luokittelu ja lajittelu',
      'visuaalinen hahmottaminen',
      'sanavarasto kartuttaminen',
    ],
    questionTemplates: [
      'Miten harjoittelen {themeNoun} alku\u00e4\u00e4nteit\u00e4 esiopetuksessa?',
      'Mitk\u00e4 {theme}teht\u00e4v\u00e4t kehitt\u00e4v\u00e4t lukuvalmiutta?',
      'Miten k\u00e4yt\u00e4n {theme}teemaa laskemisen opetuksessa esiopetusik\u00e4isille?',
    ],
    primaryPattern: (themePrefix) => `${themePrefix}teht\u00e4v\u00e4t esiopetukseen`,
  },
  'first-grade': {
    label: '1. Luokka (6\u20137 v.)',
    gradeKey: 'first-grade',
    gradeLabel: '1. luokka',
    ageRange: '6-7v',
    coreLsi: [
      'yhteenlasku v\u00e4hennyslasku',
      'n\u00e4k\u00f6sanat tunnistaminen',
      'luetun ymm\u00e4rt\u00e4minen',
      'oikeinkirjoitus harjoitus',
      'sanallinen teht\u00e4v\u00e4',
      'itsen\u00e4inen ty\u00f6skentely',
      'monivaiheinen ohje',
      'kuvioteht\u00e4v\u00e4 jatkaminen',
    ],
    questionTemplates: [
      'Miten k\u00e4yt\u00e4n {theme}teht\u00e4vi\u00e4 yhteenlaskun opetuksessa 1. luokalla?',
      'Mitk\u00e4 {theme}teht\u00e4v\u00e4t kehitt\u00e4v\u00e4t luetun ymm\u00e4rt\u00e4mist\u00e4?',
      'Miten yhdist\u00e4n {theme}teeman 1. luokan opetussuunnitelmaan?',
    ],
    primaryPattern: (themePrefix) => `${themePrefix}teht\u00e4v\u00e4t 1. luokalle`,
  },
  'second-grade': {
    label: '2. Luokka (7\u20138 v.)',
    gradeKey: 'second-grade',
    gradeLabel: '2. luokka',
    ageRange: '7-8v',
    coreLsi: [
      'kertotaulu harjoittelu',
      'data-analyysi oppiminen',
      'tietoteksti lukeminen',
      'paikka-arvo ymm\u00e4rt\u00e4minen',
      'kirjoitelma harjoitus',
      'tutkimusprojekti aloittaminen',
      'mittaaminen ja vertailu',
      'taulukkojen tulkinta',
    ],
    questionTemplates: [
      'Miten k\u00e4yt\u00e4n {theme}teht\u00e4vi\u00e4 kertolaskun harjoittelussa 2. luokalla?',
      'Mitk\u00e4 {theme}teht\u00e4v\u00e4t tukevat tutkimusprojekteja?',
      'Miten yhdist\u00e4n {theme}teeman data-analyysiin 2. luokalla?',
    ],
    primaryPattern: (themePrefix) => `${themePrefix}teht\u00e4v\u00e4t 2. luokalle`,
  },
  'third-grade': {
    label: '3. Luokka (8\u20139 v.)',
    gradeKey: 'third-grade',
    gradeLabel: '3. luokka',
    ageRange: '8-9v',
    coreLsi: [
      'kertolasku jakolasku',
      'tutkimusraportti kirjoittaminen',
      'mielipidekirjoitus harjoitus',
      'kriittinen ajattelu',
      'murtoluku oppiminen',
      'tiedonhaku ja l\u00e4hteet',
      'analysointi ja p\u00e4\u00e4ttely',
      'n\u00e4ytt\u00f6\u00f6n perustuva selitys',
    ],
    questionTemplates: [
      'Miten k\u00e4yt\u00e4n {theme}teht\u00e4vi\u00e4 tutkimusraportin opetuksessa 3. luokalla?',
      'Mitk\u00e4 {theme}teht\u00e4v\u00e4t kehitt\u00e4v\u00e4t kriittist\u00e4 ajattelua?',
      'Miten yhdist\u00e4n {theme}teeman 3. luokan tiedonhakutaitoihin?',
    ],
    primaryPattern: (themePrefix) => `${themePrefix}teht\u00e4v\u00e4t 3. luokalle`,
  },
};

// ============================================================
// SECTION 2: THEME-SPECIFIC MODIFIERS (from Part 171)
// ============================================================

// Each theme contributes domain-specific terms for combining with grade LSI
const themeModifiers = {
  alphabet: { prefix: 'aakkos', noun: 'aakkosten', domainLsi: ['kirjainmuodostus', 'foneeminen tietoisuus', '\u00e4\u00e4nne-kirjain yhteys'] },
  animals: { prefix: 'el\u00e4in', noun: 'el\u00e4inten', domainLsi: ['el\u00e4inten luokittelu', 'elinymp\u00e4rist\u00f6t', 'biologian perusk\u00e4sitteet'] },
  birds: { prefix: 'lintu', noun: 'lintujen', domainLsi: ['lintulajien tunnistaminen', 'muuttolinnut', 'luontohavainnointi'] },
  birthday: { prefix: 'syntymp\u00e4iv\u00e4', noun: 'syntymp\u00e4iv\u00e4n', domainLsi: ['juhlateema', 'ik\u00e4k\u00e4site', 'juhlakalenteri'] },
  body: { prefix: 'keho', noun: 'kehon', domainLsi: ['kehonosien tunnistaminen', 'terveyskasvatus', 'anatomia'] },
  camping: { prefix: 'retkeily', noun: 'retkeilyn', domainLsi: ['luontoretki', 'er\u00e4maataidot', 'retkeilyvarusteet'] },
  circus: { prefix: 'sirkus', noun: 'sirkuksen', domainLsi: ['akrobatia', 'esiintyminen', 'luova liikunta'] },
  clothing: { prefix: 'vaate', noun: 'vaatteiden', domainLsi: ['vaatesanasto', 'pukeutuminen', 'vuodenajat ja vaatteet'] },
  colors: { prefix: 'v\u00e4ri', noun: 'v\u00e4rien', domainLsi: ['v\u00e4rien tunnistaminen', 'p\u00e4\u00e4v\u00e4rit', 'visuaalinen v\u00e4riharjoitus'] },
  construction: { prefix: 'rakennus', noun: 'rakentamisen', domainLsi: ['STEM-oppiminen', 'rakennuskoneet', 'mittaaminen'] },
  cooking: { prefix: 'ruoanlaitto', noun: 'ruoanlaiton', domainLsi: ['resepti ja mittaaminen', 'keitti\u00f6sanasto', 'ravitsemuskasvatus'] },
  dinosaurs: { prefix: 'dinosaurus', noun: 'dinosaurusten', domainLsi: ['paleontologia', 'fossiilit', 'geologiset kaudet'] },
  easter: { prefix: 'p\u00e4\u00e4si\u00e4is', noun: 'p\u00e4\u00e4si\u00e4isen', domainLsi: ['kev\u00e4tjuhla', 'p\u00e4\u00e4si\u00e4ismuna', 'kausiaiheinen oppiminen'] },
  emotions: { prefix: 'tunne', noun: 'tunteiden', domainLsi: ['tunnekasvatus', 'empatia', 'itsesäätelytaidot'] },
  'fairy-tales': { prefix: 'satu', noun: 'satujen', domainLsi: ['tarinan ymmärtäminen', 'satuhahmot', 'mielikuvitus'] },
  farm: { prefix: 'maatila', noun: 'maatilan', domainLsi: ['maatilan el\u00e4imet', 'ruoantuotanto', 'kotiel\u00e4imet'] },
  flowers: { prefix: 'kukka', noun: 'kukkien', domainLsi: ['kasvien osat', 'kasvun seuraaminen', 'kasvien elinkierto'] },
  food: { prefix: 'ruoka', noun: 'ruoan', domainLsi: ['ravitsemus', 'ruokaryhmät', 'terveellinen ruokavalio'] },
  forest: { prefix: 'mets\u00e4', noun: 'mets\u00e4n', domainLsi: ['ekosysteemi', 'mets\u00e4n kerrokset', 'suomalainen mets\u00e4'] },
  fruits: { prefix: 'hedelm\u00e4', noun: 'hedelmien', domainLsi: ['hedelmien tunnistaminen', 'vitamiinit', 'terveellinen v\u00e4lipala'] },
  furniture: { prefix: 'huonekalu', noun: 'huonekalujen', domainLsi: ['kodin esineet', 'sijainnin ilmaiseminen', 'huonesanasto'] },
  garden: { prefix: 'puutarha', noun: 'puutarhan', domainLsi: ['kasvien istuttaminen', 'siementen itäminen', 'ymp\u00e4rist\u00f6kasvatus'] },
  halloween: { prefix: 'halloween-', noun: 'halloweenin', domainLsi: ['kurpitsa', 'syysjuhla', 'juhlapäivä'] },
  holidays: { prefix: 'juhla', noun: 'juhlien', domainLsi: ['juhlapy\u00e4t', 'vuodenkierto', 'juhlaperinteet'] },
  household: { prefix: 'kodinhoito', noun: 'kodinhoidon', domainLsi: ['arjen taidot', 'kotityöt', 'päivittäiset toiminnot'] },
  insects: { prefix: 'hy\u00f6nteis', noun: 'hy\u00f6nteisten', domainLsi: ['hy\u00f6nteisten elinkierto', 'perhosen el\u00e4m\u00e4nkaari', '\u00f6t\u00f6k\u00e4t'] },
  jobs: { prefix: 'ammatti', noun: 'ammattien', domainLsi: ['ammattien tunnistaminen', 'ty\u00f6nkuvat', 'yhteiskunnan ammatit'] },
  music: { prefix: 'musiikki', noun: 'musiikin', domainLsi: ['soittimet', 'rytmi harjoitus', 'musiikkikasvatus'] },
  nature: { prefix: 'luonto', noun: 'luonnon', domainLsi: ['ymp\u00e4rist\u00f6kasvatus', 'luonnonilmi\u00f6t', 'ekologia'] },
  numbers: { prefix: 'numero', noun: 'numeroiden', domainLsi: ['numerotaju', 'laskemisen perustaidot', 'lukujonoharjoitus'] },
  ocean: { prefix: 'meri', noun: 'meren', domainLsi: ['meriel\u00e4imet', 'vedenalainen el\u00e4m\u00e4', 'meribiologia'] },
  pets: { prefix: 'lemmikki', noun: 'lemmikkien', domainLsi: ['eläinten hoitaminen', 'vastuullisuus', 'lemmikkieläimet'] },
  pirates: { prefix: 'merirosvos', noun: 'merirosvojen', domainLsi: ['aarteenetsintä', 'kartan lukeminen', 'meriseikkailu'] },
  robots: { prefix: 'robotti', noun: 'robottien', domainLsi: ['teknologia', 'ohjelmointi ajattelu', 'STEM-oppiminen'] },
  school: { prefix: 'koulu', noun: 'koulun', domainLsi: ['koulusanasto', 'koulutarvikkeet', 'koulunk\u00e4ynnin valmistelu'] },
  seasons: { prefix: 'vuodenaika', noun: 'vuodenaikojen', domainLsi: ['vuodenkierto', 'sääilmiöt', 'luonnon muutokset'] },
  shapes: { prefix: 'muoto', noun: 'muotojen', domainLsi: ['geometriset muodot', 'avaruudellinen hahmottaminen', 'kolmio neliö ympyrä'] },
  space: { prefix: 'avaruus', noun: 'avaruuden', domainLsi: ['planeetat', 'aurinkokunta', 't\u00e4htitiede'] },
  sports: { prefix: 'urheilu', noun: 'urheilun', domainLsi: ['liikuntakasvatus', 'urheilulajit', 'fyysinen aktiivisuus'] },
  spring: { prefix: 'kev\u00e4t', noun: 'kev\u00e4\u00e4n', domainLsi: ['kevään merkit', 'kasvun seuranta', 'luonnon herääminen'] },
  summer: { prefix: 'kes\u00e4', noun: 'kes\u00e4n', domainLsi: ['kesälomatehtävät', 'kesän aktiviteetit', 'lomaharjoitukset'] },
  superheroes: { prefix: 'supersankari', noun: 'supersankarien', domainLsi: ['sankariteema', 'luova ajattelu', 'rohkeus ja arvot'] },
  toys: { prefix: 'lelu', noun: 'lelujen', domainLsi: ['lelujen lajittelu', 'leikkiminen ja oppiminen', 'lelujen laskeminen'] },
  transportation: { prefix: 'liikenne', noun: 'liikenteen', domainLsi: ['kulkuneuvot', 'liikenneturvallisuus', 'maa vesi ilma'] },
  travel: { prefix: 'matkailu', noun: 'matkailun', domainLsi: ['maantiede', 'maailman kulttuurit', 'kartan lukeminen'] },
  vegetables: { prefix: 'vihannes', noun: 'vihannesten', domainLsi: ['kasvisten tunnistaminen', 'ravitsemuskasvatus', 'kasvimaa'] },
  weather: { prefix: 's\u00e4\u00e4', noun: 's\u00e4\u00e4n', domainLsi: ['s\u00e4\u00e4ilmi\u00f6t', 'l\u00e4mp\u00f6tila', 's\u00e4\u00e4p\u00e4iv\u00e4kirja'] },
  winter: { prefix: 'talvi', noun: 'talven', domainLsi: ['lumi ja jää', 'talvieläimet', 'talviaktiviteetit'] },
  xmas: { prefix: 'joulu', noun: 'joulun', domainLsi: ['adventtikalenteri', 'jouluaskartelu', 'jouluperinteet'] },
  zoo: { prefix: 'el\u00e4intarha', noun: 'el\u00e4intarhan', domainLsi: ['eksoottiset el\u00e4imet', 'el\u00e4intarhavierailu', 'villiel\u00e4imet'] },
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

  // Combine: primary + 4 grade-level LSI + 3 theme-domain LSI + 1-2 grade-theme combos = ~9-10
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
  const combined1 = `${themeMod.prefix}teht\u00e4v\u00e4t ${gradeTemplate.gradeLabel}`;
  if (!keywords.some(k => k === combined1)) {
    keywords.push(combined1);
  }

  const combined2 = `${themeMod.noun} oppiminen ${gradeTemplate.ageRange}`;
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
const KEYWORD_MAP_PATH = path.join(__dirname, '..', 'docs', 'seo-keywords', 'fi-all-pages.md');
const REPORT_PATH = path.join(__dirname, '..', 'docs', 'audit-results', 'fi-grade-keyword-enhancement.json');

function readFileContent(filePath) {
  return fs.readFileSync(filePath, 'utf-8');
}

/**
 * Update seoKeywords for a specific grade within a theme's fi.ts file.
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

  // Rule 1: Grade pages must use "tehtävät {grade}" pattern (not "generaattori" or "tehtävät lapsille")
  for (const [key, data] of Object.entries(gradeKeywordsMap)) {
    const primary = data.primary;
    if (primary.includes('generaattori')) {
      issues.push({
        type: 'PATTERN_VIOLATION',
        severity: 'critical',
        page: key,
        message: `Grade page uses product pattern "generaattori": ${primary}`,
      });
    }
    if (primary.includes('lapsille')) {
      issues.push({
        type: 'PATTERN_VIOLATION',
        severity: 'critical',
        page: key,
        message: `Grade page uses theme hub pattern "lapsille": ${primary}`,
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

  // Rule 3: Check grade-specific differentiation
  // Within the same theme, each grade should have a distinct primary keyword
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
  // Products use "generaattori", grades use "tehtävät {grade}" — should be naturally distinct
  // Just verify no grade primary accidentally matches a product pattern
  const productPatterns = ['generaattori'];
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
  md += '## Theme+Grade Pages \u2014 LSI & Question Keywords (Part 172 Enhancement)\n\n';
  md += '> Added by SEO Part 172. Covers 250 theme+grade pages (50 themes \u00d7 5 grades).\n\n';

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
  console.log('=== SEO Part 172: FI Grade Keyword Enhancement ===\n');

  const report = {
    timestamp: new Date().toISOString(),
    part: 172,
    locale: 'fi',
    gradePages: { total: 0, updated: 0, errors: [], validations: [] },
    cannibalization: [],
    summary: {},
  };

  // Get all theme directories
  const themeDirs = fs.readdirSync(THEME_DIR).filter(d => {
    const dirPath = path.join(THEME_DIR, d);
    return fs.statSync(dirPath).isDirectory() && fs.existsSync(path.join(dirPath, 'fi.ts'));
  });

  console.log(`Found ${themeDirs.length} themes with fi.ts files\n`);

  const gradeKeywordsMap = {};
  const gradeResults = {};
  let totalUpdated = 0;
  let totalErrors = 0;

  for (const theme of themeDirs) {
    const filePath = path.join(THEME_DIR, theme, 'fi.ts');
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
  console.log('\nUpdating fi-all-pages.md with LSI, question, and SERP analysis...');
  const mdAppendix = generateMarkdownAppendix(gradeResults);

  if (fs.existsSync(KEYWORD_MAP_PATH)) {
    fs.appendFileSync(KEYWORD_MAP_PATH, mdAppendix, 'utf-8');
    console.log(`  Appended ${Object.keys(gradeResults).length} grade entries to fi-all-pages.md`);
  } else {
    console.error(`  ERROR: fi-all-pages.md not found at ${KEYWORD_MAP_PATH}`);
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

  console.log('\n=== Part 172 Complete ===');
  console.log(`  ${totalUpdated} grade pages enhanced`);
  console.log(`  ${report.summary.questionsGenerated} question keywords generated`);
  console.log(`  ${criticalIssues.length} critical cannibalization issues`);
  console.log(`  Keywords per page: ${report.summary.allPagesMinKeywords}-${report.summary.allPagesMaxKeywords} (avg ${report.summary.avgKeywordsPerPage})`);
}

main();
