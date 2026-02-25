#!/usr/bin/env node
// SEO Part 333: NL Grade Keyword Cannibalization Audit
// Enhances 250 NL theme+grade pages with LSI keywords,
// question keywords, and cannibalization audit.
// Adapted from scripts/audit-sv-cannibalization.js (Part 299).

const fs = require('fs');
const path = require('path');

// ============================================================
// SECTION 1: GRADE-LEVEL LSI TEMPLATES
// ============================================================

// Educational vocabulary per developmental level (Dutch)
const gradeLsiTemplates = {
  preschool: {
    label: 'Kleuterschool (3\u20134 jaar)',
    gradeKey: 'preschool',
    gradeLabel: 'kleuterschool',
    ageRange: '3\u20134 jaar',
    coreLsi: [
      'fijne motoriek oefening',
      'kleuren en overtrekken',
      'sorteren op grootte',
      'eenvoudig tellen',
      'basisvormen herkennen',
      'pengreep oefening',
      'zintuiglijke ervaring',
      'visuele waarneming',
    ],
    questionTemplates: [
      'Hoe oefen ik {themeNoun} tellen op de kleuterschool?',
      'Welke {theme}oefeningen passen bij 3\u20134-jarigen?',
      'Hoe gebruik ik het {theme}thema voor fijne motoriek?',
    ],
    primaryPattern: (themePrefix) => `${themePrefix}oefeningen kleuterschool`,
  },
  kindergarten: {
    label: 'Groep 1-2 (5\u20136 jaar)',
    gradeKey: 'kindergarten',
    gradeLabel: 'groep 1-2',
    ageRange: '5\u20136 jaar',
    coreLsi: [
      'beginletters herkennen',
      'letteroefeningen',
      'tellen tot 20',
      'patroonherkenning',
      'classificatie en sortering',
      'visuele waarneming',
      'woordenschatuitbreiding',
      'klankbewustzijn',
    ],
    questionTemplates: [
      'Hoe gebruik ik {themeNoun} oefeningen voor beginlezen?',
      'Welke {theme}oefeningen ontwikkelen leesvaardigheid?',
      'Hoe gebruik ik het {theme}thema voor rekenonderwijs in groep 1-2?',
    ],
    primaryPattern: (themePrefix) => `${themePrefix}oefeningen groep 1-2`,
  },
  'first-grade': {
    label: 'Groep 3 (6\u20137 jaar)',
    gradeKey: 'first-grade',
    gradeLabel: 'groep 3',
    ageRange: '6\u20137 jaar',
    coreLsi: [
      'optellen en aftrekken',
      'aanvankelijk lezen',
      'zelfstandig schrijven',
      'zinsbouw',
      'redactiesommen',
      'zelfstandig werken',
      'meerstapsinstructies',
      'patrooninvulling',
    ],
    questionTemplates: [
      'Hoe gebruik ik {theme}oefeningen voor optellen in groep 3?',
      'Welke {theme}oefeningen ontwikkelen leesbegrip?',
      'Hoe koppel ik het {theme}thema aan het leerplan van groep 3?',
    ],
    primaryPattern: (themePrefix) => `${themePrefix}oefeningen groep 3`,
  },
  'second-grade': {
    label: 'Groep 4 (7\u20138 jaar)',
    gradeKey: 'second-grade',
    gradeLabel: 'groep 4',
    ageRange: '7\u20138 jaar',
    coreLsi: [
      'tafels oefenen',
      'gegevensanalyse kinderen',
      'informatieve teksten lezen',
      'positiewaarde begrip',
      'schriftelijke taalvaardigheid',
      'onderzoeksproject',
      'meten en vergelijken',
      'tabelaflezen',
    ],
    questionTemplates: [
      'Hoe gebruik ik {theme}oefeningen voor de tafels in groep 4?',
      'Welke {theme}oefeningen ondersteunen onderzoeksprojecten?',
      'Hoe koppel ik het {theme}thema aan gegevensanalyse in groep 4?',
    ],
    primaryPattern: (themePrefix) => `${themePrefix}oefeningen groep 4`,
  },
  'third-grade': {
    label: 'Groep 5 (8\u20139 jaar)',
    gradeKey: 'third-grade',
    gradeLabel: 'groep 5',
    ageRange: '8\u20139 jaar',
    coreLsi: [
      'vermenigvuldigen en delen',
      'breuken introductie',
      'onderzoeksverslag',
      'kritisch denken',
      'begrijpend lezen',
      'informatief schrijven',
      'gegevensverwerking',
      'meten standaardeenheden',
    ],
    questionTemplates: [
      'Hoe gebruik ik {theme}oefeningen voor breuken in groep 5?',
      'Welke {theme}oefeningen ontwikkelen kritisch denken?',
      'Hoe koppel ik het {theme}thema aan begrijpend lezen in groep 5?',
    ],
    primaryPattern: (themePrefix) => `${themePrefix}oefeningen groep 5`,
  },
};

