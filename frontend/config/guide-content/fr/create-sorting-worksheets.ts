import type { CreateXContent } from '../types';

export const content: CreateXContent = {
  guideId: "create-sorting-worksheets",
  locale: 'fr',

  seo: {
    titleTag: "Comment Créer des Fiches de Tri | Guide Gratuit",
    metaDescription: "Les fiches de tri enseignent la classification et la catégorisation. Les enfants trient des images dans des groupes selon des critères comme la couleur, la",
    primaryKeyword: "créer fiches tri imprimables",
    secondaryKeywords: ["fiches classement maternelle","générateur tri","sorting worksheet français","fiches catégorisation","tri objets enfants imprimable"],
    lsiKeywords: ["classification","catégories","regroupement","attributs","pensée logique","organisation","trier","classer"],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/sorting/sample-1.jpeg',
      primaryAlt: "Fiche imprimable create sorting worksheets",
      secondary: '/samples/english/sorting/sample-2.jpeg',
      secondaryAlt: "Exemple de fiche create sorting worksheets",
    },
    sampleGallery: [
      { src: '/samples/english/sorting/sample-1.jpeg', alt: "Exemple fiche sorting", caption: 'Exemple de qualité professionnelle' },
      { src: '/samples/english/sorting/sample-2.jpeg', alt: "Fiche avec corrigé sorting", caption: 'Corrigé automatique inclus' },
    ],
    youtubeId: '36keBFzJbPo',
    videoTitle: "Comment Créer des Fiches de Tri — Tutoriel",
  },

  hero: {
    title: "Comment Créer des Fiches de Tri",
    description: "Les fiches de tri enseignent la classification et la catégorisation. Les enfants trient des images dans des groupes selon des critères comme la couleur, la taille ou la catégorie.",
  },

  introduction: "Le tri est une compétence cognitive fondamentale. En classant des objets par catégorie, les enfants développent leur capacité d'analyse et de pensée logique.",

  tutorial: {
    title: "Étape par étape : Comment Créer des Fiches de Tri",
    steps: [
      {
        title: "Définissez les catégories",
        description: "2–4 catégories de tri selon l'âge.",
      },
      {
        title: "Sélectionnez les thèmes",
        description: "Mix de thèmes pour des exercices de tri variés.",
      },
      {
        title: "Générez le PDF",
        description: "Fiches avec images à découper et zones de tri.",
      }
    ],
  },

  platformTips: [
    {
      platform: "Etsy",
      title: "Vendre sur Etsy",
      description: "Les fiches de tri sont un classique de maternelle toujours demandé.",
    }
  ],

  monetization: [
    {
      title: "Pack classification complet",
      description: "Tri + intègre bien dans les packs logique maternelle.",
    }
  ],

  examples: "Les enseignants utilisent les fiches de tri dans les ateliers Montessori et les coins mathématiques.",

  faq: [
    {
      question: "Quels critères de tri ?",
      answer: "Catégorie (animaux/véhicules), couleur, taille et autres attributs visuels.",
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
    { slug: "sorting", pageType: "app", anchorText: "Générateur de Tri" }
  ],
};
