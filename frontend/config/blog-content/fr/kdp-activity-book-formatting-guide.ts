import type { BlogContent } from '../types';

const content: BlogContent = {
  seo: {
    primaryKeyword: 'formater cahier activités KDP Amazon',
    secondaryKeywords: [
      'mise en page livre activités Amazon KDP',
      'publier cahier exercices Amazon.fr',
      'guide formatage KDP imprimables',
    ],
    lsiKeywords: [
      'dimensions cahier KDP',
      'marges intérieures livre activités',
      'couverture cahier exercices Amazon',
    ],
    titleTag: 'Formater un cahier d\'activités pour KDP Amazon | LessonCraftStudio',
    metaDescription: 'Guide complet pour formater votre cahier d\'activités pour Amazon KDP. Dimensions, marges, couverture et soumission étape par étape.',
  },
  hero: {
    title: 'Formater un cahier d\'activités pour Amazon KDP',
    tagline: 'Du fichier PDF au livre publié sur Amazon.fr',
    description: 'Amazon KDP (Kindle Direct Publishing) permet de publier des cahiers d\'activités et d\'exercices sans investissement initial. Mais le formatage est l\'étape où la plupart des créateurs abandonnent. Marges incorrectes, fond perdu mal configuré, couverture aux mauvaises dimensions — ces erreurs techniques bloquent la publication. Ce guide vous accompagne étape par étape dans le formatage de votre cahier d\'activités, de la création du fichier intérieur à la soumission sur KDP.',
  },
  category: 'platform-strategy',
  introduction: 'Amazon KDP est le plus grand canal de distribution au monde pour les cahiers d\'activités imprimés. Contrairement à Etsy où vous vendez des fichiers PDF à télécharger, KDP imprime et expédie le livre physique à votre place. Votre seul travail : créer le contenu et le formater correctement. Le formatage est technique mais pas compliqué une fois que vous connaissez les règles. Ce guide couvre tout ce dont vous avez besoin pour publier votre premier cahier d\'activités sur Amazon.fr.',
  sections: [
    {
      heading: 'Choisir les dimensions de votre cahier',
      content: 'KDP propose de nombreuses tailles de livre. Pour les cahiers d\'activités, trois formats dominent :\n\n**8,5 x 11 pouces (21,6 x 27,9 cm) — Le standard**\nÉquivalent approximatif du format Letter américain. C\'est le format le plus populaire pour les cahiers d\'activités car il offre beaucoup d\'espace pour les exercices. Idéal pour les fiches de mathématiques, coloriages et mots cachés.\n\n**A4 (21 x 29,7 cm) — Le format européen**\nSi votre audience principale est européenne, l\'A4 est préférable. Les acheteurs français sont habitués à ce format. KDP l\'accepte mais il génère parfois plus de pages blanches.\n\n**8 x 10 pouces (20,3 x 25,4 cm) — Le compromis**\nLégèrement plus petit, ce format réduit les coûts d\'impression et reste très lisible. Populaire pour les cahiers de coloriage et les livres de jeux.\n\n**Conseil :** Vérifiez les dimensions acceptées sur la page de spécifications KDP avant de commencer. Les dimensions doivent être exactes au millimètre près.',
    },
    {
      heading: 'Configurer les marges et le fond perdu',
      content: 'Les marges KDP sont plus strictes que celles d\'un simple PDF :\n\n**Marges intérieures minimales :**\n- Marge extérieure : 6,35 mm (0,25 pouce)\n- Marge intérieure (gouttière) : varie selon le nombre de pages\n  - Moins de 150 pages : 9,53 mm\n  - 150-400 pages : 12,7 mm\n  - Plus de 400 pages : 19,05 mm\n\n**Fond perdu (bleed) :**\n- Si vos illustrations touchent le bord de la page, activez le fond perdu\n- Ajoutez 3,175 mm (0,125 pouce) de chaque côté\n- Le fichier PDF doit inclure ces marges supplémentaires\n\n**Sans fond perdu :**\n- Si tout votre contenu reste dans les marges, désactivez le fond perdu\n- C\'est l\'option la plus simple pour les cahiers d\'exercices avec bordures blanches\n\n**Astuce pratique :** Créez un gabarit avec les bonnes marges dès le départ. Cela vous évitera de reformater des dizaines de pages plus tard. Nos générateurs de fiches produisent déjà des PDF compatibles KDP.',
    },
    {
      heading: 'Préparer le fichier intérieur',
      content: 'Le fichier intérieur de votre cahier doit respecter ces spécifications :\n\n**Format :** PDF uniquement (pas de Word, pas d\'images)\n**Résolution :** 300 DPI minimum pour les images et illustrations\n**Polices :** Incorporées dans le PDF (pas de polices liées)\n**Couleur :** Noir et blanc (impression standard, moins cher) ou couleur (impression premium)\n\n**Structure recommandée pour un cahier d\'activités :**\n1. Page de titre\n2. Page de copyright\n3. Table des matières (optionnel mais recommandé)\n4. Instructions d\'utilisation\n5. Pages d\'exercices (le contenu principal)\n6. Pages de réponses (essentielles pour les fiches de maths et puzzles)\n7. Page « À propos de l\'auteur » avec lien vers votre boutique\n\n**Nombre de pages :** KDP exige un minimum de 24 pages et un maximum de 828 pages pour les livres brochés. Pour un cahier d\'activités typique, visez 50 à 120 pages.\n\n**Vérification :** Utilisez l\'outil de prévisualisation KDP avant de soumettre pour détecter les problèmes de marges ou de résolution.',
    },
    {
      heading: 'Créer la couverture',
      content: 'La couverture est l\'élément le plus important pour les ventes sur Amazon. KDP exige une couverture au format PDF ou JPEG avec des dimensions très précises.\n\n**Calculer les dimensions :**\nUtilisez le calculateur de couverture KDP (disponible sur kdp.amazon.com). Entrez votre format de livre, nombre de pages et type de papier. Le calculateur génère un gabarit avec les dimensions exactes incluant :\n- Couverture avant\n- Dos (tranche) — largeur variable selon le nombre de pages\n- Couverture arrière\n- Zone de fond perdu (3,175 mm de chaque côté)\n\n**Éléments d\'une couverture qui vend :**\n- Titre clair et lisible en vignette (important pour Amazon)\n- Sous-titre décrivant le contenu (« 100 fiches d\'addition pour CP-CE1 »)\n- Illustration ou mockup attrayant\n- Couleurs vives qui attirent l\'attention dans les résultats de recherche\n- Mention de l\'âge ou du niveau scolaire\n\n**Outils gratuits :** Canva propose des modèles de couverture KDP. Le Book Cover Creator d\'Amazon est aussi une option simple pour débuter.',
    },
    {
      heading: 'Soumettre et publier sur KDP',
      content: 'Une fois vos fichiers prêts, voici le processus de soumission :\n\n**Étape 1 — Créer un compte KDP**\nInscrivez-vous sur kdp.amazon.com avec votre compte Amazon. Configurez vos informations fiscales et bancaires.\n\n**Étape 2 — Créer un nouveau titre**\nRenseignez les métadonnées : titre, sous-titre, auteur, description, mots-clés (7 maximum), catégories.\n\n**Étape 3 — Télécharger les fichiers**\nUploadez votre fichier intérieur (PDF) et votre couverture. KDP vérifie automatiquement la conformité.\n\n**Étape 4 — Définir le prix**\nPour le marché Amazon.fr, fixez un prix en euros. KDP calcule votre redevance (60 % du prix de vente moins le coût d\'impression). Un cahier de 100 pages en noir et blanc à 9,99 € génère environ 3-4 € de redevance.\n\n**Étape 5 — Publier**\nCliquez sur « Publier ». Votre livre sera disponible sur Amazon.fr en 24-72 heures.\n\n**Astuce :** Publiez simultanément sur tous les marchés Amazon (US, UK, DE, FR, IT, ES) pour maximiser vos ventes. Le contenu multilingue est un avantage considérable.',
    },
  ],
  keyTakeaways: [
    'Le format 8,5 x 11 pouces est le standard pour les cahiers d\'activités KDP, mais l\'A4 convient mieux au marché français',
    'Configurez les marges correctement dès le départ — la gouttière varie selon le nombre de pages',
    'Le fichier intérieur doit être en PDF 300 DPI avec polices incorporées',
    'La couverture est votre outil de vente n°1 — elle doit être lisible en vignette',
    'Publiez sur tous les marchés Amazon simultanément pour maximiser vos revenus',
  ],
  faq: [
    {
      question: 'Combien coûte la publication sur Amazon KDP ?',
      answer: 'La publication est entièrement à vos frais : zéro. Amazon prélève les coûts d\'impression sur chaque vente. Vous recevez la différence entre le prix de vente et le coût d\'impression. Il n\'y a aucun investissement initial.',
    },
    {
      question: 'Puis-je vendre le même contenu sur Etsy ET Amazon KDP ?',
      answer: 'Oui. Etsy vend le fichier PDF numérique, Amazon KDP vend le livre imprimé physique. Ce sont deux produits différents (numérique vs physique) donc il n\'y a pas de conflit. C\'est même recommandé pour diversifier vos revenus.',
    },
    {
      question: 'Faut-il un ISBN pour publier sur KDP ?',
      answer: 'Non. Amazon attribue gratuitement un numéro ASIN à votre livre. Si vous souhaitez un ISBN, KDP en fournit un gratuitement. Vous pouvez aussi utiliser votre propre ISBN si vous en avez un.',
    },
  ],
  internalLinks: [
    { pageType: 'app', slug: 'word-search-worksheets', anchorText: 'Générateur de mots cachés pour KDP' },
    { pageType: 'start', slug: 'complete-guide-printable-business', anchorText: 'Guide complet des imprimables' },
    { pageType: 'guide', slug: 'publish-puzzle-books-kdp', anchorText: 'Guide de publication KDP' },
  ],
  relatedPosts: [
    { slug: 'kdp-vs-etsy-which-earns-more', title: 'KDP vs Etsy : lequel rapporte le plus ?' },
    { slug: 'create-activity-book-kdp-start-finish', title: 'Créer un cahier d\'activités KDP de A à Z' },
    { slug: 'best-paper-sizes-printable-products', title: 'Les meilleurs formats papier pour vos imprimables' },
  ],
  cta: {
    heading: 'Créez le contenu de votre cahier KDP',
    description: 'Générez des pages d\'exercices professionnelles en quelques minutes avec nos 33 outils. Essai gratuit avec filigrane — aucune inscription requise.',
    buttonText: 'Explorer les générateurs',
    buttonUrl: '/apps',
  },
};

export default content;
