/**
 * b6-healthy-habits-faces.js — the K-380 `healthy-habits` FACE gate (nt5-F Phase E; design
 * docs/worksheet-gen/b6-designs/K-380-healthy-habits.md §3 + §5; record _work/K-380-faces.md).
 * Called by qa/verify-b6-healthy-habits.js after the base gate (one browser, one checker, one poison log):
 * `faceGate({ page, K, quick, OUTDIR })` → report rows.
 *
 *   F1 K-382 hand-washing-steps · F2 G1-403 brushing-teeth · F3 G1-404 stop-the-germs · F4 G2-379 why-habits · F5 G1-405 habit-chart
 *
 * A. STRINGS — every face's i18n.en === the bank's strings[mode]; the band; one config for all three levels;
 *    the resolved d2 config carries `mode`; the chips / reasons / labels / day heads printed === the bank (+ calendar).
 * B. POOLED — 400 seeds per face (pure build): F1 no step in its own slot (0 %), no step in one slot > 35 %;
 *    F2 each phase in each reading slot 15-55 %; F3 the healthy tile left 40-60 % overall AND per row index;
 *    F4 a reason beside its own habit on 0 % of rows (fix round 2: a derangement) and each offset 1-4 in 10-40 %. The per-PAGE rules are asserted by verify() on every render.
 * C. RENDER — each face through the REAL pipeline at its own en chrome, a one-line chrome (814), the 722 fixture
 *    (3-line title + 3-line instruction) and the 677 fixture (a long fi title): verify() empty (it re-derives every
 *    answer from the drawn parts and carries SPARSE <= 40 + FILL >= 85 %), qa/lints.js clean; the GREYSCALE render
 *    (filter:grayscale(1)) still verifies.
 * D. POISONS — each must FAIL for its OWN reason (the untouched face is the control): P14 F1 rinse drawn without its
 *    falling bubbles · P14b / P14c F1 rinse without its suds, suds on wet · FO1 F1 printed in the routine's own order ·
 *    P15 F2 the spit brush held up again · P15b F2 plaque on the clean tooth · FD3 / FD4 F2 rinse-brush / open-tube put
 *    back (dropped fix round 2) · FW1 / FW2 F3 the water-only tile back, germs on the lather · FR3 / FR4 F4 one straight
 *    across, a constant shift · P16 F2 chip
 *    order varied in one cell · FS1 F2 a card's stamp swapped (the drawing wins) · FG1 F2 sorted by phase · P17 F3
 *    healthy side LRLR · FC1 F3 the spray added to the elbow cough (two unhealthy tiles) · FR1 F4 two reason cards'
 *    stamps swapped with the texts kept · FR2 F4 every reason straight across · P19 F5 34 tick squares · FD1 F5 a
 *    digit written in a label · SPn / FLn every face: slack opened above the stage (sparse) and the stage shrunk to
 *    its floors (fill) · APn an instruction naming apparatus the face does not print (validator rule 9).
 */
'use strict';
const path = require('path');
const { renderInstance } = require('../render/render-instance.js');
const { loadType } = require('../lib/load-types.js');
const { makeRng, instanceSeed } = require('../lib/rng.js');
const { CALENDAR } = require('../data/b2/calendar.js');
const DATA = require('../data/b6/healthy-habits.js');
const { COMMON } = DATA;

const FACES = [
  { id: 'K-382', mode: 'hand-washing-steps', band: 'K' },
  { id: 'G1-403', mode: 'brushing-teeth', band: 'G1' },
  { id: 'G1-404', mode: 'stop-the-germs', band: 'G1' },
  { id: 'G2-379', mode: 'why-habits', band: 'G2' },
  { id: 'G1-405', mode: 'habit-chart', band: 'G1' },
];
const CHROME = {
  one: { title: 'Healthy Habits', instruction: 'Look.' },
  de722: { title: 'Hygiene und Körperpflege: Hände waschen, Zähne putzen und Keime stoppen in der Schule', instruction: 'Schau dir jedes Bild genau an und überlege, was das Kind gerade macht, dann löse die Aufgabe so, wie es oben steht, und zeige es deiner Lehrkraft.' },
  fi677: { title: 'Hygienia ja terveelliset elintavat: kädet, hampaat, pöpöt ja viikon tavat koulussa ja kotona joka päivä', instruction: 'Katso jokaista kuvaa tarkasti ja mieti, mitä lapsi tekee, ja tee sitten tehtävä niin kuin yllä lukee, ja näytä lopuksi työsi opettajallesi.' },
};

