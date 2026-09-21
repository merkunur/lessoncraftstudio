/**
 * G1-352 — Personal Pronouns (nt10-D; family key `pronouns`; G1 in en; the
 * national framework NAME + band elsewhere; en L.1.1.d). Design:
 * docs/worksheet-gen/b4-designs/G1-352-pronouns.md §2/§5 (critic record
 * _work/G1-352-critic.md; build record _work/G1-352-build.md).
 *
 * "Eight faces, eight name tags, eight rows of white pills." A 2 x 4 card grid;
 * each card is one person (a 64 px portrait) or two people side by side (52 px
 * each) over a white NAME plate ("Mia", "Jack and Emma") over a row of
 * identical white chips in the locale's fixed order (`he  she  they`). The
 * child reads the NAME (the primary cue), glances at the portrait (the
 * confirmation) and circles ONE chip. de/nl: three of the eight cards are
 * captioned OBJECTS whose chips are er/sie/es and hij/zij/het (the Klasse 2 /
 * groep 4 "das Kind -> es" move). The answer is never printed.
 *
 * THEMELESS (design §1): the people are ONE curated, OPENED, locale-neutral
 * bank of 32 portraits (data/b4/pronouns.js `people`, m 20 / f 12, a per-picture
 * `minPx`), pinned by DESIGN key + theme through `fileUri` — never `pictureFor`,
 * never a vocab key (five portraits have no vocab entry; no page prints a person
 * noun). The de/nl objects keep the vocab key + `objForms` rule because they
 * print a word. No unit axis.
 *
 * THE RULE THAT LOCKS THE TYPE (design §1): every item is a set of REFERENTS
 * (1 or 2 named portraits; in de/nl also 1 captioned object) whose key is
 * COMPUTED, never typed — `keyOf(refs)` = m1 | f1 | mp | fp | xp from the
 * portraits' OPENED `depicted` tags (the name's panel `gender` tag must EQUAL
 * it on every referent, else the composer refuses), `obj:<code>` off the vocab
 * gender code (de m/f/n, nl d/h), `p` for any pair where the locale's chips are
 * a NUMBER contrast (fi hän/he: `chips.length === 2`). The answer is
 * `bank.map.base[key]` -> a chip index into the fixed table; a key the map
 * lacks is REFUSED for the face (de/nl pairs on the base: sie/zij = she AND
 * they, so a pair never reaches a chip). Chips are in the canonical order on
 * every card; the correct one is marked ONLY by `data-lcs-correct`.
 *
 * Difficulty is a CONFIG; every guard keys on the RESOLVED keys (never the
 * level index). `resolveBase(d, bank)` picks the locale CLASS from the bank:
 *   3-chip + fi (chips 2|3, no objectMap)  singles / pairs / pairMix
 *   4-chip (fr es pt)                      d.four.{singles, pairs, pairMix}
 *   objects (de nl, objectMap set)         singles + d.objects captioned objects, no pairs
 *   cards / cols / rows   the grid (d2 8 / 2 / 4)
 *   pairMix               'mp,fp,xp' (fixed types, one per pair slot) | 'any'
 *   mixFloor              every chip index of the table appears >= mixFloor times
 *   neuterMin             de/nl: >= neuterMin neuter objects (so es / het reaches mixFloor)
 *   pic / pairPic         portrait px (singles any picture with minPx <= pic; pair
 *                         members minPx <= pairPic)
 *   plateH / plateFont / chipW / chipH / chipFont / objectCaption / cardPad
 * build() reads ONLY data/b4/pronouns.js (lib/b4-common.js bank) + `fileUri` +
 * `vocab()` (de/nl object gender codes + displayWord) + bank('instructions')
 * objForms (objectCaption 'article' only); never image-vocabulary.js for any
 * inflected form, never approved-words, never SENTENCES names.
 *
 * Chrome budget (design §2; MEASURED by the gate — a 3-line title + a 3-line
 * instruction leave 710 px of body, not the README's 722, the G2-317 finding):
 * card = (710 - 3 x 14) / 4 = 167, inner 167 - 20 - 4 = 143 at the stated
 * `padding:10px 12px` (the type post-processes cardGrid's `<section
 * class="ws-card"` — the K-354 idiom); stage = 64 + 2 + 26 + 2 + 2 + 44 = 140
 * (pair 52: 128) — the design's gap 3 / pad 4 (144) would clip 1 px at 710, so
 * the stack is re-budgeted (recorded). At 677 (a four-line fi title) the card is
 * 158.75, inner 134.75 < 140: the base does NOT fit, so the fi base title is
 * validated <= 3 lines (design §5 rule 13; the gate's PR8). d3 (10 cards, 2 x 5)
 * is UNPUBLISHED by design: card 130.4, inner 110.4 < stage 126 — verify()
 * reports the stage overflow.
 *
 * Answer hiding + stamps: root `[data-ws-content][data-lcs-pron]` with
 * data-lcs-cards data-lcs-chips data-lcs-and data-lcs-mixfloor (no
 * data-lcs-layout on the base); per card `.ws-card-stage[data-lcs-item]`
 * data-lcs-key data-lcs-refs="<key>,<key>" data-lcs-names="<a>|<b>"
 * data-lcs-chip-key; portraits `img[data-lcs-pic=<personKey>]`; the plate
 * `[data-lcs-plate]`; chips through `articleChips` (data-lcs-chip / -label /
 * -correct). verify(page) re-checks the structure from the stamps (one correct
 * chip === chip-key, the K-288 position-leak + identical-style checks, plate
 * === the names joined, portraits per key, no name / src twice, stage overflow
 * 0, floors); the node gate (qa/verify-b4-pronouns.js) re-derives every
 * stamped key from the OPENED tags and every chip index from bank.map — diff,
 * not trust.
 *
 * PHASE 2 — the five faces (design §3): ONE additive `layout` knob
 * (`replace` / `anaphora` / `possessive` / `sort` / `rewrite`), dispatched in
 * `_buildWith` BEFORE the base path consumes the RNG so the base's default
 * output stays byte-identical (tools/b3-baseline.js). NOT BUILT in this phase:
 * a `layout` config throws "Phase 2" so no face can ship half-built.
 */
