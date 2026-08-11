/* Measure per-LOCALE lexical occupancy across `mini tools/*.js`.
   The header's claims are about a token inside a NAMED LOCALE's string,
   not about the byte appearing anywhere in the corpus, so a bare grep
   over all files answers a different question. */
const fs = require('fs'), path = require('path');
const DIR = path.join(process.cwd(), 'mini tools');
const files = fs.readdirSync(DIR).filter(f => f.endsWith('.js'));

/* a locale-tagged string literal:  no: 'text'   |   it: "text" */
const ENTRY = /\b(en|de|fr|es|pt|it|nl|sv|da|no|fi)\s*:\s*(['"])((?:\\.|(?!\2).)*)\2/g;

const probes = [
  ['gardin', ['no', 'da', 'sv']],
  ['tenda', ['it']],
  ['cortina', ['es', 'pt']],
  ['pulsa', ['es']],
  ['mørkt', ['da', 'no']],
  ['sombrero', ['es']],
  ['sombra', ['es']],
  ['oscur', ['es']]
];

const hits = {};
for (const f of files) {
  const src = fs.readFileSync(path.join(DIR, f), 'utf8');
  let m;
  ENTRY.lastIndex = 0;
  while ((m = ENTRY.exec(src))) {
    const loc = m[1], text = m[3];
    for (const [tok] of probes) {
      if (text.toLowerCase().indexOf(tok) !== -1) {
        const key = tok + ' @ ' + loc;
        (hits[key] = hits[key] || []).push(f + ': ' + text.slice(0, 70));
      }
    }
  }
}

for (const [tok, locs] of probes) {
  for (const loc of locs) {
    const k = tok + ' @ ' + loc;
    const h = hits[k] || [];
    console.log(k.padEnd(20), h.length);
    h.slice(0, 3).forEach(x => console.log('      ' + x));
  }
}
