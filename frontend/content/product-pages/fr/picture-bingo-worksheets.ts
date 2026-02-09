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
    title: 'Bingo Illustré | Générateur Fiches Maternelle CP',
    description: 'Créez des cartes bingo professionnelles avec notre générateur de fiches à imprimer gratuit. Votre abonnement Pack Essentiel vous offre une création illimitée.',
    keywords: 'bingo images, cartes bingo, fiches maternelle, fiches à imprimer gratuit, exercices CP, exercices CE1, graphisme maternelle, jeux éducatifs, bingo alphabet, bingo maths, apprendre à lire',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fr/apps/bingo-images-fiches',
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
    videos: {
      commonFeatures: {
        videoId: 'Df9fknBBRFA',
        buttonText: 'Découvrir en vidéo',
        modalTitle: 'Aperçu des fonctionnalités',
      },
      appSpecific: {
        videoId: 'd6AOiDXoK1c',
        buttonText: 'Fonctions Bingo Images',
        modalTitle: 'Tutoriel Bingo Images',
      },
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
    items: [],
    
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
    items: [], // Samples loaded dynamically from content manager
    
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
    items: [], // Samples loaded dynamically from content manager
    
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
    secureCheckout: 'Paiement s\u00e9curis\u00e9',
    cancelAnytime: 'R\u00e9siliez \u00e0 tout moment',
    items: [
      {
        id: 'faq-1',
        question: 'Comment fonctionne le g\u00e9n\u00e9rateur de cartes bingo illustr\u00e9es ?',
        answer: 'Le g\u00e9n\u00e9rateur cr\u00e9e des cartes bingo avec des images s\u00e9lectionn\u00e9es parmi notre biblioth\u00e8que de plus de 3000 illustrations. Chaque g\u00e9n\u00e9ration produit une fiche de carte bingo avec des jetons d\'appel d\u00e9coupables, ainsi qu\'une feuille d\'appel s\u00e9par\u00e9e pour l\'enseignant. Les images sont dispos\u00e9es al\u00e9atoirement pour garantir des cartes uniques.',
      },
      {
        id: 'faq-2',
        question: 'Combien de cartes bingo puis-je g\u00e9n\u00e9rer par partie ?',
        answer: 'Vous pouvez g\u00e9n\u00e9rer de 1 \u00e0 10 cartes bingo uniques en un seul clic. Chaque carte pr\u00e9sente un arrangement d\'images diff\u00e9rent pour \u00e9viter les doublons pendant le jeu. La taille de la grille est personnalisable selon vos besoins p\u00e9dagogiques.',
      },
      {
        id: 'faq-3',
        question: 'Le bingo convient-il aux activit\u00e9s de classe enti\u00e8re ?',
        answer: 'Oui, le g\u00e9n\u00e9rateur est id\u00e9al pour les activit\u00e9s en classe enti\u00e8re. G\u00e9n\u00e9rez un jeu complet avec plusieurs cartes uniques et la feuille d\'appel pour l\'enseignant. Les jetons d\'appel d\u00e9coupables sont inclus sur chaque fiche, ce qui permet de jouer imm\u00e9diatement apr\u00e8s l\'impression.',
      },
      {
        id: 'faq-4',
        question: 'Quelles tailles de grille sont disponibles ?',
        answer: 'Trois tailles de grille sont propos\u00e9es : 3x3 pour les tout-petits de petite et moyenne section, 4x4 pour les \u00e9l\u00e8ves de grande section et CP, et 5x5 pour les \u00e9l\u00e8ves de CE1 et CE2. Les grilles plus petites facilitent l\'apprentissage pour les d\u00e9butants, tandis que les plus grandes offrent un d\u00e9fi suppl\u00e9mentaire.',
      },
      {
        id: 'faq-5',
        question: 'Peut-on cr\u00e9er des jeux de bingo th\u00e9matiques ?',
        answer: 'Oui, vous pouvez cr\u00e9er des bingos th\u00e9matiques en s\u00e9lectionnant une cat\u00e9gorie sp\u00e9cifique comme les animaux, la nourriture, les v\u00e9hicules ou les saisons. Il est aussi possible de m\u00e9langer des images de diff\u00e9rents th\u00e8mes ou de t\u00e9l\u00e9verser vos propres images pour des bingos enti\u00e8rement personnalis\u00e9s.',
      },
      {
        id: 'faq-6',
        question: 'Quels formats de fichier sont disponibles pour les cartes bingo ?',
        answer: 'Les cartes bingo se t\u00e9l\u00e9chargent en PDF pour l\u2019impression professionnelle ou en JPEG pour le partage num\u00e9rique. La r\u00e9solution de 300 DPI garantit que les images des grilles et les jetons d\u2019appel restent parfaitement nets apr\u00e8s impression.',
      },
      {
        id: 'faq-7',
        question: 'Le g\u00e9n\u00e9rateur de bingo fonctionne-t-il en plusieurs langues ?',
        answer: 'Oui, onze langues sont support\u00e9es pour les noms d\u2019images et les consignes. La feuille d\u2019appel et les \u00e9tiquettes s\u2019adaptent automatiquement \u00e0 la langue choisie. Id\u00e9al pour les cours de fran\u00e7ais langue \u00e9trang\u00e8re o\u00f9 le bingo renforce le vocabulaire.',
      },
      {
        id: 'faq-8',
        question: 'Comment fonctionnent les diff\u00e9rentes tailles de grille bingo ?',
        answer: 'La grille 3x3 avec 9 cases convient aux tout-petits de petite et moyenne section. La grille 4x4 avec 16 cases offre un d\u00e9fi interm\u00e9diaire pour la grande section et le CP. La grille 5x5 avec 25 cases repr\u00e9sente le niveau le plus avanc\u00e9 pour les CE1 et CE2.',
      },
      {
        id: 'faq-9',
        question: 'Comment optimiser l\u2019impression des cartes bingo ?',
        answer: 'Imprimez le PDF sur papier cartonn\u00e9 pour des cartes plus durables que les \u00e9l\u00e8ves manipulent pendant le jeu. Les jetons d\u2019appel se d\u00e9coupent plus facilement sur papier \u00e9pais. Plastifiez les cartes pour les r\u00e9utiliser avec des feutres effa\u00e7ables ou des jetons physiques.',
      },
      {
        id: 'faq-10',
        question: 'Puis-je vendre les jeux de bingo cr\u00e9\u00e9s ?',
        answer: 'Oui, votre abonnement Pack Essentiel inclut une licence commerciale pour toutes les cr\u00e9ations. Les jeux de bingo th\u00e9matiques sont tr\u00e8s recherch\u00e9s par les enseignants sur Teachers Pay Teachers et Etsy. Cr\u00e9ez des sets complets par th\u00e8me pour augmenter vos ventes.',
      },
      {
        id: 'faq-11',
        question: 'Comment fonctionne l\u2019abonnement pour le g\u00e9n\u00e9rateur de bingo ?',
        answer: 'Le Pack Essentiel \u00e0 144 \u20ac par an donne acc\u00e8s \u00e0 10 g\u00e9n\u00e9rateurs, dont le bingo images. Cr\u00e9ation illimit\u00e9e de cartes uniques avec feuilles d\u2019appel automatiques. Paiement s\u00e9curis\u00e9 et r\u00e9siliation possible \u00e0 tout moment.',
      },
      {
        id: 'faq-12',
        question: 'Comment utiliser mes propres images pour les cartes bingo ?',
        answer: 'Cliquez sur le bouton de t\u00e9l\u00e9versement et importez vos fichiers JPEG, PNG ou GIF. Vos images s\u2019int\u00e8grent dans les grilles bingo et les jetons d\u2019appel. Les photos de classe ou les images sp\u00e9cifiques \u00e0 un th\u00e8me \u00e9tudi\u00e9 cr\u00e9ent des bingos sur mesure.',
      },
      {
        id: 'faq-13',
        question: 'Le bingo images correspond-il au programme scolaire ?',
        answer: 'Oui, le bingo d\u00e9veloppe la discrimination visuelle, l\u2019attention et le vocabulaire th\u00e9matique. En maternelle, il renforce la reconnaissance d\u2019images et l\u2019\u00e9coute des consignes. Au CP et CE1, il consolide le vocabulaire et les comp\u00e9tences d\u2019association.',
      },
      {
        id: 'faq-14',
        question: 'Comment adapter le bingo pour les \u00e9l\u00e8ves en difficult\u00e9 ?',
        answer: 'Choisissez une grille 3x3 avec des images tr\u00e8s distinctes les unes des autres. Les images familières et concr\u00e8tes facilitent la reconnaissance rapide. Jouez d\u2019abord avec les cartes visibles devant chaque \u00e9l\u00e8ve avant de passer au format classique avec \u00e9coute seule.',
      },
      {
        id: 'faq-15',
        question: 'Quels formats de page sont propos\u00e9s pour les cartes bingo ?',
        answer: 'Les formats Letter et A4 sont disponibles en portrait ou paysage. Chaque carte bingo occupe une page enti\u00e8re pour une manipulation facile par les jeunes enfants. Les jetons d\u2019appel et la feuille d\u2019appel se t\u00e9l\u00e9chargent sur des pages s\u00e9par\u00e9es.',
      },
      {
        id: 'faq-16',
        question: 'L\u2019option niveaux de gris est-elle disponible pour les cartes bingo ?',
        answer: 'Oui, le mode niveaux de gris convertit toutes les images en noir et blanc. Les enfants peuvent colorier les images au fur et \u00e0 mesure qu\u2019elles sont appel\u00e9es, ajoutant une dimension cr\u00e9ative au jeu. Cette option r\u00e9duit les co\u00fbts d\u2019impression pour les grandes classes.',
      },
      {
        id: 'faq-17',
        question: 'Comment personnaliser les cartes bingo sur le canevas ?',
        answer: 'D\u00e9placez et redimensionnez la grille bingo et les jetons d\u2019appel librement sur la page. Ajoutez un titre th\u00e9matique, le nom du jeu ou des r\u00e8gles sp\u00e9cifiques. Les bordures d\u00e9coratives et arri\u00e8re-plans th\u00e9matiques rendent chaque jeu visuellement attractif.',
      },
      {
        id: 'faq-18',
        question: 'Peut-on combiner le bingo avec d\u2019autres g\u00e9n\u00e9rateurs ?',
        answer: 'Oui, associez le bingo images avec les fiches d\u2019association pour renforcer le vocabulaire. Combinez avec les coloriages pour des activit\u00e9s calmes apr\u00e8s le jeu ou les fiches de maths pour varier les approches. Ces combinaisons cr\u00e9ent des journ\u00e9es d\u2019activit\u00e9s compl\u00e8tes.',
      },
      {
        id: 'faq-19',
        question: 'Comment le bingo d\u00e9veloppe-t-il l\u2019\u00e9coute et l\u2019attention ?',
        answer: 'Les \u00e9l\u00e8ves doivent \u00e9couter attentivement chaque image appel\u00e9e et la rep\u00e9rer sur leur grille. Ce processus entra\u00eene l\u2019attention auditive, la m\u00e9moire de travail et la coordination entre \u00e9coute et action visuelle. Le format comp\u00e9titif maintient la motivation et la concentration.',
      },
      {
        id: 'faq-20',
        question: 'Combien de temps faut-il pour cr\u00e9er un jeu de bingo complet ?',
        answer: 'La cr\u00e9ation prend moins de trois minutes. Choisissez les images par th\u00e8me, s\u00e9lectionnez la taille de grille et le nombre de cartes uniques, puis cliquez sur Cr\u00e9er. Les cartes, les jetons d\u2019appel et la feuille d\u2019appel sont g\u00e9n\u00e9r\u00e9s instantan\u00e9ment.',
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
    items: [], // Samples loaded dynamically from content manager
    
  },
};

export default pictureBingoFrContent;
