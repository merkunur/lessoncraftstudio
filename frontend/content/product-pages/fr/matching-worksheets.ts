import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Matching Worksheets - French Content
 *
 * File: frontend/content/product-pages/fr/matching-worksheets.ts
 * URL: /fr/apps/association-fiches (French SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/French/matching.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const matchingFrContent: ProductPageContent = {
  // SEO Metadata - French language-specific
  seo: {
    slug: 'association-fiches',
    appId: 'matching',
    title: 'Fiches d\'Association | Fiches Maternelle et Exercices CP pour',
    description: 'Créez des fiches d\'association professionnelles avec notre générateur MatchUp Maker. Votre abonnement Pack Essentiel vous donne un accès illimité à la création.',
    keywords: 'fiches association, fiches maternelle, exercices CP, fiches à imprimer gratuit, apprendre à lire, fiches alphabet, graphisme maternelle, exercices maths, apprendre les lettres, coloriage à imprimer, écriture cursive, tables de multiplication',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fr/apps/association-fiches',
      },

  // Hero Section - FULL text from matching.md paragraphs 1-6
  hero: {
    title: 'Générateur de Fiches d\'Association',
    subtitle: 'Fiches Maternelle et Exercices CP pour Apprendre à Lire',
    description: `Créez des fiches d'association professionnelles avec notre générateur MatchUp Maker. Votre abonnement Pack Essentiel vous donne un accès illimité à la création de fiches sans frais supplémentaires par fiche. Générez des fiches maternelle personnalisées parfaites pour les élèves de maternelle et de CP. Téléchargez des fichiers PDF haute qualité en moins de 3 minutes. Économisez des heures de préparation chaque semaine.

Notre générateur de fiches d'association aide les enseignants à créer des exercices éducatifs où les élèves tracent des lignes pour relier des paires correspondantes. Choisissez parmi quatre modes d'association incluant l'association image-lettre pour apprendre les lettres de l'alphabet. Essayez l'association image-mot pour les exercices CP de lecture. Utilisez l'association vocabulaire personnalisé pour les fiches de phonologie et la compréhension en lecture. Parfait pour le développement des compétences en lecture dans les classes de maternelle et d'école élémentaire.

MatchUp Maker offre une création de contenu flexible pour toutes les matières. Créez des exercices maths avec association visuelle pour la reconnaissance des nombres et la pratique du calcul. Générez des fiches d'addition où les élèves associent problèmes et réponses. Construisez des fiches alphabet pour la reconnaissance des lettres en maternelle. Concevez des activités de graphisme maternelle combinées avec des exercices d'association pour le développement de la motricité fine. Tout le contenu utilise notre bibliothèque de plus de 3000 images adaptées aux enfants.`,
    previewImageSrc: '/samples/english/matching/matching portrait.jpeg',
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

  // Sample Gallery - REAL file paths from samples/english/matching/
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

  // Features Grid - FULL text from matching.md feature sections
  features: {
    sectionTitle: 'Fiches Gratuites et Fiche pour Enfants - Imprimables Gratuits et Fiche pour Maternelle',
    sectionDescription: 'Notre générateur de fiches d\'association inclut des fonctionnalités professionnelles conçues spécifiquement pour les enseignants créant des fiches maternelle et des exercices CP. Chaque fonctionnalité vous aide à construire des fiches à imprimer gratuit plus rapidement que les méthodes traditionnelles. Créez des fiches alphabet, des exercices maths, des activités pour apprendre à lire et des fiches de graphisme maternelle avec le même outil simple. Accédez à toutes les fonctionnalités premium avec votre abonnement Pack Essentiel. Pas de frais par fiche, pas de frais d\'image, pas de coûts de modèle. Générez des fiches d\'association illimitées pour tous vos besoins pédagogiques.',
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

  // How-To Guide - FULL text from matching.md step sections
  howTo: {
    sectionTitle: 'Fiche Gratuite pour Enfants Créer - Fiche pour Maternelle',
    sectionDescription: 'Créer des fiches d\'association prend moins de 3 minutes du début au téléchargement. Suivez cinq étapes simples pour générer des fiches maternelle et des exercices CP professionnels. Aucune expérience en design requise pour créer des fiches alphabet, des exercices maths ou des activités pour apprendre à lire. Choisissez votre mode d\'association, sélectionnez les images, personnalisez les paramètres, modifiez sur le canevas et téléchargez. Votre abonnement Pack Essentiel inclut une génération illimitée de fiches sans limite de temps. Créez autant de fiches à imprimer gratuit que vos élèves en ont besoin.',
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
        title: 'Étape 1 : Choisissez le Contenu pour Vos Fiches Maternelle - Fiches Alphabet et Exercices pour Apprendre à Lire',
        description: `Sélectionnez d'abord votre mode d'association pour déterminer le type de contenu de la fiche. Cliquez sur le menu déroulant "Mode d'Association" dans la barre latérale gauche sous Configuration de la Fiche. Quatre modes disponibles pour différents objectifs d'apprentissage des fiches maternelle et des exercices CE1.

Choisissez le mode Image vers Première Lettre pour les fiches alphabet et la pratique de reconnaissance des lettres. Parfait pour apprendre les lettres et développer la conscience phonologique. Les élèves associent les images aux lettres majuscules. Pomme s'associe à P, dragon s'associe à D. Le système génère automatiquement la lettre basée sur le nom de l'image.

Sélectionnez le mode Image Plus Mot pour les fiches de vocabulaire et le renforcement lexical. Les deux colonnes montrent des paires image-mot identiques dans un ordre différent. Les élèves associent les paires qu'ils reconnaissent. Idéal pour les exercices CP développant la reconnaissance des mots.

Choisissez le mode Image ou Mot pour des exercices CE1 flexibles. Décidez si chaque élément s'affiche comme image ou mot. Créez des combinaisons personnalisées pour l'instruction différenciée.

Sélectionnez le mode Image vers Mot Personnalisé pour les fiches de vocabulaire spécifiques. Associez images à définitions, traductions ou phrases personnalisées. Parfait pour les exercices maths associant formes et termes géométriques.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Étape 2 : Personnalisez les Paramètres des Exercices CP - Format et Options des Fiches à Imprimer Gratuit',
        description: `Définissez le nombre de paires d'association pour votre fiche. Cliquez sur le menu déroulant "Nombre Maximum de Paires". Choisissez 4, 5 ou 6 paires selon le niveau des élèves. Quatre paires conviennent bien aux fiches maternelle pour les débutants. Six paires représentent un défi pour les exercices CE1 avancés.

Sélectionnez la taille et l'orientation de votre page. Cliquez sur le menu déroulant "Taille de Page" en haut de la barre latérale. Choisissez Letter Portrait pour des fiches maternelle verticales standard. Sélectionnez Letter Paysage pour des mises en page horizontales plus larges. Choisissez A4 Portrait ou A4 Paysage pour le format papier européen standard.

Configurez les champs nom et date pour la gestion de classe. Cochez "Inclure Champs Nom/Date" pour ajouter des lignes d'information élève. Des lignes vierges apparaissent en haut de la fiche. Les élèves écrivent leurs noms avant de compléter les activités d'association.

Définissez les préférences de numérotation des éléments pour faciliter l'instruction. Cochez "Inclure Numéros d'Éléments" pour afficher 1, 2, 3 avant chaque paire d'association. Les numéros vous aident à référencer des éléments spécifiques pendant l'enseignement.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Étape 3 : Générez Votre Fiche d\'Association - Fiches Maternelle Instantanées et Exercices Maths',
        description: `Cliquez sur le bouton "Créer" dans le coin supérieur droit de l'écran. Un menu déroulant apparaît avec deux options. Cliquez sur "Créer Fiche" pour créer votre fiche d'association. Le système traite vos paramètres et construit la fiche en quelques secondes.

Regardez votre fiche d'association apparaître sur le canevas. Les images se chargent dans les colonnes gauche et droite. Les éléments textuels apparaissent si vous utilisez des modes basés sur les mots. La bordure de page, l'arrière-plan et les éléments décoratifs s'ajoutent automatiquement. Les champs nom et date apparaissent en haut si activés.

Le canevas de la fiche montre vos exercices CP exactement comme les élèves les verront. La colonne gauche contient la première moitié des paires d'association. La colonne droite montre la seconde moitié dans un ordre mélangé. Les élèves traceront des lignes reliant les éléments correspondants.

La génération prend 10-15 secondes pour la plupart des fiches maternelle. Les fiches complexes avec de nombreuses images personnalisées peuvent prendre 20-30 secondes. Un indicateur de progression montre que le système travaille. La fiche générée s'enregistre automatiquement.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Étape 4 : Modifiez les Fiches sur le Canevas - Personnalisez Graphisme Maternelle et Coloriage à Imprimer',
        description: `Cliquez sur n'importe quelle image de votre fiche d'association pour la sélectionner. Un cadre bleu avec des poignées d'angle apparaît autour de l'objet sélectionné. Faites glisser l'image vers une nouvelle position n'importe où sur le canevas. Redimensionnez l'image en tirant les poignées d'angle. Faites pivoter l'image en saisissant le contrôle de rotation au-dessus de l'objet.

Déplacez les éléments pour créer des mises en page plus équilibrées sur vos exercices CE1. Écartez les paires pour faciliter le tracé des lignes. Regroupez visuellement les éléments liés. Ajustez l'espacement pour les élèves ayant des difficultés de motricité fine.

Ajoutez des instructions textuelles personnalisées n'importe où sur vos fiches maternelle. Cliquez sur "Outils Texte" dans la barre latérale gauche. Tapez le texte d'instruction dans le champ de saisie. Choisissez la police, la taille et la couleur. Cliquez sur "Ajouter Texte" pour placer le texte sur le canevas.

Appliquez des arrière-plans pour rendre les fiches d'association plus engageantes. Cliquez sur le menu déroulant "Thème d'Arrière-plan" dans la section Configuration de Page. Choisissez parmi des dizaines d'arrière-plans thématiques.

Utilisez les outils d'alignement pour des mises en page professionnelles. Sélectionnez plusieurs éléments en cliquant tout en maintenant la touche Maj. Cliquez sur les boutons d'alignement dans la barre d'outils contextuelle.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Étape 5 : Téléchargez les Fiches à Imprimer - PDF et JPEG Haute Qualité pour Exercices CP et Écriture Cursive',
        description: `Générez le corrigé avant de télécharger. Cliquez sur le bouton déroulant "Créer" dans le coin supérieur droit. Sélectionnez l'option "Créer Corrigé". Le système crée un corrigé d'association montrant les paires correctes reliées par des lignes. Le corrigé apparaît sur un onglet Corrigé séparé.

Le corrigé reflète exactement la mise en page de votre fiche. Les mêmes images apparaissent aux mêmes positions. Des lignes de connexion montrent les associations correctes entre les paires. Les enseignants voient les solutions d'un coup d'œil. Les corrigés font gagner du temps pendant la correction. La fiche et le corrigé se téléchargent ensemble.

Cliquez sur le bouton déroulant "Télécharger" après avoir généré la fiche et le corrigé. Quatre options de format de téléchargement apparaissent. Choisissez le format JPEG ou PDF pour la fiche. Sélectionnez le format JPEG ou PDF pour le corrigé. Téléchargez chacun séparément ou téléchargez tout ensemble.

Sélectionnez le format JPEG pour un partage numérique rapide des fiches maternelle. Les fichiers JPEG s'ouvrent dans n'importe quelle visionneuse d'images. Facile à envoyer par email aux parents ou à partager dans Google Classroom.

Choisissez le format PDF pour imprimer des fiches à imprimer gratuit en qualité maximale. Le PDF maintient la mise en page et le formatage exacts. Compatible avec toutes les imprimantes. Apparence professionnelle pour la vente commerciale sur Teachers Pay Teachers.

Activez l'option niveaux de gris avant de télécharger pour économiser l'encre d'imprimante. Cochez la case "Niveaux de Gris" dans le menu déroulant de téléchargement. La fiche se convertit en noir et blanc.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from matching.md use case sections
  useCases: {
    sectionTitle: 'Fiche Gratuite pour Enfants - Fiche pour Maternelle avec Imprimables Gratuits. Fiche pour Enfants',
    sectionDescription: 'Les fiches d\'association répondent à différents besoins éducatifs dans divers environnements d\'enseignement. Les enseignants de maternelle utilisent les fiches d\'association pour la reconnaissance des lettres et la pratique du graphisme. Les enseignants de CP construisent des fiches pour apprendre à lire et développer la lecture. Les parents pratiquant l\'instruction en famille créent des fiches alphabet personnalisées au rythme d\'apprentissage individuel. Les enseignants de FLE conçoivent des exercices maths avec support visuel du vocabulaire. Les enseignants spécialisés génèrent des fiches à imprimer gratuit différenciées pour différents niveaux.',
    badgeText: 'Cas d\'Utilisation',
    readMoreLabel: 'Lire la suite',
    showLessLabel: 'Voir moins',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // FAQ Section - Selected FAQs from matching.md
  faq: {
    sectionTitle: 'FAQ - Fiche Gratuite pour Enfants et Fiche pour Maternelle. Fiche pour Enfants',
    sectionDescription: 'Les enseignants posent des questions courantes sur la création de fiches d\'association avec MatchUp Maker. Les questions couvrent les exigences d\'abonnement, les capacités d\'impression, les options de personnalisation et les licences commerciales. Découvrez la création de fiches alphabet, la personnalisation des exercices maths, la génération de fiches pour apprendre à lire et le téléchargement de fiches à imprimer gratuit.',
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
    priceSuffix: 'Facturé annuellement',
    benefits: [
      'Création illimitée de fiches',
      'Licence commerciale incluse',
      '11 langues disponibles',
      '3000+ images thématiques',
      'Qualité 300 DPI professionnelle',
      'Corrigés automatiques inclus',
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

  // Related Apps - From matching.md Section 7
  relatedApps: {
    sectionTitle: 'Fiches Gratuites Combiner - Fiche pour Enfants et Imprimables Gratuits',
    sectionDescription: 'Les fiches d\'association se combinent parfaitement avec d\'autres fiches à imprimer pour créer des packs d\'apprentissage complets. Les enseignants utilisent l\'association aux côtés des exercices maths pour une instruction complète des nombres. Associez fiches alphabet et association pour des programmes complets de reconnaissance des lettres.',
    ctaTitle: 'Prêt à Créer des Fiches Professionnelles ?',
    ctaDescription: 'Rejoignez des milliers d\'enseignants qui créent des fiches maternelle de qualité. Création illimitée, licence commerciale incluse.',
    primaryCtaText: 'Essai Gratuit',
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

export default matchingFrContent;
