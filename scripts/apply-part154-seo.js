const fs = require('fs');
const path = require('path');

const base = 'C:/Users/rkgen/lessoncraftstudio/frontend/content/themes';
const BS = String.fromCharCode(92); // backslash char

function updateFile(dir, title, desc, keywords, heading) {
  const fp = path.join(base, dir, 'da.ts');
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
  console.log('Updated: ' + dir + '/da.ts (' + (usesEscapes ? 'escaped' : 'unicode') + ')');
}

// 41. robots
updateFile('robots',
  'Gratis Robotter-opgaver til B\u00f8rn | LessonCraftStudio',
  'Printbare robotter-opgaver til b\u00f8rn. Matematik, farvel\u00e6gning, ordspil og puslespil med robottertema. F\u00f8rskole til 3. klasse. Gratis PDF.',
  'robotopgaver til b\u00f8rn, robot arbejdsark, robot farvel\u00e6gning, robot matematik, robot f\u00f8rskole, robot printbar, teknologi opgaver, robot puslespil, kodning til b\u00f8rn, robot ordopgaver, robot aktiviteter',
  'Robot-opgaver og \u00d8velser'
);

// 42. superheroes
updateFile('superheroes',
  'Gratis Superhelte-opgaver til B\u00f8rn | LessonCraftStudio',
  'Printbare superhelte-opgaver til b\u00f8rn. Matematik, farvel\u00e6gning, ordspil og puslespil med superheltetema. F\u00f8rskole til 3. klasse. Gratis PDF.',
  'superhelteopgaver til b\u00f8rn, superhelte arbejdsark, superhelte farvel\u00e6gning, superhelte matematik, superhelte f\u00f8rskole, superhelte printbar, superhelte puslespil, superkr\u00e6fter opgaver, superhelte ordopgaver, superhelte t\u00e6lling, superhelte aktiviteter',
  'Superhelte-opgaver og \u00d8velser'
);

// 43. construction
updateFile('construction',
  'Gratis Byggeplads-opgaver til B\u00f8rn | LessonCraftStudio',
  'Printbare byggeplads-opgaver til b\u00f8rn. Matematik, farvel\u00e6gning, ordspil og puslespil med byggepladstema. F\u00f8rskole til 3. klasse. Gratis PDF.',
  'byggeopgaver til b\u00f8rn, byggeri arbejdsark, byggeri farvel\u00e6gning, byggeri matematik, byggeri f\u00f8rskole, byggeri printbar, byggemaskiner opgaver, byggeri puslespil, v\u00e6rkt\u00f8j til b\u00f8rn, byggeri ordopgaver, byggeplads aktiviteter',
  'Bygge-opgaver og \u00d8velser'
);

// 44. cooking
updateFile('cooking',
  'Gratis Madlavning-opgaver til B\u00f8rn | LessonCraftStudio',
  'Printbare madlavning-opgaver til b\u00f8rn. Matematik, farvel\u00e6gning, ordspil og puslespil med madlavningtema. F\u00f8rskole til 3. klasse. Gratis PDF.',
  'madlavningsopgaver til b\u00f8rn, madlavning arbejdsark, madlavning farvel\u00e6gning, madlavning matematik, madlavning f\u00f8rskole, madlavning printbar, opskrift opgaver, madlavning puslespil, k\u00f8kken til b\u00f8rn, madlavning ordopgaver, madlavning aktiviteter',
  'Madlavning-opgaver og \u00d8velser'
);

// 45. travel
updateFile('travel',
  'Gratis Rejser-opgaver til B\u00f8rn | LessonCraftStudio',
  'Printbare rejser-opgaver til b\u00f8rn. Matematik, farvel\u00e6gning, ordspil og puslespil med rejsertema. F\u00f8rskole til 3. klasse. Gratis PDF.',
  'rejseopgaver til b\u00f8rn, rejse arbejdsark, rejse farvel\u00e6gning, rejse matematik, rejse f\u00f8rskole, rejse printbar, lande opgaver, rejse puslespil, verden til b\u00f8rn, rejse ordopgaver, rejse aktiviteter',
  'Rejse-opgaver og \u00d8velser'
);

