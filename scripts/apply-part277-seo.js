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

// 1. animals
updateFile('animals',
  'Gratis Djur-\u00f6vningar f\u00f6r Barn | LessonCraftStudio',
  'Utskrivbara djur-\u00f6vningar f\u00f6r barn. Matematik, m\u00e5larbilder, ordspel och pussel med djurtema. F\u00f6rskola till \u00e5rskurs 3. Gratis PDF.',
  'djur\u00f6vningar barn, djur arbetsblad, djur m\u00e5larbilder, djur matematik, djur f\u00f6rskola, djur utskrivbar, djur pussel, djur r\u00e4kning, djur korsord, husdjur \u00f6vningar, vilda djur \u00f6vningar',
  'Djur\u00f6vningar och Arbetsblad'
);

// 2. food
updateFile('food',
  'Gratis Mat-\u00f6vningar f\u00f6r Barn | LessonCraftStudio',
  'Utskrivbara mat-\u00f6vningar f\u00f6r barn. Matematik, m\u00e5larbilder, ordspel och pussel med mattema. F\u00f6rskola till \u00e5rskurs 3. Gratis PDF.',
  'mat\u00f6vningar barn, mat arbetsblad, mat m\u00e5larbilder, mat matematik, mat f\u00f6rskola, mat utskrivbar, mat pussel, mat r\u00e4kning, mat korsord, matgrupper \u00f6vningar, h\u00e4lsosam mat',
  'Mat\u00f6vningar och Arbetsblad'
);

// 3. transportation
updateFile('transportation',
  'Gratis Transport-\u00f6vningar f\u00f6r Barn | LessonCraftStudio',
  'Utskrivbara transport-\u00f6vningar f\u00f6r barn. Matematik, m\u00e5larbilder, ordspel och pussel med transporttema. F\u00f6rskola till \u00e5rskurs 3. Gratis PDF.',
  'transport\u00f6vningar barn, transport arbetsblad, transport m\u00e5larbilder, transport matematik, transport f\u00f6rskola, transport utskrivbar, transport pussel, transport r\u00e4kning, transport korsord, fordon \u00f6vningar, bilar m\u00e5larbilder',
  'Transport\u00f6vningar och Arbetsblad'
);

// 4. nature
updateFile('nature',
  'Gratis Natur-\u00f6vningar f\u00f6r Barn | LessonCraftStudio',
  'Utskrivbara natur-\u00f6vningar f\u00f6r barn. Matematik, m\u00e5larbilder, ordspel och pussel med naturtema. F\u00f6rskola till \u00e5rskurs 3. Gratis PDF.',
  'natur\u00f6vningar barn, natur arbetsblad, natur m\u00e5larbilder, natur matematik, natur f\u00f6rskola, natur utskrivbar, natur pussel, natur r\u00e4kning, natur korsord, milj\u00f6 \u00f6vningar, v\u00e4xter barn',
  'Natur\u00f6vningar och Arbetsblad'
);

// 5. school
updateFile('school',
  'Gratis Skola-\u00f6vningar f\u00f6r Barn | LessonCraftStudio',
  'Utskrivbara skola-\u00f6vningar f\u00f6r barn. Matematik, m\u00e5larbilder, ordspel och pussel med skolatema. F\u00f6rskola till \u00e5rskurs 3. Gratis PDF.',
  'skol\u00f6vningar barn, skol arbetsblad, skol m\u00e5larbilder, skol matematik, skol f\u00f6rskola, skol utskrivbar, skol pussel, skol r\u00e4kning, skol korsord, skolstart \u00f6vningar, klassrum \u00f6vningar',
  'Skol\u00f6vningar och Arbetsblad'
);

// 6. sports
updateFile('sports',
  'Gratis Sport-\u00f6vningar f\u00f6r Barn | LessonCraftStudio',
  'Utskrivbara sport-\u00f6vningar f\u00f6r barn. Matematik, m\u00e5larbilder, ordspel och pussel med sporttema. F\u00f6rskola till \u00e5rskurs 3. Gratis PDF.',
  'sport\u00f6vningar barn, sport arbetsblad, sport m\u00e5larbilder, sport matematik, sport f\u00f6rskola, sport utskrivbar, sport pussel, sport r\u00e4kning, sport korsord, idrott \u00f6vningar, r\u00f6relse och sport',
  'Sport\u00f6vningar och Arbetsblad'
);

// 7. emotions
updateFile('emotions',
  'Gratis K\u00e4nslor-\u00f6vningar f\u00f6r Barn | LessonCraftStudio',
  'Utskrivbara k\u00e4nslor-\u00f6vningar f\u00f6r barn. Matematik, m\u00e5larbilder, ordspel och pussel med k\u00e4nslortema. F\u00f6rskola till \u00e5rskurs 3. Gratis PDF.',
  'k\u00e4nslo\u00f6vningar barn, k\u00e4nslo arbetsblad, k\u00e4nslo m\u00e5larbilder, k\u00e4nslo matematik, k\u00e4nslo f\u00f6rskola, k\u00e4nslo utskrivbar, k\u00e4nslo pussel, k\u00e4nslo r\u00e4kning, k\u00e4nslo korsord, k\u00e4nslor och empati, sociala f\u00e4rdigheter',
  'K\u00e4nslo\u00f6vningar och Arbetsblad'
);

console.log('All 7 SV theme hubs updated!');
