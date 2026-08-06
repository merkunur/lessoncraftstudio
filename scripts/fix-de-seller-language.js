const fs = require('fs');
const path = require('path');

const dirs = [
  'C:/Users/rkgen/lessoncraftstudio/frontend/config/app-content/de',
  'C:/Users/rkgen/lessoncraftstudio/frontend/config/tool-content/de',
];

// Ordered replacements - more specific patterns first
const replacements = [
  // Compound/specific phrases first
  ['Teachers Pay Teachers', 'Gumroad'],
  ['TPT-Shop', 'Gumroad-Shop'],
  ['TPT-Listing', 'Gumroad-Listing'],
  ['TPT-Listings', 'Gumroad-Listings'],
  ['TPT-Verkäufer', 'Gumroad-Verkäufer'],
  ['TPT-Ressource', 'Gumroad-Ressource'],
  ['TPT-Ressourcen', 'Gumroad-Ressourcen'],
  [/\bTPT\b/g, 'Gumroad'],

  // Multi-word phrases
  ['für Ihre eigenen Schüler', 'für Ihren eigenen Shop'],
  ['Klassenzimmer / Nachhilfe / Heimunterricht', 'Gumroad / Shopify / Eigener Shop'],
  ['Klassenzimmer, Nachhilfe und Heimunterricht', 'Gumroad, Shopify und eigenem Shop'],
  ['Klassenzimmer/Nachhilfe/Heimunterricht', 'Gumroad/Shopify/Eigener Shop'],
  ['Differenzierte Mathe-Stationen', 'Gestufte Schwierigkeitspakete'],
  ['differenzierter Unterricht', 'gestufte Produktpakete'],
  ['differenzierten Unterricht', 'gestufte Produktpakete'],
  ['differenziertem Unterricht', 'gestuften Produktpaketen'],
  ['Differenziertes Paket', 'Gestuftes Paket'],
  ['differenziertes Paket', 'gestuftes Paket'],
  ['Differenzierte Pakete', 'Gestufte Pakete'],
  ['differenzierte Pakete', 'gestufte Pakete'],
  ['differenzierten Pakete', 'gestuften Pakete'],
  ['differenziertem Paket', 'gestuftem Paket'],
  ['Differenzierte visuelle Lernstationen', 'Gestufte visuelle Lernpakete'],
  ['differenzierte Lernstationen', 'gestufte Lernpakete'],
  ['Differenzierte Arbeitsblätter', 'Gestufte Arbeitsblätter'],
  ['differenzierte Arbeitsblätter', 'gestufte Arbeitsblätter'],
  ['differenzierte Sets', 'gestufte Sets'],
  ['Differenzierte Sets', 'Gestufte Sets'],
  ['differenzierte Übung', 'gestufte Übung'],
  ['differenzierte Übungen', 'gestufte Übungen'],
  ['differenzierte Version', 'gestufte Version'],
  ['differenzierte Versionen', 'gestufte Versionen'],
  ['differenzierte Schwierigkeitsstufen', 'gestufte Schwierigkeitsstufen'],
  ['differenzierten Schwierigkeitsstufen', 'gestuften Schwierigkeitsstufen'],
  ['Differenziertes Lernen', 'Gestuftes Lernen'],
  ['differenziertes Lernen', 'gestuftes Lernen'],
  ['differenziertes Set', 'gestuftes Set'],
  ['Differenziertes Set', 'Gestuftes Set'],
  ['differenzierter Schwierigkeit', 'gestufter Schwierigkeit'],
  // Catch-all for remaining differenziert patterns
  [/differenziert(e[mnrs]?|er|es)?\b/g, (match) => match.replace(/differenziert/, 'gestuft')],

  // Lehrermarktplatz
  ['Lehrermarktplatz (lehrermarktplatz.de)', 'Gumroad'],
  ['auf Lehrermarktplatz', 'auf Gumroad'],
  ['auf dem Lehrermarktplatz', 'auf Gumroad'],
  ['Lehrermarktplatz oder', 'Gumroad oder'],
  ['Lehrermarktplatz und', 'Gumroad und'],
  ['Lehrermarktplatz,', 'Gumroad,'],
  ['Lehrermarktplatz.', 'Gumroad.'],
  ['Lehrermarktplatz', 'Gumroad'],

  // Lehrerausgaben
  ['Lehrerausgaben', 'Etsy-Pakete'],

  // Korrekturzeit
  ['Korrekturzeit', 'wahrgenommenen Mehrwert'],

  // Lehrplan / Curriculum
  ['Lehrplan-konform', 'marktgerecht'],
  ['lehrplankonform', 'marktgerecht'],
  ['Lehrplankonform', 'Marktgerecht'],
  ['Lehrplananforderungen', 'Marktanforderungen'],
  ['Lehrplananforderung', 'Marktanforderung'],
  ['Lehrplanvorgaben', 'Marktvorgaben'],
  ['Lehrplanstandards', 'Marktstandards'],
  ['Lehrplanziele', 'Produktziele'],
  ['Lehrplanbezug', 'Marktbezug'],
  ['Lehrplananbindung', 'Marktanbindung'],
  ['Lehrpläne', 'Produktkataloge'],
  ['Lehrplans', 'Produktkatalogs'],
  ['Lehrplan', 'Produktkatalog'],
  ['Curriculum', 'Produktkatalog'],

  // Unterrichtsthema
  ['Unterrichtsthemen', 'Produktthemen'],
  ['Unterrichtsthema', 'Produktthema'],

  // Unterrichtsmaterial / Unterrichtsmaterialien
  ['Unterrichtsmaterialien', 'Produktmaterialien'],
  ['Unterrichtsmaterial', 'Produktmaterial'],

  // Unterricht compound words
  ['Unterrichtseinheit', 'Produktreihe'],
  ['Unterrichtseinheiten', 'Produktreihen'],
  ['Unterrichtsplanung', 'Produktplanung'],
  ['Unterrichtseinsatz', 'Geschäftseinsatz'],
  ['Unterrichtsgestaltung', 'Produktgestaltung'],
  ['Unterrichtskontext', 'Geschäftskontext'],
  ['Unterrichtszwecke', 'Geschäftszwecke'],
  ['Unterrichtspraxis', 'Geschäftspraxis'],
  ['Unterrichtsideen', 'Produktideen'],
  ['Unterrichtsstunden', 'Produktionsrunden'],
  ['Unterrichtsstunde', 'Produktionsrunde'],
  ['Heimunterricht', 'Eigenem Shop'],
  ['im Unterricht', 'in der Produkterstellung'],
  ['den Unterricht', 'die Produkterstellung'],
  ['dem Unterricht', 'der Produkterstellung'],
  ['des Unterrichts', 'der Produkterstellung'],
  ['zum Unterricht', 'zur Produkterstellung'],
  ['für Unterricht', 'für Produkterstellung'],
  ['und Unterricht', 'und Produkterstellung'],
  ['Unterricht und', 'Produkterstellung und'],
  ['Unterricht', 'Produkterstellung'],

  // Nachhilfe
  ['Nachhilfe-', 'Geschäfts-'],
  ['Nachhilfe und', 'Geschäft und'],
  ['und Nachhilfe', 'und Geschäft'],
  ['Nachhilfe', 'Ihr Geschäft'],

  // Klassenzimmer compound words
  ['Klassenzimmer-Einsatz', 'Shop-Einsatz'],
  ['Klassenzimmereinsatz', 'Shop-Einsatz'],
  ['Klassenzimmer und', 'Shop und'],
  ['im Klassenzimmer', 'im Shop'],
  ['Klassenzimmer', 'Shop'],

  // Schülername
  ['Schülername', 'Name'],
  ['Schülernamen', 'Namen'],

  // Schüler - specific compound words first
  ['Schülerinnen und Schülern', 'Käufern'],
  ['Schülerinnen und Schüler', 'Käufer'],
  ['Schülerin und Schüler', 'Käufer'],
  ['Schülerin und jedem Schüler', 'Käufer'],
  ['jeder Schülerin', 'jedem Käufer'],
  ['Schülerarbeit', 'Käuferarbeit'],
  ['Schülerarbeiten', 'Käuferarbeiten'],
  ['Schülerleistung', 'Nutzerleistung'],
  ['Schülermotivation', 'Käufermotivation'],
  ['Schülerengagement', 'Käuferengagement'],
  ['Vorschüler', 'Vorschul-Nische'],
  ['fortgeschrittene Schüler', 'fortgeschrittene Nutzer'],
  ['jüngere Schüler', 'Einsteiger'],
  ['ältere Schüler', 'Fortgeschrittene'],
  ['alle Schüler', 'alle Nutzer'],
  ['die Schüler', 'die Nutzer'],
  ['den Schülern', 'den Nutzern'],
  ['der Schüler', 'der Nutzer'],
  ['den Schüler', 'den Nutzer'],
  ['dem Schüler', 'dem Nutzer'],
  ['des Schülers', 'des Nutzers'],
  ['Schülern', 'Nutzern'],
  ['Schülers', 'Nutzers'],
  ['Schüler', 'Nutzer'],

  // Lehrer / Lehrkräfte / Pädagogen
  ['Lehrkräfte und Eltern', 'Verkäufer und Shop-Betreiber'],
  ['Lehrkräfte können', 'Verkäufer können'],
  ['Lehrkräften', 'Verkäufern'],
  ['Lehrkräfte', 'Verkäufer'],
  ['Pädagoginnen und Pädagogen', 'Verkäufer und Shop-Betreiber'],
  ['Pädagogen', 'Verkäufer'],
  ['Pädagogin', 'Verkäuferin'],
  ['für Lehrer', 'für Verkäufer'],
  ['die Lehrer', 'die Verkäufer'],
  ['den Lehrern', 'den Verkäufern'],
  ['der Lehrer', 'der Verkäufer'],
  ['den Lehrer', 'den Verkäufer'],
  ['dem Lehrer', 'dem Verkäufer'],
  ['Lehrern', 'Verkäufern'],
  ['Lehrers', 'Verkäufers'],
  ['Lehrer', 'Verkäufer'],

  // Kindergärtner
  ['Kindergärtnern', 'Kindergartenmarkt'],
  ['Kindergärtner', 'Kindergartenmarkt'],

  // Erstklässler / Zweitklässler / Grundschüler
  ['Grundschülern', 'K-2-Produktmarkt'],
  ['Grundschüler', 'K-2-Produktmarkt'],
  ['Erstklässlern', 'K-2-Produktmarkt'],
  ['Erstklässler', 'K-2-Produktmarkt'],
  ['Zweitklässlern', 'K-2-Produktmarkt'],
  ['Zweitklässler', 'K-2-Produktmarkt'],
  ['Drittklässlern', 'K-3-Produktmarkt'],
  ['Drittklässler', 'K-3-Produktmarkt'],

  // kindgerecht
  ['kindgerechte', 'ansprechende'],
  ['kindgerechtem', 'ansprechendem'],
  ['kindgerechten', 'ansprechenden'],
  ['kindgerechter', 'ansprechender'],
  ['kindgerechtes', 'ansprechendes'],
  ['kindgerecht', 'ansprechend'],
];

let totalReplacements = 0;
let filesModified = 0;

for (const dir of dirs) {
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts'));

  for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    const original = content;
    let fileReplacements = 0;

    for (const [search, replace] of replacements) {
      if (search instanceof RegExp) {
        const matches = content.match(search);
        if (matches) {
          fileReplacements += matches.length;
          content = content.replace(search, replace);
        }
      } else {
        // Count occurrences
        let idx = 0;
        while (true) {
          idx = content.indexOf(search, idx);
          if (idx === -1) break;
          // Skip if inside an image-library path or slug reference
          const lineStart = content.lastIndexOf('\n', idx) + 1;
          const lineEnd = content.indexOf('\n', idx);
          const line = content.substring(lineStart, lineEnd === -1 ? content.length : lineEnd);
          if (line.includes('/image-library/') && (search === 'Klassenzimmer' || search === 'classroom')) {
            idx += search.length;
            continue;
          }
          fileReplacements++;
          idx += search.length;
        }
        content = content.split(search).join(replace);
      }
    }

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`${path.basename(dir)}/${file}: ${fileReplacements} replacements`);
      totalReplacements += fileReplacements;
      filesModified++;
    }
  }
}

console.log(`\nTotal: ${totalReplacements} replacements in ${filesModified} files`);
