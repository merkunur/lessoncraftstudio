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

// 21. alphabet
updateFile('alphabet',
  'Gratis Alfabet-opgaver til B\u00f8rn | LessonCraftStudio',
  'Printbare alfabet-opgaver til b\u00f8rn. Matematik, farvel\u00e6gning, ordspil og puslespil med alfabettema. F\u00f8rskole til 3. klasse. Gratis PDF.',
  'alfabetopgaver til b\u00f8rn, alfabet arbejdsark, bogstaver farvel\u00e6gning, alfabet f\u00f8rskole, alfabet printbar, bogstavgenkendelse, alfabet r\u00e6kkef\u00f8lge, bogstav\u00f8velser, l\u00e6re bogstaver, alfabet ordopgaver, bogstavlyd \u00f8velser',
  'Alfabet-opgaver og \u00d8velser'
);

// 22. furniture
updateFile('furniture',
  'Gratis M\u00f8bler-opgaver til B\u00f8rn | LessonCraftStudio',
  'Printbare m\u00f8bler-opgaver til b\u00f8rn. Matematik, farvel\u00e6gning, ordspil og puslespil med m\u00f8blertema. F\u00f8rskole til 3. klasse. Gratis PDF.',
  'm\u00f8belopgaver til b\u00f8rn, m\u00f8bler arbejdsark, m\u00f8bler farvel\u00e6gning, m\u00f8bler f\u00f8rskole, m\u00f8bler printbar, hjemmets m\u00f8bler, m\u00f8bler sortering, m\u00f8bler ordopgaver, rum og m\u00f8bler, m\u00f8bler matchning, m\u00f8bler navngivning',
  'M\u00f8bel-opgaver og \u00d8velser'
);

// 23. easter
updateFile('easter',
  'Gratis P\u00e5ske-opgaver til B\u00f8rn | LessonCraftStudio',
  'Printbare p\u00e5ske-opgaver til b\u00f8rn. Matematik, farvel\u00e6gning, ordspil og puslespil med p\u00e5sketema. F\u00f8rskole til 3. klasse. Gratis PDF.',
  'p\u00e5skeopgaver til b\u00f8rn, p\u00e5ske arbejdsark, p\u00e5ske farvel\u00e6gning, p\u00e5ske matematik, p\u00e5ske f\u00f8rskole, p\u00e5ske printbar, p\u00e5ske\u00e6g opgaver, p\u00e5skehare, p\u00e5ske puslespil, p\u00e5ske ordopgaver, p\u00e5ske aktiviteter',
  'P\u00e5ske-opgaver og \u00d8velser'
);

// 24. halloween
updateFile('halloween',
  'Gratis Halloween-opgaver til B\u00f8rn | LessonCraftStudio',
  'Printbare halloween-opgaver til b\u00f8rn. Matematik, farvel\u00e6gning, ordspil og puslespil med halloweentema. F\u00f8rskole til 3. klasse. Gratis PDF.',
  'halloween-opgaver til b\u00f8rn, halloween arbejdsark, halloween farvel\u00e6gning, halloween matematik, halloween f\u00f8rskole, halloween printbar, halloween puslespil, uhyggelige opgaver, sp\u00f8gelse opgaver, halloween ordopgaver, halloween aktiviteter',
  'Halloween-opgaver og \u00d8velser'
);

// 25. xmas
updateFile('xmas',
  'Gratis Jul-opgaver til B\u00f8rn | LessonCraftStudio',
  'Printbare jul-opgaver til b\u00f8rn. Matematik, farvel\u00e6gning, ordspil og puslespil med jultema. F\u00f8rskole til 3. klasse. Gratis PDF.',
  'juleopgaver til b\u00f8rn, jul arbejdsark, jul farvel\u00e6gning, jul matematik, jul f\u00f8rskole, jul printbar, julemanden opgaver, julens traditioner, jul puslespil, jul ordopgaver, jule aktiviteter',
  'Jule-opgaver og \u00d8velser'
);

