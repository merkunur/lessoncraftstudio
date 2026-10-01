/**
 * G2-358 — Synonyms (nt10-E; family key `synonyms`, G2, letters, CCSS L.2.5
 * parent; synonyms are only NAMED at L.4.5.c).
 * Design: docs/worksheet-gen/b5-designs/G2-358-synonyms.md §2 + §5; rulings
 * _work/G2-358-critic.md; build record _work/G2-358-build.md.
 *
 * "Linked Words: eight twin cards". Eight identical cream cards in a 2 x 4
 * grid; each card is topped by a tealSoft BAND carrying the joined-rings mark
 * and ONE big target word, and under it a 2 x 2 square of four identical white
 * word TAGS. The child circles the one tag that means the same. No pictures,
 * no lines, no bank; the four tags are the same width (the grid cell), so no
 * colour, order, size or length marks the answer.
 *
 * THEME AXIS OFF (`coordinate.theme:''`); no unitAxis. build() reads ONLY its
 * bank (lib/b5-common.js bank('synonyms', loc): a missing locale block THROWS)
 * and the opposites bank (lib/b3-common.js bank('opposites', loc)) for the
 * antonym ban; every word is a whole panel-signed literal, nothing inflects.
 * Never image-vocabulary.js / objForms / approved-words at render.
 *
 * THE RULE THAT LOCKS THE TYPE (§1): a card is single-answer because exactly
 * one tag shares the target's group; no tag is an antonym of the target or the
 * answer (opposites pairs a<->b + alt, the G2-320 prefix items, and the
 * locale-neutral CONCEPTS[].opp link — the opposites bank alone would pass a
 * `gloomy` foil on a `happy` card); no tag's GROUP holds a word `near` a word
 * of the target's group; no two tags share a group; every tag has the target's
 * part of speech; at most `sameDomainMax` tags share the target's domain.
 *
 * COMPOSER (locale-neutral over CONCEPT ids): a seeded permutation of CONCEPTS;
 * the first posMix[0] adj + posMix[1] verb concepts the locale signed at a
 * configured tier become the targets (card order = draw order); per card a
 * seeded member is the target and another the answer; distractor GROUPS are
 * never a target group of the page, the words all distinct on the page. Answer
 * slots = a shuffle of the balanced multiset (each slot exactly cards/chips
 * times) re-drawn until no slot repeats on three consecutive cards.
 *
 * Ladder (resolved config; every guard keys on these keys, never the level index):
 *   d1  6 cards 2x3 · 3 tags STACKED ('3x1') · tiers [1] · 6 adj · 0 same-domain foils
 *       · target 26 / tag 20 px x 38 · rows minmax(210) (deviation: the design's 1x3
 *       row of 91.5 px tags left a 48 px blank band at the 814 chrome — SPARSE)
 *   d2  8 cards 2x4 · 4 tags 2x2 · tiers [1,2] · 5 adj + 3 verb · <= 1 same-domain foil
 *       · target 24 / tag 18 px x 36 · rows minmax(158) · row gap 10 (design 12: 4 x 158 + 3 x 12
 *       = 668 > the MEASURED 667 fi body; 4 x 158 + 3 x 10 = 662)          (ships)
 *   d3  as d2, tiers [2] · 4 adj + 4 verb · exactly 1 same-domain foil
 *
 * STAMPS: root data-lcs-type / -family / -face="base" / -cfg / -lex (the page's
 * lexicon slice: its groups, the near pairs, each printed word's antonyms, the
 * prefix items, the concept links) so verify() re-derives everything in the page;
 * card data-lcs-target="<groupId>:<word>" data-lcs-concept data-lcs-domain; tag
 * data-lcs-tag data-lcs-group data-lcs-slot. NO data-lcs-answer anywhere.
 */
'use strict';
const { bank: loadBank } = require('../../lib/b5-common.js');
const { bank: loadB3 } = require('../../lib/b3-common.js');
const C5 = require('../../templates/components-b5.js');
const tokens = require('../../primitives/_tokens.js');
const { esc } = require('../../primitives/_svg.js');
const DATA = require('../../data/b5/synonyms.js');

const ID = 'G2-358';
const KEY = 'synonyms';
const FACE_MODES = ['pictures', 'pairs', 'shades', 'say', 'fields'];
const PAGE_TRIES = 300;
const SLOT_TRIES = 400;
const SPARSE_MAX = 40;
const BODY_MIN = 667;   // measured: the longest fi chrome (4-line title + 3-line instruction) leaves 667, not the ruled 677

/** Case-folded, NFC. */
function norm(s) { return String(s).normalize('NFC').toLowerCase(); }

function stringsFor(block, mode, loc) {
  const s = block && block.strings && block.strings[mode];
  if (!s || typeof s.title !== 'string' || !s.title.trim() || typeof s.instruction !== 'string' || !s.instruction.trim()) throw new Error(`${ID}: the ${loc} bank has no strings.${mode} — refuse`);
  return s;
}

/** Antonym lookup over the opposites bank of `loc` (pairs a<->b with alt, prefix items). THROWS without the bank. */
function antonymTable(loc) {
  const ob = loadB3('opposites', loc);
  const ant = new Map();
  const add = (w, xs) => { const k = norm(w); if (!ant.has(k)) ant.set(k, new Set()); for (const x of xs) ant.get(k).add(norm(x)); };
  for (const p of ob.pairs || []) {
    const A = [p.a, ...((p.alt && p.alt.a) || [])], B = [p.b, ...((p.alt && p.alt.b) || [])];
    for (const w of A) add(w, B);
    for (const w of B) add(w, A);
  }
  const prefix = new Set(((ob.prefix && ob.prefix.items) || []).map((x) => norm(x.expected)));
  return { antonymsOf: (w) => [...(ant.get(norm(w)) || [])], prefix };
}

/** The locale's groups by concept, with the neutral concept row joined; refuses a malformed group. */
function groupsByConcept(block, loc) {
  const m = new Map();
  for (const g of block.groups || []) {
    if (!g || !g.id || !g.concept || !Array.isArray(g.words) || g.words.length < 2) throw new Error(`${ID}: the ${loc} group ${g && g.id} is malformed — refuse`);
    if (m.has(g.concept)) throw new Error(`${ID}: the ${loc} bank signs concept "${g.concept}" twice — refuse`);
    m.set(g.concept, g);
  }
  return m;
}

function nearSet(block) {
  const s = new Set();
  for (const n of block.near || []) { s.add(norm(n.a) + '|' + norm(n.b)); s.add(norm(n.b) + '|' + norm(n.a)); }
  return s;
}

function slotOrder(cfg, rng) {
  const per = cfg.cards / cfg.chips;
  const base = [];
  for (let s = 0; s < cfg.chips; s++) for (let k = 0; k < per; k++) base.push(s);
  for (let t = 0; t < SLOT_TRIES; t++) {
    const o = rng.shuffle(base);
    if (!o.some((v, i) => i >= 2 && o[i - 1] === v && o[i - 2] === v)) return o;
  }
  throw new Error(`${ID}: no slot order without a 3-in-a-row in ${SLOT_TRIES} tries`);
}

/**
 * One page draw. Returns { cards:[{target, answer, group, distractors:[{word, group}]}] } or null (retry).
 * Pure over (block, cfg, rng, lookups); no locale literal is inferred.
 */
function drawPage(block, cfg, rng, L) {
  const byConcept = L.byConcept;
  const perm = rng.shuffle(DATA.CONCEPTS.map((c) => c.id));
  const need = { adj: cfg.posMix[0], verb: cfg.posMix[1] };
  const picked = [];
  for (const cid of perm) {
    const g = byConcept.get(cid);
    if (!g || !cfg.tiers.includes(g.tier)) continue;
    if (need[g.pos] > 0) { need[g.pos]--; picked.push(g); }
  }
  if (need.adj > 0 || need.verb > 0) throw new Error(`${ID}: the ${L.loc} bank signs too few tier-${cfg.tiers.join('/')} groups for ${cfg.posMix[0]} adj + ${cfg.posMix[1]} verb targets — refuse`);
  const used = new Set();
  const cards = picked.map((g) => {
    const words = g.words.filter((w) => !L.banned.has(norm(w)));
    const ti = Math.floor(rng.next() * words.length);
    const target = words[ti];
    const rest = words.filter((_, i) => i !== ti);
    const answer = rest[Math.floor(rng.next() * rest.length)];
    used.add(norm(target)); used.add(norm(answer));
    return { g, target, answer, distractors: [] };
  });
  const targetIds = new Set(picked.map((g) => g.id));
  const conceptOpp = (a, b) => (L.opp.get(a) || []).includes(b) || (L.opp.get(b) || []).includes(a);
  const groupNear = (g1, g2) => g1.words.some((a) => g2.words.some((b) => L.near.has(norm(a) + '|' + norm(b))));
  const groupAnt = (g1, g2) => g1.words.some((a) => { const an = L.antonymsOf(a); return g2.words.some((b) => an.includes(norm(b))); });
  for (const c of cards) {
    const cands = (block.groups || []).filter((h) => h.pos === c.g.pos && !targetIds.has(h.id) && !conceptOpp(h.concept, c.g.concept) && !groupNear(h, c.g) && !groupAnt(h, c.g));
    const same = rng.shuffle(cands.filter((h) => h.domain === c.g.domain));
    const other = rng.shuffle(cands.filter((h) => h.domain !== c.g.domain));
    const nD = cfg.chips - 1;
    let wantSame = 0;
    if (cfg.sameDomainMin > 0) wantSame = cfg.sameDomainMin;
    else if (cfg.sameDomainMax > 0) wantSame = rng.next() < 0.5 ? 1 : 0;
    const order = [...same.slice(0, wantSame), ...other];
    if (wantSame === 0 && cfg.sameDomainMax > 0) order.push(...same.slice(0, cfg.sameDomainMax));   // a same-domain foil only as a fallback
    const chosen = [];
    for (const h of order) {
      if (chosen.length === nD) break;
      if (chosen.some((x) => x.group.id === h.id)) continue;
      const nSame = chosen.filter((x) => x.group.domain === c.g.domain).length;
      if (h.domain === c.g.domain && nSame >= cfg.sameDomainMax) continue;
      const free = h.words.filter((w) => !used.has(norm(w)) && !L.banned.has(norm(w)) && !L.prefix.has(norm(w)));
      if (!free.length) continue;
      const w = free[Math.floor(rng.next() * free.length)];
      chosen.push({ word: w, group: h });
      used.add(norm(w));
    }
    if (chosen.length < nD) return null;
    const nSame = chosen.filter((x) => x.group.domain === c.g.domain).length;
    if (nSame < cfg.sameDomainMin) return null;
    c.distractors = chosen;
  }
  return { cards };
}

