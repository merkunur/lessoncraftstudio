const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'frontend', 'config', 'bundle-content', 'fr');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const bundles = [
  {
    bundleId: 'math-bundle',
    title: 'Pack Math\u00e9matiques Complet',
    tagline: '6 g\u00e9n\u00e9rateurs de fiches de math\u00e9matiques professionnels en un seul coffret',
    primaryKeyword: 'pack fiches math\u00e9matiques',
    secondaryKeywords: ['g\u00e9n\u00e9rateurs math\u00e9matiques', 'fiches maths imprimables pack', 'coffret activit\u00e9s maths', 'cr\u00e9ateur fiches maths', 'outils math\u00e9matiques \u00e9ducatifs'],
    lsiKeywords: ['fiches addition', 'fiches soustraction', 'puzzles math\u00e9matiques', 'activit\u00e9s maths imprimables', 'fiches maths commerciales', 'fiches maths PDF', 'probl\u00e8mes visuels', 'sens du nombre'],
    heroImg: '/samples/english/addition/Addition Fun 1.jpeg',
    heroAlt: "Fiche d'addition avec images color\u00e9es d'animaux",
    heroImg2: '/samples/english/subtraction/Subtraction Fun 1.jpeg',
    heroAlt2: 'Fiche de soustraction avec exercices visuels',
    gallery: [
      { src: '/samples/english/addition/Addition Fun 3.jpeg', alt: "Fiche addition th\u00e8me v\u00e9hicules", caption: 'Addition \u2014 V\u00e9hicules' },
      { src: '/samples/english/subtraction/Subtraction Fun 2.jpeg', alt: 'Fiche soustraction th\u00e8me fruits', caption: 'Soustraction \u2014 Fruits' },
      { src: '/samples/english/math puzzle/Math Puzzles (1).jpeg', alt: 'Puzzle maths grille', caption: 'Puzzle Math\u00e9matique' },
    ],
    youtubeId: '6O5aCzHkh8M',
    apps: [
      { appId: 'addition', title: "G\u00e9n\u00e9rateur de Fiches d'Addition", description: "Cr\u00e9ez des fiches d'addition illustr\u00e9es avec quatre modes : Image + Image, Image + Nombre, Trouver l'Addend et Mixte. Op\u00e9randes de 1 \u00e0 99, 104 th\u00e8mes, corrig\u00e9s automatiques." },
      { appId: 'subtraction', title: 'G\u00e9n\u00e9rateur de Fiches de Soustraction', description: "G\u00e9n\u00e9rez des fiches visuelles de soustraction avec mode barrer. M\u00eames quatre modes et 104 th\u00e8mes que l'addition pour une couverture compl\u00e8te des op\u00e9rations." },
      { appId: 'code-addition', title: 'G\u00e9n\u00e9rateur de Code Addition', description: "Les \u00e9l\u00e8ves r\u00e9solvent des additions pour d\u00e9coder des messages secrets. Ce format code-breaker surpasse syst\u00e9matiquement les fiches standard en termes d'engagement." },
      { appId: 'more-less', title: 'G\u00e9n\u00e9rateur Plus ou Moins', description: "D\u00e9veloppez le sens du nombre avec des fiches de comparaison visuelles. Les \u00e9l\u00e8ves comparent des groupes d'images th\u00e9matiques pour d\u00e9terminer lequel a plus ou moins." },
      { appId: 'math-puzzle', title: 'G\u00e9n\u00e9rateur de Puzzles Math\u00e9matiques', description: "Pr\u00e9sentez les op\u00e9rations dans des grilles interconnect\u00e9es o\u00f9 les \u00e9l\u00e8ves trouvent le bon chemin. Approche diff\u00e9rente qui d\u00e9veloppe le raisonnement logique." },
      { appId: 'math-worksheet', title: 'G\u00e9n\u00e9rateur de Fiches de Maths', description: "Cr\u00e9ez des fiches d'op\u00e9rations traditionnelles avec calcul en ligne et pos\u00e9. Support addition, soustraction et mixte avec plages de 1 \u00e0 999." },
    ],
    description: `Construire une activit\u00e9 de fiches de math\u00e9matiques signifie couvrir chaque op\u00e9ration, chaque niveau et chaque style d'apprentissage. Le Pack Math\u00e9matiques vous donne six g\u00e9n\u00e9rateurs sp\u00e9cialis\u00e9s qui fonctionnent ensemble pour cr\u00e9er un programme complet \u2014 du comptage de base aux op\u00e9rations multi-chiffres et puzzles logiques. Au lieu d'acheter chaque application s\u00e9par\u00e9ment pour 162 $ (27 $ \u00d7 6), vous obtenez la collection compl\u00e8te pour 79 $ avec le Pack Commercial ou 119 $ avec l'Acc\u00e8s Complet.

Les g\u00e9n\u00e9rateurs Addition et Soustraction couvrent les fondations avec quatre modes d'exercice chacun : Image + Image pour les d\u00e9butants, Image + Nombre pour la transition vers l'abstrait, Trouver le Nombre Manquant pour le raisonnement inverse, et Mixte pour l'\u00e9valuation compl\u00e8te. Le g\u00e9n\u00e9rateur Code Addition ajoute une dimension ludique o\u00f9 les \u00e9l\u00e8ves r\u00e9solvent des \u00e9quations pour d\u00e9coder des messages secrets.

Chaque g\u00e9n\u00e9rateur partage le m\u00eame ensemble de fonctionnalit\u00e9s professionnelles : 104 th\u00e8mes illustr\u00e9s, un \u00e9diteur canvas pour les mises en page personnalis\u00e9es, des polices multiples, la g\u00e9n\u00e9ration automatique de corrig\u00e9s et l'export en PDF et JPEG. Que vous vendiez des cahiers de maths sur Etsy, cr\u00e9iez des programmes pour Amazon KDP ou produisiez du mat\u00e9riel compl\u00e9mentaire pour votre classe, ce pack fournit la vari\u00e9t\u00e9 que vos clients attendent.`,
  },
  {
    bundleId: 'literacy-bundle',
    title: 'Pack Lecture et \u00c9criture',
    tagline: '7 g\u00e9n\u00e9rateurs pour les jeux de mots, la pratique d\'\u00e9criture et l\'apprentissage des langues',
    primaryKeyword: 'pack fiches lecture \u00e9criture',
    secondaryKeywords: ['g\u00e9n\u00e9rateurs lecture', 'fiches langues imprimables', 'coffret activit\u00e9s litt\u00e9ratie', 'outils lecture \u00e9criture', 'pack jeux de mots'],
    lsiKeywords: ['mots m\u00eal\u00e9s', '\u00e9criture manuscrite', 'vocabulaire', 'phon\u00e8mes', 'alphabet', 'mots crois\u00e9s', 'lecture', 'orthographe'],
    heroImg: '/samples/english/wordsearch/Word Search 1.jpeg', heroAlt: 'Mots m\u00eal\u00e9s avec images',
    gallery: [{ src: '/samples/english/wordsearch/Word Search 1.jpeg', alt: 'Mots m\u00eal\u00e9s', caption: 'Mots M\u00eal\u00e9s' }],
    youtubeId: '36keBFzJbPo',
    apps: [
      { appId: 'alphabet-train', title: "Train de l'Alphabet", description: "Cr\u00e9ez des fiches d'alphabet en forme de train. Les enfants apprennent les lettres en les associant \u00e0 des images th\u00e9matiques sur chaque wagon." },
      { appId: 'wordsearch', title: 'Mots M\u00eal\u00e9s', description: "G\u00e9n\u00e9rez des grilles de mots m\u00eal\u00e9s avec images ou listes personnalis\u00e9es. Mode texte pour KDP, mode images pour les jeunes apprenants." },
      { appId: 'word-scramble', title: 'Lettres M\u00e9lang\u00e9es', description: "Les \u00e9l\u00e8ves reconstituent des mots \u00e0 partir de lettres m\u00e9lang\u00e9es. Renforce l'orthographe et le vocabulaire de mani\u00e8re ludique." },
      { appId: 'prepositions', title: 'Pr\u00e9positions', description: "Enseignez les pr\u00e9positions de lieu avec des fiches illustr\u00e9es. Sur, sous, devant, derri\u00e8re, \u00e0 c\u00f4t\u00e9 de." },
      { appId: 'word-guess', title: 'Deviner le Mot', description: "Les enfants devinent le mot \u00e0 partir d'indices visuels. D\u00e9veloppe le vocabulaire et l'inf\u00e9rence." },
      { appId: 'cryptogram', title: 'Cryptogrammes', description: "Puzzles de substitution de lettres o\u00f9 les \u00e9l\u00e8ves d\u00e9codent des messages en rempla\u00e7ant les symboles par des lettres." },
      { appId: 'writing', title: "\u00c9criture", description: "G\u00e9n\u00e9rez des fiches d'\u00e9criture guid\u00e9e avec lignes et mod\u00e8les. Cursive et script pour tous les niveaux." },
    ],
    description: `Le Pack Lecture et \u00c9criture r\u00e9unit sept g\u00e9n\u00e9rateurs qui couvrent l'ensemble du spectre litt\u00e9raire \u2014 de la reconnaissance des lettres pour les tout-petits aux puzzles de mots complexes pour les \u00e9l\u00e8ves plus \u00e2g\u00e9s. Au lieu d'acheter chaque outil s\u00e9par\u00e9ment pour 189 $ (27 $ \u00d7 7), obtenez tout pour 79 $ (Commercial) ou 119 $ (Acc\u00e8s Complet).

Le g\u00e9n\u00e9rateur de Train de l'Alphabet aide les plus jeunes \u00e0 reconna\u00eetre et \u00e9crire les lettres. Les Mots M\u00eal\u00e9s et Mots Crois\u00e9s d\u00e9veloppent le vocabulaire et l'orthographe. Les Lettres M\u00e9lang\u00e9es renforcent la conscience orthographique. Le g\u00e9n\u00e9rateur d'\u00c9criture propose des lignes guid\u00e9es pour la pratique manuscrite.

Chaque g\u00e9n\u00e9rateur supporte 11 langues, ce qui en fait un outil id\u00e9al pour les march\u00e9s multilingues. Les enseignants de FLE, les familles bilingues et les vendeurs internationaux trouvent dans ce pack tout ce dont ils ont besoin pour cr\u00e9er du mat\u00e9riel p\u00e9dagogique de qualit\u00e9.`,
  },
  {
    bundleId: 'visual-bundle',
    title: 'Pack Apprentissage Visuel',
    tagline: '7 g\u00e9n\u00e9rateurs pour le dessin, le coloriage, les motifs et la perception visuelle',
    primaryKeyword: 'pack fiches apprentissage visuel',
    secondaryKeywords: ['g\u00e9n\u00e9rateurs visuels \u00e9ducatifs', 'fiches coloriage imprimables pack', 'coffret activit\u00e9s visuelles', 'outils graphisme maternelle', 'pack dessin \u00e9ducatif'],
    lsiKeywords: ['coloriage', 'dessin guid\u00e9', 'motifs', 'graphisme', 'perception visuelle', 'motricit\u00e9 fine', 'comparaison tailles', 'tra\u00e7age'],
    heroImg: '/samples/english/coloring/Coloring 1.jpeg', heroAlt: 'Page de coloriage th\u00e9matique',
    gallery: [{ src: '/samples/english/coloring/Coloring 1.jpeg', alt: 'Coloriage', caption: 'Coloriage th\u00e9matique' }],
    youtubeId: 'gQEk7dPTZUA',
    apps: [
      { appId: 'big-small', title: 'Grand et Petit', description: "Fiches de comparaison de tailles avec images illustr\u00e9es. Les enfants identifient le plus grand et le plus petit." },
      { appId: 'pattern-train', title: 'Train de Motifs', description: "Suites logiques en forme de train. Les enfants compl\u00e8tent la s\u00e9quence en identifiant le motif r\u00e9p\u00e9titif." },
      { appId: 'pattern-worksheet', title: 'Fiches de Motifs', description: "Reconnaissance et compl\u00e9tion de motifs visuels. D\u00e9veloppe le raisonnement logique et la pens\u00e9e math\u00e9matique." },
      { appId: 'draw-and-color', title: 'Dessiner et Colorier', description: "Fiches de dessin guid\u00e9 et coloriage avec th\u00e8mes illustr\u00e9s. Combine cr\u00e9ativit\u00e9 et motricit\u00e9 fine." },
      { appId: 'drawing-lines', title: 'Tra\u00e7age de Lignes', description: "Exercices de graphisme pour tracer des lignes entre images. Pr\u00e9paration \u00e0 l'\u00e9criture et d\u00e9veloppement de la coordination." },
      { appId: 'coloring', title: 'Pages de Coloriage', description: "Pages de coloriage th\u00e9matiques avec 104 th\u00e8mes. Les coloriages sont les produits les plus vendus en volume." },
      { appId: 'chart-count', title: 'Compter et Colorier', description: "Graphiques \u00e0 compl\u00e9ter en comptant et coloriant. Initiation \u00e0 la lecture de donn\u00e9es et aux statistiques." },
    ],
    description: `Le Pack Apprentissage Visuel combine sept g\u00e9n\u00e9rateurs qui d\u00e9veloppent les comp\u00e9tences visuelles, la motricit\u00e9 fine et la cr\u00e9ativit\u00e9 \u2014 des fondamentaux essentiels pour tous les apprentissages. Obtenez sept outils pour 79 $ au lieu de 189 $ s\u00e9par\u00e9ment.

Les coloriages sont les produits imprimables les plus vendus sur Etsy. Ajoutez les fiches de motifs, le dessin guid\u00e9, le tra\u00e7age et la comparaison de tailles pour cr\u00e9er un catalogue complet d'activit\u00e9s visuelles. Le Pack Apprentissage Visuel est particuli\u00e8rement adapt\u00e9 aux vendeurs ciblant la maternelle et la petite section, o\u00f9 la demande en activit\u00e9s visuelles est la plus forte.`,
  },
  {
    bundleId: 'matching-bundle',
    title: 'Pack Association et Tri',
    tagline: '5 g\u00e9n\u00e9rateurs pour les fiches d\'association, de tri et de correspondance',
    primaryKeyword: 'pack fiches association tri',
    secondaryKeywords: ['g\u00e9n\u00e9rateurs association', 'fiches tri imprimables pack', 'coffret correspondance', 'outils appariement maternelle', 'pack jeux association'],
    lsiKeywords: ['association images', 'ombres silhouettes', 'bingo \u00e9ducatif', 'tri cat\u00e9gorisation', 'grille correspondance', 'discrimination visuelle', 'appariement', 'classement'],
    heroImg: '/samples/english/matching/Matching 1.jpeg', heroAlt: "Fiche d'association image-mot",
    gallery: [{ src: '/samples/english/matching/Matching 1.jpeg', alt: 'Association', caption: 'Association images' }],
    youtubeId: 'gQEk7dPTZUA',
    apps: [
      { appId: 'matching', title: "Fiches d'Association", description: "Trois modes : image-image, image-mot, image-lettre initiale. Les \u00e9l\u00e8ves tracent des lignes entre les \u00e9l\u00e9ments correspondants." },
      { appId: 'grid-match', title: 'Grilles de Correspondance', description: "Puzzles en grille o\u00f9 les enfants retrouvent les images dans un tableau. D\u00e9veloppe le rep\u00e9rage dans un plan." },
      { appId: 'shadow-match', title: "Association d'Ombres", description: "Les enfants associent chaque image \u00e0 son ombre. Excellent pour la discrimination visuelle et la reconnaissance des formes." },
      { appId: 'bingo', title: 'Cartes de Bingo', description: "G\u00e9n\u00e9rez des sets de cartes de bingo avec images ou mots. Les enseignants les adorent pour les activit\u00e9s de classe." },
      { appId: 'picture-sort', title: "Tri d'Images", description: "Fiches de tri o\u00f9 les enfants classent des images par cat\u00e9gorie. D\u00e9veloppe la pens\u00e9e logique et la classification." },
    ],
    description: `Le Pack Association et Tri regroupe cinq g\u00e9n\u00e9rateurs centr\u00e9s sur les comp\u00e9tences cognitives fondamentales : association, correspondance, discrimination visuelle et classification. Pour 79 $ au lieu de 135 $ s\u00e9par\u00e9ment.

Ces fiches sont parmi les plus demand\u00e9es en maternelle car elles d\u00e9veloppent des comp\u00e9tences transversales utilis\u00e9es dans toutes les mati\u00e8res. L'association d'ombres et le bingo sont des best-sellers r\u00e9currents sur Etsy et TPT.`,
  },
  {
    bundleId: 'puzzle-bundle',
    title: 'Pack Puzzles et Logique',
    tagline: '4 g\u00e9n\u00e9rateurs de puzzles pour d\u00e9velopper le raisonnement logique',
    primaryKeyword: 'pack puzzles logique enfants',
    secondaryKeywords: ['g\u00e9n\u00e9rateurs puzzles \u00e9ducatifs', 'fiches logique imprimables pack', 'coffret r\u00e9flexion enfants', 'puzzles imprimables maternelle', 'pack jeux logique'],
    lsiKeywords: ['pi\u00e8ces manquantes', 'intrus', 'sudoku enfants', 'labyrinthe', 'raisonnement', 'd\u00e9duction', 'observation', 'pens\u00e9e critique'],
    heroImg: '/samples/english/sudoku/Sudoku 1.jpeg', heroAlt: 'Sudoku enfants avec images',
    gallery: [{ src: '/samples/english/sudoku/Sudoku 1.jpeg', alt: 'Sudoku enfants', caption: 'Sudoku 4x4' }],
    youtubeId: 'VXGKFQRT2rA',
    apps: [
      { appId: 'missing-pieces', title: 'Pi\u00e8ces Manquantes', description: "Les enfants trouvent la pi\u00e8ce manquante d'une image. D\u00e9veloppe l'attention aux d\u00e9tails et le raisonnement spatial." },
      { appId: 'odd-one-out', title: "Trouver l'Intrus", description: "Les enfants identifient l'image qui ne correspond pas au groupe. Renforce la cat\u00e9gorisation et la pens\u00e9e critique." },
      { appId: 'sudoku', title: 'Sudoku pour Enfants', description: "Sudokus 4x4 avec images au lieu de chiffres. Initiation \u00e0 la logique et au raisonnement d\u00e9ductif." },
      { appId: 'picture-path', title: "Chemin d'Images", description: "Labyrinthes visuels o\u00f9 les enfants suivent le bon chemin \u00e0 travers des images. D\u00e9veloppe l'orientation et la planification." },
    ],
    description: `Le Pack Puzzles et Logique r\u00e9unit quatre g\u00e9n\u00e9rateurs con\u00e7us pour d\u00e9velopper le raisonnement logique, l'attention et la r\u00e9solution de probl\u00e8mes. Pour 79 $ au lieu de 108 $ s\u00e9par\u00e9ment.

Les puzzles sont des produits imprimables \u00e0 forte marge car les parents et enseignants les consid\u00e8rent comme des outils de d\u00e9veloppement cognitif. Les sudokus et labyrinthes se vendent particuli\u00e8rement bien sur Amazon KDP sous forme de cahiers d'activit\u00e9s.`,
  },
  {
    bundleId: 'search-bundle',
    title: 'Pack Chercher et Trouver',
    tagline: '4 g\u00e9n\u00e9rateurs pour les activit\u00e9s de recherche et d\u00e9couverte',
    primaryKeyword: 'pack fiches chercher trouver',
    secondaryKeywords: ['g\u00e9n\u00e9rateurs recherche enfants', 'fiches observation imprimables', 'coffret chercher trouver', 'activit\u00e9s concentration enfants', 'pack jeux observation'],
    lsiKeywords: ['chercher compter', 'objets cach\u00e9s', 'mots crois\u00e9s', 'chasse au tr\u00e9sor', 'attention visuelle', 'concentration', 'observation', 'd\u00e9nombrement'],
    heroImg: '/samples/english/find and count/Find and Count 1.jpeg', heroAlt: 'Fiche chercher et compter',
    gallery: [{ src: '/samples/english/find and count/Find and Count 1.jpeg', alt: 'Chercher compter', caption: 'Chercher et Compter' }],
    youtubeId: 'hwMKyCpVzSQ',
    apps: [
      { appId: 'find-and-count', title: 'Chercher et Compter', description: "Les enfants cherchent et comptent des images th\u00e9matiques dans une sc\u00e8ne. Combine l'attention visuelle et le d\u00e9nombrement." },
      { appId: 'find-objects', title: 'Objets Cach\u00e9s', description: "Sc\u00e8nes illustr\u00e9es o\u00f9 les enfants doivent trouver des objets sp\u00e9cifiques. D\u00e9veloppe la concentration et la discrimination visuelle." },
      { appId: 'crossword', title: 'Mots Crois\u00e9s', description: "Mots crois\u00e9s avec indices en images. Les enfants \u00e9crivent le nom de chaque image dans la grille. Renforce vocabulaire et orthographe." },
      { appId: 'treasure-hunt', title: 'Chasse au Tr\u00e9sor', description: "Fiches de direction et orientation o\u00f9 les enfants suivent un parcours fl\u00e9ch\u00e9 pour atteindre le tr\u00e9sor. D\u00e9veloppe le rep\u00e9rage spatial." },
    ],
    description: `Le Pack Chercher et Trouver combine quatre g\u00e9n\u00e9rateurs qui d\u00e9veloppent l'attention visuelle, la concentration et le vocabulaire. Pour 79 $ au lieu de 108 $ s\u00e9par\u00e9ment.

Les activit\u00e9s de recherche visuelle sont extr\u00eamement populaires aupr\u00e8s des enseignants de maternelle et des parents. Les fiches Chercher et Compter et Objets Cach\u00e9s sont des best-sellers r\u00e9currents car les enfants les adorent et ils d\u00e9veloppent des comp\u00e9tences cognitives essentielles.`,
  },
];

