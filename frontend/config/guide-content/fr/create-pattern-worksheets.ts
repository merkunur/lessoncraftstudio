import type { CreateXContent } from '../types';

export const content: CreateXContent = {
  guideId: "create-pattern-worksheets",
  locale: 'fr',

  seo: {
    titleTag: "Comment Créer des Fiches de Motifs | Guide Gratuit",
    metaDescription: "Les fiches de motifs développent le raisonnement logique et la pensée pré-algébrique. Les enfants identifient et prolongent des séquences d'images thématiq",
    primaryKeyword: "créer fiches motifs imprimables",
    secondaryKeywords: ["fiches suites logiques","générateur motifs","pattern worksheet français","fiches séquences","reconnaissance motifs enfants"],
    lsiKeywords: ["séquence","répétition","prolongement","raisonnement logique","pré-maths","pensée algébrique","structures","régularités"],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/pattern-worksheet/sample-1.jpeg',
      primaryAlt: "Fiche imprimable create pattern worksheets",
      secondary: '/samples/english/pattern-worksheet/sample-2.jpeg',
      secondaryAlt: "Exemple de fiche create pattern worksheets",
    },
    sampleGallery: [
      { src: '/samples/english/pattern-worksheet/sample-1.jpeg', alt: "Exemple fiche pattern-worksheet", caption: 'Exemple de qualité professionnelle' },
      { src: '/samples/english/pattern-worksheet/sample-2.jpeg', alt: "Fiche avec corrigé pattern-worksheet", caption: 'Corrigé automatique inclus' },
    ],
    youtubeId: '36keBFzJbPo',
    videoTitle: "Comment Créer des Fiches de Motifs — Tutoriel",
  },

  hero: {
    title: "Comment Créer des Fiches de Motifs",
    description: "Les fiches de motifs développent le raisonnement logique et la pensée pré-algébrique. Les enfants identifient et prolongent des séquences d'images thématiques.",
  },

  introduction: "La reconnaissance de motifs est une compétence fondamentale qui sous-tend les mathématiques, la lecture et la science. Nos fiches utilisent des images colorées pour rendre cet apprentissage concret.",

  tutorial: {
    title: "Étape par étape : Comment Créer des Fiches de Motifs",
    steps: [
      {
        title: "Choisissez le type de motif",
        description: "AB, ABC, AABB ou motifs complexes.",
      },
      {
        title: "Sélectionnez les thèmes",
        description: "Les images thématiques forment les éléments des séquences.",
      },
      {
        title: "Générez le PDF",
        description: "Fiches avec séquences à compléter et corrigé.",
      }
    ],
  },

  platformTips: [
    {
      platform: "Etsy",
      title: "Vendre sur Etsy",
      description: "Les fiches de logique sont très recherchées par les parents de maternelle.",
    }
  ],

  monetization: [
    {
      title: "Pack logique maternelle",
      description: "Motifs + tri + suites pour un pack raisonnement complet.",
    }
  ],

  examples: "Les fiches de motifs sont utilisées quotidiennement dans les classes de maternelle pour la routine mathématique.",

  faq: [
    {
      question: "Quels types de motifs ?",
      answer: "Du simple (AB) au complexe (ABBC, AABB). Chaque fiche est unique.",
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
    { slug: "pattern-worksheet", pageType: "app", anchorText: "Générateur de Motifs" }
  ],
};
