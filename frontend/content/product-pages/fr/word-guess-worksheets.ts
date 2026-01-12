import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Word Guess Worksheets - French Content
 *
 * File: frontend/content/product-pages/fr/word-guess-worksheets.ts
 * URL: /fr/apps/deviner-mots-fiches (French SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/French/word-guess.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 *
 * PRICING: Accès Complet = €240/an (Accès Complet)
 * App ID: word-guess
 */

export const wordGuessFrContent: ProductPageContent = {
  // SEO Metadata - French language-specific
  seo: {
    slug: 'deviner-mots-fiches',
    appId: 'word-guess',
    title: 'Deviner les Mots | Fiches à Imprimer Gratuit pour Maternelle et CP',
    description: 'Créez des fiches maternelle professionnelles avec notre générateur de devinettes à indices visuels. Votre abonnement Accès Complet à 240 € par an vous permet de générer des exercices CP personnalisés illimités. Téléchargez des fichiers PDF haute qualité en moins de 3 minutes.',
    keywords: 'deviner les mots, fiches maternelle, exercices CP, fiches à imprimer gratuit, apprendre à lire, fiches alphabet, graphisme maternelle, exercices maths, apprendre les lettres, coloriage à imprimer, écriture cursive, tables de multiplication, exercices CE1',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fr/apps/deviner-mots-fiches',
  },

  // Hero Section - FULL text from word-guess.md paragraphs 1-4
  hero: {
    title: 'Générateur de Fiches Deviner les Mots',
    subtitle: 'Fiches à Imprimer Gratuit pour Maternelle et CP',
    description: `Créez des fiches maternelle professionnelles avec notre générateur de devinettes à indices visuels. Votre abonnement Accès Complet à 240 € par an vous donne accès illimité à la création de fiches sans frais supplémentaires. Générez des exercices CP personnalisés parfaits pour l'apprentissage du vocabulaire et de l'écriture. Téléchargez des fiches à imprimer gratuit de haute qualité en PDF en moins de 3 minutes.

Notre outil facilite la création d'exercices d'apprentissage à lire pour les élèves de maternelle et CP. Les enfants voient une image et doivent deviner le mot en remplissant les lettres manquantes. Parfait pour renforcer la reconnaissance des lettres de l'alphabet et l'apprentissage des lettres. Chaque fiche maternelle inclut des indices visuels clairs qui aident les jeunes apprenants.

Les enseignants adorent notre générateur pour créer rapidement des exercices maths adaptés et des fiches de graphisme maternelle. Ajustez le niveau de difficulté pour différencier l'instruction. Créez des exercices CE1 plus complexes ou des fiches maternelle plus simples. Les options de personnalisation incluent la taille de la page, les couleurs et les polices. Générez jusqu'à 10 devinettes par page.

Votre abonnement Accès Complet inclut une licence commerciale pour vendre vos fiches. Parfait pour les enseignants entrepreneurs sur Teachers Pay Teachers ou Etsy. Téléchargez en format PDF ou JPEG à 300 DPI. L'option niveaux de gris économise l'encre lors de l'impression. Les corrigés sont générés automatiquement pour faciliter la correction.`,
    previewImageSrc: '/samples/english/word guess/clue-grid_worksheet.jpeg',
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

  // Sample Gallery - REAL file paths from samples/english/word guess/
  samples: {
    sectionTitle: 'Exemples de Fiches Deviner les Mots',
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
        worksheetSrc: '/samples/english/word guess/clue-grid_worksheet.jpeg',
        answerKeySrc: '/samples/english/word guess/clue-grid_answer-key.jpeg',
        altText: 'Fiche deviner les mots avec indices visuels pour la pratique du vocabulaire en maternelle',
        pdfDownloadUrl: '/samples/english/word guess/clue-grid_worksheet.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/english/word guess/landscape.jpeg',
        answerKeySrc: '/samples/english/word guess/landscape answer-key.jpeg',
        altText: 'Fiche deviner les mots en format paysage pour la pratique de l\'orthographe en CP',
        pdfDownloadUrl: '/samples/english/word guess/landscape.pdf',
      },
      {
        id: '3',
        worksheetSrc: '/samples/english/word guess/custom word list.jpeg',
        answerKeySrc: '/samples/english/word guess/custom word list answer-key.jpeg',
        altText: 'Fiche deviner les mots personnalisée avec liste de mots pour exercices CE1',
        pdfDownloadUrl: '/samples/english/word guess/custom word list.pdf',
      },
    ],
  },

  // Features Grid - FULL text from word-guess.md feature sections
  features: {
    sectionTitle: 'Fonctionnalités du Générateur de Fiches Maternelle - Tout ce qu\'il Faut pour Créer des Exercices CP Parfaits',
    sectionDescription: 'Notre générateur de fiches à imprimer gratuit offre toutes les fonctionnalités dont vous avez besoin. Créez des exercices maternelle professionnels en quelques clics. Personnalisez chaque élément pour correspondre à vos besoins pédagogiques. Les enseignants de maternelle et CP apprécient la simplicité et la flexibilité. Chaque fiche maternelle que vous créez peut être modifiée entièrement sur le canevas. Les sept fonctionnalités clés transforment votre façon de créer des exercices. Gagnez du temps tout en produisant des fiches de qualité supérieure. Votre abonnement Accès Complet débloque toutes ces capacités professionnelles. Aucun frais supplémentaire pour les fonctionnalités premium.',
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
        title: 'Créer des Fiches Maternelle en 3 Clics - Générateur Rapide d\'Exercices CP',
        description: `La création de fiches maternelle n'a jamais été aussi simple. Sélectionnez un thème d'images pour vos exercices CP. Cliquez sur générer et votre fiche apparaît instantanément. Trois clics suffisent pour créer des exercices professionnels.

Choisissez parmi plus de 3000 images organisées par thèmes. Les thèmes populaires incluent les animaux, les aliments et les objets du quotidien. Parfait pour créer des fiches à imprimer gratuit sur n'importe quel sujet. Les images sont adaptées aux jeunes enfants avec des illustrations claires.

Le générateur calcule automatiquement la mise en page optimale. Créez de 1 à 10 devinettes par page selon vos besoins. Chaque fiche maternelle s'adapte parfaitement au format choisi. Portrait ou paysage, A4 ou Lettre, tout fonctionne parfaitement.`,
        highlighted: true,
      },
      {
        id: '2',
        icon: '✏️',
        title: 'Modifier Toutes les Fiches à Imprimer Gratuit - Personnalisation Complète des Exercices Maternelle',
        description: `Chaque élément sur votre fiche maternelle est entièrement modifiable. Déplacez les images, redimensionnez les boîtes de lettres, changez les couleurs. Faites glisser, pivoter et ajuster n'importe quel élément avec la souris. Aucune compétence technique requise.

Ajoutez du texte personnalisé n'importe où sur la page. Changez la taille, la couleur et la police du texte. Ajoutez des titres, des instructions ou des consignes spécifiques. Parfait pour créer des exercices CP adaptés à votre classe.

Modifiez les fiches après génération pour les personnaliser davantage. Supprimez des éléments qui ne conviennent pas. Ajoutez vos propres images téléchargées. La flexibilité totale garantit que chaque fiche maternelle correspond exactement à vos besoins pédagogiques.`,
        highlighted: false,
      },
      {
        id: '3',
        icon: '📤',
        title: 'Télécharger vos Propres Images - Fiches Maternelle Personnalisées pour Apprendre à Lire',
        description: `Téléchargez plusieurs images simultanément pour vos exercices maternelle. Tous les formats courants sont acceptés : JPEG, PNG, GIF. Combinez les images de la bibliothèque avec vos propres photos. Créez des fiches à imprimer gratuit ultra-personnalisées pour vos élèves.

Utilisez des photos de votre classe pour un apprentissage contextualisé. Téléchargez des images de vocabulaire spécifique à votre programme. Parfait pour créer des exercices CP sur des thèmes particuliers. Les enfants adorent voir des objets familiers dans leurs exercices.

Les images téléchargées fonctionnent exactement comme celles de la bibliothèque. Redimensionnez, pivotez et positionnez-les librement sur le canevas. Le nom du fichier devient automatiquement le mot à deviner. Modifiez manuellement les noms si nécessaire pour créer des fiches maternelle précises.`,
        highlighted: false,
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Support de 11 Langues - Exercices Maternelle Multilingues pour Apprendre l\'Alphabet',
        description: `L'interface utilisateur fonctionne dans 11 langues différentes. Français, anglais, allemand, espagnol, italien et portugais. Également néerlandais, suédois, danois, norvégien et finnois. Parfait pour les écoles internationales et les programmes bilingues.

Le support linguistique est essentiel pour créer des exercices d'apprentissage à lire. Les mots sont extraits des noms de fichiers dans la langue sélectionnée. Créez des fiches maternelle en français, puis passez à une autre langue. Idéal pour l'enseignement des langues étrangères dès la maternelle.

Les enseignants de CP apprécient la flexibilité multilingue. Créez des exercices pour apprendre les lettres de l'alphabet dans plusieurs langues. Comparez le vocabulaire entre les langues pour enrichir l'apprentissage. Les programmes d'immersion bilingue bénéficient particulièrement de cette fonctionnalité.`,
        highlighted: true,
      },
      {
        id: '5',
        icon: '💰',
        title: 'Licence Commerciale POD Incluse - Vendez vos Fiches à Imprimer Gratuit sur Etsy',
        description: `Votre abonnement Accès Complet inclut une licence commerciale complète. Vendez vos fiches maternelle sur Teachers Pay Teachers sans frais supplémentaires. Créez une boutique Etsy de ressources pédagogiques imprimables. Publiez des cahiers d'activités sur Amazon KDP.

La qualité 300 DPI garantit des impressions professionnelles parfaites. Vos clients reçoivent des fiches nettes et claires. Parfait pour vendre des exercices CP premium. Les enseignants entrepreneurs génèrent entre 500€ et 5000€ par mois.

Aucune attribution requise sur vos créations. Marquez les fiches à imprimer gratuit avec votre propre logo. Créez votre marque d'exercices maternelle unique. La licence commerciale POD est incluse dans l'abonnement Accès Complet à 240€ par an. Les concurrents facturent 80-200€ supplémentaires pour les droits commerciaux.`,
        highlighted: false,
      },
      {
        id: '6',
        icon: '🎨',
        title: 'Bibliothèque de Plus de 3000 Images - Thèmes pour Fiches Maternelle et Exercices de Graphisme Maternelle',
        description: `Accédez à plus de 3000 images adaptées aux enfants. Organisation thématique pour trouver rapidement ce dont vous avez besoin. Sélectionnez un thème entier en un clic pour vos fiches maternelle. Parcourez individuellement pour choisir des images spécifiques.

Les thèmes populaires incluent les animaux de la ferme et de la forêt. Fruits, légumes, véhicules et objets du quotidien. Parfait pour créer des exercices CP sur le vocabulaire concret. Chaque image est claire avec des contours nets.

La fonction recherche trouve instantanément des images spécifiques. Tapez « pomme » pour voir toutes les images de pommes. Créez des fiches à imprimer gratuit thématiques cohérentes. Combinez différents thèmes pour des exercices variés et des fiches de graphisme maternelle enrichissantes.`,
        highlighted: false,
      },
      {
        id: '7',
        icon: '🖨️',
        title: 'Qualité Professionnelle 300 DPI - Exercices Maternelle Parfaits pour l\'Impression',
        description: `Téléchargez vos fiches maternelle en qualité 300 DPI. Parfait pour l'impression professionnelle et la vente. Chaque lettre et chaque image reste nette et claire. Les parents et collègues impressionnés par la qualité.

Choisissez entre les formats PDF et JPEG pour vos exercices CP. Le PDF conserve la qualité vectorielle pour les textes. Le JPEG fonctionne partout et se partage facilement. Les deux formats garantissent des fiches à imprimer gratuit de qualité supérieure.

L'option niveaux de gris économise l'encre d'imprimante. Convertit automatiquement toutes les couleurs en nuances de gris. Parfait pour imprimer de nombreuses copies économiquement. Les exercices maternelle restent clairs et lisibles en noir et blanc. Les fonctions annuler et refaire permettent de corriger facilement les erreurs.`,
        highlighted: false,
      },
    ],
  },

  // How-To Guide - FULL text from word-guess.md step sections
  howTo: {
    sectionTitle: 'Comment Créer des Fiches Maternelle en 5 Étapes Simples - Guide Complet pour Exercices CP et CE1',
    sectionDescription: 'Créez vos premières fiches maternelle en moins de 3 minutes. Ce guide explique chaque étape du processus de création. Suivez ces cinq étapes simples pour générer des exercices CP professionnels. Aucune compétence technique requise pour créer des fiches à imprimer gratuit parfaites. Le processus est identique pour tous les niveaux scolaires. Créez des fiches maternelle pour la petite section ou des exercices CE1 plus avancés. Ajustez simplement le niveau de difficulté selon vos besoins. Chaque enseignant peut maîtriser ce générateur dès la première utilisation.',
    ctaText: 'Commencer Maintenant',
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
        title: 'Étape 1: Choisir vos Images pour Fiches Maternelle - Exercices CP et CE1 sur l\'Alphabet et Apprendre les Lettres',
        description: `Commencez par sélectionner les images pour vos fiches maternelle. Ouvrez le menu Bibliothèque d'Images dans le panneau latéral. Choisissez un thème complet ou sélectionnez des images individuelles. Les exercices CP fonctionnent mieux avec 6 à 8 images par fiche.

Les thèmes organisés facilitent la création d'exercices thématiques cohérents. Sélectionnez le thème Animaux pour enseigner le vocabulaire animalier. Le thème Fruits et Légumes parfait pour les exercices CE1 sur l'alimentation. Chaque thème contient 20 à 50 images adaptées aux jeunes enfants. Idéal pour créer des fiches sur l'alphabet et apprendre les lettres.

Utilisez la fonction recherche pour trouver des images spécifiques. Tapez le nom d'un animal ou d'un objet pour voir toutes les images correspondantes. Parfait pour créer des fiches maternelle sur des sujets précis. Combinez des images de différents thèmes pour des exercices variés.

Téléchargez vos propres images si nécessaire. Cliquez sur le bouton Télécharger Images Personnalisées. Sélectionnez plusieurs fichiers simultanément depuis votre ordinateur. Les images téléchargées apparaissent immédiatement dans votre liste. Parfait pour créer des exercices CP ultra-personnalisés avec le vocabulaire de votre classe.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Étape 2: Personnaliser les Fiches à Imprimer Gratuit - Difficulté des Exercices pour Apprendre à Lire et Écriture Cursive',
        description: `Configurez les paramètres dans le menu Configuration des Exercices. Choisissez le nombre de devinettes par page de 1 à 10. Sélectionnez le niveau de difficulté adapté à vos élèves. Quatre niveaux disponibles pour différencier l'instruction dans vos fiches à imprimer gratuit.

Le niveau Sans indices laisse toutes les cases vides. Les enfants doivent deviner et écrire toutes les lettres eux-mêmes. Parfait pour les exercices CE1 avancés qui maîtrisent l'orthographe. Excellent pour pratiquer l'écriture cursive et renforcer la mémoire orthographique.

Le niveau Facile affiche la moitié des lettres comme indices. Un mot de 6 lettres montre 3 lettres pré-remplies. Idéal pour les débutants en maternelle qui apprennent à lire. Les indices visuels aident les élèves à deviner le mot plus facilement.

Le niveau Normal affiche un quart des lettres comme indices. Un équilibre parfait entre défi et support pour les exercices CP. Les élèves utilisent les indices et l'image pour compléter le mot. Développe les compétences de déduction et d'orthographe simultanément.

Choisissez entre majuscules et minuscules pour les lettres. Les majuscules conviennent mieux aux jeunes enfants de maternelle. Les minuscules préparent à l'écriture cursive pour les élèves de CP et CE1.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Étape 3: Générer les Fiches Maternelle - Exercices de Graphisme Maternelle et Apprendre l\'Alphabet',
        description: `Cliquez sur le bouton Générer pour créer vos fiches maternelle. Le générateur calcule automatiquement la mise en page optimale. Les exercices apparaissent instantanément dans l'onglet Fiche de Travail. La génération prend moins de 2 secondes pour créer des exercices de graphisme maternelle professionnels.

Chaque devinette affiche l'image à gauche et les cases de lettres à droite. Les cases sont dimensionnées parfaitement pour l'écriture des enfants. Les lettres pré-remplies apparaissent selon le niveau de difficulté choisi. Les cases vides attendent que l'enfant écrive les lettres manquantes pour apprendre l'alphabet.

Le générateur adapte automatiquement la taille selon le nombre de devinettes. Une fiche avec 3 devinettes affiche de grandes images et cases. Une fiche avec 10 devinettes réduit proportionnellement la taille. Tout s'adapte parfaitement au format de page sélectionné.

La mise en page passe automatiquement en deux colonnes si nécessaire. Format paysage avec plus de 5 devinettes utilise deux colonnes. Optimise l'utilisation de l'espace sur la page. Les fiches maternelle restent claires et bien organisées visuellement.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Étape 4: Modifier sur le Canevas - Personnaliser vos Fiches à Imprimer Gratuit avec Coloriage à Imprimer',
        description: `Personnalisez entièrement votre fiche après génération. Cliquez sur n'importe quel élément pour le sélectionner. Déplacez les images et les boîtes de lettres avec la souris. Redimensionnez en tirant les coins de sélection. Parfait pour ajuster vos fiches à imprimer gratuit selon vos besoins.

Ajoutez du texte personnalisé n'importe où sur la page. Ouvrez le menu Outils Texte dans le panneau latéral. Tapez votre titre, vos instructions ou vos consignes. Cliquez sur Ajouter Texte pour placer le texte sur le canevas. Idéal pour créer des consignes spécifiques à votre classe.

Changez les couleurs du texte et des éléments visuels. Sélectionnez l'élément puis choisissez une nouvelle couleur. Ajoutez des contours colorés au texte pour plus de visibilité. Les options de personnalisation sont illimitées pour vos fiches maternelle.

Ajoutez un thème de fond ou de bordure décoratif. Sélectionnez un thème dans les menus Fond et Bordure. Les arrière-plans thématiques créent des fiches visuellement attrayantes. Parfait pour motiver les jeunes élèves avec des designs colorés comme du coloriage à imprimer.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Étape 5: Télécharger et Imprimer - Fiches à Imprimer Gratuit pour Exercices CP et Exercices Maths',
        description: `Téléchargez votre fiche terminée en format PDF ou JPEG. Cliquez sur le bouton Télécharger dans le coin supérieur droit. Choisissez Télécharger Fiche (PDF) pour la meilleure qualité d'impression. Le PDF conserve la netteté parfaite à 300 DPI pour vos fiches à imprimer gratuit.

Le format JPEG fonctionne parfaitement pour partager numériquement. Envoyez par email aux parents ou publiez sur votre plateforme scolaire. Les deux formats garantissent une qualité professionnelle. Vos exercices CP restent nets et clairs quelle que soit la méthode d'impression.

Activez l'option Niveaux de Gris avant de télécharger pour économiser l'encre. Cochez la case dans le menu Téléchargement. Toutes les couleurs se convertissent automatiquement en nuances de gris. Parfait pour imprimer de nombreuses copies sans épuiser les cartouches couleur.

Téléchargez également le corrigé automatiquement généré. Cliquez sur l'onglet Corrigé pour voir toutes les lettres remplies. Téléchargez en PDF ou JPEG comme la fiche de travail. Le corrigé facilite la correction rapide des exercices en classe. Parfait aussi pour créer des exercices maths avec corrigés.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from word-guess.md use case sections
  useCases: {
    sectionTitle: 'Parfait pour Enseignants, Parents et Éducateurs - Fiches Maternelle et Exercices CP pour Tous les Besoins',
    sectionDescription: 'Notre générateur de fiches maternelle s\'adapte à tous les contextes éducatifs. Les enseignants de maternelle, CP et CE1 l\'utilisent quotidiennement. Les parents qui font l\'école à la maison créent des exercices personnalisés. Les orthophonistes et enseignants spécialisés différencient l\'instruction facilement. Chaque type d\'utilisateur trouve des applications pédagogiques pertinentes. Les six groupes d\'utilisateurs principaux bénéficient différemment du générateur. Chacun adapte les fiches à imprimer gratuit selon ses besoins spécifiques.',
    badgeText: 'Cas d\'Utilisation',
    readMoreLabel: 'Lire la suite',
    showLessLabel: 'Voir moins',
    items: [
      {
        id: '1',
        icon: '👩‍🏫',
        title: 'Enseignants de Maternelle - Fiches à Imprimer Gratuit pour Apprendre les Lettres et Graphisme Maternelle',
        subtitle: 'Fiches alphabet et conscience phonologique',
        description: `Les enseignants de petite, moyenne et grande section adorent notre générateur. Créez des fiches maternelle adaptées aux enfants de 3 à 6 ans. Les exercices de graphisme maternelle renforcent la motricité fine essentielle. Les devinettes visuelles captent l'attention des jeunes apprenants qui commencent à apprendre les lettres.

Utilisez les fiches pour les centres d'apprentissage autonome. Les élèves travaillent seuls pendant que vous aidez d'autres groupes. Les images claires permettent aux enfants de deviner sans aide constante. Parfait pour développer l'autonomie dès la maternelle avec des exercices de graphisme maternelle progressifs.

Créez des cahiers thématiques hebdomadaires pour vos élèves. Thème des animaux en septembre, fruits en octobre, véhicules en novembre. Les enfants adorent les exercices cohérents avec les thèmes de classe. Combinez avec du coloriage à imprimer pour des activités complètes qui développent simultanément reconnaissance des lettres et motricité fine.`,
        quote: 'Mes élèves adorent les fiches avec les images colorées !',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Enseignants de CP et CE1 - Exercices CP pour Apprendre à Lire et Écriture Cursive',
        subtitle: 'Fiches de lecture et exercices maths',
        description: `Les enseignants de CP utilisent nos fiches pour consolider la lecture. Les élèves de 6-7 ans pratiquent le décodage et l'orthographe simultanément. Chaque devinette renforce le lien entre les lettres et les sons. Parfait pour les exercices CP quotidiens qui soutiennent l'apprentissage de la lecture. Idéal aussi pour pratiquer l'écriture cursive avec les minuscules.

Les enseignants de CE1 créent des défis de vocabulaire avancés. Les élèves de 7-8 ans travaillent avec des mots plus longs et complexes. Téléchargez des images de vocabulaire académique spécifique. Créez des fiches sur les thèmes scientifiques ou géographiques du programme. Excellent pour apprendre à lire des textes plus complexes et perfectionner l'écriture cursive.

Intégrez les fiches dans votre progression d'apprentissage de la lecture. Commencez l'année avec des mots simples de 3-4 lettres. Progressez vers des mots de 6-8 lettres au fil des trimestres. Le générateur s'adapte parfaitement à votre planification pédagogique.`,
        quote: 'Les fiches rendent l\'apprentissage de la lecture ludique.',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Parents d\'Instruction en Famille - Fiches Maternelle et Exercices Maths pour Apprendre les Lettres',
        subtitle: 'Apprentissage personnalisé à la maison',
        description: `Les parents qui font l'école à la maison adorent la flexibilité totale. Créez des fiches maternelle exactement adaptées au niveau de votre enfant. Progressez à son rythme sans suivre un manuel rigide. Les exercices personnalisés maintiennent la motivation et l'engagement. Parfait pour enseigner les lettres de façon ludique et personnalisée.

Combinez les devinettes avec d'autres activités d'apprentissage. Créez des fiches sur le vocabulaire du livre que vous lisez ensemble. Thématisez selon les sorties et expériences de votre famille. L'apprentissage devient contextuel et significatif pour votre enfant. Intégrez même des exercices maths en comptant les lettres ou les images.

La licence commerciale permet de partager avec d'autres familles. Créez des packs thématiques pour votre coopérative d'instruction en famille. Échangez des ressources avec d'autres parents éducateurs. Certains parents créent même des revenus en vendant leurs créations.`,
        quote: 'Un outil adapté à tous les niveaux de mes enfants.',
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Enseignants de Langues Étrangères - Exercices CP et CE1 Multilingues pour Apprendre à Lire',
        subtitle: 'Vocabulaire multilingue et apprentissage progressif',
        description: `Les professeurs de langues utilisent le support de 11 langues. Enseignez l'anglais, l'espagnol ou l'allemand avec des supports visuels. Les enfants apprennent le vocabulaire étranger avec des indices visuels clairs. Parfait pour les programmes d'immersion bilingue dès la maternelle. Les exercices CE1 avancés introduisent du vocabulaire académique en langue étrangère.

Créez des fiches comparatives entre le français et la langue cible. Une page en français, une page en anglais avec les mêmes images. Les élèves comparent l'orthographe et découvrent les similarités. L'apprentissage comparatif renforce la compréhension dans les deux langues.

Les cours de FLE pour enfants non-francophones bénéficient énormément. Les images aident à comprendre sans traduction constante. Les élèves apprennent le vocabulaire français contextuellement. La progression du facile au difficile suit leur acquisition linguistique.`,
        quote: 'Le support multilingue est essentiel pour mes élèves allophones.',
      },
      {
        id: '5',
        icon: '💜',
        title: 'Enseignants Spécialisés - Fiches à Imprimer Gratuit pour Écriture Cursive et Coloriage à Imprimer',
        subtitle: 'Différenciation et adaptation aux besoins spécifiques',
        description: `Les orthophonistes créent des exercices ciblés pour leurs patients. Travaillez la conscience phonologique avec des mots spécifiques. Ciblez les sons problématiques pour chaque enfant individuellement. Les images claires supportent la compréhension pour tous les profils. Pratiquez l'écriture cursive avec des mots adaptés au niveau de chaque patient.

Les enseignants d'ULIS adaptent facilement les fiches pour leurs élèves. Créez des versions très simplifiées avec peu de lettres. Utilisez de grandes images et peu de devinettes par page. La différenciation extrême devient possible avec notre générateur. Ajoutez du coloriage à imprimer pour rendre les fiches encore plus accessibles et motivantes.

Les éducateurs spécialisés travaillant avec des enfants autistes apprécient la prévisibilité. Le format constant rassure les enfants ayant besoin de routine. Les indices visuels supportent les apprenants visuels parfaitement.`,
        quote: 'Je peux adapter les fiches pour chaque élève de ma classe ULIS.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Enseignants Entrepreneurs - Vendre des Fiches Maternelle avec Tables de Multiplication et Calcul',
        subtitle: 'Licence commerciale incluse pour TPT, Etsy et Amazon KDP',
        description: `Les enseignants entrepreneurs génèrent des revenus passifs avec nos fiches. Créez des packs thématiques pour Teachers Pay Teachers. Vendez des cahiers d'activités sur Etsy ou votre propre site. La licence commerciale Accès Complet permet la vente illimitée. Combinez devinettes de mots avec des exercices maths et tables de multiplication.

Les boutiques Etsy de ressources pédagogiques prospèrent avec nos outils. Créez 50 fiches thématiques en une après-midi de travail. Vendez le pack à 5-10€ et générez des revenus récurrents. Les clients adorent les fiches professionnelles personnalisables.

Les auteurs auto-édités sur Amazon KDP publient des cahiers d'activités. Combinez 100 fiches maternelle en un cahier thématique. Ajoutez une couverture attrayante et publiez en quelques heures. Les royautés s'accumulent passivement pendant des années.`,
        quote: 'Mon abonnement s\'est rentabilisé dès le premier mois de ventes !',
      },
    ],
  },

  // FAQ Section - Selected FAQs from word-guess.md
  faq: {
    sectionTitle: 'Questions Fréquemment Posées sur les Fiches Deviner les Mots - Fiches Maternelle et Exercices CP',
    sectionDescription: 'Les enseignants et parents ont des questions courantes sur notre générateur de fiches. Voici les réponses détaillées aux questions les plus fréquentes. Ces réponses couvrent l\'abonnement, l\'utilisation en classe, la personnalisation et les fonctionnalités techniques pour apprendre à lire et apprendre les lettres.',
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
        question: 'Ce Générateur de Fiches Maternelle et Exercices Maths est-il Vraiment Gratuit?',
        answer: `Le générateur de fiches maternelle nécessite un abonnement Accès Complet à 240€ annuels ou 25€ mensuels. Votre abonnement vous donne accès illimité à la création de fiches sans frais supplémentaires. Générez autant d'exercices maths, tables de multiplication et fiches à imprimer gratuit que nécessaire. Aucun coût par fiche individuelle après votre abonnement.

L'abonnement Accès Complet inclut tous les 33 générateurs de la plateforme. Créez des fiches maternelle, exercices de calcul, graphisme maternelle et coloriage à imprimer. L'abonnement Pack Essentiel coûte 144€ annuellement et inclut 10 générateurs populaires. Les deux abonnements incluent la licence commerciale, le support de 11 langues et les exports 300 DPI professionnels pour vos exercices maths et écriture cursive.`,
      },
      {
        id: '2',
        question: 'Puis-je Imprimer ces Fiches à Imprimer Gratuit et Exercices de Calcul à la Maison?',
        answer: `L'abonnement Accès Complet permet l'impression illimitée à domicile ou à l'école. Utilisez n'importe quelle imprimante standard pour vos fiches maternelle. Les formats PDF et JPEG fonctionnent parfaitement avec toutes les imprimantes. Imprimez autant de copies que nécessaire pour vos élèves. Les exercices de calcul, tables de multiplication et graphisme maternelle s'impriment nettement.

Les fiches téléchargées restent sur votre ordinateur définitivement. Réimprimez les mêmes exercices maths l'année suivante si besoin. Partagez les PDF avec vos collègues enseignants. L'option niveaux de gris économise l'encre pour les impressions multiples. Parfait pour imprimer des classes complètes de fiches à imprimer gratuit et coloriage à imprimer.`,
      },
      {
        id: '3',
        question: 'Ai-je Besoin de Compétences en Design pour Créer des Exercices Maths et Graphisme Maternelle?',
        answer: `Aucune compétence technique requise pour utiliser notre générateur de fiches maternelle. L'interface intuitive guide chaque étape de création. Sélectionnez vos images, choisissez les paramètres, cliquez sur générer. Vos exercices maths et tables de multiplication apparaissent instantanément professionnels. Même les enseignants peu à l'aise avec la technologie réussissent facilement.

Les contrôles simples permettent la personnalisation sans formation. Changez les couleurs, ajoutez du texte, déplacez les éléments avec la souris. Les fiches de graphisme maternelle et écriture cursive se créent aussi simplement. Des milliers d'enseignants sans expérience design créent quotidiennement des ressources magnifiques. Les tutoriels intégrés expliquent chaque fonctionnalité clairement pour vos fiches à imprimer gratuit.`,
      },
      {
        id: '4',
        question: 'Puis-je Utiliser ces Fiches Maternelle et Exercices CP pour Apprendre à Lire en Classe?',
        answer: `L'abonnement Accès Complet inclut l'utilisation illimitée en classe. Distribuez vos fiches maternelle à tous vos élèves sans restriction. Créez des exercices CP pour apprendre à lire adaptés à chaque niveau. Imprimez des copies pour toute l'école si nécessaire. La licence couvre l'usage éducatif complet dans les établissements scolaires.

Partagez les fiches avec vos collègues enseignants librement. Créez des banques de ressources communes pour votre niveau scolaire. Les exercices pour apprendre à lire et l'alphabet s'utilisent en centres d'apprentissage. Les fiches de graphisme maternelle fonctionnent parfaitement en ateliers autonomes. Distribuez aux familles pour le travail à domicile également.`,
      },
      {
        id: '5',
        question: 'Quelles Langues sont Disponibles pour les Fiches à Imprimer Gratuit et Tables de Multiplication?',
        answer: `L'interface utilisateur fonctionne dans 11 langues européennes. Créez des fiches maternelle en français, anglais, allemand, espagnol et italien. Également portugais brésilien, néerlandais, suédois, danois, norvégien et finnois. Parfait pour les écoles internationales et programmes bilingues. Les exercices maths et tables de multiplication s'adaptent à chaque langue.

Le contenu des fiches s'adapte aussi à la langue sélectionnée. Les mots extraits des noms d'images correspondent à la langue choisie. Créez des exercices pour apprendre à lire en plusieurs langues simultanément. Les programmes d'immersion bénéficient des ressources multilingues cohérentes. Enseignez l'alphabet et les tables de multiplication dans toutes les langues européennes principales.`,
      },
      {
        id: '6',
        question: 'Puis-je Vendre les Fiches avec Tables de Multiplication et Exercices de Calcul que je Crée?',
        answer: `L'abonnement Accès Complet inclut une licence commerciale POD complète sans frais supplémentaires. Vendez vos fiches maternelle sur Teachers Pay Teachers librement. Créez une boutique Etsy de ressources imprimables pédagogiques. Publiez des cahiers d'activités avec tables de multiplication sur Amazon KDP. Les enseignants entrepreneurs génèrent des revenus significatifs grâce aux exercices de calcul.

Aucune attribution requise sur vos créations vendues. Ajoutez votre propre logo et marque sur les fiches à imprimer gratuit. Vendez des packs thématiques d'exercices maths pour 5-15€ chacun. Les cahiers de tables de multiplication se vendent particulièrement bien auprès des parents. La licence couvre la vente illimitée sans royalties supplémentaires pour graphisme maternelle et écriture cursive.`,
      },
      {
        id: '7',
        question: 'Comment Personnaliser les Fiches de Graphisme Maternelle et Écriture Cursive pour mes Élèves?',
        answer: `La personnalisation complète est possible après génération de vos fiches maternelle. Cliquez sur n'importe quel élément pour le modifier. Changez les couleurs, redimensionnez les images, déplacez les boîtes de lettres. Ajoutez du texte personnalisé avec des instructions spécifiques. Parfait pour adapter les exercices de graphisme maternelle à vos besoins exacts.

Téléchargez vos propres images pour des fiches ultra-personnalisées. Ajoutez des thèmes de fond et bordures décoratives. Modifiez la police et la taille du texte pour l'écriture cursive. Choisissez entre majuscules et minuscules selon votre objectif pédagogique. Les options de personnalisation sont infinies pour vos fiches à imprimer gratuit et coloriage à imprimer.`,
      },
      {
        id: '8',
        question: 'Pour Quels Âges ces Exercices pour Apprendre à Lire et l\'Alphabet Conviennent-ils?',
        answer: `Les fiches maternelle conviennent aux enfants de 3 à 8 ans principalement. Les tout-petits de maternelle petite section utilisent les versions très simplifiées. Les élèves de grande section et CP bénéficient le plus des exercices pour apprendre à lire. Les CE1 et CE2 travaillent avec les versions difficiles sans indices. Ajustez la difficulté selon le niveau de chaque élève pour l'alphabet.

Les quatre niveaux de difficulté s'adaptent à tous les âges. Sans indices convient aux lecteurs avancés de CE1-CE2. Facile parfait pour les débutants en maternelle grande section. Normal idéal pour les élèves de CP en cours d'apprentissage. Les exercices pour apprendre les lettres de l'alphabet évoluent avec vos élèves. Les fiches de graphisme maternelle supportent le développement moteur essentiel.`,
      },
      {
        id: '9',
        question: 'Puis-je Télécharger mes Propres Images pour les Fiches à Imprimer Gratuit et Coloriage à Imprimer?',
        answer: `Le téléchargement d'images personnalisées est entièrement supporté. Cliquez sur le menu Télécharger Images Personnalisées. Sélectionnez plusieurs fichiers simultanément depuis votre ordinateur. Tous les formats standards fonctionnent : JPEG, PNG, GIF. Parfait pour créer des fiches à imprimer gratuit sur votre vocabulaire spécifique.

Combinez vos images avec celles de la bibliothèque de 3000+ images. Créez des fiches thématiques sur des sujets particuliers à votre programme. Les images téléchargées fonctionnent exactement comme celles de la bibliothèque. Le nom du fichier devient automatiquement le mot à deviner. Modifiez manuellement si nécessaire pour vos exercices de coloriage à imprimer personnalisés.`,
      },
      {
        id: '10',
        question: 'Combien de Temps pour Créer des Exercices de Calcul, Tables de Multiplication et Graphisme Maternelle?',
        answer: `La création complète prend moins de 3 minutes du début au téléchargement. Sélectionnez vos images en 30 secondes. Configurez les paramètres en 1 minute. La génération est instantanée en 2 secondes. Modifications finales et téléchargement en 1 minute. Vos exercices de calcul et tables de multiplication sont prêts immédiatement.

Comparez avec 30-60 minutes pour créer manuellement la même fiche maternelle. Notre générateur économise 90% de votre temps de préparation. Créez 10 fiches différentes en 30 minutes totales. Impossible manuellement sans y passer des heures entières. Les exercices de graphisme maternelle et écriture cursive se génèrent aussi rapidement que les autres types.`,
      },
      {
        id: '11',
        question: 'Les Corrigés sont-ils Inclus pour les Exercices Maths et Tables de Multiplication?',
        answer: `Chaque fiche maternelle génère automatiquement son corrigé complet. Basculez vers l'onglet Corrigé pour voir toutes les lettres remplies. Téléchargez le corrigé en PDF ou JPEG comme la fiche de travail. Parfait pour la correction rapide des exercices maths en classe. Les enseignants apprécient énormément cette fonctionnalité pour les tables de multiplication.

Les corrigés facilitent aussi l'auto-correction des élèves. Plastifiez les corrigés pour les centres d'apprentissage autonome. Les élèves vérifient leurs réponses indépendamment. Développe l'autonomie et la responsabilité dans l'apprentissage. Les corrigés fonctionnent pour tous types de fiches à imprimer gratuit incluant graphisme maternelle et exercices de calcul.`,
      },
      {
        id: '12',
        question: 'Puis-je Créer des Fiches sur des Matières Spécifiques comme Apprendre à Lire et Tables de Multiplication?',
        answer: `Créez des fiches maternelle sur absolument n'importe quel sujet académique. Téléchargez des images de vocabulaire mathématique pour les tables de multiplication. Utilisez des images scientifiques pour enseigner le vocabulaire académique. Créez des fiches géographiques avec des monuments et pays. Les exercices pour apprendre à lire s'adaptent à tous les thèmes curriculaires.

Les thèmes de la bibliothèque couvrent les sujets scolaires principaux. Animaux pour les sciences naturelles, aliments pour la nutrition. Véhicules pour les transports, objets quotidiens pour le vocabulaire. Combinez avec vos images téléchargées pour des sujets très spécifiques. Les exercices de calcul et graphisme maternelle deviennent des outils transdisciplinaires puissants pour apprendre l'alphabet.`,
      },
    ],
  },

  // Pricing - FULL ACCESS (€240/an)
  pricing: {
    title: 'Accès Complet',
    price: '240€',
    priceInterval: '/an',
    priceSuffix: 'Facturé annuellement',
    benefits: [
      'Création illimitée de fiches deviner les mots',
      'Licence commerciale incluse',
      '11 langues disponibles',
      '3000+ images thématiques',
      'Qualité 300 DPI professionnelle',
      'Corrigés automatiques inclus',
    ],
    ctaText: 'Commencer Maintenant',
    bundleDescription: 'Votre abonnement inclut l'acces a 10 generateurs de fiches:',
    bundleApps: [
      'Addition Images',
      'Train Alphabet',
      'Coloriages',
      'Fiches de Maths',
      'Mots Melanges',
      'Cherche et Compte',
      'Jeu d'Association',
      'Tracer des Lignes',
      'Bingo Images',
      'Sudoku',
    ],
  },

  // Related Apps - From word-guess.md Section 7
  relatedApps: {
    sectionTitle: 'Combinez les Fiches Deviner les Mots avec d\'Autres Générateurs - Coloriage à Imprimer et Exercices Maths',
    sectionDescription: 'Notre plateforme offre 33 générateurs différents de fiches pédagogiques. Les enseignants créent des packs d\'apprentissage complets en combinant plusieurs types d\'activités. Fiches deviner les mots pour le vocabulaire, exercices maths pour les nombres, coloriage à imprimer pour la motricité fine et fiches d\'alphabet pour apprendre les lettres. Ces combinaisons créent des expériences d\'apprentissage riches qui engagent les élèves sur plusieurs niveaux.',
    ctaTitle: 'Prêt à Créer des Fiches Professionnelles ?',
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
        slug: 'exercices-maths-fiches',
        name: 'Exercices Maths',
        category: 'Mathématiques',
        icon: '➕',
        description: 'Combinez les fiches deviner les mots avec nos générateurs d\'exercices maths pour créer des packs mathématiques complets. Créez des fiches avec du vocabulaire mathématique. Plus, moins, égal, somme, différence, total.',
      },
      {
        id: '2',
        slug: 'train-alphabet-fiches',
        name: 'Train de l\'Alphabet',
        category: 'Lecture',
        icon: '🚂',
        description: 'Combinez les fiches deviner les mots avec nos générateurs d\'alphabet et de graphisme maternelle pour développer les compétences d\'écriture précoces. Les devinettes montrent aux enfants comment les lettres se combinent en mots.',
      },
      {
        id: '3',
        slug: 'coloriage-fiches',
        name: 'Coloriage à Imprimer',
        category: 'Arts et Motricité',
        icon: '🎨',
        description: 'Combinez les fiches deviner les mots avec du coloriage à imprimer pour créer des packs d\'activités calmes parfaits. Ces combinaisons fonctionnent merveilleusement pour les temps de transition, les centres autonomes ou les activités de fin de journée.',
      },
      {
        id: '4',
        slug: 'cherche-et-compte-fiches',
        name: 'Cherche et Compte',
        category: 'Mathématiques',
        icon: '🔍',
        description: 'Combinez les fiches deviner les mots avec des exercices de comptage pour une instruction complète des nombres. Créez des associations image-nombre montrant les représentations de quantités.',
      },
      {
        id: '5',
        slug: 'mots-croises-images-fiches',
        name: 'Mots Croisés en Images',
        category: 'Lecture',
        icon: '📝',
        description: 'Combinez les fiches deviner les mots avec les mots croisés pour une pratique complète du vocabulaire. Les élèves complètent les devinettes puis trouvent les mêmes mots de vocabulaire dans les mots croisés.',
      },
      {
        id: '6',
        slug: 'mots-melanges-fiches',
        name: 'Mots Mélangés',
        category: 'Lecture',
        icon: '🔤',
        description: 'Combinez les fiches deviner les mots avec les mots mélangés pour renforcer l\'orthographe. Les élèves devinent d\'abord les mots, puis les retrouvent avec les lettres mélangées.',
      },
    ],
  },
};

export default wordGuessFrContent;
