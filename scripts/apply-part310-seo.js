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

// 1. animals
updateFile('animals',
  'Gratis Dieren-oefeningen voor Kinderen | LessonCraftStudio',
  'Uitprintbare dieren-oefeningen voor kinderen. Rekenen, kleurplaten, woordspellen en puzzels met dierenthema. Kleuterschool tot groep 5. Gratis PDF.',
  'dieren werkbladen, dieren kleurplaten, dieren rekenen, dieren kleuterschool, dieren uitprintbaar, dieren puzzels, dieren tellen, dieren kruiswoord, huisdieren oefeningen, wilde dieren oefeningen',
  'Dierenoefeningen en Werkbladen'
);

// 2. food
updateFile('food',
  'Gratis Eten-oefeningen voor Kinderen | LessonCraftStudio',
  'Uitprintbare eten-oefeningen voor kinderen. Rekenen, kleurplaten, woordspellen en puzzels met etenthema. Kleuterschool tot groep 5. Gratis PDF.',
  'eten werkbladen, eten kleurplaten, eten rekenen, eten kleuterschool, eten uitprintbaar, eten puzzels, eten tellen, eten kruiswoord, voedselgroepen oefeningen, gezond eten',
  'Eetoefeningen en Werkbladen'
);

// 3. transportation
updateFile('transportation',
  'Gratis Vervoer-oefeningen voor Kinderen | LessonCraftStudio',
  'Uitprintbare vervoer-oefeningen voor kinderen. Rekenen, kleurplaten, woordspellen en puzzels met vervoerthema. Kleuterschool tot groep 5. Gratis PDF.',
  'vervoer werkbladen, vervoer kleurplaten, vervoer rekenen, vervoer kleuterschool, vervoer uitprintbaar, vervoer puzzels, vervoer tellen, vervoer kruiswoord, voertuigen oefeningen, auto kleurplaten',
  'Vervoeroefeningen en Werkbladen'
);

// 4. nature
updateFile('nature',
  'Gratis Natuur-oefeningen voor Kinderen | LessonCraftStudio',
  'Uitprintbare natuur-oefeningen voor kinderen. Rekenen, kleurplaten, woordspellen en puzzels met natuurthema. Kleuterschool tot groep 5. Gratis PDF.',
  'natuur werkbladen, natuur kleurplaten, natuur rekenen, natuur kleuterschool, natuur uitprintbaar, natuur puzzels, natuur tellen, natuur kruiswoord, milieu oefeningen, planten kinderen',
  'Natuuroefeningen en Werkbladen'
);

// 5. school
updateFile('school',
  'Gratis School-oefeningen voor Kinderen | LessonCraftStudio',
  'Uitprintbare school-oefeningen voor kinderen. Rekenen, kleurplaten, woordspellen en puzzels met schoolthema. Kleuterschool tot groep 5. Gratis PDF.',
  'school werkbladen, school kleurplaten, school rekenen, school kleuterschool, school uitprintbaar, school puzzels, school tellen, school kruiswoord, schoolstart oefeningen, klaslokaal oefeningen',
  'Schooloefeningen en Werkbladen'
);

// 6. sports
updateFile('sports',
  'Gratis Sport-oefeningen voor Kinderen | LessonCraftStudio',
  'Uitprintbare sport-oefeningen voor kinderen. Rekenen, kleurplaten, woordspellen en puzzels met sportthema. Kleuterschool tot groep 5. Gratis PDF.',
  'sport werkbladen, sport kleurplaten, sport rekenen, sport kleuterschool, sport uitprintbaar, sport puzzels, sport tellen, sport kruiswoord, bewegen oefeningen, beweging en sport',
  'Sportoefeningen en Werkbladen'
);

// 7. emotions
updateFile('emotions',
  'Gratis Emoties-oefeningen voor Kinderen | LessonCraftStudio',
  'Uitprintbare emoties-oefeningen voor kinderen. Rekenen, kleurplaten, woordspellen en puzzels met emotiesthema. Kleuterschool tot groep 5. Gratis PDF.',
  'emoties werkbladen, emoties kleurplaten, emoties rekenen, emoties kleuterschool, emoties uitprintbaar, emoties puzzels, emoties tellen, emoties kruiswoord, emoties en empathie, sociale vaardigheden',
  'Emotieoefeningen en Werkbladen'
);

console.log('All 7 NL theme hubs (1-7) updated!');
