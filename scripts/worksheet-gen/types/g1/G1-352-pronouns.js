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
 * PHASE 2 — the five faces (design §3; rows in tools/b4var-rows/pronouns.js;
 * record _work/G1-352-faces.md): ONE additive `layout` knob (`replace` /
 * `anaphora` / `possessive` / `sort` / `rewrite`), dispatched in `_buildWith`
 * BEFORE the base path consumes the RNG so the base's default output stays
 * byte-identical (tools/b3-baseline.js). Each face has its own composer
 * (`dealFace` = the base deal cloned minus chips + plate guard; F2 its own),
 * its own `verify()` branch keyed on the `data-lcs-layout` stamp, and a SPARSE
 * assertion (the nt10-D addition): the stretch faces (F1 / F2 / F3 / F5) put
 * their lanes in a `flex:1` grid of `minmax(<min>px, 1fr)` rows that ends at
 * the body bottom, with the blank inside every lane <= 24 px; F4 is a fixed
 * stack (shelf + bins) sized to the 677 / 710 budgets whose bins' lines FILL
 * the bin (binH 409 row / 199 grid) and whose slack under it is <= 180.
 * Per-locale classes are read off the BANK's shape (chips.length / objectMap /
 * the possessive block), never the locale code; the F3 chip width is the bank's
 * measured `possessive.chipW`.
 */
'use strict';
const { bank: loadBank } = require('../../lib/b4-common.js');
const { fileUri, vocab, displayWord } = require('../../lib/b2-common.js');
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const { portraitCard, nameGapRow, initialBank, anaphoraBlock, ownerLane, nameCardBins, rewriteLane } = require('../../templates/components-b4.js');

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
    // design §2 "Chips": 4 chips (fr/es/pt) -> w 66 / fontPx 20 at EVERY level (4 x 66 + 36 = 300 <= the 302 card inner);
    // 3-chip d.chipW 84 gave 4 x 84 + 36 = 372 and every card overflowed (the es panel rendered it)
    chipW: cls === 'four' ? (src.chipW || 66) : d.chipW, chipH: d.chipH, chipFont: cls === 'four' ? (src.chipFont || 20) : d.chipFont, objectCaption: d.objectCaption || 'bare', cardPad: d.cardPad,
  };
  if (cls === 'four' && cfg.chipW * 4 + 36 > 302) throw new Error(`${ID}: four-chip chipW ${cfg.chipW} overflows the 302 card inner`);
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

/* ------------------------------------------------------------------ Phase 2: the five faces (design §3; tools/b4var-rows/pronouns.js) ------------------------------------------------------------------ */

const FACES = ['replace', 'anaphora', 'possessive', 'sort', 'rewrite'];
const BODY_FILL_TOL = 3;          // the stretch faces end within this of the body bottom (sparse rule)
const LANE_BLANK_MAX = 24;        // blank above / below a lane's content (the K-356 F1 ruling)
const SLACK_MAX = 180;            // one-line slack under a fixed stack (F4)
const DE_ARTICLES = ['der', 'die', 'das', 'den', 'dem', 'des', 'ein', 'eine', 'einen', 'einem', 'einer'];

/** The possessive class of a bank (design §3 F3), read off the POSSESSIVE block's shape, never the locale code. */
function possessiveClass(bank) {
  const P = bank.possessive;
  if (!P || (bank.refuse && bank.refuse.possessive)) return null;
  if (P.chips.length === 4 && !(P.frame && P.frame.pl)) return 'ownerEnding';   // de: sein/seine/ihr/ihre, single owners only
  if (P.chips.length === 4) return 'ownerFour';                                  // pt: dele/dela/deles/delas
  if (P.things.some((t) => t.forms)) return 'thingAgree';                        // fr/it: son/sa/leur, suo/sua/loro
  return 'owner';                                                                // en/nl/sv/da/no
}

/** possForm(bank, ownerKey, thing) -> a possessive chip index, or null (the pairing is refused). A thing's `forms` table is keyed {m1, f1, p} (every pair key collapses to p); `byOwner` carries the five keys. */
function possForm(bank, ownerKey, thing) {
  const P = bank.possessive;
  if (!P) return null;
  const fk = /^(mp|fp|xp|p)$/.test(ownerKey) ? 'p' : ownerKey;
  const v = thing.forms ? thing.forms[fk] : (P.byOwner ? P.byOwner[ownerKey] : null);
  return Number.isInteger(v) ? v : null;
}

/**
 * The class-resolved deal config of a face: the row's 3-chip config or its `four`
 * (fr/es/pt) / `two` (fi) / `ending` (the de possessive) variant — `srcKey`
 * names the variant the CALLER derived from the bank's shape. `objects:true`
 * turns the de/nl object cards on (F4). Guards run on the RESULT.
 */
function faceDeal(d, bank, srcKey, { objects = false, pic, pairPic, mixFloor = 1 } = {}) {
  const cls = localeClass(bank);
  const src = srcKey && d[srcKey] ? d[srcKey] : d;
  const cfg = { cls, singles: src.singles, pairs: src.pairs, pairMix: src.pairMix || 'any', objects: 0, neuterMin: d.neuterMin || 0, pic, pairPic, mixFloor, maxPerSex: src.maxPerSex || 0 };
  if (cfg.maxPerSex && cfg.maxPerSex * 2 < cfg.singles) throw new Error(`${ID}: maxPerSex ${cfg.maxPerSex} x 2 < singles ${cfg.singles}`);
  if (objects && cls === 'objects') { cfg.objects = d.objects; cfg.pairs = 0; cfg.pairMix = 'none'; }
  if (!(cfg.singles >= 2)) throw new Error(`${ID}: singles ${cfg.singles} < 2 (both sexes must be present)`);
  if (!(cfg.pairs >= 0)) throw new Error(`${ID}: pairs ${cfg.pairs}`);
  if (cfg.pairMix !== 'any' && cfg.pairMix !== 'none') {
    const types = cfg.pairMix.split(',').map((s) => s.trim());
    if (types.length !== cfg.pairs || types.some((t) => !PAIR_TYPES.includes(t))) throw new Error(`${ID}: pairMix "${cfg.pairMix}" does not name ${cfg.pairs} of mp|fp|xp`);
    cfg.pairTypes = types;
  }
  if (cfg.objects) {
    if (cfg.objects < cfg.neuterMin) throw new Error(`${ID}: objects ${cfg.objects} < neuterMin ${cfg.neuterMin}`);
    if (!Array.isArray(bank.objects) || !bank.objects.length) throw new Error(`${ID}: the locale has an objectMap but no objects — REFUSED`);
  }
  if (!(cfg.pic >= 36) || !(cfg.pairPic >= 36)) throw new Error(`${ID}: pic ${cfg.pic} / pairPic ${cfg.pairPic} below 36`);
  return cfg;
}

/**
 * The face deal (the base's compose cloned, minus the chip row + the plate guard):
 * `singles` person items + `pairs` pair items (+ `objects` de/nl object items), RNG
 * order: the singles' sex split → the singles' portraits → the pairs' types +
 * portraits → the item order → the objects → the names → keys + the answer
 * (`answerFor(key)` → an index, or null = refused on this face) → the mix floor.
 * Returns the ordered items [{kind, people, names, refs, key, chip, object?}] or
 * null (no deal; the caller refuses).
 */
