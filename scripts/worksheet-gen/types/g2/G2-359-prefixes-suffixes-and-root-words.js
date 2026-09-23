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
  FACE_MODES,
  compatible, orderOk,

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
      if (FACE_MODES.includes(d.mode)) throw new Error(`${ID}: mode "${d.mode}" is a face (Phase E) — the base composer refuses a face config rather than read it`);
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

module.exports = TYPE;
