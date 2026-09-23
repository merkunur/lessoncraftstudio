#!/usr/bin/env node
/**
 * verify-b6-cursive-writing.js — the G2-377 `cursive-writing` gate (nt5-F; design
 * docs/worksheet-gen/b6-designs/G2-377-cursive-writing.md §5).
 *
 *   node scripts/worksheet-gen/qa/verify-b6-cursive-writing.js [--quick]
 *
 * EXPORTS
 *   validateBank(block, loc)        §5 rules 1-3 and 5-10 over ONE locale block (node, no browser); every
 *                                   message is tagged "rule N:" (tools/validate-b6-draft.js + the probe run it)
 *   renderRules(block, loc, page)   §5 rules 4 (render half: every join pair is ONE ink piece in every unit
 *                                   of the locale, beyond its dots / crosses) and 11 (every glyph of every
 *                                   literal is covered by the unit — the fallback-width test)
 *   PROBES                          design-time probe blocks per shipped unit (NOT native data: lesson 0,
 *                                   ruling, X and level from the design's §2 table; the rest of the
 *                                   alphabet chunked) — they let the gate render EVERY unit before the
 *                                   native panels author their blocks
 *
 * THE RUN
 *  0. primitives/cursive-metrics.json re-measured (tools/measure-cursive-metrics.js --check, drift ≤ 0.002)
 *  1. validateBank(en) clean; renderRules(en) clean
 *  2. qa/verify-school-ruling.js run() — every kind, every shipped unit, smallest + largest geometry, poisons
 *  3. RENDERS through render/render-instance.js (file:// fonts): en d1 / d2 / d3 under the default chrome,
 *     d2 under the 722 (3-line title + 3-line instruction) and the 677 (4-line title) chromes: verify()
 *     empty (structural + raster: ink on its lines ±1.2 px, every join one piece, ink inside its row),
 *     qa/lints.js clean, the printed title / instruction == the bank strings == the spec's i18n.en, the
 *     floors asserted HERE (rows ≥ 36 px — the G2 element floor; X ≥ the level floor; no body text
 *     under 13 px), the content inside the body, and the PDF embeds exactly ONE Playwrite face
 *  4. EVERY shipped unit through the probe blocks (d2; d1 + d3 unless --quick) + a CALIBRATION page per
 *     unit (lesson "x": the "xxx" chains' ink top ON the x-line, ±1.2 px) — PNGs out/dev/G2-377-probe-*.png;
 *     the resolved stacks == the design's §2 table (614 / 614 / 676 / 630 / 555 / 676 / 670 / 610 / 655)
 *  5. REFUSALS: sv / fi build THROWS; a unit the locale does not ship THROWS; a lesson that does not fit 677
 *     THROWS; a face mode fed to the base THROWS
 *  6. POISONS — each must FAIL for ITS OWN reason (bank poisons against validateBank / renderRules: the
 *     poisoned block must produce a NEW failure carrying the rule tag that the untouched block does not;
 *     render poisons against verify() on a mutated copy of a clean rendered page, the untouched page the
 *     control). P1-P17 + RJ1 / RG1 (render rules) + PR1-PR5, PR8, PR10, PR11 (a title naming letters the page
 *     does not teach — the d1 defect found by reading the render). PR6 / PR7 (F4) and PR9 (F5) are
 *     Phase E (the faces are not built) — recorded, not run.
 *  3b. SPARSE / FILL (lead review 2026-09-23): every unit at the 814 / 722 / 677 chromes — no band > 40 px between
 *     content boxes, ≤ 60 px blank under the last writing line (closing practice rows of the same ruling, gaps
 *     that grow, each capped); PR12 (practice removed, gaps frozen) and PR13 (a 90 px band) must FAIL.
 *  7. THE FIVE FACES (Phase E): G2-384 capitals · G2-385 joins · G2-386 words · G2-387 read · G3-401 copy at d2 en
 *     under the default / 814 / 722 / 677 chromes (verify, lints, floors, SPARSE, FILL ≥ 85 % at 814), the
 *     instruction names only apparatus on its page, F1 in every unit, the F4 partner rows pooled over 12,000 seeds
 *     (every cell within ±10 % of uniform, no fixed point, no constant shift), and the face poisons PR6 (rotation),
 *     PR7 (no shared initial), PR9 (model under all three), PR14-PR19, P18 + two face refusals.
 * Exit 1 on any real failure OR any silent poison.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const url = require('url');
const { execFileSync } = require('child_process');

const WG = path.resolve(__dirname, '..');
const ROOT = path.resolve(WG, '..', '..');
const TYPE = require('../types/g2/G2-377-cursive-writing.js');
const { CURSIVE_WRITING, CURSIVE_WRITING_NEUTRAL: NEUTRAL } = require('../data/b6/cursive-writing.js');
const SR = require('../primitives/school-ruling.js');
const B2 = require('../lib/b2-common.js');
const freeClaim = require(path.join(ROOT, 'scripts', 'lib', 'free-claim.js'));

const QUICK = process.argv.includes('--quick');
const OUT = path.join(WG, 'out', 'dev');
const CSS_UNITS = [...fs.readFileSync(path.join(WG, 'assets', 'fonts', 'cursive-fonts.css'), 'utf8').matchAll(/font-family:'LCS Cursive ([a-z-]+)'/g)].map((m) => m[1]);
const METRICS = require('../primitives/cursive-metrics.json');
const WORKSHEET_WORD = /arbeitsblatt|worksheet|werkblad|arbetsblad|arbejdsark|arbeidsark|feuille|(?<!\p{L})fiches?(?!\p{L})|ficha|scheda|tehtäv/iu;
const KEY_PROMISE = /answer key|with answers|mit lösung|lösungen|avec corrig|corrigé|con soluzion|soluciones|con respuestas|com respostas|gabarito|met antwoorden|antwoordblad|med facit|facit|med svar|fasit|vastaukset/iu;
// §5 rule 7 — heads that belong to the PRINT tracing / pre-writing families, never to this one
const TITLE_BANS = [/(?<!\p{L})tracing(?!\p{L})/iu, /nachspuren/iu, /schwungübung/iu, /schönschrift/iu, /graphisme/iu, /pregrafismo/iu, /pontilhad[oa]s?/iu, /tratteggiat[oaie]/iu, /overtrekken/iu, /(?<!\p{L})spåra(?!\p{L})/iu, /bogstavtræning/iu, /bokstavskriving/iu, /(?<!\p{L})spor ord(?!\p{L})/iu];
const DOTTED = /(?<!\p{L})(dotted|dashed|hollow|gestrichelt\w*|punktiert\w*|pointillés?|punteggiat\w*|tratteggiat\w*|stippel\w*|punkteret\w*|stiplet\w*|pontilhad\w*|punteado\w*)(?!\p{L})/iu;
const GREY = { en: /(?<!\p{L})gr[ae]y(?!\p{L})/iu, de: /(?<!\p{L})grau\w*/iu, es: /(?<!\p{L})gris\w*/iu, pt: /(?<!\p{L})cinza\w*/iu, fr: /(?<!\p{L})gris\w*/iu, it: /(?<!\p{L})grigi\w*|(?<!\p{L})grigio|(?<!\p{L})grigie/iu, nl: /(?<!\p{L})grij[sz]\w*/iu, da: /(?<!\p{L})grå\w*/iu, no: /(?<!\p{L})grå\w*/iu };
const ALPHA_EXTRA = { en: '', de: 'äöüß', es: 'ñ', pt: 'ç', fr: '', it: '', nl: '', da: 'æøå', no: 'æøå' };
const alphabetOf = (loc) => [...'abcdefghijklmnopqrstuvwxyz', ...(ALPHA_EXTRA[loc] || '')];
const BANDS = ['K', 'G1', 'G2', 'G3'];
// the native panels' drafts present on disk (never edited here): their cursive-writing blocks feed the shipped-instance
// checks (F4 partner order, F5 word gaps) — a locale whose block is absent is skipped
const DRAFT_BANKS = {};
for (const loc of ['de', 'es', 'pt', 'fr', 'it', 'nl', 'da', 'no']) {
  const f = path.join(WG, 'i18n', '.draft-b6-' + loc + '.json');
  try { const b = JSON.parse(fs.readFileSync(f, 'utf8')).banks['cursive-writing']; if (b && !b.refused) DRAFT_BANKS[loc] = b; } catch (e) { /* absent draft */ }
}
// the reading face prints no trace (ink words only), so its instruction has no grey to name
const READ_IDS = ['G2-387'];
// fix round 1 — the copy face's DOING ORDER: the trace verb comes before the copy verb (per locale, whole words)
const ORDER_VERBS = {
  en: [/(?<!\p{L})trac(e|ing)/iu, /(?<!\p{L})copy/iu], de: [/spur/iu, /(?<!\p{L})(schreibe|abschreib)/iu], es: [/(?<!\p{L})repas/iu, /(?<!\p{L})copia/iu],
  pt: [/(?<!\p{L})cubr/iu, /(?<!\p{L})copi/iu], fr: [/(?<!\p{L})repass/iu, /(?<!\p{L})copie/iu], it: [/(?<!\p{L})ripass/iu, /(?<!\p{L})ricopi/iu],
  nl: [/(?<!\p{L})(na|natrek\w*|overtrek\w*)(?!\p{L})/iu, /(?<!\p{L})(over|overschrij\w*)(?!\p{L})/iu],
  da: [/(?<!\p{L})oven i(?!\p{L})/iu, /(?<!\p{L})af(?!\p{L})/iu], no: [/(?<!\p{L})over(?!\p{L})/iu, /(?<!\p{L})av(?!\p{L})/iu],
};
// fix round 1 (de panel) — "without lifting your pencil" is true only if EVERY word on the page is written in one
// stroke: no capital start (German nouns; school capitals mostly do not join) and no LIFT letter before the end
const NO_LIFT_CLAIM = /without lifting|ohne (den stift |den bleistift )?(abzusetzen|abzuheben)|sin (despegar|levantar)|sem (tirar|levantar)|sans lever|senza staccare|zonder (je )?(potlood )?op te tillen|uden at løfte|uten å løfte/iu;

