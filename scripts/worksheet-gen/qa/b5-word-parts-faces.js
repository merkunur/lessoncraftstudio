/**
 * b5-word-parts-faces.js — the G2-359 `word-parts` FACE gate (nt10-E Phase E; design
 * docs/worksheet-gen/b5-designs/G2-359-word-parts.md §3 + §5; record _work/G2-359-faces.md).
 * Called by qa/verify-b5-word-parts.js after the base gate (one browser, one assertion log, one poison log):
 * `faceGate({ page, ok, judge, validateBank, quick, OUT })` -> report rows.
 *
 *   F1 G1-397 picture-family · F2 G2-375 root-word · F3 G2-376 prefix-key · F4 G3-398 who-does-it · F5 G3-399 family-in-sentence
 *
 * A. STRINGS — every face's i18n.en === the bank's strings[mode]; the band (G1 / G2 / G2 / G3 / G3); one config
 *    for all three levels; i18n/strings.en.json carries each face; no string anywhere says "word famil".
 * B. SWEEP — 20 seeds per face (--quick 5): every page composes; the POOLED position tells (F1 member slot per
 *    card, F3 answer per row) <= 0.6 over the full 20; the refused (locale, face) pairs THROW (es/fr who-does-it,
 *    fi prefix-key) while the same block composes for en (the control).
 * C. RENDER — each face through the REAL pipeline at its own en chrome, a one-line chrome (814), the 722 fixture
 *    (3-line title + 150-char instruction) and the 677 fixture (4-line fi title): verify() empty (it re-derives
 *    every answer from the stamps and the bank), qa/lints.js clean, SPARSE (no blank band > 40 px between the
 *    INK of consecutive blocks of any stack), FILL (content bottom >= 85 % of the body at 814; inside the body
 *    at every chrome). A greyscale copy of each own-chrome PNG is written for the reader.
 * D. POISONS — each must FAIL for its OWN reason (the untouched face is the control): PR2 an F2 open stone
 *    printing its root · PR3 F1 member slots 012012 (staircase) · PR9 an F5 frame "an {gap}" · SL1 F1 all members
 *    in slot 0 · WR1 F2 two cards of one family · PX1 an F3 gloss printing its prefix · AT1 F3 answers grouped ·
 *    AT2 F3 answers cycling re/pre/mis · SM1 F4 singer + musician · AN1 F4 a base printing its answer · DR1 F5
 *    a course in sentence order (no derangement) · FLR1 F1 picture 60 < 72 · SP1-SP5 slack moved between blocks
 *    at 814 · FL1 FL2 FILL both ways · AP1-AP5 an instruction naming apparatus the face does not print ·
 *    RF1-RF3 the refused faces · P20 a F1 look-alike containing its root · P21 an F1 member "sunflower".
 */
'use strict';
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { renderInstance } = require('../render/render-instance.js');
const { loadType } = require('../lib/load-types.js');
const { makeRng, instanceSeed } = require('../lib/rng.js');
const bankMod = require('../data/b5/word-parts.js');

const FACES = [
  { id: 'G1-397', mode: 'picture-family', band: 'G1' },
  { id: 'G2-375', mode: 'root-word', band: 'G2' },
  { id: 'G2-376', mode: 'prefix-key', band: 'G2' },
  { id: 'G3-398', mode: 'who-does-it', band: 'G3' },
  { id: 'G3-399', mode: 'family-in-sentence', band: 'G3' },
];
const FILL_MIN = 0.85, SPARSE_MAX = 40;
const CHROME = {
  one: { title: 'Root Words', instruction: 'Write each word.', body: 830 },
  de722: { title: 'Wortbausteine: Wortstamm finden, Vorsilben wählen und Wörter richtig zusammensetzen', instruction: 'Lies jedes Wort genau, suche den Teil, den alle Wörter gemeinsam haben, und schreibe den Wortstamm sauber in den leeren Stein darunter hinein.', body: 722 },
  fi677: { title: 'Sanan osat: kantasana, etuliitteet ja johdokset, etsi yhteinen osa ja kirjoita kantasana huolellisesti oikeaan paikkaan', instruction: 'Lue jokainen sana, etsi osa, joka on kaikissa sanoissa, ja kirjoita kantasana tyhjään kiveen sanojen alle.', body: 677 },
};

