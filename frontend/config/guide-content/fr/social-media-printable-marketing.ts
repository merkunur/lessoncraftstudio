import type { CreateXContent } from '../types';

export const content: CreateXContent = {
  guideId: "social-media-printable-marketing",
  locale: 'fr',

  seo: {
    titleTag: "Réseaux Sociaux pour Vendeurs d'Imprimables | Guide Gratuit",
    metaDescription: "Les réseaux sociaux complètent Pinterest pour générer du trafic et construire une communauté autour de votre marque d'imprimables.",
    primaryKeyword: "réseaux sociaux vendeurs imprimables",
    secondaryKeywords: ["marketing social fiches","instagram imprimables","facebook worksheets","tiktok éducation","réseaux sociaux etsy"],
    lsiKeywords: ["engagement","communauté","contenu visuel","stories","reels","groupes facebook","hashtags","influence"],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/wordsearch/sample-1.jpeg',
      primaryAlt: "Fiche imprimable social media printable marketing",
      secondary: '/samples/english/wordsearch/sample-2.jpeg',
      secondaryAlt: "Exemple de fiche social media printable marketing",
    },
    sampleGallery: [
      { src: '/samples/english/wordsearch/sample-1.jpeg', alt: "Exemple fiche wordsearch", caption: 'Exemple de qualité professionnelle' },
      { src: '/samples/english/wordsearch/sample-2.jpeg', alt: "Fiche avec corrigé wordsearch", caption: 'Corrigé automatique inclus' },
    ],
    youtubeId: '36keBFzJbPo',
    videoTitle: "Réseaux Sociaux pour Vendeurs d'Imprimables — Tutoriel",
  },

  hero: {
    title: "Réseaux Sociaux pour Vendeurs d'Imprimables",
    description: "Les réseaux sociaux complètent Pinterest pour générer du trafic et construire une communauté autour de votre marque d'imprimables.",
  },

  introduction: "Au-delà de Pinterest, d'autres réseaux sociaux offrent des opportunités pour les vendeurs d'imprimables. Instagram, Facebook et TikTok ont chacun leurs avantages.",

  tutorial: {
    title: "Étape par étape : Réseaux Sociaux pour Vendeurs d'Imprimables",
    steps: [
      {
        title: "Choisissez 1–2 réseaux",
        description: "Ne vous dispersez pas. Maîtrisez un réseau avant d'en ajouter.",
      },
      {
        title: "Créez du contenu de valeur",
        description: "Montrez vos produits en action, partagez des conseils éducatifs.",
      },
      {
        title: "Engagez avec votre communauté",
        description: "Répondez aux commentaires, rejoignez des groupes pertinents.",
      }
    ],
  },

  platformTips: [
    {
      platform: "Réseaux sociaux",
      title: "Stratégie sociale",
      description: "Instagram pour le visuel, Facebook pour les groupes, TikTok pour la viralité.",
    }
  ],

  monetization: [
    {
      title: "Trafic supplémentaire",
      description: "Chaque plateforme sociale est un canal de trafic gratuit.",
    }
  ],

  examples: "Les vendeurs actifs sur Instagram génèrent 10–20% de trafic supplémentaire vers Etsy.",

  faq: [
    {
      question: "Quel réseau choisir?",
      answer: "Pinterest reste le numéro un. Instagram est le deuxième meilleur pour les imprimables visuels.",
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
