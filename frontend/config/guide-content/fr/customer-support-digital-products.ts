import type { CreateXContent } from '../types';

export const content: CreateXContent = {
  guideId: "customer-support-digital-products",
  locale: 'fr',

  seo: {
    titleTag: "Support Client pour Produits Numériques | Guide Gratuit",
    metaDescription: "Un excellent support client transforme les acheteurs en clients réguliers et génère des avis 5 étoiles. Apprenez à gérer efficacement les demandes tout en ",
    primaryKeyword: "support client produits numériques",
    secondaryKeywords: ["service client imprimables","gestion clients fiches","FAQ vendeur numérique","support acheteurs etsy","réclamations produits numériques"],
    lsiKeywords: ["service après-vente","réponse rapide","avis négatifs","satisfaction client","modèles réponse","communication","résolution problèmes","fidélisation"],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/wordsearch/sample-1.jpeg',
      primaryAlt: "Fiche imprimable customer support digital products",
      secondary: '/samples/english/wordsearch/sample-2.jpeg',
      secondaryAlt: "Exemple de fiche customer support digital products",
    },
    sampleGallery: [
      { src: '/samples/english/wordsearch/sample-1.jpeg', alt: "Exemple fiche wordsearch", caption: 'Exemple de qualité professionnelle' },
      { src: '/samples/english/wordsearch/sample-2.jpeg', alt: "Fiche avec corrigé wordsearch", caption: 'Corrigé automatique inclus' },
    ],
    youtubeId: '36keBFzJbPo',
    videoTitle: "Support Client pour Produits Numériques — Tutoriel",
  },

  hero: {
    title: "Support Client pour Produits Numériques",
    description: "Un excellent support client transforme les acheteurs en clients réguliers et génère des avis 5 étoiles. Apprenez à gérer efficacement les demandes tout en minimisant votre temps.",
  },

  introduction: "Le support client est souvent négligé par les vendeurs d'imprimables, mais c'est un avantage compétitif majeur. Des réponses rapides et professionnelles génèrent des avis positifs.",

  tutorial: {
    title: "Étape par étape : Support Client pour Produits Numériques",
    steps: [
      {
        title: "Créez des modèles de réponse",
        description: "5–10 réponses types pour les questions fréquentes.",
      },
      {
        title: "Répondez en 24h",
        description: "La rapidité est le facteur numéro un de satisfaction.",
      },
      {
        title: "Anticipez les problèmes",
        description: "Incluez des instructions claires dans chaque listing.",
      }
    ],
  },

  platformTips: [
    {
      platform: "Multi-plateforme",
      title: "Support multi-plateforme",
      description: "Chaque plateforme a son système de messagerie. Surveillez-les tous.",
    }
  ],

  monetization: [
    {
      title: "Avis positifs",
      description: "Un bon support = avis 5 étoiles = plus de ventes.",
    }
  ],

  examples: "Les vendeurs avec un taux de réponse < 24h ont en moyenne 30% plus d'avis positifs.",

  faq: [
    {
      question: "Faut-il répondre à tous les messages ?",
      answer: "Oui. Même un simple remerciement montre que vous êtes professionnel et attentif.",
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
