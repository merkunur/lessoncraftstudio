import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Coloring Worksheets - French Content
 *
 * File: frontend/content/product-pages/fr/coloring-worksheets.ts
 * URL: /fr/apps/coloriage-fiches (French SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/French/coloring.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const coloringFrContent: ProductPageContent = {
  // SEO Metadata - French language-specific
  seo: {
    slug: 'coloriage-fiches',
    appId: 'coloring',
    title: 'Coloriage à Imprimer Gratuit | Générateur de Fiches Maternelle et CP',
    description: 'Créez des coloriages personnalisés avec 3000+ images. Générateur de fiches maternelle gratuit en PDF 300 DPI. Parfait pour enseignants et parents.',
    keywords: 'coloriage à imprimer, fiches maternelle, graphisme maternelle, fiches à imprimer gratuit, exercices CP, exercices CE1, coloriage enfant, générateur coloriage, coloriage maternelle, pages de coloriage',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fr/apps/coloriage-fiches',
      },

  // Hero Section - FULL text from coloring.md paragraphs 1-3
  hero: {
    title: 'Coloriage à Imprimer Gratuit',
    subtitle: 'Créateur de Fiches Maternelle et Exercices CP',
    description: `Créez des pages de coloriage personnalisées en quelques clics. Avec votre abonnement Pack Essentiel, vous accédez à un générateur professionnel de coloriage à imprimer. Transformez vos idées en fiches maternelle prêtes à l'emploi. Plus de 3000 images adaptées aux enfants vous attendent.

Les enseignants de maternelle et CP adorent cet outil. Fini les heures passées à chercher des coloriages adaptés. Votre abonnement vous donne accès illimité à la création de fiches à imprimer gratuit. Aucun frais supplémentaire par fiche créée.

Le créateur de coloriage fonctionne en 11 langues. Parfait pour les classes bilingues et l'enseignement du français langue étrangère. Téléchargez vos créations en PDF haute qualité 300 DPI. Idéal pour l'impression professionnelle et la vente sur Teachers Pay Teachers.`,
    previewImageSrc: '/samples/french/coloring/sample-1.jpeg',
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
        videoId: 'ZdpCr2txHcc',
        buttonText: 'Fonctions Coloriage',
        modalTitle: 'Tutoriel Coloriage',
      },
    },
  },

  // Sample Gallery - REAL file paths from samples/english/coloring/
  samples: {
    sectionTitle: 'Fiche Gratuite pour Enfants - Fiches Gratuites et Imprimables Gratuits',
    sectionDescription: 'Téléchargez imprimables gratuits - Fiche gratuite pour enfants de qualité professionnelle. Fiches gratuites et fiche pour enfants parfaites pour fiche pour maternelle. Fiche gratuite pour enfants et fiches gratuites inclus matériel éducatif. Fiche gratuite et fiches gratuites disponible',
    downloadLabel: 'Télécharger Exemple',
    worksheetLabel: 'Coloriage',
    answerKeyLabel: 'Corrigé',
    viewAllLabel: 'Agrandir',
    noPdfLabel: 'Aperçu uniquement',
    freePdfCountLabel: 'téléchargements gratuits',
    badgeText: 'Exemples Gratuits',
    downloadingLabel: 'Téléchargement...',
    ofLabel: 'sur',
    items: [],
    
  },

  // Features Grid - FULL text from coloring.md feature sections
  features: {
    sectionTitle: 'Fiches Gratuites et Fiche pour Enfants - Imprimables Gratuits et Fiche pour Maternelle',
    sectionDescription: 'Notre créateur de coloriage offre des fonctionnalités professionnelles. Chaque outil a été pensé pour les enseignants et parents. Découvrez comment créer des fiches à imprimer gratuit en quelques minutes.',
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

  // How-To Guide - FULL text from coloring.md step sections
  howTo: {
    sectionTitle: 'Fiche Gratuite pour Enfants Créer - Fiche pour Maternelle',
    sectionDescription: 'Créez vos premières fiches à imprimer gratuit en moins de trois minutes. Notre guide détaillé vous accompagne étape par étape. Aucune expérience préalable nécessaire. Suivez ces cinq étapes pour des coloriages professionnels.',
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
        title: 'Choisir le Contenu de vos Fiches Maternelle - Thèmes et Coloriage à Imprimer',
        description: `Commencez par sélectionner votre thème dans le menu déroulant. Plus de 30 catégories thématiques vous attendent. Animaux de la ferme, véhicules, fruits et légumes sont populaires. Les saisons et fêtes complètent l'offre.

Le thème "Tous les thèmes" affiche l'ensemble de la bibliothèque. Utilisez la barre de recherche pour trouver rapidement. Tapez un mot-clé comme "chien" ou "voiture". Les résultats s'affichent instantanément.

Cliquez sur une image pour l'ajouter à votre page. L'image apparaît au centre du canevas. Répétez pour ajouter plusieurs éléments. Créez des fiches maternelle riches en illustrations.

Pour les exercices CP centrés sur l'alphabet, cherchez les lettres. Les images d'objets commençant par chaque lettre sont disponibles. Parfait pour apprendre les lettres en s'amusant. Le coloriage renforce la mémorisation.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Personnaliser les Paramètres - Graphisme Maternelle et Format de Page',
        description: `Accédez aux paramètres de page dans le panneau latéral. Choisissez entre format Letter et A4. L'orientation portrait convient aux fiches maternelle classiques. Le paysage offre plus d'espace horizontal.

Le format carré (1200x1200) est idéal pour Instagram. Les dimensions personnalisées permettent des créations uniques. Entrez la largeur et hauteur en pixels. Cliquez sur "Appliquer" pour confirmer.

La couleur de fond se modifie avec le sélecteur. Le blanc reste le choix classique pour l'impression. Les fonds colorés conviennent aux versions numériques. Économisez l'encre avec des fonds clairs.

Les bordures décoratives encadrent vos coloriages. Sélectionnez un thème de bordure dans le menu. Parcourez les miniatures disponibles. Cliquez pour appliquer la bordure choisie.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Générer et Prévisualiser - Fiches à Imprimer Gratuit et Exercices CE1',
        description: `Votre coloriage s'affiche en temps réel sur le canevas. Chaque modification apparaît instantanément. Pas besoin de cliquer sur "Générer". L'aperçu est toujours à jour.

Utilisez le zoom pour vérifier les détails. Les exercices CE1 avec petits éléments nécessitent une vérification. Assurez-vous que chaque image reste visible après impression. Les lignes fines doivent rester nettes.

Le format d'export 300 DPI garantit la qualité finale. Ce que vous voyez à l'écran sera imprimé fidèlement. Les fiches à imprimer gratuit conservent leur netteté. Aucune surprise à l'impression.

Vérifiez l'équilibre visuel de votre composition. Les images doivent être bien réparties. Laissez de l'espace pour colorier confortablement. Les enfants apprécient les zones de coloriage généreuses.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Éditer sur le Canevas - Coloriage à Imprimer avec Écriture Cursive',
        description: `Sélectionnez n'importe quel élément en cliquant dessus. La barre d'outils contextuelle apparaît automatiquement. Huit poignées entourent l'objet sélectionné. Utilisez-les pour transformer l'élément.

Déplacez les images par glisser-déposer. Positionnez-les exactement où vous le souhaitez. Les exercices CP bien organisés facilitent l'apprentissage. L'alignement précis donne un aspect professionnel.

Redimensionnez en tirant les coins. Maintenez Shift pour conserver les proportions. Les petites images conviennent aux exercices maths avec comptage. Les grandes images servent de coloriage principal.

Faites pivoter avec la poignée supérieure. L'angle de rotation s'affiche pendant la manipulation. Créez des compositions dynamiques et originales. Les fiches maternelle gagnent en attrait visuel.

Ajoutez du texte pour les consignes ou titres. Le bouton "Ajouter texte" ouvre les options. Choisissez la police parmi sept options. Ajustez la taille selon vos besoins.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Télécharger et Imprimer - Fiches Maternelle PDF et Exercices CP de Qualité',
        description: `Cliquez sur le bouton "Télécharger" en haut de page. Un menu déroulant propose deux formats. JPEG pour les images individuelles. PDF pour l'impression professionnelle.

L'option "Niveaux de gris" convertit en noir et blanc. Économisez l'encre couleur pour les impressions massives. Les fiches à imprimer gratuit restent parfaitement lisibles. Les contours conservent leur netteté.

Le téléchargement démarre automatiquement. Le fichier apparaît dans votre dossier de téléchargements. Ouvrez-le pour vérification avant impression. La qualité 300 DPI garantit des résultats impeccables.

Imprimez sur votre imprimante personnelle ou professionnelle. Le format PDF s'adapte à toutes les imprimantes. Les fiches maternelle s'impriment sans perte de qualité. Distribuez à vos élèves immédiatement.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from coloring.md use case sections
  useCases: {
    sectionTitle: 'Fiche Gratuite pour Enfants - Fiche pour Maternelle avec Imprimables Gratuits. Fiche pour Enfants',
    sectionDescription: 'Notre créateur de coloriages répond aux besoins de nombreux utilisateurs. Enseignants, parents et éducateurs trouvent des solutions adaptées. Découvrez comment chaque profil exploite les fiches à imprimer gratuit.',
    badgeText: 'Pour Qui',
    readMoreLabel: 'Lire la suite',
    showLessLabel: 'Voir moins',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // FAQ Section - Selected FAQs from coloring.md
  faq: {
    sectionTitle: 'FAQ - Fiche Gratuite pour Enfants et Fiche pour Maternelle. Fiche pour Enfants',
    sectionDescription: 'Questions fréquentes sur notre générateur de coloriage à imprimer et nos fiches maternelle.',
    showMoreText: 'Voir plus de questions',
    showLessText: 'Voir moins',
    badgeText: 'FAQ',
    readMoreLabel: 'Lire la suite',
    showLessLabel: 'Voir moins',
    secureCheckout: 'Paiement sécurisé',
    cancelAnytime: 'Résiliez à tout moment',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // Pricing
  pricing: {
    title: 'Pack Essentiel',
    price: '144€',
    priceInterval: '/an',
    priceSuffix: 'Facturation annuelle',
    benefits: [
      'Création de coloriages illimitée',
      'Licence commerciale incluse',
      '11 langues supportées',
      '3000+ images thématiques',
      'Qualité d\'impression 300 DPI',
      'Export PDF et JPEG',
    ],
    ctaText: 'Commencer Maintenant',
    bundleDescription: 'Votre abonnement inclut l\'acces a 10 generateurs de fiches:',
    bundleApps: [
      'Addition Images',
      'Train Alphabet',
      'Coloriages',
      'Fiches de Maths',
      'Mots Melanges',
      'Cherche et Compte',
      'Jeu d\'Association',
      'Tracer des Lignes',
      'Bingo Images',
      'Sudoku',
    ],
  },

  // Related Apps
  relatedApps: {
    sectionTitle: 'Fiches Gratuites Combiner - Fiche pour Enfants et Imprimables Gratuits',
    sectionDescription: 'Créez des paquets d\'apprentissage complets en combinant les coloriages avec ces générateurs complémentaires.',
    ctaTitle: 'Prêt à Créer des Coloriages Fantastiques ?',
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

export default coloringFrContent;
