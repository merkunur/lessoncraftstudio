import type { BundleContent } from '../types';

export const content: BundleContent = {
  bundleId: 'literacy-bundle',
  locale: 'fr',

  seo: {
    titleTag: 'Pack Lecture et Écriture | 7 Générateurs pour 79 $',
    metaDescription: 'Obtenez 7 générateurs professionnels en un seul pack. Économisez plus de 50 % par rapport à l\'achat individuel. Licence commerciale incluse.',
    primaryKeyword: 'pack fiches lecture écriture',
    secondaryKeywords: ["générateurs lecture","fiches langues imprimables","coffret activités littératie","outils lecture écriture","pack jeux de mots"],
    lsiKeywords: ["mots mêlés","écriture manuscrite","vocabulaire","phonèmes","alphabet","mots croisés","lecture","orthographe"],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/wordsearch/Word Search 1.jpeg',
      primaryAlt: 'Mots mêlés avec images',
    },
    sampleGallery: [
      { src: '/samples/english/wordsearch/Word Search 1.jpeg', alt: 'Mots mêlés', caption: 'Mots Mêlés' }
    ],
    youtubeId: '36keBFzJbPo',
    videoTitle: 'Présentation du Pack Lecture et Écriture',
  },

  hero: {
    title: 'Pack Lecture et Écriture',
    tagline: '7 générateurs pour les jeux de mots, la pratique d\'écriture et l\'apprentissage des langues',
    description: `Le Pack Lecture et Écriture réunit sept générateurs qui couvrent l'ensemble du spectre littéraire — de la reconnaissance des lettres pour les tout-petits aux puzzles de mots complexes pour les élèves plus âgés. Au lieu d'acheter chaque outil séparément pour 189 $ (27 $ × 7), obtenez tout pour 79 $ (Commercial) ou 119 $ (Accès Complet).

Le générateur de Train de l'Alphabet aide les plus jeunes à reconnaître et écrire les lettres. Les Mots Mêlés et Mots Croisés développent le vocabulaire et l'orthographe. Les Lettres Mélangées renforcent la conscience orthographique. Le générateur d'Écriture propose des lignes guidées pour la pratique manuscrite.

Chaque générateur supporte 11 langues, ce qui en fait un outil idéal pour les marchés multilingues. Les enseignants de FLE, les familles bilingues et les vendeurs internationaux trouvent dans ce pack tout ce dont ils ont besoin pour créer du matériel pédagogique de qualité.`,
  },

  appsIncluded: [
    {
      appId: 'alphabet-train',
      title: 'Train de l\'Alphabet',
      description: 'Créez des fiches d\'alphabet en forme de train. Les enfants apprennent les lettres en les associant à des images thématiques sur chaque wagon.',
    },
    {
      appId: 'wordsearch',
      title: 'Mots Mêlés',
      description: 'Générez des grilles de mots mêlés avec images ou listes personnalisées. Mode texte pour KDP, mode images pour les jeunes apprenants.',
    },
    {
      appId: 'word-scramble',
      title: 'Lettres Mélangées',
      description: 'Les élèves reconstituent des mots à partir de lettres mélangées. Renforce l\'orthographe et le vocabulaire de manière ludique.',
    },
    {
      appId: 'prepositions',
      title: 'Prépositions',
      description: 'Enseignez les prépositions de lieu avec des fiches illustrées. Sur, sous, devant, derrière, à côté de.',
    },
    {
      appId: 'word-guess',
      title: 'Deviner le Mot',
      description: 'Les enfants devinent le mot à partir d\'indices visuels. Développe le vocabulaire et l\'inférence.',
    },
    {
      appId: 'cryptogram',
      title: 'Cryptogrammes',
      description: 'Puzzles de substitution de lettres où les élèves décodent des messages en remplaçant les symboles par des lettres.',
    },
    {
      appId: 'writing',
      title: 'Écriture',
      description: 'Générez des fiches d\'écriture guidée avec lignes et modèles. Cursive et script pour tous les niveaux.',
    }
  ],

  bundleBenefits: [
    { title: 'Économie significative', description: 'Payez un prix unique au lieu d\'acheter chaque générateur séparément. Économisez plus de 50 % par rapport à l\'achat individuel.' },
    { title: 'Licence commerciale complète', description: 'Vendez les fiches créées sur Etsy, Amazon KDP, Teachers Pay Teachers, Gumroad et toute autre plateforme sans restriction.' },
    { title: 'Génération illimitée', description: 'Créez autant de fiches que vous voulez avec chaque générateur. Pas de limites mensuelles ni de système de crédits.' },
    { title: '104 thèmes illustrés', description: 'Accédez à la bibliothèque complète de 104 thèmes pour créer des fiches thématiques variées.' },
    { title: '11 langues supportées', description: 'Créez des fiches en français, anglais, allemand, espagnol, portugais, italien, néerlandais, suédois, danois, norvégien et finnois.' },
  ],

  businessUseCases: [
    { title: 'Créer un catalogue Etsy complet', description: 'Utilisez tous les générateurs pour créer un catalogue diversifié de fiches thématiques. La variété augmente la visibilité dans les recherches Etsy.', appsUsed: ["alphabet-train","wordsearch","word-scramble","prepositions","word-guess","cryptogram","writing"] },
    { title: 'Publier des cahiers KDP', description: 'Compilez des fiches de différents types en cahiers d\'activités de 50-100 pages pour Amazon KDP.', appsUsed: ["alphabet-train","wordsearch","word-scramble"] },
    { title: 'Packs enseignants TPT', description: 'Créez des packs multi-compétences pour Teachers Pay Teachers. Les packs variés se vendent mieux que les produits individuels.', appsUsed: ["alphabet-train","wordsearch","word-scramble","prepositions"] },
  ],

  faq: [
    { question: 'Que contient ce pack ?', answer: '7 générateurs professionnels avec licence commerciale, 104 thèmes illustrés, génération illimitée, corrigés automatiques et export PDF/JPEG.' },
    { question: 'Quelle est la différence entre Commercial et Accès Complet ?', answer: 'Le Pack Commercial (79 $) inclut tous les générateurs avec licence commerciale et thèmes populaires. Le Pack Accès Complet (119 $) ajoute les 104 thèmes et toutes les futures mises à jour.' },
    { question: 'Puis-je essayer avant d\'acheter ?', answer: 'Oui. Chaque générateur est disponible gratuitement avec un filigrane. Testez tous les outils sans inscription avant de décider.' },
    { question: 'La licence couvre-t-elle toutes les plateformes ?', answer: 'Oui. La licence commerciale couvre Etsy, Amazon KDP, TPT, Gumroad, votre propre site et toute autre plateforme. Aucune restriction.' },
    { question: 'Y a-t-il des frais récurrents ?', answer: 'Non. Le pack est un achat unique. Pas d\'abonnement, pas de frais mensuels, pas de renouvellement.' },
    { question: 'Combien de fiches puis-je créer ?', answer: 'Illimité. Créez autant de fiches que vous le souhaitez avec chaque générateur, sans limites ni crédits.' },
    { question: 'Les mises à jour sont-elles incluses ?', answer: 'Le Pack Accès Complet inclut toutes les futures mises à jour et nouveaux thèmes. Le Pack Commercial inclut les mises à jour de maintenance.' },
    { question: 'Quelle est votre politique de remboursement ?', answer: 'Toutes les ventes sont définitives en raison de la nature numérique. Testez les versions gratuites de chaque générateur avant d\'acheter.' },
  ],

  internalLinks: [
    { slug: 'alphabet-train', pageType: 'app' as const, anchorText: 'Train de l\'Alphabet' },
    { slug: 'wordsearch', pageType: 'app' as const, anchorText: 'Mots Mêlés' },
    { slug: 'word-scramble', pageType: 'app' as const, anchorText: 'Lettres Mélangées' },
    { slug: 'prepositions', pageType: 'app' as const, anchorText: 'Prépositions' },
    { slug: 'word-guess', pageType: 'app' as const, anchorText: 'Deviner le Mot' },
    { slug: 'cryptogram', pageType: 'app' as const, anchorText: 'Cryptogrammes' },
    { slug: 'writing', pageType: 'app' as const, anchorText: 'Écriture' }
  ],
};