function generateFile(bundle) {
  const galleryStr = (bundle.gallery || []).map(g =>
    `      { src: '${g.src}', alt: '${g.alt.replace(/'/g, "\\'")}', caption: '${(g.caption || '').replace(/'/g, "\\'")}' }`
  ).join(',\n');

  const appsStr = bundle.apps.map(a =>
    `    {\n      appId: '${a.appId}',\n      title: '${a.title.replace(/'/g, "\\'")}',\n      description: '${a.description.replace(/'/g, "\\'")}',\n    }`
  ).join(',\n');

  const secondaryLine = bundle.heroImg2 ? `\n      secondary: '${bundle.heroImg2}',\n      secondaryAlt: '${(bundle.heroAlt2 || '').replace(/'/g, "\\'")}',` : '';

  return `import type { BundleContent } from '../types';

export const content: BundleContent = {
  bundleId: '${bundle.bundleId}',
  locale: 'fr',

  seo: {
    titleTag: '${bundle.title.replace(/'/g, "\\'")} | ${bundle.apps.length} G\u00e9n\u00e9rateurs pour 79 $',
    metaDescription: 'Obtenez ${bundle.apps.length} g\u00e9n\u00e9rateurs professionnels en un seul pack. \u00c9conomisez plus de 50 % par rapport \u00e0 l\\'achat individuel. Licence commerciale incluse.',
    primaryKeyword: '${bundle.primaryKeyword.replace(/'/g, "\\'")}',
    secondaryKeywords: ${JSON.stringify(bundle.secondaryKeywords)},
    lsiKeywords: ${JSON.stringify(bundle.lsiKeywords)},
  },

  visuals: {
    heroImages: {
      primary: '${bundle.heroImg}',
      primaryAlt: '${bundle.heroAlt.replace(/'/g, "\\'")}',${secondaryLine}
    },
    sampleGallery: [
${galleryStr}
    ],
    youtubeId: '${bundle.youtubeId}',
    videoTitle: 'Pr\u00e9sentation du ${bundle.title.replace(/'/g, "\\'")}',
  },

  hero: {
    title: '${bundle.title.replace(/'/g, "\\'")}',
    tagline: '${bundle.tagline.replace(/'/g, "\\'")}',
    description: \`${bundle.description}\`,
  },

  appsIncluded: [
${appsStr}
  ],

  bundleBenefits: [
    { title: '\u00c9conomie significative', description: 'Payez un prix unique au lieu d\\'acheter chaque g\u00e9n\u00e9rateur s\u00e9par\u00e9ment. \u00c9conomisez plus de 50 % par rapport \u00e0 l\\'achat individuel.' },
    { title: 'Licence commerciale compl\u00e8te', description: 'Vendez les fiches cr\u00e9\u00e9es sur Etsy, Amazon KDP, Teachers Pay Teachers, Gumroad et toute autre plateforme sans restriction.' },
    { title: 'G\u00e9n\u00e9ration illimit\u00e9e', description: 'Cr\u00e9ez autant de fiches que vous voulez avec chaque g\u00e9n\u00e9rateur. Pas de limites mensuelles ni de syst\u00e8me de cr\u00e9dits.' },
    { title: '104 th\u00e8mes illustr\u00e9s', description: 'Acc\u00e9dez \u00e0 la biblioth\u00e8que compl\u00e8te de 104 th\u00e8mes pour cr\u00e9er des fiches th\u00e9matiques vari\u00e9es.' },
    { title: '11 langues support\u00e9es', description: 'Cr\u00e9ez des fiches en fran\u00e7ais, anglais, allemand, espagnol, portugais, italien, n\u00e9erlandais, su\u00e9dois, danois, norv\u00e9gien et finnois.' },
  ],

  businessUseCases: [
    { title: 'Cr\u00e9er un catalogue Etsy complet', description: 'Utilisez tous les g\u00e9n\u00e9rateurs pour cr\u00e9er un catalogue diversifi\u00e9 de fiches th\u00e9matiques. La vari\u00e9t\u00e9 augmente la visibilit\u00e9 dans les recherches Etsy.', appsUsed: ${JSON.stringify(bundle.apps.map(a => a.appId))} },
    { title: 'Publier des cahiers KDP', description: 'Compilez des fiches de diff\u00e9rents types en cahiers d\\'activit\u00e9s de 50-100 pages pour Amazon KDP.', appsUsed: ${JSON.stringify(bundle.apps.slice(0, 3).map(a => a.appId))} },
    { title: 'Packs enseignants TPT', description: 'Cr\u00e9ez des packs multi-comp\u00e9tences pour Teachers Pay Teachers. Les packs vari\u00e9s se vendent mieux que les produits individuels.', appsUsed: ${JSON.stringify(bundle.apps.slice(0, 4).map(a => a.appId))} },
  ],

  faq: [
    { question: 'Que contient ce pack ?', answer: '${bundle.apps.length} g\u00e9n\u00e9rateurs professionnels avec licence commerciale, 104 th\u00e8mes illustr\u00e9s, g\u00e9n\u00e9ration illimit\u00e9e, corrig\u00e9s automatiques et export PDF/JPEG.' },
    { question: 'Quelle est la diff\u00e9rence entre Commercial et Acc\u00e8s Complet ?', answer: 'Le Pack Commercial (79 $) inclut tous les g\u00e9n\u00e9rateurs avec licence commerciale et th\u00e8mes populaires. Le Pack Acc\u00e8s Complet (119 $) ajoute les 104 th\u00e8mes et toutes les futures mises \u00e0 jour.' },
    { question: 'Puis-je essayer avant d\\'acheter ?', answer: 'Oui. Chaque g\u00e9n\u00e9rateur est disponible gratuitement avec un filigrane. Testez tous les outils sans inscription avant de d\u00e9cider.' },
    { question: 'La licence couvre-t-elle toutes les plateformes ?', answer: 'Oui. La licence commerciale couvre Etsy, Amazon KDP, TPT, Gumroad, votre propre site et toute autre plateforme. Aucune restriction.' },
    { question: 'Y a-t-il des frais r\u00e9currents ?', answer: 'Non. Le pack est un achat unique. Pas d\\'abonnement, pas de frais mensuels, pas de renouvellement.' },
    { question: 'Combien de fiches puis-je cr\u00e9er ?', answer: 'Illimit\u00e9. Cr\u00e9ez autant de fiches que vous le souhaitez avec chaque g\u00e9n\u00e9rateur, sans limites ni cr\u00e9dits.' },
    { question: 'Les mises \u00e0 jour sont-elles incluses ?', answer: 'Le Pack Acc\u00e8s Complet inclut toutes les futures mises \u00e0 jour et nouveaux th\u00e8mes. Le Pack Commercial inclut les mises \u00e0 jour de maintenance.' },
    { question: 'Quelle est votre politique de remboursement ?', answer: 'Toutes les ventes sont d\u00e9finitives en raison de la nature num\u00e9rique. Testez les versions gratuites de chaque g\u00e9n\u00e9rateur avant d\\'acheter.' },
  ],

  internalLinks: [
${bundle.apps.map(a => `    { slug: '${a.appId}', pageType: 'app' as const, anchorText: '${a.title.replace(/'/g, "\\'")}' }`).join(',\n')}
  ],
};
`;
}

let count = 0;
for (const bundle of bundles) {
  const content = generateFile(bundle);
  fs.writeFileSync(path.join(outDir, `${bundle.bundleId}.ts`), content, 'utf8');
  count++;
}

console.log(`Generated ${count} French bundle-content files in ${outDir}`);
