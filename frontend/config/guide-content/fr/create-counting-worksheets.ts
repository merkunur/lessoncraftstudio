import type { CreateXContent } from '../types';

export const content: CreateXContent = {
  guideId: "create-counting-worksheets",
  locale: 'fr',

  seo: {
    titleTag: "Comment Créer des Fiches de Comptage | Guide Gratuit",
    metaDescription: "Les fiches de comptage sont essentielles pour le développement du sens du nombre. Les enfants comptent des objets thématiques et écrivent le total, constru",
    primaryKeyword: "créer fiches comptage imprimables",
    secondaryKeywords: ["fiches compter maternelle","générateur comptage","exercices dénombrement","fiches numération","compter objets imprimable"],
    lsiKeywords: ["dénombrement","numération","correspondance nombre quantité","compter images","pré-mathématiques","maternelle","petite section","sens du nombre"],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/find-and-count/sample-1.jpeg',
      primaryAlt: "Fiche imprimable create counting worksheets",
      secondary: '/samples/english/find-and-count/sample-2.jpeg',
      secondaryAlt: "Exemple de fiche create counting worksheets",
    },
    sampleGallery: [
      { src: '/samples/english/find-and-count/sample-1.jpeg', alt: "Exemple fiche find-and-count", caption: 'Exemple de qualité professionnelle' },
      { src: '/samples/english/find-and-count/sample-2.jpeg', alt: "Fiche avec corrigé find-and-count", caption: 'Corrigé automatique inclus' },
    ],
    youtubeId: '36keBFzJbPo',
    videoTitle: "Comment Créer des Fiches de Comptage — Tutoriel",
  },

  hero: {
    title: "Comment Créer des Fiches de Comptage",
    description: "Les fiches de comptage sont essentielles pour le développement du sens du nombre. Les enfants comptent des objets thématiques et écrivent le total, construisant la correspondance nombre-quantité de manière visuelle et concrète.",
  },

  introduction: "Le comptage est la première compétence mathématique formelle. Nos fiches utilisent des images colorées pour rendre l'exercice engageant. Chaque fiche est générée aléatoirement pour une pratique variée.",

  tutorial: {
    title: "Étape par étape : Comment Créer des Fiches de Comptage",
    steps: [
      {
        title: "Choisissez la plage de comptage",
        description: "1–5 pour les tout-petits, 1–10 pour la maternelle, 1–20 pour le CP.",
      },
      {
        title: "Sélectionnez un thème",
        description: "Animaux, véhicules, fruits — 104 thèmes pour varier les fiches.",
      },
      {
        title: "Configurez et générez",
        description: "Nombre d'exercices par page, taille des images, PDF prêt à imprimer.",
      }
    ],
  },

  platformTips: [
    {
      platform: "Etsy",
      title: "Vendre sur Etsy",
      description: "Les fiches de comptage thématiques pour maternelle sont très demandées.",
    }
  ],

  monetization: [
    {
      title: "Pack maternelle complet",
      description: "Combinaison comptage + coloriage + association pour un pack complet.",
    }
  ],

  examples: "Les fiches 'Cherche et Compte' sont les préférées des parents de maternelle sur Etsy. Un vendeur spécialisé vend 50+ copies par mois.",

  faq: [
    {
      question: "Dès quel âge ?",
      answer: "Dès 3 ans avec comptage jusqu'à 5. Idéal maternelle (3–6 ans).",
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
    { slug: "find-and-count", pageType: "app", anchorText: "Générateur Cherche et Compte" },
    { slug: "create-addition-worksheets", pageType: "guide", anchorText: "Fiches d'Addition" }
  ],
};