async function render(page, spec, { strings, doctor, plan, name, OUTDIR, filter }) {
  const type = Object.create(spec);
  type.build = function (args, ctx) {
    const b = require('../lib/b6-common.js').bank('healthy-habits', 'en');
    const r = spec._buildWith.call(spec, { block: b, config: spec.difficulty[2], plan }, { locale: 'en' }, ctx);
    if (doctor) r.bodyHtml = doctor(r.bodyHtml);
    if (filter) r.bodyHtml = `<div style="flex:1 1 auto;display:flex;flex-direction:column;min-height:0;filter:${filter}">${r.bodyHtml}</div>`;
    return r;
  };
  const out = await renderInstance({ type, theme: null, difficulty: 2, locale: 'en', variant: 1, strings: strings || spec.i18n.en, page, outDir: OUTDIR, baseName: name });
  const m = await page.evaluate(() => {
    const body = document.querySelector('[data-lcs-body]').getBoundingClientRect();
    const t = document.querySelector('[data-lcs-title]'), i = document.querySelector('[data-lcs-instruction]');
    const reasons = [...document.querySelectorAll('[data-lcs-reason-for]')].map((c) => [c.dataset.lcsReasonFor, c.textContent.trim()]);
    return { bodyH: body.height, title: t.textContent.trim(), instr: i.textContent.trim(), text: document.querySelector('[data-ws-content]').innerText, reasons };
  });
  return { out, m };
}

function pooled(spec, face, n, ok) {
  const d = spec.difficulty[2], b = require('../lib/b6-common.js').bank('healthy-habits', 'en');
  const counts = {};
  const bump = (k) => { counts[k] = (counts[k] || 0) + 1; };
  for (let v = 1; v <= n; v++) {
    const rng = makeRng(instanceSeed({ typeId: face.id, theme: null, difficulty: 2, seedEpoch: 1, variant: v }));
    const r = spec._buildWith({ block: b, config: d }, { locale: 'en' }, { rng }).meta;
    if (face.mode === 'hand-washing-steps') r.order.split(',').forEach((st, i) => { bump(`${st}@${i}`); if (COMMON.handSteps[i] === st) bump('own'); });
    if (face.mode === 'brushing-teeth') r.kinds.split(',').forEach((k, i) => bump(`${COMMON.PHASE_OF[k]}@${i}`));
    if (face.mode === 'stop-the-germs') r.sides.split('').forEach((s, i) => { if (s === 'L') { bump('L'); bump(`L@${i}`); } });
    if (face.mode === 'why-habits') { const h = r.habits.split(','), q = r.reasons.split(','); h.forEach((x, i) => { if (q[i] === x) bump('straight'); bump(`off${((q.indexOf(x) - i) % 5 + 5) % 5}`); }); }
  }
  const pct = (k, of) => (counts[k] || 0) / of;
  const rows = [];
  if (face.mode === 'hand-washing-steps') {
    ok(!counts.own, `pooled F1: a step in its own reading slot on ${counts.own} pages`);
    let worst = 0; for (const st of COMMON.handSteps) for (let i = 0; i < 5; i++) worst = Math.max(worst, pct(`${st}@${i}`, n));
    ok(worst <= 0.35, `pooled F1: a step sits in one slot on ${(100 * worst).toFixed(1)} % of pages (> 35 %)`);
    rows.push(`F1 pooled ${n}: own slot 0 %, worst step-in-slot ${(100 * worst).toFixed(1)} % (<= 35)`);
  }
  if (face.mode === 'brushing-teeth') {
    let lo = 1, hi = 0; for (const p of ['before', 'during', 'after']) for (let i = 0; i < 7; i++) { const x = pct(`${p}@${i}`, n); lo = Math.min(lo, x); hi = Math.max(hi, x); }
    ok(lo >= 0.15 && hi <= 0.55, `pooled F2: a phase in one reading slot ${(100 * lo).toFixed(1)}..${(100 * hi).toFixed(1)} % (15..55)`);
    rows.push(`F2 pooled ${n}: phase-in-slot ${(100 * lo).toFixed(1)}..${(100 * hi).toFixed(1)} % (15..55)`);
  }
  if (face.mode === 'stop-the-germs') {
    const all = pct('L', 4 * n);
    ok(all >= 0.4 && all <= 0.6, `pooled F3: healthy left ${(100 * all).toFixed(1)} % overall (40..60)`);
    const per = [0, 1, 2, 3].map((i) => pct(`L@${i}`, n));
    per.forEach((x, i) => ok(x >= 0.4 && x <= 0.6, `pooled F3: healthy left ${(100 * x).toFixed(1)} % in row ${i + 1} (40..60)`));
    rows.push(`F3 pooled ${n}: healthy left ${(100 * all).toFixed(1)} % overall, per row ${per.map((x) => (100 * x).toFixed(0)).join('/')} % (40..60)`);
  }
  if (face.mode === 'why-habits') {
    // FIX ROUND 2: a DERANGEMENT on every seed (0 straight across), and no offset a tell (each of 1..4 in 10..40 %)
    const s = pct('straight', 5 * n);
    ok(s === 0, `pooled F4: a reason beside its own habit on ${(100 * s).toFixed(1)} % of rows (0: a derangement)`);
    const offs = [1, 2, 3, 4].map((o) => pct(`off${o}`, 5 * n));
    offs.forEach((x, i) => ok(x >= 0.1 && x <= 0.4, `pooled F4: reason offset ${i + 1} on ${(100 * x).toFixed(1)} % of rows (10..40)`));
    rows.push(`F4 pooled ${n}: reason straight across ${(100 * s).toFixed(1)} % of rows (0), offsets 1-4 ${offs.map((x) => (100 * x).toFixed(1)).join('/')} % (10..40)`);
  }
  return rows;
}

