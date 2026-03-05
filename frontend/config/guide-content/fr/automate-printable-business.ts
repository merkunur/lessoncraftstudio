import type { CreateXContent } from '../types';

export const content: CreateXContent = {
  guideId: "automate-printable-business",
  locale: 'fr',

  seo: {
    titleTag: "Automatiser Votre Business d'Imprimables | Guide Gratuit",
    metaDescription: "L'automatisation est ce qui sépare les vendeurs à 500€/mois de ceux à 5 000€/mois. Découvrez les systèmes et workflows qui multiplient votre productivité.",
    primaryKeyword: "automatiser business imprimables",
    secondaryKeywords: ["automatisation fiches","workflow imprimables","productivité vendeur fiches","systèmes business fiches","production batch imprimables"],
    lsiKeywords: ["automatisation","workflow","batch processing","templates","outils productivité","optimisation temps","systèmes","efficacité"],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/wordsearch/sample-1.jpeg',
      primaryAlt: "Fiche imprimable automate printable business",
      secondary: '/samples/english/wordsearch/sample-2.jpeg',
      secondaryAlt: "Exemple de fiche automate printable business",
    },
    sampleGallery: [
      { src: '/samples/english/wordsearch/sample-1.jpeg', alt: "Exemple fiche wordsearch", caption: 'Exemple de qualité professionnelle' },
      { src: '/samples/english/wordsearch/sample-2.jpeg', alt: "Fiche avec corrigé wordsearch", caption: 'Corrigé automatique inclus' },
    ],
    youtubeId: '36keBFzJbPo',
    videoTitle: "Automatiser Votre Business d'Imprimables — Tutoriel",
  },

  hero: {
    title: "Automatiser Votre Business d'Imprimables",
    description: "L'automatisation est ce qui sépare les vendeurs à 500€/mois de ceux à 5 000€/mois. Découvrez les systèmes et workflows qui multiplient votre productivité.",
  },

  introduction: "Créer manuellement chaque fiche est un plafond de verre. Les générateurs automatiques et les workflows batch vous permettent de produire 10x plus dans le même temps.",

  tutorial: {
    title: "Étape par étape : Automatiser Votre Business d'Imprimables",
    steps: [
      {
        title: "Cartographiez votre workflow actuel",
        description: "Identifiez les tâches répétitives que vous pouvez automatiser.",
      },
      {
        title: "Adoptez la production par lots",
        description: "Création → formatage → listing en journées dédiées.",
      },
      {
        title: "Créez des templates",
        description: "Modèles de descriptions, tags et images pour accélérer les listings.",
      }
    ],
  },

  platformTips: [
    {
      platform: "Multi-plateforme",
      title: "Workflow multi-plateforme",
      description: "Même contenu, adapté pour Etsy, KDP et TPT simultanément.",
    }
  ],

  monetization: [
    {
      title: "Production à l'échelle",
      description: "50 fiches en 30 minutes avec les générateurs batch.",
    }
  ],

  examples: "Un vendeur automatisé produit en une journée ce qu'un vendeur manuel produit en un mois.",

  faq: [
    {
      question: "Quels outils pour automatiser ?",
      answer: "Nos générateurs + Canva (mockups) + outils de planification (listings).",
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
