import type { BundleContent } from '../types';

export const content: BundleContent = {
  bundleId: 'puzzle-bundle',
  locale: 'fr',

  seo: {
    titleTag: 'Pack Puzzles et Logique | 4 Générateurs pour 79 $',
    metaDescription: 'Obtenez 4 générateurs professionnels en un seul pack. Économisez plus de 50 % par rapport à l\'achat individuel. Licence commerciale incluse.',
    primaryKeyword: 'pack puzzles logique enfants',
    secondaryKeywords: ["générateurs puzzles éducatifs","fiches logique imprimables pack","coffret réflexion enfants","puzzles imprimables maternelle","pack jeux logique"],
    lsiKeywords: ["pièces manquantes","intrus","sudoku enfants","labyrinthe","raisonnement","déduction","observation","pensée critique"],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/sudoku/Sudoku 1.jpeg',
      primaryAlt: 'Sudoku enfants avec images',
    },
    sampleGallery: [
      { src: '/samples/english/sudoku/Sudoku 1.jpeg', alt: 'Sudoku enfants', caption: 'Sudoku 4x4' }
    ],
    youtubeId: 'VXGKFQRT2rA',
    videoTitle: 'Présentation du Pack Puzzles et Logique',
  },

  hero: {
    title: 'Pack Puzzles et Logique',
    tagline: '4 générateurs de puzzles pour développer le raisonnement logique',
    description: `Le Pack Puzzles et Logique réunit quatre générateurs conçus pour développer le raisonnement logique, l'attention et la résolution de problèmes. Pour 79 $ au lieu de 108 $ séparément.

Les puzzles sont des produits imprimables à forte marge car les parents et enseignants les considèrent comme des outils de développement cognitif. Les sudokus et labyrinthes se vendent particulièrement bien sur Amazon KDP sous forme de cahiers d'activités.`,
  },

  appsIncluded: [
    {
      appId: 'missing-pieces',
      title: 'Pièces Manquantes',
      description: 'Les enfants trouvent la pièce manquante d\'une image. Développe l\'attention aux détails et le raisonnement spatial.',
    },
    {
      appId: 'odd-one-out',
      title: 'Trouver l\'Intrus',
      description: 'Les enfants identifient l\'image qui ne correspond pas au groupe. Renforce la catégorisation et la pensée critique.',
    },
    {
      appId: 'sudoku',
      title: 'Sudoku pour Enfants',
      description: 'Sudokus 4x4 avec images au lieu de chiffres. Initiation à la logique et au raisonnement déductif.',
    },
    {
      appId: 'picture-path',
      title: 'Chemin d\'Images',
      description: 'Labyrinthes visuels où les enfants suivent le bon chemin à travers des images. Développe l\'orientation et la planification.',
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
    { title: 'Créer un catalogue Etsy complet', description: 'Utilisez tous les générateurs pour créer un catalogue diversifié de fiches thématiques. La variété augmente la visibilité dans les recherches Etsy.', appsUsed: ["missing-pieces","odd-one-out","sudoku","picture-path"] },
    { title: 'Publier des cahiers KDP', description: 'Compilez des fiches de différents types en cahiers d\'activités de 50-100 pages pour Amazon KDP.', appsUsed: ["missing-pieces","odd-one-out","sudoku"] },
    { title: 'Packs enseignants TPT', description: 'Créez des packs multi-compétences pour Teachers Pay Teachers. Les packs variés se vendent mieux que les produits individuels.', appsUsed: ["missing-pieces","odd-one-out","sudoku","picture-path"] },
  ],

  faq: [
    { question: 'Que contient ce pack ?', answer: '4 générateurs professionnels avec licence commerciale, 104 thèmes illustrés, génération illimitée, corrigés automatiques et export PDF/JPEG.' },
    { question: 'Quelle est la différence entre Commercial et Accès Complet ?', answer: 'Le Pack Commercial (79 $) inclut tous les générateurs avec licence commerciale et thèmes populaires. Le Pack Accès Complet (119 $) ajoute les 104 thèmes et toutes les futures mises à jour.' },
    { question: 'Puis-je essayer avant d\'acheter ?', answer: 'Oui. Chaque générateur est disponible gratuitement avec un filigrane. Testez tous les outils sans inscription avant de décider.' },
    { question: 'La licence couvre-t-elle toutes les plateformes ?', answer: 'Oui. La licence commerciale couvre Etsy, Amazon KDP, TPT, Gumroad, votre propre site et toute autre plateforme. Aucune restriction.' },
    { question: 'Y a-t-il des frais récurrents ?', answer: 'Non. Le pack est un achat unique. Pas d\'abonnement, pas de frais mensuels, pas de renouvellement.' },
    { question: 'Combien de fiches puis-je créer ?', answer: 'Illimité. Créez autant de fiches que vous le souhaitez avec chaque générateur, sans limites ni crédits.' },
    { question: 'Les mises à jour sont-elles incluses ?', answer: 'Le Pack Accès Complet inclut toutes les futures mises à jour et nouveaux thèmes. Le Pack Commercial inclut les mises à jour de maintenance.' },
    { question: 'Quelle est votre politique de remboursement ?', answer: 'Toutes les ventes sont définitives en raison de la nature numérique. Testez les versions gratuites de chaque générateur avant d\'acheter.' },
  ],

  internalLinks: [
    { slug: 'missing-pieces', pageType: 'app' as const, anchorText: 'Pièces Manquantes' },
    { slug: 'odd-one-out', pageType: 'app' as const, anchorText: 'Trouver l\'Intrus' },
    { slug: 'sudoku', pageType: 'app' as const, anchorText: 'Sudoku pour Enfants' },
    { slug: 'picture-path', pageType: 'app' as const, anchorText: 'Chemin d\'Images' }
  ],
};