/** Ink-box geometry: SPARSE bands inside every [data-lcs-stack] and the FILL bottom. */
async function measure(page) {
  return page.evaluate(() => {
    const R = (e) => e.getBoundingClientRect();
    const root = document.querySelector('[data-lcs-type="G2-359"]');
    const body = R(document.querySelector('.ws-body'));
    const visible = (el) => {
      const cs = getComputedStyle(el);
      return (cs.backgroundColor && cs.backgroundColor !== 'rgba(0, 0, 0, 0)' && cs.backgroundColor !== 'transparent') || parseFloat(cs.borderTopWidth) > 0 || parseFloat(cs.borderLeftWidth) > 0;
    };
    const ink = (el) => {
      let t = Infinity, b = -Infinity, l = Infinity, r = -Infinity;
      const add = (rc) => { if (rc.width <= 0 || rc.height <= 0) return; t = Math.min(t, rc.top); b = Math.max(b, rc.bottom); l = Math.min(l, rc.left); r = Math.max(r, rc.right); };
      const walk = (e) => {
        if (e instanceof SVGElement) { add(R(e)); return; }
        if (e.tagName === 'IMG') { add(R(e)); return; }
        if (visible(e)) add(R(e));
        for (const n of e.childNodes) {
          if (n.nodeType === 3 && n.textContent.trim()) { const rg = document.createRange(); rg.selectNodeContents(n); add(rg.getBoundingClientRect()); }
          else if (n.nodeType === 1) walk(n);
        }
      };
      walk(el);
      return { t, b, l, r };
    };
    const bands = [];
    for (const st of [root, ...root.querySelectorAll('[data-lcs-stack]')].filter((e) => e.matches('[data-lcs-stack]'))) {
      const items = [...st.querySelectorAll('[data-lcs-si]')].filter((x) => x.parentElement.closest('[data-lcs-stack]') === st)
        .map((x) => ({ x, k: ink(x) })).filter((o) => o.k.b > o.k.t);
      for (const o of items) {
        let best = null;
        for (const q of items) if (q !== o && q.k.b <= o.k.t + 0.5 && q.k.r > o.k.l + 1 && q.k.l < o.k.r - 1 && (!best || q.k.b > best.k.b)) best = q;
        if (best) bands.push({ where: `${st.dataset.lcsStack}`, px: o.k.t - best.k.b });
      }
    }
    const all = ink(root);
    const firstTop = all.t - body.top;
    const titleEl = document.querySelector('[data-lcs-title]');
    const titleLines = titleEl ? Math.round(R(titleEl).height / parseFloat(getComputedStyle(titleEl).lineHeight)) : 0;
    return { body: { t: body.top, h: body.height, b: body.bottom }, contentBottom: all.b, firstTop, bands, titleLines,
      title: titleEl && titleEl.textContent, instr: (document.querySelector('[data-lcs-instruction]') || {}).textContent };
  });
}
function geomFindings(name, m) {
  const f = [];
  const worst = m.bands.reduce((a, b) => (b.px > a.px ? b : a), { px: -Infinity, where: '' });
  if (worst.px > SPARSE_MAX + 0.5) f.push(`${name}: sparse: a ${Math.round(worst.px)} px empty band inside ${worst.where} (> ${SPARSE_MAX})`);
  if (m.firstTop > SPARSE_MAX + 0.5) f.push(`${name}: sparse: the stage starts ${Math.round(m.firstTop)} px below the body top (not top-anchored)`);
  const fill = (m.contentBottom - m.body.t) / m.body.h;
  if (m.body.h >= 800 && fill < FILL_MIN) f.push(`${name}: FILL — the content ends at ${(fill * 100).toFixed(1)} % of the ${Math.round(m.body.h)} px body (< ${FILL_MIN * 100} %)`);
  if (m.contentBottom > m.body.b + 0.5) f.push(`${name}: FILL — the content runs ${Math.round(m.contentBottom - m.body.b)} px past the body`);
  return f;
}

