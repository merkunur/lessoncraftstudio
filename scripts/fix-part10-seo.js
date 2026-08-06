const fs = require('fs');
const path = require('path');

function updateFile(dir, file, pk, tt) {
  const fp = path.join(dir, file);
  let content = fs.readFileSync(fp, 'utf8');
  const lines = content.split('\n');

  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trimStart();
    if (pk && trimmed.startsWith('primaryKeyword:')) {
      // Escape apostrophes in the new value
      const escaped = pk.replace(/'/g, "\\'");
      lines[i] = "    primaryKeyword: '" + escaped + "',";
    }
    if (tt && trimmed.startsWith('titleTag:')) {
      const escaped = tt.replace(/'/g, "\\'");
      lines[i] = "    titleTag: '" + escaped + "',";
    }
  }

  fs.writeFileSync(fp, lines.join('\n'), 'utf8');
}

// === IDEA CONTENT (45 files) ===
const ideaDir = 'frontend/config/idea-content/fr';

const ideaUpdates = [
  // E1: Theme (8)
  ['farm-animals-printable-ideas.ts', 'imprimables animaux de la ferme à vendre', 'Imprimables ferme à vendre sur Etsy | LessonCraftStudio'],
  ['ocean-animals-printable-ideas.ts', 'imprimables animaux marins idées business', 'Imprimables animaux marins — Business | LessonCraftStudio'],
  ['safari-animals-printable-ideas.ts', 'imprimables animaux safari à vendre', 'Imprimables safari à vendre en ligne | LessonCraftStudio'],
  ['pets-printable-ideas.ts', 'imprimables animaux domestiques Etsy', 'Imprimables animaux de compagnie Etsy | LessonCraftStudio'],
  ['dinosaur-printable-ideas.ts', 'imprimables dinosaures idées business Etsy', 'Imprimables dinosaures — Idées business | LessonCraftStudio'],
  ['birds-printable-ideas.ts', 'imprimables oiseaux à vendre', 'Imprimables oiseaux à vendre en ligne | LessonCraftStudio'],
  ['insects-printable-ideas.ts', 'imprimables insectes idées business', 'Imprimables insectes — Idées business | LessonCraftStudio'],
  ['forest-animals-printable-ideas.ts', 'imprimables animaux de la forêt Etsy', 'Imprimables forêt à vendre sur Etsy | LessonCraftStudio'],
  // E2: Season (10)
  ['christmas-printable-ideas.ts', 'imprimables de Noël à vendre sur Etsy', 'Imprimables de Noël pour Etsy | LessonCraftStudio'],
  ['halloween-printable-ideas.ts', 'imprimables Halloween idées business', 'Imprimables Halloween — Idées business | LessonCraftStudio'],
  ['easter-printable-ideas.ts', 'imprimables de Pâques à vendre sur Etsy', 'Imprimables de Pâques pour Etsy | LessonCraftStudio'],
  ['valentines-day-printable-ideas.ts', 'imprimables Saint-Valentin à vendre', 'Imprimables Saint-Valentin à vendre | LessonCraftStudio'],
  ['back-to-school-printable-ideas.ts', 'imprimables rentrée scolaire à vendre Etsy', 'Imprimables rentrée scolaire Etsy | LessonCraftStudio'],
  ['summer-printable-ideas.ts', "imprimables d'été idées business", "Imprimables d'été — Idées business | LessonCraftStudio"],
  ['winter-printable-ideas.ts', "imprimables d'hiver à vendre sur Etsy", "Imprimables d'hiver pour Etsy | LessonCraftStudio"],
  ['spring-printable-ideas.ts', 'imprimables de printemps idées business', 'Imprimables printemps — Idées business | LessonCraftStudio'],
  ['thanksgiving-printable-ideas.ts', 'imprimables Action de grâces à vendre', 'Imprimables Action de grâces à vendre | LessonCraftStudio'],
  ['parents-day-printable-ideas.ts', 'imprimables fête des mères pères à vendre', 'Imprimables fête des parents à vendre | LessonCraftStudio'],
  // E3: Subject (10)
  ['space-printable-ideas.ts', 'imprimables espace à vendre sur Etsy', 'Imprimables espace pour Etsy | LessonCraftStudio'],
  ['transportation-printable-ideas.ts', 'imprimables transports idées business', 'Imprimables transports — Business | LessonCraftStudio'],
  ['food-cooking-printable-ideas.ts', 'imprimables alimentation à vendre Etsy', 'Imprimables alimentation pour Etsy | LessonCraftStudio'],
  ['sports-printable-ideas.ts', 'imprimables sports idées business', 'Imprimables sports — Idées business | LessonCraftStudio'],
  ['music-printable-ideas.ts', 'imprimables musique à vendre', 'Imprimables musique à vendre | LessonCraftStudio'],
  ['construction-printable-ideas.ts', 'imprimables chantier à vendre', 'Imprimables chantier à vendre | LessonCraftStudio'],
  ['pirates-printable-ideas.ts', 'imprimables pirates idées business', 'Imprimables pirates — Idées business | LessonCraftStudio'],
  ['fairy-tale-printable-ideas.ts', 'imprimables contes de fées à vendre Etsy', 'Imprimables contes de fées pour Etsy | LessonCraftStudio'],
  ['camping-printable-ideas.ts', 'imprimables camping idées business', 'Imprimables camping — Idées business | LessonCraftStudio'],
  ['underwater-printable-ideas.ts', 'imprimables sous-marins à vendre', 'Imprimables sous-marins à vendre | LessonCraftStudio'],
  // E4: Age (10)
  ['preschool-printable-ideas.ts', 'imprimables maternelle à vendre sur Etsy', 'Imprimables maternelle pour Etsy | LessonCraftStudio'],
  ['kindergarten-printable-ideas.ts', 'imprimables grande section idées business', 'Imprimables grande section — Business | LessonCraftStudio'],
  ['first-grade-printable-ideas.ts', 'imprimables CP à vendre sur Etsy', 'Imprimables CP à vendre sur Etsy | LessonCraftStudio'],
  ['second-grade-printable-ideas.ts', 'imprimables CE1 idées business', 'Imprimables CE1 — Idées business | LessonCraftStudio'],
  ['third-grade-printable-ideas.ts', 'imprimables CE2 CM1 à vendre', 'Imprimables CE2/CM1 à vendre | LessonCraftStudio'],
  ['homeschool-printable-ideas.ts', 'imprimables IEF instruction à domicile vendre', 'Imprimables IEF à vendre sur Etsy | LessonCraftStudio'],
  ['special-education-printable-ideas.ts', 'imprimables éducation spécialisée à vendre', 'Imprimables éducation spécialisée | LessonCraftStudio'],
  ['esl-printable-ideas.ts', 'imprimables FLE français langue étrangère business', 'Imprimables FLE — Idées business | LessonCraftStudio'],
  ['summer-learning-printable-ideas.ts', 'cahiers de vacances à vendre sur Etsy', 'Cahiers de vacances à vendre sur Etsy | LessonCraftStudio'],
  ['math-facts-printable-ideas.ts', 'tables de multiplication imprimables business', 'Tables de multiplication — Business | LessonCraftStudio'],
  // E5: Format (7)
  ['subscription-box-printable-ideas.ts', "box d'imprimables par abonnement idées", "Box d'imprimables par abonnement | LessonCraftStudio"],
  ['print-on-demand-printable-ideas.ts', 'impression à la demande fiches business', 'Impression à la demande — Business | LessonCraftStudio'],
  ['digital-download-printable-ideas.ts', 'téléchargements numériques business idées', 'Business téléchargements numériques | LessonCraftStudio'],
  ['physical-printable-product-ideas.ts', 'produits imprimés physiques business', 'Produits imprimés physiques — Business | LessonCraftStudio'],
  ['party-supply-printable-ideas.ts', 'imprimables anniversaire fêtes business', 'Imprimables fêtes — Idées business | LessonCraftStudio'],
  ['custom-worksheet-service-ideas.ts', 'service de création de fiches business', 'Service création de fiches — Business | LessonCraftStudio'],
  ['bulk-licensing-printable-ideas.ts', 'licence en volume imprimables business', 'Licence en volume — Imprimables | LessonCraftStudio'],
];

let ideaCount = 0;
for (const [file, pk, tt] of ideaUpdates) {
  updateFile(ideaDir, file, pk, tt);
  ideaCount++;
}
console.log('Idea files updated: ' + ideaCount);

// === START CONTENT (12 files) ===
const startDir = 'frontend/config/start-content/fr';

const startUpdates = [
  ['complete-guide-printable-business.ts', "comment lancer un business d'imprimables 2026", "Lancer un business d'imprimables (2026) | LessonCraftStudio"],
  ['create-worksheets-that-sell.ts', 'créer des fiches qui se vendent', 'Créer des fiches qui se vendent | LessonCraftStudio'],
  ['printable-business-blueprint.ts', "plan d'action business d'imprimables", "Plan d'action : business d'imprimables | LessonCraftStudio"],
  ['etsy-printable-business.ts', 'masterclass business Etsy imprimables', 'Masterclass Etsy imprimables | LessonCraftStudio'],
  ['amazon-kdp-activity-books.ts', "business cahiers d'activités Amazon KDP", "Business cahiers d'activités KDP | LessonCraftStudio"],
  ['create-multilingual-worksheets.ts', 'créer des fiches multilingues à vendre', 'Fiches multilingues à vendre | LessonCraftStudio'],
  ['commercial-license-guide.ts', "licence commerciale pour vendeurs d'imprimables", 'Licence commerciale pour vendeurs | LessonCraftStudio'],
  ['printable-business-income.ts', 'combien peut-on gagner avec des imprimables', 'Combien gagner avec des imprimables | LessonCraftStudio'],
  ['tools-for-printable-business.ts', "outils essentiels business d'imprimables", 'Outils essentiels business imprimables | LessonCraftStudio'],
  ['marketing-printable-business.ts', "promouvoir son business d'imprimables en ligne", "Promouvoir son business d'imprimables | LessonCraftStudio"],
  ['scaling-printable-business.ts', 'du complément de revenus au business à temps plein', 'Du complément au business à temps plein | LessonCraftStudio'],
  ['printable-business-legal.ts', "statut juridique business d'imprimables France", "Business d'imprimables : statut juridique | LessonCraftStudio"],
];

let startCount = 0;
for (const [file, pk, tt] of startUpdates) {
  updateFile(startDir, file, pk, tt);
  startCount++;
}
console.log('Start files updated: ' + startCount);
console.log('Total: ' + (ideaCount + startCount) + ' files');
