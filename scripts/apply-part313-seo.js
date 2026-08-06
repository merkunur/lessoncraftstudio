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

// 22. furniture
updateFile('furniture',
  'Gratis Meubels-oefeningen voor Kinderen | LessonCraftStudio',
  'Uitprintbare meubels-oefeningen voor kinderen. Rekenen, kleurplaten, woordspellen en puzzels met meubelsthema. Kleuterschool tot groep 5. Gratis PDF.',
  'meubels werkbladen, meubels kleurplaten, meubels rekenen, meubels kleuterschool, meubels uitprintbaar, meubels puzzels, meubels tellen, meubels kruiswoord, meubels en kamers, woninginrichting oefening',
  'Meubeloefeningen en Werkbladen'
);

// 23. easter
updateFile('easter',
  'Gratis Pasen-oefeningen voor Kinderen | LessonCraftStudio',
  'Uitprintbare pasen-oefeningen voor kinderen. Rekenen, kleurplaten, woordspellen en puzzels met pasenthema. Kleuterschool tot groep 5. Gratis PDF.',
  'pasen werkbladen, pasen kleurplaten, pasen rekenen, pasen kleuterschool, pasen uitprintbaar, pasen puzzels, pasen tellen, pasen kruiswoord, paaseieren oefening, lenteviering',
  'Paasoefeningen en Werkbladen'
);

// 24. halloween
updateFile('halloween',
  'Gratis Halloween-oefeningen voor Kinderen | LessonCraftStudio',
  'Uitprintbare halloween-oefeningen voor kinderen. Rekenen, kleurplaten, woordspellen en puzzels met halloweenthema. Kleuterschool tot groep 5. Gratis PDF.',
  'halloween werkbladen, halloween kleurplaten, halloween rekenen, halloween kleuterschool, halloween uitprintbaar, halloween puzzels, halloween tellen, halloween kruiswoord, spook oefening, halloween knutselen',
  'Halloweenoefeningen en Werkbladen'
);

// 25. xmas
updateFile('xmas',
  'Gratis Kerstmis-oefeningen voor Kinderen | LessonCraftStudio',
  'Uitprintbare kerstmis-oefeningen voor kinderen. Rekenen, kleurplaten, woordspellen en puzzels met kerstmisthema. Kleuterschool tot groep 5. Gratis PDF.',
  'kerstmis werkbladen, kerstmis kleurplaten, kerstmis rekenen, kerstmis kleuterschool, kerstmis uitprintbaar, kerstmis puzzels, kerstmis tellen, kerstmis kruiswoord, kerstknutsel oefening, adventskalender kinderen',
  'Kerstoefeningen en Werkbladen'
);

// 26. winter
updateFile('winter',
  'Gratis Winter-oefeningen voor Kinderen | LessonCraftStudio',
  'Uitprintbare winter-oefeningen voor kinderen. Rekenen, kleurplaten, woordspellen en puzzels met winterthema. Kleuterschool tot groep 5. Gratis PDF.',
  'winter werkbladen, winter kleurplaten, winter rekenen, winter kleuterschool, winter uitprintbaar, winter puzzels, winter tellen, winter kruiswoord, sneeuw en ijs oefening, winteractiviteiten',
  'Winteroefeningen en Werkbladen'
);

// 27. farm
updateFile('farm',
  'Gratis Boerderij-oefeningen voor Kinderen | LessonCraftStudio',
  'Uitprintbare boerderij-oefeningen voor kinderen. Rekenen, kleurplaten, woordspellen en puzzels met boerderijthema. Kleuterschool tot groep 5. Gratis PDF.',
  'boerderij werkbladen, boerderij kleurplaten, boerderij rekenen, boerderij kleuterschool, boerderij uitprintbaar, boerderij puzzels, boerderij tellen, boerderij kruiswoord, boerderijdieren oefening, oogst en verbouwen',
  'Boerderijoefeningen en Werkbladen'
);

// 28. ocean
updateFile('ocean',
  'Gratis Oceaan-oefeningen voor Kinderen | LessonCraftStudio',
  'Uitprintbare oceaan-oefeningen voor kinderen. Rekenen, kleurplaten, woordspellen en puzzels met oceaanthema. Kleuterschool tot groep 5. Gratis PDF.',
  'oceaan werkbladen, oceaan kleurplaten, oceaan rekenen, oceaan kleuterschool, oceaan uitprintbaar, oceaan puzzels, oceaan tellen, oceaan kruiswoord, zeedieren oefening, onderwaterwereld',
  'Oceaanoefeningen en Werkbladen'
);

console.log('All 7 NL theme hubs (22-28) updated!');
