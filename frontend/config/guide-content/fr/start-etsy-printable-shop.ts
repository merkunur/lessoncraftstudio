import type { CreateXContent } from '../types';

export const content: CreateXContent = {
  guideId: "start-etsy-printable-shop",
  locale: 'fr',

  seo: {
    titleTag: "Démarrer Votre Boutique Etsy d'Imprimables | Guide Gratuit",
    metaDescription: "Guide pas à pas pour ouvrir votre première boutique Etsy d'imprimables éducatifs. De la création du compte à votre première vente.",
    primaryKeyword: "démarrer boutique etsy imprimables",
    secondaryKeywords: ["ouvrir boutique etsy fiches","créer compte etsy worksheets","lancer boutique etsy éducation","etsy débutant imprimables","première boutique etsy"],
    lsiKeywords: ["inscription","configuration","branding","premiers listings","démarrage","guide débutant","pas à pas","lancement"],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/wordsearch/sample-1.jpeg',
      primaryAlt: "Fiche imprimable start etsy printable shop",
      secondary: '/samples/english/wordsearch/sample-2.jpeg',
      secondaryAlt: "Exemple de fiche start etsy printable shop",
    },
    sampleGallery: [
      { src: '/samples/english/wordsearch/sample-1.jpeg', alt: "Exemple fiche wordsearch", caption: 'Exemple de qualité professionnelle' },
      { src: '/samples/english/wordsearch/sample-2.jpeg', alt: "Fiche avec corrigé wordsearch", caption: 'Corrigé automatique inclus' },
    ],
    youtubeId: '36keBFzJbPo',
    videoTitle: "Démarrer Votre Boutique Etsy d'Imprimables — Tutoriel",
  },

  hero: {
    title: "Démarrer Votre Boutique Etsy d'Imprimables",
    description: "Guide pas à pas pour ouvrir votre première boutique Etsy d'imprimables éducatifs. De la création du compte à votre première vente.",
  },

  introduction: "Ouvrir une boutique Etsy est simple et peu coûteux. Ce guide vous accompagne de A à Z pour un lancement réussi.",

  tutorial: {
    title: "Étape par étape : Démarrer Votre Boutique Etsy d'Imprimables",
    steps: [
      {
        title: "Créez votre compte Etsy",
        description: "Inscription gratuite. Vous payez 0,20$ par listing uniquement.",
      },
      {
        title: "Configurez votre boutique",
        description: "Nom, bannière, logo, bio et politiques.",
      },
      {
        title: "Publiez vos 5 premiers listings",
        description: "Commencez avec 5 packs optimisés SEO.",
      }
    ],
  },

  platformTips: [
    {
      platform: "Etsy",
      title: "Lancement Etsy",
      description: "5 listings minimum pour que l'algorithme commence à vous montrer.",
    }
  ],

  monetization: [
    {
      title: "Premiers revenus",
      description: "Attendez-vous à vos premières ventes en 2–4 semaines.",
    }
  ],

  examples: "La plupart des vendeurs font leur première vente dans les 30 jours suivant le lancement.",

  faq: [
    {
      question: "Combien coûte l'ouverture d'une boutique Etsy?",
      answer: "0,20$ par listing. Pas de frais mensuels fixes. Commission de 6,5% sur les ventes.",
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
