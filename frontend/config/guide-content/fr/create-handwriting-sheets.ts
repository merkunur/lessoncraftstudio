import type { CreateXContent } from '../types';

export const content: CreateXContent = {
  guideId: "create-handwriting-sheets",
  locale: 'fr',

  seo: {
    titleTag: "Comment Créer des Fiches d'Écriture | Guide Gratuit",
    metaDescription: "Les fiches d'écriture guidée aident les enfants à former correctement les lettres dès le départ. Lignes pointillées, modèles et espaces de pratique pour l'",
    primaryKeyword: "créer fiches écriture imprimables",
    secondaryKeywords: ["fiches écriture maternelle","générateur écriture","fiches graphisme","pratique écriture PDF","écriture guidée imprimable"],
    lsiKeywords: ["écriture cursive","écriture script","lignes séyès","motricité fine","tracé lettres","calligraphie enfant","prégraphisme","formation lettres"],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/writing/sample-1.jpeg',
      primaryAlt: "Fiche imprimable create handwriting sheets",
      secondary: '/samples/english/writing/sample-2.jpeg',
      secondaryAlt: "Exemple de fiche create handwriting sheets",
    },
    sampleGallery: [
      { src: '/samples/english/writing/sample-1.jpeg', alt: "Exemple fiche writing", caption: 'Exemple de qualité professionnelle' },
      { src: '/samples/english/writing/sample-2.jpeg', alt: "Fiche avec corrigé writing", caption: 'Corrigé automatique inclus' },
    ],
    youtubeId: '36keBFzJbPo',
    videoTitle: "Comment Créer des Fiches d'Écriture — Tutoriel",
  },

  hero: {
    title: "Comment Créer des Fiches d'Écriture",
    description: "Les fiches d'écriture guidée aident les enfants à former correctement les lettres dès le départ. Lignes pointillées, modèles et espaces de pratique pour l'écriture script et cursive.",
  },

  introduction: "L'écriture manuscrite reste une compétence fondamentale. Nos fiches offrent des modèles guidés avec différentes tailles de lignes pour accompagner la progression de l'enfant.",

  tutorial: {
    title: "Étape par étape : Comment Créer des Fiches d'Écriture",
    steps: [
      {
        title: "Choisissez le type d'écriture",
        description: "Script (imprimé) ou cursive. Majuscules et/ou minuscules.",
      },
      {
        title: "Définissez le contenu",
        description: "Lettres individuelles, mots ou phrases à recopier.",
      },
      {
        title: "Configurez les lignes",
        description: "Taille des lignes adaptée au niveau : larges pour débutants, standard pour avancés.",
      },
      {
        title: "Générez le PDF",
        description: "Fiches prêtes à imprimer avec modèles et espaces de pratique.",
      }
    ],
  },

  platformTips: [
    {
      platform: "Etsy",
      title: "Vendre sur Etsy",
      description: "Les fiches d'écriture sont demandées toute l'année par les parents et enseignants.",
    }
  ],

  monetization: [
    {
      title: "Cahier d'écriture complet",
      description: "Programme progressif de l'alphabet aux phrases complètes.",
    }
  ],

  examples: "Les cahiers d'écriture sont particulièrement populaires sur Amazon KDP France où la demande est forte.",

  faq: [
    {
      question: "Cursive ou script ?",
      answer: "En France, la cursive est enseignée dès le CP. Le script est utilisé en maternelle pour la découverte.",
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
    { slug: "writing", pageType: "app", anchorText: "Générateur de Fiches d'Écriture" }
  ],
};
