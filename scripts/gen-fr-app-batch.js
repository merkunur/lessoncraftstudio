const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'frontend', 'config', 'app-content', 'fr');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

// All 33 apps with French-specific SEO and content
const apps = [
  {
    appId: 'addition', category: 'math',
    title: "G\u00e9n\u00e9rateur de Fiches d'Addition",
    tagline: "Transformez l'addition en aventure visuelle avec des fiches de calcul illustr\u00e9es",
    primaryKeyword: "g\u00e9n\u00e9rateur fiches addition",
    secondaryKeywords: ["fiches addition avec images", "exercices addition \u00e0 imprimer", "fiches de calcul maternelle", "cr\u00e9er fiches addition", "addition CP CE1"],
    lsiKeywords: ["calcul mental", "math\u00e9matiques primaire", "addition pos\u00e9e", "nombres et calculs", "num\u00e9ration maternelle", "sommes jusqu'\u00e0 20", "compl\u00e9ments \u00e0 10", "manipulation math\u00e9matique"],
    heroImg: '/samples/english/addition/Addition Fun 1.jpeg',
    heroAlt: "Fiche d'addition avec des images color\u00e9es d'animaux pour l'apprentissage visuel",
    heroImg2: '/samples/english/addition/Addition Fun 2.jpeg',
    heroAlt2: "Fiche d'addition th\u00e8me alimentation avec exercices de comptage visuels",
    gallery: [
      { src: '/samples/english/addition/Addition Fun 3.jpeg', alt: "Fiche d'addition avec images de v\u00e9hicules et sommes jusqu'\u00e0 10", caption: "Th\u00e8me v\u00e9hicules, sommes jusqu'\u00e0 10" },
      { src: '/samples/english/addition/Addition Fun 4.jpeg', alt: "Fiche d'addition mode mixte combinant images et nombres", caption: 'Mode mixte' },
      { src: '/samples/english/addition/Addition Fun 5.jpeg', alt: "Trouver l'addend manquant avec images de fruits", caption: "Trouver l'addend manquant" },
      { src: '/samples/english/addition/Addition Fun 6.jpeg', alt: "Fiche d'addition th\u00e8me espace avec bordure \u00e9toil\u00e9e", caption: "Th\u00e8me espace avec bordure" },
      { src: '/samples/english/addition/Addition Fun 7.jpeg', alt: "Fiche d'addition format paysage avec animaux marins", caption: 'Format paysage' },
      { src: '/samples/english/addition/Addition Fun 8.jpeg', alt: "Corrig\u00e9 automatique de la fiche d'addition", caption: 'Corrig\u00e9 automatique' },
    ],
    youtubeId: '6O5aCzHkh8M',
    videoTitle: "Comment cr\u00e9er des fiches d'addition avec images",
    description: `Chaque enfant qui lutte avec l'addition partage le m\u00eame probl\u00e8me : des chiffres abstraits sur une page qui ne signifient rien pour lui. Le G\u00e9n\u00e9rateur de Fiches d'Addition remplace les \u00e9quations nues par des probl\u00e8mes illustr\u00e9s color\u00e9s que les enfants veulent r\u00e9soudre. Choisissez parmi 104 th\u00e8mes illustr\u00e9s \u2014 animaux, v\u00e9hicules, aliments, espace et des dizaines d'autres \u2014 puis regardez le g\u00e9n\u00e9rateur cr\u00e9er des fiches compl\u00e8tes avec corrig\u00e9s automatiques en quelques secondes.

Quatre modes d'exercice distincts maintiennent la pratique vari\u00e9e. Le mode Image + Image montre des illustrations des deux c\u00f4t\u00e9s du signe plus, parfait pour les enfants qui apprennent \u00e0 compter. Le mode Image + Nombre fait le lien entre le concret et l'abstrait. Le mode Trouver l'Addend demande aux \u00e9l\u00e8ves de raisonner \u00e0 rebours. Le mode Mixte combine les trois pour une \u00e9valuation compl\u00e8te.

Vous contr\u00f4lez chaque d\u00e9tail : d\u00e9finissez les op\u00e9randes minimum et maximum de 1 \u00e0 99, choisissez le nombre de probl\u00e8mes par page, s\u00e9lectionnez le format et l'orientation, et optez pour l'une des 7 polices professionnelles. L'\u00e9diteur int\u00e9gr\u00e9 vous permet d'ajouter du texte, d'ajuster les couleurs, de d\u00e9placer les \u00e9l\u00e9ments et de peaufiner la mise en page avant l'export. Chaque fiche s'exporte en JPEG haute r\u00e9solution et en PDF pr\u00eat \u00e0 imprimer, avec un corrig\u00e9 g\u00e9n\u00e9r\u00e9 automatiquement.

Que vous enseigniez les math\u00e9matiques en maternelle, animiez un groupe d'instruction en famille, ou vendiez des fiches \u00e9ducatives sur Etsy et Amazon KDP, ce g\u00e9n\u00e9rateur produit des fiches de qualit\u00e9 professionnelle en une fraction du temps. La version gratuite inclut toutes les fonctionnalit\u00e9s avec un filigrane \u2014 essayez maintenant sans inscription.`,
    features: [
      { title: 'Quatre modes d\'exercice progressifs', description: "Le mode Image + Image utilise des illustrations des deux c\u00f4t\u00e9s de l'\u00e9quation, id\u00e9al pour les non-lecteurs. Image + Nombre introduit les chiffres \u00e0 c\u00f4t\u00e9 des visuels. Trouver l'Addend inverse le probl\u00e8me. Le mode Mixte combine les trois al\u00e9atoirement pour les \u00e9valuations." },
      { title: "Plage de nombres ajustable", description: "D\u00e9finissez les valeurs minimum et maximum pour chaque op\u00e9rande. Cr\u00e9ez des fiches ciblant les sommes jusqu'\u00e0 5 pour la maternelle, jusqu'\u00e0 20 pour le CP, ou jusqu'\u00e0 99 pour les \u00e9l\u00e8ves plus avanc\u00e9s." },
      { title: '104 th\u00e8mes illustr\u00e9s', description: "Chaque th\u00e8me contient des images professionnelles qui apparaissent directement dans les probl\u00e8mes. Animaux de la ferme, cr\u00e9atures marines, v\u00e9hicules, fruits, instruments de musique et \u00e9l\u00e9ments saisonniers." },
      { title: '\u00c9diteur canvas complet', description: "Ajoutez du texte personnalis\u00e9 avec police, taille et couleur ajustables. Changez l'arri\u00e8re-plan, appliquez des bordures, repositionnez les \u00e9l\u00e9ments et utilisez les contr\u00f4les de zoom et d'annulation." },
      { title: '7 polices professionnelles', description: "Sept polices optimis\u00e9es pour la lisibilit\u00e9 selon les \u00e2ges. Des lettres larges pour les jeunes enfants aux styles plus compacts pour les \u00e9l\u00e8ves plus \u00e2g\u00e9s." },
      { title: 'Corrig\u00e9s automatiques', description: "Chaque fiche g\u00e9n\u00e8re un corrig\u00e9 avec la m\u00eame mise en page, la m\u00eame police et le m\u00eame th\u00e8me. Les r\u00e9ponses sont clairement affich\u00e9es pour une correction rapide." },
      { title: 'Double export : JPEG et PDF', description: "Exportez en JPEG haute r\u00e9solution pour le num\u00e9rique ou en PDF pr\u00eat \u00e0 imprimer. Le PDF est dimensionn\u00e9 pour A4, Letter ou format personnalis\u00e9." },
      { title: "Import d'images personnalis\u00e9es", description: "T\u00e9l\u00e9chargez vos propres images pour les utiliser dans les probl\u00e8mes. Id\u00e9al pour le branding ou les visuels sp\u00e9cifiques \u00e0 votre classe." },
    ],
    howItWorks: [
      { title: "Choisir le mode d'exercice", description: "S\u00e9lectionnez parmi quatre modes : Image + Image pour le comptage visuel, Image + Nombre pour la transition, Trouver l'Addend pour le raisonnement inverse, ou Mixte pour une pratique vari\u00e9e." },
      { title: "D\u00e9finir la plage de nombres", description: "Utilisez les curseurs pour contr\u00f4ler la difficult\u00e9. De 1 \u00e0 10 pour la maternelle, de 1 \u00e0 20 pour le CP, jusqu'\u00e0 99 pour les \u00e9l\u00e8ves avanc\u00e9s." },
      { title: 'Choisir un th\u00e8me et une mise en page', description: "Parcourez 104 th\u00e8mes par cat\u00e9gorie. Choisissez le format de page, l'orientation et le nombre de probl\u00e8mes par page. S\u00e9lectionnez parmi 7 polices." },
      { title: "Personnaliser dans l'\u00e9diteur", description: "Ajoutez des titres, changez les couleurs, appliquez des bordures d\u00e9coratives et repositionnez les \u00e9l\u00e9ments pour une mise en page parfaite." },
      { title: 'Exporter et imprimer', description: "T\u00e9l\u00e9chargez votre fiche en JPEG ou PDF haute r\u00e9solution. Le corrig\u00e9 s'exporte automatiquement avec la m\u00eame mise en page." },
    ],
    businessUseCases: [
      { title: "Vendre des packs d'addition sur Etsy", description: "Cr\u00e9ez des packs th\u00e9matiques \u2014 10 fiches animaux, 10 fiches aliments, 10 fiches v\u00e9hicules \u2014 et vendez-les en t\u00e9l\u00e9chargement instantan\u00e9. Les acheteurs Etsy recherchent activement des fiches d'addition avec images.", platform: 'Etsy' },
      { title: "Publier des cahiers d'activit\u00e9s sur Amazon KDP", description: "Compilez des fiches PDF \u00e0 diff\u00e9rents niveaux de difficult\u00e9 en cahiers de 50 \u00e0 100 pages. Un cahier 'Addition Maternelle avec Animaux' cible des mots-cl\u00e9s \u00e0 fort volume.", platform: 'Amazon KDP' },
      { title: 'Cr\u00e9er des ressources pour TPT', description: "Les enseignants sur Teachers Pay Teachers recherchent des ressources pr\u00eates \u00e0 imprimer. Cr\u00e9ez des packs diff\u00e9renci\u00e9s : sommes jusqu'\u00e0 5, jusqu'\u00e0 10, jusqu'\u00e0 20.", platform: 'Teachers Pay Teachers' },
      { title: 'Fiches saisonni\u00e8res et f\u00eates', description: "Utilisez les th\u00e8mes illustr\u00e9s pour cr\u00e9er des collections sp\u00e9cifiques : citrouilles pour Halloween, flocons pour l'hiver, c\u0153urs pour la Saint-Valentin.", platform: 'Multi-plateforme' },
      { title: "Programme de math\u00e9matiques pour l'IEF", description: "Structurez les fiches par semaine et difficult\u00e9 pour cr\u00e9er un programme progressif d'addition. 36 semaines de fiches pour les familles en instruction en famille.", platform: 'Gumroad' },
      { title: 'Lead magnets gratuits', description: "Offrez un \u00e9chantillon gratuit de 5 fiches en \u00e9change d'inscriptions email. L'\u00e9chantillon d\u00e9montre la qualit\u00e9 et dirige vers vos packs payants.", platform: 'Email Marketing' },
    ],
    faq: [
      { q: "Quels modes d'exercice propose le g\u00e9n\u00e9rateur d'addition ?", a: "Le g\u00e9n\u00e9rateur inclut quatre modes : Image + Image (illustrations des deux c\u00f4t\u00e9s), Image + Nombre (image et chiffre), Trouver l'Addend (identifier le nombre manquant), et Mixte (combinaison al\u00e9atoire des trois)." },
      { q: "Puis-je contr\u00f4ler le niveau de difficult\u00e9 ?", a: "Oui. D\u00e9finissez les valeurs minimum et maximum de 1 \u00e0 99. Pour la maternelle, essayez 1-10. Pour le CP, 1-20. Pour les plus grands, montez jusqu'\u00e0 99." },
      { q: "Combien de th\u00e8mes illustr\u00e9s sont disponibles ?", a: "L'acc\u00e8s complet inclut les 104 th\u00e8mes : animaux, v\u00e9hicules, aliments, nature, sports, musique, saisons et plus. Vous pouvez aussi importer vos propres images." },
      { q: "Quels formats de page sont support\u00e9s ?", a: "A4, Letter US (8.5 x 11 pouces) ou dimensions personnalis\u00e9es. Orientations portrait et paysage. Export en JPEG haute r\u00e9solution et PDF pr\u00eat \u00e0 imprimer." },
      { q: "Les corrig\u00e9s sont-ils g\u00e9n\u00e9r\u00e9s automatiquement ?", a: "Oui. Chaque fiche produit un corrig\u00e9 utilisant la m\u00eame mise en page, le m\u00eame th\u00e8me et la m\u00eame police. Le corrig\u00e9 est un fichier s\u00e9par\u00e9." },
      { q: "Puis-je utiliser ces fiches \u00e0 des fins commerciales ?", a: "Oui. Le Pack Commercial et le Pack Acc\u00e8s Complet incluent une licence commerciale. Vendez vos fiches sur Etsy, Amazon KDP, TPT, Gumroad ou tout autre site." },
      { q: "Quelle est la diff\u00e9rence entre Pack Commercial et Acc\u00e8s Complet ?", a: "Le Pack Commercial (27 $) inclut le g\u00e9n\u00e9rateur avec licence commerciale et les th\u00e8mes populaires. Le Pack Acc\u00e8s Complet (47 $) ajoute les 104 th\u00e8mes, les futures mises \u00e0 jour et la biblioth\u00e8que d'images compl\u00e8te." },
      { q: "Puis-je essayer avant d'acheter ?", a: "Absolument. Le g\u00e9n\u00e9rateur est gratuit sans inscription. La version gratuite inclut toutes les fonctionnalit\u00e9s avec un petit filigrane sur les exports." },
      { q: "Quelles langues sont prises en charge ?", a: "L'interface et les fiches supportent 11 langues : fran\u00e7ais, anglais, allemand, espagnol, portugais, italien, n\u00e9erlandais, su\u00e9dois, danois, norv\u00e9gien et finnois." },
      { q: "Y a-t-il une limite au nombre de fiches ?", a: "Non. Les deux offres payantes incluent une g\u00e9n\u00e9ration illimit\u00e9e. Aucune limite mensuelle ni syst\u00e8me de cr\u00e9dits." },
      { q: "Quelle est votre politique de remboursement ?", a: "En raison de la nature num\u00e9rique du produit, toutes les ventes sont d\u00e9finitives. Nous vous encourageons \u00e0 utiliser la version gratuite pour tester toutes les fonctionnalit\u00e9s avant d'acheter." },
    ],
    internalLinks: [
      { slug: 'subtraction', pageType: 'app', anchorText: "G\u00e9n\u00e9rateur de Fiches de Soustraction" },
      { slug: 'math-puzzle', pageType: 'app', anchorText: 'G\u00e9n\u00e9rateur de Puzzles Math\u00e9matiques' },
      { slug: 'chart-count', pageType: 'app', anchorText: 'G\u00e9n\u00e9rateur Compter et Colorier' },
      { slug: 'addition', pageType: 'tool', anchorText: "Essayer le G\u00e9n\u00e9rateur d'Addition Gratuit" },
      { slug: 'math-bundle', pageType: 'bundle', anchorText: 'Pack Math\u00e9matiques Complet' },
    ],
  },
  {
    appId: 'subtraction', category: 'math',
    title: 'G\u00e9n\u00e9rateur de Fiches de Soustraction',
    tagline: 'Cr\u00e9ez des fiches de soustraction visuelles avec le mode barrer pour un apprentissage intuitif',
    primaryKeyword: 'g\u00e9n\u00e9rateur fiches soustraction',
    secondaryKeywords: ['fiches soustraction avec images', 'exercices soustraction \u00e0 imprimer', 'soustraction maternelle CP', 'cr\u00e9er fiches soustraction', 'soustraction pos\u00e9e exercices'],
    lsiKeywords: ['retrancher', 'diff\u00e9rence', 'calcul soustractif', 'compl\u00e9ment', 'd\u00e9composition', 'technique op\u00e9ratoire', 'retenue soustraction', 'probl\u00e8mes soustractifs'],
    heroImg: '/samples/english/subtraction/Subtraction Fun 1.jpeg',
    heroAlt: 'Fiche de soustraction avec images color\u00e9es et mode barrer',
    heroImg2: '/samples/english/subtraction/Subtraction Fun 2.jpeg',
    heroAlt2: 'Fiche de soustraction th\u00e8me fruits avec exercices visuels',
    gallery: [
      { src: '/samples/english/subtraction/Subtraction Fun 1.jpeg', alt: 'Fiche de soustraction mode barrer avec animaux', caption: 'Mode barrer avec animaux' },
      { src: '/samples/english/subtraction/Subtraction Fun 2.jpeg', alt: 'Fiche de soustraction th\u00e8me fruits', caption: 'Th\u00e8me fruits' },
      { src: '/samples/english/subtraction/Subtraction Fun 3.jpeg', alt: 'Fiche soustraction mode Image + Nombre', caption: 'Mode Image + Nombre' },
      { src: '/samples/english/subtraction/Subtraction Fun 4.jpeg', alt: 'Fiche soustraction mode mixte', caption: 'Mode mixte' },
    ],
    youtubeId: '6O5aCzHkh8M',
    videoTitle: 'Comment cr\u00e9er des fiches de soustraction avec images',
  },
  {
    appId: 'code-addition', category: 'math',
    title: "G\u00e9n\u00e9rateur de Code Addition",
    tagline: "Les \u00e9l\u00e8ves r\u00e9solvent des additions pour d\u00e9coder des messages secrets",
    primaryKeyword: 'g\u00e9n\u00e9rateur code addition',
    secondaryKeywords: ['message cod\u00e9 addition', 'code secret math\u00e9matiques', 'd\u00e9codage addition', 'fiches code breaker maths', 'addition ludique'],
    lsiKeywords: ['d\u00e9chiffrer', 'cryptographie enfants', 'motivation math\u00e9matiques', 'jeu \u00e9ducatif calcul', 'engagement \u00e9l\u00e8ves', 'addition jeu', 'calcul code', 'vocabulaire addition'],
    heroImg: '/samples/english/code addition/Code Addition 1.jpeg',
    heroAlt: "Fiche de code addition o\u00f9 chaque r\u00e9ponse r\u00e9v\u00e8le une lettre",
    gallery: [{ src: '/samples/english/code addition/Code Addition 1.jpeg', alt: 'Fiche code addition avec message secret', caption: 'D\u00e9coder un message secret' }],
    youtubeId: '6O5aCzHkh8M',
    videoTitle: 'Comment cr\u00e9er des fiches de code addition',
  },
  {
    appId: 'more-less', category: 'math',
    title: 'G\u00e9n\u00e9rateur Plus ou Moins',
    tagline: "Cr\u00e9ez des fiches de comparaison de quantit\u00e9s avec des illustrations color\u00e9es",
    primaryKeyword: 'g\u00e9n\u00e9rateur fiches plus ou moins',
    secondaryKeywords: ['comparaison quantit\u00e9s maternelle', 'plus grand plus petit exercices', 'fiches comparaison nombres', 'plus ou moins \u00e0 imprimer', 'pr\u00e9-math\u00e9matiques maternelle'],
    lsiKeywords: ['sens du nombre', 'comparer des collections', 'autant que', 'd\u00e9nombrement', 'quantification', 'sup\u00e9rieur inf\u00e9rieur', 'ordonner', 'estimer'],
    heroImg: '/samples/english/more less/More Less 1.jpeg',
    heroAlt: 'Fiche plus ou moins avec images color\u00e9es \u00e0 comparer',
    gallery: [{ src: '/samples/english/more less/More Less 1.jpeg', alt: 'Fiche de comparaison de quantit\u00e9s', caption: 'Comparer des groupes illustr\u00e9s' }],
    youtubeId: '6O5aCzHkh8M',
    videoTitle: 'Comment cr\u00e9er des fiches plus ou moins',
  },
  {
    appId: 'math-puzzle', category: 'math',
    title: 'G\u00e9n\u00e9rateur de Puzzles Math\u00e9matiques',
    tagline: "Cr\u00e9ez des grilles de puzzles math\u00e9matiques avec op\u00e9rations interconnect\u00e9es",
    primaryKeyword: 'g\u00e9n\u00e9rateur puzzles math\u00e9matiques',
    secondaryKeywords: ['grilles math\u00e9matiques \u00e0 imprimer', 'puzzle calcul enfants', 'fiches logique math\u00e9matique', 'jeux math\u00e9matiques \u00e0 imprimer', 'casse-t\u00eate math\u00e9matiques'],
    lsiKeywords: ['raisonnement logique', 'pens\u00e9e critique', 'r\u00e9solution probl\u00e8mes', 'grille op\u00e9rations', 'math\u00e9matiques ludiques', 'calcul r\u00e9fl\u00e9chi', 'd\u00e9fi math', 'strat\u00e9gie'],
    heroImg: '/samples/english/math puzzle/Math Puzzles (1).jpeg',
    heroAlt: 'Puzzle math\u00e9matique en grille avec images d\'animaux',
    gallery: [
      { src: '/samples/english/math puzzle/Math Puzzles (1).jpeg', alt: 'Puzzle math\u00e9matique th\u00e8me animaux', caption: 'Th\u00e8me animaux' },
      { src: '/samples/english/math puzzle/Math Puzzles (3).jpeg', alt: 'Puzzle math\u00e9matique th\u00e8me espace', caption: 'Th\u00e8me espace' },
    ],
    youtubeId: '6O5aCzHkh8M',
    videoTitle: 'Comment cr\u00e9er des puzzles math\u00e9matiques',
  },
  {
    appId: 'math-worksheet', category: 'math',
    title: 'G\u00e9n\u00e9rateur de Fiches de Math\u00e9matiques',
    tagline: "Cr\u00e9ez des fiches d'op\u00e9rations traditionnelles avec additions, soustractions et calculs mixtes",
    primaryKeyword: 'g\u00e9n\u00e9rateur fiches math\u00e9matiques',
    secondaryKeywords: ['fiches calcul \u00e0 imprimer', 'exercices math\u00e9matiques PDF', 'fiches op\u00e9rations primaire', 'cr\u00e9er fiches maths', 'g\u00e9n\u00e9rateur exercices calcul'],
    lsiKeywords: ['op\u00e9rations pos\u00e9es', 'calcul en ligne', 'tables de multiplication', 'fluence calcul', 'automatismes', 'technique op\u00e9ratoire', '\u00e9valuation maths', 'entra\u00eenement calcul'],
    heroImg: '/samples/english/math worksheet/Math Worksheet 1.jpeg',
    heroAlt: 'Fiche de math\u00e9matiques avec op\u00e9rations pos\u00e9es',
    gallery: [{ src: '/samples/english/math worksheet/Math Worksheet 1.jpeg', alt: 'Fiche de calcul traditionnelle', caption: 'Op\u00e9rations classiques' }],
    youtubeId: '6O5aCzHkh8M',
    videoTitle: 'Comment cr\u00e9er des fiches de math\u00e9matiques',
  },
  {
    appId: 'alphabet-train', category: 'literacy',
    title: "G\u00e9n\u00e9rateur de Train de l'Alphabet",
    tagline: "Cr\u00e9ez des fiches d'alphabet en forme de train avec lettres et images th\u00e9matiques",
    primaryKeyword: "g\u00e9n\u00e9rateur train alphabet",
    secondaryKeywords: ['fiches alphabet maternelle', 'lettres \u00e0 imprimer', "train de l'alphabet", 'apprentissage lettres', 'alphabet illustr\u00e9'],
    lsiKeywords: ['reconnaissance lettres', 'phon\u00e8mes', 'conscience phon\u00e9mique', '\u00e9criture lettres', 'pr\u00e9lecture', 'graphisme', 'ABC', 'lettre initiale'],
    heroImg: '/samples/english/alphabet train/Alphabet Train 1.jpeg',
    heroAlt: "Train de l'alphabet avec wagons portant des lettres et images",
    gallery: [{ src: '/samples/english/alphabet train/Alphabet Train 1.jpeg', alt: 'Train alphabet color\u00e9', caption: "Train de l'alphabet illustr\u00e9" }],
    youtubeId: '36keBFzJbPo',
    videoTitle: "Comment cr\u00e9er un train de l'alphabet",
  },
  {
    appId: 'wordsearch', category: 'literacy',
    title: 'G\u00e9n\u00e9rateur de Mots M\u00eal\u00e9s',
    tagline: "Cr\u00e9ez des grilles de mots m\u00eal\u00e9s avec images th\u00e9matiques ou listes personnalis\u00e9es",
    primaryKeyword: 'g\u00e9n\u00e9rateur mots m\u00eal\u00e9s',
    secondaryKeywords: ['mots m\u00eal\u00e9s \u00e0 imprimer', 'cr\u00e9er mots m\u00eal\u00e9s', 'mots cach\u00e9s g\u00e9n\u00e9rateur', 'grille mots m\u00eal\u00e9s PDF', 'mots m\u00eal\u00e9s personnalis\u00e9s'],
    lsiKeywords: ['vocabulaire', 'orthographe', 'mots fl\u00e9ch\u00e9s', 'jeux de lettres', 'lecture', 'concentration', 'recherche de mots', 'lexique'],
    heroImg: '/samples/english/wordsearch/Word Search 1.jpeg',
    heroAlt: 'Grille de mots m\u00eal\u00e9s avec images th\u00e9matiques',
    heroImg2: '/samples/english/wordsearch/Word Search 2.jpeg',
    heroAlt2: 'Corrig\u00e9 de mots m\u00eal\u00e9s avec mots surlign\u00e9s',
    gallery: [
      { src: '/samples/english/wordsearch/Word Search 1.jpeg', alt: 'Mots m\u00eal\u00e9s th\u00e8me animaux', caption: 'Th\u00e8me animaux' },
      { src: '/samples/english/wordsearch/Word Search 3.jpeg', alt: 'Mots m\u00eal\u00e9s avanc\u00e9', caption: 'Niveau avanc\u00e9' },
      { src: '/samples/english/wordsearch/Word Search 5.jpeg', alt: 'Mots m\u00eal\u00e9s texte uniquement', caption: 'Format texte pour KDP' },
      { src: '/samples/english/wordsearch/Word Search 8.jpeg', alt: 'Corrig\u00e9 automatique', caption: 'Corrig\u00e9 automatique inclus' },
    ],
    youtubeId: '36keBFzJbPo',
    videoTitle: 'Comment cr\u00e9er des mots m\u00eal\u00e9s avec images',
  },
  {
    appId: 'word-scramble', category: 'literacy',
    title: 'G\u00e9n\u00e9rateur de Lettres M\u00e9lang\u00e9es',
    tagline: "Cr\u00e9ez des fiches de lettres m\u00e9lang\u00e9es o\u00f9 les \u00e9l\u00e8ves reconstituent les mots",
    primaryKeyword: 'g\u00e9n\u00e9rateur lettres m\u00e9lang\u00e9es',
    secondaryKeywords: ['anagrammes \u00e0 imprimer', 'fiches lettres m\u00e9lang\u00e9es', 'reconstituer mots exercice', 'jeu de lettres enfants', 'orthographe ludique'],
    lsiKeywords: ['anagramme', 'reconstitution', 'orthographe', 'vocabulaire', 'lettres m\u00e9lang\u00e9es', 'mot myst\u00e8re', 'jeu linguistique', 'd\u00e9chiffrage'],
    heroImg: '/samples/english/word scramble/Word Scramble 1.jpeg',
    heroAlt: 'Fiche de lettres m\u00e9lang\u00e9es avec images indices',
    gallery: [{ src: '/samples/english/word scramble/Word Scramble 1.jpeg', alt: 'Lettres m\u00e9lang\u00e9es th\u00e9matiques', caption: 'Reconstituer les mots' }],
    youtubeId: '36keBFzJbPo',
    videoTitle: 'Comment cr\u00e9er des fiches de lettres m\u00e9lang\u00e9es',
  },
  {
    appId: 'prepositions', category: 'literacy',
    title: 'G\u00e9n\u00e9rateur de Fiches de Pr\u00e9positions',
    tagline: "Cr\u00e9ez des fiches illustr\u00e9es pour enseigner les pr\u00e9positions de lieu",
    primaryKeyword: 'g\u00e9n\u00e9rateur fiches pr\u00e9positions',
    secondaryKeywords: ['pr\u00e9positions de lieu exercices', 'fiches pr\u00e9positions maternelle', 'sur sous devant derri\u00e8re', 'rep\u00e9rage spatial', 'vocabulaire spatial'],
    lsiKeywords: ['localisation', 'orientation spatiale', 'rep\u00e9rage espace', 'topologie', 'vocabulaire positionnel', '\u00e0 c\u00f4t\u00e9 de', 'entre', 'pr\u00e8s de'],
    heroImg: '/samples/english/prepositions/Prepositions 1.jpeg',
    heroAlt: 'Fiche de pr\u00e9positions avec images montrant les positions',
    gallery: [{ src: '/samples/english/prepositions/Prepositions 1.jpeg', alt: 'Exercice de pr\u00e9positions illustr\u00e9', caption: 'Pr\u00e9positions de lieu' }],
    youtubeId: '36keBFzJbPo',
    videoTitle: 'Comment cr\u00e9er des fiches de pr\u00e9positions',
  },
  {
    appId: 'word-guess', category: 'literacy',
    title: 'G\u00e9n\u00e9rateur Deviner le Mot',
    tagline: "Cr\u00e9ez des fiches o\u00f9 les enfants devinent le mot \u00e0 partir d'indices visuels",
    primaryKeyword: 'g\u00e9n\u00e9rateur deviner le mot',
    secondaryKeywords: ['jeu deviner mot enfants', 'fiches vocabulaire images', 'mot myst\u00e8re maternelle', 'indice visuel mot', 'jeu devinette \u00e9ducatif'],
    lsiKeywords: ['devinette', 'indice', 'inf\u00e9rence', 'vocabulaire', 'lecture image', 'compr\u00e9hension', 'expression orale', 'langage'],
    heroImg: '/samples/english/word guess/Word Guess 1.jpeg',
    heroAlt: 'Fiche deviner le mot avec indices visuels',
    gallery: [{ src: '/samples/english/word guess/Word Guess 1.jpeg', alt: 'Jeu deviner le mot illustr\u00e9', caption: 'Deviner \u00e0 partir d\'images' }],
    youtubeId: '36keBFzJbPo',
    videoTitle: 'Comment cr\u00e9er des fiches deviner le mot',
  },
  {
    appId: 'cryptogram', category: 'literacy',
    title: 'G\u00e9n\u00e9rateur de Cryptogrammes',
    tagline: "Cr\u00e9ez des puzzles de substitution de lettres pour d\u00e9coder des messages",
    primaryKeyword: 'g\u00e9n\u00e9rateur cryptogrammes',
    secondaryKeywords: ['cryptogramme \u00e0 imprimer', 'code secret lettres', 'puzzle d\u00e9codage', 'substitution lettres exercice', 'message cod\u00e9 enfants'],
    lsiKeywords: ['chiffrement', 'alphabet cod\u00e9', 'd\u00e9cryptage', 'logique', 'observation', 'correspondance lettres', 'patience', 'pers\u00e9v\u00e9rance'],
    heroImg: '/samples/english/cryptogram/Cryptogram 1.jpeg',
    heroAlt: 'Puzzle cryptogramme avec lettres substitu\u00e9es',
    gallery: [{ src: '/samples/english/cryptogram/Cryptogram 1.jpeg', alt: 'Cryptogramme \u00e0 d\u00e9coder', caption: 'D\u00e9coder le message' }],
    youtubeId: '36keBFzJbPo',
    videoTitle: 'Comment cr\u00e9er des cryptogrammes',
  },
  {
    appId: 'writing', category: 'literacy',
    title: "G\u00e9n\u00e9rateur de Fiches d'\u00c9criture",
    tagline: "Cr\u00e9ez des fiches d'\u00e9criture et de graphisme avec lignes guid\u00e9es",
    primaryKeyword: "g\u00e9n\u00e9rateur fiches \u00e9criture",
    secondaryKeywords: ['fiches graphisme maternelle', '\u00e9criture cursive exercices', 'lignes d\'\u00e9criture \u00e0 imprimer', 'fiches calligraphie enfants', 'apprentissage \u00e9criture'],
    lsiKeywords: ['graphomotricit\u00e9', 'trac\u00e9 lettres', 'pr\u00e9\u00e9criture', 'motricit\u00e9 fine', 'cursive', 'script', 'copie', 'mod\u00e8le \u00e9criture'],
    heroImg: '/samples/english/writing/Writing 1.jpeg',
    heroAlt: "Fiche d'\u00e9criture avec lignes guid\u00e9es et mod\u00e8les de lettres",
    gallery: [{ src: '/samples/english/writing/Writing 1.jpeg', alt: "Fiche d'\u00e9criture guid\u00e9e", caption: '\u00c9criture guid\u00e9e' }],
    youtubeId: '36keBFzJbPo',
    videoTitle: "Comment cr\u00e9er des fiches d'\u00e9criture",
  },
  {
    appId: 'big-small', category: 'visual',
    title: 'G\u00e9n\u00e9rateur Grand et Petit',
    tagline: "Cr\u00e9ez des fiches de comparaison de tailles avec des images illustr\u00e9es",
    primaryKeyword: 'g\u00e9n\u00e9rateur fiches grand petit',
    secondaryKeywords: ['comparaison tailles maternelle', 'grand petit exercices', 'fiches tailles \u00e0 imprimer', 'notion de grandeur', 'discrimination visuelle taille'],
    lsiKeywords: ['taille', 'dimension', 'classer', 'ordonner', 'mesure', 'perception visuelle', 'logique', 'cat\u00e9gorisation'],
    heroImg: '/samples/english/big small/Big Small 1.jpeg',
    heroAlt: 'Fiche comparaison de tailles avec images color\u00e9es',
    gallery: [{ src: '/samples/english/big small/Big Small 1.jpeg', alt: 'Exercice grand et petit illustr\u00e9', caption: 'Comparer les tailles' }],
    youtubeId: 'gQEk7dPTZUA',
    videoTitle: 'Comment cr\u00e9er des fiches grand et petit',
  },
  {
    appId: 'pattern-train', category: 'visual',
    title: 'G\u00e9n\u00e9rateur de Train de Motifs',
    tagline: "Cr\u00e9ez des fiches de suites logiques en forme de train avec des images th\u00e9matiques",
    primaryKeyword: 'g\u00e9n\u00e9rateur train motifs',
    secondaryKeywords: ['suites logiques maternelle', 'compl\u00e9ter la suite exercice', 'train de motifs \u00e0 imprimer', 'algorithme maternelle', 'r\u00e9p\u00e9tition de motifs'],
    lsiKeywords: ['s\u00e9quence', 'r\u00e9gularit\u00e9', 'algorithme', 'pens\u00e9e logique', 'reconnaissance motifs', 'r\u00e9p\u00e9tition', 'pr\u00e9-math\u00e9matiques', 'structuration'],
    heroImg: '/samples/english/pattern train/Pattern Train 1.jpeg',
    heroAlt: 'Train de motifs avec s\u00e9quences d\'images \u00e0 compl\u00e9ter',
    gallery: [{ src: '/samples/english/pattern train/Pattern Train 1.jpeg', alt: 'Suite logique en train', caption: 'Compl\u00e9ter la suite' }],
    youtubeId: 'gQEk7dPTZUA',
    videoTitle: 'Comment cr\u00e9er des trains de motifs',
  },
  {
    appId: 'pattern-worksheet', category: 'visual',
    title: 'G\u00e9n\u00e9rateur de Fiches de Motifs',
    tagline: "Cr\u00e9ez des fiches de reconnaissance et compl\u00e9tion de motifs visuels",
    primaryKeyword: 'g\u00e9n\u00e9rateur fiches motifs',
    secondaryKeywords: ['fiches suites logiques', 'motifs \u00e0 compl\u00e9ter exercice', 'reconnaissance motifs maternelle', 'algorithme CP', 'fiches s\u00e9quences visuelles'],
    lsiKeywords: ['suite logique', 'motif r\u00e9p\u00e9titif', 'alternance', 'pr\u00e9diction', 'raisonnement', 'sch\u00e9ma', 'sym\u00e9trie', 'r\u00e9gularit\u00e9'],
    heroImg: '/samples/english/pattern worksheet/Pattern Worksheet 1.jpeg',
    heroAlt: 'Fiche de motifs visuels \u00e0 compl\u00e9ter',
    gallery: [{ src: '/samples/english/pattern worksheet/Pattern Worksheet 1.jpeg', alt: 'Exercice de motifs', caption: 'Reconnaissance de motifs' }],
    youtubeId: 'gQEk7dPTZUA',
    videoTitle: 'Comment cr\u00e9er des fiches de motifs',
  },
  {
    appId: 'draw-and-color', category: 'visual',
    title: 'G\u00e9n\u00e9rateur Dessiner et Colorier',
    tagline: "Cr\u00e9ez des fiches de dessin et coloriage guid\u00e9 avec des th\u00e8mes illustr\u00e9s",
    primaryKeyword: 'g\u00e9n\u00e9rateur dessiner colorier',
    secondaryKeywords: ['fiches dessin guid\u00e9', 'coloriage \u00e9ducatif maternelle', 'apprendre \u00e0 dessiner enfants', 'fiches dessin \u00e0 imprimer', 'activit\u00e9 graphique maternelle'],
    lsiKeywords: ['dessin dirig\u00e9', 'reproduction', 'cr\u00e9ativit\u00e9', 'motricit\u00e9 fine', 'arts visuels', 'coloriage', 'illustration', 'expression artistique'],
    heroImg: '/samples/english/draw and color/Draw and Color 1.jpeg',
    heroAlt: 'Fiche dessiner et colorier avec mod\u00e8le guid\u00e9',
    gallery: [{ src: '/samples/english/draw and color/Draw and Color 1.jpeg', alt: 'Activit\u00e9 dessin guid\u00e9', caption: 'Dessiner et colorier' }],
    youtubeId: 'gQEk7dPTZUA',
    videoTitle: 'Comment cr\u00e9er des fiches dessiner et colorier',
  },
  {
    appId: 'drawing-lines', category: 'visual',
    title: 'G\u00e9n\u00e9rateur de Tra\u00e7age de Lignes',
    tagline: "Cr\u00e9ez des fiches de graphisme pour tracer des lignes entre des images",
    primaryKeyword: 'g\u00e9n\u00e9rateur tra\u00e7age lignes',
    secondaryKeywords: ['fiches graphisme lignes', 'tra\u00e7age lignes maternelle', 'exercices graphomotricit\u00e9', 'relier les points \u00e0 imprimer', 'fiches pr\u00e9\u00e9criture'],
    lsiKeywords: ['graphisme', 'trac\u00e9', 'coordination', 'pr\u00e9hension', '\u00e9criture pr\u00e9paratoire', 'dext\u00e9rit\u00e9', 'contr\u00f4le du geste', 'motricit\u00e9'],
    heroImg: '/samples/english/drawing lines/Drawing Lines 1.jpeg',
    heroAlt: 'Fiche de tra\u00e7age de lignes entre images',
    gallery: [{ src: '/samples/english/drawing lines/Drawing Lines 1.jpeg', alt: 'Exercice tra\u00e7age lignes', caption: 'Tracer des lignes' }],
    youtubeId: 'gQEk7dPTZUA',
    videoTitle: 'Comment cr\u00e9er des fiches de tra\u00e7age',
  },
  {
    appId: 'coloring', category: 'visual',
    title: 'G\u00e9n\u00e9rateur de Pages de Coloriage',
    tagline: "Cr\u00e9ez des pages de coloriage th\u00e9matiques avec 104 th\u00e8mes illustr\u00e9s",
    primaryKeyword: 'g\u00e9n\u00e9rateur pages coloriage',
    secondaryKeywords: ['coloriages \u00e0 imprimer', 'pages de coloriage enfants', 'coloriage th\u00e9matique gratuit', 'cr\u00e9er coloriages PDF', 'coloriage \u00e9ducatif'],
    lsiKeywords: ['coloriage', 'dessin', 'illustration', 'motricit\u00e9 fine', 'cr\u00e9ativit\u00e9', 'arts plastiques', 'concentration', 'd\u00e9tente'],
    heroImg: '/samples/english/coloring/Coloring 1.jpeg',
    heroAlt: 'Page de coloriage th\u00e9matique avec illustrations d\u00e9taill\u00e9es',
    gallery: [{ src: '/samples/english/coloring/Coloring 1.jpeg', alt: 'Coloriage th\u00e9matique', caption: 'Coloriage \u00e0 imprimer' }],
    youtubeId: 'gQEk7dPTZUA',
    videoTitle: 'Comment cr\u00e9er des pages de coloriage',
  },
  {
    appId: 'chart-count', category: 'visual',
    title: 'G\u00e9n\u00e9rateur Compter et Colorier',
    tagline: "Cr\u00e9ez des fiches de graphiques \u00e0 compl\u00e9ter en comptant et coloriant",
    primaryKeyword: 'g\u00e9n\u00e9rateur compter colorier',
    secondaryKeywords: ['fiches graphiques maternelle', 'compter et colorier exercice', 'diagramme \u00e0 compl\u00e9ter', 'statistiques maternelle', 'graphique en barres enfants'],
    lsiKeywords: ['diagramme', 'tableau', 'donn\u00e9es', 'repr\u00e9sentation graphique', 'd\u00e9nombrement', 'statistique', 'lecture graphique', 'organisation donn\u00e9es'],
    heroImg: '/samples/english/chart count/Chart Count 1.jpeg',
    heroAlt: 'Fiche compter et colorier un graphique en barres',
    gallery: [{ src: '/samples/english/chart count/Chart Count 1.jpeg', alt: 'Graphique \u00e0 compl\u00e9ter', caption: 'Compter et colorier' }],
    youtubeId: 'gQEk7dPTZUA',
    videoTitle: 'Comment cr\u00e9er des fiches compter et colorier',
  },
  {
    appId: 'matching', category: 'matching',
    title: "G\u00e9n\u00e9rateur de Fiches d'Association",
    tagline: "Cr\u00e9ez des fiches d'association image-image, image-mot et image-lettre initiale",
    primaryKeyword: "g\u00e9n\u00e9rateur fiches association",
    secondaryKeywords: ['fiches association maternelle', 'relier les images exercice', 'appariement visuel', 'fiches association \u00e0 imprimer', 'jeu d\'association \u00e9ducatif'],
    lsiKeywords: ['appariement', 'correspondance', 'discrimination visuelle', 'lien logique', 'cat\u00e9gorisation', 'classement', 'observation', 'concentration'],
    heroImg: '/samples/english/matching/Matching 1.jpeg',
    heroAlt: "Fiche d'association image-mot avec liens \u00e0 tracer",
    gallery: [{ src: '/samples/english/matching/Matching 1.jpeg', alt: 'Exercice association illustr\u00e9', caption: 'Association image-mot' },
      { src: '/samples/english/matching/Matching Fun 1.jpeg', alt: 'Fiche association animaux', caption: 'Association animaux' }],
    youtubeId: 'gQEk7dPTZUA',
    videoTitle: "Comment cr\u00e9er des fiches d'association",
  },
  {
    appId: 'grid-match', category: 'matching',
    title: 'G\u00e9n\u00e9rateur de Grilles de Correspondance',
    tagline: "Cr\u00e9ez des puzzles en grille o\u00f9 les enfants associent des images dans un tableau",
    primaryKeyword: 'g\u00e9n\u00e9rateur grilles correspondance',
    secondaryKeywords: ['puzzle grille enfants', 'tableau correspondance maternelle', 'grille association images', 'fiches logique grille', 'puzzle visuel \u00e0 imprimer'],
    lsiKeywords: ['grille', 'matrice', 'coordonn\u00e9es', 'rep\u00e9rage tableau', 'logique combinatoire', 'raisonnement spatial', 'observation', 'analyse'],
    heroImg: '/samples/english/grid match/Grid Match 1.jpeg',
    heroAlt: 'Puzzle grille de correspondance avec images color\u00e9es',
    gallery: [{ src: '/samples/english/grid match/Grid Match 1.jpeg', alt: 'Grille de correspondance', caption: 'Puzzle en grille' }],
    youtubeId: 'gQEk7dPTZUA',
    videoTitle: 'Comment cr\u00e9er des grilles de correspondance',
  },
  {
    appId: 'shadow-match', category: 'matching',
    title: "G\u00e9n\u00e9rateur d'Association d'Ombres",
    tagline: "Cr\u00e9ez des fiches o\u00f9 les enfants associent chaque image \u00e0 son ombre",
    primaryKeyword: "g\u00e9n\u00e9rateur association ombres",
    secondaryKeywords: ['fiches ombres maternelle', 'associer ombre image', 'silhouettes \u00e0 associer', 'jeu d\'ombres \u00e9ducatif', 'discrimination visuelle ombres'],
    lsiKeywords: ['silhouette', 'forme', 'contour', 'perception visuelle', 'reconnaissance formes', 'ombre chin\u00e9e', 'observation', 'attention visuelle'],
    heroImg: '/samples/english/shadow match/Shadow Match 1.jpeg',
    heroAlt: "Fiche d'association d'ombres avec images et silhouettes",
    gallery: [{ src: '/samples/english/shadow match/Shadow Match 1.jpeg', alt: 'Association ombres-images', caption: 'Associer chaque ombre' }],
    youtubeId: 'gQEk7dPTZUA',
    videoTitle: "Comment cr\u00e9er des fiches d'ombres",
  },
  {
    appId: 'bingo', category: 'matching',
    title: 'G\u00e9n\u00e9rateur de Cartes de Bingo',
    tagline: "Cr\u00e9ez des cartes de bingo personnalis\u00e9es avec images ou mots pour la classe et les f\u00eates",
    primaryKeyword: 'g\u00e9n\u00e9rateur cartes bingo',
    secondaryKeywords: ['cartes bingo \u00e0 imprimer', 'bingo \u00e9ducatif maternelle', 'cr\u00e9er bingo personnalis\u00e9', 'jeu bingo images', 'bingo th\u00e9matique enfants'],
    lsiKeywords: ['jeu de soci\u00e9t\u00e9', 'loto', 'reconnaissance visuelle', 'attention', 'vocabulaire', 'animation classe', 'activit\u00e9 groupe', '\u00e9coute'],
    heroImg: '/samples/english/bingo/bingo_card word.jpeg',
    heroAlt: 'Carte de bingo personnalis\u00e9e avec images th\u00e9matiques',
    gallery: [{ src: '/samples/english/bingo/bingo_card word.jpeg', alt: 'Carte bingo avec mots', caption: 'Bingo avec mots' }],
    youtubeId: 'd6AOiDXoK1c',
    videoTitle: 'Comment cr\u00e9er des cartes de bingo',
  },
  {
    appId: 'picture-sort', category: 'matching',
    title: "G\u00e9n\u00e9rateur de Tri d'Images",
    tagline: "Cr\u00e9ez des fiches de tri et cat\u00e9gorisation avec des images th\u00e9matiques",
    primaryKeyword: "g\u00e9n\u00e9rateur tri images",
    secondaryKeywords: ['fiches tri cat\u00e9gorisation', 'classer des images exercice', 'tri maternelle \u00e0 imprimer', 'cat\u00e9gorisation visuelle', 'classement images enfants'],
    lsiKeywords: ['classement', 'cat\u00e9gorie', 'trier', 'grouper', 'ensemble', 'propri\u00e9t\u00e9s communes', 'logique', 'organisation'],
    heroImg: '/samples/english/picture sort/Picture Sort 1.jpeg',
    heroAlt: "Fiche de tri d'images par cat\u00e9gorie",
    gallery: [{ src: '/samples/english/picture sort/Picture Sort 1.jpeg', alt: 'Exercice de tri par cat\u00e9gorie', caption: 'Trier par cat\u00e9gorie' }],
    youtubeId: 'gQEk7dPTZUA',
    videoTitle: "Comment cr\u00e9er des fiches de tri d'images",
  },
  {
    appId: 'missing-pieces', category: 'puzzle',
    title: 'G\u00e9n\u00e9rateur de Pi\u00e8ces Manquantes',
    tagline: "Cr\u00e9ez des puzzles o\u00f9 les enfants trouvent la pi\u00e8ce manquante d'une image",
    primaryKeyword: 'g\u00e9n\u00e9rateur pi\u00e8ces manquantes',
    secondaryKeywords: ['puzzle pi\u00e8ce manquante', 'fiches pi\u00e8ces manquantes maternelle', 'trouver le morceau manquant', 'puzzle visuel enfants', 'perception visuelle exercice'],
    lsiKeywords: ['puzzle', 'compl\u00e9tion', 'observation', 'raisonnement spatial', 'attention aux d\u00e9tails', 'analyse visuelle', 'reconstruction', 'logique visuelle'],
    heroImg: '/samples/english/missing pieces/Missing Pieces 1.jpeg',
    heroAlt: 'Puzzle pi\u00e8ces manquantes avec images \u00e0 compl\u00e9ter',
    gallery: [{ src: '/samples/english/missing pieces/Missing Pieces 1.jpeg', alt: 'Trouver la pi\u00e8ce manquante', caption: 'Pi\u00e8ce manquante' }],
    youtubeId: 'VXGKFQRT2rA',
    videoTitle: 'Comment cr\u00e9er des puzzles pi\u00e8ces manquantes',
  },
  {
    appId: 'odd-one-out', category: 'puzzle',
    title: "G\u00e9n\u00e9rateur de l'Intrus",
    tagline: "Cr\u00e9ez des fiches o\u00f9 les enfants trouvent l'image qui ne correspond pas au groupe",
    primaryKeyword: "g\u00e9n\u00e9rateur trouver l'intrus",
    secondaryKeywords: ['trouver l\'intrus exercice', 'chercher l\'intrus maternelle', 'fiches intrus \u00e0 imprimer', 'quel est l\'intrus jeu', 'logique exclusion enfants'],
    lsiKeywords: ['exclusion', 'cat\u00e9gorisation', 'diff\u00e9rence', 'point commun', 'raisonnement', 'classification', 'analyse', 'esprit critique'],
    heroImg: '/samples/english/odd one out/Odd One Out 1.jpeg',
    heroAlt: "Fiche trouver l'intrus avec groupes d'images",
    gallery: [{ src: '/samples/english/odd one out/Odd One Out 1.jpeg', alt: "Exercice trouver l'intrus", caption: "Trouver l'intrus" }],
    youtubeId: 'VXGKFQRT2rA',
    videoTitle: "Comment cr\u00e9er des fiches trouver l'intrus",
  },
  {
    appId: 'sudoku', category: 'puzzle',
    title: 'G\u00e9n\u00e9rateur de Sudoku pour Enfants',
    tagline: "Cr\u00e9ez des sudokus 4x4 avec images pour d\u00e9velopper la pens\u00e9e logique",
    primaryKeyword: 'g\u00e9n\u00e9rateur sudoku enfants',
    secondaryKeywords: ['sudoku images enfants', 'sudoku 4x4 \u00e0 imprimer', 'sudoku maternelle', 'sudoku facile avec images', 'puzzle logique enfants'],
    lsiKeywords: ['logique', 'raisonnement', 'd\u00e9duction', 'grille', 'r\u00e9flexion', 'concentration', 'patience', 'strat\u00e9gie'],
    heroImg: '/samples/english/sudoku/Sudoku 1.jpeg',
    heroAlt: 'Sudoku 4x4 pour enfants avec images color\u00e9es',
    gallery: [{ src: '/samples/english/sudoku/Sudoku 1.jpeg', alt: 'Sudoku images pour enfants', caption: 'Sudoku 4x4 avec images' }],
    youtubeId: 'VXGKFQRT2rA',
    videoTitle: 'Comment cr\u00e9er des sudokus pour enfants',
  },
  {
    appId: 'picture-path', category: 'puzzle',
    title: "G\u00e9n\u00e9rateur de Chemin d'Images",
    tagline: "Cr\u00e9ez des labyrinthes visuels o\u00f9 les enfants suivent le bon chemin \u00e0 travers des images",
    primaryKeyword: "g\u00e9n\u00e9rateur chemin images",
    secondaryKeywords: ['labyrinthe images enfants', 'chemin \u00e0 suivre maternelle', 'fiches labyrinthes \u00e0 imprimer', 'parcours images \u00e9ducatif', 'orientation spatiale exercice'],
    lsiKeywords: ['labyrinthe', 'parcours', 'direction', 'orientation', 'navigation', 'planification', 'anticipation', 'r\u00e9solution'],
    heroImg: '/samples/english/picture path/Picture Path 1.jpeg',
    heroAlt: "Labyrinthe chemin d'images avec illustrations color\u00e9es",
    gallery: [{ src: '/samples/english/picture path/Picture Path 1.jpeg', alt: "Chemin d'images \u00e0 suivre", caption: 'Suivre le bon chemin' }],
    youtubeId: 'VXGKFQRT2rA',
    videoTitle: "Comment cr\u00e9er des chemins d'images",
  },
  {
    appId: 'find-and-count', category: 'search',
    title: 'G\u00e9n\u00e9rateur Chercher et Compter',
    tagline: "Cr\u00e9ez des fiches o\u00f9 les enfants cherchent et comptent des images th\u00e9matiques",
    primaryKeyword: 'g\u00e9n\u00e9rateur chercher compter',
    secondaryKeywords: ['fiches chercher et compter', 'compter les images exercice', 'chercher compter maternelle', 'd\u00e9nombrement visuel', '\u00e0 la recherche et compter'],
    lsiKeywords: ['d\u00e9nombrement', 'attention visuelle', 'concentration', 'comptage', 'recherche visuelle', 'observation', 'discrimination', 'balayage'],
    heroImg: '/samples/english/find and count/Find and Count 1.jpeg',
    heroAlt: 'Fiche chercher et compter avec images d\'animaux',
    gallery: [
      { src: '/samples/english/find and count/Find and Count 1.jpeg', alt: 'Chercher et compter animaux', caption: 'Chercher et compter' },
      { src: '/samples/english/find and count/Find and Count Fun 1.jpeg', alt: 'Chercher et compter version color\u00e9e', caption: 'Version color\u00e9e' },
    ],
    youtubeId: 'hwMKyCpVzSQ',
    videoTitle: 'Comment cr\u00e9er des fiches chercher et compter',
  },
  {
    appId: 'find-objects', category: 'search',
    title: "G\u00e9n\u00e9rateur d'Objets Cach\u00e9s",
    tagline: "Cr\u00e9ez des fiches d'objets cach\u00e9s avec des sc\u00e8nes illustr\u00e9es professionnelles",
    primaryKeyword: "g\u00e9n\u00e9rateur objets cach\u00e9s",
    secondaryKeywords: ['objets cach\u00e9s \u00e0 imprimer', 'jeu objets cach\u00e9s enfants', 'fiches observation visuelle', 'chercher objets exercice', 'hidden objects PDF'],
    lsiKeywords: ['observation', 'attention', 'concentration', 'recherche visuelle', 'discrimination', 'sc\u00e8ne illustr\u00e9e', 'rep\u00e9rage', 'focus'],
    heroImg: '/samples/english/find objects/Hidden Objects 1.jpeg',
    heroAlt: 'Fiche objets cach\u00e9s avec sc\u00e8ne illustr\u00e9e',
    gallery: [{ src: '/samples/english/find objects/Hidden Objects 1.jpeg', alt: 'Jeu objets cach\u00e9s', caption: 'Trouver les objets cach\u00e9s' }],
    youtubeId: 'hwMKyCpVzSQ',
    videoTitle: "Comment cr\u00e9er des fiches d'objets cach\u00e9s",
  },
  {
    appId: 'crossword', category: 'search',
    title: 'G\u00e9n\u00e9rateur de Mots Crois\u00e9s',
    tagline: "Cr\u00e9ez des mots crois\u00e9s avec indices visuels et 104 th\u00e8mes illustr\u00e9s",
    primaryKeyword: 'g\u00e9n\u00e9rateur mots crois\u00e9s',
    secondaryKeywords: ['mots crois\u00e9s \u00e0 imprimer', 'cr\u00e9er mots crois\u00e9s', 'mots crois\u00e9s avec images', 'mots crois\u00e9s enfants', 'g\u00e9n\u00e9rateur mots fl\u00e9ch\u00e9s'],
    lsiKeywords: ['grille', 'vocabulaire', 'orthographe', 'indices', 'd\u00e9finitions', 'horizontal vertical', 'mots fl\u00e9ch\u00e9s', 'jeu de mots'],
    heroImg: '/samples/english/crossword/Crossword 1.jpeg',
    heroAlt: 'Mots crois\u00e9s avec indices en images',
    gallery: [{ src: '/samples/english/crossword/Crossword 1.jpeg', alt: 'Mots crois\u00e9s th\u00e9matiques', caption: 'Mots crois\u00e9s avec images' }],
    youtubeId: '36keBFzJbPo',
    videoTitle: 'Comment cr\u00e9er des mots crois\u00e9s',
  },
  {
    appId: 'treasure-hunt', category: 'search',
    title: 'G\u00e9n\u00e9rateur de Chasse au Tr\u00e9sor',
    tagline: "Cr\u00e9ez des fiches de chasse au tr\u00e9sor avec directions et images th\u00e9matiques",
    primaryKeyword: 'g\u00e9n\u00e9rateur chasse au tr\u00e9sor',
    secondaryKeywords: ['chasse au tr\u00e9sor \u00e0 imprimer', 'fiches orientation direction', 'jeu de piste enfants', 'chasse au tr\u00e9sor \u00e9ducative', 'parcours fl\u00e9ch\u00e9 exercice'],
    lsiKeywords: ['direction', 'orientation', 'rep\u00e9rage', 'gauche droite', 'haut bas', 'parcours', 'navigation', 'fl\u00e8ches'],
    heroImg: '/samples/english/treasure hunt/Treasure Hunt 1.jpeg',
    heroAlt: 'Fiche chasse au tr\u00e9sor avec fl\u00e8ches directionnelles',
    gallery: [{ src: '/samples/english/treasure hunt/Treasure Hunt 1.jpeg', alt: 'Chasse au tr\u00e9sor avec directions', caption: 'Suivre les directions' }],
    youtubeId: 'hwMKyCpVzSQ',
    videoTitle: 'Comment cr\u00e9er une chasse au tr\u00e9sor',
  },
];

