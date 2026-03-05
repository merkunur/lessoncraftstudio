import type { CreateXContent } from '../types';

export const content: CreateXContent = {
  guideId: "copyright-printable-sellers",
  locale: 'fr',

  seo: {
    titleTag: "Droits d'Auteur pour Vendeurs d'Imprimables | Guide Gratuit",
    metaDescription: "Protéger vos créations et respecter les droits des autres sont essentiels pour un business durable. Ce guide clarifie les questions de copyright pour les v",
    primaryKeyword: "droits auteur vendeurs imprimables",
    secondaryKeywords: ["copyright fiches éducatives","propriété intellectuelle worksheets","protection droits imprimables","légalité vente fiches","copyright imprimables"],
    lsiKeywords: ["propriété intellectuelle","marques déposées","contrefacon","DMCA","protection juridique","droits originaux","licence","autorisations"],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/wordsearch/sample-1.jpeg',
      primaryAlt: "Fiche imprimable copyright printable sellers",
      secondary: '/samples/english/wordsearch/sample-2.jpeg',
      secondaryAlt: "Exemple de fiche copyright printable sellers",
    },
    sampleGallery: [
      { src: '/samples/english/wordsearch/sample-1.jpeg', alt: "Exemple fiche wordsearch", caption: 'Exemple de qualité professionnelle' },
      { src: '/samples/english/wordsearch/sample-2.jpeg', alt: "Fiche avec corrigé wordsearch", caption: 'Corrigé automatique inclus' },
    ],
    youtubeId: '36keBFzJbPo',
    videoTitle: "Droits d'Auteur pour Vendeurs d'Imprimables — Tutoriel",
  },

  hero: {
    title: "Droits d'Auteur pour Vendeurs d'Imprimables",
    description: "Protéger vos créations et respecter les droits des autres sont essentiels pour un business durable. Ce guide clarifie les questions de copyright pour les vendeurs d'imprimables.",
  },

  introduction: "Les questions de droits d'auteur préoccupent beaucoup de nouveaux vendeurs. Ce guide clarifie ce que vous pouvez et ne pouvez pas faire.",

  tutorial: {
    title: "Étape par étape : Droits d'Auteur pour Vendeurs d'Imprimables",
    steps: [
      {
        title: "Comprenez vos droits",
        description: "Les fiches que vous créez avec nos outils vous appartiennent (avec licence commerciale).",
      },
      {
        title: "Évitez les infractions",
        description: "N'utilisez jamais de personnages, logos ou marques déposées sans autorisation.",
      },
      {
        title: "Protégez votre travail",
        description: "Surveillez les copies de vos produits et utilisez les outils DMCA si nécessaire.",
      }
    ],
  },

  platformTips: [
    {
      platform: "Multi-plateforme",
      title: "Protection sur chaque plateforme",
      description: "Etsy, Amazon et TPT ont tous des procédures de signalement de contrefacon.",
    }
  ],

  monetization: [
    {
      title: "Licences commerciales",
      description: "Vendez des licences premium pour l'utilisation commerciale de vos créations.",
    }
  ],

  examples: "La protection proactive de votre propriété intellectuelle est un investissement pour votre business.",

  faq: [
    {
      question: "Que faire si quelqu'un copie mes produits ?",
      answer: "Utilisez la procédure DMCA de la plateforme pour signaler la contrefacon et demander le retrait.",
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
