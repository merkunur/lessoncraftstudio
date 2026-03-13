#!/usr/bin/env node
/**
 * Fix meta descriptions for 30 French tool-content files.
 * Target: 150-160 characters per meta description.
 */
const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'frontend', 'config');

const META_OVERRIDES = {
  'tool-content/big-small':
    'G\u00e9n\u00e9rez des fiches comparaison de tailles avec 5 types de questions, modes identiques et diff\u00e9rents, 104 th\u00e8mes, export PDF. Essai gratuit avec filigrane.',
  'tool-content/bingo':
    'Cr\u00e9ez des cartes bingo \u00e0 images avec grilles 3\u00d73 \u00e0 5\u00d75, lot de cartes uniques, export ZIP, feuilles d\u2019appel, 104 th\u00e8mes. Essai gratuit avec filigrane.',
  'tool-content/chart-count':
    'Cr\u00e9ez des fiches graphique \u00e0 images avec grilles 4\u00d75 dispers\u00e9es, 6 types d\u2019images, corrig\u00e9s auto, 11 langues et 104 th\u00e8mes. Essai gratuit avec filigrane.',
  'tool-content/code-addition':
    'Cr\u00e9ez des puzzles d\u2019addition cod\u00e9e avec images. Modes Classique et Mot Myst\u00e8re, 104 th\u00e8mes, 11 langues, licence commerciale. Essai gratuit avec filigrane.',
  'tool-content/coloring':
    'Cr\u00e9ez des pages de coloriage sur canevas libre avec 3 100+ illustrations, 104 th\u00e8mes, dessin libre, export niveaux de gris. Essai gratuit avec filigrane.',
  'tool-content/crossword':
    'Cr\u00e9ez des mots crois\u00e9s en images avec grille 15\u00d715, quatre m\u00e9thodes de saisie, corrig\u00e9s auto et 104 collections th\u00e9matiques. Essai gratuit avec filigrane.',
  'tool-content/cryptogram':
    'Cr\u00e9ez des fiches cryptogramme avec chiffre par images, Lettres \u00e0 R\u00e9v\u00e9ler 0\u201310, attribution auto, corrig\u00e9 l\u00e9gende, 11 langues. Essai gratuit avec filigrane.',
  'tool-content/draw-and-color':
    'Cr\u00e9ez des fiches dessin sur grille avec double quadrillage, indices r\u00e9glables, trois modes sym\u00e9trie et th\u00e8mes contours N&B. Essai gratuit avec filigrane.',
  'tool-content/drawing-lines':
    'Cr\u00e9ez des fiches de graphisme avec huit mod\u00e8les SVG, 3 100+ illustrations dans 104 th\u00e8mes et remplissage auto des paires. Essai gratuit avec filigrane.',
  'tool-content/find-and-count':
    'Cr\u00e9ez des fiches cherche et compte avec modes Objets Cach\u00e9s et Rep\u00e9rage de Lettres, quatre types de t\u00e2ches, 104 th\u00e8mes illustr\u00e9s. Essai gratuit avec filigrane.',
  'tool-content/find-objects':
    'Cr\u00e9ez des fiches objets cach\u00e9s avec modes Cherche et Intrus, sc\u00e8nes sans chevauchement, corrig\u00e9s auto et 104 th\u00e8mes d\u2019images. Essai gratuit avec filigrane.',
  'tool-content/image-addition':
    'Cr\u00e9ez des fiches d\u2019addition avec images th\u00e9matiques. 104 th\u00e8mes, difficult\u00e9 r\u00e9glable, corrig\u00e9s inclus, export PDF pr\u00eat \u00e0 imprimer. Essai gratuit avec filigrane.',
  'tool-content/matching':
    'Cr\u00e9ez des fiches d\u2019association avec 4 modes, corrig\u00e9 auto avec lignes de liaison, paires configurables, 11 langues, 104 th\u00e8mes. Essai gratuit avec filigrane.',
  'tool-content/math-puzzle':
    'Cr\u00e9ez des puzzles maths jigsaw avec grilles d\u2019images, 3 modes d\u2019op\u00e9ration et images personnalis\u00e9es. Vendez sur Etsy, KDP et TPT. Essai gratuit avec filigrane.',
  'tool-content/math-worksheet':
    'Cr\u00e9ez des puzzles alg\u00e9briques illustr\u00e9s o\u00f9 les images sont des variables. 4 niveaux de difficult\u00e9, solution unique garantie. Essai gratuit avec filigrane.',
  'tool-content/missing-pieces':
    'Cr\u00e9ez des puzzles pi\u00e8ces manquantes avec 6 formes, difficult\u00e9 configurable, extraction intelligente, distractrices, 104 th\u00e8mes. Essai gratuit avec filigrane.',
  'tool-content/more-less':
    'Cr\u00e9ez des fiches comparaison plus grand, plus petit et \u00e9gal avec images th\u00e9matiques. 3 modes dont Cocher et Barrer, 104 th\u00e8mes. Essai gratuit avec filigrane.',
  'tool-content/odd-one-out':
    'Cr\u00e9ez des fiches trouve l\u2019intrus avec modes Identique et Similaire, corrig\u00e9s auto avec cercles rouges, 104 th\u00e8mes d\u2019images. Essai gratuit avec filigrane.',
  'tool-content/pattern-train':
    'Cr\u00e9ez des fiches train de suites logiques avec 5 types de motifs, 11 wagons th\u00e9matiques, indices ajustables, corrig\u00e9 auto. Essai gratuit avec filigrane.',
  'tool-content/pattern-worksheet':
    'Cr\u00e9ez des fiches s\u00e9quences logiques avec neuf types de motifs, deux modes de question, configuration par exercice, 104 th\u00e8mes. Essai gratuit avec filigrane.',
  'tool-content/picture-path':
    'Cr\u00e9ez des fiches labyrinthes avec modes Chemin d\u2019Images, Labyrinthe Classique et Bon Chemin, objets \u00e0 r\u00e9colter, corrig\u00e9s. Essai gratuit avec filigrane.',
  'tool-content/picture-sort':
    'Cr\u00e9ez des fiches de tri d\u2019images avec tri \u00e0 deux cat\u00e9gories, grille d\u00e9coup\u00e9e, corrig\u00e9 auto, 104 collections th\u00e9matiques. Essai gratuit avec filigrane.',
  'tool-content/prepositions':
    'Cr\u00e9ez des fiches de pr\u00e9positions avec texte \u00e0 trous et choix multiple, remplacement de formes, 104 th\u00e8mes et 11 langues. Essai gratuit avec filigrane.',
  'tool-content/shadow-match':
    'Cr\u00e9ez des fiches discrimination visuelle avec silhouettes pixel et mode Reconstitue l\u2019Image, corrig\u00e9s auto, 104 th\u00e8mes d\u2019images. Essai gratuit avec filigrane.',
  'tool-content/sudoku':
    'Cr\u00e9ez des sudoku en images pour enfants avec grilles 4\u00d74, trois niveaux de difficult\u00e9, corrig\u00e9s automatiques et 104 collections. Essai gratuit avec filigrane.',
  'tool-content/treasure-hunt':
    'Cr\u00e9ez des fiches chasse au tr\u00e9sor sur grille 5\u00d75 avec deux types de direction, rep\u00e8res th\u00e9matiques, corrig\u00e9s automatiques. Essai gratuit avec filigrane.',
  'tool-content/word-guess':
    'Cr\u00e9ez des fiches deviner les mots avec 4 niveaux de difficult\u00e9, deux modes de saisie, lettres exclues, 11 langues, 104 th\u00e8mes. Essai gratuit avec filigrane.',
  'tool-content/word-scramble':
    'Cr\u00e9ez des fiches mots m\u00e9lang\u00e9s avec tuiles de lettres, indices images, code couleur voyelles-consonnes, 4 niveaux, 11 langues. Essai gratuit avec filigrane.',
  'tool-content/word-search':
    'Cr\u00e9ez des fiches mots cach\u00e9s avec grilles ajustables 5\u00d75 \u00e0 30\u00d730, directions diagonales, lettres adapt\u00e9es \u00e0 la langue, 11 langues. Essai gratuit avec filigrane.',
  'tool-content/writing':
    'Cr\u00e9ez des fiches d\u2019\u00e9criture avec 3 modes de pratique, 5 polices, fl\u00e8ches d\u2019ordre des traits, guides d\u00e9grad\u00e9s, 104 th\u00e8mes. Essai gratuit avec filigrane.',
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
