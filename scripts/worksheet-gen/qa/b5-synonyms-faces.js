/**
 * b5-synonyms-faces.js — the G2-358 `synonyms` FACE gate (nt10-E Phase E; design
 * docs/worksheet-gen/b5-designs/G2-358-synonyms.md §3 + §5; record _work/G2-358-faces.md).
 * Called by qa/verify-b5-synonyms.js after the base gate (one browser, one assertion counter,
 * one poison log): `faceGate({page, ok, judge, fails, validateBank, CHROME, QUICK, OUT})`.
 *
 *   F1 G1-395 pictures · F2 G2-373 pairs · F3 G1-396 shades · F4 G2-374 say · F5 G3-397 fields
 *
 * A. STRINGS — every face's i18n.en === the bank's strings[mode] (row and bank are one source); the
 *    bands (F1 F3 G1, F2 F4 G2, F5 G3); one config for all three levels; i18n/strings.en.json carries
 *    each face; no face string names a sock (the sock was RETIRED 2026-09-23, lead ruling).
 * B. SWEEP — 20 seeds per face (--quick 5) in node: every page builds, the pages differ, and the
 *    per-face answer tells are measured POOLED in both directions (F1 each slot answers half the cards;
 *    F2 no (left row -> right row) cell over 30 %, the partner never level; F3 each rank in each column
 *    a third; F4 no bank position holds a row's answer; F5 all three splits 4/6 5/5 6/4 occur, no 4-run).
 * C. RENDER — each face through the REAL pipeline at its own en chrome, the one-line chrome (814), the
 *    722 fixture (a 3-line de title + 3-line instruction) and the fi fixture (4-line title, 667). verify()
 *    empty (the in-page re-derivation + floors), qa/lints.js clean, then ITSELF: SPARSE (every blank band
 *    between consecutive blocks, container edge -> first block, last block -> edge, body top -> first
 *    container, last container -> body bottom <= 40 px), OVERLAP, FILL (content bottom >= 85 % of the body
 *    at 814, inside the body at every chrome).
 * D. POISON — each must FAIL for its OWN reason; each untouched face at the poison chromes is the control:
 *      P6 an F1 page with scared + surprised · P10 F3 three rows in the stored order · P15 F2 a second
 *      partner (huge beside big / large) · P16 F4 gap boxes of two widths · PR5 the F4 bubble with a third
 *      pill row (own guard throws) · L4 an F4 sentence forced to 3 lines · FX F2 a partner level with its
 *      word · PW F5 a word printed on a writing row · FG a face spec fed another face's config ·
 *      SP1-SP5 slack moved BETWEEN blocks (one per face) · FL1 F2 content ends high · FL2 F5 content past
 *      the body at 667 · AT1 F1 every answer pair in slots 1+2 · AT2 F2 right column = the reverse ·
 *      AT4 F4 bank in row order · AT5 F5 a 4-run in the pile · AP1-AP5 an instruction naming apparatus
 *      the face does not print.
 */
'use strict';
/** the probe for 'an unauthored locale refuses': the first locale no panel has applied yet (sv was the probe until its panel landed) */
const UNAUTH = ['fi', 'no', 'da', 'sv', 'nl', 'it', 'fr', 'es', 'pt', 'de'].find((l) => !Object.keys(require('../lib/b5-common.js').bankModule('synonyms')).includes(l)) || 'xx';
const path = require('path');
const fs = require('fs');
const { loadType } = require('../lib/load-types.js');
const { makeRng, instanceSeed } = require('../lib/rng.js');
const DATA = require('../data/b5/synonyms.js');
const C5 = require('../templates/components-b5.js');

const FACES = [
  { id: 'G1-395', mode: 'pictures', band: 'G1' },
  { id: 'G2-373', mode: 'pairs', band: 'G2' },
  { id: 'G1-396', mode: 'shades', band: 'G1' },
  { id: 'G2-374', mode: 'say', band: 'G2' },
  { id: 'G3-397', mode: 'fields', band: 'G3' },
];
const SPARSE_MAX = 40;
const FILL_MIN = 0.85;

const unesc = (s) => String(s).replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
const escAttr = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
const rootStamp = (html, name) => JSON.parse(unesc(new RegExp(`data-lcs-${name}="([^"]+)"`).exec(html)[1]));
const setStamp = (html, name, obj) => html.replace(new RegExp(`data-lcs-${name}="[^"]+"`), `data-lcs-${name}="${escAttr(JSON.stringify(obj))}"`);

