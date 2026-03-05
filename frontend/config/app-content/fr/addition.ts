import type { AppDetailContent } from '../types';

export const content: AppDetailContent = {
  appId: 'addition',
  locale: 'fr',
  category: 'math',

  seo: {
    titleTag: 'Générateur de Fiches d\'Addition | Créer des Fiches Gratuitement',
    metaDescription: 'Créez des fiches Fiches d\'Addition professionnelles en quelques secondes. 104 thèmes, éditeur canvas, export PDF. Générateur gratuit en ligne pour enseignants et vendeurs.',
    primaryKeyword: 'générateur fiches addition',
    secondaryKeywords: ["fiches addition avec images","exercices addition à imprimer","fiches de calcul maternelle","créer fiches addition","addition CP CE1"],
    lsiKeywords: ["calcul mental","mathématiques primaire","addition posée","nombres et calculs","numération maternelle","sommes jusqu'à 20","compléments à 10","manipulation mathématique"],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/addition/Addition Fun 1.jpeg',
      primaryAlt: 'Fiche d\'addition avec des images colorées d\'animaux pour l\'apprentissage visuel',
      secondary: '/samples/english/addition/Addition Fun 2.jpeg',
      secondaryAlt: 'Fiche d\'addition thème alimentation avec exercices de comptage visuels',
    },
    sampleGallery: [
      { src: '/samples/english/addition/Addition Fun 3.jpeg', alt: 'Fiche d\'addition avec images de véhicules et sommes jusqu\'à 10', caption: 'Thème véhicules, sommes jusqu\'à 10' },
      { src: '/samples/english/addition/Addition Fun 4.jpeg', alt: 'Fiche d\'addition mode mixte combinant images et nombres', caption: 'Mode mixte' },
      { src: '/samples/english/addition/Addition Fun 5.jpeg', alt: 'Trouver l\'addend manquant avec images de fruits', caption: 'Trouver l\'addend manquant' },
      { src: '/samples/english/addition/Addition Fun 6.jpeg', alt: 'Fiche d\'addition thème espace avec bordure étoilée', caption: 'Thème espace avec bordure' },
      { src: '/samples/english/addition/Addition Fun 7.jpeg', alt: 'Fiche d\'addition format paysage avec animaux marins', caption: 'Format paysage' },
      { src: '/samples/english/addition/Addition Fun 8.jpeg', alt: 'Corrigé automatique de la fiche d\'addition', caption: 'Corrigé automatique' }
    ],
    youtubeId: '6O5aCzHkh8M',
    videoTitle: 'Comment créer des fiches d\'addition avec images',
  },

  hero: {
    title: 'Générateur de Fiches d\'Addition',
    tagline: 'Transformez l\'addition en aventure visuelle avec des fiches de calcul illustrées',
    description: `Chaque enfant qui lutte avec l'addition partage le même problème : des chiffres abstraits sur une page qui ne signifient rien pour lui. Le Générateur de Fiches d'Addition remplace les équations nues par des problèmes illustrés colorés que les enfants veulent résoudre. Choisissez parmi 104 thèmes illustrés — animaux, véhicules, aliments, espace et des dizaines d'autres — puis regardez le générateur créer des fiches complètes avec corrigés automatiques en quelques secondes.

Quatre modes d'exercice distincts maintiennent la pratique variée. Le mode Image + Image montre des illustrations des deux côtés du signe plus, parfait pour les enfants qui apprennent à compter. Le mode Image + Nombre fait le lien entre le concret et l'abstrait. Le mode Trouver l'Addend demande aux élèves de raisonner à rebours. Le mode Mixte combine les trois pour une évaluation complète.

Vous contrôlez chaque détail : définissez les opérandes minimum et maximum de 1 à 99, choisissez le nombre de problèmes par page, sélectionnez le format et l'orientation, et optez pour l'une des 7 polices professionnelles. L'éditeur intégré vous permet d'ajouter du texte, d'ajuster les couleurs, de déplacer les éléments et de peaufiner la mise en page avant l'export. Chaque fiche s'exporte en JPEG haute résolution et en PDF prêt à imprimer, avec un corrigé généré automatiquement.

Que vous enseigniez les mathématiques en maternelle, animiez un groupe d'instruction en famille, ou vendiez des fiches éducatives sur Etsy et Amazon KDP, ce générateur produit des fiches de qualité professionnelle en une fraction du temps. La version gratuite inclut toutes les fonctionnalités avec un filigrane — essayez maintenant sans inscription.`,
  },

  howItWorks: {
    title: 'Créez votre fiche en 5 étapes',
    steps: [
      {
        title: 'Choisir le mode d\'exercice',
        description: 'Sélectionnez parmi quatre modes : Image + Image pour le comptage visuel, Image + Nombre pour la transition, Trouver l\'Addend pour le raisonnement inverse, ou Mixte pour une pratique variée.',
      },
      {
        title: 'Définir la plage de nombres',
        description: 'Utilisez les curseurs pour contrôler la difficulté. De 1 à 10 pour la maternelle, de 1 à 20 pour le CP, jusqu\'à 99 pour les élèves avancés.',
      },
      {
        title: 'Choisir un thème et une mise en page',
        description: 'Parcourez 104 thèmes par catégorie. Choisissez le format de page, l\'orientation et le nombre de problèmes par page. Sélectionnez parmi 7 polices.',
      },
      {
        title: 'Personnaliser dans l\'éditeur',
        description: 'Ajoutez des titres, changez les couleurs, appliquez des bordures décoratives et repositionnez les éléments pour une mise en page parfaite.',
      },
      {
        title: 'Exporter et imprimer',
        description: 'Téléchargez votre fiche en JPEG ou PDF haute résolution. Le corrigé s\'exporte automatiquement avec la même mise en page.',
      }
    ],
  },

  features: [
    {
      title: 'Quatre modes d\'exercice progressifs',
      description: 'Le mode Image + Image utilise des illustrations des deux côtés de l\'équation, idéal pour les non-lecteurs. Image + Nombre introduit les chiffres à côté des visuels. Trouver l\'Addend inverse le problème. Le mode Mixte combine les trois aléatoirement pour les évaluations.',
    },
    {
      title: 'Plage de nombres ajustable',
      description: 'Définissez les valeurs minimum et maximum pour chaque opérande. Créez des fiches ciblant les sommes jusqu\'à 5 pour la maternelle, jusqu\'à 20 pour le CP, ou jusqu\'à 99 pour les élèves plus avancés.',
    },
    {
      title: '104 thèmes illustrés',
      description: 'Chaque thème contient des images professionnelles qui apparaissent directement dans les problèmes. Animaux de la ferme, créatures marines, véhicules, fruits, instruments de musique et éléments saisonniers.',
    },
    {
      title: 'Éditeur canvas complet',
      description: 'Ajoutez du texte personnalisé avec police, taille et couleur ajustables. Changez l\'arrière-plan, appliquez des bordures, repositionnez les éléments et utilisez les contrôles de zoom et d\'annulation.',
    },
    {
      title: '7 polices professionnelles',
      description: 'Sept polices optimisées pour la lisibilité selon les âges. Des lettres larges pour les jeunes enfants aux styles plus compacts pour les élèves plus âgés.',
    },
    {
      title: 'Corrigés automatiques',
      description: 'Chaque fiche génère un corrigé avec la même mise en page, la même police et le même thème. Les réponses sont clairement affichées pour une correction rapide.',
    },
    {
      title: 'Double export : JPEG et PDF',
      description: 'Exportez en JPEG haute résolution pour le numérique ou en PDF prêt à imprimer. Le PDF est dimensionné pour A4, Letter ou format personnalisé.',
    },
    {
      title: 'Import d\'images personnalisées',
      description: 'Téléchargez vos propres images pour les utiliser dans les problèmes. Idéal pour le branding ou les visuels spécifiques à votre classe.',
    }
  ],

  businessUseCases: [
    {
      title: 'Vendre des packs d\'addition sur Etsy',
      description: 'Créez des packs thématiques — 10 fiches animaux, 10 fiches aliments, 10 fiches véhicules — et vendez-les en téléchargement instantané. Les acheteurs Etsy recherchent activement des fiches d\'addition avec images.',
      platform: 'Etsy',
    },
    {
      title: 'Publier des cahiers d\'activités sur Amazon KDP',
      description: 'Compilez des fiches PDF à différents niveaux de difficulté en cahiers de 50 à 100 pages. Un cahier \'Addition Maternelle avec Animaux\' cible des mots-clés à fort volume.',
      platform: 'Amazon KDP',
    },
    {
      title: 'Créer des ressources pour TPT',
      description: 'Les enseignants sur Teachers Pay Teachers recherchent des ressources prêtes à imprimer. Créez des packs différenciés : sommes jusqu\'à 5, jusqu\'à 10, jusqu\'à 20.',
      platform: 'Teachers Pay Teachers',
    },
    {
      title: 'Fiches saisonnières et fêtes',
      description: 'Utilisez les thèmes illustrés pour créer des collections spécifiques : citrouilles pour Halloween, flocons pour l\'hiver, cœurs pour la Saint-Valentin.',
      platform: 'Multi-plateforme',
    },
    {
      title: 'Programme de mathématiques pour l\'IEF',
      description: 'Structurez les fiches par semaine et difficulté pour créer un programme progressif d\'addition. 36 semaines de fiches pour les familles en instruction en famille.',
      platform: 'Gumroad',
    },
    {
      title: 'Lead magnets gratuits',
      description: 'Offrez un échantillon gratuit de 5 fiches en échange d\'inscriptions email. L\'échantillon démontre la qualité et dirige vers vos packs payants.',
      platform: 'Email Marketing',
    }
  ],

  faq: [
    {
      question: 'Quels modes d\'exercice propose le générateur d\'addition ?',
      answer: 'Le générateur inclut quatre modes : Image + Image (illustrations des deux côtés), Image + Nombre (image et chiffre), Trouver l\'Addend (identifier le nombre manquant), et Mixte (combinaison aléatoire des trois).',
    },
    {
      question: 'Puis-je contrôler le niveau de difficulté ?',
      answer: 'Oui. Définissez les valeurs minimum et maximum de 1 à 99. Pour la maternelle, essayez 1-10. Pour le CP, 1-20. Pour les plus grands, montez jusqu\'à 99.',
    },
    {
      question: 'Combien de thèmes illustrés sont disponibles ?',
      answer: 'L\'accès complet inclut les 104 thèmes : animaux, véhicules, aliments, nature, sports, musique, saisons et plus. Vous pouvez aussi importer vos propres images.',
    },
    {
      question: 'Quels formats de page sont supportés ?',
      answer: 'A4, Letter US (8.5 x 11 pouces) ou dimensions personnalisées. Orientations portrait et paysage. Export en JPEG haute résolution et PDF prêt à imprimer.',
    },
    {
      question: 'Les corrigés sont-ils générés automatiquement ?',
      answer: 'Oui. Chaque fiche produit un corrigé utilisant la même mise en page, le même thème et la même police. Le corrigé est un fichier séparé.',
    },
    {
      question: 'Puis-je utiliser ces fiches à des fins commerciales ?',
      answer: 'Oui. Le Pack Commercial et le Pack Accès Complet incluent une licence commerciale. Vendez vos fiches sur Etsy, Amazon KDP, TPT, Gumroad ou tout autre site.',
    },
    {
      question: 'Quelle est la différence entre Pack Commercial et Accès Complet ?',
      answer: 'Le Pack Commercial (27 $) inclut le générateur avec licence commerciale et les thèmes populaires. Le Pack Accès Complet (47 $) ajoute les 104 thèmes, les futures mises à jour et la bibliothèque d\'images complète.',
    },
    {
      question: 'Puis-je essayer avant d\'acheter ?',
      answer: 'Absolument. Le générateur est gratuit sans inscription. La version gratuite inclut toutes les fonctionnalités avec un petit filigrane sur les exports.',
    },
    {
      question: 'Quelles langues sont prises en charge ?',
      answer: 'L\'interface et les fiches supportent 11 langues : français, anglais, allemand, espagnol, portugais, italien, néerlandais, suédois, danois, norvégien et finnois.',
    },
    {
      question: 'Y a-t-il une limite au nombre de fiches ?',
      answer: 'Non. Les deux offres payantes incluent une génération illimitée. Aucune limite mensuelle ni système de crédits.',
    },
    {
      question: 'Quelle est votre politique de remboursement ?',
      answer: 'En raison de la nature numérique du produit, toutes les ventes sont définitives. Nous vous encourageons à utiliser la version gratuite pour tester toutes les fonctionnalités avant d\'acheter.',
    }
  ],

  internalLinks: [
    { slug: 'subtraction', pageType: 'app' as const, anchorText: 'Générateur de Fiches de Soustraction' },
    { slug: 'math-puzzle', pageType: 'app' as const, anchorText: 'Générateur de Puzzles Mathématiques' },
    { slug: 'chart-count', pageType: 'app' as const, anchorText: 'Générateur Compter et Colorier' },
    { slug: 'addition', pageType: 'tool' as const, anchorText: 'Essayer le Générateur d\'Addition Gratuit' },
    { slug: 'math-bundle', pageType: 'bundle' as const, anchorText: 'Pack Mathématiques Complet' }
  ],
};
