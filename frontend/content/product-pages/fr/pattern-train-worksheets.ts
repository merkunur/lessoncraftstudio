import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Pattern Train Worksheets - French Content
 *
 * File: frontend/content/product-pages/fr/pattern-train-worksheets.ts
 * URL: /fr/apps/train-suites-logiques-fiches (French SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/French/pattern-train.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const patternTrainFrContent: ProductPageContent = {
  // SEO Metadata - French language-specific
  seo: {
    slug: 'train-suites-logiques-fiches',
    appId: 'pattern-train',
    title: 'Suites Logiques Train | Fiches Maternelle CP',
    description: 'Créez des fiches maternelle professionnelles de reconnaissance de suites logiques avec notre générateur de train à motifs. Générez des exercices CP.',
    keywords: 'fiches maternelle, suites logiques, fiches à imprimer gratuit, exercices CP, train à motifs, reconnaissance de motifs, maternelle, CP, générateur fiches, suites AB ABC',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fr/apps/train-suites-logiques-fiches',
      },

  // Hero Section - FULL text from pattern-train.md paragraphs 1-4
  hero: {
    title: 'Générateur de Suites Logiques Train',
    subtitle: 'Fiches à Imprimer Gratuit pour Fiches Maternelle',
    description: `Créez des fiches maternelle professionnelles de reconnaissance de suites logiques avec notre générateur de train à motifs. Votre abonnement Accès Complet vous donne accès illimité à la création de fiches à imprimer gratuit sans frais par fiche. Générez des exercices CP personnalisés parfaits pour la maternelle et le CP. Téléchargez des fiches de haute qualité en PDF en moins de 3 minutes.

Notre générateur permet aux enseignants de créer des fiches maternelle de suites logiques avec des thèmes visuels engageants. Les enfants apprennent à reconnaître et compléter les suites visuelles en utilisant un modèle de train attractif. Chaque fiche à imprimer gratuit enseigne les concepts de suites logiques (AB, AAB, ABB, ABC, AABB) à travers des activités de découpage-collage interactives.

Le générateur s'adapte à tous les niveaux de maternelle. Créez des fiches maternelle simples avec des suites AB pour les petits. Développez des exercices CP plus complexes avec des suites ABC pour les grands. Chaque fiche inclut des images colorées, des instructions claires et une correction automatique.

Les enseignants gagnent du temps précieux. Créer des fiches maternelle de suites logiques manuellement prend 30-60 minutes. Notre générateur produit des fiches à imprimer gratuit professionnelles en 3 minutes. Ajustez la difficulté, choisissez les thèmes visuels et téléchargez instantanément. Vos exercices CP sont prêts pour la classe.`,
    previewImageSrc: '/samples/french/pattern-train/sample-1.jpeg',
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
        videoId: '5A4aHvcC5u4',
        buttonText: 'Fonctions Train Suites Logiques',
        modalTitle: 'Tutoriel Train Suites Logiques',
      },
    },
  },

  // Sample Gallery - REAL file paths from samples/english/pattern train/
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

  // Features Grid - FULL text from pattern-train.md feature sections
  features: {
    sectionTitle: 'Fiches Gratuites et Fiche pour Enfants - Imprimables Gratuits et Fiche pour Maternelle',
    sectionDescription: 'Notre générateur de fiches maternelle offre toutes les fonctionnalités nécessaires pour créer des exercices CP professionnels. Votre abonnement Accès Complet inclut sept outils puissants pour produire des fiches à imprimer gratuit de qualité. Chaque fonctionnalité simplifie la création de fiches maternelle personnalisées. Les enseignants créent des exercices CP adaptés à leurs élèves en quelques clics.',
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

  // How-To Guide - FULL text from pattern-train.md step sections
  howTo: {
    sectionTitle: 'Fiche Gratuite pour Enfants Créer - Fiche pour Maternelle',
    sectionDescription: 'Créer des fiches maternelle professionnelles prend moins de 3 minutes avec notre générateur. Suivez cinq étapes simples pour produire des exercices CP personnalisés. Aucune compétence technique requise. Les enseignants de maternelle créent des fiches à imprimer gratuit magnifiques dès la première utilisation.',
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
        title: 'Choisir Votre Type de Suite Logique',
        description: `Commencez par sélectionner votre type de suite logique dans le menu déroulant. Cinq options s'offrent à vous. La suite AB convient parfaitement aux petits de maternelle découvrant les suites logiques. Chat-chien-chat-chien représente une suite AB simple. Les enfants comprennent rapidement l'alternance.

La suite AAB introduit une complexité supplémentaire pour les moyens de maternelle. Chat-chat-chien-chat-chat-chien demande plus d'attention. Les élèves doivent compter les répétitions. Cette fiche maternelle développe la concentration et le dénombrement simultanément.

Les suites ABB, ABC et AABB conviennent aux grands de maternelle et au CP. La suite ABC utilise trois éléments différents. Chat-chien-oiseau-chat-chien-oiseau crée un défi cognitif intéressant. La suite AABB double chaque élément. Chat-chat-chien-chien-chat-chat-chien-chien enseigne les regroupements par paires.

Ajustez ensuite le nombre d'indices de 4 à 10. Plus d'indices rend la fiche maternelle plus facile. Montrez 8 éléments de la suite avant les espaces vides. Les enfants comprennent facilement le motif. Moins d'indices augmente la difficulté. Montrez seulement 4 éléments pour challenger les élèves avancés.`,
        icon: '🔤',
      },
      {
        id: '2',
        number: 2,
        title: 'Sélectionner Vos Images',
        description: `Choisissez maintenant les images pour votre suite logique. Deux options s'offrent à vous. La sélection automatique par thème simplifie le processus. Sélectionnez "Animaux de la ferme" dans le menu thématique. Le générateur choisit automatiquement des images coordonnées. Vache, cochon et mouton forment une suite cohérente. Votre fiche maternelle a l'apparence professionnelle d'un produit commercial.

La sélection manuelle offre un contrôle total. Parcourez la bibliothèque de 3000 images. Cliquez sur vos images préférées. Chaque clic assigne l'image à un élément de la suite. Le premier clic définit l'élément A. Le deuxième clic définit l'élément B. Pour une suite ABC, cliquez trois images différentes.

Le moteur de recherche accélère la sélection manuelle. Tapez "fruit" pour voir tous les fruits. Choisissez pomme, banane et orange pour une suite colorée. Tapez "véhicule" pour créer une fiche maternelle sur les transports. Voiture, camion, bus captivent les enfants passionnés de véhicules.

Importez vos propres images pour une personnalisation maximale. Cliquez sur le bouton de téléchargement. Sélectionnez plusieurs fichiers simultanément. Vos photos de classe apparaissent dans la section images uploadées. Cliquez dessus comme sur les images de bibliothèque.`,
        icon: '🖼️',
      },
      {
        id: '3',
        number: 3,
        title: 'Générer Votre Fiche Maternelle',
        description: `Cliquez sur le bouton bleu "Créer" pour générer votre fiche maternelle. Le générateur travaille instantanément. Moins de deux secondes plus tard, votre fiche à imprimer gratuit apparaît sur le canevas. Le modèle de train s'affiche avec votre suite logique placée dans les wagons.

Les premiers wagons montrent les indices selon votre configuration. Si vous avez choisi 6 indices, six wagons contiennent des images. Les wagons suivants restent vides. Les enfants doivent identifier le motif et compléter la suite. Des images de découpage apparaissent au bas de la fiche maternelle. Les élèves découpent et collent pour compléter la suite.

L'en-tête de la fiche affiche le titre "Suite Logique Train" dans votre langue sélectionnée. Des champs nom et date apparaissent si vous avez coché cette option. Le fond de page utilise votre couleur choisie. Votre thème de bordure encadre joliment l'activité. La fiche maternelle ressemble à un document professionnel imprimé.

Examinez attentivement votre création. Vérifiez que les images correspondent à vos intentions. Assurez-vous que le niveau de difficulté convient à vos élèves. Si tout est parfait, passez à l'étape 4.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Personnaliser sur le Canevas',
        description: `Maintenant vient la partie créative. Cliquez sur n'importe quel élément pour le sélectionner. Des poignées de redimensionnement apparaissent aux coins. Agrandissez ou réduisez les images en tirant les poignées. Faites pivoter les éléments en utilisant la poignée de rotation. Déplacez les images en les glissant avec votre souris.

Ajoutez du texte personnalisé pour renforcer l'apprentissage. Cliquez dans le champ texte et tapez vos instructions. "Découpe et colle les images pour compléter la suite" guide les élèves. Cliquez "Ajouter Texte" et votre phrase apparaît sur la fiche maternelle. Sélectionnez le texte pour modifier la couleur, la taille et la police. Ajoutez un contour noir pour améliorer la lisibilité.

Ajustez l'arrière-plan si désiré. Modifiez l'opacité du thème de fond pour un effet subtil. Changez la couleur de page pour correspondre à un thème saisonnier. Orange pour l'automne, bleu pour l'hiver, vert pour le printemps. Vos fiches à imprimer gratuit s'harmonisent avec vos projets de classe.

Les outils d'alignement perfectionnent la mise en page. Sélectionnez plusieurs images. Cliquez "Aligner à gauche" pour créer une rangée ordonnée. Utilisez "Centrer horizontalement" pour équilibrer la composition.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Télécharger et Imprimer',
        description: `Générez d'abord la correction en cliquant "Answer Key" dans le menu Créer. La correction affiche la suite complète avec toutes les réponses. Tous les wagons contiennent les bonnes images. Aucune image de découpage n'apparaît. La correction sert à vérifier le travail des élèves ou pour l'affichage au tableau.

Cliquez maintenant sur le bouton "Download" pour accéder aux options d'export. Quatre choix s'offrent à vous. "Worksheet JPEG" télécharge la fiche maternelle au format image. "Answer Key JPEG" télécharge la correction en image. Les formats JPEG conviennent pour l'insertion dans d'autres documents.

"Worksheet PDF" et "Answer Key PDF" offrent la meilleure qualité d'impression. Le PDF conserve la résolution 300 DPI parfaitement. Ouvrez le fichier et imprimez directement. La qualité reste nette et professionnelle. Les contours des images sont précis. Le texte est parfaitement lisible.

Cochez "Grayscale" avant de télécharger pour économiser l'encre couleur. La fiche maternelle en noir et blanc reste parfaitement utilisable. Les enfants colorient les images après avoir complété la suite. Cette option transforme vos exercices CP en activité de coloriage bonus. Les enseignants économisent 70% d'encre.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from pattern-train.md use case sections
  useCases: {
    sectionTitle: 'Fiche Gratuite pour Enfants - Fiche pour Maternelle avec Imprimables Gratuits. Fiche pour Enfants',
    sectionDescription: 'Notre générateur de fiches maternelle sert tous les professionnels de l\'éducation. Les enseignants de maternelle créent des exercices CP adaptés. Les parents en instruction à domicile produisent des fiches à imprimer gratuit personnalisées. Les orthophonistes développent du matériel thérapeutique ciblé.',
    badgeText: 'Pour Qui',
    readMoreLabel: 'Lire la suite',
    showLessLabel: 'Voir moins',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // FAQ Section - Selected FAQs from pattern-train.md
  faq: {
    sectionTitle: 'FAQ - Fiche Gratuite pour Enfants et Fiche pour Maternelle. Fiche pour Enfants',
    sectionDescription: 'Questions fréquentes sur notre générateur de suites logiques et nos fiches à imprimer gratuit.',
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
        question: 'Comment fonctionne le g\u00e9n\u00e9rateur de suites logiques train ?',
        answer: 'Le g\u00e9n\u00e9rateur cr\u00e9e des s\u00e9quences d\u2019images plac\u00e9es dans des wagons de train que les enfants doivent compl\u00e9ter. Les premiers wagons montrent le motif avec des indices, et les \u00e9l\u00e8ves d\u00e9coupent et collent les images manquantes. Cette activit\u00e9 ludique combine reconnaissance de motifs et motricit\u00e9 fine.',
      },
      {
        id: 'faq-2',
        question: 'Quels types de suites logiques sont disponibles ?',
        answer: 'Cinq types de motifs sont propos\u00e9s : AB, AAB, ABB, ABC et AABB. Le motif AB est id\u00e9al pour les d\u00e9butants de maternelle avec une simple alternance de deux \u00e9l\u00e9ments. Les motifs AABB et ABC conviennent aux \u00e9l\u00e8ves plus avanc\u00e9s qui ma\u00eetrisent d\u00e9j\u00e0 les suites simples.',
      },
      {
        id: 'faq-3',
        question: '\u00c0 quel groupe d\u2019\u00e2ge s\u2019adressent les fiches train suites logiques ?',
        answer: 'Les fiches sont con\u00e7ues pour les enfants de 3 \u00e0 6 ans et enseignent la reconnaissance de motifs et la pens\u00e9e logique. Les petits de maternelle commencent par des suites AB avec beaucoup d\u2019indices. Les grands de maternelle et les \u00e9l\u00e8ves de CP travaillent sur des suites plus complexes.',
      },
      {
        id: 'faq-4',
        question: 'Peut-on choisir les images pour les wagons du train ?',
        answer: 'Oui, vous pouvez assigner automatiquement les images par th\u00e8me ou s\u00e9lectionner manuellement chaque \u00e9l\u00e9ment parmi plus de 3000 illustrations. La s\u00e9lection automatique cr\u00e9e des ensembles coh\u00e9rents par th\u00e8me. La s\u00e9lection manuelle offre un contr\u00f4le total sur chaque image.',
      },
      {
        id: 'faq-5',
        question: 'Combien de wagons peut-on mettre par train ?',
        answer: 'La longueur du train est personnalisable avec un nombre d\u2019indices r\u00e9glable de 4 \u00e0 10. Plus d\u2019indices rendent la fiche maternelle plus facile pour les jeunes enfants. Moins d\u2019indices augmentent la difficult\u00e9 en laissant plus de wagons vides \u00e0 compl\u00e9ter.',
      },
      {
        id: 'faq-6',
        question: 'Quels formats de fichier sont disponibles pour les fiches train suites logiques ?',
        answer: 'Les fiches se t\u00e9l\u00e9chargent en PDF pour l\u2019impression professionnelle ou en JPEG pour le partage num\u00e9rique. La r\u00e9solution de 300 DPI garantit que les images dans les wagons et les \u00e9l\u00e9ments \u00e0 d\u00e9couper restent parfaitement nets.',
      },
      {
        id: 'faq-7',
        question: 'Le g\u00e9n\u00e9rateur de train suites logiques fonctionne-t-il en plusieurs langues ?',
        answer: 'Oui, onze langues sont support\u00e9es pour les noms d\u2019images et les consignes de la fiche. La biblioth\u00e8que de 3000 images s\u2019adapte automatiquement \u00e0 la langue s\u00e9lectionn\u00e9e. Les exercices de suites logiques visuelles fonctionnent dans toutes les langues.',
      },
      {
        id: 'faq-8',
        question: 'Quelles sont les diff\u00e9rences entre les cinq types de suites ?',
        answer: 'Le motif AB alterne deux \u00e9l\u00e9ments et convient aux d\u00e9butants. Le motif AAB r\u00e9p\u00e8te un \u00e9l\u00e9ment avant d\u2019alterner, et ABB fait l\u2019inverse. Le motif ABC utilise trois \u00e9l\u00e9ments diff\u00e9rents. Le motif AABB alterne des paires identiques pour le niveau le plus avanc\u00e9.',
      },
      {
        id: 'faq-9',
        question: 'Comment optimiser l\u2019impression des fiches train suites logiques ?',
        answer: 'Imprimez le PDF en qualit\u00e9 maximale sur papier A4 blanc. Les images dans les wagons et les \u00e9l\u00e9ments \u00e0 d\u00e9couper doivent \u00eatre clairement visibles. Un papier l\u00e9g\u00e8rement plus \u00e9pais facilite le d\u00e9coupage et le collage par les jeunes enfants.',
      },
      {
        id: 'faq-10',
        question: 'Puis-je vendre les fiches train suites logiques cr\u00e9\u00e9es ?',
        answer: 'Oui, votre abonnement Acc\u00e8s Complet inclut une licence commerciale pour toutes les cr\u00e9ations. Les cahiers de suites logiques th\u00e9matiques avec trains sont tr\u00e8s appr\u00e9ci\u00e9s sur les plateformes \u00e9ducatives. Cr\u00e9ez des s\u00e9ries progressives pour un contenu attractif.',
      },
      {
        id: 'faq-11',
        question: 'Comment fonctionne l\u2019abonnement pour le g\u00e9n\u00e9rateur de trains ?',
        answer: 'L\u2019abonnement Acc\u00e8s Complet \u00e0 240 \u20ac par an donne acc\u00e8s aux 33 g\u00e9n\u00e9rateurs, dont le train suites logiques. Cr\u00e9ation illimit\u00e9e de fiches avec corrig\u00e9s automatiques. Paiement s\u00e9curis\u00e9 et r\u00e9siliation possible \u00e0 tout moment.',
      },
      {
        id: 'faq-12',
        question: 'Comment utiliser mes propres images dans les wagons du train ?',
        answer: 'Cliquez sur le bouton de t\u00e9l\u00e9versement et importez vos fichiers JPEG, PNG ou GIF. Vos images remplissent les wagons du train comme celles de la biblioth\u00e8que. Les mascottes de classe ou les objets familiers rendent les suites plus significatives pour les enfants.',
      },
      {
        id: 'faq-13',
        question: 'Les fiches train suites logiques correspondent-elles au programme scolaire ?',
        answer: 'Oui, la reconnaissance de motifs et les suites logiques sont des comp\u00e9tences fondamentales du cycle 1. Les programmes de maternelle incluent les algorithmes simples et la r\u00e9p\u00e9tition de motifs. Ces exercices pr\u00e9parent aux notions de r\u00e9gularit\u00e9 math\u00e9matique abord\u00e9es en CP.',
      },
      {
        id: 'faq-14',
        question: 'Comment adapter les fiches pour les \u00e9l\u00e8ves en difficult\u00e9 ?',
        answer: 'Commencez par le motif AB avec 8 \u00e0 10 indices pour laisser peu de wagons vides. Les images tr\u00e8s diff\u00e9rentes visuellement facilitent l\u2019identification du motif. R\u00e9duisez progressivement le nombre d\u2019indices lorsque l\u2019\u00e9l\u00e8ve ma\u00eetrise la suite simple.',
      },
      {
        id: 'faq-15',
        question: 'Quels formats de page sont propos\u00e9s pour les fiches train ?',
        answer: 'Les formats Letter et A4 sont disponibles en portrait ou paysage. Le format paysage est particuli\u00e8rement adapt\u00e9 aux trains longs qui s\u2019\u00e9tendent horizontalement. Le format portrait convient aux fiches avec plusieurs trains courts empil\u00e9s.',
      },
      {
        id: 'faq-16',
        question: 'L\u2019option niveaux de gris est-elle disponible pour les fiches train ?',
        answer: 'Oui, la case niveaux de gris convertit toutes les images en noir et blanc. Les contours des wagons et des images restent clairement d\u00e9finis. Les enfants peuvent m\u00eame colorier les images apr\u00e8s avoir compl\u00e9t\u00e9 la suite, transformant l\u2019exercice en activit\u00e9 double.',
      },
      {
        id: 'faq-17',
        question: 'Comment personnaliser la fiche train sur le canevas d\u2019\u00e9dition ?',
        answer: 'D\u00e9placez et redimensionnez le train et les \u00e9l\u00e9ments \u00e0 d\u00e9couper librement sur la page. Ajoutez un titre personnalis\u00e9, le nom de l\u2019\u00e9l\u00e8ve ou des consignes sp\u00e9cifiques. Les bordures d\u00e9coratives et les arri\u00e8re-plans th\u00e9matiques compl\u00e8tent la mise en page.',
      },
      {
        id: 'faq-18',
        question: 'Peut-on combiner le train suites logiques avec d\u2019autres g\u00e9n\u00e9rateurs ?',
        answer: 'Oui, associez les suites logiques train avec les fiches de s\u00e9quences pour varier les formats de reconnaissance de motifs. Combinez avec les coloriages pour la motricit\u00e9 fine ou les fiches d\u2019association pour le vocabulaire. Ces combinaisons cr\u00e9ent des cahiers \u00e9quilibr\u00e9s.',
      },
      {
        id: 'faq-19',
        question: 'Comment organiser une progression p\u00e9dagogique avec les suites logiques ?',
        answer: 'Commencez par le motif AB avec beaucoup d\u2019indices pour les d\u00e9butants. Passez ensuite aux motifs AAB et ABB, puis au motif ABC. Le motif AABB repr\u00e9sente le niveau le plus avanc\u00e9. R\u00e9duisez progressivement le nombre d\u2019indices pour augmenter le d\u00e9fi cognitif.',
      },
      {
        id: 'faq-20',
        question: 'Combien de temps faut-il pour cr\u00e9er une fiche train suites logiques ?',
        answer: 'La cr\u00e9ation prend moins de trois minutes. S\u00e9lectionnez les images, choisissez le type de motif et le nombre d\u2019indices, puis cliquez sur Cr\u00e9er. Le train avec ses wagons, les \u00e9l\u00e9ments \u00e0 d\u00e9couper et le corrig\u00e9 sont g\u00e9n\u00e9r\u00e9s instantan\u00e9ment.',
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
    sectionDescription: 'Créez des paquets d\'apprentissage complets en combinant les fiches de suites logiques avec ces générateurs complémentaires.',
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

export default patternTrainFrContent;
