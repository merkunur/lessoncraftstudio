import type { ToolContent } from '../types';

const content: ToolContent = {
  seo: {
    primaryKeyword: 'créateur puzzles grille',
    secondaryKeywords: [
      'créateur de fiches puzzle grille pour vendeurs',
      'créer des puzzles grille d\'images à vendre',
      'générateur de puzzles de tuiles imprimables licence commerciale',
      'créateur de fiches puzzle grille pour KDP et Etsy',
    ],
    lsiKeywords: [
      'outil de puzzle grille à image unique correspondance de tuiles',
      'générateur de corrigé automatique cercles numérotés superposés',
      'créateur de grille avec cases-indices difficulté configurable',
    ],
    titleTag: 'Créateur Puzzles Grille — Générateur Puzzle Grille',
    metaDescription: 'Créez des puzzles grille avec taille configurable, cases-indices ajustables, mélange Fisher-Yates et 104 thèmes d\'images. Essai gratuit — licence disponible.',
  },

  hero: {
    title: 'Créateur de Puzzles Grille',
    tagline: 'Générateur de puzzles grille à image unique avec tailles de grille configurables de 2×2 à 4×4, cases-indices ajustables pour une difficulté modulable, mélange des tuiles par algorithme Fisher-Yates, corrigés auto-générés avec cercles numérotés superposés et 104 collections d\'images thématiques pour des fiches de puzzles grille vendables dans le monde entier',
    description: 'Créez des puzzles grille professionnels où une image unique est divisée en une grille de tuiles et les utilisateurs associent les tuiles numérotées à leurs positions correctes — un puzzle de raisonnement spatial construit à partir d\'une seule image. Configurez la grille de 2×2 à 4×4 (2–4 lignes × 2–4 colonnes, par défaut 3×3) pour créer des puzzles allant de 4 tuiles à 16 tuiles. Définissez 1–5 cases-indices (par défaut 1) qui restent visibles sur la fiche comme indices — moins d\'indices signifie un puzzle plus difficile, plus d\'indices crée des exercices d\'échauffement accessibles. L\'application mélange les tuiles masquées à l\'aide de l\'algorithme Fisher-Yates et les affiche dans une palette numérotée à côté ou en dessous de la grille, chaque génération produisant un ordre de tuiles différent même avec la même image et les mêmes paramètres. Les utilisateurs étudient les cases-indices révélées, examinent les tuiles numérotées dans la palette et écrivent quel numéro correspond à chaque cellule vide. Le système double canevas génère simultanément un onglet fiche de travail et un onglet corrigé — le corrigé affiche l\'image complète non découpée avec des cercles numérotés superposés sur chaque cellule de la grille (fond jaune #ffffe0, contour noir, police Fredoka), montrant exactement quel numéro de palette correspond à chaque position. La mise en page adaptative s\'ajuste automatiquement : les pages portrait placent la grille en haut (45 % de la hauteur) avec la palette en dessous ; les pages paysage positionnent la grille à gauche (48 % de la largeur) avec la palette à droite. Un en-tête stylisé apparaît avec un fond cyan (#00BCD4), un titre violet profond (#6A1B9A) et un cadre orange (#FF8C42) affichant \" Puzzle Grille \" et les instructions dans la langue sélectionnée. Le Puzzle Grille n\'est PAS sensible à la langue — le résultat du puzzle est purement visuel, sans contenu textuel localisé sur la fiche elle-même, rendant chaque fiche universellement vendable sur tous les marchés sans traduction. Parcourez 104 collections thématiques avec plus de 3 100 illustrations ou téléchargez vos propres images PNG, JPG ou GIF pour des puzzles grille personnalisés. Appliquez des thèmes de fond et de bordure avec des curseurs d\'opacité indépendants (0–1, pas de 0,05). Exportez quatre fichiers par session : fiche JPEG, fiche PDF, corrigé JPEG et corrigé PDF — tous à 300 DPI. Choisissez Letter, A4 ou des dimensions personnalisées avec un mode niveaux de gris pour une sortie économique en encre. Éditez tout sur le canevas Fabric.js avec 7 polices, contour de texte 0–10, outils d\'alignement, calques, verrouillage, zoom 25 %–300 % et annuler/rétablir 20 états. L\'essai gratuit inclut toutes les fonctionnalités avec un filigrane sur les téléchargements. Achetez une licence pour supprimer le filigrane et vendre à usage commercial.',
  },

  tutorial: {
    title: 'Comment Créer des Puzzles Grille en 8 Étapes',
    steps: [
      {
        title: 'Ouvrir le Créateur de Puzzles Grille',
        description: 'Cliquez sur \" Essayer maintenant \" pour lancer le générateur de puzzles grille dans votre navigateur. L\'outil s\'ouvre instantanément avec une barre latérale de réglages à gauche et un canevas à double onglet à droite — un onglet pour la fiche de travail, un pour le corrigé. Aucun compte, aucun téléchargement de logiciel, aucune installation requis — commencez à créer des puzzles grille immédiatement.',
      },
      {
        title: 'Configurer la Taille de la Grille',
        description: 'Ouvrez le panneau Options de la Grille et définissez le nombre de lignes (2–4, par défaut 3) et de colonnes (2–4, par défaut 3) de manière indépendante. Une grille 2×2 crée 4 tuiles pour des puzzles d\'introduction simples. Une grille 3×3 produit 9 tuiles pour une difficulté équilibrée. Une grille 4×4 offre 16 tuiles pour des défis avancés de raisonnement spatial. Vous pouvez aussi mixer lignes et colonnes — une grille 2×4 crée un puzzle rectangulaire large avec 8 tuiles, tandis qu\'une grille 4×2 produit une disposition étroite et haute. La taille de la grille détermine directement la complexité du puzzle et la densité visuelle.',
      },
      {
        title: 'Définir le Nombre de Cases-Indices pour la Difficulté',
        description: 'Ajustez le curseur des cases-indices de 1 à 5 (par défaut 1). Les cases-indices sont des positions de la grille où la tuile d\'image réelle reste visible comme indice pour les utilisateurs. Avec une grille 3×3 et 1 indice, les utilisateurs doivent associer 8 tuiles mélangées — un vrai défi. Avec 3 indices sur la même grille, seulement 6 tuiles restent à associer. Avec 5 indices, seulement 4 tuiles restent masquées — un échauffement accessible pour les plus jeunes. Ce simple contrôle transforme la même image en puzzles allant de facile à avancé, vous permettant de créer des ensembles progressifs à partir d\'une seule image.',
      },
      {
        title: 'Sélectionner une Image dans la Bibliothèque ou Télécharger la Vôtre',
        description: 'Ouvrez le panneau Bibliothèque d\'Images et parcourez 104 collections thématiques avec plus de 3 100 illustrations colorées — animaux, nourriture, véhicules, nature, fêtes, métiers et bien d\'autres. Filtrez par thème via le menu déroulant ou recherchez par mot-clé. Cliquez sur une image pour la sélectionner comme source de puzzle. Vous pouvez aussi utiliser le panneau Télécharger des Images Personnalisées pour télécharger vos propres fichiers PNG, JPG ou GIF pour des puzzles grille personnalisés — photos de famille, illustrations personnalisées, images de marque ou contenu spécifique à la classe. L\'aperçu de l\'image sélectionnée affiche votre choix avant la génération.',
      },
      {
        title: 'Définir la Mise en Page et les Décorations',
        description: 'Dans la section Mise en Page, sélectionnez votre format de page : Letter Portrait, Letter Paysage, A4 Portrait, A4 Paysage ou entrez une dimension personnalisée. Le Puzzle Grille ne prend pas en charge le format Carré. Choisissez une couleur de fond de page. Sélectionnez un thème de fond décoratif et un thème de bordure depuis la bibliothèque intégrée, chacun avec un curseur d\'opacité indépendant (0–1, pas de 0,05). Les thèmes de fond et de bordure fonctionnent de manière indépendante, vous pouvez associer un fond à motifs subtil avec une bordure décorative prononcée ou toute combinaison adaptée à votre style de produit.',
      },
      {
        title: 'Générer le Puzzle Grille',
        description: 'Cliquez sur Générer pour créer le puzzle grille. L\'application divise l\'image sélectionnée dans la grille configurée, révèle les cases-indices avec les tuiles d\'image réelles visibles et marque les cellules restantes avec des indicateurs \" ? \". Toutes les tuiles masquées sont mélangées par l\'algorithme Fisher-Yates et affichées comme palette numérotée. La mise en page adaptative s\'ajuste automatiquement : les pages portrait placent la grille en haut avec la palette en dessous, les pages paysage positionnent la grille à gauche avec la palette à droite. Un en-tête stylisé avec fond cyan (#00BCD4), titre violet profond (#6A1B9A) et cadre orange (#FF8C42) affiche \" Puzzle Grille \" et les instructions.',
      },
      {
        title: 'Consulter le Corrigé Auto-Généré',
        description: 'Cliquez sur l\'onglet Corrigé pour voir la solution auto-générée. Le corrigé affiche l\'image complète non découpée avec des cercles numérotés superposés sur chaque cellule de la grille — cercles à fond jaune (#ffffe0) avec contours noirs et numéros en police Fredoka montrant quel numéro de palette correspond à chaque position. Basculez entre les onglets Fiche de Travail et Corrigé pour comparer. Le corrigé est généré simultanément avec la fiche — aucune création manuelle, aucune étape séparée, aucune possibilité de réponses erronées. Ce système double canevas est votre plus grand gain de temps lors de la création de packs de puzzles grille.',
      },
      {
        title: 'Télécharger les Quatre Fichiers',
        description: 'Activez les niveaux de gris pour des versions économiques en encre idéales pour l\'impression en volume et les intérieurs KDP. Téléchargez les quatre fichiers d\'une seule session : fiche JPEG, fiche PDF, corrigé JPEG et corrigé PDF — tous rendus à 300 DPI. Chaque onglet dispose de sa propre paire de boutons de téléchargement. Les fichiers sont prêts pour la production : listings Etsy.fr, intérieurs Amazon KDP et fichiers produits Gumroad sans post-traitement nécessaire. Cliquez sur Générer à nouveau avec la même image pour produire un nouveau puzzle avec un mélange de tuiles différent, ou changez d\'image et de paramètres de grille pour une création rapide de variété à travers les 104 collections thématiques.',
      },
    ],
  },

  whatYouCanCreate: [
    {
      title: 'Lots de Puzzles Grille Thématiques par Niveau de Difficulté',
      description: 'Créez des packs de puzzles grille organisés par thème et difficulté en utilisant les 104 collections d\'images. Chaque thème produit plusieurs niveaux de difficulté à partir d\'un même ensemble d\'images : puzzles faciles (grille 2×2 avec 3 indices, seulement 1 tuile à associer), puzzles moyens (grille 3×3 avec 2 indices, 7 tuiles à associer), et puzzles difficiles (grille 4×4 avec 1 indice, 15 tuiles à associer). Regroupez 15–20 puzzles grille par niveau de difficulté par thème avec les corrigés auto-générés inclus. L\'algorithme Fisher-Yates signifie que chaque génération produit un ordre de tuiles différent, vous pouvez donc créer plusieurs puzzles uniques à partir de la même image simplement en régénérant — pas besoin d\'images sources différentes pour remplir un lot.',
    },
    {
      title: 'Cahiers de Puzzles de Perception Visuelle pour KDP',
      description: 'Compilez 60–80 puzzles grille dans des cahiers imprimés pour Amazon KDP. Structurez les chapitres par difficulté progressive : le Chapitre 1 utilise des grilles 2×2 avec 3 indices pour les débutants apprenant le fonctionnement des puzzles grille, le Chapitre 2 utilise des grilles 3×3 avec 2 indices pour les niveaux intermédiaires, et le Chapitre 3 utilise des grilles 4×4 avec 1 indice pour les défis avancés de raisonnement spatial. Incluez les pages de corrigés à la fin de chaque chapitre montrant l\'image complète avec les cercles numérotés superposés. Activez les niveaux de gris pour une sortie économique en encre parfaite en noir et blanc. Le format purement visuel ne nécessite aucune traduction, un seul intérieur sert toutes les places de marché KDP internationales.',
    },
    {
      title: 'Activités de Puzzles Rapides pour la vente',
      description: 'Construisez des puzzles grille prêts pour la vente pour le travail du matin, les fins de cours rapides et les ateliers d\'enrichissement. Créez des ensembles liés au programme : puzzles d\'images d\'animaux pour les sciences, puzzles de monuments pour la géographie, puzzles d\'aliments pour la nutrition. La difficulté configurable vous permet de différencier au sein d\'un seul produit — incluez des puzzles 2×2 pour les apprenants en difficulté et des puzzles 4×4 pour les utilisateurs avancés, tous du même thème. Chaque puzzle s\'exporte avec son corrigé auto-généré, éliminant le temps de préparation des vendeurs. Le format purement visuel signifie que les puzzles grille fonctionnent pour tout utilisateur quel que soit son niveau de lecture ou sa langue.',
    },
    {
      title: 'Produits de Puzzles Grille à Partir de Photos Personnalisées',
      description: 'Utilisez la fonctionnalité Télécharger des Images Personnalisées pour créer des puzzles grille à partir de n\'importe quelle photo ou illustration. Les puzzles à base de photos de famille font des cadeaux personnalisés uniques. Les vendeurs peuvent télécharger des photos de classe pour des activités de fin d\'année. Les puzzles de photos d\'animaux de compagnie, de souvenirs de vacances, de photos d\'équipe sportive et d\'images de marque deviennent tous des produits uniques en leur genre. La taille de grille et le nombre d\'indices configurables vous permettent d\'ajuster la difficulté pour tout public — puzzles simples 2×2 pour les tout-petits à partir d\'une photo familiale, puzzles stimulants 4×4 pour les adultes à partir de photographies de paysages.',
    },
    {
      title: 'Collections de Puzzles Grille Saisonnières',
      description: 'Construisez des collections saisonnières rotatives en utilisant les thèmes de fêtes et de nature parmi les 104 collections de la bibliothèque. Noël, Halloween, Pâques, Saint-Valentin, rentrée scolaire et été — chaque thème supporte des packs de puzzles grille dédiés. Incluez plusieurs tailles de grille (2×2, 3×3, 4×4) et nombres d\'indices (1–5) dans chaque ensemble saisonnier pour une variété et une valeur maximales. Lancez chaque collection 4–6 semaines avant la fête pour une visibilité maximale. L\'algorithme Fisher-Yates garantit qu\'aucun puzzle n\'est identique même au sein du même thème saisonnier, évitant tout contenu répétitif.',
    },
    {
      title: 'Lots Multi-Formats d\'Apprentissage Visuel',
      description: 'Associez les puzzles grille avec des fiches d\'association, des activités de pièces manquantes, des exercices de discrimination visuelle et des fiches de tri d\'images en utilisant des thèmes coordonnés à travers plusieurs générateurs. Les puzzles grille enseignent le raisonnement spatial et l\'analyse visuelle d\'une image unique. Les fiches d\'association développent la discrimination visuelle entre paires d\'images. Les pièces manquantes développent la perception partie-tout. Chaque format exerce une compétence cognitive différente tout en maintenant la cohérence thématique. Les lots multi-formats se vendent significativement plus cher que les packs à format unique et offrent aux utilisateurs une pratique variée de perception visuelle autour d\'un thème unifié.',
    },
  ],

  businessIdeas: [
    {
      title: 'Boutique Etsy de Puzzles Grille Thématiques',
      description: 'Ouvrez une boutique Etsy spécialisée dans les packs de puzzles grille organisés par thème en utilisant les 104 collections d\'images. Animaux, véhicules, nature, nourriture, fêtes et métiers — chaque thème devient un listing séparé avec des versions facile, moyenne et difficile. Chaque puzzle inclut le corrigé auto-généré avec des cercles numérotés superposés — un argument de vente critique qui différencie vos listings de la concurrence. L\'algorithme Fisher-Yates garantit que chaque fiche est unique. Prix : packs thématiques individuels à 3 €–5 € pour 15–20 puzzles avec corrigés et lots multi-niveaux premium à 8 €–12 €.',
      platform: 'Etsy.fr',
    },
    {
      title: 'Série de Cahiers de Perception Visuelle pour Amazon KDP',
      description: 'Compilez 60–80 puzzles grille dans des cahiers thématiques pour Amazon KDP. Structurez une série par progression de difficulté : \" Puzzles Grille Faciles \" utilise des grilles 2×2 avec 3 indices, \" Puzzles Grille Moyens \" utilise des grilles 3×3 avec 2 indices, et \" Puzzles Grille Avancés \" utilise des grilles 4×4 avec 1 indice. Incluez les pages de corrigés à la fin avec les cercles numérotés superposés sur l\'image complète. Activez les niveaux de gris pour une sortie économique en encre parfaite en noir et blanc. Le format purement visuel se publie de manière identique sur toutes les places de marché KDP internationales sans traduction — un seul intérieur sert tous les pays.',
      platform: 'Amazon KDP',
    },
    {
      title: 'Packs d\'Activités de Puzzles Grille pour Gumroad',
      description: 'Téléversez des packs d\'activités de puzzles grille sur Gumroad avec la difficulté différenciée comme argument de vente principal. Les vendeurs recherchant des activités de perception visuelle valorisent les puzzles qui incluent plusieurs niveaux de difficulté et des corrigés. Créez des ensembles liés au programme : puzzles grille d\'animaux pour les sciences, puzzles d\'aliments pour la nutrition, puzzles de véhicules pour les transports. Chaque pack inclut des versions facile (2×2), moyenne (3×3) et difficile (4×4) des mêmes puzzles thématiques pour que les vendeurs puissent adapter selon le niveau de l\'utilisateur. Le corrigé auto-généré avec cercles numérotés élimine le temps de préparation.',
      platform: 'Gumroad',
    },
    {
      title: 'Tunnel de Vente Pinterest pour Puzzles Grille',
      description: 'Les puzzles grille font des épingles Pinterest visuellement saisissantes — la grille d\'image divisée avec la palette de tuiles numérotées et l\'en-tête coloré crée un format éducatif immédiatement reconnaissable. Épinglez des exemples de puzzles montrant différentes tailles de grille : un simple 2×2 pour les épingles faciles, un détaillé 4×4 pour les épingles défi, et le corrigé avec cercles numérotés pour les épingles solution. Créez des séries d\'épingles distinctes pour \" puzzles grille animaux \", \" puzzles d\'images de fêtes \" et \" activités de perception visuelle \". Le format purement visuel plaît aux parents et vendeurs de tous les pays. Reliez chaque épingle à vos listings Etsy ou Gumroad.',
      platform: 'Pinterest',
    },
    {
      title: 'Kit Complet de Puzzles Grille sur Gumroad',
      description: 'Regroupez des puzzles grille couvrant les 104 thèmes et tous les niveaux de difficulté dans un kit complet sur Gumroad. Incluez plus de 300 puzzles couvrant les configurations facile, moyenne et difficile, chacun avec son corrigé auto-généré — plus de 600 fichiers au total. Le système de difficulté à trois niveaux (grilles 2×2, 3×3, 4×4) avec des nombres d\'indices variables offre une variété énorme. Le format kit justifie un prix premium car les acheteurs obtiennent une bibliothèque de puzzles complète plutôt que des packs individuels. Ajoutez de nouvelles collections saisonnières chaque trimestre pour générer des achats récurrents.',
      platform: 'Gumroad',
    },
    {
      title: 'Gamme de Produits de Puzzles Visuels Mondiaux',
      description: 'Le Puzzle Grille produit des puzzles purement visuels — les tuiles d\'images et les numéros sont universels. Les mêmes fichiers de produits fonctionnent dans tous les pays sans traduction ni modification. Une seule session de création produit un catalogue vendable mondialement. Vendez des fichiers identiques sur des boutiques Etsy ciblant différents pays, publiez les mêmes intérieurs KDP sur toutes les places de marché Amazon internationales et listez sur Gumroad pour les vendeurs internationaux. Pas de versions linguistiques séparées, pas de coûts de traduction, pas de maintenance par locale. La fonctionnalité de téléchargement d\'images personnalisées permet aussi des services de personnalisation localisés sans changer le format de base du produit.',
      platform: 'Etsy.fr / Amazon KDP',
    },
  ],

  proTips: [
    {
      title: 'Combinez Taille de Grille et Cases-Indices pour des Ensembles de Difficulté Progressive',
      description: 'Les deux contrôles de difficulté indépendants — taille de grille (2×2 à 4×4) et cases-indices (1–5) — créent un large spectre de niveaux de défi à partir d\'une seule image. Une grille 2×2 avec 3 indices ne laisse qu\'1 tuile à associer : un échauffement trivial. Une grille 4×4 avec 1 indice nécessite d\'associer 15 tuiles : un vrai défi de raisonnement spatial. Créez des lots à difficulté progressive en commençant facile et en réduisant progressivement les indices tout en augmentant la taille de la grille. Les lots différenciés se vendent mieux que les packs à difficulté unique car les vendeurs ont besoin de puzzles pour des classes à niveaux mixtes.',
    },
    {
      title: 'Utilisez l\'Algorithme Fisher-Yates pour Multiplier les Puzzles Uniques',
      description: 'Chaque clic sur Générer mélange la palette de tuiles par l\'algorithme Fisher-Yates, produisant un ordre de tuiles numérotées différent. Cela signifie qu\'une seule image avec des paramètres de grille fixes génère plusieurs fiches de puzzles uniques, chacune avec des numéros de tuiles et des positions d\'indices différents. Utilisez cela pour remplir rapidement de grands lots sans avoir besoin d\'images sources différentes pour chaque page. Générez 10–15 puzzles uniques par image, puis multipliez à travers les 104 thèmes pour des catalogues de produits massifs avec un effort minimal.',
    },
    {
      title: 'Mettez en Avant le Corrigé avec Cercles Numérotés comme Argument de Vente',
      description: 'Le corrigé auto-généré affiche l\'image complète avec des cercles numérotés montrant quel numéro de palette correspond à chaque position — une présentation professionnelle qui distingue vos puzzles grille de la concurrence. Incluez toujours des aperçus du corrigé dans vos images de listing sur Etsy et Gumroad. Montrez la fiche et le corrigé côte à côte pour démontrer le package complet. Le système double canevas produit les deux versions simultanément, donc inclure les corrigés n\'ajoute aucun temps de production supplémentaire.',
    },
    {
      title: 'Exploitez le Format Purement Visuel pour des Ventes Mondiales',
      description: 'Les puzzles grille ne contiennent que des tuiles d\'images et des numéros — aucun texte spécifique à une langue sur la fiche. Cela signifie que chaque puzzle que vous créez est instantanément vendable partout dans le monde sans traduction ni localisation. Un ensemble de puzzles grille sert toutes les boutiques Etsy internationales, toutes les places de marché KDP et tous les acheteurs Gumroad quelle que soit la langue. Pendant que vos concurrents créent des versions linguistiques séparées de fiches avec du texte, vos puzzles grille fonctionnent partout à partir d\'un seul ensemble de fichiers.',
    },
    {
      title: 'Utilisez le Téléchargement d\'Images Personnalisées pour des Produits Premium',
      description: 'Le panneau Télécharger des Images Personnalisées accepte les fichiers PNG, JPG et GIF, transformant n\'importe quelle photo en puzzle grille. Proposez la création de puzzles grille personnalisés comme service premium sur Etsy où les clients soumettent leurs photos et vous livrez des fiches de puzzles imprimées avec corrigés — photos de famille, portraits d\'animaux, souvenirs de vacances ou photos de groupe de classe. Les produits personnalisés offrent des marges plus élevées que les puzzles basés sur la bibliothèque car chaque commande est unique. La taille de grille et le nombre d\'indices configurables vous permettent d\'ajuster la difficulté pour tout public et toute tranche d\'âge.',
    },
    {
      title: 'Utilisez les Thèmes de Fond et Bordure pour une Image de Marque Cohérente',
      description: 'Le système indépendant de thèmes de fond et de bordure avec des curseurs d\'opacité séparés permet de créer une identité visuelle cohérente à travers vos lots de puzzles grille. Définissez un thème de fond subtil à 15–25 % d\'opacité pour une chaleur visuelle sans distraire du contenu du puzzle. Superposez une bordure décorative à 80–100 % d\'opacité pour un cadre soigné. Appliquez la même combinaison fond/bordure à tous les puzzles d\'un lot pour un aspect produit cohérent que les acheteurs associent à la qualité et au professionnalisme.',
    },
    {
      title: 'Choisissez la Bonne Taille de Grille pour Votre Public Cible',
      description: 'Adaptez la configuration de la grille aux attentes des acheteurs sur chaque place de marché. Pour les ressources Gumroad ciblant la maternelle et le CP, utilisez des grilles 2×2 et 2×3 avec 2–3 indices pour des puzzles accessibles. Pour les lots d\'activités Etsy ciblant les parents d\'utilisateurs de primaire, utilisez des grilles 3×3 avec 1–2 indices pour un défi équilibré. Pour les cahiers de puzzles KDP ciblant les utilisateurs plus âgés et les adultes, utilisez des grilles 4×3 et 4×4 avec 1 indice pour de vrais défis de raisonnement spatial. Adapter la complexité de la grille à l\'âge du public garantit des avis positifs et des achats récurrents.',
    },
  ],

  faq: [
    {
      question: 'Y a-t-il un essai gratuit ?',
      answer: 'Oui. L\'outil propose un essai gratuit avec toutes les fonctionnalités — toutes les tailles de grille de 2×2 à 4×4, les cases-indices ajustables (1–5), le mélange des tuiles par algorithme Fisher-Yates, le corrigé auto-généré avec cercles numérotés superposés, les 104 collections d\'images thématiques avec plus de 3 100 illustrations, le téléchargement d\'images personnalisées, les thèmes de fond et de bordure avec opacité indépendante, le mode niveaux de gris et tous les formats de téléchargement. Sans inscription, sans carte bancaire. Les téléchargements de l\'essai gratuit incluent un filigrane. Achetez une Licence Commerciale pour supprimer le filigrane et débloquer les droits de vente.',
    },
    {
      question: 'Comment fonctionne le puzzle grille ?',
      answer: 'La fiche de travail affiche une image unique divisée en une grille où certaines cellules montrent la tuile d\'image réelle (cases-indices) et les cellules restantes affichent des indicateurs \" ? \". À côté ou en dessous de la grille, une palette numérotée affiche toutes les tuiles masquées dans un ordre mélangé. Les utilisateurs examinent les cases-indices, étudient les tuiles numérotées dans la palette et déterminent quel numéro correspond à chaque position vide de la grille. Le puzzle nécessite un raisonnement spatial — associer le contenu de chaque tuile à son emplacement correct dans l\'image globale. Configurez la grille de 2×2 (4 tuiles) à 4×4 (16 tuiles) et définissez 1–5 cases-indices pour contrôler la difficulté.',
    },
    {
      question: 'Comment fonctionne le corrigé auto-généré ?',
      answer: 'Lorsque vous générez une fiche, l\'application crée simultanément un corrigé correspondant sur un onglet de canevas séparé. Le corrigé affiche l\'image complète non découpée avec des cercles numérotés superposés sur chaque cellule de la grille — cercles à fond jaune (#ffffe0) avec contours noirs et numéros en police Fredoka montrant quel numéro de palette correspond à chaque position. Basculez entre les onglets Fiche de Travail et Corrigé pour comparer. Téléchargez chaque version indépendamment — fiche JPEG, fiche PDF, corrigé JPEG et corrigé PDF — ce qui vous donne quatre fichiers prêts à la production à partir d\'une seule génération. Le corrigé automatique élimine la création manuelle et garantit une précision parfaite.',
    },
    {
      question: 'Quelles tailles de grille sont disponibles ?',
      answer: 'Le générateur prend en charge 2–4 lignes et 2–4 colonnes, configurées de manière indépendante. Cela crée des grilles de 2×2 (4 tuiles) à 4×4 (16 tuiles). La valeur par défaut est 3×3 (9 tuiles). Vous pouvez définir les lignes et colonnes à des valeurs différentes pour des puzzles rectangulaires — une grille 2×4 crée une disposition large avec 8 tuiles, tandis qu\'une grille 4×2 produit un puzzle étroit et haut. Les grilles plus petites conviennent bien aux jeunes apprenants et aux puzzles d\'introduction, tandis que les grilles plus grandes défient les utilisateurs plus âgés et créent des produits de puzzles premium.',
    },
    {
      question: 'Comment les cases-indices contrôlent-elles la difficulté du puzzle ?',
      answer: 'Les cases-indices sont des positions de la grille où la tuile d\'image reste visible comme indice. Définissez 1–5 cases-indices à l\'aide du curseur dans le panneau Options de la Grille (par défaut 1). Plus d\'indices rend le puzzle plus facile car les utilisateurs disposent de plus de points de référence pour identifier où vont les tuiles. Pour une grille 3×3 : 1 indice signifie 8 tuiles à associer (difficile), 3 indices signifie 6 tuiles (modéré), 5 indices signifie 4 tuiles (facile). Pour une grille 4×4 : 1 indice signifie 15 tuiles à associer (très difficile), 5 indices signifie 11 tuiles (encore substantiel). Ce simple contrôle crée des ensembles de difficulté progressive à partir d\'une seule image.',
    },
    {
      question: 'Peut-on générer plusieurs puzzles uniques à partir de la même image ?',
      answer: 'Oui. Chaque fois que vous cliquez sur Générer, l\'application mélange les tuiles à l\'aide de l\'algorithme Fisher-Yates, produisant un ordre de tuiles numérotées différent. Les positions des cases-indices changent également entre les générations. Cela signifie que vous pouvez créer plusieurs fiches de puzzles distinctes à partir d\'une seule image sans modifier aucun paramètre — chacune aura des numéros de tuiles et des positions d\'indices différents, en faisant des expériences de puzzles uniques. C\'est essentiel pour construire de grands lots de produits efficacement.',
    },
    {
      question: 'Peut-on télécharger ses propres images pour les puzzles grille ?',
      answer: 'Oui. Le panneau Télécharger des Images Personnalisées vous permet de télécharger des fichiers PNG, JPG ou GIF depuis votre ordinateur. Les images téléchargées apparaissent dans une galerie sous la zone de téléchargement. Cliquez sur n\'importe quelle image téléchargée pour la sélectionner comme source de puzzle. Cette fonctionnalité est idéale pour créer des puzzles personnalisés à partir de photos de famille, d\'illustrations personnalisées, d\'images de marque ou de contenu spécifique à la classe. Combinez les images téléchargées avec la bibliothèque intégrée de 104 thèmes pour une variété créative maximale.',
    },
    {
      question: 'Comment la mise en page s\'adapte-t-elle au portrait et au paysage ?',
      answer: 'Le générateur détecte automatiquement l\'orientation de votre page et repositionne les éléments. Les pages portrait (hauteur > largeur) placent la grille en haut utilisant 45 % de la hauteur disponible avec la palette numérotée en dessous et un en-tête pleine largeur (100 px de hauteur, rayon de 15 px). Les pages paysage (largeur > hauteur) positionnent la grille à gauche (48 % de la largeur disponible) avec la palette à droite et un en-tête compact (70 px de hauteur, rayon de 35 px). Ce repositionnement automatique garantit que les puzzles grille sont équilibrés et professionnels dans les deux orientations sans ajustement manuel de la mise en page.',
    },
    {
      question: 'Le Créateur de Puzzles Grille est-il sensible à la langue ?',
      answer: 'Non. Le Puzzle Grille est purement visuel — le résultat du puzzle ne contient que des tuiles d\'images et des numéros, sans contenu textuel localisé sur la fiche elle-même. L\'interface de l\'application (menus, boutons, texte d\'en-tête) prend en charge les 11 langues, mais le puzzle généré fonctionne de manière identique quel que soit le choix de la langue. Cela rend les puzzles grille universellement vendables sur tous les marchés sans traduction. Un ensemble de puzzles sert toutes les boutiques Etsy internationales, toutes les places de marché KDP et tous les acheteurs Gumroad.',
    },
    {
      question: 'Quels formats de page et d\'export sont disponibles ?',
      answer: 'Les formats de page incluent Letter Portrait, Letter Paysage, A4 Portrait, A4 Paysage et dimensions personnalisées. Le Puzzle Grille ne prend pas en charge le format Carré (1200×1200). Exportez en JPEG haute résolution ou en PDF prêt à imprimer à 300 DPI (multiplicateur 6×, qualité JPEG 1.0). Activez les niveaux de gris pour une sortie économique en encre. Chaque génération produit quatre fichiers de téléchargement : fiche JPEG, fiche PDF, corrigé JPEG et corrigé PDF. Tous les exports sont prêts pour la production pour les téléchargements numériques, les cahiers imprimés et les supports de classe.',
    },
    {
      question: 'Peut-on vendre des puzzles grille créés avec cet outil à usage commercial ?',
      answer: 'Oui. Avec une licence commerciale, vous avez tous les droits pour vendre des puzzles grille en téléchargements numériques sur Etsy, en cahiers de perception visuelle sur Amazon KDP, en ressources imprimables sur Gumroad ou par tout autre canal de vente. Les tailles de grille configurables, les cases-indices ajustables, le mélange Fisher-Yates, les corrigés auto-générés avec cercles numérotés superposés, le téléchargement d\'images personnalisées et les 104 collections d\'images thématiques vous donnent tout le nécessaire pour créer des produits professionnels compétitifs dans les catégories de puzzles et de perception visuelle sur toutes les grandes places de marché.',
    },
    {
      question: 'Quelle est votre politique de remboursement ?',
      answer: 'Essayez avant d\'acheter grâce à notre essai gratuit — toutes les fonctionnalités sont disponibles pour que vous puissiez évaluer complètement l\'outil avant d\'acheter. Comme l\'essai gratuit vous donne un accès complet à toutes les tailles de grille, aux cases-indices ajustables, au corrigé auto-généré avec cercles numérotés, aux 104 thèmes, au téléchargement d\'images personnalisées, aux thèmes de fond et de bordure, à l\'export en niveaux de gris et à tous les formats d\'export, nous n\'offrons pas de remboursement sur les achats de licence. Assurez-vous que l\'outil répond à vos besoins en utilisant l\'essai gratuit avant d\'acheter.',
    },
  ],

  internalLinks: [
    { pageType: 'app', slug: 'puzzle-grille-fiches', anchorText: 'Puzzles Grille — Détails Complets du Produit' },
    { pageType: 'tool', slug: 'generateur-fiches-association', anchorText: 'Créateur de Fiches d\'Association' },
    { pageType: 'tool', slug: 'generateur-discrimination-visuelle', anchorText: 'Créateur de Fiches Discrimination Visuelle' },
    { pageType: 'tool', slug: 'generateur-cartes-bingo', anchorText: 'Créateur de Cartes Bingo' },
    { pageType: 'tool', slug: 'generateur-pieces-manquantes', anchorText: 'Créateur de Fiches Pièces Manquantes' },
    { pageType: 'tool', slug: 'generateur-fiches-intrus', anchorText: 'Créateur de Fiches Intrus' },
    { pageType: 'tool', slug: 'generateur-tri-images', anchorText: 'Créateur de Fiches Tri d\'Images' },
    { pageType: 'tool', slug: 'generateur-fiches-addition', anchorText: 'Créateur de Fiches d\'Addition' },
  ],

  visuals: {
    heroImages: {
      primary: '/samples/french/grid match/Puzzle Grille 1.webp',
      primaryAlt: 'Fiche de puzzle grille avec image unique divisée en tuiles, cases-indices révélées et palette de tuiles numérotées pour une activité de raisonnement spatial',
    },
    sampleGallery: [
      {
        src: '/samples/french/grid match/Puzzle Grille 1.webp',
        alt: 'Puzzle grille 3×3 avec une case-indice visible et huit tuiles numérotées dans la palette mélangée pour l\'association',
        caption: 'Puzzle grille 3×3 — une case-indice révélée, huit tuiles à associer depuis la palette numérotée',
      },
      {
        src: '/samples/french/grid match/Puzzle Grille 5.webp',
        alt: 'Puzzle grille 4×4 avancé avec seize tuiles et indices minimaux pour une activité de perception visuelle stimulante',
        caption: 'Puzzle 4×4 avancé — taille de grille maximale avec 16 tuiles pour un raisonnement spatial stimulant',
      },
      {
        src: '/samples/french/grid match/Puzzle Grille 1 answer_key.webp',
        alt: 'Corrigé du puzzle grille montrant l\'image complète avec des cercles numérotés jaunes superposés sur chaque cellule indiquant le placement correct des tuiles',
        caption: 'Corrigé auto-généré — les cercles numérotés (#ffffe0) montrent le placement correct des tuiles sur l\'image complète',
      },
    ],
    youtubeId: 'RGtED1Bnut8',
    videoTitle: 'Comment Créer des Puzzles Grille avec Tailles Configurables, Cases-Indices Ajustables et Corrigés Automatiques — Tutoriel Étape par Étape',
  },
};

export default content;