async function measureRender(page) {
  return page.evaluate(() => {
    const R = (e) => { const b = e.getBoundingClientRect(); return { l: b.left, r: b.right, t: b.top, b: b.bottom, w: b.width, h: b.height }; };
    const root = document.querySelector('[data-lcs-family="synonyms"]');
    const mode = root.getAttribute('data-lcs-face');
    const SEL = {
      pictures: [['section.ws-card', '[data-lcs-picframe], [data-lcs-tag]']],
      pairs: [['[data-lcs-col]', '[data-lcs-match-left], [data-lcs-match-right]']],
      shades: [['[data-lcs-key-wrap]', 'svg[data-lcs-strength-key]'], ['[data-lcs-scale]', '[data-lcs-shade-word], [data-lcs-rank-box], svg[data-lcs-ramp]']],
      say: [['[data-lcs-bank-banner]', '[data-lcs-bank-word], [data-lcs-head]'], ['[data-lcs-say-row]', 'p[data-lcs-sentence], [data-lcs-disc]']],
      fields: [['[data-lcs-pile]', '[data-lcs-bank-word]'], ['[data-lcs-field]', 'svg[data-lcs-fence], [data-lcs-field-sign], [data-lcs-ruling-row] svg']],
    }[mode];
    const FLOW = { pictures: 'section.ws-card', pairs: '[data-lcs-col]', shades: '[data-lcs-key-wrap], [data-lcs-scale]', say: '[data-lcs-bank-banner], [data-lcs-say-row]', fields: '[data-lcs-pile], [data-lcs-plots]' }[mode];
    const body = R(document.querySelector('.ws-body'));
    const bands = [], overlaps = [];
    let contentBottom = -Infinity;
    for (const [bs, ls] of SEL) for (const box of root.querySelectorAll(bs)) {
      const br = R(box);
      const leaves = [...box.querySelectorAll(ls)].map(R).filter((x) => x.w > 0 && x.h > 0);
      for (const x of leaves) contentBottom = Math.max(contentBottom, x.b);
      for (let i = 0; i < leaves.length; i++) for (let j = i + 1; j < leaves.length; j++) {
        const a = leaves[i], b = leaves[j];
        const ix = Math.min(a.r, b.r) - Math.max(a.l, b.l), iy = Math.min(a.b, b.b) - Math.max(a.t, b.t);
        if (ix > 2 && iy > 2) overlaps.push(`${bs} blocks intersect by ${Math.round(ix)}×${Math.round(iy)} px`);
      }
      const rows = [];
      for (const x of leaves.slice().sort((a, b) => a.t - b.t)) { const row = rows.find((r) => x.t < r.b - 0.5 && x.b > r.t + 0.5); if (row) { row.t = Math.min(row.t, x.t); row.b = Math.max(row.b, x.b); } else rows.push({ t: x.t, b: x.b }); }
      rows.sort((a, b) => a.t - b.t);
      if (!rows.length) { bands.push({ where: `${bs}: empty`, px: br.h }); continue; }
      bands.push({ where: `${bs} top edge → first block`, px: rows[0].t - br.t });
      for (let i = 1; i < rows.length; i++) bands.push({ where: `${bs} block → block`, px: rows[i].t - rows[i - 1].b });
      bands.push({ where: `${bs} last block → bottom edge`, px: br.b - rows[rows.length - 1].b });
    }
    const cols = [];
    for (const el of root.querySelectorAll(FLOW)) { const b = R(el); let c = cols.find((x) => Math.abs(x.l - b.l) < 8); if (!c) { c = { l: b.l, list: [] }; cols.push(c); } c.list.push(b); }
    for (const c of cols) {
      c.list.sort((a, b) => a.t - b.t);
      bands.push({ where: 'body top → first container', px: c.list[0].t - body.t });
      for (let i = 1; i < c.list.length; i++) bands.push({ where: 'container → container', px: c.list[i].t - c.list[i - 1].b });
      bands.push({ where: 'last container → body bottom', px: body.b - c.list[c.list.length - 1].b });
    }
    return { mode, body, bands, overlaps, contentBottom };
  });
}
function renderFindings(name, m) {
  const f = [];
  for (const b of m.bands) if (b.px > SPARSE_MAX + 0.5) f.push(`${name}: SPARSE — a ${Math.round(b.px)} px blank band (${b.where}) > ${SPARSE_MAX}`);
  for (const b of m.bands) if (b.px < -0.5) f.push(`${name}: OVERLAP — ${b.where} ${Math.round(b.px)} px`);
  for (const o of m.overlaps) f.push(`${name}: OVERLAP — ${o}`);
  const fill = (m.contentBottom - m.body.t) / m.body.h;
  if (m.body.h >= 800 && fill < FILL_MIN) f.push(`${name}: FILL — the content ends at ${(fill * 100).toFixed(1)} % of the ${Math.round(m.body.h)} px body (< ${FILL_MIN * 100} %)`);
  if (m.contentBottom > m.body.b + 0.5) f.push(`${name}: FILL — the content runs ${Math.round(m.contentBottom - m.body.b)} px past the body`);
  return f;
}

