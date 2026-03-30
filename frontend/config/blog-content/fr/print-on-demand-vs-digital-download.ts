import type { BlogContent } from '../types';

const content: BlogContent = {
  seo: {
    primaryKeyword: 'impression à la demande vs téléchargement numérique',
    secondaryKeywords: [
      'POD vs PDF imprimables',
      'print on demand ou digital download',
      'comparaison modèles vente',
    ],
    lsiKeywords: [
      'KDP impression demande',
      'produit numérique vs physique',
      'avantages téléchargement digital',
    ],
    titleTag: 'Print on Demand vs téléchargement numérique | LCS',
    metaDescription: 'POD ou téléchargement numérique ? Comparaison des deux modèles pour vendre vos imprimables avec marges et stratégie.',
  },
  hero: {
    title: 'Print on Demand vs téléchargement numérique',
    tagline: 'Deux modèles complémentaires, pas concurrents',
    description: 'Le PDF offre 85 %+ de marge, le POD (KDP) offre un livre physique avec 30-45 % de marge mais accès à l\'audience massive d\'Amazon. Le même contenu peut être vendu sous les deux formats pour doubler vos canaux.',
  },
  category: 'platform-strategy',
  introduction: 'Le même cahier de 50 fiches peut être vendu comme PDF sur Etsy ET comme livre imprimé sur KDP. Deux produits, deux audiences, un seul effort de création.',
  sections: [
    {
      heading: 'Le modèle PDF numérique',
      content: '**Fonctionnement :** Vous créez un PDF, le mettez en vente. L\'acheteur télécharge et imprime.\n**Marges :** 80-90 %\n**Prix typique :** 2-25 €\n**Avantages :** Marges élevées, zéro logistique, livraison instantanée\n**Inconvénients :** L\'acheteur doit imprimer lui-même',
    },
    {
      heading: 'Le modèle POD (KDP)',
      content: '**Fonctionnement :** Vous soumettez votre PDF formaté. Amazon imprime et expédie à la commande.\n**Marges :** 25-45 %\n**Prix typique :** 7-20 €\n**Avantages :** Produit physique, distribution Amazon mondiale, pas de stock\n**Inconvénients :** Marges plus faibles, formatage technique requis',
    },
    {
      heading: 'Comparaison financière',
      content: '**Cahier de 50 fiches d\'addition :**\n- Etsy PDF à 9,99 € : marge nette ~8,49 € (85 %)\n- KDP livre à 9,99 € : redevance nette ~2,50 € (25 %)\n\nLe PDF est 3,4x plus rentable par vente. Mais KDP donne accès à l\'audience massive d\'Amazon.',
    },
    {
      heading: 'Double publication',
      content: '**Étape 1 :** Créez vos fiches avec nos générateurs\n**Étape 2 :** Compilez en PDF pour Etsy (format A4)\n**Étape 3 :** Reformatez pour KDP (marges, couverture)\n**Étape 4 :** Publiez sur les deux simultanément\n\nTemps supplémentaire pour KDP : 1-2 heures par cahier.',
    },
    {
      heading: 'Quand privilégier quel modèle',
      content: '**PDF quand :** Fiches individuelles, audience tech-savvy, maximiser la marge.\n**POD quand :** Cahier complet (50+ pages), audience préférant le tangible, distribution Amazon.\n**Les deux quand :** Contenu de 30+ pages, temps disponible pour le formatage KDP.',
    },
  ],
  keyTakeaways: [
    'Le PDF offre 85 % de marge, le POD donne accès à Amazon',
    'Le même contenu peut être vendu sur les deux canaux',
    'Le reformatage KDP prend 1-2 heures par cahier',
    'Les cahiers de 50+ pages justifient un format livre',
    'La double publication maximise les revenus',
  ],
  faq: [
    {
      question: 'Le même contenu peut-il être sur Etsy et KDP ?',
      answer: 'Oui. Sur Etsy c\'est le PDF numérique, sur KDP c\'est le livre imprimé. Deux produits distincts, aucune exclusivité.',
    },
    {
      question: 'Quel modèle est le plus facile ?',
      answer: 'Le PDF sur Etsy. Pas de formatage de marges ni de couverture spécifique. Commencez par Etsy.',
    },
    {
      question: 'Quel modèle génère le plus de revenus ?',
      answer: 'Cela dépend du volume. Le PDF rapporte 3,4x plus par vente, mais Amazon a un trafic bien supérieur.',
    },
  ],
  internalLinks: [
    { pageType: 'app', slug: 'mots-caches-fiches', anchorText: 'Générateur de mots cachés' },
    { pageType: 'start', slug: 'guide-complet-activite-imprimables', anchorText: 'Guide complet imprimables' },
    { pageType: 'guide', slug: 'guide-vendeur-imprimables', anchorText: 'Guide vendeur' },
  ],
  relatedPosts: [
    { slug: 'kdp-activity-book-formatting-guide', title: 'Formater un cahier KDP' },
    { slug: 'kdp-vs-etsy-which-earns-more', title: 'KDP vs Etsy' },
    { slug: 'best-paper-sizes-printable-products', title: 'Meilleurs formats papier' },
  ],
  cta: {
    heading: 'Créez du contenu pour PDF et KDP',
    description: '33 générateurs de fiches professionnelles. Essai gratuit avec filigrane — aucune inscription requise.',
    buttonText: 'Découvrir les générateurs',
    buttonUrl: '/apps',
  },
};

export default content;
