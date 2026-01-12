import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Prepositions Worksheets - French Content
 *
 * File: frontend/content/product-pages/fr/prepositions-worksheets.ts
 * URL: /fr/apps/prepositions-exercices-fiches (French SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/French/prepositions.md
 * App ID: prepositions (Spatial prepositions worksheets)
 * Bundle: Accès Complet ($240/year) - NOT Pack Essentiel
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const prepositionsFrContent: ProductPageContent = {
  // SEO Metadata - French language-specific
  seo: {
    slug: 'prepositions-exercices-fiches',
    appId: 'prepositions',
    title: 'Fiches à Imprimer Gratuit | Générateur d\'Exercices de Prépositions pour Maternelle et CP',
    description: 'Créez des fiches d\'exercices sur les prépositions spatiales en quelques clics. Votre abonnement Accès Complet à 240 € par an vous permet de générer des exercices illimités. Téléchargez des PDF haute qualité en moins de 3 minutes.',
    keywords: 'fiches à imprimer gratuit, fiches maternelle, exercices CP, prépositions spatiales, graphisme maternelle, coloriage à imprimer, apprendre à lire, alphabet, écriture cursive, exercices maths',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fr/apps/prepositions-exercices-fiches',
  },

  // Hero Section - FULL text from prepositions.md paragraphs 1-4
  hero: {
    title: 'Fiches Exercices sur les Prépositions',
    subtitle: 'Générateur de Fiches Maternelle et CP pour Prépositions Spatiales',
    description: `Créez des fiches d'exercices sur les prépositions spatiales en quelques clics. Votre abonnement Accès Complet à 240 € par an vous permet de générer des exercices illimités sans frais supplémentaires. Concevez des fiches maternelle personnalisées qui enseignent les prépositions essentielles comme sur, sous, dans, devant, derrière, entre et à côté. Téléchargez vos exercices au format PDF haute qualité en moins de 3 minutes.

Les prépositions constituent un élément fondamental de l'apprentissage du français en maternelle et au CP. Nos fiches à imprimer gratuit aident les élèves à comprendre la position des objets dans l'espace. Le générateur propose deux formats d'exercices. Le mode texte à trou demande aux enfants d'écrire la bonne préposition. Le mode choix multiples permet aux jeunes élèves de maternelle d'entourer la bonne réponse parmi plusieurs propositions.

Chaque fiche maternelle comprend des images colorées et attrayantes tirées de notre bibliothèque de plus de 3000 illustrations adaptées aux enfants. Sélectionnez des thèmes familiers pour vos élèves. Ajoutez vos propres photos de classe. Personnalisez chaque élément directement sur le canevas. Les exercices CP s'adaptent parfaitement au niveau de vos élèves.

L'abonnement Accès Complet coûte 240 € par an ou 25 € par mois. Vous accédez aux 33 générateurs de fiches pédagogiques de la plateforme. Créez autant de fiches à imprimer gratuit que nécessaire. Aucun frais par fiche. Les corrigés se génèrent automatiquement. La qualité professionnelle 300 DPI garantit une impression nette. L'interface en français facilite la création rapide d'exercices adaptés à vos besoins pédagogiques.`,
    previewImageSrc: '/samples/english/prepositions/prepositions_worksheet.jpeg',
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

  // Sample Gallery - REAL file paths from samples/english/prepositions/
  samples: {
    sectionTitle: 'Exemples de Fiches sur les Prépositions',
    sectionDescription: 'Téléchargez des exemples gratuits pour voir notre qualité professionnelle',
    downloadLabel: 'Télécharger Exemple Gratuit',
    worksheetLabel: 'Fiche',
    answerKeyLabel: 'Corrigé',
    viewAllLabel: 'Agrandir',
    noPdfLabel: 'Aperçu uniquement',
    freePdfCountLabel: 'téléchargements gratuits',
    badgeText: 'Exemples Gratuits',
    downloadingLabel: 'Téléchargement...',
    ofLabel: 'sur',
    items: [
      {
        id: '1',
        worksheetSrc: '/samples/english/prepositions/prepositions_worksheet.jpeg',
        answerKeySrc: '/samples/english/prepositions/prepositions_answer_key.jpeg',
        altText: 'Fiche exercices sur les prépositions spatiales pour maternelle avec corrigé',
        pdfDownloadUrl: '/samples/english/prepositions/prepositions_worksheet.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/english/prepositions/prepositions multiple choice.jpeg',
        answerKeySrc: '/samples/english/prepositions/prepositions multiple choice answer_key.jpeg',
        altText: 'Fiche prépositions choix multiples pour exercices CP avec corrigé',
        pdfDownloadUrl: '/samples/english/prepositions/prepositions multiple choice.pdf',
      },
    ],
  },

  // Features Grid - FULL text from prepositions.md feature sections
  features: {
    sectionTitle: 'Fonctionnalités du Générateur - Fiches Maternelle et Exercices CP Personnalisables',
    sectionDescription: 'Notre générateur d\'exercices sur les prépositions propose toutes les fonctionnalités nécessaires pour créer des fiches maternelle professionnelles. Chaque outil a été conçu pour répondre aux besoins des enseignants de maternelle et de CP. L\'interface intuitive permet de produire rapidement des exercices de qualité. Les sept fonctionnalités principales garantissent une flexibilité totale pour vos fiches à imprimer gratuit.',
    highlightBadgeText: 'Fonctionnalité Clé',
    readMoreLabel: 'Lire la suite',
    showLessLabel: 'Voir moins',
    badgeText: 'Fonctionnalités',
    trustBadges: {
      allFeatures: 'Toutes les fonctionnalités incluses',
      noHiddenFees: 'Aucun frais caché',
      cancelAnytime: 'Résiliez à tout moment',
    },
    items: [
      {
        id: '1',
        icon: '⚡',
        title: 'Création Rapide de Fiches Maternelle et Exercices CP en 3 Clics',
        description: `Créez vos fiches à imprimer gratuit en quelques secondes. Sélectionnez d'abord la langue française pour générer les prépositions adaptées. Choisissez ensuite le mode d'exercice entre texte à trou et choix multiples. Cliquez enfin sur générer pour obtenir votre fiche maternelle complète. Le processus complet prend moins de 3 minutes. Aucune compétence technique requise. Les exercices CP s'adaptent automatiquement au format de page choisi. Générez plusieurs versions pour différencier vos exercices selon les niveaux.`,
        highlighted: true,
      },
      {
        id: '2',
        icon: '✏️',
        title: 'Personnalisation Complète des Fiches à Imprimer Gratuit - Exercices CP Modifiables',
        description: `Modifiez chaque élément directement sur le canevas de travail. Déplacez les images avec votre souris. Redimensionnez les illustrations pour mettre l'accent sur certains éléments. Faites pivoter les objets pour créer des compositions originales. Supprimez les éléments non souhaités d'un simple clic. Changez les couleurs des textes pour correspondre à votre thème de classe. Cette flexibilité permet d'adapter vos fiches maternelle aux besoins spécifiques de chaque élève. Les exercices CP deviennent véritablement personnalisés pour votre groupe.`,
        highlighted: false,
      },
      {
        id: '3',
        icon: '📤',
        title: 'Ajoutez Vos Propres Photos - Fiches Maternelle Personnalisées avec Images de Classe',
        description: `Importez vos propres images pour créer des fiches à imprimer gratuit encore plus pertinentes. Téléchargez plusieurs photos simultanément aux formats JPEG, PNG ou GIF. Ajoutez des photos de votre salle de classe. Intégrez des objets familiers à vos élèves de maternelle. Combinez vos images personnelles avec notre bibliothèque d'illustrations. Vos exercices CP deviennent uniques et adaptés au contexte de votre école. Les enfants reconnaissent les objets familiers et s'investissent davantage dans les exercices.`,
        highlighted: false,
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Interface en 11 Langues - Exercices CP et Fiches Maternelle Multilingues',
        description: `L'interface propose 11 langues incluant le français, l'anglais, l'allemand, l'espagnol et l'italien. Cette fonctionnalité s'avère particulièrement précieuse pour les enseignants en école internationale. Créez des fiches maternelle bilingues pour vos élèves en immersion. Générez des exercices CP avec des prépositions en français puis comparez avec l'anglais. Enseignez les concepts spatiaux dans plusieurs langues simultanément. Les enseignants FLE apprécient cette possibilité de créer des exercices multilingues. Les fiches à imprimer gratuit s'adaptent aux besoins des classes diversifiées.`,
        highlighted: false,
      },
      {
        id: '5',
        icon: '💰',
        title: 'Licence Commerciale Incluse - Vendez Vos Fiches Maternelle et Exercices CP',
        description: `Votre abonnement Accès Complet à 240 € par an inclut une licence commerciale complète. Vendez vos fiches à imprimer gratuit sur Teachers Pay Teachers sans frais de licence supplémentaires. Créez une boutique Etsy de ressources pédagogiques pour la maternelle. Publiez des cahiers d'exercices sur Amazon KDP. La qualité professionnelle 300 DPI convient parfaitement à l'impression commerciale. Aucune attribution requise sur vos produits vendus. Générez des revenus complémentaires avec vos exercices CP personnalisés. De nombreux enseignants créent des revenus mensuels entre 500 € et 5000 € en vendant leurs fiches maternelle.`,
        highlighted: true,
      },
      {
        id: '6',
        icon: '🎨',
        title: 'Bibliothèque de Plus de 3000 Images - Fiches à Imprimer Gratuit Variées',
        description: `Accédez à plus de 3000 illustrations adaptées aux jeunes enfants. Les images sont organisées par thèmes familiers. Sélectionnez des animaux, des objets du quotidien, des jouets ou du matériel scolaire. Chaque catégorie contient des dizaines d'options pour varier vos fiches maternelle. Recherchez des images spécifiques grâce à la barre de recherche intégrée. Les illustrations colorées captent l'attention des élèves de maternelle et CP. Combinez différents thèmes pour créer des exercices CP originaux. Les fonds et bordures décoratifs enrichissent vos fiches à imprimer gratuit.`,
        highlighted: false,
      },
      {
        id: '7',
        icon: '🖨️',
        title: 'Qualité Professionnelle 300 DPI - Exercices CP et Fiches Maternelle Nets à l\'Impression',
        description: `Téléchargez vos exercices au format PDF ou JPEG haute résolution. La résolution 300 DPI garantit une netteté parfaite à l'impression. Les textes restent lisibles même en petite taille. Les images conservent leurs détails et leurs couleurs vives. Vos fiches maternelle ont une apparence professionnelle digne d'un éditeur. Imprimez en couleur ou choisissez l'option noir et blanc pour économiser l'encre. Les exercices CP téléchargés conviennent aussi bien pour l'usage en classe que pour la vente en ligne. La qualité d'export répond aux standards exigés par les plateformes de vente de ressources pédagogiques.`,
        highlighted: true,
      },
    ],
  },

  // How-To Guide - FULL text from prepositions.md step sections
  howTo: {
    sectionTitle: 'Comment Créer des Fiches Maternelle et Exercices CP sur les Prépositions en 5 Étapes Simples',
    sectionDescription: 'Créez vos fiches à imprimer gratuit sur les prépositions en moins de 3 minutes. Le processus de création se décompose en cinq étapes faciles à suivre. Aucune compétence technique requise. L\'interface intuitive guide les enseignants de maternelle et de CP à travers chaque étape. Suivez simplement les instructions pour obtenir des exercices professionnels rapidement. Les captures d\'écran et explications détaillées rendent le processus encore plus simple.',
    ctaText: 'Commencer Maintenant',
    badgeText: 'Comment Ça Marche',
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
        title: 'Choisissez la Langue et les Prépositions pour Vos Fiches Maternelle',
        description: `Sélectionnez d'abord la langue française dans le menu déroulant en haut de l'interface. Cette sélection détermine quelles prépositions apparaîtront dans vos exercices CP. Le système affiche automatiquement les prépositions françaises essentielles. Vous voyez apparaître sur, sous, dans, devant, derrière, entre, à côté de, au-dessus et en dessous. Cochez les prépositions que vous souhaitez travailler avec vos élèves de maternelle. Concentrez-vous sur 3 à 5 prépositions pour les jeunes enfants. Incluez davantage de prépositions pour les élèves de CP plus avancés. Choisissez ensuite le mode d'exercice. Le mode texte à trou convient aux élèves qui commencent l'écriture cursive et le graphisme maternelle. Le mode choix multiples s'adapte mieux aux très jeunes élèves qui découvrent les prépositions spatiales. Personnalisez le texte d'instruction pour le mode choix multiples si vous le souhaitez.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Configurez le Format de Vos Fiches à Imprimer Gratuit et Exercices CP',
        description: `Définissez le format de page selon vos besoins d'impression. Sélectionnez Lettre Portrait pour le papier américain standard. Choisissez A4 Portrait pour le format européen classique. Les formats paysage offrent plus d'espace horizontal pour les illustrations. Le format carré crée des fiches originales parfaites pour Instagram. Déterminez ensuite le contenu visuel de vos fiches maternelle. Le mode sélection manuelle vous permet de choisir précisément les images. Parcourez les thèmes disponibles comme les animaux, les jouets ou les objets scolaires. Recherchez des images spécifiques grâce à la barre de recherche. Sélectionnez 8 objets différents maximum pour vos exercices CP. Le mode tous les thèmes génère automatiquement une sélection variée d'images. Choisissez également si vous utilisez des formes géométriques simples ou des objets réels. Ajoutez un fond thématique et des bordures décoratives pour embellir vos fiches à imprimer gratuit. Réglez l'opacité des fonds pour ne pas surcharger visuellement la page.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Générez Vos Fiches Maternelle et Exercices CP avec Apprendre à Lire les Prépositions',
        description: `Cliquez sur le bouton Générer pour créer votre fiche d'exercices instantanément. Le système compose automatiquement la page en quelques secondes. Chaque exercice montre une image avec une préposition manquante ou à identifier. Les questions se répartissent harmonieusement sur la page. Les images sélectionnées apparaissent dans des positions variées illustrant les prépositions choisies. Un chat peut se trouver sous une table. Un oiseau se pose sur une branche. Un ballon flotte au-dessus d'une boîte. Ces situations concrètes aident les élèves de maternelle à visualiser les concepts spatiaux. La mise en page respecte les principes du graphisme maternelle avec des espaces clairs et une hiérarchie visuelle évidente. Les textes utilisent des polices adaptées aux jeunes lecteurs. La taille des caractères facilite la lecture pour les enfants en apprentissage. L'aperçu instantané vous permet d'évaluer le résultat immédiatement. Si le résultat ne vous convient pas entièrement, régénérez simplement pour obtenir une nouvelle disposition des éléments.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Personnalisez Vos Fiches à Imprimer Gratuit Directement sur le Canevas',
        description: `Modifiez chaque élément de vos exercices CP directement sur le canevas de travail. Cliquez sur n'importe quelle image pour la sélectionner. Des poignées de redimensionnement apparaissent autour de l'objet sélectionné. Agrandissez ou réduisez l'image en tirant sur les coins. Faites pivoter l'illustration en utilisant la poignée de rotation circulaire. Déplacez les éléments simplement en les faisant glisser avec votre souris. Supprimez les objets non souhaités en appuyant sur la touche Suppr. Ajoutez du texte personnalisé pour créer un titre accrocheur pour vos fiches maternelle. Tapez le nom de l'élève, la date ou des instructions spécifiques. Sélectionnez le texte pour modifier sa couleur, sa taille ou sa police. Changez les couleurs pour correspondre au thème de votre classe ou à une saison particulière. Importez vos propres photos en cliquant sur le bouton de téléchargement d'images. Ajoutez des photos de votre salle de classe ou d'objets familiers aux enfants. Ces personnalisations rendent vos exercices CP uniques et particulièrement pertinents pour votre groupe d'élèves. Prenez le temps d'ajuster la composition jusqu'à obtenir exactement le résultat souhaité.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Téléchargez et Imprimez Vos Exercices CP et Fiches Maternelle avec Corrigés',
        description: `Générez d'abord le corrigé en cliquant sur Générer Corrigé dans le menu déroulant. Le système crée automatiquement la version avec les réponses complétées. Passez d'un onglet à l'autre pour comparer la fiche d'exercice et son corrigé. Vérifiez que tout correspond à vos attentes pédagogiques. Cliquez ensuite sur le bouton Télécharger pour accéder aux options d'export. Téléchargez la fiche d'exercice au format PDF pour une impression directe. Le format PDF préserve parfaitement la mise en page et les polices. Téléchargez le corrigé au format PDF également. Le format JPEG convient si vous souhaitez intégrer les fiches à imprimer gratuit dans d'autres documents. Insérez les images JPEG dans vos présentations PowerPoint ou vos newsletters. Tous les téléchargements utilisent une résolution professionnelle 300 DPI. Cette qualité garantit des impressions nettes même sur du papier épais. Imprimez vos fiches maternelle en couleur pour maximiser l'engagement visuel. Choisissez l'impression en noir et blanc pour économiser l'encre de votre imprimante. Photocopiez les exercices CP autant de fois que nécessaire pour toute votre classe. Conservez les fichiers numériques pour réutilisation future ou pour créer des packs de fiches à imprimer gratuit thématiques.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from prepositions.md use case sections
  useCases: {
    sectionTitle: 'Pour Qui - Enseignants, Parents et Éducateurs Utilisent Ces Fiches Maternelle',
    sectionDescription: 'Les exercices sur les prépositions conviennent à différents profils d\'enseignants et d\'éducateurs. Chaque groupe trouve des avantages spécifiques dans ce générateur de fiches à imprimer gratuit. Les besoins pédagogiques varient selon le contexte d\'enseignement. Notre outil s\'adapte à toutes ces situations. Les six profils d\'utilisateurs principaux bénéficient chacun de fonctionnalités particulières.',
    badgeText: 'Pour Qui',
    readMoreLabel: 'Lire la suite',
    showLessLabel: 'Voir moins',
    items: [
      {
        id: '1',
        icon: '👶',
        title: 'Enseignants de Maternelle',
        subtitle: 'Graphisme Maternelle et Fiches à Imprimer Gratuit pour PS MS GS',
        description: `Les enseignants de petite section, moyenne section et grande section utilisent ces fiches pour introduire les concepts spatiaux fondamentaux. Le graphisme maternelle intégré aide les jeunes enfants à développer leur compréhension visuelle de l'espace. Les prépositions comme sur, sous et dans se travaillent d'abord visuellement avant l'écrit. Les fiches à imprimer gratuit permettent de varier les supports sans contrainte budgétaire. Créez des séries d'exercices progressifs sur plusieurs semaines. Commencez par des prépositions simples avec des images très contrastées. Augmentez progressivement la difficulté en ajoutant plus de prépositions. Le mode choix multiples convient parfaitement aux élèves de maternelle qui ne maîtrisent pas encore l'écriture. Les images colorées et attrayantes maintiennent l'attention des tout-petits. Personnalisez avec des photos de la mascotte de classe ou des objets familiers de la salle. Ces fiches maternelle deviennent des outils de différenciation précieux pour adapter aux niveaux hétérogènes.`,
        quote: 'Mes élèves adorent apprendre les prépositions avec ces fiches colorées !',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Enseignants CP et CE1',
        subtitle: 'Apprendre à Lire les Prépositions avec Exercices Écrits',
        description: `Les enseignants de CP et CE1 intègrent les exercices sur les prépositions dans l'apprentissage de la lecture. Apprendre à lire inclut la compréhension de ces petits mots essentiels qui structurent les phrases. Le mode texte à trou développe simultanément la lecture et l'écriture des prépositions. Les élèves de CP visualisent d'abord la situation spatiale puis écrivent le mot correspondant. Cette double approche visuelle et textuelle renforce la mémorisation orthographique. Les fiches à imprimer gratuit s'utilisent en atelier autonome pendant que vous travaillez en petit groupe. Créez des séries différenciées pour les élèves avancés et ceux nécessitant plus de soutien. Les CE1 bénéficient d'exercices plus complexes avec des prépositions composées comme au-dessus de ou à côté de. Intégrez ces fiches dans vos plans de travail hebdomadaires. Les corrigés automatiques facilitent l'autocorrection et développent l'autonomie des élèves. Combinez les exercices sur les prépositions avec votre méthode de lecture pour renforcer les compétences transversales.`,
        quote: 'L\'apprentissage des prépositions prépare parfaitement mes élèves à la lecture.',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Parents en Instruction à Domicile',
        subtitle: 'Fiches Maternelle avec Alphabet et Écriture Cursive Personnalisées',
        description: `Les familles pratiquant l'instruction en famille apprécient la flexibilité totale du générateur. Créez des fiches maternelle adaptées exactement au niveau de votre enfant. Intégrez l'apprentissage des prépositions avec l'alphabet en utilisant des objets commençant par des lettres spécifiques. Un avion au-dessus d'un arbre renforce simultanément la lettre A et la préposition au-dessus. Les parents travaillant l'écriture cursive peuvent ajouter du texte personnalisé avec différentes polices. Ajoutez le prénom de l'enfant sur chaque fiche pour augmenter la motivation. Photographiez les jouets préférés de votre enfant et importez-les dans les exercices. Cette personnalisation maximale maintient l'engagement dans les apprentissages formels. Les fiches à imprimer gratuit éliminent le coût des cahiers d'exercices commerciaux. Créez autant de variations que nécessaire pour consolider chaque préposition. Imprimez plusieurs fois la même fiche si votre enfant bénéficie de la répétition. L'interface en français facilite la création rapide même sans formation pédagogique formelle.`,
        quote: 'Je peux adapter les fiches au niveau exact de mon enfant.',
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Enseignants FLE et Langues Étrangères',
        subtitle: 'Fiches à Imprimer Gratuit Multilingues pour Comparaison',
        description: `Les professeurs de français langue étrangère trouvent un outil précieux pour enseigner les prépositions spatiales. Les fiches à imprimer gratuit en 11 langues permettent la comparaison directe entre systèmes linguistiques. Générez d'abord des exercices en français puis créez la version équivalente en anglais ou en espagnol. Les apprenants visualisent comment différentes langues expriment les mêmes concepts spatiaux. Cette approche contrastive accélère la compréhension pour les élèves multilingues. Les enseignants en école internationale créent des ressources bilingues adaptées à leur contexte. Les classes d'immersion française bénéficient d'exercices visuels qui ne dépendent pas uniquement du vocabulaire. Les images parlent d'elles-mêmes avant même la lecture des consignes. Personnalisez les instructions dans la langue maternelle des élèves si besoin. Les adultes apprenant le français apprécient les exercices clairs avec corrigés immédiats. Créez des séries thématiques pour enrichir simultanément le vocabulaire et les prépositions.`,
        quote: 'L\'approche multilingue accélère l\'apprentissage des prépositions.',
      },
      {
        id: '5',
        icon: '♿',
        title: 'Enseignants Spécialisés',
        subtitle: 'Coloriage à Imprimer et Graphisme Maternelle Adapté pour Élèves à Besoins Particuliers',
        description: `Les enseignants en ULIS, SEGPA et classes spécialisées adaptent facilement les fiches aux besoins spécifiques. Combinez coloriage à imprimer et apprentissage des prépositions pour une approche multisensorielle. Les élèves colorient d'abord les images puis complètent l'exercice sur les positions spatiales. Cette double activité maintient l'attention plus longtemps. Le graphisme maternelle intégré aux exercices renforce la motricité fine simultanément. Agrandissez les éléments pour les élèves ayant des difficultés de coordination. Simplifiez en ne travaillant qu'une ou deux prépositions par fiche. Utilisez des images très concrètes et facilement identifiables. Importez des photos de l'environnement familier de l'élève pour faciliter la compréhension. Les élèves autistes bénéficient de supports visuels clairs et prévisibles. Créez des séries identiques dans leur structure mais avec des images différentes. Les fiches à imprimer gratuit permettent la répétition intensive sans limite budgétaire. Plastifiez les exercices pour créer du matériel manipulable réutilisable avec feutre effaçable.`,
        quote: 'Les fiches s\'adaptent parfaitement aux besoins de mes élèves.',
      },
      {
        id: '6',
        icon: '💼',
        title: 'Entrepreneurs Pédagogiques',
        subtitle: 'Vendez Vos Fiches Maternelle et Exercices CP sur Teachers Pay Teachers',
        description: `Les enseignants créant des ressources pédagogiques à vendre trouvent un outil de production efficace. Générez rapidement des packs thématiques de fiches maternelle sur les prépositions. La licence commerciale incluse dans Accès Complet à 240 € par an autorise la vente sans frais supplémentaires. Créez des collections complètes pour différents niveaux de la maternelle au CE2. Les boutiques Teachers Pay Teachers proposant des fiches à imprimer gratuit attirent d'abord les clients gratuitement. Offrez quelques fiches gratuites puis vendez des packs complets premium. La qualité professionnelle 300 DPI répond aux standards des plateformes de vente. Créez des visuels attractifs pour Pinterest en utilisant le format carré. Les enseignants recherchent activement des exercices sur les prépositions bien conçus. Différenciez-vous en proposant des thèmes originaux ou des personnages attachants. Certains créateurs génèrent entre 500 € et 5000 € mensuels avec des ressources maternelle et CP. Investissez 3 minutes par fiche et vendez le pack résultant pendant des années. La rapidité de création permet de tester différents concepts et d'identifier les plus vendeurs.`,
        quote: 'Je génère des revenus complémentaires grâce à mes fiches.',
      },
    ],
  },

  // FAQ Section - FULL text from prepositions.md FAQ sections
  faq: {
    sectionTitle: 'Questions Fréquentes sur les Fiches à Imprimer Gratuit et Exercices sur les Prépositions',
    sectionDescription: 'Les enseignants se posent souvent les mêmes questions avant de s\'abonner. Cette section répond aux interrogations les plus courantes concernant le générateur d\'exercices sur les prépositions. Clarifiez vos doutes avant de commencer à créer vos fiches maternelle. Les réponses détaillées vous aident à comprendre toutes les possibilités de l\'outil.',
    showMoreText: 'Afficher plus de questions',
    showLessText: 'Afficher moins',
    badgeText: 'FAQ',
    readMoreLabel: 'Lire la suite',
    showLessLabel: 'Voir moins',
    secureCheckout: 'Paiement sécurisé',
    cancelAnytime: 'Résiliez à tout moment',
    items: [
      {
        id: '1',
        question: 'Ce générateur de fiches à imprimer gratuit est-il vraiment gratuit à utiliser pour créer des exercices sur les prépositions ?',
        answer: `Le générateur d'exercices sur les prépositions nécessite un abonnement Accès Complet coûtant 240 € par an ou 25 € par mois. Votre abonnement vous donne accès illimité à la création de fiches sans frais supplémentaires par fiche. Générez autant de fiches à imprimer gratuit que nécessaire sans coûts additionnels. Le terme gratuit fait référence au fait que vous ne payez pas par fiche générée. Créez 10 fiches ou 1000 fiches pour le même prix d'abonnement annuel. L'abonnement Accès Complet inclut les 33 générateurs de la plateforme. Utilisez également les générateurs d'exercices maths, de coloriage à imprimer, d'activités sur l'alphabet et bien d'autres. Les deux formules d'abonnement incluent la licence commerciale complète. Accédez au support en 11 langues. Bénéficiez de la qualité professionnelle 300 DPI pour tous vos téléchargements. L'abonnement se renouvelle automatiquement mais vous pouvez l'annuler à tout moment.`,
      },
      {
        id: '2',
        question: 'Puis-je combiner ces fiches avec des exercices maths et des tables de multiplication pour créer des packs complets ?',
        answer: `Absolument. Votre abonnement Accès Complet inclut l'accès au générateur d'exercices maths et au générateur de tables de multiplication. Créez des packs pédagogiques complets combinant plusieurs compétences. Les prépositions spatiales se combinent naturellement avec les exercices maths pour des activités intégrées. Demandez aux élèves de placer des nombres selon des positions spatiales. Mettez le 5 au-dessus du 3 et le 7 sous le 5. Ces exercices renforcent simultanément la compréhension spatiale et le calcul. Créez des fiches maternelle thématiques incluant prépositions, graphisme maternelle et coloriage à imprimer. Les élèves colorient d'abord puis complètent l'exercice spatial. Intégrez l'apprentissage de l'alphabet en demandant de placer des lettres selon des prépositions. Placez le A à côté du B et le C au-dessus du D. Les tables de multiplication deviennent plus engageantes avec un contexte spatial visuel. Téléchargez plusieurs types de fiches puis combinez-les dans un seul PDF. Vendez ces packs complets sur Teachers Pay Teachers pour maximiser vos revenus. Les enseignants apprécient les ressources tout-en-un couvrant plusieurs compétences.`,
      },
      {
        id: '3',
        question: 'Les fiches conviennent-elles pour apprendre à lire les prépositions en maternelle et CP ?',
        answer: `Oui. Les fiches s'adaptent parfaitement à l'enseignement de la lecture des prépositions. Les élèves de maternelle commencent par identifier visuellement les positions spatiales. Les images claires montrent concrètement ce que signifient sur, sous, dans et devant. Les très jeunes enfants travaillent d'abord la compréhension orale des prépositions. Montrez la fiche et demandez oralement de trouver l'objet au-dessus d'un autre. Progressivement introduisez les mots écrits. Les élèves de grande section reconnaissent visuellement les prépositions fréquentes. Le mode choix multiples permet de pointer la bonne réponse sans encore écrire. Les élèves de CP utilisent le mode texte à trou pour apprendre à lire et écrire les prépositions. Ils lisent d'abord la phrase incomplète. Ensuite ils écrivent la préposition manquante. Cette approche développe simultanément la lecture et l'écriture cursive. Les CE1 travaillent des prépositions plus complexes comme au-dessus de ou à côté de. Combinez avec votre méthode de lecture habituelle. Intégrez les prépositions dans vos listes de mots outils à mémoriser. Les fiches renforcent la reconnaissance globale de ces petits mots essentiels.`,
      },
      {
        id: '4',
        question: 'Puis-je utiliser ces fiches pour enseigner le graphisme maternelle et l\'écriture cursive simultanément ?',
        answer: `Partiellement. Les fiches sur les prépositions se concentrent principalement sur la compréhension spatiale. Mais vous pouvez les adapter pour intégrer le graphisme maternelle. Utilisez les images comme repères pour des exercices de tracé. Demandez aux élèves de tracer une ligne du chat jusqu'à la souris. Cette ligne suit une préposition comme vers ou jusqu'à. Les élèves pratiquent la motricité fine tout en travaillant le vocabulaire spatial. Ajoutez du texte personnalisé pour créer des espaces d'écriture cursive. Tapez des lignes pour que les enfants recopient les prépositions en écriture cursive. Sélectionnez une police cursive dans les options de police. Les élèves s'entraînent à former les lettres cursives des prépositions courantes. Importez vos propres feuilles de graphisme comme arrière-plan. Superposez l'exercice sur les prépositions à vos lignes d'écriture existantes. Pour des exercices de graphisme maternelle purs utilisez les autres générateurs de la plateforme. Le générateur de coloriage à imprimer propose des activités de graphisme décoratif. Combinez plusieurs fiches différentes pour créer des cahiers d'activités variés. Les abonnés Accès Complet accèdent à tous les générateurs pour une approche pédagogique complète.`,
      },
      {
        id: '5',
        question: 'Puis-je créer des fiches maternelle avec coloriage à imprimer intégré pour maintenir l\'attention des jeunes élèves ?',
        answer: `Les fiches sur les prépositions incluent des images que les élèves peuvent colorier après avoir complété l'exercice. Imprimez les fiches en noir et blanc pour économiser l'encre et permettre le coloriage. Les jeunes enfants de maternelle apprécient cette double activité. Ils résolvent d'abord l'exercice spatial puis colorient les images. Cette approche maintient l'engagement plus longtemps que les exercices uniquement textuels. Les images d'animaux, de jouets et d'objets familiers attirent naturellement l'attention des petits. Sélectionnez des thèmes visuellement attrayants lors de la génération. Choisissez des images avec de grandes surfaces à colorier. Les très jeunes élèves bénéficient de contours épais et d'espaces généreux. Pour des activités de coloriage à imprimer plus avancées utilisez le générateur dédié de la plateforme. Ce générateur spécialisé propose des mandalas, des scènes complexes et des personnages détaillés. Votre abonnement Accès Complet inclut l'accès à ce générateur également. Combinez les deux types de fiches dans vos plans de travail hebdomadaires. Alternez exercices de prépositions et pages de coloriage pur. Les élèves travaillent différentes compétences tout en maintenant leur motivation élevée.`,
      },
      {
        id: '6',
        question: 'Les fiches incluent-elles des exercices sur l\'alphabet et apprendre les lettres pour les tout-petits ?',
        answer: `Les fiches sur les prépositions se concentrent spécifiquement sur les positions spatiales. Mais vous pouvez les utiliser créativement pour renforcer l'apprentissage de l'alphabet simultanément. Sélectionnez des images d'objets commençant par des lettres spécifiques. Un avion au-dessus d'un arbre travaille simultanément la préposition et la lettre A. Un ballon sous un bateau renforce le B tout en enseignant les positions spatiales. Cette approche intégrée développe plusieurs compétences à la fois. Les enfants apprennent les prépositions tout en révisant les sons initiaux de l'alphabet. Créez des séries progressives couvrant toutes les lettres de A à Z. Chaque fiche se concentre sur 2 ou 3 lettres avec des objets placés selon différentes prépositions. Ajoutez du texte personnalisé mentionnant explicitement les lettres travaillées. Tapez La lettre A est au-dessus de la lettre B comme instruction. Combinez ensuite avec des fiches dédiées à apprendre les lettres produites par les générateurs spécialisés. Votre abonnement Accès Complet inclut le générateur d'activités sur l'alphabet. Créez des feuilles de reconnaissance de lettres complétant vos exercices de prépositions. Ajoutez également des feuilles de tracé pour pratiquer l'écriture de chaque lettre. Assemblez prépositions, alphabet et tracé dans des cahiers pédagogiques complets. Ces packs couvrent toutes les compétences fondamentales de maternelle dans un format cohérent.`,
      },
      {
        id: '7',
        question: 'Comment personnaliser ces fiches à imprimer gratuit pour différents niveaux de maternelle ?',
        answer: `La personnalisation s'effectue facilement à plusieurs niveaux. Pour la petite section simplifiez au maximum. Utilisez seulement 2 ou 3 prépositions très courantes comme sur et sous. Sélectionnez des images très contrastées et facilement reconnaissables. Agrandissez les éléments pour faciliter la manipulation visuelle. Le mode choix multiples convient mieux aux tout-petits. Pour la moyenne section augmentez à 4 ou 5 prépositions incluant dans et devant. Introduisez des images légèrement plus variées. Maintenez une mise en page claire avec beaucoup d'espace blanc. Pour la grande section travaillez 6 à 8 prépositions incluant entre et à côté de. Utilisez des images plus complexes et des compositions spatiales plus riches. Introduisez progressivement le mode texte à trou. Les enfants commencent à écrire les prépositions les plus simples. Ajustez également le nombre de questions par fiche. Petite section 4 à 6 questions maximum. Moyenne section 6 à 8 questions. Grande section 8 à 10 questions. Modifiez les couleurs de fond selon les préférences de votre classe. Importez des photos de votre mascotte pour personnaliser davantage. Créez des séries progressives à utiliser sur plusieurs semaines. Commencez simple en début d'année puis augmentez la difficulté.`,
      },
      {
        id: '8',
        question: 'Puis-je combiner ces exercices avec des exercices maths et du calcul pour des activités intégrées ?',
        answer: `Absolument. L'intégration des prépositions avec les exercices maths crée des activités riches et engageantes. Utilisez les positions spatiales pour enseigner des concepts mathématiques. Placez 3 pommes au-dessus de la ligne et 2 pommes en dessous. Combien de pommes en tout. Les élèves travaillent addition et prépositions simultanément. Créez des exercices de soustraction avec un contexte spatial. Il y a 5 oiseaux sur la branche. 2 oiseaux s'envolent. Combien reste-t-il sur la branche. Les prépositions donnent du sens concret aux opérations abstraites. Enseignez les comparaisons avec un vocabulaire spatial. Le nombre au-dessus est-il plus grand que le nombre en dessous. Les enfants visualisent concrètement les relations entre quantités. Introduisez les tables de multiplication avec des arrangements spatiaux. Placez 3 rangées de 4 objets. Combien d'objets en tout. La disposition spatiale aide à comprendre la multiplication. Votre abonnement Accès Complet inclut le générateur d'exercices maths dédié. Créez d'abord une fiche de prépositions puis une fiche de calcul. Combinez les deux dans un PDF pour un parcours complet. Les élèves alternent entre exercices spatiaux et numériques. Cette variation maintient l'attention et renforce les connexions entre domaines mathématiques.`,
      },
      {
        id: '9',
        question: 'Les fiches conviennent-elles pour enseigner l\'écriture cursive aux élèves de CP et CE1 ?',
        answer: `Les fiches sur les prépositions ne sont pas spécifiquement conçues pour l'enseignement de l'écriture cursive. Mais vous pouvez les adapter à cet usage. Le mode texte à trou demande aux élèves d'écrire les prépositions manquantes. Les enfants pratiquent l'écriture des mots fréquents en contexte significatif. Ajoutez du texte personnalisé avec une police cursive comme modèle. Les élèves recopient les prépositions en suivant le tracé cursif. Créez des lignes d'écriture supplémentaires en bas de la fiche. Les enfants recopient plusieurs fois sur, sous et dans sur des lignes d'écriture. Cette répétition développe la fluidité du geste graphique et la mémorisation orthographique. Pour des exercices d'écriture cursive dédiés utilisez les générateurs spécialisés de la plateforme. Le générateur de tracé propose des lignes de lettres cursives. Le générateur de mots fréquents offre des exercices de copie. Combinez ces différents types de fiches dans votre progression pédagogique. Les élèves travaillent la formation des lettres cursives puis appliquent dans des exercices contextualisés. Les fiches sur les prépositions deviennent alors des exercices d'application. Les enfants utilisent leur écriture cursive nouvellement acquise pour compléter des phrases spatiales.`,
      },
      {
        id: '10',
        question: 'Combien de temps faut-il pour créer des fiches maternelle et des exercices CP professionnels ?',
        answer: `La création d'une fiche complète prend moins de 3 minutes du début à la fin. Sélectionnez d'abord la langue française et cochez les prépositions souhaitées. Cette étape prend environ 30 secondes. Choisissez ensuite le format de page et le mode d'exercice. Encore 20 secondes. Sélectionnez vos images manuellement ou laissez le système choisir automatiquement. La sélection manuelle ajoute 60 secondes si vous parcourez les thèmes. La sélection automatique est instantanée. Cliquez sur générer et votre fiche apparaît en 5 secondes. Effectuez les ajustements finaux sur le canevas si nécessaire. Déplacez quelques éléments, changez une couleur. Comptez 30 secondes pour ces modifications optionnelles. Générez le corrigé en 5 secondes supplémentaires. Téléchargez les deux fichiers PDF. Le téléchargement prend 10 secondes. Total environ 2 minutes et 40 secondes pour une fiche complète avec corrigé. Comparez avec la création manuelle qui nécessite 45 à 60 minutes. Vous économisez environ 95 pour cent de votre temps de préparation. Créez 10 fiches variées en moins de 30 minutes. Cette efficacité transforme votre planification hebdomadaire. Préparez une semaine entière de fiches en une heure au lieu d'une journée complète.`,
      },
      {
        id: '11',
        question: 'Puis-je vendre les fiches que je crée avec ce générateur sur Teachers Pay Teachers et Etsy ?',
        answer: `Oui. Votre abonnement Accès Complet à 240 € par an inclut une licence commerciale complète d'impression à la demande. Vendez vos créations sur Teachers Pay Teachers sans frais de licence supplémentaires. Créez des boutiques Etsy spécialisées dans les fiches à imprimer gratuit. Publiez des livres d'activités sur Amazon KDP. Aucune attribution requise sur vos produits vendus. Vos clients ne savent pas que vous utilisez un générateur. Le résultat semble entièrement fait main. La qualité professionnelle 300 DPI répond aux standards des plateformes de vente. Les fichiers PDF téléchargés conviennent parfaitement pour la revente. Créez des packs thématiques regroupant plusieurs fiches. Vendez des collections saisonnières de fiches maternelle sur les prépositions. Les ressources sur les positions spatiales se vendent bien car peu de créateurs en proposent. Différenciez-vous avec des thèmes originaux ou des personnages cohérents. Certains enseignants entrepreneurs génèrent entre 500 € et 5000 € mensuels. Investissez 3 minutes par fiche puis vendez indéfiniment. Une fiche créée aujourd'hui produit potentiellement des revenus pendant des années. Utilisez Pinterest pour promouvoir gratuitement vos créations. Le format carré du générateur crée des épingles parfaites. Testez différents concepts rapidement grâce à la vitesse de création. Identifiez ce qui se vend le mieux puis produisez davantage dans cette direction.`,
      },
      {
        id: '12',
        question: 'Les exercices incluent-ils des corrigés automatiques pour faciliter la correction en classe ?',
        answer: `Oui. Chaque fiche générée dispose d'un corrigé automatique créé simultanément. Cliquez sur Générer Corrigé dans le menu déroulant. Le système produit instantanément la version complétée avec toutes les réponses. Les deux onglets vous permettent de basculer entre la fiche d'exercice et le corrigé. Vérifiez que les réponses correspondent à vos attentes pédagogiques. Téléchargez les deux fichiers séparément. La fiche d'exercice va aux élèves. Le corrigé reste pour vous ou pour l'autocorrection. Les corrigés automatiques économisent un temps considérable. Pas besoin de créer manuellement une deuxième version. Pas de risque d'erreur dans le corrigé. Le système remplit automatiquement toutes les bonnes prépositions. Les élèves de CE1 utilisent les corrigés pour l'autocorrection. Développez leur autonomie en leur donnant accès au corrigé après avoir terminé. Ils vérifient eux-mêmes leurs réponses et identifient leurs erreurs. Les enseignants avec plusieurs niveaux apprécient particulièrement cette fonctionnalité. Distribuez différentes fiches à différents groupes. Chaque fiche a son propre corrigé. Vous gérez l'hétérogénéité sans augmenter votre charge de correction. Les parents en instruction à domicile utilisent les corrigés pour vérifier le travail de leurs enfants. Même sans formation pédagogique formelle ils peuvent superviser les exercices efficacement.`,
      },
    ],
  },

  // Related Apps Section
  relatedApps: {
    sectionTitle: 'Combinez les Exercices sur les Prépositions avec Autres Fiches à Imprimer Gratuit',
    sectionDescription: 'Votre abonnement Accès Complet vous donne accès à 33 générateurs de fiches pédagogiques différents. Combinez les exercices sur les prépositions avec d\'autres types de fiches pour créer des parcours d\'apprentissage complets. Les enseignants de maternelle et CP bénéficient particulièrement de cette approche intégrée. Créez des packs thématiques couvrant plusieurs compétences simultanément.',
    ctaTitle: 'Prêt à Créer des Fiches Professionnelles sur les Prépositions ?',
    ctaDescription: 'Rejoignez des milliers d\'enseignants qui créent des fiches maternelle et exercices CP professionnels en moins de 3 minutes.',
    primaryCtaText: 'Commencer l\'Essai Gratuit',
    secondaryCtaText: 'Voir les 33 Applications',
    badgeText: 'Fonctionne Parfaitement Avec',
    exploreText: 'Explorer toutes les applications',
    trustBadges: {
      guarantee: 'Garantie 30 jours',
      securePayment: 'Paiement sécurisé',
      cancelAnytime: 'Résiliez à tout moment',
    },
    items: [
      {
        id: '1',
        slug: 'math-worksheet',
        name: 'Exercices Maths',
        category: 'Mathématiques',
        description: 'Combinez prépositions et calcul pour des activités intégrées. Les élèves travaillent les positions spatiales tout en pratiquant les opérations mathématiques.',
        icon: '➕',
      },
      {
        id: '2',
        slug: 'coloring',
        name: 'Coloriage à Imprimer',
        category: 'Créativité',
        description: 'Ajoutez du coloriage pour maintenir l\'engagement des jeunes élèves. Les enfants colorient après avoir complété l\'exercice sur les prépositions.',
        icon: '🎨',
      },
      {
        id: '3',
        slug: 'alphabet-train',
        name: 'Alphabet',
        category: 'Langage',
        description: 'Intégrez les prépositions avec l\'apprentissage des lettres. Placez des objets commençant par des lettres spécifiques selon des positions spatiales.',
        icon: '🔤',
      },
      {
        id: '4',
        slug: 'drawing-lines',
        name: 'Graphisme Maternelle',
        category: 'Motricité',
        description: 'Développez la motricité fine avec des exercices de tracé. Combinez prépositions et graphisme pour une approche multisensorielle.',
        icon: '✏️',
      },
    ],
  },

  // Pricing Section
  pricing: {
    title: 'Accès Complet',
    price: '240€',
    priceInterval: '/an',
    priceSuffix: 'Facturé annuellement',
    benefits: [
      '33 générateurs de fiches',
      'Création illimitée de fiches',
      'Qualité professionnelle 300 DPI',
      'Licence commerciale incluse',
      '11 langues disponibles',
      '3000+ images',
      'Corrigés automatiques',
    ],
    ctaText: 'Commencer Maintenant',
  },
};

export default prepositionsFrContent;
