import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Alphabet Train Worksheets - French Content
 *
 * File: frontend/content/product-pages/fr/alphabet-train-worksheets.ts
 * URL: /fr/apps/train-alphabet-fiches (French SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/French/alphabet-train.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const alphabetTrainFrContent: ProductPageContent = {
  // SEO Metadata - French language-specific
  seo: {
    slug: 'train-alphabet-fiches',
    appId: 'alphabet-train',
    title: 'Train Alphabet Fiches à Imprimer | Maternelle CP',
    description: 'Cr\u00e9ez des fiches alphabet avec reconnaissance des lettres en 11 langues. G\u00e9n\u00e9rateur train alphabet pour maternelle et CP. PDF haute qualit\u00e9 en 3 minutes.',
    keywords: 'fiches alphabet, fiches maternelle, apprendre les lettres, fiches à imprimer gratuit, exercices CP, exercices CE1, train alphabet, générateur fiches, graphisme maternelle, coloriage à imprimer',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fr/apps/train-alphabet-fiches',
      },

  // Hero Section - FULL text from alphabet-train.md paragraphs 1-5
  hero: {
    title: 'Générateur de Fiches Alphabet Gratuit',
    subtitle: 'Fiches à Imprimer Gratuit pour la Maternelle et le CP',
    description: `Créez des fiches alphabet professionnelles avec notre générateur de train alphabet multilingue. Votre abonnement Pack Essentiel vous offre une création illimitée de fiches maternelle. Générez des fiches à imprimer gratuit personnalisées en onze langues. Téléchargez vos fiches alphabet en PDF haute qualité en moins de trois minutes.

Notre générateur de train alphabet prend en charge onze alphabets complets avec les caractères appropriés. Les fiches alphabet allemandes incluent Ä, Ö et Ü aux positions correctes. Les fiches alphabet espagnoles incluent Ñ après N. Les fiches suédoises, danoises et norvégiennes comprennent Æ, Ø et Å. Les fiches finlandaises incluent Ä et Ö à la fin.

La bibliothèque d'images s'adapte automatiquement à la langue sélectionnée. Choisissez l'allemand et voyez les images étiquetées en allemand. Choisissez l'espagnol et voyez les images étiquetées en espagnol. Plus de 3000 images traduites dans les onze langues. Cela rend nos fiches alphabet parfaites pour l'apprentissage des langues en maternelle et en CP.

Chaque fiche alphabet présente un modèle de train coloré avec onze wagons. Les élèves associent les lettres aux images sur le train. Le design du train rend l'apprentissage de l'alphabet amusant et engageant. Parfait pour les fiches maternelle, les exercices CP et les exercices CE1.`,
    previewImageSrc: '/samples/french/alphabet-train/sample-1.jpeg',
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
        videoId: '_dDQegRq9JQ',
        buttonText: 'Fonctions Train Alphabet',
        modalTitle: 'Tutoriel Train Alphabet',
      },
    },
  },

  // Sample Gallery - REAL file paths from samples/english/alphabet train/
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

  // Features Grid - FULL text from alphabet-train.md feature sections
  features: {
    sectionTitle: 'Fiches Gratuites et Fiche pour Enfants - Imprimables Gratuits et Fiche pour Maternelle',
    sectionDescription: 'Notre générateur de train alphabet comprend des fonctionnalités puissantes conçues spécifiquement pour l\'éducation en maternelle. Créez des fiches alphabet professionnelles plus rapidement qu\'avec les méthodes traditionnelles. Les enseignants économisent trente à soixante minutes par fiche comparé à la création manuelle.',
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

  // How-To Guide - FULL text from alphabet-train.md step sections
  howTo: {
    sectionTitle: 'Fiche Gratuite pour Enfants Créer - Fiche pour Maternelle',
    sectionDescription: 'Créer des fiches alphabet professionnelles prend moins de trois minutes du début à la fin. Ce guide étape par étape montre exactement comment générer des fiches personnalisées pour votre classe. Aucune expérience en design n\'est nécessaire.',
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
        title: 'Choisissez Votre Langue et Sélectionnez Onze Lettres',
        description: `Commencez par sélectionner la langue souhaitée dans le menu déroulant. Choisissez parmi l'anglais, l'allemand, le français, l'espagnol, le portugais, l'italien, le néerlandais, le suédois, le danois, le norvégien ou le finnois. La grille alphabétique se met à jour instantanément pour afficher les lettres correctes de la langue sélectionnée.

Cliquez sur exactement onze lettres de l'alphabet affiché pour construire votre fiche. Le compteur de lettres montre votre progression vers l'exigence de onze lettres. Les lettres sélectionnées se mettent en surbrillance bleue pour que vous sachiez toujours lesquelles vous avez choisies.

Choisissez des lettres consécutives comme A à K pour des fiches alphabet séquentielles. Sélectionnez des lettres aléatoires pour des fiches de révision mixte. Pour une création plus rapide, activez la case création automatique.`,
        icon: '🔤',
      },
      {
        id: '2',
        number: 2,
        title: 'Associez les Images aux Lettres',
        description: `Après avoir sélectionné onze lettres, associez une image à chaque lettre pour votre fiche alphabet. Choisissez un thème dans le menu déroulant pour voir des collections d'images organisées. Sélectionnez le thème animaux pour des fiches alphabet de la ferme et du zoo.

Cliquez sur n'importe quelle image dans le panneau dictionnaire pour la prévisualiser. La boîte de prévisualisation montre l'image sélectionnée en grand avant l'association. Le système associe automatiquement les images aux lettres basé sur la première lettre du nom de l'image.

Recherchez des images spécifiques en utilisant la boîte de recherche pour des fiches alphabet personnalisées. Téléchargez vos propres images pour personnaliser les fiches alphabet pour votre classe.`,
        icon: '🖼️',
      },
      {
        id: '3',
        number: 3,
        title: 'Générez Votre Fiche Alphabet en Quelques Secondes',
        description: `Cliquez sur le bouton Créer dans le menu déroulant de l'en-tête une fois que les onze lettres ont des images. Le système génère votre fiche alphabet complète en moins de trois secondes. Un train coloré apparaît avec onze wagons montrant vos lettres et images sélectionnées.

L'onglet fiche de travail affiche votre fiche alphabet principale prête pour l'utilisation par les élèves. Des blocs de lettres apparaissent en bas de la page pour l'activité de découpage et collage. Ajustez le paramètre du nombre d'indices pour changer la difficulté de la fiche.

Activez la case nom et date pour ajouter des champs d'information élève aux fiches alphabet. Générez le corrigé après avoir créé votre fiche en utilisant la deuxième option du menu déroulant.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Personnalisez le Contenu sur le Canevas',
        description: `Chaque élément de votre fiche alphabet générée est entièrement modifiable sur le canevas. Cliquez sur n'importe quelle lettre pour la sélectionner et la déplacer, la faire pivoter ou la redimensionner. Faites glisser les images vers de nouvelles positions sur vos fiches.

Ajoutez du texte personnalisé n'importe où sur vos fiches maternelle en utilisant le panneau d'outils texte. Tapez un titre comme « Mon Train Alphabet » ou « Pratique de Correspondance de Lettres ». Choisissez parmi sept polices professionnelles pour vos fiches.

Utilisez la barre d'outils contextuelle pour superposer les éléments et aligner les objets. Le bouton annuler inverse tous les changements que vous regrettez sur vos fiches alphabet.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Téléchargez et Imprimez Vos Fiches Alphabet',
        description: `Cliquez sur le bouton déroulant de téléchargement pour voir toutes les options d'exportation pour votre fiche alphabet. Choisissez le format JPEG pour un partage rapide par email de vos fiches. Sélectionnez le format PDF pour une impression de la plus haute qualité. Les deux formats s'exportent en résolution professionnelle 300 DPI.

Téléchargez d'abord la version fiche de travail pour que vos élèves la complètent. Téléchargez ensuite la version corrigé pour vos matériaux de référence enseignant. Activez le basculement niveaux de gris avant de télécharger pour économiser l'encre d'imprimante.

Imprimez votre fiche alphabet immédiatement ou sauvegardez-la pour une utilisation ultérieure. Partagez vos fiches avec les membres de votre équipe enseignante par email ou stockage cloud.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from alphabet-train.md use case sections
  useCases: {
    sectionTitle: 'Fiche Gratuite pour Enfants - Fiche pour Maternelle avec Imprimables Gratuits. Fiche pour Enfants',
    sectionDescription: 'Les fiches alphabet servent des environnements éducatifs divers et des situations d\'enseignement variées à tous les niveaux. Les enseignants de maternelle utilisent les fiches alphabet pour l\'instruction quotidienne en littératie. Les parents en instruction à domicile comptent sur les fiches pour un apprentissage structuré à la maison.',
    badgeText: 'Pour Qui',
    readMoreLabel: 'Lire la suite',
    showLessLabel: 'Voir moins',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // FAQ Section - Selected FAQs from alphabet-train.md
  faq: {
    sectionTitle: 'FAQ - Fiche Gratuite pour Enfants et Fiche pour Maternelle. Fiche pour Enfants',
    sectionDescription: 'Questions fréquentes sur notre générateur de fiches alphabet et nos fiches à imprimer gratuit.',
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
        question: 'Comment fonctionne le g\u00e9n\u00e9rateur de fiches train alphabet ?',
        answer: 'Le g\u00e9n\u00e9rateur cr\u00e9e des trains color\u00e9s avec onze wagons, chacun contenant une lettre de l\'alphabet en majuscule ou minuscule. Les \u00e9l\u00e8ves associent des images aux lettres correspondantes, d\u00e9coupent et collent les \u00e9tiquettes, ou compl\u00e8tent les lettres manquantes. L\'outil prend en charge onze langues avec les caract\u00e8res sp\u00e9ciaux adapt\u00e9s \u00e0 chaque alphabet.',
      },
      {
        id: 'faq-2',
        question: 'Quelles activit\u00e9s sur les lettres sont disponibles ?',
        answer: 'Plusieurs types d\'exercices sont propos\u00e9s : compl\u00e9ter les lettres manquantes dans l\'ordre alphab\u00e9tique, remettre les lettres dans le bon ordre, et faire correspondre les majuscules aux minuscules. Vous pouvez \u00e9galement ajuster le nombre d\'indices pour moduler la difficult\u00e9 de chaque fiche alphabet.',
      },
      {
        id: 'faq-3',
        question: 'Puis-je choisir des lettres sp\u00e9cifiques pour la fiche ?',
        answer: 'Oui, vous s\u00e9lectionnez exactement onze lettres parmi l\'alphabet affich\u00e9. Choisissez des lettres cons\u00e9cutives comme A \u00e0 K pour un apprentissage s\u00e9quentiel, ou des lettres al\u00e9atoires pour des fiches de r\u00e9vision. L\'option de cr\u00e9ation automatique permet aussi de g\u00e9n\u00e9rer des fiches rapidement avec une s\u00e9lection al\u00e9atoire.',
      },
      {
        id: 'faq-4',
        question: 'Le train alphabet est-il adapt\u00e9 aux enfants de maternelle ?',
        answer: 'Absolument, le train alphabet a \u00e9t\u00e9 sp\u00e9cialement con\u00e7u pour les enfants de 3 \u00e0 6 ans. Le design ludique du train rend l\'apprentissage de l\'alphabet amusant et engageant. La difficult\u00e9 progressive permet d\'adapter les fiches de la petite section \u00e0 la grande section de maternelle.',
      },
      {
        id: 'faq-5',
        question: 'Peut-on ajouter des images dans les wagons du train ?',
        answer: 'Oui, chaque lettre peut \u00eatre associ\u00e9e \u00e0 une image de notre biblioth\u00e8que de plus de 3000 illustrations class\u00e9es par th\u00e8me. Le syst\u00e8me associe automatiquement les images aux lettres selon la premi\u00e8re lettre du nom de l\'image. Vous pouvez aussi t\u00e9l\u00e9verser vos propres images pour des connexions th\u00e9matiques personnalis\u00e9es.',
      },
      {
        id: 'faq-6',
        question: 'Quels formats de fichier sont disponibles pour les fiches train alphabet ?',
        answer: 'Les fiches se t\u00e9l\u00e9chargent en PDF pour une impression de haute qualit\u00e9 ou en JPEG pour le partage num\u00e9rique. Les deux formats offrent une r\u00e9solution de 300 DPI, assurant des wagons color\u00e9s et des lettres parfaitement lisibles \u00e0 l\'impression.',
      },
      {
        id: 'faq-7',
        question: 'Combien d\'alphabets diff\u00e9rents sont support\u00e9s ?',
        answer: 'Le g\u00e9n\u00e9rateur prend en charge onze alphabets complets avec leurs caract\u00e8res sp\u00e9ciaux. L\'allemand inclut \u00c4, \u00d6 et \u00dc, l\'espagnol int\u00e8gre le \u00d1, et les langues nordiques comprennent \u00c6, \u00d8 et \u00c5. Chaque alphabet affiche les lettres aux positions correctes.',
      },
      {
        id: 'faq-8',
        question: 'Quels modes d\'exercices sont propos\u00e9s pour les fiches alphabet ?',
        answer: 'Trois modes principaux sont disponibles : compl\u00e9ter les lettres manquantes, remettre les lettres dans l\'ordre, et faire correspondre majuscules et minuscules. Le nombre d\'indices ajustable module la difficult\u00e9 de chaque exercice, du plus simple au plus complexe.',
      },
      {
        id: 'faq-9',
        question: 'Comment obtenir la meilleure qualit\u00e9 d\'impression pour les trains alphabet ?',
        answer: 'T\u00e9l\u00e9chargez en format PDF et imprimez en qualit\u00e9 maximale sur papier A4. Les couleurs vives des wagons rendent mieux sur papier blanc standard. Pour \u00e9conomiser l\'encre, activez le mode niveaux de gris qui conserve tous les d\u00e9tails du train.',
      },
      {
        id: 'faq-10',
        question: 'Puis-je vendre les fiches train alphabet cr\u00e9\u00e9es ?',
        answer: 'Oui, la licence commerciale incluse dans votre abonnement vous permet de vendre vos cr\u00e9ations sur des plateformes comme Teachers Pay Teachers et Etsy. Cr\u00e9ez des packs th\u00e9matiques de fiches alphabet dans diff\u00e9rentes langues pour toucher un march\u00e9 international.',
      },
      {
        id: 'faq-11',
        question: 'Comment fonctionne l\'abonnement pour le g\u00e9n\u00e9rateur de train alphabet ?',
        answer: 'Le Pack Essentiel \u00e0 144 \u20ac par an inclut le train alphabet et 9 autres g\u00e9n\u00e9rateurs. Cr\u00e9ation illimit\u00e9e sans frais par fiche. La r\u00e9siliation est possible \u00e0 tout moment depuis votre espace personnel.',
      },
      {
        id: 'faq-12',
        question: 'Comment ajouter des images personnalis\u00e9es aux wagons ?',
        answer: 'Cliquez sur le bouton de t\u00e9l\u00e9versement pour importer vos propres images en JPEG, PNG ou GIF. Assignez chaque image \u00e0 une lettre en cliquant sur la lettre puis sur l\'image. Vos images personnalis\u00e9es se combinent avec celles de la biblioth\u00e8que de 3000 illustrations.',
      },
      {
        id: 'faq-13',
        question: 'Les fiches alphabet sont-elles conformes aux programmes de maternelle ?',
        answer: 'Oui, les activit\u00e9s de reconnaissance des lettres correspondent aux attendus du cycle 1. La d\u00e9couverte de l\'alphabet en grande section, la correspondance majuscule-minuscule et l\'ordre alphab\u00e9tique sont des comp\u00e9tences cl\u00e9s des programmes officiels fran\u00e7ais.',
      },
      {
        id: 'faq-14',
        question: 'Comment adapter les fiches pour les \u00e9l\u00e8ves en difficult\u00e9 avec l\'alphabet ?',
        answer: 'Augmentez le nombre d\'indices pour r\u00e9v\u00e9ler davantage de lettres dans le train. Choisissez des lettres cons\u00e9cutives plut\u00f4t qu\'al\u00e9atoires pour faciliter le rep\u00e9rage. Les images associ\u00e9es aux lettres offrent un support visuel suppl\u00e9mentaire pour la m\u00e9morisation.',
      },
      {
        id: 'faq-15',
        question: 'Quels formats de page sont propos\u00e9s pour les fiches train alphabet ?',
        answer: 'Les formats Letter et A4 sont disponibles en orientation portrait ou paysage. Le format paysage est particuli\u00e8rement adapt\u00e9 au design du train qui s\'\u00e9tend horizontalement. Vous pouvez \u00e9galement d\u00e9finir des dimensions personnalis\u00e9es pour des usages sp\u00e9cifiques.',
      },
      {
        id: 'faq-16',
        question: 'L\'option noir et blanc est-elle disponible pour les trains alphabet ?',
        answer: 'Oui, le basculement niveaux de gris convertit les wagons color\u00e9s en version noir et blanc. Les contours restent nets et les lettres parfaitement lisibles. Id\u00e9al pour les impressions en grande quantit\u00e9 o\u00f9 le co\u00fbt de l\'encre est un facteur.',
      },
      {
        id: 'faq-17',
        question: 'Comment personnaliser les fiches alphabet sur le canevas ?',
        answer: 'Chaque \u00e9l\u00e9ment du train est modifiable : d\u00e9placez les wagons, redimensionnez les images et ajoutez du texte personnalis\u00e9. Ins\u00e9rez un titre comme Mon Train Alphabet ou le nom de l\'\u00e9l\u00e8ve. Les sept polices disponibles s\'adaptent \u00e0 tous les styles p\u00e9dagogiques.',
      },
      {
        id: 'faq-18',
        question: 'Puis-je combiner le train alphabet avec d\'autres g\u00e9n\u00e9rateurs ?',
        answer: 'Oui, combinez les fiches alphabet avec les coloriages pour la motricit\u00e9 fine, les mots crois\u00e9s pour le vocabulaire ou les cryptogrammes pour le d\u00e9codage. Ces combinaisons cr\u00e9ent des packs d\'apprentissage complets couvrant lecture, \u00e9criture et logique.',
      },
      {
        id: 'faq-19',
        question: 'Comment organiser une progression p\u00e9dagogique avec les fiches alphabet ?',
        answer: 'Commencez par les lettres A \u00e0 K avec beaucoup d\'indices, puis r\u00e9duisez progressivement les aides. Passez ensuite aux lettres L \u00e0 V, puis W \u00e0 Z. Alternez entre exercices de compl\u00e9tion et de correspondance pour consolider chaque \u00e9tape de l\'apprentissage.',
      },
      {
        id: 'faq-20',
        question: 'Combien de temps faut-il pour cr\u00e9er une fiche train alphabet ?',
        answer: 'Moins de trois minutes suffisent. S\u00e9lectionnez la langue et onze lettres, choisissez les images par th\u00e8me ou individuellement, puis cliquez sur Cr\u00e9er. Le train complet avec ses wagons illustr\u00e9s appara\u00eet instantan\u00e9ment sur le canevas.',
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
    sectionTitle: 'Fiches Gratuites Combiner - Fiche pour Enfants et Imprimables Gratuits',
    sectionDescription: 'Créez des paquets d\'apprentissage complets en combinant les fiches alphabet avec ces générateurs complémentaires.',
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

export default alphabetTrainFrContent;
