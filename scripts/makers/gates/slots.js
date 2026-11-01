#!/usr/bin/env node
/**
 * Gate: tap-to-edit slots (lib/slot.js, ARCHITECTURE §4.3) in every pilot template.
 *
 * For each template of each pilot maker, Node only (fast):
 *   1. catalogue untouched — the type built WITHOUT the maker's ctx (no slotsOut, no overrides) gives the same bodyHtml +
 *      meta as the committed version at git HEAD~0 of a reference ref (--ref=, default HEAD) for 3 themes × levels × 2
 *      copies; a slot change must never alter a published page
 *   2. in the maker, for every slot role: overriding item 0 with an unused pool item applies it (slots.values[0] = the
 *      choice), leaves every other item as drawn, and stamps a tap target for it in the html; a duplicate of another item
 *      and a key outside the pool are refused (the page is unchanged)
 *   3. every template that draws pictures or words from a pool exposes a slot (no silent template without tap-to-edit)
 *
 *   node scripts/makers/gates/slots.js [--ref=HEAD]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const REPO = path.resolve(__dirname, '..', '..', '..');
const REF = (process.argv.find((a) => a.startsWith('--ref=')) || '--ref=HEAD').slice(6);
const { makePage } = require('../runtime.js');
const { resolveStrings } = require(path.join(REPO, 'scripts/worksheet-gen/i18n/strings.js'));
const { makeRng, instanceSeed } = require(path.join(REPO, 'scripts/worksheet-gen/lib/rng.js'));

// templates that legitimately have no slot: their content is fixed by a setting (the Word control) or carries no
// picture/word pool (dots, tallies, numerals)
const NO_SLOT = new Set(['K-005', 'K-015', 'K-017', 'K-024', 'K-025', 'G1-105', 'G1-106', 'K-388', 'K-389', 'K-390', 'K-391', 'K-392',
  // the one-word maker templates (2026-10-31): the Word control picks the word; the sentences come with it
  'K-433', 'K-434', 'K-435', 'K-436', 'K-438', 'K-439',
  // numerals, dots, frames, beads, tallies — no picture or word on the page (Counting, Ten Frames, Number Charts makers)
  'K-446', 'K-449', 'K-450', 'K-451', 'K-452', 'K-453', 'K-454', 'K-021', 'K-022', 'G1-130', 'G1-131', 'G1-132', 'G1-310',
  'G1-347', 'G1-348', 'G1-434', 'G1-435', 'G1-436', 'G1-271', 'G1-135', 'G1-136', 'G1-137', 'G2-219', 'G2-220', 'G3-325', 'G2-218', 'G2-226', 'G2-321', 'G2-322', 'G2-323', 'G2-394', 'G3-328']);
// a template whose theme pictures are DECORATION only (themeAxis.decorative: a corner flourish on a numeral page) has
// nothing a teacher would swap — no slot is required

let fails = 0;
const fail = (m) => { fails++; console.log('FAIL ' + m); };

// the committed versions of every file under types/ (shared builders included) go into a temp tree, so require()
// of a HEAD type resolves its HEAD siblings
const tmp = path.join(REPO, '.scratch', 'slots-ref');
fs.rmSync(tmp, { recursive: true, force: true });
const wgRel = 'scripts/worksheet-gen';
function refCopy(rel) {
  const dst = path.join(tmp, rel);
  fs.mkdirSync(path.dirname(dst), { recursive: true });
  fs.writeFileSync(dst, execSync(`git show ${REF}:${rel}`, { cwd: REPO, maxBuffer: 64 << 20 }));
}
// mirror the worksheet-gen code tree at REF (not data/cache: those are read through the platform from the real repo)
const files = execSync(`git ls-tree -r --name-only ${REF} ${wgRel}/types ${wgRel}/templates ${wgRel}/primitives ${wgRel}/lib ${wgRel}/image-cache ${wgRel}/page`, { cwd: REPO, maxBuffer: 64 << 20 }).toString().split('\n').filter((f) => /\.(js|json)$/.test(f));   // .json too: primitives/font-metrics.json
files.forEach(refCopy);
// shared non-code inputs the REF code reads relative to itself
// the publish-cli helpers the platform loads (the vocabulary), read from the real repo
try { fs.symlinkSync(path.join(REPO, 'scripts', 'publish-cli'), path.join(tmp, 'scripts', 'publish-cli'), 'junction'); } catch (e) { /* exists */ }
for (const d of ['data', 'i18n', 'cache', 'assets']) {
  const src = path.join(REPO, wgRel, d);
  const dst = path.join(tmp, wgRel, d);
  if (d !== 'data') { try { fs.symlinkSync(src, dst, 'junction'); } catch (e) { /* exists */ } continue; }
  // data/: linked entry by entry, except the b3 banks, which are COPIED — b3-common merges the locale files into the
  // bank module's object, so one module shared by the REF code and the current code would be merged twice
  fs.mkdirSync(dst, { recursive: true });
  for (const e of fs.readdirSync(src)) {
    if (e === 'b3') fs.cpSync(path.join(src, e), path.join(dst, e), { recursive: true });
    else { try { fs.symlinkSync(path.join(src, e), path.join(dst, e), fs.statSync(path.join(src, e)).isDirectory() ? 'junction' : 'file'); } catch (er) { fs.copyFileSync(path.join(src, e), path.join(dst, e)); } }
  }
}

