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

// 50. summer
updateFile('summer',
  'Gratis Sommar-\u00f6vningar f\u00f6r Barn | LessonCraftStudio',
  'Utskrivbara sommar-\u00f6vningar f\u00f6r barn. Matematik, m\u00e5larbilder, ordspel och pussel med sommartema. F\u00f6rskola till \u00e5rskurs 3. Gratis PDF.',
  'sommar\u00f6vningar barn, sommar arbetsblad, sommar m\u00e5larbilder, sommar matematik, sommar f\u00f6rskola, sommar utskrivbar, sommar pussel, sommar r\u00e4kning, sommar korsord, sommaraktiviteter barn, sommarlov \u00f6vningar',
  'Sommar\u00f6vningar och Arbetsblad'
);

console.log('SV theme hub 50 (summer) updated!');
