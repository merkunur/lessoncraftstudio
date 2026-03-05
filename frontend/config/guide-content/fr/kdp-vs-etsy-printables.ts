import type { CreateXContent } from '../types';

export const content: CreateXContent = {
  guideId: "kdp-vs-etsy-printables",
  locale: 'fr',

  seo: {
    titleTag: "KDP vs Etsy pour les Imprimables | Guide Gratuit",
    metaDescription: "KDP et Etsy sont les deux piliers du business d'imprimables. Ce guide compare objectivement les deux plateformes.",
    primaryKeyword: "kdp vs etsy imprimables",
    secondaryKeywords: ["comparaison kdp etsy","amazon ou etsy fiches","meilleur plateforme imprimables","kdp etsy revenus","choisir entre kdp etsy"],
    lsiKeywords: ["marges","volume","passivité","effort","diversification","avantages","inconvénients","comparatif"],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/wordsearch/sample-1.jpeg',
      primaryAlt: "Fiche imprimable kdp vs etsy printables",
      secondary: '/samples/english/wordsearch/sample-2.jpeg',
      secondaryAlt: "Exemple de fiche kdp vs etsy printables",
    },
    sampleGallery: [
      { src: '/samples/english/wordsearch/sample-1.jpeg', alt: "Exemple fiche wordsearch", caption: 'Exemple de qualité professionnelle' },
      { src: '/samples/english/wordsearch/sample-2.jpeg', alt: "Fiche avec corrigé wordsearch", caption: 'Corrigé automatique inclus' },
    ],
    youtubeId: '36keBFzJbPo',
    videoTitle: "KDP vs Etsy pour les Imprimables — Tutoriel",
  },

  hero: {
    title: "KDP vs Etsy pour les Imprimables",
    description: "KDP et Etsy sont les deux piliers du business d'imprimables. Ce guide compare objectivement les deux plateformes.",
  },

  introduction: "KDP et Etsy servent des marchés différents avec des modèles différents. Les meilleurs vendeurs utilisent les deux.",

  tutorial: {
    title: "Étape par étape : KDP vs Etsy pour les Imprimables",
    steps: [
      {
        title: "Évaluez vos priorités",
        description: "Marges élevées = Etsy. Volume passif = KDP.",
      },
      {
        title: "Commencez par un",
        description: "Maîtrisez un avant d'ajouter l'autre.",
      },
      {
        title: "Diversifiez",
        description: "Même contenu adapté pour les deux plateformes.",
      }
    ],
  },

  platformTips: [
    {
      platform: "Multi-plateforme",
      title: "Stratégie double",
      description: "Etsy pour les PDF, KDP pour les livres imprimés.",
    }
  ],

  monetization: [
    {
      title: "Double revenu",
      description: "Le même contenu génère deux flux de revenus distincts.",
    }
  ],

  examples: "Etsy: marges 70-90%, résultats rapides. KDP: marges 30-50%, revenus très passifs.",

  faq: [
    {
      question: "Lequel choisir en premier?",
      answer: "Etsy pour les débutants (plus rapide). KDP pour le long terme (plus passif).",
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
