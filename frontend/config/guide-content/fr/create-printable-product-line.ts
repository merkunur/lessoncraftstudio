import type { CreateXContent } from '../types';

export const content: CreateXContent = {
  guideId: "create-printable-product-line",
  locale: 'fr',

  seo: {
    titleTag: "Comment Créer une Gamme de Produits Imprimables | Guide Gratuit",
    metaDescription: "Une gamme de produits cohérente génère plus de revenus que des produits isolés. Apprenez à construire un catalogue structuré qui encourage les achats multi",
    primaryKeyword: "créer gamme produits imprimables",
    secondaryKeywords: ["ligne de produits fiches","catalogue imprimables","gamme worksheets","collection imprimables éducatifs","portfolio produits fiches"],
    lsiKeywords: ["catalogue produits","cohérence marque","expansion gamme","complémentarité","cross-selling","fidélisation","identité visuelle","progression"],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/addition/sample-1.jpeg',
      primaryAlt: "Fiche imprimable create printable product line",
      secondary: '/samples/english/addition/sample-2.jpeg',
      secondaryAlt: "Exemple de fiche create printable product line",
    },
    sampleGallery: [
      { src: '/samples/english/addition/sample-1.jpeg', alt: "Exemple fiche addition", caption: 'Exemple de qualité professionnelle' },
      { src: '/samples/english/addition/sample-2.jpeg', alt: "Fiche avec corrigé addition", caption: 'Corrigé automatique inclus' },
    ],
    youtubeId: '36keBFzJbPo',
    videoTitle: "Comment Créer une Gamme de Produits Imprimables — Tutoriel",
  },

  hero: {
    title: "Comment Créer une Gamme de Produits Imprimables",
    description: "Une gamme de produits cohérente génère plus de revenus que des produits isolés. Apprenez à construire un catalogue structuré qui encourage les achats multiples.",
  },

  introduction: "Les vendeurs qui réussissent ne vendent pas des fiches individuelles — ils vendent des gammes. Une gamme cohérente encourage les achats répétés et le cross-selling.",

  tutorial: {
    title: "Étape par étape : Comment Créer une Gamme de Produits Imprimables",
    steps: [
      {
        title: "Définissez votre niche",
        description: "Choisissez une intersection âge + compétence + thème.",
      },
      {
        title: "Créez 5 produits fondateurs",
        description: "Couvrez les besoins de base de votre audience cible.",
      },
      {
        title: "Expandez méthodiquement",
        description: "Ajoutez des niveaux, thèmes et formats chaque mois.",
      }
    ],
  },

  platformTips: [
    {
      platform: "Etsy",
      title: "Boutique Etsy cohérente",
      description: "Un branding uniforme et une spécialisation renforcent la confiance.",
    }
  ],

  monetization: [
    {
      title: "Système de compléments",
      description: "Chaque produit recommande d'autres produits de votre gamme.",
    }
  ],

  examples: "Les boutiques spécialisées outperforment systématiquement les boutiques généralistes sur Etsy.",

  faq: [
    {
      question: "Combien de produits pour démarrer ?",
      answer: "5–10 produits suffisent pour lancer. Visez 50+ en 6 mois.",
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
    { slug: "addition", pageType: "app", anchorText: "Générateur d'Addition" }
  ],
};
