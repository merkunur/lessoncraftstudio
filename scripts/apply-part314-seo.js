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

// 29. dinosaurs
updateFile('dinosaurs',
  'Gratis Dinosaurussen-oefeningen voor Kinderen | LessonCraftStudio',
  'Uitprintbare dinosaurussen-oefeningen voor kinderen. Rekenen, kleurplaten, woordspellen en puzzels met dinosaurussenthema. Kleuterschool tot groep 5. Gratis PDF.',
  'dinosaurussen werkbladen, dinosaurussen kleurplaten, dinosaurussen rekenen, dinosaurussen kleuterschool, dinosaurussen uitprintbaar, dinosaurussen puzzels, dinosaurussen tellen, dinosaurussen kruiswoord, dinosaurussen feiten, dinosaurussen classificatie',
  'Dinosaurusoefeningen en Werkbladen'
);

// 30. insects
updateFile('insects',
  'Gratis Insecten-oefeningen voor Kinderen | LessonCraftStudio',
  'Uitprintbare insecten-oefeningen voor kinderen. Rekenen, kleurplaten, woordspellen en puzzels met insectenthema. Kleuterschool tot groep 5. Gratis PDF.',
  'insecten werkbladen, insecten kleurplaten, insecten rekenen, insecten kleuterschool, insecten uitprintbaar, insecten puzzels, insecten tellen, insecten kruiswoord, insecten levenscyclus, kleine beestjes oefening',
  'Insectenoefeningen en Werkbladen'
);

// 31. fruits
updateFile('fruits',
  'Gratis Fruit-oefeningen voor Kinderen | LessonCraftStudio',
  'Uitprintbare fruit-oefeningen voor kinderen. Rekenen, kleurplaten, woordspellen en puzzels met fruitthema. Kleuterschool tot groep 5. Gratis PDF.',
  'fruit werkbladen, fruit kleurplaten, fruit rekenen, fruit kleuterschool, fruit uitprintbaar, fruit puzzels, fruit tellen, fruit kruiswoord, fruitsoorten oefening, vitaminrijk voedsel',
  'Fruitoefeningen en Werkbladen'
);

// 32. vegetables
updateFile('vegetables',
  'Gratis Groenten-oefeningen voor Kinderen | LessonCraftStudio',
  'Uitprintbare groenten-oefeningen voor kinderen. Rekenen, kleurplaten, woordspellen en puzzels met groententhema. Kleuterschool tot groep 5. Gratis PDF.',
  'groenten werkbladen, groenten kleurplaten, groenten rekenen, groenten kleuterschool, groenten uitprintbaar, groenten puzzels, groenten tellen, groenten kruiswoord, groentesoorten, groenten verbouwen',
  'Groenteoefeningen en Werkbladen'
);

// 33. flowers
updateFile('flowers',
  'Gratis Bloemen-oefeningen voor Kinderen | LessonCraftStudio',
  'Uitprintbare bloemen-oefeningen voor kinderen. Rekenen, kleurplaten, woordspellen en puzzels met bloementhema. Kleuterschool tot groep 5. Gratis PDF.',
  'bloemen werkbladen, bloemen kleurplaten, bloemen rekenen, bloemen kleuterschool, bloemen uitprintbaar, bloemen puzzels, bloemen tellen, bloemen kruiswoord, bloemdelen, lentebloemen oefening',
  'Bloemenoefeningen en Werkbladen'
);

// 34. birds
updateFile('birds',
  'Gratis Vogels-oefeningen voor Kinderen | LessonCraftStudio',
  'Uitprintbare vogels-oefeningen voor kinderen. Rekenen, kleurplaten, woordspellen en puzzels met vogelsthema. Kleuterschool tot groep 5. Gratis PDF.',
  'vogels werkbladen, vogels kleurplaten, vogels rekenen, vogels kleuterschool, vogels uitprintbaar, vogels puzzels, vogels tellen, vogels kruiswoord, vogelsoorten, vogels en nesten',
  'Vogeloefeningen en Werkbladen'
);

// 35. pets
updateFile('pets',
  'Gratis Huisdieren-oefeningen voor Kinderen | LessonCraftStudio',
  'Uitprintbare huisdieren-oefeningen voor kinderen. Rekenen, kleurplaten, woordspellen en puzzels met huisdierenthema. Kleuterschool tot groep 5. Gratis PDF.',
  'huisdieren werkbladen, huisdieren kleurplaten, huisdieren rekenen, huisdieren kleuterschool, huisdieren uitprintbaar, huisdieren puzzels, huisdieren tellen, huisdieren kruiswoord, huisdierenverzorging, huisdieren classificatie',
  'Huisdieroefeningen en Werkbladen'
);

console.log('All 7 NL theme hubs (29-35) updated!');
