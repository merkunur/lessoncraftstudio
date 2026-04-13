import type { BlogContent } from '../types';

const content: BlogContent = {
  seo: {
    primaryKeyword: 'Gumroad vs Etsy produits numériques',
    secondaryKeywords: [
      'comparaison Gumroad Etsy imprimables',
      'meilleure plateforme produits numériques',
      'Gumroad ou Etsy vendre fiches',
    ],
    lsiKeywords: [
      'vendre imprimables Gumroad',
      'alternative Etsy',
      'plateforme vente directe fiches',
    ],
    titleTag: 'Gumroad vs Etsy pour vos imprimables | LessonCraftStudio',
    metaDescription: 'Comparaison Gumroad vs Etsy pour vendre des imprimables. Frais, audience, fonctionnalités et stratégie optimale.',
  },
  hero: {
    title: 'Gumroad vs Etsy : quelle plateforme choisir ?',
    tagline: 'Marketplace vs vente directe',
    description: 'Etsy est une marketplace avec trafic intégré mais des frais élevés. Gumroad est une plateforme de vente directe avec de meilleures marges mais aucun trafic intégré. Comprendre les forces de chaque plateforme vous permet de choisir la bonne stratégie.',
  },
  category: 'platform-strategy',
  introduction: 'La réponse courte : Etsy apporte les clients, Gumroad garde les marges. La stratégie optimale combine les deux intelligemment.',
  sections: [
    {
      heading: 'Etsy : trafic intégré',
      content: '**Avantages :** 90+ millions d\'acheteurs actifs, SEO interne, confiance établie, système d\'avis.\n**Inconvénients :** Frais 15-20 %, pas d\'accès aux emails clients, dépendance à l\'algorithme.\n\nIdéal pour les vendeurs qui débutent sans audience propre.',
    },
    {
      heading: 'Gumroad : marges élevées',
      content: '**Avantages :** Frais de 10 %, accès aux emails clients, outils marketing intégrés, pas de concurrence directe.\n**Inconvénients :** Aucun trafic intégré, pas de SEO interne, moins connu en France.\n\nIdéal pour les vendeurs avec une audience existante.',
    },
    {
      heading: 'Comparaison des frais',
      content: '**Sur une vente de 10 € :**\n- Etsy : net ~8,47 € (84,7 %)\n- Gumroad : net 9,00 € (90 %)\n\nDifférence : 0,53 € par vente. Sur 100 ventes/mois, c\'est 53 € de plus avec Gumroad. Significatif si vous pouvez générer le même volume.',
    },
    {
      heading: 'Stratégie hybride',
      content: '**Etsy pour l\'acquisition :** Soyez trouvé par de nouveaux clients.\n**Gumroad pour la fidélisation :** Redirigez vos clients Etsy vers Gumroad.\n**Pinterest vers Gumroad :** Votre propre trafic va sur Gumroad (pas de frais Etsy).\n**Email vers Gumroad :** Vendez directement à votre liste.',
    },
    {
      heading: 'Autres alternatives',
      content: '**Payhip :** 5 % de frais, bonne gestion TVA européenne.\n**Votre propre site :** Contrôle total mais complexité technique.\n**Recommandation :** Etsy + Gumroad est la combinaison la plus efficace pour la majorité des vendeurs.',
    },
  ],
  keyTakeaways: [
    'Etsy apporte le trafic, Gumroad offre de meilleures marges',
    'Combinez les deux : Etsy pour l\'acquisition, Gumroad pour la fidélisation',
    'Sur 100 ventes/mois, Gumroad génère 53 € de plus',
    'Liez Pinterest directement à Gumroad',
    'Les alternatives comme Payhip méritent aussi considération',
  ],
  faq: [
    {
      question: 'Gumroad gère-t-il la TVA européenne ?',
      answer: 'Oui, Gumroad collecte et reverse la TVA sur les ventes numériques dans l\'UE. C\'est un avantage majeur.',
    },
    {
      question: 'Puis-je migrer d\'Etsy vers Gumroad ?',
      answer: 'Publiez sur les deux simultanément. Ne quittez pas Etsy, ajoutez Gumroad comme canal supplémentaire.',
    },
    {
      question: 'Gumroad est-il connu en France ?',
      answer: 'Moins qu\'Etsy, mais les acheteurs font confiance au processus de paiement sécurisé.',
    },
  ],
  internalLinks: [
    { pageType: 'app', slug: 'word-search-worksheets', anchorText: 'Générateur de mots cachés' },
    { pageType: 'start', slug: 'complete-guide-printable-business', anchorText: 'Guide complet imprimables' },
    { pageType: 'guide', slug: 'sell-educational-printables-etsy', anchorText: 'Guide vendeur' },
  ],
  relatedPosts: [
    { slug: 'tpt-vs-etsy-worksheets-comparison', title: 'La Salle des Maîtres vs Etsy' },
    { slug: 'etsy-printable-pricing-strategy', title: 'Stratégie de prix Etsy' },
    { slug: 'email-list-printable-business', title: 'Liste email imprimables' },
  ],
  cta: {
    heading: 'Créez des fiches pour toutes vos plateformes',
    description: '33 générateurs de fiches professionnelles. Essai gratuit avec filigrane — aucune inscription requise.',
    buttonText: 'Découvrir les générateurs',
    buttonUrl: '/apps',
  },
};

export default content;
