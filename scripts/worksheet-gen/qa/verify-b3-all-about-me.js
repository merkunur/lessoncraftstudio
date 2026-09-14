#!/usr/bin/env node
/**
 * verify-b3-all-about-me.js — the K-323 `all-about-me` gate (design file
 * docs/worksheet-gen/b3-designs/K-323-all-about-me.md §5, base scope; brief
 * deliverable 4).
 *
 *   node scripts/worksheet-gen/qa/verify-b3-all-about-me.js [--quick]
 *
 * 1. BANK — every locale block of data/b3/all-about-me.js against the §5
 *    validator rules the base can carry: (3) no literal contains `{` or a
 *    digit, every label the shape names is a non-empty string, `age.post`
 *    non-empty, `age.glue` boolean, fi `glue:true` with a `-` suffix (every
 *    other locale glue:false); (4) `faceWords[k] === displayWord(vocab[k][loc][0],
 *    loc)` for the seven anchor ids, the id set identical to the anchors;
 *    (5) `can[id]` for >= 8 action ids unless `refuse` names `ican`, every id
 *    an `actions` entry, <= 34 chars, never equal (case-insensitively) to the
 *    cue's vocab word; (6) `favHeading.*` <= 46 chars, `countHeads.*` end
 *    with `:` and carry no digit; (8) title <= 70 without the worksheet word,
 *    instruction <= 150. The GLOBAL picture seed (rules 1-2): every option
 *    resolves via fileUri (a missing cache entry throws), has a vocab
 *    singular in ALL 11 locales, is not B2_EXCLUDE'd anywhere, `picOpened:true`,
 *    no theme carries the localized B&W marker; colours ∈ COLOR_WORDS; the
 *    face resolves and every anchor is a fraction with side L|R; >= 12
 *    actions, each cue resolving. The gate MAY read the vocab and the
 *    manifest; the spec never does.
 * 2. RENDER — through the REAL pipeline (render/render-instance.js, file://
 *    fonts): d1/d2/d3 en, plus d1/d2/d3 under a 3-line de title + 150-char
 *    instruction and under a 4-line fi title (the K-319 measurement: the
 *    README's flat 722 is not the worst legal case; the fi fixture squeezes
 *    the body to ~700). Asserts verify() empty, qa/lints.js clean, and the
 *    floors ITSELF (qa/lints.js has no size lint): the age box >= 56 (the K
 *    token floor) and === config; the name lane >= 56 high and glyphH ===
 *    config; the portrait === config (square unless d1 stretches it) with a
 *    zone >= size-32 x size-48; every favourite window === favW and its zone
 *    >= 150 high at the design's 220 (>= favMin-70 under the squeeze); every
 *    heading <= 2 lines; the banner label <= 191 and unclipped; the age row
 *    <= the lane inner; everything above the footer; and the NODE
 *    CROSS-CHECK: every [data-lcs-label-key] text === the EN bank literal
 *    (the design's "headings === bank literals").
 * 3. SWEEP — 20 seeds x d1/d2/d3: the base is seedless, so every seed must
 *    render BYTE-IDENTICAL bodyHtml (skipped by --quick).
 * 4. POOL — the §5 rule 7 global gate: every F1 option label (vocab singular
 *    via displayWord; colours via COLOR_WORDS) measured at Nunito 800 16 in
 *    the real render in ALL 11 locales must be <= 96 px (a curated option
 *    over the ceiling is a data defect — the pedagogue's list must already
 *    sit inside the measured ceilings); each category keeps >= 6 options.
 * 5. POISON — each must FAIL for its OWN reason (a fail with no matching
 *    message = WRONG REASON; no fail = SILENT; either exits 1). The correct
 *    EN bank is the control. Design §5 poisons the BASE can carry:
 *      P1  option {theme:'fruits', noun:'durian'}   → bank rule 1 (not cached)
 *      P2  de favHeading.animal 'Mein Lieblings{noun}' → bank rule 3 + the spec refuses
 *      P3  de faceWords.eye 'Augen'                 → bank rule 4 (≠ vocab singular)
 *      P4  fr can.swim 'Natation'                   → bank rule 5 (= the vocab word)
 *      P5  an option from `animals bw`              → bank rule 2 (B&W marker)
 *      P7  colours + pink                           → the pool gate (fi 128 px > 96)
 *      P9' the age box at 40                        → the spec guard + the gate floor past it
 *      P12' the RIGID 722 stack under the fi chrome  → qa/lints.js footer lint
 *      P13 answerBox({w:64,h:64}) in the age lane   → verify() (data-lcs-answer="undefined")
 *    plus five the base needs that the design lists under verify():
 *      PN  a digit in the age literal               → the spec refuses + verify() past the guard
 *      PL  a pre-filled name lane                   → verify()
 *      PH  a heading ≠ the bank literal             → the node cross-check (verify() cannot see it)
 *      PH2 a 3-line heading                         → verify()
 *      PD  a missing favourite draw zone            → verify()
 *      PO  d3 windows pinned at 220 under the fi chrome → verify() row containment (lints are blind)
 *    P6 P8 P10 P11 are F3 / F1 / F3 / F4 poisons (Phase 2).
 */
'use strict';
const path = require('path');
const puppeteer = require('puppeteer');
const { renderInstance } = require('../render/render-instance.js');
const { makeRng, instanceSeed } = require('../lib/rng.js');
const { vocab, excluded, fileUri, displayWord } = require('../lib/b2-common.js');
const resolve = require('../image-cache/resolve.js');
const tokens = require('../primitives/_tokens.js');
const { COLOR_WORDS } = require('../data/color-words.js');
const { answerBox } = require('../templates/components.js');
const bankMod = require('../data/b3/all-about-me.js');

