import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Picture Sort Worksheets - French Content
 *
 * File: frontend/content/product-pages/fr/picture-sort-worksheets.ts
 * URL: /fr/apps/tri-images-fiches (French SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/French/picture-sort.md
 * App ID: picture-sort (Visual sorting/classification worksheets)
 * Bundle: Accès Complet ($240/year) - NOT Pack Essentiel
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const pictureSortFrContent: ProductPageContent = {
  // SEO Metadata - French language-specific
  seo: {
    slug: 'tri-images-fiches',
    appId: 'picture-sort',
    title: 'Fiches de Tri d\'Images - Générateur de Fiches Maternelle pour',
    description: 'Créez des fiches de tri d\'images gratuites pour maternelle et CP. Générateur professionnel avec corrigés inclus. Téléchargez en PDF haute qualité en 3 min.',
    keywords: 'fiches à imprimer gratuit, fiches maternelle, exercices CP, tri images, graphisme maternelle, exercices maths, coloriage à imprimer, apprendre à lire, alphabet, écriture cursive, tables de multiplication, fiche gratuite pour enfants, imprimables gratuits, fiche pour enfants',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fr/apps/tri-images-fiches',
    images: [
      {
        url: 'https://www.lessoncraftstudio.com/samples/french/picture-sort/sample-1.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Fiche de tri d\'images gratuite pour maternelle - classement et catégorisation pour enfants'
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/french/picture-sort/sample-2.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Exercices CP tri d\'images - fiches gratuites pour enfants avec classification'
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/french/picture-sort/sample-3.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Fiche gratuite tri d\'images pour enfants - graphisme maternelle et logique'
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/french/picture-sort/sample-4.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Fiches gratuites classification images - exercices CE1 et coloriage à imprimer'
      }
    ],
  },

  // Hero Section - FULL text from picture-sort.md paragraphs 1-4
  hero: {
    title: 'Générateur de Fiches de Tri d\'Images',
    subtitle: 'Fiches Maternelle pour Apprendre à Classer et Catégoriser',
    description: `Créez des fiches de tri d'images professionnelles avec notre générateur de fiches maternelle. Votre abonnement Accès Complet à 240€/an vous permet de générer des fiches à imprimer gratuit en illimité. Concevez des exercices CP personnalisés parfaits pour la maternelle et l'école élémentaire. Téléchargez des fiches de haute qualité en PDF en moins de 3 minutes.

Les activités de tri d'images développent la pensée logique chez les jeunes enfants. Notre outil génère des fiches maternelle avec deux catégories de classement. Les élèves découpent les images et les trient dans les bonnes catégories. Chaque fiche inclut un corrigé montrant le tri correct.

L'interface intuitive permet de créer des fiches à imprimer gratuit adaptées à vos besoins pédagogiques. Sélectionnez des thèmes automatiquement ou choisissez manuellement jusqu'à 12 images. Ajustez la mise en page selon le format Letter ou A4. Personnalisez chaque élément sur le canevas avec une édition complète.

Notre générateur s'adresse aux enseignants de maternelle GS, CP et CE1. Les fiches de tri conviennent parfaitement aux activités de graphisme maternelle et de reconnaissance visuelle. Utilisez-les pour enseigner les catégories, les comparaisons et la classification logique. Chaque fiche téléchargeable inclut des instructions claires et un corrigé détaillé.`,
    previewImageSrc: '/samples/english/picture sort/picture sort portrait.jpeg',
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

  // Sample Gallery - REAL file paths from samples/english/picture sort/
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

  // Features Grid - FULL text from picture-sort.md feature sections
  features: {
    sectionTitle: 'Fiches Gratuites et Fiche pour Enfants - Imprimables Gratuits et Fiche pour Maternelle',
    sectionDescription: 'Notre générateur de fiches de tri d\'images offre sept fonctionnalités essentielles pour les enseignants de maternelle et d\'école élémentaire. Chaque fonction facilite la création de fiches à imprimer gratuit adaptées à vos élèves. L\'interface en français permet de concevoir des exercices CP et CE1 en quelques clics. Votre abonnement Accès Complet inclut l\'accès illimité à toutes ces fonctionnalités professionnelles.',
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

  // How-To Guide - FULL text from picture-sort.md step sections
  howTo: {
    sectionTitle: 'Fiche Gratuite pour Enfants Créer - Fiche pour Maternelle',
    sectionDescription: 'Créez des fiches de tri d\'images professionnelles en moins de 3 minutes avec notre générateur. Les cinq étapes ci-dessous vous guident du choix des images jusqu\'au téléchargement final. Aucune compétence technique n\'est requise pour concevoir des fiches à imprimer gratuit de qualité. Suivez ce processus simple pour produire des exercices CP adaptés à vos élèves de maternelle et d\'école élémentaire.',
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
        title: 'Étape 1 : Sélectionnez Vos Images pour Fiches Maternelle - Graphisme Maternelle et Exercices de Tri',
        description: `Commencez par choisir le contenu de vos fiches maternelle en sélectionnant deux catégories de tri. Utilisez la méthode automatique en choisissant deux thèmes différents dans les menus déroulants. Par exemple, sélectionnez "Animaux de la ferme" pour la catégorie gauche et "Animaux de la mer" pour la catégorie droite. Le système génère automatiquement 12 images équilibrées entre les deux catégories.

Alternativement, créez des exercices CP personnalisés avec la sélection manuelle d'images. Parcourez notre bibliothèque de 3000+ images organisées par thèmes. Recherchez des images spécifiques en tapant des mots-clés comme "pomme", "voiture" ou "triangle". Cliquez sur chaque image pour l'ajouter à votre sélection puis assignez-la à la catégorie gauche ou droite.

Combinez les images de la bibliothèque avec vos propres photos téléversées. Cette flexibilité permet de créer des fiches à imprimer gratuit parfaitement adaptées à vos leçons. Utilisez des photos de votre classe pour contextualiser les exercices de graphisme maternelle. Les élèves reconnaissent facilement les objets familiers dans leurs activités de tri.

Ajoutez jusqu'à 12 images pour un équilibre optimal sur la fiche. Le compteur affiche le nombre total d'images sélectionnées en temps réel. Vérifiez que chaque catégorie contient un nombre équilibré d'images avant de continuer. Cette première étape détermine le contenu pédagogique de vos fiches maternelle.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Étape 2 : Configurez la Mise en Page - Fiches à Imprimer Gratuit pour Coloriage et Exercices Maths',
        description: `Définissez les paramètres de page pour vos exercices CP dans la section Configuration de Page. Choisissez le format Letter Portrait (8,5×11 pouces) pour les imprimantes nord-américaines. Sélectionnez A4 Portrait (210×297mm) pour les standards européens. Le format Paysage convient aux fiches maternelle avec beaucoup d'images.

Personnalisez la couleur de fond de page avec le sélecteur de couleurs. Un fond blanc convient aux exercices de coloriage à imprimer pour économiser l'encre. Les fonds colorés pastel créent des fiches à imprimer gratuit plus attrayantes visuellement. Ajustez l'opacité pour des effets subtils qui n'interfèrent pas avec la lisibilité.

Ajoutez des arrière-plans thématiques en sélectionnant un thème dans le menu Arrière-plan. Parcourez les dizaines d'options disponibles adaptées aux exercices maths et aux activités de graphisme maternelle. Les arrière-plans saisonniers (automne, hiver, printemps, été) contextualisent vos fiches maternelle. Ajustez l'opacité de l'arrière-plan pour qu'il reste discret derrière les images.

Sélectionnez une bordure décorative dans le menu Bordures pour encadrer vos exercices CP. Les bordures thématiques (étoiles, cœurs, formes géométriques) ajoutent une touche professionnelle. Activez la case "Inclure champs Nom/Date" pour que les élèves écrivent leur nom sur la fiche. Cette option facilite l'organisation et le suivi des travaux de coloriage à imprimer.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Étape 3 : Générez Votre Fiche Maternelle - Exercices CP pour Apprendre à Lire et Alphabet',
        description: `Cliquez sur le bouton "Créer" après avoir configuré tous vos paramètres. Le générateur produit instantanément une fiche de tri complète sur le canevas. Deux cadres de catégories apparaissent en haut de la page avec les titres des catégories. Les images découpables se positionnent automatiquement en bas dans une grille organisée.

La génération automatique crée une mise en page optimisée pour l'impression et le découpage. Les images sont espacées uniformément pour faciliter le travail des élèves de maternelle. Aucune image ne se chevauche grâce au système de positionnement intelligent. Le résultat est une fiche à imprimer gratuit professionnelle en quelques secondes.

Basculez vers l'onglet "Corrigé" pour voir la solution générée automatiquement. Le corrigé affiche les images déjà triées dans les bonnes catégories. Les élèves utilisent le corrigé pour vérifier leur travail de manière autonome. Cette fonctionnalité développe l'autonomie dans les exercices CP d'apprendre à lire et de reconnaissance.

Régénérez une nouvelle fiche en cliquant à nouveau sur "Créer" si nécessaire. Chaque génération mélange les positions des images découpables différemment. Créez plusieurs versions des mêmes exercices pour éviter la copie entre élèves. Les fiches maternelle variées maintiennent l'intérêt lors des ateliers alphabet et des activités de classement.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Étape 4 : Personnalisez sur le Canevas - Fiches Maternelle avec Tables de Multiplication et Écriture',
        description: `Modifiez tous les éléments de vos fiches maternelle directement sur le canevas après la génération. Cliquez sur une image pour la sélectionner et révéler les poignées de redimensionnement. Faites glisser les coins pour agrandir ou rétrécir l'image proportionnellement. Faites pivoter l'image en faisant glisser la poignée de rotation circulaire.

Déplacez les cadres de catégories pour ajuster l'espace disponible selon vos besoins. Redimensionnez les zones pour accommoder plus ou moins d'images par catégorie. Cette flexibilité permet d'adapter les exercices CP aux différents niveaux de maternelle. Créez des variantes pour les élèves de PS, MS et GS dans la même classe.

Ajoutez du texte personnalisé avec l'outil Texte dans le panneau latéral. Tapez des instructions spécifiques comme "Trie les formes géométriques" pour les exercices maths. Ajoutez des consignes d'écriture cursive pour combiner tri et pratique de l'écriture. Changez la police, la taille, la couleur et l'épaisseur du contour du texte.

Utilisez les outils d'alignement pour positionner précisément les éléments sur la page. Alignez plusieurs images horizontalement pour créer des rangées uniformes. Centrez les titres de catégories automatiquement avec un clic. Verrouillez les éléments que vous ne voulez pas déplacer accidentellement. Les boutons Annuler et Refaire corrigent les erreurs instantanément.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Étape 5 : Téléchargez et Imprimez - Fiches à Imprimer Gratuit en PDF pour Exercices CE1',
        description: `Téléchargez vos fiches maternelle finalisées en cliquant sur le menu Télécharger. Sélectionnez "Fiche (PDF)" pour obtenir la meilleure qualité d'impression. Le format PDF préserve la résolution 300 DPI pour une netteté professionnelle. Choisissez "Fiche (JPEG)" pour partager numériquement avec les parents ou sur les réseaux sociaux.

Téléchargez également le corrigé en sélectionnant "Corrigé (PDF)" ou "Corrigé (JPEG)". Imprimez le corrigé sur papier de couleur différente pour le distinguer facilement des fiches élèves. Affichez le corrigé au tableau pour la correction collective des exercices CP. Distribuez des copies du corrigé pour l'auto-correction en ateliers autonomes.

Activez l'option "Niveaux de gris" avant le téléchargement pour économiser l'encre couleur. Cette conversion instantanée transforme vos fiches maternelle colorées en noir et blanc. Imprimez des centaines d'exercices CE1 sans vider vos cartouches d'encre. La qualité reste excellente même en impression monochrome pour les activités de coloriage à imprimer.

Ouvrez le fichier PDF téléchargé et imprimez selon vos besoins. Imprimez un exemplaire pour tester avant de produire 30 copies pour la classe. Plastifiez les fiches à imprimer gratuit pour créer des activités réutilisables en atelier. Les élèves utilisent des feutres effaçables sur les fiches plastifiées pour les tables de multiplication et les exercices d'écriture cursive répétitifs.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from picture-sort.md use case sections
  useCases: {
    sectionTitle: 'Fiche Gratuite pour Enfants - Fiche pour Maternelle avec Imprimables Gratuits. Fiche pour Enfants',
    sectionDescription: 'Notre générateur de fiches de tri d\'images répond aux besoins variés des professionnels de l\'éducation. Six profils d\'utilisateurs bénéficient particulièrement de cet outil polyvalent. Chaque groupe trouve des applications spécifiques adaptées à son contexte pédagogique. Les fiches à imprimer gratuit conviennent à l\'enseignement en classe comme à l\'instruction à domicile.',
    badgeText: 'Pour Qui',
    readMoreLabel: 'Lire la suite',
    showLessLabel: 'Voir moins',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // FAQ Section - Selected FAQs from picture-sort.md
  faq: {
    sectionTitle: 'FAQ - Fiche Gratuite pour Enfants et Fiche pour Maternelle. Fiche pour Enfants',
    sectionDescription: 'Les enseignants posent régulièrement des questions sur notre générateur de fiches de tri d\'images. Cette section répond aux interrogations les plus courantes concernant les exercices maths, le graphisme maternelle et les activités d\'alphabet. Découvrez comment maximiser votre abonnement Accès Complet pour créer des fiches à imprimer gratuit en illimité.',
    showMoreText: 'Voir plus de questions',
    showLessText: 'Voir moins',
    badgeText: 'FAQ',
    readMoreLabel: 'Lire la suite',
    showLessLabel: 'Voir moins',
    secureCheckout: 'Paiement sécurisé',
    cancelAnytime: 'Résiliez à tout moment',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // Pricing - Accès Complet Bundle for Picture Sort
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

  // Related Apps - From picture-sort.md Section 7
  relatedApps: {
    sectionTitle: 'Fiches Gratuites Combiner - Fiche pour Enfants et Imprimables Gratuits',
    sectionDescription: 'Votre abonnement Accès Complet inclut 33 générateurs d\'activités pédagogiques différents. Combinez le générateur de fiches de tri avec d\'autres outils pour créer des paquets thématiques complets. Cette approche intégrée renforce l\'apprentissage en abordant les concepts sous plusieurs angles. Les élèves bénéficient d\'activités variées ciblant les mêmes objectifs pédagogiques avec des exercices CE1 diversifiés.',
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

export default pictureSortFrContent;
