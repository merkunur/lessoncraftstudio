import type { CreateXContent } from '../types';

export const content: CreateXContent = {
  guideId: "create-alphabet-worksheets",
  locale: 'fr',

  seo: {
    titleTag: "Comment Créer des Fiches d'Alphabet | Guide Gratuit",
    metaDescription: "Le train de l'alphabet transforme l'apprentissage des lettres en voyage ludique. Chaque wagon représente une lettre avec une image thématique associée, cré",
    primaryKeyword: "créer fiches alphabet imprimables",
    secondaryKeywords: ["fiches alphabet maternelle","générateur alphabet","train alphabet imprimable","fiches lettres enfants","apprentissage alphabet"],
    lsiKeywords: ["reconnaissance lettres","alphabet train","wagons lettres","majuscules minuscules","phonèmes","prélecture","petite section","ABC"],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/alphabet-train/sample-1.jpeg',
      primaryAlt: "Fiche imprimable create alphabet worksheets",
      secondary: '/samples/english/alphabet-train/sample-2.jpeg',
      secondaryAlt: "Exemple de fiche create alphabet worksheets",
    },
    sampleGallery: [
      { src: '/samples/english/alphabet-train/sample-1.jpeg', alt: "Exemple fiche alphabet-train", caption: 'Exemple de qualité professionnelle' },
      { src: '/samples/english/alphabet-train/sample-2.jpeg', alt: "Fiche avec corrigé alphabet-train", caption: 'Corrigé automatique inclus' },
    ],
    youtubeId: '36keBFzJbPo',
    videoTitle: "Comment Créer des Fiches d'Alphabet — Tutoriel",
  },

  hero: {
    title: "Comment Créer des Fiches d'Alphabet",
    description: "Le train de l'alphabet transforme l'apprentissage des lettres en voyage ludique. Chaque wagon représente une lettre avec une image thématique associée, créant une association visuelle mémorable entre la lettre et un objet.",
  },

  introduction: "L'alphabet est la première étape de la littératie. Les fiches de train d'alphabet rendent cet apprentissage concret et amusant grâce à des images colorées associées à chaque lettre.",

  tutorial: {
    title: "Étape par étape : Comment Créer des Fiches d'Alphabet",
    steps: [
      {
        title: "Choisissez les lettres",
        description: "Alphabet complet ou lettres spécifiques pour la pratique ciblée.",
      },
      {
        title: "Sélectionnez un thème",
        description: "Chaque thème associe des images commençant par la lettre concernée.",
      },
      {
        title: "Générez le train",
        description: "PDF avec wagons colorés prêts à imprimer et découper.",
      }
    ],
  },

  platformTips: [
    {
      platform: "Etsy",
      title: "Vendre sur Etsy",
      description: "Les fiches alphabet sont recherchées par les parents de 3–5 ans.",
    }
  ],

  monetization: [
    {
      title: "Pack pré-lecture complet",
      description: "Combinez alphabet, écriture et reconnaissance de lettres.",
    }
  ],

  examples: "Les enseignants de maternelle affichent les trains d'alphabet dans leur classe. Les parents les utilisent pour l'instruction à domicile.",

  faq: [
    {
      question: "Dès quel âge ?",
      answer: "Dès 3 ans. Idéal pour la maternelle (3–6 ans).",
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
    { slug: "alphabet-train", pageType: "app", anchorText: "Générateur Train d'Alphabet" }
  ],
};
