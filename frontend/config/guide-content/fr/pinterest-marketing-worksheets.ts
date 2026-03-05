import type { CreateXContent } from '../types';

export const content: CreateXContent = {
  guideId: "pinterest-marketing-worksheets",
  locale: 'fr',

  seo: {
    titleTag: "Marketing Pinterest pour Imprimables | Guide Gratuit",
    metaDescription: "Pinterest est le canal marketing numéro un pour les vendeurs d'imprimables. Ce guide détaille une stratégie Pinterest complète.",
    primaryKeyword: "marketing pinterest imprimables",
    secondaryKeywords: ["pinterest fiches éducatives","stratégie pinterest worksheets","épingles imprimables","pinterest etsy fiches","trafic pinterest imprimables"],
    lsiKeywords: ["épingles","tableaux","SEO pinterest","rich pins","click-through","impressions","engagement","viralité"],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/wordsearch/sample-1.jpeg',
      primaryAlt: "Fiche imprimable pinterest marketing worksheets",
      secondary: '/samples/english/wordsearch/sample-2.jpeg',
      secondaryAlt: "Exemple de fiche pinterest marketing worksheets",
    },
    sampleGallery: [
      { src: '/samples/english/wordsearch/sample-1.jpeg', alt: "Exemple fiche wordsearch", caption: 'Exemple de qualité professionnelle' },
      { src: '/samples/english/wordsearch/sample-2.jpeg', alt: "Fiche avec corrigé wordsearch", caption: 'Corrigé automatique inclus' },
    ],
    youtubeId: '36keBFzJbPo',
    videoTitle: "Marketing Pinterest pour Imprimables — Tutoriel",
  },

  hero: {
    title: "Marketing Pinterest pour Imprimables",
    description: "Pinterest est le canal marketing numéro un pour les vendeurs d'imprimables. Ce guide détaille une stratégie Pinterest complète.",
  },

  introduction: "Pinterest fonctionne comme un moteur de recherche visuel. Les épingles que vous créez aujourd'hui génèrent du trafic pendant des années.",

  tutorial: {
    title: "Étape par étape : Marketing Pinterest pour Imprimables",
    steps: [
      {
        title: "Créez un compte professionnel",
        description: "Accès aux analytics et rich pins.",
      },
      {
        title: "Créez 5–10 épingles par produit",
        description: "Variation de designs pour tester ce qui convertit.",
      },
      {
        title: "Publiez régulièrement",
        description: "5–10 épingles par jour pour une croissance constante.",
      }
    ],
  },

  platformTips: [
    {
      platform: "Pinterest",
      title: "Stratégie Pinterest",
      description: "Le trafic Pinterest est gratuit et cumulé.",
    }
  ],

  monetization: [
    {
      title: "Trafic gratuit vers Etsy",
      description: "Chaque épingle est un lien gratuit vers vos produits.",
    }
  ],

  examples: "Les vendeurs actifs sur Pinterest voient 30–50% de leur trafic Etsy venir de Pinterest.",

  faq: [
    {
      question: "Combien de temps pour voir des résultats?",
      answer: "2–3 mois pour que les premières épingles génèrent du trafic régulier.",
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
