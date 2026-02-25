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

// 36. zoo
updateFile('zoo',
  'Gratis Dierentuin-oefeningen voor Kinderen | LessonCraftStudio',
  'Uitprintbare dierentuin-oefeningen voor kinderen. Rekenen, kleurplaten, woordspellen en puzzels met dierentuinthema. Kleuterschool tot groep 5. Gratis PDF.',
  'dierentuin werkbladen, dierentuin kleurplaten, dierentuin rekenen, dierentuin kleuterschool, dierentuin uitprintbaar, dierentuin puzzels, dierentuin tellen, dierentuin kruiswoord, dierentuindieren, exotische dieren oefening',
  'Dierentuinoefeningen en Werkbladen'
);

// 37. garden
updateFile('garden',
  'Gratis Tuin-oefeningen voor Kinderen | LessonCraftStudio',
  'Uitprintbare tuin-oefeningen voor kinderen. Rekenen, kleurplaten, woordspellen en puzzels met tuinthema. Kleuterschool tot groep 5. Gratis PDF.',
  'tuin werkbladen, tuin kleurplaten, tuin rekenen, tuin kleuterschool, tuin uitprintbaar, tuin puzzels, tuin tellen, tuin kruiswoord, tuinplanten, planten en kweken',
  'Tuinoefeningen en Werkbladen'
);

// 38. camping
updateFile('camping',
  'Gratis Kamperen-oefeningen voor Kinderen | LessonCraftStudio',
  'Uitprintbare kamperen-oefeningen voor kinderen. Rekenen, kleurplaten, woordspellen en puzzels met kamperenthema. Kleuterschool tot groep 5. Gratis PDF.',
  'kamperen werkbladen, kamperen kleurplaten, kamperen rekenen, kamperen kleuterschool, kamperen uitprintbaar, kamperen puzzels, kamperen tellen, kamperen kruiswoord, kamperen in de natuur, buitenleven kinderen',
  'Kampeeroefeningen en Werkbladen'
);

// 39. pirates
updateFile('pirates',
  'Gratis Piraten-oefeningen voor Kinderen | LessonCraftStudio',
  'Uitprintbare piraten-oefeningen voor kinderen. Rekenen, kleurplaten, woordspellen en puzzels met piratenthema. Kleuterschool tot groep 5. Gratis PDF.',
  'piraten werkbladen, piraten kleurplaten, piraten rekenen, piraten kleuterschool, piraten uitprintbaar, piraten puzzels, piraten tellen, piraten kruiswoord, piratenavontuur, schatzoekspellen',
  'Piratenoefeningen en Werkbladen'
);

// 40. fairy-tales
updateFile('fairy-tales',
  'Gratis Sprookjes-oefeningen voor Kinderen | LessonCraftStudio',
  'Uitprintbare sprookjes-oefeningen voor kinderen. Rekenen, kleurplaten, woordspellen en puzzels met sprookjesthema. Kleuterschool tot groep 5. Gratis PDF.',
  'sprookjes werkbladen, sprookjes kleurplaten, sprookjes rekenen, sprookjes kleuterschool, sprookjes uitprintbaar, sprookjes puzzels, sprookjes tellen, sprookjes kruiswoord, sprookjesfiguren, vertellen en sprookjes',
  'Sprookjesoefeningen en Werkbladen'
);

// 41. robots
updateFile('robots',
  'Gratis Robots-oefeningen voor Kinderen | LessonCraftStudio',
  'Uitprintbare robots-oefeningen voor kinderen. Rekenen, kleurplaten, woordspellen en puzzels met robotsthema. Kleuterschool tot groep 5. Gratis PDF.',
  'robots werkbladen, robots kleurplaten, robots rekenen, robots kleuterschool, robots uitprintbaar, robots puzzels, robots tellen, robots kruiswoord, robottechniek kinderen, programmeren kinderen',
  'Robotoefeningen en Werkbladen'
);

// 42. superheroes
updateFile('superheroes',
  'Gratis Superhelden-oefeningen voor Kinderen | LessonCraftStudio',
  'Uitprintbare superhelden-oefeningen voor kinderen. Rekenen, kleurplaten, woordspellen en puzzels met superheldenthema. Kleuterschool tot groep 5. Gratis PDF.',
  'superhelden werkbladen, superhelden kleurplaten, superhelden rekenen, superhelden kleuterschool, superhelden uitprintbaar, superhelden puzzels, superhelden tellen, superhelden kruiswoord, superkrachten, moed en kracht',
  'Superheldenoefeningen en Werkbladen'
);

console.log('All 7 NL theme hubs (36-42) updated!');
