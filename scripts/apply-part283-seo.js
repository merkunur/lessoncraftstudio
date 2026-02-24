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

// 43. construction
updateFile('construction',
  'Gratis Byggarbetsplats-\u00f6vningar f\u00f6r Barn | LessonCraftStudio',
  'Utskrivbara byggarbetsplats-\u00f6vningar f\u00f6r barn. Matematik, m\u00e5larbilder, ordspel och pussel med byggarbetsplatstema. F\u00f6rskola till \u00e5rskurs 3. Gratis PDF.',
  'bygg\u00f6vningar barn, bygg arbetsblad, bygg m\u00e5larbilder, bygg matematik, bygg f\u00f6rskola, bygg utskrivbar, bygg pussel, bygg r\u00e4kning, bygg korsord, byggmaskiner \u00f6vning, konstruktion barn',
  'Bygg\u00f6vningar och Arbetsblad'
);

// 44. cooking
updateFile('cooking',
  'Gratis Matlagning-\u00f6vningar f\u00f6r Barn | LessonCraftStudio',
  'Utskrivbara matlagning-\u00f6vningar f\u00f6r barn. Matematik, m\u00e5larbilder, ordspel och pussel med matlagningtema. F\u00f6rskola till \u00e5rskurs 3. Gratis PDF.',
  'matlagnings\u00f6vningar barn, matlagnings arbetsblad, matlagnings m\u00e5larbilder, matlagnings matematik, matlagnings f\u00f6rskola, matlagnings utskrivbar, matlagnings pussel, matlagnings r\u00e4kning, matlagnings korsord, matrecept barn, k\u00f6ksredskap \u00f6vning',
  'Matlagnings\u00f6vningar och Arbetsblad'
);

// 45. travel
updateFile('travel',
  'Gratis Resor-\u00f6vningar f\u00f6r Barn | LessonCraftStudio',
  'Utskrivbara resor-\u00f6vningar f\u00f6r barn. Matematik, m\u00e5larbilder, ordspel och pussel med resortema. F\u00f6rskola till \u00e5rskurs 3. Gratis PDF.',
  'rese\u00f6vningar barn, rese arbetsblad, rese m\u00e5larbilder, rese matematik, rese f\u00f6rskola, rese utskrivbar, rese pussel, rese r\u00e4kning, rese korsord, resa och utforska, kartor \u00f6vning',
  'Rese\u00f6vningar och Arbetsblad'
);

// 46. birthday
updateFile('birthday',
  'Gratis F\u00f6delsedag-\u00f6vningar f\u00f6r Barn | LessonCraftStudio',
  'Utskrivbara f\u00f6delsedag-\u00f6vningar f\u00f6r barn. Matematik, m\u00e5larbilder, ordspel och pussel med f\u00f6delsedagtema. F\u00f6rskola till \u00e5rskurs 3. Gratis PDF.',
  'f\u00f6delsedags\u00f6vningar barn, f\u00f6delsedags arbetsblad, f\u00f6delsedags m\u00e5larbilder, f\u00f6delsedags matematik, f\u00f6delsedags f\u00f6rskola, f\u00f6delsedags utskrivbar, f\u00f6delsedags pussel, f\u00f6delsedags r\u00e4kning, f\u00f6delsedags korsord, f\u00f6delsedagsfirande, f\u00f6delsedagskalas',
  'F\u00f6delsedags\u00f6vningar och Arbetsblad'
);

// 47. circus
updateFile('circus',
  'Gratis Cirkus-\u00f6vningar f\u00f6r Barn | LessonCraftStudio',
  'Utskrivbara cirkus-\u00f6vningar f\u00f6r barn. Matematik, m\u00e5larbilder, ordspel och pussel med cirkustema. F\u00f6rskola till \u00e5rskurs 3. Gratis PDF.',
  'cirkus\u00f6vningar barn, cirkus arbetsblad, cirkus m\u00e5larbilder, cirkus matematik, cirkus f\u00f6rskola, cirkus utskrivbar, cirkus pussel, cirkus r\u00e4kning, cirkus korsord, cirkusartister \u00f6vning, jonglering och akrobatik',
  'Cirkus\u00f6vningar och Arbetsblad'
);

// 48. forest
updateFile('forest',
  'Gratis Skog-\u00f6vningar f\u00f6r Barn | LessonCraftStudio',
  'Utskrivbara skog-\u00f6vningar f\u00f6r barn. Matematik, m\u00e5larbilder, ordspel och pussel med skogtema. F\u00f6rskola till \u00e5rskurs 3. Gratis PDF.',
  'skogs\u00f6vningar barn, skogs arbetsblad, skogs m\u00e5larbilder, skogs matematik, skogs f\u00f6rskola, skogs utskrivbar, skogs pussel, skogs r\u00e4kning, skogs korsord, skogsliv \u00f6vning, skogsdjur barn',
  'Skogs\u00f6vningar och Arbetsblad'
);

// 49. spring
updateFile('spring',
  'Gratis V\u00e5r-\u00f6vningar f\u00f6r Barn | LessonCraftStudio',
  'Utskrivbara v\u00e5r-\u00f6vningar f\u00f6r barn. Matematik, m\u00e5larbilder, ordspel och pussel med v\u00e5rtema. F\u00f6rskola till \u00e5rskurs 3. Gratis PDF.',
  'v\u00e5r\u00f6vningar barn, v\u00e5r arbetsblad, v\u00e5r m\u00e5larbilder, v\u00e5r matematik, v\u00e5r f\u00f6rskola, v\u00e5r utskrivbar, v\u00e5r pussel, v\u00e5r r\u00e4kning, v\u00e5r korsord, v\u00e5rtecken \u00f6vning, v\u00e5rblommor',
  'V\u00e5r\u00f6vningar och Arbetsblad'
);

console.log('All 7 SV theme hubs (43-49) updated!');
