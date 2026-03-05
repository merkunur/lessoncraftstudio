import type { CornerstoneContent } from '../types';

export const content: CornerstoneContent = {
  guideId: "create-multilingual-worksheets",
  locale: 'fr',

  seo: {
    titleTag: "Créer des Fiches Multilingues pour le Marché International",
    metaDescription: "Le marché international des imprimables est massivement sous-exploité. Alors que les fiches en anglais font face à une concurrence féroce, les marchés en français, allemand, espagnol et d'autres langues offrent des opportunités énormes avec peu de concurrence.",
    primaryKeyword: "fiches multilingues imprimables",
    secondaryKeywords: ["worksheets multilingues","fiches éducatives langues","imprimables internationaux","fiches français allemand espagnol","marché international imprimables"],
    lsiKeywords: ["traduction fiches","marchés internationaux","langues européennes","vocabulaire multilingue","adaptation linguistique","marché francophone","expansion internationale","diversification linguistique"],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/wordsearch/Word Search 1.jpeg',
      primaryAlt: "Fiche imprimable professionnelle pour business create multilingual worksheets",
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
    videoTitle: "Créer des Fiches Multilingues pour le Marché International — Tutoriel Complet",
  },

  hero: {
    title: "Créer des Fiches Multilingues pour le Marché International",
    subtitle: "Exploitez 11 langues pour multiplier vos ventes avec moins de concurrence",
    readingTime: "11 min de lecture",
    description: "Le marché international des imprimables est massivement sous-exploité. Alors que les fiches en anglais font face à une concurrence féroce, les marchés en français, allemand, espagnol et d'autres langues offrent des opportunités énormes avec peu de concurrence.\n\nCe guide montre comment utiliser nos générateurs multilingues pour créer des produits dans 11 langues et conquir des marchés où la demande dépasse largement l'offre.",
  },

  introduction: "La diversification linguistique est le secret le mieux gardé des vendeurs d'imprimables à succès. Un produit qui fait face à 10 000 concurrents en anglais n'en a peut-être que 200 en français, 150 en allemand et 50 en suédois.\n\nNos générateurs supportent 11 langues nativement : anglais, français, allemand, espagnol, portugais, italien, néerlandais, suédois, danois, norvégien et finnois. Ce guide vous montre comment exploiter cette capacité pour multiplier vos revenus.",

  mainContent: [
    {
      heading: "L’opportunité multilingue",
      content: "Chaque langue supplémentaire est essentiellement un nouveau marché avec un investissement minimal. Les familles francophones, germanophones et hispanophones recherchent activement du matériel éducatif de qualité dans leur langue, mais trouvent beaucoup moins d'options qu'en anglais.\n\nLes prix sont souvent plus élevés dans les marchés non anglophones car l'offre est limitée. Un pack de fiches de maths en suédois peut se vendre 30–50% plus cher que le même produit en anglais.",
    },
    {
      heading: "Stratégie de lancement multilingue",
      content: "Ne tentez pas de lancer dans les 11 langues simultanément. Commencez par votre langue maternelle plus une ou deux langues supplémentaires. Maîtrisez le SEO marketplace dans chaque langue avant d'en ajouter de nouvelles.\n\nLes combinaisons les plus rentables pour les vendeurs francophones : français + anglais + allemand. L'allemand est le deuxième marché européen en taille avec peu de concurrence dans les imprimables éducatifs.",
    }
  ],

  actionSteps: [
    {
      step: "Identifiez vos langues cibles",
      description: "Recherchez la concurrence sur Etsy dans 3–4 langues pour votre niche.",
    },
    {
      step: "Créez vos premiers produits multilingues",
      description: "Prenez votre meilleur produit français et générez des versions dans 2 nouvelles langues.",
    },
    {
      step: "Adaptez vos annonces",
      description: "Chaque marché linguistique a ses propres mots-clés et conventions. Recherchez et adaptez.",
    }
  ],

  toolsRecommended: [
    {
      appId: "wordsearch",
      title: "Mots Mêlés",
      description: "Support natif de 11 langues avec vocabulaire intégré pour chaque langue.",
    },
    {
      appId: "crossword",
      title: "Mots Croisés",
      description: "Les mots croisés sont populaires dans toutes les cultures européennes.",
    }
  ],

  faq: [
    {
      question: "Dois-je parler la langue pour vendre dans ce marché ?",
      answer: "Non. Les générateurs produisent le contenu automatiquement dans la langue choisie. Le vocabulaire, les instructions et les titres sont tous localisés nativement.",
    },
    {
      question: "Quelles langues sont les plus rentables ?",
      answer: "Après l'anglais : l'allemand, le français et l'espagnol offrent le meilleur équilibre demande/concurrence. Les langues scandinaves (suédois, danois, norvégien) ont très peu de concurrence.",
    },
    {
      question: "Quelle est votre politique de remboursement ?",
      answer: "Toutes les ventes sont définitives en raison de la nature numérique du produit. Utilisez la version gratuite pour tout tester d'abord.",
    }
  ],

  internalLinks: [
    { slug: "complete-guide-printable-business", pageType: "start", anchorText: "Guide complet du business d’imprimables" },
    { slug: "scaling-printable-business", pageType: "start", anchorText: "Passer à l’échelle" },
    { slug: "wordsearch", pageType: "app", anchorText: "Générateur de Mots Mêlés" }
  ],
};
