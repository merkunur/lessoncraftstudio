const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '..', 'frontend', 'config', 'blog-content', 'fr');

let created = 0;
function w(f, c) {
  const fp = path.join(dir, f);
  if (fs.existsSync(fp)) { return; }
  fs.writeFileSync(fp, c, 'utf8');
  created++;
}

// Helper: generates a complete blog file
function mk(filename, p) {
  const secs = p.sections.map(s => `    {
      heading: '${s.h}',
      content: '${s.c}',
    }`).join(',\n');

  const faqs = p.faq.map(f => `    {
      question: '${f.q}',
      answer: '${f.a}',
    }`).join(',\n');

  const ils = p.il.map(l => `    { pageType: '${l[0]}', slug: '${l[1]}', anchorText: '${l[2]}' }`).join(',\n');
  const rps = p.rp.map(r => `    { slug: '${r[0]}', title: '${r[1]}' }`).join(',\n');
  const kts = p.kt.map(k => `    '${k}'`).join(',\n');
  const sks = p.sk.map(k => `      '${k}'`).join(',\n');
  const lsis = p.lsi.map(k => `      '${k}'`).join(',\n');

  const content = `import type { BlogContent } from '../types';

const content: BlogContent = {
  seo: {
    primaryKeyword: '${p.pk}',
    secondaryKeywords: [
${sks},
    ],
    lsiKeywords: [
${lsis},
    ],
    titleTag: '${p.tt}',
    metaDescription: '${p.md}',
  },
  hero: {
    title: '${p.ht}',
    tagline: '${p.tl}',
    description: '${p.desc}',
  },
  category: '${p.cat}',
  introduction: '${p.intro}',
  sections: [
${secs},
  ],
  keyTakeaways: [
${kts},
  ],
  faq: [
${faqs},
  ],
  internalLinks: [
${ils},
  ],
  relatedPosts: [
${rps},
  ],
  cta: {
    heading: '${p.ctaH}',
    description: '${p.ctaD}',
    buttonText: '${p.ctaB}',
    buttonUrl: '/apps',
  },
};

export default content;
`;
  w(filename, content);
}

// ===== PLATFORM-STRATEGY (remaining 8) =====

