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

// 1. animals
updateFile('animals',
  'Gratis Dyr-opgaver til B\u00f8rn | LessonCraftStudio',
  'Printbare dyr-opgaver til b\u00f8rn. Matematik, farvel\u00e6gning, ordspil og puslespil med dyrtema. F\u00f8rskole til 3. klasse. Gratis PDF.',
  'dyreopgaver til b\u00f8rn, dyr arbejdsark, dyr farvel\u00e6gningssider, dyr matematik, dyr f\u00f8rskole, dyr printbar, dyr puslespil, dyr t\u00e6lling, dyr krydsord, husdyr opgaver, vilde dyr \u00f8velser',
  'Dyre-opgaver og \u00d8velser'
);

// 2. food
updateFile('food',
  'Gratis Mad-opgaver til B\u00f8rn | LessonCraftStudio',
  'Printbare mad-opgaver til b\u00f8rn. Matematik, farvel\u00e6gning, ordspil og puslespil med madtema. F\u00f8rskole til 3. klasse. Gratis PDF.',
  'madopgaver til b\u00f8rn, mad arbejdsark, mad farvel\u00e6gning, mad matematik, madgrupper opgaver, sund mad, mad f\u00f8rskole, mad printbar, mad puslespil, madsortering, mad ordopgaver',
  'Mad-opgaver og \u00d8velser'
);

// 3. transportation
updateFile('transportation',
  'Gratis Transport-opgaver til B\u00f8rn | LessonCraftStudio',
  'Printbare transport-opgaver til b\u00f8rn. Matematik, farvel\u00e6gning, ordspil og puslespil med transporttema. F\u00f8rskole til 3. klasse. Gratis PDF.',
  'transportopgaver til b\u00f8rn, transport arbejdsark, k\u00f8ret\u00f8jer opgaver, biler farvel\u00e6gning, transport matematik, k\u00f8ret\u00f8jer f\u00f8rskole, transport printbar, transport puslespil, k\u00f8ret\u00f8jer til b\u00f8rn, transport ordopgaver, k\u00f8ret\u00f8jer sortering',
  'Transport-opgaver og \u00d8velser'
);

// 4. nature
updateFile('nature',
  'Gratis Natur-opgaver til B\u00f8rn | LessonCraftStudio',
  'Printbare natur-opgaver til b\u00f8rn. Matematik, farvel\u00e6gning, ordspil og puslespil med naturtema. F\u00f8rskole til 3. klasse. Gratis PDF.',
  'naturopgaver til b\u00f8rn, natur arbejdsark, natur farvel\u00e6gning, natur matematik, natur f\u00f8rskole, natur printbar, natur puslespil, milj\u00f8 opgaver, planter til b\u00f8rn, naturundervisning, natur ordopgaver',
  'Natur-opgaver og \u00d8velser'
);

// 5. school
updateFile('school',
  'Gratis Skole-opgaver til B\u00f8rn | LessonCraftStudio',
  'Printbare skole-opgaver til b\u00f8rn. Matematik, farvel\u00e6gning, ordspil og puslespil med skoletema. F\u00f8rskole til 3. klasse. Gratis PDF.',
  'skoleopgaver til b\u00f8rn, skole arbejdsark, skoleting opgaver, skole farvel\u00e6gning, skole matematik, skole f\u00f8rskole, skole printbar, skolestart opgaver, klasselokale \u00f8velser, skole ordopgaver, skoledag opgaver',
  'Skole-opgaver og \u00d8velser'
);

// 6. sports
updateFile('sports',
  'Gratis Sport-opgaver til B\u00f8rn | LessonCraftStudio',
  'Printbare sport-opgaver til b\u00f8rn. Matematik, farvel\u00e6gning, ordspil og puslespil med sporttema. F\u00f8rskole til 3. klasse. Gratis PDF.',
  'sportopgaver til b\u00f8rn, sport arbejdsark, sport farvel\u00e6gning, sport matematik, sport f\u00f8rskole, sport printbar, idrettsgrene opgaver, sport puslespil, boldspil til b\u00f8rn, sport ordopgaver, sport t\u00e6lling',
  'Sport-opgaver og \u00d8velser'
);

// 7. emotions
updateFile('emotions',
  'Gratis F\u00f8lelser-opgaver til B\u00f8rn | LessonCraftStudio',
  'Printbare f\u00f8lelser-opgaver til b\u00f8rn. Matematik, farvel\u00e6gning, ordspil og puslespil med f\u00f8lelsertema. F\u00f8rskole til 3. klasse. Gratis PDF.',
  'f\u00f8lelsesopgaver til b\u00f8rn, f\u00f8lelser arbejdsark, f\u00f8lelsesm\u00e6ssige f\u00e6rdigheder \u00f8velser, ansigtsudtryk opgaver, f\u00f8lelser f\u00f8rskole, f\u00f8lelser printbar, f\u00f8lelsesvokabular til b\u00f8rn, f\u00f8lelser farvel\u00e6gning, f\u00f8lelsesundervisning, tale om f\u00f8lelser, sociale og emotionelle f\u00e6rdigheder',
  'F\u00f8lelsesopgaver og \u00d8velser'
);

// 8. body
updateFile('body',
  'Gratis Krop-opgaver til B\u00f8rn | LessonCraftStudio',
  'Printbare krop-opgaver til b\u00f8rn. Matematik, farvel\u00e6gning, ordspil og puslespil med kroptema. F\u00f8rskole til 3. klasse. Gratis PDF.',
  'kropsopgaver til b\u00f8rn, krop arbejdsark, kropsdele opgaver, krop farvel\u00e6gning, krop f\u00f8rskole, krop printbar, sanser opgaver, kropsdele navngivning, sundhed til b\u00f8rn, krop ordopgaver, kropsbevidsthed \u00f8velser',
  'Krop-opgaver og \u00d8velser'
);

// 9. clothing
updateFile('clothing',
  'Gratis T\u00f8j-opgaver til B\u00f8rn | LessonCraftStudio',
  'Printbare t\u00f8j-opgaver til b\u00f8rn. Matematik, farvel\u00e6gning, ordspil og puslespil med t\u00f8jtema. F\u00f8rskole til 3. klasse. Gratis PDF.',
  't\u00f8jopgaver til b\u00f8rn, t\u00f8j arbejdsark, t\u00f8j farvel\u00e6gning, t\u00f8j sortering, t\u00f8j f\u00f8rskole, t\u00f8j printbar, p\u00e5kl\u00e6dning opgaver, t\u00f8jordforr\u00e5d til b\u00f8rn, t\u00f8j og vejr, t\u00f8j ordopgaver, t\u00f8j matchning',
  'T\u00f8j-opgaver og \u00d8velser'
);

// 10. household
updateFile('household',
  'Gratis Husholdning-opgaver til B\u00f8rn | LessonCraftStudio',
  'Printbare husholdning-opgaver til b\u00f8rn. Matematik, farvel\u00e6gning, ordspil og puslespil med husholdningtema. F\u00f8rskole til 3. klasse. Gratis PDF.',
  'husholdningsopgaver til b\u00f8rn, husholdning arbejdsark, k\u00f8kkenredskaber opgaver, husholdning farvel\u00e6gning, husholdning f\u00f8rskole, husholdning printbar, hjemmets ting til b\u00f8rn, husholdning sortering, rum i hjemmet, husholdning ordopgaver, dagligdag opgaver',
  'Husholdningsopgaver og \u00d8velser'
);

console.log('All 10 Danish theme hubs updated!');