/* ---------------------------------------------------------------- node tells */
function nodeTells(face, metas, ok) {
  const n = metas.length;
  if (face.mode === 'pictures') {
    const slot = [0, 0, 0, 0];
    for (const m of metas) for (const c of m.cards) for (const s of c.slots) slot[s]++;
    const tot = n * 6;
    const share = slot.map((x) => x / tot);
    ok(share.every((x) => Math.abs(x - 0.5) < 1e-9), `G1-395 pooled: each slot answers ${share.map((x) => x.toFixed(2))} of cards (want exactly 0.5 — every pair once per page)`);
    return `slot answer share ${share.map((x) => x.toFixed(2)).join('/')}`;
  }
  if (face.mode === 'pairs') {
    const cell = {};
    let level = 0, adj = 0, cnt = 0;
    for (const m of metas) m.rOrder.forEach((i, k) => { cell[i + '>' + k] = (cell[i + '>' + k] || 0) + 1; if (i === k) level++; if (Math.abs(i - k) === 1) adj++; cnt++; });
    const mx = Math.max(...Object.values(cell)) / n;
    ok(level === 0, `G2-373: a partner sat level with its word ${level} times`);
    ok(mx <= 0.3, `G2-373 pooled: one (left row -> right row) cell holds ${(mx * 100).toFixed(0)} % of pages (> 30 %)`);
    return `max row->row cell ${(mx * 100).toFixed(0)} % · adjacent-row partners ${(adj / cnt * 100).toFixed(0)} %`;
  }
  if (face.mode === 'shades') {
    const col = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    let rev = 0;
    for (const m of metas) for (const r of m.rows) { r.order.forEach((k, c) => col[c][k]++); if (r.order.join() === '2,1,0') rev++; }
    const per = n * 2;
    ok(col.every((c) => c.every((k) => k === per)), `G1-396 pooled column ranks ${JSON.stringify(col)} ≠ ${per} each`);
    return `column ranks ${JSON.stringify(col)} · reverse rows ${(rev / (n * 6) * 100).toFixed(0)} %`;
  }
  if (face.mode === 'say') {
    let same = 0;
    for (const m of metas) m.bank.forEach((w, i) => { if (m.rows[i].answer === w) same++; });
    ok(same === 0, `G2-374: a bank word sat at its own row's position ${same} times`);
    const ids = new Set(metas.map((m) => m.rows.map((r) => r.id).join()));
    ok(ids.size >= Math.min(n, 3), `G2-374: only ${ids.size} distinct sentence sets over ${n} pages`);
    return `bank at own position 0 · ${ids.size} distinct sentence sets`;
  }
  if (face.mode === 'fields') {
    const splits = new Set(metas.map((m) => m.split.join('/')));
    ok(n < 5 || splits.size === 3, `G3-397: splits seen ${[...splits]} (want 4/6, 5/5, 6/4)`);
    return `splits ${[...splits].join(' ')}`;
  }
  return '';
}

