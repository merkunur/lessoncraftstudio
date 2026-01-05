import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Find and Count Worksheets - French Content
 *
 * File: frontend/content/product-pages/fr/find-and-count-worksheets.ts
 * URL: /fr/apps/cherche-et-compte-fiches (French SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/French/find-and-count.md
 * App ID: find-and-count (I Spy counting worksheets)
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const findAndCountFrContent: ProductPageContent = {
  // SEO Metadata - French language-specific
  seo: {
    slug: 'cherche-et-compte-fiches',
    appId: 'find-and-count',
    title: 'Fiches Cherche et Compte à Imprimer Gratuit | Générateur de Fiches Maternelle et Exercices CP',
    description: 'Créez des fiches de cherche et compte personnalisées avec notre générateur professionnel. Parfait pour les enseignants de maternelle, CP et CE1. Téléchargez des PDF haute qualité en moins de 3 minutes.',
    keywords: 'fiches cherche et compte, fiches maternelle, fiches à imprimer gratuit, exercices CP, exercices CE1, graphisme maternelle, coloriage à imprimer, apprendre à compter, dénombrement, générateur fiches',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fr/apps/cherche-et-compte-fiches',
  },

  // Hero Section - FULL text from find-and-count.md paragraphs 1-4
  hero: {
    title: 'Fiches Cherche et Compte',
    subtitle: 'Générateur de Fiches Maternelle et Exercices CP',
    description: `Créez des fiches de cherche et compte personnalisées avec notre générateur professionnel. Votre abonnement Pack Essentiel vous donne accès à la création illimitée de fiches à imprimer gratuit sans frais supplémentaires par fiche. Téléchargez des PDF haute qualité en moins de 3 minutes. Parfait pour les enseignants de maternelle et les parents qui font l'école à la maison.

Les activités de cherche et compte captivent les jeunes enfants. Ce type d'exercice développe l'attention visuelle et les compétences de dénombrement. Notre générateur de fiches maternelle simplifie la création de ces supports pédagogiques. Vous choisissez les images, le générateur remplit la grille automatiquement.

Le dénombrement constitue une compétence fondamentale en mathématiques. Nos fiches à imprimer gratuit transforment cet apprentissage en jeu. Les enfants adorent chercher et compter des objets cachés dans une grille colorée. Chaque fiche devient une aventure visuelle qui renforce les exercices maths de façon ludique.

Combinez le cherche et compte avec des activités de graphisme maternelle. Nos fiches s'intègrent parfaitement dans une séquence pédagogique complète. Après avoir compté les objets, les élèves peuvent colorier les éléments trouvés. Cette approche multi-sensorielle renforce l'apprentissage. Le coloriage à imprimer développe également la motricité fine.`,
    previewImageSrc: '/samples/english/find and count/find and count portrait.jpeg',
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

  // Sample Gallery - REAL file paths from samples/english/find and count/
  samples: {
    sectionTitle: 'Exemples de Fiches Cherche et Compte',
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
        worksheetSrc: '/samples/english/find and count/find and count portrait.jpeg',
        answerKeySrc: '/samples/english/find and count/find and count portrait answer_key.jpeg',
        altText: 'Fiche cherche et compte format portrait pour maternelle avec corrigé',
        pdfDownloadUrl: '/samples/english/find and count/find and count portrait.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/english/find and count/find and count landscape.jpeg',
        answerKeySrc: '/samples/english/find and count/find and count landscape answer_key.jpeg',
        altText: 'Fiche cherche et compte format paysage pour exercices CP avec corrigé',
        pdfDownloadUrl: '/samples/english/find and count/find and count landscape.pdf',
      },
    ],
  },

  // Features Grid - FULL text from find-and-count.md feature sections
  features: {
    sectionTitle: 'Fonctionnalités du Générateur - Fiches Maternelle et Exercices CP Personnalisables',
    sectionDescription: 'Notre générateur de cherche et compte offre toutes les fonctionnalités nécessaires pour créer des fiches pédagogiques professionnelles. Chaque outil a été conçu pour simplifier votre travail. Découvrez comment créer des fiches maternelle exceptionnelles en quelques clics.',
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
        title: 'Créez des Fiches à Imprimer Gratuit en 3 Clics',
        description: `La simplicité guide notre approche. Sélectionnez un thème d'images parmi notre bibliothèque. Choisissez 1 à 4 objets à chercher. Cliquez sur générer. Votre fiche de cherche et compte apparaît instantanément. Les exercices maths deviennent un jeu d'enfant à préparer. Aucune compétence technique requise. Le générateur fait tout le travail pour vous.

Notre générateur crée des fiches avec une grille personnalisable. Chaque image représente un objet à chercher dans la grille. Les élèves comptent les occurrences de chaque symbole. Cette approche développe l'attention visuelle et le dénombrement. Les fiches maternelle deviennent des activités passionnantes qui captivent les jeunes apprenants.

Choisissez parmi des milliers d'images thématiques adaptées aux enfants. Définissez le nombre d'objets différents à chercher. Ajustez la taille de la grille selon le niveau des élèves. Chaque paramètre s'adapte pour correspondre exactement à vos besoins pédagogiques et vos objectifs d'apprentissage.`,
        highlighted: false,
      },
      {
        id: '2',
        icon: '✏️',
        title: 'Fiches Maternelle Entièrement Personnalisables',
        description: `Chaque élément de votre fiche reste modifiable. Déplacez les images avec votre souris. Redimensionnez-les selon vos besoins. Faites-les pivoter pour varier la présentation. Supprimez ce qui ne convient pas. Les fiches maternelle s'adaptent exactement à vos exigences. Ajoutez des zones de graphisme maternelle. Intégrez des espaces pour le coloriage. Votre créativité n'a aucune limite.

Ajoutez du texte personnalisé n'importe où sur vos fiches à imprimer. Choisissez parmi sept polices professionnelles adaptées aux enfants. Ajustez la taille de police selon vos besoins. Changez les couleurs du texte pour correspondre au thème de votre classe. Ajoutez des contours au texte pour une meilleure visibilité.

Les outils d'alignement professionnels arrangent les objets avec précision. Alignez à gauche, au centre ou à droite. Centrez les objets sur la page horizontalement ou verticalement. Verrouillez les objets en place une fois le positionnement parfait. Les boutons Annuler et Rétablir corrigent les erreurs instantanément.`,
        highlighted: false,
      },
      {
        id: '3',
        icon: '📤',
        title: 'Exercices CP avec Vos Propres Images',
        description: `Téléversez vos propres images pour personnaliser les exercices CP. Utilisez des photos de la mascotte de classe. Ajoutez des images liées à votre projet pédagogique. Combinez-les avec notre bibliothèque existante. Les fiches à imprimer deviennent uniques à votre classe. Formats acceptés : JPEG, PNG, GIF. Téléversement multiple en une seule fois.

Créez des exercices maths présentant les personnages préférés de vos élèves. Utilisez des images de sorties scolaires ou de projets de classe. Associez les activités de cherche et compte aux thèmes ou unités en cours. Connectez le dénombrement à des objets réels que les élèves reconnaissent.

Les images personnalisées fonctionnent parfaitement pour l'enseignement différencié. Créez des exercices plus faciles avec des objets familiers pour les élèves en difficulté. Concevez des problèmes stimulants avec du nouveau vocabulaire pour les apprenants avancés. Soutenez les élèves qui commencent à apprendre à lire avec des visuels pertinents.`,
        highlighted: false,
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Fiches Maternelle en 11 Langues',
        description: `Notre générateur fonctionne en 11 langues. Français, anglais, allemand, espagnol, italien, portugais. Néerlandais, suédois, danois, norvégien, finnois également. L'interface s'adapte à votre langue préférée. Les noms d'images changent automatiquement. Parfait pour apprendre les lettres dans plusieurs langues. L'alphabet devient accessible aux classes bilingues. Les fiches maternelle servent l'enseignement multilingue.

La langue de l'interface change indépendamment de la langue du contenu. Enseignez en français tout en créant des fiches en anglais pour les élèves. Changez de langue instantanément sans perdre votre travail. Tous les boutons et libellés se traduisent automatiquement.

Le support linguistique s'étend à tous les éléments textuels des fiches. Personnalisez n'importe quel texte pour correspondre aux objectifs d'apprentissage. Parfait pour les programmes bilingues et l'enseignement dans plusieurs langues.`,
        highlighted: false,
      },
      {
        id: '5',
        icon: '💰',
        title: 'Licence Commerciale Incluse',
        description: `Votre abonnement Pack Essentiel inclut la licence commerciale complète. Vendez vos fiches à imprimer gratuit sur Teachers Pay Teachers. Créez une boutique Etsy de ressources pédagogiques. Publiez sur Amazon KDP. Aucun frais supplémentaire pour les droits commerciaux. La qualité 300 DPI garantit des impressions professionnelles. Transformez votre créativité en revenus complémentaires.

De nombreux enseignants gagnent entre 500€ et 2000€ par mois en vendant des fiches imprimables. Créez des lots de fiches cherche et compte thématiques pour différentes saisons. Concevez des fiches à imprimer gratuit pour des fêtes spécifiques. Assemblez des exercices CP par niveau de compétence.

Exportez les fiches en résolution professionnelle 300 DPI pour l'impression commerciale. Téléchargez en PDF pour les ventes numériques ou en JPEG pour le print-on-demand. Créez des cahiers d'activités présentant vos exercices maths. Construisez un flux de revenus passifs tout en créant du matériel pédagogique.`,
        highlighted: true,
      },
      {
        id: '6',
        icon: '🎨',
        title: 'Bibliothèque de 3000+ Images',
        description: `Plus de 3 000 images adaptées aux enfants vous attendent. Organisation par thèmes : animaux, fruits, véhicules, école. Fonction de recherche pour trouver rapidement. Chaque image convient au coloriage à imprimer. Les exercices CE1 bénéficient de visuels variés. Arrière-plans et bordures inclus. Tout est compris dans votre abonnement sans frais cachés.

L'organisation thématique accélère la création de fiches cherche et compte. Sélectionnez le thème animaux pour les fiches sur le zoo. Choisissez les images de nourriture pour les leçons de nutrition. Utilisez les images saisonnières pour des fiches sur les fêtes. Changez de thème instantanément pour correspondre à n'importe quel sujet de programme.

Toutes les images de la bibliothèque sont incluses avec votre abonnement sans frais supplémentaires. Contrairement aux concurrents qui facturent par image, notre bibliothèque entière est disponible. Créez des exercices CP illimités en utilisant n'importe quelle image.`,
        highlighted: false,
      },
      {
        id: '7',
        icon: '🖨️',
        title: 'Qualité Professionnelle 300 DPI',
        description: `Exportez en haute résolution pour des impressions parfaites. Format PDF pour une qualité optimale. Format JPEG pour partage numérique. Option noir et blanc pour économiser l'encre. Les exercices maths s'impriment avec netteté. Combinez avec des exercices d'écriture cursive. Vos fiches rivalisent avec les éditions professionnelles. L'abonnement Pack Essentiel coûte seulement 144 € par an.

La qualité professionnelle compte pour les fiches maternelle et les exercices CE1. Les élèves voient des images claires et colorées qui engagent les apprenants visuels. Les parents apprécient les exercices maths de haute qualité envoyés à la maison.

Chaque fiche cherche et compte inclut un corrigé généré automatiquement. Téléchargez le corrigé séparément pour une notation rapide. Les corrigés correspondent exactement à la mise en page de la fiche élève. Gagnez du temps à vérifier le travail des élèves.`,
        highlighted: true,
      },
      {
        id: '8',
        icon: '📐',
        title: 'Grille Personnalisable',
        description: `Ajustez la grille selon le niveau de difficulté. De 5 à 10 rangées disponibles. De 5 à 10 colonnes possibles. Les petits apprécient les grilles simples. Les plus grands relèvent des défis complexes. Les fiches maternelle s'adaptent à chaque âge. Intégrez des activités de calcul numérique. Préparez les bases pour apprendre à lire avec des images associées aux mots.

Le générateur place automatiquement les images dans la grille. Les objets sélectionnés apparaissent plusieurs fois de façon aléatoire. D'autres images du thème complètent la grille. Les exercices CE1 prennent forme instantanément.

Régénérez si vous voulez des puzzles différents. Cliquez à nouveau sur Générer pour de nouvelles dispositions aléatoires. Les images changent à chaque génération. Créez des variations illimitées de fiches maternelle.`,
        highlighted: false,
      },
    ],
  },

  // How-To Guide - FULL text from find-and-count.md step sections
  howTo: {
    sectionTitle: 'Comment Créer des Fiches Maternelle Cherche et Compte en 5 Étapes Simples',
    sectionDescription: 'Créer des fiches de cherche et compte ne prend que quelques minutes. Notre générateur simplifie chaque étape du processus. Suivez ce guide pour produire vos premières fiches maternelle professionnelles. Aucune expérience technique nécessaire.',
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
        title: 'Choisir Votre Thème',
        description: `Commencez par sélectionner un thème dans la bibliothèque. Animaux de la ferme pour les fiches à imprimer gratuit sur la nature. Fruits et légumes pour les exercices de vocabulaire. Véhicules pour captiver les garçons. Fournitures scolaires pour la rentrée. Chaque thème contient des dizaines d'images adaptées aux enfants.

Dans le thème choisi, sélectionnez 1 à 4 images différentes. Ces images deviendront les objets à chercher et compter. Pour les exercices maths, choisissez des quantités variées. Le calcul devient concret avec des objets familiers. Les fiches maternelle gagnent en pertinence pédagogique. Cliquez sur chaque image pour la sélectionner.

Téléversez vos propres images personnalisées pour des fiches uniques. Cliquez sur le bouton de téléversement et sélectionnez des fichiers images. Choisissez plusieurs fichiers pour téléverser plusieurs images simultanément.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Configurer la Grille',
        description: `Ajustez les dimensions de la grille selon l'âge des élèves. Grille 5x5 pour les plus jeunes en maternelle. Grille 7x7 pour les exercices CP intermédiaires. Grille 10x10 pour les défis avancés. Plus la grille est grande, plus le défi augmente. Parfait pour apprendre à lire les nombres en contexte visuel.

Choisissez le format de page adapté à votre imprimante. A4 portrait pour les fiches standard françaises. Letter pour les formats américains. Format carré pour les activités spéciales. Sélectionnez une couleur de fond ou un arrière-plan thématique. Ajoutez une bordure décorative pour le coloriage à imprimer.

Définissez le nombre d'objets à chercher selon les capacités des élèves. Moins d'objets conviennent mieux aux élèves de maternelle qui découvrent le dénombrement. Plus d'objets challengent les apprenants de CP et CE1.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Générer la Fiche',
        description: `Cliquez sur le bouton "Créer" pour générer votre fiche. Le générateur place automatiquement les images dans la grille. Les objets sélectionnés apparaissent plusieurs fois de façon aléatoire. D'autres images du thème complètent la grille. Les exercices CE1 prennent forme instantanément. Utilisez cette méthode pour introduire les tables de multiplication visuellement.

Les fiches s'arrangent automatiquement avec un espacement optimal. Le générateur calcule la mise en page selon la taille de page. L'aperçu montre exactement ce que les élèves verront. Pas d'attente ni de délais de traitement.

Personnalisez les questions de comptage sous la grille. Chaque objet sélectionné génère une question automatique. "Combien de pommes ?" avec l'image correspondante. Les enfants cherchent et comptent dans la grille.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Personnaliser sur le Canevas',
        description: `Modifiez chaque élément directement sur le canevas. Ajoutez un titre personnalisé avec le nom de l'élève. Insérez des consignes en écriture cursive pour les plus grands. Déplacez les images pour équilibrer la composition. Redimensionnez les éléments selon vos préférences. Les fiches à imprimer deviennent uniques à votre classe.

Utilisez l'outil texte pour enrichir vos fiches. Écrivez les nombres en lettres sous les questions. Ajoutez des phrases simples pour apprendre à lire. Variez les polices parmi les 7 options disponibles. Choisissez des couleurs vives pour les exercices maths ludiques. Le contour de texte améliore la lisibilité sur les fonds colorés.

Les boutons Annuler et Rétablir corrigent les erreurs instantanément. Expérimentez sans crainte avec vos exercices CP. Testez différentes dispositions de graphisme maternelle.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Télécharger et Imprimer',
        description: `Générez d'abord le corrigé en cliquant sur "Corrigé". Téléchargez ensuite la fiche au format PDF ou JPEG. Choisissez PDF pour la meilleure qualité d'impression. Activez l'option noir et blanc pour économiser l'encre. Les zones de coloriage ressortent parfaitement. Le graphisme maternelle s'imprime avec précision professionnelle.

Le corrigé affiche les mêmes images avec les nombres corrects. Chaque objet à chercher montre sa quantité exacte. Les enseignants corrigent rapidement les fiches à imprimer gratuit. Les parents vérifient facilement le travail à la maison. Les exercices CP incluent toujours leur solution.

Téléchargez fiche et corrigé en un seul clic. La qualité 300 DPI garantit des impressions nettes. Parfait pour l'impression en classe et les ventes commerciales.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from find-and-count.md use case sections
  useCases: {
    sectionTitle: 'À Qui S\'Adressent les Fiches Cherche et Compte',
    sectionDescription: 'Nos fiches de cherche et compte répondent aux besoins de nombreux professionnels de l\'éducation. Découvrez comment chaque profil utilise cet outil pour créer des supports pédagogiques adaptés. Des enseignants de maternelle aux entrepreneurs du numérique éducatif.',
    badgeText: 'Pour Qui',
    readMoreLabel: 'Lire la suite',
    showLessLabel: 'Voir moins',
    items: [
      {
        id: '1',
        icon: '👶',
        title: 'Enseignants de Maternelle',
        subtitle: 'Fiches Maternelle pour Graphisme Maternelle et Coloriage',
        description: `Les enseignants de petite, moyenne et grande section adorent nos fiches maternelle. Le cherche et compte développe l'attention visuelle des tout-petits. Combinez avec des activités de graphisme maternelle pour une séance complète. Ajoutez des zones de coloriage pour la motricité fine. Les enfants de 3 à 6 ans progressent tout en s'amusant. Créez des fiches thématiques pour chaque période de l'année.

Les fiches cherche et compte construisent les fondations essentielles pour les opérations futures. Les jeunes élèves apprennent à identifier des patterns et des relations entre objets. Ils voient les connexions entre quantités visuelles et valeurs numériques. Cette approche prépare les compétences mathématiques précoces.

Combinez les fiches avec des activités d'écriture pour un apprentissage intégré. Les élèves pratiquent la formation des chiffres après avoir compté. Créez des paquets de travail du matin mélangeant dénombrement et motricité fine.`,
        quote: 'Mes élèves adorent chercher et compter les images !',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Professeurs des Écoles CP et CE1',
        subtitle: 'Exercices Maths et Tables de Multiplication',
        description: `Les enseignants de cycle 2 utilisent nos fiches pour les exercices maths quotidiens. Le dénombrement renforce la compréhension des nombres. Introduisez les tables de multiplication avec des groupes visuels. Les exercices CP gagnent en variété pédagogique. Les exercices CE1 deviennent plus stimulants. Chaque fiche s'adapte au niveau de la classe. La différenciation devient simple et rapide.

Les enseignants de CE1 utilisent les fiches pour renforcer et étendre les compétences de calcul. Les élèves travaillent avec des grilles plus complexes utilisant plus d'objets différents. Le comptage devient plus stimulant avec des quantités variées. Les connexions entre opérations se développent naturellement.

Créez des fiches où les groupes d'objets illustrent les concepts mathématiques. Les exercices CE1 connectent le dénombrement aux opérations de manière significative.`,
        quote: 'Le cherche et compte prépare parfaitement les compétences mathématiques.',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Parents en Instruction à Domicile',
        subtitle: 'Fiches à Imprimer Gratuit pour Apprendre à Lire',
        description: `Les familles pratiquant l'école à la maison trouvent ici des ressources précieuses. Les fiches à imprimer gratuit complètent le programme officiel. Combinez le cherche et compte avec des activités pour apprendre à lire. Les enfants associent images et mots naturellement. Le travail autonome devient possible dès 4 ans. Les parents économisent des heures de préparation chaque semaine.

Les parents en instruction à domicile apprécient la création rapide de fiches personnalisées. Générez des exercices maths adaptés exactement au niveau de votre enfant. Créez des fiches avec des images correspondant aux intérêts de l'enfant. Les dinosaures pour l'enfant passionné de préhistoire. Les véhicules pour celui qui adore les transports.

Combinez les fiches de dénombrement avec des activités d'écriture pour un apprentissage intégré. Les élèves écrivent les nombres après avoir compté les objets.`,
        quote: 'Je peux adapter les fiches au niveau exact de mon enfant.',
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Enseignants de Langues',
        subtitle: 'Alphabet et Apprendre les Lettres en 11 Langues',
        description: `Les professeurs de langues vivantes exploitent notre support multilingue. Créez des fiches en anglais, allemand ou espagnol. Les élèves découvrent l'alphabet dans une nouvelle langue. Parfait pour apprendre les lettres étrangères par l'image. Le vocabulaire s'acquiert de façon ludique. Les fiches bilingues facilitent la transition linguistique. L'immersion commence avec des activités simples et engageantes.

Les enseignants de FLE utilisent les fiches cherche et compte pour l'acquisition du vocabulaire numérique. Les élèves apprennent les mots numériques dans la langue cible tout en comptant. Un, deux, trois deviennent one, two, three ou eins, zwei, drei.

Les programmes bilingues ont besoin de matériel identique dans deux langues quotidiennement. La version française enseigne le comptage en français. La version anglaise utilise les mêmes images avec des mots anglais.`,
        quote: 'Les fiches deviennent un outil d\'apprentissage linguistique.',
      },
      {
        id: '5',
        icon: '💜',
        title: 'Éducateurs Spécialisés',
        subtitle: 'Écriture Cursive et Coloriage à Imprimer Adaptés',
        description: `Les professionnels de l'éducation adaptée apprécient la personnalisation totale. Ajustez la taille des images pour une meilleure visibilité. Simplifiez les grilles pour réduire la surcharge cognitive. Intégrez des exercices d'écriture cursive progressifs. Le coloriage à imprimer apaise et concentre. Les AESH trouvent des supports différenciés. Chaque élève reçoit une fiche adaptée à ses capacités.

Les apprenants visuels réussissent avec les fiches cherche et compte basées sur des images. Les élèves analysent des grilles concrètes au lieu de problèmes abstraits. L'approche visuelle réduit l'anxiété mathématique. Les élèves avec difficultés bénéficient des représentations visuelles.

Créez des séries de pratique répétitive pour le développement de la maîtrise. Générez plusieurs fiches avec les mêmes niveaux de difficulté. La répétition avec nouveauté visuelle maintient l'engagement.`,
        quote: 'La personnalisation répond à chaque besoin individuel.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Entrepreneurs Éducatifs',
        subtitle: 'Fiches à Imprimer pour Vendre sur Teachers Pay Teachers',
        description: `Les créateurs de ressources pédagogiques développent leur activité. La licence commerciale incluse permet la vente. Créez des packs thématiques pour Teachers Pay Teachers. Proposez des fiches sur Etsy et Amazon KDP. Les fiches à imprimer génèrent des revenus passifs. Aucun droit supplémentaire à payer. Votre abonnement Pack Essentiel à 144 € par an couvre tout.

Les vendeurs Teachers Pay Teachers gagnent entre 500€ et 2000€ par mois avec du matériel de qualité. Les fiches cherche et compte se vendent régulièrement car elles offrent une approche unique.

Développez des lots thématiques pour les ventes saisonnières. Les packs de rentrée en août et septembre. Les fiches d'Halloween et d'automne en octobre. Les ensembles de fêtes de fin d'année en décembre. Chaque saison apporte de nouvelles opportunités de vente.`,
        quote: 'Mon abonnement s\'est rentabilisé dès le premier mois !',
      },
    ],
  },

  // FAQ Section - Selected FAQs from find-and-count.md
  faq: {
    sectionTitle: 'Questions Fréquentes sur les Fiches Cherche et Compte',
    sectionDescription: 'Questions fréquentes sur notre générateur de fiches cherche et compte et nos fiches maternelle.',
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
        question: 'Ce Générateur de Fiches à Imprimer est-il Vraiment Gratuit ?',
        answer: 'Le générateur de fiches cherche et compte nécessite un abonnement Pack Essentiel coûtant 144 € par an ou 15 € par mois. Votre abonnement vous donne accès à la création illimitée de fiches à imprimer sans frais supplémentaires par fiche. Générez autant de fiches maternelle que nécessaire sans charges additionnelles. Le Pack Essentiel inclut 10 générateurs populaires. L\'abonnement Accès Complet coûte 240 € par an et inclut les 33 types de générateurs. Les deux abonnements incluent la licence commerciale, le support de 11 langues et l\'export 300 DPI professionnel.',
      },
      {
        id: '2',
        question: 'Puis-je Imprimer les Fiches de Graphisme Maternelle à la Maison ?',
        answer: 'Absolument. Toutes les fiches s\'impriment parfaitement sur une imprimante domestique standard. Le format PDF garantit une qualité optimale. Les fiches de graphisme maternelle conservent leur netteté. L\'option noir et blanc économise l\'encre couleur. Utilisez du papier standard 80g ou du papier plus épais pour les activités de découpage. Aucun équipement professionnel requis.',
      },
      {
        id: '3',
        question: 'Faut-il des Compétences en Design pour Créer des Fiches ?',
        answer: 'Aucune compétence technique ou artistique nécessaire. Le générateur fait tout le travail complexe. Vous sélectionnez simplement les images et paramètres. Les fiches cherche et compte se créent en quelques clics. L\'interface intuitive guide chaque étape. Même les débutants produisent des fiches professionnelles dès la première utilisation. Le résultat impressionne toujours.',
      },
      {
        id: '4',
        question: 'Puis-je Utiliser les Fiches pour Apprendre à Lire en Classe ?',
        answer: 'L\'abonnement Pack Essentiel inclut une utilisation illimitée en classe. Imprimez autant de copies que d\'élèves dans votre classe. Les fiches pour apprendre à lire s\'intègrent dans n\'importe quelle séquence pédagogique. Distribuez-les en ateliers autonomes. Utilisez-les en activité dirigée avec un petit groupe. Aucune restriction sur le nombre d\'impressions pour usage éducatif.',
      },
      {
        id: '5',
        question: 'En Quelles Langues Sont Disponibles les Fiches ?',
        answer: 'Notre générateur fonctionne en 11 langues complètes. Français, anglais, allemand, espagnol, italien, portugais brésilien. Néerlandais, suédois, danois, norvégien et finnois également. L\'interface utilisateur s\'adapte à votre langue. Les noms d\'images dans la bibliothèque changent automatiquement. Les fiches d\'alphabet correspondent à chaque langue. Parfait pour apprendre les lettres dans plusieurs langues simultanément.',
      },
      {
        id: '6',
        question: 'Puis-je Vendre les Fiches que je Crée ?',
        answer: 'Oui. L\'abonnement Pack Essentiel inclut la licence commerciale complète sans frais supplémentaires. Vendez vos fiches sur Teachers Pay Teachers. Créez une boutique Etsy de ressources pédagogiques. Publiez sur Amazon KDP. La qualité 300 DPI garantit des produits professionnels. Aucune attribution requise. Vos créations vous appartiennent entièrement.',
      },
      {
        id: '7',
        question: 'Comment Personnaliser les Fiches de Coloriage pour Mes Élèves ?',
        answer: 'La personnalisation s\'effectue à plusieurs niveaux. Choisissez d\'abord un thème d\'images adapté à votre classe. Sélectionnez les objets spécifiques à chercher et compter. Ajustez la taille de la grille selon le niveau. Ajoutez des zones de coloriage autour de la grille principale. Insérez le prénom de chaque élève dans le titre. Téléversez des images personnalisées de votre classe.',
      },
      {
        id: '8',
        question: 'Quels Âges Conviennent aux Fiches Maternelle Cherche et Compte ?',
        answer: 'Les fiches maternelle cherche et compte conviennent aux enfants de 3 à 8 ans principalement. Les grilles simples 5x5 s\'adaptent aux petits de maternelle. Les grilles moyennes 7x7 correspondent au CP et CE1. Les grilles complexes 10x10 défient les plus grands. Ajustez le nombre d\'objets à chercher selon les capacités. La difficulté s\'adapte à chaque niveau de développement.',
      },
      {
        id: '9',
        question: 'Puis-je Téléverser Mes Propres Images pour les Exercices Maths ?',
        answer: 'Le téléversement d\'images personnalisées est entièrement supporté. Ajoutez des photos de la mascotte de classe. Utilisez des images liées à votre projet d\'école. Combinez vos images avec la bibliothèque existante. Formats acceptés : JPEG, PNG, GIF. Téléversement multiple en une seule opération. Vos exercices maths deviennent uniques et personnalisés.',
      },
      {
        id: '10',
        question: 'Combien de Temps Faut-il pour Créer une Fiche ?',
        answer: 'Une fiche cherche et compte se crée en 3 minutes maximum. Sélection du thème : 30 secondes. Choix des images à chercher : 30 secondes. Génération automatique : instantanée. Personnalisation optionnelle : 1 à 2 minutes. Téléchargement du PDF : quelques secondes. Comparez avec les 30 à 60 minutes de création manuelle traditionnelle.',
      },
      {
        id: '11',
        question: 'Les Fiches Incluent-elles un Corrigé ?',
        answer: 'Chaque fiche générée dispose de son corrigé automatique. Le corrigé affiche exactement les mêmes images que la fiche élève. Chaque objet à chercher montre sa quantité correcte bien visible. Les enseignants corrigent rapidement sans recompter manuellement. Téléchargez fiche et corrigé séparément au format de votre choix.',
      },
    ],
  },

  // Pricing - Pack Essentiel for Find and Count
  pricing: {
    title: 'Pack Essentiel',
    price: '144€',
    priceInterval: '/an',
    priceSuffix: 'Facturation annuelle',
    benefits: [
      'Création de fiches illimitée',
      'Licence commerciale incluse',
      '11 langues supportées',
      '3000+ images thématiques',
      'Qualité d\'impression 300 DPI',
      'Corrigés inclus',
    ],
    ctaText: 'Commencer Maintenant',
    guaranteeText: 'Garantie satisfait ou remboursé 30 jours',
  },

  // Related Apps
  relatedApps: {
    sectionTitle: 'Combinez avec D\'Autres Générateurs de Fiches',
    sectionDescription: 'Votre abonnement Pack Essentiel inclut 10 générateurs complémentaires. Combinez le cherche et compte avec d\'autres outils pour créer des séquences pédagogiques complètes.',
    ctaTitle: 'Prêt à Créer des Fiches Fantastiques ?',
    ctaDescription: 'Rejoignez des milliers d\'enseignants qui créent des fiches professionnelles. Génération illimitée, licence commerciale incluse.',
    primaryCtaText: 'Commencer l\'Essai Gratuit',
    secondaryCtaText: 'Voir les 33 Applications',
    badgeText: 'Fonctionne Parfaitement Avec',
    exploreText: 'Explorer toutes les applications',
    trustBadges: {
      guarantee: 'Garantie satisfait ou remboursé 30 jours',
      securePayment: 'Paiement sécurisé',
      cancelAnytime: 'Résiliez à tout moment',
    },
    items: [
      {
        id: '1',
        slug: 'word-search',
        name: 'Mots Cachés',
        category: 'Langage',
        icon: '🔍',
        description: 'Associez le cherche et compte avec le générateur de mots mêlés pour une séquence lecture complète. Les enfants cherchent d\'abord les images dans la grille puis retrouvent les noms correspondants.',
      },
      {
        id: '2',
        slug: 'coloring',
        name: 'Coloriage',
        category: 'Créativité',
        icon: '🎨',
        description: 'Le générateur de pages de coloriage complète parfaitement le cherche et compte. Les enfants colorient les objets qu\'ils ont comptés. La séquence devient immersive et mémorable.',
      },
      {
        id: '3',
        slug: 'addition',
        name: 'Addition',
        category: 'Mathématiques',
        icon: '➕',
        description: 'Combinez le dénombrement visuel avec des exercices de calcul écrits. Les enfants comptent les objets dans la grille puis reportent les quantités sur une fiche de calcul.',
      },
      {
        id: '4',
        slug: 'alphabet-train',
        name: 'Train Alphabet',
        category: 'Langage',
        icon: '🚂',
        description: 'Le générateur Alphabet Train enseigne l\'ordre alphabétique de façon ludique. Les enfants identifient les objets commençant par chaque lettre après le cherche et compte.',
      },
      {
        id: '5',
        slug: 'math-puzzle',
        name: 'Puzzle Maths',
        category: 'Mathématiques',
        icon: '🧩',
        description: 'Le générateur de puzzles mathématiques propose des défis numériques engageants. Les groupes d\'objets illustrent concrètement les tables de multiplication.',
      },
      {
        id: '6',
        slug: 'drawing-lines',
        name: 'Tracé de Lignes',
        category: 'Graphisme',
        icon: '✏️',
        description: 'Le générateur de tracé de lignes développe la motricité fine. Combinez avec le cherche et compte pour une séance équilibrée entre concentration visuelle et geste graphique.',
      },
    ],
  },
};

export default findAndCountFrContent;