async function faceGate({ page, K, quick, OUTDIR, validateBank }) {
  const { ok } = K;
  const rows = [];
  const en = require('../lib/b6-common.js').bank('healthy-habits', 'en');
  const specs = {};
  for (const f of FACES) {
    const spec = loadType(f.id);
    specs[f.id] = spec;
    // A. strings / band / config
    ok(spec.i18n.en.title === en.strings[f.mode].title && spec.i18n.en.instruction === en.strings[f.mode].instruction, `${f.id}: i18n.en ≠ the bank strings.${f.mode}`);
    ok(spec.gradeBand === f.band, `${f.id}: gradeBand ${spec.gradeBand} ≠ ${f.band}`);
    ok(spec.difficulty[1] === spec.difficulty[2] && spec.difficulty[3] === spec.difficulty[2], `${f.id}: the three levels are not one config`);
    ok(spec.difficulty[2].mode === f.mode, `${f.id}: resolved d2 mode ${spec.difficulty[2].mode}`);
    try { const S = require('../i18n/strings.en.json'); ok(S[f.id] && S[f.id].title === spec.i18n.en.title, `${f.id}: i18n/strings.en.json does not carry the face (run i18n/build-en.js)`); } catch (e) { ok(false, `${f.id}: strings.en.json ${e.message}`); }
    // B. pooled
    rows.push(...pooled(spec, f, 400, ok));   // pooled tells need n=400 even in --quick: n=100 read 57 % on a page whose 400-seed rate is 51 % (raise n, never the threshold)
    // C. renders
    const own = await render(page, spec, { name: `${f.id}-d2-en`, OUTDIR });
    const chk = (tag, r) => { ok(!r.out.qa.verify.length, `${tag}: verify ${JSON.stringify(r.out.qa.verify.slice(0, 3))}`); ok(!r.out.qa.lints.length, `${tag}: lints ${JSON.stringify(r.out.qa.lints.slice(0, 3))}`); };
    chk(`${f.id} own`, own);
    for (const [k, t] of own.m.reasons) ok(t === en.reasons[k], `${f.id}: the reason card stamped ${k} prints "${t}"`);
    ok(own.m.title === en.strings[f.mode].title && own.m.instr === en.strings[f.mode].instruction, `${f.id}: printed title / instruction ≠ the bank`);
    // printed literals === the bank
    if (f.mode === 'brushing-teeth') for (const k of ['before', 'during', 'after']) ok(own.m.text.split('\n').filter((l) => l.trim() === en.phases[k]).length === 7, `${f.id}: the chip "${en.phases[k]}" is not printed once per card`);
    if (f.mode === 'why-habits') for (const h of COMMON.reasonD2) ok(own.m.text.includes(en.reasons[h]), `${f.id}: the reason for ${h} is not printed verbatim`);
    if (f.mode === 'habit-chart') {
      for (const h of COMMON.chartRows) ok(own.m.text.includes(en.labels[h]), `${f.id}: the label for ${h} is not printed verbatim`);
      const cal = CALENDAR.en, days = Array.from({ length: 7 }, (_, i) => cal.dayAbbr[(cal.weekStart + i) % 7]);
      const got = await page.evaluate(() => [...document.querySelectorAll('[data-lcs-day-head]')].map((e) => e.textContent));
      ok(got.join() === days.join(), `${f.id}: day heads ${got.join()} ≠ the calendar ${days.join()}`);
    }
    const line = [`${f.id} ${f.mode}: own chrome body ${own.m.bodyH.toFixed(0)} ${own.out.qa.verify.length + own.out.qa.lints.length ? 'FAIL' : 'clean'} · ${own.out.pngPath}`];
    for (const [cname, str] of Object.entries(CHROME)) {
      const r = await render(page, spec, { strings: str, name: `${f.id}-d2-chrome-${cname}`, OUTDIR });
      chk(`${f.id} chrome ${cname}`, r);
      line.push(`${cname} body ${r.m.bodyH.toFixed(0)} ${r.out.qa.verify.length + r.out.qa.lints.length ? 'FAIL ' + JSON.stringify(r.out.qa.verify.concat(r.out.qa.lints).slice(0, 2)) : 'clean'}`);
    }
    const g = await render(page, spec, { filter: 'grayscale(1)', name: `${f.id}-d2-greyscale`, OUTDIR });
    chk(`${f.id} greyscale`, g);
    line.push(`greyscale ${g.out.qa.verify.length + g.out.qa.lints.length ? 'FAIL' : 'clean'} · ${g.out.pngPath}`);
    rows.push(line.join(' · '));
  }

  // D. poisons
  // verify() + the literal check the page cannot make (a reason card's text is the bank's reason for its stamp)
  const literal = (r) => r.m.reasons.filter(([k, t]) => t !== en.reasons[k]).map(([k, t]) => `reason card stamped "${k}" prints "${t}" (not the bank's reason for ${k})`);
  const V = async (id, opts) => { const r = await render(page, specs[id], { name: `${id}-poison`, OUTDIR, ...opts }); return [...r.out.qa.verify, ...literal(r)]; };
  const ctl = {};
  for (const f of FACES) ctl[f.id] = K.control(`F0 ${f.id} control`, await V(f.id, {}));
  const J = async (name, id, opts, re) => K.judge(name, await V(id, opts), re, ctl[id]);
  // FIX ROUND 2 — the suds rule, both directions
  await J('P14b F1 rinse drawn without the suds on its hands', 'K-382', { doctor: (h) => h.replace(/(<g data-lcs-hands="rinse"[\s\S]*?)<g data-lcs-part="suds">[\s\S]*?<\/g>/, '$1') }, /rinse with 0 soap suds/);
  await J('P14c F1 suds drawn on the wet hands', 'K-382', { doctor: (h) => { const sd = /<g data-lcs-part="suds">[\s\S]*?<\/g>/.exec(h)[0]; return h.replace(/(<g data-lcs-hands="wet"[^>]*>)/, `$1${sd}`); } }, /"wet" draws soap suds/);
  await J('P14 F1 rinse drawn without its falling bubbles', 'K-382', { doctor: (h) => h.replace(/(<g data-lcs-hands="rinse"[\s\S]*?)<g data-lcs-part="bubbles">[\s\S]*?<\/g>/, '$1') }, /reads as wet|distinct steps|draw 4 distinct/);
  await J('FO1 F1 printed in the routine order', 'K-382', { plan: { order: COMMON.handSteps.slice() } }, /own reading slot/);
  // FIX ROUND 2: rinse-brush / open-tube are DROPPED (two right answers); the spit brush lies down; the state cards
  await J('P15 F2 the spit brush held up above the head again', 'G1-403', { doctor: (h) => h.replace(/(<g data-lcs-brush="spit"[\s\S]*?)(<g data-lcs-part="brush")/, '$1<g transform="translate(-10 -62)">$2').replace(/(<g data-lcs-brush="spit"[\s\S]*?)(<g data-lcs-part="drops">)/, '$1</g>$2') }, /holds the brush up/);
  await J('P15b F2 plaque drawn on the clean tooth (both cues)', 'G1-403', { doctor: (h) => { const pq = /<g data-lcs-part="plaque">[\s\S]*?<\/g>/.exec(h)[0]; return h.replace(/(<g data-lcs-brush="clean-teeth"[^>]*>)/, `$1${pq}`); } }, /no brushing card can be read/);
  await J('FD3 F2 the dropped rinse-brush card put back', 'G1-403', { plan: { kinds: ['paste-on-brush', 'chewing', 'spit', 'outside', 'dirty-teeth', 'inside', 'rinse-brush'] } }, /dropped card "rinse-brush"/);
  await J('FD4 F2 the dropped open-tube card put back', 'G1-403', { plan: { kinds: ['open-tube', 'chewing', 'spit', 'outside', 'paste-on-brush', 'inside', 'clean-teeth'] } }, /dropped card "open-tube"/);
  await J('P16 F2 chip order varied in one cell', 'G1-403', { doctor: (h) => h.replace(/(<span class="hh-chip" data-lcs-chip="before"[^>]*>[^<]*<\/span>)(<span class="hh-chip" data-lcs-chip="during"[^>]*>[^<]*<\/span>)/, '$2$1') }, /chips are not identical/);
  await J('FS1 F2 a card stamp swapped (the drawing wins)', 'G1-403', { doctor: (h) => h.replace('data-lcs-brush="spit"', 'data-lcs-brush="open-tube"') }, /drawn "spit", stamped "open-tube"/);
  await J('FD2 F2 the dropped brush-in-cup card put back', 'G1-403', { plan: { kinds: ['open-tube', 'chewing', 'spit', 'outside', 'paste-on-brush', 'inside', 'brush-in-cup'] } }, /dropped card "brush-in-cup"/);
  await J('FG1 F2 sorted by phase (a staircase)', 'G1-403', { plan: { kinds: ['paste-on-brush', 'dirty-teeth', 'chewing', 'outside', 'inside', 'spit', 'clean-teeth'] } }, /same-phase neighbours|staircase/);
  await J('P17 F3 healthy side LRLR', 'G1-404', { plan: { keys: ['cough', 'tissue', 'cup', 'soap'], sides: ['L', 'R', 'L', 'R'] } }, /alternates LRLR/);
  const spray = '<g data-lcs-part="spray"><circle cx="72" cy="14" r="2.2" fill="#3A3530"/><circle cx="78" cy="18" r="2.2" fill="#3A3530"/></g>';
  await J('FC1 F3 the spray added to the elbow cough', 'G1-404', { doctor: (h) => h.replace(/(<g data-lcs-pictogram="habit" data-lcs-pose="cough-elbow"[^>]*>)/, `$1${spray}`) }, /0 healthy tiles/);
  // FIX ROUND 2 — F3 the old water-only tile back (two right answers) · germs on the lather tile; F4 derangement
  const HPm = require('../primitives/habit-pictogram.js');
  const inner = (st) => /<g data-lcs-hands="[^"]+">[\s\S]*<\/g>(?=<\/svg>)/.exec(HPm.handsView({ state: st }).svg)[0];
  await J('FW1 F3 the water-only tile back as the other soap tile', 'G1-404', { doctor: (h) => h.replace(/<g data-lcs-hands="hands-dirty">[\s\S]*?<\/g>(?=<\/svg>)/, inner('hands-water-only')) }, /itself hand washing under running water/);
  await J('FW2 F3 germs drawn on the lather tile', 'G1-404', { doctor: (h) => { const gm = /<g data-lcs-part="germs">[\s\S]*?<\/g>/.exec(h)[0]; return h.replace(/(<g data-lcs-hands="hands-soap">)/, `$1${gm}`); } }, /healthy tiles|exactly one/);
  const R = COMMON.reasonD2;
  await J('FR3 F4 one reason straight across (the shipped 2026-09-23 rule allowed it)', 'G2-379', { plan: { habits: R.slice(), reasons: [R[0], R[2], R[3], R[4], R[1]] } }, /1 reason\(s\) sit straight across/);
  await J('FR4 F4 every reason one row below its habit (a constant shift)', 'G2-379', { plan: { habits: R.slice(), reasons: [R[4], R[0], R[1], R[2], R[3]] } }, /constant shift/);
  await J('FR1 F4 two reason stamps swapped', 'G2-379', { doctor: (h) => { const m = [...h.matchAll(/data-lcs-reason-for="([^"]+)"/g)]; if (m.length < 2) return h; const [a, b] = [m[0][1], m[1][1]]; return h.replace(`data-lcs-reason-for="${a}"`, 'data-lcs-reason-for="__A__"').replace(`data-lcs-reason-for="${b}"`, `data-lcs-reason-for="${a}"`).replace('data-lcs-reason-for="__A__"', `data-lcs-reason-for="${b}"`); } }, /prints ".*" \(not the bank's reason/);
  await J('FR2 F4 every reason straight across', 'G2-379', { plan: { habits: COMMON.reasonD2.slice(), reasons: COMMON.reasonD2.slice() } }, /5 reason\(s\) sit straight across/);
  await J('P19 F5 34 tick squares', 'G1-405', { doctor: (h) => h.replace(/<span data-lcs-tick [^>]*><\/span>/, '') }, /34 tick squares/);
  // FIX ROUND 1 (fr panel): long native labels wrap balanced (no short word stranded at a line end) — control + poison
  const LONG = ['se laver les mains', 'die Hände waschen', 'pestä kädet hyvin', 'børste tænderne', 'lavarsi i denti'];
  const { glueShortWords } = require('../templates/components-b6/healthy-habits.js');
  const LONGP = [...LONG, 'lavar as mãos'];
  const longLabels = (h) => { let i = 0; return h.replace(/(<span data-lcs-row-label[^>]*>)([\s\S]*?)(<\/span><\/div>)/g, (m, a, b, c) => a + glueShortWords(LONGP[i++ % LONGP.length]) + c); };
  const longLabelsRaw = (h) => { let i = 0; return h.replace(/(<span data-lcs-row-label[^>]*>)([\s\S]*?)(<\/span><\/div>)/g, (m, a, b, c) => a + LONGP[i++ % LONGP.length] + c); };
  const cLong = K.control('LW0 F5 with long fr / de / fi / da / it labels (control)', await V('G1-405', { doctor: longLabels, name: 'G1-405-long-labels' }));
  K.judge('LW1 F5 long labels, the short-word glue AND the balanced wrap removed', await V('G1-405', { doctor: (h) => longLabelsRaw(h).replace(/text-wrap:balance/g, 'text-wrap:wrap') }), /leaves the short word/, cLong);
  await J('FD1 F5 a digit in a label', 'G1-405', { doctor: (h) => h.replace(/(<span data-lcs-row-label[^>]*>)([^<]*)/, '$1$2 3') }, /digit/);
  for (const f of FACES) {
    await J(`SP ${f.id} 90 px opened above the stage (sparse)`, f.id, { strings: CHROME.one, doctor: (h) => h.replace('style="flex:1 1 auto;display:flex;flex-direction:column;min-height:0;"', 'style="flex:1 1 auto;display:flex;flex-direction:column;min-height:0;padding-top:90px;box-sizing:border-box"') }, /sparse: a \d+ px blank band/);
    await J(`FL ${f.id} the stage shrunk to its floors (fill)`, f.id, { strings: CHROME.one, doctor: (h) => h.replace(/minmax\((\d+)px,1fr\)/g, '$1px').replace('style="flex:1 1 auto;display:flex;flex-direction:column;min-height:0;"', 'style="flex:0 0 auto;display:flex;flex-direction:column;min-height:0;"').replace(/class="hh-(steps|phases|pairs|match|chart)" style="flex:1 1 auto;/, 'class="hh-$1" style="flex:0 0 auto;') }, /fill: the content ends at|sparse/);
  }
  // AP — an instruction naming apparatus the face does not print (validator rule 9), one per face
  const APS = { 'hand-washing-steps': 'Draw a line from each picture to its number.', 'brushing-teeth': 'Colour the box for each picture.', 'stop-the-germs': 'Write the number of the healthy picture in the box.', 'why-habits': 'Circle the word for each picture.', 'habit-chart': 'Draw a line to each day.' };
  const ctlBank = K.control('AP0 the en bank (control)', validateBank(en, 'en'));
  for (const [mode, ins] of Object.entries(APS)) {
    const bad = JSON.parse(JSON.stringify(en)); bad.strings[mode].instruction = ins;
    K.judge(`AP ${mode}: "${ins}"`, validateBank(bad, 'en'), new RegExp(`rule 9: ${mode} instruction`), ctlBank);
  }
  return rows;
}

module.exports = { faceGate, FACES, CHROME };
