import type { CreateXContent } from '../types';

export const content: CreateXContent = {
  guideId: "research-profitable-niches",
  locale: 'fr',

  seo: {
    titleTag: "Rechercher des Niches Rentables | Guide Gratuit",
    metaDescription: "Une recherche de niche méthodique est la fondation d'un business rentable. Ce guide détaille le processus de recherche étape par étape.",
    primaryKeyword: "rechercher niches rentables imprimables",
    secondaryKeywords: ["trouver niche profitable","analyse niche worksheets","recherche marché fiches","validation niche imprimables","niches inexploitées"],
    lsiKeywords: ["analyse concurrence","volume recherche","opportunité","data-driven","validation marché","tendances","saisonnalité","demande"],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/wordsearch/sample-1.jpeg',
      primaryAlt: "Fiche imprimable research profitable niches",
      secondary: '/samples/english/wordsearch/sample-2.jpeg',
      secondaryAlt: "Exemple de fiche research profitable niches",
    },
    sampleGallery: [
      { src: '/samples/english/wordsearch/sample-1.jpeg', alt: "Exemple fiche wordsearch", caption: 'Exemple de qualité professionnelle' },
      { src: '/samples/english/wordsearch/sample-2.jpeg', alt: "Fiche avec corrigé wordsearch", caption: 'Corrigé automatique inclus' },
    ],
    youtubeId: '36keBFzJbPo',
    videoTitle: "Rechercher des Niches Rentables — Tutoriel",
  },

  hero: {
    title: "Rechercher des Niches Rentables",
    description: "Une recherche de niche méthodique est la fondation d'un business rentable. Ce guide détaille le processus de recherche étape par étape.",
  },

  introduction: "Les vendeurs qui réussissent ne devinent pas leurs niches — ils les recherchent systématiquement avec des données.",

  tutorial: {
    title: "Étape par étape : Rechercher des Niches Rentables",
    steps: [
      {
        title: "Utilisez la recherche Etsy",
        description: "Les suggestions automatiques révèlent les termes populaires.",
      },
      {
        title: "Analysez Amazon BSR",
        description: "Le Best Sellers Rank indique le volume de ventes.",
      },
      {
        title: "Calculez le potentiel",
        description: "Demande élevée + faible concurrence = niche idéale.",
      }
    ],
  },

  platformTips: [
    {
      platform: "Multi-plateforme",
      title: "Recherche cross-plateforme",
      description: "Validez sur Etsy ET Amazon pour confirmer la demande.",
    }
  ],

  monetization: [
    {
      title: "Niches première position",
      description: "Dans les petites niches, 5–10 produits suffisent pour dominer.",
    }
  ],

  examples: "Une heure de recherche peut éviter des mois de travail mal orienté.",

  faq: [
    {
      question: "Quels outils de recherche utiliser?",
      answer: "Gratuits: barre de recherche Etsy/Amazon. Payants: eRank, Marmalead.",
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