/* ================================================================== FACES (Phase E, 2026-09-23)
 * Five CODE faces on the ONE additive knob `mode` (design §3; record _work/G2-358-faces.md).
 * A face config reaches here only through the face spec that owns its mode (DATA.FACES); the
 * base path above is untouched (tools/b3-baseline.js --check is the proof). Every guard keys on
 * the RESOLVED face config. Root stamps: data-lcs-type (the face id) / -family / -face / -mode /
 * -cfg / -lex; verify() re-derives every answer in the page (faceVerifyInPage).
 *   pictures (G1-395) 6 picture cards, circle the TWO words that name the picture (closed world)
 *   pairs    (G2-373) 8 + 8 half-ring tags, draw a line from each left word to its synonym
 *   shades   (G1-396) a strength key + 6 rows of 3 near-synonyms, number them 1 2 3 weakest -> strongest
 *   say      (G2-374) a bubble (struck "said" + 6 say verbs) over 6 sentences with one gap each
 *   fields   (G3-397) a pile of 10 verbs sorted into the fenced fields "go" / "look"
 */
const { fileUri } = require('../../lib/b2-common.js');
const { SENTENCES } = require('../../data/b2/sentences.js');
const { makeRng } = require('../../lib/rng.js');
const PAIR_SLOTS = [[0, 1], [0, 2], [0, 3], [1, 2], [1, 3], [2, 3]];
const PAIR_SLOTS5 = [[0, 1], [0, 2], [0, 3], [0, 4], [1, 2], [1, 3], [1, 4], [2, 3], [2, 4], [3, 4]];   // Level Set level 3: five tags
/** F3: the five non-identity orders (perm[col] = the rank index printed in that column). */
const NON_ID = [[0, 2, 1], [1, 0, 2], [1, 2, 0], [2, 0, 1], [2, 1, 0]];
const glyphN = (s) => [...String(s)].length;

function faceRoot(self, mode, cfg, lex, inner, style = 'flex:1 1 auto;display:flex;flex-direction:column;min-height:0') {
  return `<div data-ws-content data-lcs-type="${esc(self.id)}" data-lcs-family="${KEY}" data-lcs-face="${mode}" data-lcs-mode="${mode}" ` +
    `data-lcs-cfg="${esc(JSON.stringify({ ...cfg, sparseMax: SPARSE_MAX }))}" data-lcs-lex="${esc(JSON.stringify(lex))}" style="${style}">${inner}</div>`;
}

/** An order of 0..n-1 with no fixed point and never the exact reverse (the cloze derange rule). */
function derangeIdx(n, rng) {
  const base = Array.from({ length: n }, (_, i) => i);
  for (let t = 0; t < 500; t++) {
    const o = rng.shuffle(base);
    if (o.some((v, i) => v === i)) continue;
    if (n > 2 && o.every((v, i) => v === n - 1 - i)) continue;
    return o;
  }
  throw new Error(`${ID}: no derangement of ${n}`);
}

function lookups(block, loc) {
  const { antonymsOf, prefix } = antonymTable(loc);
  return { loc, byConcept: groupsByConcept(block, loc), near: nearSet(block), antonymsOf, prefix,
    banned: new Set((block.ban || []).map(norm)), opp: new Map(DATA.CONCEPTS.map((c) => [c.id, c.opp || []])) };
}

/* Level Set 2026-10-01: the new content (data/b5/synonyms-levelset.js) merged over the bank — read ONLY by new pages
 * (every coordinate but level 2 copy 1). The published pages keep reading the original bank, byte for byte. */
let _ls;
function levelSetData() { if (_ls === undefined) _ls = require('../../data/b5/synonyms-levelset.js'); return _ls; }
function mergedBank(loc) {
  const b = loadBank(KEY, loc);
  const x = levelSetData()[loc];
  if (!x) throw new Error(`${ID}: no Level Set content for ${loc} — refuse`);
  const say = b.fields.say;
  const newV = x.say.words, oldAlso = x.say.oldAlso || {};
  const allV = [...say.words, ...newV];
  // the fit rows run over ALL the verbs: an old sentence takes a new verb only where the authors listed it (oldAlso);
  // a new sentence fits the verb it was written for and every verb its `also` list names
  const sentences = [
    ...say.sentences.map((s) => ({ ...s, fit: { ...s.fit, ...Object.fromEntries(newV.map((v) => [v, (oldAlso[s.id] || []).includes(v)])) } })),
    ...x.say.sentences.map((s, k) => ({ id: 'ls' + (k + 1), text: s.text, plainVerbOK: true, fit: Object.fromEntries(allV.map((v) => [v, v === s.for || s.also.includes(v)])) })),
  ];
  // pictures: the published set + strong / tasty where the locale signs the group; falseOf extended over the new
  // concepts (a pair that is EXCLUSIVE never shares a page, so it is never a foil of the other)
  const byC = new Map((b.groups || []).map((g) => [g.concept, g]));
  const pics = DATA.PICTURES_LS, excl = DATA.EXCLUSIVE_LS;
  const isExcl = (a, c) => excl.some((s) => s.includes(a) && s.includes(c));
  const pictured = Object.keys(pics).filter((c) => byC.has(c) && (Array.isArray((b.falseOf || {})[c]) || !DATA.PICTURES[c]));
  const newC = pictured.filter((c) => !DATA.PICTURES[c]);
  const falseOf = { ...(b.falseOf || {}) };
  for (const c of pictured) {
    const others = DATA.PICTURES[c] ? newC : pictured;
    const add = others.filter((o) => o !== c && !isExcl(o, c)).flatMap((o) => byC.get(o).words);
    falseOf[c] = [...new Set([...(falseOf[c] || []), ...add])];
  }
  return {
    ...b,
    levelSet: true,   // a Level Set page's bank (the published pages read the original bank, without this mark)
    scales: [...(b.scales || []), ...x.scales],
    fields: { ...b.fields, say: { ...say, words: allV, sentences },
      go: { ...b.fields.go, words: [...b.fields.go.words, ...x.go] }, look: { ...b.fields.look, words: [...b.fields.look.words, ...x.look] } },
    falseOf, _pictures: pics, _exclusive: excl,
  };
}
const _merged = new Map();
function mergedBankOf(loc) { if (!_merged.has(loc)) _merged.set(loc, mergedBank(loc)); return _merged.get(loc); }
let _sys = null;
const SYS = () => (_sys = _sys || require('../../lib/synonyms-screen.js'));

/* ------------------------------------------------------------------ F1 pictures */
function buildPictures(self, block, cfg, loc, rng) {
  // the published shape is 6 cards x 4 tags; Level Set 2026-10-01 adds 4 cards x 4 tags (level 1) and 4 cards x 5 tags
  // (level 3: three foils, one from each other picture). Every card's answer slot PAIR is distinct on the page.
  const shapeOk = cfg.answers === 2 && cfg.rows * 2 === cfg.cards && ((cfg.cards === 6 && cfg.chips === 4) || (cfg.cards === 4 && (cfg.chips === 4 || cfg.chips === 5)));
  if (!shapeOk) throw new Error(`${self.id}: pictures needs 6 x 4 / 4 x 4 / 4 x 5 cards x tags with 2 answers in cards/2 rows, got ${cfg.cards}/${cfg.chips}/${cfg.answers}/${cfg.rows}`);
  if (cfg.chipH < 44 || cfg.picPx < 44) throw new Error(`${self.id}: tag ${cfg.chipH} / picture ${cfg.picPx} under the G1 floor 44`);
  if (cfg.picPx > cfg.frameH - 6) throw new Error(`${self.id}: picture ${cfg.picPx} does not fit the ${cfg.frameH} px frame`);
  if (cfg.rows * cfg.rowMin + (cfg.rows - 1) * cfg.rowGap > BODY_MIN) throw new Error(`${self.id}: stack > ${BODY_MIN}`);
  const L = lookups(block, loc);
  const falseOf = block.falseOf || {};
  // a Level Set bank carries its own picture set (the published pictures + the new ones) and exclusions
  const PICS = block._pictures || DATA.PICTURES, EXCL = block._exclusive || DATA.EXCLUSIVE;
  const pictured = Object.keys(PICS).filter((c) => L.byConcept.has(c) && Array.isArray(falseOf[c]) && PICS[c].picOpened === true);
  if (pictured.length < 8) throw new Error(`${self.id}: the ${loc} bank signs ${pictured.length} pictured concepts < 8 — refuse`);
  const excl = (a, b) => EXCL.some((s) => s.includes(a) && s.includes(b));
  const nFoil = cfg.chips - 2;
  for (let t = 0; t < PAGE_TRIES; t++) {
    const pick = [];
    let nConcept = 0;
    for (const c of rng.shuffle(pictured)) {
      if (pick.length === cfg.cards) break;
      const isFace = PICS[c].theme === 'emotions';
      if (!isFace && nConcept >= cfg.maxConcept) continue;
      if (pick.some((p) => excl(p, c))) continue;
      pick.push(c); if (!isFace) nConcept++;
    }
    if (pick.length < cfg.cards) continue;
    const ans = {};
    let bad = false;
    for (const c of pick) {
      const ws = L.byConcept.get(c).words.filter((w) => !L.banned.has(norm(w)) && glyphN(w) <= cfg.maxGlyphs);
      if (ws.length < 2) { bad = true; break; }
      ans[c] = rng.shuffle(ws).slice(0, 2);
    }
    if (bad) continue;
    // closed world: every answer word is a distractor exactly once, on another card whose falseOf lists it;
    // a card's two distractors come from two different pictures (never a second synonym pair)
    // 4 x 5 (level 3): every answer word is a foil once, and one word of each picture a second time (12 foil slots)
    const extra = nFoil === 3 ? pick.map((c) => ({ w: ans[c][Math.floor(rng.next() * 2)], owner: c })) : [];
    const pool = rng.shuffle(pick.flatMap((c) => ans[c].map((w) => ({ w, owner: c }))).concat(extra));
    const got = Object.fromEntries(pick.map((c) => [c, []]));
    const place = (i) => {
      if (i === pool.length) return true;
      const { w, owner } = pool[i];
      for (const c of rng.shuffle(pick)) {
        if (c === owner || got[c].length >= nFoil || got[c].some((x) => x.owner === owner)) continue;
        if (!falseOf[c].map(norm).includes(norm(w))) continue;
        got[c].push({ w, owner });
        if (place(i + 1)) return true;
        got[c].pop();
      }
      return false;
    };
    if (!place(0)) continue;
    const slots = rng.shuffle(cfg.chips === 5 ? PAIR_SLOTS5 : PAIR_SLOTS);
    const cards = pick.map((c, i) => {
      const g = L.byConcept.get(c);
      const dis = rng.shuffle(got[c]);
      const tags = [];
      let a = 0, k = 0;
      for (let s = 0; s < cfg.chips; s++) {
        if (slots[i].includes(s)) tags.push({ word: ans[c][a++], groupId: g.id });
        else { const x = dis[k++]; tags.push({ word: x.w, groupId: L.byConcept.get(x.owner).id }); }
      }
      const P = PICS[c];
      return C5.synPictureCard({ pic: { src: fileUri(P.theme, P.noun), theme: P.theme, noun: P.noun, concept: c, box: P.box, cue: P.cue }, groupId: g.id, tags,
        picPx: cfg.picPx, picMaxW: cfg.picMaxW, frameH: cfg.frameH, chipPx: cfg.chipPx, chipH: cfg.chipH, maxGlyphs: cfg.maxGlyphs });
    });
    const lex = {
      groups: Object.fromEntries(pick.map((c) => { const g = L.byConcept.get(c); return [g.id, { concept: c, words: g.words }]; })),
      falseOf: Object.fromEntries(pick.map((c) => [c, falseOf[c]])),
      pics: Object.fromEntries(pick.map((c) => [c, PICS[c].theme + '/' + PICS[c].noun])),
      cues: Object.fromEntries(pick.filter((c) => PICS[c].cue).map((c) => [c, PICS[c].cue])),
      exclusive: EXCL,
    };
    const grid = C5.synTwinGrid({ cards, rows: cfg.rows, rowMin: cfg.rowMin, rowGap: cfg.rowGap });
    const bodyHtml = faceRoot(self, 'pictures', pickCfg(cfg, ['cards', 'chips', 'answers', 'picPx', 'picMaxW', 'frameH', 'chipPx', 'chipH', 'maxGlyphs', 'maxConcept', 'rowMin']), lex, grid);
    return { bodyHtml, meta: { mode: 'pictures', cards: pick.map((c, i) => ({ concept: c, answers: ans[c], distractors: got[c].map((x) => x.w), slots: slots[i] })) } };
  }
  throw new Error(`${self.id}: no ${loc} pictures page in ${PAGE_TRIES} draws — refuse`);
}