// ─────────────────────────────── validateBank ───────────────────────────────
function validateBank(block, loc) {
  const E = [];
  const R = (n, m) => E.push(`rule ${n}: ${m}`);
  const l = String(loc).slice(0, 2);
  // rule 1 — the units, and sv / fi are REFUSED whole-type (their blocks stay absent)
  if (NEUTRAL.refusedLocales[l]) { R(1, `${l} is refused whole-type (${NEUTRAL.refusedLocales[l]}) — the block must be ABSENT`); return E; }
  if (!block || typeof block !== 'object') { R(1, 'no block'); return E; }
  const units = Array.isArray(block.units) ? block.units : [];
  if (!units.length) R(1, 'units is empty');
  for (const u of units) {
    if (!CSS_UNITS.includes(u)) R(1, `unit "${u}" is not an @font-face unit of assets/fonts/cursive-fonts.css`);
    else if (!METRICS['cursive-' + u]) R(1, `unit "${u}" has no cursive-metrics.json entry`);
    if (!NEUTRAL.shipped.includes(u)) R(1, `unit "${u}" is vendored but not a shipped unit (§1)`);
  }
  if (!units.includes(block.exemplar)) R(1, `exemplar "${block.exemplar}" ∉ units`);
  // exemplarByMode (optional): each face ships in ONE script; every value must be a unit, every key a mode
  if (block.exemplarByMode != null) {
    const MODES = ['base', 'capitals', 'joins', 'words', 'read', 'copy'];
    if (typeof block.exemplarByMode !== 'object') R(1, 'exemplarByMode must be an object');
    else for (const [m, u] of Object.entries(block.exemplarByMode)) {
      if (!MODES.includes(m)) R(1, `exemplarByMode key "${m}" is not a face mode`);
      if (!units.includes(u)) R(1, `exemplarByMode.${m} "${u}" ∉ units`);
    }
  }
  for (const u of units) if (!(block.scriptName && typeof block.scriptName[u] === 'string' && block.scriptName[u].trim() && block.scriptName[u].length <= 34)) R(1, `scriptName.${u} missing or > 34 chars`);
  // rule 2 — lessons: every letter of the locale alphabet exactly once across a unit's lessons
  const alpha = alphabetOf(l);
  for (const u of units) {
    const ls = block.lessons && block.lessons[u];
    if (!Array.isArray(ls) || !ls.length) { R(2, `no lessons for ${u}`); continue; }
    const seen = new Map();
    ls.forEach((les, k) => (les || []).forEach((ch) => {
      if (!alpha.includes(ch)) R(2, `${u} lesson ${k}: "${ch}" is not a letter of the ${l} alphabet`);
      if (seen.has(ch)) R(2, `${u}: "${ch}" in lesson ${seen.get(ch)} AND lesson ${k}`);
      else seen.set(ch, k);
    }));
    const miss = alpha.filter((ch) => !seen.has(ch));
    if (miss.length) R(2, `${u}: the lessons never teach ${miss.join(' ')}`);
  }
  // rule 10 — levels + ruling kinds
  const keys = NEUTRAL.levelKeys[l] || [];
  for (const m of NEUTRAL.modes) if (!(block.levels && keys.includes(block.levels[m]))) R(10, `levels.${m} "${block.levels && block.levels[m]}" ∉ ${l} level keys`);
  for (const b of ['G1', 'G2', 'G3']) if (!(block.ruling && SR.KINDS.includes(block.ruling[b]))) R(10, `ruling.${b} "${block.ruling && block.ruling[b]}" ∉ ${SR.KINDS.join('/')}`);
  // rule 3 — capacity: lesson 0 fits 677 at the base X (d2 and d1), and every mode's X ≥ its level floor
  for (const u of units) {
    for (const d of [1, 2]) {
      try { TYPE.resolvePage(block, TYPE.difficulty[d], l, u); } catch (e) { R(3, `${u} d${d}: ${e.message.replace(/^G2-377: /, '')}`); }
    }
    for (const m of NEUTRAL.modes) {
      const lev = block.levels && block.levels[m];
      const band = BANDS[keys.indexOf(lev)];
      if (!band) continue;
      const kind = block.ruling && block.ruling[band];
      if (kind === 'seyes') continue;
      const x = block.xPx && ((block.xPx[u] && block.xPx[u][m]) != null ? block.xPx[u][m] : block.xPx[m]);
      if (!(x >= NEUTRAL.xFloor[band])) R(3, `${u} xPx.${m} ${x} < the ${band} floor ${NEUTRAL.xFloor[band]}`);
    }
  }
  // rule 4 (node half) — joins: ≥ 8 per unit, distinct, word ⊃ pair, never starting with a lift letter
  for (const u of units) {
    const js = (block.joins && block.joins[u]) || [];
    if (js.length < 8) R(4, `${u}: ${js.length} joins (≥ 8)`);
    const lift = (NEUTRAL.units[u] || {}).lift || '';
    const seen = new Set();
    for (const j of js) {
      if (!j || typeof j.pair !== 'string' || [...j.pair].length < 2) { R(4, `${u}: a join without a pair`); continue; }
      if (seen.has(j.pair)) R(4, `${u}: pair "${j.pair}" twice`); seen.add(j.pair);
      if (lift.includes([...j.pair][0])) R(4, `${u}: pair "${j.pair}" starts with "${[...j.pair][0]}", after which ${u} LIFTS the pen`);
      if (typeof j.word !== 'string' || !j.word.includes(j.pair)) R(4, `${u}: word "${j.word}" does not contain the pair "${j.pair}"`);
      if (j.pair === [...j.pair][0].repeat([...j.pair].length)) R(4, `${u}: pair "${j.pair}" is a base chain`);
    }
  }
  // rule 5 — words: pinned, opened pictures; the locale's vocab singular (de keeps its capital, else lower)
  const words = block.words || {};
  if (Object.keys(words).length < 12) R(5, `${Object.keys(words).length} picture words (≥ 12 for F3 / F4)`);
  for (const [key, val] of Object.entries(words)) {
    if (!NEUTRAL.pictures.includes(key)) R(5, `word key "${key}" is not a pinned picture`);
    if (NEUTRAL.excludePictures.includes(key)) R(5, `"${key}" is an EXCLUDED picture (read two ways)`);
    const text = typeof val === 'string' ? val : val && val.text;
    const override = !!(val && typeof val === 'object' && val.override);
    if (typeof text !== 'string' || !/^\p{L}+$/u.test(text)) { R(5, `"${key}" → "${text}" is not letters only`); continue; }
    if ([...text].length > 8) R(5, `"${key}" → "${text}" has > 8 letters`);
    if (!override) {
      const [theme, noun] = key.split('/');
      let e = null;
      try { e = B2.entriesFor(theme, l).find((x) => x.noun === noun); } catch (err) { e = null; }
      if (!e) R(5, `"${key}" has no ${l} vocab entry (flag a panel literal override:true)`);
      else {
        const want = l === 'de' ? e.singular : e.singular.toLocaleLowerCase(l);
        if (text !== want) R(5, `"${key}" → "${text}" ≠ the ${l} vocab singular "${want}"${l === 'de' ? ' (de nouns keep the capital)' : ''}`);
      }
    }
  }
  // rule 6 — sentences
  const ss = block.sentences || [];
  if (ss.length !== 6) R(6, `${ss.length} sentences (want 6)`);
  for (const s of ss) {
    const toks = String(s).trim().split(/\s+/);
    if (toks.length < 4 || toks.length > 6) R(6, `"${s}": ${toks.length} words (4 to 6)`);
    if (!/^\p{Lu}/u.test(s)) R(6, `"${s}": does not start with a capital`);
    if (!/^[^.!?]*\.$/.test(s)) R(6, `"${s}": must end with ONE full stop and carry no other end mark`);
    if (/\d/.test(s)) R(6, `"${s}": digits`);
    if (freeClaim.hit(s)) R(6, `"${s}": a free-claim`);
  }
  // rules 7-9 — strings
  const strings = block.strings || {};
  if (!strings['G2-377']) R(7, 'no strings for G2-377');
  for (const [id, st] of Object.entries(strings)) {
    const t = (st && st.title) || '', ins = (st && st.instruction) || '';
    if (!t || t.length > 70) R(7, `${id} title "${t}" empty or > 70`);
    if (WORKSHEET_WORD.test(t)) R(7, `${id} title carries a worksheet word`);
    if (freeClaim.hit(t) || freeClaim.hit(ins)) R(7, `${id}: a free-claim in visible copy`);
    if (!ins || ins.length > 150 || !/[.!?]$/.test(ins)) R(7, `${id} instruction empty, > 150 or without an end mark`);
    if (KEY_PROMISE.test(t) || KEY_PROMISE.test(ins)) R(7, `${id}: promises an answer key (printable decks ship none)`);
    for (const re of TITLE_BANS) if (re.test(t)) R(7, `${id} title "${t}" uses a print-tracing / pre-writing head (${re.source})`);
    if (DOTTED.test(ins) || DOTTED.test(t)) R(7, `${id} names dotted / dashed / hollow letters (the traces are SOLID grey)`);
    if (GREY[l] && !READ_IDS.includes(id) && !GREY[l].test(ins)) R(7, `${id} instruction never names the GREY colour of the traces`);
    // rule 7 (fix round 1): ONE sentence — no end mark followed by more text
    if (/[.!?](?=\s+\S)/u.test(ins)) R(7, `${id} instruction is more than one sentence ("${ins}")`);
    if (id === 'G3-401' && ORDER_VERBS[l]) {
      const [tr, cp] = ORDER_VERBS[l];
      const it = ins.search(tr), ic = ins.search(cp);
      if (it < 0 || ic < 0) R(7, `G3-401 instruction: cannot find the ${it < 0 ? 'trace' : 'copy'} verb (${(it < 0 ? tr : cp).source})`);
      else if (it > ic) R(7, `G3-401 instruction copies before it traces — the doing order is trace the grey sentence, then copy ("${ins}")`);
    }
    if (id === 'G2-386' && NO_LIFT_CLAIM.test(ins)) {
      for (const u of units) {
        const lift = (NEUTRAL.units[u] || {}).lift || '';
        for (const v of Object.values(block.words || {})) {
          const w = typeof v === 'string' ? v : v && v.text;
          if (!w) continue;
          const chars = [...w];
          if (/^\p{Lu}/u.test(w) || chars.slice(0, -1).some((ch) => lift.includes(ch))) { R(7, `G2-386 claims one unbroken stroke, but ${u} "${w}" lifts the pen (${/^\p{Lu}/u.test(w) ? 'a capital start' : 'a lift letter'})`); break; }
        }
      }
    }
    // rule 8
    const uCount = (t.match(/\{U\}/g) || []).length;
    if (l === 'de' && uCount !== 1) R(8, `${id} de title carries ${uCount} {U} (want exactly 1)`);
    if (l !== 'de' && uCount) R(8, `${id}: {U} outside de`);
    if (/løkkeskrift/iu.test(t) && (l === 'no' || (l === 'da' && units.includes('dk-uloopet')))) R(8, `${id} title names "løkkeskrift" on an UNLOOPED script`);
    if (/stavskrift/iu.test(t)) R(8, `${id} title names "stavskrift" (print)`);
  }
  // rule 9 — the base title's letter list == lesson 0
  const bt = strings['G2-377'] && strings['G2-377'].title;
  if (bt) {
    const after = bt.includes(':') ? bt.slice(bt.indexOf(':') + 1) : '';
    const named = (after.match(/(?<!\p{L})\p{Ll}(?!\p{L})/gu) || []);
    if (named.length >= 2) {
      const les = ((block.lessons || {})[block.exemplar] || [])[0] || [];
      if (named.slice().sort().join('') !== les.slice().sort().join('')) R(9, `base title names ${named.join(' ')}, lesson 0 of ${block.exemplar} is ${les.join(' ')}`);
    }
  }
  return E;
}

