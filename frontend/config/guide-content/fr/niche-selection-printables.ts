import type { CreateXContent } from '../types';

export const content: CreateXContent = {
  guideId: "niche-selection-printables",
  locale: 'fr',

  seo: {
    titleTag: "Choisir sa Niche d'Imprimables | Guide Gratuit",
    metaDescription: "Le choix de niche détermine 80% de votre succès. Ce guide vous aide à identifier, valider et dominer une niche rentable.",
    primaryKeyword: "choisir niche imprimables",
    secondaryKeywords: ["sélection niche fiches","meilleure niche worksheets","créneau imprimables rentable","analyse niche éducatif","trouver niche imprimables"],
    lsiKeywords: ["analyse marché","demande","concurrence","validation","recherche","opportunité","créneau","spécialisation"],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/wordsearch/sample-1.jpeg',
      primaryAlt: "Fiche imprimable niche selection printables",
      secondary: '/samples/english/wordsearch/sample-2.jpeg',
      secondaryAlt: "Exemple de fiche niche selection printables",
    },
    sampleGallery: [
      { src: '/samples/english/wordsearch/sample-1.jpeg', alt: "Exemple fiche wordsearch", caption: 'Exemple de qualité professionnelle' },
      { src: '/samples/english/wordsearch/sample-2.jpeg', alt: "Fiche avec corrigé wordsearch", caption: 'Corrigé automatique inclus' },
    ],
    youtubeId: '36keBFzJbPo',
    videoTitle: "Choisir sa Niche d'Imprimables — Tutoriel",
  },

  hero: {
    title: "Choisir sa Niche d'Imprimables",
    description: "Le choix de niche détermine 80% de votre succès. Ce guide vous aide à identifier, valider et dominer une niche rentable.",
  },

  introduction: "Trop de vendeurs choisissent leur niche au hasard. Une approche systématique de sélection de niche évite des mois de travail mal ciblé.",

  tutorial: {
    title: "Étape par étape : Choisir sa Niche d'Imprimables",
    steps: [
      {
        title: "Listez 10 niches potentielles",
        description: "Brainstormez des intersections âge + compétence + thème.",
      },
      {
        title: "Validez la demande",
        description: "Vérifiez le volume de recherche sur Etsy et Amazon.",
      },
      {
        title: "Analysez la concurrence",
        description: "Évaluez la qualité et le nombre de concurrents.",
      }
    ],
  },

  platformTips: [
    {
      platform: "Multi-plateforme",
      title: "Validation multi-plateforme",
      description: "Une niche viable doit montrer de la demande sur au moins 2 plateformes.",
    }
  ],

  monetization: [
    {
      title: "Niche profonde",
      description: "Mieux vaut dominer une petite niche que se perdre dans une grande.",
    }
  ],

  examples: "Les niches les plus rentables en 2026: maths maternelle, mots mêlés thématiques, coloriages animaux.",

  faq: [
    {
      question: "Quelle est la meilleure niche?",
      answer: "Celle où la demande est forte et la concurrence est faible ou de mauvaise qualité. Les fiches de maths et les puzzles sont des valeurs sûres.",
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
