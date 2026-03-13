import type { ToolContent } from '../types';

const content: ToolContent = {
  seo: {
    primaryKeyword: 'générateur de cartes bingo à images',
    secondaryKeywords: [
      'générateur de cartes bingo à images pour vendeurs',
      'créer des cartes bingo à vendre sur Etsy',
      'créateur de cartes bingo imprimables licence commerciale',
      'générateur de cartes bingo pour KDP et Etsy',
    ],
    lsiKeywords: [
      'générateur de cartes bingo par lot avec export ZIP',
      'double mode remplissage image mot créateur bingo',
      'feuille d\'appel outil créateur fiches bingo',
    ],
    titleTag: 'Créateur Cartes Bingo — Générateur Bingo à Images',
    metaDescription: 'Créez des cartes bingo à images avec grilles 3×3 à 5×5, lot de cartes uniques, export ZIP, feuilles d’appel, 104 thèmes. Essai gratuit avec filigrane.',
  },

  hero: {
    title: 'Créateur de Cartes Bingo à Images',
    tagline: 'Générateur de cartes bingo à images avec grilles configurables de 3×3 à 5×5, génération par lot de 1 à 10 cartes uniques par ensemble, export ZIP de toutes les cartes en un seul téléchargement, double mode de remplissage pour les cases et les jetons circulaires indépendamment, feuille d\'appel dédiée avec grille dynamique de mots, sélection personnalisée des appels avec compteur en temps réel, et 104 collections d\'images thématiques pour des cartes bingo vendables dans le monde entier',
    description: 'Créez des cartes bingo à images professionnelles où chaque joueur reçoit une carte unique avec des images différentes à des positions différentes — essentiel pour que le bingo fonctionne comme un jeu. Configurez les lignes de 3 à 5 et les colonnes de 3 à 5 indépendamment, créant des grilles de 3×3 (9 cases) jusqu\'à 5×5 (25 cases) avec un défaut de 4×4 (16 cases). Générez 1 à 10 cartes bingo uniques par lot, chacune tirant une sélection aléatoire différente de la banque d\'images pour qu\'aucune carte ne partage la même disposition. Exportez toutes les cartes générées en fichiers JPEG individuels dans un seul fichier bingo_cards.zip grâce à la compression JSZip — un clic télécharge un ensemble complet de cartes bingo prêt à intégrer dans vos produits de places de marché. Choisissez le remplissage par images ou par mots indépendamment pour les cases de la carte et les jetons circulaires, créant quatre styles de cartes bingo distincts à partir d\'un seul générateur. Le remplissage par images affiche des illustrations thématiques ; le remplissage par mots affiche les noms localisés des images de la Bibliothèque d\'Images, rendant le Créateur de Cartes Bingo sensible à la langue — changer de langue modifie les mots sur les cartes, les jetons et la feuille d\'appel. Les jetons circulaires comportent des bordures en pointillés (#666, strokeDashArray [5,5]) et sont mélangés par l\'algorithme de Fisher-Yates pour qu\'ils ne reflètent jamais la disposition de la grille, garantissant un jeu de bingo authentique où les jetons servent de référence d\'association et non d\'indice positionnel. Une feuille d\'appel dédiée sur un onglet séparé affiche une grille dynamique de mots pour le meneur de jeu — les colonnes sont calculées selon la longueur du mot le plus long (2 à 6 colonnes) avec une taille de police uniforme sur toutes les entrées pour une lisibilité claire. Activez la sélection personnalisée des appels pour choisir manuellement les images spécifiques pour la banque d\'appels avec un compteur en temps réel affichant votre nombre de sélections, vous donnant un contrôle précis d\'alignement au programme sur les éléments qui apparaissent dans le jeu. Parcourez 104 collections thématiques avec plus de 3 100 illustrations ou téléchargez vos propres images PNG, JPG ou GIF. Appliquez des thèmes de fond et de bordure avec des curseurs d\'opacité indépendants (0–1, pas de 0,05). Ajoutez du texte personnalisé avec 7 polices (Lexend Deca, Baloo 2, Nunito, Quicksand, Fredoka, Arial, Verdana) et contour de texte 0–10. Exportez fiche JPEG, appels JPEG, fiche PDF et appels PDF à 300 DPI (multiplicateur 6×, qualité JPEG 1.0), plus l\'export ZIP par lot pour toutes les cartes. Choisissez Letter, A4, Carré (1200×1200) ou dimensions personnalisées avec mode niveaux de gris pour une sortie économique en encre. La zone de grille utilise 60 % de la hauteur du canevas disponible (plafonnée à 500 px) pour des proportions de carte optimales. Éditez tout sur le canevas Fabric.js avec outils d\'alignement, calques, verrouillage, zoom 50 %–200 % par incréments de 10 % et annuler/rétablir 20 états. L\'essai gratuit inclut toutes les fonctionnalités avec un filigrane sur les téléchargements. Achetez une licence pour supprimer le filigrane et vendre à usage commercial.',
  },

  tutorial: {
    title: 'Comment Créer des Cartes Bingo à Images en 8 Étapes',
    steps: [
      {
        title: 'Ouvrir le Créateur de Cartes Bingo',
        description: 'Cliquez sur « Essayer maintenant » pour lancer le générateur de cartes bingo à images dans votre navigateur. L\'outil s\'ouvre instantanément avec une barre latérale de réglages à gauche et un canevas à double onglet à droite — un onglet pour la carte bingo avec les jetons, un pour la feuille d\'appel. Aucun compte, aucun téléchargement de logiciel, aucune installation requis — commencez à créer des cartes bingo immédiatement.',
      },
      {
        title: 'Configurer la Taille de Grille et le Nombre de Cartes',
        description: 'Ouvrez le panneau Paramètres de la Carte Bingo et définissez les lignes (3–5) et les colonnes (3–5) indépendamment pour déterminer votre taille de grille — le défaut est 4×4 avec 16 cases. Une grille 3×3 convient aux parties rapides avec moins d\'éléments à suivre, tandis qu\'une grille 5×5 offre l\'expérience bingo classique à 25 cases. Réglez le nombre de cartes de 1 à 10 pour générer par lot plusieurs cartes bingo uniques. Chaque carte tire une sélection aléatoire différente de la banque d\'images, garantissant que chaque carte du lot est unique — essentiel pour le bingo où chaque joueur a besoin d\'une carte différente.',
      },
      {
        title: 'Choisir les Modes de Remplissage pour les Cases et les Jetons',
        description: 'Sélectionnez le remplissage des cases (Image ou Mot) et le remplissage des jetons (Image ou Mot) indépendamment dans le panneau Paramètres de la Carte Bingo. Le remplissage par images affiche des illustrations thématiques dans les cases de la grille ou sur les jetons circulaires. Le remplissage par mots affiche les noms localisés des images sous forme de texte — changer la langue de l\'application modifie tous les mots sur les cartes, les jetons et la feuille d\'appel. Mélangez les modes pour une variété créative : des cartes à images avec des jetons à mots créent un défi d\'association visuel-textuel, des cartes à mots avec des jetons à images inversent la dynamique, et combiner les deux produit soit un bingo purement visuel soit purement textuel. Quatre styles de cartes bingo distincts à partir d\'un seul générateur.',
      },
      {
        title: 'Sélectionner les Images dans la Bibliothèque',
        description: 'Ouvrez le panneau Bibliothèque d\'Images et parcourez 104 collections thématiques avec plus de 3 100 illustrations colorées — animaux, nourriture, véhicules, nature, fêtes, métiers et bien d\'autres. Filtrez par thème via le menu déroulant ou recherchez par mot-clé. Cliquez sur les images pour les sélectionner pour vos cartes bingo. Activez la case « Utiliser la sélection personnalisée » pour choisir manuellement les images spécifiques pour la banque d\'appels — un compteur en temps réel affiche votre nombre de sélections au fur et à mesure. La sélection personnalisée des appels vous donne un contrôle précis sur les éléments qui apparaissent dans le jeu de bingo, utile pour les activités alignées sur le programme ou les événements thématiques.',
      },
      {
        title: 'Définir la Mise en Page et les Décorations',
        description: 'Dans la section Mise en Page, sélectionnez votre format de page : Letter Portrait, Letter Paysage, A4 Portrait, A4 Paysage, Carré (1200×1200) ou entrez une dimension personnalisée. Choisissez une couleur de fond de page. Sélectionnez un thème de fond décoratif et un thème de bordure depuis la bibliothèque intégrée, chacun avec un curseur d\'opacité indépendant (0–1, pas de 0,05). Les thèmes de fond et de bordure fonctionnent de manière indépendante, vous pouvez associer un fond à motifs subtil avec une bordure décorative prononcée ou toute combinaison adaptée à votre style de produit. La feuille d\'appel hérite des bordures et du fond du canevas principal.',
      },
      {
        title: 'Générer les Cartes Bingo',
        description: 'Cliquez sur Générer pour créer vos cartes bingo. L\'application remplit votre grille configurée avec des images ou des mots du thème sélectionné et crée des jetons circulaires avec bordures en pointillés (#666, strokeDashArray [5,5]) sous la carte. Les jetons sont mélangés par l\'algorithme de Fisher-Yates pour qu\'ils ne reflètent jamais la disposition de la grille, garantissant un jeu de bingo authentique. Si vous avez demandé plusieurs cartes, chacune tire une sélection aléatoire différente de la banque d\'images. La première carte apparaît immédiatement sur le canevas pour un aperçu. La zone de grille utilise 60 % de la hauteur du canevas disponible (plafonnée à 500 px) pour des proportions optimales.',
      },
      {
        title: 'Consulter la Feuille d\'Appel',
        description: 'Cliquez sur l\'onglet Appels pour voir la feuille d\'appel compagnon. La feuille d\'appel affiche une grille dynamique de mots de tous les éléments uniques de la banque d\'images — le meneur de jeu les lit à voix haute pendant que les joueurs marquent leurs cartes. Les colonnes sont calculées selon la longueur du mot le plus long (2 à 6 colonnes) avec une taille de police uniforme sur toutes les entrées. La grille est centrée sur la page et hérite des bordures et du fond du canevas principal. Ce n\'est pas un corrigé — le bingo n\'a pas de bonne réponse unique puisque chaque carte est différente. La feuille d\'appel est le document de référence pour la personne qui anime le jeu.',
      },
      {
        title: 'Télécharger les Cartes, la Feuille d\'Appel et l\'Export ZIP par Lot',
        description: 'Activez les niveaux de gris pour des versions économiques en encre idéales pour l\'impression en classe et les intérieurs KDP. Téléchargez les fichiers individuels avec les quatre boutons dédiés : fiche JPEG, appels JPEG, fiche PDF et appels PDF — tous rendus à 300 DPI (multiplicateur 6×, qualité JPEG 1.0). Pour l\'export par lot, cliquez sur le bouton de téléchargement ZIP pour recevoir toutes les cartes bingo générées en fichiers JPEG individuels dans un seul fichier bingo_cards.zip. L\'export ZIP par lot est essentiel pour les vendeurs créant des ensembles bingo multi-cartes — générez 10 cartes uniques et empaquetez-les en un seul téléchargement. Les fichiers sont prêts pour la production : listings Etsy.fr, intérieurs Amazon KDP et fichiers produits TPT.',
      },
    ],
  },

  whatYouCanCreate: [
    {
      title: 'Ensembles de Cartes Bingo Thématiques par Taille de Grille',
      description: 'Créez des packs de cartes bingo organisés par thème et taille de grille en utilisant les 104 collections d\'images. Chaque thème supporte plusieurs configurations de grille : cartes 3×3 rapides avec 9 cases pour des parties courtes, cartes 4×4 standard avec 16 cases pour un jeu équilibré, et cartes 5×5 classiques avec 25 cases pour des sessions prolongées. Générez par lot 10 cartes uniques par taille de grille, puis mélangez les trois tailles dans un seul lot de produits avec les feuilles d\'appel incluses. L\'export ZIP par lot empaquète chaque ensemble pour une livraison immédiate. Le mélange de jetons Fisher-Yates garantit que chaque carte présente un véritable défi de bingo où les jetons ne reflètent jamais la disposition de la grille.',
    },
    {
      title: 'Produits de Bingo Vocabulaire Multilingues',
      description: 'Le Créateur de Cartes Bingo est sensible à la langue — le mode remplissage par mots affiche les noms localisés des images de la Bibliothèque d\'Images, donc changer de langue modifie les mots sur les cartes, les jetons et la feuille d\'appel. Créez des ensembles bingo en anglais, allemand, français, espagnol, portugais, italien, néerlandais, suédois, danois, norvégien et finnois à partir des mêmes images sans rien reconstruire. Une image de chat affiche « Chat » en français, « Cat » en anglais et « Katze » en allemand. Vendez des produits de bingo vocabulaire sur les places de marché internationales en générant chaque version linguistique en quelques minutes. Les cartes à mots avec jetons à images font des outils de révision de vocabulaire particulièrement efficaces.',
    },
    {
      title: 'Cahiers d\'Activités Bingo pour KDP avec Feuilles d\'Appel',
      description: 'Compilez 40 à 80 cartes bingo dans des cahiers d\'activités imprimés pour Amazon KDP. Structurez les chapitres par thème : bingo animaux, bingo nourriture, bingo véhicules, bingo fêtes. Incluez les feuilles d\'appel après chaque ensemble pour que le livre soit autonome et prêt à jouer — les lecteurs peuvent photocopier la page d\'appel pendant que les joueurs utilisent directement les pages de cartes bingo. Mélangez les tailles de grille au sein des chapitres pour une difficulté progressive. Activez les niveaux de gris pour une sortie économique en encre qui maintient les coûts d\'impression KDP bas. La génération par lot produit 10 cartes uniques par ensemble en quelques secondes, rendant les compilations de grands cahiers efficaces.',
    },
    {
      title: 'Kits de Jeux Bingo Prêts pour la Classe',
      description: 'Construisez des kits de jeux bingo complets pour la classe avec 10 cartes uniques par joueur et une feuille d\'appel par ensemble. Les enseignants recherchant des activités bingo apprécient les produits prêts à jouer — imprimez les cartes, distribuez-les et commencez le jeu immédiatement. Utilisez le mode remplissage par mots avec du vocabulaire du programme pour la révision en français, le remplissage par images pour des exercices de reconnaissance visuelle, ou les modes mixtes pour l\'instruction différenciée. La sélection personnalisée des appels vous permet de choisir exactement quels éléments de vocabulaire apparaissent dans le jeu pour un alignement précis au programme.',
    },
    {
      title: 'Collections Bingo Saisonnières et de Fêtes',
      description: 'Construisez des collections saisonnières rotatives en utilisant les thèmes de fêtes et de nature parmi les 104 collections de la bibliothèque. Bingo de Noël, bingo d\'Halloween, bingo de Pâques, bingo de la Saint-Valentin, bingo de rentrée scolaire et bingo d\'été — chaque thème supporte des packs de produits dédiés. Le bingo est un jeu naturellement social qui connaît des pics pendant les fêtes quand les familles et les classes recherchent des activités de groupe. Incluez plusieurs tailles de grille et les variantes remplissage images et mots dans chaque ensemble saisonnier pour une valeur maximale. Lancez chaque collection 4 à 6 semaines avant la fête pour une visibilité maximale sur les places de marché.',
    },
    {
      title: 'Ensembles Bingo pour Événements et Fêtes',
      description: 'Créez des ensembles de cartes bingo pour les fêtes, baby showers, enterrements de vie de jeune fille, animations d\'équipe et ateliers éducatifs. Les tailles de grille configurables et la bibliothèque d\'images thématiques produisent des jeux bingo spécifiques à chaque occasion rapidement — bingo objets de bébé pour les baby showers, bingo nourriture pour les cours de cuisine, bingo animaux pour les sorties au zoo. Générez par lot 10 cartes uniques par événement avec une feuille d\'appel, empaquetez le tout en téléchargement instantané ZIP, et vendez sur Etsy où les organisateurs d\'événements recherchent activement des jeux imprimables. La sélection personnalisée des appels vous permet de choisir exactement les éléments pour chaque occasion.',
    },
  ],

  businessIdeas: [
    {
      title: 'Boutique Etsy de Cartes Bingo Thématiques',
      description: 'Ouvrez une boutique Etsy spécialisée dans les packs de cartes bingo organisés par thème en utilisant les 104 collections d\'images. Animaux, nourriture, véhicules, fêtes, nature et métiers — chaque thème devient un listing séparé avec 10 à 30 cartes uniques par ensemble et feuilles d\'appel incluses. La génération par lot crée 10 cartes uniques par clic, et l\'export ZIP les empaquète instantanément pour la livraison numérique. Mélangez les tailles de grille dans les packs : cartes 3×3 rapides, cartes 4×4 standard et cartes 5×5 classiques pour la variété. Prix : packs thématiques individuels à 3 €–5 € pour 10–15 cartes avec feuilles d\'appel et lots multi-thèmes premium à 8 €–15 €.',
      platform: 'Etsy.fr',
    },
    {
      title: 'Série de Cahiers d\'Activités Bingo sur Amazon KDP',
      description: 'Compilez 40 à 80 cartes bingo dans des cahiers thématiques pour Amazon KDP. Structurez une série par sujet : « Bingo Animaux », « Bingo des Fêtes », « Bingo Nourriture » et « Bingo Objets du Quotidien ». Incluez les feuilles d\'appel après chaque ensemble de cartes pour que le livre soit autonome et prêt à jouer. Mélangez les tailles de grille pour une difficulté progressive au sein de chaque livre — commencez avec des cartes 3×3 et progressez vers 5×5. Activez les niveaux de gris pour une sortie économique en encre parfaite en noir et blanc. Les cahiers d\'activités bingo se vendent bien toute l\'année et connaissent des pics pendant les fêtes quand les familles recherchent des activités de groupe.',
      platform: 'Amazon KDP',
    },
    {
      title: 'Packs d\'Activités Bingo pour la Classe sur TPT',
      description: 'Téléversez des packs d\'activités bingo sur TPT avec des cartes uniques par joueur et des feuilles d\'appel comme arguments de vente principaux. Les enseignants recherchant des activités bingo apprécient les produits prêts à jouer — imprimez, distribuez et commencez le jeu. Créez des ensembles alignés sur le programme : bingo vocabulaire avec le mode remplissage par mots, bingo reconnaissance d\'images avec le mode remplissage par images, et bingo en mode mixte pour l\'instruction différenciée. Incluez 10 cartes uniques par ensemble avec une feuille d\'appel. Le mode remplissage par mots avec les noms localisés des images transforme le bingo en activité de révision de vocabulaire utilisable en français, en sciences et dans les unités thématiques.',
      platform: 'Teachers Pay Teachers',
    },
    {
      title: 'Tunnel de Vente Pinterest pour Cartes Bingo',
      description: 'Les cartes bingo font des épingles Pinterest visuellement saisissantes — la disposition en grille colorée avec des images thématiques et des jetons circulaires crée un format de jeu immédiatement reconnaissable que les parents et les enseignants adorent. Épinglez des exemples de cartes bingo montrant différents thèmes : bingo animaux pour les tableaux préscolaires, bingo des fêtes pour les tableaux saisonniers, et bingo vocabulaire pour les tableaux éducatifs. Créez des séries d\'épingles distinctes pour « cartes bingo imprimables », « jeux bingo pour la classe » et « activités bingo de fêtes ». Le bingo est un jeu universellement reconnu, les épingles attirent donc des audiences de tous les pays et langues. Reliez chaque épingle à vos listings Etsy ou TPT.',
      platform: 'Pinterest',
    },
    {
      title: 'Kit Complet de Cartes Bingo sur Gumroad',
      description: 'Regroupez des cartes bingo couvrant les 104 thèmes, toutes les tailles de grille et les deux modes de remplissage dans un kit complet sur Gumroad. Incluez plus de 500 cartes bingo uniques couvrant les grilles 3×3, 4×4 et 5×5 avec les variantes remplissage images et mots, plus les feuilles d\'appel pour chaque thème. La génération par lot et l\'export ZIP rendent la production à grande échelle efficace. Le système de double remplissage produit quatre styles de cartes distincts par thème (image/image, image/mot, mot/image, mot/mot), multipliant la variété à partir de chaque ensemble d\'images. Le format kit justifie un prix premium car les acheteurs obtiennent une bibliothèque complète de jeux bingo plutôt que des packs individuels.',
      platform: 'Gumroad',
    },
    {
      title: 'Produits Bingo Multilingues pour les Marchés Internationaux',
      description: 'Le Créateur de Cartes Bingo est sensible à la langue — le mode remplissage par mots utilise les noms localisés des images dans 11 langues, rendant simple la production de cartes bingo en anglais, allemand, français, espagnol, portugais, italien, néerlandais, suédois, danois, norvégien et finnois à partir des mêmes images. Créez des produits de bingo vocabulaire ciblant les boutiques Etsy internationales, les acheteurs TPT multilingues et les apprenants de langues du monde entier. Vendez le même ensemble bingo thématique dans plusieurs versions linguistiques sans aucune refonte — changez simplement la langue et régénérez. Les lots multilingues commandent des prix premium et atteignent des acheteurs inaccessibles aux concurrents monolingues.',
      platform: 'Etsy.fr / TPT',
    },
  ],

  proTips: [
    {
      title: 'Utilisez la Génération par Lot et l\'Export ZIP pour une Création de Produits Efficace',
      description: 'Réglez le nombre de cartes à 10 et générez un ensemble complet de cartes bingo uniques en un seul clic. Chaque carte tire une sélection aléatoire différente de la banque d\'images, garantissant qu\'aucune carte ne partage la même disposition. Puis utilisez l\'export ZIP par lot pour télécharger les 10 cartes en fichiers JPEG individuels dans un seul fichier bingo_cards.zip. Ce flux de travail produit un ensemble complet de cartes bingo prêt à vendre en quelques secondes au lieu de générer et sauvegarder les cartes une par une. Pour des lots plus grands, générez plusieurs ensembles à travers différentes tailles de grille et thèmes.',
    },
    {
      title: 'Mélangez les Modes de Remplissage pour Quatre Styles de Produits Distincts',
      description: 'Les cases de la carte et les jetons ont chacun une sélection de mode de remplissage indépendante — Image ou Mot. Cela crée quatre styles de cartes bingo distincts à partir d\'un seul générateur : cartes à images avec jetons à images (purement visuel), cartes à images avec jetons à mots (association visuel-textuel), cartes à mots avec jetons à images (association textuel-visuel), et cartes à mots avec jetons à mots (purement textuel). Incluez les quatre styles dans vos lots premium pour une variété et une valeur maximales. Chaque style sert un objectif pédagogique différent — reconnaissance visuelle, association de vocabulaire, pratique de lecture ou apprentissage combiné.',
    },
    {
      title: 'Exploitez la Sélection Personnalisée des Appels pour l\'Alignement au Programme',
      description: 'Activez la case « Utiliser la sélection personnalisée » pour choisir manuellement quelles images apparaissent dans la banque d\'appels. Le compteur en temps réel affiche votre nombre de sélections au fur et à mesure que vous choisissez dans la Bibliothèque d\'Images. Cette fonctionnalité est essentielle pour créer des jeux bingo alignés sur le programme — sélectionnez uniquement les mots de vocabulaire couverts par votre leçon, uniquement les animaux d\'un habitat spécifique, ou uniquement les aliments d\'une unité nutrition. La sélection personnalisée des appels transforme le bingo d\'un jeu aléatoire en un outil pédagogique ciblé, ce qui est l\'argument de vente clé pour les produits TPT destinés à la classe.',
    },
    {
      title: 'Exploitez le Remplissage par Mots Sensible à la Langue pour des Produits Multilingues',
      description: 'Le mode remplissage par mots affiche les noms localisés des images de la Bibliothèque d\'Images — changer la langue de l\'application modifie tous les mots sur les cartes, les jetons et la feuille d\'appel. Générez un ensemble bingo thématique en français, puis passez à l\'allemand, l\'anglais, l\'espagnol ou l\'une des 11 langues supportées et régénérez le même ensemble avec du vocabulaire localisé. Cela produit des produits bingo multilingues à partir d\'images identiques sans aucun effort de refonte. Les lots de bingo vocabulaire multilingues sont peu concurrencés sur la plupart des places de marché, vous donnant un avantage compétitif.',
    },
    {
      title: 'Incluez les Feuilles d\'Appel dans Chaque Listing de Produit',
      description: 'La feuille d\'appel dédiée avec sa grille dynamique de mots est ce qui transforme vos cartes bingo en un jeu complet et jouable plutôt que de simples imprimables décoratifs. Incluez toujours les feuilles d\'appel dans vos lots de produits et mettez-les en avant dans les images d\'aperçu des listings. La feuille d\'appel affiche tous les éléments uniques dans une grille propre avec une taille de police uniforme et des colonnes calculées — le meneur lit les éléments à voix haute pendant que les joueurs marquent leurs cartes. Les produits incluant les supports pour le meneur surpassent systématiquement les listings cartes-seules car les acheteurs veulent une expérience complète et prête à jouer.',
    },
    {
      title: 'Utilisez les Thèmes de Fond et Bordure pour une Image de Marque Cohérente',
      description: 'Le système indépendant de thèmes de fond et de bordure avec des curseurs d\'opacité séparés permet de créer une identité visuelle cohérente à travers vos lots de cartes bingo. Définissez un thème de fond subtil à 15–25 % d\'opacité pour une chaleur visuelle sans distraire du contenu de la grille bingo. Superposez une bordure décorative à 80–100 % d\'opacité pour un cadre soigné. Appliquez la même combinaison fond/bordure à toutes les cartes d\'un lot pour un aspect produit cohérent que les acheteurs associent à la qualité et au professionnalisme. La feuille d\'appel hérite automatiquement de ces réglages.',
    },
    {
      title: 'Ciblez Plusieurs Tailles de Grille pour une Couverture Maximale du Marché',
      description: 'Différentes tailles de grille servent différents publics. Les grilles 3×3 (9 cases) conviennent le mieux au bingo préscolaire et maternelle avec des parties rapides et moins d\'éléments à suivre. Les grilles 4×4 (16 cases) conviennent aux classes élémentaires avec un jeu équilibré. Les grilles 5×5 (25 cases) offrent l\'expérience bingo classique pour les élèves plus âgés et les soirées jeux en famille. Incluez les trois tailles dans vos lots de produits et créez des listings séparés ciblant chaque groupe d\'âge. La génération par lot signifie que changer de taille de grille et régénérer ne prend que quelques secondes.',
    },
  ],

  faq: [
    {
      question: 'Y a-t-il un essai gratuit ?',
      answer: 'Oui. L\'outil propose un essai gratuit avec toutes les fonctionnalités — toutes les tailles de grille de 3×3 à 5×5, la génération par lot jusqu\'à 10 cartes uniques, l\'export ZIP par lot, les modes remplissage images et mots pour les cases et les jetons indépendamment, la feuille d\'appel dédiée avec grille dynamique de mots, la sélection personnalisée des appels avec compteur en temps réel, les 104 collections d\'images thématiques avec plus de 3 100 illustrations, le téléchargement d\'images personnalisées, les thèmes de fond et de bordure avec opacité indépendante, le mode niveaux de gris et tous les formats de téléchargement. Sans inscription, sans carte bancaire. Les téléchargements de l\'essai gratuit incluent un filigrane. Achetez une Licence Commerciale pour supprimer le filigrane et débloquer les droits de vente.',
    },
    {
      question: 'Comment fonctionne la génération par lot pour les cartes bingo ?',
      answer: 'Réglez le nombre de cartes de 1 à 10 dans le panneau Paramètres de la Carte Bingo. Chaque carte tire une sélection aléatoire différente de la banque d\'images, garantissant que chaque carte du lot est unique — essentiel pour le bingo où chaque joueur a besoin d\'une carte différente. La première carte apparaît immédiatement sur le canevas pour un aperçu. Toutes les cartes générées sont disponibles via l\'export ZIP par lot pour le téléchargement en fichiers JPEG individuels dans un seul fichier bingo_cards.zip. Générez un ensemble complet de 10 cartes bingo uniques en un seul clic, prêt à intégrer dans vos produits de places de marché.',
    },
    {
      question: 'Quelles tailles de grille sont disponibles pour les cartes bingo ?',
      answer: 'Les lignes et les colonnes sont configurables indépendamment de 3 à 5, créant des grilles de 3×3 (9 cases) jusqu\'à 5×5 (25 cases). Le défaut est 4×4 avec 16 cases. Vous pouvez aussi créer des grilles non carrées comme 3×5 (15 cases) ou 5×3 (15 cases) pour des formats de cartes bingo uniques. Les grilles plus petites conviennent aux parties rapides préscolaires avec moins d\'éléments à suivre, tandis que les grilles 5×5 offrent l\'expérience bingo classique pour des parties plus longues et des publics plus âgés.',
    },
    {
      question: 'Quelle est la différence entre le remplissage des cases et le remplissage des jetons ?',
      answer: 'Les cases de la carte et les jetons ont chacun un mode de remplissage indépendant : Image ou Mot. Le remplissage des cases détermine ce qui apparaît dans chaque case de la grille bingo sur la carte. Le remplissage des jetons détermine ce qui apparaît sur les jetons circulaires avec bordures en pointillés sous la carte. Vous pouvez mélanger les modes librement — des cartes à images avec des jetons à mots créent un défi d\'association visuel-textuel, des cartes à mots avec des jetons à images inversent la dynamique, et combiner les deux produit soit un bingo purement visuel soit purement textuel. Ce système de double remplissage produit quatre styles de cartes bingo distincts à partir d\'un seul générateur.',
    },
    {
      question: 'Comment fonctionnent les jetons circulaires ?',
      answer: 'Les jetons circulaires apparaissent sous la grille de la carte bingo avec des bordures en pointillés (#666, strokeDashArray [5,5]). Ils affichent soit des images soit des mots selon votre sélection de mode de remplissage des jetons. Les jetons sont mélangés par l\'algorithme de Fisher-Yates pour qu\'ils ne reflètent jamais la disposition de la grille — cela garantit un jeu de bingo authentique où les jetons servent de référence d\'association plutôt que de révéler les réponses par position. Les joueurs utilisent les jetons pour identifier les éléments annoncés pendant le jeu.',
    },
    {
      question: 'Qu\'est-ce que la feuille d\'appel et comment fonctionne-t-elle ?',
      answer: 'La feuille d\'appel est une page séparée accessible via l\'onglet Appels qui affiche une grille dynamique de mots de tous les éléments uniques de la banque d\'images. Le meneur de jeu lit ces mots à voix haute pendant que les joueurs marquent les éléments correspondants sur leurs cartes bingo. Les colonnes sont calculées selon la longueur du mot le plus long (2 à 6 colonnes) avec une taille de police uniforme sur toutes les entrées pour une lisibilité claire. La grille est centrée sur la page et hérite des bordures et du fond du canevas principal. Ce n\'est pas un corrigé — le bingo n\'a pas de bonne réponse unique puisque chaque carte est différente.',
    },
    {
      question: 'Qu\'est-ce que la sélection personnalisée des appels ?',
      answer: 'Activez la case « Utiliser la sélection personnalisée » dans le panneau Paramètres de la Carte Bingo pour choisir manuellement quelles images spécifiques apparaissent dans la banque d\'appels. Lorsqu\'elle est activée, cliquez sur les images dans la Bibliothèque d\'Images pour les ajouter à votre sélection personnalisée — un compteur en temps réel affiche votre nombre de sélections au fur et à mesure. Cela vous donne un contrôle précis sur les éléments qui apparaissent dans le jeu de bingo, utile pour les activités alignées sur le programme, les événements thématiques ou toute situation où vous souhaitez choisir exactement les éléments que les joueurs rencontreront pendant la partie.',
    },
    {
      question: 'Le Créateur de Cartes Bingo est-il sensible à la langue ?',
      answer: 'Oui. En mode remplissage par mots pour les cases ou les jetons, les mots affichés sont les noms localisés des images de la Bibliothèque d\'Images. Changer la langue dans les Paramètres de la Fiche modifie les mots sur les cartes, les jetons et la feuille d\'appel. Par exemple, une image de chat affiche « Chat » en français mais « Katze » en allemand et « Cat » en anglais. Cela facilite la création de produits bingo vocabulaire multilingues à partir des mêmes images. Le mode remplissage par images n\'est pas sensible à la langue puisqu\'il affiche des illustrations plutôt que des mots.',
    },
    {
      question: 'Comment fonctionne l\'export ZIP par lot ?',
      answer: 'Après avoir généré plusieurs cartes bingo, cliquez sur le bouton d\'export par lot pour télécharger toutes les cartes en fichiers JPEG haute résolution individuels regroupés dans un seul fichier bingo_cards.zip grâce à la compression JSZip. Chaque carte est nommée séquentiellement dans le ZIP pour une organisation facile. Cela élimine le besoin de télécharger les cartes une par une — générez un ensemble complet de 10 cartes uniques et exportez-les toutes en un seul clic. L\'export ZIP fonctionne en parallèle des boutons de téléchargement JPEG et PDF individuels standard pour la carte affichée et la feuille d\'appel.',
    },
    {
      question: 'Quels formats de page et d\'export sont disponibles ?',
      answer: 'Les formats de page incluent Letter Portrait, Letter Paysage, A4 Portrait, A4 Paysage, Carré (1200×1200) et dimensions personnalisées. Exportez en JPEG haute résolution ou en PDF prêt à imprimer à 300 DPI (multiplicateur 6×, qualité JPEG 1.0). Activez les niveaux de gris pour une sortie économique en encre. Cinq options de téléchargement : fiche JPEG, appels JPEG, fiche PDF, appels PDF et export ZIP par lot de toutes les cartes générées. Tous les exports sont prêts pour la production pour les téléchargements numériques, les cahiers d\'activités imprimés et les supports de classe.',
    },
    {
      question: 'Peut-on vendre des cartes bingo créées avec cet outil à usage commercial ?',
      answer: 'Oui. Avec une licence commerciale, vous avez tous les droits pour vendre des cartes bingo en téléchargements numériques sur Etsy, cahiers d\'activités imprimés sur Amazon KDP, ressources pédagogiques sur TPT ou via tout autre canal de vente. Les tailles de grille configurables, la génération par lot, l\'export ZIP, les doubles modes de remplissage, les feuilles d\'appel dédiées, la sélection personnalisée des appels, le remplissage multilingue par mots et les 104 collections d\'images thématiques vous donnent tout le nécessaire pour créer des produits bingo professionnels compétitifs dans les catégories de jeux imprimables sur toutes les grandes places de marché.',
    },
    {
      question: 'Quelle est votre politique de remboursement ?',
      answer: 'Essayez avant d\'acheter grâce à notre essai gratuit — toutes les fonctionnalités sont disponibles pour que vous puissiez évaluer complètement l\'outil avant d\'acheter. Comme l\'essai gratuit vous donne un accès complet à toutes les tailles de grille, la génération par lot jusqu\'à 10 cartes, l\'export ZIP, les deux modes de remplissage pour les cases et les jetons, la feuille d\'appel, la sélection personnalisée des appels, les 104 thèmes, le téléchargement d\'images personnalisées, les thèmes de fond et de bordure, l\'export en niveaux de gris et tous les formats de téléchargement, nous n\'offrons pas de remboursement sur les achats de licence. Assurez-vous que l\'outil répond à vos besoins en utilisant l\'essai gratuit avant d\'acheter.',
    },
  ],

  internalLinks: [
    { pageType: 'app', slug: 'bingo-images-fiches', anchorText: 'Cartes Bingo à Images — Détails Complets du Produit' },
    { pageType: 'tool', slug: 'generateur-fiches-association', anchorText: 'Créateur de Fiches d\'Association' },
    { pageType: 'tool', slug: 'generateur-puzzle-grille', anchorText: 'Créateur de Puzzles Grille' },
    { pageType: 'tool', slug: 'generateur-discrimination-visuelle', anchorText: 'Créateur de Discrimination Visuelle' },
    { pageType: 'tool', slug: 'generateur-tri-images', anchorText: 'Créateur de Fiches Tri d\'Images' },
    { pageType: 'tool', slug: 'generateur-mots-caches', anchorText: 'Créateur de Mots Cachés' },
    { pageType: 'tool', slug: 'generateur-fiches-intrus', anchorText: 'Créateur de Fiches Intrus' },
    { pageType: 'tool', slug: 'generateur-pages-coloriage', anchorText: 'Créateur de Pages de Coloriage' },
  ],

  visuals: {
    heroImages: {
      primary: '/samples/french/bingo/Loto d\'Images 1.webp',
      primaryAlt: 'Carte bingo à images avec des illustrations thématiques dans une grille configurable et des jetons circulaires avec bordures en pointillés en dessous pour l\'association pendant le jeu de bingo',
    },
    sampleGallery: [
      {
        src: '/samples/french/bingo/Loto d\'Images 1.webp',
        alt: 'Carte bingo à images en mode remplissage images montrant des illustrations thématiques colorées dans les cases et des jetons circulaires à images avec bordures en pointillés',
        caption: 'Mode remplissage par images — illustrations colorées dans les cases de la carte et les jetons circulaires pour un bingo visuel',
      },
      {
        src: '/samples/french/bingo/Loto d\'Images 2.webp',
        alt: 'Carte bingo à images en mode remplissage par mots montrant les noms localisés des images dans les cases et les jetons à mots pour un bingo vocabulaire',
        caption: 'Mode remplissage par mots — noms localisés des images pour des produits bingo vocabulaire multilingues',
      },
      {
        src: '/samples/french/bingo/Loto d\'Images 3.webp',
        alt: 'Feuille d\'appel bingo avec grille dynamique de mots montrant tous les éléments du jeu organisés en colonnes pour le meneur de jeu',
        caption: 'Feuille d\'appel — grille dynamique de mots avec colonnes calculées et taille de police uniforme pour le meneur de jeu',
      },
    ],
    youtubeId: 'd6AOiDXoK1c',
    videoTitle: 'Comment Créer des Cartes Bingo à Images avec Génération par Lot, Export ZIP, Doubles Modes de Remplissage et Feuilles d\'Appel — Tutoriel Étape par Étape',
  },
};

export default content;
