import type { BundleContent } from '../types';

export const content: BundleContent = {
  bundleId: 'search-bundle',
  locale: 'fr',

  seo: {
    titleTag: 'Pack Chercher et Trouver | 4 Générateurs pour 79 $',
    metaDescription: 'Obtenez 4 générateurs professionnels en un seul pack. Économisez plus de 50 % par rapport à l\'achat individuel. Licence commerciale incluse.',
    primaryKeyword: 'pack fiches chercher trouver',
    secondaryKeywords: ["générateurs recherche enfants","fiches observation imprimables","coffret chercher trouver","activités concentration enfants","pack jeux observation"],
    lsiKeywords: ["chercher compter","objets cachés","mots croisés","chasse au trésor","attention visuelle","concentration","observation","dénombrement"],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/find and count/Find and Count 1.jpeg',
      primaryAlt: 'Fiche chercher et compter',
    },
    sampleGallery: [
      { src: '/samples/english/find and count/Find and Count 1.jpeg', alt: 'Chercher compter', caption: 'Chercher et Compter' }
    ],
    youtubeId: 'hwMKyCpVzSQ',
    videoTitle: 'Présentation du Pack Chercher et Trouver',
  },

  hero: {
    title: 'Pack Chercher et Trouver',
    tagline: '4 générateurs pour les activités de recherche et découverte',
    description: `Le Pack Chercher et Trouver combine quatre générateurs qui développent l'attention visuelle, la concentration et le vocabulaire. Pour 79 $ au lieu de 108 $ séparément.

Les activités de recherche visuelle sont extrêmement populaires auprès des enseignants de maternelle et des parents. Les fiches Chercher et Compter et Objets Cachés sont des best-sellers récurrents car les enfants les adorent et ils développent des compétences cognitives essentielles.`,
  },

  appsIncluded: [
    {
      appId: 'find-and-count',
      title: 'Chercher et Compter',
      description: 'Les enfants cherchent et comptent des images thématiques dans une scène. Combine l\'attention visuelle et le dénombrement.',
    },
    {
      appId: 'find-objects',
      title: 'Objets Cachés',
      description: 'Scènes illustrées où les enfants doivent trouver des objets spécifiques. Développe la concentration et la discrimination visuelle.',
    },
    {
      appId: 'crossword',
      title: 'Mots Croisés',
      description: 'Mots croisés avec indices en images. Les enfants écrivent le nom de chaque image dans la grille. Renforce vocabulaire et orthographe.',
    },
    {
      appId: 'treasure-hunt',
      title: 'Chasse au Trésor',
      description: 'Fiches de direction et orientation où les enfants suivent un parcours fléché pour atteindre le trésor. Développe le repérage spatial.',
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
    { title: 'Créer un catalogue Etsy complet', description: 'Utilisez tous les générateurs pour créer un catalogue diversifié de fiches thématiques. La variété augmente la visibilité dans les recherches Etsy.', appsUsed: ["find-and-count","find-objects","crossword","treasure-hunt"] },
    { title: 'Publier des cahiers KDP', description: 'Compilez des fiches de différents types en cahiers d\'activités de 50-100 pages pour Amazon KDP.', appsUsed: ["find-and-count","find-objects","crossword"] },
    { title: 'Packs enseignants TPT', description: 'Créez des packs multi-compétences pour Teachers Pay Teachers. Les packs variés se vendent mieux que les produits individuels.', appsUsed: ["find-and-count","find-objects","crossword","treasure-hunt"] },
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
    { slug: 'find-and-count', pageType: 'app' as const, anchorText: 'Chercher et Compter' },
    { slug: 'find-objects', pageType: 'app' as const, anchorText: 'Objets Cachés' },
    { slug: 'crossword', pageType: 'app' as const, anchorText: 'Mots Croisés' },
    { slug: 'treasure-hunt', pageType: 'app' as const, anchorText: 'Chasse au Trésor' }
  ],
};
