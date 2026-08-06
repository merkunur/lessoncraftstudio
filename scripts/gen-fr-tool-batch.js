const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'frontend', 'config', 'tool-content', 'fr');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

// French tool slugs from tool-page-slugs.ts
const toolSlugs = {
  'addition': 'gratuit-addition-generateur',
  'subtraction': 'gratuit-soustraction-generateur',
  'code-addition': 'gratuit-code-addition-generateur',
  'more-less': 'gratuit-plus-ou-moins-generateur',
  'math-puzzle': 'gratuit-puzzle-mathematique-generateur',
  'math-worksheet': 'gratuit-fiche-mathematique-generateur',
  'alphabet-train': 'gratuit-train-alphabet-generateur',
  'prepositions': 'gratuit-prepositions-generateur',
  'word-guess': 'gratuit-deviner-mot-generateur',
  'word-scramble': 'gratuit-melange-mots-generateur',
  'wordsearch': 'gratuit-mots-meles-generateur',
  'cryptogram': 'gratuit-cryptogramme-generateur',
  'writing': 'gratuit-ecriture-generateur',
  'big-small': 'gratuit-grand-petit-generateur',
  'pattern-train': 'gratuit-train-motifs-generateur',
  'pattern-worksheet': 'gratuit-fiche-motifs-generateur',
  'draw-and-color': 'gratuit-dessiner-colorier-generateur',
  'drawing-lines': 'gratuit-tracer-lignes-generateur',
  'coloring': 'gratuit-coloriage-generateur',
  'chart-count': 'gratuit-compter-graphique-generateur',
  'matching': 'gratuit-association-generateur',
  'grid-match': 'gratuit-grille-association-generateur',
  'shadow-match': 'gratuit-ombres-association-generateur',
  'bingo': 'gratuit-cartes-bingo-generateur',
  'picture-sort': 'gratuit-tri-images-generateur',
  'missing-pieces': 'gratuit-pieces-manquantes-generateur',
  'odd-one-out': 'gratuit-intrus-generateur',
  'sudoku': 'gratuit-sudoku-generateur',
  'picture-path': 'gratuit-chemin-images-generateur',
  'find-and-count': 'gratuit-chercher-compter-generateur',
  'find-objects': 'gratuit-objets-caches-generateur',
  'crossword': 'gratuit-mots-croises-generateur',
  'treasure-hunt': 'gratuit-chasse-au-tresor-generateur',
};

