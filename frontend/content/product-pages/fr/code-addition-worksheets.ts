import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Code Addition Worksheets (Addition avec Images) - French Content
 *
 * File: frontend/content/product-pages/fr/code-addition-worksheets.ts
 * URL: /fr/apps/addition-codee-fiches (French SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/French/code-addition.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 *
 * Pricing Tier: Accès Complet (Accès Complet) - 240€/year
 */

export const codeAdditionFrContent: ProductPageContent = {
  // SEO Metadata - French language-specific
  seo: {
    slug: 'addition-codee-fiches',
    appId: 'code-addition',
    title: 'Fiches Addition Codée Gratuites | Générateur Exercices Maths Maternelle CP',
    description: 'Créez des fiches d\'addition codée pour maternelle et CP. Images colorées, légende à décoder, corrigé automatique. Téléchargez PDF gratuit en 3 minutes.',
    keywords: 'fiches maternelle, exercices maths, exercices CP, fiches à imprimer gratuit, graphisme maternelle, coloriage à imprimer, apprendre à lire, alphabet, tables de multiplication, écriture cursive, calcul',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fr/apps/addition-codee-fiches',
    images: [
      {
        url: 'https://www.lessoncraftstudio.com/samples/french/code-addition/sample-1.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Fiche addition codée fiches maternelle avec exercices maths et images pour enfants'
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/french/code-addition/sample-2.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Fiches à imprimer gratuit addition codée exercices CP avec légende décodage'
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/french/code-addition/sample-3.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Exercices maths maternelle coloriage à imprimer fiches addition images'
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/french/code-addition/sample-4.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Graphisme maternelle calcul fiches maternelle addition codée pour enfants'
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/french/code-addition/sample-5.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Fiche apprendre à lire nombres exercices CP CE1 addition avec images'
      }
    ],
  },

  // Hero Section - FULL text from code-addition.md paragraphs 1-4
  hero: {
    title: 'Générateur de Fiches d\'Addition avec Images',
    subtitle: 'Fiches à Imprimer Gratuit pour Exercices Maths Maternelle et CP',
    description: `Créez des fiches d'addition originales avec notre générateur de fiches maternelle. Votre abonnement Accès Complet vous donne un accès illimité à la création de fiches à imprimer gratuit sans frais supplémentaires. Chaque fiche utilise des images colorées pour représenter les nombres. Les enfants décodent une légende puis additionnent les valeurs correspondantes.

Le concept unique de ce générateur transforme l'apprentissage des exercices maths en jeu de décodage. Une légende en haut de la fiche associe chaque image à un nombre précis. Par exemple : pomme = 3, voiture = 5, ballon = 2. L'enfant voit ensuite des opérations comme [pomme] + [voiture] = ___. Il doit d'abord identifier les valeurs dans la légende, puis calculer le résultat.

Cette approche développe plusieurs compétences simultanément. La reconnaissance visuelle améliore la mémoire de travail. Le décodage de symboles prépare à la lecture et aux exercices CP. Le calcul mental renforce les bases mathématiques. Les fiches maternelle deviennent ainsi des outils d'apprentissage complets et ludiques.

Notre générateur propose des fiches à imprimer gratuit adaptées à tous les niveaux. Pour la maternelle grande section, choisissez des nombres de 1 à 5. Pour les exercices CP, élargissez la plage de 1 à 10. Les exercices CE1 peuvent utiliser des nombres jusqu'à 20. Chaque fiche s'adapte automatiquement au niveau de difficulté choisi.`,
    previewImageSrc: '/samples/french/code-addition/sample-1.jpeg',
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

  // Sample Gallery - REAL file paths from samples/english/code addition/
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
        worksheetSrc: '/samples/french/code-addition/sample-1.jpeg',
        answerKeySrc: '/samples/french/code-addition/sample-1-answer.jpeg',
        altText: 'Fiche addition codée fiches maternelle - exercices maths avec images pour grande section',
        pdfDownloadUrl: '/samples/french/code-addition/sample-1.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/french/code-addition/sample-2.jpeg',
        answerKeySrc: '/samples/french/code-addition/sample-2-answer.jpeg',
        altText: 'Fiches à imprimer gratuit addition codée - exercices CP avec légende à décoder',
        pdfDownloadUrl: '/samples/french/code-addition/sample-2.pdf',
      },
      {
        id: '3',
        worksheetSrc: '/samples/french/code-addition/sample-3.jpeg',
        answerKeySrc: '/samples/french/code-addition/sample-3-answer.jpeg',
        altText: 'Exercices maths maternelle avec coloriage à imprimer - fiches addition images',
        pdfDownloadUrl: '/samples/french/code-addition/sample-3.pdf',
      },
      {
        id: '4',
        worksheetSrc: '/samples/french/code-addition/sample-4.jpeg',
        answerKeySrc: '/samples/french/code-addition/sample-4-answer.jpeg',
        altText: 'Graphisme maternelle et calcul - fiches maternelle addition codée pour enfants',
        pdfDownloadUrl: '/samples/french/code-addition/sample-4.pdf',
      },
      {
        id: '5',
        worksheetSrc: '/samples/french/code-addition/sample-5.jpeg',
        answerKeySrc: '/samples/french/code-addition/sample-5-answer.jpeg',
        altText: 'Fiche pour apprendre à lire les nombres - exercices CP CE1 addition avec images',
        pdfDownloadUrl: '/samples/french/code-addition/sample-5.pdf',
      },
    ],
  },

  // Features Grid - FULL text from code-addition.md feature sections
  features: {
    sectionTitle: 'Fiches Gratuites et Fiche pour Enfants - Imprimables Gratuits et Fiche pour Maternelle',
    sectionDescription: 'Notre générateur de fiches à imprimer gratuit offre des fonctionnalités professionnelles. Chaque outil a été conçu pour les enseignants de maternelle et d\'école élémentaire. Créez des exercices maths personnalisés en quelques clics. Les fiches maternelle deviennent des supports pédagogiques de qualité professionnelle.',
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
        title: 'Création Facile de Fiches Maternelle - Exercices Maths en 3 Clics avec Graphisme Maternelle',
        description: `La création de fiches maternelle n'a jamais été aussi simple. Sélectionnez un thème d'images parmi des dizaines de catégories disponibles. Choisissez le nombre d'exercices souhaités (de 3 à 10). Définissez la plage de nombres pour adapter la difficulté. Cliquez sur "Créer" et votre fiche apparaît instantanément.

Le générateur organise automatiquement les éléments sur la page. La légende des images s'affiche clairement en haut. Les exercices maths s'alignent parfaitement. Les espaces de réponse sont calibrés pour l'écriture des enfants. Le graphisme maternelle reste cohérent sur toute la fiche.`,
        highlighted: true,
      },
      {
        id: '2',
        icon: '✏️',
        title: 'Édition Complète sur Canevas - Fiches à Imprimer Gratuit avec Écriture Personnalisable',
        description: `Chaque élément de vos fiches à imprimer gratuit est entièrement modifiable. Déplacez les images par glisser-déposer. Redimensionnez les éléments avec les poignées de coin. Faites pivoter n'importe quel objet selon l'angle souhaité. Supprimez les éléments inutiles d'un simple clic.

L'écriture et les textes s'éditent directement sur le canevas. Modifiez la taille des polices pour l'adapter aux besoins. Changez les couleurs pour créer du contraste visuel. Ajoutez des contours aux textes pour une meilleure lisibilité. L'écriture cursive ou script s'adapte à votre préférence pédagogique.`,
        highlighted: false,
      },
      {
        id: '3',
        icon: '📤',
        title: 'Import d\'Images Personnelles - Exercices CP et Fiches Maternelle avec Vos Propres Visuels',
        description: `Téléchargez vos propres images pour personnaliser les exercices CP et les fiches maternelle. L'import multi-fichiers accepte tous les formats courants. JPEG, PNG et GIF sont pris en charge. Combinez vos images personnelles avec celles de la bibliothèque intégrée.

Les photos de classe deviennent des supports d'exercices maths. Les dessins des élèves s'intègrent dans les fiches à imprimer gratuit. Les mascotes de classe personnalisent chaque document. Les exercices CP gagnent en pertinence pour vos élèves.`,
        highlighted: false,
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Fiches Maternelle en 11 Langues - Exercices Maths et Alphabet pour Apprendre les Lettres Multilingue',
        description: `Le générateur supporte 11 langues pour l'interface et le contenu. Français, anglais, allemand, espagnol, portugais, italien. Néerlandais, suédois, danois, norvégien et finnois également. Les noms d'images s'affichent dans la langue choisie. Parfait pour les classes bilingues et l'apprentissage de l'alphabet dans plusieurs langues.

Les exercices maths deviennent des outils d'apprentissage linguistique. Apprendre les lettres et les nombres simultanément enrichit l'expérience. L'alphabet s'intègre naturellement via les noms d'images. Les fiches maternelle soutiennent l'éveil aux langues dès le plus jeune âge.`,
        highlighted: false,
      },
      {
        id: '5',
        icon: '💰',
        title: 'Licence Commerciale Incluse - Fiches à Imprimer Gratuit pour Vente sur Teachers Pay Teachers',
        description: `Votre abonnement Accès Complet inclut une licence commerciale complète. Vendez vos fiches à imprimer gratuit sur Teachers Pay Teachers. Commercialisez sur Etsy ou Amazon KDP. Aucune attribution requise. Aucun frais supplémentaire de licence.

Les exercices maths créés vous appartiennent entièrement. La qualité 300 DPI garantit une impression professionnelle. Les fiches maternelle se vendent comme ressources premium. Les exercices CP et CE1 génèrent des revenus complémentaires pour les enseignants entrepreneurs.`,
        highlighted: true,
      },
      {
        id: '6',
        icon: '🎨',
        title: 'Bibliothèque de 3000+ Images - Coloriage à Imprimer et Graphisme Maternelle Inclus',
        description: `Plus de 3000 images adaptées aux enfants enrichissent vos créations. Animaux, véhicules, aliments, formes géométriques. Nature, objets du quotidien, personnages colorés. Chaque image est optimisée pour le coloriage à imprimer et le graphisme maternelle.

Les thèmes organisent les images par catégorie. La recherche par mot-clé trouve rapidement l'image parfaite. Les arrière-plans décoratifs embellissent vos fiches maternelle. Les bordures thématiques encadrent vos exercices maths avec élégance.`,
        highlighted: false,
      },
      {
        id: '7',
        icon: '🖨️',
        title: 'Qualité Professionnelle 300 DPI - Exercices CE1 et Fiches à Imprimer Gratuit Haute Résolution',
        description: `Téléchargez vos créations en qualité professionnelle. Le format PDF garantit une mise en page parfaite. Le format JPEG offre une compatibilité universelle. La résolution 300 DPI assure une impression nette et précise.

L'option niveaux de gris économise l'encre sans sacrifier la qualité. Les exercices CE1 restent parfaitement lisibles en noir et blanc. Les fiches à imprimer gratuit conservent tous leurs détails. Les exercices maths et le graphisme maternelle s'impriment de manière professionnelle sur toute imprimante domestique.`,
        highlighted: false,
      },
    ],
  },

  // How-To Guide - FULL text from code-addition.md step sections
  howTo: {
    sectionTitle: 'Fiche Gratuite pour Enfants Créer - Fiche pour Maternelle',
    sectionDescription: 'Créer des fiches maternelle professionnelles ne prend que quelques minutes. Suivez ces cinq étapes simples pour générer des exercices maths personnalisés. Chaque fiche à imprimer gratuit s\'adapte à vos besoins pédagogiques. Le processus complet dure moins de trois minutes.',
    ctaText: 'Commencer Maintenant',
    badgeText: 'Guide Étape par Étape',
    stepLabel: 'Étape',
    completionTitle: 'Terminé !',
    completionSubtitle: 'Vos fiches d\'addition codée sont prêtes',
    readyTime: 'Prêt en moins de 3 minutes',
    noSkillsNeeded: 'Aucune compétence en design requise',
    readMoreLabel: 'Lire la suite',
    showLessLabel: 'Voir moins',
    steps: [
      {
        id: '1',
        number: 1,
        title: 'Étape 1 : Choisir les Images pour vos Exercices Maths - Fiches Maternelle avec Thèmes ou Import Personnel',
        description: `Commencez par sélectionner les images qui composeront vos exercices maths. Deux options s'offrent à vous pour créer des fiches maternelle uniques.

La première option utilise les thèmes de la bibliothèque. Plus de 30 catégories thématiques sont disponibles. Animaux de la ferme, fruits et légumes, moyens de transport. Formes géométriques, objets du quotidien, saisons. Chaque thème contient des dizaines d'images adaptées aux enfants.

La seconde option permet l'import de vos propres images. Téléchargez les photos de votre classe. Utilisez les dessins réalisés par vos élèves. Intégrez les mascotes de votre école. Les exercices maths deviennent immédiatement plus personnels et engageants.

Sélectionnez exactement 5 images pour votre fiche. Ces images apparaîtront dans la légende. Chacune sera associée à un nombre unique. Les fiches maternelle utilisent ces associations pour créer les problèmes d'addition.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Étape 2 : Configurer les Paramètres - Exercices CP et Calcul avec Plage de Nombres Adaptée',
        description: `Ajustez les paramètres pour adapter la difficulté à votre niveau de classe. Les exercices CP nécessitent des réglages différents des fiches maternelle.

Définissez le nombre d'exercices par fiche. Le minimum est de 3 problèmes pour les débutants. Le maximum atteint 10 problèmes pour les élèves avancés. Les exercices CP standard utilisent généralement 5 à 6 problèmes par page.

Choisissez la plage de nombres pour le calcul. Pour la grande section, restez entre 1 et 5. Pour les exercices CP, élargissez de 1 à 10. Les exercices CE1 peuvent utiliser des nombres jusqu'à 20. Cette progression prépare naturellement aux tables de multiplication.

Sélectionnez le format de page selon vos besoins. Letter portrait convient à l'impression standard. A4 portrait s'adapte au format européen. Le format paysage offre plus d'espace horizontal pour les grandes images.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Étape 3 : Générer la Fiche - Fiches à Imprimer Gratuit avec Prévisualisation Instantanée et Graphisme Maternelle',
        description: `Cliquez sur le bouton "Créer" pour générer votre fiche. L'aperçu apparaît instantanément sur le canevas. La légende s'affiche en haut avec les 5 images et leurs valeurs. Les exercices s'organisent automatiquement sur la page.

Le graphisme maternelle reste cohérent et professionnel. Les images s'alignent parfaitement. Les espaces de réponse sont calibrés pour l'écriture des enfants. Les numéros de problèmes facilitent la correction.

Vérifiez que les fiches à imprimer gratuit correspondent à vos attentes. Les problèmes sont générés aléatoirement à chaque création. Régénérez autant de fois que nécessaire pour obtenir la combinaison parfaite. Chaque génération produit des exercices uniques.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Étape 4 : Personnaliser sur le Canevas - Écriture et Coloriage à Imprimer avec Édition Complète',
        description: `Le canevas offre une liberté totale de personnalisation. Modifiez chaque élément pour créer des fiches uniques.

Ajoutez du texte personnalisé pour les consignes. Choisissez la police adaptée à l'écriture cursive ou script. Modifiez les couleurs pour créer du contraste. L'écriture devient plus lisible avec les bons réglages typographiques.

Déplacez les éléments par glisser-déposer. Redimensionnez les images selon vos préférences. Ajoutez un arrière-plan décoratif parmi les thèmes disponibles. Intégrez une bordure pour un aspect plus fini.

Les fiches peuvent inclure des zones de coloriage à imprimer. Les images en noir et blanc invitent au coloriage après l'exercice. Cette approche combine exercices maths et motricité fine. Le graphisme maternelle s'enrichit de cette dimension artistique.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Étape 5 : Télécharger et Imprimer - Fiches Maternelle PDF et Corrigé pour Exercices Maths Autonomes',
        description: `Téléchargez votre création en un clic. Deux formats sont disponibles pour vos fiches maternelle.

Le format PDF préserve la mise en page exacte. Parfait pour l'impression professionnelle. Compatible avec toutes les imprimantes. Les exercices maths s'impriment avec une qualité optimale.

Le format JPEG offre une flexibilité maximale. Intégrez les images dans d'autres documents. Partagez facilement par email ou messagerie. Les fiches à imprimer gratuit circulent aisément entre collègues.

L'option niveaux de gris économise l'encre couleur. Les exercices CP restent parfaitement lisibles. Le graphisme maternelle conserve tous ses détails en noir et blanc.

Générez ensuite le corrigé automatique. Le corrigé reprend exactement la même mise en page. Les réponses remplacent les espaces vides. Parfait pour la correction rapide ou l'auto-évaluation. Les exercices maths en autonomie deviennent possibles grâce à ce corrigé.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from code-addition.md use case sections
  useCases: {
    sectionTitle: 'Fiche Gratuite pour Enfants - Fiche pour Maternelle avec Imprimables Gratuits. Fiche pour Enfants',
    sectionDescription: 'Les fiches à imprimer gratuit répondent aux besoins de nombreux profils d\'utilisateurs. Des enseignants de maternelle aux parents pratiquant l\'instruction en famille. Des professeurs de CP aux éducateurs spécialisés. Découvrez comment chaque groupe tire profit de ce générateur d\'exercices maths.',
    badgeText: 'Cas d\'Utilisation',
    readMoreLabel: 'Lire la suite',
    showLessLabel: 'Voir moins',
    items: [
      {
        id: '1',
        icon: '👩‍🏫',
        title: 'Enseignants de Maternelle - Graphisme Maternelle et Exercices Maths pour Grande Section',
        subtitle: 'Fiches maternelle avec images colorées pour développer le calcul et la reconnaissance visuelle',
        description: `Les enseignants de maternelle grande section trouvent dans ce générateur un outil précieux. Les fiches maternelle combinent apprentissage des nombres et reconnaissance visuelle. Le graphisme maternelle s'intègre naturellement grâce aux images colorées et attrayantes.

Les exercices préparent progressivement aux apprentissages du CP. L'addition avec images développe la compréhension du concept mathématique. Les élèves manipulent mentalement les quantités avant de passer aux chiffres abstraits. Cette transition douce facilite l'entrée dans les exercices maths formels.

Le graphisme maternelle bénéficie également de ces fiches. Les espaces de réponse calibrés entraînent l'écriture des chiffres. La motricité fine se développe en remplissant les cases. Les fiches maternelle deviennent des outils complets de préparation scolaire.`,
        quote: 'Mes élèves de grande section adorent décoder la légende avant de calculer !',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Professeurs d\'École Élémentaire - Exercices CP CE1 et Préparation aux Tables de Multiplication',
        subtitle: 'Exercices maths ludiques pour renforcer les bases du calcul et préparer la multiplication',
        description: `Les enseignants de CP et CE1 utilisent ces fiches pour diversifier leurs exercices maths. L'addition avec images offre une approche ludique du calcul. Les exercices CP renforcent les automatismes d'addition de base.

La progression vers les tables de multiplication commence ici. Comprendre l'addition comme combinaison de quantités prépare à la multiplication. Les exercices CE1 avec des nombres plus élevés construisent cette fondation. Les tables de multiplication deviennent plus accessibles après cette préparation visuelle.

Les fiches à imprimer gratuit complètent les manuels scolaires traditionnels. Les exercices CP apportent de la variété aux séances de mathématiques. Le décodage de la légende développe également les compétences de lecture. Les exercices maths deviennent ainsi pluridisciplinaires.`,
        quote: 'Les tables de multiplication sont plus faciles à aborder après ces exercices d\'addition visuelle.',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Parents en Instruction à Domicile - Fiches à Imprimer Gratuit pour Apprendre à Lire et Calculer',
        subtitle: 'Fiches personnalisables pour l\'école à la maison et l\'apprentissage individualisé',
        description: `Les familles pratiquant l'instruction en famille apprécient particulièrement ce générateur. Les fiches à imprimer gratuit permettent de créer un programme personnalisé. Chaque enfant progresse à son rythme avec des exercices maths adaptés.

L'approche visuelle aide les enfants à apprendre à lire les nombres différemment. La légende à décoder stimule la mémoire de travail. Apprendre à lire et calculer simultanément optimise les séances d'apprentissage. Les parents économisent du temps de préparation précieux.

Les thèmes personnalisables maintiennent l'engagement des enfants. Utilisez les centres d'intérêt de votre enfant comme support. Dinosaures, animaux, véhicules : chaque passion devient un outil pédagogique. Les fiches maternelle s'adaptent parfaitement à l'enseignement individualisé.`,
        quote: 'Un outil parfait pour notre instruction en famille avec des activités personnalisées !',
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Professeurs de FLE et Classes Bilingues - Alphabet et Apprendre les Lettres en Plusieurs Langues',
        subtitle: 'Support multilingue pour l\'éveil aux langues et les classes internationales',
        description: `Les enseignants de français langue étrangère découvrent un outil multilingue puissant. L'alphabet s'apprend à travers les noms des images dans la légende. Apprendre les lettres devient un objectif secondaire naturel des exercices maths.

Les 11 langues disponibles permettent des comparaisons linguistiques enrichissantes. Les élèves voient le même objet nommé dans différentes langues. L'alphabet de chaque langue s'intègre progressivement. Les fiches maternelle soutiennent l'éveil aux langues dès le plus jeune âge.

Les classes bilingues utilisent la fonction de changement de langue. Créez la même fiche en français puis en anglais. Les exercices maths deviennent des supports de comparaison linguistique. Apprendre les lettres dans deux alphabets simultanément renforce les apprentissages.`,
        quote: 'Le support en 11 langues est idéal pour mes élèves de FLE et les classes bilingues !',
      },
      {
        id: '5',
        icon: '💜',
        title: 'Éducateurs Spécialisés - Coloriage à Imprimer et Écriture Adaptée pour Besoins Particuliers',
        subtitle: 'Fiches personnalisables pour la différenciation et l\'adaptation pédagogique',
        description: `Les professionnels de l'éducation spécialisée trouvent des options de différenciation précieuses. Le coloriage à imprimer des images offre une activité complémentaire apaisante. L'écriture des réponses peut être adaptée selon les besoins moteurs de chaque élève.

Les exercices maths visuels conviennent particulièrement aux apprenants visuels. La légende offre un support constant pour les élèves ayant des difficultés de mémoire. Le coloriage à imprimer après l'exercice récompense l'effort fourni. L'écriture devient moins anxiogène grâce aux espaces clairement délimités.

La personnalisation complète permet d'adapter chaque fiche. Agrandissez les espaces de réponse pour l'écriture cursive adaptée. Réduisez le nombre d'exercices pour éviter la surcharge cognitive. Les fiches maternelle s'adaptent à tous les profils d'apprentissage.`,
        quote: 'Je peux adapter chaque fiche aux besoins spécifiques de mes élèves en ULIS.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Enseignants Entrepreneurs - Fiches à Imprimer Gratuit pour Vente et Tables de Multiplication Préparatoires',
        subtitle: 'Licence commerciale incluse pour vendre sur Teachers Pay Teachers, Etsy et Amazon KDP',
        description: `Les enseignants souhaitant vendre leurs créations disposent d'une licence commerciale complète. Les fiches à imprimer gratuit créées peuvent être commercialisées. Teachers Pay Teachers, Etsy, Amazon KDP : tous les canaux sont autorisés.

Créez des packs thématiques combinant addition et préparation aux tables de multiplication. Les parents recherchent des ressources progressives pour leurs enfants. Les tables de multiplication représentent un marché important. Vos fiches d'addition préparatoires répondent à ce besoin.

L'écriture de descriptions marketing met en valeur l'approche unique. Le décodage visuel différencie vos produits de la concurrence. Les exercices maths avec images attirent les acheteurs cherchant des alternatives ludiques. Votre activité complémentaire génère des revenus passifs durables.`,
        quote: 'Mon abonnement s\'est rentabilisé dès le premier mois de ventes sur TPT !',
      },
    ],
  },

  // FAQ Section - Selected FAQs from code-addition.md
  faq: {
    sectionTitle: 'FAQ - Fiche Gratuite pour Enfants et Fiche pour Maternelle. Fiche pour Enfants',
    sectionDescription: 'Retrouvez les réponses aux questions les plus fréquentes sur notre générateur. Des fiches maternelle au coloriage à imprimer, découvrez toutes les possibilités offertes par la plateforme.',
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
        question: 'Ce Générateur de Fiches Maternelle et Tables de Multiplication est-il Vraiment Gratuit ?',
        answer: `Le générateur d'addition avec images nécessite un abonnement Accès Complet. L'abonnement coûte 240€ par an ou 25€ par mois. Votre abonnement vous donne un accès illimité à la création de fiches sans frais supplémentaires par fiche.

L'abonnement Pack Essentiel à 144€ par an inclut 10 générateurs populaires. L'abonnement Accès Complet à 240€ par an inclut les 33 générateurs dont celui-ci. Les deux abonnements incluent la licence commerciale, le support des 11 langues et l'export en qualité 300 DPI.`,
      },
      {
        id: '2',
        question: 'Puis-je Imprimer les Fiches de Coloriage à Imprimer et Graphisme Maternelle à Domicile ?',
        answer: `Toutes les fiches s'impriment parfaitement sur une imprimante domestique standard. Le coloriage à imprimer conserve sa qualité sur papier ordinaire. Le graphisme maternelle reste net grâce à la résolution 300 DPI.

L'option niveaux de gris économise l'encre couleur. Les fiches de coloriage à imprimer en noir et blanc réduisent les coûts d'impression. Le graphisme maternelle reste parfaitement lisible en monochrome. Une imprimante jet d'encre ou laser convient parfaitement.`,
      },
      {
        id: '3',
        question: 'Faut-il des Compétences en Design pour Créer des Fiches d\'Écriture et Apprendre à Lire ?',
        answer: `Aucune compétence en design n'est requise. Le générateur crée automatiquement des fiches professionnelles. Les fiches d'écriture s'adaptent au niveau choisi. Les supports pour apprendre à lire les nombres se génèrent en quelques clics.

L'interface intuitive guide chaque étape de création. Les fiches d'écriture utilisent des polices pré-configurées adaptées aux enfants. Apprendre à lire devient accessible sans formation graphique préalable. Même les débutants en informatique créent des fiches de qualité professionnelle.`,
      },
      {
        id: '4',
        question: 'Puis-je Utiliser ces Fiches d\'Écriture Cursive et Alphabet en Classe avec mes Élèves ?',
        answer: `L'abonnement Accès Complet inclut une utilisation illimitée en classe. Les fiches d'écriture cursive s'impriment pour chaque élève sans restriction. L'alphabet illustré enrichit vos séances de lecture et mathématiques.

Distribuez autant de copies que nécessaire. L'écriture cursive pratiquée sur ces fiches renforce la motricité fine. L'alphabet associé aux images améliore la mémorisation. Aucune limite sur le nombre d'impressions ou d'élèves concernés.`,
      },
      {
        id: '5',
        question: 'Dans Quelles Langues Trouve-t-on l\'Alphabet et les Fiches pour Apprendre les Lettres ?',
        answer: `Le générateur supporte 11 langues complètes. L'alphabet s'affiche dans la langue de votre choix. Apprendre les lettres devient possible en français, anglais, allemand, espagnol et plus encore.

Les langues disponibles incluent : français, anglais, allemand, espagnol, portugais, italien, néerlandais, suédois, danois, norvégien et finnois. L'alphabet de chaque langue utilise les caractères appropriés. Apprendre les lettres dans plusieurs langues simultanément enrichit l'expérience éducative.`,
      },
      {
        id: '6',
        question: 'Puis-je Vendre mes Fiches de Coloriage et Tables de Multiplication Créées avec ce Générateur ?',
        answer: `L'abonnement Accès Complet inclut une licence commerciale complète. Vos fiches de coloriage se vendent sur toutes les plateformes. Les exercices préparant aux tables de multiplication génèrent des revenus complémentaires.

Teachers Pay Teachers, Etsy et Amazon KDP sont autorisés. Le coloriage créé vous appartient entièrement. Les fiches préparatoires aux tables de multiplication attirent de nombreux acheteurs. Aucune attribution ni redevance supplémentaire n'est requise.`,
      },
      {
        id: '7',
        question: 'Comment Personnaliser les Fiches de Graphisme Maternelle et Écriture pour mes Élèves ?',
        answer: `Le canevas d'édition permet une personnalisation complète. Le graphisme maternelle s'adapte aux besoins spécifiques de chaque classe. L'écriture des consignes se modifie en quelques clics.

Déplacez, redimensionnez et faites pivoter tous les éléments. Le graphisme maternelle conserve sa cohérence malgré les modifications. L'écriture utilise 7 polices différentes adaptées aux enfants. Ajoutez vos propres textes et images pour une personnalisation maximale.`,
      },
      {
        id: '8',
        question: 'Quels Âges Conviennent aux Fiches pour Apprendre à Lire les Nombres et Coloriage à Imprimer ?',
        answer: `Les fiches s'adaptent aux enfants de 4 à 8 ans principalement. Apprendre à lire les nombres convient dès la grande section. Le coloriage à imprimer plaît à tous les âges de la maternelle au CE1.

Pour les plus jeunes (4-5 ans), choisissez des nombres de 1 à 5. Apprendre à lire les nombres avec des images facilite la compréhension. Le coloriage à imprimer des images maintient l'engagement des enfants. Les élèves de CP et CE1 utilisent des plages de nombres plus élevées.`,
      },
      {
        id: '9',
        question: 'Puis-je Télécharger mes Propres Images pour les Fiches d\'Écriture et Graphisme Maternelle ?',
        answer: `L'import d'images personnelles enrichit vos créations. Les fiches d'écriture intègrent vos propres visuels. Le graphisme maternelle gagne en pertinence avec des images familières aux élèves.

Téléchargez des photos de classe, des dessins d'élèves ou des mascotes. L'écriture des noms d'images utilise vos fichiers personnalisés. Le graphisme maternelle devient unique à votre classe. Tous les formats courants (JPEG, PNG, GIF) sont acceptés.`,
      },
      {
        id: '10',
        question: 'Combien de Temps Faut-il pour Créer une Fiche de Tables de Multiplication Préparatoire ?',
        answer: `La création complète prend moins de 3 minutes. Les fiches préparant aux tables de multiplication se génèrent instantanément. La personnalisation ajoute quelques minutes supplémentaires selon vos besoins.

Sélectionnez vos images en 30 secondes. Configurez les paramètres en 30 secondes. Générez la fiche en 1 clic. Les fiches préparatoires aux tables de multiplication s'adaptent à votre planning chargé. Le corrigé automatique s'ajoute en quelques secondes supplémentaires.`,
      },
      {
        id: '11',
        question: 'Les Fiches pour Apprendre à Lire Incluent-elles un Corrigé avec Alphabet Illustré ?',
        answer: `Chaque fiche dispose d'un corrigé automatique séparé. Les supports pour apprendre à lire les nombres incluent les réponses calculées. L'alphabet illustré de la légende apparaît sur le corrigé également.

Le corrigé reprend exactement la même mise en page. Apprendre à lire devient plus efficace grâce à l'auto-correction possible. L'alphabet et les associations image-nombre restent identiques. Parfait pour le travail en autonomie ou la correction rapide.`,
      },
      {
        id: '12',
        question: 'Puis-je Créer des Fiches Combinant Écriture Cursive, Coloriage et Calcul sur un Même Thème ?',
        answer: `Les thèmes unifient toutes vos créations pédagogiques. L'écriture cursive, le coloriage et le calcul partagent les mêmes images thématiques. La cohérence visuelle renforce les apprentissages.

Choisissez un thème comme les animaux ou les véhicules. L'écriture cursive des consignes utilise ce vocabulaire thématique. Le coloriage des images complète l'activité mathématique. Créez des séquences pédagogiques cohérentes et engageantes pour vos élèves.`,
      },
    ],
  },

  // Pricing - Accès Complet tier for Code Addition
  pricing: {
    title: 'Accès Complet',
    price: '240€',
    priceInterval: '/an',
    priceSuffix: 'Facturé annuellement',
    benefits: [
      'Création illimitée de fiches d\'addition codée',
      'Accès aux 33 générateurs de la plateforme',
      'Licence commerciale incluse',
      '11 langues disponibles',
      '3000+ images thématiques',
      'Qualité 300 DPI professionnelle',
      'Clés de correction automatiques',
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

  // Related Apps - From code-addition.md Section 7
  relatedApps: {
    sectionTitle: 'Fiches Gratuites Combiner - Fiche pour Enfants et Imprimables Gratuits',
    sectionDescription: 'Notre plateforme propose 33 générateurs de fiches complémentaires. Combinez l\'addition avec images et d\'autres activités pour créer des packs pédagogiques complets. Du coloriage à imprimer aux tables de multiplication, chaque générateur enrichit votre offre éducative.',
    ctaTitle: 'Prêt à Créer des Fiches d\'Addition Professionnelles ?',
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
        description: 'Combinez l\'addition codée avec les exercices d\'addition traditionnels. Les élèves passent du visuel à l\'abstrait progressivement. La préparation aux tables de multiplication s\'enrichit de cette variété.',
      },
      {
        id: '2',
        slug: 'soustraction-fiches',
        name: 'Exercices de Soustraction',
        category: 'Mathématiques',
        icon: '➖',
        description: 'Les opérations inverses se renforcent mutuellement. Combinez addition et soustraction pour une compréhension complète. Les tables de multiplication s\'appuient sur cette maîtrise des opérations de base.',
      },
      {
        id: '3',
        slug: 'coloriage-fiches',
        name: 'Coloriage à Imprimer',
        category: 'Arts et Motricité',
        icon: '🎨',
        description: 'Le coloriage à imprimer transforme les exercices d\'addition en activités complètes. Les images de la légende deviennent des supports de coloriage. Le graphisme maternelle s\'intègre naturellement.',
      },
      {
        id: '4',
        slug: 'train-alphabet-fiches',
        name: 'Train Alphabet',
        category: 'Langage',
        icon: '🚂',
        description: 'Combinez calcul et alphabet pour des apprentissages intégrés. Les élèves pratiquent les lettres tout en calculant. Apprendre les lettres devient un objectif complémentaire naturel.',
      },
      {
        id: '5',
        slug: 'association-fiches',
        name: 'Association',
        category: 'Logique',
        icon: '🔗',
        description: 'Le décodage de la légende renforce les compétences d\'association. Les élèves relient images et valeurs avant de calculer. La logique mathématique se développe à travers ces connexions.',
      },
      {
        id: '6',
        slug: 'tracage-lignes-fiches',
        name: 'Traçage de Lignes',
        category: 'Motricité Fine',
        icon: '✏️',
        description: 'L\'écriture des réponses renforce la motricité fine. Combinez avec les fiches de traçage pour une progression complète. L\'écriture cursive s\'améliore à chaque exercice pratiqué.',
      },
    ],
  },
};

export default codeAdditionFrContent;
