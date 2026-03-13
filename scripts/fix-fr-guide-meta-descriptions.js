#!/usr/bin/env node
/**
 * Fix meta descriptions for 58 French guide-content files.
 * Target: 150-160 characters per meta description.
 */
const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'frontend', 'config');

const META_OVERRIDES = {
  'guide-content/automate-printable-business':
    'Comment automatiser votre business d\u2019imprimables avec la production par lots, les mod\u00e8les et les workflows. Gagnez du temps et augmentez votre production.',
  'guide-content/best-kdp-activity-book-niches':
    'Meilleures niches de livres d\u2019activit\u00e9s KDP pour \u00e9diteurs. Analyse de la demande, \u00e9valuation concurrence, cat\u00e9gories sous-exploit\u00e9es et timing saisonnier.',
  'guide-content/copyright-printable-sellers':
    'Droit d\u2019auteur pour vendeurs d\u2019imprimables : quels \u00e9l\u00e9ments de fiches sont prot\u00e9geables, enregistrement, application et comment \u00e9viter la contrefa\u00e7on.',
  'guide-content/create-addition-worksheets':
    'Comment cr\u00e9er des fiches d\u2019addition pour enfants. Guide : choisir les th\u00e8mes, r\u00e9gler la difficult\u00e9, g\u00e9n\u00e9rer les corrig\u00e9s et exporter des PDF pour Etsy et KDP.',
  'guide-content/create-alphabet-worksheets':
    'Comment cr\u00e9er des fiches train alphabet avec wagons color\u00e9s, deux modes de cr\u00e9ation, difficult\u00e9 configurable et 104 th\u00e8mes. Vendez sur Etsy, KDP et TPT.',
  'guide-content/create-bingo-cards':
    'Comment cr\u00e9er des cartes bingo avec images th\u00e9matiques. Taille de grille, cartes uniques avec cartes d\u2019appel et PDF pr\u00eats \u00e0 imprimer pour Etsy et KDP.',
  'guide-content/create-coloring-pages':
    'Comment cr\u00e9er des pages de coloriage avec 3 100+ images th\u00e9matiques. Canevas libre, export niveaux de gris et dessin \u00e0 main lev\u00e9e. Vendez sur Etsy et KDP.',
  'guide-content/create-crossword-puzzles':
    'Comment cr\u00e9er des mots crois\u00e9s en images pour enfants. Th\u00e8mes, grilles 15\u00d715 crois\u00e9es, indices num\u00e9rot\u00e9s, corrig\u00e9s automatiques et vente sur Etsy et KDP.',
  'guide-content/create-cryptogram-puzzles':
    'Cr\u00e9ez des puzzles cryptogrammes avec chiffrement images, difficult\u00e9 r\u00e9glable, attribution automatique et alphabets adapt\u00e9s. Guide pour vendeurs Etsy et KDP.',
  'guide-content/create-etsy-coloring-pages':
    'Cr\u00e9ez des coloriages Etsy avec 104 th\u00e8mes d\u2019images. Export N&B et niveaux de gris, optimisation des annonces, tarification et strat\u00e9gies saisonni\u00e8res de vente.',
  'guide-content/create-etsy-worksheet-bundles':
    'Cr\u00e9ez des lots de fiches Etsy qui augmentent le panier moyen. Types de lots, organisation fichiers, pr\u00e9visualisation, optimisation annonces et strat\u00e9gie prix.',
  'guide-content/create-handwriting-sheets':
    'Cr\u00e9ez des fiches d\u2019\u00e9criture manuscrite avec modes trac\u00e9, progressif et copie guid\u00e9e. Fl\u00e8ches d\u2019ordre des traits, cinq polices et export PDF pour Etsy et KDP.',
  'guide-content/create-hidden-object-worksheets':
    'Cr\u00e9ez des fiches objets cach\u00e9s avec deux modes de jeu : Cherche et Trouve et Trouve l\u2019intrus. Sc\u00e8nes th\u00e9matiques, corrig\u00e9s auto et vente sur Etsy et KDP.',
  'guide-content/create-matching-worksheets':
    'Comment cr\u00e9er des fiches d\u2019association pour enfants. 4 modes, images th\u00e9matiques, corrig\u00e9s auto avec lignes de liaison et PDF pr\u00eats \u00e0 imprimer pour Etsy et KDP.',
  'guide-content/create-math-puzzle-worksheets':
    'Comment cr\u00e9er des fiches puzzles maths o\u00f9 les enfants r\u00e9solvent des \u00e9quations pour reconstruire des images. Grilles, op\u00e9rations et vente sur Etsy et KDP.',
  'guide-content/create-maze-worksheets':
    'Comment cr\u00e9er des fiches labyrinthes avec 3 modes de jeu, images th\u00e9matiques et corrig\u00e9s automatiques. Fiches labyrinthes imprimables pour Etsy et Amazon KDP.',
  'guide-content/create-missing-pieces-puzzles':
    'Cr\u00e9ez des puzzles pi\u00e8ces manquantes avec 6 formes, extraction intelligente, distractrices et corrig\u00e9s automatiques. Guide complet de vente pour Etsy et KDP.',
  'guide-content/create-odd-one-out-puzzles':
    'Cr\u00e9ez des fiches trouve l\u2019intrus avec modes Identique et Similaire, remplacement par exercice et corrig\u00e9s automatiques. Guide pour vendeurs Etsy et KDP.',
  'guide-content/create-pattern-worksheets':
    'Cr\u00e9ez des fiches suites logiques avec 9 types de motifs, images th\u00e9matiques, corrig\u00e9s auto et 2 formats de questions. PDF pour Etsy, Amazon KDP et TpT.',
  'guide-content/create-picture-sudoku':
    'Cr\u00e9ez des sudoku en images pour enfants. Grilles 4\u00d74, 3 niveaux de difficult\u00e9, images th\u00e9matiques, corrig\u00e9s auto et PDF pr\u00eats \u00e0 imprimer pour Etsy et KDP.',
  'guide-content/create-preposition-worksheets':
    'Cr\u00e9ez des fiches de pr\u00e9positions avec deux modes d\u2019exercice, Remplacement de Formes, grille de 7 pr\u00e9positions et mots natifs dans 11 langues. Vendez sur Etsy.',
  'guide-content/create-printable-product-line':
    'Cr\u00e9ez une gamme de produits imprimables avec branding coh\u00e9rent, s\u00e9quen\u00e7age strat\u00e9gique et expansion syst\u00e9matique pour un catalogue professionnel vendeur.',
  'guide-content/create-sell-tpt-resources':
    'Comment cr\u00e9er et vendre des ressources TPT. Configuration compte, formatage, optimisation des fiches produit, tarification et lancement. Guide vendeurs TPT.',
  'guide-content/create-shadow-matching-worksheets':
    'Cr\u00e9ez des fiches discrimination visuelle avec deux modes : Ombres pour silhouettes et Reconstitution pour moiti\u00e9s d\u00e9coup\u00e9es. Guide complet pour Etsy et KDP.',
  'guide-content/create-size-comparison-worksheets':
    'Cr\u00e9ez des fiches comparaison de tailles avec 5 types de questions et 2 modes d\u2019image. Sortie sans texte vendable partout. Guide pour Etsy, KDP et TpT.',
  'guide-content/create-sorting-worksheets':
    'Cr\u00e9ez des fiches de tri avec mode th\u00e9matique \u00e0 deux cat\u00e9gories, 4\u201312 images, grilles d\u00e9coup\u00e9es m\u00e9lang\u00e9es et corrig\u00e9s automatiques. Guide pour Etsy et KDP.',
  'guide-content/create-treasure-hunt-worksheets':
    'Cr\u00e9ez des fiches chasse au tr\u00e9sor sur grille 5\u00d75 avec d\u00e9placements directionnels, images-rep\u00e8res et corrig\u00e9s auto. Guide \u00e9tape par \u00e9tape pour Etsy et KDP.',
  'guide-content/create-word-search-puzzles':
    'Comment cr\u00e9er des mots cach\u00e9s avec indices visuels. Choisissez th\u00e8mes, taille de grille, directions, g\u00e9n\u00e9rez les corrig\u00e9s auto et vendez sur Etsy et KDP.',
  'guide-content/create-worksheet-bundles':
    'Comment cr\u00e9er des packs de fiches qui se vendent. Types de packs, psychologie des prix, empilement de valeur et packaging professionnel pour plus de revenus.',
  'guide-content/customer-support-digital-products':
    'Strat\u00e9gies de support client pour vendeurs num\u00e9riques. Pr\u00e9vention des probl\u00e8mes, mod\u00e8les de r\u00e9ponse, gestion des remboursements, avis et syst\u00e8mes \u00e9volutifs.',
  'guide-content/email-marketing-printables':
    'Email marketing pour vendeurs d\u2019imprimables. Construisez votre liste d\u2019abonn\u00e9s, cr\u00e9ez des lead magnets et automatisez vos s\u00e9quences pour des ventes r\u00e9currentes.',
  'guide-content/etsy-seo-educational-printables':
    'Guide SEO Etsy pour mat\u00e9riel p\u00e9dagogique imprimable. Recherche de mots-cl\u00e9s, optimisation des titres, 13 tags, descriptions et facteurs de classement.',
  'guide-content/get-reviews-printable-products':
    'Strat\u00e9gies pour obtenir des avis sur vos imprimables. Preuve sociale, retours authentiques et cr\u00e9dibilit\u00e9 de votre boutique Etsy, KDP et TpT. Guide vendeurs.',
  'guide-content/kdp-formatting-worksheets':
    'Guide formatage KDP : formats de coupe, marges, fond perdu, export PDF 300 DPI, dimensions de couverture et d\u00e9pannage du t\u00e9l\u00e9versement pour livres d\u2019activit\u00e9s.',
  'guide-content/kdp-vs-etsy-printables':
    'KDP ou Etsy pour vendeurs d\u2019imprimables. Comparez frais, formats, m\u00e9canismes de trafic et strat\u00e9gies multi-plateformes pour votre activit\u00e9 d\u2019imprimables.',
  'guide-content/make-money-kdp-activity-books':
    'Comment gagner de l\u2019argent avec les livres d\u2019activit\u00e9s KDP. Tarification, catalogue, redevances, publication saisonni\u00e8re et expansion multi-plateformes.',
  'guide-content/math-activity-books-kdp':
    'Cr\u00e9ez des livres d\u2019activit\u00e9s maths KDP pour gagner des redevances. Formatage de manuscrit, design de couverture et optimisation des mots-cl\u00e9s sur Amazon.',
  'guide-content/multilingual-printable-business':
    'D\u00e9veloppez une activit\u00e9 d\u2019imprimables multilingue sur les march\u00e9s internationaux. Langues prioritaires, workflows de traduction et strat\u00e9gies de revenus.',
  'guide-content/niche-selection-printables':
    'S\u00e9lection de niche pour activit\u00e9s imprimables : rechercher la demande, analyser la concurrence, \u00e9valuer la rentabilit\u00e9, valider et planifier l\u2019expansion.',
  'guide-content/passive-income-worksheets':
    'Construire des revenus r\u00e9currents avec les fiches. Catalogues durables, distribution multi-plateforme, expansion linguistique et effets catalogue pour vendeurs.',
  'guide-content/pinterest-marketing-worksheets':
    'Strat\u00e9gie marketing Pinterest pour vendeurs de fiches imprimables. Trafic durable, optimisation des \u00e9pingles, strat\u00e9gie tableaux et contenu mots-cl\u00e9s.',
  'guide-content/price-etsy-printables':
    'Fixez les prix de vos fiches Etsy avec calcul des frais, tarification \u00e0 trois paliers, les strat\u00e9gies de lots et les ajustements saisonniers. Guide vendeurs.',
  'guide-content/pricing-educational-printables':
    'Strat\u00e9gies de tarification pour imprimables \u00e9ducatifs. Psychologie des prix, analyse concurrentielle, frais de plateforme, marges et tests pour vendeurs.',
  'guide-content/quality-standards-worksheets':
    'Normes qualit\u00e9 pour vendeurs de fiches : r\u00e9sultat professionnel, r\u00e9solution, marges, typographie, corrig\u00e9s et tests impression. Vendez sur Etsy et KDP.',
  'guide-content/research-profitable-niches':
    'Comment rechercher des cr\u00e9neaux imprimables rentables avec donn\u00e9es marketplace, analyse mots-cl\u00e9s, \u00e9tude concurrence, signaux de demande et validation.',
  'guide-content/scale-printable-business-guide':
    'Comment d\u00e9velopper votre activit\u00e9 d\u2019imprimables avec production par lots, expansion multiplateforme, catalogue, march\u00e9s multilingues et automatisation.',
  'guide-content/seasonal-marketing-printables':
    'Planifiez vos campagnes saisonni\u00e8res pour imprimables selon les cycles de demande. Calendrier vendeur, timing de production, mots-cl\u00e9s et pics de vente.',
  'guide-content/sell-creative-fabrica':
    'Vendez des ressources \u00e9ducatives sur Creative Fabrica. Revenus abonnements et ventes individuelles, public cr\u00e9atif et section Classroom pour \u00e9ducateurs.',
  'guide-content/sell-math-worksheets-etsy':
    'Vendez des fiches de maths sur Etsy avec nos 6 g\u00e9n\u00e9rateurs. SEO Etsy, optimisation des annonces, tarification, strat\u00e9gies de lots et timing saisonnier.',
  'guide-content/sell-printables-gumroad':
    'Vendez des imprimables sur Gumroad sans frais mensuels. Configuration boutique, strat\u00e9gies tarification, marketing par e-mail et relations directes clients.',
  'guide-content/sell-word-search-etsy':
    'Vendez des mots cach\u00e9s sur Etsy avec 4 g\u00e9n\u00e9rateurs. SEO Etsy, optimisation annonces, tarification, lots avec mots crois\u00e9s et mots m\u00e9lang\u00e9s et timing saisonnier.',
  'guide-content/social-media-printable-marketing':
    'Strat\u00e9gies marketing r\u00e9seaux sociaux pour imprimables : choix des plateformes, contenu visuel, construction d\u2019audience et engagement g\u00e9n\u00e9rant du trafic.',
  'guide-content/start-etsy-printable-shop':
    'Ouvrez votre boutique Etsy d\u2019imprimables avec 33 g\u00e9n\u00e9rateurs. Configuration, image de marque, optimisation annonces, tarification et plan de lancement.',
  'guide-content/sudoku-books-kdp':
    'Cr\u00e9ez des livres sudoku KDP avec sudoku images pour enfants et sudoku chiffres pour adultes. Difficult\u00e9 progressive, formatage grilles et strat\u00e9gie s\u00e9ries.',
  'guide-content/tpt-store-optimization':
    'Strat\u00e9gies d\u2019optimisation boutique TPT pour un meilleur classement et plus de ventes. Conversion aper\u00e7us, lots, avis et mise \u00e0 l\u2019\u00e9chelle du catalogue.',
  'guide-content/understanding-commercial-licenses':
    'Licences commerciales pour imprimables avant de vendre. Types de licences, erreurs courantes et comment une licence appropri\u00e9e prot\u00e8ge votre activit\u00e9.',
  'guide-content/word-search-books-kdp':
    'Cr\u00e9ez des livres mots cach\u00e9s KDP avec listes de mots th\u00e9matiques, formats gros caract\u00e8res et strat\u00e9gie de s\u00e9rie. Taille de grille et optimisation Amazon.',
  'guide-content/worksheets-multiple-languages':
    'Comment cr\u00e9er des fiches en plusieurs langues : flux de production, gestion des caract\u00e8res, s\u00e9lection polices, assurance qualit\u00e9 et adaptation des annonces.',
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
