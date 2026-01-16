import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Odd One Out Worksheets - French Content
 *
 * File: frontend/content/product-pages/fr/odd-one-out-worksheets.ts
 * URL: /fr/apps/intrus-fiches (French SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/French/odd-one-out.md
 * App ID: odd-one-out (Visual discrimination / find the odd one worksheets)
 * Bundle: Accès Complet ($240/year) - NOT Pack Essentiel
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const oddOneOutFrContent: ProductPageContent = {
  // SEO Metadata - French language-specific
  seo: {
    slug: 'intrus-fiches',
    appId: 'odd-one-out',
    title: 'Fiches à Imprimer Gratuit Intrus - Fiches Maternelle Exercices CP - Générateur Exercices Maths',
    description: 'Créez des fiches à imprimer gratuit pour trouver l\'intrus en quelques clics. Votre abonnement Accès Complet à 240€/an vous donne accès illimité à ce générateur professionnel. Générez des fiches maternelle personnalisées parfaites pour développer l\'observation et la logique.',
    keywords: 'fiches à imprimer gratuit, fiches maternelle, exercices CP, intrus, graphisme maternelle, exercices maths, coloriage à imprimer, apprendre à lire, alphabet, écriture cursive, tables de multiplication',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fr/apps/intrus-fiches',
  },

  // Hero Section - FULL text from odd-one-out.md paragraphs 1-4
  hero: {
    title: 'Fiches Intrus',
    subtitle: 'Générateur de Fiches Maternelle pour Observation et Logique',
    description: `Créez des fiches à imprimer gratuit pour trouver l'intrus en quelques clics. Votre abonnement Accès Complet à 240€/an vous donne accès illimité à ce générateur professionnel. Générez des fiches maternelle personnalisées parfaites pour développer l'observation et la logique. Téléchargez des exercices CP de qualité supérieure en moins de 3 minutes.

Notre générateur de fiches intrus transforme la création d'exercices pédagogiques. Parfait pour les enseignants de maternelle et CP qui cherchent des fiches à imprimer gratuit. Chaque fiche développe les capacités d'observation et de raisonnement logique. Les enfants adorent ces exercices ludiques et colorés.

Les fiches maternelle intrus sont essentielles pour l'apprentissage précoce. Les élèves apprennent à comparer, catégoriser et identifier les différences. Ces compétences sont fondamentales pour apprendre à lire et calculer. Le graphisme maternelle se développe naturellement en manipulant ces exercices. Les exercices CP renforcent la discrimination visuelle nécessaire à la lecture.

Créez des fiches personnalisées avec plus de 3000 images thématiques. Choisissez parmi des thèmes variés : animaux, nourriture, objets quotidiens, formes géométriques. Combinez deux thèmes pour créer des exercices de difficulté progressive. Ajoutez vos propres images pour personnaliser selon vos élèves. Modifiez tous les éléments directement sur le canevas.`,
    previewImageSrc: '/samples/english/odd one out/identical.jpeg',
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

  // Sample Gallery - REAL file paths from samples/english/odd one out/
  samples: {
    sectionTitle: 'Exemples de Fiches Intrus',
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
        worksheetSrc: '/samples/english/odd one out/identical.jpeg',
        answerKeySrc: '/samples/english/odd one out/identical answer-key.jpeg',
        altText: 'Fiche intrus mode identique pour maternelle avec corrigé',
        pdfDownloadUrl: '/samples/english/odd one out/identical.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/english/odd one out/similar.jpeg',
        answerKeySrc: '/samples/english/odd one out/similar answer-key.jpeg',
        altText: 'Fiche intrus mode similaire pour exercices CP avec corrigé',
        pdfDownloadUrl: '/samples/english/odd one out/similar.pdf',
      },
    ],
  },

  // Features Grid - FULL text from odd-one-out.md feature sections
  features: {
    sectionTitle: 'Fonctionnalités Complètes des Fiches Maternelle Intrus - Fiches à Imprimer Gratuit pour Exercices CP et CE1',
    sectionDescription: 'Notre générateur de fiches maternelle intrus offre toutes les fonctionnalités nécessaires aux enseignants professionnels. Créez des exercices CP personnalisés en quelques minutes. Les fiches à imprimer gratuit sont illimitées avec votre abonnement Accès Complet. Chaque fonctionnalité a été conçue pour faciliter votre travail pédagogique. Les exercices CE1 se créent aussi rapidement que les fiches maternelle.',
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
        icon: '🖱️',
        title: 'Créez des Fiches Maternelle et Exercices CP en 3 Clics',
        description: `Sélectionnez un thème d'images pour vos fiches maternelle. Choisissez le nombre d'exercices entre 5 et 10. Cliquez sur Créer et votre fiche apparaît instantanément. Les exercices CP se génèrent en moins de 30 secondes. Aucune compétence en design graphique n'est requise.

Le mode Similaire compare deux thèmes différents. Par exemple, animaux contre nourriture pour vos exercices maths. Le mode Identique utilise un seul thème. Trois images identiques et une légèrement différente. Parfait pour développer l'attention visuelle en graphisme maternelle.

Configurez chaque exercice individuellement si nécessaire. Assignez des modes différents par exercice. Combinez modes Similaire et Identique sur une même fiche. Cette flexibilité permet une progression pédagogique adaptée. Les exercices CE1 peuvent être plus complexes que les fiches maternelle.`,
        highlighted: true,
      },
      {
        id: '2',
        icon: '✏️',
        title: 'Modifiez Tous les Éléments de vos Fiches à Imprimer Gratuit',
        description: `Chaque élément de vos fiches maternelle est modifiable. Cliquez sur n'importe quelle image pour la déplacer. Redimensionnez les images en tirant les coins. Faites pivoter les éléments pour varier la présentation. Supprimez ce qui ne convient pas à vos exercices CP.

Le titre et les instructions se modifient directement. Cliquez sur le texte pour l'éditer instantanément. Changez la police, la taille et la couleur. Adaptez les consignes au niveau de vos élèves. Les exercices CE1 nécessitent parfois des instructions plus précises.

Les bordures et arrière-plans s'ajustent facilement. Plus de 3000 images thématiques disponibles. Glissez-déposez pour réorganiser votre mise en page. Chaque fiche à imprimer gratuit devient unique. Vos exercices maths personnalisés captent l'attention des enfants.

Fonction annuler/refaire pour corriger les erreurs. Zoom avant pour travailler les détails précis. Verrouillez les éléments finalisés pour éviter modifications accidentelles. Interface intuitive semblable aux outils familiers. Les fiches maternelle se créent sans formation technique.`,
        highlighted: false,
      },
      {
        id: '3',
        icon: '📤',
        title: 'Importez vos Propres Images dans les Fiches Maternelle',
        description: `Téléchargez plusieurs images simultanément depuis votre ordinateur. Formats JPEG, PNG et GIF acceptés. Combinez vos photos avec notre bibliothèque d'images. Créez des exercices CP avec les prénoms de vos élèves. Les fiches à imprimer gratuit deviennent très personnelles.

Photographiez des objets de votre classe. Créez des exercices maths avec du matériel familier. Intégrez des images du quotidien des enfants. Cette personnalisation renforce l'engagement des élèves. Les fiches maternelle prennent tout leur sens pédagogique.

Utilisez vos propres dessins ou cliparts. Créez des séries thématiques cohérentes pour l'année. Vos exercices CE1 reflètent votre progression pédagogique. Exportez et réutilisez vos images favorites. Construisez votre propre banque d'images personnalisée.`,
        highlighted: false,
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Créez des Fiches à Imprimer Gratuit en 11 Langues',
        description: `Interface disponible en 11 langues européennes. Bibliothèque d'images traduite dans chaque langue. Créez des fiches maternelle en français, anglais, allemand. Parfait pour l'enseignement bilingue en maternelle. Les exercices CP multilingues enrichissent l'apprentissage.

Les noms de fichiers images sont traduits. Recherchez "pomme" ou "apple" selon la langue. Cette fonctionnalité facilite les cours de langues étrangères. Les exercices CE1 peuvent intégrer du vocabulaire multilingue. Idéal pour les programmes d'immersion linguistique.

Écoles internationales et classes multilingues adorent cette fonction. Créez des fiches à imprimer gratuit pour tous vos groupes linguistiques. Un seul abonnement pour toutes vos langues d'enseignement. Les exercices maths deviennent accessibles à tous. Le graphisme maternelle transcende les barrières linguistiques.`,
        highlighted: false,
      },
      {
        id: '5',
        icon: '💰',
        title: 'Licence Commerciale Incluse avec vos Fiches Maternelle',
        description: `Votre abonnement Accès Complet à 240€/an inclut la licence commerciale. Vendez vos fiches à imprimer gratuit sur Teachers Pay Teachers. Créez des cahiers d'activités pour Amazon KDP. Ouvrez une boutique Etsy de ressources pédagogiques. Aucuns frais de licence supplémentaires requis.

Qualité 300 DPI professionnelle pour l'impression commerciale. Vos exercices CP se vendent au même prix que les créations premium. Les fiches maternelle de qualité supérieure attirent les acheteurs. Créez des packs thématiques d'exercices maths rentables. Monétisez votre expertise pédagogique facilement.

Enseignants entrepreneurs gagnent 500€ à 5000€ mensuellement. Vos exercices CE1 deviennent une source de revenus passifs. Combinez enseignement et entrepreneuriat pédagogique. Les fiches à imprimer gratuit créées se revendent indéfiniment. Investissement unique pour revenus récurrents illimités.`,
        highlighted: true,
      },
      {
        id: '6',
        icon: '🎨',
        title: 'Bibliothèque de Plus de 3000 Images pour Fiches Maternelle',
        description: `Plus de 3000 images adaptées aux jeunes enfants. Organisées en thèmes pédagogiques cohérents. Animaux, nourriture, transport, vêtements, nature disponibles. Chaque thème contient 20 à 50 images variées. Créez des fiches maternelle sans jamais manquer de contenu.

Images colorées et attrayantes pour graphisme maternelle. Style graphique doux et enfantin parfait. Les exercices CP deviennent visuellement stimulants. Recherchez par mot-clé dans toute la bibliothèque. Trouvez exactement l'image nécessaire pour vos exercices maths.

Arrière-plans et bordures thématiques inclus. Cohérence visuelle professionnelle garantie. Les fiches à imprimer gratuit rivalisent avec les ressources commerciales. Nouvelles images ajoutées régulièrement. Votre bibliothèque s'enrichit sans coût supplémentaire.`,
        highlighted: false,
      },
      {
        id: '7',
        icon: '🖨️',
        title: 'Exportez vos Fiches à Imprimer Gratuit en Qualité 300 DPI',
        description: `Téléchargement en format PDF ou JPEG haute résolution. Qualité 300 DPI parfaite pour l'impression professionnelle. Vos fiches maternelle s'impriment nettes et éclatantes. Les exercices CP conservent tous les détails colorés. Impression commerciale ou domestique excellente.

Option niveaux de gris pour économiser l'encre. Particulièrement utile pour les exercices maths répétés. Imprimez 30 copies sans vider vos cartouches. Les fiches à imprimer gratuit restent lisibles en noir et blanc. Le graphisme maternelle fonctionne en couleur ou monochrome.

Créez automatiquement une fiche corrigé avec solutions. Les exercices CE1 incluent les bonnes réponses marquées. Gagnez un temps précieux lors des corrections. Distribuez les corrigés aux parents ou assistants. Vos fiches maternelle sont prêtes pour utilisation immédiate.`,
        highlighted: true,
      },
      {
        id: '8',
        icon: '🎯',
        title: 'Deux Modes d\'Activité Distincts',
        description: `Le mode Identique utilise un seul thème d'images. Trois images identiques et une légèrement différente. Les élèves développent l'attention aux détails fins. Parfait pour les fiches graphisme maternelle débutantes. Cette activité prépare la reconnaissance des lettres.

Le mode Similaire compare deux thèmes différents. Trois images d'un thème et une d'un autre. Par exemple, trois fruits et un légume. Les élèves pratiquent la catégorisation logique. Idéal pour les exercices CE1 plus avancés.

Combinez les deux modes sur une même fiche. Exercices progressifs du simple au complexe. Les fiches maternelle évoluent avec le niveau des élèves. Différenciez facilement pour classes hétérogènes. Chaque mode génère un corrigé automatique.`,
        highlighted: false,
      },
    ],
  },

  // How-To Guide - FULL text from odd-one-out.md step sections
  howTo: {
    sectionTitle: 'Comment Créer des Fiches Maternelle Intrus en 5 Étapes Faciles',
    sectionDescription: 'Notre générateur de fiches à imprimer gratuit simplifie la création d\'exercices. Créez des fiches maternelle professionnelles en quelques clics. Les exercices CP et CE1 se génèrent aussi rapidement. Aucune compétence technique requise pour réussir. Les exercices maths et graphisme maternelle deviennent accessibles à tous.',
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
        title: 'Choisissez vos Thèmes pour Fiches Maternelle',
        description: `Sélectionnez le Thème A dans le menu déroulant. Plus de 30 thèmes disponibles pour vos fiches maternelle. Animaux, nourriture, objets quotidiens, formes géométriques organisés. Parfait pour apprendre à lire et développer le vocabulaire. Les exercices CP commencent avec des images familières.

Le Thème B sert pour le mode Similaire uniquement. Comparez deux catégories différentes d'images. Par exemple, animaux terrestres contre animaux marins. Créez des exercices maths de catégorisation logique. Le graphisme maternelle bénéficie de ces comparaisons visuelles.

Les thèmes alphabet facilitent l'apprentissage des lettres. Images commençant par la même lettre pour exercices CP. Combinez avec des exercices écriture et coloriage à imprimer. Les fiches à imprimer gratuit deviennent des outils multifonctions. Chaque thème contient 20 à 50 images variées.

Téléchargez vos propres images si nécessaire. Photographiez du matériel de votre classe. Créez des exercices CE1 personnalisés avec prénoms d'élèves. Les fiches maternelle deviennent ultra-personnalisées. Format JPEG, PNG et GIF acceptés facilement.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Configurez les Paramètres de vos Exercices Maths',
        description: `Choisissez le nombre d'exercices entre 5 et 10. Les fiches maternelle avec 6 exercices conviennent parfaitement. Format A4 ou Lettre selon votre région. Les exercices CP s'adaptent aux deux formats standard. Dimensions personnalisées disponibles pour projets spéciaux.

Sélectionnez le mode global pour tous exercices. Mode Identique : 3 images identiques + 1 différente. Mode Similaire : 3 du Thème A + 1 du Thème B. Les exercices maths de logique varient en difficulté. Le graphisme maternelle progresse avec la complexité.

Configurez chaque exercice individuellement si souhaité. Assignez différents modes par ligne d'exercice. Exercice 1 en mode Identique, exercice 2 en Similaire. Cette flexibilité crée une progression pédagogique naturelle. Les fiches à imprimer gratuit s'adaptent parfaitement à votre planification.

Cochez "Inclure numéros d'exercices" pour clarté visuelle. Numérotation automatique facilite les instructions orales. Les exercices CE1 bénéficient d'une structure claire. Ajoutez champs Nom/Date pour responsabilisation élèves. Vos fiches maternelle deviennent complètes et professionnelles.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Générez vos Fiches à Imprimer Gratuit',
        description: `Cliquez sur le bouton Créer pour génération instantanée. Votre fiche maternelle apparaît en moins de 5 secondes. Les exercices CP se dessinent automatiquement sur le canevas. Mise en page professionnelle créée sans effort. Les exercices maths s'organisent de manière optimale.

Le système place automatiquement les images sélectionnées. Trois images communes et une image différente par exercice. Espacement régulier pour faciliter l'observation des enfants. Le graphisme maternelle respecte les principes de lisibilité. Chaque élément reste parfaitement positionné et proportionné.

Titre et instructions générés dans votre langue. Consignes adaptées au niveau maternelle ou CP. Les exercices CE1 reçoivent des instructions plus détaillées. Bordures colorées et attrayantes ajoutées automatiquement. Vos fiches à imprimer gratuit sont prêtes immédiatement.

La fiche corrigé se génère simultanément en arrière-plan. Solutions marquées clairement pour correction rapide. Gagnez du temps précieux pendant et après la classe. Les exercices maths incluent les bonnes réponses identifiées. Basculez entre fiche exercice et corrigé d'un clic.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Personnalisez vos Fiches Maternelle sur le Canevas',
        description: `Cliquez sur n'importe quel élément pour le modifier. Déplacez les images en les glissant simplement. Redimensionnez en tirant sur les coins des images. Faites pivoter pour varier l'orientation visuelle. Les exercices CP deviennent entièrement personnalisés.

Modifiez le titre et les instructions directement. Double-cliquez sur le texte pour l'éditer. Adaptez les consignes au vocabulaire de vos élèves. Changez police, taille et couleur du texte. Les fiches maternelle reflètent votre style pédagogique.

Ajoutez du texte supplémentaire partout sur la fiche. Créez des étiquettes, notes ou rappels visuels. Intégrez des exercices écriture avec lignes de pratique. Combinez avec du coloriage à imprimer pour activités multiples. Vos exercices maths deviennent des fiches complètes.

Changez les bordures et arrière-plans thématiques. Plus de 50 bordures différentes disponibles. Arrière-plans coordonnés pour cohérence visuelle professionnelle. Les fiches à imprimer gratuit rivalisent avec produits commerciaux. Le graphisme maternelle atteint un niveau exceptionnel.

Utilisez Annuler/Refaire pour corriger erreurs facilement. Verrouillez les éléments finalisés pour éviter modifications. Fonction Zoom pour travailler les détails précis. Les exercices CE1 nécessitent parfois ajustements fins. Interface intuitive ne nécessite aucune formation.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Téléchargez vos Exercices Maths et Fiches Maternelle',
        description: `Cliquez sur le bouton Télécharger pour options d'export. Format PDF recommandé pour impression directe. JPEG parfait pour intégration dans autres documents. Les fiches maternelle s'exportent en qualité 300 DPI. Les exercices CP conservent netteté et couleurs éclatantes.

Option Niveaux de gris économise encre d'imprimante. Particulièrement utile pour exercices quotidiens répétés. Les fiches à imprimer gratuit restent lisibles en noir et blanc. Imprimez 30 copies sans vider vos cartouches. Option couleur réservée aux fiches spéciales.

Téléchargez séparément la fiche exercice et le corrigé. Deux fichiers distincts pour flexibilité maximale. Distribuez les exercices CE1 aux élèves facilement. Conservez le corrigé pour vous ou vos assistants. Les exercices maths incluent solutions détaillées.

Nommez vos fichiers de manière descriptive automatiquement. Format : "Intrus-Animaux-CP-2024.pdf" généré automatiquement. Organisez votre bibliothèque de fiches maternelle facilement. Retrouvez rapidement vos exercices sauvegardés. Le graphisme maternelle s'archive professionnellement.

Imprimez immédiatement ou sauvegardez pour utilisation future. Créez des banques thématiques d'exercices. Partagez avec collègues ou vendez en ligne. Licence commerciale Accès Complet incluse à 240€/an. Vos fiches à imprimer gratuit génèrent revenus potentiels illimités.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from odd-one-out.md use case sections
  useCases: {
    sectionTitle: 'Parfait pour Enseignants, Parents et Éducateurs',
    sectionDescription: 'Nos fiches à imprimer gratuit servent de multiples contextes éducatifs. Enseignants de maternelle et CP adorent la flexibilité. Parents en instruction à domicile trouvent tout le nécessaire. Professeurs de langues créent des exercices maths multilingues. Les exercices CE1 s\'adaptent à tous les niveaux. Chaque utilisateur bénéficie pleinement des fonctionnalités.',
    badgeText: 'Pour Qui',
    readMoreLabel: 'Lire la suite',
    showLessLabel: 'Voir moins',
    items: [
      {
        id: '1',
        icon: '👶',
        title: 'Enseignants de Maternelle',
        subtitle: 'Fiches Graphisme Maternelle et Coloriage à Imprimer pour Développement Précoce',
        description: `Les enseignants de maternelle utilisent quotidiennement nos fiches. Créez des exercices de graphisme maternelle pour développer motricité fine. Les fiches coloriage à imprimer combinent art et apprentissage cognitif. Observation visuelle et discrimination se développent naturellement. Les fiches maternelle intrus préparent à apprendre à lire efficacement.

Grande section et moyenne section bénéficient énormément. Activités d'observation développent l'attention soutenue des jeunes enfants. Les fiches à imprimer gratuit remplacent cahiers commerciaux coûteux. Thèmes variés maintiennent l'intérêt toute l'année scolaire. Le graphisme maternelle progresse avec exercices adaptés au développement.

Différenciez facilement pour niveaux hétérogènes en maternelle. Mode Identique pour débutants découvrant l'activité. Mode Similaire pour enfants maîtrisant déjà l'observation. Combinez avec du coloriage à imprimer pour ateliers autonomes. Vos fiches maternelle deviennent outils pédagogiques polyvalents essentiels.`,
        quote: 'Mes élèves adorent chercher l\'intrus !',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Professeurs de CP et CE1',
        subtitle: 'Exercices CE1 Apprendre à Lire et Alphabet pour Lecture Précoce',
        description: `Les professeurs de CP et CE1 créent exercices ciblés. Utilisez thèmes alphabet pour renforcer reconnaissance des lettres. Les exercices apprendre à lire intègrent discrimination visuelle fine. Images commençant par même son développent conscience phonologique. Les fiches à imprimer gratuit soutiennent méthodes syllabiques parfaitement.

Créez exercices CE1 de vocabulaire thématique enrichi. Séries d'images animaux, plantes, métiers élargissent lexique. Les enfants nomment images avant de chercher l'intrus. Discussion collective après exercice renforce compréhension orale. Vos fiches maternelle évoluent vers exercices CE1 complexes.

Intégrez avec exercices écriture cursive et alphabet pour apprentissage complet. Après avoir trouvé l'intrus, élèves écrivent le mot. Combinez observation visuelle avec production écrite progressive. Les exercices maths logiques préparent résolution de problèmes. Le coloriage à imprimer offre pause créative entre activités.`,
        quote: 'La discrimination visuelle prépare parfaitement la lecture.',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Parents en Instruction à Domicile',
        subtitle: 'Fiches à Imprimer Gratuit Exercices Maths et Tables de Multiplication Progressifs',
        description: `Parents en instruction à domicile adorent notre générateur. Créez progression personnalisée selon rythme de chaque enfant. Les fiches à imprimer gratuit couvrent tous niveaux simultanément. Fratries d'âges différents travaillent ensemble sur thèmes communs. Les exercices maths s'adaptent de la maternelle au CE1.

Tables de multiplication se pratiquent visuellement avec intrus. Groupes de quantités différentes pour identifier l'intrus numérique. Trois groupes de 4 objets et un de 5. Les exercices CE1 renforcent concepts mathématiques concrètement. Le graphisme maternelle se combine avec calcul mental ludique.

Programmez activités hebdomadaires avec banque de fiches. Lundi alphabet, mardi exercices maths, mercredi graphisme maternelle. Jeudi coloriage à imprimer créatif, vendredi révisions mixtes. Les fiches maternelle structurent emploi du temps flexible. Vos enfants progressent à leur rythme optimal personnel.`,
        quote: 'Je crée des fiches adaptées au niveau exact de chaque enfant.',
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Enseignants de Langues Étrangères et FLE',
        subtitle: 'Exercices Maths Multilingues et Fiches Alphabet pour Vocabulaire',
        description: `Professeurs de FLE exploitent les 11 langues disponibles. Créez fiches alphabet bilingues français-anglais simultanément. Les images traduites facilitent acquisition vocabulaire thématique. Les exercices apprendre à lire deviennent multilingues naturellement. Bibliothèque d'images traduite dans chaque langue européenne.

Utilisez pour enseigner nombres et tables de multiplication. Comptage d'objets en langue cible avec exercices maths. Trois groupes corrects et un groupe incorrect à identifier. Les exercices CE1 bilingues enrichissent apprentissage linguistique. Le coloriage à imprimer relaxe tout en révisant vocabulaire.

Écoles internationales et sections bilingues adorent cette fonctionnalité. Créez fiches à imprimer gratuit pour tous groupes linguistiques. Un seul abonnement pour toutes langues enseignées. Les fiches maternelle s'adaptent contextes multiculturels facilement. Le graphisme maternelle transcende barrières linguistiques universellement.`,
        quote: 'Les fiches deviennent un outil d\'apprentissage linguistique.',
      },
      {
        id: '5',
        icon: '💜',
        title: 'Enseignants Spécialisés ULIS et SEGPA',
        subtitle: 'Graphisme Maternelle et Exercices Écriture Différenciés Adaptés',
        description: `Enseignants spécialisés trouvent outil parfaitement adaptable. Créez exercices graphisme maternelle pour élèves en difficulté. Mode Identique simplifie tâche pour troubles attention. Images grandes et claires facilitent discrimination visuelle. Les fiches à imprimer gratuit s'ajustent à tous handicaps.

Différenciez finement selon profils individuels élèves SEGPA. Un élève reçoit 3 exercices simples grand format. Autre élève travaille 8 exercices complexes petit format. Les exercices CE1 deviennent accessibles à tous niveaux. Le coloriage à imprimer offre activité apaisante thérapeutique.

Combinez avec exercices écriture cursive pour rééducation fine. Après observation, élèves tracent lettres des mots. Graphomotricité et cognition travaillent ensemble efficacement. Les exercices maths concrets soutiennent raisonnement logique. Vos fiches maternelle deviennent outils orthopédagogiques précieux.`,
        quote: 'La personnalisation répond à chaque besoin individuel.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Enseignants Entrepreneurs',
        subtitle: 'Vendez Fiches Maternelle et Exercices CE1 sur Teachers Pay Teachers',
        description: `Enseignants entrepreneurs monétisent leur expertise pédagogique facilement. Créez packs thématiques fiches à imprimer gratuit rentables. Licence commerciale Accès Complet à 240€/an incluse automatiquement. Vendez sur Teachers Pay Teachers, Etsy, Amazon KDP. Les exercices maths et tables de multiplication se vendent excellemment.

Qualité 300 DPI professionnelle attire acheteurs exigeants. Vos fiches maternelle rivalisent avec créations commerciales établies. Pack "Graphisme Maternelle Animaux" à 5€ vendu 100 fois. Pack "Exercices CE1 Alphabet Complet" génère revenus réguliers. Le coloriage à imprimer thématique se vend très bien.

Revenus mensuels 500€ à 5000€ selon investissement temps. Créez pendant vacances scolaires pour vendre toute année. Les exercices écriture cursive et apprendre à lire sont populaires. Combinez plusieurs types d'exercices en cahiers complets. Vos fiches à imprimer gratuit deviennent business pérenne profitable.`,
        quote: 'Mon abonnement s\'est rentabilisé dès le premier mois !',
      },
    ],
  },

  // FAQ Section - Selected FAQs from odd-one-out.md
  faq: {
    sectionTitle: 'Questions Fréquentes Fiches Maternelle Exercices CE1',
    sectionDescription: 'Découvrez réponses aux questions courantes sur nos fiches maternelle. Apprenez optimiser exercices CE1, graphisme maternelle, alphabet. Les fiches à imprimer gratuit deviennent encore plus efficaces.',
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
        question: 'Puis-je Créer Fiches Apprendre à Lire et Alphabet avec Images Personnalisées pour Exercices CE1?',
        answer: 'Oui, téléchargez vos propres images facilement. Combinez avec notre bibliothèque pour exercices apprendre à lire. Les fiches alphabet personnalisées renforcent reconnaissance des lettres. Parfait pour exercices CE1 adaptés à vos élèves. Les fiches maternelle intègrent vocabulaire familier des enfants. Photographiez objets de votre classe pour exercices authentiques. Créez fiches apprendre à lire avec prénoms élèves. Les exercices alphabet deviennent ultra-personnalisés et motivants. Images familières facilitent discrimination visuelle et mémorisation. Vos fiches à imprimer gratuit reflètent environnement quotidien. Formats JPEG, PNG, GIF acceptés pour uploads. Taille recommandée minimum 500x500 pixels pour qualité.',
      },
      {
        id: '2',
        question: 'Comment Utiliser ces Fiches pour Enseigner Tables de Multiplication et Exercices Maths aux Élèves CE1?',
        answer: 'Les exercices intrus développent logique mathématique naturellement. Créez groupes de quantités pour tables de multiplication. Trois groupes de 4 objets et un de 5. Les exercices maths visuels renforcent concepts numériques. Les élèves CE1 comprennent multiplication concrètement. Utilisez mode Similaire pour comparer quantités différentes. Les exercices tables de multiplication deviennent jeux d\'observation. Comptage rapide développe calcul mental automatiquement. Les fiches maternelle préparent concepts mathématiques précoces. Exercices maths progressent de maternelle à CE1 naturellement. Combinez avec exercices écriture des nombres après observation.',
      },
      {
        id: '3',
        question: 'Les Fiches Graphisme Maternelle et Coloriage à Imprimer Conviennent-elles pour Exercices Écriture Cursive?',
        answer: 'Absolument, les fiches graphisme maternelle préparent écriture cursive. Observation fine développe discrimination visuelle nécessaire. Les exercices intrus renforcent attention aux détails. Combinez avec fiches coloriage à imprimer pour motricité. Les exercices écriture cursive bénéficient de cette préparation. Après activité intrus, ajoutez tracés des mots. Les élèves CE1 écrivent noms des images observées. Graphisme maternelle et écriture cursive se complètent parfaitement. Les fiches maternelle évoluent en exercices écriture progressifs. Discrimination visuelle facilite reconnaissance formes des lettres.',
      },
      {
        id: '4',
        question: 'Combien de Fiches Maternelle Exercices Maths puis-je Créer avec Abonnement Accès Complet?',
        answer: 'Créations absolument illimitées avec abonnement Accès Complet. Générez autant de fiches maternelle que nécessaire quotidiennement. Les exercices maths se renouvellent infiniment toute année. Aucune restriction sur téléchargements ou exports. Vos exercices CE1 se créent sans limite jamais. Créez 10, 50, 100 fiches différentes par semaine. Parents de fratries génèrent pour tous enfants. Les fiches à imprimer gratuit couvrent tous besoins. Exercices tables de multiplication, graphisme maternelle, alphabet illimités. Le coloriage à imprimer se diversifie chaque jour.',
      },
      {
        id: '5',
        question: 'Peut-on Créer Exercices CE1 Apprendre à Lire et Alphabet en Plusieurs Langues Simultanément?',
        answer: 'Oui, interface disponible en 11 langues européennes. Créez exercices apprendre à lire multilingues instantanément. Les fiches alphabet bilingues français-anglais possibles. Parfait pour programmes immersion et écoles internationales. Les exercices CE1 enrichissent acquisition linguistique multiple. Bibliothèque d\'images traduite dans chaque langue. Recherchez "pomme" ou "apple" selon besoin. Les fiches maternelle s\'adaptent contextes multilingues facilement. Exercices tables de multiplication en langue cible. Le graphisme maternelle universel transcende barrières linguistiques.',
      },
      {
        id: '6',
        question: 'Les Exercices Conviennent-ils pour Élèves avec Difficultés Apprentissage Tables de Multiplication et Écriture?',
        answer: 'Parfaitement adaptables aux besoins spécifiques ULIS SEGPA. Mode Identique simplifie tâche pour troubles attention. Les exercices tables de multiplication deviennent visuels concrets. Images grandes et claires facilitent discrimination. Les fiches maternelle s\'ajustent tous profils cognitifs. Différenciez finement selon capacités individuelles de chaque élève. Trois exercices simples grand format pour débutants. Huit exercices complexes pour élèves avancés. Les exercices CE1 deviennent accessibles tous niveaux. Graphisme maternelle et écriture cursive se graduent progressivement.',
      },
      {
        id: '7',
        question: 'Puis-je Vendre Fiches Graphisme Maternelle Coloriage et Exercices Alphabet sur Teachers Pay Teachers?',
        answer: 'Absolument, licence commerciale Accès Complet incluse automatiquement. Vendez toutes fiches graphisme maternelle créées légalement. Les exercices alphabet, coloriage à imprimer monétisables immédiatement. Aucuns frais licence supplémentaires requis jamais. Vos fiches maternelle deviennent produits commerciaux rentables. Qualité 300 DPI professionnelle justifie prix premium. Les exercices CE1 se vendent excellemment autres enseignants. Fiches apprendre à lire très demandées sur plateformes. Exercices tables de multiplication et écriture cursive populaires. Vos fiches à imprimer gratuit génèrent revenus passifs. Teachers Pay Teachers, Etsy, Amazon KDP autorisés.',
      },
      {
        id: '8',
        question: 'Comment Combiner ces Fiches avec Autres Exercices Maths Écriture pour Cahiers Complets?',
        answer: 'Votre abonnement Accès Complet inclut 30+ générateurs. Combinez fiches maternelle intrus avec autres activités. Les exercices maths incluent additions, soustractions, tables multiplication. Graphisme maternelle avec tracés, formes, motifs disponibles. Exercices écriture cursive, alphabet, apprendre à lire variés. Créez cahiers progressifs pour toute année scolaire. Page 1 fiches intrus, page 2 coloriage à imprimer. Page 3 exercices maths, page 4 graphisme maternelle. Les exercices CE1 alphabet s\'assemblent logiquement. Vos fiches à imprimer gratuit deviennent ressources ultra-complètes.',
      },
      {
        id: '9',
        question: 'Quelle Différence entre Mode Identique et Similaire pour Exercices Apprendre à Lire Alphabet?',
        answer: 'Mode Identique utilise un seul thème d\'images. Trois images identiques et une légèrement différente. Parfait pour exercices alphabet débutants en maternelle. Les fiches apprendre à lire se concentrent observation fine. Différences subtiles développent discrimination visuelle précise. Mode Similaire compare deux thèmes différents. Trois images Thème A et une Thème B. Les exercices CE1 deviennent plus complexes logiquement. Parfait pour catégorisation et raisonnement abstrait. Les fiches maternelle progressent en difficulté naturellement. Combinez modes sur même fiche pour différenciation.',
      },
      {
        id: '10',
        question: 'Quel Est le Coût de l\'Abonnement Accès Complet?',
        answer: 'L\'abonnement Accès Complet coûte 240€ par an ou 25€ par mois. Votre abonnement vous donne accès aux 33 types de générateurs de fiches. Créez des fiches illimitées sans frais supplémentaires par fiche. La licence commerciale est incluse pour vendre vos créations. Le support de 11 langues et l\'export 300 DPI sont inclus. Garantie satisfait ou remboursé 30 jours. Comparez avec les 150 à 300€ par an que coûtent les services de traduction seuls pour les enseignants multilingues.',
      },
    ],
  },

  // Pricing - Accès Complet Bundle for Odd One Out
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

  // Related Apps
  relatedApps: {
    sectionTitle: 'Combinez avec D\'Autres Générateurs de Fiches',
    sectionDescription: 'Votre abonnement Accès Complet inclut 33 générateurs complémentaires. Combinez les fiches intrus avec d\'autres outils pour créer des séquences pédagogiques complètes.',
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
        slug: 'find-objects',
        name: 'Cherche les Objets',
        category: 'Observation',
        icon: '👁️',
        description: 'Combinez avec le générateur Cherche les Objets pour une pratique complète de discrimination visuelle. Les deux activités développent l\'attention aux détails et le raisonnement logique.',
      },
      {
        id: '2',
        slug: 'coloring',
        name: 'Coloriage',
        category: 'Créativité',
        icon: '🎨',
        description: 'Le générateur de pages de coloriage complète parfaitement les activités intrus. Les enfants colorient après avoir trouvé l\'intrus. La séquence devient immersive et mémorable.',
      },
      {
        id: '3',
        slug: 'find-and-count',
        name: 'Cherche et Compte',
        category: 'Mathématiques',
        icon: '🔢',
        description: 'Combinez la discrimination visuelle avec le comptage. Les élèves trouvent des objets puis comptent les quantités. Parfait pour développer simultanément l\'attention visuelle et les compétences numériques.',
      },
      {
        id: '4',
        slug: 'matching-app',
        name: 'Association',
        category: 'Logique',
        icon: '🔗',
        description: 'Le générateur d\'association développe les compétences de correspondance visuelle. Combinez avec les fiches intrus pour une pratique complète de perception visuelle.',
      },
      {
        id: '5',
        slug: 'word-search',
        name: 'Mots Cachés',
        category: 'Langage',
        icon: '🔍',
        description: 'Associez les fiches intrus avec le générateur de mots mêlés. Les enfants cherchent d\'abord l\'intrus puis retrouvent les noms correspondants dans la grille.',
      },
      {
        id: '6',
        slug: 'drawing-lines',
        name: 'Tracé de Lignes',
        category: 'Graphisme',
        icon: '✏️',
        description: 'Le générateur de tracé de lignes développe la motricité fine. Combinez avec les fiches intrus pour une séance équilibrée entre concentration visuelle et geste graphique.',
      },
    ],
  },
};

export default oddOneOutFrContent;
