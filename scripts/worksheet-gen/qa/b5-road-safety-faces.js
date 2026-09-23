/**
 * b5-road-safety-faces.js — the K-369 `road-safety` FACE gate (nt10-E Phase E; design
 * docs/worksheet-gen/b5-designs/K-369-road-safety.md §3 + §5; record _work/K-369-faces.md).
 * Called by qa/verify-b5-road-safety.js after the base gate (one browser, one checker, one poison log):
 * `faceGate({ page, K, validateBank, fixture, quick, OUTDIR })` → report rows.
 *
 *   F1 K-373 colour-lights · F2 K-374 crossing-steps · F3 G1-384 sign-meaning · F4 G2-360 sign-kinds · F5 G2-361 sign-quiz
 *
 * A. STRINGS — every face's i18n.en === the bank's strings[mode]; the band (K / K / G1 / G2 / G2); one config
 *    for all three levels; i18n/strings.en.json carries each face (node i18n/build-en.js).
 * B. SWEEP — 20 seeds per face (variants 1..20; the shipped seed is variant 1; --quick 5): the build's own
 *    per-page rules hold (it would throw otherwise) and the POOLED tells are measured here, per reading
 *    position (F1 colour / F2 kind / F4 class share <= 0.6 / 0.6 / 0.75; F3 one line direction <= 0.4 of all
 *    lines; F5 the answer slot <= 0.6, design §3). Every face also builds for the Vienna TEST FIXTURE (de):
 *    the pedestrian lights of F1, the 3-bin sort without priority signs of F4, the blue-disc roles of F3/F5.
 * C. RENDER — each face through the REAL pipeline at its own en chrome, a one-line chrome (814), the 722
 *    fixture (3-line title + 3-line instruction) and the 677 fixture (a 4-line fi title): verify() empty
 *    (it re-derives every answer from the drawn geometry and carries SPARSE <= 40 px), qa/lints.js clean,
 *    FILL (content bottom >= 85 % of the body at 814, inside the body at every chrome); the de fixture page;
 *    the GREYSCALE proof (every code colour -> one grey; verify() still clean, the same derived answers).
 * D. POISONS — each must FAIL for its OWN reason (the untouched face is the control): PR2 an F1 lamp
 *    pre-filled · PR3 an F2 look-left chevron pointing right · PR4 an F5 row {school, crossing, stop}
 *    targeting school (confusable) · PR8 / PR8b an F4 group whose box count ≠ its signs (short / extra) · per-page tells AT1-AT7 · FR1 an F4
 *    filled red disc · FR2 STOP on a Vienna sort · MR1 an F3 meaning printing the sign's word · BX1 an F2 box
 *    written in · RY1 an F1 light with no rays · FLR1 an F3 sign below the G1 floor · SP1-SP5 slack moved
 *    between blocks at 814 · FL1 FL2 FILL both ways · AP1-AP5 an instruction naming apparatus the face
 *    does not print.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const tokens = require('../primitives/_tokens.js');
const { renderInstance } = require('../render/render-instance.js');
const { loadType } = require('../lib/load-types.js');
const { makeRng, instanceSeed } = require('../lib/rng.js');
const { roadSign } = require('../primitives/road-sign.js');
const bankMod = require('../data/b5/road-safety.js');

const FACES = [
  { id: 'K-373', mode: 'colour-lights', band: 'K', sel: '[data-lcs-light-part="housing"], .rs-pole, .rs-band svg' },
  { id: 'K-374', mode: 'crossing-steps', band: 'K', sel: '.rs-ccard' },
  { id: 'G1-384', mode: 'sign-meaning', band: 'G1', sel: '.ws-match-item' },
  { id: 'G2-360', mode: 'sign-kinds', band: 'G2', sel: '.rs-lcard, .rs-bin' },
  { id: 'G2-361', mode: 'sign-quiz', band: 'G2', sel: '.rs-qbox, .rs-qtile' },
];
const FILL_MIN = 0.85;
const CHROME = {
  one: { title: 'Road Safety', instruction: 'Look.', body: 820 },
  de722: { title: 'Verkehrserziehung: die Ampel für Fußgänger und Autos, stehen oder gehen', instruction: 'Schau bei jeder Ampel auf das Licht, das leuchtet, und kreise dann ein, was die Person auf dem Gehweg oder das Auto auf der Straße jetzt tun muss: stehen bleiben oder gehen.', body: 722 },
  fi677: { title: 'Liikenneturvallisuus: liikennevalot ja suojatie, pysähdy tai mene, harjoittele tien ylittämistä turvallisesti', instruction: 'Katso jokaisessa liikennevalossa palavaa valoa, ja ympyröi sitten, mitä kadulla kävelevän tai autoa ajavan pitää tehdä: pysähtyä vai mennä eteenpäin.', body: 677 },
};

async function measure(page, sel) {
  return page.evaluate((sel) => {
    const R = (e) => e.getBoundingClientRect();
    const root = document.querySelector('[data-ws-content][data-lcs-road-safety]');
    const body = R(document.querySelector('[data-lcs-body]'));
    const blocks = [...root.querySelectorAll(sel)].map(R).filter((r) => r.height > 0);
    const contentBottom = Math.max(...blocks.map((r) => r.bottom));
    let minFont = Infinity;
    // page text only: the words printed INSIDE a regulation sign are sign art, floored at 9 px by the road-sign gate
    root.querySelectorAll('*').forEach((el) => { if (el.closest('svg')) return; if ([...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())) minFont = Math.min(minFont, parseFloat(getComputedStyle(el).fontSize)); });
    const titleLines = (() => { const t = document.querySelector('[data-lcs-title]'); return Math.round(t.getBoundingClientRect().height / parseFloat(getComputedStyle(t).lineHeight)); })();
    return { body: { t: body.top, h: body.height, b: body.bottom }, contentBottom, minFont, titleLines, answers: root.dataset.lcsAnswers || root.dataset.lcsLeft || root.dataset.lcsOrder || '', title: document.querySelector('[data-lcs-title]').textContent, instr: document.querySelector('[data-lcs-instruction]').textContent };
  }, sel);
}
function fillFindings(name, m) {
  const f = [];
  const fill = (m.contentBottom - m.body.t) / m.body.h;
  if (m.body.h >= 800 && fill < FILL_MIN) f.push(`${name}: FILL — the content ends at ${(fill * 100).toFixed(1)} % of the ${Math.round(m.body.h)} px body (< ${FILL_MIN * 100} %)`);
  if (m.contentBottom > m.body.b + 0.5) f.push(`${name}: FILL — the content runs ${Math.round(m.contentBottom - m.body.b)} px past the body`);
  if (m.minFont !== null && m.minFont < 16 - 0.01) f.push(`${name}: text at ${m.minFont} px < 16`);
  return f;
}

/**
 * rule 13 on the PAGE: read every F5 row out of the composed html (its target + the roles drawn on its tiles)
 * and fail any row that offers a second sign which the gate's own meaning model (bothSatisfy, passed in from
 * verify-b5-road-safety.js) says also satisfies the sentence — never the stamped confusable table.
 */
