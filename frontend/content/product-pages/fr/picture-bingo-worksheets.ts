import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Picture Bingo Worksheets - French Content
 *
 * File: frontend/content/product-pages/fr/picture-bingo-worksheets.ts
 * URL: /fr/apps/bingo-images-fiches (French SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/French/picture-bingo.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const pictureBingoFrContent: ProductPageContent = {
  // SEO Metadata - French language-specific
  seo: {
    slug: 'bingo-images-fiches',
    appId: 'bingo',
    title: 'Générateur de Cartes Bingo Illustrées | Fiches Maternelle à Imprimer',
    description: 'Créez des cartes bingo professionnelles avec notre générateur de fiches à imprimer gratuit. Votre abonnement Pack Essentiel vous offre une création illimitée.',
    keywords: 'bingo images, cartes bingo, fiches maternelle, fiches à imprimer gratuit, exercices CP, exercices CE1, graphisme maternelle, jeux éducatifs, bingo alphabet, bingo maths, apprendre à lire',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fr/apps/bingo-images-fiches',
    images: [
      {
        url: 'https://www.lessoncraftstudio.com/samples/french/bingo/sample-1.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Fiche gratuite de bingo images pour maternelle - cartes bingo illustrées avec jetons d\'appel',
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/french/bingo/sample-2.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Fiche gratuite pour enfants - bingo images thématique pour exercices CP CE1',
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/french/bingo/sample-3.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Fiches gratuites de bingo - cartes bingo pour fiches maternelle et graphisme',
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/french/bingo/sample-4.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Fiche pour maternelle - bingo images éducatif avec feuille d\'appel',
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/french/bingo/sample-5.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Imprimables gratuits de bingo - fiches à imprimer gratuit pour exercices maths',
      },
    ],
  },

  // Hero Section - FULL text from picture-bingo.md paragraphs 1-3
  hero: {
    title: 'Bingo Images',
    subtitle: 'Fiches Maternelle et Exercices CP CE1 pour Apprendre en Jouant',
    description: `Créez des cartes bingo professionnelles avec notre générateur de fiches à imprimer gratuit. Votre abonnement Pack Essentiel vous offre une création illimitée de fiches maternelle sans frais supplémentaires par fiche. Générez des cartes bingo personnalisées parfaites pour la maternelle et les exercices CP CE1. Téléchargez vos fiches de qualité professionnelle en PDF ou JPEG en moins de 3 minutes.

Les cartes bingo illustrées combinent apprentissage visuel et jeu interactif. Les enseignants utilisent ces fiches maternelle pour renforcer la reconnaissance de l'alphabet, les exercices maths, le graphisme maternelle et l'apprentissage de la lecture. Chaque fiche bingo comprend une grille personnalisable et des jetons d'appel assortis sur une seule page imprimable. Générez de 1 à 10 cartes bingo uniques en un seul clic pour des activités en classe entière. Vos élèves restent motivés tout en pratiquant les compétences essentielles de maternelle et CP grâce à des jeux de bingo ludiques.

Notre générateur de bingo illustré crée deux fiches à imprimer à chaque génération. La fiche principale présente vos images ou mots choisis dans un format grille avec des jetons d'appel circulaires en dessous. La feuille d'appel séparée affiche tous les éléments pour que l'enseignant puisse les utiliser pendant le jeu. Les deux fiches sont entièrement modifiables après génération. Personnalisez les couleurs, ajoutez du texte, téléchargez vos propres images et ajustez la mise en page selon vos plans de cours. Créez des fiches à imprimer gratuit illimitées pour les exercices maths, les exercices CP, l'alphabet, le graphisme maternelle et bien plus avec votre abonnement Pack Essentiel.`,
    previewImageSrc: '/samples/french/bingo/sample-1.jpeg',
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

  // Sample Gallery - REAL file paths from samples/english/bingo/
  samples: {
    sectionTitle: 'Fiche Gratuite pour Enfants - Fiches Gratuites et Imprimables Gratuits',
    sectionDescription: 'Téléchargez imprimables gratuits - Fiche gratuite pour enfants de qualité professionnelle. Fiches gratuites et fiche pour enfants parfaites pour fiche pour maternelle. Fiche gratuite pour enfants et fiches gratuites inclus matériel éducatif. Fiche gratuite et fiches gratuites disponible',
    downloadLabel: 'Télécharger Exemple Gratuit',
    worksheetLabel: 'Carte Bingo',
    answerKeyLabel: 'Feuille d\'Appel',
    viewAllLabel: 'Agrandir',
    noPdfLabel: 'Aperçu uniquement',
    freePdfCountLabel: 'téléchargements gratuits',
    badgeText: 'Exemples Gratuits',
    downloadingLabel: 'Téléchargement...',
    ofLabel: 'sur',
    items: [
      {
        id: '1',
        worksheetSrc: '/samples/french/bingo/sample-1.jpeg',
        answerKeySrc: '/samples/french/bingo/sample-1-answer.jpeg',
        altText: 'Fiche gratuite de bingo images pour maternelle - cartes bingo illustrées avec jetons d\'appel circulaires pour la reconnaissance visuelle',
        pdfDownloadUrl: '/samples/french/bingo/sample-1.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/french/bingo/sample-2.jpeg',
        answerKeySrc: '/samples/french/bingo/sample-2-answer.jpeg',
        altText: 'Fiche gratuite pour enfants - bingo images thématique pour exercices CP CE1 et apprentissage du vocabulaire',
        pdfDownloadUrl: '/samples/french/bingo/sample-2.pdf',
      },
      {
        id: '3',
        worksheetSrc: '/samples/french/bingo/sample-3.jpeg',
        answerKeySrc: '/samples/french/bingo/sample-3-answer.jpeg',
        altText: 'Fiches gratuites de bingo images - cartes bingo pour fiches maternelle et graphisme maternelle',
        pdfDownloadUrl: '/samples/french/bingo/sample-3.pdf',
      },
      {
        id: '4',
        worksheetSrc: '/samples/french/bingo/sample-4.jpeg',
        answerKeySrc: '/samples/french/bingo/sample-4-answer.jpeg',
        altText: 'Fiche pour maternelle - bingo images éducatif avec feuille d\'appel pour exercices maths',
        pdfDownloadUrl: '/samples/french/bingo/sample-4.pdf',
      },
      {
        id: '5',
        worksheetSrc: '/samples/french/bingo/sample-5.jpeg',
        answerKeySrc: '/samples/french/bingo/sample-5-answer.jpeg',
        altText: 'Imprimables gratuits de bingo images - fiches à imprimer gratuit pour apprendre à lire et coloriage à imprimer',
        pdfDownloadUrl: '/samples/french/bingo/sample-5.pdf',
      },
    ],
  },

  // Features Grid - FULL text from picture-bingo.md feature sections
  features: {
    sectionTitle: 'Fiches Gratuites et Fiche pour Enfants - Imprimables Gratuits et Fiche pour Maternelle',
    sectionDescription: 'Notre générateur de cartes bingo illustrées comprend tout ce dont les enseignants ont besoin pour créer des fiches maternelle professionnelles et des exercices CP CE1. Générez des fiches à imprimer gratuit personnalisables pour les exercices maths, les activités de graphisme maternelle, l\'apprentissage de l\'alphabet et le coloriage à imprimer. Chaque fonctionnalité vous aide à créer des fiches pédagogiques engageantes que vos élèves adorent. Votre abonnement Pack Essentiel vous donne un accès illimité à toutes les fonctionnalités du bingo illustré sans frais par fiche.',
    highlightBadgeText: 'Fonctionnalité Clé',
    readMoreLabel: 'Lire la suite',
    showLessLabel: 'Voir moins',
    badgeText: 'Fonctionnalités',
    trustBadges: {
      allFeatures: 'Toutes les fonctionnalités incluses',
      noHiddenFees: 'Aucun frais caché',
      cancelAnytime: 'Annulez à tout moment',
    },
    items: [
      {
        id: '1',
        icon: '⚡',
        title: 'Créez des Fiches Maternelle en 3 Clics - Générateur Rapide de Fiches à Imprimer Gratuit',
        description: `Générez des cartes bingo complètes en moins de 3 minutes. Sélectionnez votre thème dans notre bibliothèque d'images. Choisissez la taille de grille de 3x3 à 5x5 cases. Cliquez sur Générer pour créer vos fiches maternelle instantanément. Notre générateur crée automatiquement la carte bingo et la feuille d'appel assortie. Aucune compétence en design n'est requise pour créer des fiches à imprimer gratuit professionnelles.

Les enseignants gagnent des heures par rapport à la création manuelle. Générez de 1 à 10 cartes uniques en un seul clic pour des activités en classe entière. Chaque fiche se télécharge en PDF ou JPEG haute qualité. Parfait pour les enseignants pressés qui ont besoin de fiches maternelle rapidement.`,
        highlighted: false,
      },
      {
        id: '2',
        icon: '✏️',
        title: 'Modifiez Tout sur Vos Fiches à Imprimer - Exercices CP CE1 et Graphisme Maternelle Personnalisables',
        description: `Chaque élément de vos cartes bingo est entièrement modifiable après génération. Cliquez sur n'importe quelle image, texte ou jeton pour le sélectionner. Déplacez les éléments n'importe où sur votre fiche. Redimensionnez les images plus grandes ou plus petites avec les poignées. Faites pivoter les éléments selon l'angle souhaité. Supprimez les éléments indésirables d'un clic.

Ajoutez du texte personnalisé à vos exercices CP avec sept options de polices. Modifiez les couleurs, tailles et styles de contour du texte. Déplacez les jetons d'appel pour créer des mises en page personnalisées. Ajustez l'espacement de la grille selon les groupes d'âge. Cette flexibilité d'édition rend notre générateur parfait pour créer des exercices CE1 et des fiches maternelle différenciées adaptées aux besoins de chaque élève.`,
        highlighted: true,
      },
      {
        id: '3',
        icon: '📤',
        title: 'Téléversez Vos Propres Images - Fiches Maternelle Personnalisées pour le Graphisme et l\'Écriture Cursive',
        description: `Personnalisez vos cartes bingo en téléchargeant vos propres images. Sélectionnez plusieurs fichiers images à la fois depuis votre ordinateur. Tous les formats courants fonctionnent : JPEG, PNG et GIF. Téléchargez des photos des créations artistiques de vos élèves pour des jeux de bingo artistiques. Ajoutez des images de sorties scolaires récentes pour créer des fiches mémoire bingo.

Combinez les images de la bibliothèque avec vos images téléchargées sur la même carte. Utilisez des photos d'élèves pour des activités de reconnaissance des prénoms en maternelle. Téléchargez des images spécifiques au programme pour le graphisme maternelle et l'écriture cursive. Les images personnalisées fonctionnent avec les cartes bingo basées sur les images et les mots. Créez des fiches à imprimer gratuit vraiment personnalisées qui correspondent aux expériences de vos élèves.`,
        highlighted: false,
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Bingo Illustré en 11 Langues - Fiches Maternelle Multilingues et Exercices CP pour Apprendre à Lire',
        description: `Générez des cartes bingo illustrées dans 11 langues différentes pour les classes bilingues et FLE. Interface disponible en français, anglais, espagnol, allemand, italien, portugais, néerlandais, danois, suédois, norvégien et finnois. La bibliothèque d'images comprend du contenu spécifique à chaque langue.

Les noms de fichiers images s'affichent automatiquement dans la langue sélectionnée pour les cartes bingo basées sur les mots. Créez des fiches pour apprendre à lire en espagnol pour les programmes bilingues. Générez des exercices alphabet en anglais pour les classes d'immersion. Créez des fiches maternelle en allemand pour les écoles internationales. Le support multilingue est essentiel pour les enseignants FLE qui ont besoin de fiches maternelle multilingues.`,
        highlighted: false,
      },
      {
        id: '5',
        icon: '💰',
        title: 'Licence Commerciale pour Vendre vos Fiches - Exercices Maths et Coloriage à Imprimer Professionnels',
        description: `Votre abonnement Pack Essentiel inclut une licence commerciale complète pour toutes les cartes bingo que vous créez. Vendez vos fiches sur Teachers Pay Teachers sans frais de licence supplémentaires. Proposez vos exercices maths et coloriage à imprimer dans votre boutique Etsy. Créez des cahiers d'activités pour Amazon KDP avec vos cartes bingo.

Aucune attribution requise lors de la vente de vos fiches maternelle. La qualité professionnelle 300 DPI garantit que vos fiches sont parfaites à l'impression. Les concurrents facturent 79 à 199 € par an en supplément pour les droits commerciaux. LessonCraft Studio inclut la licence commerciale dans votre abonnement Pack Essentiel à 144 € par an. Les enseignants entrepreneurs économisent des centaines d'euros tout en développant des revenus passifs.`,
        highlighted: true,
      },
      {
        id: '6',
        icon: '🎨',
        title: 'Bibliothèque de 3000+ Images - Fiches Maternelle Thématiques pour l\'Alphabet et Apprendre les Lettres',
        description: `Accédez à plus de 3000 images adaptées aux enfants organisées par thèmes éducatifs. Choisissez parmi les images alphabet pour les fiches apprendre les lettres et la reconnaissance des lettres en bingo. Sélectionnez des images mathématiques pour les exercices maths et les activités de reconnaissance des nombres. Parcourez les thèmes animaux pour des fiches sciences bingo.

Choisissez des images saisonnières pour créer des fiches maternelle thématiques sur les fêtes. La fonction de recherche vous aide à trouver rapidement des images spécifiques. Le sélecteur de thème charge instantanément des ensembles d'images complets pour une création rapide de fiches bingo. Toutes les images sont conçues spécifiquement pour l'éducation de la petite enfance.`,
        highlighted: false,
      },
      {
        id: '7',
        icon: '📊',
        title: 'Qualité Professionnelle 300 DPI - Fiches à Imprimer Gratuit pour Exercices CP CE1 et Tables de Multiplication',
        description: `Toutes les cartes bingo s'exportent en résolution professionnelle 300 DPI. Qualité parfaite pour l'impression à domicile ou à l'école. La haute résolution garantit des images nettes sur vos fiches maternelle. Téléchargez en PDF pour la meilleure qualité d'impression. Exportez en JPEG pour le partage numérique.

L'option niveaux de gris économise l'encre lors de l'impression de grands ensembles de cartes. La qualité 300 DPI correspond aux normes d'impression professionnelle. Vos fiches bingo ont la même qualité que les supports achetés en magasin. Les élèves voient des images claires et nettes sur chaque fiche. Les exercices CP CE1 et tables de multiplication conservent leurs détails même imprimés en grand format.`,
        highlighted: false,
      },
    ],
  },

  // How-To Guide - FULL text from picture-bingo.md step sections
  howTo: {
    sectionTitle: 'Fiche Gratuite pour Enfants Créer - Fiche pour Maternelle',
    sectionDescription: 'Créez des cartes bingo professionnelles en moins de 3 minutes du début à la fin. Notre processus étape par étape vous guide de la sélection des images au téléchargement de fiches prêtes à imprimer. Aucune expérience en design n\'est nécessaire pour générer des fiches maternelle et des exercices CP CE1. Chaque étape ne prend que quelques secondes. Suivez ces cinq étapes simples pour créer des cartes bingo personnalisées pour les exercices maths, les activités de coloriage à imprimer, le graphisme maternelle, l\'alphabet et bien plus encore.',
    ctaText: 'Commencer Maintenant',
    badgeText: 'Guide Étape par Étape',
    stepLabel: 'Étape',
    completionTitle: 'Terminé !',
    completionSubtitle: 'Vos cartes bingo sont prêtes',
    readyTime: 'Prêt en moins de 3 minutes',
    noSkillsNeeded: 'Aucune compétence en design requise',
    readMoreLabel: 'Lire la suite',
    showLessLabel: 'Voir moins',
    steps: [
      {
        id: '1',
        number: 1,
        title: 'Étape 1 : Choisissez Votre Contenu - Fiches Maternelle Thématiques pour l\'Alphabet et Apprendre les Lettres',
        description: `Commencez à créer vos cartes bingo en sélectionnant du contenu parmi trois sources. Parcourez notre bibliothèque de thèmes pour choisir des ensembles d'images préorganisés comme les thèmes alphabet pour les fiches apprendre les lettres, les thèmes animaux pour le bingo sciences, ou les thèmes mathématiques pour les exercices calcul. Le sélecteur de thème charge instantanément toutes les images de cette catégorie.

Cliquez sur la zone de recherche pour trouver des images spécifiques dans tous les thèmes. Tapez des mots-clés comme animaux, formes ou couleurs pour filtrer la bibliothèque d'images. Sélectionnez des images individuelles en cliquant dessus dans la zone d'aperçu. Les images sélectionnées sont mises en évidence avec une bordure bleue. Téléchargez vos propres images personnalisées en utilisant le bouton de téléchargement. Les images téléchargées se combinent avec les images de la bibliothèque pour des fiches maternelle personnalisées.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Étape 2 : Personnalisez les Paramètres - Exercices CP CE1 et Coloriage à Imprimer selon le Niveau',
        description: `Configurez les paramètres de votre carte bingo selon vos besoins pédagogiques. Définissez la taille de grille de 3x3 jusqu'à 5x5 cases en utilisant les entrées lignes et colonnes. Les grilles plus petites 3x3 conviennent parfaitement aux élèves de petite section et moyenne section de maternelle. Les grilles standard 4x4 sont adaptées à la plupart des fiches maternelle et exercices CP. Les grilles plus grandes 5x5 représentent un défi pour les élèves de CE1 et CE2.

Choisissez combien de cartes bingo uniques générer avec le sélecteur de nombre de cartes. Générez 1 carte pour la pratique individuelle ou créez jusqu'à 10 cartes uniques pour des jeux de bingo en classe entière. Chaque carte présente des arrangements d'images différents pour éviter les doublons. Sélectionnez l'option de remplissage des cartes pour déterminer ce qui apparaît dans les cases de la grille bingo.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Étape 3 : Générez Vos Fiches Bingo - Fiches à Imprimer Gratuit pour Exercices Maths et Graphisme Maternelle',
        description: `Cliquez sur le bouton bleu Créer pour générer vos cartes bingo instantanément. Le générateur construit deux fiches complètes en quelques secondes. L'onglet Cartes + Jetons affiche votre fiche de carte bingo principale. Votre grille sélectionnée apparaît en haut avec des images ou des mots dans chaque case. Des jetons d'appel circulaires s'arrangent en dessous de la grille sur la même page.

Chaque jeton montre une version mélangée des éléments de la grille. Les élèves peuvent découper les jetons et les utiliser pendant le jeu de bingo. L'onglet Feuille d'appel montre votre feuille de référence séparée pour l'enseignant. Cette fiche affiche tous les éléments dans une grille organisée pour faciliter l'appel pendant les jeux de bingo en classe. La génération prend 10-15 secondes pour la plupart des fiches maternelle.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Étape 4 : Modifiez Vos Fiches - Écriture Cursive et Tables de Multiplication Personnalisées',
        description: `Cliquez sur n'importe quel élément de vos cartes bingo pour le sélectionner et le modifier. Sélectionnez la grille bingo pour déplacer toute la grille comme une seule unité. Cliquez sur des jetons individuels pour les repositionner n'importe où sur la page. Faites glisser les éléments en cliquant et en maintenant tout en déplaçant votre souris. Des poignées de coin apparaissent sur les objets sélectionnés pour le redimensionnement.

Ajoutez du texte personnalisé à vos fiches maternelle en utilisant le panneau d'outils texte. Tapez des noms d'élèves, des instructions ou des titres de leçons directement sur vos fiches. Choisissez parmi sept polices adaptées aux enfants. Ajustez la taille du texte selon vos besoins. Changez les couleurs du texte pour correspondre au thème de votre classe. Ce contrôle d'édition complet transforme les fiches générées en fiches écriture cursive et tables de multiplication parfaitement adaptées.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Étape 5 : Téléchargez et Imprimez - Fiches Maternelle PDF et Exercices CP CE1 Haute Qualité',
        description: `Téléchargez vos cartes bingo terminées en utilisant le menu déroulant Télécharger. Choisissez Fiche JPEG pour télécharger votre carte bingo comme fichier image haute résolution. Sélectionnez Feuille d'appel JPEG pour télécharger la feuille de référence de l'enseignant séparément. Choisissez Fiche PDF pour la meilleure qualité d'impression lors de l'utilisation de vos cartes bingo avec les élèves.

Lorsque vous avez généré plusieurs cartes, le téléchargement crée un fichier ZIP avec toutes les cartes uniques ou un PDF multipages avec chaque carte sur sa propre page. Activez la case à cocher niveaux de gris avant de télécharger pour convertir vos fiches maternelle colorées en noir et blanc. Le mode niveaux de gris économise l'encre couleur coûteuse. Tous les téléchargements s'exportent en résolution professionnelle 300 DPI pour des résultats d'impression nets.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from picture-bingo.md use case sections
  useCases: {
    sectionTitle: 'Fiche Gratuite pour Enfants - Fiche pour Maternelle avec Imprimables Gratuits. Fiche pour Enfants',
    sectionDescription: 'Les cartes bingo illustrées servent divers contextes éducatifs de la petite section au CE2. Les enseignants de tous les niveaux utilisent notre générateur de cartes bingo pour créer des fiches à imprimer gratuit engageantes pour les exercices maths, les activités de lecture et l\'enrichissement du vocabulaire. Notre abonnement Pack Essentiel offre une création illimitée de fiches bingo pour les enseignants de maternelle, les professeurs des écoles en CP et CE1, les parents faisant l\'instruction en famille, les enseignants FLE, les enseignants spécialisés et les enseignants entrepreneurs.',
    badgeText: 'Cas d\'Utilisation',
    readMoreLabel: 'Lire la suite',
    showLessLabel: 'Voir moins',
    items: [
      {
        id: '1',
        icon: '👩‍🏫',
        title: 'Enseignants de Maternelle - Fiches Maternelle pour le Graphisme Maternelle et l\'Alphabet',
        subtitle: 'Cartes bingo alphabet et reconnaissance des lettres',
        description: `Les enseignants de maternelle utilisent les cartes bingo illustrées pour la reconnaissance de l'alphabet, le sens des nombres et la pratique du vocabulaire. Générez des cartes bingo alphabet avec des images de lettres pour des fiches apprendre les lettres qui rendent l'apprentissage amusant. Créez des bingo numériques en utilisant des objets à compter de notre bibliothèque d'images mathématiques. Construisez la reconnaissance du vocabulaire avec des cartes bingo montrant des images représentant le vocabulaire courant de maternelle.

Les enseignants de petite et moyenne section adaptent les grilles 3x3 pour les plus jeunes élèves qui ont besoin de jeux plus simples. Utilisez le bingo animaux pour le développement du vocabulaire scientifique. Créez des bingo de reconnaissance des formes avec des images géométriques. Le bingo illustré transforme le temps de fiche passive en jeux d'apprentissage actifs. Les élèves pratiquent les compétences essentielles du graphisme maternelle tout en jouant.`,
        quote: 'Mes élèves adorent les jeux de bingo avec les images colorées !',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Enseignants du Primaire CP CE1 CE2 - Exercices CP CE1 et Tables de Multiplication en Bingo',
        subtitle: 'Fiches de lecture et exercices maths',
        description: `Les enseignants du primaire créent des cartes bingo illustrées pour renforcer les concepts de leur niveau. Les enseignants de CP génèrent des fiches bingo pour apprendre à lire en utilisant des familles de mots. Créez des bingo de soustraction avec des problèmes illustrés. Utilisez des bingo de phonologie pour l'apprentissage des sons. Les enseignants de CE1 construisent des cartes bingo tables de multiplication en utilisant des images de tableaux de notre bibliothèque mathématique.

Générez des bingo de mots composés montrant deux images qui se combinent en un seul mot. Créez des bingo d'antonymes avec des paires d'images opposées. Les enseignants de CE2 utilisent des bingo de fractions avec des représentations visuelles de fractions. Téléchargez des images personnalisées de votre unité actuelle pour créer des fiches bingo spécifiques au programme.`,
        quote: 'Les bingo tables de multiplication rendent l\'apprentissage des maths ludique.',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Parents en Instruction en Famille - Fiches à Imprimer Gratuit et Coloriage à Imprimer Multi-niveaux',
        subtitle: 'Apprentissage personnalisé à la maison',
        description: `Les parents faisant l'instruction en famille génèrent des cartes bingo illustrées pour des activités d'apprentissage multi-niveaux. Créez un jeu de bingo qui fonctionne à travers les âges en variant la façon dont les enfants jouent. Les plus jeunes en maternelle associent uniquement les images tandis que les plus grands en CP doivent lire les mots appelés. Utilisez des images personnalisées téléchargées de votre programme d'instruction en famille.

Générez des fiches alphabet pour votre pré-lecteur et des exercices maths pour votre enfant de CP en utilisant le même outil. Les familles en instruction en famille apprécient la création illimitée de fiches incluse dans un seul abonnement Pack Essentiel. Créez des cartes bingo fraîches et du coloriage à imprimer pour chaque nouveau thème ou unité que vous enseignez. Téléchargez des photos de famille pour créer des bingo de reconnaissance des prénoms personnalisés.`,
        quote: 'Un outil adapté à tous les niveaux de mes enfants.',
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Enseignants FLE et Langues - Fiches Maternelle Multilingues pour Apprendre à Lire en 11 Langues',
        subtitle: 'Vocabulaire multilingue et apprentissage progressif',
        description: `Les enseignants FLE s'appuient sur les cartes bingo illustrées pour l'enseignement visuel du vocabulaire dans 11 langues. Générez des cartes bingo en anglais pour les programmes bilingues de maternelle. Créez des bingo de vocabulaire espagnol pour les classes d'immersion linguistique en CP. Faites des fiches pour apprendre à lire en allemand pour les programmes de langues vivantes.

Changez la langue de la bibliothèque d'images pour charger des images culturellement appropriées avec des étiquettes de vocabulaire précises en portugais, italien, néerlandais, danois, suédois, norvégien ou finnois. Les élèves FLE apprennent le nouveau vocabulaire par association d'images sans traduction. Les programmes FLE pour adultes créent des bingo de vocabulaire professionnel et de compétences de la vie quotidienne pour les populations immigrées.`,
        quote: 'Le support multilingue est essentiel pour mes élèves allophones.',
      },
      {
        id: '5',
        icon: '💜',
        title: 'Enseignants Spécialisés - Exercices Maths et Graphisme Maternelle Différenciés pour l\'Écriture Cursive',
        subtitle: 'Différenciation et adaptation aux besoins spécifiques',
        description: `Les enseignants spécialisés personnalisent les cartes bingo illustrées pour les élèves ayant des besoins d'apprentissage divers. Générez des grilles bingo simplifiées 3x3 pour les élèves qui ont du mal avec le balayage visuel. Créez des cartes bingo à fort contraste en téléchargeant des images en noir et blanc bien définies. Utilisez des cases de grille extra-larges pour les élèves ayant des difficultés de motricité fine.

Générez le même contenu bingo à plusieurs niveaux de difficulté pour les classes inclusives. Téléchargez des photos d'objets réels de la classe pour les élèves qui ont besoin de connexions concrètes. Créez des bingo de compétences sociales avec des visages d'émotions ou des scénarios d'amitié. La modifiabilité complète permet aux enseignants spécialisés d'agrandir des éléments spécifiques ou de simplifier les mises en page.`,
        quote: 'Je peux adapter les cartes bingo pour chaque élève de ma classe ULIS.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Enseignants Entrepreneurs - Fiches à Imprimer Gratuit et Coloriage à Imprimer pour Teachers Pay Teachers',
        subtitle: 'Licence commerciale incluse pour TPT, Etsy et Amazon KDP',
        description: `Les enseignants entrepreneurs génèrent des cartes bingo illustrées à vendre sur Teachers Pay Teachers, Etsy et Amazon KDP. Votre abonnement Pack Essentiel inclut une licence commerciale complète sans frais supplémentaires. Les concurrents facturent 79 à 199 € par an pour des droits commerciaux qui sont inclus dans votre abonnement à 144 €.

Créez des lots de bingo thématiques pour les ventes saisonnières comme des bingo alphabet de rentrée ou des ensembles de bingo maths de Noël. Générez des ensembles coordonnés de fiches maternelle en utilisant nos autres outils et combinez-les avec des activités bingo. Téléchargez vos propres cliparts commerciaux pour créer des cartes bingo uniques de marque. Les vendeurs Teachers Pay Teachers déclarent gagner 500 à 5000 € mensuels.`,
        quote: 'Mon abonnement s\'est rentabilisé dès le premier mois de ventes !',
      },
    ],
  },

  // FAQ Section - Selected FAQs from picture-bingo.md
  faq: {
    sectionTitle: 'FAQ - Fiche Gratuite pour Enfants et Fiche pour Maternelle. Fiche pour Enfants',
    sectionDescription: 'Les enseignants posent des questions courantes sur la création de cartes bingo illustrées avec notre générateur. Ces réponses aident les enseignants de maternelle, les professeurs des écoles en CP et CE1, les parents en instruction en famille et les enseignants FLE à comprendre comment créer des fiches bingo pour leurs classes.',
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
        question: 'Ce Générateur de Bingo est-il Vraiment Gratuit pour les Fiches à Imprimer Gratuit ?',
        answer: `Le générateur de cartes bingo illustrées nécessite un abonnement Pack Essentiel pour une utilisation illimitée. Nous n'offrons pas de niveau gratuit pour cet outil. Votre abonnement Pack Essentiel annuel à 144 € ou votre paiement mensuel de 15 € vous donne une création illimitée de fiches bingo sans frais par fiche. Le terme fiches à imprimer gratuit fait référence au mot-clé de recherche que les enseignants utilisent, pas au fait que le générateur lui-même soit gratuit.

Une fois abonné, créez autant de fiches maternelle et d'exercices CP CE1 que vous avez besoin sans frais supplémentaires. L'abonnement comprend également 9 autres générateurs de fiches plus une licence commerciale complète pour vendre vos créations.`,
      },
      {
        id: '2',
        question: 'Puis-je Imprimer les Cartes Bingo pour le Graphisme Maternelle sur une Imprimante Standard ?',
        answer: `Oui, toutes les cartes bingo illustrées s'impriment parfaitement sur les imprimantes domestiques et scolaires standard. Téléchargez vos cartes bingo en fichiers PDF pour la meilleure qualité d'impression. Utilisez du papier format Letter pour les enseignants français ou du papier A4 pour les standards internationaux. Nos fiches s'exportent en résolution 300 DPI garantissant des images nettes même sur les imprimantes jet d'encre basiques.

Imprimez sur du papier ordinaire pour des feuilles de jeu jetables que les élèves utilisent une fois. Imprimez sur du papier cartonné pour des cartes bingo durables que vous plastifiez et réutilisez toute l'année pour le graphisme maternelle et autres activités.`,
      },
      {
        id: '3',
        question: 'Faut-il des Compétences en Design pour Créer des Cartes Bingo et du Coloriage à Imprimer ?',
        answer: `Aucune compétence en design n'est nécessaire pour créer des cartes bingo professionnelles et du coloriage à imprimer. Notre générateur gère automatiquement tout le travail de design. Sélectionnez votre thème dans le menu déroulant. Cliquez sur Générer pour créer des cartes bingo complètes instantanément.

L'outil arrange les images dans les grilles, dimensionne les jetons de manière appropriée et crée des feuilles d'appel assorties sans aucune connaissance en design requise. Les enseignants qui n'ont jamais utilisé de logiciel de design créent de belles fiches maternelle en moins de 3 minutes. L'interface fonctionne comme remplir un simple formulaire.`,
      },
      {
        id: '4',
        question: 'Quelles Langues Sont Disponibles pour les Cartes Bingo et les Fiches Alphabet pour Apprendre les Lettres ?',
        answer: `Les cartes bingo illustrées sont disponibles dans 11 langues différentes pour les classes multilingues et les fiches alphabet pour apprendre les lettres. Générez des cartes bingo avec du contenu en français, anglais, espagnol, allemand, italien, portugais, néerlandais, danois, suédois, norvégien ou finnois.

L'interface s'affiche dans la langue sélectionnée pour une navigation facile. Plus important pour les fiches bingo, la bibliothèque d'images comprend du contenu spécifique à chaque langue. Les noms de fichiers images apparaissent automatiquement dans la langue sélectionnée lors de l'utilisation de remplissages bingo basés sur les mots pour apprendre les lettres.`,
      },
      {
        id: '5',
        question: 'Puis-je Vendre les Exercices Maths et Tables de Multiplication que je Crée avec ce Générateur ?',
        answer: `Oui, votre abonnement Pack Essentiel inclut une licence commerciale complète pour vendre vos cartes bingo d'exercices maths et tables de multiplication. Proposez vos cartes bingo sur Teachers Pay Teachers, Etsy et Amazon KDP sans frais de licence supplémentaires. La licence d'impression à la demande couvre les téléchargements numériques et les produits imprimés physiques.

Aucune attribution requise lors de la vente de vos fiches bingo. Vous possédez les pleins droits commerciaux sur les fiches que vous créez. Les vendeurs enseignants déclarent gagner 500 à 5000 € mensuels en vendant des fiches d'exercices maths et tables de multiplication créées avec leur abonnement Pack Essentiel.`,
      },
      {
        id: '6',
        question: 'Comment Personnaliser les Cartes Bingo pour l\'Écriture Cursive et le Graphisme Maternelle ?',
        answer: `Personnalisez les cartes bingo illustrées pour l'écriture cursive et le graphisme maternelle en utilisant nos outils d'édition complets après génération. Sélectionnez n'importe quel élément de votre carte bingo pour le modifier. Faites glisser les images pour les repositionner n'importe où sur la page. Redimensionnez les images avec les poignées de coin.

Faites pivoter les éléments selon n'importe quel angle. Supprimez les éléments indésirables d'un clic. Ajoutez du texte personnalisé avec le panneau d'outils texte. Tapez des noms d'élèves, des instructions ou des titres de leçons directement sur vos fiches. Choisissez parmi sept polices adaptées aux enfants pour l'écriture cursive et le graphisme maternelle.`,
      },
      {
        id: '7',
        question: 'Quels Groupes d\'Âge Fonctionnent Mieux avec ces Cartes Bingo et Fiches Coloriage à Imprimer ?',
        answer: `Les cartes bingo illustrées et fiches coloriage à imprimer fonctionnent parfaitement pour les enfants de 3 à 9 ans, de la petite section au CE2. Les enseignants de petite section utilisent des bingo simples 3x3 pour les jeunes enfants de trois et quatre ans apprenant le vocabulaire de base. Les enseignants de maternelle créent des cartes bingo 3x3 ou 4x4 pour les enfants de cinq et six ans pratiquant la reconnaissance de l'alphabet.

Les enseignants de CP génèrent des fiches bingo 4x4 pour les enfants de six et sept ans renforçant les modèles de phonologie et les faits mathématiques avec coloriage à imprimer. Les enseignants de CE1 et CE2 utilisent des grilles 5x5 pour des jeux de bingo plus complexes avec vocabulaire spécifique aux matières.`,
      },
      {
        id: '8',
        question: 'Puis-je Télécharger mes Propres Images pour les Fiches Bingo et Apprendre à Lire ?',
        answer: `Oui, téléchargez vos propres images pour créer des cartes bingo personnalisées pour apprendre à lire. Cliquez sur le bouton de téléchargement pour sélectionner plusieurs fichiers images depuis votre ordinateur. Tous les formats courants fonctionnent, y compris JPEG, PNG et GIF. Téléchargez des photos de vos élèves pour des bingo de reconnaissance des prénoms.

Ajoutez des images de sorties scolaires récentes pour créer des activités bingo de mémoire. Incluez des images spécifiques au programme correspondant à votre unité actuelle de sciences ou d'histoire-géographie. Combinez les images téléchargées avec notre bibliothèque de 3000+ images sur la même carte bingo pour apprendre à lire.`,
      },
      {
        id: '9',
        question: 'Combien de Temps Faut-il pour Créer des Fiches Bingo d\'Exercices Maths et Calcul ?',
        answer: `Créez des fiches bingo complètes d'exercices maths et calcul en moins de 3 minutes du début au PDF téléchargé. Sélectionner votre thème prend 10 secondes. Choisir la taille de grille et le nombre de cartes prend 15 secondes. Cliquer sur Générer prend 1 seconde pour démarrer. Le générateur construit votre carte bingo et feuille d'appel en 5 à 10 secondes.

Réviser vos fiches prend 30 secondes. Faire des modifications prend 30 à 60 secondes si nécessaire. Cliquer sur Télécharger prend 5 secondes. Temps total en moyenne 2 à 3 minutes par ensemble de fiches bingo d'exercices maths et calcul.`,
      },
      {
        id: '10',
        question: 'Les Cartes Bingo Incluent-elles des Feuilles d\'Appel pour les Tables de Multiplication ?',
        answer: `Oui, notre générateur de bingo illustré crée deux fiches séparées qui fonctionnent ensemble pendant le jeu de tables de multiplication. La fiche principale de carte bingo comprend votre grille avec des images ou des mots dans les cases plus des jetons d'appel circulaires assortis arrangés sous la grille sur la même page.

La feuille d'appel est une fiche séparée montrant tous les éléments dans une grille organisée pour que l'enseignant les utilise lors de l'appel des éléments pendant le jeu de bingo de tables de multiplication. Les deux fiches sont entièrement modifiables et se téléchargent ensemble ou séparément.`,
      },
      {
        id: '11',
        question: 'Puis-je Utiliser les Cartes Bingo pour Apprendre à Lire dans ma Classe ?',
        answer: `Oui, les cartes bingo illustrées sont excellentes pour apprendre à lire. Créez des bingo de phonologie en associant des images aux sons initiaux des mots. Générez des bingo de syllabes où les élèves associent des images aux syllabes correspondantes. Utilisez des bingo de mots fréquents avec des images et des mots pour renforcer la reconnaissance automatique.

Les enseignants de CP et CE1 utilisent régulièrement nos cartes bingo pour l'apprentissage de la lecture. La combinaison image-mot aide les élèves à créer des connexions visuelles durables. Créez des fiches pour apprendre à lire progressives en commençant par des grilles 3x3 simples puis en augmentant vers des grilles 5x5 plus complexes.`,
      },
      {
        id: '12',
        question: 'Puis-je Créer des Cartes Bingo sur des Sujets Scolaires Spécifiques ?',
        answer: `Oui, créez des cartes bingo personnalisées sur n'importe quel sujet scolaire. Téléchargez vos propres images correspondant à votre unité de sciences, histoire-géographie ou éducation civique. Utilisez notre bibliothèque thématique pour trouver des images sur les animaux, les plantes, les formes géométriques, les moyens de transport et bien plus.

Générez des bingo de vocabulaire scientifique avec des images de la nature. Créez des bingo d'histoire avec des images d'événements ou de personnages historiques. Faites des bingo de géographie avec des drapeaux, des monuments ou des cartes. La flexibilité de téléchargement d'images permet de créer des fiches maternelle et exercices CP CE1 parfaitement adaptés à votre programme.`,
      },
      {
        id: '13',
        question: 'Comment Choisir la Bonne Taille de Grille Bingo pour mes Fiches Maternelle ?',
        answer: `La taille de grille idéale dépend de l'âge et du niveau de vos élèves. Pour la petite section et moyenne section de maternelle (3-4 ans), utilisez des grilles 3x3 avec 9 cases simples et des images grandes et claires. Pour la grande section de maternelle (5-6 ans), les grilles 3x3 ou 4x4 fonctionnent parfaitement pour les fiches maternelle.

Pour les exercices CP (6-7 ans), utilisez des grilles 4x4 standard avec 16 cases. Pour les exercices CE1 et CE2 (7-9 ans), les grilles 5x5 avec 25 cases offrent un défi approprié. Notre générateur vous permet d'ajuster facilement entre ces tailles pour créer des fiches à imprimer gratuit adaptées à chaque niveau.`,
      },
      {
        id: '14',
        question: 'Les Fiches Bingo Fonctionnent-elles pour le Graphisme Maternelle ?',
        answer: `Oui, les cartes bingo complètent parfaitement les activités de graphisme maternelle. Après un jeu de bingo sur les formes, les élèves peuvent tracer ces formes sur des fiches de graphisme coordonnées. Utilisez des bingo de lettres puis enchaînez avec des fiches de tracé de lettres.

Créez des séquences d'apprentissage complètes en combinant bingo illustré et graphisme maternelle. Les élèves reconnaissent d'abord les formes ou lettres pendant le jeu de bingo, puis pratiquent leur tracé sur des fiches dédiées. Cette approche multisensorielle renforce l'apprentissage du graphisme maternelle de manière ludique.`,
      },
      {
        id: '15',
        question: 'Puis-je Générer Plusieurs Cartes Bingo Uniques pour une Classe Entière ?',
        answer: `Oui, générez de 1 à 10 cartes bingo uniques en un seul clic pour des jeux de bingo en classe entière. Chaque carte présente un arrangement différent des mêmes images, évitant ainsi que tous les élèves gagnent en même temps. Le sélecteur de nombre de cartes vous permet de choisir exactement combien de cartes uniques créer.

Pour une classe de 25 élèves, générez 10 cartes puis imprimez certaines cartes en plusieurs exemplaires. Chaque élève reçoit une carte différente de ses voisins immédiats. Cette fonction est parfaite pour créer des fiches maternelle et exercices CP CE1 engageants pour toute la classe.`,
      },
      {
        id: '16',
        question: 'Comment Utiliser les Cartes Bingo pour les Exercices CP CE1 ?',
        answer: `Les cartes bingo sont polyvalentes pour les exercices CP CE1. En CP, créez des bingo de phonologie pour les sons complexes, des bingo de mots outils et des bingo de calcul mental. En CE1, générez des bingo de tables de multiplication, des bingo de vocabulaire thématique et des bingo de conjugaison.

Pour les exercices maths, utilisez des images de quantités que les élèves doivent reconnaître rapidement. Pour la lecture, créez des bingo associant images et mots du vocabulaire de la semaine. Les exercices CP CE1 en format bingo transforment la révision en jeu motivant pour les élèves.`,
      },
      {
        id: '17',
        question: 'Les Fiches Bingo Incluent-elles des Options pour le Coloriage à Imprimer ?',
        answer: `Oui, vous pouvez créer des versions de cartes bingo adaptées au coloriage à imprimer. Activez l'option niveaux de gris avant le téléchargement pour convertir vos cartes bingo colorées en noir et blanc. Les élèves peuvent ensuite colorier les images sur leurs cartes bingo, combinant ainsi jeu et coloriage à imprimer.

Cette option est parfaite pour économiser l'encre couleur tout en offrant une activité supplémentaire. Les élèves peuvent colorier leur carte bingo avant de jouer ou colorier les cases gagnantes pendant le jeu. Combinez fiches bingo et coloriage à imprimer pour des activités plus longues et engageantes.`,
      },
      {
        id: '18',
        question: 'Comment les Cartes Bingo Aident-elles à Apprendre les Lettres ?',
        answer: `Les cartes bingo sont un outil puissant pour apprendre les lettres et développer la conscience phonologique. Créez des bingo alphabet où les élèves associent des images aux lettres initiales correspondantes. Générez des bingo de lettres majuscules et minuscules pour la reconnaissance des deux formes.

Utilisez des fiches bingo pour apprendre les lettres de manière progressive : commencez par les voyelles, puis ajoutez les consonnes fréquentes, et enfin les lettres moins courantes. Les élèves de maternelle adorent chercher les images correspondant aux lettres appelées. Cette approche ludique pour apprendre les lettres crée des associations durables entre sons et symboles.`,
      },
    ],
  },

  // Pricing
  pricing: {
    title: 'Pack Essentiel',
    price: '144€',
    priceInterval: '/an',
    priceSuffix: 'Facturé annuellement',
    benefits: [
      'Création illimitée de cartes bingo',
      'Licence commerciale incluse',
      '11 langues disponibles',
      '3000+ images thématiques',
      'Qualité 300 DPI professionnelle',
      'Feuilles d\'appel automatiques incluses',
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

  // Related Apps - From picture-bingo.md Section 7
  relatedApps: {
    sectionTitle: 'Fiches Gratuites Combiner - Fiche pour Enfants et Imprimables Gratuits',
    sectionDescription: 'Les enseignants combinent les cartes bingo illustrées avec d\'autres fiches imprimables pour créer des paquets d\'apprentissage complets. Votre abonnement Pack Essentiel comprend 33 générateurs de fiches au-delà du bingo illustré. Créez des jeux d\'association, des fiches de coloriage, des fiches de tracé, des fiches alphabet, des exercices maths et des fiches de phonologie en utilisant le même abonnement.',
    ctaTitle: 'Prêt à Créer des Cartes Bingo Professionnelles ?',
    ctaDescription: 'Rejoignez des milliers d\'enseignants qui créent des fiches maternelle de qualité. Création illimitée, licence commerciale incluse.',
    primaryCtaText: 'Essai Gratuit',
    secondaryCtaText: 'Voir les 33 Applications',
    badgeText: 'Fonctionne Parfaitement Avec',
    exploreText: 'Explorer toutes les applications',
    trustBadges: {
      securePayment: 'Paiement sécurisé',
      cancelAnytime: 'Résiliez à tout moment',
    },
    items: [
      {
        id: '1',
        slug: 'addition-fiches',
        name: 'Exercices Maths',
        category: 'Mathématiques',
        icon: '➕',
        description: 'Combinez bingo illustré et exercices maths pour une instruction complète des nombres. Créez des bingo de reconnaissance des nombres avec des images de comptage. Les élèves jouent au bingo des nombres pour apprendre les quantités visuellement.',
      },
      {
        id: '2',
        slug: 'train-alphabet-fiches',
        name: 'Train de l\'Alphabet',
        category: 'Lecture',
        icon: '🚂',
        description: 'Associez bingo illustré et fiches de graphisme maternelle pour un apprentissage complet des lettres. Créez des bingo alphabet connectant images et premières lettres. Suivez avec des fiches de traçage pratiquant la formation des lettres.',
      },
      {
        id: '3',
        slug: 'coloriage-fiches',
        name: 'Coloriage à Imprimer',
        category: 'Arts et Motricité',
        icon: '🎨',
        description: 'Associez bingo illustré et fiches de coloriage à imprimer pour des périodes d\'activité plus longues. Les élèves jouent au bingo puis colorient les mêmes images sur des fiches de coloriage coordonnées ensuite.',
      },
      {
        id: '4',
        slug: 'cherche-et-compte-fiches',
        name: 'Cherche et Compte',
        category: 'Mathématiques',
        icon: '🔍',
        description: 'Combinez fiches cherche et compte et bingo pour une instruction de littératie complète. Créez des bingo de sons initiaux où les élèves connectent images et premières lettres.',
      },
      {
        id: '5',
        slug: 'association-fiches',
        name: 'Association',
        category: 'Visuel',
        icon: '🔗',
        description: 'Créez des paquets complets combinant fiches d\'association et activités de bingo. Les élèves complètent des associations d\'images puis jouent au bingo avec le même vocabulaire.',
      },
      {
        id: '6',
        slug: 'graphisme-fiches',
        name: 'Graphisme',
        category: 'Motricité Fine',
        icon: '✍️',
        description: 'Construisez des programmes complets de préparation à l\'écriture combinant bingo illustré et fiches de graphisme maternelle. Commencez par des jeux de bingo puis passez aux fiches de traçage.',
      },
    ],
  },
};

export default pictureBingoFrContent;
