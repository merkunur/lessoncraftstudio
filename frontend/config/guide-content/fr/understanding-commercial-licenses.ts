import type { CreateXContent } from '../types';

export const content: CreateXContent = {
  guideId: "understanding-commercial-licenses",
  locale: 'fr',

  seo: {
    titleTag: "Comprendre les Licences Commerciales | Guide Gratuit",
    metaDescription: "La compréhension des licences est cruciale avant de vendre. Ce guide explique clairement chaque type de licence et ce qu'il vous permet de faire.",
    primaryKeyword: "comprendre licences commerciales imprimables",
    secondaryKeywords: ["licence commerciale worksheets","droits vente fiches","licence imprimables explication","types licences éducatif","licence revente worksheets"],
    lsiKeywords: ["usage personnel","usage commercial","conditions","restrictions","droits","revente","redistribution","modification"],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/wordsearch/sample-1.jpeg',
      primaryAlt: "Fiche imprimable understanding commercial licenses",
      secondary: '/samples/english/wordsearch/sample-2.jpeg',
      secondaryAlt: "Exemple de fiche understanding commercial licenses",
    },
    sampleGallery: [
      { src: '/samples/english/wordsearch/sample-1.jpeg', alt: "Exemple fiche wordsearch", caption: 'Exemple de qualité professionnelle' },
      { src: '/samples/english/wordsearch/sample-2.jpeg', alt: "Fiche avec corrigé wordsearch", caption: 'Corrigé automatique inclus' },
    ],
    youtubeId: '36keBFzJbPo',
    videoTitle: "Comprendre les Licences Commerciales — Tutoriel",
  },

  hero: {
    title: "Comprendre les Licences Commerciales",
    description: "La compréhension des licences est cruciale avant de vendre. Ce guide explique clairement chaque type de licence et ce qu'il vous permet de faire.",
  },

  introduction: "Beaucoup de vendeurs ne comprennent pas pleinement leurs droits. Ce guide clarifie les différents types de licences pour éviter tout problème.",

  tutorial: {
    title: "Étape par étape : Comprendre les Licences Commerciales",
    steps: [
      {
        title: "Identifiez votre besoin",
        description: "Usage personnel = gratuit. Vente = licence commerciale (27$). Maximum = accès complet (47$).",
      },
      {
        title: "Comprenez vos droits",
        description: "La licence commerciale vous autorise à vendre sur toutes les plateformes.",
      },
      {
        title: "Conservez vos preuves",
        description: "Gardez votre confirmation d'achat comme preuve de licence.",
      }
    ],
  },

  platformTips: [
    {
      platform: "Multi-plateforme",
      title: "Licences multi-plateforme",
      description: "Une seule licence couvre toutes les plateformes de vente.",
    }
  ],

  monetization: [
    {
      title: "ROI immédiat",
      description: "Une licence à 27$ se rentabilise en quelques ventes.",
    }
  ],

  examples: "Les vendeurs avec licence commerciale complète génèrent un ROI moyen de 10–50x sur leur investissement.",

  faq: [
    {
      question: "La licence expire-t-elle?",
      answer: "Non. C'est un achat unique avec accès à vie et mises à jour incluses.",
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
