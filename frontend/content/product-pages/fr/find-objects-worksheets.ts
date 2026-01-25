import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Find Objects Worksheets - French Content
 *
 * File: frontend/content/product-pages/fr/find-objects-worksheets.ts
 * URL: /fr/apps/cherche-objets-fiches (French SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/French/find-objects.md
 * App ID: find-objects (Visual discrimination / I Spy worksheets)
 * Bundle: Accès Complet ($240/year) - NOT Pack Essentiel
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const findObjectsFrContent: ProductPageContent = {
  // SEO Metadata - French language-specific
  seo: {
    slug: 'cherche-objets-fiches',
    appId: 'find-objects',
    title: 'Fiches Cherche Objets Gratuites | Générateur Maternelle CP',
    description: 'Créez des fiches cherche les objets gratuites avec notre générateur. PDF haute qualité en 3 minutes. Parfait pour maternelle et CP. Essayez maintenant !',
    keywords: 'fiches à imprimer gratuit, fiches maternelle, exercices CP, discrimination visuelle, je vois, intrus, graphisme maternelle, coloriage à imprimer, apprendre à lire, alphabet',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fr/apps/cherche-objets-fiches',
    images: [
      {
        url: 'https://www.lessoncraftstudio.com/samples/french/find-objects/sample-1.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Fiche cherche les objets gratuite - discrimination visuelle maternelle avec corrigé PDF',
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/french/find-objects/sample-2.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Fiche cherche les objets gratuite - exercices CP discrimination visuelle imprimable',
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/french/find-objects/sample-3.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Fiche gratuite cherche les objets - activité attention visuelle pour enfants',
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/french/find-objects/sample-4.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Fiche cherche les objets gratuite pour maternelle - jeu de perception visuelle',
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/french/find-objects/sample-5.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Fiche cherche les objets gratuite CP - discrimination visuelle avec corrigé inclus',
      },
    ],
  },

  // Hero Section - FULL text from find-objects.md paragraphs 1-4
  hero: {
    title: 'Fiches Cherche les Objets',
    subtitle: 'Générateur de Fiches Maternelle pour Discrimination Visuelle',
    description: `Créez des fiches professionnelles de discrimination visuelle avec notre générateur. Votre abonnement Accès Complet vous donne un accès illimité sans frais par fiche. Générez des fiches maternelle personnalisées parfaites pour les exercices CP et Grande Section. Téléchargez des PDF haute qualité en moins de 3 minutes.

Notre créateur de fiches à imprimer gratuit aide les enseignants à créer deux types d'activités visuelles. Le mode Je Vois invite les élèves à trouver des objets cachés parmi des distracteurs. Le mode Intrus demande aux enfants d'identifier les images non appariées. Les deux formats conviennent aux fiches maternelle et exercices CP avec niveaux de difficulté ajustables.

L'abonnement Accès Complet inclut les 33 types de générateurs de fiches. Créez des activités de discrimination visuelle combinées avec des exercices maths, apprendre à lire, et alphabet. Votre abonnement comprend la licence commerciale pour vendre vos fiches sur Teachers Pay Teachers et Etsy. La qualité professionnelle 300 DPI garantit une impression parfaite à chaque fois.

Les enseignants utilisent notre générateur pour développer les compétences de perception visuelle chez les jeunes apprenants. Les enseignants de maternelle créent des fiches simples avec moins d'objets pour développer l'attention. Les enseignants de CP conçoivent des fiches complexes avec plus d'objets et des distracteurs difficiles. Toutes les fiches se téléchargent en PDF prêtes pour la classe ou la vente commerciale.`,
    previewImageSrc: '/samples/french/find-objects/sample-1.jpeg',
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

  // Sample Gallery - REAL file paths from samples/english/find objects/
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
    items: [], // Samples loaded dynamically from content manager
    
  },

  // Features Grid - FULL text from find-objects.md feature sections
  features: {
    sectionTitle: 'Fiches Gratuites et Fiche pour Enfants - Imprimables Gratuits et Fiche pour Maternelle',
    sectionDescription: 'Notre générateur de discrimination visuelle offre une personnalisation complète pour créer des fiches maternelle et exercices CP. La plateforme inclut deux modes d\'activité distincts avec des outils d\'édition professionnels. Les enseignants créent des fiches à imprimer gratuit pour la pratique de la perception visuelle en moins de trois minutes. L\'abonnement Accès Complet débloque toutes les fonctionnalités sur 33 types de générateurs incluant exercices maths, alphabet, et apprendre à lire.',
    highlightBadgeText: 'Fonctionnalité Clé',
    readMoreLabel: 'Lire la suite',
    showLessLabel: 'Voir moins',
    badgeText: 'Fonctionnalités',
    trustBadges: {
      allFeatures: 'Toutes les fonctionnalités incluses',
      noHiddenFees: 'Aucun frais caché',
      cancelAnytime: 'Résiliez à tout moment',
    },
    items: [], // Samples loaded dynamically from content manager
    
  },

  // How-To Guide - FULL text from find-objects.md step sections
  howTo: {
    sectionTitle: 'Fiche Gratuite pour Enfants Créer - Fiche pour Maternelle',
    sectionDescription: 'Générez des fiches maternelle professionnelles et exercices CP en moins de trois minutes. Ce guide étape par étape montre comment créer des fiches de discrimination visuelle du début à la fin. Aucune compétence en conception requise pour créer des fiches à imprimer gratuit. Le flux de travail simplifié aide les enseignants à créer des exercices maths, apprendre à lire et alphabet efficacement. Suivez ces cinq étapes simples pour produire des fiches prêtes pour la classe ou la vente commerciale.',
    ctaText: 'Commencer Maintenant',
    badgeText: 'Comment Ça Marche',
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
        title: 'Sélectionner le Mode et les Images',
        description: `Ouvrez le générateur de discrimination visuelle et choisissez d'abord votre mode d'activité. Sélectionnez le mode Je Vois pour des fiches d'objets cachés traditionnelles. Choisissez le mode Intrus pour la pratique d'appariement et discrimination visuelle. Votre sélection détermine comment les élèves interagissent avec vos fiches maternelle et exercices CP. Le mode choisi affecte toute la structure de la fiche et les objectifs d'apprentissage.

Pour le mode Je Vois, sélectionnez d'abord 8 à 12 images distractrices de la bibliothèque. Parcourez par thème pour voir les images associées regroupées ensemble. Recherchez des objets spécifiques utilisant des mots-clés comme animaux ou véhicules. Choisissez ensuite 1 à 5 objets cachés que les élèves chercheront parmi les distracteurs. Commencez avec 1 à 2 objets cachés pour les petits de maternelle débutants. Utilisez 3 à 5 objets pour les grands de CP prêts pour les défis.

Pour le mode Intrus, sélectionnez soigneusement 8 à 12 paires d'images assorties. Chaque paire devrait paraître identique ou très similaire. Les élèves trouvent les images sans partenaire correspondant parmi les paires. Choisissez 1 à 3 images intrus qui apparaissent non appariées dans la mise en page.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Personnaliser la Configuration',
        description: `Sélectionnez d'abord votre format de page parmi Lettre ou A4. Choisissez l'orientation portrait pour des fiches standard qui s'insèrent dans les classeurs scolaires. Sélectionnez le paysage pour des mises en page visuelles plus larges quand vous avez besoin de plus d'espace horizontal. L'option taille personnalisée permet de spécifier les dimensions exactes en pixels pour des projets spéciaux. La configuration de page affecte tous les types de fiches incluant exercices maths, apprendre à lire et alphabet également.

Ajoutez ensuite un thème d'arrière-plan de la bibliothèque d'arrière-plans thématiques. Les images d'arrière-plan ajoutent de l'intérêt visuel aux fiches maternelle sans distraire des objectifs d'apprentissage. Choisissez des arrière-plans saisonniers pour les unités de vacances. Sélectionnez des arrière-plans éducatifs pour l'alignement du programme. Ajustez l'opacité d'arrière-plan si nécessaire utilisant le curseur.

Choisissez des thèmes de bordure pour encadrer professionnellement vos fiches à imprimer gratuit. Les bordures thématiques correspondent parfaitement aux unités saisonnières et sujets du programme. Les thèmes de bordure incluent vacances, saisons et motifs éducatifs.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Générer Votre Fiche',
        description: `Cliquez sur le bouton Créer pour générer automatiquement votre fiche. Le générateur organise toutes les images sélectionnées sur votre mise en page de page. Les objets cachés ou images intrus se placent aléatoirement parmi les autres images. L'auto-dimensionnement garantit que les images s'adaptent de manière appropriée sans chevauchement. Le moteur de mise en page crée des fiches maternelle et exercices CP équilibrées et d'apparence professionnelle en secondes.

Le générateur crée simultanément un corrigé montrant les solutions. Pour le mode Je Vois, les corrigés entourent ou mettent en évidence les objets cachés. Pour le mode Intrus, les corrigés marquent clairement les images non appariées. La fiche et le corrigé apparaissent dans des onglets séparés. Basculez entre les onglets pour prévisualiser les deux versions. Cette fonctionnalité d'auto-génération économise des heures comparé à la création manuelle de fiches.

Prévisualisez votre fiche avant de télécharger. Vérifiez que les images se sont placées correctement et les instructions apparaissent clairement. Vérifiez que le corrigé marque les bons objets.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Éditer sur le Canevas',
        description: `Cliquez sur n'importe quel objet sur votre fiche pour le sélectionner pour l'édition. Des poignées de sélection apparaissent autour des objets cliqués vous montrant que vous pouvez les éditer. Déplacez les objets sélectionnés vers de nouvelles positions n'importe où sur la page en cliquant et maintenant. Faites pivoter les images à différents angles pour une variété visuelle et une apparence naturelle. Cliquez et faites glisser les poignées de rotation pour faire tourner les objets. Redimensionnez les objets plus grands ou plus petits en faisant glisser les poignées de coin.

Les contrôles de calque ajustent quels objets apparaissent devant les autres lors du chevauchement. Amenez les éléments importants vers l'avant utilisant le bouton Amener au Premier Plan. Envoyez les éléments décoratifs vers l'arrière utilisant les contrôles Envoyer à l'Arrière. Alignez plusieurs objets sélectionnés entre eux pour des mises en page soignées. Utilisez les outils d'alignement pour centrer les objets sur la page en un clic.

Ajoutez ou modifiez des éléments de texte directement sur le canevas utilisant les contrôles de texte. Changez les propriétés de police, taille, couleur et contour pour le texte sélectionné dans la barre latérale.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Télécharger et Imprimer',
        description: `Sélectionnez votre format de téléchargement du menu déroulant Télécharger. Choisissez JPEG pour une compatibilité maximale avec les éditeurs d'images. Sélectionnez PDF pour une impression cohérente sur tous les appareils. Les deux formats exportent en qualité professionnelle 300 DPI. Vos fiches apprendre à lire et alphabet s'impriment parfaitement sur n'importe quelle imprimante.

Téléchargez la fiche et le corrigé séparément pour une gestion de fichiers organisée. Chacun se télécharge comme fichier individuel. Activez la conversion en niveaux de gris avant de télécharger pour économiser les coûts d'impression en classe. Les niveaux de gris maintiennent la clarité tout en réduisant la consommation d'encre couleur. Parfait pour l'impression de fiches en gros volume.

Imprimez les fiches téléchargées immédiatement ou enregistrez-les pour une utilisation ultérieure. Les fichiers PDF s'ouvrent dans n'importe quel lecteur PDF. Les fichiers JPEG s'ouvrent dans n'importe quel visualiseur ou éditeur d'images. Partagez des fichiers numériques avec les parents pour la pratique à domicile. Téléversez vers des systèmes de gestion d'apprentissage pour l'apprentissage à distance.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from find-objects.md use case sections
  useCases: {
    sectionTitle: 'Fiche Gratuite pour Enfants - Fiche pour Maternelle avec Imprimables Gratuits. Fiche pour Enfants',
    sectionDescription: 'Les fiches de discrimination visuelle servent divers contextes éducatifs et styles d\'enseignement. Les enseignants de maternelle utilisent des fiches d\'objets cachés pour développer l\'attention. Les enseignants de CP développent des compétences avancées de perception visuelle. Les parents en instruction à domicile créent des supports d\'apprentissage personnalisés. Les enseignants FLE développent le vocabulaire par contexte visuel. Les enseignants spécialisés adaptent les niveaux de difficulté aux besoins individuels. Les enseignants entrepreneurs génèrent des revenus en vendant des fiches à imprimer gratuit. Le générateur soutient tous ces utilisateurs avec une personnalisation flexible et une qualité de sortie professionnelle.',
    badgeText: 'Pour Qui',
    readMoreLabel: 'Lire la suite',
    showLessLabel: 'Voir moins',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // FAQ Section - Selected FAQs from find-objects.md
  faq: {
    sectionTitle: 'FAQ - Fiche Gratuite pour Enfants et Fiche pour Maternelle. Fiche pour Enfants',
    sectionDescription: 'Les enseignants ont des questions pratiques avant d\'investir dans des outils de création de fiches. Cette section répond aux questions les plus courantes sur la création de fiches maternelle et exercices CP.',
    showMoreText: 'Voir plus de questions',
    showLessText: 'Voir moins',
    badgeText: 'FAQ',
    readMoreLabel: 'Lire la suite',
    showLessLabel: 'Voir moins',
    secureCheckout: 'Paiement sécurisé',
    cancelAnytime: 'Résiliez à tout moment',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // Pricing - Accès Complet Bundle for Find Objects
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
  },

  // Related Apps
  relatedApps: {
    sectionTitle: 'Fiches Gratuites Combiner - Fiche pour Enfants et Imprimables Gratuits',
    sectionDescription: 'Votre abonnement Accès Complet inclut 33 générateurs complémentaires. Combinez la discrimination visuelle avec d\'autres outils pour créer des séquences pédagogiques complètes.',
    ctaTitle: 'Prêt à Créer des Fiches Fantastiques ?',
    ctaDescription: 'Rejoignez des milliers d\'enseignants qui créent des fiches professionnelles. Génération illimitée, licence commerciale incluse.',
    primaryCtaText: 'Commencer l\'Essai Gratuit',
    secondaryCtaText: 'Voir les 33 Applications',
    badgeText: 'Fonctionne Parfaitement Avec',
    exploreText: 'Explorer toutes les applications',
    trustBadges: {
      securePayment: 'Paiement sécurisé',
      cancelAnytime: 'Résiliez à tout moment',
    },
    items: [], // Samples loaded dynamically from content manager
    
  },
};

export default findObjectsFrContent;
