import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Big Small Worksheets - French Content
 *
 * File: frontend/content/product-pages/fr/big-small-worksheets.ts
 * URL: /fr/apps/grand-petit-fiches (French SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/French/big-small.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 *
 * Pricing Tier: Accès Complet (Accès Complet) - 240€/year
 */

export const bigSmallFrContent: ProductPageContent = {
  // SEO Metadata - French language-specific
  seo: {
    slug: 'grand-petit-fiches',
    appId: 'big-small-app',
    title: 'Fiches Grand et Petit à Imprimer Gratuit - Exercices CP et Fiches Maternelle pour Comparer les Tailles',
    description: 'Créez des fiches pédagogiques pour enseigner les notions de grand et petit à vos élèves. Votre abonnement Accès Complet vous donne accès à la création illimitée de fiches sans frais supplémentaires. Générez des exercices de comparaison de tailles en moins de 3 minutes.',
    keywords: 'fiches grand et petit, fiches maternelle, fiches à imprimer gratuit, exercices CP, exercices CE1, exercices maths, graphisme maternelle, coloriage à imprimer, apprendre à lire, comparaison de tailles',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fr/apps/grand-petit-fiches',
  },

  // Hero Section - FULL text from big-small.md paragraphs 1-3
  hero: {
    title: 'Fiches Grand et Petit à Imprimer',
    subtitle: 'Exercices CP et Fiches Maternelle pour Comparer les Tailles',
    description: `Créez des fiches pédagogiques pour enseigner les notions de grand et petit à vos élèves. Votre abonnement Accès Complet vous donne accès à la création illimitée de fiches sans frais supplémentaires. Générez des exercices de comparaison de tailles en moins de 3 minutes. Téléchargez des fichiers PDF haute résolution prêts à imprimer.

Les exercices de comparaison de tailles sont essentiels au développement cognitif des enfants. Cette compétence mathématique fondamentale prépare les élèves aux concepts de mesure et de numération. Notre générateur de fiches simplifie la création de ces activités pédagogiques.

Les fiches de comparaison de tailles conviennent parfaitement aux classes de maternelle. De la Petite Section à la Grande Section, les enfants apprennent à distinguer le grand du petit. Ces exercices développent le sens de l'observation et la discrimination visuelle.`,
    previewImageSrc: '/samples/english/big small/big-small-different images.jpeg',
    ctaLabels: {
      tryFree: 'Essayer Gratuitement',
      viewSamples: 'Voir les Exemples',
    },
    trustBadges: {
      languages: '11 Langues',
      images: '3000+ Images',
      license: 'Licence Commerciale',
    },
    readMoreLabel: 'Lire la suite',
    showLessLabel: 'Voir moins',
    floatingStats: {
      time: '3 min',
      action: 'Créer & Télécharger',
      quality: '300 DPI',
    },
  },

  // Sample Gallery - REAL file paths from samples/english/big small/
  samples: {
    sectionTitle: 'Exemples de Fiches Grand et Petit',
    sectionDescription: 'Téléchargez des exemples gratuits pour voir notre qualité professionnelle',
    downloadLabel: 'Télécharger Exemple Gratuit',
    worksheetLabel: 'Fiche Grand et Petit',
    answerKeyLabel: 'Clé de Correction',
    viewAllLabel: 'Agrandir',
    noPdfLabel: 'Aperçu uniquement',
    freePdfCountLabel: 'téléchargements gratuits',
    badgeText: 'Exemples Gratuits',
    downloadingLabel: 'Téléchargement...',
    ofLabel: 'sur',
    items: [
      {
        id: '1',
        worksheetSrc: '/samples/english/big small/big-small-different images.jpeg',
        answerKeySrc: '/samples/english/big small/big-small-different images answer_key.jpeg',
        altText: 'Fiche grand et petit avec images différentes pour comparaison de tailles maternelle',
        pdfDownloadUrl: '/samples/english/big small/big-small-different images.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/english/big small/big-small identical images.jpeg',
        answerKeySrc: '/samples/english/big small/big-small identical images answer_key.jpeg',
        altText: 'Exercice de comparaison avec images identiques de tailles variées pour CP',
        pdfDownloadUrl: '/samples/english/big small/big-small identical images.pdf',
      },
      {
        id: '3',
        worksheetSrc: '/samples/english/big small/big-small number 1-2-3.jpeg',
        answerKeySrc: '/samples/english/big small/big-small number 1-2-3 answer_key.jpeg',
        altText: 'Fiche de classement par taille avec numérotation 1-2-3 pour exercices maths',
        pdfDownloadUrl: '/samples/english/big small/big-small number 1-2-3.pdf',
      },
    ],
  },

  // Features Grid - FULL text from big-small.md feature sections
  features: {
    sectionTitle: 'Fonctionnalités du Générateur de Fiches Grand et Petit - Tout pour Créer des Fiches Maternelle et Exercices CP',
    sectionDescription: 'Notre générateur de fiches grand et petit offre des fonctionnalités complètes pour les enseignants. Créez des exercices de comparaison de tailles adaptés à tous les niveaux. De la maternelle au CP, chaque fiche répond aux besoins pédagogiques spécifiques. Découvrez les sept fonctionnalités principales qui font de cet outil un incontournable pour votre classe.',
    highlightBadgeText: 'Fonctionnalité Clé',
    readMoreLabel: 'Lire la suite',
    showLessLabel: 'Voir moins',
    badgeText: 'Fonctionnalités',
    trustBadges: {
      allFeatures: 'Toutes les fonctionnalités incluses',
      noHiddenFees: 'Aucun frais caché',
      cancelAnytime: 'Annulez à tout moment',
    },
    items: [
      {
        id: '1',
        icon: '⚡',
        title: 'Création Facile de Fiches Maternelle en 3 Clics - Exercices CP Prêts en Moins de 3 Minutes',
        description: `La création de fiches maternelle n'a jamais été aussi simple. Sélectionnez un thème d'images parmi notre bibliothèque. Choisissez le nombre d'exercices souhaité. Cliquez sur générer. Votre fiche apparaît instantanément sur l'écran.

Le générateur propose cinq types de questions différents. Les élèves peuvent entourer le plus grand ou le plus petit. Ils peuvent aussi classer les images du plus petit au plus grand. Cette variété maintient l'intérêt des enfants tout au long de l'année.

Chaque exercice CP se génère automatiquement avec des images de tailles différentes. L'algorithme garantit des écarts de taille clairement visibles. Les enfants distinguent facilement le grand du petit sur chaque fiche à imprimer.`,
        highlighted: true,
      },
      {
        id: '2',
        icon: '✏️',
        title: 'Personnalisation Complète des Fiches à Imprimer Gratuit - Modifiez Chaque Élément sur le Canevas',
        description: `Toutes les fiches à imprimer gratuit sont entièrement personnalisables. Déplacez les images où vous le souhaitez. Redimensionnez les éléments selon vos besoins. Faites pivoter les objets pour créer des compositions uniques.

Le canevas d'édition fonctionne par glisser-déposer. Aucune compétence technique n'est requise. Ajoutez du texte personnalisé pour les consignes. Modifiez les couleurs et les polices en un clic.

Les fiches maternelle peuvent inclure un espace pour le nom et la date. Cette option s'active d'une simple case à cocher. Vos fiches sont prêtes pour la distribution en classe.`,
        highlighted: false,
      },
      {
        id: '3',
        icon: '📤',
        title: 'Importez Vos Propres Images pour des Fiches Maternelle Personnalisées - Coloriage à Imprimer avec Photos de Classe',
        description: `Téléchargez vos propres images pour créer des fiches uniques. Utilisez des photos de la classe ou des images thématiques. Combinez vos images avec celles de notre bibliothèque. Cette flexibilité permet de créer du coloriage à imprimer personnalisé.

L'importation accepte tous les formats courants. JPEG, PNG et GIF sont pris en charge. Téléchargez plusieurs fichiers en une seule opération. Vos images restent disponibles pendant toute la session.

Les fiches maternelle personnalisées captivent davantage les élèves. Ils reconnaissent les objets familiers de leur environnement. L'apprentissage devient plus concret et significatif.`,
        highlighted: false,
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Support de 11 Langues pour Exercices Maths et Graphisme Maternelle - Interface en Français',
        description: `Notre générateur d'exercices maths fonctionne en 11 langues. L'interface utilisateur s'affiche entièrement en français. La bibliothèque d'images propose des noms dans votre langue. Cette fonctionnalité facilite le graphisme maternelle multilingue.

Les 11 langues disponibles incluent le français, l'allemand, l'espagnol et l'italien. Le portugais, le néerlandais et les langues scandinaves sont aussi proposés. Changez de langue d'un simple clic dans le menu.

Pour les classes bilingues, créez des fiches dans plusieurs langues. Les exercices de calcul et de comparaison fonctionnent dans toutes les langues. Idéal pour l'enseignement des langues vivantes dès la maternelle.`,
        highlighted: false,
      },
      {
        id: '5',
        icon: '💰',
        title: 'Licence Commerciale Incluse pour Vendre vos Fiches à Imprimer - Exercices CP sur Teachers Pay Teachers',
        description: `Votre abonnement Accès Complet inclut une licence commerciale complète. Vendez vos fiches à imprimer sur Teachers Pay Teachers. Créez une boutique Etsy de ressources pédagogiques. Publiez sur Amazon KDP sans frais supplémentaires.

Les exercices CP que vous créez vous appartiennent entièrement. Aucune attribution n'est requise lors de la vente. La qualité 300 DPI garantit des impressions professionnelles. Vos clients apprécieront la netteté des images.

De nombreux enseignants génèrent des revenus complémentaires. Certains gagnent entre 500 et 5000 euros par mois. Vos fiches maternelle peuvent devenir une source de revenus passive.`,
        highlighted: true,
      },
      {
        id: '6',
        icon: '🎨',
        title: 'Bibliothèque de Plus de 3000 Images pour Coloriage et Exercices Maths - Thèmes Variés pour Fiches Maternelle',
        description: `Notre bibliothèque contient plus de 3000 images adaptées aux enfants. Chaque image convient parfaitement au coloriage à imprimer. Les thèmes variés couvrent les animaux, les véhicules et la nature. Les objets du quotidien et les aliments sont également disponibles.

Les images sont organisées par thèmes pour faciliter la recherche. Utilisez la barre de recherche pour trouver des images spécifiques. Sélectionnez un thème entier pour une génération automatique. Les exercices maths utilisent des images attrayantes et claires.

Les arrière-plans et les bordures sont inclus dans la bibliothèque. Ajoutez un cadre décoratif à vos fiches maternelle. Les thèmes saisonniers permettent de varier les supports tout au long de l'année.`,
        highlighted: false,
      },
      {
        id: '7',
        icon: '📊',
        title: 'Qualité Professionnelle 300 DPI pour Fiches à Imprimer Gratuit - Exercices CP et CE1 Prêts à Distribuer',
        description: `Chaque fiche à imprimer gratuit s'exporte en qualité professionnelle. La résolution de 300 DPI garantit des impressions nettes. Les images restent parfaitement claires même en grand format. Vos exercices CP et CE1 ont un aspect professionnel.

Téléchargez vos fiches en format PDF ou JPEG. Le format PDF convient parfaitement à l'impression. Le format JPEG s'utilise pour les présentations numériques. L'option noir et blanc économise l'encre de votre imprimante.

Les corrigés se génèrent automatiquement. Un clic suffit pour créer la fiche réponse. Les solutions apparaissent clairement avec des coches vertes. Gagnez du temps sur la correction des exercices.`,
        highlighted: false,
      },
      {
        id: '8',
        icon: '✍️',
        title: 'Écriture et Graphisme Maternelle sur le Même Support - Ajoutez du Texte à vos Fiches à Imprimer',
        description: `Combinez l'écriture avec les exercices de comparaison de tailles. Ajoutez des consignes personnalisées à vos fiches. Les élèves pratiquent la lecture tout en comparant les tailles. Cette approche intégrée renforce plusieurs compétences simultanément.

Le graphisme maternelle s'enrichit avec des titres et des instructions. Choisissez parmi cinq polices adaptées aux enfants. Modifiez la taille et la couleur du texte. Ajoutez un contour pour une meilleure lisibilité.

Les fiches à imprimer deviennent de véritables supports pédagogiques complets. L'écriture et la discrimination visuelle se travaillent ensemble. Vos élèves progressent sur plusieurs fronts avec une seule fiche.`,
        highlighted: false,
      },
    ],
  },

  // How-To Guide - FULL text from big-small.md step sections
  howTo: {
    sectionTitle: 'Comment Créer des Fiches Maternelle Grand et Petit en 5 Étapes - Fiches à Imprimer Gratuit en Moins de 3 Minutes',
    sectionDescription: 'Créer des fiches de comparaison de tailles ne prend que quelques minutes. Suivez ce guide étape par étape pour générer vos premiers exercices. Aucune compétence technique n\'est nécessaire. Même les enseignants débutants en informatique réussissent du premier coup. Votre fiche à imprimer sera prête en moins de 3 minutes.',
    ctaText: 'Commencer Maintenant',
    badgeText: 'Guide Étape par Étape',
    stepLabel: 'Étape',
    completionTitle: 'Terminé !',
    completionSubtitle: 'Vos fiches grand et petit sont prêtes',
    readyTime: 'Prêt en moins de 3 minutes',
    noSkillsNeeded: 'Aucune compétence en design requise',
    readMoreLabel: 'Lire la suite',
    showLessLabel: 'Voir moins',
    steps: [
      {
        id: '1',
        number: 1,
        title: 'Étape 1 : Choisir le Contenu pour vos Fiches Maternelle - Sélection de Thèmes et Images pour Apprendre à Comparer',
        description: `La première étape consiste à choisir les images pour vos exercices. Vous avez trois options pour alimenter vos fiches maternelle. Chaque méthode convient à différents besoins pédagogiques.

Sélectionnez un thème complet depuis le menu déroulant. Les animaux, les véhicules et les fruits sont particulièrement appréciés. Le générateur choisira automatiquement des images variées du thème. Cette méthode est la plus rapide pour créer des fiches à imprimer gratuit.

Vous pouvez aussi parcourir la bibliothèque d'images manuellement. Cliquez sur les images que vous souhaitez utiliser. Elles s'ajoutent à votre sélection en bas de l'écran. Cette approche permet un contrôle total sur le contenu.

La troisième option est d'importer vos propres images. Téléchargez des photos depuis votre ordinateur. Combinez-les avec les images de la bibliothèque. Créez des exercices personnalisés avec des objets familiers aux élèves.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Étape 2 : Configurer les Paramètres d\'Exercices CP - Nombre de Questions et Type de Fiches à Imprimer',
        description: `Configurez ensuite les paramètres de vos exercices CP. Le panneau de réglages offre plusieurs options de personnalisation. Chaque paramètre influence la difficulté et le format de la fiche.

Définissez le nombre d'exercices par fiche. Vous pouvez créer entre 1 et 10 exercices. Pour les fiches maternelle de Petite Section, 4 exercices suffisent. Les élèves de Grande Section peuvent en traiter davantage.

Choisissez le nombre d'images par exercice. L'option 2 images convient aux débutants. L'option 3 images introduit la notion de taille moyenne. Cette progression accompagne l'apprentissage des élèves.

Sélectionnez le type de question parmi cinq possibilités. "Entoure le plus grand" est le plus courant. "Entoure le plus petit" offre une variante. Les exercices de classement du plus petit au plus grand développent la logique.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Étape 3 : Générer la Fiche avec Exercices Maths et Graphisme Maternelle - Aperçu Instantané sur l\'Écran',
        description: `Cliquez sur le bouton "Créer" pour générer votre fiche. L'aperçu apparaît instantanément sur le canevas. Les exercices maths de comparaison s'affichent avec les images sélectionnées. Chaque élément est déjà positionné de manière optimale.

Le générateur crée automatiquement des tailles différentes pour chaque image. L'écart de taille est toujours clairement visible. Les élèves n'auront aucune difficulté à distinguer le grand du petit. Cette clarté est essentielle pour le graphisme maternelle.

Vérifiez que la fiche correspond à vos attentes. Les consignes apparaissent en haut de chaque exercice. Les images sont réparties uniformément sur la page. Le nombre d'exercices correspond à votre sélection.

Si le résultat ne vous convient pas, cliquez à nouveau sur "Créer". Une nouvelle disposition sera générée avec les mêmes paramètres. Répétez jusqu'à obtenir la fiche parfaite pour vos fiches maternelle.`,
        icon: '🎨',
      },
      {
        id: '4',
        number: 4,
        title: 'Étape 4 : Personnaliser sur le Canevas - Écriture et Coloriage à Imprimer avec Modifications Libres',
        description: `Le canevas d'édition permet de personnaliser chaque élément. Cliquez sur une image pour la sélectionner. Déplacez-la en maintenant le bouton de la souris enfoncé. Redimensionnez avec les poignées d'angle.

Ajoutez du texte pour enrichir vos fiches avec de l'écriture personnalisée. Tapez un titre ou des consignes supplémentaires. Choisissez la police, la taille et la couleur. Le texte s'intègre parfaitement à votre coloriage à imprimer.

Modifiez l'arrière-plan pour rendre la fiche plus attrayante. Sélectionnez un thème dans le menu des arrière-plans. Ajustez l'opacité pour que les images restent visibles. Les bordures décoratives apportent une touche finale.

Utilisez les outils d'alignement pour une mise en page professionnelle. Centrez les éléments horizontalement ou verticalement. Alignez plusieurs objets entre eux. Ces ajustements garantissent un rendu impeccable.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Étape 5 : Télécharger les Fiches à Imprimer Gratuit avec Alphabet et Exercices CP - Format PDF Haute Qualité',
        description: `Votre fiche est prête pour le téléchargement. Cliquez sur le bouton "Télécharger" pour accéder aux options. Plusieurs formats sont disponibles selon vos besoins. Chaque format garantit une qualité professionnelle.

Le format PDF est idéal pour l'impression directe. La résolution de 300 DPI assure des images nettes. Vos fiches avec alphabet et exercices CP auront un aspect professionnel. Les parents apprécieront la qualité des supports.

Le format JPEG convient aux usages numériques. Intégrez les fiches dans des présentations ou des documents. Partagez-les par email avec les familles. L'option noir et blanc économise l'encre lors de l'impression.

Générez également le corrigé en un clic. La fiche réponse montre les solutions avec des coches vertes. Pour les exercices de classement, les numéros apparaissent. Distribuez le corrigé aux élèves pour l'auto-correction.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from big-small.md use case sections
  useCases: {
    sectionTitle: 'Fiches Maternelle et Exercices CP pour Tous les Enseignants - Qui Utilise nos Fiches à Imprimer Gratuit',
    sectionDescription: 'Notre générateur de fiches s\'adresse à tous les professionnels de l\'éducation. Les enseignants de maternelle et de CP y trouvent des ressources adaptées. Les parents pratiquant l\'instruction en famille apprécient également cet outil. Découvrez comment chaque profil utilise nos fiches à imprimer gratuit.',
    badgeText: 'Cas d\'Utilisation',
    readMoreLabel: 'Lire la suite',
    showLessLabel: 'Voir moins',
    items: [
      {
        id: '1',
        icon: '👩‍🏫',
        title: 'Enseignants de Maternelle - Fiches de Graphisme Maternelle et Coloriage à Imprimer pour la PS, MS et GS',
        subtitle: 'Exercices de comparaison adaptés aux 3-6 ans',
        description: `Les enseignants de maternelle constituent notre public principal. De la Petite Section à la Grande Section, les besoins varient. Le graphisme maternelle s'intègre naturellement aux exercices de comparaison. Le coloriage à imprimer complète parfaitement ces activités.

En Petite Section, les exercices utilisent 2 images seulement. Les enfants de 3 ans se concentrent sur la distinction grand/petit. Les fiches simples évitent la surcharge cognitive. Le graphisme maternelle à cet âge reste basique mais essentiel.

La Moyenne Section introduit progressivement plus de complexité. Les élèves de 4-5 ans gèrent 3 images par exercice. La notion de taille moyenne apparaît. Le coloriage à imprimer aide à maintenir l'attention.

La Grande Section prépare l'entrée au CP. Les exercices de classement par ordre de taille deviennent courants. Les fiches préparent aux apprentissages mathématiques formels. Le graphisme maternelle atteint son niveau le plus élaboré.`,
        quote: 'Mes élèves de grande section adorent les exercices de comparaison de tailles !',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Enseignants de CP et CE1 - Exercices Maths et Tables de Multiplication avec Comparaison de Tailles',
        subtitle: 'Raisonnement logique et bases mathématiques',
        description: `Les enseignants de CP et CE1 utilisent les fiches pour renforcer les bases mathématiques. Les exercices maths de comparaison consolident la numération. Avant d'aborder les tables de multiplication, les élèves maîtrisent les relations de grandeur.

Au CP, la comparaison de tailles soutient l'apprentissage des nombres. Plus grand, plus petit, égal : ces notions fondent le calcul. Les exercices CP préparent les additions et soustractions. Les tables de multiplication viendront plus tard avec ces bases solides.

En CE1, les fiches servent de révision et de différenciation. Les élèves en difficulté reprennent les fondamentaux. Les exercices maths de comparaison restent pertinents. La préparation aux tables de multiplication passe par cette compréhension.`,
        quote: 'Les fiches de comparaison préparent parfaitement mes élèves au raisonnement mathématique.',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Parents en Instruction à Domicile - Fiches pour Apprendre à Lire et l\'Alphabet à la Maison',
        subtitle: 'Apprentissage personnalisé en famille',
        description: `Les parents pratiquant l'instruction en famille trouvent ici des ressources précieuses. Les fiches pour apprendre à lire combinent plusieurs compétences. L'alphabet s'enseigne parallèlement aux notions de taille. Cette approche globale optimise le temps d'enseignement.

À la maison, la flexibilité est essentielle. Créez des fiches adaptées au rythme de votre enfant. L'alphabet peut s'apprendre lettre par lettre avec des comparaisons de tailles. Les fiches pour apprendre à lire deviennent ludiques et personnalisées.

Les parents apprécient la simplicité de création. Aucune formation pédagogique n'est nécessaire. Les fiches professionnelles rivalisent avec le matériel scolaire. L'alphabet et la comparaison de tailles se travaillent simultanément.`,
        quote: 'Un outil parfait pour nos séances d\'instruction en famille.',
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Enseignants de FLE - Fiches Maternelle pour Apprendre à Lire en Français Langue Étrangère',
        subtitle: 'Vocabulaire multilingue et immersion',
        description: `Les enseignants de Français Langue Étrangère utilisent nos fiches maternelle. Les exercices visuels transcendent les barrières linguistiques. Les élèves comparent des tailles avant de maîtriser le vocabulaire. Apprendre à lire en français devient plus accessible.

Le vocabulaire de base s'acquiert naturellement. Grand, petit, moyen : ces mots essentiels s'apprennent en contexte. Les fiches maternelle illustrent concrètement les concepts. Les élèves FLE progressent en français tout en développant des compétences mathématiques.

Les 11 langues de l'interface facilitent l'enseignement. Commencez dans la langue maternelle de l'élève. Passez progressivement au français. Apprendre à lire et comparer les tailles se fait en douceur.`,
        quote: 'Le support multilingue est idéal pour mes cours de FLE.',
      },
      {
        id: '5',
        icon: '💜',
        title: 'Enseignants Spécialisés - Écriture Cursive et Graphisme Maternelle pour Besoins Particuliers',
        subtitle: 'Adaptation aux besoins spécifiques',
        description: `Les enseignants spécialisés adaptent nos fiches aux besoins particuliers. L'écriture cursive et le graphisme maternelle s'ajustent à chaque élève. Les exercices de comparaison développent des compétences transversales.

Pour les élèves avec troubles des apprentissages, la clarté visuelle est cruciale. Nos fiches offrent des images nettes et des consignes simples. L'écriture cursive peut être ajoutée progressivement. Le graphisme maternelle s'adapte aux capacités motrices.

La différenciation est au cœur de l'enseignement spécialisé. Créez des fiches personnalisées pour chaque élève. L'écriture et la comparaison de tailles se travaillent au rythme individuel. Les progrès sont visibles et mesurables.`,
        quote: 'Je peux adapter les fiches à chaque élève de ma classe ULIS.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Enseignants Entrepreneurs - Vendre des Fiches à Imprimer et Coloriage sur Teachers Pay Teachers',
        subtitle: 'Licence commerciale incluse pour TPT, Etsy et Amazon KDP',
        description: `Les enseignants entrepreneurs génèrent des revenus avec nos fiches à imprimer. La licence commerciale incluse permet la vente immédiate. Le coloriage à imprimer se vend très bien sur les plateformes. Teachers Pay Teachers accueille vos créations.

Créez des collections thématiques de fiches à imprimer. Les packs saisonniers attirent les acheteurs. Le coloriage combiné aux exercices de comparaison offre une valeur ajoutée. Les enseignants cherchent des ressources prêtes à l'emploi.

Etsy et Amazon KDP sont d'autres débouchés rentables. Les fiches à imprimer gratuit deviennent des produits payants avec votre touche personnelle. Le coloriage à imprimer se décline en cahiers d'activités. Votre créativité se monétise facilement.`,
        quote: 'Mon abonnement s\'est rentabilisé dès le premier mois de ventes !',
      },
      {
        id: '7',
        icon: '🩺',
        title: 'Orthophonistes et Psychomotriciens - Fiches de Graphisme et Écriture pour la Rééducation',
        subtitle: 'Supports thérapeutiques personnalisés',
        description: `Les professionnels paramédicaux utilisent nos fiches en rééducation. Le graphisme maternelle soutient le travail des psychomotriciens. L'écriture cursive fait partie des objectifs thérapeutiques. Les exercices de comparaison évaluent les capacités perceptives.

Les orthophonistes intègrent les fiches dans leurs séances. La discrimination visuelle des tailles prépare la lecture. L'écriture et le graphisme se travaillent conjointement. Les fiches offrent un support structuré et reproductible.

La création rapide permet d'adapter le matériel à chaque patient. Le graphisme maternelle varie selon les objectifs thérapeutiques. L'écriture cursive s'introduit quand l'enfant est prêt. Les professionnels gagnent un temps précieux.`,
        quote: 'Un outil indispensable pour mes séances de rééducation.',
      },
    ],
  },

  // FAQ Section - Selected FAQs from big-small.md
  faq: {
    sectionTitle: 'Questions Fréquentes sur les Fiches Grand et Petit - Tables de Multiplication, Apprendre à Lire et Exercices Maths',
    sectionDescription: 'Vous avez des questions sur notre générateur de fiches grand et petit ? Cette section répond aux interrogations les plus courantes. Des tables de multiplication aux exercices pour apprendre à lire, nous couvrons tous les sujets. Trouvez rapidement les informations dont vous avez besoin sur les exercices maths et autres fonctionnalités.',
    showMoreText: 'Voir plus de questions',
    showLessText: 'Voir moins',
    badgeText: 'FAQ',
    readMoreLabel: 'Lire la suite',
    showLessLabel: 'Voir moins',
    secureCheckout: 'Paiement sécurisé',
    cancelAnytime: 'Résiliez à tout moment',
    items: [
      {
        id: '1',
        question: 'Le Générateur de Fiches pour Apprendre à Lire et les Tables de Multiplication Est-il Gratuit ?',
        answer: `Le générateur de fiches grand et petit nécessite un abonnement Accès Complet. Le tarif est de 240 euros par an ou 25 euros par mois. Votre abonnement vous donne accès à la création illimitée de fiches sans frais supplémentaires. Générez autant de fiches pour apprendre à lire que nécessaire.

L'abonnement Accès Complet inclut les 33 générateurs de la plateforme. Les tables de multiplication, les exercices de comparaison et bien d'autres outils sont disponibles. Aucun coût par fiche téléchargée. Votre investissement se rentabilise rapidement avec l'usage quotidien.

Le Pack Essentiel à 144 euros par an propose 10 générateurs populaires. L'Accès Complet à 240 euros par an débloque tous les outils, y compris le générateur grand et petit. Les deux formules incluent la licence commerciale et le support en 11 langues.`,
      },
      {
        id: '2',
        question: 'Puis-je Imprimer les Fiches d\'Alphabet et d\'Écriture Cursive sur une Imprimante Domestique ?',
        answer: `Toutes les fiches s'impriment parfaitement sur une imprimante domestique standard. Les fiches d'alphabet et d'écriture cursive sortent en haute qualité. La résolution de 300 DPI garantit des images nettes. Le format PDF s'adapte à tous les types d'imprimantes.

Choisissez le format de papier adapté à votre imprimante. Letter pour les États-Unis, A4 pour l'Europe. Les fiches d'alphabet s'impriment en portrait ou en paysage. L'écriture cursive reste parfaitement lisible dans tous les formats.

L'option noir et blanc économise l'encre couleur. Les fiches d'alphabet restent claires en niveaux de gris. L'écriture cursive se distingue parfaitement. Idéal pour les impressions en grande quantité.`,
      },
      {
        id: '3',
        question: 'Faut-il des Compétences en Design pour Créer des Fiches de Graphisme Maternelle et Coloriage à Imprimer ?',
        answer: `Aucune compétence en design n'est requise pour créer des fiches. Le graphisme maternelle se génère automatiquement en quelques clics. Le coloriage à imprimer s'obtient tout aussi simplement. L'interface intuitive guide chaque étape du processus.

Sélectionnez un thème d'images et cliquez sur générer. Le graphisme maternelle apparaît instantanément sur l'écran. Le coloriage à imprimer se personnalise par glisser-déposer. Même les débutants en informatique réussissent du premier coup.

Les outils d'édition restent simples et accessibles. Le graphisme maternelle se modifie sans connaissance technique. Le coloriage à imprimer s'ajuste intuitivement. Votre créativité s'exprime sans barrière technique.`,
      },
      {
        id: '4',
        question: 'Les Fiches de Tables de Multiplication et d\'Exercices Maths Conviennent-elles à ma Classe ?',
        answer: `L'abonnement Accès Complet autorise une utilisation illimitée en classe. Les fiches de tables de multiplication se distribuent à tous vos élèves. Les exercices maths s'utilisent sans restriction de nombre. Imprimez autant de copies que nécessaire.

Les tables de multiplication s'adaptent à chaque niveau. Les exercices maths de comparaison conviennent de la maternelle au CE2. La difficulté se règle selon les besoins de vos élèves. Chaque fiche répond à un objectif pédagogique précis.

Partagez les fiches avec vos collègues de l'établissement. Les tables de multiplication profitent à toute l'équipe. Les exercices maths circulent librement entre les classes. L'abonnement couvre tous les usages pédagogiques.`,
      },
      {
        id: '5',
        question: 'En Quelles Langues les Fiches pour Apprendre à Lire et l\'Alphabet Sont-elles Disponibles ?',
        answer: `Les fiches pour apprendre à lire existent dans 11 langues différentes. L'alphabet s'affiche en français, allemand, espagnol et italien. Le portugais, le néerlandais et les langues scandinaves sont également proposés. Cette diversité répond aux besoins des classes multilingues.

L'interface utilisateur se traduit dans les 11 langues. Les fiches pour apprendre à lire s'adaptent à votre langue d'enseignement. L'alphabet de chaque langue utilise les noms d'images appropriés. La cohérence linguistique est garantie.

Changez de langue d'un simple clic. Les fiches pour apprendre à lire se régénèrent automatiquement. L'alphabet s'actualise avec les nouveaux termes. Idéal pour l'enseignement bilingue ou les classes d'accueil.`,
      },
      {
        id: '6',
        question: 'Puis-je Vendre les Fiches d\'Écriture Cursive et de Coloriage à Imprimer que je Crée ?',
        answer: `L'abonnement Accès Complet inclut une licence commerciale complète. Vendez vos fiches d'écriture cursive sur Teachers Pay Teachers. Le coloriage à imprimer se monétise sur Etsy. Amazon KDP accueille vos cahiers d'activités.

Aucun frais supplémentaire pour la licence commerciale. L'écriture cursive et toutes vos créations vous appartiennent. Le coloriage à imprimer génère des revenus passifs. Votre créativité devient une source de revenus.

L'attribution n'est pas requise lors de la vente. Les fiches d'écriture cursive portent votre marque. Le coloriage à imprimer s'intègre à vos collections. Développez votre boutique en ligne sereinement.`,
      },
      {
        id: '7',
        question: 'Comment Personnaliser les Fiches d\'Alphabet et de Graphisme Maternelle pour mes Élèves ?',
        answer: `La personnalisation des fiches est totale et intuitive. L'alphabet se modifie sur le canevas d'édition. Le graphisme maternelle s'ajuste par glisser-déposer. Chaque élément se déplace, redimensionne et pivote librement.

Ajoutez du texte personnalisé à vos fiches d'alphabet. Le graphisme maternelle s'enrichit de consignes spécifiques. Les couleurs et les polices se modifient en un clic. Créez des supports uniques pour chaque élève.

Importez vos propres images pour plus de personnalisation. L'alphabet utilise des photos familières aux enfants. Le graphisme maternelle intègre des éléments de votre classe. La différenciation pédagogique devient réalité.`,
      },
      {
        id: '8',
        question: 'Quels Groupes d\'Âge Bénéficient le Plus des Fiches pour Apprendre à Lire et les Tables de Multiplication ?',
        answer: `Les fiches de comparaison de tailles conviennent aux enfants de 3 à 8 ans. Apprendre à lire commence dès la maternelle avec ces supports visuels. Les tables de multiplication s'introduisent au CE1 et CE2. Chaque tranche d'âge trouve des exercices adaptés.

En maternelle, les exercices de 2 images suffisent pour apprendre à distinguer. Les tables de multiplication ne concernent pas encore cet âge. La préparation aux concepts mathématiques se fait en douceur. Apprendre à lire commence par la discrimination visuelle.

Au CP et CE1, la complexité augmente progressivement. Les tables de multiplication complètent les apprentissages. Les exercices de classement par taille développent la logique. Apprendre à lire s'appuie sur ces compétences transversales.`,
      },
      {
        id: '9',
        question: 'Puis-je Télécharger mes Propres Images pour les Fiches d\'Écriture et d\'Exercices Maths ?',
        answer: `L'importation d'images personnelles est entièrement supportée. Vos fiches d'écriture intègrent des photos de la classe. Les exercices maths utilisent des objets familiers aux élèves. Cette personnalisation renforce l'engagement des enfants.

Téléchargez plusieurs images en une seule opération. Les fiches d'écriture acceptent JPEG, PNG et GIF. Les exercices maths s'enrichissent de vos propres visuels. Combinez images personnelles et bibliothèque pour plus de variété.

Les images importées restent disponibles pendant la session. Créez des fiches d'écriture avec les mêmes photos. Les exercices maths gardent une cohérence visuelle. Votre matériel pédagogique devient vraiment unique.`,
      },
      {
        id: '10',
        question: 'Combien de Temps Faut-il pour Créer une Fiche de Coloriage à Imprimer ou de Calcul ?',
        answer: `La création d'une fiche prend moins de 3 minutes. Le coloriage à imprimer se génère en quelques clics. Les fiches de calcul apparaissent instantanément. L'efficacité du générateur vous fait gagner des heures.

Sélectionnez un thème et configurez les paramètres. Le coloriage à imprimer et les exercices se génèrent automatiquement. Les fiches de calcul s'affichent sur le canevas. La personnalisation optionnelle ajoute quelques minutes.

Comparez avec la création manuelle traditionnelle. Le coloriage à imprimer prenait 30 minutes minimum. Les fiches de calcul exigeaient des recherches d'images. Notre générateur réduit ce temps de 90%.`,
      },
      {
        id: '11',
        question: 'Les Fiches d\'Apprendre à Lire et d\'Alphabet Incluent-elles des Corrigés ?',
        answer: `Chaque fiche générée dispose d'un corrigé automatique. Les exercices pour apprendre à lire montrent les bonnes réponses. L'alphabet en différentes tailles indique l'ordre correct. Un clic suffit pour créer la fiche réponse.

Le corrigé utilise des indicateurs visuels clairs. Pour apprendre à lire et identifier les tailles, des coches vertes marquent les réponses. L'alphabet classé par ordre de taille affiche les numéros. Les élèves peuvent s'auto-corriger facilement.

Téléchargez le corrigé séparément ou avec la fiche. Les supports pour apprendre à lire et leur correction restent distincts. L'alphabet et ses réponses se distribuent au moment opportun. La gestion pédagogique reste flexible.`,
      },
      {
        id: '12',
        question: 'Puis-je Créer des Fiches de Tables de Multiplication et d\'Écriture Cursive sur des Thèmes Spécifiques ?',
        answer: `Les fiches se créent sur n'importe quel thème de votre choix. Les tables de multiplication utilisent des images thématiques. L'écriture cursive s'associe à des visuels saisonniers. Plus de 3000 images couvrent tous les sujets.

Les thèmes disponibles incluent les animaux, véhicules et aliments. Les tables de multiplication se pratiquent avec des images de Noël ou de printemps. L'écriture cursive accompagne des thèmes sportifs ou artistiques. La variété maintient l'intérêt des élèves.

Créez vos propres thèmes en important des images. Les tables de multiplication suivent vos projets de classe. L'écriture cursive s'intègre à vos séquences pédagogiques. La personnalisation thématique est illimitée.`,
      },
    ],
  },

  // Pricing - Accès Complet tier for Big Small
  pricing: {
    title: 'Accès Complet',
    price: '240€',
    priceInterval: '/an',
    priceSuffix: 'Facturé annuellement',
    benefits: [
      'Création illimitée de fiches grand et petit',
      'Accès aux 33 générateurs de la plateforme',
      'Licence commerciale incluse',
      '11 langues disponibles',
      '3000+ images thématiques',
      'Qualité 300 DPI professionnelle',
      'Clés de correction automatiques',
    ],
    ctaText: 'Commencer Maintenant',
    bundleDescription: 'Votre abonnement inclut l\'acces a 10 generateurs de fiches:',
    bundleApps: [
      'Addition Images',
      'Train Alphabet',
      'Coloriages',
      'Fiches de Maths',
      'Mots Melanges',
      'Cherche et Compte',
      'Jeu d\'Association',
      'Tracer des Lignes',
      'Bingo Images',
      'Sudoku',
    ],
  },

  // Related Apps - From big-small.md Section 7
  relatedApps: {
    sectionTitle: 'Combinez les Fiches Grand et Petit avec d\'Autres Fiches à Imprimer Gratuit - Packs Pédagogiques Complets avec Tables de Multiplication',
    sectionDescription: 'Les fiches grand et petit s\'intègrent parfaitement à des packs pédagogiques complets. Combinez-les avec les 32 autres générateurs de la plateforme. Les tables de multiplication, les exercices de lecture et bien d\'autres outils créent des ensembles cohérents. Vos fiches à imprimer gratuit forment des séquences d\'apprentissage structurées pour tous les niveaux.',
    ctaTitle: 'Prêt à Créer des Fiches Grand et Petit Professionnelles ?',
    ctaDescription: 'Rejoignez des milliers d\'enseignants qui créent des fiches maternelle de qualité. Création illimitée, licence commerciale incluse.',
    primaryCtaText: 'Essai Gratuit',
    secondaryCtaText: 'Voir les 33 Applications',
    badgeText: 'Fonctionne Parfaitement Avec',
    exploreText: 'Explorer toutes les applications',
    trustBadges: {
      securePayment: 'Paiement sécurisé',
      cancelAnytime: 'Résiliez à tout moment',
    },
    items: [
      {
        id: '1',
        slug: 'addition-fiches',
        name: 'Exercices d\'Addition',
        category: 'Mathématiques',
        icon: '➕',
        description: 'Combinez les fiches grand et petit avec les exercices d\'addition. La comparaison de tailles prépare naturellement aux concepts de quantité. Les élèves comprennent "plus" et "moins" avant d\'additionner.',
      },
      {
        id: '2',
        slug: 'cherche-et-compte-fiches',
        name: 'Cherche et Compte',
        category: 'Numération',
        icon: '🔢',
        description: 'Les exercices de comptage complètent parfaitement les comparaisons de tailles. Les élèves apprennent à dénombrer puis à comparer. Une progression naturelle vers les exercices maths.',
      },
      {
        id: '3',
        slug: 'coloriage-fiches',
        name: 'Coloriage à Imprimer',
        category: 'Arts et Motricité',
        icon: '🎨',
        description: 'Le coloriage prolonge les exercices de comparaison. Après avoir identifié le plus grand, les enfants colorient les images. Motricité fine et discrimination visuelle se combinent.',
      },
      {
        id: '4',
        slug: 'graphisme-fiches',
        name: 'Graphisme',
        category: 'Motricité Fine',
        icon: '✍️',
        description: 'Le graphisme maternelle s\'intègre aux exercices de tailles. Les élèves tracent autour des images de différentes tailles. Préparation à l\'écriture et discrimination visuelle.',
      },
      {
        id: '5',
        slug: 'association-fiches',
        name: 'Association',
        category: 'Logique',
        icon: '🔗',
        description: 'Les exercices d\'association renforcent la comparaison de tailles. Les enfants relient les objets de mêmes proportions. La logique visuelle se développe progressivement.',
      },
      {
        id: '6',
        slug: 'mots-caches-fiches',
        name: 'Mots Cachés',
        category: 'Vocabulaire',
        icon: '🔍',
        description: 'Créez des packs combinant mots cachés et comparaison de tailles. Les élèves enrichissent leur vocabulaire tout en travaillant la discrimination visuelle. Lecture et mathématiques se rejoignent.',
      },
    ],
  },
};

export default bigSmallFrContent;
