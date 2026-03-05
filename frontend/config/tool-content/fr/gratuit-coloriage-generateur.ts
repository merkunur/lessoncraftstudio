import type { FreeToolContent } from '../types';

export const content: FreeToolContent = {
  appId: 'coloring',
  locale: 'fr',

  seo: {
    titleTag: 'Générateur Gratuit de Coloriages | PDF Imprimables',
    metaDescription: 'Créez des fiches de coloriages gratuites en PDF en quelques secondes. 104 thèmes, corrigés inclus. Aucune inscription requise — téléchargez instantanément.',
    primaryKeyword: 'générateur gratuit coloriages',
    secondaryKeywords: ["coloriages à imprimer gratuit","pages coloriage enfants PDF","coloriage thématique gratuit","créer coloriages personnalisés","coloriage éducatif imprimable"],
    lsiKeywords: ["coloriage","dessin","illustration","motricité fine","créativité","arts plastiques","concentration","détente"],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/coloring/Coloring 1.jpeg',
      primaryAlt: 'Page coloriage gratuite',
    },
    sampleGallery: [
      { src: '/samples/english/coloring/Coloring 1.jpeg', alt: 'Coloriage thématique', caption: 'Coloriage à imprimer' }
    ],
    youtubeId: 'gQEk7dPTZUA',
    videoTitle: 'Comment créer des fiches de coloriages gratuitement',
  },

  hero: {
    title: 'Générateur Gratuit de Coloriages',
    tagline: 'Créez des fiches de coloriages et téléchargez-les instantanément — aucune inscription requise',
    description: `Ce générateur gratuit de fiches de coloriages transforme les exercices abstraits en une expérience visuelle engageante que les enfants apprécient réellement. Au lieu de fixer des éléments sans contexte, les élèves travaillent avec des images colorées — animaux, véhicules, aliments, dinosaures et plus de 100 autres thèmes — pour résoudre les exercices à leur propre rythme. Chaque fiche s'exporte en PDF prêt à imprimer avec un corrigé correspondant, prêt pour votre classe, votre leçon d'instruction en famille ou votre boutique de produits numériques.

Vous contrôlez chaque aspect de la fiche : difficulté, nombre d'éléments par page, orientation, polices et styles de bordure. L'éditeur canvas intégré vous permet de déplacer les éléments, d'ajouter des titres et d'ajuster les couleurs avant l'export. La version gratuite inclut toutes les fonctionnalités avec un petit filigrane. Passez au Pack Commercial pour retirer le filigrane et vendre vos créations sur Etsy, Amazon KDP ou Teachers Pay Teachers.`,
  },

  whatYouCanCreate: [
    {
      title: 'Fiches thématiques illustrées',
      description: 'Générez des fiches de coloriages autour de n\'importe quel thème — animaux, espace, océan, fêtes — avec des images assorties qui captent l\'attention des jeunes apprenants.',
    },
    {
      title: 'Packs de pratique différenciés',
      description: 'Construisez un ensemble de fiches à difficulté croissante. Commencez par le niveau facile pour les débutants et progressez vers des défis plus complexes pour les élèves avancés.',
    },
    {
      title: 'Fiches d\'\u00e9valuation avec corrigés',
      description: 'Créez des fiches qui testent plusieurs compétences sur une même page. Chaque fiche inclut un corrigé automatique pour une correction rapide.',
    },
    {
      title: 'Activités du matin',
      description: 'Produisez une semaine de fiches rapides en quelques minutes. Imprimez-les à l\'avance pour des activités d\'accueil quotidiennes.',
    },
    {
      title: 'Cahiers imprimables pour Etsy',
      description: 'Combinez plusieurs fiches thématiques en un cahier téléchargeable en PDF. Vendez des packs saisonniers comme produits numériques.',
    },
    {
      title: 'Devoirs et travail à la maison',
      description: 'Envoyez des fiches engageantes que les parents peuvent utiliser sans préparation. Le format visuel permet aux enfants de travailler en autonomie.',
    },
  ],

  tutorial: {
    title: 'Comment créer des fiches de coloriages en 10 étapes',
    steps: [
      { title: 'Ouvrir le générateur gratuit', description: 'Cliquez sur le bouton "Essayer Gratuitement" sur cette page pour lancer le générateur directement dans votre navigateur. Aucun compte ni téléchargement nécessaire.' },
      { title: 'Choisir votre langue', description: 'Sélectionnez parmi 11 langues dans le menu. L\'interface, les instructions et les libellés des fiches changent automatiquement.' },
      { title: 'Choisir un thème', description: 'Parcourez le menu déroulant pour choisir parmi 104 catégories illustrées — animaux, aliments, véhicules, fêtes et plus.' },
      { title: 'Sélectionner le mode d\'exercice', description: 'Choisissez le mode adapté au niveau de vos élèves et à vos objectifs pédagogiques.' },
      { title: 'Régler la difficulté', description: 'Ajustez les paramètres pour contrôler le niveau de complexité des exercices.' },
      { title: 'Configurer la mise en page', description: 'Définissez le nombre d\'\u00e9léments par page, choisissez portrait ou paysage, sélectionnez le format (A4, Letter) et la police.' },
      { title: 'Générer la fiche', description: 'Cliquez sur le bouton de génération. L\'outil crée votre fiche et son corrigé en quelques secondes.' },
      { title: 'Éditer dans le canvas', description: 'Utilisez l\'\u00e9diteur intégré pour ajouter du texte, changer les couleurs, repositionner les éléments ou ajouter des bordures.' },
      { title: 'Télécharger en PDF ou JPEG', description: 'Exportez en PDF haute résolution pour l\'impression ou en JPEG pour le numérique. Le corrigé s\'exporte séparément.' },
      { title: 'Imprimer ou vendre', description: 'Imprimez pour votre classe, partagez numériquement avec les parents, ou vendez sur Etsy, Amazon KDP ou TPT.' },
    ],
  },

  businessIdeas: [
    { title: 'Série de cahiers thématiques', description: 'Créez des cahiers de 20 pages organisés par thème (animaux, véhicules, aliments). Vendez chacun entre 3 et 5 euros en téléchargement instantané.', platform: 'Etsy' },
    { title: 'Pack de pratique différencié', description: 'Construisez un pack avec des fiches à 3 niveaux de difficulté (facile, moyen, difficile). Les enseignants adorent la différenciation prête à l\'emploi.', platform: 'Teachers Pay Teachers' },
    { title: 'Cahiers d\'activités low-content', description: 'Compilez 50 à 100 fiches en cahier d\'activités broché. Amazon KDP gère l\'impression et l\'expédition.', platform: 'Amazon KDP' },
    { title: 'Packs saisonniers', description: 'Créez des packs spéciaux fêtes (Halloween, Noël, Saint-Valentin, Pâques). Les produits saisonniers génèrent des ventes prévisibles.', platform: 'Gumroad' },
    { title: 'Supplément programme IEF', description: 'Concevez un programme structuré de 30 jours progressant en difficulté. Vendez-le comme complément pour les familles en instruction en famille.', platform: 'Etsy' },
    { title: 'Fiches multilingues', description: 'Utilisez les 11 langues pour créer des fiches pour les classes de FLE et les familles bilingues. Les marchés non anglophones ont moins de concurrence.', platform: 'Multi-plateforme' },
  ],

  proTips: [
    { title: 'Commencer par le niveau le plus simple', tip: 'Pour les enfants de maternelle, utilisez le mode le plus simple. Ils peuvent s\'exercer sans aide, ce qui est parfait pour les 3-4 ans.' },
    { title: 'Adapter le thème au programme', tip: 'Si vous étudiez les animaux de la mer, générez des fiches avec le thème océan pour que la pratique renforce votre unité pédagogique.' },
    { title: 'Imprimer les corrigés sur papier coloré', tip: 'Imprimez le corrigé sur un papier d\'une couleur différente. La vérification est plus rapide et les élèves ne prennent pas le corrigé par erreur.' },
    { title: 'Générer par lot pour la semaine', tip: 'Créez cinq fiches en une session — une par jour — avec une difficulté légèrement croissante. Sauvegardez le tout en un seul PDF.' },
    { title: 'Mode paysage pour les plus jeunes', tip: 'L\'orientation paysage donne plus d\'espace horizontal, plus facile pour les petites mains.' },
    { title: 'Combiner thèmes pour les packs variété', tip: 'Pour vendre sur Etsy, créez un pack de 50 fiches utilisant 10 thèmes différents. La variété augmente la valeur perçue.' },
    { title: 'Utiliser l\'\u00e9diteur pour personnaliser', tip: 'Ajoutez le nom de l\'\u00e9lève, le logo de votre boutique ou des instructions personnalisées grâce à l\'\u00e9diteur canvas avant l\'export.' },
  ],

  faq: [
    { question: 'Ce générateur de coloriages est-il vraiment gratuit ?', answer: 'Oui. La version gratuite inclut toutes les fonctionnalités — tous les modes, les 104 thèmes, l\'export PDF et les corrigés. La seule différence est un petit filigrane sur les fichiers exportés. Utilisez la version gratuite indéfiniment sans créer de compte.' },
    { question: 'Pour quel âge ces fiches sont-elles conçues ?', answer: 'Les fiches sont conçues pour les enfants de 3 à 8 ans (maternelle au CE2). Les paramètres permettent d\'adapter la difficulté à chaque niveau.' },
    { question: 'Puis-je vendre les fiches créées ?', answer: 'Avec la version gratuite, les fiches sont pour un usage personnel ou en classe. Le Pack Commercial (27 $) retire le filigrane et accorde une licence commerciale complète pour vendre sur Etsy, Amazon KDP, TPT ou tout autre site.' },
    { question: 'Quels formats de fichiers puis-je télécharger ?', answer: 'JPEG haute résolution et PDF prêt à imprimer. Le corrigé s\'exporte comme fichier séparé dans le même format.' },
    { question: 'Combien de thèmes sont disponibles ?', answer: 'La version gratuite inclut une sélection de thèmes. Le Pack Accès Complet (47 $) débloque les 104 thèmes illustrés couvrant animaux, aliments, véhicules, fêtes et bien plus.' },
    { question: 'Puis-je personnaliser les fiches après génération ?', answer: 'Oui. L\'\u00e9diteur canvas intégré permet d\'ajouter du texte, de changer les polices et couleurs, de repositionner les éléments et d\'ajouter des bordures avant l\'export.' },
    { question: 'Les corrigés sont-ils inclus ?', answer: 'Chaque fiche génère automatiquement un corrigé correspondant. Le corrigé utilise la même mise en page avec les solutions clairement indiquées.' },
    { question: 'Puis-je les utiliser pour l\'instruction en famille ?', answer: 'Absolument. Le générateur est populaire auprès des familles en IEF car il permet de créer des fiches fraîches quotidiennement sans répéter les mêmes exercices.' },
    { question: 'Quelle différence entre Pack Commercial et Accès Complet ?', answer: 'Le Pack Commercial (27 $) retire le filigrane et accorde la licence commerciale. Le Pack Accès Complet (47 $) inclut tout le Pack Commercial plus la bibliothèque complète de 104 thèmes.' },
    { question: 'Quelle est votre politique de remboursement ?', answer: 'Toutes les ventes sont définitives en raison de la nature numérique du produit. Utilisez la version gratuite pour tout tester avant d\'acheter.' },
  ],

  internalLinks: [
    { slug: 'gratuit-coloriage-generateur', pageType: 'tool' as const, anchorText: 'Générateur Gratuit de Coloriages' },
    { slug: 'coloring', pageType: 'app' as const, anchorText: 'Générateur de Coloriages — Détails complets' },
  ],
};