const TYPE = require('../types/k/K-323-all-about-me.js');
const QUICK = process.argv.includes('--quick');
const OUT = path.join(__dirname, '..', 'out', 'dev');
const LOCALES = ['en', 'de', 'es', 'pt', 'fr', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const BW_MARKER = /\b(BW|SW|BN|NB|ZW|SH|PB|MV|SV)$/i;
const K_FLOOR = tokens.density.K.minElement;   // 56
const WORKSHEET_WORD = /arbeitsblatt|worksheet|werkblad|arbetsblad|arbejdsark|arbeidsark|feuille|(?<!\p{L})fiches?(?!\p{L})|ficha|scheda|tehtäv/iu;
const ANCHORS = ['hair', 'nose', 'eye', 'ear', 'mouth', 'eyebrow', 'chin'];
const LABEL_KEYS = ['nameIs', 'age.pre', 'age.post', 'thisIsMe', 'family', 'familyDraw', 'drawFace', 'school',
  'favHeading.animal', 'favHeading.food', 'favHeading.color', 'favHeading.toy',
  'countHeads.people', 'countHeads.brothers', 'countHeads.sisters', 'countHeads.pets',
  'wantLearn', 'myName', 'friendName', 'oneLetterPerBox', 'lettersCount', 'firstLetter',
  'whoHasMore.question', 'whoHasMore.me', 'whoHasMore.friend'];
const POOL_CAP = 96;       // px at Nunito 800 16 — the F1 tile label ceiling (design §3 F1)
const POOL_MIN = 6;        // survivors per category, else the category drops
const BANNER_CAP = 191;

let assertions = 0;
const fails = [];
function ok(cond, msg) { assertions++; if (!cond) fails.push(msg); return !!cond; }
function get(o, p) { return p.split('.').reduce((x, k) => (x == null ? undefined : x[k]), o); }

/* ------------------------------------------------------------------ bank */
function validateBank(bank, loc) {
  const f = [];
  const push = (m) => f.push(`[${loc}] ${m}`);
  const v = vocab();
  const L = bank && bank.labels;
  if (!L) { push('no labels block'); return f; }
  // rule 3 — whole literals
  for (const k of LABEL_KEYS) {
    const s = get(L, k);
    if (typeof s !== 'string' || !s.trim()) { push(`labels.${k} missing`); continue; }
    if (s.includes('{')) push(`labels.${k} "${s}" carries a slot`);
    if (/\d/.test(s)) push(`labels.${k} "${s}" prints a digit`);
  }
  if (!L.age || typeof L.age.glue !== 'boolean') push('age.glue must be true or false');
  else if (loc === 'fi') {
    if (L.age.glue !== true) push('fi age.glue must be true (the -vuotias suffix touches the box)');
    if (!/^-/.test(L.age.post || '')) push(`fi age.post "${L.age.post}" must start with "-"`);
  } else if (L.age.glue !== false) push('age.glue must be false outside fi');
  // rule 6 — headings
  for (const c of ['animal', 'food', 'color', 'toy']) {
    const s = get(L, 'favHeading.' + c) || '';
    if ([...s].length > 46) push(`favHeading.${c} "${s}" > 46 chars`);
  }
  for (const c of ['people', 'brothers', 'sisters', 'pets']) {
    const s = get(L, 'countHeads.' + c) || '';
    if (!/:$/.test(s.trim())) push(`countHeads.${c} "${s}" does not end with ":"`);
  }
  // rule 4 — face words
  const fw = bank.faceWords || {};
  const ids = Object.keys(fw).sort();
  if (ids.join() !== [...ANCHORS].sort().join()) push(`faceWords ids ${JSON.stringify(ids)} ≠ the seven anchors`);
  for (const k of ANCHORS) {
    const cite = v[k] && v[k][loc] && v[k][loc][0];
    if (!cite) { push(`no vocab singular for ${k} in ${loc}`); continue; }
    const want = displayWord(cite, loc);
    if (fw[k] !== want) push(`faceWords.${k} "${fw[k]}" ≠ vocab singular "${want}"`);
  }
  // rule 5 — can
  const refuse = Array.isArray(bank.refuse) ? bank.refuse : [];
  const can = bank.can || {};
  const actions = (bankMod.ALL_ABOUT_ME_PICTURES.actions || []);
  const actionIds = new Set(actions.map((a) => a.id));
  const canIds = Object.keys(can);
  for (const id of canIds) {
    if (!actionIds.has(id)) push(`can.${id} is not an actions id`);
    const s = can[id];
    if (typeof s !== 'string' || !s.trim()) { push(`can.${id} empty`); continue; }
    if ([...s].length > 34) push(`can.${id} "${s}" > 34 chars`);
    if (s.includes('{')) push(`can.${id} "${s}" carries a slot`);
    const a = actions.find((x) => x.id === id);
    const n = a && resolve.manifest().themes[a.cue.theme] && resolve.manifest().themes[a.cue.theme].nouns[a.cue.noun];
    const cite = n && n.vocabKey && v[n.vocabKey] && v[n.vocabKey][loc] && v[n.vocabKey][loc][0];
    if (cite && s.trim().toLocaleLowerCase(loc) === cite.toLocaleLowerCase(loc)) push(`can.${id} "${s}" equals the vocab word (a noun, not a sentence)`);
  }
  if (!refuse.includes('ican') && canIds.length < 8) push(`${canIds.length} can literals < 8 and ican is not refused`);
  // rule 8 — strings
  const s = bank.strings && bank.strings['K-323'];
  if (!s) push('strings K-323 missing');
  else {
    if (!s.title || [...s.title].length > 70) push('title > 70 chars');
    if (WORKSHEET_WORD.test(s.title || '')) push('title carries the worksheet word');
    if (!s.instruction || [...s.instruction].length > 150) push('instruction > 150 chars');
  }
  return f;
}

function validatePictures(P) {
  const f = [];
  const v = vocab();
  const m = resolve.manifest();
  const cats = Array.isArray(P.categories) ? P.categories : [];
  const seen = new Set();
  for (const c of cats) {
    const tag = (x) => `category ${c.id}: ${x}`;
    if (!c.id || seen.has(c.id)) f.push(tag('missing or duplicate id')); seen.add(c.id);
    const opts = Array.isArray(c.options) ? c.options : [];
    if (opts.length < POOL_MIN) f.push(tag(`${opts.length} options < ${POOL_MIN}`));
    const keys = new Set();
    for (const o of opts) {
      if (o.color != null) {
        if (!COLOR_WORDS.en[o.color]) f.push(tag(`colour "${o.color}" ∉ COLOR_WORDS`));
        for (const loc of LOCALES) if (!COLOR_WORDS[loc] || !COLOR_WORDS[loc][o.color]) f.push(tag(`colour "${o.color}" has no ${loc} word`));
        if (keys.has('color:' + o.color)) f.push(tag(`colour "${o.color}" repeats`)); keys.add('color:' + o.color);
        continue;
      }
      const ref = `${o.theme}/${o.noun}`;
      if (BW_MARKER.test(String(o.theme))) f.push(tag(`option ${ref} is in a B&W dir (localized marker)`));
      if (o.picOpened !== true) f.push(tag(`option ${ref} picOpened is not true`));
      try { fileUri(o.theme, o.noun); } catch (e) { f.push(tag(`option ${ref} does not resolve: ${e.message}`)); continue; }
      const n = m.themes[o.theme] && m.themes[o.theme].nouns[o.noun];
      const key = n && n.vocabKey;
      if (!key) { f.push(tag(`option ${ref} has no vocabKey`)); continue; }
      if (keys.has(key)) f.push(tag(`vocabKey ${key} repeats`)); keys.add(key);
      for (const loc of LOCALES) {
        if (!v[key] || !v[key][loc] || !v[key][loc][0]) f.push(tag(`option ${ref} has no ${loc} singular`));
        if (excluded(key, loc)) f.push(tag(`option ${ref} is B2_EXCLUDE'd in ${loc}`));
      }
    }
  }
  const face = P.face || {};
  try { fileUri(face.theme, face.noun); } catch (e) { f.push(`face does not resolve: ${e.message}`); }
  if (face.picOpened !== true) f.push('face picOpened is not true');
  const an = face.anchors || {};
  if (Object.keys(an).sort().join() !== [...ANCHORS].sort().join()) f.push(`anchors ${JSON.stringify(Object.keys(an))} ≠ the seven ids`);
  for (const [k, a] of Object.entries(an)) {
    if (!(a && a.x > 0 && a.x < 1 && a.y > 0 && a.y < 1)) f.push(`anchor ${k} is not a fraction of the box`);
    if (!(a && (a.side === 'L' || a.side === 'R'))) f.push(`anchor ${k} side must be L or R`);
  }
  const actions = Array.isArray(P.actions) ? P.actions : [];
  if (actions.length < 12) f.push(`${actions.length} actions < 12`);
  const aids = new Set();
  for (const a of actions) {
    if (!a.id || aids.has(a.id)) f.push(`action ${a.id}: missing or duplicate id`); aids.add(a.id);
    const ref = a.cue ? `${a.cue.theme}/${a.cue.noun}` : '?';
    if (!a.cue || BW_MARKER.test(String(a.cue.theme))) f.push(`action ${a.id}: cue ${ref} is in a B&W dir`);
    if (a.picOpened !== true) f.push(`action ${a.id}: picOpened is not true`);
    try { fileUri(a.cue.theme, a.cue.noun); } catch (e) { f.push(`action ${a.id}: cue ${ref} does not resolve: ${e.message}`); }
  }
  return f;
}

/** Every F1 option label per locale: {cat, key, loc, text}. */
function poolLabels(P) {
  const v = vocab();
  const m = resolve.manifest();
  const out = [];
  for (const c of P.categories || []) for (const o of c.options || []) for (const loc of LOCALES) {
    if (o.color != null) { out.push({ cat: c.id, key: 'color:' + o.color, loc, text: COLOR_WORDS[loc][o.color] }); continue; }
    const n = m.themes[o.theme] && m.themes[o.theme].nouns[o.noun];
    const key = n && n.vocabKey;
    const cite = key && v[key] && v[key][loc] && v[key][loc][0];
    out.push({ cat: c.id, key: `${o.theme}/${o.noun}`, loc, text: cite ? displayWord(cite, loc) : '' });
  }
  return out;
}

/* ---------------------------------------------------------------- render */
async function renderWith(page, type, { difficulty, baseName, strings }) {
  const out = await renderInstance({ type, theme: null, difficulty, locale: 'en', page, outDir: OUT, baseName, strings });
  const m = await page.evaluate(() => {
    const rect = (el) => { const r = el.getBoundingClientRect(); return { left: r.left, right: r.right, top: r.top, bottom: r.bottom, w: r.width, h: r.height }; };
    const root = document.querySelector('[data-lcs-type="all-about-me"]');
    const q = (s) => root ? root.querySelector(s) : null;
    const qa = (s) => root ? [...root.querySelectorAll(s)] : [];
    const name = q('[data-lcs-name]');
    const age = q('[data-lcs-age]');
    const lane = q('[data-lcs-agelane]');
    const banner = q('[data-lcs-banner]');
    const nameIs = q('[data-lcs-label-key="nameIs"]');
    const portrait = q('[data-lcs-portrait]');
    const zone = q('[data-lcs-drawbox="portrait"]');
    return {
      body: rect(document.querySelector('[data-lcs-body]')),
      foot: document.querySelector('.ws-foot').getBoundingClientRect().top,
      headH: rect(document.querySelector('.ws-head')).h,
      stamps: root ? { ...root.dataset } : null,
      name: name ? { ...rect(name), text: name.textContent.trim(), glyph: (() => { const ls = name.querySelectorAll('line'); return ls.length >= 3 ? +ls[2].getAttribute('y1') - +ls[0].getAttribute('y1') : 0; })() } : null,
      age: age ? { ...rect(age), answer: age.getAttribute('data-lcs-answer') } : null,
      ageRow: lane ? { inner: lane.getBoundingClientRect().width - 36, w: [...lane.children].reduce((s, k) => s + k.getBoundingClientRect().width, 0) } : null,
      banner: banner ? rect(banner) : null,
      nameIs: nameIs ? { w: nameIs.scrollWidth, clientW: nameIs.clientWidth, px: parseFloat(getComputedStyle(nameIs).fontSize), text: nameIs.textContent.trim() } : null,
      portrait: portrait ? rect(portrait) : null,
      zone: zone ? rect(zone) : null,
      boxes: qa('[data-lcs-drawbox]').map((b) => ({ key: b.dataset.lcsDrawbox, ...rect(b) })),
      windows: qa('[data-lcs-favourite]').map((w) => { const h = w.querySelector('[data-lcs-heading]'); return { key: w.dataset.lcsFavourite, ...rect(w), headingH: h ? h.getBoundingClientRect().height : 0, heading: h ? h.textContent.trim() : '' }; }),
      labels: qa('[data-lcs-label-key]').map((l) => ({ key: l.dataset.lcsLabelKey, text: l.textContent.trim(), w: l.scrollWidth, clientW: l.clientWidth, px: parseFloat(getComputedStyle(l).fontSize) })),
      answers: qa('[data-lcs-answer]').map((a) => a.getAttribute('data-lcs-answer')),
      lowest: Math.max(...qa('*').map((el) => el.getBoundingClientRect().bottom)),
    };
  });
  return { lints: out.qa.lints, verify: out.qa.verify, m, png: out.pngPath, html: out.html };
}

const LABEL_BY_KEY = { nameIs: 'nameIs', agePre: 'age.pre', agePost: 'age.post', thisIsMe: 'thisIsMe', family: 'family', school: 'school',
  'fav-animal': 'favHeading.animal', 'fav-food': 'favHeading.food', 'fav-color': 'favHeading.color', 'fav-toy': 'favHeading.toy' };

function assertRender(name, r, d, bank, opts) {
  const cfg = TYPE.difficulty[d];
  const squeezed = !!(opts && opts.squeezed);
  const m = r.m;
  ok(r.verify.length === 0, `${name}: verify() ${JSON.stringify(r.verify)}`);
  ok(r.lints.length === 0, `${name}: lints ${JSON.stringify(r.lints)}`);
  if (!m.stamps) { ok(false, `${name}: no root`); return; }
  // the name lane + glyph rule
  ok(!!m.name && m.name.text === '' && m.name.h >= K_FLOOR, `${name}: name lane ${m.name && Math.round(m.name.h)} px / text "${m.name && m.name.text}"`);
  ok(!!m.name && Math.abs(m.name.w - cfg.laneW) < 1, `${name}: name lane ${m.name && Math.round(m.name.w)} ≠ ${cfg.laneW}`);
  ok(!!m.name && m.name.glyph >= cfg.glyphH - 1 && m.name.glyph <= cfg.glyphH + 1, `${name}: writing row rules ${m.name && m.name.glyph.toFixed(1)} apart ≠ glyphH ${cfg.glyphH}`);
  ok(!!m.banner && Math.abs(m.banner.h - cfg.bannerH) < 1 && Math.abs(m.banner.w - 675) < 1, `${name}: banner ${m.banner && Math.round(m.banner.w)}×${m.banner && Math.round(m.banner.h)} ≠ 675×${cfg.bannerH}`);
  ok(!!m.nameIs && m.nameIs.w <= BANNER_CAP + 0.6 && m.nameIs.w <= m.nameIs.clientW + 0.6 && m.nameIs.px === cfg.labelPx, `${name}: banner label "${m.nameIs && m.nameIs.text}" ${m.nameIs && m.nameIs.w} px (cap ${BANNER_CAP}, box ${m.nameIs && m.nameIs.clientW}, ${m.nameIs && m.nameIs.px}px)`);
  // the age box: the K floor, the config, an EMPTY answer stamp, the row inside the lane
  ok(!!m.age && Math.min(m.age.w, m.age.h) >= K_FLOOR, `${name}: age box ${m.age && Math.round(m.age.w)}×${m.age && Math.round(m.age.h)} < the K floor ${K_FLOOR}`);
  ok(!!m.age && Math.abs(m.age.w - cfg.box) < 1 && Math.abs(m.age.h - cfg.box) < 1, `${name}: age box ${m.age && Math.round(m.age.w)}×${m.age && Math.round(m.age.h)} ≠ config ${cfg.box}`);
  ok(!!m.age && m.age.answer === '', `${name}: age box data-lcs-answer="${m.age && m.age.answer}" (an open box carries "")`);
  ok(m.answers.every((a) => a === ''), `${name}: an answer value is stamped: ${JSON.stringify(m.answers)}`);
  ok(!!m.ageRow && m.ageRow.w <= m.ageRow.inner + 0.6, `${name}: age row ${m.ageRow && Math.round(m.ageRow.w)} > lane inner ${m.ageRow && Math.round(m.ageRow.inner)}`);
  // the portrait: width === config; square unless stretched; zone >= size-32 x size-48
  ok(!!m.portrait && Math.abs(m.portrait.w - cfg.portrait) < 1, `${name}: portrait ${m.portrait && Math.round(m.portrait.w)} wide ≠ ${cfg.portrait}`);
  if (cfg.portraitStretch) ok(!!m.portrait && m.portrait.h >= cfg.portrait - 0.6, `${name}: stretched portrait ${m.portrait && Math.round(m.portrait.h)} < ${cfg.portrait}`);
  else ok(!!m.portrait && Math.abs(m.portrait.h - cfg.portrait) < 1, `${name}: portrait ${m.portrait && Math.round(m.portrait.h)} high ≠ ${cfg.portrait} (square)`);
  ok(!!m.zone && m.zone.w >= cfg.portrait - 32 - 0.6 && m.zone.h >= cfg.portrait - 48 - 0.6, `${name}: portrait zone ${m.zone && Math.round(m.zone.w)}×${m.zone && Math.round(m.zone.h)} < ${cfg.portrait - 32}×${cfg.portrait - 48}`);
  // drawing zones: stamp count, keys, family >= familyMin, favourites' zones >= floor
  const wantBoxes = 2 + (cfg.favourites ? cfg.favourites.length : 0);
  ok(m.boxes.length === wantBoxes && +m.stamps.lcsDrawboxes === wantBoxes, `${name}: ${m.boxes.length} drawing zones (stamp ${m.stamps.lcsDrawboxes}), want ${wantBoxes}`);
  const fam = m.boxes.find((b) => b.key === 'family');
  ok(!!fam && fam.h >= cfg.familyMin - 0.6 && Math.abs(fam.w - (675 - cfg.portrait - 15)) < 1, `${name}: family box ${fam && Math.round(fam.w)}×${fam && Math.round(fam.h)} (want ${675 - cfg.portrait - 15} × >= ${cfg.familyMin})`);
  // favourites
  const favs = cfg.favourites || [];
  ok(m.windows.length === favs.length, `${name}: ${m.windows.length} favourite windows, want ${favs.length}`);
  ok(m.windows.map((w) => w.key).join() === favs.join(), `${name}: favourite order ${m.windows.map((w) => w.key).join()} ≠ ${favs.join()}`);
  const zoneFloor = squeezed ? cfg.favMin - 70 : cfg.favH - 70;   // 220 → 150 (design); the squeeze may take the row to favMin
  for (const w of m.windows) {
    ok(Math.abs(w.w - cfg.favW) < 1 && w.h >= (squeezed ? cfg.favMin : cfg.favH) - 0.6, `${name}: window ${w.key} ${Math.round(w.w)}×${Math.round(w.h)} (want ${cfg.favW} × >= ${squeezed ? cfg.favMin : cfg.favH})`);
    ok(w.headingH <= 40.6, `${name}: heading "${w.heading}" ${Math.round(w.headingH)} px (> 2 lines of 20)`);
    const z = m.boxes.find((b) => b.key === 'fav-' + w.key);
    ok(!!z && z.h >= zoneFloor - 0.6 && z.w >= cfg.favW - 28 - 0.6, `${name}: zone fav-${w.key} ${z && Math.round(z.w)}×${z && Math.round(z.h)} < ${cfg.favW - 28}×${zoneFloor}`);
  }
  // the node cross-check: every printed literal === the EN bank literal
  for (const l of m.labels) {
    const key = LABEL_BY_KEY[l.key];
    const want = key ? get(bank.labels, key) : null;
    ok(!!want && l.text === want, `${name}: label ${l.key} prints "${l.text}" ≠ bank "${want}"`);
    ok(l.w <= l.clientW + 0.6, `${name}: label ${l.key} "${l.text}" clipped (${l.w} > ${l.clientW})`);
    ok(l.px >= 14, `${name}: label ${l.key} at ${l.px}px < 14`);
  }
  // geometry: everything above the footer and inside the body column
  ok(m.lowest <= m.foot + 0.6, `${name}: content reaches ${Math.round(m.lowest)} against the footer at ${Math.round(m.foot)}`);
  for (const b of [...m.boxes, ...m.windows, m.banner, m.portrait].filter(Boolean)) {
    ok(b.left >= m.body.left - 0.6 && b.right <= m.body.right + 0.6 && b.bottom <= m.foot + 0.6, `${name}: ${b.key || 'a frame'} leaves the body column`);
  }
}

/* --------------------------------------------------------------- pool gate */
/** Render every label at Nunito 800 16 through the real pipeline (file:// fonts) and read scrollWidth. */
async function measureLabels(page, labels, baseName) {
  const F = tokens.font;
  const type = Object.assign({}, TYPE, { build() {
    return { bodyHtml: `<div data-ws-content style="display:flex;flex-wrap:wrap;gap:4px 10px;align-content:flex-start">` +
      labels.map((l, i) => `<span data-lcs-m="${i}" style="display:inline-block;font-family:${F.body},sans-serif;font-weight:800;font-size:16px;line-height:20px;white-space:nowrap">${l.text.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</span>`).join('') + `</div>`, meta: {} };
  }, verify: null });
  await renderInstance({ type, theme: null, difficulty: 2, locale: 'en', page, outDir: OUT, baseName });
  const widths = await page.evaluate(() => [...document.querySelectorAll('[data-lcs-m]')].map((s) => ({ i: +s.dataset.lcsM, w: s.getBoundingClientRect().width, font: getComputedStyle(s).fontFamily })));
  return widths.map((x) => ({ ...labels[x.i], w: x.w, font: x.font }));
}

function poolFindings(measured) {
  const f = [];
  const byCat = {};
  for (const m of measured) {
    if (!m.text) { f.push(`${m.cat} ${m.key}: no ${m.loc} label`); continue; }
    if (m.w > POOL_CAP) f.push(`${m.cat} ${m.key}: ${m.loc} "${m.text}" ${m.w.toFixed(1)} px > ${POOL_CAP}`);
    (byCat[m.cat] = byCat[m.cat] || new Set()).add(m.key);
  }
  for (const [cat, keys] of Object.entries(byCat)) if (keys.size < POOL_MIN) f.push(`${cat}: ${keys.size} options < ${POOL_MIN}`);
  return f;
}

/* ----------------------------------------------------------------- poison */
function clone(o) { return JSON.parse(JSON.stringify(o)); }
const poisonLog = [];
function judge(name, findings, re, note) {
  const hit = findings.some((x) => re.test(x));
  const verdict = hit ? 'KILLED' : findings.length ? 'WRONG REASON' : 'SILENT';
  poisonLog.push(`  ${name}: ${verdict}${note ? ' (' + note + ')' : ''}${hit ? '' : ' — ' + JSON.stringify(findings.slice(0, 3))}`);
  return hit;
}
function buildRefusal(bank, d, loc) {
  try { TYPE._buildWith(bank, TYPE.difficulty[d], { locale: loc || 'en' }, { rng: makeRng('poison') }); return []; } catch (e) { return [e.message]; }
}
/** A type whose bodyHtml is the real d-build rewritten by `fn` (past the spec's own guards). */
function rewired(bank, fn, cfgPatch) {
  return Object.assign({}, TYPE, { build(args, ctx) {
    const cfg = cfgPatch ? { ...TYPE.difficulty[args.difficulty], ...cfgPatch } : TYPE.difficulty[args.difficulty];
    const out = TYPE._buildWith(bank, cfg, args, ctx);
    out.bodyHtml = fn(out.bodyHtml);
    return out;
  } });
}
/** Render a poisoned type and collect the gate's OWN findings without counting them against the control. */
async function gateFindings(page, type, d, baseName, bank, opts) {
  const r = await renderWith(page, type, { difficulty: d, baseName, strings: opts && opts.strings });
  const before = fails.length, saved = assertions;
  assertRender(baseName, r, d, bank, opts);
  const own = fails.splice(before);
  assertions = saved;
  return { r, own };
}
/** A synthetic locale block built from the EN shape with the locale's vocab face words (the P2/P3/P4 seams). */
function syntheticBlock(loc) {
  const b = clone(bankMod.ALL_ABOUT_ME.en);
  const v = vocab();
  for (const k of ANCHORS) b.faceWords[k] = displayWord(v[k][loc][0], loc);
  if (loc === 'fi') { b.labels.age = { pre: 'Olen', post: '-vuotias', glue: true }; }
  return b;
}

/**
 * Long-chrome fixtures (70-char title + 150-char instruction, both legal). The K-319 build
 * measured en chrome → body 778, a 3-line de title → ~733, a 4-line fi title → ~700.
 */
const LONG = {
  de: { title: 'Das bin ich: Schreibe deinen Namen und dein Alter und male dich selbst',
    instruction: 'Schreibe zuerst deinen Namen auf die Linie und dein Alter in das Kästchen, male dann dich selbst und deine Familie und danach deine Lieblingsdinge ab.', body: 740 },
  fi: { title: 'Minä itse: nimesi, omakuvasi, perheenjäsenesi, lempieläimesi ja lelusi',
    instruction: 'Kirjoita ensin nimesi viivalle ja ikäsi laatikkoon, piirrä sitten kuva itsestäsi ja perheestäsi ja lopuksi kolme lempiasiaasi omiin ikkunoihin tänään.', body: 705 },
};

async function main() {
  const banks = bankMod.ALL_ABOUT_ME;
  const P = bankMod.ALL_ABOUT_ME_PICTURES;
  for (const loc of Object.keys(banks)) {
    const f = validateBank(banks[loc], loc);
    ok(f.length === 0, `bank ${loc}: ${f.length} findings\n    ` + f.slice(0, 12).join('\n    '));
    console.log(`bank ${loc}: ${LABEL_KEYS.length} labels, ${Object.keys(banks[loc].faceWords || {}).length} face words, ${Object.keys(banks[loc].can || {}).length} can literals, refuse ${JSON.stringify(banks[loc].refuse || [])}`);
  }
  {
    const f = validatePictures(P);
    ok(f.length === 0, `pictures: ${f.length} findings\n    ` + f.slice(0, 12).join('\n    '));
    console.log(`pictures: ${P.categories.map((c) => c.id + ' ' + c.options.length).join(' / ')}, ${P.actions.length} actions, ${Object.keys(P.face.anchors).length} anchors`);
  }
  const en = banks.en;
  for (const k of Object.keys(LONG)) ok([...LONG[k].title].length === 70 && [...LONG[k].instruction].length === 150, `long-chrome fixture ${k} is ${[...LONG[k].title].length}/${[...LONG[k].instruction].length} chars, want 70/150`);

  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  const pngs = [];
  try {
    // 2. renders through the real pipeline
    for (const d of [1, 2, 3]) {
      const r = await renderWith(page, TYPE, { difficulty: d, baseName: `K-323-gate-d${d}-en` });
      assertRender(`d${d}`, r, d, en);
      pngs.push(r.png);
      console.log(`render d${d}: verify ${r.verify.length} lints ${r.lints.length} body ${Math.round(r.m.body.h)} px, box ${Math.round(r.m.age.w)}, lane ${Math.round(r.m.name.h)} (rules ${r.m.name.glyph.toFixed(1)} apart), portrait ${Math.round(r.m.portrait.w)}×${Math.round(r.m.portrait.h)}, banner label ${r.m.nameIs.w.toFixed(1)}, age row ${Math.round(r.m.ageRow.w)}/${Math.round(r.m.ageRow.inner)}, lowest ${Math.round(r.m.lowest)} vs foot ${Math.round(r.m.foot)}`);
    }
    for (const k of Object.keys(LONG)) for (const d of [1, 2, 3]) {
      const r = await renderWith(page, TYPE, { difficulty: d, baseName: `K-323-gate-d${d}-en-longchrome-${k}`, strings: LONG[k] });
      assertRender(`d${d} long chrome ${k}`, r, d, en, { squeezed: true });
      pngs.push(r.png);
      ok(r.m.body.h <= LONG[k].body, `d${d} long chrome ${k}: body ${Math.round(r.m.body.h)} px — the fixture did not squeeze the body to <= ${LONG[k].body} (head ${Math.round(r.m.headH)} px)`);
      console.log(`render d${d} long chrome ${k}: verify ${r.verify.length} lints ${r.lints.length} body ${Math.round(r.m.body.h)} px (head ${Math.round(r.m.headH)} px), windows ${r.m.windows.map((w) => Math.round(w.h)).join('/') || '-'}, lowest ${Math.round(r.m.lowest)} vs foot ${Math.round(r.m.foot)}`);
    }
    // the fi glue contract on a synthetic fi block (`Olen [ ] -vuotias`): the suffix TOUCHES the box
    {
      const r = await renderWith(page, rewired(syntheticBlock('fi'), (h) => h), { difficulty: 2, baseName: 'K-323-gate-d2-glue-fi' });
      ok(r.verify.length === 0 && r.lints.length === 0, `glue fi: verify ${JSON.stringify(r.verify)} lints ${JSON.stringify(r.lints)}`);
      const gap = await page.evaluate(() => { const a = document.querySelector('[data-lcs-age]').getBoundingClientRect(); const p = document.querySelector('[data-lcs-label-key="agePost"]').getBoundingClientRect(); return p.left - a.right; });
      ok(Math.abs(gap) < 0.6, `glue fi: the -vuotias suffix sits ${gap.toFixed(1)} px off the box`);
      const unglued = rewired(syntheticBlock('fi'), (h) => h.replace('data-lcs-glue="1"', 'data-lcs-glue="0"').replace('flex:0 0 0px;width:0px', 'flex:0 0 10px;width:10px'));
      const r2 = await renderWith(page, unglued, { difficulty: 2, baseName: 'K-323-gate-poison-glue' });
      ok(r2.verify.some((x) => /glue stamp disagrees|glue without/.test(x)) || r2.verify.some((x) => /sits \d+ px off the box|leading hyphen/.test(x)), `glue fi poison (a 10 px gap before the suffix) was not caught: ${JSON.stringify(r2.verify)}`);
      pngs.push(r.png);
      console.log(`render d2 glue fi: verify ${r.verify.length} lints ${r.lints.length} suffix gap ${gap.toFixed(1)} px`);
    }
    // a locale without a bank block REFUSES (never an en fallback)
    let refused = false;
    try { TYPE.build({ theme: null, difficulty: 2, locale: 'de' }, { rng: makeRng('x') }); } catch (e) { refused = /no de block/.test(e.message); }
    ok(refused, 'an unauthored locale must REFUSE (throw), not fall back to en');

    // 3. seed sweep: the base is seedless → byte-identical
    if (!QUICK) {
      for (const d of [1, 2, 3]) {
        const htmls = new Set();
        for (let k = 1; k <= 20; k++) {
          const rng = makeRng(instanceSeed({ typeId: 'K-323', theme: null, difficulty: d, seedEpoch: k }));
          htmls.add(TYPE.build({ theme: null, difficulty: d, locale: 'en' }, { rng }).bodyHtml);
        }
        ok(htmls.size === 1, `sweep d${d}: ${htmls.size} distinct bodies over 20 seeds (the base must be byte-identical)`);
      }
      console.log('sweep: 20 seeds × d1/d2/d3 → 1 body each (byte-identical, seedless)');
    }

    // 4. the global pool gate (F1 labels at Nunito 800 16, all 11 locales, real fonts)
    const measured = await measureLabels(page, poolLabels(P), 'K-323-gate-pool');
    ok(measured.every((m) => /nunito/i.test(m.font)), `pool: the measurement page did not resolve Nunito (${measured[0] && measured[0].font})`);
    const pf = poolFindings(measured);
    ok(pf.length === 0, `pool: ${pf.length} findings\n    ` + pf.slice(0, 12).join('\n    '));
    const widest = measured.slice().sort((a, b) => b.w - a.w).slice(0, 4).map((m) => `${m.loc} "${m.text}" ${m.w.toFixed(1)}`);
    console.log(`pool: ${measured.length} labels measured (${LOCALES.length} locales), widest ${widest.join(' · ')}`);

    // 5. poisons
    let killed = 0;
    const TOTAL = 15;
    // P1 — an option that is not cached
    {
      const p = clone(P); p.categories.find((c) => c.id === 'food').options.push({ theme: 'fruits', noun: 'durian', picOpened: true });
      // control: a cached fruit the list does not already hold (the design's `banana` is already in the
      // food list via the supermarket dir, so it is correctly rejected as a repeated vocabKey)
      const ctl = clone(P); ctl.categories.find((c) => c.id === 'food').options.push({ theme: 'fruits', noun: 'mango', picOpened: true });
      const a = judge('P1', validatePictures(p), /option fruits\/durian does not resolve/);
      const c = validatePictures(ctl).filter((x) => /mango/.test(x)).length === 0;
      poisonLog.push(`  P1 control: fruits/mango ${c ? 'resolves' : 'REJECTED'}`);
      if (a && c) killed++;
    }
    // P2 — a slot in a de heading (synthetic de block): the validator AND the spec refuse
    {
      const b = syntheticBlock('de'); b.labels.favHeading.animal = 'Mein Lieblings{noun}';
      const a = judge('P2 bank', validateBank(b, 'de'), /favHeading\.animal .* carries a slot/);
      const c = judge('P2 build', buildRefusal(b, 2, 'de'), /favHeading\.animal carries a slot/, 'the spec refused the poisoned bank');
      if (a && c) killed++;
    }
    // P3 — de faceWords.eye 'Augen' (plural ≠ singular; control Auge)
    {
      const b = syntheticBlock('de'); b.faceWords.eye = 'Augen';
      const ctl = validateBank(syntheticBlock('de'), 'de').filter((x) => /faceWords/.test(x));
      const a = judge('P3', validateBank(b, 'de'), /faceWords\.eye "Augen" ≠ vocab singular "Auge"/);
      if (a && ctl.length === 0) killed++; else poisonLog.push(`  P3 control: ${JSON.stringify(ctl)}`);
    }
    // P4 — fr can.swim 'Natation' (= the vocab noun; control 'Je sais nager')
    {
      const b = syntheticBlock('fr'); b.can.swim = 'Natation';
      const ctl = syntheticBlock('fr'); ctl.can.swim = 'Je sais nager';
      const a = judge('P4', validateBank(b, 'fr'), /can\.swim "Natation" equals the vocab word/);
      const c = validateBank(ctl, 'fr').filter((x) => /can\.swim/.test(x)).length === 0;
      if (a && c) killed++; else poisonLog.push('  P4 control: "Je sais nager" was rejected');
    }
    // P5 — an option from the animals bw dir
    {
      const p = clone(P); p.categories.find((c) => c.id === 'animal').options.push({ theme: 'animals bw', noun: 'cat', picOpened: true });
      if (judge('P5', validatePictures(p), /option animals bw\/cat is in a B&W dir/)) killed++;
    }
    // P7 — colours + pink: the fi label over the global 96 px ceiling
    {
      const p = clone(P); p.categories.find((c) => c.id === 'color').options.push({ color: 'pink' });
      const mm = await measureLabels(page, poolLabels(p), 'K-323-gate-poison-P7');
      const pink = mm.find((m) => m.key === 'color:pink' && m.loc === 'fi');
      if (judge('P7', poolFindings(mm), /color color:pink: fi "vaaleanpunainen" [\d.]+ px > 96/, `fi measured ${pink && pink.w.toFixed(1)} px`)) killed++;
    }
    // P9' — a 40 px age box: the spec guard refuses; past the guard the gate's OWN floor fires
    {
      const a = judge('P9 guard', (() => { try { TYPE._buildWith(en, { ...TYPE.difficulty[2], box: 40 }, { locale: 'en' }, {}); return []; } catch (e) { return [e.message]; } })(), /numeral box 40 < the K floor 56/);
      const shrunk = rewired(en, (h) => h.replace(/width:64px;height:64px;flex:0 0 64px/, 'width:40px;height:40px;flex:0 0 40px'));
      const { r, own } = await gateFindings(page, shrunk, 2, 'K-323-gate-poison-P9', en);
      const c = judge('P9 floor', own, /age box 40×40 < the K floor 56/, `verify ${r.verify.length} (its own floor fires too)`);
      if (a && c) killed++;
    }
    // P12' — the design's RIGID 722 stack (84 + 300 + 314 fixed) under the fi 4-line chrome → the footer lint
    {
      const rigid = rewired(en, (h) => h.replace('grid-template-rows:84px 300px minmax(220px,1fr)', 'grid-template-rows:84px 300px 314px'));
      const r = await renderWith(page, rigid, { difficulty: 2, baseName: 'K-323-gate-poison-P12', strings: LONG.fi });
      if (judge('P12', r.lints, /footer overlap/, `body ${Math.round(r.m.body.h)} px, lowest ${Math.round(r.m.lowest)} vs foot ${Math.round(r.m.foot)}`)) killed++;
    }
    // P13 — answerBox in the age lane → data-lcs-answer="undefined"
    {
      const box = answerBox({ w: 64, h: 64 });
      const swapped = rewired(en, (h) => h.replace(/<span class="ws-blankbox" data-lcs-age data-lcs-answer="" [^>]*><\/span>/, box.replace('<span class="ws-answerbox"', '<span class="ws-answerbox" data-lcs-age')));
      const { r, own } = await gateFindings(page, swapped, 2, 'K-323-gate-poison-P13', en);
      const a = judge('P13 verify', r.verify, /an answer value "undefined" is stamped on an open box/);
      const c = judge('P13 node', own, /data-lcs-answer="undefined"/);
      if (a && c) killed++;
    }
    // PN — a digit in the age literal: the spec refuses; past the guard verify() sees the digit
    {
      const b = clone(en); b.labels.age.pre = 'I am 5';
      const a = judge('PN guard', buildRefusal(b, 2), /labels\.age\.pre prints a digit/);
      const digit = rewired(en, (h) => h.replace('>I am<', '>I am 5<'));
      const r = await renderWith(page, digit, { difficulty: 2, baseName: 'K-323-gate-poison-PN' });
      const c = judge('PN verify', r.verify, /a digit is printed in the body/);
      if (a && c) killed++;
    }
    // PL — a pre-filled name lane (a model name on the writing row)
    {
      const filled = rewired(en, (h) => h.replace(/(<span data-lcs-name [^>]*>)/, '$1<span style="position:absolute">Anna</span>'));
      const r = await renderWith(page, filled, { difficulty: 2, baseName: 'K-323-gate-poison-PL' });
      if (judge('PL', r.verify, /the name lane prints "Anna"/)) killed++;
    }
    // PH — a heading that is not the bank literal (verify() cannot see it; the node cross-check must)
    {
      const wrong = rewired(en, (h) => h.replace('>My favorite food<', '>My favourite food<'));
      const { r, own } = await gateFindings(page, wrong, 2, 'K-323-gate-poison-PH', en);
      const a = judge('PH node', own, /label fav-food prints "My favourite food" ≠ bank "My favorite food"/, `verify ${r.verify.length} (blind by design)`);
      if (a) killed++;
    }
    // PH2 — a 3-line heading
    {
      const b = clone(en); b.labels.favHeading.food = 'My most favorite food of all the foods in the world';
      const r = await renderWith(page, rewired(b, (h) => h), { difficulty: 2, baseName: 'K-323-gate-poison-PH2' });
      if (judge('PH2', r.verify, /heading ".*" runs \d+ px \(> 2 lines\)/)) killed++;
    }
    // PO — d3 windows pinned at min-height 220 (the first build) under the fi 4-line chrome: the 208 px row
    // cannot hold them and they spill 12 px into the gap before the sentence lane (touching it) — nothing in qa/lints.js sees it; verify() must
    {
      const spill = rewired(en, (h) => h.replace(/min-height:196px;background:#FFFFFF;border:2px solid/g, 'min-height:220px;background:#FFFFFF;border:2px solid'));
      const r = await renderWith(page, spill, { difficulty: 3, baseName: 'K-323-gate-poison-PO', strings: LONG.fi });
      if (judge('PO', r.verify, /lcsFavourite animal spills 12 px outside its row/, `lints ${r.lints.length} (blind by design)`)) killed++;
    }
    // PD — a favourite window without its draw zone
    {
      const gone = rewired(en, (h) => h.replace(' data-lcs-drawbox="fav-food"', ''));
      const r = await renderWith(page, gone, { difficulty: 2, baseName: 'K-323-gate-poison-PD' });
      const a = judge('PD', r.verify, /2 drawing zones|4 drawing zones, stamp 5/);
      const c = judge('PD window', r.verify, /favourite food: no draw zone/);
      if (a && c) killed++;
    }
    console.log('poison:\n' + poisonLog.join('\n'));
    const allKilled = killed === TOTAL;
    if (fails.length) console.log('FAILS:\n  ' + fails.join('\n  '));
    console.log('PNGs: ' + pngs.map((p) => path.relative(process.cwd(), p)).join(' '));
    const pass = !fails.length && allKilled;
    console.log(pass ? `PASS (${assertions} assertions, ${killed}/${TOTAL} poisons killed${QUICK ? ', --quick: sweep skipped' : ''})` : `FAIL (${fails.length} findings, ${killed}/${TOTAL} poisons killed)`);
    process.exit(pass ? 0 : 1);
  } finally {
    await browser.close();
  }
}

if (require.main === module) main().catch((e) => { console.error(e && e.stack || e); process.exit(1); });
module.exports = { validateBank, validatePictures, poolLabels, poolFindings, LABEL_KEYS };
