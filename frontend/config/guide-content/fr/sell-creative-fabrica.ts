import type { CreateXContent } from '../types';

export const content: CreateXContent = {
  guideId: "sell-creative-fabrica",
  locale: 'fr',

  seo: {
    titleTag: "Vendre sur Creative Fabrica | Guide Gratuit",
    metaDescription: "Creative Fabrica est une marketplace de designs et imprimables en pleine croissance. Découvrez comment y vendre vos fiches.",
    primaryKeyword: "vendre creative fabrica imprimables",
    secondaryKeywords: ["creative fabrica worksheets","boutique creative fabrica","imprimables creative fabrica","plateforme creative fabrica","alternative etsy creative fabrica"],
    lsiKeywords: ["marketplace design","vente design","plateforme alternative","diversification","graphisme","templates","digital assets","passif"],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/wordsearch/sample-1.jpeg',
      primaryAlt: "Fiche imprimable sell creative fabrica",
      secondary: '/samples/english/wordsearch/sample-2.jpeg',
      secondaryAlt: "Exemple de fiche sell creative fabrica",
    },
    sampleGallery: [
      { src: '/samples/english/wordsearch/sample-1.jpeg', alt: "Exemple fiche wordsearch", caption: 'Exemple de qualité professionnelle' },
      { src: '/samples/english/wordsearch/sample-2.jpeg', alt: "Fiche avec corrigé wordsearch", caption: 'Corrigé automatique inclus' },
    ],
    youtubeId: '36keBFzJbPo',
    videoTitle: "Vendre sur Creative Fabrica — Tutoriel",
  },

  hero: {
    title: "Vendre sur Creative Fabrica",
    description: "Creative Fabrica est une marketplace de designs et imprimables en pleine croissance. Découvrez comment y vendre vos fiches.",
  },

  introduction: "Creative Fabrica offre une audience différente d'Etsy, centrée sur les designers et créateurs. C'est un excellent canal de diversification.",

  tutorial: {
    title: "Étape par étape : Vendre sur Creative Fabrica",
    steps: [
      {
        title: "Créez un compte vendeur",
        description: "Inscription gratuite. Commission variable selon le plan.",
      },
      {
        title: "Adaptez vos produits",
        description: "Creative Fabrica valorise les designs de qualité et les templates.",
      },
      {
        title: "Optimisez vos listings",
        description: "Tags et descriptions adaptés à l'audience Creative Fabrica.",
      }
    ],
  },

  platformTips: [
    {
      platform: "Creative Fabrica",
      title: "Stratégie Creative Fabrica",
      description: "Complément parfait à Etsy pour la diversification.",
    }
  ],

  monetization: [
    {
      title: "Revenu passif supplémentaire",
      description: "Un canal de plus = un flux de revenus de plus.",
    }
  ],

  examples: "Les vendeurs présents sur Creative Fabrica en plus d'Etsy gagnent 15–25% de revenus supplémentaires.",

  faq: [
    {
      question: "Creative Fabrica est-il rentable?",
      answer: "Pour les imprimables éducatifs, c'est un bon complément mais rarement le canal principal.",
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
