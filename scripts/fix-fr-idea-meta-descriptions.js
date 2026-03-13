#!/usr/bin/env node
/**
 * Fix meta descriptions for 19 French idea-content files.
 * Target: 150-160 characters per meta description.
 */
const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'frontend', 'config');

const META_OVERRIDES = {
  // === TOO LONG (13 files) ===
  'idea-content/back-to-school-printable-ideas':
    'Id\u00e9es d\u2019imprimables de rentr\u00e9e scolaire \u00e0 vendre sur Etsy, KDP et TPT. Concepts produits pour la classe, strat\u00e9gies juillet-septembre et conseils vendeurs.',
  'idea-content/birds-printable-ideas':
    'Id\u00e9es d\u2019imprimables oiseaux \u00e0 vendre sur Etsy, Amazon KDP et TPT. Concepts de produits, strat\u00e9gies de plateformes et positionnement de niche pour vendeurs.',
  'idea-content/christmas-printable-ideas':
    'Id\u00e9es d\u2019imprimables de No\u00ebl \u00e0 vendre sur Etsy, Amazon KDP et TPT. Concepts de produits festifs, strat\u00e9gies saisonni\u00e8res et conseils pour les vendeurs.',
  'idea-content/dinosaur-printable-ideas':
    'Id\u00e9es rentables d\u2019imprimables dinosaures \u00e0 vendre sur Etsy, Amazon KDP et TPT. Concepts de produits, strat\u00e9gies de plateformes et conseils de niche vendeurs.',
  'idea-content/easter-printable-ideas':
    'Id\u00e9es d\u2019imprimables de P\u00e2ques \u00e0 vendre sur Etsy, Amazon KDP et TPT. Concepts de produits printaniers, strat\u00e9gies saisonni\u00e8res et conseils pour les vendeurs.',
  'idea-content/farm-animals-printable-ideas':
    'Id\u00e9es d\u2019imprimables animaux de la ferme \u00e0 vendre sur Etsy, Amazon KDP et TPT. Concepts produits, strat\u00e9gies de prix et conseils de plateformes pour vendeurs.',
  'idea-content/forest-animals-printable-ideas':
    'Id\u00e9es d\u2019imprimables animaux de la for\u00eat \u00e0 vendre sur Etsy, Amazon KDP et TPT. Concepts produits th\u00e8me bois, conseils par plateforme et strat\u00e9gies de niche.',
  'idea-content/halloween-printable-ideas':
    'Id\u00e9es d\u2019imprimables d\u2019Halloween \u00e0 vendre sur Etsy, Amazon KDP et TPT. Concepts produits th\u00e8me effrayant, strat\u00e9gies saisonni\u00e8res et conseils pour vendeurs.',
  'idea-content/insects-printable-ideas':
    'Id\u00e9es d\u2019imprimables insectes \u00e0 vendre sur Etsy, Amazon KDP et TPT. Concepts produits papillons et petites b\u00eates, strat\u00e9gies de plateformes et conseils vendeurs.',
  'idea-content/ocean-animals-printable-ideas':
    'Id\u00e9es d\u2019imprimables animaux marins \u00e0 vendre sur Etsy, Amazon KDP et TPT. Concepts produits oc\u00e9aniques, strat\u00e9gies de plateformes et conseils pour vendeurs.',
  'idea-content/pets-printable-ideas':
    'Id\u00e9es d\u2019imprimables animaux de compagnie \u00e0 vendre sur Etsy, Amazon KDP et TPT. Concepts produits chats, chiens et petits animaux avec strat\u00e9gies vendeurs.',
  'idea-content/safari-animals-printable-ideas':
    'Id\u00e9es d\u2019imprimables animaux de safari \u00e0 vendre sur Etsy, Amazon KDP et TPT. Concepts produits faune africaine, strat\u00e9gies plateformes et conseils vendeurs.',
  'idea-content/valentines-day-printable-ideas':
    'Id\u00e9es d\u2019imprimables de Saint-Valentin \u00e0 vendre sur Etsy, KDP et TPT. Concepts produits th\u00e8me amour, strat\u00e9gies timing saisonnier et conseils pour vendeurs.',

  // === TOO SHORT (6 files) ===
  'idea-content/esl-printable-ideas':
    'Id\u00e9es d\u2019imprimables FLE/ESL \u00e0 vendre sur Etsy, KDP et TPT. Strat\u00e9gies de niche pour vendeurs ciblant enseignants, tuteurs et apprenants d\u2019anglais dans le monde.',
  'idea-content/fairy-tale-printable-ideas':
    'D\u00e9couvrez des id\u00e9es d\u2019imprimables contes de f\u00e9es \u00e0 vendre sur Etsy, KDP et TPT. Concepts de produits f\u00e9\u00e9riques, strat\u00e9gies et conseils pour les vendeurs.',
  'idea-content/first-grade-printable-ideas':
    'Id\u00e9es d\u2019imprimables CP \u00e0 vendre sur Etsy, Amazon KDP et TPT. Concepts de produits Cours Pr\u00e9paratoire, strat\u00e9gies de niche et conseils pour les vendeurs.',
  'idea-content/food-cooking-printable-ideas':
    'D\u00e9couvrez des id\u00e9es d\u2019imprimables cuisine et alimentation \u00e0 vendre sur Etsy, KDP et TPT. Concepts de produits recettes, strat\u00e9gies et conseils pour vendeurs.',
  'idea-content/pirates-printable-ideas':
    'D\u00e9couvrez des id\u00e9es d\u2019imprimables pirates \u00e0 vendre sur Etsy, KDP et TPT. Concepts de produits aventure, chasses au tr\u00e9sor et strat\u00e9gies pour vendeurs.',
  'idea-content/special-education-printable-ideas':
    'Id\u00e9es d\u2019imprimables \u00e9ducation sp\u00e9cialis\u00e9e \u00e0 vendre sur Etsy, KDP et TPT. Concepts de produits adapt\u00e9s pour enseignants, th\u00e9rapeutes et parents d\u2019\u00e9l\u00e8ves.',
};