function dealFace(rng, bank, cfg, answerFor, loc) {
  const people = bank.people;
  const nameGender = (g) => bank.names.filter((n) => n.gender === g);
  const mNames = nameGender('m').length, fNames = nameGender('f').length;
  const singlesPool = people.filter((p) => p.minPx <= cfg.pic);
  const pairPool = people.filter((p) => p.minPx <= cfg.pairPic);
  const need2 = cfg.singles >= 4 ? 2 : 1;
  const pairKey = (pt) => (collapsesPairs(bank) ? 'p' : pt);
  for (let t = 0; t < MAX_TRIES; t++) {
    const cap = cfg.maxPerSex || cfg.singles;
    const mS = rng.int(Math.max(need2, cfg.singles - cap), Math.min(cfg.singles - need2, cap));
    const fS = cfg.singles - mS;
    let types;
    if (cfg.pairTypes) types = cfg.pairTypes.slice();
    else if (cfg.pairs) {
      const allowed = PAIR_TYPES.filter((pt) => answerFor(pairKey(pt)) != null);
      if (!allowed.length) return null;
      types = Array.from({ length: cfg.pairs }, () => rng.pick(allowed));
    } else types = [];
    const pairM = types.reduce((s, x) => s + (x === 'mp' ? 2 : x === 'xp' ? 1 : 0), 0);
    const pairF = types.reduce((s, x) => s + (x === 'fp' ? 2 : x === 'xp' ? 1 : 0), 0);
    if (mS + pairM > mNames || fS + pairF > fNames) continue;
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
    const slots = rng.shuffle(items.map((_, i) => i).concat(Array.from({ length: cfg.objects }, (_, k) => 'o' + k)));
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
    const mList = rng.shuffle(nameGender('m')), fList = rng.shuffle(nameGender('f'));
    for (const it of items) it.names = it.people.map((p) => (p.depicted === 'm' ? mList.pop() : fList.pop()));
    if (items.some((it) => it.names.some((n) => !n))) continue;
    const out = [];
    for (const s of slots) {
      const it = typeof s === 'string' ? objectItems[+s.slice(1)] : items[s];
      const refs = it.kind === 'object' ? [{ object: true, key: it.object.key, code: it.object.code }] : it.people.map((p, i) => ({ key: p.key, depicted: p.depicted, name: it.names[i].name, nameGender: it.names[i].gender }));
      const key = keyOf(refs, bank);
      const chip = answerFor(key);
      if (chip == null) { ok = false; break; }
      out.push({ kind: it.kind, people: it.people || [], names: it.names || [], object: it.object, refs, key, chip });
    }
    if (!ok) continue;
    if (cfg.mixFloor > 0) {
      // the floor runs over the chips THIS face can reach: the person keys' answers (+ the object chips when objects deal)
      const hist = {};
      out.forEach((c) => { hist[c.chip] = (hist[c.chip] || 0) + 1; });
      const personKeys = collapsesPairs(bank) ? ['m1', 'f1', 'p'] : ['m1', 'f1', 'mp', 'fp', 'xp'];
      const reachable = new Set(personKeys.map(answerFor).filter((v) => v != null));
      if (cfg.objects) for (const v of Object.values(bank.objectMap)) reachable.add(v);
      let under = false;
      for (const i of reachable) if ((hist[i] || 0) < cfg.mixFloor) under = true;
      if (under) continue;
    }
    if (new Set(out.map((c) => c.key)).size < 2) continue;
    return out;
  }
  return null;
}

function picsOf(it) { return it.people.map((p) => ({ src: portraitSrc(p), key: p.key })); }
function namesOf(it) { return it.names.map((n) => n.name); }
function numOf(it) { return it.people.length > 1 ? 'pl' : 'sg'; }
function rootStyle() { return 'flex:1;display:flex;flex-direction:column;min-height:0'; }

/* ---------- F1 replace ---------- */
function buildReplace(bank, d, loc, rng) {
  if (!(d.rows >= 6 && d.rows <= 12)) throw new Error(`${ID} replace: rows ${d.rows} outside [6, 12]`);
  if (d.bank !== true) throw new Error(`${ID} replace: bank must be true (the d3 recall variant is unpublished)`);
  if (!(d.pic >= 44 && d.pairPic >= 44)) throw new Error(`${ID} replace: pic ${d.pic} / pairPic ${d.pairPic} below the G1 floor 44`);
  if (!(d.gapW >= 64 && d.gapH >= 24)) throw new Error(`${ID} replace: gap box ${d.gapW} x ${d.gapH} too small for a G1 hand`);
  if (!(d.maxLine >= 20 && d.maxLine <= 55)) throw new Error(`${ID} replace: maxLine ${d.maxLine} outside [20, 55]`);
  if (!(d.laneMin >= 74)) throw new Error(`${ID} replace: laneMin ${d.laneMin} < 74 (the measured lane)`);
  const cfg = faceDeal(d, bank, localeClass(bank) === 'four' ? 'four' : null, { pic: d.pic, pairPic: d.pairPic, mixFloor: 1 });
  if (cfg.singles + cfg.pairs !== d.rows) throw new Error(`${ID} replace: singles ${cfg.singles} + pairs ${cfg.pairs} != rows ${d.rows}`);
  if (!Array.isArray(bank.frames) || bank.frames.length < d.rows) throw new Error(`${ID} replace: ${(bank.frames || []).length} frames < rows ${d.rows}`);
  const items = dealFace(rng, bank, cfg, (k) => answerChip(bank, 'replace', k), loc);
  if (!items) throw new Error(`${ID}: ${loc} cannot deal the replace face (${cfg.singles} singles + ${cfg.pairs} pairs, names ${bank.names.length}) — REFUSED`);
  const frames = rng.shuffle(bank.frames);
  const lanes = [];
  for (const it of items) {
    const num = numOf(it), names = namesOf(it);
    let pick = -1;
    for (let i = 0; i < frames.length; i++) {
      const lit = frames[i][num];
      if (typeof lit !== 'string' || !lit.startsWith('{subj} ')) continue;
      if ([...fillSubject(lit, names, bank.and, bank.andBefore)].length <= d.maxLine) { pick = i; break; }
    }
    if (pick < 0) throw new Error(`${ID} replace: no frame fits "${names.join(' ')}" within ${d.maxLine} chars — REFUSED`);
    const frame = frames.splice(pick, 1)[0];
    const literal = frame[num];
    const line1 = fillSubject(literal, names, bank.and, bank.andBefore);
    const line2 = literal.slice('{subj} '.length);
    const answer = bank.initial[it.chip];
    lanes.push(nameGapRow({ pics: picsOf(it), line1, line2, gapW: d.gapW, gapH: d.gapH, picPx: d.pic, pairPx: d.pairPic, frameId: frame.id, num, key: it.key, answer, names }));
  }
  const bankHtml = initialBank({ words: bank.initial, rng, chipOrder: bank.initial });
  const bodyHtml = `<div data-ws-content data-lcs-pron data-lcs-layout="replace" data-lcs-rows="${d.rows}" data-lcs-chips="${bank.chips.length}" data-lcs-and="${bank.and}" data-lcs-bank="1" data-lcs-class="${cfg.cls}" style="${rootStyle()}">` +
    bankHtml + `<div data-lcs-lanes style="flex:1;display:grid;grid-template-rows:repeat(${d.rows},minmax(${d.laneMin}px,1fr));row-gap:${d.laneGap}px;min-height:0">${lanes.join('')}</div></div>`;
  return { bodyHtml, meta: { face: 'replace', cls: cfg.cls, items: items.map((it) => [it.key, it.chip, it.people.map((p) => p.key).join('+'), namesOf(it).join('+')]) } };
}

