import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Word Scramble Worksheets - French Content
 *
 * File: frontend/content/product-pages/fr/word-scramble-worksheets.ts
 * URL: /fr/apps/mots-melanges-fiches (French SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/French/word-scramble.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const wordScrambleFrContent: ProductPageContent = {
  // SEO Metadata - French language-specific
  seo: {
    slug: 'mots-melanges-fiches',
    appId: 'word-scramble',
    title: 'Générateur de Mots Mélangés | Fiches à Imprimer Gratuit pour Maternelle et CP',
    description: 'Créez des exercices de mots mélangés en quelques clics. Votre abonnement Pack Essentiel vous donne accès à la création illimitée de fiches maternelle et exercices CP. Téléchargez vos fiches à imprimer gratuit en format PDF haute qualité.',
    keywords: 'mots mélangés, générateur mots mélangés, fiches maternelle, fiches à imprimer gratuit, exercices CP, exercices CE1, apprendre à lire, alphabet, apprendre les lettres, graphisme maternelle, écriture cursive, coloriage à imprimer, exercices maths, tables de multiplication',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fr/apps/mots-melanges-fiches',
  },

  // Hero Section - FULL text from word-scramble.md paragraphs 1-4
  hero: {
    title: 'Générateur de Mots Mélangés',
    subtitle: 'Fiches à Imprimer Gratuit pour Maternelle et CP',
    description: `Créez des exercices de mots mélangés en quelques clics. Votre abonnement Pack Essentiel vous donne accès à la création illimitée de fiches. Générez des fiches maternelle et exercices CP personnalisés sans frais supplémentaires. Téléchargez vos fiches à imprimer gratuit en format PDF haute qualité.

Les mots mélangés sont parfaits pour apprendre à lire. Les élèves remettent les lettres dans le bon ordre. Chaque exercice inclut une image comme indice visuel. Cet outil pédagogique renforce le vocabulaire et l'orthographe.

Notre générateur propose 11 langues. L'interface et le contenu s'adaptent à votre langue. Les fiches maternelle utilisent des images adaptées aux enfants. Parfait pour les classes bilingues et l'apprentissage du français langue étrangère.`,
    previewImageSrc: '/samples/english/word scramble/word scramble portrait.jpeg',
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

  // Sample Gallery - REAL file paths from samples/english/word scramble/
  samples: {
    sectionTitle: 'Exemples de Mots Mélangés',
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
        worksheetSrc: '/samples/english/word scramble/word scramble portrait.jpeg',
        answerKeySrc: '/samples/english/word scramble/word scramble portrait answer-key.jpeg',
        altText: 'Mots mélangés en format portrait avec images thématiques pour le vocabulaire maternelle',
        pdfDownloadUrl: '/samples/english/word scramble/word scramble portrait.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/english/word scramble/word scramble landscape.jpeg',
        answerKeySrc: '/samples/english/word scramble/word scramble landscape answer-key.jpeg',
        altText: 'Fiche de mots mélangés en format paysage avec indices visuels colorés pour le CP',
        pdfDownloadUrl: '/samples/english/word scramble/word scramble landscape.pdf',
      },
      {
        id: '3',
        worksheetSrc: '/samples/english/word scramble/custom word list.jpeg',
        answerKeySrc: '/samples/english/word scramble/custom word list answer-key.jpeg',
        altText: 'Mots mélangés avec liste de mots personnalisée pour la pratique de l\'orthographe',
        pdfDownloadUrl: '/samples/english/word scramble/custom word list.pdf',
      },
    ],
  },

  // Features Grid - FULL text from word-scramble.md feature sections
  features: {
    sectionTitle: 'Fonctionnalités du Générateur de Mots Mélangés - Fiches Maternelle et Exercices CP Complets',
    sectionDescription: 'Notre générateur de mots mélangés offre tout ce dont vous avez besoin. Créez des fiches maternelle professionnelles en quelques minutes. Chaque fonctionnalité a été pensée pour les enseignants. Découvrez les sept fonctionnalités principales de cet outil.',
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
        title: 'Création Rapide de Fiches à Imprimer Gratuit - Mots Mélangés en 3 Clics',
        description: `La création de fiches est simple et rapide. Sélectionnez un thème d'images ou choisissez des images individuelles. Cliquez sur générer et votre fiche apparaît instantanément. Tout se fait en moins de trois minutes.

Chaque image de la bibliothèque a un nom dans votre langue. Ce nom devient automatiquement le mot à déchiffrer. Par exemple, une image de pomme génère le mot "POMME" mélangé. Les élèves voient l'image et remettent les lettres en ordre.`,
        highlighted: false,
      },
      {
        id: '2',
        icon: '✏️',
        title: 'Fiches Maternelle Entièrement Personnalisables - Exercices CP sur Mesure',
        description: `Chaque élément sur le canevas est modifiable. Déplacez les images où vous voulez. Redimensionnez les zones de texte selon vos besoins. Faites pivoter les éléments pour un design unique.

Supprimez ce qui ne vous convient pas. Ajoutez vos propres textes et instructions. Changez les couleurs et les polices de caractères. Créez des fiches maternelle vraiment personnalisées.`,
        highlighted: false,
      },
      {
        id: '3',
        icon: '📤',
        title: 'Téléversez vos Propres Images pour Apprendre à Lire - Fiches à Imprimer Gratuit Personnalisées',
        description: `Importez vos propres images en quelques secondes. Téléversez plusieurs fichiers à la fois. Tous les formats courants sont acceptés. JPEG, PNG et GIF fonctionnent parfaitement.

Combinez vos images avec celles de la bibliothèque. Créez des exercices pour apprendre à lire avec des photos de classe. Personnalisez les mots mélangés pour vos élèves. Une image de votre mascotte devient un exercice unique.`,
        highlighted: false,
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Exercices CP et Exercices CE1 en 11 Langues - Fiches Maternelle Multilingues',
        description: `L'interface est disponible en 11 langues. Le français, l'anglais, l'allemand, l'espagnol sont inclus. L'italien, le portugais et le néerlandais aussi. Sans oublier le suédois, le danois, le norvégien et le finnois.

Les noms d'images s'adaptent à la langue choisie. Parfait pour les exercices CP en classe bilingue. Idéal pour l'enseignement du français langue étrangère. Créez des exercices CE1 dans la langue de vos élèves.`,
        highlighted: false,
      },
      {
        id: '5',
        icon: '💰',
        title: 'Licence Commerciale POD Incluse - Vendez vos Fiches à Imprimer Gratuit',
        description: `Votre abonnement Pack Essentiel inclut la licence commerciale. Vendez vos créations sur Teachers Pay Teachers. Proposez vos fiches sur Etsy sans frais supplémentaires. Publiez sur Amazon KDP en toute légalité.

Aucune attribution requise pour vos ventes. Qualité 300 DPI professionnelle pour l'impression. Parfait pour les enseignants entrepreneurs. Rentabilisez votre abonnement en vendant vos fiches maternelle.`,
        highlighted: true,
      },
      {
        id: '6',
        icon: '🎨',
        title: 'Bibliothèque de 3000+ Images pour Apprendre les Lettres et le Vocabulaire',
        description: `Plus de 3000 images adaptées aux enfants. Organisation par thèmes pour faciliter la recherche. Animaux, nourriture, transports, nature et plus encore. Trouvez l'image parfaite en quelques secondes.

Chaque thème contient des dizaines d'images. Utilisez la fonction recherche pour trouver rapidement. Combinez plusieurs thèmes pour varier les exercices. Idéal pour apprendre les lettres avec des images familières.`,
        highlighted: false,
      },
      {
        id: '7',
        icon: '🖨️',
        title: 'Fiches Maternelle Qualité Professionnelle 300 DPI - Alphabet et Écriture Parfaits',
        description: `Exportez en qualité 300 DPI pour une impression parfaite. Format PDF pour une mise en page préservée. Format JPEG pour un partage facile. Option niveaux de gris pour économiser l'encre.

Chaque fiche inclut automatiquement un corrigé. Téléchargez la fiche et le corrigé séparément. Parfait pour l'auto-correction des élèves. Qualité professionnelle pour vos fiches d'alphabet et exercices.`,
        highlighted: true,
      },
      {
        id: '8',
        icon: '📝',
        title: 'Graphisme Maternelle et Écriture Cursive - Complétez vos Fiches à Imprimer Gratuit',
        description: `Les mots mélangés complètent parfaitement le graphisme maternelle. Les élèves travaillent la reconnaissance des lettres. Combinez avec des exercices d'écriture cursive. Créez des parcours d'apprentissage complets.

Le code couleur distingue voyelles et consonnes. Excellente préparation à l'écriture cursive. Les fiches à imprimer gratuit renforcent la conscience phonologique. Un complément idéal au graphisme maternelle traditionnel.`,
        highlighted: false,
      },
      {
        id: '9',
        icon: '📊',
        title: 'Niveaux de Difficulté pour Exercices CP - Fiches Maternelle Adaptées',
        description: `Quatre niveaux de difficulté disponibles. Sans indices pour les élèves avancés. Mode facile avec la moitié des lettres révélées. Modes intermédiaires pour une progression graduelle.

Choisissez majuscules ou minuscules selon le niveau. Le mode couleur aide les débutants. Le mode noir convient aux plus avancés. Adaptez chaque exercice CP au niveau de vos élèves.`,
        highlighted: false,
      },
    ],
  },

  // How-To Guide - FULL text from word-scramble.md step sections
  howTo: {
    sectionTitle: 'Comment Créer des Fiches Maternelle de Mots Mélangés en 5 Étapes - Guide Exercices CP',
    sectionDescription: 'Créer des fiches de mots mélangés prend moins de trois minutes. Suivez ce guide étape par étape. Aucune compétence technique requise. Même les débutants réussissent du premier coup.',
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
        title: 'Étape 1 : Choisissez vos Images pour Fiches à Imprimer Gratuit - Apprendre à Lire avec des Visuels',
        description: `Commencez par sélectionner vos images. Ouvrez le panneau de la bibliothèque d'images. Choisissez un thème comme "Animaux" ou "Nourriture". Les images du thème s'affichent instantanément.

Cliquez sur les images souhaitées pour les sélectionner. Un compteur indique combien d'images sont choisies. Sélectionnez entre 1 et 10 images par fiche. Le nombre d'exercices dépend de vos images sélectionnées.

Utilisez la barre de recherche pour trouver une image précise. Tapez "chat" et toutes les images de chats apparaissent. Combinez des images de différents thèmes. Créez des fiches à imprimer gratuit variées pour apprendre à lire.

Vous pouvez aussi téléverser vos propres images. Cliquez sur "Téléverser" et sélectionnez vos fichiers. Donnez un nom à chaque image téléversée. Ce nom deviendra le mot à déchiffrer.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Étape 2 : Configurez les Exercices CP et Exercices CE1 - Fiches Maternelle Personnalisées',
        description: `Après avoir choisi vos images, configurez les paramètres. Définissez le nombre d'exercices par page. Choisissez entre 1 et 10 puzzles.

Sélectionnez le niveau de difficulté approprié. Le mode "Sans indices" convient aux élèves avancés. Le mode "Facile" révèle la moitié des lettres. Les modes intermédiaires offrent une progression.

Choisissez majuscules ou minuscules pour vos exercices CP. Les majuscules conviennent mieux en maternelle. Les minuscules préparent aux exercices CE1. Adaptez selon le niveau de votre classe.

Activez le code couleur si souhaité. Les voyelles et consonnes s'affichent en couleurs différentes. Excellent pour les fiches maternelle de phonologie. Désactivez pour des exercices plus avancés.

Cochez "Inclure nom et date" pour ajouter ces champs. Cochez "Numéroter les exercices" pour une organisation claire. Ces options facilitent la correction et le suivi.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Étape 3 : Générez votre Fiche de Mots Mélangés - Alphabet et Apprendre les Lettres',
        description: `Cliquez sur le bouton "Créer" en haut de l'écran. Le menu déroulant propose plusieurs options. Sélectionnez "Nouvelle fiche" pour générer.

Votre fiche apparaît instantanément sur le canevas. Chaque image s'affiche avec ses lettres mélangées. Les élèves verront l'image et devront reconstituer le mot. Parfait pour apprendre les lettres de l'alphabet.

La génération prend quelques secondes seulement. Vérifiez que tout correspond à vos attentes. Les images sont bien positionnées automatiquement. Les lettres mélangées sont lisibles et claires.

Si le résultat ne convient pas, régénérez simplement. Chaque génération propose un mélange différent. Les lettres sont disposées aléatoirement à chaque fois. Créez plusieurs versions du même exercice.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Étape 4 : Personnalisez sur le Canevas - Fiches Maternelle et Graphisme Maternelle',
        description: `Après génération, personnalisez votre fiche librement. Chaque élément sur le canevas est modifiable. Cliquez sur un élément pour le sélectionner. Des poignées de manipulation apparaissent.

Déplacez les images où vous voulez sur la page. Faites glisser pour repositionner n'importe quel élément. Redimensionnez en tirant sur les poignées. Faites pivoter pour un effet créatif.

Ajoutez du texte personnalisé avec l'outil texte. Écrivez des instructions ou un titre. Changez la police et la taille selon vos préférences. Ajoutez une couleur de contour pour plus de visibilité.

Modifiez les couleurs et l'apparence des lettres. Sélectionnez un groupe de lettres mélangées. Changez la couleur ou la taille. Créez des fiches maternelle uniques pour le graphisme maternelle.

Ajoutez un arrière-plan thématique si souhaité. Choisissez parmi les thèmes disponibles. Ajustez l'opacité pour ne pas gêner la lecture. Ajoutez une bordure décorative assortie.

Utilisez les outils d'alignement pour un résultat professionnel. Centrez les éléments horizontalement ou verticalement. Alignez plusieurs éléments entre eux. Créez une mise en page soignée.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Étape 5 : Téléchargez vos Fiches à Imprimer Gratuit - Exercices CP Format PDF',
        description: `Votre fiche est prête pour le téléchargement. Cliquez sur le bouton "Télécharger" en haut. Un menu propose plusieurs formats de sortie.

Choisissez "Fiche (PDF)" pour le format imprimable standard. Le PDF préserve parfaitement la mise en page. Idéal pour impression en classe ou à la maison. Format professionnel 300 DPI.

Choisissez "Fiche (JPEG)" pour un partage numérique. Le JPEG convient aux plateformes en ligne. Partagez facilement par email ou messagerie. Format compatible avec tous les appareils.

N'oubliez pas de télécharger le corrigé aussi. Sélectionnez "Corrigé (PDF)" ou "Corrigé (JPEG)". Le corrigé montre les mots correctement orthographiés. Parfait pour l'auto-correction des exercices CP.

Activez l'option "Niveaux de gris" pour économiser l'encre. La fiche se convertit en noir et blanc. Idéal pour les impressions quotidiennes. Gardez la couleur pour les fiches spéciales.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from word-scramble.md use case sections
  useCases: {
    sectionTitle: 'Qui Utilise les Mots Mélangés - Fiches Maternelle et Exercices CP pour Tous les Éducateurs',
    sectionDescription: 'Les mots mélangés conviennent à de nombreux profils d\'utilisateurs. Enseignants, parents et éducateurs trouvent tous leur compte. Découvrez comment chaque groupe utilise cet outil. Trouvez l\'inspiration pour vos propres usages.',
    badgeText: 'Cas d\'Utilisation',
    readMoreLabel: 'Lire la suite',
    showLessLabel: 'Voir moins',
    items: [
      {
        id: '1',
        icon: '👩‍🏫',
        title: 'Enseignants de Maternelle - Fiches Maternelle pour Apprendre les Lettres et l\'Alphabet',
        subtitle: 'Reconnaissance des lettres et conscience phonologique',
        description: `Les enseignants de maternelle adorent les mots mélangés. Les exercices visuels captent l'attention des tout-petits. Les images colorées rendent l'apprentissage ludique. Les enfants s'amusent en apprenant les lettres.

Les fiches maternelle de mots mélangés développent plusieurs compétences. La reconnaissance des lettres de l'alphabet s'améliore rapidement. La conscience phonologique se renforce naturellement. Le vocabulaire s'enrichit grâce aux images thématiques.

Créez des fiches adaptées à chaque période de l'année. Thème automne avec feuilles et champignons. Thème Noël avec sapin et cadeaux. Thème printemps avec fleurs et papillons. Les élèves découvrent du vocabulaire saisonnier.

Le mode couleur avec voyelles et consonnes différenciées aide énormément. Les enfants de grande section distinguent les types de lettres. Excellente préparation pour apprendre les lettres en CP. Base solide pour l'alphabet et la phonologie.`,
        quote: 'Mes élèves adorent les mots mélangés avec les images !',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Enseignants de CP et CE1 - Exercices CP et Exercices CE1 pour la Lecture',
        subtitle: 'Renforcement de la lecture et de l\'orthographe',
        description: `Les enseignants de cycle 2 utilisent les mots mélangés quotidiennement. Les exercices CP renforcent l'apprentissage de la lecture. Les exercices CE1 consolident l'orthographe des mots courants. Un outil polyvalent pour toute l'année scolaire.

Intégrez les mots mélangés dans vos rituels du matin. Cinq minutes de déchiffrage réveillent les esprits. Les élèves commencent la journée de façon ludique. La concentration s'installe progressivement.

Créez des fiches par son étudié en classe. Travaillez le son "ou" avec hibou, chou, genou. Renforcez le son "an" avec banane, maman, volcan. Les exercices CP ciblent précisément vos objectifs pédagogiques.

Utilisez le mode sans indices pour évaluer les acquis. Les élèves démontrent leur maîtrise orthographique. Identifiez rapidement les difficultés individuelles. Adaptez votre enseignement aux besoins observés.`,
        quote: 'Les mots mélangés rendent l\'orthographe ludique.',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Parents Pratiquant l\'Instruction en Famille - Fiches à Imprimer Gratuit pour Apprendre à Lire',
        subtitle: 'Apprentissage personnalisé à la maison',
        description: `Les parents instruisant à domicile apprécient particulièrement cet outil. Les fiches à imprimer gratuit structurent l'apprentissage quotidien. La création personnalisée s'adapte à chaque enfant. Le rythme individuel est respecté.

Créez des fiches sur les centres d'intérêt de votre enfant. Un passionné de dinosaures apprend avec tyrannosaure et tricératops. Un amateur de cuisine découvre tomate et carotte. La motivation intrinsèque booste les apprentissages.

Variez les niveaux de difficulté selon la progression. Commencez facile pour installer la confiance. Augmentez progressivement vers le mode sans indices. Célébrez chaque victoire avec votre enfant.

Les fiches à imprimer gratuit permettent un apprentissage structuré. Planifiez une fiche quotidienne de dix minutes. La régularité crée des habitudes positives. Apprendre à lire devient un moment agréable.`,
        quote: 'Un outil adapté à tous les niveaux de mes enfants.',
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Enseignants de Français Langue Étrangère - Exercices CP en 11 Langues pour Apprendre le Français',
        subtitle: 'Vocabulaire multilingue et apprentissage progressif',
        description: `Les professeurs de FLE trouvent les mots mélangés particulièrement utiles. L'association image-mot facilite la mémorisation. Les élèves allophones progressent rapidement. Le vocabulaire de base s'ancre visuellement.

Le support multilingue de 11 langues aide énormément. Commencez dans la langue maternelle de l'élève. Passez progressivement au français. La transition se fait en douceur et sans stress.

Créez des exercices CP thématiques pour le vocabulaire quotidien. Les objets de la classe pour débuter. La nourriture pour les repas. Les animaux pour le plaisir. Construisez un lexique fonctionnel.

Les images servent de pont entre les langues. L'élève reconnaît l'objet, puis apprend le mot français. Le processus cognitif s'appuie sur le connu. L'apprentissage devient naturel et efficace.`,
        quote: 'Le support multilingue est essentiel pour mes élèves.',
      },
      {
        id: '5',
        icon: '💜',
        title: 'Enseignants Spécialisés - Fiches Maternelle Adaptées et Graphisme Maternelle',
        subtitle: 'Différenciation et adaptation aux besoins spécifiques',
        description: `Les enseignants en ULIS et SEGPA utilisent les mots mélangés pour la différenciation. Les quatre niveaux de difficulté permettent une adaptation fine. Chaque élève travaille à son rythme. La progression individuelle est valorisée.

Le mode facile avec lettres révélées soutient les élèves en difficulté. Les indices visuels réduisent la charge cognitive. La réussite devient accessible à tous. La confiance en soi se construit.

Combinez mots mélangés et graphisme maternelle pour la motricité. Après avoir trouvé le mot, l'élève trace les lettres. Les fiches maternelle adaptées travaillent plusieurs compétences. L'approche multisensorielle favorise la mémorisation.

Le code couleur voyelles-consonnes aide les élèves dyslexiques. La distinction visuelle facilite le déchiffrage. Les lettres se différencient clairement. Un soutien précieux pour les troubles dys.`,
        quote: 'Je peux adapter les fiches pour chaque élève.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Enseignants Entrepreneurs - Vendez vos Fiches Maternelle et Écriture Cursive',
        subtitle: 'Licence commerciale incluse pour TPT, Etsy et Amazon KDP',
        description: `Les enseignants créateurs de ressources adorent cet outil. La licence commerciale POD incluse permet la vente. Créez des packs thématiques à succès. Rentabilisez vos compétences pédagogiques.

Vendez sur Teachers Pay Teachers vos fiches maternelle. Proposez des packs saisonniers sur Etsy. Publiez des cahiers d'activités sur Amazon KDP. Trois plateformes, trois sources de revenus.

La qualité 300 DPI garantit un rendu professionnel. Vos clients reçoivent des fiches impeccables. Les avis positifs s'accumulent. Votre boutique se développe naturellement.

Créez des séries complètes pour fidéliser vos clients. Pack rentrée avec vocabulaire scolaire. Pack Noël avec thème festif. Pack été avec animaux de vacances. L'écriture cursive complète parfaitement les mots mélangés.`,
        quote: 'Mon abonnement s\'est rentabilisé dès le premier mois !',
      },
    ],
  },

  // FAQ Section - Selected FAQs from word-scramble.md
  faq: {
    sectionTitle: 'Questions Fréquentes sur les Mots Mélangés - Fiches Maternelle et Exercices CP',
    sectionDescription: 'Vous avez des questions sur notre générateur de mots mélangés ? Retrouvez les réponses aux questions les plus fréquentes. Tout ce que vous devez savoir sur les fiches maternelle et exercices CP.',
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
        question: 'Ce Générateur de Mots Mélangés est-il Vraiment Gratuit pour les Fiches à Imprimer ?',
        answer: `Le générateur de mots mélangés nécessite un abonnement Pack Essentiel. Le tarif est de 144 € par an ou 15 € par mois. Votre abonnement vous donne une création illimitée de fiches. Générez autant de fiches à imprimer que vous le souhaitez sans frais supplémentaires.

Le Pack Essentiel inclut 10 générateurs de fiches populaires. L'abonnement Accès Complet coûte 240 € par an et inclut les 33 générateurs. Les deux abonnements incluent la licence commerciale, le support 11 langues et l'export 300 DPI professionnel.`,
      },
      {
        id: '2',
        question: 'Puis-je Imprimer les Fiches Maternelle de Mots Mélangés à la Maison ?',
        answer: `Oui, absolument. Toutes les fiches maternelle s'impriment parfaitement sur une imprimante domestique. Le format PDF préserve la mise en page sur tous les appareils. La qualité 300 DPI garantit des impressions nettes et lisibles.

Utilisez du papier standard A4 ou Letter selon votre région. L'option niveaux de gris économise l'encre pour les impressions quotidiennes. Gardez la couleur pour les fiches spéciales ou les récompenses.`,
      },
      {
        id: '3',
        question: 'Faut-il des Compétences en Design pour Créer des Exercices CP ?',
        answer: `Aucune compétence en design n'est requise. Le générateur fait tout le travail automatiquement. Sélectionnez vos images et cliquez sur générer. Votre fiche d'exercices CP apparaît instantanément.

La personnalisation reste simple et intuitive. Glissez-déposez pour déplacer les éléments. Cliquez pour modifier les couleurs ou polices. Même les débutants créent des fiches professionnelles du premier coup.`,
      },
      {
        id: '4',
        question: 'Les Fiches Maternelle de Mots Mélangés Conviennent-elles à ma Classe ?',
        answer: `L'abonnement Pack Essentiel inclut une utilisation illimitée en classe. Imprimez autant de fiches maternelle que nécessaire pour vos élèves. Distribuez les fiches sans restriction de nombre. Utilisez-les pour les devoirs, les évaluations ou les activités en classe.

Les quatre niveaux de difficulté s'adaptent à tous les niveaux. La maternelle grande section bénéficie du mode facile avec indices. Le CP et CE1 utilisent les modes plus difficiles. Chaque élève progresse à son rythme.`,
      },
      {
        id: '5',
        question: 'Quelles Langues sont Disponibles pour les Fiches à Imprimer Gratuit de Mots Mélangés ?',
        answer: `Onze langues sont disponibles pour l'interface et le contenu. Français, anglais, allemand, espagnol et italien sont inclus. Portugais, néerlandais, suédois, danois, norvégien et finnois aussi.

Les noms d'images s'adaptent automatiquement à la langue choisie. Une image de pomme génère "POMME" en français et "APPLE" en anglais. Parfait pour les fiches à imprimer gratuit en classe bilingue ou FLE.`,
      },
      {
        id: '6',
        question: 'Puis-je Vendre les Fiches Maternelle que je Crée avec ce Générateur ?',
        answer: `Oui. L'abonnement Pack Essentiel inclut la licence commerciale POD complète. Vendez vos fiches maternelle sur Teachers Pay Teachers sans frais supplémentaires. Proposez vos créations sur Etsy ou Amazon KDP en toute légalité.

Aucune attribution n'est requise sur vos produits vendus. La qualité 300 DPI convient parfaitement à la vente professionnelle. Créez des packs thématiques et développez votre activité d'enseignant entrepreneur.`,
      },
      {
        id: '7',
        question: 'Comment Personnaliser les Exercices CP de Mots Mélangés pour mes Élèves ?',
        answer: `La personnalisation commence dès la sélection des images. Choisissez des thèmes adaptés à votre progression pédagogique. Téléversez vos propres images pour des exercices CP uniques. Modifiez les noms d'images pour cibler un vocabulaire précis.

Après génération, tout reste modifiable sur le canevas. Déplacez, redimensionnez et faites pivoter chaque élément. Ajoutez du texte personnalisé avec vos consignes. Changez les couleurs pour correspondre à votre thème de classe.`,
      },
      {
        id: '8',
        question: 'Quels Âges Conviennent le Mieux pour les Fiches Maternelle de Mots Mélangés ?',
        answer: `Les mots mélangés conviennent aux enfants de 4 à 8 ans principalement. La moyenne et grande section de maternelle commencent avec le mode facile. Les élèves de CP maîtrisent progressivement les modes intermédiaires. Le CE1 utilise le mode sans indices pour consolider l'orthographe.

Le code couleur voyelles-consonnes aide les plus jeunes. Les images visuelles soutiennent les pré-lecteurs. La difficulté progressive accompagne le développement de chaque enfant.`,
      },
      {
        id: '9',
        question: 'Puis-je Téléverser mes Propres Images pour Apprendre à Lire ?',
        answer: `Oui, le téléversement d'images personnelles est inclus. Importez plusieurs fichiers simultanément. Les formats JPEG, PNG et GIF sont acceptés. Vos images s'ajoutent à la bibliothèque pour la session en cours.

Créez des exercices pour apprendre à lire avec des photos de classe. Utilisez des images de la mascotte de l'école. Personnalisez avec des photos de sorties scolaires. Les élèves adorent reconnaître des images familières.`,
      },
      {
        id: '10',
        question: 'Combien de Temps Faut-il pour Créer une Fiche Maternelle de Mots Mélangés ?',
        answer: `Trois minutes suffisent pour créer une fiche maternelle complète. La sélection d'images prend environ une minute. La configuration des paramètres demande 30 secondes. La génération est instantanée.

La personnalisation optionnelle ajoute quelques minutes selon vos besoins. Comparé aux 30-60 minutes de création manuelle, le gain de temps est considérable. Créez cinq fiches en moins de 15 minutes.`,
      },
      {
        id: '11',
        question: 'Les Fiches de Mots Mélangés Incluent-elles un Corrigé pour l\'Écriture Cursive ?',
        answer: `Oui, chaque fiche génère automatiquement un corrigé. Le corrigé montre les mots correctement orthographiés. Téléchargez fiche et corrigé séparément en PDF ou JPEG. Parfait pour l'auto-correction ou la vérification par l'enseignant.

Les élèves peuvent recopier le mot correct en écriture cursive après correction. Ajoutez une ligne d'écriture sous chaque exercice pour cette pratique. Combinez déchiffrage et écriture cursive dans une même activité.`,
      },
      {
        id: '12',
        question: 'Puis-je Créer des Fiches Maternelle sur des Thèmes Scolaires Spécifiques ?',
        answer: `La bibliothèque de 3000+ images couvre de nombreux thèmes. Animaux, nourriture, véhicules, nature et objets quotidiens sont disponibles. Utilisez la recherche pour trouver des images précises rapidement.

Pour des thèmes très spécifiques, téléversez vos propres images. Créez des fiches maternelle sur votre projet de classe. Les images de sortie au zoo deviennent des exercices de vocabulaire. Personnalisez selon vos besoins pédagogiques exacts.`,
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
  },

  // Related Apps - From word-scramble.md Section 7
  relatedApps: {
    sectionTitle: 'Combinez les Mots Mélangés avec d\'Autres Générateurs - Coloriage à Imprimer et Exercices Maths',
    sectionDescription: 'Le générateur de mots mélangés fait partie du Pack Essentiel. Neuf autres générateurs complètent parfaitement cet outil. Créez des parcours pédagogiques complets en combinant plusieurs applications.',
    ctaTitle: 'Prêt à Créer des Fiches Professionnelles ?',
    ctaDescription: 'Rejoignez des milliers d\'enseignants qui créent des fiches maternelle de qualité. Création illimitée, licence commerciale incluse.',
    primaryCtaText: 'Essai Gratuit',
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
        slug: 'coloriage',
        name: 'Coloriage à Imprimer',
        category: 'Arts et Motricité',
        icon: '🎨',
        description: 'Le graphisme maternelle et le vocabulaire se renforcent mutuellement. Les élèves colorient l\'image puis déchiffrent le mot correspondant. Une activité complète en deux étapes.',
      },
      {
        id: '2',
        slug: 'exercices-maths',
        name: 'Exercices Maths',
        category: 'Mathématiques',
        icon: '➕',
        description: 'Alternez calcul et vocabulaire pour varier les activités. Les élèves restent concentrés grâce à cette diversité. Les deux compétences progressent simultanément.',
      },
      {
        id: '3',
        slug: 'tables-multiplication',
        name: 'Tables de Multiplication',
        category: 'Mathématiques',
        icon: '✖️',
        description: 'Les tables de multiplication demandent une pratique régulière. Intercalez des mots mélangés entre les séries de calculs. La pause cognitive permet de consolider les apprentissages.',
      },
      {
        id: '4',
        slug: 'ecriture-cursive',
        name: 'Écriture Cursive',
        category: 'Écriture',
        icon: '✍️',
        description: 'L\'élève déchiffre le mot puis le recopie en cursive. Apprendre à lire et écrire deviennent une seule activité. La mémorisation s\'ancre par le geste d\'écriture.',
      },
      {
        id: '5',
        slug: 'graphisme-maternelle',
        name: 'Graphisme Maternelle',
        category: 'Motricité Fine',
        icon: '〰️',
        description: 'Le graphisme maternelle prépare les jeunes enfants aux mots mélangés. Les exercices de tracés développent la reconnaissance des formes. Ces prérequis facilitent l\'apprentissage ultérieur.',
      },
      {
        id: '6',
        slug: 'alphabet',
        name: 'Train de l\'Alphabet',
        category: 'Lecture',
        icon: '🚂',
        description: 'Le train de l\'alphabet renforce l\'apprentissage des lettres. Combinez avec les mots mélangés pour un parcours complet. Les élèves reconnaissent les lettres dans un contexte ludique.',
      },
    ],
  },
};

export default wordScrambleFrContent;
