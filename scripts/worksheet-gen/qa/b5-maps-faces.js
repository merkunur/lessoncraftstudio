/**
 * b5-maps-faces.js — the G1-379 `maps` FACE gate (nt10-E Phase E; design
 * docs/worksheet-gen/b5-designs/G1-379-maps.md §3 + §5; record _work/G1-379-faces.md).
 * Called by qa/verify-b5-maps.js after the base gate (one browser, one assertion counter,
 * one poison log): `faceGate({ page, ok, judge, fails, log, validateBank, quick })`.
 *
 *   F1 K-377 top-view · F2 G2-369 compass-rose · F3 G2-370 continents ·
 *   F4 G3-396 continents-oceans · F5 G2-371 directions-on-map
 *
 * A. STRINGS — every face's i18n.en === the bank's strings[layout] (the row and the bank are one
 *    source); each face declares its own band (K / G2 / G3); i18n/strings.en.json carries each face;
 *    no face row carries a gate-only force* seam; an authored-but-refused layout THROWS; an
 *    unauthored locale REFUSES every face.
 * B. NODE SWEEP — 400 seeds per face through the GATE'S OWN checks on the composer output (never
 *    the spec's helpers): F1 class limits + derangement + not reversed + no constant offset, and
 *    the pooled partner-position matrix (no cell > 40 %); F2 rotation multiset, the upright roses
 *    never one column / row, given letters cover N E S W and never periodic, the pooled upright
 *    and given-box positions; F3 the bank never numeral order / reversed / alphabetical, the
 *    pooled bank position of each number; F4 numbering never land-then-sea, the index never a
 *    run of 3 kinds, never numeral order / alphabetical, rank correlation index↔numeral near 0;
 *    F5 the <= 30° / >= 90° bearing rule re-derived from the slot coordinates with the gate's own
 *    bearing code, 6 distinct starts, 4 directions, tree + bush never both chips, >= 72 px apart,
 *    the pooled correct-chip position 20..47 % each. Locale-neutral: the de synthetic bank draws
 *    the same F1 / F2 / F5 page and the same F3 / F4 numbering.
 * C. RENDER — each face through the REAL pipeline at its own en chrome, a one-line chrome (814), the
 *    722 fixture and the 677 fixture: verify() empty, qa/lints.js clean (verify() carries the
 *    floors, SPARSE, OVERLAP, footer), FILL — the last block's bottom >= 85 % of the body at 814
 *    and inside the body at 677; the world map is the gated geometry (hash); per-PAGE tells on the
 *    SHIPPED instance printed. SWEEP 20 seeds (--quick 5) per face: verify-clean, distinct pages.
 *    Greyscale PNGs out/dev/<id>-null-d2-en-grey.png for the human read.
 * D. POISON — each must FAIL for its OWN reason; the untouched face is the control:
 *    PR5 F1 cup + bucket · PR7 F2 a turned rose with the coral marker · PR8 F2 an upright rose whose
 *    right box carries S · PR11 F3 a continent disc on water · PR12 F4 the Arctic disc in the polar
 *    band without its leader · PR13 F3 bank = numeral order · PR14 F4 index land-then-sea · PR15 F5
 *    a wrong chip 30..90° off · PR16 F5 a reused start · SP1-5 a 150 px band (SPARSE) · FL1-5 every
 *    band closed at 814 (FILL) · AT1-5 the answer tells (F1 constant offset, F2 upright in one
 *    column, F3 alphabetical bank, F4 numeral-order index, F5 correct chip always first) · AP1-5 an
 *    instruction naming apparatus the face does not print · P11b an en title with "compass".
 *    (PR6 — the house's top view ≠ mapSymbol('house') — is killed by verify-top-side-view in
 *    section 0: the faces draw that primitive unchanged.)
 */
'use strict';
/** the probe for 'an unauthored locale refuses': the first locale no panel has applied yet (sv was the probe until its panel landed) */
const UNAUTH = ['fi', 'no', 'da', 'sv', 'nl', 'it', 'fr', 'es', 'pt', 'de'].find((l) => !Object.keys(require('../lib/b5-common.js').bankModule('maps')).includes(l)) || 'xx';
const path = require('path');
const fs = require('fs');
const { renderInstance } = require('../render/render-instance.js');
const { makeRng, instanceSeed } = require('../lib/rng.js');
const { loadType } = require('../lib/load-types.js');
const bankMod = require('../data/b5/maps.js');
const { WORLD_MAP } = require('../data/b5/world-map.js');
const ISL = require('../data/b5/island.js').ISLE_1;
const ROWS = require('../tools/b5var-rows/maps.js').ROWS;

const FACES = [
  { id: 'K-377', layout: 'top-view', band: 'K' },
  { id: 'G2-369', layout: 'compass-rose', band: 'G2' },
  { id: 'G2-370', layout: 'continents', band: 'G2' },
  { id: 'G3-396', layout: 'continents-oceans', band: 'G3' },
  { id: 'G2-371', layout: 'directions-on-map', band: 'G2' },
];
const FILL_MIN = 0.85;
const OUT = path.join(__dirname, '..', 'out', 'dev', 'G1-379-gate');
const DEV = path.join(__dirname, '..', 'out', 'dev');
const CHROME = {
  one: { title: 'Maps', instruction: 'Look.', body: 814 },
  de722: { title: 'Karten lesen: Kartenzeichen, Legende und Himmelsrichtungen auf der Insel', instruction: 'Schau dir die Legende an. Finde jedes Ding auf der Karte der Insel, zähle, wie viele es sind, und schreibe die Zahl in das Kästchen darunter.', body: 722 },
  fi677: { title: 'Karttamerkit ja kartan selitykset: saaren kartan merkit, tiet, joet, sillat, polut ja lammet tarkasti luettuina ja laskettuina', instruction: 'Katso kartan selitystä. Etsi jokainen asia saaren kartalta, laske ne ja kirjoita lukumäärä sen alla olevaan laatikkoon huolellisesti.', body: 677 },
};

