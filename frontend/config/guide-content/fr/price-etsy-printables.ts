import type { CreateXContent } from '../types';

export const content: CreateXContent = {
  guideId: "price-etsy-printables",
  locale: 'fr',

  seo: {
    titleTag: "Comment Fixer les Prix sur Etsy | Guide Gratuit",
    metaDescription: "Le prix est un levier puissant. Trop bas, vous dévalorisez votre travail. Trop haut, vous perdez des ventes. Ce guide vous aide à trouver le prix optimal.",
    primaryKeyword: "fixer prix etsy imprimables",
    secondaryKeywords: ["pricing etsy worksheets","prix fiches etsy","stratégie prix imprimables","combien vendre etsy","tarification etsy fiches"],
    lsiKeywords: ["psychologie prix","anchoring","valeur perçue","concurrence","marge","comparaison prix","test prix","optimisation"],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/wordsearch/sample-1.jpeg',
      primaryAlt: "Fiche imprimable price etsy printables",
      secondary: '/samples/english/wordsearch/sample-2.jpeg',
      secondaryAlt: "Exemple de fiche price etsy printables",
    },
    sampleGallery: [
      { src: '/samples/english/wordsearch/sample-1.jpeg', alt: "Exemple fiche wordsearch", caption: 'Exemple de qualité professionnelle' },
      { src: '/samples/english/wordsearch/sample-2.jpeg', alt: "Fiche avec corrigé wordsearch", caption: 'Corrigé automatique inclus' },
    ],
    youtubeId: '36keBFzJbPo',
    videoTitle: "Comment Fixer les Prix sur Etsy — Tutoriel",
  },

  hero: {
    title: "Comment Fixer les Prix sur Etsy",
    description: "Le prix est un levier puissant. Trop bas, vous dévalorisez votre travail. Trop haut, vous perdez des ventes. Ce guide vous aide à trouver le prix optimal.",
  },

  introduction: "Le pricing des imprimables sur Etsy suit des règles spécifiques. Apprenez à utiliser la psychologie des prix et les données concurrentielles pour maximiser vos revenus.",

  tutorial: {
    title: "Étape par étape : Comment Fixer les Prix sur Etsy",
    steps: [
      {
        title: "Analysez la concurrence",
        description: "Notez les prix des 20 meilleures ventes dans votre niche.",
      },
      {
        title: "Positionnez-vous",
        description: "Légèrement sous les best-sellers au début, puis augmentez.",
      },
      {
        title: "Testez différents prix",
        description: "Changez le prix tous les 2–3 semaines et mesurez l'impact.",
      }
    ],
  },

  platformTips: [
    {
      platform: "Etsy",
      title: "Pricing Etsy",
      description: "3,99–7,99€ pour packs individuels. 14,99–29,99€ pour mega-bundles.",
    }
  ],

  monetization: [
    {
      title: "Stratégie étagée",
      description: "Petit/moyen/grand bundle au même thème pour toutes les bourses.",
    }
  ],

  examples: "Les vendeurs qui testent activement leurs prix gagnent 15–30% de plus.",

  faq: [
    {
      question: "Quel prix pour débuter?",
      answer: "3,99€ pour un pack de 10–15 fiches est un bon point de départ.",
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