// ============================================================
// SECTION 2: THEME-SPECIFIC MODIFIERS
// ============================================================

// Each theme contributes domain-specific terms for combining with grade LSI
// prefix: compound word prefix (Dutch compound-noun style)
// noun: genitive form for combined keywords
// domainLsi: 3 theme-specific educational terms
const themeModifiers = {
  alphabet: { prefix: 'alfabet', noun: 'alfabet', domainLsi: ['lettervorming', 'fonemisch bewustzijn', 'letter-klank koppeling'] },
  animals: { prefix: 'dieren', noun: 'dieren', domainLsi: ['dierclassificatie', 'leefgebieden', 'biologie basisbegrippen'] },
  birds: { prefix: 'vogel', noun: 'vogels', domainLsi: ['vogelsoorten herkennen', 'trekvogels', 'natuurobservatie'] },
  birthday: { prefix: 'verjaardag', noun: 'verjaardag', domainLsi: ['feest en tradities', 'leeftijdsbegrip', 'verjaardagskalender'] },
  body: { prefix: 'lichaam', noun: 'lichaam', domainLsi: ['lichaamsdelen herkennen', 'gezondheidsonderwijs', 'anatomie'] },
  camping: { prefix: 'camping', noun: 'camping', domainLsi: ['buitenleven', 'natuurbeleving', 'kampeeruitrusting'] },
  circus: { prefix: 'circus', noun: 'circus', domainLsi: ['acrobatiek', 'voorstelling', 'creatieve beweging'] },
  clothing: { prefix: 'kleding', noun: 'kleding', domainLsi: ['kledingwoordenschat', 'aankleden', 'seizoenen en kleding'] },
  colors: { prefix: 'kleuren', noun: 'kleuren', domainLsi: ['kleurherkenning', 'primaire kleuren', 'visuele kleuroefening'] },
  construction: { prefix: 'bouw', noun: 'bouwen', domainLsi: ['STEM-leren', 'bouwmachines', 'meten'] },
  cooking: { prefix: 'kook', noun: 'koken', domainLsi: ['recept en meten', 'keukenwoordenschat', 'voedingsonderwijs'] },
  dinosaurs: { prefix: 'dinosaurus', noun: 'dinosaurus', domainLsi: ['paleontologie', 'fossielen', 'geologische perioden'] },
  easter: { prefix: 'paas', noun: 'Pasen', domainLsi: ['lentefeest', 'paaseieren', 'seizoensgebonden leren'] },
  emotions: { prefix: 'emotie', noun: 'emoties', domainLsi: ['sociaal-emotioneel leren', 'empathie', 'zelfregulatie'] },
  'fairy-tales': { prefix: 'sprookje', noun: 'sprookjes', domainLsi: ['verhaalbegrip', 'sprookjeshelden', 'fantasie'] },
  farm: { prefix: 'boerderij', noun: 'boerderij', domainLsi: ['boerderijdieren', 'voedselproductie', 'huisdieren'] },
  flowers: { prefix: 'bloemen', noun: 'bloemen', domainLsi: ['plantonderdelen', 'groeiobservatie', 'levenscyclus planten'] },
  food: { prefix: 'eten', noun: 'eten', domainLsi: ['voeding', 'voedselgroepen', 'gezonde voedingskeuzes'] },
  forest: { prefix: 'bos', noun: 'bos', domainLsi: ['ecosysteem', 'boslagen', 'Nederlandse natuur'] },
  fruits: { prefix: 'fruit', noun: 'fruit', domainLsi: ['fruitherkenning', 'vitaminen', 'gezond tussendoortje'] },
  furniture: { prefix: 'meubel', noun: 'meubels', domainLsi: ['huishoudelijke voorwerpen', 'plaatswoorden en positie', 'kamerwoordenschat'] },
  garden: { prefix: 'tuin', noun: 'tuin', domainLsi: ['plantverzorging', 'zaadontkieming', 'milieu-educatie'] },
  halloween: { prefix: 'halloween', noun: 'Halloween', domainLsi: ['pompoen', 'herfstfeest', 'feestdag'] },
  holidays: { prefix: 'feestdag', noun: 'feestdagen', domainLsi: ['feestdagen', 'jaarkalender', 'feesttradities'] },
  household: { prefix: 'huishoud', noun: 'huishouden', domainLsi: ['dagelijkse vaardigheden', 'huishoudtaken', 'dagelijkse routines'] },
  insects: { prefix: 'insecten', noun: 'insecten', domainLsi: ['insectenlevenscyclus', 'vlindermetamorfose', 'kleine beestjes'] },
  jobs: { prefix: 'beroepen', noun: 'beroepen', domainLsi: ['beroepenherkenning', 'functiebeschrijvingen', 'beroepen in de maatschappij'] },
  music: { prefix: 'muziek', noun: 'muziek', domainLsi: ['muziekinstrumenten', 'ritmeoefening', 'muziekonderwijs'] },
  nature: { prefix: 'natuur', noun: 'natuur', domainLsi: ['milieu-educatie', 'natuurverschijnselen', 'ecologie'] },
  numbers: { prefix: 'cijfer', noun: 'cijfers', domainLsi: ['getalbegrip', 'basis rekenen', 'getallenlijn oefening'] },
  ocean: { prefix: 'oceaan', noun: 'oceaan', domainLsi: ['zeedieren', 'onderwaterleven', 'mariene biologie'] },
  pets: { prefix: 'huisdier', noun: 'huisdieren', domainLsi: ['dierenverzorging', 'verantwoordelijkheid', 'huisdiersoorten'] },
  pirates: { prefix: 'piraten', noun: 'piraten', domainLsi: ['schattenjacht', 'kaartlezen', 'zeeavontuur'] },
  robots: { prefix: 'robot', noun: 'robots', domainLsi: ['techniek', 'programmeerdenken', 'STEM-leren'] },
  school: { prefix: 'school', noun: 'school', domainLsi: ['schoolwoordenschat', 'schoolbenodigdheden', 'schoolvoorbereiding'] },
  seasons: { prefix: 'seizoen', noun: 'seizoenen', domainLsi: ['seizoenswisseling', 'weerverschijnselen', 'veranderingen in de natuur'] },
  shapes: { prefix: 'vormen', noun: 'vormen', domainLsi: ['geometrische vormen', 'ruimtelijk inzicht', 'driehoek vierkant cirkel'] },
  space: { prefix: 'ruimte', noun: 'ruimte', domainLsi: ['planeten', 'zonnestelsel', 'astronomie'] },
  sports: { prefix: 'sport', noun: 'sport', domainLsi: ['sport en gezondheid', 'sportsoorten', 'fysieke activiteit'] },
  spring: { prefix: 'lente', noun: 'lente', domainLsi: ['lentetekens', 'groeiobservatie', 'ontwaken van de natuur'] },
  summer: { prefix: 'zomer', noun: 'zomer', domainLsi: ['zomervakantie oefeningen', 'zomeractiviteiten', 'vakantie oefeningen'] },
  superheroes: { prefix: 'superheld', noun: 'superhelden', domainLsi: ['heldenthema', 'creatief denken', 'moed en waarden'] },
  toys: { prefix: 'speelgoed', noun: 'speelgoed', domainLsi: ['speelgoedsorteren', 'spelen en leren', 'speelgoed tellen'] },
  transportation: { prefix: 'vervoer', noun: 'vervoer', domainLsi: ['vervoersmiddelen', 'verkeersveiligheid', 'land water lucht'] },
  travel: { prefix: 'reis', noun: 'reizen', domainLsi: ['aardrijkskunde', 'wereldculturen', 'kaartlezen'] },
  vegetables: { prefix: 'groente', noun: 'groenten', domainLsi: ['groenteherkenning', 'voedingsonderwijs', 'moestuin'] },
  weather: { prefix: 'weer', noun: 'weer', domainLsi: ['weerverschijnselen', 'temperatuur', 'weerdagboek'] },
  winter: { prefix: 'winter', noun: 'winter', domainLsi: ['sneeuw en ijs', 'winterdieren', 'winteractiviteiten'] },
  xmas: { prefix: 'kerst', noun: 'Kerstmis', domainLsi: ['adventskalender', 'kerstgezelligheid', 'kersttradities'] },
  zoo: { prefix: 'dierentuin', noun: 'dierentuin', domainLsi: ['exotische dieren', 'dierentuinbezoek', 'wilde dieren'] },
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
  // combined1: use "werkbladen" instead of "oefeningen" for differentiation
  const combined1 = `${themeMod.prefix}werkbladen ${gradeTemplate.gradeLabel}`;
  if (!keywords.some(k => k === combined1)) {
    keywords.push(combined1);
  }

  // combined2: genitive noun + "leren" + age range
  const combined2 = `${themeMod.noun} leren ${gradeTemplate.ageRange}`;
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
const KEYWORD_MAP_PATH = path.join(__dirname, '..', 'docs', 'seo-keywords', 'nl-all-pages.md');
const REPORT_PATH = path.join(__dirname, '..', 'docs', 'audit-results', 'nl-keyword-cannibalization.json');

function readFileContent(filePath) {
  return fs.readFileSync(filePath, 'utf-8');
}

/**
 * Update or insert seoKeywords for a specific grade within a theme's nl.ts file.
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

  // Rule 1: Grade pages must NOT use product pattern "generator" or hub pattern "voor kinderen"
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
    if (primary.includes('voor kinderen')) {
      issues.push({
        type: 'PATTERN_VIOLATION',
        severity: 'critical',
        page: key,
        message: `Grade page uses hub pattern "voor kinderen": ${primary}`,
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
  // Products use "generator", grades use "oefeningen {grade}" — should be naturally distinct
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
  md += '## Theme+Grade Pages \u2014 LSI & Question Keywords (Part 333 Enhancement)\n\n';
  md += '> Added by SEO Part 333. Covers 250 theme+grade pages (50 themes \u00d7 5 grades).\n\n';

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
  console.log('=== SEO Part 333: NL Keyword Cannibalization Audit ===\n');

  const report = {
    timestamp: new Date().toISOString(),
    part: 333,
    locale: 'nl',
    gradePages: { total: 0, updated: 0, errors: [], validations: [] },
    cannibalization: [],
    summary: {},
  };

  // Get all theme directories
  const themeDirs = fs.readdirSync(THEME_DIR).filter(d => {
    const dirPath = path.join(THEME_DIR, d);
    return fs.statSync(dirPath).isDirectory() && fs.existsSync(path.join(dirPath, 'nl.ts'));
  });

  console.log(`Found ${themeDirs.length} themes with nl.ts files\n`);

  const gradeKeywordsMap = {};
  const gradeResults = {};
  let totalUpdated = 0;
  let totalErrors = 0;

  for (const theme of themeDirs) {
    const filePath = path.join(THEME_DIR, theme, 'nl.ts');
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
  console.log('\nUpdating nl-all-pages.md with LSI, question, and SERP analysis...');
  const mdAppendix = generateMarkdownAppendix(gradeResults);

  if (fs.existsSync(KEYWORD_MAP_PATH)) {
    fs.appendFileSync(KEYWORD_MAP_PATH, mdAppendix, 'utf-8');
    console.log(`  Appended ${Object.keys(gradeResults).length} grade entries to nl-all-pages.md`);
  } else {
    console.error(`  ERROR: nl-all-pages.md not found at ${KEYWORD_MAP_PATH}`);
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

  console.log('\n=== Part 333 Complete ===');
  console.log(`  ${totalUpdated} grade pages enhanced`);
  console.log(`  ${report.summary.questionsGenerated} question keywords generated`);
  console.log(`  ${criticalIssues.length} critical cannibalization issues`);
  console.log(`  Keywords per page: ${report.summary.allPagesMinKeywords}-${report.summary.allPagesMaxKeywords} (avg ${report.summary.avgKeywordsPerPage})`);
}

main();
