import type { CreateXContent } from '../types';

export const content: CreateXContent = {
  guideId: "create-etsy-coloring-pages",
  locale: 'fr',

  seo: {
    titleTag: "Comment Vendre des Coloriages sur Etsy | Guide Gratuit",
    metaDescription: "Les pages de coloriage sont le produit imprimable le plus vendu sur Etsy par volume. Ce guide spécifique vous montre comment optimiser vos listings de colo",
    primaryKeyword: "vendre coloriages etsy",
    secondaryKeywords: ["coloriages etsy vente","business coloriage imprimable","listing coloriages etsy","boutique coloriage etsy","coloriages numériques etsy"],
    lsiKeywords: ["mockups coloriage","tags etsy coloriage","prix coloriage","niche coloriage","listing optimisé","photos produit","conversion","SEO coloriage"],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/coloring/sample-1.jpeg',
      primaryAlt: "Fiche imprimable create etsy coloring pages",
      secondary: '/samples/english/coloring/sample-2.jpeg',
      secondaryAlt: "Exemple de fiche create etsy coloring pages",
    },
    sampleGallery: [
      { src: '/samples/english/coloring/sample-1.jpeg', alt: "Exemple fiche coloring", caption: 'Exemple de qualité professionnelle' },
      { src: '/samples/english/coloring/sample-2.jpeg', alt: "Fiche avec corrigé coloring", caption: 'Corrigé automatique inclus' },
    ],
    youtubeId: '36keBFzJbPo',
    videoTitle: "Comment Vendre des Coloriages sur Etsy — Tutoriel",
  },

  hero: {
    title: "Comment Vendre des Coloriages sur Etsy",
    description: "Les pages de coloriage sont le produit imprimable le plus vendu sur Etsy par volume. Ce guide spécifique vous montre comment optimiser vos listings de coloriage pour maximiser les ventes.",
  },

  introduction: "Les coloriages représentent la catégorie imprimable la plus accessible : faible prix, achat impulsif, forte demande. Apprenez à transformer ce volume en revenus réguliers.",

  tutorial: {
    title: "Étape par étape : Comment Vendre des Coloriages sur Etsy",
    steps: [
      {
        title: "Créez 50+ coloriages uniques",
        description: "Utilisez le générateur pour produire des coloriages variés par thème.",
      },
      {
        title: "Créez des mockups professionnels",
        description: "Montrez les coloriages en contexte avec crayons de couleur.",
      },
      {
        title: "Rédigez des annonces optimisées",
        description: "Tags : 'coloriage animaux', 'coloriage enfant', 'pages à colorier'.",
      }
    ],
  },

  platformTips: [
    {
      platform: "Etsy",
      title: "Stratégie Etsy coloriage",
      description: "Petit prix (2,99–4,99€), fort volume. Visez 50+ listings.",
    }
  ],

  monetization: [
    {
      title: "Mega-bundle coloriage",
      description: "100+ pages à 14,99€. La valeur perçue est énorme.",
    }
  ],

  examples: "Les vendeurs spécialisés en coloriage atteignent facilement 100+ ventes par mois avec 30 listings.",

  faq: [
    {
      question: "Quel prix pour les coloriages ?",
      answer: "2,99–4,99€ pour 10–20 pages. 9,99–14,99€ pour 50–100+ pages.",
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
    { slug: "coloring", pageType: "app", anchorText: "Générateur de Coloriages" }
  ],
};
