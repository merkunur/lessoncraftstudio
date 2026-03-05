import type { BundleContent } from '../types';

export const content: BundleContent = {
  bundleId: 'matching-bundle',
  locale: 'fr',

  seo: {
    titleTag: 'Pack Association et Tri | 5 Générateurs pour 79 $',
    metaDescription: 'Obtenez 5 générateurs professionnels en un seul pack. Économisez plus de 50 % par rapport à l\'achat individuel. Licence commerciale incluse.',
    primaryKeyword: 'pack fiches association tri',
    secondaryKeywords: ["générateurs association","fiches tri imprimables pack","coffret correspondance","outils appariement maternelle","pack jeux association"],
    lsiKeywords: ["association images","ombres silhouettes","bingo éducatif","tri catégorisation","grille correspondance","discrimination visuelle","appariement","classement"],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/matching/Matching 1.jpeg',
      primaryAlt: 'Fiche d\'association image-mot',
    },
    sampleGallery: [
      { src: '/samples/english/matching/Matching 1.jpeg', alt: 'Association', caption: 'Association images' }
    ],
    youtubeId: 'gQEk7dPTZUA',
    videoTitle: 'Présentation du Pack Association et Tri',
  },

  hero: {
    title: 'Pack Association et Tri',
    tagline: '5 générateurs pour les fiches d\'association, de tri et de correspondance',
    description: `Le Pack Association et Tri regroupe cinq générateurs centrés sur les compétences cognitives fondamentales : association, correspondance, discrimination visuelle et classification. Pour 79 $ au lieu de 135 $ séparément.

Ces fiches sont parmi les plus demandées en maternelle car elles développent des compétences transversales utilisées dans toutes les matières. L'association d'ombres et le bingo sont des best-sellers récurrents sur Etsy et TPT.`,
  },

  appsIncluded: [
    {
      appId: 'matching',
      title: 'Fiches d\'Association',
      description: 'Trois modes : image-image, image-mot, image-lettre initiale. Les élèves tracent des lignes entre les éléments correspondants.',
    },
    {
      appId: 'grid-match',
      title: 'Grilles de Correspondance',
      description: 'Puzzles en grille où les enfants retrouvent les images dans un tableau. Développe le repérage dans un plan.',
    },
    {
      appId: 'shadow-match',
      title: 'Association d\'Ombres',
      description: 'Les enfants associent chaque image à son ombre. Excellent pour la discrimination visuelle et la reconnaissance des formes.',
    },
    {
      appId: 'bingo',
      title: 'Cartes de Bingo',
      description: 'Générez des sets de cartes de bingo avec images ou mots. Les enseignants les adorent pour les activités de classe.',
    },
    {
      appId: 'picture-sort',
      title: 'Tri d\'Images',
      description: 'Fiches de tri où les enfants classent des images par catégorie. Développe la pensée logique et la classification.',
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
    { title: 'Créer un catalogue Etsy complet', description: 'Utilisez tous les générateurs pour créer un catalogue diversifié de fiches thématiques. La variété augmente la visibilité dans les recherches Etsy.', appsUsed: ["matching","grid-match","shadow-match","bingo","picture-sort"] },
    { title: 'Publier des cahiers KDP', description: 'Compilez des fiches de différents types en cahiers d\'activités de 50-100 pages pour Amazon KDP.', appsUsed: ["matching","grid-match","shadow-match"] },
    { title: 'Packs enseignants TPT', description: 'Créez des packs multi-compétences pour Teachers Pay Teachers. Les packs variés se vendent mieux que les produits individuels.', appsUsed: ["matching","grid-match","shadow-match","bingo"] },
  ],

  faq: [
    { question: 'Que contient ce pack ?', answer: '5 générateurs professionnels avec licence commerciale, 104 thèmes illustrés, génération illimitée, corrigés automatiques et export PDF/JPEG.' },
    { question: 'Quelle est la différence entre Commercial et Accès Complet ?', answer: 'Le Pack Commercial (79 $) inclut tous les générateurs avec licence commerciale et thèmes populaires. Le Pack Accès Complet (119 $) ajoute les 104 thèmes et toutes les futures mises à jour.' },
    { question: 'Puis-je essayer avant d\'acheter ?', answer: 'Oui. Chaque générateur est disponible gratuitement avec un filigrane. Testez tous les outils sans inscription avant de décider.' },
    { question: 'La licence couvre-t-elle toutes les plateformes ?', answer: 'Oui. La licence commerciale couvre Etsy, Amazon KDP, TPT, Gumroad, votre propre site et toute autre plateforme. Aucune restriction.' },
    { question: 'Y a-t-il des frais récurrents ?', answer: 'Non. Le pack est un achat unique. Pas d\'abonnement, pas de frais mensuels, pas de renouvellement.' },
    { question: 'Combien de fiches puis-je créer ?', answer: 'Illimité. Créez autant de fiches que vous le souhaitez avec chaque générateur, sans limites ni crédits.' },
    { question: 'Les mises à jour sont-elles incluses ?', answer: 'Le Pack Accès Complet inclut toutes les futures mises à jour et nouveaux thèmes. Le Pack Commercial inclut les mises à jour de maintenance.' },
    { question: 'Quelle est votre politique de remboursement ?', answer: 'Toutes les ventes sont définitives en raison de la nature numérique. Testez les versions gratuites de chaque générateur avant d\'acheter.' },
  ],

  internalLinks: [
    { slug: 'matching', pageType: 'app' as const, anchorText: 'Fiches d\'Association' },
    { slug: 'grid-match', pageType: 'app' as const, anchorText: 'Grilles de Correspondance' },
    { slug: 'shadow-match', pageType: 'app' as const, anchorText: 'Association d\'Ombres' },
    { slug: 'bingo', pageType: 'app' as const, anchorText: 'Cartes de Bingo' },
    { slug: 'picture-sort', pageType: 'app' as const, anchorText: 'Tri d\'Images' }
  ],
};
