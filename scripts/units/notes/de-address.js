#!/usr/bin/env node
/**
 * The German teacher notes address the teacher with "du", as the whole German site does (frontend/messages/de.json).
 * This tool turns the formal imperatives a draft may carry ("Fragen Sie", "lassen Sie sich … nennen") into the du
 * form ("Frage", "lass dir … nennen"), outside quoted speech only, and LISTS every formal address it cannot turn by
 * rule (a "Sie" in the middle of a sentence, "Ihre", "Ihnen"), which is then corrected by hand in the note file.
 *
 *   node scripts/units/notes/de-address.js            report: what would change, what is left
 *   node scripts/units/notes/de-address.js --write    rewrite the de-*.js note files
 *   node scripts/units/notes/de-address.js --check    exit 1 when a formal address is left (for the gate)
 */
'use strict';
const fs = require('fs');
const path = require('path');
const WRITE = process.argv.includes('--write');
const CHECK = process.argv.includes('--check');
const DU = {
  sagen: 'sag', fragen: 'frage', prüfen: 'prüfe', lassen: 'lass', lesen: 'lies', achten: 'achte', sprechen: 'sprich', zählen: 'zähle', stellen: 'stelle', zeigen: 'zeige',
  hören: 'höre', geben: 'gib', nennen: 'nenne', sehen: 'sieh', nehmen: 'nimm', spielen: 'spiele', notieren: 'notiere', vergleichen: 'vergleiche', halten: 'halte', schreiben: 'schreibe',
  benennen: 'benenne', bleiben: 'bleibe', bauen: 'baue', machen: 'mache', verbinden: 'verbinde', besprechen: 'besprich', zeichnen: 'zeichne', fahren: 'fahre', probieren: 'probiere', teilen: 'teile',
  drehen: 'drehe', gehen: 'gehe', schneiden: 'schneide', führen: 'führe', decken: 'decke', unterscheiden: 'unterscheide', sammeln: 'sammle', schauen: 'schaue', trennen: 'trenne', nutzen: 'nutze',
  beginnen: 'beginne', finden: 'finde', üben: 'übe', falten: 'falte', arbeiten: 'arbeite', formulieren: 'formuliere', rechnen: 'rechne', mischen: 'mische', springen: 'springe', zerschneiden: 'zerschneide',
  knoten: 'knote', legen: 'lege', klatschen: 'klatsche', tippen: 'tippe', klären: 'kläre', setzen: 'setze', gehen: 'gehe', kommen: 'komm', stecken: 'stecke', wählen: 'wähle', erklären: 'erkläre', holen: 'hole',
  bringen: 'bringe', verwenden: 'verwende', erzählen: 'erzähle', wiederholen: 'wiederhole', tragen: 'trage', schicken: 'schicke', suchen: 'suche', warten: 'warte', beobachten: 'beobachte', loben: 'lobe', folgen: 'folge', ziehen: 'zieh',
};
const unknown = new Set();
const cap = (s, like) => (like[0] === like[0].toUpperCase() ? s[0].toUpperCase() + s.slice(1) : s);
/** outside „…“ only: quoted speech is said to children (already du) or is an example sentence */
function outside(text, fn) {
  return text.split(/(„[^“]*“)/).map((part, i) => (i % 2 ? part : fn(part))).join('');
}
function turn(part) {
  let s = part.replace(/([A-Za-zÄÖÜäöüß]+) Sie sich\b/g, (m, v) => { const d = DU[v.toLowerCase()]; if (!d) { unknown.add(v); return m; } return cap(d, v) + ' dir'; });
  s = s.replace(/([A-Za-zÄÖÜäöüß]+(?:en|eln|ern)) Sie\b/g, (m, v) => { const d = DU[v.toLowerCase()]; if (!d) { unknown.add(v); return m; } return cap(d, v); });
  return s;
}
/** what a rule cannot turn: a capital "Sie" that does not open a sentence, and the possessives */
function left(part) {
  const out = [];
  for (const m of part.matchAll(/[a-zäöüß,;)] (Sie)\b[^.!?]{0,40}/g)) out.push(m[0].trim());
  for (const m of part.matchAll(/\b(Ihre[rnms]?|Ihnen)\b[^.!?]{0,30}/g)) out.push(m[0].trim());
  return out;
}
let changed = 0, remaining = 0;
for (const f of fs.readdirSync(__dirname).filter((x) => /^de-[a-z]+-[a-z0-9]+\.js$/.test(x)).sort()) {
  const file = path.join(__dirname, f);
  const src = fs.readFileSync(file, 'utf8');
  // only the lines that carry a text of a note (title, objective, mistake, words, watch)
  const out = src.split('\n').map((line) => {
    const m = /^(\s*(?:title|objective|mistake|words|watch): ')(.*)(',\s*)$/.exec(line);
    if (!m) return line;
    const t = outside(m[2], turn);
    if (t !== m[2]) changed++;
    for (const l of outside(t, (p) => { for (const x of left(p)) { remaining++; console.log('LEFT  ' + f + ': … ' + x); } return p; }) && []) void l;
    return m[1] + t + m[3];
  }).join('\n');
  if (WRITE && out !== src) fs.writeFileSync(file, out);
}
for (const v of unknown) console.log('UNKNOWN VERB  ' + v + ' Sie');
console.log((WRITE ? 'rewritten: ' : 'would change: ') + changed + ' text(s); formal address left: ' + remaining + '; unknown verbs: ' + unknown.size);
if (CHECK && (remaining || unknown.size || changed)) process.exit(1);
