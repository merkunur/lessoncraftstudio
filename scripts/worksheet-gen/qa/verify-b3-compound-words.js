#!/usr/bin/env node
/**
 * verify-b3-compound-words.js — the G2-316 `compound-words` gate (design file
 * docs/worksheet-gen/b3-designs/G2-316-compound-words.md §5; brief deliverable 4).
 *
 *   node scripts/worksheet-gen/qa/verify-b3-compound-words.js [--quick]
 *
 * 1. BANK — every locale block of data/b3/compound-words.js against the §5
 *    validator rules (the `tools/validate-b3-draft.js` compound-words block,
 *    folded in here and exported as `validateBank`):
 *    (1) whole.word === casing(aStem||a.word) + link + (b.word | affix minus
 *        '-'), case-folded after letter 1 (de keeps the capital; SonnenBlume
 *        fails); (2) every vocabKey has a colour picture (cache/manifest.json
 *        bw:false, a locale entry, not B2_EXCLUDE'd — lib/b3-picture-index.js
 *        `candidates`), a `pic` pin is one of those candidates, picOpened:true,
 *        AND every picture that MAY render (the pin, or every candidate when
 *        unpinned) is in OPENED as honest for its key — the record of the
 *        pictures the builder opened, so a picture that merely RESOLVES
 *        (pelican = a stork) fails: the human open IS the gate; (3) link ∈
 *        links, an affix starts with '-'; (4) each unit: every part key
 *        distinct within the set (2N for N items), no opaque item inside a
 *        base set, < 8 items = REPORTED refused (the exemplar set must reach 8,
 *        and 10 for d3 — else reported); (5) hubs: >= 2 with >= 4 satellites
 *        else F5 reported (lanes:3 / refused), every satellite a pool /
 *        onePart / opaque whole sharing hub.word on `side`; (6) foils pictured,
 *        never an item's whole, and a foil that DOES split into two pictured
 *        words must declare that split in looksLike; looksLike joins to the
 *        foil; (7) sizePairs >= 8 where shape is alterati, small/big start with
 *        the base stem; (8) strings: title <= 70 without the worksheet word,
 *        instruction <= 150 with an end mark, en === the spec's i18n.en; (9)
 *        refuse.F1 forced for en it pt, refuse.F3 forced for fr it pt; (10)
 *        crossWords pairs are two pool parts whose join is NOT a pool whole,
 *        and every measured cross hit (a_i + link + b_j a pictured word) of
 *        the exemplar set is listed there.
 *    The gate MAY read the vocab / manifest / letter-strokes; the spec never does.
 * 2. RENDER — through the REAL pipeline (render/render-instance.js, file://
 *    fonts): d1/d2/d3 en, plus d1/d2/d3 under a 70-char de title + 150-char
 *    instruction and a 70-char fi title (the README 722 floor and below).
 *    Asserts verify() empty, qa/lints.js clean, the G2 floors ITSELF (every
 *    picture >= 36 and === config, every lane >= 50 high with glyphH >= 24,
 *    every part word >= 18 px, rows === config, every row inside the body and
 *    above the footer, rows of one page equal in height, the lane <= laneW and
 *    >= the writable need, the platform's own school-hand model
 *    (data/tracing/letter-strokes.js textGlyphs × the lane scale × 1.5) fits
 *    every stamped whole inside the lane), and the NODE cross-check: every
 *    stamped row is a bank item of the stamped set VERBATIM (keys, words,
 *    link, whole, cut) and every rendered picture is a candidate + OPENED.
 * 3. SWEEP — 20 seeds × d1/d2/d3 (build only): rows === config, no part twice,
 *    every whole <= maxLetters, linked >= minLinked, d1 bank never in row
 *    order, >= 2 distinct row sets per difficulty (skipped by --quick).
 * 4. POISON — each must FAIL for its OWN reason (a fail with no matching
 *    message = WRONG REASON; no fail = SILENT; either exits 1). The correct EN
 *    bank is the control. Design §5 poisons:
 *      P1   {Sonne, '', Blume → Sonnenblume}         → rule 1 (link) + the spec refuses
 *      P1b  {Sonne, n, Blume → SonnenBlume}          → rule 1 (casing)
 *      P2   a.vocabKey without a picture              → rule 2
 *      P2b  a pin in `animals bw`                     → rule 2 (B&W / not a candidate) + the spec refuses
 *      P2c  a pin opened as NOT honest (beach/chair)  → rule 2 (OPENED)
 *      P2d  picOpened:false                           → rule 2 + the spec refuses
 *      P3   link 's' in en                            → rule 3 + the spec refuses
 *      P3b  affix without '-'                         → rule 3
 *      P4   two -fish in set A                        → rule 4
 *      PU   an opaque item inside set A               → rule 4
 *      PX   an exemplar set of 7                      → rule 4 + the spec refuses
 *      P5   satellite `sunflower` under hub fish      → rule 5
 *      P6   foil `sunflower`                          → rule 6 (a pool whole)
 *      P6b  foil `pancake` (out of the pool) w/o looksLike → rule 6 (an undeclared two-picture split)
 *      P8   the worksheet word in the title           → rule 8
 *      P8b  a 151-char instruction                    → rule 8
 *      P9   refuse.F1 false in en                     → rule 9
 *      P10  crossWords ['star','fish']                → rule 10 (joins to a pool whole)
 *    plus the base's own, from the design's verify() list / gate list:
 *      G1   a row stamped whole `sunflowers`          → verify() + the node cross-check
 *      G2   cupcake + pancake on one page             → verify() (part `cake` twice)
 *      G7   a picture from `animals bw`               → verify()
 *      G8   whole stamped `SunFlower`                 → verify() (a capital inside the join)
 *      GT   the whole printed on its row              → verify()
 *      GI   a 30 px picture                           → verify() + the gate's own floor
 *      GO   a row whose ops read `+ +`                → verify()
 *      GB   the d1 bank in row order                  → verify()
 *      GB2  the d1 bank missing a whole               → verify()
 *      GL   a lane wider than the stamp               → verify()
 */
'use strict';
const path = require('path');
const puppeteer = require('puppeteer');
const { renderInstance } = require('../render/render-instance.js');
const { makeRng, instanceSeed } = require('../lib/rng.js');
const { bankModule } = require('../lib/b3-common.js');
const { excluded, fileUri, vocab } = require('../lib/b2-common.js');
const { candidates, pictureIndex } = require('../lib/b3-picture-index.js');
const letterStrokes = require('../data/tracing/letter-strokes.js');
const tokens = require('../primitives/_tokens.js');
const { wordBank } = require('../templates/components-b2.js');
const { compoundRow } = require('../templates/components-b3.js');

const TYPE = require('../types/g2/G2-316-compound-words.js');
const QUICK = process.argv.includes('--quick');
const OUT = path.join(__dirname, '..', 'out', 'dev');
const BW_MARKER = /\b(BW|SW|BN|NB|ZW|SH|PB|MV|SV)$/i;
const MIN_ICON = tokens.density.G23.minElement;   // 36
const MIN_GLYPH = 24;                             // design §2: glyphH 28 >= 24
const MIN_LANE_H = 50;
const MIN_PART_WORD = 18;
const HAND_MARGIN = 1.5;                          // a G2 hand vs the platform's letterform model
const WORD_RE = /^\p{L}+$/u;
const WORKSHEET_WORD = /worksheet|arbeitsblatt|ficha|fiche|scheda|werkblad|arbetsblad|arbejdsark|arbeidsark|tehtävä/i;
const LINKS = { en: [''], de: ['', 's', 'n', 'en', 'e', 'er', 'es'], nl: ['', 's', 'n', 'en', 'e', 'ne'], sv: ['', 's', 'e', 'a', 'o', 'u'], da: ['', 's', 'e', 'er'], no: ['', 's', 'e', 'er'], fi: ['', 'n'] };
const F1_FORCED = ['en', 'it', 'pt'];
const F3_FORCED = ['fr', 'it', 'pt'];
const SHAPE_BY_LOC = { en: 'compound', de: 'compound', nl: 'compound', sv: 'compound', da: 'compound', no: 'compound', fi: 'compound', es: 'family', fr: 'family', it: 'alterati', pt: 'alterati' };

/**
 * The pictures OPENED 2026-09-14 (contact sheets out/dev/G2-316-pictures-sheet.png, -zoom.png,
 * -sheet-2.png, -zoom-2.png, -sheet-3.png — EVERY colour candidate of every key the en bank names)
 * and the vocab key each honestly shows. A picture outside this record FAILS — the human open is
 * the gate. Refused (opened, wrong): beach/chair = a deckchair · classroom/shelf = shelves on a
 * grey disc · shapes/star = a pale outline · easter/basket = a basket of EGGS · kitchen tools/pan =
 * a lidded POT · thanksgivinng/apple = a basket of apples · tree/apple = an apple TREE ·
 * easter/egg = a painted Easter egg · every `pelican` = a STORK · thanksgivinng/harvest = a wheat
 * sheaf · easter/flower = a yellow daisy that reads as a sunflower beside the sun (honest as
 * `flower`, refused for THIS type's cue).
 */
const OPENED = {
  'At the Supermarket/water': ['water'], 'beach/water': ['water'], 'camping/water': ['water'],
  'At the Supermarket/melon': ['melon'], 'breakfast/melon': ['melon'],
  '4th of July/watermelon': ['watermelon'], 'fruits/watermelon': ['watermelon'], 'summer/watermelon': ['watermelon'],
  'body parts/tooth': ['tooth'], 'around the house/brush': ['brush'],
  'At the Supermarket/toothbrush': ['toothbrush'], 'around the house/toothbrush': ['toothbrush'],
  'body parts/hand': ['hand'], 'At the Supermarket/bag': ['bag'], 'accessories/handbag': ['handbag'],
  'At the Supermarket/basket': ['basket'], 'easter/basket': [],
  'toys/ball': ['ball'], 'activities/basketball': ['basketball'],
  'body parts/arm': ['arm'], 'around the house/chair': ['chair'], 'beach/chair': [], 'classroom/chair': ['chair'], 'furniture/chair': ['chair'],
  'around the house/armchair': ['armchair'], 'furniture/armchair': ['armchair'],
  'classroom/book': ['book'], 'classroom/shelf': [], 'furniture/shelf': ['shelf'], 'around the house/bookshelf': ['bookshelf'],
  'christmas/star': ['star'], 'shapes/star': [],
  'At the Supermarket/fish': ['fish'], 'animals/fish': ['fish'], 'beach/fish': ['fish'], 'camping/fish': ['fish'], 'ocean life/fish': ['fish'], 'pets/fish': ['fish'],
  'beach/starfish': ['starfish'], 'ocean life/starfish': ['starfish'], 'summer/starfish': ['starfish'],
  'spring/rain': ['rain'], 'clothing/coat': ['coat'], 'winter/coat': ['coat'],
  'clothing/raincoat': ['raincoat'], 'spring/raincoat': ['raincoat'], 'weather/raincoat': ['raincoat'],
  'Things That Fly/bird': ['bird'], 'spring/bird': ['bird'], 'miscellaneous/house': ['house'], 'spring/birdhouse': ['birdhouse'],
  'space/earth': ['earth'], 'insects and bugs/worm': ['worm'], 'spring/worm': ['worm'], 'forest creatures/earthworm': ['earthworm'],
  'At the Supermarket/sauce': ['sauce'], 'around the house/pan': ['pan'], 'kitchen tools/pan': [], 'kitchen tools/saucepan': ['saucepan'],
  'beach/sun': ['sun'], 'spring/sun': ['sun'], 'weather/sun': ['sun'],
  'easter/flower': [], 'spring/flower': ['flower'], 'summer/flower': ['flower'], 'flowers/sunflower': ['sunflower'],
  'At the Supermarket/cheese': ['cheese'], 'breakfast/cheese': ['cheese'],
  '4th of July/cake': ['cake'], 'At the Supermarket/cake': ['cake'], 'bakery/cake': ['cake'], 'desserts and sweets/cake': ['cake'], 'bakery/cheesecake': ['cheesecake'],
  'christmas/angel': ['angel'], 'ocean life/angelfish': ['angelfish'], 'body parts/foot': ['foot'], 'activities/football': ['football'],
  'around the house/cup': ['cup'], 'kitchen tools/cup': ['cup'], 'bakery/cupcake': ['cupcake'], 'desserts and sweets/cupcake': ['cupcake'],
  'breakfast/pancake': ['pancake'], 'desserts and sweets/pancake': ['pancake'],
  'colors/blue': ['blue'], 'christmas/bell': ['bell'], 'flowers/bluebell': ['bluebell'],
  'At the Supermarket/butter': ['butter'], 'breakfast/butter': ['butter'], 'flowers/buttercup': ['buttercup'],
  'At the Supermarket/corn': ['corn'], 'thanksgivinng/corn': ['corn'], 'vegetables/corn': ['corn'], 'flowers/cornflower': ['cornflower'],
  // sheet 2 — onePart / hub / foil pictures
  'around the house/key': ['key'], 'summer/sand': ['sand'], 'body parts/neck': ['neck'], 'birds 2/crow': ['crow'], 'miscellaneous/crow': ['crow'],
  'around the house/pot': ['pot'], 'kitchen tools/pot': ['pot'],
  'At the Supermarket/apple': ['apple'], 'breakfast/apple': ['apple'], 'fruits/apple': ['apple'], 'thanksgivinng/apple': [], 'tree/apple': [],
  'At the Supermarket/egg': ['egg'], 'easter/egg': [],
  'easter/rainbow': ['rainbow'], 'spring/rainbow': ['rainbow'], 'summer/rainbow': ['rainbow'], 'weather/rainbow': ['rainbow'], 'weather/raindrop': ['raindrop'],
  'accessories/sunglasses': ['sunglasses'], 'beach/sunglasses': ['sunglasses'], 'summer/sunglasses': ['sunglasses'], 'weather/sunglasses': ['sunglasses'], 'beach/sunscreen': ['sunscreen'],
  'music/keyboard': ['keyboard'], 'around the house/toothpaste': ['toothpaste'],
  'beach/jellyfish': ['jellyfish'], 'ocean life/jellyfish': ['jellyfish'], 'summer/jellyfish': ['jellyfish'],
  'ocean life/clownfish': ['clownfish'], 'ocean life/pufferfish': ['pufferfish'], 'pets/goldfish': ['goldfish'],
  'At the Supermarket/popcorn': ['popcorn'], 'beach/lighthouse': ['lighthouse'], 'beach/sandcastle': ['sandcastle'], 'summer/sandcastle': ['sandcastle'],
  'miscellaneous/scarecrow': ['scarecrow'], 'thanksgivinng/scarecrow': ['scarecrow'], 'hospital/wheelchair': ['wheelchair'], 'accessories/necklace': ['necklace'],
  'kitchen tools/teapot': ['teapot'], 'classroom/notebook': ['notebook'],
  'Things That Fly/butterfly': ['butterfly'], 'easter/butterfly': ['butterfly'], 'forest creatures/butterfly': ['butterfly'], 'insects and bugs/butterfly': ['butterfly'], 'spring/butterfly': ['butterfly'], 'summer/butterfly': ['butterfly'],
  'At the Supermarket/pineapple': ['pineapple'], 'fruits/pineapple': ['pineapple'], 'summer/pineapple': ['pineapple'], 'vegetables/eggplant': ['eggplant'],
  'around the house/carpet': ['carpet'], 'pets/hamster': ['hamster'],
  'Things That Fly/pelican': [], 'beach/pelican': [], 'birds/pelican': [], 'birds 2/pelican': [],
  'At the Supermarket/pumpkin': ['pumpkin'], 'thanksgivinng/pumpkin': ['pumpkin'], 'vegetables/pumpkin': ['pumpkin'],
  'At the Supermarket/carrot': ['carrot'], 'easter/carrot': ['carrot'], 'vegetables/carrot': ['carrot'],
  'around the house/kitchen': ['kitchen'], 'around the house/cabinet': ['cabinet'], 'classroom/cabinet': ['cabinet'], 'furniture/cabinet': ['cabinet'], 'thanksgivinng/harvest': [],
  // sheet 3 — the added foils
  'At the Supermarket/mushroom': ['mushroom'], 'vegetables/mushroom': ['mushroom'],
  'animals/penguin': ['penguin'], 'birds/penguin': ['penguin'], 'birds 2/penguin': ['penguin'], 'winter/penguin': ['penguin'],
  'animals/donkey': ['donkey'], 'farm animals/donkey': ['donkey'], 'At the Supermarket/potato': ['potato'], 'vegetables/potato': ['potato'],
};