/* ---------- F2 anaphora ---------- */
function buildAnaphora(bank, d, loc, rng) {
  if (!(d.pairs >= 4 && d.pairs <= 6)) throw new Error(`${ID} anaphora: pairs ${d.pairs} outside [4, 6]`);
  if (d.sentencesPerPair !== 2) throw new Error(`${ID} anaphora: sentencesPerPair ${d.sentencesPerPair} != 2`);
  if (!(d.pic >= 36)) throw new Error(`${ID} anaphora: pic ${d.pic} < 36`);
  if (!(d.plateFont >= 16)) throw new Error(`${ID} anaphora: plateFont ${d.plateFont} < 16`);
  if (!(d.cardMin >= 116)) throw new Error(`${ID} anaphora: cardMin ${d.cardMin} < 116 (two 44 px name rows + gap + shell)`);
  const two = collapsesPairs(bank);
  const introMax = two ? d.introMaxTwo : d.introMax;
  if (!Array.isArray(bank.anaphora) || bank.anaphora.length < d.pairs) throw new Error(`${ID} anaphora: ${(bank.anaphora || []).length} frames < ${d.pairs}`);
  const pool = bank.people.filter((p) => p.minPx <= d.pic);
  const perBlock = two ? 3 : 2;
  const nameG = (g) => bank.names.filter((n) => n.gender === g);
  if (two ? bank.names.length < d.pairs * 3 : (nameG('f').length < d.pairs || nameG('m').length < d.pairs)) throw new Error(`${ID} anaphora: ${loc} has ${bank.names.length} names, the face needs ${d.pairs * perBlock} — REFUSED`);
  const frames = rng.sample(bank.anaphora, d.pairs);
  for (let t = 0; t < MAX_TRIES; t++) {
    let ok = true;
    const blocks = [];
    const usedKeys = new Set();
    const draw = (sex, n) => { const cands = pool.filter((p) => (!sex || p.depicted === sex) && !usedKeys.has(p.key)); if (cands.length < n) return null; const out = rng.sample(cands, n); out.forEach((p) => usedKeys.add(p.key)); return out; };
    const fList = rng.shuffle(nameG('f')), mList = rng.shuffle(nameG('m'));
    const nameFor = (p) => (p.depicted === 'm' ? mList.pop() : fList.pop());
    for (const frame of frames) {
      let referents;
      if (two) {
        // fi: one person + one pair, sentences one sg + one pl (the NUMBER re-target)
        const single = draw(null, 1), pair = draw(null, 2);
        if (!single || !pair) { ok = false; break; }
        const sN = nameFor(single[0]), pN = pair.map(nameFor);
        if (!sN || pN.some((x) => !x)) { ok = false; break; }
        referents = [{ people: single, names: [sN] }, { people: pair, names: pN }];
      } else {
        const f = draw('f', 1), m = draw('m', 1);
        if (!f || !m) { ok = false; break; }
        const fN = nameFor(f[0]), mN = nameFor(m[0]);
        if (!fN || !mN) { ok = false; break; }
        referents = rng.int(0, 1) ? [{ people: f, names: [fN] }, { people: m, names: [mN] }] : [{ people: m, names: [mN] }, { people: f, names: [fN] }];
      }
      referents = referents.map((r, i) => {
        const refs = r.people.map((p, k) => ({ key: p.key, depicted: p.depicted, name: r.names[k].name, nameGender: r.names[k].gender }));
        const key = keyOf(refs, bank);
        const chip = answerChip(bank, 'anaphora', key);
        if (chip == null) throw new Error(`${ID} anaphora: key ${key} is refused on this face (map.anaphora)`);
        return { people: r.people, names: r.names, refs, key, chip, target: i === 0 ? 'a' : 'b', plate: fillSubject('{subj}', r.names.map((n) => n.name), bank.and, bank.andBefore) };
      });
      if (referents[0].key === referents[1].key) { ok = false; break; }
      const intro = String(frame.intro).replace('{a}', referents[0].plate).replace('{b}', referents[1].plate);
      if ([...intro].length > introMax) { ok = false; break; }
      // sentence -> referent: non-fi a random permutation (both sg); fi by key (sg -> the single, pl -> the pair)
      let assign;
      if (two) assign = frame.s.map((s) => (s.key === 'pl' ? 1 : 0));
      else assign = rng.int(0, 1) ? [0, 1] : [1, 0];
      if (new Set(assign).size !== 2) throw new Error(`${ID} anaphora: frame ${frame.id} does not assign both referents`);
      const sentences = frame.s.map((s, k) => {
        if (!String(s.text).startsWith('{P} ')) throw new Error(`${ID} anaphora: sentence "${s.text}" does not start with {P}`);
        const r = referents[assign[k]];
        return { pronoun: bank.initial[r.chip], rest: String(s.text).slice('{P} '.length), ref: r.target };
      });
      blocks.push({ frame, referents, intro, sentences });
    }
    if (!ok) continue;
    const html = blocks.map((b) => anaphoraBlock({
      referents: b.referents.map((r) => ({ pics: picsOf(r), name: r.plate, target: r.target, key: r.key, refs: r.people.map((p) => p.key), names: r.names.map((n) => n.name) })),
      intro: b.intro, sentences: b.sentences, namesW: d.namesW, zone: d.zone, platePx: d.plateFont,
    })).join('');
    const bodyHtml = `<div data-ws-content data-lcs-pron data-lcs-layout="anaphora" data-lcs-pairs="${d.pairs}" data-lcs-chips="${bank.chips.length}" data-lcs-and="${bank.and}" data-lcs-class="${two ? 'two' : 'three'}" style="${rootStyle()}">` +
      `<div data-lcs-lanes style="flex:1;display:grid;grid-template-rows:repeat(${d.pairs},minmax(${d.cardMin}px,1fr));row-gap:${d.cardGap}px;min-height:0">${html}</div></div>`;
    return { bodyHtml, meta: { face: 'anaphora', blocks: blocks.map((b) => [b.frame.id, b.referents.map((r) => r.key + ':' + r.people.map((p) => p.key).join('+')).join(' '), b.sentences.map((s) => s.pronoun + '>' + s.ref).join(' ')]) } };
  }
  throw new Error(`${ID}: ${loc} cannot deal the anaphora face — REFUSED`);
}

/* ---------- F3 possessive ---------- */
function buildPossessive(bank, d, loc, rng) {
  const P = bank.possessive;
  const pc = possessiveClass(bank);
  if (!pc) throw new Error(`${ID}: ${loc} refuses the possessive face (refuse.possessive) — REFUSED`);
  if (!(d.rows >= 6 && d.rows <= 12)) throw new Error(`${ID} possessive: rows ${d.rows} outside [6, 12]`);
  if (!(d.ownerPx >= 36 && d.thingPx >= 36)) throw new Error(`${ID} possessive: ownerPx ${d.ownerPx} / thingPx ${d.thingPx} < 36`);
  if (!(d.chipH >= 44)) throw new Error(`${ID} possessive: chipH ${d.chipH} < 44`);
  if (!(d.chipFont >= 16)) throw new Error(`${ID} possessive: chipFont ${d.chipFont} < 16`);
  if (!(d.maxLine >= 20 && d.maxLine <= 43)) throw new Error(`${ID} possessive: maxLine ${d.maxLine} outside [20, 43]`);
  if (!(d.laneMin >= 83)) throw new Error(`${ID} possessive: laneMin ${d.laneMin} < 83 (the measured lane)`);
  const chipW = P.chipW;
  if (!Number.isInteger(chipW) || chipW < 60 || chipW > 100) throw new Error(`${ID} possessive: ${loc} possessive.chipW ${chipW} outside [60, 100] (the bank measures it)`);
  if (P.chips.length * chipW + (P.chips.length - 1) * 12 > 487) throw new Error(`${ID} possessive: ${P.chips.length} chips x ${chipW} do not fit the 487 text column`);
  const srcKey = pc === 'ownerEnding' ? 'ending' : pc === 'ownerFour' ? 'four' : null;
  const cfg = faceDeal(d, bank, srcKey, { pic: d.ownerPx, pairPic: d.ownerPx, mixFloor: 0 });
  if (cfg.singles + cfg.pairs !== d.rows) throw new Error(`${ID} possessive: singles ${cfg.singles} + pairs ${cfg.pairs} != rows ${d.rows} (class ${pc})`);
  if (pc === 'ownerEnding' && cfg.pairs) throw new Error(`${ID} possessive: the ownerEnding class (de) takes single owners only`);
  if (cfg.pairs && !(P.frame && P.frame.pl)) throw new Error(`${ID} possessive: pairs need frame.pl`);
  const V = vocab();
  const things = P.things.map((t) => {
    const e = V[t.key] && V[t.key][loc];
    if (!e || !e[0]) throw new Error(`${ID} possessive: thing "${t.key}" has no ${loc} vocab singular — refuse`);
    const code = e[2] || null;
    if (P.artTable && !(code && P.artTable[code])) throw new Error(`${ID} possessive: thing "${t.key}" has no article in artTable (${code})`);
    return { ...t, code, literal: displayWord(e[0], loc), art: P.artTable ? P.artTable[code] : '' };
  });
  const admissible = (key) => (things.some((t) => possForm(bank, key, t) != null) ? 0 : null);
  for (let t = 0; t < MAX_TRIES; t++) {
    const items = dealFace(rng, bank, cfg, admissible, loc);
    if (!items) break;
    let ok = true;
    const pool = rng.shuffle(things);
    const lanes = [];
    const hist = new Array(P.chips.length).fill(0);
    const genders = { f: 0, mn: 0 };
    for (const it of items) {
      const num = numOf(it), names = namesOf(it);
      const frame = num === 'pl' ? P.frame.pl : P.frame.sg;
      let pick = -1, text = '', chip = null;
      for (let i = 0; i < pool.length; i++) {
        chip = possForm(bank, it.key, pool[i]);
        if (chip == null) continue;
        text = fillSubject(frame, names, bank.and, bank.andBefore).replace('{thing}', pool[i].literal).replace('{art}', pool[i].art);
        if ([...text.replace('___', '')].length <= d.maxLine) { pick = i; break; }   // the 64 px box is budgeted apart from the 43 chars (design §3 F3)
      }
      if (pick < 0) { ok = false; break; }
      const thing = pool.splice(pick, 1)[0];
      hist[chip]++;
      if (thing.code) { if (thing.code === 'f' || (thing.code === 'd' && loc === 'nl')) genders.f++; else genders.mn++; }
      lanes.push({ it, thing, text, chip, num, names });
    }
    if (!ok) continue;
    if (hist.some((h) => h < d.mixFloor)) continue;
    if (pc === 'thingAgree' && (genders.f < d.thingGenderMin || genders.mn < d.thingGenderMin)) continue;
    const html = lanes.map((l, i) => ownerLane({
      owners: { pics: picsOf(l.it) }, thing: { src: fileUri(l.thing.pic.theme, l.thing.pic.noun), key: l.thing.key }, frame: l.text,
      chips: P.chips, correctIndex: l.chip, chipW, chipFont: d.chipFont, num: l.num, ownerKey: l.it.key, thingKey: l.thing.key, names: l.names,
    })).join('');
    const bodyHtml = `<div data-ws-content data-lcs-pron data-lcs-layout="possessive" data-lcs-rows="${d.rows}" data-lcs-chips="${P.chips.length}" data-lcs-and="${bank.and}" data-lcs-mixfloor="${d.mixFloor}" data-lcs-chipw="${chipW}" data-lcs-poss-class="${pc}" style="${rootStyle()}">` +
      `<div data-lcs-lanes style="flex:1;display:grid;grid-template-rows:repeat(${d.rows},minmax(${d.laneMin}px,1fr));row-gap:${d.laneGap}px;min-height:0">${html}</div></div>`;
    return { bodyHtml, meta: { face: 'possessive', cls: pc, lanes: lanes.map((l) => [l.it.key, l.chip, l.it.people.map((p) => p.key).join('+'), l.names.join('+'), l.thing.key]) } };
  }
  throw new Error(`${ID}: ${loc} cannot deal the possessive face (class ${pc}, mixFloor ${d.mixFloor}) — REFUSED`);
}

