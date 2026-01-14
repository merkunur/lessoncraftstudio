import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Word Search Worksheets - French Content
 *
 * File: frontend/content/product-pages/fr/word-search-worksheets.ts
 * URL: /fr/apps/mots-caches-fiches (French SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/French/wordsearch.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const wordSearchFrContent: ProductPageContent = {
  // SEO Metadata - French language-specific
  seo: {
    slug: 'mots-caches-fiches',
    appId: 'wordsearch',
    title: 'Générateur de Mots Mêlés Gratuit | Fiches à Imprimer Gratuit Maternelle et CP',
    description: 'Créez des mots mêlés professionnels avec notre générateur de fiches maternelle. Parfait pour les enseignants de maternelle, CP et CE1. Téléchargez des fiches à imprimer gratuit en PDF haute qualité en moins de trois minutes.',
    keywords: 'mots mêlés, générateur mots cachés, fiches maternelle, fiches à imprimer gratuit, exercices CP, apprendre à lire, alphabet, graphisme maternelle, tables de multiplication, coloriage à imprimer',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fr/apps/mots-caches-fiches',
  },

  // Hero Section - FULL text from wordsearch.md paragraphs 1-4
  hero: {
    title: 'Générateur de Mots Mêlés Gratuit',
    subtitle: 'Fiches à Imprimer Gratuit pour la Maternelle et le CP',
    description: `Créez des mots mêlés professionnels en quelques secondes avec notre générateur de fiches maternelle. Votre abonnement Pack Essentiel à 144€ par an vous donne un accès illimité sans filigrane. Parfait pour les enseignants de maternelle, les professeurs de CP et CE1, et les parents en instruction à domicile. Générez des puzzles de mots cachés personnalisés avec des images ou des mots en trois clics seulement. La version gratuite permet de tester l'outil avec un filigrane pour un usage personnel.

Notre outil de création de mots mêlés aide à concevoir des activités d'apprentissage captivantes pour les jeunes élèves. Choisissez parmi plus de 3000 images adaptées aux enfants et organisées par thème. Chaque fiche de mots mêlés se télécharge en PDF ou JPEG haute qualité à 300 DPI. Vos élèves adoreront chercher les mots cachés associés à des images colorées. Les fiches maternelle deviennent des outils pédagogiques professionnels. Les exercices CP et CE1 gagnent en attrait avec des visuels engageants.

Ce générateur de mots mêlés fonctionne en 11 langues complètes. Français, anglais, allemand, espagnol, portugais, italien, néerlandais, danois, suédois, norvégien et finnois. Sélectionnez un thème comme les animaux, les transports ou les fruits. L'application crée un puzzle complet avec sa fiche de correction automatique. Modifiez tout sur le canevas avant le téléchargement. Ajoutez du texte personnalisé avec différentes polices. Changez les couleurs et les arrière-plans. Téléversez vos propres images pour des fiches à imprimer gratuit personnalisées.`,
    previewImageSrc: '/samples/english/wordsearch/wordsearch portrait.jpeg',
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

  // Sample Gallery - REAL file paths from samples/english/wordsearch/
  samples: {
    sectionTitle: 'Exemples de Mots Mêlés',
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
        worksheetSrc: '/samples/english/wordsearch/wordsearch portrait.jpeg',
        answerKeySrc: '/samples/english/wordsearch/wordsearch portrait answer_key.jpeg',
        altText: 'Mots mêlés en format portrait avec images thématiques pour le vocabulaire maternelle',
        pdfDownloadUrl: '/samples/english/wordsearch/wordsearch portrait.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/english/wordsearch/wordsearch landscape.jpeg',
        answerKeySrc: '/samples/english/wordsearch/wordsearch landscape answer_key.jpeg',
        altText: 'Fiche de mots mêlés en format paysage avec indices visuels colorés pour le CP',
        pdfDownloadUrl: '/samples/english/wordsearch/wordsearch landscape.pdf',
      },
      {
        id: '3',
        worksheetSrc: '/samples/english/wordsearch/custom word list.jpeg',
        answerKeySrc: '/samples/english/wordsearch/custom word list answer_key.jpeg',
        altText: 'Mots mêlés avec liste de mots personnalisée pour la pratique de l\'orthographe et du vocabulaire',
        pdfDownloadUrl: '/samples/english/wordsearch/custom word list.pdf',
      },
    ],
  },

  // Features Grid - FULL text from wordsearch.md feature sections
  features: {
    sectionTitle: 'Fonctionnalités des Mots Mêlés - Fiches Maternelle et Exercices CP Professionnels',
    sectionDescription: 'Notre générateur de mots mêlés inclut toutes les fonctionnalités dont vous avez besoin. Créez des fiches à imprimer gratuit pour la maternelle et le CP. Le générateur est parfait pour créer des exercices de mathématiques et des fiches de vocabulaire.',
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
        title: 'Créez des Mots Mêlés en 3 Clics',
        description: `Générez des puzzles de mots mêlés en quelques secondes avec trois étapes simples. Sélectionnez un thème dans notre bibliothèque d'images. Cliquez sur générer pour créer votre fiche de mots cachés. Téléchargez votre document terminé immédiatement. Aucune compétence en design requise. Parfait pour les enseignants de maternelle et les professeurs de CP très occupés. Créez des fiches à imprimer gratuit pendant vos heures de préparation. Chaque mots mêlés prend moins de trois minutes du début à la fin.

Choisissez entre la sélection automatique de thème ou le choix manuel d'images. L'option thème aléatoire crée des fiches instantanées. Sélectionnez des images spécifiques pour des leçons de vocabulaire ciblées. Téléversez vos propres photos pour des mots mêlés personnalisés. Chaque méthode produit des fiches maternelle professionnelles. Les enseignants adorent la rapidité de ce générateur de mots mêlés.`,
        highlighted: false,
      },
      {
        id: '2',
        icon: '✏️',
        title: 'Modifiez Tout sur le Canevas',
        description: `Chaque élément de votre fiche de mots mêlés est entièrement modifiable. Cliquez sur n'importe quel texte pour changer les polices et les couleurs. Déplacez les images vers de nouvelles positions. Redimensionnez la grille de mots cachés. Supprimez les éléments dont vous n'avez pas besoin. Ajoutez du texte personnalisé n'importe où sur la page. Cette flexibilité crée des exercices CP et CE1 uniques à chaque fois.

Changez les couleurs d'arrière-plan pour correspondre aux thèmes de votre classe. Ajoutez des bordures de notre collection thématique. Ajustez l'opacité des arrière-plans et des bordures. Déplacez la liste de mots vers différentes positions. Modifiez les couleurs individuelles des lettres dans la grille. Agrandissez ou réduisez les images. Faites pivoter le texte et les images à n'importe quel angle. Vos fiches de mots mêlés correspondent exactement à vos attentes.

Les boutons annuler et rétablir corrigent les erreurs instantanément. Les contrôles de zoom aident à voir les petits détails. Les contrôles de calques amènent les éléments vers l'avant ou l'arrière. Verrouillez les éléments en place une fois positionnés correctement. Ces outils d'édition rivalisent avec les logiciels de design coûteux.`,
        highlighted: false,
      },
      {
        id: '3',
        icon: '📤',
        title: 'Téléversez Vos Propres Images',
        description: `Téléversez vos propres images pour créer des fiches de mots mêlés personnalisées. Utilisez des photos d'élèves pour la reconnaissance des prénoms. Ajoutez des images de sorties scolaires récentes. Incluez des photos de la mascotte de l'école ou des animaux de la classe. Téléversez des images de matériel de manipulation pour les exercices maths. La fonction de téléversement personnalisé rend chaque fiche unique.

Le téléversement multiple accepte tous les formats d'images courants. Les fichiers JPEG, PNG et GIF fonctionnent parfaitement. Téléversez plusieurs images à la fois. Combinez les images téléversées avec les images de la bibliothèque. Créez des mots mêlés mixtes avec des images personnelles et de stock. Vos images téléversées apparaissent immédiatement dans la zone de sélection.

Les enseignants utilisent les téléversements personnalisés pour du vocabulaire spécialisé. Téléversez des images d'équipement scientifique pour des mots mêlés STEM. Ajoutez des images d'instruments de musique pour les cours de musique. Incluez du matériel sportif pour le vocabulaire d'EPS. Cette fonctionnalité transforme les fiches génériques en matériel d'apprentissage personnalisé.`,
        highlighted: false,
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Support de 11 Langues',
        description: `Notre générateur de mots mêlés supporte 11 langues complètes. Français, anglais, allemand, espagnol, portugais, italien, néerlandais, danois, suédois, norvégien et finnois. L'interface et le contenu fonctionnent dans la langue choisie. Les noms d'images apparaissent dans votre langue sélectionnée sur les fiches. Cette fonctionnalité est essentielle pour les enseignants de FLE et les classes bilingues.

Le support linguistique est crucial pour les puzzles de mots mêlés. Les noms de fichiers des images deviennent les mots cachés. Une image de pomme affiche « pomme » en français. La même image affiche « apple » en anglais. Cela crée des fiches authentiques pour apprendre à lire dans n'importe quelle langue. Les élèves apprennent le vocabulaire et l'alphabet dans leur langue cible. Les enseignants utilisent un seul outil pour plusieurs classes de langues.

Créez des fiches pour apprendre les lettres en espagnol pour les programmes bilingues. Générez des exercices pour apprendre à lire en anglais pour les écoles d'immersion. Faites des fiches d'alphabet en portugais pour les cours de langue maternelle. Le sélecteur de langue change tout instantanément. Pas besoin d'outils séparés ou de traduction manuelle.`,
        highlighted: false,
      },
      {
        id: '5',
        icon: '💰',
        title: 'Licence Commerciale Disponible',
        description: `La version gratuite est pour un usage personnel en classe. Pour vendre des fiches, vous avez besoin d'un abonnement. Le Pack Essentiel coûte 144€ par an. L'Accès Complet coûte 240€ par an. Les deux abonnements incluent une licence commerciale print-on-demand.

Avec la licence commerciale, vous pouvez vendre sur Teachers Pay Teachers. Vendez sur Etsy comme produits numériques imprimables. Créez des cahiers d'activités pour Amazon KDP. Aucune attribution requise lorsque vous vendez vos fiches. C'est parfait pour les enseignants qui veulent créer un revenu complémentaire.

La licence commerciale inclut une qualité professionnelle 300 DPI. Les fiches sont prêtes à imprimer pour la publication professionnelle. Supprimez le filigrane avec un abonnement. Créez un nombre illimité de fiches sans frais supplémentaires par fiche. Cela permet d'économiser des centaines d'euros par rapport aux concurrents qui facturent par design.`,
        highlighted: true,
      },
      {
        id: '6',
        icon: '🎨',
        title: 'Bibliothèque de 3000+ Images',
        description: `Plus de 3000 images adaptées aux enfants organisées par thème. Chaque image est parfaite pour la maternelle et le primaire. Les images couvrent tous les sujets d'enseignement courants. Trouvez des images pour les fiches de mathématiques, l'apprentissage de l'alphabet et plus encore. Toutes les images sont incluses sans coût supplémentaire.

L'organisation thématique facilite la recherche des bonnes images. Choisissez des thèmes comme les animaux, la nourriture, les véhicules ou les saisons. Recherchez des images spécifiques avec la fonction de recherche. Filtrez les images par thème pour des résultats plus rapides. Parfait pour créer rapidement des fiches thématiques.

La bibliothèque d'images comprend des images pour les nombres et les chiffres. Trouvez des images pour les exercices d'addition et de soustraction. Créez des exercices de mathématiques avec un contenu visuellement engageant. Les images peuvent également être utilisées comme coloriages que les enfants colorient après avoir résolu le puzzle. Combinez les mots mêlés avec des exercices de motricité fine pour un apprentissage complet.`,
        highlighted: false,
      },
      {
        id: '7',
        icon: '🖨️',
        title: 'Qualité Professionnelle 300 DPI',
        description: `Toutes les fiches s'exportent en qualité professionnelle 300 DPI. Cela garantit des impressions nettes sur toutes les imprimantes. Parfait pour créer des fiches à imprimer gratuit qui ont l'air professionnelles. Choisissez entre les formats JPEG et PDF pour le téléchargement. Les deux formats conservent la qualité 300 DPI complète.

Le format PDF est parfait pour la distribution numérique. Envoyez des fiches par email aux parents et aux élèves. Le format JPEG est idéal pour l'insertion dans d'autres documents. Utilisez le JPEG pour créer des présentations avec vos fiches. Les deux formats fonctionnent parfaitement pour l'impression à domicile ou à l'école.

L'option niveaux de gris économise l'encre lors de l'impression. Choisissez les niveaux de gris pour convertir les fiches couleur en noir et blanc. C'est parfait lorsque vous imprimez de grandes quantités. Les fiches restent claires et lisibles en niveaux de gris. Utilisez cette option pour créer des fiches économiques pour toute la classe.`,
        highlighted: true,
      },
    ],
  },

  // How-To Guide - FULL text from wordsearch.md step sections
  howTo: {
    sectionTitle: 'Comment Créer des Fiches à Imprimer Gratuit en 5 Étapes Simples',
    sectionDescription: 'Créez des puzzles de mots mêlés professionnels en moins de trois minutes au total. Suivez ces cinq étapes simples pour générer des fiches maternelle professionnelles. Aucune expérience en design requise. Sélectionnez simplement des images, personnalisez les paramètres et téléchargez.',
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
        title: 'Choisissez Votre Contenu',
        description: `Commencez par sélectionner des images pour votre puzzle de mots mêlés. Trois méthodes vous offrent une flexibilité complète. Choisissez un thème aléatoire pour une génération instantanée de fiches. Parcourez la bibliothèque de plus de 3000 images pour des photos spécifiques. Téléversez vos propres images pour des fiches maternelle personnalisées. Chaque méthode produit des résultats professionnels. Les enseignants alternent entre les méthodes selon les besoins de leurs leçons.

L'option thème aléatoire crée des fiches en quelques secondes. Cliquez sur le menu déroulant. Sélectionnez « Utiliser un thème aléatoire » et cliquez sur générer. L'application choisit automatiquement un thème. Parfait pour les plans de remplacement d'urgence ou les activités de dernière minute. Vous obtenez une fiche de mots mêlés complète sans aucune décision. Les thèmes aléatoires fonctionnent bien pour la pratique générale du vocabulaire.

La sélection individuelle d'images vous donne un contrôle précis. Ouvrez le panneau de la bibliothèque d'images. Choisissez une catégorie thématique pour filtrer les images. Animaux, transports, nourriture, fournitures scolaires et des dizaines d'autres thèmes disponibles. Recherchez par mot-clé pour trouver des images spécifiques. Sélectionnez jusqu'à huit images en cliquant sur chacune. Cette méthode crée des fiches pour apprendre à lire ciblées et du matériel spécifique au vocabulaire.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Personnalisez les Paramètres',
        description: `Configurez vos paramètres de mots mêlés avant de générer. La taille de la grille détermine la difficulté du puzzle. Les grilles plus petites conviennent aux fiches maternelle. Les grilles plus grandes challengent les élèves de CP et CE1. Ajustez les lignes et les colonnes indépendamment. Définissez n'importe quelle taille de 5x5 à 30x30 cases. L'application mémorise vos paramètres préférés pour les futures fiches.

Choisissez les options de direction du puzzle pour contrôler la difficulté. Activez les mots en diagonale pour plus de défi. Autorisez les mots inversés pour augmenter la complexité. Désactivez les deux options pour les lecteurs débutants. Ces paramètres créent des fiches de graphisme maternelle et des exercices adaptés à l'âge. Les enseignants de maternelle désactivent généralement la diagonale et l'inversion. Les professeurs de CP et CE1 activent la diagonale pour les élèves avancés.

Sélectionnez votre format et taille de page. Le format A4 portrait est idéal pour les écoles utilisant des standards européens. L'orientation paysage offre des grilles de puzzle plus larges. Les dimensions personnalisées s'adaptent aux besoins d'impression spéciaux. Le paramètre de taille de page affecte l'impression de votre fiche de mots mêlés.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Générez',
        description: `Cliquez sur le bouton générer pour créer votre fiche de mots mêlés. L'application construit votre puzzle en quelques secondes. Regardez les images apparaître sur le canevas. La liste de mots se génère automatiquement. Chaque élément se positionne parfaitement sur la page. Vous voyez la fiche complète immédiatement. Pas d'attente ni de délais de traitement. L'aperçu montre exactement ce que les élèves verront.

L'algorithme de mots mêlés place les mots intelligemment. Les mots ne se chevauchent jamais de manière confuse. La grille se remplit de lettres aléatoires autour des mots cachés. La distribution des lettres semble naturelle et équilibrée. Les élèves obtiennent un puzzle de mots mêlés propre et professionnel. L'algorithme fonctionne de la même manière que vous choisissiez trois images ou huit mots.

La génération de la fiche de correction se fait automatiquement. L'application sait où se cache chaque mot. Cliquez sur l'onglet fiche de correction pour voir la solution. Les mots cachés apparaissent surlignés en différentes couleurs. Chaque mot utilise une couleur unique pour plus de clarté. Les enseignants peuvent vérifier la difficulté du puzzle avant d'imprimer. La fiche de correction aide à assister les élèves en difficulté.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Modifiez',
        description: `Cliquez sur n'importe quel élément pour le modifier directement sur le canevas. Le texte devient modifiable en un clic. Changez la famille de police parmi sept options disponibles. Ajustez la taille du texte avec le contrôle de curseur. Choisissez de nouvelles couleurs pour les lettres et les mots. Ajoutez un contour au texte pour une meilleure lisibilité. Chaque propriété de texte s'ajuste en temps réel. Regardez vos modifications se mettre à jour instantanément sur la fiche.

Faites glisser les éléments vers de nouvelles positions n'importe où sur la page. Déplacez la grille de mots mêlés plus haut ou plus bas. Repositionnez la liste de mots sur le côté. Faites glisser les images individuelles vers de meilleurs emplacements. Cliquez et maintenez pour déplacer n'importe quel objet. Tout se met en place en douceur. Le canevas mémorise chaque changement de position. Créez des mises en page uniques pour vos fiches d'alphabet et fiches d'écriture.

Redimensionnez les images et les éléments avec les poignées de coin. Cliquez sur une image pour la sélectionner. Faites glisser les poignées de coin pour l'agrandir ou la réduire. Maintenez Shift pour conserver les proportions. Redimensionnez toute la grille de mots mêlés plus grande ou plus petite. Ajustez la taille du texte de la liste de mots. Chaque élément se redimensionne précisément selon vos spécifications.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Téléchargez',
        description: `Téléchargez votre fiche de mots mêlés terminée dans deux formats. Le format PDF préserve la mise en page et la qualité exactes. Le JPEG fonctionne pour le partage rapide et la publication web. Les deux formats s'exportent en résolution professionnelle 300 DPI. Vos fiches imprimées sont cristallines sur n'importe quelle imprimante. Choisissez le format qui correspond à vos besoins d'utilisation.

Cliquez sur le menu déroulant de téléchargement pour voir toutes les options. Téléchargez la fiche principale en JPEG pour une impression immédiate. Enregistrez la fiche en PDF pour une qualité d'archivage. Téléchargez la fiche de correction en JPEG pour référence de l'enseignant. Enregistrez la fiche de correction en PDF pour une impression professionnelle. Toutes les options de téléchargement maintiennent une qualité parfaite. Vous obtenez quatre fichiers d'une seule session de création.

Activez le mode niveaux de gris avant de télécharger pour économiser l'encre. La case à cocher convertit tout en noir et blanc. L'impression en niveaux de gris réduit drastiquement les coûts d'encre. Parfait pour les écoles avec des budgets d'impression limités. La conversion maintient la lisibilité tout en éliminant l'utilisation d'encre couleur. Vos exercices CE1 s'impriment clairement en niveaux de gris.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from wordsearch.md use case sections
  useCases: {
    sectionTitle: 'Parfait pour les Enseignants et les Parents',
    sectionDescription: 'Le générateur de mots mêlés est parfait pour tous ceux qui enseignent aux enfants. Les enseignants de maternelle et du primaire l\'utilisent quotidiennement. Les parents en instruction à domicile créent des fiches à imprimer gratuit pour leurs enfants. Les enseignants spécialisés créent des fiches adaptées aux différents besoins.',
    badgeText: 'Pour Qui',
    readMoreLabel: 'Lire la suite',
    showLessLabel: 'Voir moins',
    items: [
      {
        id: '1',
        icon: '👶',
        title: 'Enseignants de Maternelle',
        subtitle: 'Créez des Fiches de Graphisme Maternelle et d\'Alphabet pour les Petits',
        description: `Les enseignants de maternelle ont besoin de matériel adapté à l'âge qui engage les jeunes apprenants. Les fiches de mots mêlés avec images enseignent le vocabulaire sans nécessiter de compétences en lecture. Les enfants de cinq ans cherchent des images au lieu de mots. Ils associent les animaux de la ferme aux emplacements de la grille. Ils trouvent des véhicules de transport cachés parmi les lettres. Cette approche visuelle construit des compétences de pré-lecture tout en développant la concentration. Les fiches maternelle de ce générateur soutiennent les objectifs des programmes officiels.

Les éducateurs préscolaires utilisent les mots mêlés pour les activités de préparation à l'école. Les enfants de quatre ans pratiquent la discrimination visuelle en trouvant des images correspondantes. Ils développent la motricité fine en entourant les images trouvées. Les enseignants de PS et MS créent des mots mêlés thématiques correspondant au programme mensuel. Les feuilles d'automne en septembre. Les citrouilles en octobre. Les flocons de neige en décembre. Ces fiches maternelle saisonnières renforcent le vocabulaire des activités de regroupement.

Générez des fiches d'alphabet en utilisant des images de lettres pour la reconnaissance des lettres. Créez des mots mêlés de nombres pour le développement du vocabulaire mathématique. Concevez des mots mêlés de couleurs avec des objets colorés. Les mots mêlés de formes enseignent le vocabulaire géométrique. Les enseignants de maternelle génèrent 10 à 15 fiches différentes par semaine. Chacune soutient différents objectifs d'apprentissage. Combinez avec des fiches de graphisme maternelle pour un développement complet de la motricité.`,
        quote: 'Mes élèves adorent chercher les images cachées !',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Enseignants du Primaire',
        subtitle: 'Fiches pour Apprendre à Lire et Tables de Multiplication',
        description: `Les professeurs de CP s'appuient sur les mots mêlés pour l'instruction phonétique. Les élèves cherchent des mots CVC comme chat, rat et tas. Ils trouvent des familles de mots comme -an, -on et -in. Les mots mêlés renforcent les patterns d'orthographe des leçons de phonétique. Les élèves de CP voient les mots plusieurs fois pendant le processus de recherche. Cette répétition renforce la cartographie orthographique. Les élèves mémorisent mieux les orthographes correctes après avoir complété les activités de mots mêlés. Ces fiches pour apprendre à lire soutiennent les approches de littératie structurée.

Les enseignants de CE1 utilisent les mots mêlés pour la pratique des mots fréquents. Les mots à haute fréquence deviennent des éléments de puzzle cachés. Les élèves cherchent le, la, les, un, une et des. Ils trouvent dans, sur, avec et pour. Les listes de mots Dubois-Buyse se convertissent facilement en mots mêlés. Les élèves de CE1 complètent les mots mêlés pendant le travail autonome. Ces fiches pour apprendre à lire rendent la pratique essentielle plus engageante.

Les professeurs de CE2 créent des mots mêlés de vocabulaire pour les tables de multiplication et les matières. Les mots mêlés de vocabulaire scientifique pour les unités sur les roches, les plantes ou la météo. Les termes de géographie et d'histoire pour les leçons d'études sociales. Les mots mêlés de vocabulaire mathématique avec les tables de multiplication renforcent le langage académique. Créez des versions différenciées avec des tailles de grille variables pour les groupes de niveaux mixtes.`,
        quote: 'Les mots mêlés rendent la pratique des maths ludique.',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Parents en Instruction à Domicile',
        subtitle: 'Fiches à Imprimer Gratuit pour Exercices Maths et Coloriage',
        description: `Les parents en instruction à domicile apprécient la génération rapide de fiches pour les leçons quotidiennes. Le temps du panier du matin inclut des activités d'échauffement avec des mots mêlés. Les élèves complètent des puzzles adaptés à leur âge avant le travail sur les matières principales. Les familles en IEF utilisent les mots mêlés pour plusieurs niveaux simultanément. Un parent génère des fiches d'alphabet maternelle pour le plus jeune enfant. Créez des fiches pour apprendre à lire pour l'enfant du milieu. Concevez des mots mêlés de vocabulaire CE2 pour l'aîné. Les trois fiches prennent moins de 10 minutes au total à créer.

Les approches par unités thématiques bénéficient des ensembles de mots mêlés thématiques. Le vocabulaire de l'unité océan inclut baleine, dauphin, corail et marée. L'unité espace présente planète, étoile, fusée et astronaute. L'unité préhistoire incorpore dinosaure, fossile et volcan. Les parents en IEF alignent le vocabulaire des mots mêlés avec les livres lus à voix haute et les projets pratiques. Les élèves voient les mêmes termes dans de multiples contextes tout au long de l'unité.

Générez des fiches d'exercices maths combinant des problèmes mathématiques avec des mots mêlés. Créez des puzzles de mots numériques pour la pratique du vocabulaire mathématique. Concevez des fiches de coloriage combinées avec des activités de mots mêlés pour des leçons intégrées. Les parents en IEF adorent le matériel polyvalent qui couvre plusieurs compétences. Les mots mêlés deviennent partie de paquets d'apprentissage plus larges.`,
        quote: 'Un outil couvre tous les niveaux de mes enfants.',
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Enseignants de FLE',
        subtitle: 'Mots Mêlés Multilingues pour Apprendre les Lettres en 11 Langues',
        description: `Les enseignants de FLE utilisent les mots mêlés pour l'acquisition de vocabulaire dans plusieurs langues. Le support de 11 langues crée du matériel d'apprentissage authentique. Les apprenants d'espagnol cherchent perro, gato et casa. Les étudiants de français trouvent chien, chat et maison. Les apprenants d'allemand cherchent Hund, Katze et Haus. Les mêmes images génèrent différents mots mêlés de vocabulaire selon les langues. Les enseignants de FLE créent du matériel parallèle pour les activités de comparaison.

Les programmes d'éducation bilingue ont besoin de matériel dans deux langues simultanément. Les classes d'immersion alternent entre l'instruction en français et en anglais. Les enseignants génèrent des ensembles de mots mêlés correspondants dans les deux langues. Le lundi présente le vocabulaire des animaux en français. Le mardi présente les mêmes images avec des mots anglais. Les élèves développent un vocabulaire bilingue grâce à une exposition répétée. Les mots mêlés soutiennent les approches de translanguaging pour le développement de la littératie.

Les programmes de langue maternelle utilisent les mots mêlés pour maintenir les compétences linguistiques natives. Les élèves apprenant le portugais à l'école du samedi obtiennent du vocabulaire culturellement pertinent. Les programmes de langue italienne présentent des aliments, des termes familiaux et des éléments culturels. Créez des fiches pour apprendre les lettres dans n'importe quelle langue cible. La bibliothèque d'images inclut des concepts universels qui se traduisent à travers les cultures.`,
        quote: 'Le support multilingue est essentiel pour ma classe.',
      },
      {
        id: '5',
        icon: '💜',
        title: 'Enseignants Spécialisés',
        subtitle: 'Fiches Maternelle et Exercices CE1 Différenciés pour Besoins Spécifiques',
        description: `Les enseignants spécialisés ont besoin de matériel hautement personnalisable pour les objectifs des PPS. Les mots mêlés s'adaptent parfaitement aux besoins individuels des élèves. Ajustez la taille de la grille de 5x5 pour les compétences émergentes à des grilles plus grandes pour le travail de niveau. Contrôlez la direction des mots pour correspondre aux capacités des élèves. Les recherches uniquement horizontales pour les élèves qui apprennent à balayer. Ajoutez des mots en diagonale lorsque les élèves démontrent leur préparation à une complexité accrue.

Les apprenants visuels avec des difficultés de lecture réussissent avec des mots mêlés basés sur des images. Les élèves avec dyslexie trouvent des images au lieu de lutter avec la confusion des lettres. L'approche visuelle construit la confiance tout en développant le vocabulaire. Les objectifs d'ergothérapie incorporent des activités de mots mêlés pour la pratique de la motricité fine. Les élèves travaillent sur la prise du crayon tout en entourant les mots trouvés. Les fiches abordent simultanément plusieurs objectifs du PPS.

Générez des exercices CE1 modifiés pour les élèves travaillant en dessous du niveau. Créez des fiches maternelle avancées pour les élèves dépassant les standards. Téléversez des images personnalisées correspondant aux intérêts des élèves pour une motivation accrue. Un élève passionné par les trains obtient des mots mêlés de transports. Un enfant qui aime les dinosaures reçoit des puzzles de vocabulaire préhistorique.`,
        quote: 'Je peux adapter les fiches rapidement pour chaque élève.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Enseignants Entrepreneurs',
        subtitle: 'Vendez des Fiches de Coloriage et Exercices Maths sur Teachers Pay Teachers',
        description: `Les enseignants entrepreneurs construisent des entreprises rentables en vendant des ressources de fiches. Les vendeurs Teachers Pay Teachers gagnent entre 500€ et 5000€ par mois avec du matériel de qualité. Les fiches de mots mêlés se vendent régulièrement toute l'année à tous les niveaux. La licence commerciale Pack Essentiel permet une création de produits illimitée. Générez des packs de mots mêlés thématiques pour les ventes saisonnières. Les packs de vocabulaire de rentrée en août. Les mots mêlés d'Halloween en octobre. Les ensembles de vocabulaire de fêtes en décembre.

Créez des lots de fiches complets alignés sur le programme. Les mots mêlés de vocabulaire mathématique maternelle couvrant le comptage, les formes et les nombres. Les ensembles de mots mêlés de phonétique CP pour chaque lettre et son. Les collections de mots fréquents organisées par niveau. Ces grands lots commandent des prix premium sur les sites de marché. Les vendeurs facturent 8€ à 15€ pour des packs complets de 50 fiches.

Les boutiques de printables Etsy présentent des fiches de mots mêlés aux côtés des pages de coloriage à imprimer et des fiches d'exercices maths. Les vendeurs créent des lignes de produits thématiques pour une image de marque cohérente. Une boutique à thème océan propose des mots mêlés, des feuilles de coloriage et des fiches d'exercices maths présentant tous la vie marine. Les clients achètent plusieurs produits de collections cohérentes.`,
        quote: 'Mon abonnement s\'est rentabilisé dès le premier mois !',
      },
    ],
  },

  // FAQ Section - Selected FAQs from wordsearch.md
  faq: {
    sectionTitle: 'Questions Fréquentes',
    sectionDescription: 'Questions fréquentes sur notre générateur de mots mêlés et nos fiches à imprimer gratuit.',
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
        question: 'Ce Générateur de Mots Mêlés Est-Il Vraiment Gratuit pour les Fiches Maternelle ?',
        answer: 'Le générateur de mots mêlés offre une version gratuite avec des limitations. Vous pouvez créer des fiches de mots mêlés illimitées avec un filigrane. Le filigrane apparaît sur chaque fiche téléchargée. Les comptes gratuits permettent uniquement l\'usage personnel en classe. Les enseignants impriment des fiches pour leurs propres élèves sans restrictions. La version gratuite inclut les plus de 3000 images et les 11 langues. Vous obtenez des capacités d\'édition complètes et des téléchargements professionnels 300 DPI. L\'abonnement Pack Essentiel supprime complètement le filigrane. L\'abonnement coûte 144€ par an ou 15€ par mois.',
      },
      {
        id: '2',
        question: 'Puis-Je Imprimer les Fiches de Mots Mêlés à la Maison pour les Exercices CP ?',
        answer: 'Les fiches de mots mêlés s\'impriment parfaitement sur des imprimantes domestiques standard. N\'importe quelle imprimante jet d\'encre ou laser produit des résultats clairs. La résolution 300 DPI assure des lettres et des images nettes. Imprimez sur du papier standard A4. Aucun papier ou paramètre spécial requis. L\'impression en couleur et en noir et blanc fonctionne parfaitement. L\'option niveaux de gris réduit considérablement la consommation d\'encre. Les exercices CP s\'impriment avec une clarté parfaite à chaque fois.',
      },
      {
        id: '3',
        question: 'Ai-Je Besoin de Compétences en Design pour Créer des Fiches d\'Écriture et Exercices Maths ?',
        answer: 'Absolument aucune compétence en design n\'est requise pour créer des fiches de mots mêlés. Le générateur gère automatiquement toute la mise en page et le formatage. Sélectionnez des images ou entrez des mots puis cliquez sur générer. L\'application crée des puzzles professionnels en quelques secondes. Les enseignants sans expérience en design produisent du matériel de qualité immédiatement. L\'interface utilise des boutons simples et des menus déroulants. Les outils d\'édition fonctionnent intuitivement par clic et glisser-déposer.',
      },
      {
        id: '4',
        question: 'Quelles Langues Sont Disponibles pour les Fiches d\'Alphabet et Apprendre les Lettres ?',
        answer: 'Les fiches de mots mêlés supportent 11 langues complètes. Français, anglais, allemand, espagnol, portugais, italien, néerlandais, danois, suédois, norvégien et finnois. L\'interface utilisateur et le contenu des fiches fonctionnent dans la langue sélectionnée. Les noms d\'images apparaissent dans votre langue choisie sur les fiches générées. Cela crée du matériel authentique d\'apprentissage du vocabulaire. Un abonnement couvre les 11 langues de manière illimitée.',
      },
      {
        id: '5',
        question: 'Puis-Je Vendre les Fiches de Coloriage et Mots Mêlés sur Teachers Pay Teachers ?',
        answer: 'Vendre des fiches de mots mêlés nécessite un abonnement Pack Essentiel. La version gratuite interdit entièrement l\'usage commercial. Le Pack Essentiel coûte 144€ par an et inclut une licence commerciale complète. Cette licence permet de vendre sur toutes les plateformes sans frais supplémentaires. Teachers Pay Teachers, Etsy et Amazon KDP sont tous des usages commerciaux permis. Aucune attribution requise sur les produits commerciaux. Votre marque apparaît exclusivement sur les produits finis.',
      },
      {
        id: '6',
        question: 'Comment Personnaliser les Fiches de Graphisme Maternelle et Tables de Multiplication ?',
        answer: 'La personnalisation se fait avant et après la génération des fiches. Commencez par sélectionner des images spécifiques correspondant au vocabulaire de la leçon. Choisissez la taille de grille appropriée aux niveaux de compétence des élèves. Les petites grilles 5x5 fonctionnent pour les élèves de maternelle. Les grilles plus grandes challengent les élèves de CE1 et CE2. Activez ou désactivez les mots en diagonale et inversés selon les niveaux de lecture. Après la génération, modifiez tout sur le canevas.',
      },
      {
        id: '7',
        question: 'Quels Groupes d\'Âge Conviennent le Mieux à ces Fiches d\'Exercices Maths et Maternelle ?',
        answer: 'Les fiches de mots mêlés fonctionnent excellemment pour les âges de 4 à 10 ans. Les préscolaires de 4-5 ans utilisent des recherches basées sur des images sans exigences de lecture. Les maternelles de 5-6 ans cherchent des mots simples de trois lettres. Les CP de 6-7 ans travaillent avec des patterns phonétiques et des mots fréquents. Les CE1 de 7-8 ans gèrent des grilles plus grandes avec des mots en diagonale. Les CE2 de 8-9 ans complètent des puzzles complexes avec des mots inversés. Ajustez la difficulté via la taille de grille et les paramètres de direction des mots.',
      },
      {
        id: '8',
        question: 'Puis-Je Téléverser Mes Propres Images pour des Fiches Personnalisées ?',
        answer: 'Téléversez des images personnalisées illimitées pour des fiches de mots mêlés personnalisées. Cliquez sur le bouton de téléversement pour sélectionner des fichiers depuis votre ordinateur. Choisissez plusieurs images simultanément. Les formats JPEG, PNG et GIF fonctionnent tous parfaitement. Les images téléversées apparaissent immédiatement dans votre session. Combinez les téléversements personnalisés avec les images de la bibliothèque librement. Les enseignants téléversent des photos d\'objets de classe pour un vocabulaire pertinent.',
      },
      {
        id: '9',
        question: 'Combien de Temps Faut-Il pour Créer des Fiches pour Apprendre à Lire ?',
        answer: 'Créer une fiche de mots mêlés prend moins de trois minutes du début à la fin. Sélectionnez un thème ou des images spécifiques en 30 secondes. Cliquez sur générer et voyez les résultats en 5 secondes. Vérifiez la fiche pendant 30 secondes. Faites les modifications souhaitées en une minute. Téléchargez la fiche terminée en 15 secondes. Le temps total moyen est de deux à trois minutes par fiche. Les sessions de planification mensuel produisent 20 à 30 fiches en une heure.',
      },
      {
        id: '10',
        question: 'Les Fiches de Mots Mêlés Incluent-Elles des Fiches de Correction ?',
        answer: 'Chaque fiche de mots mêlés inclut une fiche de correction automatique. Cliquez sur l\'onglet fiche de correction pour voir la solution. Les mots cachés apparaissent surlignés en différentes couleurs. Chaque mot utilise une couleur unique pour plus de clarté. La fiche de correction montre exactement où se cache chaque mot dans la grille. Téléchargez la fiche de correction séparément en JPEG ou PDF. Les deux formats maintiennent la qualité professionnelle 300 DPI. Les fiches de correction aident les enseignants à vérifier la difficulté du puzzle avant d\'assigner.',
      },
      {
        id: '11',
        question: 'Les Fiches de Coloriage à Imprimer Peuvent-Elles Être Combinées avec les Mots Mêlés ?',
        answer: 'Les fiches de coloriage à imprimer se combinent parfaitement avec les activités de mots mêlés. Générez des puzzles de mots mêlés thématiques correspondant aux sujets des fiches de coloriage. Les mots mêlés océan se marient avec les pages de coloriage de créatures marines. Les puzzles de ferme se combinent avec les feuilles de coloriage d\'animaux de la grange. L\'imagerie cohérente à travers les activités crée des unités thématiques immersives. Les paquets d\'apprentissage différenciés incluent des mots mêlés et du coloriage pour des capacités mixtes.',
      },
      {
        id: '12',
        question: 'Les Fiches d\'Alphabet Fonctionnent-Elles Bien avec les Fiches de Graphisme pour la Maternelle ?',
        answer: 'Les fiches d\'alphabet se combinent excellemment avec les activités de graphisme. L\'apprentissage des lettres combine les mots mêlés avec une pratique complète des lettres. Créez des mots mêlés ABC utilisant des images pour chaque lettre de l\'alphabet. Pomme et avion pour A. Ballon et banane pour B. Chat et camion pour C. Suivez avec des fiches d\'alphabet pratiquant les noms et sons des lettres. Les paquets complets d\'apprentissage de l\'alphabet incluent plusieurs types de fiches. Les mots mêlés fournissent une pratique de reconnaissance des lettres par identification d\'images.',
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
    sectionDescription: 'Créez des paquets d\'apprentissage complets en combinant les fiches de mots mêlés avec ces générateurs complémentaires.',
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
        slug: 'crossword',
        name: 'Mots Croisés',
        category: 'Langue',
        icon: '📝',
        description: 'Complétez les mots mêlés avec des mots croisés utilisant les mêmes thèmes de vocabulaire pour une pratique complète des mots.',
      },
      {
        id: '2',
        slug: 'word-scramble',
        name: 'Mots Mélangés',
        category: 'Langue',
        icon: '🔤',
        description: 'Combinez les mots mêlés avec des puzzles de lettres mélangées pour renforcer l\'orthographe et le vocabulaire sous plusieurs angles.',
      },
      {
        id: '3',
        slug: 'word-guess',
        name: 'Deviner le Mot',
        category: 'Langue',
        icon: '❓',
        description: 'Ajoutez des activités de devinettes de mots à vos centres de lecture avec des puzzles de mots mêlés pour une pratique variée.',
      },
      {
        id: '4',
        slug: 'cryptogram',
        name: 'Cryptogramme',
        category: 'Logique',
        icon: '🔐',
        description: 'Défiez les élèves avec des puzzles de décodage qui développent la pensée logique et la reconnaissance des patterns de lettres.',
      },
      {
        id: '5',
        slug: 'coloring',
        name: 'Coloriage',
        category: 'Créativité',
        icon: '🎨',
        description: 'Récompensez les mots mêlés terminés avec des pages de coloriage thématiques qui développent la motricité fine.',
      },
      {
        id: '6',
        slug: 'alphabet-train',
        name: 'Train Alphabet',
        category: 'Apprentissage Précoce',
        icon: '🚂',
        description: 'Équilibrez la pratique des mots mêlés avec des activités de reconnaissance des lettres pour une lecture précoce complète.',
      },
    ],
  },
};

export default wordSearchFrContent;
