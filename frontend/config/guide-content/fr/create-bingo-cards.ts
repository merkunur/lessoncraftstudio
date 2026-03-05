import type { CreateXContent } from '../types';

export const content: CreateXContent = {
  guideId: "create-bingo-cards",
  locale: 'fr',

  seo: {
    titleTag: "Comment Créer des Cartes de Bingo | Guide Gratuit",
    metaDescription: "Les cartes de bingo transforment n'importe quel thème en activité de groupe amusante. Générez des sets de cartes uniques avec 104 thèmes illustrés.",
    primaryKeyword: "créer cartes bingo imprimables",
    secondaryKeywords: ["générateur bingo","cartes bingo enfants","bingo éducatif imprimable","jeu bingo classe","bingo images PDF"],
    lsiKeywords: ["jeu de groupe","activité classe","fête enfants","apprentissage ludique","reconnaissance images","loto","cartes aléatoires","animation"],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/bingo/sample-1.jpeg',
      primaryAlt: "Fiche imprimable create bingo cards",
      secondary: '/samples/english/bingo/sample-2.jpeg',
      secondaryAlt: "Exemple de fiche create bingo cards",
    },
    sampleGallery: [
      { src: '/samples/english/bingo/sample-1.jpeg', alt: "Exemple fiche bingo", caption: 'Exemple de qualité professionnelle' },
      { src: '/samples/english/bingo/sample-2.jpeg', alt: "Fiche avec corrigé bingo", caption: 'Corrigé automatique inclus' },
    ],
    youtubeId: '36keBFzJbPo',
    videoTitle: "Comment Créer des Cartes de Bingo — Tutoriel",
  },

  hero: {
    title: "Comment Créer des Cartes de Bingo",
    description: "Les cartes de bingo transforment n'importe quel thème en activité de groupe amusante. Générez des sets de cartes uniques avec 104 thèmes illustrés.",
  },

  introduction: "Le bingo est un jeu de groupe classique parfait pour les classes, les fêtes et les réunions de famille. Chaque set contient des cartes uniques pour que chaque joueur ait une expérience différente.",

  tutorial: {
    title: "Étape par étape : Comment Créer des Cartes de Bingo",
    steps: [
      {
        title: "Sélectionnez un thème",
        description: "104 thèmes d'images pour des bingos thématiques.",
      },
      {
        title: "Configurez le nombre de cartes",
        description: "8–30 cartes uniques par set.",
      },
      {
        title: "Générez et imprimez",
        description: "PDF avec cartes et fiche d'appel pour l'animateur.",
      }
    ],
  },

  platformTips: [
    {
      platform: "Etsy",
      title: "Vendre sur Etsy",
      description: "Les bingos thématiques sont populaires pour les fêtes et la classe.",
    }
  ],

  monetization: [
    {
      title: "Bingo saisonnier",
      description: "Halloween, Noël, Carnaval — chaque saison est une opportunité.",
    }
  ],

  examples: "Les enseignants achètent des bingos pour les journées spéciales. Les parents pour les anniversaires.",

  faq: [
    {
      question: "Combien de cartes par set ?",
      answer: "Jusqu'à 30 cartes uniques par génération. Chaque carte est différente.",
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
    { slug: "bingo", pageType: "app", anchorText: "Générateur de Bingo" }
  ],
};
