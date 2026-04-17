import type { ToolContent } from '../types';

const content: ToolContent = {
  seo: {
    primaryKeyword: 'générateur cherche et trouve gratuit en ligne',
    secondaryKeywords: [
      'jeu cherche et trouve fiche gratuit sans inscription',
      'objets cachés à imprimer gratuit en ligne',
      'jeu d\'observation à imprimer gratuit',
      'cherche et trouve maternelle gratuit',
    ],
    lsiKeywords: [
      'GS',
      'CP',
      'maternelle',
      'sans inscription',
      'observation',
      'concentration',
      'attention visuelle',
      'trouver',
      'repérer',
    ],
    titleTag: 'Générateur cherche et trouve gratuit en ligne | LessonCraftStudio',
    metaDescription: 'Générateur « cherche et trouve » gratuit — créez des fiches d\'observation avec images thématiques en ligne, sans inscription. Solutions automatiques. Licence commerciale.',
  },

  hero: {
    title: 'Cherche et trouve gratuit — créez des jeux d\'observation en ligne',
    tagline: 'Générateur de fiches objets cachés avec double mode d\'activité — mode Je Vois Je Vois (scènes dispersées sans chevauchement avec 1–5 objets cachés parmi 8–12 distracteurs et légende en bas) et mode Trouve l\'Intrus (8–12 images appariées avec 1–5 éléments non appariés rendus 50 % plus grands), algorithme de dimensionnement adaptatif essayant 50 positions par image, corrigés auto-générés avec annotations en cercles rouges, et puzzles uniquement visuels vendables dans le monde entier sans traduction',
    description: 'Créez des cherche et trouve gratuitement en ligne — sans inscription, sans carte bancaire. Les utilisateurs explorent une scène visuelle pour trouver et entourer des objets spécifiques. Le générateur propose deux modes d\'activité distincts produisant des défis cognitifs fondamentalement différents. Le mode Je Vois Je Vois utilise un algorithme de placement sans chevauchement pour disperser 1–5 objets cachés parmi 8–12 objets distracteurs sur toute la page — pas de grille, pas de lignes ni de colonnes, juste une scène visuelle cohérente. L\'algorithme findBestPosition() essaie 50 positions aléatoires par image et sélectionne le placement avec le moins de chevauchement, réduisant adaptativement la taille des images quand l\'espace se fait rare. Une légende en bas de la fiche (marge de 120 px) montre aux utilisateurs exactement quels objets chercher, rendant les fiches accessibles aux pré-lecteurs sans consignes écrites. Le mode Trouve l\'Intrus dispose 8–12 images appariées avec 1–5 éléments non appariés mélangés — les utilisateurs identifient les images sans partenaire correspondant. Les images en mode Trouve l\'Intrus sont rendues 50 % plus grandes qu\'en mode Je Vois Je Vois pour une comparaison visuelle claire. Le système à double canevas génère à la fois un onglet Fiche et un onglet Corrigé simultanément. Le corrigé reproduit la disposition exacte de la fiche et dessine des cercles rouges autour des objets cachés (mode Je Vois Je Vois) ou des éléments non appariés (mode Trouve l\'Intrus), dimensionnés 3–5 px plus grands que l\'objet pour une visibilité claire. Un en-tête auto-généré affiche votre titre en police Fredoka avec dimensionnement automatique — 32 px pour les titres courts jusqu\'à 18 px pour les textes plus longs — avec des capsules décoratives blanches et des ombres. Activez ou désactivez les champs nom et date pour la traçabilité en ligne. Le Générateur de Fiches Cherche Objets n\'est PAS sensible à la langue : les puzzles sont entièrement visuels sans noms d\'images localisés sur le contenu de la fiche, rendant chaque puzzle universellement vendable sur tous les marchés sans traduction. Parcourez 104 collections thématiques avec plus de 3 100 illustrations ou importez vos propres images PNG, JPG ou GIF. Appliquez des thèmes de fond et des thèmes de bordure avec des curseurs d\'opacité indépendants. Ajoutez du texte personnalisé avec 7 options de police (Lexend Deca, Baloo 2, Nunito, Quicksand, Fredoka, Arial, Verdana) et contour de texte de 0 à 10. Exportez des PDF prêts à imprimer et des JPEG à 300 DPI (multiplicateur 6×) en Letter Portrait, Letter Paysage, A4 Portrait, A4 Paysage, Carré (1200×1200) ou dimensions personnalisées. Activez les niveaux de gris pour une sortie économique en encre. L\'essai gratuit inclut toutes les fonctionnalités avec un filigrane sur les téléchargements. Achetez une licence pour supprimer le filigrane et vendre à usage commercial.',
  },

  tutorial: {
    title: 'Comment Créer des Fiches Objets Cachés en 8 Étapes',
    steps: [
      {
        title: 'Ouvrir le Générateur de Fiches Cherche Objets',
        description: 'Cliquez sur \" Essayer maintenant \" pour lancer le générateur de fiches objets cachés dans votre navigateur. L\'outil s\'ouvre instantanément avec une barre latérale de réglages à gauche et un canevas à double onglet à droite — un onglet pour la fiche, un pour le corrigé. Aucun compte, aucun téléchargement de logiciel, aucune installation requis — commencez à créer des fiches objets cachés immédiatement.',
      },
      {
        title: 'Définir Votre Mise en Page',
        description: 'Ouvrez le panneau Mise en Page et choisissez un format de page : Letter Portrait, Letter Paysage, A4 Portrait, A4 Paysage, Carré (1200×1200) ou entrez une dimension personnalisée. Choisissez une couleur de fond avec le sélecteur de couleur. Sélectionnez un thème de fond et ajustez son opacité, puis choisissez un thème de bordure avec son propre contrôle d\'opacité indépendant. Ces choix de mise en page encadrent votre fiche d\'objets cachés avant de configurer le mode d\'activité ou le contenu.',
      },
      {
        title: 'Choisir Votre Mode d\'Activité',
        description: 'Sélectionnez entre deux modes dans le panneau Sélection d\'Objets. Le mode Je Vois Je Vois (par défaut) crée des scènes d\'objets cachés en placement libre où les images sont dispersées sur la page par un algorithme sans chevauchement — pas de grille, juste une scène visuelle naturelle où les utilisateurs cherchent des objets spécifiques guidés par une légende en bas. Le mode Trouve l\'Intrus dispose des images appariées en rangées avec des éléments non appariés mélangés pour des activités de discrimination visuelle où les utilisateurs identifient les images sans partenaire correspondant. Chaque mode produit un type différent de fiche cherche-et-trouve à partir de la même bibliothèque d\'images.',
      },
      {
        title: 'Configurer les Quantités d\'Objets pour le Contrôle de Difficulté',
        description: 'En mode Je Vois Je Vois, configurez 1–5 objets cachés (les cibles que les utilisateurs doivent trouver) et 8–12 objets distracteurs (les images environnantes qui remplissent la scène). Commencez avec 1–2 objets cachés et 8 distracteurs pour des fiches faciles adaptées aux plus jeunes, et augmentez à 5 objets cachés parmi 12 distracteurs pour des scènes stimulantes pour les utilisateurs avancés. En mode Trouve l\'Intrus, réglez 8–12 images appariées et 1–5 éléments non appariés (intrus). Le nombre d\'objets est votre contrôle principal de difficulté — moins de cibles pour des produits simples, plus de cibles pour des collections de défis premium.',
      },
      {
        title: 'Sélectionner les Images dans la Bibliothèque Thématique',
        description: 'Ouvrez le panneau Bibliothèque d\'Images et parcourez 104 collections thématiques avec plus de 3 100 illustrations colorées — animaux, nourriture, véhicules, nature, professions, fêtes, sports, saisons et des dizaines d\'autres. Filtrez par thème avec le menu déroulant ou recherchez par mot-clé. Chaque thème fournit un ensemble coordonné d\'illustrations servant à la fois d\'objets cachés et de distracteurs dans les scènes Je Vois Je Vois, ou d\'éléments appariés et non appariés dans les fiches Trouve l\'Intrus. Vous pouvez aussi importer vos propres images PNG, JPG ou GIF à utiliser aux côtés du contenu de la bibliothèque pour des produits uniques et personnalisés.',
      },
      {
        title: 'Générer la Scène d\'Objets Cachés',
        description: 'Cliquez sur Générer pour créer la fiche. En mode Je Vois Je Vois, l\'algorithme sans chevauchement place chaque image en essayant 50 positions aléatoires et en sélectionnant celle avec le moins de chevauchement, réduisant adaptativement la taille des images quand l\'espace se fait rare. Une légende apparaît en bas de la fiche (marge de 120 px) montrant aux utilisateurs quels objets chercher. En mode Trouve l\'Intrus, les images sont disposées en rangées avec des éléments appariés et non appariés, rendus 50 % plus grands pour une comparaison visuelle claire. L\'en-tête à taille automatique affiche votre titre en police Fredoka — 32 px pour les titres courts jusqu\'à 18 px pour les textes plus longs. Activez ou désactivez les champs nom et date pour les fiches de classe. Cliquez à nouveau sur Générer pour reconstruire avec un placement aléatoire différent — mêmes images, mêmes réglages, disposition d\'objets cachés entièrement différente.',
      },
      {
        title: 'Consulter le Corrigé Auto-Généré',
        description: 'Cliquez sur l\'onglet Corrigé pour voir les annotations auto-générées. Le corrigé reproduit la disposition exacte de la fiche et dessine des cercles rouges autour des objets corrects — les cibles cachées en mode Je Vois Je Vois et les éléments non appariés en mode Trouve l\'Intrus. Les cercles sont dimensionnés 3–5 px plus grands que l\'objet pour une visibilité claire. Basculez entre les onglets Fiche et Corrigé pour comparer. Le corrigé se génère simultanément avec la fiche — aucun marquage manuel, aucun fichier séparé à créer, aucune possibilité de réponses incompatibles. Ce système à double canevas fait gagner un temps de production considérable lors de la création de lots d\'objets cachés.',
      },
      {
        title: 'Télécharger les Quatre Fichiers',
        description: 'Activez les niveaux de gris pour des versions économiques en encre idéales pour l\'impression en volume et les intérieurs KDP. Téléchargez les quatre fichiers d\'une seule session : fiche JPEG, fiche PDF, corrigé JPEG et corrigé PDF — tous rendus à 300 DPI (multiplicateur 6×). Chaque onglet possède ses propres boutons de téléchargement. Tous les exports sont prêts pour la production pour les annonces Etsy.fr, les intérieurs Amazon KDP et les fichiers produits Gumroad sans aucun post-traitement nécessaire. Changez de thème, ajustez les quantités d\'objets, changez de mode d\'activité et générez à nouveau pour créer rapidement de la variété à travers les 104 collections thématiques.',
      },
    ],
  },

  whatYouCanCreate: [
    {
      title: 'Lots Thématiques de Fiches Je Vois Je Vois',
      description: 'Créez des packs de fiches Je Vois Je Vois organisés par thème en utilisant les 104 collections d\'images — objets cachés animaux, recherche créatures océaniques, dinosaures à trouver, Je Vois Je Vois fêtes et des dizaines d\'autres. Chaque thème fournit assez d\'illustrations pour plusieurs scènes d\'objets cachés uniques avec une difficulté variable. Proposez 15–20 fiches Je Vois Je Vois par thème avec corrigés auto-générés inclus. Augmentez la difficulté à travers le lot en ajoutant plus d\'objets cachés (de 1 à 5) et plus de distracteurs (de 8 à 12) au fil des pages. L\'algorithme sans chevauchement produit une disposition dispersée différente à chaque génération, rendant la création de multiples fiches uniques à partir du même thème rapide.',
    },
    {
      title: 'Packs Variété Mixtes Je Vois Je Vois et Trouve l\'Intrus',
      description: 'Combinez les deux modes d\'activité dans des packs variété premium. Chaque pack comprend des scènes Je Vois Je Vois où les utilisateurs cherchent des objets spécifiques dans une scène dispersée guidés par la légende en bas, plus des fiches Trouve l\'Intrus où les utilisateurs identifient les éléments non appariés parmi des ensembles appariés. Cette combinaison cible deux compétences cognitives différentes — la recherche visuelle et la discrimination visuelle — dans un seul produit. Les packs mixtes se vendent à des prix plus élevés car ils offrent plus de variété d\'activités et couvrent plus d\'objectifs d\'apprentissage que les produits à mode unique.',
    },
    {
      title: 'Cahiers d\'Activités Objets Cachés KDP avec Difficulté Progressive',
      description: 'Compilez 50–80 fiches d\'objets cachés dans des cahiers imprimés pour Amazon KDP. Structurez les chapitres par difficulté progressive : les premiers chapitres cachent 1–2 objets parmi 8 distracteurs pour les débutants, les chapitres intermédiaires augmentent à 3–4 objets cachés avec 10 distracteurs, et les chapitres avancés utilisent 5 objets cachés parmi 12 distracteurs. Incluez les pages de corrigés à la fin avec les annotations en cercles rouges. Activez les niveaux de gris pour une sortie économique en encre optimisée pour les intérieurs en noir et blanc. Le format uniquement visuel signifie qu\'un seul cahier fonctionne pour tous les marchés internationaux KDP sans traduction.',
    },
    {
      title: 'Collections de Fiches Trouve l\'Intrus Discrimination Visuelle',
      description: 'Construisez des collections dédiées de fiches Trouve l\'Intrus où les utilisateurs identifient les éléments non appariés parmi des ensembles d\'images appariées. Configurez 8–12 images appariées et 1–5 éléments non appariés par fiche, avec des images rendues 50 % plus grandes pour une comparaison visuelle claire. Créez des ensembles alignés sur les programmes : Trouve l\'Intrus animaux de la ferme pour les sciences, tri de groupes alimentaires pour la nutrition, identification de métiers pour les sciences sociales et reconnaissance de formes pour le pré-calcul. Chaque fiche s\'exporte avec son corrigé auto-généré montrant les cercles rouges autour de chaque élément non apparié, éliminant le temps de préparation pour créer des pages de solutions séparées.',
    },
    {
      title: 'Collections Saisonnières d\'Activités Objets Cachés',
      description: 'Construisez des collections saisonnières tournantes en utilisant les thèmes festifs et de nature des 104 collections. Scènes objets cachés de Noël, activités Je Vois Je Vois Halloween, fiches cherche-et-trouve de Pâques, défis de la rentrée et ensembles thématiques d\'été — chaque occasion soutient des packs saisonniers dédiés. Incluez à la fois des fiches Je Vois Je Vois et Trouve l\'Intrus dans chaque collection saisonnière pour une variété maximale. Lancez chaque collection 4–6 semaines avant la fête pour une visibilité maximale sur le marketplace. Le format uniquement visuel rend les collections saisonnières vendables dans tous les pays sans localisation.',
    },
    {
      title: 'Méga-Lots Multi-Formats Cherche et Trouve',
      description: 'Associez les fiches d\'objets cachés avec des mots cachés, des fiches cherche et compte, des mots croisés en images et des fiches chasse au trésor en utilisant des thèmes coordonnés à travers plusieurs générateurs. Les scènes d\'objets cachés développent la recherche visuelle et l\'identification d\'objets. Les mots cachés développent la reconnaissance des lettres et le vocabulaire. Les fiches cherche et compte ajoutent la pratique de la numération. Chaque format cible une compétence cognitive différente tout en maintenant une cohérence thématique. Les méga-lots multi-formats cherche et trouve se vendent à des prix premium car les parents et vendeurs paient plus pour des collections complètes que pour des packs à activité unique.',
    },
  ],

  businessIdeas: [
    {
      title: 'Boutique Etsy de Fiches Objets Cachés Thématiques',
      description: 'Ouvrez une boutique Etsy spécialisée dans les lots de fiches objets cachés organisés par thème en utilisant les 104 collections d\'images. Objets cachés animaux, Je Vois Je Vois fêtes, recherche créatures océaniques, dinosaures à trouver — chaque thème devient un listing séparé avec une difficulté progressive de 1 objet caché à 5. Chaque lot inclut des corrigés auto-générés avec annotations en cercles rouges — un argument de vente essentiel qui différencie vos listings des concurrents vendant des puzzles sans solutions. L\'algorithme sans chevauchement génère des dispositions dispersées uniques à chaque clic, rendant la production par lots rapide. Prix : packs thématiques individuels à 3 €–5 € pour 15–20 fiches avec corrigés et lots premium multi-thèmes à 7 €–12 €.',
      platform: 'Etsy.fr',
    },
    {
      title: 'Série de Cahiers d\'Activités Objets Cachés sur Amazon KDP',
      description: 'Compilez 50–80 fiches d\'objets cachés dans des cahiers thématiques pour Amazon KDP. Structurez une série par difficulté et mode : \" Je Vois Je Vois Facile pour Débutants \" utilisant 1–2 objets cachés avec 8 distracteurs, \" Aventures Je Vois Je Vois \" augmentant à 3–4 objets cachés avec 10 distracteurs, \" Défis Avancés Objets Cachés \" utilisant 5 objets cachés parmi 12 distracteurs, et \" Puzzles Visuels Trouve l\'Intrus \" utilisant le mode images appariées. Incluez les pages de corrigés à la fin avec les annotations en cercles rouges. Activez les niveaux de gris pour une sortie économique en encre. Le format uniquement visuel se publie de manière identique sur tous les marchés internationaux KDP sans traduction — un seul intérieur fonctionne pour tous les pays.',
      platform: 'Amazon KDP',
    },
    {
      title: 'Packs d\'Activités Objets Cachés pour la vente sur Gumroad',
      description: 'Téléversez des packs d\'activités objets cachés sur Gumroad avec les champs nom et date et les corrigés auto-générés comme arguments de vente principaux. Les vendeurs recherchant des activités de recherche visuelle et d\'observation valorisent les fiches prêtes à l\'emploi avec solutions incluses. Créez des ensembles alignés sur les programmes : objets cachés animaux de la ferme pour les sciences, Je Vois Je Vois métiers pour les sciences sociales, recherche de groupes alimentaires pour la nutrition et scènes objets cachés saisonnières pour les activités festives. Incluez à la fois des fiches Je Vois Je Vois et Trouve l\'Intrus pour une instruction différenciée — Je Vois Je Vois pour la pratique de la recherche visuelle et Trouve l\'Intrus pour le développement de la discrimination visuelle.',
      platform: 'Gumroad',
    },
    {
      title: 'Tunnel de Vente Pinterest pour Fiches Objets Cachés',
      description: 'Les fiches d\'objets cachés font des épingles Pinterest visuellement saisissantes — les scènes d\'images colorées dispersées avec des objets à trouver créent un contenu éducatif immédiatement engageant sur lequel parents et vendeurs cliquent. Épinglez des exemples de fiches montrant les deux modes : Je Vois Je Vois avec des objets cachés dispersés et la légende en bas, et Trouve l\'Intrus avec des images appariées en rangées. Créez des séries d\'épingles distinctes pour \" fiches objets cachés pour enfants \", \" activités Je Vois Je Vois imprimables \" et \" puzzles visuels Trouve l\'Intrus \". Les images d\'aperçu du corrigé avec les annotations en cercles rouges démontrent une qualité professionnelle. Reliez chaque épingle à vos listings Etsy ou Gumroad pour une conversion directe.',
      platform: 'Pinterest',
    },
    {
      title: 'Kit Complet d\'Activités Objets Cachés sur Gumroad',
      description: 'Regroupez des fiches d\'objets cachés couvrant les 104 thèmes et les deux modes d\'activité dans un kit complet sur Gumroad. Incluez plus de 300 fiches couvrant le mode Je Vois Je Vois avec des niveaux de difficulté progressive (1–5 objets cachés, 8–12 distracteurs) et le mode Trouve l\'Intrus avec des quantités d\'images appariées variables. Chaque fiche inclut son corrigé auto-généré avec annotations en cercles rouges, doublant votre nombre de fichiers à plus de 600 au total. L\'algorithme sans chevauchement et les deux modes d\'activité produisent plus de variété que n\'importe quel concurrent offrant de simples fiches objets cachés en grille. Le format kit justifie un prix premium car les acheteurs obtiennent une bibliothèque complète de puzzles objets cachés.',
      platform: 'Gumroad',
    },
    {
      title: 'Gamme de Puzzles Visuels pour le Marché International',
      description: 'Le Générateur de Fiches Cherche Objets produit des puzzles purement visuels — aucun texte spécifique à une langue n\'apparaît sur le contenu de la fiche. La légende Je Vois Je Vois utilise des images, pas des mots, et le mode Trouve l\'Intrus est entièrement visuel. Les mêmes fichiers produits fonctionnent dans tous les pays sans traduction ni modification. Une seule session de création produit un catalogue vendable mondialement. Vendez des fichiers identiques sur des boutiques Etsy ciblant différents pays, publiez les mêmes intérieurs KDP sur tous les marchés internationaux Amazon, et listez sur Gumroad pour les vendeurs internationaux. Aucune version par langue, aucun coût de traduction, aucune maintenance par locale — le format uniquement visuel est votre avantage de vente international le plus puissant.',
      platform: 'Etsy.fr / Amazon KDP',
    },
  ],

  proTips: [
    {
      title: 'Exploitez l\'Algorithme Sans Chevauchement pour des Scènes Naturelles',
      description: 'L\'algorithme findBestPosition() essaie 50 positions aléatoires par image et choisit le placement avec le moins de chevauchement, réduisant adaptativement la taille des images quand l\'espace se fait rare. Cela signifie que chaque génération produit une scène naturelle différente même avec les mêmes images et réglages. Cliquez sur Générer à plusieurs reprises pour produire de multiples fiches uniques à partir de contenu identique — chaque clic crée une disposition dispersée complètement différente. Produisez par lots plus de 10 fiches uniques par thème en quelques minutes sans changer aucun réglage.',
    },
    {
      title: 'Contrôlez la Difficulté par les Quantités d\'Objets Cachés et de Distracteurs',
      description: 'Les quantités d\'objets contrôlent directement la difficulté des fiches d\'objets cachés. Je Vois Je Vois avec 1 objet caché parmi 8 distracteurs crée des fiches faciles pour les produits maternelle. Augmenter à 3 objets cachés parmi 10 distracteurs produit des défis modérés pour les utilisateurs du primaire. La difficulté maximale (5 objets cachés parmi 12 distracteurs) crée des scènes denses où trouver chaque cible demande un véritable effort. Créez des lots à difficulté progressive avec des sections facile, moyen et difficile clairement étiquetées — les acheteurs paient des prix premium pour des produits qui grandissent avec l\'apprenant.',
    },
    {
      title: 'Exploitez le Format Uniquement Visuel pour des Ventes Mondiales Sans Traduction',
      description: 'Les fiches d\'objets cachés ne contiennent que des images — aucun texte spécifique à une langue sur le contenu de la fiche. La légende Je Vois Je Vois affiche les objets cibles visuellement, et le mode Trouve l\'Intrus est purement basé sur les images. Chaque puzzle que vous créez est instantanément vendable dans le monde entier sans traduction ni localisation. Un seul ensemble de puzzles d\'objets cachés sert chaque boutique Etsy internationale, chaque marketplace KDP et chaque acheteur Gumroad quelle que soit la langue. Pendant que les concurrents créent des versions par langue de fiches textuelles, vos puzzles visuels fonctionnent partout à partir d\'un seul ensemble de fichiers.',
    },
    {
      title: 'Incluez les Deux Modes d\'Activité dans Chaque Lot pour une Valeur Perçue Maximale',
      description: 'Les lots incluant à la fois des fiches Je Vois Je Vois et Trouve l\'Intrus offrent plus de variété que les produits à mode unique. Le mode Je Vois Je Vois développe la recherche visuelle et l\'identification d\'objets avec ses scènes dispersées et sa légende en bas. Le mode Trouve l\'Intrus développe la discrimination visuelle et la reconnaissance de motifs avec son format d\'images appariées. Inclure les deux modes dans chaque lot double votre variété de fiches à partir des mêmes sélections de thèmes, couvre deux compétences cognitives différentes et justifie un prix plus élevé car les acheteurs obtiennent deux types d\'activités distincts en un seul achat.',
    },
    {
      title: 'Exploitez la Légende en Bas pour l\'Accessibilité Pré-Lecteurs',
      description: 'La légende Je Vois Je Vois en bas de la fiche (marge de 120 px) montre les objets cibles visuellement — aucune lecture requise. Cela rend vos fiches d\'objets cachés accessibles aux pré-lecteurs, aux tout-petits et aux classes multilingues où des consignes écrites excluraient certains utilisateurs. Mettez en avant cette accessibilité dans vos listings de marketplace pour atteindre le marché maternelle et petite enfance. Les parents de pré-lecteurs recherchent activement des activités uniquement visuelles, et la légende fait ressortir vos produits des concurrents à base de texte.',
    },
    {
      title: 'Utilisez les Niveaux de Gris pour les Produits Classe et KDP Économiques',
      description: 'Activez les niveaux de gris pour créer des fiches d\'objets cachés économiques en encre spécifiquement pour le marché de votre boutique et de l\'instruction en famille. De nombreux vendeurs impriment sur des imprimantes noir et blanc et valorisent les produits optimisés pour la sortie en niveaux de gris. Créez des lots double format incluant les versions couleur et niveaux de gris des mêmes fiches — les acheteurs perçoivent cela comme le double de valeur. Les intérieurs KDP en impression à la demande bénéficient aussi de l\'optimisation en niveaux de gris puisque l\'impression couleur coûte significativement plus cher.',
    },
    {
      title: 'Incluez les Corrigés dans Chaque Aperçu de Listing pour Surpasser les Concurrents',
      description: 'Le corrigé auto-généré avec les annotations en cercles rouges autour des objets cachés et non appariés est votre différenciateur de vente le plus puissant. Incluez toujours les images d\'aperçu du corrigé dans vos listings de marketplace — montrez les cercles rouges clairement dans les photos produit. Les produits incluant les corrigés surpassent systématiquement les listings puzzles-seuls car les vendeurs et parents veulent des supports auto-correctifs qui font gagner du valeur perçue. Le système à double canevas génère les deux versions simultanément, donc inclure le corrigé ne vous coûte rien en temps de production supplémentaire.',
    },
  ],

  faq: [
    {
      question: 'Y a-t-il un essai gratuit ?',
      answer: 'Oui. L\'outil propose un essai gratuit avec toutes les fonctionnalités — les deux modes d\'activité (Je Vois Je Vois et Trouve l\'Intrus), les quantités d\'objets cachés et de distracteurs configurables, l\'algorithme de placement sans chevauchement, le corrigé auto-généré avec annotations en cercles rouges, la légende en mode Je Vois Je Vois, les 104 collections thématiques avec plus de 3 100 illustrations, l\'importation d\'images personnalisées, les thèmes de fond et de bordure avec opacité indépendante, les champs nom et date, le mode niveaux de gris et tous les formats de téléchargement. Sans inscription, sans carte bancaire. Les téléchargements de l\'essai gratuit incluent un filigrane. Achetez une licence commerciale pour supprimer le filigrane et débloquer les droits de vente.',
    },
    {
      question: 'Quels sont les deux modes d\'activité et en quoi diffèrent-ils ?',
      answer: 'Le générateur propose deux modes distincts dans un seul outil. Le mode Je Vois Je Vois (par défaut) crée des scènes d\'objets cachés en placement libre où 1–5 objets cibles sont dispersés parmi 8–12 distracteurs grâce à un algorithme de placement sans chevauchement — les utilisateurs explorent la page et entourent ce qu\'ils trouvent, guidés par une légende en bas montrant les objets à localiser. Le mode Trouve l\'Intrus dispose 8–12 images appariées avec 1–5 éléments non appariés mélangés — les utilisateurs identifient les images sans partenaire correspondant. Les images en mode Trouve l\'Intrus sont rendues 50 % plus grandes qu\'en mode Je Vois Je Vois pour une comparaison visuelle plus claire. Chaque mode produit un défi cognitif fondamentalement différent à partir de la même bibliothèque d\'images.',
    },
    {
      question: 'Comment fonctionne l\'algorithme de placement sans chevauchement ?',
      answer: 'Au lieu de placer les images sur une grille fixe, le mode Je Vois Je Vois utilise un algorithme findBestPosition() qui essaie 50 positions aléatoires pour chaque image et sélectionne le placement avec le moins de chevauchement. Quand l\'espace se fait rare, l\'algorithme réduit adaptativement la taille des images pour en placer davantage sans encombrer la scène. Cela crée des scènes d\'objets cachés naturelles où les images sont dispersées organiquement sur la page — bien plus engageant que les alternatives en grille où les objets s\'alignent dans des lignes et colonnes prévisibles. Cliquez sur Générer plusieurs fois pour produire des dispositions uniques à partir de réglages identiques.',
    },
    {
      question: 'Comment fonctionne la légende en mode Je Vois Je Vois ?',
      answer: 'En mode Je Vois Je Vois, une légende en bas de la fiche (marge inférieure de 120 px) affiche les objets cibles que les utilisateurs doivent trouver. Cette référence visuelle montre chaque objet caché pour que les utilisateurs sachent exactement quoi chercher — rendant les fiches accessibles aux pré-lecteurs et aux classes multilingues sans nécessiter de consignes écrites. La légende est générée automatiquement d\'après vos objets cachés sélectionnés. Le mode Trouve l\'Intrus utilise une marge inférieure compacte de 50 px puisque les utilisateurs découvrent les éléments non appariés par comparaison visuelle plutôt que par une liste de référence.',
    },
    {
      question: 'Combien d\'objets cachés et de distracteurs peut-on configurer ?',
      answer: 'En mode Je Vois Je Vois, configurez 1–5 objets cachés (les cibles que les utilisateurs doivent trouver) et 8–12 objets distracteurs (les images environnantes qui remplissent la scène). Commencez avec 1–2 objets cachés et 8 distracteurs pour des fiches faciles adaptées aux plus jeunes, et augmentez à 5 objets cachés parmi 12 distracteurs pour des scènes stimulantes. En mode Trouve l\'Intrus, configurez 8–12 images appariées (chacune apparaît avec un partenaire correspondant) et 1–5 éléments non appariés que les utilisateurs doivent identifier. Les quantités d\'objets sont votre contrôle principal de difficulté.',
    },
    {
      question: 'Comment fonctionne le corrigé auto-généré ?',
      answer: 'Le générateur utilise un système à double canevas avec un onglet Fiche et un onglet Corrigé. La fiche montre la scène d\'objets cachés sans marquage — les utilisateurs cherchent et entourent les objets eux-mêmes. Le corrigé reproduit la disposition identique et dessine des cercles rouges autour des objets corrects : les cibles cachées en mode Je Vois Je Vois et les éléments non appariés en mode Trouve l\'Intrus. Les cercles sont dimensionnés 3–5 px plus grands que l\'objet pour une visibilité claire. Téléchargez chaque version indépendamment avec quatre boutons dédiés : fiche JPEG, fiche PDF, corrigé JPEG et corrigé PDF.',
    },
    {
      question: 'Comment fonctionne l\'en-tête auto-généré ?',
      answer: 'Chaque fiche inclut un titre à taille automatique rendu en police Fredoka avec des capsules décoratives blanches et des ombres. La taille de police s\'ajuste automatiquement selon la longueur du texte : 32 px pour les titres courts (moins de 12 caractères), diminuant jusqu\'à 18 px pour les titres plus longs (plus de 22 caractères). Vous pouvez aussi ajouter un champ de description sous le titre. Le système d\'en-tête garantit des fiches professionnelles quelle que soit la longueur du titre.',
    },
    {
      question: 'Le Générateur de Fiches Cherche Objets est-il sensible à la langue ?',
      answer: 'Non. Le Générateur de Fiches Cherche Objets est un format de puzzle purement visuel — aucun nom d\'image localisé n\'apparaît sur le contenu de la fiche. La légende Je Vois Je Vois affiche les objets cibles sous forme d\'images, pas de texte. Les réglages de langue affectent uniquement les étiquettes de l\'interface (boutons, titres de panneaux, infobulles), PAS le contenu des fiches. Cela rend chaque fiche générée universellement vendable sur tous les marchés sans traduction ni modification — un seul ensemble de puzzles d\'objets cachés fonctionne pour tous les marchés internationaux.',
    },
    {
      question: 'Quels formats de page et d\'export sont disponibles ?',
      answer: 'Les formats de page incluent Letter Portrait, Letter Paysage, A4 Portrait, A4 Paysage, Carré (1200×1200) et dimensions personnalisées. Exportez en JPEG haute résolution ou en PDF prêt à imprimer à 300 DPI (multiplicateur 6×). Activez les niveaux de gris pour une sortie économique en encre. Chaque génération produit quatre fichiers de téléchargement : fiche JPEG, fiche PDF, corrigé JPEG et corrigé PDF. Tous les exports sont prêts pour la production pour les téléchargements numériques, les cahiers imprimés et les fiches de classe.',
    },
    {
      question: 'Quels outils d\'édition du canevas sont disponibles ?',
      answer: 'Le canevas Fabric.js offre un contrôle total sur chaque élément. Glissez, redimensionnez, pivotez et repositionnez librement images, texte et contenu généré. Les contrôles de couches gèrent l\'ordre d\'empilement avec verrouillage/déverrouillage sur les objets individuels. Ajoutez du texte personnalisé avec 7 options de police (Lexend Deca, Baloo 2, Nunito, Quicksand, Fredoka, Arial, Verdana), taille et couleur réglables, et épaisseur de contour de texte de 0 à 10. Six options d\'alignement plus centrage sur la page positionnent les éléments avec précision. Zoom de 25 % à 300 % et annuler/rétablir jusqu\'à 20 états d\'historique.',
    },
    {
      question: 'Peut-on vendre des fiches objets cachés créées avec cet outil à usage commercial ?',
      answer: 'Oui. Avec une licence commerciale, vous avez les droits complets pour vendre des fiches d\'objets cachés en téléchargements numériques sur Etsy, en cahiers d\'activités imprimés sur Amazon KDP, en ressources imprimables sur Gumroad ou via tout autre canal de vente. Les deux modes d\'activité, la génération de scènes sans chevauchement, le dimensionnement adaptatif des images, les corrigés auto-générés avec annotations en cercles rouges, la légende Je Vois Je Vois, l\'importation d\'images personnalisées et les 104 collections thématiques vous donnent tout le nécessaire pour créer des produits d\'objets cachés professionnels compétitifs dans les catégories cherche-et-trouve sur toutes les grandes places de marché.',
    },
    {
      question: 'Quelle est votre politique de remboursement ?',
      answer: 'Essayez avant d\'acheter grâce à notre essai gratuit — toutes les fonctionnalités sont disponibles pour que vous puissiez évaluer complètement l\'outil avant d\'acheter. Comme l\'essai gratuit vous donne un accès complet aux deux modes d\'activité, aux quantités d\'objets configurables, à l\'algorithme sans chevauchement, au corrigé auto-généré avec annotations en cercles rouges, à la légende Je Vois Je Vois, aux 104 thèmes, à l\'importation d\'images personnalisées, aux thèmes de fond et de bordure, aux champs nom et date, à l\'export en niveaux de gris et à tous les formats de téléchargement, nous n\'offrons pas de remboursement sur les achats de licence. Assurez-vous que l\'outil répond à vos besoins en utilisant l\'essai gratuit avant d\'acheter.',
    },
    {
      question: 'Ces fiches sont-elles adaptées à la maternelle et au primaire (GS, CP, CE1) ?',
      answer: 'Oui. Les fiches générées conviennent à la maternelle (PS, MS, GS), au CP, CE1, CE2 et au-delà. Au Québec, cela correspond au préscolaire et aux premières années du primaire. En Belgique et en Suisse romande, les niveaux équivalents sont également couverts. La difficulté est ajustable pour chaque niveau.',
    },
  ],

  internalLinks: [
    { pageType: 'app', slug: 'cherche-objets-fiches', anchorText: 'Fiches Objets Cachés — Détails Complets du Produit' },
    { pageType: 'tool', slug: 'generateur-cherche-et-compte', anchorText: 'Générateur de Fiches Cherche et Compte' },
    { pageType: 'tool', slug: 'generateur-mots-croises-images', anchorText: 'Générateur de Mots Croisés en Images' },
    { pageType: 'tool', slug: 'generateur-chasse-au-tresor', anchorText: 'Générateur de Chasse au Trésor' },
    { pageType: 'tool', slug: 'generateur-mots-caches', anchorText: 'Générateur de Mots Cachés' },
    { pageType: 'tool', slug: 'generateur-fiches-intrus', anchorText: 'Générateur de Fiches Trouve l\'Intrus' },
    { pageType: 'tool', slug: 'generateur-fiches-association', anchorText: 'Générateur de Fiches d\'Association' },
    { pageType: 'tool', slug: 'generateur-pages-coloriage', anchorText: 'Générateur de Pages de Coloriage' },
    {
      pageType: 'app',
      slug: 'find-objects-worksheets',
      anchorText: 'Ready to sell what you make? Get the commercial license.',
    },
  ],

  visuals: {
    heroImages: {
      primary: '/samples/french/find%20objects/trouve-l\'intrus-1.webp',
      primaryAlt: 'Fiche objets cachés Je Vois Je Vois avec images dispersées par algorithme sans chevauchement montrant légende en bas avec objets à trouver et en-tête décoratif Fredoka',
    },
    sampleGallery: [
      {
        src: '/samples/french/find%20objects/trouve-l\'intrus-1.webp',
        alt: 'Scène Je Vois Je Vois avec images dispersées et légende montrant les objets cibles en bas de la fiche',
        caption: 'Mode Je Vois Je Vois — scène d\'objets cachés en placement libre avec légende et algorithme sans chevauchement',
      },
      {
        src: '/samples/french/find%20objects/trouve-l\'intrus-2-v9.webp',
        alt: 'Fiche Trouve l\'Intrus avec images appariées en rangées et éléments non appariés à identifier rendus 50 pour cent plus grands',
        caption: 'Mode Trouve l\'Intrus — images appariées avec éléments non appariés pour activités de discrimination visuelle',
      },
      {
        src: '/samples/french/find%20objects/trouve-l\'intrus-1-answer-key-v8.webp',
        alt: 'Corrigé de fiche objets cachés avec cercles rouges dessinés autour des objets cibles dimensionnés 3 à 5 pixels plus grands que chaque objet',
        caption: 'Corrigé auto-généré — annotations en cercles rouges marquant les objets cachés et non appariés pour auto-correction',
      },
    ],
    youtubeId: '8Y3jrVr1Phs',
    videoTitle: 'Comment Créer des Fiches Objets Cachés avec les Modes Je Vois Je Vois et Trouve l\'Intrus, Placement Sans Chevauchement et Corrigés Automatiques — Tutoriel Étape par Étape',
  },
};

export default content;