/* ---- the gate's OWN ground truth (never the spec's helpers) ---- */
const DV = { n: [0, -1], e: [1, 0], s: [0, 1], w: [-1, 0] };
function off(a, b, d) { const v = [b[0] - a[0], b[1] - a[1]]; return Math.acos(Math.max(-1, Math.min(1, (v[0] * DV[d][0] + v[1] * DV[d][1]) / Math.hypot(...v)))) * 180 / Math.PI; }
/** F5 (landing review 2026-09-23): the answer (the ONE chip within 30° of the direction, by the gate's own bearings) of
 *  any place on > 2 of the 6 rows, or a MIRROR pair (row j starts at row i's answer and answers row i's start). */
function capMirror(rows, at) {
  const ans = rows.map((r) => { const inn = r.chips.filter((c) => off(at[r.start], at[c], r.dir) <= 30); return inn.length === 1 ? inn[0] : null; });
  const out = [], cnt = {};
  ans.forEach((a) => { if (a) cnt[a] = (cnt[a] || 0) + 1; });
  for (const [a, n] of Object.entries(cnt)) if (n > 2) out.push(`cap ${a} x${n}`);
  for (let i = 0; i < rows.length; i++) for (let j = i + 1; j < rows.length; j++) if (ans[i] && ans[j] && rows[i].start === ans[j] && rows[j].start === ans[i]) out.push(`mirror ${i + 1}/${j + 1}`);
  return out;
}
function periodic(s) { for (let p = 1; p <= s.length / 2; p++) if (s.every((x, i) => i + p >= s.length || s[i + p] === x)) return true; return false; }
function shifted(a, b) { for (let k = 1; k < a.length; k++) if (a.every((x, i) => b[(i + k) % a.length] === x)) return true; return false; }
function runOf(seq) { let m = 0, r = 0; seq.forEach((x, i) => { r = i && x === seq[i - 1] ? r + 1 : 1; m = Math.max(m, r); }); return m; }
function rankR(xs) { const n = xs.length, m = (n - 1) / 2; let a = 0, b = 0, c = 0; xs.forEach((x, i) => { a += (x - m) * (i - m); b += (x - m) ** 2; c += (i - m) ** 2; }); return a / Math.sqrt(b * c); }
const posOf = (rot, dir) => [0, 1, 2, 3].find((p) => ['n', 'e', 's', 'w'][((p - rot / 90) % 4 + 4) % 4] === dir);

function syntheticDe(en) {
  return { ...en, keyTitle: 'Legende',
    symbolWords: { house: 'Haus', tree: 'Baum', bush: 'Strauch', pond: 'Teich', bench: 'Bank', tent: 'Zelt', flowerBed: 'Blumenbeet', bridge: 'Brücke' },
    dirWords: { n: 'Norden', e: 'Osten', s: 'Süden', w: 'Westen' }, dirLetters: { n: 'N', e: 'O', s: 'S', w: 'W' },
    continentNames: { northAmerica: 'Nordamerika', southAmerica: 'Südamerika', europe: 'Europa', asia: 'Asien', africa: 'Afrika', oceania: 'Ozeanien', antarctica: 'Antarktis' },
    oceanNames: { pacific: 'Pazifik', atlantic: 'Atlantik', indian: 'Indischer Ozean', arctic: 'Nordpolarmeer', southern: 'Südpolarmeer' } };
}

