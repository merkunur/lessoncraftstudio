const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'REFERENCE TRANSLATIONS', 'translations-more-less.js');
let content = fs.readFileSync(filePath, 'utf8');

const newKeys = {
  en: {
    "moreless.mode.checkcross": "Check & Cross Groups",
    "moreless.checkcross.title": "Check & Cross Groups",
    "moreless.checkcross.instruction": "Check the group that is more and cross that is less.",
    "moreless.checkcross.totalimages": "Total Images in Box (8-20):",
    "moreless.checkcross.hint": "Two different images are mixed in a box. Students check the group with more and cross the group with less.",
    "moreless.checkcross.theme.hint": "Two images will be randomly selected from this theme each time.",
    "moreless.checkcross.pick2": "Pick exactly 2 images",
    "moreless.checkcross.error.needtwoimages": "Check & Cross mode needs at least 2 different images."
  },
  de: {
    "moreless.mode.checkcross": "Gruppen ankreuzen & durchstreichen",
    "moreless.checkcross.title": "Gruppen ankreuzen & durchstreichen",
    "moreless.checkcross.instruction": "Kreuze die Gruppe an, die mehr hat, und streiche die durch, die weniger hat.",
    "moreless.checkcross.totalimages": "Gesamtanzahl der Bilder im Kasten (8-20):",
    "moreless.checkcross.hint": "Zwei verschiedene Bilder werden im Kasten gemischt. Sch\u00fcler kreuzen die gr\u00f6\u00dfere Gruppe an und streichen die kleinere durch.",
    "moreless.checkcross.theme.hint": "Zwei Bilder werden jedes Mal zuf\u00e4llig aus diesem Thema ausgew\u00e4hlt.",
    "moreless.checkcross.pick2": "W\u00e4hle genau 2 Bilder",
    "moreless.checkcross.error.needtwoimages": "Der Ankreuzmodus ben\u00f6tigt mindestens 2 verschiedene Bilder."
  },
  fr: {
    "moreless.mode.checkcross": "Cocher et barrer les groupes",
    "moreless.checkcross.title": "Cocher et barrer les groupes",
    "moreless.checkcross.instruction": "Coche le groupe qui a le plus et barre celui qui a le moins.",
    "moreless.checkcross.totalimages": "Nombre total d\u2019images dans le cadre (8-20) :",
    "moreless.checkcross.hint": "Deux images diff\u00e9rentes sont m\u00e9lang\u00e9es dans un cadre. Les \u00e9l\u00e8ves cochent le groupe le plus nombreux et barrent le moins nombreux.",
    "moreless.checkcross.theme.hint": "Deux images seront choisies au hasard dans ce th\u00e8me \u00e0 chaque fois.",
    "moreless.checkcross.pick2": "Choisissez exactement 2 images",
    "moreless.checkcross.error.needtwoimages": "Le mode cocher et barrer n\u00e9cessite au moins 2 images diff\u00e9rentes."
  },
  es: {
    "moreless.mode.checkcross": "Marcar y tachar grupos",
    "moreless.checkcross.title": "Marcar y tachar grupos",
    "moreless.checkcross.instruction": "Marca el grupo que tiene m\u00e1s y tacha el que tiene menos.",
    "moreless.checkcross.totalimages": "Total de im\u00e1genes en el recuadro (8-20):",
    "moreless.checkcross.hint": "Dos im\u00e1genes diferentes se mezclan en un recuadro. Los alumnos marcan el grupo con m\u00e1s y tachan el grupo con menos.",
    "moreless.checkcross.theme.hint": "Dos im\u00e1genes se seleccionar\u00e1n al azar de este tema cada vez.",
    "moreless.checkcross.pick2": "Selecciona exactamente 2 im\u00e1genes",
    "moreless.checkcross.error.needtwoimages": "El modo marcar y tachar necesita al menos 2 im\u00e1genes diferentes."
  },
  it: {
    "moreless.mode.checkcross": "Spunta e barra i gruppi",
    "moreless.checkcross.title": "Spunta e barra i gruppi",
    "moreless.checkcross.instruction": "Spunta il gruppo che ha di pi\u00f9 e barra quello che ha di meno.",
    "moreless.checkcross.totalimages": "Numero totale di immagini nel riquadro (8-20):",
    "moreless.checkcross.hint": "Due immagini diverse vengono mescolate in un riquadro. Gli studenti spuntano il gruppo pi\u00f9 numeroso e barrano quello meno numeroso.",
    "moreless.checkcross.theme.hint": "Due immagini verranno scelte casualmente da questo tema ogni volta.",
    "moreless.checkcross.pick2": "Scegli esattamente 2 immagini",
    "moreless.checkcross.error.needtwoimages": "La modalit\u00e0 spunta e barra richiede almeno 2 immagini diverse."
  },
  pt: {
    "moreless.mode.checkcross": "Marcar e riscar grupos",
    "moreless.checkcross.title": "Marcar e riscar grupos",
    "moreless.checkcross.instruction": "Marca o grupo que tem mais e risca o que tem menos.",
    "moreless.checkcross.totalimages": "Total de imagens na caixa (8-20):",
    "moreless.checkcross.hint": "Duas imagens diferentes s\u00e3o misturadas numa caixa. Os alunos marcam o grupo com mais e riscam o grupo com menos.",
    "moreless.checkcross.theme.hint": "Duas imagens ser\u00e3o selecionadas aleatoriamente deste tema a cada vez.",
    "moreless.checkcross.pick2": "Escolha exatamente 2 imagens",
    "moreless.checkcross.error.needtwoimages": "O modo marcar e riscar precisa de pelo menos 2 imagens diferentes."
  },
  nl: {
    "moreless.mode.checkcross": "Groepen aanvinken & doorstrepen",
    "moreless.checkcross.title": "Groepen aanvinken & doorstrepen",
    "moreless.checkcross.instruction": "Vink de groep aan die meer heeft en streep die door die minder heeft.",
    "moreless.checkcross.totalimages": "Totaal aantal afbeeldingen in het vak (8-20):",
    "moreless.checkcross.hint": "Twee verschillende afbeeldingen worden in een vak gemengd. Leerlingen vinken de grotere groep aan en strepen de kleinere door.",
    "moreless.checkcross.theme.hint": "Twee afbeeldingen worden elke keer willekeurig uit dit thema gekozen.",
    "moreless.checkcross.pick2": "Kies precies 2 afbeeldingen",
    "moreless.checkcross.error.needtwoimages": "De modus aanvinken en doorstrepen vereist minstens 2 verschillende afbeeldingen."
  },
  sv: {
    "moreless.mode.checkcross": "Bocka av och stryk grupper",
    "moreless.checkcross.title": "Bocka av och stryk grupper",
    "moreless.checkcross.instruction": "Bocka av gruppen som har flest och stryk den som har f\u00e4rst.",
    "moreless.checkcross.totalimages": "Totalt antal bilder i rutan (8-20):",
    "moreless.checkcross.hint": "Tv\u00e5 olika bilder blandas i en ruta. Eleverna bockar av gruppen med flest och stryker den med f\u00e4rst.",
    "moreless.checkcross.theme.hint": "Tv\u00e5 bilder v\u00e4ljs slumpvis fr\u00e5n detta tema varje g\u00e5ng.",
    "moreless.checkcross.pick2": "V\u00e4lj exakt 2 bilder",
    "moreless.checkcross.error.needtwoimages": "Bocka och stryk-l\u00e4get kr\u00e4ver minst 2 olika bilder."
  },
  da: {
    "moreless.mode.checkcross": "Afkryds og stryg grupper",
    "moreless.checkcross.title": "Afkryds og stryg grupper",
    "moreless.checkcross.instruction": "Afkryds gruppen, der har flest, og stryg den, der har f\u00e6rrest.",
    "moreless.checkcross.totalimages": "Samlet antal billeder i boksen (8-20):",
    "moreless.checkcross.hint": "To forskellige billeder blandes i en boks. Eleverne afkrydser gruppen med flest og stryger den med f\u00e6rrest.",
    "moreless.checkcross.theme.hint": "To billeder v\u00e6lges tilf\u00e6ldigt fra dette tema hver gang.",
    "moreless.checkcross.pick2": "V\u00e6lg pr\u00e6cis 2 billeder",
    "moreless.checkcross.error.needtwoimages": "Afkryds og stryg-tilstand kr\u00e6ver mindst 2 forskellige billeder."
  },
  no: {
    "moreless.mode.checkcross": "Kryss av og stryk grupper",
    "moreless.checkcross.title": "Kryss av og stryk grupper",
    "moreless.checkcross.instruction": "Kryss av gruppen som har flest, og stryk den som har f\u00e6rrest.",
    "moreless.checkcross.totalimages": "Totalt antall bilder i boksen (8-20):",
    "moreless.checkcross.hint": "To forskjellige bilder blandes i en boks. Elevene krysser av gruppen med flest og stryker den med f\u00e6rrest.",
    "moreless.checkcross.theme.hint": "To bilder velges tilfeldig fra dette temaet hver gang.",
    "moreless.checkcross.pick2": "Velg n\u00f8yaktig 2 bilder",
    "moreless.checkcross.error.needtwoimages": "Kryss av og stryk-modus krever minst 2 forskjellige bilder."
  },
  fi: {
    "moreless.mode.checkcross": "Rastita ja yliviivaa ryhm\u00e4t",
    "moreless.checkcross.title": "Rastita ja yliviivaa ryhm\u00e4t",
    "moreless.checkcross.instruction": "Rastita ryhm\u00e4, jossa on enemm\u00e4n, ja yliviivaa se, jossa on v\u00e4hemm\u00e4n.",
    "moreless.checkcross.totalimages": "Kuvien kokonaism\u00e4\u00e4r\u00e4 laatikossa (8-20):",
    "moreless.checkcross.hint": "Kaksi erilaista kuvaa sekoitetaan laatikossa. Oppilaat rastitvat ryhm\u00e4n, jossa on enemm\u00e4n, ja yliviivaavat sen, jossa on v\u00e4hemm\u00e4n.",
    "moreless.checkcross.theme.hint": "Kaksi kuvaa valitaan satunnaisesti t\u00e4st\u00e4 teemasta joka kerta.",
    "moreless.checkcross.pick2": "Valitse tarkalleen 2 kuvaa",
    "moreless.checkcross.error.needtwoimages": "Rastitus- ja yliviivaustilaesta tarvitsee v\u00e4hint\u00e4\u00e4n 2 erilaista kuvaa."
  }
};

