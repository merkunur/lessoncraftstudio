import type { CreateXContent } from '../types';

export const content: CreateXContent = {
  guideId: "create-etsy-worksheet-bundles",
  locale: 'fr',

  seo: {
    titleTag: "Comment Créer des Bundles de Fiches pour Etsy | Guide Gratuit",
    metaDescription: "Les bundles commandent des prix 3–5x supérieurs aux fiches individuelles. Apprenez à créer des bundles stratégiques qui maximisent la valeur perçue et les ",
    primaryKeyword: "créer bundles fiches etsy",
    secondaryKeywords: ["bundle worksheets etsy","pack fiches éducatif","regrouper fiches vente","strategy bundle etsy","mega pack fiches"],
    lsiKeywords: ["bundle pricing","valeur perçue","cross-selling","upselling","pack thématique","offre groupée","listing bundle","conversion bundle"],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/wordsearch/sample-1.jpeg',
      primaryAlt: "Fiche imprimable create etsy worksheet bundles",
      secondary: '/samples/english/wordsearch/sample-2.jpeg',
      secondaryAlt: "Exemple de fiche create etsy worksheet bundles",
    },
    sampleGallery: [
      { src: '/samples/english/wordsearch/sample-1.jpeg', alt: "Exemple fiche wordsearch", caption: 'Exemple de qualité professionnelle' },
      { src: '/samples/english/wordsearch/sample-2.jpeg', alt: "Fiche avec corrigé wordsearch", caption: 'Corrigé automatique inclus' },
    ],
    youtubeId: '36keBFzJbPo',
    videoTitle: "Comment Créer des Bundles de Fiches pour Etsy — Tutoriel",
  },

  hero: {
    title: "Comment Créer des Bundles de Fiches pour Etsy",
    description: "Les bundles commandent des prix 3–5x supérieurs aux fiches individuelles. Apprenez à créer des bundles stratégiques qui maximisent la valeur perçue et les revenus.",
  },

  introduction: "Le bundling est la stratégie de vente la plus efficace pour les imprimables. Un pack de 50 fiches à 12,99€ se vend mieux qu'un pack de 10 à 4,99€ car la valeur perçue est bien supérieure.",

  tutorial: {
    title: "Étape par étape : Comment Créer des Bundles de Fiches pour Etsy",
    steps: [
      {
        title: "Sélectionnez un thème unificateur",
        description: "Thème saisonnier, niveau scolaire ou compétence spécifique.",
      },
      {
        title: "Générez 30–50 fiches variées",
        description: "Mix de formats : fiches, puzzles, coloriages autour du thème.",
      },
      {
        title: "Créez un listing attractif",
        description: "Montrez la valeur totale et le nombre de pages dans le titre.",
      }
    ],
  },

  platformTips: [
    {
      platform: "Etsy",
      title: "Bundles Etsy",
      description: "Packs 30–50 pages à 9,99–14,99€. Mega-bundles 100+ pages à 19,99–29,99€.",
    }
  ],

  monetization: [
    {
      title: "Tiered bundles",
      description: "Petit pack, pack complet et mega-bundle au même thème.",
    }
  ],

  examples: "Les mega-bundles sont la source de revenus numéro un des top vendeurs Etsy d'imprimables.",

  faq: [
    {
      question: "Combien de fiches par bundle ?",
      answer: "Minimum 20 pour un bundle basique, 50+ pour un mega-bundle.",
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
    { slug: "wordsearch", pageType: "app", anchorText: "Générateur Mots Mêlés" }
  ],
};
