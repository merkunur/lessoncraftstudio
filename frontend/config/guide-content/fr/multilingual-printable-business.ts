import type { CreateXContent } from '../types';

export const content: CreateXContent = {
  guideId: "multilingual-printable-business",
  locale: 'fr',

  seo: {
    titleTag: "Business Imprimables Multilingue | Guide Gratuit",
    metaDescription: "Les marchés non-anglophones offrent des opportunités massives avec moins de concurrence. Découvrez comment exploiter 11 langues pour multiplier vos revenus",
    primaryKeyword: "business imprimables multilingue",
    secondaryKeywords: ["vendre fiches plusieurs langues","imprimables internationaux","multilingue etsy","worksheets multilangues","expansion internationale fiches"],
    lsiKeywords: ["traduction","localisation","marchés internationaux","vocabulaire","langues européennes","adaptation","stratégie internationale","globalisation"],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/wordsearch/sample-1.jpeg',
      primaryAlt: "Fiche imprimable multilingual printable business",
      secondary: '/samples/english/wordsearch/sample-2.jpeg',
      secondaryAlt: "Exemple de fiche multilingual printable business",
    },
    sampleGallery: [
      { src: '/samples/english/wordsearch/sample-1.jpeg', alt: "Exemple fiche wordsearch", caption: 'Exemple de qualité professionnelle' },
      { src: '/samples/english/wordsearch/sample-2.jpeg', alt: "Fiche avec corrigé wordsearch", caption: 'Corrigé automatique inclus' },
    ],
    youtubeId: '36keBFzJbPo',
    videoTitle: "Business Imprimables Multilingue — Tutoriel",
  },

  hero: {
    title: "Business Imprimables Multilingue",
    description: "Les marchés non-anglophones offrent des opportunités massives avec moins de concurrence. Découvrez comment exploiter 11 langues pour multiplier vos revenus.",
  },

  introduction: "Chaque langue supplémentaire est un nouveau marché. Nos générateurs supportent 11 langues nativement, rendant l'expansion internationale quasi-instantanée.",

  tutorial: {
    title: "Étape par étape : Business Imprimables Multilingue",
    steps: [
      {
        title: "Identifiez les marchés prioritaires",
        description: "Allemand et espagnol offrent le meilleur ratio après l'anglais et le français.",
      },
      {
        title: "Adaptez vos produits",
        description: "Utilisez les générateurs en mode multilingue.",
      },
      {
        title: "Localisez vos listings",
        description: "Tags et descriptions dans la langue cible.",
      }
    ],
  },

  platformTips: [
    {
      platform: "Multi-plateforme",
      title: "Stratégie multilingue",
      description: "Etsy est mondial. KDP a des marketplaces par pays (amazon.de, amazon.es, etc.).",
    }
  ],

  monetization: [
    {
      title: "Multiplicateur de revenus",
      description: "5 langues = 5x les opportunités de vente.",
    }
  ],

  examples: "Les vendeurs multilingues gagnent 3–5x plus que les vendeurs monolingues.",

  faq: [
    {
      question: "Faut-il parler la langue?",
      answer: "Non. Les générateurs produisent le contenu dans la langue choisie automatiquement.",
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