'use strict';
const { bank: loadBank } = require('../../lib/b4-common.js');
const { fileUri, vocab, displayWord } = require('../../lib/b2-common.js');
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const { portraitCard } = require('../../templates/components-b4.js');

const KEY = 'pronouns';
const ID = 'G1-352';
const MAX_TRIES = 400;
const PAIR_TYPES = ['mp', 'fp', 'xp'];
const PLATE_PX_PER_CHAR = 0.53;   // Nunito 800: 9.5 px/char at 18 (design §2, measured 8.2-9.4)
const CARD_INNER_W = 302;         // (675 - 14) / 2 - 24 - 4 at cardPad 10 12 (design §2)

function nfd(s) { return String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase(); }

/* ------------------------------------------------------------------ pure helpers (the gate imports them) ------------------------------------------------------------------ */

/** Does this locale's chip table contrast NUMBER only (fi hän/he)? Every pair key collapses to `p`. */
function collapsesPairs(bank) { return Array.isArray(bank.chips) && bank.chips.length === 2; }

/**
 * The item key of a referent set — COMPUTED, never typed.
 *   persons: [{key, depicted, nameGender}] x1|x2 -> m1 | f1 | mp | fp | xp (| p when the bank collapses pairs);
 *            throws when a name's gender tag differs from its portrait's OPENED tag (the mock's "Valentina" defect)
 *   object:  [{object:true, code}] -> 'obj:<code>'
 */
function keyOf(refs, bank) {
  if (!Array.isArray(refs) || !refs.length || refs.length > 2) throw new Error(`${ID}: keyOf needs 1 or 2 referents`);
  if (refs[0].object) {
    if (refs.length !== 1) throw new Error(`${ID}: an object item has exactly one referent`);
    if (!refs[0].code) throw new Error(`${ID}: object "${refs[0].key}" has no gender code`);
    return 'obj:' + refs[0].code;
  }
  for (const r of refs) {
    if (!['m', 'f'].includes(r.depicted)) throw new Error(`${ID}: portrait "${r.key}" is tagged "${r.depicted}" (m|f)`);
    if (r.nameGender !== undefined && r.nameGender !== r.depicted) throw new Error(`${ID}: name "${r.name}" (${r.nameGender}) over a portrait "${r.key}" tagged ${r.depicted} — tag mismatch`);
  }
  if (refs.length === 1) return refs[0].depicted + '1';
  if (bank && collapsesPairs(bank)) return 'p';
  const s = refs.map((r) => r.depicted).sort().join('');
  return s === 'mm' ? 'mp' : s === 'ff' ? 'fp' : 'xp';
}

