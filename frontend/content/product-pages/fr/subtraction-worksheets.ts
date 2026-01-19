import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Subtraction Worksheets - French Content
 *
 * File: frontend/content/product-pages/fr/subtraction-worksheets.ts
 * URL: /fr/apps/soustraction-fiches (French SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/French/subtraction.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 *
 * PRICING: Accès Complet = 240€/an (Accès Complet)
 * App ID: subtraction
 */

export const subtractionFrContent: ProductPageContent = {
  // SEO Metadata - French language-specific
  seo: {
    slug: 'soustraction-fiches',
    appId: 'subtraction',
    title: 'Fiches Soustraction Gratuites | Générateur Maternelle CP - LessonCraft',
    description: 'Créez des fiches de soustraction gratuites en 3 clics. Exercices maths maternelle et CP à imprimer. 3000+ images, 11 langues. Téléchargez PDF 300 DPI maintenant.',
    keywords: 'fiches à imprimer gratuit, fiches maternelle, exercices maths, exercices CP, soustraction, graphisme maternelle, coloriage à imprimer, apprendre à lire, alphabet, écriture cursive, tables de multiplication, exercices CE1',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fr/apps/soustraction-fiches',
    images: [
      {
        url: 'https://www.lessoncraftstudio.com/samples/english/subtraction/sample-1.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Fiches soustraction gratuites - exercices maths barrer des images pour maternelle'
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/english/subtraction/sample-2.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Fiche soustraction gratuite pour enfants - exercices CP image moins chiffre'
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/english/subtraction/sample-3.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Fiches gratuites soustraction - exercices CE1 trouver le nombre soustrait'
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/english/subtraction/sample-4.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Fiche pour maternelle soustraction - exercices maths mixtes imprimables gratuits'
      }
    ],
  },

  // Hero Section - FULL text from French subtraction.md Section 1
  hero: {
    title: 'Générateur de Fiches de Soustraction',
    subtitle: 'Exercices Maths à Imprimer - Fiches Maternelle et CP',
    description: `Créez des exercices de soustraction visuels avec notre générateur de fiches à imprimer. Votre abonnement Accès Complet vous donne accès illimité à la création de fiches sans frais supplémentaires par fiche. Générez des exercices maths adaptés aux élèves de maternelle, CP et CE1 avec des images qui rendent la soustraction concrète et amusante. Téléchargez vos fiches de soustraction en format PDF haute qualité en moins de 3 minutes.

Notre générateur transforme la soustraction en activité visuelle captivante pour les jeunes élèves. Utilisez plus de 3000 images adaptées aux enfants pour créer des exercices de calcul où les élèves peuvent voir physiquement le concept de retirer des objets. Choisissez parmi quatre modes différents : barrer des images (traditionnel), image moins chiffre, trouver le nombre soustrait, ou exercices mixtes. Personnalisez le niveau de difficulté de 2 à 20 pour correspondre exactement aux capacités de vos élèves. Chaque fiche génère automatiquement un corrigé, vous faisant gagner un temps précieux.

Les enseignants de maternelle et de CP utilisent ces fiches de soustraction pour enseigner les premières notions de calcul. Les images concrètes aident les enfants à comprendre que soustraire signifie enlever ou retirer. Parfait pour compléter vos exercices maths quotidiens, ces fiches à imprimer offrent une approche multisensorielle de la soustraction. Modifiez chaque élément sur le canevas après génération : déplacez les images, changez les couleurs, ajoutez du texte personnalisé. Exportez en 300 DPI pour une qualité professionnelle parfaite pour l'impression en classe ou la vente sur Teachers Pay Teachers.`,
    previewImageSrc: '/samples/english/subtraction/sample-1.jpeg',
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

  // Sample Gallery - REAL file paths from samples/english/subtraction/
  samples: {
    sectionTitle: 'Exemples de Fiches de Soustraction',
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
        worksheetSrc: '/samples/english/subtraction/sample-1.jpeg',
        answerKeySrc: '/samples/english/subtraction/sample-1_answer-key.jpeg',
        altText: 'Fiches soustraction gratuites pour enfants - exercices maths barrer des images mode maternelle avec images thématiques',
        pdfDownloadUrl: '/samples/english/subtraction/sample-1.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/english/subtraction/sample-2.jpeg',
        answerKeySrc: '/samples/english/subtraction/sample-2_answer-key.jpeg',
        altText: 'Fiche soustraction gratuite pour maternelle - exercices CP image moins chiffre avec calcul visuel',
        pdfDownloadUrl: '/samples/english/subtraction/sample-2.pdf',
      },
      {
        id: '3',
        worksheetSrc: '/samples/english/subtraction/sample-3.jpeg',
        answerKeySrc: '/samples/english/subtraction/sample-3_answer-key.jpeg',
        altText: 'Imprimables gratuits soustraction - exercices CE1 trouver le nombre soustrait fiche pour enfants',
        pdfDownloadUrl: '/samples/english/subtraction/sample-3.pdf',
      },
      {
        id: '4',
        worksheetSrc: '/samples/english/subtraction/sample-4.jpeg',
        answerKeySrc: '/samples/english/subtraction/sample-4_answer-key.jpeg',
        altText: 'Fiches gratuites soustraction exercices mixtes - fiches à imprimer gratuit pour exercices maths CP',
        pdfDownloadUrl: '/samples/english/subtraction/sample-4.pdf',
      },
    ],
  },

  // Features Grid - FULL text from French subtraction.md Section 2
  features: {
    sectionTitle: 'Fonctionnalités Fiches Gratuites pour Enfants - Exercices Maths Maternelle et Graphisme à Imprimer',
    sectionDescription: 'Notre générateur de fiches de soustraction offre des fonctionnalités complètes pour créer des exercices CP et exercices CE1 professionnels. Chaque fonctionnalité a été conçue pour faciliter la création de fiches à imprimer de haute qualité. Les enseignants gagnent du temps tout en créant des exercices maths personnalisés.',
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
        title: 'Fiche Gratuite pour Enfants en 3 Clics - Fiches Maternelle Exercices CP Imprimables Gratuits',
        description: `Créez des exercices de soustraction complets en trois étapes simples. Sélectionnez vos images parmi plus de 3000 illustrations. Configurez le nombre d'exercices de 1 à 10 selon vos besoins. Cliquez sur générer et votre fiche apparaît instantanément. Le générateur crée automatiquement des exercices maths adaptés au niveau maternelle et CP. Choisissez parmi quatre modes : barrer des images, image moins chiffre, trouver le nombre soustrait, ou exercices mixtes. Réglez la difficulté de 2 à 20 pour correspondre aux capacités de vos élèves. Les fiches à imprimer sont prêtes en moins de 3 minutes. Aucune compétence en design graphique n'est nécessaire. Parfait pour les enseignants qui ont besoin de fiches maternelle rapidement chaque semaine.`,
        highlighted: false,
      },
      {
        id: '2',
        icon: '✏️',
        title: 'Fiches Gratuites Exercices Maths Personnalisables - Graphisme Maternelle et Coloriage à Imprimer',
        description: `Modifiez chaque élément de vos exercices CP après génération. Déplacez les images avec votre souris où vous voulez. Redimensionnez chaque image en tirant les coins. Faites pivoter les éléments pour créer des compositions dynamiques. Supprimez les images qui ne vous conviennent pas. Ajoutez du texte personnalisé n'importe où sur la fiche. Changez les couleurs pour correspondre à votre thème de classe. Cette flexibilité totale transforme nos fiches à imprimer en outils pédagogiques sur mesure. Les exercices maths deviennent parfaitement adaptés à vos élèves. Déplacez les expressions mathématiques si nécessaire. Ajustez l'espacement entre les exercices pour une meilleure lisibilité. Créez des fiches maternelle uniques chaque semaine sans répétition.`,
        highlighted: false,
      },
      {
        id: '3',
        icon: '📤',
        title: 'Fiche pour Maternelle avec Alphabet - Imprimables Gratuits Exercices CE1 Apprendre à Lire',
        description: `Téléversez vos propres images pour créer des exercices ultra-personnalisés. Accepte tous les formats courants : JPEG, PNG, GIF. Téléversez plusieurs images simultanément pour gagner du temps. Combinez vos images avec notre bibliothèque de 3000+ illustrations. Utilisez des photos de votre classe pour des exercices maths contextualisés. Les élèves adorent voir des objets familiers dans leurs fiches à imprimer. Créez des exercices CP avec des images de la vie quotidienne de vos élèves. Parfait pour les projets thématiques ou les unités d'apprentissage spécifiques. Vos fiches maternelle deviennent instantanément plus engageantes et pertinentes. Les images personnelles renforcent la connexion entre l'apprentissage et le monde réel.`,
        highlighted: false,
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Fiches à Imprimer Gratuit 11 Langues - Fiche Gratuite Exercices Maths Multilingues',
        description: `Créez des fiches à imprimer en 11 langues différentes. Interface disponible en français, anglais, allemand, espagnol, italien, portugais, néerlandais, suédois, danois, norvégien et finnois. La bibliothèque d'images utilise des noms de fichiers dans la langue sélectionnée. Essentiel pour les enseignants de classes bilingues ou multilingues. Parfait pour les programmes d'immersion linguistique. Les écoles internationales bénéficient de cette flexibilité linguistique complète. Créez des exercices CP dans la langue maternelle de chaque élève. Les exercices maths deviennent accessibles à tous les apprenants. Changez de langue instantanément selon vos besoins pédagogiques. Idéal pour enseigner les mathématiques en contexte d'apprentissage d'une langue étrangère.`,
        highlighted: false,
      },
      {
        id: '5',
        icon: '💰',
        title: 'Fiches Gratuites Tables de Multiplication - Licence Commerciale Fiche pour Enfants à Vendre',
        description: `Votre abonnement Accès Complet inclut une licence commerciale print-on-demand complète. Vendez vos fiches maternelle sur Teachers Pay Teachers sans frais supplémentaires. Créez des cahiers d'exercices CP pour Etsy avec droits commerciaux complets. Publiez des livres d'exercices maths sur Amazon KDP légalement. Aucune attribution requise sur vos fiches à imprimer. Qualité 300 DPI parfaite pour l'impression professionnelle et la vente. Les enseignants entrepreneurs génèrent des revenus passifs avec leurs créations. Vendez des packs d'exercices CE1 thématiques toute l'année. La licence couvre toutes vos fiches à imprimer sans limitation. Créez votre boutique de ressources pédagogiques en toute légalité. Cette licence commerciale vaut normalement 100-200€ par an chez les concurrents.`,
        highlighted: true,
      },
      {
        id: '6',
        icon: '🎨',
        title: 'Fiche Gratuite pour Enfants 3000+ Images - Écriture Cursive et Graphisme Maternelle',
        description: `Accédez à plus de 3000 images adaptées aux enfants incluses dans votre abonnement. Organisées par thèmes pour une sélection rapide et facile. Animaux, objets quotidiens, nourriture, transport, nature et bien plus. Chaque image est optimisée pour les exercices maths visuels. Les illustrations claires aident les élèves de maternelle à comprendre la soustraction. Recherchez des images spécifiques par mot-clé en secondes. Sélectionnez un thème complet pour créer des fiches à imprimer cohérentes. Toutes les images sont incluses sans frais supplémentaires par image. Les concurrents facturent souvent 1-5€ par ensemble d'images. Notre bibliothèque vous fait économiser 200-400€ par an. Créez des exercices CP variés chaque semaine sans jamais manquer de contenu visuel.`,
        highlighted: false,
      },
      {
        id: '7',
        icon: '🖨️',
        title: 'Imprimables Gratuits 300 DPI - Fiches Maternelle Coloriage à Imprimer Haute Résolution',
        description: `Exportez vos fiches maternelle en qualité professionnelle 300 DPI. Parfait pour l'impression en classe sur n'importe quelle imprimante. Idéal pour vendre vos exercices CP avec une qualité irréprochable. Téléchargez en format JPEG ou PDF selon vos préférences. Option niveaux de gris pour économiser l'encre d'imprimante. Les exercices maths restent nets même après photocopie. La qualité 300 DPI garantit un texte parfaitement lisible. Les images restent claires et détaillées sur papier. Vos fiches à imprimer ont un aspect professionnel qui impressionne parents et collègues. Qualité identique aux ressources vendues sur Teachers Pay Teachers. Téléchargez le corrigé automatiquement généré dans la même qualité. Économisez des centaines d'euros en créant vous-même des exercices de qualité professionnelle.`,
        highlighted: true,
      },
    ],
  },

  // How-To Guide - FULL text from French subtraction.md Section 3
  howTo: {
    sectionTitle: 'Comment Créer des Fiches Gratuites Soustraction - Imprimables Gratuits en 5 Étapes',
    sectionDescription: 'Créer des exercices de soustraction professionnels prend moins de 3 minutes. Notre générateur simplifie chaque étape du processus de création. Suivez ces cinq étapes simples pour produire des fiches à imprimer de qualité.',
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
        title: 'Choisissez Images Alphabet - Fiche Gratuite pour Enfants Exercices Maths Visuels',
        description: `Sélectionnez les images pour vos exercices de soustraction. Choisissez un thème dans le menu déroulant. Plus de 3000 images s'affichent organisées par catégories. Animaux, fruits, jouets, véhicules, et bien d'autres thèmes disponibles. Cliquez sur les images que vous voulez inclure dans vos fiches maternelle. Le compteur montre combien d'images vous avez sélectionnées. Vous pouvez sélectionner autant d'images que d'exercices configurés. Utilisez la barre de recherche pour trouver des images spécifiques rapidement. Tapez "pomme" et toutes les images de pommes apparaissent. Parfait pour créer des exercices CP thématiques coordonnés. Vous pouvez aussi téléverser vos propres images personnelles. Cliquez sur le bouton de téléversement et sélectionnez vos fichiers. Combinez images de la bibliothèque et images personnelles librement. Vos élèves adorent voir des objets familiers dans leurs fiches à imprimer.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Configurez Fiches Maternelle - Graphisme Maternelle et Exercices CP Personnalisés',
        description: `Définissez le nombre d'exercices que vous voulez créer. Choisissez entre 1 et 10 exercices par fiche. Cinq exercices est la configuration par défaut la plus populaire. Sélectionnez le mode d'exercice parmi quatre options disponibles. Mode "Barrer" : les élèves barrent des images (méthode traditionnelle). Mode "Image-Chiffre" : images moins un chiffre. Mode "Trouver le nombre soustrait" : images - ? = résultat. Mode "Mixte" : combine plusieurs types d'exercices sur une fiche. Réglez le nombre maximum à soustraire de 2 à 20. Commencez avec 10 pour les élèves de maternelle débutants. Augmentez jusqu'à 20 pour les exercices CP plus avancés. Cochez "Inclure Nom/Date" pour ajouter un en-tête. Cochez "Numéroter les exercices" pour une organisation claire. Cochez "Boîte conviviale" pour des expressions mathématiques plus lisibles. Ces options rendent vos fiches à imprimer parfaitement adaptées.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Générez Fiches Gratuites - Coloriage à Imprimer et Exercices CE1 Instantanés',
        description: `Cliquez sur le bouton "Générer" pour créer votre fiche. Le générateur produit instantanément vos exercices maths personnalisés. Chaque problème utilise les images que vous avez sélectionnées. Les expressions mathématiques s'affichent clairement sous les images. Le système génère automatiquement un corrigé simultanément. Basculez entre l'onglet "Fiche" et l'onglet "Corrigé" facilement. Vérifiez que les exercices correspondent à vos attentes. Toutes vos fiches à imprimer apparaissent sur le canevas éditable. Le fond blanc par défaut convient à la plupart des usages. Vous pouvez changer la couleur de fond si désiré. Sélectionnez une taille de page : A4, Letter, paysage ou portrait. La génération complète prend moins de 3 secondes. Vos fiches maternelle sont maintenant prêtes pour édition ou téléchargement.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Modifiez Fiche pour Maternelle - Fiches à Imprimer Gratuit Apprendre à Lire',
        description: `Personnalisez chaque élément de vos exercices CP après génération. Cliquez sur n'importe quelle image pour la sélectionner. Déplacez les images en les faisant glisser avec la souris. Redimensionnez en tirant sur les coins de sélection. Faites pivoter les images pour créer des compositions dynamiques. Supprimez les éléments en appuyant sur la touche Suppr. Ajoutez du texte personnalisé n'importe où sur la fiche. Tapez votre texte et cliquez "Ajouter Texte". Changez la couleur, la taille et la police du texte. Créez des titres colorés pour vos fiches maternelle thématiques. Ajoutez des instructions spéciales pour vos élèves. Modifiez le texte des expressions mathématiques si nécessaire. Utilisez les outils d'alignement pour organiser les éléments proprement. Alignez plusieurs objets à gauche, au centre ou à droite. Centrez des éléments sur la page en un clic. Ajoutez des arrière-plans thématiques depuis notre bibliothèque. Sélectionnez des bordures décoratives pour embellir vos fiches à imprimer.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Téléchargez Imprimables Gratuits - Écriture Cursive et Tables de Multiplication PDF',
        description: `Téléchargez vos fiches à imprimer en format JPEG ou PDF. Cliquez sur le menu déroulant "Télécharger" pour voir les options. Téléchargez la fiche d'exercices en JPEG pour insertion facile. Téléchargez le corrigé en JPEG pour vérification rapide. Les fichiers PDF offrent la meilleure qualité pour impression. Téléchargez fiche et corrigé en PDF pour archivage professionnel. Cochez "Niveaux de gris" pour économiser l'encre d'imprimante. Les exercices maths en noir et blanc impriment parfaitement. Tous les téléchargements sont en qualité 300 DPI. Cette résolution garantit des impressions nettes et professionnelles. Vos fiches maternelle restent lisibles même après photocopies multiples. Imprimez directement depuis votre ordinateur ou tablette. Aucun logiciel supplémentaire n'est requis. Partagez les fichiers PDF avec vos collègues facilement. Téléversez sur Google Classroom ou plateformes d'apprentissage. Vendez vos créations sur Teachers Pay Teachers légalement. Créez des cahiers d'exercices CP complets pour vente sur Etsy. La licence commerciale Accès Complet couvre tous vos usages.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from French subtraction.md Section 4
  useCases: {
    sectionTitle: 'Fiche Gratuite pour Tous - Fiches Gratuites Enseignants Parents Exercices Maths CP CE1',
    sectionDescription: 'Notre générateur de soustraction sert différents types d\'enseignants et éducateurs. Chaque groupe trouve des applications spécifiques pour ces fiches maternelle. Les exercices visuels s\'adaptent à tous les contextes d\'apprentissage.',
    badgeText: 'Cas d\'Utilisation',
    readMoreLabel: 'Lire la suite',
    showLessLabel: 'Voir moins',
    items: [
      {
        id: '1',
        icon: '👶',
        title: 'Enseignants de Maternelle et Petite Section',
        subtitle: 'Fiche Gratuite pour Enfants Graphisme Maternelle Coloriage à Imprimer',
        description: `Les enseignants de maternelle utilisent nos fiches pour introduire la soustraction concrètement. Les élèves de petite section, moyenne section et grande section adorent les images colorées. Combinez exercices de soustraction avec des activités de graphisme maternelle. Ajoutez des lignes à tracer autour des images pour développer la motricité. Créez des fiches de coloriage à imprimer où les élèves colorient avant de barrer. Les exercices "barrer des images" renforcent le concept de retirer visuellement. Utilisez des images thématiques selon vos projets de classe. Pommes pour l'automne, flocons pour l'hiver, fleurs pour le printemps. Le graphisme maternelle s'intègre naturellement avec les exercices de calcul. Les élèves tracent des lignes pour relier les images aux nombres. Ajoutez du coloriage pour renforcer l'engagement et la concentration. Ces fiches à imprimer gratuites deviennent des activités complètes multi-compétences. La maternelle demande une approche ludique et visuelle. Notre générateur fournit exactement cette combinaison parfaite.`,
        quote: 'Mes élèves adorent barrer les images colorées !',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Enseignants de CP et CE1',
        subtitle: 'Fiches Gratuites Exercices CP Alphabet Apprendre à Lire Imprimables Gratuits',
        description: `Les enseignants de CP et CE1 intègrent soustraction avec apprentissage de la lecture. Utilisez des images dont les noms correspondent aux lettres de l'alphabet étudiées. Les élèves qui apprennent à lire peuvent étiqueter chaque image. Écrivez "A comme Ananas" sous les images d'ananas dans vos exercices CP. Cette méthode renforce simultanément calcul et reconnaissance de l'alphabet. Les élèves de CE1 écrivent des phrases complètes pour décrire chaque soustraction. "Il y avait 8 ballons, j'en ai enlevé 3, il reste 5 ballons." Cette approche développe compétences en écriture et apprendre à lire. Créez des exercices où les élèves lisent une histoire avant de résoudre. Les problèmes de soustraction deviennent des exercices de compréhension de lecture. Parfait pour les ateliers de mathématiques en CP et CE1. Les fiches à imprimer gratuit soutiennent votre enseignement quotidien. Combinez avec vos méthodes de lecture syllabique existantes. Les images servent de support visuel pour apprendre à lire.`,
        quote: 'Les images concrètes rendent la soustraction accessible.',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Parents en Instruction en Famille',
        subtitle: 'Fiche pour Maternelle Exercices CE1 Fiches à Imprimer Gratuit Alphabet',
        description: `Les parents qui font l'école à la maison adorent la flexibilité complète. Créez des fiches personnalisées pour chacun de vos enfants simultanément. Un enfant de maternelle fait du coloriage à imprimer simple. Un enfant de CP travaille la soustraction avec l'alphabet. Un enfant de CE1 résout des problèmes plus complexes avec écriture. Téléversez des photos d'objets de votre maison pour personnaliser. Les enfants soustraient leurs propres jouets, livres ou fruits familiers. Cette personnalisation rend l'apprentissage ultra-pertinent et engageant. Combinez mathématiques avec arts visuels grâce au coloriage. Les enfants colorient les images avant ou après calcul. Utilisez les fiches pour enseigner l'alphabet simultanément aux plus jeunes. Images de A à Z pour couvrir tout l'alphabet progressivement. Les exercices CE1 deviennent projets créatifs multi-âges. Créez des cahiers thématiques complets pour chaque semaine.`,
        quote: 'Je personnalise les fiches pour chaque enfant facilement.',
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Enseignants de Langues et Classes Bilingues',
        subtitle: 'Imprimables Gratuits Exercices Maths Multilingues Fiche Gratuite Apprendre à Lire',
        description: `Les enseignants de FLE et classes bilingues utilisent nos fiches différemment. Enseignez les mathématiques en français langue étrangère avec support visuel. Les images éliminent les barrières linguistiques pour apprendre les nombres. Les élèves comprennent la soustraction visuellement avant verbalement. Créez des exercices où les élèves nomment les images en français. Combinez calcul avec vocabulaire et apprendre à lire en français. Les 11 langues disponibles permettent de comparer les systèmes numériques. Créez la même fiche en français et langue maternelle des élèves. Cette approche comparative accélère la compréhension mathématique. Parfait pour les programmes d'immersion linguistique complète. Les exercices maths deviennent leçons de vocabulaire simultanément. Les élèves apprennent "pomme", "ballon", "étoile" en calculant. Utilisez nos fiches pour renforcer l'alphabet français avec images. Associez chaque lettre à des objets pour la soustraction.`,
        quote: 'Les mathématiques deviennent un outil d\'apprentissage linguistique.',
      },
      {
        id: '5',
        icon: '💜',
        title: 'Enseignants Spécialisés et ULIS',
        subtitle: 'Fiches Maternelle Différenciées Écriture Cursive Graphisme Maternelle Fiche',
        description: `Les enseignants spécialisés et coordonnateurs ULIS créent des fiches ultra-différenciées. Chaque élève reçoit des exercices parfaitement adaptés à son niveau. Réglez la difficulté de 2 à 20 selon les capacités individuelles. Commencez avec 2-5 pour les élèves ayant des difficultés importantes. Progressez graduellement vers 10-20 pour les élèves plus avancés. Intégrez des objectifs d'écriture dans vos exercices de soustraction. Les élèves tracent les chiffres avant de calculer pour renforcer l'écriture. Ajoutez des activités de graphisme pour développer la motricité fine. Les élèves relient les images avec des lignes décoratives. Cette approche multisensorielle aide les apprenants ayant des besoins spéciaux. Les images concrètes rendent les concepts abstraits accessibles. Parfaites pour les élèves dyspraxiques qui ont besoin de support visuel. Le mode "barrer des images" convient aux élèves dyscalculiques. Ils voient physiquement le processus de retirer des quantités.`,
        quote: 'La personnalisation répond à chaque besoin individuel.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Enseignants Entrepreneurs',
        subtitle: 'Fiches Gratuites Tables de Multiplication Exercices CP Fiche pour Enfants à Vendre',
        description: `Les enseignants qui vendent des ressources adorent notre licence commerciale. Créez des packs thématiques d'exercices CP pour Teachers Pay Teachers. Combinez soustraction avec d'autres compétences pour plus de valeur. Vendez "Pack Mathématiques Complet" avec addition et soustraction. Créez des cahiers progressifs de la maternelle au CE1. Ajoutez des pages de tables de multiplication pour les élèves avancés. Les tables de 2 et 3 s'intègrent bien avec soustraction jusqu'à 10. Créez des "Packs Saisonniers" avec images thématiques cohérentes. Automne, Halloween, Noël, Pâques, Été - chaque saison génère des ventes. Vendez sur Etsy des cahiers d'activités imprimables complets. Publiez sur Amazon KDP des livres d'exercices maths physiques. La qualité 300 DPI garantit une impression professionnelle parfaite. Créez votre marque de ressources pédagogiques françaises. Les enseignants français cherchent désespérément des ressources de qualité.`,
        quote: 'Mon abonnement s\'est rentabilisé dès le premier mois !',
      },
    ],
  },

  // Tips Section - SEO-optimized with target keywords
  tips: {
    sectionTitle: 'Conseils pour Créer des Fiches Maternelle de Soustraction - Graphisme, Coloriage et Alphabet',
    sectionDescription: 'Découvrez nos conseils professionnels pour créer des fiches de soustraction efficaces. Ces astuces vous aideront à maximiser l\'impact pédagogique de vos exercices maths.',
    badgeText: 'Conseils Pro',
    readMoreLabel: 'Lire la suite',
    showLessLabel: 'Voir moins',
    items: [
      {
        id: '1',
        icon: '📝',
        title: 'Fiches Gratuites pour Enfants avec Graphisme Maternelle Intégré',
        description: `Intégrez des éléments de graphisme maternelle dans vos fiches de soustraction pour développer la motricité fine. Ajoutez des lignes ondulées, des spirales et des tracés que les élèves complètent avant ou après les calculs. Cette approche multisensorielle renforce l'apprentissage et prépare les muscles de la main à l'écriture. Les fiches gratuites pour enfants combinant calcul et graphisme sont particulièrement efficaces pour les élèves de maternelle et de début de CP.`,
      },
      {
        id: '2',
        icon: '🎨',
        title: 'Imprimables Gratuits Combinant Coloriage à Imprimer et Exercices Maths',
        description: `Créez des imprimables gratuits qui associent exercices de soustraction et coloriage à imprimer. Demandez aux élèves de colorier les images après avoir résolu les problèmes. Cette technique augmente l'engagement et transforme les exercices maths en activités créatives. Le coloriage renforce également la concentration et offre une pause ludique entre les calculs.`,
      },
      {
        id: '3',
        icon: '📖',
        title: 'Fiche Gratuite pour Enfants Apprendre à Lire avec Images',
        description: `Utilisez vos fiches de soustraction comme support pour apprendre à lire. Étiquetez chaque image avec son nom et demandez aux élèves de lire les mots avant de calculer. Cette fiche gratuite pour enfants combine ainsi mathématiques et lecture. Les élèves qui apprennent à lire bénéficient du contexte visuel des images pour décoder les mots nouveaux.`,
      },
      {
        id: '4',
        icon: '✖️',
        title: 'Fiches Gratuites avec Tables de Multiplication pour Exercices CE1',
        description: `Pour les élèves de CE1 plus avancés, combinez soustraction et révision des tables de multiplication. Créez des problèmes à deux étapes comme "3 × 4 = 12, enlève 5, combien reste-t-il ?". Ces fiches gratuites avec tables de multiplication intégrées préparent les élèves aux opérations composées et renforcent la compréhension des relations mathématiques.`,
      },
      {
        id: '5',
        icon: '✏️',
        title: 'Fiche pour Maternelle avec Alphabet et Écriture Cursive',
        description: `Créez des fiches pour maternelle qui intègrent l'apprentissage de l'alphabet et l'écriture cursive. Sélectionnez des images dont les noms commencent par des lettres spécifiques. Les élèves pratiquent l'écriture cursive en écrivant les noms des objets ou les chiffres. Cette approche globale de la fiche pour maternelle développe simultanément plusieurs compétences essentielles.`,
      },
      {
        id: '6',
        icon: '📊',
        title: 'Fiche Gratuite Exercices CP avec Graphisme Maternelle',
        description: `Adaptez vos fiches pour le niveau CP en incluant des éléments de graphisme maternelle comme transition. Les élèves de CP bénéficient encore d'activités de motricité fine. Ajoutez des bordures décoratives à tracer et des lignes pour relier les réponses. Cette fiche gratuite exercices CP maintient l'aspect ludique tout en augmentant progressivement la difficulté mathématique.`,
      },
      {
        id: '7',
        icon: '🖨️',
        title: 'Imprimables Gratuits Fiches à Imprimer Gratuit pour Coloriage',
        description: `Optimisez vos imprimables gratuits en choisissant des images adaptées au coloriage. Sélectionnez des illustrations avec des contours nets et des zones colorables distinctes. Ces fiches à imprimer gratuit pour coloriage permettent aux élèves de personnaliser leur travail. Le coloriage des images de soustraction renforce la mémorisation visuelle des concepts mathématiques.`,
      },
    ],
  },

  // FAQ Section - FULL text from French subtraction.md Section 6
  faq: {
    sectionTitle: 'Questions Fréquentes Fiches Gratuites Soustraction - Exercices Maths Maternelle CP',
    sectionDescription: 'Les enseignants posent des questions similaires sur notre générateur de soustraction. Cette section répond aux questions les plus courantes sur graphisme maternelle, coloriage à imprimer, alphabet et écriture cursive.',
    showMoreText: 'Afficher plus de questions',
    showLessText: 'Afficher moins',
    badgeText: 'Questions Fréquentes',
    readMoreLabel: 'Lire la suite',
    showLessLabel: 'Voir moins',
    secureCheckout: 'Paiement sécurisé',
    cancelAnytime: 'Annulez à tout moment',
    items: [
      {
        id: '1',
        question: 'Ce générateur de soustraction est-il vraiment gratuit à utiliser ?',
        answer: 'Le générateur de soustraction nécessite un abonnement Accès Complet coûtant 240€ annuellement ou 25€ mensuellement. Votre abonnement vous donne création illimitée de fiches sans frais supplémentaires. Générez autant de fiches de soustraction que nécessaire sans charges additionnelles. Créez des exercices combinant mathématiques avec graphisme maternelle ou coloriage. L\'abonnement Accès Complet inclut 33 générateurs de fiches différents. Les 33 applications incluent tous types d\'exercices mathématiques et linguistiques. L\'abonnement Pack Essentiel coûte 144€ annuellement et inclut 10 générateurs populaires. L\'abonnement Accès Complet coûte 240€ annuellement et inclut tous les 33 générateurs. Les deux abonnements incluent licence commerciale, support 11 langues, et exports 300 DPI.',
      },
      {
        id: '2',
        question: 'Puis-je combiner soustraction avec graphisme maternelle et coloriage à imprimer pour fiches complètes ?',
        answer: 'Absolument. Combinez soustraction avec graphisme maternelle et coloriage à imprimer facilement. Générez votre fiche de soustraction puis ajoutez éléments de graphisme. Tracez des lignes décoratives autour des images pour pratique de graphisme maternelle. Ajoutez des formes à colorier entre les exercices de calcul. Créez des bordures que les élèves tracent pour développer motricité fine. Les fiches de coloriage à imprimer renforcent engagement des jeunes élèves. Combinez barrer des images avec colorier les images restantes. Cette approche multi-activités transforme mathématiques en projet créatif complet. Les élèves de maternelle adorent fiches combinant calcul et coloriage. Utilisez notre éditeur de canevas pour personnaliser complètement.',
      },
      {
        id: '3',
        question: 'Comment intégrer alphabet et apprendre à lire avec exercices de soustraction ?',
        answer: 'Intégrez alphabet et apprendre à lire naturellement avec images de soustraction. Sélectionnez images dont noms commencent par lettres de l\'alphabet ciblées. Enseignez "A comme Ananas" pendant que élèves soustraient des ananas. Cette méthode renforce reconnaissance de l\'alphabet visuellement et concrètement. Les élèves qui apprennent à lire étiquettent chaque image. Écrivez le nom de chaque objet sous l\'image correspondante. "Il y a 7 BALLONS, j\'en barre 3, reste 4 BALLONS." Cette phrase développe simultanément calcul et apprendre à lire. Créez exercices où élèves lisent histoire avant résoudre soustraction. Les problèmes mathématiques deviennent exercices de compréhension de lecture.',
      },
      {
        id: '4',
        question: 'Puis-je ajouter activités d\'écriture cursive et tables de multiplication aux fiches ?',
        answer: 'Oui. Ajoutez objectifs d\'écriture cursive et tables de multiplication facilement. Les élèves tracent chiffres en écriture cursive avant calculer. Ajoutez lignes pointillées pour pratiquer formation correcte des chiffres. Cette pratique d\'écriture cursive renforce mémorisation des nombres. Combinez soustraction avec révision des tables de multiplication pour élèves avancés. "Si 3 × 4 = 12, et j\'enlève 5, combien reste?" Créez fiches progressives commençant soustraction simple, ajoutant écriture cursive. Les élèves CP pratiquent écriture des chiffres 0-10 quotidiennement. Les tables de multiplication s\'intègrent naturellement avec soustraction pour CE1.',
      },
      {
        id: '5',
        question: 'Les fiches incluent-elles automatiquement activités de coloriage à imprimer ?',
        answer: 'Les fiches de soustraction n\'incluent pas automatiquement coloriage à imprimer intégré. Vous créez fiches de coloriage personnalisées selon vos besoins pédagogiques. Générez exercices de soustraction puis ajoutez instructions de coloriage. "Colorie les images restantes en rouge, les images barrées en bleu." Cette personnalisation crée fiches de coloriage à imprimer uniques. Ajoutez formes vides que élèves colorient après résoudre soustraction. Utilisez arrière-plans thématiques que élèves peuvent colorier partiellement. Les bordures décoratives deviennent aussi activités de coloriage. Cette flexibilité permet fiches de coloriage adaptées exactement à votre classe.',
      },
      {
        id: '6',
        question: 'Comment utiliser générateur pour enseigner alphabet en maternelle avec images ?',
        answer: 'Utilisez générateur pour enseigner alphabet en maternelle systématiquement et visuellement. Sélectionnez images représentant lettres de l\'alphabet séquentiellement. Semaine alphabet A : choisissez ananas, avion, arbre pour exercices. Les élèves associent lettre A avec objets commençant par A. Cette méthode visuelle renforce apprentissage de l\'alphabet concrètement. Créez cahier progressif couvrant tout l\'alphabet durant année scolaire. Chaque semaine introduit 1-2 lettres de l\'alphabet nouvelles. Les exercices de soustraction deviennent supports d\'apprentissage de l\'alphabet. Les élèves nomment objets tout en pratiquant calcul mental.',
      },
      {
        id: '7',
        question: 'Peut-on créer exercices avec graphisme maternelle intégré sur canevas ?',
        answer: 'Oui. Créez exercices avec graphisme maternelle intégré directement sur canevas. Après générer soustraction, utilisez outils de dessin pour ajouter graphisme. Tracez lignes pour que élèves relient images aux nombres. Créez chemins en pointillés que élèves tracent entre exercices. Le graphisme maternelle développe motricité fine essentielle pour écriture. Ajoutez formes géométriques que élèves repassent autour d\'images. Créez bordures décoratives combinant vagues, boucles, lignes droites. Cette pratique de graphisme maternelle prépare muscles de la main. Les activités de graphisme intégrées économisent temps de préparation.',
      },
      {
        id: '8',
        question: 'Les élèves peuvent-ils pratiquer écriture cursive simultanément avec soustraction ?',
        answer: 'Absolument. Les élèves pratiquent écriture cursive simultanément avec soustraction facilement. Ajoutez lignes d\'écriture cursive pour chaque chiffre de l\'exercice. Les élèves tracent "3" en écriture cursive avant calculer "8 - 3". Cette pratique d\'écriture cursive renforce formation correcte des chiffres. Créez modèles d\'écriture cursive que élèves copient sous exercices. Les chiffres 0-10 en écriture cursive deviennent automatiques avec pratique. Combinez apprentissage soustraction avec maîtrise de l\'écriture cursive. Cette approche multi-sensorielle aide mémorisation à long terme.',
      },
      {
        id: '9',
        question: 'Puis-je combiner soustraction avec tables de multiplication pour élèves avancés ?',
        answer: 'Oui. Combinez soustraction avec tables de multiplication pour élèves avancés effectivement. Créez problèmes à plusieurs étapes utilisant les deux opérations. "3 × 4 = 12 pommes, j\'en mange 5, combien reste?" Les tables de multiplication deviennent plus concrètes visuellement. Utilisez images pour représenter groupes dans tables de multiplication. 3 groupes de 4 pommes = 12 pommes visibles. Ensuite soustrayez pour renforcer lien entre opérations mathématiques. Cette approche aide élèves comprendre relations entre tables de multiplication et soustraction. Les élèves CE1 et CE2 bénéficient de cette intégration.',
      },
      {
        id: '10',
        question: 'Combien de temps faut-il pour créer fiche de soustraction complète ?',
        answer: 'Créer fiche de soustraction complète prend moins de 3 minutes. Sélection d\'images : 30-45 secondes avec recherche ou thème. Configuration paramètres : 15-20 secondes pour nombre exercices et difficulté. Génération fiche : instantanée, moins de 3 secondes. Édition personnalisation : 1-2 minutes selon modifications souhaitées. Téléchargement : 10-15 secondes pour fichier PDF ou JPEG. Total processus complet : 2-3 minutes du début au téléchargement. Comparez avec méthode traditionnelle prenant 30-60 minutes par fiche. Notre système économise 27-57 minutes par fiche créée.',
      },
      {
        id: '11',
        question: 'Puis-je vendre fiches avec graphisme maternelle et coloriage sur Teachers Pay Teachers ?',
        answer: 'Oui. Vendez fiches avec graphisme maternelle et coloriage sur Teachers Pay Teachers légalement. Votre abonnement Accès Complet inclut licence commerciale print-on-demand complète. Créez packs combinant soustraction, graphisme maternelle et coloriage à imprimer. Ces packs multi-activités se vendent exceptionnellement bien sur marketplaces. Les parents achètent cahiers combinant apprentissage et activités de coloriage. Ajoutez éléments de graphisme maternelle pour augmenter valeur pédagogique. Vendez "Cahiers de Vacances" avec mathématiques, graphisme et coloriage. Ces produits composites génèrent revenus supérieurs aux fiches simples. La licence commerciale couvre utilisation illimitée sans redevances par vente.',
      },
      {
        id: '12',
        question: 'Comment aider enfants à apprendre à lire avec images de soustraction ?',
        answer: 'Aidez enfants à apprendre à lire avec images de soustraction stratégiquement. Sélectionnez images représentant mots simples du vocabulaire de lecture. Les mots comme "chat", "ballon", "fleur" apparaissent fréquemment en lecture débutante. Les enfants qui apprennent à lire étiquettent chaque image verbalement. Demandez élèves lire à voix haute : "Sept BALLONS moins trois égale quatre BALLONS." Cette répétition orale renforce reconnaissance de mots pour apprendre à lire. Créez fiches où élèves écrivent nom de chaque objet. Cette écriture connecte lecture et orthographe simultanément. Les images fournissent contexte visuel aidant décodage pour apprendre à lire.',
      },
      {
        id: '13',
        question: 'Comment créer des fiches gratuites pour enfants avec graphisme maternelle ?',
        answer: 'Créez des fiches gratuites pour enfants avec graphisme maternelle en utilisant notre éditeur de canevas flexible. Après avoir généré votre fiche de soustraction, ajoutez des éléments de graphisme maternelle manuellement. Tracez des lignes ondulées entre les exercices pour que les élèves les repassent. Ajoutez des spirales et des boucles autour des images pour développer la motricité fine. Créez des chemins pointillés reliant les problèmes aux solutions. Les fiches gratuites pour enfants combinant calcul et graphisme maternelle sont particulièrement efficaces pour les petites sections. Cette approche multisensorielle transforme les exercices de soustraction en activités de développement global.',
      },
      {
        id: '14',
        question: 'Quels imprimables gratuits incluent coloriage à imprimer et exercices maths ?',
        answer: 'Nos imprimables gratuits peuvent facilement combiner coloriage à imprimer et exercices maths grâce à notre système flexible. Sélectionnez des images avec des contours nets adaptés au coloriage. Après génération, ajoutez des instructions comme "Colorie les images restantes en bleu". Les élèves résolvent d\'abord la soustraction puis colorient les images non barrées. Cette combinaison d\'exercices maths et coloriage à imprimer augmente l\'engagement des jeunes élèves. Les imprimables gratuits avec coloriage intégré sont parfaits pour les ateliers autonomes en maternelle et CP.',
      },
      {
        id: '15',
        question: 'Comment utiliser la fiche pour maternelle pour apprendre à lire ?',
        answer: 'Utilisez la fiche pour maternelle comme support pour apprendre à lire de manière intégrée. Sélectionnez des images dont les noms correspondent au niveau de lecture de vos élèves. Écrivez le nom de chaque objet sous l\'image correspondante sur la fiche pour maternelle. Les élèves lisent les mots avant de résoudre les problèmes de soustraction. Demandez-leur de répéter à voix haute "il y a sept BALLONS, j\'en barre trois". Cette méthode aide les enfants à apprendre à lire en contexte mathématique. La fiche pour maternelle devient ainsi un outil d\'apprentissage de la lecture et du calcul.',
      },
      {
        id: '16',
        question: 'Les fiches gratuites incluent-elles les tables de multiplication ?',
        answer: 'Les fiches gratuites de soustraction peuvent être combinées avec les tables de multiplication pour créer des exercices avancés. Pour les élèves de CE1 et CE2, créez des problèmes à deux étapes intégrant les tables de multiplication. Exemple : "3 × 4 = 12 étoiles, j\'en retire 5, combien reste-t-il ?". Les tables de multiplication deviennent plus concrètes avec des images visuelles. Les fiches gratuites combinant soustraction et tables de multiplication préparent les élèves aux problèmes composés. Cette intégration renforce la compréhension des relations entre opérations mathématiques.',
      },
      {
        id: '17',
        question: 'Comment ajouter l\'alphabet et l\'écriture cursive aux fiches à imprimer gratuit ?',
        answer: 'Ajoutez l\'alphabet et l\'écriture cursive à vos fiches à imprimer gratuit en utilisant notre éditeur de texte. Sélectionnez des images représentant des lettres de l\'alphabet spécifiques pour vos exercices. Utilisez l\'outil texte pour ajouter des modèles d\'écriture cursive des chiffres 0-10. Les élèves tracent les chiffres en écriture cursive avant de résoudre chaque problème. Créez des lignes d\'écriture sous chaque exercice pour pratiquer l\'alphabet et les chiffres. Les fiches à imprimer gratuit deviennent ainsi des outils complets d\'apprentissage de l\'écriture cursive et du calcul.',
      },
      {
        id: '18',
        question: 'La fiche gratuite pour enfants convient-elle aux exercices CE1 ?',
        answer: 'Oui, la fiche gratuite pour enfants s\'adapte parfaitement aux exercices CE1 grâce à nos paramètres de difficulté. Réglez le nombre maximum à soustraire jusqu\'à 20 pour les exercices CE1 avancés. Utilisez le mode "trouver le nombre soustrait" pour défier les élèves de CE1. La fiche gratuite pour enfants permet de créer des problèmes à trous adaptés au niveau CE1. Combinez avec des activités d\'écriture pour renforcer les compétences en rédaction. Les exercices CE1 peuvent inclure des problèmes à deux étapes en combinant plusieurs modes de soustraction sur une même fiche.',
      },
    ],
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

  // Related Apps - From French subtraction.md Section 7
  relatedApps: {
    sectionTitle: 'Combinez Soustraction avec Autres Apps - Alphabet, Graphisme Maternelle, Tables de Multiplication',
    sectionDescription: 'Votre abonnement Accès Complet inclut 33 générateurs différents. Combinez soustraction avec autres applications pour créer cahiers pédagogiques complets.',
    ctaTitle: 'Prêt à Créer des Fiches Exceptionnelles ?',
    ctaDescription: 'Rejoignez des milliers d\'enseignants qui créent des fiches professionnelles. Génération illimitée, licence commerciale incluse.',
    primaryCtaText: 'Commencer l\'Essai Gratuit',
    secondaryCtaText: 'Voir les 33 Applications',
    badgeText: 'Fonctionne Bien Avec',
    exploreText: 'Explorer toutes les applications',
    trustBadges: {      securePayment: 'Paiement sécurisé',
      cancelAnytime: 'Annulez à tout moment',
    },
    items: [
      {
        id: '1',
        slug: 'image-addition',
        name: 'Addition',
        category: 'Mathématiques',
        icon: '➕',
        description: 'Combinez générateurs de soustraction et addition pour progression mathématique complète. Créez cahiers où élèves pratiquent les deux opérations alternativement. Ajoutez éléments de graphisme maternelle entre chaque exercice mathématique.',
      },
      {
        id: '2',
        slug: 'math-worksheet',
        name: 'Fiches de Maths',
        category: 'Mathématiques',
        icon: '🔢',
        description: 'Créez des fiches mathématiques variées combinant soustraction avec autres opérations. Intégrez révision des tables de multiplication pour élèves avancés. Les élèves voient les relations entre opérations.',
      },
      {
        id: '3',
        slug: 'code-addition',
        name: 'Addition Codée',
        category: 'Mathématiques',
        icon: '🔐',
        description: 'Combinez apprentissage de l\'alphabet avec introduction aux tables de multiplication. Utilisez images d\'objets commençant par lettres de l\'alphabet spécifiques. Les élèves qui apprennent à lire étiquettent chaque objet verbalement.',
      },
      {
        id: '4',
        slug: 'coloring',
        name: 'Coloriage',
        category: 'Créativité',
        icon: '🎨',
        description: 'Créez cahiers complets combinant tables de multiplication, alphabet et écriture cursive. Chaque page présente problèmes avec images alphabétiques. Les élèves calculent puis écrivent réponses en écriture cursive.',
      },
      {
        id: '5',
        slug: 'drawing-lines',
        name: 'Tracer des Lignes',
        category: 'Motricité',
        icon: '✏️',
        description: 'Combinez cinq compétences essentielles dans cahiers multi-activités ultra-engageants. Les élèves apprennent à lire en étiquetant images pour exercices mathématiques. Chaque objet devient opportunité d\'apprentissage.',
      },
      {
        id: '6',
        slug: 'find-and-count',
        name: 'Cherche et Compte',
        category: 'Mathématiques',
        icon: '🔍',
        description: 'Intégrez graphisme maternelle comme fil conducteur à travers toutes activités. Commencez pages avec bordures de graphisme que élèves tracent. Lignes ondulées, spirales, zigzags deviennent cadres décoratifs pour exercices.',
      },
    ],
  },
};

export default subtractionFrContent;
