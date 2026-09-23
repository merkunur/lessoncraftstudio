/**
 * b6-habitats-faces.js — the FACE half of the G1-398 `habitats` gate (nt5-F Phase E), called by
 * qa/verify-b6-habitats.js. Record docs/worksheet-gen/b6-designs/_work/G1-398-faces.md.
 *
 *   A. STRINGS — each face's i18n.en === the bank's strings[<id>]; gradeBand / layout per the
 *      allocation; i18n/strings.en.json carries it; a bank refusing the face THROWS; an unauthored
 *      locale REFUSES; no shipped row carries a gate-only force* seam; the instruction names only
 *      apparatus of its face (validateBank rule 10) — and the RENDERED instruction line equals it.
 *   B. NODE SWEEP (400 seeds, pure build) + the answer tells POOLED and on the SHIPPED instance
 *      (seedEpoch 1): F1 derangement / not reversed / no rotation, each home in each row 16.7 ± 6 %;
 *      F2 row oracle, stranger column 25 ± 8 %, no column tell on any page; F3 the claim oracle,
 *      the decoy never A / last, answers never in bank order; F4 the distractor rules, the correct
 *      chip left 50 ± 8 % (food and home), no side tell on any page; F5 the habitat = sets.base[0].
 *   C. RENDERS — every face at its own en chrome, a one-line chrome (body 814) and a four-line fi
 *      chrome (body 677): verify() empty, lints clean, SPARSE (every band between consecutive
 *      data-lcs-block <= 40 px), FILL (the last block ends >= 85 % down the 814 body, inside the 677
 *      body); greyscale PNG out/dev/<id>-null-d2-en-grey.png.
 *   D. POISONS — P8 P9 P10 PR3 PR4 PR6 PR10 (the design's face poisons) + SP (a 150 px band) and FL
 *      (every band closed at 814) per face + IA (an instruction naming apparatus not on the face).
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { renderInstance } = require('../render/render-instance.js');
const { makeRng, instanceSeed } = require('../lib/rng.js');
const { loadType } = require('../lib/load-types.js');
const { HABITATS_LOC, HABITATS } = require('../data/b6/habitats.js');
const ROWS = require('../tools/b6var-rows/habitats.js').ROWS;

const FACES = [
  { id: 'K-383', layout: 'homes', band: 'K' },
  { id: 'G1-406', layout: 'odd', band: 'G1' },
  { id: 'G2-380', layout: 'adapt', band: 'G2' },
  { id: 'G1-407', layout: 'needs', band: 'G1' },
  { id: 'G2-381', layout: 'report', band: 'G2' },
];
const FILL_MIN = 0.85;
const OUT = path.join(__dirname, '..', 'out', 'dev', 'G1-398-gate');
const DEV = path.join(__dirname, '..', 'out', 'dev');
const CHROME = {
  one: { title: 'Habitats', instruction: 'Look.' },
  fi677: { title: 'Missä eläimet asuvat? Metsä, niitty, järvi ja meri: elinympäristöt ja niiden eläimet kuvina, kirjaimina ja pienin sanoin', instruction: 'Katso elinympäristöjä tarkasti. Kirjoita jokaisen eläimen alle sen elinympäristön kirjain, jossa eläin asuu ja elää koko vuoden.' },
};

async function faceGate({ page, ok, judge, validateBank, quick, log }) {
  const en = HABITATS_LOC.en;
  const T = Object.fromEntries(FACES.map((f) => [f.id, loadType(f.id)]));
  const base = loadType('G1-398');
  const seedOf = (id, s) => makeRng(instanceSeed({ typeId: id, theme: null, difficulty: 2, seedEpoch: s }));
  const build = (t, block, extra, s, loc = 'en') => t._buildWith(block, { ...t.difficulty[2], ...(extra || {}) }, { locale: loc }, { rng: seedOf(t.id, s) });

  /* ---------------- A. strings ---------------- */
  let stringsEn = {};
  try { stringsEn = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'i18n', 'strings.en.json'), 'utf8')); } catch (e) { /* reported below */ }
  for (const f of FACES) {
    const t = T[f.id], s = en.strings[f.id];
    ok(t.i18n.en.title === s.title && t.i18n.en.instruction === s.instruction, `${f.id}: i18n.en ≠ bank strings['${f.id}']`);
    ok(t.gradeBand === f.band, `${f.id}: gradeBand ${t.gradeBand} ≠ ${f.band}`);
    ok(t.difficulty[2].layout === f.layout && HABITATS.FACE_IDS[f.layout] === f.id, `${f.id}: layout ${t.difficulty[2].layout} ≠ ${f.layout}`);
    ok(stringsEn[f.id] && stringsEn[f.id].title === s.title && stringsEn[f.id].instruction === s.instruction, `${f.id}: i18n/strings.en.json does not carry the face (run node i18n/build-en.js)`);
    let m = null; try { build(t, { ...en, refuse: [f.layout] }, {}, 1); } catch (e) { m = e.message; }
    ok(m && /refuses the/.test(m), `${f.id}: a bank refusing ${f.layout} must THROW (got ${m})`);
    m = null; try { build(t, { ...en, refuse: [f.id] }, {}, 1); } catch (e) { m = e.message; }
    ok(m && /refuses the/.test(m), `${f.id}: a bank refusing ${f.id} must THROW (got ${m})`);
    // fix round 2: de IS authored now (data/b6/locales/habitats.de.json, applied from the panel's draft) — the probe
    // that an UNAUTHORED locale refuses uses a code with no block at all
    m = null; try { t.build({ difficulty: 2, locale: 'xx' }, { rng: seedOf(f.id, 1) }); } catch (e) { m = e.message; }
    ok(m && /no xx block|refuse/i.test(m), `${f.id}: an unauthored locale (xx) must REFUSE (got ${m})`);
  }
  for (const r of ROWS) ok(!Object.keys(r[5]).some((k) => /^force/.test(k)), `${r[1]}: a shipped row carries a gate-only force* seam`);

  /* ---------------- B. node sweep + tells ---------------- */
  const N = 400;
  const tl = [];
  { // F1
    const t = T['K-383'], cell = {}; let bad = 0;
    for (let s = 1; s <= N; s++) {
      const m = build(t, en, {}, s).meta;
      const partner = m.right;
      if (base.homesTells(m.left, partner).length) bad++;
      m.left.forEach((a, i) => { const h = HABITATS.HOMES[a]; const k = h + '@' + partner.indexOf(a); cell[k] = (cell[k] || 0) + 1; });
      if (s === 1) tl.push(`  shipped F1: animals [${m.left}] homes by row [${m.right.map((a) => HABITATS.HOMES[a])}] (partner offsets [${m.left.map((a, i) => m.right.indexOf(a) - i)}])`);
    }
    const shares = Object.values(cell).map((c) => c / N);
    const lo = Math.min(...shares), hi = Math.max(...shares);
    ok(!bad, `F1 sweep: ${bad} pages carry an order tell`);
    ok(Object.keys(cell).length === 36 && lo >= 0.107 && hi <= 0.227, `F1: home-in-row share ${(lo * 100).toFixed(1)}..${(hi * 100).toFixed(1)} % (16.7 ± 6)`);
    tl.push(`  tells F1 (${N}): each home in each row ${(lo * 100).toFixed(1)}..${(hi * 100).toFixed(1)} % · order-tell pages ${bad}`);
  }
  { // F2
    const t = T['G1-406'], col = [0, 0, 0, 0], gen = {}; let bad = 0, n = 0, farBad = 0, cetaBad = 0;
    for (let s = 1; s <= N; s++) {
      const m = build(t, en, {}, s).meta;
      const pos = m.rows.map((r) => r.cards.indexOf(r.stranger));
      if (base.oddPosTells(pos, 4).length) bad++;
      for (const r of m.rows) {
        if (base.oddRowOracle(r.habitat, r.cards.filter((k) => k !== r.stranger), r.stranger, null).length) bad++; col[r.cards.indexOf(r.stranger)]++; n++;
        const sa = HABITATS.ANIMALS.find((a) => a.key === r.stranger);
        if (!sa.lives.every((x) => (HABITATS.FAR[r.habitat] || []).includes(x))) farBad++;
        if (sa.kind) gen[sa.kind] = (gen[sa.kind] || 0) + 1;
        if (sa.cetacean && r.habitat === 'rainforest') cetaBad++;
      }
      const all = m.rows.flatMap((r) => r.cards);
      if (new Set(all).size !== all.length) bad++;
      if (all.some((k) => HABITATS.ANIMALS.find((a) => a.key === k).lives.includes('polar-arctic')) && all.some((k) => HABITATS.ANIMALS.find((a) => a.key === k).lives.includes('polar-antarctic'))) bad++;
      if (s === 1) tl.push(`  shipped F2: rows [${m.rows.map((r) => r.habitat + ':' + r.cards.join('/') + ' x' + r.stranger).join(' · ')}] stranger places [${pos}]`);
    }
    const sh = col.map((c) => c / n);
    ok(!bad, `F2 sweep: ${bad} rule / tell breaks`);
    ok(!farBad, `F2 sweep: ${farBad} strangers live somewhere NOT far from their row`);
    ok(!cetaBad, `F2 sweep: ${cetaBad} cetacean strangers in a rainforest row`);
    ok(sh.every((x) => x >= 0.17 && x <= 0.33), `F2: stranger column shares [${sh.map((x) => (x * 100).toFixed(1))}] (25 ± 8)`);
    tl.push(`  tells F2 (${N}): stranger in place 1..4 ${sh.map((x) => (x * 100).toFixed(1) + '%').join('/')} · breaks ${bad} · not-far strangers ${farBad} · cetacean rainforest strangers ${cetaBad} · generalist strangers (whole range far) ${JSON.stringify(gen)}`);
  }
  { // F3
    const t = T['G2-380'], pos = {}; let bad = 0;
    for (let s = 1; s <= N; s++) {
      const m = build(t, en, {}, s).meta;
      if (base.adaptOracle(m.rows, m.bank).length) bad++;
      if (m.decoys.some((k) => m.bank.indexOf(k) === 0 || m.bank.indexOf(k) === m.bank.length - 1)) bad++;
      if (base.adaptOrderTells(m.rows.map((r) => m.bank.indexOf(r.animal))).length) bad++;
      m.rows.forEach((r, i) => { const L = base.LETTERS7[m.bank.indexOf(r.animal)]; pos[i + L] = (pos[i + L] || 0) + 1; });
      if (s === 1) tl.push(`  shipped F3: bank [${m.bank}] decoy [${m.decoys}] rows [${m.rows.map((r) => r.claim + '=' + base.LETTERS7[m.bank.indexOf(r.animal)])}]`);
    }
    const shares = Object.values(pos).map((c) => c / N);
    ok(!bad, `F3 sweep: ${bad} claim-oracle / decoy / order breaks`);
    ok(Math.max(...shares) <= 0.30, `F3: one row carries one letter on ${(Math.max(...shares) * 100).toFixed(0)} % of pages (> 30 %)`);
    tl.push(`  tells F3 (${N}): max row-letter cell ${(Math.max(...shares) * 100).toFixed(1)} % (uniform 1/6 of the 6 answer letters ≈ 16.7) · breaks ${bad}`);
  }
  { // F4
    const t = T['G1-407']; let bad = 0, fl = 0, hl = 0, n = 0;
    for (let s = 1; s <= N; s++) {
      const m = build(t, en, {}, s).meta;
      const fs2 = m.rows.map((r) => r.foods.indexOf(r.food)), hs = m.rows.map((r) => r.homes.indexOf(r.home));
      if (base.sideTells(fs2).length || base.sideTells(hs).length) bad++;
      for (const r of m.rows) {
        const Nd = HABITATS.NEEDS[r.animal];
        if (!Nd.neverEats.includes(r.foodX) || !Nd.neverHome.includes(r.homeX)) bad++;
        if (!m.rows.some((o) => o !== r && o.food === r.foodX) || !m.rows.some((o) => o !== r && o.home === r.homeX)) bad++;
        fl += r.foods.indexOf(r.food) === 0 ? 1 : 0; hl += r.homes.indexOf(r.home) === 0 ? 1 : 0; n++;
      }
      if (s === 1) tl.push(`  shipped F4: rows [${m.rows.map((r) => r.animal + ' food ' + r.foods.join('|') + ' home ' + r.homes.join('|'))}] correct left? food [${fs2.map((x) => (x ? 'R' : 'L')).join('')}] home [${hs.map((x) => (x ? 'R' : 'L')).join('')}]`);
    }
    ok(!bad, `F4 sweep: ${bad} distractor / side breaks`);
    ok(Math.abs(fl / n - 0.5) <= 0.08 && Math.abs(hl / n - 0.5) <= 0.08, `F4: correct chip left — food ${(100 * fl / n).toFixed(1)} %, home ${(100 * hl / n).toFixed(1)} % (50 ± 8)`);
    tl.push(`  tells F4 (${N}): correct chip on the left — food ${(100 * fl / n).toFixed(1)} %, home ${(100 * hl / n).toFixed(1)} % · breaks ${bad}`);
  }
  { // F5
    const m = build(T['G2-381'], en, {}, 1).meta;
    ok(m.habitat === en.sets.base[0], `F5: habitat ${m.habitat} ≠ sets.base[0] ${en.sets.base[0]}`);
    tl.push(`  shipped F5: the ${m.habitat} window (sets.base[0])`);
  }
  log.push(...tl);

  /* ---------------- C. renders ---------------- */
  const measure = () => page.evaluate(() => {
    const root = document.querySelector('[data-lcs-type="habitats"]'), body = document.querySelector('.ws-body');
    const R = (e) => e.getBoundingClientRect();
    const blocks = [...root.querySelectorAll('[data-lcs-block]')].map(R).sort((a, b) => a.top - b.top);
    const b = R(body);
    // a block's band is measured against the blocks ABOVE IT THAT IT OVERLAPS horizontally (F1's two match
    // columns stand side by side: pooling them would hide a band in one column behind the other); a block
    // with nothing above it is measured against the top of the body
    let band = 0, top = 0;
    blocks.forEach((x, i) => {
      const above = blocks.slice(0, i).filter((q) => q.left < x.right - 1 && q.right > x.left + 1 && q.top < x.top);
      if (above.length) band = Math.max(band, x.top - Math.max(...above.map((q) => q.bottom)));
      else top = Math.max(top, x.top - b.top);
    });
    const last = Math.max(...blocks.map((x) => x.bottom));
    return { body: b.height, fill: (last - b.top) / b.height, inside: last <= b.bottom + 0.6, band, top, instr: (document.querySelector('.ws-instruction') || {}).textContent || '' };
  });
  const render = async (t, { name, strings, seedEpoch } = {}) => {
    const out = await renderInstance({ type: t, theme: null, difficulty: 2, locale: 'en', page, outDir: OUT, baseName: `face-${name}`, strings: strings || t.i18n.en, seedEpoch });
    return { verify: out.qa.verify, lints: out.qa.lints, m: await measure(), out };
  };
  const shape = (f, r, k) => {
    const x = [];
    if (r.m.band > 40.5) x.push(`SPARSE — ${r.m.band.toFixed(0)} px blank band between blocks (> 40)`);
    if (r.m.top > 40.5) x.push(`SPARSE — ${r.m.top.toFixed(0)} px blank band above the first block`);
    if (!r.m.inside) x.push('the content runs out of the body');
    if (k === 'one' && r.m.fill < FILL_MIN) x.push(`FILL — content ends at ${(r.m.fill * 100).toFixed(0)} % of the 814 body (< 85 %)`);
    return x;
  };
  for (const f of FACES) {
    const t = T[f.id];
    const own = await render(t, { name: f.id + '-own' });
    ok(!own.verify.length && !own.lints.length, `${f.id} own chrome: verify ${JSON.stringify(own.verify.slice(0, 3))} lints ${JSON.stringify(own.lints.slice(0, 2))}`);
    shape(f, own, 'own').forEach((x) => ok(false, `${f.id} own: ${x}`));
    ok(own.m.instr.trim() === t.i18n.en.instruction, `${f.id}: the rendered instruction ≠ i18n.en`);
    await page.evaluate(() => { document.documentElement.style.filter = 'grayscale(1)'; });
    const pageEl = await page.$('[data-lcs-page]'); await pageEl.screenshot({ path: path.join(DEV, `${f.id}-null-d2-en-grey.png`) });
    await page.evaluate(() => { document.documentElement.style.filter = ''; });
    const line = [`render ${f.id} (${f.layout}): own body ${own.m.body.toFixed(0)} fill ${(own.m.fill * 100).toFixed(0)}% band ${own.m.band.toFixed(0)}`];
    for (const [k, st] of Object.entries(CHROME)) {
      const r = await render(t, { name: `${f.id}-${k}`, strings: st });
      ok(!r.verify.length && !r.lints.length, `${f.id} ${k}: verify ${JSON.stringify(r.verify.slice(0, 3))} lints ${JSON.stringify(r.lints.slice(0, 2))}`);
      shape(f, r, k).forEach((x) => ok(false, `${f.id} ${k}: ${x}`));
      if (k === 'one') ok(r.m.body >= 800, `${f.id}: the one-line chrome body is ${r.m.body.toFixed(0)} (the 814 test tests nothing)`);
      if (k === 'fi677') ok(r.m.body <= 680, `${f.id}: the fi chrome body is ${r.m.body.toFixed(0)} (the 677 test tests nothing)`);
      line.push(`${k} body ${r.m.body.toFixed(0)} fill ${(r.m.fill * 100).toFixed(0)}% band ${r.m.band.toFixed(0)}`);
      if (k === 'fi677') fs.copyFileSync(r.out.pngPath, path.join(DEV, `${f.id}-null-d2-en-fi677.png`));
    }
    log.push('  ' + line.join(' · '));
    if (!quick) {
      const seen = new Set();
      for (let s = 2; s <= 11; s++) {
        const r = await render(t, { name: `${f.id}-sweep`, seedEpoch: s });
        ok(!r.verify.length && !r.lints.length, `${f.id} sweep ${s}: verify ${JSON.stringify(r.verify.slice(0, 2))} lints ${JSON.stringify(r.lints.slice(0, 1))}`);
        seen.add(JSON.stringify(r.out.meta));
      }
      if (f.layout !== 'report') ok(seen.size === 10, `${f.id} sweep: ${seen.size}/10 distinct pages`);
      log.push(`  sweep ${f.id}: 10 seeds, ${seen.size} distinct`);
    }
  }

  /* ---------------- D. poisons ---------------- */
  const wrap = (t, fn) => ({ ...t, build(o, ctx) { const r = t.build(o, ctx); r.bodyHtml = fn(r.bodyHtml); return r; } });
  const forced = (t, extra) => ({ ...t, build(o, ctx) { return t._buildWith(en, { ...t.difficulty[2], ...extra }, { locale: 'en' }, ctx); } });
  const rp = async (name, t, re, opts = {}) => {
    const r = await render(t, { name: 'poison', ...opts });
    const f = [...r.verify, ...r.lints.map((l) => JSON.stringify(l)), ...(opts.shapeKey ? shape(null, r, opts.shapeKey) : [])];
    if (opts.expectClean) { judge(name, f.length ? f : ['CLEAN'], /^CLEAN$/); return; }   // a CONTROL: must render verify-clean
    judge(name, f, re);
  };
  // P8 F3: duck-feet with the duck AND the swan in the bank
  await rp('P8 F3 duck-feet + duck AND swan', forced(T['G2-380'], { forceAdapt: { bank: ['camel', 'duck', 'giraffe', 'swan', 'woodpecker', 'sloth', 'elephant'], decoys: ['swan'],
    rows: [{ claim: 'duck-feet', animal: 'duck' }, { claim: 'camel-hump', animal: 'camel' }, { claim: 'sloth-claws', animal: 'sloth' }, { claim: 'giraffe-neck', animal: 'giraffe' }, { claim: 'elephant-trunk', animal: 'elephant' }, { claim: 'woodpecker-beak', animal: 'woodpecker' }] } }),
  /claim duck-feet is true of 2 bank animals|decoy swan is true of a claim/);
  // P9 F2: a forest row whose stranger lives in several habitats
  const oddRows = (rows) => ({ rows: rows.map(([habitat, residents, stranger, p]) => { const cards = residents.slice(); cards.splice(p, 0, stranger); return { habitat, residents, stranger, cards, pos: p }; }) });
  await rp('P9 F2 forest stranger = a multi-habitat animal (elephant)', forced(T['G1-406'], { forceOdd: oddRows([['forest', ['deer', 'squirrel', 'badger'], 'elephant', 0], ['ocean', ['whale', 'shark', 'crab'], 'lion', 2], ['meadow', ['bee', 'ladybug', 'butterfly'], 'dolphin', 1], ['savanna', ['zebra', 'giraffe', 'ostrich'], 'octopus', 3]]) }), /lives in several habitats \(multi\)/);
  // PF: a stranger whose (single) habitat is not FAR from the row (zebra = savanna in a meadow row)
  await rp('PF F2 meadow stranger = zebra (savanna is not FAR from meadow)', forced(T['G1-406'], { forceOdd: oddRows([['meadow', ['grasshopper', 'ladybug', 'butterfly'], 'zebra', 0], ['ocean', ['whale', 'shark', 'crab'], 'lion', 2], ['forest', ['deer', 'squirrel', 'badger'], 'dolphin', 1], ['savanna', ['giraffe', 'ostrich', 'lion'], 'octopus', 3]].map((r, i) => (i === 3 ? ['savanna', ['giraffe', 'ostrich', 'elephant'], 'octopus', 3] : r))) }), /zebra also lives in savanna, which is not FAR from meadow/);
  // PG: the lead's defect — a butterfly as the Rainforest row's stranger (a generalist insect)
  await rp('PG F2 rainforest stranger = butterfly (a generalist insect)', forced(T['G1-406'], { forceOdd: oddRows([['rainforest', ['gorilla', 'macaw', 'sloth'], 'butterfly', 3], ['ocean', ['whale', 'shark', 'crab'], 'lion', 1], ['forest', ['deer', 'squirrel', 'badger'], 'dolphin', 0], ['savanna', ['zebra', 'giraffe', 'ostrich'], 'octopus', 2]]) }), /butterfly DOES live in rainforest|generalist insect/);
  // PH: a pond bird as a savanna stranger (single-habitat on paper; noStranger by the audit)
  await rp('PH F2 savanna stranger = duck (a water bird lives at every waterhole)', forced(T['G1-406'], { forceOdd: oddRows([['savanna', ['zebra', 'giraffe', 'ostrich'], 'duck', 2], ['ocean', ['whale', 'shark', 'crab'], 'lion', 0], ['forest', ['deer', 'squirrel', 'badger'], 'dolphin', 3], ['meadow', ['grasshopper', 'ladybug', 'butterfly'], 'octopus', 1]]) }), /duck is never a stranger/);
  // PS: a secondary-home resident (a badger and a deer standing in the Meadow row, the lead's s3 render)
  await rp('PS F2 meadow residents badger + deer (secondary homes)', forced(T['G1-406'], { forceOdd: oddRows([['meadow', ['ladybug', 'badger', 'deer'], 'orangutan', 2], ['ocean', ['whale', 'shark', 'crab'], 'lion', 0], ['forest', ['squirrel', 'woodpecker', 'moose'], 'dolphin', 3], ['savanna', ['zebra', 'giraffe', 'ostrich'], 'octopus', 1]]) }), /resident badger lives in meadow only as a secondary home/);
  // PD: a dolphin as the Rainforest stranger (the boto cor-de-rosa lives in the Amazon; lead ruling, every locale)
  await rp('PD F2 rainforest stranger = dolphin (a cetacean)', forced(T['G1-406'], { forceOdd: oddRows([['rainforest', ['gorilla', 'toucan', 'sloth'], 'dolphin', 1], ['ocean', ['whale', 'shark', 'crab'], 'lion', 3], ['forest', ['deer', 'squirrel', 'badger'], 'octopus', 0], ['savanna', ['zebra', 'giraffe', 'ostrich'], 'starfish', 2]]) }), /dolphin is never the stranger of a rainforest row/);
  // fix round 2 (landing panels) — render poisons, each with a render CONTROL that must stay verify-clean
  await rp('PL F2 every stranger an exotic animal (solvable as "not an animal of my country")', forced(T['G1-406'], { forceOdd: oddRows([['ocean', ['whale', 'shark', 'crab'], 'zebra', 0], ['forest', ['deer', 'squirrel', 'badger'], 'lion', 2], ['pond', ['beaver', 'swan', 'dragonfly'], 'macaw', 1], ['meadow', ['bee', 'ladybug', 'butterfly'], 'orangutan', 3]]) }), /no temperate stranger/);
  await rp('PL0 control: the same page with the ocean row\'s stranger a squirrel (must PASS)', forced(T['G1-406'], { forceOdd: oddRows([['ocean', ['whale', 'shark', 'crab'], 'squirrel', 0], ['forest', ['deer', 'woodpecker', 'badger'], 'lion', 2], ['pond', ['beaver', 'swan', 'dragonfly'], 'macaw', 1], ['meadow', ['bee', 'ladybug', 'butterfly'], 'orangutan', 3]]) }), /^$/, { expectClean: true });
  await rp('PDF F2 the duckling as a pond resident (reads as a chick: a second stranger)', forced(T['G1-406'], { forceOdd: oddRows([['pond', ['duck', 'swan', 'dragonfly'], 'lion', 0], ['ocean', ['whale', 'shark', 'crab'], 'squirrel', 2], ['forest', ['deer', 'woodpecker', 'badger'], 'octopus', 1], ['meadow', ['bee', 'ladybug', 'butterfly'], 'orangutan', 3]]) }), /duck may not appear on the odd face/);
  await rp('PSF F2 the sloth as an en rainforest resident (reads as a meerkat)', forced(T['G1-406'], { forceOdd: oddRows([['rainforest', ['sloth', 'toucan', 'gorilla'], 'squirrel', 0], ['ocean', ['whale', 'shark', 'crab'], 'lion', 2], ['forest', ['deer', 'woodpecker', 'badger'], 'octopus', 1], ['meadow', ['bee', 'ladybug', 'butterfly'], 'orangutan', 3]]) }), /sloth: stands only on a page of an americas-rainforest locale/);
  await rp('PSN F4 the right home on the left in 3 of 4 rows (the de / nl panels\' render)', forced(T['G1-407'], { forceNeeds: { rows: [
    { animal: 'beaver', food: 'leaf', home: 'lodge', foodX: 'mosquito', homeX: 'web', foods: ['mosquito', 'leaf'], homes: ['lodge', 'web'] },
    { animal: 'spider', food: 'mosquito', home: 'web', foodX: 'grass', homeX: 'lodge', foods: ['grass', 'mosquito'], homes: ['web', 'lodge'] },
    { animal: 'bird', food: 'mosquito', home: 'nest', foodX: 'leaf', homeX: 'web', foods: ['mosquito', 'leaf'], homes: ['web', 'nest'] },
    { animal: 'rabbit', food: 'grass', home: 'burrow', foodX: 'mosquito', homeX: 'nest', foods: ['grass', 'mosquito'], homes: ['burrow', 'nest'] }] } }), /home side: the correct chip sits on one side in 3 of 4 rows/);
  await rp('PSN0 control: the same rows with the homes 2 / 2 (must PASS)', forced(T['G1-407'], { forceNeeds: { rows: [
    { animal: 'beaver', food: 'leaf', home: 'lodge', foodX: 'mosquito', homeX: 'web', foods: ['mosquito', 'leaf'], homes: ['lodge', 'web'] },
    { animal: 'spider', food: 'mosquito', home: 'web', foodX: 'grass', homeX: 'lodge', foods: ['grass', 'mosquito'], homes: ['lodge', 'web'] },
    { animal: 'bird', food: 'mosquito', home: 'nest', foodX: 'leaf', homeX: 'web', foods: ['mosquito', 'leaf'], homes: ['web', 'nest'] },
    { animal: 'rabbit', food: 'grass', home: 'burrow', foodX: 'mosquito', homeX: 'nest', foods: ['grass', 'mosquito'], homes: ['burrow', 'nest'] }] } }), /^$/, { expectClean: true });
  await rp('PCP F5 two word pairs printed while the face declares one', forced(T['G2-381'], { forceHabitat: 'rainforest', forceTruth: { temp: 'hot', wet: 'wet' } }), /pairs ≠ declared/);
  await rp('P10 F2 a penguin in the Arctic row', forced(T['G1-406'], { forceOdd: oddRows([['polar-arctic', ['walrus', 'seal-white', 'penguin'], 'lion', 0], ['ocean', ['whale', 'shark', 'crab'], 'deer', 2], ['meadow', ['bee', 'ladybug', 'butterfly'], 'dolphin', 1], ['savanna', ['zebra', 'giraffe', 'ostrich'], 'octopus', 3]]) }), /penguin|Arctic row holds penguin|polar-arctic/);
  const f1 = build(T['K-383'], en, {}, 1).meta;
  const rot = f1.left.map((_, i) => f1.left[(i + 1) % f1.left.length]);
  await rp('PR3 F1 right order = left order rotated by one', forced(T['K-383'], { forceHomes: { left: f1.left, right: rot } }), /rotation tell/);
  await rp('PR4 F2 the stranger always in place 3', forced(T['G1-406'], { forceOdd: oddRows([['forest', ['deer', 'squirrel', 'badger'], 'whale', 2], ['ocean', ['dolphin', 'shark', 'crab'], 'lion', 2], ['meadow', ['bee', 'ladybug', 'butterfly'], 'octopus', 2], ['savanna', ['zebra', 'giraffe', 'ostrich'], 'jellyfish', 2]]) }), /column tell/);
  await rp('PR6 F4 the correct food always on the left', forced(T['G1-407'], { forceNeeds: { rows: [
    { animal: 'bee', food: 'flower', home: 'hive', foodX: 'mosquito', homeX: 'web', foods: ['flower', 'mosquito'], homes: ['web', 'hive'] },
    { animal: 'spider', food: 'mosquito', home: 'web', foodX: 'flower', homeX: 'hive', foods: ['mosquito', 'flower'], homes: ['web', 'hive'] },
    { animal: 'rabbit', food: 'grass', home: 'burrow', foodX: 'mosquito', homeX: 'web', foods: ['grass', 'mosquito'], homes: ['burrow', 'web'] },
    { animal: 'beaver', food: 'leaf', home: 'lodge', foodX: 'mosquito', homeX: 'web', foods: ['leaf', 'mosquito'], homes: ['lodge', 'web'] }] } }), /food side: the correct chip is always on the same side/);
  // fix round 1: F3 an answer whose picture does not SHOW the trait (the giraffe calf for the long neck)
  await rp('PV F3 the giraffe calf answering "long neck"', forced(T['G2-380'], { forceAdapt: { bank: ['camel', 'lion', 'giraffe', 'woodpecker', 'toucan', 'squirrel', 'elephant'], decoys: ['lion'],
    rows: [{ claim: 'giraffe-neck', animal: 'giraffe' }, { claim: 'camel-hump', animal: 'camel' }, { claim: 'toucan-beak', animal: 'toucan' }, { claim: 'squirrel-tail', animal: 'squirrel' }, { claim: 'elephant-trunk', animal: 'elephant' }, { claim: 'woodpecker-beak', animal: 'woodpecker' }] } }), /claim giraffe-neck answered by giraffe, not one of its answers/);
  // addendum 2 (fr panel): page-vs-bank text comparison normalises NBSP / NNBSP; a genuine mismatch still fails
  {
    const m1 = build(T['G2-380'], en, {}, 1).meta, c0 = m1.rows[0].claim;
    const nb = en.adapt[c0].replace(/ /g, '\u00A0').replace(/([:;?!])/, '\u202F$1').replace(/\.$/, '\u202F!').replace(/\u202F!$/, '.');   // NBSP everywhere; NNBSP before a : ; ? ! when the claim has one
    await rp('NB control: the claim with NBSP / NNBSP typography (must PASS)', forced(T['G2-380'], { forceText: { [c0]: nb } }), /^$/, { seedEpoch: 1, expectClean: true });
    await rp('NB2 a genuinely different claim text', forced(T['G2-380'], { forceText: { [c0]: en.adapt[c0].replace(/\w+\.$/, 'something.') } }), new RegExp(`row ${c0}: prints`), { seedEpoch: 1 });
  }
  // addendum 1 (de panel, item 8): a word pair with no true answer for the habitat (hot / cold on the ocean)
  await rp('PC F5 hot / cold offered on the ocean report', forced(T['G2-381'], { forceTruth: { temp: 'hot', wet: 'wet' } }), /hot \/ cold pair has no true answer for ocean/);
  await rp('PR10 F5 an animal picture inside the window', forced(T['G2-381'], { forceReportImg: true }), /open page answers itself/);
  // IA: an instruction naming apparatus not on its face (rule 10 on the bank + the rendered check)
  judge('IA F1 instruction "Write the letter under each home."', validateBank({ ...en, strings: { ...en.strings, 'K-383': { ...en.strings['K-383'], instruction: 'Write the letter under each home.' } } }, 'en'), /rule 10: en K-383 instruction names apparatus/);
  judge('IA F4 instruction "Write the name of each toy."', validateBank({ ...en, strings: { ...en.strings, 'G1-407': { ...en.strings['G1-407'], instruction: 'Write the name of each toy.' } } }, 'en'), /rule 10: en G1-407 instruction names apparatus/);
  // SP (a 150 px band) and FL (every band closed at 814) per face
  const spFix = {
    'K-383': (h) => h.replace('<div class="ws-match-col" style="justify-content:flex-start;gap:10px">', '<div class="ws-match-col" style="justify-content:flex-start;gap:10px;padding-top:150px">'),
    'G1-406': (h) => h.replace('row-gap:16px', 'row-gap:150px'),
    'G2-380': (h) => h.replace('min-height:10px;max-height:40px', 'min-height:150px;max-height:150px'),
    'G1-407': (h) => h.replace('min-height:12px;max-height:40px', 'min-height:150px;max-height:150px'),
    'G2-381': (h) => h.replace('min-height:10px;max-height:40px', 'min-height:150px;max-height:150px'),
  };
  const flFix = {
    'K-383': (h) => h.split('flex:1 1 100px;min-height:100px;max-height:130px').join('flex:0 0 70px;min-height:70px;max-height:70px'),
    'G1-406': (h) => h.replace(/minmax\(150px,1fr\)/, '112px'),
    'G2-380': (h) => h.split(/min-height:10px;max-height:40px/).join('min-height:0px;max-height:0px'),
    'G1-407': (h) => h.split(/min-height:12px;max-height:40px/).join('min-height:0px;max-height:0px'),
    'G2-381': (h) => h.split(/min-height:10px;max-height:40px/).join('min-height:0px;max-height:0px'),
  };
  for (const f of FACES) {
    const probe = build(T[f.id], en, {}, 1).bodyHtml;
    ok(spFix[f.id](probe) !== probe && flFix[f.id](probe) !== probe, `${f.id}: an SP / FL needle matched nothing`);
    await rp(`SP ${f.id} a 150 px band`, wrap(T[f.id], spFix[f.id]), /SPARSE|runs out of the body|reaches the footer/, { shapeKey: 'own' });
    await rp(`FL ${f.id} every band closed at 814`, wrap(T[f.id], flFix[f.id]), /FILL/, { strings: CHROME.one, shapeKey: 'one' });
  }
}

module.exports = { faceGate, FACES };
