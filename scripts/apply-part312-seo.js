const fs = require('fs');
const path = require('path');

const base = 'C:/Users/rkgen/lessoncraftstudio/frontend/content/themes';
const BS = String.fromCharCode(92); // backslash char

function updateFile(dir, title, desc, keywords, heading) {
  const fp = path.join(base, dir, 'nl.ts');
  let content = fs.readFileSync(fp, 'utf8');
  const usesEscapes = content.includes(BS + 'u00');

  function encode(s) {
    if (!usesEscapes) return s;
    let r = '';
    for (let i = 0; i < s.length; i++) {
      const c = s.charCodeAt(i);
      if (c > 127) {
        r += BS + 'u' + c.toString(16).padStart(4, '0');
      } else {
        r += s[i];
      }
    }
    return r;
  }

  const t = encode(title);
  const d = encode(desc);
  const k = encode(keywords);
  const h = encode(heading);

  content = content.replace(/^(  title: ').*(',)\r?$/m, '$1' + t + '$2');
  content = content.replace(/^(  description: ').*(',)\r?$/m, '$1' + d + '$2');
  content = content.replace(/^(  keywords: ').*(',)\r?$/m, '$1' + k + '$2');
  content = content.replace(/^(  heading: ').*(',)\r?$/m, '$1' + h + '$2');

  fs.writeFileSync(fp, content, 'utf8');
  console.log('Updated: ' + dir + '/nl.ts (' + (usesEscapes ? 'escaped' : 'unicode') + ')');
}

// 15. seasons
updateFile('seasons',
  'Gratis Seizoenen-oefeningen voor Kinderen | LessonCraftStudio',
  'Uitprintbare seizoenen-oefeningen voor kinderen. Rekenen, kleurplaten, woordspellen en puzzels met seizoenenthema. Kleuterschool tot groep 5. Gratis PDF.',
  'seizoenen werkbladen, seizoenen kleurplaten, seizoenen rekenen, seizoenen kleuterschool, seizoenen uitprintbaar, seizoenen puzzels, seizoenen tellen, seizoenen kruiswoord, seizoenswisseling, taal en seizoenen',
  'Seizoensoefeningen en Werkbladen'
);

// 16. travel
updateFile('travel',
  'Gratis Vakanties-oefeningen voor Kinderen | LessonCraftStudio',
  'Uitprintbare vakanties-oefeningen voor kinderen. Rekenen, kleurplaten, woordspellen en puzzels met vakantiesthema. Kleuterschool tot groep 5. Gratis PDF.',
  'vakanties werkbladen, vakanties kleurplaten, vakanties rekenen, vakanties kleuterschool, vakanties uitprintbaar, vakanties puzzels, vakanties tellen, vakanties kruiswoord, feestdagen oefening, tradities kinderen',
  'Vakantieoefeningen en Werkbladen'
);

// 17. weather
updateFile('weather',
  'Gratis Weer-oefeningen voor Kinderen | LessonCraftStudio',
  'Uitprintbare weer-oefeningen voor kinderen. Rekenen, kleurplaten, woordspellen en puzzels met weerthema. Kleuterschool tot groep 5. Gratis PDF.',
  'weer werkbladen, weer kleurplaten, weer rekenen, weer kleuterschool, weer uitprintbaar, weer puzzels, weer tellen, weer kruiswoord, weerverschijnselen oefening, thermometer oefening',
  'Weeroefeningen en Werkbladen'
);

// 18. colors
updateFile('colors',
  'Gratis Kleuren-oefeningen voor Kinderen | LessonCraftStudio',
  'Uitprintbare kleuren-oefeningen voor kinderen. Rekenen, kleurplaten, woordspellen en puzzels met kleurenthema. Kleuterschool tot groep 5. Gratis PDF.',
  'kleuren werkbladen, kleuren kleurplaten, kleuren rekenen, kleuren kleuterschool, kleuren uitprintbaar, kleuren puzzels, kleuren tellen, kleuren kruiswoord, kleuren leren, primaire kleuren oefening',
  'Kleurenoefeningen en Werkbladen'
);

// 19. shapes
updateFile('shapes',
  'Gratis Vormen-oefeningen voor Kinderen | LessonCraftStudio',
  'Uitprintbare vormen-oefeningen voor kinderen. Rekenen, kleurplaten, woordspellen en puzzels met vormenthema. Kleuterschool tot groep 5. Gratis PDF.',
  'vormen werkbladen, vormen kleurplaten, vormen rekenen, vormen kleuterschool, vormen uitprintbaar, vormen puzzels, vormen tellen, vormen kruiswoord, geometrische vormen, vormen en patronen',
  'Vormenoefeningen en Werkbladen'
);

// 20. numbers
updateFile('numbers',
  'Gratis Getallen-oefeningen voor Kinderen | LessonCraftStudio',
  'Uitprintbare getallen-oefeningen voor kinderen. Rekenen, kleurplaten, woordspellen en puzzels met getallenthema. Kleuterschool tot groep 5. Gratis PDF.',
  'getallen werkbladen, getallen kleurplaten, getallen rekenen, getallen kleuterschool, getallen uitprintbaar, getallen puzzels, getallen tellen, getallen kruiswoord, getallen 1\u201320, hoeveelheidsherkenning',
  'Getallenoefeningen en Werkbladen'
);

// 21. alphabet
updateFile('alphabet',
  'Gratis Alfabet-oefeningen voor Kinderen | LessonCraftStudio',
  'Uitprintbare alfabet-oefeningen voor kinderen. Rekenen, kleurplaten, woordspellen en puzzels met alfabetthema. Kleuterschool tot groep 5. Gratis PDF.',
  'alfabet werkbladen, alfabet kleurplaten, alfabet rekenen, alfabet kleuterschool, alfabet uitprintbaar, alfabet puzzels, alfabet tellen, alfabet kruiswoord, letterherkenning, klanken oefening',
  'Alfabetoefeningen en Werkbladen'
);

console.log('All 7 NL theme hubs (15-21) updated!');