function pickCfg(cfg, keys) { const o = { mode: cfg.mode }; for (const k of keys) o[k] = cfg[k]; return o; }

/* ------------------------------------------------------------------ F2 pairs */
const PAIRS_BASE_OVERLAP_MAX = 2;
/** The concepts the base page draws on the same instance (the seed string with this face's id swapped for the base's).
 *  A seed that is not an instance seed (a gate probe) has no base page: nothing to avoid. */
function baseConceptsFor(block, loc, rng) {
  const m = /^([A-Z0-9]+-\d+)\|none\|(\d)\|/.exec(String(rng.seed || ''));
  if (!m || m[1] === ID) return [];
  const base = module.exports;
  const d = base.difficulty[+m[2]] || base.difficulty[2];
  try {
    return base._buildWith(block, d, { locale: loc }, { rng: makeRng(ID + rng.seed.slice(m[1].length)) }).meta.cards.map((c) => c.concept);
  } catch (e) { return []; }
}
function buildPairs(self, block, cfg, loc, rng) {
  if (cfg.pairs < 6 || cfg.pairs > 8) throw new Error(`${self.id}: pairs ${cfg.pairs} outside 6..8`);
  if (cfg.tagH < 36) throw new Error(`${self.id}: tag ${cfg.tagH} under the G2 floor 36`);
  if (cfg.pairs * cfg.tagH + (cfg.pairs - 1) * 12 + 12 > BODY_MIN) throw new Error(`${self.id}: the two columns need more than ${BODY_MIN}`);
  if (cfg.posMix[0] + cfg.posMix[1] !== cfg.pairs) throw new Error(`${self.id}: posMix ${cfg.posMix} ≠ ${cfg.pairs} pairs`);
  const L = lookups(block, loc);
  const conceptOpp = (a, b) => (L.opp.get(a) || []).includes(b) || (L.opp.get(b) || []).includes(a);
  const groupNear = (g1, g2) => g1.words.some((a) => g2.words.some((b) => L.near.has(norm(a) + '|' + norm(b))));
  const groupAnt = (g1, g2) => g1.words.some((a) => { const an = L.antonymsOf(a); return g2.words.some((b) => an.includes(norm(b))); });
  const usable = (g) => g.words.filter((w) => !L.banned.has(norm(w)) && !L.prefix.has(norm(w)) && glyphN(w) <= cfg.maxGlyphs);
  // round 1 (2026-09-23): the SAME instance of the base (this seed with the base's type id) may share at most
  // 2 concepts with this page — a teacher printing both must not get the base's pairs back (es/it/fr panels).
  const baseConcepts = baseConceptsFor(block, loc, rng);
  for (let t = 0; t < PAGE_TRIES; t++) {
    const need = { adj: cfg.posMix[0], verb: cfg.posMix[1] };
    const picked = [];
    for (const cid of rng.shuffle(DATA.CONCEPTS.map((c) => c.id))) {
      const g = L.byConcept.get(cid);
      if (!g || !cfg.tiers.includes(g.tier) || !(need[g.pos] > 0) || usable(g).length < 2) continue;
      if (picked.some((h) => conceptOpp(h.concept, g.concept) || groupNear(h, g) || groupAnt(h, g))) continue;
      if (picked.filter((h) => h.domain === g.domain).length >= cfg.sameDomainMax) continue;
      need[g.pos]--; picked.push(g);
    }
    if (need.adj > 0 || need.verb > 0) continue;
    if (picked.filter((g) => baseConcepts.includes(g.concept)).length > PAIRS_BASE_OVERLAP_MAX) continue;
    const order = rng.shuffle(picked);
    const pairs = order.map((g) => { const ws = rng.shuffle(usable(g)); return { g, left: ws[0], right: ws[1] }; });
    const rOrder = derangeIdx(pairs.length, rng);   // rOrder[k] = the left row whose partner sits in right row k
    const left = pairs.map((p) => ({ word: p.left, groupId: p.g.id }));
    const right = rOrder.map((i) => ({ word: pairs[i].right, groupId: pairs[i].g.id }));
    const printed = [...left, ...right].map((x) => x.word);
    const lex = {
      groups: Object.fromEntries(picked.map((g) => [g.id, { concept: g.concept, pos: g.pos, domain: g.domain, words: g.words }])),
      near: (block.near || []).map((n) => [n.a, n.b]),
      ant: Object.fromEntries(printed.map((w) => [w, L.antonymsOf(w)])),
      prefix: [...L.prefix],
      opp: Object.fromEntries(DATA.CONCEPTS.map((c) => [c.id, c.opp || []])),
    };
    const html = C5.synPairMatch({ left, right, w: cfg.tagW, h: cfg.tagH, wordPx: cfg.wordPx });
    const bodyHtml = faceRoot(self, 'pairs', pickCfg(cfg, ['pairs', 'tagW', 'tagH', 'wordPx', 'maxGlyphs', 'sameDomainMax']), lex, html);
    return { bodyHtml, meta: { mode: 'pairs', left: left.map((x) => x.word), right: right.map((x) => x.word), rOrder } };
  }
  throw new Error(`${self.id}: no ${loc} pairs page in ${PAGE_TRIES} draws (too few compatible groups) — refuse`);
}

/* ------------------------------------------------------------------ F3 shades */
function shadeOrders(rows, rng) {
  // rows permutations of 0..2, none the identity, each rank in each column exactly rows/3 times,
  // the exact reverse at most 2 times, no order on more than ceil(rows/3) rows, and no two ADJACENT rows
  // sharing an order (landing review 2026-09-23: orders repeated in pairs down the page, so row 1 answered row 2)
  if (rows % 3 !== 0) throw new Error(`${ID}: shades rows ${rows} is not a multiple of 3 (column balance)`);
  const per = rows / 3, cap = Math.ceil(rows / 3);
  for (let t = 0; t < 400; t++) {
    const out = [];
    const cnt = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    const go = () => {
      if (out.length === rows) return true;
      for (const p of rng.shuffle(NON_ID)) {
        if (p.some((r, c) => cnt[c][r] >= per)) continue;
        if (out.filter((q) => q.join() === p.join()).length >= cap) continue;
        if (out.length && out[out.length - 1].join() === p.join()) continue;
        if (p.join() === '2,1,0' && out.filter((q) => q.join() === '2,1,0').length >= 2) continue;
        out.push(p); p.forEach((r, c) => cnt[c][r]++);
        if (go()) return true;
        out.pop(); p.forEach((r, c) => cnt[c][r]--);
      }
      return false;
    };
    // ...and the page is not PERIODIC (rows 4-6 re-printing rows 1-3 in the same orders: the shipped en page did)
    const periodic = (o) => [...Array(Math.floor(o.length / 2)).keys()].map((q) => q + 1).some((q) => o.length % q === 0 && o.every((x, i) => i < q || x.join() === o[i - q].join()));
    if (go() && !periodic(out)) return out;
  }
  throw new Error(`${ID}: no balanced shade orders for ${rows} rows`);
}
function buildShades(self, block, cfg, loc, rng) {
  if (cfg.perRow !== 3) throw new Error(`${self.id}: perRow ${cfg.perRow} (3-step scales only)`);
  if (cfg.chipH < 44) throw new Error(`${self.id}: tag ${cfg.chipH} under the G1 floor 44`);
  const laneH = cfg.chipH + 4 + cfg.box[1] + 5 + 8 + 4;   // the open box carries a 2.5 px border on each side (content-box)
  if (56 + 8 + cfg.rows * laneH + (cfg.rows - 1) * 4 > BODY_MIN) throw new Error(`${self.id}: the stack ${56 + 8 + cfg.rows * laneH + (cfg.rows - 1) * 4} > ${BODY_MIN}`);
  const L = lookups(block, loc);
  const scales = (block.scales || []).filter((s) => Array.isArray(s.words) && s.words.length === 3 && s.words.every((w) => !L.banned.has(norm(w)) && glyphN(w) <= cfg.maxGlyphs));
  if (scales.length < 8) throw new Error(`${self.id}: the ${loc} bank signs ${scales.length} three-step scales < 8 — refuse`);
  const pick = rng.shuffle(scales).slice(0, cfg.rows);
  const orders = cfg.forceOrders ? cfg.forceOrders.map((o) => o.slice()) : shadeOrders(cfg.rows, rng);   // forceOrders: gate poison seam only
  const rows = pick.map((s, i) => C5.synShadeRow({ scaleId: s.id, cells: orders[i].map((r) => ({ word: s.words[r], rank: r + 1 })), chipPx: cfg.chipPx, chipH: cfg.chipH, box: cfg.box, maxGlyphs: cfg.maxGlyphs }));
  const lex = { scales: Object.fromEntries(pick.map((s) => [s.id, s.words])) };
  // Level Set level 3 (noKey): no strength-key banner — the child orders the words from their meaning alone
  const inner = (cfg.noKey ? '' : `<div data-lcs-key-wrap style="flex:0 0 auto;display:flex;justify-content:center;margin-bottom:8px">${C5.synStrengthKey()}</div>`) +
    `<div data-lcs-shade-rows style="flex:1 1 auto;min-height:0;display:flex;flex-direction:column;gap:4px">${rows.join('')}</div>`;
  const bodyHtml = faceRoot(self, 'shades', pickCfg(cfg, ['rows', 'perRow', 'chipPx', 'chipH', 'box', 'maxGlyphs', 'noKey']), lex, inner);
  return { bodyHtml, meta: { mode: 'shades', rows: pick.map((s, i) => ({ id: s.id, order: orders[i] })) } };
}

