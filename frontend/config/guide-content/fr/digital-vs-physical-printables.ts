import type { CreateXContent } from '../types';

export const content: CreateXContent = {
  guideId: "digital-vs-physical-printables",
  locale: 'fr',

  seo: {
    titleTag: "Imprimables Numériques vs Physiques | Guide Gratuit",
    metaDescription: "Devez-vous vendre des téléchargements numériques sur Etsy ou des livres imprimés sur KDP ? Ce guide compare les deux modèles et vous aide à choisir (ou com",
    primaryKeyword: "imprimables numériques vs physiques",
    secondaryKeywords: ["téléchargement vs impression","etsy vs kdp imprimables","digital download vs POD","comparaison canaux vente","format imprimable optimal"],
    lsiKeywords: ["print on demand","téléchargement instantané","marge bénéficiaire","expérience client","logistique","scaling","avantages inconvénients","modèle hybride"],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/wordsearch/sample-1.jpeg',
      primaryAlt: "Fiche imprimable digital vs physical printables",
      secondary: '/samples/english/wordsearch/sample-2.jpeg',
      secondaryAlt: "Exemple de fiche digital vs physical printables",
    },
    sampleGallery: [
      { src: '/samples/english/wordsearch/sample-1.jpeg', alt: "Exemple fiche wordsearch", caption: 'Exemple de qualité professionnelle' },
      { src: '/samples/english/wordsearch/sample-2.jpeg', alt: "Fiche avec corrigé wordsearch", caption: 'Corrigé automatique inclus' },
    ],
    youtubeId: '36keBFzJbPo',
    videoTitle: "Imprimables Numériques vs Physiques — Tutoriel",
  },

  hero: {
    title: "Imprimables Numériques vs Physiques",
    description: "Devez-vous vendre des téléchargements numériques sur Etsy ou des livres imprimés sur KDP ? Ce guide compare les deux modèles et vous aide à choisir (ou combiner) le meilleur.",
  },

  introduction: "Le marché des imprimables offre deux modèles distincts : le numérique (Etsy) et le physique (KDP). Chacun a ses avantages. Les vendeurs avisés utilisent les deux.",

  tutorial: {
    title: "Étape par étape : Imprimables Numériques vs Physiques",
    steps: [
      {
        title: "Évaluez vos objectifs",
        description: "Volume rapide = numérique. Revenus passifs long terme = KDP. Idéalement les deux.",
      },
      {
        title: "Commencez par un canal",
        description: "Maîtrisez Etsy ou KDP avant d'ajouter l'autre.",
      },
      {
        title: "Adaptez vos produits",
        description: "Un même contenu peut être vendu en numérique ET en physique.",
      }
    ],
  },

  platformTips: [
    {
      platform: "Multi-plateforme",
      title: "Stratégie double canal",
      description: "Etsy pour le numérique instantané, KDP pour les livres imprimés.",
    }
  ],

  monetization: [
    {
      title: "Modèle hybride",
      description: "Même contenu, deux formats, deux sources de revenus.",
    }
  ],

  examples: "Les vendeurs hybrides gagnent en moyenne 40% de plus que ceux sur un seul canal.",

  faq: [
    {
      question: "Quel canal est le plus rentable ?",
      answer: "Etsy offre de meilleures marges (70–90%). KDP offre plus de volume et de passivité (30–50% mais aucune logistique).",
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
