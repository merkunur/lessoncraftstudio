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

// 8. body
updateFile('body',
  'Gratis Kroppen-\u00f6vningar f\u00f6r Barn | LessonCraftStudio',
  'Utskrivbara kroppen-\u00f6vningar f\u00f6r barn. Matematik, m\u00e5larbilder, ordspel och pussel med kroppentema. F\u00f6rskola till \u00e5rskurs 3. Gratis PDF.',
  'kropps\u00f6vningar barn, kropps arbetsblad, kropps m\u00e5larbilder, kropps matematik, kropps f\u00f6rskola, kropps utskrivbar, kropps pussel, kropps r\u00e4kning, kropps korsord, kroppens delar, h\u00e4lsa barn',
  'Kropps\u00f6vningar och Arbetsblad'
);

// 9. clothing
updateFile('clothing',
  'Gratis Kl\u00e4der-\u00f6vningar f\u00f6r Barn | LessonCraftStudio',
  'Utskrivbara kl\u00e4der-\u00f6vningar f\u00f6r barn. Matematik, m\u00e5larbilder, ordspel och pussel med kl\u00e4dertema. F\u00f6rskola till \u00e5rskurs 3. Gratis PDF.',
  'kl\u00e4d\u00f6vningar barn, kl\u00e4d arbetsblad, kl\u00e4d m\u00e5larbilder, kl\u00e4d matematik, kl\u00e4d f\u00f6rskola, kl\u00e4d utskrivbar, kl\u00e4d pussel, kl\u00e4d r\u00e4kning, kl\u00e4d korsord, kl\u00e4der och \u00e5rstider, p\u00e5kl\u00e4dning \u00f6vning',
  'Kl\u00e4d\u00f6vningar och Arbetsblad'
);

// 10. household
updateFile('household',
  'Gratis Hush\u00e5ll-\u00f6vningar f\u00f6r Barn | LessonCraftStudio',
  'Utskrivbara hush\u00e5ll-\u00f6vningar f\u00f6r barn. Matematik, m\u00e5larbilder, ordspel och pussel med hush\u00e5lltema. F\u00f6rskola till \u00e5rskurs 3. Gratis PDF.',
  'hush\u00e5lls\u00f6vningar barn, hush\u00e5lls arbetsblad, hush\u00e5lls m\u00e5larbilder, hush\u00e5lls matematik, hush\u00e5lls f\u00f6rskola, hush\u00e5lls utskrivbar, hush\u00e5lls pussel, hush\u00e5lls r\u00e4kning, hush\u00e5lls korsord, hemmet \u00f6vningar, hush\u00e5llsf\u00f6rem\u00e5l',
  'Hush\u00e5lls\u00f6vningar och Arbetsblad'
);

// 11. toys
updateFile('toys',
  'Gratis Leksaker-\u00f6vningar f\u00f6r Barn | LessonCraftStudio',
  'Utskrivbara leksaker-\u00f6vningar f\u00f6r barn. Matematik, m\u00e5larbilder, ordspel och pussel med leksakertema. F\u00f6rskola till \u00e5rskurs 3. Gratis PDF.',
  'leksaks\u00f6vningar barn, leksaks arbetsblad, leksaks m\u00e5larbilder, leksaks matematik, leksaks f\u00f6rskola, leksaks utskrivbar, leksaks pussel, leksaks r\u00e4kning, leksaks korsord, leksaker och lek, leksaker klassificering',
  'Leksaks\u00f6vningar och Arbetsblad'
);

// 12. music
updateFile('music',
  'Gratis Musik-\u00f6vningar f\u00f6r Barn | LessonCraftStudio',
  'Utskrivbara musik-\u00f6vningar f\u00f6r barn. Matematik, m\u00e5larbilder, ordspel och pussel med musiktema. F\u00f6rskola till \u00e5rskurs 3. Gratis PDF.',
  'musik\u00f6vningar barn, musik arbetsblad, musik m\u00e5larbilder, musik matematik, musik f\u00f6rskola, musik utskrivbar, musik pussel, musik r\u00e4kning, musik korsord, musikinstrument \u00f6vning, musikrytm barn',
  'Musik\u00f6vningar och Arbetsblad'
);

// 13. jobs
updateFile('jobs',
  'Gratis Yrken-\u00f6vningar f\u00f6r Barn | LessonCraftStudio',
  'Utskrivbara yrken-\u00f6vningar f\u00f6r barn. Matematik, m\u00e5larbilder, ordspel och pussel med yrkentema. F\u00f6rskola till \u00e5rskurs 3. Gratis PDF.',
  'yrkes\u00f6vningar barn, yrkes arbetsblad, yrkes m\u00e5larbilder, yrkes matematik, yrkes f\u00f6rskola, yrkes utskrivbar, yrkes pussel, yrkes r\u00e4kning, yrkes korsord, samh\u00e4llsyrken \u00f6vning, yrkesverktyg',
  'Yrkes\u00f6vningar och Arbetsblad'
);

// 14. space
updateFile('space',
  'Gratis Rymden-\u00f6vningar f\u00f6r Barn | LessonCraftStudio',
  'Utskrivbara rymden-\u00f6vningar f\u00f6r barn. Matematik, m\u00e5larbilder, ordspel och pussel med rymdentema. F\u00f6rskola till \u00e5rskurs 3. Gratis PDF.',
  'rymd\u00f6vningar barn, rymd arbetsblad, rymd m\u00e5larbilder, rymd matematik, rymd f\u00f6rskola, rymd utskrivbar, rymd pussel, rymd r\u00e4kning, rymd korsord, planeter \u00f6vning, solsystemet barn',
  'Rymd\u00f6vningar och Arbetsblad'
);

console.log('All 7 SV theme hubs (8-14) updated!');
