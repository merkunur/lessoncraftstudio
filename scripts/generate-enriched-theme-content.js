#!/usr/bin/env node
/**
 * Enriched Theme Content Generator
 *
 * Scaffolds TypeScript content files for the enriched theme content system.
 * Reads from legacy v2-data, theme-app-mapping, grade-skills-matrix, and
 * curriculum-standards to seed each file with correct structure and data.
 *
 * Usage:
 *   node scripts/generate-enriched-theme-content.js --theme animals --locale en
 *   node scripts/generate-enriched-theme-content.js --locale en
 *   node scripts/generate-enriched-theme-content.js --all
 *
 * Part 4 of Landing Page SEO Perfection
 */

const fs = require('fs');
const path = require('path');

// ── Configuration ────────────────────────────────────────────────────

const ROOT = path.resolve(__dirname, '..');
const CONTENT_DIR = path.join(ROOT, 'frontend', 'content', 'themes');
const V2_DATA_DIR = path.join(__dirname, 'v2-data');

const ALL_LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

const ALL_THEME_IDS = [
  'animals', 'food', 'transportation', 'nature', 'school',
  'sports', 'emotions', 'body', 'clothing', 'household',
  'toys', 'music', 'jobs', 'space', 'seasons',
  'holidays', 'weather', 'colors', 'shapes', 'numbers',
  'alphabet', 'furniture', 'easter', 'halloween', 'xmas',
  'winter', 'farm', 'ocean', 'dinosaurs', 'insects',
  'fruits', 'vegetables', 'flowers', 'birds', 'pets',
  'zoo', 'garden', 'camping', 'pirates', 'fairy-tales',
  'robots', 'superheroes', 'construction', 'cooking', 'travel',
  'birthday', 'circus', 'forest', 'spring', 'summer',
];

const GRADE_IDS = ['preschool', 'kindergarten', 'first-grade', 'second-grade', 'third-grade'];

// ── Load reference data ──────────────────────────────────────────────

const gradeSkills = require('./data/grade-skills-matrix');
const curriculumStandards = require('./data/curriculum-standards');
const themeEduContext = require('./data/theme-educational-context');

// ── Load legacy v2-data ──────────────────────────────────────────────

function loadV2Themes() {
  const files = [
    'themes-academic.js', 'themes-active.js', 'themes-adventure.js',
    'themes-animal.js', 'themes-creative.js', 'themes-culture.js',
    'themes-daily.js', 'themes-nature.js',
  ];
  const map = {};
  for (const f of files) {
    const themes = require(path.join(V2_DATA_DIR, f));
    for (const t of themes) {
      map[t.id] = t;
    }
  }
  return map;
}

const v2Themes = loadV2Themes();

// ── Load theme-app-mapping (parse TS as text) ────────────────────────

