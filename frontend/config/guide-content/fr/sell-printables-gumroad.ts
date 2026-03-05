import type { CreateXContent } from '../types';

export const content: CreateXContent = {
  guideId: "sell-printables-gumroad",
  locale: 'fr',

  seo: {
    titleTag: "Vendre des Imprimables sur Gumroad | Guide Gratuit",
    metaDescription: "Gumroad offre une alternative simple à Etsy avec des commissions plus basses et un contrôle total sur votre expérience client.",
    primaryKeyword: "vendre imprimables gumroad",
    secondaryKeywords: ["gumroad worksheets","boutique gumroad fiches","alternative etsy gumroad","vente directe imprimables","gumroad fiches éducatives"],
    lsiKeywords: ["vente directe","commission réduite","contrôle total","email intégré","landing page","marque propre","indépendance","plateforme simple"],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/wordsearch/sample-1.jpeg',
      primaryAlt: "Fiche imprimable sell printables gumroad",
      secondary: '/samples/english/wordsearch/sample-2.jpeg',
      secondaryAlt: "Exemple de fiche sell printables gumroad",
    },
    sampleGallery: [
      { src: '/samples/english/wordsearch/sample-1.jpeg', alt: "Exemple fiche wordsearch", caption: 'Exemple de qualité professionnelle' },
      { src: '/samples/english/wordsearch/sample-2.jpeg', alt: "Fiche avec corrigé wordsearch", caption: 'Corrigé automatique inclus' },
    ],
    youtubeId: '36keBFzJbPo',
    videoTitle: "Vendre des Imprimables sur Gumroad — Tutoriel",
  },

  hero: {
    title: "Vendre des Imprimables sur Gumroad",
    description: "Gumroad offre une alternative simple à Etsy avec des commissions plus basses et un contrôle total sur votre expérience client.",
  },

  introduction: "Gumroad est une plateforme de vente directe idéale pour les vendeurs qui veulent construire leur propre marque indépendante des marketplaces.",

  tutorial: {
    title: "Étape par étape : Vendre des Imprimables sur Gumroad",
    steps: [
      {
        title: "Créez votre page Gumroad",
        description: "Configuration en 10 minutes. Aucun frais mensuel.",
      },
      {
        title: "Uploadez vos produits",
        description: "PDF, ZIP — tous les formats sont supportés.",
      },
      {
        title: "Dirigez le trafic",
        description: "Pinterest, email et réseaux sociaux vers vos pages Gumroad.",
      }
    ],
  },

  platformTips: [
    {
      platform: "Gumroad",
      title: "Stratégie Gumroad",
      description: "Commission de 10% seulement. Pas de frais de listing.",
    }
  ],

  monetization: [
    {
      title: "Marges maximales",
      description: "Moins de commissions = plus de profit par vente.",
    }
  ],

  examples: "Gumroad est idéal pour les vendeurs avec une audience existante (email, Pinterest).",

  faq: [
    {
      question: "Gumroad vs Etsy?",
      answer: "Etsy apporte du trafic. Gumroad offre de meilleures marges mais nécessite votre propre trafic.",
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
