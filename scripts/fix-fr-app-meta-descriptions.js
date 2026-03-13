#!/usr/bin/env node
/**
 * Fix meta descriptions for all 33 French app-content files.
 * Target: 150-160 characters per meta description.
 * Uses curly apostrophes (\u2019) to avoid escaping in single-quoted JS strings.
 */
const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'frontend', 'config');

const META_OVERRIDES = {
  'app-content/addition':
    'Cr\u00e9ez des fiches d\u2019addition \u00e0 vendre sur Etsy, KDP et TPT. 104 th\u00e8mes, 4 modes d\u2019exercice, corrig\u00e9s inclus, export 400+ DPI. Essai gratuit avec filigrane.',
  'app-content/alphabet-train':
    'Cr\u00e9ez des fiches train alphabet \u00e0 vendre sur Etsy, KDP et TPT. Wagons color\u00e9s, association lettre-image, 11 langues, 104 th\u00e8mes. Essai gratuit avec filigrane.',
  'app-content/big-small':
    'Cr\u00e9ez des fiches comparaison de tailles pour Etsy, KDP et TPT. 5 types de questions, modes identiques et diff\u00e9rents, 104 th\u00e8mes. Essai gratuit avec filigrane.',
  'app-content/bingo':
    'Cr\u00e9ez des cartes bingo \u00e0 images pour Etsy, KDP et TPT. Lots de cartes uniques, export ZIP, feuilles d\u2019appel, 104 th\u00e8mes. Essai gratuit avec filigrane.',
  'app-content/chart-count':
    'Cr\u00e9ez des fiches graphique \u00e0 images pour Etsy, KDP et TPT. Corrig\u00e9 auto avec surlignage, 104 th\u00e8mes, 6 types d\u2019images par fiche. Essai gratuit avec filigrane.',
  'app-content/code-addition':
    'Cr\u00e9ez des puzzles d\u2019addition cod\u00e9e pour Etsy, KDP et TPT. Mode Mot Myst\u00e8re, 104 th\u00e8mes, 11 langues, corrig\u00e9s, export 400+ DPI. Essai gratuit avec filigrane.',
  'app-content/coloring':
    'Cr\u00e9ez des pages de coloriage pour Etsy, KDP et TPT. Canevas libre, 104 th\u00e8mes, dessin \u00e0 main lev\u00e9e, export niveaux de gris. Essai gratuit avec filigrane.',
  'app-content/crossword':
    'Cr\u00e9ez des mots crois\u00e9s en images pour Etsy, KDP et TPT. Indices visuels sur grille 15\u00d715, 4 m\u00e9thodes de saisie, corrig\u00e9 auto. Essai gratuit avec filigrane.',
  'app-content/cryptogram':
    'Cr\u00e9ez des fiches cryptogramme \u00e0 vendre sur Etsy, KDP et TPT. Chiffre par images, Lettres \u00e0 R\u00e9v\u00e9ler 0\u201310, 104 th\u00e8mes, corrig\u00e9 auto. Essai gratuit avec filigrane.',
  'app-content/draw-and-color':
    'Cr\u00e9ez des fiches dessin sur grille pour Etsy, KDP et TPT. Double quadrillage, indices r\u00e9glables, modes sym\u00e9trie, 104 th\u00e8mes. Essai gratuit avec filigrane.',
  'app-content/drawing-lines':
    'Cr\u00e9ez des fiches de graphisme \u00e0 vendre sur Etsy, KDP et TPT. Huit mod\u00e8les SVG, association de paires d\u2019images, 104 collections. Essai gratuit avec filigrane.',
  'app-content/find-and-count':
    'Cr\u00e9ez des fiches cherche et compte pour Etsy, KDP et TPT. Modes Objets Cach\u00e9s et Rep\u00e9rage de Lettres, 4 types de t\u00e2ches, corrig\u00e9. Essai gratuit avec filigrane.',
  'app-content/find-objects':
    'Cr\u00e9ez des fiches objets cach\u00e9s pour Etsy, KDP et TPT. Modes Cherche et Trouve l\u2019Intrus, sans chevauchement, corrig\u00e9 auto. Essai gratuit avec filigrane.',
  'app-content/grid-match':
    'Cr\u00e9ez des puzzles grille \u00e0 vendre sur Etsy, KDP et TPT. Taille configurable, cases-indices ajustables, corrig\u00e9 auto, 104 th\u00e8mes. Essai gratuit avec filigrane.',
  'app-content/matching':
    'Cr\u00e9ez des fiches d\u2019association pour Etsy, KDP et TPT. 4 modes d\u2019association, corrig\u00e9 auto, 104 th\u00e8mes, paires configurables. Essai gratuit avec filigrane.',
  'app-content/math-puzzle':
    'Cr\u00e9ez des fiches puzzles maths \u00e0 vendre sur Etsy, KDP et TPT. Puzzles images avec addition et soustraction, grilles configurables. Essai gratuit avec filigrane.',
  'app-content/math-worksheet':
    'Cr\u00e9ez des puzzles alg\u00e9briques illustr\u00e9s pour Etsy, KDP et TPT. Images comme variables, 4 niveaux de difficult\u00e9, solution unique. Essai gratuit avec filigrane.',
  'app-content/missing-pieces':
    'Cr\u00e9ez des puzzles pi\u00e8ces manquantes pour Etsy, KDP et TPT. 6 formes de pi\u00e8ces, difficult\u00e9 configurable, corrig\u00e9 auto, 104 th\u00e8mes. Essai gratuit avec filigrane.',
  'app-content/more-less':
    'Cr\u00e9ez des fiches comparaison de quantit\u00e9s pour Etsy, KDP et TPT. 3 modes de comparaison, 104 th\u00e8mes, corrig\u00e9s, export 400+ DPI. Essai gratuit avec filigrane.',
  'app-content/odd-one-out':
    'Cr\u00e9ez des fiches trouve l\u2019intrus pour Etsy, KDP et TPT. Modes Identique et Similaire, corrig\u00e9 auto cercles rouges, 104 th\u00e8mes. Essai gratuit avec filigrane.',
  'app-content/pattern-train':
    'Cr\u00e9ez des fiches train de suites logiques pour Etsy, KDP et TPT. Cinq types de motifs, 11 wagons th\u00e9matiques, indices ajustables. Essai gratuit avec filigrane.',
  'app-content/pattern-worksheet':
    'Cr\u00e9ez des fiches s\u00e9quences logiques pour Etsy, KDP et TPT. Neuf types de motifs, deux modes de question, 104 th\u00e8mes, corrig\u00e9 auto. Essai gratuit avec filigrane.',
  'app-content/picture-path':
    'Cr\u00e9ez des fiches labyrinthes pour Etsy, KDP et TPT. 3 modes de jeu, algorithme LPF, corrig\u00e9 auto, 104 th\u00e8mes, PDF imprimables. Essai gratuit avec filigrane.',
  'app-content/picture-sort':
    'Cr\u00e9ez des fiches de tri d\u2019images pour Etsy, KDP et TPT. Tri \u00e0 deux cat\u00e9gories, corrig\u00e9 auto, 104 th\u00e8mes, 4 \u00e0 12 images par fiche. Essai gratuit avec filigrane.',
  'app-content/prepositions':
    'Cr\u00e9ez des fiches de pr\u00e9positions pour Etsy, KDP et TPT. 8 pr\u00e9positions spatiales, texte \u00e0 trous et choix multiple, 104 th\u00e8mes. Essai gratuit avec filigrane.',
  'app-content/shadow-match':
    'Cr\u00e9ez des fiches discrimination visuelle pour Etsy, KDP et TPT. Modes Ombre et Reconstitue l\u2019Image, silhouettes auto, 104 th\u00e8mes. Essai gratuit avec filigrane.',
  'app-content/subtraction':
    'Cr\u00e9ez des fiches de soustraction pour Etsy, KDP et TPT. 4 modes avec visualisation barr\u00e9e, 104 th\u00e8mes, corrig\u00e9s, export 400+ DPI. Essai gratuit avec filigrane.',
  'app-content/sudoku':
    'Cr\u00e9ez des fiches sudoku en images pour Etsy, KDP et TPT. Grille 4\u00d74, trois niveaux de difficult\u00e9, corrig\u00e9 auto, 104 th\u00e8mes. Essai gratuit avec filigrane.',
  'app-content/treasure-hunt':
    'Cr\u00e9ez des fiches chasse au tr\u00e9sor pour Etsy, KDP et TPT. Grille 5\u00d75, deux types de directions, corrig\u00e9 auto, 104 th\u00e8mes. Essai gratuit avec filigrane.',
  'app-content/word-guess':
    'Cr\u00e9ez des fiches deviner les mots pour Etsy, KDP et TPT. Indices images, 4 difficult\u00e9s, 3 sources de contenu, 11 langues. Essai gratuit avec filigrane.',
  'app-content/word-scramble':
    'Cr\u00e9ez des fiches mots m\u00e9lang\u00e9s pour Etsy, KDP et TPT. Tuiles lettres, indices images, code couleur voyelles-consonnes, 11 langues. Essai gratuit avec filigrane.',
  'app-content/wordsearch':
    'Cr\u00e9ez des fiches mots cach\u00e9s pour Etsy, KDP et TPT. Grille 5\u00d75 \u00e0 30\u00d730, directions diagonales, lettres adapt\u00e9es \u00e0 la langue. Essai gratuit avec filigrane.',
  'app-content/writing':
    'Cr\u00e9ez des fiches d\u2019\u00e9criture manuscrite pour Etsy, KDP et TPT. 3 modes progressifs, 5 polices, trac\u00e9 fl\u00e9ch\u00e9 et d\u00e9grad\u00e9, 104 th\u00e8mes. Essai gratuit avec filigrane.',
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

  // Match metaDescription with possible escaped quotes and multiline format
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
