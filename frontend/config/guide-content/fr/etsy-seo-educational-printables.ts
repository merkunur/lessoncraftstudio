import type { CreateXContent } from '../types';

export const content: CreateXContent = {
  guideId: "etsy-seo-educational-printables",
  locale: 'fr',

  seo: {
    titleTag: "SEO Etsy pour Imprimables Éducatifs | Guide Gratuit",
    metaDescription: "Le SEO Etsy détermine si vos produits sont vus par des acheteurs. Maîtrisez les 13 tags, l'optimisation des titres et les stratégies de ranking spécifiques",
    primaryKeyword: "SEO etsy imprimables éducatifs",
    secondaryKeywords: ["optimisation etsy fiches","tags etsy éducation","mots-clés etsy worksheets","ranking etsy imprimables","référencement etsy fiches"],
    lsiKeywords: ["algorithme etsy","search ranking","tags optimisés","titre SEO","description optimisée","long-tail keywords","pertinence","freshness"],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/wordsearch/sample-1.jpeg',
      primaryAlt: "Fiche imprimable etsy seo educational printables",
      secondary: '/samples/english/wordsearch/sample-2.jpeg',
      secondaryAlt: "Exemple de fiche etsy seo educational printables",
    },
    sampleGallery: [
      { src: '/samples/english/wordsearch/sample-1.jpeg', alt: "Exemple fiche wordsearch", caption: 'Exemple de qualité professionnelle' },
      { src: '/samples/english/wordsearch/sample-2.jpeg', alt: "Fiche avec corrigé wordsearch", caption: 'Corrigé automatique inclus' },
    ],
    youtubeId: '36keBFzJbPo',
    videoTitle: "SEO Etsy pour Imprimables Éducatifs — Tutoriel",
  },

  hero: {
    title: "SEO Etsy pour Imprimables Éducatifs",
    description: "Le SEO Etsy détermine si vos produits sont vus par des acheteurs. Maîtrisez les 13 tags, l'optimisation des titres et les stratégies de ranking spécifiques aux imprimables.",
  },

  introduction: "75% des ventes Etsy viennent de la recherche interne. Si vos produits n'apparaissent pas dans les résultats, ils ne se vendront pas. Ce guide détaille les techniques SEO Etsy.",

  tutorial: {
    title: "Étape par étape : SEO Etsy pour Imprimables Éducatifs",
    steps: [
      {
        title: "Recherchez vos mots-clés",
        description: "Utilisez la barre de recherche Etsy pour identifier les termes populaires.",
      },
      {
        title: "Optimisez titres et tags",
        description: "Mot-clé principal dans les 65 premiers caractères du titre.",
      },
      {
        title: "Testez et itérez",
        description: "Changez les tags tous les 2–3 mois pour tester de nouvelles combinaisons.",
      }
    ],
  },

  platformTips: [
    {
      platform: "Etsy",
      title: "Stratégie SEO Etsy",
      description: "Les 13 tags sont votre outil principal de visibilité.",
    }
  ],

  monetization: [
    {
      title: "Trafic organique",
      description: "Le SEO génère des ventes gratuites et récurrentes.",
    }
  ],

  examples: "Un changement de titre optimisé peut doubler les vues en 2 semaines.",

  faq: [
    {
      question: "Les tags en français marchent-ils ?",
      answer: "Oui. Etsy gère le français et cible automatiquement les acheteurs francophones.",
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
