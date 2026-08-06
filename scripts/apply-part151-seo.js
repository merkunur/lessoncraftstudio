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

// 11. toys
updateFile('toys',
  'Gratis Leget\u00f8j-opgaver til B\u00f8rn | LessonCraftStudio',
  'Printbare leget\u00f8j-opgaver til b\u00f8rn. Matematik, farvel\u00e6gning, ordspil og puslespil med leget\u00f8jtema. F\u00f8rskole til 3. klasse. Gratis PDF.',
  'leget\u00f8jsopgaver til b\u00f8rn, leget\u00f8j arbejdsark, leget\u00f8j farvel\u00e6gning, leget\u00f8j matematik, leget\u00f8j f\u00f8rskole, leget\u00f8j printbar, leg og l\u00e6ring, leget\u00f8j sortering, leget\u00f8j ordopgaver, leget\u00f8j t\u00e6lling, leget\u00f8jstyper opgaver',
  'Leget\u00f8j-opgaver og \u00d8velser'
);

// 12. music
updateFile('music',
  'Gratis Musik-opgaver til B\u00f8rn | LessonCraftStudio',
  'Printbare musik-opgaver til b\u00f8rn. Matematik, farvel\u00e6gning, ordspil og puslespil med musiktema. F\u00f8rskole til 3. klasse. Gratis PDF.',
  'musikopgaver til b\u00f8rn, musik arbejdsark, instrumenter opgaver, musik farvel\u00e6gning, musik f\u00f8rskole, musik printbar, musikalsk l\u00e6ring, musik puslespil, lydgenkendelse, musik ordopgaver, instrumenter til b\u00f8rn',
  'Musik-opgaver og \u00d8velser'
);

// 13. jobs
updateFile('jobs',
  'Gratis Job-opgaver til B\u00f8rn | LessonCraftStudio',
  'Printbare job-opgaver til b\u00f8rn. Matematik, farvel\u00e6gning, ordspil og puslespil med jobtema. F\u00f8rskole til 3. klasse. Gratis PDF.',
  'job-opgaver til b\u00f8rn, job arbejdsark, erhverv opgaver, job farvel\u00e6gning, job f\u00f8rskole, job printbar, hvad vil du v\u00e6re, job sortering, job ordopgaver, erhverv til b\u00f8rn, job og redskaber',
  'Job-opgaver og \u00d8velser'
);

// 14. space
updateFile('space',
  'Gratis Rummet-opgaver til B\u00f8rn | LessonCraftStudio',
  'Printbare rummet-opgaver til b\u00f8rn. Matematik, farvel\u00e6gning, ordspil og puslespil med rummettema. F\u00f8rskole til 3. klasse. Gratis PDF.',
  'rumopgaver til b\u00f8rn, rum arbejdsark, rummet farvel\u00e6gning, rummet matematik, rummet f\u00f8rskole, rummet printbar, planeter opgaver, solsystemet til b\u00f8rn, astronaut opgaver, rummet ordopgaver, stjerner og planeter',
  'Rum-opgaver og \u00d8velser'
);

// 15. seasons
updateFile('seasons',
  'Gratis \u00c5rstider-opgaver til B\u00f8rn | LessonCraftStudio',
  'Printbare \u00e5rstider-opgaver til b\u00f8rn. Matematik, farvel\u00e6gning, ordspil og puslespil med \u00e5rstidertema. F\u00f8rskole til 3. klasse. Gratis PDF.',
  '\u00e5rstidsopgaver til b\u00f8rn, \u00e5rstider arbejdsark, \u00e5rstider farvel\u00e6gning, \u00e5rstider matematik, \u00e5rstider f\u00f8rskole, \u00e5rstider printbar, for\u00e5r sommer h\u00f8st vinter, \u00e5rstider sortering, \u00e5rstider ordopgaver, \u00e5rstider t\u00e6lling, \u00e5rstid og natur',
  '\u00c5rstid-opgaver og \u00d8velser'
);

// 16. holidays
updateFile('holidays',
  'Gratis Helligdage-opgaver til B\u00f8rn | LessonCraftStudio',
  'Printbare helligdage-opgaver til b\u00f8rn. Matematik, farvel\u00e6gning, ordspil og puslespil med helligdagetema. F\u00f8rskole til 3. klasse. Gratis PDF.',
  'helligdagsopgaver til b\u00f8rn, helligdage arbejdsark, h\u00f8jtider farvel\u00e6gning, helligdage matematik, helligdage f\u00f8rskole, helligdage printbar, fest og traditioner, helligdage puslespil, h\u00f8jtidsopgaver, helligdage ordopgaver, danske traditioner',
  'Helligdagsopgaver og \u00d8velser'
);

// 17. weather
updateFile('weather',
  'Gratis Vejr-opgaver til B\u00f8rn | LessonCraftStudio',
  'Printbare vejr-opgaver til b\u00f8rn. Matematik, farvel\u00e6gning, ordspil og puslespil med vejrtema. F\u00f8rskole til 3. klasse. Gratis PDF.',
  'vejropgaver til b\u00f8rn, vejr arbejdsark, vejr farvel\u00e6gning, vejr matematik, vejr f\u00f8rskole, vejr printbar, vejrtyper opgaver, vejrudsigt til b\u00f8rn, vejr og \u00e5rstider, vejr ordopgaver, vejr sortering',
  'Vejr-opgaver og \u00d8velser'
);

// 18. colors
updateFile('colors',
  'Gratis Farver-opgaver til B\u00f8rn | LessonCraftStudio',
  'Printbare farver-opgaver til b\u00f8rn. Matematik, farvel\u00e6gning, ordspil og puslespil med farvertema. F\u00f8rskole til 3. klasse. Gratis PDF.',
  'farveopgaver til b\u00f8rn, farver arbejdsark, farver farvel\u00e6gning, farver matematik, farver f\u00f8rskole, farver printbar, farvegenkendelse, farver blanding, farve sortering, farve ordopgaver, farvel\u00e6r til b\u00f8rn',
  'Farve-opgaver og \u00d8velser'
);

// 19. shapes
updateFile('shapes',
  'Gratis Former-opgaver til B\u00f8rn | LessonCraftStudio',
  'Printbare former-opgaver til b\u00f8rn. Matematik, farvel\u00e6gning, ordspil og puslespil med formertema. F\u00f8rskole til 3. klasse. Gratis PDF.',
  'formopgaver til b\u00f8rn, former arbejdsark, former farvel\u00e6gning, former matematik, former f\u00f8rskole, former printbar, geometri til b\u00f8rn, former genkendelse, former sortering, former ordopgaver, cirkel trekant firkant',
  'Form-opgaver og \u00d8velser'
);

// 20. numbers
updateFile('numbers',
  'Gratis Tal-opgaver til B\u00f8rn | LessonCraftStudio',
  'Printbare tal-opgaver til b\u00f8rn. Matematik, farvel\u00e6gning, ordspil og puslespil med taltema. F\u00f8rskole til 3. klasse. Gratis PDF.',
  'talopgaver til b\u00f8rn, tal arbejdsark, tal farvel\u00e6gning, tal matematik, tal f\u00f8rskole, tal printbar, talgenkendelse, t\u00e6lle\u00f8velser, tal skrivning, tal ordopgaver, talr\u00e6kker \u00f8velse',
  'Tal-opgaver og \u00d8velser'
);

console.log('All 10 Danish theme hubs (11-20) updated!');
