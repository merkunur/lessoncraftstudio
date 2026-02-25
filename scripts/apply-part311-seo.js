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

// 8. body
updateFile('body',
  'Gratis Lichaam-oefeningen voor Kinderen | LessonCraftStudio',
  'Uitprintbare lichaam-oefeningen voor kinderen. Rekenen, kleurplaten, woordspellen en puzzels met lichaamthema. Kleuterschool tot groep 5. Gratis PDF.',
  'lichaam werkbladen, lichaam kleurplaten, lichaam rekenen, lichaam kleuterschool, lichaam uitprintbaar, lichaam puzzels, lichaam tellen, lichaam kruiswoord, lichaamsdelen, gezondheid kinderen',
  'Lichaamsoefeningen en Werkbladen'
);

// 9. clothing
updateFile('clothing',
  'Gratis Kleding-oefeningen voor Kinderen | LessonCraftStudio',
  'Uitprintbare kleding-oefeningen voor kinderen. Rekenen, kleurplaten, woordspellen en puzzels met kledingthema. Kleuterschool tot groep 5. Gratis PDF.',
  'kleding werkbladen, kleding kleurplaten, kleding rekenen, kleding kleuterschool, kleding uitprintbaar, kleding puzzels, kleding tellen, kleding kruiswoord, kleding en seizoenen, aankleden oefening',
  'Kledingoefeningen en Werkbladen'
);

// 10. household
updateFile('household',
  'Gratis Huishouden-oefeningen voor Kinderen | LessonCraftStudio',
  'Uitprintbare huishouden-oefeningen voor kinderen. Rekenen, kleurplaten, woordspellen en puzzels met huishoudenthema. Kleuterschool tot groep 5. Gratis PDF.',
  'huishouden werkbladen, huishouden kleurplaten, huishouden rekenen, huishouden kleuterschool, huishouden uitprintbaar, huishouden puzzels, huishouden tellen, huishouden kruiswoord, thuis oefeningen, huishoudelijke voorwerpen',
  'Huishoudoefeningen en Werkbladen'
);

// 11. toys
updateFile('toys',
  'Gratis Speelgoed-oefeningen voor Kinderen | LessonCraftStudio',
  'Uitprintbare speelgoed-oefeningen voor kinderen. Rekenen, kleurplaten, woordspellen en puzzels met speelgoedthema. Kleuterschool tot groep 5. Gratis PDF.',
  'speelgoed werkbladen, speelgoed kleurplaten, speelgoed rekenen, speelgoed kleuterschool, speelgoed uitprintbaar, speelgoed puzzels, speelgoed tellen, speelgoed kruiswoord, speelgoed en spelen, speelgoed classificatie',
  'Speelgoedoefeningen en Werkbladen'
);

// 12. music
updateFile('music',
  'Gratis Muziek-oefeningen voor Kinderen | LessonCraftStudio',
  'Uitprintbare muziek-oefeningen voor kinderen. Rekenen, kleurplaten, woordspellen en puzzels met muziekthema. Kleuterschool tot groep 5. Gratis PDF.',
  'muziek werkbladen, muziek kleurplaten, muziek rekenen, muziek kleuterschool, muziek uitprintbaar, muziek puzzels, muziek tellen, muziek kruiswoord, muziekinstrumenten oefening, muziekritme kinderen',
  'Muziekoefeningen en Werkbladen'
);

// 13. jobs
updateFile('jobs',
  'Gratis Beroepen-oefeningen voor Kinderen | LessonCraftStudio',
  'Uitprintbare beroepen-oefeningen voor kinderen. Rekenen, kleurplaten, woordspellen en puzzels met beroepenthema. Kleuterschool tot groep 5. Gratis PDF.',
  'beroepen werkbladen, beroepen kleurplaten, beroepen rekenen, beroepen kleuterschool, beroepen uitprintbaar, beroepen puzzels, beroepen tellen, beroepen kruiswoord, beroepen in de maatschappij, gereedschap en beroepen',
  'Beroepsoefeningen en Werkbladen'
);

// 14. space
updateFile('space',
  'Gratis Ruimte-oefeningen voor Kinderen | LessonCraftStudio',
  'Uitprintbare ruimte-oefeningen voor kinderen. Rekenen, kleurplaten, woordspellen en puzzels met ruimtethema. Kleuterschool tot groep 5. Gratis PDF.',
  'ruimte werkbladen, ruimte kleurplaten, ruimte rekenen, ruimte kleuterschool, ruimte uitprintbaar, ruimte puzzels, ruimte tellen, ruimte kruiswoord, planeten oefening, zonnestelsel kinderen',
  'Ruimteoefeningen en Werkbladen'
);

console.log('All 7 NL theme hubs (8-14) updated!');