function loadThemeApps() {
  const tsPath = path.join(ROOT, 'frontend', 'config', 'theme-app-mapping.ts');
  const src = fs.readFileSync(tsPath, 'utf8');

  // Extract the themeApps object using regex
  const themeAppsMap = {};

  // Match each theme entry: 'theme-id': [\n  'app1', 'app2', ...\n],
  // or theme: [\n  'app1', ...]
  const themeBlockRe = /['"]?([\w-]+)['"]?\s*:\s*\[([\s\S]*?)\]/g;
  // Find the themeApps section
  const themeAppsSection = src.match(/const themeApps[^=]*=\s*\{([\s\S]*?)\n\};/);
  if (!themeAppsSection) {
    console.error('Warning: Could not parse themeApps from theme-app-mapping.ts');
    return themeAppsMap;
  }

  const body = themeAppsSection[1];
  let match;
  while ((match = themeBlockRe.exec(body)) !== null) {
    const themeId = match[1];
    const appListStr = match[2];
    const apps = [];
    const appRe = /'([\w-]+)'/g;
    let appMatch;
    while ((appMatch = appRe.exec(appListStr)) !== null) {
      apps.push(appMatch[1]);
    }
    if (apps.length > 0) {
      themeAppsMap[themeId] = apps;
    }
  }

  return themeAppsMap;
}

// Extract appCategoryMap similarly
function loadAppCategories() {
  const tsPath = path.join(ROOT, 'frontend', 'config', 'theme-app-mapping.ts');
  const src = fs.readFileSync(tsPath, 'utf8');

  const catMap = {};
  const section = src.match(/const appCategoryMap[^=]*=\s*\{([\s\S]*?)\n\};/);
  if (!section) return catMap;

  const entryRe = /'([\w-]+)'\s*:\s*'(\w+)'/g;
  let m;
  while ((m = entryRe.exec(section[1])) !== null) {
    catMap[m[1]] = m[2];
  }
  return catMap;
}

const themeAppsMap = loadThemeApps();
const appCategoryMap = loadAppCategories();

// ── Helper: group apps by category ───────────────────────────────────

function buildAppCategories(appIds) {
  const grouped = { math: [], literacy: [], visual: [], puzzles: [] };
  for (const id of appIds) {
    const cat = appCategoryMap[id] || 'visual';
    grouped[cat].push(id);
  }
  const order = ['math', 'literacy', 'visual', 'puzzles'];
  return order
    .filter(c => grouped[c].length > 0)
    .map(c => ({ category: c, appIds: grouped[c] }));
}

// ── Helper: pick relevant curriculum standards for a theme ───────────

function pickCurriculumAlignments(themeId) {
  const edu = themeEduContext[themeId];
  if (!edu) return [];

  const areas = edu.primaryCurriculumAreas || ['math', 'literacy'];
  const alignments = [];

  for (const area of areas) {
    const areaStandards = curriculumStandards[area];
    if (!areaStandards) continue;

    // Pick one standard from kindergarten and one from first-grade as representative
    for (const grade of ['kindergarten', 'first-grade']) {
      const standards = areaStandards[grade];
      if (standards && standards.length > 0) {
        const std = standards[0];
        // Determine related app IDs based on area
        const relatedApps = (themeAppsMap[themeId] || []).filter(appId => {
          const cat = appCategoryMap[appId];
          if (area === 'math') return cat === 'math';
          if (area === 'literacy') return cat === 'literacy';
          return false;
        }).slice(0, 3);

        alignments.push({
          standard: std.standard,
          framework: std.framework,
          description: std.description,
          relatedAppIds: relatedApps,
        });
      }
    }
  }

  return alignments;
}

// ── Helper: build grade content skeleton ─────────────────────────────

function buildGradeContentSkeleton(themeId) {
  const lines = [];
  lines.push('{');
  // Only create skeleton for 2-3 key grades to keep it manageable
  const keyGrades = ['preschool', 'kindergarten', 'first-grade'];

  for (let i = 0; i < keyGrades.length; i++) {
    const gradeId = keyGrades[i];
    const grade = gradeSkills[gradeId];
    if (!grade) continue;

    const comma = i < keyGrades.length - 1 ? ',' : '';
    lines.push(`    '${gradeId}': {`);
    lines.push(`      intro: '/* TODO: 200+ words about ${themeId} for ${grade.label} (ages ${grade.ageRange}) */',`);
    lines.push(`      objectives: [`);

    // Pick 3 relevant objectives from grade skills
    const edu = themeEduContext[themeId];
    const areas = edu ? edu.primaryCurriculumAreas : ['math', 'literacy', 'cognitive'];
    for (let a = 0; a < Math.min(areas.length, 3); a++) {
      const area = areas[a];
      const skills = grade[area];
      if (skills && skills.length > 0) {
        const areaComma = a < Math.min(areas.length, 3) - 1 ? ',' : '';
        lines.push(`        { skill: '${escapeStr(skills[0])}', area: '${area}' }${areaComma}`);
      }
    }
    lines.push(`      ],`);
    lines.push(`      developmentalNotes: '/* TODO: Age-appropriate developmental context for ${grade.label} */',`);
    lines.push(`      teachingTips: [`);
    lines.push(`        '/* TODO: Grade-specific teaching tip 1 */',`);
    lines.push(`        '/* TODO: Grade-specific teaching tip 2 */',`);
    lines.push(`      ],`);
    lines.push(`      faq: [`);
    lines.push(`        { question: '/* TODO: Grade-specific FAQ 1 */', answer: '/* TODO */' },`);
    lines.push(`        { question: '/* TODO: Grade-specific FAQ 2 */', answer: '/* TODO */' },`);
    lines.push(`        { question: '/* TODO: Grade-specific FAQ 3 */', answer: '/* TODO */' },`);
    lines.push(`      ],`);
    lines.push(`    }${comma}`);
  }

  lines.push('  }');
  return lines.join('\n');
}

// ── Helper: escape single quotes in strings ──────────────────────────

function escapeStr(s) {
  return s.replace(/'/g, "\\'").replace(/\n/g, '\\n');
}

// ── Helper: format string array for TS ───────────────────────────────

function formatStringArray(arr, indent) {
  if (!arr || arr.length === 0) return '[]';
  if (arr.length <= 4) {
    return '[' + arr.map(s => `'${s}'`).join(', ') + ']';
  }
  const pad = ' '.repeat(indent);
  const lines = ['['];
  for (let i = 0; i < arr.length; i++) {
    const comma = i < arr.length - 1 ? ',' : ',';
    lines.push(`${pad}  '${arr[i]}'${comma}`);
  }
  lines.push(`${pad}]`);
  return lines.join('\n');
}

// ── Helper: check if file has real content (not just TODO markers) ───

function hasRealContent(filePath) {
  if (!fs.existsSync(filePath)) return false;
  const content = fs.readFileSync(filePath, 'utf8');
  // If there are TODO markers, it's still a scaffold
  if (content.includes('/* TODO')) return false;
  // If the file has registerThemeContent call, it has structure
  return content.includes('registerThemeContent');
}

// ── Main: generate one file ──────────────────────────────────────────

function generateFile(themeId, locale) {
  const outDir = path.join(CONTENT_DIR, themeId);
  const outPath = path.join(outDir, `${locale}.ts`);

  // Safety: don't overwrite files with real (non-TODO) content
  if (hasRealContent(outPath)) {
    const content = fs.readFileSync(outPath, 'utf8');
    if (!content.includes('/* TODO')) {
      console.log(`  SKIP ${themeId}/${locale}.ts (has real content)`);
      return false;
    }
  }

  // Ensure directory exists
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  // Get legacy data
  const v2 = v2Themes[themeId];
  if (!v2) {
    console.error(`  ERROR: No v2 data found for theme '${themeId}'`);
    return false;
  }

  // Get locale-specific data from legacy
  const displayName = (v2.displayNames && v2.displayNames[locale]) || v2.displayNames.en || themeId;

  // Get curated apps
  const curatedApps = themeAppsMap[themeId] || [];
  const appCategories = buildAppCategories(curatedApps);

  // Get curriculum alignments
  const alignments = pickCurriculumAlignments(themeId);

  // Get related themes
  const relatedThemes = v2.relatedThemes || [];

  // Build the file content
  let ts = '';
  ts += `import { registerThemeContent } from '../index';\n`;
  ts += `import type { EnrichedThemeContent } from '../types';\n`;
  ts += `\n`;
  ts += `const content: EnrichedThemeContent = {\n`;
  ts += `  // -- SEO fields --\n`;
  ts += `  name: '${escapeStr(displayName)}',\n`;

  if (locale === 'en') {
    ts += `  title: '${escapeStr(v2.enDescription ? `Free ${displayName} Worksheets for Kids | LessonCraftStudio` : `${displayName} Worksheets | LessonCraftStudio`)}',\n`;
    ts += `  description: '${escapeStr(v2.enDescription || `Create printable ${displayName.toLowerCase()}-themed worksheets for kids.`)}',\n`;
    ts += `  keywords: '${escapeStr(v2.enKeywords || `${displayName.toLowerCase()} worksheets, ${displayName.toLowerCase()} activities for kids`)}',\n`;
    ts += `  heading: 'Free ${escapeStr(displayName)} Worksheets for Kids',\n`;
  } else {
    ts += `  title: '/* TODO: Localized title for ${locale} */',\n`;
    ts += `  description: '/* TODO: Localized description for ${locale} */',\n`;
    ts += `  keywords: '/* TODO: Localized keywords for ${locale} */',\n`;
    ts += `  heading: '/* TODO: Localized heading for ${locale} */',\n`;
  }

  ts += `\n`;
  ts += `  // -- Rich narrative content --\n`;

  if (locale === 'en' && v2.enIntro) {
    ts += `  intro: '${escapeStr(v2.enIntro)} /* TODO: Expand to 300+ words if needed */',\n`;
  } else {
    ts += `  intro: '/* TODO: 300+ words educational narrative intro */',\n`;
  }

  ts += `  educationalOverview: '/* TODO: 200+ words educational overview */',\n`;
  ts += `  parentGuide: '/* TODO: 150+ words parent guide */',\n`;

  ts += `\n`;
  ts += `  // -- Curated apps --\n`;
  ts += `  curatedAppIds: ${formatStringArray(curatedApps, 2)},\n`;

  // App categories
  ts += `  appCategories: [\n`;
  for (const cat of appCategories) {
    ts += `    { category: '${cat.category}', appIds: ${formatStringArray(cat.appIds, 4)} },\n`;
  }
  ts += `  ],\n`;

  ts += `\n`;
  ts += `  // -- Educational sections --\n`;
  ts += `  teachingTips: [\n`;
  ts += `    { title: '/* TODO: Teaching tip 1 title */', description: '/* TODO: Description */', audience: 'both' },\n`;
  ts += `    { title: '/* TODO: Teaching tip 2 title */', description: '/* TODO: Description */', audience: 'teacher' },\n`;
  ts += `    { title: '/* TODO: Teaching tip 3 title */', description: '/* TODO: Description */', audience: 'parent' },\n`;
  ts += `  ],\n`;
  ts += `  activities: [\n`;
  ts += `    {\n`;
  ts += `      title: '/* TODO: Activity 1 title */',\n`;
  ts += `      description: '/* TODO: Activity description */',\n`;
  ts += `      materials: ['/* TODO */'],\n`;
  ts += `      duration: '15-20 minutes',\n`;
  ts += `      skillAreas: ['cognitive', 'creative'],\n`;
  ts += `    },\n`;
  ts += `    {\n`;
  ts += `      title: '/* TODO: Activity 2 title */',\n`;
  ts += `      description: '/* TODO: Activity description */',\n`;
  ts += `      materials: ['/* TODO */'],\n`;
  ts += `      duration: '10-15 minutes',\n`;
  ts += `      skillAreas: ['math', 'cognitive'],\n`;
  ts += `    },\n`;
  ts += `    {\n`;
  ts += `      title: '/* TODO: Activity 3 title */',\n`;
  ts += `      description: '/* TODO: Activity description */',\n`;
  ts += `      materials: ['/* TODO */'],\n`;
  ts += `      duration: '20-30 minutes',\n`;
  ts += `      skillAreas: ['literacy', 'creative'],\n`;
  ts += `    },\n`;
  ts += `  ],\n`;

  // Curriculum alignment
  ts += `  curriculumAlignment: [\n`;
  for (const a of alignments) {
    ts += `    {\n`;
    ts += `      standard: '${escapeStr(a.standard)}',\n`;
    ts += `      framework: '${a.framework}',\n`;
    ts += `      description: '${escapeStr(a.description)}',\n`;
    ts += `      relatedAppIds: ${formatStringArray(a.relatedAppIds, 6)},\n`;
    ts += `    },\n`;
  }
  ts += `  ],\n`;

  ts += `\n`;
  ts += `  // -- Grade-specific content --\n`;
  ts += `  gradeContent: ${buildGradeContentSkeleton(themeId)},\n`;

  ts += `\n`;
  ts += `  // -- FAQ --\n`;
  if (locale === 'en' && v2.enFaq && v2.enFaq.length > 0) {
    ts += `  faq: [\n`;
    for (const faq of v2.enFaq) {
      ts += `    { question: '${escapeStr(faq.q)}', answer: '${escapeStr(faq.a)}' },\n`;
    }
    ts += `    // /* TODO: Add 3-5 more unique FAQ entries to reach 8-10 total */\n`;
    ts += `  ],\n`;
  } else {
    ts += `  faq: [\n`;
    ts += `    { question: '/* TODO: FAQ 1 */', answer: '/* TODO */' },\n`;
    ts += `    { question: '/* TODO: FAQ 2 */', answer: '/* TODO */' },\n`;
    ts += `    { question: '/* TODO: FAQ 3 */', answer: '/* TODO */' },\n`;
    ts += `    { question: '/* TODO: FAQ 4 */', answer: '/* TODO */' },\n`;
    ts += `    { question: '/* TODO: FAQ 5 */', answer: '/* TODO */' },\n`;
    ts += `    { question: '/* TODO: FAQ 6 */', answer: '/* TODO */' },\n`;
    ts += `    { question: '/* TODO: FAQ 7 */', answer: '/* TODO */' },\n`;
    ts += `    { question: '/* TODO: FAQ 8 */', answer: '/* TODO */' },\n`;
    ts += `  ],\n`;
  }

  ts += `\n`;
  ts += `  // -- Cross-linking --\n`;
  ts += `  relatedThemes: ${formatStringArray(relatedThemes, 2)},\n`;
  ts += `  relatedBlogCategories: [],\n`;
  ts += `};\n`;
  ts += `\n`;
  ts += `registerThemeContent('${themeId}', '${locale}', content);\n`;

  // Write using fs (not PowerShell) with UTF-8
  fs.writeFileSync(outPath, ts, 'utf8');
  console.log(`  OK ${themeId}/${locale}.ts`);
  return true;
}

// ── Fix unicode escapes in generated file ────────────────────────────

function fixUnicodeInFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  const before = content;
  content = content.replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) =>
    String.fromCharCode(parseInt(hex, 16))
  );
  if (content !== before) {
    fs.writeFileSync(filePath, content, 'utf8');
  }
}

