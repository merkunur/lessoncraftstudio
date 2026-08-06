const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'frontend', 'config', 'guide-showcase-configs.ts');
let c = fs.readFileSync(file, 'utf8');

// All isNl -> English patterns that need isSv inserted before the English fallback
const replacements = [
  // hero subheading
  [`Maak prachtige \${d1.label.toLowerCase()} werkbladen waar je klanten van houden\`
        : \`Create stunning`, `Maak prachtige \${d1.label.toLowerCase()} werkbladen waar je klanten van houden\`
        : isSv
        ? \`Skapa fantastiska \${d1.label.toLowerCase()} arbetsblad som dina kunder kommer att \u00e4lska\`
        : \`Create stunning`],
  // hero alt texts
  ["isNl ? `${d1.label} werkblad voorbeeld 1` : `${d1.label} worksheet sample 1`", "isNl ? `${d1.label} werkblad voorbeeld 1` : isSv ? `${d1.label} arbetsblad exempel 1` : `${d1.label} worksheet sample 1`"],
  ["isNl ? `${d1.label} werkblad voorbeeld 2` : `${d1.label} worksheet sample 2`", "isNl ? `${d1.label} werkblad voorbeeld 2` : isSv ? `${d1.label} arbetsblad exempel 2` : `${d1.label} worksheet sample 2`"],
  ["isNl ? `${d1.label} werkblad voorbeeld 3` : `${d1.label} worksheet sample 3`", "isNl ? `${d1.label} werkblad voorbeeld 3` : isSv ? `${d1.label} arbetsblad exempel 3` : `${d1.label} worksheet sample 3`"],
  // tiered badge
  ["isNl ? 'Vaardigheidsniveaus' : 'Skill Levels'", "isNl ? 'Vaardigheidsniveaus' : isSv ? 'F\u00e4rdighetsniv\u00e5er' : 'Skill Levels'"],
  // tiered heading
  ["isNl ? 'Werkbladen voor elk niveau' : 'Worksheets for Every Level'", "isNl ? 'Werkbladen voor elk niveau' : isSv ? 'Arbetsblad f\u00f6r varje niv\u00e5' : 'Worksheets for Every Level'"],
  // tiered subheading
  ["isNl ? 'Drie moeilijkheidsniveaus voor gedifferentieerde inhoud' : 'Three difficulty tiers for differentiated content'", "isNl ? 'Drie moeilijkheidsniveaus voor gedifferentieerde inhoud' : isSv ? 'Tre sv\u00e5righetsniv\u00e5er f\u00f6r differentierat inneh\u00e5ll' : 'Three difficulty tiers for differentiated content'"],
  // tier names
  ["isNl ? 'Beginner' : 'Beginner'", "isNl ? 'Beginner' : isSv ? 'Nyb\u00f6rjare' : 'Beginner'"],
  ["isNl ? 'Ontdekker' : 'Explorer'", "isNl ? 'Ontdekker' : isSv ? 'Utforskare' : 'Explorer'"],
  ["isNl ? 'Expert' : 'Expert', gradientClass: 'from-amber", "isNl ? 'Expert' : isSv ? 'Expert' : 'Expert', gradientClass: 'from-amber"],
  // tier alt texts
  ["isNl ? `${d2.label} beginner werkblad` : `${d2.label} beginner worksheet`", "isNl ? `${d2.label} beginner werkblad` : isSv ? `${d2.label} nyb\u00f6rjararbetsblad` : `${d2.label} beginner worksheet`"],
  ["isNl ? `${d3.label} gemiddeld werkblad` : `${d3.label} intermediate worksheet`", "isNl ? `${d3.label} gemiddeld werkblad` : isSv ? `${d3.label} mellaniv\u00e5arbetsblad` : `${d3.label} intermediate worksheet`"],
  ["isNl ? `${d4.label} gevorderd werkblad` : `${d4.label} advanced worksheet`", "isNl ? `${d4.label} gevorderd werkblad` : isSv ? `${d4.label} avancerat arbetsblad` : `${d4.label} advanced worksheet`"],
  // trophy text
  ["isNl ? 'Professionele kwaliteit op elk moeilijkheidsniveau' : 'Professional quality at every difficulty level'", "isNl ? 'Professionele kwaliteit op elk moeilijkheidsniveau' : isSv ? 'Professionell kvalitet p\u00e5 varje sv\u00e5righetsniv\u00e5' : 'Professional quality at every difficulty level'"],
  // spotlight heading
  ["isNl ? 'Uitgelicht werkblad' : 'Featured Worksheet'", "isNl ? 'Uitgelicht werkblad' : isSv ? 'Utvalt arbetsblad' : 'Featured Worksheet'"],
  // spotlight tagline
  ["isNl ? 'Professioneel ontworpen materiaal' : 'Professionally designed material'", "isNl ? 'Professioneel ontworpen materiaal' : isSv ? 'Professionellt designat material' : 'Professionally designed material'"],
  // spotlight alt
  ["isNl ? `${d1.label} uitgelicht werkblad` : `${d1.label} featured worksheet`", "isNl ? `${d1.label} uitgelicht werkblad` : isSv ? `${d1.label} utvalt arbetsblad` : `${d1.label} featured worksheet`"],
  // gallery heading
  ["isNl ? 'Werkbladgalerij' : 'Worksheet Gallery'", "isNl ? 'Werkbladgalerij' : isSv ? 'Arbetsbladsgalleri' : 'Worksheet Gallery'"],
  // gallery subheading
  ["isNl ? 'Professioneel materiaal met aandacht voor detail' : 'Professional materials crafted with attention to detail'", "isNl ? 'Professioneel materiaal met aandacht voor detail' : isSv ? 'Professionellt material skapat med omsorg om detaljer' : 'Professional materials crafted with attention to detail'"],
  // gallery alt
  ["isNl ? `${d1.label} professioneel werkblad` : `${d1.label} professional worksheet`", "isNl ? `${d1.label} professioneel werkblad` : isSv ? `${d1.label} professionellt arbetsblad` : `${d1.label} professional worksheet`"],
  ["isNl ? `${d2.label} professioneel werkblad` : `${d2.label} professional worksheet`", "isNl ? `${d2.label} professioneel werkblad` : isSv ? `${d2.label} professionellt arbetsblad` : `${d2.label} professional worksheet`"],
  // answer key
  ["isNl ? 'Antwoordsleutel' : 'Answer Key'", "isNl ? 'Antwoordsleutel' : isSv ? 'Facit' : 'Answer Key'"],
  // gallery labels
  ["isNl ? 'Voorbeeld 1' : 'Sample 1'", "isNl ? 'Voorbeeld 1' : isSv ? 'Exempel 1' : 'Sample 1'"],
  ["isNl ? 'Voorbeeld 2' : 'Sample 2'", "isNl ? 'Voorbeeld 2' : isSv ? 'Exempel 2' : 'Sample 2'"],
  // answer key alt
  ["isNl ? `${d1.label} antwoordsleutel` : `${d1.label} answer key`", "isNl ? `${d1.label} antwoordsleutel` : isSv ? `${d1.label} facit` : `${d1.label} answer key`"],
];

let count = 0;
for (const [from, to] of replacements) {
  if (c.includes(from)) {
    c = c.replace(from, to);
    count++;
  } else {
    // Try without the exact match
    console.log('NOT FOUND:', from.substring(0, 60));
  }
}

fs.writeFileSync(file, c, 'utf8');
console.log(`Done. ${count} replacements made.`);

// Check how many isNl patterns remain without isSv following
const remaining = c.match(/isNl \?[^:]+: (?!isSv)[^i]/g);
console.log('Remaining isNl->English patterns (no isSv):', remaining ? remaining.length : 0);
