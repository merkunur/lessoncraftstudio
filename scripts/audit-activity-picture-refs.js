#!/usr/bin/env node
/* =====================================================================
   audit-activity-picture-refs.js — every picture an activity asks for must exist,
   and where the activity prints a word with the picture, the word should be the
   picture's own label in that locale.

   Walks every `mini tools/*-activities.json` (all params incl. roundsL10n) and every
   `mini tools/*-activity.js` wrapper, finds picture references in the shapes the
   engines actually use to build their <img src>:
     • object {themeDir|imageDir|dir|theme|d , noun|imageFile|file|imgKey|f|key|word}
       → /image-library-webp/themes/<dir>/<file>@2x.webp
     • a "<dir>/<noun>" string whose <dir> is a real theme folder (engines split it)
   and resolves each against frontend/public/image-library-webp/themes/ on disk.

   Reports:
     MISSING  — the file does not exist (the live tile is a broken image)
     BANNED   — a picture that does not honestly show its word (peach/plum/cherry/apricot
                drawn as apples, kitchen-tools pan drawn as a pot, toad drawn as a frog, ...)
     LABEL    — the object carries a shown word (label/word/targetWord) in a known
                locale and it is neither the singular nor the plural label of that
                picture in mini tools/pictures/*.json (informational; some decks
                deliberately show a phonics word — read before changing)

   Exit 1 when any MISSING or BANNED is found (use as a gate). --labels prints LABEL rows.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const THEMES = path.join(REPO, 'frontend', 'public', 'image-library-webp', 'themes');
const SHOW_LABELS = process.argv.includes('--labels');
const LOCS = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

const themeDirs = new Set(fs.readdirSync(THEMES).filter((d) => fs.statSync(path.join(THEMES, d)).isDirectory()));
const exists = (dir, file) => fs.existsSync(path.join(THEMES, dir, file + '@2x.webp')) || fs.existsSync(path.join(THEMES, dir, file + '@1x.webp'));

/* picture labels: dir -> noun -> {loc:[sg,pl]} */
const LABELS = {};
for (const f of fs.readdirSync(path.join(MINI, 'pictures'))) {
  if (!f.endsWith('.json') || f.startsWith('_')) continue;
  try { const j = JSON.parse(fs.readFileSync(path.join(MINI, 'pictures', f), 'utf8')); if (j.dir && j.nouns) { LABELS[j.dir] = LABELS[j.dir] || {}; for (const [k, v] of Object.entries(j.nouns)) LABELS[j.dir][k] = v.labels || {}; } } catch (e) { /* skip */ }
}

const DIR_KEYS = ['themeDir', 'imageDir', 'dir', 'theme', 'd'];
const FILE_KEYS = ['imgKey', 'imageFile', 'file', 'f', 'noun', 'key', 'word'];   // imgKey first: engines use (t.imgKey || t.noun)
const WORD_KEYS = ['label', 'word', 'targetWord', 'display'];
/* pictures that do not honestly show their file name (read on contact sheets 2026-10-17): never reference them */
const BANNED = new Set(['fruits/peach', 'fruits/plum', 'fruits/cherry', 'fruits/apricot', 'At the Supermarket/peach', 'kitchen tools/pan', 'forest creatures/toad', 'christmas/chimney', 'toys/girl', 'zoo animals/cheetah', 'christmas/tree']);
const banned = [];
const missing = [], labels = [];
let refs = 0;