/* ---------- F4 sort ---------- */
function buildSort(bank, d, loc, rng) {
  if (!(d.cards >= 6 && d.cards <= 12)) throw new Error(`${ID} sort: cards ${d.cards} outside [6, 12]`);
  if (!(d.pic >= 44 && d.pairPic >= 44)) throw new Error(`${ID} sort: pic ${d.pic} / pairPic ${d.pairPic} below the G1 floor 44`);
  if (!(d.capFont >= 16)) throw new Error(`${ID} sort: capFont ${d.capFont} < 16`);
  if (!(d.binH >= 200 && d.gridBinH >= 150)) throw new Error(`${ID} sort: binH ${d.binH} / gridBinH ${d.gridBinH} too low`);
  if (!(d.lineMin >= 1 && d.lineGap >= 34 && d.lineGap <= 58)) throw new Error(`${ID} sort: lineMin ${d.lineMin} / lineGap ${d.lineGap}`);
  const cls = localeClass(bank);
  const srcKey = cls === 'four' ? 'four' : cls === 'objects' ? 'obj' : collapsesPairs(bank) ? 'two' : null;
  const cfg = faceDeal(d, bank, srcKey, { objects: true, pic: d.pic, pairPic: d.pairPic, mixFloor: 1 });
  if (cfg.singles + cfg.pairs + cfg.objects !== d.cards) throw new Error(`${ID} sort: singles ${cfg.singles} + pairs ${cfg.pairs} + objects ${cfg.objects} != cards ${d.cards} (class ${cls})`);
  const bins = bank.chips.map((head, idx) => ({ head, idx }));
  const binLayout = bins.length === 4 ? 'grid' : 'row';
  const binH = binLayout === 'grid' ? d.gridBinH : d.binH;
  const fillLines = Math.floor((binH - 10) / d.lineGap + 0.5);
  let dropped = 0;
  for (let t = 0; t < MAX_TRIES; t++) {
    let items = dealFace(rng, bank, cfg, (k) => answerChip(bank, 'sort', k), loc);
    if (!items) break;
    let lineCounts, gapOk = false;
    for (let deal = 0; deal <= 12 && !gapOk; deal++) {
      const loads = bins.map((b) => items.filter((c) => c.chip === b.idx).reduce((s, c) => s + (c.people.length > 1 ? 2 : 1), 0));
      lineCounts = loads.map((l) => Math.max(d.lineMin, l, fillLines));
      gapOk = lineCounts.every((lc) => Math.min(58, Math.floor((binH - 10) / (lc + 0.5))) >= 34);
      if (!gapOk) {
        if (deal < 12) { const again = dealFace(rng, bank, cfg, (k) => answerChip(bank, 'sort', k), loc); if (!again) break; items = again; }
        else { // drop one card from the heaviest bin (recorded in meta)
          const heavy = loads.indexOf(Math.max(...loads));
          const idx = items.findIndex((c) => c.chip === heavy);
          items.splice(idx, 1); dropped++;
          const loads2 = bins.map((b) => items.filter((c) => c.chip === b.idx).reduce((s, c) => s + (c.people.length > 1 ? 2 : 1), 0));
          lineCounts = loads2.map((l) => Math.max(d.lineMin, l, fillLines));
          gapOk = lineCounts.every((lc) => Math.min(58, Math.floor((binH - 10) / (lc + 0.5))) >= 34);
        }
      }
    }
    if (!gapOk) continue;
    const cards = items.map((it) => {
      if (it.kind === 'object') {
        const o = it.object;
        return { pics: [{ src: fileUri(o.pic.theme, o.pic.noun), key: o.key }], caption: objectCaption(o, loc, 'bare'), key: it.chip, itemKey: it.key, refs: [o.key], names: [] };
      }
      return { pics: picsOf(it), caption: fillSubject('{subj}', namesOf(it), bank.and, bank.andBefore), key: it.chip, itemKey: it.key, refs: it.people.map((p) => p.key), names: namesOf(it) };
    });
    const html = nameCardBins({ cards, bins, binLayout, binH, lineCounts });
    const bodyHtml = `<div data-ws-content data-lcs-pron data-lcs-layout="sort" data-lcs-cards="${cards.length}" data-lcs-chips="${bank.chips.length}" data-lcs-and="${bank.and}" data-lcs-binh="${binH}" data-lcs-class="${cls}" data-lcs-dropped="${dropped}" style="${rootStyle()}">${html}</div>`;
    return { bodyHtml, meta: { face: 'sort', cls, binLayout, binH, lineCounts, dropped, cards: cards.map((c) => [c.itemKey, c.key, c.refs.join('+'), c.names.join('+')]) } };
  }
  throw new Error(`${ID}: ${loc} cannot deal the sort face (${cfg.singles} singles + ${cfg.pairs} pairs + ${cfg.objects} objects) — REFUSED`);
}

