import type { CreateXContent } from '../types';

export const content: CreateXContent = {
  guideId: "seasonal-marketing-printables",
  locale: 'fr',

  seo: {
    titleTag: "Marketing Saisonnier pour Imprimables | Guide Gratuit",
    metaDescription: "Les pics saisonniers peuvent tripler vos revenus mensuels. Ce guide détaille le calendrier saisonnier et les stratégies pour chaque période.",
    primaryKeyword: "marketing saisonnier imprimables",
    secondaryKeywords: ["fiches saisonnières","vente saisonnière worksheets","calendrier marketing fiches","imprimables fêtes","stratégie saisonnière etsy"],
    lsiKeywords: ["Noël","Halloween","rentrée","été","printemps","Pâques","Saint-Valentin","vacances"],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/wordsearch/sample-1.jpeg',
      primaryAlt: "Fiche imprimable seasonal marketing printables",
      secondary: '/samples/english/wordsearch/sample-2.jpeg',
      secondaryAlt: "Exemple de fiche seasonal marketing printables",
    },
    sampleGallery: [
      { src: '/samples/english/wordsearch/sample-1.jpeg', alt: "Exemple fiche wordsearch", caption: 'Exemple de qualité professionnelle' },
      { src: '/samples/english/wordsearch/sample-2.jpeg', alt: "Fiche avec corrigé wordsearch", caption: 'Corrigé automatique inclus' },
    ],
    youtubeId: '36keBFzJbPo',
    videoTitle: "Marketing Saisonnier pour Imprimables — Tutoriel",
  },

  hero: {
    title: "Marketing Saisonnier pour Imprimables",
    description: "Les pics saisonniers peuvent tripler vos revenus mensuels. Ce guide détaille le calendrier saisonnier et les stratégies pour chaque période.",
  },

  introduction: "La demande d'imprimables suit un calendrier prévisible. Les vendeurs qui anticipent les saisons capturent des ventes que les autres manquent.",

  tutorial: {
    title: "Étape par étape : Marketing Saisonnier pour Imprimables",
    steps: [
      {
        title: "Créez un calendrier annuel",
        description: "Planifiez vos produits saisonniers 2–3 mois à l'avance.",
      },
      {
        title: "Préparez les produits en avance",
        description: "Publiez les produits Halloween en septembre, Noël en octobre.",
      },
      {
        title: "Recyclez chaque année",
        description: "Les mêmes produits saisonniers se revendent d'une année sur l'autre.",
      }
    ],
  },

  platformTips: [
    {
      platform: "Etsy",
      title: "Saisonnalité Etsy",
      description: "Etsy booste les produits saisonniers dans les résultats de recherche.",
    }
  ],

  monetization: [
    {
      title: "Pic de revenus",
      description: "Noël et rentrée peuvent représenter 40% de vos revenus annuels.",
    }
  ],

  examples: "Les vendeurs avec 5+ produits saisonniers voient leurs revenus doubler en période de fêtes.",

  faq: [
    {
      question: "Quand publier les produits saisonniers?",
      answer: "2–3 mois avant la saison. Septembre pour Halloween, octobre pour Noël.",
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