function locFrom(trail, obj) {
  for (let i = trail.length - 1; i >= 0; i--) {
    const t = String(trail[i]); if (LOCS.indexOf(t) >= 0) return t;
    const m = t.match(/^lang:([a-z]{2})/); if (m) return m[1];
  }
  return null;
}
/* compare the bare noun: a shown "die Tasse" / "le chat" / "un gato" is the label "Tasse"/"chat"/"gato" */
const ARTICLES = /^(der|die|das|ein|eine|le|la|les|l'|l’|un|une|el|los|las|una|o|a|os|as|um|uma|il|lo|gli|i|uno|de|het|een|en|ett|the|an)\s+/;
function norm(s) { return String(s || '').toLowerCase().normalize('NFC').trim().replace(/^(l'|l’)/, '').replace(ARTICLES, ''); }

function visit(node, trail, src) {
  if (Array.isArray(node)) { node.forEach((x, i) => visit(x, trail.concat(i), src)); return; }
  if (node && typeof node === 'object') {
    let t2 = trail;
    if (typeof node.language === 'string') t2 = trail.concat('lang:' + node.language.slice(0, 2));
    if (typeof node.locale === 'string' && node.locale.length >= 2) t2 = t2.concat('lang:' + node.locale.slice(0, 2));
    const dk = DIR_KEYS.find((k) => typeof node[k] === 'string' && (themeDirs.has(node[k]) || ((k === 'themeDir' || k === 'imageDir') && node[k])));
    const fk = dk && FILE_KEYS.find((k) => typeof node[k] === 'string' && node[k] && k !== dk);
    if (dk && fk) {
      refs++;
      const dir = node[dk], file = node[fk];
      if (BANNED.has(dir + "/" + file)) banned.push(`${src} ${t2.join(".")}: ${dir}/${file}`);
      if (!exists(dir, file)) missing.push(`${src} ${t2.join('.')}: ${dir}/${file}`);
      else {
        const loc = locFrom(t2, node) || (src.endsWith('.json') && !t2.some((x) => x === 'roundsL10n') ? 'en' : null);
        const wk = WORD_KEYS.find((k) => typeof node[k] === 'string' && k !== fk);
        const L = LABELS[dir] && LABELS[dir][file];
        if (loc && wk && L && L[loc]) {
          const ok = [L[loc][0], L[loc][1]].map(norm).indexOf(norm(node[wk])) >= 0;
          if (!ok) labels.push(`${src} ${t2.join('.')}: ${dir}/${file} shows "${node[wk]}" — ${loc} label "${L[loc][0]}"`);
        }
      }
    }
    for (const [k, v] of Object.entries(node)) visit(v, t2.concat(k), src);
    return;
  }
  if (typeof node === 'string') {
    const m = node.match(/^([^/]+)\/([^/]+)$/);
    if (m && themeDirs.has(m[1])) { refs++; if (BANNED.has(node)) banned.push(`${src} ${trail.join('.')}: ${node}`); if (!exists(m[1], m[2])) missing.push(`${src} ${trail.join('.')}: ${node}`); }
  }
}

/* activities manifests */
const files = fs.readdirSync(MINI).filter((f) => /-activities\.json$/.test(f) || /-bank-[a-z]{2}\.json$/.test(f));
for (const f of files) {
  let j; try { j = JSON.parse(fs.readFileSync(path.join(MINI, f), 'utf8')); } catch (e) { continue; }
  (Array.isArray(j) ? j : [j]).forEach((row, i) => visit(row.params || row, [row.id || i], f));
}
/* wrappers: object literals { themeDir: 'x', noun: 'y' } and 'dir/noun' string literals */
const wrappers = fs.readdirSync(MINI).filter((f) => /\.js$/.test(f));
for (const f of wrappers) {
  const s = fs.readFileSync(path.join(MINI, f), 'utf8');
  const reObj = /(themeDir|imageDir|dir|theme)\s*:\s*['"]([^'"]+)['"]\s*,\s*(noun|imageFile|file|imgKey|key)\s*:\s*['"]([^'"]+)['"]/g;
  let m;
  while ((m = reObj.exec(s))) { if (!themeDirs.has(m[2])) continue; refs++; if (BANNED.has(m[2] + '/' + m[4])) banned.push(`${f}: ${m[2]}/${m[4]}`); if (!exists(m[2], m[4])) missing.push(`${f}: ${m[2]}/${m[4]}`); }
  const reRev = /(noun|imageFile|file|imgKey|key)\s*:\s*['"]([^'"]+)['"]\s*,\s*(themeDir|imageDir|dir|theme)\s*:\s*['"]([^'"]+)['"]/g;
  while ((m = reRev.exec(s))) { if (!themeDirs.has(m[4])) continue; refs++; if (BANNED.has(m[4] + '/' + m[2])) banned.push(`${f}: ${m[4]}/${m[2]}`); if (!exists(m[4], m[2])) missing.push(`${f}: ${m[4]}/${m[2]}`); }
  const reStr = /['"]([A-Za-z0-9 _&'-]+)\/([A-Za-z0-9 _-]+)['"]/g;
  while ((m = reStr.exec(s))) { if (!themeDirs.has(m[1])) continue; refs++; if (BANNED.has(m[1] + '/' + m[2])) banned.push(`${f}: '${m[1]}/${m[2]}'`); if (!exists(m[1], m[2])) missing.push(`${f}: '${m[1]}/${m[2]}'`); }
}

console.log(`audit-activity-picture-refs: ${files.length} manifests + ${wrappers.length} wrappers, ${refs} picture references`);
console.log(`  MISSING ${missing.length}`); missing.forEach((x) => console.log('    ' + x));
console.log(`  BANNED  ${banned.length}`); banned.forEach((x) => console.log('    ' + x));
console.log(`  LABEL   ${labels.length}${SHOW_LABELS ? '' : '  (run with --labels to list)'}`); if (SHOW_LABELS) labels.forEach((x) => console.log('    ' + x));
process.exit(missing.length || banned.length ? 1 : 0);