let assertions = 0;
const fails = [];
function ok(cond, msg) { assertions++; if (!cond) fails.push(msg); return !!cond; }

/* ------------------------------------------------------------------ bank */
function foldAfterFirst(s) { return s.charAt(0) + s.slice(1).toLowerCase(); }
function expectedWhole(it, casing) {
  const stem = it.aStem || (it.a && it.a.word) || '';
  const tail = it.b && it.b.affix != null ? String(it.b.affix).replace(/^-/, '') : ((it.b && it.b.word) || '');
  const raw = stem + (it.link || '') + tail;
  return (casing === 'keep-first' ? raw.charAt(0) : raw.charAt(0).toLowerCase()) + raw.slice(1).toLowerCase();
}
/** Pictured singular words of a locale (the vocab + the colour index): lowercased word → keys. */
let _picturedWords = new Map();
function picturedWords(loc) {
  if (_picturedWords.has(loc)) return _picturedWords.get(loc);
  const v = vocab();
  const m = new Map();
  for (const key of pictureIndex().keys()) {
    if (excluded(key, loc)) continue;
    const e = v[key] && v[key][loc];
    if (!e || !e[0]) continue;
    const w = String(e[0]).toLocaleLowerCase(loc);
    if (!WORD_RE.test(w)) continue;
    if (!m.has(w)) m.set(w, []);
    m.get(w).push(key);
  }
  _picturedWords.set(loc, m);
  return m;
}
/** The two pictured words a lowercased word splits into (a + link + b, both >= 3 letters), or null. */
function pictureSplit(word, loc, links) {
  const words = picturedWords(loc);
  const w = String(word).toLocaleLowerCase(loc);
  for (const [a] of words) {
    if ([...a].length < 3 || a === w || !w.startsWith(a)) continue;
    for (const link of links) {
      const rest = w.slice(a.length);
      if (!rest.startsWith(link)) continue;
      const b = rest.slice(link.length);
      if ([...b].length >= 3 && b !== w && words.has(b)) return { a, link, b };
    }
  }
  return null;
}

function validateBank(bank, loc, opts = {}) {
  const f = [];
  const notes = [];
  const push = (m) => f.push(`[${loc}] ${m}`);
  const lower = (s) => String(s).toLocaleLowerCase(loc);
  const opened = opts.opened || OPENED;
  if (!bank || typeof bank !== 'object') return { fails: [`[${loc}] no bank`], notes, counts: {} };
  if (SHAPE_BY_LOC[loc] && bank.shape !== SHAPE_BY_LOC[loc]) push(`shape "${bank.shape}" ≠ ${SHAPE_BY_LOC[loc]}`);
  if (!['keep-first', 'lower'].includes(bank.casing)) push(`casing "${bank.casing}"`);
  else if ((loc === 'de') !== (bank.casing === 'keep-first')) push(`casing "${bank.casing}" in ${loc}`);
  const links = Array.isArray(bank.links) ? bank.links : [];
  if (!links.includes('')) push('links must include \'\'');
  if (LINKS[loc]) for (const l of links) if (!LINKS[loc].includes(l)) push(`link "${l}" is not a ${loc} joint (${JSON.stringify(LINKS[loc])})`);
  if (!(bank.linkBoxW === 36 || bank.linkBoxW === 90)) push(`linkBoxW ${bank.linkBoxW}`);
  const units = Array.isArray(bank.units) ? bank.units : [];
  if (!units.length) push('no units');
  const unitIds = new Set(units.map((u) => u.id));
  if (!unitIds.has(bank.exemplar)) push(`exemplar "${bank.exemplar}" is not a unit id`);
  const opaqueList = Array.isArray(bank.opaque) ? bank.opaque : [];
  const onePart = Array.isArray(bank.onePart) ? bank.onePart : [];
  const allItems = [];
  units.forEach((u) => (u.items || []).forEach((it) => allItems.push({ it, where: `set ${u.id}` })));
  opaqueList.forEach((it) => allItems.push({ it, where: 'opaque' }));
  onePart.forEach((it) => allItems.push({ it, where: 'onePart' }));
  const wholeWords = new Map();
  const wholeKeys = new Set();
  const partWordsByKey = new Map();

  // picture rule 2 for one part-or-whole reference
  const checkPic = (p, tag, mustPicture) => {
    if (!p) return;
    const key = p.vocabKey;
    if (!key) { if (mustPicture) push(tag('vocabKey missing')); return; }
    const c = candidates(key, loc);
    if (!c.length) { push(tag(`"${key}" has no colour picture in ${loc} (uncached, BW-only or B2_EXCLUDE'd)`)); return; }
    let may = c;
    if (p.pic) {
      if (BW_MARKER.test(String(p.pic.theme))) push(tag(`pin ${p.pic.theme}/${p.pic.noun} is in a B&W dir (localized marker)`));
      const hit = c.find((x) => x.theme === p.pic.theme && x.noun === p.pic.noun);
      if (!hit) { push(tag(`pin ${p.pic.theme}/${p.pic.noun} is not a colour-index candidate for "${key}"`)); return; }
      try { fileUri(p.pic.theme, p.pic.noun); } catch (e) { push(tag(`pin ${p.pic.theme}/${p.pic.noun} does not resolve: ${e.message}`)); }
      may = [hit];
    }
    for (const x of may) {
      const ref = `${x.theme}/${x.noun}`;
      const o = opened[ref];
      if (!o) push(tag(`picture ${ref} was never OPENED by the build (the human open is the gate)`));
      else if (!o.includes(key)) push(tag(`picture ${ref} was opened and is NOT an honest "${key}" (opened as: ${o.join('/') || 'refused'}) — pin an honest candidate`));
    }
  };

  // rules 1, 2, 3 per item
  for (const { it, where } of allItems) {
    const w = it.whole && it.whole.word;
    const tag = (m) => `${where} item "${w}": ${m}`;
    if (!it.a || typeof it.a !== 'object') { push(tag('a missing')); continue; }
    if (!it.whole || !WORD_RE.test(w || '')) { push(tag('whole is not letters')); continue; }
    if (!it.a.vocabKey && where !== 'onePart') push(tag('a.vocabKey is REQUIRED'));
    if (!WORD_RE.test(it.a.word || '')) push(tag(`a.word "${it.a.word}" is not letters`));
    const isChip = it.b && it.b.affix != null;
    if (isChip) {
      if (!/^-\p{L}+$/u.test(String(it.b.affix))) push(tag(`affix "${it.b.affix}" must start with "-"`));
      if (bank.shape === 'compound') push(tag('an affix on a compound-shape item'));
    } else {
      if (!it.b || !WORD_RE.test(it.b.word || '')) push(tag('b.word is not letters'));
      if (bank.shape === 'compound' && where !== 'onePart' && !(it.b && it.b.vocabKey)) push(tag('b.vocabKey is REQUIRED for a compound item'));
    }
    if (where === 'onePart') {
      const pictured = [it.a.vocabKey, it.b && it.b.vocabKey].filter(Boolean).length;
      if (pictured !== 1) push(tag(`a onePart item has ${pictured} pictured parts, want exactly one`));
    }
    if (!links.includes(it.link || '')) push(tag(`link "${it.link}" not in ${JSON.stringify(links)}`));
    if (it.aStem != null && !WORD_RE.test(it.aStem)) push(tag(`aStem "${it.aStem}" is not letters`));
    const exp = expectedWhole(it, bank.casing);
    if (w !== exp) push(tag(`whole ≠ casing(aStem||a) + link + b = "${exp}"`));
    const scale = it.whole.scale == null ? 1 : it.whole.scale;
    if (![1, 0.55, 1.35].includes(scale)) push(tag(`scale ${scale}`));
    if (scale !== 1 && bank.shape !== 'alterati') push(tag('scale ≠ 1 outside the alterati shape'));
    if (bank.shape !== 'compound' && where !== 'onePart' && it.whole.vocabKey) { /* family / alterati wholes may be pictured */ }
    if ((bank.shape === 'compound' || where === 'onePart' || where === 'opaque') && !it.whole.vocabKey) push(tag('whole.vocabKey is REQUIRED'));
    if (it.picOpened !== true) push(tag('picOpened is not true'));
    if (typeof it.opaque !== 'boolean') push(tag('opaque must be boolean'));
    if (where === 'opaque' && !it.opaque) push(tag('in `opaque` but opaque:false'));
    if (where.startsWith('set') && it.opaque) push(tag('an opaque item inside a base set (analysis only: F2/F4)'));
    if (!['a', 'b'].includes(it.hubSide)) push(tag(`hubSide "${it.hubSide}"`));
    checkPic(it.a, (m) => tag(`a: ${m}`), where !== 'onePart');
    if (!isChip) checkPic(it.b, (m) => tag(`b: ${m}`), false);
    if (it.whole.vocabKey) {
      if (!candidates(it.whole.vocabKey, loc).length) push(tag(`whole "${it.whole.vocabKey}" has no colour picture`));
      wholeKeys.add(it.whole.vocabKey);
    }
    const lw = lower(w);
    if (wholeWords.has(lw)) push(tag(`whole appears twice (${wholeWords.get(lw)})`));
    wholeWords.set(lw, where);
    for (const p of [it.a, isChip ? null : it.b]) if (p && p.vocabKey) {
      const prev = partWordsByKey.get(p.vocabKey);
      if (prev && prev !== p.word) push(tag(`key "${p.vocabKey}" spelled "${p.word}" here and "${prev}" elsewhere`));
      partWordsByKey.set(p.vocabKey, p.word);
    }
  }
  // rule 4 — sets
  const setCounts = {};
  for (const u of units) {
    const items = Array.isArray(u.items) ? u.items : [];
    setCounts[u.id] = items.length;
    const seen = new Map();
    for (const it of items) for (const p of [it.a, it.b]) {
      if (!p || !p.vocabKey) continue;
      if (seen.has(p.vocabKey)) push(`set ${u.id}: part "${p.vocabKey}" is in "${seen.get(p.vocabKey)}" and "${it.whole && it.whole.word}" — a set's parts must be distinct`);
      else seen.set(p.vocabKey, it.whole && it.whole.word);
    }
    if (items.length < 8) notes.push(`set ${u.id} REFUSED for the base: ${items.length} items < 8`);
    else if (items.length < 10) notes.push(`set ${u.id}: ${items.length} items — d3 (10 rows) REFUSED on this set`);
  }
  if (unitIds.has(bank.exemplar) && setCounts[bank.exemplar] < 8) push(`exemplar set ${bank.exemplar} has ${setCounts[bank.exemplar]} items < 8 — the base cannot ship in ${loc}`);
  // rule 5 — hubs
  const hubs = Array.isArray(bank.hubs) ? bank.hubs : [];
  let bigHubs = 0;
  for (const h of hubs) {
    const tag = (m) => `hub "${h.hub && h.hub.word}": ${m}`;
    if (!h.hub || !h.hub.vocabKey || !WORD_RE.test(h.hub.word || '')) { push(tag('hub needs {vocabKey, word}')); continue; }
    if (!['a', 'b'].includes(h.side)) push(tag(`side "${h.side}"`));
    if (!candidates(h.hub.vocabKey, loc).length) push(tag('hub has no colour picture'));
    const sats = Array.isArray(h.satellites) ? h.satellites : [];
    const hw = lower(h.hub.word);
    for (const s of sats) {
      const ls = lower(s);
      if (!wholeWords.has(ls)) push(tag(`satellite "${s}" is not a pool / onePart / opaque whole`));
      const shares = h.side === 'a' ? ls.startsWith(hw) : ls.endsWith(hw);
      if (!shares) push(tag(`satellite "${s}" does not ${h.side === 'a' ? 'start' : 'end'} with "${h.hub.word}"`));
      if (ls === hw) push(tag(`satellite "${s}" IS the hub word`));
    }
    if (new Set(sats.map(lower)).size !== sats.length) push(tag('satellites repeat'));
    if (sats.length >= 4) bigHubs++;
  }
  if (bigHubs < 2) notes.push(`F5 in ${loc}: ${bigHubs} hub(s) with >= 4 satellites (needs 2 × 4 — panel rules lanes:3 or refuse.F5)`);
  // rule 6 — foils
  const foils = Array.isArray(bank.foils) ? bank.foils : [];
  for (const fo of foils) {
    const tag = (m) => `foil "${fo.word}": ${m}`;
    if (!fo.vocabKey || !WORD_RE.test(fo.word || '')) { push(tag('needs {vocabKey, word}')); continue; }
    checkPic(fo, tag, true);
    const lw = lower(fo.word);
    if (wholeWords.has(lw)) push(tag('is a pool whole (a real compound is not a foil)'));
    for (const w of wholeWords.keys()) if (lw !== w && lw.includes(w)) push(tag(`contains the pool whole "${w}"`));
    const split = pictureSplit(fo.word, loc, links);
    const looks = Array.isArray(fo.looksLike) ? fo.looksLike : [];
    if (split && !(looks.length === 2 && lower(looks[0]) === split.a && lower(looks[1]) === split.link + split.b)) push(tag(`splits into two pictured words "${split.a}" + "${split.link}${split.b}" — declare looksLike:['${split.a}','${split.link}${split.b}'] or drop the foil`));
    if (looks.length && lower(looks.join('')) !== lw) push(tag(`looksLike ${JSON.stringify(looks)} does not join to the foil`));
  }
  if (foils.length < 8) notes.push(`F4 in ${loc}: ${foils.length} foils < 8`);
  // rule 7 — sizePairs
  const sizePairs = Array.isArray(bank.sizePairs) ? bank.sizePairs : [];
  if (bank.shape === 'alterati' && sizePairs.length < 8) push(`sizePairs ${sizePairs.length} < 8 for the alterati shape`);
  for (const sp of sizePairs) {
    const tag = (m) => `sizePair "${sp.base && sp.base.word}": ${m}`;
    if (!sp.base || !sp.base.vocabKey || !WORD_RE.test(sp.base.word || '')) { push(tag('base needs {vocabKey, word}')); continue; }
    const stem = lower(sp.base.word).replace(/[aeiou]$/u, '');
    for (const k of ['small', 'big']) if (sp[k] && !lower(sp[k]).startsWith(stem)) push(tag(`${k} "${sp[k]}" does not start with the base stem "${stem}"`));
  }
  // rule 8 — strings
  const s = bank.strings && bank.strings['G2-316'];
  if (!s) push('strings G2-316 missing');
  else {
    if (!s.title || [...s.title].length > 70) push('title > 70 chars');
    if (WORKSHEET_WORD.test(s.title || '')) push('title carries the worksheet word');
    if (!s.instruction || [...s.instruction].length > 150) push('instruction > 150 chars');
    if (s.instruction && !/[.!?…]$/u.test(s.instruction.trim())) push('instruction has no end mark');
    if (loc === 'en' && (s.title !== TYPE.i18n.en.title || s.instruction !== TYPE.i18n.en.instruction)) push('en strings ≠ the spec i18n.en');
  }
  // rule 8 for the faces (Phase 2): every face block obeys the same limits; titles distinct within the family
  const faceTitles = [];
  for (const fid of ['G2-329', 'G2-330', 'G2-331', 'G2-332', 'G2-333']) {
    const fs = bank.strings && bank.strings[fid];
    if (!fs) continue;
    if (!fs.title || [...fs.title].length > 70) push(`strings ${fid}: title > 70 chars`);
    if (WORKSHEET_WORD.test(fs.title || '')) push(`strings ${fid}: title carries the worksheet word`);
    if (!fs.instruction || [...fs.instruction].length > 150) push(`strings ${fid}: instruction > 150 chars`);
    if (fs.instruction && !/[.!?…]$/u.test(fs.instruction.trim())) push(`strings ${fid}: instruction has no end mark`);
    faceTitles.push(fs.title);
  }
  if (s) faceTitles.push(s.title);
  if (new Set(faceTitles).size !== faceTitles.length) push('a title repeats within the family');
  // rule 11 (Phase 2): the panel's F5 lanes ruling is 3 or 4, never anything else
  if (bank.webLanes != null && ![3, 4].includes(bank.webLanes)) push(`webLanes ${bank.webLanes} must be 3 or 4`);
  // rule 9 — forced refusals
  const refuse = bank.refuse || {};
  if (F1_FORCED.includes(loc) && refuse.F1 !== true) push('refuse.F1 must be true in ' + loc + ' (the joint is no decision / has no joint)');
  if (F3_FORCED.includes(loc) && refuse.F3 !== true) push('refuse.F3 must be true in ' + loc);
  // rule 10 — crossWords + the measured cross hits of the exemplar set
  const cross = Array.isArray(bank.crossWords) ? bank.crossWords : [];
  const partWords = new Set([...partWordsByKey.values()].map(lower));
  const crossSet = new Set(cross.map((p) => lower(p.join('|'))));
  for (const p of cross) {
    if (!Array.isArray(p) || p.length !== 2) { push(`crossWords entry ${JSON.stringify(p)} is not a pair`); continue; }
    if (!partWords.has(lower(p[0])) || !partWords.has(lower(p[1]))) push(`crossWords ${p.join('+')}: both must be pool parts`);
    for (const link of links) if (wholeWords.has(lower(p[0] + link + p[1]))) push(`crossWords ${p.join('+')} joins to the pool whole "${p[0] + link + p[1]}"`);
  }
  const ex = units.find((u) => u.id === bank.exemplar);
  const exItems = ex && Array.isArray(ex.items) ? ex.items.filter((it) => it.a && it.b && it.b.word) : [];
  const pw = picturedWords(loc);
  let crossHits = 0;
  for (const i of exItems) for (const j of exItems) {
    if (i === j) continue;
    for (const link of links) {
      const joined = lower(i.a.word + link + j.b.word);
      if (wholeWords.has(joined)) continue;
      if (pw.has(joined) && !crossSet.has(lower(i.a.word + '|' + j.b.word))) { push(`cross hit ${i.a.word}+${link}+${j.b.word} = "${joined}" is a pictured word not listed in crossWords (F3 rule 3)`); crossHits++; }
    }
  }
  return {
    fails: f, notes,
    counts: { sets: setCounts, exemplar: bank.exemplar, items: allItems.length, opaque: opaqueList.length, onePart: onePart.length, hubs: hubs.length, bigHubs, foils: foils.length, cross: cross.length, crossHits },
  };
}

