import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Addition Worksheets - French Content
 *
 * File: frontend/content/product-pages/fr/addition-worksheets.ts
 * URL: /fr/apps/addition-fiches (French SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/French/addition.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const additionFrContent: ProductPageContent = {
  // SEO Metadata - French language-specific
  seo: {
    slug: 'addition-fiches',
    appId: 'image-addition',
    title: 'Fiches d\'Addition à Imprimer Gratuit | Générateur d\'Exercices Maths pour Maternelle et CP',
    description: 'Créez des fiches d\'addition professionnelles avec notre générateur d\'exercices maths. Parfait pour les enseignants de maternelle, CP et CE1. Téléchargez des fiches à imprimer gratuit en PDF haute qualité en moins de trois minutes.',
    keywords: 'fiches addition, exercices maths, fiches maternelle, fiches à imprimer gratuit, exercices CP, exercices CE1, addition avec images, générateur fiches, mathématiques maternelle, calcul visuel',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fr/apps/addition-fiches',
  },

  // Hero Section - FULL text from addition.md paragraphs 1-4
  hero: {
    title: 'Générateur de Fiches d\'Addition Gratuit',
    subtitle: 'Fiches à Imprimer Gratuit pour la Maternelle et le CP',
    description: `Créez des fiches d'addition professionnelles avec notre générateur d'exercices maths. Votre abonnement Pack Essentiel à 144€ par an vous donne un accès illimité sans frais supplémentaires par fiche. Générez des fiches à imprimer gratuit parfaitement adaptées aux élèves de maternelle, CP et CE1. Téléchargez des PDF haute qualité en moins de trois minutes.

Notre créateur de fiches d'addition utilise des images colorées pour enseigner les concepts mathématiques fondamentaux. Les jeunes élèves comptent des objets visuels avant d'écrire leurs réponses. Choisissez parmi quatre modes d'exercices différents. Le mode image plus image montre des dessins pour les deux nombres. Le mode image plus nombre combine images et chiffres. Le mode trouver l'addend crée des problèmes à trous. Le mode mixte mélange différents types sur une même fiche.

Les fiches maternelle deviennent des outils pédagogiques attrayants avec notre générateur. Chaque fiche inclut automatiquement une fiche de correction pour gagner du temps de vérification. Configurez de 1 à 10 problèmes par page selon le niveau des élèves. Ajustez les nombres minimum et maximum pour contrôler la difficulté. Les exercices CP et exercices CE1 s'adaptent parfaitement aux programmes officiels français.`,
    previewImageSrc: '/samples/english/addition/addition_worksheet portrait.jpeg',
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

  // Sample Gallery - REAL file paths from samples/english/addition/
  samples: {
    sectionTitle: 'Exemples de Fiches d\'Addition',
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
        worksheetSrc: '/samples/english/addition/addition_worksheet portrait.jpeg',
        answerKeySrc: '/samples/english/addition/addition_answer_key portrait.jpeg',
        altText: 'Fiche d\'addition en format portrait avec images colorées pour la maternelle et le CP',
        pdfDownloadUrl: '/samples/english/addition/addition_worksheet portrait.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/english/addition/addition_worksheet landscape.jpeg',
        answerKeySrc: '/samples/english/addition/addition_answer_key landscape.jpeg',
        altText: 'Fiche d\'addition en format paysage avec problèmes visuels pour les exercices maths',
        pdfDownloadUrl: '/samples/english/addition/addition_worksheet landscape.pdf',
      },
      {
        id: '3',
        worksheetSrc: '/samples/english/addition/image and number.jpeg',
        answerKeySrc: '/samples/english/addition/image and number answer_key.jpeg',
        altText: 'Fiche d\'addition mode image plus nombre combinant illustrations et chiffres',
        pdfDownloadUrl: '/samples/english/addition/image and number.pdf',
      },
      {
        id: '4',
        worksheetSrc: '/samples/english/addition/find addend.jpeg',
        answerKeySrc: '/samples/english/addition/find addend answer_key.jpeg',
        altText: 'Fiche d\'addition mode trouver l\'addend avec problèmes à trous pour le CP',
        pdfDownloadUrl: '/samples/english/addition/find addend.pdf',
      },
      {
        id: '5',
        worksheetSrc: '/samples/english/addition/mixed mode.jpeg',
        answerKeySrc: '/samples/english/addition/mixed mode answer_key.jpeg',
        altText: 'Fiche d\'addition mode mixte mélangeant différents types de problèmes',
        pdfDownloadUrl: '/samples/english/addition/mixed mode.pdf',
      },
    ],
  },

  // Features Grid - FULL text from addition.md feature sections
  features: {
    sectionTitle: 'Fonctionnalités du Générateur d\'Addition - Tout pour Créer des Fiches Maternelle et des Exercices Maths Professionnels',
    sectionDescription: 'Notre générateur de fiches d\'addition inclut sept fonctionnalités puissantes pour créer des fiches maternelle et des exercices CP de qualité professionnelle. Votre abonnement Pack Essentiel vous donne accès à toutes les fonctionnalités avec création illimitée.',
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
        title: 'Créez des Fiches d\'Addition en 3 Clics',
        description: `Générez des fiches d'addition complètes en moins de trois minutes. Sélectionnez un thème ou des images individuelles dans notre bibliothèque. Cliquez sur générer et votre fiche apparaît instantanément sur le canevas. Téléchargez en PDF ou JPEG et commencez à imprimer. Parfait pour les enseignants de maternelle et les professeurs de CP très occupés qui ont besoin de fiches maternelle rapidement.

Notre générateur crée des fiches avec 1 à 10 problèmes d'addition par page. Choisissez parmi quatre modes d'exercices différents. Le mode image plus image montre des dessins pour les deux nombres à additionner. Le mode image plus nombre combine des illustrations avec des chiffres. Le mode trouver l'addend crée des problèmes à trous stimulants. Le mode mixte mélange différents types de problèmes sur une même fiche pour varier la pratique.

Chaque fiche d'addition inclut des champs optionnels pour le nom et la date de l'élève. Affichez ou masquez le signe plus entre les groupes d'images. Incluez des numéros d'exercices pour une référence facile. Utilisez des cases adaptées aux enfants pour les réponses ou ajoutez des lignes d'écriture.`,
        highlighted: false,
      },
      {
        id: '2',
        icon: '✏️',
        title: 'Modifiez Tout sur Vos Exercices Maths',
        description: `Votre abonnement Pack Essentiel inclut des capacités d'édition complètes pour toutes les fiches maternelle et exercices CE1. Chaque élément sur le canevas est entièrement modifiable. Cliquez sur n'importe quel objet pour le sélectionner. Faites glisser pour déplacer. Redimensionnez en tirant les poignées de coin. Faites pivoter les objets à n'importe quel angle. Supprimez les éléments indésirables en un clic.

Ajoutez du texte personnalisé n'importe où sur vos fiches d'addition. Choisissez parmi sept polices professionnelles. Ajustez la taille de police de minuscule à très grande. Changez les couleurs du texte pour correspondre au thème de votre classe. Ajoutez des contours au texte pour une meilleure visibilité. Créez des titres, des instructions ou des noms d'élèves. Parfait pour personnaliser les exercices maths pour chaque élève individuellement.

Les outils d'alignement professionnels arrangent les objets avec précision. Alignez à gauche, au centre ou à droite. Alignez en haut, au milieu ou en bas. Centrez les objets sur la page horizontalement ou verticalement. Amenez les objets vers l'avant ou envoyez-les vers l'arrière.`,
        highlighted: false,
      },
      {
        id: '3',
        icon: '📤',
        title: 'Téléversez Vos Propres Images',
        description: `Téléversez des images personnalisées illimitées pour créer des fiches maternelle personnalisées. Utilisez des photos de classe, des œuvres d'élèves ou des images correspondant à votre programme. Combinez les images téléversées avec notre bibliothèque de plus de 3000 illustrations. Acceptez tous les formats courants incluant JPEG, PNG et GIF. Téléversez plusieurs fichiers à la fois pour un flux de travail plus rapide.

Créez des fiches d'addition présentant les personnages préférés de vos élèves ou les animaux de la classe. Utilisez des images de sorties scolaires ou de leçons de sciences. Associez les exercices maths aux thèmes ou unités en cours. Connectez la pratique de l'addition à des objets réels que les élèves reconnaissent. Les images personnelles augmentent l'engagement des élèves avec les activités mathématiques.

Les images personnalisées fonctionnent parfaitement pour l'enseignement différencié. Créez des fiches d'addition plus faciles avec des objets familiers pour les élèves en difficulté. Concevez des problèmes stimulants avec du nouveau vocabulaire pour les apprenants avancés.`,
        highlighted: false,
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Support de 11 Langues',
        description: `Votre abonnement inclut la création de fiches dans 11 langues. Générez des fiches d'addition en français, anglais, allemand, espagnol, portugais, italien, néerlandais, suédois, danois, norvégien ou finnois. Parfait pour les enseignants de FLE, les classes bilingues et les écoles internationales. Créez des exercices maths correspondant à la langue maternelle de vos élèves.

La langue de l'interface change indépendamment de la langue du contenu des fiches. Enseignez en français tout en créant des fiches d'addition en anglais pour les élèves. Changez de langue instantanément sans perdre votre travail. Tous les boutons, libellés et instructions se traduisent automatiquement.

Le support linguistique s'étend à tous les éléments textuels des fiches. Les mots numériques apparaissent dans la langue sélectionnée. Les instructions se traduisent automatiquement. Personnalisez n'importe quel texte pour correspondre aux objectifs spécifiques d'apprentissage des langues.`,
        highlighted: false,
      },
      {
        id: '5',
        icon: '💰',
        title: 'Licence Commerciale Disponible',
        description: `Votre abonnement Pack Essentiel inclut une licence commerciale print-on-demand. Vendez les exercices maths que vous créez sur Teachers Pay Teachers, Etsy ou Amazon KDP. Aucune attribution requise. Aucuns frais de licence supplémentaires. Créez des fiches d'addition et commencez à générer des revenus immédiatement.

De nombreux enseignants gagnent entre 500€ et 5000€ par mois en vendant des fiches imprimables en ligne. Créez des lots de fiches d'addition thématiques pour différentes saisons. Concevez des fiches maternelle pour des fêtes spécifiques. Assemblez des exercices CE1 par niveau de compétence. Votre abonnement se rentabilise quand vous vendez seulement quelques ensembles de fiches.

Exportez les fiches en résolution professionnelle 300 DPI pour l'impression commerciale. Téléchargez en PDF pour les ventes numériques ou en JPEG pour le print-on-demand. Créez des livres à faible contenu présentant vos fiches d'addition. Construisez un flux de revenus passifs tout en créant du matériel dont vous avez déjà besoin pour enseigner.`,
        highlighted: true,
      },
      {
        id: '6',
        icon: '🎨',
        title: 'Bibliothèque de 3000+ Images',
        description: `Accédez à plus de 3000 images colorées organisées par thème. Parcourez les animaux, véhicules, nourriture, jouets, nature et des dizaines d'autres catégories. Chaque image est adaptée aux enfants et parfaite pour les fiches maternelle et les activités d'exercices CP. Recherchez par mot-clé pour trouver rapidement ce dont vous avez besoin.

L'organisation thématique accélère la création de fiches d'addition. Sélectionnez le thème animaux pour le vocabulaire du zoo. Choisissez les images de nourriture pour les leçons de nutrition avec pratique de l'addition. Utilisez les images saisonnières pour des fiches maternelle sur les fêtes. Changez de thème instantanément pour correspondre à n'importe quel sujet de programme.

Toutes les images de la bibliothèque sont incluses avec votre abonnement sans frais supplémentaires. Contrairement aux concurrents qui facturent par image ou par ensemble de cliparts, notre bibliothèque entière est disponible. Créez des fiches d'addition illimitées en utilisant n'importe quelle image.`,
        highlighted: false,
      },
      {
        id: '7',
        icon: '🖨️',
        title: 'Qualité Professionnelle 300 DPI',
        description: `Téléchargez des fiches d'addition en résolution professionnelle 300 DPI. Parfait pour l'impression en classe et les ventes commerciales. Exportez en PDF pour un texte net et des images précises. Téléchargez en JPEG pour la compatibilité avec tous les appareils. Activez le mode niveaux de gris pour économiser l'encre de l'imprimante tout en maintenant la qualité.

La qualité professionnelle compte pour les fiches maternelle et les exercices CE1. Les élèves voient des images claires et colorées qui engagent les apprenants visuels. Les parents apprécient les exercices maths de haute qualité envoyés à la maison. Les acheteurs commerciaux attendent des fiches imprimables de qualité premium.

Chaque fiche d'addition inclut une fiche de correction générée automatiquement. Téléchargez la fiche de correction séparément pour une notation rapide. Les fiches de correction correspondent exactement à la mise en page de la fiche. Gagnez du temps à vérifier le travail des élèves.`,
        highlighted: true,
      },
    ],
  },

  // How-To Guide - FULL text from addition.md step sections
  howTo: {
    sectionTitle: 'Comment Créer des Fiches d\'Addition en 5 Étapes Faciles',
    sectionDescription: 'Créer des fiches d\'addition professionnelles prend moins de trois minutes avec notre générateur. Suivez ces cinq étapes simples pour produire des fiches maternelle et des exercices CP de qualité. Aucune expérience en design requise.',
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
        title: 'Sélectionnez les Images',
        description: `Commencez par choisir les images pour vos exercices maths. Parcourez plus de 3000 images adaptées aux enfants organisées par thème. Cliquez sur n'importe quel thème pour voir toutes les images disponibles. Sélectionnez les animaux pour des fiches d'addition sur le thème du zoo. Choisissez les images de nourriture pour des activités mathématiques sur la nutrition. Prenez les images saisonnières pour des fiches maternelle sur les fêtes.

Recherchez des images spécifiques en utilisant la barre de recherche par mot-clé. Tapez « pomme » pour trouver les images de fruits. Cherchez « voiture » pour les illustrations de véhicules. Filtrez les résultats pour trouver exactement ce dont vous avez besoin. Cliquez sur les images individuelles pour les sélectionner. Les images sélectionnées apparaissent avec une bordure de mise en évidence.

Téléversez vos propres images personnalisées pour des exercices maths uniques. Cliquez sur le bouton de téléversement et sélectionnez des fichiers images. Utilisez des photos de classe ou des images spécifiques au programme. Combinez les images téléversées avec les images de la bibliothèque sur la même fiche.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Configurez les Paramètres',
        description: `Choisissez votre taille et orientation de page. Sélectionnez Lettre Portrait pour les fiches françaises standard. Prenez A4 Portrait pour l'impression aux normes européennes. Utilisez le mode Paysage pour des mises en page de problèmes plus larges. Le format Carré fonctionne parfaitement pour les affichages numériques.

Définissez le nombre de problèmes d'addition par fiche. Choisissez de 1 à 10 problèmes selon les capacités des élèves. Moins de problèmes conviennent mieux aux élèves de maternelle. Plus de problèmes challengent les apprenants de CP et CE1. Ajustez le nombre de problèmes pour correspondre au temps de travail disponible.

Configurez les éléments minimum et maximum par groupe. Définissez les deux sur de petits nombres pour l'addition débutante. Utilisez des plages plus larges pour les exercices CE1 avancés. Le générateur crée des problèmes aléatoires dans votre plage spécifiée. Sélectionnez votre mode d'exercice parmi quatre options.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Générez la Fiche',
        description: `Cliquez sur le bouton Générer pour créer vos fiches d'addition. Le générateur construit les problèmes en quelques secondes. Des faits d'addition aléatoires apparaissent dans vos plages spécifiées. Des images colorées se placent selon vos sélections. La fiche complète apparaît instantanément sur le canevas. Pas d'attente ni de délais de traitement. L'aperçu montre exactement ce que les élèves verront.

Les problèmes s'arrangent automatiquement avec un espacement optimal. Le générateur calcule la mise en page selon la taille de page. Plus de problèmes créent un espacement plus serré. Moins de problèmes s'étalent pour une lecture plus facile. Les numéros d'exercices apparaissent sur la gauche. Les groupes d'images s'affichent avec des signes plus entre eux.

Régénérez si vous voulez des problèmes différents. Cliquez à nouveau sur Générer pour de nouveaux faits d'addition aléatoires. Les images changent à chaque génération. La fiche de correction se génère simultanément avec chaque fiche.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Personnalisez le Contenu',
        description: `Personnalisez chaque élément de vos fiches d'addition en utilisant les outils d'édition du canevas. Cliquez sur n'importe quel objet pour le sélectionner. Faites glisser les objets sélectionnés vers de nouvelles positions. Redimensionnez les images en tirant les poignées de coin. Faites pivoter les objets en faisant glisser la poignée de rotation.

Ajoutez du texte personnalisé n'importe où sur vos exercices maths. Cliquez sur le bouton Ajouter du Texte et tapez votre contenu. Créez des instructions pour les élèves. Ajoutez des noms d'enseignants ou des numéros de classe. Incluez des messages de motivation ou des thèmes. Personnalisez les fiches maternelle pour des élèves individuels.

Formatez le texte en utilisant le panneau de propriétés du texte. Choisissez parmi sept polices professionnelles. Ajustez la taille de petite à grande. Changez les couleurs pour correspondre aux thèmes de la classe. Les boutons Annuler et Rétablir corrigent les erreurs instantanément.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Téléchargez et Imprimez',
        description: `Téléchargez vos fiches d'addition terminées comme imprimables professionnels. Choisissez le format PDF pour une impression nette et un partage facile. Sélectionnez le format JPEG pour une compatibilité maximale. Les deux formats s'exportent en haute résolution 300 DPI. Qualité parfaite pour l'impression en classe et les ventes commerciales.

Cliquez sur le menu déroulant Télécharger pour voir toutes les options. Télécharger Fiche (PDF) crée un document imprimable. Télécharger Fiche de Correction (PDF) sauvegarde les solutions séparément. Les options JPEG fonctionnent de la même manière. Téléchargez les deux versions pour créer des packs complets.

Activez le mode niveaux de gris avant de télécharger pour économiser l'encre. La case à cocher convertit toutes les couleurs en noir et blanc. Les images restent claires et reconnaissables. Parfait pour les écoles avec des contraintes budgétaires.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from addition.md use case sections
  useCases: {
    sectionTitle: 'Parfait pour les Enseignants et les Parents',
    sectionDescription: 'Les fiches d\'addition bénéficient à de multiples contextes éducatifs. Les enseignants de maternelle utilisent les images visuelles pour introduire les concepts de comptage. Les professeurs de CP et CE1 renforcent les faits d\'addition avec une pratique répétée.',
    badgeText: 'Pour Qui',
    readMoreLabel: 'Lire la suite',
    showLessLabel: 'Voir moins',
    items: [
      {
        id: '1',
        icon: '👶',
        title: 'Enseignants de Maternelle',
        subtitle: 'Créez des Fiches Maternelle et du Graphisme Maternelle pour les Petits',
        description: `Les enseignants de maternelle ont besoin de matériel adapté à l'âge qui rend l'apprentissage des mathématiques visuel et concret. Les fiches d'addition avec images permettent aux enfants de compter des objets familiers. Les élèves de petite et moyenne section additionnent des pommes, des ballons ou des animaux. Les grandes sections progressent vers des combinaisons de nombres plus complexes. Chaque fiche maternelle soutient le développement des compétences de numération précoce.

Les fiches d'addition visuelles construisent les fondations mathématiques essentielles. Les jeunes élèves comptent des groupes d'images avant d'écrire des réponses numériques. Ils voient les relations entre quantités et symboles. L'approche concrète-imagée-abstraite commence avec des objets réels et des images. Nos fiches fournissent la phase imagée de cette progression.

Combinez les fiches d'addition avec des activités de graphisme maternelle pour un apprentissage intégré. Les élèves pratiquent la formation des chiffres tout en résolvant des problèmes d'addition. Créez des paquets de travail du matin mélangeant mathématiques et motricité fine.`,
        quote: 'Mes élèves adorent compter les images colorées !',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Enseignants du Primaire',
        subtitle: 'Fiches pour Exercices CP et Préparation aux Tables de Multiplication',
        description: `Les professeurs de CP s'appuient sur les fiches d'addition pour développer l'automaticité des faits mathématiques. Les élèves pratiquent les combinaisons de nombres jusqu'à 10 de manière répétée. Le mode trouver l'addend développe la pensée algébrique précoce. Les fiches différenciées permettent à tous les niveaux de pratiquer de manière appropriée. Les exercices CP construisent la fluidité nécessaire pour les mathématiques avancées.

Les enseignants de CE1 utilisent les fiches d'addition pour renforcer et étendre les compétences. Les élèves travaillent avec des sommes jusqu'à 20 et au-delà. Le mode mixte offre une pratique variée en une seule fiche. Les connexions entre addition et soustraction se développent naturellement. Les fiches préparent les élèves pour les tables de multiplication en CE2.

Les professeurs de CE2 intègrent les fiches d'addition dans la pratique des tables de multiplication. Les élèves voient les liens entre addition répétée et multiplication. Créez des fiches montrant comment 3+3+3 devient 3×3. Les exercices maths connectent les opérations de manière significative.`,
        quote: 'L\'addition répétée prépare parfaitement la multiplication.',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Parents en Instruction à Domicile',
        subtitle: 'Fiches à Imprimer Gratuit pour Exercices Maths Personnalisés',
        description: `Les parents en instruction à domicile apprécient la création rapide de fiches personnalisées. Générez des exercices maths adaptés exactement au niveau de votre enfant. Créez des fiches d'addition avec des images correspondant aux intérêts de l'enfant. Les dinosaures pour l'enfant passionné de préhistoire. Les véhicules pour celui qui adore les transports. L'engagement augmente quand le contenu résonne personnellement.

Les familles en IEF utilisent les fiches d'addition comme pratique quotidienne structurée. Le travail du matin commence avec quelques problèmes d'addition. Les exercices maths réguliers construisent l'automaticité sans épuisement. Ajustez la difficulté au fur et à mesure que l'enfant progresse. Créez des versions plus faciles pour les jours difficiles. Générez des défis supplémentaires quand l'enfant excelle.

Combinez les fiches d'addition avec des activités d'écriture pour un apprentissage intégré. Les élèves écrivent les mots numériques après avoir résolu les problèmes. Créez des paquets thématiques alignés sur les unités d'études.`,
        quote: 'Je peux adapter les fiches au niveau exact de mon enfant.',
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Enseignants de FLE',
        subtitle: 'Exercices Maths Multilingues en 11 Langues',
        description: `Les enseignants de FLE utilisent les fiches d'addition pour l'acquisition du vocabulaire mathématique. Les élèves apprennent les mots numériques dans la langue cible. Un, deux, trois deviennent one, two, three ou eins, zwei, drei. Les instructions sur les fiches apparaissent dans la langue sélectionnée. Les élèves développent simultanément les compétences mathématiques et linguistiques.

Les programmes bilingues ont besoin de matériel identique dans deux langues. Créez des fiches d'addition en français pour le lundi. Générez les mêmes problèmes en anglais pour le mardi. Les élèves voient les concepts mathématiques à travers les langues. La cohérence renforce l'apprentissage. Le sélecteur de langue change tout instantanément.

Les écoles internationales servent des élèves parlant de nombreuses langues maternelles. Le support de 11 langues crée du matériel accessible pour tous. Les élèves reçoivent des fiches d'addition dans leur langue maternelle pendant qu'ils apprennent le français.`,
        quote: 'Les mathématiques deviennent un outil d\'apprentissage linguistique.',
      },
      {
        id: '5',
        icon: '💜',
        title: 'Enseignants Spécialisés',
        subtitle: 'Fiches Maternelle Adaptées pour Besoins Spécifiques',
        description: `Les enseignants spécialisés ont besoin de matériel hautement personnalisable pour les objectifs individualisés. Les fiches d'addition s'adaptent parfaitement aux besoins de chaque élève. Réduisez le nombre de problèmes pour les élèves facilement submergés. Agrandissez les images pour les élèves avec des difficultés visuelles. Simplifiez les plages de nombres pour les élèves travaillant en dessous du niveau.

Les apprenants visuels réussissent avec les fiches d'addition basées sur des images. Les élèves comptent des objets concrets au lieu de symboles abstraits. L'approche visuelle réduit l'anxiété mathématique. Les élèves avec dyscalculie bénéficient des représentations imagées des nombres. Les fiches maternelle adaptées soutiennent les objectifs des PPS.

Créez des séries de pratique répétitive pour le développement de la maîtrise. Générez plusieurs fiches avec les mêmes plages de nombres. Les élèves pratiquent jusqu'à l'automaticité avec des problèmes similaires. Variez les images tout en gardant les nombres constants.`,
        quote: 'La personnalisation répond à chaque besoin individuel.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Enseignants Entrepreneurs',
        subtitle: 'Vendez vos Créations sur Teachers Pay Teachers',
        description: `Les enseignants entrepreneurs construisent des entreprises rentables en vendant des ressources éducatives. Les vendeurs Teachers Pay Teachers gagnent entre 500€ et 5000€ par mois avec du matériel de qualité. Les fiches d'addition se vendent régulièrement toute l'année à tous les niveaux. Votre abonnement Pack Essentiel inclut une licence commerciale complète.

Développez des lots de fiches d'addition thématiques pour les ventes saisonnières. Les packs de rentrée en août et septembre. Les fiches d'Halloween et d'automne en octobre. Les ensembles de fêtes de fin d'année en décembre. Chaque saison apporte de nouvelles opportunités de vente.

Créez des ressources de programme complètes commandant des prix premium. Les packs de fiches d'addition maternelle couvrant toute l'année se vendent entre 15€ et 25€. Les ensembles de fluence d'addition CP avec des dizaines de fiches atteignent 20€. La qualité professionnelle 300 DPI justifie des prix plus élevés.`,
        quote: 'Mon abonnement s\'est rentabilisé dès le premier mois !',
      },
    ],
  },

  // FAQ Section - Selected FAQs from addition.md
  faq: {
    sectionTitle: 'Questions Fréquentes',
    sectionDescription: 'Questions fréquentes sur notre générateur de fiches d\'addition et nos fiches à imprimer gratuit.',
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
        question: 'Ce Générateur de Fiches d\'Addition Est-Il Vraiment Gratuit pour les Fiches Maternelle ?',
        answer: 'Le générateur d\'addition offre une version gratuite avec des limitations. Vous pouvez créer des fiches d\'addition illimitées avec un filigrane. Le filigrane apparaît sur chaque fiche téléchargée. Les comptes gratuits permettent uniquement l\'usage personnel en classe. Les enseignants impriment des fiches maternelle pour leurs propres élèves sans restrictions. La version gratuite inclut les plus de 3000 images et les 11 langues. Vous obtenez des capacités d\'édition complètes et des téléchargements professionnels 300 DPI. L\'abonnement Pack Essentiel supprime complètement le filigrane. L\'abonnement coûte 144€ par an ou 15€ par mois.',
      },
      {
        id: '2',
        question: 'Puis-Je Imprimer les Fiches d\'Addition à la Maison pour les Exercices CP ?',
        answer: 'Les fiches d\'addition s\'impriment parfaitement sur des imprimantes domestiques standard. N\'importe quelle imprimante jet d\'encre ou laser produit des résultats clairs. La résolution 300 DPI assure des images et des chiffres nets. Imprimez sur du papier standard A4 ou format lettre. Aucun papier ou paramètre spécial requis. L\'impression en couleur et en noir et blanc fonctionne parfaitement. Sélectionnez la taille de page appropriée lors de la génération des fiches. Les exercices CP s\'impriment avec une clarté parfaite à chaque fois.',
      },
      {
        id: '3',
        question: 'Ai-Je Besoin de Compétences en Design pour Créer des Exercices Maths ?',
        answer: 'Absolument aucune compétence en design n\'est requise pour créer des fiches d\'addition. Le générateur gère automatiquement toute la mise en page et le formatage. Sélectionnez des images, configurez les paramètres et cliquez sur générer. L\'application crée des exercices maths professionnels en quelques secondes. Les enseignants sans expérience en design produisent du matériel de qualité immédiatement. Les outils d\'édition fonctionnent intuitivement par clic et glisser-déposer. La plupart des enseignants créent leur première fiche en moins de cinq minutes.',
      },
      {
        id: '4',
        question: 'Quelles Langues Sont Disponibles pour les Fiches d\'Addition ?',
        answer: 'Les fiches d\'addition supportent 11 langues complètes. Français, anglais, allemand, espagnol, portugais, italien, néerlandais, danois, suédois, norvégien et finnois. L\'interface utilisateur et le contenu des fiches fonctionnent dans la langue sélectionnée. Les instructions et les mots numériques apparaissent dans votre langue choisie. Le support de 11 langues bénéficie à de multiples contextes d\'enseignement. Un abonnement couvre les 11 langues de manière illimitée.',
      },
      {
        id: '5',
        question: 'Puis-Je Vendre les Fiches d\'Addition sur Teachers Pay Teachers ?',
        answer: 'Vendre des fiches d\'addition nécessite un abonnement Pack Essentiel. La version gratuite avec filigrane interdit entièrement l\'usage commercial. Le Pack Essentiel coûte 144€ par an et inclut une licence commerciale complète. Cette licence permet de vendre sur toutes les plateformes sans frais supplémentaires. Teachers Pay Teachers, Etsy et Amazon KDP sont tous des usages commerciaux permis. Aucune attribution requise sur les produits commerciaux. Votre marque apparaît exclusivement sur les produits finis.',
      },
      {
        id: '6',
        question: 'Les Fiches d\'Addition Incluent-Elles des Fiches de Correction ?',
        answer: 'Chaque fiche d\'addition inclut une fiche de correction générée automatiquement. Cliquez sur l\'onglet fiche de correction pour voir la solution. Les réponses correctes apparaissent clairement sur la fiche de correction. Téléchargez la fiche de correction séparément en JPEG ou PDF. Les deux formats maintiennent la qualité professionnelle 300 DPI. Les fiches de correction aident les enseignants à vérifier rapidement le travail des élèves. Les fiches de correction correspondent exactement à la mise en page de la fiche élève.',
      },
      {
        id: '7',
        question: 'Quels Groupes d\'Âge Conviennent aux Fiches d\'Addition ?',
        answer: 'Les fiches d\'addition fonctionnent excellemment pour les âges de 4 à 10 ans. Les préscolaires de 4-5 ans utilisent des fiches avec uniquement des images pour compter. Les maternelles de 5-6 ans travaillent avec des combinaisons de petits nombres. Les CP de 6-7 ans pratiquent les faits d\'addition jusqu\'à 10. Les CE1 de 7-8 ans gèrent des additions jusqu\'à 20. Les CE2 de 8-9 ans utilisent des fiches pour maintenir la fluence. Ajustez la difficulté via les paramètres de plage de nombres.',
      },
      {
        id: '8',
        question: 'Combien de Temps Faut-Il pour Créer une Fiche d\'Addition ?',
        answer: 'Créer une fiche d\'addition prend moins de trois minutes du début à la fin. Sélectionnez un thème ou des images spécifiques en 30 secondes. Configurez les paramètres en 30 secondes. Cliquez sur générer et voyez les résultats en 5 secondes. Vérifiez la fiche pendant 30 secondes. Faites les modifications souhaitées en une minute. Téléchargez la fiche terminée en 15 secondes. Le temps total moyen est de deux à trois minutes par fiche.',
      },
      {
        id: '9',
        question: 'Puis-Je Téléverser Mes Propres Images pour des Fiches Personnalisées ?',
        answer: 'Téléversez des images personnalisées illimitées pour des fiches d\'addition personnalisées. Cliquez sur le bouton de téléversement pour sélectionner des fichiers depuis votre ordinateur. Choisissez plusieurs images simultanément. Les formats JPEG, PNG et GIF fonctionnent tous parfaitement. Les images téléversées apparaissent immédiatement dans votre session. Combinez les téléversements personnalisés avec les images de la bibliothèque librement. Les enseignants téléversent des photos d\'objets de classe pour un vocabulaire pertinent.',
      },
      {
        id: '10',
        question: 'Comment Différencier les Fiches pour Différents Niveaux ?',
        answer: 'La différenciation se fait facilement avec les paramètres de configuration. Pour les élèves débutants, définissez des petites plages de nombres de 1 à 5. Utilisez le mode image plus image pour un support visuel maximal. Incluez seulement 3 à 4 problèmes par page pour éviter la surcharge. Pour les élèves avancés, augmentez les plages de nombres. Utilisez le mode trouver l\'addend pour développer la pensée algébrique. Incluez 8 à 10 problèmes par page pour plus de défi. La flexibilité des paramètres permet une différenciation précise.',
      },
    ],
  },

  // Pricing
  pricing: {
    title: 'Pack Essentiel',
    price: '144€',
    priceInterval: '/an',
    priceSuffix: 'Facturation annuelle',
    benefits: [
      'Création de fiches illimitée',
      'Licence commerciale incluse',
      '11 langues supportées',
      '3000+ images thématiques',
      'Qualité d\'impression 300 DPI',
      'Corrigés inclus',
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
    sectionTitle: 'Combinez avec d\'Autres Générateurs de Fiches',
    sectionDescription: 'Créez des paquets d\'apprentissage complets en combinant les fiches d\'addition avec ces générateurs complémentaires.',
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
    items: [
      {
        id: '1',
        slug: 'subtraction',
        name: 'Soustraction',
        category: 'Mathématiques',
        icon: '➖',
        description: 'Complétez l\'addition avec la soustraction pour une pratique mathématique équilibrée. Les élèves voient les opérations inverses naturellement.',
      },
      {
        id: '2',
        slug: 'math-worksheet',
        name: 'Fiches de Maths',
        category: 'Mathématiques',
        icon: '🔢',
        description: 'Créez des fiches mathématiques variées combinant addition, soustraction et autres opérations sur une même page.',
      },
      {
        id: '3',
        slug: 'code-addition',
        name: 'Addition Codée',
        category: 'Mathématiques',
        icon: '🔐',
        description: 'Ajoutez du défi avec des puzzles d\'addition codée où les élèves déchiffrent des messages en résolvant des problèmes.',
      },
      {
        id: '4',
        slug: 'chart-count',
        name: 'Graphiques et Comptage',
        category: 'Mathématiques',
        icon: '📊',
        description: 'Développez les compétences de graphiques et de comptage qui renforcent la compréhension numérique pour l\'addition.',
      },
      {
        id: '5',
        slug: 'coloring',
        name: 'Coloriage',
        category: 'Créativité',
        icon: '🎨',
        description: 'Récompensez les fiches d\'addition terminées avec des pages de coloriage thématiques qui développent la motricité fine.',
      },
      {
        id: '6',
        slug: 'find-and-count',
        name: 'Cherche et Compte',
        category: 'Mathématiques',
        icon: '🔍',
        description: 'Développez les compétences de comptage avec des activités de recherche visuelle préparant aux concepts d\'addition.',
      },
    ],
  },
};

export default additionFrContent;
