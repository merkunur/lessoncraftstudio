const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'frontend', 'config', 'guide-content', 'de');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts'));

const replacements = [
  // Klassenstufe compounds first (longer first)
  ['Klassenstufenzuordnung', 'Altersgruppenzuordnung'],
  ['Klassenstufenteams', 'Altersgruppenteams'],
  ['Klassenstufenpakete', 'Altersgruppenpakete'],
  ['Klassenstufenindikator', 'Altersgruppenindikator'],
  ['Klassenstufenindikatoren', 'Altersgruppenindikatoren'],
  ['Klassenstufenfokus', 'Altersgruppenfokus'],
  ['Klassenstufenerweiterungen', 'Altersgruppenerweiterungen'],
  ['Klassenstufenbezeichnung', 'Altersgruppenbezeichnung'],
  ['Klassenstufenbündel', 'Altersgruppenbündel'],
  ['Klassenstufenbereiche', 'Altersgruppenbereiche'],
  ['Klassenstufenbereich', 'Altersgruppenbereich'],
  ['Klassenstufenabdeckung', 'Altersgruppenabdeckung'],
  ['Klassenstufenangaben', 'Altersgruppenangaben'],
  ['klassenstufengerechte', 'altersgruppengerechte'],
  ['Klassenstufen-Indikator', 'Altersgruppen-Indikator'],
  ['Klassenstufen-Filterung', 'Altersgruppen-Filterung'],
  ['Klassenstufen', 'Altersgruppen'],
  ['Klassenstufe', 'Altersgruppe'],

  // Capitalized Paedagog variants (missed by first pass)
  ['Pädagogisches', 'Praktisches'],
  ['Pädagogische', 'Praktische'],
  ['Pädagogischen', 'Praktischen'],
  ['Pädagogischer', 'Praktischer'],
  ['Pädagogischem', 'Praktischem'],
  ['Pädagogisch', 'Praktisch'],
  ['Pädagoge', 'Käufer'],

  // TPT inside content - broader replacement (not in slugs)
  // We'll handle with regex below

  // pädagogenspezifisches
  ['pädagogenspezifisches', 'käuferspezifisches'],
  ['pädagogenspezifische', 'käuferspezifische'],

  // lehrplanorientierte
  ['lehrplanorientierte', 'marktorientierte'],
  ['lehrplanorientierten', 'marktorientierten'],

  // unterrichtsfertigen
  ['unterrichtsfertigen', 'sofort einsetzbaren'],
  ['unterrichtsfertige', 'sofort einsetzbare'],
  ['unterrichtsfertiges', 'sofort einsetzbares'],

  // klassenzimmerorientierte (might have been partially replaced)
  ['klassenzimmerorientierte', 'bildungsmarktorientierte'],
  ['klassenzimmerorientierten', 'bildungsmarktorientierten'],
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

  // Replace TPT and TpT that appear in content strings (not in slug patterns)
  // Slug patterns: lowercase with hyphens like 'create-sell-tpt-resources' or 'tpt-store-optimization'
  // Content TPT: appears after spaces, quotes, punctuation, etc.
  // Strategy: replace all TPT/TpT, then restore slug patterns

  // First, save all slug-like patterns
  const slugPatterns = [];
  content = content.replace(/['"][a-z0-9-]*tpt[a-z0-9-]*['"]/gi, (match) => {
    // Only protect if it looks like a slug (lowercase with hyphens)
    if (/^['"][a-z0-9-]+['"]$/.test(match)) {
      const placeholder = `__SLUG_${slugPatterns.length}__`;
      slugPatterns.push(match);
      return placeholder;
    }
    return match;
  });

  // Now replace TPT/TpT in content
  const tptBefore = content;
  content = content.replace(/\bTPT\b/g, 'Gumroad');
  content = content.replace(/\bTpT\b/g, 'Gumroad');
  const tptCount = (tptBefore.match(/\bTPT\b/g) || []).length + (tptBefore.match(/\bTpT\b/g) || []).length;
  fileCount += tptCount;

  // Restore slug patterns
  for (let i = 0; i < slugPatterns.length; i++) {
    content = content.replace(`__SLUG_${i}__`, slugPatterns[i]);
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    totalReplacements += fileCount;
    console.log(`  ${file}: ${fileCount} replacements`);
  }
}

console.log('Total pass-2 replacements:', totalReplacements);