async function faceGate({ page, ok, judge, fails, log, validateBank, quick }) {
  const en = bankMod.MAPS_LOC.en;
  const types = Object.fromEntries(FACES.map((f) => [f.id, loadType(f.id)]));
  const seedOf = (id, s) => makeRng(instanceSeed({ typeId: id, theme: null, difficulty: 2, seedEpoch: s }));
  const build = (T, block, extra, s, loc = 'en') => T._buildWith(block, { ...T.difficulty[2], ...(extra || {}) }, { locale: loc }, { rng: seedOf(T.id, s) });

  /* ---------------- A. strings ---------------- */
  let stringsEn = {};
  try { stringsEn = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'i18n', 'strings.en.json'), 'utf8')); } catch (e) { /* reported below */ }
  for (const f of FACES) {
    const T = types[f.id], s = en.strings[f.layout];
    ok(T.i18n.en.title === s.title && T.i18n.en.instruction === s.instruction, `${f.id}: i18n.en ≠ bank strings.${f.layout}`);
    ok(T.gradeBand === f.band, `${f.id}: gradeBand ${T.gradeBand} ≠ ${f.band}`);
    ok(T.difficulty[2].layout === f.layout, `${f.id}: layout ${T.difficulty[2].layout} ≠ ${f.layout}`);
    ok(stringsEn[f.id] && stringsEn[f.id].title === s.title, `${f.id}: i18n/strings.en.json does not carry the face (run node i18n/build-en.js)`);
    let m = null; try { build(T, { ...en, refuse: [f.layout] }, {}, 1); } catch (e) { m = e.message; }
    ok(m && /refuses the/.test(m), `${f.id}: a bank refusing ${f.layout} must THROW (got ${m})`);
    m = null; try { T.build({ difficulty: 2, locale: UNAUTH }, { rng: seedOf(f.id, 1) }); } catch (e) { m = e.message; }
    ok(m && new RegExp('no ' + UNAUTH + ' block|refuse').test(m), `${f.id}: an unauthored ${UNAUTH} must REFUSE (got ${m})`);
  }
  for (const r of ROWS) ok(!Object.keys(r[5]).some((k) => /^force/.test(k)), `${r[1]}: a shipped row carries a gate-only force* seam`);

  /* ---------------- B. node sweep + tells ---------------- */
  const N = 400, de = syntheticDe(en);
  {
    const T = types['K-377'], cell = {}; let bad = 0, neutral = 0;
    for (let s = 1; s <= N; s++) {
      const m = build(T, en, {}, s).meta, m2 = build(T, de, {}, s, 'de').meta;
      if (JSON.stringify([m.left, m.right]) !== JSON.stringify([m2.left, m2.right])) neutral++;
      const L = m.left, R = m.right;
      const cls = {}; for (const k of L) { const c = bankMod.MAPS.TOPSIDE[k].cls; cls[c] = (cls[c] || 0) + 1; }
      if (Object.values(cls).some((n) => n > 2) || (L.includes('cup') && L.includes('bucket')) || (L.includes('rectTable') && L.includes('bed'))) bad++;
      if (Object.values(cls).sort().join() !== '1,2,2') bad++;
      if (L.some((x, i) => R[i] === x) || R.join() === L.slice().reverse().join() || shifted(L, R)) bad++;
      L.forEach((x, i) => { const k = i + '>' + R.indexOf(x); cell[k] = (cell[k] || 0) + 1; });
    }
    const mx = Math.max(...Object.values(cell)) / N;
    ok(!bad, `F1 sweep: ${bad} pages break the class / order rules`); ok(!neutral, `F1: ${neutral} draws not locale-neutral`);
    ok(mx <= 0.4, `F1: a partner-position cell holds ${(mx * 100).toFixed(0)} % of pages (> 40 %)`);
    log.push(`  tells F1 (${N} pages): max partner-position cell ${(mx * 100).toFixed(0)} % (a row's partner is one of 4 other rows: uniform 25 %) · rule breaks ${bad} · non-neutral ${neutral}`);
  }
  {
    const T = types['G2-369'], upAt = new Array(6).fill(0), gpos = [0, 0, 0, 0]; let bad = 0, neutral = 0;
    for (let s = 1; s <= N; s++) {
      const m = build(T, en, {}, s).meta, m2 = build(T, de, {}, s, 'de').meta;
      if (JSON.stringify([m.rots, m.given]) !== JSON.stringify([m2.rots, m2.given])) neutral++;
      if (m.rots.slice().sort((a, b) => a - b).join() !== '0,0,0,90,180,270') bad++;
      const up = m.rots.map((r, i) => (r === 0 ? i : -1)).filter((i) => i >= 0);
      if (new Set(up.map((i) => i % 2)).size < 2 || new Set(up.map((i) => Math.floor(i / 2))).size < 2) bad++;
      if (new Set(m.given).size < 3 || m.given.includes('n') || periodic(m.given)) bad++;
      const gp = m.given.map((g, i) => posOf(m.rots[i], g));
      if (new Set(gp).size < 2) bad++;
      up.forEach((i) => upAt[i]++); gp.forEach((p) => gpos[p]++);
    }
    ok(!bad, `F2 sweep: ${bad} breaks`); ok(!neutral, `F2: ${neutral} draws not locale-neutral`);
    ok(upAt.every((c) => c / N >= 0.3 && c / N <= 0.7), `F2: upright-rose card positions not near-uniform [${upAt.map((c) => (c / N * 100).toFixed(0) + '%')}]`);
    // the upright roses give E / S / W by design (never N: the coral marker already shows north), so the TOP box is given
    // only by a turned rose — a structural rarity, not a tell (the answer is the three blanks). Every position must occur.
    ok(gpos.every((c) => c / (6 * N) >= 0.05), `F2: a given-box position never occurs [${gpos.map((c) => (c / N / 6 * 100).toFixed(0) + '%')}]`);
    log.push(`  tells F2 (${N} pages): upright roses by card ${upAt.map((c) => (c / N * 100).toFixed(0) + '%').join('/')} (3 of 6 = 50 %) · given box up/right/down/left ${gpos.map((c) => (c / N / 6 * 100).toFixed(0) + '%').join('/')} · breaks ${bad} · non-neutral ${neutral}`);
  }
  for (const id of ['G2-370', 'G3-396']) {
    const T = types[id], F3 = id === 'G2-370';
    const coll = new Intl.Collator('en');
    let bad = 0, numNeutral = 0, rsum = 0; const firstAt = {};
    for (let s = 1; s <= N; s++) {
      const m = build(T, en, {}, s).meta, m2 = build(T, de, {}, s, 'de').meta;
      if (JSON.stringify(m.numbers) !== JSON.stringify(m2.numbers)) numNeutral++;
      const byNum = Object.keys(m.numbers).sort((a, b) => m.numbers[a] - m.numbers[b]);
      const order = F3 ? m.bank : m.index;
      const alpha = order.slice().sort((a, b) => coll.compare(m.names[a], m.names[b]));
      if (order.join() === byNum.join() || order.join() === alpha.join() || (F3 && order.join() === byNum.slice().reverse().join())) bad++;
      if (!F3) {
        const kind = (x) => (bankMod.MAPS.OCEAN_IDS.includes(x) ? 'sea' : 'land');
        const nk = byNum.map(kind);
        if (nk.lastIndexOf('land') < nk.indexOf('sea') || nk.lastIndexOf('sea') < nk.indexOf('land')) bad++;
        if (runOf(order.map(kind)) > 2) bad++;
      }
      rsum += rankR(order.map((x) => m.numbers[x]));
      const p = order.indexOf(byNum[0]); firstAt[p] = (firstAt[p] || 0) + 1;
    }
    const mx = Math.max(...Object.values(firstAt)) / N, r = rsum / N;
    ok(!bad, `${id} sweep: ${bad} breaks`); ok(!numNeutral, `${id}: ${numNeutral} numberings not locale-neutral`);
    ok(mx <= 0.4 && Math.abs(r) <= 0.3, `${id}: tell — number 1 sits at one ${F3 ? 'bank' : 'index'} position on ${(mx * 100).toFixed(0)} % of pages, rank r ${r.toFixed(2)}`);
    log.push(`  tells ${id} (${N} pages): number 1's ${F3 ? 'bank' : 'index'} position max ${(mx * 100).toFixed(0)} % · ${F3 ? 'bank' : 'index'}↔numeral rank r ${r.toFixed(3)} · breaks ${bad} · numbering non-neutral ${numNeutral}`);
  }
  {
    const T = types['G2-371'], cnt = [0, 0, 0]; let bad = 0, neutral = 0, capBad = 0;
    const scale = 533 / ISL.view.w;
    for (let s = 1; s <= N; s++) {
      const m = build(T, en, {}, s).meta, m2 = build(T, de, {}, s, 'de').meta;
      if (JSON.stringify([m.places, m.rows]) !== JSON.stringify([m2.places, m2.rows])) neutral++;
      const at = Object.fromEntries(m.places.map((p) => [p.id, [p.x, p.y]]));
      const ids = Object.keys(at);
      for (let i = 0; i < ids.length; i++) for (let j = i + 1; j < ids.length; j++) if (Math.hypot(at[ids[i]][0] - at[ids[j]][0], at[ids[i]][1] - at[ids[j]][1]) * scale < 72) bad++;
      if (new Set(m.rows.map((r) => r.start)).size !== 6 || new Set(m.rows.map((r) => r.dir)).size !== 4) bad++;
      for (const r of m.rows) {
        const offs = r.chips.map((c) => off(at[r.start], at[c], r.dir));
        if (offs.filter((o) => o <= 30).length !== 1 || offs[r.chips.indexOf(r.answer)] > 30 || offs.some((o) => o > 30 && o < 90)) bad++;
        if (r.chips.includes('tree') && r.chips.includes('bush')) bad++;
        cnt[r.chips.indexOf(r.answer)]++;
      }
      const seq = m.rows.map((r) => r.chips.indexOf(r.answer));
      if (new Set(seq).size < 2 || periodic(seq)) bad++;
      const cm = capMirror(m.rows, at), cm2 = capMirror(m2.rows, Object.fromEntries(m2.places.map((p) => [p.id, [p.x, p.y]])));
      if (cm.length) { capBad++; if (s === 1) ok(false, `F5 SHIPPED page (epoch 1): ${cm.join(', ')}`); }
      if (cm2.length) capBad++;
    }
    ok(!capBad, `F5 sweep: ${capBad} of ${2 * N} pages (en + de, epochs 1..${N}, epoch 1 = shipped) break the answer cap / mirror rule`);
    const sh = cnt.map((c) => c / (6 * N));
    ok(!bad, `F5 sweep: ${bad} breaks of the bearing / start / spacing rules`); ok(!neutral, `F5: ${neutral} draws not locale-neutral`);
    ok(sh.every((x) => x >= 0.2 && x <= 0.47), `F5: correct-chip position shares [${sh.map((x) => (x * 100).toFixed(0) + '%')}]`);
    log.push(`  tells F5 (${N} pages): correct chip at position 1/2/3 ${sh.map((x) => (x * 100).toFixed(0) + '%').join('/')} · breaks ${bad} · non-neutral ${neutral}`);
  }

  /* ---------------- C. renders ---------------- */
  const render = async (T, { name, strings, seedEpoch } = {}) => {
    const out = await renderInstance({ type: T, theme: null, difficulty: 2, locale: 'en', page, outDir: OUT, baseName: `G1-379-face-${name}`, strings: strings || T.i18n.en, seedEpoch });
    const m = await page.evaluate(() => {
      const root = document.querySelector('[data-lcs-type="maps"]'), body = document.querySelector('.ws-body');
      if (!root || !body) return null;
      const bl = [...root.children].filter((c) => !c.hasAttribute('data-lcs-gap'));
      // F5 (landing round 1): the rows + legend sit in one [data-lcs-dir-body] block that fills the body — the content
      // ends where the last ROW / the legend ends, never at the block edge
      const inner = [...root.querySelectorAll('[data-lcs-dir-rows] > [data-lcs-dir-row], [data-lcs-dir-legend]')];
      const b = body.getBoundingClientRect(), last = inner.length ? inner.reduce((m, e) => { const r = e.getBoundingClientRect(); return r.bottom > m.bottom ? r : m; }, inner[0].getBoundingClientRect()) : bl[bl.length - 1].getBoundingClientRect();
      const svg = root.querySelector('svg[data-lcs-prim="world-map"]');
      return { body: b.height, fill: (last.bottom - b.top) / b.height, inside: last.bottom <= b.bottom + 0.6, hash: svg ? svg.dataset.lcsHash : null,
        stamps: [...root.attributes].filter((a) => a.name.startsWith('data-lcs-')).map((a) => a.value).join('|') };
    });
    return { verify: out.qa.verify, lints: out.qa.lints, m, out };
  };
  for (const f of FACES) {
    const T = types[f.id];
    const own = await render(T, { name: f.id + '-own' });
    ok(!own.verify.length && !own.lints.length, `${f.id} own chrome: verify ${JSON.stringify(own.verify.slice(0, 3))} lints ${JSON.stringify(own.lints.slice(0, 2))}`);
    if (/continents/.test(f.layout)) ok(own.m.hash === WORLD_MAP.hash, `${f.id}: the map is not the gated geometry (hash ${own.m.hash})`);
    // greyscale for the human read
    await page.evaluate(() => { document.documentElement.style.filter = 'grayscale(1)'; });
    const pageEl = await page.$('[data-lcs-page]'); await pageEl.screenshot({ path: path.join(DEV, `${f.id}-null-d2-en-grey.png`) });
    await page.evaluate(() => { document.documentElement.style.filter = ''; });
    const line = [`render ${f.id} (${f.layout}): own body ${own.m.body.toFixed(0)} fill ${(own.m.fill * 100).toFixed(0)}%`];
    for (const [k, c] of Object.entries(CHROME)) {
      const r = await render(T, { name: `${f.id}-${k}`, strings: c });
      ok(!r.verify.length && !r.lints.length, `${f.id} ${k}: verify ${JSON.stringify(r.verify.slice(0, 3))} lints ${JSON.stringify(r.lints.slice(0, 2))}`);
      ok(r.m && (k === 'one' ? Math.abs(r.m.body - c.body) <= 12 : r.m.body <= c.body + 0.6), `${f.id} ${k}: body ${r.m && r.m.body.toFixed(0)} — the fixture is not the ${c.body} chrome`);
      ok(r.m.inside, `${f.id} ${k}: the face overflows the body`);
      if (k === 'one') ok(r.m.fill >= FILL_MIN, `${f.id} FILL — content ends at ${(r.m.fill * 100).toFixed(0)} % of the 814 body (< ${FILL_MIN * 100} %)`);
      line.push(`${k} body ${r.m.body.toFixed(0)} fill ${(r.m.fill * 100).toFixed(0)}%`);
    }
    // sweep
    const pages = new Set();
    const n = quick ? 5 : 20;
    for (let s = 1; s <= n; s++) {
      const r = await render(T, { name: `${f.id}-sweep-${s}`, seedEpoch: s });
      ok(!r.verify.length && !r.lints.length, `${f.id} sweep ${s}: verify ${JSON.stringify(r.verify.slice(0, 3))} lints ${r.lints.length}`);
      pages.add(r.m.stamps + '#' + JSON.stringify(r.out.meta.rows || r.out.meta.places || ''));
    }
    ok(pages.size === n, `${f.id} sweep: ${pages.size} distinct pages of ${n}`);
    line.push(`sweep ${pages.size}/${n} distinct`);
    console.log(line.join(' · '));
  }
  // C2. the locale SET is data (5..7 members, a merged America, Antarctica optional; 3..5 oceans): the two
  // extreme shapes a panel may author render verify-clean, fit the 677 body and FILL the 814 one
  {
    const cn = (o) => ({ ...JSON.parse(JSON.stringify(en)), ...o });
    const SETS = {
      'five-no-antarctica': cn({ continentSet: [{ id: 'america', regions: ['northAmerica', 'southAmerica'] }, { id: 'europe', regions: ['europe'] }, { id: 'asia', regions: ['asia'] }, { id: 'africa', regions: ['africa'] }, { id: 'oceania', regions: ['oceania'] }],
        continentNames: { america: 'America', europe: 'Europe', asia: 'Asia', africa: 'Africa', oceania: 'Oceania' }, oceanSet: ['pacific', 'atlantic', 'indian'], oceanNames: { pacific: 'Pacific', atlantic: 'Atlantic', indian: 'Indian' } }),
      'six-merged-america': cn({ continentSet: [{ id: 'america', regions: ['northAmerica', 'southAmerica'] }, { id: 'europe', regions: ['europe'] }, { id: 'asia', regions: ['asia'] }, { id: 'africa', regions: ['africa'] }, { id: 'oceania', regions: ['oceania'] }, { id: 'antarctica', regions: ['antarctica'] }],
        continentNames: { america: 'America', europe: 'Europe', asia: 'Asia', africa: 'Africa', oceania: 'Oceania', antarctica: 'Antarctica' } }),
    };
    const withBank = (T, block) => ({ ...T, build(o, ctx) { return this._buildWith(block, T.difficulty[2], { locale: 'en' }, ctx); } });
    for (const id of ['G2-370', 'G3-396']) for (const [nm, block] of Object.entries(SETS)) {
      const line = [];
      for (const k of ['one', 'fi677']) {
        const r = await render(withBank(types[id], block), { name: `${id}-${nm}-${k}`, strings: CHROME[k] });
        // the verify()'s node cross-check reads the REAL en bank, so a synthetic set's own names are reported as
        // "prints X ≠ the bank" — an artefact of the fixture, filtered here and nowhere else
        const vf = r.verify.filter((x) => !/prints "[^"]*" ≠ (continentNames|the bank)/.test(x));
        ok(!vf.length && !r.lints.length, `${id} ${nm} ${k}: verify ${JSON.stringify(vf.slice(0, 3))} lints ${JSON.stringify(r.lints.slice(0, 2))}`);
        ok(r.m.inside, `${id} ${nm} ${k}: overflows the body`);
        if (k === 'one') ok(r.m.fill >= FILL_MIN, `${id} ${nm}: FILL ${(r.m.fill * 100).toFixed(0)} % at 814`);
        line.push(`${k} fill ${(r.m.fill * 100).toFixed(0)}%`);
      }
      log.push(`  set shape ${id} ${nm}: ${line.join(' · ')}`);
    }
  }
  // per-PAGE tells on the SHIPPED instance (seedEpoch 1; the seed carries no locale, so this page ships to all 11)
  {
    const m1 = build(types['K-377'], en, {}, 1).meta, m2 = build(types['G2-369'], en, {}, 1).meta, m3 = build(types['G2-370'], en, {}, 1).meta, m4 = build(types['G3-396'], en, {}, 1).meta, m5 = build(types['G2-371'], en, {}, 1).meta;
    log.push(`  shipped F1: left [${m1.left}] right [${m1.right}] partner offsets [${m1.left.map((x, i) => m1.right.indexOf(x) - i)}]`);
    log.push(`  shipped F2: rotations [${m2.rots}] given [${m2.given}] given box positions [${m2.given.map((g, i) => posOf(m2.rots[i], g))}]`);
    const bn3 = Object.keys(m3.numbers).sort((a, b) => m3.numbers[a] - m3.numbers[b]);
    log.push(`  shipped F3: numbers [${bn3}] bank [${m3.bank}] (bank position of 1..N: ${bn3.map((x) => m3.bank.indexOf(x) + 1)})`);
    const bn4 = Object.keys(m4.numbers).sort((a, b) => m4.numbers[a] - m4.numbers[b]);
    log.push(`  shipped F4: numbered kinds [${bn4.map((x) => (bankMod.MAPS.OCEAN_IDS.includes(x) ? 'S' : 'L')).join('')}] index kinds [${m4.index.map((x) => (bankMod.MAPS.OCEAN_IDS.includes(x) ? 'S' : 'L')).join('')}] index rank r ${rankR(m4.index.map((x) => m4.numbers[x])).toFixed(2)}`);
    log.push(`  shipped F5: starts [${m5.rows.map((r) => r.start)}] dirs [${m5.rows.map((r) => r.dir)}] correct chip positions [${m5.rows.map((r) => r.chips.indexOf(r.answer) + 1)}]`);
  }

  /* ---------------- D. poisons ---------------- */
  const wrap = (T, fn) => ({ ...T, build(o, ctx) { const r = T.build(o, ctx); r.bodyHtml = fn(r.bodyHtml); return r; } });
  const forced = (T, extra) => ({ ...T, build(o, ctx) { return this._buildWith(en, { ...T.difficulty[2], ...extra }, { locale: 'en' }, ctx); } });
  const rp = async (name, T, re, opts = {}) => {
    const r = await render(T, { name: 'poison-' + name.split(' ')[0], ...opts });
    const f = [...r.verify, ...r.lints.map((l) => JSON.stringify(l))];
    if (opts.fillCheck && r.m.fill < FILL_MIN) f.push(`FILL — content ends at ${(r.m.fill * 100).toFixed(0)} % of the 814 body`);
    judge(name, f, re);
    return r;
  };
  const T1 = types['K-377'], T2 = types['G2-369'], T3 = types['G2-370'], T4 = types['G3-396'], T5 = types['G2-371'];
  const p1 = build(T1, en, {}, 1).meta;
  await rp('PR5 F1 cup + bucket on one page', forced(T1, { forceModels: ['cup', 'bucket', 'car', 'cone', 'bed'], forceRight: ['bucket', 'car', 'cone', 'bed', 'cup'] }), /class limit — cup and bucket on one page/);
  // PR7 (landing round 1): a turned rose WITHOUT its coral N marker / PR7b the marker on a kite that does not point north
  await rp('PR7 F2 a turned rose without its N marker', wrap(T2, (h) => h.replace(/(data-lcs-rot="(?:90|180|270)"[^>]*>[\s\S]*?) data-lcs-marker="n"/, '$1')), /lacks the coral N marker/);
  await rp('PR7b F2 the N marker on the up kite of a turned rose', wrap(T2, (h) => h.replace(/(data-lcs-rot="(90|180|270)"[^>]*>)([\s\S]*?)(<\/svg>)/, (m, open, rot, body, close) => open + body.replace(/ data-lcs-marker="n"/, '').replace('data-lcs-kite="0"', 'data-lcs-kite="0" data-lcs-marker="n"') + close)), /the coral marker points to position 0, which is not north/);
  await rp('PR8 F2 an upright rose whose right box carries S', wrap(T2, (h) => h.replace(/(data-lcs-pos="1" data-lcs-dir="e" data-lcs-given=")E(">[\s\S]*?>)E(<\/text>)/, '$1S$2S$3')), /letter from position — the e box carries "S"/);
  await rp('PR11 F3 a continent disc on water', wrap(T3, (h) => h.replace(/(<g data-lcs-marker="africa"[^>]*>[\s\S]*?<\/g>)/, (g) => g.replace(/1050\.1/g, '747.1').replace(/405\.3/g, '408.9'))), /anchor rule/);
  await rp('PR12 F4 the Arctic disc in the polar band without a leader', wrap(T4, (h) => h.replace(/<g data-lcs-leader="arctic">[\s\S]*?<\/g>/, '').replace(/(<g data-lcs-marker="arctic"[^>]*?) data-lcs-via-leader="">([\s\S]*?<\/g>)/, (m, a, b) => `${a} data-lcs-ocean="arctic">` + b.replace(/145\.7/g, '353.3').replace(/65\.7/g, '30.8'))), /arctic is on land or within 6 px|ocean arctic has no corner leader/);
  {
    const m = build(T3, en, {}, 1).meta, byNum = Object.keys(m.numbers).sort((a, b) => m.numbers[a] - m.numbers[b]);
    await rp('PR13 F3 bank order = numeral order', forced(T3, { forceBank: byNum }), /the bank order equals the numeral order/, { seedEpoch: 1 });
    await rp('AT3 F3 an alphabetical bank', forced(T3, { forceBank: m.alpha }), /the bank order is alphabetical/, { seedEpoch: 1 });
  }
  {
    const m = build(T4, en, {}, 1).meta, byNum = Object.keys(m.numbers).sort((a, b) => m.numbers[a] - m.numbers[b]);
    const lts = byNum.filter((x) => !bankMod.MAPS.OCEAN_IDS.includes(x)), sts = byNum.filter((x) => bankMod.MAPS.OCEAN_IDS.includes(x));
    await rp('PR14 F4 index grouped land-then-sea', forced(T4, { forceIndex: [...lts, ...sts] }), /the index runs \d+ of one kind in a row/, { seedEpoch: 1 });
    await rp('AT4 F4 index = numeral order', forced(T4, { forceIndex: byNum }), /the index order equals the numeral order/, { seedEpoch: 1 });
  }
  {
    // PR15: find a row + a place 35..85° off its direction that is neither its start nor a chip (own bearing code)
    let hit = null;
    for (let s = 1; s <= 40 && !hit; s++) {
      const m = build(T5, en, {}, s).meta, at = Object.fromEntries(m.places.map((p) => [p.id, [p.x, p.y]]));
      m.rows.forEach((r, i) => { if (hit) return; for (const y of Object.keys(at)) { if (y === r.start || r.chips.includes(y) || ((y === 'tree' || y === 'bush') && (r.chips.includes('tree') || r.chips.includes('bush')))) continue; const o = off(at[r.start], at[y], r.dir); if (o > 35 && o < 85) { const rows = JSON.parse(JSON.stringify(m.rows)); const w = rows[i].chips.findIndex((c) => c !== r.answer); rows[i].chips[w] = y; hit = { s, rows, o }; return; } } });
    }
    ok(!!hit, 'PR15: no 35..85° place found to plant');
    if (hit) await rp(`PR15 F5 a wrong chip ${hit.o.toFixed(0)}° off its direction`, forced(T5, { forceRows: hit.rows }), /bearing rule — row \d+: chip \w+ lies \d+° off/, { seedEpoch: hit.s });
    const m = build(T5, en, {}, 1).meta;
    const rows = JSON.parse(JSON.stringify(m.rows)); rows[1].start = rows[0].start;
    await rp('PR16 F5 a reused start', forced(T5, { forceRows: rows }), /the rows reuse a start/, { seedEpoch: 1 });
    const rows2 = JSON.parse(JSON.stringify(m.rows)); for (const r of rows2) r.chips = [r.answer, ...r.chips.filter((c) => c !== r.answer)];
    // CAP / MIRROR poisons, planted on real island geometry by the gate's own bearings (both ways: the shipped page is the control)
    {
      const OPP = { n: 's', s: 'n', e: 'w', w: 'e' };
      const tb = (cs) => cs.includes('tree') && cs.includes('bush');
      let capHit = null, mirHit = null;
      for (let sd = 1; sd <= 240 && (!capHit || !mirHit); sd++) {
        const mm = build(T5, en, {}, sd).meta, at = Object.fromEntries(mm.places.map((p) => [p.id, [p.x, p.y]]));
        if (!capHit) for (const y of Object.keys(at)) {
          const rows = JSON.parse(JSON.stringify(mm.rows)); let n = rows.filter((r) => r.answer === y).length;
          for (const r of rows) { if (n >= 3) break; if (r.answer === y || r.start === y || r.chips.includes(y) || off(at[r.start], at[y], r.dir) > 30) continue; const cs = r.chips.map((c) => (c === r.answer ? y : c)); if (tb(cs)) continue; r.chips = cs; r.answer = y; n++; }
          if (n >= 3 && !capMirror(rows, at).some((x) => /mirror/.test(x))) { capHit = { s: sd, rows }; break; }
        }
        if (!mirHit) for (let i = 0; i < mm.rows.length && !mirHit; i++) for (let j = 0; j < mm.rows.length && !mirHit; j++) {
          if (i === j) continue; const X = mm.rows[i].start, Y = mm.rows[i].answer, d = OPP[mm.rows[i].dir];
          if (mm.rows.some((r, k) => k !== j && r.start === Y)) continue;
          const wr = Object.keys(at).filter((z) => z !== Y && z !== X && off(at[Y], at[z], d) >= 90);
          if (wr.length < 2 || off(at[Y], at[X], d) > 30) continue;
          const rows = JSON.parse(JSON.stringify(mm.rows)); const pos = rows[j].chips.indexOf(rows[j].answer);
          const w = wr.slice(0, 2); if (tb([X, ...w])) continue; w.splice(pos, 0, X);
          rows[j] = { ...rows[j], start: Y, dir: d, answer: X, chips: w };
          if (new Set(rows.map((r) => r.dir)).size < 4 || capMirror(rows, at).some((x) => /cap/.test(x))) continue;
          mirHit = { s: sd, rows };
        }
      }
      ok(!!capHit && !!mirHit, `F5 cap/mirror poisons: no plantable page (cap ${!!capHit}, mirror ${!!mirHit})`);
      if (capHit) { ok(capMirror(capHit.rows, Object.fromEntries(build(T5, en, {}, capHit.s).meta.places.map((p) => [p.id, [p.x, p.y]]))).some((x) => /cap/.test(x)), 'poison — the gate own cap check is silent on a 3-answer page'); await rp('PR18 F5 one place answers 3 of 6 rows', forced(T5, { forceRows: capHit.rows }), /answer cap — \w+ is the answer in 3 of 6 rows/, { seedEpoch: capHit.s }); }
      if (mirHit) { ok(capMirror(mirHit.rows, Object.fromEntries(build(T5, en, {}, mirHit.s).meta.places.map((p) => [p.id, [p.x, p.y]]))).some((x) => /mirror/.test(x)), 'poison — the gate own mirror check is silent on a mirror pair'); await rp('PR19 F5 a mirror pair of rows', forced(T5, { forceRows: mirHit.rows }), /mirror pair — rows \d+ and \d+ swap start and answer/, { seedEpoch: mirHit.s }); }
    }
    await rp('AT5 F5 the correct chip always first', forced(T5, { forceRows: rows2 }), /correct chip positions \[0,0,0,0,0,0\] are constant/, { seedEpoch: 1 });
  }
  // UN1 (landing round 1): the directions face without its legend -> every drawn symbol is unnamed; the shipped face is the control
  await rp('UN1 F5 the directions map without its legend', forced(T5, { legend: false }), /unnamed symbol — \w+ is drawn on the island but no legend names it/, { seedEpoch: 1 });
  await rp('UN2 F5 a legend missing the tent', wrap(T5, (h) => h.replace(/<div data-lcs-dir-key="tent"[\s\S]*?<\/span><\/div>/, '')), /unnamed symbol — tent/);
  await rp('AT1 F1 the right column a constant offset of the left', forced(T1, { forceModels: p1.left, forceRight: [...p1.left.slice(2), ...p1.left.slice(0, 2)] }), /shifted by a constant/);
  {
    const m = build(T2, en, {}, 1).meta;
    const rots = [0, 90, 0, 180, 0, 270], given = ['e', 'n', 's', 'w', 'w', 'e'];
    await rp('AT2 F2 the upright roses in one column', forced(T2, { forceRoses: { rots, given, pos: m.pos } }), /the upright roses form one line/);
  }
  // SPARSE both ways (the shipped faces above are the controls: every band <= 40)
  for (const [i, f] of FACES.entries()) {
    await rp(`SP${i + 1} ${f.id} a 150 px band`, wrap(types[f.id], (h) => h.replace('max-height:36px;width:100%', 'width:100%;flex:0 0 150px;min-height:150px;max-height:150px')), /SPARSE/);
    await rp(`FL${i + 1} ${f.id} every band closed at 814`, wrap(types[f.id], (h) => h.split('max-height:36px').join('max-height:0px').replace(/min-height:\d+px;max-height:0px/g, 'min-height:0px;max-height:0px')),
      // F5 (landing round 1): the rows sit beside the legend in one full-height block, so a page closed up high is caught
      // by the band UNDER the last row (> 40 px) before the 85 % FILL line — the same defect, the nearer measure
      f.id === 'G2-371' ? /FILL|SPARSE — \d+ px blank band under the last row/ : /FILL/, { strings: CHROME.one, fillCheck: true });
  }
  // apparatus in the instruction (the en strings are the controls: validateBank(en) is clean)
  const withIns = (layout, ins) => ({ ...JSON.parse(JSON.stringify(en)), strings: { ...JSON.parse(JSON.stringify(en.strings)), [layout]: { ...en.strings[layout], instruction: ins } } });
  judge('AP1 F1 names a map', validateBank(withIns('top-view', 'Each thing is drawn from the side. Draw a line to the same thing on the map.'), 'en'), /strings\.top-view instruction names "map"/);
  judge('AP2 F2 names a line', validateBank(withIns('compass-rose', 'Each compass rose shows one letter. Write the other three letters on the lines.'), 'en'), /strings\.compass-rose instruction names "lines"/);
  judge('AP3 F3 says circle', validateBank(withIns('continents', 'Circle each numbered continent and write its name. Use the names in the box.'), 'en'), /strings\.continents instruction names "Circle"/);
  judge('AP4 F4 names a line', validateBank(withIns('continents-oceans', 'Find each continent and ocean on the map. Write its number on the line next to its name.'), 'en'), /strings\.continents-oceans instruction names "line"/);
  judge('AP5 F5 says write', validateBank(withIns('directions-on-map', 'Find the first picture on the map. Look the way the word says. Write the picture that lies that way.'), 'en'), /strings\.directions-on-map instruction names "Write"/);
  judge('P11b en title "Compass Rose: N, E, S, W"', validateBank({ ...JSON.parse(JSON.stringify(en)), strings: { ...JSON.parse(JSON.stringify(en.strings)), 'compass-rose': { ...en.strings['compass-rose'], title: 'Compass Rose: N, E, S, W' } } }, 'en'), /standalone word "Compass"/);
}

module.exports = { faceGate, FACES };
