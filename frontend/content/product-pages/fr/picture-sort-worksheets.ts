import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Picture Sort Worksheets - French Content
 *
 * File: frontend/content/product-pages/fr/picture-sort-worksheets.ts
 * URL: /fr/apps/tri-images-fiches (French SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/French/picture-sort.md
 * App ID: picture-sort (Visual sorting/classification worksheets)
 * Bundle: Accès Complet ($240/year) - NOT Pack Essentiel
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const pictureSortFrContent: ProductPageContent = {
  // SEO Metadata - French language-specific
  seo: {
    slug: 'tri-images-fiches',
    appId: 'picture-sort',
    title: 'Fiches de Tri d\'Images - Générateur de Fiches Maternelle pour Apprendre à Classer',
    description: 'Créez des fiches de tri d\'images gratuites pour maternelle et CP. Générateur professionnel avec corrigés inclus. Téléchargez en PDF haute qualité en 3 min.',
    keywords: 'fiches à imprimer gratuit, fiches maternelle, exercices CP, tri images, graphisme maternelle, exercices maths, coloriage à imprimer, apprendre à lire, alphabet, écriture cursive, tables de multiplication, fiche gratuite pour enfants, imprimables gratuits, fiche pour enfants',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fr/apps/tri-images-fiches',
    images: [
      {
        url: 'https://www.lessoncraftstudio.com/samples/french/picture-sort/sample-1.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Fiche de tri d\'images gratuite pour maternelle - classement et catégorisation pour enfants'
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/french/picture-sort/sample-2.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Exercices CP tri d\'images - fiches gratuites pour enfants avec classification'
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/french/picture-sort/sample-3.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Fiche gratuite tri d\'images pour enfants - graphisme maternelle et logique'
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/french/picture-sort/sample-4.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Fiches gratuites classification images - exercices CE1 et coloriage à imprimer'
      }
    ],
  },

  // Hero Section - FULL text from picture-sort.md paragraphs 1-4
  hero: {
    title: 'Générateur de Fiches de Tri d\'Images',
    subtitle: 'Fiches Maternelle pour Apprendre à Classer et Catégoriser',
    description: `Créez des fiches de tri d'images professionnelles avec notre générateur de fiches maternelle. Votre abonnement Accès Complet à 240€/an vous permet de générer des fiches à imprimer gratuit en illimité. Concevez des exercices CP personnalisés parfaits pour la maternelle et l'école élémentaire. Téléchargez des fiches de haute qualité en PDF en moins de 3 minutes.

Les activités de tri d'images développent la pensée logique chez les jeunes enfants. Notre outil génère des fiches maternelle avec deux catégories de classement. Les élèves découpent les images et les trient dans les bonnes catégories. Chaque fiche inclut un corrigé montrant le tri correct.

L'interface intuitive permet de créer des fiches à imprimer gratuit adaptées à vos besoins pédagogiques. Sélectionnez des thèmes automatiquement ou choisissez manuellement jusqu'à 12 images. Ajustez la mise en page selon le format Letter ou A4. Personnalisez chaque élément sur le canevas avec une édition complète.

Notre générateur s'adresse aux enseignants de maternelle GS, CP et CE1. Les fiches de tri conviennent parfaitement aux activités de graphisme maternelle et de reconnaissance visuelle. Utilisez-les pour enseigner les catégories, les comparaisons et la classification logique. Chaque fiche téléchargeable inclut des instructions claires et un corrigé détaillé.`,
    previewImageSrc: '/samples/english/picture sort/picture sort portrait.jpeg',
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

  // Sample Gallery - REAL file paths from samples/english/picture sort/
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
    items: [
      {
        id: '1',
        worksheetSrc: '/samples/french/picture-sort/sample-1.jpeg',
        answerKeySrc: '/samples/french/picture-sort/sample-1-answer.jpeg',
        altText: 'Fiche de tri d\'images gratuite pour maternelle - exercices classification et catégorisation pour enfants',
        pdfDownloadUrl: '/samples/french/picture-sort/sample-1.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/french/picture-sort/sample-2.jpeg',
        answerKeySrc: '/samples/french/picture-sort/sample-2-answer.jpeg',
        altText: 'Exercices CP tri d\'images - fiche gratuite classification pour enfants avec corrigé inclus',
        pdfDownloadUrl: '/samples/french/picture-sort/sample-2.pdf',
      },
      {
        id: '3',
        worksheetSrc: '/samples/french/picture-sort/sample-3.jpeg',
        answerKeySrc: '/samples/french/picture-sort/sample-3-answer.jpeg',
        altText: 'Fiches gratuites tri d\'images pour maternelle - graphisme et logique de classement pour enfants',
        pdfDownloadUrl: '/samples/french/picture-sort/sample-3.pdf',
      },
      {
        id: '4',
        worksheetSrc: '/samples/french/picture-sort/sample-4.jpeg',
        answerKeySrc: '/samples/french/picture-sort/sample-4-answer.jpeg',
        altText: 'Fiche pour enfants tri d\'images - exercices CE1 classification avec imprimables gratuits',
        pdfDownloadUrl: '/samples/french/picture-sort/sample-4.pdf',
      },
    ],
  },

  // Features Grid - FULL text from picture-sort.md feature sections
  features: {
    sectionTitle: 'Fiches Gratuites et Fiche pour Enfants - Imprimables Gratuits et Fiche pour Maternelle',
    sectionDescription: 'Notre générateur de fiches de tri d\'images offre sept fonctionnalités essentielles pour les enseignants de maternelle et d\'école élémentaire. Chaque fonction facilite la création de fiches à imprimer gratuit adaptées à vos élèves. L\'interface en français permet de concevoir des exercices CP et CE1 en quelques clics. Votre abonnement Accès Complet inclut l\'accès illimité à toutes ces fonctionnalités professionnelles.',
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
        title: 'Création Rapide de Fiches Maternelle en 3 Clics - Générateur de Fiches à Imprimer Gratuit',
        description: `Générez des fiches de tri complètes en trois étapes simples. Sélectionnez deux thèmes pour les catégories gauche et droite. Cliquez sur créer et votre fiche maternelle apparaît instantanément. Le système génère automatiquement 12 images avec répartition équilibrée entre les catégories.

Notre générateur intelligent organise les images en zones distinctes sur la fiche. Les deux cadres de catégories occupent le haut de la page. Les images découpables se positionnent en bas pour faciliter le découpage. Aucune compétence en design n'est requise pour créer des fiches à imprimer gratuit professionnelles.

L'interface intuitive convient aux enseignants de tous niveaux techniques. Modifiez les thèmes instantanément pour adapter les fiches maternelle à vos leçons. Chaque génération crée une mise en page optimisée pour l'impression. Les élèves reçoivent des exercices CP clairs et attrayants.`,
        highlighted: true,
      },
      {
        id: '2',
        icon: '✏️',
        title: 'Édition Complète des Exercices CP sur Canevas - Fiches Maternelle Personnalisables',
        description: `Modifiez chaque élément de vos fiches maternelle directement sur le canevas. Déplacez les images avec la souris pour ajuster leur position. Redimensionnez les cadres de catégories selon vos besoins pédagogiques. Faites pivoter les images pour créer des exercices CP uniques.

Les outils d'alignement facilitent la mise en page professionnelle. Alignez plusieurs images horizontalement ou verticalement en un clic. Centrez les éléments sur la page automatiquement. Organisez les couches pour placer certains éléments devant ou derrière d'autres.

Verrouillez les éléments que vous ne souhaitez pas modifier accidentellement. Utilisez les boutons annuler et refaire pour corriger les erreurs. L'édition en temps réel affiche les changements instantanément. Créez des fiches à imprimer gratuit exactement adaptées à vos objectifs pédagogiques.`,
        highlighted: false,
      },
      {
        id: '3',
        icon: '📤',
        title: 'Téléversement d\'Images Personnalisées - Fiches Maternelle avec Vos Propres Photos',
        description: `Ajoutez vos propres images à vos fiches maternelle en quelques secondes. Cliquez sur le bouton de téléversement pour sélectionner des fichiers. Importez plusieurs images simultanément en format JPEG, PNG ou GIF. Vos photos apparaissent immédiatement dans la zone des images disponibles.

Combinez vos images personnalisées avec notre bibliothèque de 3000+ illustrations. Créez des exercices CP contextualisés avec des photos de votre classe. Utilisez des images de l'environnement local pour renforcer l'apprentissage. Les élèves reconnaissent facilement les objets familiers dans leurs fiches à imprimer gratuit.

Les images téléversées restent disponibles pendant toute votre session de travail. Réutilisez-les dans plusieurs fiches maternelle différentes. Créez des séries d'exercices cohérents avec les mêmes ressources visuelles. Personnalisez complètement vos activités pédagogiques selon vos besoins spécifiques.`,
        highlighted: false,
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Générateur de Fiches Maternelle en 11 Langues - Exercices CP Multilingues',
        description: `Notre plateforme propose l'interface utilisateur en 11 langues différentes. Créez des fiches maternelle en français pour vos élèves francophones. Basculez vers l'anglais, l'allemand, l'espagnol ou l'italien selon vos besoins. Les enseignants de classes bilingues disposent d'outils multilingues complets.

Les noms de fichiers d'images dans notre bibliothèque existent en 11 langues. Générez des exercices CP pour l'apprentissage du vocabulaire en langue étrangère. Créez des fiches à imprimer gratuit pour les cours de langues vivantes. Les élèves d'immersion linguistique bénéficient de ressources adaptées.

L'interface traduite facilite la création de fiches maternelle pour tous les enseignants. Les instructions et boutons apparaissent dans votre langue préférée. Changez de langue en un clic dans le menu des paramètres. Accédez aux exercices CP dans la langue de votre choix instantanément.`,
        highlighted: false,
      },
      {
        id: '5',
        icon: '💰',
        title: 'Licence Commerciale Incluse - Vendez Vos Fiches Maternelle et Exercices CP',
        description: `Votre abonnement Accès Complet inclut une licence d'impression à la demande complète. Vendez vos fiches maternelle sur Teachers Pay Teachers sans frais supplémentaires. Créez une boutique Etsy de ressources pédagogiques imprimables. Publiez des carnets d'exercices CP sur Amazon KDP.

La qualité 300 DPI garantit une impression professionnelle pour la vente. Aucune attribution n'est requise sur vos fiches à imprimer gratuit commercialisées. Générez des revenus passifs avec des ressources que vous créez en minutes. De nombreux enseignants gagnent 500€ à 5000€ par mois avec leurs fiches maternelle.

Utilisez Pinterest pour promouvoir vos exercices CP auprès d'un public mondial. Créez des abonnements mensuels pour fournir de nouvelles fiches régulièrement. Développez votre marque d'enseignant entrepreneur avec des ressources uniques. La licence commerciale incluse valorise considérablement votre abonnement Accès Complet.`,
        highlighted: true,
      },
      {
        id: '6',
        icon: '🎨',
        title: 'Bibliothèque de 3000+ Images pour Fiches Maternelle - Exercices CP avec Illustrations Enfantines',
        description: `Accédez à plus de 3000 images adaptées aux enfants dans notre bibliothèque. Toutes les illustrations conviennent aux élèves de maternelle et d'école élémentaire. Les images sont organisées par thèmes pour faciliter la recherche. Sélectionnez animaux, aliments, objets, formes, couleurs et bien plus.

La fonction de recherche trouve rapidement l'image dont vous avez besoin. Tapez "pomme" pour voir toutes les images de pommes disponibles. Parcourez les thèmes pour découvrir de nouvelles idées d'exercices CP. Chaque image est optimisée pour l'impression en haute qualité.

Les arrière-plans et bordures thématiques enrichissent vos fiches maternelle. Choisissez parmi des dizaines de cadres décoratifs professionnels. Ajustez l'opacité des arrière-plans pour ne pas surcharger la fiche. Créez des fiches à imprimer gratuit visuellement attrayantes qui motivent les élèves.`,
        highlighted: false,
      },
      {
        id: '7',
        icon: '🖨️',
        title: 'Qualité Professionnelle 300 DPI - Fiches Maternelle et Exercices CP Haute Résolution',
        description: `Exportez vos fiches maternelle en qualité professionnelle 300 DPI. Ce niveau de résolution garantit une netteté parfaite à l'impression. Les images restent claires même lors d'agrandissements. Vos élèves reçoivent des exercices CP de qualité commerciale.

Téléchargez vos créations en format PDF ou JPEG selon vos besoins. Le PDF préserve la qualité vectorielle pour une impression parfaite. Le JPEG convient au partage numérique et aux plateformes en ligne. Les deux formats maintiennent la résolution 300 DPI complète.

L'option niveaux de gris économise l'encre d'imprimante pour les fiches à imprimer gratuit. Convertissez instantanément vos fiches maternelle colorées en noir et blanc. Imprimez des centaines d'exercices CP sans vider vos cartouches. La qualité reste excellente même en impression monochrome.`,
        highlighted: false,
      },
      {
        id: '8',
        icon: '✅',
        title: 'Corrigés Automatiques - Gagnez du Temps sur la Correction des Exercices',
        description: `Le système génère automatiquement le corrigé avec les images triées correctement. Plus besoin de créer manuellement les solutions. Gagnez des heures de préparation chaque semaine. Téléchargez la fiche et le corrigé en PDF haute résolution. Parfait pour l'impression et la distribution en classe.

Les corrigés automatiques facilitent la correction. Chaque fiche de tri génère sa solution automatiquement. Les images apparaissent dans les bonnes catégories. Plus besoin de résoudre vous-même les exercices. Gagnez 5 à 10 minutes par fiche sur la correction. Votre temps se concentre sur l'enseignement, pas sur la préparation.

La compatibilité d'impression est totale. Format A4 pour l'Europe. Format Lettre pour l'Amérique du Nord. Orientations portrait et paysage disponibles. Chaque fiche s'imprime parfaitement sur votre imprimante habituelle.`,
        highlighted: false,
      },
    ],
  },

  // How-To Guide - FULL text from picture-sort.md step sections
  howTo: {
    sectionTitle: 'Fiche Gratuite pour Enfants Créer - Fiche pour Maternelle',
    sectionDescription: 'Créez des fiches de tri d\'images professionnelles en moins de 3 minutes avec notre générateur. Les cinq étapes ci-dessous vous guident du choix des images jusqu\'au téléchargement final. Aucune compétence technique n\'est requise pour concevoir des fiches à imprimer gratuit de qualité. Suivez ce processus simple pour produire des exercices CP adaptés à vos élèves de maternelle et d\'école élémentaire.',
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
        title: 'Étape 1 : Sélectionnez Vos Images pour Fiches Maternelle - Graphisme Maternelle et Exercices de Tri',
        description: `Commencez par choisir le contenu de vos fiches maternelle en sélectionnant deux catégories de tri. Utilisez la méthode automatique en choisissant deux thèmes différents dans les menus déroulants. Par exemple, sélectionnez "Animaux de la ferme" pour la catégorie gauche et "Animaux de la mer" pour la catégorie droite. Le système génère automatiquement 12 images équilibrées entre les deux catégories.

Alternativement, créez des exercices CP personnalisés avec la sélection manuelle d'images. Parcourez notre bibliothèque de 3000+ images organisées par thèmes. Recherchez des images spécifiques en tapant des mots-clés comme "pomme", "voiture" ou "triangle". Cliquez sur chaque image pour l'ajouter à votre sélection puis assignez-la à la catégorie gauche ou droite.

Combinez les images de la bibliothèque avec vos propres photos téléversées. Cette flexibilité permet de créer des fiches à imprimer gratuit parfaitement adaptées à vos leçons. Utilisez des photos de votre classe pour contextualiser les exercices de graphisme maternelle. Les élèves reconnaissent facilement les objets familiers dans leurs activités de tri.

Ajoutez jusqu'à 12 images pour un équilibre optimal sur la fiche. Le compteur affiche le nombre total d'images sélectionnées en temps réel. Vérifiez que chaque catégorie contient un nombre équilibré d'images avant de continuer. Cette première étape détermine le contenu pédagogique de vos fiches maternelle.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Étape 2 : Configurez la Mise en Page - Fiches à Imprimer Gratuit pour Coloriage et Exercices Maths',
        description: `Définissez les paramètres de page pour vos exercices CP dans la section Configuration de Page. Choisissez le format Letter Portrait (8,5×11 pouces) pour les imprimantes nord-américaines. Sélectionnez A4 Portrait (210×297mm) pour les standards européens. Le format Paysage convient aux fiches maternelle avec beaucoup d'images.

Personnalisez la couleur de fond de page avec le sélecteur de couleurs. Un fond blanc convient aux exercices de coloriage à imprimer pour économiser l'encre. Les fonds colorés pastel créent des fiches à imprimer gratuit plus attrayantes visuellement. Ajustez l'opacité pour des effets subtils qui n'interfèrent pas avec la lisibilité.

Ajoutez des arrière-plans thématiques en sélectionnant un thème dans le menu Arrière-plan. Parcourez les dizaines d'options disponibles adaptées aux exercices maths et aux activités de graphisme maternelle. Les arrière-plans saisonniers (automne, hiver, printemps, été) contextualisent vos fiches maternelle. Ajustez l'opacité de l'arrière-plan pour qu'il reste discret derrière les images.

Sélectionnez une bordure décorative dans le menu Bordures pour encadrer vos exercices CP. Les bordures thématiques (étoiles, cœurs, formes géométriques) ajoutent une touche professionnelle. Activez la case "Inclure champs Nom/Date" pour que les élèves écrivent leur nom sur la fiche. Cette option facilite l'organisation et le suivi des travaux de coloriage à imprimer.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Étape 3 : Générez Votre Fiche Maternelle - Exercices CP pour Apprendre à Lire et Alphabet',
        description: `Cliquez sur le bouton "Créer" après avoir configuré tous vos paramètres. Le générateur produit instantanément une fiche de tri complète sur le canevas. Deux cadres de catégories apparaissent en haut de la page avec les titres des catégories. Les images découpables se positionnent automatiquement en bas dans une grille organisée.

La génération automatique crée une mise en page optimisée pour l'impression et le découpage. Les images sont espacées uniformément pour faciliter le travail des élèves de maternelle. Aucune image ne se chevauche grâce au système de positionnement intelligent. Le résultat est une fiche à imprimer gratuit professionnelle en quelques secondes.

Basculez vers l'onglet "Corrigé" pour voir la solution générée automatiquement. Le corrigé affiche les images déjà triées dans les bonnes catégories. Les élèves utilisent le corrigé pour vérifier leur travail de manière autonome. Cette fonctionnalité développe l'autonomie dans les exercices CP d'apprendre à lire et de reconnaissance.

Régénérez une nouvelle fiche en cliquant à nouveau sur "Créer" si nécessaire. Chaque génération mélange les positions des images découpables différemment. Créez plusieurs versions des mêmes exercices pour éviter la copie entre élèves. Les fiches maternelle variées maintiennent l'intérêt lors des ateliers alphabet et des activités de classement.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Étape 4 : Personnalisez sur le Canevas - Fiches Maternelle avec Tables de Multiplication et Écriture',
        description: `Modifiez tous les éléments de vos fiches maternelle directement sur le canevas après la génération. Cliquez sur une image pour la sélectionner et révéler les poignées de redimensionnement. Faites glisser les coins pour agrandir ou rétrécir l'image proportionnellement. Faites pivoter l'image en faisant glisser la poignée de rotation circulaire.

Déplacez les cadres de catégories pour ajuster l'espace disponible selon vos besoins. Redimensionnez les zones pour accommoder plus ou moins d'images par catégorie. Cette flexibilité permet d'adapter les exercices CP aux différents niveaux de maternelle. Créez des variantes pour les élèves de PS, MS et GS dans la même classe.

Ajoutez du texte personnalisé avec l'outil Texte dans le panneau latéral. Tapez des instructions spécifiques comme "Trie les formes géométriques" pour les exercices maths. Ajoutez des consignes d'écriture cursive pour combiner tri et pratique de l'écriture. Changez la police, la taille, la couleur et l'épaisseur du contour du texte.

Utilisez les outils d'alignement pour positionner précisément les éléments sur la page. Alignez plusieurs images horizontalement pour créer des rangées uniformes. Centrez les titres de catégories automatiquement avec un clic. Verrouillez les éléments que vous ne voulez pas déplacer accidentellement. Les boutons Annuler et Refaire corrigent les erreurs instantanément.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Étape 5 : Téléchargez et Imprimez - Fiches à Imprimer Gratuit en PDF pour Exercices CE1',
        description: `Téléchargez vos fiches maternelle finalisées en cliquant sur le menu Télécharger. Sélectionnez "Fiche (PDF)" pour obtenir la meilleure qualité d'impression. Le format PDF préserve la résolution 300 DPI pour une netteté professionnelle. Choisissez "Fiche (JPEG)" pour partager numériquement avec les parents ou sur les réseaux sociaux.

Téléchargez également le corrigé en sélectionnant "Corrigé (PDF)" ou "Corrigé (JPEG)". Imprimez le corrigé sur papier de couleur différente pour le distinguer facilement des fiches élèves. Affichez le corrigé au tableau pour la correction collective des exercices CP. Distribuez des copies du corrigé pour l'auto-correction en ateliers autonomes.

Activez l'option "Niveaux de gris" avant le téléchargement pour économiser l'encre couleur. Cette conversion instantanée transforme vos fiches maternelle colorées en noir et blanc. Imprimez des centaines d'exercices CE1 sans vider vos cartouches d'encre. La qualité reste excellente même en impression monochrome pour les activités de coloriage à imprimer.

Ouvrez le fichier PDF téléchargé et imprimez selon vos besoins. Imprimez un exemplaire pour tester avant de produire 30 copies pour la classe. Plastifiez les fiches à imprimer gratuit pour créer des activités réutilisables en atelier. Les élèves utilisent des feutres effaçables sur les fiches plastifiées pour les tables de multiplication et les exercices d'écriture cursive répétitifs.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from picture-sort.md use case sections
  useCases: {
    sectionTitle: 'Fiche Gratuite pour Enfants - Fiche pour Maternelle avec Imprimables Gratuits. Fiche pour Enfants',
    sectionDescription: 'Notre générateur de fiches de tri d\'images répond aux besoins variés des professionnels de l\'éducation. Six profils d\'utilisateurs bénéficient particulièrement de cet outil polyvalent. Chaque groupe trouve des applications spécifiques adaptées à son contexte pédagogique. Les fiches à imprimer gratuit conviennent à l\'enseignement en classe comme à l\'instruction à domicile.',
    badgeText: 'Pour Qui',
    readMoreLabel: 'Lire la suite',
    showLessLabel: 'Voir moins',
    items: [
      {
        id: '1',
        icon: '👶',
        title: 'Enseignants de Maternelle PS, MS et GS - Graphisme Maternelle et Coloriage à Imprimer',
        subtitle: 'Classification et reconnaissance visuelle dès la Petite Section',
        description: `Les enseignants de maternelle utilisent nos fiches de tri pour développer les compétences de classification dès la Petite Section. Créez des activités de graphisme maternelle combinant tri et reconnaissance visuelle. Les élèves de Moyenne Section trient les formes, les couleurs et les tailles avec nos images claires. La Grande Section bénéficie de tris plus complexes préparant l'entrée au CP.

Les activités de tri renforcent la motricité fine à travers le découpage et la manipulation. Combinez tri d'images et coloriage à imprimer pour des ateliers autonomes complets. Les élèves découpent les images, les colorient selon les consignes, puis les trient dans les bonnes catégories. Cette approche multisensorielle favorise l'apprentissage actif en maternelle.

Utilisez les fiches de tri pour enseigner le vocabulaire thématique en maternelle. Triez les animaux de la ferme versus les animaux sauvages pour enrichir le lexique. Les activités saisonnières (vêtements d'été/hiver, fruits/légumes) contextualisent les apprentissages. Nos 3000+ images couvrent tous les thèmes du programme de maternelle français.

Les fiches plastifiées deviennent du matériel de manipulation réutilisable pour les centres d'apprentissage. Les élèves de PS et MS utilisent les mêmes fiches maternelle plusieurs fois avec différentes consignes. Changez les critères de tri (couleur, taille, fonction) pour varier les défis cognitifs. Cette économie de ressources valorise votre abonnement Accès Complet.`,
        quote: 'Mes élèves adorent trier les images par catégories !',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Enseignants de CP et CE1 - Exercices CP pour Apprendre à Lire et Alphabet',
        subtitle: 'Conscience phonologique et catégorisation linguistique',
        description: `Les enseignants de Cours Préparatoire intègrent les fiches de tri dans l'apprentissage de la lecture. Créez des exercices CP pour apprendre à lire en triant les images par son initial. Les élèves classent les objets commençant par /a/ versus ceux commençant par /m/. Cette activité phonologique renforce la conscience des phonèmes essentiels en CP.

Utilisez les fiches de tri pour enseigner l'alphabet et la correspondance graphème-phonème. Triez les images selon leur lettre initiale en majuscule ou minuscule. Les élèves de CE1 trient par syllabes (1 syllabe versus 2 syllabes) pour développer la segmentation phonologique. Ces exercices préparent la lecture syllabique et l'encodage orthographique.

Les activités de tri soutiennent l'apprentissage du vocabulaire écrit en début de primaire. Associez chaque image à son étiquette-mot pour renforcer la reconnaissance globale. Les élèves trient ensuite les mots selon leur catégorie grammaticale (noms versus verbes). Cette approche ludique consolide les bases de la grammaire française.

Intégrez les exercices CE1 de tri dans vos séances de production d'écrits. Les élèves trient les images puis rédigent des phrases utilisant le vocabulaire de chaque catégorie. Créez des fiches de tri thématiques correspondant aux projets d'écriture de la classe. L'écriture cursive se pratique en copiant les noms des catégories sur la fiche.`,
        quote: 'La classification développe la logique nécessaire à la lecture.',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Parents d\'Instruction en Famille - Exercices Maths et Tables de Multiplication à Imprimer',
        subtitle: 'Apprentissage personnalisé à domicile',
        description: `Les familles pratiquant l'instruction à domicile apprécient la flexibilité de notre générateur. Créez des exercices maths adaptés au niveau exact de votre enfant sans contraintes de groupe-classe. Triez les nombres pairs versus impairs pour introduire les concepts mathématiques fondamentaux. Les fiches de tri facilitent la manipulation concrète des quantités.

Utilisez les activités de tri pour enseigner les tables de multiplication de manière ludique. Créez des fiches triant les résultats de la table de 2 versus la table de 5. Les enfants manipulent les images représentant différentes quantités pour visualiser les produits. Cette approche concrète précède la mémorisation abstraite des tables.

Les parents apprécient la génération rapide de matériel pédagogique varié sans préparation fastidieuse. Produisez une nouvelle fiche maternelle chaque jour avec des thèmes correspondant aux intérêts de l'enfant. Personnalisez avec des photos familiales pour maintenir la motivation et l'engagement. L'apprentissage à domicile devient plus structuré et professionnel.

L'abonnement Accès Complet rentabilise rapidement pour les familles instruisant plusieurs enfants. Créez simultanément des exercices CP pour l'aîné et du graphisme maternelle pour le cadet. Chaque enfant progresse à son rythme avec du matériel adapté à son niveau. Les fiches à imprimer gratuit illimitées éliminent les frais de photocopies et de ressources commerciales.`,
        quote: 'Un outil adapté au rythme de chaque enfant.',
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Enseignants de FLE - Fiches à Imprimer Gratuit pour Apprendre le Français Langue Étrangère',
        subtitle: 'Vocabulaire thématique et structures grammaticales',
        description: `Les professeurs de Français Langue Étrangère utilisent les fiches de tri pour enseigner le vocabulaire de base. Créez des activités classant les objets du quotidien par pièce de la maison. Les apprenants débutants acquièrent le lexique thématique à travers la manipulation visuelle. Les 11 langues disponibles permettent des instructions dans la langue maternelle des élèves.

Les activités de tri développent simultanément vocabulaire et structures grammaticales en FLE. Triez les aliments par genre (masculin/féminin) pour enseigner les articles français. Classez les actions par temps verbal (présent/passé) avec des images illustrant différentes situations. Cette approche grammaticale visuelle convient aux apprenants visuels et kinesthésiques.

Utilisez les fiches multilingues pour des classes d'immersion française ou des programmes bilingues. Générez la même fiche en français puis dans la langue maternelle pour comparaison. Les élèves comprennent les catégories dans leur langue puis apprennent le vocabulaire français correspondant. Cette progression scaffoldée respecte les principes de l'enseignement des langues.

Les enseignants de FLE entrepreneuriaux vendent leurs fiches personnalisées sur Teachers Pay Teachers. Créez des séries thématiques (la famille, les métiers, les transports) pour apprenants francophones. La licence commerciale incluse permet de monétiser vos créations pédagogiques. De nombreux professeurs de FLE génèrent un revenu complémentaire significatif.`,
        quote: 'Le tri visuel facilite l\'acquisition du vocabulaire.',
      },
      {
        id: '5',
        icon: '💜',
        title: 'Enseignants Spécialisés ULIS et SEGPA - Exercices Adaptés avec Coloriage et Écriture',
        subtitle: 'Différenciation et adaptation aux besoins spécifiques',
        description: `Les enseignants en ULIS (Unités Localisées pour l'Inclusion Scolaire) adaptent facilement les fiches de tri aux besoins spécifiques. Simplifiez les critères de classification pour les élèves ayant des difficultés cognitives. Utilisez des catégories très visuelles et concrètes (grand/petit, rouge/bleu). Les images claires facilitent la compréhension pour les élèves avec troubles d'apprentissage.

Les classes SEGPA (Section d'Enseignement Général et Professionnel Adapté) utilisent les fiches pour des compétences pratiques. Triez les outils par métier pour introduire l'orientation professionnelle. Classez les ingrédients par recette pour les ateliers de cuisine pédagogique. Les activités de tri développent l'organisation mentale et la planification.

Combinez tri d'images, coloriage et exercices d'écriture pour des activités différenciées complètes. Les élèves découpent et colorient les images selon leur rythme individuel. Ajoutez des consignes d'écriture cursive adaptées au niveau de chaque élève. Cette personnalisation impossible avec des ressources commerciales standard valorise notre outil générateur.

Les fiches plastifiées avec velcro deviennent du matériel de manipulation durable pour les élèves à besoins particuliers. Créez des classeurs d'autonomie avec plusieurs fiches de tri de niveaux progressifs. Les élèves travaillent de manière autonome pendant que vous soutenez d'autres groupes. Cette organisation pédagogique optimise le temps d'enseignement spécialisé.`,
        quote: 'La personnalisation répond à chaque besoin individuel.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Enseignants Entrepreneurs - Vendez des Fiches Maternelle sur Teachers Pay Teachers',
        subtitle: 'Licence commerciale incluse pour TPT, Etsy et Amazon KDP',
        description: `Les enseignants entrepreneuriaux créent des ressources pédagogiques à vendre en ligne avec notre générateur. Concevez des paquets thématiques de fiches maternelle pour chaque saison scolaire. Les ressources de rentrée, d'automne, de Noël et de fin d'année se vendent particulièrement bien. Votre abonnement Accès Complet à 240€/an s'amortit avec quelques ventes seulement.

La licence commerciale incluse permet de vendre sur Etsy, Teachers Pay Teachers et Amazon KDP. Créez des carnets d'exercices imprimables combinant fiches de tri et autres activités. Les enseignants achètent des ressources prêtes à imprimer pour économiser du temps de préparation. Le marché francophone des ressources pédagogiques est moins saturé que le marché anglophone.

Utilisez Pinterest pour promouvoir vos créations auprès de milliers d'enseignants francophones. Créez des épingles attrayantes montrant vos fiches maternelle les plus visuelles. Les images de haute qualité de nos générateurs créent du contenu Pinterest professionnel. Le trafic organique de Pinterest génère des ventes passives continues.

De nombreux enseignants gagnent 500€ à 5000€ par mois en vendant des ressources pédagogiques en ligne. Commencez avec quelques produits bien conçus puis développez votre catalogue progressivement. Notre générateur vous permet de créer rapidement du contenu original protégé par la propriété intellectuelle. Transformez votre expertise pédagogique en revenus complémentaires significatifs.`,
        quote: 'Mon abonnement s\'est rentabilisé dès le premier mois !',
      },
    ],
  },

  // FAQ Section - Selected FAQs from picture-sort.md
  faq: {
    sectionTitle: 'FAQ - Fiche Gratuite pour Enfants et Fiche pour Maternelle. Fiche pour Enfants',
    sectionDescription: 'Les enseignants posent régulièrement des questions sur notre générateur de fiches de tri d\'images. Cette section répond aux interrogations les plus courantes concernant les exercices maths, le graphisme maternelle et les activités d\'alphabet. Découvrez comment maximiser votre abonnement Accès Complet pour créer des fiches à imprimer gratuit en illimité.',
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
        question: 'Ce générateur de fiches maternelle avec tables de multiplication est-il vraiment gratuit ?',
        answer: `Le générateur de fiches de tri nécessite un abonnement Accès Complet coûtant 240€ annuellement ou 25€ mensuellement. Votre abonnement vous permet de créer des exercices CE1 illimités sans frais par fiche. Générez autant de fiches maternelle que nécessaire sans charges supplémentaires. La qualité professionnelle 300 DPI justifie largement cet investissement annuel.

L'abonnement Accès Complet inclut 33 générateurs différents d'activités pédagogiques. Créez des fiches de tri, des exercices maths, des activités de coloriage et bien plus. L'abonnement Pack Essentiel coûte 144€ annuellement et inclut 10 générateurs populaires. Les deux abonnements incluent la licence commerciale, le support multilingue et les exportations haute qualité.`,
      },
      {
        id: '2',
        question: 'Puis-je imprimer les fiches à imprimer gratuit sur une imprimante domestique normale ?',
        answer: `Absolument, toutes les fiches maternelle s'impriment parfaitement sur les imprimantes domestiques standard. Sélectionnez le format Letter (8,5×11 pouces) pour les imprimantes nord-américaines. Choisissez A4 (210×297mm) pour les standards européens. Le PDF haute résolution garantit une netteté parfaite même sur les imprimantes économiques.

L'option niveaux de gris économise considérablement l'encre couleur lors de l'impression de nombreux exercices CE1. Convertissez instantanément vos fiches colorées en noir et blanc avant téléchargement. Cette fonctionnalité permet d'imprimer des centaines de fiches par mois sans vider les cartouches. La qualité reste excellente même en impression monochrome pour le graphisme maternelle.`,
      },
      {
        id: '3',
        question: 'Dois-je avoir des compétences en design pour créer des exercices maths et alphabet ?',
        answer: `Aucune compétence technique ou en design graphique n'est requise pour créer des fiches maternelle professionnelles. L'interface intuitive guide chaque étape de la création. Sélectionnez deux thèmes, cliquez sur générer et votre fiche apparaît instantanément. Les enseignants de tous niveaux technologiques réussissent facilement leurs premières créations.

Les outils d'édition sur canevas fonctionnent par simple glisser-déposer des éléments. Déplacez les images avec la souris, redimensionnez en tirant les coins, faites pivoter en utilisant la poignée circulaire. Les fonctions d'alignement automatique facilitent la mise en page professionnelle. Créez des exercices CE1 de qualité commerciale sans formation préalable en design.`,
      },
      {
        id: '4',
        question: 'Puis-je utiliser ces fiches à imprimer gratuit dans ma classe avec mes élèves ?',
        answer: `Votre abonnement Accès Complet inclut une utilisation illimitée en classe avec vos élèves. Imprimez autant d'exemplaires que nécessaire pour votre groupe-classe complet. Distribuez les fiches maternelle à tous vos élèves sans restriction de quantité. Cette licence d'utilisation pédagogique couvre toutes les activités en contexte scolaire.

Partagez numériquement les fiches avec les parents pour le soutien scolaire à domicile. Envoyez les exercices maths par email ou téléchargez-les sur votre plateforme pédagogique en ligne. Les parents apprécient recevoir des activités de qualité professionnelle pour pratiquer à la maison. Cette flexibilité de distribution valorise considérablement votre abonnement annuel.`,
      },
      {
        id: '5',
        question: 'Dans quelles langues puis-je créer des exercices d\'alphabet et apprendre à lire ?',
        answer: `Notre plateforme propose l'interface utilisateur complète en 11 langues différentes. Créez des fiches maternelle en français, anglais, allemand, espagnol, italien, portugais, néerlandais, suédois, danois, norvégien ou finnois. Les noms de fichiers d'images existent dans toutes ces langues pour un apprentissage vocabulaire authentique. Cette fonctionnalité multilingue sert particulièrement les enseignants de langues vivantes.

Les classes bilingues et d'immersion bénéficient énormément du support multilingue pour apprendre à lire. Générez des exercices CE1 identiques dans deux langues pour comparaison vocabulaire. Les élèves développent simultanément leur conscience phonologique en plusieurs langues. Les programmes d'enseignement du français langue étrangère utilisent intensivement cette capacité multilingue.`,
      },
      {
        id: '6',
        question: 'Puis-je vendre les fiches maternelle et exercices maths que je crée avec ce générateur ?',
        answer: `Oui, votre abonnement Accès Complet inclut une licence commerciale complète d'impression à la demande. Vendez vos fiches maternelle sur Teachers Pay Teachers, Etsy et Amazon KDP sans frais supplémentaires. Aucune attribution n'est requise sur vos créations commercialisées. Cette licence commerciale seule vaut plusieurs centaines d'euros annuellement chez les concurrents.

Créez des carnets d'exercices maths thématiques pour vente en ligne ou lors d'événements éducatifs. Développez une boutique de ressources pédagogiques françaises générant des revenus passifs mensuels. De nombreux enseignants entrepreneuriaux gagnent 500€ à 5000€ par mois vendant leurs créations. La licence commerciale incluse transforme votre créativité pédagogique en source de revenus complémentaires.`,
      },
      {
        id: '7',
        question: 'Comment personnaliser les fiches à imprimer gratuit pour mes élèves de graphisme maternelle ?',
        answer: `Modifiez chaque élément directement sur le canevas après la génération automatique. Cliquez sur une image pour la sélectionner puis redimensionnez, déplacez ou faites pivoter selon vos besoins. Ajoutez du texte personnalisé avec l'outil Texte pour créer des consignes spécifiques. Changez les couleurs, polices et tailles pour adapter aux niveaux de vos élèves.

Téléversez vos propres photos pour créer des fiches contextualisées à votre classe. Combinez photos de votre école avec images de notre bibliothèque de 3000+ illustrations. Cette personnalisation crée des exercices de graphisme maternelle significatifs pour vos élèves. Les activités contextualisées augmentent significativement l'engagement et la motivation des jeunes apprenants.`,
      },
      {
        id: '8',
        question: 'Pour quels groupes d\'âge ces fiches de coloriage à imprimer et écriture conviennent-elles le mieux ?',
        answer: `Les fiches de tri d'images conviennent principalement aux élèves de 3 à 8 ans. Les enfants de maternelle PS, MS et GS développent leurs compétences de classification et reconnaissance visuelle. Les élèves de CP et CE1 utilisent les fiches pour des activités linguistiques plus complexes. Chaque niveau trouve des applications adaptées à son développement cognitif.

Adaptez facilement la complexité pour différents niveaux de maternelle en modifiant les critères de tri. Les PS trient par couleur ou taille avec catégories très visuelles. Les GS gèrent des tris conceptuels comme "vit dans l'eau" versus "vit sur terre". Les activités de coloriage à imprimer et d'écriture s'ajoutent selon le niveau de développement moteur fin.`,
      },
      {
        id: '9',
        question: 'Puis-je téléverser mes propres images pour créer des exercices CE1 et alphabet personnalisés ?',
        answer: `Absolument, le téléversement d'images personnalisées constitue une fonctionnalité essentielle de notre générateur. Cliquez sur le bouton de téléversement pour sélectionner des fichiers depuis votre ordinateur. Importez plusieurs images simultanément en formats JPEG, PNG ou GIF. Vos photos apparaissent immédiatement dans la zone des images disponibles.

Combinez vos images personnalisées avec notre bibliothèque pour des fiches totalement uniques. Utilisez des photos de votre classe, de sorties scolaires ou d'événements locaux. Cette personnalisation crée des exercices CE1 et des activités d'alphabet contextualisés à votre réalité pédagogique. Les images téléversées restent disponibles pendant toute votre session de travail.`,
      },
      {
        id: '10',
        question: 'Combien de temps faut-il pour créer une fiche de tables de multiplication et exercices maths complète ?',
        answer: `La création d'une fiche complète prend approximativement 3 minutes de la sélection initiale au téléchargement final. Choisissez deux thèmes pour génération automatique en 30 secondes. Le système crée instantanément une fiche professionnelle avec mise en page optimisée. Les ajustements personnalisés ajoutent 1-2 minutes selon vos préférences.

Cette rapidité contraste fortement avec les 30-60 minutes nécessaires pour créer manuellement des exercices maths similaires. Économisez 27 minutes par fiche créée avec notre générateur automatisé. Multipliez par 50 fiches mensuelles pour économiser plus de 20 heures de préparation. Ces heures récupérées se consacrent à l'enseignement direct ou à l'équilibre vie professionnelle-personnelle.`,
      },
      {
        id: '11',
        question: 'Les fiches de graphisme maternelle et coloriage incluent-elles des corrigés avec apprendre à lire ?',
        answer: `Oui, chaque fiche de tri inclut automatiquement un corrigé montrant la solution correcte. Le corrigé affiche les images déjà triées dans les bonnes catégories pour référence. Téléchargez séparément la fiche élève et le corrigé en formats PDF ou JPEG. Imprimez le corrigé sur papier de couleur différente pour le distinguer facilement.

Les corrigés facilitent l'auto-correction autonome et le travail en ateliers indépendants. Affichez le corrigé au tableau pour la correction collective après l'activité. Distribuez des copies du corrigé pour que les élèves vérifient leur travail individuellement. Cette fonctionnalité développe l'autonomie dans les exercices d'apprendre à lire et les activités de classification.`,
      },
      {
        id: '12',
        question: 'Puis-je créer des fiches à imprimer gratuit sur des sujets scolaires spécifiques avec écriture cursive ?',
        answer: `Absolument, notre bibliothèque de 3000+ images couvre tous les sujets du programme scolaire. Créez des fiches de tri pour sciences (animaux, plantes, corps humain), géographie (pays, drapeaux, monuments), ou mathématiques (formes, nombres, opérations). La fonction de recherche trouve rapidement les images correspondant à votre thématique d'enseignement.

Ajoutez des consignes d'écriture cursive en utilisant l'outil Texte avec police manuscrite française. Les élèves copient les noms des catégories en écriture cursive sur leur fiche. Cette intégration de tri visuel et pratique d'écriture crée des activités interdisciplinaires complètes. Combinez nos 33 générateurs pour créer des paquets d'activités thématiques couvrant plusieurs compétences simultanément.`,
      },
    ],
  },

  // Pricing - Accès Complet Bundle for Picture Sort
  pricing: {
    title: 'Accès Complet',
    price: '240€',
    priceInterval: '/an',
    priceSuffix: 'Facturation annuelle',
    benefits: [
      'Création de fiches illimitée',
      '33 types de générateurs',
      'Licence commerciale incluse',
      '11 langues supportées',
      '3000+ images thématiques',
      'Qualité d\'impression 300 DPI',
      'Corrigés inclus',
    ],
    ctaText: 'Commencer Maintenant',
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
  },

  // Related Apps - From picture-sort.md Section 7
  relatedApps: {
    sectionTitle: 'Fiches Gratuites Combiner - Fiche pour Enfants et Imprimables Gratuits',
    sectionDescription: 'Votre abonnement Accès Complet inclut 33 générateurs d\'activités pédagogiques différents. Combinez le générateur de fiches de tri avec d\'autres outils pour créer des paquets thématiques complets. Cette approche intégrée renforce l\'apprentissage en abordant les concepts sous plusieurs angles. Les élèves bénéficient d\'activités variées ciblant les mêmes objectifs pédagogiques avec des exercices CE1 diversifiés.',
    ctaTitle: 'Prêt à Créer des Fiches Fantastiques ?',
    ctaDescription: 'Rejoignez des milliers d\'enseignants qui créent des fiches professionnelles. Génération illimitée, licence commerciale incluse.',
    primaryCtaText: 'Commencer l\'Essai Gratuit',
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
        slug: 'exercices-maths-fiches',
        name: 'Exercices Maths',
        category: 'Mathématiques',
        icon: '➕',
        description: 'Associez les fiches de tri avec notre générateur d\'exercices maths pour créer des paquets mathématiques complets. Les élèves trient d\'abord les quantités visuellement puis résolvent des opérations correspondantes. Cette progression du concret vers l\'abstrait facilite la compréhension des concepts mathématiques.',
      },
      {
        id: '2',
        slug: 'train-alphabet-fiches',
        name: 'Train de l\'Alphabet',
        category: 'Lecture',
        icon: '🚂',
        description: 'Combinez le tri d\'images avec nos générateurs d\'activités d\'alphabet pour un apprentissage phonologique complet. Créez une fiche triant les images par son initial puis ajoutez des exercices d\'alphabet ciblant ces mêmes sons.',
      },
      {
        id: '3',
        slug: 'coloriage-fiches',
        name: 'Coloriage à Imprimer',
        category: 'Arts et Motricité',
        icon: '🎨',
        description: 'Le coloriage à imprimer renforce la reconnaissance visuelle des images avant le tri. Les élèves examinent attentivement chaque image pour la colorier correctement. Cette attention aux détails facilite ensuite l\'identification des caractéristiques de tri.',
      },
      {
        id: '4',
        slug: 'graphisme-fiches',
        name: 'Graphisme',
        category: 'Graphisme',
        icon: '✏️',
        description: 'Combinez le tri d\'images avec notre générateur de fiches d\'écriture pour un apprentissage intégré. Les élèves trient les images puis copient les noms des catégories en écriture cursive. Cette association de manipulation visuelle et pratique graphomotrice renforce la mémorisation du vocabulaire.',
      },
      {
        id: '5',
        slug: 'cherche-et-compte-fiches',
        name: 'Cherche et Compte',
        category: 'Mathématiques',
        icon: '🔍',
        description: 'Les tables de multiplication s\'enseignent plus efficacement avec des contextes signifiants. Créez des problèmes utilisant le vocabulaire des fiches de tri thématiques. Les élèves calculent après avoir trié les éléments.',
      },
      {
        id: '6',
        slug: 'association-fiches',
        name: 'Fiches d\'Association',
        category: 'Logique',
        icon: '🔗',
        description: 'Les élèves de Grande Section maternelle se préparent à l\'entrée au CP avec des activités structurées. Combinez tri d\'images par son initial et exercices d\'identification de lettres de l\'alphabet.',
      },
    ],
  },
};

export default pictureSortFrContent;