// ── Validation ──
let hasError = false;
for (const [key, meta] of Object.entries(META_OVERRIDES)) {
  if (meta.length < 150 || meta.length > 160) {
    console.error(`ERROR: ${key} meta is ${meta.length} chars (need 150-160): "${meta}"`);
    hasError = true;
  }
}
if (hasError) {
  console.error('\nFix the errors above before running.');
  process.exit(1);
}

console.log(`All ${Object.keys(META_OVERRIDES).length} metas validated (150-160 chars each).\n`);

// ── Apply fixes ──
let filesModified = 0;

function applyMetaFix(filePath, newMeta) {
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  const re = /metaDescription:\s*\n?\s*'(?:[^'\\]|\\.)*'/;

  if (re.test(content)) {
    const wsMatch = content.match(/metaDescription:(\s*\n?\s*)'(?:[^'\\]|\\.)*'/);
    const ws = wsMatch[1];
    content = content.replace(re, `metaDescription:${ws}'${newMeta}'`);
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    filesModified++;
    return true;
  }
  return false;
}

for (const [key, meta] of Object.entries(META_OVERRIDES)) {
  const [cat, file] = key.split('/');
  const filePath = path.join(BASE, cat, 'fr', `${file}.ts`);

  if (!fs.existsSync(filePath)) {
    console.log(`SKIP: ${filePath} not found`);
    continue;
  }

  if (applyMetaFix(filePath, meta)) {
    console.log(`FIXED: ${key} (${meta.length} chars)`);
  } else {
    console.log(`SKIP: ${key} (no change detected)`);
  }
}

console.log(`\nDone. Modified ${filesModified} files.`);
