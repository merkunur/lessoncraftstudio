import type { BundleContent } from '../types';

export const content: BundleContent = {
  bundleId: 'visual-bundle',
  locale: 'fr',

  seo: {
    titleTag: 'Pack Apprentissage Visuel | 7 Générateurs pour 79 $',
    metaDescription: 'Obtenez 7 générateurs professionnels en un seul pack. Économisez plus de 50 % par rapport à l\'achat individuel. Licence commerciale incluse.',
    primaryKeyword: 'pack fiches apprentissage visuel',
    secondaryKeywords: ["générateurs visuels éducatifs","fiches coloriage imprimables pack","coffret activités visuelles","outils graphisme maternelle","pack dessin éducatif"],
    lsiKeywords: ["coloriage","dessin guidé","motifs","graphisme","perception visuelle","motricité fine","comparaison tailles","traçage"],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/coloring/Coloring 1.jpeg',
      primaryAlt: 'Page de coloriage thématique',
    },
    sampleGallery: [
      { src: '/samples/english/coloring/Coloring 1.jpeg', alt: 'Coloriage', caption: 'Coloriage thématique' }
    ],
    youtubeId: 'gQEk7dPTZUA',
    videoTitle: 'Présentation du Pack Apprentissage Visuel',
  },

  hero: {
    title: 'Pack Apprentissage Visuel',
    tagline: '7 générateurs pour le dessin, le coloriage, les motifs et la perception visuelle',
    description: `Le Pack Apprentissage Visuel combine sept générateurs qui développent les compétences visuelles, la motricité fine et la créativité — des fondamentaux essentiels pour tous les apprentissages. Obtenez sept outils pour 79 $ au lieu de 189 $ séparément.

Les coloriages sont les produits imprimables les plus vendus sur Etsy. Ajoutez les fiches de motifs, le dessin guidé, le traçage et la comparaison de tailles pour créer un catalogue complet d'activités visuelles. Le Pack Apprentissage Visuel est particulièrement adapté aux vendeurs ciblant la maternelle et la petite section, où la demande en activités visuelles est la plus forte.`,
  },

  appsIncluded: [
    {
      appId: 'big-small',
      title: 'Grand et Petit',
      description: 'Fiches de comparaison de tailles avec images illustrées. Les enfants identifient le plus grand et le plus petit.',
    },
    {
      appId: 'pattern-train',
      title: 'Train de Motifs',
      description: 'Suites logiques en forme de train. Les enfants complètent la séquence en identifiant le motif répétitif.',
    },
    {
      appId: 'pattern-worksheet',
      title: 'Fiches de Motifs',
      description: 'Reconnaissance et complétion de motifs visuels. Développe le raisonnement logique et la pensée mathématique.',
    },
    {
      appId: 'draw-and-color',
      title: 'Dessiner et Colorier',
      description: 'Fiches de dessin guidé et coloriage avec thèmes illustrés. Combine créativité et motricité fine.',
    },
    {
      appId: 'drawing-lines',
      title: 'Traçage de Lignes',
      description: 'Exercices de graphisme pour tracer des lignes entre images. Préparation à l\'écriture et développement de la coordination.',
    },
    {
      appId: 'coloring',
      title: 'Pages de Coloriage',
      description: 'Pages de coloriage thématiques avec 104 thèmes. Les coloriages sont les produits les plus vendus en volume.',
    },
    {
      appId: 'chart-count',
      title: 'Compter et Colorier',
      description: 'Graphiques à compléter en comptant et coloriant. Initiation à la lecture de données et aux statistiques.',
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
    { title: 'Créer un catalogue Etsy complet', description: 'Utilisez tous les générateurs pour créer un catalogue diversifié de fiches thématiques. La variété augmente la visibilité dans les recherches Etsy.', appsUsed: ["big-small","pattern-train","pattern-worksheet","draw-and-color","drawing-lines","coloring","chart-count"] },
    { title: 'Publier des cahiers KDP', description: 'Compilez des fiches de différents types en cahiers d\'activités de 50-100 pages pour Amazon KDP.', appsUsed: ["big-small","pattern-train","pattern-worksheet"] },
    { title: 'Packs enseignants TPT', description: 'Créez des packs multi-compétences pour Teachers Pay Teachers. Les packs variés se vendent mieux que les produits individuels.', appsUsed: ["big-small","pattern-train","pattern-worksheet","draw-and-color"] },
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
    { slug: 'big-small', pageType: 'app' as const, anchorText: 'Grand et Petit' },
    { slug: 'pattern-train', pageType: 'app' as const, anchorText: 'Train de Motifs' },
    { slug: 'pattern-worksheet', pageType: 'app' as const, anchorText: 'Fiches de Motifs' },
    { slug: 'draw-and-color', pageType: 'app' as const, anchorText: 'Dessiner et Colorier' },
    { slug: 'drawing-lines', pageType: 'app' as const, anchorText: 'Traçage de Lignes' },
    { slug: 'coloring', pageType: 'app' as const, anchorText: 'Pages de Coloriage' },
    { slug: 'chart-count', pageType: 'app' as const, anchorText: 'Compter et Colorier' }
  ],
};
