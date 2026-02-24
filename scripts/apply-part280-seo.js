const fs = require('fs');
const path = require('path');

const base = 'C:/Users/rkgen/lessoncraftstudio/frontend/content/themes';
const BS = String.fromCharCode(92); // backslash char

function updateFile(dir, title, desc, keywords, heading) {
  const fp = path.join(base, dir, 'sv.ts');
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
  console.log('Updated: ' + dir + '/sv.ts (' + (usesEscapes ? 'escaped' : 'unicode') + ')');
}

// 22. furniture
updateFile('furniture',
  'Gratis M\u00f6bler-\u00f6vningar f\u00f6r Barn | LessonCraftStudio',
  'Utskrivbara m\u00f6bler-\u00f6vningar f\u00f6r barn. Matematik, m\u00e5larbilder, ordspel och pussel med m\u00f6blertema. F\u00f6rskola till \u00e5rskurs 3. Gratis PDF.',
  'm\u00f6bel\u00f6vningar barn, m\u00f6bel arbetsblad, m\u00f6bel m\u00e5larbilder, m\u00f6bel matematik, m\u00f6bel f\u00f6rskola, m\u00f6bel utskrivbar, m\u00f6bel pussel, m\u00f6bel r\u00e4kning, m\u00f6bel korsord, m\u00f6bler och rum, heminredning \u00f6vning',
  'M\u00f6bel\u00f6vningar och Arbetsblad'
);

// 23. easter
updateFile('easter',
  'Gratis P\u00e5sk-\u00f6vningar f\u00f6r Barn | LessonCraftStudio',
  'Utskrivbara p\u00e5sk-\u00f6vningar f\u00f6r barn. Matematik, m\u00e5larbilder, ordspel och pussel med p\u00e5sktema. F\u00f6rskola till \u00e5rskurs 3. Gratis PDF.',
  'p\u00e5sk\u00f6vningar barn, p\u00e5sk arbetsblad, p\u00e5sk m\u00e5larbilder, p\u00e5sk matematik, p\u00e5sk f\u00f6rskola, p\u00e5sk utskrivbar, p\u00e5sk pussel, p\u00e5sk r\u00e4kning, p\u00e5sk korsord, p\u00e5sk\u00e4gg \u00f6vning, v\u00e5rfirande',
  'P\u00e5sk\u00f6vningar och Arbetsblad'
);

// 24. halloween
updateFile('halloween',
  'Gratis Halloween-\u00f6vningar f\u00f6r Barn | LessonCraftStudio',
  'Utskrivbara halloween-\u00f6vningar f\u00f6r barn. Matematik, m\u00e5larbilder, ordspel och pussel med halloweentema. F\u00f6rskola till \u00e5rskurs 3. Gratis PDF.',
  'halloween\u00f6vningar barn, halloween arbetsblad, halloween m\u00e5larbilder, halloween matematik, halloween f\u00f6rskola, halloween utskrivbar, halloween pussel, halloween r\u00e4kning, halloween korsord, sp\u00f6ke \u00f6vning, halloween pyssel',
  'Halloween\u00f6vningar och Arbetsblad'
);

// 25. xmas
updateFile('xmas',
  'Gratis Jul-\u00f6vningar f\u00f6r Barn | LessonCraftStudio',
  'Utskrivbara jul-\u00f6vningar f\u00f6r barn. Matematik, m\u00e5larbilder, ordspel och pussel med jultema. F\u00f6rskola till \u00e5rskurs 3. Gratis PDF.',
  'jul\u00f6vningar barn, jul arbetsblad, jul m\u00e5larbilder, jul matematik, jul f\u00f6rskola, jul utskrivbar, jul pussel, jul r\u00e4kning, jul korsord, julpyssel \u00f6vning, julkalender barn',
  'Jul\u00f6vningar och Arbetsblad'
);

// 26. winter
updateFile('winter',
  'Gratis Vinter-\u00f6vningar f\u00f6r Barn | LessonCraftStudio',
  'Utskrivbara vinter-\u00f6vningar f\u00f6r barn. Matematik, m\u00e5larbilder, ordspel och pussel med vintertema. F\u00f6rskola till \u00e5rskurs 3. Gratis PDF.',
  'vinter\u00f6vningar barn, vinter arbetsblad, vinter m\u00e5larbilder, vinter matematik, vinter f\u00f6rskola, vinter utskrivbar, vinter pussel, vinter r\u00e4kning, vinter korsord, sn\u00f6 och is \u00f6vning, vinteraktiviteter',
  'Vinter\u00f6vningar och Arbetsblad'
);

// 27. farm
updateFile('farm',
  'Gratis Bondg\u00e5rd-\u00f6vningar f\u00f6r Barn | LessonCraftStudio',
  'Utskrivbara bondg\u00e5rd-\u00f6vningar f\u00f6r barn. Matematik, m\u00e5larbilder, ordspel och pussel med bondg\u00e5rdtema. F\u00f6rskola till \u00e5rskurs 3. Gratis PDF.',
  'bondg\u00e5rds\u00f6vningar barn, bondg\u00e5rds arbetsblad, bondg\u00e5rds m\u00e5larbilder, bondg\u00e5rds matematik, bondg\u00e5rds f\u00f6rskola, bondg\u00e5rds utskrivbar, bondg\u00e5rds pussel, bondg\u00e5rds r\u00e4kning, bondg\u00e5rds korsord, bondg\u00e5rdsdjur \u00f6vning, sk\u00f6rd och odling',
  'Bondg\u00e5rds\u00f6vningar och Arbetsblad'
);

// 28. ocean
updateFile('ocean',
  'Gratis Hav-\u00f6vningar f\u00f6r Barn | LessonCraftStudio',
  'Utskrivbara hav-\u00f6vningar f\u00f6r barn. Matematik, m\u00e5larbilder, ordspel och pussel med havtema. F\u00f6rskola till \u00e5rskurs 3. Gratis PDF.',
  'havs\u00f6vningar barn, havs arbetsblad, havs m\u00e5larbilder, havs matematik, havs f\u00f6rskola, havs utskrivbar, havs pussel, havs r\u00e4kning, havs korsord, havsdjur \u00f6vning, undervattensv\u00e4rld',
  'Havs\u00f6vningar och Arbetsblad'
);

console.log('All 7 SV theme hubs (22-28) updated!');
