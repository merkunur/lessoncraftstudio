#!/usr/bin/env node
/**
 * Fix meta descriptions for 3 French bundle-content + 12 start-content files.
 * Target: 150-160 characters per meta description.
 */
const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'frontend', 'config');

const META_OVERRIDES = {
  // === BUNDLE-CONTENT (3 too long) ===
  'bundle-content/matching-bundle':
    '5 g\u00e9n\u00e9rateurs de fiches d\u2019association en un pack. Cr\u00e9ez fiches association, grille, bingo, tri et ombres \u00e0 vendre sur Etsy, KDP et TPT. Essai gratuit.',
  'bundle-content/search-bundle':
    'Pack cherche et trouve avec 4 g\u00e9n\u00e9rateurs : cherche et compte, objets cach\u00e9s, mots crois\u00e9s en images et chasse au tr\u00e9sor. Vendez sur Etsy, KDP et TPT.',
  'bundle-content/visual-bundle':
    '7 g\u00e9n\u00e9rateurs d\u2019apprentissage visuel en un pack. Coloriage, dessin, motifs, tailles, graphiques et trac\u00e9 de lignes \u00e0 vendre sur Etsy, KDP et TPT. Essai gratuit.',

  // === START-CONTENT (12 too long) ===
  'start-content/amazon-kdp-activity-books':
    'Comment vendre des livres d\u2019activit\u00e9s sur Amazon KDP. Formatage int\u00e9rieur, design couverture, mots-cl\u00e9s, tarification et mise \u00e0 l\u2019\u00e9chelle de votre activit\u00e9.',
  'start-content/commercial-license-guide':
    'Comprendre les licences commerciales pour vendre des fiches sur Etsy, KDP et d\u2019autres plateformes. Deux niveaux expliqu\u00e9s avec droits et tarification.',
  'start-content/complete-guide-printable-business':
    'Comment lancer une activit\u00e9 d\u2019imprimables. Guide \u00e9tape par \u00e9tape pour vendeurs Etsy, Amazon KDP et TpT avec g\u00e9n\u00e9rateurs de fiches pour cr\u00e9er et vendre.',
  'start-content/create-multilingual-worksheets':
    'Cr\u00e9ez et vendez des fiches dans 11 langues avec un g\u00e9n\u00e9rateur multilingue. Atteignez les acheteurs sur Etsy, Amazon KDP et les march\u00e9s internationaux.',
  'start-content/create-worksheets-that-sell':
    'Comment cr\u00e9er des fiches qui se vendent sur Etsy, Amazon KDP et TpT. Guide \u00e9tape par \u00e9tape : images th\u00e9matiques, corrig\u00e9s, tarification et optimisation.',
  'start-content/etsy-printable-business':
    'Comment vendre des imprimables sur Etsy \u00e9tape par \u00e9tape. Cr\u00e9ation de boutique, SEO Etsy, optimisation d\u2019annonces, tarification et g\u00e9n\u00e9rateurs de fiches.',
  'start-content/marketing-printable-business':
    'Comment commercialiser des fiches imprimables : SEO, strat\u00e9gie Pinterest, e-mail marketing, timing saisonnier et construction de marque pour entrepreneurs.',
  'start-content/printable-business-blueprint':
    'Transformez vos id\u00e9es d\u2019imprimables en plan d\u2019action. Planifiez votre gamme, choisissez vos plateformes, fixez vos prix et lancez-vous avec les g\u00e9n\u00e9rateurs.',
  'start-content/printable-business-income':
    'Combien peut-on gagner en vendant des imprimables ? Attentes r\u00e9alistes, frais de plateformes, strat\u00e9gies de tarification et variables d\u00e9terminant les gains.',
  'start-content/printable-business-legal':
    'Obligations fiscales pour la vente d\u2019imprimables. Structure juridique, charges d\u00e9ductibles, propri\u00e9t\u00e9 intellectuelle et conformit\u00e9 des plateformes de vente.',
  'start-content/scaling-printable-business':
    'D\u00e9veloppez votre activit\u00e9 d\u2019imprimables d\u2019activit\u00e9 secondaire \u00e0 temps plein. Expansion du catalogue, multi-plateforme, regroupement et automatisation.',
  'start-content/tools-for-printable-business':
    'Meilleurs outils pour vendeurs de fiches imprimables : g\u00e9n\u00e9rateurs de fiches, outils de design, utilitaires de plateforme et workflows d\u2019automatisation.',
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
