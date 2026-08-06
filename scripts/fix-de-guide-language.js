const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'frontend', 'config', 'guide-content', 'de');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts'));

// Order matters - longer/more specific patterns first
const replacements = [
  // Exact compound phrases first
  ['Teachers Pay Teachers', 'Gumroad'],
  ['Teachers-Pay-Teachers', 'Gumroad'],
  ['differenzierter Unterricht', 'gestufte Produktpakete'],
  ['differenzierten Unterricht', 'gestufte Produktpakete'],
  ['differenziertem Unterricht', 'gestufte Produktpakete'],
  ['differenziertes Unterrichtsangebot', 'gestuftes Produktangebot'],

  // Schuelername patterns
  ['Schülernamen-', 'Namens-'],
  ['Schülernamens-', 'Namens-'],
  ['Schülernamen', 'Namen'],
  ['Schülername', 'Name'],

  // Vorschueler -> Vorschulmarkt/Vorschul-Nische
  ['Vorschülern', 'den Vorschulmarkt'],
  ['Vorschüler', 'Vorschulmarkt'],

  // Kindergaertner
  ['Kindergärtnern', 'den Kindergartenmarkt'],
  ['Kindergärtner', 'Kindergartenmarkt'],

  // Grundschueler/Erstklaessler/Zweitklaessler/Drittklaessler
  ['Grundschülern', 'den K-2-Produktmarkt'],
  ['Grundschüler', 'K-2-Produktmarkt'],
  ['Erstklässlern', 'den Erstklassmarkt'],
  ['Erstklässler', 'Erstklassmarkt'],
  ['Zweitklässlern', 'den Zweitklassmarkt'],
  ['Zweitklässler', 'Zweitklassmarkt'],
  ['Drittklässlern', 'den Drittklassmarkt'],
  ['Drittklässler', 'Drittklassmarkt'],

  // Lehrermarktplatz
  ['Lehrermarktplätzen', 'Gumroad'],
  ['Lehrermarktplatzes', 'Gumroad'],
  ['Lehrermarktplatz', 'Gumroad'],

  // Lehrerausgaben
  ['Lehrerausgaben', 'Etsy-Pakete'],
  ['Lehrerausgabe', 'Etsy-Paket'],

  // Lehrmaterialien
  ['Lehrmaterialien', 'Druckprodukte'],
  ['Lehrmaterial', 'Druckprodukt'],

  // Lehrplan/Curriculum
  ['Lehrplananforderungen', 'Marktanforderungen'],
  ['lehrplanrelevante', 'marktrelevante'],
  ['lehrplanrelevanten', 'marktrelevanten'],
  ['Lehrplanrelevanz', 'Marktrelevanz'],
  ['Lehrplans', 'Produktkatalogs'],
  ['Lehrplan', 'Produktkatalog'],
  ['Curriculums', 'Produktkatalogs'],
  ['Curriculum', 'Produktkatalog'],

  // Korrekturzeit
  ['Korrekturzeit', 'wahrgenommenen Mehrwert'],

  // kindgerecht
  ['Kinderfreundliches', 'Leserfreundliches'],
  ['kinderfreundliche', 'leserfreundliche'],
  ['kinderfreundlichen', 'leserfreundlichen'],
  ['kinderfreundlicher', 'leserfreundlicher'],
  ['kinderfreundlich', 'leserfreundlich'],
  ['kindgerechte', 'ansprechende'],
  ['kindgerechten', 'ansprechenden'],
  ['kindgerechter', 'ansprechender'],
  ['kindgerechtes', 'ansprechendes'],
  ['kindgerecht', 'ansprechend'],

  // Nachhilfe
  ['Nachhilfeunterricht', 'Selbststudium'],
  ['Nachhilfe', 'Selbststudium'],

  // Paedagogen
  ['Pädagoginnen und Pädagogen', 'Käufer'],
  ['Pädagogen und Pädagoginnen', 'Käufer'],
  ['Pädagogen', 'Käufer'],
  ['Pädagoginnen', 'Käuferinnen'],
  ['pädagogischen', 'praktischen'],
  ['pädagogische', 'praktische'],
  ['pädagogischer', 'praktischer'],
  ['pädagogisches', 'praktisches'],
  ['pädagogischem', 'praktischem'],
  ['pädagogisch', 'praktisch'],

  // differenzierte (standalone, after compound phrases)
  ['differenzierten', 'gestuften'],
  ['differenzierte', 'gestufte'],
  ['differenziertes', 'gestuftes'],
  ['differenzierter', 'gestufter'],
  ['Differenzierung', 'Abstufung'],
  ['differenziert', 'gestuft'],

  // Klassenzimmer
  ['Klassenzimmer-Einsatz', 'Einsatz im Bildungsmarkt'],
  ['Klassenzimmereinsatz', 'Bildungsmarkt-Einsatz'],
  ['Klassenzimmernutzung', 'Bildungsmarkt-Nutzung'],
  ['Klassenzimmer-Arbeitsblätter', 'Bildungsmarkt-Arbeitsblätter'],
  ['Klassenzimmerprodukte', 'Bildungsmarkt-Produkte'],
  ['Klassenzimmer-Gebrauch', 'Bildungsmarkt-Gebrauch'],
  ['Klassenzimmers', 'Shops'],
  ['Klassenzimmern', 'Shops'],
  ['Klassenzimmer', 'Bildungsmarkt'],
  ['Klassenraum-Arbeitsblätter', 'Bildungsmarkt-Arbeitsblätter'],
  ['Klassenraumeinsatz', 'Bildungsmarkt-Einsatz'],
  ['Klassenräumen', 'Shops'],
  ['Klassenraum', 'Bildungsmarkt'],

  // Unterricht
  ['Unterrichtsgebrauch', 'Bildungsmarkt-Gebrauch'],
  ['Unterrichtsmaterialien', 'Druckprodukte'],
  ['Unterrichtsmaterial', 'Druckprodukt'],
  ['Unterrichtseinsatz', 'Bildungsmarkt-Einsatz'],
  ['Unterrichtsnutzung', 'Bildungsmarkt-Nutzung'],
  ['Unterrichtssituation', 'Produktnutzung'],
  ['Unterrichtskontext', 'Produktkontext'],
  ['Unterrichtsarbeit', 'Produktarbeit'],
  ['Unterrichtseinheiten', 'Produktpakete'],
  ['Unterrichtseinheit', 'Produktpaket'],
  ['Unterrichtsstunden', 'Produktpakete'],
  ['Unterrichtsstunde', 'Produktpaket'],
  ['Unterrichtsressourcen', 'Druckprodukte'],
  ['Unterrichtsressource', 'Druckprodukt'],
  ['Unterrichtspraxis', 'Produktpraxis'],
  ['Unterrichtsplanung', 'Produktplanung'],
  ['Unterrichtszwecke', 'Bildungszwecke'],
  ['Unterrichtsthemen', 'Produktthemen'],
  ['Unterrichtsthema', 'Produktthema'],
  ['Unterrichts', 'Produkterstellungs'],
  ['Unterricht', 'Produkterstellung'],

  // Lehrer/Lehrkraefte (AFTER all Lehrer* compounds)
  ['Lehrkräften', 'Käufern'],
  ['Lehrkräfte-', 'Käufer-'],
  ['Lehrkräfte', 'Käufer'],
  ['Lehrern', 'Käufern'],
  ['Lehrerseite', 'Käuferseite'],
  ['Lehrers', 'Käufers'],
  ['Lehrer', 'Käufer'],

  // Schueler (AFTER Schuelername compounds)
  ['Schülerinnen und Schüler', 'Nutzer'],
  ['Schülern', 'Nutzern'],
  ['Schülers', 'Nutzers'],
  ['Schüler', 'Nutzer'],
];

let totalReplacements = 0;
let fileChanges = {};

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;
  let fileCount = 0;

  for (const [search, replace] of replacements) {
    const count = content.split(search).length - 1;
    if (count > 0) {
      fileCount += count;
      content = content.split(search).join(replace);
    }
  }

  // Handle TPT/TpT - only standalone (not in slugs like 'create-sell-tpt-resources')
  const tptRegex = /(?<![a-z\-\/'])TpT(?![a-z\-\/'])/g;
  let m = content.match(tptRegex);
  if (m) { fileCount += m.length; content = content.replace(tptRegex, 'Gumroad'); }

  const TPTRegex = /(?<![a-z\-\/'])TPT(?![a-z\-\/'])/g;
  m = content.match(TPTRegex);
  if (m) { fileCount += m.length; content = content.replace(TPTRegex, 'Gumroad'); }

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    totalReplacements += fileCount;
    fileChanges[file] = fileCount;
  }
}

console.log('Total replacements:', totalReplacements);
console.log('Files changed:', Object.keys(fileChanges).length);
for (const [f, c] of Object.entries(fileChanges)) {
  console.log(`  ${f}: ${c}`);
}
