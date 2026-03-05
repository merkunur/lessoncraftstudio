import type { CreateXContent } from '../types';

export const content: CreateXContent = {
  guideId: "create-worksheet-bundles",
  locale: 'fr',

  seo: {
    titleTag: "Comment Créer des Bundles de Fiches Rentables | Guide Gratuit",
    metaDescription: "Le bundling multiplie votre revenu par fiche vendue. Ce guide couvre les stratégies de bundling qui fonctionnent : thématique, progressive et multi-format.",
    primaryKeyword: "créer bundles fiches rentables",
    secondaryKeywords: ["bundle fiches éducatives","pack worksheets vente","regrouper fiches commercial","strategy bundling fiches","offres groupées imprimables"],
    lsiKeywords: ["valeur ajoutée","prix psychologique","offre irrésistible","empaquetage","lot","regroupement","offre complète","package"],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/wordsearch/sample-1.jpeg',
      primaryAlt: "Fiche imprimable create worksheet bundles",
      secondary: '/samples/english/wordsearch/sample-2.jpeg',
      secondaryAlt: "Exemple de fiche create worksheet bundles",
    },
    sampleGallery: [
      { src: '/samples/english/wordsearch/sample-1.jpeg', alt: "Exemple fiche wordsearch", caption: 'Exemple de qualité professionnelle' },
      { src: '/samples/english/wordsearch/sample-2.jpeg', alt: "Fiche avec corrigé wordsearch", caption: 'Corrigé automatique inclus' },
    ],
    youtubeId: '36keBFzJbPo',
    videoTitle: "Comment Créer des Bundles de Fiches Rentables — Tutoriel",
  },

  hero: {
    title: "Comment Créer des Bundles de Fiches Rentables",
    description: "Le bundling multiplie votre revenu par fiche vendue. Ce guide couvre les stratégies de bundling qui fonctionnent : thématique, progressive et multi-format.",
  },

  introduction: "Les bundles sont le format de vente le plus rentable pour les imprimables. Ils augmentent le panier moyen et la satisfaction client simultanément.",

  tutorial: {
    title: "Étape par étape : Comment Créer des Bundles de Fiches Rentables",
    steps: [
      {
        title: "Identifiez les groupements naturels",
        description: "Thème, niveau scolaire ou compétence.",
      },
      {
        title: "Créez un mix de formats",
        description: "Fiches + puzzles + coloriages autour du même thème.",
      },
      {
        title: "Fixez un prix attractif",
        description: "Le bundle doit offrir au moins 50% d'économie par rapport à l'achat individuel.",
      }
    ],
  },

  platformTips: [
    {
      platform: "Etsy",
      title: "Bundles Etsy",
      description: "Le format le plus rentable sur Etsy éducation.",
    }
  ],

  monetization: [
    {
      title: "Bundle progressif",
      description: "Offrez petit, moyen et grand bundle au même thème.",
    }
  ],

  examples: "Les bundles de 50+ pages génèrent en moyenne 3x plus de revenu par vente.",

  faq: [
    {
      question: "Quelle taille optimale ?",
      answer: "30–50 pages pour un bundle standard. 100+ pour un mega-bundle.",
    },
    {
      question: "Combien co\u00fbtent les licences ?",
      answer: "Les licences individuelles co\u00fbtent 27\u202f$ (Commercial) et 47\u202f$ (Acc\u00e8s Complet). Les packs cat\u00e9gorie sont \u00e0 79\u202f$ (Commercial) et 119\u202f$ (Acc\u00e8s Complet). Chaque application est gratuite \u00e0 essayer.",
    },
    {
      question: "Quelle est votre politique de remboursement ?",
      answer: "Toutes les ventes sont d\u00e9finitives en raison de la nature num\u00e9rique du produit. Une fois qu'une cl\u00e9 de licence est livr\u00e9e et activ\u00e9e, elle ne peut \u00eatre retourn\u00e9e. Utilisez la version gratuite pour tout tester d'abord.",
    }
  ],

  internalLinks: [
    { slug: "wordsearch", pageType: "app", anchorText: "Mots Mêlés" }
  ],
};
