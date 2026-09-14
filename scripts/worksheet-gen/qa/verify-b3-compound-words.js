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
  const TOTAL = 28;
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

    console.log('poison:\n' + poisonLog.join('\n'));
    ok(killed === TOTAL, `poisons killed ${killed}/${TOTAL}`);
    console.log('renders: ' + pngs.map((p) => path.basename(p)).join(' '));
  } finally {
    await browser.close();
  }
  if (fails.length) console.log('FAILS:\n' + fails.join('\n'));
  console.log(fails.length ? `FAIL (${assertions} assertions, ${fails.length} failed, ${killed}/${TOTAL} poisons killed)` : `PASS (${assertions} assertions, ${killed}/${TOTAL} poisons killed)`);
  process.exit(fails.length ? 1 : 0);
}

if (require.main === module) main().catch((e) => { console.error(e); process.exit(1); });
module.exports = { validateBank, OPENED, crossCheck, expectedWhole };
