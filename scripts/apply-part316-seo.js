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

// 43. construction
updateFile('construction',
  'Gratis Bouw-oefeningen voor Kinderen | LessonCraftStudio',
  'Uitprintbare bouw-oefeningen voor kinderen. Rekenen, kleurplaten, woordspellen en puzzels met bouwthema. Kleuterschool tot groep 5. Gratis PDF.',
  'bouw werkbladen, bouw kleurplaten, bouw rekenen, bouw kleuterschool, bouw uitprintbaar, bouw puzzels, bouw tellen, bouw kruiswoord, bouwmachines oefening, constructie kinderen',
  'Bouwoefeningen en Werkbladen'
);

// 44. cooking
updateFile('cooking',
  'Gratis Koken-oefeningen voor Kinderen | LessonCraftStudio',
  'Uitprintbare koken-oefeningen voor kinderen. Rekenen, kleurplaten, woordspellen en puzzels met kokenthema. Kleuterschool tot groep 5. Gratis PDF.',
  'koken werkbladen, koken kleurplaten, koken rekenen, koken kleuterschool, koken uitprintbaar, koken puzzels, koken tellen, koken kruiswoord, recepten kinderen, keukengereedschap oefening',
  'Kookoefeningen en Werkbladen'
);

// 45. travel
updateFile('travel',
  'Gratis Reizen-oefeningen voor Kinderen | LessonCraftStudio',
  'Uitprintbare reizen-oefeningen voor kinderen. Rekenen, kleurplaten, woordspellen en puzzels met reizenthema. Kleuterschool tot groep 5. Gratis PDF.',
  'reizen werkbladen, reizen kleurplaten, reizen rekenen, reizen kleuterschool, reizen uitprintbaar, reizen puzzels, reizen tellen, reizen kruiswoord, reizen en ontdekken, kaarten oefening',
  'Reisoefeningen en Werkbladen'
);

// 46. birthday
updateFile('birthday',
  'Gratis Verjaardag-oefeningen voor Kinderen | LessonCraftStudio',
  'Uitprintbare verjaardag-oefeningen voor kinderen. Rekenen, kleurplaten, woordspellen en puzzels met verjaardagthema. Kleuterschool tot groep 5. Gratis PDF.',
  'verjaardag werkbladen, verjaardag kleurplaten, verjaardag rekenen, verjaardag kleuterschool, verjaardag uitprintbaar, verjaardag puzzels, verjaardag tellen, verjaardag kruiswoord, verjaardagsfeest, verjaardagspartij',
  'Verjaardagsoefeningen en Werkbladen'
);

// 47. circus
updateFile('circus',
  'Gratis Circus-oefeningen voor Kinderen | LessonCraftStudio',
  'Uitprintbare circus-oefeningen voor kinderen. Rekenen, kleurplaten, woordspellen en puzzels met circusthema. Kleuterschool tot groep 5. Gratis PDF.',
  'circus werkbladen, circus kleurplaten, circus rekenen, circus kleuterschool, circus uitprintbaar, circus puzzels, circus tellen, circus kruiswoord, circusartiesten oefening, jongleren en acrobatiek',
  'Circusoefeningen en Werkbladen'
);

// 48. forest
updateFile('forest',
  'Gratis Bos-oefeningen voor Kinderen | LessonCraftStudio',
  'Uitprintbare bos-oefeningen voor kinderen. Rekenen, kleurplaten, woordspellen en puzzels met bosthema. Kleuterschool tot groep 5. Gratis PDF.',
  'bos werkbladen, bos kleurplaten, bos rekenen, bos kleuterschool, bos uitprintbaar, bos puzzels, bos tellen, bos kruiswoord, bosleven oefening, bosdieren kinderen',
  'Bosoefeningen en Werkbladen'
);

// 49. spring
updateFile('spring',
  'Gratis Lente-oefeningen voor Kinderen | LessonCraftStudio',
  'Uitprintbare lente-oefeningen voor kinderen. Rekenen, kleurplaten, woordspellen en puzzels met lentethema. Kleuterschool tot groep 5. Gratis PDF.',
  'lente werkbladen, lente kleurplaten, lente rekenen, lente kleuterschool, lente uitprintbaar, lente puzzels, lente tellen, lente kruiswoord, lentetekens oefening, lentebloemen',
  'Lenteoefeningen en Werkbladen'
);

console.log('All 7 NL theme hubs (43-49) updated!');
