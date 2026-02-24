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

// 15. seasons
updateFile('seasons',
  'Gratis \u00c5rstider-\u00f6vningar f\u00f6r Barn | LessonCraftStudio',
  'Utskrivbara \u00e5rstider-\u00f6vningar f\u00f6r barn. Matematik, m\u00e5larbilder, ordspel och pussel med \u00e5rstidertema. F\u00f6rskola till \u00e5rskurs 3. Gratis PDF.',
  '\u00e5rstids\u00f6vningar barn, \u00e5rstids arbetsblad, \u00e5rstids m\u00e5larbilder, \u00e5rstids matematik, \u00e5rstids f\u00f6rskola, \u00e5rstids utskrivbar, \u00e5rstids pussel, \u00e5rstids r\u00e4kning, \u00e5rstids korsord, \u00e5rstidsv\u00e4xling, spr\u00e5k och \u00e5rstider',
  '\u00c5rstids\u00f6vningar och Arbetsblad'
);

// 16. holidays
updateFile('holidays',
  'Gratis Helgdagar-\u00f6vningar f\u00f6r Barn | LessonCraftStudio',
  'Utskrivbara helgdagar-\u00f6vningar f\u00f6r barn. Matematik, m\u00e5larbilder, ordspel och pussel med helgdagartema. F\u00f6rskola till \u00e5rskurs 3. Gratis PDF.',
  'helgdags\u00f6vningar barn, helgdags arbetsblad, helgdags m\u00e5larbilder, helgdags matematik, helgdags f\u00f6rskola, helgdags utskrivbar, helgdags pussel, helgdags r\u00e4kning, helgdags korsord, h\u00f6gtider \u00f6vning, traditioner barn',
  'Helgdags\u00f6vningar och Arbetsblad'
);

// 17. weather
updateFile('weather',
  'Gratis V\u00e4der-\u00f6vningar f\u00f6r Barn | LessonCraftStudio',
  'Utskrivbara v\u00e4der-\u00f6vningar f\u00f6r barn. Matematik, m\u00e5larbilder, ordspel och pussel med v\u00e4dertema. F\u00f6rskola till \u00e5rskurs 3. Gratis PDF.',
  'v\u00e4der\u00f6vningar barn, v\u00e4der arbetsblad, v\u00e4der m\u00e5larbilder, v\u00e4der matematik, v\u00e4der f\u00f6rskola, v\u00e4der utskrivbar, v\u00e4der pussel, v\u00e4der r\u00e4kning, v\u00e4der korsord, v\u00e4derfenomen \u00f6vning, termometer \u00f6vning',
  'V\u00e4der\u00f6vningar och Arbetsblad'
);

// 18. colors
updateFile('colors',
  'Gratis F\u00e4rger-\u00f6vningar f\u00f6r Barn | LessonCraftStudio',
  'Utskrivbara f\u00e4rger-\u00f6vningar f\u00f6r barn. Matematik, m\u00e5larbilder, ordspel och pussel med f\u00e4rgertema. F\u00f6rskola till \u00e5rskurs 3. Gratis PDF.',
  'f\u00e4rg\u00f6vningar barn, f\u00e4rg arbetsblad, f\u00e4rg m\u00e5larbilder, f\u00e4rg matematik, f\u00e4rg f\u00f6rskola, f\u00e4rg utskrivbar, f\u00e4rg pussel, f\u00e4rg r\u00e4kning, f\u00e4rg korsord, f\u00e4rgl\u00e4rning, prim\u00e4rf\u00e4rger \u00f6vning',
  'F\u00e4rg\u00f6vningar och Arbetsblad'
);

// 19. shapes
updateFile('shapes',
  'Gratis Former-\u00f6vningar f\u00f6r Barn | LessonCraftStudio',
  'Utskrivbara former-\u00f6vningar f\u00f6r barn. Matematik, m\u00e5larbilder, ordspel och pussel med formertema. F\u00f6rskola till \u00e5rskurs 3. Gratis PDF.',
  'form\u00f6vningar barn, form arbetsblad, form m\u00e5larbilder, form matematik, form f\u00f6rskola, form utskrivbar, form pussel, form r\u00e4kning, form korsord, geometriska former, former och m\u00f6nster',
  'Form\u00f6vningar och Arbetsblad'
);

// 20. numbers
updateFile('numbers',
  'Gratis Siffror-\u00f6vningar f\u00f6r Barn | LessonCraftStudio',
  'Utskrivbara siffror-\u00f6vningar f\u00f6r barn. Matematik, m\u00e5larbilder, ordspel och pussel med siffrortema. F\u00f6rskola till \u00e5rskurs 3. Gratis PDF.',
  'siffer\u00f6vningar barn, siffer arbetsblad, siffer m\u00e5larbilder, siffer matematik, siffer f\u00f6rskola, siffer utskrivbar, siffer pussel, siffer r\u00e4kning, siffer korsord, siffror 1\u201320, antaligenk\u00e4nning',
  'Siffer\u00f6vningar och Arbetsblad'
);

// 21. alphabet
updateFile('alphabet',
  'Gratis Alfabet-\u00f6vningar f\u00f6r Barn | LessonCraftStudio',
  'Utskrivbara alfabet-\u00f6vningar f\u00f6r barn. Matematik, m\u00e5larbilder, ordspel och pussel med alfabettema. F\u00f6rskola till \u00e5rskurs 3. Gratis PDF.',
  'alfabet\u00f6vningar barn, alfabet arbetsblad, alfabet m\u00e5larbilder, alfabet matematik, alfabet f\u00f6rskola, alfabet utskrivbar, alfabet pussel, alfabet r\u00e4kning, alfabet korsord, bokstavsinl\u00e4rning, fonetik \u00f6vning',
  'Alfabet\u00f6vningar och Arbetsblad'
);

console.log('All 7 SV theme hubs (15-21) updated!');
