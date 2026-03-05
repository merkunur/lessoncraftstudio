import type { CreateXContent } from '../types';

export const content: CreateXContent = {
  guideId: "passive-income-worksheets",
  locale: 'fr',

  seo: {
    titleTag: "Revenus Passifs avec les Fiches Imprimables | Guide Gratuit",
    metaDescription: "Les fiches imprimables sont l'un des meilleurs véhicules de revenus passifs. Créez une fois, vendez des milliers de fois sans effort supplémentaire.",
    primaryKeyword: "revenus passifs fiches imprimables",
    secondaryKeywords: ["revenu passif worksheets","gagner passif imprimables","fiches éducatives revenus","income passif éducation","business passif fiches"],
    lsiKeywords: ["automatique","récurrent","sans effort","catalogue","actifs numériques","ventes automatiques","revenus dormants","liberté financière"],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/wordsearch/sample-1.jpeg',
      primaryAlt: "Fiche imprimable passive income worksheets",
      secondary: '/samples/english/wordsearch/sample-2.jpeg',
      secondaryAlt: "Exemple de fiche passive income worksheets",
    },
    sampleGallery: [
      { src: '/samples/english/wordsearch/sample-1.jpeg', alt: "Exemple fiche wordsearch", caption: 'Exemple de qualité professionnelle' },
      { src: '/samples/english/wordsearch/sample-2.jpeg', alt: "Fiche avec corrigé wordsearch", caption: 'Corrigé automatique inclus' },
    ],
    youtubeId: '36keBFzJbPo',
    videoTitle: "Revenus Passifs avec les Fiches Imprimables — Tutoriel",
  },

  hero: {
    title: "Revenus Passifs avec les Fiches Imprimables",
    description: "Les fiches imprimables sont l'un des meilleurs véhicules de revenus passifs. Créez une fois, vendez des milliers de fois sans effort supplémentaire.",
  },

  introduction: "Le modèle des imprimables est idéal pour les revenus passifs: pas de stock, pas de fabrication, pas d'expédition. Une fiche vendue 1 000 fois coûte autant à produire qu'une fiche vendue une fois.",

  tutorial: {
    title: "Étape par étape : Revenus Passifs avec les Fiches Imprimables",
    steps: [
      {
        title: "Créez un catalogue de 50+ produits",
        description: "La masse critique pour des ventes quotidiennes régulières.",
      },
      {
        title: "Optimisez le SEO de chaque listing",
        description: "Le trafic organique est la clé de la passivité.",
      },
      {
        title: "Diversifiez les plateformes",
        description: "Etsy + KDP + TPT pour maximiser la couverture.",
      }
    ],
  },

  platformTips: [
    {
      platform: "Multi-plateforme",
      title: "Stratégie passive",
      description: "Plus de plateformes = plus de sources de revenus passifs.",
    }
  ],

  monetization: [
    {
      title: "Actifs numériques",
      description: "Chaque produit est un actif qui travaille pour vous 24/7.",
    }
  ],

  examples: "Avec 100 produits bien optimisés, attendez-vous à 1 000–3 000€/mois quasi-automatiques.",

  faq: [
    {
      question: "C'est vraiment passif?",
      answer: "Après la phase de création, oui. Les ventes récurrentes nécessitent peu de maintenance.",
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
