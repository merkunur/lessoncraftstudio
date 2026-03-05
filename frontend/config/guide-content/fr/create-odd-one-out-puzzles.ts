import type { CreateXContent } from '../types';

export const content: CreateXContent = {
  guideId: "create-odd-one-out-puzzles",
  locale: 'fr',

  seo: {
    titleTag: "Comment Créer des Fiches Intrus | Guide Gratuit",
    metaDescription: "Les fiches intrus développent la pensée critique et la catégorisation. Les enfants identifient l'élément qui ne fait pas partie du groupe, renforçant leurs",
    primaryKeyword: "créer fiches intrus imprimables",
    secondaryKeywords: ["fiches odd one out français","trouver intrus imprimable","jeux logique maternelle","fiches raisonnement","intrus images enfants"],
    lsiKeywords: ["pensée critique","catégorisation","classification","raisonnement logique","différent","élimination","observation","comparaison"],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/odd-one-out/sample-1.jpeg',
      primaryAlt: "Fiche imprimable create odd one out puzzles",
      secondary: '/samples/english/odd-one-out/sample-2.jpeg',
      secondaryAlt: "Exemple de fiche create odd one out puzzles",
    },
    sampleGallery: [
      { src: '/samples/english/odd-one-out/sample-1.jpeg', alt: "Exemple fiche odd-one-out", caption: 'Exemple de qualité professionnelle' },
      { src: '/samples/english/odd-one-out/sample-2.jpeg', alt: "Fiche avec corrigé odd-one-out", caption: 'Corrigé automatique inclus' },
    ],
    youtubeId: '36keBFzJbPo',
    videoTitle: "Comment Créer des Fiches Intrus — Tutoriel",
  },

  hero: {
    title: "Comment Créer des Fiches Intrus",
    description: "Les fiches intrus développent la pensée critique et la catégorisation. Les enfants identifient l'élément qui ne fait pas partie du groupe, renforçant leurs compétences de classification.",
  },

  introduction: "Trouver l'intrus est un exercice classique de logique. Notre générateur crée des groupes d'images avec un élément différent, en utilisant 104 thèmes pour une variété infinie.",

  tutorial: {
    title: "Étape par étape : Comment Créer des Fiches Intrus",
    steps: [
      {
        title: "Choisissez le nombre de groupes",
        description: "4–10 groupes par page selon l'âge.",
      },
      {
        title: "Sélectionnez les thèmes",
        description: "Mix de thèmes pour des intrus variés.",
      },
      {
        title: "Générez le PDF",
        description: "Fiche avec groupes et corrigé automatique.",
      }
    ],
  },

  platformTips: [
    {
      platform: "Etsy",
      title: "Vendre sur Etsy",
      description: "Excellent complément aux packs de logique maternelle.",
    }
  ],

  monetization: [
    {
      title: "Pack logique complet",
      description: "Intrus + patterns + tri pour un bundle raisonnement.",
    }
  ],

  examples: "Les fiches intrus sont souvent utilisées comme échauffement en début de séance. Rapides et engageantes.",

  faq: [
    {
      question: "Les critères d'intrus sont-ils variés ?",
      answer: "Oui, les intrus peuvent différer par catégorie, couleur, taille ou type.",
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
    { slug: "odd-one-out", pageType: "app", anchorText: "Générateur d'Intrus" }
  ],
};
