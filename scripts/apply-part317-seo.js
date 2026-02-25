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

// 50. summer (Zomer)
updateFile('summer',
  'Gratis Zomer-oefeningen voor Kinderen | LessonCraftStudio',
  'Uitprintbare zomer-oefeningen voor kinderen. Rekenen, kleurplaten, woordspellen en puzzels met zomerthema. Kleuterschool tot groep 5. Gratis PDF.',
  'zomer werkbladen, zomer kleurplaten, zomer rekenen, zomer kleuterschool, zomer uitprintbaar, zomer puzzels, zomer tellen, zomer kruiswoord, zomeractiviteiten kinderen, zomervakantie oefeningen',
  'Zomeroefeningen en Werkbladen'
);

// FIX: holidays was missed in Parts 310-316 (travel was duplicated in Part 316)
updateFile('holidays',
  'Gratis Vakanties-oefeningen voor Kinderen | LessonCraftStudio',
  'Uitprintbare vakanties-oefeningen voor kinderen. Rekenen, kleurplaten, woordspellen en puzzels met vakantiesthema. Kleuterschool tot groep 5. Gratis PDF.',
  'vakanties werkbladen, vakanties kleurplaten, vakanties rekenen, vakanties kleuterschool, vakanties uitprintbaar, vakanties puzzels, vakanties tellen, vakanties kruiswoord, feestdagen oefening, tradities kinderen',
  'Vakantieoefeningen en Werkbladen'
);

console.log('NL theme hub 50 (Zomer) + holidays fix updated!');
