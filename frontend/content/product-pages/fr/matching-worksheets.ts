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
    title: 'Fiches d\'Association | Fiches Maternelle et Exercices CP pour Apprendre à Lire',
    description: 'Créez des fiches d\'association professionnelles avec notre générateur MatchUp Maker. Votre abonnement Pack Essentiel vous donne un accès illimité à la création de fiches maternelle personnalisées. Téléchargez des fichiers PDF haute qualité en moins de 3 minutes.',
    keywords: 'fiches association, fiches maternelle, exercices CP, fiches à imprimer gratuit, apprendre à lire, fiches alphabet, graphisme maternelle, exercices maths, apprendre les lettres, coloriage à imprimer, écriture cursive, tables de multiplication',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fr/apps/association-fiches',
    images: [
      {
        url: 'https://www.lessoncraftstudio.com/samples/french/matching/sample-1.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Fiche d\'association gratuite - exercice image vers lettre pour maternelle'
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/french/matching/sample-2.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Fiche d\'association gratuite - exercice image et mot pour CP'
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/french/matching/sample-3.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Fiche d\'association gratuite - vocabulaire personnalisé pour enfants'
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/french/matching/sample-4.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Fiche d\'association gratuite - graphisme maternelle et reconnaissance des lettres'
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/french/matching/sample-5.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Fiche d\'association gratuite - fiches maternelle pour apprendre à lire'
      }
    ],
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
    sectionTitle: 'Exemples de Fiches d\'Association',
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
        worksheetSrc: '/samples/french/matching/sample-1.jpeg',
        answerKeySrc: '/samples/french/matching/sample-1-answer.jpeg',
        altText: 'Fiche d\'association gratuite fiches maternelle - exercice image vers lettre pour apprendre les lettres',
        pdfDownloadUrl: '/samples/french/matching/sample-1.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/french/matching/sample-2.jpeg',
        answerKeySrc: '/samples/french/matching/sample-2-answer.jpeg',
        altText: 'Fiche d\'association gratuite exercices CP - association image et mot pour apprendre à lire',
        pdfDownloadUrl: '/samples/french/matching/sample-2.pdf',
      },
      {
        id: '3',
        worksheetSrc: '/samples/french/matching/sample-3.jpeg',
        answerKeySrc: '/samples/french/matching/sample-3-answer.jpeg',
        altText: 'Fiche d\'association gratuite fiches pour enfants - vocabulaire personnalisé et exercices maths',
        pdfDownloadUrl: '/samples/french/matching/sample-3.pdf',
      },
      {
        id: '4',
        worksheetSrc: '/samples/french/matching/sample-4.jpeg',
        answerKeySrc: '/samples/french/matching/sample-4-answer.jpeg',
        altText: 'Fiche d\'association gratuite graphisme maternelle - reconnaissance des lettres et alphabet',
        pdfDownloadUrl: '/samples/french/matching/sample-4.pdf',
      },
      {
        id: '5',
        worksheetSrc: '/samples/french/matching/sample-5.jpeg',
        answerKeySrc: '/samples/french/matching/sample-5-answer.jpeg',
        altText: 'Fiche d\'association gratuite fiches à imprimer - coloriage à imprimer et exercices CP',
        pdfDownloadUrl: '/samples/french/matching/sample-5.pdf',
      },
    ],
  },

  // Features Grid - FULL text from matching.md feature sections
  features: {
    sectionTitle: 'Fonctionnalités MatchUp Maker - Tout ce qu\'il Faut pour Créer des Fiches Maternelle et Exercices CP',
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
    items: [
      {
        id: '1',
        icon: '⚡',
        title: 'Créez des Fiches Maternelle en 3 Clics - Fiches à Imprimer Gratuit pour Toutes les Matières',
        description: `Générez des fiches d'association complètes en moins de trois minutes du début au téléchargement. Choisissez votre mode d'association parmi quatre options. Sélectionnez vos images dans notre bibliothèque de plus de 3000 éléments ou téléchargez les vôtres. Cliquez sur générer et votre fiche apparaît instantanément sur le canevas. Aucune compétence en design requise pour des fiches maternelle professionnelles.

Notre génération en un clic fonctionne pour tous les types de fiches. Créez des fiches alphabet où les élèves associent images et premières lettres. Construisez des activités pour apprendre à lire en associant images et sons. Concevez des exercices maths reliant nombres et représentations visuelles. Générez des fiches de lecture connectant mots et images. Réalisez des exercices CP d'addition associant problèmes et réponses. Tous les types de fiches d'association utilisent le même processus simple en trois clics.`,
        highlighted: false,
      },
      {
        id: '2',
        icon: '🎯',
        title: 'Quatre Modes d\'Association pour Fiches Alphabet et Exercices Maths - Apprendre les Lettres Facilement',
        description: `Choisissez parmi quatre modes d'association différents pour correspondre à vos objectifs pédagogiques. Chaque mode crée des fiches maternelle et des exercices CE1 variés pour différents apprentissages.

Le mode Image vers Première Lettre crée des fiches alphabet parfaites pour la reconnaissance des lettres. Les élèves associent les images à la première lettre de chaque mot. Pomme s'associe à P, ballon s'associe à B. Idéal pour apprendre les lettres et développer la conscience phonologique.

Le mode Image Plus Mot construit des fiches de reconnaissance et de mémoire. Les deux colonnes montrent des images avec les mots en dessous. Les élèves associent les paires identiques. Parfait pour le renforcement du vocabulaire et la discrimination visuelle.

Le mode Image ou Mot crée les fiches d'association les plus flexibles. Choisissez si chaque élément s'affiche comme image ou mot. Mélangez et combinez pour des exercices CE1 différenciés.

Le mode Image vers Mot Personnalisé construit des fiches de vocabulaire pour toutes les matières. Associez images à définitions, traductions ou phrases personnalisées.`,
        highlighted: true,
      },
      {
        id: '3',
        icon: '✏️',
        title: 'Modifiez Tout sur Vos Fiches - Exercices CP et Fiches Maternelle Entièrement Personnalisables',
        description: `Chaque élément de votre fiche d'association est entièrement modifiable sur le canevas. Cliquez sur n'importe quelle image pour la déplacer, la redimensionner ou la faire pivoter. Faites glisser les éléments textuels n'importe où sur la page. Supprimez les éléments dont vous n'avez pas besoin. Ajoutez des instructions personnalisées pour les élèves. Changez les couleurs pour correspondre au thème de votre classe.

La modification complète fonctionne pour toutes les fiches à imprimer gratuit. Personnalisez les fiches alphabet avec des images plus grandes pour les plus jeunes élèves. Ajustez les activités pour apprendre à lire selon les apprenants visuels. Modifiez les exercices maths pour mettre en valeur des concepts spécifiques. Personnalisez les fiches d'addition avec des objets familiers de votre classe.`,
        highlighted: false,
      },
      {
        id: '4',
        icon: '📤',
        title: 'Téléversez Vos Propres Images pour Fiches de Graphisme Maternelle et Exercices CE1 Personnalisés',
        description: `Téléchargez vos propres images pour créer des fiches d'association personnalisées pour vos élèves spécifiques. Le téléversement multi-fichiers accepte les formats JPEG, PNG et GIF. Ajoutez des photos d'objets de la classe pour des fiches de vocabulaire familières. Incluez des images des travaux des élèves pour plus d'engagement.

Le téléversement d'images personnalisées fonctionne parfaitement avec les images de la bibliothèque. Combinez vos photos avec notre collection de plus de 3000 images. Créez des fiches alphabet mélangeant photos des prénoms des élèves et images de lettres. Construisez des activités de graphisme maternelle présentant des objets que les élèves reconnaissent.`,
        highlighted: false,
      },
      {
        id: '5',
        icon: '🌍',
        title: '11 Langues pour Exercices CP et Programmes Bilingues - Apprendre à Lire en Plusieurs Langues',
        description: `Générez des fiches d'association en 11 langues différentes pour les classes multilingues. Traduction complète de l'interface et localisation du contenu incluses. Créez des fiches maternelle en anglais, allemand, espagnol ou italien. Construisez des exercices CE1 en portugais, néerlandais, danois, suédois, norvégien ou finnois.

Le support linguistique va au-delà de la simple traduction. Les étiquettes d'images changent automatiquement selon la langue sélectionnée. Les fiches d'association avec premières lettres affichent les bonnes lettres pour l'alphabet de chaque langue. Les fiches pour apprendre à lire reflètent les modèles sonores spécifiques à chaque langue.`,
        highlighted: false,
      },
      {
        id: '6',
        icon: '💰',
        title: 'Licence Commerciale Incluse - Vendez Vos Fiches à Imprimer Gratuit sur Teachers Pay Teachers',
        description: `Votre abonnement Pack Essentiel inclut une licence commerciale d'impression à la demande sans frais supplémentaires. Vendez les fiches d'association que vous créez sur Teachers Pay Teachers, Etsy ou Amazon KDP. Pas de frais de licence supplémentaires au-delà de votre abonnement annuel de 144 €. Créez des fiches maternelle et des exercices CP illimités pour la vente commerciale.

La licence commerciale couvre tous les types de fiches que vous générez. Vendez des packs de fiches alphabet thématiques. Commercialisez des ensembles d'exercices maths comme suppléments de programme. Proposez des fiches pour apprendre à lire classées par niveau de lecture.`,
        highlighted: true,
      },
      {
        id: '7',
        icon: '🎨',
        title: 'Bibliothèque de 3000+ Images et Qualité 300 DPI - Fiches Alphabet et Coloriage à Imprimer Professionnels',
        description: `Accédez à notre bibliothèque complète de plus de 3000 images adaptées aux enfants avec votre abonnement Pack Essentiel. Pas de frais par image contrairement aux sites de photos. Pas de limites de téléchargement. Parcourez les images organisées par thèmes incluant animaux, nourriture, transports, école, nature et saisons.

Chaque image fonctionne parfaitement pour les fiches maternelle et les exercices CE1. Illustrations appropriées pour les enfants avec des designs clairs et simples. Couleurs vives qui engagent les jeunes apprenants. Objets reconnaissables que les élèves rencontrent quotidiennement.`,
        highlighted: false,
      },
      {
        id: '8',
        icon: '🖼️',
        title: 'Créez des Activités de Coloriage à Imprimer Combinées avec Fiches d\'Association - Exercices Maths et Calcul Visuels',
        description: `Intégrez des éléments de coloriage dans vos fiches d'association pour un engagement prolongé. Combinez exercices éducatifs et activités de coloriage à imprimer. Les élèves complètent l'association éducative puis colorient les mêmes images. Parfait pour les centres d'apprentissage et les activités de fin de travail.`,
        highlighted: false,
      },
      {
        id: '9',
        icon: '✍️',
        title: 'Fiches d\'Écriture et Écriture Cursive Complémentaires - Graphisme Maternelle et Motricité Fine',
        description: `Créez des ensembles complets combinant fiches d'association et activités d'écriture. Associez reconnaissance des lettres et pratique de l'écriture cursive. Développez des packs de graphisme maternelle avec association et traçage. Combinez discrimination visuelle et développement de la motricité fine pour un apprentissage complet.`,
        highlighted: false,
      },
      {
        id: '10',
        icon: '📊',
        title: 'Tables de Multiplication et Calcul - Exercices Maths avec Association Visuelle',
        description: `Générez des fiches d'association pour l'apprentissage des tables de multiplication. Associez problèmes de multiplication et réponses visuellement. Créez des exercices de calcul mental avec support visuel. Construisez des fiches de mathématiques progressives du CP au CE2. Les associations visuelles renforcent la mémorisation des tables de multiplication.`,
        highlighted: false,
      },
    ],
  },

  // How-To Guide - FULL text from matching.md step sections
  howTo: {
    sectionTitle: 'Comment Créer des Fiches à Imprimer Gratuit en 5 Étapes Simples - Fiches Maternelle et Exercices CP',
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
    sectionTitle: 'Parfait pour Enseignants, Parents et Éducateurs - Fiches Maternelle et Exercices CP pour Tous les Besoins',
    sectionDescription: 'Les fiches d\'association répondent à différents besoins éducatifs dans divers environnements d\'enseignement. Les enseignants de maternelle utilisent les fiches d\'association pour la reconnaissance des lettres et la pratique du graphisme. Les enseignants de CP construisent des fiches pour apprendre à lire et développer la lecture. Les parents pratiquant l\'instruction en famille créent des fiches alphabet personnalisées au rythme d\'apprentissage individuel. Les enseignants de FLE conçoivent des exercices maths avec support visuel du vocabulaire. Les enseignants spécialisés génèrent des fiches à imprimer gratuit différenciées pour différents niveaux.',
    badgeText: 'Cas d\'Utilisation',
    readMoreLabel: 'Lire la suite',
    showLessLabel: 'Voir moins',
    items: [
      {
        id: '1',
        icon: '👩‍🏫',
        title: 'Enseignants de Maternelle - Fiches Alphabet et Graphisme Maternelle pour la Reconnaissance des Lettres',
        subtitle: 'Fiches alphabet et conscience phonologique',
        description: `Les enseignants de maternelle ont besoin d'un approvisionnement constant de fiches alphabet pour l'instruction quotidienne des lettres. Créez des fiches d'association reliant images et premières lettres pour les fondations phonologiques. Générez des fiches alphabet pour chaque lettre de l'alphabet tout au long de l'année. Construisez des activités pour apprendre à lire avec la reconnaissance des mots à haute fréquence. Concevez des fiches à imprimer gratuit pour les activités de centres et l'instruction en petits groupes.

Le mode Image vers Première Lettre crée des fiches maternelle parfaites pour les centres de littératie. Les élèves associent pomme à P, ballon à B, chat à C. Les connexions visuelles aident les pré-lecteurs à comprendre les relations lettres-sons. Générez de nouvelles fiches alphabet chaque semaine pour maintenir l'engagement des élèves. L'association thématique avec les saisons garde les fiches de graphisme maternelle pertinentes par rapport aux sujets actuels de la classe.

Les enseignants de petite et moyenne section utilisent des fiches d'association à quatre paires pour les plus jeunes apprenants. Moins d'éléments évitent la surcharge pour les enfants de trois et quatre ans. Des images plus grandes soutiennent le développement de la motricité fine. L'association simple construit des compétences fondamentales de pré-lecture. Les élèves pratiquent la discrimination visuelle avant le début de l'instruction phonique formelle.`,
        quote: 'Mes élèves adorent les fiches d\'association avec les images colorées !',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Enseignants de CP, CE1 et CE2 - Exercices pour Apprendre à Lire et Tables de Multiplication',
        subtitle: 'Fiches de lecture et exercices maths',
        description: `Les enseignants de CP ont besoin de fiches de lecture pour les listes de mots courants Dubois-Buyse. Créez des fiches d'association reliant mots courants et représentations en images. Construisez des exercices CP pour les combinaisons de sons, les digraphes et les familles de mots. Générez des associations de vocabulaire pour les unités de sciences et d'histoire-géographie. Concevez des exercices maths associant mots-nombres et chiffres.

Les enseignants de CE1 utilisent le mode Mot Personnalisé pour l'association de vocabulaire spécifique aux matières. Associez les régions aux capitales pour la géographie. Connectez les termes mathématiques aux définitions. Reliez le vocabulaire scientifique aux exemples. Créez des fiches de grammaire associant les natures de mots. Toutes les exercices CP s'adaptent facilement à la difficulté du contenu CE1.

Les enseignants de CE2 créent des fiches d'association plus complexes avec des concepts abstraits. Associez fractions et modèles visuels pour la compréhension mathématique. Connectez événements historiques et dates pour l'histoire. Reliez processus scientifiques et descriptions. Générez des exercices de calcul et des fiches sur les tables de multiplication avec association visuelle. Le vocabulaire avancé stimule les élèves du cycle 2 supérieur.`,
        quote: 'Les fiches d\'association rendent l\'apprentissage des tables de multiplication ludique.',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Parents IEF - Exercices CE1 et Fiches Maternelle pour un Apprentissage Individualisé',
        subtitle: 'Apprentissage personnalisé à la maison',
        description: `Les parents pratiquant l'instruction en famille créent des fiches d'association personnalisées correspondant au niveau d'apprentissage de chaque enfant. Générez des fiches alphabet quand l'élève maîtrise la reconnaissance des lettres. Construisez des exercices CP suivant la séquence du programme choisi. Concevez des fiches pour apprendre à lire au rythme de lecture individuel. Créez des exercices maths alignés sur le niveau de compétence actuel de l'élève.

Téléchargez des photos de famille pour des fiches maternelle hautement personnalisées. Associez le prénom de l'enfant à sa photo pour la reconnaissance du nom. Connectez les membres de la famille aux mots de relation. Reliez les objets du foyer aux mots de vocabulaire. La personnalisation augmente l'engagement pour les apprenants à domicile.

Créez des exercices CE1 thématiques correspondant aux intérêts et loisirs familiaux. Les élèves passionnés de sport reçoivent des associations de vocabulaire sportif. Les amoureux de la nature reçoivent des fiches d'association basées sur les sciences. Les élèves artistiques pratiquent avec du vocabulaire créatif. L'apprentissage basé sur les intérêts motive les élèves en instruction en famille.`,
        quote: 'Un outil adapté à tous les niveaux de mes enfants.',
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Enseignants FLE et Classes Bilingues - Apprendre les Lettres et Alphabet en Plusieurs Langues',
        subtitle: 'Vocabulaire multilingue et apprentissage progressif',
        description: `Les enseignants de FLE utilisent les fiches d'association pour l'instruction de vocabulaire visuel. Les images fournissent des indices contextuels dont les apprenants de français langue étrangère ont besoin. Associez images et mots français pour la construction de vocabulaire de base. Créez des fiches alphabet montrant les correspondances lettres-sons. Construisez des fiches pour apprendre à lire renforçant les modèles de prononciation française.

Les fiches d'association multilingues soutiennent les programmes d'héritage linguistique. Créez des fiches alphabet en espagnol pour les classes bilingues. Générez des fiches de vocabulaire anglais pour les programmes d'immersion. Construisez des fiches en allemand pour l'instruction des langues vivantes. Concevez des fiches alphabet en portugais pour les programmes de maintien de la langue. Les 11 langues disponibles avec la même interface facile.

Les enseignants bilingues créent des fiches d'association parallèles en deux langues. Générez la version française pour les activités de transfert linguistique. Créez la version anglaise pour la construction des fondations. Comparez le vocabulaire entre les langues. Renforcez la littératie dans la première et la seconde langue.`,
        quote: 'Le support multilingue est essentiel pour mes élèves allophones.',
      },
      {
        id: '5',
        icon: '💜',
        title: 'Enseignants Spécialisés - Fiches à Imprimer Gratuit Différenciées et Écriture Cursive Adaptée',
        subtitle: 'Différenciation et adaptation aux besoins spécifiques',
        description: `Les enseignants spécialisés ont besoin de fiches d'association hautement personnalisables pour les objectifs des PPS (Projets Personnalisés de Scolarisation). Créez des fiches à quatre paires pour les élèves ayant des difficultés d'attention. Générez des fiches alphabet à grandes images pour le soutien au traitement visuel. Construisez des fiches simples pour apprendre à lire pour l'instruction de lecture modifiée. Concevez des exercices maths concrets avec représentations visuelles.

Téléchargez des photos du matériel de manipulation de la classe pour la connexion à l'apprentissage pratique. Associez de vrais jetons de comptage aux mots-nombres. Connectez les blocs de formes réels aux termes géométriques. Reliez les objets de la classe au vocabulaire fonctionnel. Faites le pont entre le travail concret avec le matériel et la pratique abstraite sur fiche.

Créez des fiches d'association soutenant divers troubles d'apprentissage. Options d'impression grande taille pour les élèves ayant des déficiences visuelles. Vocabulaire simple pour les élèves ayant des retards de langage. Association image-lettre claire pour les élèves dyslexiques. Combinez fiches d'écriture cursive et exercices d'association pour le développement de la motricité fine. Ajustez chaque élément pour répondre aux besoins individuels des élèves.`,
        quote: 'Je peux adapter les fiches pour chaque élève de ma classe ULIS.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Enseignants Entrepreneurs - Vendez Vos Fiches à Imprimer Gratuit et Exercices Maths sur Teachers Pay Teachers',
        subtitle: 'Licence commerciale incluse pour TPT, Etsy et Amazon KDP',
        description: `Les enseignants entrepreneurs construisent des entreprises prospères en vendant des packs de fiches d'association en ligne. Créez des packs de fiches alphabet thématiques pour la demande saisonnière. Générez des ensembles complets d'exercices maths organisés par progression de compétences. Construisez des packs de fiches pour apprendre à lire triés par niveau de lecture. Concevez des collections d'exercices de calcul ciblant des standards de niveau spécifiques. Transformez les fiches à imprimer gratuit en produits commerciaux.

Les vendeurs Teachers Pay Teachers fixent les prix des packs de fiches d'association à 3-8 € par pack. Créez un pack de fiches alphabet de 10 pages couvrant les lettres A-Z. Générez un ensemble d'exercices CP de 15 pages enseignant les consonnes initiales. Construisez un pack de fiches pour apprendre à lire de 20 pages progressant à travers les niveaux de difficulté. Vendez des centaines de copies mensuellement générant un revenu passif significatif.

La licence commerciale incluse avec Pack Essentiel économise de l'argent par rapport aux plateformes concurrentes. D'autres sites web facturent 100-200 € supplémentaires annuellement pour les droits commerciaux. Les places de marché graphiques prennent 50% de commission sur les ventes. LessonCraft Studio inclut une licence commerciale complète dans l'abonnement annuel Pack Essentiel à 144 €. Créez des fiches maternelle et des exercices CE1 illimités pour la vente commerciale.`,
        quote: 'Mon abonnement s\'est rentabilisé dès le premier mois de ventes !',
      },
    ],
  },

  // FAQ Section - Selected FAQs from matching.md
  faq: {
    sectionTitle: 'Questions Fréquentes sur les Fiches d\'Association - Fiches à Imprimer Gratuit et Graphisme Maternelle',
    sectionDescription: 'Les enseignants posent des questions courantes sur la création de fiches d\'association avec MatchUp Maker. Les questions couvrent les exigences d\'abonnement, les capacités d\'impression, les options de personnalisation et les licences commerciales. Découvrez la création de fiches alphabet, la personnalisation des exercices maths, la génération de fiches pour apprendre à lire et le téléchargement de fiches à imprimer gratuit.',
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
        question: 'Ce Générateur de Fiches d\'Association Est-il Gratuit pour Créer des Fiches Maternelle ?',
        answer: `MatchUp Maker nécessite un abonnement Pack Essentiel à 144 € par an ou 15 € par mois. Pas de niveau gratuit disponible pour la génération de fiches d'association. Pack Essentiel fournit un accès illimité à MatchUp Maker plus neuf autres générateurs de fiches. Créez des fiches d'association illimitées, des fiches alphabet, des exercices maths et des fiches pour apprendre à lire avec l'abonnement. Pas de frais par fiche ni de limites d'utilisation comme certaines plateformes concurrentes.

Le modèle d'abonnement offre une meilleure valeur que les alternatives à paiement par fiche. Les concurrents facturent 1-3 € par téléchargement de fiche, ce qui s'additionne rapidement pour une utilisation quotidienne en classe. Les enseignants créant cinq fiches d'association par semaine paient 260-780 € annuellement avec la tarification par fiche. Le coût annuel de 144 € du Pack Essentiel économise 116-636 € par rapport aux plateformes à l'utilisation.`,
      },
      {
        id: '2',
        question: 'Puis-je Imprimer des Fiches d\'Association à la Maison pour des Fiches à Imprimer Gratuit de Qualité ?',
        answer: `Oui, toutes les fiches d'association s'impriment parfaitement sur n'importe quelle imprimante domestique ou scolaire. Les imprimantes jet d'encre et laser standard gèrent facilement les fichiers de fiches. Téléchargez les fiches aux formats PDF ou JPEG. Les deux formats s'impriment sur du papier Letter ou A4 standard. Aucun papier spécial requis pour des fiches alphabet et des exercices maths d'apparence professionnelle.

Les fiches se téléchargent en qualité professionnelle 300 DPI assurant une impression nette. Les images restent précises à l'impression. Le texte reste clair et lisible. Les éléments d'association s'impriment avec des lignes nettes et des bords définis. La qualité d'impression correspond aux fiches maternelle et exercices CP publiés commercialement.

L'option niveaux de gris réduit significativement la consommation d'encre. Activez les niveaux de gris avant le téléchargement pour convertir les fiches d'association en noir et blanc. Les niveaux de gris maintiennent la clarté visuelle tout en utilisant moins d'encre couleur. Parfait pour les enseignants imprimant des dizaines de fiches à imprimer gratuit et d'exercices maths hebdomadairement.`,
      },
      {
        id: '3',
        question: 'Ai-je Besoin de Compétences en Design pour Créer des Fiches de Graphisme Maternelle Professionnelles ?',
        answer: `Aucune expérience en design requise pour créer des fiches d'association professionnelles. MatchUp Maker utilise des menus déroulants simples et des clics de boutons. Choisissez votre mode d'association parmi quatre options. Sélectionnez les images dans la bibliothèque ou téléchargez les vôtres. Cliquez sur le bouton générer. Une fiche de graphisme maternelle professionnelle apparaît instantanément sur le canevas.

L'interface utilise une terminologie éducative familière plutôt que du jargon de design. Les paramètres sont étiquetés avec des termes pédagogiques comme "nombre de paires" et "inclure champs nom/date". Pas besoin de comprendre les concepts de design comme les calques, les vecteurs ou la résolution. Le système gère tous les aspects techniques automatiquement. Les enseignants se concentrent sur le contenu éducatif tandis que le logiciel gère le design visuel.`,
      },
      {
        id: '4',
        question: 'Quelles Langues Sont Disponibles pour Créer des Fiches Alphabet et Apprendre à Lire ?',
        answer: `MatchUp Maker supporte 11 langues pour la création de fiches d'association. Générez des fiches en français, anglais, allemand, espagnol, italien, portugais, néerlandais, danois, suédois, norvégien ou finnois. Traductions d'interface et localisation de contenu incluses. Créez des fiches maternelle avec des étiquettes d'images et un vocabulaire appropriés à la langue. Construisez des fiches alphabet montrant les bonnes lettres pour le système alphabétique de chaque langue.

La sélection de langue affecte le vocabulaire des noms de fichiers d'images pour les modes d'association basés sur les mots. Le mode espagnol affiche les mots espagnols dans les fiches d'association. Le mode allemand utilise les noms allemands pour les fiches pour apprendre à lire. L'authenticité du contenu compte pour l'instruction FLE et langues vivantes.`,
      },
      {
        id: '5',
        question: 'Puis-je Vendre des Fiches d\'Association avec Coloriage à Imprimer sur Teachers Pay Teachers ?',
        answer: `Oui, l'abonnement Pack Essentiel inclut une licence commerciale complète d'impression à la demande. Vendez les fiches d'association que vous créez sur Teachers Pay Teachers, Etsy, Amazon KDP ou votre propre site web. Pas de frais de licence supplémentaires au-delà de l'abonnement annuel Pack Essentiel de 144 €. Créez des fiches maternelle et des exercices CP illimités pour la vente commerciale. Générez des packs de fiches alphabet, des collections de coloriage à imprimer et des ensembles de fiches pour les places de marché en ligne.

La licence commerciale couvre les ventes de fiches individuelles et les collections groupées. Vendez des PDF de fiches alphabet individuels ou des cahiers complets de 50 pages. Fixez les prix des produits de manière compétitive de 1,50 € pour les fiches individuelles à 25 € pour les méga packs. Gardez 100% des profits après les frais de place de marché. LessonCraft Studio ne prend aucune commission sur vos ventes.`,
      },
      {
        id: '6',
        question: 'Comment Personnaliser les Fiches pour l\'Écriture Cursive et les Exercices CE1 ?',
        answer: `Personnalisez les fiches d'association via plusieurs paramètres avant la génération. Choisissez le mode d'association correspondant à vos objectifs de leçon. Sélectionnez le nombre de paires selon les niveaux d'aptitude des élèves. Choisissez la taille et l'orientation de page pour vos besoins d'impression. Activez ou désactivez les champs nom/date pour la gestion de classe.

Téléchargez vos propres images pour des fiches maternelle hautement personnalisées. Ajoutez des photos d'objets de la classe que les élèves reconnaissent. Incluez des images des travaux des élèves pour l'engagement. Téléchargez des images de matériel de manipulation correspondant aux supports physiques de la classe. Les images personnalisées rendent les fiches alphabet et les exercices d'écriture cursive pertinents pour les expériences spécifiques de vos élèves.

Modifiez les fiches d'association générées sur le canevas après la génération. Déplacez les images pour mettre en valeur le contenu important. Redimensionnez les éléments pour les apprenants visuels ayant besoin d'images plus grandes. Ajoutez des instructions textuelles personnalisées adaptées aux procédures de votre classe. Changez les couleurs correspondant aux thèmes de la classe ou aux sujets saisonniers.`,
      },
      {
        id: '7',
        question: 'Quels Groupes d\'Âge Conviennent aux Fiches de Graphisme Maternelle et Tables de Multiplication ?',
        answer: `Les fiches d'association fonctionnent excellemment pour les élèves de la petite section au CE2 âgés de 3 à 9 ans. Les élèves de petite section âgés de 3-4 ans bénéficient d'associations simples à quatre paires avec de grandes images familières. Les élèves de moyenne et grande section âgés de 4-6 ans gèrent des fiches alphabet standard à six paires avec association de premières lettres. Les élèves de CP âgés de 6-7 ans complètent des fiches complexes pour apprendre à lire et des exercices maths. Les élèves de CE1-CE2 âgés de 7-9 ans abordent les associations de vocabulaire, les tables de multiplication et le contenu spécifique aux matières.

Les élèves plus jeunes de petite section ont besoin d'associations concrètes image-à-image. Utilisez le mode Image Plus Mot montrant des images identiques pour la pratique de discrimination visuelle. Les grandes images soutiennent le développement des compétences de traitement visuel. Moins de paires évitent la surcharge cognitive. L'association simple construit des compétences fondamentales de pré-lecture sans frustration.

Les élèves de CE1-CE2 travaillent sur les tables de multiplication et des fiches de graphisme maternelle avancées. Le mode Mot Personnalisé permet des associations de vocabulaire au-delà de la simple reconnaissance de lettres. Les élèves associent problèmes de multiplication et réponses visuelles. L'augmentation du texte soutient les capacités de lecture croissantes tout en maintenant l'étayage visuel par les images.`,
      },
      {
        id: '8',
        question: 'Puis-je Télécharger Mes Propres Images pour des Fiches d\'Écriture Cursive Personnalisées ?',
        answer: `Oui, téléchargez des images personnelles illimitées vers les fiches d'association. Le téléversement multi-fichiers supporte les formats JPEG, PNG et GIF. Ajoutez des photos depuis votre ordinateur, téléphone ou tablette. Téléchargez des images de classe, des travaux d'élèves, des photos de sorties ou des images familiales. Combinez les images téléchargées avec les images de la bibliothèque de plus de 3000 éléments dans la même fiche.

Le téléversement d'images personnalisées personnalise les fiches maternelle pour des groupes d'élèves spécifiques. Photographiez des objets de la classe pour des associations de vocabulaire familières. Téléchargez des images de l'équipement de la cour de récréation pour des fiches alphabet basées sur les lieux. Ajoutez des images de l'animal de compagnie de la classe pour des exercices engageants. Les élèves se connectent plus profondément au contenu des fiches d'écriture cursive présentant leur environnement réel.`,
      },
      {
        id: '9',
        question: 'Combien de Temps Faut-il pour Créer des Exercices Maths et Calcul ?',
        answer: `La création complète de fiches d'association prend moins de 3 minutes du début au téléchargement. Choisissez le mode d'association et les paramètres en 30 secondes. Sélectionnez les images ou configurez les paires en 60 secondes. Cliquez sur générer et la fiche apparaît en 15 secondes. L'édition optionnelle ajoute 30-60 secondes pour la personnalisation. Téléchargez en 15 secondes. Temps total 2,5-3 minutes pour des fiches maternelle professionnelles.

La génération rapide permet de créer plusieurs exercices maths différenciés rapidement. Générez une version plus facile pour le groupe d'intervention en 3 minutes. Créez des fiches alphabet au niveau pour la classe principale en 3 autres minutes. Construisez une version stimulante pour les élèves avancés en 3 minutes finales. Complétez une différenciation à trois niveaux en moins de 10 minutes au total.`,
      },
      {
        id: '10',
        question: 'Les Fiches Maternelle Incluent-elles des Corrigés pour les Fiches Alphabet ?',
        answer: `Oui, chaque fiche d'association inclut la génération automatique de corrigé. Cliquez sur le bouton "Créer Corrigé" après avoir créé la fiche. Le système génère un corrigé montrant les associations correctes avec des lignes de connexion tracées. Le corrigé apparaît sur un onglet séparé pour un téléchargement indépendant. La fiche et le corrigé se téléchargent ensemble ou séparément.

Les corrigés reflètent exactement les mises en page des fiches en maintenant les mêmes positions d'éléments. Les images apparaissent aux emplacements identiques sur le corrigé et la fiche de l'élève. Des lignes de connexion montrent les associations correctes entre les colonnes gauche et droite. Les enseignants voient les solutions d'un coup d'œil pour une correction rapide. Les corrigés font gagner du temps pendant la correction des copies et les conférences avec les élèves.`,
      },
      {
        id: '11',
        question: 'Puis-je Créer des Fiches sur les Tables de Multiplication avec Vocabulaire Spécifique aux Matières ?',
        answer: `Oui, le mode Mot Personnalisé permet des associations spécifiques aux matières dans tous les domaines du programme. Créez des exercices maths associant formes géométriques et noms mathématiques. Construisez des associations scientifiques connectant animaux aux habitats ou étapes du cycle de vie. Concevez des fiches d'histoire-géographie associant régions et capitales ou personnages historiques et événements. Générez des associations de grammaire reliant natures de mots et exemples.

Les applications mathématiques incluent l'association mots-nombres et chiffres pour la maternelle. Associez problèmes d'addition et réponses pour la fluence des faits en CP. Connectez problèmes des tables de multiplication et résultats visuels pour le CE1-CE2. Reliez fractions et modèles visuels pour le cycle 3. Créez des associations géométriques avec formes, angles ou relations spatiales. Le vocabulaire personnalisé permet à tout concept mathématique de devenir contenu de fiche d'association.`,
      },
      {
        id: '12',
        question: 'Les Fiches de Coloriage à Imprimer Sont-elles Incluses avec les Exercices pour Apprendre à Lire ?',
        answer: `L'abonnement Pack Essentiel inclut l'accès à des générateurs séparés de fiches de coloriage à imprimer aux côtés de MatchUp Maker. Créez des fiches alphabet coordonnées utilisant l'application Train de l'Alphabet pour la pratique du traçage de lettres. Générez des fiches de coloriage thématiques utilisant l'application Coloriage. Construisez des packs d'apprentissage complets combinant association, fiches de graphisme maternelle et coloriage à imprimer. Tous les outils partagent la même bibliothèque de plus de 3000 images assurant une cohérence visuelle entre les types de fiches.

Combinez fiches pour apprendre à lire et activités de coloriage à imprimer pour un engagement prolongé. Les élèves complètent l'association éducative puis colorient les mêmes images ensuite. La combinaison maintient les élèves productifs pendant le temps de centres. L'association fournit du contenu académique tandis que le coloriage offre une pratique calmante de motricité fine.`,
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
    sectionTitle: 'Combinez les Fiches d\'Association avec d\'Autres Générateurs - Coloriage à Imprimer et Exercices Maths',
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
    items: [
      {
        id: '1',
        slug: 'exercices-maths-fiches',
        name: 'Exercices Maths',
        category: 'Mathématiques',
        icon: '➕',
        description: 'Combinez fiches d\'association et exercices maths pour une instruction complète des nombres. Créez des associations image-nombre montrant les représentations de quantités. Construisez des exercices de calcul où les élèves associent problèmes et réponses visuelles.',
      },
      {
        id: '2',
        slug: 'train-alphabet-fiches',
        name: 'Train de l\'Alphabet',
        category: 'Lecture',
        icon: '🚂',
        description: 'Associez fiches d\'association et fiches de graphisme maternelle pour un apprentissage complet des lettres. Créez des associations connectant images et premières lettres pour l\'association lettre-son. Suivez avec des fiches de traçage pratiquant la formation des mêmes lettres.',
      },
      {
        id: '3',
        slug: 'coloriage-fiches',
        name: 'Coloriage à Imprimer',
        category: 'Arts et Motricité',
        icon: '🎨',
        description: 'Associez fiches d\'association et fiches de coloriage à imprimer pour des périodes d\'activité plus longues. Les élèves complètent l\'association connectant images et lettres. Colorient les mêmes images sur des fiches de coloriage à imprimer coordonnées ensuite.',
      },
      {
        id: '4',
        slug: 'cherche-et-compte-fiches',
        name: 'Cherche et Compte',
        category: 'Mathématiques',
        icon: '🔍',
        description: 'Combinez fiches pour apprendre à lire et association pour une instruction de littératie complète. Créez des associations de sons initiaux où les élèves connectent images et premières lettres.',
      },
      {
        id: '5',
        slug: 'addition-fiches',
        name: 'Addition',
        category: 'Mathématiques',
        icon: '🔢',
        description: 'Créez des packs complets combinant fiches sur les tables de multiplication et activités de coloriage à imprimer. Les élèves complètent des associations de multiplication connectant problèmes et réponses.',
      },
      {
        id: '6',
        slug: 'mots-melanges-fiches',
        name: 'Mots Mélangés',
        category: 'Lecture',
        icon: '🔤',
        description: 'Construisez des programmes complets de préparation à l\'écriture combinant fiches d\'écriture cursive et fiches de graphisme maternelle. Commencez par des fiches de graphisme maternelle développant les compétences préparatoires à l\'écriture.',
      },
    ],
  },
};

export default matchingFrContent;
