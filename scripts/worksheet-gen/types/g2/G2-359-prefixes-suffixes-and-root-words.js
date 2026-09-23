/**
 * G2-359 — Prefixes, Suffixes and Root Words: build the family walls (nt10-E, b5;
 * family key `word-parts`, G2, letters, CCSS L.2.4.c "use a known root word as a clue
 * to the meaning of an unknown word with the same root"). Design:
 * docs/worksheet-gen/b5-designs/G2-359-word-parts.md §2 + §5; rulings
 * _work/G2-359-critic.md; build record _work/G2-359-build.md.
 *
 * Two WALLS stand side by side, each on a heavy teal-outlined foundation STONE (a
 * dovetailed 'stem' brick, primitives/word-brick.js) carrying the root word (and, on
 * BOTH stones or on NEITHER, a picture of it); above each stone, empty dashed coral
 * courses with school lines. Across the top a cream strip of loose word bricks, each
 * a whole member printed once, unsplit, stem NOT highlighted. The child reads a brick,
 * finds the stone it grows from and writes it on a course of that wall. Role is
 * carried by SHAPE (dovetail stem / flat word / dashed place to write), so the page
 * reads the same from a mono copier. No `+`, no `=`, no pills, no answer key.
 *
 * THEME AXIS OFF (`coordinate.theme:''`), no unitAxis. build() reads ONLY its bank
 * (lib/b5-common.js bank('word-parts', loc) — a missing locale block THROWS, never an
 * en fallback); every printed word is a whole panel literal; the code never builds,
 * inflects or re-cases a word; image-vocabulary.js is never read at render.
 *
 * Ladder (a CONFIG; every guard keys on the RESOLVED keys, never the level index):
 *   d1  walls 2 · perWall 3 · rootPic 'both' (only pictured families) · derived only ·
 *       bank 20 px / <= 2 rows · course 64 / glyph 30 · wall 330
 *   d2  walls 2 · perWall 5 · rootPic 'auto' (both where both families carry an opened
 *       root.pic, else neither) · derived + prefixed + <= 1 compound per family ·
 *       bank 20 / <= 3 rows · course 60 / glyph 28 · wall 330                    (ships)
 *   d3  walls 3 · perWall 4 · rootPic 'neither' · as d2 · bank 18 / 3 · course 56 / 26 ·
 *       wall 215 (a scaffold level; never ships, no copy describes it)
 *
 * COMPOSER (seeded, locale-neutral pattern): the seed shuffles the locale's family
 * INDEXES and takes the first set whose stems are not substrings of each other, share
 * no 3-letter string, and whose members never contain another page family's stem;
 * members per family = a seeded sample (<= 1 compound); the bank order is re-drawn
 * until no 3 consecutive bricks share a family, the families are not grouped (neither
 * half of the strip is one family) and no strict alternation runs longer than 4; the
 * wall order (which family stands on the LEFT) is a separate seeded coin, so it is not
 * the order the families first appear in the strip. A pair whose bank would need more
 * than bankRowsMax rows (brickEstimate, greedy packing) is skipped for the next set.
 *
 * FACES (Phase E, 2026-09-23; design §3, record _work/G2-359-faces.md): the knob `mode` routes a face
 * config to buildFace() (picture-family G1-397 · root-word G2-375 · prefix-key G2-376 · who-does-it
 * G3-398 · family-in-sentence G3-399); verify() reads the page's data-lcs-mode and routes to
 * verifyFace(). The base path (mode 'base') is byte-identical. Refusals (the spec THROWS):
 * who-does-it es/fr, prefix-key fi (REFUSED_FACES) + any bank.refuse[mode].
 *
 * Stamps: root [data-ws-content][data-lcs-type="G2-359"][data-lcs-wordparts]
 * data-lcs-mode="base" data-lcs-walls data-lcs-per data-lcs-locale data-lcs-cfg;
 * wall data-lcs-wall=<famId> data-lcs-stem data-lcs-root; course data-lcs-course;
 * bank brick data-lcs-bank-brick data-lcs-word data-lcs-family-of (hidden ground truth).
 * verify(page) re-derives every brick's wall from the stems + the bank (node side),
 * and measures the page (floors, empty courses, bank rows, runs, pictures).
 */
'use strict';
const { bank: loadBank } = require('../../lib/b5-common.js');
const { fileUri } = require('../../lib/b2-common.js');
// the family's own component file (also merged by templates/components-b5.js); required directly so a
// sibling family mid-build in the shared barrel cannot break this spec's load
const C5 = require('../../templates/components-b5/word-parts.js');
const WB = require('../../primitives/word-brick.js');
const { esc } = require('../../primitives/_svg.js');

const ID = 'G2-359';
const KEY = 'word-parts';
const BODY_W = 675, WALL_GAP = 15;
const G2_BRICK = 36, G2_TEXT = 17;
const TRIES = 200;
const FACE_MODES = ['picture-family', 'root-word', 'prefix-key', 'who-does-it', 'family-in-sentence'];

const low = (s, loc) => String(s).normalize('NFC').toLocaleLowerCase(loc);
const glyphs = (s) => [...String(s).normalize('NFC')].length;
function tri(s) { const o = new Set(); for (let i = 0; i + 3 <= s.length; i++) o.add(s.slice(i, i + 3)); return o; }

/** The page-pair rule (§2 composer + validator 5): stems not substrings, no shared 3-letter string, no cross-family stem inside a member. */
function compatible(fams, loc) {
  for (let i = 0; i < fams.length; i++) for (let j = i + 1; j < fams.length; j++) {
    const a = low(fams[i].stem, loc), b = low(fams[j].stem, loc);
    if (a.includes(b) || b.includes(a)) return false;
    const ta = tri(a); for (const t of tri(b)) if (ta.has(t)) return false;
    for (const mm of fams[i].members) if (low(mm.word, loc).includes(b)) return false;
    for (const mm of fams[j].members) if (low(mm.word, loc).includes(a)) return false;
  }
  return true;
}

/** Bank order: no 3 consecutive of one family, not grouped, no strict alternation longer than 4. */
function orderOk(ids) {
  for (let i = 2; i < ids.length; i++) if (ids[i] === ids[i - 1] && ids[i] === ids[i - 2]) return false;
  const half = Math.floor(ids.length / 2);
  if (new Set(ids.slice(0, half)).size === 1 || new Set(ids.slice(ids.length - half)).size === 1) return false;
  // strict alternation (period 2) longer than 4
  for (let st = 0; st < ids.length; st++) {
    let e = st + 1;
    while (e < ids.length && ids[e] !== ids[e - 1] && (e - st < 2 || ids[e] === ids[e - 2])) e++;
    if (e - st > 4) return false;
  }
  return true;
}

function literal(v, what, loc) {
  if (typeof v !== 'string' || !v.trim()) throw new Error(`${ID}: ${loc} ${what} is missing (refuse)`);
  if (v !== v.trim() || /[{}\d]/.test(v)) throw new Error(`${ID}: ${loc} ${what} "${v}" is not a clean literal (refuse)`);
  return v;
}


/* ================================================================ FACES (Phase E, 2026-09-23)
 * Design §3; record docs/worksheet-gen/b5-designs/_work/G2-359-faces.md. The ONE additive knob is
 * `mode` (the base config says 'base'; a face row sets one of FACE_MODES). _buildWith routes a
 * face config here; the base path is untouched (tools/b3-baseline.js --check is the proof). Every
 * guard keys on the RESOLVED face keys (a face config lacking its own keys THROWS, never falls back
 * to the base keys it inherits from the row spread). A refused (locale, face) THROWS a REFUSAL.
 */
const { PRONOUNS } = require('../../data/b4/pronouns.js');
/** Faces a locale's grammar or its sibling types' ownership cannot carry (design §3; the spec throws). */
const REFUSED_FACES = { 'who-does-it': ['es', 'fr'], 'prefix-key': ['fi'] };
const FACE_KEYS = {
  'picture-family': ['cards', 'bricks', 'foils', 'picPx', 'brickH', 'px', 'cols', 'rows', 'stoneMinH', 'picMax'],
  'root-word': ['cards', 'worked', 'members', 'memberPx', 'stoneGlyphH', 'cols', 'rows', 'brickH', 'stoneH'],
  'prefix-key': ['keySize', 'rows', 'eachPrefixUsed', 'rowH', 'rowGap', 'keyPx', 'glossPx', 'basePx', 'socketH', 'glyphH'],
  'who-does-it': ['cards', 'cols', 'rows', 'picPx', 'basePx', 'brickH', 'socketW', 'socketH', 'glyphH'],
  'family-in-sentence': ['blocks', 'perBlock', 'coursePx', 'brickH', 'stoneH', 'stonePx', 'sentPx', 'rowH', 'gapH', 'glyphH'],
};
const G1_BRICK = 44, G1_TEXT = 20, G1_PIC = 72;

/** Longest string contained (case-folded) in EVERY word of the list. */
function commonPart(words, loc) {
  const ws = words.map((w) => low(w, loc));
  const a = ws.slice().sort((x, y) => x.length - y.length)[0];
  for (let L = a.length; L > 0; L--) for (let i = 0; i + L <= a.length; i++) { const sub = a.slice(i, i + L); if (ws.every((w) => w.includes(sub))) return sub; }
  return '';
}
/** Accent- and case-folded (NFD, marks stripped): a child reads "marítimo" and "marino" as sharing "mari". */
const fold = (s, loc) => String(s).normalize('NFD').replace(/\p{M}/gu, '').toLocaleLowerCase(loc);
/** commonPart over the FOLDED words (round 1: es mar -> marinero / marino / marítimo share "mari", not the root). */
function commonPartFolded(words, loc) { return commonPart(words.map((w) => fold(w, loc)), loc); }
/** Round 1 (G1-397): the cards whose member is the STRICTLY longest brick — at most 60 % of a page's cards. */
const LONGEST_MAX_SHARE = 0.6;
function strictlyLongest(member, foils) { const g = glyphs(member); return foils.every((w) => glyphs(w) < g); }
function longestTell(cards) {
  const n = cards.filter((c) => strictlyLongest(c.member, c.foils)).length;
  return n > Math.floor(LONGEST_MAX_SHARE * cards.length) ? `the answer is the strictly longest brick on ${n} of ${cards.length} cards (> ${LONGEST_MAX_SHARE * 100} %) — solvable by length` : null;
}
/**
 * Round 1 (G2-376): the meaning line may not quote the key. Returns the key meaning words a gloss prints verbatim
 * (unicode-aware whole words): every alternative phrase of every key meaning ("hinaus oder zu Ende" -> "hinaus",
 * "zu Ende"), every content token of >= 4 letters, and a >= 5-letter token that is a FORM of one (wrong / wrongly).
 */
