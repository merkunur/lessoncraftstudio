import type { CreateXContent } from '../types';

export const content: CreateXContent = {
  guideId: "sell-educational-printables-etsy",
  locale: 'fr',

  seo: {
    titleTag: "Vendre des Imprimables Éducatifs sur Etsy | Guide Gratuit",
    metaDescription: "Etsy est la première destination pour les imprimables éducatifs. Ce guide détaille les stratégies spécifiques pour réussir dans cette catégorie.",
    primaryKeyword: "vendre imprimables éducatifs etsy",
    secondaryKeywords: ["fiches éducatives etsy","business etsy éducation","worksheets vente etsy","boutique etsy pédagogie","imprimables scolaires etsy"],
    lsiKeywords: ["listing optimisé","conversion","panier moyen","branding","spécialisation","audience cible","positionnement","stratégie vente"],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/wordsearch/sample-1.jpeg',
      primaryAlt: "Fiche imprimable sell educational printables etsy",
      secondary: '/samples/english/wordsearch/sample-2.jpeg',
      secondaryAlt: "Exemple de fiche sell educational printables etsy",
    },
    sampleGallery: [
      { src: '/samples/english/wordsearch/sample-1.jpeg', alt: "Exemple fiche wordsearch", caption: 'Exemple de qualité professionnelle' },
      { src: '/samples/english/wordsearch/sample-2.jpeg', alt: "Fiche avec corrigé wordsearch", caption: 'Corrigé automatique inclus' },
    ],
    youtubeId: '36keBFzJbPo',
    videoTitle: "Vendre des Imprimables Éducatifs sur Etsy — Tutoriel",
  },

  hero: {
    title: "Vendre des Imprimables Éducatifs sur Etsy",
    description: "Etsy est la première destination pour les imprimables éducatifs. Ce guide détaille les stratégies spécifiques pour réussir dans cette catégorie.",
  },

  introduction: "Les imprimables éducatifs représentent l'une des catégories à plus forte croissance sur Etsy. Apprenez à vous positionner efficacement.",

  tutorial: {
    title: "Étape par étape : Vendre des Imprimables Éducatifs sur Etsy",
    steps: [
      {
        title: "Spécialisez votre boutique",
        description: "Choisissez un créneau éducatif spécifique.",
      },
      {
        title: "Créez 20+ listings de qualité",
        description: "La masse critique pour l'algorithme Etsy.",
      },
      {
        title: "Optimisez sans cesse",
        description: "Testez titres, tags et images chaque mois.",
      }
    ],
  },

  platformTips: [
    {
      platform: "Etsy",
      title: "Etsy éducation",
      description: "Catégorie en croissance avec forte demande.",
    }
  ],

  monetization: [
    {
      title: "Boutique spécialisée",
      description: "Les boutiques spécialisées convertissent mieux que les généralistes.",
    }
  ],

  examples: "Les boutiques Etsy spécialisées en éducation avec 50+ listings génèrent 500–2 000€/mois.",

  faq: [
    {
      question: "Combien de listings pour réussir?",
      answer: "20+ pour commencer à voir des ventes régulières. 50+ pour un revenu significatif.",
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
