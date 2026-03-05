import type { AppDetailContent } from '../types';

export const content: AppDetailContent = {
  appId: 'subtraction',
  locale: 'fr',
  category: 'math',

  seo: {
    titleTag: 'Générateur de Fiches de Soustraction | Créer des Fiches Gratuitement',
    metaDescription: 'Créez des fiches Fiches de Soustraction professionnelles en quelques secondes. 104 thèmes, éditeur canvas, export PDF. Générateur gratuit en ligne pour enseignants et vendeurs.',
    primaryKeyword: 'générateur fiches soustraction',
    secondaryKeywords: ["fiches soustraction avec images","exercices soustraction à imprimer","soustraction maternelle CP","créer fiches soustraction","soustraction posée exercices"],
    lsiKeywords: ["retrancher","différence","calcul soustractif","complément","décomposition","technique opératoire","retenue soustraction","problèmes soustractifs"],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/subtraction/Subtraction Fun 1.jpeg',
      primaryAlt: 'Fiche de soustraction avec images colorées et mode barrer',
      secondary: '/samples/english/subtraction/Subtraction Fun 2.jpeg',
      secondaryAlt: 'Fiche de soustraction thème fruits avec exercices visuels',
    },
    sampleGallery: [
      { src: '/samples/english/subtraction/Subtraction Fun 1.jpeg', alt: 'Fiche de soustraction mode barrer avec animaux', caption: 'Mode barrer avec animaux' },
      { src: '/samples/english/subtraction/Subtraction Fun 2.jpeg', alt: 'Fiche de soustraction thème fruits', caption: 'Thème fruits' },
      { src: '/samples/english/subtraction/Subtraction Fun 3.jpeg', alt: 'Fiche soustraction mode Image + Nombre', caption: 'Mode Image + Nombre' },
      { src: '/samples/english/subtraction/Subtraction Fun 4.jpeg', alt: 'Fiche soustraction mode mixte', caption: 'Mode mixte' }
    ],
    youtubeId: '6O5aCzHkh8M',
    videoTitle: 'Comment créer des fiches de soustraction avec images',
  },

  hero: {
    title: 'Générateur de Fiches de Soustraction',
    tagline: 'Créez des fiches de soustraction visuelles avec le mode barrer pour un apprentissage intuitif',
    description: `Ce Générateur de Fiches de Soustraction transforme les exercices abstraits en une expérience visuelle captivante pour les enfants. Au lieu de fiches ennuyeuses, les élèves travaillent avec des illustrations colorées et thématiques — animaux, véhicules, aliments, espace et bien d'autres. Chaque fiche s'exporte en JPEG haute résolution et en PDF prêt à imprimer, avec un corrigé généré automatiquement.

Choisissez parmi 104 thèmes professionnellement illustrés et personnalisez chaque détail : format de page (Letter, A4 ou personnalisé), orientation (portrait ou paysage), polices et palette de couleurs. L'éditeur canvas intégré vous permet d'ajouter vos propres textes, de déplacer les éléments, d'ajuster les couleurs et d'appliquer des bordures — le tout avant l'export.

Que vous créiez des ressources pédagogiques pour votre classe, accompagniez l'instruction en famille, ou vendiez des fiches éducatives sur Etsy et Amazon KDP — ce générateur produit des fiches de qualité professionnelle en quelques secondes. La version gratuite inclut toutes les fonctionnalités avec un léger filigrane. Testez dès maintenant sans inscription ni carte bancaire.

Le Générateur de Fiches de Soustraction convient particulièrement à la création de supports différenciés. Les enseignants peuvent rapidement générer des fiches pour plusieurs niveaux de difficulté, tandis que les parents utilisent les matériaux pour le soutien scolaire. Vendez vos créations sur Etsy, Amazon KDP ou Teachers Pay Teachers et construisez un revenu passif avec des fiches éducatives imprimables.

Chaque export inclut automatiquement un corrigé, éliminant le temps passé à créer les solutions manuellement. Les 104 thèmes couvrent toutes les catégories populaires : animaux (ferme, safari, océan, dinosaures), véhicules, aliments, nature, espace, sports, musique, saisons et fêtes. Créez des packs thématiques qui séduisent les acheteurs.`,
  },

  howItWorks: {
    title: 'Créez votre fiche en 5 étapes',
    steps: [
      {
        title: 'Choisir le thème et le mode',
        description: 'Parcourez 104 thèmes illustrés et sélectionnez le mode d\'exercice adapté à vos objectifs pédagogiques.',
      },
      {
        title: 'Régler la difficulté',
        description: 'Ajustez les paramètres pour correspondre au niveau de vos élèves, de la maternelle au primaire.',
      },
      {
        title: 'Configurer la mise en page',
        description: 'Choisissez le format (A4, Letter), l\'orientation (portrait, paysage), le nombre d\'éléments par page et la police.',
      },
      {
        title: 'Personnaliser dans l\'éditeur',
        description: 'Utilisez l\'éditeur canvas pour ajouter des titres, ajuster les couleurs et positionner les éléments selon vos besoins.',
      },
      {
        title: 'Exporter et imprimer',
        description: 'Téléchargez en JPEG ou PDF haute résolution avec le corrigé généré automatiquement.',
      }
    ],
  },

  features: [
    {
      title: '104 thèmes illustrés',
      description: 'Choisissez parmi 104 thèmes professionnels couvrant animaux, véhicules, aliments, nature, sports, musique et événements saisonniers. Chaque thème produit des fiches visuellement uniques.',
    },
    {
      title: 'Éditeur canvas intégré',
      description: 'Ajoutez du texte personnalisé, changez les couleurs de fond, appliquez des bordures, repositionnez les éléments et ajustez la mise en page avant l\'export. Annulation et zoom disponibles.',
    },
    {
      title: 'Corrigés automatiques',
      description: 'Chaque fiche génère automatiquement un corrigé correspondant avec la même mise en page pour une correction rapide et fiable.',
    },
    {
      title: '7 polices professionnelles',
      description: 'Polices optimisées pour la lisibilité selon les âges, des lettres larges pour les jeunes enfants aux styles compacts pour les plus grands.',
    },
    {
      title: 'Export double : JPEG et PDF',
      description: 'Exportez en JPEG haute résolution pour le numérique ou en PDF prêt à imprimer. Formats A4, Letter et personnalisés en portrait ou paysage.',
    },
    {
      title: '11 langues supportées',
      description: 'Interface et contenu disponibles en français, anglais, allemand, espagnol, portugais, italien, néerlandais, suédois, danois, norvégien et finnois.',
    },
    {
      title: 'Import d\'images personnalisées',
      description: 'Téléchargez vos propres images pour les utiliser dans les fiches. Idéal pour le branding, les visuels spécifiques ou les images de votre classe.',
    },
    {
      title: 'Génération illimitée',
      description: 'Créez autant de fiches que vous le souhaitez. Chaque génération produit un contenu unique et aléatoire, vous ne manquerez jamais de variété.',
    }
  ],

  businessUseCases: [
    {
      title: 'Vendre des packs thématiques sur Etsy',
      description: 'Créez des packs de 10-20 fiches Fiches de Soustraction thématiques et vendez-les en téléchargement instantané sur Etsy.',
      platform: 'Etsy',
    },
    {
      title: 'Publier des cahiers d\'activités sur Amazon KDP',
      description: 'Compilez vos fiches en cahiers de 50-100 pages et publiez-les sur Amazon KDP. Les cahiers d\'activités éducatifs se vendent bien toute l\'année.',
      platform: 'Amazon KDP',
    },
    {
      title: 'Créer des ressources pour TPT',
      description: 'Teachers Pay Teachers est la référence pour les enseignants. Créez des packs différenciés par niveau et vendez-les en téléchargement numérique.',
      platform: 'Teachers Pay Teachers',
    },
    {
      title: 'Collections saisonnières',
      description: 'Utilisez les thèmes saisonniers pour créer des collections spéciales Noël, Halloween, Pâques et rentrée scolaire.',
      platform: 'Multi-plateforme',
    }
  ],

  faq: [
    {
      question: 'Le Générateur de Fiches de Soustraction est-il vraiment gratuit ?',
      answer: 'Oui. La version gratuite inclut toutes les fonctionnalités avec un petit filigrane sur les exports. Aucune inscription nécessaire.',
    },
    {
      question: 'Pour quel âge ces fiches sont-elles conçues ?',
      answer: 'Les fiches sont conçues pour les enfants de 3 à 8 ans, de la maternelle au CE2. Les paramètres permettent d\'adapter la difficulté.',
    },
    {
      question: 'Puis-je vendre les fiches créées ?',
      answer: 'Oui, avec le Pack Commercial (27 $) ou le Pack Accès Complet (47 $). La licence commerciale permet la vente sur Etsy, Amazon KDP, TPT et toute autre plateforme.',
    },
    {
      question: 'Quels formats d\'export sont disponibles ?',
      answer: 'JPEG haute résolution et PDF prêt à imprimer. Formats A4, Letter US et personnalisés en portrait ou paysage.',
    },
    {
      question: 'Combien de thèmes sont disponibles ?',
      answer: '104 thèmes illustrés couvrant animaux, véhicules, aliments, nature, fêtes et bien plus. Vous pouvez aussi importer vos propres images.',
    },
    {
      question: 'Les corrigés sont-ils inclus ?',
      answer: 'Oui. Chaque fiche génère automatiquement un corrigé avec la même mise en page pour une correction rapide.',
    },
    {
      question: 'Quelles langues sont supportées ?',
      answer: '11 langues : français, anglais, allemand, espagnol, portugais, italien, néerlandais, suédois, danois, norvégien et finnois.',
    },
    {
      question: 'Y a-t-il une limite de génération ?',
      answer: 'Non. Les packs payants incluent une génération illimitée sans limites mensuelles ni crédits.',
    },
    {
      question: 'Quelle est la différence entre Pack Commercial et Accès Complet ?',
      answer: 'Le Pack Commercial (27 $) retire le filigrane et accorde la licence commerciale. Le Pack Accès Complet (47 $) ajoute les 104 thèmes et toutes les futures mises à jour.',
    },
    {
      question: 'Puis-je essayer avant d\'acheter ?',
      answer: 'Absolument. La version gratuite fonctionne sans inscription avec toutes les fonctionnalités. Seul un filigrane est ajouté aux exports.',
    },
    {
      question: 'Quelle est votre politique de remboursement ?',
      answer: 'Toutes les ventes sont définitives en raison de la nature numérique du produit. Testez la version gratuite avant d\'acheter.',
    }
  ],

  internalLinks: [
    { slug: 'addition', pageType: 'app' as const, anchorText: 'Générateur de Fiches d\'Addition' },
    { slug: 'code-addition', pageType: 'app' as const, anchorText: 'Générateur de Code Addition' },
    { slug: 'more-less', pageType: 'app' as const, anchorText: 'Générateur Plus ou Moins' },
    { slug: 'subtraction', pageType: 'tool' as const, anchorText: 'Essayer Générateur de Fiches de Soustraction Gratuit' },
    { slug: 'math-bundle', pageType: 'bundle' as const, anchorText: 'Pack Mathématiques Complet' }
  ],
};