// 46. birthday
updateFile('birthday',
  'Gratis F\u00f8dselsdag-opgaver til B\u00f8rn | LessonCraftStudio',
  'Printbare f\u00f8dselsdag-opgaver til b\u00f8rn. Matematik, farvel\u00e6gning, ordspil og puslespil med f\u00f8dselsdagtema. F\u00f8rskole til 3. klasse. Gratis PDF.',
  'f\u00f8dselsdagsopgaver til b\u00f8rn, f\u00f8dselsdag arbejdsark, f\u00f8dselsdag farvel\u00e6gning, f\u00f8dselsdag matematik, f\u00f8dselsdag f\u00f8rskole, f\u00f8dselsdag printbar, fest opgaver, f\u00f8dselsdag puslespil, feste og fejre, f\u00f8dselsdag ordopgaver, f\u00f8dselsdag aktiviteter',
  'F\u00f8dselsdag-opgaver og \u00d8velser'
);

// 47. circus
updateFile('circus',
  'Gratis Cirkus-opgaver til B\u00f8rn | LessonCraftStudio',
  'Printbare cirkus-opgaver til b\u00f8rn. Matematik, farvel\u00e6gning, ordspil og puslespil med cirkustema. F\u00f8rskole til 3. klasse. Gratis PDF.',
  'cirkusopgaver til b\u00f8rn, cirkus arbejdsark, cirkus farvel\u00e6gning, cirkus matematik, cirkus f\u00f8rskole, cirkus printbar, klovne opgaver, cirkus puslespil, cirkus dyr, cirkus ordopgaver, cirkus aktiviteter',
  'Cirkus-opgaver og \u00d8velser'
);

// 48. forest
updateFile('forest',
  'Gratis Skov-opgaver til B\u00f8rn | LessonCraftStudio',
  'Printbare skov-opgaver til b\u00f8rn. Matematik, farvel\u00e6gning, ordspil og puslespil med skovtema. F\u00f8rskole til 3. klasse. Gratis PDF.',
  'skovopgaver til b\u00f8rn, skov arbejdsark, skov farvel\u00e6gning, skov matematik, skov f\u00f8rskole, skov printbar, skovens dyr, skov puslespil, naturen i skoven, skov ordopgaver, skov aktiviteter',
  'Skov-opgaver og \u00d8velser'
);

// 49. spring
updateFile('spring',
  'Gratis For\u00e5r-opgaver til B\u00f8rn | LessonCraftStudio',
  'Printbare for\u00e5r-opgaver til b\u00f8rn. Matematik, farvel\u00e6gning, ordspil og puslespil med for\u00e5rtema. F\u00f8rskole til 3. klasse. Gratis PDF.',
  'for\u00e5rsopgaver til b\u00f8rn, for\u00e5r arbejdsark, for\u00e5r farvel\u00e6gning, for\u00e5r matematik, for\u00e5r f\u00f8rskole, for\u00e5r printbar, for\u00e5rsblomster opgaver, for\u00e5r puslespil, v\u00e5rtegn, for\u00e5r ordopgaver, for\u00e5r aktiviteter',
  'For\u00e5rs-opgaver og \u00d8velser'
);

// 50. summer
updateFile('summer',
  'Gratis Sommer-opgaver til B\u00f8rn | LessonCraftStudio',
  'Printbare sommer-opgaver til b\u00f8rn. Matematik, farvel\u00e6gning, ordspil og puslespil med sommertema. F\u00f8rskole til 3. klasse. Gratis PDF.',
  'sommeropgaver til b\u00f8rn, sommer arbejdsark, sommer farvel\u00e6gning, sommer matematik, sommer f\u00f8rskole, sommer printbar, sommerferie opgaver, sommer puslespil, strand og sol, sommer ordopgaver, sommer aktiviteter',
  'Sommer-opgaver og \u00d8velser'
);

console.log('All 10 Danish theme hubs (41-50) updated!');