// 26. winter
updateFile('winter',
  'Gratis Vinter-opgaver til B\u00f8rn | LessonCraftStudio',
  'Printbare vinter-opgaver til b\u00f8rn. Matematik, farvel\u00e6gning, ordspil og puslespil med vintertema. F\u00f8rskole til 3. klasse. Gratis PDF.',
  'vinteropgaver til b\u00f8rn, vinter arbejdsark, vinter farvel\u00e6gning, vinter matematik, vinter f\u00f8rskole, vinter printbar, sne opgaver, vinter aktiviteter, vinter puslespil, vinter ordopgaver, vinterlige \u00f8velser',
  'Vinter-opgaver og \u00d8velser'
);

// 27. farm
updateFile('farm',
  'Gratis Bondeg\u00e5rd-opgaver til B\u00f8rn | LessonCraftStudio',
  'Printbare bondeg\u00e5rd-opgaver til b\u00f8rn. Matematik, farvel\u00e6gning, ordspil og puslespil med bondeg\u00e5rdtema. F\u00f8rskole til 3. klasse. Gratis PDF.',
  'bondeg\u00e5rdsopgaver til b\u00f8rn, bondeg\u00e5rd arbejdsark, bondeg\u00e5rd farvel\u00e6gning, bondeg\u00e5rd matematik, bondeg\u00e5rd f\u00f8rskole, bondeg\u00e5rd printbar, husdyr opgaver, bondeg\u00e5rd puslespil, h\u00f8st og afg\u00f8der, bondeg\u00e5rd ordopgaver, landbrug til b\u00f8rn',
  'Bondeg\u00e5rd-opgaver og \u00d8velser'
);

// 28. ocean
updateFile('ocean',
  'Gratis Hav-opgaver til B\u00f8rn | LessonCraftStudio',
  'Printbare hav-opgaver til b\u00f8rn. Matematik, farvel\u00e6gning, ordspil og puslespil med havtema. F\u00f8rskole til 3. klasse. Gratis PDF.',
  'havopgaver til b\u00f8rn, hav arbejdsark, hav farvel\u00e6gning, hav matematik, hav f\u00f8rskole, hav printbar, havdyr opgaver, undervands opgaver, hav puslespil, hav ordopgaver, havet til b\u00f8rn',
  'Hav-opgaver og \u00d8velser'
);

// 29. dinosaurs
updateFile('dinosaurs',
  'Gratis Dinosaurer-opgaver til B\u00f8rn | LessonCraftStudio',
  'Printbare dinosaurer-opgaver til b\u00f8rn. Matematik, farvel\u00e6gning, ordspil og puslespil med dinosaurertema. F\u00f8rskole til 3. klasse. Gratis PDF.',
  'dinosauropgaver til b\u00f8rn, dinosaur arbejdsark, dinosaur farvel\u00e6gning, dinosaur matematik, dinosaur f\u00f8rskole, dinosaur printbar, T-Rex opgaver, fossil opgaver, dinosaur puslespil, dinosaur ordopgaver, forhistoriske dyr',
  'Dinosaur-opgaver og \u00d8velser'
);

// 30. insects
updateFile('insects',
  'Gratis Insekter-opgaver til B\u00f8rn | LessonCraftStudio',
  'Printbare insekter-opgaver til b\u00f8rn. Matematik, farvel\u00e6gning, ordspil og puslespil med insektertema. F\u00f8rskole til 3. klasse. Gratis PDF.',
  'insektopgaver til b\u00f8rn, insekt arbejdsark, insekt farvel\u00e6gning, insekt matematik, insekt f\u00f8rskole, insekt printbar, sommerfugle opgaver, insekt puslespil, sm\u00e5kryb til b\u00f8rn, insekt ordopgaver, insekter i naturen',
  'Insekt-opgaver og \u00d8velser'
);

console.log('All 10 Danish theme hubs (21-30) updated!');