/* ---------- F5 rewrite ---------- */
function buildRewrite(bank, d, loc, rng) {
  if (!(d.rows >= 6 && d.rows <= 12)) throw new Error(`${ID} rewrite: rows ${d.rows} outside [6, 12]`);
  if (d.ruling !== true || d.bank !== false) throw new Error(`${ID} rewrite: ruling must be true and bank false (the face is the writing row, never a bank)`);
  if (!(d.glyphH >= 24)) throw new Error(`${ID} rewrite: glyphH ${d.glyphH} < the G2 floor 24`);
  if (!(d.rowH >= d.glyphH + 20)) throw new Error(`${ID} rewrite: rowH ${d.rowH} too low for glyphH ${d.glyphH}`);
  if (!(d.w >= 500 && d.w <= 535)) throw new Error(`${ID} rewrite: w ${d.w} outside [500, 535] (the 104 px portrait column)`);
  if (!(d.pic >= 36 && d.pairPic >= 36)) throw new Error(`${ID} rewrite: pic ${d.pic} / pairPic ${d.pairPic} < 36`);
  if (!(d.maxLine >= 20 && d.maxLine <= 56)) throw new Error(`${ID} rewrite: maxLine ${d.maxLine} outside [20, 56]`);
  if (!(d.maxAnswer >= 10) || need('x'.repeat(d.maxAnswer), d.glyphH) > d.w) throw new Error(`${ID} rewrite: maxAnswer ${d.maxAnswer} glyphs need ${need('x'.repeat(d.maxAnswer), d.glyphH)} > ${d.w}`);
  if (!(d.rowMin >= 77)) throw new Error(`${ID} rewrite: rowMin ${d.rowMin} < 77 (the measured row)`);
  const cfg = faceDeal(d, bank, localeClass(bank) === 'four' ? 'four' : null, { pic: d.pic, pairPic: d.pairPic, mixFloor: 1 });
  if (cfg.singles + cfg.pairs !== d.rows) throw new Error(`${ID} rewrite: singles ${cfg.singles} + pairs ${cfg.pairs} != rows ${d.rows}`);
  if (!Array.isArray(bank.frames) || bank.frames.length < d.rows) throw new Error(`${ID} rewrite: ${(bank.frames || []).length} frames < rows ${d.rows}`);
  const items = dealFace(rng, bank, cfg, (k) => answerChip(bank, 'rewrite', k), loc);
  if (!items) throw new Error(`${ID}: ${loc} cannot deal the rewrite face — REFUSED`);
  const frames = rng.shuffle(bank.frames);
  const rows = [];
  for (const it of items) {
    const num = numOf(it), names = namesOf(it);
    const pron = bank.initial[it.chip];
    let pick = -1, sentence = '', answer = '';
    for (let i = 0; i < frames.length; i++) {
      const lit = frames[i][num];
      if (typeof lit !== 'string' || !lit.startsWith('{subj}')) continue;
      sentence = fillSubject(lit, names, bank.and, bank.andBefore);
      answer = lit.replace('{subj}', pron);
      if ([...sentence].length <= d.maxLine && [...answer].length <= d.maxAnswer && need(answer, d.glyphH) <= d.w) { pick = i; break; }
    }
    if (pick < 0) throw new Error(`${ID} rewrite: no frame fits "${names.join(' ')}" (printed <= ${d.maxLine}, answer <= ${d.maxAnswer}) — REFUSED`);
    const frame = frames.splice(pick, 1)[0];
    rows.push(rewriteLane({ pics: picsOf(it), sentence, w: d.w, h: d.rowH, glyphH: d.glyphH, num, frameId: frame.id, key: it.key, answer, picPx: d.pic, pairPx: d.pairPic, names }));
  }
  const bodyHtml = `<div data-ws-content data-lcs-pron data-lcs-layout="rewrite" data-lcs-rows="${d.rows}" data-lcs-chips="${bank.chips.length}" data-lcs-and="${bank.and}" data-lcs-glyphh="${d.glyphH}" data-lcs-w="${d.w}" data-lcs-class="${cfg.cls}" style="${rootStyle()}">` +
    `<div data-lcs-lanes style="flex:1;display:grid;grid-template-rows:repeat(${d.rows},minmax(${d.rowMin}px,1fr));row-gap:${d.rowGap}px;min-height:0">${rows.join('')}</div></div>`;
  return { bodyHtml, meta: { face: 'rewrite', cls: cfg.cls, items: items.map((it) => [it.key, it.chip, it.people.map((p) => p.key).join('+'), namesOf(it).join('+')]) } };
}

/* ------------------------------------------------------------------ verify (page side) — the five faces ------------------------------------------------------------------ */