/* ---------------------------------------------------------------- render */
async function renderWith(page, type, { difficulty, baseName, strings, locale, unit }) {
  const out = await renderInstance({ type, theme: null, difficulty, locale: locale || 'en', page, outDir: OUT, baseName, strings, unit: unit || null });
  const m = await page.evaluate(() => {
    const rect = (el) => { const r = el.getBoundingClientRect(); return { left: r.left, right: r.right, top: r.top, bottom: r.bottom, w: r.width, h: r.height }; };
    const root = document.querySelector('[data-lcs-compound]');
    const rows = [...document.querySelectorAll('[data-lcs-compound] [data-lcs-row]')].map((row) => {
      const ds = row.dataset;
      const lane = row.querySelector('[data-lcs-prim="writing-row"]');
      const pics = [...row.querySelectorAll('[data-lcs-cue] img')].map((im) => ({ key: im.dataset.lcsPic, src: decodeURIComponent(im.src), ...rect(im) }));
      const words = [...row.querySelectorAll('[data-lcs-part-word]')].map((e) => ({ text: e.textContent.trim(), px: parseFloat(getComputedStyle(e).fontSize), ...rect(e) }));
      const ops = [...row.querySelectorAll('[data-lcs-op]')].map((o) => o.dataset.lcsOp);
      return { a: ds.lcsA, b: ds.lcsB, aWord: ds.lcsAWord, bWord: ds.lcsBWord, aStem: ds.lcsAStem, link: ds.lcsLink, whole: ds.lcsWhole, cut: +ds.lcsCut, ops,
        lane: lane ? rect(lane) : null, laneH: lane ? +lane.getAttribute('height') : 0, pics, words, badge: !!row.querySelector('.ws-countbadge'), ...rect(row) };
    });
    const bank = document.querySelector('[data-lcs-bank-banner]');
    const pills = bank ? [...bank.querySelectorAll('[data-lcs-bank-word]')].map((e) => ({ word: e.textContent.trim(), ...rect(e) })) : [];
    return { rows, stamp: root ? +root.dataset.lcsRows : -1, set: root ? root.dataset.lcsSet : null, laneW: root ? +root.dataset.lcsLaneW : 0,
      bank: bank ? rect(bank) : null, pills, bankRows: bank ? new Set(pills.map((p) => Math.round(p.top))).size : 0,
      body: rect(document.querySelector('[data-lcs-body]')), foot: document.querySelector('.ws-foot').getBoundingClientRect().top, titleH: rect(document.querySelector('.ws-head')).h };
  });
  return { lints: out.qa.lints, verify: out.qa.verify, m, png: out.pngPath, meta: out.meta };
}

/** The platform's own school-hand width of a word at the lane geometry (letter-strokes textGlyphs × the lane scale). */
function handWidth(word, laneH, glyphH) {
  const LM = letterStrokes.METRICS;
  const scale = Math.min(glyphH / (LM.base - LM.ascender), (laneH - 6) / (LM.desc - LM.ascender));
  try { return letterStrokes.textGlyphs(word).width * scale; } catch (e) { return null; }
}

/** The design's node-side cross-check (tools/gate-compound-words-data.js rules 1, 2, 7 folded in). */
function crossCheck(name, m, bank) {
  const out = [];
  const set = (bank.units || []).find((u) => u.id === m.set);
  if (!set) return [`${name}: stamped set "${m.set}" is not a bank unit`];
  const byWhole = new Map(set.items.map((it) => [it.whole.word, it]));
  const seen = new Set();
  for (const r of m.rows) {
    const it = byWhole.get(r.whole);
    if (!it) { out.push(`${name}: stamped whole "${r.whole}" is not an item of set ${m.set} — not from the bank`); continue; }
    const bKey = it.b.affix != null ? it.b.affix : it.b.vocabKey;
    if (it.a.vocabKey !== r.a || bKey !== r.b || it.a.word !== r.aWord || (it.b.word || '') !== r.bWord || (it.aStem || '') !== r.aStem || (it.link || '') !== r.link) out.push(`${name}: row "${r.whole}" stamps (${r.a},${r.b},${r.aWord},${r.bWord},${r.link}) ≠ the bank item — not verbatim`);
    const cut = [...(it.aStem || it.a.word)].length + [...(it.link || '')].length;
    if (r.cut !== cut) out.push(`${name}: row "${r.whole}" cut ${r.cut} ≠ ${cut}`);
    if (it.opaque) out.push(`${name}: opaque "${r.whole}" on the base page`);
    for (const k of [r.a, r.b]) { if (k.startsWith('-')) continue; if (seen.has(k)) out.push(`${name}: part "${k}" twice on the page`); seen.add(k); }
    for (const p of r.pics) {
      const [theme, file] = p.src.split('/').slice(-2);
      const noun = file.replace(/\.[a-z0-9]+$/i, '').replace(/@\dx$/, '');
      const part = p.key === it.a.vocabKey ? it.a : it.b;
      const cands = candidates(p.key, 'en');
      if (!cands.some((c) => c.theme === theme && c.noun === noun)) out.push(`${name}: picture ${theme}/${noun} is not a colour candidate for "${p.key}"`);
      if (part && part.pic && (part.pic.theme !== theme || part.pic.noun !== noun)) out.push(`${name}: "${p.key}" rendered ${theme}/${noun}, the bank pins ${part.pic.theme}/${part.pic.noun}`);
      const o = OPENED[`${theme}/${noun}`];
      if (!o || !o.includes(p.key)) out.push(`${name}: picture ${theme}/${noun} rendered for "${p.key}" was not opened as honest`);
    }
  }
  return out;
}