/** map[face][key] -> a chip index, or null (= refused on that face); `obj:<code>` keys read objectMap[code] (de/nl). */
function answerChip(bank, face, key) {
  if (/^obj:/.test(key)) {
    const v = bank.objectMap && bank.objectMap[key.slice(4)];
    return Number.isInteger(v) ? v : null;
  }
  const m = bank.map && bank.map[face];
  if (!m) throw new Error(`${ID}: the bank has no map.${face}`);
  const v = m[key];
  return Number.isInteger(v) ? v : null;
}

/** `{subj}` -> one name or "a AND b" (the `and` literal; es `andBefore` swaps it before i-/hi-). */
function fillSubject(literal, names, and, andBefore) {
  if (!Array.isArray(names) || !names.length || names.length > 2) throw new Error(`${ID}: fillSubject needs 1 or 2 names`);
  let subj = names[0];
  if (names.length === 2) {
    let conj = and;
    if (andBefore) for (const [pre, alt] of Object.entries(andBefore)) if (nfd(names[1]).startsWith(nfd(pre))) conj = alt;
    subj = `${names[0]} ${conj} ${names[1]}`;
  }
  if ((String(literal).match(/\{subj\}/g) || []).length !== 1) throw new Error(`${ID}: the literal must carry {subj} exactly once ("${literal}")`);
  return String(literal).replace('{subj}', subj);
}

/** The pencil space an answer needs on a writing row (F5): glyphs x 0.75 x glyphH + 16. */
function need(answer, glyphH) { return [...String(answer)].length * 0.75 * glyphH + 16; }

/** The locale class of a bank: 'objects' (de/nl) | 'four' (fr/es/pt) | 'three' (everyone else incl. fi's two chips). */
function localeClass(bank) {
  if (bank.objectMap) return 'objects';
  if (bank.chips.length === 4) return 'four';
  return 'three';
}

/**
 * The resolved base config for (d, bank): the locale class picks singles / pairs /
 * objects / pairMix; guards run on the RESULT. Throws (a refusal) when the class
 * cannot reach `mixFloor` on every chip by construction (fr with pairs:3 → the
 * `elles` chip once; de without objects → `es` never).
 */
function resolveBase(d, bank) {
  const cls = localeClass(bank);
  const src = cls === 'four' && d.four ? d.four : d;
  const cfg = {
    cls, cards: d.cards, cols: d.cols, rows: d.rows,
    singles: src.singles, pairs: cls === 'objects' ? 0 : src.pairs, objects: cls === 'objects' ? d.objects : 0,
    pairMix: cls === 'objects' ? 'none' : (src.pairMix || 'any'),
    mixFloor: d.mixFloor, neuterMin: d.neuterMin,
    pic: d.pic, pairPic: d.pairPic, plateH: d.plateH, plateFont: d.plateFont,
    chipW: d.chipW, chipH: d.chipH, chipFont: d.chipFont, objectCaption: d.objectCaption || 'bare', cardPad: d.cardPad,
  };
  if (cfg.singles + cfg.pairs + cfg.objects !== cfg.cards) throw new Error(`${ID}: singles ${cfg.singles} + pairs ${cfg.pairs} + objects ${cfg.objects} != cards ${cfg.cards} (class ${cls})`);
  if (cfg.cols * cfg.rows !== cfg.cards) throw new Error(`${ID}: cols ${cfg.cols} x rows ${cfg.rows} != cards ${cfg.cards}`);
  if (cfg.cards < 6 || cfg.cards > 12) throw new Error(`${ID}: ${cfg.cards} cards outside the G1 window [6, 12]`);
  if (cfg.pic < 44 || cfg.pairPic < 44 || cfg.chipH < 44) throw new Error(`${ID}: pic ${cfg.pic} / pairPic ${cfg.pairPic} / chipH ${cfg.chipH} below the G1 element floor 44`);
  if (cfg.plateFont < 16) throw new Error(`${ID}: plateFont ${cfg.plateFont} < 16`);
  if (cfg.singles < 2) throw new Error(`${ID}: singles ${cfg.singles} < 2 (both sexes must be present)`);
  if (cfg.pairMix !== 'any' && cfg.pairMix !== 'none') {
    const types = cfg.pairMix.split(',').map((s) => s.trim());
    if (types.length !== cfg.pairs || types.some((t) => !PAIR_TYPES.includes(t))) throw new Error(`${ID}: pairMix "${cfg.pairMix}" does not name ${cfg.pairs} of mp|fp|xp`);
    cfg.pairTypes = types;
  }
  // structural mix-floor pre-check on a FIXED pair mix: the chips only pairs can supply must reach the floor
  const nChips = bank.chips.length;
  if (cfg.pairTypes) {
    const hist = new Array(nChips).fill(0);
    for (const t of cfg.pairTypes) { const i = answerChip(bank, 'base', collapsesPairs(bank) ? 'p' : t); if (i == null) throw new Error(`${ID}: pair type ${t} is refused on the base for this locale (map.base lacks it)`); hist[i]++; }
    // singles supply m1 / f1 with >= 2 each (when singles >= 4) — every OTHER chip must be reached by the pairs alone
    const singleIdx = new Set([answerChip(bank, 'base', 'm1'), answerChip(bank, 'base', 'f1')]);
    for (let i = 0; i < nChips; i++) if (!singleIdx.has(i) && hist[i] < cfg.mixFloor) throw new Error(`${ID}: chip "${bank.chips[i]}" reaches ${hist[i]} < mixFloor ${cfg.mixFloor} under pairMix "${cfg.pairMix}" — REFUSED (the design's pairs:4 rule for 4-chip locales)`);
  }
  if (cls === 'objects') {
    if (!cfg.objects || cfg.objects < cfg.neuterMin) throw new Error(`${ID}: objects ${cfg.objects} < neuterMin ${cfg.neuterMin}`);
    if (!Array.isArray(bank.objects) || !bank.objects.length) throw new Error(`${ID}: the locale has an objectMap but no objects — REFUSED`);
  }
  return cfg;
}

