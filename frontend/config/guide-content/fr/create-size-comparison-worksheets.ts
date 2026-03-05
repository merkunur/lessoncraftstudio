import type { CreateXContent } from '../types';

export const content: CreateXContent = {
  guideId: "create-size-comparison-worksheets",
  locale: 'fr',

  seo: {
    titleTag: "Comment Créer des Fiches de Comparaison de Tailles | Guide Gratuit",
    metaDescription: "Les fiches de comparaison de tailles enseignent les concepts de grand/petit, plus grand/plus petit avec des images thématiques colorées. Compétence pré-mat",
    primaryKeyword: "créer fiches comparaison tailles",
    secondaryKeywords: ["fiches grand petit","big small worksheet français","comparaison taille maternelle","fiches mesures enfants","plus grand plus petit imprimable"],
    lsiKeywords: ["grand petit","plus grand que","mesure","taille","comparaison","ordre croissant","rangement","perception tailles"],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/big-small/sample-1.jpeg',
      primaryAlt: "Fiche imprimable create size comparison worksheets",
      secondary: '/samples/english/big-small/sample-2.jpeg',
      secondaryAlt: "Exemple de fiche create size comparison worksheets",
    },
    sampleGallery: [
      { src: '/samples/english/big-small/sample-1.jpeg', alt: "Exemple fiche big-small", caption: 'Exemple de qualité professionnelle' },
      { src: '/samples/english/big-small/sample-2.jpeg', alt: "Fiche avec corrigé big-small", caption: 'Corrigé automatique inclus' },
    ],
    youtubeId: '36keBFzJbPo',
    videoTitle: "Comment Créer des Fiches de Comparaison de Tailles — Tutoriel",
  },

  hero: {
    title: "Comment Créer des Fiches de Comparaison de Tailles",
    description: "Les fiches de comparaison de tailles enseignent les concepts de grand/petit, plus grand/plus petit avec des images thématiques colorées. Compétence pré-mathématique essentielle.",
  },

  introduction: "Comparer les tailles est une compétence fondamentale pour les mathématiques. Les enfants apprennent à observer, comparer et ordonner des objets, jetant les bases des concepts de mesure.",

  tutorial: {
    title: "Étape par étape : Comment Créer des Fiches de Comparaison de Tailles",
    steps: [
      {
        title: "Sélectionnez un thème",
        description: "Animaux, objets du quotidien, véhicules — 104 thèmes.",
      },
      {
        title: "Choisissez le type d'exercice",
        description: "Entourer le plus grand, ranger du plus petit au plus grand, comparer deux images.",
      },
      {
        title: "Générez le PDF",
        description: "Fiches avec instructions claires et corrigé inclus.",
      }
    ],
  },

  platformTips: [
    {
      platform: "Etsy",
      title: "Vendre sur Etsy",
      description: "Complément parfait aux packs maternelle.",
    }
  ],

  monetization: [
    {
      title: "Pack pré-maths complet",
      description: "Tailles + comptage + motifs pour un pack maternelle.",
    }
  ],

  examples: "Les fiches grand/petit sont un classique de la petite section. Très demandées par les parents d'enfants de 3–4 ans.",

  faq: [
    {
      question: "Dès quel âge ?",
      answer: "Dès 2–3 ans. C'est l'un des premiers concepts mathématiques.",
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
    { slug: "big-small", pageType: "app", anchorText: "Générateur Grand et Petit" }
  ],
};
