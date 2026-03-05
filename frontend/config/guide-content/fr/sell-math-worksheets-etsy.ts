import type { CreateXContent } from '../types';

export const content: CreateXContent = {
  guideId: "sell-math-worksheets-etsy",
  locale: 'fr',

  seo: {
    titleTag: "Vendre des Fiches de Maths sur Etsy | Guide Gratuit",
    metaDescription: "Les fiches de maths sont la catégorie éducative la plus demandée sur Etsy. Ce guide spécifique couvre la stratégie pour dominer cette niche.",
    primaryKeyword: "vendre fiches maths etsy",
    secondaryKeywords: ["fiches mathématiques etsy","business maths worksheets","vendre worksheets maths","boutique etsy maths","fiches calcul etsy"],
    lsiKeywords: ["addition","soustraction","comptage","puzzles maths","niveaux scolaires","pack maths","bundle mathématique","différenciation"],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/addition/sample-1.jpeg',
      primaryAlt: "Fiche imprimable sell math worksheets etsy",
      secondary: '/samples/english/addition/sample-2.jpeg',
      secondaryAlt: "Exemple de fiche sell math worksheets etsy",
    },
    sampleGallery: [
      { src: '/samples/english/addition/sample-1.jpeg', alt: "Exemple fiche addition", caption: 'Exemple de qualité professionnelle' },
      { src: '/samples/english/addition/sample-2.jpeg', alt: "Fiche avec corrigé addition", caption: 'Corrigé automatique inclus' },
    ],
    youtubeId: '36keBFzJbPo',
    videoTitle: "Vendre des Fiches de Maths sur Etsy — Tutoriel",
  },

  hero: {
    title: "Vendre des Fiches de Maths sur Etsy",
    description: "Les fiches de maths sont la catégorie éducative la plus demandée sur Etsy. Ce guide spécifique couvre la stratégie pour dominer cette niche.",
  },

  introduction: "Les maths sont le pilier du marché des imprimables éducatifs. La demande est constante, les acheteurs sont récurrents et les opportunités sont vastes.",

  tutorial: {
    title: "Étape par étape : Vendre des Fiches de Maths sur Etsy",
    steps: [
      {
        title: "Ciblez un niveau scolaire",
        description: "Maternelle, CP ou CE1 pour commencer.",
      },
      {
        title: "Créez des packs thématiques",
        description: "Addition animaux, soustraction véhicules, etc.",
      },
      {
        title: "Offrez des bundles multi-opérations",
        description: "Les parents préfèrent les packs complets.",
      }
    ],
  },

  platformTips: [
    {
      platform: "Etsy",
      title: "Maths Etsy",
      description: "'Fiches maths maternelle', 'exercices addition CP' — des mots-clés à fort volume.",
    }
  ],

  monetization: [
    {
      title: "Gamme complète maths",
      description: "Un produit par opération par niveau = catalogue vaste.",
    }
  ],

  examples: "Les fiches de maths thématiques se vendent 30% mieux que les fiches génériques.",

  faq: [
    {
      question: "Quelle opération se vend le mieux?",
      answer: "L'addition est la plus demandée, suivie de la soustraction et des opérations mixtes.",
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
    { slug: "addition", pageType: "app", anchorText: "Générateur Addition" }
  ],
};
