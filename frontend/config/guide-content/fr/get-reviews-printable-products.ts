import type { CreateXContent } from '../types';

export const content: CreateXContent = {
  guideId: "get-reviews-printable-products",
  locale: 'fr',

  seo: {
    titleTag: "Obtenir des Avis pour vos Imprimables | Guide Gratuit",
    metaDescription: "Les avis sont le facteur de conversion numéro un sur Etsy. Apprenez des stratégies éthiques pour obtenir plus d'avis et améliorer votre ranking.",
    primaryKeyword: "obtenir avis imprimables",
    secondaryKeywords: ["avis etsy imprimables","reviews fiches éducatives","témoignages clients worksheets","feedback produits numériques","stratégie avis etsy"],
    lsiKeywords: ["social proof","preuve sociale","confiance acheteur","5 étoiles","satisfaction","suivi client","relance avis","crédibilité"],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/wordsearch/sample-1.jpeg',
      primaryAlt: "Fiche imprimable get reviews printable products",
      secondary: '/samples/english/wordsearch/sample-2.jpeg',
      secondaryAlt: "Exemple de fiche get reviews printable products",
    },
    sampleGallery: [
      { src: '/samples/english/wordsearch/sample-1.jpeg', alt: "Exemple fiche wordsearch", caption: 'Exemple de qualité professionnelle' },
      { src: '/samples/english/wordsearch/sample-2.jpeg', alt: "Fiche avec corrigé wordsearch", caption: 'Corrigé automatique inclus' },
    ],
    youtubeId: '36keBFzJbPo',
    videoTitle: "Obtenir des Avis pour vos Imprimables — Tutoriel",
  },

  hero: {
    title: "Obtenir des Avis pour vos Imprimables",
    description: "Les avis sont le facteur de conversion numéro un sur Etsy. Apprenez des stratégies éthiques pour obtenir plus d'avis et améliorer votre ranking.",
  },

  introduction: "Un produit avec 50 avis se vend 10x plus qu'un produit identique sans avis. Les avis construisent la confiance et améliorent le classement dans la recherche.",

  tutorial: {
    title: "Étape par étape : Obtenir des Avis pour vos Imprimables",
    steps: [
      {
        title: "Offrez un freebie pour les premiers avis",
        description: "Un produit gratuit avec une note 'Votre avis compte' génère des avis naturels.",
      },
      {
        title: "Incluez un mot de remerciement",
        description: "Un fichier PDF dans le téléchargement remerciant et invitant à laisser un avis.",
      },
      {
        title: "Répondez à chaque avis",
        description: "Montrez que vous valorisez les retours clients.",
      }
    ],
  },

  platformTips: [
    {
      platform: "Etsy",
      title: "Avis Etsy",
      description: "Les avis améliorent votre ranking Etsy et votre taux de conversion.",
    }
  ],

  monetization: [
    {
      title: "Effet boule de neige",
      description: "Plus d'avis = plus de confiance = plus de ventes = plus d'avis.",
    }
  ],

  examples: "Les vendeurs qui demandent systématiquement des avis en obtiennent 3x plus.",

  faq: [
    {
      question: "Puis-je offrir des produits contre des avis ?",
      answer: "Non. Etsy interdit l'achat d'avis. Offrez des freebies séparément et laissez les avis venir naturellement.",
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
