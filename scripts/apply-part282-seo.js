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

// 36. zoo
updateFile('zoo',
  'Gratis Djurpark-\u00f6vningar f\u00f6r Barn | LessonCraftStudio',
  'Utskrivbara djurpark-\u00f6vningar f\u00f6r barn. Matematik, m\u00e5larbilder, ordspel och pussel med djurparktema. F\u00f6rskola till \u00e5rskurs 3. Gratis PDF.',
  'djurparks\u00f6vningar barn, djurparks arbetsblad, djurparks m\u00e5larbilder, djurparks matematik, djurparks f\u00f6rskola, djurparks utskrivbar, djurparks pussel, djurparks r\u00e4kning, djurparks korsord, djurparksdjur, exotiska djur \u00f6vning',
  'Djurparks\u00f6vningar och Arbetsblad'
);

// 37. garden
updateFile('garden',
  'Gratis Tr\u00e4dg\u00e5rd-\u00f6vningar f\u00f6r Barn | LessonCraftStudio',
  'Utskrivbara tr\u00e4dg\u00e5rd-\u00f6vningar f\u00f6r barn. Matematik, m\u00e5larbilder, ordspel och pussel med tr\u00e4dg\u00e5rdtema. F\u00f6rskola till \u00e5rskurs 3. Gratis PDF.',
  'tr\u00e4dg\u00e5rds\u00f6vningar barn, tr\u00e4dg\u00e5rds arbetsblad, tr\u00e4dg\u00e5rds m\u00e5larbilder, tr\u00e4dg\u00e5rds matematik, tr\u00e4dg\u00e5rds f\u00f6rskola, tr\u00e4dg\u00e5rds utskrivbar, tr\u00e4dg\u00e5rds pussel, tr\u00e4dg\u00e5rds r\u00e4kning, tr\u00e4dg\u00e5rds korsord, tr\u00e4dg\u00e5rdsv\u00e4xter, plantera och odla',
  'Tr\u00e4dg\u00e5rds\u00f6vningar och Arbetsblad'
);

// 38. camping
updateFile('camping',
  'Gratis Camping-\u00f6vningar f\u00f6r Barn | LessonCraftStudio',
  'Utskrivbara camping-\u00f6vningar f\u00f6r barn. Matematik, m\u00e5larbilder, ordspel och pussel med campingtema. F\u00f6rskola till \u00e5rskurs 3. Gratis PDF.',
  'camping\u00f6vningar barn, camping arbetsblad, camping m\u00e5larbilder, camping matematik, camping f\u00f6rskola, camping utskrivbar, camping pussel, camping r\u00e4kning, camping korsord, camping i naturen, friluftsliv barn',
  'Camping\u00f6vningar och Arbetsblad'
);

// 39. pirates
updateFile('pirates',
  'Gratis Pirater-\u00f6vningar f\u00f6r Barn | LessonCraftStudio',
  'Utskrivbara pirater-\u00f6vningar f\u00f6r barn. Matematik, m\u00e5larbilder, ordspel och pussel med piratertema. F\u00f6rskola till \u00e5rskurs 3. Gratis PDF.',
  'pirat\u00f6vningar barn, pirat arbetsblad, pirat m\u00e5larbilder, pirat matematik, pirat f\u00f6rskola, pirat utskrivbar, pirat pussel, pirat r\u00e4kning, pirat korsord, pirat\u00e4ventyr, skattjaktslekar',
  'Pirat\u00f6vningar och Arbetsblad'
);

// 40. fairy-tales
updateFile('fairy-tales',
  'Gratis Sagor-\u00f6vningar f\u00f6r Barn | LessonCraftStudio',
  'Utskrivbara sagor-\u00f6vningar f\u00f6r barn. Matematik, m\u00e5larbilder, ordspel och pussel med sagortema. F\u00f6rskola till \u00e5rskurs 3. Gratis PDF.',
  'sag\u00f6vningar barn, sag arbetsblad, sag m\u00e5larbilder, sag matematik, sag f\u00f6rskola, sag utskrivbar, sag pussel, sag r\u00e4kning, sag korsord, sagofigurer, ber\u00e4ttande och saga',
  'Sag\u00f6vningar och Arbetsblad'
);

// 41. robots
updateFile('robots',
  'Gratis Robotar-\u00f6vningar f\u00f6r Barn | LessonCraftStudio',
  'Utskrivbara robotar-\u00f6vningar f\u00f6r barn. Matematik, m\u00e5larbilder, ordspel och pussel med robotartema. F\u00f6rskola till \u00e5rskurs 3. Gratis PDF.',
  'robot\u00f6vningar barn, robot arbetsblad, robot m\u00e5larbilder, robot matematik, robot f\u00f6rskola, robot utskrivbar, robot pussel, robot r\u00e4kning, robot korsord, robotteknik barn, programmering barn',
  'Robot\u00f6vningar och Arbetsblad'
);

// 42. superheroes
updateFile('superheroes',
  'Gratis Superhj\u00e4ltar-\u00f6vningar f\u00f6r Barn | LessonCraftStudio',
  'Utskrivbara superhj\u00e4ltar-\u00f6vningar f\u00f6r barn. Matematik, m\u00e5larbilder, ordspel och pussel med superhj\u00e4ltartema. F\u00f6rskola till \u00e5rskurs 3. Gratis PDF.',
  'superhj\u00e4lte\u00f6vningar barn, superhj\u00e4lte arbetsblad, superhj\u00e4lte m\u00e5larbilder, superhj\u00e4lte matematik, superhj\u00e4lte f\u00f6rskola, superhj\u00e4lte utskrivbar, superhj\u00e4lte pussel, superhj\u00e4lte r\u00e4kning, superhj\u00e4lte korsord, superhj\u00e4ltekrafter, mod och styrka',
  'Superhj\u00e4lte\u00f6vningar och Arbetsblad'
);

console.log('All 7 SV theme hubs (36-42) updated!');