const GLOSS_OR = /\s*(?:,|;|\/|(?<!\p{L})(?:or|oder|o|ou|of|eller|tai|oppure|eli)(?!\p{L}))\s*/iu;
const GLOSS_STOP = new Set(['with', 'from', 'noget', 'något', 'noe', 'etwas', 'algo', 'quelque', 'qualcosa', 'iets', 'jotain', 'something', 'eine', 'einen', 'uma', 'una', 'une', 'till', 'från', 'fra', 'into', 'than']);
const reEsc = (x) => x.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
function glossQuotesKey(gloss, meanings, loc) {
  const g = String(gloss).normalize('NFC').toLocaleLowerCase(loc);
  const gt = g.split(/[^\p{L}\p{M}'’-]+/u).filter(Boolean);
  const hits = new Set();
  for (const m of meanings) {
    const mm = String(m).normalize('NFC').toLocaleLowerCase(loc);
    for (const alt of mm.split(GLOSS_OR).map((x) => x.trim()).filter(Boolean)) if (new RegExp('(?<!\\p{L})' + reEsc(alt) + '(?!\\p{L})', 'u').test(g)) hits.add(alt);
    for (const t of mm.split(/[^\p{L}\p{M}'’-]+/u).filter((x) => [...x].length >= 4 && !GLOSS_STOP.has(x))) {
      if (gt.includes(t)) hits.add(t);
      for (const u of gt) if (u !== t && [...u].length >= 5 && [...t].length >= 5 && (u.startsWith(t) || t.startsWith(u))) hits.add(`${u} (a form of "${t}")`);
    }
  }
  return [...hits];
}
/** A strict staircase: every step moves the same non-zero amount (mod k). */
function isStaircase(seq, k) {
  if (seq.length < 3) return false;
  const d = ((seq[1] - seq[0]) % k + k) % k;
  if (d === 0) return false;
  for (let i = 2; i < seq.length; i++) if (((seq[i] - seq[i - 1]) % k + k) % k !== d) return false;
  return true;
}
/** Answer sequence tells for a prefix page: 3 consecutive equal, grouped (each answer one contiguous run), or a period-k cycle. */
function answerRunTells(ans, k) {
  const out = [];
  for (let i = 2; i < ans.length; i++) if (ans[i] === ans[i - 1] && ans[i] === ans[i - 2]) out.push(`three consecutive rows answer "${ans[i]}" (rows ${i - 1}-${i + 1})`);
  const runs = []; for (const a of ans) if (!runs.length || runs[runs.length - 1] !== a) runs.push(a);
  if (runs.length === new Set(ans).size) out.push(`the rows are grouped by prefix (${runs.join(' | ')})`);
  if (ans.length > k && ans.every((a, i) => i < k || a === ans[i - k]) && new Set(ans.slice(0, k)).size === k) out.push(`the answers cycle with period ${k} (${ans.join(',')})`);
  return out;
}
const tokensOf = (s, loc) => low(s, loc).split(/[^\p{L}\p{M}'’-]+/u).filter(Boolean);
function need(d, mode) {
  for (const k of FACE_KEYS[mode]) if (d[k] == null) throw new Error(`${ID}: ${mode} config is missing its own key "${k}" (a face never reads the base's keys)`);
}
function facePage(self, mode, d, loc, inner, stampExtra = '') {
  const stamp = { mode, ...Object.fromEntries(FACE_KEYS[mode].map((k) => [k, d[k]])) };
  return `<div class="wp-page wp-face" data-ws-content data-lcs-type="${ID}" data-lcs-face="${esc(self.id)}" data-lcs-wordparts="" data-lcs-mode="${mode}" data-lcs-locale="${loc}" ` +
    `data-lcs-cfg="${esc(JSON.stringify(stamp))}"${stampExtra} data-lcs-stack="page" style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:flex-start;gap:12px;min-height:0">${inner}</div>`;
}

/**
 * buildFace(self, block, d, loc, rng, fp) — fp is the GATE-ONLY poison seam (ctx.facePlan): a fixed plan
 * (families / slots / rows / people / blocks / courses) that bypasses the composer's own guards, so the
 * gate can prove verify() catches what the composer would never draw. Nothing in the pipeline passes it.
 */
function buildFace(self, block, d, loc, rng, fp) {
  const mode = d.mode;
  need(d, mode);
  if ((REFUSED_FACES[mode] || []).includes(loc)) throw new Error(`${ID}: ${loc} REFUSES the ${mode} face (design §3 refusal; no filler page)`);
  if (block.refuse && block.refuse[mode]) throw new Error(`${ID}: ${loc} refuses the ${mode} face (bank.refuse)`);
  const S = block.strings && block.strings[mode];
  if (!S || !S.title || !S.instruction) throw new Error(`${ID}: ${loc} bank has no strings.${mode} (refuse)`);
  const shuffleUntil = (arr, okFn, what) => { for (let t = 0; t < 400; t++) { const o = rng.shuffle(arr); if (okFn(o)) return o; } throw new Error(`${ID}: ${mode}: no ${what} in 400 tries (refuse)`); };

  if (mode === 'picture-family') {
    if (d.brickH < G1_BRICK || d.px < G1_TEXT || d.picPx < G1_PIC) throw new Error(`${ID}: picture-family below the G1 floors (brick ${d.brickH}/44, text ${d.px}/20, picture ${d.picPx}/72)`);
    if (d.cards !== d.cols * d.rows) throw new Error(`${ID}: picture-family cards ${d.cards} ≠ ${d.cols} x ${d.rows}`);
    if (d.foils !== d.bricks - 1) throw new Error(`${ID}: picture-family bricks ${d.bricks} = 1 member + ${d.foils} foils`);
    if (d.cards % d.bricks) throw new Error(`${ID}: picture-family ${d.cards} cards cannot share ${d.bricks} slots evenly`);
    const cardW = (BODY_W - (d.cols - 1) * 14) / d.cols - 28;
    const pool = (block.picFamilies || []).filter((f) => f && f.signed === true && f.root && f.root.pic && f.root.picOpened === true).map((f) => ({
      id: literal(f.id, 'picFamily id', loc), root: literal(f.root.word, `picFamily ${f.id} root.word`, loc), pic: f.root.pic,
      members: (f.members || []).filter((mm) => mm.kind !== 'compound' && low(mm.word, loc).includes(low(f.root.word, loc))).map((mm) => literal(mm.word, `picFamily ${f.id} member`, loc)),
      foils: (f.lookAlikes || []).map((x) => literal(x.word, `picFamily ${f.id} look-alike`, loc)).filter((w) => !low(w, loc).includes(low(f.root.word, loc))),
    })).filter((f) => f.members.length && f.foils.length >= d.foils && [...f.members, ...f.foils].every((w) => WB.brickEstimate(d.px, glyphs(w)) <= cardW - 2));
    if (pool.length < d.cards) throw new Error(`${ID}: ${loc} has ${pool.length} picture-root families for ${d.cards} cards (refuse)`);
    let plan = null;
    if (fp) plan = { cards: fp.families.map((id) => { const f = pool.find((x) => x.id === id); return { f, member: f.members[0], foils: f.foils.slice(0, d.foils) }; }), slots: fp.slots };
    for (let t = 0; t < TRIES && !plan; t++) {
      const fams = rng.sample(pool, d.cards);
      const cards = fams.map((f) => ({ f, member: rng.pick(f.members), foils: rng.sample(f.foils, d.foils) }));
      // round 1: the member may be the strictly longest brick on at most 60 % of the cards — re-pick a card whose
      // family offers a non-longest (member, foils) choice until the page holds (else draw other families)
      const maxL = Math.floor(LONGEST_MAX_SHARE * d.cards);
      const combos = (f) => { const out = []; const k = d.foils; const fs2 = f.foils; const rec = (st, acc) => { if (acc.length === k) { for (const m of f.members) if (!strictlyLongest(m, acc)) out.push({ member: m, foils: acc.slice() }); return; } for (let q = st; q < fs2.length; q++) { acc.push(fs2[q]); rec(q + 1, acc); acc.pop(); } }; rec(0, []); return out; };
      for (const c of rng.shuffle(cards)) {
        if (cards.filter((x) => strictlyLongest(x.member, x.foils)).length <= maxL) break;
        if (!strictlyLongest(c.member, c.foils)) continue;
        const alt = combos(c.f);
        if (alt.length) { const a = rng.pick(alt); c.member = a.member; c.foils = rng.shuffle(a.foils); }
      }
      if (longestTell(cards)) continue;
      // no brick on the page contains ANOTHER card's picture word (a second "built from" reading)
      const roots = fams.map((f) => low(f.root, loc));
      if (cards.some((c, i) => [c.member, ...c.foils].some((w) => roots.some((r, j) => j !== i && low(w, loc).includes(r))))) continue;
      const slots = shuffleUntil(Array.from({ length: d.cards }, (_, i) => i % d.bricks), (o) => !isStaircase(o, d.bricks), 'member-slot order that is not a staircase');
      plan = { cards, slots };
    }
    if (!plan) throw new Error(`${ID}: no picture-family page for ${loc} in ${TRIES} tries (refuse — too few picture families offer a look-alike at least as long as the member: the answer would be the longest brick)`);
    const html = plan.cards.map((c, i) => {
      const foils = c.foils.slice();
      const bricks = []; for (let s = 0; s < d.bricks; s++) bricks.push(s === plan.slots[i] ? { word: c.member, role: 'member' } : { word: foils.shift(), role: 'foil' });
      return C5.wordPartPicCard({ pic: { src: fileUri(c.f.pic.theme, c.f.pic.noun), key: c.f.pic.theme + '/' + c.f.pic.noun }, root: c.f.root, bricks, w: cardW, brickH: d.brickH, px: d.px, stoneMinH: d.stoneMinH, picMin: d.picPx, picMax: d.picMax });
    });
    const minRow = 18 + d.bricks * d.brickH + (d.bricks - 1) * 6 + 10 + d.stoneMinH + 24 + 4;
    const inner = C5.wordPartGrid({ cards: html, cols: d.cols, rows: d.rows, minRow });
    return { bodyHtml: facePage(self, mode, d, loc, inner, ` data-lcs-slots="${plan.slots.join(',')}"`),
      meta: { mode, families: plan.cards.map((c) => c.f.id), members: plan.cards.map((c) => c.member), foils: plan.cards.map((c) => c.foils.slice()), slots: plan.slots } };
  }

  if (mode === 'root-word') {
    if (d.brickH < G2_BRICK || d.memberPx < G2_TEXT || d.stoneGlyphH < 24) throw new Error(`${ID}: root-word below the G2 floors`);
    if (d.cards !== d.cols * d.rows || d.worked !== 1 || d.members !== 3) throw new Error(`${ID}: root-word wants ${d.cols} x ${d.rows} cards, 1 worked, 3 members`);
    const cardW = (BODY_W - (d.cols - 1) * 14) / d.cols - 28;
    const fit = (w) => WB.brickEstimate(d.memberPx, glyphs(w)) <= Math.floor(cardW) - 2;
    const all = [...(block.families || []), ...(block.rootFamilies || [])].filter((f) => f && f.signed === true && f.rootIsFreeWord).map((f) => ({
      id: literal(f.id, 'family id', loc), stem: literal(f.stem, `family ${f.id} stem`, loc), root: literal(f.root && f.root.word, `family ${f.id} root.word`, loc),
      members: (f.members || []).filter((mm) => fit(mm.word) && !mm.stemSigned).map((mm) => ({ word: literal(mm.word, `family ${f.id} member`, loc), kind: mm.kind })),
    })).filter((f) => f.members.length >= d.members && low(f.stem, loc) === low(f.root, loc));
    const open = d.cards - d.worked;
    if (all.length < d.cards) throw new Error(`${ID}: ${loc} has ${all.length} free-root families for ${d.cards} root cards (refuse)`);
    const triple = (f) => {
      for (let t = 0; t < 60; t++) {
        const s = rng.sample(f.members, d.members);
        if (s.filter((x) => x.kind === 'compound').length > 1) continue;
        if (commonPart(s.map((x) => x.word), loc) !== low(f.stem, loc)) continue;
        if (commonPartFolded(s.map((x) => x.word), loc) !== fold(f.root, loc)) continue;   // round 1: accent-folded too (es mar / marítimo)
        return rng.shuffle(s).map((x) => x.word);
      }
      return null;
    };
    let plan = null;
    if (fp) plan = fp.families.map((id) => { const f = all.find((x) => x.id === id); return { f, words: triple(f) }; });
    for (let t = 0; t < TRIES && !plan; t++) {
      const order = rng.shuffle(all);
      const worked = order[0], rest = order.slice(1, 1 + open);
      if (rest.some((f) => { const tw = tri(low(worked.stem, loc)); return [...tri(low(f.stem, loc))].some((x) => tw.has(x)) || low(f.stem, loc).includes(low(worked.stem, loc)) || low(worked.stem, loc).includes(low(f.stem, loc)); })) continue;
      const cards = [worked, ...rest].map((f) => ({ f, words: triple(f) }));
      if (cards.some((c) => !c.words)) continue;
      // no printed member contains ANOTHER card's root (it would ring two stones)
      if (cards.some((c, i) => c.words.some((w) => cards.some((o, j) => j !== i && low(w, loc).includes(low(o.f.stem, loc)))))) continue;
      plan = cards;
    }
    if (!plan) throw new Error(`${ID}: no root-word page for ${loc} in ${TRIES} tries (refuse)`);
    const html = plan.map((c, i) => C5.wordPartRootCard({ famId: c.f.id, members: c.words, root: c.f.root, stem: c.f.stem, worked: i === 0, w: cardW, px: d.memberPx, brickH: d.brickH, stoneH: d.stoneH, glyphH: d.stoneGlyphH, loc }));
    const minRow = 18 + d.members * d.brickH + d.members * 4 + d.stoneH + 24 + 4;   // three 4 px gaps (space-between grows them)
    const inner = C5.wordPartGrid({ cards: html, cols: d.cols, rows: d.rows, minRow });
    return { bodyHtml: facePage(self, mode, d, loc, inner), meta: { mode, families: plan.map((c) => c.f.id), worked: plan[0].f.id, members: plan.map((c) => c.words) } };
  }

  if (mode === 'prefix-key') {
    if (d.socketH < G2_BRICK || d.glossPx < G2_TEXT || d.basePx < G2_TEXT || d.glyphH < 24) throw new Error(`${ID}: prefix-key below the G2 floors`);
    const pk = block.prefixKey;
    if (!pk || !Array.isArray(pk.prefixes) || pk.prefixes.length < d.keySize) throw new Error(`${ID}: ${loc} prefixKey has fewer than ${d.keySize} prefixes (refuse)`);
    const key = pk.prefixes.slice(0, d.keySize).map((p) => ({ prefix: literal(p.prefix, 'key prefix', loc), meaning: literal(p.meaning, 'key meaning', loc) }));
    const inKey = new Set(key.map((p) => p.prefix));
    const pool = pk.rows.filter((r) => inKey.has(r.prefix) && (r.prefix + r.base).normalize('NFC') === String(r.word).normalize('NFC') && WB.brickWidthFor('stem', r.base, d.basePx) <= 140);
    const counts = (rows) => key.map((p) => rows.filter((r) => r.prefix === p.prefix).length);
    if (key.some((p) => pool.filter((r) => r.prefix === p.prefix).length < d.eachPrefixUsed)) throw new Error(`${ID}: ${loc} prefixKey cannot give every key prefix ${d.eachPrefixUsed} rows (refuse)`);
    let rows = null;
    if (fp) rows = fp.rows.map((b) => pool.find((r) => r.base === b));
    for (let t = 0; t < TRIES && !rows; t++) {
      const s = rng.sample(pool, d.rows);
      if (counts(s).some((n) => n < d.eachPrefixUsed)) continue;
      const o = rng.shuffle(s);
      if (answerRunTells(o.map((r) => r.prefix), d.keySize).length) continue;
      rows = o;
    }
    if (!rows) throw new Error(`${ID}: no prefix-key page for ${loc} in ${TRIES} tries (refuse)`);
    const longest = Math.max(...key.map((p) => glyphs(p.prefix)));
    const socketW = Math.max(84, Math.min(110, 14 * longest + 24));
    // one joint column: every socket starts at the same x (the bases differ in width, the empty pieces line up)
    const jointW = socketW + Math.max(...rows.map((r) => WB.brickWidthFor('stem', r.base, d.basePx))) - C5.wordPartSocketJoin;
    const inner = C5.wordPartPrefixKey({ prefixes: key, px: d.keyPx, meaningPx: d.glossPx }) +
      `<div data-lcs-prows="" style="display:grid;grid-template-rows:repeat(${d.rows},minmax(${d.rowH}px,1fr));row-gap:${d.rowGap}px;flex:1 1 auto;min-height:0">` +
      rows.map((r, i) => C5.wordPartPrefixRow({ n: i + 1, gloss: literal(r.gloss, 'gloss', loc), glossId: r.word, base: literal(r.base, 'base', loc), socketW, jointW, h: d.socketH, glyphH: d.glyphH, basePx: d.basePx, glossPx: d.glossPx, minH: d.rowH })).join('') + `</div>`;
    return { bodyHtml: facePage(self, mode, d, loc, inner), meta: { mode, rows: rows.map((r) => r.base), answers: rows.map((r) => r.prefix), key: key.map((p) => p.prefix) } };
  }

  if (mode === 'who-does-it') {
    if (d.brickH < G2_BRICK || d.basePx < G2_TEXT || d.glyphH < 26 || d.picPx < 56) throw new Error(`${ID}: who-does-it below the floors`);
    if (d.cards !== d.cols * d.rows) throw new Error(`${ID}: who-does-it cards ${d.cards} ≠ ${d.cols} x ${d.rows}`);
    const people = Object.fromEntries(PRONOUNS.en.people.map((p) => [p.key, p]));
    const pool = (block.agents || []).map((a) => {
      const p = people[a.key];
      if (!p || !p.depicted || p.picOpened !== true) return null;
      const ans = a.answer && (a.answer[p.depicted] || a.answer.any);
      if (!ans) return null;
      return { key: a.key, base: literal(a.base, `agent ${a.key} base`, loc), answer: literal(ans, `agent ${a.key} answer`, loc), p };
    }).filter((x) => x && x.p.minPx <= d.picPx);
    let pick = null;
    if (fp) pick = fp.people.map((k) => pool.find((x) => x.key === k));
    for (let t = 0; t < TRIES && !pick; t++) {
      const s = rng.sample(pool, d.cards);
      if (s.length < d.cards) break;
      const keys = s.map((x) => x.key);
      if (keys.includes('singer') && keys.includes('musician')) continue;
      pick = s;
    }
    if (!pick) throw new Error(`${ID}: ${loc} has no ${d.cards}-portrait who-does-it page (refuse)`);
    const html = pick.map((a) => C5.wordPartPersonCard({ pic: { src: fileUri(a.p.pic.theme, a.p.pic.noun), key: a.p.pic.theme + '/' + a.p.pic.noun }, person: a.key, depicted: a.p.depicted, base: a.base,
      picPx: d.picPx, basePx: d.basePx, brickH: d.brickH, socketW: d.socketW, socketH: d.socketH, glyphH: d.glyphH }));
    const minRow = 18 + Math.max(d.picPx, d.brickH + 8 + d.socketH) + 24 + 4;
    const inner = C5.wordPartGrid({ cards: html, cols: d.cols, rows: d.rows, minRow });
    return { bodyHtml: facePage(self, mode, d, loc, inner), meta: { mode, people: pick.map((a) => a.key), answers: pick.map((a) => a.answer) } };
  }

  if (mode === 'family-in-sentence') {
    if (d.brickH < G2_BRICK || d.sentPx < G2_TEXT || d.coursePx < G2_TEXT || d.glyphH < 24 || d.stoneH < G2_BRICK) throw new Error(`${ID}: family-in-sentence below the G2 floors`);
    const fams = Object.fromEntries([...(block.families || []), ...(block.rootFamilies || [])].map((f) => [f.id, f]));
    const pool = ((block.exemplar && block.exemplar.F5) || []).map((id) => {
      const f = fams[id], ss = (block.sentences || {})[id];
      if (!f || !Array.isArray(ss) || ss.length !== d.perBlock || new Set(ss.map((x) => x.slot)).size !== d.perBlock) return null;
      if (ss.some((x) => WB.brickWidthFor('word', x.word, d.coursePx) > 147 || (String(x.frame).match(/\{gap\}/g) || []).length !== 1)) return null;
      return { f: { id, stem: f.stem, root: literal(f.root.word, `family ${id} root`, loc), members: f.members }, ss };
    }).filter(Boolean);
    if (pool.length < d.blocks) throw new Error(`${ID}: ${loc} has ${pool.length} sentence blocks for ${d.blocks} (refuse)`);
    let plan = null;
    if (fp) plan = fp.blocks.map((id, i) => { const b = pool.find((x) => x.f.id === id); const sent = b.ss.slice(); return { ...b, sent, course: fp.courses ? fp.courses[i] : sent.map((x) => x.word).reverse() }; });
    for (let t = 0; t < TRIES && !plan; t++) {
      const s = rng.sample(pool, d.blocks);
      if (!compatible(s.map((x) => x.f), loc)) continue;
      plan = s.map((b) => {
        const sent = rng.shuffle(b.ss);
        const course = shuffleUntil(sent.map((x) => x.word), (o) => o.every((w, i) => w !== sent[i].word), 'derangement');
        return { ...b, sent, course };
      });
    }
    if (!plan) throw new Error(`${ID}: no family-in-sentence page for ${loc} in ${TRIES} tries (refuse)`);
    const maxG = Math.max(...plan.flatMap((b) => b.course.map(glyphs)));
    const gapW = Math.max(150, Math.min(300, Math.round(1.6 * 10 * maxG + 24)));
    let n = 0;
    const inner = `<div data-lcs-fblocks="" style="display:grid;grid-template-rows:repeat(${d.blocks},minmax(0,1fr));row-gap:14px;flex:1 1 auto;min-height:0">` + plan.map((b) => C5.wordPartFamilyBlock({
      famId: b.f.id, root: b.f.root, course: b.course, gapW, coursePx: d.coursePx, brickH: d.brickH, stoneH: d.stoneH, stonePx: d.stonePx, sentPx: d.sentPx, rowH: d.rowH, gapH: d.gapH, glyphH: d.glyphH,
      sentences: b.sent.map((x) => { const [pre, post] = String(x.frame).split('{gap}'); return { n: ++n, pre: pre.replace(/\s+$/, ' '), post: post.replace(/^\s+/, ' '), slot: x.slot }; }),
    })).join('') + `</div>`;
    return { bodyHtml: facePage(self, mode, d, loc, inner), meta: { mode, families: plan.map((b) => b.f.id), answers: plan.map((b) => b.sent.map((x) => x.word)), courses: plan.map((b) => b.course) } };
  }
  throw new Error(`${ID}: unknown face mode "${mode}"`);
}

/** In-page measurement + node cross-check for the five faces (stamps only; every answer re-derived). */
async function verifyFace(page, mode) {
  const r = await page.evaluate(({ ID, mode, G1_BRICK, G1_TEXT, G1_PIC, G2_BRICK, G2_TEXT }) => {
    const out = [];
    const root = document.querySelector(`[data-lcs-type="${ID}"]`);
    const loc = root.dataset.lcsLocale || 'en';
    const nf = (s) => String(s).normalize('NFC').toLocaleLowerCase(loc);
    const toks = (s) => nf(s).split(/[^\p{L}\p{M}'’-]+/u).filter(Boolean);
    const R = (e) => e.getBoundingClientRect();
    let cfg; try { cfg = JSON.parse(root.dataset.lcsCfg); } catch (e) { return { f: ['unreadable cfg stamp'] }; }
    if (root.querySelector('[data-lcs-answer]')) out.push('an answer stamp (data-lcs-answer) on the page');
    for (const el of root.querySelectorAll('.ws-card, [data-lcs-prow], [data-lcs-fblock], [data-lcs-course], [data-lcs-sentence]')) if (el.scrollWidth > el.clientWidth + 0.5) out.push(`${el.className || el.tagName} ${el.dataset.lcsCard || el.dataset.lcsProw || ''} scrolls horizontally`);
    const txtIn = (b) => { const t = b.querySelector('[data-lcs-brick-text]'); if (!t) return; const tb = t.getBoundingClientRect(), br = b.getBoundingClientRect(), body = b.dataset.lcsBody.split(',').map(Number); if (tb.left < br.left + body[0] + 4 - 0.5 || tb.right > br.left + body[1] - 4 + 0.5) out.push(`brick "${t.textContent}": text outside its body`); };
    const data = { loc };
    if (mode === 'picture-family') {
      const cards = [...root.querySelectorAll('.ws-card')];
      if (cards.length !== cfg.cards) out.push(`${cards.length} cards ≠ ${cfg.cards}`);
      const slots = [];
      const visible = nf(root.innerText);
      data.cards = cards.map((c, ci) => {
        const stone = c.querySelector('[data-lcs-flexstone]'); const rootW = stone && stone.dataset.lcsRoot;
        const bricks = [...c.querySelectorAll('[data-lcs-pf-brick]')];
        if (bricks.length !== cfg.bricks) out.push(`card ${ci + 1}: ${bricks.length} bricks ≠ ${cfg.bricks}`);
        const hits = bricks.filter((b) => nf(b.dataset.lcsWord).includes(nf(rootW)));
        if (hits.length !== 1) out.push(`card ${ci + 1}: ${hits.length} bricks are built from the picture word (want exactly 1)`);
        const mem = bricks.filter((b) => b.dataset.lcsRole === 'member');
        if (mem.length !== 1 || hits[0] !== mem[0]) out.push(`card ${ci + 1}: the stamped member ≠ the re-derived one`);
        slots.push(hits.length ? +hits[0].dataset.lcsPfBrick : -1);
        for (const b of bricks) {
          const w = nf(b.dataset.lcsWord);
          if (b.dataset.lcsRole === 'foil' && w.slice(0, 2) !== nf(rootW).slice(0, 2)) out.push(`card ${ci + 1}: foil "${b.dataset.lcsWord}" does not share 2 initial letters with the picture word`);
          if (R(b).height < G1_BRICK - 0.5) out.push(`card ${ci + 1}: brick ${R(b).height.toFixed(1)} px < ${G1_BRICK}`);
          const t = b.querySelector('[data-lcs-brick-text]');
          if (!t || t.textContent !== b.dataset.lcsWord) out.push(`card ${ci + 1}: brick prints "${t && t.textContent}"`);
          else if (parseFloat(t.getAttribute('font-size')) < G1_TEXT) out.push(`card ${ci + 1}: brick text under ${G1_TEXT} px`);
          txtIn(b);
        }
        if (toks(visible).includes(nf(rootW))) out.push(`the picture word "${rootW}" is printed on the page (visible text)`);
        const img = stone && stone.querySelector('img[data-lcs-root-pic]');
        if (!img || !img.complete || !img.naturalWidth) out.push(`card ${ci + 1}: the picture does not load`);
        else { const ir = R(img); const drawn = Math.min(ir.width, ir.height); if (drawn < G1_PIC - 0.5) out.push(`card ${ci + 1}: picture ${drawn.toFixed(1)} px < ${G1_PIC}`); }
        return { root: rootW, pic: img && img.dataset.lcsRootPic, bricks: bricks.map((b) => ({ word: b.dataset.lcsWord, role: b.dataset.lcsRole })) };
      });
      const per = {}; for (const s of slots) per[s] = (per[s] || 0) + 1;
      for (const [s, n] of Object.entries(per)) if (n > Math.ceil(cfg.cards / cfg.bricks)) out.push(`the member sits in slot ${s} on ${n} of ${cfg.cards} cards (> ${Math.ceil(cfg.cards / cfg.bricks)}: a position tell)`);
      if (slots.length >= 3) { const k = cfg.bricks; const dd = ((slots[1] - slots[0]) % k + k) % k; if (dd && slots.every((s, i) => i < 1 || ((s - slots[i - 1]) % k + k) % k === dd)) out.push(`the member slots run in a staircase (${slots.join('')})`); }
      if (root.dataset.lcsSlots !== slots.join(',')) out.push(`slot stamp ${root.dataset.lcsSlots} ≠ the page ${slots.join(',')}`);
    }
    if (mode === 'root-word') {
      const cards = [...root.querySelectorAll('.ws-card')];
      if (cards.length !== cfg.cards) out.push(`${cards.length} cards ≠ ${cfg.cards}`);
      const fams = cards.map((c) => c.querySelector('[data-lcs-family]').dataset.lcsFamily);
      if (new Set(fams).size !== fams.length) out.push('two cards share a family');
      const worked = cards.filter((c) => c.querySelector('[data-lcs-worked]'));
      if (worked.length !== cfg.worked || cards[0] !== worked[0]) out.push(`worked cards ${worked.length} (want ${cfg.worked}, card 1)`);
      const rings = root.querySelectorAll('[data-lcs-ring]');
      const openText = cards.filter((c) => !c.querySelector('[data-lcs-worked]')).map((c) => c.innerText).join(' ');
      data.cards = cards.map((c, ci) => {
        const isW = !!c.querySelector('[data-lcs-worked]');
        const stone = c.querySelector('[data-lcs-rw-stone]'); const rootW = stone.dataset.lcsRoot;
        const words = [...c.querySelectorAll('[data-lcs-rw-brick]')].map((b) => b.dataset.lcsWord);
        if (words.length !== cfg.members) out.push(`card ${ci + 1}: ${words.length} members ≠ ${cfg.members}`);
        // re-derive: the longest part all members share
        const ws = words.map(nf); const a = ws.slice().sort((x, y) => x.length - y.length)[0] || ''; let common = '';
        outer: for (let L = a.length; L > 0; L--) for (let i = 0; i + L <= a.length; i++) { const s = a.slice(i, i + L); if (ws.every((w) => w.includes(s))) { common = s; break outer; } }
        if (common !== nf(rootW)) out.push(`card ${ci + 1}: the part all members share is "${common}" ≠ the stamped root "${rootW}"`);
        if (!isW) {
          if (stone.innerText.trim()) out.push(`card ${ci + 1}: the open stone is not empty ("${stone.innerText.trim()}")`);
          if (!stone.querySelector('svg[data-lcs-brick="socket-stem"]') || !stone.querySelector('[data-lcs-prim="writing-row"]')) out.push(`card ${ci + 1}: the open stone is not a lined stem socket`);
          if (toks(openText).includes(nf(rootW))) out.push(`card ${ci + 1}: the root "${rootW}" is printed on an open card (visible text)`);
          for (const b of c.querySelectorAll('[data-lcs-rw-brick]')) { const t = b.querySelector('[data-lcs-brick-text]'); if (!t || t.textContent !== b.dataset.lcsWord) out.push(`card ${ci + 1}: a member brick prints "${t && t.textContent}"`); else if (parseFloat(t.getAttribute('font-size')) < G2_TEXT) out.push(`card ${ci + 1}: member text under ${G2_TEXT}`); txtIn(b.querySelector('svg') ? b : b); }
        } else {
          const wr = c.querySelector('[data-lcs-worked-root]');
          if (!wr || wr.textContent !== rootW) out.push('the worked stone does not print its root');
          const cr = c.querySelectorAll('[data-lcs-ring]');
          if (cr.length !== cfg.members || [...cr].some((x) => nf(x.textContent) !== nf(rootW))) out.push('the worked card does not ring its root in every member');
          for (const x of c.querySelectorAll('[data-lcs-worked-text]')) { const tr = R(x.querySelector('[data-lcs-ring]')); const br = R(x.parentElement); const range = document.createRange(); range.selectNodeContents(x); const t = range.getBoundingClientRect(); if (t.left < br.left + 4 || t.right > br.right - 4) out.push('a worked member runs outside its brick'); if (tr.top < br.top - 0.5 || tr.bottom > br.bottom + 0.5) out.push('a worked ring leaves its brick'); }
        }
        for (const b of c.querySelectorAll('[data-lcs-rw-brick]')) if (R(b).height < G2_BRICK - 0.5) out.push(`card ${ci + 1}: brick under ${G2_BRICK}`);
        return { fam: c.querySelector('[data-lcs-family]').dataset.lcsFamily, root: rootW, words, worked: isW };
      });
      if (rings.length !== cfg.members * cfg.worked) out.push(`${rings.length} rings on the page (only the worked card rings)`);
    }
    if (mode === 'prefix-key') {
      const key = root.querySelector('[data-lcs-prefixes]');
      const prefixes = key ? key.dataset.lcsPrefixes.split('|') : [];
      if (prefixes.length !== cfg.keySize) out.push(`key of ${prefixes.length} ≠ ${cfg.keySize}`);
      const rows = [...root.querySelectorAll('[data-lcs-prow]')];
      if (rows.length !== cfg.rows) out.push(`${rows.length} rows ≠ ${cfg.rows}`);
      const rowsTxt = rows.map((r) => r.innerText).join(' ');
      for (const p of prefixes) if (toks(rowsTxt).includes(nf(p))) out.push(`the prefix "${p}" is printed in the rows`);
      data.rows = rows.map((r, i) => {
        const s = r.querySelector('[data-lcs-slot-for]');
        if (!s || +s.dataset.lcsSlotFor !== i + 1) out.push(`row ${i + 1}: the socket is not bound to its row`);
        if (!s || !s.querySelector('svg[data-lcs-brick="socket-prefix"]') || s.innerText.trim()) out.push(`row ${i + 1}: the prefix piece is not an empty socket-prefix`);
        const st = r.querySelector('[data-lcs-base-brick]');
        const t = st && st.querySelector('[data-lcs-brick-text]');
        if (!t || t.textContent !== r.dataset.lcsBase) out.push(`row ${i + 1}: the base brick prints "${t && t.textContent}" ≠ "${r.dataset.lcsBase}"`);
        if (st && R(st).width > 140.5) out.push(`row ${i + 1}: the base brick is ${R(st).width.toFixed(0)} px (> 140)`);
        // the joint: socket and stem meet (no gap), within 1 px of the dovetail overlap
        if (s && st) { const a = R(s.querySelector('svg')), b = R(st); if (b.left > a.right - 8 + 1 || b.left < a.right - 12) out.push(`row ${i + 1}: the base is not snapped onto the prefix piece (${(a.right - b.left).toFixed(1)} px overlap)`); }
        if (st) txtIn(st);
        const g = r.querySelector('[data-lcs-gloss]'); if (parseFloat(getComputedStyle(g).fontSize) < G2_TEXT) out.push(`row ${i + 1}: gloss under ${G2_TEXT}`);
        if (Math.round(R(g).height / parseFloat(getComputedStyle(g).lineHeight)) > 2) out.push(`row ${i + 1}: the gloss wraps to more than 2 lines`);
        if (s && R(s).height < G2_BRICK - 0.5) out.push(`row ${i + 1}: socket under ${G2_BRICK}`);
        return { base: r.dataset.lcsBase, glossId: r.dataset.lcsGlossId, gloss: g.textContent };
      });
      data.prefixes = prefixes;
    }
    if (mode === 'who-does-it') {
      const cards = [...root.querySelectorAll('[data-lcs-person]')];
      if (cards.length !== cfg.cards) out.push(`${cards.length} person cards ≠ ${cfg.cards}`);
      const keys = cards.map((c) => c.dataset.lcsPerson);
      if (keys.includes('singer') && keys.includes('musician')) out.push('singer and musician on one page');
      data.cards = cards.map((c, i) => {
        const img = c.querySelector('img[data-lcs-portrait]');
        if (!img || !img.complete || !img.naturalWidth) out.push(`card ${i + 1}: the portrait does not load`);
        else if (R(img).width < cfg.picPx - 0.5) out.push(`card ${i + 1}: portrait ${R(img).width} px < ${cfg.picPx}`);
        const b = c.querySelector('[data-lcs-base-brick]'); const t = b && b.querySelector('[data-lcs-brick-text]');
        if (!t || t.textContent !== c.dataset.lcsBase) out.push(`card ${i + 1}: the base brick prints "${t && t.textContent}"`);
        else if (parseFloat(t.getAttribute('font-size')) < G2_TEXT) out.push(`card ${i + 1}: base under ${G2_TEXT}`);
        if (b) { txtIn(b); if (R(b).height < G2_BRICK - 0.5) out.push(`card ${i + 1}: base brick under ${G2_BRICK}`); }
        const s = c.querySelector('[data-lcs-person-socket]');
        if (!s || s.innerText.trim() || !s.querySelector('[data-lcs-prim="writing-row"]')) out.push(`card ${i + 1}: the person socket is not an empty lined word socket`);
        else if (+s.dataset.lcsGlyphH < 26) out.push(`card ${i + 1}: writing glyphH ${s.dataset.lcsGlyphH} < 26`);
        return { person: c.dataset.lcsPerson, depicted: c.dataset.lcsDepicted, base: c.dataset.lcsBase, pic: img && img.dataset.lcsPortrait };
      });
      data.visible = root.innerText;
    }
    if (mode === 'family-in-sentence') {
      const blocks = [...root.querySelectorAll('[data-lcs-fblock]')];
      if (blocks.length !== cfg.blocks) out.push(`${blocks.length} blocks ≠ ${cfg.blocks}`);
      const gws = new Set();
      data.blocks = blocks.map((bl, bi) => {
        const course = [...bl.querySelectorAll('[data-lcs-course-brick]')].map((b) => b.dataset.lcsWord);
        if (course.length !== cfg.perBlock) out.push(`block ${bi + 1}: course of ${course.length} ≠ ${cfg.perBlock}`);
        for (const b of bl.querySelectorAll('[data-lcs-course-brick]')) { txtIn(b); if (R(b).height < G2_BRICK - 0.5) out.push(`block ${bi + 1}: course brick under ${G2_BRICK}`); if (R(b).width > 147.5) out.push(`block ${bi + 1}: course brick ${R(b).width.toFixed(0)} px > 147`); }
        const st = bl.querySelector('[data-lcs-stone-text]');
        if (!st || st.textContent !== bl.dataset.lcsRoot) out.push(`block ${bi + 1}: the stone does not print its root`);
        const sents = [...bl.querySelectorAll('[data-lcs-sentence]')];
        const gaps = sents.map((s) => {
          const g = s.querySelectorAll('[data-lcs-gap]');
          if (g.length !== 1) out.push(`sentence ${s.dataset.lcsSentence}: ${g.length} gaps`);
          const gg = g[0];
          if (gg) { gws.add(Math.round(R(gg.querySelector('[data-lcs-socket]')).width)); if (gg.innerText.trim()) out.push(`sentence ${s.dataset.lcsSentence}: the gap is not empty`); }
          const p = s.querySelector('[data-lcs-sentence-text]');
          const before = gg ? (gg.previousSibling && gg.previousSibling.textContent || '') : '';
          if (loc === 'en' && /(?:^|\s)an?\s*$/i.test(before)) out.push(`sentence ${s.dataset.lcsSentence}: an article ("a"/"an") before the gap agrees with only one member`);
          if (parseFloat(getComputedStyle(p).fontSize) < G2_TEXT) out.push(`sentence ${s.dataset.lcsSentence}: text under ${G2_TEXT}`);
          const lines = Math.round(R(p).height / Math.max(parseFloat(getComputedStyle(p).lineHeight), R(gg || p).height));
          if (R(p).height > 2 * 46) out.push(`sentence ${s.dataset.lcsSentence}: wraps past 2 lines (${R(p).height.toFixed(0)} px)`); void lines;
          return { slot: gg && gg.dataset.lcsSlot, n: +s.dataset.lcsSentence, text: p.textContent };
        });
        return { fam: bl.dataset.lcsFblock, root: bl.dataset.lcsRoot, course, gaps };
      });
      if (gws.size > 1) out.push(`gap widths differ on the page (${[...gws].join()})`);
      data.visible = root.innerText;
    }
    return { f: out, data };
  }, { ID, mode, G1_BRICK, G1_TEXT, G1_PIC, G2_BRICK, G2_TEXT });
  const out = r.f;
  const d = r.data;
  if (!d) return out;
  let block = null;
  try { block = loadBank(KEY, d.loc); } catch (e) { out.push('node cross-check: ' + e.message); return out; }
  const loc = d.loc;
  if (mode === 'picture-family') {
    const allWords = new Set([...(block.families || []), ...(block.rootFamilies || []), ...(block.picFamilies || [])].flatMap((f) => f.members.map((m) => low(m.word, loc))));
    for (const c of d.cards) {
      const f = (block.picFamilies || []).find((x) => x.root.word === c.root);
      if (!f) { out.push(`node: "${c.root}" is not a picture-root family of the ${loc} bank`); continue; }
      if (c.pic !== f.root.pic.theme + '/' + f.root.pic.noun) out.push(`node: card "${c.root}" shows ${c.pic} ≠ the pinned ${f.root.pic.theme}/${f.root.pic.noun}`);
      for (const b of c.bricks) {
        if (b.role === 'member' && !f.members.some((m) => m.word === b.word)) out.push(`node: "${b.word}" is not a member of ${f.id}`);
        if (b.role === 'foil' && allWords.has(low(b.word, loc))) out.push(`node: foil "${b.word}" is a family member (a look-alike must belong to no family)`);
        if (b.role === 'foil' && !(f.lookAlikes || []).some((x) => x.word === b.word)) out.push(`node: foil "${b.word}" is not a signed look-alike of ${f.id}`);
      }
    }
    // round 1: the answer may not be the strictly longest brick on more than 60 % of the cards (re-derived from the stamps)
    const lt = longestTell(d.cards.map((c) => ({ member: (c.bricks.find((b) => b.role === 'member') || {}).word, foils: c.bricks.filter((b) => b.role === 'foil').map((b) => b.word) })).filter((c) => c.member));
    if (lt) out.push('answer tell: ' + lt);
  }
  if (mode === 'root-word') {
    const byId = Object.fromEntries([...(block.families || []), ...(block.rootFamilies || [])].map((f) => [f.id, f]));
    for (const c of d.cards) {
      const f = byId[c.fam];
      if (!f) { out.push(`node: card family ${c.fam} is not in the bank`); continue; }
      if (f.root.word !== c.root) out.push(`node: card ${c.fam} root "${c.root}" ≠ the bank "${f.root.word}"`);
      for (const w of c.words) if (!f.members.some((m) => m.word === w)) out.push(`node: "${w}" is not a member of ${c.fam}`);
      if (c.words.filter((w) => (f.members.find((m) => m.word === w) || {}).kind === 'compound').length > 1) out.push(`node: card ${c.fam} prints 2 compounds`);
    }
    const w = d.cards.find((c) => c.worked);
    if (w) for (const c of d.cards) if (!c.worked) { const tw = tri(low(byId[w.fam].stem, loc)); if ([...tri(low(byId[c.fam].stem, loc))].some((x) => tw.has(x))) out.push(`node: the worked stem shares a 3-letter string with card ${c.fam}`); }
  }
  if (mode === 'prefix-key') {
    const pk = block.prefixKey;
    const neg = new Set((block.negating || []).map((x) => low(x, loc)));
    for (const p of d.prefixes) if (neg.has(low(p, loc))) out.push(`node: key prefix "${p}" is negating`);
    const ans = d.rows.map((row, i) => {
      const r = pk.rows.find((x) => x.word === row.glossId && x.base === row.base);
      if (!r) { out.push(`node: row ${i + 1} (${row.base}) is not a signed prefixKey row`); return null; }
      if (r.gloss !== row.gloss) out.push(`node: row ${i + 1} prints a gloss ≠ the bank`);
      const q = glossQuotesKey(row.gloss, pk.prefixes.filter((p) => d.prefixes.includes(p.prefix)).map((p) => p.meaning), loc);
      if (q.length) out.push(`answer tell: row ${i + 1} (${row.base}): the meaning line quotes the key ("${q.join('", "')}")`);
      const good = (pk.crossCheck || []).filter((c) => c.base === row.base && d.prefixes.includes(c.prefix) && c.isWord && c.fitsGloss);
      if (good.length !== 1 || good[0].prefix !== r.prefix) out.push(`node: row ${i + 1} (${row.base}): ${good.length} key prefixes fit its meaning (want exactly 1)`);
      if ((r.prefix + r.base).normalize('NFC') !== r.word.normalize('NFC')) out.push(`node: row ${i + 1}: prefix + base ≠ the word`);
      return r.prefix;
    });
    if (ans.every(Boolean)) {
      for (const p of d.prefixes) { const n = ans.filter((a) => a === p).length; if (n < 2) out.push(`node: key prefix "${p}" answers ${n} rows (< 2)`); }
      for (const t of answerRunTells(ans, d.prefixes.length)) out.push('answer tell: ' + t);
    }
  }
  if (mode === 'who-does-it') {
    const people = Object.fromEntries(PRONOUNS.en.people.map((p) => [p.key, p]));
    const vis = tokensOf(d.visible, loc);
    for (const c of d.cards) {
      const a = (block.agents || []).find((x) => x.key === c.person), p = people[c.person];
      if (!a || !p) { out.push(`node: ${c.person} is not a signed agent`); continue; }
      if (p.depicted !== c.depicted) out.push(`node: ${c.person} stamped depicted ${c.depicted} ≠ the pronouns bank ${p.depicted}`);
      if (c.pic !== p.pic.theme + '/' + p.pic.noun) out.push(`node: ${c.person} portrait ≠ the pinned picture`);
      const ans = a.answer[p.depicted] || a.answer.any;
      if (!ans) out.push(`node: ${c.person} has no answer for the depicted "${p.depicted}"`);
      else {
        if (!low(ans, loc).includes(low(c.base, loc)) && !a.stemSigned) out.push(`node: ${c.person}: base "${c.base}" is not in the answer "${ans}"`);
        if (vis.includes(low(ans, loc))) out.push(`node: the answer "${ans}" is printed on the page`);
      }
      if (vis.includes(low(p.pic.noun, loc)) && low(p.pic.noun, loc) !== low(c.base, loc)) out.push(`node: the occupation label "${p.pic.noun}" is printed`);
    }
  }
  if (mode === 'family-in-sentence') {
    const vis = tokensOf(d.visible, loc);
    for (const b of d.blocks) {
      const ss = (block.sentences || {})[b.fam];
      if (!ss) { out.push(`node: block ${b.fam} has no sentences in the bank`); continue; }
      const byWord = Object.fromEntries(ss.map((x) => [x.word, x]));
      if (b.course.some((w) => !byWord[w]) || new Set(b.course).size !== b.course.length) out.push(`node: block ${b.fam} course [${b.course}] ≠ its four members once each`);
      const answers = b.gaps.map((g) => { const hits = b.course.filter((w) => byWord[w] && byWord[w].slot === g.slot); if (hits.length !== 1) out.push(`node: sentence ${g.n}: ${hits.length} course words carry slot ${g.slot} (want exactly 1)`); return hits[0]; });
      if (new Set(answers).size !== answers.length) out.push(`node: block ${b.fam}: a member answers two gaps`);
      b.course.forEach((w, i) => { if (answers[i] === w) out.push(`node: block ${b.fam}: course position ${i + 1} is the answer of sentence ${b.gaps[i].n} (not a derangement)`); });
      b.gaps.forEach((g, i) => { const s = byWord[answers[i]]; if (s && g.text.replace(/\s+/g, ' ').trim() !== s.frame.replace('{gap}', '').replace(/\s+/g, ' ').trim()) out.push(`node: sentence ${g.n} ≠ its bank frame`); });
      for (const w of b.course) if (vis.filter((x) => x === low(w, loc)).length !== 1) out.push(`node: "${w}" is printed ${vis.filter((x) => x === low(w, loc)).length} times (only on the course)`);
    }
  }
  return out;
}

const TYPE = {
  id: ID,
  slug: 'prefixes-suffixes-and-root-words',
  gradeBand: 'G2',
  assetClass: 'icon-placement',
  exerciseType: KEY,
  themeAxis: { applicable: false },
  unitAxis: { applicable: false },
  difficulty: {
    1: { mode: 'base', walls: 2, perWall: 3, rootPic: 'both', memberKinds: ['derived'], bankPx: 20, bankRowsMax: 2, courseH: 64, courseMaxH: 84, glyphH: 30, wallW: 330, maxGlyphs: 18 },
    2: { mode: 'base', walls: 2, perWall: 5, rootPic: 'auto', memberKinds: ['derived', 'prefixed', 'compound'], bankPx: 20, bankRowsMax: 3, courseH: 60, courseMaxH: 76, glyphH: 28, wallW: 330, maxGlyphs: 18 },
    3: { mode: 'base', walls: 3, perWall: 4, rootPic: 'neither', memberKinds: ['derived', 'prefixed', 'compound'], bankPx: 18, bankRowsMax: 3, courseH: 56, courseMaxH: 72, glyphH: 26, wallW: 215, maxGlyphs: 18 },
  },
  i18n: {
    en: {
      title: 'Root Words: Sort by the Root',
      instruction: 'Read each word at the top and write it on a line of the wall that stands on its root word.',
    },
  },
  FACE_MODES, REFUSED_FACES, FACE_KEYS,
  compatible, orderOk, commonPart, isStaircase, answerRunTells,

  build({ difficulty, locale }, ctx) {
    const loc = String(locale || 'en').slice(0, 2);
    const d = this.difficulty[difficulty];
    if (!d) throw new Error(`${ID}: no difficulty ${difficulty}`);
    return this._buildWith(loadBank(KEY, loc), d, { locale: loc }, ctx);
  },

  /** The whole build over an INJECTED bank block + resolved config (the gate's poison seam). */
  _buildWith(block, d, { locale }, ctx) {
    const loc = String(locale || 'en').slice(0, 2);
    const rng = ctx && ctx.rng;
    if (!rng) throw new Error(`${ID}: no rng in ctx (a seeded page)`);
    if (!block || typeof block !== 'object') throw new Error(`${ID}: no ${loc} bank block`);
    if (!d || typeof d !== 'object') throw new Error(`${ID}: no difficulty config`);
    if (d.mode !== 'base') {
      // Phase E: a face config is composed by its own branch, over its OWN keys (need() throws on a missing one)
      if (FACE_MODES.includes(d.mode)) return buildFace(this, block, d, loc, rng, ctx && ctx.facePlan);
      throw new Error(`${ID}: unknown mode "${d.mode}"`);
    }
    if (block.refuse && block.refuse.base) throw new Error(`${ID}: ${loc} refuses the base (bank.refuse.base)`);
    // guards on the RESOLVED config
    if (![2, 3].includes(d.walls)) throw new Error(`${ID}: walls ${d.walls} (2 or 3)`);
    if (!(d.perWall >= 3 && d.perWall <= 5)) throw new Error(`${ID}: perWall ${d.perWall} (3..5)`);
    if (d.walls * d.wallW + (d.walls - 1) * WALL_GAP > BODY_W) throw new Error(`${ID}: ${d.walls} walls of ${d.wallW} overflow the ${BODY_W} px body`);
    if (!(d.courseH >= G2_BRICK)) throw new Error(`${ID}: courseH ${d.courseH} < the G2 floor ${G2_BRICK}`);
    if (!(d.glyphH >= 24) || d.courseH - 8 < d.glyphH + 12) throw new Error(`${ID}: course ${d.courseH} cannot hold a glyphH ${d.glyphH} writing row`);
    if (!(d.courseMaxH >= d.courseH)) throw new Error(`${ID}: courseMaxH ${d.courseMaxH} < courseH ${d.courseH}`);
    if (!(d.bankPx >= G2_TEXT)) throw new Error(`${ID}: bankPx ${d.bankPx} < ${G2_TEXT}`);
    if (!['both', 'auto', 'neither'].includes(d.rootPic)) throw new Error(`${ID}: rootPic "${d.rootPic}"`);
    const S = block.strings && block.strings.base;
    if (!S || !S.title || !S.instruction) throw new Error(`${ID}: ${loc} bank has no strings.base (refuse)`);

    const kinds = new Set(d.memberKinds);
    const stoneW = d.wallW - 28;
    const fams = (block.families || []).filter((f) => f && f.signed === true).map((f) => ({
      id: literal(f.id, 'family id', loc), stem: literal(f.stem, `family ${f.id} stem`, loc),
      root: literal(f.root && f.root.word, `family ${f.id} root.word`, loc),
      pic: f.root && f.root.pic && f.root.picOpened === true ? f.root.pic : null,
      members: (f.members || []).filter((mm) => kinds.has(mm.kind) && glyphs(mm.word) <= d.maxGlyphs)
        .map((mm) => ({ word: literal(mm.word, `family ${f.id} member`, loc), kind: mm.kind })),
      allMembers: f.members || [],
    })).filter((f) => {
      // the root must fit its stone (with the picture when the page may print one)
      const room = stoneW - 19 - 8 - (d.rootPic === 'neither' ? 0 : 66);
      return WB.brickEstimate(30, glyphs(f.root)) - 24 <= room && f.members.filter((mm) => mm.kind !== 'compound').length + Math.min(1, f.members.filter((mm) => mm.kind === 'compound').length) >= d.perWall &&
        !f.members.some((mm) => low(mm.word, loc) === low(f.root, loc));
    });
    const pool = d.rootPic === 'both' ? fams.filter((f) => f.pic) : fams;
    if (pool.length < d.walls) throw new Error(`${ID}: ${loc} has ${pool.length} eligible families for ${d.walls} walls (refuse)`);

    let chosen = null;
    for (let t = 0; t < TRIES && !chosen; t++) {
      const idx = rng.shuffle(pool.map((f, i) => i));
      const set = [];
      for (const i of idx) { if (set.length === d.walls) break; if (compatible([...set, pool[i]], loc)) set.push(pool[i]); }
      if (set.length < d.walls) continue;
      // members: a seeded sample with <= 1 compound per family
      const picks = set.map((f) => {
        const comp = f.members.filter((mm) => mm.kind === 'compound'), rest = f.members.filter((mm) => mm.kind !== 'compound');
        const useComp = comp.length && rng.next() < 0.5 ? [rng.pick(comp)] : [];
        const need = d.perWall - useComp.length;
        const base = rest.length >= need ? rng.sample(rest, need) : null;
        return base ? rng.shuffle([...base, ...useComp]) : null;
      });
      if (picks.some((p) => !p)) continue;
      const words = [];
      set.forEach((f, fi) => picks[fi].forEach((mm) => words.push({ word: mm.word, famId: f.id })));
      let order = null;
      for (let k = 0; k < 200 && !order; k++) { const o = rng.shuffle(words); if (orderOk(o.map((x) => x.famId))) order = o; }
      if (!order) continue;
      const widths = order.map((x) => WB.brickWidthFor('word', x.word, d.bankPx));
      if (C5.wordPartPackRows(widths, 643, 10) > d.bankRowsMax) continue;
      chosen = { set, picks, order };
    }
    if (!chosen) throw new Error(`${ID}: no ${d.walls}-family page for ${loc} in ${TRIES} tries (refuse)`);
    const walls = rng.shuffle(chosen.set.slice());   // which family stands on the left: its own coin
    const withPic = d.rootPic === 'both' || (d.rootPic === 'auto' && walls.every((f) => f.pic));
    const picOf = (f) => (withPic ? { src: fileUri(f.pic.theme, f.pic.noun), key: f.pic.theme + '/' + f.pic.noun } : null);

    const bank = C5.wordPartBank({ words: chosen.order, px: d.bankPx, maxRows: d.bankRowsMax });
    const wallMin = C5.wordPartWallHeight({ courses: d.perWall, courseH: d.courseH }), wallMax = C5.wordPartWallHeight({ courses: d.perWall, courseH: d.courseMaxH });
    const wallHtml = walls.map((f) => C5.wordPartWall({ famId: f.id, stem: f.stem, root: f.root, pic: picOf(f), courses: d.perWall, courseH: d.courseH, glyphH: d.glyphH, w: d.wallW, maxCourseH: d.courseMaxH })).join('');
    const stamp = { walls: d.walls, perWall: d.perWall, rootPic: d.rootPic, withPic, bankPx: d.bankPx, bankRowsMax: d.bankRowsMax, courseH: d.courseH, courseMaxH: d.courseMaxH, glyphH: d.glyphH, wallW: d.wallW, maxGlyphs: d.maxGlyphs };
    const bodyHtml = `<div class="wp-page" data-ws-content data-lcs-type="${ID}" data-lcs-wordparts="" data-lcs-mode="base" data-lcs-walls="${d.walls}" data-lcs-per="${d.perWall}" ` +
      `data-lcs-locale="${loc}" data-lcs-cfg="${esc(JSON.stringify(stamp))}" style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:flex-start;gap:14px;min-height:0">` +
      bank.html + `<div class="wp-walls" data-lcs-walls-row="" style="display:flex;justify-content:center;align-items:stretch;gap:${WALL_GAP}px;flex:1 1 auto;min-height:${wallMin}px;max-height:${wallMax}px">${wallHtml}</div></div>`;
    return {
      bodyHtml,
      meta: { families: walls.map((f) => f.id), bank: chosen.order.map((x) => x.word), bankFamilies: chosen.order.map((x) => x.famId), left: walls[0].id, withPic, rows: bank.rows, cfg: stamp },
    };
  },

  async verify(page) {
    const faceMode = await page.evaluate((ID) => { const r = document.querySelector(`[data-lcs-type="${ID}"]`); return r ? r.dataset.lcsMode : null; }, ID);
    if (faceMode && faceMode !== 'base') return verifyFace(page, faceMode);
    const f = await page.evaluate(({ ID, G2_BRICK, G2_TEXT }) => {
      const out = [];
      const root = document.querySelector(`[data-lcs-type="${ID}"]`);
      if (!root) return { f: ['no root'], data: null };
      let cfg; try { cfg = JSON.parse(root.dataset.lcsCfg); } catch (e) { return { f: ['unreadable cfg stamp'], data: null }; }
      const nf = (s) => String(s).normalize('NFC').toLocaleLowerCase(root.dataset.lcsLocale || 'en');
      const W = +root.dataset.lcsWalls, P = +root.dataset.lcsPer;
      const walls = [...root.querySelectorAll('[data-lcs-wall]')];
      const bricks = [...root.querySelectorAll('[data-lcs-bank-brick]')];
      if (walls.length !== W) out.push(`${walls.length} walls ≠ ${W}`);
      if (bricks.length !== W * P) out.push(`${bricks.length} bank bricks ≠ ${W} x ${P}`);
      if (root.querySelector('[data-lcs-answer]')) out.push('an answer stamp (data-lcs-answer) on the page — answerBox in place of a brick socket');
      // re-derive each brick's wall: the UNIQUE wall whose stem occurs in the brick word
      const count = {};
      const fam = bricks.map((b) => {
        const w = nf(b.dataset.lcsWord);
        const hits = walls.filter((wl) => w.includes(nf(wl.dataset.lcsStem)));
        b.__hits = hits.map((wl) => wl.dataset.lcsWall);
        if (hits.length > 1) { out.push(`brick "${b.dataset.lcsWord}": ${hits.length} walls whose stem it contains (want exactly 1)`); return null; }
        const id = hits.length ? hits[0].dataset.lcsWall : b.dataset.lcsFamilyOf;   // 0 hits: a stemSigned member (umlaut / gradation) — settled by the node cross-check
        count[id] = (count[id] || 0) + 1;
        if (b.dataset.lcsFamilyOf !== id) out.push(`brick "${b.dataset.lcsWord}": stamped family ${b.dataset.lcsFamilyOf} ≠ re-derived ${id}`);
        const txt = b.querySelector('[data-lcs-brick-text]');
        if (!txt || txt.textContent !== b.dataset.lcsWord) out.push(`brick "${b.dataset.lcsWord}" prints "${txt && txt.textContent}" (a whole, unsplit literal)`);
        return id;
      });
      for (const wl of walls) {
        const id = wl.dataset.lcsWall;
        if ((count[id] || 0) !== P) out.push(`wall ${id} receives ${count[id] || 0} bricks ≠ ${P}`);
        const courses = wl.querySelectorAll('[data-lcs-course]');
        if (courses.length !== P) out.push(`wall ${id}: ${courses.length} courses ≠ ${P}`);
        for (const c of courses) {
          if (c.textContent.trim()) out.push(`wall ${id}: course ${c.dataset.lcsCourse} is not empty ("${c.textContent.trim()}")`);
          const r = c.getBoundingClientRect();
          if (r.height < Math.max(G2_BRICK, cfg.courseH) - 0.5) out.push(`wall ${id}: course ${r.height.toFixed(1)} px high < ${cfg.courseH}`);
          if (+c.dataset.lcsGlyphH < 24 || !c.querySelector('[data-lcs-prim="writing-row"]')) out.push(`wall ${id}: course without a school-lined writing row (glyphH >= 24)`);
          const s = c.querySelector('svg[data-lcs-brick="socket-word"]');
          if (!s) out.push(`wall ${id}: course is not a socket-word brick`);
        }
        const stone = wl.querySelector('[data-lcs-stone]');
        const st = stone && stone.querySelector('[data-lcs-stone-text]');
        if (!st || st.textContent !== wl.dataset.lcsRoot) out.push(`wall ${id}: the stone does not print its root "${wl.dataset.lcsRoot}"`);
        if (st) {
          const sr = st.getBoundingClientRect(), br = stone.getBoundingClientRect();
          const range = document.createRange(); range.selectNodeContents(st); const tr = range.getBoundingClientRect();
          if (tr.left < br.left + 9.5 + 4 - 0.5 || tr.right > br.right - 9.5 - 4 + 0.5) out.push(`wall ${id}: root "${st.textContent}" runs outside the stone's body`);
          if (parseFloat(getComputedStyle(st).fontSize) < 22) out.push(`wall ${id}: root text under 22 px`);
          void sr;
        }
        for (const b of bricks) if (stone && nf(stone.textContent).includes(nf(b.dataset.lcsWord))) out.push(`wall ${id}: the stone prints the bank word "${b.dataset.lcsWord}"`);
        const cr = wl.getBoundingClientRect();
        if (wl.scrollWidth > wl.clientWidth + 0.5) out.push(`wall ${id} overflows horizontally`);
        void cr;
      }
      // pictures: both stones or neither; each resolves (naturalWidth) and is >= 44 px
      const pics = walls.map((wl) => wl.querySelector('img[data-lcs-root-pic]'));
      if (pics.some(Boolean) && !pics.every(Boolean)) out.push('rootPic: a picture on one stone only (both or neither)');
      if (cfg.withPic !== pics.every(Boolean) || (!cfg.withPic && pics.some(Boolean))) out.push(`rootPic: stamped withPic ${cfg.withPic} ≠ the page`);
      for (const im of pics.filter(Boolean)) { if (!im.complete || !im.naturalWidth) out.push(`picture ${im.dataset.lcsRootPic} does not load`); if (im.getBoundingClientRect().width < 44 - 0.5) out.push(`picture ${im.dataset.lcsRootPic} under 44 px`); }
      // bank: rows, runs, floors, text inside each body
      const tops = new Set(bricks.map((b) => Math.round(b.getBoundingClientRect().top)));
      if (tops.size > Math.min(3, cfg.bankRowsMax)) out.push(`bank wraps to ${tops.size} rows (> ${Math.min(3, cfg.bankRowsMax)}; never a 4th row)`);
      for (let i = 2; i < fam.length; i++) if (fam[i] && fam[i] === fam[i - 1] && fam[i] === fam[i - 2]) out.push(`bank: 3 consecutive bricks of ${fam[i]} (positions ${i - 1}-${i + 1})`);
      const half = Math.floor(fam.length / 2);
      if (fam.length && (new Set(fam.slice(0, half)).size === 1 || new Set(fam.slice(fam.length - half)).size === 1)) out.push('bank: one half of the strip is a single family (grouped)');
      for (const b of bricks) {
        const r = b.getBoundingClientRect();
        if (r.height < G2_BRICK - 0.5) out.push(`brick "${b.dataset.lcsWord}" ${r.height.toFixed(1)} px < ${G2_BRICK}`);
        const t = b.querySelector('[data-lcs-brick-text]');
        if (!t) continue;
        if (parseFloat(t.getAttribute('font-size')) < G2_TEXT) out.push(`brick "${b.dataset.lcsWord}" text under ${G2_TEXT} px`);
        const tb = t.getBoundingClientRect(), body = b.dataset.lcsBody.split(',').map(Number);
        if (tb.left < r.left + body[0] + 4 - 0.5 || tb.right > r.left + body[1] - 4 + 0.5) out.push(`brick "${b.dataset.lcsWord}": brick text outside its body (text ${tb.width.toFixed(1)} px in a ${(body[1] - body[0]).toFixed(1)} px body)`);
      }
      const panel = root.querySelector('[data-lcs-bank-panel]');
      if (panel && panel.scrollWidth > panel.clientWidth + 0.5) out.push('the bank panel overflows horizontally');
      // no answer literal in visible text outside the strip (walls print only roots)
      const wallsTxt = walls.map((w) => nf(w.textContent)).join(' ');
      for (const b of bricks) if (wallsTxt.split(/\s+/).includes(nf(b.dataset.lcsWord))) out.push(`"${b.dataset.lcsWord}" is printed on a wall`);
      return { f: out, data: { locale: root.dataset.lcsLocale, walls: walls.map((w) => ({ id: w.dataset.lcsWall, stem: w.dataset.lcsStem, root: w.dataset.lcsRoot })), bricks: bricks.map((b) => ({ word: b.dataset.lcsWord, fam: b.dataset.lcsFamilyOf, hits: b.__hits || [] })) } };
    }, { ID, G2_BRICK, G2_TEXT });
    const out = f.f;
    // node cross-check: the stamps against the signed bank (the walls' stems / roots, each brick a signed member of its wall's family)
    if (f.data) {
      let block = null;
      try { block = loadBank(KEY, f.data.locale); } catch (e) { out.push('node cross-check: ' + e.message); }
      if (block) {
        const byId = Object.fromEntries((block.families || []).map((x) => [x.id, x]));
        for (const w of f.data.walls) {
          const fam = byId[w.id];
          if (!fam) { out.push(`node: wall ${w.id} is not a signed family of the ${f.data.locale} bank`); continue; }
          if (fam.stem !== w.stem || fam.root.word !== w.root) out.push(`node: wall ${w.id} stem/root "${w.stem}"/"${w.root}" ≠ the bank "${fam.stem}"/"${fam.root.word}"`);
        }
        for (const b of f.data.bricks) {
          const fam = byId[b.fam];
          const mem = fam && fam.members.find((mm) => mm.word === b.word);
          if (!mem) out.push(`node: bank brick "${b.word}" is not a signed member of ${b.fam}`);
          else if (b.hits.length === 0 && !mem.stemSigned) out.push(`brick "${b.word}": 0 walls whose stem it contains and no stemSigned in the bank (want exactly 1)`);
          const others = f.data.walls.filter((w) => w.id !== b.fam && byId[w.id] && byId[w.id].members.some((mm) => mm.word === b.word));
          if (others.length) out.push(`node: bank brick "${b.word}" is ALSO a member of ${others.map((o) => o.id).join()}`);
        }
        const comp = {};
        for (const b of f.data.bricks) { const fam = byId[b.fam]; const mm = fam && fam.members.find((x) => x.word === b.word); if (mm && mm.kind === 'compound') comp[b.fam] = (comp[b.fam] || 0) + 1; }
        for (const [k, n] of Object.entries(comp)) if (n > 1) out.push(`node: ${n} compound members of ${k} on one page (max 1)`);
      }
    }
    return out;
  },
};

/** The round-1 rules, shared with the gate (one source: qa/verify-b5-word-parts.js reads them here). */
TYPE._rules = { longestTell, strictlyLongest, LONGEST_MAX_SHARE, glossQuotesKey, fold, commonPart, commonPartFolded, REFUSED_FACES };
module.exports = TYPE;
