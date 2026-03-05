import type { CreateXContent } from '../types';

export const content: CreateXContent = {
  guideId: "best-kdp-activity-book-niches",
  locale: 'fr',

  seo: {
    titleTag: "Meilleures Niches pour Cahiers KDP | Guide Gratuit",
    metaDescription: "Certaines niches KDP sont saturées, d'autres sont des mines d'or inexploitées. Ce guide analyse les niches les plus rentables pour les cahiers d'activités ",
    primaryKeyword: "meilleures niches cahiers kdp",
    secondaryKeywords: ["niches KDP rentables","niches cahier activités amazon","créneaux KDP fiches","niches puzzles KDP","catégories KDP enfants"],
    lsiKeywords: ["analyse marché","demande KDP","concurrence","BSR","mots-clés amazon","catégories bestseller","niches sous-exploitées","opportunités"],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/wordsearch/sample-1.jpeg',
      primaryAlt: "Fiche imprimable best kdp activity book niches",
      secondary: '/samples/english/wordsearch/sample-2.jpeg',
      secondaryAlt: "Exemple de fiche best kdp activity book niches",
    },
    sampleGallery: [
      { src: '/samples/english/wordsearch/sample-1.jpeg', alt: "Exemple fiche wordsearch", caption: 'Exemple de qualité professionnelle' },
      { src: '/samples/english/wordsearch/sample-2.jpeg', alt: "Fiche avec corrigé wordsearch", caption: 'Corrigé automatique inclus' },
    ],
    youtubeId: '36keBFzJbPo',
    videoTitle: "Meilleures Niches pour Cahiers KDP — Tutoriel",
  },

  hero: {
    title: "Meilleures Niches pour Cahiers KDP",
    description: "Certaines niches KDP sont saturées, d'autres sont des mines d'or inexploitées. Ce guide analyse les niches les plus rentables pour les cahiers d'activités en 2026.",
  },

  introduction: "Le choix de niche détermine 80% de votre succès sur KDP. Apprenez à identifier les niches à forte demande et faible concurrence.",

  tutorial: {
    title: "Étape par étape : Meilleures Niches pour Cahiers KDP",
    steps: [
      {
        title: "Analysez le BSR des best-sellers",
        description: "Un BSR < 50K indique de bonnes ventes. < 10K = excellent.",
      },
      {
        title: "Comptez la concurrence",
        description: "Moins de 500 résultats pour votre mot-clé = opportunité.",
      },
      {
        title: "Validez avec les outils",
        description: "Utilisez la barre de recherche Amazon pour voir les suggestions.",
      }
    ],
  },

  platformTips: [
    {
      platform: "Amazon KDP",
      title: "Analyse niches KDP",
      description: "Ciblez les sous-catégories spécifiques plutôt que les larges.",
    }
  ],

  monetization: [
    {
      title: "Multi-niches",
      description: "Couvrez 5–10 niches pour diversifier vos revenus.",
    }
  ],

  examples: "Les meilleures niches en français : mots mêlés thématiques, cahiers de maths maternelle, cahiers coloriage animaux.",

  faq: [
    {
      question: "Quelle niche choisir en premier ?",
      answer: "Les mots mêlés et coloriages ont le meilleur ratio demande/concurrence pour débuter.",
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
