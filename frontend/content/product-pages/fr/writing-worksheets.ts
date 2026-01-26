import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Writing Worksheets - French Content
 *
 * File: frontend/content/product-pages/fr/writing-worksheets.ts
 * URL: /fr/apps/ecriture-fiches (French SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/French/writing.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 *
 * PRICING: Accès Complet = 240€/an (Accès Complet)
 * App ID: writing-app
 */

export const writingFrContent: ProductPageContent = {
  // SEO Metadata - French language-specific
  seo: {
    slug: 'ecriture-fiches',
    appId: 'writing',
    title: 'Fiches Écriture Gratuites Maternelle CP | Générateur Graphisme',
    description: 'Créez des fiches écriture gratuites pour maternelle et CP. Graphisme, lettres alphabet, mots fréquents. Téléchargez PDF 300 DPI en 3 minutes. Parfait pour enseignants et parents.',
    keywords: 'fiches écriture, fiches gratuites, graphisme maternelle, exercices CP, apprendre à écrire, lettres alphabet, écriture cursive, fiches maternelle, mots fréquents, fiches phonétique, coloriage à imprimer, exercices maths, fiches addition, fiches alphabet',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fr/apps/ecriture-fiches',
      },

  // Hero Section - FULL text from French writing.md Section 1
  hero: {
    title: 'Générateur de Fiches d\'Écriture',
    subtitle: 'Graphisme Maternelle et Exercices CP pour Apprendre à Écrire',
    description: `Créez des fiches d'écriture professionnelles avec notre générateur de graphisme maternelle. Votre abonnement Accès Complet vous donne un accès illimité sans frais par fiche. Générez des fiches à imprimer gratuit personnalisées pour les élèves de maternelle et de CP. Téléchargez des PDF haute qualité en moins de 3 minutes. Parfait pour l'apprentissage de l'écriture cursive et script.

Notre générateur de fiches d'écriture aide les enseignants à créer des activités de graphisme maternelle avec des lignes d'écriture guidées. Choisissez entre les polices script ou cursive avec plusieurs modes de traçage. Chaque fiche d'écriture inclut des lignes de base pour une formation correcte des lettres. Idéal pour l'enseignement de l'écriture à tous les niveaux scolaires.

Générez des fiches d'écriture pour les lettres de l'alphabet, les mots ou le texte personnalisé. Votre abonnement Accès Complet inclut l'accès aux 33 générateurs de fiches plus la licence commerciale. Créez des exercices CP illimités pour la classe ou la vente sur Teachers Pay Teachers. Les fiches maternelle deviennent des outils pédagogiques professionnels en quelques clics.`,
    previewImageSrc: '/samples/french/writing/sample-1.jpeg',
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
    videos: {
      commonFeatures: {
        videoId: 'Df9fknBBRFA',
        buttonText: 'Découvrir en vidéo',
        modalTitle: 'Aperçu des fonctionnalités',
      },
      appSpecific: {
        videoId: '0b4WglqyXu0',
        buttonText: 'Fonctions Écriture',
        modalTitle: 'Tutoriel Écriture',
      },
    },
  },

  // Sample Gallery - REAL file paths from samples/french/writing/
  samples: {
    sectionTitle: 'Fiche Gratuite pour Enfants - Fiches Gratuites et Imprimables Gratuits',
    sectionDescription: 'Téléchargez imprimables gratuits - Fiche gratuite pour enfants de qualité professionnelle. Fiches gratuites et fiche pour enfants parfaites pour fiche pour maternelle. Fiche gratuite pour enfants et fiches gratuites inclus matériel éducatif. Fiche gratuite et fiches gratuites disponible',
    downloadLabel: 'Télécharger Exemple Gratuit',
    worksheetLabel: 'Fiche',
    answerKeyLabel: 'Corrigé',
    viewAllLabel: 'Agrandir',
    noPdfLabel: 'Aperçu uniquement',
    freePdfCountLabel: 'téléchargements gratuits',
    badgeText: 'Exemples Gratuits',
    downloadingLabel: 'Téléchargement...',
    ofLabel: 'sur',
    items: [],
    
  },

  // Features Grid - FULL text from French writing.md Section 2
  features: {
    sectionTitle: 'Fiches Gratuites et Fiche pour Enfants - Imprimables Gratuits et Fiche pour Maternelle',
    sectionDescription: 'Notre générateur de fiches d\'écriture inclut des fonctionnalités puissantes conçues pour créer du graphisme maternelle et des activités d\'apprentissage. Les enseignants apprécient la combinaison de facilité et de flexibilité. Générez des fiches à imprimer gratuit professionnelles en quelques minutes au lieu des heures passées à dessiner des lignes d\'écriture à la main. L\'abonnement Accès Complet vous donne un contrôle total sur chaque aspect de vos fiches d\'écriture. Personnalisez les polices, ajustez l\'espacement des lignes, ajoutez des images et créez exactement ce dont vos élèves ont besoin. Chaque fonctionnalité travaille ensemble pour vous faire gagner du temps tout en maintenant une qualité professionnelle.',
    highlightBadgeText: 'Fonctionnalité Clé',
    readMoreLabel: 'Lire la suite',
    showLessLabel: 'Voir moins',
    badgeText: 'Fonctionnalités',
    trustBadges: {
      allFeatures: 'Toutes les fonctionnalités incluses',
      noHiddenFees: 'Aucun frais caché',
      cancelAnytime: 'Annulez à tout moment',
    },
    items: [], // Samples loaded dynamically from content manager
    
  },

  // How-To Guide - FULL text from French writing.md Section 3
  howTo: {
    sectionTitle: 'Fiche Gratuite pour Enfants Créer - Fiche pour Maternelle',
    sectionDescription: 'Créer du matériel de pratique d\'écriture professionnel prend moins de trois minutes avec notre générateur de fiches d\'écriture. Le flux de travail simplifié vous guide de la page blanche à la fiche terminée rapidement. Aucune expérience en design graphique requise. Suivez cinq étapes simples pour produire des fiches d\'écriture correspondant exactement à vos besoins pédagogiques. Vos élèves reçoivent du matériel de pratique de haute qualité en quelques minutes au lieu d\'heures pour créer des fiches maternelle.',
    ctaText: 'Commencer à Créer',
    badgeText: 'Guide Étape par Étape',
    stepLabel: 'Étape',
    completionTitle: 'Terminé !',
    completionSubtitle: 'Votre fiche est prête',
    readyTime: 'Prêt en moins de 3 minutes',
    noSkillsNeeded: 'Aucune compétence en design requise',
    readMoreLabel: 'Lire la suite',
    showLessLabel: 'Voir moins',
    steps: [
      {
        id: '1',
        number: 1,
        title: 'Choisissez Votre Configuration de Page et Images - Créez des Fiches à Imprimer Gratuit et des Fiches Maternelle',
        description: `Commencez par sélectionner votre taille de page depuis l'accordéon Configuration de Page. Choisissez Lettre Portrait pour les imprimantes standard des salles de classe françaises. Sélectionnez A4 Portrait pour les paramètres européens. Optez pour l'orientation Paysage pour des lignes d'écriture plus larges. L'option de taille personnalisée vous permet de spécifier des dimensions exactes en pixels. Le canevas de fiche s'ajuste automatiquement à votre taille sélectionnée pour vos fiches à imprimer gratuit.

Ajoutez ensuite des thèmes d'arrière-plan et des décorations de bordure optionnels. Cliquez sur le menu déroulant Thème d'Arrière-plan pour parcourir les options disponibles. Les vignettes prévisualisent chaque thème avant sélection. Ajustez l'opacité de l'arrière-plan à l'aide du curseur si vous voulez des effets de filigrane subtils. Les thèmes de bordure fonctionnent de manière identique avec leurs propres contrôles d'opacité. Ces éléments décoratifs rendent les fiches plus attrayantes sans distraire de la pratique d'écriture pour vos fiches maternelle.

Téléversez vos propres images si vous voulez du contenu personnalisé. Cliquez sur l'accordéon Téléverser des Images Personnalisées pour accéder au sélecteur de fichiers. Choisissez plusieurs fichiers image simultanément depuis votre ordinateur. Des vignettes d'aperçu apparaissent montrant toutes les images téléversées. Vous pouvez ajouter des photos de classe, des images d'élèves ou des graphiques spécifiques à une matière. Les images téléversées deviennent disponibles pour placement sur votre canevas de fiche d'écriture.

Parcourez alternativement la bibliothèque de 3000+ images. Ouvrez l'accordéon Bibliothèque d'Images et sélectionnez un thème dans le menu déroulant. Recherchez par mot-clé pour trouver rapidement des types d'images spécifiques. Cliquez sur n'importe quelle vignette d'image pour la sélectionner pour votre fiche. Les images sélectionnées apparaissent dans la zone d'aperçu. Les images d'exercices peuvent automatiquement générer du contenu de lettre basé sur leurs noms de fichiers. Cette connexion entre les images et le texte rationalise considérablement la création de fiches pour vos exercices CP.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Personnalisez les Paramètres de Ligne d\'Écriture - Fiches Alphabet et Exercices CP pour Tous les Niveaux d\'Apprentissage',
        description: `Ajoutez votre première ligne d'écriture en cliquant sur le bouton Ajouter une Ligne en haut à droite. Un nouvel accordéon apparaît dans la barre latérale étiqueté Ligne 1. Cliquez pour le développer et révéler toutes les options de personnalisation. Chaque ligne fonctionne indépendamment afin que vous puissiez mélanger différents paramètres sur une fiche. Cette flexibilité vous permet de créer des fiches de pratique multi-niveaux ou des séquences de difficulté progressive pour vos fiches alphabet.

Sélectionnez votre type de ligne depuis le premier menu déroulant. Le mode Tracer montre des lettres guides complètes pour les débutants à tracer directement. Le mode Traçage Estompé affiche des lettres semi-transparentes pour la pratique de transition. Le mode Copie Guidée montre la première lettre complètement avec les lettres restantes estompées. Chaque mode sert différents objectifs pédagogiques et niveaux de compétence. Mélangez les types de lignes sur une fiche pour fournir une pratique différenciée pour vos fiches phonétique.

Choisissez votre style de police depuis le menu déroulant Style de Police. Script Regular offre des lettres propres et simples parfaites pour les apprenants précoces. Script Regular Flèche ajoute des flèches directionnelles montrant la séquence de tracé appropriée. Script Traçage fournit des lettres en contour pointillé. Script Traçage Flèche combine des points avec des guides de direction de tracé. L'option Cursive passe à la pratique de l'écriture connectée. Le choix de la police impacte considérablement l'expérience d'apprentissage donc adaptez-le à vos objectifs pédagogiques pour des fiches maternelle efficaces.

Définissez votre type de contenu dans le menu déroulant Contenu. Les lignes vides fournissent des lignes d'écriture vierges pour la pratique indépendante. L'option Lettre de Début extrait automatiquement la première lettre du nom de fichier d'image sélectionné. Nom de Fichier Complet affiche le texte complet du nom de fichier pour la pratique de mots. L'option Texte Personnalisé vous permet de taper n'importe quel texte que vous voulez que les élèves tracent. Un champ de saisie de texte apparaît lorsque vous sélectionnez cette option. Tapez des prénoms d'élèves, des mots d'orthographe, des phrases ou tout contenu personnalisé nécessaire pour votre leçon de mots fréquents.

Sélectionnez le formatage de casse depuis le menu déroulant Casse. Majuscules crée des lettres capitales partout. Minuscules génère des petites lettres. Casse de Titre met en majuscule la première lettre de chaque mot. La sélection de casse s'applique au contenu généré automatiquement à partir d'images ou au texte personnalisé que vous entrez. Les débutants commencent souvent par les majuscules avant de progresser vers les minuscules. L'option de casse vous permet de cibler l'un ou l'autre niveau de compétence de manière appropriée pour vos exercices CP.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Ajoutez Plusieurs Lignes d\'Écriture - Fiches Phonétique et Mots Fréquents avec Contenu Personnalisé',
        description: `Cliquez à nouveau sur Ajouter une Ligne pour créer des lignes d'écriture supplémentaires sur votre fiche. Chaque nouvelle ligne ajoute un autre accordéon numéroté dans la barre latérale. Développez n'importe quel accordéon de ligne pour accéder à ses paramètres individuels. Réduisez les lignes que vous avez déjà configurées pour réduire l'encombrement de la barre latérale. L'organisation de la barre latérale garde tout gérable même avec de nombreuses lignes sur une fiche pour vos fiches phonétique.

Configurez chaque ligne indépendamment pour construire des fiches de pratique complètes. Créez la première ligne avec des lettres de traçage en majuscules. Ajoutez une deuxième ligne avec une copie guidée en minuscules. Incluez une troisième ligne avec des mots fréquents personnalisés tapés. Mélangez les styles de police comme script et cursive sur la même page. Cette flexibilité multi-lignes soutient diverses approches pédagogiques et besoins des élèves pour vos fiches maternelle.

Utilisez la fonction de pratique de tracé pour le développement des compétences motrices de pré-écriture. Changez le menu déroulant Contenu en Vide. Un menu déroulant Type de Tracé apparaît offrant quatre options de motif. Ligne Verticale crée une pratique de tracé haut-bas. Ligne Horizontale fournit une pratique de mouvement gauche-droite. Cercle offre une pratique de tracé courbe. Ligne Zig-Zag développe le contrôle diagonal. Ces tracés fondamentaux préparent les élèves à la formation des lettres de l'alphabet.

Supprimez n'importe quelle ligne en cliquant sur son bouton Supprimer la Ligne en bas de l'accordéon. La ligne se retire immédiatement de la barre latérale et du canevas. La suppression de lignes vous aide à affiner les fiches pendant la création. Essayez différentes configurations et supprimez ce qui ne fonctionne pas. L'expérimentation ne coûte rien puisque vous pouvez régénérer des variations illimitées instantanément pour vos exercices maths.

Ajoutez autant de lignes que votre taille de page peut accueillir confortablement. Lettre Portrait accueille généralement 5 à 8 lignes d'écriture selon les paramètres de hauteur. L'orientation Paysage s'adapte à 6 à 10 lignes. Regardez l'aperçu du canevas pour voir quand votre page semble pleine. Des fiches surchargées réduisent l'efficacité donc maintenez un espacement approprié entre les lignes. Votre jugement sur l'équilibre visuel s'améliore rapidement avec la pratique pour créer des exercices CP optimaux.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Modifiez sur le Canevas - Positionnez les Fiches Addition, Exercices Maths et Tous les Éléments de Fiche Parfaitement',
        description: `Vos lignes d'écriture apparaissent automatiquement sur le canevas de fiche au fur et à mesure que vous les créez. Chaque ligne devient un élément déplaçable et redimensionnable que vous pouvez repositionner librement. Cliquez sur n'importe quelle ligne pour la sélectionner et afficher la barre d'outils d'édition. Les bordures de sélection bleues indiquent les éléments sélectionnés. La sélection multiple fonctionne en maintenant Shift tout en cliquant sur des éléments supplémentaires. Ce système d'édition de canevas fournit un contrôle complet de la mise en page pour vos fiches addition.

Faites glisser les lignes sélectionnées vers de nouvelles positions verticales sur la page. Cliquez et maintenez sur une ligne puis déplacez votre souris pour la repositionner. Relâchez le bouton de la souris pour la placer au nouvel emplacement. Réorganisez l'ordre des lignes en faisant glisser les lignes vers le haut ou le bas. Créez un espacement personnalisé entre les lignes en les positionnant précisément où vous le souhaitez. Le contrôle de mise en page visuel garantit une conception optimale du matériel d'apprentissage pour vos exercices maths.

Redimensionnez les lignes en saisissant la poignée de redimensionnement dans le coin inférieur droit des éléments sélectionnés. Cliquez et faites glisser la poignée pour rendre les lignes plus hautes ou plus courtes. Des lignes plus hautes fournissent plus d'espace pour une écriture manuscrite plus grande. Des lignes plus courtes fonctionnent pour les élèves plus âgés avec un contrôle moteur fin développé. La largeur des lignes s'ajuste automatiquement pour correspondre à la largeur de la page donc vous contrôlez uniquement la hauteur manuellement pour vos fiches maternelle.

Ajoutez des blocs de texte personnalisés n'importe où sur la fiche en utilisant l'accordéon Outils de Texte. Tapez votre texte dans le champ de saisie et cliquez sur Ajouter du Texte à la Fiche. Le texte apparaît comme un élément déplaçable sur le canevas. Sélectionnez le bloc de texte pour accéder aux contrôles de couleur, taille et police. Ajoutez des titres de fiche, des instructions, des lignes de nom d'élève ou des éléments de texte décoratifs. Les blocs de texte s'intègrent parfaitement avec les lignes d'écriture pour vos exercices CP.

Placez des images personnalisées sur le canevas en utilisant le mode Images Personnalisées dans la Bibliothèque d'Images. Sélectionnez une image téléversée depuis la galerie d'aperçu. Cliquez sur le bouton Ajouter l'Image Sélectionnée pour la placer sur la fiche. L'image devient un élément mobile et redimensionnable. Positionnez les images à côté de la pratique d'écriture associée. Ajoutez des images d'incitation au-dessus des lignes de traçage de mots. Créez des fiches thématiques combinant images et texte de manière créative pour vos fiches phonétique.

Utilisez les outils d'alignement dans la barre d'outils contextuelle pour un positionnement précis. Sélectionnez plusieurs éléments puis cliquez sur le bouton Aligner pour afficher les options. Aligner à Gauche fait aligner tous les éléments sélectionnés sur leurs bords gauches. Centrer Horizontalement espace les éléments uniformément. Aligner en Haut positionne les éléments le long de la même ligne supérieure. Ces outils d'alignement créent des mises en page d'apparence professionnelle rapidement sans fastidieux ajustements manuels pour vos fiches à imprimer gratuit.

Verrouillez les éléments pour éviter les modifications accidentelles après les avoir positionnés parfaitement. Sélectionnez un élément et cliquez sur le bouton Verrouiller dans la barre d'outils. L'icône de cadenas change pour indiquer l'état verrouillé. Les éléments verrouillés ne peuvent pas être déplacés, redimensionnés ou supprimés jusqu'à déverrouillage. Utilisez le verrouillage pour protéger votre mise en page soigneusement conçue pendant que vous continuez à éditer d'autres éléments. Cela évite des perturbations accidentelles frustrantes des zones finies pour vos fiches maternelle.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Téléchargez des Fiches Imprimables - Fiches de Coloriage à Imprimer Haute Qualité, Fiches Alphabet et Tous Types de Fiches',
        description: `Cliquez sur le bouton Télécharger en haut à droite lorsque la conception de votre fiche est terminée. Un menu déroulant offre deux options de format d'exportation. Télécharger en PDF crée un fichier PDF prêt à imprimer. Télécharger en JPEG exporte un fichier image haute résolution. Les deux formats produisent une qualité professionnelle de 300 DPI adaptée à l'impression ou à la vente. Choisissez en fonction de votre utilisation prévue et des besoins de compatibilité de fichiers pour vos fiches de coloriage à imprimer.

Sélectionnez la case Niveaux de Gris avant de télécharger si vous voulez une sortie en noir et blanc. La conversion en niveaux de gris économise considérablement les coûts d'encre d'imprimante. Les éléments colorés se convertissent automatiquement en nuances de gris. Les lignes d'écriture et les lettres restent parfaitement claires en niveaux de gris. De nombreux enseignants préfèrent les niveaux de gris pour les fiches de pratique de routine afin de gérer efficacement les budgets d'impression. Les versions couleur fonctionnent mieux pour les occasions spéciales ou les produits que vous prévoyez de vendre pour vos fiches alphabet.

Cliquez sur Télécharger en PDF pour les meilleurs résultats de qualité d'impression. Le format PDF préserve les graphiques vectoriels lorsque c'est possible. Le texte et les lignes restent nets à tout niveau de zoom. Les PDF s'ouvrent dans n'importe quel lecteur PDF sur n'importe quel appareil. Imprimez directement depuis le visualiseur PDF vers n'importe quelle imprimante. Les fichiers PDF fonctionnent parfaitement pour le téléversement vers Teachers Pay Teachers ou Etsy comme produits numériques pour vos exercices CP.

Choisissez Télécharger en JPEG si vous avez besoin de fichiers image à la place. Le format JPEG fonctionne facilement avec les traitements de texte et les logiciels de présentation. Insérez des images de fiches dans des ressources pédagogiques plus larges. Ajoutez-les aux diaporamas de classe ou aux bulletins pour parents. Les fichiers JPEG se prévisualisent facilement sans logiciel spécial. Ils se téléversent vers les plateformes de réseaux sociaux pour partager des idées pédagogiques avec des collègues pour vos fiches à imprimer gratuit.

Votre téléchargement commence immédiatement après avoir cliqué sur le bouton de format. Le fichier s'enregistre dans le dossier de téléchargement par défaut de votre navigateur. Ouvrez le fichier pour vérifier qu'il semble correct avant d'imprimer ou de partager. Si vous remarquez des modifications nécessaires, retournez à l'éditeur et apportez des ajustements. Régénérez les téléchargements un nombre illimité de fois jusqu'à ce que votre fiche soit parfaite. Aucune limite de téléchargement n'existe avec votre abonnement Accès Complet pour vos fiches maternelle.

Imprimez vos fiches téléchargées sur du papier standard pour imprimante ou du carton. Du papier de copie ordinaire de 20 livres fonctionne bien pour la plupart des pratiques d'écriture. Le carton plus lourd offre plus de durabilité pour une utilisation répétée ou la plastification. Les imprimeries commerciales peuvent produire des cahiers professionnels à partir de vos fichiers PDF. La haute résolution de 300 DPI garantit une impression nette à n'importe quel niveau de qualité d'impression professionnelle pour vos exercices maths et fiches d'écriture.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from French writing.md Section 4
  useCases: {
    sectionTitle: 'Fiche Gratuite pour Enfants - Fiche pour Maternelle avec Imprimables Gratuits. Fiche pour Enfants',
    sectionDescription: 'Notre générateur de fiches d\'écriture sert de nombreux contextes éducatifs différents. Les enseignants de classe créent du matériel quotidien pour les élèves de maternelle et de CP. Les parents en instruction à domicile construisent des programmes d\'écriture complets. Les enseignants spécialisés développent des fiches personnalisées pour les besoins d\'apprentissage individuels. Les enseignants entrepreneurs vendent leurs créations en ligne. Chaque groupe d\'utilisateurs trouve une valeur unique dans les fonctionnalités flexibles du générateur pour créer des fiches maternelle et des exercices CP.',
    badgeText: 'Cas d\'Utilisation',
    readMoreLabel: 'Lire la suite',
    showLessLabel: 'Voir moins',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // FAQ Section - FULL text from French writing.md Section 6
  faq: {
    sectionTitle: 'FAQ - Fiche Gratuite pour Enfants et Fiche pour Maternelle. Fiche pour Enfants',
    sectionDescription: 'Les éducateurs posent des questions communes sur les capacités du générateur, les options de licence et les meilleures pratiques d\'utilisation. Cette section répond aux questions les plus fréquentes concernant la création de fiches d\'écriture et de graphisme maternelle. Comprenez comment maximiser votre abonnement Accès Complet. Apprenez les techniques pour créer des fiches maternelle professionnelles efficacement. Découvrez comment nos outils soutiennent différents contextes pédagogiques et objectifs d\'enseignement.',
    showMoreText: 'Afficher plus de questions',
    showLessText: 'Afficher moins',
    badgeText: 'Questions Fréquentes',
    readMoreLabel: 'Lire la suite',
    showLessLabel: 'Voir moins',
    secureCheckout: 'Paiement sécurisé',
    cancelAnytime: 'Annulez à tout moment',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // Pricing section - Accès Complet required
  pricing: {
    title: 'Accès Complet',
    price: '240€',
    priceInterval: '/an',
    priceSuffix: 'Facturé annuellement',
    ctaText: 'Commencer à Créer',
    bundleDescription: 'Votre abonnement inclut l\'accès aux 33 générateurs de fiches:',
    bundleApps: [
      'Addition Images',
      'Train Alphabet',
      'Grand ou Petit',
      'Bingo Images',
      'Graphique et Comptage',
      'Code Addition',
      'Coloriages',
      'Mots Croisés',
      'Cryptogramme',
      'Dessiner et Colorier',
      'Tracer des Lignes',
      'Cherche et Compte',
      'Cherche les Objets',
      'Puzzle Grille',
      'Jeu d\'Association',
      'Puzzle Maths',
      'Fiches de Maths',
      'Pièces Manquantes',
      'Plus ou Moins',
      'L\'Intrus',
      'Train Suites Logiques',
      'Fiches Séquences',
      'Parcours d\'Images',
      'Tri d\'Images',
      'Prépositions',
      'Ombres',
      'Soustraction',
      'Sudoku',
      'Chasse au Trésor',
      'Deviner les Mots',
      'Mots Mélangés',
      'Mots Mêlés',
      'Écriture',
    ],
    benefits: [
      '33 générateurs de fiches inclus',
      'Création illimitée de fiches',
      'Bibliothèque de 3000+ images',
      'Support de 11 langues',
      'Licence commerciale POD incluse',
      'Export 300 DPI haute qualité',
      'Polices script et cursive',
    ],
  },

  // Related Apps - From French writing.md Section 7
  relatedApps: {
    sectionTitle: 'Fiches Gratuites Combiner - Fiche pour Enfants et Imprimables Gratuits',
    sectionDescription: 'Votre abonnement Accès Complet débloque tous les 33 générateurs de fiches, pas seulement le générateur d\'écriture. Combinez plusieurs types de générateurs pour créer des packs d\'apprentissage thématiques complets. Les enseignants rapportent que les ressources intégrées produisent de meilleurs résultats d\'apprentissage que les fiches isolées.',
    ctaTitle: 'Prêt à Créer des Fiches d\'Écriture Exceptionnelles ?',
    ctaDescription: 'Rejoignez des milliers d\'enseignants qui créent des fiches professionnelles. Génération illimitée, licence commerciale incluse.',
    primaryCtaText: 'Commencer l\'Essai Gratuit',
    secondaryCtaText: 'Voir les 33 Applications',
    badgeText: 'Fonctionne Bien Avec',
    exploreText: 'Explorer toutes les applications',
    trustBadges: {
      securePayment: 'Paiement sécurisé',
      cancelAnytime: 'Annulez à tout moment',
    },
    items: [], // Samples loaded dynamically from content manager
    
  },
};

export default writingFrContent;