const apps = [
  { appId: 'addition', title: "G\u00e9n\u00e9rateur Gratuit de Fiches d'Addition", shortName: "addition", primaryKeyword: "g\u00e9n\u00e9rateur gratuit fiches addition", secondaryKeywords: ["fiches addition gratuites PDF", "cr\u00e9er fiches addition en ligne", "addition avec images gratuit", "fiches calcul t\u00e9l\u00e9charger", "exercices addition imprimables gratuits"], lsiKeywords: ["addition maternelle", "CP math\u00e9matiques", "comptage avec images", "compl\u00e9ments \u00e0 10", "fluence calcul", "addition manipulations", "sommes jusqu'\u00e0 20", "probl\u00e8mes visuels"], heroImg: '/samples/english/addition/Addition Fun 1.jpeg', heroAlt: "Fiche d'addition gratuite avec images color\u00e9es d'animaux", gallery: [{ src: '/samples/english/addition/Addition Fun 3.jpeg', alt: "Fiche addition v\u00e9hicules", caption: "Th\u00e8me v\u00e9hicules" }, { src: '/samples/english/addition/Addition Fun 5.jpeg', alt: "Trouver l'addend", caption: "Mode trouver l'addend" }], youtubeId: '6O5aCzHkh8M' },
  { appId: 'subtraction', title: "G\u00e9n\u00e9rateur Gratuit de Fiches de Soustraction", shortName: "soustraction", primaryKeyword: "g\u00e9n\u00e9rateur gratuit fiches soustraction", secondaryKeywords: ["fiches soustraction gratuites", "soustraction avec images PDF", "exercices soustraction maternelle", "cr\u00e9er fiches soustraction", "retrancher exercices imprimables"], lsiKeywords: ["soustraction pos\u00e9e", "diff\u00e9rence", "retrancher", "mode barrer", "calcul soustractif", "compl\u00e9ment", "technique op\u00e9ratoire", "probl\u00e8mes"], heroImg: '/samples/english/subtraction/Subtraction Fun 1.jpeg', heroAlt: "Fiche de soustraction gratuite avec mode barrer", gallery: [{ src: '/samples/english/subtraction/Subtraction Fun 2.jpeg', alt: "Soustraction th\u00e8me fruits", caption: "Th\u00e8me fruits" }], youtubeId: '6O5aCzHkh8M' },
  { appId: 'code-addition', title: "G\u00e9n\u00e9rateur Gratuit de Code Addition", shortName: "code addition", primaryKeyword: "g\u00e9n\u00e9rateur gratuit code addition", secondaryKeywords: ["code secret maths gratuit", "d\u00e9coder message addition", "fiches code breaker", "addition ludique gratuit", "message cod\u00e9 calcul"], lsiKeywords: ["d\u00e9chiffrage", "motivation", "engagement", "calcul jeu", "vocabulaire", "lettres", "crypto", "d\u00e9codage"], heroImg: '/samples/english/code addition/Code Addition 1.jpeg', heroAlt: "Fiche code addition gratuite avec message secret", gallery: [{ src: '/samples/english/code addition/Code Addition 1.jpeg', alt: "Code addition", caption: "D\u00e9coder le message" }], youtubeId: '6O5aCzHkh8M' },
  { appId: 'more-less', title: "G\u00e9n\u00e9rateur Gratuit Plus ou Moins", shortName: "plus ou moins", primaryKeyword: "g\u00e9n\u00e9rateur gratuit plus ou moins", secondaryKeywords: ["fiches comparaison quantit\u00e9s gratuites", "plus grand plus petit exercices", "pr\u00e9-maths maternelle gratuit", "comparer nombres images", "sup\u00e9rieur inf\u00e9rieur exercice"], lsiKeywords: ["sens du nombre", "d\u00e9nombrement", "comparer", "quantit\u00e9", "collection", "estimation", "ordonner", "classer"], heroImg: '/samples/english/more less/More Less 1.jpeg', heroAlt: "Fiche plus ou moins gratuite", gallery: [{ src: '/samples/english/more less/More Less 1.jpeg', alt: "Comparaison quantit\u00e9s", caption: "Comparer les groupes" }], youtubeId: '6O5aCzHkh8M' },
  { appId: 'math-puzzle', title: "G\u00e9n\u00e9rateur Gratuit de Puzzles Math\u00e9matiques", shortName: "puzzles math\u00e9matiques", primaryKeyword: "g\u00e9n\u00e9rateur gratuit puzzles maths", secondaryKeywords: ["puzzles math\u00e9matiques imprimables", "grilles calcul gratuites", "casse-t\u00eate maths enfants", "logique math\u00e9matique PDF", "jeux maths \u00e0 imprimer"], lsiKeywords: ["raisonnement", "logique", "grille", "op\u00e9rations", "strat\u00e9gie", "pens\u00e9e critique", "d\u00e9fi", "r\u00e9solution"], heroImg: '/samples/english/math puzzle/Math Puzzles (1).jpeg', heroAlt: "Puzzle math\u00e9matique gratuit en grille", gallery: [{ src: '/samples/english/math puzzle/Math Puzzles (1).jpeg', alt: "Puzzle maths", caption: "Grille math\u00e9matique" }], youtubeId: '6O5aCzHkh8M' },
  { appId: 'math-worksheet', title: "G\u00e9n\u00e9rateur Gratuit de Fiches de Maths", shortName: "fiches de maths", primaryKeyword: "g\u00e9n\u00e9rateur gratuit fiches maths", secondaryKeywords: ["fiches calcul gratuites PDF", "exercices maths imprimables", "op\u00e9rations \u00e0 imprimer", "fiches math\u00e9matiques CP CE1", "g\u00e9n\u00e9rateur exercices calcul gratuit"], lsiKeywords: ["op\u00e9rations pos\u00e9es", "calcul en ligne", "entra\u00eenement", "fluence", "automatismes", "\u00e9valuation", "tables", "calcul mental"], heroImg: '/samples/english/math worksheet/Math Worksheet 1.jpeg', heroAlt: "Fiche de maths gratuite avec op\u00e9rations", gallery: [{ src: '/samples/english/math worksheet/Math Worksheet 1.jpeg', alt: "Fiche maths", caption: "Op\u00e9rations classiques" }], youtubeId: '6O5aCzHkh8M' },
  { appId: 'alphabet-train', title: "G\u00e9n\u00e9rateur Gratuit de Train Alphabet", shortName: "train alphabet", primaryKeyword: "g\u00e9n\u00e9rateur gratuit train alphabet", secondaryKeywords: ["train alphabet \u00e0 imprimer", "fiches lettres maternelle gratuites", "alphabet illustr\u00e9 gratuit", "apprendre lettres PDF", "abc train \u00e9ducatif"], lsiKeywords: ["reconnaissance lettres", "phon\u00e8mes", "pr\u00e9lecture", "graphisme", "ABC", "majuscules", "minuscules", "lettre initiale"], heroImg: '/samples/english/alphabet train/Alphabet Train 1.jpeg', heroAlt: "Train alphabet gratuit color\u00e9", gallery: [{ src: '/samples/english/alphabet train/Alphabet Train 1.jpeg', alt: "Train alphabet", caption: "Train de lettres" }], youtubeId: '36keBFzJbPo' },
  { appId: 'wordsearch', title: "G\u00e9n\u00e9rateur Gratuit de Mots M\u00eal\u00e9s", shortName: "mots m\u00eal\u00e9s", primaryKeyword: "g\u00e9n\u00e9rateur gratuit mots m\u00eal\u00e9s", secondaryKeywords: ["mots m\u00eal\u00e9s \u00e0 imprimer gratuit", "cr\u00e9er mots m\u00eal\u00e9s en ligne", "mots cach\u00e9s gratuit PDF", "grille mots m\u00eal\u00e9s personnalis\u00e9e", "mots m\u00eal\u00e9s avec images"], lsiKeywords: ["vocabulaire", "orthographe", "lecture", "concentration", "recherche", "lexique", "jeux lettres", "grille"], heroImg: '/samples/english/wordsearch/Word Search 1.jpeg', heroAlt: "Mots m\u00eal\u00e9s gratuits avec images", gallery: [{ src: '/samples/english/wordsearch/Word Search 1.jpeg', alt: "Mots m\u00eal\u00e9s animaux", caption: "Th\u00e8me animaux" }, { src: '/samples/english/wordsearch/Word Search 5.jpeg', alt: "Mots m\u00eal\u00e9s texte", caption: "Format KDP" }], youtubeId: '36keBFzJbPo' },
  { appId: 'word-scramble', title: "G\u00e9n\u00e9rateur Gratuit de Lettres M\u00e9lang\u00e9es", shortName: "lettres m\u00e9lang\u00e9es", primaryKeyword: "g\u00e9n\u00e9rateur gratuit lettres m\u00e9lang\u00e9es", secondaryKeywords: ["anagrammes gratuit \u00e0 imprimer", "reconstituer mots exercice", "lettres m\u00e9lang\u00e9es PDF", "jeu lettres enfants gratuit", "orthographe ludique"], lsiKeywords: ["anagramme", "reconstitution", "orthographe", "vocabulaire", "mot myst\u00e8re", "d\u00e9chiffrage", "lettres", "linguistique"], heroImg: '/samples/english/word scramble/Word Scramble 1.jpeg', heroAlt: "Lettres m\u00e9lang\u00e9es gratuites", gallery: [{ src: '/samples/english/word scramble/Word Scramble 1.jpeg', alt: "Lettres m\u00e9lang\u00e9es", caption: "Reconstituer les mots" }], youtubeId: '36keBFzJbPo' },
  { appId: 'prepositions', title: "G\u00e9n\u00e9rateur Gratuit de Fiches Pr\u00e9positions", shortName: "pr\u00e9positions", primaryKeyword: "g\u00e9n\u00e9rateur gratuit fiches pr\u00e9positions", secondaryKeywords: ["pr\u00e9positions lieu exercices gratuit", "sur sous devant derri\u00e8re fiches", "fiches pr\u00e9positions maternelle", "vocabulaire spatial gratuit", "rep\u00e9rage spatial exercices"], lsiKeywords: ["localisation", "orientation", "topologie", "positionnel", "\u00e0 c\u00f4t\u00e9", "entre", "pr\u00e8s", "loin"], heroImg: '/samples/english/prepositions/Prepositions 1.jpeg', heroAlt: "Fiche pr\u00e9positions gratuite", gallery: [{ src: '/samples/english/prepositions/Prepositions 1.jpeg', alt: "Pr\u00e9positions", caption: "Pr\u00e9positions de lieu" }], youtubeId: '36keBFzJbPo' },
  { appId: 'word-guess', title: "G\u00e9n\u00e9rateur Gratuit Deviner le Mot", shortName: "deviner le mot", primaryKeyword: "g\u00e9n\u00e9rateur gratuit deviner mot", secondaryKeywords: ["jeu deviner mot gratuit", "fiches vocabulaire images gratuit", "mot myst\u00e8re maternelle PDF", "devinette \u00e9ducative enfants", "indice visuel mot gratuit"], lsiKeywords: ["devinette", "inf\u00e9rence", "vocabulaire", "compr\u00e9hension", "expression", "langage", "indice", "lecture"], heroImg: '/samples/english/word guess/Word Guess 1.jpeg', heroAlt: "Jeu deviner le mot gratuit", gallery: [{ src: '/samples/english/word guess/Word Guess 1.jpeg', alt: "Deviner le mot", caption: "Indices visuels" }], youtubeId: '36keBFzJbPo' },
  { appId: 'cryptogram', title: "G\u00e9n\u00e9rateur Gratuit de Cryptogrammes", shortName: "cryptogrammes", primaryKeyword: "g\u00e9n\u00e9rateur gratuit cryptogrammes", secondaryKeywords: ["cryptogramme gratuit \u00e0 imprimer", "code secret lettres PDF", "puzzle d\u00e9codage gratuit", "message cod\u00e9 enfants", "substitution lettres exercice"], lsiKeywords: ["chiffrement", "d\u00e9cryptage", "alphabet", "logique", "observation", "correspondance", "patience", "code"], heroImg: '/samples/english/cryptogram/Cryptogram 1.jpeg', heroAlt: "Cryptogramme gratuit \u00e0 d\u00e9coder", gallery: [{ src: '/samples/english/cryptogram/Cryptogram 1.jpeg', alt: "Cryptogramme", caption: "D\u00e9coder le message" }], youtubeId: '36keBFzJbPo' },
  { appId: 'writing', title: "G\u00e9n\u00e9rateur Gratuit de Fiches d'\u00c9criture", shortName: "\u00e9criture", primaryKeyword: "g\u00e9n\u00e9rateur gratuit fiches \u00e9criture", secondaryKeywords: ["fiches graphisme gratuites", "\u00e9criture cursive exercices PDF", "lignes \u00e9criture \u00e0 imprimer", "calligraphie enfants gratuit", "pr\u00e9\u00e9criture maternelle"], lsiKeywords: ["graphomotricit\u00e9", "trac\u00e9 lettres", "motricit\u00e9 fine", "cursive", "script", "copie", "mod\u00e8le", "pr\u00e9hension"], heroImg: '/samples/english/writing/Writing 1.jpeg', heroAlt: "Fiche \u00e9criture gratuite avec lignes guid\u00e9es", gallery: [{ src: '/samples/english/writing/Writing 1.jpeg', alt: "\u00c9criture guid\u00e9e", caption: "\u00c9criture guid\u00e9e" }], youtubeId: '36keBFzJbPo' },
  { appId: 'big-small', title: "G\u00e9n\u00e9rateur Gratuit Grand et Petit", shortName: "grand et petit", primaryKeyword: "g\u00e9n\u00e9rateur gratuit grand petit", secondaryKeywords: ["fiches tailles gratuites", "grand petit exercice maternelle", "comparaison tailles PDF", "notion grandeur \u00e0 imprimer", "discrimination taille enfants"], lsiKeywords: ["taille", "dimension", "classer", "ordonner", "mesure", "perception", "logique", "cat\u00e9gorisation"], heroImg: '/samples/english/big small/Big Small 1.jpeg', heroAlt: "Fiche grand petit gratuite", gallery: [{ src: '/samples/english/big small/Big Small 1.jpeg', alt: "Grand et petit", caption: "Comparer les tailles" }], youtubeId: 'gQEk7dPTZUA' },
  { appId: 'pattern-train', title: "G\u00e9n\u00e9rateur Gratuit de Train Motifs", shortName: "train motifs", primaryKeyword: "g\u00e9n\u00e9rateur gratuit train motifs", secondaryKeywords: ["suites logiques train gratuit", "algorithme maternelle \u00e0 imprimer", "compl\u00e9ter suite exercice", "motifs r\u00e9p\u00e9titifs PDF", "s\u00e9quence images enfants"], lsiKeywords: ["s\u00e9quence", "r\u00e9gularit\u00e9", "algorithme", "logique", "r\u00e9p\u00e9tition", "pr\u00e9diction", "structuration", "motif"], heroImg: '/samples/english/pattern train/Pattern Train 1.jpeg', heroAlt: "Train de motifs gratuit", gallery: [{ src: '/samples/english/pattern train/Pattern Train 1.jpeg', alt: "Train motifs", caption: "Compl\u00e9ter la suite" }], youtubeId: 'gQEk7dPTZUA' },
  { appId: 'pattern-worksheet', title: "G\u00e9n\u00e9rateur Gratuit de Fiches Motifs", shortName: "motifs", primaryKeyword: "g\u00e9n\u00e9rateur gratuit fiches motifs", secondaryKeywords: ["fiches suites logiques gratuites", "reconnaissance motifs exercice", "compl\u00e9ter motif PDF", "algorithme CP gratuit", "s\u00e9quences visuelles enfants"], lsiKeywords: ["suite", "alternance", "pr\u00e9diction", "sch\u00e9ma", "sym\u00e9trie", "r\u00e9gularit\u00e9", "raisonnement", "motif"], heroImg: '/samples/english/pattern worksheet/Pattern Worksheet 1.jpeg', heroAlt: "Fiche motifs gratuite", gallery: [{ src: '/samples/english/pattern worksheet/Pattern Worksheet 1.jpeg', alt: "Motifs visuels", caption: "Reconnaissance motifs" }], youtubeId: 'gQEk7dPTZUA' },
  { appId: 'draw-and-color', title: "G\u00e9n\u00e9rateur Gratuit Dessiner et Colorier", shortName: "dessiner et colorier", primaryKeyword: "g\u00e9n\u00e9rateur gratuit dessiner colorier", secondaryKeywords: ["fiches dessin guid\u00e9 gratuit", "coloriage \u00e9ducatif PDF", "dessin enfants \u00e0 imprimer", "activit\u00e9 graphique gratuite", "apprendre dessiner gratuit"], lsiKeywords: ["dessin dirig\u00e9", "cr\u00e9ativit\u00e9", "motricit\u00e9 fine", "arts visuels", "coloriage", "reproduction", "expression", "illustration"], heroImg: '/samples/english/draw and color/Draw and Color 1.jpeg', heroAlt: "Fiche dessiner colorier gratuite", gallery: [{ src: '/samples/english/draw and color/Draw and Color 1.jpeg', alt: "Dessiner colorier", caption: "Dessin guid\u00e9" }], youtubeId: 'gQEk7dPTZUA' },
  { appId: 'drawing-lines', title: "G\u00e9n\u00e9rateur Gratuit Tra\u00e7age de Lignes", shortName: "tra\u00e7age lignes", primaryKeyword: "g\u00e9n\u00e9rateur gratuit tra\u00e7age lignes", secondaryKeywords: ["fiches graphisme lignes gratuit", "tra\u00e7age maternelle PDF", "exercices graphomotricit\u00e9 gratuit", "relier points \u00e0 imprimer", "pr\u00e9\u00e9criture lignes gratuit"], lsiKeywords: ["graphisme", "trac\u00e9", "coordination", "pr\u00e9hension", "dext\u00e9rit\u00e9", "motricit\u00e9", "contr\u00f4le geste", "pr\u00e9paratoire"], heroImg: '/samples/english/drawing lines/Drawing Lines 1.jpeg', heroAlt: "Fiche tra\u00e7age lignes gratuite", gallery: [{ src: '/samples/english/drawing lines/Drawing Lines 1.jpeg', alt: "Tra\u00e7age lignes", caption: "Tracer des lignes" }], youtubeId: 'gQEk7dPTZUA' },
  { appId: 'coloring', title: "G\u00e9n\u00e9rateur Gratuit de Coloriages", shortName: "coloriages", primaryKeyword: "g\u00e9n\u00e9rateur gratuit coloriages", secondaryKeywords: ["coloriages \u00e0 imprimer gratuit", "pages coloriage enfants PDF", "coloriage th\u00e9matique gratuit", "cr\u00e9er coloriages personnalis\u00e9s", "coloriage \u00e9ducatif imprimable"], lsiKeywords: ["coloriage", "dessin", "illustration", "motricit\u00e9 fine", "cr\u00e9ativit\u00e9", "arts plastiques", "concentration", "d\u00e9tente"], heroImg: '/samples/english/coloring/Coloring 1.jpeg', heroAlt: "Page coloriage gratuite", gallery: [{ src: '/samples/english/coloring/Coloring 1.jpeg', alt: "Coloriage th\u00e9matique", caption: "Coloriage \u00e0 imprimer" }], youtubeId: 'gQEk7dPTZUA' },
  { appId: 'chart-count', title: "G\u00e9n\u00e9rateur Gratuit Compter et Colorier", shortName: "compter et colorier", primaryKeyword: "g\u00e9n\u00e9rateur gratuit compter colorier graphique", secondaryKeywords: ["fiches graphiques maternelle gratuit", "compter colorier exercice PDF", "diagramme \u00e0 compl\u00e9ter enfants", "statistiques maternelle gratuit", "graphique barres \u00e0 imprimer"], lsiKeywords: ["diagramme", "tableau", "donn\u00e9es", "repr\u00e9sentation", "d\u00e9nombrement", "lecture graphique", "organisation", "barres"], heroImg: '/samples/english/chart count/Chart Count 1.jpeg', heroAlt: "Fiche compter colorier gratuite", gallery: [{ src: '/samples/english/chart count/Chart Count 1.jpeg', alt: "Graphique \u00e0 compl\u00e9ter", caption: "Compter et colorier" }], youtubeId: 'gQEk7dPTZUA' },
  { appId: 'matching', title: "G\u00e9n\u00e9rateur Gratuit de Fiches d'Association", shortName: "association", primaryKeyword: "g\u00e9n\u00e9rateur gratuit fiches association", secondaryKeywords: ["fiches association gratuites maternelle", "relier images exercice PDF", "appariement visuel gratuit", "association image mot", "jeu association \u00e9ducatif"], lsiKeywords: ["appariement", "correspondance", "discrimination", "lien logique", "cat\u00e9gorisation", "classement", "observation", "concentration"], heroImg: '/samples/english/matching/Matching 1.jpeg', heroAlt: "Fiche association gratuite", gallery: [{ src: '/samples/english/matching/Matching 1.jpeg', alt: "Association images", caption: "Association image-mot" }], youtubeId: 'gQEk7dPTZUA' },
  { appId: 'grid-match', title: "G\u00e9n\u00e9rateur Gratuit Grilles Correspondance", shortName: "grilles correspondance", primaryKeyword: "g\u00e9n\u00e9rateur gratuit grilles correspondance", secondaryKeywords: ["puzzle grille enfants gratuit", "tableau correspondance PDF", "grille association images", "fiches logique grille gratuit", "puzzle visuel imprimable"], lsiKeywords: ["grille", "matrice", "coordonn\u00e9es", "rep\u00e9rage", "logique", "spatial", "observation", "analyse"], heroImg: '/samples/english/grid match/Grid Match 1.jpeg', heroAlt: "Grille correspondance gratuite", gallery: [{ src: '/samples/english/grid match/Grid Match 1.jpeg', alt: "Grille correspondance", caption: "Puzzle en grille" }], youtubeId: 'gQEk7dPTZUA' },
  { appId: 'shadow-match', title: "G\u00e9n\u00e9rateur Gratuit Association Ombres", shortName: "association ombres", primaryKeyword: "g\u00e9n\u00e9rateur gratuit association ombres", secondaryKeywords: ["fiches ombres maternelle gratuit", "associer ombre image PDF", "silhouettes exercice gratuit", "jeu ombres \u00e9ducatif", "discrimination visuelle ombres"], lsiKeywords: ["silhouette", "forme", "contour", "perception", "reconnaissance", "ombre", "observation", "attention"], heroImg: '/samples/english/shadow match/Shadow Match 1.jpeg', heroAlt: "Association ombres gratuite", gallery: [{ src: '/samples/english/shadow match/Shadow Match 1.jpeg', alt: "Ombres images", caption: "Associer chaque ombre" }], youtubeId: 'gQEk7dPTZUA' },
  { appId: 'bingo', title: "G\u00e9n\u00e9rateur Gratuit de Cartes Bingo", shortName: "cartes bingo", primaryKeyword: "g\u00e9n\u00e9rateur gratuit cartes bingo", secondaryKeywords: ["cartes bingo \u00e0 imprimer gratuit", "bingo \u00e9ducatif maternelle PDF", "cr\u00e9er bingo personnalis\u00e9 gratuit", "jeu bingo images enfants", "bingo th\u00e9matique imprimable"], lsiKeywords: ["jeu soci\u00e9t\u00e9", "loto", "reconnaissance", "attention", "vocabulaire", "animation", "groupe", "\u00e9coute"], heroImg: '/samples/english/bingo/bingo_card word.jpeg', heroAlt: "Carte bingo gratuite personnalis\u00e9e", gallery: [{ src: '/samples/english/bingo/bingo_card word.jpeg', alt: "Bingo personnalis\u00e9", caption: "Bingo avec mots" }], youtubeId: 'd6AOiDXoK1c' },
  { appId: 'picture-sort', title: "G\u00e9n\u00e9rateur Gratuit Tri d'Images", shortName: "tri images", primaryKeyword: "g\u00e9n\u00e9rateur gratuit tri images", secondaryKeywords: ["fiches tri cat\u00e9gorisation gratuit", "classer images exercice PDF", "tri maternelle imprimable", "cat\u00e9gorisation visuelle gratuit", "classement images enfants"], lsiKeywords: ["classement", "cat\u00e9gorie", "trier", "grouper", "ensemble", "propri\u00e9t\u00e9s", "logique", "organisation"], heroImg: '/samples/english/picture sort/Picture Sort 1.jpeg', heroAlt: "Fiche tri images gratuite", gallery: [{ src: '/samples/english/picture sort/Picture Sort 1.jpeg', alt: "Tri cat\u00e9gories", caption: "Trier par cat\u00e9gorie" }], youtubeId: 'gQEk7dPTZUA' },
  { appId: 'missing-pieces', title: "G\u00e9n\u00e9rateur Gratuit Pi\u00e8ces Manquantes", shortName: "pi\u00e8ces manquantes", primaryKeyword: "g\u00e9n\u00e9rateur gratuit pi\u00e8ces manquantes", secondaryKeywords: ["puzzle pi\u00e8ce manquante gratuit", "fiches pi\u00e8ces manquantes PDF", "trouver morceau manquant exercice", "puzzle visuel enfants gratuit", "perception visuelle exercice"], lsiKeywords: ["puzzle", "compl\u00e9tion", "observation", "spatial", "attention", "analyse", "reconstruction", "logique visuelle"], heroImg: '/samples/english/missing pieces/Missing Pieces 1.jpeg', heroAlt: "Puzzle pi\u00e8ces manquantes gratuit", gallery: [{ src: '/samples/english/missing pieces/Missing Pieces 1.jpeg', alt: "Pi\u00e8ces manquantes", caption: "Trouver la pi\u00e8ce" }], youtubeId: 'VXGKFQRT2rA' },
  { appId: 'odd-one-out', title: "G\u00e9n\u00e9rateur Gratuit Trouver l'Intrus", shortName: "l'intrus", primaryKeyword: "g\u00e9n\u00e9rateur gratuit trouver intrus", secondaryKeywords: ["trouver intrus exercice gratuit", "chercher intrus maternelle PDF", "quel est intrus jeu gratuit", "logique exclusion enfants", "fiches intrus imprimables"], lsiKeywords: ["exclusion", "cat\u00e9gorisation", "diff\u00e9rence", "point commun", "raisonnement", "classification", "analyse", "critique"], heroImg: '/samples/english/odd one out/Odd One Out 1.jpeg', heroAlt: "Trouver l'intrus gratuit", gallery: [{ src: '/samples/english/odd one out/Odd One Out 1.jpeg', alt: "Trouver intrus", caption: "Trouver l'intrus" }], youtubeId: 'VXGKFQRT2rA' },
  { appId: 'sudoku', title: "G\u00e9n\u00e9rateur Gratuit de Sudoku Enfants", shortName: "sudoku enfants", primaryKeyword: "g\u00e9n\u00e9rateur gratuit sudoku enfants", secondaryKeywords: ["sudoku images enfants gratuit", "sudoku 4x4 \u00e0 imprimer PDF", "sudoku maternelle gratuit", "sudoku facile images", "puzzle logique enfants gratuit"], lsiKeywords: ["logique", "raisonnement", "d\u00e9duction", "grille", "r\u00e9flexion", "concentration", "patience", "strat\u00e9gie"], heroImg: '/samples/english/sudoku/Sudoku 1.jpeg', heroAlt: "Sudoku enfants gratuit avec images", gallery: [{ src: '/samples/english/sudoku/Sudoku 1.jpeg', alt: "Sudoku images", caption: "Sudoku 4x4 images" }], youtubeId: 'VXGKFQRT2rA' },
  { appId: 'picture-path', title: "G\u00e9n\u00e9rateur Gratuit Chemin d'Images", shortName: "chemin images", primaryKeyword: "g\u00e9n\u00e9rateur gratuit chemin images", secondaryKeywords: ["labyrinthe images enfants gratuit", "chemin \u00e0 suivre maternelle PDF", "fiches labyrinthes imprimables", "parcours images gratuit", "orientation spatiale exercice"], lsiKeywords: ["labyrinthe", "parcours", "direction", "orientation", "navigation", "planification", "anticipation", "r\u00e9solution"], heroImg: '/samples/english/picture path/Picture Path 1.jpeg', heroAlt: "Chemin images gratuit", gallery: [{ src: '/samples/english/picture path/Picture Path 1.jpeg', alt: "Chemin images", caption: "Suivre le chemin" }], youtubeId: 'VXGKFQRT2rA' },
  { appId: 'find-and-count', title: "G\u00e9n\u00e9rateur Gratuit Chercher et Compter", shortName: "chercher et compter", primaryKeyword: "g\u00e9n\u00e9rateur gratuit chercher compter", secondaryKeywords: ["fiches chercher compter gratuites", "compter images exercice PDF", "d\u00e9nombrement visuel gratuit", "chercher compter maternelle", "recherche visuelle enfants"], lsiKeywords: ["d\u00e9nombrement", "attention", "concentration", "comptage", "recherche", "observation", "discrimination", "balayage"], heroImg: '/samples/english/find and count/Find and Count 1.jpeg', heroAlt: "Fiche chercher compter gratuite", gallery: [{ src: '/samples/english/find and count/Find and Count 1.jpeg', alt: "Chercher compter", caption: "Chercher et compter" }], youtubeId: 'hwMKyCpVzSQ' },
  { appId: 'find-objects', title: "G\u00e9n\u00e9rateur Gratuit d'Objets Cach\u00e9s", shortName: "objets cach\u00e9s", primaryKeyword: "g\u00e9n\u00e9rateur gratuit objets cach\u00e9s", secondaryKeywords: ["objets cach\u00e9s \u00e0 imprimer gratuit", "jeu objets cach\u00e9s enfants PDF", "observation visuelle exercice", "chercher objets gratuit", "hidden objects imprimable"], lsiKeywords: ["observation", "attention", "concentration", "recherche", "discrimination", "sc\u00e8ne", "rep\u00e9rage", "focus"], heroImg: '/samples/english/find objects/Hidden Objects 1.jpeg', heroAlt: "Objets cach\u00e9s gratuit", gallery: [{ src: '/samples/english/find objects/Hidden Objects 1.jpeg', alt: "Objets cach\u00e9s", caption: "Trouver les objets" }], youtubeId: 'hwMKyCpVzSQ' },
  { appId: 'crossword', title: "G\u00e9n\u00e9rateur Gratuit de Mots Crois\u00e9s", shortName: "mots crois\u00e9s", primaryKeyword: "g\u00e9n\u00e9rateur gratuit mots crois\u00e9s", secondaryKeywords: ["mots crois\u00e9s \u00e0 imprimer gratuit", "cr\u00e9er mots crois\u00e9s en ligne", "mots crois\u00e9s images enfants", "grille mots crois\u00e9s PDF", "mots fl\u00e9ch\u00e9s personnalis\u00e9s"], lsiKeywords: ["grille", "vocabulaire", "orthographe", "indices", "d\u00e9finitions", "horizontal", "vertical", "jeu mots"], heroImg: '/samples/english/crossword/Crossword 1.jpeg', heroAlt: "Mots crois\u00e9s gratuits avec images", gallery: [{ src: '/samples/english/crossword/Crossword 1.jpeg', alt: "Mots crois\u00e9s", caption: "Mots crois\u00e9s images" }], youtubeId: '36keBFzJbPo' },
  { appId: 'treasure-hunt', title: "G\u00e9n\u00e9rateur Gratuit Chasse au Tr\u00e9sor", shortName: "chasse au tr\u00e9sor", primaryKeyword: "g\u00e9n\u00e9rateur gratuit chasse tr\u00e9sor", secondaryKeywords: ["chasse tr\u00e9sor \u00e0 imprimer gratuit", "fiches direction orientation PDF", "jeu piste enfants gratuit", "chasse tr\u00e9sor \u00e9ducative", "parcours fl\u00e9ch\u00e9 exercice"], lsiKeywords: ["direction", "orientation", "rep\u00e9rage", "gauche droite", "haut bas", "parcours", "navigation", "fl\u00e8ches"], heroImg: '/samples/english/treasure hunt/Treasure Hunt 1.jpeg', heroAlt: "Chasse au tr\u00e9sor gratuite", gallery: [{ src: '/samples/english/treasure hunt/Treasure Hunt 1.jpeg', alt: "Chasse tr\u00e9sor", caption: "Suivre les directions" }], youtubeId: 'hwMKyCpVzSQ' },
];