// ─────────────────────────────── renderRules ───────────────────────────────
async function renderRules(block, loc, page) {
  const l = String(loc).slice(0, 2);
  const C6 = require('../templates/components-b6/cursive-writing.js');
  const units = (block && block.units) || [];
  const E = [];
  for (const u of units) {
    const f = path.join(OUT, `G2-377-render-rules-${l}-${u}.html`);
    fs.writeFileSync(f, `<!doctype html><html><head><meta charset="utf-8">${C6.cwFontFace(u)}</head><body><span style="font-family:'LCS Cursive ${u}'">a</span></body></html>`, 'utf8');
    await page.goto(url.pathToFileURL(f).href, { waitUntil: 'networkidle0' });
    const literals = [];
    for (const les of (block.lessons && block.lessons[u]) || []) literals.push(...les);
    for (const j of (block.joins && block.joins[u]) || []) literals.push(j.pair, j.word);
    for (const w of Object.values(block.words || {})) literals.push(typeof w === 'string' ? w : w.text);
    literals.push(...(block.sentences || []));
    const res = await page.evaluate(async ({ u, joins, literals }) => {
      const fam = `LCS Cursive ${u}`;
      await document.fonts.load(`200px "${fam}"`, 'abc');
      await document.fonts.ready;
      const out = [];
      const ctx = document.createElement('canvas').getContext('2d');
      // rule 11: a glyph the unit lacks falls back, so its width differs between two different fallbacks
      const miss = new Set();
      for (const s of literals) for (const ch of s) {
        if (ch === ' ') continue;
        ctx.font = `100px "${fam}", monospace`; const a = ctx.measureText(ch).width;
        ctx.font = `100px "${fam}", serif`; const b = ctx.measureText(ch).width;
        if (Math.abs(a - b) > 0.01) miss.add(ch);
      }
      for (const ch of miss) out.push(`rule 11: "${ch}" is not covered by ${u} (a fallback glyph would print)`);
      // rule 4: pieces at 200 px (area ≥ 150 px²)
      function pieces(text) {
        const c = document.createElement('canvas'); const k = c.getContext('2d', { willReadFrequently: true });
        k.font = `200px "${fam}"`; const w = k.measureText(text).width;
        c.width = Math.ceil(w + 400); c.height = 700;
        k.fillStyle = '#FFFFFF'; k.fillRect(0, 0, c.width, c.height);
        k.font = `200px "${fam}"`; k.fillStyle = '#000000'; k.fillText(text, 200, 420);
        const d = k.getImageData(0, 0, c.width, c.height).data, W = c.width, H = c.height;
        const seen = new Uint8Array(W * H); let n = 0;
        for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
          const i = y * W + x; if (seen[i] || d[i * 4] >= 128) continue;
          let area = 0; const st = [i]; seen[i] = 1;
          while (st.length) { const p = st.pop(); area++; const px = p % W, py = (p - px) / W;
            for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) { const qx = px + dx, qy = py + dy; if (qx < 0 || qy < 0 || qx >= W || qy >= H) continue; const j = qy * W + qx; if (seen[j] || d[j * 4] >= 128) continue; seen[j] = 1; st.push(j); } }
          if (area >= 150) n++;
        }
        return n;
      }
      for (const j of joins) {
        const cs = [...j.pair];
        const sum = cs.reduce((s, ch) => s + pieces(ch), 0);
        const got = pieces(j.pair);
        // every join merges two bodies: a pair of k letters is (sum of the letters' pieces) − (k − 1)
        if (got > sum - (cs.length - 1)) out.push(`rule 4: ${u} pair "${j.pair}" renders as ${got} ink pieces (its letters are ${sum}; a join must merge them)`);
      }
      return out;
    }, { u, joins: (block.joins && block.joins[u]) || [], literals });
    E.push(...res);
  }
  return E;
}

// ─────────────────────────────── probes ───────────────────────────────
/** design-time probe blocks (§2 table + §4 lessons): NOT native data — the panels author the real blocks */
function probeBlock(loc, unit, { kind, X, lesson0, level, scriptName, rest, dashHelpers }) {
  const alpha = alphabetOf(loc);
  const lessons = rest || (() => { const left = alpha.filter((c) => !lesson0.includes(c)); const out = [lesson0]; for (let i = 0; i < left.length; i += 6) out.push(left.slice(i, i + 6)); return out; })();
  const levels = Object.fromEntries(NEUTRAL.modes.map((m) => [m, level]));
  return { refused: null, units: [unit], exemplar: unit, unitLabel: { [unit]: scriptName }, scriptName: { [unit]: scriptName }, ruling: { G1: kind, G2: kind, G3: kind }, dashHelpers: !!dashHelpers, xPx: { base: X, capitals: X, joins: X, words: X, read: X, copy: X }, levels, lessons: { [unit]: lessons } };
}
const DE_LESSONS = [['i', 'u', 'ü', 't'], ['n', 'm', 'r'], ['e', 'l', 'b', 'h', 'k', 'f'], ['a', 'ä', 'd', 'g', 'q'], ['o', 'ö', 'c', 's', 'ß'], ['p', 'j', 'y', 'v', 'w', 'x', 'z']];
const PROBES = [
  { loc: 'en', unit: 'us-trad', stack: 614, block: null },
  { loc: 'de', unit: 'de-va', stack: 614, block: probeBlock('de', 'de-va', { kind: 'lin4', X: 18, lesson0: DE_LESSONS[0], rest: DE_LESSONS, level: '2-klasse', scriptName: 'Vereinfachte Ausgangsschrift' }) },
  { loc: 'de', unit: 'de-la', stack: 566, block: probeBlock('de', 'de-la', { kind: 'lin4', X: 18, lesson0: DE_LESSONS[0], rest: DE_LESSONS, level: '2-klasse', scriptName: 'Lateinische Ausgangsschrift' }) },
  { loc: 'es', unit: 'mx', stack: 676, block: probeBlock('es', 'mx', { kind: 'doble', X: 15, lesson0: ['a', 'e', 'i', 'o', 'u'], level: 'segundo-grado', scriptName: 'Letra cursiva' }) },
  { loc: 'pt', unit: 'br', stack: 630, block: probeBlock('pt', 'br', { kind: 'lin4', X: 16, lesson0: ['a', 'e', 'i', 'o'], level: '1o-ano', scriptName: 'Letra cursiva' }) },
  { loc: 'fr', unit: 'fr-trad', stack: 554.96, block: probeBlock('fr', 'fr-trad', { kind: 'seyes', X: 16, lesson0: ['i', 'u', 't'], level: 'cp', scriptName: 'Cursive traditionnelle' }) },
  { loc: 'it', unit: 'it-trad', stack: 676, block: probeBlock('it', 'it-trad', { kind: 'lin4', X: 16, lesson0: ['a', 'e', 'i', 'o', 'u'], level: 'classe-prima', scriptName: 'Corsivo tradizionale' }) },
  { loc: 'nl', unit: 'nl', stack: 670, block: probeBlock('nl', 'nl', { kind: 'lin4', X: 15, lesson0: ['i', 'u', 't', 'w'], level: 'groep-3', scriptName: 'Aan elkaar', dashHelpers: true }) },
  { loc: 'da', unit: 'dk-uloopet', stack: 610, block: probeBlock('da', 'dk-uloopet', { kind: 'lin4', X: 18, lesson0: ['i', 'u', 't'], level: '2-klasse', scriptName: 'Sammenhængende skrift', dashHelpers: true }) },
  { loc: 'no', unit: 'no', stack: 655, block: probeBlock('no', 'no', { kind: 'lin4', X: 18, lesson0: ['i', 'u', 't'], level: '3-trinn', scriptName: 'Sammenhengende skrift', dashHelpers: true }) },
];
// the de probe draft is shared by both units for the bank poisons
const DE_PROBE = Object.assign({}, PROBES[1].block, { units: ['de-va', 'de-la'], lessons: { 'de-va': DE_LESSONS, 'de-la': DE_LESSONS }, scriptName: { 'de-va': 'Vereinfachte Ausgangsschrift', 'de-la': 'Lateinische Ausgangsschrift' } });

