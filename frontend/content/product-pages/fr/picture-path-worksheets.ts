import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Picture Path Worksheets - French Content
 *
 * File: frontend/content/product-pages/fr/picture-path-worksheets.ts
 * URL: /fr/apps/parcours-images-fiches (French SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/French/picture-path.md
 * App ID: picture-path (Visual maze/path worksheets)
 * Bundle: Full Access ($240/year) - NOT Core Bundle
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const picturePathFrContent: ProductPageContent = {
  // SEO Metadata - French language-specific
  seo: {
    slug: 'parcours-images-fiches',
    appId: 'picture-path',
    title: 'Fiches à Imprimer Gratuit | Générateur de Parcours d\'Images - Fiches Maternelle et Exercices CP',
    description: 'Créez des parcours d\'images professionnels en quelques clics. Notre générateur transforme vos fiches maternelle en activités ludiques et éducatives. Parfait pour le graphisme maternelle et les exercices CP. Téléchargez en PDF haute résolution en 3 minutes.',
    keywords: 'fiches à imprimer gratuit, fiches maternelle, parcours images, labyrinthe, exercices CP, graphisme maternelle, motricité fine, coloriage à imprimer, exercices maths, apprendre à lire, alphabet, tables de multiplication',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fr/apps/parcours-images-fiches',
  },

  // Hero Section - FULL text from picture-path.md paragraphs 1-4
  hero: {
    title: 'Générateur de Parcours d\'Images',
    subtitle: 'Fiches Maternelle et Exercices CP - Fiches à Imprimer Gratuit',
    description: `Créez des parcours d'images professionnels en quelques clics. Notre générateur transforme vos fiches maternelle en activités ludiques et éducatives. Parfait pour le graphisme maternelle et les exercices CP. Les enfants adorent suivre les chemins visuels tout en apprenant.

Votre abonnement Full Access vous donne un accès illimité. Créez autant de fiches à imprimer gratuit que nécessaire. Pas de frais supplémentaires par fiche. Téléchargez des parcours d'images de qualité professionnelle en 3 minutes.

Le générateur propose trois modes de jeu différents. Le mode Parcours d'Images crée des chemins entre images. Le mode Labyrinthe Classique génère des labyrinthes avec images à collectionner. Le mode Choisir le Bon Chemin propose plusieurs chemins dont un seul est correct. Chaque mode s'adapte aux besoins de vos élèves.

Les fiches maternelle créées développent plusieurs compétences. Le graphisme maternelle progresse en suivant les lignes. La motricité fine s'améliore avec le tracé des chemins. La concentration augmente en cherchant le bon parcours. Les exercices CP renforcent la logique et le raisonnement spatial.`,
    previewImageSrc: '/samples/english/picture path/picture path.jpeg',
    ctaLabels: {
      tryFree: 'Essayer Gratuitement',
      viewSamples: 'Voir les Exemples',
    },
    trustBadges: {
      languages: '11 Langues',
      images: '3000+ Images',
      license: 'Licence Commerciale',
    },
    readMoreLabel: 'Lire la suite',
    showLessLabel: 'Voir moins',
    floatingStats: {
      time: '3 min',
      action: 'Créer & Télécharger',
      quality: '300 DPI',
    },
  },

  // Sample Gallery - REAL file paths from samples/english/picture path/
  samples: {
    sectionTitle: 'Exemples de Fiches Parcours d\'Images',
    sectionDescription: 'Téléchargez des exemples gratuits pour voir notre qualité professionnelle',
    downloadLabel: 'Télécharger Exemple Gratuit',
    worksheetLabel: 'Fiche',
    answerKeyLabel: 'Corrigé',
    viewAllLabel: 'Agrandir',
    noPdfLabel: 'Aperçu uniquement',
    freePdfCountLabel: 'téléchargements gratuits',
    badgeText: 'Exemples Gratuits',
    downloadingLabel: 'Téléchargement...',
    ofLabel: 'sur',
    items: [
      {
        id: '1',
        worksheetSrc: '/samples/english/picture path/picture path.jpeg',
        answerKeySrc: '/samples/english/picture path/picture path answer_key.jpeg',
        altText: 'Fiche parcours d\'images pour maternelle avec corrigé - graphisme et motricité fine',
        pdfDownloadUrl: '/samples/english/picture path/picture path.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/english/picture path/classic maze.jpeg',
        answerKeySrc: '/samples/english/picture path/classic maze answer_key.jpeg',
        altText: 'Fiche labyrinthe classique avec corrigé pour exercices CP et raisonnement spatial',
        pdfDownloadUrl: '/samples/english/picture path/classic maze.pdf',
      },
      {
        id: '3',
        worksheetSrc: '/samples/english/picture path/right path.jpeg',
        answerKeySrc: '/samples/english/picture path/right path answer_key.jpeg',
        altText: 'Fiche choisir le bon chemin avec corrigé - logique et concentration pour maternelle',
        pdfDownloadUrl: '/samples/english/picture path/right path.pdf',
      },
    ],
  },

  // Features Grid - FULL text from picture-path.md feature sections
  features: {
    sectionTitle: 'Fonctionnalités du Générateur - Fiches Maternelle et Exercices CP pour Tous Vos Besoins',
    sectionDescription: 'Notre générateur de parcours d\'images offre tout ce dont vous avez besoin. Créez des fiches maternelle professionnelles en quelques clics. Générez des exercices CP adaptés à chaque élève. Les fiches à imprimer gratuit se personnalisent entièrement. Chaque fonctionnalité a été conçue pour les enseignants français.',
    highlightBadgeText: 'Fonctionnalité Clé',
    readMoreLabel: 'Lire la suite',
    showLessLabel: 'Voir moins',
    badgeText: 'Fonctionnalités',
    trustBadges: {
      allFeatures: 'Toutes les fonctionnalités incluses',
      noHiddenFees: 'Aucun frais caché',
      cancelAnytime: 'Résiliez à tout moment',
    },
    items: [
      {
        id: '1',
        icon: '⚡',
        title: 'Créer des Fiches Maternelle en 3 Clics - Exercices CP et Graphisme Maternelle Rapides',
        description: `La création de fiches maternelle ne prend que quelques secondes. Sélectionnez le mode de jeu qui convient. Choisissez vos images de départ et d'arrivée. Cliquez sur Créer et votre fiche apparaît instantanément. Le système génère automatiquement les parcours et labyrinthes.

Les exercices CP se créent aussi rapidement. Pas besoin de compétences en design graphique. Pas besoin de logiciels compliqués. Tout fonctionne directement dans votre navigateur. Le graphisme maternelle professionnel est garanti à chaque fois.

Trois modes de jeu s'offrent à vous. Le Parcours d'Images relie des images dans un chemin. Le Labyrinthe Classique génère des labyrinthes traditionnels avec images collectables. Choisir le Bon Chemin propose plusieurs chemins dont un seul est correct. Chaque mode crée des exercices différents et complémentaires.`,
        highlighted: false,
      },
      {
        id: '2',
        icon: '✏️',
        title: 'Édition Complète des Fiches à Imprimer Gratuit - Personnalisez Vos Exercices Maths et Calcul',
        description: `Chaque élément sur la fiche se modifie librement. Cliquez sur n'importe quelle image pour la sélectionner. Déplacez-la en glissant avec la souris. Redimensionnez-la en tirant les coins. Faites-la pivoter à l'angle souhaité. Verrouillez les éléments pour éviter les modifications accidentelles.

Les exercices maths deviennent faciles à personnaliser. Ajoutez des nombres sur les images du parcours. Créez des chemins qui suivent l'ordre numérique. Intégrez des opérations de calcul le long du labyrinthe. Les enfants pratiquent le calcul tout en suivant le chemin.

Les outils de texte enrichissent vos fiches. Ajoutez des titres et des instructions personnalisées. Choisissez parmi 7 polices adaptées aux enfants. Modifiez la taille du texte de 8 à 200 pixels. Changez la couleur du texte et du contour. Créez des consignes claires et lisibles.`,
        highlighted: true,
      },
      {
        id: '3',
        icon: '📤',
        title: 'Importez Vos Images pour des Exercices CP et Coloriage à Imprimer Personnalisés',
        description: `L'importation d'images personnelles enrichit vos fiches. Téléchargez plusieurs fichiers simultanément. Tous les formats courants sont acceptés : JPEG, PNG, GIF. Combinez vos photos avec la bibliothèque intégrée. Créez des fiches ultra-personnalisées pour vos élèves.

Le coloriage à imprimer devient unique avec vos images. Importez des dessins créés par vos élèves. Utilisez des photos de sorties scolaires. Ajoutez des images de projets de classe. Les enfants adorent retrouver des éléments familiers dans leurs exercices.

Les photos des élèves rendent les activités motivantes. Créez un parcours avec les photos de la classe. Les enfants cherchent leur photo dans le labyrinthe. L'engagement augmente significativement. L'apprentissage devient personnel et amusant.`,
        highlighted: false,
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Fiches Maternelle Multilingues - Apprendre à Lire et Alphabet dans 11 Langues',
        description: `Le générateur fonctionne en 11 langues différentes. L'interface s'affiche en français, anglais, allemand, espagnol, italien. Le portugais brésilien, néerlandais, suédois, danois, norvégien et finnois sont aussi disponibles. Changez de langue en un clic depuis les paramètres.

La bibliothèque d'images s'adapte à chaque langue. Les noms de fichiers changent selon la langue sélectionnée. Créez des exercices pour apprendre à lire dans différentes langues. Les parcours d'images deviennent des outils d'apprentissage linguistique. Parfait pour les classes bilingues et l'enseignement des langues étrangères.

Les activités sur l'alphabet bénéficient du support multilingue. Créez des parcours suivant l'ordre alphabétique. Générez des labyrinthes avec des lettres à collectionner. Les enfants apprennent les lettres en français et dans d'autres langues. L'apprentissage de l'alphabet devient international.`,
        highlighted: false,
      },
      {
        id: '5',
        icon: '💰',
        title: 'Licence Commerciale Incluse - Vendez Vos Fiches à Imprimer Gratuit et Exercices Maths',
        description: `Votre abonnement Full Access inclut une licence commerciale complète. Vendez légalement toutes les fiches que vous créez. Pas de frais de licence supplémentaires. Pas d'attribution requise sur vos créations. Vous gardez 100% de vos revenus de vente.

Les plateformes de vente adorent les parcours d'images. Teachers Pay Teachers accueille des milliers d'enseignants vendeurs. Etsy attire les parents cherchant des ressources éducatives. Amazon KDP permet de créer des livres d'activités imprimables. Votre catalogue de fiches maternelle trouve facilement des acheteurs.

Les packs d'exercices maths se vendent particulièrement bien. Créez 10 parcours sur les nombres de 1 à 10. Générez 15 labyrinthes sur les formes géométriques. Assemblez 20 activités sur le calcul mental. Vendez ces packs entre 3€ et 8€ selon la quantité.`,
        highlighted: true,
      },
      {
        id: '6',
        icon: '🎨',
        title: 'Bibliothèque de 3000+ Images - Coloriage et Graphisme Maternelle avec Thèmes Variés',
        description: `La bibliothèque contient plus de 3000 images adaptées aux enfants. Toutes les images sont organisées par thèmes. Animaux, nourriture, transports, objets du quotidien, nature, fêtes. Trouvez rapidement les images dont vous avez besoin. La fonction de recherche filtre les résultats instantanément.

Les activités de graphisme maternelle utilisent ces images quotidiennement. Créez des parcours avec des images de formes géométriques. Générez des labyrinthes avec des lignes et des courbes. Les enfants développent leur motricité fine en suivant les chemins. Le graphisme devient ludique et motivant.

Le coloriage se combine parfaitement avec les parcours. Imprimez les fiches en niveau de gris. Les enfants colorient les images du parcours. Puis ils tracent le chemin avec une couleur différente. Deux activités en une seule fiche. Le temps d'occupation double sans effort supplémentaire.`,
        highlighted: false,
      },
      {
        id: '7',
        icon: '📊',
        title: 'Qualité Professionnelle 300 DPI - Fiches à Imprimer Gratuit et Exercices CP Parfaits',
        description: `Les exports atteignent une résolution de 300 DPI. Cette qualité garantit des impressions nettes et claires. Les lignes restent précises même sur du papier standard. Les couleurs ressortent vives et éclatantes. Les détails des images restent visibles.

Les formats PDF et JPEG répondent à tous les besoins. Le PDF préserve la qualité maximale pour l'impression. Le JPEG facilite le partage numérique avec les parents. Les deux formats se téléchargent en quelques secondes. Choisissez selon votre utilisation prévue.

L'option niveau de gris économise l'encre d'impression. Activez cette option avant le téléchargement. Les couleurs se convertissent automatiquement en nuances de gris. La qualité visuelle reste excellente. Votre budget encre diminue significativement. Les écoles apprécient particulièrement cette économie.`,
        highlighted: false,
      },
      {
        id: '8',
        icon: '🔧',
        title: 'Corrigés Automatiques - Gagnez du Temps sur la Correction des Exercices',
        description: `Le système génère automatiquement le corrigé avec solution. Plus besoin de tracer manuellement les réponses. Gagnez des heures de préparation chaque semaine. Téléchargez la fiche et le corrigé en PDF haute résolution. Parfait pour l'impression et la distribution en classe.

Les corrigés automatiques facilitent la correction. Chaque labyrinthe génère sa solution automatiquement. Le chemin correct apparaît clairement tracé. Plus besoin de résoudre vous-même les parcours. Gagnez 5 à 10 minutes par fiche sur la correction. Votre temps se concentre sur l'enseignement, pas sur la préparation.

La compatibilité d'impression est totale. Format A4 pour l'Europe. Format Lettre pour l'Amérique du Nord. Format carré pour les projets spéciaux. Orientations portrait et paysage disponibles. Chaque fiche s'imprime parfaitement sur votre imprimante habituelle.`,
        highlighted: false,
      },
    ],
  },

  // How-To Guide - FULL text from picture-path.md step sections
  howTo: {
    sectionTitle: 'Comment Créer des Fiches Maternelle et Exercices CP en 5 Étapes Simples',
    sectionDescription: 'La création de fiches maternelle prend moins de 3 minutes au total. Suivez ces cinq étapes faciles pour créer vos exercices CP professionnels. Aucune compétence technique n\'est requise. Le processus est intuitif et rapide. Vos fiches seront prêtes pour l\'impression en quelques clics.',
    ctaText: 'Commencer Maintenant',
    badgeText: 'Guide Étape par Étape',
    stepLabel: 'Étape',
    completionTitle: 'Terminé !',
    completionSubtitle: 'Votre fiche est prête',
    readyTime: 'Prêt en moins de 3 minutes',
    noSkillsNeeded: 'Aucune compétence en design requise',
    readMoreLabel: 'Lire la suite',
    showLessLabel: 'Voir moins',
    steps: [
      {
        id: '1',
        number: 1,
        title: 'Étape 1 : Sélectionner les Images - Fiches à Imprimer Gratuit et Coloriage pour Votre Thème',
        description: `Ouvrez la section Bibliothèque d'Images dans le panneau latéral. Choisissez d'abord le type d'image à ajouter. Sélectionnez Image de Départ pour le point de départ du parcours. Une seule image de départ est nécessaire pour chaque fiche.

Parcourez les thèmes disponibles dans le menu déroulant. Plus de 50 thèmes organisent les 3000+ images. Animaux, nourriture, transports, nature, fêtes, objets du quotidien. Cliquez sur un thème pour voir toutes les images correspondantes. La barre de recherche filtre rapidement par mot-clé.

Cliquez sur l'image de votre choix pour l'ajouter. Elle apparaît dans le panneau de sélection en bas. Le compteur indique combien d'images sont sélectionnées. Répétez le processus pour l'Image d'Arrivée. Choisissez ensuite au moins une Image de Parcours.

Les Images Distractrices ajoutent de la difficulté. Sélectionnez au moins 6 images distractrices recommandées. Plus vous en ajoutez, plus l'exercice devient difficile. Les enfants doivent distinguer le bon chemin des faux chemins. Cette sélection crée l'aspect pédagogique du labyrinthe.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Étape 2 : Personnaliser les Réglages - Exercices Maths et Tables de Multiplication Adaptés',
        description: `Ouvrez la section Configuration du Parcours dans le panneau. Sélectionnez d'abord le mode de jeu souhaité. Parcours d'Images crée un chemin simple entre images. Labyrinthe Classique génère un vrai labyrinthe avec murs. Choisir le Bon Chemin propose plusieurs chemins possibles.

Les exercices maths utilisent parfaitement les trois modes. Créez un Parcours d'Images avec des nombres à suivre dans l'ordre. Les enfants comptent de 1 à 10 en suivant le chemin. Ou générez un Labyrinthe Classique avec des opérations mathématiques. Les élèves collectent les bonnes réponses en résolvant le labyrinthe.

Les tables de multiplication s'intègrent naturellement dans les parcours. Placez les résultats de la table de 2 le long du bon chemin. Les résultats incorrects deviennent des distracteurs. L'enfant suit uniquement les multiples de 2, 3, 5 ou 10. Cette méthode rend l'apprentissage des tables de multiplication ludique et visuel.

Ajustez la taille de la grille selon la difficulté souhaitée. 12×12 convient parfaitement pour les débutants en maternelle. 13×13 ou 14×14 augmentent la complexité pour le CP. 15×15 créent des labyrinthes plus longs et difficiles. La taille influence directement la durée de l'activité.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Étape 3 : Générer Votre Fiche Maternelle - Exercices CP et Graphisme Maternelle Automatiques',
        description: `Cliquez sur le bouton Créer en haut à droite. Le système génère automatiquement votre fiche en quelques secondes. L'algorithme place intelligemment toutes les images sélectionnées. Le parcours ou labyrinthe se crée selon vos réglages. Aucune intervention manuelle n'est nécessaire.

La fiche maternelle apparaît instantanément sur le canevas. Toutes les images de départ, parcours et arrivée sont positionnées. Les images distractrices remplissent l'espace restant. Le chemin correct est défini mais invisible pour l'élève. Seul le corrigé montre la solution complète.

Les exercices CP générés sont immédiatement utilisables. Les espacements entre images sont optimaux pour le tracé. La taille des images favorise la concentration visuelle. Les chemins évitent les croisements complexes pour les jeunes élèves. Le niveau de difficulté correspond à vos réglages.

L'onglet Corrigé se génère simultanément. Basculez entre Fiche et Corrigé avec les onglets en haut. Le corrigé affiche clairement le chemin correct. Une ligne colorée traverse le parcours de départ à arrivée. Vous voyez immédiatement la solution pour vérifier le travail des élèves.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Étape 4 : Modifier sur le Canevas - Écriture Cursive et Alphabet Personnalisables',
        description: `Le canevas d'édition offre un contrôle total sur chaque élément. Cliquez sur n'importe quelle image pour la sélectionner. Les poignées de redimensionnement apparaissent autour de l'image. Déplacez, tournez, agrandissez ou réduisez librement. Chaque modification se fait en temps réel.

Ajoutez du texte personnalisé avec les Outils de Texte. Cliquez sur Ajouter du Texte dans le panneau latéral. Tapez votre instruction ou votre titre. Le texte apparaît au centre du canevas. Déplacez-le où vous le souhaitez sur la fiche.

L'écriture cursive se pratique facilement avec les outils de texte. Sélectionnez une police cursive dans le menu déroulant. Écrivez un mot ou une phrase modèle. Les enfants tracent par-dessus pour pratiquer l'écriture. Ou ils copient le modèle sur les lignes vierges en dessous.

Les activités sur l'alphabet utilisent le texte de multiples façons. Ajoutez les lettres A, B, C le long du parcours. Les enfants suivent l'ordre alphabétique pour trouver le chemin. Ou placez une lettre majuscule au départ et sa minuscule à l'arrivée. L'association majuscule-minuscule devient un jeu de parcours.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Étape 5 : Télécharger et Imprimer - Fiches à Imprimer Gratuit et Exercices pour Apprendre à Lire',
        description: `Cliquez sur le bouton Télécharger en haut à droite. Un menu déroulant affiche toutes les options d'export. Choisissez entre formats JPEG et PDF selon vos besoins. Sélectionnez Fiche pour la version élève ou Corrigé pour la solution.

Les fiches à imprimer gratuit se téléchargent en haute qualité 300 DPI. Cette résolution garantit une impression nette et professionnelle. Les lignes restent précises sur tout type de papier. Les couleurs s'impriment vivement sans bavures. La qualité égale celle des ressources commerciales.

Le format PDF convient parfaitement pour l'archivage et le partage. Sauvegardez vos fiches dans un dossier organisé par thème. Partagez-les avec vos collègues par email. Imprimez-les à la demande sans perte de qualité. Le PDF préserve exactement votre mise en page.

Activez l'option Niveau de Gris avant le téléchargement pour économiser l'encre. Les couleurs se convertissent automatiquement en nuances de gris. La qualité visuelle reste excellente pour les activités de tracé. Votre budget d'impression diminue significativement. Cette option est parfaite pour les grandes quantités de fiches.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from picture-path.md use case sections
  useCases: {
    sectionTitle: 'Parfait pour les Enseignants et Parents - Fiches Maternelle et Exercices CP pour Tous les Besoins',
    sectionDescription: 'Le générateur de parcours d\'images répond aux besoins de tous les éducateurs. Les enseignants de maternelle l\'utilisent quotidiennement pour le graphisme. Les professeurs de CP créent des exercices de lecture. Les parents en IEF génèrent des activités variées. Les enseignants de langues étrangères multiplient les ressources multilingues. Les professeurs spécialisés adaptent chaque fiche aux besoins spécifiques. Les enseignants entrepreneurs vendent leurs créations en ligne.',
    badgeText: 'Cas d\'Utilisation',
    readMoreLabel: 'Lire la suite',
    showLessLabel: 'Voir moins',
    items: [
      {
        id: '1',
        icon: '👩‍🏫',
        title: 'Enseignants de Maternelle - Graphisme Maternelle et Coloriage à Imprimer pour PS/MS/GS',
        subtitle: 'Graphisme et préparation à l\'écriture',
        description: `Les enseignants de maternelle utilisent les parcours d'images tous les jours. Le graphisme maternelle s'enseigne parfaitement avec les labyrinthes. Les enfants de Petite Section tracent des chemins simples et larges. Les élèves de Moyenne Section suivent des parcours plus complexes. Les GS résolvent des labyrinthes avec virages et intersections.

Le graphisme maternelle progresse naturellement avec les parcours. Les premiers labyrinthes développent le contrôle du crayon. Les tracés droits renforcent la motricité fine. Les courbes préparent l'écriture des lettres rondes. Les changements de direction exercent la coordination œil-main. Chaque fiche construit les bases de l'écriture.

Le coloriage à imprimer se combine avec les parcours visuels. Imprimez les fiches en niveau de gris. Les enfants colorient d'abord les images du bon chemin. Puis ils tracent le parcours avec une couleur contrastante. Cette double activité maintient l'attention plus longtemps. Le temps d'occupation augmente significativement.`,
        quote: 'Mes élèves adorent les parcours d\'images avec les animaux !',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Enseignants de CP et CE1 - Alphabet, Écriture Cursive et Apprendre à Lire avec des Parcours',
        subtitle: 'Renforcement des apprentissages fondamentaux',
        description: `Les enseignants de CP et CE1 intègrent les parcours dans l'apprentissage de la lecture. Les activités sur l'alphabet commencent dès septembre. Créez des parcours suivant l'ordre alphabétique des images. Les enfants relient Apple, Banana, Cat, Dog en ordre. L'association lettre-son se renforce visuellement.

L'écriture cursive s'exerce avec les outils de texte du générateur. Ajoutez un modèle en écriture cursive au-dessus du parcours. Les enfants copient le mot sur des lignes vierges. Puis ils tracent le parcours vers l'image correspondante. La lecture, l'écriture et la motricité se travaillent simultanément.

Les exercices pour apprendre à lire se multiplient avec ce générateur. Créez des parcours phonétiques avec des images commençant par le même son. Générez des labyrinthes syllabiques où chaque image contient "pa". Les enfants identifient les sons initiaux, médians ou finaux. La conscience phonologique se développe en jouant.`,
        quote: 'Le tracé renforce la fluidité du geste avant l\'écriture.',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Parents en IEF - Exercices Maths et Tables de Multiplication à la Maison',
        subtitle: 'Apprentissage personnalisé à la maison',
        description: `Les parents pratiquant l'instruction en famille adorent ce générateur. Les exercices maths se créent en quelques minutes chaque matin. Pas besoin de manuels coûteux. Pas besoin de photocopies. Un abonnement remplace des centaines d'euros de matériel. L'investissement est rapidement rentabilisé.

Les exercices maths couvrent tous les concepts de maternelle et CP. Créez des parcours de comptage de 1 à 10. Générez des labyrinthes avec les nombres pairs ou impairs. Ajoutez des formes géométriques à identifier et suivre. Les mathématiques visuelles captivent les jeunes apprenants.

Les tables de multiplication s'apprennent naturellement avec les parcours. Créez un labyrinthe où le bon chemin contient tous les multiples de 2. Les distracteurs affichent d'autres nombres. L'enfant calcule mentalement 2×1, 2×2, 2×3 pour trouver le chemin. Cette méthode active la mémorisation par la pratique.`,
        quote: 'Un outil adapté au rythme de chaque enfant.',
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Enseignants de Langues Étrangères - Fiches Maternelle Multilingues et Alphabet International',
        subtitle: 'Vocabulaire multilingue et apprentissage des lettres',
        description: `Les enseignants de FLE et de langues étrangères exploitent le multilingue. Les fiches maternelle se créent instantanément en 11 langues. Changez la langue dans les paramètres. Toute la bibliothèque d'images s'adapte automatiquement. Les noms de fichiers se traduisent. Le vocabulaire thématique devient multilingue.

Les cours d'anglais utilisent les parcours pour le vocabulaire. Créez un labyrinthe avec des images d'animaux. Les noms apparaissent en anglais dans les fichiers. Les enfants apprennent cat, dog, bird en suivant le chemin. L'association mot-image se fait naturellement.

L'alphabet international s'enseigne facilement avec les parcours. Comparez l'alphabet français avec l'alphabet finnois. Montrez les lettres spéciales de chaque langue. Créez des parcours A-Ö en suédois. Générez des labyrinthes A-Å en danois et norvégien. Les différences alphabétiques deviennent visibles.`,
        quote: 'Le support multilingue est essentiel pour mes élèves allophones.',
      },
      {
        id: '5',
        icon: '💜',
        title: 'Enseignants Spécialisés - Fiches à Imprimer Gratuit Adaptées et Graphisme Maternelle Différencié',
        subtitle: 'Différenciation et adaptation aux besoins spécifiques',
        description: `Les enseignants spécialisés personnalisent chaque fiche aux besoins individuels. Les ULIS, SEGPA, RASED utilisent quotidiennement ces parcours. Les fiches à imprimer gratuit s'adaptent à tous les profils. La simplicité du générateur convient aux élèves en difficulté. Chacun réussit à son niveau.

Le graphisme maternelle s'adapte parfaitement aux besoins spéciaux. Agrandissez les espaces entre les murs pour les élèves dyspraxiques. Réduisez le nombre d'images distractrices pour les TDAH. Utilisez des couleurs contrastées pour les malvoyants. Chaque paramètre se personnalise finement.

Les élèves avec troubles attentionnels réussissent mieux avec moins de distracteurs. Créez des parcours simples avec seulement 2-3 images distractrices. Les chemins deviennent plus évidents. La frustration diminue. La confiance en soi augmente. Les enfants restent motivés plus longtemps.`,
        quote: 'Je peux adapter les fiches pour chaque élève de ma classe ULIS.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Enseignants Entrepreneurs - Vendre des Exercices CP et Tables de Multiplication en Ligne',
        subtitle: 'Licence commerciale incluse pour TPT, Etsy et Amazon KDP',
        description: `Les enseignants entrepreneurs génèrent des revenus avec leurs créations. Les exercices CP se vendent très bien sur Teachers Pay Teachers. Les packs de tables de multiplication trouvent des acheteurs quotidiennement. Votre licence commerciale Full Access autorise toutes les ventes. Aucun frais supplémentaire. Vous gardez 100% de vos bénéfices après commission de plateforme.

Les packs d'exercices CP ciblés attirent les acheteurs. Créez 20 parcours sur les sons simples. Générez 15 labyrinthes sur les syllabes. Assemblez 25 activités sur les mots-outils. Vendez ces packs 4€ à 7€ selon le contenu. Les enseignants préfèrent les ressources prêtes à l'emploi.

Les tables de multiplication en parcours visuels sont très recherchées. Créez un pack complet : tables de 2 à 10. Générez 3 niveaux de difficulté pour chaque table. Fournissez les corrigés systématiquement. Vendez ce pack premium 8€ à 12€. Les parents et enseignants achètent massivement en début d'année.`,
        quote: 'Mon abonnement s\'est rentabilisé dès le premier mois de ventes !',
      },
    ],
  },

  // FAQ Section - Selected FAQs from picture-path.md
  faq: {
    sectionTitle: 'Questions Fréquentes - Alphabet, Écriture Cursive, Tables de Multiplication et Plus',
    sectionDescription: 'Les enseignants posent régulièrement les mêmes questions avant de s\'abonner. Voici les réponses détaillées aux questions les plus fréquentes. Chaque réponse vous aide à comprendre exactement comment le générateur fonctionne. Vous saurez précisément ce que vous pouvez créer.',
    showMoreText: 'Voir plus de questions',
    showLessText: 'Voir moins',
    badgeText: 'FAQ',
    readMoreLabel: 'Lire la suite',
    showLessLabel: 'Voir moins',
    secureCheckout: 'Paiement sécurisé',
    cancelAnytime: 'Résiliez à tout moment',
    items: [
      {
        id: '1',
        question: 'Comment créer des fiches à imprimer gratuit avec parcours d\'images ?',
        answer: `Créer des fiches à imprimer gratuit prend moins de 3 minutes totales. Ouvrez d'abord le générateur dans votre navigateur. Sélectionnez vos images de départ, parcours et arrivée. Choisissez le mode de jeu souhaité. Cliquez sur Créer. Le système génère instantanément votre fiche complète.

Les fiches à imprimer gratuit signifient que vous créez autant de fiches que nécessaire. Aucune limite de création mensuelle ou annuelle. Aucun frais par fiche générée. Votre abonnement Full Access couvre tout. Créez 5 fiches ou 500 fiches par mois. Le prix reste identique.

Téléchargez ensuite en PDF ou JPEG haute résolution. Imprimez immédiatement ou sauvegardez pour plus tard. Distribuez gratuitement à vos élèves. Partagez librement avec vos collègues enseignants. La création et l'utilisation pédagogique restent totalement gratuites après l'abonnement.`,
      },
      {
        id: '2',
        question: 'Les parcours conviennent-ils pour apprendre à lire en maternelle et CP ?',
        answer: `Les parcours sont excellents pour apprendre à lire dès la maternelle. Les activités phonologiques utilisent des images commençant par le même son. Créez un parcours avec Apple, Ant, Alligator pour le son "a". Les enfants identifient le son initial visuellement. La conscience phonologique se développe naturellement.

Pour apprendre à lire en CP, créez des parcours syllabiques. Sélectionnez des images contenant la syllabe "pa" : papa, panda, parachute. Les enfants suivent uniquement les images avec "pa". Ou générez des labyrinthes avec des mots-outils fréquents. Les élèves lisent "le", "la", "un", "une" en traçant.

Les parcours combinent lecture et motricité simultanément. L'enfant lit le mot, identifie l'image, trace le chemin. Trois compétences travaillées ensemble. L'engagement augmente significativement. Les résultats d'apprentissage s'améliorent de 30 à 40% selon les retours d'enseignants.`,
      },
      {
        id: '3',
        question: 'Puis-je enseigner l\'écriture cursive avec les parcours d\'images ?',
        answer: `Oui, l'écriture cursive s'enseigne parfaitement avec les outils de texte intégrés. Ajoutez un modèle en police cursive au-dessus de votre parcours. Écrivez le mot "chat" en écriture cursive. L'enfant copie le modèle sur des lignes vierges. Puis il trace le parcours vers l'image du chat.

L'écriture cursive bénéficie de la combinaison écriture-motricité. Le tracé des lettres cursives réchauffe la main. Le tracé du parcours renforce la motricité fine. Les deux activités se complètent parfaitement. La progression en écriture s'accélère naturellement.

Créez des progressions d'écriture cursive mensuelles. Septembre : lettres rondes a, o, c, d, q. Octobre : lettres à ponts n, m, p, r. Novembre : lettres complexes f, g, j, y. Les parcours intègrent chaque nouvelle lettre. L'apprentissage devient structuré et progressif.`,
      },
      {
        id: '4',
        question: 'Comment intégrer les tables de multiplication dans les labyrinthes ?',
        answer: `Les tables de multiplication s'intègrent facilement dans les labyrinthes. Créez un labyrinthe classique avec le générateur. Ajoutez ensuite du texte sur chaque image du bon chemin. Placez les résultats de la table de 2 : 2, 4, 6, 8, 10, 12. Les images distractrices reçoivent d'autres nombres.

Les tables de multiplication deviennent un jeu de détective mathématique. L'enfant calcule mentalement 2×1, 2×2, 2×3. Il cherche ces résultats dans le labyrinthe. Seul le chemin avec tous les multiples de 2 est correct. Cette méthode active la mémorisation par la pratique.

Variez les difficultés des tables de multiplication progressivement. Commencez avec la table de 2 uniquement. Puis combinez tables de 2 et 5. Ajoutez ensuite table de 10. Terminez avec toutes les tables mélangées. La complexité augmente au rythme de l'élève.`,
      },
      {
        id: '5',
        question: 'Les activités de coloriage fonctionnent-elles avec les parcours ?',
        answer: `Absolument, le coloriage fonctionne parfaitement avec tous les parcours. Téléchargez votre fiche en activant l'option Niveau de Gris. Les couleurs se convertissent automatiquement. Imprimez cette version noir et blanc. Les enfants colorient ensuite toutes les images avant de tracer.

Le coloriage transforme chaque parcours en double activité. Première étape : colorier les images selon les consignes. Deuxième étape : tracer le chemin du début à la fin. Le temps d'occupation double de 10 à 25 minutes. Vous créez moins de fiches pour le même temps de classe.

Les activités de coloriage développent des compétences complémentaires. Le respect des contours améliore la précision. Le choix des couleurs stimule la créativité. La concentration se maintient plus longtemps. Le calme s'installe dans la classe. Les enseignants apprécient particulièrement ce double bénéfice.`,
      },
      {
        id: '6',
        question: 'Comment adapter le graphisme maternelle selon les niveaux PS/MS/GS ?',
        answer: `Le graphisme maternelle s'adapte facilement à chaque niveau. Pour la Petite Section, créez des grilles 12×12 avec très peu de distracteurs. Les chemins restent simples et directs. L'épaisseur des murs augmente à 8-10 pixels. Les images sont grandes et espacées.

Le graphisme maternelle en Moyenne Section utilise des grilles 13×13. Ajoutez davantage d'images distractrices. Les virages deviennent plus fréquents. L'épaisseur des murs diminue à 5-7 pixels. La difficulté augmente progressivement.

Pour les GS, le graphisme maternelle se complexifie encore. Utilisez des grilles 14×14 ou 15×15. Multipliez les images distractrices. Les chemins comportent plusieurs intersections. L'épaisseur des murs descend à 3-5 pixels. Les élèves se préparent au CP.`,
      },
      {
        id: '7',
        question: 'Peut-on créer des exercices maths visuels avec les parcours ?',
        answer: `Oui, les exercices maths visuels se créent très facilement. Pour le comptage, placez des nombres 1, 2, 3, 4, 5 le long du bon chemin. Les distracteurs affichent des nombres hors séquence. L'enfant suit l'ordre numérique pour trouver le chemin. Le comptage devient visuel et ludique.

Les exercices maths sur les formes géométriques fonctionnent parfaitement. Sélectionnez uniquement des images de cercles pour le bon chemin. Les distracteurs montrent carrés, triangles, rectangles. Ou créez un parcours alternant cercle-carré-cercle-carré. Les motifs mathématiques se visualisent clairement.

Les exercices maths de comparaison utilisent les quantités. Le bon chemin contient toujours le plus grand nombre. Ou seulement les nombres pairs. Les possibilités sont infinies. Chaque concept mathématique trouve son application visuelle.`,
      },
      {
        id: '8',
        question: 'L\'alphabet international s\'enseigne-t-il dans toutes les langues ?',
        answer: `Oui, l'alphabet s'enseigne dans les 11 langues disponibles. Basculez la langue dans les paramètres. La bibliothèque d'images s'adapte automatiquement. Les noms de fichiers changent selon la langue. Créez un parcours alphabétique A-Z en anglais. Générez le même en allemand avec Ä, Ö, Ü.

L'alphabet suédois, danois et norvégien incluent Å, Ä/Æ, Ö/Ø. Le finnois possède Ä et Ö. Ces lettres spéciales apparaissent automatiquement. Les enfants apprennent les alphabets complets de chaque langue. La diversité alphabétique devient évidente.

L'enseignement de l'alphabet multilingue prépare à la mondialisation. Les élèves comprennent que chaque langue possède son alphabet. Les similarités et différences deviennent claires. Cette ouverture linguistique commence dès la maternelle.`,
      },
      {
        id: '9',
        question: 'Les tables de multiplication s\'apprennent-elles mieux avec des parcours visuels ?',
        answer: `Oui, les tables de multiplication s'apprennent significativement mieux visuellement. Les études montrent 40 à 50% d'amélioration de mémorisation. Le cerveau associe chaque résultat à un emplacement spatial. La mémoire visuelle renforce la mémoire mathématique. Les résultats persistent plus longtemps.

Les tables de multiplication en parcours activent plusieurs zones cérébrales simultanément. Le calcul mental active la zone mathématique. Le tracé active la zone motrice. La recherche visuelle active la zone spatiale. Cette activation multiple ancre profondément les apprentissages.

L'aspect ludique des tables de multiplication réduit l'anxiété mathématique. Les enfants jouent au détective au lieu de réciter. Le stress diminue drastiquement. Les blocages psychologiques disparaissent. L'apprentissage redevient plaisant et naturel.`,
      },
      {
        id: '10',
        question: 'Combien de fiches de coloriage puis-je créer avec mon abonnement ?',
        answer: `Vous pouvez créer un nombre illimité de fiches de coloriage avec Full Access. Aucune restriction mensuelle ou annuelle. Créez 10 fiches par jour si nécessaire. Générez 500 fiches par mois pour toute l'école. Le prix reste identique : 240€ par an ou 25€ par mois.

Les fiches de coloriage se génèrent aussi rapidement que les parcours normaux. Créez votre fiche en 3 minutes. Activez Niveau de Gris avant téléchargement. Imprimez immédiatement. La conversion en coloriage est instantanée. Aucune manipulation supplémentaire n'est requise.

Le coloriage illimité transforme votre enseignement. Plus jamais à court d'activités calmes. Plus besoin d'acheter des livres de coloriage. Vos fiches correspondent exactement à vos thèmes. L'économie annuelle dépasse facilement 200€ à 300€ en ressources achetées.`,
      },
      {
        id: '11',
        question: 'Comment utiliser les parcours pour apprendre à lire les syllabes ?',
        answer: `Pour apprendre à lire les syllabes, créez des parcours phonétiques ciblés. Sélectionnez des images contenant toutes la syllabe "ma" : maman, maison, marteau. Le bon chemin ne contient que ces images. Les distracteurs montrent d'autres syllabes. L'enfant identifie et suit uniquement "ma".

Apprendre à lire les syllabes progresse systématiquement avec cette méthode. Semaine 1 : syllabe "pa". Semaine 2 : syllabe "ma". Semaine 3 : syllabe "ta". Créez 3 à 5 parcours par syllabe. La répétition visuelle ancre la reconnaissance syllabique. Les résultats apparaissent en 2 à 3 semaines.

Les parcours syllabiques se complexifient progressivement. Commencez avec syllabes CV simples : pa, ma, ta. Ajoutez ensuite CVC : pat, mat, rat. Terminez avec syllabes complexes : pra, bla, tri. La progression suit exactement votre méthode de lecture.`,
      },
      {
        id: '12',
        question: 'L\'écriture cursive se pratique-t-elle efficacement avec les modèles intégrés ?',
        answer: `Oui, l'écriture cursive se pratique très efficacement avec les modèles. Ajoutez un modèle en police Fredoka ou autre cursive. L'enfant observe la forme des lettres. Il copie sur des lignes vierges en dessous. Puis il trace le parcours vers l'image correspondante. Trois activités complémentaires en une fiche.

L'écriture cursive bénéficie de l'échauffement manuel. Le coloriage préliminaire réchauffe la main. Le tracé des lettres exerce la précision. Le parcours renforce la fluidité gestuelle. La main est parfaitement préparée. La qualité d'écriture s'améliore de 30 à 40%.

Les progressions d'écriture cursive suivent votre rythme de classe. Intégrez une nouvelle lettre chaque semaine. Les parcours accompagnent chaque apprentissage. La cohérence pédagogique se maintient. Les élèves progressent régulièrement sans confusion.`,
      },
    ],
  },

  // Pricing - Full Access Bundle for Picture Path
  pricing: {
    title: 'Accès Complet',
    price: '240€',
    priceInterval: '/an',
    priceSuffix: 'Facturation annuelle',
    benefits: [
      'Création de fiches illimitée',
      '33 types de générateurs',
      'Licence commerciale incluse',
      '11 langues supportées',
      '3000+ images thématiques',
      'Qualité d\'impression 300 DPI',
      'Corrigés inclus',
    ],
    ctaText: 'Commencer Maintenant',
    guaranteeText: 'Garantie satisfait ou remboursé 30 jours',
  },

  // Related Apps - From picture-path.md Section 7
  relatedApps: {
    sectionTitle: 'Combiner les Apps - Apprendre à Lire, Alphabet et Écriture Cursive Ensemble',
    sectionDescription: 'L\'abonnement Full Access inclut 33 générateurs de fiches différents. Combinez le générateur de parcours avec d\'autres apps. Créez des ressources pédagogiques ultra-complètes. Les élèves travaillent plusieurs compétences simultanément. Votre temps de préparation diminue drastiquement.',
    ctaTitle: 'Prêt à Créer des Fiches Professionnelles ?',
    ctaDescription: 'Rejoignez des milliers d\'enseignants qui créent des fiches maternelle de qualité. Création illimitée, licence commerciale incluse.',
    primaryCtaText: 'Commencer l\'Essai Gratuit',
    secondaryCtaText: 'Voir les 33 Applications',
    badgeText: 'Fonctionne Parfaitement Avec',
    exploreText: 'Explorer toutes les applications',
    trustBadges: {
      guarantee: 'Garantie satisfait ou remboursé 30 jours',
      securePayment: 'Paiement sécurisé',
      cancelAnytime: 'Résiliez à tout moment',
    },
    items: [
      {
        id: '1',
        slug: 'coloriage-fiches',
        name: 'Coloriage à Imprimer',
        category: 'Arts et Motricité',
        icon: '🎨',
        description: 'Le coloriage se combine parfaitement avec les parcours. Imprimez les fiches en niveau de gris. Les enfants colorient les images du parcours. Puis ils tracent le chemin avec une couleur différente. Deux activités en une seule fiche.',
      },
      {
        id: '2',
        slug: 'exercices-maths-fiches',
        name: 'Exercices Maths',
        category: 'Mathématiques',
        icon: '➕',
        description: 'Les exercices maths s\'automatisent de la même manière. Créez un parcours mathématique en 3 minutes. Générez le corrigé automatiquement. Combinez graphisme et tables de multiplication dans un même pack.',
      },
      {
        id: '3',
        slug: 'train-alphabet-fiches',
        name: 'Train de l\'Alphabet',
        category: 'Lecture',
        icon: '🚂',
        description: 'Combinez les parcours phonétiques avec les activités d\'alphabet. Créez un labyrinthe où toutes les images commencent par "B". L\'enfant identifie le son initial et apprend à lire les premières lettres.',
      },
      {
        id: '4',
        slug: 'graphisme-fiches',
        name: 'Tracé de Lignes',
        category: 'Graphisme',
        icon: '✏️',
        description: 'Intégrez des modèles d\'écriture cursive directement dans vos parcours. L\'écriture cursive et le graphisme maternelle se renforcent mutuellement. Le tracé de labyrinthes assouplit la main.',
      },
      {
        id: '5',
        slug: 'association-fiches',
        name: 'Fiches d\'Association',
        category: 'Visuel',
        icon: '🔗',
        description: 'Créez des packs hebdomadaires complets combinant parcours et association. Les élèves découvrent le vocabulaire par plusieurs entrées sensorielles. Les apprentissages se renforcent mutuellement.',
      },
      {
        id: '6',
        slug: 'cherche-et-compte-fiches',
        name: 'Cherche et Compte',
        category: 'Mathématiques',
        icon: '🔍',
        description: 'Finalisez vos progressions en combinant parcours et comptage systématiquement. Chaque parcours thématique devient aussi un exercice de numération. Apprendre à lire et compter simultanément.',
      },
    ],
  },
};

export default picturePathFrContent;
