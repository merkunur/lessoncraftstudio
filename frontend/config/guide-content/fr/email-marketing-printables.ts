import type { CreateXContent } from '../types';

export const content: CreateXContent = {
  guideId: "email-marketing-printables",
  locale: 'fr',

  seo: {
    titleTag: "Email Marketing pour Vendeurs d'Imprimables | Guide Gratuit",
    metaDescription: "L'email marketing offre le meilleur ROI de tous les canaux pour les vendeurs d'imprimables. Construisez une liste engagée qui génère des ventes à chaque en",
    primaryKeyword: "email marketing imprimables",
    secondaryKeywords: ["newsletter vendeur fiches","liste email imprimables","lead magnet worksheets","email automatique fiches","campagne email éducation"],
    lsiKeywords: ["conversion email","taux ouverture","lead magnet","sequence automatique","freebie","liste abonnés","ROI email","fidélisation"],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/wordsearch/sample-1.jpeg',
      primaryAlt: "Fiche imprimable email marketing printables",
      secondary: '/samples/english/wordsearch/sample-2.jpeg',
      secondaryAlt: "Exemple de fiche email marketing printables",
    },
    sampleGallery: [
      { src: '/samples/english/wordsearch/sample-1.jpeg', alt: "Exemple fiche wordsearch", caption: 'Exemple de qualité professionnelle' },
      { src: '/samples/english/wordsearch/sample-2.jpeg', alt: "Fiche avec corrigé wordsearch", caption: 'Corrigé automatique inclus' },
    ],
    youtubeId: '36keBFzJbPo',
    videoTitle: "Email Marketing pour Vendeurs d'Imprimables — Tutoriel",
  },

  hero: {
    title: "Email Marketing pour Vendeurs d'Imprimables",
    description: "L'email marketing offre le meilleur ROI de tous les canaux pour les vendeurs d'imprimables. Construisez une liste engagée qui génère des ventes à chaque envoi.",
  },

  introduction: "Une liste email de 1 000 abonnés engagés vaut plus que 10 000 followers sur les réseaux sociaux. Ce guide vous montre comment construire et monétiser votre liste.",

  tutorial: {
    title: "Étape par étape : Email Marketing pour Vendeurs d'Imprimables",
    steps: [
      {
        title: "Créez un lead magnet",
        description: "Pack gratuit de 5–10 fiches en échange de l'email.",
      },
      {
        title: "Configurez une séquence de bienvenue",
        description: "3–5 emails automatiques présentant vos meilleurs produits.",
      },
      {
        title: "Envoyez des newsletters régulières",
        description: "1–2 emails/semaine avec nouveautés, offres et contenu utile.",
      }
    ],
  },

  platformTips: [
    {
      platform: "Email",
      title: "Stratégie email",
      description: "Mailchimp ou ConvertKit gratuits jusqu'à 500–1 000 abonnés.",
    }
  ],

  monetization: [
    {
      title: "Ventes directes par email",
      description: "Chaque email promotionnel génère des ventes immédiates.",
    }
  ],

  examples: "Les vendeurs avec une liste email gagnent en moyenne 25–40% de plus que ceux sans.",

  faq: [
    {
      question: "Quel outil email utiliser ?",
      answer: "Mailchimp (gratuit jusqu'à 500 contacts) est parfait pour débuter.",
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
