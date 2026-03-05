import type { CornerstoneContent } from '../types';

export const content: CornerstoneContent = {
  guideId: "printable-business-legal",
  locale: 'fr',

  seo: {
    titleTag: "Aspects Légaux de Votre Business d’Imprimables",
    metaDescription: "Les aspects juridiques d'un business d'imprimables sont plus simples qu'on ne le croit, mais il est essentiel de les comprendre. Ce guide couvre les droits d'auteur, les licences d'utilisation, la fiscalité des ventes numériques et les obligations légales.",
    primaryKeyword: "aspects légaux business imprimables",
    secondaryKeywords: ["droit auteur imprimables","fiscalité vente fiches","légalité vente worksheets","conformité vendeur etsy","règles juridiques imprimables"],
    lsiKeywords: ["droits auteur","propriété intellectuelle","TVA numérique","statut auto-entrepreneur","conditions générales","protection juridique","conformité RGPD","facturation"],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/wordsearch/Word Search 1.jpeg',
      primaryAlt: "Fiche imprimable professionnelle pour business printable business legal",
      secondary: '/samples/english/wordsearch/Word Search 2.jpeg',
      secondaryAlt: "Exemple de fiche commerciale de qualité professionnelle",
    },
    sampleGallery: [
      { src: '/samples/english/wordsearch/Word Search 3.jpeg', alt: 'Fiche thématique de qualité commerciale', caption: 'Qualité commerciale' },
      { src: '/samples/english/wordsearch/Word Search 4.jpeg', alt: 'Fiche avec corrigé automatique', caption: 'Corrigés inclus' },
      { src: '/samples/english/wordsearch/Word Search 5.jpeg', alt: 'Fiche format KDP prête à publier', caption: 'Format KDP' },
      { src: '/samples/english/wordsearch/Word Search 6.jpeg', alt: 'Fiche avec niveaux de difficulté', caption: 'Niveaux de difficulté' },
    ],
    youtubeId: '36keBFzJbPo',
    videoTitle: "Aspects Légaux de Votre Business d’Imprimables — Tutoriel Complet",
  },

  hero: {
    title: "Aspects Légaux de Votre Business d’Imprimables",
    subtitle: "Licences, droits d’auteur, fiscalité et conformité pour les vendeurs d’imprimables",
    readingTime: "9 min de lecture",
    description: "Les aspects juridiques d'un business d'imprimables sont plus simples qu'on ne le croit, mais il est essentiel de les comprendre. Ce guide couvre les droits d'auteur, les licences d'utilisation, la fiscalité des ventes numériques et les obligations légales.\n\nDestiné aux vendeurs francophones, ce guide aborde spécifiquement les règles européennes (TVA sur produits numériques, RGPD) et françaises (statut auto-entrepreneur, déclarations).",
  },

  introduction: "Beaucoup de nouveaux vendeurs hésitent à se lancer par crainte des complications juridiques. La bonne nouvelle : les aspects légaux d'un business d'imprimables sont largement gérables, surtout si vous comprenez les bases dès le départ.\n\nCe guide n'est pas un conseil juridique, mais un aperçu pratique des questions légales courantes auxquelles les vendeurs d'imprimables font face.",

  mainContent: [
    {
      heading: "Droits d’auteur et propriété intellectuelle",
      content: "Quand vous créez une fiche avec nos générateurs et détenez une licence commerciale, vous avez le droit de vendre les produits résultants. Les droits sur vos créations vous appartiennent.\n\nNe copiez jamais les produits d'autres vendeurs. N'utilisez pas de marques déposées (personnages Disney, logos) sans autorisation. Nos images thématiques sont des illustrations originales libres de droits pour usage commercial avec licence.",
    },
    {
      heading: "Fiscalité des ventes numériques",
      content: "En France, les revenus de vente d'imprimables sont imposables. Le statut auto-entrepreneur est le plus simple pour démarrer. Les ventes numériques dans l'UE sont soumises à la TVA du pays de l'acheteur (règles OSS).\n\nEtsy et Amazon collectent et déclarent la TVA pour vous dans la plupart des cas au sein de l'UE. Vérifiez les règles spécifiques de chaque plateforme.",
    }
  ],

  actionSteps: [
    {
      step: "Vérifiez votre statut juridique",
      description: "Assurez-vous d'avoir un statut adapté (auto-entrepreneur en France) avant vos premières ventes.",
    },
    {
      step: "Lisez les conditions des plateformes",
      description: "Chaque marketplace a ses propres règles pour les vendeurs de produits numériques.",
    },
    {
      step: "Documentez vos licences",
      description: "Conservez vos preuves d'achat de licences commerciales pour référence.",
    }
  ],

  toolsRecommended: [
    {
      appId: "wordsearch",
      title: "Mots Mêlés",
      description: "Testez gratuitement avant d'acheter une licence. Toutes les fonctionnalités sont accessibles.",
    }
  ],

  faq: [
    {
      question: "Ai-je besoin d’un statut d’entreprise pour vendre ?",
      answer: "En France, oui — le statut auto-entrepreneur est le plus simple et adapté aux revenus de début. La création est gratuite et rapide en ligne.",
    },
    {
      question: "Qui gère la TVA sur mes ventes ?",
      answer: "Etsy et Amazon collectent et déclarent la TVA sur les ventes numériques dans l'UE. Vous n'avez généralement pas à vous en occuper directement si vous vendez via ces plateformes.",
    },
    {
      question: "Quelle est votre politique de remboursement ?",
      answer: "Toutes les ventes sont définitives en raison de la nature numérique du produit. Utilisez la version gratuite pour tout tester d'abord.",
    }
  ],

  internalLinks: [
    { slug: "commercial-license-guide", pageType: "start", anchorText: "Guide des licences commerciales" },
    { slug: "complete-guide-printable-business", pageType: "start", anchorText: "Guide complet du business d’imprimables" }
  ],
};
