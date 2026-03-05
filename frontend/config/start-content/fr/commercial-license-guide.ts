import type { CornerstoneContent } from '../types';

export const content: CornerstoneContent = {
  guideId: "commercial-license-guide",
  locale: 'fr',

  seo: {
    titleTag: "Guide des Licences Commerciales pour Imprimables",
    metaDescription: "Comprendre les licences est essentiel avant de vendre des imprimables. Ce guide explique clairement la différence entre licence personnelle (gratuite), licence commerciale (27 $) et accès complet (47 $).",
    primaryKeyword: "licence commerciale imprimables",
    secondaryKeywords: ["licence vente fiches","droits commerciaux worksheets","licence revente imprimables","droits utilisation fiches","licence business imprimables"],
    lsiKeywords: ["usage personnel","usage commercial","droits de revente","propriété intellectuelle","conditions utilisation","niveaux licence","accès complet","restrictions"],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/wordsearch/Word Search 1.jpeg',
      primaryAlt: "Fiche imprimable professionnelle pour business commercial license guide",
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
    videoTitle: "Guide des Licences Commerciales pour Imprimables — Tutoriel Complet",
  },

  hero: {
    title: "Guide des Licences Commerciales pour Imprimables",
    subtitle: "Tout comprendre sur les licences personnelles et commerciales pour vos fiches",
    readingTime: "8 min de lecture",
    description: "Comprendre les licences est essentiel avant de vendre des imprimables. Ce guide explique clairement la différence entre licence personnelle (gratuite), licence commerciale (27 $) et accès complet (47 $).\n\nDécouvrez exactement ce que chaque niveau vous permet de faire, quelles sont les restrictions et comment choisir la licence adaptée à votre activité.",
  },

  introduction: "La question des licences revient constamment chez les nouveaux vendeurs d'imprimables. Ai-je le droit de vendre ces fiches ? Quelle licence me faut-il ? Ce guide répond à toutes ces questions de manière claire et définitive.\n\nNos outils offrent trois niveaux : version gratuite (usage personnel avec filigrane), licence commerciale (27 $) et accès complet (47 $). Chaque niveau est détaillé ci-dessous.",

  mainContent: [
    {
      heading: "Version gratuite : usage personnel",
      content: "La version gratuite donne accès à toutes les fonctionnalités de chaque générateur. Un petit filigrane est ajouté aux exports pour indiquer l'usage personnel uniquement. Idéal pour les parents et enseignants qui veulent imprimer des fiches pour leur propre usage.\n\nPas d'inscription requise. Commencez à créer immédiatement.",
    },
    {
      heading: "Licence commerciale : vendez vos créations",
      content: "La licence commerciale (27 $ par application) retire le filigrane et vous accorde le droit de vendre les fiches que vous créez sur toutes les plateformes : Etsy, Amazon KDP, TPT, Gumroad et votre propre site.\n\nInclut 3 packs de langues et l'accès aux thèmes de base. C'est le choix idéal pour les vendeurs qui débutent dans une niche spécifique.",
    },
    {
      heading: "Accès complet : toutes les fonctionnalités",
      content: "L'accès complet (47 $ par application) inclut tout ce que la licence commerciale offre, plus : les 11 langues, les 104 thèmes illustrés complets et le support prioritaire.\n\nC'est le choix optimal pour les vendeurs sérieux qui veulent maximiser leur catalogue avec des produits multilingues et une variété thématique maximale.",
    }
  ],

  actionSteps: [
    {
      step: "Testez avec la version gratuite",
      description: "Créez des fiches pour évaluer la qualité et la pertinence pour votre niche.",
    },
    {
      step: "Démarrez avec la licence commerciale",
      description: "Si vous voulez vendre, la licence à 27 $ est le point d'entrée optimal.",
    },
    {
      step: "Passez à l’accès complet pour le scaling",
      description: "Quand vous êtes prêt à étendre à plusieurs langues, l'accès complet se rentabilise rapidement.",
    }
  ],

  toolsRecommended: [
    {
      appId: "wordsearch",
      title: "Mots Mêlés",
      description: "L'outil le plus populaire. Testez-le gratuitement pour évaluer la qualité.",
    },
    {
      appId: "addition",
      title: "Addition",
      description: "Catégorie la plus demandée. Excellent retour sur investissement.",
    }
  ],

  faq: [
    {
      question: "Puis-je acheter une licence pour un seul générateur ?",
      answer: "Oui. Chaque générateur est disponible individuellement à 27 $ (commercial) ou 47 $ (complet). Les packs catégorie offrent une économie significative si vous voulez plusieurs outils.",
    },
    {
      question: "La licence est-elle permanente ?",
      answer: "Oui. C'est un achat unique, pas un abonnement. Vous conservez l'accès à vie avec toutes les futures mises à jour incluses.",
    },
    {
      question: "Quelle est votre politique de remboursement ?",
      answer: "Toutes les ventes sont définitives en raison de la nature numérique du produit. Utilisez la version gratuite pour tout tester d'abord.",
    }
  ],

  internalLinks: [
    { slug: "complete-guide-printable-business", pageType: "start", anchorText: "Guide complet du business d’imprimables" },
    { slug: "printable-business-income", pageType: "start", anchorText: "Revenus d’un business d’imprimables" }
  ],
};
