/* one-shot: land the two side-name keys the panel authored in its own
   docblock but deliberately did not export ("adding keys the tool does
   not declare would break any strict key-parity gate — they are values
   waiting for a patch"). The tool now declares them, so they land.
   ⚠ These are the PANEL'S words, not mine — each is the form that reads
   naturally after that locale's own leaf noun, which is why several are
   not bare adjectives. `saidNoOdd` is the one string I could not take
   from the docblock; it is derived per locale from that set's own
   ariaOdd wording so no locale carries English. */
'use strict';
const fs = require('fs');
const path = require('path');
const P = path.join(__dirname, '_doubling-mirror-strings.js');
let s = fs.readFileSync(P, 'utf8');

const SIDE = {
  de: ['nahen', 'fernen'], fr: ['proche', 'opposé'], es: ['cercana', 'lejana'],
  pt: ['da frente', 'de trás'], it: ['vicina', 'lontana'],
  nl: ['aan jouw kant', 'aan de overkant'], sv: ['närmaste', 'bortre'],
  da: ['nærmeste', 'fjerneste'], no: ['nærmeste', 'borterste'],
  fi: ['lähemmällä', 'kauemmalla']
};
/* ⚠ derived from each set's OWN leaf noun and its own ariaOdd phrasing,
   so no locale carries English and none invents a new part-name. */
const NOODD = {
  de: 'Es wartet keine Scheibe auf einen Flügel.',
  fr: 'Aucun disque n’attend un battant.',
  es: 'No hay ninguna chapa esperando un ala.',
  pt: 'Não há nenhuma pastilha à espera de uma aba.',
  it: 'Non c’è nessun disco in attesa di un’anta.',
  nl: 'Er wacht geen schijf op een klep.',
  sv: 'Det är ingen skiva som väntar på en klaff.',
  da: 'Der er ingen skive, der venter på en fløj.',
  no: 'Det er ingen skive som venter på en klaff.',
  fi: 'Yksikään kiekko ei odota siipeä.'
};

const q = x => "'" + String(x).replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'";
let n = 0;
Object.keys(SIDE).forEach(function (l) {
  /* anchor on that locale's own title line so the insert lands inside
     the right object and nowhere else */
  const re = new RegExp('(\\n  ' + l + ': \\{\\n)');
  if (!re.test(s)) { console.log('  MISS anchor: ' + l); return; }
  const add = '$1    saidNoOdd: ' + q(NOODD[l]) + ',\n' +
    '    sideNameNear: ' + q(SIDE[l][0]) + ',\n' +
    '    sideNameFar: ' + q(SIDE[l][1]) + ',\n';
  s = s.replace(re, add);
  n++;
});
if (n !== 10) throw new Error('only ' + n + '/10 locales patched — refusing to write');
fs.writeFileSync(P, s);
console.log('landed the three keys in ' + n + ' locales');
