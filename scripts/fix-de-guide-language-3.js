const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'frontend', 'config', 'guide-content', 'de');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts'));

const replacements = [
  // Remaining Klassenstufe lowercase compounds
  ['klassenstufenspezifische', 'altersgruppenspezifische'],
  ['klassenstufenspezifischen', 'altersgruppenspezifischen'],
  ['klassenstufenbezogene', 'altersgruppenbezogene'],
  ['klassenstufenbasierte', 'altersgruppenbasierte'],
  ['klassenstufen', 'altersgruppen'],
  ['klassenstufe', 'altersgruppe'],

  // Remaining lehrplan lowercase compounds
  ['lehrplanspezifischer', 'marktspezifischer'],
  ['lehrplanspezifischen', 'marktspezifischen'],
  ['lehrplanspezifische', 'marktspezifische'],
  ['lehrplankonforme', 'marktkonforme'],
  ['lehrplankonformen', 'marktkonformen'],
  ['lehrplankonform', 'marktkonform'],
  ['lehrplanangepasster', 'marktangepasster'],
  ['lehrplanangepassten', 'marktangepassten'],
  ['lehrplanangepasstes', 'marktangepasstes'],
  ['lehrplanangepasste', 'marktangepasste'],
  ['lehrplanangepasst', 'marktangepasst'],
  ['lehrplangerechte', 'marktgerechte'],
  ['lehrplangerechten', 'marktgerechten'],
  ['lehrplanbezogenen', 'marktbezogenen'],
  ['lehrplanbezogene', 'marktbezogene'],
  ['lehrplanbasierter', 'marktbasierter'],
  ['lehrplannahe', 'marktnahe'],
  ['lehrplans', 'produktkatalogs'],
  ['lehrplan', 'produktkatalog'],

  // Remaining Klassenräume
  ['Klassenräume', 'Shops'],

  // Remaining unterricht lowercase compounds (these are from compound words)
  ['unterrichtstauglich', 'einsatzfertig'],
  ['unterrichtsfertig', 'einsatzfertig'],
  ['unterrichtsfertigen', 'sofort einsetzbaren'],
  ['unterrichtsfertige', 'sofort einsetzbare'],
  ['unterrichtseinheiten', 'produktpakete'],
  ['unterrichtsressourcen', 'druckprodukte'],
  ['unterrichtenden', 'kaufenden'],
  ['unterrichtet', 'eingesetzt'],
  ['unterrichten', 'einsetzen'],
  ['unterrichts', 'produkterstellungs'],
  ['unterricht', 'produkterstellung'],

  // Remaining pädagogen/pädagogik lowercase
  ['pädagogenspezifisches', 'käuferspezifisches'],
  ['pädagogenspezifische', 'käuferspezifische'],
  ['pädagogen', 'käufer'],
  ['pädagogik', 'praxis'],
];

let totalReplacements = 0;

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

  // Handle remaining TPT/TpT - protect slugs first
  const slugPatterns = [];
  content = content.replace(/['"][a-z0-9-]*tpt[a-z0-9-]*['"]/gi, (match) => {
    if (/^['"][a-z0-9-]+['"]$/.test(match)) {
      const placeholder = `__SLUG_${slugPatterns.length}__`;
      slugPatterns.push(match);
      return placeholder;
    }
    return match;
  });

  // Also protect URLs/paths containing tpt
  const urlPatterns = [];
  content = content.replace(/\/[a-z0-9-]*tpt[a-z0-9-]*/gi, (match) => {
    const placeholder = `__URL_${urlPatterns.length}__`;
    urlPatterns.push(match);
    return placeholder;
  });

  // Also protect Gumroad-Store (already replaced 'TPT-Store' type patterns in previous pass)
  // But we need to handle TPT- compound words
  const tptCompounds = [
    [/TPT-Verkäufer/g, 'Gumroad-Verkäufer'],
    [/TPT-Käufer/g, 'Gumroad-Käufer'],
    [/TPT-Shop/g, 'Gumroad-Shop'],
    [/TPT-Shops/g, 'Gumroad-Shops'],
    [/TPT-Eintrag/g, 'Gumroad-Eintrag'],
    [/TPT-Einträge/g, 'Gumroad-Einträge'],
    [/TPT-Produkt/g, 'Gumroad-Produkt'],
    [/TPT-Produkte/g, 'Gumroad-Produkte'],
    [/TPT-Vorschau/g, 'Gumroad-Vorschau'],
    [/TPT-Katalog/g, 'Gumroad-Katalog'],
    [/TPT-Beschreibung/g, 'Gumroad-Beschreibung'],
    [/TPT-Preis/g, 'Gumroad-Preis'],
    [/TPT-spezifisch/g, 'Gumroad-spezifisch'],
    [/TPT-Algorithmus/g, 'Gumroad-Algorithmus'],
    [/TpT-Verkäufer/g, 'Gumroad-Verkäufer'],
    [/TpT-Shop/g, 'Gumroad-Shop'],
    [/TpT-Käufer/g, 'Gumroad-Käufer'],
    [/TpT-Produkt/g, 'Gumroad-Produkt'],
    [/TpT-Eintrag/g, 'Gumroad-Eintrag'],
  ];

  for (const [regex, replace] of tptCompounds) {
    const m = content.match(regex);
    if (m) { fileCount += m.length; content = content.replace(regex, replace); }
  }

  // Now replace remaining standalone TPT/TpT
  let m = content.match(/\bTPT\b/g);
  if (m) { fileCount += m.length; content = content.replace(/\bTPT\b/g, 'Gumroad'); }
  m = content.match(/\bTpT\b/g);
  if (m) { fileCount += m.length; content = content.replace(/\bTpT\b/g, 'Gumroad'); }

  // Restore protected patterns
  for (let i = 0; i < urlPatterns.length; i++) {
    content = content.replace(`__URL_${i}__`, urlPatterns[i]);
  }
  for (let i = 0; i < slugPatterns.length; i++) {
    content = content.replace(`__SLUG_${i}__`, slugPatterns[i]);
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    totalReplacements += fileCount;
    console.log(`  ${file}: ${fileCount}`);
  }
}

console.log('Total pass-3 replacements:', totalReplacements);
