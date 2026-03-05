import type { CornerstoneContent } from '../types';

export const content: CornerstoneContent = {
  guideId: "create-worksheets-that-sell",
  locale: 'fr',

  seo: {
    titleTag: "Créer des Fiches qui se Vendent",
    metaDescription: "La différence entre des fiches qui se vendent et celles qui stagnent tient à quelques détails clés. Ce guide vous révèle les critères de qualité que les acheteurs recherchent et comment produire des fiches qui répondent exactement à ces attentes.",
    primaryKeyword: "créer fiches qui se vendent",
    secondaryKeywords: ["design fiches commerciales","fiches éducatives rentables","qualité fiches imprimables","optimiser fiches vente","concevoir fiches professionnelles"],
    lsiKeywords: ["mise en page fiche","formatage professionnel","corrigés automatiques","niveaux difficulté","thèmes visuels","engagement élèves","différenciation produit","qualité impression"],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/wordsearch/Word Search 1.jpeg',
      primaryAlt: "Fiche imprimable professionnelle pour business create worksheets that sell",
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
    videoTitle: "Créer des Fiches qui se Vendent — Tutoriel Complet",
  },

  hero: {
    title: "Créer des Fiches qui se Vendent",
    subtitle: "Les secrets de conception et de positionnement pour des fiches à succès commercial",
    readingTime: "12 min de lecture",
    description: "La différence entre des fiches qui se vendent et celles qui stagnent tient à quelques détails clés. Ce guide vous révèle les critères de qualité que les acheteurs recherchent et comment produire des fiches qui répondent exactement à ces attentes.\n\nDu formatage professionnel aux thèmes engageants, des corrigés automatiques aux bundles stratégiques — chaque aspect de la création de fiches à succès est couvert.",
  },

  introduction: "La qualité est le facteur numéro un qui détermine le succès commercial de vos fiches. Les acheteurs comparent instantanément vos produits aux meilleurs du marché. Si votre formatage paraît amateur, aucun prix attractif ne compensera cette première impression négative.\n\nCe guide détaille les critères précis qui séparent les fiches à succès des produits médiocres, et comment nos générateurs vous permettent d'atteindre ce standard sans compétences en design.",

  mainContent: [
    {
      heading: "Ce que les acheteurs recherchent",
      content: "Les acheteurs évaluent les fiches selon cinq critères : formatage professionnel, contenu adapté à l'âge, variété du contenu, inclusion de corrigés et attrait visuel. Les fiches qui cochent ces cinq cases se vendent systématiquement mieux.\n\nLes corrigés sont non négociables. Les avis négatifs mentionnant l'absence de corrigés sont parmi les plus courants. Nos générateurs créent des corrigés automatiquement pour chaque fiche.",
    },
    {
      heading: "Différenciation par les thèmes visuels",
      content: "Les fiches thématiques se vendent 3 à 5 fois mieux que les fiches génériques. Une fiche d'addition avec des images d'animaux est beaucoup plus attrayante qu'une grille de chiffres bruts.\n\nAvec 104 thèmes disponibles dans nos générateurs, vous pouvez créer des collections thématiques uniques. Les thèmes saisonniers (Noël, Halloween, rentrée) offrent des pics de ventes prévisibles.",
    }
  ],

  actionSteps: [
    {
      step: "Analysez les meilleures ventes de votre niche",
      description: "Téléchargez 3–5 produits best-sellers et identifiez ce qui les rend supérieurs.",
    },
    {
      step: "Créez un pack pilote de 15 fiches",
      description: "Utilisez un générateur pour produire 15 fiches thématiques avec corrigés.",
    },
    {
      step: "Testez et itérez",
      description: "Publiez et analysez les retours. Ajustez le format et le thème selon les données.",
    }
  ],

  toolsRecommended: [
    {
      appId: "addition",
      title: "Addition",
      description: "Les fiches de maths thématiques sont un excellent produit de départ.",
    },
    {
      appId: "wordsearch",
      title: "Mots Mêlés",
      description: "Format universellement apprécié par toutes les tranches d'âge.",
    }
  ],

  faq: [
    {
      question: "Faut-il des compétences en design ?",
      answer: "Non. Les générateurs produisent des fiches au format professionnel automatiquement. Vous choisissez les paramètres, l'outil gère le design.",
    },
    {
      question: "Combien de fiches par pack ?",
      answer: "Les packs de 15–20 fiches sont le format le plus vendu. Assez pour justifier le prix, pas trop pour être écrasant.",
    },
    {
      question: "Quelle est votre politique de remboursement ?",
      answer: "Toutes les ventes sont définitives en raison de la nature numérique du produit. Utilisez la version gratuite pour tout tester d'abord.",
    }
  ],

  internalLinks: [
    { slug: "complete-guide-printable-business", pageType: "start", anchorText: "Guide complet du business d’imprimables" },
    { slug: "addition", pageType: "app", anchorText: "Générateur d'Addition" },
    { slug: "wordsearch", pageType: "app", anchorText: "Générateur de Mots Mêlés" }
  ],
};