/** a spec wrapper that builds over an injected block (the probe / poison seam) */
function injected(block, over = {}) {
  return Object.assign({}, TYPE, {
    build({ difficulty, locale, unit }) { return TYPE._buildWith(block, over.config || TYPE.difficulty[difficulty], { locale: String(locale).slice(0, 2), unit }); },
  });
}

// ─────────────────────────────── the run ───────────────────────────────
async function main() {
  const puppeteer = require('puppeteer');
  const { renderInstance } = require('../render/render-instance.js');
  const { resolveStrings } = require('../i18n/strings.js');
  let assertions = 0;
  const fails = [];
  const poisons = { total: 0, killed: 0 };
  const ok = (c, m) => { assertions++; if (/POISON SILENT/.test(m)) { poisons.total++; if (c) poisons.killed++; } if (!c) fails.push(m); };
  const pngs = [];

  // 0. the measured metrics
  try {
    const out = execFileSync(process.execPath, [path.join(WG, 'tools', 'measure-cursive-metrics.js'), '--check'], { encoding: 'utf8' });
    ok(/units match the committed file/.test(out), 'cursive-metrics --check did not report a match');
    console.log('0. ' + out.trim().split('\n').pop());
  } catch (e) { ok(false, 'cursive-metrics --check FAILED: ' + String(e.stdout || e.message).slice(-300)); }

  // 1. the EN bank
  const EN = CURSIVE_WRITING.en;
  const enFails = validateBank(EN, 'en');
  ok(enFails.length === 0, 'validateBank(en): ' + enFails.join(' | '));
  for (const p of NEUTRAL.pictures) { const [t, n] = p.split('/'); let f = null; try { f = B2.fileUri(t, n); } catch (e) { f = null; } ok(!!f && fs.existsSync(url.fileURLToPath(f)), `picture ${p} does not exist on disk`); }
  ok(NEUTRAL.pictures.length === 27 && NEUTRAL.excludePictures.every((x) => !NEUTRAL.pictures.includes(x)), 'the pinned picture list is not the 27 opened keys minus the exclusions');
  ok(TYPE.i18n.en.title === EN.strings['G2-377'].title && TYPE.i18n.en.instruction === EN.strings['G2-377'].instruction, 'spec i18n.en ≠ bank strings');
  console.log(`1. validateBank(en): ${enFails.length} failure(s)`);

  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  try {
    const rr = await renderRules(EN, 'en', page);
    ok(rr.length === 0, 'renderRules(en): ' + rr.join(' | '));
    console.log(`1b. renderRules(en): ${rr.length} failure(s)`);
    // the probe blocks' glyphs (lesson letters incl. ü ß ñ ç æ ø å) are covered by their units
    for (const pr of PROBES.filter((p) => p.block)) {
      const r = await renderRules(pr.block, pr.loc, page);
      ok(r.length === 0, `renderRules(${pr.loc} probe ${pr.unit}): ${r.join(' | ')}`);
    }

    // 2. the primitive gate
    const sr = await require('./verify-school-ruling.js').run({ page, png: true });
    assertions += sr.assertions;
    poisons.total += 3; poisons.killed += 3 - sr.fails.filter((f) => /POISON SILENT/.test(f)).length;   // the primitive gate's three poisons
    for (const f of sr.fails) fails.push(f);
    console.log(`2. verify-school-ruling: ${sr.cases} cases, ${sr.assertions} assertions, ${sr.fails.length} failure(s)`);

    // measurement of a rendered cursive page (the floors + containment)
    const measurePage = () => page.evaluate(() => {
      const r = (e) => e.getBoundingClientRect();
      const body = document.querySelector('.ws-body'), root = document.querySelector('[data-lcs-cw]');
      const flow = [...root.querySelectorAll('[data-lcs-flow]')];
      const last = flow[flow.length - 1];
      const boxes = [root.querySelector('.cw-ribbon'), ...flow].map(r);
      let maxBand = 0; for (let k = 1; k < boxes.length; k++) maxBand = Math.max(maxBand, boxes[k].top - boxes[k - 1].bottom);
      const rows = [...root.querySelectorAll('.cw-row')].map((x) => r(x).height);
      let minFont = Infinity;
      root.querySelectorAll('span').forEach((s) => { if (s.childNodes.length === 1 && s.firstChild.nodeType === 3 && s.textContent.trim()) minFont = Math.min(minFont, parseFloat(getComputedStyle(s).fontSize)); });
      return { title: document.querySelector('[data-lcs-title]').textContent.trim(), instruction: document.querySelector('[data-lcs-instruction]').textContent.trim(), body: r(body).height, bodyBottom: r(body).bottom, contentBottom: r(last).bottom, minRow: Math.min(...rows), minFont, x: Number(root.dataset.lcsX), floor: Number(root.dataset.lcsFloor), stack: Number(root.dataset.lcsStack), practice: Number(root.dataset.lcsPractice), maxBand };
    });
    const pdfFaces = (pdfPath) => [...new Set((fs.readFileSync(pdfPath).toString('latin1').match(/\/FontName\s*\/[A-Z]{6}\+Playwrite[A-Za-z0-9-]*/g) || []).map((s) => s.replace(/.*\+/, '')))];
    const floors = (m, tag) => {
      ok(m.minRow >= 36, `${tag}: a ruled row ${m.minRow} px < the G2 element floor 36`);
      ok(m.x >= m.floor, `${tag}: X ${m.x} < floor ${m.floor}`);
      ok(m.minFont >= 13, `${tag}: body text at ${m.minFont} px (< 13)`);
      ok(m.contentBottom <= m.bodyBottom + 0.6, `${tag}: content ends ${Math.round(m.contentBottom)} past the body ${Math.round(m.bodyBottom)}`);
      ok(m.stack <= 677, `${tag}: stack ${m.stack} > 677`);
    };

    // 3. en renders
    const S = resolveStrings('G2-377', 'en', TYPE);
    for (const d of [1, 2, 3]) {
      const out = await renderInstance({ type: TYPE, theme: null, difficulty: d, locale: 'en', unit: 'us-trad', page, outDir: OUT, baseName: `G2-377-gate-d${d}-en`, strings: S });
      ok(out.qa.verify.length === 0, `en d${d} verify: ${out.qa.verify.join(' | ')}`);
      ok(out.qa.lints.length === 0, `en d${d} lints: ${out.qa.lints.join(' | ')}`);
      const m = await measurePage();
      floors(m, `en d${d}`);
      ok(m.title === EN.strings['G2-377'].title && m.instruction === EN.strings['G2-377'].instruction, `en d${d}: the printed chrome ≠ the bank strings`);
      const faces = pdfFaces(out.pdfPath);
      ok(faces.length === 1 && /PlaywriteUSTrad/.test(faces[0]), `en d${d}: the PDF embeds ${faces.join(', ') || 'no'} Playwrite face (want exactly PlaywriteUSTrad)`);
      pngs.push(out.pngPath);
      console.log(`3. en d${d}: verify ${out.qa.verify.length} lints ${out.qa.lints.length} stack ${m.stack} body ${Math.round(m.body)} X ${m.x} rows ≥ ${m.minRow.toFixed(0)} PDF ${faces.join(',')} → ${out.pngPath}`);
    }
    // 3b. SPARSE / FILL at the three chromes (814 one-line, 722 three-line, 677 four-line title) for EVERY unit
    const CHROME = {
      one: { title: 'Cursive', instruction: 'Trace the grey letters.' },
      three: { title: 'Cursive Letters for Second Grade Practice with the Traditional Joined Hand', instruction: 'Trace the grey letters with your pencil, then keep writing each letter joined on your own to the end of its line. Then write it joined again on the empty line below, and again.' },
      four: { title: 'Sammenhengende skrift for tredje trinn: skriv de små bokstavene sammen på linjene nedenfor i dag og øv videre', instruction: 'Trace the grey letters, then write them joined.' },
    };
    for (const pr of PROBES) {
      const block = pr.block || EN;
      for (const [k, st] of Object.entries(CHROME)) {
        const out = await renderInstance({ type: pr.block ? injected(block) : TYPE, theme: null, difficulty: 2, locale: pr.loc, unit: pr.unit, page, outDir: OUT, baseName: `G2-377-gate-d2-${pr.unit}-chrome-${k}`, strings: st });
        const m = await measurePage();
        ok(out.qa.verify.length === 0 && out.qa.lints.length === 0, `${pr.unit} chrome ${k}: verify ${out.qa.verify.join(' | ')} lints ${out.qa.lints.join(' | ')}`);
        ok(Math.abs(m.body - { one: 814, three: 722, four: 677 }[k]) <= 16, `${pr.unit} chrome ${k}: body ${Math.round(m.body)} is not the ${k} chrome`);
        floors(m, `${pr.unit} chrome ${k}`);
        ok(m.bodyBottom - m.contentBottom <= 60.5, `${pr.unit} chrome ${k}: SPARSE ${Math.round(m.bodyBottom - m.contentBottom)} px blank under the content`);
        ok(m.maxBand <= 40.5, `${pr.unit} chrome ${k}: SPARSE a ${Math.round(m.maxBand)} px band between content boxes`);
        if (pr.unit === 'us-trad' || k === 'one') console.log(`3b. ${pr.unit} chrome ${k}: body ${Math.round(m.body)} min stack ${m.stack} tail ${Math.round(m.bodyBottom - m.contentBottom)} max band ${Math.round(m.maxBand)} practice rows ${m.practice}`);
      }
    }

    // 4. every shipped unit (probe blocks) + the calibration page
    for (const pr of PROBES) {
      const block = pr.block || EN;
      const t = injected(block);
      const r2 = TYPE.resolvePage(block, TYPE.difficulty[2], pr.loc, pr.unit);
      ok(Math.abs(r2.stack - pr.stack) < 0.05, `${pr.unit}: d2 stack ${r2.stack} ≠ the design's ${pr.stack}`);
      for (const d of (QUICK ? [2] : [1, 2, 3])) {
        const st = { title: `${block.scriptName[pr.unit]}: ${r2.letters.join(', ')}`, instruction: EN.strings['G2-377'].instruction };
        let out;
        try { out = await renderInstance({ type: t, theme: null, difficulty: d, locale: pr.loc, unit: pr.unit, page, outDir: OUT, baseName: `G2-377-probe-${pr.unit}-d${d}`, strings: st }); } catch (e) { ok(false, `${pr.unit} d${d}: ${e.message}`); continue; }
        ok(out.qa.verify.length === 0, `${pr.unit} d${d} verify: ${out.qa.verify.join(' | ')}`);
        ok(out.qa.lints.length === 0, `${pr.unit} d${d} lints: ${out.qa.lints.join(' | ')}`);
        const m = await measurePage();
        floors(m, `${pr.unit} d${d}`);
        const faces = pdfFaces(out.pdfPath);
        ok(faces.length === 1, `${pr.unit} d${d}: the PDF embeds ${faces.length} Playwrite faces (${faces.join(', ')})`);
        if (d === 2) pngs.push(out.pngPath);
        if (d === 2) console.log(`4. ${pr.loc} ${pr.unit} ${r2.kind} X ${r2.X} w ${r2.writeRows} stack ${r2.stack}: verify ${out.qa.verify.length} lints ${out.qa.lints.length} PDF ${faces.join(',')} → ${out.pngPath}`);
      }
      // calibration: lesson "x" — the chains' ink top ON the x-line
      const cal = JSON.parse(JSON.stringify(block));
      cal.lessons[pr.unit] = [['x']];
      const ct = injected(cal);
      const out = await renderInstance({ type: Object.assign({}, ct, { verify: async (pg) => (await TYPE.verify(pg)).concat(await TYPE._rasterVerify(pg, { expectXCalibration: true })) }), theme: null, difficulty: 2, locale: pr.loc, unit: pr.unit, page, outDir: OUT, baseName: `G2-377-calib-${pr.unit}`, strings: { title: 'x', instruction: 'x.' } });
      // the calibration page is a synthetic one-letter lesson (never shipped): its SPARSE tail is expected
      const calFails = out.qa.verify.filter((x) => !/SPARSE/.test(x));
      ok(calFails.length === 0, `${pr.unit} calibration: ${calFails.join(' | ')}`);
    }

    // 5. refusals
    const throws = (fn, re, label) => { let msg = null; try { fn(); } catch (e) { msg = e.message; } ok(msg && re.test(msg), `refusal "${label}" did not throw as expected (${msg})`); };
    throws(() => TYPE.build({ difficulty: 2, locale: 'sv' }), /refused/, 'sv build');
    throws(() => TYPE.build({ difficulty: 2, locale: 'fi' }), /refused/, 'fi build');
    throws(() => TYPE.build({ difficulty: 2, locale: 'en', unit: 'de-va' }), /not a en unit/, 'en page in de-va');
    throws(() => TYPE._buildWith(EN, { ...TYPE.difficulty[2], mode: 'nope' }, { locale: 'en' }), /only the base/, 'an unknown mode fed to the base');
    throws(() => TYPE._buildWith(Object.assign({}, EN, { lessons: { 'us-trad': [['a', 'b', 'c', 'd', 'e', 'f', 'g']] } }), TYPE.difficulty[2], { locale: 'en' }), /does not fit 677/, 'a 7-letter lesson');
    throws(() => TYPE._buildWith(Object.assign({}, EN, { xPx: { base: 12 } }), TYPE.difficulty[2], { locale: 'en' }), /floor/, 'X under the floor');
    console.log('5. refusals checked');

    // 6. POISONS — bank
    const clone = (b) => JSON.parse(JSON.stringify(b));
    const newFails = (control, poisoned) => poisoned.filter((f) => !control.includes(f));
    const bankPoison = (label, loc, base, mutate, rule, re) => {
      const control = validateBank(base, loc);
      const b = clone(base); mutate(b);
      const got = newFails(control, validateBank(b, loc));
      const hit = got.find((f) => f.startsWith(`rule ${rule}:`) && (!re || re.test(f)));
      ok(!!hit, `POISON SILENT ${label}: no new rule ${rule} failure (${got.join(' | ') || 'none'})`);
      if (hit) console.log(`poison killed ${label} → ${hit}`);
    };
    const FR = PROBES.find((p) => p.unit === 'fr-trad').block;
    const PT = PROBES.find((p) => p.unit === 'br').block;
    const DA = PROBES.find((p) => p.unit === 'dk-uloopet').block;
    const NO = PROBES.find((p) => p.unit === 'no').block;
    bankPoison('P1 fr lesson containing ü', 'fr', FR, (b) => { b.lessons['fr-trad'][1].push('ü'); }, 2, /"ü" is not a letter of the fr alphabet/);
    bankPoison('P2 e in two us-trad lessons', 'en', EN, (b) => { b.lessons['us-trad'][0].push('e'); }, 2, /"e" in lesson/);
    bankPoison('P3 fr-trad CP lesson of 4 letters', 'fr', FR, (b) => { b.lessons['fr-trad'][0].push(b.lessons['fr-trad'][1].shift()); }, 3, /does not fit 677/);
    bankPoison('P4 pt lesson 0 a e i o u at X15', 'pt', PT, (b) => { b.xPx.base = 15; b.lessons.br[0].push('u'); b.lessons.br[1] = b.lessons.br[1].filter((c) => c !== 'u'); }, 3, /does not fit 677/);
    bankPoison('P5 join fa for dk-uloopet', 'da', DA, (b) => { b.joins = { 'dk-uloopet': [{ pair: 'fa', word: 'far' }] }; }, 4, /LIFTS the pen/);
    bankPoison('P6 join word boat for pair ol', 'en', EN, (b) => { b.joins['us-trad'][0].word = 'boat'; }, 4, /does not contain the pair "ol"/);
    bankPoison('P7 word cerf-volant', 'fr', FR, (b) => { b.words = { 'toys/kite': 'cerf-volant' }; }, 5, /not letters only/);
    bankPoison('P8 animals/wolf in words', 'en', EN, (b) => { b.words['animals/wolf'] = 'wolf'; }, 5, /EXCLUDED picture/);
    bankPoison('P9 de word katze', 'de', DE_PROBE, (b) => { b.words = { 'animals/cat': 'katze' }; }, 5, /keep the capital/);
    bankPoison('P10 sentence without the capital', 'en', EN, (b) => { b.sentences[0] = 'the cat is on the bed.'; }, 6, /does not start with a capital/);
    bankPoison('P11 a 7-word sentence', 'en', EN, (b) => { b.sentences[1] = 'I see a red kite in the sky.'; }, 6, /8 words/);
    { const got = validateBank(clone(EN), 'sv'); ok(got.some((f) => f.startsWith('rule 1:')), 'POISON SILENT P12 an sv block present'); console.log('poison killed P12 sv block → ' + got[0]); }
    bankPoison('P13 unit fr-moderne2', 'fr', FR, (b) => { b.units.push('fr-moderne2'); }, 1, /fr-moderne2/);
    bankPoison('P14 no title "Løkkeskrift: …"', 'no', NO, (b) => { b.strings = { 'G2-377': { title: 'Løkkeskrift: i, u og t', instruction: 'Spor de grå bokstavene.' } }; }, 8, /løkkeskrift/i);
    bankPoison('P15 en instruction "Trace the dashed letters…"', 'en', EN, (b) => { b.strings['G2-377'].instruction = 'Trace the dashed grey letters, then write each letter joined on the empty line below.'; }, 7, /dotted \/ dashed/);
    bankPoison('P16 base title "… i, t, u" (lesson 0 is i t u w)', 'en', EN, (b) => { b.strings['G2-377'].title = 'Cursive Letters: i, t and u'; }, 9, /lesson 0/);
    bankPoison('P17 pt title "Letra cursiva pontilhada"', 'pt', PT, (b) => { b.strings = { 'G2-377': { title: 'Letra cursiva pontilhada', instruction: 'Cubra as letras cinza e escreva.' } }; }, 7, /pontilhad/);
    // render-rule poisons
    { const b = clone(EN); b.joins['us-trad'][7] = { pair: 'o s', word: 'go slow' };
      const got = newFails(await renderRules(EN, 'en', page), await renderRules(b, 'en', page));
      ok(got.some((f) => /rule 4:.*"o s"/.test(f)), 'POISON SILENT RJ1 a pair that does not join (a space in it)'); console.log('poison killed RJ1 → ' + (got[0] || 'none')); }
    { const b = clone(EN); b.words['toys/kite'] = 'kiλe';
      const got = newFails(await renderRules(EN, 'en', page), await renderRules(b, 'en', page));
      ok(got.some((f) => /rule 11:.*"λ"/.test(f)), 'POISON SILENT RG1 a glyph the unit does not cover'); console.log('poison killed RG1 → ' + (got[0] || 'none')); }

    // 6b. POISONS — render (mutated copies of clean rendered pages; verify() must name the defect)
    const enHtml = fs.readFileSync(path.join(OUT, 'G2-377-gate-d2-en.html'), 'utf8');
    const vaHtml = fs.readFileSync(path.join(OUT, 'G2-377-probe-de-va-d2.html'), 'utf8');
    const C6 = require('../templates/components-b6/cursive-writing.js');
    const renderPoison = async (label, html, mutate, re) => {
      const f = path.join(OUT, `G2-377-poison-${label.split(' ')[0]}.html`);
      const bad = mutate(html);
      ok(bad !== html, `${label}: the mutation did not apply`);
      fs.writeFileSync(f, bad, 'utf8');
      await page.goto(url.pathToFileURL(f).href, { waitUntil: 'networkidle0' });
      await page.evaluate(() => document.fonts.ready);
      const got = await TYPE.verify(page);
      const hit = got.find((x) => re.test(x));
      ok(!!hit, `POISON SILENT ${label} (${got.slice(0, 3).join(' | ') || 'verify clean'})`);
      if (hit) console.log(`poison killed ${label} → ${hit}`);
    };
    for (const [label, html] of [['CONTROL en', enHtml], ['CONTROL de-va', vaHtml]]) {
      const f = path.join(OUT, `G2-377-poison-${label.replace(' ', '-')}.html`);
      fs.writeFileSync(f, html, 'utf8');
      await page.goto(url.pathToFileURL(f).href, { waitUntil: 'networkidle0' });
      await page.evaluate(() => document.fonts.ready);
      const got = await TYPE.verify(page);
      ok(got.length === 0, `${label}: the untouched page fails verify (${got.join(' | ')})`);
    }
    await renderPoison('PR1 per-letter spans', enHtml, (h) => h.replace(/(data-lcs-chain="iii"[^>]*>)iii</, '$1<span>i</span><span>i</span><span>i</span><'), /not exactly one text node/);
    await renderPoison('PR2 cursive as SVG text', enHtml, (h) => h.replace(/(<svg[^>]*data-lcs-prim="school-ruling"[^>]*>)/, `$1<text x="300" y="40" font-family="LCS Cursive us-trad" font-size="34" fill="#C8BFAE">uuu</text>`), /cursive drawn as SVG/);
    await renderPoison('PR3 letter-spacing on a chain', enHtml, (h) => h.replace(/(data-lcs-chain="uuu" style=")/, '$1letter-spacing:0.5px !important;'), /letter-spacing|ink pieces/);
    await renderPoison('PR4 the de-la font on a VA page', vaHtml, (h) => h.replace('</style>', '</style>' + C6.cwFontFace('de-la')).replace(/(data-lcs-chain="uuu" style="font-family:)'LCS Cursive de-va'/, "$1'LCS Cursive de-la'"), /cursive @font-face blocks|cursive families used/);
    await renderPoison('PR5 a missing @font-face', enHtml, (h) => h.replace(/<style data-lcs-cursive-face="us-trad">[^<]*<\/style>/, ''), /fonts\.check false|fallback|0 cursive @font-face/);
    await renderPoison('PR8 a row whose baseline is 3 px off the ink', enHtml, (h) => h.replace(/(class="cw-chains" data-lcs-chains="2" style="position:absolute;left:92px;top:)([-0-9.]+)px/, (m, a, t) => `${a}${+t + 3}px`), /vs its baseline/);
    await renderPoison('PR10 a trace node in inkSoft', enHtml, (h) => h.replace(/(data-lcs-chain="ttt" style="[^"]*color:)#C8BFAE/, '$1#8A8276'), /colour rgb\(138, 130, 118\)/);
    await renderPoison('PR11 a title naming letters the page does not teach', enHtml, (h) => h.replace(/(data-lcs-title>)Cursive Letters: i, t, u and w</, '$1Cursive Letters: i, t and u<'), /the title names i t u, the page teaches/);
    await renderPoison('PR12 the practice lines removed and the gaps frozen (the SPARSE bottom restored)', enHtml, (h) => h.replace('</head>', '<style>.cw-practice{display:none!important}[data-lcs-gap]{flex-grow:0!important}</style></head>'), /SPARSE: \d+ px blank under/);
    await renderPoison('PR13 a 90 px band between two letter blocks', enHtml, (h) => h.replace(/(<div data-lcs-gap="10" style="position:relative;flex:1 1 10px;min-height:)10px/, '$190px'), /SPARSE: a \d+ px blank band between/);

    // ═══════════════ 7. THE FIVE FACES (Phase E) ═══════════════
    const { loadType } = require('../lib/load-types.js');
    const { makeRng } = require('../lib/rng.js');
    const FACES = [
      { id: 'G2-384', mode: 'capitals' }, { id: 'G2-385', mode: 'joins' }, { id: 'G2-386', mode: 'words' },
      { id: 'G2-387', mode: 'read' }, { id: 'G3-401', mode: 'copy' },
    ];
    // what each face's instruction may name, and the apparatus that must be ON the page for it (nt5-F lesson 4)
    const APPARATUS = [
      [/(?<!\p{L})gr[ae]y(?!\p{L})/iu, '[data-lcs-role="trace"]', 'grey traces'],
      [/capital/iu, '[data-lcs-kind="capital-pair"]', 'grey capitals'],
      [/(?<!\p{L})names?(?!\p{L})/iu, '[data-lcs-kind="name"]', 'grey names'],
      [/pair of joined letters/iu, '[data-lcs-kind="pair"]', 'grey pairs'],
      [/(?<!\p{L})the word(?!\p{L})/iu, '[data-lcs-kind="word"]', 'a grey word'],
      [/dots and crosses/iu, '[data-lcs-kind="word"]', 'words carrying dots / crosses'],
      [/(?<!\p{L})picture/iu, '[data-lcs-pic]', 'pictures'],
      [/draw a line/iu, '.ws-match-dot', 'match dots'],
      [/printed sentence/iu, '[data-lcs-print]', 'printed sentences'],
      [/grey sentence/iu, '[data-lcs-kind="sentence"]', 'a grey sentence'],
      [/empty line/iu, '.cw-row[data-lcs-empty]', 'an empty line'],
    ];
    const apparatusFails = async (instr) => page.evaluate((rules) => rules.filter(([src, flags, sel]) => new RegExp(src, flags).test(document.querySelector('[data-lcs-instruction]').textContent) && !document.querySelector(sel)).map(([, , , what]) => what),
      APPARATUS.filter(([re]) => re.test(instr)).map(([re, sel, what]) => [re.source, re.flags, sel, what]));
    const faceHtml = {};
    for (const f of FACES) {
      const spec = loadType(f.id);
      ok(spec.difficulty[2].mode === f.mode && spec.difficulty[1] === spec.difficulty[2], `${f.id}: d2 is not mode ${f.mode} (or its levels differ)`);
      ok(spec.i18n.en.title === EN.strings[f.id].title && spec.i18n.en.instruction === EN.strings[f.id].instruction, `${f.id}: spec i18n.en ≠ bank strings`);
      ok(!/free|answer key|with answers/i.test(spec.i18n.en.title + spec.i18n.en.instruction), `${f.id}: a free / answer-key promise`);
      const chromes = { default: null, one: CHROME.one, three: CHROME.three, four: CHROME.four };
      for (const [k, st] of Object.entries(chromes)) {
        if (QUICK && k !== 'default' && k !== 'four') continue;
        const S2 = st || resolveStrings(f.id, 'en', spec);
        const out = await renderInstance({ type: spec, theme: null, difficulty: 2, locale: 'en', unit: 'us-trad', page, outDir: OUT, baseName: k === 'default' ? `${f.id}-null-d2-en` : `${f.id}-gate-d2-en-chrome-${k}`, strings: S2 });
        ok(out.qa.verify.length === 0, `${f.id} ${k}: verify ${out.qa.verify.join(' | ')}`);
        ok(out.qa.lints.length === 0, `${f.id} ${k}: lints ${out.qa.lints.join(' | ')}`);
        const m = await page.evaluate(() => {
          const r = (e) => e.getBoundingClientRect();
          const body = r(document.querySelector('.ws-body'));
          const root = document.querySelector('[data-lcs-cw]');
          const leaves = [...root.querySelectorAll('[data-lcs-leaf], [data-lcs-practice=""], .cw-card')].map(r);
          const bottom = Math.max(...leaves.map((x) => x.bottom));
          let minFont = Infinity; root.querySelectorAll('span, div').forEach((s) => { if ([...s.childNodes].some((c) => c.nodeType === 3 && c.textContent.trim())) minFont = Math.min(minFont, parseFloat(getComputedStyle(s).fontSize)); });
          const rows = [...root.querySelectorAll('.cw-row')].map((x) => r(x).height);
          const pics = [...root.querySelectorAll('[data-lcs-pic]')].map((x) => Math.min(r(x).width, r(x).height));
          return { body: body.height, fill: (bottom - body.top) / body.height, tail: body.bottom - bottom, minFont, minRow: Math.min(...rows), minPic: pics.length ? Math.min(...pics) : null, x: Number(root.dataset.lcsX), floor: Number(root.dataset.lcsFloor) };
        });
        ok(m.minFont >= 13, `${f.id} ${k}: text at ${m.minFont} px`);
        ok(m.minRow >= 36, `${f.id} ${k}: a row ${m.minRow} px < 36`);
        ok(m.minPic == null || m.minPic >= 71.5, `${f.id} ${k}: a picture ${m.minPic} px < 72`);
        ok(m.x >= m.floor, `${f.id} ${k}: X ${m.x} < floor ${m.floor}`);
        ok(m.tail <= 60.5 && m.tail >= -0.6, `${f.id} ${k}: tail ${Math.round(m.tail)} px (SPARSE ≤ 60, inside the body)`);
        if (k === 'one') ok(m.fill >= 0.85, `${f.id} one: FILL ${(m.fill * 100).toFixed(1)} % < 85 % at the 814 chrome`);
        if (k === 'default') {
          const app = await apparatusFails(S2.instruction);
          ok(app.length === 0, `${f.id}: the instruction names apparatus not on the page: ${app.join(', ')}`);
          faceHtml[f.id] = fs.readFileSync(path.join(OUT, `${f.id}-null-d2-en.html`), 'utf8');
          pngs.push(out.pngPath);
        }
        console.log(`7. ${f.id} ${f.mode} ${k}: verify ${out.qa.verify.length} lints ${out.qa.lints.length} body ${Math.round(m.body)} fill ${(m.fill * 100).toFixed(1)}% tail ${Math.round(m.tail)}${k === 'default' ? ' → ' + out.pngPath : ''}`);
      }
    }
    // F1 capitals in EVERY unit (the names bank exists in every shipped locale; cap-row geometry per unit)
    for (const pr of PROBES.filter((p) => p.block)) {
      const spec = loadType('G2-384');
      const t = Object.assign({}, spec, { build({ difficulty, locale, unit }, ctx) { return TYPE._buildWith(pr.block, spec.difficulty[difficulty], { locale: String(locale).slice(0, 2), unit }, ctx); } });
      TYPE._verifyBank = () => pr.block;
      try {
        const out = await renderInstance({ type: t, theme: null, difficulty: 2, locale: pr.loc, unit: pr.unit, page, outDir: OUT, baseName: `G2-384-probe-${pr.unit}-d2`, strings: { title: 'Capitals', instruction: 'Trace each grey capital letter and name, then write them on the empty line below.' } });
        ok(out.qa.verify.length === 0 && out.qa.lints.length === 0, `G2-384 ${pr.unit}: verify ${out.qa.verify.join(' | ')} lints ${out.qa.lints.join(' | ')}`);
        if (!QUICK || pr.unit === 'fr-trad') console.log(`7b. G2-384 capitals ${pr.unit}: verify ${out.qa.verify.length} lints ${out.qa.lints.length} → ${out.pngPath}`);
      } catch (e) { ok(false, `G2-384 ${pr.unit}: ${e.message}`); }
      finally { delete TYPE._verifyBank; }
    }
    // F4 anti-tell (fix round 1, da panel: three adjacent swaps put every partner one row away). Pooled over
    // 12,000 seeds: no partner at distance 0; ≤ 1 at distance 1 on EVERY page (share reported); no constant shift,
    // no reversal; the partner is below as often as above (±10 %, both directions). Then the SHIPPED instance of
    // every locale (the draft banks present + en): the same per-page rules.
    {
      const n = 6, SEEDS = QUICK ? 6000 : 12000;
      let pagesBad = 0, shift = 0, rev = 0, d0 = 0, d1 = 0, up = 0, down = 0, tot = 0;
      for (let sd = 0; sd < SEEDS; sd++) {
        const o = TYPE.derangeOrder(n, makeRng('G2-387|' + sd));
        const d = TYPE.partnerDistances(o);
        if (d.filter((x) => x === 1).length > 1) pagesBad++;
        d.forEach((x) => { tot++; if (x === 0) d0++; if (x === 1) d1++; });
        o.forEach((w, k) => { if (k > w) down++; else if (k < w) up++; });
        const off = o.map((v, i) => (v - i + n) % n); if (off.every((x) => x === off[0])) shift++;
        if (o.join(',') === '5,4,3,2,1,0') rev++;
      }
      const bal = Math.abs(up - down) / ((up + down) / 2);
      ok(d0 === 0 && pagesBad === 0 && shift === 0 && rev === 0, `F4: over ${SEEDS} seeds ${d0} partners at distance 0, ${pagesBad} pages with > 1 at distance 1, ${shift} shifts, ${rev} reversals`);
      ok(bal <= 0.10, `F4: partners below ${down} vs above ${up} (${(bal * 100).toFixed(1)} % apart > 10 %)`);
      console.log(`7c. F4 over ${SEEDS} seeds: distance-1 share ${(d1 / tot * 100).toFixed(1)} % (≤ 1 per page on every page), 0 at distance 0, 0 shifts, 0 reversals, below/above ${down}/${up} (${(bal * 100).toFixed(1)} % apart)`);
      const ord = /data-lcs-order="([0-9,]+)"/.exec(faceHtml['G2-387'] || '');
      ok(!!ord, 'F4: the shipped page carries no data-lcs-order');
      // the shipped instance per locale: the production seed (instanceSeed, unit null) over each locale's bank
      const { instanceSeed } = require('../lib/rng.js');
      const spec4 = loadType('G2-387');
      const blocks = { en: EN };
      for (const [loc, b] of Object.entries(DRAFT_BANKS)) blocks[loc] = b;
      for (const [loc, b] of Object.entries(blocks)) {
        let meta;
        try { meta = TYPE._buildWith(b, spec4.difficulty[2], { locale: loc }, { rng: makeRng(instanceSeed({ typeId: 'G2-387', theme: null, difficulty: 2, seedEpoch: 1 })) }).meta; }
        catch (e) { console.log(`7c. F4 shipped ${loc}: refused — ${e.message.slice(0, 120)}`); continue; }
        const d = TYPE.partnerDistances(meta.order);
        ok(!d.includes(0) && d.filter((x) => x === 1).length <= 1, `F4 shipped ${loc}: partner distances ${d.join(',')} (≤ 1 at distance 1, none at 0)`);
        console.log(`7c. F4 shipped ${loc}: order ${meta.order.join(',')} → partner distances ${d.join(',')}`);
      }
    }
    // F5 (and the spaced nodes of F1 / F2) in EVERY unit: the word gap ≥ 0.3 em is measured by verify()'s raster on
    // the draft sentences where a draft bank exists (the it panel's "dorme sul"), else on the en sentences
    for (const pr of PROBES) {
      const draft = Object.entries(DRAFT_BANKS).find(([loc, b]) => loc === pr.loc && (b.units || []).includes(pr.unit));
      const block = draft ? draft[1] : Object.assign({}, pr.block || EN, { sentences: EN.sentences, levels: Object.assign({}, (pr.block || EN).levels) });
      const spec5 = loadType('G3-401');
      const t5 = Object.assign({}, spec5, { build({ difficulty, locale, unit }, ctx) { return TYPE._buildWith(block, spec5.difficulty[difficulty], { locale: String(locale).slice(0, 2), unit }, ctx); } });
      TYPE._verifyBank = () => block;
      try {
        const out = await renderInstance({ type: t5, theme: null, difficulty: 2, locale: pr.loc, unit: pr.unit, page, outDir: OUT, baseName: `G3-401-probe-${pr.unit}-d2`, strings: { title: 'Sentences', instruction: 'Trace the grey sentence, then copy each printed sentence in cursive on the two lines below it.' } });
        ok(out.qa.verify.length === 0 && out.qa.lints.length === 0, `G3-401 ${pr.unit}${draft ? ' (draft sentences)' : ''}: verify ${out.qa.verify.join(' | ')} lints ${out.qa.lints.join(' | ')}`);
        const gaps = await page.evaluate(() => [...document.querySelectorAll('[data-lcs-kind="sentence"]')].map((n) => n.style.wordSpacing));
        console.log(`7d. G3-401 copy ${pr.unit}${draft ? ' (draft)' : ''}: word-spacing ${gaps.join(',') || 'none'} verify ${out.qa.verify.length} → ${out.pngPath}`);
      } catch (e) { console.log(`7d. G3-401 copy ${pr.unit}: refused — ${e.message.slice(0, 140)}`); }
      finally { delete TYPE._verifyBank; }
    }
    // the face poisons (render: mutated copies of the clean face pages; verify must name the defect)
    const facePoison = async (label, id, mutateDom, re) => {
      const f = path.join(OUT, `G2-377-poison-${label.split(' ')[0]}.html`);
      fs.writeFileSync(f, faceHtml[id], 'utf8');
      await page.goto(url.pathToFileURL(f).href, { waitUntil: 'networkidle0' });
      await page.evaluate(() => document.fonts.ready);
      await page.evaluate(mutateDom);
      const got = await TYPE.verify(page);
      const hit = got.find((x) => re.test(x));
      ok(!!hit, `POISON SILENT ${label} (${got.slice(0, 3).join(' | ') || 'verify clean'})`);
      if (hit) console.log(`poison killed ${label} → ${hit}`);
    };
    for (const f of FACES) {   // controls: the untouched face pages verify clean
      const file = path.join(OUT, `G2-377-poison-CONTROL-${f.id}.html`);
      fs.writeFileSync(file, faceHtml[f.id], 'utf8');
      await page.goto(url.pathToFileURL(file).href, { waitUntil: 'networkidle0' });
      await page.evaluate(() => document.fonts.ready);
      const got = await TYPE.verify(page);
      ok(got.length === 0, `CONTROL ${f.id}: the untouched page fails verify (${got.join(' | ')})`);
    }
    await facePoison('PR6 F4 pictures = the words rotated by one', 'G2-387', () => {
      const cards = [...document.querySelectorAll('.cw-card')], col = document.querySelectorAll('.ws-match-col')[1];
      const tiles = [...col.children];
      const keys = cards.map((c) => c.dataset.lcsWord);
      keys.forEach((k, i) => { const t = tiles.find((x) => x.dataset.lcsPic === keys[(i + 1) % keys.length]); col.appendChild(t); });
    }, /constant shift/);
    await facePoison('PR20 F4 three adjacent swaps (every partner one row away)', 'G2-387', () => {
      const cards = [...document.querySelectorAll('.cw-card')], col = document.querySelectorAll('.ws-match-col')[1];
      const tiles = [...col.children]; const keys = cards.map((c) => c.dataset.lcsWord);
      for (const i of [1, 0, 3, 2, 5, 4]) col.appendChild(tiles.find((x) => x.dataset.lcsPic === keys[i]));
    }, /position tell: 6 partners stand one row away/);
    await facePoison('PR7 F4 six words with six different initials', 'G2-387', () => {
      const pool = [['animals/cat', 'cat'], ['animals/duck', 'duck'], ['animals/fish', 'fish'], ['animals/owl', 'owl'], ['animals/pig', 'pig'], ['fruits/lemon', 'lemon']];
      const cards = [...document.querySelectorAll('.cw-card')], tiles = [...document.querySelectorAll('.ws-match-col')[1].children];
      const oldKeys = cards.map((c) => c.dataset.lcsWord);
      const map = Object.fromEntries(oldKeys.map((k, i) => [k, pool[i]]));
      cards.forEach((c) => { const [k, w] = map[c.dataset.lcsWord]; c.dataset.lcsWord = k; c.querySelector('[data-lcs-cursive]').textContent = w; });
      tiles.forEach((t) => { t.dataset.lcsPic = map[t.dataset.lcsPic][0]; });
    }, /clash: 0 same-initial pairs/);
    await facePoison('PR21 F5 words squeezed together (word-spacing back to 0 and a tight kern)', 'G3-401', () => {
      document.querySelector('[data-lcs-kind="sentence"]').style.wordSpacing = '-0.12em';
    }, /stand [0-9.]+ px apart/);
    await facePoison('PR9 F5 the grey model under all three sentences', 'G3-401', () => {
      const first = document.querySelector('.cw-block[data-lcs-block="0"] .cw-row[data-lcs-row="A"] .cw-chains');
      [...document.querySelectorAll('.cw-block')].slice(1).forEach((b) => {
        const row = b.querySelector('.cw-row[data-lcs-row="A"]'); const run = first.cloneNode(true);
        run.querySelector('[data-lcs-cursive]').textContent = b.dataset.lcsSentence; row.appendChild(run);
      });
    }, /grey models \(modelUnder first\)/);
    await facePoison('PR14 F1 a name that does not start with its capital', 'G2-384', () => {
      const b = document.querySelector('.cw-block[data-lcs-block="1"]'); b.dataset.lcsName = 'Mia'; b.querySelector('[data-lcs-kind="name"]').textContent = 'Mia';
    }, /is not a bank name starting with/);
    await facePoison('PR15 F2 a pair that is not in its word', 'G2-385', () => {
      const b = document.querySelector('.cw-block[data-lcs-block="0"]'); b.dataset.lcsWord = 'bread'; b.querySelector('[data-lcs-kind="word"]').textContent = 'bread';
    }, /does not contain|is not a bank join/);
    await facePoison('PR16 F3 a picture that is not its word', 'G2-386', () => {
      const tiles = document.querySelectorAll('.cw-pic'); const a = tiles[0].dataset.lcsPic; tiles[0].dataset.lcsPic = tiles[1].dataset.lcsPic; tiles[1].dataset.lcsPic = a;
    }, /the picture tile is/);
    await facePoison('PR17 F5 the grey model differs from the printed sentence', 'G3-401', () => {
      document.querySelector('[data-lcs-kind="sentence"]').textContent = 'Tom has a toy.';
    }, /≠ the printed sentence/);
    await facePoison('PR18 F1 the practice lines removed (SPARSE)', 'G2-384', () => {
      const s = document.createElement('style'); s.textContent = '.cw-practice{display:none!important}[data-lcs-gap]{flex-grow:0!important}.cw-block{flex-grow:0!important}'; document.head.appendChild(s);
    }, /SPARSE: \d+ px blank under/);
    // apparatus poison: an F4 instruction naming grey traces the reading page does not have
    {
      const file = path.join(OUT, 'G2-377-poison-PR19.html');
      fs.writeFileSync(file, faceHtml['G2-387'], 'utf8');
      await page.goto(url.pathToFileURL(file).href, { waitUntil: 'networkidle0' });
      const bad = 'Trace the grey words and draw a line to each picture.';
      await page.evaluate((t) => { document.querySelector('[data-lcs-instruction]').textContent = t; }, bad);
      const app = await apparatusFails(bad);
      ok(app.includes('grey traces'), 'POISON SILENT PR19 an F4 instruction naming grey traces');
      if (app.length) console.log(`poison killed PR19 an instruction naming apparatus not on the page → ${app.join(', ')}`);
    }
    // bank poisons on the face data
    bankPoison('P19 a two-sentence instruction (the old G2-386)', 'en', EN, (b) => { b.strings['G2-386'].instruction = 'Trace each grey word, then write it. Add the dots and crosses last.'; }, 7, /more than one sentence/);
    bankPoison('P20 copy before trace (the old G3-401, as one sentence)', 'en', EN, (b) => { b.strings['G3-401'].instruction = 'Copy each printed sentence in cursive on the two lines below it, tracing the grey sentence first.'; }, 7, /copies before it traces/);
    bankPoison('P21 de "ohne abzusetzen" over capitalised nouns', 'de', Object.assign({}, DE_PROBE, { words: { 'animals/cat': 'Katze' } }), (b) => { b.strings = { 'G2-386': { title: 'Wörter', instruction: 'Spure jedes graue Wort ohne abzusetzen nach und schreibe es.' } }; }, 7, /lifts the pen \(a capital start\)/);
    bankPoison('P22 no "uten å løfte" over a word with a lift letter', 'no', NO, (b) => { b.words = { 'animals/fish': 'fisk' }; b.strings = { 'G2-386': { title: 'Ord', instruction: 'Skriv over hvert grå ord uten å løfte blyanten.' } }; }, 7, /lifts the pen \(a lift letter\)/);
    bankPoison('P18 an F3 word over 8 letters', 'en', EN, (b) => { b.words['toys/robot'] = 'robotrobot'; }, 5, /> 8 letters/);
    // build refusals on the faces
    throws(() => TYPE._buildWith(Object.assign({}, EN, { words: { 'toys/kite': 'kite', 'weather/sun': 'sun', 'animals/cat': 'cat', 'animals/owl': 'owl' } }), loadType('G2-386').difficulty[2], { locale: 'en' }, { rng: makeRng('x') }), /no 4-word set|fewer than/, 'F3 with no dot / join word set');
    throws(() => TYPE._buildWith(Object.assign({}, EN, { refusedFaces: { capitals: 'no cursive capitals taught (panel)' } }), loadType('G2-384').difficulty[2], { locale: 'en' }, { rng: makeRng('x') }), /refused/, 'a face the locale refuses');
  } finally {
    await browser.close();
  }

  for (const f of fails) console.log('FAIL ' + f);
  console.log(`\nverify-b6-cursive-writing: ${assertions} assertions, ${fails.length} failure(s)${QUICK ? ' (--quick)' : ''}`);
  console.log(fails.length ? `FAIL (${assertions} assertions, ${fails.length} failure(s))` : `PASS (${assertions} assertions, ${poisons.killed}/${poisons.total} poisons killed)`);
  console.log('PNGs:\n  ' + pngs.join('\n  '));
  process.exitCode = fails.length ? 1 : 0;
}

if (require.main === module) main().catch((e) => { console.error(e.stack || e.message); process.exit(1); });

module.exports = { validateBank, renderRules, PROBES, probeBlock };
