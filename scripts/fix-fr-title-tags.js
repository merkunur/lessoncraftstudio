#!/usr/bin/env node
/**
 * Fix title tags for 23 French content files that exceed 60 chars.
 * Target: <= 60 characters per title tag.
 */
const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'frontend', 'config');

const TITLE_OVERRIDES = {
  // tool-content (1)
  'tool-content/treasure-hunt':
    'Cr\u00e9ateur Chasse au Tr\u00e9sor \u2014 Fiches Directionnelles',

  // start-content (3)
  'start-content/marketing-printable-business':
    'Commercialiser des fiches imprimables \u2014 Guide vendeur',
  'start-content/scaling-printable-business':
    'D\u00e9velopper activit\u00e9 imprimables \u2014 Guide de croissance',
  'start-content/tools-for-printable-business':
    'Outils pour vendeurs de fiches imprimables \u2014 Guide complet',

  // guide-content (13)
  'guide-content/automate-printable-business':
    'Automatiser votre activit\u00e9 d\u2019imprimables \u2014 Guide pratique',
  'guide-content/create-bingo-cards':
    'Cr\u00e9er des cartes bingo avec images th\u00e9matiques \u2014 Guide',
  'guide-content/create-coloring-pages':
    'Cr\u00e9er des coloriages \u00e0 partir d\u2019images \u2014 Guide pratique',
  'guide-content/create-handwriting-sheets':
    'Cr\u00e9er des fiches d\u2019\u00e9criture \u2014 Guide \u00e9tape par \u00e9tape',
  'guide-content/create-math-puzzle-worksheets':
    'Cr\u00e9er des fiches puzzles maths \u2014 Guide \u00e9tape par \u00e9tape',
  'guide-content/create-maze-worksheets':
    'Cr\u00e9er des fiches labyrinthes \u2014 Guide \u00e9tape par \u00e9tape',
  'guide-content/create-size-comparison-worksheets':
    'Fiches Comparaison de Tailles \u2014 Guide \u00c9tape par \u00c9tape',
  'guide-content/create-sorting-worksheets':
    'Fiches de Tri par Cat\u00e9gories \u2014 Guide \u00c9tape par \u00c9tape',
  'guide-content/pricing-educational-printables':
    'Tarification imprimables \u00e9ducatifs \u2014 Guide vendeur',
  'guide-content/research-profitable-niches':
    'Rechercher des cr\u00e9neaux imprimables rentables \u2014 Guide',
  'guide-content/scale-printable-business-guide':
    'D\u00e9velopper Activit\u00e9 Imprimables \u2014 Guide de Croissance',
  'guide-content/sell-creative-fabrica':
    'Vendre des ressources sur Creative Fabrica \u2014 Guide',
  'guide-content/tpt-store-optimization':
    'Optimisation boutique TPT \u2014 Vendre plus de ressources',

  // idea-content (6)
  'idea-content/back-to-school-printable-ideas':
    'Imprimables Rentr\u00e9e Scolaire \u00e0 Vendre \u2014 Guide de Niche',
  'idea-content/farm-animals-printable-ideas':
    'Imprimables Animaux de la Ferme \u00e0 Vendre \u2014 Guide Niche',
  'idea-content/forest-animals-printable-ideas':
    'Imprimables Animaux de la For\u00eat \u00e0 Vendre \u2014 Guide Niche',
  'idea-content/pets-printable-ideas':
    'Imprimables Animaux de Compagnie \u00e0 Vendre \u2014 Guide Niche',
  'idea-content/safari-animals-printable-ideas':
    'Imprimables Animaux de Safari \u00e0 Vendre \u2014 Guide de Niche',
  'idea-content/valentines-day-printable-ideas':
    'Imprimables Saint-Valentin \u00e0 Vendre \u2014 Guide de Niche',
};

// ── Validation ──
let hasError = false;
for (const [key, title] of Object.entries(TITLE_OVERRIDES)) {
  if (title.length > 60) {
    console.error(`ERROR: ${key} title is ${title.length} chars (need <=60): "${title}"`);
    hasError = true;
  }
  if (title.length < 30) {
    console.error(`WARNING: ${key} title is only ${title.length} chars (very short): "${title}"`);
  }
}
if (hasError) {
  console.error('\nFix the errors above before running.');
  process.exit(1);
}

console.log(`All ${Object.keys(TITLE_OVERRIDES).length} titles validated (<=60 chars each).\n`);

// ── Apply fixes ──
let filesModified = 0;

function applyTitleFix(filePath, newTitle) {
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  // Match titleTag with possible escaped quotes
  const re = /titleTag:\s*'(?:[^'\\]|\\.)*'/;

  if (re.test(content)) {
    content = content.replace(re, `titleTag: '${newTitle}'`);
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    filesModified++;
    return true;
  }
  return false;
}

for (const [key, title] of Object.entries(TITLE_OVERRIDES)) {
  const [cat, file] = key.split('/');
  const filePath = path.join(BASE, cat, 'fr', `${file}.ts`);

  if (!fs.existsSync(filePath)) {
    console.log(`SKIP: ${filePath} not found`);
    continue;
  }

  if (applyTitleFix(filePath, title)) {
    console.log(`FIXED: ${key} (${title.length} chars)`);
  } else {
    console.log(`SKIP: ${key} (no change detected)`);
  }
}

console.log(`\nDone. Modified ${filesModified} files.`);
