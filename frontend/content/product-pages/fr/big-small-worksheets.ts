import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Big Small Worksheets - French Content
 *
 * File: frontend/content/product-pages/fr/big-small-worksheets.ts
 * URL: /fr/apps/grand-petit-fiches (French SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/French/big-small.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 *
 * Pricing Tier: Accès Complet (Accès Complet) - 240€/year
 */

export const bigSmallFrContent: ProductPageContent = {
  // SEO Metadata - French language-specific
  seo: {
    slug: 'grand-petit-fiches',
    appId: 'big-small',
    title: 'Fiches Grand Petit | Exercices Maternelle CP',
    description: 'Créez des fiches grand petit avec comparaison de tailles pour maternelle et CP. 3 000+ images, corrigé automatique. PDF 300 DPI en 3 minutes.',
    keywords: 'fiches grand et petit, fiches maternelle, fiches à imprimer gratuit, exercices CP, exercices CE1, exercices maths, graphisme maternelle, coloriage à imprimer, apprendre à lire, comparaison de tailles',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fr/apps/grand-petit-fiches',
      },

  // Hero Section - FULL text from big-small.md paragraphs 1-3
  hero: {
    title: 'Fiches Grand et Petit à Imprimer',
    subtitle: 'Exercices CP et Fiches Maternelle pour Comparer les Tailles',
    description: `Créez des fiches pédagogiques pour enseigner les notions de grand et petit à vos élèves. Votre abonnement Accès Complet vous donne accès à la création illimitée de fiches sans frais supplémentaires. Générez des exercices de comparaison de tailles en moins de 3 minutes. Téléchargez des fichiers PDF haute résolution prêts à imprimer.

Les exercices de comparaison de tailles sont essentiels au développement cognitif des enfants. Cette compétence mathématique fondamentale prépare les élèves aux concepts de mesure et de numération. Notre générateur de fiches simplifie la création de ces activités pédagogiques.

Les fiches de comparaison de tailles conviennent parfaitement aux classes de maternelle. De la Petite Section à la Grande Section, les enfants apprennent à distinguer le grand du petit. Ces exercices développent le sens de l'observation et la discrimination visuelle.`,
    previewImageSrc: '/samples/french/big-small/sample-1.jpeg',
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
        videoId: 'S2s2U6Nb7FI',
        buttonText: 'Fonctions Grand-Petit',
        modalTitle: 'Tutoriel Grand-Petit',
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

  // Sample Gallery - REAL file paths from samples/english/big small/
  samples: {
    sectionTitle: 'Fiche Gratuite pour Enfants - Fiches Gratuites et Imprimables Gratuits',
    sectionDescription: 'Téléchargez imprimables gratuits - Fiche gratuite pour enfants de qualité professionnelle. Fiches gratuites et fiche pour enfants parfaites pour fiche pour maternelle. Fiche gratuite pour enfants et fiches gratuites inclus matériel éducatif. Fiche gratuite et fiches gratuites disponible',
    downloadLabel: 'Télécharger Exemple Gratuit',
    worksheetLabel: 'Fiche Grand et Petit',
    answerKeyLabel: 'Clé de Correction',
    viewAllLabel: 'Agrandir',
    noPdfLabel: 'Aperçu uniquement',
    freePdfCountLabel: 'téléchargements gratuits',
    badgeText: 'Exemples Gratuits',
    downloadingLabel: 'Téléchargement...',
    ofLabel: 'sur',
    items: [],
    
  },

  // Features Grid - FULL text from big-small.md feature sections
  features: {
    sectionTitle: 'Fiches Gratuites et Fiche pour Enfants - Imprimables Gratuits et Fiche pour Maternelle',
    sectionDescription: 'Notre générateur de fiches grand et petit offre des fonctionnalités complètes pour les enseignants. Créez des exercices de comparaison de tailles adaptés à tous les niveaux. De la maternelle au CP, chaque fiche répond aux besoins pédagogiques spécifiques. Découvrez les sept fonctionnalités principales qui font de cet outil un incontournable pour votre classe.',
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

  // How-To Guide - FULL text from big-small.md step sections
  howTo: {
    sectionTitle: 'Fiche Gratuite pour Enfants Créer - Fiche pour Maternelle',
    sectionDescription: 'Créer des fiches de comparaison de tailles ne prend que quelques minutes. Suivez ce guide étape par étape pour générer vos premiers exercices. Aucune compétence technique n\'est nécessaire. Même les enseignants débutants en informatique réussissent du premier coup. Votre fiche à imprimer sera prête en moins de 3 minutes.',
    ctaText: 'Commencer Maintenant',
    badgeText: 'Guide Étape par Étape',
    stepLabel: 'Étape',
    completionTitle: 'Terminé !',
    completionSubtitle: 'Vos fiches grand et petit sont prêtes',
    readyTime: 'Prêt en moins de 3 minutes',
    noSkillsNeeded: 'Aucune compétence en design requise',
    readMoreLabel: 'Lire la suite',
    showLessLabel: 'Voir moins',
    steps: [
      {
        id: '1',
        number: 1,
        title: 'Étape 1 : Choisir le Contenu pour vos Fiches Maternelle - Sélection de Thèmes et Images pour Apprendre à Comparer',
        description: `La première étape consiste à choisir les images pour vos exercices. Vous avez trois options pour alimenter vos fiches maternelle. Chaque méthode convient à différents besoins pédagogiques.

Sélectionnez un thème complet depuis le menu déroulant. Les animaux, les véhicules et les fruits sont particulièrement appréciés. Le générateur choisira automatiquement des images variées du thème. Cette méthode est la plus rapide pour créer des fiches à imprimer gratuit.

Vous pouvez aussi parcourir la bibliothèque d'images manuellement. Cliquez sur les images que vous souhaitez utiliser. Elles s'ajoutent à votre sélection en bas de l'écran. Cette approche permet un contrôle total sur le contenu.

La troisième option est d'importer vos propres images. Téléchargez des photos depuis votre ordinateur. Combinez-les avec les images de la bibliothèque. Créez des exercices personnalisés avec des objets familiers aux élèves.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Étape 2 : Configurer les Paramètres d\'Exercices CP - Nombre de Questions et Type de Fiches à Imprimer',
        description: `Configurez ensuite les paramètres de vos exercices CP. Le panneau de réglages offre plusieurs options de personnalisation. Chaque paramètre influence la difficulté et le format de la fiche.

Définissez le nombre d'exercices par fiche. Vous pouvez créer entre 1 et 10 exercices. Pour les fiches maternelle de Petite Section, 4 exercices suffisent. Les élèves de Grande Section peuvent en traiter davantage.

Choisissez le nombre d'images par exercice. L'option 2 images convient aux débutants. L'option 3 images introduit la notion de taille moyenne. Cette progression accompagne l'apprentissage des élèves.

Sélectionnez le type de question parmi cinq possibilités. "Entoure le plus grand" est le plus courant. "Entoure le plus petit" offre une variante. Les exercices de classement du plus petit au plus grand développent la logique.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Étape 3 : Générer la Fiche avec Exercices Maths et Graphisme Maternelle - Aperçu Instantané sur l\'Écran',
        description: `Cliquez sur le bouton "Créer" pour générer votre fiche. L'aperçu apparaît instantanément sur le canevas. Les exercices maths de comparaison s'affichent avec les images sélectionnées. Chaque élément est déjà positionné de manière optimale.

Le générateur crée automatiquement des tailles différentes pour chaque image. L'écart de taille est toujours clairement visible. Les élèves n'auront aucune difficulté à distinguer le grand du petit. Cette clarté est essentielle pour le graphisme maternelle.

Vérifiez que la fiche correspond à vos attentes. Les consignes apparaissent en haut de chaque exercice. Les images sont réparties uniformément sur la page. Le nombre d'exercices correspond à votre sélection.

Si le résultat ne vous convient pas, cliquez à nouveau sur "Créer". Une nouvelle disposition sera générée avec les mêmes paramètres. Répétez jusqu'à obtenir la fiche parfaite pour vos fiches maternelle.`,
        icon: '🎨',
      },
      {
        id: '4',
        number: 4,
        title: 'Étape 4 : Personnaliser sur le Canevas - Écriture et Coloriage à Imprimer avec Modifications Libres',
        description: `Le canevas d'édition permet de personnaliser chaque élément. Cliquez sur une image pour la sélectionner. Déplacez-la en maintenant le bouton de la souris enfoncé. Redimensionnez avec les poignées d'angle.

Ajoutez du texte pour enrichir vos fiches avec de l'écriture personnalisée. Tapez un titre ou des consignes supplémentaires. Choisissez la police, la taille et la couleur. Le texte s'intègre parfaitement à votre coloriage à imprimer.

Modifiez l'arrière-plan pour rendre la fiche plus attrayante. Sélectionnez un thème dans le menu des arrière-plans. Ajustez l'opacité pour que les images restent visibles. Les bordures décoratives apportent une touche finale.

Utilisez les outils d'alignement pour une mise en page professionnelle. Centrez les éléments horizontalement ou verticalement. Alignez plusieurs objets entre eux. Ces ajustements garantissent un rendu impeccable.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Étape 5 : Télécharger les Fiches à Imprimer Gratuit avec Alphabet et Exercices CP - Format PDF Haute Qualité',
        description: `Votre fiche est prête pour le téléchargement. Cliquez sur le bouton "Télécharger" pour accéder aux options. Plusieurs formats sont disponibles selon vos besoins. Chaque format garantit une qualité professionnelle.

Le format PDF est idéal pour l'impression directe. La résolution de 300 DPI assure des images nettes. Vos fiches avec alphabet et exercices CP auront un aspect professionnel. Les parents apprécieront la qualité des supports.

Le format JPEG convient aux usages numériques. Intégrez les fiches dans des présentations ou des documents. Partagez-les par email avec les familles. L'option noir et blanc économise l'encre lors de l'impression.

Générez également le corrigé en un clic. La fiche réponse montre les solutions avec des coches vertes. Pour les exercices de classement, les numéros apparaissent. Distribuez le corrigé aux élèves pour l'auto-correction.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from big-small.md use case sections
  useCases: {
    sectionTitle: 'Fiche Gratuite pour Enfants - Fiche pour Maternelle avec Imprimables Gratuits. Fiche pour Enfants',
    sectionDescription: 'Notre générateur de fiches s\'adresse à tous les professionnels de l\'éducation. Les enseignants de maternelle et de CP y trouvent des ressources adaptées. Les parents pratiquant l\'instruction en famille apprécient également cet outil. Découvrez comment chaque profil utilise nos fiches à imprimer gratuit.',
    badgeText: 'Cas d\'Utilisation',
    readMoreLabel: 'Lire la suite',
    showLessLabel: 'Voir moins',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // FAQ Section - Selected FAQs from big-small.md
  faq: {
    sectionTitle: 'FAQ - Fiche Gratuite pour Enfants et Fiche pour Maternelle. Fiche pour Enfants',
    sectionDescription: 'Vous avez des questions sur notre générateur de fiches grand et petit ? Cette section répond aux interrogations les plus courantes. Des tables de multiplication aux exercices pour apprendre à lire, nous couvrons tous les sujets. Trouvez rapidement les informations dont vous avez besoin sur les exercices maths et autres fonctionnalités.',
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
        question: 'Comment fonctionne le g\u00e9n\u00e9rateur de fiches grand et petit ?',
        answer: 'Le g\u00e9n\u00e9rateur cr\u00e9e des exercices o\u00f9 les \u00e9l\u00e8ves comparent les tailles d\'images. Les images identiques sont affich\u00e9es en diff\u00e9rentes tailles et les enfants doivent identifier la plus grande ou la plus petite. L\'\u00e9cart de taille est toujours clairement visible pour faciliter la discrimination visuelle.',
      },
      {
        id: 'faq-2',
        question: 'Quels types d\'exercices de comparaison sont propos\u00e9s ?',
        answer: 'Cinq types d\'exercices sont disponibles : entourer le plus grand, entourer le plus petit, identifier le plus grand parmi trois images, identifier le plus petit parmi trois images, et classer du plus petit au plus grand. Vous pouvez choisir entre des exercices avec 2 ou 3 images par question pour varier la difficult\u00e9.',
      },
      {
        id: 'faq-3',
        question: '\u00c0 quelle tranche d\'\u00e2ge s\'adressent ces fiches ?',
        answer: 'Les fiches grand et petit sont con\u00e7ues pour les enfants de maternelle et de d\u00e9but de CP, soit de 3 \u00e0 6 ans environ. Elles d\u00e9veloppent la discrimination visuelle et le sens de l\'observation, des comp\u00e9tences fondamentales pour les math\u00e9matiques. Le nombre d\'exercices par fiche s\'adapte de 1 \u00e0 10 selon le niveau.',
      },
      {
        id: 'faq-4',
        question: 'Puis-je personnaliser les images utilis\u00e9es dans les exercices ?',
        answer: 'Oui, trois options s\'offrent \u00e0 vous : s\u00e9lectionner un th\u00e8me complet dans le menu d\u00e9roulant, choisir des images individuelles dans la biblioth\u00e8que de 3000 illustrations, ou t\u00e9l\u00e9verser vos propres images. Vous pouvez aussi combiner ces m\u00e9thodes pour cr\u00e9er des exercices adapt\u00e9s \u00e0 votre programme.',
      },
      {
        id: 'faq-5',
        question: 'Les fiches incluent-elles un corrig\u00e9 ?',
        answer: 'Oui, un corrig\u00e9 automatique est g\u00e9n\u00e9r\u00e9 pour chaque fiche. La fiche r\u00e9ponse montre les solutions avec des coches vertes pour les exercices d\'identification et des num\u00e9ros pour les exercices de classement. Vous pouvez t\u00e9l\u00e9charger le corrig\u00e9 s\u00e9par\u00e9ment pour la correction ou l\'auto-\u00e9valuation des \u00e9l\u00e8ves.',
      },
      {
        id: 'faq-6',
        question: 'Quels formats de fichier sont disponibles pour les fiches grand et petit ?',
        answer: 'Les fiches se t\u00e9l\u00e9chargent en PDF pour l\'impression ou en JPEG pour le partage num\u00e9rique. La r\u00e9solution de 300 DPI assure des images claires o\u00f9 l\'\u00e9cart de taille entre les objets reste bien visible. Le corrig\u00e9 se t\u00e9l\u00e9charge s\u00e9par\u00e9ment dans les m\u00eames formats.',
      },
      {
        id: 'faq-7',
        question: 'Les fiches grand et petit fonctionnent-elles en plusieurs langues ?',
        answer: 'Oui, le g\u00e9n\u00e9rateur prend en charge onze langues pour les noms d\'images et les consignes. Les \u00e9tiquettes s\'adaptent automatiquement \u00e0 la langue s\u00e9lectionn\u00e9e. Parfait pour les classes bilingues ou l\'enseignement du fran\u00e7ais langue \u00e9trang\u00e8re.',
      },
      {
        id: 'faq-8',
        question: 'Quelle est la diff\u00e9rence entre les exercices avec 2 et 3 images ?',
        answer: 'Les exercices \u00e0 2 images proposent une comparaison directe entre grand et petit, id\u00e9ale pour les d\u00e9butants. Les exercices \u00e0 3 images introduisent la notion de taille moyenne et permettent des classements, ce qui d\u00e9veloppe davantage le raisonnement logique.',
      },
      {
        id: 'faq-9',
        question: 'Comment optimiser l\'impression des fiches de comparaison de tailles ?',
        answer: 'Imprimez en format PDF sur papier A4 blanc pour un contraste optimal. Les diff\u00e9rences de taille doivent rester clairement visibles apr\u00e8s impression. L\'option niveaux de gris fonctionne bien car la distinction repose sur la taille, pas sur les couleurs.',
      },
      {
        id: 'faq-10',
        question: 'Puis-je vendre les fiches grand et petit cr\u00e9\u00e9es ?',
        answer: 'Oui, la licence commerciale de l\'abonnement Acc\u00e8s Complet autorise la vente sur toutes les plateformes \u00e9ducatives. Cr\u00e9ez des cahiers th\u00e9matiques de comparaison de tailles avec diff\u00e9rents th\u00e8mes pour diversifier votre offre commerciale.',
      },
      {
        id: 'faq-11',
        question: 'Comment fonctionne l\'abonnement Acc\u00e8s Complet ?',
        answer: 'L\'abonnement Acc\u00e8s Complet \u00e0 240 \u20ac par an donne acc\u00e8s aux 33 g\u00e9n\u00e9rateurs de la plateforme, dont les fiches grand et petit. Cr\u00e9ation illimit\u00e9e, licence commerciale et support inclus. R\u00e9siliation possible \u00e0 tout moment.',
      },
      {
        id: 'faq-12',
        question: 'Comment t\u00e9l\u00e9verser mes propres images pour les exercices ?',
        answer: 'Cliquez sur le bouton d\'import et s\u00e9lectionnez vos fichiers JPEG, PNG ou GIF. Vos images s\'ajoutent \u00e0 la s\u00e9lection disponible. Le g\u00e9n\u00e9rateur cr\u00e9e automatiquement les diff\u00e9rentes tailles \u00e0 partir de votre image originale.',
      },
      {
        id: 'faq-13',
        question: 'Les exercices de comparaison correspondent-ils au programme scolaire ?',
        answer: 'Oui, la comparaison de tailles fait partie des comp\u00e9tences fondamentales en maternelle. Les programmes du cycle 1 incluent le tri, le classement et la comparaison d\'objets selon diff\u00e9rents crit\u00e8res. Ces fiches r\u00e9pondent directement aux attendus de fin de grande section.',
      },
      {
        id: 'faq-14',
        question: 'Comment adapter les fiches pour les \u00e9l\u00e8ves ayant des besoins sp\u00e9cifiques ?',
        answer: 'Limitez le nombre d\'exercices \u00e0 2 ou 3 par fiche et choisissez les exercices avec 2 images seulement. Utilisez des images tr\u00e8s contrast\u00e9es en taille pour faciliter la discrimination. Le mode entourer le plus grand est le plus accessible pour d\u00e9buter.',
      },
      {
        id: 'faq-15',
        question: 'Quels formats de page sont disponibles pour les fiches ?',
        answer: 'Les formats Letter et A4 sont propos\u00e9s en portrait et paysage. Le format portrait A4 est le standard pour les fiches scolaires en France. Le nombre d\'exercices s\'adapte automatiquement \u00e0 la taille de page choisie pour un espacement optimal.',
      },
      {
        id: 'faq-16',
        question: 'L\'impression en noir et blanc est-elle possible ?',
        answer: 'Oui, l\'option niveaux de gris convertit les fiches en noir et blanc. Les diff\u00e9rences de taille restent parfaitement visibles puisque le crit\u00e8re de comparaison est la dimension, pas la couleur. Id\u00e9al pour les impressions en s\u00e9rie.',
      },
      {
        id: 'faq-17',
        question: 'Comment personnaliser les fiches sur le canevas d\'\u00e9dition ?',
        answer: 'Le canevas permet de d\u00e9placer et redimensionner chaque image. Ajoutez des consignes personnalis\u00e9es, le nom de l\'\u00e9l\u00e8ve ou des instructions sp\u00e9cifiques. Choisissez un arri\u00e8re-plan th\u00e9matique et des bordures d\u00e9coratives pour des fiches attrayantes.',
      },
      {
        id: 'faq-18',
        question: 'Puis-je combiner les fiches grand et petit avec d\'autres activit\u00e9s ?',
        answer: 'Oui, associez les fiches de comparaison avec les exercices d\'addition pour renforcer les concepts de quantit\u00e9. Combinez avec les coloriages pour la motricit\u00e9 fine ou le tri d\'images pour approfondir les comp\u00e9tences de classement.',
      },
      {
        id: 'faq-19',
        question: 'Comment \u00e9valuer la progression en discrimination visuelle ?',
        answer: 'Commencez avec des exercices \u00e0 2 images et des \u00e9carts de taille importants. Passez progressivement \u00e0 3 images avec des diff\u00e9rences plus subtiles. Les exercices de classement du plus petit au plus grand constituent l\'\u00e9tape la plus avanc\u00e9e pour \u00e9valuer la ma\u00eetrise.',
      },
      {
        id: 'faq-20',
        question: 'Combien de temps faut-il pour cr\u00e9er une fiche grand et petit ?',
        answer: 'La cr\u00e9ation prend moins de trois minutes. Choisissez un th\u00e8me d\'images, d\u00e9finissez le type et le nombre d\'exercices, puis cliquez sur Cr\u00e9er. La fiche avec son corrig\u00e9 est g\u00e9n\u00e9r\u00e9e instantan\u00e9ment et pr\u00eate au t\u00e9l\u00e9chargement.',
      },
    ],

  },

  // Pricing - Acc\u00e8s Complet tier for Big Small
  pricing: {
    title: 'Accès Complet',
    price: '240€',
    priceInterval: '/an',
    priceSuffix: 'Facturé annuellement',
    benefits: [
      'Création illimitée de fiches grand et petit',
      'Accès aux 33 générateurs de la plateforme',
      'Licence commerciale incluse',
      '11 langues disponibles',
      '3000+ images thématiques',
      'Qualité 300 DPI professionnelle',
      'Clés de correction automatiques',
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

  // Related Apps - From big-small.md Section 7
  relatedApps: {
    sectionTitle: 'Fiches Gratuites Combiner - Fiche pour Enfants et Imprimables Gratuits',
    sectionDescription: 'Les fiches grand et petit s\'intègrent parfaitement à des packs pédagogiques complets. Combinez-les avec les 32 autres générateurs de la plateforme. Les tables de multiplication, les exercices de lecture et bien d\'autres outils créent des ensembles cohérents. Vos fiches à imprimer gratuit forment des séquences d\'apprentissage structurées pour tous les niveaux.',
    ctaTitle: 'Prêt à Créer des Fiches Grand et Petit Professionnelles ?',
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

export default bigSmallFrContent;