const locales = ['en', 'de', 'fr', 'es', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];

// Process locales in reverse order so line positions don't shift
for (let li = locales.length - 1; li >= 0; li--) {
  const locale = locales[li];
  const keys = newKeys[locale];
  if (!keys) continue;

  // Build the new key lines with proper JSON escaping
  const newLines = Object.entries(keys).map(([key, value]) => {
    // Values already have proper unicode escapes from the source
    return `    "${key}": "${value}"`;
  }).join(',\n');

  // Find the locale block
  const localePattern = `"${locale}": {`;
  const localeStart = content.indexOf(localePattern);
  if (localeStart === -1) {
    console.log(`Warning: locale ${locale} not found`);
    continue;
  }

  // Find "sendToBack" within this locale's block - search from localeStart
  // Find the closing "  }," or "  }" for this locale
  let searchFrom = localeStart;
  let braceDepth = 0;
  let localeEnd = -1;
  for (let i = content.indexOf('{', localeStart); i < content.length; i++) {
    if (content[i] === '{') braceDepth++;
    if (content[i] === '}') {
      braceDepth--;
      if (braceDepth === 0) {
        localeEnd = i;
        break;
      }
    }
  }

  if (localeEnd === -1) {
    console.log(`Warning: could not find end of locale ${locale}`);
    continue;
  }

  // Find the last key line before the closing brace
  // Look backwards from localeEnd to find the last non-whitespace line
  const blockContent = content.substring(localeStart, localeEnd);
  const lastQuoteIdx = blockContent.lastIndexOf('"');

  // Find the end of the last key-value line
  const lastNewline = content.lastIndexOf('\n', localeEnd);

  // The last key line ends without a comma (it's the last key)
  // We need to add a comma after it, then add our new keys

  // Find the actual last key line
  const lines = content.substring(localeStart, localeEnd).split('\n');
  let lastKeyLineIdx = -1;
  for (let i = lines.length - 1; i >= 0; i--) {
    if (lines[i].trim().startsWith('"')) {
      lastKeyLineIdx = i;
      break;
    }
  }

  if (lastKeyLineIdx === -1) {
    console.log(`Warning: no keys found in locale ${locale}`);
    continue;
  }

  // Calculate the absolute position of the end of the last key line
  let pos = localeStart;
  for (let i = 0; i <= lastKeyLineIdx; i++) {
    pos += lines[i].length + 1; // +1 for newline
  }
  // pos now points to the character after the newline of the last key line

  // Go back to the end of the last key line (before newline)
  const lastKeyLineEnd = pos - 1;
  const lastKeyLineStart = content.lastIndexOf('\n', lastKeyLineEnd - 1) + 1;
  const lastKeyLine = content.substring(lastKeyLineStart, lastKeyLineEnd);

  // Add comma to last key if needed, then insert new keys
  if (!lastKeyLine.trimEnd().endsWith(',')) {
    // Add comma after the last key, then new keys on next line
    content = content.substring(0, lastKeyLineEnd) + ',' + '\n' + newLines + content.substring(lastKeyLineEnd);
  } else {
    // Already has comma, just add new keys
    content = content.substring(0, lastKeyLineEnd) + '\n' + newLines + content.substring(lastKeyLineEnd);
  }
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Translations added successfully!');

// Verify
const result = fs.readFileSync(filePath, 'utf8');
for (const locale of locales) {
  const count = (result.match(new RegExp(`moreless\\.checkcross\\.`, 'g')) || []).length;
}
// Count per locale
for (const locale of locales) {
  const localeStart = result.indexOf(`"${locale}": {`);
  let localeEnd = result.length;
  for (const next of locales) {
    if (next === locale) continue;
    const idx = result.indexOf(`"${next}": {`, localeStart + 10);
    if (idx > localeStart && idx < localeEnd) localeEnd = idx;
  }
  const block = result.substring(localeStart, localeEnd);
  const keys = (block.match(/moreless\.checkcross\./g) || []).length;
  const modeKey = block.includes('moreless.mode.checkcross');
  console.log(`  ${locale}: ${keys} checkcross keys, mode.checkcross: ${modeKey ? 'YES' : 'NO'}`);
}
