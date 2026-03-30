import type { BlogContent } from '../types';

const content: BlogContent = {
  seo: {
    primaryKeyword: 'droit auteur vendeurs imprimables',
    secondaryKeywords: [
      'propriété intellectuelle fiches',
      'protéger imprimables droit auteur France',
      'copyright fiches exercices',
    ],
    lsiKeywords: [
      'DMCA retrait fiches copiées',
      'droits créateur imprimables',
      'protection juridique fiches',
    ],
    titleTag: 'Droit d\'auteur pour vendeurs d\'imprimables | LCS',
    metaDescription: 'Protégez vos imprimables avec le droit d\'auteur. Bases juridiques en France, cliparts et que faire en cas de copie.',
  },
  hero: {
    title: 'Droit d\'auteur pour vendeurs d\'imprimables : les bases',
    tagline: 'Protégez votre travail et respectez celui des autres',
    description: 'Le droit d\'auteur protège automatiquement vos imprimables en France, mais savez-vous ce qui est protégé et ce qui ne l\'est pas ? Un exercice de maths n\'est pas protégeable, mais votre mise en page l\'est. Ce guide couvre les bases juridiques essentielles.',
  },
  category: 'platform-strategy',
  introduction: 'Le droit d\'auteur est un sujet que la plupart ignorent jusqu\'à ce qu\'un problème survienne. Connaître les bases vous protège dans les deux directions.',
  sections: [
    {
      heading: 'Ce qui est protégé',
      content: '**Automatiquement en France :**\n- Votre mise en page et design original\n- Vos illustrations originales\n- Votre sélection et arrangement d\'exercices\n- Vos textes et consignes originaux\n\n**NON protégé :**\n- Les exercices de maths (2+3 n\'appartient à personne)\n- Les listes de mots courants\n- Les idées et concepts pédagogiques',
    },
    {
      heading: 'Utiliser des cliparts',
      content: '**Règle d\'or :** Ne jamais utiliser d\'image sans vérifier sa licence.\n**Sources sûres :** Canva (licence commerciale incluse), Creative Market, Google Fonts (polices libres).\n**Pièges :** Les cliparts « free » sur Pinterest sont souvent sans licence commerciale.\n**Gardez une trace :** Conservez la preuve de licence de chaque clipart.',
    },
    {
      heading: 'Protéger vos créations',
      content: '**Mesures :**\n- Copyright sur chaque page : © Votre Boutique 2026\n- Conditions d\'utilisation jointes à chaque vente\n- Filigrane sur les aperçus Etsy\n\n**En cas de copie :**\n1. Documentez (captures d\'écran datées)\n2. Contactez le copieur\n3. Signalement Etsy\n4. Demande DMCA en dernier recours',
    },
    {
      heading: 'Statut juridique en France',
      content: '**Micro-entrepreneur :**\n- Inscription gratuite en ligne\n- Cotisations : ~22 % du CA\n- Plafond : 77 700 €/an\n- BIC (Bénéfices Industriels et Commerciaux)\n\n**Obligations :** Déclaration CA, livre de recettes, facturation conforme.',
    },
    {
      heading: 'Questions fréquentes',
      content: '**S\'inspirer d\'un concurrent ?** Oui pour le thème, non pour le design spécifique.\n**Générateurs et droits ?** Nos générateurs incluent explicitement le droit de revente.\n**Personnages Disney ?** JAMAIS. Utilisez uniquement des illustrations génériques.\n**Enregistrement ?** Pas nécessaire en France (droit d\'auteur automatique).',
    },
  ],
  keyTakeaways: [
    'Votre mise en page est automatiquement protégée en France',
    'Vérifiez toujours la licence des cliparts et polices',
    'Ajoutez copyright et conditions à chaque fichier',
    'Le statut de micro-entrepreneur est le plus simple',
    'En cas de copie : documentez, contactez, signalez',
  ],
  faq: [
    {
      question: 'Faut-il enregistrer ses créations ?',
      answer: 'En France, le droit d\'auteur est automatique. Aucun enregistrement nécessaire. Pour plus de sécurité, envoyez-vous un courrier recommandé daté.',
    },
    {
      question: 'Des fiches similaires aux miennes, est-ce de la copie ?',
      answer: 'Des fiches similaires ne sont pas de la copie. Seule la reproduction de votre design spécifique est une violation.',
    },
    {
      question: 'Puis-je vendre avec des polices et cliparts gratuits ?',
      answer: 'Oui, si la licence commerciale est explicite. Google Fonts sont toutes libres d\'utilisation commerciale.',
    },
  ],
  internalLinks: [
    { pageType: 'app', slug: 'addition-worksheets', anchorText: 'Générateur de fiches d\'addition' },
    { pageType: 'start', slug: 'complete-guide-printable-business', anchorText: 'Guide complet' },
    { pageType: 'guide', slug: 'copyright-printable-sellers', anchorText: 'Guide droit d\'auteur' },
  ],
  relatedPosts: [
    { slug: 'commercial-license-printables-explained', title: 'Licences commerciales' },
    { slug: 'printable-business-mistakes-avoid', title: 'Erreurs à éviter' },
    { slug: 'printable-business-income-realistic', title: 'Revenus réalistes' },
  ],
  cta: {
    heading: 'Créez en toute légalité avec nos générateurs',
    description: '33 générateurs de fiches professionnelles. Essai gratuit avec filigrane — aucune inscription requise.',
    buttonText: 'Découvrir les générateurs',
    buttonUrl: '/apps',
  },
};

export default content;
