import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * More or Less Worksheets - French Content
 *
 * File: frontend/content/product-pages/fr/more-less-worksheets.ts
 * URL: /fr/apps/plus-moins-fiches (French SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/French/more-less.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 *
 * PRICING: Accès Complet = 240 $/an (Accès Complet)
 * App ID: more-less
 */

export const moreLessFrContent: ProductPageContent = {
  // SEO Metadata - French language-specific
  seo: {
    slug: 'comparaison-quantites-fiches',
    appId: 'more-less',
    title: 'Fiches à Imprimer Gratuit de Comparaison - Exercices Maths Plus Moins Égal - Fiches Maternelle et Exercices CP',
    description: 'Créez des fiches de comparaison mathématique professionnelles avec notre générateur d\'exercices maths. Générez des exercices CP de comparaison de quantités parfaits pour la maternelle et le CP. Téléchargez des fichiers PDF de haute qualité en moins de 3 minutes.',
    keywords: 'fiches à imprimer gratuit, fiches maternelle, exercices maths, exercices CP, plus moins égal, comparaison, graphisme maternelle, coloriage à imprimer, apprendre à lire, alphabet, écriture cursive, tables de multiplication, exercices CE1',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fr/apps/comparaison-quantites-fiches',
  },

  // Hero Section - FULL text from French more-less.md Section 1
  hero: {
    title: 'Générateur d\'Exercices de Comparaison',
    subtitle: 'Fiches à Imprimer Gratuit - Exercices Maths Plus Moins Égal',
    description: `Créez des fiches de comparaison mathématique professionnelles avec notre générateur d'exercices maths. Votre abonnement Accès Complet vous permet de créer des fiches à imprimer en illimité sans frais supplémentaires par fiche. Générez des exercices CP de comparaison de quantités parfaits pour la maternelle et le CP. Téléchargez des fichiers PDF de haute qualité en moins de 3 minutes.

Les exercices maths de comparaison enseignent aux élèves à comparer deux quantités et choisir le bon symbole mathématique. Les enfants apprennent les concepts de plus que, moins que et égal à. Notre générateur crée des fiches maternelle visuellement attrayantes qui maintiennent l'attention des jeunes apprenants. Les exercices CP progressifs s'adaptent au niveau de chaque élève.

Notre générateur de fiches à imprimer offre deux modes de comparaison distincts. Comparez des groupes d'images entre eux pour renforcer le comptage. Comparez des images à des chiffres écrits pour apprendre à lire les nombres. Choisissez des symboles illustrés colorés ou des symboles mathématiques traditionnels. Personnalisez complètement vos fiches maternelle avec notre éditeur sur canevas.

Les enseignants choisissent l'abonnement Accès Complet pour trois raisons essentielles. Premièrement, la création d'exercices maths en 11 langues facilite l'enseignement multilingue et l'apprentissage du français langue étrangère. Deuxièmement, la licence commerciale incluse permet de vendre vos fiches à imprimer sur Teachers Pay Teachers et Etsy. Troisièmement, le gain de temps considérable vous permet de créer des exercices CP professionnels en 3 minutes au lieu de 30 minutes avec les méthodes traditionnelles.`,
    previewImageSrc: '/samples/english/more less/image to image.jpeg',
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

  // Sample Gallery - REAL file paths from samples/english/more less/
  samples: {
    sectionTitle: 'Exemples de Fiches de Comparaison',
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
        worksheetSrc: '/samples/english/more less/image to image.jpeg',
        answerKeySrc: '/samples/english/more less/image to image answer_key.jpeg',
        altText: 'Fiche de comparaison image contre image avec symboles plus moins égal pour la maternelle',
        pdfDownloadUrl: '/samples/english/more less/image to image.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/english/more less/image to number.jpeg',
        answerKeySrc: '/samples/english/more less/image to number answer_key.jpeg',
        altText: 'Fiche de comparaison image contre nombre pour apprendre à lire les chiffres en CP',
        pdfDownloadUrl: '/samples/english/more less/image to number.pdf',
      },
      {
        id: '3',
        worksheetSrc: '/samples/english/more less/illustration.jpeg',
        answerKeySrc: '/samples/english/more less/illustration answer_key.jpeg',
        altText: 'Fiche de comparaison avec symboles illustrés colorés pour les apprenants visuels',
        pdfDownloadUrl: '/samples/english/more less/illustration.pdf',
      },
    ],
  },

  // Features Grid - FULL text from French more-less.md Section 2
  features: {
    sectionTitle: 'Fonctionnalités du Générateur de Fiches Maternelle - Tout pour Créer des Exercices Maths et Fiches à Imprimer Gratuit',
    sectionDescription: 'Notre générateur d\'exercices maths offre toutes les fonctionnalités nécessaires pour créer des fiches à imprimer professionnelles. Chaque outil a été conçu pour faciliter la création de fiches maternelle et exercices CP de comparaison. Les enseignants économisent des heures de préparation chaque semaine. Votre abonnement Accès Complet inclut toutes ces fonctionnalités sans frais supplémentaires.',
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
        title: 'Créez des Exercices CP et Fiches Maternelle en 3 Clics - Générateur Rapide de Fiches à Imprimer Gratuit',
        description: 'La création de fiches maternelle commence par la sélection du nombre d\'exercices. Choisissez entre 1 et 8 exercices de comparaison par fiche. Les petites fiches avec 3 à 4 exercices conviennent parfaitement à la maternelle. Les fiches avec 6 à 8 exercices sont idéales pour les exercices CP et CE1. Sélectionnez les symboles mathématiques à enseigner dans vos exercices maths. Cochez plus grand que, plus petit que ou égal à. Les exercices CP peuvent se concentrer uniquement sur plus et moins. Les exercices CE1 peuvent inclure les trois symboles pour plus de difficulté. Choisissez entre symboles illustrés colorés ou symboles mathématiques traditionnels. Les symboles illustrés rendent les fiches maternelle plus attrayantes visuellement. Les symboles traditionnels préparent aux exercices maths standards. Cliquez sur générer et votre fiche à imprimer est prête instantanément.',
        highlighted: false,
      },
      {
        id: '2',
        icon: '🎨',
        title: 'Modifiez Complètement vos Fiches à Imprimer Gratuit et Exercices Maths - Personnalisation sur Canevas pour Fiches Maternelle',
        description: 'Tous les éléments de vos fiches maternelle sont entièrement modifiables sur canevas. Cliquez sur n\'importe quel objet pour le sélectionner. Déplacez, faites pivoter ou redimensionnez chaque élément avec votre souris. Cette flexibilité permet de créer des exercices CP parfaitement adaptés à vos besoins. Les images d\'objets peuvent être repositionnées partout sur la fiche. Agrandissez les images pour créer des fiches maternelle avec graphisme maternelle développé. Réduisez les images pour laisser plus d\'espace de travail aux élèves. Ajoutez des éléments de coloriage à imprimer pour combiner calcul et motricité fine. Les symboles mathématiques sont tous modifiables individuellement. Changez la taille des symboles pour les élèves ayant des difficultés visuelles. Modifiez les couleurs pour créer des fiches à imprimer personnalisées. Ajoutez des instructions personnalisées ou le nom de votre classe. Utilisez les fonctions annuler et rétablir pour expérimenter librement.',
        highlighted: true,
      },
      {
        id: '3',
        icon: '📤',
        title: 'Téléchargez vos Images pour Fiches Maternelle et Exercices CP - Personnalisation avec Photos de Classe',
        description: 'L\'importation d\'images personnelles enrichit vos fiches à imprimer. Cliquez sur le bouton de téléchargement pour sélectionner vos fichiers. Importez plusieurs images simultanément pour gagner du temps. Tous les formats d\'image courants sont acceptés pour vos exercices maths. Utilisez des photos de votre classe pour des exercices CP personnalisés. Les élèves adorent comparer des quantités avec des objets familiers. Photographiez les fournitures scolaires pour créer des fiches maternelle contextualisées. Cette personnalisation augmente l\'engagement des élèves dans les exercices maths. Combinez les images de notre bibliothèque avec vos propres photos. Créez des fiches maternelle totalement uniques pour votre classe. Téléchargez des dessins d\'élèves pour valoriser leur créativité. Les possibilités de fiches à imprimer personnalisées sont infinies.',
        highlighted: false,
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Exercices Maths en 11 Langues - Fiches Maternelle Multilingues pour Apprendre à Lire et Exercices CP',
        description: 'Notre générateur de fiches à imprimer fonctionne en 11 langues différentes. Créez des fiches maternelle en français, anglais, allemand, espagnol et portugais. Les langues disponibles incluent aussi l\'italien, le néerlandais, le suédois, le danois, le norvégien et le finnois. La sélection de langue affecte l\'interface utilisateur complète. Tous les boutons et instructions apparaissent dans la langue choisie. Cette fonctionnalité est essentielle pour les enseignants de français langue étrangère. Créez des exercices maths qui aident les élèves à apprendre à lire en français. Les écoles internationales bénéficient particulièrement de cette fonctionnalité multilingue. Enseignez les mathématiques dans la langue maternelle de chaque élève. Les programmes d\'immersion bilingue utilisent nos fiches maternelle pour différencier l\'enseignement.',
        highlighted: false,
      },
      {
        id: '5',
        icon: '💰',
        title: 'Licence Commerciale Incluse - Vendez vos Fiches Maternelle et Exercices Maths sur Teachers Pay Teachers',
        description: 'Votre abonnement Accès Complet inclut une licence commerciale d\'impression à la demande. Vendez vos fiches à imprimer gratuit sur Teachers Pay Teachers, Etsy ou Amazon KDP. Aucun frais supplémentaire de licence n\'est requis. Cette licence commerciale représente une économie de 100 à 200 euros par an comparé aux concurrents. Les enseignants entrepreneurs génèrent des revenus complémentaires avec leurs fiches maternelle. Certains créateurs gagnent entre 500 et 5000 euros par mois en vendant des exercices maths. Les fiches à imprimer de comparaison sont particulièrement populaires sur Teachers Pay Teachers. Les parents recherchent constamment des exercices CP de qualité pour l\'apprentissage à domicile. Créez des packs thématiques d\'exercices maths pour augmenter vos ventes. La qualité professionnelle de vos fiches justifie des prix premium.',
        highlighted: true,
      },
      {
        id: '6',
        icon: '📚',
        title: 'Bibliothèque de 3000+ Images - Illustrations pour Fiches Maternelle et Coloriage à Imprimer',
        description: 'Notre bibliothèque contient plus de 3000 illustrations adaptées aux enfants. Toutes les images sont incluses dans votre abonnement Accès Complet. Contrairement aux concurrents qui facturent par image, vous accédez à tout sans frais supplémentaires. Cette économie représente 200 à 400 euros par an comparé aux plateformes concurrentes. Les images sont organisées par thèmes pour faciliter la recherche. Sélectionnez un thème et parcourez toutes les images associées. Les thèmes incluent les animaux, la nourriture, les véhicules, les saisons et bien plus. Chaque thème contient des dizaines d\'illustrations adaptées aux fiches maternelle. La fonction de recherche trouve rapidement l\'image parfaite pour vos exercices maths. Utilisez les images pour créer des activités combinées avec coloriage à imprimer.',
        highlighted: false,
      },
      {
        id: '7',
        icon: '🖨️',
        title: 'Qualité Professionnelle 300 DPI - Fiches à Imprimer Parfaites pour Exercices Maths et Graphisme Maternelle',
        description: 'Toutes les fiches maternelle s\'exportent en résolution 300 DPI. Cette qualité professionnelle garantit un rendu parfait à l\'impression. Les symboles mathématiques restent nets et lisibles même imprimés en petit. Les images conservent tous leurs détails pour le graphisme maternelle. Téléchargez vos exercices maths au format PDF ou JPEG. Le format PDF préserve la mise en page exacte sur tous les appareils. Le format JPEG facilite l\'insertion dans d\'autres documents. Les deux formats maintiennent la qualité 300 DPI pour vos fiches à imprimer. L\'option niveaux de gris économise l\'encre d\'imprimante. Convertissez vos fiches maternelle en noir et blanc en un clic. Les exercices CP restent parfaitement lisibles en niveaux de gris. Le générateur crée automatiquement la fiche élève et le corrigé.',
        highlighted: true,
      },
    ],
  },

  // How-To Guide - FULL text from French more-less.md Section 3
  howTo: {
    sectionTitle: 'Comment Créer des Fiches Maternelle et Exercices Maths en 5 Étapes Simples - Fiches à Imprimer Gratuit',
    sectionDescription: 'Créer des exercices maths de comparaison professionnels prend moins de 3 minutes avec notre générateur. Suivez ces cinq étapes simples pour produire des fiches maternelle de qualité. Aucune compétence en conception graphique n\'est nécessaire. Les enseignants de maternelle et de CP créent des fiches à imprimer parfaites dès la première utilisation. Le processus intuitif permet de générer plusieurs exercices CP en quelques minutes.',
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
        title: 'Choisissez les Images pour vos Fiches Maternelle et Exercices CP - Mode Thème ou Images Individuelles',
        description: 'Commencez par sélectionner le mode de choix d\'images pour vos fiches maternelle. Le mode images individuelles vous permet de choisir 1 à 5 images spécifiques. Parcourez la bibliothèque organisée par thèmes pour trouver les images parfaites. Sélectionnez des animaux, des fruits, des véhicules ou tout autre thème adapté aux exercices CP. Le mode thème pour la fiche complète sélectionne automatiquement des images aléatoires. Choisissez un thème et le générateur crée des exercices maths variés. Cette option accélère la création de fiches à imprimer thématiques. Les élèves découvrent des images différentes à chaque exercice de comparaison. Téléchargez vos propres images pour personnaliser complètement les fiches maternelle. Utilisez des photos de votre classe ou des objets familiers aux élèves. Les images personnalisées rendent les exercices CP plus pertinents et engageants. Combinez images de la bibliothèque et photos personnelles librement. Le compteur affiche combien d\'images vous avez sélectionnées.',
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Configurez vos Exercices Maths et Fiches à Imprimer Gratuit - Nombre d\'Exercices et Symboles de Comparaison',
        description: 'Sélectionnez le nombre d\'exercices de comparaison par fiche maternelle. Choisissez entre 1 et 8 exercices selon le niveau de vos élèves. Les fiches avec 3 à 4 exercices conviennent aux débutants en maternelle. Les fiches avec 6 à 8 exercices CP défient les élèves plus avancés. Cochez les symboles mathématiques à inclure dans vos exercices maths. Sélectionnez plus grand que, plus petit que ou égal à. Les jeunes élèves de maternelle commencent souvent avec seulement plus et moins. Les exercices CP peuvent inclure les trois symboles pour une pratique complète. Choisissez entre symboles illustrés colorés ou symboles mathématiques traditionnels. Les symboles illustrés utilisent des images attrayantes pour représenter plus, moins et égal. Les symboles traditionnels préparent aux fiches à imprimer de mathématiques standards. Sélectionnez le mode de comparaison pour vos fiches maternelle. Le mode image contre image compare des groupes d\'objets entre eux. Le mode image contre nombre compare des objets à un chiffre écrit.',
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Sélectionnez le Format de Page et les Décorations - Fiches Maternelle et Exercices CP Personnalisés',
        description: 'Choisissez le format de page adapté à votre imprimante. Le format A4 Portrait est standard en France et en Europe. Le format Letter Portrait convient aux imprimantes américaines. Les formats paysage fonctionnent bien pour certaines mises en page d\'exercices maths. Sélectionnez une couleur de fond pour vos fiches à imprimer. Le blanc standard économise l\'encre d\'imprimante à l\'école. Les couleurs pastel douces rendent les fiches maternelle plus attrayantes visuellement. Les couleurs vives captent l\'attention des jeunes élèves de maternelle et CP. Ajoutez un arrière-plan thématique à vos exercices CP. Parcourez les thèmes d\'arrière-plans disponibles dans le menu déroulant. Les motifs subtils ajoutent de l\'intérêt visuel sans distraire des exercices maths. Sélectionnez une bordure décorative pour encadrer vos fiches maternelle. Ajoutez du texte personnalisé à vos exercices CP. Tapez le nom de votre classe ou la date du jour.',
        icon: '📐',
      },
      {
        id: '4',
        number: 4,
        title: 'Générez et Modifiez vos Fiches Maternelle - Personnalisation Complète des Exercices Maths sur Canevas',
        description: 'Cliquez sur le bouton de génération pour créer vos exercices maths. Le générateur place automatiquement les groupes d\'objets sur la fiche. Les symboles de comparaison apparaissent entre les groupes. Le tout se génère en moins de 5 secondes pour vos fiches à imprimer. Le corrigé se crée automatiquement sur un onglet séparé. Basculez entre la fiche élève et le corrigé en cliquant sur les onglets. Le corrigé affiche les symboles corrects pour chaque comparaison. Tous les éléments sur le canevas sont entièrement modifiables. Cliquez sur n\'importe quelle image ou symbole pour le sélectionner. Déplacez les éléments en les faisant glisser avec votre souris. Redimensionnez les images pour les rendre plus grandes et plus visibles sur les fiches maternelle. Ajoutez des éléments supplémentaires pour personnaliser vos exercices maths. Utilisez les outils d\'alignement pour organiser les éléments parfaitement. Verrouillez les éléments que vous ne voulez plus modifier accidentellement.',
        icon: '✨',
      },
      {
        id: '5',
        number: 5,
        title: 'Téléchargez et Imprimez vos Exercices Maths et Fiches Maternelle - PDF et JPEG Haute Qualité',
        description: 'Cliquez sur le bouton de téléchargement pour exporter vos fiches à imprimer. Choisissez le format PDF pour une qualité d\'impression maximale. Le PDF préserve tous les détails de vos exercices maths. Le format JPEG fonctionne bien pour partager en ligne ou insérer dans d\'autres documents. Sélectionnez l\'option couleur pour des fiches maternelle vibrantes et attrayantes. Choisissez niveaux de gris pour économiser l\'encre d\'imprimante. Les exercices CP restent parfaitement lisibles en noir et blanc. Cette option réduit considérablement les coûts d\'impression pour les écoles. Téléchargez la fiche élève et le corrigé séparément. La fiche élève montre seulement les groupes d\'objets sans symboles. Le corrigé affiche les symboles de comparaison corrects. Tous les téléchargements sont en résolution 300 DPI professionnelle. Imprimez vos fiches maternelle immédiatement ou enregistrez-les pour plus tard.',
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from French more-less.md Section 4
  useCases: {
    sectionTitle: 'Parfait pour Enseignants et Parents - Fiches Maternelle et Exercices CP pour Tous les Besoins en Exercices Maths',
    sectionDescription: 'Notre générateur d\'exercices maths répond aux besoins de différents utilisateurs. Les enseignants de maternelle créent des fiches à imprimer adaptées aux jeunes apprenants. Les professeurs de CP et CE1 génèrent des exercices maths de comparaison plus complexes. Les parents en instruction à domicile profitent de la flexibilité complète du générateur. Chaque groupe d\'utilisateurs bénéficie des fonctionnalités professionnelles incluses dans l\'abonnement Accès Complet.',
    badgeText: 'Cas d\'Utilisation',
    readMoreLabel: 'Lire la suite',
    showLessLabel: 'Voir moins',
    items: [
      {
        id: '1',
        icon: '👩‍🏫',
        title: 'Enseignants de Maternelle',
        subtitle: 'Fiches Maternelle avec Graphisme Maternelle et Exercices Maths de Comparaison',
        description: 'Les enseignants de petite section, moyenne section et grande section utilisent nos fiches maternelle quotidiennement. Les exercices avec 3 à 4 comparaisons sont parfaits pour les élèves de PS et MS. Les fiches avec 5 à 6 exercices conviennent aux élèves de GS préparant l\'entrée au CP. Les exercices maths de comparaison développent simultanément plusieurs compétences mathématiques. Le choix entre symboles illustrés et symboles traditionnels aide le graphisme maternelle. Les jeunes élèves pratiquent l\'encerclement des symboles corrects. Cette activité renforce la coordination œil-main essentielle en maternelle. Combinez les exercices maths avec le développement du graphisme maternelle naturellement. Les fiches maternelle avec images colorées captent l\'attention des jeunes apprenants. Différenciez facilement pour les élèves ayant des besoins variés en maternelle.',
        quote: 'Mes élèves comprennent enfin plus grand que et plus petit que grâce à l\'approche visuelle !',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Enseignants de CP et CE1',
        subtitle: 'Exercices CP de Calcul Mental et Fiches à Imprimer pour Apprendre à Lire les Nombres',
        description: 'Les professeurs de cours préparatoire et cours élémentaire utilisent nos exercices CP quotidiennement. Les comparaisons avec 6 à 8 exercices correspondent au niveau attendu en CP. Le mode image contre nombre aide les élèves à apprendre à lire les chiffres écrits. Les exercices maths renforcent la fluence en calcul mental rapide. Les exercices CP développent la compréhension des quantités et des nombres. Les élèves comptent les objets puis comparent aux chiffres écrits. Cette reconnaissance rapide est essentielle pour la réussite en mathématiques. Les fiches à imprimer présentent les nombres de manière claire et lisible. Utilisez nos exercices maths pour les ateliers mathématiques en classe. Créez plusieurs fiches avec différents niveaux de difficulté. Les exercices CP préparent parfaitement aux évaluations nationales de mathématiques.',
        quote: 'Je crée une semaine de pratique de comparaison en 15 minutes !',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Parents en Instruction à Domicile',
        subtitle: 'Fiches à Imprimer Gratuit pour Exercices Maths et Alphabet avec Coloriage',
        description: 'Les familles pratiquant l\'instruction en famille apprécient la flexibilité de notre générateur. Créez des exercices maths adaptés au rythme unique de votre enfant. Pas besoin de suivre un manuel rigide de mathématiques. Générez exactement les fiches maternelle correspondant au niveau actuel de votre enfant. Les parents enseignent souvent plusieurs enfants de niveaux différents simultanément. Créez des exercices CP pour l\'aîné et des fiches maternelle pour le cadet. Les deux travaillent sur des comparaisons adaptées à leur âge. Cette approche multiplie l\'efficacité du temps d\'enseignement à domicile. Combinez les exercices maths avec d\'autres apprentissages fondamentaux comme l\'alphabet. Utilisez des images d\'objets commençant par différentes lettres de l\'alphabet. Les enfants pratiquent la comparaison tout en révisant les sons des lettres. Ajoutez du coloriage à imprimer pour développer la motricité fine simultanément.',
        quote: 'Enfin des fiches de maths qui correspondent exactement à ce que mes enfants apprennent !',
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Enseignants de Français Langue Étrangère',
        subtitle: 'Exercices Maths Multilingues pour Apprendre à Lire et Vocabulaire',
        description: 'Les professeurs de FLE utilisent nos exercices maths pour renforcer le vocabulaire numérique. Les élèves apprennent les nombres en français à travers des activités engageantes. Les comparaisons mathématiques rendent l\'apprentissage du vocabulaire plus ludique. Cette approche convient particulièrement aux apprenants visuels apprenant à lire. La fonctionnalité 11 langues permet la comparaison linguistique directe. Créez la même fiche en français puis dans la langue maternelle de l\'élève. Les apprenants comprennent mieux les concepts mathématiques dans leur langue d\'abord. Puis ils transfèrent cette compréhension au français pour apprendre à lire les nombres. Les images de notre bibliothèque enseignent également le vocabulaire général français. Sélectionnez des thèmes correspondant aux unités d\'apprentissage en cours. Les fiches maternelle multilingues aident les enfants d\'immigrants récents en France.',
        quote: 'Le support en 11 langues est parfait pour ma classe diversifiée !',
      },
      {
        id: '5',
        icon: '💜',
        title: 'Enseignants Spécialisés',
        subtitle: 'Fiches Maternelle Adaptées avec Graphisme Maternelle et Coloriage à Imprimer',
        description: 'Les enseignants en éducation spécialisée adaptent nos fiches maternelle aux besoins individuels. Agrandissez les symboles mathématiques pour les élèves malvoyants. Utilisez des couleurs contrastées pour améliorer la lisibilité des exercices maths. Simplifiez la mise en page pour réduire la surcharge visuelle sur les fiches à imprimer. Les élèves avec troubles du graphisme maternelle bénéficient de l\'option encerclement. Tracer un cercle autour du symbole est plus facile que le dessiner. Cette activité développe le contrôle moteur progressivement. Le graphisme maternelle s\'améliore à travers la pratique répétée des exercices CP. Le coloriage à imprimer après les exercices maths calme les élèves anxieux. Cette activité apaisante récompense l\'effort fourni sur les comparaisons. Créez des séquences répétitives pour les élèves nécessitant de la routine.',
        quote: 'Je peux rapidement adapter les fiches pour les objectifs PEI de chaque élève !',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Enseignants Entrepreneurs',
        subtitle: 'Vendez vos Fiches à Imprimer Gratuit et Exercices Maths sur Teachers Pay Teachers',
        description: 'Les créateurs de ressources pédagogiques génèrent des revenus avec nos fiches maternelle. La licence commerciale incluse dans Accès Complet permet la vente sur toutes les plateformes. Teachers Pay Teachers, Etsy et Amazon KDP acceptent nos fichiers PDF de qualité. Aucun frais de licence supplémentaire ne réduit vos marges bénéficiaires. Créez des packs thématiques d\'exercices maths pour maximiser les ventes en ligne. Combinez 10 à 20 fiches à imprimer sur un thème saisonnier comme Noël. Les enseignants achètent volontiers des collections complètes d\'exercices CP. Les packs se vendent mieux que les fiches individuelles sur Teachers Pay Teachers. Les exercices maths de comparaison sont parmi les produits les plus recherchés. La qualité 300 DPI de nos exportations justifie des prix premium. Certains créateurs gagnent entre 500 et 5000 euros mensuels en vendant des exercices maths.',
        quote: 'J\'ai remboursé mon abonnement dès le premier mois de ventes !',
      },
    ],
  },

  // FAQ Section - ALL questions from French more-less.md Section 6
  faq: {
    sectionTitle: 'Questions Fréquentes sur les Fiches Maternelle et Exercices Maths - Tout savoir sur les Fiches à Imprimer Gratuit',
    sectionDescription: 'Les enseignants posent souvent les mêmes questions sur nos exercices maths et fiches maternelle. Cette section répond aux interrogations les plus courantes. Comprenez comment utiliser notre générateur de fiches à imprimer efficacement. Découvrez toutes les possibilités offertes par l\'abonnement Accès Complet. Ces réponses vous aident à maximiser la valeur de votre investissement.',
    showMoreText: 'Afficher plus de questions',
    showLessText: 'Voir moins',
    badgeText: 'FAQ',
    readMoreLabel: 'Lire la suite',
    showLessLabel: 'Voir moins',
    secureCheckout: 'Paiement sécurisé',
    cancelAnytime: 'Résiliez à tout moment',
    items: [
      {
        id: '1',
        question: 'Ce Générateur d\'Exercices Maths et Fiches Maternelle est-il Vraiment Gratuit avec Coloriage à Imprimer ?',
        answer: 'Le générateur d\'exercices maths nécessite un abonnement Accès Complet coûtant 240 $ annuels ou 25 $ mensuels. Votre abonnement vous permet de créer des fiches maternelle en illimité sans frais par fiche. Générez autant d\'exercices maths que nécessaire sans charges supplémentaires. Les fiches à imprimer avec coloriage incluent toutes les fonctionnalités sans limitation. L\'abonnement Accès Complet inclut 33 générateurs de fiches différents. Créez des exercices maths, du coloriage à imprimer, des fiches d\'alphabet et bien plus. Tous les générateurs utilisent la même bibliothèque de 3000 images. Cette formule tout-inclus offre une valeur exceptionnelle comparée aux concurrents. La licence commerciale est incluse dans les deux formules d\'abonnement. Vendez vos fiches maternelle avec coloriage à imprimer sur toutes les plateformes. Aucun frais de licence supplémentaire n\'est requis pour la commercialisation.',
      },
      {
        id: '2',
        question: 'Puis-je Imprimer les Fiches Maternelle avec Coloriage à Imprimer et Graphisme Maternelle à Domicile ?',
        answer: 'Les fiches maternelle et exercices maths s\'impriment parfaitement sur imprimante domestique standard. Les formats Letter et A4 correspondent aux imprimantes courantes. La résolution 300 DPI garantit une qualité professionnelle sur papier ordinaire. Les exercices avec graphisme maternelle restent nets et lisibles même sur imprimantes d\'entrée de gamme. L\'option niveaux de gris économise considérablement l\'encre d\'imprimante. Les fiches à imprimer en noir et blanc conservent toute leur clarté. Cette fonctionnalité réduit les coûts d\'impression de 70 pour cent environ. Les activités de coloriage à imprimer fonctionnent parfaitement en noir et blanc. Le coloriage à imprimer après les exercices maths motive les élèves à terminer. Les enfants colorient les images quel que soit le mode d\'impression.',
      },
      {
        id: '3',
        question: 'Ai-je Besoin de Compétences en Graphisme Maternelle ou Écriture Cursive pour Créer des Exercices Maths ?',
        answer: 'Aucune compétence en conception graphique n\'est nécessaire pour créer des fiches maternelle. L\'interface intuitive guide les utilisateurs à travers chaque étape. Sélectionnez vos préférences dans les menus déroulants simples. Les exercices maths se génèrent automatiquement selon vos paramètres. Le graphisme maternelle des fiches est géré automatiquement par le générateur. Les éléments se positionnent harmonieusement sans intervention manuelle. Modifiez ensuite la mise en page si souhaité par simple glisser-déposer. Cette flexibilité convient aux débutants comme aux utilisateurs avancés. L\'écriture cursive n\'est pas requise car les symboles et chiffres s\'impriment en polices claires. Choisissez parmi 7 polices adaptées aux enfants.',
      },
      {
        id: '4',
        question: 'Puis-je Utiliser ces Fiches Maternelle avec Alphabet et Coloriage à Imprimer en Classe pour Exercices CP ?',
        answer: 'L\'abonnement Accès Complet inclut une utilisation illimitée en classe. Imprimez autant de fiches maternelle que nécessaire pour tous vos élèves. Distribuez les exercices CP à toute la classe sans restriction. Cette utilisation pédagogique est explicitement autorisée dans les conditions d\'abonnement. Les fiches combinant alphabet et exercices maths enrichissent l\'apprentissage interdisciplinaire. Sélectionnez des images commençant par différentes lettres de l\'alphabet. Les élèves pratiquent simultanément reconnaissance de lettres et calcul mental. Cette approche intégrée maximise le temps d\'enseignement limité. Le coloriage à imprimer après les exercices CP motive les élèves à terminer. Utilisez cette activité comme récompense pour le travail mathématique accompli.',
      },
      {
        id: '5',
        question: 'Quelles Langues sont Disponibles pour Apprendre à Lire les Nombres et l\'Alphabet en Exercices CP ?',
        answer: 'Notre générateur fonctionne en 11 langues européennes différentes. Créez des exercices CP en français, anglais, allemand, espagnol et portugais. Les langues disponibles incluent aussi italien, néerlandais, suédois, danois, norvégien et finnois. Cette diversité facilite l\'enseignement multilingue pour apprendre à lire. La sélection de langue affecte les noms de fichiers dans la bibliothèque d\'images. Les élèves apprenant à lire associent images et mots dans la langue choisie. Cette fonctionnalité aide particulièrement l\'enseignement de l\'alphabet en langue étrangère. Les enfants apprennent à lire simultanément mathématiques et vocabulaire nouveau. L\'interface utilisateur se traduit également dans toutes les langues.',
      },
      {
        id: '6',
        question: 'Puis-je Vendre mes Fiches Maternelle avec Graphisme Maternelle et Tables de Multiplication sur Teachers Pay Teachers ?',
        answer: 'L\'abonnement Accès Complet inclut la licence commerciale d\'impression à la demande complète. Vendez vos fiches maternelle sur Teachers Pay Teachers, Etsy et Amazon KDP légalement. Aucun frais de licence supplémentaire ne s\'ajoute au coût d\'abonnement. Cette autorisation commerciale couvre tous les produits créés avec nos générateurs. Les fiches avec graphisme maternelle se vendent particulièrement bien auprès des parents. Combinez exercices maths et activités de motricité fine dans un même pack. Les enseignants achètent volontiers des ressources complètes multidisciplinaires. Les tables de multiplication ne sont pas disponibles dans cette application spécifique. Notre générateur se concentre sur la comparaison pour maternelle et CP. Utilisez nos autres générateurs de la plateforme pour créer des fiches de tables de multiplication.',
      },
      {
        id: '7',
        question: 'Comment Personnaliser le Graphisme Maternelle et le Coloriage à Imprimer des Exercices Maths pour Exercices CE1 ?',
        answer: 'Tous les éléments des fiches maternelle sont entièrement personnalisables sur le canevas. Cliquez sur n\'importe quel objet pour le sélectionner et le modifier. Déplacez, redimensionnez ou faites pivoter chaque élément librement. Cette flexibilité totale permet de créer des exercices CE1 parfaitement adaptés. Le graphisme maternelle s\'ajuste facilement pour différents niveaux d\'élèves. Agrandissez les symboles mathématiques pour les élèves malvoyants ou débutants. Utilisez des couleurs contrastées pour améliorer la lisibilité générale. Simplifiez la mise en page pour réduire la surcharge visuelle si nécessaire. Le coloriage à imprimer se positionne librement sur la fiche. Agrandissez l\'image pour créer une grande zone de coloriage. Combinez plusieurs petites images pour un coloriage à imprimer varié et attrayant.',
      },
      {
        id: '8',
        question: 'Pour Quels Niveaux Conviennent ces Fiches Maternelle avec Alphabet et Écriture Cursive ?',
        answer: 'Les exercices maths conviennent principalement aux élèves de maternelle et CP. Les comparaisons avec 3 à 4 exercices sont parfaites pour la petite et moyenne section. Les fiches avec 6 à 8 exercices conviennent à la grande section et au CP. Ajustez la difficulté selon les capacités individuelles de vos élèves. Les fiches intégrant alphabet sont idéales pour les élèves apprenant à lire. Utilisez des images représentant des objets commençant par différentes lettres de l\'alphabet. Les enfants associent visuellement images et sons des lettres. Cette approche multisensorielle renforce l\'apprentissage de la lecture et des mathématiques. L\'écriture cursive n\'est pas directement pratiquée dans ces exercices maths. Le choix entre symboles développe cependant le contrôle moteur préparant à l\'écriture cursive.',
      },
      {
        id: '9',
        question: 'Puis-je Télécharger mes Propres Images pour Fiches à Imprimer avec Alphabet et Coloriage pour Apprendre à Lire ?',
        answer: 'La fonctionnalité de téléchargement d\'images personnelles est complètement incluse. Importez vos propres photos depuis votre ordinateur facilement. Sélectionnez plusieurs images simultanément pour gagner du temps. Tous les formats d\'image courants sont acceptés sans restriction. Utilisez des photos d\'objets de votre classe pour personnaliser les fiches pour apprendre à lire. Les élèves adorent résoudre des exercices avec des images familières. Photographiez des objets commençant par différentes lettres de l\'alphabet. Cette personnalisation renforce simultanément lecture et calcul mental. Combinez images téléchargées et images de notre bibliothèque librement. Créez des fiches totalement uniques pour votre classe.',
      },
      {
        id: '10',
        question: 'Combien de Temps Faut-il pour Créer des Fiches Maternelle avec Graphisme et Tables de Multiplication ?',
        answer: 'Créer des exercices maths de comparaison prend moins de 3 minutes du début à l\'impression. Sélectionnez la configuration en quelques secondes. Choisissez une image de la bibliothèque rapidement. Générez les fiches maternelle instantanément puis téléchargez immédiatement. Les fiches avec graphisme maternelle élaboré nécessitent quelques minutes supplémentaires de personnalisation. Ajustez la mise en page selon vos préférences visuelles. Modifiez couleurs et positions pour créer la fiche parfaite. Même avec personnalisation extensive, terminez en moins de 10 minutes. Les tables de multiplication ne sont pas créées par cette application spécifique. Notre générateur se concentre sur comparaison de quantités de base. Pour créer des fiches de tables de multiplication, utilisez nos autres générateurs.',
      },
      {
        id: '11',
        question: 'Les Fiches Maternelle et Exercices Maths Incluent-ils un Corrigé pour Apprendre à Lire les Réponses en Exercices CE1 ?',
        answer: 'Chaque fiche maternelle génère automatiquement un corrigé sur onglet séparé. Le corrigé affiche les symboles corrects pour chaque comparaison. Basculez entre fiche élève et corrigé en cliquant sur les onglets. Cette organisation facilite considérablement la vérification du travail des élèves en exercices CE1. Le corrigé aide aussi les élèves à apprendre à lire les symboles mathématiques. Les connexions visuelles montrent clairement les bonnes réponses. Les élèves vérifient leur travail de manière autonome en comparant. Cette autocorrection développe compétences métacognitives et confiance en soi pour apprendre à lire. Téléchargez et imprimez le corrigé séparément de la fiche élève. Gardez le corrigé pour référence personnelle comme enseignant.',
      },
      {
        id: '12',
        question: 'Puis-je Créer des Exercices Maths sur Alphabet, Écriture Cursive et Tables de Multiplication Spécifiques ?',
        answer: 'Les exercices maths se concentrent sur comparaison de quantités uniquement. Sélectionnez les symboles plus grand que, plus petit que ou égal à. Les comparaisons se génèrent automatiquement selon la difficulté choisie. Cette focalisation garantit des exercices cohérents et appropriés. Les fiches intégrant alphabet utilisent des images thématiques pour l\'apprentissage interdisciplinaire. Sélectionnez des thèmes contenant objets commençant par lettres spécifiques de l\'alphabet. Les élèves pratiquent calcul tout en révisant sons des lettres. L\'écriture cursive et les tables de multiplication ne sont pas directement couvertes par cette application. Notre plateforme propose cependant 32 autres générateurs de fiches différents. Utilisez le générateur d\'écriture cursive pour pratiquer les lettres. Accédez au générateur de tables de multiplication pour les élèves plus âgés. L\'abonnement Accès Complet inclut tous ces générateurs sans frais supplémentaires.',
      },
    ],
  },

  // Pricing - French translations with Accès Complet
  pricing: {
    title: 'Accès Complet',
    price: '240 $',
    priceInterval: '/an',
    priceSuffix: 'Facturé annuellement',
    benefits: [
      'Création illimitée de fiches',
      'Licence commerciale incluse',
      '11 langues supportées',
      '3000+ images thématiques',
      'Qualité impression 300 DPI',
      'Corrigés inclus',
    ],
    ctaText: 'Commencer à Créer',
    bundleDescription: 'Votre abonnement inclut l'acces a 10 generateurs de fiches:',
    bundleApps: [
      'Addition Images',
      'Train Alphabet',
      'Coloriages',
      'Fiches de Maths',
      'Mots Melanges',
      'Cherche et Compte',
      'Jeu d'Association',
      'Tracer des Lignes',
      'Bingo Images',
      'Sudoku',
    ],
  },

  // Related Apps - French translations
  relatedApps: {
    sectionTitle: 'Combinez avec d\'Autres Générateurs de Fiches - Tables de Multiplication, Graphisme Maternelle et Coloriage',
    sectionDescription: 'Notre plateforme propose 33 générateurs de fiches à imprimer différents. Combinez les exercices maths de comparaison avec d\'autres types de fiches pédagogiques. Créez des packs d\'apprentissage complets couvrant plusieurs domaines. Les enseignants apprécient cette approche intégrée qui maximise l\'efficacité pédagogique. Votre abonnement Accès Complet donne accès à tous les générateurs sans frais supplémentaires.',
    ctaTitle: 'Prêt à Créer des Fiches Incroyables ?',
    ctaDescription: 'Rejoignez les éducateurs qui créent des fiches professionnelles. Génération illimitée, licence commerciale incluse.',
    primaryCtaText: 'Commencer l\'Essai Gratuit',
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
        name: 'Fiches d\'Addition',
        category: 'Maths',
        icon: '➕',
        description: 'Combinez les exercices de comparaison avec les fiches d\'addition pour une pratique mathématique complète. Les élèves comparent des quantités puis résolvent des équations d\'addition.',
      },
      {
        id: '2',
        slug: 'cherche-et-compte-fiches',
        name: 'Cherche et Compte',
        category: 'Maths',
        icon: '🔢',
        description: 'Associez les exercices de comparaison avec des activités de comptage. Les élèves comptent des objets puis comparent les quantités avec les symboles plus moins égal.',
      },
      {
        id: '3',
        slug: 'grand-petit-fiches',
        name: 'Grand et Petit',
        category: 'Apprentissage Visuel',
        icon: '📐',
        description: 'Créez des unités complètes de comparaison de taille combinant plus/moins avec les fiches grand/petit. Pratiquez comparaison de quantité et de taille ensemble.',
      },
      {
        id: '4',
        slug: 'association-fiches',
        name: 'Fiches d\'Association',
        category: 'Apprentissage Visuel',
        icon: '🔗',
        description: 'Regroupez les exercices de comparaison avec des activités d\'association. Les élèves identifient les quantités puis associent des groupes d\'objets égaux.',
      },
      {
        id: '5',
        slug: 'diagramme-images-fiches',
        name: 'Diagramme en Images',
        category: 'Maths',
        icon: '📊',
        description: 'Combinez comparaison avec des fiches de pictogrammes pour les compétences d\'analyse de données. Les élèves lisent des graphiques puis comparent les quantités affichées.',
      },
      {
        id: '6',
        slug: 'fiches-maths',
        name: 'Fiches de Maths',
        category: 'Maths',
        icon: '🧮',
        description: 'Créez des packs de maths complets avec comparaison et fiches de mathématiques générales. Couvrez plusieurs concepts mathématiques précoces dans une seule unité d\'apprentissage.',
      },
    ],
  },
};

export default moreLessFrContent;
