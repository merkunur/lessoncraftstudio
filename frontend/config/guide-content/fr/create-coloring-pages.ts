import type { CreateXContent } from '../types';

export const content: CreateXContent = {
  guideId: "create-coloring-pages",
  locale: 'fr',

  seo: {
    titleTag: "Comment Créer des Pages de Coloriage | Guide Gratuit",
    metaDescription: "Les pages de coloriage sont le produit imprimable le plus vendu en volume. Créez des coloriages thématiques à partir de 104 thèmes illustrés. Chaque page e",
    primaryKeyword: "créer pages coloriage imprimables",
    secondaryKeywords: ["générateur coloriage","coloriages thématiques PDF","pages coloriage enfants","coloriage éducatif","fiches coloriage imprimables"],
    lsiKeywords: ["coloriage à imprimer","motricité fine","créativité","coloriage animaux","coloriage thème","cahier coloriage","coloriage maternelle","illustrations enfants"],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/coloring/sample-1.jpeg',
      primaryAlt: "Fiche imprimable create coloring pages",
      secondary: '/samples/english/coloring/sample-2.jpeg',
      secondaryAlt: "Exemple de fiche create coloring pages",
    },
    sampleGallery: [
      { src: '/samples/english/coloring/sample-1.jpeg', alt: "Exemple fiche coloring", caption: 'Exemple de qualité professionnelle' },
      { src: '/samples/english/coloring/sample-2.jpeg', alt: "Fiche avec corrigé coloring", caption: 'Corrigé automatique inclus' },
    ],
    youtubeId: '36keBFzJbPo',
    videoTitle: "Comment Créer des Pages de Coloriage — Tutoriel",
  },

  hero: {
    title: "Comment Créer des Pages de Coloriage",
    description: "Les pages de coloriage sont le produit imprimable le plus vendu en volume. Créez des coloriages thématiques à partir de 104 thèmes illustrés. Chaque page est unique et prête à imprimer ou à publier sur KDP.",
  },

  introduction: "Le coloriage développe la motricité fine, la concentration et la créativité. C'est aussi la catégorie imprimable la plus populaire sur Amazon KDP, avec des millions de cahiers vendus chaque année.",

  tutorial: {
    title: "Étape par étape : Comment Créer des Pages de Coloriage",
    steps: [
      {
        title: "Sélectionnez un thème",
        description: "104 thèmes : animaux, véhicules, saisons, fêtes et plus.",
      },
      {
        title: "Configurez le style",
        description: "Contours épais pour petits, détails fins pour plus grands.",
      },
      {
        title: "Générez les pages",
        description: "Chaque page est unique avec des compositions variées.",
      }
    ],
  },

  platformTips: [
    {
      platform: "Etsy",
      title: "Coloriages Etsy",
      description: "Achat impulsif parfait — petit prix, fort volume.",
    },
    {
      platform: "Amazon KDP",
      title: "Cahiers coloriage KDP",
      description: "Catégorie à plus fort volume sur KDP. Prix 5,99–8,99€ pour 50+ pages.",
    }
  ],

  monetization: [
    {
      title: "Cahiers thématiques",
      description: "50–100 pages par thème. Animaux, dinosaures et licornes sont les best-sellers.",
    },
    {
      title: "Collections saisonnières",
      description: "Noël, Halloween et été pour capitaliser sur les pics saisonniers.",
    }
  ],

  examples: "Les cahiers de coloriage animaux se vendent en moyenne 3–5 exemplaires par jour sur KDP une fois bien positionnés.",

  faq: [
    {
      question: "Quel format pour KDP ?",
      answer: "8,5×11 pouces, 50–100 pages, une illustration par page.",
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