// ── CLI ──────────────────────────────────────────────────────────────

function main() {
  const args = process.argv.slice(2);

  let themes = [];
  let locales = [];
  let doAll = false;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--theme' && args[i + 1]) {
      themes.push(args[++i]);
    } else if (args[i] === '--locale' && args[i + 1]) {
      locales.push(args[++i]);
    } else if (args[i] === '--all') {
      doAll = true;
    } else if (args[i] === '--help' || args[i] === '-h') {
      console.log('Usage:');
      console.log('  --theme <id>   Generate for a specific theme');
      console.log('  --locale <id>  Generate for a specific locale');
      console.log('  --all          Generate for all themes and locales');
      console.log('');
      console.log('Examples:');
      console.log('  node scripts/generate-enriched-theme-content.js --theme animals --locale en');
      console.log('  node scripts/generate-enriched-theme-content.js --locale en');
      console.log('  node scripts/generate-enriched-theme-content.js --all');
      process.exit(0);
    }
  }

  if (doAll) {
    themes = ALL_THEME_IDS;
    locales = ALL_LOCALES;
  } else {
    if (themes.length === 0) themes = ALL_THEME_IDS;
    if (locales.length === 0) {
      console.error('Error: Specify --locale <id> or --all');
      process.exit(1);
    }
  }

  // Validate theme IDs
  for (const t of themes) {
    if (!ALL_THEME_IDS.includes(t)) {
      console.error(`Error: Unknown theme '${t}'`);
      process.exit(1);
    }
  }

  // Validate locale IDs
  for (const l of locales) {
    if (!ALL_LOCALES.includes(l)) {
      console.error(`Error: Unknown locale '${l}'`);
      process.exit(1);
    }
  }

  console.log(`Generating enriched theme content...`);
  console.log(`  Themes: ${themes.length} | Locales: ${locales.length}`);
  console.log('');

  let generated = 0;
  let skipped = 0;

  for (const themeId of themes) {
    for (const locale of locales) {
      const result = generateFile(themeId, locale);
      if (result) {
        // Fix unicode escapes
        const outPath = path.join(CONTENT_DIR, themeId, `${locale}.ts`);
        fixUnicodeInFile(outPath);
        generated++;
      } else {
        skipped++;
      }
    }
  }

  console.log('');
  console.log(`Done! Generated: ${generated} | Skipped: ${skipped}`);
}

main();