/* ------------------------------------------------------------------ the gate */
async function faceGate({ page, ok, judge, fails, validateBank, CHROME, QUICK, OUT }) {
  const { renderInstance } = require('../render/render-instance.js');
  const en = DATA.SYNONYMS.en;
  const TYPES = Object.fromEntries(FACES.map((x) => [x.id, loadType(x.id)]));
  const strEn = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'i18n', 'strings.en.json'), 'utf8'));
  // A. strings + bands
  for (const x of FACES) {
    const t = TYPES[x.id];
    ok(DATA.FACES[x.mode] === x.id, `${x.id}: DATA.FACES.${x.mode} = ${DATA.FACES[x.mode]}`);
    ok(t.i18n.en.title === en.strings[x.mode].title && t.i18n.en.instruction === en.strings[x.mode].instruction, `${x.id}: i18n.en ${JSON.stringify(t.i18n.en)} ≠ the bank strings.${x.mode}`);
    ok(t.gradeBand === x.band, `${x.id}: gradeBand ${t.gradeBand} ≠ ${x.band}`);
    ok(t.difficulty[2].mode === x.mode && t.difficulty[1] === t.difficulty[2] && t.difficulty[3] === t.difficulty[2], `${x.id}: difficulty is not one ${x.mode} config for all three levels`);
    ok(!!strEn[x.id] && strEn[x.id].title === t.i18n.en.title, `${x.id}: i18n/strings.en.json ≠ the face title (run node i18n/build-en.js)`);
    ok(!/sock/i.test(t.i18n.en.title + ' ' + t.i18n.en.instruction), `${x.id}: a string names the retired sock`);
  }
  const rewire = (id, fn, { block = en, cfgPatch, locale } = {}) => Object.assign(Object.create(TYPES[id]), { build(args, ctx) {
    const out = TYPES[id]._buildWith(block, { ...TYPES[id].difficulty[2], ...(cfgPatch || {}) }, { locale: locale || args.locale }, ctx);
    if (fn) out.bodyHtml = fn(out.bodyHtml, out);
    return out;
  } });
  // B. node sweep
  const SEEDS = QUICK ? 5 : 20;
  for (const x of FACES) {
    const metas = [];
    const sigs = new Set();
    for (let e = 1; e <= SEEDS; e++) {
      let out;
      try { out = TYPES[x.id].build({ difficulty: 2, locale: 'en' }, { rng: makeRng(instanceSeed({ typeId: x.id, theme: null, difficulty: 2, seedEpoch: e })) }); } catch (err) { ok(false, `${x.id} seed ${e}: threw ${err.message}`); continue; }
      metas.push(out.meta);
      sigs.add(JSON.stringify(out.meta));
      const again = TYPES[x.id].build({ difficulty: 2, locale: 'en' }, { rng: makeRng(instanceSeed({ typeId: x.id, theme: null, difficulty: 2, seedEpoch: e })) });
      ok(again.bodyHtml === out.bodyHtml, `${x.id} seed ${e}: the build is not deterministic`);
    }
    ok(sigs.size === metas.length, `${x.id}: ${sigs.size} distinct pages of ${metas.length}`);
    // the pooled tells over 200 node seeds (cheap; independent of --quick)
    const pool = [];
    for (let e = 1; e <= 200; e++) pool.push(TYPES[x.id].build({ difficulty: 2, locale: 'en' }, { rng: makeRng(`G2-358-tell-${x.id}-${e}`) }).meta);
    console.log(`face sweep ${x.id} ${x.mode}: ${metas.length} pages, ${sigs.size} distinct · 200-seed pool: ${nodeTells(x, pool, ok)}`);
  }
  // an unauthored locale and a refused mode REFUSE
  for (const x of FACES) {
    let m = null; try { TYPES[x.id].build({ difficulty: 2, locale: UNAUTH }, { rng: makeRng('x') }); } catch (e) { m = e.message; }
    ok(m && new RegExp('no ' + UNAUTH + ' block|refuse').test(m), `${x.id}: an unauthored ${UNAUTH} REFUSES (got ${m})`);
    const b = JSON.parse(JSON.stringify(en)); b.refuse = [x.mode];
    m = null; try { TYPES[x.id]._buildWith(b, TYPES[x.id].difficulty[2], { locale: 'en' }, { rng: makeRng('x') }); } catch (e) { m = e.message; }
    ok(m && /refuses the .* face/.test(m), `${x.id}: a block that refuses ${x.mode} must throw (got ${m})`);
  }

  // C. renders
  const renderFace = async (type, baseName, opts = {}) => {
    const out = await renderInstance({ type, theme: null, difficulty: 2, locale: 'en', page, outDir: OUT, baseName, strings: opts.strings });
    const m = await measureRender(page);
    return { verify: out.qa.verify, lints: out.qa.lints, m, png: out.pngPath, html: out.html };
  };
  const allFindings = (name, r) => [...r.verify.map((v) => `verify: ${v}`), ...r.lints.map((v) => `lint: ${v}`), ...renderFindings(name, r.m)];
  const pngs = [];
  for (const x of FACES) {
    const runs = [['own', {}], ['one', { strings: CHROME.one }], ['de722', { strings: CHROME.de722 }], ['fi667', { strings: CHROME.fi667 }]];
    const line = [];
    for (const [tag, opts] of runs) {
      const r = await renderFace(TYPES[x.id], `${x.id}-gate-${tag}`, opts);
      const f = allFindings(`${x.id} ${tag}`, r);
      for (const v of f) ok(false, v);
      if (opts.strings && opts.strings.body) ok(r.m.body.h <= opts.strings.body + 0.5, `${x.id} ${tag}: body ${Math.round(r.m.body.h)} > ${opts.strings.body} (the fixture did not squeeze)`);
      if (tag === 'one') ok(r.m.body.h >= 800, `${x.id} one: body ${Math.round(r.m.body.h)} — the fixture did not open it to ~814`);
      pngs.push(r.png);
      line.push(`${tag} body ${Math.round(r.m.body.h)} fill ${((r.m.contentBottom - r.m.body.t) / r.m.body.h * 100).toFixed(1)}% max band ${Math.round(Math.max(...r.m.bands.map((b) => b.px)))} ${f.length ? 'FINDINGS ' + f.length : 'clean'}`);
    }
    console.log(`face render ${x.id} ${x.mode}: ${line.join(' · ')}`);
  }
  // the widest words each face allows (rule 11 caps: F1 11, F2 14, F3 12, F4 12, F5 12 glyphs), every
  // literal of the bank padded to the cap with wide letters, at the fi (667) chrome: nothing clips, the
  // F4 bubble stays two rows, the F5 pile stays <= 3 rows and the stack stays inside the body
  const CAP = { pictures: 11, pairs: 14, shades: 12, say: 12, fields: 12 };
  const widen = (n) => {
    const pad = (w) => (w + 'mäwömäwömäwömäwö').slice(0, n);
    const b = JSON.parse(JSON.stringify(en));
    const map = (w) => pad(w);
    b.groups.forEach((g) => { g.words = g.words.map(map); });
    b.near = b.near.map((x) => ({ ...x, a: map(x.a), b: map(x.b) }));
    b.falseOf = Object.fromEntries(Object.entries(b.falseOf).map(([k, v]) => [k, v.map(map)]));
    b.scales.forEach((s) => { s.words = s.words.map(map); });
    // F5: a padded pile cannot fit ten 12-glyph pills in three rows (the build REFUSES it by design), so the
    // fields fixture carries the LONGEST real field verbs the panels are expected to sign (de / fi, 8-10 glyphs)
    b.fields.go.words = ['marschiert', 'schleicht', 'stolpert', 'klettert', 'kiirehtii', 'kipittää', 'vaeltaa', 'kävelee'];
    b.fields.look.words = ['beobachtet', 'tarkkailee', 'blinzelt', 'vilkaisee', 'silmäilee', 'kurkistaa', 'tuijottaa', 'betrachtet'];
    b.fields.say.words = b.fields.say.words.map(map);
    b.fields.say.sentences.forEach((s) => { s.fit = Object.fromEntries(Object.entries(s.fit).map(([k, v]) => [map(k), v])); });
    b.ban = [];
    return b;
  };
  for (const x of FACES) {
    const b = widen(CAP[x.mode]);
    const r = await renderFace(rewire(x.id, null, { block: b }), `${x.id}-gate-widest-fi667`, { strings: CHROME.fi667 });
    const f = allFindings(`${x.id} widest fi667`, r);
    for (const v of f) ok(false, v);
    pngs.push(r.png);
    console.log(`face render ${x.id} widest ${CAP[x.mode]}-glyph words at fi667: body ${Math.round(r.m.body.h)} fill ${((r.m.contentBottom - r.m.body.t) / r.m.body.h * 100).toFixed(1)}% ${f.length ? 'FINDINGS ' + f.slice(0, 3).join(' | ') : 'clean'}`);
  }

  // D. poisons
  const gateOf = async (type, name, opts = {}) => { const r = await renderFace(type, `G2-358-face-poison-${name}`, opts); return allFindings(name, r); };
  const mapCards = (html, fn) => { const parts = html.split('<section class="ws-card"'); return parts[0] + parts.slice(1).map((p, i) => '<section class="ws-card"' + fn(p, i)).join(''); };
  const tagRe = /<span class="ws-achip" data-lcs-tag[\s\S]*?<\/span><\/span>/g;
  // P6 — an F1 page with scared AND surprised
  judge('P6 F1 scared + surprised on one page', await gateOf(rewire('G1-395', (h) => mapCards(h, (p, i) => (i < 2 ? p.replace(/data-lcs-concept="[^"]+"/, `data-lcs-concept="${i === 0 ? 'scared' : 'surprised'}"`) : p))), 'P6'), /EXCLUSIVE: scared \+ surprised/);
  // P10 — F3 three rows printed in the stored weakest -> strongest order
  {
    const cellRe = /<div data-lcs-shade-cell="\d"[\s\S]*?<\/span><\/div>/g;
    const t = rewire('G1-396', (h) => { const parts = h.split('<div class="ws-lane" data-ws-content data-lcs-scale='); return parts[0] + parts.slice(1).map((p, i) => {
      if (i > 2) return '<div class="ws-lane" data-ws-content data-lcs-scale=' + p;
      const cells = [...p.matchAll(cellRe)].map((m) => m[0]);
      const rank = (c) => +(/data-lcs-answer="(\d)"/.exec(c)[1]);
      const sorted = cells.slice().sort((a, b) => rank(a) - rank(b));
      let k = 0; return '<div class="ws-lane" data-ws-content data-lcs-scale=' + p.replace(cellRe, () => sorted[k++]);
    }).join(''); });
    judge('P10 F3 three rows in the stored order', await gateOf(t, 'P10'), /printed in the stored weakest -> strongest order/);
  }
  // P15 — F2: left big with right large AND huge present (two partners)
  {
    const t = rewire('G2-373', (h) => {
      const lex = rootStamp(h, 'lex');
      const g = en.groups.find((x) => x.id === 'g.big');
      lex.groups['g.big'] = { concept: g.concept, pos: g.pos, domain: g.domain, words: g.words };
      h = setStamp(h, 'lex', lex);
      let li = -1;
      h = h.replace(/data-lcs-match-left="([^"]+)"([^>]*>)<span data-lcs-link-word([^>]*)>[^<]*</, (m0, gid, rest, st) => { li = gid; return `data-lcs-match-left="g.big"${rest}<span data-lcs-link-word${st}>big<`; });
      h = h.replace(new RegExp(`data-lcs-match-right="${li.replace(/\./g, '\\.')}"([^>]*>)<span data-lcs-link-word([^>]*)>[^<]*<`), 'data-lcs-match-right="g.big"$1<span data-lcs-link-word$2>large<');
      let n = 0;
      return h.replace(/data-lcs-match-right="(?!g\.big)[^"]+"([^>]*>)<span data-lcs-link-word([^>]*)>[^<]*</g, (m0, rest, st) => (n++ === 0 ? `data-lcs-match-right="g.huge"${rest}<span data-lcs-link-word${st}>huge<` : m0));
    });
    judge('P15 F2 big with large AND huge on the right', await gateOf(t, 'P15'), /left "big" has 2 partners on the right/);
  }
  // P16 — F4 gap boxes of two widths
  judge('P16 F4 gap boxes of two widths', await gateOf(rewire('G2-374', (h) => h.replace(/(data-lcs-gapbox[^>]*style="width:)\d+px/, '$1220px')), 'P16'), /gap boxes of 2 widths/);
  // PR5 — the F4 bubble with a third pill row: the component's own guard throws
  {
    let msg = null;
    try { C5.synSayBubble({ head: 'said', words: ['whisperedd', 'shoutedddd', 'answeredddd', 'explainedddd', 'promiseddddd', 'questioned', 'grumbledddd', 'announceddd', 'mumbledddd', 'murmuredddd', 'exclaimeddd'] }); } catch (e) { msg = e.message; }
    judge('PR5 F4 bubble with a third pill row', msg ? [msg] : [], /refuse \(never a third row\)/);
  }
  // L4 — an F4 sentence forced to three lines
  judge('L4 F4 sentence forced to 3 lines', await gateOf(rewire('G2-374', (h) => h.replace(/(<p data-lcs-sentence[^>]*>)/, '$1On a very long and sunny afternoon at the very end of the long summer holiday by the big blue lake, ')), 'L4'), /runs to \d lines > 2/);
  // FX — F2 a partner level with its word (swap two right tags)
  {
    const t = rewire('G2-373', (h, out) => {
      const rights = [...h.matchAll(/<div class="ws-match-item ws-match-item--plain" data-lcs-match-right[\s\S]*?<\/span><\/div>/g)].map((m) => m[0]);
      const partnerRow = out.meta.rOrder.indexOf(0);
      const sw = rights.slice(); [sw[0], sw[partnerRow]] = [sw[partnerRow], sw[0]];
      let k = 0; return h.replace(/<div class="ws-match-item ws-match-item--plain" data-lcs-match-right[\s\S]*?<\/span><\/div>/g, () => sw[k++]);
    });
    judge('FX F2 a partner level with its word', await gateOf(t, 'FX'), /sits level with its partner/);
  }
  // PW — F5 a word printed on a writing row
  judge('PW F5 a word on a writing row', await gateOf(rewire('G3-397', (h) => h.replace('<div data-lcs-ruling-row="1">', '<div data-lcs-ruling-row="1"><span style="font-size:20px">walk</span>')), 'PW'), /a word is printed on the writing rows/);
  // PF — F1 a picture shrunk to a small square (the pre-fix race car: a wide picture fitted to a square box)
  judge('PF F1 a picture shrunk to a 40 px square', await gateOf(rewire('G1-395', (h) => h.replace(/(data-lcs-pic-img data-lcs-pic-box="[^"]+" style=")width:\d+px;height:\d+px;flex:0 0 \d+px/, '$1width:40px;height:40px;flex:0 0 40px')), 'PF'), /the picture is not fitted to the frame|short side < 44/);
  // PP — F5 ten 12-glyph field words (a 4th pile row): the build redraws, then REFUSES (never a smaller pill)
  {
    const b = JSON.parse(JSON.stringify(en));
    for (const k of ['go', 'look']) b.fields[k].words = b.fields[k].words.map((w) => (w + 'mäwömäwömäwö').slice(0, 12));
    let msg = null;
    try { TYPES['G3-397']._buildWith(b, TYPES['G3-397'].difficulty[2], { locale: 'en' }, { rng: makeRng('pp') }); } catch (e) { msg = e.message; }
    judge('PP F5 a pile that needs a 4th row', msg ? [msg] : [], /within 3 rows .* never a smaller pill/);
  }
  // FG — a face spec fed another face's config (the guard keys on the resolved mode)
  {
    let msg = null;
    try { TYPES['G2-373']._buildWith(en, TYPES['G2-374'].difficulty[2], { locale: 'en' }, { rng: makeRng('fg') }); } catch (e) { msg = e.message; }
    judge('FG F2 spec fed the F4 config', msg ? [msg] : [], /mode "say" is a face \(G2-374\)/);
  }
  // SP1-SP5 — the slack moved BETWEEN blocks at the one-line chrome (814)
  const SP = [
    ['SP1 F1 frame and tags pushed apart', 'G1-395', (h) => h.split('justify-content:space-evenly;padding:12px').join('justify-content:space-between;padding:12px')],
    ['SP2 F2 tags held small, columns spread', 'G2-373', (h) => h.split('flex:1 1 64px;min-height:64px;max-height:80px').join('flex:0 0 48px;min-height:48px;max-height:48px').split('class="ws-match-col" data-lcs-col="left" style="gap:12px"').join('class="ws-match-col" data-lcs-col="left" style="gap:12px;justify-content:space-between"').split('class="ws-match-col" data-lcs-col="right" style="gap:12px"').join('class="ws-match-col" data-lcs-col="right" style="gap:12px;justify-content:space-between"')],
    ['SP3 F3 rows held at their content, the slack below the last row', 'G1-396', (h) => h.split('column-gap:16px;align-items:center;flex:1 1 0').join('column-gap:16px;align-items:center;flex:0 0 auto')],
    ['SP4 F4 sentence pinned to the top of its lane', 'G2-374', (h) => h.split('column-gap:12px;align-items:center;flex:1 1 0').join('column-gap:12px;align-items:start;flex:1 1 0')],
    ['SP5 F5 writing rows pinned to the top', 'G3-397', (h) => h.split('data-lcs-field-lines style="display:flex;flex-direction:column;justify-content:space-evenly').join('data-lcs-field-lines style="display:flex;flex-direction:column;justify-content:flex-start')],
  ];
  for (const [name, id, fn] of SP) judge(name, await gateOf(rewire(id, fn), name.split(' ')[0], { strings: CHROME.one }), /SPARSE — a \d+ px blank band/);
  // FL1 FL2 — FILL both ways
  judge('FL1 F2 content ends high (tags held, columns top-packed)', await gateOf(rewire('G2-373', (h) => h.split('flex:1 1 64px;min-height:64px;max-height:80px').join('flex:0 0 52px;min-height:52px;max-height:52px').split('style="gap:12px"').join('style="gap:12px;justify-content:flex-start"')), 'FL1', { strings: CHROME.one }), /FILL — the content ends at \d+(\.\d+)? %/);
  judge('FL2 F5 content past the body at 667', await gateOf(rewire('G3-397', (h) => h.split('data-lcs-field-lines style="').join('data-lcs-field-lines style="flex:0 0 600px !important;min-height:600px;')), 'FL2', { strings: CHROME.fi667 }), /FILL — the content runs \d+ px past the body|footer overlap|exceeds page box/);
  // AT1 AT2 AT4 AT5 — the per-page answer tells, on the SHIPPED layout
  {
    const t1 = rewire('G1-395', (h) => mapCards(h, (p) => {
      const gid = /data-lcs-piccard[^>]*data-lcs-group="([^"]+)"/.exec(p)[1];
      const tags = [...p.matchAll(tagRe)].map((m) => m[0]);
      const own = tags.filter((x) => x.includes(`data-lcs-group="${gid}"`)), oth = tags.filter((x) => !x.includes(`data-lcs-group="${gid}"`));
      const order = [...own, ...oth];
      let k = 0; return p.replace(tagRe, () => order[k].replace(/data-lcs-slot="\d"/, `data-lcs-slot="${k++}"`));
    }));
    judge('AT1 F1 every answer pair in slots 1 + 2', await gateOf(t1, 'AT1'), /answer slot pairs/);
    const itemRe = (side) => new RegExp(`<div class="ws-match-item ws-match-item--plain" data-lcs-match-${side}[\\s\\S]*?<\\/span><\\/div>`, 'g');
    const t2 = rewire('G2-373', (h) => {
      const left = [...h.matchAll(itemRe('left'))].map((m) => m[0]);
      const rights = [...h.matchAll(itemRe('right'))].map((m) => m[0]);
      const byGroup = (g) => rights.find((r) => r.includes(`data-lcs-match-right="${g}"`));
      const order = left.map((l) => /data-lcs-match-left="([^"]+)"/.exec(l)[1]).reverse().map(byGroup);
      let k = 0; return h.replace(itemRe('right'), () => order[k++]);
    });
    judge('AT2 F2 the right column is the reverse of the left', await gateOf(t2, 'AT2'), /exact reverse of the left/);
    const t4 = rewire('G2-374', (h, out) => {
      const pillRe = /<span class="ws-bankword" data-lcs-bank-word="[^"]+"[^>]*>[^<]*<\/span>/g;
      const pills = [...h.matchAll(pillRe)].map((m) => m[0]);
      const order = out.meta.rows.map((r) => pills.find((p) => p.includes(`data-lcs-bank-word="${r.answer}"`)));
      let k = 0; return h.replace(pillRe, () => order[k++]);
    });
    judge('AT4 F4 the bank in row order', await gateOf(t4, 'AT4'), /bank word sits at its own row's position/);
    const t5 = rewire('G3-397', (h) => {
      const pillRe = /<span class="ws-bankword" data-lcs-bank-word="[^"]+" data-lcs-pile-field="[^"]+"[^>]*>[^<]*<\/span>/g;
      const pills = [...h.matchAll(pillRe)].map((m) => m[0]);
      const order = [...pills.filter((p) => p.includes('pile-field="go"')), ...pills.filter((p) => !p.includes('pile-field="go"'))];
      let k = 0; return h.replace(pillRe, () => order[k++]);
    });
    judge('AT5 F5 a 4-run in the pile', await gateOf(t5, 'AT5'), /four \w+ words in a row/);
  }
  // AP1-AP5 — an instruction naming apparatus the face does not print (rule 14, en)
  const AP = [
    ['AP1 F1 instruction names a box', 'pictures', 'Look at each picture and circle the two words in the box under it that mean the same.', /strings\.pictures instruction names "box"/],
    ['AP2 F2 instruction names a bubble', 'pairs', 'Draw a line to link each word in the bubble with the word on the right that means the same.', /strings\.pairs instruction names "bubble"/],
    ['AP3 F3 instruction names a line', 'shades', 'Read the three words on each line and write 1, 2 and 3 in the boxes, from the weakest word to the strongest.', /strings\.shades instruction names "line"/],
    ['AP4 F4 instruction names a field', 'say', 'Read each sentence and write the word from the bubble in the box and in the field instead of said.', /strings\.say instruction names "field"/],
    ['AP5 F5 instruction names a card', 'fields', 'Read the ten words on the card and write each one in the field of the word it means nearly the same as.', /strings\.fields instruction names "card"/],
  ];
  for (const [name, mode, ins, re] of AP) { const b = JSON.parse(JSON.stringify(en)); b.strings[mode].instruction = ins; judge(name, validateBank(b, 'en'), re); }
  // controls: every untouched face at the poison chromes through the same collector
  for (const x of FACES) for (const [tag, strings] of [['ctl', undefined], ['ctl-one', CHROME.one], ['ctl-fi', CHROME.fi667]]) {
    const c = await gateOf(TYPES[x.id], `${x.id}-${tag}`, { strings });
    ok(c.length === 0, `face poison control ${x.id} ${tag}: ${JSON.stringify(c.slice(0, 3))}`);
  }
  void fails;
  return pngs;
}

module.exports = { faceGate, FACES, measureRender };
