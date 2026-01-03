import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Math Worksheets - French Content
 *
 * File: frontend/content/product-pages/fr/math-worksheets.ts
 * URL: /fr/apps/exercices-maths-fiches
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/French/math-worksheet.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 *
 * CRITICAL: ALL UI labels MUST be in French - ZERO ENGLISH allowed
 */

export const mathWorksheetsFrContent: ProductPageContent = {
  // SEO Metadata - French language-specific
  seo: {
    slug: 'exercices-maths-fiches',
    appId: 'math-worksheet',
    title: 'Exercices Maths à Imprimer - Générateur Fiches Maternelle CP CE1',
    description: 'Créez des exercices maths avec notre générateur de fiches maternelle. Fiches à imprimer gratuit pour CP et CE1. Puzzles de décodage visuels. PDF 300 DPI. Licence commerciale incluse.',
    keywords: 'exercices maths, fiches maternelle, fiches à imprimer gratuit, exercices CP, exercices CE1, générateur fiches maths, puzzles mathématiques, calcul maternelle, graphisme maternelle, tables de multiplication, coloriage à imprimer, écriture cursive, apprendre à lire, alphabet maternelle',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fr/apps/exercices-maths-fiches',
  },

  // Hero Section - FULL text from math-worksheet.md paragraphs 1-6
  hero: {
    title: 'Exercices Maths à Imprimer - Générateur de Fiches Maternelle',
    subtitle: 'Créateur de Fiches à Imprimer Gratuit pour CP et CE1',
    description: `Créez des exercices maths professionnels avec notre générateur de fiches mathématiques. Votre abonnement Pack Essentiel à 144€ par an vous donne un accès illimité sans frais supplémentaires par fiche. Générez des fiches à imprimer gratuit parfaitement adaptées aux élèves de maternelle, CP et CE1. Téléchargez des PDF haute qualité en moins de trois minutes.

Notre créateur de fiches maths utilise un système unique de décodage par symboles. Chaque image représente un nombre secret que les élèves doivent découvrir. Les enfants analysent les équations visuelles pour trouver la valeur de chaque symbole. Cette approche développe le raisonnement logique et la pensée mathématique. Les fiches maternelle deviennent des énigmes passionnantes qui captivent les jeunes apprenants.

Le générateur crée des puzzles mathématiques avec 1 à 6 exercices par page. Choisissez parmi quatre niveaux de difficulté selon l'âge des élèves. Le mode très facile utilise seulement deux symboles pour les débutants. Le mode difficile présente quatre symboles pour les élèves avancés. Sélectionnez entre addition seule ou addition et soustraction combinées. Les exercices CP et exercices CE1 s'adaptent parfaitement aux programmes officiels français.

Ces fiches mathématiques fonctionnent idéalement pour les centres de numération et la pratique en autonomie. Les enseignants économisent des heures de préparation chaque semaine. Aucune compétence en design requise pour créer du matériel professionnel. Sélectionnez simplement vos paramètres, choisissez vos images et générez des fiches instantanément. Votre abonnement Pack Essentiel inclut une licence commerciale pour vendre vos créations sur Teachers Pay Teachers ou Etsy.`,
    previewImageSrc: '/samples/english/math worksheet/math worksheet portrait.jpeg',
    ctaLabels: {
      tryFree: 'Essai Gratuit',
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

  // Sample Gallery - REAL file paths from samples/english/math worksheet/
  samples: {
    sectionTitle: 'Exemples de Fiches',
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
        worksheetSrc: '/samples/english/math worksheet/math worksheet portrait.jpeg',
        answerKeySrc: '/samples/english/math worksheet/math worksheet portrait answer_key.jpeg',
        altText: 'Fiche exercices maths format portrait avec puzzles visuels pour maternelle',
        pdfDownloadUrl: '/samples/english/math worksheet/math worksheet portrait.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/english/math worksheet/math worksheet landscape.jpeg',
        answerKeySrc: '/samples/english/math worksheet/math worksheet landscape answer_key.jpeg',
        altText: 'Fiche exercices maths format paysage avec puzzles symboles',
        pdfDownloadUrl: '/samples/english/math worksheet/math worksheet landscape.pdf',
      },
    ],
  },

  // Features Grid - FULL descriptions from math-worksheet.md H3 sections
  features: {
    sectionTitle: 'Tout ce Dont Vous Avez Besoin pour Créer des Fiches à Imprimer Gratuit',
    sectionDescription: 'Notre générateur d\'exercices maths inclut sept fonctionnalités puissantes pour créer des fiches maternelle de qualité professionnelle. Votre abonnement Pack Essentiel vous donne accès à toutes les fonctionnalités avec création illimitée. Créez des fiches à imprimer gratuit personnalisées pour les besoins spécifiques de vos élèves. Chaque fonctionnalité travaille ensemble pour vous faire gagner du temps tout en produisant des exercices CP et exercices CE1 de haute qualité.',
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
        title: 'Créez des Exercices Maths en 3 Clics',
        description: 'Générez des exercices maths complets en moins de trois minutes. Sélectionnez un thème ou des images individuelles dans notre bibliothèque. Cliquez sur générer et votre fiche apparaît instantanément sur le canevas. Téléchargez en PDF ou JPEG et commencez à imprimer. Parfait pour les enseignants de maternelle très occupés qui ont besoin de fiches rapidement. Notre générateur crée des puzzles de décodage avec 1 à 6 exercices par page. Chaque image représente un nombre secret. Les élèves analysent les équations pour découvrir la valeur de chaque symbole. Quatre niveaux de difficulté s\'adaptent à tous les âges. Le mode très facile utilise deux symboles. Le mode difficile présente quatre symboles pour stimuler les élèves avancés. Choisissez entre addition seule ou addition et soustraction combinées. Définissez les valeurs minimum et maximum pour contrôler la difficulté. Activez ou désactivez les résultats négatifs selon vos objectifs. Chaque paramètre s\'ajuste pour correspondre exactement à votre programme de calcul et vos besoins pédagogiques.',
        highlighted: false,
      },
      {
        id: '2',
        icon: '✏️',
        title: 'Modifiez Tout sur Vos Fiches à Imprimer Gratuit',
        description: 'Votre abonnement Pack Essentiel inclut des capacités d\'édition complètes pour toutes les fiches maternelle. Chaque élément sur le canevas est entièrement modifiable. Cliquez sur n\'importe quel objet pour le sélectionner. Faites glisser pour déplacer les éléments. Redimensionnez en tirant les poignées de coin. Faites pivoter les objets à n\'importe quel angle. Supprimez les éléments indésirables instantanément. Ajoutez du texte personnalisé n\'importe où sur vos exercices maths. Choisissez parmi sept polices professionnelles adaptées aux enfants. Ajustez la taille de police selon vos besoins. Changez les couleurs du texte pour correspondre au thème de votre classe. Ajoutez des contours au texte pour une meilleure visibilité. Créez des titres et des instructions personnalisées. Les outils d\'alignement professionnels arrangent les objets avec précision. Alignez à gauche, au centre ou à droite. Alignez en haut, au milieu ou en bas. Centrez les objets sur la page horizontalement ou verticalement. Amenez les objets vers l\'avant ou envoyez-les vers l\'arrière. Verrouillez les objets en place une fois le positionnement parfait.',
        highlighted: false,
      },
      {
        id: '3',
        icon: '📤',
        title: 'Téléversez Vos Propres Images pour le Graphisme Maternelle',
        description: 'Téléversez des images personnalisées illimitées pour créer des fiches maternelle uniques. Utilisez des photos de classe ou des images correspondant à votre programme. Combinez les images téléversées avec notre bibliothèque de plus de 3000 illustrations. Acceptez tous les formats courants incluant JPEG, PNG et GIF. Téléversez plusieurs fichiers simultanément pour un flux de travail rapide. Créez des exercices maths présentant les personnages préférés de vos élèves. Utilisez des images de sorties scolaires ou de projets de classe. Associez les puzzles mathématiques aux thèmes ou unités en cours. Connectez le calcul à des objets réels que les élèves reconnaissent. Les images personnelles augmentent l\'engagement avec les activités de graphisme maternelle. Les images personnalisées fonctionnent parfaitement pour l\'enseignement différencié. Créez des exercices plus faciles avec des objets familiers pour les élèves en difficulté. Concevez des problèmes stimulants avec du nouveau vocabulaire pour les apprenants avancés. Soutenez les élèves qui commencent à apprendre à lire avec des visuels pertinents.',
        highlighted: false,
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Exercices Maths en 11 Langues',
        description: 'Votre abonnement inclut la création de fiches dans 11 langues. Générez des exercices maths en français, anglais, allemand, espagnol, portugais, italien, néerlandais, suédois, danois, norvégien ou finnois. Parfait pour les enseignants de FLE et les classes bilingues. Créez des fiches à imprimer gratuit correspondant à la langue maternelle de vos élèves. La langue de l\'interface change indépendamment de la langue du contenu. Enseignez en français tout en créant des fiches en anglais pour les élèves. Changez de langue instantanément sans perdre votre travail. Tous les boutons et libellés se traduisent automatiquement. Créez des fiches maternelle pour les classes multilingues avec facilité. Le support linguistique s\'étend à tous les éléments textuels des fiches. Personnalisez n\'importe quel texte pour correspondre aux objectifs d\'apprentissage. Parfait pour les programmes bilingues et l\'enseignement de l\'alphabet dans plusieurs langues. Soutenez les élèves qui apprennent les lettres et développent leurs compétences en lecture.',
        highlighted: false,
      },
      {
        id: '5',
        icon: '💰',
        title: 'Licence Commerciale Incluse',
        description: 'Votre abonnement Pack Essentiel inclut une licence commerciale print-on-demand complète. Vendez les exercices maths que vous créez sur Teachers Pay Teachers, Etsy ou Amazon KDP. Aucune attribution requise. Aucuns frais de licence supplémentaires. Créez des fiches maternelle et commencez à générer des revenus immédiatement. De nombreux enseignants gagnent entre 500€ et 5000€ par mois en vendant des fiches imprimables. Créez des lots de puzzles mathématiques thématiques pour différentes saisons. Concevez des fiches à imprimer gratuit pour des fêtes spécifiques. Assemblez des exercices CE1 par niveau de compétence. Combinez avec du coloriage à imprimer pour des packs éducatifs complets. Exportez les fiches en résolution professionnelle 300 DPI pour l\'impression commerciale. Téléchargez en PDF pour les ventes numériques ou en JPEG pour le print-on-demand. Créez des livres à faible contenu présentant vos exercices CP. Construisez un flux de revenus passifs tout en créant du matériel pédagogique.',
        highlighted: true,
      },
      {
        id: '6',
        icon: '🎨',
        title: 'Plus de 3000 Images pour Fiches Maternelle',
        description: 'Accédez à plus de 3000 images colorées organisées par thème. Parcourez les animaux, véhicules, nourriture, jouets, nature et des dizaines d\'autres catégories. Chaque image est adaptée aux enfants et parfaite pour les fiches maternelle. Recherchez par mot-clé pour trouver rapidement ce dont vous avez besoin pour vos activités de graphisme maternelle. L\'organisation thématique accélère la création d\'exercices maths. Sélectionnez le thème animaux pour les puzzles sur le zoo. Choisissez les images de nourriture pour les leçons de nutrition avec calcul. Utilisez les images saisonnières pour des fiches sur les fêtes. Changez de thème instantanément pour correspondre à n\'importe quel sujet de programme. Toutes les images de la bibliothèque sont incluses avec votre abonnement sans frais supplémentaires. Contrairement aux concurrents qui facturent par image, notre bibliothèque entière est disponible. Créez des exercices CP illimités en utilisant n\'importe quelle image. Économisez des centaines d\'euros par rapport à l\'achat de collections de cliparts individuelles.',
        highlighted: false,
      },
      {
        id: '7',
        icon: '🖨️',
        title: 'Qualité Professionnelle 300 DPI',
        description: 'Téléchargez des exercices maths en résolution professionnelle 300 DPI. Parfait pour l\'impression en classe et les ventes commerciales. Exportez en PDF pour un texte net et des images précises. Téléchargez en JPEG pour la compatibilité avec tous les appareils. Activez le mode niveaux de gris pour économiser l\'encre tout en maintenant la qualité. La qualité professionnelle compte pour les fiches maternelle et les exercices CE1. Les élèves voient des images claires et colorées qui engagent les apprenants visuels. Les parents apprécient les exercices maths de haute qualité envoyés à la maison. Les acheteurs commerciaux attendent des fiches imprimables de qualité premium. Vos fiches d\'écriture cursive auront un aspect professionnellement publié. Chaque exercice maths inclut une fiche de correction générée automatiquement. Téléchargez la fiche de correction séparément pour une notation rapide. Les fiches de correction correspondent exactement à la mise en page de la fiche élève. Gagnez du temps à vérifier le travail des élèves. Parfait pour les remplaçants ou les assistants aidant aux centres de mathématiques.',
        highlighted: true,
      },
    ],
  },

  // How-To Guide - FULL text from math-worksheet.md Step sections
  howTo: {
    sectionTitle: 'Comment Créer des Exercices Maths en 5 Étapes Faciles',
    sectionDescription: 'Créer des exercices maths professionnels prend moins de trois minutes avec notre générateur. Suivez ces cinq étapes simples pour produire des fiches maternelle et des exercices CP de qualité. Aucune expérience en design requise. Aucun logiciel compliqué à apprendre. Sélectionnez simplement vos options et générez des fiches à imprimer gratuit instantanément. Votre abonnement Pack Essentiel vous donne un accès illimité pour créer autant d\'exercices CE1 et de puzzles mathématiques que nécessaire.',
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
        title: 'Choisissez Vos Images pour les Exercices Maths',
        description: 'Commencez par sélectionner les images pour vos puzzles mathématiques. Parcourez plus de 3000 images adaptées aux enfants organisées par thème. Cliquez sur n\'importe quel thème pour voir toutes les images disponibles. Sélectionnez les animaux pour des exercices maths sur le thème du zoo. Choisissez les images de nourriture pour des activités de calcul sur la nutrition. Prenez les images saisonnières pour des fiches maternelle sur les fêtes. Recherchez des images spécifiques en utilisant la barre de recherche par mot-clé. Tapez « pomme » pour trouver les images de fruits parfaites pour les tables de multiplication visuelles. Cherchez « voiture » pour les illustrations de véhicules. Filtrez les résultats pour trouver exactement ce dont vous avez besoin. Cliquez sur les images individuelles pour les sélectionner. Les images sélectionnées apparaissent avec une bordure de mise en évidence. Téléversez vos propres images personnalisées pour des exercices maths uniques. Cliquez sur le bouton de téléversement et sélectionnez des fichiers images. Choisissez plusieurs fichiers pour téléverser plusieurs images simultanément. Utilisez des photos de classe ou des images spécifiques au programme. Combinez les images téléversées avec les images de la bibliothèque sur la même fiche pour préparer les élèves aux tables de multiplication.',
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Configurez les Paramètres de Calcul',
        description: 'Choisissez votre taille et orientation de page pour vos fiches à imprimer gratuit. Sélectionnez Lettre Portrait pour les fiches françaises standard. Prenez A4 Portrait pour l\'impression aux normes européennes. Utilisez le mode Paysage pour des mises en page de problèmes plus larges. Le format Carré fonctionne parfaitement pour les affichages numériques. L\'option de taille personnalisée est disponible pour les besoins spéciaux. Définissez le nombre d\'exercices par fiche selon les capacités des élèves. Choisissez de 1 à 6 puzzles de décodage par page. Moins d\'exercices conviennent mieux aux élèves de maternelle qui découvrent le calcul. Plus d\'exercices challengent les apprenants de CP et CE1. Ajustez selon le temps de travail disponible. Les exercices CP nécessitent généralement 3 à 4 puzzles par page. Sélectionnez le niveau de difficulté parmi quatre options. Le mode très facile utilise deux symboles pour les débutants en numération. Le mode facile convient aux élèves de grande section. Le mode moyen présente trois symboles pour les exercices CE1 standard. Le mode difficile utilise quatre symboles pour stimuler les élèves avancés travaillant vers les tables de multiplication. Configurez les valeurs minimum et maximum pour contrôler la plage de nombres. Définissez les deux sur de petits nombres pour le calcul débutant. Utilisez des plages plus larges pour les exercices maths avancés. Activez l\'option résultats négatifs pour les élèves prêts pour ce défi. Choisissez entre addition seule ou addition et soustraction combinées.',
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Générez Vos Fiches à Imprimer Gratuit',
        description: 'Cliquez sur le bouton Générer pour créer vos exercices maths. Le générateur construit les puzzles en quelques secondes. Des équations aléatoires apparaissent avec vos images sélectionnées. Les symboles colorés se placent selon vos paramètres. La fiche complète apparaît instantanément sur le canevas. Pas d\'attente ni de délais de traitement. L\'aperçu montre exactement ce que les élèves verront. Les puzzles s\'arrangent automatiquement avec un espacement optimal. Le générateur calcule la mise en page selon la taille de page. Plus de puzzles créent un espacement plus serré. Moins de puzzles s\'étalent pour une lecture plus facile. Chaque symbole représente un nombre secret. Les élèves analysent les équations pour décoder les valeurs. Les cases de réponse s\'alignent parfaitement pour les solutions. Régénérez si vous voulez des puzzles différents. Cliquez à nouveau sur Générer pour de nouvelles équations aléatoires. Les images changent à chaque génération. Les valeurs des symboles se randomisent dans vos paramètres. Créez des variations illimitées de fiches maternelle. Combinez avec du coloriage à imprimer pour des packs d\'activités complets. Le texte personnalisé ajouté par l\'utilisateur reste en place pendant la régénération.',
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Modifiez Vos Fiches Maternelle',
        description: 'Personnalisez chaque élément de vos exercices maths en utilisant les outils d\'édition du canevas. Cliquez sur n\'importe quel objet pour le sélectionner. Faites glisser les objets sélectionnés vers de nouvelles positions. Redimensionnez les images en tirant les poignées de coin. Faites pivoter les objets en utilisant la poignée de rotation. Les capacités d\'édition professionnelles transforment vos fiches en outils de graphisme maternelle complets. Ajoutez du texte personnalisé n\'importe où sur vos fiches maternelle. Cliquez sur le bouton Ajouter du Texte et tapez votre contenu. Créez des instructions pour les élèves qui commencent à apprendre à lire. Ajoutez des noms d\'enseignants ou des numéros de classe. Incluez des messages de motivation ou des thèmes. Personnalisez les exercices CP pour des élèves individuels. Intégrez des activités d\'alphabet pour renforcer l\'apprentissage des lettres. Formatez le texte en utilisant le panneau de propriétés. Choisissez parmi sept polices professionnelles adaptées aux enfants. Ajustez la taille de petite à grande selon les besoins de graphisme maternelle. Changez les couleurs pour correspondre aux thèmes de la classe. Ajoutez des contours au texte pour une meilleure visibilité sur les arrière-plans colorés. Soutenez les élèves qui apprennent à lire avec des polices claires et lisibles. Arrangez les objets en utilisant les outils d\'alignement professionnels. Sélectionnez plusieurs objets en cliquant tout en maintenant Shift. Alignez les éléments sélectionnés à gauche, au centre ou à droite. Centrez les objets sur la page pour des mises en page équilibrées. Les boutons Annuler et Rétablir corrigent les erreurs instantanément.',
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Téléchargez et Imprimez',
        description: 'Téléchargez vos exercices maths terminés comme imprimables professionnels. Choisissez le format PDF pour une impression nette et un partage facile. Sélectionnez le format JPEG pour une compatibilité maximale avec tous les appareils. Les deux formats s\'exportent en haute résolution 300 DPI. Qualité parfaite pour l\'impression en classe et les ventes commerciales. Combinez avec des fiches d\'écriture cursive pour des packs d\'apprentissage intégrés. Cliquez sur le menu déroulant Télécharger pour voir toutes les options disponibles. Télécharger Fiche PDF crée un document imprimable haute qualité. Télécharger Fiche de Correction PDF sauvegarde les solutions séparément. Les options JPEG fonctionnent de la même manière pour les exercices CE1. Téléchargez les deux versions pour créer des packs complets de fiches à imprimer gratuit. Activez le mode niveaux de gris avant de télécharger pour économiser l\'encre d\'imprimante. La case à cocher convertit toutes les couleurs en noir et blanc. Les images restent claires et reconnaissables pour le calcul. Le texte reste net et lisible. Parfait pour les écoles avec des contraintes budgétaires. Désactivez les niveaux de gris pour des fiches maternelle colorées qui engagent les jeunes apprenants. Ajoutez des activités d\'écriture pour un apprentissage complet. Les fichiers téléchargés s\'enregistrent immédiatement sur votre ordinateur. Les fichiers se nomment automatiquement avec le type de fiche et l\'horodatage. Organisez les exercices maths téléchargés dans des dossiers par unité ou semaine. Imprimez directement depuis le PDF. Téléversez vers les systèmes de gestion d\'apprentissage. Partagez avec les parents par email ou applications de classe. Créez des packs combinant calcul et écriture cursive pour un apprentissage multi-compétences.',
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL descriptions from math-worksheet.md persona sections
  useCases: {
    sectionTitle: 'Parfait pour les Enseignants et Éducateurs',
    sectionDescription: 'Les exercices maths de décodage par symboles bénéficient à de multiples contextes éducatifs. Les enseignants de maternelle utilisent les puzzles visuels pour introduire le raisonnement logique. Les professeurs de CP et CE1 renforcent les faits mathématiques avec une pratique stimulante. Les parents en instruction à domicile créent des exercices personnalisés pour leurs enfants. Les enseignants spécialisés adaptent les fiches aux besoins individuels. Les enseignants entrepreneurs vendent leurs créations sur les plateformes éducatives. Votre abonnement Pack Essentiel sert tous ces objectifs avec une seule inscription.',
    badgeText: 'Pour Qui',
    readMoreLabel: 'Lire la suite',
    showLessLabel: 'Voir moins',
    items: [
      {
        id: '1',
        icon: '👩‍🏫',
        title: 'Enseignants de Maternelle',
        subtitle: 'Fiches Maternelle pour le Graphisme et Apprendre à Lire',
        description: 'Les enseignants de maternelle ont besoin de matériel adapté qui développe le raisonnement logique précoce. Les exercices maths de décodage transforment les puzzles en jeux captivants. Les élèves de petite et moyenne section découvrent que chaque image représente un nombre. Les grandes sections analysent des équations plus complexes avec plusieurs symboles. Chaque fiche maternelle soutient le développement de la pensée mathématique. Les puzzles de décodage construisent les fondations essentielles pour les tables de multiplication futures. Les jeunes élèves apprennent à identifier des patterns et des relations entre nombres. Ils voient les connexions entre symboles visuels et valeurs numériques. Cette approche prépare les compétences algébriques précoces. Nos fiches maternelle fournissent une introduction ludique au raisonnement mathématique. Combinez les exercices maths avec des activités de graphisme maternelle pour un apprentissage intégré. Les élèves pratiquent la formation des chiffres après avoir résolu les puzzles. Créez des paquets de travail du matin mélangeant décodage et motricité fine. Soutenez les élèves qui commencent à apprendre à lire avec des visuels engageants. Votre abonnement inclut l\'accès à tous les générateurs pour créer du matériel coordonné.',
        quote: 'Mes élèves de maternelle adorent résoudre ces puzzles illustrés pendant les ateliers maths !',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Enseignants du Primaire CP CE1 CE2',
        subtitle: 'Exercices CP et Tables de Multiplication',
        description: 'Les professeurs de CP s\'appuient sur les exercices maths de décodage pour développer le raisonnement logique. Les élèves pratiquent l\'analyse d\'équations avec des symboles visuels. Le mode trouver la valeur développe la pensée algébrique précoce. Les fiches différenciées permettent à tous les niveaux de pratiquer de manière appropriée. Les exercices CP construisent les fondations nécessaires pour les mathématiques avancées. Les enseignants de CE1 utilisent les puzzles pour renforcer et étendre les compétences de calcul. Les élèves travaillent avec des équations plus complexes utilisant trois ou quatre symboles. Le décodage devient plus stimulant avec l\'addition et la soustraction combinées. Les fiches préparent les élèves pour les tables de multiplication en CE2. Les connexions entre opérations se développent naturellement. Les professeurs de CE2 intègrent les exercices maths de décodage comme préparation aux tables de multiplication. Les élèves voient les liens entre patterns numériques et multiplication. Créez des puzzles où les symboles représentent des produits de tables. Les exercices CE1 connectent les opérations de manière significative. Combinez avec des activités d\'alphabet et apprendre les lettres pour un apprentissage multimatières.',
        quote: 'Je différencie facilement en générant différents niveaux de difficulté pour chaque groupe.',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Parents en Instruction à Domicile',
        subtitle: 'Fiches à Imprimer Gratuit Personnalisées',
        description: 'Les parents en instruction à domicile apprécient la création rapide de puzzles personnalisés. Générez des exercices maths adaptés exactement au niveau de votre enfant. Créez des fiches de décodage avec des images correspondant aux intérêts de l\'enfant. Les dinosaures pour l\'enfant passionné de préhistoire. Les véhicules pour celui qui adore les transports. L\'engagement augmente quand le contenu résonne personnellement. Les familles en IEF utilisent les exercices maths comme pratique quotidienne stimulante. Le travail du matin commence avec quelques puzzles de décodage. Les exercices réguliers construisent le raisonnement logique sans ennui. Ajustez la difficulté au fur et à mesure que l\'enfant progresse. Créez des versions plus faciles pour les jours difficiles. Générez des défis supplémentaires quand l\'enfant excelle. La flexibilité personnalisée prépare aux tables de multiplication. Combinez les puzzles de décodage avec des activités d\'écriture pour un apprentissage intégré. Les élèves écrivent les solutions après avoir résolu les équations. Créez des fiches à imprimer gratuit alignées sur les unités d\'études. Intégrez des exercices d\'écriture cursive pour développer plusieurs compétences simultanément. L\'approche thématique rend les exercices maths significatifs et mémorables.',
        quote: 'Un seul abonnement couvre toute mon école à la maison avec des fiches personnalisées pour chaque enfant.',
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Enseignants de FLE et de Langues',
        subtitle: 'Fiches Maternelle Multilingues',
        description: 'Les enseignants de FLE utilisent les exercices maths pour l\'acquisition du vocabulaire numérique. Les élèves apprennent les mots numériques dans la langue cible tout en résolvant des puzzles. Un, deux, trois deviennent one, two, three ou eins, zwei, drei. Les instructions sur les fiches apparaissent dans la langue sélectionnée. Les élèves développent simultanément les compétences mathématiques et linguistiques. Les programmes bilingues ont besoin de matériel identique dans deux langues quotidiennement. Un enseignant de maternelle crée des exercices maths avec des images thématiques. La version française enseigne les nombres en français. La version anglaise utilise les mêmes puzzles avec des mots anglais. Les élèves des deux filières linguistiques reçoivent du matériel visuellement identique. Soutenez les élèves qui apprennent l\'alphabet et à lire dans plusieurs langues. Les écoles internationales servent des élèves parlant de nombreuses langues maternelles. Le support de 11 langues crée du matériel accessible pour tous. Les élèves reçoivent des fiches maternelle dans leur langue maternelle pendant qu\'ils apprennent le français. La transition progressive vers les fiches en français se fait quand les élèves sont prêts. Soutenez l\'acquisition linguistique tout en développant le raisonnement mathématique.',
        quote: 'Le format visuel aide mes élèves de FLE à réussir en maths sans barrières linguistiques.',
      },
      {
        id: '5',
        icon: '💜',
        title: 'Enseignants Spécialisés',
        subtitle: 'Exercices CE1 Différenciés',
        description: 'Les enseignants spécialisés ont besoin de matériel hautement personnalisable pour les objectifs individualisés. Les exercices maths de décodage s\'adaptent parfaitement aux besoins de chaque élève. Réduisez le nombre de symboles pour les élèves facilement submergés. Agrandissez les images pour les élèves avec des difficultés visuelles. Simplifiez les équations pour les élèves travaillant en dessous du niveau. Chaque paramètre s\'ajuste pour correspondre aux capacités individuelles. Les apprenants visuels réussissent avec les puzzles de décodage basés sur des images. Les élèves analysent des équations concrètes au lieu de problèmes abstraits. L\'approche visuelle réduit l\'anxiété mathématique et développe le graphisme maternelle. Les élèves avec dyscalculie bénéficient des représentations symboliques. Les exercices CE1 adaptés soutiennent les objectifs des PPS. Combinez avec du coloriage à imprimer pour des pauses sensorielles intégrées. Créez des séries de pratique répétitive pour le développement de la maîtrise. Générez plusieurs fiches avec les mêmes niveaux de difficulté. Les élèves pratiquent jusqu\'à l\'automaticité avec des puzzles similaires. Variez les images tout en gardant la complexité constante. La répétition avec nouveauté visuelle maintient l\'engagement. Les élèves développent la confiance sans frustration.',
        quote: 'Je peux rapidement adapter les fiches aux objectifs PPS de chaque élève.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Enseignants Entrepreneurs',
        subtitle: 'Vendez sur Teachers Pay Teachers et Etsy',
        description: 'Les enseignants entrepreneurs construisent des entreprises rentables en vendant des ressources éducatives. Les vendeurs Teachers Pay Teachers gagnent entre 500€ et 5000€ par mois avec du matériel de qualité. Les exercices maths de décodage se vendent régulièrement car ils offrent une approche unique. Votre abonnement Pack Essentiel inclut une licence commerciale complète. Créez et vendez sans frais de licence supplémentaires. Développez des lots de puzzles thématiques pour les ventes saisonnières. Les packs de rentrée en août et septembre. Les fiches d\'Halloween et d\'automne en octobre. Les ensembles de fêtes de fin d\'année en décembre. Chaque saison apporte de nouvelles opportunités de vente. Combinez les exercices maths avec du coloriage à imprimer pour des packs d\'activités complets et attractifs. Créez des ressources de programme complètes commandant des prix premium. Les packs de puzzles de décodage maternelle couvrant toute l\'année se vendent entre 15€ et 25€. Les ensembles préparatoires aux tables de multiplication pour CP et CE1 atteignent 20€. Ajoutez des fiches à imprimer gratuit comme échantillons pour attirer les clients. La qualité professionnelle 300 DPI justifie des prix plus élevés que les concurrents amateurs.',
        quote: 'J\'ai rentabilisé mon abonnement dès le premier mois en vendant des packs de fiches.',
      },
    ],
  },

  // FAQ Section - ALL 12 questions from math-worksheet.md
  faq: {
    sectionTitle: 'Questions Fréquentes',
    sectionDescription: 'Découvrez les réponses aux questions les plus posées sur notre générateur de puzzles mathématiques. Cette FAQ couvre les fonctionnalités, les prix et les utilisations pédagogiques. Trouvez rapidement les informations dont vous avez besoin pour créer des exercices de décodage efficaces. Apprenez comment optimiser l\'outil pour vos élèves et préparer les tables de multiplication avec des activités engageantes.',
    showMoreText: 'Afficher plus de questions',
    showLessText: 'Afficher moins',
    badgeText: 'FAQ',
    readMoreLabel: 'Lire la suite',
    showLessLabel: 'Voir moins',
    secureCheckout: 'Paiement sécurisé',
    cancelAnytime: 'Résiliez à tout moment',
    items: [
      {
        id: '1',
        question: 'Le générateur d\'exercices maths est-il vraiment gratuit ?',
        answer: 'Le générateur d\'exercices maths nécessite un abonnement Pack Essentiel coûtant 144€ par an ou 15€ par mois. Ce n\'est pas un générateur gratuit avec des fonctionnalités limitées. Votre abonnement vous donne une création illimitée de fiches maths sans frais par fiche. Générez des milliers de fiches maternelle par an pour un seul prix d\'abonnement fixe. Le terme « fiches à imprimer gratuit » fait référence au mot-clé de recherche utilisé par les enseignants, pas au générateur lui-même. Une fois abonné, créez des exercices illimités sans frais supplémentaires par fiche. Les concurrents facturant 1 à 3€ par fiche individuelle coûtent significativement plus cher pour les utilisateurs fréquents. Notre modèle d\'abonnement économise de l\'argent pour les enseignants créant régulièrement des fiches CP. Le Pack Essentiel inclut une licence commerciale valant 100 à 200€ par an avec d\'autres plateformes. Accédez à plus de 3000 images sans frais par image que d\'autres services facturent.',
      },
      {
        id: '2',
        question: 'Puis-je imprimer les exercices maths à la maison sur une imprimante ordinaire ?',
        answer: 'Oui, toutes les fiches maths fonctionnent parfaitement sur les imprimantes standard de maison et de classe. Téléchargez en fichiers PDF ou JPEG compatibles avec n\'importe quelle imprimante. Les fiches maternelle s\'impriment magnifiquement sur du papier Lettre ou A4 standard. Aucun équipement spécial nécessaire pour des exercices de qualité professionnelle. La résolution 300 DPI garantit un texte net et des images nettes sur les imprimantes ordinaires. Les fiches CP ont un aspect professionnellement publié quand elles sont imprimées sur du papier photocopie standard. Utilisez des imprimantes couleur pour des fiches vibrantes ou des imprimantes noir et blanc avec l\'option niveaux de gris. Activez le mode niveaux de gris avant de télécharger pour économiser l\'encre couleur coûteuse. Les fiches maternelle en noir et blanc fonctionnent tout aussi efficacement pour l\'apprentissage des élèves. Les élèves résolvent les mêmes puzzles maths que les fiches soient en couleur ou en niveaux de gris.',
      },
      {
        id: '3',
        question: 'Ai-je besoin de compétences en design pour créer des exercices maths ?',
        answer: 'Aucune expérience en design nécessaire pour créer des fiches maths professionnelles. Le générateur gère automatiquement toute la mise en page, le formatage et la création de puzzles. Sélectionnez vos préférences et cliquez sur générer pour des fiches maternelle instantanées. Les enseignants sans aucune compétence en design graphique créent de belles fiches en quelques minutes. L\'interface utilise des menus déroulants simples et des boutons pour tous les paramètres. Choisissez le niveau de difficulté, sélectionnez les images et générez des fiches avec des clics basiques. Aucune connaissance de logiciels de design comme Photoshop ou Illustrator requise. Les fiches CP apparaissent automatiquement formatées et prêtes à télécharger. Les outils d\'édition du canevas fonctionnent intuitivement avec une simplicité de glisser-déposer. Déplacez les éléments en cliquant et en faisant glisser comme déplacer des fichiers sur votre bureau. Aucun tutoriel nécessaire pour commencer à créer des fiches maths immédiatement. La plupart des enseignants génèrent leurs premières fiches maternelle avec succès en cinq minutes.',
      },
      {
        id: '4',
        question: 'Puis-je utiliser les exercices maths dans ma classe pour mes élèves ?',
        answer: 'Absolument, l\'abonnement Pack Essentiel couvre spécifiquement l\'utilisation en classe de toutes les fiches maths. Imprimez des copies illimitées pour tous vos élèves sans frais par élève. Utilisez les fiches maternelle pour l\'enseignement en classe entière, en petits groupes ou la pratique individuelle. Aucune restriction sur le nombre d\'élèves utilisant vos exercices. Partagez les fiches maths avec les collègues de votre établissement scolaire. Créez des fiches CP pour toute votre équipe de niveau. Collaborez sur des fiches maternelle thématiques pour des unités intégrées. Votre abonnement permet un partage généreux au sein de votre communauté éducative. Utilisez les fiches pour les devoirs, le travail en classe, les évaluations ou les activités de pratique. Plastifiez les fiches maths pour des matériaux de centre réutilisables. Affichez les fiches maternelle sur les murs de la classe comme référence. Incluez les exercices dans les pochettes à emporter pour la communication avec les parents.',
      },
      {
        id: '5',
        question: 'Dans quelles langues les exercices maths sont-ils disponibles ?',
        answer: 'Le générateur d\'exercices maths crée des fiches dans 11 langues. Choisissez français, anglais, allemand, espagnol, italien, portugais, néerlandais, danois, suédois, norvégien ou finnois. Tous les éléments de l\'interface se traduisent, y compris les boutons, les libellés et la numérotation des puzzles. Générez des fiches maternelle identiques dans plusieurs langues pour les programmes bilingues. Changez de langue instantanément en utilisant le sélecteur de langue. Créez des exercices du matin en anglais et des versions de l\'après-midi en espagnol. Les mêmes fiches maths fonctionnent dans les 11 langues avec des libellés traduits. Les fiches CP maintiennent un contenu identique à travers les langues pour un enseignement parallèle. Les libellés des puzzles se traduisent automatiquement pour correspondre à votre langue sélectionnée. « Puzzle » devient « Rompecabezas » en espagnol ou « Aufgabe » en allemand. Vos fiches maternelle utilisent la terminologie que les élèves comprennent dans leur langue maternelle.',
      },
      {
        id: '6',
        question: 'Puis-je vendre les exercices maths que je crée avec ce générateur ?',
        answer: 'Oui, le Pack Essentiel inclut une licence commerciale complète pour toutes les fiches maths créées. Vendez vos fiches maternelle sur Teachers Pay Teachers, Etsy, Amazon KDP ou votre propre site web. Aucuns frais de licence supplémentaires au-delà de votre abonnement annuel de 144€. Créez des exercices illimités pour la vente commerciale. La licence print-on-demand couvre à la fois les téléchargements numériques et les copies physiques imprimées. Vendez des fiches CP en PDF sur TpT ou des cahiers imprimés lors de conférences d\'enseignants. Listez les fiches maths sur plusieurs plateformes simultanément. Vos droits commerciaux sont complets et sans restriction. De nombreux enseignants gagnent entre 500€ et 5000€ par mois en vendant des fiches maternelle spécialisées créées avec notre générateur. Construisez des flux de revenus passifs grâce aux ventes d\'exercices. La licence commerciale seule vaut 100 à 200€ par an comparée aux concurrents. Votre abonnement se rentabilise grâce aux ventes de fiches.',
      },
      {
        id: '7',
        question: 'Comment personnaliser les exercices maths pour mes élèves ?',
        answer: 'Personnalisez chaque aspect des fiches maths avant et après la génération. Sélectionnez la difficulté de très facile à difficile pour la maternelle jusqu\'au CE2. Choisissez addition seule ou mélangez addition et soustraction. Définissez des plages de nombres personnalisées correspondant aux compétences de vos élèves. Sélectionnez de 1 à 6 puzzles par fiche. Choisissez des images thématiques parmi plus de 3000 options de la bibliothèque ou téléversez vos propres photos. Choisissez des arrière-plans et des bordures correspondant à vos unités. Ajoutez du texte personnalisé pour les noms d\'élèves, les dates ou les instructions. Chaque élément des fiches CP est modifiable après génération. Faites glisser les puzzles vers de nouvelles positions sur les fiches après création. Redimensionnez, faites pivoter ou supprimez les éléments qui ne conviennent pas. Changez les couleurs, les polices et les mises en page jusqu\'à ce que les fiches maternelle soient parfaites. Cette édition post-génération donne un contrôle sans précédent sur l\'apparence des fiches maths.',
      },
      {
        id: '8',
        question: 'Quels groupes d\'âge fonctionnent le mieux avec ces exercices maths ?',
        answer: 'Les fiches maths fonctionnent pour la maternelle jusqu\'au CE2, âges de 5 à 9 ans. La difficulté très facile convient à la petite section et au début de la maternelle utilisant les nombres 0 à 10. Les fiches maternelle faciles et moyennes conviennent aux élèves de CP pratiquant les nombres 0 à 20. La difficulté difficile challenge les élèves de CE1 et CE2 avec les nombres 0 à 50 ou plus. Ajustez les plages de nombres pour correspondre au niveau de développement de n\'importe quel élève. Créez des exercices simplifiés pour les élèves en éducation spécialisée utilisant les nombres 0 à 5. Générez des fiches CP stimulantes pour les élèves doués utilisant les nombres 0 à 100. La personnalisation flexible s\'adapte aux élèves travaillant plusieurs niveaux au-dessus ou en dessous de leur âge chronologique. Les adultes en FLE bénéficient de fiches maternelle simplifiées pour la pratique des nombres de base. Le format visuel ne semble pas enfantin malgré l\'utilisation de nombres simples. Les familles en école à la maison utilisent les fiches maths à travers plusieurs âges simultanément.',
      },
      {
        id: '9',
        question: 'Puis-je téléverser mes propres images dans les exercices maths ?',
        answer: 'Oui, téléversez des images personnalisées illimitées pour personnaliser les fiches maths. Cliquez sur « Choisir des fichiers » et sélectionnez plusieurs images depuis votre ordinateur. Le générateur accepte les formats JPEG, PNG et GIF. Les images téléversées apparaissent dans une zone d\'aperçu dédiée dans l\'interface de création de fiches maternelle. Cliquez sur les images téléversées pour les ajouter à votre pool de symboles pour les exercices. Combinez les images personnalisées avec les images de la bibliothèque dans les mêmes fiches. Téléversez des dessins d\'élèves, des photos de classe ou des images spécifiques au programme. Créez des fiches CP présentant des images significatives pour vos élèves spécifiques. Les enseignants téléversent des photos de manipulatifs de classe comme des oursons compteurs ou des blocs de base dix. Les élèves résolvent des puzzles utilisant les mêmes objets qu\'ils manipulent physiquement. Téléversez des mascottes d\'école, des points de repère locaux ou des décorations saisonnières pour des fiches maternelle thématiques. Cette personnalisation rend les fiches maths plus engageantes et pertinentes.',
      },
      {
        id: '10',
        question: 'Combien de temps faut-il pour créer un exercice maths ?',
        answer: 'Créer des fiches maths professionnelles prend moins de trois minutes du début au téléchargement. Sélectionnez la difficulté et les opérations en 30 secondes. Choisissez les images en 30 à 60 secondes selon la méthode de sélection. Générez instantanément en un clic. Personnalisez sur le canevas pendant 30 à 60 secondes. Téléchargez en 10 secondes. Temps total pour les fiches maternelle : 2 à 3 minutes. La création manuelle traditionnelle de fiches prend 30 à 60 minutes en utilisant des cliparts et des traitements de texte. Notre générateur économise 27 à 57 minutes par fiche. Les enseignants créent cinq fiches CP dans le temps que la création manuelle prend pour une seule. Générez une semaine complète de fiches en 15 minutes. La création par lots accélère encore le processus. Générez les fiches maternelle du lundi, téléchargez, générez la version du mardi, téléchargez, et continuez. Créez cinq fiches maths thématiques différentes en 10 à 12 minutes. Cette efficacité transforme la rapidité avec laquelle vous préparez les exercices pour votre classe.',
      },
      {
        id: '11',
        question: 'Les exercices maths incluent-ils des fiches de correction ?',
        answer: 'Oui, chaque fiche maths inclut une fiche de correction correspondante. Cliquez sur « Générer la Fiche de Correction » après avoir créé votre fiche. La fiche de correction montre des puzzles identiques avec les solutions remplies. Téléchargez les fiches maternelle et les fiches de correction séparément en fichiers PDF ou JPEG. Les fiches de correction apparaissent dans un onglet séparé de la fiche. Basculez entre les onglets pour comparer la fiche et les réponses. Modifiez les fiches de correction indépendamment si vous voulez un formatage différent. Les fiches CP et leurs fiches de correction maintiennent les mêmes images et la même mise en page. Imprimez les fiches de correction pour vous-même ou incluez-les avec les fiches à emporter. Les parents apprécient d\'avoir les fiches de correction pour vérifier le travail des élèves sur les exercices. Les remplaçants ont besoin des fiches de correction pour noter les fiches maternelle pendant votre absence. La fiche de correction séparée rend les fiches maths plus pratiques pour tous les utilisateurs.',
      },
      {
        id: '12',
        question: 'Puis-je créer des exercices maths sur des sujets scolaires spécifiques ?',
        answer: 'Oui, créez des fiches maths intégrées aux matières en utilisant des images thématiques. Générez des fiches avec des animaux marins pendant les unités de biologie marine. Utilisez des images de fruits pour des fiches maternelle sur le thème de la nutrition. Sélectionnez des images de véhicules pour les unités sur les transports. La bibliothèque de plus de 3000 images couvre des centaines de thèmes de matières. Téléversez des images spécifiques aux matières pour créer des exercices personnalisés sur n\'importe quel sujet. Vous enseignez le système solaire ? Téléversez des images de planètes pour des fiches CP sur le thème de l\'espace. Vous étudiez les métiers ? Téléversez des images de pompiers et de policiers. Créez des fiches connectant les maths aux sciences, aux études sociales ou aux sujets littéraires. L\'intégration interdisciplinaire rend les fiches maternelle plus significatives pour les élèves. La pratique des maths renforce le contenu des autres matières grâce à des fiches maths soigneusement choisies avec des thèmes. Les élèves apprennent les maths tout en révisant le vocabulaire scientifique grâce à des exercices bien choisis.',
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
      'Fiches de correction incluses',
    ],
    ctaText: 'Commencer Maintenant',
    guaranteeText: 'Garantie satisfait ou remboursé 30 jours',
  },

  // Related Apps
  relatedApps: {
    sectionTitle: 'Combinez avec d\'Autres Générateurs de Fiches',
    sectionDescription: 'Notre plateforme propose 33 générateurs de fiches différents au-delà des exercices maths. Combinez les fiches mathématiques avec des fiches de phonétique, d\'alphabet, de mots fréquents, de traçage et de coloriage pour des packs d\'apprentissage complets. Créez des lots de fiches CP thématiques couvrant plusieurs matières en utilisant les mêmes images. Les enseignants de maternelle construisent des unités intégrées en générant des exercices maths, des fiches ABC, des fiches de traçage de lettres et plus, tous correspondant au même thème. Votre abonnement Pack Essentiel inclut l\'accès à tous les types de fiches. Générez des fiches à imprimer gratuit illimitées couvrant lecture, maths, écriture et art. Cette approche complète crée des collections de fiches cohérentes que les élèves adorent.',
    ctaTitle: 'Prêt à Créer des Fiches Exceptionnelles ?',
    ctaDescription: 'Rejoignez les éducateurs qui créent des fiches professionnelles. Génération illimitée, licence commerciale incluse.',
    primaryCtaText: 'Commencer l\'Essai Gratuit',
    secondaryCtaText: 'Voir les 33 Applications',
    badgeText: 'Fonctionne Parfaitement Avec',
    exploreText: 'Explorer toutes les applications',
    trustBadges: {
      guarantee: 'Garantie satisfait ou remboursé 30 jours',
      securePayment: 'Paiement sécurisé',
      cancelAnytime: 'Résiliez à tout moment',
    },
    items: [
      {
        id: '1',
        slug: 'image-addition',
        name: 'Fiches Addition',
        category: 'Maths',
        icon: '➕',
        description: 'Combinez les exercices maths basés sur des images avec des fiches de phonétique pour des packs d\'apprentissage intégrés. Utilisez les mêmes images animales dans les exercices et les activités de phonétique. Les élèves résolvent des puzzles maths avec des ours, puis complètent des fiches de phonétique pratiquant le son « o » dans « ours ». Cette connexion thématique renforce à la fois les compétences en maths et en lecture à travers des fiches coordonnées.',
      },
      {
        id: '2',
        slug: 'alphabet-train',
        name: 'Train Alphabet',
        category: 'Éveil',
        icon: '🚂',
        description: 'Combinez les exercices maths avec des fiches d\'alphabet pour un apprentissage maternelle complet. Créez des packs thématiques présentant des exercices animaux plus des fiches ABC avec les mêmes animaux. Les élèves résolvent des puzzles maths, puis tracent des lettres de l\'alphabet sur des fiches correspondantes. Cette approche intégrée construit des connexions entre l\'apprentissage mathématique et la littératie.',
      },
      {
        id: '3',
        slug: 'coloring',
        name: 'Pages de Coloriage',
        category: 'Art & Créativité',
        icon: '🎨',
        description: 'Combinez les exercices maths avec des fiches de coloriage pour une pratique multi-compétences. Générez des exercices avec des images animales. Associez avec des fiches de coloriage animales utilisant des images identiques. Les élèves résolvent des puzzles maths sur les fiches, puis colorient les images correspondantes. Cette combinaison développe les compétences numériques et la motricité fine simultanément.',
      },
      {
        id: '4',
        slug: 'word-search',
        name: 'Mots Cachés',
        category: 'Français',
        icon: '🔍',
        description: 'Combinez les exercices maths avec des fiches de mots fréquents pour une pratique CP complète. Créez des exercices utilisant des images représentant des mots de haute fréquence. Générez des fiches de mots fréquents pratiquant le même vocabulaire. Les élèves construisent des connexions entre les maths visuels et la lecture à travers des fiches coordonnées.',
      },
      {
        id: '5',
        slug: 'math-puzzle',
        name: 'Puzzle Maths',
        category: 'Logique',
        icon: '🧩',
        description: 'Les fiches de puzzles maths challengent les élèves à appliquer les faits d\'addition dans des contextes de résolution de problèmes. Créez des packs de fiches de programme complets combinant exercices maths, fiches de phonétique, mots fréquents, alphabet, traçage et coloriage pour une couverture d\'apprentissage complète.',
      },
      {
        id: '6',
        slug: 'drawing-lines',
        name: 'Fiches de Traçage',
        category: 'Motricité Fine',
        icon: '✏️',
        description: 'Les fiches de traçage de lettres s\'associent naturellement avec les exercices maths basés sur des images pour le développement de la motricité fine. Le travail du matin commence avec des fiches de traçage pour activer les muscles de la main. Suivez avec des exercices nécessitant l\'écriture de nombres. Cette séquence construit des fiches d\'alphabet vers l\'écriture des nombres à travers des fiches CP coordonnées.',
      },
    ],
  },
};

export default mathWorksheetsFrContent;