/** Portrait src for a person entry (pinned theme + noun through fileUri; a B&W theme dir is refused). */
function portraitSrc(p) {
  if (/(^|[\s_])(bw|sw|bn|nb|zw|sh|pb|mv|sv)$/i.test(p.pic.theme)) throw new Error(`${ID}: "${p.key}" pins a B&W theme "${p.pic.theme}" — refuse`);
  return fileUri(p.pic.theme, p.pic.noun);
}

/* ------------------------------------------------------------------ the composer ------------------------------------------------------------------ */

/**
 * The base deal: `singles` person cards + `pairs` pair cards (+ `objects` object
 * cards), RNG order: the singles' sex split → the singles' portraits → the pairs'
 * types + portraits → the card order → the objects → the names. Names are drawn
 * LAST so the portrait keys and the card order do not depend on the locale's
 * name list (locale-neutral within a locale class). null = no deal under this
 * class (the caller refuses).
 */
function compose(rng, bank, cfg, loc) {
  const people = bank.people;
  const nameGender = (g) => bank.names.filter((n) => n.gender === g);
  const mNames = nameGender('m').length, fNames = nameGender('f').length;
  const singlesPool = people.filter((p) => p.minPx <= cfg.pic);
  const pairPool = people.filter((p) => p.minPx <= cfg.pairPic);
  const need2 = cfg.singles >= 4 ? 2 : 1;          // both sexes present; >= 2 each once four singles exist
  for (let t = 0; t < MAX_TRIES; t++) {
    // 1. the singles' sex split
    const mS = rng.int(need2, cfg.singles - need2);
    const fS = cfg.singles - mS;
    // 2. the pair types
    let types;
    if (cfg.pairTypes) types = cfg.pairTypes.slice();
    else types = Array.from({ length: cfg.pairs }, () => rng.pick(PAIR_TYPES.filter((pt) => answerChip(bank, 'base', collapsesPairs(bank) ? 'p' : pt) != null)));
    if (types.length !== cfg.pairs) return null;
    const pairM = types.reduce((s, x) => s + (x === 'mp' ? 2 : x === 'xp' ? 1 : 0), 0);
    const pairF = types.reduce((s, x) => s + (x === 'fp' ? 2 : x === 'xp' ? 1 : 0), 0);
    // the name budget per gender (12 = 6 + 6; fi 16)
    if (mS + pairM > mNames || fS + pairF > fNames) continue;
    // 3. portraits — no src twice on the page
    const usedKeys = new Set();
    const draw = (pool, sex, n) => {
      const cands = pool.filter((p) => p.depicted === sex && !usedKeys.has(p.key));
      if (cands.length < n) return null;
      const out = rng.sample(cands, n);
      out.forEach((p) => usedKeys.add(p.key));
      return out;
    };
    const sM = draw(singlesPool, 'm', mS), sF = draw(singlesPool, 'f', fS);
    if (!sM || !sF) continue;
    const items = [...sM, ...sF].map((p) => ({ kind: 'person', people: [p] }));
    let ok = true;
    for (const pt of types) {
      const a = pt === 'mp' ? draw(pairPool, 'm', 2) : pt === 'fp' ? draw(pairPool, 'f', 2) : [draw(pairPool, 'm', 1), draw(pairPool, 'f', 1)].map((x) => x && x[0]);
      if (!a || a.some((x) => !x)) { ok = false; break; }
      items.push({ kind: 'person', people: pt === 'xp' ? rng.shuffle(a) : a });
    }
    if (!ok) continue;
    // 4. the card order (before names + objects so it is locale-neutral within the class)
    const slots = rng.shuffle(items.map((_, i) => i).concat(Array.from({ length: cfg.objects }, (_, k) => 'o' + k)));
    // 5. objects (de/nl)
    const objectItems = [];
    if (cfg.objects) {
      const V = vocab();
      const withCode = bank.objects.map((o) => {
        const entry = V[o.key] && V[o.key][loc];
        const code = entry && entry[2];
        if (!code || !(code in bank.objectMap)) throw new Error(`${ID}: object "${o.key}" has no ${loc} gender code in objectMap — refuse`);
        return { ...o, code, singular: entry[0] };
      });
      const neuter = withCode.filter((o) => isNeuterCode(bank, o.code));
      if (neuter.length < cfg.neuterMin) return null;
      const chosenN = rng.sample(neuter, cfg.neuterMin);
      const rest = rng.sample(withCode.filter((o) => !chosenN.includes(o)), cfg.objects - cfg.neuterMin);
      for (const o of [...chosenN, ...rest]) objectItems.push({ kind: 'object', object: o });
    }
    // 6. names — distinct, gender-matched, drawn last
    const mList = rng.shuffle(nameGender('m')), fList = rng.shuffle(nameGender('f'));
    for (const it of items) it.names = it.people.map((p) => (p.depicted === 'm' ? mList.pop() : fList.pop()));
    if (items.some((it) => it.names.some((n) => !n))) continue;
    // 7. keys, chips, the mix floor
    const cards = [];
    for (const s of slots) {
      const it = typeof s === 'string' ? objectItems[+s.slice(1)] : items[s];
      const refs = it.kind === 'object' ? [{ object: true, key: it.object.key, code: it.object.code }] : it.people.map((p, i) => ({ key: p.key, depicted: p.depicted, name: it.names[i].name, nameGender: it.names[i].gender }));
      const key = keyOf(refs, bank);
      const chip = answerChip(bank, 'base', key);
      if (chip == null) { ok = false; break; }
      cards.push({ it, refs, key, chip });
    }
    if (!ok) continue;
    const hist = new Array(bank.chips.length).fill(0);
    cards.forEach((c) => { hist[c.chip]++; });
    if (hist.some((h) => h < cfg.mixFloor)) continue;
    if (new Set(cards.map((c) => c.key)).size < 2) continue;
    // 8. plate width guard: a pair plate must sit inside the card
    const plateOf = (c) => c.it.kind === 'object' ? null : fillSubject('{subj}', c.it.names.map((n) => n.name), bank.and, bank.andBefore);
    if (cards.some((c) => c.it.kind !== 'object' && [...plateOf(c)].length * PLATE_PX_PER_CHAR * cfg.plateFont + 20 > CARD_INNER_W)) continue;
    return cards;
  }
  return null;
}