/* ------------------------------------------------------------------ F4 say */
function buildSay(self, block, cfg, loc, rng) {
  const say = block.fields && block.fields.say;
  if (!say || !Array.isArray(say.words) || !Array.isArray(say.sentences)) throw new Error(`${self.id}: the ${loc} bank has no fields.say — refuse`);
  // the bank IS the row answers, plus (Level Set level 3) `decoys` words that fit none of the page's sentences
  const decoys = cfg.decoys || 0;
  if (cfg.bank !== cfg.rows + decoys) throw new Error(`${self.id}: bank ${cfg.bank} ≠ rows ${cfg.rows} + decoys ${decoys}`);
  if (139 + cfg.rows * 78 + (cfg.rows - 1) * 8 > BODY_MIN) throw new Error(`${self.id}: the stack > ${BODY_MIN}`);
  // a Level Set bank keeps only the words that fit the gap (the published bank's words all do)
  const sayWords = block.levelSet ? say.words.filter((w) => glyphN(w) <= cfg.maxGlyphs) : say.words;
  if (sayWords.length < cfg.bank) throw new Error(`${self.id}: the ${loc} say field has ${sayWords.length} words < ${cfg.bank} — refuse`);
  const names = (SENTENCES[loc] && SENTENCES[loc].names) || null;
  if (!names || names.length < cfg.rows) throw new Error(`${self.id}: no ${loc} names in data/b2/sentences.js — refuse`);
  for (let t = 0; t < PAGE_TRIES; t++) {
    const words = rng.shuffle(sayWords).slice(0, cfg.rows);
    const chosen = [];
    let ok = true;
    for (const w of words) {
      const c = say.sentences.filter((s) => s.fit && s.fit[w] === true && words.filter((v) => s.fit[v] === true).length === 1);
      if (!c.length) { ok = false; break; }
      chosen.push({ s: c[Math.floor(rng.next() * c.length)], w });
    }
    if (!ok) continue;
    const rowsDraw = rng.shuffle(chosen);
    const nm = rng.shuffle(names);
    const maxG = Math.max(...words.map(glyphN));
    if (maxG > cfg.maxGlyphs) throw new Error(`${self.id}: a say word has ${maxG} glyphs > ${cfg.maxGlyphs} — refuse`);
    const gapW = Math.min(300, Math.max(150, Math.round(1.6 * 10 * maxG + 24)));
    const rows = rowsDraw.map((r, i) => {
      const text = r.s.text.split('{name}').join(nm[i]);
      if ((text.match(/\{gap\}/g) || []).length !== 1) throw new Error(`${self.id}: sentence ${r.s.id} carries {gap} ≠ once`);
      const [pre, post] = text.split('{gap}');
      return C5.synSayRow({ n: i + 1, sentenceId: r.s.id, pre, post, answer: r.w, gapW, fontPx: cfg.fontPx });
    });
    const bOrder = derangeIdx(rowsDraw.length, rng);
    let bankWords = bOrder.map((i) => rowsDraw[i].w);
    if (decoys) {
      // a decoy fits NONE of the chosen sentences (so every row still has exactly one bank word)
      const pool = rng.shuffle(sayWords.filter((w) => !words.includes(w) && chosen.every((c) => c.s.fit[w] !== true)));
      if (pool.length < decoys) continue;
      for (const w of pool.slice(0, decoys)) { const at = 1 + Math.floor(rng.next() * bankWords.length); bankWords = bankWords.slice(0, at).concat([w], bankWords.slice(at)); }
    }
    let bubble;
    try { bubble = C5.synSayBubble({ head: say.head, words: bankWords, wordPx: cfg.bankPx }); } catch (e) { if (decoys) continue; throw e; }
    const lex = { head: say.head, form: say.form, words: say.words, fit: Object.fromEntries(rowsDraw.map((r) => [r.s.id, r.s.fit])) };
    const inner = bubble + `<div data-lcs-say-rows style="flex:1 1 auto;min-height:0;display:flex;flex-direction:column;gap:8px">${rows.join('')}</div>`;
    const bodyHtml = faceRoot(self, 'say', pickCfg(cfg, ['rows', 'bank', 'decoys', 'fontPx', 'bankPx', 'maxGlyphs']), lex, inner);
    return { bodyHtml, meta: { mode: 'say', rows: rowsDraw.map((r) => ({ id: r.s.id, answer: r.w })), bank: bankWords, gapW, ...(block.levelSet ? { names: nm.slice(0, rowsDraw.length) } : {}) } };
  }
  throw new Error(`${self.id}: no ${loc} say page in ${PAGE_TRIES} draws (the fit matrix admits no ${cfg.rows} x ${cfg.rows} permutation) — refuse`);
}

/* ------------------------------------------------------------------ F5 fields */
/** F5: the pile's rows, greedy-packed with a CONSERVATIVE Nunito 800 estimate (0.6 em a glyph; measured
 *  0.52 em for ausgezeichnet at 18 px) + the .ws-bankword padding 28 + border 4, gap 10, in the banner's
 *  646 px inner (675 - 2 x 12 padding - 2 x 2.5 border). */
function pileRows(words, px) {
  let rows = 1, x = 0;
  for (const w of words) { const pw = 32 + 0.6 * px * glyphN(w); if (x && x + 10 + pw > 646) { rows++; x = pw; } else x = x ? x + 10 + pw : pw; }
  return rows;
}
function buildFields(self, block, cfg, loc, rng) {
  const F = block.fields || {};
  if (!Array.isArray(cfg.fields) || cfg.fields.length !== 2) throw new Error(`${self.id}: fields ${cfg.fields} (two plots)`);
  if (!Array.isArray(block.quotes) || block.quotes.length !== 2) throw new Error(`${self.id}: the ${loc} bank has no quotes — refuse`);
  const L = lookups(block, loc);
  const lists = cfg.fields.map((k) => {
    const f = F[k];
    if (!f || !f.head || !Array.isArray(f.words)) throw new Error(`${self.id}: the ${loc} bank has no fields.${k} — refuse`);
    const ws = f.words.filter((w) => !L.banned.has(norm(w)) && glyphN(w) <= cfg.maxGlyphs);
    if (ws.length < 8) throw new Error(`${self.id}: fields.${k} has ${ws.length} usable words < 8 — refuse`);
    return ws;
  });
  // the stack: pile <= pileRowsMax rows (40 + 8 each, banner 6 + 2.5 border, 12 below) + fence 18 + sign 4 + 40 + 4 + the rows + 6 + 4
  const pileH = cfg.pileRowsMax * 40 + (cfg.pileRowsMax - 1) * 10 + 16 + 5 + 12;
  const plotH = 18 + 44 + 4 + cfg.plotRows * cfg.rowH + (cfg.plotRows - 1) * 6 + 4;
  if (pileH + plotH > BODY_MIN) throw new Error(`${self.id}: the stack ${pileH} + ${plotH} > ${BODY_MIN}`);
  const [lo, hi] = cfg.split;
  if (lo + hi !== cfg.words || lo > hi) throw new Error(`${self.id}: split ${cfg.split} ≠ ${cfg.words} words`);
  for (let t = 0; t < PAGE_TRIES; t++) {
    const k = lo + Math.floor(rng.next() * (hi - lo + 1));
    const a = rng.shuffle(lists[0]).slice(0, k).map((w) => ({ word: w, field: cfg.fields[0] }));
    const b = rng.shuffle(lists[1]).slice(0, cfg.words - k).map((w) => ({ word: w, field: cfg.fields[1] }));
    const pile = rng.shuffle([...a, ...b]);
    if (pile.some((x, i) => i >= 3 && pile.slice(i - 3, i + 1).every((y) => y.field === x.field))) continue;
    if (pileRows(pile.map((x) => x.word), cfg.wordPx) > cfg.pileRowsMax) continue;   // refuse a 4th row: redraw, never shrink
    const plots = cfg.fields.map((f) => C5.synFieldPlot({ fieldId: f, head: F[f].head, quotes: block.quotes, rows: cfg.plotRows, rowH: cfg.rowH, glyphH: cfg.glyphH }));
    const lex = { fields: Object.fromEntries(cfg.fields.map((f) => [f, { head: F[f].head, words: F[f].words }])), quotes: block.quotes };
    const inner = C5.synWordPile({ words: pile, wordPx: cfg.wordPx }) + `<div data-lcs-plots style="flex:1 1 auto;min-height:0;display:flex;gap:16px">${plots.join('')}</div>`;
    const bodyHtml = faceRoot(self, 'fields', pickCfg(cfg, ['words', 'fields', 'split', 'plotRows', 'rowH', 'glyphH', 'pileRowsMax', 'wordPx', 'maxGlyphs']), lex, inner);
    return { bodyHtml, meta: { mode: 'fields', pile: pile.map((x) => x.word + ':' + x.field), split: [k, cfg.words - k], ...(block.levelSet ? { fields: cfg.fields } : {}) } };
  }
  throw new Error(`${self.id}: no ${loc} pile without a 4-run within ${cfg.pileRowsMax} rows in ${PAGE_TRIES} draws — refuse (shorter field words, never a smaller pill)`);
}

function buildFace(block, d, loc, ctx) {
  stringsFor(block, d.mode, loc);
  if ((block.refuse || []).includes(d.mode)) throw new Error(`${this.id}: the ${loc} bank refuses the ${d.mode} face — refuse`);
  const B = { pictures: buildPictures, pairs: buildPairs, shades: buildShades, say: buildSay, fields: buildFields }[d.mode];
  return B(this, block, { ...d }, loc, ctx.rng);
}