function generateFile(app) {
  const slug = toolSlugs[app.appId];
  const galleryStr = (app.gallery || []).map(g =>
    `      { src: '${g.src}', alt: '${g.alt.replace(/'/g, "\\'")}', caption: '${(g.caption || '').replace(/'/g, "\\'")}' }`
  ).join(',\n');

  return `import type { FreeToolContent } from '../types';

export const content: FreeToolContent = {
  appId: '${app.appId}',
  locale: 'fr',

  seo: {
    titleTag: '${app.title.replace(/'/g, "\\'")} | PDF Imprimables',
    metaDescription: 'Cr\u00e9ez des fiches de ${app.shortName} gratuites en PDF en quelques secondes. 104 th\u00e8mes, corrig\u00e9s inclus. Aucune inscription requise \u2014 t\u00e9l\u00e9chargez instantan\u00e9ment.',
    primaryKeyword: '${app.primaryKeyword.replace(/'/g, "\\'")}',
    secondaryKeywords: ${JSON.stringify(app.secondaryKeywords)},
    lsiKeywords: ${JSON.stringify(app.lsiKeywords)},
  },

  visuals: {
    heroImages: {
      primary: '${app.heroImg}',
      primaryAlt: '${app.heroAlt.replace(/'/g, "\\'")}',
    },
    sampleGallery: [
${galleryStr}
    ],
    youtubeId: '${app.youtubeId}',
    videoTitle: 'Comment cr\u00e9er des fiches de ${app.shortName.replace(/'/g, "\\'")} gratuitement',
  },

  hero: {
    title: '${app.title.replace(/'/g, "\\'")}',
    tagline: 'Cr\u00e9ez des fiches de ${app.shortName.replace(/'/g, "\\'")} et t\u00e9l\u00e9chargez-les instantan\u00e9ment \u2014 aucune inscription requise',
    description: \`Ce g\u00e9n\u00e9rateur gratuit de fiches de ${app.shortName} transforme les exercices abstraits en une exp\u00e9rience visuelle engageante que les enfants appr\u00e9cient r\u00e9ellement. Au lieu de fixer des \u00e9l\u00e9ments sans contexte, les \u00e9l\u00e8ves travaillent avec des images color\u00e9es \u2014 animaux, v\u00e9hicules, aliments, dinosaures et plus de 100 autres th\u00e8mes \u2014 pour r\u00e9soudre les exercices \u00e0 leur propre rythme. Chaque fiche s'exporte en PDF pr\u00eat \u00e0 imprimer avec un corrig\u00e9 correspondant, pr\u00eat pour votre classe, votre le\u00e7on d'instruction en famille ou votre boutique de produits num\u00e9riques.

Vous contr\u00f4lez chaque aspect de la fiche : difficult\u00e9, nombre d'\u00e9l\u00e9ments par page, orientation, polices et styles de bordure. L'\u00e9diteur canvas int\u00e9gr\u00e9 vous permet de d\u00e9placer les \u00e9l\u00e9ments, d'ajouter des titres et d'ajuster les couleurs avant l'export. La version gratuite inclut toutes les fonctionnalit\u00e9s avec un petit filigrane. Passez au Pack Commercial pour retirer le filigrane et vendre vos cr\u00e9ations sur Etsy, Amazon KDP ou Teachers Pay Teachers.\`,
  },

  whatYouCanCreate: [
    {
      title: 'Fiches th\u00e9matiques illustr\u00e9es',
      description: 'G\u00e9n\u00e9rez des fiches de ${app.shortName} autour de n\\'importe quel th\u00e8me \u2014 animaux, espace, oc\u00e9an, f\u00eates \u2014 avec des images assorties qui captent l\\'attention des jeunes apprenants.',
    },
    {
      title: 'Packs de pratique diff\u00e9renci\u00e9s',
      description: 'Construisez un ensemble de fiches \u00e0 difficult\u00e9 croissante. Commencez par le niveau facile pour les d\u00e9butants et progressez vers des d\u00e9fis plus complexes pour les \u00e9l\u00e8ves avanc\u00e9s.',
    },
    {
      title: 'Fiches d\\'\\u00e9valuation avec corrig\u00e9s',
      description: 'Cr\u00e9ez des fiches qui testent plusieurs comp\u00e9tences sur une m\u00eame page. Chaque fiche inclut un corrig\u00e9 automatique pour une correction rapide.',
    },
    {
      title: 'Activit\u00e9s du matin',
      description: 'Produisez une semaine de fiches rapides en quelques minutes. Imprimez-les \u00e0 l\\'avance pour des activit\u00e9s d\\'accueil quotidiennes.',
    },
    {
      title: 'Cahiers imprimables pour Etsy',
      description: 'Combinez plusieurs fiches th\u00e9matiques en un cahier t\u00e9l\u00e9chargeable en PDF. Vendez des packs saisonniers comme produits num\u00e9riques.',
    },
    {
      title: 'Devoirs et travail \u00e0 la maison',
      description: 'Envoyez des fiches engageantes que les parents peuvent utiliser sans pr\u00e9paration. Le format visuel permet aux enfants de travailler en autonomie.',
    },
  ],

  tutorial: {
    title: 'Comment cr\u00e9er des fiches de ${app.shortName} en 10 \u00e9tapes',
    steps: [
      { title: 'Ouvrir le g\u00e9n\u00e9rateur gratuit', description: 'Cliquez sur le bouton "Essayer Gratuitement" sur cette page pour lancer le g\u00e9n\u00e9rateur directement dans votre navigateur. Aucun compte ni t\u00e9l\u00e9chargement n\u00e9cessaire.' },
      { title: 'Choisir votre langue', description: 'S\u00e9lectionnez parmi 11 langues dans le menu. L\\'interface, les instructions et les libell\u00e9s des fiches changent automatiquement.' },
      { title: 'Choisir un th\u00e8me', description: 'Parcourez le menu d\u00e9roulant pour choisir parmi 104 cat\u00e9gories illustr\u00e9es \u2014 animaux, aliments, v\u00e9hicules, f\u00eates et plus.' },
      { title: 'S\u00e9lectionner le mode d\\'exercice', description: 'Choisissez le mode adapt\u00e9 au niveau de vos \u00e9l\u00e8ves et \u00e0 vos objectifs p\u00e9dagogiques.' },
      { title: 'R\u00e9gler la difficult\u00e9', description: 'Ajustez les param\u00e8tres pour contr\u00f4ler le niveau de complexit\u00e9 des exercices.' },
      { title: 'Configurer la mise en page', description: 'D\u00e9finissez le nombre d\\'\\u00e9l\u00e9ments par page, choisissez portrait ou paysage, s\u00e9lectionnez le format (A4, Letter) et la police.' },
      { title: 'G\u00e9n\u00e9rer la fiche', description: 'Cliquez sur le bouton de g\u00e9n\u00e9ration. L\\'outil cr\u00e9e votre fiche et son corrig\u00e9 en quelques secondes.' },
      { title: '\u00c9diter dans le canvas', description: 'Utilisez l\\'\\u00e9diteur int\u00e9gr\u00e9 pour ajouter du texte, changer les couleurs, repositionner les \u00e9l\u00e9ments ou ajouter des bordures.' },
      { title: 'T\u00e9l\u00e9charger en PDF ou JPEG', description: 'Exportez en PDF haute r\u00e9solution pour l\\'impression ou en JPEG pour le num\u00e9rique. Le corrig\u00e9 s\\'exporte s\u00e9par\u00e9ment.' },
      { title: 'Imprimer ou vendre', description: 'Imprimez pour votre classe, partagez num\u00e9riquement avec les parents, ou vendez sur Etsy, Amazon KDP ou TPT.' },
    ],
  },

  businessIdeas: [
    { title: 'S\u00e9rie de cahiers th\u00e9matiques', description: 'Cr\u00e9ez des cahiers de 20 pages organis\u00e9s par th\u00e8me (animaux, v\u00e9hicules, aliments). Vendez chacun entre 3 et 5 euros en t\u00e9l\u00e9chargement instantan\u00e9.', platform: 'Etsy' },
    { title: 'Pack de pratique diff\u00e9renci\u00e9', description: 'Construisez un pack avec des fiches \u00e0 3 niveaux de difficult\u00e9 (facile, moyen, difficile). Les enseignants adorent la diff\u00e9renciation pr\u00eate \u00e0 l\\'emploi.', platform: 'Teachers Pay Teachers' },
    { title: 'Cahiers d\\'activit\u00e9s low-content', description: 'Compilez 50 \u00e0 100 fiches en cahier d\\'activit\u00e9s broch\u00e9. Amazon KDP g\u00e8re l\\'impression et l\\'exp\u00e9dition.', platform: 'Amazon KDP' },
    { title: 'Packs saisonniers', description: 'Cr\u00e9ez des packs sp\u00e9ciaux f\u00eates (Halloween, No\u00ebl, Saint-Valentin, P\u00e2ques). Les produits saisonniers g\u00e9n\u00e8rent des ventes pr\u00e9visibles.', platform: 'Gumroad' },
    { title: 'Suppl\u00e9ment programme IEF', description: 'Concevez un programme structur\u00e9 de 30 jours progressant en difficult\u00e9. Vendez-le comme compl\u00e9ment pour les familles en instruction en famille.', platform: 'Etsy' },
    { title: 'Fiches multilingues', description: 'Utilisez les 11 langues pour cr\u00e9er des fiches pour les classes de FLE et les familles bilingues. Les march\u00e9s non anglophones ont moins de concurrence.', platform: 'Multi-plateforme' },
  ],

  proTips: [
    { title: 'Commencer par le niveau le plus simple', tip: 'Pour les enfants de maternelle, utilisez le mode le plus simple. Ils peuvent s\\'exercer sans aide, ce qui est parfait pour les 3-4 ans.' },
    { title: 'Adapter le th\u00e8me au programme', tip: 'Si vous \u00e9tudiez les animaux de la mer, g\u00e9n\u00e9rez des fiches avec le th\u00e8me oc\u00e9an pour que la pratique renforce votre unit\u00e9 p\u00e9dagogique.' },
    { title: 'Imprimer les corrig\u00e9s sur papier color\u00e9', tip: 'Imprimez le corrig\u00e9 sur un papier d\\'une couleur diff\u00e9rente. La v\u00e9rification est plus rapide et les \u00e9l\u00e8ves ne prennent pas le corrig\u00e9 par erreur.' },
    { title: 'G\u00e9n\u00e9rer par lot pour la semaine', tip: 'Cr\u00e9ez cinq fiches en une session \u2014 une par jour \u2014 avec une difficult\u00e9 l\u00e9g\u00e8rement croissante. Sauvegardez le tout en un seul PDF.' },
    { title: 'Mode paysage pour les plus jeunes', tip: 'L\\'orientation paysage donne plus d\\'espace horizontal, plus facile pour les petites mains.' },
    { title: 'Combiner th\u00e8mes pour les packs vari\u00e9t\u00e9', tip: 'Pour vendre sur Etsy, cr\u00e9ez un pack de 50 fiches utilisant 10 th\u00e8mes diff\u00e9rents. La vari\u00e9t\u00e9 augmente la valeur per\u00e7ue.' },
    { title: 'Utiliser l\\'\\u00e9diteur pour personnaliser', tip: 'Ajoutez le nom de l\\'\\u00e9l\u00e8ve, le logo de votre boutique ou des instructions personnalis\u00e9es gr\u00e2ce \u00e0 l\\'\\u00e9diteur canvas avant l\\'export.' },
  ],

  faq: [
    { question: 'Ce g\u00e9n\u00e9rateur de ${app.shortName} est-il vraiment gratuit ?', answer: 'Oui. La version gratuite inclut toutes les fonctionnalit\u00e9s \u2014 tous les modes, les 104 th\u00e8mes, l\\'export PDF et les corrig\u00e9s. La seule diff\u00e9rence est un petit filigrane sur les fichiers export\u00e9s. Utilisez la version gratuite ind\u00e9finiment sans cr\u00e9er de compte.' },
    { question: 'Pour quel \u00e2ge ces fiches sont-elles con\u00e7ues ?', answer: 'Les fiches sont con\u00e7ues pour les enfants de 3 \u00e0 8 ans (maternelle au CE2). Les param\u00e8tres permettent d\\'adapter la difficult\u00e9 \u00e0 chaque niveau.' },
    { question: 'Puis-je vendre les fiches cr\u00e9\u00e9es ?', answer: 'Avec la version gratuite, les fiches sont pour un usage personnel ou en classe. Le Pack Commercial (27 $) retire le filigrane et accorde une licence commerciale compl\u00e8te pour vendre sur Etsy, Amazon KDP, TPT ou tout autre site.' },
    { question: 'Quels formats de fichiers puis-je t\u00e9l\u00e9charger ?', answer: 'JPEG haute r\u00e9solution et PDF pr\u00eat \u00e0 imprimer. Le corrig\u00e9 s\\'exporte comme fichier s\u00e9par\u00e9 dans le m\u00eame format.' },
    { question: 'Combien de th\u00e8mes sont disponibles ?', answer: 'La version gratuite inclut une s\u00e9lection de th\u00e8mes. Le Pack Acc\u00e8s Complet (47 $) d\u00e9bloque les 104 th\u00e8mes illustr\u00e9s couvrant animaux, aliments, v\u00e9hicules, f\u00eates et bien plus.' },
    { question: 'Puis-je personnaliser les fiches apr\u00e8s g\u00e9n\u00e9ration ?', answer: 'Oui. L\\'\\u00e9diteur canvas int\u00e9gr\u00e9 permet d\\'ajouter du texte, de changer les polices et couleurs, de repositionner les \u00e9l\u00e9ments et d\\'ajouter des bordures avant l\\'export.' },
    { question: 'Les corrig\u00e9s sont-ils inclus ?', answer: 'Chaque fiche g\u00e9n\u00e8re automatiquement un corrig\u00e9 correspondant. Le corrig\u00e9 utilise la m\u00eame mise en page avec les solutions clairement indiqu\u00e9es.' },
    { question: 'Puis-je les utiliser pour l\\'instruction en famille ?', answer: 'Absolument. Le g\u00e9n\u00e9rateur est populaire aupr\u00e8s des familles en IEF car il permet de cr\u00e9er des fiches fra\u00eeches quotidiennement sans r\u00e9p\u00e9ter les m\u00eames exercices.' },
    { question: 'Quelle diff\u00e9rence entre Pack Commercial et Acc\u00e8s Complet ?', answer: 'Le Pack Commercial (27 $) retire le filigrane et accorde la licence commerciale. Le Pack Acc\u00e8s Complet (47 $) inclut tout le Pack Commercial plus la biblioth\u00e8que compl\u00e8te de 104 th\u00e8mes.' },
    { question: 'Quelle est votre politique de remboursement ?', answer: 'Toutes les ventes sont d\u00e9finitives en raison de la nature num\u00e9rique du produit. Utilisez la version gratuite pour tout tester avant d\\'acheter.' },
  ],

  internalLinks: [
    { slug: '${slug}', pageType: 'tool' as const, anchorText: '${app.title.replace(/'/g, "\\'")}' },
    { slug: '${app.appId}', pageType: 'app' as const, anchorText: '${app.title.replace("Gratuit ", "").replace("Gratuit de ", "").replace("Gratuite ", "").replace(/'/g, "\\'")} \u2014 D\u00e9tails complets' },
  ],
};
`;
}

let count = 0;
for (const app of apps) {
  const slug = toolSlugs[app.appId];
  const content = generateFile(app);
  const filePath = path.join(outDir, `${slug}.ts`);
  fs.writeFileSync(filePath, content, 'utf8');
  count++;
}

console.log(`Generated ${count} French tool-content files in ${outDir}`);
