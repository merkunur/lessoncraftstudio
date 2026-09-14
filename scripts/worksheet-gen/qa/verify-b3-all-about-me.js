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
const FACE_IDS = ['K-342', 'K-343', 'K-344', 'K-345', 'K-346'];   // the five Phase 2 faces (_records/b3var-id-allocation.json)
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
  // rule 8 — strings: the base + the five faces (title <= 70, no worksheet word, instruction <= 150, titles distinct in the family)
  const titles = new Set();
  for (const id of ['K-323', ...FACE_IDS]) {
    const s = bank.strings && bank.strings[id];
    if (!s) { push(`strings ${id} missing`); continue; }
    if (!s.title || [...s.title].length > 70) push(`${id} title > 70 chars`);
    if (WORKSHEET_WORD.test(s.title || '')) push(`${id} title carries the worksheet word`);
    if (!s.instruction || [...s.instruction].length > 150) push(`${id} instruction > 150 chars`);
    const t = (s.title || '').toLocaleLowerCase(loc);
    if (titles.has(t)) push(`${id} title "${s.title}" repeats within the family`); titles.add(t);
  }
  // rule 9 (Phase 2, F1) — every optionWords literal present is the vocab singular via displayWord (a MISSING key is a
  // per-locale drop, never a finding; a WRONG one is); no slot, no digit
  const ow = bank.optionWords || {};
  for (const [key, w] of Object.entries(ow)) {
    if (typeof w !== 'string' || !w.trim()) { push(`optionWords.${key} empty`); continue; }
    if (w.includes('{') || /\d/.test(w)) push(`optionWords.${key} "${w}" is not a whole literal`);
    const cite = v[key] && v[key][loc] && v[key][loc][0];
    if (!cite) push(`optionWords.${key}: no vocab singular in ${loc}`);
    else if (w !== displayWord(cite, loc)) push(`optionWords.${key} "${w}" ≠ vocab singular "${displayWord(cite, loc)}"`);
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

/* ------------------------------------------------------------ Phase 2 faces */
const fs = require('fs');
/** The emitted face spec by id (types/k/<id>-<slug>.js — the slug is the rows module's). */
function loadFace(id) {
  const dir = path.join(__dirname, '..', 'types', 'k');
  const f = fs.readdirSync(dir).find((x) => x.startsWith(id + '-'));
  if (!f) throw new Error(`face spec ${id} is not on disk — run node tools/gen-b3var-specs.js`);
  return require(path.join(dir, f));
}
const FACE_BY_LAYOUT = { favourites: 'K-342', family: 'K-343', face: 'K-344', ican: 'K-345', name: 'K-346' };
/** A face type whose bodyHtml is the real build rewritten by `fn` (past the spec's guards); `seed` swaps the picture seed, `cfgPatch` the config. */
function rewiredFace(face, bank, fn, cfgPatch, seed) {
  const t = Object.assign({}, face, seed ? { _pictures: () => seed } : {});
  return Object.assign({}, face, { build(args, ctx) {
    const cfg = cfgPatch ? { ...face.difficulty[args.difficulty], ...cfgPatch } : face.difficulty[args.difficulty];
    const out = t._buildWith(bank, cfg, args, ctx);
    if (fn) out.bodyHtml = fn(out.bodyHtml);
    return out;
  } });
}
function faceRefusal(face, bank, cfgPatch, seed) {
  const t = Object.assign({}, face, seed ? { _pictures: () => seed } : {});
  try { t._buildWith(bank, { ...face.difficulty[2], ...(cfgPatch || {}) }, { locale: 'en' }, { rng: makeRng('poison') }); return []; } catch (e) { return [e.message]; }
}

/** Render a face through the real pipeline and measure what its gate asserts. */
async function renderFace(page, type, { baseName, strings, seedEpoch }) {
  const out = await renderInstance({ type, theme: null, difficulty: 2, locale: 'en', page, outDir: OUT, baseName, strings, seedEpoch });
  const m = await page.evaluate(() => {
    const rect = (el) => { const r = el.getBoundingClientRect(); return { left: r.left, right: r.right, top: r.top, bottom: r.bottom, w: r.width, h: r.height }; };
    const root = document.querySelector('[data-lcs-type="all-about-me"]');
    const qa = (s) => root ? [...root.querySelectorAll(s)] : [];
    return {
      body: rect(document.querySelector('[data-lcs-body]')),
      foot: document.querySelector('.ws-foot').getBoundingClientRect().top,
      headH: rect(document.querySelector('.ws-head')).h,
      stamps: root ? { ...root.dataset } : null,
      lowest: Math.max(...qa('*').map((el) => el.getBoundingClientRect().bottom)),
      labels: qa('[data-lcs-label-key]').map((l) => ({ key: l.dataset.lcsLabelKey, text: l.textContent.trim(), w: l.scrollWidth, clientW: l.clientWidth, px: parseFloat(getComputedStyle(l).fontSize) })),
      answers: qa('[data-lcs-answer]').map((a) => a.getAttribute('data-lcs-answer')),
      // F1
      rows: qa('[data-lcs-favrow]').map((r) => ({ cat: r.dataset.lcsFavrow, ...rect(r), tiles: [...r.querySelectorAll('[data-lcs-opt]')].map((t) => { const l = t.querySelector('[data-lcs-opt-label]'); return { key: t.dataset.lcsOpt, text: l ? l.textContent.trim() : '', labelW: l ? l.scrollWidth : 0, ...rect(t) }; }), strip: r.querySelector('[data-lcs-options]') ? r.querySelector('[data-lcs-options]').scrollWidth : 0 })),
      // F2
      frames: qa('[data-lcs-frame]').map((f) => ({ key: f.dataset.lcsFrame, ...rect(f), counters: f.querySelectorAll('[data-lcs-counter]').length, tf: f.querySelector('svg[data-lcs-prim="ten-frame"]') ? rect(f.querySelector('svg[data-lcs-prim="ten-frame"]')) : null, box: f.querySelector('[data-lcs-count]') ? rect(f.querySelector('[data-lcs-count]')) : null })),
      drawboxes: qa('[data-lcs-drawbox]').map((b) => ({ key: b.dataset.lcsDrawbox, ...rect(b) })),
      // F3
      bank: qa('[data-lcs-bank-banner] [data-lcs-bank]').map((w) => ({ id: w.dataset.lcsBank, text: w.textContent.trim(), w: w.scrollWidth })),
      lanes: qa('[data-lcs-label]').map((l) => ({ id: l.dataset.lcsLabel, side: l.dataset.lcsSide, ...rect(l) })),
      facePic: qa('img[data-lcs-face-pic]').map(rect)[0] || null,
      pointers: qa('line[data-lcs-pointer]').map((l) => ({ id: l.dataset.lcsPointer, ax: +l.dataset.lcsAx, ay: +l.dataset.lcsAy, lx: +l.dataset.lcsLx, ly: +l.dataset.lcsLy })),
      // F4
      cards: qa('[data-lcs-action]').map((c) => { const l = c.querySelector('[data-lcs-can]'); const im = c.querySelector('img'); return { id: c.dataset.lcsAction, ...rect(c), text: l ? l.textContent.trim() : '', lines: l ? Math.round(l.getBoundingClientRect().height / parseFloat(getComputedStyle(l).lineHeight)) : 0, pic: im ? Math.min(rect(im).w, rect(im).h) : 0, tick: c.querySelector('[data-lcs-tick]') ? rect(c.querySelector('[data-lcs-tick]')) : null }; }),
      ruling: qa('[data-lcs-ruling-row]').map(rect),
      // F5
      boxes: qa('svg[data-lcs-letterboxes]').map((s) => ({ n: +s.getAttribute('data-lcs-letterboxes'), rects: [...s.querySelectorAll('rect')].map(rect) })),
      pills: qa('[data-lcs-pill]').map((p) => ({ key: p.dataset.lcsPill, text: p.textContent.trim(), ...rect(p), clipped: p.scrollWidth > p.clientWidth + 0.6 })),
      countBoxes: qa('[data-lcs-count], [data-lcs-first]').map((b) => ({ key: (b.dataset.lcsCount || '') + (b.dataset.lcsFirst ? ' first' : ''), ...rect(b) })),
    };
  });
  return { lints: out.qa.lints, verify: out.qa.verify, m, png: out.pngPath, html: out.html };
}

/** The node-side assertions per face: floors + every printed literal === the bank (verify() is blind to the bank by design). */
function assertFace(name, layout, r, bank, P, opts) {
  const m = r.m, cfg = loadFace(FACE_BY_LAYOUT[layout]).difficulty[2];
  const v = vocab(), man = resolve.manifest();
  ok(r.verify.length === 0, `${name}: verify() ${JSON.stringify(r.verify)}`);
  ok(r.lints.length === 0, `${name}: lints ${JSON.stringify(r.lints)}`);
  if (!m.stamps) { ok(false, `${name}: no root`); return; }
  ok(m.stamps.lcsLayout === layout, `${name}: layout stamp "${m.stamps.lcsLayout}" ≠ ${layout}`);
  ok(m.answers.every((a) => a === ''), `${name}: an answer value is stamped: ${JSON.stringify(m.answers)}`);
  ok(m.lowest <= m.foot + 0.6, `${name}: content reaches ${Math.round(m.lowest)} against the footer at ${Math.round(m.foot)}`);
  for (const l of m.labels) {
    ok(l.w <= l.clientW + 0.6, `${name}: label ${l.key} "${l.text}" clipped (${l.w} > ${l.clientW})`);
    ok(l.px >= 14, `${name}: label ${l.key} at ${l.px}px < 14`);
  }
  const L = bank.labels;
  const labelIs = (key, bankPath) => { const l = m.labels.find((x) => x.key === key); ok(!!l && l.text === get(L, bankPath), `${name}: label ${key} prints "${l && l.text}" ≠ bank "${get(L, bankPath)}"`); };
  if (layout === 'favourites') {
    ok(m.rows.length === cfg.categories.length && m.rows.map((r) => r.cat).join() === cfg.categories.join(), `${name}: rows ${m.rows.map((r) => r.cat).join()} ≠ ${cfg.categories.join()}`);
    const keys = new Set();
    for (const row of m.rows) {
      labelIs('fav-' + row.cat, 'favHeading.' + row.cat);
      ok(row.tiles.length === cfg.perRow, `${name}: row ${row.cat} has ${row.tiles.length} tiles ≠ ${cfg.perRow}`);
      ok(row.strip <= row.w - 36 + 0.6, `${name}: row ${row.cat} tile strip ${row.strip} > lane inner ${Math.round(row.w - 36)}`);
      ok(row.h >= cfg.favRowMin - 0.6, `${name}: row ${row.cat} ${Math.round(row.h)} < the floor ${cfg.favRowMin}`);
      for (const t of row.tiles) {
        ok(!keys.has(t.key), `${name}: option ${t.key} twice on the page`); keys.add(t.key);
        ok(Math.abs(t.w - cfg.tile) < 1 && Math.abs(t.h - cfg.tileH) < 1, `${name}: tile ${t.key} ${Math.round(t.w)}×${Math.round(t.h)} ≠ ${cfg.tile}×${cfg.tileH}`);
        const want = t.key.startsWith('color:') ? COLOR_WORDS.en[t.key.slice(6)] : displayWord(v[t.key].en[0], 'en');
        ok(t.text === want, `${name}: tile ${t.key} prints "${t.text}" ≠ vocab "${want}"`);
        ok(!!t.text && t.labelW <= POOL_CAP + 0.6, `${name}: tile ${t.key} label ${t.labelW} px > ${POOL_CAP}`);
        const cat = (P.categories.find((c) => c.id === row.cat) || { options: [] }).options.some((o) => (o.color ? 'color:' + o.color : (man.themes[o.theme].nouns[o.noun] || {}).vocabKey) === t.key);
        ok(cat, `${name}: tile ${t.key} is not an option of the ${row.cat} category`);
      }
    }
  }
  if (layout === 'family') {
    ok(m.frames.map((f) => f.key).join() === cfg.frames.join(), `${name}: frames ${m.frames.map((f) => f.key).join()} ≠ ${cfg.frames.join()}`);
    labelIs('familyDraw', 'familyDraw');
    const draw = m.drawboxes.find((b) => b.key === 'family');
    ok(!!draw && draw.h >= cfg.drawH - 0.6 && Math.abs(draw.w - 675) < 1, `${name}: draw box ${draw && Math.round(draw.w)}×${draw && Math.round(draw.h)} (want 675 × >= ${cfg.drawH})`);
    for (const f of m.frames) {
      labelIs('count-' + f.key, 'countHeads.' + f.key);
      ok(f.counters === 0, `${name}: frame ${f.key} prints ${f.counters} counters`);
      ok(!!f.tf && (f.tf.w - 3) / 5 >= K_FLOOR - 0.6, `${name}: frame ${f.key} cell ${f.tf && ((f.tf.w - 3) / 5).toFixed(1)} < ${K_FLOOR}`);
      ok(!!f.box && Math.min(f.box.w, f.box.h) >= K_FLOOR - 0.6, `${name}: frame ${f.key} count box under ${K_FLOOR}`);
      ok(f.h >= cfg.frameMin - 0.6, `${name}: frame ${f.key} ${Math.round(f.h)} < the floor ${cfg.frameMin}`);
    }
  }
  if (layout === 'face') {
    const fw = bank.faceWords;
    ok(m.bank.map((w) => w.id).sort().join() === cfg.parts.slice().sort().join(), `${name}: bank ids ${m.bank.map((w) => w.id).sort().join()} ≠ parts`);
    for (const w of m.bank) ok(w.text === fw[w.id], `${name}: bank word ${w.id} prints "${w.text}" ≠ bank "${fw[w.id]}"`);
    for (const w of m.bank) ok(w.text === displayWord(v[w.id].en[0], 'en'), `${name}: bank word ${w.id} "${w.text}" ≠ vocab singular`);
    ok(m.lanes.length === cfg.parts.length && m.pointers.length === cfg.parts.length, `${name}: ${m.lanes.length} lanes / ${m.pointers.length} pointers ≠ ${cfg.parts.length}`);
    for (const l of m.lanes) ok(Math.abs(l.w - cfg.laneW) < 1 && Math.abs(l.h - cfg.laneH) < 1, `${name}: lane ${l.id} ${Math.round(l.w)}×${Math.round(l.h)} ≠ ${cfg.laneW}×${cfg.laneH}`);
    ok(!!m.facePic && Math.abs(m.facePic.w - cfg.icon) < 1, `${name}: face picture ${m.facePic && Math.round(m.facePic.w)} ≠ ${cfg.icon}`);
    labelIs('drawFace', 'drawFace');
    const draw = m.drawboxes.find((b) => b.key === 'face');
    ok(!!draw && draw.h >= cfg.drawMin - 0.6, `${name}: draw box ${draw && Math.round(draw.h)} < ${cfg.drawMin}`);
  }
  if (layout === 'ican') {
    ok(m.cards.length === cfg.cards, `${name}: ${m.cards.length} cards ≠ ${cfg.cards}`);
    labelIs('wantLearn', 'wantLearn');
    const ids = new Set();
    for (const c of m.cards) {
      ok(!ids.has(c.id), `${name}: action ${c.id} twice`); ids.add(c.id);
      ok(c.text === bank.can[c.id], `${name}: card ${c.id} prints "${c.text}" ≠ bank "${bank.can[c.id]}"`);
      const a = P.actions.find((x) => x.id === c.id);
      const n = a && man.themes[a.cue.theme] && man.themes[a.cue.theme].nouns[a.cue.noun];
      const cite = n && n.vocabKey && v[n.vocabKey] && v[n.vocabKey].en && v[n.vocabKey].en[0];
      ok(!cite || c.text.toLowerCase() !== cite.toLowerCase(), `${name}: card ${c.id} prints the vocab noun "${cite}"`);
      ok(c.lines >= 1 && c.lines <= 2, `${name}: card ${c.id} literal runs ${c.lines} lines`);
      ok(c.pic >= Math.max(K_FLOOR, cfg.pic) - 0.6, `${name}: card ${c.id} cue ${Math.round(c.pic)} < ${cfg.pic}`);
      ok(!!c.tick && Math.min(c.tick.w, c.tick.h) >= cfg.tick - 0.6, `${name}: card ${c.id} tick under ${cfg.tick}`);
      ok(c.h >= cfg.rowMin - 0.6, `${name}: card ${c.id} ${Math.round(c.h)} < the floor ${cfg.rowMin}`);
    }
    ok(m.ruling.length === 1 && m.ruling[0].h >= K_FLOOR, `${name}: ${m.ruling.length} ruling rows (want 1 >= ${K_FLOOR})`);
  }
  if (layout === 'name') {
    for (const k of ['myName', 'friendName', 'oneLetterPerBox', 'lettersCount', 'firstLetter', 'whoHasMore.question']) labelIs(k, k);
    ok(m.boxes.length === 2 && m.boxes.every((b) => b.n === cfg.boxes && b.rects.length === cfg.boxes), `${name}: letter boxes ${JSON.stringify(m.boxes.map((b) => [b.n, b.rects.length]))} ≠ 2 × ${cfg.boxes}`);
    for (const b of m.boxes) for (const r of b.rects) ok(Math.min(r.w, r.h) >= cfg.box - 0.6, `${name}: a letter box ${Math.round(r.w)} < ${cfg.box}`);
    ok(m.pills.map((p) => p.key).join() === 'me,friend', `${name}: pills ${m.pills.map((p) => p.key).join()}`);
    ok(m.pills.every((p) => !p.clipped && p.h >= 40) && m.pills.map((p) => p.text).join('|') === `${L.whoHasMore.me}|${L.whoHasMore.friend}`, `${name}: pills ${JSON.stringify(m.pills.map((p) => [p.text, Math.round(p.h), p.clipped]))}`);
    ok(m.countBoxes.length === 2 && m.countBoxes.every((b) => Math.min(b.w, b.h) >= K_FLOOR - 0.6), `${name}: count boxes ${JSON.stringify(m.countBoxes.map((b) => [b.key, Math.round(b.w), Math.round(b.h)]))}`);
  }
  void opts;
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

    // 6. the five faces through the real pipeline: en chrome + the de 3-line + the fi 4-line fixtures (the 700 floor)
    const faces = {};
    for (const [layout, id] of Object.entries(FACE_BY_LAYOUT)) {
      faces[layout] = loadFace(id);
      for (const chrome of ['en', 'de', 'fi']) {
        const strings = chrome === 'en' ? undefined : LONG[chrome];
        const tag = chrome === 'en' ? '' : ' long chrome ' + chrome;
        const r = await renderFace(page, faces[layout], { baseName: `${id}-gate-d2-en${chrome === 'en' ? '' : '-longchrome-' + chrome}`, strings });
        assertFace(`${id} ${layout}${tag}`, layout, r, en, P);
        if (chrome !== 'en') ok(r.m.body.h <= LONG[chrome].body, `${id} ${layout}${tag}: body ${Math.round(r.m.body.h)} px — the fixture did not squeeze the body to <= ${LONG[chrome].body}`);
        pngs.push(r.png);
        const m = r.m;
        const detail = layout === 'favourites' ? `rows ${m.rows.map((x) => x.cat + '[' + x.tiles.map((t) => t.key.replace('color:', '')).join(' ') + ']').join(' ')} widest label ${Math.max(...m.rows.flatMap((x) => x.tiles.map((t) => t.labelW))).toFixed(1)} px`
          : layout === 'family' ? `frames ${m.frames.map((f) => f.key + ' ' + Math.round(f.h)).join(' / ')}`
          : layout === 'face' ? `bank ${m.bank.map((w) => w.text).join(' ')} lanes ${m.lanes.map((l) => l.id + '@' + Math.round(l.top - m.facePic.top + 50)).join(' ')}`
          : layout === 'ican' ? `cards ${m.cards.map((c) => c.id).join(' ')} rows ${Math.round(m.cards[0].h)} lines ${m.cards.map((c) => c.lines).join('')}`
          : `boxes ${m.boxes.map((b) => b.n).join('+')} pills ${m.pills.map((p) => Math.round(p.w)).join('/')}`;
        console.log(`render ${id} ${layout}${tag}: verify ${r.verify.length} lints ${r.lints.length} body ${Math.round(m.body.h)} px lowest ${Math.round(m.lowest)} vs foot ${Math.round(m.foot)} ${detail}`);
      }
    }
    // the face sweep: the seeded faces vary, the seedless ones are byte-identical (skipped by --quick)
    if (!QUICK) {
      const seen = { favourites: new Set(), family: new Set(), face: new Set(), ican: new Set(), name: new Set() };
      for (const [layout, face] of Object.entries(faces)) for (let k = 1; k <= 20; k++) {
        const rng = makeRng(instanceSeed({ typeId: face.id, theme: null, difficulty: 2, seedEpoch: k }));
        const out = face.build({ theme: null, difficulty: 2, locale: 'en' }, { rng });
        seen[layout].add(layout === 'favourites' ? JSON.stringify(out.meta.options) : layout === 'face' ? out.meta.bank.join() : layout === 'ican' ? out.meta.actions.slice().sort().join() : out.bodyHtml);
      }
      ok(seen.favourites.size > 1, `sweep favourites: ${seen.favourites.size} distinct option sets over 20 seeds`);
      ok(seen.face.size > 1, `sweep face: ${seen.face.size} distinct bank orders over 20 seeds`);
      ok(seen.ican.size > 1, `sweep ican: ${seen.ican.size} distinct action sets over 20 seeds`);
      ok(seen.family.size === 1 && seen.name.size === 1, `sweep family/name: ${seen.family.size}/${seen.name.size} distinct bodies (seedless → 1)`);
      console.log(`sweep faces: favourites ${seen.favourites.size} option sets, face ${seen.face.size} bank orders, ican ${seen.ican.size} action sets, family/name byte-identical`);
    }

    // 5. poisons
    let killed = 0;
    const TOTAL = 26;
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
    /* ------------------------------------------------ Phase 2 face poisons (design §5 P6 P8 P10 P11 + the build's own) */
    const facePoison = async (name, layout, fn, cfgPatch, seed, re, note) => {
      const r = await renderFace(page, rewiredFace(faces[layout], en, fn, cfgPatch, seed), { baseName: `${FACE_BY_LAYOUT[layout]}-gate-poison-${name.replace(/\W+/g, '')}` });
      return { r, hit: judge(name, r.verify, re, note ? note(r) : undefined) };
    };
    // P6 — F3: one bank word removed → the bank <=> lanes bijection fails
    {
      const { hit } = await facePoison('P6', 'face', (h) => h.replace(/<span class="ws-bankword"[^>]*>.*?<\/span><\/span>/, ''), null, null, /bank ids \[.*\] ≠ lane ids \[.*\] \(no bijection\)/);
      if (hit) killed++;
    }
    // P8 — F1: tile gap 8 → the row is 640 > 639: the spec guard refuses; past it, verify sees the strip over the lane inner
    {
      const a = judge('P8 guard', faceRefusal(faces.favourites, en, { tileGap: 8 }), /tile row 640 > the lane inner 639/);
      const { hit: c } = await facePoison('P8 verify', 'favourites', (h) => h.replace(/gap:7px;align-items:center/g, 'gap:8px;align-items:center'), null, null, /the tile row 640 px > the lane inner 639/);
      if (a && c) killed++;
    }
    // P10 — F3: the eye and nose sides swapped → the pointer to the RIGHT eye runs through the LEFT eye (the mirror disc)
    {
      const seed = clone(P); seed.face.anchors.eye.side = 'L'; seed.face.anchors.nose.side = 'R'; delete seed.face.anchors.nose.lane;
      const { r, hit } = await facePoison('P10', 'face', null, null, seed, /pointer (eye|nose) crosses the [\w-]+ disc/, (r) => r.verify.filter((x) => /crosses/.test(x)).join('; '));
      const ctl = faceRefusal(faces.face, en, null, seed);
      if (hit && ctl.length === 0) killed++; else poisonLog.push(`  P10 control: the spec refused the swapped seed ${JSON.stringify(ctl)} (verify ${r.verify.length})`);
    }
    // PN2 — F3: the nose lane at the design's anchor-centred slot (no `lane` pin, y 196) → its pointer runs through the left ear
    {
      const seed = clone(P); delete seed.face.anchors.nose.lane;
      const { hit } = await facePoison('PN2', 'face', null, null, seed, /pointer nose crosses the ear-mirror disc \([\d.]+ px < 16\)/, (r) => (r.verify.find((x) => /ear-mirror/.test(x)) || '').replace(/.*\(/, '('));
      if (hit) killed++;
    }
    // P11 — F4: a 3-line `can` literal → the bank rule (> 34) + the spec refuse; past the guard verify() counts the lines
    {
      const b = clone(en); b.can.swim = 'I can swim across the whole swimming pool';
      const a = judge('P11 bank', validateBank(b, 'en'), /can\.swim ".*" > 34 chars/);
      const g = judge('P11 guard', faceRefusal(faces.ican, b), /can\.swim ".*" > 34 chars/);
      const { hit: c } = await facePoison('P11 verify', 'ican', (h) => h.replace(/(data-lcs-can="[^"]+"[^>]*>)[^<]*</, '$1I can swim across the whole big pool at the beach<'), null, null, /literal ".*" runs [3-9] lines \(> 2\)/);
      if (a && g && c) killed++;
    }
    // PT — F1: a starter on the copy lane + a marked tile → verify
    {
      const { r, hit } = await facePoison('PT lane', 'favourites', (h) => h.replace(/(<span data-lcs-copy-lane="animal"[^>]*>)/, '$1<span style="position:absolute">cat</span>').replace(/(<span data-lcs-opt="[^"]+")/, '$1 data-lcs-correct="1"'), null, null, /copy lane: the lane prints "cat"/);
      const c = judge('PT tile', r.verify, /a tile is marked/);
      if (hit && c) killed++;
    }
    // PC — F2: a counter printed on the "people" ten-frame → verify (the child fills the frame)
    {
      const tenFrame = require('../primitives/ten-frame.js');
      const one = tenFrame({ a: 1, b: 0, cell: 56 }).svg;
      const { r, hit } = await facePoison('PC', 'family', (h) => h.replace(/(<div data-lcs-tenframe="people"[^>]*>)<svg[\s\S]*?<\/svg>/, '$1' + one), null, null, /frame 1 \(people\): 1 counters printed on the ten-frame/);
      const c = judge('PC stamp', r.verify, /ten-frame stamps a=1 b=0/);
      if (hit && c) killed++;
    }
    // PK — F4: seven `can` literals → the spec refuses; `refuse:['ican']` → the spec refuses
    {
      const b = clone(en); for (const id of Object.keys(b.can).slice(7)) delete b.can[id];
      const a = judge('PK seven', faceRefusal(faces.ican, b), /authors 7 can literals < 8 \(refuse/);
      const b2 = clone(en); b2.refuse = ['ican'];
      const c = judge('PK refuse', faceRefusal(faces.ican, b2), /refuses the face \(bank\.refuse\)/);
      if (a && c) killed++;
    }
    // PB — F5: the friend's boxes at 9 → verify (both rows carry the stamped count)
    {
      const { letterBoxes } = require('../templates/components-b2.js');
      const nine = letterBoxes({ n: 9, box: 56, gap: 6 });
      const { hit } = await facePoison('PB', 'name', (h) => h.replace(/(<div class="ws-lane" data-lcs-nameboxes="friend"[^>]*>)<svg[\s\S]*?<\/svg>/, '$1' + nine), null, null, /friend: 9 boxes ≠ 10/);
      if (hit) killed++;
    }
    // PL2 — F1: a tile label over the 96 px ceiling (the fi `vaaleanpunainen`, 128 px) → verify
    {
      const { hit } = await facePoison('PL2', 'favourites', (h) => h.replace(/(data-lcs-opt-label[^>]*>)[^<]*</, '$1vaaleanpunainen<'), null, null, /label "vaaleanpunainen" [\d.]+ px > the 96 px tile ceiling/);
      if (hit) killed++;
    }
    // PU — F1: an unlabelled option DROPS; a category under 6 labelled options drops (control: 2 rows, clean); under 2 categories the face REFUSES
    {
      const b = clone(en); for (const k of ['cat', 'dog', 'fish', 'horse', 'rabbit', 'duck', 'pig']) delete b.optionWords[k];   // animals: 5 left
      const r = await renderFace(page, rewiredFace(faces.favourites, b), { baseName: 'K-342-gate-poison-PU-control' });
      const rows = r.m.rows.map((x) => x.cat).join();
      const ctl = r.verify.length === 0 && r.lints.length === 0 && rows === 'food,color';
      poisonLog.push(`  PU control: animals at 5 labels → rows ${rows}, verify ${r.verify.length} lints ${r.lints.length}`);
      const b2 = clone(b); for (const k of ['apple', 'banana', 'bread', 'cheese', 'pizza', 'carrot', 'strawberry']) delete b2.optionWords[k];   // food: 5 left too
      const a = judge('PU', faceRefusal(faces.favourites, b2), /keeps 1 category with >= 6 labelled options \(< 2: refuse\)/);
      if (a && ctl) killed++;
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
