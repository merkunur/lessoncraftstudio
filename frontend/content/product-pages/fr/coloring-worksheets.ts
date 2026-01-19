import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Coloring Worksheets - French Content
 *
 * File: frontend/content/product-pages/fr/coloring-worksheets.ts
 * URL: /fr/apps/coloriage-fiches (French SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/French/coloring.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const coloringFrContent: ProductPageContent = {
  // SEO Metadata - French language-specific
  seo: {
    slug: 'coloriage-fiches',
    appId: 'coloring',
    title: 'Coloriage à Imprimer Gratuit | Générateur de Fiches Maternelle et CP',
    description: 'Créez des coloriages personnalisés avec 3000+ images. Générateur de fiches maternelle gratuit en PDF 300 DPI. Parfait pour enseignants et parents.',
    keywords: 'coloriage à imprimer, fiches maternelle, graphisme maternelle, fiches à imprimer gratuit, exercices CP, exercices CE1, coloriage enfant, générateur coloriage, coloriage maternelle, pages de coloriage',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fr/apps/coloriage-fiches',
    images: [
      {
        url: 'https://www.lessoncraftstudio.com/samples/french/coloring/sample-1.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Coloriage à imprimer gratuit - fiche maternelle portrait avec scène thématique pour enfants'
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/french/coloring/sample-2.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Fiches à imprimer gratuit - coloriage éducatif pour exercices CP et graphisme maternelle'
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/french/coloring/sample-3.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Coloriage enfant personnalisé - fiche maternelle avec images adaptées aux petits'
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/french/coloring/sample-4.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Générateur coloriage - fiches maternelle thématiques pour apprendre les lettres'
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/french/coloring/sample-5.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Pages de coloriage imprimables - exercices CE1 et graphisme maternelle en PDF 300 DPI'
      },
    ],
  },

  // Hero Section - FULL text from coloring.md paragraphs 1-3
  hero: {
    title: 'Coloriage à Imprimer Gratuit',
    subtitle: 'Créateur de Fiches Maternelle et Exercices CP',
    description: `Créez des pages de coloriage personnalisées en quelques clics. Avec votre abonnement Pack Essentiel, vous accédez à un générateur professionnel de coloriage à imprimer. Transformez vos idées en fiches maternelle prêtes à l'emploi. Plus de 3000 images adaptées aux enfants vous attendent.

Les enseignants de maternelle et CP adorent cet outil. Fini les heures passées à chercher des coloriages adaptés. Votre abonnement vous donne accès illimité à la création de fiches à imprimer gratuit. Aucun frais supplémentaire par fiche créée.

Le créateur de coloriage fonctionne en 11 langues. Parfait pour les classes bilingues et l'enseignement du français langue étrangère. Téléchargez vos créations en PDF haute qualité 300 DPI. Idéal pour l'impression professionnelle et la vente sur Teachers Pay Teachers.`,
    previewImageSrc: '/samples/french/coloring/sample-1.jpeg',
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

  // Sample Gallery - REAL file paths from samples/english/coloring/
  samples: {
    sectionTitle: 'Exemples de Coloriages',
    sectionDescription: 'Découvrez des exemples de coloriages créés avec notre générateur',
    downloadLabel: 'Télécharger Exemple',
    worksheetLabel: 'Coloriage',
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
        worksheetSrc: '/samples/french/coloring/sample-1.jpeg',
        answerKeySrc: '',
        pdfDownloadUrl: '/samples/french/coloring/sample-1.pdf',
        altText: 'Coloriage à imprimer gratuit - fiche maternelle portrait pour enfants de CP',
      },
      {
        id: '2',
        worksheetSrc: '/samples/french/coloring/sample-2.jpeg',
        answerKeySrc: '',
        pdfDownloadUrl: '/samples/french/coloring/sample-2.pdf',
        altText: 'Fiches à imprimer gratuit - coloriage enfant avec graphisme maternelle',
      },
      {
        id: '3',
        worksheetSrc: '/samples/french/coloring/sample-3.jpeg',
        answerKeySrc: '',
        pdfDownloadUrl: '/samples/french/coloring/sample-3.pdf',
        altText: 'Coloriage maternelle personnalisé - fiche gratuite pour exercices CP et CE1',
      },
      {
        id: '4',
        worksheetSrc: '/samples/french/coloring/sample-4.jpeg',
        answerKeySrc: '',
        pdfDownloadUrl: '/samples/french/coloring/sample-4.pdf',
        altText: 'Générateur coloriage à imprimer - fiches maternelle thématiques PDF 300 DPI',
      },
      {
        id: '5',
        worksheetSrc: '/samples/french/coloring/sample-5.jpeg',
        answerKeySrc: '',
        pdfDownloadUrl: '/samples/french/coloring/sample-5.pdf',
        altText: 'Pages de coloriage imprimables - exercices graphisme maternelle pour enfants',
      },
    ],
  },

  // Features Grid - FULL text from coloring.md feature sections
  features: {
    sectionTitle: 'Fonctionnalités du Générateur de Coloriage - Fiches Maternelle Professionnelles',
    sectionDescription: 'Notre créateur de coloriage offre des fonctionnalités professionnelles. Chaque outil a été pensé pour les enseignants et parents. Découvrez comment créer des fiches à imprimer gratuit en quelques minutes.',
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
        title: 'Création Facile de Coloriage à Imprimer et Fiches Maternelle en 3 Clics',
        description: `La simplicité est au cœur de notre outil. Sélectionnez un thème parmi des dizaines de catégories. Choisissez vos images favorites dans la bibliothèque. Cliquez pour les ajouter à votre page. Votre coloriage est prêt en moins de trois minutes.

Aucune formation nécessaire pour créer des fiches maternelle. L'interface guide chaque étape du processus. Les boutons sont clairement identifiés en français. Les enseignants débutants réussissent dès leur première création.`,
        highlighted: false,
      },
      {
        id: '2',
        icon: '✏️',
        title: 'Fiches à Imprimer Gratuit avec Personnalisation Complète - Éditez Chaque Élément',
        description: `Chaque image ajoutée reste entièrement modifiable. Déplacez les éléments par glisser-déposer. Redimensionnez en tirant les coins. Faites pivoter avec la poignée de rotation. Supprimez ce qui ne vous convient pas.

La barre d'outils contextuelle apparaît lors de la sélection. Ajustez l'opacité des images. Retournez horizontalement ou verticalement. Contrôlez l'ordre des calques facilement. Verrouillez les éléments pour éviter les modifications accidentelles.

Les exercices CP et CE1 nécessitent souvent des ajustements précis. Notre éditeur permet un alignement pixel par pixel. Centrez vos images automatiquement sur la page. Alignez plusieurs éléments entre eux en un clic.`,
        highlighted: false,
      },
      {
        id: '3',
        icon: '📤',
        title: 'Coloriage à Imprimer pour Apprendre à Lire - Ajoutez vos Propres Images',
        description: `Téléversez vos photos et illustrations personnelles. Le système accepte les formats JPEG, PNG et GIF. Importez plusieurs fichiers simultanément. Vos images apparaissent instantanément dans la galerie.

Les enseignants utilisent cette fonction pour personnaliser leurs fiches maternelle. Ajoutez des photos de la classe. Intégrez des images liées à vos projets pédagogiques. Créez des coloriages avec les prénoms des élèves.

Cette personnalisation renforce l'engagement des enfants. Un coloriage avec leur photo les motive davantage. Les fiches à imprimer gratuit deviennent uniques à votre classe. Parfait pour les projets autour de l'alphabet et apprendre les lettres.`,
        highlighted: false,
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Exercices CP et Coloriage en 11 Langues - Fiches Maternelle Multilingues',
        description: `Notre générateur fonctionne dans 11 langues européennes. Français, anglais, allemand, espagnol et italien sont disponibles. Ajoutez le portugais, néerlandais, danois, suédois et norvégien. Le finnois complète notre offre linguistique.

La bibliothèque d'images s'adapte à la langue choisie. Les noms des images apparaissent traduits. Idéal pour les classes bilingues et l'enseignement multilingue. Les exercices CP en langues étrangères deviennent accessibles.

Les enseignants de FLE apprécient particulièrement cette fonction. Créez des coloriages pour apprendre à lire en français. Les images nommées renforcent l'acquisition du vocabulaire. Une ressource précieuse pour l'apprentissage des langues.`,
        highlighted: false,
      },
      {
        id: '5',
        icon: '💰',
        title: 'Licence Commerciale Incluse - Vendez vos Fiches à Imprimer et Coloriages',
        description: `Votre abonnement Pack Essentiel inclut la licence commerciale. Vendez vos créations sur Teachers Pay Teachers. Ouvrez une boutique sur Etsy sans frais supplémentaires. Publiez sur Amazon KDP pour les livres d'activités.

L'export 300 DPI garantit une qualité professionnelle. Vos fiches maternelle rivalisent avec les publications commerciales. Les acheteurs apprécient la netteté des impressions. Construisez une source de revenus passive avec vos coloriages.

Aucune attribution requise pour vos ventes. La licence couvre tous les usages commerciaux. Créez des cahiers d'exercices CP complets. Vendez des packs thématiques de graphisme maternelle. Les possibilités sont illimitées.`,
        highlighted: true,
      },
      {
        id: '6',
        icon: '🎨',
        title: 'Bibliothèque de 3000+ Images pour Coloriage à Imprimer et Exercices Maths',
        description: `Plus de 3000 images adaptées aux enfants vous attendent. Chaque illustration est soigneusement sélectionnée. Les thèmes couvrent tous les centres d'intérêt des enfants. Animaux, véhicules, nature, nourriture et professions.

La recherche par mot-clé accélère vos créations. Tapez "chat" et trouvez toutes les images de félins. Les thèmes organisent logiquement le contenu. Parfait pour créer des fiches maternelle thématiques.

Combinez les coloriages avec des exercices maths visuels. Les images de fruits servent à compter. Les véhicules illustrent les additions simples. Les fiches à imprimer gratuit deviennent des outils d'apprentissage polyvalents.`,
        highlighted: false,
      },
      {
        id: '7',
        icon: '🖨️',
        title: 'Qualité Professionnelle 300 DPI - Fiches Maternelle Impeccables',
        description: `L'export haute résolution garantit des impressions parfaites. Chaque détail reste net même agrandi. La qualité 300 DPI correspond aux standards professionnels. Vos coloriages impressionnent parents et collègues.

Choisissez entre les formats JPEG et PDF. Le PDF conserve la qualité vectorielle des textes. Le JPEG convient aux partages numériques. L'option niveaux de gris économise l'encre couleur.

Les lignes fines pour l'écriture cursive restent parfaitement visibles. Le graphisme maternelle exige cette précision. Les exercices CP avec tracés fins s'impriment sans bavure. Une qualité indispensable pour les supports pédagogiques.`,
        highlighted: true,
      },
      {
        id: '8',
        icon: '📝',
        title: 'Outils de Classe Intégrés - Graphisme Maternelle et Alphabet dans vos Coloriages',
        description: `Le bouton "Ajouter Prénom" insère un champ personnalisable. Les élèves écrivent leur nom sur chaque fiche. Parfait pour identifier les travaux et pratiquer l'écriture. Un gain de temps considérable pour les enseignants.

Les lignes d'écriture s'ajoutent en un clic. Trois lignes avec guide pointillé central apparaissent. Idéal pour combiner coloriage et exercices d'écriture. Les fiches maternelle deviennent des supports complets.

Ces outils facilitent l'apprentissage de l'alphabet. Les enfants colorient puis écrivent les lettres correspondantes. Apprendre les lettres devient ludique avec les coloriages. Une approche multisensorielle de l'apprentissage.`,
        highlighted: false,
      },
    ],
  },

  // How-To Guide - FULL text from coloring.md step sections
  howTo: {
    sectionTitle: 'Comment Créer des Fiches Maternelle et Coloriage à Imprimer en 5 Étapes Simples',
    sectionDescription: 'Créez vos premières fiches à imprimer gratuit en moins de trois minutes. Notre guide détaillé vous accompagne étape par étape. Aucune expérience préalable nécessaire. Suivez ces cinq étapes pour des coloriages professionnels.',
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
        title: 'Choisir le Contenu de vos Fiches Maternelle - Thèmes et Coloriage à Imprimer',
        description: `Commencez par sélectionner votre thème dans le menu déroulant. Plus de 30 catégories thématiques vous attendent. Animaux de la ferme, véhicules, fruits et légumes sont populaires. Les saisons et fêtes complètent l'offre.

Le thème "Tous les thèmes" affiche l'ensemble de la bibliothèque. Utilisez la barre de recherche pour trouver rapidement. Tapez un mot-clé comme "chien" ou "voiture". Les résultats s'affichent instantanément.

Cliquez sur une image pour l'ajouter à votre page. L'image apparaît au centre du canevas. Répétez pour ajouter plusieurs éléments. Créez des fiches maternelle riches en illustrations.

Pour les exercices CP centrés sur l'alphabet, cherchez les lettres. Les images d'objets commençant par chaque lettre sont disponibles. Parfait pour apprendre les lettres en s'amusant. Le coloriage renforce la mémorisation.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Personnaliser les Paramètres - Graphisme Maternelle et Format de Page',
        description: `Accédez aux paramètres de page dans le panneau latéral. Choisissez entre format Letter et A4. L'orientation portrait convient aux fiches maternelle classiques. Le paysage offre plus d'espace horizontal.

Le format carré (1200x1200) est idéal pour Instagram. Les dimensions personnalisées permettent des créations uniques. Entrez la largeur et hauteur en pixels. Cliquez sur "Appliquer" pour confirmer.

La couleur de fond se modifie avec le sélecteur. Le blanc reste le choix classique pour l'impression. Les fonds colorés conviennent aux versions numériques. Économisez l'encre avec des fonds clairs.

Les bordures décoratives encadrent vos coloriages. Sélectionnez un thème de bordure dans le menu. Parcourez les miniatures disponibles. Cliquez pour appliquer la bordure choisie.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Générer et Prévisualiser - Fiches à Imprimer Gratuit et Exercices CE1',
        description: `Votre coloriage s'affiche en temps réel sur le canevas. Chaque modification apparaît instantanément. Pas besoin de cliquer sur "Générer". L'aperçu est toujours à jour.

Utilisez le zoom pour vérifier les détails. Les exercices CE1 avec petits éléments nécessitent une vérification. Assurez-vous que chaque image reste visible après impression. Les lignes fines doivent rester nettes.

Le format d'export 300 DPI garantit la qualité finale. Ce que vous voyez à l'écran sera imprimé fidèlement. Les fiches à imprimer gratuit conservent leur netteté. Aucune surprise à l'impression.

Vérifiez l'équilibre visuel de votre composition. Les images doivent être bien réparties. Laissez de l'espace pour colorier confortablement. Les enfants apprécient les zones de coloriage généreuses.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Éditer sur le Canevas - Coloriage à Imprimer avec Écriture Cursive',
        description: `Sélectionnez n'importe quel élément en cliquant dessus. La barre d'outils contextuelle apparaît automatiquement. Huit poignées entourent l'objet sélectionné. Utilisez-les pour transformer l'élément.

Déplacez les images par glisser-déposer. Positionnez-les exactement où vous le souhaitez. Les exercices CP bien organisés facilitent l'apprentissage. L'alignement précis donne un aspect professionnel.

Redimensionnez en tirant les coins. Maintenez Shift pour conserver les proportions. Les petites images conviennent aux exercices maths avec comptage. Les grandes images servent de coloriage principal.

Faites pivoter avec la poignée supérieure. L'angle de rotation s'affiche pendant la manipulation. Créez des compositions dynamiques et originales. Les fiches maternelle gagnent en attrait visuel.

Ajoutez du texte pour les consignes ou titres. Le bouton "Ajouter texte" ouvre les options. Choisissez la police parmi sept options. Ajustez la taille selon vos besoins.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Télécharger et Imprimer - Fiches Maternelle PDF et Exercices CP de Qualité',
        description: `Cliquez sur le bouton "Télécharger" en haut de page. Un menu déroulant propose deux formats. JPEG pour les images individuelles. PDF pour l'impression professionnelle.

L'option "Niveaux de gris" convertit en noir et blanc. Économisez l'encre couleur pour les impressions massives. Les fiches à imprimer gratuit restent parfaitement lisibles. Les contours conservent leur netteté.

Le téléchargement démarre automatiquement. Le fichier apparaît dans votre dossier de téléchargements. Ouvrez-le pour vérification avant impression. La qualité 300 DPI garantit des résultats impeccables.

Imprimez sur votre imprimante personnelle ou professionnelle. Le format PDF s'adapte à toutes les imprimantes. Les fiches maternelle s'impriment sans perte de qualité. Distribuez à vos élèves immédiatement.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from coloring.md use case sections
  useCases: {
    sectionTitle: 'Parfait pour les Enseignants et les Parents',
    sectionDescription: 'Notre créateur de coloriages répond aux besoins de nombreux utilisateurs. Enseignants, parents et éducateurs trouvent des solutions adaptées. Découvrez comment chaque profil exploite les fiches à imprimer gratuit.',
    badgeText: 'Pour Qui',
    readMoreLabel: 'Lire la suite',
    showLessLabel: 'Voir moins',
    items: [
      {
        id: '1',
        icon: '👶',
        title: 'Enseignants de Maternelle',
        subtitle: 'Fiches Maternelle et Graphisme pour PS, MS et GS',
        description: `Les enseignants de petite section créent des coloriages simples. Les formes basiques conviennent aux enfants de 3-4 ans. Le graphisme maternelle débute avec des tracés larges. Les fiches à imprimer gratuit accompagnent les premiers apprentissages.

En moyenne section, les coloriages deviennent plus détaillés. Les enfants de 4-5 ans maîtrisent mieux le crayon. Les fiches maternelle intègrent des éléments plus petits. Le graphisme maternelle progresse vers des formes complexes.

La grande section prépare au CP avec des activités ciblées. Apprendre les lettres devient prioritaire à 5-6 ans. L'alphabet s'intègre naturellement aux coloriages. Les fiches maternelle combinent dessin et pré-écriture.`,
        quote: 'Mes élèves adorent les coloriages personnalisés !',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Enseignants du Primaire',
        subtitle: 'Exercices CP, CE1 et CE2 avec Coloriage à Imprimer',
        description: `Les enseignants de CP utilisent le coloriage pour apprendre à lire. Les images illustrent les sons étudiés en phonologie. Les exercices CP combinent lecture et activité manuelle. Les fiches à imprimer gratuit renforcent les apprentissages.

Le CE1 approfondit avec des coloriages éducatifs. Les tables de multiplication s'illustrent avec des groupes d'objets. Les exercices maths deviennent visuels et concrets. Les exercices CE1 motivent les élèves de 7-8 ans.

En CE2, les coloriages servent de récompense éducative. Les élèves ayant terminé leurs exercices maths colorient. Les tables de multiplication se révisent en s'amusant. Le coloriage à imprimer reste pertinent jusqu'à 9 ans.`,
        quote: 'Le coloriage rend les maths ludiques.',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Parents en Instruction à Domicile',
        subtitle: 'Fiches à Imprimer Gratuit et Écriture Cursive',
        description: `Les familles pratiquant l'école à la maison apprécient notre outil. Les fiches maternelle adaptées à chaque enfant sont précieuses. L'écriture cursive s'apprend à domicile avec des supports adaptés. Les parents créent des programmes personnalisés.

L'apprentissage de l'alphabet devient ludique avec les coloriages. Apprendre les lettres se fait au rythme de l'enfant. Les fiches à imprimer gratuit évitent les achats coûteux. Chaque famille crée selon ses besoins spécifiques.

Les exercices maths s'adaptent au niveau réel de l'enfant. Les tables de multiplication se pratiquent sans pression scolaire. Le graphisme maternelle se travaille librement à la maison. L'écriture cursive progresse naturellement.`,
        quote: 'Un outil parfait pour l\'école à la maison.',
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Enseignants de FLE',
        subtitle: 'Coloriage à Imprimer pour Apprendre à Lire en Français',
        description: `Les professeurs de français langue étrangère utilisent nos coloriages. Les images illustrent le vocabulaire enseigné. Les fiches maternelle servent aux apprenants débutants. Le coloriage à imprimer transcende les barrières linguistiques.

L'alphabet français s'apprend avec des illustrations adaptées. Apprendre les lettres françaises devient visuel. Les exercices CP conviennent aux adultes débutants. Les fiches à imprimer gratuit s'utilisent dans le monde entier.

Le vocabulaire thématique s'enrichit par le coloriage. Les animaux, aliments et objets quotidiens s'illustrent. Apprendre à lire passe par l'association image-mot. Les coloriages deviennent des outils pédagogiques universels.`,
        quote: 'Parfait pour enseigner le français aux étrangers.',
      },
      {
        id: '5',
        icon: '💜',
        title: 'Enseignants Spécialisés',
        subtitle: 'Graphisme Maternelle et Écriture pour Besoins Particuliers',
        description: `Les AESH et enseignants ULIS créent des supports différenciés. Les fiches maternelle s'adaptent aux difficultés spécifiques. Le graphisme maternelle aide les élèves dyspraxiques. L'écriture cursive se travaille progressivement.

Les coloriages à grandes zones conviennent aux troubles moteurs. Les fiches à imprimer gratuit se personnalisent facilement. Les exercices CP simplifiés accompagnent chaque élève. L'adaptation devient possible sans effort.

Les troubles de l'attention bénéficient d'activités courtes. Le coloriage à imprimer canalise l'énergie positivement. Les fiches maternelle occupent les transitions. Un outil précieux pour la gestion de classe inclusive.`,
        quote: 'Je peux adapter chaque fiche aux besoins de mes élèves.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Créateurs de Contenu Éducatif',
        subtitle: 'Vendez vos Fiches de Coloriage sur Teachers Pay Teachers',
        description: `Les entrepreneurs pédagogiques vendent leurs créations. La licence commerciale incluse autorise la vente. Les fiches maternelle personnalisées attirent les acheteurs. Le coloriage à imprimer génère des revenus passifs.

Teachers Pay Teachers accueille vos coloriages français. Les exercices CP originaux se vendent bien. Les fiches à imprimer gratuit deviennent payantes sur les plateformes. La qualité 300 DPI satisfait les clients exigeants.

Les boutiques Etsy proposent des packs thématiques. L'alphabet illustré séduit les parents. Les tables de multiplication coloriables trouvent preneur. Les exercices maths ludiques se vendent toute l'année.`,
        quote: 'Mon abonnement s\'est rentabilisé dès le premier mois !',
      },
    ],
  },

  // FAQ Section - Selected FAQs from coloring.md
  faq: {
    sectionTitle: 'Questions Fréquentes',
    sectionDescription: 'Questions fréquentes sur notre générateur de coloriage à imprimer et nos fiches maternelle.',
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
        question: 'Le Générateur de Coloriage à Imprimer Est-il Vraiment Gratuit avec l\'Abonnement ?',
        answer: 'Le générateur de coloriage nécessite un abonnement Pack Essentiel à 144€ par an ou 15€ par mois. Le Pack Essentiel inclut 10 applications de création de fiches pédagogiques. Aucun essai gratuit n\'existe pour les créations personnalisées. Votre abonnement offre un accès illimité sans frais supplémentaires par fiche. Le terme "fiches à imprimer gratuit" décrit ce que vous créez, pas le générateur lui-même. Une fois abonné, produisez autant de coloriages que nécessaire sans coûts additionnels.',
      },
      {
        id: '2',
        question: 'Puis-je Imprimer les Coloriages et Fiches Maternelle sur une Imprimante Classique ?',
        answer: 'Oui, tous les coloriages se téléchargent en PDF ou JPEG standard pour toute imprimante. Le format Letter (8,5×11 pouces) convient aux imprimantes américaines et canadiennes. Le format A4 (210×297mm) s\'adapte aux imprimantes européennes et françaises. Aucun équipement spécial requis pour des impressions de qualité professionnelle. Les imprimantes noir et blanc fonctionnent parfaitement avec l\'option niveaux de gris. La résolution 300 DPI garantit des lignes nettes et des images claires.',
      },
      {
        id: '3',
        question: 'Faut-il des Compétences en Graphisme Maternelle pour Créer des Coloriages ?',
        answer: 'Aucune expérience artistique nécessaire pour créer des fiches maternelle professionnelles. L\'interface utilise des commandes visuelles intuitives que tout le monde comprend. Cliquez sur les images pour les ajouter à votre page de coloriage. Déplacez les éléments avec votre souris sans difficulté technique. Les enseignants sans talents artistiques créent de superbes coloriages en quelques minutes. Si vous savez utiliser un navigateur web, vous savez créer des coloriages.',
      },
      {
        id: '4',
        question: 'Puis-je Utiliser les Coloriages pour Apprendre à Lire en Classe ?',
        answer: 'Oui, l\'abonnement Pack Essentiel inclut les droits d\'utilisation illimités en classe. Imprimez autant d\'exemplaires que nécessaire pour vos élèves sans frais additionnels. Utilisez les coloriages pour apprendre à lire, en devoirs ou en activités de centres. Partagez vos créations avec vos collègues enseignants. Les fiches maternelle se distribuent aux élèves pour emporter à la maison.',
      },
      {
        id: '5',
        question: 'Quelles Langues Sont Disponibles pour l\'Alphabet et Apprendre les Lettres ?',
        answer: 'La bibliothèque d\'images supporte 11 langues européennes pour une flexibilité maximale. Changez le sélecteur de langue pour accéder aux images en français, anglais, allemand, espagnol, italien, portugais, néerlandais, danois, suédois, norvégien ou finnois. Chaque langue propose les mêmes 3000+ images avec des noms adaptés. Les enseignants de FLE utilisent les images multilingues pour créer des supports d\'apprentissage.',
      },
      {
        id: '6',
        question: 'Puis-je Vendre mes Coloriages et Exercices Maths sur Teachers Pay Teachers ?',
        answer: 'Oui, l\'abonnement Pack Essentiel inclut une licence commerciale complète sans frais supplémentaires. Créez des coloriages et exercices maths illimités pour la vente sur Teachers Pay Teachers, Etsy ou Amazon KDP. Aucune attribution requise sur les produits que vous vendez. Le prix de 144€ par an couvre la licence commerciale. Les vendeurs construisent des entreprises rentables autour de packs de coloriages thématiques.',
      },
      {
        id: '7',
        question: 'Quels Âges Conviennent le Mieux aux Coloriages et aux Tables de Multiplication ?',
        answer: 'Les coloriages conviennent parfaitement aux enfants de la maternelle au CE2, soit de 3 à 9 ans. Les enfants de petite section (3-4 ans) utilisent des coloriages simples à une seule image. Les moyens et grands section (4-6 ans) colorient des images thématiques développant leur vocabulaire. Les élèves de CP (6-7 ans) combinent coloriage et apprentissage des tables de multiplication visuelles. Les CE1 et CE2 apprécient les coloriages liés aux matières.',
      },
      {
        id: '8',
        question: 'Puis-je Téléverser mes Propres Images pour le Graphisme Maternelle ?',
        answer: 'Oui, téléversez vos photos personnelles et cliparts pour des supports de graphisme maternelle vraiment personnalisés. Cliquez sur le bouton d\'import et sélectionnez plusieurs images simultanément. Les formats JPEG, PNG et GIF sont acceptés de n\'importe quelle source. Vos images apparaissent dans une galerie personnelle pour une utilisation répétée. Ajoutez des photos d\'élèves créant des fiches maternelle personnalisées.',
      },
      {
        id: '9',
        question: 'Combien de Temps Faut-il pour Créer une Fiche d\'Écriture Cursive avec Coloriage ?',
        answer: 'Créer un coloriage personnalisé avec écriture cursive prend environ 3 minutes du début au téléchargement. Sélectionnez votre format de page en 10 secondes. Choisissez des images dans la bibliothèque ou téléversez les vôtres en 30 secondes. Ajoutez texte, bordures et lignes d\'écriture cursive en 20 secondes. Éditez et arrangez les éléments en 90 secondes. Téléchargez votre fiche terminée en 10 secondes.',
      },
      {
        id: '10',
        question: 'Puis-je Ajouter des Lignes pour l\'Écriture Cursive sur mes Coloriages ?',
        answer: 'Oui, cliquez sur "Ajouter Lignes d\'Écriture" pour insérer des lignes d\'écriture pré-formatées. Trois lignes parallèles apparaissent avec une ligne pointillée centrale guidant la formation des lettres. Les élèves pratiquent l\'écriture cursive, les mots ou phrases sur les coloriages. Les lignes transforment des pages de coloriage simples en fiches maternelle polyvalentes.',
      },
      {
        id: '11',
        question: 'Comment Personnaliser les Coloriages pour le Calcul et les Exercices CP ?',
        answer: 'Utilisez les images de fruits, animaux ou objets pour créer des exercices de comptage visuels. Ajoutez plusieurs éléments identiques sur la page pour les exercices d\'addition. Les enfants colorient puis comptent les objets. Combinez avec des chiffres écrits pour renforcer l\'apprentissage des nombres. Les fiches maternelle deviennent des supports mathématiques complets.',
      },
      {
        id: '12',
        question: 'Le Générateur de Coloriage Fonctionne-t-il sur Tablette et Mobile ?',
        answer: 'Oui, le générateur est entièrement responsive et fonctionne sur tous les appareils. Sur tablette, l\'interface tactile permet de déplacer les images du bout du doigt. Sur smartphone, l\'édition reste possible mais un écran plus grand offre plus de confort. Les téléchargements fonctionnent sur tous les navigateurs modernes. Créez vos fiches maternelle où que vous soyez.',
      },
      {
        id: '13',
        question: 'Puis-je Partager mes Créations de Coloriage avec mes Collègues ?',
        answer: 'Oui, partagez librement vos fichiers PDF et JPEG téléchargés avec vos collègues enseignants. L\'abonnement Pack Essentiel autorise le partage au sein de votre établissement. Envoyez les fichiers par email ou via votre espace numérique de travail. Vos collègues peuvent imprimer sans limite. Le partage commercial sur les plateformes de vente reste réservé aux abonnés.',
      },
      {
        id: '14',
        question: 'Comment Téléverser mes Propres Images Personnalisées pour les Coloriages ?',
        answer: 'Cliquez sur le bouton "Importer Image" dans la barre d\'outils supérieure. Sélectionnez un ou plusieurs fichiers JPEG, PNG ou GIF depuis votre ordinateur. Les images apparaissent dans votre galerie personnelle immédiatement. Cliquez sur une image importée pour l\'ajouter au canevas. Vos photos de classe personnalisent les fiches maternelle de manière unique.',
      },
      {
        id: '15',
        question: 'Quelle est la Différence entre Export JPEG et PDF pour les Coloriages ?',
        answer: 'Le format JPEG convient au partage numérique et aux aperçus rapides. Le PDF offre une qualité d\'impression optimale avec des textes nets à toute taille. Pour l\'impression professionnelle, choisissez toujours le PDF. Pour les réseaux sociaux ou l\'envoi par email, le JPEG suffit. Les deux formats conservent la résolution 300 DPI pour des fiches maternelle impeccables.',
      },
      {
        id: '16',
        question: 'Puis-je Créer des Coloriages Thématiques pour les Fêtes et Saisons ?',
        answer: 'Oui, la bibliothèque contient des milliers d\'images saisonnières et festives. Noël, Pâques, Halloween et carnaval sont richement illustrés. Les saisons offrent des thèmes de nature variés. Cherchez "printemps", "automne" ou "hiver" pour des résultats adaptés. Créez des fiches maternelle en lien avec le calendrier scolaire toute l\'année.',
      },
      {
        id: '17',
        question: 'Comment Ajouter du Texte et des Consignes sur mes Coloriages ?',
        answer: 'Cliquez sur "Ajouter Texte" dans la barre d\'outils pour insérer une zone de texte. Tapez votre consigne ou titre dans le champ qui apparaît. Choisissez parmi 7 polices adaptées aux enfants. Ajustez la taille du texte avec le curseur. Déplacez et redimensionnez le texte comme n\'importe quel autre élément sur la page.',
      },
      {
        id: '18',
        question: 'L\'Abonnement Inclut-il les Mises à Jour de la Bibliothèque d\'Images ?',
        answer: 'Oui, votre abonnement Pack Essentiel inclut toutes les mises à jour de la bibliothèque sans frais supplémentaires. De nouvelles images sont ajoutées régulièrement selon les demandes des utilisateurs. Les thèmes saisonniers s\'enrichissent avant chaque période festive. Vos fiches maternelle bénéficient automatiquement des nouveaux contenus. Aucune action requise de votre part.',
      },
    ],
  },

  // Pricing
  pricing: {
    title: 'Pack Essentiel',
    price: '144€',
    priceInterval: '/an',
    priceSuffix: 'Facturation annuelle',
    benefits: [
      'Création de coloriages illimitée',
      'Licence commerciale incluse',
      '11 langues supportées',
      '3000+ images thématiques',
      'Qualité d\'impression 300 DPI',
      'Export PDF et JPEG',
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

  // Related Apps
  relatedApps: {
    sectionTitle: 'Combinez avec d\'Autres Générateurs de Fiches',
    sectionDescription: 'Créez des paquets d\'apprentissage complets en combinant les coloriages avec ces générateurs complémentaires.',
    ctaTitle: 'Prêt à Créer des Coloriages Fantastiques ?',
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
        slug: 'draw-and-color',
        name: 'Dessiner et Colorier',
        category: 'Créativité',
        icon: '🖍️',
        description: 'Combinez vos coloriages avec des activités de dessin guidé pour développer la créativité et la motricité fine.',
      },
      {
        id: '2',
        slug: 'alphabet-train',
        name: 'Train Alphabet',
        category: 'Apprentissage Précoce',
        icon: '🚂',
        description: 'Associez les coloriages aux fiches d\'alphabet pour un apprentissage complet des lettres en maternelle.',
      },
      {
        id: '3',
        slug: 'word-search',
        name: 'Mots Mêlés',
        category: 'Langue',
        icon: '🔍',
        description: 'Complétez les activités de coloriage avec des mots mêlés thématiques pour enrichir le vocabulaire.',
      },
      {
        id: '4',
        slug: 'find-and-count',
        name: 'Chercher et Compter',
        category: 'Mathématiques',
        icon: '🔢',
        description: 'Combinez coloriage et comptage pour des exercices maths visuels et engageants.',
      },
      {
        id: '5',
        slug: 'matching',
        name: 'Association',
        category: 'Logique',
        icon: '🔗',
        description: 'Associez les coloriages avec des exercices de correspondance pour développer la pensée logique.',
      },
      {
        id: '6',
        slug: 'writing',
        name: 'Écriture',
        category: 'Graphisme',
        icon: '✍️',
        description: 'Intégrez les coloriages aux exercices d\'écriture pour combiner motricité fine et apprentissage des lettres.',
      },
    ],
  },
};

export default coloringFrContent;
