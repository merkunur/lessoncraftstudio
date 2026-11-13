/**
 * Shared by scan-no-account.js, scan-no-account-live.js, fix-no-account.js and gates.js P8: every sentence of the
 * site's files that says playing, printing or downloading needs no account, and what each one is:
 *   open           it says it, and a page shows it: to be corrected
 *   true           a sentence of no-account-keep.json `keys` (a pupil on a teacher's link, looking around, an embed)
 *   notRendered    a namespace or file no live page shows any more (no-account-keep.json `notRendered`)
 * A wording that only looks like it (Spanish "sin cuentas" = without sums) is no match at all (`falsePositives`).
 */
'use strict';
const fs = require('fs');
const path = require('path');
const RX = require('./no-account-rx.js');
const FRONT = path.join(__dirname, '..', '..', 'frontend');
const KEEP = JSON.parse(fs.readFileSync(path.join(__dirname, 'no-account-keep.json'), 'utf8'));
const LOCALES = Object.keys(RX);

/** the matches of a text that are no false positive: [{ index, 0: matched }] */
function matches(loc, text) {
  const out = []; const re = new RegExp(RX[loc].source, 'giu'); let m;
  const fps = (KEEP.falsePositives[loc] || []).map((s) => s.toLowerCase());
  while ((m = re.exec(text))) {
    const around = text.slice(Math.max(0, m.index - 40), m.index + m[0].length + 40).toLowerCase();
    if (fps.some((f) => around.includes(f))) continue;
    out.push(m);
  }
  return out;
}
const classOf = (file, key) => {
  const hit = (list) => list.find((r) => new RegExp(r.file).test(file) && (!r.key || new RegExp(r.key).test(key)));
  return hit(KEEP.keys) ? 'true' : hit(KEEP.notRendered) ? 'notRendered' : 'open';
};
const walk = (d, re, out = []) => { if (!fs.existsSync(d)) return out; for (const e of fs.readdirSync(d, { withFileTypes: true })) { if (e.name === 'node_modules' || e.name.startsWith('.')) continue; const p = path.join(d, e.name); if (e.isDirectory()) walk(p, re, out); else if (re.test(e.name)) out.push(p); } return out; };
const rel = (f) => path.relative(FRONT, f).replace(/\\/g, '/');
const leaves = (v, cb, k = '') => { if (typeof v === 'string') cb(k, v); else if (v && typeof v === 'object') for (const [kk, vv] of Object.entries(v)) leaves(vv, cb, k ? k + '.' + kk : kk); };
/** the files named by a language: [{ file (absolute), loc }] */
function localeFiles(locs) {
  return walk(path.join(FRONT, 'messages'), /\.json$/).concat(walk(path.join(FRONT, 'content'), /\.json$/))
    .map((f) => ({ file: f, loc: (/(?:^|[./\\_-])([a-z]{2})\.json$/.exec(f) || [])[1] })).filter((x) => x.loc && locs.includes(x.loc));
}
const codeFiles = () => ['lib', 'app', 'components', 'config'].flatMap((d) => walk(path.join(FRONT, d), /\.(ts|tsx)$/));

/** every sentence that says it: [{ file, key, loc, text, cls }] */
function collect(locs = LOCALES) {
  const found = [];
  for (const f of codeFiles()) fs.readFileSync(f, 'utf8').split(/\r?\n/).forEach((line, i) => {
    if (/^\s*(\/\/|\*|\/\*)/.test(line)) return;
    for (const loc of locs) if (matches(loc, line).length) found.push({ file: rel(f), key: 'line ' + (i + 1), loc, text: line.trim(), cls: classOf(rel(f), '') });
  });
  for (const { file, loc } of localeFiles(locs)) {
    let j; try { j = JSON.parse(fs.readFileSync(file, 'utf8')); } catch (e) { continue; }
    leaves(j, (k, v) => { if (matches(loc, v).length) found.push({ file: rel(file), key: k, loc, text: v, cls: classOf(rel(file), k) }); });
  }
  return found;
}
module.exports = { RX, KEEP, LOCALES, FRONT, matches, classOf, collect, localeFiles, codeFiles, leaves, rel };