// Category-related apps for internal links
const categoryLinks = {
  math: ['addition', 'subtraction', 'code-addition', 'more-less', 'math-puzzle', 'math-worksheet'],
  literacy: ['alphabet-train', 'wordsearch', 'word-scramble', 'prepositions', 'word-guess', 'cryptogram', 'writing'],
  visual: ['big-small', 'pattern-train', 'pattern-worksheet', 'draw-and-color', 'drawing-lines', 'coloring', 'chart-count'],
  matching: ['matching', 'grid-match', 'shadow-match', 'bingo', 'picture-sort'],
  puzzle: ['missing-pieces', 'odd-one-out', 'sudoku', 'picture-path'],
  search: ['find-and-count', 'find-objects', 'crossword', 'treasure-hunt'],
};

const categoryBundleMap = {
  math: 'math-bundle', literacy: 'literacy-bundle', visual: 'visual-bundle',
  matching: 'matching-bundle', puzzle: 'puzzle-bundle', search: 'search-bundle',
};

const frCategoryNames = {
  math: 'Math\u00e9matiques', literacy: 'Lecture et \u00c9criture', visual: 'Apprentissage Visuel',
  matching: 'Association et Tri', puzzle: 'Puzzles et Logique', search: 'Chercher et Trouver',
};

function generateFile(app) {
  const relatedApps = (categoryLinks[app.category] || []).filter(a => a !== app.appId).slice(0, 3);

  // Build internal links - use app-specific if provided, otherwise generate
  let internalLinksStr;
  if (app.internalLinks) {
    internalLinksStr = app.internalLinks.map(l =>
      `    { slug: '${l.slug}', pageType: '${l.pageType}' as const, anchorText: '${l.anchorText.replace(/'/g, "\\'")}' }`
    ).join(',\n');
  } else {
    const links = relatedApps.map(a => {
      const related = apps.find(x => x.appId === a);
      const name = related ? related.title : a.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      return `    { slug: '${a}', pageType: 'app' as const, anchorText: '${name.replace(/'/g, "\\'")}' }`;
    });
    links.push(`    { slug: '${app.appId}', pageType: 'tool' as const, anchorText: 'Essayer ${app.title.replace(/'/g, "\\'")} Gratuit' }`);
    links.push(`    { slug: '${categoryBundleMap[app.category]}', pageType: 'bundle' as const, anchorText: 'Pack ${frCategoryNames[app.category]} Complet' }`);
    internalLinksStr = links.join(',\n');
  }

  // Build gallery
  const galleryStr = (app.gallery || []).map(g =>
    `      { src: '${g.src}', alt: '${g.alt.replace(/'/g, "\\'")}', caption: '${(g.caption || '').replace(/'/g, "\\'")}' }`
  ).join(',\n');

  // Build features - use app-specific if provided, otherwise generic
  const features = app.features || [
    { title: '104 th\u00e8mes illustr\u00e9s', description: "Choisissez parmi 104 th\u00e8mes professionnels couvrant animaux, v\u00e9hicules, aliments, nature, sports, musique et \u00e9v\u00e9nements saisonniers. Chaque th\u00e8me produit des fiches visuellement uniques." },
    { title: '\u00c9diteur canvas int\u00e9gr\u00e9', description: "Ajoutez du texte personnalis\u00e9, changez les couleurs de fond, appliquez des bordures, repositionnez les \u00e9l\u00e9ments et ajustez la mise en page avant l'export. Annulation et zoom disponibles." },
    { title: 'Corrig\u00e9s automatiques', description: "Chaque fiche g\u00e9n\u00e8re automatiquement un corrig\u00e9 correspondant avec la m\u00eame mise en page pour une correction rapide et fiable." },
    { title: '7 polices professionnelles', description: "Polices optimis\u00e9es pour la lisibilit\u00e9 selon les \u00e2ges, des lettres larges pour les jeunes enfants aux styles compacts pour les plus grands." },
    { title: 'Export double : JPEG et PDF', description: "Exportez en JPEG haute r\u00e9solution pour le num\u00e9rique ou en PDF pr\u00eat \u00e0 imprimer. Formats A4, Letter et personnalis\u00e9s en portrait ou paysage." },
    { title: '11 langues support\u00e9es', description: "Interface et contenu disponibles en fran\u00e7ais, anglais, allemand, espagnol, portugais, italien, n\u00e9erlandais, su\u00e9dois, danois, norv\u00e9gien et finnois." },
    { title: "Import d'images personnalis\u00e9es", description: "T\u00e9l\u00e9chargez vos propres images pour les utiliser dans les fiches. Id\u00e9al pour le branding, les visuels sp\u00e9cifiques ou les images de votre classe." },
    { title: 'G\u00e9n\u00e9ration illimit\u00e9e', description: "Cr\u00e9ez autant de fiches que vous le souhaitez. Chaque g\u00e9n\u00e9ration produit un contenu unique et al\u00e9atoire, vous ne manquerez jamais de vari\u00e9t\u00e9." },
  ];
  const featuresStr = features.map(f =>
    `    {\n      title: '${f.title.replace(/'/g, "\\'")}',\n      description: '${f.description.replace(/'/g, "\\'")}',\n    }`
  ).join(',\n');

  // Build howItWorks
  const howItWorks = app.howItWorks || [
    { title: 'Choisir le th\u00e8me et le mode', description: `Parcourez 104 th\u00e8mes illustr\u00e9s et s\u00e9lectionnez le mode d'exercice adapt\u00e9 \u00e0 vos objectifs p\u00e9dagogiques.` },
    { title: 'R\u00e9gler la difficult\u00e9', description: "Ajustez les param\u00e8tres pour correspondre au niveau de vos \u00e9l\u00e8ves, de la maternelle au primaire." },
    { title: 'Configurer la mise en page', description: "Choisissez le format (A4, Letter), l'orientation (portrait, paysage), le nombre d'\u00e9l\u00e9ments par page et la police." },
    { title: "Personnaliser dans l'\u00e9diteur", description: "Utilisez l'\u00e9diteur canvas pour ajouter des titres, ajuster les couleurs et positionner les \u00e9l\u00e9ments selon vos besoins." },
    { title: 'Exporter et imprimer', description: "T\u00e9l\u00e9chargez en JPEG ou PDF haute r\u00e9solution avec le corrig\u00e9 g\u00e9n\u00e9r\u00e9 automatiquement." },
  ];
  const howItWorksStr = howItWorks.map(s =>
    `      {\n        title: '${s.title.replace(/'/g, "\\'")}',\n        description: '${s.description.replace(/'/g, "\\'")}',\n      }`
  ).join(',\n');

  // Build businessUseCases
  const businessUseCases = app.businessUseCases || [
    { title: 'Vendre des packs th\u00e9matiques sur Etsy', description: `Cr\u00e9ez des packs de 10-20 fiches ${app.title.replace(' G\u00e9n\u00e9rateur', '').replace("G\u00e9n\u00e9rateur de ", "").replace("G\u00e9n\u00e9rateur d'", "").replace("G\u00e9n\u00e9rateur ", "")} th\u00e9matiques et vendez-les en t\u00e9l\u00e9chargement instantan\u00e9 sur Etsy.`, platform: 'Etsy' },
    { title: "Publier des cahiers d'activit\u00e9s sur Amazon KDP", description: "Compilez vos fiches en cahiers de 50-100 pages et publiez-les sur Amazon KDP. Les cahiers d'activit\u00e9s \u00e9ducatifs se vendent bien toute l'ann\u00e9e.", platform: 'Amazon KDP' },
    { title: 'Cr\u00e9er des ressources pour TPT', description: "Teachers Pay Teachers est la r\u00e9f\u00e9rence pour les enseignants. Cr\u00e9ez des packs diff\u00e9renci\u00e9s par niveau et vendez-les en t\u00e9l\u00e9chargement num\u00e9rique.", platform: 'Teachers Pay Teachers' },
    { title: 'Collections saisonni\u00e8res', description: "Utilisez les th\u00e8mes saisonniers pour cr\u00e9er des collections sp\u00e9ciales No\u00ebl, Halloween, P\u00e2ques et rentr\u00e9e scolaire.", platform: 'Multi-plateforme' },
  ];
  const businessStr = businessUseCases.map(b =>
    `    {\n      title: '${b.title.replace(/'/g, "\\'")}',\n      description: '${b.description.replace(/'/g, "\\'")}',\n      platform: '${b.platform}',\n    }`
  ).join(',\n');

  // Build FAQ
  const faq = app.faq || [
    { q: `Le ${app.title} est-il vraiment gratuit ?`, a: "Oui. La version gratuite inclut toutes les fonctionnalit\u00e9s avec un petit filigrane sur les exports. Aucune inscription n\u00e9cessaire." },
    { q: "Pour quel \u00e2ge ces fiches sont-elles con\u00e7ues ?", a: "Les fiches sont con\u00e7ues pour les enfants de 3 \u00e0 8 ans, de la maternelle au CE2. Les param\u00e8tres permettent d'adapter la difficult\u00e9." },
    { q: "Puis-je vendre les fiches cr\u00e9\u00e9es ?", a: "Oui, avec le Pack Commercial (27 $) ou le Pack Acc\u00e8s Complet (47 $). La licence commerciale permet la vente sur Etsy, Amazon KDP, TPT et toute autre plateforme." },
    { q: "Quels formats d'export sont disponibles ?", a: "JPEG haute r\u00e9solution et PDF pr\u00eat \u00e0 imprimer. Formats A4, Letter US et personnalis\u00e9s en portrait ou paysage." },
    { q: "Combien de th\u00e8mes sont disponibles ?", a: "104 th\u00e8mes illustr\u00e9s couvrant animaux, v\u00e9hicules, aliments, nature, f\u00eates et bien plus. Vous pouvez aussi importer vos propres images." },
    { q: "Les corrig\u00e9s sont-ils inclus ?", a: "Oui. Chaque fiche g\u00e9n\u00e8re automatiquement un corrig\u00e9 avec la m\u00eame mise en page pour une correction rapide." },
    { q: "Quelles langues sont support\u00e9es ?", a: "11 langues : fran\u00e7ais, anglais, allemand, espagnol, portugais, italien, n\u00e9erlandais, su\u00e9dois, danois, norv\u00e9gien et finnois." },
    { q: "Y a-t-il une limite de g\u00e9n\u00e9ration ?", a: "Non. Les packs payants incluent une g\u00e9n\u00e9ration illimit\u00e9e sans limites mensuelles ni cr\u00e9dits." },
    { q: "Quelle est la diff\u00e9rence entre Pack Commercial et Acc\u00e8s Complet ?", a: "Le Pack Commercial (27 $) retire le filigrane et accorde la licence commerciale. Le Pack Acc\u00e8s Complet (47 $) ajoute les 104 th\u00e8mes et toutes les futures mises \u00e0 jour." },
    { q: "Puis-je essayer avant d'acheter ?", a: "Absolument. La version gratuite fonctionne sans inscription avec toutes les fonctionnalit\u00e9s. Seul un filigrane est ajout\u00e9 aux exports." },
    { q: "Quelle est votre politique de remboursement ?", a: "Toutes les ventes sont d\u00e9finitives en raison de la nature num\u00e9rique du produit. Testez la version gratuite avant d'acheter." },
  ];
  const faqStr = faq.map(f =>
    `    {\n      question: '${(f.q || f.question).replace(/'/g, "\\'")}',\n      answer: '${(f.a || f.answer).replace(/'/g, "\\'")}',\n    }`
  ).join(',\n');

  // Build description if not provided
  const description = app.description || `Ce ${app.title} transforme les exercices abstraits en une exp\u00e9rience visuelle captivante pour les enfants. Au lieu de fiches ennuyeuses, les \u00e9l\u00e8ves travaillent avec des illustrations color\u00e9es et th\u00e9matiques \u2014 animaux, v\u00e9hicules, aliments, espace et bien d'autres. Chaque fiche s'exporte en JPEG haute r\u00e9solution et en PDF pr\u00eat \u00e0 imprimer, avec un corrig\u00e9 g\u00e9n\u00e9r\u00e9 automatiquement.

Choisissez parmi 104 th\u00e8mes professionnellement illustr\u00e9s et personnalisez chaque d\u00e9tail : format de page (Letter, A4 ou personnalis\u00e9), orientation (portrait ou paysage), polices et palette de couleurs. L'\u00e9diteur canvas int\u00e9gr\u00e9 vous permet d'ajouter vos propres textes, de d\u00e9placer les \u00e9l\u00e9ments, d'ajuster les couleurs et d'appliquer des bordures \u2014 le tout avant l'export.

Que vous cr\u00e9iez des ressources p\u00e9dagogiques pour votre classe, accompagniez l'instruction en famille, ou vendiez des fiches \u00e9ducatives sur Etsy et Amazon KDP \u2014 ce g\u00e9n\u00e9rateur produit des fiches de qualit\u00e9 professionnelle en quelques secondes. La version gratuite inclut toutes les fonctionnalit\u00e9s avec un l\u00e9ger filigrane. Testez d\u00e8s maintenant sans inscription ni carte bancaire.

Le ${app.title} convient particuli\u00e8rement \u00e0 la cr\u00e9ation de supports diff\u00e9renci\u00e9s. Les enseignants peuvent rapidement g\u00e9n\u00e9rer des fiches pour plusieurs niveaux de difficult\u00e9, tandis que les parents utilisent les mat\u00e9riaux pour le soutien scolaire. Vendez vos cr\u00e9ations sur Etsy, Amazon KDP ou Teachers Pay Teachers et construisez un revenu passif avec des fiches \u00e9ducatives imprimables.

Chaque export inclut automatiquement un corrig\u00e9, \u00e9liminant le temps pass\u00e9 \u00e0 cr\u00e9er les solutions manuellement. Les 104 th\u00e8mes couvrent toutes les cat\u00e9gories populaires : animaux (ferme, safari, oc\u00e9an, dinosaures), v\u00e9hicules, aliments, nature, espace, sports, musique, saisons et f\u00eates. Cr\u00e9ez des packs th\u00e9matiques qui s\u00e9duisent les acheteurs.`;

  // Hero section secondary image
  const secondaryImgLine = app.heroImg2
    ? `      secondary: '${app.heroImg2}',\n      secondaryAlt: '${(app.heroAlt2 || '').replace(/'/g, "\\'")}',`
    : '';

  return `import type { AppDetailContent } from '../types';

export const content: AppDetailContent = {
  appId: '${app.appId}',
  locale: 'fr',
  category: '${app.category}',

  seo: {
    titleTag: '${app.title.replace(/'/g, "\\'")} | Cr\u00e9er des Fiches Gratuitement',
    metaDescription: 'Cr\u00e9ez des fiches ${app.title.replace("G\u00e9n\u00e9rateur de ", "").replace("G\u00e9n\u00e9rateur d'", "").replace("G\u00e9n\u00e9rateur ", "").replace(/'/g, "\\'")} professionnelles en quelques secondes. 104 th\u00e8mes, \u00e9diteur canvas, export PDF. G\u00e9n\u00e9rateur gratuit en ligne pour enseignants et vendeurs.',
    primaryKeyword: '${app.primaryKeyword.replace(/'/g, "\\'")}',
    secondaryKeywords: ${JSON.stringify(app.secondaryKeywords)},
    lsiKeywords: ${JSON.stringify(app.lsiKeywords)},
  },

  visuals: {
    heroImages: {
      primary: '${app.heroImg}',
      primaryAlt: '${app.heroAlt.replace(/'/g, "\\'")}',
${secondaryImgLine}
    },
    sampleGallery: [
${galleryStr}
    ],
    youtubeId: '${app.youtubeId}',
    videoTitle: '${app.videoTitle.replace(/'/g, "\\'")}',
  },

  hero: {
    title: '${app.title.replace(/'/g, "\\'")}',
    tagline: '${app.tagline.replace(/'/g, "\\'")}',
    description: \`${description}\`,
  },

  howItWorks: {
    title: 'Cr\u00e9ez votre fiche en 5 \u00e9tapes',
    steps: [
${howItWorksStr}
    ],
  },

  features: [
${featuresStr}
  ],

  businessUseCases: [
${businessStr}
  ],

  faq: [
${faqStr}
  ],

  internalLinks: [
${internalLinksStr}
  ],
};
`;
}

// Generate all files
let count = 0;
for (const app of apps) {
  const content = generateFile(app);
  const filePath = path.join(outDir, `${app.appId}.ts`);
  fs.writeFileSync(filePath, content, 'utf8');
  count++;
}

console.log(`Generated ${count} French app-content files in ${outDir}`);
