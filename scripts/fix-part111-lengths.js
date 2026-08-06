const fs = require('fs');
const path = require('path');

const base = 'C:/Users/rkgen/lessoncraftstudio/frontend/content/themes';
const BS = String.fromCharCode(92);

function fixDesc(dir, newDesc) {
  const fp = path.join(base, dir, 'fi.ts');
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

  const d = encode(newDesc);
  content = content.replace(/^(  description: ').*(',)\r?$/m, '$1' + d + '$2');
  fs.writeFileSync(fp, content, 'utf8');
  console.log('Fixed: ' + dir + '/fi.ts desc=' + newDesc.length + 'ch');
}

// easter 164->157: remove ", tiput"
fixDesc('easter',
  'Tutustu p\u00e4\u00e4si\u00e4isteht\u00e4viin lapsille: munajahdit, kev\u00e4tpuput ja pastelliv\u00e4rit. Matematiikkaa, lukemista ja pulmia esikoulusta 3. luokalle. Tulostettavia.'
);

// emotions 167->152: remove " Tulostettavia."
fixDesc('emotions',
  'Tutustu tunneteht\u00e4viin lapsille: tunteiden tunnistaminen, ilmeet, empatia ja itses\u00e4\u00e4tely. Matematiikkaa, lukemista ja pulmia esikoulusta 3. luokalle.'
);

// forest 165->150: remove " Tulostettavia."
fixDesc('forest',
  'Tutustu mets\u00e4teht\u00e4viin lapsille: puulajit, mets\u00e4nel\u00e4imet, ekosysteemit ja luontopolut. Matematiikkaa, lukemista ja pulmia esikoulusta 3. luokalle.'
);

// fruits 164->153: "Tulostettavia työlehtiä." -> "Tulostettavia."
fixDesc('fruits',
  'Tutustu hedelm\u00e4teht\u00e4viin lapsille: omenat, banaanit, marjat ja appelsiinit. Matematiikkaa, lukemista ja pulmia esikoulusta 3. luokalle. Tulostettavia.'
);