mk('printable-business-mistakes-avoid.ts', {
  pk: 'erreurs vendeurs imprimables \\u00E0 \\u00E9viter',
  sk: ['pi\\u00E8ges d\\u00E9butant vente fiches', 'fautes courantes boutique Etsy imprimables', 'erreurs activit\\u00E9 imprimables'],
  lsi: ['\\u00E9checs vendeurs fiches', 'probl\\u00E8mes boutique Etsy d\\u00E9butant', 'conseils \\u00E9viter erreurs'],
  tt: '10 erreurs d\\'imprimables \\u00E0 \\u00E9viter | LCS', md: 'Les 10 erreurs les plus courantes des vendeurs d\\'imprimables et comment les corriger rapidement.',
  ht: '10 erreurs que chaque vendeur d\\'imprimables fait', tl: 'Apprenez des erreurs des autres',
  desc: 'Chaque vendeur d\\'imprimables fait les m\\u00EAmes erreurs au d\\u00E9but. Sous-estimer le volume, n\\u00E9gliger le SEO, fixer des prix trop bas, ignorer Pinterest. Ces erreurs co\\u00FBtent des mois de progression. Ce guide identifie les 10 erreurs les plus fr\\u00E9quentes et comment les corriger avant qu\\'elles ne plombent votre activit\\u00E9.',
  cat: 'platform-strategy',
  intro: 'Apr\\u00E8s avoir accompagn\\u00E9 des centaines de vendeurs d\\'imprimables, les m\\u00EAmes erreurs reviennent syst\\u00E9matiquement. La bonne nouvelle : elles sont toutes corrigeables.',
  sections: [
    {h:'Erreurs de d\\u00E9marrage', c:'**Erreur 1 \\u2014 Trop peu de fiches :** Publier 5-10 fiches et attendre. L\\'algorithme Etsy ignore les boutiques avec moins de 20 fiches. Visez 30 minimum.\\n\\n**Erreur 2 \\u2014 Prix trop bas :** Vendre \\u00E0 0,99 \\u20AC attire des acheteurs peu engag\\u00E9s. Minimum 2,49 \\u20AC pour les fiches individuelles.\\n\\n**Erreur 3 \\u2014 Photos plates :** Les captures d\\'\\u00E9cran ne vendent pas. Utilisez des mockups r\\u00E9alistes.'},
    {h:'Erreurs marketing', c:'**Erreur 4 \\u2014 Ignorer le SEO :** Des titres vagues comme \\u00AB Fiche addition \\u00BB au lieu de \\u00AB Fiches Addition CP CE1 30 Exercices PDF A4 \\u00BB. Utilisez les 140 caract\\u00E8res.\\n\\n**Erreur 5 \\u2014 Oublier Pinterest :** Pinterest g\\u00E9n\\u00E8re plus de trafic gratuit que tout autre r\\u00E9seau social pour les imprimables.\\n\\n**Erreur 6 \\u2014 Pas de bundles :** Les bundles multiplient votre panier moyen.'},
    {h:'Erreurs de qualit\\u00E9', c:'**Erreur 7 \\u2014 Erreurs dans le contenu :** Des fautes de calcul ou d\\'orthographe. Un seul avis n\\u00E9gatif peut plomber votre boutique. Utilisez des g\\u00E9n\\u00E9rateurs v\\u00E9rifi\\u00E9s.\\n\\n**Erreur 8 \\u2014 Pas de corrig\\u00E9s :** Les enseignants et parents veulent des corrig\\u00E9s. Pas de corrig\\u00E9 = ventes perdues.'},
    {h:'Erreurs de mentalit\\u00E9', c:'**Erreur 9 \\u2014 Abandonner trop t\\u00F4t :** 80 % des boutiques sont abandonn\\u00E9es en 3 mois. La rentabilit\\u00E9 arrive au mois 4-6. Engagez-vous pour 6 mois minimum.\\n\\n**Erreur 10 \\u2014 Perfectionner au lieu de publier :** Un produit imparfait en ligne rapporte plus qu\\'un produit parfait jamais publi\\u00E9. Publiez d\\'abord, am\\u00E9liorez ensuite.'},
    {h:'Plan de correction en 4 semaines', c:'**Semaine 1 :** Cr\\u00E9ez et publiez 15 nouvelles fiches\\n**Semaine 2 :** Optimisez les titres et tags de toutes vos fiches\\n**Semaine 3 :** Cr\\u00E9ez 3 bundles \\u00E0 partir des fiches existantes\\n**Semaine 4 :** Configurez Pinterest et \\u00E9pinglez tout votre catalogue\\n\\nCe plan corrige les erreurs les plus courantes. Vous verrez des r\\u00E9sultats d\\u00E8s le mois suivant.'},
  ],
  kt: ['30 fiches minimum pour que l\\'algorithme vous prenne au s\\u00E9rieux','Ne bradez jamais : 2,49 \\u20AC minimum pour les fiches individuelles','Les mockups augmentent le CTR de 200-300 %','Pinterest est votre meilleur canal marketing gratuit','Engagez-vous pour 6 mois minimum'],
  faq: [
    {q:'Quelle est l\\'erreur la plus grave ?', a:'Abandonner trop t\\u00F4t. Toutes les autres erreurs sont corrigeables. Si vous arr\\u00EAtez au bout de 2 mois, vous ne verrez jamais les r\\u00E9sultats.'},
    {q:'Combien de temps pour corriger ces erreurs ?', a:'Environ 4 semaines d\\'effort concentr\\u00E9. Vous verrez des am\\u00E9liorations d\\u00E8s le mois suivant.'},
    {q:'Faut-il tout recommencer ?', a:'Non. Corrigez progressivement. Ajoutez des fiches, optimisez les titres, cr\\u00E9ez des bundles.'},
  ],
  il: [['app','mots-caches-fiches','G\\u00E9n\\u00E9rateur de mots cach\\u00E9s'],['start','guide-complet-activite-imprimables','Guide complet imprimables'],['guide','eviter-erreurs-imprimables','Guide anti-erreurs']],
  rp: [['etsy-printable-shop-first-month','Premier mois sur Etsy'],['how-many-listings-etsy-success','Combien de fiches pour r\\u00E9ussir'],['etsy-seo-printable-sellers-2026','SEO Etsy 2026']],
  ctaH: '\\u00C9vitez les erreurs avec nos g\\u00E9n\\u00E9rateurs v\\u00E9rifi\\u00E9s',
  ctaD: 'Contenu p\\u00E9dagogique correct garanti. 33 g\\u00E9n\\u00E9rateurs. Essai gratuit avec filigrane.',
  ctaB: 'Essayer maintenant',
});

console.log('Test: printable-business-mistakes-avoid');
