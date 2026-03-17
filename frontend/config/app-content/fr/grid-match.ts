import type { AppContent } from '../types';

const content: AppContent = {
  seo: {
    primaryKeyword: 'générateur de puzzles grille',
    secondaryKeywords: [
      'générateur de puzzles grille imprimables pour vendeurs Etsy',
      'créateur de puzzles de correspondance par tuiles pour éditeurs Amazon KDP',
      'générateur de puzzles grille avec licence commerciale',
      'vendre des puzzles grille d\'images sur Teachers Pay Teachers',
    ],
    lsiKeywords: [
      'produits numériques de puzzles grille pour entrepreneurs',
      'générateur de puzzles de tuiles d\'images à usage commercial',
      'activités de perception visuelle imprimables pour entreprise en ligne',
    ],
    titleTag: 'Générateur de Puzzles Grille | Créer et Vendre',
    metaDescription:
      'Créez des puzzles grille à vendre sur Etsy, KDP et TPT. Taille configurable, cases-indices ajustables, corrigé auto, 104 thèmes. Essai gratuit avec filigrane.',
  },

  hero: {
    title: 'Générateur de Puzzles Grille pour des Activités de Correspondance par Tuiles d\'Images',
    tagline: 'Transformez n\'importe quelle image en puzzle à base de grille — divisez-la en tuiles, révélez des cases-indices configurables, mélangez les tuiles restantes dans une palette numérotée, et générez automatiquement un corrigé avec des cercles numérotés superposés à travers 104 collections d\'images thématiques.',
    description:
      'Concevez des puzzles grille professionnels où une image unique est divisée en une grille de tuiles et les élèves associent les tuiles numérotées à leurs positions correctes. Configurez la grille de 2×2 à 4×4 (2–4 lignes × 2–4 colonnes) et définissez 1–5 cases-indices qui restent visibles comme indices — moins d\'indices signifie un puzzle plus difficile. L\'application mélange les tuiles restantes à l\'aide de l\'algorithme Fisher-Yates et les affiche dans une palette numérotée à côté ou en dessous de la grille. Les élèves étudient les cases-indices révélées, examinent les tuiles numérotées et écrivent quel numéro correspond à chaque cellule vide. Le système à double canevas génère à la fois un onglet fiche de travail et un onglet corrigé — le corrigé affiche l\'image complète avec des cercles numérotés superposés sur chaque cellule montrant le placement correct des tuiles, vous n\'avez donc jamais à créer de corrigé manuellement. Le Puzzle Grille n\'est PAS sensible à la langue : le résultat du puzzle est purement visuel, sans contenu textuel localisé sur la fiche elle-même. L\'Accès Complet déverrouille les 104 thèmes avec plus de 3 100 illustrations et les 11 langues d\'interface. Ajoutez des thèmes de fond et de bordure avec des contrôles d\'opacité indépendants, insérez du texte personnalisé avec sept options de police, et exportez des PDF et JPEG prêts à imprimer à 300 DPI en format Letter, A4 ou dimensions personnalisées. Que vous vendiez des packs de puzzles d\'images sur Etsy, compiliez des cahiers de perception visuelle pour Amazon KDP ou créiez des activités de puzzles rapides de fin de cours pour TPT, ce générateur produit des puzzles grille prêts pour la production en quelques minutes — essai gratuit avec toutes les fonctionnalités, sans inscription, sans carte bancaire. Les téléchargements incluent un filigrane ; achetez une licence pour le supprimer.',
  },

  howItWorks: {
    title: 'Comment Créer des Puzzles Grille en 5 Étapes',
    steps: [
      {
        title: 'Définissez la Mise en Page',
        description:
          'Ouvrez le panneau Mise en Page et choisissez un format de page : Letter Portrait, Letter Paysage, A4 Portrait, A4 Paysage, ou toute dimension personnalisée. Sélectionnez une couleur de fond par défaut à l\'aide du sélecteur de couleur. Choisissez un thème de fond et ajustez son opacité (de 0 à 1 par pas de 0,05), puis choisissez un thème de bordure avec son propre contrôle d\'opacité indépendant. Ces choix de mise en page encadrent votre puzzle grille avant de configurer le contenu. Note : le format Carré n\'est pas disponible pour le Puzzle Grille.',
      },
      {
        title: 'Configurez la Grille',
        description:
          'Ouvrez le panneau Options de la Grille et définissez le nombre de lignes (2–4, par défaut 3) et de colonnes (2–4, par défaut 3) pour votre grille de puzzle. Puis définissez le nombre de cases-indices (1–5, par défaut 1) — ce sont les tuiles qui restent visibles sur la fiche comme indices pour les élèves. Une grille 3×3 avec 1 indice crée un puzzle stimulant avec 8 tuiles à associer, tandis qu\'une grille 2×2 avec 3 indices crée un exercice facile avec seulement 1 tuile à placer. Cette difficulté configurable facilite la création d\'ensembles de puzzles progressifs.',
      },
      {
        title: 'Sélectionnez une Image',
        description:
          'Ouvrez le panneau Bibliothèque d\'Images et parcourez 104 collections thématiques avec plus de 3 100 illustrations colorées — animaux, nourriture, véhicules, nature, fêtes et bien d\'autres. Filtrez par thème via le menu déroulant ou recherchez par mot-clé. Cliquez sur une image pour la sélectionner pour votre puzzle. L\'aperçu de l\'image sélectionnée affiche votre choix avant la génération. Vous pouvez également télécharger des images personnalisées PNG, JPG ou GIF via le panneau Télécharger des Images Personnalisées pour créer des puzzles grille à partir de vos propres photos ou illustrations.',
      },
      {
        title: 'Générez la Fiche de Puzzle Grille',
        description:
          'Cliquez sur Générer pour créer le puzzle grille. L\'application divise l\'image sélectionnée dans la grille configurée, révèle les cases-indices avec les tuiles d\'image réelles visibles, et marque les cellules restantes avec des indicateurs « ? ». Toutes les tuiles sont mélangées à l\'aide de l\'algorithme Fisher-Yates et affichées comme palette numérotée. Les mises en page portrait placent la grille en haut avec la palette en dessous ; les mises en page paysage positionnent la grille à gauche avec la palette à droite. Un en-tête stylisé apparaît avec un fond cyan (#00BCD4), un titre violet profond (#6A1B9A) et un cadre orange (#FF8C42) affichant « Puzzle Grille » et les instructions dans la langue sélectionnée.',
      },
      {
        title: 'Générez le Corrigé et Téléchargez',
        description:
          'Passez à l\'onglet Corrigé pour voir le corrigé généré automatiquement. Il affiche l\'image complète, non découpée, avec des cercles numérotés superposés sur chaque cellule de la grille — cercles à fond jaune (#ffffe0) avec contour noir montrant quel numéro de palette correspond à chaque position. Téléchargez les deux versions à l\'aide des quatre boutons dédiés : JPEG Fiche de Travail, JPEG Corrigé, PDF Fiche de Travail et PDF Corrigé à 300 DPI. Activez le mode niveaux de gris pour des versions économiques en encre. Chaque export est prêt pour la production pour les annonces Etsy, les intérieurs Amazon KDP et les fichiers de produits TPT.',
      },
    ],
  },

  keyFeatures: {
    title: 'Caractéristiques Clés du Générateur de Puzzles Grille',
    features: [
      {
        title: 'Puzzle Grille à Image Unique avec Lignes et Colonnes Configurables (2–4 × 2–4)',
        description:
          'Chaque puzzle commence avec une seule image divisée en une grille de tuiles. Définissez 2–4 lignes et 2–4 colonnes de manière indépendante, créant des grilles de 2×2 (4 tuiles) jusqu\'à 4×4 (16 tuiles). La grille par défaut 3×3 produit 9 tuiles — un niveau de difficulté équilibré pour la plupart des âges. Les grilles plus petites conviennent bien aux puzzles d\'introduction et aux jeunes apprenants, tandis que les grilles plus grandes défient les élèves plus âgés et créent des produits de puzzles premium. Contrairement aux fiches d\'association multi-images, le puzzle grille teste le raisonnement spatial et l\'analyse visuelle d\'une seule image complète.',
      },
      {
        title: 'Nombre de Cases-Indices Ajustable pour une Difficulté Modulable (1–5 Cellules Révélées)',
        description:
          'Contrôlez la difficulté du puzzle en définissant 1–5 cases-indices qui restent visibles sur la fiche comme indices. Avec une grille 3×3 et 1 indice, les élèves doivent associer 8 tuiles mélangées — un vrai défi. Avec 5 indices sur la même grille, seulement 4 tuiles doivent être associées — un exercice d\'échauffement accessible. Ce simple curseur transforme la même image en puzzles allant de facile à avancé, vous permettant de créer des ensembles progressifs à partir d\'une seule image et d\'une seule configuration de grille. La valeur par défaut est 1 case-indice pour un défi maximal.',
      },
      {
        title: 'Palette de Tuiles Numérotées Mélangées avec Algorithme Fisher-Yates',
        description:
          'Les tuiles masquées sont mélangées à l\'aide de l\'algorithme Fisher-Yates et affichées dans une palette numérotée à côté de la grille. Chaque tuile reçoit un numéro unique que les élèves utilisent comme référence pour écrire leurs réponses. L\'algorithme garantit que chaque puzzle généré a un ordre de tuiles différent, même en utilisant la même image et les mêmes paramètres de grille. Cela signifie que vous pouvez produire plusieurs fiches de puzzles uniques à partir d\'une seule image simplement en régénérant — précieux pour créer des packs variés sans avoir besoin d\'images sources différentes.',
      },
      {
        title: 'Corrigé Généré Automatiquement avec Cercles Numérotés sur l\'Image Complète',
        description:
          'Chaque puzzle grille génère automatiquement un corrigé compagnon sur un onglet de canevas séparé. Le corrigé affiche l\'image complète, non découpée, avec des cercles numérotés superposés sur chaque cellule — cercles à fond jaune (#ffffe0) avec contour noir et texte en police Fredoka. Chaque numéro correspond à l\'ordre mélangé de la palette de la fiche de travail, montrant aux élèves et enseignants exactement quelle tuile va où. Pas de création manuelle de corrigé, pas de fichier séparé — le corrigé reste parfaitement synchronisé avec la fiche.',
      },
      {
        title: 'Bibliothèque d\'Images avec 104 Collections Thématiques et Plus de 3 100 Illustrations',
        description:
          'Parcourez 104 collections d\'images thématiques couvrant animaux, nourriture, véhicules, nature, professions, fêtes, sports, saisons et bien d\'autres. Chaque thème fournit des illustrations colorées qui fonctionnent parfaitement comme images sources de puzzles grille. Filtrez par thème via le menu déroulant ou recherchez des images spécifiques par mot-clé. Cliquez sur n\'importe quelle image pour la sélectionner comme source de puzzle. La Licence Commerciale inclut 10 thèmes colorés pour démarrer ; l\'Accès Complet déverrouille les 104 thèmes pour une variété créative maximale dans tous vos produits de puzzles grille.',
      },
      {
        title: 'Mise en Page Adaptative Portrait et Paysage avec Repositionnement Automatique',
        description:
          'Le générateur adapte automatiquement sa mise en page en fonction de l\'orientation de la page. Les pages portrait (hauteur > largeur) placent la grille en haut utilisant 45 % de la hauteur disponible avec la palette numérotée en dessous, plus un en-tête pleine largeur (100 px de hauteur, rayon de 15 px). Les pages paysage (largeur > hauteur) positionnent la grille sur la moitié gauche (48 % de la largeur disponible) avec la palette à droite, utilisant un en-tête compact (70 px de hauteur, rayon de 35 px). Ce repositionnement automatique garantit que les puzzles grille sont équilibrés et professionnels dans les deux orientations sans ajustement manuel.',
      },
      {
        title: 'Export PDF et JPEG Prêt à Imprimer à 300 DPI avec Mode Niveaux de Gris',
        description:
          'Téléchargez les puzzles grille et les corrigés sous forme d\'images JPEG haute résolution ou de documents PDF prêts à imprimer rendus à 300 DPI (multiplicateur 6×, qualité JPEG 1.0). Quatre boutons de téléchargement dédiés exportent les fichiers de fiche de travail et de corrigé séparément. Les formats de page incluent Letter Portrait, Letter Paysage, A4 Portrait, A4 Paysage et des dimensions entièrement personnalisées. L\'orientation PDF est détectée automatiquement. Activez le mode niveaux de gris pour des versions économiques en encre qui préservent la structure de la grille. Chaque export est prêt pour la production pour les téléchargements numériques, les cahiers imprimés et les supports de classe.',
      },
      {
        title: 'Édition Complète du Canevas avec Outils Texte, Alignement et Contrôles de Calques',
        description:
          'Le canevas Fabric.js offre un contrôle complet sur chaque élément de votre puzzle grille. Glissez, redimensionnez, faites pivoter et repositionnez librement les images, le texte et le contenu généré. Les contrôles de calques gèrent l\'ordre d\'empilement — amenez des éléments vers l\'avant ou envoyez-les vers l\'arrière. Verrouillez les éléments terminés pendant que vous en modifiez d\'autres. Ajoutez du texte personnalisé avec sept options de police (Lexend Deca, Baloo 2, Nunito, Quicksand, Fredoka, Arial, Verdana), taille et couleur ajustables, et largeur de contour du texte de 0 à 10 par pas de 0,5. Six options d\'alignement plus centrage sur la page maintiennent des mises en page précises. Zoom de 25 % à 300 % pour le travail de détail. Annuler et rétablir jusqu\'à 20 états d\'historique avec Ctrl+Z et Ctrl+Y.',
      },
    ],
  },

  businessUseCases: {
    title: 'Comment Vendre des Puzzles Grille en Ligne',
    cases: [
      {
        title: 'Packs de Puzzles Grille Thématiques sur Etsy',
        description:
          'Créez des packs de puzzles grille thématiques en utilisant les 104 collections d\'images — puzzles grille d\'animaux, puzzles grille de véhicules, puzzles d\'images de fêtes et bien d\'autres. Chaque thème fournit suffisamment d\'illustrations pour 20–30 fiches de puzzles uniques avec des tailles de grille et des nombres d\'indices variés. Regroupez 15–25 puzzles grille par thème avec les corrigés inclus, et vendez entre 3 € et 7 € par pack. Incluez un mélange de puzzles faciles (2×2 avec 3 indices), moyens (3×3 avec 2 indices) et difficiles (4×4 avec 1 indice) dans chaque pack pour un attrait large. Le corrigé généré automatiquement avec les cercles numérotés élimine la partie la plus chronophage de la création de puzzles.',
        platform: 'Etsy (etsy.fr)',
      },
      {
        title: 'Cahiers de Puzzles d\'Images sur Amazon KDP',
        description:
          'Compilez 50–100 puzzles grille dans un cahier imprimé formaté pour Amazon KDP. Structurez votre livre par difficulté progressive : le Chapitre 1 utilise des grilles 2×2 avec 3 indices pour les débutants, le Chapitre 2 utilise des grilles 3×3 avec 2 indices pour le niveau intermédiaire, et le Chapitre 3 utilise des grilles 4×4 avec 1 indice pour les niveaux avancés. Incluez les corrigés à la fin du livre à l\'aide des cercles numérotés générés automatiquement. Le mode niveaux de gris produit des pages économiques en encre prêtes pour les intérieurs de livres en noir et blanc. Les cahiers de puzzles de perception visuelle se vendent bien dans la catégorie cahiers d\'activités toute l\'année.',
        platform: 'Amazon KDP (kdp.amazon.com)',
      },
      {
        title: 'Activités de Puzzles pour la Classe sur TPT',
        description:
          'Concevez des activités de puzzles grille prêtes à l\'emploi pour les fins de cours, le travail du matin ou les ateliers d\'enrichissement. Les enseignants qui cherchent sur TPT des activités de perception visuelle apprécient les puzzles qui arrivent prêts à imprimer avec corrigés. Créez des ensembles liés au programme : puzzles d\'images d\'animaux pour les sciences, puzzles de monuments pour les études sociales, puzzles d\'aliments pour la nutrition. La difficulté configurable vous permet de différencier au sein d\'un même produit — incluez des versions faciles, moyennes et difficiles des mêmes puzzles thématiques pour que les enseignants puissent adapter selon le niveau de l\'élève.',
        platform: 'Teachers Pay Teachers (teacherspayteachers.com)',
      },
      {
        title: 'Collections de Puzzles Grille Saisonnières',
        description:
          'Les 104 collections d\'images thématiques couvrent chaque occasion saisonnière et de fête — Noël, Halloween, Pâques, Saint-Valentin, rentrée scolaire, vacances d\'été et bien plus. Créez des collections de puzzles grille à durée limitée alignées sur les périodes de pointe d\'achat. Lancez des packs de puzzles Halloween en septembre, des collections de Noël en octobre et des packs de Saint-Valentin en janvier. Incluez plusieurs tailles de grille et niveaux de difficulté dans chaque ensemble saisonnier pour une valeur maximale. Les produits saisonniers peuvent être vendus à des prix plus élevés pendant leurs périodes de pointe et créent des raisons naturelles pour des achats répétés.',
        platform: 'Etsy / Amazon KDP / TPT (saisonnier)',
      },
      {
        title: 'Puzzles Grille Photo Personnalisés pour des Produits Sur Mesure',
        description:
          'Utilisez la fonctionnalité Télécharger des Images Personnalisées pour créer des puzzles grille à partir de n\'importe quelle photo ou illustration. Les puzzles à base de photos de famille constituent des cadeaux personnalisés uniques. Les enseignants peuvent télécharger des photos de classe pour des activités de fin d\'année. Les puzzles photo d\'animaux de compagnie, de vacances et d\'équipe créent tous des produits uniques en leur genre. Proposez la création de puzzles grille personnalisés comme service premium sur Etsy où les clients soumettent leurs photos et vous livrez des fiches de puzzles imprimées avec corrigés — un produit personnalisé à forte marge avec un temps de production minimal.',
        platform: 'Etsy (produits personnalisés)',
      },
    ],
  },

  faq: [
    {
      question: 'Quelles tailles de grille sont disponibles pour les puzzles grille ?',
      answer:
        'Le générateur prend en charge 2–4 lignes et 2–4 colonnes, configurées de manière indépendante. Cela crée des grilles de 2×2 (4 tuiles) à 4×4 (16 tuiles). La valeur par défaut est 3×3 (9 tuiles). Les grilles plus petites sont plus faciles et conviennent bien aux jeunes apprenants ; les grilles plus grandes augmentent la difficulté et la complexité visuelle. Vous pouvez définir des lignes et des colonnes à des valeurs différentes — par exemple, 2 lignes × 4 colonnes crée un puzzle rectangulaire large.',
    },
    {
      question: 'Comment les cases-indices contrôlent-elles la difficulté du puzzle ?',
      answer:
        'Les cases-indices sont des positions de la grille où la tuile d\'image reste visible comme indice. Définissez 1–5 cases-indices à l\'aide du curseur dans le panneau Options de la Grille (la valeur par défaut est 1). Plus d\'indices rendent le puzzle plus facile car les élèves disposent de plus de points de référence. Pour une grille 3×3 avec 1 indice, les élèves doivent associer 8 tuiles — assez difficile. Avec 5 indices, seulement 4 tuiles doivent être associées — beaucoup plus accessible. Ce simple contrôle vous permet de créer des ensembles de difficulté progressive à partir de la même image.',
    },
    {
      question: 'Comment fonctionne le puzzle grille pour les élèves ?',
      answer:
        'La fiche de travail affiche une grille où certaines cellules montrent la tuile d\'image réelle (cases-indices) et les cellules restantes affichent des indicateurs « ? ». En dessous ou à côté de la grille, une palette numérotée affiche toutes les tuiles masquées dans un ordre mélangé. Les élèves examinent les cases-indices, étudient les tuiles numérotées et déterminent quel numéro correspond à chaque position vide de la grille. L\'exercice nécessite un raisonnement spatial — associer le contenu de la tuile à son emplacement correct dans l\'image globale.',
    },
    {
      question: 'Comment fonctionne le corrigé généré automatiquement ?',
      answer:
        'Le générateur utilise un système à double canevas avec un onglet Fiche de Travail et un onglet Corrigé. Le corrigé affiche l\'image complète, non découpée, avec des cercles numérotés superposés sur chaque cellule de la grille. Chaque cercle a un fond jaune (#ffffe0) avec un contour noir et affiche le numéro de palette qui correspond à cette position. Les numéros correspondent à l\'ordre mélangé des tuiles de la fiche de travail, rendant la vérification des réponses simple. Les deux versions s\'exportent séparément à l\'aide des quatre boutons de téléchargement dédiés.',
    },
    {
      question: 'Puis-je utiliser mes propres images pour les puzzles grille ?',
      answer:
        'Oui. Le panneau Télécharger des Images Personnalisées vous permet de télécharger des fichiers PNG, JPG ou GIF depuis votre ordinateur. Les images téléchargées apparaissent dans une galerie sous la zone de téléchargement. Cliquez sur n\'importe quelle image téléchargée pour la sélectionner comme source de puzzle. Cette fonctionnalité est idéale pour créer des puzzles personnalisés à partir de photos, d\'illustrations personnalisées ou d\'images de marque. Vous pouvez utiliser les images téléchargées en parallèle avec la bibliothèque intégrée — basculez entre elles librement.',
    },
    {
      question: 'Comment la mise en page s\'adapte-t-elle aux orientations portrait et paysage ?',
      answer:
        'Le générateur détecte automatiquement l\'orientation de votre page et repositionne les éléments en conséquence. Les pages portrait placent la grille en haut (utilisant 45 % de la hauteur disponible) avec la palette numérotée en dessous et un en-tête pleine largeur. Les pages paysage positionnent la grille sur la moitié gauche (48 % de la largeur disponible) avec la palette à droite et un en-tête compact. Cela garantit que les puzzles grille sont équilibrés et professionnels dans les deux orientations sans ajustement manuel de la mise en page.',
    },
    {
      question: 'Puis-je générer plusieurs puzzles uniques à partir de la même image ?',
      answer:
        'Oui. Chaque fois que vous cliquez sur Générer, l\'application mélange les tuiles à l\'aide de l\'algorithme Fisher-Yates, produisant un ordre de tuiles numérotées différent. Les positions des cases-indices changent également entre les générations. Cela signifie que vous pouvez créer plusieurs fiches de puzzles distinctes à partir d\'une seule image sans modifier aucun paramètre — chacune aura des numéros de tuiles et des positions d\'indices différents, en faisant des expériences de puzzles uniques.',
    },
    {
      question: 'Comment fonctionne la difficulté progressive selon les tailles de grille et les indices ?',
      answer:
        'La difficulté dépend de deux facteurs : le nombre total de tuiles (taille de la grille) et les indices visibles. Une grille 2×2 avec 3 indices ne laisse qu\'1 tuile à associer — le puzzle le plus facile possible. Une grille 4×4 avec 1 indice nécessite d\'associer 15 tuiles — la configuration la plus difficile. Entre ces extrêmes, vous pouvez créer n\'importe quel niveau de difficulté. Pour des cahiers progressifs, commencez avec des grilles 2×2 (3 indices), progressez vers des grilles 3×3 (2 indices) et terminez avec des grilles 4×4 (1 indice) pour une courbe de difficulté naturelle.',
    },
    {
      question: 'Y a-t-il un essai gratuit ?',
      answer:
        'Oui. Vous pouvez accéder à toutes les fonctionnalités — toutes les tailles de grille, les cases-indices ajustables, le corrigé généré automatiquement avec cercles numérotés, la bibliothèque d\'images complète, les thèmes de fond et de bordure, le téléchargement d\'images personnalisées, les outils texte et tous les formats de téléchargement — sans créer de compte, saisir de carte bancaire ni installer de logiciel. Les téléchargements de l\'essai gratuit incluent un petit filigrane. Une licence commerciale supprime le filigrane et accorde les droits de vente complets.',
    },
    {
      question: 'Le Générateur de Puzzles Grille est-il sensible à la langue ?',
      answer:
        'Non. Le Puzzle Grille est purement visuel — le résultat du puzzle ne contient que des tuiles d\'images et des numéros, sans contenu textuel localisé sur la fiche elle-même. L\'interface de l\'application (menus, boutons, texte d\'en-tête) prend en charge les 11 langues, mais le puzzle généré fonctionne de manière identique quel que soit le choix de la langue. Cela rend les puzzles grille universellement vendables sur tous les marchés sans traduction. La Licence Commerciale inclut 10 thèmes colorés ; l\'Accès Complet déverrouille les 104 thèmes et les 11 langues d\'interface.',
    },
    {
      question: 'Puis-je vendre des puzzles grille créés avec cet outil sur Etsy et Amazon KDP ?',
      answer:
        'Oui. Avec une licence commerciale, vous avez tous les droits pour vendre vos puzzles grille sous forme de téléchargements numériques sur Etsy, de cahiers imprimés sur Amazon KDP, de ressources pour la classe sur TPT, ou par tout autre canal de vente. Les tailles de grille configurables, les cases-indices ajustables, les corrigés générés automatiquement et les 104 collections d\'images thématiques vous donnent les outils créatifs pour produire des produits de puzzles grille originaux et vendables.',
    },
    {
      question: 'Quelle est la politique de remboursement ?',
      answer:
        'Comme l\'essai gratuit vous donne accès à toutes les fonctionnalités, nous n\'offrons pas de remboursement sur les achats de licence commerciale. Vous pouvez tester toutes les tailles de grille, les configurations de cases-indices, le corrigé généré automatiquement avec les cercles numérotés, la bibliothèque d\'images complète, les thèmes de fond et de bordure, le téléchargement d\'images personnalisées, les outils texte et tous les formats de téléchargement avant d\'acheter. L\'essai gratuit est la politique de remboursement — assurez-vous que l\'outil correspond à vos besoins avant d\'acheter une licence.',
    },
  ],

  internalLinks: [
    {
      pageType: 'app',
      slug: 'association-fiches',
      anchorText: 'Générateur de Fiches d\'Association',
    },
    {
      pageType: 'app',
      slug: 'discrimination-visuelle-fiches',
      anchorText: 'Générateur de Fiches de Discrimination Visuelle',
    },
    {
      pageType: 'app',
      slug: 'bingo-images-fiches',
      anchorText: 'Générateur de Fiches de Bingo d\'Images',
    },
    {
      pageType: 'app',
      slug: 'tri-images-fiches',
      anchorText: 'Générateur de Fiches de Tri d\'Images',
    },
    {
      pageType: 'app',
      slug: 'pieces-manquantes-fiches',
      anchorText: 'Générateur de Fiches de Pièces Manquantes',
    },
    {
      pageType: 'app',
      slug: 'cherche-objets-fiches',
      anchorText: 'Générateur de Fiches Cherche et Trouve',
    },
    {
      pageType: 'bundle',
      slug: 'pack-association-tri',
      anchorText: 'Pack Association et Tri — Toutes les Applications d\'Association en Un Seul Package',
    },
    {
      pageType: 'tool',
      slug: 'generateur-puzzle-grille',
      anchorText: 'Créateur de Puzzles Grille',
    },
    {
      pageType: 'start',
      slug: 'guide-complet-activite-imprimables',
      anchorText: 'Le Guide Complet pour Lancer une Activité d\'Imprimables',
    },
    {
      pageType: 'idea',
      slug: 'animaux-ferme-idees-imprimables',
      anchorText: 'Idées d\'Imprimables sur les Animaux de la Ferme',
    },
  ],

  visuals: {
    heroImages: {
      primary: '/samples/french/grid match/Puzzle Grille 1.webp',
      primaryAlt: 'Fiche de puzzle grille avec tuiles d\'images divisées en grille, cases-indices révélées et palette de tuiles numérotées pour la correspondance',
    },
    sampleGallery: [
      {
        src: '/samples/french/grid match/Puzzle Grille 1.webp',
        alt: 'Puzzle grille 3×3 avec une case-indice et huit tuiles numérotées dans la palette',
        caption: 'Puzzle grille 3×3 — une case-indice révélée, huit tuiles à associer depuis la palette numérotée',
      },
      {
        src: '/samples/french/grid match/Puzzle Grille 5.webp',
        alt: 'Puzzle grille 4×4 avancé avec seize tuiles et indices minimaux',
        caption: 'Puzzle 4×4 avancé — taille de grille maximale pour des activités de perception visuelle stimulantes',
      },
      {
        src: '/samples/french/grid match/Puzzle Grille 1 answer_key.webp',
        alt: 'Corrigé du puzzle grille montrant l\'image complète avec des cercles numérotés superposés sur chaque cellule',
        caption: 'Corrigé généré automatiquement — les cercles numérotés montrent le placement correct des tuiles sur l\'image complète',
      },
    ],
    youtubeId: 'RGtED1Bnut8',
    videoTitle: 'Comment Créer des Puzzles Grille avec Difficulté Configurable — Tutoriel Étape par Étape',
  },
};

export default content;
