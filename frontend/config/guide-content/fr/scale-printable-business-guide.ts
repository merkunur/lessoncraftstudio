import type { CreateXContent } from '../types';

export const content: CreateXContent = {
  guideId: "scale-printable-business-guide",
  locale: 'fr',

  seo: {
    titleTag: "Guide d'Expansion du Business Imprimables | Guide Gratuit",
    metaDescription: "Votre business fonctionne — il est temps de grandir. Ce guide couvre les stratégies d'expansion éprouvées.",
    primaryKeyword: "expansion business imprimables",
    secondaryKeywords: ["grandir business fiches","agrandir boutique imprimables","scaling worksheets","croissance ventes fiches","développer business éducatif"],
    lsiKeywords: ["croissance","multiplication","développement","stratégie","expansion","accélération","objectifs","milestones"],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/wordsearch/sample-1.jpeg',
      primaryAlt: "Fiche imprimable scale printable business guide",
      secondary: '/samples/english/wordsearch/sample-2.jpeg',
      secondaryAlt: "Exemple de fiche scale printable business guide",
    },
    sampleGallery: [
      { src: '/samples/english/wordsearch/sample-1.jpeg', alt: "Exemple fiche wordsearch", caption: 'Exemple de qualité professionnelle' },
      { src: '/samples/english/wordsearch/sample-2.jpeg', alt: "Fiche avec corrigé wordsearch", caption: 'Corrigé automatique inclus' },
    ],
    youtubeId: '36keBFzJbPo',
    videoTitle: "Guide d'Expansion du Business Imprimables — Tutoriel",
  },

  hero: {
    title: "Guide d'Expansion du Business Imprimables",
    description: "Votre business fonctionne — il est temps de grandir. Ce guide couvre les stratégies d'expansion éprouvées.",
  },

  introduction: "Passer de quelques ventes à un revenu régulier demande des stratégies différentes de celles du démarrage.",

  tutorial: {
    title: "Étape par étape : Guide d'Expansion du Business Imprimables",
    steps: [
      {
        title: "Analysez vos données",
        description: "Identifiez vos produits les plus rentables.",
      },
      {
        title: "Doublez ce qui fonctionne",
        description: "Créez plus de produits dans vos niches gagnantes.",
      },
      {
        title: "Expandez méthodiquement",
        description: "Nouvelles langues, nouvelles plateformes, nouveaux formats.",
      }
    ],
  },

  platformTips: [
    {
      platform: "Multi-plateforme",
      title: "Expansion systématique",
      description: "Ajoutez une plateforme ou une langue par mois.",
    }
  ],

  monetization: [
    {
      title: "Multiplication des revenus",
      description: "Chaque axe d'expansion (langue, plateforme, niche) multiplie vos revenus.",
    }
  ],

  examples: "Les vendeurs qui suivent un plan d'expansion structuré atteignent leurs objectifs 2x plus vite.",

  faq: [
    {
      question: "À quel stade commencer l'expansion?",
      answer: "Dès que vous avez 25+ produits et des ventes régulières.",
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
