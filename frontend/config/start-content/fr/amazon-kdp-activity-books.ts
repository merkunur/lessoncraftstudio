import type { CornerstoneContent } from '../types';

export const content: CornerstoneContent = {
  guideId: "amazon-kdp-activity-books",
  locale: 'fr',

  seo: {
    titleTag: "Publier des Cahiers d’Activités sur Amazon KDP",
    metaDescription: "Amazon KDP vous permet de vendre des cahiers d'activités brochés sans avance de fonds. Amazon imprime et expédie chaque commande à la demande. Ce guide couvre le formatage, les mots-clés, la sélection de catégorie et les stratégies de redevances.",
    primaryKeyword: "publier cahiers activités amazon kdp",
    secondaryKeywords: ["amazon kdp fiches","cahier activités KDP","publier livre exercices amazon","impression demande cahier maths","KDP puzzle books français"],
    lsiKeywords: ["impression demande","redevances KDP","mise en page intérieur","ISBN amazon","couverture cahier","catégories amazon","mots-clés backend","royalties"],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/wordsearch/Word Search 1.jpeg',
      primaryAlt: "Fiche imprimable professionnelle pour business amazon kdp activity books",
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
    videoTitle: "Publier des Cahiers d’Activités sur Amazon KDP — Tutoriel Complet",
  },

  hero: {
    title: "Publier des Cahiers d’Activités sur Amazon KDP",
    subtitle: "Guide complet pour créer et vendre des cahiers d’activités imprimés à la demande",
    readingTime: "13 min de lecture",
    description: "Amazon KDP vous permet de vendre des cahiers d'activités brochés sans avance de fonds. Amazon imprime et expédie chaque commande à la demande. Ce guide couvre le formatage, les mots-clés, la sélection de catégorie et les stratégies de redevances.\n\nVous apprendrez à transformer vos fiches en cahiers de 50 à 100 pages, optimiser pour la recherche Amazon et construire un catalogue générant des revenus quotidiens.",
  },

  introduction: "Amazon KDP est le complément idéal d'Etsy pour les vendeurs d'imprimables. Alors qu'Etsy excelle pour les téléchargements numériques, KDP vous donne accès au marché physique — des cahiers imprimés vendus par Amazon dans le monde entier.\n\nLe modèle est simple : vous téléversez un PDF intérieur et une couverture, Amazon gère l'impression, l'expédition et le service client. Vous percevez des redevances sur chaque vente. Avec un catalogue de 20 à 100 titres, les ventes quotidiennes cumulées génèrent un revenu passif significatif.",

  mainContent: [
    {
      heading: "Comprendre le modèle KDP",
      content: "KDP fonctionne en impression à la demande. Il n'y a pas de stock à gérer, pas de frais d'impression initiaux et pas de risque d'invendus. Amazon imprime un seul exemplaire chaque fois qu'un client commande.\n\nVos redevances dépendent du prix de vente, du nombre de pages et du marché. Un cahier de 100 pages à 7,99€ peut rapporter 2 à 3€ par vente. Le volume est la clé — 20 titres vendant 2 exemplaires par jour génèrent 80–120€ quotidiens.",
    },
    {
      heading: "Formatage pour Amazon KDP",
      content: "Les exigences de formatage KDP sont strictes. Intérieur en PDF à 300 DPI avec fond perdu. Le format 8,5 × 11 pouces est standard pour les cahiers d'activités. Tenez compte de la goutière de reliure (0,125 pouce supplémentaire côté reliure).\n\nNos générateurs produisent des PDF compatibles KDP directement. Générez vos fiches, compilez-les en un seul document et téléversez. La couverture est un fichier séparé — utilisez le calculateur de couverture KDP pour les dimensions exactes.",
    },
    {
      heading: "Mots-clés et catégories Amazon",
      content: "Amazon vous donne 7 champs de mots-clés backend (50 caractères chacun). Utilisez-les stratégiquement — ces mots-clés n'apparaissent pas dans votre listing mais influencent fortement le classement de recherche.\n\nLa sélection de catégorie impacte la visibilité. Les sous-catégories spécifiques comme \"Cahiers d'activités pour enfants\" offrent moins de concurrence que les catégories larges. Vous pouvez demander à Amazon d'ajouter votre livre à jusqu'à 10 catégories.",
    }
  ],

  actionSteps: [
    {
      step: "Créez votre compte KDP",
      description: "Inscrivez-vous gratuitement sur kdp.amazon.com et configurez vos informations fiscales.",
    },
    {
      step: "Préparez votre premier cahier",
      description: "Compilez 50–100 fiches en PDF avec table des matières et page de titre.",
    },
    {
      step: "Concevez une couverture professionnelle",
      description: "Utilisez le calculateur KDP pour les dimensions et créez une couverture attrayante.",
    },
    {
      step: "Optimisez vos mots-clés",
      description: "Recherchez 7 phrases-clés backend pertinentes avec des outils comme la barre de recherche Amazon.",
    }
  ],

  toolsRecommended: [
    {
      appId: "wordsearch",
      title: "Mots Mêlés",
      description: "Les livres de mots mêlés sont parmi les mieux vendus sur KDP dans la catégorie puzzles.",
    },
    {
      appId: "math-puzzle",
      title: "Puzzles Maths",
      description: "Les cahiers de puzzles mathématiques offrent une différenciation face aux fiches traditionnelles.",
    }
  ],

  faq: [
    {
      question: "Combien coûte la publication sur KDP ?",
      answer: "KDP est entièrement gratuit. Il n'y a aucun frais de publication. Amazon déduit les coûts d'impression de vos redevances pour chaque vente.",
    },
    {
      question: "Puis-je vendre en français sur Amazon ?",
      answer: "Oui. Amazon.fr est le marché idéal pour les cahiers d'activités en français. La concurrence est nettement plus faible qu'en anglais sur Amazon.com.",
    },
    {
      question: "Quelle est votre politique de remboursement ?",
      answer: "Toutes les ventes sont définitives en raison de la nature numérique du produit. Utilisez la version gratuite pour tout tester d'abord.",
    }
  ],

  internalLinks: [
    { slug: "complete-guide-printable-business", pageType: "start", anchorText: "Guide complet du business d’imprimables" },
    { slug: "etsy-printable-business", pageType: "start", anchorText: "Vendre des imprimables sur Etsy" },
    { slug: "wordsearch", pageType: "app", anchorText: "Générateur de Mots Mêlés" }
  ],
};