/**
 * The in-page verify for the five faces (serialised by puppeteer: no closures, no require).
 * Re-derives every answer from the stamps + the page's lexicon slice.
 */
function faceVerifyInPage({ MIN_TEXT }) {
  const f = [];
  const root = document.querySelector('[data-lcs-family="synonyms"]');
  if (!root) return ['no root'];
  const mode = root.getAttribute('data-lcs-face');
  if (root.getAttribute('data-lcs-mode') !== mode) f.push('data-lcs-mode ≠ data-lcs-face');
  let cfg, lex;
  try { cfg = JSON.parse(root.dataset.lcsCfg); lex = JSON.parse(root.dataset.lcsLex); } catch (e) { return ['unreadable cfg / lex stamp']; }
  const n = (s) => String(s).normalize('NFC').toLowerCase();
  const R = (e) => e.getBoundingClientRect();
  const txt = (e) => e.textContent.trim();
  const reWord = (w) => new RegExp('(?<!\\p{L})' + n(w).replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?!\\p{L})', 'u');
  // shared floors: text, everything inside the body
  root.querySelectorAll('*').forEach((el) => {
    if (el.closest('.ws-card-badge') || el.closest('[data-lcs-disc]')) return;
    if ([...el.childNodes].some((x) => x.nodeType === 3 && x.textContent.trim())) {
      const px = parseFloat(getComputedStyle(el).fontSize);
      if (px < MIN_TEXT - 0.01) f.push(`text "${txt(el).slice(0, 20)}" at ${px} px < ${MIN_TEXT}`);
    }
  });
  const tagFloor = (els, h, what, noScroll) => { for (const t of els) { const r = R(t); if (r.height < h - 0.5) f.push(`${what} "${txt(t)}" ${r.height.toFixed(1)} px high < ${h}`); if (!noScroll && t.scrollWidth > t.clientWidth + 0.5) f.push(`${what} "${txt(t)}" overflows its box`); } };

  if (mode === 'pictures') {
    const cards = [...root.querySelectorAll('section.ws-card')];
    if (cards.length !== cfg.cards) f.push(`${cards.length} cards ≠ ${cfg.cards}`);
    const count = new Map();
    const pairs = new Set();
    const concepts = [];
    cards.forEach((card, ci) => {
      const tag = `card ${ci + 1}`;
      const pc = card.querySelector('[data-lcs-piccard]');
      if (!pc) { f.push(`${tag}: no picture card`); return; }
      const c = pc.dataset.lcsConcept, gid = pc.dataset.lcsGroup;
      concepts.push(c);
      if (lex.pics[c] !== pc.dataset.lcsPic) f.push(`${tag}: picture ${pc.dataset.lcsPic} ≠ the bank picture of ${c} (${lex.pics[c]})`);
      const img = card.querySelector('img[data-lcs-pic-img]');
      if (!img || !decodeURIComponent(img.src).endsWith('/' + lex.pics[c] + '@3x.webp')) f.push(`${tag}: img src is not the bank picture ${lex.pics[c]}`);
      if (img) {
        // the picture is fitted by its DRAWN content: the content's short side >= the G1 floor 44 and the
        // content fills its binding dimension (>= 90 % of picPx high or of picMaxW wide)
        const bx = (img.dataset.lcsPicBox || '0,0,1,1').split(',').map(Number);
        const iw = R(img).width, ih = R(img).height;
        const cw = iw * (bx[2] - bx[0]), chh = Math.min(ih, iw * (bx[3] - bx[1]));
        if (Math.min(cw, chh) < 44 - 0.5) f.push(`${tag}: the picture's drawn content is ${cw.toFixed(0)} x ${chh.toFixed(0)} px (short side < 44)`);
        if (chh < 0.9 * cfg.picPx - 0.5 && cw < 0.9 * cfg.picMaxW - 0.5) f.push(`${tag}: the picture is not fitted to the frame (${cw.toFixed(0)} x ${chh.toFixed(0)} px; want >= 90 % of ${cfg.picPx} high or ${cfg.picMaxW} wide)`);
        if (getComputedStyle(img).objectFit !== 'cover') f.push(`${tag}: the picture is letterboxed (object-fit ${getComputedStyle(img).objectFit})`);
      }
      if (!card.querySelector('svg[data-lcs-same-link]')) f.push(`${tag}: no rings mark`);
      // the sleep cue (landing review 2026-09-23): the tired face carries the zzz mark, drawn inside its frame
      // beside (not over) the face and >= 16 px tall; no other face carries one
      {
        const cues = [...card.querySelectorAll('svg[data-lcs-cue]')];
        const want = (lex.cues || {})[c];
        if (c === 'tired' && want !== 'zzz') f.push(`${tag}: the tired face is stamped without its zzz sleep cue`);
        if (want && cues.length !== 1) f.push(`${tag}: the ${c} face shows ${cues.length} sleep cues ≠ 1 (a tired face without zzz reads as sad)`);
        if (!want && cues.length) f.push(`${tag}: a sleep cue on the ${c} face (only the tired face carries one)`);
        if (cues.length === 1 && img) {
          const q = R(cues[0]), fr = R(card.querySelector('[data-lcs-picframe]')), im = R(img);
          if (q.height < 16 - 0.5) f.push(`${tag}: the sleep cue is ${q.height.toFixed(0)} px tall < 16`);
          if (q.left < fr.left || q.right > fr.right || q.top < fr.top || q.bottom > fr.bottom) f.push(`${tag}: the sleep cue leaves its frame`);
          if (q.left < im.right - 0.5) f.push(`${tag}: the sleep cue sits over the face`);
          const rg = R(card.querySelector('svg[data-lcs-same-link]'));
          if (rg && q.right > rg.left - 2 && q.top < rg.bottom) f.push(`${tag}: the sleep cue collides with the rings mark`);
        }
      }
      const tags = [...card.querySelectorAll('[data-lcs-tag]')];
      if (tags.length !== cfg.chips) f.push(`${tag}: ${tags.length} tags ≠ ${cfg.chips}`);
      tagFloor(tags, cfg.chipH, `${tag} tag`);
      const hits = tags.filter((t) => t.dataset.lcsGroup === gid);
      if (hits.length !== 2) f.push(`${tag}: ${hits.length} tags name the picture (want exactly 2)`);
      const G = lex.groups[gid];
      for (const h of hits) if (!G || !G.words.includes(txt(h))) f.push(`${tag}: "${txt(h)}" is not a word of ${gid}`);
      pairs.add(hits.map((h) => +h.dataset.lcsSlot).sort().join(''));
      const foils = tags.filter((t) => t.dataset.lcsGroup !== gid);
      const owners = new Set();
      for (const t of foils) {
        const H = lex.groups[t.dataset.lcsGroup];
        if (!H) { f.push(`${tag}: foil "${txt(t)}" is not a word of another picture on the page`); continue; }
        if (!H.words.includes(txt(t))) f.push(`${tag}: foil "${txt(t)}" not in its group`);
        if (!(lex.falseOf[c] || []).map(n).includes(n(txt(t)))) f.push(`${tag}: foil "${txt(t)}" is not in falseOf.${c}`);
        owners.add(t.dataset.lcsGroup);
      }
      if (owners.size !== foils.length) f.push(`${tag}: its two foils come from one picture (a second synonym pair)`);
      for (const t of tags) count.set(n(txt(t)), (count.get(n(txt(t))) || 0) + 1);
      if (card.scrollHeight > card.clientHeight + 0.5) f.push(`${tag}: the card clips`);
    });
    // closed world: 4 tags -> every word exactly twice; 5 tags (level 3) -> twice or three times (no word printed once)
    for (const [w, k] of count) if (cfg.chips === 5 ? (k < 2 || k > 3) : k !== 2) f.push(`"${w}" printed ${k} times (the closed world prints every word ${cfg.chips === 5 ? 'two or three times' : 'exactly twice'})`);
    for (const set of lex.exclusive) if (set.filter((x) => concepts.includes(x)).length > 1) f.push(`EXCLUSIVE: ${set.join(' + ')} on one page`);
    if (pairs.size !== cfg.cards) f.push(`answer slot pairs ${[...pairs].join(',')} — a different pair on every card (per-page position tell)`);
  } else if (mode === 'pairs') {
    const L = [...root.querySelectorAll('[data-lcs-match-left]')], Rt = [...root.querySelectorAll('[data-lcs-match-right]')];
    if (L.length !== cfg.pairs || Rt.length !== cfg.pairs) f.push(`${L.length} / ${Rt.length} tags ≠ ${cfg.pairs}`);
    const near = new Set(lex.near.flatMap(([a, b]) => [n(a) + '|' + n(b), n(b) + '|' + n(a)]));
    const all = [...L, ...Rt].map((e) => txt(e));
    if (new Set(all.map(n)).size !== all.length) f.push('a word printed twice');
    const lg = L.map((e) => e.dataset.lcsMatchLeft);
    if (new Set(lg).size !== lg.length) f.push('two left tags share a group');
    L.forEach((e, i) => {
      const w = txt(e), gid = e.dataset.lcsMatchLeft, G = lex.groups[gid];
      if (!G || !G.words.includes(w)) f.push(`left "${w}" is not a word of ${gid}`);
      const partners = Rt.filter((r) => r.dataset.lcsMatchRight === gid || near.has(n(w) + '|' + n(txt(r))) || (G && G.words.some((x) => near.has(n(x) + '|' + n(txt(r))))));
      if (partners.length !== 1) f.push(`left "${w}" has ${partners.length} partners on the right (${partners.map(txt).join(', ')})`);
      const j = Rt.findIndex((r) => r.dataset.lcsMatchRight === gid);
      if (j === i) f.push(`left "${w}" sits level with its partner (row ${i + 1}: not a derangement)`);
      if (j >= 0 && txt(Rt[j]) === w) f.push(`"${w}" is its own partner`);
    });
    if (Rt.every((r, k) => r.dataset.lcsMatchRight === lg[lg.length - 1 - k])) f.push('the right column is the exact reverse of the left');
    for (const a of all) for (const b of all) if (a !== b && (lex.ant[a] || []).map(n).includes(n(b))) f.push(`"${a}" and "${b}" are antonyms on one page`);
    for (const a of lg) for (const b of lg) if (a !== b) { const A = lex.groups[a], B = lex.groups[b]; if (A && B && (lex.opp[A.concept] || []).includes(B.concept)) f.push(`${A.concept} and ${B.concept} are opposite concepts on one page`); }
    for (const w of all) if (lex.prefix.map(n).includes(n(w))) f.push(`"${w}" is a prefix antonym`);
    const ws = new Set([...L, ...Rt].map((e) => Math.round(R(e).width)));
    if (ws.size !== 1) f.push(`the tags differ in width (${[...ws].join(', ')})`);
    tagFloor([...L, ...Rt], 36, 'tag', true);   // the match dot sits outside the tag (absolute), so scrollWidth is not the overflow measure here
    for (const e of [...L, ...Rt]) { const s = e.querySelector('[data-lcs-link-word]'); if (s && R(s).right > R(e).right - 2) f.push(`"${txt(e)}" runs into its tag edge`); }
    if (root.querySelectorAll('.ws-match-dot').length !== 2 * cfg.pairs) f.push('match dots ≠ one per tag');
    if (root.querySelectorAll('svg[data-lcs-half-ring]').length !== 2 * cfg.pairs) f.push('half-rings ≠ one per tag');
  } else if (mode === 'shades') {
    const keys = root.querySelectorAll('svg[data-lcs-strength-key]');
    if (keys.length !== (cfg.noKey ? 0 : 1)) f.push(`${keys.length} strength keys ≠ ${cfg.noKey ? 0 : 1}`);
    const rows = [...root.querySelectorAll('[data-lcs-scale]')];
    if (rows.length !== cfg.rows) f.push(`${rows.length} rows ≠ ${cfg.rows}`);
    const col = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    let rev = 0;
    const seen = new Set();
    rows.forEach((row, ri) => {
      const S = lex.scales[row.dataset.lcsScale];
      if (!S) { f.push(`row ${ri + 1}: scale ${row.dataset.lcsScale} not in the lexicon`); return; }
      if (seen.has(row.dataset.lcsScale)) f.push(`row ${ri + 1}: scale twice`); seen.add(row.dataset.lcsScale);
      const words = [...row.querySelectorAll('[data-lcs-shade-word]')].map(txt);
      const boxes = [...row.querySelectorAll('[data-lcs-rank-box]')];
      if (words.length !== 3 || boxes.length !== 3) { f.push(`row ${ri + 1}: ${words.length} words / ${boxes.length} boxes`); return; }
      const ranks = words.map((w) => S.indexOf(w));
      if (ranks.some((r) => r < 0)) f.push(`row ${ri + 1}: a word is not in its scale`);
      boxes.forEach((b, i) => { if (b.dataset.lcsAnswer !== String(ranks[i] + 1)) f.push(`row ${ri + 1}: box ${i + 1} stamps ${b.dataset.lcsAnswer} ≠ rank ${ranks[i] + 1}`); if (b.textContent.trim()) f.push(`row ${ri + 1}: a box is not empty`); if (R(b).height < 32 - 0.5) f.push(`row ${ri + 1}: box < 32 high`); });
      if (ranks.join() === '0,1,2') f.push(`row ${ri + 1}: printed in the stored weakest -> strongest order`);
      if (ranks.join() === '2,1,0') rev++;
      ranks.forEach((r, c) => { if (r >= 0) col[c][r]++; });
      tagFloor([...row.querySelectorAll('[data-lcs-shade-word]')], 44, `row ${ri + 1} tag`);
    });
    const per = cfg.rows / 3;
    col.forEach((c, ci) => c.forEach((k, r) => { if (k !== per) f.push(`column ${ci + 1} holds rank ${r + 1} ${k} times ≠ ${per} (a column must never be "always the strongest")`); }));
    if (rev > 2) f.push(`the exact reverse on ${rev} rows > 2`);
    // order tells (landing review 2026-09-23): re-read each row's printed order off the words
    const ords = rows.map((row) => { const S = lex.scales[row.dataset.lcsScale] || []; return [...row.querySelectorAll('[data-lcs-shade-word]')].map((w) => S.indexOf(txt(w))).join(','); });
    ords.forEach((o, i) => { if (i && o === ords[i - 1]) f.push(`rows ${i} and ${i + 1} share the answer order ${o} (adjacent-order tell)`); });
    const oc = {}; ords.forEach((o) => { oc[o] = (oc[o] || 0) + 1; });
    const ocap = Math.ceil(cfg.rows / 3);
    for (const [o, k] of Object.entries(oc)) if (k > ocap) f.push(`the answer order ${o} is used by ${k} rows > ${ocap} (repeated-order tell)`);
    for (let q = 1; q <= ords.length / 2; q++) if (ords.length % q === 0 && ords.every((o, i) => i < q || o === ords[i - q])) { f.push(`the answer orders repeat every ${q} rows (${ords.join(' ')}; periodic-order tell)`); break; }
    // no digit outside the key
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    for (let x = walker.nextNode(); x; x = walker.nextNode()) if (/\d/.test(x.textContent) && !x.parentElement.closest('[data-lcs-strength-key]')) f.push(`a digit printed outside the key ("${x.textContent.trim()}")`);
  } else if (mode === 'say') {
    const bubble = root.querySelector('[data-lcs-bank-banner]');
    const pills = bubble ? [...bubble.querySelectorAll('[data-lcs-bank-word]')].map(txt) : [];
    const heads = root.querySelectorAll('[data-lcs-head]');
    if (heads.length !== 1 || txt(heads[0]) !== lex.head) f.push(`the struck head is not printed exactly once as "${lex.head}"`);
    const rows = [...root.querySelectorAll('[data-lcs-say-row]')];
    if (rows.length !== cfg.rows) f.push(`${rows.length} rows ≠ ${cfg.rows}`);
    const answers = [];
    const widths = new Set();
    rows.forEach((row, ri) => {
      const gaps = row.querySelectorAll('[data-lcs-gapbox]');
      if (gaps.length !== 1) { f.push(`row ${ri + 1}: ${gaps.length} gap boxes ≠ 1`); return; }
      const g = gaps[0], a = g.dataset.lcsAnswer;
      answers.push(a);
      widths.add(Math.round(R(g).width));
      if (R(g).height < 40 - 0.5) f.push(`row ${ri + 1}: gap box < 40 high`);
      if (g.textContent.trim()) f.push(`row ${ri + 1}: the gap box is not empty`);
      const fit = lex.fit[row.dataset.lcsSentenceId];
      if (!fit) { f.push(`row ${ri + 1}: sentence ${row.dataset.lcsSentenceId} not in the lexicon`); return; }
      if (fit[a] !== true) f.push(`row ${ri + 1}: the stamped answer "${a}" is not the fit cell of ${row.dataset.lcsSentenceId}`);
      const others = pills.filter((p) => p !== a && fit[p] === true);
      if (others.length) f.push(`row ${ri + 1}: the bank word(s) ${others.join(', ')} also fit (not a permutation)`);
      const p = row.querySelector('p[data-lcs-sentence]');
      const s = n(p.textContent);
      for (const w of [...lex.words, lex.head]) if (reWord(w).test(s)) f.push(`row ${ri + 1}: "${w}" printed in the sentence`);
      const rr = document.createRange(); rr.selectNodeContents(p);
      const tops = []; for (const q of rr.getClientRects()) { if (q.width < 1 || q.height < 1) continue; const l = tops.find((t) => q.top < t.b - 2 && q.bottom > t.t + 2); if (l) { l.t = Math.min(l.t, q.top); l.b = Math.max(l.b, q.bottom); } else tops.push({ t: q.top, b: q.bottom }); }
      if (tops.length > 2) f.push(`row ${ri + 1}: the sentence runs to ${tops.length} lines > 2`);
    });
    if (widths.size !== 1) f.push(`gap boxes of ${widths.size} widths (${[...widths].join(', ')}) — one width per page`);
    const dec = cfg.decoys || 0;   // Level Set level 3: words that fit no row
    if (pills.length !== answers.length + dec || !answers.every((a) => pills.includes(a))) f.push(`the bank [${pills}] ≠ the row answers [${answers}] + ${dec} decoys`);
    for (const p of pills.filter((x) => !answers.includes(x))) for (const row of rows) { const fit = lex.fit[row.dataset.lcsSentenceId]; if (fit && fit[p] === true) f.push(`decoy "${p}" fits row ${row.dataset.lcsSayRow}`); }
    if (!dec && pills.some((p, i) => p === answers[i])) f.push('a bank word sits at its own row\'s position (the bank order must be a derangement)');
    if (pills.length > 2 && pills.every((p, i) => p === answers[answers.length - 1 - i])) f.push('the bank is the exact reverse of the rows');
    if (pills.includes(lex.head)) f.push('the struck head is a bank word');
    if (bubble) { const rows2 = []; for (const e of bubble.querySelectorAll('[data-lcs-bank-word], [data-lcs-head]')) { const c = (R(e).top + R(e).bottom) / 2; if (!rows2.some((y) => Math.abs(y - c) < 12)) rows2.push(c); } if (rows2.length > 2) f.push(`the bubble wraps to ${rows2.length} rows > 2`); }
    tagFloor([...root.querySelectorAll('[data-lcs-bank-word]')], 36, 'bank pill');
  } else if (mode === 'fields') {
    const pills = [...root.querySelectorAll('[data-lcs-pile] [data-lcs-bank-word]')];
    if (pills.length !== cfg.words) f.push(`${pills.length} pile words ≠ ${cfg.words}`);
    const counts = {};
    const fields = Object.keys(lex.fields);
    pills.forEach((p, i) => {
      const fl = p.dataset.lcsPileField, w = txt(p);
      if (!fields.includes(fl)) { f.push(`pile "${w}": field ${fl} not on the page`); return; }
      counts[fl] = (counts[fl] || 0) + 1;
      if (!lex.fields[fl].words.includes(w)) f.push(`pile "${w}" is not a word of field ${fl}`);
      for (const o of fields) if (o !== fl && lex.fields[o].words.map(n).includes(n(w))) f.push(`pile "${w}" belongs to both fields`);
      for (const o of fields) if (n(lex.fields[o].head) === n(w)) f.push(`pile "${w}" is a head verb`);
      if (i >= 3 && pills.slice(i - 3, i + 1).every((q) => q.dataset.lcsPileField === fl)) f.push(`four ${fl} words in a row in the pile`);
    });
    for (const fl of fields) if ((counts[fl] || 0) < cfg.split[0] || (counts[fl] || 0) > cfg.split[1]) f.push(`field ${fl} holds ${counts[fl] || 0} pile words ∉ [${cfg.split}]`);
    if (new Set(pills.map((p) => n(txt(p)))).size !== pills.length) f.push('a pile word printed twice');
    const plots = [...root.querySelectorAll('[data-lcs-field]')];
    if (plots.length !== 2) f.push(`${plots.length} plots ≠ 2`);
    for (const pl of plots) {
      if (pl.dataset.lcsLines !== String(cfg.plotRows) || pl.querySelectorAll('[data-lcs-ruling-row]').length !== cfg.plotRows) f.push(`plot ${pl.dataset.lcsField}: ≠ ${cfg.plotRows} writing rows`);
      const head = pl.querySelector('[data-lcs-field-head]');
      // fr typography inserts U+00A0 inside « » at render (page/shell.js frTypoHtml) — compare without it
      if (!head || txt(head).replace(/ /g, '') !== (lex.quotes[0] + lex.fields[pl.dataset.lcsField].head + lex.quotes[1]).replace(/ /g, '')) f.push(`plot ${pl.dataset.lcsField}: the sign does not print the quoted head`);
      const lines = pl.querySelector('[data-lcs-field-lines]');
      if (lines && lines.textContent.trim()) f.push(`plot ${pl.dataset.lcsField}: a word is printed on the writing rows`);
      for (const r of pl.querySelectorAll('[data-lcs-ruling-row] svg')) if (R(r).height < 36) f.push(`plot ${pl.dataset.lcsField}: a writing row < 36 high`);
    }
    const prow = []; for (const p of pills) { const c = (R(p).top + R(p).bottom) / 2; if (!prow.some((y) => Math.abs(y - c) < 12)) prow.push(c); }
    if (prow.length > cfg.pileRowsMax) f.push(`the pile wraps to ${prow.length} rows > ${cfg.pileRowsMax}`);
    tagFloor(pills, 36, 'pile word');
  } else f.push(`unknown face ${mode}`);
  return f;
}