function quizDoubleFits(html, bothSatisfy) {
  const f = [];
  const rows = String(html).split('data-lcs-qrow="').slice(1);
  if (!rows.length) return ['no sign-quiz row in the html (the check read nothing)'];
  rows.forEach((chunk, i) => {
    const target = chunk.slice(0, chunk.indexOf('"'));
    const roles = [...chunk.matchAll(/data-lcs-role="([^"]*)"/g)].map((m) => m[1]);
    if (!roles.includes(target)) f.push(`row ${i + 1}: the target ${target} is not drawn on a tile`);
    for (const r of roles) if (r !== target && bothSatisfy(r, target)) f.push(`row ${i + 1}: ${target} and ${r} both satisfy the sentence (two right answers)`);
  });
  return f;
}

/**
 * F4 EQUAL GROUP SIZES on the composed html: every card's class (the card stamp) counted per bin; every group the
 * same size AND each bin shows exactly that many boxes. Refuses to report success on a page with no card or no bin.
 */
function kindsGroups(html) {
  const f = [];
  const cls = [...String(html).matchAll(/class="rs-lcard" data-lcs-class="([^"]*)"/g)].map((m) => m[1]);
  const bins = String(html).split('data-lcs-bin="').slice(1).map((chunk) => ({ cls: chunk.slice(0, chunk.indexOf('"')), boxes: (chunk.match(/data-lcs-bin-box/g) || []).length }));
  if (!cls.length || !bins.length) return { f: [`sign-kinds: read ${cls.length} cards and ${bins.length} bins (the check read nothing)`], sizes: [] };
  const per = {}; for (const c of cls) per[c] = (per[c] || 0) + 1;
  const sizes = bins.map((b) => per[b.cls] || 0);
  if (new Set(sizes).size > 1) f.push(`unequal group sizes ${bins.map((b, i) => `${b.cls} ${sizes[i]}`).join(' / ')}`);
  bins.forEach((b, i) => { if (b.boxes !== sizes[i]) f.push(`bin ${b.cls}: ${b.boxes} boxes ≠ its ${sizes[i]} signs`); });
  for (const c of Object.keys(per)) if (!bins.some((b) => b.cls === c)) f.push(`class ${c} has no bin`);
  return { f, sizes };
}

