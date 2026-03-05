import type { CreateXContent } from '../types';

export const content: CreateXContent = {
  guideId: "pricing-educational-printables",
  locale: 'fr',

  seo: {
    titleTag: "Stratégies de Prix pour Imprimables Éducatifs | Guide Gratuit",
    metaDescription: "Les stratégies de prix déterminent vos marges et votre positionnement. Ce guide couvre le pricing étagé, les licences et les promotions.",
    primaryKeyword: "stratégies prix imprimables éducatifs",
    secondaryKeywords: ["tarification worksheets","prix fiches pédagogiques","pricing imprimables","valeur imprimables","modèle prix fiches"],
    lsiKeywords: ["tier pricing","premium","entrée de gamme","valeur ajoutée","licence","bundle pricing","marges","ROI"],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/wordsearch/sample-1.jpeg',
      primaryAlt: "Fiche imprimable pricing educational printables",
      secondary: '/samples/english/wordsearch/sample-2.jpeg',
      secondaryAlt: "Exemple de fiche pricing educational printables",
    },
    sampleGallery: [
      { src: '/samples/english/wordsearch/sample-1.jpeg', alt: "Exemple fiche wordsearch", caption: 'Exemple de qualité professionnelle' },
      { src: '/samples/english/wordsearch/sample-2.jpeg', alt: "Fiche avec corrigé wordsearch", caption: 'Corrigé automatique inclus' },
    ],
    youtubeId: '36keBFzJbPo',
    videoTitle: "Stratégies de Prix pour Imprimables Éducatifs — Tutoriel",
  },

  hero: {
    title: "Stratégies de Prix pour Imprimables Éducatifs",
    description: "Les stratégies de prix déterminent vos marges et votre positionnement. Ce guide couvre le pricing étagé, les licences et les promotions.",
  },

  introduction: "Il n'y a pas de prix 'correct' unique — il y a des stratégies de prix adaptées à vos objectifs et votre marché.",

  tutorial: {
    title: "Étape par étape : Stratégies de Prix pour Imprimables Éducatifs",
    steps: [
      {
        title: "Définissez vos niveaux de prix",
        description: "Entrée de gamme, standard et premium.",
      },
      {
        title: "Créez de la valeur perçue",
        description: "Les bundles justifient des prix plus élevés.",
      },
      {
        title: "Utilisez les promotions stratégiquement",
        description: "Soldes saisonnières pour booster le volume.",
      }
    ],
  },

  platformTips: [
    {
      platform: "Multi-plateforme",
      title: "Pricing cross-plateforme",
      description: "Adaptez les prix à chaque plateforme.",
    }
  ],

  monetization: [
    {
      title: "Licences premium",
      description: "27€ commercial, 47€ accès complet. Marges maximales.",
    }
  ],

  examples: "Le pricing étagé (3 niveaux) convertit systématiquement mieux qu'un prix unique.",

  faq: [
    {
      question: "Faut-il offrir des freebies?",
      answer: "Oui. Un freebie de qualité génère des avis et des clients récurrents.",
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
