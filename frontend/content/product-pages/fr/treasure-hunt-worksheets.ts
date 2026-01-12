import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Treasure Hunt Worksheets - French Content
 *
 * File: frontend/content/product-pages/fr/treasure-hunt-worksheets.ts
 * URL: /fr/apps/chasse-au-tresor-fiches (French SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/French/treasure-hunt.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 *
 * PRICING: Accès Complet = 240€/an (Accès Complet)
 * App ID: treasure-hunt
 */

export const treasureHuntFrContent: ProductPageContent = {
  // SEO Metadata - French language-specific
  seo: {
    slug: 'chasse-au-tresor-fiches',
    appId: 'treasure-hunt',
    title: 'Fiches Chasse au Trésor à Imprimer Gratuit - Générateur de Fiches Maternelle et CP avec Directions',
    description: 'Créez des fiches chasse au trésor professionnelles en moins de 3 minutes. Votre abonnement Accès Complet à 240 € par an vous donne un accès illimité à notre générateur. Créez autant de fiches maternelle que vous le souhaitez. Parfait pour enseigner les directions spatiales aux élèves de maternelle, CP et CE1.',
    keywords: 'fiches chasse au trésor, fiches à imprimer gratuit, fiches maternelle, exercices CP, directions spatiales, exercices CE1, graphisme maternelle, coloriage à imprimer, apprendre à lire, alphabet, écriture cursive, tables de multiplication',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fr/apps/chasse-au-tresor-fiches',
  },

  // Hero Section - FULL text from French treasure-hunt.md Section 1
  hero: {
    title: 'Générateur de Fiches Chasse au Trésor',
    subtitle: 'Fiches à Imprimer - Exercices Maternelle et CP avec Directions',
    description: `Créez des fiches chasse au trésor professionnelles en moins de 3 minutes. Votre abonnement Accès Complet à 240 € par an vous donne un accès illimité à notre générateur. Créez autant de fiches maternelle que vous le souhaitez, sans frais supplémentaires par fiche. Parfait pour enseigner les directions spatiales aux élèves de maternelle, CP et CE1.

Les fiches chasse au trésor combinent l'apprentissage des directions avec le plaisir de la résolution de problèmes. Vos élèves suivent des instructions écrites pour trouver le trésor sur une grille de 3×3. Choisissez entre des directions de base (haut/bas/gauche/droite) pour la maternelle ou des directions cardinales (nord/sud/est/ouest) pour les élèves de CE1 et plus. Le générateur crée automatiquement les indices et la fiche corrigée.

Notre générateur propose deux types de vocabulaire de directions adaptés à l'âge des élèves. Les directions de base conviennent parfaitement aux élèves de maternelle et CP qui apprennent les concepts spatiaux fondamentaux. Les directions cardinales sont idéales pour les élèves de CE1 et CE2 qui étudient la géographie et l'orientation. Téléchargez vos fiches en PDF ou JPEG haute résolution de 300 DPI, prêtes à imprimer.`,
    previewImageSrc: '/samples/english/treasure hunt/up down.jpeg',
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

  // Sample Gallery - REAL file paths from samples/english/treasure hunt/
  samples: {
    sectionTitle: 'Exemples de Fiches Chasse au Trésor',
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
        worksheetSrc: '/samples/english/treasure hunt/up down.jpeg',
        answerKeySrc: '/samples/english/treasure hunt/up down answer_key.jpeg',
        altText: 'Fiche chasse au trésor directions de base haut/bas pour maternelle et CP',
        pdfDownloadUrl: '/samples/english/treasure hunt/up down.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/english/treasure hunt/north south.jpeg',
        answerKeySrc: '/samples/english/treasure hunt/north south answer_key.jpeg',
        altText: 'Fiche chasse au trésor directions cardinales nord/sud pour CE1 et CE2',
        pdfDownloadUrl: '/samples/english/treasure hunt/north south.pdf',
      },
    ],
  },

  // Features Grid - FULL text from French treasure-hunt.md Section 2
  features: {
    sectionTitle: 'Fonctionnalités du Générateur de Fiches Chasse au Trésor - Tout pour Créer des Fiches Maternelle et Exercices CP',
    sectionDescription: 'Notre générateur de fiches chasse au trésor offre toutes les fonctionnalités dont vous avez besoin pour créer des exercices de qualité professionnelle. Créez des fiches maternelle personnalisées en quelques clics. Modifiez tout sur le canevas après génération. Téléchargez en PDF ou JPEG haute résolution. Votre abonnement Accès Complet inclut une licence commerciale complète pour vendre vos créations.',
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
        title: 'Créez des Fiches Maternelle et Exercices CP en 3 Clics - Générateur Rapide et Simple',
        description: `Générez une fiche chasse au trésor complète en trois étapes simples. Sélectionnez un thème d'images ou choisissez 6 images manuellement. Choisissez le type de directions (de base ou cardinales). Cliquez sur Créer et votre fiche apparaît instantanément. Le générateur crée automatiquement la grille 3×3, place les images aléatoirement et génère les indices de directions. La fiche corrigée se crée automatiquement avec le chemin vers le trésor clairement marqué.

Aucune compétence en conception graphique requise. L'interface est intuitive et en français. Les enseignants de maternelle peuvent créer des exercices CP professionnels sans formation. Les parents qui font l'école à la maison apprécient la simplicité. Trois clics et votre fiche est prête. Le processus complet prend moins de 3 minutes du début au téléchargement. Gagnez des heures par rapport à la création manuelle.`,
        highlighted: false,
      },
      {
        id: '2',
        icon: '✏️',
        title: 'Fiches à Imprimer Gratuit - Modifiez Tout sur le Canevas après Génération',
        description: `Chaque élément de votre fiche est entièrement modifiable. Déplacez les images pour ajuster la composition. Redimensionnez les illustrations pour les rendre plus grandes ou plus petites. Faites pivoter les éléments pour créer des variations visuelles. Supprimez tout élément indésirable. Ajoutez vos propres zones de texte avec des instructions personnalisées. Changez les couleurs, les polices et les tailles de texte.

Le canevas fonctionne exactement comme un éditeur graphique professionnel. Cliquez sur n'importe quel élément pour le sélectionner. Faites glisser pour déplacer. Utilisez les poignées pour redimensionner. Tout est modifiable sans limites. Cette flexibilité totale vous permet d'adapter chaque fiche aux besoins spécifiques de vos élèves. Créez des variations pour la différenciation pédagogique. Ajustez la difficulté en modifiant le nombre d'indices.`,
        highlighted: false,
      },
      {
        id: '3',
        icon: '📤',
        title: 'Téléversez Vos Propres Images - Créez des Fiches Personnalisées pour Apprendre à Lire et Exercices Maths',
        description: `Téléversez plusieurs images simultanément en un seul clic. Tous les formats courants sont acceptés : JPEG, PNG, GIF. Combinez vos images téléversées avec celles de notre bibliothèque. Créez des fiches chasse au trésor personnalisées avec les photos de vos élèves. Utilisez des images de votre programme scolaire spécifique. Intégrez des illustrations de vos manuels.

Cette fonction de téléversement transforme le générateur en outil pédagogique sur mesure. Créez des fiches sur le vocabulaire de votre unité d'enseignement actuelle. Utilisez des photos de sorties scolaires pour des activités de rappel. Ajoutez des images de la vie quotidienne pour enseigner le vocabulaire fonctionnel. Les élèves adorent voir des images familières dans leurs exercices. La personnalisation augmente l'engagement et la motivation.`,
        highlighted: false,
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Fiches Maternelle en 11 Langues - Interface et Contenu Multilingues pour Exercices CE1',
        description: `Le générateur fonctionne en 11 langues : français, anglais, allemand, espagnol, italien, portugais, néerlandais, suédois, danois, norvégien et finnois. L'interface utilisateur se traduit instantanément dans votre langue. Les instructions sur les fiches s'affichent dans la langue sélectionnée. Les directions (haut/bas/gauche/droite ou nord/sud/est/ouest) s'adaptent automatiquement.

Cette fonctionnalité multilingue est essentielle pour l'enseignement du FLE et des langues étrangères. Créez des fiches chasse au trésor pour enseigner le vocabulaire des directions en anglais. Utilisez-les dans des programmes d'immersion bilingue. Les écoles internationales apprécient la flexibilité linguistique. Les enseignants de français langue seconde créent des exercices dans la langue maternelle des élèves. Passez instantanément d'une langue à l'autre selon vos besoins pédagogiques.`,
        highlighted: false,
      },
      {
        id: '5',
        icon: '💰',
        title: 'Licence Commerciale Incluse - Vendez Vos Fiches à Imprimer Gratuit et Coloriage à Imprimer',
        description: `Votre abonnement Accès Complet à 240 € par an inclut une licence commerciale complète. Aucun frais supplémentaire pour les droits commerciaux. Vendez vos fiches chasse au trésor sur Teachers Pay Teachers. Créez une boutique Etsy de ressources pédagogiques imprimables. Publiez des cahiers d'activités sur Amazon KDP. Aucune attribution requise sur vos créations.

L'exportation en 300 DPI garantit une qualité professionnelle pour l'impression commerciale. Les enseignants entrepreneurs génèrent des revenus complémentaires significatifs. Certains créent des paquets thématiques de fiches qu'ils vendent 3 à 5 $ chacun. D'autres compilent des cahiers complets vendus 8 à 15 $. Le marketing sur Pinterest génère un trafic constant. Des enseignants gagnent entre 500 $ et 5000 $ par mois en vendant des ressources créées avec notre générateur.`,
        highlighted: true,
      },
      {
        id: '6',
        icon: '🎨',
        title: 'Bibliothèque de 3000+ Images - Thèmes pour Alphabet, Graphisme Maternelle et Coloriage',
        description: `Accédez à plus de 3000 images adaptées aux enfants. Images organisées par thèmes : animaux, nourriture, véhicules, école, nature, sports, professions et plus. Sélectionnez un thème complet et le générateur choisit 6 images automatiquement. Ou parcourez la bibliothèque pour sélectionner des images individuelles. Fonction de recherche pour trouver rapidement des images spécifiques.

Toutes les images sont optimisées pour l'impression. Couleurs vives et contours clairs. Parfaites pour les jeunes élèves. Les thèmes correspondent aux programmes de maternelle, CP et CE1. Images sans stéréotypes culturels inappropriés. Régulièrement mises à jour avec de nouveaux thèmes. Arrière-plans et bordures décoratives également disponibles. Personnalisez l'apparence visuelle de vos fiches. Créez des fiches cohérentes visuellement pour vos unités thématiques.`,
        highlighted: false,
      },
      {
        id: '7',
        icon: '🖨️',
        title: 'Qualité Professionnelle 300 DPI - PDF et JPEG pour Écriture et Tables de Multiplication',
        description: `Toutes les fiches s'exportent en résolution 300 DPI. Qualité parfaite pour l'impression professionnelle. Qualité parfaite pour la vente en ligne. Téléchargez en format PDF ou JPEG selon vos besoins. Le PDF préserve tous les éléments vectoriels pour une netteté maximale. Le JPEG offre une compatibilité universelle.

Option niveaux de gris pour économiser l'encre d'imprimante. Particulièrement utile pour les enseignants qui impriment des dizaines de copies. Les fiches en noir et blanc fonctionnent aussi bien pédagogiquement. Les élèves peuvent même colorier les images comme activité bonus. L'option niveaux de gris réduit les coûts d'impression de 60 à 80%. Imprimez à la maison sur une imprimante standard. Ou envoyez au service de photocopie de votre école pour des impressions en volume.`,
        highlighted: true,
      },
    ],
  },

  // How-To Guide - FULL text from French treasure-hunt.md Section 3
  howTo: {
    sectionTitle: 'Comment Créer des Fiches Maternelle et Exercices CP en 5 Étapes Simples - Chasse au Trésor Prête en 3 Minutes',
    sectionDescription: 'Créer une fiche chasse au trésor professionnelle ne prend que 3 minutes du début à la fin. Ce guide étape par étape vous montre exactement comment utiliser le générateur. Aucune compétence technique requise. Les enseignants de maternelle créent des fiches à imprimer gratuit dès leur première utilisation. Suivez ces cinq étapes simples pour créer des exercices CP personnalisés parfaits pour vos élèves.',
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
        title: 'Choisissez Vos Images pour Fiches à Imprimer Gratuit - Thème ou Sélection Manuelle avec Coloriage',
        description: `Commencez par sélectionner le contenu visuel de votre fiche chasse au trésor. Vous avez deux options principales. La première option est de choisir un thème complet dans le menu déroulant : animaux, nourriture, véhicules, école, nature, sports et bien d'autres. Le générateur sélectionne automatiquement 6 images appropriées du thème choisi. Cette méthode est la plus rapide et garantit une cohérence visuelle.

La deuxième option est de sélectionner 6 images manuellement. Cliquez sur le menu déroulant de thème de la bibliothèque pour parcourir plus de 3000 images organisées par catégories. Utilisez la barre de recherche pour trouver des images spécifiques. Cliquez sur chaque image pour l'ajouter à votre sélection. Un compteur affiche le nombre d'images sélectionnées (0/6). Continuez jusqu'à atteindre 6 images. Cette méthode vous donne un contrôle total sur le contenu pédagogique.

Vous pouvez aussi téléverser vos propres images. Cliquez sur le bouton "Choisir des fichiers" dans la section Téléverser des Images Personnalisées. Sélectionnez jusqu'à 6 images de votre ordinateur. Les formats JPEG, PNG et GIF sont acceptés. Vos images téléversées apparaissent dans la zone de prévisualisation. Cliquez sur chaque image pour l'ajouter à la sélection de 6 images. Combinez images téléversées et images de la bibliothèque selon vos besoins. Créez des fiches personnalisées avec le vocabulaire exact de votre programme.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Configurez les Paramètres pour Exercices CE1 et Graphisme Maternelle - Type de Directions et Format de Page',
        description: `Après avoir choisi vos 6 images, configurez les paramètres de la fiche. Le premier paramètre crucial est le type de directions. Ouvrez le menu déroulant "Type de directions" dans la section Configuration du Puzzle. Choisissez entre deux options : directions de base ou directions cardinales.

Les directions de base (haut, bas, gauche, droite) conviennent parfaitement aux élèves de maternelle et CP. C'est le vocabulaire spatial fondamental que les jeunes enfants comprennent intuitivement. Les indices utilisent des mots simples adaptés à l'âge. Cette option est recommandée pour les élèves de 4 à 7 ans qui apprennent les concepts de positionnement spatial.

Les directions cardinales (nord, sud, est, ouest) sont appropriées pour les élèves de CE1, CE2 et plus. Ces termes géographiques s'enseignent habituellement à partir de 7-8 ans. Les indices utilisent le vocabulaire géographique formel. Cette option renforce les compétences en orientation et géographie. Idéale pour intégrer les mathématiques et les études sociales.

Ensuite, configurez le format de page. Ouvrez la section Configuration de Page. Sélectionnez la taille de page : Letter Portrait, Letter Landscape, A4 Portrait, A4 Landscape ou format Carré. Le format A4 Portrait est standard en France. Le format Landscape offre plus d'espace horizontal pour la grille et les indices. Choisissez la couleur de fond de page si vous souhaitez une couleur autre que le blanc. Sélectionnez un thème d'arrière-plan décoratif pour ajouter une ambiance visuelle. Ajustez l'opacité de l'arrière-plan pour ne pas surcharger la fiche. Choisissez un thème de bordure pour encadrer professionnellement votre fiche.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Générez Votre Fiche Maternelle - Prévisualisation Instantanée avec Alphabet et Apprendre à Lire',
        description: `Une fois tous les paramètres configurés, cliquez sur le bouton bleu "Créer" dans l'en-tête. Le générateur traite votre demande en 2 à 5 secondes. Votre fiche chasse au trésor apparaît instantanément sur le canevas. Vous voyez exactement à quoi ressemblera la fiche imprimée.

Le générateur place automatiquement les 6 images dans une grille 3×3. Une case reste vide pour le trésor. Les images sont distribuées aléatoirement sur la grille. Chaque génération crée une disposition unique. Cette variation garantit que chaque élève reçoit un puzzle différent même avec le même thème.

Le côté gauche de la fiche affiche les indices de directions. Par exemple : "Commence au chat. Va 1 case vers le haut. Va 1 case vers la droite. Va 1 case vers le bas. Le trésor est ici !" Les instructions sont numérotées et faciles à suivre. Le texte est dans la langue sélectionnée dans les paramètres. La taille de police est optimisée pour la lisibilité des jeunes élèves.

Simultanément, le générateur crée automatiquement la fiche corrigée. Cliquez sur l'onglet "Fiche Corrigée" en haut pour la voir. La fiche corrigée montre exactement le même puzzle avec le chemin vers le trésor clairement marqué. Des flèches ou des lignes indiquent chaque déplacement. La case du trésor est mise en évidence. Les enseignants utilisent cette fiche corrigée pour vérifier rapidement le travail des élèves.

Si vous n'êtes pas satisfait du résultat, cliquez simplement sur "Créer" à nouveau. Le générateur crée une nouvelle fiche avec une disposition différente. Essayez plusieurs variations jusqu'à trouver celle qui vous plaît. Chaque génération ne prend que quelques secondes.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Modifiez sur le Canevas - Personnalisez Vos Fiches à Imprimer Gratuit et Exercices Maths',
        description: `Après génération, personnalisez chaque élément de votre fiche directement sur le canevas. Cliquez sur n'importe quelle image pour la sélectionner. Des poignées de redimensionnement apparaissent autour de l'image sélectionnée. Faites glisser les poignées pour agrandir ou réduire l'image. Faites glisser l'image elle-même pour la déplacer. Utilisez la poignée de rotation pour faire pivoter l'image.

Cliquez sur le bloc de texte des indices pour le sélectionner. Ouvrez la section Outils de Texte dans le panneau latéral gauche. Changez la couleur du texte avec le sélecteur de couleur. Ajustez la taille de police avec le curseur. Sélectionnez une police différente parmi les 6 options disponibles. Les polices incluent des styles adaptés aux enfants et des polices d'écriture manuscrite.

Ajoutez vos propres zones de texte personnalisées. Tapez votre texte dans le champ "Contenu" de la section Outils de Texte. Cliquez sur "Ajouter du Texte". La nouvelle zone de texte apparaît sur le canevas. Déplacez-la où vous voulez. Utilisez cette fonction pour ajouter le nom de l'élève, la date, des instructions supplémentaires ou des encouragements.

Modifiez l'arrière-plan ou la bordure après génération. Sélectionnez un nouveau thème d'arrière-plan dans la section Configuration de Page. L'arrière-plan se met à jour instantanément. Ajustez l'opacité pour trouver le bon équilibre visuel. Changez la bordure de la même manière. Essayez différentes combinaisons jusqu'à obtenir l'apparence désirée.

Verrouillez les éléments que vous ne voulez pas modifier accidentellement. Sélectionnez un élément et cliquez sur l'icône de cadenas dans la barre d'outils contextuelle. L'élément verrouillé ne peut plus être déplacé ou modifié. Cela protège la mise en page pendant que vous ajustez d'autres éléments. Déverrouillez en cliquant à nouveau sur l'icône de cadenas.

Utilisez les boutons Annuler et Rétablir pour revenir en arrière ou avancer dans vos modifications. Ces boutons se trouvent en haut à droite. Expérimentez librement sachant que vous pouvez toujours annuler. L'historique complet de vos modifications est sauvegardé pendant votre session de travail.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Téléchargez et Imprimez - Coloriage à Imprimer et Écriture Cursive en PDF et JPEG Haute Résolution',
        description: `Quand votre fiche est exactement comme vous la voulez, téléchargez-la. Cliquez sur le bouton "Télécharger" en haut à droite. Un menu déroulant s'ouvre avec quatre options principales : Fiche (JPEG), Fiche Corrigée (JPEG), Fiche (PDF) et Fiche Corrigée (PDF).

Le format JPEG offre une compatibilité universelle. Tous les ordinateurs et appareils peuvent ouvrir les fichiers JPEG. La taille de fichier est petite, idéale pour envoyer par courriel aux parents. Le format JPEG fonctionne parfaitement pour l'impression à la maison. Sélectionnez "Fiche (JPEG)" pour télécharger la fiche élève. Sélectionnez "Fiche Corrigée (JPEG)" pour télécharger la version avec les réponses.

Le format PDF préserve la qualité vectorielle maximale. Les fichiers PDF maintiennent la netteté parfaite à n'importe quelle échelle. Utilisez le PDF pour l'impression professionnelle en volume. Les services de photocopie préfèrent le format PDF. Le PDF est aussi idéal si vous vendez vos fiches sur Teachers Pay Teachers ou Etsy. Sélectionnez "Fiche (PDF)" ou "Fiche Corrigée (PDF)" selon vos besoins.

Avant de télécharger, cochez la case "Niveaux de gris" si vous voulez une version noir et blanc. Cette option réduit considérablement les coûts d'encre d'imprimante. Les fiches en noir et blanc fonctionnent tout aussi bien pédagogiquement. Les élèves peuvent même colorier les images comme activité supplémentaire de motricité fine. L'économie d'encre atteint 60 à 80% par rapport à l'impression couleur.

Tous les téléchargements sont en résolution 300 DPI. Cette résolution professionnelle garantit une netteté parfaite à l'impression. Les lignes sont nettes, le texte est clair, les images sont détaillées. La qualité 300 DPI convient à l'impression commerciale. Vos fiches ont l'apparence de matériel pédagogique publié professionnellement.

Téléchargez toujours les deux versions : la fiche élève et la fiche corrigée. La fiche élève va aux enfants pour qu'ils résolvent le puzzle. La fiche corrigée reste avec vous pour la correction rapide. Organisez vos fichiers dans des dossiers par thème ou par niveau scolaire. Créez une bibliothèque de fiches chasse au trésor réutilisables année après année.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from French treasure-hunt.md Section 4
  useCases: {
    sectionTitle: 'Parfait pour Enseignants, Parents et Éducateurs - Fiches Maternelle et Exercices CP pour Tous les Besoins',
    sectionDescription: 'Les fiches chasse au trésor conviennent à de nombreux contextes éducatifs différents. Les enseignants de maternelle les utilisent pour enseigner les directions spatiales. Les parents en IEF créent des exercices personnalisés. Les enseignants FLE intègrent le vocabulaire des directions. Les éducateurs spécialisés adaptent la difficulté pour leurs élèves. Les enseignants entrepreneurs vendent leurs créations en ligne. Découvrez comment chaque groupe bénéficie de ce générateur polyvalent.',
    badgeText: 'Cas d\'Utilisation',
    readMoreLabel: 'Lire la suite',
    showLessLabel: 'Voir moins',
    items: [
      {
        id: '1',
        icon: '👶',
        title: 'Enseignants de Maternelle',
        subtitle: 'Fiches Maternelle pour Apprendre les Directions et Graphisme Maternelle',
        description: `Les enseignants de maternelle (Petite Section, Moyenne Section, Grande Section) utilisent les fiches chasse au trésor pour enseigner les concepts spatiaux fondamentaux. Les élèves de 3 à 6 ans apprennent le vocabulaire des directions : haut, bas, gauche, droite. Ces concepts sont essentiels au développement cognitif précoce. Les fiches chasse au trésor rendent l'apprentissage ludique et engageant.

Sélectionnez le type de directions "de base" pour les jeunes élèves. Les instructions simples conviennent parfaitement à leur niveau de compréhension. Utilisez des thèmes familiers : animaux de la ferme, fruits, jouets, véhicules. Les images colorées captent l'attention des petits. Les grilles 3×3 ne sont pas trop complexes pour les débutants.

Intégrez les fiches chasse au trésor dans vos centres d'apprentissage autonome. Les élèves peuvent résoudre les puzzles individuellement pendant que vous travaillez avec des petits groupes. Plastifiez les fiches et utilisez des marqueurs effaçables pour une réutilisation illimitée. Créez plusieurs versions sur le même thème pour différencier selon les capacités.

Les fiches développent plusieurs compétences simultanément. La lecture des directions renforce la compréhension écrite émergente. Suivre les instructions séquentielles développe la pensée logique. Identifier les images travaille le vocabulaire. Tracer le chemin améliore la motricité fine. Une seule activité couvre plusieurs domaines d'apprentissage du programme de maternelle.`,
        quote: 'Mes élèves adorent résoudre les puzzles de chasse au trésor !',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Enseignants de CP, CE1 et CE2',
        subtitle: 'Exercices CP et Exercices CE1 pour Directions Cardinales et Orientation',
        description: `Les enseignants d'école élémentaire (CP, CE1, CE2) utilisent les fiches chasse au trésor pour enseigner les directions cardinales. Les élèves de 6 à 9 ans apprennent nord, sud, est, ouest. Ces termes géographiques font partie du programme de découverte du monde et de géographie. Les fiches chasse au trésor offrent une pratique concrète de concepts abstraits.

Commencez par réviser les directions de base en CP. Puis introduisez progressivement les directions cardinales en CE1. Expliquez la correspondance : nord = haut, sud = bas, est = droite, ouest = gauche. Utilisez une boussole réelle en classe pour renforcer la compréhension. Les fiches chasse au trésor ancrent la théorie dans la pratique.

Créez des séries progressives de difficulté croissante. Commencez avec 3-4 étapes de directions. Augmentez graduellement jusqu'à 6-8 étapes pour les élèves de CE2. Utilisez des thèmes liés à vos unités d'enseignement actuelles. Thème géographie : monuments, pays, drapeaux. Thème sciences : plantes, animaux, cycles de vie.

Les fiches chasse au trésor s'intègrent parfaitement aux ateliers de mathématiques. Les élèves pratiquent la lecture de coordonnées sur une grille. Ils comptent les déplacements. Ils visualisent les transformations spatiales. Ces compétences préparent au repérage sur plan et à la géométrie. Une activité ludique qui renforce des compétences mathématiques essentielles.`,
        quote: 'Les directions cardinales deviennent concrètes et amusantes.',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Parents en Instruction En Famille',
        subtitle: 'Fiches à Imprimer Gratuit et Apprendre à Lire pour IEF',
        description: `Les parents qui pratiquent l'instruction en famille (IEF) apprécient la flexibilité du générateur. Créez des fiches chasse au trésor adaptées précisément au niveau et aux intérêts de votre enfant. Utilisez des images de vos sorties pédagogiques. Intégrez le vocabulaire de vos thèmes d'étude. Personnalisez complètement le contenu éducatif.

Les familles IEF enseignent souvent plusieurs enfants d'âges différents simultanément. Créez des fiches avec différents niveaux de difficulté sur le même thème. Votre enfant de Grande Section utilise les directions de base. Votre enfant de CE1 utilise les directions cardinales. Même thème, deux niveaux, activité en parallèle.

Les fiches chasse au trésor offrent une pause bienvenue dans les apprentissages formels. Les enfants IEF travaillent à la maison et ont besoin de variété. Les puzzles apportent un élément ludique. Les enfants ne réalisent pas qu'ils apprennent pendant qu'ils s'amusent. L'apprentissage déguisé en jeu est particulièrement efficace.

Utilisez les fiches comme évaluation informelle des compétences. Observez comment votre enfant aborde le problème. Lit-il toutes les instructions avant de commencer ? Suit-il les étapes dans l'ordre ? Vérifie-t-il son travail ? Ces observations révèlent beaucoup sur son développement cognitif. Ajustez votre enseignement en fonction de ce que vous observez.`,
        quote: 'Je personnalise les fiches pour chaque enfant facilement.',
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Enseignants de Français Langue Étrangère',
        subtitle: 'Alphabet et Exercices Maths avec Vocabulaire des Directions',
        description: `Les enseignants de FLE (Français Langue Étrangère) utilisent les fiches chasse au trésor pour enseigner le vocabulaire des directions. Les apprenants de tous âges doivent maîtriser haut, bas, gauche, droite, nord, sud, est, ouest. Ces mots sont essentiels pour donner et comprendre des indications. Les fiches offrent une pratique contextuelle significative.

Créez des fiches thématiques liées à vos unités de vocabulaire. Unité nourriture : fruits, légumes, plats. Unité ville : bâtiments, transports, commerces. Unité maison : meubles, pièces, objets. Les élèves apprennent simultanément le vocabulaire thématique et les directions. Double bénéfice pédagogique dans une seule activité.

Les fiches chasse au trésor fonctionnent pour tous les niveaux de FLE. Débutants A1 : directions de base et vocabulaire simple. Intermédiaires A2-B1 : directions cardinales et vocabulaire élargi. Avancés B2+ : instructions complexes avec prépositions variées. Adaptez la complexité linguistique à vos apprenants.

Utilisez les fiches en activité de groupe en classe de conversation. Les élèves travaillent en binômes. Un élève lit les instructions à voix haute. L'autre élève trace le chemin sur sa fiche. Puis ils inversent les rôles avec une nouvelle fiche. Cette activité orale pratique la prononciation, l'écoute et la compréhension simultanément.`,
        quote: 'Les mathématiques deviennent un outil d\'apprentissage linguistique.',
      },
      {
        id: '5',
        icon: '💜',
        title: 'Enseignants Spécialisés',
        subtitle: 'Coloriage et Tables de Multiplication avec Adaptation pour Besoins Spécifiques',
        description: `Les enseignants spécialisés (ULIS, SEGPA, soutien scolaire) adaptent les fiches chasse au trésor pour répondre aux besoins éducatifs particuliers. Les élèves avec difficultés d'apprentissage bénéficient d'activités visuelles et concrètes. Les puzzles offrent une structure claire. Les étapes séquentielles décomposent le problème en parties gérables. Le support visuel aide la compréhension.

Modifiez la difficulté en changeant le nombre d'étapes de directions. Commencez avec seulement 2-3 étapes pour les élèves en difficulté. Augmentez graduellement quand ils gagnent en confiance. Cette progression individualisée respecte le rythme de chacun. Chaque élève progresse sans sentiment d'échec.

Utilisez des images particulièrement motivantes pour vos élèves. Téléversez des photos de leurs intérêts spéciaux. Un élève passionné de dinosaures résoudra avec enthousiasme un puzzle de dinosaures. La motivation intrinsèque augmente l'engagement. L'engagement augmente l'apprentissage. Personnalisez pour maximiser l'impact pédagogique.

Les fiches en noir et blanc deviennent des activités de coloriage bonus. Les élèves résolvent le puzzle, puis colorient les images. Cette combinaison travaille la logique puis la motricité fine. Deux objectifs pédagogiques dans une fiche. Les élèves apprécient la variété d'activités. Le coloriage offre aussi un moment de calme après l'effort cognitif.`,
        quote: 'La personnalisation répond à chaque besoin individuel.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Enseignants Entrepreneurs',
        subtitle: 'Fiches à Imprimer Gratuit et Écriture Cursive pour Vendre sur TPT et Etsy',
        description: `Les enseignants entrepreneurs créent et vendent des ressources pédagogiques en ligne. Teachers Pay Teachers, Etsy et Amazon KDP sont des plateformes populaires. Votre abonnement Accès Complet à 240 € par an inclut la licence commerciale complète. Créez des fiches chasse au trésor et vendez-les légalement sans frais supplémentaires.

Créez des paquets thématiques de 10-20 fiches. Thèmes saisonniers : rentrée, Halloween, Noël, Pâques, été. Thèmes académiques : animaux, géographie, sciences, histoire. Vendez chaque paquet 3 à 5 $. Les acheteurs adorent les ressources prêtes à l'emploi. Les paquets bien conçus se vendent régulièrement.

Différenciez vos produits en incluant plusieurs niveaux de difficulté. Un paquet contient des versions pour maternelle, CP et CE1. Les enseignants achètent des ressources différenciées pour leurs classes multiniveaux. Proposez des versions couleur et noir et blanc. Incluez toujours les fiches corrigées. La valeur perçue augmente avec les options.

Les fiches chasse au trésor sont particulièrement recherchées sur Teachers Pay Teachers. Les enseignants cherchent des activités engageantes pour les centres d'apprentissage. Vos fiches répondent exactement à ce besoin. Optimisez vos titres et descriptions avec les mots-clés que les enseignants recherchent. Créez des aperçus attrayants. Utilisez Pinterest pour le marketing gratuit. Certains enseignants génèrent 500 à 2000 $ par mois en revenus passifs avec des ressources bien conçues.`,
        quote: 'Mon abonnement s\'est rentabilisé dès le premier mois !',
      },
    ],
  },

  // FAQ Section - FULL text from French treasure-hunt.md Section 6
  faq: {
    sectionTitle: 'Questions Fréquentes sur les Fiches Chasse au Trésor',
    sectionDescription: 'Les enseignants posent souvent les mêmes questions avant de s\'abonner. Cette section répond aux 12 questions les plus courantes. Vous découvrirez les détails sur le prix, les fonctionnalités, l\'utilisation en classe et la licence commerciale.',
    showMoreText: 'Afficher plus de questions',
    showLessText: 'Afficher moins',
    badgeText: 'Questions Fréquentes',
    readMoreLabel: 'Lire la suite',
    showLessLabel: 'Voir moins',
    secureCheckout: 'Paiement sécurisé',
    cancelAnytime: 'Annulez à tout moment',
    items: [
      {
        id: '1',
        question: 'Ce générateur de fiches chasse au trésor est-il vraiment gratuit à utiliser avec Fiches à Imprimer Gratuit et Alphabet ?',
        answer: 'Le générateur de fiches chasse au trésor nécessite un abonnement Accès Complet coûtant 240 € annuellement ou 25 € mensuellement. Votre abonnement vous donne une création illimitée de fiches sans frais par fiche. Générez autant de fiches maternelle que nécessaire sans charges supplémentaires. Créez des centaines de fiches chasse au trésor sans payer plus que votre abonnement annuel. L\'abonnement Pack Essentiel inclut 10 générateurs populaires et coûte 144 € annuellement. L\'abonnement Accès Complet coûte 240 € annuellement et inclut tous les 33 types de générateurs y compris les fiches chasse au trésor. Les deux abonnements incluent la licence commerciale, le support de 11 langues et les exportations de qualité professionnelle 300 DPI. Choisissez Accès Complet pour accéder au générateur de fiches chasse au trésor.',
      },
      {
        id: '2',
        question: 'Puis-je imprimer les fiches chasse au trésor à la maison sur une imprimante ordinaire avec Tables de Multiplication et Apprendre à Lire ?',
        answer: 'Absolument. Les fiches chasse au trésor s\'impriment parfaitement sur n\'importe quelle imprimante domestique standard. Téléchargez vos fiches en format PDF ou JPEG. Les deux formats fonctionnent sur toutes les imprimantes. Imprimez sur du papier ordinaire A4 ou Letter. Aucun papier spécial requis. Les couleurs ressortent vivement sur du papier standard blanc. Utilisez l\'option niveaux de gris pour économiser l\'encre couleur. Cette option réduit les coûts d\'impression de 60 à 80 pour cent. Les fiches en noir et blanc fonctionnent tout aussi bien pédagogiquement. Les élèves voient clairement les images et les grilles. Ils peuvent même colorier les images comme activité bonus. Économisez de l\'argent tout en créant des ressources de qualité.',
      },
      {
        id: '3',
        question: 'Ai-je besoin de compétences en conception graphique pour créer des Exercices Maths et Graphisme Maternelle ?',
        answer: 'Aucune compétence en conception graphique n\'est nécessaire. Le générateur est conçu pour les enseignants, pas pour les designers. L\'interface est intuitive et en français. Sélectionnez vos options, cliquez sur Créer, votre fiche apparaît. Trois clics suffisent. Aucune formation requise. Les enseignants de maternelle créent de magnifiques fiches dès leur première utilisation. Toutes les décisions de mise en page se font automatiquement. Le générateur place les images sur la grille 3×3. Il génère les indices de directions automatiquement. Il crée la fiche corrigée simultanément. Le texte est dimensionné parfaitement. Les marges sont professionnelles. Vous recevez une fiche prête à imprimer sans aucun effort de conception.',
      },
      {
        id: '4',
        question: 'Puis-je utiliser les fiches chasse au trésor dans ma classe avec mes élèves pour Exercices CE1 et Écriture Cursive ?',
        answer: 'L\'abonnement Accès Complet inclut une utilisation illimitée en classe. Imprimez autant de copies que nécessaire pour vos élèves. Utilisez les fiches dans vos centres d\'apprentissage. Distribuez-les comme travail à la maison. Plastifiez-les pour une utilisation répétée. Partagez-les avec vos collègues enseignants de votre école. Aucune restriction sur l\'utilisation pédagogique. Créez des versions différenciées pour différents niveaux dans votre classe. Fiches simples pour les élèves en difficulté. Fiches complexes pour les élèves avancés. Même activité, plusieurs niveaux de défi. L\'enseignement différencié devient facile et rapide. Tous vos élèves travaillent sur le même concept mais à leur niveau approprié.',
      },
      {
        id: '5',
        question: 'Quelles langues sont disponibles pour les fiches chasse au trésor avec Coloriage à Imprimer et Tables de Multiplication ?',
        answer: 'Le générateur fonctionne en 11 langues : français, anglais, allemand, espagnol, italien, portugais brésilien, néerlandais, suédois, danois, norvégien et finnois. L\'interface utilisateur se traduit instantanément dans votre langue sélectionnée. Les instructions sur les fiches s\'affichent dans la langue choisie. Les directions (haut/bas/gauche/droite ou nord/sud/est/ouest) se traduisent automatiquement. Cette fonctionnalité multilingue est essentielle pour l\'enseignement FLE et les programmes bilingues. Créez des fiches en français pour vos élèves francophones. Puis créez la même fiche en anglais pour votre programme d\'immersion. Les écoles internationales utilisent plusieurs langues quotidiennement. Un seul générateur, toutes vos langues d\'enseignement. Changez de langue en un clic.',
      },
      {
        id: '6',
        question: 'Puis-je vendre les fiches chasse au trésor que je crée avec Fiches à Imprimer Gratuit et Apprendre à Lire ?',
        answer: 'Oui. L\'abonnement Accès Complet inclut une licence commerciale print-on-demand complète sans frais supplémentaires. Vendez vos fiches chasse au trésor sur Teachers Pay Teachers, Etsy et Amazon KDP légalement. Aucune attribution requise sur vos créations. Aucune redevance à payer. Aucune limite de revenus. Cette licence commerciale vaut plusieurs centaines d\'euros annuellement chez les concurrents. Créez des paquets thématiques de fiches et vendez-les 3 à 5 € chacun. Compilez des cahiers d\'activités pour Amazon KDP vendus 8 à 12 €. Les enseignants entrepreneurs génèrent 500 à 2000 € mensuellement en revenus passifs. Votre investissement de 240 € annuellement se rentabilise rapidement. La licence commerciale incluse représente une valeur exceptionnelle.',
      },
      {
        id: '7',
        question: 'Comment personnaliser les fiches chasse au trésor pour mes élèves avec Exercices Maths et Alphabet ?',
        answer: 'Personnalisez chaque élément après génération directement sur le canevas. Cliquez sur n\'importe quelle image pour la sélectionner. Déplacez, redimensionnez, faites pivoter ou supprimez des images. Modifiez la couleur, la taille et la police du texte. Ajoutez vos propres zones de texte avec instructions personnalisées. Changez l\'arrière-plan et les bordures instantanément. Téléversez vos propres images pour créer des fiches ultra-personnalisées. Utilisez des photos de vos élèves, de votre classe, de vos sorties scolaires. Intégrez le vocabulaire spécifique de votre programme. Créez des fiches sur n\'importe quel thème imaginable. La personnalisation complète vous permet d\'adapter parfaitement les fiches aux besoins uniques de vos élèves.',
      },
      {
        id: '8',
        question: 'Pour quels groupes d\'âge les fiches chasse au trésor conviennent-elles avec Graphisme Maternelle et Exercices CP ?',
        answer: 'Les fiches chasse au trésor conviennent aux enfants de 4 à 9 ans. Les élèves de maternelle (Petite Section, Moyenne Section, Grande Section) utilisent les directions de base (haut, bas, gauche, droite). Ces concepts spatiaux fondamentaux sont appropriés pour les 3 à 6 ans. Les puzzles développent la pensée logique précoce et la compréhension des directions. Les élèves de CP, CE1 et CE2 progressent vers les directions cardinales (nord, sud, est, ouest). Ces termes géographiques s\'enseignent habituellement à partir de 7 ans. Ajustez la difficulté en modifiant le nombre d\'étapes de directions. Commencez avec 3 étapes pour les débutants. Augmentez jusqu\'à 8 étapes pour les élèves de CE2 avancés. Adaptez facilement à n\'importe quel niveau.',
      },
      {
        id: '9',
        question: 'Puis-je téléverser mes propres images dans les fiches chasse au trésor pour Coloriage et Tables de Multiplication ?',
        answer: 'Oui. Téléversez autant d\'images que vous voulez. Cliquez sur "Choisir des fichiers" dans la section Téléverser des Images Personnalisées. Sélectionnez plusieurs images simultanément de votre ordinateur. Les formats JPEG, PNG et GIF sont tous acceptés. Vos images téléversées apparaissent dans la zone de prévisualisation. Cliquez pour les ajouter à votre sélection de 6 images. Combinez vos images téléversées avec les images de notre bibliothèque de 3000+ images. Créez des fiches complètement personnalisées. Utilisez des photos de votre programme scolaire. Intégrez des images de vos manuels. Ajoutez des photos de sorties éducatives. Les élèves adorent voir des images familières dans leurs activités. La personnalisation augmente l\'engagement et la motivation.',
      },
      {
        id: '10',
        question: 'Combien de temps faut-il pour créer une fiche chasse au trésor avec Fiches Maternelle et Écriture Cursive ?',
        answer: 'Créer une fiche chasse au trésor prend 3 minutes du début à la fin. Sélectionnez vos 6 images en 1 minute. Choisissez le type de directions et le format de page en 30 secondes. Cliquez sur Créer et attendez 5 secondes pour la génération. Téléchargez en PDF ou JPEG en 30 secondes. Total : 2 à 3 minutes pour une fiche complète prête à imprimer. Comparez avec la création manuelle qui prend 30 à 60 minutes. Créer la grille, placer les images, écrire les indices, créer la fiche corrigée. Notre générateur fait tout automatiquement. Économisez 27 à 57 minutes par fiche. Créez 20 fiches mensuellement. Économisez 9 à 19 heures par mois. Ce gain de temps est inestimable pour les enseignants occupés.',
      },
      {
        id: '11',
        question: 'Les fiches chasse au trésor incluent-elles des fiches corrigées pour Apprendre à Lire et Alphabet ?',
        answer: 'Oui. Le générateur crée automatiquement la fiche corrigée en même temps que la fiche élève. Cliquez sur l\'onglet "Fiche Corrigée" en haut pour la voir. La fiche corrigée montre exactement le même puzzle avec le chemin vers le trésor clairement marqué. Vous voyez chaque déplacement sur la grille. La case du trésor est mise en évidence. Téléchargez toujours les deux versions. La fiche élève va aux enfants pour résoudre le puzzle. La fiche corrigée reste avec vous pour la correction rapide. Vérifiez le travail des élèves en quelques secondes. Pas besoin de résoudre mentalement chaque puzzle. La fiche corrigée rend la correction instantanée et précise. Gagnez du temps sur l\'évaluation aussi.',
      },
      {
        id: '12',
        question: 'Puis-je créer des fiches chasse au trésor sur des sujets scolaires spécifiques avec Exercices Maths et Graphisme Maternelle ?',
        answer: 'Absolument. Créez des fiches chasse au trésor sur n\'importe quel sujet scolaire. Utilisez notre bibliothèque de 3000+ images organisées par thèmes. Mathématiques : formes, nombres, symboles mathématiques. Sciences : animaux, plantes, cycles de vie, météo. Géographie : monuments, drapeaux, cartes, moyens de transport. Histoire : personnages historiques, objets anciens, époques. Téléversez vos propres images pour des sujets encore plus spécifiques. Photos de votre manuel de sciences. Illustrations de votre programme d\'histoire. Vocabulaire de votre unité de français actuelle. Créez des fiches parfaitement alignées avec votre curriculum. Les fiches chasse au trésor deviennent un outil pédagogique polyvalent pour tous vos sujets d\'enseignement.',
      },
    ],
  },

  // Pricing section - Accès Complet required
  pricing: {
    title: 'Accès Complet',
    price: '240€',
    priceInterval: '/an',
    priceSuffix: 'Facturé annuellement',
    ctaText: 'Commencer à Créer',
    benefits: [
      '33 générateurs de fiches inclus',
      'Création illimitée de fiches',
      'Bibliothèque de 3000+ images',
      'Support de 11 langues',
      'Licence commerciale POD incluse',
      'Export 300 DPI haute qualité',
      'Corrigés automatiques',
    ],
  },

  // Related Apps - From French treasure-hunt.md Section 7
  relatedApps: {
    sectionTitle: 'Combinez les Fiches Chasse au Trésor avec d\'Autres Générateurs - Paquets Complets',
    sectionDescription: 'Les enseignants créent des paquets d\'apprentissage thématiques en combinant plusieurs types de fiches. Les fiches chasse au trésor se combinent parfaitement avec nos 32 autres générateurs. Votre abonnement Accès Complet à 240 € par an vous donne accès à tous les générateurs.',
    ctaTitle: 'Prêt à Créer des Fiches Exceptionnelles ?',
    ctaDescription: 'Rejoignez des milliers d\'enseignants qui créent des fiches professionnelles. Génération illimitée, licence commerciale incluse.',
    primaryCtaText: 'Commencer l\'Essai Gratuit',
    secondaryCtaText: 'Voir les 33 Applications',
    badgeText: 'Fonctionne Bien Avec',
    exploreText: 'Explorer toutes les applications',
    trustBadges: {
      securePayment: 'Paiement sécurisé',
      cancelAnytime: 'Annulez à tout moment',
    },
    items: [
      {
        id: '1',
        slug: 'image-addition',
        name: 'Addition',
        category: 'Mathématiques',
        icon: '➕',
        description: 'Combinez les fiches chasse au trésor avec le générateur d\'addition pour des exercices mathématiques complets. Les élèves pratiquent les directions spatiales et les calculs sur le même thème visuel.',
      },
      {
        id: '2',
        slug: 'picture-path',
        name: 'Parcours Images',
        category: 'Apprentissage Visuel',
        icon: '🛤️',
        description: 'Le générateur de parcours images complète parfaitement les fiches chasse au trésor. Les deux activités travaillent la navigation spatiale et le suivi d\'instructions visuelles.',
      },
      {
        id: '3',
        slug: 'drawing-lines',
        name: 'Tracer des Lignes',
        category: 'Motricité Fine',
        icon: '✏️',
        description: 'Combinez avec le générateur de tracer des lignes pour développer la motricité fine. Les élèves tracent le chemin vers le trésor avec précision et contrôle du crayon.',
      },
      {
        id: '4',
        slug: 'coloring',
        name: 'Coloriage',
        category: 'Créativité',
        icon: '🎨',
        description: 'Les fiches en noir et blanc deviennent des activités de coloriage. Les élèves résolvent le puzzle puis colorient les images pour une activité complète multi-compétences.',
      },
      {
        id: '5',
        slug: 'matching-app',
        name: 'Association',
        category: 'Apprentissage Visuel',
        icon: '🔗',
        description: 'Combinez chasse au trésor avec fiches d\'association pour travailler la discrimination visuelle. Les deux activités utilisent les mêmes images thématiques pour une cohérence pédagogique.',
      },
      {
        id: '6',
        slug: 'prepositions',
        name: 'Prépositions',
        category: 'Langage',
        icon: '📍',
        description: 'Le générateur de prépositions renforce le vocabulaire spatial des fiches chasse au trésor. Les élèves apprennent à, sur, sous, devant, derrière avec des exercices coordonnés.',
      },
    ],
  },
};

export default treasureHuntFrContent;