async function faceGate({ page, K, validateBank, fixture, quick, OUTDIR, bothSatisfy }) {
  const { ok } = K;
  const rows = [];
  const en = bankMod.ROAD_SAFETY.en;
  const de = fixture('de');
  const TYPES = Object.fromEntries(FACES.map((x) => [x.id, loadType(x.id)]));
  const strEn = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'i18n', 'strings.en.json'), 'utf8'));
  // A. strings + bands
  for (const x of FACES) {
    const t = TYPES[x.id];
    ok(t.i18n.en.title === en.strings[x.mode].title && t.i18n.en.instruction === en.strings[x.mode].instruction, `${x.id}: i18n.en ${JSON.stringify(t.i18n.en)} ≠ the bank strings.${x.mode}`);
    ok(t.gradeBand === x.band, `${x.id}: gradeBand ${t.gradeBand} ≠ ${x.band}`);
    ok(t.difficulty[2].mode === x.mode && t.difficulty[1] === t.difficulty[2] && t.difficulty[3] === t.difficulty[2], `${x.id}: difficulty is not one ${x.mode} config for all three levels`);
    ok(!!strEn[x.id] && strEn[x.id].title === t.i18n.en.title, `${x.id}: i18n/strings.en.json ≠ the face title (run node i18n/build-en.js)`);
  }
  const face = (id) => FACES.find((x) => x.id === id);
  /** a face type whose build runs over `block` (+ a cfg patch / a gate-only plan seam), bodyHtml rewritten by fn */
  const rewire = (id, { block = en, fn, cfg, plan } = {}) => Object.assign(Object.create(TYPES[id]), { build(args, ctx) {
    const out = TYPES[id]._buildWith({ block, config: { ...TYPES[id].difficulty[2], ...(cfg || {}) }, plan }, { locale: args.locale }, ctx);
    if (fn) out.bodyHtml = fn(out.bodyHtml);
    return out;
  } });

  // B. sweep
  const SEEDS = quick ? 5 : 20;
  const kindsSizes = {};
  for (const x of FACES) {
    const pos = [];            // per reading position: value -> count
    let pages = 0, fails = 0, doubleFitPages = 0;
    const tally = (i, v) => { pos[i] = pos[i] || {}; pos[i][v] = (pos[i][v] || 0) + 1; };
    for (let v = 1; v <= SEEDS; v++) {
      const rng = () => makeRng(instanceSeed({ typeId: x.id, theme: null, difficulty: 2, seedEpoch: 1, variant: v }));
      let out;
      try { out = TYPES[x.id].build({ difficulty: 2, locale: 'en' }, { rng: rng() }); } catch (e) { fails++; ok(false, `${x.id} seed ${v}: threw ${e.message}`); continue; }
      pages++;
      const m = out.meta;
      if (x.mode === 'colour-lights') [...m.answers].forEach((c, i) => tally(i, c));
      if (x.mode === 'crossing-steps') m.printed.split(',').forEach((k, i) => tally(i, k));
      if (x.mode === 'sign-meaning') { const L = m.left.split(','), R = m.right.split(','); L.forEach((r, i) => tally(0, (R.indexOf(r) - i + L.length) % L.length)); }
      if (x.mode === 'sign-kinds') {
        m.order.split(',').forEach((r, i) => tally(i, en.signs[r].class));
        for (const [locK, blk] of Object.entries(require('../lib/b5-common.js').bankModule('road-safety')).concat([['de-fixture', de]])) {
          let oK;
          try { oK = TYPES[x.id]._buildWith({ block: blk, config: TYPES[x.id].difficulty[2] }, { locale: locK.slice(0, 2) }, { rng: rng() }); } catch (e) { ok(false, `${x.id} seed ${v} ${locK}: threw ${e.message}`); continue; }
          const g = kindsGroups(oK.bodyHtml);
          for (const e of g.f) ok(false, `${x.id} seed ${v} ${locK}: ${e}`);
          kindsSizes[locK] = kindsSizes[locK] || new Set(); kindsSizes[locK].add(g.sizes.join('+'));
        }
      }
      if (x.mode === 'sign-quiz') {
        [...m.answers].forEach((s) => tally(0, s));
        for (const v13 of quizDoubleFits(out.bodyHtml, bothSatisfy)) ok(false, `${x.id} seed ${v}: ${v13}`);
        for (const [loc13, blk] of Object.entries(require('../lib/b5-common.js').bankModule('road-safety')).concat([['de-fixture', de]])) {
          if (loc13 === 'en') continue;
          let o13;
          try { o13 = TYPES[x.id]._buildWith({ block: blk, config: TYPES[x.id].difficulty[2] }, { locale: loc13.slice(0, 2) }, { rng: rng() }); } catch (e) { ok(false, `${x.id} seed ${v} ${loc13}: threw ${e.message}`); continue; }
          for (const v13 of quizDoubleFits(o13.bodyHtml, bothSatisfy)) ok(false, `${x.id} seed ${v} ${loc13}: ${v13}`);
          doubleFitPages++;
        }
      }
      try { TYPES[x.id]._buildWith({ block: de, config: TYPES[x.id].difficulty[2] }, { locale: 'de' }, { rng: rng() }); } catch (e) { ok(false, `${x.id} seed ${v}: the Vienna fixture (de) throws ${e.message}`); }
    }
    const cap = { 'colour-lights': 0.6, 'crossing-steps': 0.6, 'sign-meaning': 0.4, 'sign-kinds': 0.75, 'sign-quiz': 0.6 }[x.mode];
    const shares = pos.map((p) => { const t = Object.values(p).reduce((a, b) => a + b, 0); return Math.max(...Object.values(p)) / t; });
    const worst = Math.max(...shares);
    // a pooled share is a statistic: it is asserted over the full 20-page sweep, never over the 5-page --quick sample
    if (SEEDS >= 20) ok(worst <= cap, `${x.id}: a pooled position share ${worst.toFixed(2)} > ${cap} over ${pages} pages (${JSON.stringify(pos)})`);
    if (x.mode === 'sign-quiz') ok(doubleFitPages > 0, `${x.id}: the rule-13 double-fit sweep read no non-en page`);
    if (x.mode === 'sign-kinds') {
      const locs = Object.keys(require('../lib/b5-common.js').bankModule('road-safety'));
      ok(locs.length === 11, `${x.id}: the equal-groups sweep read ${locs.length} locale blocks (11)`);
      rows.push(`face sweep ${x.id} equal groups x ${SEEDS} seeds: ${Object.entries(kindsSizes).map(([l, s]) => `${l} ${[...s].join('|')}`).join(' · ')}`);
    }
    rows.push(`face sweep ${x.id} ${x.mode}: ${pages}/${SEEDS} pages composed under the per-page rules${fails ? ` (${fails} THREW)` : ''}${x.mode === 'sign-quiz' ? `; rule 13 (no row offers two signs that both satisfy its sentence) held on ${pages} en + ${doubleFitPages} other-locale pages` : ''}; the Vienna fixture composes on every seed; worst pooled ${x.mode === 'sign-meaning' ? 'line-direction' : x.mode === 'sign-quiz' ? 'answer-slot' : 'per-position'} share ${worst.toFixed(2)} (<= ${cap})`);
  }

  // C. renders
  const renderFace = async (type, baseName, opts = {}) => {
    const out = await renderInstance({ type, theme: null, difficulty: 2, locale: opts.locale || 'en', variant: opts.variant, page, outDir: OUTDIR, baseName, strings: opts.strings });
    const m = await measure(page, face(type.id).sel);
    return { verify: out.qa.verify, lints: out.qa.lints, m, png: out.pngPath, meta: out.meta };
  };
  const findingsOf = (name, r) => [...r.verify.map((v) => `verify: ${v}`), ...r.lints.map((v) => `lint: ${v}`), ...fillFindings(name, r.m)];
  const CODE = Object.values(tokens.codeColors);
  const grey = (html) => CODE.reduce((h, c) => h.split(c).join(tokens.color.inkSoft), html);
  for (const x of FACES) {
    const runs = [
      ['own', TYPES[x.id], {}],
      ['one', TYPES[x.id], { strings: CHROME.one }],
      ['de722', TYPES[x.id], { strings: CHROME.de722 }],
      ['fi677', TYPES[x.id], { strings: CHROME.fi677 }],
      ['vienna-de', rewire(x.id, { block: de }), { strings: de.strings[x.mode], locale: 'de' }],
      ['grey', rewire(x.id, { fn: grey }), {}],
    ];
    const line = [];
    let ownAnswers = null;
    for (const [tag, type, opts] of runs) {
      const r = await renderFace(type, `${x.id}-gate-${tag}`, opts);
      const f = findingsOf(`${x.id} ${tag}`, r);
      for (const v of f) ok(false, `${x.id} ${tag}: ${v}`);
      if (opts.strings && opts.strings.body) ok(r.m.body.h <= opts.strings.body + 0.5, `${x.id} ${tag}: body ${Math.round(r.m.body.h)} > ${opts.strings.body} (the fixture did not squeeze)`);
      if (tag === 'fi677') ok(r.m.titleLines >= 4, `${x.id} fi677: the stress title wraps to ${r.m.titleLines} lines (< 4)`);
      if (tag === 'own') {
        ownAnswers = r.m.answers;
        ok(r.m.title === TYPES[x.id].i18n.en.title && r.m.instr === TYPES[x.id].i18n.en.instruction, `${x.id}: the printed title / instruction ≠ the bank`);
      }
      if (tag === 'grey') ok(r.m.answers === ownAnswers, `${x.id} grey: the colour-stripped page derives ${r.m.answers} ≠ ${ownAnswers}`);
      line.push(`${tag} body ${Math.round(r.m.body.h)} fill ${((r.m.contentBottom - r.m.body.t) / r.m.body.h * 100).toFixed(1)}% ${f.length ? 'FINDINGS ' + f.length : 'clean'}`);
    }
    rows.push(`face render ${x.id} ${x.mode}: ${line.join(' · ')}`);
  }

  // D. poisons
  // a poison that makes the build THROW is reported as a finding (so it can be judged), never a crash
  const gateOf = async (type, name, opts = {}) => { try { return findingsOf(name, await renderFace(type, `K-369-face-poison-${name}`, opts)); } catch (e) { return [`threw: ${e.message}`]; } };
  const judge = (name, findings, re) => K.judge(name, findings, re, true);
  const controls = {};
  for (const x of FACES) for (const [tag, strings] of [['ctl', undefined], ['ctl-one', CHROME.one]]) {
    const c = await gateOf(TYPES[x.id], `${x.id}-${tag}`, { strings });
    controls[x.id] = K.control(`face poison control ${x.id} ${tag}`, c) && (controls[x.id] !== false);
  }
  const J = (id, name, findings, re) => K.judge(name, findings, re, controls[id]);
  // PR2 — an F1 lamp pre-filled (the first car lamp face coloured in)
  J('K-373', 'PR2 an F1 lamp pre-filled', await gateOf(rewire('K-373', { fn: (h) => h.replace(/(data-lcs-lamp="1"[^>]*><circle[^>]*?fill=")#FFFFFF/, `$1${tokens.codeColors.codeRed}`) }), 'PR2'), /a lamp part is filled #C0392B/);
  // RY1 — an F1 light with its rays removed
  J('K-373', 'RY1 an F1 light with no rays', await gateOf(rewire('K-373', { fn: (h) => h.replace(/<g data-lcs-rays="1"[^>]*>(?:<line[^>]*\/>){6}<\/g>/, '') }), 'RY1'), /0 ray groups/);
  // PR3 — an F2 look-left card whose chevron points right (the figure mirrored)
  {
    const C5 = require('../templates/components-b5.js');
    const right = C5.rsCrossingCard({ step: 'look-right', w: 200, figH: 130, minFrameH: 196, box: { w: 64, h: 60 } });
    const figR = /<div class="rs-cfig"[\s\S]*?<\/svg><\/div>/.exec(right)[0];
    const fn = (h) => h.replace(/(data-lcs-step="look-left"[\s\S]*?)<div class="rs-cfig"[\s\S]*?<\/svg><\/div>/, (m, pre) => pre + figR);
    J('K-374', 'PR3 an F2 look-left chevron pointing right', await gateOf(rewire('K-374', { fn }), 'PR3'), /look-left\): the drawn sight arrows point \[1\]/);
  }
  // BX1 — an F2 numeral box written in
  J('K-374', 'BX1 an F2 box written in', await gateOf(rewire('K-374', { fn: (h) => h.replace(/(<span class="ws-blankbox"[^>]*>)<\/span>/, '$13</span>') }), 'BX1'), /the numeral box is not empty/);
  // PR4 — an F5 row {school, crossing, stop} targeting school
  {
    const sit = (r) => en.situations[r][0];
    const plan = { rows: [
      { target: 'school', text: sit('school'), tiles: ['school', 'crossing', 'stop'] },
      { target: 'no-entry', text: sit('no-entry'), tiles: ['yield', 'no-entry', 'bike-warning'] },
      { target: 'signal-ahead', text: sit('signal-ahead'), tiles: ['no-bikes', 'stop', 'signal-ahead'] },
      { target: 'yield', text: sit('yield'), tiles: ['yield', 'no-pedestrians', 'school'] },
      { target: 'no-bikes', text: sit('no-bikes'), tiles: ['stop', 'no-bikes', 'school'] },
      { target: 'bike-warning', text: sit('bike-warning'), tiles: ['no-entry', 'no-pedestrians', 'bike-warning'] },
    ] };
    J('G2-361', 'PR4 an F5 row {school, crossing, stop} targeting school', await gateOf(rewire('G2-361', { plan }), 'PR4'), /row 1: a confusable pair on one row \(school \/ crossing\)/);
    // AT7 — the answer slots as a staircase 012012
    const st = { rows: plan.rows.map((r, i) => { const tiles = r.tiles.filter((t) => t !== r.target && t !== 'crossing'); while (tiles.length < 2) tiles.push('stop' === r.target ? 'no-entry' : 'stop'); tiles.splice(i % 3, 0, r.target); return { ...r, tiles }; }) };
    J('G2-361', 'AT7 F5 answer slots 012012 (a staircase)', await gateOf(rewire('G2-361', { plan: st }), 'AT7'), /the answer slots run in a staircase \(012012\)/);
  }
  // DF1 / DF2 — rule 13 on a composed Vienna (de fixture) page: a row whose distractor ALSO satisfies the sentence
  {
    const sitD = (r) => de.situations[r][0];
    const good = { rows: [
      { target: 'no-bikes', text: sitD('no-bikes'), tiles: ['no-bikes', 'stop', 'signal-ahead'] },
      { target: 'no-pedestrians', text: sitD('no-pedestrians'), tiles: ['stop', 'no-pedestrians', 'children'] },
      { target: 'stop', text: sitD('stop'), tiles: ['no-entry', 'bike-warning', 'stop'] },
      { target: 'children', text: sitD('children'), tiles: ['no-bikes', 'children', 'no-entry'] },
      { target: 'signal-ahead', text: sitD('signal-ahead'), tiles: ['signal-ahead', 'no-vehicles', 'footpath'] },
      { target: 'bike-path', text: sitD('bike-path'), tiles: ['stop', 'signal-ahead', 'bike-path'] },
    ] };
    const build = (plan) => { try { return quizDoubleFits(TYPES['G2-361']._buildWith({ block: de, config: TYPES['G2-361'].difficulty[2], plan }, { locale: 'de' }, { rng: makeRng('df') }).bodyHtml, bothSatisfy); } catch (e) { return [`threw: ${e.message}`]; } };
    const ctlDF = K.control('DF control: a Vienna F5 page with no double fit', build(good));
    ok(ctlDF, 'DF control: the clean Vienna F5 page raised a rule-13 finding');
    const swap = (i, tiles) => ({ rows: good.rows.map((r, k) => (k === i ? { ...r, tiles } : r)) });
    K.judge('DF1 an F5 row no-bikes offering no-vehicles', build(swap(0, ['no-bikes', 'no-vehicles', 'signal-ahead'])), /row 1: no-bikes and no-vehicles both satisfy the sentence/, ctlDF);
    K.judge('DF2 an F5 row no-pedestrians offering bike-path', build(swap(1, ['stop', 'no-pedestrians', 'bike-path'])), /row 2: no-pedestrians and bike-path both satisfy the sentence/, ctlDF);
    // the other direction: an opposite pair (no-bikes / bike-path) is NOT a double fit
    const opp = build(swap(0, ['no-bikes', 'bike-path', 'signal-ahead']));
    ok(!opp.some((x) => /both satisfy/.test(x)), `DF3 must-pass: the opposite pair no-bikes / bike-path read as a double fit ${JSON.stringify(opp)}`);
  }
  // PR8 / PR8b — a group's box count ≠ its signs, both ways: one box missing (a sign has no box) and one box too many
  // (the child thinks a sign is missing); the untouched G2-360 page is the control
  const BOX = /<span class="ws-blankbox" data-lcs-bin-box[^>]*><\/span>/;
  J('G2-360', 'PR8 F4 a group one box short', await gateOf(rewire('G2-360', { fn: (h) => h.replace(BOX, '') }), 'PR8'), /bin [\w-]+: \d boxes ≠ its \d signs/);
  J('G2-360', 'PR8b F4 a group one box too many', await gateOf(rewire('G2-360', { fn: (h) => h.replace(BOX, (m) => m + m) }), 'PR8b'), /bin [\w-]+: \d boxes ≠ its \d signs/);
  // EQ1 / EQ2 — UNEQUAL group sizes with boxes = signs (the count becomes a clue): must FAIL; EQ0 an equal page passes
  J('G2-360', 'EQ1 F4 en groups 2 / 4 (boxes = signs)', await gateOf(rewire('G2-360', { plan: { order: ['crossing', 'stop', 'signal-ahead', 'yield', 'bike-warning', 'school'] } }), 'EQ1'), /unequal group sizes regulatory 2 \/ warning 4/);
  {
    const eqHtml = (plan, block = en) => TYPES['G2-360']._buildWith({ block, config: TYPES['G2-360'].difficulty[2], plan }, { locale: 'en' }, { rng: makeRng('eq') }).bodyHtml;
    const c0 = kindsGroups(eqHtml(null)).f;
    const ctlEq = K.control('EQ0 kindsGroups control: a composed en page', c0);
    K.judge('EQ3 kindsGroups: groups 2 / 4', kindsGroups(eqHtml({ order: ['crossing', 'stop', 'signal-ahead', 'yield', 'bike-warning', 'school'] })).f, /unequal group sizes/, ctlEq);
    K.judge('EQ4 kindsGroups: a box short', kindsGroups(eqHtml(null).replace(BOX, '')).f, /boxes ≠ its \d signs/, ctlEq);
    K.judge('EQ5 kindsGroups: an empty page', kindsGroups('<div></div>').f, /the check read nothing/, ctlEq);
  }
  // AT1 — F1 row 2 repeats row 1
  J('K-373', 'AT1 F1 row 2 repeats row 1', await gateOf(rewire('K-373', { plan: { actors: Array(6).fill('car'), on: [0, 1, 2, 0, 1, 2] } }), 'AT1'), /the second row repeats the first/);
  // AT2 AT3 — F2 printed in routine order / the two look-left cards side by side
  J('K-374', 'AT2 F2 printed in routine order', await gateOf(rewire('K-374', { plan: { order: [0, 1, 2, 3, 4] } }), 'AT2'), /differs from the routine in 0 places/);
  // ID1 — the wait-clear frame with its passing car removed = the stop-kerb frame: identical frames FAIL (and the car count)
  J('K-374', 'ID1 F2 wait-clear drawn without its car (= stop-kerb)', await gateOf(rewire('K-374', { fn: (h) => h.replace(/<div class="rs-ccar"[\s\S]*?<\/svg><\/div>/, '') }), 'ID1'), /draw the SAME frame/);
  // DA1 — landing round 1 (2026-09-23): the old routine's second look-left (drawn with the ↶ swing) in place of
  // wait-clear — a different FRAME but the same ACTION as card look-left: steps swappable -> "duplicate action"
  {
    const C5 = require('../templates/components-b5.js');
    const again = C5.rsCrossingCard({ step: 'look-left-again', w: 200, figH: 130, minFrameH: 196, box: { w: 64, h: 60 } });
    const figA = /<div class="rs-cfig"[\s\S]*?<\/svg><\/div>/.exec(again)[0];
    const fn = (h) => h.replace(/(data-lcs-step="wait-clear"[\s\S]*?)<div class="rs-ccar"[\s\S]*?<\/svg><\/div><div class="rs-cfig"[\s\S]*?<\/svg><\/div>/, (m, pre) => pre + figA);
    J('K-374', 'DA1 F2 a second look-left (swing arrow) in place of wait-clear', await gateOf(rewire('K-374', { fn }), 'DA1'), /duplicate action — card \d \(look-left\) and card \d \(wait-clear\)|duplicate action — card \d \(wait-clear\) and card \d \(look-left\)/);
  }
  // AT4 AT5 — F3 straight across / every line the same way
  const L = ['stop', 'yield', 'crossing', 'school', 'no-entry', 'signal-ahead'];
  J('G1-384', 'AT4 F3 every meaning straight across', await gateOf(rewire('G1-384', { plan: { left: L, right: L } }), 'AT4'), /6 pairs straight across/);
  J('G1-384', 'AT5 F3 every line one row down', await gateOf(rewire('G1-384', { plan: { left: L, right: [L[5], ...L.slice(0, 5)] } }), 'AT5'), /6 lines run the same way/);
  // AT6 — F4 three neighbouring cards of one class
  J('G2-360', 'AT6 F4 three neighbouring rule signs', await gateOf(rewire('G2-360', { plan: { order: ['stop', 'yield', 'no-bikes', 'crossing', 'no-pedestrians', 'school', 'signal-ahead', 'bike-warning'] } }), 'AT6'), /three neighbouring cards of one class/);
  // FR1 FR2 — the Vienna fixture sort with a filled red disc / with STOP
  const deStr = { strings: de.strings['sign-kinds'], locale: 'de' };
  const deOrder = ['children', 'no-vehicles', 'footpath', 'no-bikes', 'pedestrian-warning', 'bike-path'];            // 2 / 2 / 2
  const dePlain = await gateOf(rewire('G2-360', { block: de, plan: { order: deOrder } }), 'FR0', deStr);
  const deCtl = K.control('FR0 the Vienna fixture sort (control)', dePlain);
  K.judge('FR1 F4 a filled red disc (no-entry) on the sort', await gateOf(rewire('G2-360', { block: de, plan: { order: [...deOrder, 'no-entry'] } }), 'FR1', deStr), /a filled red disc/, deCtl);
  K.judge('FR2 F4 STOP on a Vienna sort', await gateOf(rewire('G2-360', { block: de, plan: { order: [...deOrder, 'stop'] } }), 'FR2', deStr), /a priority sign \(STOP \/ yield\) on a Vienna sort/, deCtl);
  K.judge('EQ2 F4 Vienna groups 3 / 3 / 2 (boxes = signs)', await gateOf(rewire('G2-360', { block: de, plan: { order: ['children', 'no-vehicles', 'footpath', 'no-bikes', 'pedestrian-warning', 'bike-path', 'no-pedestrians', 'signal-ahead'] } }), 'EQ2', deStr), /unequal group sizes warning 3 \/ prohibition 3 \/ mandatory 2/, deCtl);
  // MR1 — an F3 meaning printing its sign's word
  J('G1-384', 'MR1 F3 a meaning printing the sign\'s word', await gateOf(rewire('G1-384', { fn: (h) => h.replace(/(data-lcs-meaning="stop"[\s\S]*?<p class="rs-mtext"[^>]*>)[^<]*</, '$1Every car must STOP here.<') }), 'MR1'), /prints the stop sign's own word "STOP"/);
  // FLR1 — an F3 sign below the G1 floor
  J('G1-384', 'FLR1 F3 signs at s 70 (< 72)', await gateOf(rewire('G1-384', { cfg: { signS: 70 } }), 'FLR1'), /< the G1 floor 72/);
  // SP1-SP5 — the slack moved BETWEEN blocks at the one-line chrome
  const SP = [
    ['SP1 F1 fixed rows spread apart', 'K-373', (h) => h.replace(/grid-template-rows:repeat\(2,minmax\((\d+)px,1fr\)\)/, 'grid-template-rows:repeat(2,$1px);align-content:space-between')],
    ['SP2 F2 fixed rows spread apart', 'K-374', (h) => h.replace(/grid-template-rows:repeat\(2,minmax\((\d+)px,1fr\)\)/, 'grid-template-rows:repeat(2,$1px);align-content:space-between')],
    ['SP3 F3 items at their minimum, packed to the top', 'G1-384', (h) => h.split('style="flex:1 1 0;min-height:96px').join('style="flex:0 0 auto;min-height:80px').split('justify-content:stretch;').join('justify-content:flex-start;')],
    ['SP4 F4 card rows fixed, spread apart', 'G2-360', (h) => h.replace(/grid-template-rows:repeat\(2,minmax\((\d+)px,1fr\)\)/, 'grid-template-rows:repeat(2,$1px);align-content:space-between')],
    ['SP5 F5 rows fixed, spread apart', 'G2-361', (h) => h.replace(/grid-template-rows:repeat\(6,minmax\((\d+)px,1fr\)\)/, 'grid-template-rows:repeat(6,$1px);align-content:space-between')],
  ];
  for (const [name, id, fn] of SP) J(id, name, await gateOf(rewire(id, { fn }), name.split(' ')[0], { strings: CHROME.one }), /sparse: a \d+ px empty band/);
  // FL1 FL2 — FILL both ways: the F5 stage packed to the top at 814; the F4 cards too tall for the 677 body
  J('G2-361', 'FL1 F5 rows packed to the top at 814', await gateOf(rewire('G2-361', { fn: (h) => h.replace(/grid-template-rows:repeat\(6,minmax\((\d+)px,1fr\)\);row-gap:(\d+)px/, 'grid-template-rows:repeat(6,$1px);row-gap:$2px;align-content:start;flex:0 0 auto').replace('flex:1 1 auto;align-self:center;width:675px;display:grid', 'flex:0 0 auto;align-self:center;width:675px;display:grid') }), 'FL1', { strings: CHROME.one }), /FILL — the content ends at/);
  J('G2-360', 'FL2 F4 cards 300 px tall at 677', await gateOf(rewire('G2-360', { cfg: { cardMinH: 300 } }), 'FL2', { strings: CHROME.fi677 }), /FILL — the content runs \d+ px past the body/);
  // AP1-AP5 — an instruction naming apparatus the face does not print (validator rule 9, en)
  const AP = [
    ['AP1 F1 instruction names a box', 'colour-lights', 'Find the lamp with rays and color the box next to it.', /names "box", which is not on the colour-lights page/],
    ['AP2 F2 instruction names a line', 'crossing-steps', 'Draw a line from 1 to 5 to show how to cross the road.', /names "line", which is not on the crossing-steps page/],
    ['AP3 F3 instruction names a box', 'sign-meaning', 'Write the letter of each road sign in the box of its meaning.', /names "box", which is not on the sign-meaning page/],
    ['AP4 F4 instruction names a circle', 'sign-kinds', 'Circle the road signs of each group.', /names "circle", which is not on the sign-kinds page/],
    ['AP5 F5 instruction names a line', 'sign-quiz', 'Read each sentence and draw a line to the road sign that fits it.', /names "line", which is not on the sign-quiz page/],
  ];
  for (const [name, mode, ins, re] of AP) { const b = JSON.parse(JSON.stringify(en)); b.strings[mode].instruction = ins; K.judge(name, validateBank(b, 'en'), re, true); }
  return rows;
}

module.exports = { faceGate, FACES };
