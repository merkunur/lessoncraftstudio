import type { CreateXContent } from '../types';

export const content: CreateXContent = {
  guideId: "math-activity-books-kdp",
  locale: 'fr',

  seo: {
    titleTag: "Cahiers de Maths pour Amazon KDP | Guide Gratuit",
    metaDescription: "Les cahiers de maths sont une catégorie KDP à forte demande. Apprenez à créer des cahiers progressifs qui se démarquent.",
    primaryKeyword: "cahiers maths amazon kdp",
    secondaryKeywords: ["livre maths enfants kdp","cahier exercices maths","publier maths amazon","workbook maths KDP","activités mathématiques livre"],
    lsiKeywords: ["addition soustraction","puzzles maths","graded difficulty","primaire","préscolaire","compétences maths","programme maths","cahier progressif"],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/addition/sample-1.jpeg',
      primaryAlt: "Fiche imprimable math activity books kdp",
      secondary: '/samples/english/addition/sample-2.jpeg',
      secondaryAlt: "Exemple de fiche math activity books kdp",
    },
    sampleGallery: [
      { src: '/samples/english/addition/sample-1.jpeg', alt: "Exemple fiche addition", caption: 'Exemple de qualité professionnelle' },
      { src: '/samples/english/addition/sample-2.jpeg', alt: "Fiche avec corrigé addition", caption: 'Corrigé automatique inclus' },
    ],
    youtubeId: '36keBFzJbPo',
    videoTitle: "Cahiers de Maths pour Amazon KDP — Tutoriel",
  },

  hero: {
    title: "Cahiers de Maths pour Amazon KDP",
    description: "Les cahiers de maths sont une catégorie KDP à forte demande. Apprenez à créer des cahiers progressifs qui se démarquent.",
  },

  introduction: "Les parents recherchent activement des cahiers de maths supplémentaires pour leurs enfants. C'est une niche stable toute l'année.",

  tutorial: {
    title: "Étape par étape : Cahiers de Maths pour Amazon KDP",
    steps: [
      {
        title: "Choisissez un niveau",
        description: "Maternelle, CP, CE1 — chaque niveau est un produit distinct.",
      },
      {
        title: "Créez un programme progressif",
        description: "50–100 pages de difficulté croissante.",
      },
      {
        title: "Ajoutez de la variété",
        description: "Mix addition, soustraction, puzzles et comptage.",
      }
    ],
  },

  platformTips: [
    {
      platform: "Amazon KDP",
      title: "Cahiers maths KDP",
      description: "Ciblez 'cahier maths maternelle' ou 'exercices maths CP' dans les mots-clés.",
    }
  ],

  monetization: [
    {
      title: "Série par niveau",
      description: "Un cahier par niveau scolaire = 5–7 titres minimum.",
    }
  ],

  examples: "Les cahiers 'Maths Maternelle' en français ont peu de concurrence sur Amazon.fr.",

  faq: [
    {
      question: "Quel prix pour un cahier maths KDP?",
      answer: "6,99–9,99€ pour 80–120 pages. Redevance typique: 2–3€/vente.",
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
    { slug: "addition", pageType: "app", anchorText: "Générateur Addition" }
  ],
};
