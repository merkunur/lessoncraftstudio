import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Find Objects Worksheets - French Content
 *
 * File: frontend/content/product-pages/fr/find-objects-worksheets.ts
 * URL: /fr/apps/cherche-objets-fiches (French SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/French/find-objects.md
 * App ID: find-objects (Visual discrimination / I Spy worksheets)
 * Bundle: Accès Complet ($240/year) - NOT Pack Essentiel
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const findObjectsFrContent: ProductPageContent = {
  // SEO Metadata - French language-specific
  seo: {
    slug: 'cherche-objets-fiches',
    appId: 'find-objects',
    title: 'Fiches à Imprimer Gratuit | Générateur de Fiches Maternelle pour Apprendre à Lire',
    description: 'Créez des fiches professionnelles de discrimination visuelle avec notre générateur. Votre abonnement Accès Complet vous donne un accès illimité. Téléchargez des PDF haute qualité en moins de 3 minutes.',
    keywords: 'fiches à imprimer gratuit, fiches maternelle, exercices CP, discrimination visuelle, je vois, intrus, graphisme maternelle, coloriage à imprimer, apprendre à lire, alphabet',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fr/apps/cherche-objets-fiches',
  },

  // Hero Section - FULL text from find-objects.md paragraphs 1-4
  hero: {
    title: 'Fiches Cherche les Objets',
    subtitle: 'Générateur de Fiches Maternelle pour Discrimination Visuelle',
    description: `Créez des fiches professionnelles de discrimination visuelle avec notre générateur. Votre abonnement Accès Complet vous donne un accès illimité sans frais par fiche. Générez des fiches maternelle personnalisées parfaites pour les exercices CP et Grande Section. Téléchargez des PDF haute qualité en moins de 3 minutes.

Notre créateur de fiches à imprimer gratuit aide les enseignants à créer deux types d'activités visuelles. Le mode Je Vois invite les élèves à trouver des objets cachés parmi des distracteurs. Le mode Intrus demande aux enfants d'identifier les images non appariées. Les deux formats conviennent aux fiches maternelle et exercices CP avec niveaux de difficulté ajustables.

L'abonnement Accès Complet inclut les 33 types de générateurs de fiches. Créez des activités de discrimination visuelle combinées avec des exercices maths, apprendre à lire, et alphabet. Votre abonnement comprend la licence commerciale pour vendre vos fiches sur Teachers Pay Teachers et Etsy. La qualité professionnelle 300 DPI garantit une impression parfaite à chaque fois.

Les enseignants utilisent notre générateur pour développer les compétences de perception visuelle chez les jeunes apprenants. Les enseignants de maternelle créent des fiches simples avec moins d'objets pour développer l'attention. Les enseignants de CP conçoivent des fiches complexes avec plus d'objets et des distracteurs difficiles. Toutes les fiches se téléchargent en PDF prêtes pour la classe ou la vente commerciale.`,
    previewImageSrc: '/samples/english/find objects/find objects portrait.jpeg',
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

  // Sample Gallery - REAL file paths from samples/english/find objects/
  samples: {
    sectionTitle: 'Exemples de Fiches Cherche les Objets',
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
        worksheetSrc: '/samples/english/find objects/find objects portrait.jpeg',
        answerKeySrc: '/samples/english/find objects/find objects portrait answer_key.jpeg',
        altText: 'Fiche cherche les objets format portrait pour maternelle avec corrigé',
        pdfDownloadUrl: '/samples/english/find objects/find objects portrait.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/english/find objects/find objects landscape.jpeg',
        answerKeySrc: '/samples/english/find objects/find objects landscape answer_key.jpeg',
        altText: 'Fiche cherche les objets format paysage pour exercices CP avec corrigé',
        pdfDownloadUrl: '/samples/english/find objects/find objects landscape.pdf',
      },
    ],
  },

  // Features Grid - FULL text from find-objects.md feature sections
  features: {
    sectionTitle: 'Fonctionnalités du Générateur - Fiches Maternelle et Exercices CP Personnalisables',
    sectionDescription: 'Notre générateur de discrimination visuelle offre une personnalisation complète pour créer des fiches maternelle et exercices CP. La plateforme inclut deux modes d\'activité distincts avec des outils d\'édition professionnels. Les enseignants créent des fiches à imprimer gratuit pour la pratique de la perception visuelle en moins de trois minutes. L\'abonnement Accès Complet débloque toutes les fonctionnalités sur 33 types de générateurs incluant exercices maths, alphabet, et apprendre à lire.',
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
        icon: '👁️',
        title: 'Créer des Fiches Maternelle en Deux Modes - Je Vois et Intrus',
        description: `Choisissez entre deux formats éprouvés de discrimination visuelle pour fiches maternelle et exercices CP. Le mode Je Vois demande aux élèves de trouver 1 à 5 objets cachés parmi 8 à 12 images distractrices. Les enfants entourent ou marquent les objets cachés qu'ils découvrent. Les enseignants contrôlent combien d'objets cacher selon les capacités des élèves. Le mode Intrus invite les élèves à identifier 1 à 3 images non appariées parmi 8 à 12 paires assorties. Les enfants trouvent quelles images apparaissent sans partenaire correspondant.

Les deux modes ajustent la difficulté pour différents niveaux de classe. Les fiches maternelle utilisent moins d'objets avec des différences visuelles claires. Commencez avec 1 à 2 objets cachés pour les petits de maternelle débutants. Les exercices CP augmentent la complexité avec plus d'objets et variations subtiles. Les grands de CP peuvent gérer 4 à 5 objets cachés ou 3 images intrus. Basculez entre les modes instantanément pour créer des fiches à imprimer gratuit variées pour votre classe. Chaque mode génère un corrigé correspondant montrant la solution.`,
        highlighted: true,
      },
      {
        id: '2',
        icon: '✏️',
        title: 'Éditez Tout sur le Canevas - Personnalisation Complète',
        description: `Déplacez n'importe quel objet n'importe où sur votre canevas de fiche. Cliquez et maintenez n'importe quelle image pour la repositionner précisément. Faites pivoter les images à n'importe quel angle pour un placement naturel et des orientations variées. Redimensionnez les objets plus grands ou plus petits pour créer une hiérarchie visuelle et emphase. Agrandissez les objets importants pour attirer l'attention. Réduisez les éléments décoratifs pour éviter de surcharger la page. Verrouillez des objets individuels pour empêcher les modifications accidentelles pendant l'édition. Les objets verrouillés ne peuvent pas bouger tant que vous ne les déverrouillez pas.

Ces fonctionnalités d'édition fonctionnent sur tous les types de fiches incluant exercices maths, apprendre à lire, et alphabet. Les contrôles de calques permettent d'amener les objets vers l'avant ou de les envoyer vers l'arrière. Les images superposées s'organisent correctement avec une superposition appropriée. Les outils d'alignement aident à centrer les objets ou à les aligner sur les bords de page. Alignez plusieurs objets sélectionnés entre eux pour des mises en page soignées. Centrez les éléments importants sur la page en un clic. Les capacités d'édition professionnelles garantissent que vos fiches maternelle et exercices CP paraissent soignées et intentionnelles.`,
        highlighted: false,
      },
      {
        id: '3',
        icon: '📤',
        title: 'Téléversez des Images Personnalisées pour Fiches à Imprimer',
        description: `Téléversez vos propres images pour personnaliser n'importe quelle fiche. Le téléversement multi-fichiers accepte simultanément les formats JPEG, PNG et GIF. Combinez les images téléversées avec notre bibliothèque de 3000+ images dans la même fiche. Créez des fiches présentant les prénoms de vos élèves écrits de leur écriture manuscrite. Téléversez des photos d'objets de classe pour la pratique de vocabulaire pertinent. Parfait pour créer des exercices de graphisme maternelle avec des formations de lettres personnalisées spécifiques à votre programme.

Utilisez des photos d'élèves dans des fiches à imprimer gratuit pour l'engagement et la reconnaissance accrus. Téléversez des images d'événements scolaires pour des fiches saisonnières. Ajoutez des images de mascotte ou logos d'école pour des supports de marque. Les téléversements personnalisés fonctionnent parfaitement avec tous les types de fiches et fonctionnalités d'édition. Les images persistent tout au long de votre session et s'intègrent aux outils de sélection thématique. Mélangez librement les images téléversées avec les images de bibliothèque. Les enseignants créent des fiches à imprimer gratuit vraiment personnalisées reflétant leur environnement de classe unique et les intérêts des élèves.`,
        highlighted: false,
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Créer des Fiches en 11 Langues - Parfait pour Apprendre à Lire',
        description: `Générez des fiches en anglais, allemand, français, espagnol, portugais, italien, néerlandais, suédois, danois, norvégien ou finnois. La bibliothèque d'images change selon la langue sélectionnée pour une exposition de vocabulaire authentique. Les noms de fichiers d'images apparaissent dans la langue cible pour la construction de vocabulaire et la reconnaissance de mots. Les élèves voient "manzana" pour les images de pommes en espagnol ou "Apfel" en allemand.

Cette fonctionnalité transforme les exercices CP et fiches pour apprendre à lire en instruction FLE. Les enseignants FLE créent des fiches de vocabulaire visuel avec des étiquettes en langue cible. Les enseignants de langues du monde créent des supports de pratique de vocabulaire authentiques sans traduction. Les classes bilingues génèrent des fiches maternelle en plusieurs langues pour les programmes d'immersion bilingue. Les écoles internationales accèdent à des images culturellement appropriées pour tous les niveaux et origines linguistiques. Les programmes de langue patrimoniale utilisent des images en langue maternelle pour la connexion culturelle. Le support de 11 langues rend ce générateur essentiel pour apprendre à lire et exercices CP dans des contextes éducatifs divers et des classes multilingues.`,
        highlighted: false,
      },
      {
        id: '5',
        icon: '💰',
        title: 'Licence Commerciale Incluse - Vendez sur Teachers Pay Teachers',
        description: `L'abonnement Accès Complet inclut la licence commerciale d'impression à la demande sans frais supplémentaires. Vendez des fiches sur Teachers Pay Teachers, Etsy et Amazon KDP sans frais additionnels. Aucun frais de licence supplémentaire au-delà de votre abonnement annuel de 240€. D'autres plateformes facturent 79 à 199€ annuellement pour les droits commerciaux. Votre abonnement Accès Complet inclut la licence commerciale pour tout ce que vous créez.

Créez du coloriage à imprimer combiné avec des activités de discrimination visuelle pour un attrait produit plus large. Emballez des fiches alphabet avec des thèmes de discrimination visuelle pour des ensembles d'apprentissage de l'alphabet. Concevez des packs de fiches saisonnières combinant plusieurs types de générateurs. La qualité professionnelle 300 DPI garantit que vos produits paraissent parfaits quand les clients les impriment à domicile ou dans des imprimeries commerciales. Beaucoup d'enseignants gagnent 500 à 5000€ mensuellement en vendant des fiches à imprimer gratuit comme revenu passif. Construisez une boutique Teachers Pay Teachers utilisant des fiches que vous générez en minutes. Aucune attribution requise sur les fiches vendues pour une présentation professionnelle. La licence commerciale couvre les 33 types de générateurs pour une variété de produits et un potentiel de revenu maximum.`,
        highlighted: true,
      },
      {
        id: '6',
        icon: '🎨',
        title: 'Accédez à 3000+ Images pour Fiches à Imprimer',
        description: `Parcourez plus de 3000 images adaptées aux enfants organisées par thème. Filtrez les images par catégorie ou recherchez par mot-clé pour des objets spécifiques. Sélectionnez des thèmes entiers pour une génération rapide de fiche en un clic. Choisissez des images individuelles pour un contrôle précis sur le contenu de la fiche. Chaque image fonctionne dans les 11 langues supportées avec des étiquettes appropriées.

La bibliothèque inclut animaux, objets, nourriture, véhicules, formes et concepts éducatifs. Les options thématiques couvrent sujets de classe, saisons, vacances et normes du programme. La sélection thématique remplit automatiquement les fiches avec des images cohésives correspondant à votre plan de leçon. La sélection manuelle vous donne un contrôle créatif complet pour des sujets spécialisés. La sélection combinée vous permet de commencer avec un thème puis d'ajouter des images spécifiques pour la personnalisation. La fonctionnalité de recherche vous aide à trouver exactement les bonnes images rapidement. Cette bibliothèque extensive garantit que vos fiches maternelle et exercices CE1 incluent toujours des visuels appropriés et engageants soutenant les objectifs d'apprentissage.`,
        highlighted: false,
      },
      {
        id: '7',
        icon: '🖨️',
        title: 'Export Professionnel 300 DPI pour Exercices Maths',
        description: `Téléchargez les fiches en fichiers JPEG ou PDF haute résolution. La qualité professionnelle 300 DPI garantit une impression nette sur n'importe quelle imprimante. Le texte reste net et les images s'impriment clairement en taille réelle. L'option de conversion en niveaux de gris réduit la consommation d'encre pour les classes à budget serré. Convertissez les fiches couleur en niveaux de gris avec une case à cocher avant de télécharger.

Des options de téléchargement séparées pour fiches et corrigés gardent les fichiers organisés. Le format PDF préserve la mise en page exacte sur tous les appareils et imprimantes. Les élèves imprimant à la maison obtiennent des résultats identiques aux copies de classe. Le format JPEG fonctionne dans n'importe quel éditeur d'images pour une personnalisation supplémentaire avant impression. Importez les JPEG dans PowerPoint ou Google Slides pour des activités numériques. Qualité d'impression parfaite que vous créiez des exercices maths pour usage domestique ou écriture cursive pour vente commerciale sur Teachers Pay Teachers. La qualité d'export professionnelle égale les éditeurs éducatifs payants et les ressources de fiches premium. Téléchargez des fiches illimitées sans frais par téléchargement.`,
        highlighted: true,
      },
      {
        id: '8',
        icon: '🎯',
        title: 'Deux Modes d\'Activité Distincts',
        description: `Le mode Je Vois développe les compétences de recherche visuelle et d'attention soutenue. Les élèves scannent systématiquement l'image pour localiser les objets cachés. Cette activité renforce la concentration et la méthodologie de recherche. Le mode Intrus développe les compétences de discrimination et de comparaison. Les élèves analysent les similitudes et différences entre les images. Cette activité renforce le raisonnement logique et l'attention aux détails.

Les deux modes s'adaptent facilement aux différents niveaux de développement. Ajustez le nombre d'objets selon les capacités individuelles des élèves. Modifiez la complexité visuelle en changeant les thèmes d'images. Les fiches générées incluent automatiquement un corrigé correspondant. Les enseignants vérifient rapidement le travail des élèves. Les parents utilisent les corrigés pour guider la pratique à domicile. Chaque mode génère des fiches prêtes pour l'impression immédiate.`,
        highlighted: false,
      },
    ],
  },

  // How-To Guide - FULL text from find-objects.md step sections
  howTo: {
    sectionTitle: 'Comment Créer des Fiches à Imprimer Gratuit en 5 Étapes Faciles',
    sectionDescription: 'Générez des fiches maternelle professionnelles et exercices CP en moins de trois minutes. Ce guide étape par étape montre comment créer des fiches de discrimination visuelle du début à la fin. Aucune compétence en conception requise pour créer des fiches à imprimer gratuit. Le flux de travail simplifié aide les enseignants à créer des exercices maths, apprendre à lire et alphabet efficacement. Suivez ces cinq étapes simples pour produire des fiches prêtes pour la classe ou la vente commerciale.',
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
        title: 'Sélectionner le Mode et les Images',
        description: `Ouvrez le générateur de discrimination visuelle et choisissez d'abord votre mode d'activité. Sélectionnez le mode Je Vois pour des fiches d'objets cachés traditionnelles. Choisissez le mode Intrus pour la pratique d'appariement et discrimination visuelle. Votre sélection détermine comment les élèves interagissent avec vos fiches maternelle et exercices CP. Le mode choisi affecte toute la structure de la fiche et les objectifs d'apprentissage.

Pour le mode Je Vois, sélectionnez d'abord 8 à 12 images distractrices de la bibliothèque. Parcourez par thème pour voir les images associées regroupées ensemble. Recherchez des objets spécifiques utilisant des mots-clés comme animaux ou véhicules. Choisissez ensuite 1 à 5 objets cachés que les élèves chercheront parmi les distracteurs. Commencez avec 1 à 2 objets cachés pour les petits de maternelle débutants. Utilisez 3 à 5 objets pour les grands de CP prêts pour les défis.

Pour le mode Intrus, sélectionnez soigneusement 8 à 12 paires d'images assorties. Chaque paire devrait paraître identique ou très similaire. Les élèves trouvent les images sans partenaire correspondant parmi les paires. Choisissez 1 à 3 images intrus qui apparaissent non appariées dans la mise en page.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Personnaliser la Configuration',
        description: `Sélectionnez d'abord votre format de page parmi Lettre ou A4. Choisissez l'orientation portrait pour des fiches standard qui s'insèrent dans les classeurs scolaires. Sélectionnez le paysage pour des mises en page visuelles plus larges quand vous avez besoin de plus d'espace horizontal. L'option taille personnalisée permet de spécifier les dimensions exactes en pixels pour des projets spéciaux. La configuration de page affecte tous les types de fiches incluant exercices maths, apprendre à lire et alphabet également.

Ajoutez ensuite un thème d'arrière-plan de la bibliothèque d'arrière-plans thématiques. Les images d'arrière-plan ajoutent de l'intérêt visuel aux fiches maternelle sans distraire des objectifs d'apprentissage. Choisissez des arrière-plans saisonniers pour les unités de vacances. Sélectionnez des arrière-plans éducatifs pour l'alignement du programme. Ajustez l'opacité d'arrière-plan si nécessaire utilisant le curseur.

Choisissez des thèmes de bordure pour encadrer professionnellement vos fiches à imprimer gratuit. Les bordures thématiques correspondent parfaitement aux unités saisonnières et sujets du programme. Les thèmes de bordure incluent vacances, saisons et motifs éducatifs.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Générer Votre Fiche',
        description: `Cliquez sur le bouton Créer pour générer automatiquement votre fiche. Le générateur organise toutes les images sélectionnées sur votre mise en page de page. Les objets cachés ou images intrus se placent aléatoirement parmi les autres images. L'auto-dimensionnement garantit que les images s'adaptent de manière appropriée sans chevauchement. Le moteur de mise en page crée des fiches maternelle et exercices CP équilibrées et d'apparence professionnelle en secondes.

Le générateur crée simultanément un corrigé montrant les solutions. Pour le mode Je Vois, les corrigés entourent ou mettent en évidence les objets cachés. Pour le mode Intrus, les corrigés marquent clairement les images non appariées. La fiche et le corrigé apparaissent dans des onglets séparés. Basculez entre les onglets pour prévisualiser les deux versions. Cette fonctionnalité d'auto-génération économise des heures comparé à la création manuelle de fiches.

Prévisualisez votre fiche avant de télécharger. Vérifiez que les images se sont placées correctement et les instructions apparaissent clairement. Vérifiez que le corrigé marque les bons objets.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Éditer sur le Canevas',
        description: `Cliquez sur n'importe quel objet sur votre fiche pour le sélectionner pour l'édition. Des poignées de sélection apparaissent autour des objets cliqués vous montrant que vous pouvez les éditer. Déplacez les objets sélectionnés vers de nouvelles positions n'importe où sur la page en cliquant et maintenant. Faites pivoter les images à différents angles pour une variété visuelle et une apparence naturelle. Cliquez et faites glisser les poignées de rotation pour faire tourner les objets. Redimensionnez les objets plus grands ou plus petits en faisant glisser les poignées de coin.

Les contrôles de calque ajustent quels objets apparaissent devant les autres lors du chevauchement. Amenez les éléments importants vers l'avant utilisant le bouton Amener au Premier Plan. Envoyez les éléments décoratifs vers l'arrière utilisant les contrôles Envoyer à l'Arrière. Alignez plusieurs objets sélectionnés entre eux pour des mises en page soignées. Utilisez les outils d'alignement pour centrer les objets sur la page en un clic.

Ajoutez ou modifiez des éléments de texte directement sur le canevas utilisant les contrôles de texte. Changez les propriétés de police, taille, couleur et contour pour le texte sélectionné dans la barre latérale.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Télécharger et Imprimer',
        description: `Sélectionnez votre format de téléchargement du menu déroulant Télécharger. Choisissez JPEG pour une compatibilité maximale avec les éditeurs d'images. Sélectionnez PDF pour une impression cohérente sur tous les appareils. Les deux formats exportent en qualité professionnelle 300 DPI. Vos fiches apprendre à lire et alphabet s'impriment parfaitement sur n'importe quelle imprimante.

Téléchargez la fiche et le corrigé séparément pour une gestion de fichiers organisée. Chacun se télécharge comme fichier individuel. Activez la conversion en niveaux de gris avant de télécharger pour économiser les coûts d'impression en classe. Les niveaux de gris maintiennent la clarité tout en réduisant la consommation d'encre couleur. Parfait pour l'impression de fiches en gros volume.

Imprimez les fiches téléchargées immédiatement ou enregistrez-les pour une utilisation ultérieure. Les fichiers PDF s'ouvrent dans n'importe quel lecteur PDF. Les fichiers JPEG s'ouvrent dans n'importe quel visualiseur ou éditeur d'images. Partagez des fichiers numériques avec les parents pour la pratique à domicile. Téléversez vers des systèmes de gestion d'apprentissage pour l'apprentissage à distance.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from find-objects.md use case sections
  useCases: {
    sectionTitle: 'Parfait pour Enseignants, Parents et Éducateurs',
    sectionDescription: 'Les fiches de discrimination visuelle servent divers contextes éducatifs et styles d\'enseignement. Les enseignants de maternelle utilisent des fiches d\'objets cachés pour développer l\'attention. Les enseignants de CP développent des compétences avancées de perception visuelle. Les parents en instruction à domicile créent des supports d\'apprentissage personnalisés. Les enseignants FLE développent le vocabulaire par contexte visuel. Les enseignants spécialisés adaptent les niveaux de difficulté aux besoins individuels. Les enseignants entrepreneurs génèrent des revenus en vendant des fiches à imprimer gratuit. Le générateur soutient tous ces utilisateurs avec une personnalisation flexible et une qualité de sortie professionnelle.',
    badgeText: 'Pour Qui',
    readMoreLabel: 'Lire la suite',
    showLessLabel: 'Voir moins',
    items: [
      {
        id: '1',
        icon: '👶',
        title: 'Enseignants de Maternelle',
        subtitle: 'Fiches à Imprimer Gratuit et Graphisme Maternelle pour l\'Apprentissage Précoce',
        description: `Les enseignants de maternelle s'appuient sur les activités de discrimination visuelle pour le développement cognitif. Les fiches d'objets cachés développent la capacité d'attention chez les élèves de 3 à 6 ans. Les paquets de travail du matin incluent des fiches maternelle aux côtés du graphisme maternelle et activités d'alphabet. Les élèves pratiquent l'attention soutenue en cherchant des objets cachés. L'activité ressemble au jeu tout en développant des compétences pré-lecture critiques.

Utilisez le mode Je Vois avec 1 à 2 objets cachés pour les élèves de Petite et Moyenne Section débutants. Des fiches simples avec des différences visuelles claires fonctionnent mieux au premier trimestre. Augmentez à 3 objets cachés au printemps quand la capacité d'attention se développe. Combinez les fiches d'objets cachés avec le graphisme maternelle pour une pratique complète de littératie. Le support de 11 langues aide les enseignants de maternelle dans les programmes bilingues à créer des supports culturellement adaptés.

Téléversez des photos d'objets de classe pour créer des fiches familières. Les élèves reconnaissent leurs propres jouets et matériel de classe dans les fiches. Cette connexion personnelle augmente considérablement l'engagement.`,
        quote: 'Mes élèves adorent chercher les objets cachés !',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Enseignants de CP et CE1',
        subtitle: 'Exercices CP avec Exercices Maths et Apprendre à Lire Combinés',
        description: `Les enseignants de CP utilisent des fiches d'objets cachés pour une discrimination visuelle plus avancée. Les élèves gèrent 3 à 5 objets cachés avec des différences subtiles. Le mode Intrus défie les élèves de CP à identifier des images non appariées parmi de nombreuses paires. Cette complexité correspond au développement cognitif des apprenants de 6 à 8 ans. Les classes de CP intègrent la discrimination visuelle avec le contenu académique.

Combinez les fiches d'objets cachés avec des exercices maths pour une pratique transversale. Cachez des nombres parmi des images pour des activités à double objectif. Les élèves trouvent des objets cachés ET comptent des éléments simultanément. Superposez des concepts d'apprendre à lire en utilisant des images commençant par des sons de lettres cibles. Cachez trois éléments commençant par "B" parmi d'autres objets. Les élèves pratiquent simultanément la discrimination visuelle et la conscience phonologique.

Utilisez des fiches d'objets cachés pour les activités de ceux qui finissent tôt. Les travailleurs rapides reçoivent des fiches difficiles pendant que d'autres terminent les devoirs principaux.`,
        quote: 'La discrimination visuelle prépare parfaitement les compétences de lecture.',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Parents en Instruction à Domicile',
        subtitle: 'Coloriage à Imprimer et Écriture Cursive pour l\'Enseignement Multi-Niveaux',
        description: `Les parents en instruction à domicile ont besoin de supports flexibles pour plusieurs enfants à différents niveaux. Le générateur d'objets cachés crée des fiches adaptées à l'âge pour chaque enfant. Les enfants de cinq ans reçoivent des fiches Je Vois simples. Les enfants de huit ans reçoivent des défis Intrus complexes. Un abonnement sert toute la famille en instruction à domicile sur plusieurs niveaux scolaires. Les parents créent du coloriage à imprimer et écriture cursive utilisant d'autres générateurs sur la plateforme.

Téléversez des photos de famille pour créer des fiches personnalisées. Les enfants trouvent des images de frères et sœurs ou animaux domestiques cachés parmi d'autres images. Cette personnalisation rend l'apprentissage à domicile spécial et mémorable. Créez des unités thématiques correspondant aux intérêts familiaux et styles d'apprentissage. Les familles aimant les animaux utilisent des fiches thématiques créatures. Les enfants intéressés par les véhicules reçoivent des activités axées sur le transport.

Combinez les fiches d'objets cachés avec d'autres fiches à imprimer gratuit pour des leçons quotidiennes complètes. Le panier du matin inclut la discrimination visuelle aux côtés de la révision de maths.`,
        quote: 'Je peux adapter les fiches au niveau exact de chaque enfant.',
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Enseignants FLE',
        subtitle: 'Alphabet et Apprendre à Lire en 11 Langues',
        description: `Les enseignants FLE exploitent la bibliothèque d'images en 11 langues pour l'enseignement de vocabulaire authentique. Générez automatiquement des fiches dans la langue cible des élèves. Les apprenants d'espagnol voient "manzana" pour les images de pommes. Les étudiants allemands lisent "Apfel" pour les mêmes images. L'apprentissage de vocabulaire visuel se produit par exposition répétée d'images avec des étiquettes en langue maternelle. Cette approche accélère naturellement l'acquisition de langue seconde.

Créez des fiches d'objets cachés présentant des catégories de vocabulaire quotidien. La nourriture, les vêtements et les articles ménagers apparaissent dans des fiches thématiques. Les élèves pratiquent simultanément la discrimination visuelle et le vocabulaire. Les élèves FLE débutants utilisent le mode Je Vois avec des noms communs. Les apprenants avancés abordent Intrus avec des distinctions de vocabulaire subtiles. Le générateur sert efficacement tous les niveaux de compétence.

Combinez la discrimination visuelle avec l'alphabet et apprendre à lire pour un programme FLE complet. La discrimination visuelle développe des compétences d'observation nécessaires pour lire dans de nouveaux alphabets.`,
        quote: 'Les fiches deviennent un outil d\'apprentissage linguistique.',
      },
      {
        id: '5',
        icon: '💜',
        title: 'Enseignants Spécialisés',
        subtitle: 'Fiches Maternelle et Exercices CP pour l\'Apprentissage Différencié',
        description: `Les enseignants spécialisés adaptent les fiches d'objets cachés aux besoins des élèves individuels. Les activités de discrimination visuelle ciblent les objectifs PEI pour l'attention et la concentration. Commencez avec des fiches très simples utilisant seulement 1 objet caché parmi 4 à 5 distracteurs. Augmentez progressivement la complexité à mesure que les élèves démontrent la maîtrise. Le générateur permet un ajustement précis de la difficulté pour le niveau de compétence actuel de chaque élève.

Créez des fiches à contraste élevé pour les élèves avec des défis de traitement visuel. Utilisez des arrière-plans de couleur unie au lieu d'images thématiques. Agrandissez les objets cachés pour les élèves nécessitant un soutien visuel supplémentaire. Réduisez les objets totaux sur la page pour les élèves facilement submergés. Ces aménagements se font par de simples ajustements de paramètres. Les enseignants spécialisés créent des supports vraiment individualisés en minutes.

Combinez les objets cachés avec du coloriage à imprimer et fiches maternelle pour les pauses sensorielles. Les élèves terminent la discrimination visuelle puis colorient leur fiche.`,
        quote: 'La personnalisation répond à chaque besoin individuel.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Enseignants Entrepreneurs',
        subtitle: 'Exercices CP et Exercices Maths pour Ventes Teachers Pay Teachers',
        description: `Les enseignants entrepreneurs génèrent des revenus passifs en vendant des fiches à imprimer gratuit sur Teachers Pay Teachers. La licence commerciale couvre toutes les fiches créées avec votre abonnement Accès Complet. Aucuns frais supplémentaires au-delà de 240€ annuellement. Créez des gammes de produits entières en heures au lieu de semaines. Beaucoup de vendeurs gagnent 500 à 5000€ mensuellement en vendant des imprimables éducatifs.

Concevez des ensembles de fiches thématiques combinant plusieurs types d'activités. Emballez la discrimination visuelle avec des exercices CP couvrant diverses compétences. Créez des ensembles saisonniers pour la rentrée scolaire, Halloween, Noël et printemps. Groupez 10 à 20 fiches par produit pour des prix plus élevés. Le générateur crée des fiches de base en minutes. Ajoutez votre image de marque et descriptions de produit pour des listes polies.

Téléversez des graphiques personnalisés pour créer des produits uniques que les concurrents ne peuvent pas dupliquer. Combinez la discrimination visuelle avec des exercices maths pour des gammes de produits thématiques maths.`,
        quote: 'Mon abonnement s\'est rentabilisé dès le premier mois !',
      },
    ],
  },

  // FAQ Section - Selected FAQs from find-objects.md
  faq: {
    sectionTitle: 'Questions Fréquemment Posées - Fiches à Imprimer Gratuit et Exercices CP',
    sectionDescription: 'Les enseignants ont des questions pratiques avant d\'investir dans des outils de création de fiches. Cette section répond aux questions les plus courantes sur la création de fiches maternelle et exercices CP.',
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
        question: 'Puis-je Créer des Fiches Combinant Discrimination Visuelle avec Apprendre à Lire et Alphabet?',
        answer: 'Oui, combinez librement la discrimination visuelle avec d\'autres types de fiches sur la plateforme. L\'abonnement Accès Complet inclut 33 types de générateurs différents. Créez des fiches d\'objets cachés puis ajoutez des exercices alphabet sur la même page. Générez des activités apprendre à lire utilisant des images d\'objets cachés comme repères visuels. Téléversez des images de lettres pour créer des énigmes de discrimination visuelle axées sur l\'alphabet. Les enseignants FLE combinent fréquemment reconnaissance d\'objets avec construction de vocabulaire et identification de lettres.',
      },
      {
        id: '2',
        question: 'Comment Ajuster la Difficulté pour Différents Niveaux de Graphisme Maternelle?',
        answer: 'Ajustez la difficulté en changeant le nombre d\'objets et le contraste visuel. Pour les fiches graphisme maternelle de Petite Section, utilisez 1 à 2 objets cachés avec seulement 4 à 6 distracteurs totaux. Créez un contraste élevé en utilisant des formes et couleurs très différentes. Les jeunes élèves réussissent avec des différences visuelles évidentes et moins d\'encombrement de page. Pour les exercices maths de Grande Section et CP, augmentez à 3 à 5 objets cachés parmi 10 à 12 distracteurs. Utilisez des variations subtiles et des couleurs similaires pour accroître la difficulté.',
      },
      {
        id: '3',
        question: 'Le Générateur Soutient-il la Création de Coloriage à Imprimer et Écriture Cursive?',
        answer: 'Le générateur d\'objets cachés se concentre sur la discrimination visuelle mais se combine avec les générateurs coloriage à imprimer et écriture cursive sur la plateforme. Créez des fiches d\'objets cachés puis téléchargez en niveaux de gris pour une activité de coloriage combinée. Les élèves trouvent d\'abord les objets cachés puis colorient la fiche entière. Cette approche en deux étapes fournit des activités d\'attention prolongée et de motricité fine. L\'abonnement Accès Complet inclut des générateurs coloriage à imprimer et écriture cursive dédiés.',
      },
      {
        id: '4',
        question: 'Puis-je Utiliser ce Générateur pour Enseigner l\'Alphabet à Plusieurs Enfants?',
        answer: 'Absolument, l\'abonnement Accès Complet sert des familles entières et des classes complètes. Créez des versions différenciées de la même fiche alphabet pour différents niveaux d\'aptitude. Les élèves avancés reçoivent des fiches avec plus de lettres cachées et des distracteurs complexes. Les apprenants débutants obtiennent des fiches alphabet simplifiées avec moins d\'éléments et des différences claires. Générez des fiches illimitées sans frais par création ou téléchargement.',
      },
      {
        id: '5',
        question: 'Comment Fonctionne le Support de 11 Langues pour les Exercices Maths en FLE?',
        answer: 'La bibliothèque d\'images change automatiquement les noms de fichiers selon la langue sélectionnée. Choisissez français et toutes les images affichent des mots français. Basculez vers l\'espagnol et les mêmes images montrent des mots espagnols. Cette fonctionnalité sert les enseignants FLE créant des supports apprendre à lire dans plusieurs langues. Les élèves voient du vocabulaire authentique en langue cible sans interférence de traduction ou d\'anglais. Les 11 langues incluent anglais, allemand, français, espagnol, portugais, italien, néerlandais, suédois, danois, norvégien et finnois.',
      },
      {
        id: '6',
        question: 'Puis-je Vendre des Fiches Incluant Coloriage à Imprimer Commercialement?',
        answer: 'Oui, l\'abonnement Accès Complet inclut la licence commerciale d\'impression à la demande pour toutes les fiches créées. Vendez des fiches illimitées sur Teachers Pay Teachers, Etsy, Amazon KDP et d\'autres plateformes. Aucuns frais de licence supplémentaires au-delà de l\'abonnement annuel de 240€. Les concurrents facturent 79 à 199€ EN PLUS pour les droits commerciaux. Vos droits de licence commerciale couvrent tous les 33 types de générateurs incluant coloriage à imprimer et graphisme maternelle. Aucune attribution requise sur les fiches vendues.',
      },
      {
        id: '7',
        question: 'Quels Formats de Fichiers Supportent les Exercices Maths et Alphabet?',
        answer: 'Téléchargez les fiches en formats JPEG ou PDF haute résolution. Les deux formats exportent en qualité professionnelle 300 DPI pour une impression nette. Choisissez PDF pour une compatibilité universelle et une préservation de mise en page. Les PDF s\'ouvrent identiquement sur tous les appareils et systèmes d\'exploitation. Sélectionnez JPEG pour une édition maximale et flexibilité de plateforme. Importez les JPEG dans PowerPoint, Google Slides ou éditeurs d\'images pour une personnalisation supplémentaire. Les deux formats supportent la conversion en niveaux de gris pour économiser les coûts d\'impression.',
      },
      {
        id: '8',
        question: 'Combien de Temps Prend la Création de Fiches à Imprimer Gratuit?',
        answer: 'Les fiches complètes se génèrent en moins de 3 minutes du début au téléchargement. Sélectionnez vos images (30 secondes). Ajustez les paramètres de page et d\'arrière-plan (30 secondes). Cliquez Générer pour la création automatique de mise en page (10 secondes). Prévisualisez et apportez des ajustements d\'édition (60 secondes). Téléchargez en JPEG ou PDF (30 secondes). La plupart des enseignants créent 5 fiches hebdomadaires en 15 minutes totales. Comparez à la création traditionnelle prenant 30 à 60 minutes par fiche minimum.',
      },
      {
        id: '9',
        question: 'La Plateforme Fonctionne-t-elle pour l\'Éducation Spécialisée?',
        answer: 'Absolument, les fonctionnalités d\'ajustement de difficulté servent efficacement les élèves d\'éducation spécialisée. Créez des fiches très simplifiées utilisant seulement 1 objet caché parmi 3 à 4 distracteurs totaux. Utilisez des arrière-plans à contraste élevé pour les élèves avec des défis de traitement visuel. Agrandissez les objets pour les élèves nécessitant un soutien visuel supplémentaire. Réduisez l\'encombrement de page pour les élèves facilement submergés. Ces aménagements se créent par de simples ajustements de paramètres sans compétences spécialisées.',
      },
      {
        id: '10',
        question: 'Les Fiches Incluent-elles un Corrigé?',
        answer: 'Chaque fiche générée dispose de son corrigé automatique. Le corrigé affiche exactement les mêmes images que la fiche élève. Pour le mode Je Vois, les corrigés entourent ou mettent en évidence les objets cachés. Pour le mode Intrus, les corrigés marquent clairement les images non appariées. Les enseignants corrigent rapidement sans recompter manuellement. Téléchargez fiche et corrigé séparément au format de votre choix. Les parents utilisent les corrigés pour guider la pratique à domicile.',
      },
      {
        id: '11',
        question: 'Quel Est le Coût de l\'Abonnement Accès Complet?',
        answer: 'L\'abonnement Accès Complet coûte 240€ par an ou 25€ par mois. Votre abonnement vous donne accès aux 33 types de générateurs de fiches. Créez des fiches illimitées sans frais supplémentaires par fiche. La licence commerciale est incluse pour vendre vos créations. Le support de 11 langues et l\'export 300 DPI sont inclus. Garantie satisfait ou remboursé 30 jours. Comparez avec les 150 à 300€ par an que coûtent les services de traduction seuls pour les enseignants multilingues.',
      },
    ],
  },

  // Pricing - Accès Complet Bundle for Find Objects
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

  // Related Apps
  relatedApps: {
    sectionTitle: 'Combinez avec D\'Autres Générateurs de Fiches',
    sectionDescription: 'Votre abonnement Accès Complet inclut 33 générateurs complémentaires. Combinez la discrimination visuelle avec d\'autres outils pour créer des séquences pédagogiques complètes.',
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
        slug: 'find-and-count',
        name: 'Cherche et Compte',
        category: 'Mathématiques',
        icon: '🔢',
        description: 'Combinez la discrimination visuelle avec le comptage. Les élèves trouvent des objets puis comptent les quantités. Parfait pour développer simultanément l\'attention visuelle et les compétences numériques.',
      },
      {
        id: '2',
        slug: 'coloring',
        name: 'Coloriage',
        category: 'Créativité',
        icon: '🎨',
        description: 'Le générateur de pages de coloriage complète parfaitement les activités de discrimination visuelle. Les enfants colorient après avoir trouvé les objets cachés. La séquence devient immersive et mémorable.',
      },
      {
        id: '3',
        slug: 'odd-one-out',
        name: 'Intrus',
        category: 'Logique',
        icon: '🧩',
        description: 'Combinez avec le générateur Intrus pour une pratique complète de discrimination visuelle. Les deux activités développent l\'attention aux détails et le raisonnement logique.',
      },
      {
        id: '4',
        slug: 'matching-app',
        name: 'Association',
        category: 'Logique',
        icon: '🔗',
        description: 'Le générateur d\'association développe les compétences de correspondance visuelle. Combinez avec les objets cachés pour une pratique complète de perception visuelle.',
      },
      {
        id: '5',
        slug: 'word-search',
        name: 'Mots Cachés',
        category: 'Langage',
        icon: '🔍',
        description: 'Associez les objets cachés avec le générateur de mots mêlés. Les enfants cherchent d\'abord les images puis retrouvent les noms correspondants dans la grille.',
      },
      {
        id: '6',
        slug: 'drawing-lines',
        name: 'Tracé de Lignes',
        category: 'Graphisme',
        icon: '✏️',
        description: 'Le générateur de tracé de lignes développe la motricité fine. Combinez avec la discrimination visuelle pour une séance équilibrée entre concentration visuelle et geste graphique.',
      },
    ],
  },
};

export default findObjectsFrContent;
