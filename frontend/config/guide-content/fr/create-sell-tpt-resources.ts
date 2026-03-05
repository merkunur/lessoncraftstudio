import type { CreateXContent } from '../types';

export const content: CreateXContent = {
  guideId: "create-sell-tpt-resources",
  locale: 'fr',

  seo: {
    titleTag: "Créer et Vendre sur Teachers Pay Teachers | Guide Gratuit",
    metaDescription: "Teachers Pay Teachers est la marketplace dédiée aux enseignants. Les acheteurs y sont prêts à payer pour des ressources de qualité alignées au programme.",
    primaryKeyword: "vendre sur teachers pay teachers",
    secondaryKeywords: ["TPT ressources éducatives","vendre fiches TPT","boutique TPT français","Teachers Pay Teachers stratégie","ressources pédagogiques TPT"],
    lsiKeywords: ["alignement programme","standards éducatifs","aperçu gratuit","description pédagogique","niveaux scolaires","compétences visées","avis enseignants","communauté TPT"],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/addition/sample-1.jpeg',
      primaryAlt: "Fiche imprimable create sell tpt resources",
      secondary: '/samples/english/addition/sample-2.jpeg',
      secondaryAlt: "Exemple de fiche create sell tpt resources",
    },
    sampleGallery: [
      { src: '/samples/english/addition/sample-1.jpeg', alt: "Exemple fiche addition", caption: 'Exemple de qualité professionnelle' },
      { src: '/samples/english/addition/sample-2.jpeg', alt: "Fiche avec corrigé addition", caption: 'Corrigé automatique inclus' },
    ],
    youtubeId: '36keBFzJbPo',
    videoTitle: "Créer et Vendre sur Teachers Pay Teachers — Tutoriel",
  },

  hero: {
    title: "Créer et Vendre sur Teachers Pay Teachers",
    description: "Teachers Pay Teachers est la marketplace dédiée aux enseignants. Les acheteurs y sont prêts à payer pour des ressources de qualité alignées au programme.",
  },

  introduction: "TPT touche des millions d'enseignants qui recherchent activement du matériel pédagogique. Les vendeurs qui réussissent comprennent les besoins spécifiques des enseignants.",

  tutorial: {
    title: "Étape par étape : Créer et Vendre sur Teachers Pay Teachers",
    steps: [
      {
        title: "Créez un compte vendeur TPT",
        description: "L'inscription est gratuite. Le plan Premium (59,95$/an) réduit les commissions.",
      },
      {
        title: "Alignez vos produits au programme",
        description: "Mentionnez les compétences visées et les niveaux scolaires.",
      },
      {
        title: "Incluez un aperçu gratuit",
        description: "TPT permet d'offrir un aperçu — utilisez-le pour convaincre.",
      }
    ],
  },

  platformTips: [
    {
      platform: "Teachers Pay Teachers",
      title: "Optimisation TPT",
      description: "Le SEO TPT est différent d'Etsy. Utilisez la terminologie pédagogique.",
    }
  ],

  monetization: [
    {
      title: "Ressources premium",
      description: "Les enseignants paient volontiers 5–15$ pour des ressources complètes.",
    }
  ],

  examples: "Les vendeurs TPT spécialisés gagnent entre 500€ et 5 000€/mois avec un catalogue de 50+ ressources.",

  faq: [
    {
      question: "TPT vaut-il le coup en français ?",
      answer: "TPT a une section francophone croissante. La concurrence est faible, l'opportunité est réelle.",
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
    { slug: "addition", pageType: "app", anchorText: "Générateur d'Addition" }
  ],
};