function VERIFY_FACE() {
  const fails = [];
  const root = document.querySelector('[data-lcs-pron]');
  if (!root) return ['no pronouns root'];
  const layout = root.dataset.lcsLayout;
  const r = (el) => el.getBoundingClientRect();
  const body = r(document.querySelector('[data-lcs-body]'));
  const foot = r(document.querySelector('.ws-foot')).top;
  const rr = r(root);
  const G1 = 44, G2 = 36, BODY_FILL_TOL = 3, LANE_BLANK_MAX = 24, SLACK_MAX = 180;
  const DE_ARTICLES = ['der', 'die', 'das', 'den', 'dem', 'des', 'ein', 'eine', 'einen', 'einem', 'einer'];
  const fold = (s) => String(s || '').trim().toLocaleLowerCase();
  const esc = (s) => String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\/* ------------------------------------------------------------------ verify (page side; self-contained) ------------------------------------------------------------------ */');
  const hasWord = (t, w) => new RegExp('(?<!\\p{L})' + esc(w) + '(?!\\p{L})', 'iu').test(String(t));
  const and = root.dataset.lcsAnd || '';
  const picsWant = (key) => (/^(m1|f1)$/.test(key) || /^obj:/.test(key) ? 1 : /^(mp|fp|xp|p)$/.test(key) ? 2 : -1);
  const srcs = new Set(), names = new Set();
  const checkPics = (el, key, L, floor) => {
    const imgs = [...el.querySelectorAll('img[data-lcs-pic]')];
    const want = picsWant(key);
    if (want < 0) fails.push(`${L}: key "${key}" is not m1|f1|mp|fp|xp|p|obj:*`);
    if (imgs.length !== want) fails.push(`${L}: ${imgs.length} portraits for key ${key}`);
    imgs.forEach((img) => {
      if (!img.complete || img.naturalWidth === 0) fails.push(`${L}: broken picture ${img.dataset.lcsPic}`);
      const w = r(img).width;
      if (w < floor - 0.6) fails.push(`${L}: portrait "${img.dataset.lcsPic}" ${w.toFixed(1)} px < ${floor}`);
      if (srcs.has(img.src)) fails.push(`${L}: portrait src twice on the page (${img.dataset.lcsPic})`);
      srcs.add(img.src);
    });
    return imgs;
  };
  const checkNames = (nm, key, L) => {
    const want = /^obj:/.test(key) ? 0 : picsWant(key);
    if (nm.length !== want) fails.push(`${L}: ${nm.length} names for key ${key}`);
    nm.forEach((n) => { if (names.has(fold(n))) fails.push(`${L}: name "${n}" twice on the page`); names.add(fold(n)); });
  };
  const oneLine = (p, L, max) => { if (!p) return; if (r(p).height > max + 0.6) fails.push(`${L}: text ${r(p).height.toFixed(1)} px high > ${max} (wraps)`); if (p.scrollWidth > p.clientWidth + 0.6) fails.push(`${L}: text overflows its column (${p.scrollWidth} > ${p.clientWidth})`); };
  const fontOk = (el, L, min = 16) => { const fs = parseFloat(getComputedStyle(el).fontSize); if (fs < min) fails.push(`${L}: font ${fs} < ${min}`); };
  // common: top-anchored, nothing under the footer
  if (rr.top > body.top + 8) fails.push(`stage top ${Math.round(rr.top - body.top)} px under the body top: the stage floats (top-anchor it)`);
  let lowest = 0;
  root.querySelectorAll('*').forEach((el) => { const b = r(el); if (b.width && b.height && b.bottom > lowest) lowest = b.bottom; });
  if (lowest > foot + 0.6) fails.push(`ink ${Math.round(lowest)} reaches under the footer ${Math.round(foot)}`);
  // the lane grid of the stretch faces: fills the body; lanes own their band (blank inside <= 24; gaps <= 12)
  const laneGrid = (sel, L, contentOf) => {
    const grid = root.querySelector('[data-lcs-lanes]');
    if (!grid) { fails.push('no lane grid'); return []; }
    const g = r(grid);
    if (g.top - rr.top > 80) fails.push(`the lane grid starts ${Math.round(g.top - rr.top)} px under the stage top`);
    const lanes = [...grid.querySelectorAll(sel)];
    // the LAST LANE's ink, not the grid box: a flex:1 grid box stretches while fixed rows leave the paper under them blank
    const lastBottom = lanes.length ? Math.max(...lanes.map((ln) => r(ln).bottom)) : g.top;
    if (body.bottom - lastBottom > BODY_FILL_TOL) fails.push(`the lanes end ${Math.round(body.bottom - lastBottom)} px above the body bottom (sparse: rows must stretch)`);
    if (lastBottom > body.bottom + 0.6) fails.push(`the lanes end ${Math.round(lastBottom - body.bottom)} px under the body bottom`);
    lanes.forEach((ln, i) => {
      const b = r(ln);
      const c = contentOf(ln);
      if (c) {
        const pt = parseFloat(getComputedStyle(ln).paddingTop) || 0, pb = parseFloat(getComputedStyle(ln).paddingBottom) || 0;
        const above = c.top - (b.top + pt), below = (b.bottom - pb) - c.bottom;
        if (above > LANE_BLANK_MAX + 0.6 || below > LANE_BLANK_MAX + 0.6) fails.push(`${L} ${i + 1}: blank ${Math.round(above)} above / ${Math.round(below)} below its content (> ${LANE_BLANK_MAX}: sparse)`);
        if (c.bottom > b.bottom + 0.6 || c.top < b.top - 0.6) fails.push(`${L} ${i + 1}: content spills out of its lane`);
      }
      if (i) { const gap = b.top - r(lanes[i - 1]).bottom; if (gap > 12.6) fails.push(`${L} ${i + 1}: ${Math.round(gap)} px above it (> 12: sparse)`); }
    });
    return lanes;
  };
  const contentBox = (el, sel) => { const kids = [...el.querySelectorAll(sel)].filter((k) => r(k).height); if (!kids.length) return null; return { top: Math.min(...kids.map((k) => r(k).top)), bottom: Math.max(...kids.map((k) => r(k).bottom)) }; };

  if (layout === 'replace') {
    const rows = +root.dataset.lcsRows;
    const banner = root.querySelector('[data-lcs-bank-banner]');
    if (!banner) fails.push('no bank banner (the face is bank:true)');
    const bankWords = banner ? [...banner.querySelectorAll('[data-lcs-bank-word]')].map((w) => w.dataset.lcsBankWord) : [];
    if (bankWords.length < 2 || new Set(bankWords.map(fold)).size !== bankWords.length) fails.push(`bank words ${JSON.stringify(bankWords)} (>= 2, distinct)`);
    if (banner) banner.querySelectorAll('[data-lcs-bank-word]').forEach((w) => fontOk(w, 'bank word'));
    const lanes = laneGrid('[data-lcs-frame]', 'lane', (ln) => contentBox(ln, 'p, img'));
    if (lanes.length !== rows) fails.push(`${lanes.length} lanes, config says ${rows}`);
    if (lanes.length < 6 || lanes.length > 12) fails.push(`${lanes.length} lanes outside [6, 12]`);
    const answers = new Set(), nums = new Set();
    lanes.forEach((ln, i) => {
      const L = `lane ${i + 1}`;
      const key = ln.dataset.lcsKey, answer = ln.dataset.lcsAnswer || '', nm = (ln.dataset.lcsNames || '').split('|').filter(Boolean);
      const p1 = ln.querySelector('[data-lcs-line1]'), p2 = ln.querySelector('[data-lcs-line2]');
      if (!p1 || !p2) { fails.push(`${L}: missing a line`); return; }
      const line1 = p1.textContent.trim(), line2 = p2.textContent.trim();
      const boxes = [...p2.querySelectorAll('[data-lcs-gapbox]')];
      if (boxes.length !== 1 || p2.firstElementChild !== boxes[0]) fails.push(`${L}: line 2 must OPEN with exactly one gap box`);
      boxes.forEach((bx) => { if (bx.textContent.trim() || bx.children.length) fails.push(`${L}: the gap box is pre-written`); const bb = r(bx); if (bb.width < 64 || bb.height < 24) fails.push(`${L}: gap box ${Math.round(bb.width)} x ${Math.round(bb.height)} too small`); });
      if (!line1.endsWith(line2) || line1 === line2) fails.push(`${L}: line 2 "${line2}" is not line 1 "${line1}" minus its subject`);
      const subj = line1.slice(0, line1.length - line2.length).trim();
      nm.forEach((n) => { if (!hasWord(subj, n)) fails.push(`${L}: the subject "${subj}" lacks the name "${n}"`); });
      if (nm.length === 2 && and && !hasWord(subj, and) && !/ e | y /.test(' ' + subj + ' ')) fails.push(`${L}: the pair subject "${subj}" lacks the and-word`);
      if (!answer || !bankWords.some((w) => fold(w) === fold(answer))) fails.push(`${L}: answer "${answer}" is not a bank word`);
      for (const w of bankWords) { if (hasWord(line1, w) || hasWord(line2, w)) fails.push(`${L}: the bank word "${w}" is printed in the sentence`); }
      const num = ln.dataset.lcsNum;
      if ((num === 'pl') !== (picsWant(key) === 2)) fails.push(`${L}: num ${num} does not match key ${key}`);
      nums.add(num);
      answers.add(fold(answer));
      checkPics(ln, key, L, G1);
      checkNames(nm, key, L);
      oneLine(p1, L + ' line 1', 26);
      if (p2.scrollWidth > p2.clientWidth + 0.6) fails.push(`${L}: line 2 overflows`);
      fontOk(p1, L); fontOk(p2, L);
    });
    if (nums.size < 2) fails.push('lanes carry one number only (no singular / plural contrast)');
    if (answers.size < 2) fails.push('only one answer is ever correct (no discrimination)');
  } else if (layout === 'anaphora') {
    const pairs = +root.dataset.lcsPairs;
    const blocks = laneGrid('[data-lcs-pair]', 'block', (ln) => contentBox(ln, '[data-lcs-referent], [data-lcs-intro], [data-lcs-anaphor]'));
    if (blocks.length !== pairs) fails.push(`${blocks.length} blocks, config says ${pairs}`);
    if (blocks.length < 4 || blocks.length > 6) fails.push(`${blocks.length} blocks outside [4, 6]`);
    blocks.forEach((bl, i) => {
      const L = `block ${i + 1}`;
      const refs = [...bl.querySelectorAll('[data-lcs-referent]')];
      if (refs.length !== 2) { fails.push(`${L}: ${refs.length} referents`); return; }
      const byT = {};
      refs.forEach((rf) => {
        const t = rf.dataset.lcsReferent, key = rf.dataset.lcsKey, nm = (rf.dataset.lcsNames || '').split('|').filter(Boolean);
        byT[t] = rf;
        const plate = rf.querySelector('[data-lcs-plate]');
        if (!plate || !plate.textContent.trim()) fails.push(`${L}: referent ${t} has no plate`);
        else { nm.forEach((n) => { if (!hasWord(plate.textContent, n)) fails.push(`${L}: plate "${plate.textContent.trim()}" lacks "${n}"`); }); fontOk(plate, L); if (plate.scrollWidth > plate.clientWidth + 0.6) fails.push(`${L}: plate overflows`); }
        if (!rf.querySelector('[data-lcs-target]')) fails.push(`${L}: referent ${t} has no target dot`);
        checkPics(rf, key, `${L} referent ${t}`, G2);
        checkNames(nm, key, `${L} referent ${t}`);
      });
      if (!byT.a || !byT.b) fails.push(`${L}: referents are not a + b`);
      if (byT.a && byT.b && byT.a.dataset.lcsKey === byT.b.dataset.lcsKey) fails.push(`${L}: both referents share the key ${byT.a.dataset.lcsKey} (no single solution)`);
      const intro = bl.querySelector('[data-lcs-intro]');
      if (!intro) fails.push(`${L}: no intro`);
      else { refs.forEach((rf) => (rf.dataset.lcsNames || '').split('|').filter(Boolean).forEach((n) => { if (!hasWord(intro.textContent, n)) fails.push(`${L}: the intro lacks "${n}"`); })); oneLine(intro, L + ' intro', 26); fontOk(intro, L); }
      const sents = [...bl.querySelectorAll('[data-lcs-anaphor]')];
      if (sents.length !== 2) fails.push(`${L}: ${sents.length} sentences`);
      const prons = sents.map((s) => (s.querySelector('[data-lcs-pronoun]') || {}).dataset ? s.querySelector('[data-lcs-pronoun]').dataset.lcsPronoun : '');
      if (prons.length === 2 && fold(prons[0]) === fold(prons[1])) fails.push(`${L}: both sentences open with "${prons[0]}" (no single solution)`);
      const refT = sents.map((s) => s.dataset.lcsRef);
      if (new Set(refT).size !== sents.length || refT.some((t) => !byT[t])) fails.push(`${L}: sentence refs ${refT.join('/')} do not cover a + b once each`);
      sents.forEach((s, k) => {
        const tile = s.querySelector('[data-lcs-pronoun]');
        if (!tile) { fails.push(`${L} s${k + 1}: no pronoun tile`); return; }
        if (tile.textContent.trim() !== tile.dataset.lcsPronoun) fails.push(`${L} s${k + 1}: the tile prints "${tile.textContent.trim()}" not its literal`);
        if (!s.querySelector('[data-lcs-anchor]')) fails.push(`${L} s${k + 1}: no anchor dot`);
        const rest = s.textContent.replace(tile.textContent, '');
        refs.forEach((rf) => (rf.dataset.lcsNames || '').split('|').filter(Boolean).forEach((n) => { if (hasWord(rest, n)) fails.push(`${L} s${k + 1}: the name "${n}" sits in the sentence`); }));
        if (s.scrollWidth > s.clientWidth + 0.6) fails.push(`${L} s${k + 1}: overflows`);
        fontOk(tile, L);
      });
      if (bl.querySelector('svg line, svg path')) fails.push(`${L}: a line is pre-drawn`);
      const zone = bl.querySelector('[data-lcs-zone]');
      if (!zone || zone.children.length || zone.textContent.trim()) fails.push(`${L}: the line zone is not empty`);
      else if (r(zone).width < 60) fails.push(`${L}: line zone ${Math.round(r(zone).width)} px < 60`);
      if (r(bl).height < 110) fails.push(`${L}: block ${r(bl).height.toFixed(1)} < 110`);
    });
  } else if (layout === 'possessive') {
    const rows = +root.dataset.lcsRows, nChips = +root.dataset.lcsChips, mixFloor = +(root.dataset.lcsMixfloor || 1), pc = root.dataset.lcsPossClass;
    const lanes = laneGrid('[data-lcs-item]', 'lane', (ln) => contentBox(ln, 'p, img, [data-lcs-chiprow]'));
    if (lanes.length !== rows) fails.push(`${lanes.length} lanes, config says ${rows}`);
    if (lanes.length < 6 || lanes.length > 12) fails.push(`${lanes.length} lanes outside [6, 12]`);
    let firstOrder = null;
    const hist = {}, thingSrcs = new Set(), keys = new Set();
    lanes.forEach((ln, i) => {
      const L = `lane ${i + 1}`;
      const key = ln.dataset.lcsOwner, nm = (ln.dataset.lcsNames || '').split('|').filter(Boolean);
      const chips = [...ln.querySelectorAll('[data-lcs-chip]')];
      if (chips.length !== nChips) fails.push(`${L}: ${chips.length} chips, config says ${nChips}`);
      const correct = chips.filter((c) => c.dataset.lcsCorrect);
      if (correct.length !== 1) fails.push(`${L}: ${correct.length} correct chips`);
      if (correct[0] && correct[0].dataset.lcsChip !== ln.dataset.lcsChipKey) fails.push(`${L}: the correct chip ${correct[0].dataset.lcsChip} != chip-key ${ln.dataset.lcsChipKey}`);
      const labels = chips.map((c) => c.dataset.lcsLabel);
      const order = labels.join('|');
      if (firstOrder == null) firstOrder = order; else if (order !== firstOrder) fails.push(`${L}: chip order differs (position leak)`);
      if (new Set(chips.map((c) => c.getAttribute('style'))).size !== 1) fails.push(`${L}: chips styled differently`);
      chips.forEach((c) => { const b = r(c); if (b.height < G1 - 0.6) fails.push(`${L}: a chip ${b.height.toFixed(1)} high < ${G1}`); if (c.textContent.trim() !== c.dataset.lcsLabel) fails.push(`${L}: a chip prints "${c.textContent.trim()}" not its label`); if (c.scrollWidth > c.clientWidth + 0.6) fails.push(`${L}: the chip "${c.dataset.lcsLabel}" overflows its pill`); });
      const p = ln.querySelector('[data-lcs-frametext]');
      if (!p) { fails.push(`${L}: no frame text`); return; }
      const boxes = [...p.querySelectorAll('[data-lcs-gapbox]')];
      if (boxes.length !== 1) fails.push(`${L}: ${boxes.length} gap boxes`);
      boxes.forEach((bx) => { if (bx.textContent.trim() || bx.children.length) fails.push(`${L}: the gap box is pre-written`); if (r(bx).width < 60 || r(bx).height < 22) fails.push(`${L}: gap box too small`); });
      const text = p.textContent;
      labels.forEach((l) => { if (hasWord(text, l)) fails.push(`${L}: the chip "${l}" is printed in the frame`); });
      nm.forEach((n) => { if (!hasWord(text, n)) fails.push(`${L}: the frame lacks the name "${n}"`); });
      if (pc === 'ownerEnding') {
        if (picsWant(key) !== 1) fails.push(`${L}: an ownerEnding (de) lane with a pair of owners`);
        if (nChips !== 4) fails.push(`${L}: ownerEnding needs 4 chips`);
        const before = (boxes[0] && boxes[0].previousSibling && boxes[0].previousSibling.textContent || '').trim().split(/\s+/).pop();
        if (before && DE_ARTICLES.includes(fold(before))) fails.push(`${L}: an article "${before}" sits before the box (the ending is the answer)`);
      }
      oneLine(p, L + ' frame', 28); fontOk(p, L);
      const owners = ln.querySelector('[data-lcs-portraits]');
      checkPics(owners || ln, key, L, G2);
      checkNames(nm, key, L);
      const thing = ln.querySelector('img[data-lcs-thing-pic]');
      if (!thing) fails.push(`${L}: no thing picture`);
      else { if (!thing.complete || thing.naturalWidth === 0) fails.push(`${L}: broken thing picture`); if (r(thing).width < G2 - 0.6) fails.push(`${L}: thing ${r(thing).width.toFixed(1)} px < ${G2}`); if (thingSrcs.has(thing.src)) fails.push(`${L}: thing "${thing.dataset.lcsThingPic}" twice on the page`); thingSrcs.add(thing.src); }
      hist[ln.dataset.lcsChipKey] = (hist[ln.dataset.lcsChipKey] || 0) + 1;
      keys.add(key);
    });
    for (let i = 0; i < nChips; i++) if ((hist[i] || 0) < mixFloor) fails.push(`chip ${i} appears ${hist[i] || 0} < mixFloor ${mixFloor}`);
    if (Object.keys(hist).length < 2) fails.push('only one chip is ever correct (no discrimination)');
    if (keys.size < 2) fails.push('one owner key only');
  } else if (layout === 'sort') {
    const nCards = +root.dataset.lcsCards, nChips = +root.dataset.lcsChips;
    const sortRoot = root.querySelector('[data-lcs-layout="sort"][data-lcs-binlayout]');
    if (!sortRoot) { fails.push('no sort root'); return fails; }
    const shelf = sortRoot.querySelector('[data-lcs-shelf]');
    const cards = [...(shelf ? shelf.querySelectorAll('[data-lcs-sortword]') : [])];
    if (!shelf) fails.push('no shelf');
    if (cards.length !== nCards) fails.push(`${cards.length} cards, config says ${nCards}`);
    if (cards.length < 6 || cards.length > 12) fails.push(`${cards.length} cards outside [6, 12]`);
    const bins = [...sortRoot.querySelectorAll('[data-lcs-sortbin]')];
    if (bins.length < 2) fails.push(`${bins.length} bins < 2`);
    if (bins.length !== nChips) fails.push(`${bins.length} bins, ${nChips} chips`);
    const heads = bins.map((b) => (b.querySelector('[data-lcs-sorthead]') || {}).textContent || '').map((s) => s.trim());
    bins.forEach((b, i) => { if (b.dataset.lcsSortbin !== String(i)) fails.push(`bin ${i}: stamped ${b.dataset.lcsSortbin} (bins must run 0..n-1 in the chip order)`); const h = b.querySelector('[data-lcs-sorthead]'); if (!h || !h.textContent.trim()) fails.push(`bin ${i}: no head`); else fontOk(h, `bin ${i} head`); });
    if (new Set(heads.map(fold)).size !== heads.length) fails.push('two bins share a head');
    if ((sortRoot.dataset.lcsBinlayout === 'grid') !== (bins.length === 4)) fails.push(`binLayout ${sortRoot.dataset.lcsBinlayout} with ${bins.length} bins (grid iff 4)`);
    const loads = new Array(bins.length).fill(0), keys = new Set();
    cards.forEach((c, i) => {
      const L = `card ${i + 1}`;
      const key = c.dataset.lcsItemKey, bin = +c.dataset.lcsKey, nm = (c.dataset.lcsNames || '').split('|').filter(Boolean);
      if (!(bin >= 0 && bin < bins.length)) fails.push(`${L}: bin ${c.dataset.lcsKey} out of range`);
      const cap = c.querySelector('[data-lcs-caption]');
      if (!cap || cap.textContent.trim() !== c.dataset.lcsSortword || !cap.textContent.trim()) fails.push(`${L}: caption "${cap && cap.textContent.trim()}" != sortword "${c.dataset.lcsSortword}"`);
      if (cap) { if (cap.scrollHeight > 37) fails.push(`${L}: caption ${cap.scrollHeight} px high > 37`); if (cap.scrollWidth > cap.clientWidth + 0.6) fails.push(`${L}: caption overflows`); fontOk(cap, L); }
      if (heads.some((h) => fold(h) === fold(c.dataset.lcsSortword))) fails.push(`${L}: the caption equals a bin head`);
      nm.forEach((n) => { if (!hasWord(c.dataset.lcsSortword, n)) fails.push(`${L}: caption lacks "${n}"`); });
      const imgs = checkPics(c, key, L, G1);
      checkNames(nm, key, L);
      if (/^obj:/.test(key) && nm.length) fails.push(`${L}: an object card carries names`);
      if (r(c).bottom > r(shelf).bottom + 0.6 || r(c).right > r(shelf).right + 0.6) fails.push(`${L}: the card spills out of the shelf`);
      if (bin >= 0 && bin < bins.length) loads[bin] += imgs.length > 1 ? 2 : 1;
      keys.add(key);
    });
    if (keys.size < 2) fails.push('one card key only');
    if (new Set(cards.map((c) => c.dataset.lcsKey)).size < 2) fails.push('every card goes to one bin (no discrimination)');
    bins.forEach((b, i) => {
      const L = `bin ${i}`;
      const lines = +b.dataset.lcsLines, gapY = +b.dataset.lcsGapy;
      if (lines < loads[i]) fails.push(`${L}: ${lines} lines for a load of ${loads[i]}`);
      if (gapY < 34) fails.push(`${L}: gapY ${gapY} < 34`);
      const box = b.querySelector('.ws-bin');
      if (!box) { fails.push(`${L}: no bin box`); return; }
      const bb = r(box);
      if (bb.width < 175) fails.push(`${L}: bin ${Math.round(bb.width)} px wide < 175 (a G1 hand needs it)`);
      const svgLines = [...box.querySelectorAll('svg line')];
      if (svgLines.length !== lines) fails.push(`${L}: ${svgLines.length} drawn lines, stamped ${lines}`);
      const last = svgLines.length ? Math.max(...svgLines.map((l) => r(l).bottom)) : bb.top;
      if (bb.bottom - last > 64) fails.push(`${L}: the last line sits ${Math.round(bb.bottom - last)} px above the bin bottom (> 64: the lines do not fill the bin)`);
      if ([...box.querySelectorAll('img, [data-lcs-sortword]')].length || box.textContent.trim()) fails.push(`${L}: a card is pre-placed in the bin`);
    });
    // sparse: the stack (shelf top .. bins bottom) is tall and the slack under it is one line at most
    const stackTop = shelf ? r(shelf).top : rr.top;
    const stackBottom = Math.max(...bins.map((b) => r(b).bottom));
    if (stackBottom - stackTop < 660) fails.push(`stack ${Math.round(stackBottom - stackTop)} px < 660 (sparse: the bins must fill the page)`);
    if (body.bottom - stackBottom > SLACK_MAX) fails.push(`slack ${Math.round(body.bottom - stackBottom)} px under the bins (> ${SLACK_MAX}: sparse)`);
    if (stackBottom > body.bottom + 0.6) fails.push(`the bins end ${Math.round(stackBottom - body.bottom)} px under the body bottom`);
    if (shelf && r(shelf).top - rr.top > 8) fails.push('the shelf floats under the stage top');
  } else if (layout === 'rewrite') {
    const rows = +root.dataset.lcsRows, glyphH = +root.dataset.lcsGlyphh, w = +root.dataset.lcsW;
    if (document.querySelector('[data-lcs-bank-word], .ws-achip, [data-lcs-bank-banner]')) fails.push('a bank / chip is printed on the rewrite face');
    if (document.querySelector('[data-lcs-starter]')) fails.push('a starter is printed (the row must be empty)');
    const lanes = laneGrid('[data-lcs-frame]', 'row', (ln) => contentBox(ln, 'p, img, svg'));
    if (lanes.length !== rows) fails.push(`${lanes.length} rows, config says ${rows}`);
    if (lanes.length < 6 || lanes.length > 12) fails.push(`${lanes.length} rows outside [6, 12]`);
    const nums = new Set(), answers = new Set();
    lanes.forEach((ln, i) => {
      const L = `row ${i + 1}`;
      const key = ln.dataset.lcsKey, answer = ln.dataset.lcsAnswer || '', nm = (ln.dataset.lcsNames || '').split('|').filter(Boolean);
      const p = ln.querySelector('[data-lcs-sentence]');
      if (!p || !p.textContent.trim()) { fails.push(`${L}: no sentence`); return; }
      const sentence = p.textContent.trim();
      nm.forEach((n) => { if (!hasWord(sentence, n)) fails.push(`${L}: the sentence lacks the name "${n}"`); });
      if (!answer) fails.push(`${L}: no answer stamp`);
      const pron = answer.split(/\s+/)[0];
      if (pron && hasWord(sentence, pron)) fails.push(`${L}: the pronoun "${pron}" is printed in the sentence`);
      if (answer && ln.textContent.includes(answer)) fails.push(`${L}: the answer sentence is printed`);
      const rule = ln.querySelector('[data-lcs-ruling-row]');
      const svg = rule && rule.querySelector('svg[data-lcs-prim="writing-row"]');
      if (!rule || !svg) fails.push(`${L}: no writing row`);
      else {
        if (!rule.hasAttribute('data-lcs-empty') || svg.querySelector('text') || rule.textContent.trim()) fails.push(`${L}: the writing row is not empty`);
        if (svg.querySelectorAll('line').length < 3) fails.push(`${L}: the writing row has ${svg.querySelectorAll('line').length} rules (< 3)`);
        const sb = r(svg);
        const needPx = [...answer].length * 0.75 * glyphH + 16;
        if (sb.width < needPx - 0.6) fails.push(`${L}: writing row ${Math.round(sb.width)} px < need ${Math.round(needPx)} for "${answer}"`);
        if (sb.width < w - 0.6) fails.push(`${L}: writing row ${Math.round(sb.width)} px < ${w}`);
        if (sb.height < glyphH + 20) fails.push(`${L}: writing row ${Math.round(sb.height)} px low for glyphH ${glyphH}`);
        if (!(glyphH >= 24)) fails.push(`${L}: glyphH ${glyphH} < the G2 floor 24`);
      }
      const num = ln.dataset.lcsNum;
      if ((num === 'pl') !== (picsWant(key) === 2)) fails.push(`${L}: num ${num} does not match key ${key}`);
      nums.add(num); answers.add(fold(pron));
      checkPics(ln, key, L, G2);
      checkNames(nm, key, L);
      oneLine(p, L + ' sentence', 26); fontOk(p, L);
    });
    if (nums.size < 2) fails.push('rows carry one number only');
    if (answers.size < 2) fails.push('only one pronoun is ever the answer (no discrimination)');
  } else fails.push(`layout "${layout}" has no verify branch`);
  if (!root.querySelectorAll('[data-ws-content]').length) fails.push('non-vacuity: no [data-ws-content] lane');
  return fails;
}

