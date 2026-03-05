import type { CornerstoneContent } from '../types';

export const content: CornerstoneContent = {
  guideId: "marketing-printable-business",
  locale: 'fr',

  seo: {
    titleTag: "Marketing de Votre Business d’Imprimables",
    metaDescription: "Créer d'excellents produits ne suffit pas — il faut les rendre visibles. Ce guide détaille les quatre piliers du marketing d'imprimables : Pinterest, email marketing, SEO marketplace et réseaux sociaux.",
    primaryKeyword: "marketing business imprimables",
    secondaryKeywords: ["promouvoir imprimables éducatifs","marketing fiches etsy","pinterest imprimables","email marketing fiches","SEO marketplace imprimables"],
    lsiKeywords: ["stratégie marketing","trafic organique","épingles pinterest","newsletter","réseaux sociaux","conversion","visibilité en ligne","contenu promotionnel"],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/wordsearch/Word Search 1.jpeg',
      primaryAlt: "Fiche imprimable professionnelle pour business marketing printable business",
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
    videoTitle: "Marketing de Votre Business d’Imprimables — Tutoriel Complet",
  },

  hero: {
    title: "Marketing de Votre Business d’Imprimables",
    subtitle: "Pinterest, email, réseaux sociaux et SEO pour générer des ventes constantes",
    readingTime: "12 min de lecture",
    description: "Créer d'excellents produits ne suffit pas — il faut les rendre visibles. Ce guide détaille les quatre piliers du marketing d'imprimables : Pinterest, email marketing, SEO marketplace et réseaux sociaux.\n\nChaque canal est analysé avec des stratégies spécifiques au marché francophone des imprimables éducatifs.",
  },

  introduction: "Le marketing est ce qui transforme un bon produit en une bonne entreprise. Les meilleurs vendeurs d'imprimables consacrent autant de temps au marketing qu'à la création de produits — et c'est pourquoi ils vendent plus.\n\nCe guide se concentre sur les quatre canaux marketing les plus efficaces pour les vendeurs d'imprimables, classés par retour sur investissement.",

  mainContent: [
    {
      heading: "Pinterest : votre moteur de trafic gratuit",
      content: "Pinterest est le canal marketing numéro un pour les imprimables. Chaque épingle est un lien permanent vers vos annonces. Créez 5–10 épingles par produit, avec des images attrayantes et des descriptions optimisées SEO.\n\nUtilisez des tableaux thématiques pour organiser votre contenu. Les épingles éducatives performent particulièrement bien en français, car la concurrence est plus faible qu'en anglais. Planifiez vos publications à l'avance pour maintenir une présence régulière.",
    },
    {
      heading: "Email marketing pour les ventes récurrentes",
      content: "L'email offre le meilleur ROI de tous les canaux marketing. Proposez un pack imprimable gratuit pour capturer des emails. Envoyez des annonces de nouveaux produits, des offres exclusives et des collections saisonnières.\n\nMême une petite liste de 500 abonnés engagés peut générer des ventes significatives lors de chaque envoi. La clé est la constance et la valeur apportée à chaque email.",
    },
    {
      heading: "SEO marketplace : être trouvé par les acheteurs",
      content: "L'optimisation SEO sur Etsy et Amazon est votre premier générateur de trafic. Recherchez les mots-clés que vos clients utilisent réellement. Les enseignants cherchent différemment des parents — optimisez pour les deux audiences.\n\nSur Etsy, utilisez les 13 tags en mélangeant termes larges et spécifiques. Sur Amazon, exploitez les 7 champs de mots-clés backend. Testez régulièrement de nouvelles combinaisons pour améliorer votre classement.",
    }
  ],

  actionSteps: [
    {
      step: "Créez un compte Pinterest professionnel",
      description: "Configurez votre profil, créez 5 tableaux thématiques et publiez vos premières 20 épingles.",
    },
    {
      step: "Mettez en place un lead magnet",
      description: "Créez un pack imprimable gratuit et configurez une page de capture email.",
    },
    {
      step: "Auditez votre SEO marketplace",
      description: "Vérifiez et optimisez les titres, tags et descriptions de toutes vos annonces.",
    }
  ],

  toolsRecommended: [
    {
      appId: "coloring",
      title: "Coloriages",
      description: "Les coloriages sont les plus partagés sur Pinterest. Excellent outil pour le marketing organique.",
    },
    {
      appId: "wordsearch",
      title: "Mots Mêlés",
      description: "Les épingles montrant des mots mêlés génèrent un fort taux de clics.",
    }
  ],

  faq: [
    {
      question: "Quel canal marketing est le plus efficace ?",
      answer: "Pinterest pour le trafic gratuit, l'email pour la conversion et la fidélisation. Commencez par Pinterest car il ne nécessite aucun investissement financier.",
    },
    {
      question: "Combien de temps consacrer au marketing ?",
      answer: "Règle du 50/50 : la moitié de votre temps à créer des produits, l'autre moitié à les promouvoir. Même 30 minutes par jour de marketing fait une différence.",
    },
    {
      question: "Quelle est votre politique de remboursement ?",
      answer: "Toutes les ventes sont définitives en raison de la nature numérique du produit. Utilisez la version gratuite pour tout tester d'abord.",
    }
  ],

  internalLinks: [
    { slug: "etsy-printable-business", pageType: "start", anchorText: "Vendre sur Etsy" },
    { slug: "complete-guide-printable-business", pageType: "start", anchorText: "Guide complet du business d’imprimables" },
    { slug: "coloring", pageType: "app", anchorText: "Générateur de Coloriages" }
  ],
};
