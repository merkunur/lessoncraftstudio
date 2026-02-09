import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Pattern Worksheet - French Content
 *
 * File: frontend/content/product-pages/fr/pattern-worksheet-worksheets.ts
 * URL: /fr/apps/sequences-logiques-fiches (French SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/French/pattern-worksheet.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const patternWorksheetFrContent: ProductPageContent = {
  // SEO Metadata - French language-specific
  seo: {
    slug: 'sequences-logiques-fiches',
    appId: 'pattern-worksheet',
    title: 'Séquences Logiques Fiches | Générateur Maternelle',
    description: 'Créez des fiches de séquences logiques professionnelles en 3 minutes. Exercices maths et CP gratuits à imprimer. Téléchargez PDF haute qualité maintenant.',
    keywords: 'fiches maternelle, exercices maths, fiches à imprimer gratuit, exercices CP, exercices CE1, séquences logiques, graphisme maternelle, tables de multiplication, apprendre à lire, coloriage à imprimer',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fr/apps/sequences-logiques-fiches',
      },

  // Hero Section - FULL text from pattern-worksheet.md paragraphs 1-4
  hero: {
    title: 'Générateur de Fiches de Séquences',
    subtitle: 'Fiches Maternelle et Exercices Maths à Imprimer Gratuit',
    description: `Créez des fiches de séquences professionnelles avec notre générateur d'exercices maths. Votre abonnement Accès Complet vous donne accès illimité à la création de fiches sans frais par fiche. Générez des fiches maternelle personnalisées parfaites pour apprendre les lettres et développer le graphisme maternelle. Téléchargez des fiches à imprimer gratuit de haute qualité en moins de 3 minutes.

Notre générateur de fiches de séquences aide les enfants à reconnaître et compléter des motifs visuels. Les exercices CP et exercices CE1 développent la pensée logique et les fondations mathématiques. Chaque fiche de séquence renforce les compétences essentielles pour les tables de multiplication futures. Parfait pour l'apprentissage en maternelle et école élémentaire.

Les fiches de séquences combinent l'apprentissage visuel avec la logique mathématique. Les enfants apprennent à identifier les motifs AB simples ou les séquences ABCD complexes. Ces exercices préparent pour apprendre à lire et l'écriture cursive. Utilisez notre bibliothèque de 3000+ images adaptées aux enfants pour créer des fiches engageantes. Téléchargez en format PDF ou JPEG avec une qualité professionnelle de 300 DPI.

Les fiches de séquences développent la reconnaissance de motifs dès la petite section. Les enfants qui maîtrisent les séquences visuelles réussissent mieux en calcul et exercices maths. Cette compétence fondamentale prépare pour les tables de multiplication et la numération.`,
    previewImageSrc: '/samples/french/pattern/sample-1.jpeg',
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
    videos: {
      commonFeatures: {
        videoId: 'Df9fknBBRFA',
        buttonText: 'Découvrir en vidéo',
        modalTitle: 'Aperçu des fonctionnalités',
      },
      appSpecific: {
        videoId: 'W94X5_RA3ug',
        buttonText: 'Fonctions Fiches Séquences',
        modalTitle: 'Tutoriel Fiches Séquences',
      },
    },
  },

  // Sample Gallery - REAL file paths from samples/french/pattern/
  samples: {
    sectionTitle: 'Fiche Gratuite pour Enfants - Fiches Gratuites et Imprimables Gratuits',
    sectionDescription: 'Téléchargez imprimables gratuits - Fiche gratuite pour enfants de qualité professionnelle. Fiches gratuites et fiche pour enfants parfaites pour fiche pour maternelle. Fiche gratuite pour enfants et fiches gratuites inclus matériel éducatif. Fiche gratuite et fiches gratuites disponible',
    downloadLabel: 'Télécharger Exemple Gratuit',
    worksheetLabel: 'Fiche',
    answerKeyLabel: 'Corrigé',
    viewAllLabel: 'Agrandir',
    noPdfLabel: 'Aperçu uniquement',
    freePdfCountLabel: 'téléchargements gratuits',
    badgeText: 'Exemples Gratuits',
    downloadingLabel: 'Téléchargement...',
    ofLabel: 'sur',
    items: [],
    
  },

  // Features Grid - FULL text from pattern-worksheet.md feature sections
  features: {
    sectionTitle: 'Fiches Gratuites et Fiche pour Enfants - Imprimables Gratuits et Fiche pour Maternelle',
    sectionDescription: 'Notre générateur de fiches de séquences offre des fonctionnalités complètes pour créer des fiches maternelle professionnelles. Chaque fiche à imprimer gratuit peut être personnalisée en quelques clics. Les enseignants utilisent nos outils pour créer des exercices CP et exercices CE1 adaptés à chaque élève. Votre abonnement Accès Complet inclut toutes les fonctionnalités sans frais supplémentaires.',
    highlightBadgeText: 'Fonctionnalité Clé',
    readMoreLabel: 'Lire la suite',
    showLessLabel: 'Voir moins',
    badgeText: 'Fonctionnalités',
    trustBadges: {
      allFeatures: 'Toutes les fonctionnalités incluses',
      noHiddenFees: 'Aucun frais caché',
      cancelAnytime: 'Résiliez à tout moment',
    },
    items: [], // Samples loaded dynamically from content manager
    
  },

  // How-To Guide - FULL text from pattern-worksheet.md step sections
  howTo: {
    sectionTitle: 'Fiche Gratuite pour Enfants Créer - Fiche pour Maternelle',
    sectionDescription: 'Créez des fiches de séquences professionnelles en moins de 3 minutes chrono. Notre générateur simplifie la création de fiches maternelle et exercices maths. Aucune formation nécessaire pour produire des exercices CE1 de qualité. Suivez ces 5 étapes simples pour générer vos fiches à imprimer gratuit.',
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
        title: 'Choisir Vos Images',
        description: `Commencez par sélectionner vos images dans notre bibliothèque de 3000+ ressources. Parcourez par thème ou recherchez des mots-clés spécifiques. Sélectionnez des images pour apprendre les lettres de l'alphabet. Choisissez des objets à compter pour exercices maths liés aux tables de multiplication. Cliquez sur une image pour l'assigner à l'élément A, B, C ou D de votre motif.

Vous pouvez également téléverser vos propres photos et illustrations. Combinez images de bibliothèque et images personnalisées. Créez des fiches maternelle thématiques autour de sujets étudiés en classe. Utilisez des photos de votre classe pour exercices CP personnalisés. Les images apparaissent instantanément dans votre zone de travail.

Sélectionnez un thème global pour appliquer à tous les exercices. Ou configurez chaque exercice individuellement avec images différentes. Parfait pour créer des fiches à imprimer gratuit variées et engageantes.`,
        icon: '🎯',
      },
      {
        id: '2',
        number: 2,
        title: 'Configurer les Paramètres',
        description: `Configurez le nombre d'exercices de 1 à 8 par fiche maternelle. Sélectionnez votre type de motif parmi 9 options différentes. Les motifs AB simples conviennent pour petite et moyenne section. Les motifs ABCD complexes défient les élèves de CE1 et CE2. Choisissez le type de question - boîte vide ou choix multiples.

Activez l'option "Numéros de puzzle" pour aider les jeunes enfants. Activez "Début aléatoire" pour varier la difficulté des exercices maths. Cochez "Position aléatoire boîte vide" pour exercices CP imprévisibles. Configurez chaque exercice individuellement pour différenciation pédagogique. Adaptez la complexité selon les besoins de chaque élève.

Sélectionnez votre format de page - Letter portrait, A4 paysage ou personnalisé. Choisissez un thème de fond parmi nos options décoratives. Ajustez l'opacité du fond pour fiches de graphisme maternelle lisibles.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Générer Votre Fiche',
        description: `Cliquez sur le bouton "Créer" pour générer votre fiche de séquences. Votre fiche maternelle apparaît instantanément sur le canevas. Tous les exercices maths sont disposés automatiquement avec espacement optimal. Chaque motif est créé selon vos paramètres configurés. La génération prend moins de 5 secondes même pour 8 exercices.

Prévisualisez votre fiche pour vérifier l'apparence générale. Vérifiez que les images sont claires et bien positionnées. Assurez-vous que les exercices CP correspondent au niveau visé. Vérifiez l'espacement entre exercices pour éviter confusion visuelle.

Générez le corrigé en cliquant sur "Créer Corrigé". Le corrigé montre toutes les réponses correctes pour vos exercices CE1. Basculez entre onglet Fiche et onglet Corrigé facilement. Comparez fiche d'exercice et solution pour vérification.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Éditer sur Canevas',
        description: `Personnalisez chaque élément directement sur le canevas d'édition. Cliquez sur n'importe quelle image pour la sélectionner et la modifier. Redimensionnez les images en tirant sur les poignées d'angle. Faites pivoter les éléments en utilisant le contrôle de rotation. Déplacez images et textes pour alignement parfait.

Ajoutez du texte pour instructions en écriture cursive ou consignes personnalisées. Sélectionnez parmi 7 polices différentes adaptées aux enfants. Modifiez la taille, couleur et contour de votre texte. Créez des titres pour vos fiches maternelle avec polices décoratives. Ajoutez noms d'élèves ou dates directement sur la fiche.

Utilisez les outils d'alignement pour disposition professionnelle. Alignez exercices maths à gauche, centre ou droite. Centrez titres et instructions parfaitement sur la page. Les outils de calques permettent d'organiser superposition des éléments.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Télécharger et Imprimer',
        description: `Téléchargez votre fiche maternelle en format PDF ou JPEG haute résolution. La qualité professionnelle 300 DPI garantit impression parfaite. Format PDF conserve mise en page exacte pour impression fiable. Format JPEG convient pour partage numérique et affichage en classe.

Activez l'option niveaux de gris pour économiser encre d'imprimante. Parfait pour écoles avec budgets limités ou impression massive. Les fiches à imprimer gratuit en niveaux de gris restent claires et lisibles. Les enfants peuvent colorier les images pour personnalisation supplémentaire.

Téléchargez séparément la fiche d'exercice et le corrigé. Imprimez la fiche pour vos élèves de maternelle ou CP. Conservez le corrigé pour correction rapide et évaluation. Imprimez sur papier ordinaire avec imprimante domestique ou professionnelle.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from pattern-worksheet.md use case sections
  useCases: {
    sectionTitle: 'Fiche Gratuite pour Enfants - Fiche pour Maternelle avec Imprimables Gratuits. Fiche pour Enfants',
    sectionDescription: 'Nos fiches de séquences bénéficient à différents types d\'éducateurs et contextes d\'apprentissage. Les enseignants de maternelle utilisent nos exercices maths pour développer la pensée logique. Les parents en instruction en famille créent des fiches à imprimer gratuit personnalisées. Les enseignants entrepreneurs vendent nos fiches sur Teachers Pay Teachers.',
    badgeText: 'Pour Qui',
    readMoreLabel: 'Lire la suite',
    showLessLabel: 'Voir moins',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // FAQ Section - Selected FAQs from pattern-worksheet.md
  faq: {
    sectionTitle: 'FAQ - Fiche Gratuite pour Enfants et Fiche pour Maternelle. Fiche pour Enfants',
    sectionDescription: 'Questions fréquentes sur notre générateur de fiches de séquences et nos fiches à imprimer gratuit.',
    showMoreText: 'Voir plus de questions',
    showLessText: 'Voir moins',
    badgeText: 'FAQ',
    readMoreLabel: 'Lire la suite',
    showLessLabel: 'Voir moins',
    secureCheckout: 'Paiement sécurisé',
    cancelAnytime: 'Résiliez à tout moment',
    items: [
      {
        id: 'faq-1',
        question: 'Comment fonctionne le g\u00e9n\u00e9rateur de fiches de s\u00e9quences ?',
        answer: 'Le g\u00e9n\u00e9rateur cr\u00e9e des exercices de compl\u00e9tion de motifs dans un format de grille structur\u00e9. Les \u00e9l\u00e8ves observent la s\u00e9quence d\u2019images et identifient l\u2019\u00e9l\u00e9ment qui compl\u00e8te le motif. Neuf types de motifs diff\u00e9rents sont disponibles, du simple AB au complexe ABCD.',
      },
      {
        id: 'faq-2',
        question: 'Quels types de s\u00e9quences peut-on cr\u00e9er ?',
        answer: 'Le g\u00e9n\u00e9rateur propose des motifs r\u00e9p\u00e9titifs comme AB et ABC, des motifs croissants et des s\u00e9quences de couleurs. Chaque exercice peut utiliser des bo\u00eetes vides ou des choix multiples comme type de question. Les motifs peuvent \u00eatre configur\u00e9s individuellement par exercice pour une diff\u00e9renciation p\u00e9dagogique.',
      },
      {
        id: 'faq-3',
        question: 'Peut-on ajuster la taille de la grille des exercices ?',
        answer: 'Oui, vous configurez de 1 \u00e0 8 exercices par fiche pour adapter la difficult\u00e9. Les fiches maternelle avec moins d\u2019exercices laissent plus d\u2019espace pour chaque motif. Les exercices CP et CE1 peuvent contenir davantage de s\u00e9quences pour une pratique intensive.',
      },
      {
        id: 'faq-4',
        question: 'Quelles comp\u00e9tences les fiches de s\u00e9quences d\u00e9veloppent-elles ?',
        answer: 'Les exercices renforcent la reconnaissance de motifs, le raisonnement logique et la pr\u00e9paration aux math\u00e9matiques. Les enfants qui ma\u00eetrisent les s\u00e9quences visuelles r\u00e9ussissent mieux en calcul et en exercices maths. Ces comp\u00e9tences fondamentales pr\u00e9parent aux tables de multiplication et \u00e0 la num\u00e9ration.',
      },
      {
        id: 'faq-5',
        question: 'Les corrig\u00e9s sont-ils inclus avec les fiches de s\u00e9quences ?',
        answer: 'Oui, un corrig\u00e9 complet est g\u00e9n\u00e9r\u00e9 automatiquement montrant toutes les s\u00e9quences compl\u00e9t\u00e9es. Basculez entre l\u2019onglet fiche d\u2019exercice et l\u2019onglet corrig\u00e9 en un clic. Les deux se t\u00e9l\u00e9chargent s\u00e9par\u00e9ment en PDF ou JPEG haute qualit\u00e9.',
      },
      {
        id: 'faq-6',
        question: 'Quels formats de fichier sont disponibles pour les fiches de s\u00e9quences ?',
        answer: 'Les fiches se t\u00e9l\u00e9chargent en PDF pour l\u2019impression professionnelle ou en JPEG pour le partage num\u00e9rique. La r\u00e9solution de 300 DPI garantit que les images des s\u00e9quences et les options de r\u00e9ponse restent parfaitement nettes et lisibles.',
      },
      {
        id: 'faq-7',
        question: 'Le g\u00e9n\u00e9rateur de s\u00e9quences fonctionne-t-il en plusieurs langues ?',
        answer: 'Oui, onze langues sont support\u00e9es pour les noms d\u2019images et les consignes. La biblioth\u00e8que de 3000 images s\u2019adapte automatiquement \u00e0 la langue s\u00e9lectionn\u00e9e. Les exercices de motifs visuels fonctionnent universellement quelle que soit la langue d\u2019enseignement.',
      },
      {
        id: 'faq-8',
        question: 'Comment fonctionnent les neuf types de motifs disponibles ?',
        answer: 'Les motifs vont du simple AB au complexe ABCD en passant par AAB, ABB, ABC, AABB et d\u2019autres variantes. Les motifs simples conviennent aux d\u00e9butants de maternelle tandis que les motifs complexes d\u00e9fient les \u00e9l\u00e8ves de CP et CE1. Chaque exercice peut utiliser un type de motif diff\u00e9rent.',
      },
      {
        id: 'faq-9',
        question: 'Comment optimiser l\u2019impression des fiches de s\u00e9quences ?',
        answer: 'Imprimez le PDF en qualit\u00e9 maximale sur papier A4 blanc pour que les s\u00e9quences d\u2019images soient clairement distinctes. V\u00e9rifiez que les options de choix multiples ou les bo\u00eetes vides sont bien visibles. L\u2019aper\u00e7u avant impression confirme la nettet\u00e9 de chaque motif.',
      },
      {
        id: 'faq-10',
        question: 'Puis-je vendre les fiches de s\u00e9quences cr\u00e9\u00e9es ?',
        answer: 'Oui, votre abonnement Acc\u00e8s Complet inclut une licence commerciale compl\u00e8te. Les cahiers de suites logiques et de reconnaissance de motifs sont tr\u00e8s demand\u00e9s sur les plateformes \u00e9ducatives. Cr\u00e9ez des s\u00e9ries progressives pour un catalogue attractif.',
      },
      {
        id: 'faq-11',
        question: 'Comment fonctionne l\u2019abonnement pour le g\u00e9n\u00e9rateur de s\u00e9quences ?',
        answer: 'L\u2019abonnement Acc\u00e8s Complet \u00e0 240 \u20ac par an donne acc\u00e8s aux 33 g\u00e9n\u00e9rateurs, dont les s\u00e9quences logiques. Cr\u00e9ation illimit\u00e9e de fiches avec corrig\u00e9s automatiques. Paiement s\u00e9curis\u00e9 et r\u00e9siliation disponible \u00e0 tout moment.',
      },
      {
        id: 'faq-12',
        question: 'Comment utiliser mes propres images pour les s\u00e9quences ?',
        answer: 'Cliquez sur le bouton de t\u00e9l\u00e9versement et importez vos fichiers JPEG, PNG ou GIF. Vos images s\u2019int\u00e8grent dans les motifs de s\u00e9quences comme les images de la biblioth\u00e8que. Les photos d\u2019objets du quotidien rendent les exercices plus concrets et personnalis\u00e9s.',
      },
      {
        id: 'faq-13',
        question: 'Les fiches de s\u00e9quences correspondent-elles au programme scolaire ?',
        answer: 'Oui, la reconnaissance de motifs et la compl\u00e9tion de s\u00e9quences sont des comp\u00e9tences fondamentales du cycle 1. Ces exercices pr\u00e9parent aux r\u00e9gularit\u00e9s math\u00e9matiques, aux algorithmes et au raisonnement d\u00e9ductif attendus dans les programmes de maternelle et CP.',
      },
      {
        id: 'faq-14',
        question: 'Comment adapter les fiches pour les \u00e9l\u00e8ves ayant des besoins sp\u00e9cifiques ?',
        answer: 'R\u00e9duisez le nombre d\u2019exercices \u00e0 1 ou 2 par fiche et choisissez le motif AB le plus simple. Le mode bo\u00eete vide est plus accessible que le choix multiples pour les d\u00e9butants. Augmentez la taille des images sur le canevas pour faciliter l\u2019observation des d\u00e9tails.',
      },
      {
        id: 'faq-15',
        question: 'Quels formats de page sont propos\u00e9s pour les fiches de s\u00e9quences ?',
        answer: 'Les formats Letter et A4 sont disponibles en portrait ou paysage. Le portrait A4 est le standard pour les fiches scolaires fran\u00e7aises. Le nombre d\u2019exercices s\u2019adapte automatiquement au format choisi, de 1 \u00e0 8 exercices par page.',
      },
      {
        id: 'faq-16',
        question: 'L\u2019option niveaux de gris est-elle disponible pour les s\u00e9quences ?',
        answer: 'Oui, le mode niveaux de gris convertit toutes les images en noir et blanc. Les formes des images restent reconnaissables pour identifier le motif. Cette option r\u00e9duit les co\u00fbts d\u2019impression pour les classes qui produisent beaucoup de fiches.',
      },
      {
        id: 'faq-17',
        question: 'Comment personnaliser les fiches sur le canevas d\u2019\u00e9dition ?',
        answer: 'D\u00e9placez et redimensionnez les s\u00e9quences d\u2019images et les zones de r\u00e9ponse librement. Ajoutez un titre personnalis\u00e9, des consignes ou le nom de l\u2019\u00e9l\u00e8ve. Les arri\u00e8re-plans th\u00e9matiques et les bordures d\u00e9coratives compl\u00e8tent la pr\u00e9sentation visuelle.',
      },
      {
        id: 'faq-18',
        question: 'Peut-on combiner les s\u00e9quences avec d\u2019autres g\u00e9n\u00e9rateurs ?',
        answer: 'Oui, associez les fiches de s\u00e9quences avec le train suites logiques pour varier les pr\u00e9sentations de motifs. Combinez avec les exercices de maths pour la num\u00e9ration ou les coloriages pour des pauses cr\u00e9atives. Ces associations cr\u00e9ent des cahiers p\u00e9dagogiques \u00e9quilibr\u00e9s.',
      },
      {
        id: 'faq-19',
        question: 'Comment \u00e9valuer la progression en reconnaissance de motifs ?',
        answer: 'Cr\u00e9ez des fiches de difficult\u00e9 croissante en passant des motifs AB aux motifs ABCD. Augmentez le nombre d\u2019exercices par fiche et passez du mode bo\u00eete vide au choix multiples. Le corrig\u00e9 automatique facilite l\u2019\u00e9valuation des comp\u00e9tences de raisonnement logique.',
      },
      {
        id: 'faq-20',
        question: 'Combien de temps faut-il pour cr\u00e9er une fiche de s\u00e9quences ?',
        answer: 'La cr\u00e9ation prend moins de trois minutes. S\u00e9lectionnez les images, d\u00e9finissez les types de motifs et le nombre d\u2019exercices, puis cliquez sur G\u00e9n\u00e9rer. La fiche avec ses s\u00e9quences, les zones de r\u00e9ponse et le corrig\u00e9 sont pr\u00eats instantan\u00e9ment.',
      },
    ],

  },

  // Pricing
  pricing: {
    title: 'Applications Accès Complet',
    price: '240€',
    priceInterval: '/an',
    priceSuffix: 'Facturation annuelle',
    benefits: [
      'Création de fiches illimitée',
      '33 générateurs de fiches',
      'Licence commerciale incluse',
      '11 langues supportées',
      '3000+ images thématiques',
      'Qualité d\'impression 300 DPI',
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
    sectionTitle: 'Fiches Gratuites Combiner - Fiche pour Enfants et Imprimables Gratuits',
    sectionDescription: 'Créez des paquets d\'apprentissage complets en combinant les fiches de séquences avec ces générateurs complémentaires.',
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
    items: [], // Samples loaded dynamically from content manager
    
  },
};

export default patternWorksheetFrContent;
