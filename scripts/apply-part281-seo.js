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

// 29. dinosaurs
updateFile('dinosaurs',
  'Gratis Dinosaurier-\u00f6vningar f\u00f6r Barn | LessonCraftStudio',
  'Utskrivbara dinosaurier-\u00f6vningar f\u00f6r barn. Matematik, m\u00e5larbilder, ordspel och pussel med dinosauriertema. F\u00f6rskola till \u00e5rskurs 3. Gratis PDF.',
  'dinosaurie\u00f6vningar barn, dinosaurie arbetsblad, dinosaurie m\u00e5larbilder, dinosaurie matematik, dinosaurie f\u00f6rskola, dinosaurie utskrivbar, dinosaurie pussel, dinosaurie r\u00e4kning, dinosaurie korsord, dinosaurier fakta, dinosaurier klassificering',
  'Dinosaurie\u00f6vningar och Arbetsblad'
);

// 30. insects
updateFile('insects',
  'Gratis Insekter-\u00f6vningar f\u00f6r Barn | LessonCraftStudio',
  'Utskrivbara insekter-\u00f6vningar f\u00f6r barn. Matematik, m\u00e5larbilder, ordspel och pussel med insektertema. F\u00f6rskola till \u00e5rskurs 3. Gratis PDF.',
  'insekts\u00f6vningar barn, insekts arbetsblad, insekts m\u00e5larbilder, insekts matematik, insekts f\u00f6rskola, insekts utskrivbar, insekts pussel, insekts r\u00e4kning, insekts korsord, insekter livscykel, sm\u00e5kryp \u00f6vning',
  'Insekts\u00f6vningar och Arbetsblad'
);

// 31. fruits
updateFile('fruits',
  'Gratis Frukter-\u00f6vningar f\u00f6r Barn | LessonCraftStudio',
  'Utskrivbara frukter-\u00f6vningar f\u00f6r barn. Matematik, m\u00e5larbilder, ordspel och pussel med fruktertema. F\u00f6rskola till \u00e5rskurs 3. Gratis PDF.',
  'frukt\u00f6vningar barn, frukt arbetsblad, frukt m\u00e5larbilder, frukt matematik, frukt f\u00f6rskola, frukt utskrivbar, frukt pussel, frukt r\u00e4kning, frukt korsord, fruktsorter \u00f6vning, vitaminrik mat',
  'Frukt\u00f6vningar och Arbetsblad'
);

// 32. vegetables
updateFile('vegetables',
  'Gratis Gr\u00f6nsaker-\u00f6vningar f\u00f6r Barn | LessonCraftStudio',
  'Utskrivbara gr\u00f6nsaker-\u00f6vningar f\u00f6r barn. Matematik, m\u00e5larbilder, ordspel och pussel med gr\u00f6nsakertema. F\u00f6rskola till \u00e5rskurs 3. Gratis PDF.',
  'gr\u00f6nsaks\u00f6vningar barn, gr\u00f6nsaks arbetsblad, gr\u00f6nsaks m\u00e5larbilder, gr\u00f6nsaks matematik, gr\u00f6nsaks f\u00f6rskola, gr\u00f6nsaks utskrivbar, gr\u00f6nsaks pussel, gr\u00f6nsaks r\u00e4kning, gr\u00f6nsaks korsord, gr\u00f6nsakssorter, odla gr\u00f6nsaker',
  'Gr\u00f6nsaks\u00f6vningar och Arbetsblad'
);

// 33. flowers
updateFile('flowers',
  'Gratis Blommor-\u00f6vningar f\u00f6r Barn | LessonCraftStudio',
  'Utskrivbara blommor-\u00f6vningar f\u00f6r barn. Matematik, m\u00e5larbilder, ordspel och pussel med blommortema. F\u00f6rskola till \u00e5rskurs 3. Gratis PDF.',
  'blomm\u00f6vningar barn, blomm arbetsblad, blomm m\u00e5larbilder, blomm matematik, blomm f\u00f6rskola, blomm utskrivbar, blomm pussel, blomm r\u00e4kning, blomm korsord, blommornas delar, v\u00e5rblommor \u00f6vning',
  'Blomm\u00f6vningar och Arbetsblad'
);

// 34. birds
updateFile('birds',
  'Gratis F\u00e5glar-\u00f6vningar f\u00f6r Barn | LessonCraftStudio',
  'Utskrivbara f\u00e5glar-\u00f6vningar f\u00f6r barn. Matematik, m\u00e5larbilder, ordspel och pussel med f\u00e5glartema. F\u00f6rskola till \u00e5rskurs 3. Gratis PDF.',
  'f\u00e5gel\u00f6vningar barn, f\u00e5gel arbetsblad, f\u00e5gel m\u00e5larbilder, f\u00e5gel matematik, f\u00e5gel f\u00f6rskola, f\u00e5gel utskrivbar, f\u00e5gel pussel, f\u00e5gel r\u00e4kning, f\u00e5gel korsord, f\u00e5gelarter, f\u00e5glar och bon',
  'F\u00e5gel\u00f6vningar och Arbetsblad'
);

// 35. pets
updateFile('pets',
  'Gratis Husdjur-\u00f6vningar f\u00f6r Barn | LessonCraftStudio',
  'Utskrivbara husdjur-\u00f6vningar f\u00f6r barn. Matematik, m\u00e5larbilder, ordspel och pussel med husdjurtema. F\u00f6rskola till \u00e5rskurs 3. Gratis PDF.',
  'husdjurs\u00f6vningar barn, husdjurs arbetsblad, husdjurs m\u00e5larbilder, husdjurs matematik, husdjurs f\u00f6rskola, husdjurs utskrivbar, husdjurs pussel, husdjurs r\u00e4kning, husdjurs korsord, husdjurssk\u00f6tsel, husdjur klassificering',
  'Husdjurs\u00f6vningar och Arbetsblad'
);

console.log('All 7 SV theme hubs (29-35) updated!');
