import type { CreateXContent } from '../types';

export const content: CreateXContent = {
  guideId: "create-cryptogram-puzzles",
  locale: 'fr',

  seo: {
    titleTag: "Comment Créer des Cryptogrammes | Guide Gratuit",
    metaDescription: "Les cryptogrammes transforment l'apprentissage des lettres en mission de décodage. Les élèves remplacent des symboles par des lettres pour révéler des mess",
    primaryKeyword: "créer cryptogrammes imprimables",
    secondaryKeywords: ["générateur cryptogramme","puzzles codage lettres","fiches décodage","jeux codes secrets","cryptogramme éducatif"],
    lsiKeywords: ["substitution lettres","code secret","déchiffrement","logique","alphabet codé","puzzle lettres","message caché","décodage"],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/cryptogram/sample-1.jpeg',
      primaryAlt: "Fiche imprimable create cryptogram puzzles",
      secondary: '/samples/english/cryptogram/sample-2.jpeg',
      secondaryAlt: "Exemple de fiche create cryptogram puzzles",
    },
    sampleGallery: [
      { src: '/samples/english/cryptogram/sample-1.jpeg', alt: "Exemple fiche cryptogram", caption: 'Exemple de qualité professionnelle' },
      { src: '/samples/english/cryptogram/sample-2.jpeg', alt: "Fiche avec corrigé cryptogram", caption: 'Corrigé automatique inclus' },
    ],
    youtubeId: '36keBFzJbPo',
    videoTitle: "Comment Créer des Cryptogrammes — Tutoriel",
  },

  hero: {
    title: "Comment Créer des Cryptogrammes",
    description: "Les cryptogrammes transforment l'apprentissage des lettres en mission de décodage. Les élèves remplacent des symboles par des lettres pour révéler des messages cachés, développant logique et littératie simultanément.",
  },

  introduction: "Les cryptogrammes sont des puzzles de substitution où chaque lettre est remplacée par un symbole ou une autre lettre. Ce format engageant développe la reconnaissance des patterns et la pensée logique.",

  tutorial: {
    title: "Étape par étape : Comment Créer des Cryptogrammes",
    steps: [
      {
        title: "Choisissez le type de code",
        description: "Substitution simple, symboles ou numéros.",
      },
      {
        title: "Sélectionnez la difficulté",
        description: "Phrases courtes pour débutants, phrases longues pour avancés.",
      },
      {
        title: "Générez et exportez",
        description: "PDF avec puzzle et clé de décodage.",
      }
    ],
  },

  platformTips: [
    {
      platform: "Etsy",
      title: "Vendre sur Etsy",
      description: "Les cryptogrammes sont un créneau unique et peu concurrentiel.",
    }
  ],

  monetization: [
    {
      title: "Cahier de codes secrets",
      description: "Les enfants adorent les thèmes espionnage et codes secrets.",
    }
  ],

  examples: "Les cryptogrammes sont particulièrement populaires pour les activités de fête et les clubs de lecture.",

  faq: [
    {
      question: "Pour quel âge ?",
      answer: "Dès 6 ans pour les codes simples, sans limite d'âge pour les versions avancées.",
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
    { slug: "cryptogram", pageType: "app", anchorText: "Générateur de Cryptogrammes" }
  ],
};
