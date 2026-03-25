import type { AppContent } from '../types';

const content: AppContent = {
  seo: {
    primaryKeyword: 'générateur chasse au trésor',
    secondaryKeywords: [
      'créer des fiches chasse au trésor à vendre sur Etsy',
      'générateur de puzzles directionnels pour éditeurs Amazon KDP',
      'fiches chasse au trésor grille de coordonnées licence commerciale',
      'vendre des fiches chasse au trésor sur Gumroad',
    ],
    lsiKeywords: [
      'produits numériques chasse au trésor imprimables pour entrepreneurs',
      'générateur de puzzles directionnels à usage commercial',
      'fiches recherche de chemin imprimables avec corrigé automatique',
    ],
    titleTag: 'Générateur Chasse au Trésor | Créer & Vendre',
    metaDescription:
      'Créez des fiches chasse au trésor pour Etsy, KDP et Gumroad. Grille 5×5, deux types de directions, corrigé auto, 104 thèmes. Essai gratuit avec filigrane.',
  },

  hero: {
    title: 'Générateur de Fiches Chasse au Trésor pour Puzzles Directionnels de Recherche de Chemin',
    tagline: 'Générez des puzzles directionnels de recherche de chemin sur une grille de coordonnées 5×5 — deux vocabulaires de direction (Mode Simple : haut/bas/gauche/droite et Mode Cardinal : nord/sud/est/ouest), indices directionnels entièrement localisés dans 11 langues, corrigé auto-généré avec emplacement du trésor surligné, et en-têtes thématiques chasse au trésor sur 104 collections d\'images.',
    description:
      'Créez des fiches professionnelles de chasse au trésor où les utilisateurs suivent des indices de déplacement séquentiels pour localiser un trésor caché sur une grille de coordonnées 5×5 à lettres et chiffres (lignes A–E, colonnes 1–5). Chaque puzzle disperse 6 images thématiques dans la grille comme repères visuels, puis génère une position de départ et exactement 4 déplacements directionnels menant à la case du trésor. Choisissez entre deux vocabulaires de direction : le Mode Simple utilise haut, bas, gauche et droite pour les jeunes apprenants, tandis que le Mode Cardinal utilise nord, sud, est et ouest pour un raisonnement spatial plus avancé. Le Générateur de Chasse au Trésor est sensible à la langue : changer de langue modifie à la fois le texte des instructions directionnelles et le contenu des images, toutes les directions étant entièrement traduites dans les 11 langues prises en charge. Chaque puzzle inclut un en-tête localisé auto-généré avec un fond bleu-vert (#2C8C7C), un titre doré (#D4A017) en police Fredoka et une description sable en police Quicksand — affichant « Chasse au Trésor » et « Suis les indices et trouve le trésor ! » dans la langue sélectionnée. Le système à double canevas génère à la fois un onglet fiche et un onglet corrigé — le corrigé met en surbrillance la case finale du trésor en jaune pâle pour que vous n\'ayez jamais à la marquer manuellement. L\'Accès Complet déverrouille les 104 thèmes avec plus de 3 100 illustrations et les 11 langues pour les directions et images localisées. Ajoutez des thèmes de fond et des thèmes de bordure avec des contrôles d\'opacité indépendants, et exportez des PDF prêts à imprimer et des JPEG à 300 DPI en format Letter, A4, Carré (1200×1200) ou dimensions personnalisées. Que vous vendiez des packs de chasse au trésor sur Etsy, compiliez des cahiers de compétences directionnelles pour Amazon KDP ou créiez des activités de grille de coordonnées pour Gumroad, ce générateur produit des puzzles professionnels en quelques minutes — essai gratuit avec toutes les fonctionnalités, sans inscription, sans carte bancaire. Les téléchargements incluent un filigrane ; achetez une licence pour le supprimer.',
  },

  howItWorks: {
    title: 'Comment Créer des Fiches Chasse au Trésor en 5 Étapes',
    steps: [
      {
        title: 'Définir la mise en page',
        description:
          'Ouvrez le panneau Mise en Page et choisissez un format de page : Letter Portrait, Letter Paysage, A4 Portrait, A4 Paysage, Carré (1200×1200) ou toute dimension personnalisée. Sélectionnez une couleur de fond avec le sélecteur de couleurs, puis choisissez un thème de fond et ajustez son opacité (0–1 par pas de 0,05). Choisissez un thème de bordure avec son propre contrôle d\'opacité indépendant. Ces choix de mise en page encadrent votre puzzle de chasse au trésor avant de configurer le contenu.',
      },
      {
        title: 'Choisir le type de direction',
        description:
          'Dans le panneau Configuration du Puzzle, basculez entre deux vocabulaires de direction. Le Mode Simple utilise haut, bas, gauche et droite — idéal pour les utilisateurs de maternelle et CP qui développent leur vocabulaire spatial fondamental. Le Mode Cardinal utilise nord, sud, est et ouest — adapté au CE1 et au-delà, introduisant les directions de la boussole et les compétences de lecture de carte. Les deux ensembles de directions sont entièrement traduits dans les 11 langues prises en charge, donc changer le sélecteur de langue met à jour le texte des indices directionnels sur la fiche.',
      },
      {
        title: 'Sélectionner les images pour la grille',
        description:
          'Choisissez comment remplir la grille 5×5 avec 6 images thématiques. Générer par Thème (par défaut) sélectionne automatiquement 6 images aléatoires du thème choisi et les disperse dans la grille. La Sélection Manuelle d\'Images vous permet de parcourir 104 collections thématiques avec plus de 3 100 illustrations colorées — animaux, nourriture, véhicules, nature, fêtes et des dizaines d\'autres — et de cliquer pour sélectionner exactement 6 images. Importer des Images Personnalisées vous permet d\'ajouter vos propres fichiers JPEG, PNG, GIF ou WebP aux côtés du contenu de la bibliothèque.',
      },
      {
        title: 'Générer le puzzle de chasse au trésor',
        description:
          'Cliquez sur Générer pour créer le puzzle de recherche de chemin sur la grille de coordonnées 5×5 (lignes A–E, colonnes 1–5). Le générateur disperse vos 6 images sélectionnées dans la grille, choisit une case de départ aléatoire et crée exactement 4 déplacements directionnels restant dans les limites de la grille. La fiche affiche 5 lignes d\'instructions : « Commence à [case] » suivi de 4 indices « Déplace-toi [direction] [nombre] case(s) », terminant par « Où est le trésor ? » Un en-tête thématique apparaît en haut avec un fond bleu-vert (#2C8C7C), un titre doré (#D4A017) et un texte localisé en polices Fredoka et Quicksand.',
      },
      {
        title: 'Voir le corrigé et télécharger',
        description:
          'Passez à l\'onglet Corrigé pour voir la solution avec la case finale du trésor mise en surbrillance en jaune pâle (rgba(255, 250, 205, 0.8)) et un contour gris foncé. Téléchargez les deux versions avec les quatre boutons dédiés du menu déroulant : Fiche JPEG, Corrigé JPEG, Fiche PDF et Corrigé PDF. Les fichiers s\'exportent à 300 DPI pour une qualité prête à imprimer. Activez le mode niveaux de gris pour des versions économiques en encre. Chaque export est prêt pour la production — listages Etsy, intérieurs Amazon KDP et fichiers produits Gumroad.',
      },
    ],
  },

  keyFeatures: {
    title: 'Fonctionnalités Clés du Générateur de Fiches Chasse au Trésor',
    features: [
      {
        title: 'Puzzles de chasse au trésor avec recherche de chemin sur une grille de coordonnées 5×5',
        description:
          'Générez des puzzles directionnels sur une grille fixe 5×5 étiquetée avec des lignes lettres (A–E) et des colonnes chiffres (1–5). Chaque puzzle disperse 6 images thématiques dans les 25 cases comme repères visuels, puis génère une position de départ aléatoire et exactement 4 déplacements séquentiels qui naviguent dans la grille jusqu\'à une destination trésor. Le format cohérent à 5 instructions — position de départ, 4 déplacements et une question « Où est le trésor ? » — crée un défi structuré de recherche de chemin qui développe le raisonnement spatial et la maîtrise des coordonnées. Tous les déplacements restent dans les limites de la grille pour des puzzles valides et résolubles à chaque fois.',
      },
      {
        title: 'Deux types de direction : Simple (haut/bas/gauche/droite) et Cardinal (nord/sud/est/ouest)',
        description:
          'Basculez entre deux vocabulaires de direction pour correspondre à votre public cible. Le Mode Simple utilise haut, bas, gauche et droite — des mots directionnels familiers pour les jeunes apprenants développant leur vocabulaire spatial. Le Mode Cardinal introduit nord, sud, est et ouest pour la pratique des directions de la boussole et la préparation à la lecture de carte. Les deux vocabulaires produisent la même structure de puzzle à 4 déplacements sur la même grille 5×5, vous permettant de créer des ensembles de difficulté progressive : commencez avec des fiches en directions simples et progressez vers des fiches en directions cardinales avec des thèmes et images identiques.',
      },
      {
        title: 'Corrigé auto-généré avec emplacement du trésor surligné',
        description:
          'Chaque puzzle de chasse au trésor génère automatiquement un corrigé compagnon sur un onglet canevas séparé. Le corrigé reproduit la disposition exacte du puzzle et met en surbrillance la case finale du trésor en jaune pâle (rgba(255, 250, 205, 0.8)) avec un contour gris foncé, rendant la destination immédiatement visible. Aucun marquage manuel, aucune création de fichier séparé — le corrigé reste parfaitement synchronisé avec le puzzle. Cette approche à double canevas fait gagner un temps de production considérable aux vendeurs qui créent des packs de chasse au trésor où chaque fiche nécessite son propre corrigé.',
      },
      {
        title: 'Indices directionnels entièrement localisés dans 11 langues',
        description:
          'Tout le texte des instructions directionnelles est entièrement traduit dans les 11 langues prises en charge : anglais, allemand, français, espagnol, portugais, italien, néerlandais, suédois, danois, norvégien et finnois. Les directions simples (haut/bas/gauche/droite) et les directions cardinales (nord/sud/est/ouest) sont toutes localisées, ainsi que l\'instruction « Commence à », le verbe « Déplace-toi », l\'unité « case(s) » et la question « Où est le trésor ? ». Changer le sélecteur de langue met à jour l\'ensemble du texte de la fiche, produisant des puzzles directionnels authentiques en langue maternelle plutôt qu\'un contenu uniquement en anglais avec des titres traduits.',
      },
      {
        title: 'Bibliothèque d\'images avec 104 collections thématiques et plus de 3 100 illustrations',
        description:
          'Parcourez 104 collections d\'images thématiques couvrant les animaux, la nourriture, les véhicules, la nature, les professions, les fêtes, les sports, les saisons et des dizaines d\'autres. Chaque thème fournit un ensemble coordonné d\'illustrations colorées qui peuplent la grille 5×5 comme repères visuels. Filtrez par thème avec le menu déroulant ou recherchez des images spécifiques par mot-clé. Cliquez sur une image pour l\'ajouter à votre puzzle. La Licence Commerciale inclut 10 thèmes colorés pour démarrer ; l\'Accès Complet déverrouille les 104 thèmes pour une variété créative maximale dans tous vos puzzles de chasse au trésor.',
      },
      {
        title: 'En-tête thématique auto-généré avec titre doré dans 11 langues',
        description:
          'Chaque fiche générée inclut un en-tête thématique chasse au trésor avec un fond bleu-vert (#2C8C7C), une bordure extérieure ambre (#D4A574), une bordure intérieure beige sable (#F4E4C1) et un titre doré (#D4A017) rendu en police Fredoka (graisse 700, dimensionnement adaptatif 36–48 px). Le texte descriptif apparaît en brun foncé (#5C4033) en police Quicksand (graisse 500). Les fiches en portrait affichent un en-tête complet (100 px de hauteur) ; les fiches en paysage utilisent une disposition compacte (70 px de hauteur). Le titre « Chasse au Trésor » et la description « Suis les indices et trouve le trésor ! » se traduisent automatiquement dans les 11 langues prises en charge.',
      },
      {
        title: 'Export PDF et JPEG prêt à imprimer à 300 DPI avec mode niveaux de gris',
        description:
          'Téléchargez vos puzzles de chasse au trésor et corrigés en images JPEG haute résolution ou en documents PDF prêts à imprimer rendus à 300 DPI (multiplicateur JPEG 6×, multiplicateur PDF 3×). Quatre boutons de téléchargement dédiés dans le menu déroulant exportent séparément worksheet.jpeg, answer_key.jpeg, worksheet.pdf et answer_key.pdf. Les formats incluent Letter Portrait, Letter Paysage, A4 Portrait, A4 Paysage, Carré (1200×1200) et dimensions entièrement personnalisées. Activez le mode niveaux de gris pour des versions économiques en encre. Chaque export est prêt pour la production — téléchargements numériques, cahiers imprimés et documents pour la vente.',
      },
    ],
  },

  businessUseCases: {
    title: 'Comment Vendre des Fiches Chasse au Trésor en Ligne',
    cases: [
      {
        title: 'Packs thématiques de chasse au trésor sur Etsy',
        description:
          'Créez des packs de chasse au trésor thématiques avec les 104 collections d\'images — chasse au trésor animaux, chasse au trésor océan, chasse au trésor espace, chasse au trésor fêtes et des dizaines d\'autres. Chaque thème fournit assez d\'illustrations pour plusieurs puzzles uniques puisque le générateur sélectionne aléatoirement 6 images et crée des positions de départ et des séquences de déplacement uniques par génération. Proposez 10–20 fiches de chasse au trésor par thème avec corrigés inclus, et vendez à 3 €–7 € par pack. Combinez les directions simples et cardinales dans un même pack pour une difficulté progressive.',
        platform: 'Etsy (etsy.fr)',
      },
      {
        title: 'Cahiers de compétences directionnelles sur Amazon KDP',
        description:
          'Compilez 40–80 fiches de chasse au trésor dans un cahier imprimé au format Amazon KDP. Structurez les chapitres par progression : le Chapitre 1 utilise les directions simples (haut/bas/gauche/droite) pour le vocabulaire spatial fondamental, le Chapitre 2 introduit les directions cardinales (nord/sud/est/ouest) pour la préparation à la lecture de boussole. Organisez les thèmes entre les sections — animaux, véhicules, nature, fêtes — avec les corrigés à la fin. Le mode niveaux de gris produit des pages économiques en encre prêtes pour les intérieurs en noir et blanc. Les cahiers de puzzles directionnels de recherche de chemin occupent un créneau unique sur le marché des cahiers d\'activités.',
        platform: 'Amazon KDP (kdp.amazon.com)',
      },
      {
        title: 'Ensembles de chasse au trésor multilingues avec directions localisées',
        description:
          'Exploitez les indices directionnels entièrement localisés pour créer des fiches de chasse au trésor dans 11 langues. La même structure de puzzle produit un contenu authentique en langue maternelle quand vous changez de langue — directions, instructions et étiquettes d\'images se mettent toutes à jour automatiquement. Créez des packs multilingues de chasse au trésor où chaque version linguistique utilise les mêmes images thématiques mais un texte directionnel localisé. C\'est idéal pour les classes FLE vendeur le vocabulaire directionnel, les familles bilingues et les programmes d\'instruction en famille internationaux. Vendez des packs par langue ou des méga-packs multilingues à des prix premium.',
        platform: 'Etsy / Gumroad (marché multilingue)',
      },
      {
        title: 'Packs d\'activités grille de coordonnées pour Gumroad',
        description:
          'Construisez des ensembles d\'activités de grille de coordonnées prêts à l\'emploi qui enseignent le raisonnement spatial et les compétences cartographiques. La grille 5×5 à lettres et chiffres (lignes A–E, colonnes 1–5) initie les utilisateurs aux systèmes de coordonnées utilisés en géographie, mathématiques et sciences. Les vendeurs recherchant des activités de grille de coordonnées sur Gumroad apprécient les fiches avec des grilles visuelles claires, des instructions séquentielles et des corrigés imprimés. Créez des ensembles alignés sur le programme : associez des chasses au trésor en directions simples avec des versions en directions cardinales pour une pédagogie différenciée. Chaque ensemble inclut les fiches utilisateurs et les corrigés en PDF et JPEG.',
        platform: 'Gumroad (teacherspayteachers.com)',
      },
      {
        title: 'Collections saisonnières de chasse au trésor',
        description:
          'Les 104 collections d\'images thématiques couvrent chaque occasion saisonnière et festive — Noël, Halloween, Pâques, Saint-Valentin, rentrée des classes, vacances d\'été et bien d\'autres. Créez des collections de chasse au trésor limitées dans le temps qui correspondent aux pics d\'achats saisonniers. Lancez les packs Halloween en septembre, les collections Noël en octobre et les packs Saint-Valentin en janvier. Incluez les directions simples et cardinales dans chaque ensemble saisonnier pour une valeur maximale. Les produits saisonniers permettent des prix plus élevés pendant leurs fenêtres de pic et génèrent des raisons naturelles d\'achats récurrents.',
        platform: 'Etsy / Amazon KDP / Gumroad (saisonnier)',
      },
    ],
  },

  faq: [
    {
      question: 'Qu\'est-ce qu\'une fiche chasse au trésor et comment fonctionne le puzzle ?',
      answer:
        'Une fiche chasse au trésor est un puzzle de recherche de chemin sur une grille de coordonnées 5×5 étiquetée avec des lignes lettres (A–E) et des colonnes chiffres (1–5). Six images thématiques sont dispersées dans la grille comme repères visuels. La fiche fournit 5 lignes d\'instructions : une position de départ (par exemple, « Commence à A3 »), exactement 4 déplacements directionnels (par exemple, « Déplace-toi vers le bas de 2 cases ») et une question finale « Où est le trésor ? » Les utilisateurs suivent les indices séquentiels sur la grille pour déterminer quelle case contient le trésor.',
    },
    {
      question: 'Comment fonctionne la grille de coordonnées 5×5 ?',
      answer:
        'La grille se compose de 25 cases disposées en 5 lignes (étiquetées A à E) et 5 colonnes (étiquetées 1 à 5). Chaque case est identifiée par une coordonnée lettre-chiffre comme A1, B3 ou E5. Six images thématiques occupent 6 des 25 cases comme repères visuels. La position de départ et les 4 déplacements restent dans les limites de la grille (lignes A–E, colonnes 1–5), garantissant que chaque puzzle est résoluble. Ce système de coordonnées lettre-chiffre initie les utilisateurs aux compétences de référencement par grille utilisées dans les cartes, les tableaux et les mathématiques.',
    },
    {
      question: 'Quels sont les deux types de direction et en quoi diffèrent-ils ?',
      answer:
        'Le Mode Simple utilise haut, bas, gauche et droite — des mots directionnels familiers pour les utilisateurs de maternelle et CP qui développent leur vocabulaire spatial fondamental. Le Mode Cardinal utilise nord, sud, est et ouest — des directions de boussole adaptées au CE1 et au-delà. Les deux modes génèrent la même structure de puzzle à 4 déplacements sur la même grille 5×5. Le sélecteur de type de direction vous permet de créer une difficulté progressive : commencez avec des fiches en directions simples et progressez vers des fiches en directions cardinales avec des thèmes identiques.',
    },
    {
      question: 'Pourquoi chaque puzzle a-t-il exactement 4 déplacements ?',
      answer:
        'La structure cohérente à 4 déplacements crée un format de puzzle standardisé qui fonctionne de manière fiable sur la grille 5×5. Quatre déplacements offrent assez de complexité pour une recherche de chemin significative sans submerger les jeunes apprenants. Chaque puzzle suit le même format à 5 lignes d\'instructions : position de départ, 4 déplacements séquentiels et la question « Où est le trésor ? ». Cette cohérence rend les fiches de chasse au trésor prévisibles pour les utilisateurs et faciles à regrouper en ensembles d\'activités structurés pour les vendeurs.',
    },
    {
      question: 'Comment les 6 images sont-elles utilisées dans le puzzle ?',
      answer:
        'Six images thématiques sont dispersées dans les 25 cases de la grille 5×5 comme repères visuels. Elles rendent la grille visuellement attrayante et aident les utilisateurs à s\'orienter en suivant les indices directionnels. Vous pouvez remplir la grille avec trois méthodes : Générer par Thème (par défaut) sélectionne automatiquement 6 images aléatoires du thème choisi, la Sélection Manuelle d\'Images vous permet de parcourir la bibliothèque et de cliquer pour choisir exactement 6 images, et Importer des Images Personnalisées vous permet d\'ajouter vos propres fichiers JPEG, PNG, GIF ou WebP.',
    },
    {
      question: 'Le Générateur de Chasse au Trésor est-il sensible à la langue ?',
      answer:
        'Oui. Le Générateur de Chasse au Trésor est sensible à la langue de deux manières. Premièrement, tout le texte des indices directionnels — instructions de départ, directions de déplacement (simples et cardinales), unités de cases et la question du trésor — est entièrement traduit dans la langue sélectionnée dans les 11 langues prises en charge. Deuxièmement, le contenu des images chargé depuis la bibliothèque se met à jour en fonction de la locale sélectionnée. Changer de langue produit des fiches de chasse au trésor authentiques en langue maternelle avec des directions et images localisées. La Licence Commerciale inclut 10 thèmes colorés ; l\'Accès Complet déverrouille les 104 thèmes et les 11 langues.',
    },
    {
      question: 'Comment les indices directionnels sont-ils localisés ?',
      answer:
        'Tout le vocabulaire directionnel est traduit dans 11 langues : anglais, allemand, français, espagnol, portugais, italien, néerlandais, suédois, danois, norvégien et finnois. Les directions simples (haut/bas/gauche/droite) et les directions cardinales (nord/sud/est/ouest) ont toutes des traductions complètes, ainsi que l\'instruction « Commence à », le verbe « Déplace-toi », l\'unité « case(s) » et la question « Où est le trésor ? ». Par exemple, en Mode Simple allemand, « Déplace-toi vers le bas de 2 cases » devient l\'équivalent allemand avec un vocabulaire directionnel natif. Le titre et la description de l\'en-tête se traduisent également automatiquement.',
    },
    {
      question: 'Comment fonctionne le corrigé auto-généré ?',
      answer:
        'Le générateur utilise un système à double canevas avec un onglet Fiche et un onglet Corrigé, chacun avec des piles annuler/rétablir séparées. La fiche affiche la grille 5×5 avec les images dispersées et les indices directionnels — prête à être résolue par les utilisateurs. Le corrigé reproduit la disposition identique et met en surbrillance la case finale du trésor en jaune pâle (rgba(255, 250, 205, 0.8)) avec un contour gris foncé, rendant la destination immédiatement visible. Les deux versions s\'exportent séparément avec quatre boutons de téléchargement dédiés : worksheet.jpeg, answer_key.jpeg, worksheet.pdf et answer_key.pdf.',
    },
    {
      question: 'Y a-t-il un essai gratuit ?',
      answer:
        'Oui. Vous pouvez accéder à toutes les fonctionnalités — les deux types de direction, la grille de coordonnées 5×5, la génération de puzzle à 6 images, le corrigé auto-généré, la bibliothèque d\'images complète, les thèmes de fond et de bordure, tous les formats de téléchargement et le mode niveaux de gris — sans créer de compte, entrer de carte bancaire ni installer de logiciel. Les téléchargements de l\'essai gratuit incluent un petit filigrane. Une licence commerciale supprime le filigrane et accorde les droits de vente complets.',
    },
    {
      question: 'Puis-je ajouter des thèmes de fond et de bordure aux fiches de chasse au trésor ?',
      answer:
        'Oui. Le panneau Mise en Page inclut à la fois un sélecteur de thème de fond avec un curseur d\'opacité (0–1 par pas de 0,05) et un sélecteur de thème de bordure avec son propre curseur d\'opacité indépendant. Les thèmes de fond ajoutent des motifs décoratifs derrière la grille de coordonnées et les instructions directionnelles, tandis que les thèmes de bordure encadrent la page. Les deux ont des contrôles d\'opacité séparés pour que vous puissiez créer des fonds subtils avec des bordures proéminentes, ou toute combinaison adaptée à votre design. Ces éléments visuels augmentent la qualité perçue de vos fiches de chasse au trésor pour les listages sur les plateformes de vente.',
    },
    {
      question: 'Puis-je vendre des fiches chasse au trésor créées avec cet outil sur Etsy et Amazon KDP ?',
      answer:
        'Oui. Avec une licence commerciale, vous avez tous les droits pour vendre vos fiches de chasse au trésor en téléchargement numérique sur Etsy, en cahiers imprimés sur Amazon KDP, en ressources imprimables sur Gumroad ou via tout autre canal de vente. Les deux types de direction, la grille de coordonnées 5×5, les indices directionnels localisés, les corrigés auto-générés et les 104 collections d\'images thématiques vous donnent les outils créatifs pour produire des puzzles de recherche de chemin originaux et vendables.',
    },
    {
      question: 'Quelle est la politique de remboursement ?',
      answer:
        'L\'essai gratuit vous donnant accès à toutes les fonctionnalités, nous n\'offrons pas de remboursement sur les achats de licence commerciale. Vous pouvez tester les deux types de direction, la grille de coordonnées 5×5, la génération de puzzle à 6 images, le corrigé auto-généré, la bibliothèque d\'images complète, les thèmes de fond et de bordure et tous les formats de téléchargement avant d\'acheter. L\'essai gratuit est la politique de remboursement — assurez-vous que l\'outil répond à vos besoins avant d\'acheter une licence.',
    },
  ],

  internalLinks: [
    {
      pageType: 'app',
      slug: 'cherche-et-compte-fiches',
      anchorText: 'Générateur de Fiches Cherche et Compte',
    },
    {
      pageType: 'app',
      slug: 'cherche-objets-fiches',
      anchorText: 'Générateur de Fiches Cherche Objets',
    },
    {
      pageType: 'app',
      slug: 'mots-croises-images-fiches',
      anchorText: 'Générateur de Fiches Mots Croisés en Images',
    },
    {
      pageType: 'app',
      slug: 'parcours-images-fiches',
      anchorText: 'Générateur de Fiches Parcours en Images',
    },
    {
      pageType: 'app',
      slug: 'prepositions-exercices-fiches',
      anchorText: 'Générateur de Fiches Exercices de Prépositions',
    },
    {
      pageType: 'app',
      slug: 'puzzle-maths-fiches',
      anchorText: 'Générateur de Fiches Puzzle Maths',
    },
    {
      pageType: 'bundle',
      slug: 'pack-cherche-trouve',
      anchorText: 'Pack Cherche & Trouve — Toutes les Applications de Recherche en Un',
    },
    {
      pageType: 'guide',
      slug: 'creer-fiches-chasse-au-tresor',
      anchorText: 'Comment Créer des Fiches Chasse au Trésor Qui Se Vendent',
    },
    {
      pageType: 'idea',
      slug: 'camping-idees-imprimables',
      anchorText: 'Idées d\'imprimables camping et plein air',
    },
    {
      pageType: 'idea',
      slug: 'animaux-marins-idees-imprimables',
      anchorText: 'Idées d\'imprimables animaux marins',
    },
    {
      pageType: 'start',
      slug: 'marketing-activite-imprimables',
      anchorText: 'Marketing pour votre activité d\'imprimables',
    },
  ],

  visuals: {
    heroImages: {
      primary: '/samples/french/treasure hunt/Chasse au Trésor 1.webp',
      primaryAlt: 'Fiche chasse au trésor avec grille de coordonnées 5×5, images dispersées, indices directionnels et en-tête thématique Chasse au Trésor',
    },
    sampleGallery: [
      {
        src: '/samples/french/treasure hunt/Chasse au Trésor 1.webp',
        alt: 'Puzzle chasse au trésor avec 6 images thématiques sur une grille 5×5 et indices en directions simples',
        caption: 'Mode Simple — suivez les indices haut, bas, gauche et droite pour trouver le trésor',
      },
      {
        src: '/samples/french/treasure hunt/Chasse au Trésor 2.webp',
        alt: 'Puzzle chasse au trésor avec indices en directions cardinales nord, sud, est et ouest',
        caption: 'Mode Cardinal — directions de la boussole pour un raisonnement spatial avancé',
      },
      {
        src: '/samples/french/treasure hunt/Chasse au Trésor 1 answer_key.webp',
        alt: 'Corrigé chasse au trésor avec la case du trésor mise en surbrillance jaune pâle sur la grille de coordonnées',
        caption: 'Corrigé auto-généré — la surbrillance jaune pâle marque la destination du trésor',
      },
    ],
    youtubeId: 'flHiBXsYLLA',
    videoTitle: 'Comment Créer des Fiches Chasse au Trésor avec Indices Directionnels et Corrigés Automatiques — Tutoriel Étape par Étape',
  },
};

export default content;