async function faceGate({ page, ok, judge, validateBank, quick, OUT }) {
  const rows = [];
  const en = bankMod.WORD_PARTS.en;
  const TYPES = Object.fromEntries(FACES.map((x) => [x.id, loadType(x.id)]));
  const strEn = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'i18n', 'strings.en.json'), 'utf8'));
  // A. strings + bands + the owned head
  for (const x of FACES) {
    const t = TYPES[x.id];
    ok(t.i18n.en.title === en.strings[x.mode].title && t.i18n.en.instruction === en.strings[x.mode].instruction, `${x.id}: i18n.en ${JSON.stringify(t.i18n.en)} ≠ the bank strings.${x.mode}`);
    ok(t.gradeBand === x.band, `${x.id}: gradeBand ${t.gradeBand} ≠ ${x.band}`);
    ok(t.difficulty[2].mode === x.mode && t.difficulty[1] === t.difficulty[2] && t.difficulty[3] === t.difficulty[2], `${x.id}: difficulty is not one ${x.mode} config for all three levels`);
    ok(!!strEn[x.id] && strEn[x.id].title === t.i18n.en.title, `${x.id}: i18n/strings.en.json ≠ the face title (run node i18n/build-en.js)`);
    for (const v of [t.i18n.en.title, t.i18n.en.instruction, strEn[x.id] && JSON.stringify(strEn[x.id])]) ok(!/word famil/i.test(v || ''), `${x.id}: "${v}" says "word famil…" (owned by another type)`);
  }
  const rewire = (id, { block = en, fn, cfg, plan } = {}) => Object.assign(Object.create(TYPES[id]), { build(args, ctx) {
    const out = TYPES[id]._buildWith(block, { ...TYPES[id].difficulty[2], ...(cfg || {}) }, { locale: args.locale }, { ...ctx, facePlan: plan });
    if (fn) out.bodyHtml = fn(out.bodyHtml);
    return out;
  } });

  // B. sweep + refusals
  const SEEDS = quick ? 5 : 20;
  for (const x of FACES) {
    const pos = []; let pages = 0;
    const tally = (i, v) => { pos[i] = pos[i] || {}; pos[i][v] = (pos[i][v] || 0) + 1; };
    const seen = new Set();
    for (let v = 1; v <= SEEDS; v++) {
      const rng = makeRng(instanceSeed({ typeId: x.id, theme: null, difficulty: 2, seedEpoch: 1, variant: v }));
      let out;
      try { out = TYPES[x.id].build({ difficulty: 2, locale: 'en' }, { rng }); } catch (e) { ok(false, `${x.id} seed ${v}: threw ${e.message}`); continue; }
      pages++; seen.add(JSON.stringify(out.meta));
      if (x.mode === 'picture-family') out.meta.slots.forEach((s, i) => tally(i, s));
      if (x.mode === 'prefix-key') out.meta.answers.forEach((a, i) => tally(i, a));
    }
    ok(seen.size === pages, `${x.id}: ${seen.size} distinct pages of ${pages}`);
    const shares = pos.map((p) => { const t = Object.values(p).reduce((a, b) => a + b, 0); return Math.max(...Object.values(p)) / t; });
    const worst = shares.length ? Math.max(...shares) : 0;
    if (SEEDS >= 20 && shares.length) ok(worst <= 0.6, `${x.id}: a pooled position share ${worst.toFixed(2)} > 0.6 (${JSON.stringify(pos)})`);
    rows.push(`face sweep ${x.id} ${x.mode}: ${pages}/${SEEDS} distinct pages composed under the per-page rules${shares.length ? `; worst pooled per-position share ${worst.toFixed(2)} (<= 0.6)` : ''}`);
  }
  const refuses = (id, loc) => { try { TYPES[id]._buildWith(en, TYPES[id].difficulty[2], { locale: loc }, { rng: makeRng('rf') }); return null; } catch (e) { return e.message; } };
  for (const [name, id, loc] of [['RF1 es who-does-it', 'G3-398', 'es'], ['RF2 fr who-does-it', 'G3-398', 'fr'], ['RF3 fi prefix-key', 'G2-376', 'fi']]) {
    const m = refuses(id, loc);
    judge(name, m ? [m] : [], new RegExp(`${loc} REFUSES the (who-does-it|prefix-key) face`));
  }
  ok(!refuses('G3-398', 'en') && !refuses('G2-376', 'en'), 'refusal control: the same block composes both faces for en');

  // C. renders
  const renderFace = async (type, baseName, opts = {}) => {
    const out = await renderInstance({ type, theme: null, difficulty: 2, locale: 'en', variant: opts.variant, page, outDir: OUT, baseName, strings: opts.strings });
    const m = await measure(page);
    return { verify: out.qa.verify, lints: out.qa.lints, m, png: out.pngPath };
  };
  const findingsOf = (name, r) => [...r.verify.map((v) => `verify: ${v}`), ...r.lints.map((v) => `lint: ${v}`), ...geomFindings(name, r.m)];
  for (const x of FACES) {
    const line = [];
    for (const [tag, opts] of [['own', {}], ['one', { strings: CHROME.one }], ['de722', { strings: CHROME.de722 }], ['fi677', { strings: CHROME.fi677 }]]) {
      const r = await renderFace(TYPES[x.id], `${x.id}-gate-${tag}`, opts);
      const f = findingsOf(`${x.id} ${tag}`, r);
      for (const v of f) ok(false, `${x.id} ${tag}: ${v}`);
      if (opts.strings) ok(r.m.body.h <= opts.strings.body + 0.5, `${x.id} ${tag}: body ${Math.round(r.m.body.h)} > ${opts.strings.body} (the fixture did not squeeze)`);
      if (tag === 'fi677') ok(r.m.titleLines >= 4, `${x.id} fi677: the stress title wraps to ${r.m.titleLines} lines (< 4)`);
      if (tag === 'own') {
        ok(r.m.title === TYPES[x.id].i18n.en.title && r.m.instr === TYPES[x.id].i18n.en.instruction, `${x.id}: the printed title / instruction ≠ the bank`);
        await sharp(r.png).greyscale().toFile(path.join(OUT, `${x.id}-gate-own-grey.png`));
      }
      const wb = r.m.bands.length ? Math.max(...r.m.bands.map((b) => b.px)) : 0;
      line.push(`${tag} body ${Math.round(r.m.body.h)} fill ${((r.m.contentBottom - r.m.body.t) / r.m.body.h * 100).toFixed(1)}% band ${Math.round(wb)} ${f.length ? 'FINDINGS ' + f.length : 'clean'}`);
    }
    rows.push(`face render ${x.id} ${x.mode}: ${line.join(' · ')}`);
  }

  // D. poisons
  const gateOf = async (type, name, opts = {}) => { try { return findingsOf(name, await renderFace(type, `G2-359-face-poison-${name}`, opts)); } catch (e) { return [`threw: ${e.message}`]; } };
  const controls = {};
  for (const x of FACES) for (const [tag, strings] of [['ctl', undefined], ['ctl-one', CHROME.one]]) {
    const c = await gateOf(TYPES[x.id], `${x.id}-${tag}`, { strings });
    ok(!c.length, `face poison control ${x.id} ${tag}: ${c.slice(0, 3).join(' | ')}`);
    controls[x.id] = !c.length && controls[x.id] !== false;
  }
  const J = (id, name, findings, re) => judge(name + (controls[id] ? '' : ' [CONTROL DIRTY]'), controls[id] ? findings : [], re);
  const PF = ['sun', 'cloud', 'grass', 'hand', 'drum', 'fish'];
  // PR3 — F1 member slots in a staircase 012012; SL1 — every member in slot 0
  J('G1-397', 'PR3 F1 member slots 012012 (staircase)', await gateOf(rewire('G1-397', { plan: { families: PF, slots: [0, 1, 2, 0, 1, 2] } }), 'PR3'), /member slots run in a staircase \(012012\)/);
  J('G1-397', 'SL1 F1 every member in slot 0', await gateOf(rewire('G1-397', { plan: { families: PF, slots: [0, 0, 0, 0, 0, 0] } }), 'SL1'), /member sits in slot 0 on 6 of 6 cards/);
  // FLR1 — the picture under the G1 floor (the composer guard fires)
  J('G1-397', 'FLR1 F1 picture 60 px (< 72)', await gateOf(rewire('G1-397', { cfg: { picPx: 60 } }), 'FLR1'), /below the G1 floors/);
  // PR2 — an F2 open stone printing its root
  J('G2-375', 'PR2 F2 open stone printing its root', await gateOf(rewire('G2-375', { fn: (h) => h.replace(/(<section class="ws-card" data-lcs-card="2"[\s\S]*?data-lcs-rw-stone="" data-lcs-root="([^"]+)">)/, '$1<span style="font-size:18px">$2</span>') }), 'PR2'), /open stone is not empty|printed on an open card/);
  // WR1 — two cards of one family
  J('G2-375', 'WR1 F2 two cards of one family', await gateOf(rewire('G2-375', { plan: { families: ['cheer', 'help', 'play', 'care', 'use', 'joy', 'fear', 'act', 'help'] } }), 'WR1'), /two cards share a family/);
  // PX1 — an F3 gloss printing its prefix; AT1 grouped; AT2 cycling
  J('G2-376', 'PX1 F3 a gloss printing its prefix', await gateOf(rewire('G2-376', { fn: (h) => h.replace(/(<p data-lcs-gloss=""[^>]*>)/, '$1re: ') }), 'PX1'), /the prefix "re" is printed in the rows/);
  J('G2-376', 'AT1 F3 answers grouped by prefix', await gateOf(rewire('G2-376', { plan: { rows: ['read', 'fill', 'heat', 'view', 'spell', 'count', 'place', 'behave'] } }), 'AT1'), /grouped by prefix|three consecutive rows/);
  J('G2-376', 'AT2 F3 answers cycling re/pre/mis', await gateOf(rewire('G2-376', { plan: { rows: ['read', 'heat', 'spell', 'fill', 'view', 'count', 'tell', 'pay'] } }), 'AT2'), /cycle with period 3/);
  // SM1 — singer and musician on one page; AN1 — a base brick printing its answer
  {
    // round 1 dropped musician from the en agents (-ian breaks the -er face); the poison puts it back to build the page
    const b = JSON.parse(JSON.stringify(en)); b.agents.push({ key: 'musician', base: 'music', answer: { any: 'musician' } });
    J('G3-398', 'SM1 F4 singer + musician', await gateOf(rewire('G3-398', { block: b, plan: { people: ['singer', 'musician', 'baker', 'teacher', 'farmer', 'gardener', 'athlete', 'ballerina'] } }), 'SM1'), /singer and musician on one page/);
  }
  J('G3-398', 'AN1 F4 a base brick printing its answer', await gateOf(rewire('G3-398', { fn: (h) => h.replace(/(data-lcs-person="baker"[\s\S]*?data-lcs-brick-text="">)bake</, '$1baker<') }), 'AN1'), /the answer "baker" is printed|base brick prints "baker"/);
  // PR9 — an F5 frame with "an {gap}"; DR1 — a course in sentence order
  {
    const b = JSON.parse(JSON.stringify(en)); b.sentences.act[1].frame = 'She is an {gap} in the school play.';
    J('G3-399', 'PR9 F5 gap after an agreeing article', await gateOf(rewire('G3-399', { block: b, plan: { blocks: ['act', 'play'] } }), 'PR9'), /an article \("a"\/"an"\) before the gap/);
    const ss = en.sentences;
    J('G3-399', 'DR1 F5 a course in sentence order', await gateOf(rewire('G3-399', { plan: { blocks: ['act', 'play'], courses: [ss.act.map((x) => x.word), ss.play.map((x) => x.word).reverse()] } }), 'DR1'), /not a derangement/);
  }
  // SP1-SP5 — slack moved BETWEEN blocks at the one-line chrome
  const SP = [
    ['SP1 F1 bricks spread down the card', 'G1-397', (h) => h.split('flex:1 1 auto;min-height:0;padding-top:18px;gap:6px').join('flex:1 1 auto;min-height:0;padding-top:18px;gap:6px;justify-content:space-between').split('display:flex;flex:1 1 auto;width:100%;min-height:88px').join('display:flex;flex:0 0 auto;width:100%;height:88px')],
    ['SP2 F2 card rows spread apart', 'G2-375', (h) => h.replace(/grid-template-rows:repeat\(3,minmax\((\d+)px,1fr\)\)/, 'grid-template-rows:repeat(3,$1px);align-content:space-between')],
    // (rows spread with space-between measure ~38 px at 814: this face holds little slack, so the poison moves ALL of it under the key)
    ['SP3 F3 rows dropped away from the key', 'G2-376', (h) => h.replace(/grid-template-rows:repeat\(8,minmax\((\d+)px,1fr\)\)/, 'grid-template-rows:repeat(8,$1px);align-content:end')],
    ['SP4 F4 card rows spread apart', 'G3-398', (h) => h.replace(/grid-template-rows:repeat\(4,minmax\((\d+)px,1fr\)\)/, 'grid-template-rows:repeat(4,$1px);align-content:space-between')],
    ['SP5 F5 sentences pushed away from the stone', 'G3-399', (h) => h.split('display:flex;flex-direction:column;gap:0;').join('display:flex;flex-direction:column;justify-content:space-between;gap:0;').split('row-gap:6px;flex:1 1 auto;min-height:0">').join('row-gap:6px;flex:0 0 auto">')],
  ];
  for (const [name, id, fn] of SP) J(id, name, await gateOf(rewire(id, { fn }), name.split(' ')[0], { strings: CHROME.one }), /sparse: a \d+ px empty band/);
  // FL1 FL2 — FILL both ways
  J('G3-398', 'FL1 F4 cards packed to the top at 814', await gateOf(rewire('G3-398', { fn: (h) => h.replace(/grid-template-rows:repeat\(4,minmax\((\d+)px,1fr\)\)/, 'grid-template-rows:repeat(4,$1px);align-content:start') }), 'FL1', { strings: CHROME.one }), /FILL — the content ends at/);
  J('G2-376', 'FL2 F3 rows 80 px tall at 677', await gateOf(rewire('G2-376', { cfg: { rowH: 80 } }), 'FL2', { strings: CHROME.fi677 }), /FILL — the content runs \d+ px past the body/);
  // AP1-AP5 — an instruction naming apparatus the face does not print (validator rule 14b, en)
  const AP = [
    ['AP1 F1 instruction names a line', 'picture-family', 'Name each picture, then draw a line to the one word above it that is built from that picture word.', /names "line", which is not on the picture-family page/],
    ['AP2 F2 instruction names a box', 'root-word', 'Circle the part the three words share and write that root word in the empty box of the stone.', /names "box", which is not on the root-word page/],
    ['AP3 F3 instruction names a picture', 'prefix-key', 'Read what each new word means, find its prefix in the key by the picture and write it in the empty piece.', /names "picture", which is not on the prefix-key page/],
    ['AP4 F4 instruction names a sentence', 'who-does-it', 'Look at each person at work, read the word and the sentence, and write the person word in the empty brick.', /names "sentence", which is not on the who-does-it page/],
    ['AP5 F5 instruction names a key', 'family-in-sentence', 'Use the key to write each of the four words on the stone into the sentence it fits.', /names "key", which is not on the family-in-sentence page/],
  ];
  for (const [name, mode, ins, re] of AP) { const b = JSON.parse(JSON.stringify(en)); b.strings[mode].instruction = ins; judge(name, validateBank(b, 'en'), re); }
  // P20 P21 — F1 bank poisons
  { const b = JSON.parse(JSON.stringify(en)); b.picFamilies.find((x) => x.id === 'sun').lookAlikes.push({ word: 'sunk', whyNotFamily: 'sank' }); judge('P20 F1 look-alike "sunk" contains "sun"', validateBank(b, 'en'), /look-alike "sunk": contains the picture word "sun"/); }
  { const b = JSON.parse(JSON.stringify(en)); b.picFamilies.find((x) => x.id === 'sun').members.push({ word: 'sunflower', kind: 'derived', slot: 'noun-thing' }); judge('P21 F1 member "sunflower"', validateBank(b, 'en'), /"sunflower": a compound-words bank word/); }

  // E. ROUND 1 (2026-09-23, the landing panels' findings) — validateBank rules 16-21 + the node verify, each poisoned
  // BOTH ways: it must FIRE on the defect and stay QUIET on the correct twin (a rule that fires on correct prose is as broken as a silent one).
  const clone = (o) => JSON.parse(JSON.stringify(o));
  const quiet = (name, f, re) => { const hit = f.filter((x) => re.test(x)); ok(!hit.length, `${name}: fired on the CORRECT twin — ${hit.slice(0, 2).join(' | ')}`); rows.push(`round-1 twin ${name}: ${hit.length ? 'FIRED (defect)' : 'quiet'}`); };
  const V = (fn, loc = 'en') => { const b = clone(en); fn(b); return validateBank(b, loc); };
  const R1 = TYPES['G2-359'] ? TYPES['G2-359']._rules : require('../types/g2/G2-359-prefixes-suffixes-and-root-words.js')._rules;
  // rule 16 — a member that drops a letter of the printed root (fr terre / terrain)
  judge('W16 member "caring" under the root "care"', V((b) => { b.families.find((x) => x.id === 'care').members[0].word = 'caring'; }), /member "caring": does not contain the displayed root "care"/);
  judge('W16 a stemSigned member no longer exempt ("speelster" class)', V((b) => { const m = b.families.find((x) => x.id === 'play').members[0]; m.word = 'plaier'; m.stemSigned = true; }), /member "plaier": does not contain the displayed root "play"/);
  quiet('W16 twin: the shipped en families', V(() => {}), /does not contain the displayed root/);
  // rule 17 — one stem convention per page
  judge('W17 a bound stem beside free roots', V((b) => { b.families.find((x) => x.id === 'help').rootIsFreeWord = false; }), /families mix free-word roots .* with bound stems \(help\)/);
  judge('W17 a capitalised bound stem', V((b) => { for (const x of [...b.families, ...b.rootFamilies]) x.rootIsFreeWord = false; b.families[0].root.word = 'Help'; }), /the bound stem "Help" is capitalised/);
  quiet('W17 twin: every root bound, lower-case', V((b) => { for (const x of [...b.families, ...b.rootFamilies]) x.rootIsFreeWord = false; }), /mix free-word roots|is capitalised \(rule 17\)/);
  // rule 18 — a family whose every triple shares MORE than the root once accents are folded (es mar / marítimo)
  {
    const mar = (words) => ({ id: 'mar', stem: 'mar', rootIsFreeWord: true, root: { word: 'mar' }, signed: true, members: words.map((w) => ({ word: w, kind: 'derived', slot: 'noun-thing' })), lookAlikes: [] });
    judge('W18 mar: every triple shares "mari" (accent-folded)', V((b) => { b.rootFamilies.push(mar(['marinero', 'marino', 'marítimo', 'marina', 'marisco', 'marinería', 'marinar'])); }), /family mar: no three members share exactly "mar"/);
    quiet('W18 twin: marea + maremoto give honest triples', V((b) => { b.rootFamilies.push(mar(['marinero', 'marino', 'marítimo', 'marea', 'marisco', 'maremoto', 'marinar'])); }), /family mar: no three members share/);
    ok(R1.commonPartFolded(['marinero', 'marino', 'marítimo'], 'es') === 'mari' && R1.commonPart(['marinero', 'marino', 'marítimo'], 'es') !== 'mari', 'W18: the folded common part of marinero / marino / marítimo must be "mari" while the unfolded one is not (the fold is what changed)');
  }
  // rule 19 — a meaning line quoting the key
  judge('W19 gloss "to fill a cup again"', V((b) => { b.prefixKey.rows.find((r) => r.word === 'refill').gloss = 'to fill a cup again'; }), /prefixKey row "refill": the meaning line .* quotes the key \("again"\)/);
  judge('W19 gloss "in the wrong place" (a form of "wrongly")', V((b) => { b.prefixKey.rows.find((r) => r.word === 'misplace').gloss = 'to put your keys in the wrong place'; }), /prefixKey row "misplace": .*quotes the key \("wrong \(a form of "wrongly"\)"\)/);
  quiet('W19 twin: the shipped en paraphrases', V(() => {}), /quotes the key/);
  ok(!R1.glossQuotesKey('to fly above the rover', ['over'], 'en').length && R1.glossQuotesKey('to fly over the town', ['over'], 'en').length === 1, 'W19: "over" must hit as a whole word and never inside "rover"');
  // rule 20 — declared agent suffixes; a work word beside play portraits
  judge('W20 no agentSuffixes', V((b) => { delete b.agentSuffixes; }), /agentSuffixes missing/);
  judge('W20 an -ian answer on the -er face', V((b) => { b.agents.push({ key: 'musician', base: 'music', answer: { any: 'musician' } }); }), /agent musician: answer "musician" ends in none of the declared suffixes -er/);
  judge('W20 "at work" beside the runner and the dancer', V((b) => { b.strings['who-does-it'].instruction = 'Look at each person at work, read the word beside them and write the person word in the empty brick.'; }), /strings\.who-does-it says "at work" .* play portraits \(athlete, ballerina\)/);
  quiet('W20 twin: "at work" with no play portrait drawn', V((b) => { b.agents = b.agents.filter((a) => !['athlete', 'ballerina'].includes(a.key)); b.agents.push({ key: 'police_officer', base: 'police', answer: { any: 'policer' } }, { key: 'chef', base: 'cook', answer: { any: 'cooker' } }); b.strings['who-does-it'].instruction = 'Look at each person at work, read the word beside them and write the person word in the empty brick.'; }), /says "at work"/);
  quiet('W20 twin: the shipped en agents + instruction', V(() => {}), /rule 20/);
  // rule 21 — the member as the strictly longest brick
  judge('W21 picture families whose look-alikes are all short', V((b) => { for (const x of b.picFamilies) x.lookAlikes = x.lookAlikes.map((l) => ({ ...l, word: l.word.slice(0, 2) + 'x' })); }), /picture-family: only \d+ picture families offer a look-alike at least as long/);
  quiet('W21 twin: the shipped en picture families', V(() => {}), /rule 21/);
  judge('W21 longestTell: 4 of 6 cards longest', [R1.longestTell([['cloudy', ['clock', 'clown']], ['grassy', ['grab', 'gravy']], ['booklet', ['boot', 'bone']], ['starry', ['stamp', 'stair']], ['sunny', ['summer', 'super']], ['fishy', ['first', 'fist']]].map(([member, foils]) => ({ member, foils })))].filter(Boolean), /strictly longest brick on 4 of 6 cards/);
  quiet('W21 longestTell twin: 3 of 6 cards longest', [R1.longestTell([['cloudy', ['clock', 'clown']], ['grassy', ['grab', 'gravy']], ['booklet', ['boot', 'bone']], ['toothy', ['tomato', 'toad']], ['sunny', ['summer', 'super']], ['fishy', ['first', 'fist']]].map(([member, foils]) => ({ member, foils })))].filter(Boolean), /strictly longest/);
  // the node verify on RENDERED pages: F1 forced to six longest members; F3 a gloss quoting its key
  J('G1-397', 'W21r F1 six cards whose member is the longest brick', await gateOf(rewire('G1-397', { plan: { families: ['cloud', 'grass', 'drum', 'book', 'flower', 'star'], slots: [0, 2, 1, 1, 0, 2] } }), 'W21r'), /answer tell: the answer is the strictly longest brick on 6 of 6 cards/);
  { const b = clone(en); b.prefixKey.rows.find((r) => r.word === 'refill').gloss = 'to fill a cup again';
    J('G2-376', 'W19r F3 a rendered gloss quoting "again"', await gateOf(rewire('G2-376', { block: b, plan: { rows: ['fill', 'heat', 'spell', 'read', 'view', 'count', 'tell', 'pay'] } }), 'W19r'), /the meaning line quotes the key \("again"\)/); }
  // the SWEEP on the shipped composer: no F1 page over 20 seeds shows the tell, and the pooled rate stays under 60 %
  {
    let longest = 0, cards = 0;
    for (let v = 1; v <= 20; v++) {
      const out = TYPES['G1-397'].build({ difficulty: 2, locale: 'en' }, { rng: makeRng(instanceSeed({ typeId: 'G1-397', theme: null, difficulty: 2, seedEpoch: 1, variant: v })) });
      const cs = out.meta.members.map((m, i) => ({ member: m, foils: out.meta.foils[i] }));
      ok(!R1.longestTell(cs), `G1-397 v${v}: ${R1.longestTell(cs)}`);
      longest += cs.filter((c) => R1.strictlyLongest(c.member, c.foils)).length; cards += cs.length;
    }
    ok(longest / cards <= R1.LONGEST_MAX_SHARE, `G1-397 sweep: the member is the strictly longest brick on ${(100 * longest / cards).toFixed(1)} % of cards (> 60 %)`);
    rows.push(`round-1 G1-397 sweep: member strictly longest on ${longest}/${cards} cards (${(100 * longest / cards).toFixed(1)} %, <= 60 % per page and pooled)`);
  }
  return rows;
}

module.exports = { faceGate, FACES };
