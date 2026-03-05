import type { CornerstoneContent } from '../types';

export const content: CornerstoneContent = {
  guideId: "tools-for-printable-business",
  locale: 'fr',

  seo: {
    titleTag: "Outils Essentiels pour Votre Business d’Imprimables",
    metaDescription: "Les bons outils font la différence entre un vendeur qui lutte et un qui prospère. Ce guide présente les outils essentiels pour chaque étape de votre business d'imprimables : création, formatage, marketing et vente.",
    primaryKeyword: "outils business imprimables éducatifs",
    secondaryKeywords: ["logiciels création fiches","générateurs worksheets","outils vendeur imprimables","ressources business fiches","meilleurs outils imprimables"],
    lsiKeywords: ["générateur de fiches","logiciel design","outil de productivité","automatisation création","workflow","pile technologique","outils gratuits","solutions professionnelles"],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/wordsearch/Word Search 1.jpeg',
      primaryAlt: "Fiche imprimable professionnelle pour business tools for printable business",
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
    videoTitle: "Outils Essentiels pour Votre Business d’Imprimables — Tutoriel Complet",
  },

  hero: {
    title: "Outils Essentiels pour Votre Business d’Imprimables",
    subtitle: "Les générateurs, logiciels et ressources dont vous avez besoin pour réussir",
    readingTime: "10 min de lecture",
    description: "Les bons outils font la différence entre un vendeur qui lutte et un qui prospère. Ce guide présente les outils essentiels pour chaque étape de votre business d'imprimables : création, formatage, marketing et vente.\n\nDécouvrez comment nos 33 générateurs de fiches se comparent aux alternatives et quels outils complémentaires vous permettront de maximiser votre productivité.",
  },

  introduction: "La productivité est la clé de la rentabilité dans le business d'imprimables. Un vendeur utilisant les bons outils crée 50 fiches dans le temps qu'il faut à un autre pour en créer 5 manuellement. Cette différence de 10x se traduit directement en revenus.\n\nCe guide couvre les outils essentiels pour chaque aspect de votre business, des générateurs de fiches aux outils de marketing.",

  mainContent: [
    {
      heading: "Générateurs de fiches : votre outil principal",
      content: "Les générateurs de fiches sont le cœur de votre business. Au lieu de passer des heures dans Canva ou InDesign, vous configurez quelques paramètres et obtenez une fiche formatée professionnellement en secondes.\n\nNos 33 générateurs couvrent 6 catégories : mathématiques (addition, soustraction, puzzles), lecture-écriture (mots mêlés, mots croisés), visuel (coloriage, dessin), association (matching, ombres), puzzles (sudoku, labyrinthes) et recherche (cherche et trouve, odd one out). Chaque générateur inclut 104 thèmes illustrés et supporte 11 langues.",
    },
    {
      heading: "Outils de formatage et présentation",
      content: "Pour Amazon KDP, vous aurez besoin d'un outil pour assembler vos fiches en cahier. Des solutions gratuites comme PDF Merger fonctionnent bien. Pour les couvertures, Canva (gratuit) offre des modèles KDP prêtre-formatés.\n\nPour les mockups Etsy, utilisez des modèles de présentation gratuits. Montrez vos fiches en contexte réaliste — sur un bureau, dans un classeur, avec des crayons colorés.",
    }
  ],

  actionSteps: [
    {
      step: "Testez les générateurs gratuitement",
      description: "Ouvrez 3–5 générateurs différents et créez des exemples pour évaluer la qualité et la variété.",
    },
    {
      step: "Mettez en place votre workflow",
      description: "Création → Formatage → Mockups → Publication. Standardisez chaque étape.",
    },
    {
      step: "Choisissez vos outils marketing",
      description: "Pinterest + un outil email (Mailchimp gratuit) couvrent l'essentiel au démarrage.",
    }
  ],

  toolsRecommended: [
    {
      appId: "wordsearch",
      title: "Mots Mêlés",
      description: "Le générateur le plus polyvalent. Parfait pour débuter dans n'importe quelle niche.",
    },
    {
      appId: "addition",
      title: "Addition",
      description: "Catégorie la plus demandée. Idéal pour les fiches de maths.",
    },
    {
      appId: "coloring",
      title: "Coloriages",
      description: "Catégorie à plus fort volume sur Amazon KDP.",
    }
  ],

  faq: [
    {
      question: "Puis-je commencer avec les versions gratuites ?",
      answer: "Absolument. Toutes les fonctionnalités sont accessibles gratuitement. La seule différence est un petit filigrane sur les exports, qui disparaît avec une licence.",
    },
    {
      question: "Quel est le meilleur générateur pour débuter ?",
      answer: "Le générateur de mots mêlés est le plus polyvalent. Il fonctionne pour toutes les niches, tous les âges et toutes les langues.",
    },
    {
      question: "Quelle est votre politique de remboursement ?",
      answer: "Toutes les ventes sont définitives en raison de la nature numérique du produit. Utilisez la version gratuite pour tout tester d'abord.",
    }
  ],

  internalLinks: [
    { slug: "complete-guide-printable-business", pageType: "start", anchorText: "Guide complet du business d’imprimables" },
    { slug: "wordsearch", pageType: "app", anchorText: "Générateur de Mots Mêlés" },
    { slug: "addition", pageType: "app", anchorText: "Générateur d'Addition" }
  ],
};
