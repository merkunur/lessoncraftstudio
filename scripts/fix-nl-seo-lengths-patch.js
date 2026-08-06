#!/usr/bin/env node
/**
 * Patch script for remaining NL SEO length issues after first pass.
 * Handles the 14 warnings from the initial run.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
let fixed = 0;
const warnings = [];

function dLen(str) {
  if (!str) return '';
  return str.replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) =>
    String.fromCharCode(parseInt(hex, 16))
  ).length;
}

function replaceInFile(filePath, oldStr, newStr, label) {
  let content = fs.readFileSync(filePath, 'utf8');
  if (content.includes(oldStr)) {
    content = content.replace(oldStr, newStr);
    fs.writeFileSync(filePath, content);
    console.log(`  FIXED ${label}: ${dLen(oldStr)} -> ${dLen(newStr)}`);
    fixed++;
    return true;
  }
  warnings.push(`${label}: old string not found`);
  return false;
}

console.log('=== NL SEO Lengths Patch ===\n');

// ─── 1. Product page: kleurplaten title 62 → ≤60 ─────────────────────────────
// Remove "Gratis " to go from 62 to 55
{
  const fp = path.join(ROOT, 'frontend/content/product-pages/nl/kleurplaten-werkbladen.ts');
  replaceInFile(fp,
    'Gratis Kleurplaten Generator voor Kinderen | LessonCraftStudio',
    'Kleurplaten Generator voor Kinderen | LessonCraftStudio',
    'kleurplaten title'
  );
}

// ─── 2. Theme hub titles > 60: remove "Gratis " instead of "voor Kinderen" ──
const themeOverlong = [
  { theme: 'birthday',     old: 'Gratis Verjaardag-oefeningen voor Kinderen | LessonCraftStudio',    new: 'Verjaardag-oefeningen voor Kinderen | LessonCraftStudio' },
  { theme: 'fairy-tales',  old: 'Gratis Sprookjes-oefeningen voor Kinderen | LessonCraftStudio',     new: 'Sprookjes-oefeningen voor Kinderen | LessonCraftStudio' },
  { theme: 'farm',         old: 'Gratis Boerderij-oefeningen voor Kinderen | LessonCraftStudio',     new: 'Boerderij-oefeningen voor Kinderen | LessonCraftStudio' },
  { theme: 'halloween',    old: 'Gratis Halloween-oefeningen voor Kinderen | LessonCraftStudio',     new: 'Halloween-oefeningen voor Kinderen | LessonCraftStudio' },
  { theme: 'holidays',     old: 'Gratis Vakanties-oefeningen voor Kinderen | LessonCraftStudio',     new: 'Vakanties-oefeningen voor Kinderen | LessonCraftStudio' },
  { theme: 'household',    old: 'Gratis Huishouden-oefeningen voor Kinderen | LessonCraftStudio',    new: 'Huishouden-oefeningen voor Kinderen | LessonCraftStudio' },
  { theme: 'pets',         old: 'Gratis Huisdieren-oefeningen voor Kinderen | LessonCraftStudio',    new: 'Huisdieren-oefeningen voor Kinderen | LessonCraftStudio' },
  { theme: 'seasons',      old: 'Gratis Seizoenen-oefeningen voor Kinderen | LessonCraftStudio',     new: 'Seizoenen-oefeningen voor Kinderen | LessonCraftStudio' },
  { theme: 'superheroes',  old: 'Gratis Superhelden-oefeningen voor Kinderen | LessonCraftStudio',   new: 'Superhelden-oefeningen voor Kinderen | LessonCraftStudio' },
  { theme: 'toys',         old: 'Gratis Speelgoed-oefeningen voor Kinderen | LessonCraftStudio',     new: 'Speelgoed-oefeningen voor Kinderen | LessonCraftStudio' },
  { theme: 'zoo',          old: 'Gratis Dierentuin-oefeningen voor Kinderen | LessonCraftStudio',    new: 'Dierentuin-oefeningen voor Kinderen | LessonCraftStudio' },
];

for (const t of themeOverlong) {
  const fp = path.join(ROOT, 'frontend/content/themes', t.theme, 'nl.ts');
  replaceInFile(fp, t.old, t.new, `${t.theme} hub title`);
}

// ─── 3. Dinosaurs theme hub desc 161 → ≤160 ─────────────────────────────────
{
  const fp = path.join(ROOT, 'frontend/content/themes/dinosaurs/nl.ts');
  replaceInFile(fp,
    'Uitprintbare dinosaurussen-oefeningen voor kinderen. Rekenen, kleurplaten, woordspellen en puzzels met dinosaurussenthema. Kleuterschool tot groep 5. Gratis PDF.',
    'Uitprintbare dinosaurussen-oefeningen voor kinderen. Rekenen, kleurplaten, woordspellen en puzzels met dinosaurussenthema. Kleuterschool tot groep 5. PDF.',
    'dinosaurs hub desc'
  );
}

// ─── 4. Category hub desc fixes ──────────────────────────────────────────────
const catFile = path.join(ROOT, 'frontend/config/category-content.ts');
let catContent = fs.readFileSync(catFile, 'utf8');
let catChanged = false;

// math desc: 163 → trim "nodig" to fit
const mathOldDesc = 'Maak printbare rekenwerkbladen voor kleuters tot en met groep 5. Optellen, aftrekken, cijferpuzzels en telactiviteiten \\u2014 in seconden klaar. Geen registratie nodig.';
const mathNewDesc = 'Maak printbare rekenwerkbladen voor kleuters tot en met groep 5. Optellen, aftrekken, cijferpuzzels en telactiviteiten \\u2014 in seconden klaar. Geen registratie.';
if (catContent.includes(mathOldDesc)) {
  catContent = catContent.replace(mathOldDesc, mathNewDesc);
  console.log(`  FIXED math cat desc: ${dLen(mathOldDesc)} -> ${dLen(mathNewDesc)}`);
  catChanged = true;
}

// logic-puzzles desc: 147 → extend more
const logicOldDesc = 'Maak printbare logische puzzels: sudoku, vreemde eend, beeldpaden en speurtochten. Stimuleer kritisch denken \\u2014 gratis en direct klaar. Download nu.';
const logicNewDesc = 'Maak printbare logische puzzels: sudoku, vreemde eend, beeldpaden en speurtochten. Stimuleer kritisch denken \\u2014 gratis en direct klaar. Download gratis PDF nu.';
if (catContent.includes(logicOldDesc)) {
  catContent = catContent.replace(logicOldDesc, logicNewDesc);
  console.log(`  FIXED logic-puzzles cat desc: ${dLen(logicOldDesc)} -> ${dLen(logicNewDesc)}`);
  catChanged = true;
}

// matching-sorting desc: 162 → trim "nodig"
const matchOldDesc = 'Gratis koppel- en sorteerwerkbladen voor kinderen. Classificatie, vergelijking en visueel onderscheid van kleutergroep tot en met groep 5. Geen registratie nodig.';
const matchNewDesc = 'Gratis koppel- en sorteerwerkbladen voor kinderen. Classificatie, vergelijking en visueel onderscheid van kleutergroep tot en met groep 5. Geen registratie.';
if (catContent.includes(matchOldDesc)) {
  catContent = catContent.replace(matchOldDesc, matchNewDesc);
  console.log(`  FIXED matching-sorting cat desc: ${dLen(matchOldDesc)} -> ${dLen(matchNewDesc)}`);
  catChanged = true;
}

if (catChanged) {
  fs.writeFileSync(catFile, catContent);
  fixed++;
}

// ─── 5. Navigation page fixes ────────────────────────────────────────────────

// Homepage title: 61 → ≤60 (change "voor Kinderen" to "— PDF")
{
  const fp = path.join(ROOT, 'frontend/app/[locale]/page.tsx');
  replaceInFile(fp,
    'Gratis Werkblad Generatoren voor Kinderen | LessonCraftStudio',
    'Gratis Werkblad Generatoren \u2014 PDF | LessonCraftStudio',
    'homepage title'
  );
}

// Worksheets desc: 168 → ≤160
{
  const fp = path.join(ROOT, 'frontend/app/[locale]/worksheets/page.tsx');
  replaceInFile(fp,
    'Ontdek 50 thematische werkbladverzamelingen voor kinderen. Dieren, dinosaurussen, ruimte en meer. Gratis reken-, lees- en puzzelactiviteiten. Kleuterschool tot groep 5.',
    'Verken 50 thematische werkbladverzamelingen. Dieren, dinosaurussen, ruimte en meer. Gratis reken-, lees- en puzzelactiviteiten voor kinderen. Tot groep 5.',
    'worksheets desc'
  );
}

// Pricing desc: 143 → 150+
{
  const fp = path.join(ROOT, 'frontend/app/[locale]/pricing/page.tsx');
  replaceInFile(fp,
    'Kies uw plan: Gratis generatoren, $15/maand Basis met 10 tools of $25/maand Volledige Toegang tot alle 33 generatoren. Op elk moment opzegbaar.',
    'Kies uw plan: Gratis generatoren, $15/maand Basis met 10 tools of $25/maand Volledige Toegang tot alle 33 generatoren. Op elk moment opzegbaar. Geen registratie.',
    'pricing desc'
  );
}

console.log(`\n=== Patch complete: ${fixed} fixes applied ===`);
if (warnings.length > 0) {
  console.log(`WARNINGS (${warnings.length}):`);
  for (const w of warnings) console.log(`  \u26a0 ${w}`);
}
