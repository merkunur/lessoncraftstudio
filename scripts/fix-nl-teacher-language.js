const fs = require('fs');
const path = require('path');

const dirs = [
  'frontend/config/app-content/nl',
  'frontend/config/tool-content/nl',
  'frontend/config/guide-content/nl',
  'frontend/config/bundle-content/nl',
  'frontend/config/idea-content/nl',
  'frontend/config/start-content/nl',
];

const basePath = 'C:/Users/rkgen/lessoncraftstudio';

// Order matters - longer/more specific patterns first
const replacements = [
  // Multi-word phrases first (most specific)
  [/Teachers Pay Teachers/g, 'Gumroad'],
  [/Teachers pay Teachers/g, 'Gumroad'],
  [/teachers pay teachers/g, 'Gumroad'],

  // TPT-specific compound terms
  [/TPT-verkopersaccount/g, 'Gumroad-verkopersaccount'],
  [/TPT-verkoper(?=s)/g, 'Gumroad-verkoper'],
  [/TPT-verkoper\b/g, 'Gumroad-verkoper'],
  [/TPT-kopers/g, 'Gumroad-kopers'],
  [/TPT-winkels/g, 'Gumroad-winkels'],
  [/TPT-winkel/g, 'Gumroad-winkel'],
  [/TPT-zoekalgoritme/g, 'Gumroad-zoekalgoritme'],
  [/TPT-zoekresultaten/g, 'Gumroad-zoekresultaten'],
  [/TPT-leerkrachten/g, 'Gumroad-kopers'],
  [/TPT-Marktplaats/g, 'Gumroad-Marktplaats'],
  [/TPT-klaar/g, 'verkoopklaar'],
  [/TPT-Klaar/g, 'Verkoopklaar'],
  [/TPT-specifieke/g, 'platformspecifieke'],
  [/TPT-feed/g, 'Gumroad-feed'],
  [/TPT-vermeldingstitel/g, 'Gumroad-vermeldingstitel'],
  [/TPT-vermeldingen/g, 'Gumroad-vermeldingen'],
  [/TPT-tags/g, 'Gumroad-tags'],
  [/TPT-website/g, 'Gumroad-website'],
  [/TPT-shoppers/g, 'Gumroad-kopers'],

  // "op TPT" phrases
  [/op TPT/g, 'op Gumroad'],
  [/voor TPT/g, 'voor Gumroad'],
  [/van TPT/g, 'van Gumroad'],
  [/bij TPT/g, 'bij Gumroad'],

  // Standalone TPT
  [/\bTPT\b/g, 'Gumroad'],
  [/\bTpT\b/g, 'Gumroad'],

  // "gedifferentieerd onderwijs" / "differentiatie" -> "getrapte productpakketten"
  [/gedifferentieerd onderwijs/gi, 'getrapte productpakketten'],
  [/differentiatiemogelijkheden/gi, 'opties voor getrapte productpakketten'],
  [/differentiatie/gi, 'getrapte productpakketten'],

  // "afdrukken in de klas" -> "afdrukken in volume"
  [/afdrukken in de klas/gi, 'afdrukken in volume'],

  // "in de klas" -> "online"
  [/in de klas\b/gi, 'online'],
  [/in het klaslokaal/gi, 'online'],

  // "voor leraren" / "voor docenten" / "voor leerkrachten" -> "voor verkopers"
  [/voor leraren/gi, 'voor verkopers'],
  [/voor docenten/gi, 'voor verkopers'],
  [/voor leerkrachten/gi, 'voor verkopers'],

  // "nakijktijd" / "correctietijd" -> "waargenomen waarde"
  [/nakijktijd/gi, 'waargenomen waarde'],
  [/correctietijd/gi, 'waargenomen waarde'],

  // "lesmateriaal" / "onderwijsmateriaal" -> "printbare producten"
  [/onderwijsmaterialen/gi, 'printbare producten'],
  [/onderwijsmateriaal/gi, 'printbare producten'],
  [/lesmaterialen/gi, 'printbare producten'],
  [/lesmateriaal/gi, 'printbare producten'],

  // "leerplan" / "curriculum" -> "productcatalogus"
  // Handle compound words first
  [/curriculumeenheden/gi, 'productpakketten'],
  [/curriculumspecialisten/gi, 'productspecialisten'],
  [/curriculumco\u00f6rdinatoren/gi, 'productcoördinatoren'],
  [/curriculum-afgestemde/gi, 'productgerichte'],
  [/curriculumbehoefte/gi, 'productbehoefte'],
  [/curriculum/gi, 'productcatalogus'],
  [/leerplan/gi, 'productcatalogus'],

  // Teacher-related terms -> seller terms
  // Compound forms first
  [/leerkrachtspecifieke/gi, 'verkoperspecifieke'],
  [/leerkrachtgids/gi, 'verkoopgids'],
  [/leerkrachtnotities/gi, 'verkopernotities'],
  [/leerkracht tot leerkracht/gi, 'verkoper tot koper'],
  [/leerkrachten/gi, 'verkopers'],
  [/leerkracht/gi, 'verkoper'],
  [/onderwijsprofessionals/gi, 'verkopers'],
  [/onderwijsprofessional/gi, 'verkoper'],
  [/onderwijservaring/gi, 'verkoopervaring'],
  [/onderwijsdoelen/gi, 'productdoelen'],
  [/onderwijspubliek/gi, 'koperspubliek'],
  [/onderwijs gerichte/gi, 'verkoop gerichte'],

  // pedagogen / opvoeders -> ondernemers
  [/pedagogen/gi, 'ondernemers'],
  [/opvoeders/gi, 'ondernemers'],

  // leraren / docenten (standalone)
  [/leraren/gi, 'verkopers'],
  [/leraar/gi, 'verkoper'],
  [/docenten/gi, 'verkopers'],
  [/docent/gi, 'verkoper'],

  // "leerlingen" / "studenten" -> "gebruikers" / "oplossers"
  [/leerlinginstructies/gi, 'gebruikersinstructies'],
  [/leerlingwerkbladen/gi, 'werkbladen'],
  [/leerlingervaring/gi, 'gebruikerservaring'],
  [/leerlingnaam/gi, 'naam'],
  [/naam leerling/gi, 'naam'],
  [/leerlingen/gi, 'gebruikers'],
  [/leerling/gi, 'gebruiker'],
  [/studenten/gi, 'gebruikers'],

  // "klaslokaal" / "klas" / "leslokaal"
  [/klaslokaal/gi, 'winkel'],
  [/klaslokalen/gi, 'winkels'],
  [/leslokaal/gi, 'winkel'],
  [/leslokalen/gi, 'winkels'],
  [/klasbehoeften/gi, 'productbehoeften'],
  [/klasfeedback/gi, 'klantfeedback'],
  [/klasbudget/gi, 'budget'],
  [/klasthema/gi, 'merkthema'],
  [/klasklaar/gi, 'verkoopklaar'],
  [/klassen/gi, 'productlijnen'],
  [/\b\u00e9\u00e9n klas\b/gi, 'één koper'],
  [/\bhele klas\b/gi, 'hele productlijn'],
  [/\bde klas\b/gi, 'de winkel'],
  [/\been klas\b/gi, 'een productlijn'],
  [/\bje klas\b/gi, 'je winkel'],

  // "kindvriendelijk" -> "leesbaar" / "duidelijk" / "aantrekkelijk"
  [/kindvriendelijke lettertypen/gi, 'leesbare lettertypen'],
  [/kindvriendelijke afdrukken/gi, 'aantrekkelijke afdrukken'],
  [/kindvriendelijke antwoordvak/gi, 'duidelijke antwoordvak'],
  [/kindvriendelijke/gi, 'aantrekkelijke'],
  [/kindvriendelijk/gi, 'aantrekkelijk'],

  // "kleuterschool" when about audience -> "kleutermarkt"
  [/kleuterschool tot groep/gi, 'kleuterniveau tot groep'],

  // Specific education terms
  [/speciaal onderwijs/gi, 'speciale producten'],
  [/groepsniveaustandaarden/gi, 'productstandaarden'],
  [/groepsniveau/gi, 'niveaucategorie'],
  [/groepsfocus/gi, 'nichefocus'],
  [/groepsbereik/gi, 'nichebereik'],

  // "kerndoelen" -> "productspecificaties"
  [/kerndoelen/gi, 'productspecificaties'],

  // "leerdoelen" -> "productdoelen"
  [/leerdoelen/gi, 'productdoelen'],

  // "huiswerk" -> "oefenmateriaal"
  [/huiswerk/gi, 'oefenmateriaal'],

  // "ochtendwerk" -> "oefenactiviteit"
  [/ochtendwerk/gi, 'oefenactiviteit'],

  // "rekenhoeken" -> "oefenactiviteiten"
  [/rekenhoeken/gi, 'oefenactiviteiten'],

  // "snelle werkers" -> "gevorderde gebruikers"
  [/snelle werkers/gi, 'gevorderde gebruikers'],

  // "beoordelingstools" -> "beoordelingsproducten"
  [/beoordelingstools/gi, 'beoordelingsproducten'],

  // "voorbereidingstijd" -> "productietijd"
  [/voorbereidingstijd/gi, 'productietijd'],
];

