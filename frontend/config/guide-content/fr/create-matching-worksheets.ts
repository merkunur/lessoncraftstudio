import type { CreateXContent } from '../types';

export const content: CreateXContent = {
  guideId: "create-matching-worksheets",
  locale: 'fr',

  seo: {
    titleTag: "Comment Créer des Fiches d'Association | Guide Gratuit",
    metaDescription: "Les fiches d'association développent la mémoire visuelle et les compétences d'observation. Les enfants relient des images identiques, des ombres ou des pai",
    primaryKeyword: "créer fiches association imprimables",
    secondaryKeywords: ["fiches matching maternelle","jeux association imprimables","fiches correspondance images","générateur matching","association images enfants"],
    lsiKeywords: ["correspondance visuelle","mémoire visuelle","association paires","jeu d'images","reconnaissance","discrimination visuelle","paires identiques","observation"],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/matching/sample-1.jpeg',
      primaryAlt: "Fiche imprimable create matching worksheets",
      secondary: '/samples/english/matching/sample-2.jpeg',
      secondaryAlt: "Exemple de fiche create matching worksheets",
    },
    sampleGallery: [
      { src: '/samples/english/matching/sample-1.jpeg', alt: "Exemple fiche matching", caption: 'Exemple de qualité professionnelle' },
      { src: '/samples/english/matching/sample-2.jpeg', alt: "Fiche avec corrigé matching", caption: 'Corrigé automatique inclus' },
    ],
    youtubeId: '36keBFzJbPo',
    videoTitle: "Comment Créer des Fiches d'Association — Tutoriel",
  },

  hero: {
    title: "Comment Créer des Fiches d'Association",
    description: "Les fiches d'association développent la mémoire visuelle et les compétences d'observation. Les enfants relient des images identiques, des ombres ou des paires logiques dans des grilles de difficulté progressive.",
  },

  introduction: "L'association est une compétence cognitive fondamentale. Nos fiches proposent des grilles de 4 à 12 paires avec 104 thèmes illustrés, créant des milliers de combinaisons uniques.",

  tutorial: {
    title: "Étape par étape : Comment Créer des Fiches d'Association",
    steps: [
      {
        title: "Choisissez le nombre de paires",
        description: "4 paires pour débutants, 8–12 pour avancés.",
      },
      {
        title: "Sélectionnez un thème",
        description: "104 thèmes d'images. Animaux, véhicules, fruits et plus.",
      },
      {
        title: "Générez et téléchargez",
        description: "PDF avec fiche et corrigé.",
      }
    ],
  },

  platformTips: [
    {
      platform: "Etsy",
      title: "Vendre sur Etsy",
      description: "Les fiches matching sont très demandées pour les 3–6 ans.",
    }
  ],

  monetization: [
    {
      title: "Pack association multi-niveaux",
      description: "3 niveaux de difficulté dans un seul pack.",
    }
  ],

  examples: "Les jeux d'association sont un classique de maternelle. Les parents les achètent massivement pour occuper les enfants lors des trajets.",

  faq: [
    {
      question: "Combien de paires par fiche ?",
      answer: "De 4 (facile) à 12 (difficile). Adaptez selon l'âge de l'enfant.",
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
    { slug: "matching", pageType: "app", anchorText: "Générateur d'Association" }
  ],
};