/** The neuter code of an objectMap: the code whose chip is the LAST chip (es / het) — the design's `neuterMin` target. */
function isNeuterCode(bank, code) {
  const idx = bank.objectMap[code];
  return idx === bank.chips.length - 1;
}

/** The object caption: 'bare' = the bare singular (displayWord, KEEP_CASE de) · 'article' = objForms.unique (b3 instructions bank). */
function objectCaption(o, loc, mode) {
  if (mode === 'bare') return displayWord(o.singular, loc);
  if (mode === 'article') {
    const { bank: b3bank } = require('../../lib/b3-common.js');
    const forms = b3bank('instructions', loc).objForms || {};
    const f = forms[o.key];
    if (!f || !f.unique) throw new Error(`${ID}: objectCaption 'article' needs objForms.${o.key}.unique in ${loc} — refuse`);
    return f.unique;
  }
  throw new Error(`${ID}: objectCaption "${mode}"`);
}

/* ------------------------------------------------------------------ verify (page side; self-contained) ------------------------------------------------------------------ */

function VERIFY_BASE() {
  const fails = [];
  const root = document.querySelector('[data-lcs-pron]');
  if (!root) return ['no pronouns root'];
  if (root.dataset.lcsLayout) return [`layout "${root.dataset.lcsLayout}" has no verify branch (Phase 2)`];
  const nCards = +root.dataset.lcsCards, nChips = +root.dataset.lcsChips, and = root.dataset.lcsAnd || '';
  const mixFloor = +(root.dataset.lcsMixfloor || 1);
  const FLOOR = 44;
  const items = [...root.querySelectorAll('[data-lcs-item]')];
  if (items.length !== nCards) fails.push(`${items.length} cards, config says ${nCards}`);
  if (items.length < 6 || items.length > 12) fails.push(`${items.length} cards outside [6, 12]`);
  let firstOrder = null;
  const hist = {};
  const srcs = new Set(), names = new Set(), plates = new Set();
  const chipLabels = new Set();
  items.forEach((it, i) => {
    const L = `card ${i + 1}`;
    const key = it.dataset.lcsKey, refs = (it.dataset.lcsRefs || '').split(',').filter(Boolean);
    const nm = (it.dataset.lcsNames || '').split('|').filter(Boolean);
    const chips = [...it.querySelectorAll('[data-lcs-chip]')];
    if (chips.length !== nChips) fails.push(`${L}: ${chips.length} chips, config says ${nChips}`);
    const correct = chips.filter((c) => c.dataset.lcsCorrect);
    if (correct.length !== 1) fails.push(`${L}: ${correct.length} correct chips`);
    if (correct[0] && correct[0].dataset.lcsChip !== it.dataset.lcsChipKey) fails.push(`${L}: the correct chip ${correct[0].dataset.lcsChip} != chip-key ${it.dataset.lcsChipKey}`);
    const labels = chips.map((c) => c.dataset.lcsLabel);
    labels.forEach((l) => chipLabels.add(l.toLowerCase()));
    if (new Set(labels).size !== labels.length) fails.push(`${L}: duplicate chip labels`);
    const order = labels.join('|');
    if (firstOrder == null) firstOrder = order; else if (order !== firstOrder) fails.push(`${L}: chip order differs (position leak)`);
    const styles = new Set(chips.map((c) => c.getAttribute('style')));
    if (styles.size !== 1) fails.push(`${L}: chips styled differently`);
    chips.forEach((c) => { const r = c.getBoundingClientRect(); if (r.height < FLOOR - 0.6) fails.push(`${L}: a chip ${r.height.toFixed(1)} high < ${FLOOR}`); if (c.textContent.trim() !== c.dataset.lcsLabel) fails.push(`${L}: a chip prints "${c.textContent.trim()}" not its label`); });
    // referents
    const isObj = /^obj:/.test(key);
    const imgs = [...it.querySelectorAll('img[data-lcs-pic]')];
    const wantPics = isObj ? 1 : (/^(m1|f1)$/.test(key) ? 1 : /^(mp|fp|xp|p)$/.test(key) ? 2 : -1);
    if (wantPics < 0) fails.push(`${L}: key "${key}" is not m1|f1|mp|fp|xp|p|obj:*`);
    if (imgs.length !== wantPics) fails.push(`${L}: ${imgs.length} portraits for key ${key}`);
    if (refs.length !== wantPics) fails.push(`${L}: ${refs.length} refs for key ${key}`);
    imgs.forEach((img, k) => {
      if (!img.complete || img.naturalWidth === 0) fails.push(`${L}: broken picture`);
      const r = img.getBoundingClientRect();
      if (r.width < FLOOR - 0.6) fails.push(`${L}: portrait ${r.width.toFixed(1)} px < ${FLOOR}`);
      if (img.dataset.lcsPic !== refs[k]) fails.push(`${L}: portrait ${k + 1} is "${img.dataset.lcsPic}", the stamp says "${refs[k]}"`);
      if (srcs.has(img.src)) fails.push(`${L}: portrait src twice on the page (${img.dataset.lcsPic})`);
      srcs.add(img.src);
    });
    // the plate
    const plate = it.querySelector('[data-lcs-plate]');
    const text = plate ? plate.textContent.trim() : '';
    if (!text) fails.push(`${L}: no name plate`);
    if (isObj) { if (nm.length) fails.push(`${L}: an object card carries names`); }
    else {
      if (nm.length !== wantPics) fails.push(`${L}: ${nm.length} names for key ${key}`);
      const want = nm.length === 2 ? `${nm[0]} ${and} ${nm[1]}` : nm[0];
      // es andBefore swaps the conjunction: accept either literal joiner but never a missing name
      if (nm.length === 2 ? !(text.startsWith(nm[0] + ' ') && text.endsWith(' ' + nm[1])) : text !== want) fails.push(`${L}: plate "${text}" != names ${nm.join('|')}`);
      nm.forEach((n) => { if (names.has(n.toLowerCase())) fails.push(`${L}: name "${n}" twice on the page`); names.add(n.toLowerCase()); });
    }
    if (plates.has(text.toLowerCase())) fails.push(`${L}: plate "${text}" twice on the page`);
    plates.add(text.toLowerCase());
    if (labels.some((l) => l.toLowerCase() === text.toLowerCase())) fails.push(`${L}: the plate prints a chip label`);
    if (plate) { const fs = parseFloat(getComputedStyle(plate).fontSize); if (fs < 16) fails.push(`${L}: plate font ${fs} < 16`); if (plate.scrollWidth > plate.clientWidth + 0.6) fails.push(`${L}: plate text overflows its tile`); }
    // the stage fits its card (the base's stage overflow is asserted 0)
    if (it.scrollHeight > it.clientHeight + 0.6) fails.push(`${L}: stage overflow ${it.scrollHeight - it.clientHeight} px (stage ${it.scrollHeight} > inner ${it.clientHeight})`);
    const card = it.closest('.ws-card');
    if (card && it.getBoundingClientRect().bottom > card.getBoundingClientRect().bottom + 0.6) fails.push(`${L}: the stage spills past its card`);
    // stray text
    const outside = [...it.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent.trim()).join('');
    if (outside) fails.push(`${L}: stray text "${outside}"`);
    hist[it.dataset.lcsChipKey] = (hist[it.dataset.lcsChipKey] || 0) + 1;
  });
  for (let i = 0; i < nChips; i++) if ((hist[i] || 0) < mixFloor) fails.push(`chip ${i} appears ${hist[i] || 0} < mixFloor ${mixFloor}`);
  if (Object.keys(hist).length < 2) fails.push('only one chip is ever correct (no discrimination)');
  // no chip label printed anywhere outside the chips
  root.querySelectorAll('[data-lcs-plate]').forEach((p) => { if (chipLabels.has(p.textContent.trim().toLowerCase())) fails.push('a plate prints a pronoun'); });
  if (!items.length) fails.push('non-vacuity: 0 cards');
  return fails;
}

