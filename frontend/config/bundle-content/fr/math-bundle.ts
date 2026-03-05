import type { BundleContent } from '../types';

export const content: BundleContent = {
  bundleId: 'math-bundle',
  locale: 'fr',

  seo: {
    titleTag: 'Pack Mathématiques Complet | 6 Générateurs pour 79 $',
    metaDescription: 'Obtenez 6 générateurs professionnels en un seul pack. Économisez plus de 50 % par rapport à l\'achat individuel. Licence commerciale incluse.',
    primaryKeyword: 'pack fiches mathématiques',
    secondaryKeywords: ["générateurs mathématiques","fiches maths imprimables pack","coffret activités maths","créateur fiches maths","outils mathématiques éducatifs"],
    lsiKeywords: ["fiches addition","fiches soustraction","puzzles mathématiques","activités maths imprimables","fiches maths commerciales","fiches maths PDF","problèmes visuels","sens du nombre"],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/addition/Addition Fun 1.jpeg',
      primaryAlt: 'Fiche d\'addition avec images colorées d\'animaux',
      secondary: '/samples/english/subtraction/Subtraction Fun 1.jpeg',
      secondaryAlt: 'Fiche de soustraction avec exercices visuels',
    },
    sampleGallery: [
      { src: '/samples/english/addition/Addition Fun 3.jpeg', alt: 'Fiche addition thème véhicules', caption: 'Addition — Véhicules' },
      { src: '/samples/english/subtraction/Subtraction Fun 2.jpeg', alt: 'Fiche soustraction thème fruits', caption: 'Soustraction — Fruits' },
      { src: '/samples/english/math puzzle/Math Puzzles (1).jpeg', alt: 'Puzzle maths grille', caption: 'Puzzle Mathématique' }
    ],
    youtubeId: '6O5aCzHkh8M',
    videoTitle: 'Présentation du Pack Mathématiques Complet',
  },

  hero: {
    title: 'Pack Mathématiques Complet',
    tagline: '6 générateurs de fiches de mathématiques professionnels en un seul coffret',
    description: `Construire une activité de fiches de mathématiques signifie couvrir chaque opération, chaque niveau et chaque style d'apprentissage. Le Pack Mathématiques vous donne six générateurs spécialisés qui fonctionnent ensemble pour créer un programme complet — du comptage de base aux opérations multi-chiffres et puzzles logiques. Au lieu d'acheter chaque application séparément pour 162 $ (27 $ × 6), vous obtenez la collection complète pour 79 $ avec le Pack Commercial ou 119 $ avec l'Accès Complet.

Les générateurs Addition et Soustraction couvrent les fondations avec quatre modes d'exercice chacun : Image + Image pour les débutants, Image + Nombre pour la transition vers l'abstrait, Trouver le Nombre Manquant pour le raisonnement inverse, et Mixte pour l'évaluation complète. Le générateur Code Addition ajoute une dimension ludique où les élèves résolvent des équations pour décoder des messages secrets.

Chaque générateur partage le même ensemble de fonctionnalités professionnelles : 104 thèmes illustrés, un éditeur canvas pour les mises en page personnalisées, des polices multiples, la génération automatique de corrigés et l'export en PDF et JPEG. Que vous vendiez des cahiers de maths sur Etsy, créiez des programmes pour Amazon KDP ou produisiez du matériel complémentaire pour votre classe, ce pack fournit la variété que vos clients attendent.`,
  },

  appsIncluded: [
    {
      appId: 'addition',
      title: 'Générateur de Fiches d\'Addition',
      description: 'Créez des fiches d\'addition illustrées avec quatre modes : Image + Image, Image + Nombre, Trouver l\'Addend et Mixte. Opérandes de 1 à 99, 104 thèmes, corrigés automatiques.',
    },
    {
      appId: 'subtraction',
      title: 'Générateur de Fiches de Soustraction',
      description: 'Générez des fiches visuelles de soustraction avec mode barrer. Mêmes quatre modes et 104 thèmes que l\'addition pour une couverture complète des opérations.',
    },
    {
      appId: 'code-addition',
      title: 'Générateur de Code Addition',
      description: 'Les élèves résolvent des additions pour décoder des messages secrets. Ce format code-breaker surpasse systématiquement les fiches standard en termes d\'engagement.',
    },
    {
      appId: 'more-less',
      title: 'Générateur Plus ou Moins',
      description: 'Développez le sens du nombre avec des fiches de comparaison visuelles. Les élèves comparent des groupes d\'images thématiques pour déterminer lequel a plus ou moins.',
    },
    {
      appId: 'math-puzzle',
      title: 'Générateur de Puzzles Mathématiques',
      description: 'Présentez les opérations dans des grilles interconnectées où les élèves trouvent le bon chemin. Approche différente qui développe le raisonnement logique.',
    },
    {
      appId: 'math-worksheet',
      title: 'Générateur de Fiches de Maths',
      description: 'Créez des fiches d\'opérations traditionnelles avec calcul en ligne et posé. Support addition, soustraction et mixte avec plages de 1 à 999.',
    }
  ],

  bundleBenefits: [
    { title: 'Économie significative', description: 'Payez un prix unique au lieu d\'acheter chaque générateur séparément. Économisez plus de 50 % par rapport à l\'achat individuel.' },
    { title: 'Licence commerciale complète', description: 'Vendez les fiches créées sur Etsy, Amazon KDP, Teachers Pay Teachers, Gumroad et toute autre plateforme sans restriction.' },
    { title: 'Génération illimitée', description: 'Créez autant de fiches que vous voulez avec chaque générateur. Pas de limites mensuelles ni de système de crédits.' },
    { title: '104 thèmes illustrés', description: 'Accédez à la bibliothèque complète de 104 thèmes pour créer des fiches thématiques variées.' },
    { title: '11 langues supportées', description: 'Créez des fiches en français, anglais, allemand, espagnol, portugais, italien, néerlandais, suédois, danois, norvégien et finnois.' },
  ],

  businessUseCases: [
    { title: 'Créer un catalogue Etsy complet', description: 'Utilisez tous les générateurs pour créer un catalogue diversifié de fiches thématiques. La variété augmente la visibilité dans les recherches Etsy.', appsUsed: ["addition","subtraction","code-addition","more-less","math-puzzle","math-worksheet"] },
    { title: 'Publier des cahiers KDP', description: 'Compilez des fiches de différents types en cahiers d\'activités de 50-100 pages pour Amazon KDP.', appsUsed: ["addition","subtraction","code-addition"] },
    { title: 'Packs enseignants TPT', description: 'Créez des packs multi-compétences pour Teachers Pay Teachers. Les packs variés se vendent mieux que les produits individuels.', appsUsed: ["addition","subtraction","code-addition","more-less"] },
  ],

  faq: [
    { question: 'Que contient ce pack ?', answer: '6 générateurs professionnels avec licence commerciale, 104 thèmes illustrés, génération illimitée, corrigés automatiques et export PDF/JPEG.' },
    { question: 'Quelle est la différence entre Commercial et Accès Complet ?', answer: 'Le Pack Commercial (79 $) inclut tous les générateurs avec licence commerciale et thèmes populaires. Le Pack Accès Complet (119 $) ajoute les 104 thèmes et toutes les futures mises à jour.' },
    { question: 'Puis-je essayer avant d\'acheter ?', answer: 'Oui. Chaque générateur est disponible gratuitement avec un filigrane. Testez tous les outils sans inscription avant de décider.' },
    { question: 'La licence couvre-t-elle toutes les plateformes ?', answer: 'Oui. La licence commerciale couvre Etsy, Amazon KDP, TPT, Gumroad, votre propre site et toute autre plateforme. Aucune restriction.' },
    { question: 'Y a-t-il des frais récurrents ?', answer: 'Non. Le pack est un achat unique. Pas d\'abonnement, pas de frais mensuels, pas de renouvellement.' },
    { question: 'Combien de fiches puis-je créer ?', answer: 'Illimité. Créez autant de fiches que vous le souhaitez avec chaque générateur, sans limites ni crédits.' },
    { question: 'Les mises à jour sont-elles incluses ?', answer: 'Le Pack Accès Complet inclut toutes les futures mises à jour et nouveaux thèmes. Le Pack Commercial inclut les mises à jour de maintenance.' },
    { question: 'Quelle est votre politique de remboursement ?', answer: 'Toutes les ventes sont définitives en raison de la nature numérique. Testez les versions gratuites de chaque générateur avant d\'acheter.' },
  ],

  internalLinks: [
    { slug: 'addition', pageType: 'app' as const, anchorText: 'Générateur de Fiches d\'Addition' },
    { slug: 'subtraction', pageType: 'app' as const, anchorText: 'Générateur de Fiches de Soustraction' },
    { slug: 'code-addition', pageType: 'app' as const, anchorText: 'Générateur de Code Addition' },
    { slug: 'more-less', pageType: 'app' as const, anchorText: 'Générateur Plus ou Moins' },
    { slug: 'math-puzzle', pageType: 'app' as const, anchorText: 'Générateur de Puzzles Mathématiques' },
    { slug: 'math-worksheet', pageType: 'app' as const, anchorText: 'Générateur de Fiches de Maths' }
  ],
};