// every maker built so far (out/makers/versions.json)
const MAKER_LANG = Object.fromEntries(require('../topic-map.js').MAKERS.map((x) => [x.id, x.lang]));
const MAKERS = Object.keys(JSON.parse(fs.readFileSync(path.join(REPO, 'out/makers/versions.json'), 'utf8')));
for (const m of MAKERS) {
  const ver = fs.readFileSync(path.join(REPO, 'out/makers', m, 'current.txt'), 'utf8').trim();
  const tj = JSON.parse(fs.readFileSync(path.join(REPO, 'out/makers', m, ver, 'templates.json'), 'utf8'));
  for (const t of tj.templates) {
    const type = require(path.join(REPO, t.file));
    let refType = null;
    const isNew = !fs.existsSync(path.join(tmp, t.file));   // a template born after REF has no catalogue output to keep
    if (!isNew) { try { refType = require(path.join(tmp, t.file)); } catch (e) { fail(`${t.id}: cannot load ${REF} version (${e.message})`); } }
    const strings = resolveStrings(t.id, 'en', type);
    const themes = t.themed ? [t.themes[0], t.themes[1], t.themes.find((x) => /bw(\s+\d+)?$/i.test(x)) || t.themes[2]] : [null];
    const unit = t.units && t.units.en ? t.units.en[0].id : null;
    // 1. catalogue untouched
    let same = 0, n = 0;
    for (const theme of themes) for (const d of t.levels) for (const v of [1, 2]) {
      n++;
      const seed = instanceSeed({ typeId: t.id, theme, difficulty: d, seedEpoch: 1, variant: v, unit });
      let a, b;
      try {
        a = refType && refType.build({ theme, difficulty: d, locale: 'en', unit }, { rng: makeRng(seed), variant: v });
        b = type.build({ theme, difficulty: d, locale: 'en', unit }, { rng: makeRng(seed), variant: v });
      } catch (e) { fail(`${t.id}: build threw (${e.message})`); continue; }
      // the reference tree sits in .scratch/slots-ref/: its picture file URLs carry that prefix — the only allowed difference
      const norm = (x) => String(x).split('.scratch/slots-ref/').join('');
      if (a && norm(a.bodyHtml) === b.bodyHtml && norm(JSON.stringify(a.meta)) === JSON.stringify(b.meta)) same++;
    }
    if (!isNew && same !== n) fail(`${t.id}: catalogue output changed in ${n - same}/${n} builds`);
    // 2 + 3. slots in the maker
    const theme = themes[0];
    // the level checked: level 2, or the first level whose page exposes a slot (a level may draw dots, another pictures)
    const lv = [...new Set([t.levels.includes(2) ? 2 : t.levels[0], ...t.levels])];
    const d = lv.find((x) => Object.keys(makePage({ type, strings, locale: 'en', difficulty: x, theme, unit, variant: 1 }).slots).length) || lv[0];
    const base = makePage({ type, strings, locale: 'en', difficulty: d, theme, unit, variant: 1 });
    const roles = Object.keys(base.slots);
    const decorative = !!(type.themeAxis && type.themeAxis.decorative);
    // a maker with no word data (topic-map lang 'none': numerals, lines, charts) has no word pool; its template needs a
    // slot only when it draws pictures as content (a theme that is not mere decoration)
    const numeralOnly = MAKER_LANG[m] === 'none' && !(type.themeAxis && type.themeAxis.applicable && !decorative);
    if (!roles.length && !NO_SLOT.has(t.id) && !decorative && !numeralOnly) fail(`${t.id}: draws from a pool but exposes no slot`);
    if (roles.length && NO_SLOT.has(t.id)) fail(`${t.id}: listed as slot-less but exposes ${roles.join(',')}`);
    for (const role of roles) {
      const s = base.slots[role];
      const free = s.pool.find((k) => !s.values.includes(k));
      if (!free) { console.log(`note ${t.id} ${role}: pool has no unused item`); continue; }
      const ed = makePage({ type, strings, locale: 'en', difficulty: d, theme, unit, variant: 1, overrides: { [role]: { 0: free } } });
      const e = ed.slots[role];
      if (e.values[0] !== free) fail(`${t.id} ${role}: the choice was not applied`);
      if (JSON.stringify(e.values.slice(1)) !== JSON.stringify(s.values.slice(1))) fail(`${t.id} ${role}: other items changed`);
      if (!ed.html.includes(`data-lcs-slot="${role}.0"`)) fail(`${t.id} ${role}: no tap target for item 0`);
      if (ed.html === base.html) fail(`${t.id} ${role}: the page did not change`);
      if (s.values.length > 1) {
        const dup = makePage({ type, strings, locale: 'en', difficulty: d, theme, unit, variant: 1, overrides: { [role]: { 0: s.values[1] } } });
        if (dup.html !== base.html) fail(`${t.id} ${role}: a duplicate was not refused`);
      }
      const out = makePage({ type, strings, locale: 'en', difficulty: d, theme, unit, variant: 1, overrides: { [role]: { 0: '__not_in_pool__' } } });
      if (out.html !== base.html) fail(`${t.id} ${role}: a key outside the pool was not refused`);
    }
    console.log(`${fails ? '' : 'ok   '}${m} ${t.id}: catalogue ${isNew ? 'new template' : same + '/' + n + ' identical'}; slots ${roles.join(',') || '-'}`);
  }
}
fs.rmSync(tmp, { recursive: true, force: true });
console.log(fails ? `slots gate: ${fails} failing` : 'slots gate: all pass');
if (fails) process.exitCode = 1;
