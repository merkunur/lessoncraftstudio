import type { CreateXContent } from '../types';

export const content: CreateXContent = {
  guideId: "worksheets-multiple-languages",
  locale: 'fr',

  seo: {
    titleTag: "Fiches dans Plusieurs Langues | Guide Gratuit",
    metaDescription: "Nos 33 générateurs supportent 11 langues nativement. Ce guide montre comment exploiter cette capacité pour créer et vendre du matériel multilingue.",
    primaryKeyword: "fiches plusieurs langues imprimables",
    secondaryKeywords: ["worksheets multilingues","fiches langues étrangères","imprimables multi-langues","fiches FLE","matériel éducatif langues"],
    lsiKeywords: ["FLE","apprentissage langues","bilingue","immersion","vocabulaire","localisation","traduction automatique","marché international"],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/wordsearch/sample-1.jpeg',
      primaryAlt: "Fiche imprimable worksheets multiple languages",
      secondary: '/samples/english/wordsearch/sample-2.jpeg',
      secondaryAlt: "Exemple de fiche worksheets multiple languages",
    },
    sampleGallery: [
      { src: '/samples/english/wordsearch/sample-1.jpeg', alt: "Exemple fiche wordsearch", caption: 'Exemple de qualité professionnelle' },
      { src: '/samples/english/wordsearch/sample-2.jpeg', alt: "Fiche avec corrigé wordsearch", caption: 'Corrigé automatique inclus' },
    ],
    youtubeId: '36keBFzJbPo',
    videoTitle: "Fiches dans Plusieurs Langues — Tutoriel",
  },

  hero: {
    title: "Fiches dans Plusieurs Langues",
    description: "Nos 33 générateurs supportent 11 langues nativement. Ce guide montre comment exploiter cette capacité pour créer et vendre du matériel multilingue.",
  },

  introduction: "Les fiches multilingues servent deux marchés : l'enseignement des langues (FLE, FLS) et la vente internationale. Les deux sont lucratifs et sous-exploités.",

  tutorial: {
    title: "Étape par étape : Fiches dans Plusieurs Langues",
    steps: [
      {
        title: "Identifiez votre marché",
        description: "FLE/FLS pour l'enseignement. Vente internationale pour le business.",
      },
      {
        title: "Générez dans la langue cible",
        description: "Changez simplement la langue dans le générateur.",
      },
      {
        title: "Adaptez le marketing",
        description: "Listings dans la langue de l'acheteur pour maximiser la conversion.",
      }
    ],
  },

  platformTips: [
    {
      platform: "Multi-plateforme",
      title: "Stratégie multilingue",
      description: "Chaque marché linguistique a ses propres plateformes préférées.",
    }
  ],

  monetization: [
    {
      title: "Marché FLE",
      description: "Le matériel FLE est très demandé sur TPT et Etsy.",
    }
  ],

  examples: "Les fiches de vocabulaire FLE avec images se vendent particulièrement bien sur TPT.",

  faq: [
    {
      question: "Les générateurs traduisent-ils le contenu?",
      answer: "Oui, le vocabulaire intégré est disponible nativement dans les 11 langues supportées.",
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