function assertRender(name, r, d, bank) {
  const cfg = TYPE.difficulty[d];
  ok(r.verify.length === 0, `${name}: verify() ${JSON.stringify(r.verify)}`);
  ok(r.lints.length === 0, `${name}: lints ${JSON.stringify(r.lints)}`);
  ok(r.m.rows.length === cfg.rows && r.m.stamp === cfg.rows, `${name}: ${r.m.rows.length} rows / stamp ${r.m.stamp} ≠ config ${cfg.rows}`);
  ok(cfg.glyphH >= MIN_GLYPH && cfg.laneH >= MIN_LANE_H && cfg.pic >= MIN_ICON, `${name}: config below the G2 floors (glyphH ${cfg.glyphH} laneH ${cfg.laneH} pic ${cfg.pic})`);
  const need = Math.ceil(cfg.maxLetters * 0.75 * cfg.glyphH) + 16;
  ok(r.m.laneW <= cfg.laneW && r.m.laneW >= need, `${name}: lane stamp ${r.m.laneW} outside [${need}, ${cfg.laneW}]`);
  const heights = r.m.rows.map((x) => Math.round(x.h));
  ok(Math.max(...heights) - Math.min(...heights) <= 1, `${name}: rows differ in height ${JSON.stringify(heights)}`);
  let minIcon = Infinity, maxHand = 0;
  for (const row of r.m.rows) {
    const tag = `${name}: row "${row.whole}"`;
    ok(row.pics.length === (row.b.startsWith('-') ? 1 : 2), `${tag}: ${row.pics.length} pictures`);
    for (const p of row.pics) {
      const side = Math.min(p.w, p.h);
      minIcon = Math.min(minIcon, side);
      ok(side >= MIN_ICON - 0.6, `${tag}: picture "${p.key}" ${Math.round(side)} px < the G2 floor ${MIN_ICON}`);
      ok(p.key === row.b || Math.abs(side - cfg.pic) < 0.6 || side > cfg.pic, `${tag}: picture "${p.key}" ${Math.round(side)} ≠ config pic ${cfg.pic}`);
      ok(p.left >= row.left - 0.6 && p.right <= row.right + 0.6 && p.top >= row.top - 0.6 && p.bottom <= row.bottom + 0.6, `${tag}: picture "${p.key}" outside its row`);
    }
    ok(!!row.lane && row.laneH === cfg.laneH && row.laneH >= MIN_LANE_H, `${tag}: lane ${row.laneH} px (config ${cfg.laneH}, floor ${MIN_LANE_H})`);
    ok(!!row.lane && row.lane.w <= r.m.laneW + 0.6 && row.lane.w >= 60, `${tag}: lane ${row.lane && Math.round(row.lane.w)} px vs stamp ${r.m.laneW}`);
    ok(!!row.lane && row.lane.left >= row.left - 0.6 && row.lane.right <= row.right + 0.6 && row.lane.top >= row.top - 0.6 && row.lane.bottom <= row.bottom + 0.6, `${tag}: lane outside its row`);
    ok(row.ops.join('') === '+=', `${tag}: ops ${row.ops.join('')}`);
    ok(row.badge === !!cfg.badges, `${tag}: badge ${row.badge} ≠ config ${!!cfg.badges}`);
    ok(row.left >= r.m.body.left - 0.6 && row.right <= r.m.body.right + 0.6 && row.top >= r.m.body.top - 0.6 && row.bottom <= r.m.body.bottom + 0.6, `${tag}: row outside the body column`);
    ok(row.bottom <= r.m.foot + 0.6, `${tag}: row reaches into the footer (${Math.round(row.bottom)} vs ${Math.round(r.m.foot)})`);
    ok(row.words.length === (cfg.partWords ? row.pics.length : 0), `${tag}: ${row.words.length} part words on a ${cfg.partWords ? 'part-words' : 'no-part-words'} page`);
    for (const w of row.words) {
      ok(w.px >= MIN_PART_WORD - 0.6, `${tag}: part word "${w.text}" ${w.px} px < ${MIN_PART_WORD}`);
      ok(w.left >= row.left - 0.6 && w.right <= row.right + 0.6 && w.bottom <= row.bottom + 0.6, `${tag}: part word "${w.text}" outside its row`);
    }
    // the school-hand model: the platform's own letterform widths × 1.5 must fit the lane
    const hw = handWidth(row.whole, cfg.laneH, cfg.glyphH);
    if (hw != null) { maxHand = Math.max(maxHand, hw); ok(hw * HAND_MARGIN <= row.lane.w - 16, `${tag}: "${row.whole}" needs ${Math.round(hw * HAND_MARGIN)} px of hand-width, the lane gives ${Math.round(row.lane.w - 16)}`); }
    ok([...row.whole].length <= cfg.maxLetters, `${tag}: ${[...row.whole].length} letters > maxLetters ${cfg.maxLetters}`);
  }
  if (cfg.bank) {
    ok(!!r.m.bank, `${name}: no bank`);
    if (r.m.bank) {
      ok(r.m.bankRows <= 2, `${name}: bank wraps to ${r.m.bankRows} rows`);
      const words = r.m.pills.map((p) => p.word);
      const wholes = r.m.rows.map((x) => x.whole);
      ok([...words].sort().join('|') === [...wholes].sort().join('|'), `${name}: bank ${JSON.stringify(words)} ≠ wholes ${JSON.stringify(wholes)}`);
      ok(words.join('|') !== wholes.join('|'), `${name}: bank in row order`);
    }
  } else ok(!r.m.bank, `${name}: a bank on a no-bank page`);
  const xc = crossCheck(name, r.m, bank);
  ok(xc.length === 0, xc.join('\n    '));
  return { minIcon: r.m.rows.length ? minIcon : null, maxHand: Math.round(maxHand), rowH: heights[0] };
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
function buildRefusal(bank, d, type, unit) {
  try { (type || TYPE)._buildWith(bank, { difficulty: d, locale: 'en', unit: unit || null }, { rng: makeRng('poison') }); return []; } catch (e) { return [e.message]; }
}
/** A page built from EXPLICIT rows (past the spec's guards) — the seam for the verify()/node poisons. */
function pageFrom(rows, d, opts = {}) {
  const cfg = TYPE.difficulty[d];
  const laneW = opts.laneW || cfg.laneW;
  return Object.assign({}, TYPE, { build() {
    const html = rows.map((r, i) => {
      const cue = (p, key, word) => ({ src: fileUri(p.theme, p.noun), px: opts.px || cfg.pic, key, word: cfg.partWords ? (word == null ? key : word) : null });
      const stem = r.aStem || r.aWord;
      return compoundRow({
        index: i + 1, cueA: cue(r.picA, r.a, r.aWord), cueB: cue(r.picB, r.b, r.bWord),
        lane: { w: opts.rowLaneW || laneW, h: cfg.laneH, glyphH: cfg.glyphH }, badge: cfg.badges, pad: `${cfg.padY}px 14px`, gap: 10, wordPx: cfg.wordPx,
        stamps: { a: r.a, aWord: r.aWord, aStem: r.aStem || '', b: r.b, bWord: r.bWord, link: r.link || '', whole: r.whole, cut: r.cut != null ? r.cut : [...stem].length + [...(r.link || '')].length },
      });
    }).map((h, i) => (opts.patchRow ? opts.patchRow(h, i, rows[i]) : h));
    const wholes = rows.map((r) => r.whole);
    const bankWords = opts.bankWords || wholes.slice().sort();
    const bank = cfg.bank && opts.bank !== false ? wordBank({ words: bankWords.map((w) => ({ word: w })), wordPx: 18 }) : '';
    const grid = `<div style="flex:1 1 auto;display:grid;grid-template-rows:repeat(${rows.length},minmax(0,1fr));gap:${cfg.gap}px;min-height:0">${html.join('')}</div>`;
    return { bodyHtml: `<div style="flex:1 1 auto;display:flex;flex-direction:column;min-height:0" data-lcs-compound data-lcs-face="base" data-lcs-set="A" data-lcs-shape="compound" data-lcs-casing="lower" data-lcs-rows="${rows.length}" data-lcs-lane-w="${laneW}" data-lcs-pic="${cfg.pic}" data-lcs-min-linked="0" data-lcs-distinct-parts="1" data-lcs-part-words="${cfg.partWords ? 1 : 0}"${cfg.bank && opts.bank !== false ? ' data-lcs-has-bank="1"' : ''}>${bank}${grid}</div>`, meta: {} };
  } });
}
/** Explicit rows from bank items (the pins or the first honest candidate). */
function rowsFrom(items) {
  const pic = (p) => {
    if (p.pic) return p.pic;
    const c = candidates(p.vocabKey, 'en').find((x) => (OPENED[x.theme + '/' + x.noun] || []).includes(p.vocabKey));
    return { theme: c.theme, noun: c.noun };
  };
  return items.map((it) => ({ a: it.a.vocabKey, aWord: it.a.word, aStem: it.aStem || '', b: it.b.vocabKey, bWord: it.b.word, link: it.link || '', whole: it.whole.word, picA: pic(it.a), picB: pic(it.b) }));
}
async function gateFindings(page, type, d, baseName, bank) {
  const r = await renderWith(page, type, { difficulty: d, baseName });
  const before = fails.length, saved = assertions;
  assertRender(baseName, r, d, bank);
  const own = fails.splice(before);
  assertions = saved;
  return { r, own };
}

/**
 * Long-chrome fixtures: a 70-char title + a 150-char instruction, both legal. de wraps the title to 3 lines;
 * fi's long words wrap it to 4 (G1-307 measured body 733 / 700 under them — the README 722 is neither).
 */
const LONG = {
  de: { title: 'Zusammengesetzte Nomen: zwei Bilder ergeben zusammen ein neues Wort da',
    instruction: 'Benenne die beiden Bilder in jeder Zeile genau. Setze die zwei Wörter zu einem neuen Wort zusammen und schreibe es sauber auf die lange Linie daneben.' },
  fi: { title: 'Yhdyssanatehtävä: kuvasta kuvaan, kirjoita yhdyssana kirjoitusviivalle',
    instruction: 'Nimeä jokaisen rivin molemmat kuvat huolellisesti. Yhdistä kaksi sanaa yhdeksi uudeksi yhdyssanaksi ja kirjoita se siististi viivalle kuvien oikealle.' },
};


/* ================================================================== Phase 2: the five faces */
/**
 * 5. FACES (design §3; brief deliverable 3). Rows = tools/b3var-rows/compound-words.js (the emitted
 *    specs types/g2/G2-329..G2-333). Per face: bank strings === the row (one source), a render through
 *    the REAL pipeline at d2 en (+ the de/fi long chromes), verify() + lints empty, the face's floors
 *    asserted HERE (pictures >= 36 / config, tiles >= 36 high, chips >= 44 icons, rulings >= 50 high
 *    with glyphH >= 24, the school-hand model × 1.5 inside every lane), every unit inside the body
 *    and above the footer, and the NODE cross-check (`crossCheckFace`: every stamped unit is a bank
 *    item VERBATIM, every rendered picture a colour candidate that honours the pin and is OPENED,
 *    F3 cross pairs against the pictured words, F4 foils ∈ bank.foils, F5 satellites ∈ bank.hubs).
 *    F1 is REFUSED by the en bank (refuse.F1) — asserted — and rendered through a synthetic de-shaped
 *    fixture bank on en pictures (Fugen-n / -er / -s joints; validator-clean under 'de'); F5 REFUSES
 *    in en at the design floor (one hub with >= 4) — asserted — and renders through the en bank with
 *    the panel's `webLanes:3` ruling; the size rows render through a synthetic alterati fixture.
 *    Sweep: 20 seeds × every renderable face (build only). Poisons (each judged on its OWN message):
 *      PF1r  F1 in en                                → the spec REFUSES (refuse.F1)
 *      PF1a  a 48 px joint box on card 1            → verify() (the box width must never follow the answer)
 *      PF1b  a fixture with 2 linked items          → the spec REFUSES (minLinked)
 *      PF1c  tile b prints the whole                → verify()
 *      PF1s  a graded stem stamped on a card        → verify()
 *      PF2a  a seam tick on the cut face            → the spec REFUSES (d.seam) + verify() (a stamped tick)
 *      PF2b  one letter cell dropped                → verify()
 *      PF2c  "sun-flower" printed on a cut row      → verify()
 *      PF2d  a wrong cut stamp                      → verify()
 *      PF3a  row 1's right item is its own partner  → verify() (not deranged)
 *      PF3b  a cross pair on the page (angel+fish)  → the spec REFUSES (a 6-item set that cannot avoid it) + the node cross-check
 *      PF3c  a lane that is not empty               → verify()
 *      PF4a  7 foil chips                           → verify()
 *      PF4b  a foil chip that is not a bank foil    → the node cross-check
 *      PF4c  the bank not mixed (compounds first)   → verify()
 *      PF4d  a lane with one ruling                 → verify()
 *      PF5r  F5 in en at lanes 4                    → the spec REFUSES (the design floor)
 *      PF5w  bank.webLanes 2                        → the validator (rule 11) + the spec REFUSES
 *      PF5a  a ghost at opacity 1                   → verify()
 *      PF5b  a satellite that does not carry the hub → verify()
 *      PF5c  the hub word printed twice             → verify()
 *      PS1   a size picture that is not sizePic × scale → verify()
 *      PS2   a chip on a size row                   → verify()
 *      PS3   7 sizePairs                            → the validator (rule 7) + the spec REFUSES
 */
const FACE_ROWS = require('../tools/b3var-rows/compound-words.js').ROWS;
const FACE_ID = { link: 'G2-329', cut: 'G2-330', match: 'G2-331', detect: 'G2-332', web: 'G2-333' };
const FACE_TOTAL = 24;

function faceSpec(mode) {
  const id = FACE_ID[mode];
  const dir = path.join(__dirname, '..', 'types', 'g2');
  const f = require('fs').readdirSync(dir).find((x) => x.startsWith(id + '-'));
  if (!f) throw new Error('face spec missing on disk: ' + id + ' (run tools/gen-b3var-specs.js)');
  return require(path.join(dir, f));
}
/** A face type over an injected bank + an optional html patch (the poison seam). */
function faceTypeWith(mode, bank, patch, cfg) {
  const spec0 = faceSpec(mode);
  const D = cfg ? Object.assign({}, spec0.difficulty[2], cfg) : null;
  const spec = D ? Object.assign({}, spec0, { difficulty: { 1: D, 2: D, 3: D } }) : spec0;
  return Object.assign({}, spec, {
    build(args, ctx) {
      const b = spec._buildWith(bank || bankModule('compound-words')[(args.locale || 'en').slice(0, 2)], args, ctx);
      if (patch) b.bodyHtml = patch(b.bodyHtml);
      return b;
    },
  });
}
function faceRefusal(mode, bank, unit, cfg) {
  try { faceTypeWith(mode, bank, null, cfg).build({ difficulty: 2, locale: 'en', unit: unit || null }, { rng: makeRng('poison') }); return []; } catch (e) { return [e.message]; }
}

/** The measurement every face render shares (rects, stamps, pictures, lanes, tiles, chips, texts). */
async function measureFace(page) {
  return page.evaluate(() => {
    const rect = (el) => { const r = el.getBoundingClientRect(); return { left: r.left, right: r.right, top: r.top, bottom: r.bottom, w: r.width, h: r.height }; };
    const root = document.querySelector('[data-lcs-compound]');
    const unitOf = (el) => ({
      ds: Object.assign({}, el.dataset), ...rect(el),
      pics: [...el.querySelectorAll('img')].map((im) => ({ key: im.dataset.lcsPic, src: decodeURIComponent(im.src), ghost: im.dataset.lcsGhost === '1', opacity: parseFloat(getComputedStyle(im).opacity), ...rect(im) })),
      lanes: [...el.querySelectorAll('[data-lcs-prim="writing-row"]')].map((l) => ({ h: +l.getAttribute('height'), empty: !l.querySelector('text, path'), ...rect(l) })),
      tiles: [...el.querySelectorAll('.ws-tile')].map((t) => ({ text: t.textContent.trim(), px: parseFloat(getComputedStyle(t).fontSize), ...rect(t) })),
      letters: [...el.querySelectorAll('[data-lcs-letter]')].map((l) => l.textContent),
      boxes: [...el.querySelectorAll('[data-lcs-linkbox]')].map((b) => rect(b)),
      label: (el.querySelector('[data-lcs-hub-label]') || {}).textContent,
      ops: [...el.querySelectorAll('[data-lcs-op]')].map((o) => o.dataset.lcsOp),
    });
    const sel = '[data-lcs-row], [data-lcs-link-card], [data-lcs-match-row], [data-lcs-web-lane], [data-lcs-detect-lane]';
    const bank = root.querySelector('[data-lcs-detect-bank]');
    const chips = bank ? [...bank.querySelectorAll('[data-lcs-detect-word]')].map((c) => ({ ds: Object.assign({}, c.dataset), text: (c.querySelector('span:last-child') || {}).textContent, px: parseFloat(getComputedStyle(c.querySelector('span:last-child')).fontSize), pic: (() => { const im = c.querySelector('img'); return { key: im.dataset.lcsPic, src: decodeURIComponent(im.src), ...rect(im) }; })(), ...rect(c) })) : [];
    return {
      root: Object.assign({}, root.dataset),
      units: [...root.querySelectorAll(sel)].map(unitOf),
      webs: [...root.querySelectorAll('[data-lcs-web]')].map(unitOf),
      chips, bank: bank ? rect(bank) : null, bankRows: bank ? new Set(chips.map((c) => Math.round(c.top))).size : 0,
      body: rect(document.querySelector('[data-lcs-body]')), foot: document.querySelector('.ws-foot').getBoundingClientRect().top, titleH: rect(document.querySelector('.ws-head')).h,
    };
  });
}
async function renderFace(page, type, { baseName, strings, unit, locale }) {
  const out = await renderInstance({ type, theme: null, difficulty: 2, locale: locale || 'en', page, outDir: OUT, baseName, strings, unit: unit || null });
  const m = await measureFace(page);
  return { lints: out.qa.lints, verify: out.qa.verify, m, png: out.pngPath, meta: out.meta };
}

/** Node cross-check for a face page: every stamped unit VERBATIM from the bank, pictures candidates + OPENED, face rules. */
function crossCheckFace(name, mode, m, bank, opened) {
  const out = [];
  const O = opened || OPENED;
  const lower = (s) => String(s).toLowerCase();
  const items = [];
  (bank.units || []).forEach((u) => (u.items || []).forEach((it) => items.push({ it, where: 'set ' + u.id })));
  (bank.opaque || []).forEach((it) => items.push({ it, where: 'opaque' }));
  (bank.onePart || []).forEach((it) => items.push({ it, where: 'onePart' }));
  const byWhole = new Map(items.map((x) => [x.it.whole.word, x]));
  const pinFor = (key) => {
    for (const { it } of items) for (const p of [it.a, it.b]) if (p && p.vocabKey === key && p.pic) return p.pic;
    for (const sp of bank.sizePairs || []) if (sp.base && sp.base.vocabKey === key && sp.base.pic) return sp.base.pic;
    return null;
  };
  const picOk = (p, what) => {
    const [theme, file] = p.src.split('/').slice(-2);
    const noun = file.replace(/\.[a-z0-9]+$/i, '').replace(/@\dx$/, '');
    if (!candidates(p.key, 'en').some((c) => c.theme === theme && c.noun === noun)) out.push(`${name}: ${what}: picture ${theme}/${noun} is not a colour candidate for "${p.key}"`);
    const pin = pinFor(p.key);
    if (pin && (pin.theme !== theme || pin.noun !== noun)) out.push(`${name}: ${what}: "${p.key}" rendered ${theme}/${noun}, the bank pins ${pin.theme}/${pin.noun}`);
    const o = O[`${theme}/${noun}`];
    if (!o || !o.includes(p.key)) out.push(`${name}: ${what}: picture ${theme}/${noun} rendered for "${p.key}" was not opened as honest`);
  };
  const verbatim = (ds, what) => {
    const x = byWhole.get(ds.lcsWhole);
    if (!x) { out.push(`${name}: ${what}: stamped whole "${ds.lcsWhole}" is not a bank item`); return null; }
    const it = x.it;
    const aKey = it.a.vocabKey || it.a.word, bKey = it.b.affix != null ? it.b.affix : (it.b.vocabKey || it.b.word);
    if (aKey !== ds.lcsA || bKey !== ds.lcsB || it.a.word !== ds.lcsAWord || (it.b.word || '') !== ds.lcsBWord || (it.aStem || '') !== ds.lcsAStem || (it.link || '') !== ds.lcsLink) out.push(`${name}: ${what}: stamps (${ds.lcsA},${ds.lcsB},${ds.lcsAWord},${ds.lcsBWord},${ds.lcsAStem},${ds.lcsLink}) ≠ the bank item "${it.whole.word}" — not verbatim`);
    const cut = [...(it.aStem || it.a.word)].length + [...(it.link || '')].length;
    if (+ds.lcsCut !== cut) out.push(`${name}: ${what}: cut ${ds.lcsCut} ≠ ${cut}`);
    return x;
  };
  if (mode === 'link' || mode === 'cut' || mode === 'match') {
    const seen = new Set();
    const rows = [];
    m.units.forEach((u, i) => {
      const what = `unit ${i + 1}`;
      const x = verbatim(u.ds, what);
      if (!x) return;
      if (x.it.opaque && mode !== 'cut') out.push(`${name}: ${what}: opaque "${x.it.whole.word}" on the ${mode} face (analysis faces only)`);
      if (mode === 'link' && x.it.aStem) out.push(`${name}: ${what}: a graded stem on the link face`);
      for (const k of [u.ds.lcsA, u.ds.lcsB]) { if (k.startsWith('-')) continue; if (seen.has(k)) out.push(`${name}: part "${k}" twice on the page`); seen.add(k); }
      rows.push({ it: x.it, u, aWord: u.ds.lcsAWord, bWord: u.ds.lcsBWord });
      u.pics.forEach((p, j) => picOk(p, `${what} picture ${j + 1}`));
    });
    if (mode === 'match') {
      // the right column: each right key/word must be the b of an item on the page; cross pairs against the pictured words
      const pw = picturedWords('en');
      const byB = new Map(rows.map((r) => [r.it.b.vocabKey, r.it]));
      m.units.forEach((u, i) => {
        const R = u.pics.find((p) => p.key !== u.ds.lcsA);
        // the right item's key is read from the element stamps in verify(); here: the second picture must be a b of the page
        if (R && !byB.has(R.key)) out.push(`${name}: unit ${i + 1}: right picture "${R.key}" is not a second part on the page`);
      });
      for (const i of rows) for (const j of rows) {
        if (i === j) continue;
        for (const l of bank.links || ['']) {
          const joined = lower(i.aWord + l + j.bWord);
          if (pw.has(joined) || byWhole.has(joined) || (bank.crossWords || []).some((p) => lower(p[0]) === lower(i.aWord) && lower(p[1]) === lower(j.bWord))) out.push(`${name}: cross pair ${i.aWord}+${l ? l + '+' : ''}${j.bWord} = "${joined}" is a word a child can legitimately make (F3 rule 3)`);
        }
      }
    }
  }
  if (mode === 'detect') {
    const foils = new Map((bank.foils || []).map((f) => [f.word, f]));
    const seen = new Set();
    m.chips.forEach((c, i) => {
      const what = `chip ${i + 1} "${c.ds.lcsDetectWord}"`;
      if (c.ds.lcsFoil === '1') {
        const f = foils.get(c.ds.lcsDetectWord);
        if (!f) out.push(`${name}: ${what}: foil "${c.ds.lcsDetectWord}" is not a bank foil`);
        else if (f.vocabKey !== c.ds.lcsDetectKey) out.push(`${name}: ${what}: foil key ≠ the bank's`);
      } else {
        const x = byWhole.get(c.ds.lcsDetectWord);
        if (!x) { out.push(`${name}: ${what}: compound "${c.ds.lcsDetectWord}" is not a bank whole`); return; }
        const it = x.it;
        const parts = [it.aStem || it.a.word, it.link || '', it.b.affix != null ? it.b.affix.replace(/^-/, '') : it.b.word].join('|');
        if (c.ds.lcsCompound !== parts) out.push(`${name}: ${what}: parts "${c.ds.lcsCompound}" ≠ the bank's "${parts}"`);
        if (it.whole.vocabKey !== c.ds.lcsDetectKey) out.push(`${name}: ${what}: key ≠ the bank's`);
        for (const p of [it.a, it.b]) { const k = p.vocabKey || lower(p.word); if (seen.has(k)) out.push(`${name}: part "${k}" twice among the compounds`); seen.add(k); }
      }
      picOk(c.pic, what);
    });
  }
  if (mode === 'web' && m.root.lcsSizeRows == null) {
    const hubs = new Map((bank.hubs || []).map((h) => [h.hub.vocabKey, h]));
    const seen = new Set();
    m.webs.forEach((w, wi) => {
      const what = `web ${wi + 1}`;
      const h = hubs.get(w.ds.lcsHub);
      if (!h) { out.push(`${name}: ${what}: hub "${w.ds.lcsHub}" is not a bank hub`); return; }
      if (h.hub.word !== w.ds.lcsHubWord || h.side !== w.ds.lcsHubSide) out.push(`${name}: ${what}: hub word/side ≠ the bank's`);
      const sats = new Set(h.satellites.map(lower));
      w.pics.forEach((p, j) => picOk(p, `${what} picture ${j + 1}`));
      const lanes = m.units.filter((u) => u.top >= w.top - 0.6 && u.bottom <= w.bottom + 0.6 && u.ds.lcsWhole != null);
      lanes.forEach((u, i) => {
        const lw = `${what} lane ${i + 1}`;
        const x = verbatim(u.ds, lw);
        if (!x) return;
        if (!sats.has(lower(x.it.whole.word))) out.push(`${name}: ${lw}: "${x.it.whole.word}" is not a satellite of "${h.hub.word}" in the bank`);
        if (x.it.opaque) out.push(`${name}: ${lw}: opaque "${x.it.whole.word}" on the web face`);
        if (seen.has(lower(x.it.whole.word))) out.push(`${name}: satellite "${x.it.whole.word}" twice`); seen.add(lower(x.it.whole.word));
      });
    });
  }
  if (mode === 'web' && m.root.lcsSizeRows != null) {
    const pairs = bank.sizePairs || [];
    m.units.forEach((u, i) => {
      const what = `row ${i + 1}`;
      const sp = pairs.find((p) => p.base.word === u.ds.lcsBaseWord && p.base.vocabKey === u.ds.lcsBase);
      if (!sp) { out.push(`${name}: ${what}: base "${u.ds.lcsBaseWord}" is not a sizePair`); return; }
      if (sp[u.ds.lcsSize] !== u.ds.lcsWhole) out.push(`${name}: ${what}: ${u.ds.lcsSize} "${u.ds.lcsWhole}" ≠ the bank's "${sp[u.ds.lcsSize]}"`);
      u.pics.forEach((p, j) => picOk(p, `${what} picture ${j + 1}`));
    });
  }
  return out;
}

/** The floors the gate asserts itself on a face render. */
function assertFace(name, mode, r, cfg, bank, opened) {
  ok(r.verify.length === 0, `${name}: verify() ${JSON.stringify(r.verify)}`);
  ok(r.lints.length === 0, `${name}: lints ${JSON.stringify(r.lints)}`);
  const m = r.m;
  const lowest = Math.max(...[...m.units, ...m.webs, ...m.chips].map((u) => u.bottom), 0);
  ok(lowest <= m.foot + 0.6, `${name}: content reaches ${Math.round(lowest)} vs the footer ${Math.round(m.foot)}`);
  const inBody = (u, what) => ok(u.left >= m.body.left - 0.6 && u.right <= m.body.right + 0.6 && u.top >= m.body.top - 0.6 && u.bottom <= m.body.bottom + 0.6, `${name}: ${what} outside the body column`);
  const glyphH = cfg.glyphH, laneH = cfg.laneH;
  ok(glyphH >= MIN_GLYPH, `${name}: glyphH ${glyphH} < ${MIN_GLYPH}`);
  let minIcon = Infinity, maxHand = 0;
  const hand = (whole, w) => { const hw = handWidth(whole, laneH, glyphH); if (hw != null) { maxHand = Math.max(maxHand, hw); ok(hw * HAND_MARGIN <= w - 16, `${name}: "${whole}" needs ${Math.round(hw * HAND_MARGIN)} px of hand-width, the lane gives ${Math.round(w - 16)}`); } };
  const picFloor = mode === 'link' ? cfg.wholePic : mode === 'cut' ? cfg.cutPic : mode === 'match' ? cfg.pic : mode === 'detect' ? cfg.iconPx : cfg.pic;
  const units = mode === 'detect' ? m.units : m.units;
  units.forEach((u, i) => {
    const what = `unit ${i + 1}`;
    inBody(u, what);
    for (const p of u.pics) {
      const side = Math.min(p.w, p.h);
      minIcon = Math.min(minIcon, side);
      ok(side >= MIN_ICON - 0.6, `${name}: ${what}: picture "${p.key}" ${Math.round(side)} px < the G2 floor ${MIN_ICON}`);
      if (mode !== 'web' || m.root.lcsSizeRows == null) ok(side >= picFloor - 0.6, `${name}: ${what}: picture "${p.key}" ${Math.round(side)} px < config ${picFloor}`);
    }
    for (const t of u.tiles) { ok(t.h >= 36 - 0.6, `${name}: ${what}: tile "${t.text}" ${Math.round(t.h)} px high (< 36)`); ok(t.px >= 18 - 0.6, `${name}: ${what}: tile "${t.text}" ${t.px} px (< 18)`); }
    for (const l of u.lanes) {
      ok(l.h >= MIN_LANE_H && l.empty, `${name}: ${what}: lane ${l.h} px / empty ${l.empty}`);
      ok(l.left >= u.left - 0.6 && l.right <= u.right + 0.6 && l.top >= u.top - 0.6 && l.bottom <= u.bottom + 0.6, `${name}: ${what}: lane outside its unit`);
    }
    if (u.ds.lcsWhole && mode !== 'detect' && u.lanes.length) hand(u.ds.lcsWhole, u.lanes[0].w);
  });
  if (mode === 'detect') {
    m.chips.forEach((c, i) => {
      const side = Math.min(c.pic.w, c.pic.h);
      minIcon = Math.min(minIcon, side);
      ok(side >= cfg.iconPx - 0.6, `${name}: chip ${i + 1}: icon ${Math.round(side)} < ${cfg.iconPx}`);
      ok(c.px >= 18 - 0.6, `${name}: chip ${i + 1}: word ${c.px} px < 18`);
    });
    ok(m.bankRows <= 3, `${name}: bank wraps to ${m.bankRows} rows`);
    ok(m.units.length === cfg.compounds, `${name}: ${m.units.length} lanes ≠ ${cfg.compounds}`);
    ok(m.chips.length === cfg.bank, `${name}: ${m.chips.length} chips ≠ ${cfg.bank}`);
  }
  if (mode === 'link') ok(m.units.length === cfg.cards, `${name}: ${m.units.length} cards ≠ ${cfg.cards}`);
  if (mode === 'cut') ok(m.units.length === cfg.rows, `${name}: ${m.units.length} rows ≠ ${cfg.rows}`);
  if (mode === 'match') ok(m.units.length === cfg.pairs, `${name}: ${m.units.length} rows ≠ ${cfg.pairs}`);
  if (mode === 'web' && m.root.lcsSizeRows == null) {
    ok(m.webs.length === cfg.webs, `${name}: ${m.webs.length} webs ≠ ${cfg.webs}`);
    ok(m.units.length === m.webs.length * +m.root.lcsLanes, `${name}: ${m.units.length} lanes ≠ ${m.webs.length} × ${m.root.lcsLanes}`);
    m.webs.forEach((w, i) => { inBody(w, `web ${i + 1}`); for (const p of w.pics.filter((p) => !p.ghost)) ok(Math.min(p.w, p.h) >= MIN_ICON - 0.6, `${name}: web ${i + 1}: picture ${Math.round(p.w)} < 36`); });
  }
  if (mode === 'web' && m.root.lcsSizeRows != null) ok(m.units.length === (cfg.sizeRows || cfg.rows), `${name}: ${m.units.length} size rows ≠ ${cfg.sizeRows || cfg.rows}`);
  const heights = m.units.map((u) => Math.round(u.h));
  if (mode === 'cut' || mode === 'match' || (mode === 'web' && m.root.lcsSizeRows != null)) ok(Math.max(...heights) - Math.min(...heights) <= 1, `${name}: rows differ in height ${JSON.stringify(heights)}`);
  const xc = crossCheckFace(name, mode, m, bank, opened);
  ok(xc.length === 0, xc.join('\n    '));
  return { minIcon: Number.isFinite(minIcon) ? Math.round(minIcon) : null, maxHand: Math.round(maxHand), lowest: Math.round(lowest), unitH: heights.length ? Math.round(Math.max(...heights)) : 0 };
}

/* ---- fixtures ---- */
const DE_P = (theme, noun) => ({ theme, noun });
const dePart = (vocabKey, word, pic) => (pic ? { vocabKey, word, pic } : { vocabKey, word });
const deItem = (a, link, b, whole, wholeKey) => ({ a, aStem: null, link, b, whole: { word: whole, vocabKey: wholeKey, scale: 1 }, hubSide: 'b', opaque: false, picOpened: true });
/** A de-SHAPED synthetic bank on en pictures (Fugen-n / -er / -s): the F1 render fixture (en refuses F1 by design). */
function deFixture(en) {
  return {
    shape: 'compound', casing: 'keep-first', links: ['', 'n', 's', 'er'], linkBoxW: 36, exemplar: 'A',
    units: [{ id: 'A', items: [
      deItem(dePart('bell', 'Glocke'), 'n', dePart('flower', 'Blume', DE_P('spring', 'flower')), 'Glockenblume', 'bluebell'),
      deItem(dePart('rain', 'Regen'), '', dePart('coat', 'Mantel'), 'Regenmantel', 'raincoat'),
      deItem(dePart('tooth', 'Zahn'), '', dePart('brush', 'Bürste'), 'Zahnbürste', 'toothbrush'),
      deItem(dePart('bag', 'Tasche'), 'n', dePart('lamp', 'Lampe'), 'Taschenlampe', 'flashlight'),
      deItem(dePart('water', 'Wasser', DE_P('beach', 'water')), '', dePart('melon', 'Melone'), 'Wassermelone', 'watermelon'),
      deItem(dePart('foot', 'Fuß'), '', dePart('ball', 'Ball', DE_P('toys', 'ball')), 'Fußball', 'football'),
      deItem(dePart('cheese', 'Käse'), '', dePart('cake', 'Kuchen', DE_P('bakery', 'cake')), 'Käsekuchen', 'cheesecake'),
      deItem(dePart('bird', 'Vogel'), '', dePart('house', 'Haus'), 'Vogelhaus', 'birdhouse'),
      deItem(dePart('dress', 'Kleid'), 'er', dePart('cabinet', 'Schrank', DE_P('furniture', 'cabinet')), 'Kleiderschrank', 'wardrobe'),   // 14 letters: over the F1 cap (12) — dropped by the face (the drop control)
    ] }],
    opaque: [],
    onePart: [
      deItem(dePart('sun', 'Sonne'), 'n', { vocabKey: null, word: 'Brille' }, 'Sonnenbrille', 'sunglasses'),
      deItem(dePart('sand', 'Sand'), '', { vocabKey: null, word: 'Burg' }, 'Sandburg', 'sandcastle'),
    ],
    hubs: [], foils: [], sizePairs: [], crossWords: [], refuse: { F1: false, F3: false, F5: false },
    strings: clone(en.strings),
  };
}
/** A synthetic ALTERATI fixture on en pictures (Spanish-shaped size pairs) — the size-rows render fixture. */
function sizeFixture(en) {
  const b = clone(en);
  b.shape = 'alterati'; b.casing = 'lower'; b.refuse = { F1: true, F3: true, F5: false };
  const base = (vocabKey, word, pic) => (pic ? { vocabKey, word, pic } : { vocabKey, word });
  b.sizePairs = [
    { base: base('house', 'casa'), small: 'casita', big: 'casona' },
    { base: base('ball', 'bola', DE_P('toys', 'ball')), small: 'bolita', big: 'bolota' },
    { base: base('book', 'libro'), small: 'librito', big: 'librote' },
    { base: base('chair', 'silla', DE_P('furniture', 'chair')), small: 'sillita', big: 'sillota' },
    { base: base('cake', 'pastel', DE_P('bakery', 'cake')), small: 'pastelito', big: 'pastelote' },
    { base: base('sun', 'sol'), small: 'solecito', big: 'solote' },
    { base: base('apple', 'manzana', DE_P('fruits', 'apple')), small: 'manzanita', big: 'manzanota' },
    { base: base('flower', 'flor', DE_P('spring', 'flower')), small: 'florecita', big: 'florota' },
    { base: base('star', 'estrella', DE_P('christmas', 'star')), small: 'estrellita', big: 'estrellota' },
  ];
  return b;
}
const FACE_OPENED = Object.assign({}, OPENED, { 'around the house/wardrobe': ['wardrobe'], 'clothing/dress': ['dress'], 'around the house/lamp': ['lamp'], 'furniture/lamp': ['lamp'], 'camping/flashlight': ['flashlight'], 'tools/flashlight': ['flashlight'] });   // opened 2026-09-14 for the de fixture (contact sheet G2-316-faces-pictures.png)

async function facesSection(page, en, banks) {
  const pngs = [];
  let killed = 0;
  const cfgOf = (mode) => faceSpec(mode).difficulty[2];
  // 5a. one source: bank strings === the rows; titles distinct in the family; F1/F5 refusals in en
  for (const r of FACE_ROWS) {
    const s = en.strings[r[1]];
    ok(!!s && s.title === r[6] && s.instruction === r[7], `bank en strings ${r[1]} ≠ the row (one source)`);
    const spec = faceSpec(Object.keys(FACE_ID).find((k) => FACE_ID[k] === r[1]));
    ok(spec.i18n.en.title === r[6] && spec.i18n.en.instruction === r[7], `emitted spec ${r[1]} i18n ≠ the row (re-run gen-b3var-specs)`);
    ok([...r[6]].length <= 70 && !WORKSHEET_WORD.test(r[6]) && [...r[7]].length <= 150 && /[.!?…]$/u.test(r[7]), `${r[1]}: title/instruction outside the limits`);
  }
  const titles = FACE_ROWS.map((r) => r[6]).concat(en.strings['G2-316'].title);
  ok(new Set(titles).size === titles.length, 'face titles repeat within the family');
  ok(/REFUSES the link face \(refuse\.F1/.test(faceRefusal('link', en)[0] || ''), 'F1 in en must REFUSE by the bank (refuse.F1)');
  // The en bank RULES webLanes:3 (reviewer 2026-09-14), so the floor is measured with the ruling
  // stripped: at the design's 4 lanes en still has one hub and REFUSES; with the ruling it ships.
  const enNoRuling = { ...en }; delete enNoRuling.webLanes;
  const f5 = faceRefusal('web', enNoRuling)[0] || '';
  ok(/has 1 hub\(s\) with >= 4 usable satellites, need 2 webs of 4 \(the design floor\) — REFUSED/.test(f5), `F5 in en at lanes 4 must REFUSE at the design floor (got: ${f5})`);
  ok(faceRefusal('web', en).length === 0, 'F5 in en with the bank webLanes:3 ruling must BUILD');
  // the fixtures are validator-clean under their own locale rules
  const deFx = deFixture(en);
  const vDe = validateBank(deFx, 'de', { opened: FACE_OPENED });
  ok(vDe.fails.length === 0, `de fixture: ${vDe.fails.length} findings\n    ` + vDe.fails.slice(0, 8).join('\n    '));
  const szFx = sizeFixture(en);
  const vSz = validateBank(szFx, 'it', { opened: FACE_OPENED });
  ok(vSz.fails.length === 0, `size fixture: ${vSz.fails.length} findings\n    ` + vSz.fails.slice(0, 8).join('\n    '));
  const lanes3 = Object.assign(clone(en), { webLanes: 3 });
  const vL3 = validateBank(lanes3, 'en');
  ok(vL3.fails.length === 0, `webLanes:3 bank: ${vL3.fails.join(' · ')}`);

  // 5b. renders: the three en faces + the two fixture-borne faces + size rows, each under the en chrome and the de/fi long chromes
  const plan = [
    { mode: 'cut', type: faceTypeWith('cut'), bank: en, base: 'G2-330-gate-d2-en' },
    { mode: 'match', type: faceTypeWith('match'), bank: en, base: 'G2-331-gate-d2-en' },
    { mode: 'detect', type: faceTypeWith('detect'), bank: en, base: 'G2-332-gate-d2-en' },
    { mode: 'link', type: faceTypeWith('link', deFx), bank: deFx, base: 'G2-329-gate-d2-en-fixture-de', opened: FACE_OPENED },
    { mode: 'web', type: faceTypeWith('web', lanes3), bank: lanes3, base: 'G2-333-gate-d2-en-lanes3' },
    { mode: 'web', type: faceTypeWith('web', szFx), bank: szFx, base: 'G2-333-gate-d2-en-size-fixture', opened: FACE_OPENED, size: true },
  ];
  const chromes = QUICK ? ['fi'] : ['de', 'fi'];
  for (const p of plan) {
    const cfg = cfgOf(p.mode);
    const r = await renderFace(page, p.type, { baseName: p.base });
    const s = assertFace(p.base, p.mode, r, cfg, p.bank, p.opened);
    pngs.push(r.png);
    console.log(`render ${p.base}: verify ${r.verify.length} lints ${r.lints.length} units ${r.m.units.length}${r.m.webs.length ? ' webs ' + r.m.webs.length : ''}${r.m.chips.length ? ' chips ' + r.m.chips.length + ' in ' + r.m.bankRows + ' rows' : ''} unit h ${s.unitH} pic min ${s.minIcon} hand max ${s.maxHand} body ${Math.round(r.m.body.h)} px, lowest ${s.lowest} vs foot ${Math.round(r.m.foot)}${r.meta && r.meta.wholes ? ' wholes ' + r.meta.wholes.join(' ') : ''}${r.meta && r.meta.order ? ' order ' + JSON.stringify(r.meta.order) : ''}`);
    for (const k of chromes) {
      const rr = await renderFace(page, p.type, { baseName: `${p.base}-longchrome-${k}`, strings: LONG[k] });
      const ss = assertFace(`${p.base} long chrome ${k}`, p.mode, rr, cfg, p.bank, p.opened);
      ok(rr.m.body.h <= 740, `${p.base} long chrome ${k}: body ${Math.round(rr.m.body.h)} — the fixture did not squeeze the body`);
      pngs.push(rr.png);
      console.log(`render ${p.base} long chrome ${k}: verify ${rr.verify.length} lints ${rr.lints.length} body ${Math.round(rr.m.body.h)} px (head ${Math.round(rr.m.titleH)}) unit h ${ss.unitH}, lowest ${ss.lowest} vs foot ${Math.round(rr.m.foot)}`);
    }
  }
  // the unit path: the match face over set A explicitly (the fan lever reaches the faces)
  {
    const r = await renderFace(page, faceTypeWith('match'), { baseName: 'G2-331-gate-d2-en-uA', unit: 'A' });
    assertFace('G2-331 unit A', 'match', r, cfgOf('match'), en);
    ok(r.m.root.lcsSet === 'A', 'match unit A: the root stamps set A');
    ok(/set B has 4 items < 8 — REFUSED/.test(faceRefusal('match', en, 'B')[0] || ''), 'match unit B (4 items) must REFUSE, never fill');
  }

  // 5c. sweep (build only)
  if (!QUICK) {
    const sweep = [['cut', en], ['match', en], ['detect', en], ['link', deFx], ['web', lanes3], ['web', szFx]];
    const line = [];
    for (const [mode, bank] of sweep) {
      const spec = faceSpec(mode);
      const sets = new Set();
      for (let k = 1; k <= 20; k++) {
        const rng = makeRng(instanceSeed({ typeId: spec.id, theme: null, difficulty: 2, seedEpoch: k }));
        const b = spec._buildWith(bank, { difficulty: 2, locale: 'en', unit: null }, { rng });
        const w = b.meta.wholes;
        ok(new Set(w.map((x) => x.toLowerCase())).size === w.length, `sweep ${mode} seed ${k}: a whole twice`);
        if (mode === 'detect') ok(/f/.test(b.meta.order.slice(0, 6)) && /c/.test(b.meta.order.slice(0, 6)), `sweep detect seed ${k}: bank not mixed ${b.meta.order}`);
        if (mode === 'match') ok(b.meta.order.every((v, i) => v !== i), `sweep match seed ${k}: not a derangement`);
        if (mode === 'link') ok(b.meta.links.filter(Boolean).length >= 3 && b.meta.links.filter((x) => !x).length >= 3, `sweep link seed ${k}: joints ${JSON.stringify(b.meta.links)}`);
        ok(!new RegExp('>(' + w.join('|') + ')<', 'i').test(b.bodyHtml.replace(/<span class="ws-bankword"[\s\S]*?<\/span><\/span>/g, '')), `sweep ${mode} seed ${k}: a whole printed as text`);
        sets.add(w.slice().sort().join(','));
      }
      ok(sets.size >= 2, `sweep ${mode}: only ${sets.size} distinct sets over 20 seeds`);
      line.push(`${mode}${bank === szFx ? '-size' : bank === deFx ? '-de' : bank === lanes3 ? '-lanes3' : ''} ${sets.size}`);
    }
    console.log(`sweep faces: distinct sets over 20 seeds ${line.join(' / ')}; detect always mixed, match always deranged, link >= 3 + 3 joints`);
  }

  // 5d. poisons
  const poisonRender = async (mode, bank, base, patch, opened, cfg) => {
    const t = faceTypeWith(mode, bank, patch, cfg);
    const r = await renderFace(page, t, { baseName: base });
    const before = fails.length, saved = assertions;
    assertFace(base, mode, r, t.difficulty[2], bank, opened);
    const own = fails.splice(before);
    assertions = saved;
    return { r, own };
  };
  // PF1r — F1 in en
  if (judge('PF1r', faceRefusal('link', en), /REFUSES the link face \(refuse\.F1/)) killed++;
  // PF1a — a 48 px joint box on card 1
  {
    const { r } = await poisonRender('link', deFx, 'G2-316-gate-poison-PF1a', (h) => h.replace('width="36" height="36"', 'width="48" height="36"').replace('data-lcs-linkbox="36"', 'data-lcs-linkbox="48"'), FACE_OPENED);
    if (judge('PF1a', r.verify, /joint box 48 px ≠ 36/)) killed++;
  }
  // PF1b — only two linked items
  {
    const b = clone(deFx); b.units[0].items = b.units[0].items.filter((it) => it.whole.word !== 'Taschenlampe');
    if (judge('PF1b', faceRefusal('link', b), /link pool has 2 linked \/ 7 empty usable items \(need 3 \/ 3\) — REFUSED/)) killed++;
  }
  // PF1c — tile b prints the whole
  {
    const { r } = await poisonRender('link', deFx, 'G2-316-gate-poison-PF1c', (h) => h.replace(/(<span data-lcs-tile="b"[^>]*><div class="ws-tilerow"><span class="ws-tile"[^>]*>)([^<]+)/, (m0, p1) => p1 + 'Glockenblume'), FACE_OPENED);
    if (judge('PF1c', r.verify, /tile b prints "Glockenblume"|the whole "glockenblume" is printed/)) killed++;
  }
  // PF1s — a graded stem stamped on a card
  {
    const { r } = await poisonRender('link', deFx, 'G2-316-gate-poison-PF1s', (h) => h.replace('data-lcs-a-stem=""', 'data-lcs-a-stem="Glocken"'), FACE_OPENED);
    if (judge('PF1s', r.verify, /a graded stem "Glocken" on the link face/)) killed++;
  }
  // PF2a — a seam tick: the spec refuses `seam`, and a stamped tick fails verify
  {
    const spec = faceSpec('cut');
    let msg = ''; try { spec._buildWith(en, { difficulty: 2, locale: 'en' }, { rng: makeRng('p') }); } catch (e) { msg = e.message; }
    const d2 = Object.assign({}, spec.difficulty[2], { seam: 3 });
    const t = Object.assign({}, spec, { difficulty: { 1: d2, 2: d2, 3: d2 } });
    let ref = ''; try { t._buildWith(en, { difficulty: 2, locale: 'en' }, { rng: makeRng('p') }); } catch (e) { ref = e.message; }
    const a = judge('PF2a spec', [ref], /a seam tick is never printed on the shipped cut face/);
    const { r } = await poisonRender('cut', en, 'G2-316-gate-poison-PF2a', (h) => h.replace('</svg></span></div>', '<line x1="96" y1="4" x2="96" y2="42" stroke="#C8BFAE" stroke-width="2" data-lcs-seam="3"/></svg></span></div>'));
    const c = judge('PF2a verify', r.verify, /a seam tick is printed/);
    if (a && c) killed++;
  }
  // PF2b — one letter cell dropped from row 1
  {
    const { r } = await poisonRender('cut', en, 'G2-316-gate-poison-PF2b', (h) => h.replace(/<text([^>]*)data-lcs-letter="1"[^>]*>[^<]*<\/text>/, ''));
    if (judge('PF2b', r.verify, /row 1: \d+ cells for \d+ letters|cells print/)) killed++;
  }
  // PF2c — a split printed on a cut row
  {
    const { r } = await poisonRender('cut', en, 'G2-316-gate-poison-PF2c', (h) => {
      const w = /data-lcs-whole="([^"]+)" data-lcs-cut="(\d+)"/.exec(h);
      const split = w[1].slice(0, +w[2]) + '-' + w[1].slice(+w[2]);
      return h.replace('</svg></span></div>', `</svg></span><span style="font-size:18px">${split}</span></div>`);
    });
    if (judge('PF2c', r.verify, /row 1: prints the split "[^"]+-[^"]+"/)) killed++;
  }
  // PF2d — a wrong cut stamp
  {
    const { r } = await poisonRender('cut', en, 'G2-316-gate-poison-PF2d', (h) => h.replace(/data-lcs-cut="(\d+)"/, (m0, n) => `data-lcs-cut="${+n + 1}"`));
    if (judge('PF2d', r.verify, /row 1: cut \d+ ≠ \d+/)) killed++;
  }
  // PF3a — row 1's right item is its own partner
  {
    const { r } = await poisonRender('match', en, 'G2-316-gate-poison-PF3a', (h) => {
      const row = /<div data-ws-content data-lcs-match-row="1"[^>]*data-lcs-b="([^"]+)"[^>]*data-lcs-b-word="([^"]+)"[\s\S]*?<\/div>/.exec(h);
      const b = row[1];
      return h.replace(/(data-lcs-match-row="1"[\s\S]*?)data-lcs-right="[^"]+"/, `$1data-lcs-right="${b}"`);
    });
    if (judge('PF3a', r.verify, /row 1: the right item is this row's own partner \(not deranged\)/)) killed++;
  }
  // PF3b — a cross pair: a set that must seat angel+fish (spec refuses); a page stamped with it (node)
  {
    const A = en.units[0].items, B = en.units[1].items;
    // an 8-item set seated in full (pairs 8) that holds starfish AND angel|coat: every page carries angel+fish → the spec refuses
    const eightX = [A.find((i) => i.whole.word === 'starfish'), Object.assign(clone(B[0]), { b: { vocabKey: 'coat', word: 'coat' }, whole: { word: 'angelcoat', vocabKey: 'raincoat', scale: 1 } }),
      ...['watermelon', 'toothbrush', 'handbag', 'birdhouse', 'earthworm', 'bookshelf'].map((w) => A.find((i) => i.whole.word === w))];
    const b = Object.assign(clone(en), { units: [{ id: 'A', items: eightX }, ...en.units.slice(1)] });
    const a = judge('PF3b spec', faceRefusal('match', b, null, { pairs: 8, pic: 56 }), /cannot seat 8 pairs without a cross pair \(angel\+fish \(a bank whole\)\)/);
    // a page past the guard: an 8-item set seated in full (pairs 8, pictures 56) so starfish AND raincoat are on the page,
    // then raincoat's first part re-stamped "angel" → angel+fish is a pictured word (the node sees the STAMPED words)
    const eight = ['starfish', 'raincoat', 'watermelon', 'toothbrush', 'handbag', 'birdhouse', 'earthworm', 'bookshelf'].map((w) => A.find((i) => i.whole.word === w));
    const b2 = Object.assign(clone(en), { units: [{ id: 'A', items: eight }, ...en.units.slice(1)] });
    const { own } = await poisonRender('match', b2, 'G2-316-gate-poison-PF3b', (h) => {
      if (!/data-lcs-b="fish"/.test(h)) throw new Error('PF3b: starfish is not on the page');
      const rowRe = /(data-lcs-match-row="\d+" data-lcs-a=")rain(" data-lcs-b="coat" data-lcs-a-word=")rain"/;
      if (!rowRe.test(h)) throw new Error('PF3b: raincoat is not on the page');
      return h.replace(rowRe, '$1angel$2angel"');
    }, null, { pairs: 8, pic: 56 });
    const c = judge('PF3b node', own, /cross pair angel\+fish = "angelfish"/);
    if (a && c) killed++;
  }
  // PF3c — a lane that is not empty
  {
    const { r } = await poisonRender('match', en, 'G2-316-gate-poison-PF3c', (h) => h.replace(/(data-lcs-match-row="1"[\s\S]*?<svg[^>]*data-lcs-prim="writing-row"[^>]*>)/, '$1<text x="20" y="40" font-size="20">hint</text>'));
    if (judge('PF3c', r.verify, /row 1: writing row 1 is not empty/)) killed++;
  }
  // PF4a — 7 foil chips
  {
    const { r } = await poisonRender('detect', en, 'G2-316-gate-poison-PF4a', (h) => h.replace(/data-lcs-compound="[^"]+"/, 'data-lcs-foil="1"'));
    if (judge('PF4a', r.verify, /7 foil chips ≠ 6/)) killed++;
  }
  // PF4b — a foil chip that is not a bank foil (the word swapped; stamps agree; only the node sees it)
  {
    const { own } = await poisonRender('detect', en, 'G2-316-gate-poison-PF4b', (h) => {
      const re = /data-lcs-detect-word="(\w+)" data-lcs-detect-key="\1" data-lcs-foil="1">(<img[^>]*data-lcs-pic=")\1("[^>]*>)<span>\1<\/span>/;
      if (!re.test(h)) throw new Error('PF4b: no foil chip matched');
      return h.replace(re, (m0, w, p2, p3) => `data-lcs-detect-word="parrot" data-lcs-detect-key="parrot" data-lcs-foil="1">${p2}parrot${p3}<span>parrot</span>`);
    });
    if (judge('PF4b', own, /foil "parrot" is not a bank foil|picture .* is not a colour candidate for "parrot"/)) killed++;
  }
  // PF4c — the bank not mixed (compounds first)
  {
    const { r } = await poisonRender('detect', en, 'G2-316-gate-poison-PF4c', (h) => {
      const m0 = /(<div class="ws-scene-banner ws-bank ws-bank--icons"[^>]*>)([\s\S]*?)(<\/div><div style="flex:1 1 auto;display:grid)/.exec(h);
      const chips = m0[2].match(/<span class="ws-bankword"[\s\S]*?<\/span><\/span>/g);
      const sorted = chips.filter((c) => /data-lcs-compound=/.test(c)).concat(chips.filter((c) => /data-lcs-foil=/.test(c)));
      return h.replace(m0[0], m0[1] + sorted.join('') + m0[3]);
    });
    if (judge('PF4c', r.verify, /the bank is not mixed/)) killed++;
  }
  // PF4d — a lane with one ruling
  {
    const { r } = await poisonRender('detect', en, 'G2-316-gate-poison-PF4d', (h) => h.replace(/(data-lcs-detect-lane="6"[\s\S]*?)<span data-lcs-lane style="flex:0 0 auto;display:flex;"><svg[\s\S]*?<\/svg><\/span>(<span style="flex:0 0 auto;display:flex"><svg)/, '$1$2'));
    if (judge('PF4d', r.verify, /lane 6: 1 writing rows \(want 2\)/)) killed++;
  }
  // PF5r — F5 in en at lanes 4 (the design floor)
  { const enNoRuling = { ...en }; delete enNoRuling.webLanes;   // the bank rules webLanes:3; the floor is tested without it
    if (judge('PF5r', faceRefusal('web', enNoRuling), /has 1 hub\(s\) with >= 4 usable satellites, need 2 webs of 4 \(the design floor\) — REFUSED/)) killed++; }
  // PF5w — bank.webLanes 2
  {
    const b = Object.assign(clone(en), { webLanes: 2 });
    const a = judge('PF5w bank', validateBank(b, 'en').fails, /webLanes 2 must be 3 or 4/);
    const c = judge('PF5w build', faceRefusal('web', b), /bank\.webLanes 2 must be 3 or 4/);
    if (a && c) killed++;
  }
  // PF5a — a ghost at opacity 1
  {
    const { r } = await poisonRender('web', lanes3, 'G2-316-gate-poison-PF5a', (h) => h.replace('opacity:0.55;', 'opacity:1;'));
    if (judge('PF5a', r.verify, /ghost opacity 1 ≠ 0\.55/)) killed++;
  }
  // PF5b — a satellite that does not carry the hub (lane 1 of web 1 re-stamped as sunflower / raincoat)
  {
    const { r } = await poisonRender('web', lanes3, 'G2-316-gate-poison-PF5b', (h) => h.replace(/(<div data-lcs-web-lane )data-lcs-a="[^"]+" data-lcs-b="[^"]+" data-lcs-a-word="[^"]+" data-lcs-b-word="[^"]+" data-lcs-a-stem="" data-lcs-link="" data-lcs-whole="[^"]+" data-lcs-cut="\d+"/,
      '$1data-lcs-a="bird" data-lcs-b="house" data-lcs-a-word="bird" data-lcs-b-word="house" data-lcs-a-stem="" data-lcs-link="" data-lcs-whole="birdhouse" data-lcs-cut="4"'));
    if (judge('PF5b', r.verify, /"birdhouse" does not carry the hub/)) killed++;
  }
  // PF5c — the hub word printed twice
  {
    const { r } = await poisonRender('web', lanes3, 'G2-316-gate-poison-PF5c', (h) => h.replace(/(<span data-lcs-hub-label[^>]*>)([^<]+)(<\/span><\/div>)/, '$1$2$3<span style="font-size:18px">$2</span>'));
    if (judge('PF5c', r.verify, /the hub word "[a-z]+" is printed 2 times/)) killed++;
  }
  // PS1 — a size picture that is not sizePic × scale
  {
    const { r } = await poisonRender('web', szFx, 'G2-316-gate-poison-PS1', (h) => h.replace(/width:40px;height:40px/, 'width:60px;height:60px'), FACE_OPENED);
    if (judge('PS1', r.verify, /picture 60 px ≠ 40 \(sizePic × scale\)/)) killed++;
  }
  // PS2 — a chip on a size row
  {
    const { r } = await poisonRender('web', szFx, 'G2-316-gate-poison-PS2', (h) => h.replace(/(data-lcs-row="1"[\s\S]*?<\/span>)(<span style="flex:0 0 auto;display:flex"><svg)/, '$1<span class="ws-tile" style="height:36px;font-size:18px">-ito</span>$2'), FACE_OPENED);
    if (judge('PS2', r.verify, /a chip on the size face/)) killed++;
  }
  // PS3 — 7 sizePairs
  {
    const b = clone(szFx); b.sizePairs = b.sizePairs.slice(0, 7);
    const a = judge('PS3 bank', validateBank(b, 'it', { opened: FACE_OPENED }).fails, /sizePairs 7 < 8 for the alterati shape/);
    const c = judge('PS3 build', faceRefusal('web', b), /has 7 sizePairs < 8 — the size face is REFUSED/);
    if (a && c) killed++;
  }
  console.log('face renders: ' + pngs.map((p) => path.basename(p)).join(' '));
  return killed;
}

async function main() {
  const banks = bankModule('compound-words');
  const locales = Object.keys(banks);
  for (const loc of locales) {
    const v = validateBank(banks[loc], loc);
    ok(v.fails.length === 0, `bank ${loc}: ${v.fails.length} findings\n    ` + v.fails.slice(0, 12).join('\n    '));
    console.log(`bank ${loc}: sets ${Object.entries(v.counts.sets || {}).map(([k, n]) => k + ':' + n).join(' ')} (exemplar ${v.counts.exemplar}), opaque ${v.counts.opaque}, onePart ${v.counts.onePart}, hubs ${v.counts.hubs} (${v.counts.bigHubs} with >= 4), foils ${v.counts.foils}, crossWords ${v.counts.cross}, cross hits ${v.counts.crossHits}${v.notes.length ? '\n  notes: ' + v.notes.join(' · ') : ''}`);
  }
  const en = banks.en;
  for (const k of Object.keys(LONG)) ok([...LONG[k].title].length === 70 && [...LONG[k].instruction].length === 150, `long-chrome fixture ${k} is ${[...LONG[k].title].length}/${[...LONG[k].instruction].length} chars, want 70/150`);
  ok(JSON.stringify(TYPE.unitAxis.units('en')) === JSON.stringify(['A']), `unitAxis.units(en) ${JSON.stringify(TYPE.unitAxis.units('en'))} ≠ ["A"] (only sets >= 8 ship)`);
  ok(TYPE.unitAxis.exemplar('en') === 'A', 'unitAxis.exemplar(en) ≠ A');

  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  const pngs = [];
  const TOTAL = 28 + FACE_TOTAL;
  let killed = 0;
  try {
    // 2. renders through the real pipeline
    for (const d of [1, 2, 3]) {
      const r = await renderWith(page, TYPE, { difficulty: d, baseName: `G2-316-gate-d${d}-en` });
      const s = assertRender(`d${d}`, r, d, en);
      pngs.push(r.png);
      const lowest = Math.round(Math.max(...r.m.rows.map((x) => x.bottom)));
      console.log(`render d${d}: verify ${r.verify.length} lints ${r.lints.length} rows ${r.m.rows.length} (h ${s.rowH}) pic min ${Math.round(s.minIcon)} lane ${r.m.laneW}×${TYPE.difficulty[d].laneH} hand max ${s.maxHand}${r.m.bank ? ' bank ' + Math.round(r.m.bank.h) + ' rows ' + r.m.bankRows : ''} body ${Math.round(r.m.body.h)} px, lowest row ${lowest} vs foot ${Math.round(r.m.foot)}, wholes ${r.m.rows.map((x) => x.whole).join(' ')}`);
    }
    const deepest = {};
    for (const k of Object.keys(LONG)) for (const d of [1, 2, 3]) {
      const r = await renderWith(page, TYPE, { difficulty: d, baseName: `G2-316-gate-d${d}-en-longchrome-${k}`, strings: LONG[k] });
      const s = assertRender(`d${d} long chrome ${k}`, r, d, en);
      pngs.push(r.png);
      // a fixture that does not squeeze the body proves nothing: each <= 740 (a 3-line title), the deepest <= 705 (a 4-line one)
      ok(r.m.body.h <= 740, `d${d} long chrome ${k}: body ${Math.round(r.m.body.h)} px — the fixture did not squeeze the body to <= 740 (head ${Math.round(r.m.titleH)} px)`);
      deepest[d] = Math.min(deepest[d] || Infinity, r.m.body.h);
      console.log(`render d${d} long chrome ${k}: verify ${r.verify.length} lints ${r.lints.length} body ${Math.round(r.m.body.h)} px (head ${Math.round(r.m.titleH)} px) row h ${s.rowH}, lowest row ${Math.round(Math.max(...r.m.rows.map((x) => x.bottom)))} vs foot ${Math.round(r.m.foot)}`);
    }
    for (const d of [1, 2, 3]) ok(deepest[d] <= 705, `d${d}: no long-chrome fixture squeezed the body to <= 705 (deepest ${Math.round(deepest[d])})`);
    // refusals: an unauthored locale, a set below the floor, an unknown set
    let refused = false;
    try { TYPE.build({ theme: null, difficulty: 2, locale: 'de' }, { rng: makeRng('x') }); } catch (e) { refused = /no de block/.test(e.message); }
    ok(refused, 'an unauthored locale must REFUSE (throw), not fall back to en');
    ok(/set B has 4 items < 8 — REFUSED/.test(buildRefusal(en, 2, null, 'B')[0] || ''), 'unit B (4 items) must REFUSE, never fill');
    ok(/set "Z" is not a en unit/.test(buildRefusal(en, 2, null, 'Z')[0] || ''), 'an unknown unit must REFUSE');

    // 3. seed sweep (build only)
    if (!QUICK) {
      const sets = { 1: new Set(), 2: new Set(), 3: new Set() };
      for (let k = 1; k <= 20; k++) for (const d of [1, 2, 3]) {
        const cfg = TYPE.difficulty[d];
        const rng = makeRng(instanceSeed({ typeId: 'G2-316', theme: null, difficulty: d, seedEpoch: k }));
        const b = TYPE.build({ theme: null, difficulty: d, locale: 'en' }, { rng });
        const m = b.meta;
        ok(m.wholes.length === cfg.rows && new Set(m.wholes).size === cfg.rows, `sweep seed ${k} d${d}: ${m.wholes.length} rows, ${new Set(m.wholes).size} distinct`);
        const parts = m.parts.flat();
        ok(new Set(parts).size === parts.length, `sweep seed ${k} d${d}: a part twice ${JSON.stringify(parts)}`);
        ok(m.wholes.every((w) => [...w].length <= cfg.maxLetters), `sweep seed ${k} d${d}: a whole over maxLetters ${cfg.maxLetters}`);
        ok(m.links.filter(Boolean).length >= m.minLinked, `sweep seed ${k} d${d}: linked ${m.links.filter(Boolean).length} < ${m.minLinked}`);
        if (cfg.bank) {
          const bankWords = [...b.bodyHtml.matchAll(/data-lcs-bank-word="([^"]+)"/g)].map((x) => x[1]);
          ok(bankWords.join('|') !== m.wholes.join('|') && [...bankWords].sort().join('|') === [...m.wholes].sort().join('|'), `sweep seed ${k} d1: bank ${JSON.stringify(bankWords)} vs rows ${JSON.stringify(m.wholes)}`);
        }
        ok(!new RegExp('>(' + m.wholes.join('|') + ')<', 'i').test(b.bodyHtml.replace(/<div class="ws-scene-banner[\s\S]*?<\/div>/, '')), `sweep seed ${k} d${d}: a whole printed as text`);
        sets[d].add(m.wholes.slice().sort().join(','));
      }
      for (const d of [1, 2, 3]) ok(sets[d].size >= 2, `sweep d${d}: only ${sets[d].size} distinct row sets over 20 seeds`);
      console.log(`sweep: distinct row sets d1 ${sets[1].size} / d2 ${sets[2].size} / d3 ${sets[3].size} over 20 seeds; 0 repeated parts, 0 bank-in-row-order`);
    }

    // 4. poisons
    killed = 0;
    const gate = (b, loc) => validateBank(b, loc || 'en').fails;
    const deItem = (a, link, b, whole) => ({ a: { vocabKey: 'sun', word: a }, aStem: null, link, b: { vocabKey: 'flower', word: b }, whole: { word: whole, vocabKey: 'sunflower', scale: 1 }, hubSide: 'b', opaque: false, picOpened: true });
    const deBank = (it) => ({ ...clone(en), shape: 'compound', casing: 'keep-first', links: ['', 's', 'n', 'en', 'er'], units: [{ id: 'A', items: [it] }], hubs: [], foils: [], crossWords: [], refuse: { F1: false, F3: false, F5: false } });
    // P1 — the link: Sonne + '' + Blume stamped Sonnenblume
    {
      const b = deBank(deItem('Sonne', '', 'Blume', 'Sonnenblume'));
      const a = judge('P1 bank', gate(b, 'de'), /whole ≠ casing\(aStem\|\|a\) \+ link \+ b = "Sonneblume"/);
      const b2 = clone(en); b2.units[0].items[10].whole.word = 'sunnflower';
      const c = judge('P1 build', buildRefusal(b2, 2), /item "sunnflower": whole ≠ sunflower \(casing\(aStem\|\|a\) \+ link \+ b\)/, 'the spec refused the same class in en');
      if (a && c) killed++;
    }
    // P1b — casing: SonnenBlume
    {
      const b = deBank(deItem('Sonne', 'n', 'Blume', 'SonnenBlume'));
      if (judge('P1b', gate(b, 'de'), /whole ≠ casing\(aStem\|\|a\) \+ link \+ b = "Sonnenblume"/)) killed++;
    }
    // P2 — a part without a picture
    {
      const b = clone(en); b.units[0].items[0].a = { vocabKey: 'sunhat', word: 'water' };
      if (judge('P2', gate(b), /a: "sunhat" has no colour picture/)) killed++;
    }
    // P2b — a pin in a B&W dir
    {
      const b = clone(en); b.units[0].items[6].a.pic = { theme: 'animals bw', noun: 'bat' };
      const a = judge('P2b bank', gate(b), /pin animals bw\/bat is in a B&W dir/);
      const b2 = clone(en); b2.units[0].items.forEach((it) => { it.a.pic = { theme: 'animals bw', noun: 'bat' }; });
      const c = judge('P2b build', buildRefusal(b2, 2), /pinned picture animals bw\/bat is not a colour-index candidate/, 'the spec refused (every a pinned)');
      if (a && c) killed++;
    }
    // P2c — a pin that resolves but was opened as NOT honest (beach/chair = a deckchair)
    {
      const b = clone(en); b.units[0].items[4].b.pic = { theme: 'beach', noun: 'chair' };
      let resolves = false; try { fileUri('beach', 'chair'); resolves = true; } catch (e) { /* absent */ }
      if (judge('P2c', gate(b), /picture beach\/chair was opened and is NOT an honest "chair"/, resolves ? 'the picture resolves' : 'picture absent')) killed++;
    }
    // P2d — picOpened false
    {
      const b = clone(en); b.units[0].items[1].picOpened = false;
      const a = judge('P2d bank', gate(b), /item "toothbrush": picOpened is not true/);
      const c = judge('P2d build', buildRefusal(b, 2), /picOpened is not true — refuse/, 'the spec refused');
      if (a && c) killed++;
    }
    // P3 — a link outside the locale set
    {
      const b = clone(en); b.units[0].items[2].link = 's'; b.units[0].items[2].whole.word = 'handsbag';
      const a = judge('P3 bank', gate(b), /link "s" not in \[""\]/);
      const c = judge('P3 build', buildRefusal(b, 2), /link "s" not in/, 'the spec refused');
      if (a && c) killed++;
    }
    // P3b — an affix without '-'
    {
      const b = clone(en); b.shape = 'family'; b.units[0].items[3].b = { affix: 'ista' }; b.units[0].items[3].whole = { word: 'basketista', vocabKey: null, scale: 1 };
      if (judge('P3b', gate(b), /affix "ista" must start with "-"/)) killed++;
    }
    // P4 — two -fish in set A
    {
      const b = clone(en); b.units[0].items.push(clone(en.units[1].items[0]));
      if (judge('P4', gate(b), /set A: part "fish" is in "starfish" and "angelfish"/)) killed++;
    }
    // PU — an opaque item inside a base set
    {
      const b = clone(en); b.units[0].items.push(clone(en.opaque[0]));
      if (judge('PU', gate(b), /item "bluebell": an opaque item inside a base set/)) killed++;
    }
    // PX — an exemplar set of 7
    {
      const b = clone(en); b.units[0].items = b.units[0].items.slice(0, 7);
      const a = judge('PX bank', gate(b), /exemplar set A has 7 items < 8/);
      const c = judge('PX build', buildRefusal(b, 2), /set A has 7 items < 8 — REFUSED, never filled/, 'the spec refused');
      if (a && c) killed++;
    }
    // P5 — a satellite that does not share the hub
    {
      const b = clone(en); b.hubs[0].satellites.push('sunflower');
      if (judge('P5', gate(b), /hub "fish": satellite "sunflower" does not end with "fish"/)) killed++;
    }
    // P6 — foil sunflower
    {
      const b = clone(en); b.foils.push({ vocabKey: 'sunflower', word: 'sunflower', looksLike: ['sun', 'flower'] });
      if (judge('P6', gate(b), /foil "sunflower": is a pool whole/)) killed++;
    }
    // P6b — a foil that splits into two pictured words with no declared looksLike (pancake, taken out of the pool)
    {
      const b = clone(en); b.units = b.units.filter((u) => u.id !== 'C'); b.hubs[3].satellites = b.hubs[3].satellites.filter((x) => x !== 'pancake');
      b.foils.push({ vocabKey: 'pancake', word: 'pancake', looksLike: [] });
      if (judge('P6b', gate(b), /foil "pancake": splits into two pictured words "pan" \+ "cake" — declare looksLike/)) killed++;
    }
    // P8 — the worksheet word / a long instruction
    {
      const b = clone(en); b.strings['G2-316'].title = 'Compound Words Worksheet';
      if (judge('P8', gate(b), /title carries the worksheet word/)) killed++;
      const b2 = clone(en); b2.strings['G2-316'].instruction = 'x'.repeat(150) + '.';
      if (judge('P8b', gate(b2), /instruction > 150 chars/)) killed++;
    }
    // P9 — refuse.F1 false in en
    {
      const b = clone(en); b.refuse.F1 = false;
      if (judge('P9', gate(b), /refuse\.F1 must be true in en/)) killed++;
    }
    // P10 — a crossWords pair that joins to a pool whole
    {
      const b = clone(en); b.crossWords.push(['star', 'fish']);
      if (judge('P10', gate(b), /crossWords star\+fish joins to the pool whole "starfish"/)) killed++;
    }
    // G1 — a row stamped `sunflowers`
    {
      const rows = rowsFrom(en.units[0].items.slice(0, 8)); rows[0] = { ...rowsFrom([en.units[0].items[10]])[0], whole: 'sunflowers' };
      const { r, own } = await gateFindings(page, pageFrom(rows, 2), 2, 'G2-316-gate-poison-G1', en);
      const a = judge('G1 verify', r.verify, /whole "sunflowers" ≠ sun\+\+flower/);
      const c = judge('G1 node', own, /stamped whole "sunflowers" is not an item of set A/);
      if (a && c) killed++;
    }
    // G2 — cupcake + pancake on one page (the part `cake` twice)
    {
      const rows = rowsFrom(en.units[0].items.slice(0, 6).concat([en.units[1].items[2], en.units[2].items[0]]));
      const { r } = await gateFindings(page, pageFrom(rows, 2), 2, 'G2-316-gate-poison-G2', en);
      if (judge('G2', r.verify, /part "cake" is also on row/)) killed++;
    }
    // G7 — a B&W picture (built past the index)
    {
      let bwOk = false; try { fileUri('animals bw', 'bat'); bwOk = true; } catch (e) { /* uncached */ }
      const rows = rowsFrom(en.units[0].items.slice(0, 8));
      if (bwOk) rows[0].picA = { theme: 'animals bw', noun: 'bat' };
      const { r } = await gateFindings(page, pageFrom(rows, 2), 2, 'G2-316-gate-poison-G7', en);
      if (judge('G7', r.verify, /picture from a B&W directory "animals bw"/, bwOk ? 'animals bw/bat cached' : 'NO BW DIR CACHED — poison not applied')) killed++;
    }
    // G8 — a capital inside the join
    {
      const rows = rowsFrom(en.units[0].items.slice(0, 8)); rows[3].whole = 'basketBall';
      const { r } = await gateFindings(page, pageFrom(rows, 2), 2, 'G2-316-gate-poison-G8', en);
      if (judge('G8', r.verify, /whole "basketBall" carries a capital inside the join/)) killed++;
    }
    // GT — the whole printed on its row
    {
      const rows = rowsFrom(en.units[0].items.slice(0, 8));
      const t = pageFrom(rows, 2, { patchRow: (h, i) => (i === 2 ? h.replace(/<\/div>$/, `<span style="font-size:18px">${rows[2].whole}</span></div>`) : h) });
      const { r } = await gateFindings(page, t, 2, 'G2-316-gate-poison-GT', en);
      if (judge('GT', r.verify, /the whole "handbag" is printed on the page|row 3: prints "handbag"/)) killed++;
    }
    // GI — a 30 px picture: verify() floor + the gate's own floor
    {
      const rows = rowsFrom(en.units[0].items.slice(0, 8));
      const { r, own } = await gateFindings(page, pageFrom(rows, 2, { px: 30 }), 2, 'G2-316-gate-poison-GI', en);
      const a = judge('GI verify', r.verify, /picture 30 px < the G2 floor 36/);
      const c = judge('GI floor', own, /30 px < the G2 floor 36/);
      if (a && c) killed++;
    }
    // GO — a row whose ops read `+ +`
    {
      const rows = rowsFrom(en.units[0].items.slice(0, 8));
      const t = pageFrom(rows, 2, { patchRow: (h, i) => (i === 0 ? h.replace('data-lcs-op="="', 'data-lcs-op="+"').replace('aria-label="equals"', 'aria-label="plus"') : h) });
      const { r } = await gateFindings(page, t, 2, 'G2-316-gate-poison-GO', en);
      if (judge('GO', r.verify, /row 1: ops \+\+ ≠ \+=/)) killed++;
    }
    // GB — the d1 bank in row order
    {
      const rows = rowsFrom(en.units[0].items.slice(0, 6));
      const { r } = await gateFindings(page, pageFrom(rows, 1, { bankWords: rows.map((x) => x.whole) }), 1, 'G2-316-gate-poison-GB', en);
      if (judge('GB', r.verify, /bank is in row order/)) killed++;
    }
    // GB2 — the d1 bank missing a whole
    {
      const rows = rowsFrom(en.units[0].items.slice(0, 6));
      const words = rows.map((x) => x.whole).sort(); words[0] = 'cupcake';
      const { r } = await gateFindings(page, pageFrom(rows, 1, { bankWords: words }), 1, 'G2-316-gate-poison-GB2', en);
      if (judge('GB2', r.verify, /bank \[.*\] ≠ the wholes/)) killed++;
    }
    // GL — a lane wider than the root stamp
    {
      const rows = rowsFrom(en.units[0].items.slice(0, 8));
      const { r } = await gateFindings(page, pageFrom(rows, 2, { laneW: 380, rowLaneW: 410 }), 2, 'G2-316-gate-poison-GL', en);
      if (judge('GL', r.verify, /lane 410 px > 380/)) killed++;
    }

    console.log('renders: ' + pngs.map((p) => path.basename(p)).join(' '));

    // 5. the faces (Phase 2)
    killed += await facesSection(page, en, banks);
    console.log('poison:\n' + poisonLog.join('\n'));
    ok(killed === TOTAL, `poisons killed ${killed}/${TOTAL}`);
  } finally {
    await browser.close();
  }
  if (fails.length) console.log('FAILS:\n' + fails.join('\n'));
  console.log(fails.length ? `FAIL (${assertions} assertions, ${fails.length} failed, ${killed}/${TOTAL} poisons killed)` : `PASS (${assertions} assertions, ${killed}/${TOTAL} poisons killed)`);
  process.exit(fails.length ? 1 : 0);
}

if (require.main === module) main().catch((e) => { console.error(e); process.exit(1); });
module.exports = { validateBank, OPENED, FACE_OPENED, crossCheck, crossCheckFace, expectedWhole };
