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

// 31. fruits
updateFile('fruits',
  'Gratis Frugter-opgaver til B\u00f8rn | LessonCraftStudio',
  'Printbare frugter-opgaver til b\u00f8rn. Matematik, farvel\u00e6gning, ordspil og puslespil med frugtertema. F\u00f8rskole til 3. klasse. Gratis PDF.',
  'frugtopgaver til b\u00f8rn, frugt arbejdsark, frugt farvel\u00e6gning, frugt matematik, frugt f\u00f8rskole, frugt printbar, sunde frugter, frugt sortering, frugt puslespil, frugt ordopgaver, frugter og b\u00e6r',
  'Frugt-opgaver og \u00d8velser'
);

// 32. vegetables
updateFile('vegetables',
  'Gratis Gr\u00f8ntsager-opgaver til B\u00f8rn | LessonCraftStudio',
  'Printbare gr\u00f8ntsager-opgaver til b\u00f8rn. Matematik, farvel\u00e6gning, ordspil og puslespil med gr\u00f8ntsagertema. F\u00f8rskole til 3. klasse. Gratis PDF.',
  'gr\u00f8ntsagsopgaver til b\u00f8rn, gr\u00f8ntsager arbejdsark, gr\u00f8ntsager farvel\u00e6gning, gr\u00f8ntsager matematik, gr\u00f8ntsager f\u00f8rskole, gr\u00f8ntsager printbar, sunde gr\u00f8ntsager, gr\u00f8ntsager sortering, gr\u00f8ntsager puslespil, gr\u00f8ntsager ordopgaver, gr\u00f8ntsager i k\u00f8kkenet',
  'Gr\u00f8ntsag-opgaver og \u00d8velser'
);

// 33. flowers
updateFile('flowers',
  'Gratis Blomster-opgaver til B\u00f8rn | LessonCraftStudio',
  'Printbare blomster-opgaver til b\u00f8rn. Matematik, farvel\u00e6gning, ordspil og puslespil med blomstertema. F\u00f8rskole til 3. klasse. Gratis PDF.',
  'blomsteropgaver til b\u00f8rn, blomster arbejdsark, blomster farvel\u00e6gning, blomster matematik, blomster f\u00f8rskole, blomster printbar, for\u00e5rsblomster, blomster puslespil, blomster sortering, blomster ordopgaver, blomster i haven',
  'Blomster-opgaver og \u00d8velser'
);

// 34. birds
updateFile('birds',
  'Gratis Fugle-opgaver til B\u00f8rn | LessonCraftStudio',
  'Printbare fugle-opgaver til b\u00f8rn. Matematik, farvel\u00e6gning, ordspil og puslespil med fugletema. F\u00f8rskole til 3. klasse. Gratis PDF.',
  'fugleopgaver til b\u00f8rn, fugle arbejdsark, fugle farvel\u00e6gning, fugle matematik, fugle f\u00f8rskole, fugle printbar, fuglearter opgaver, fugle puslespil, fugle sortering, fugle ordopgaver, fugle i naturen',
  'Fugle-opgaver og \u00d8velser'
);

// 35. pets
updateFile('pets',
  'Gratis K\u00e6ledyr-opgaver til B\u00f8rn | LessonCraftStudio',
  'Printbare k\u00e6ledyr-opgaver til b\u00f8rn. Matematik, farvel\u00e6gning, ordspil og puslespil med k\u00e6ledyrtema. F\u00f8rskole til 3. klasse. Gratis PDF.',
  'k\u00e6ledyrsopgaver til b\u00f8rn, k\u00e6ledyr arbejdsark, k\u00e6ledyr farvel\u00e6gning, k\u00e6ledyr matematik, k\u00e6ledyr f\u00f8rskole, k\u00e6ledyr printbar, hund og kat opgaver, k\u00e6ledyr puslespil, dyrepasning, k\u00e6ledyr ordopgaver, k\u00e6ledyr sortering',
  'K\u00e6ledyr-opgaver og \u00d8velser'
);

// 36. zoo
updateFile('zoo',
  'Gratis Zoo-opgaver til B\u00f8rn | LessonCraftStudio',
  'Printbare zoo-opgaver til b\u00f8rn. Matematik, farvel\u00e6gning, ordspil og puslespil med zootema. F\u00f8rskole til 3. klasse. Gratis PDF.',
  'zoo-opgaver til b\u00f8rn, zoo arbejdsark, zoo farvel\u00e6gning, zoo matematik, zoo f\u00f8rskole, zoo printbar, zoologiske dyr, zoo puslespil, zoo bes\u00f8g, zoo ordopgaver, dyreparken opgaver',
  'Zoo-opgaver og \u00d8velser'
);

// 37. garden
updateFile('garden',
  'Gratis Have-opgaver til B\u00f8rn | LessonCraftStudio',
  'Printbare have-opgaver til b\u00f8rn. Matematik, farvel\u00e6gning, ordspil og puslespil med havetema. F\u00f8rskole til 3. klasse. Gratis PDF.',
  'haveopgaver til b\u00f8rn, have arbejdsark, have farvel\u00e6gning, have matematik, have f\u00f8rskole, have printbar, havearbejde til b\u00f8rn, have puslespil, planter og blomster, have ordopgaver, havens dyr',
  'Have-opgaver og \u00d8velser'
);

// 38. camping
updateFile('camping',
  'Gratis Camping-opgaver til B\u00f8rn | LessonCraftStudio',
  'Printbare camping-opgaver til b\u00f8rn. Matematik, farvel\u00e6gning, ordspil og puslespil med campingtema. F\u00f8rskole til 3. klasse. Gratis PDF.',
  'campingopgaver til b\u00f8rn, camping arbejdsark, camping farvel\u00e6gning, camping matematik, camping f\u00f8rskole, camping printbar, friluftsliv opgaver, camping puslespil, naturen ude, camping ordopgaver, camping aktiviteter',
  'Camping-opgaver og \u00d8velser'
);

// 39. pirates
updateFile('pirates',
  'Gratis Pirater-opgaver til B\u00f8rn | LessonCraftStudio',
  'Printbare pirater-opgaver til b\u00f8rn. Matematik, farvel\u00e6gning, ordspil og puslespil med piratertema. F\u00f8rskole til 3. klasse. Gratis PDF.',
  'piratopgaver til b\u00f8rn, pirat arbejdsark, pirat farvel\u00e6gning, pirat matematik, pirat f\u00f8rskole, pirat printbar, pirat eventyr, pirat puslespil, skattek\u00f8rt, pirat ordopgaver, pirat aktiviteter',
  'Pirat-opgaver og \u00d8velser'
);

// 40. fairy-tales
updateFile('fairy-tales',
  'Gratis Eventyr-opgaver til B\u00f8rn | LessonCraftStudio',
  'Printbare eventyr-opgaver til b\u00f8rn. Matematik, farvel\u00e6gning, ordspil og puslespil med eventyrtema. F\u00f8rskole til 3. klasse. Gratis PDF.',
  'eventyropgaver til b\u00f8rn, eventyr arbejdsark, eventyr farvel\u00e6gning, eventyr matematik, eventyr f\u00f8rskole, eventyr printbar, H.C. Andersen opgaver, eventyr puslespil, eventyrhelte, eventyr ordopgaver, eventyr aktiviteter',
  'Eventyr-opgaver og \u00d8velser'
);

console.log('All 10 Danish theme hubs (31-40) updated!');
