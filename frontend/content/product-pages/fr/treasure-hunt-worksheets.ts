import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Treasure Hunt Worksheets - French Content
 *
 * File: frontend/content/product-pages/fr/treasure-hunt-worksheets.ts
 * URL: /fr/apps/chasse-au-tresor-fiches (French SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/French/treasure-hunt.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 *
 * PRICING: Accès Complet = 240€/an (Accès Complet)
 * App ID: treasure-hunt
 */

export const treasureHuntFrContent: ProductPageContent = {
  // SEO Metadata - French language-specific
  seo: {
    slug: 'chasse-au-tresor-fiches',
    appId: 'treasure-hunt',
    title: 'Fiches Chasse au Trésor Gratuites - Générateur Maternelle CP',
    description: 'Créez des fiches chasse au trésor en 3 minutes. Abonnement 240€/an, création illimitée. Directions spatiales pour maternelle et CP. Parfait pour enseignants et.',
    keywords: 'fiches chasse au trésor, fiches à imprimer gratuit, fiches maternelle, exercices CP, directions spatiales, exercices CE1, graphisme maternelle, coloriage à imprimer, apprendre à lire, alphabet, écriture cursive, tables de multiplication',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fr/apps/chasse-au-tresor-fiches',
      },

  // Hero Section - FULL text from French treasure-hunt.md Section 1
  hero: {
    title: 'Générateur de Fiches Chasse au Trésor',
    subtitle: 'Fiches à Imprimer - Exercices Maternelle et CP avec Directions',
    description: `Créez des fiches chasse au trésor professionnelles en moins de 3 minutes. Votre abonnement Accès Complet à 240 € par an vous donne un accès illimité à notre générateur. Créez autant de fiches maternelle que vous le souhaitez, sans frais supplémentaires par fiche. Parfait pour enseigner les directions spatiales aux élèves de maternelle, CP et CE1.

Les fiches chasse au trésor combinent l'apprentissage des directions avec le plaisir de la résolution de problèmes. Vos élèves suivent des instructions écrites pour trouver le trésor sur une grille de 3×3. Choisissez entre des directions de base (haut/bas/gauche/droite) pour la maternelle ou des directions cardinales (nord/sud/est/ouest) pour les élèves de CE1 et plus. Le générateur crée automatiquement les indices et la fiche corrigée.

Notre générateur propose deux types de vocabulaire de directions adaptés à l'âge des élèves. Les directions de base conviennent parfaitement aux élèves de maternelle et CP qui apprennent les concepts spatiaux fondamentaux. Les directions cardinales sont idéales pour les élèves de CE1 et CE2 qui étudient la géographie et l'orientation. Téléchargez vos fiches en PDF ou JPEG haute résolution de 300 DPI, prêtes à imprimer.`,
    previewImageSrc: '/samples/french/treasure-hunt/sample-1.jpeg',
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
    videos: {
      commonFeatures: {
        videoId: 'Df9fknBBRFA',
        buttonText: 'Découvrir en vidéo',
        modalTitle: 'Aperçu des fonctionnalités',
      },
      appSpecific: {
        videoId: 'flHiBXsYLLA',
        buttonText: 'Fonctions Chasse au trésor',
        modalTitle: 'Tutoriel Chasse au trésor',
      },
    },
  },

  // Sample Gallery - REAL file paths from samples/french/treasure-hunt/
  samples: {
    sectionTitle: 'Fiche Gratuite pour Enfants - Fiches Gratuites et Imprimables Gratuits',
    sectionDescription: 'Téléchargez imprimables gratuits - Fiche gratuite pour enfants de qualité professionnelle. Fiches gratuites et fiche pour enfants parfaites pour fiche pour maternelle. Fiche gratuite pour enfants et fiches gratuites inclus matériel éducatif. Fiche gratuite et fiches gratuites disponible',
    downloadLabel: 'Télécharger Exemple Gratuit',
    worksheetLabel: 'Fiche',
    answerKeyLabel: 'Corrigé',
    viewAllLabel: 'Agrandir',
    noPdfLabel: 'Aperçu uniquement',
    freePdfCountLabel: 'téléchargements gratuits',
    badgeText: 'Exemples Gratuits',
    downloadingLabel: 'Téléchargement...',
    ofLabel: 'sur',
    items: [],
    
  },

  // Features Grid - FULL text from French treasure-hunt.md Section 2
  features: {
    sectionTitle: 'Fiches Gratuites et Fiche pour Enfants - Imprimables Gratuits et Fiche pour Maternelle',
    sectionDescription: 'Notre générateur de fiches chasse au trésor offre toutes les fonctionnalités dont vous avez besoin pour créer des exercices de qualité professionnelle. Créez des fiches maternelle personnalisées en quelques clics. Modifiez tout sur le canevas après génération. Téléchargez en PDF ou JPEG haute résolution. Votre abonnement Accès Complet inclut une licence commerciale complète pour vendre vos créations.',
    highlightBadgeText: 'Fonctionnalité Clé',
    readMoreLabel: 'Lire la suite',
    showLessLabel: 'Voir moins',
    badgeText: 'Fonctionnalités',
    trustBadges: {
      allFeatures: 'Toutes les fonctionnalités incluses',
      noHiddenFees: 'Aucun frais caché',
      cancelAnytime: 'Annulez à tout moment',
    },
    items: [], // Samples loaded dynamically from content manager
    
  },

  // How-To Guide - FULL text from French treasure-hunt.md Section 3
  howTo: {
    sectionTitle: 'Fiche Gratuite pour Enfants Créer - Fiche pour Maternelle',
    sectionDescription: 'Créer une fiche chasse au trésor professionnelle ne prend que 3 minutes du début à la fin. Ce guide étape par étape vous montre exactement comment utiliser le générateur. Aucune compétence technique requise. Les enseignants de maternelle créent des fiches à imprimer gratuit dès leur première utilisation. Suivez ces cinq étapes simples pour créer des exercices CP personnalisés parfaits pour vos élèves.',
    ctaText: 'Commencer à Créer',
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
        title: 'Choisissez Vos Images pour Fiches à Imprimer Gratuit - Thème ou Sélection Manuelle avec Coloriage',
        description: `Commencez par sélectionner le contenu visuel de votre fiche chasse au trésor. Vous avez deux options principales. La première option est de choisir un thème complet dans le menu déroulant : animaux, nourriture, véhicules, école, nature, sports et bien d'autres. Le générateur sélectionne automatiquement 6 images appropriées du thème choisi. Cette méthode est la plus rapide et garantit une cohérence visuelle.

La deuxième option est de sélectionner 6 images manuellement. Cliquez sur le menu déroulant de thème de la bibliothèque pour parcourir plus de 3000 images organisées par catégories. Utilisez la barre de recherche pour trouver des images spécifiques. Cliquez sur chaque image pour l'ajouter à votre sélection. Un compteur affiche le nombre d'images sélectionnées (0/6). Continuez jusqu'à atteindre 6 images. Cette méthode vous donne un contrôle total sur le contenu pédagogique.

Vous pouvez aussi téléverser vos propres images. Cliquez sur le bouton "Choisir des fichiers" dans la section Téléverser des Images Personnalisées. Sélectionnez jusqu'à 6 images de votre ordinateur. Les formats JPEG, PNG et GIF sont acceptés. Vos images téléversées apparaissent dans la zone de prévisualisation. Cliquez sur chaque image pour l'ajouter à la sélection de 6 images. Combinez images téléversées et images de la bibliothèque selon vos besoins. Créez des fiches personnalisées avec le vocabulaire exact de votre programme.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Configurez les Paramètres pour Exercices CE1 et Graphisme Maternelle - Type de Directions et Format de Page',
        description: `Après avoir choisi vos 6 images, configurez les paramètres de la fiche. Le premier paramètre crucial est le type de directions. Ouvrez le menu déroulant "Type de directions" dans la section Configuration du Puzzle. Choisissez entre deux options : directions de base ou directions cardinales.

Les directions de base (haut, bas, gauche, droite) conviennent parfaitement aux élèves de maternelle et CP. C'est le vocabulaire spatial fondamental que les jeunes enfants comprennent intuitivement. Les indices utilisent des mots simples adaptés à l'âge. Cette option est recommandée pour les élèves de 4 à 7 ans qui apprennent les concepts de positionnement spatial.

Les directions cardinales (nord, sud, est, ouest) sont appropriées pour les élèves de CE1, CE2 et plus. Ces termes géographiques s'enseignent habituellement à partir de 7-8 ans. Les indices utilisent le vocabulaire géographique formel. Cette option renforce les compétences en orientation et géographie. Idéale pour intégrer les mathématiques et les études sociales.

Ensuite, configurez le format de page. Ouvrez la section Configuration de Page. Sélectionnez la taille de page : Letter Portrait, Letter Landscape, A4 Portrait, A4 Landscape ou format Carré. Le format A4 Portrait est standard en France. Le format Landscape offre plus d'espace horizontal pour la grille et les indices. Choisissez la couleur de fond de page si vous souhaitez une couleur autre que le blanc. Sélectionnez un thème d'arrière-plan décoratif pour ajouter une ambiance visuelle. Ajustez l'opacité de l'arrière-plan pour ne pas surcharger la fiche. Choisissez un thème de bordure pour encadrer professionnellement votre fiche.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Générez Votre Fiche Maternelle - Prévisualisation Instantanée avec Alphabet et Apprendre à Lire',
        description: `Une fois tous les paramètres configurés, cliquez sur le bouton bleu "Créer" dans l'en-tête. Le générateur traite votre demande en 2 à 5 secondes. Votre fiche chasse au trésor apparaît instantanément sur le canevas. Vous voyez exactement à quoi ressemblera la fiche imprimée.

Le générateur place automatiquement les 6 images dans une grille 3×3. Une case reste vide pour le trésor. Les images sont distribuées aléatoirement sur la grille. Chaque génération crée une disposition unique. Cette variation garantit que chaque élève reçoit un puzzle différent même avec le même thème.

Le côté gauche de la fiche affiche les indices de directions. Par exemple : "Commence au chat. Va 1 case vers le haut. Va 1 case vers la droite. Va 1 case vers le bas. Le trésor est ici !" Les instructions sont numérotées et faciles à suivre. Le texte est dans la langue sélectionnée dans les paramètres. La taille de police est optimisée pour la lisibilité des jeunes élèves.

Simultanément, le générateur crée automatiquement la fiche corrigée. Cliquez sur l'onglet "Fiche Corrigée" en haut pour la voir. La fiche corrigée montre exactement le même puzzle avec le chemin vers le trésor clairement marqué. Des flèches ou des lignes indiquent chaque déplacement. La case du trésor est mise en évidence. Les enseignants utilisent cette fiche corrigée pour vérifier rapidement le travail des élèves.

Si vous n'êtes pas satisfait du résultat, cliquez simplement sur "Créer" à nouveau. Le générateur crée une nouvelle fiche avec une disposition différente. Essayez plusieurs variations jusqu'à trouver celle qui vous plaît. Chaque génération ne prend que quelques secondes.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Modifiez sur le Canevas - Personnalisez Vos Fiches à Imprimer Gratuit et Exercices Maths',
        description: `Après génération, personnalisez chaque élément de votre fiche directement sur le canevas. Cliquez sur n'importe quelle image pour la sélectionner. Des poignées de redimensionnement apparaissent autour de l'image sélectionnée. Faites glisser les poignées pour agrandir ou réduire l'image. Faites glisser l'image elle-même pour la déplacer. Utilisez la poignée de rotation pour faire pivoter l'image.

Cliquez sur le bloc de texte des indices pour le sélectionner. Ouvrez la section Outils de Texte dans le panneau latéral gauche. Changez la couleur du texte avec le sélecteur de couleur. Ajustez la taille de police avec le curseur. Sélectionnez une police différente parmi les 6 options disponibles. Les polices incluent des styles adaptés aux enfants et des polices d'écriture manuscrite.

Ajoutez vos propres zones de texte personnalisées. Tapez votre texte dans le champ "Contenu" de la section Outils de Texte. Cliquez sur "Ajouter du Texte". La nouvelle zone de texte apparaît sur le canevas. Déplacez-la où vous voulez. Utilisez cette fonction pour ajouter le nom de l'élève, la date, des instructions supplémentaires ou des encouragements.

Modifiez l'arrière-plan ou la bordure après génération. Sélectionnez un nouveau thème d'arrière-plan dans la section Configuration de Page. L'arrière-plan se met à jour instantanément. Ajustez l'opacité pour trouver le bon équilibre visuel. Changez la bordure de la même manière. Essayez différentes combinaisons jusqu'à obtenir l'apparence désirée.

Verrouillez les éléments que vous ne voulez pas modifier accidentellement. Sélectionnez un élément et cliquez sur l'icône de cadenas dans la barre d'outils contextuelle. L'élément verrouillé ne peut plus être déplacé ou modifié. Cela protège la mise en page pendant que vous ajustez d'autres éléments. Déverrouillez en cliquant à nouveau sur l'icône de cadenas.

Utilisez les boutons Annuler et Rétablir pour revenir en arrière ou avancer dans vos modifications. Ces boutons se trouvent en haut à droite. Expérimentez librement sachant que vous pouvez toujours annuler. L'historique complet de vos modifications est sauvegardé pendant votre session de travail.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Téléchargez et Imprimez - Coloriage à Imprimer et Écriture Cursive en PDF et JPEG Haute Résolution',
        description: `Quand votre fiche est exactement comme vous la voulez, téléchargez-la. Cliquez sur le bouton "Télécharger" en haut à droite. Un menu déroulant s'ouvre avec quatre options principales : Fiche (JPEG), Fiche Corrigée (JPEG), Fiche (PDF) et Fiche Corrigée (PDF).

Le format JPEG offre une compatibilité universelle. Tous les ordinateurs et appareils peuvent ouvrir les fichiers JPEG. La taille de fichier est petite, idéale pour envoyer par courriel aux parents. Le format JPEG fonctionne parfaitement pour l'impression à la maison. Sélectionnez "Fiche (JPEG)" pour télécharger la fiche élève. Sélectionnez "Fiche Corrigée (JPEG)" pour télécharger la version avec les réponses.

Le format PDF préserve la qualité vectorielle maximale. Les fichiers PDF maintiennent la netteté parfaite à n'importe quelle échelle. Utilisez le PDF pour l'impression professionnelle en volume. Les services de photocopie préfèrent le format PDF. Le PDF est aussi idéal si vous vendez vos fiches sur Teachers Pay Teachers ou Etsy. Sélectionnez "Fiche (PDF)" ou "Fiche Corrigée (PDF)" selon vos besoins.

Avant de télécharger, cochez la case "Niveaux de gris" si vous voulez une version noir et blanc. Cette option réduit considérablement les coûts d'encre d'imprimante. Les fiches en noir et blanc fonctionnent tout aussi bien pédagogiquement. Les élèves peuvent même colorier les images comme activité supplémentaire de motricité fine. L'économie d'encre atteint 60 à 80% par rapport à l'impression couleur.

Tous les téléchargements sont en résolution 300 DPI. Cette résolution professionnelle garantit une netteté parfaite à l'impression. Les lignes sont nettes, le texte est clair, les images sont détaillées. La qualité 300 DPI convient à l'impression commerciale. Vos fiches ont l'apparence de matériel pédagogique publié professionnellement.

Téléchargez toujours les deux versions : la fiche élève et la fiche corrigée. La fiche élève va aux enfants pour qu'ils résolvent le puzzle. La fiche corrigée reste avec vous pour la correction rapide. Organisez vos fichiers dans des dossiers par thème ou par niveau scolaire. Créez une bibliothèque de fiches chasse au trésor réutilisables année après année.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from French treasure-hunt.md Section 4
  useCases: {
    sectionTitle: 'Fiche Gratuite pour Enfants - Fiche pour Maternelle avec Imprimables Gratuits. Fiche pour Enfants',
    sectionDescription: 'Les fiches chasse au trésor conviennent à de nombreux contextes éducatifs différents. Les enseignants de maternelle les utilisent pour enseigner les directions spatiales. Les parents en IEF créent des exercices personnalisés. Les enseignants FLE intègrent le vocabulaire des directions. Les éducateurs spécialisés adaptent la difficulté pour leurs élèves. Les enseignants entrepreneurs vendent leurs créations en ligne. Découvrez comment chaque groupe bénéficie de ce générateur polyvalent.',
    badgeText: 'Cas d\'Utilisation',
    readMoreLabel: 'Lire la suite',
    showLessLabel: 'Voir moins',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // FAQ Section - FULL text from French treasure-hunt.md Section 6
  faq: {
    sectionTitle: 'FAQ - Fiche Gratuite pour Enfants et Fiche pour Maternelle. Fiche pour Enfants',
    sectionDescription: 'Les enseignants posent souvent les mêmes questions avant de s\'abonner. Cette section répond aux 12 questions les plus courantes. Vous découvrirez les détails sur le prix, les fonctionnalités, l\'utilisation en classe et la licence commerciale.',
    showMoreText: 'Afficher plus de questions',
    showLessText: 'Afficher moins',
    badgeText: 'Questions Fréquentes',
    readMoreLabel: 'Lire la suite',
    showLessLabel: 'Voir moins',
    secureCheckout: 'Paiement sécurisé',
    cancelAnytime: 'Annulez à tout moment',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // Pricing section - Accès Complet required
  pricing: {
    title: 'Accès Complet',
    price: '240€',
    priceInterval: '/an',
    priceSuffix: 'Facturé annuellement',
    ctaText: 'Commencer à Créer',
    bundleDescription: 'Votre abonnement inclut l\'accès aux 33 générateurs de fiches:',
    bundleApps: [
      'Addition Images',
      'Train Alphabet',
      'Grand ou Petit',
      'Bingo Images',
      'Graphique et Comptage',
      'Code Addition',
      'Coloriages',
      'Mots Croisés',
      'Cryptogramme',
      'Dessiner et Colorier',
      'Tracer des Lignes',
      'Cherche et Compte',
      'Cherche les Objets',
      'Puzzle Grille',
      'Jeu d\'Association',
      'Puzzle Maths',
      'Fiches de Maths',
      'Pièces Manquantes',
      'Plus ou Moins',
      'L\'Intrus',
      'Train Suites Logiques',
      'Fiches Séquences',
      'Parcours d\'Images',
      'Tri d\'Images',
      'Prépositions',
      'Ombres',
      'Soustraction',
      'Sudoku',
      'Chasse au Trésor',
      'Deviner les Mots',
      'Mots Mélangés',
      'Mots Mêlés',
      'Écriture',
    ],
    benefits: [
      '33 générateurs de fiches inclus',
      'Création illimitée de fiches',
      'Bibliothèque de 3000+ images',
      'Support de 11 langues',
      'Licence commerciale POD incluse',
      'Export 300 DPI haute qualité',
      'Corrigés automatiques',
    ],
  },

  // Related Apps - From French treasure-hunt.md Section 7
  relatedApps: {
    sectionTitle: 'Fiches Gratuites Combiner - Fiche pour Enfants et Imprimables Gratuits',
    sectionDescription: 'Les enseignants créent des paquets d\'apprentissage thématiques en combinant plusieurs types de fiches. Les fiches chasse au trésor se combinent parfaitement avec nos 32 autres générateurs. Votre abonnement Accès Complet à 240 € par an vous donne accès à tous les générateurs.',
    ctaTitle: 'Prêt à Créer des Fiches Exceptionnelles ?',
    ctaDescription: 'Rejoignez des milliers d\'enseignants qui créent des fiches professionnelles. Génération illimitée, licence commerciale incluse.',
    primaryCtaText: 'Commencer l\'Essai Gratuit',
    secondaryCtaText: 'Voir les 33 Applications',
    badgeText: 'Fonctionne Bien Avec',
    exploreText: 'Explorer toutes les applications',
    trustBadges: {
      securePayment: 'Paiement sécurisé',
      cancelAnytime: 'Annulez à tout moment',
    },
    items: [], // Samples loaded dynamically from content manager
    
  },
};

export default treasureHuntFrContent;
