import type { AppContent } from '../types';

const content: AppContent = {
  seo: {
    primaryKeyword: 'puzzle pièces manquantes à imprimer',
    secondaryKeywords: [
      'jeu pièce manquante fiche',
      'compléter le puzzle exercice',
      'observation visuelle fiche',
      'jeu logique visuelle à imprimer',
    ],
    lsiKeywords: [
      'puzzle',
      'compléter',
      'observer',
      'raisonnement visuel',
      'maternelle',
      'GS',
      'CP',
      'solution',
    ],
    titleTag: 'Puzzle pièces manquantes | Générateur jeux logiques',
    metaDescription: 'Créez des fiches « pièces manquantes » avec images thématiques et solutions automatiques. PDF 300 DPI imprimables. Essai gratuit — licence commerciale.',
  },

  hero: {
    title: 'Puzzle pièces manquantes à imprimer — Générateur de jeux de logique visuelle',
    tagline: 'Créez des puzzles style puzzle où des pièces sont découpées dans des images et les utilisateurs identifient la bonne option numérotée — avec 6 formes de pièces, 1 à 5 pièces manquantes, 2 à 6 options de réponse incluant des pièces distractrices, des corrigés auto-générés et un design purement visuel qui fonctionne dans toutes les langues.',
    description:
      'Créez des puzzles pièces manquantes à vendre sur Etsy, Amazon KDP ou La Salle des Maîtres — des puzzles où une image a des trous découpés et les acheteurs identifient quelle option numérotée remplit chaque espace. L\'algorithme d\'extraction intelligente de pièces trouve des zones visuellement distinctes avec une variance de couleur suffisante, garantissant que chaque puzzle est résolvable et engageant. Choisissez parmi 6 formes de pièces — carré, cercle, rectangle portrait, rectangle paysage, ellipse portrait et ellipse paysage — et configurez la difficulté avec 1 à 5 pièces manquantes et 2 à 6 options de réponse qui incluent des pièces distractrices pour stimuler les compétences de discrimination visuelle. Chaque puzzle comprend un corrigé auto-généré avec des étiquettes numériques surlignées en jaune placées à l\'intérieur de chaque trou montrant la bonne option. L\'en-tête auto-généré affiche \" Pièces Manquantes \" en turquoise (#06B6D4) avec une description rose (#DB2777) à travers un système à double bordure — bordure extérieure bleu sarcelle (#14B8A6, 8px) et bordure intérieure rose vif (#EC4899, 3px) — localisé dans les 11 langues prises en charge. Pièces Manquantes n\'est PAS sensible à la langue : les puzzles sont purement visuels sans contenu dépendant de la locale, donc chaque puzzle fonctionne identiquement dans le monde entier. L\'Accès Complet déverrouille les 104 thèmes avec plus de 3 100 illustrations et les 11 langues d\'interface. Ajoutez des thèmes de fond et de bordure avec des contrôles d\'opacité indépendants, et exportez des PDF et JPEG prêts à imprimer à 300 DPI en format Letter, A4, Carré ou dimensions personnalisées. Que vous vendiez des packs de puzzles visuels sur Etsy, compiliez des cahiers de puzzles pour Amazon KDP ou créiez des activités de pensée critique pour Gumroad, ce générateur produit des puzzles prêts pour la production en quelques minutes — essai gratuit avec toutes les fonctionnalités, sans inscription, sans carte bancaire. Les téléchargements incluent un filigrane ; achetez une licence pour le supprimer.',
  },

  howItWorks: {
    title: 'Comment Créer des Puzzles Pièces Manquantes en 5 Étapes',
    steps: [
      {
        title: 'Définissez Votre Mise en Page',
        description:
          'Ouvrez le panneau Mise en Page et choisissez un format de page : Letter Portrait, Letter Paysage, A4 Portrait, A4 Paysage, Carré (1200×1200) ou toute dimension personnalisée. Sélectionnez une couleur de page avec le sélecteur de couleur comme fond de secours. Choisissez un thème de fond et ajustez son opacité (0–1 par pas de 0,05), puis sélectionnez un thème de bordure avec son propre contrôle d\'opacité indépendant. Ces choix de mise en page encadrent votre puzzle de pièces manquantes avant de configurer le contenu.',
      },
      {
        title: 'Configurez le Puzzle',
        description:
          'Ouvrez le panneau Configuration du Puzzle et définissez le nombre de pièces manquantes de 1 à 5 — cela contrôle combien de trous sont découpés dans l\'image. Définissez le nombre d\'options de réponse de 2 à 6, incluant les pièces correctes plus les pièces distractrices qui augmentent la difficulté. Sélectionnez une forme de pièce parmi 6 options : carré (par défaut), cercle, rectangle portrait, rectangle paysage, ellipse portrait ou ellipse paysage. Chaque forme crée un défi visuel différent.',
      },
      {
        title: 'Sélectionnez une Image de la Bibliothèque ou Importez la Vôtre',
        description:
          'Ouvrez le panneau Bibliothèque d\'Images et parcourez 104 collections thématiques avec plus de 3 100 illustrations colorées — animaux, nourriture, véhicules, nature, fêtes et des dizaines d\'autres. Filtrez par thème avec le menu déroulant ou recherchez par mot-clé avec un délai de 300 ms. Cliquez sur une image pour la sélectionner comme source de votre puzzle. Vous pouvez aussi importer vos propres images PNG, JPG ou GIF via le panneau d\'Import d\'Images Personnalisées pour une liberté créative totale dans vos designs de puzzles.',
      },
      {
        title: 'Générez le Puzzle',
        description:
          'L\'application découpe automatiquement des trous dans l\'image sélectionnée grâce à l\'extraction intelligente de pièces. L\'algorithme effectue jusqu\'à 150 tentatives de placement pour trouver des pièces avec une variance de couleur suffisante (variance de luminosité minimale de 15) et au moins 250 pixels de distance entre les pièces pour éviter le chevauchement. Des trous blancs avec un contour noir (2px) apparaissent aux emplacements d\'origine. Les options de réponse numérotées — pièces correctes plus distractrices — sont affichées avec des étiquettes numériques surlignées en jaune. Les mises en page portrait placent l\'image du puzzle en haut avec les options en dessous ; les mises en page paysage divisent la vue 50/50.',
      },
      {
        title: 'Générez le Corrigé et Téléchargez',
        description:
          'Passez à l\'onglet Corrigé pour voir le corrigé auto-généré. La même image de puzzle apparaît avec les trous, et des étiquettes numériques surlignées en jaune (rgba(255,255,0,0.7)) à l\'intérieur de chaque trou montrent l\'index de la bonne option. Téléchargez les deux versions avec quatre boutons dédiés : Fiche JPEG, Corrigé JPEG, Fiche PDF et Corrigé PDF — le tout rendu à 300 DPI avec une qualité JPEG de 1.0. Activez le mode niveaux de gris pour des versions économiques en encre. Chaque export est prêt pour la production pour des annonces Etsy, des intérieurs Amazon KDP et des fichiers produits Gumroad.',
      },
    ],
  },

  keyFeatures: {
    title: 'Fonctionnalités Clés du Générateur de Puzzles Pièces Manquantes',
    features: [
      {
        title: 'Puzzles Pièces Manquantes Style Puzzle avec Difficulté Configurable',
        description:
          'Créez des puzzles où une image a des trous découpés et les utilisateurs identifient quelle option numérotée remplit chaque espace. Configurez la difficulté avec deux contrôles indépendants : définissez 1 à 5 pièces manquantes pour contrôler la complexité du puzzle, et définissez 2 à 6 options de réponse pour contrôler combien de choix les utilisateurs évaluent. Plus de pièces manquantes signifie plus de raisonnement spatial ; plus d\'options de réponse (incluant des distractrices) signifie une discrimination visuelle plus fine. Ce système de difficulté à deux axes vous permet de créer des puzzles allant de l\'identification simple d\'une seule pièce à des défis complexes multi-pièces.',
      },
      {
        title: 'Six Formes de Pièces : Carré, Cercle, Rectangle et Variantes Ellipse',
        description:
          'Choisissez parmi 6 formes de pièces distinctes qui changent le caractère visuel de chaque puzzle. Les formes carré (par défaut) et cercle offrent des découpes géométriques nettes. Les formes rectangle portrait et rectangle paysage créent des trous allongés avec des orientations différentes — portrait utilise 80 % de largeur et 100 % de hauteur, paysage utilise 100 % de largeur et 80 % de hauteur. Les formes ellipse portrait et ellipse paysage offrent des découpes courbes plus douces avec les mêmes proportions dimensionnelles. Chaque forme interagit différemment avec l\'image source, créant des défis d\'identification uniques même avec la même illustration sous-jacente.',
      },
      {
        title: 'Extraction Intelligente de Pièces avec Détection de Variance de Couleur',
        description:
          'L\'algorithme d\'extraction de pièces garantit que chaque puzzle est visuellement résolvable et engageant. Il effectue jusqu\'à 150 tentatives de placement pour trouver des pièces avec un seuil de variance de luminosité minimum de 15 — garantissant que chaque pièce extraite contient suffisamment de détails visuels pour être identifiable. Les pièces maintiennent au moins 250 pixels de distance entre elles pour éviter le chevauchement. Les pièces distractrices sont générées avec jusqu\'à 200 tentatives chacune, garantissant qu\'elles proviennent de zones non chevauchantes de l\'image. Cette extraction intelligente produit des puzzles de haute qualité de manière constante à partir de n\'importe quelle image source.',
      },
      {
        title: 'Corrigé Auto-Généré avec Étiquettes Numériques Surlignées en Jaune',
        description:
          'Chaque puzzle de pièces manquantes génère automatiquement un corrigé compagnon sur un onglet de canevas séparé. Le corrigé affiche la même image de puzzle avec les trous, et place des étiquettes numériques surlignées en jaune (rgba(255,255,0,0.7)) à l\'intérieur de chaque trou montrant l\'index correct de l\'option (base 1). La taille de police s\'adapte à 60 % de la taille de la pièce pour une lisibilité claire. Aucune création manuelle de corrigé nécessaire — le corrigé reste parfaitement synchronisé avec le puzzle. Téléchargez le corrigé en answer_key.jpeg ou answer_key.pdf à côté de la fiche utilisateur.',
      },
      {
        title: 'Options de Réponse Numérotées avec Pièces Distractrices',
        description:
          'Les options de réponse sont affichées dans des conteneurs numérotés (1–N) avec des étiquettes numériques surlignées en jaune pour une identification claire. Lorsque les options de réponse dépassent le nombre de pièces manquantes, les options supplémentaires sont des pièces distractrices — extraites de zones différentes de la même image qui ne correspondent à aucun trou. Les distractrices obligent les utilisateurs à comparer soigneusement les détails visuels plutôt que de simplement trouver la réponse par élimination. Les fiches portrait disposent les options en une seule rangée horizontale sous le puzzle (75 % de la taille maximale) ; les fiches paysage les placent sur le côté droit (50 % de largeur) en rangée horizontale.',
      },
      {
        title: 'Bibliothèque d\'Images avec 104 Collections Thématiques et Plus de 3 100 Illustrations',
        description:
          'Parcourez 104 collections d\'images thématiques couvrant animaux, nourriture, véhicules, nature, professions, fêtes, sports, saisons et des dizaines d\'autres. Chaque thème fournit des illustrations colorées qui fonctionnent comme sources de puzzles — les images avec des couleurs variées et des régions distinctes produisent les puzzles de pièces manquantes les plus engageants. Filtrez par thème avec le menu déroulant ou recherchez des images spécifiques par mot-clé. La Licence Commerciale inclut 10 thèmes colorés pour démarrer ; l\'Accès Complet déverrouille les 104 thèmes pour une variété créative maximale dans tous vos designs de puzzles.',
      },
      {
        title: 'Export PDF et JPEG Prêt à Imprimer à 300 DPI avec Mode Niveaux de Gris',
        description:
          'Téléchargez des puzzles de pièces manquantes et des corrigés en images JPEG haute résolution ou en documents PDF prêts à imprimer rendus à 300 DPI (multiplicateur 6×) avec une qualité JPEG de 1.0. Quatre boutons de téléchargement dédiés exportent les fichiers de fiche et de corrigé séparément. Les formats de page incluent Letter Portrait, Letter Paysage, A4 Portrait, A4 Paysage, Carré (1200×1200) et des dimensions entièrement personnalisées. Activez le mode niveaux de gris pour des versions économiques en encre qui préservent le toner. Chaque export est prêt pour la production pour des téléchargements numériques, des cahiers imprimés et des fiches de classe.',
      },
      {
        title: 'Édition Complète du Canevas avec Outils Texte, Alignement et Contrôles de Calques',
        description:
          'Le canevas Fabric.js offre un contrôle complet sur chaque élément de votre fiche de puzzle. Glissez, redimensionnez, pivotez et repositionnez les images, le texte et le contenu généré librement. Les contrôles de calques gèrent l\'ordre d\'empilement — amenez des éléments vers l\'avant ou envoyez-les vers l\'arrière. Verrouillez les éléments finalisés pendant que vous en modifiez d\'autres. Ajoutez du texte personnalisé avec sept options de police (Lexend Deca, Baloo 2, Nunito, Quicksand, Fredoka, Arial, Verdana), taille et couleur ajustables, et largeur de contour de texte de 0 à 10 avec une granularité de 0,5. Six options d\'alignement plus centrage sur la page gardent les mises en page précises. Zoom de 25 % à 300 % par incréments de 25 % pour le travail de détail. Annuler et rétablir jusqu\'à 50 états d\'historique avec Ctrl+Z et Ctrl+Y.',
      },
    ],
  },

  businessUseCases: {
    title: 'Comment Vendre des Puzzles Pièces Manquantes en Ligne',
    cases: [
      {
        title: 'Packs de Puzzles Pièces Manquantes Thématiques sur Etsy',
        description:
          'Créez des packs de puzzles thématiques en utilisant les 104 collections d\'images — puzzles d\'animaux, de véhicules, de nourriture, de nature et des dizaines d\'autres. Chaque thème fournit des illustrations colorées qui produisent des défis engageants de pièces manquantes. Compilez 15 à 25 puzzles par thème avec les corrigés inclus, en variant la difficulté de 1 pièce manquante avec 2 options (facile) à 5 pièces manquantes avec 6 options (difficile). Mélangez les formes de pièces au sein d\'un pack pour la variété visuelle : des pièces carrées dans certains puzzles, des pièces rondes dans d\'autres, des variantes ellipse pour les défis avancés. Le corrigé auto-généré élimine le plus gros travail chronophage de la production de puzzles.',
        platform: 'Etsy (etsy.com)',
      },
      {
        title: 'Cahiers de Puzzles Visuels sur Amazon KDP',
        description:
          'Compilez 50 à 100 puzzles de pièces manquantes en un cahier imprimé formaté pour Amazon KDP. Structurez votre livre avec une difficulté progressive : le Chapitre 1 utilise 1 pièce manquante avec 2 options pour les débutants, le Chapitre 2 utilise 3 pièces manquantes avec 4 options pour le niveau intermédiaire, et le Chapitre 3 utilise 5 pièces manquantes avec 6 options incluant des distractrices pour les niveaux avancés. Incluez les corrigés à la fin du livre grâce à la fonctionnalité de corrigé auto-généré. Le mode niveaux de gris produit des pages économiques en encre prêtes pour les intérieurs noir et blanc. Les puzzles purement visuels ne nécessitent aucune traduction, rendant un seul livre vendable dans chaque marché.',
        platform: 'Amazon KDP (kdp.amazon.com)',
      },
      {
        title: 'Activités de Puzzles pour la vente sur Gumroad',
        description:
          'Concevez des activités de discrimination visuelle et de pensée critique prêtes à l\'emploi pour Gumroad. Les puzzles de pièces manquantes renforcent le raisonnement spatial, l\'analyse visuelle et l\'attention aux détails — des compétences valorisées dans les programmes de la petite enfance et du primaire. Créez des ensembles alignés sur le programme : puzzles d\'habitats d\'animaux, puzzles de scènes saisonnières, puzzles de métiers de la communauté et puzzles de groupes alimentaires. Chaque ensemble comprend des fiches utilisateurs et des corrigés aux formats PDF et JPEG. La difficulté configurable vous permet de créer des versions différenciées du même puzzle pour des classes à niveaux mixtes.',
        platform: 'Gumroad (teacherspayteachers.com)',
      },
      {
        title: 'Collections de Puzzles Saisonniers et de Fêtes',
        description:
          'Les 104 collections d\'images thématiques couvrent chaque occasion saisonnière et de fêtes — Noël, Halloween, Pâques, Saint-Valentin, rentrée des classes, vacances d\'été et plus encore. Créez des collections de puzzles à durée limitée qui s\'alignent sur les périodes de forte demande. Lancez des packs de puzzles Halloween en septembre, des collections de Noël en octobre et des packs de Saint-Valentin en janvier. Variez les formes de pièces et les niveaux de difficulté au sein de chaque collection saisonnière pour une valeur maximale. Les produits saisonniers obtiennent des prix plus élevés pendant leurs périodes de pointe et créent des raisons naturelles d\'achats répétés de votre base clientèle.',
        platform: 'Etsy / Amazon KDP / Gumroad (saisonnier)',
      },
      {
        title: 'Marché Mondial — Les Puzzles Purement Visuels ne Nécessitent Aucune Traduction',
        description:
          'Les puzzles Pièces Manquantes sont purement visuels sans contenu textuel sur la fiche elle-même — aucun mot, aucune lettre, aucun élément dépendant de la locale. Un puzzle créé en français fonctionne identiquement pour les clients en Allemagne, en Espagne, au Japon ou au Brésil. Cela rend vos produits de puzzles instantanément vendables sur chaque marketplace international sans créer de versions linguistiques séparées. Listez le même pack de puzzles sur Etsy avec des titres et descriptions multilingues pour capter le trafic de recherche mondial. Un seul produit, chaque marché — portée maximale sans aucun travail de production supplémentaire.',
        platform: 'Marchés mondiaux (toutes plateformes)',
      },
    ],
  },

  faq: [
    {
      question: 'Comment fonctionne le mécanisme du puzzle pièces manquantes ?',
      answer:
        'Le générateur prend une image de la bibliothèque (ou votre import) et découpe 1 à 5 pièces, laissant des trous blancs avec des contours noirs aux emplacements d\'origine. Il affiche ensuite 2 à 6 options de réponse numérotées en dessous ou à côté du puzzle — les pièces correctes plus des pièces distractrices extraites d\'autres zones de la même image. Les utilisateurs examinent les trous et les options numérotées, puis identifient quelle option remplit chaque espace en se basant sur la couleur, le motif et les détails visuels.',
    },
    {
      question: 'Quelles sont les 6 formes de pièces disponibles ?',
      answer:
        'Vous pouvez choisir parmi carré (par défaut), cercle, rectangle portrait (80 % de largeur, 100 % de hauteur), rectangle paysage (100 % de largeur, 80 % de hauteur), ellipse portrait (80 % rx, 100 % ry) et ellipse paysage (100 % rx, 80 % ry). Chaque forme crée un défi visuel différent. Le carré et le cercle offrent des découpes géométriques nettes, tandis que les variantes rectangle et ellipse créent des formes allongées ou courbes qui interagissent différemment avec l\'image source.',
    },
    {
      question: 'Comment fonctionnent les réglages de difficulté ?',
      answer:
        'La difficulté est contrôlée par deux paramètres indépendants. Le nombre de pièces manquantes (1–5) détermine combien de trous sont découpés dans l\'image — plus de pièces signifie plus de raisonnement spatial. Le nombre d\'options de réponse (2–6) détermine combien de choix numérotés les utilisateurs évaluent — quand les options dépassent les pièces manquantes, les supplémentaires sont des distractrices qui nécessitent une comparaison visuelle attentive. Un puzzle avec 1 pièce manquante et 2 options est facile ; 5 pièces manquantes avec 6 options est stimulant.',
    },
    {
      question: 'Que sont les pièces distractrices et comment sont-elles générées ?',
      answer:
        'Les pièces distractrices sont des options de réponse supplémentaires qui ne correspondent à aucun trou du puzzle. Elles sont extraites de zones différentes de la même image source avec jusqu\'à 200 tentatives de placement chacune, garantissant qu\'elles ne chevauchent pas les pièces correctes. Les distractrices empêchent les utilisateurs de résoudre par simple élimination — ils doivent comparer soigneusement les couleurs, motifs et détails visuels pour distinguer les options correctes des alternatives d\'apparence similaire.',
    },
    {
      question: 'Comment fonctionne l\'algorithme d\'extraction intelligente de pièces ?',
      answer:
        'L\'algorithme utilise jusqu\'à 150 tentatives pour trouver des pièces avec suffisamment de détails visuels. Chaque pièce candidate est analysée pour la variance de luminosité (seuil minimum de 15) afin de garantir qu\'elle contient suffisamment d\'informations de couleur pour être identifiable. Les pièces maintiennent au moins 250 pixels de distance entre elles pour éviter le chevauchement. La taille des pièces est calculée à 12 % de la largeur de l\'image avec un minimum de 50 pixels. Ce processus automatisé garantit que chaque puzzle est visuellement résolvable quelle que soit l\'image source.',
    },
    {
      question: 'Comment fonctionne le corrigé auto-généré ?',
      answer:
        'Le générateur utilise un système à double canevas avec un onglet Fiche et un onglet Corrigé. Le corrigé affiche la même image de puzzle avec les trous mais omet les options de réponse. À la place, des étiquettes numériques surlignées en jaune (rgba(255,255,0,0.7)) sont placées à l\'intérieur de chaque trou montrant l\'index correct de l\'option (base 1). La taille de police s\'adapte à 60 % de la taille de la pièce pour une lisibilité claire. Téléchargez le corrigé séparément avec les boutons dédiés Corrigé JPEG et Corrigé PDF.',
    },
    {
      question: 'Les puzzles pièces manquantes sont-ils sensibles à la langue ?',
      answer:
        'Non. Pièces Manquantes est un format de puzzle purement visuel sans contenu textuel sur la fiche elle-même — aucun mot, aucune lettre, aucun élément dépendant de la locale. Le seul élément dépendant de la langue est le texte d\'en-tête auto-généré (\" Pièces Manquantes \" / \" Trouve et place les pièces manquantes ! \"), qui est localisé dans les 11 langues prises en charge. Le puzzle lui-même fonctionne identiquement dans chaque langue, ce qui le rend idéal pour les marchés mondiaux.',
    },
    {
      question: 'Comment fonctionne le système à double bordure ?',
      answer:
        'Chaque puzzle généré comporte deux bordures décoratives. La bordure extérieure utilise du bleu sarcelle vif (#14B8A6) avec un trait de 8px, des marges de 34px et un rayon de bordure de 12px. La bordure intérieure utilise du rose vif (#EC4899) avec un trait de 3px, des marges de 46,5px, un rayon de bordure de 8px et un léger décalage de 2px à droite et 3px vers le bas. Ensemble, elles créent un cadre soigné et professionnel qui augmente la qualité visuelle de vos fiches de puzzles pour les annonces marketplace.',
    },
    {
      question: 'Y a-t-il un essai gratuit ?',
      answer:
        'Oui. Vous pouvez accéder à chaque fonctionnalité — les 6 formes de pièces, les pièces manquantes et options de réponse configurables, le corrigé auto-généré, la bibliothèque d\'images complète, les thèmes de fond et de bordure et tous les formats de téléchargement — sans créer de compte, entrer de carte bancaire ou installer de logiciel. Les téléchargements de l\'essai gratuit incluent un petit filigrane. Une licence commerciale supprime le filigrane et accorde les droits de vente complets.',
    },
    {
      question: 'Puis-je ajouter des thèmes de fond et de bordure aux puzzles ?',
      answer:
        'Oui. Le panneau Mise en Page comprend un sélecteur de thème de fond avec un curseur d\'opacité (0–1 par pas de 0,05) et un sélecteur de thème de bordure avec son propre curseur d\'opacité indépendant. Les thèmes de fond ajoutent des motifs décoratifs derrière le contenu du puzzle, tandis que les thèmes de bordure encadrent la page. Les deux ont des contrôles d\'opacité séparés pour que vous puissiez créer des fonds subtils avec des bordures proéminentes, ou toute combinaison qui correspond à votre design.',
    },
    {
      question: 'Puis-je vendre des puzzles pièces manquantes créés avec cet outil sur Etsy et Amazon KDP ?',
      answer:
        'Oui. Avec une licence commerciale, vous avez les droits complets pour vendre vos puzzles de pièces manquantes en téléchargements numériques sur Etsy, en cahiers imprimés sur Amazon KDP, en ressources de classe sur Gumroad ou via tout autre canal de vente. Les 6 formes de pièces, la difficulté configurable, les corrigés auto-générés et les 104 collections d\'images thématiques vous donnent les outils créatifs pour produire des produits de puzzles originaux et vendables.',
    },
    {
      question: 'Quelle est la politique de remboursement ?',
      answer:
        'Comme l\'essai gratuit vous donne accès à chaque fonctionnalité, nous n\'offrons pas de remboursement sur les achats de licence commerciale. Vous pouvez tester les 6 formes de pièces, les réglages de difficulté configurables, le corrigé auto-généré, la bibliothèque d\'images complète, les thèmes de fond et de bordure et tous les formats de téléchargement avant d\'acheter. L\'essai gratuit est la politique de remboursement — assurez-vous que l\'outil correspond à vos besoins avant d\'acheter une licence.',
    },
    {
      question: 'Ce jeu de pièces manquantes est-il adapté à la maternelle et au CP ?',
      answer:
        'Oui. L\'observation visuelle et le raisonnement logique se développent dès la grande section (GS). Des puzzles simples conviennent à la GS, des puzzles plus complexes au CP et CE1. Au Québec, cela correspond au préscolaire et à la 1re année.',
    },
  ],

  internalLinks: [
    {
      pageType: 'app',
      slug: 'intrus-fiches',
      anchorText: 'Générateur de Fiches Intrus',
    },
    {
      pageType: 'app',
      slug: 'sudoku-enfants-fiches',
      anchorText: 'Générateur de Fiches Sudoku pour Enfants',
    },
    {
      pageType: 'app',
      slug: 'parcours-images-fiches',
      anchorText: 'Générateur de Fiches Parcours d\'Images',
    },
    {
      pageType: 'app',
      slug: 'cherche-et-compte-fiches',
      anchorText: 'Générateur de Fiches Cherche et Compte',
    },
    {
      pageType: 'app',
      slug: 'discrimination-visuelle-fiches',
      anchorText: 'Générateur de Fiches Discrimination Visuelle',
    },
    {
      pageType: 'app',
      slug: 'mots-caches-fiches',
      anchorText: 'Générateur de Fiches Mots Cachés',
    },
    {
      pageType: 'bundle',
      slug: 'pack-puzzles-logique',
      anchorText: 'Pack Puzzles et Logique — Toutes les Applications Puzzle en Un Seul Package',
    },
    {
      pageType: 'guide',
      slug: 'creer-puzzles-pieces-manquantes',
      anchorText: 'Comment Créer et Vendre des Puzzles en Ligne',
    },
    {
      pageType: 'idea',
      slug: 'cp-idees-imprimables',
      anchorText: 'Idées d\'imprimables pour le CP',
    },
    {
      pageType: 'idea',
      slug: 'ce1-idees-imprimables',
      anchorText: 'Idées d\'imprimables pour le CE1',
    },
    {
      pageType: 'start',
      slug: 'livres-activites-amazon-kdp',
      anchorText: 'Publier des livres d\'activités sur Amazon KDP',
    },
  ],

  visuals: {
    heroImages: {
      primary: '/samples/french/missing pieces/Pièces Manquantes 1.webp',
      primaryAlt: 'Fiche de puzzle pièces manquantes avec des trous découpés dans une image et des options de réponse numérotées incluant des distractrices',
    },
    sampleGallery: [
      {
        src: '/samples/french/missing pieces/Pièces Manquantes 1.webp',
        alt: 'Puzzle de pièces manquantes avec des trous carrés découpés dans une illustration colorée',
        caption: 'Forme de pièce carrée — découpes géométriques nettes pour une identification visuelle claire',
      },
      {
        src: '/samples/french/missing pieces/Pièces Manquantes 2.webp',
        alt: 'Puzzle de pièces manquantes avec des trous et des options de réponse numérotées',
        caption: 'Forme de pièce alternative — avec des options distractrices pour un défi supplémentaire',
      },
      {
        src: '/samples/french/missing pieces/Pièces Manquantes 1 answer_key.webp',
        alt: 'Corrigé du puzzle pièces manquantes avec des numéros surlignés en jaune dans chaque trou',
        caption: 'Corrigé auto-généré — les étiquettes jaunes montrent la bonne option pour chaque trou',
      },
    ],
    youtubeId: 'gb-xE_Ay4fc',
    videoTitle: 'Comment Créer des Puzzles Pièces Manquantes avec 6 Formes et Corrigés Auto — Tutoriel Étape par Étape',
  },
};

export default content;