module.exports = {
  id: ID,
  slug: KEY,
  gradeBand: 'G2',
  assetClass: 'icon-placement',
  exerciseType: KEY,
  themeAxis: { applicable: false },
  unitAxis: { applicable: false },
  difficulty: {
    1: { mode: 'base', cards: 6, rows: 3, chips: 3, grid: '3x1', tiers: [1], posMix: [6, 0], sameDomainMax: 0, sameDomainMin: 0,
      targetPx: 26, chipPx: 20, chipH: 38, rowMin: 210, rowGap: 10, maxGlyphs: 13 },
    2: { mode: 'base', cards: 8, rows: 4, chips: 4, grid: '2x2', tiers: [1, 2], posMix: [5, 3], sameDomainMax: 1, sameDomainMin: 0,
      targetPx: 24, chipPx: 18, chipH: 36, rowMin: 158, rowGap: 10, maxGlyphs: 13 },
    // Level Set 2026-10-01: harder WORDS (tier 2 only); 4 + 4 verbs needed more tier-2 verbs than 7 locales sign (measured)
    3: { mode: 'base', cards: 8, rows: 4, chips: 4, grid: '2x2', tiers: [2], posMix: [6, 2], sameDomainMax: 1, sameDomainMin: 0,
      targetPx: 24, chipPx: 18, chipH: 36, rowMin: 158, rowGap: 10, maxGlyphs: 13 },
  },
  i18n: {
    en: {
      title: 'Synonyms: Circle the Word That Means the Same',
      instruction: 'Read the big word on each card and circle the word under it that means the same.',
    },
  },
  FACE_MODES,
  SPARSE_MAX,
  stringsFor, antonymTable, drawPage, mergedBank, mergedBankOf,
  // Level Set 2026-10-01: the screen version of new pages (each face declares its own)
  get interactive() { return SYS().interactiveFor('base', mergedBankOf); },
  /** Level Set copies: what makes two pages of one level different (build-waves measures the overlap of these). */
  levelSetWords(m) {
    if (!m.mode) return m.cards.map((c) => c.concept);
    if (m.mode === 'pictures') return m.cards.map((c) => c.concept);
    if (m.mode === 'pairs') return m.left;
    if (m.mode === 'shades' || m.mode === 'say') return m.rows.map((r) => r.id);
    return m.pile;   // fields
  },

  build({ difficulty, locale }, ctx) {
    const loc = String(locale || 'en').slice(0, 2);
    const d = this.difficulty[difficulty];
    if (!d) throw new Error(`${ID}: no difficulty ${difficulty}`);
    // the published page (level 2, copy 1) reads the original bank; every Level Set page the merged one
    const published = Number(difficulty) === 2 && ((ctx && ctx.variant) || 1) === 1;
    const block = published ? loadBank(KEY, loc) : mergedBankOf(loc);
    if (!published && this.interactive && ctx && (ctx.interactive || ctx.answerKey)) {
      // the screen and the key are built from the SAME draws as the printed page (render-instance asserts the meta)
      const built = this._buildWith(block, d, { locale: loc }, { ...ctx, interactive: false, answerKey: false });
      return SYS().screenOrKey(d.mode, built, ctx, loc, block);
    }
    return this._buildWith(block, d, { locale: loc }, ctx);
  },

  /** The whole build over an INJECTED bank block + resolved config (the gate's poison seam); build() passes the real ones. */
  _buildWith(block, d, { locale }, ctx) {
    const loc = String(locale || 'en').slice(0, 2);
    if (!block || typeof block !== 'object') throw new Error(`${ID}: no ${loc} bank block`);
    if (!d || typeof d !== 'object') throw new Error(`${ID}: no difficulty config`);
    if (d.mode !== 'base') {
      if (!FACE_MODES.includes(d.mode)) throw new Error(`${ID}: unknown mode "${d.mode}"`);
      // Phase E: a face config is read ONLY by the face spec that owns that mode (DATA.FACES);
      // the base spec (and any other face) refuses it rather than read it.
      if (!this || this.id === ID || DATA.FACES[d.mode] !== this.id) throw new Error(`${ID}: mode "${d.mode}" is a face (${DATA.FACES[d.mode]}) — the base composer refuses a face config rather than read it`);
      return buildFace.call(this, block, d, loc, ctx);
    }
    if (this && this.id && this.id !== ID) throw new Error(`${this.id}: a face spec fed the base config — refuse`);
    stringsFor(block, 'base', loc);
    const cfg = { ...d };
    // guards on the RESOLVED config
    if (!(cfg.grid === '2x2' && cfg.chips === 4) && !(cfg.grid === '3x1' && cfg.chips === 3)) throw new Error(`${ID}: grid ${cfg.grid} with ${cfg.chips} chips`);
    if (cfg.cards !== cfg.rows * 2) throw new Error(`${ID}: ${cfg.cards} cards in ${cfg.rows} rows x 2`);
    if (cfg.cards % cfg.chips !== 0) throw new Error(`${ID}: ${cfg.cards} cards cannot balance ${cfg.chips} slots exactly`);
    if (cfg.posMix[0] + cfg.posMix[1] !== cfg.cards) throw new Error(`${ID}: posMix ${cfg.posMix} ≠ ${cfg.cards} cards`);
    if (cfg.chipH < 36) throw new Error(`${ID}: tag height ${cfg.chipH} below the G2 floor 36`);
    if (cfg.chipPx < 16) throw new Error(`${ID}: tag text ${cfg.chipPx} px < 16`);
    if (cfg.sameDomainMin > cfg.sameDomainMax) throw new Error(`${ID}: sameDomainMin ${cfg.sameDomainMin} > max ${cfg.sameDomainMax}`);
    const bodyH = cfg.grid === '2x2' ? 40 + 8 + 2 * cfg.chipH + 10 : 40 + 8 + 3 * cfg.chipH + 2 * 10;
    if (bodyH + 28 > cfg.rowMin) throw new Error(`${ID}: a card needs ${bodyH + 28} px > rowMin ${cfg.rowMin}`);
    // the ruled 677 is not what the longest fi chrome leaves: measured 667 (a 4-line title + 3-line instruction; the plants build measured the same)
    if (cfg.rows * cfg.rowMin + (cfg.rows - 1) * cfg.rowGap > BODY_MIN) throw new Error(`${ID}: the stack ${cfg.rows * cfg.rowMin + (cfg.rows - 1) * cfg.rowGap} px > the measured ${BODY_MIN} px fi chrome`);

    const { antonymsOf, prefix } = antonymTable(loc);
    const L = {
      loc, byConcept: groupsByConcept(block, loc), near: nearSet(block), antonymsOf, prefix,
      banned: new Set((block.ban || []).map(norm)),
      opp: new Map(DATA.CONCEPTS.map((c) => [c.id, c.opp || []])),
    };
    const rng = ctx.rng;
    let page = null;
    for (let t = 0; t < PAGE_TRIES && !page; t++) page = drawPage(block, cfg, rng, L);
    if (!page) throw new Error(`${ID}: no ${loc} page in ${PAGE_TRIES} draws (the distractor pool is too thin) — refuse`);
    const slots = cfg._forceSlots || slotOrder(cfg, rng);
    const conceptDomain = new Map(DATA.CONCEPTS.map((c) => [c.id, c.domain]));
    const cards = [];
    const meta = [];
    page.cards.forEach((c, i) => {
      const dis = rng.shuffle(c.distractors);
      const tags = [];
      let k = 0;
      for (let s = 0; s < cfg.chips; s++) tags.push(s === slots[i] ? { word: c.answer, groupId: c.g.id } : { word: dis[k].word, groupId: dis[k++].group.id });
      cards.push(C5.synTwinCard({ target: c.target, groupId: c.g.id, domain: c.g.domain, concept: c.g.concept, tags, answerSlot: slots[i],
        targetPx: cfg.targetPx, chipPx: cfg.chipPx, chipH: cfg.chipH, grid: cfg.grid, maxGlyphs: cfg.maxGlyphs }));
      meta.push({ concept: c.g.concept, pos: c.g.pos, target: c.target, answer: c.answer, slot: slots[i], tags: tags.map((x) => x.word), foilDomains: c.distractors.map((x) => x.group.domain), domain: c.g.domain });
    });
    // the page's lexicon slice (verify re-derives in the page; it cannot require)
    const onPage = new Map();
    for (const c of page.cards) { onPage.set(c.g.id, c.g); for (const x of c.distractors) onPage.set(x.group.id, x.group); }
    const printed = [...new Set(page.cards.flatMap((c) => [c.target, c.answer, ...c.distractors.map((x) => x.word)]))];
    const lex = {
      groups: Object.fromEntries([...onPage.values()].map((g) => [g.id, { concept: g.concept, pos: g.pos, domain: g.domain, words: g.words }])),
      near: (block.near || []).map((n) => [n.a, n.b]),
      ant: Object.fromEntries(printed.map((w) => [w, antonymsOf(w)])),
      prefix: [...prefix],
      opp: Object.fromEntries(DATA.CONCEPTS.map((c) => [c.id, c.opp || []])),
      domainOf: Object.fromEntries([...onPage.values()].map((g) => [g.concept, conceptDomain.get(g.concept) || g.domain])),
    };
    const stamp = { mode: 'base', cards: cfg.cards, chips: cfg.chips, grid: cfg.grid, tiers: cfg.tiers, posMix: cfg.posMix, sameDomainMax: cfg.sameDomainMax, sameDomainMin: cfg.sameDomainMin,
      targetPx: cfg.targetPx, chipPx: cfg.chipPx, chipH: cfg.chipH, rowMin: cfg.rowMin, maxGlyphs: cfg.maxGlyphs, sparseMax: SPARSE_MAX };
    const grid = C5.synTwinGrid({ cards, rows: cfg.rows, rowMin: cfg.rowMin, rowGap: cfg.rowGap });
    const bodyHtml = `<div data-ws-content data-lcs-type="${ID}" data-lcs-family="${KEY}" data-lcs-face="base" data-lcs-cfg="${esc(JSON.stringify(stamp))}" data-lcs-lex="${esc(JSON.stringify(lex))}" ` +
      `style="flex:1 1 auto;display:flex;flex-direction:column;min-height:0">${grid}</div>`;
    return { bodyHtml, meta: { cards: meta, cfg: stamp, slots } };
  },

  async verify(page) {
    const face = await page.evaluate(() => { const r = document.querySelector('[data-lcs-family="synonyms"]'); return r ? r.getAttribute('data-lcs-face') : null; });
    if (face && face !== 'base') return page.evaluate(faceVerifyInPage, { MIN_TEXT: 16 });
    return page.evaluate(({ ID, TEAL }) => {
      const f = [];
      const root = document.querySelector(`[data-lcs-type="${ID}"]`);
      if (!root) return ['no root'];
      let cfg, lex;
      try { cfg = JSON.parse(root.dataset.lcsCfg); lex = JSON.parse(root.dataset.lcsLex); } catch (e) { return ['unreadable cfg / lex stamp']; }
      const n = (s) => String(s).normalize('NFC').toLowerCase();
      const near = new Set(lex.near.flatMap(([a, b]) => [n(a) + '|' + n(b), n(b) + '|' + n(a)]));
      const prefix = new Set(lex.prefix.map(n));
      const antOf = (w) => (lex.ant[w] || []).map(n);
      if (document.querySelector('.ws-page img')) f.push('an <img> on the base page');
      if ([...document.querySelectorAll('[data-lcs-answer]')].length) f.push('a data-lcs-answer stamp on the base page (the answer is derived, never stamped)');
      if (root.getAttribute('data-lcs-face') !== 'base') f.push('the root is not face=base');
      const cards = [...root.querySelectorAll('section.ws-card[data-lcs-card]')];
      if (cards.length !== cfg.cards) f.push(`${cards.length} cards ≠ ${cfg.cards}`);
      const seen = new Map();
      const see = (w, where) => { const k = n(w); if (seen.has(k)) f.push(`"${w}" printed twice on the page (${seen.get(k)} and ${where})`); else seen.set(k, where); };
      const targetGroups = new Set();
      const slots = [];
      let styleRef = null;
      let sparse = 0;
      cards.forEach((card, ci) => {
        const tag = `card ${ci + 1}`;
        const twin = card.querySelector('[data-lcs-twin]');
        if (!twin) { f.push(`${tag}: no twin stamp`); return; }
        const [tgid, ...tw] = twin.dataset.lcsTarget.split(':');
        const tword = tw.join(':');
        const G = lex.groups[tgid];
        if (!G) { f.push(`${tag}: the target group ${tgid} is not in the page lexicon`); return; }
        if (!G.words.includes(tword)) f.push(`${tag}: target "${tword}" is not a word of ${tgid}`);
        const shown = card.querySelector('[data-lcs-target-word]');
        if (!shown || shown.textContent !== tword) f.push(`${tag}: the band prints "${shown && shown.textContent}" ≠ the stamped target "${tword}"`);
        if (targetGroups.has(tgid)) f.push(`${tag}: group ${tgid} is a target twice`);
        targetGroups.add(tgid);
        see(tword, tag + ' target');
        const band = card.querySelector('[data-lcs-band]');
        if (!band || !band.querySelector('svg[data-lcs-same-link]')) f.push(`${tag}: no joined-rings mark in the band`);
        if (band && band.scrollWidth > band.clientWidth + 0.5) f.push(`${tag}: the target overflows the band`);
        const tags = [...card.querySelectorAll('[data-lcs-tag]')];
        if (tags.length !== cfg.chips) f.push(`${tag}: ${tags.length} tags ≠ ${cfg.chips}`);
        const hits = tags.filter((t) => t.dataset.lcsGroup === tgid);
        if (hits.length !== 1) { f.push(`${tag}: ${hits.length} tags share the target's group (want exactly 1)`); return; }
        const answer = hits[0].textContent;
        if (n(answer) === n(tword)) f.push(`${tag}: the answer repeats the target`);
        slots.push(+hits[0].dataset.lcsSlot);
        const bad = new Set([...antOf(tword), ...antOf(answer)]);
        const groupsOnCard = new Set();
        let sameDom = 0;
        for (const t of tags) {
          const w = t.textContent, gid = t.dataset.lcsGroup, H = lex.groups[gid];
          see(w, tag);
          if (!H) { f.push(`${tag}: tag "${w}" group ${gid} not in the lexicon`); continue; }
          if (!H.words.includes(w)) f.push(`${tag}: tag "${w}" is not a word of ${gid}`);
          if (groupsOnCard.has(gid)) f.push(`${tag}: two tags share group ${gid}`);
          groupsOnCard.add(gid);
          if (H.pos !== G.pos) f.push(`${tag}: tag "${w}" is a ${H.pos}, the target a ${G.pos}`);
          if (gid === tgid) continue;
          if (bad.has(n(w))) f.push(`${tag}: tag "${w}" is an antonym of the target or the answer`);
          if (prefix.has(n(w))) f.push(`${tag}: tag "${w}" is a prefix antonym (G2-320 owns it)`);
          for (const a of [tword, answer]) if (near.has(n(a) + '|' + n(w))) f.push(`${tag}: tag "${w}" is near "${a}"`);
          if (H.words.some((x) => G.words.some((y) => near.has(n(x) + '|' + n(y))))) f.push(`${tag}: tag "${w}"'s group ${gid} holds a word near the target's group`);
          if ((lex.opp[G.concept] || []).includes(H.concept) || (lex.opp[H.concept] || []).includes(G.concept)) f.push(`${tag}: tag "${w}" names the opposite concept of "${tword}"`);
          if (H.domain === G.domain) sameDom++;
        }
        if (sameDom > cfg.sameDomainMax) f.push(`${tag}: ${sameDom} tags share the target's domain (max ${cfg.sameDomainMax})`);
        if (sameDom < cfg.sameDomainMin) f.push(`${tag}: ${sameDom} same-domain foils (min ${cfg.sameDomainMin})`);
        // rendered floors
        if (card.scrollHeight > card.clientHeight + 0.5) f.push(`${tag}: the card clips (scrollHeight ${card.scrollHeight} > ${card.clientHeight})`);
        for (const t of tags) {
          const r = t.getBoundingClientRect(), cs = getComputedStyle(t);
          if (r.height < Math.max(36, cfg.chipH) - 0.5) f.push(`${tag}: tag "${t.textContent}" ${r.height.toFixed(1)} px high < ${cfg.chipH}`);
          if (parseFloat(cs.fontSize) < cfg.chipPx - 0.01) f.push(`${tag}: tag text ${cs.fontSize} < ${cfg.chipPx}`);
          if (t.scrollWidth > t.clientWidth + 0.5) f.push(`${tag}: tag "${t.textContent}" overflows its ${t.clientWidth} px tag`);
          const sig = [cs.backgroundColor, cs.borderTopColor, cs.borderTopWidth, cs.fontWeight, cs.fontSize, Math.round(r.width), Math.round(r.height)].join('/');
          if (styleRef === null) styleRef = sig; else if (sig !== styleRef) f.push(`${tag}: tag "${t.textContent}" looks different from the others (${sig} ≠ ${styleRef})`);
          const cr = card.getBoundingClientRect();
          if (r.left < cr.left - 0.5 || r.right > cr.right + 0.5 || r.bottom > cr.bottom + 0.5) f.push(`${tag}: tag "${t.textContent}" leaves its card`);
        }
        // SPARSE: every blank band inside the card (content top -> band, band -> square, square -> content bottom)
        const cs = getComputedStyle(card), cr = card.getBoundingClientRect();
        const top = cr.top + parseFloat(cs.borderTopWidth) + parseFloat(cs.paddingTop), bottom = cr.bottom - parseFloat(cs.borderBottomWidth) - parseFloat(cs.paddingBottom);
        const sq = card.querySelector('[data-lcs-square]');
        if (band && sq) {
          const b = band.getBoundingClientRect(), s = sq.getBoundingClientRect();
          const gaps = [b.top - top, s.top - b.bottom, bottom - s.bottom];
          sparse = Math.max(sparse, ...gaps);
        }
      });
      if (sparse > cfg.sparseMax + 0.5) f.push(`SPARSE — ${sparse.toFixed(0)} px blank band inside a card (> ${cfg.sparseMax})`);
      // grid gaps
      const rows = [...new Set(cards.map((c) => Math.round(c.getBoundingClientRect().top)))].sort((a, b) => a - b);
      for (let i = 1; i < rows.length; i++) {
        const prevBottom = Math.max(...cards.filter((c) => Math.round(c.getBoundingClientRect().top) === rows[i - 1]).map((c) => c.getBoundingClientRect().bottom));
        if (rows[i] - prevBottom > cfg.sparseMax) f.push(`SPARSE — ${(rows[i] - prevBottom).toFixed(0)} px between card rows`);
      }
      // slots: exact balance, no 3-in-a-row
      const per = cfg.cards / cfg.chips, counts = {};
      for (const s of slots) counts[s] = (counts[s] || 0) + 1;
      for (let s = 0; s < cfg.chips; s++) if ((counts[s] || 0) !== per) f.push(`slot balance: slot ${s + 1} holds ${counts[s] || 0} answers ≠ ${per} (${JSON.stringify(counts)})`);
      for (let i = 2; i < slots.length; i++) if (slots[i] === slots[i - 1] && slots[i] === slots[i - 2]) f.push(`slot ${slots[i] + 1} answers cards ${i - 1}..${i + 1} in a row`);
      void TEAL;
      return f;
    }, { ID, TEAL: tokens.color.teal });
  },
};