/* ------------------------------------------------------------------ verify (page side; self-contained) ------------------------------------------------------------------ */

function VERIFY_BASE() {
  const fails = [];
  const root = document.querySelector('[data-lcs-pron]');
  if (!root) return ['no pronouns root'];
  if (root.dataset.lcsLayout) return [`layout "${root.dataset.lcsLayout}" reached the base verify (dispatch)`];
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
  possessiveClass, possForm, faceDeal, dealFace, FACES,

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

  /**
   * The five faces (design §3; tools/b4var-rows/pronouns.js) on the additive `layout`
   * knob — dispatched before the base path touches the RNG:
   *   replace     a dashed bank of the initial forms + 8 two-line lanes: write the pronoun in the gap
   *   anaphora    5 blocks: two named portraits, an intro, two boxed-pronoun sentences: draw the line
   *   possessive  8 owner lanes: owner(s) + a pictured thing, "This is Mia. This is ___ ball.": circle
   *   sort        10 name cards on a shelf, one ruled bin per pronoun: write every name under its word
   *   rewrite     8 rows: a printed sentence over a school-line ruling: rewrite it with the pronoun
   * Guards key on the CONFIG (d.bank / d.pairs / d.ruling / d.objects …), never the level;
   * the per-locale CLASS (four / two / objects / the possessive class) comes off the bank's shape.
   */
  _buildFace(bank, d, { locale }, ctx) {
    if (!FACES.includes(d.layout)) throw new Error(`${ID}: unknown layout "${d.layout}" (${FACES.join(' | ')})`);
    if (!ctx || !ctx.rng) throw new Error(`${ID}: no rng in ctx`);
    const loc = (locale || 'en').slice(0, 2);
    const fn = { replace: buildReplace, anaphora: buildAnaphora, possessive: buildPossessive, sort: buildSort, rewrite: buildRewrite }[d.layout];
    return fn(bank, d, loc, ctx.rng);
  },

  /** The base branch re-derives the cards from the stamps; a face root (data-lcs-layout) is handed to VERIFY_FACE. */
  async verify(page) {
    const layout = await page.evaluate(() => { const r = document.querySelector('[data-lcs-pron]'); return r ? (r.dataset.lcsLayout || null) : null; });
    if (layout) return page.evaluate(VERIFY_FACE);
    return page.evaluate(VERIFY_BASE);
  },
};