module.exports = {
  id: ID,
  slug: 'personal-pronouns',
  gradeBand: 'G1',
  assetClass: 'icon-placement',
  exerciseType: KEY,
  themeAxis: { applicable: false },
  unitAxis: { applicable: false },
  difficulty: {
    1: { cards: 6, cols: 2, rows: 3, singles: 4, pairs: 2, pairMix: 'any', four: { singles: 4, pairs: 2, pairMix: 'any' }, objects: 2, neuterMin: 1, mixFloor: 1, pic: 80, pairPic: 60, plateH: 28, plateFont: 20, chipW: 96, chipH: 52, chipFont: 26, objectCaption: 'article', cardPad: '12px 12px' },
    2: { cards: 8, cols: 2, rows: 4, singles: 5, pairs: 3, pairMix: 'mp,fp,xp', four: { singles: 4, pairs: 4, pairMix: 'mp,fp,fp,xp' }, objects: 3, neuterMin: 2, mixFloor: 2, pic: 64, pairPic: 52, plateH: 26, plateFont: 18, chipW: 84, chipH: 44, chipFont: 24, objectCaption: 'bare', cardPad: '10px 12px' },
    // d3 is UNPUBLISHED by design (card 133, inner 113 < stage 130 at chips 44): verify() reports the stage overflow.
    // DEVIATION (measured, _work/G1-352-build.md): the ladder's 6 singles + 4 pairs need 14 names > the 12 tagged;
    // 8 singles + 2 pairs (12 names) is the only 10-card deal the name list allows; the 4-chip 5 + 5 (15) likewise -> 8 + 2
    3: { cards: 10, cols: 2, rows: 5, singles: 8, pairs: 2, pairMix: 'any', four: { singles: 8, pairs: 2, pairMix: 'any' }, objects: 4, neuterMin: 2, mixFloor: 2, pic: 52, pairPic: 44, plateH: 24, plateFont: 17, chipW: 76, chipH: 44, chipFont: 22, objectCaption: 'bare', cardPad: '8px 12px', unpublished: true },
  },
  i18n: {
    en: {
      title: 'Personal Pronouns',
      instruction: 'Look at the person and read the name. Circle the word we use instead of the name.',
    },
  },
  keyOf, answerChip, fillSubject, need, resolveBase, localeClass, collapsesPairs, compose,

  build({ theme, difficulty, locale }, ctx) {
    const loc = (locale || 'en').slice(0, 2);
    return this._buildWith(loadBank(KEY, loc), this.difficulty[difficulty], { theme, locale: loc }, ctx);
  },

  /** The whole build over an INJECTED bank + resolved config (the gate's poison seam); build() passes the real ones. */
  _buildWith(bank, d, { locale }, ctx) {
    if (!d) throw new Error(`${ID}: no difficulty config`);
    const rng = ctx.rng;
    const loc = (locale || 'en').slice(0, 2);
    if (!bank || !Array.isArray(bank.people) || bank.people.length < 8) throw new Error(`${ID}: the ${loc} bank has no people`);
    if (!Array.isArray(bank.names) || bank.names.length < 8) throw new Error(`${ID}: the ${loc} bank has < 8 names`);
    if (!Array.isArray(bank.chips) || bank.chips.length < 2 || bank.chips.length > 4) throw new Error(`${ID}: the ${loc} bank has ${bank.chips ? bank.chips.length : 0} chips (2..4)`);
    if (!bank.map || !bank.map.base) throw new Error(`${ID}: the ${loc} bank has no map.base`);
    if (typeof bank.and !== 'string' || !bank.and) throw new Error(`${ID}: the ${loc} bank has no "and" literal`);
    // Phase 2 faces — additive `layout` knob, dispatched BEFORE the base path touches the RNG
    if (d.layout) return this._buildFace(bank, d, { locale: loc }, ctx);
    const cfg = resolveBase(d, bank);
    const cards = compose(rng, bank, cfg, loc);
    if (!cards) throw new Error(`${ID}: ${loc} cannot deal ${cfg.singles} singles + ${cfg.pairs} pairs + ${cfg.objects} objects at mixFloor ${cfg.mixFloor} (names ${bank.names.length}, class ${cfg.cls}) — REFUSED`);
    const html = cards.map((c) => {
      if (c.it.kind === 'object') {
        const o = c.it.object;
        return portraitCard({
          pics: [{ src: fileUri(o.pic.theme, o.pic.noun), key: o.key }], plate: objectCaption(o, loc, cfg.objectCaption),
          chips: bank.chips, correctIndex: c.chip, key: c.key, refs: [o.key], names: [],
          pic: cfg.pic, pairPic: cfg.pairPic, plateH: cfg.plateH, plateFont: cfg.plateFont, chipW: cfg.chipW, chipH: cfg.chipH, chipFont: cfg.chipFont,
        });
      }
      const names = c.it.names.map((n) => n.name);
      return portraitCard({
        pics: c.it.people.map((p) => ({ src: portraitSrc(p), key: p.key })), plate: fillSubject('{subj}', names, bank.and, bank.andBefore),
        chips: bank.chips, correctIndex: c.chip, key: c.key, refs: c.it.people.map((p) => p.key), names,
        pic: cfg.pic, pairPic: cfg.pairPic, plateH: cfg.plateH, plateFont: cfg.plateFont, chipW: cfg.chipW, chipH: cfg.chipH, chipFont: cfg.chipFont,
      });
    });
    // the K-354 idiom: cardGrid emits no per-card style; the type states the card padding inline
    const grid = cardGrid({ cards: html, cols: cfg.cols, rows: cfg.rows }).replace(/<section class="ws-card"/g, `<section class="ws-card" style="padding:${cfg.cardPad}"`);
    const bodyHtml = `<div data-ws-content data-lcs-pron data-lcs-cards="${cfg.cards}" data-lcs-chips="${bank.chips.length}" data-lcs-and="${bank.and}" data-lcs-mixfloor="${cfg.mixFloor}" data-lcs-class="${cfg.cls}" ` +
      `style="flex:1;display:flex;flex-direction:column;min-height:0">${grid}</div>`;
    return {
      bodyHtml,
      meta: {
        face: 'base', cls: cfg.cls, chips: bank.chips.length,
        cards: cards.map((c) => [c.key, c.chip, c.it.kind === 'object' ? c.it.object.key : c.it.people.map((p) => p.key).join('+'), c.it.kind === 'object' ? '' : c.it.names.map((n) => n.name).join('+')]),
      },
    };
  },

  /** Phase 2 seam: the five faces (`replace` / `anaphora` / `possessive` / `sort` / `rewrite`) are NOT built yet — refuse loudly. */
  _buildFace(bank, d) {
    throw new Error(`${ID}: layout "${d.layout}" is a Phase 2 face and is not built yet — the base renders only when d.layout is undefined`);
  },

  async verify(page) {
    return page.evaluate(VERIFY_BASE);
  },
};
