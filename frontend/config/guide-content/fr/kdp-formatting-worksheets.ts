import type { CreateXContent } from '../types';

export const content: CreateXContent = {
  guideId: "kdp-formatting-worksheets",
  locale: 'fr',

  seo: {
    titleTag: "Formatage KDP pour Cahiers d'Activités | Guide Gratuit",
    metaDescription: "Le formatage correct est essentiel pour éviter le rejet par KDP. Ce guide détaille les spécifications exactes pour les cahiers d'activités.",
    primaryKeyword: "formatage kdp cahiers activités",
    secondaryKeywords: ["mise en page KDP fiches","spécifications PDF amazon","format intérieur KDP","template cahier amazon","règles formatage KDP"],
    lsiKeywords: ["fond perdu","goutière","DPI","dimensions","couverture","ISBN","PDF conforme","prépresse"],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/wordsearch/sample-1.jpeg',
      primaryAlt: "Fiche imprimable kdp formatting worksheets",
      secondary: '/samples/english/wordsearch/sample-2.jpeg',
      secondaryAlt: "Exemple de fiche kdp formatting worksheets",
    },
    sampleGallery: [
      { src: '/samples/english/wordsearch/sample-1.jpeg', alt: "Exemple fiche wordsearch", caption: 'Exemple de qualité professionnelle' },
      { src: '/samples/english/wordsearch/sample-2.jpeg', alt: "Fiche avec corrigé wordsearch", caption: 'Corrigé automatique inclus' },
    ],
    youtubeId: '36keBFzJbPo',
    videoTitle: "Formatage KDP pour Cahiers d'Activités — Tutoriel",
  },

  hero: {
    title: "Formatage KDP pour Cahiers d'Activités",
    description: "Le formatage correct est essentiel pour éviter le rejet par KDP. Ce guide détaille les spécifications exactes pour les cahiers d'activités.",
  },

  introduction: "KDP a des exigences strictes de formatage. Un fichier non conforme sera rejeté. Ce guide vous évite les erreurs courantes.",

  tutorial: {
    title: "Étape par étape : Formatage KDP pour Cahiers d'Activités",
    steps: [
      {
        title: "Choisissez les dimensions",
        description: "8,5×11 pouces standard. 6×9 pour livres de poche.",
      },
      {
        title: "Configurez les marges",
        description: "Minimum 0,5 pouce + goutière de reliure côté intérieur.",
      },
      {
        title: "Vérifiez le DPI",
        description: "300 DPI minimum. Nos générateurs produisent du 300 DPI natif.",
      }
    ],
  },

  platformTips: [
    {
      platform: "Amazon KDP",
      title: "Spécifications KDP",
      description: "Respectez les spécifications pour éviter tout rejet.",
    }
  ],

  monetization: [
    {
      title: "Production rapide",
      description: "Un formatage maîtrisé = plus de livres publiés = plus de revenus.",
    }
  ],

  examples: "Les erreurs de formatage les plus courantes : marges insuffisantes et résolution trop basse.",

  faq: [
    {
      question: "Les PDF des générateurs sont-ils compatibles KDP ?",
      answer: "Oui, ils sont générés en 300 DPI compatible KDP.",
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
