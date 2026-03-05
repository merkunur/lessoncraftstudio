import type { CreateXContent } from '../types';

export const content: CreateXContent = {
  guideId: "quality-standards-worksheets",
  locale: 'fr',

  seo: {
    titleTag: "Standards de Qualité pour les Fiches Imprimables | Guide Gratuit",
    metaDescription: "La qualité détermine le succès commercial. Ce guide définit les standards minimaux que vos fiches doivent atteindre.",
    primaryKeyword: "standards qualité fiches imprimables",
    secondaryKeywords: ["qualité worksheets","critères fiches professionnelles","normes qualité imprimables","fiches haute qualité","standards impression fiches"],
    lsiKeywords: ["résolution","mise en page","polices","espacement","corrigés","accessibilité","test impression","contrôle qualité"],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/wordsearch/sample-1.jpeg',
      primaryAlt: "Fiche imprimable quality standards worksheets",
      secondary: '/samples/english/wordsearch/sample-2.jpeg',
      secondaryAlt: "Exemple de fiche quality standards worksheets",
    },
    sampleGallery: [
      { src: '/samples/english/wordsearch/sample-1.jpeg', alt: "Exemple fiche wordsearch", caption: 'Exemple de qualité professionnelle' },
      { src: '/samples/english/wordsearch/sample-2.jpeg', alt: "Fiche avec corrigé wordsearch", caption: 'Corrigé automatique inclus' },
    ],
    youtubeId: '36keBFzJbPo',
    videoTitle: "Standards de Qualité pour les Fiches Imprimables — Tutoriel",
  },

  hero: {
    title: "Standards de Qualité pour les Fiches Imprimables",
    description: "La qualité détermine le succès commercial. Ce guide définit les standards minimaux que vos fiches doivent atteindre.",
  },

  introduction: "Les acheteurs sont exigeants. Voici les critères de qualité que les meilleures fiches du marché respectent.",

  tutorial: {
    title: "Étape par étape : Standards de Qualité pour les Fiches Imprimables",
    steps: [
      {
        title: "Vérifiez la résolution",
        description: "300 DPI minimum pour une impression nette.",
      },
      {
        title: "Testez l'impression",
        description: "Imprimez chaque fiche en noir et blanc pour vérifier la lisibilité.",
      },
      {
        title: "Vérifiez les corrigés",
        description: "Chaque corrigé doit être 100% correct.",
      }
    ],
  },

  platformTips: [
    {
      platform: "Multi-plateforme",
      title: "Qualité cross-plateforme",
      description: "Les mêmes standards s'appliquent partout.",
    }
  ],

  monetization: [
    {
      title: "Prix premium",
      description: "La qualité justifie des prix supérieurs à la concurrence.",
    }
  ],

  examples: "Les produits de haute qualité reçoivent plus d'avis 5 étoiles, ce qui booste le ranking.",

  faq: [
    {
      question: "Nos générateurs respectent-ils ces standards?",
      answer: "Oui. Les générateurs produisent du contenu à 300 DPI avec formatage professionnel et corrigés automatiques vérifiés.",
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