let totalFiles = 0;
let totalChanges = 0;
const changedFiles = [];

for (const dir of dirs) {
  const fullDir = path.join(basePath, dir);
  let files;
  try {
    files = fs.readdirSync(fullDir).filter(f => f.endsWith('.ts'));
  } catch (e) {
    console.log('Directory not found: ' + fullDir);
    continue;
  }

  for (const file of files) {
    const filePath = path.join(fullDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    const original = content;

    for (const [pattern, replacement] of replacements) {
      content = content.replace(pattern, replacement);
    }

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      const changes = countDifferences(original, content);
      totalChanges += changes;
      changedFiles.push({ file: path.relative(basePath, filePath).replace(/\\/g, '/'), changes });
    }
    totalFiles++;
  }
}

function countDifferences(a, b) {
  let count = 0;
  const aLines = a.split('\n');
  const bLines = b.split('\n');
  for (let i = 0; i < Math.max(aLines.length, bLines.length); i++) {
    if (aLines[i] !== bLines[i]) count++;
  }
  return count;
}

console.log('Processed ' + totalFiles + ' files');
console.log('Changed ' + changedFiles.length + ' files with ' + totalChanges + ' line changes');
console.log('\nChanged files:');
for (const f of changedFiles) {
  console.log('  ' + f.file + ': ' + f.changes + ' lines');
}
