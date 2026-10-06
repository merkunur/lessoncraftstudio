/**
 * G1-380 — Digraphs: "Which Letter Team Do You Hear?" = the SOUND ABACUS (nt10-E, b5;
 * family key `digraphs`, G1, letters, CCSS RF.1.3.a "know the spelling-sound
 * correspondences for common consonant digraphs"). Design:
 * docs/worksheet-gen/b5-designs/G1-380-digraphs.md §2 + §5; rulings _work/G1-380-critic.md;
 * build record _work/G1-380-build.md.
 *
 * One teal-framed abacus fills the body: across its top wire hang the page's KEY beads
 * (given, tealSoft) in page order; below, N wires run between two teal rails, each
 * carrying the SAME choice beads in the SAME columns; left of each wire, outside the
 * rail, one picture in a cream cap. The child says the picture's name and circles the
 * one bead on that wire whose team she hears. No word anywhere on the body; a teacher
 * checks the page in one glance down each column. Every team sits inside ONE bead
 * because it is ONE sound (primitives/team-bead.js).
 *
 * THEME axis OFF (`coordinate.theme:''`), no unitAxis (one team set per face per locale
 * is DATA, `sets.*`). build() reads ONLY its bank (lib/b5-common.js bank('digraphs',
 * loc) — a missing locale block THROWS) and draws each item's PINNED picture with
 * fileUri(theme, noun); never image-vocabulary.js / approved-words at render (the
 * validator already copied the word). es / it / sv / da / no are REFUSED whole-family
 * (§1): the spec THROWS for them even if a block exists; a block carrying
 * `refused` THROWS too.
 *
 * THE RULE THAT LOCKS THE TYPE (§1): an item is valid on a page iff (a) exactly ONE page
 * team is an ELEMENT of its signed grapheme segmentation `seg` (never a substring test),
 * (b) no foil team's SOUND occurs anywhere in its `snd`, and (at d3) (c') a foil team's
 * single LETTER occurs in the word. Pictures on the bank's rejectedPics list never ship.
 *
 * Ladder (a CONFIG; every guard keys on the RESOLVED keys, never the level index):
 *   d1  mode base · wires 6  · set k (2 teams)        · perTeam [3,3] · cap 72 / icon 64 · rowMin 80 · bead 88x44/28
 *   d2  mode base · wires 8  · set exemplar (3 teams) · perTeam [2,3] · cap 68 / icon 60 · rowMin 68 · bead 76x44/26   (ships)
 *   d3  mode base · wires 10 · set exemplar           · perTeam [3,4] · cap 54 / icon 48 · rowMin 56 · bead 76x44/26 ·
 *       key row 52 (design §2 d3 ruling: 680 > 677 at key 60) · requireFoilLetterInWord   (never shipped)
 *   maxRun 2 everywhere; rowMax = cap + 36 (the SPARSE ceiling: blank band between two
 *   caps <= 40 px); showWord false everywhere.
 *
 * COMPOSER: per-team answer counts = rng.pick of every vector in perTeam summing to
 * `wires`; per team, items drawn from a shuffled valid pool refusing a repeated stem, a
 * repeated picture file, or a 3rd member of a `group` (the -fish compounds); wire order
 * rng.shuffle'd until (i) no column answers more than maxRun consecutive wires, (ii) the
 * answer-column sequence is never a staircase (col[i+1] = col[i] ± 1 mod n) over >= 6
 * consecutive wires, (iii) no column answers wires 1-3. Pools differ by locale, so every
 * check runs per locale on the SHIPPED instance (the gate measures it).
 *
 * STAMPS: root [data-ws-content][data-lcs-type="digraphs"] data-lcs-face="base"
 * data-lcs-teams="sh|ch|th" data-lcs-sounds (JSON team -> sounds) data-lcs-cfg (resolved
 * config JSON) data-lcs-locale; wire data-lcs-wire=<n> data-lcs-key data-lcs-seg
 * data-lcs-snd data-lcs-answer-col; row bead data-lcs-bead=<team> data-lcs-col; key bead
 * data-lcs-keybead=<team> data-lcs-col. verify(page) re-derives every answer from the
 * stamps and measures the render (column alignment, identical beads, wires on the rails,
 * the floors, pictures loaded, nothing printed but numerals and bead letters).
 */
'use strict';
const { slotFor } = require('../../lib/answer-slots.js');
const { bank: loadBank } = require('../../lib/b5-common.js');
const { fileUri } = require('../../lib/b2-common.js');
const { hasPicture } = require('../../lib/b3-picture-index.js');
const C5 = require('../../templates/components-b5.js');
const { teamTextW, teamBead } = require('../../primitives/team-bead.js');
const { esc } = require('../../primitives/_svg.js');
const { DIGRAPHS_NEUTRAL } = require('../../data/b5/digraphs.js');

const ID = 'G1-380';
const KEY = 'digraphs';
const BANK = 'digraphs';
const G1_FLOOR = 44, G1_TEXT = 26;
const SPARSE_MAX = 40;
const TRIES = 400;

/** The valid-item predicate (§1 rules a, b, c'); shared with the gate. */
function itemFitsPage(item, team, pageTeams, sounds, { requireFoilLetterInWord = false } = {}) {
  const seg = item.seg.map((g) => g.normalize('NFC').toLowerCase());
  const hits = pageTeams.filter((t) => seg.includes(t));
  if (hits.length !== 1 || hits[0] !== team) return `${item.word}: page teams in seg [${hits.join()}] ≠ exactly [${team}] (rule a)`;
  for (const f of pageTeams) {
    if (f === team) continue;
    const s = (sounds[f] || []).find((x) => item.snd.includes(x));
    if (s) return `${item.word}: holds the foil team ${f}'s sound /${s}/ (rule b)`;
  }
  if (requireFoilLetterInWord) {
    const w = item.word.toLowerCase();
    if (!pageTeams.some((f) => f !== team && [...f].some((ch) => w.includes(ch)))) return `${item.word}: no foil team letter in the word (d3 rule c')`;
  }
  return null;
}

/** Every per-team count vector with each count in [lo, hi] summing to total. */
function countVectors(n, lo, hi, total) {
  const out = [];
  const rec = (acc) => {
    if (acc.length === n) { if (acc.reduce((a, b) => a + b, 0) === total) out.push(acc.slice()); return; }
    for (let c = lo; c <= hi; c++) { acc.push(c); rec(acc); acc.pop(); }
  };
  rec([]);
  return out;
}

/** The answer-column order tells (§2 composer): returns a reason string or null. */
function orderTell(cols, n, maxRun) {
  let run = 1;
  for (let i = 1; i < cols.length; i++) { run = cols[i] === cols[i - 1] ? run + 1 : 1; if (run > maxRun) return `column ${cols[i]} answers ${run} consecutive wires (> maxRun ${maxRun})`; }
  if (cols.length >= 3 && cols[0] === cols[1] && cols[1] === cols[2]) return 'one column answers wires 1-3';
  for (const dir of [1, -1]) {
    let len = 1;
    for (let i = 1; i < cols.length; i++) {
      len = cols[i] === (((cols[i - 1] + dir) % n) + n) % n ? len + 1 : 1;
      if (len >= 6) return `the answer columns climb a ${dir > 0 ? 'staircase' : 'reverse staircase'} over ${len} wires`;
    }
  }
  return null;
}

/* ==========================================================================================
 * THE FIVE FACES (Phase E, 2026-09-23; design §3; record _work/G1-380-faces.md). ONE additive
 * knob `mode` ('sort-two' | 'gap' | 'match' | 'position' | 'text'); `mode:'base'` stays the
 * base path byte-for-byte (tools/b3-baseline.js --check). A face stamps data-lcs-face=<mode>
 * (+ data-lcs-mode) and its OWN resolved config; every guard keys on that config. The base's
 * keys ride along inert (the emitter spreads base.difficulty[2] under each face's override).
 *   F1 K-378  sort-two  CATEGORISE by ear: 6 pictures between two TEAM HOUSES (sets.k), draw a line
 *   F2 G1-392 gap       PRODUCE: the team written into a blank bead inside the printed word
 *   F3 G1-393 match     READ: 6 words (team marked in a given bead) matched to 6 pictures
 *   F4 G1-394 position  LOCATE: beginning / middle / end socket per picture (pt REFUSED)
 *   F5 G2-372 text      FIND + COUNT one team in three connected sentences
 * ========================================================================================== */
const C3 = require('../../templates/components-b3.js');
const METRICS = require('../../primitives/font-metrics.json')['baloo2-700'];
const FACE_MODES = ['sort-two', 'gap', 'match', 'position', 'text'];
const FILL_MIN = 0.85;
const fold = (s) => String(s).normalize('NFC').toLowerCase();
const js = (o) => JSON.stringify(o).replace(/'/g, '&#39;');

/** §3 F4: position = index of the team element in seg after dropping `silent` indices; whole-word teams -> null. */
function positionOf(item, team) {
  const silent = new Set(item.silent || []);
  const kept = item.seg.map((g, i) => ({ g: fold(g), i })).filter((x) => !silent.has(x.i));
  const at = kept.findIndex((x) => x.g === fold(team));
  if (at < 0 || kept.length < 2) return null;
  return at === 0 ? 'beginning' : at === kept.length - 1 ? 'end' : 'middle';
}
/** §5 rule 6 (print faces): no OTHER page team's letters in the word outside the team element. */
function printFits(item, team, pageTeams) {
  const j = item.seg.findIndex((g) => fold(g) === fold(team));
  const outside = item.seg.map((g, i) => (i === j ? '|' : fold(g))).join('');
  const f = pageTeams.find((x) => x !== team && outside.includes(fold(x)));
  return f ? `${item.word}: the foil team ${f}'s letters sit outside the team element (rule 6)` : null;
}
/** A run / alternation tell on a label sequence (F1 bins, F4 positions and teams). */
function seqTell(seq, maxRun, { alternation = false, periods = [] } = {}) {
  let run = 1;
  for (let i = 1; i < seq.length; i++) { run = seq[i] === seq[i - 1] ? run + 1 : 1; if (run > maxRun) return `"${seq[i]}" ${run} times in a row (> ${maxRun})`; }
  if (alternation && seq.length >= 4 && seq.every((x, i) => i === 0 || x !== seq[i - 1])) return 'the sequence strictly alternates';
  for (const p of periods) if (seq.length > p && seq.every((x, i) => i < p || x === seq[i - p])) return `the sequence repeats with period ${p}`;
  return null;
}
/** §3 F3: the right column's picture order is a derangement of the words', never its reversal or a rotation by 1, and no row offset repeats more than twice. */
function matchTell(rowR) {
  const n = rowR.length;
  if (rowR.some((r, i) => r === i)) return 'a word sits in its own picture\'s row';
  if (rowR.every((r, i) => r === n - 1 - i)) return 'the pictures are the words reversed';
  for (const k of [1, -1]) if (rowR.every((r, i) => r === (((i + k) % n) + n) % n)) return `the pictures are the words rotated by ${k}`;
  const off = {}; rowR.forEach((r, i) => { const o = (((r - i) % n) + n) % n; off[o] = (off[o] || 0) + 1; });
  if (Math.max(...Object.values(off)) > 2) return 'three or more pairs share one row offset';
  return null;
}
/** §3 F5: per-lane counts are never all equal and never monotone. */
function countTell(c) {
  if (c.every((x) => x === c[0])) return 'every sentence has the same count';
  if (c.every((x, i) => i === 0 || x >= c[i - 1]) || c.every((x, i) => i === 0 || x <= c[i - 1])) return 'the counts are monotone';
  return null;
}
/** The number of target ELEMENTS in a token list (never a substring count). */
function targetHits(tokens, target) { let n = 0; for (const tk of tokens) for (const g of tk.seg) if (fold(g) === fold(target)) n++; return n; }

function facePools(B, loc, teams, sounds, extra) {
  const rejected = new Set([...(DIGRAPHS_NEUTRAL.REJECTED_PICS_ALL || []), ...(B.rejectedPics || []).map((r) => (typeof r === 'string' ? r : r.pic))]);
  const pool = {};
  for (const t of teams) {
    const tb = B.teams && B.teams[t];
    if (!tb || !Array.isArray(tb.items) || !tb.items.length) throw new Error(`${ID}: ${loc} team "${t}" has no items (refuse)`);
    pool[t] = tb.items.filter((it) => it.picOpened === true && !rejected.has(it.theme + '/' + it.noun) && hasPicture(it.vocabKey, loc) &&
      !itemFitsPage(it, t, teams, sounds) && (!extra || extra(it, t)));
  }
  return pool;
}
/** Draw counts[t] items per team without a repeated stem / picture file / 3rd member of a group. */
function drawTeams(rng, teams, pool, counts, loc) {
  for (let tr = 0; tr < TRIES; tr++) {
    const stems = new Set(), pics = new Set(), groups = {};
    const pick = [];
    let ok = true;
    teams.forEach((t, j) => {
      if (!ok) return;
      let got = 0;
      for (const it of rng.shuffle(pool[t])) {
        if (got === counts[j]) break;
        const pic = it.theme + '/' + it.noun;
        if (stems.has(it.stem) || pics.has(pic) || (it.group && (groups[it.group] || 0) >= 2)) continue;
        stems.add(it.stem); pics.add(pic); if (it.group) groups[it.group] = (groups[it.group] || 0) + 1;
        pick.push({ item: it, team: t, col: j }); got++;
      }
      if (got < counts[j]) ok = false;
    });
    if (ok) return pick;
  }
  throw new Error(`${ID}: ${loc} could not draw [${counts}] items over [${teams}] without a repeated stem / picture (refuse)`);
}
function teamsAndSounds(B, d, loc, n) {
  const set = B.sets && B.sets[d.set];
  if (!Array.isArray(set) || set.length !== n) throw new Error(`${ID}: ${loc} sets.${d.set} is not ${n} teams (refuse)`);
  const sounds = {};
  for (const t of set) {
    const tb = B.teams && B.teams[t];
    if (!tb || !Array.isArray(tb.sound) || !tb.sound.length) throw new Error(`${ID}: ${loc} team "${t}" has no sound (refuse)`);
    sounds[t] = tb.sound;
  }
  return { teams: set.slice(), sounds };
}
function faceRoot(mode, loc, teams, sounds, cfg, inner, style) {
  return `<div data-ws-content data-lcs-type="${KEY}" data-lcs-face="${mode}" data-lcs-mode="${mode}" data-lcs-locale="${loc}" data-lcs-teams="${teams.join('|')}" ` +
    `data-lcs-sounds='${js(sounds)}' data-lcs-cfg='${js(cfg)}' style="flex:1;min-height:0;display:flex;flex-direction:column;${style}">` + inner + `</div>`;
}
const need = (c, m) => { if (!c) throw new Error(`${ID}: ${m}`); };

/* ==========================================================================================
 * LEVEL SET (2026-09-28): new team SETS by the native panels (data/b5/digraphs-levelset.json, kept out of the
 * bank so the published pages cannot change); the screen version (tap) and the answer key of every face.
 * ========================================================================================== */
let _ls = null;
function levelSetData(loc) {
  if (_ls === null) {
    const f = require('path').join(__dirname, '..', '..', 'data', 'b5', 'digraphs-levelset.json');
    _ls = require('fs').existsSync(f) ? JSON.parse(require('fs').readFileSync(f, 'utf8')) : {};
  }
  return _ls[loc] || null;
}
/** The published block + the level-set teams / sentences / rejections (what a NEW copy draws on). */
function levelSetBank(pub, loc) {
  const L = levelSetData(loc) || {};
  return {
    ...pub,
    teams: { ...pub.teams, ...(L.newTeams || {}) },
    samesound: [...(pub.samesound || []), ...(L.samesoundAdd || [])],
    rejectedPics: [...(pub.rejectedPics || []), ...(L.rejectedPicsAdd || [])],
    sentences: [...(pub.sentences || []), ...Object.values(L.sentences || {}).flat()],
    sets: { ...pub.sets },
  };
}
/** Two teams on this face at this level (the kindergarten sort, and the easier abacus / gap / match). */
function needTwo(d) { return d.mode === 'sort-two' || (d.mode === 'base' && d.teams === 2) || (d.mode === 'gap' && d.bankTeams === 2) || (d.mode === 'match' && d.teams === 2); }
/** Group g of the copies: 1 = the published teams, 2.. = the panels' sets. */
function levelSetPage(pub, d, loc, g) {
  const L = levelSetData(loc) || { sets: [] };
  const B = levelSetBank(pub, loc);
  if (g === 1) {
    const key = needTwo(d) ? 'k' : d.mode === 'position' ? 'position' : 'exemplar';
    return { B, d: { ...d, set: key } };
  }
  const grp = (L.sets || [])[g - 2];
  if (!grp) throw new Error(`${ID}: ${loc} has ${(L.sets || []).length + 1} team sets, no group ${g}`);
  B.sets.ls = needTwo(d) ? grp.k : grp.teams;
  return { B, d: { ...d, set: 'ls', targetIdx: 0 } };
}
const OPT = { w: 200, h: 104, gap: 12 };
const SCREEN_W = 660;
function sEsc(x) { return esc(String(x)); }
function scrItem(attrs, top, opts) {
  return `<div data-lcs-item ${attrs} data-ws-content style="display:flex;flex-direction:column;align-items:center;gap:10px;width:${SCREEN_W}px;padding:12px 8px;background:#FFFDF8;border:2px solid #EFE4D2;border-radius:16px;box-sizing:border-box">` +
    `<div style="display:flex;align-items:center;justify-content:center;gap:16px;min-height:44px">${top}</div>` +
    `<div style="display:flex;gap:${OPT.gap}px;justify-content:center;flex-wrap:nowrap">${opts}</div></div>`;
}
function optBtn(i, label, html, correct, w = OPT.w) {
  return `<span class="ws-achip" data-lcs-opt="${i}" data-lcs-label="${sEsc(label)}"${correct ? ' data-lcs-correct="1"' : ''} style="width:${w}px;height:${OPT.h}px;box-sizing:border-box;font-size:40px;gap:8px">${html}</span>`;
}
function scrPic(src, key, px = 104) { return `<img class="ws-icon" src="${src}" alt="" data-lcs-pic="${sEsc(key)}" style="width:${px}px;height:${px}px;object-fit:contain;flex:0 0 auto">`; }
function scrBody(mode, inner, extra = '') {
  return `<div data-ws-content data-lcs-type="${KEY}" data-lcs-screen="${mode}" style="flex:1;display:flex;flex-direction:column;gap:14px;align-items:center;padding-top:10px${extra}">${inner}</div>`;
}
/** Wrong options by ROTATION (each other item is a wrong option equally often). */
function rotated(list, i, n) { return Array.from({ length: n }, (_, k) => list[(i + 1 + k) % list.length]); }
const POS = ['beginning', 'middle', 'end'];
function posIcon(k) {
  const x = [16, 60, 104][k];
  return `<svg width="120" height="40" viewBox="0 0 120 40" aria-hidden="true"><line x1="10" y1="20" x2="110" y2="20" stroke="#146B5E" stroke-width="4" stroke-linecap="round"/><circle cx="${x}" cy="20" r="12" fill="#F2784B"/></svg>`;
}
/** The screen version (tap) or the answer key of a built page; the print page passes through. */
function screenOrKey(mode, built, ctx, loc) {
  if (!ctx || (!ctx.interactive && !ctx.answerKey)) return built;
  const A = built._ans;
  if (!A) throw new Error(`${ID}: ${mode} has no answer data`);
  const out = { bodyHtml: built.bodyHtml, meta: built.meta };
  const coral = '#F2784B';
  if (ctx.interactive) {
    if (mode === 'text') {
      const rows = A.sentences.map((s, si) => `<div style="display:flex;flex-wrap:wrap;gap:12px;justify-content:center;width:${SCREEN_W}px;padding:10px 6px;background:#FFFDF8;border:2px solid #EFE4D2;border-radius:16px;box-sizing:border-box">` +
        s.tokens.map((tk, ti) => { const hit = tk.seg.some((g) => fold(g) === fold(A.target));
          return `<span class="ws-achip" data-lcs-item data-lcs-word="${sEsc(tk.w)}" data-lcs-seg="${sEsc(tk.seg.join('|'))}" data-lcs-target="${sEsc(A.target)}"${hit ? ' data-lcs-hit="1"' : ''} data-ws-content style="height:${OPT.h}px;min-width:96px;padding:0 18px;box-sizing:border-box;font-size:40px">${sEsc(tk.w)}</span>`; }).join('') + `</div>`).join('');
      const head = `<div style="font-family:'Baloo 2',cursive;font-weight:700;font-size:56px;color:#146B5E;background:#DDEBE8;border-radius:22px;padding:0 28px">${sEsc(A.target)}</div>`;
      out.bodyHtml = scrBody(mode, head + rows);
      return out;
    }
    const items = A.rows.map((r, i) => {
      const it = r.item, src = fileUri(it.theme, it.noun);
      // the item carries its SEGMENTATION only (the oracle's input); the team is carried only where the page shows it (position)
      const meta = `data-lcs-seg="${sEsc(it.seg.join('|'))}" data-lcs-silent="${sEsc((it.silent || []).join('|'))}"` + (mode === 'position' ? ` data-lcs-team="${sEsc(r.team)}"` : '');
      if (mode === 'match') {
        const others = rotated(A.rows, i, 2).map((x) => x.item);
        const slot = slotFor(it.noun + '|' + i, 3), opts = others.slice(); opts.splice(slot, 0, it);   // never a fixed rotation (a position tell, 2026-10-06)
        const j = it.seg.findIndex((g) => fold(g) === fold(r.team));
        const word = C5.beadWord({ seg: it.seg, teamIdx: j, px: 40, beadH: 52 });
        return scrItem(meta, word, opts.map((o, k) => optBtn(k, o.vocabKey, scrPic(fileUri(o.theme, o.noun), o.vocabKey, 84), k === slot)).join(''));
      }
      if (mode === 'position') {
        const bead = `<span style="font-family:'Baloo 2',cursive;font-weight:700;font-size:44px;color:#146B5E;background:#DDEBE8;border-radius:18px;padding:0 20px">${sEsc(r.team)}</span>`;
        return scrItem(meta, scrPic(src, it.vocabKey) + bead, POS.map((p, k) => optBtn(k, p, posIcon(k), p === r.pos)).join(''));
      }
      // base / sort-two / gap: tap the team
      let top = scrPic(src, it.vocabKey);
      if (mode === 'gap') {
        const j = it.seg.findIndex((g) => fold(g) === fold(r.team));
        const pre = it.seg.slice(0, j).join(''), post = it.seg.slice(j + 1).join('');
        top += `<span style="font-family:Nunito,sans-serif;font-weight:800;font-size:44px;color:#3A3530;display:flex;align-items:center;gap:6px">${sEsc(pre)}<span style="display:inline-block;width:70px;height:48px;border:3px dashed ${coral};border-radius:12px"></span>${sEsc(post)}</span>`;
      }
      const w = A.teams.length === 2 ? 240 : OPT.w;
      return scrItem(meta, top, A.teams.map((t, k) => optBtn(k, t, sEsc(t), t === r.team, w)).join(''));
    });
    out.bodyHtml = scrBody(mode, items.join(''));
    return out;
  }
  // answer key: the print page + a style block marking every answer
  const css = [];
  const badge = (content) => `content:"${content}";position:absolute;top:-10px;right:-10px;min-width:30px;height:30px;padding:0 6px;border-radius:15px;background:${coral};color:#fff;font:700 18px/30px 'Baloo 2',cursive;text-align:center;z-index:2`;
  if (mode === 'base') A.rows.forEach((r, i) => css.push(`[data-lcs-wire="${i + 1}"] [data-lcs-bead][data-lcs-col="${r.col}"]{outline:4px solid ${coral};outline-offset:2px;border-radius:24px}`));
  if (mode === 'sort-two') { css.push('[data-lcs-card]{position:relative}'); A.rows.forEach((r, i) => css.push(`[data-lcs-card="${i + 1}"]::after{${badge(r.team)}}`)); }
  if (mode === 'gap') A.rows.forEach((r, i) => css.push(`[data-lcs-gaprow="${i + 1}"] [data-lcs-gapbead]{position:relative}`, `[data-lcs-gaprow="${i + 1}"] [data-lcs-gapbead]::after{content:"${r.team}";position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font:700 26px 'Baloo 2',cursive;color:${coral}}`));
  if (mode === 'match') css.push('[data-lcs-pair]{position:relative}', `[data-lcs-pair]::before{content:attr(data-lcs-pair);position:absolute;top:-8px;left:-8px;min-width:26px;height:26px;border-radius:13px;background:${coral};color:#fff;font:700 16px/26px 'Baloo 2',cursive;text-align:center;z-index:2}`);
  if (mode === 'position') A.rows.forEach((r, i) => css.push(`[data-lcs-poscard="${i + 1}"] [data-lcs-socket="${POS.indexOf(r.pos)}"]{outline:4px solid ${coral};outline-offset:2px;border-radius:14px}`));
  if (mode === 'text') {
    A.sentences.forEach((s, i) => css.push(`[data-lcs-countbox="${i + 1}"]{position:relative}`, `[data-lcs-countbox="${i + 1}"]::after{content:"${s.n}";position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font:700 28px 'Baloo 2',cursive;color:${coral}}`));
    // ring every target in the sentences
    let html = out.bodyHtml;
    for (const s of A.sentences) {
      const plain = `>${esc(s.text)}</p>`;
      if (!html.includes(plain)) continue;
      let text = s.text, marked = '', at = 0;
      for (const tk of s.tokens) {
        const k = text.indexOf(tk.w, at);
        if (k < 0) break;
        marked += esc(text.slice(at, k));
        let o = 0;
        for (const g of tk.seg) { const piece = tk.w.slice(o, o + g.length); marked += fold(g) === fold(A.target) ? `<span style="border:3px solid ${coral};border-radius:10px;padding:0 1px">${esc(piece)}</span>` : esc(piece); o += g.length; }
        at = k + tk.w.length;
      }
      marked += esc(text.slice(at));
      html = html.replace(plain, `>${marked}</p>`);
    }
    out.bodyHtml = html;
  }
  out.bodyHtml = out.bodyHtml + `<style data-lcs-key>${css.join('')}</style>`;
  return out;
}
/**
 * The robot gate's INDEPENDENT truth: for each screen item the correct option, recomputed from the item's
 * SEGMENTATION (the team that is an element of seg; the position after dropping silent graphemes; the
 * picture whose bank item spells the word), never from the page's answer marks. tap-select (text): a word is
 * chosen iff the target team is an element of its seg.
 */
function digOracle(mode, items, loc) {
  if (mode === 'text') return items.map((it) => (it.meta['data-lcs-seg'] || '').split('|').some((g) => fold(g) === fold(it.meta['data-lcs-target'])));
  const B = levelSetBank(loadBank(BANK, loc), loc);
  return items.map((it) => {
    const seg = (it.meta['data-lcs-seg'] || '').split('|');
    let want;
    if (mode === 'position') {
      const team = it.meta['data-lcs-team'];
      want = positionOf({ seg, silent: (it.meta['data-lcs-silent'] || '').split('|').filter(Boolean).map(Number) }, team);
    } else if (mode === 'match') {
      // a spelling can name more than one picture (fr "lapin" = rabbit AND bunny): any of them is the word's
      // picture, and exactly ONE of the offered pictures may be (two would be two right answers)
      const keys = new Set(Object.values(B.teams).flatMap((t) => t.items).filter((x) => x.seg.join('') === seg.join('')).map((x) => x.vocabKey));
      const hits = it.options.filter((o) => keys.has(o));
      if (hits.length !== 1) throw new Error(`oracle: ${seg.join('')} names ${hits.length} of the pictures ${it.options.join('/')}`);
      want = hits[0];
    } else {
      const hits = it.options.filter((t) => seg.some((g) => fold(g) === fold(t)));
      if (hits.length !== 1) throw new Error(`oracle: ${seg.join('')} holds ${hits.length} of the options ${it.options.join('/')}`);
      want = hits[0];
    }
    const idx = it.options.indexOf(want);
    if (idx < 0) throw new Error(`oracle: "${want}" not among ${it.options.join('/')} (${seg.join('')})`);
    return idx;
  });
}
function interactiveFor(mode) {
  const select = mode === 'text';
  return {
    kind: select ? 'tap-select' : 'tap-choice', item: '[data-lcs-item]', option: select ? undefined : '[data-lcs-opt]',
    answerAttr: select ? 'data-lcs-hit' : 'data-lcs-key', labelAttr: 'data-lcs-word',
    metaAttrs: ['data-lcs-seg', 'data-lcs-silent', 'data-lcs-team', 'data-lcs-target', 'data-lcs-word'],
    instructionKey: mode, screenHeight: 3600,
    oracle: (items, loc) => digOracle(mode, items, (loc || 'en').slice(0, 2)),
  };
}

const FACE_BUILD = {
  /* F1 — Sort by Letter Team (K) */
  'sort-two'(B, d, loc, rng) {
    need(d.bins === 2 && Array.isArray(d.split) && d.split.length === 2 && d.split[0] + d.split[1] === d.pictures, `sort-two split [${d.split}] ≠ ${d.pictures} pictures over 2 houses`);
    need(d.split.every((x) => x >= 2), `sort-two split [${d.split}]: a house with < 2 pictures (the 6/0 tell)`);
    need(d.houseBead.h >= 56 && d.houseBead.fontPx >= 30, `sort-two house bead ${d.houseBead.h} / ${d.houseBead.fontPx} px under the K floors 56 / 30`);
    need(d.iconPx >= 56 && d.cardMinH >= 56, 'sort-two picture / card under the K floor 56');
    need(d.houseW * 2 + d.gutter * 2 + d.cardW <= 639, 'sort-two row wider than the 639 lane');
    const { teams, sounds } = teamsAndSounds(B, d, loc, 2);
    const pool = facePools(B, loc, teams, sounds);
    teams.forEach((t, j) => need(pool[t].length >= d.split[j], `${loc} team "${t}" has ${pool[t].length} valid pictures < ${d.split[j]} (refuse)`));
    const drawn = drawTeams(rng, teams, pool, d.split, loc);
    let order = null;
    if (d.forceBins) { const bk = teams.map((_, j) => drawn.filter((x) => x.col === j)); order = d.forceBins.map((b) => bk[b].shift()); }   // the GATE's poison seam, never shipped
    for (let tr = 0; tr < TRIES && !order; tr++) { const o = rng.shuffle(drawn); if (!seqTell(o.map((x) => x.col), d.maxRun, { alternation: true })) order = o; }
    need(order, 'sort-two: no picture order free of the house tells');
    const cards = order.map((x) => ({ src: fileUri(x.item.theme, x.item.noun), vocabKey: x.item.vocabKey, seg: x.item.seg, snd: x.item.snd, bin: x.col }));
    const cfg = { mode: d.mode, pictures: d.pictures, split: d.split, maxRun: d.maxRun, iconPx: d.iconPx, iconMax: d.iconMax, cardMinH: d.cardMinH, houseBead: d.houseBead, floor: 56 };
    const html = C5.teamHouses({ teams, cards, cfg: d }).html;
    return { bodyHtml: faceRoot(d.mode, loc, teams, sounds, cfg, html, 'align-items:stretch'), meta: { teams, bins: order.map((x) => x.col), items: order.map((x) => x.item.vocabKey) },
      _ans: { teams, sounds, rows: order.map((x) => ({ item: x.item, team: x.team, col: x.col })) } };
  },

  /* F2 — Write the Missing Letter Team (G1) */
  gap(B, d, loc, rng) {
    const { teams, sounds } = teamsAndSounds(B, d, loc, d.bankTeams);
    const beadW = teams.some((t) => [...t].length >= 3) ? d.beadW3 : d.beadW2;
    need(d.beadH >= 44, `gap bead ${d.beadH} < the G1 floor 44`);
    need(d.iconPx >= 44, 'gap picture under the G1 floor 44');
    const pool = facePools(B, loc, teams, sounds, (it, t) => {
      if (printFits(it, t, teams)) return false;
      if (it.noGap) return false;                                             // rule 10: a frame the validator found ambiguous
      if (d.onlyPos && !d.onlyPos.includes(positionOf(it, t))) return false;  // Level Set: the team at the start (easier) / inside or at the end (harder)
      if ([...it.word].length > d.maxLetters) return false;
      const j = it.seg.findIndex((g) => fold(g) === fold(t));
      if (!d.gapInitialCapital && j === 0 && /^\p{Lu}/u.test(it.seg[0])) return false;   // the capital rule
      if (B.sets.ls) {   // Level Set team sets only (the published pools are untouched): the verify() rules, applied before the draw
        const rest = it.seg.filter((_, k) => k !== j).join('');
        if (!rest) return false;                                              // nl "ui": the team IS the word — nothing left to print
        if (teams.some((u) => fold(rest).includes(fold(u)))) return false;    // pt "pintinho": the team's letters still printed
      }
      return true;
    });
    teams.forEach((t) => need(pool[t].length >= d.perTeam[1], `${loc} team "${t}" has ${pool[t].length} gap-eligible items < ${d.perTeam[1]} (refuse)`));
    const counts = d.forceCols ? teams.map((_, j) => d.forceCols.filter((c) => c === j).length) : rng.pick(countVectors(teams.length, d.perTeam[0], d.perTeam[1], d.rows));
    const drawn = drawTeams(rng, teams, pool, counts, loc);
    let order = null;
    if (d.forceCols) { const bk = teams.map((_, j) => drawn.filter((x) => x.col === j)); order = d.forceCols.map((c) => bk[c].shift()); }   // the GATE's poison seam, never shipped
    for (let tr = 0; tr < TRIES && !order; tr++) { const o = rng.shuffle(drawn); if (!orderTell(o.map((x) => x.col), teams.length, d.maxRun)) order = o; }
    need(order, 'gap: no row order free of the team tells');
    const rowCfg = { numW: d.numW, capPx: d.capPx, iconPx: d.iconPx, capGap: d.capGap, wordPx: d.wordPx, bead: { w: beadW, h: d.beadH } };
    const rows = order.map((x, i) => C5.gapWordRow({ n: i + 1, src: fileUri(x.item.theme, x.item.noun), vocabKey: x.item.vocabKey, seg: x.item.seg, snd: x.item.snd,
      gapIdx: x.item.seg.findIndex((g) => fold(g) === fold(x.team)), cfg: rowCfg, first: i === 0 })).join('');
    const bank = C5.beadBank({ teams, bead: d.bankBead, wireW: d.bankWireW });
    const cfg = { mode: d.mode, rows: d.rows, perTeam: d.perTeam, maxRun: d.maxRun, bead: { w: beadW, h: d.beadH }, wordPx: d.wordPx, iconPx: d.iconPx, capPx: d.capPx, maxLetters: d.maxLetters, xHeight: METRICS.xHeight };
    const inner = `<div style="display:flex;justify-content:center;flex:0 0 auto;margin-bottom:${d.bankGap}px">${bank}</div>` +
      `<div data-lcs-gaprows style="flex:1 1 auto;min-height:0;width:${d.laneW}px;align-self:center;display:grid;grid-template-rows:repeat(${d.rows},minmax(${d.rowMin}px,1fr))">${rows}</div>`;
    return { bodyHtml: faceRoot(d.mode, loc, teams, sounds, cfg, inner, 'align-items:stretch'), meta: { teams, cols: order.map((x) => x.col), items: order.map((x) => x.item.vocabKey) },
      _ans: { teams, sounds, rows: order.map((x) => ({ item: x.item, team: x.team, col: x.col })) } };
  },

  /* F3 — Read and Match (G1) */
  match(B, d, loc, rng) {
    const { teams, sounds } = teamsAndSounds(B, d, loc, d.teams);
    need(d.pairs === teams.length * d.perPair, `match ${d.pairs} pairs ≠ ${teams.length} teams x ${d.perPair}`);
    need(d.iconPx >= 44 && d.beadH >= 26 && d.wordPx >= 26, 'match under the G1 floors');
    const pool = facePools(B, loc, teams, sounds, (it, t) => !printFits(it, t, teams) && [...it.word].length <= d.maxLetters);
    teams.forEach((t) => need(pool[t].length >= d.perPair, `${loc} team "${t}" has ${pool[t].length} readable items < ${d.perPair} (refuse)`));
    const drawn = drawTeams(rng, teams, pool, teams.map(() => d.perPair), loc);
    let left = null, rowR = null;
    if (d.forceRowR) { left = drawn.slice(); rowR = d.forceRowR.slice(); }   // the GATE's poison seam, never shipped
    for (let tr = 0; tr < TRIES && !rowR; tr++) {
      left = rng.shuffle(drawn);
      if (seqTell(left.map((x) => x.col), d.maxRun)) continue;
      const perm = rng.shuffle(left.map((_, i) => i));
      if (!matchTell(perm)) rowR = perm;
    }
    need(rowR, 'match: no picture order free of the derangement tells');
    const right = new Array(left.length);
    rowR.forEach((r, i) => { right[r] = { ...left[i], pair: i + 1 }; });
    const itemStyle = (w) => `width:${w}px;flex:1 1 ${d.itemMinH}px;min-height:${d.itemMinH}px;box-sizing:border-box`;
    const L = left.map((x, i) => `<div class="ws-match-item ws-match-item--plain" data-lcs-left="${i + 1}" data-lcs-pair="${i + 1}" data-lcs-seg="${esc(x.item.seg.join('|'))}" data-lcs-snd="${esc(x.item.snd.join('|'))}" style="${itemStyle(d.itemW)}">` +
      C5.beadWord({ seg: x.item.seg, teamIdx: x.item.seg.findIndex((g) => fold(g) === fold(x.team)), px: d.wordPx, beadH: d.beadH }) +
      `<span class="ws-match-dot ws-match-dot--right"></span></div>`).join('');
    const R = right.map((x, r) => `<div class="ws-match-item" data-lcs-right="${r + 1}" data-lcs-pair="${x.pair}" data-lcs-key="${esc(x.item.vocabKey)}" style="${itemStyle(d.picW)}">` +
      `<span class="ws-match-dot ws-match-dot--left"></span><img src="${fileUri(x.item.theme, x.item.noun)}" alt="" data-lcs-pic="${esc(x.item.vocabKey)}" ` +
      `style="height:clamp(${d.iconPx}px, calc(100% - 12px), ${d.iconMax}px);width:auto;aspect-ratio:1/1;object-fit:contain;display:block"></div>`).join('');
    const cfg = { mode: d.mode, pairs: d.pairs, perPair: d.perPair, wordPx: d.wordPx, beadH: d.beadH, iconPx: d.iconPx, maxLetters: d.maxLetters, itemMinH: d.itemMinH, wordMaxW: d.wordMaxW };
    const inner = `<div class="ws-match" data-lcs-matchboard style="padding:6px 30px;min-height:0"><div class="ws-match-col" data-lcs-col="L" style="justify-content:flex-start">${L}</div>` +
      `<div class="ws-match-col" data-lcs-col="R" style="justify-content:flex-start">${R}</div></div>`;
    return { bodyHtml: faceRoot(d.mode, loc, teams, sounds, cfg, inner, 'align-items:stretch'), meta: { teams, rowR, items: left.map((x) => x.item.vocabKey) },
      _ans: { teams, sounds, rows: left.map((x) => ({ item: x.item, team: x.team, col: x.col })) } };
  },

  /* F4 — Where Is the Letter Team? (G1) */
  position(B, d, loc, rng) {
    const { teams, sounds } = teamsAndSounds(B, d, loc, 3);
    need(d.socket.h >= 44 && d.socket.w >= d.socket.h, `position socket ${d.socket.w}x${d.socket.h} under the G1 floor 44`);
    need(d.iconPx >= 44, 'position picture under the G1 floor');
    need(d.cue && d.socket.w >= 44 && d.cue.h >= 20 && d.cue.dotR >= 8 && d.cue.head >= 16, 'position cue under its floors (segment >= 44 wide, >= 20 high, start disc r >= 8, arrowhead >= 16)');
    need(2 * d.cardW + d.colGap <= 639, 'position grid wider than the 639 lane');
    const POS = ['beginning', 'middle', 'end'];
    const pool = facePools(B, loc, teams, sounds, (it, t) => positionOf(it, t) !== null);
    const cands = [];
    for (const t of teams) for (const it of pool[t]) cands.push({ item: it, team: t, pos: positionOf(it, t) });
    for (const p of POS) need(cands.filter((c) => c.pos === p).length >= (d.minMiddle ? (p === 'middle' ? d.minMiddle : d.posSplit[0]) : d.posSplit[1]), `${loc}: position "${p}" reached by too few items (refuse F4)`);
    // Level Set (harder): at least `minMiddle` cards hide the team INSIDE the word (the hardest place to hear it)
    const posVecs = countVectors(3, d.posSplit[0], d.posSplit[1], d.cards).filter((v) => !d.minMiddle || v[1] >= d.minMiddle), teamVecs = countVectors(3, d.teamSplit[0], d.teamSplit[1], d.cards);
    let drawn = null;
    for (let tr = 0; tr < TRIES && !drawn; tr++) {
      const pc = d.forcePos ? POS.map((p) => d.forcePos.filter((x) => x === p).length) : rng.pick(posVecs), tc = d.forcePos ? [d.cards, d.cards, d.cards] : rng.pick(teamVecs);
      const pn = [0, 0, 0], tn = [0, 0, 0], stems = new Set(), pics = new Set(), groups = {}, pick = [];
      for (const c of rng.shuffle(cands)) {
        const pi = POS.indexOf(c.pos), ti = teams.indexOf(c.team), pic = c.item.theme + '/' + c.item.noun;
        if (pn[pi] >= pc[pi] || tn[ti] >= tc[ti] || stems.has(c.item.stem) || pics.has(pic) || (c.item.group && (groups[c.item.group] || 0) >= 2)) continue;
        pn[pi]++; tn[ti]++; stems.add(c.item.stem); pics.add(pic); if (c.item.group) groups[c.item.group] = (groups[c.item.group] || 0) + 1;
        pick.push(c);
        if (pick.length === d.cards) break;
      }
      if (pick.length === d.cards) drawn = pick;
    }
    need(drawn, `${loc}: could not fill ${d.cards} cards to the position / team split (refuse)`);
    let order = null;
    if (d.forcePos) { const bk = POS.map((p) => drawn.filter((x) => x.pos === p)); order = d.forcePos.map((p) => bk[POS.indexOf(p)].shift()); }   // the GATE's poison seam, never shipped
    for (let tr = 0; tr < TRIES && !order; tr++) {
      const o = rng.shuffle(drawn);
      const ps = o.map((x) => x.pos);
      if (seqTell(ps, d.maxRun, { periods: [2, 3] }) || seqTell(o.map((x) => x.team), d.maxRun)) continue;
      if ([0, 1].some((c) => new Set(ps.filter((_, i) => i % d.cols === c)).size < 2)) continue;
      order = o;
    }
    need(order, 'position: no card order free of the socket tells');
    const cardCfg = { iconPx: d.iconPx, colW: d.colW, teamBead: d.teamBead, socket: d.socket, sockGap: d.sockGap, cue: d.cue, cardMinH: d.cardMinH };
    const cards = order.map((x, i) => C5.socketCard({ i, src: fileUri(x.item.theme, x.item.noun), vocabKey: x.item.vocabKey, seg: x.item.seg, snd: x.item.snd, silent: x.item.silent, team: x.team, cfg: cardCfg })).join('');
    const cfg = { mode: d.mode, cards: d.cards, posSplit: d.posSplit, teamSplit: d.teamSplit, maxRun: d.maxRun, cols: d.cols, iconPx: d.iconPx, socket: d.socket, teamBead: d.teamBead, cue: d.cue };
    const inner = `<div data-lcs-cardgrid style="flex:1 1 auto;min-height:0;display:grid;grid-template-columns:repeat(${d.cols},${d.cardW}px);column-gap:${d.colGap}px;` +
      `grid-template-rows:repeat(${d.cards / d.cols},minmax(${d.cardMinH}px,1fr));row-gap:${d.rowGap}px;justify-content:center">${cards}</div>`;
    return { bodyHtml: faceRoot(d.mode, loc, teams, sounds, cfg, inner, 'align-items:stretch'), meta: { teams, pos: order.map((x) => x.pos), items: order.map((x) => x.item.vocabKey) },
      _ans: { teams, sounds, rows: order.map((x) => ({ item: x.item, team: x.team, pos: x.pos })) } };
  },

  /* F5 — Letter Teams in Sentences (G2) */
  text(B, d, loc, rng) {
    const set = B.sets && B.sets[d.set];
    need(Array.isArray(set) && set.length, `${loc} sets.${d.set} missing (refuse)`);
    const target = set[d.targetIdx];
    need(target, `${loc}: no target team (refuse)`);
    need(d.textPx >= 22 && d.box.h >= 36 && d.box.w >= 36, 'text under the G2 floors 36 / 22');
    const sents = (B.sentences || []).filter((s) => fold(s.target || target) === fold(target)).map((s) => ({ ...s, n: targetHits(s.tokens, target) }))
      .filter((s) => s.n >= d.hitsPerSentence[0] && s.n <= d.hitsPerSentence[1]);
    need(sents.length >= 6, `${loc}: ${sents.length} usable sentences for "${target}" < 6 (refuse)`);
    let pick = d.forceIds ? d.forceIds.map((id) => sents.find((s) => s.id === id)) : null;   // the GATE's poison seam, never shipped
    for (let tr = 0; tr < TRIES && !pick; tr++) {
      const p = rng.shuffle(sents).slice(0, d.sentences);
      const tot = p.reduce((a, s) => a + s.n, 0);
      if (tot < d.total[0] || tot > d.total[1] || countTell(p.map((s) => s.n))) continue;
      pick = p;
    }
    need(pick, `${loc}: no ${d.sentences} sentences whose counts total ${d.total} in an order free of the count tells`);
    const laneCfg = { textPx: d.textPx, textMax: d.textMax, textCqh: d.textCqh, lineH: d.lineH, box: d.box };
    const lanes = pick.map((s, i) => C5.sentenceLane({ n: i + 1, id: s.id, text: s.text, tokens: s.tokens, cfg: laneCfg, blankNumeralBox: C3.blankNumeralBox })).join('');
    const head = `<div data-lcs-texthead style="display:flex;justify-content:center;flex:0 0 auto;margin-bottom:${d.headGap}px"><div data-lcs-targetbead="${esc(target)}" style="line-height:0">` +
      teamBead({ text: target, w: d.headBead.w, h: d.headBead.h, mode: 'given', fontPx: d.headBead.fontPx }).svg + `</div></div>`;
    const cfg = { mode: d.mode, sentences: d.sentences, target, hitsPerSentence: d.hitsPerSentence, total: d.total, textPx: d.textPx, lineH: d.lineH, maxLines: d.maxLines, box: d.box };
    const inner = head + `<div data-lcs-lanes style="flex:1 1 auto;min-height:0;container-type:size;display:flex;flex-direction:column;gap:${d.laneGap}px">` +
      lanes + `</div>`;
    return { bodyHtml: faceRoot(d.mode, loc, [target], { [target]: (B.teams && B.teams[target] && B.teams[target].sound) || [] }, cfg, inner, 'align-items:stretch'), meta: { target, counts: pick.map((s) => s.n), items: pick.map((s) => s.id) },
      _ans: { target, sentences: pick } };
  },
};

/** The in-page face verify (runs in page.evaluate; re-derives every answer from the stamps + measures the render). */
function faceVerifyInPage(A) {
  const fails = [];
  const root = document.querySelector('[data-ws-content][data-lcs-type="digraphs"]');
  if (!root) return ['no digraphs root'];
  const mode = root.dataset.lcsFace;
  const R = (el) => { const b = el.getBoundingClientRect(); return { l: b.left, r: b.right, t: b.top, b: b.bottom, w: b.width, h: b.height }; };
  const fold = (s) => String(s).normalize('NFC').toLowerCase();
  let cfg = {}, sounds = {};
  try { cfg = JSON.parse(root.dataset.lcsCfg); sounds = JSON.parse(root.dataset.lcsSounds); } catch (e) { return ['a root stamp is not JSON']; }
  const teams = (root.dataset.lcsTeams || '').split('|').filter(Boolean);
  const segOf = (el) => (el.dataset.lcsSeg || '').split('|');
  const sndOf = (el) => (el.dataset.lcsSnd || '').split('|');
  const hitsIn = (seg) => teams.filter((t) => seg.map(fold).includes(fold(t)));
  const foil = (seg, snd, team, tag) => { for (const f of teams) if (f !== team) for (const s of sounds[f] || []) if (snd.includes(s)) fails.push(`${tag} (${seg.join('')}): holds the foil team ${f}'s sound /${s}/`); };
  const runTell = (seq, maxRun, what) => { let run = 1; for (let i = 1; i < seq.length; i++) { run = seq[i] === seq[i - 1] ? run + 1 : 1; if (run > maxRun) { fails.push(`${what}: "${seq[i]}" ${run} times in a row (> ${maxRun})`); return; } } };
  const beadOk = (svg, mode, text, tag) => {
    if (!svg || svg.getAttribute('data-lcs-prim') !== 'team-bead') { fails.push(`${tag}: not a team bead`); return; }
    if (svg.dataset.lcsBeadMode !== mode) fails.push(`${tag}: bead mode ${svg.dataset.lcsBeadMode} ≠ ${mode}`);
    const t = svg.querySelector('text');
    if (text != null && (!t || t.textContent !== text)) fails.push(`${tag}: bead prints "${t && t.textContent}" ≠ "${text}"`);
    if (text == null && t) fails.push(`${tag}: a blank bead prints "${t.textContent}"`);
    if (svg.querySelector('[data-lcs-stub]')) fails.push(`${tag}: a wire stub on a bead inside a word / card`);
  };
  const pics = [...root.querySelectorAll('img[data-lcs-pic]')];
  pics.forEach((img) => { if (!img.complete || !img.naturalWidth) fails.push(`picture ${img.dataset.lcsPic} did not load`); else { const r = R(img); if (Math.min(r.w, r.h) < (cfg.iconPx || 0) - 0.6) fails.push(`picture ${img.dataset.lcsPic} ${Math.round(Math.min(r.w, r.h))} px < ${cfg.iconPx}`); } });
  root.querySelectorAll('[data-lcs-answer]').forEach((el) => { const v = el.getAttribute('data-lcs-answer'); if (v !== '') fails.push(`an answer stamp "${v}" on the page`); if (el.textContent.trim()) fails.push('an answer box prints text'); });
  // printed text: only the face's own literal surfaces
  const clone = root.cloneNode(true);
  clone.querySelectorAll(A.textOk[mode]).forEach((e) => e.remove());
  if (clone.textContent.trim()) fails.push(`text printed outside the face's literal surfaces: "${clone.textContent.trim().slice(0, 40)}"`);
  let blocks = [];
  const body = R(document.querySelector('.ws-body'));

  if (mode === 'sort-two') {
    const houses = [...root.querySelectorAll('[data-lcs-house]')];
    if (houses.map((h) => h.dataset.lcsHouse).join('|') !== teams.join('|')) fails.push(`houses [${houses.map((h) => h.dataset.lcsHouse)}] ≠ teams [${teams}]`);
    const hb = houses.map((h) => h.querySelector('svg'));
    hb.forEach((s, j) => { beadOk(s, 'given', teams[j], `house ${teams[j]}`); if (s) { const r = R(s); if (r.h < 56 - 0.6) fails.push(`house bead ${r.h.toFixed(0)} px < the K floor 56`); const t = s.querySelector('text'); if (t && parseFloat(t.getAttribute('font-size')) < 30) fails.push('house bead letters < 30 px'); } });
    if (hb.length === 2 && hb[0] && hb[1]) { const a = R(hb[0]), b = R(hb[1]); if (Math.abs(a.w - b.w) > 0.5 || Math.abs(a.h - b.h) > 0.5) fails.push('the two house beads differ in size'); }
    const cards = [...root.querySelectorAll('[data-lcs-card]')];
    if (cards.length !== cfg.pictures) fails.push(`${cards.length} pictures ≠ ${cfg.pictures}`);
    const bins = [], per = [0, 0];
    cards.forEach((c, i) => {
      const seg = segOf(c), snd = sndOf(c), h = hitsIn(seg), tag = `picture ${i + 1}`;
      if (h.length !== 1) { fails.push(`${tag} (${seg.join('')}): ${h.length} house teams in seg`); bins.push(-1); return; }
      const b = teams.indexOf(h[0]); foil(seg, snd, h[0], tag);
      if (+c.dataset.lcsBinOf !== b) fails.push(`${tag}: data-lcs-bin-of ${c.dataset.lcsBinOf} ≠ the re-derived ${b}`);
      bins.push(b); per[b]++;
      const r = R(c); if (r.h < cfg.floor - 0.6) fails.push(`${tag}: card ${r.h.toFixed(0)} px < ${cfg.floor}`);
      if (c.querySelectorAll('.ws-match-dot').length !== 2) fails.push(`${tag}: not a dot on both sides`);
    });
    per.forEach((n, j) => { if (n !== cfg.split[j]) fails.push(`house ${teams[j]} receives ${n} pictures ≠ the split ${cfg.split[j]}`); });
    runTell(bins, cfg.maxRun, 'house sequence');
    if (bins.length >= 4 && bins.every((x, i) => i === 0 || x !== bins[i - 1])) fails.push('house sequence strictly alternates');
    // equidistance: every picture centred between the two houses (±1)
    if (houses.length === 2) { const a = R(houses[0]), b = R(houses[1]); cards.forEach((c, i) => { const r = R(c); if (Math.abs((r.l - a.r) - (b.l - r.r)) > 1) fails.push(`picture ${i + 1} is ${((r.l - a.r) - (b.l - r.r)).toFixed(1)} px nearer one house`); }); }
    blocks = cards.map(R);
  } else if (mode === 'gap') {
    const bank = [...root.querySelectorAll('[data-lcs-bankbead]')];
    if (bank.map((b) => b.dataset.lcsBankbead).join('|') !== teams.join('|')) fails.push(`bank [${bank.map((b) => b.dataset.lcsBankbead)}] ≠ [${teams}]`);
    bank.forEach((b, j) => beadOk(b.querySelector('svg'), 'given', teams[j], `bank bead ${teams[j]}`));
    const rows = [...root.querySelectorAll('[data-lcs-gaprow]')];
    if (rows.length !== cfg.rows) fails.push(`${rows.length} rows ≠ ${cfg.rows}`);
    const cols = [], per = teams.map(() => 0);
    let wh = null;
    rows.forEach((row, i) => {
      const tag = `row ${i + 1}`, seg = segOf(row), snd = sndOf(row);
      const h = hitsIn(seg);
      if (h.length !== 1) { fails.push(`${tag} (${seg.join('')}): ${h.length} bank teams in seg (want 1)`); return; }
      const team = h[0], j = seg.findIndex((g) => fold(g) === fold(team));
      foil(seg, snd, team, tag);
      const from = seg.slice(0, j).join('').length;
      if (+row.dataset.lcsGapFrom !== from || +row.dataset.lcsGapLen !== seg[j].length) fails.push(`${tag}: gap ${row.dataset.lcsGapFrom}+${row.dataset.lcsGapLen} ≠ the team's seg span ${from}+${seg[j].length}`);
      if (j === 0 && /^\p{Lu}/u.test(seg[0])) fails.push(`${tag}: a bead on a capital-initial team (${seg.join('')}) — the capital rule`);
      const printed = [...row.querySelectorAll('[data-lcs-part]')].map((p) => p.textContent).join('');
      if (printed !== seg.slice(0, j).join('') + seg.slice(j + 1).join('')) fails.push(`${tag}: prints "${printed}" ≠ the word without its team`);
      if (fold(printed).includes(fold(team))) fails.push(`${tag}: the team "${team}" is printed in the row`);
      if ([...seg.join('')].length > cfg.maxLetters) fails.push(`${tag}: ${seg.join('')} > ${cfg.maxLetters} letters`);
      const beads = row.querySelectorAll('[data-lcs-gapbead] svg');
      if (beads.length !== 1) fails.push(`${tag}: ${beads.length} gap beads (want 1)`);
      const s = beads[0];
      if (s) {
        beadOk(s, 'blank', null, tag);
        const r = R(s), k = r.w.toFixed(1) + 'x' + r.h.toFixed(1);
        if (wh === null) wh = k; else if (k !== wh) fails.push(`${tag}: gap bead ${k} ≠ ${wh} (identical w/h on a page)`);
        if (Math.abs(r.w - cfg.bead.w) > 0.5 || Math.abs(r.h - cfg.bead.h) > 0.5) fails.push(`${tag}: gap bead ${k} ≠ the page bead ${cfg.bead.w}x${cfg.bead.h}`);
        if (r.h < 44 - 0.6) fails.push(`${tag}: gap bead < the G1 floor 44`);
        const probe = row.querySelector('[data-lcs-baseprobe]'), bl = s.querySelector('[data-lcs-bead-line="baseline"]'), mid = s.querySelector('[data-lcs-bead-line="mid"]');
        if (!probe || !bl || !mid) fails.push(`${tag}: no baseline probe / bead writing lines`);
        else {
          const by = R(probe).t, ly = R(bl).t + R(bl).h / 2, my = R(mid).t + R(mid).h / 2;
          if (Math.abs(ly - by) > 1) fails.push(`${tag}: the bead baseline sits ${(ly - by).toFixed(1)} px off the word's baseline (±1)`);
          if (Math.abs(my - (by - cfg.xHeight * cfg.wordPx)) > 1) fails.push(`${tag}: the bead midline sits ${(my - (by - cfg.xHeight * cfg.wordPx)).toFixed(1)} px off the word's x-height (±1)`);
        }
      }
      row.querySelectorAll('[data-lcs-part]').forEach((p) => { if (parseFloat(getComputedStyle(p).fontSize) < 26) fails.push(`${tag}: word under 26 px`); });
      cols.push(teams.indexOf(team)); per[teams.indexOf(team)]++;
      const parts = [row.querySelector('[data-lcs-cap]'), row.querySelector('[data-lcs-word]')].filter(Boolean).map(R);
      blocks.push({ t: Math.min(...parts.map((p) => p.t)), b: Math.max(...parts.map((p) => p.b)) });
      const wr = R(row.querySelector('[data-lcs-word]')); if (wr.r > R(row).r + 0.5) fails.push(`${tag}: the word runs past its row`);
    });
    per.forEach((n, j) => { if (n < cfg.perTeam[0] || n > cfg.perTeam[1]) fails.push(`team ${teams[j]} answers ${n} rows, outside [${cfg.perTeam}]`); });
    runTell(cols, cfg.maxRun, 'team sequence');
    if (cols.length >= 3 && cols[0] === cols[1] && cols[1] === cols[2]) fails.push('one team answers rows 1-3');
    for (const dir of [1, -1]) { let len = 1; for (let i = 1; i < cols.length; i++) { len = cols[i] === (((cols[i - 1] + dir) % teams.length) + teams.length) % teams.length ? len + 1 : 1; if (len === 6) fails.push('the team sequence is a staircase over >= 6 rows'); } }
    const bk = root.querySelector('[data-lcs-bank]'); if (bk) blocks.unshift(R(bk));
  } else if (mode === 'match') {
    const Ls = [...root.querySelectorAll('[data-lcs-left]')], Rs = [...root.querySelectorAll('[data-lcs-right]')];
    if (Ls.length !== cfg.pairs || Rs.length !== cfg.pairs) fails.push(`${Ls.length} words / ${Rs.length} pictures ≠ ${cfg.pairs}`);
    const rowR = [], per = teams.map(() => 0);
    Ls.forEach((l, i) => {
      const tag = `word ${i + 1}`, seg = segOf(l), snd = sndOf(l), h = hitsIn(seg);
      if (h.length !== 1) { fails.push(`${tag} (${seg.join('')}): ${h.length} page teams in seg`); return; }
      foil(seg, snd, h[0], tag); per[teams.indexOf(h[0])]++;
      const bw = l.querySelector('[data-lcs-bword]');
      if (!bw || bw.textContent !== seg.join('')) fails.push(`${tag}: prints "${bw && bw.textContent}" ≠ ${seg.join('')}`);
      const beads = l.querySelectorAll('[data-lcs-inbead]');
      if (beads.length !== 1 || fold(beads[0].textContent) !== fold(h[0])) fails.push(`${tag}: its marked bead "${beads[0] && beads[0].textContent}" ≠ its team ${h[0]}`);
      else { const r = R(beads[0]); if (Math.abs(r.h - cfg.beadH) > 0.6) fails.push(`${tag}: bead ${r.h.toFixed(0)} px high ≠ ${cfg.beadH}`); }
      if ([...seg.join('')].length > cfg.maxLetters) fails.push(`${tag}: > ${cfg.maxLetters} letters`);
      if (bw) { if (parseFloat(getComputedStyle(bw).fontSize) < cfg.wordPx - 0.01) fails.push(`${tag}: word < ${cfg.wordPx} px`); const r = R(bw); if (r.w > cfg.wordMaxW + 0.5) fails.push(`${tag}: word ${r.w.toFixed(0)} px > ${cfg.wordMaxW}`); if (r.r > R(l).r + 0.5 || r.l < R(l).l - 0.5) fails.push(`${tag}: the word runs out of its item`); }
      const k = Rs.findIndex((x) => x.dataset.lcsPair === l.dataset.lcsPair);
      if (k < 0) fails.push(`${tag}: its picture is missing`);
      rowR.push(k);
    });
    per.forEach((n, j) => { if (n !== cfg.perPair) fails.push(`team ${teams[j]} has ${n} words ≠ ${cfg.perPair}`); });
    if (new Set(Rs.map((x) => x.dataset.lcsPair)).size !== Rs.length) fails.push('a picture pair repeats');
    const n = rowR.length;
    if (rowR.some((r, i) => r === i)) fails.push('derangement: a word sits opposite its own picture');
    if (n && rowR.every((r, i) => r === n - 1 - i)) fails.push('derangement: the pictures are the words reversed');
    for (const k of [1, -1]) if (n && rowR.every((r, i) => r === (((i + k) % n) + n) % n)) fails.push(`derangement: the pictures are the words rotated by ${k}`);
    const off = {}; rowR.forEach((r, i) => { const o = (((r - i) % n) + n) % n; off[o] = (off[o] || 0) + 1; }); if (Math.max(0, ...Object.values(off)) > 2) fails.push('derangement: three or more pairs share one row offset');
    blocks = null;
    const colBlocks = [Ls.map(R), Rs.map(R)];
    A._cols = colBlocks;
  } else if (mode === 'position') {
    const POS = ['beginning', 'middle', 'end'];
    const cards = [...root.querySelectorAll('[data-lcs-poscard]')];
    if (cards.length !== cfg.cards) fails.push(`${cards.length} cards ≠ ${cfg.cards}`);
    const ps = [], ts = [], pn = [0, 0, 0], tn = teams.map(() => 0);
    cards.forEach((c, i) => {
      const tag = `card ${i + 1}`, seg = segOf(c), snd = sndOf(c), team = c.dataset.lcsTeam;
      const silent = new Set((c.dataset.lcsSilent || '').split('|').filter((x) => x !== '').map(Number));
      if (!teams.includes(team)) fails.push(`${tag}: team ${team} ∉ [${teams}]`);
      const at = seg.map((g, k) => (fold(g) === fold(team) ? k : -1)).filter((k) => k >= 0);
      if (at.length !== 1) fails.push(`${tag} (${seg.join('')}): the team ${team} is an element ${at.length} times`);
      foil(seg, snd, team, tag);
      const kept = seg.map((g, k) => ({ g: fold(g), k })).filter((x) => !silent.has(x.k));
      const a = kept.findIndex((x) => x.g === fold(team));
      const p = a < 0 || kept.length < 2 ? null : a === 0 ? 'beginning' : a === kept.length - 1 ? 'end' : 'middle';
      if (!p) fails.push(`${tag}: no position (a whole-word team)`); else { ps.push(p); pn[POS.indexOf(p)]++; }
      ts.push(team); if (teams.includes(team)) tn[teams.indexOf(team)]++;
      beadOk(c.querySelector('[data-lcs-cardbead] svg'), 'given', team, `${tag} team bead`);
      const socks = [...c.querySelectorAll('[data-lcs-socket] svg')];
      if (socks.length !== 3) fails.push(`${tag}: ${socks.length} sockets`);
      socks.forEach((s, k) => { beadOk(s, 'blank', null, `${tag} socket ${k}`); const r = R(s); if (r.h < 44 - 0.6 || Math.abs(r.w - cfg.socket.w) > 0.5) fails.push(`${tag} socket ${k}: ${r.w.toFixed(0)}x${r.h.toFixed(0)} (want ${cfg.socket.w}x${cfg.socket.h})`); });
      // the START -> END cue: three segments, each >= 44 wide and >= 20 high, each centred on its socket (±1),
      // a start disc on segment 0 and an arrowhead on segment 2 (the floor the 12 px keys failed)
      const segs = [...c.querySelectorAll('svg[data-lcs-cueseg]')];
      if (segs.map((x) => x.getAttribute('data-lcs-cueseg')).join() !== '0,1,2') fails.push(`${tag}: position cue segments [${segs.map((x) => x.getAttribute('data-lcs-cueseg'))}] ≠ 0,1,2`);
      segs.forEach((sg, k) => {
        const r = R(sg);
        if (r.w < 44 - 0.6 || r.h < 20 - 0.6) fails.push(`${tag}: position cue segment ${k} is ${r.w.toFixed(0)}x${r.h.toFixed(0)} px (< 44 x 20, the G1 cue floor)`);
        const so = socks[k] && R(socks[k]);
        if (so && Math.abs((r.l + r.r) / 2 - (so.l + so.r) / 2) > 1) fails.push(`${tag}: cue segment ${k} is off its socket`);
        if (so && r.b > so.t + 0.5) fails.push(`${tag}: cue segment ${k} is not above its socket`);
      });
      const dot = c.querySelector('[data-lcs-cue-start]'), head = c.querySelector('[data-lcs-cue-head]');
      if (!dot || R(dot).w < 16 - 0.6 || !dot.closest('[data-lcs-cueseg="0"]')) fails.push(`${tag}: no start disc (>= 16 px) on the first cue segment`);
      if (!head || R(head).w < 16 - 0.6 || !head.closest('[data-lcs-cueseg="2"]')) fails.push(`${tag}: no arrowhead (>= 16 px) on the last cue segment`);
      const leaves = [c.querySelector('img'), c.querySelector('[data-lcs-cardbead]'), c.querySelector('[data-lcs-sockets]')].filter(Boolean).map(R);
      const cr = R(c), top = Math.min(...leaves.map((x) => x.t)), bot = Math.max(...leaves.map((x) => x.b));
      if (Math.abs((top - cr.t) - (cr.b - bot)) > 2) fails.push(`${tag}: its content is not centred in the card`);
      if (leaves.some((x) => x.r > cr.r + 0.5 || x.l < cr.l - 0.5)) fails.push(`${tag}: content outside its card`);
    });
    pn.forEach((n, k) => { if (n < cfg.posSplit[0] || n > cfg.posSplit[1]) fails.push(`position ${POS[k]} used ${n} times, outside [${cfg.posSplit}]`); });
    tn.forEach((n, k) => { if (n < cfg.teamSplit[0] || n > cfg.teamSplit[1]) fails.push(`team ${teams[k]} on ${n} cards, outside [${cfg.teamSplit}]`); });
    runTell(ps, cfg.maxRun, 'socket answers'); runTell(ts, cfg.maxRun, 'card teams');
    for (const p of [2, 3]) if (ps.length > p && ps.every((x, i) => i < p || x === ps[i - p])) fails.push(`socket answers repeat with period ${p}`);
    for (let c = 0; c < cfg.cols; c++) if (new Set(ps.filter((_, i) => i % cfg.cols === c)).size < 2) fails.push(`card column ${c + 1} holds one position only`);
    blocks = cards.map(R);
  } else if (mode === 'text') {
    const target = cfg.target;
    const hb = root.querySelector('[data-lcs-targetbead] svg');
    beadOk(hb, 'given', target, 'target bead');
    if (root.querySelectorAll('[data-lcs-targetbead]').length !== 1) fails.push('not exactly one target bead');
    const lanes = [...root.querySelectorAll('[data-lcs-lane]')];
    if (lanes.length !== cfg.sentences) fails.push(`${lanes.length} lanes ≠ ${cfg.sentences}`);
    const counts = [];
    lanes.forEach((l, i) => {
      const tag = `lane ${i + 1}`;
      let toks = [];
      try { toks = JSON.parse(l.dataset.lcsTokens); } catch (e) { fails.push(`${tag}: tokens not JSON`); }
      const p = l.querySelector('[data-lcs-text]');
      const words = (p ? p.textContent : '').split(/[^\p{L}'’-]+/u).filter(Boolean);
      if (words.join(' ') !== toks.map((t) => t.w).join(' ')) fails.push(`${tag}: the printed sentence ≠ its signed tokens`);
      let n = 0;
      for (const tk of toks) { if (fold(tk.seg.join('')) !== fold(tk.w)) fails.push(`${tag}: token ${tk.w} seg does not spell it`); for (const g of tk.seg) { if (fold(g) === fold(target)) n++; else if (fold(g).includes(fold(target))) fails.push(`${tag}: "${target}" is a proper substring of the element "${g}"`); } }
      counts.push(n);
      if (n < cfg.hitsPerSentence[0] || n > cfg.hitsPerSentence[1]) fails.push(`${tag}: ${n} hits outside [${cfg.hitsPerSentence}]`);
      if (p) { const lh = parseFloat(getComputedStyle(p).lineHeight), lines = Math.round(R(p).h / lh); if (lines > cfg.maxLines) fails.push(`${tag}: ${lines} rendered lines > ${cfg.maxLines}`); if (parseFloat(getComputedStyle(p).fontSize) < 22) fails.push(`${tag}: text < the G2 floor 22`); if (R(p).r > R(l).r + 0.5) fails.push(`${tag}: text out of its lane`); }
      const box = l.querySelector('[data-lcs-countbox]');
      if (!box) fails.push(`${tag}: no count box`); else { const r = R(box); if (r.h < 36 - 0.6 || Math.abs(r.w - cfg.box.w) > 0.6 || Math.abs(r.h - cfg.box.h) > 0.6) fails.push(`${tag}: count box ${r.w.toFixed(0)}x${r.h.toFixed(0)} ≠ ${cfg.box.w}x${cfg.box.h}`); if (!box.classList.contains('ws-blankbox')) fails.push(`${tag}: the count box is not the open blankNumeralBox`); }
      const lr = R(l), cont = [p, box].filter(Boolean).map(R), top = Math.min(...cont.map((x) => x.t)), bot = Math.max(...cont.map((x) => x.b));
      if (Math.abs((top - lr.t) - (lr.b - bot)) > 2) fails.push(`${tag}: its content is not centred in the lane`);
    });
    const tot = counts.reduce((a, b) => a + b, 0);
    if (tot < cfg.total[0] || tot > cfg.total[1]) fails.push(`the counts total ${tot}, outside [${cfg.total}]`);
    if (counts.length > 1 && counts.every((x) => x === counts[0])) fails.push('count tell: every sentence has the same count');
    else if (counts.length > 2 && (counts.every((x, i) => i === 0 || x >= counts[i - 1]) || counts.every((x, i) => i === 0 || x <= counts[i - 1]))) fails.push('count tell: the counts are monotone');
    const hd = root.querySelector('[data-lcs-texthead]');
    blocks = [hd ? R(hd.firstElementChild) : null, ...lanes.map(R)].filter(Boolean);
  } else fails.push(`unknown face "${mode}"`);

  // SPARSE (blank bands between consecutive blocks, body top → first) + FILL (at a tall chrome) + the footer
  const cols = blocks ? [blocks] : (A._cols || []);
  let bottom = -Infinity;
  for (const bl of cols) {
    // blocks side by side (a grid row) are ONE band row: merge vertical ranges that overlap
    const s = [];
    for (const x of bl.slice().sort((a, b) => a.t - b.t)) { const row = s.find((r) => x.t < r.b - 0.5 && x.b > r.t + 0.5 && Math.abs(x.t - r.t) < 0.5 * Math.min(x.h || (x.b - x.t), r.b - r.t)); if (row) { row.t = Math.min(row.t, x.t); row.b = Math.max(row.b, x.b); } else s.push({ t: x.t, b: x.b }); }
    if (!s.length) continue;
    if (s[0].t - body.t > A.SPARSE + 0.5) fails.push(`SPARSE — ${(s[0].t - body.t).toFixed(1)} px blank band above the first block (> ${A.SPARSE})`);
    for (let i = 1; i < s.length; i++) { const g = s[i].t - s[i - 1].b; if (g > A.SPARSE + 0.5) fails.push(`SPARSE — ${g.toFixed(1)} px blank band between blocks ${i} and ${i + 1} (> ${A.SPARSE})`); if (g < -0.5) fails.push(`OVERLAP — blocks ${i} and ${i + 1} intersect by ${(-g).toFixed(1)} px`); }
    bottom = Math.max(bottom, s[s.length - 1].b);
  }
  if (body.h >= 800 && (bottom - body.t) / body.h < A.FILL) fails.push(`FILL — the content ends at ${(((bottom - body.t) / body.h) * 100).toFixed(1)} % of the ${Math.round(body.h)} px body (< ${A.FILL * 100} %)`);
  if (bottom > body.b + 0.5) fails.push(`FILL — the content runs ${(bottom - body.b).toFixed(1)} px past the body`);
  const foot = document.querySelector('.ws-foot');
  if (foot && bottom > R(foot).t + 0.6) fails.push('the content reaches the footer');
  if (root.scrollHeight > root.clientHeight + 1) fails.push(`the face overflows its root (${root.scrollHeight} > ${root.clientHeight})`);
  return fails;
}
const FACE_VERIFY_ARGS = {
  SPARSE: SPARSE_MAX, FILL: FILL_MIN,
  textOk: {
    'sort-two': 'svg[data-lcs-prim="team-bead"]',
    gap: 'svg[data-lcs-prim="team-bead"], [data-lcs-part], [data-lcs-row-n]',
    match: '[data-lcs-bword]',
    position: 'svg[data-lcs-prim="team-bead"]',
    text: 'svg[data-lcs-prim="team-bead"], [data-lcs-text], [data-lcs-lane-n]',
  },
};

const TYPE = {
  id: ID,
  slug: KEY,
  gradeBand: 'G1',
  assetClass: 'icon-placement',
  exerciseType: KEY,
  themeAxis: { applicable: false },
  difficulty: {
    1: { mode: 'base', wires: 6, set: 'k', teams: 2, perTeam: [3, 3], maxRun: 2, capPx: 72, iconPx: 64, rowMin: 80, keyH: 60,
      bead: { w: 88, h: 44, fontPx: 28 }, keyBead: { w: 92, h: 52, fontPx: 32 }, requireFoilLetterInWord: false, showWord: false },
    2: { mode: 'base', wires: 8, set: 'exemplar', teams: 3, perTeam: [2, 3], maxRun: 2, capPx: 68, iconPx: 60, rowMin: 68, keyH: 60,
      bead: { w: 76, h: 44, fontPx: 26 }, keyBead: { w: 92, h: 52, fontPx: 32 }, requireFoilLetterInWord: false, showWord: false },
    3: { mode: 'base', wires: 10, set: 'exemplar', teams: 3, perTeam: [3, 4], maxRun: 2, capPx: 54, iconPx: 48, rowMin: 56, keyH: 52,
      bead: { w: 76, h: 44, fontPx: 26 }, keyBead: { w: 88, h: 44, fontPx: 30 }, requireFoilLetterInWord: true, showWord: false },
  },
  i18n: {
    en: {
      title: 'Digraphs sh, ch and th: Which Letter Team Do You Hear?',
      instruction: 'Say the name of each picture. Circle the letter team you hear.',
    },
  },

  interactive: interactiveFor('base'),
  interactiveFor,

  build({ difficulty, locale }, ctx) {
    const loc = (locale || 'en').slice(0, 2);
    if (DIGRAPHS_NEUTRAL.REFUSED_LOCALES.includes(loc)) throw new Error(`${ID}: ${loc} is REFUSED whole-family (design §1: its teams are owned by spelling-rules / syllable-reading or fall below 3 teams x 6 pictured words) — refuse`);
    const fd = this.difficulty[difficulty];
    if (fd && fd.mode !== 'base' && (DIGRAPHS_NEUTRAL.FACE_REFUSALS[loc] || []).includes(fd.mode)) throw new Error(`${ID}: ${loc} REFUSES the ${fd.mode} face (design §3 / §7) — refuse`);
    // Level Set 2026-09-28: every page but the published one (level 2, copy 1) is a NEW copy on team set
    // `seedVariant` (group 1 = the published teams, then the native panels' new sets)
    const published = difficulty === 2 && ((ctx && ctx.variant) || 1) === 1;
    if (published) return this._buildWith(loadBank(BANK, loc), this.difficulty[difficulty], { locale: loc }, ctx);
    const { B, d } = levelSetPage(loadBank(BANK, loc), this.difficulty[difficulty], loc, (ctx && ctx.seedVariant) || 1);
    return this._buildWith(B, d, { locale: loc }, ctx);
  },

  /** Level Set: a copy's title names ITS teams (the native template with {TEAMS_AND} {TEAMS_OR} {K_OR} {K_AND} {TARGET}). */
  copyStrings(strings, { locale, difficulty, variant, seedVariant }) {
    const loc = (locale || 'en').slice(0, 2);
    if (difficulty === 2 && (variant || 1) === 1) return strings;
    const L = levelSetData(loc);
    const tpl = L && L.titles && L.titles[this.id];
    if (!tpl) throw new Error(`${ID}: ${loc} has no level-set title template for ${this.id}`);
    const { makeRng } = require('../../lib/rng.js');
    const m = this.build({ difficulty, locale: loc }, { rng: makeRng('title'), variant: variant || 2, seedVariant }).meta;
    const teams = m.teams || [m.target];
    const list = (xs, w) => (xs.length < 2 ? xs.join('') : xs.slice(0, -1).join(', ') + ' ' + w + ' ' + xs[xs.length - 1]);
    const title = tpl.replace('{TEAMS_AND}', list(teams, L.and)).replace('{TEAMS_OR}', list(teams, L.or)).replace('{K_OR}', list(teams, L.or)).replace('{K_AND}', list(teams, L.and)).replace('{TARGET}', m.target || teams[0]);
    // the printed instruction of two faces names the PUBLISHED team(s) ("Circle every sh", nl "oe of ui"):
    // swap in this page's own, and refuse a page whose instruction would still name a team it does not ask about
    const pubSets = loadBank('digraphs', loc).sets;
    const word = (t) => new RegExp(String.raw`(?<!\p{L})` + t + String.raw`(?!\p{L})`, 'u');
    let instruction = strings.instruction;
    if (this.id === 'G2-372') instruction = instruction.replace(word(pubSets.exemplar[0]), m.target);
    if (this.id === 'K-378') instruction = instruction.replace(list(pubSets.k, L.or), list(teams, L.or));
    if (instruction !== strings.instruction || this.id === 'G2-372' || this.id === 'K-378') {
      const asked = new Set(this.id === 'G2-372' ? [m.target] : teams);
      const stale = [...new Set([...pubSets.exemplar, ...pubSets.k])].filter((t) => !asked.has(t) && word(t).test(instruction) && !(loc === 'fr' && t === 'ou'));
      if (stale.length) throw new Error(`${this.id} ${loc}: the instruction still names ${stale.join(', ')}: ${instruction}`);
    }
    return { ...strings, title, instruction };
  },

  /** The whole build over an INJECTED bank + resolved config (the gate's poison seam). */
  _buildWith(B, d, { locale }, ctx) {
    if (ctx && (ctx.interactive || ctx.answerKey) && (!d || d.mode === 'base')) return screenOrKey('base', this._buildWith(B, d, { locale }, { ...ctx, interactive: false, answerKey: false }), ctx, (locale || 'en').slice(0, 2));
    if (!d) throw new Error(`${ID}: no difficulty config`);
    const loc = (locale || 'en').slice(0, 2);
    const rng = ctx && ctx.rng;
    if (!rng) throw new Error(`${ID}: no rng in ctx (a seeded page)`);
    if (!B || typeof B !== 'object') throw new Error(`${ID}: no ${loc} bank block (refuse)`);
    if (B.refused) throw new Error(`${ID}: the ${loc} block is REFUSED (${B.refused.reason || 'no reason'}) — refuse`);
    if (d.mode !== 'base') {   // a Phase-E face (the base path below is untouched)
      if (!FACE_MODES.includes(d.mode)) throw new Error(`${ID}: unknown mode "${d.mode}"`);
      if ((DIGRAPHS_NEUTRAL.FACE_REFUSALS[loc] || []).includes(d.mode)) throw new Error(`${ID}: ${loc} REFUSES the ${d.mode} face (design §3 / §7) — refuse`);
      return screenOrKey(d.mode, FACE_BUILD[d.mode](B, d, loc, rng), ctx, loc);
    }
    // guards on the RESOLVED config
    if (d.showWord) throw new Error(`${ID}: showWord — the base never prints a word`);
    if (!(d.bead.h >= G1_FLOOR)) throw new Error(`${ID}: bead h ${d.bead.h} < the G1 floor ${G1_FLOOR}`);
    if (!(d.bead.fontPx >= G1_TEXT)) throw new Error(`${ID}: bead text ${d.bead.fontPx} px < the G1 answer floor ${G1_TEXT}`);
    if (!(d.iconPx >= G1_FLOOR)) throw new Error(`${ID}: icon ${d.iconPx} < the G1 floor ${G1_FLOOR}`);
    if (!(d.capPx >= d.iconPx + 6)) throw new Error(`${ID}: cap ${d.capPx} cannot hold a ${d.iconPx} icon`);
    if (!(d.rowMin >= Math.max(d.capPx, d.bead.h))) throw new Error(`${ID}: rowMin ${d.rowMin} < the cap / bead`);
    if (!(d.keyH >= d.keyBead.h)) throw new Error(`${ID}: key row ${d.keyH} < the key bead ${d.keyBead.h}`);
    if (!(d.maxRun >= 1)) throw new Error(`${ID}: maxRun ${d.maxRun}`);
    const set = B.sets && B.sets[d.set];
    if (!Array.isArray(set) || set.length !== d.teams) throw new Error(`${ID}: ${loc} sets.${d.set} is not ${d.teams} teams (refuse)`);
    const teams = set.slice();
    const sounds = {};
    for (const t of teams) {
      const tb = B.teams && B.teams[t];
      if (!tb || !Array.isArray(tb.items) || !tb.items.length) throw new Error(`${ID}: ${loc} team "${t}" has no items (refuse)`);
      if (!Array.isArray(tb.sound) || !tb.sound.length) throw new Error(`${ID}: ${loc} team "${t}" has no sound`);
      sounds[t] = tb.sound;
      const w = teamTextW(t, d.bead.fontPx);   // throws on a team the width table lacks
      if (w > d.bead.w - 24) throw new Error(`${ID}: "${t}" (${w.toFixed(1)} px) does not fit the ${d.bead.w} bead`);
    }
    const rejected = new Set((B.rejectedPics || []).map((r) => (typeof r === 'string' ? r : r.pic)));

    // per-team answer counts
    const vecs = countVectors(teams.length, d.perTeam[0], d.perTeam[1], d.wires);
    if (!vecs.length) throw new Error(`${ID}: no per-team counts in [${d.perTeam}] sum to ${d.wires} wires`);
    const counts = d.forceCols ? teams.map((_, j) => d.forceCols.filter((c) => c === j).length) : rng.pick(vecs);   // forceCols: the GATE's poison seam (PR5), never shipped

    // items per team
    const pool = {};
    for (const t of teams) {
      pool[t] = B.teams[t].items.filter((it) => it.picOpened === true && !rejected.has(it.theme + '/' + it.noun) &&
        hasPicture(it.vocabKey, loc) && !itemFitsPage(it, t, teams, sounds, d));
      if (pool[t].length < d.perTeam[1]) throw new Error(`${ID}: ${loc} team "${t}" has ${pool[t].length} page-valid items < ${d.perTeam[1]} (refuse)`);
    }
    let chosen = null;
    for (let tr = 0; tr < TRIES && !chosen; tr++) {
      const stems = new Set(), pics = new Set(), groups = {};
      const pick = [];
      let okAll = true;
      teams.forEach((t, j) => {
        if (!okAll) return;
        let got = 0;
        for (const it of rng.shuffle(pool[t])) {
          if (got === counts[j]) break;
          const pic = it.theme + '/' + it.noun;
          if (stems.has(it.stem) || pics.has(pic) || (it.group && (groups[it.group] || 0) >= 2)) continue;
          stems.add(it.stem); pics.add(pic); if (it.group) groups[it.group] = (groups[it.group] || 0) + 1;
          pick.push({ item: it, team: t, col: j }); got++;
        }
        if (got < counts[j]) okAll = false;
      });
      if (okAll) chosen = pick;
    }
    if (!chosen) throw new Error(`${ID}: ${loc} could not draw ${counts} items without a repeated stem / picture in ${TRIES} tries`);

    // wire order
    let order = null;
    for (let tr = 0; tr < TRIES && !d.forceCols; tr++) {
      const o = rng.shuffle(chosen);
      if (!orderTell(o.map((x) => x.col), teams.length, d.maxRun)) { order = o; break; }
    }
    if (!order && !d.forceCols) throw new Error(`${ID}: no wire order free of the column tells in ${TRIES} draws`);
    if (d.forceCols) { const buckets = teams.map((_, j) => chosen.filter((x) => x.col === j)); order = d.forceCols.map((c) => buckets[c].shift()); }   // the GATE's poison seam (PR5) — never a shipped config

    const rowMax = d.capPx + SPARSE_MAX - 4;
    const rows = order.map((x, i) => ({ n: i + 1, src: fileUri(x.item.theme, x.item.noun), vocabKey: x.item.vocabKey, seg: x.item.seg, snd: x.item.snd, answerCol: x.col }));
    const ab = C5.soundAbacus({ teams, rows, cfg: { capPx: d.capPx, iconPx: d.iconPx, rowMin: d.rowMin, rowMax, keyH: d.keyH, bead: d.bead, keyBead: d.keyBead } });
    const cfgStamp = { wires: d.wires, perTeam: d.perTeam, maxRun: d.maxRun, capPx: d.capPx, iconPx: d.iconPx, rowMin: d.rowMin, rowMax, bead: d.bead, keyBead: d.keyBead, requireFoilLetterInWord: !!d.requireFoilLetterInWord };
    const js = (o) => JSON.stringify(o).replace(/'/g, '&#39;');
    const bodyHtml = `<div data-ws-content data-lcs-type="${KEY}" data-lcs-face="base" data-lcs-locale="${loc}" data-lcs-teams="${teams.join('|')}" ` +
      `data-lcs-sounds='${js(sounds)}' data-lcs-cfg='${js(cfgStamp)}' ` +
      `style="flex:1;min-height:0;display:flex;flex-direction:column;align-items:center;justify-content:flex-start">` + ab.html + `</div>`;
    return { bodyHtml, meta: { teams, counts, cols: order.map((x) => x.col), items: order.map((x) => x.item.vocabKey) },
      _ans: { teams, sounds, rows: order.map((x) => ({ item: x.item, team: x.team, col: x.col })) } };
  },

  async verify(page) {
    const face = await page.evaluate(() => { const r = document.querySelector('[data-ws-content][data-lcs-type="digraphs"]'); return r ? r.getAttribute('data-lcs-face') : null; });
    if (face && face !== 'base') return page.evaluate(faceVerifyInPage, FACE_VERIFY_ARGS);
    return page.evaluate((SPARSE) => {
      const fails = [];
      const root = document.querySelector('[data-ws-content][data-lcs-type="digraphs"]');
      if (!root) return ['no digraphs root'];
      if (root.dataset.lcsFace !== 'base') fails.push(`face "${root.dataset.lcsFace}" ≠ base`);
      const rect = (el) => el.getBoundingClientRect();
      const teams = (root.dataset.lcsTeams || '').split('|').filter(Boolean);
      let sounds = {}, cfg = {};
      try { sounds = JSON.parse(root.dataset.lcsSounds); cfg = JSON.parse(root.dataset.lcsCfg); } catch (e) { return ['a root stamp is not JSON']; }
      const n = teams.length;
      if (n < 2) fails.push(`${n} page teams (< 2)`);
      root.querySelectorAll('[data-lcs-answer]').forEach((el) => fails.push(`an answer stamp "${el.getAttribute('data-lcs-answer')}" on the page`));
      // key beads
      const keys = [...root.querySelectorAll('[data-lcs-keybead]')];
      if (keys.map((k) => k.dataset.lcsKeybead).join('|') !== teams.join('|')) fails.push(`key beads [${keys.map((k) => k.dataset.lcsKeybead)}] ≠ page teams [${teams}]`);
      const keyX = keys.map((k) => { const r = rect(k); return (r.left + r.right) / 2; });
      keys.forEach((k) => {
        const svg = k.querySelector('svg[data-lcs-prim="team-bead"]');
        if (!svg || svg.dataset.lcsBeadMode !== 'given') fails.push(`key bead ${k.dataset.lcsKeybead} is not a given bead`);
        const t = svg && svg.querySelector('text');
        if (!t || t.textContent !== k.dataset.lcsKeybead) fails.push(`key bead ${k.dataset.lcsKeybead} prints "${t && t.textContent}"`);
      });
      // rails
      const railL = root.querySelector('[data-lcs-rail="L"]'), railR = root.querySelector('[data-lcs-rail="R"]');
      if (!railL || !railR) fails.push('no rails');
      // wires
      const wires = [...root.querySelectorAll('[data-lcs-wire]')];
      if (wires.length !== cfg.wires) fails.push(`${wires.length} wires ≠ ${cfg.wires}`);
      const cols = [];
      let beadWH = null;
      const perCol = new Array(n).fill(0);
      wires.forEach((w, i) => {
        const tag = `wire ${w.dataset.lcsWire}`;
        if (+w.dataset.lcsWire !== i + 1) fails.push(`${tag} is in position ${i + 1}`);
        const seg = (w.dataset.lcsSeg || '').split('|').map((g) => g.normalize('NFC').toLowerCase());
        const snd = (w.dataset.lcsSnd || '').split('|');
        if (seg.length !== snd.length) fails.push(`${tag}: seg ${seg.length} ≠ snd ${snd.length}`);
        const hits = teams.filter((t) => seg.includes(t));
        if (hits.length !== 1) fails.push(`${tag} (${seg.join('')}): ${hits.length} page teams are elements of seg [${hits}] (want exactly 1)`);
        const ans = hits.length === 1 ? teams.indexOf(hits[0]) : -1;
        if (ans >= 0) {
          for (const f of teams) if (f !== hits[0]) for (const s of sounds[f] || []) if (snd.includes(s)) fails.push(`${tag} (${seg.join('')}): holds the foil team ${f}'s sound /${s}/`);
          if (cfg.requireFoilLetterInWord && !teams.some((f) => f !== hits[0] && [...f].some((c) => seg.join('').includes(c)))) fails.push(`${tag}: no foil letter in the word (d3)`);
          perCol[ans]++;
        }
        if (+w.dataset.lcsAnswerCol !== ans) fails.push(`${tag}: data-lcs-answer-col ${w.dataset.lcsAnswerCol} ≠ the re-derived ${ans}`);
        cols.push(ans);
        // picture
        const img = w.querySelector('img[data-lcs-pic]');
        if (!img || !img.complete || !img.naturalWidth) fails.push(`${tag}: the picture did not load`);
        else { const r = rect(img); if (r.width < cfg.iconPx - 0.6 || r.height < cfg.iconPx - 0.6) fails.push(`${tag}: picture ${r.width.toFixed(0)} px < ${cfg.iconPx}`); }
        // beads: the same teams in the same columns, identical, centred under the key
        const beads = [...w.querySelectorAll('[data-lcs-bead]')];
        if (beads.map((b) => b.dataset.lcsBead).join('|') !== teams.join('|')) fails.push(`${tag}: beads [${beads.map((b) => b.dataset.lcsBead)}] ≠ [${teams}]`);
        beads.forEach((b, j) => {
          const svg = b.querySelector('svg[data-lcs-prim="team-bead"]');
          const r = rect(svg || b);
          const wh = r.width.toFixed(1) + 'x' + r.height.toFixed(1);
          if (beadWH === null) beadWH = wh; else if (wh !== beadWH) fails.push(`${tag}: bead ${b.dataset.lcsBead} is ${wh} ≠ ${beadWH} (row beads must be identical)`);
          if (!svg || svg.dataset.lcsBeadMode !== 'choice') fails.push(`${tag}: bead ${j} is not a choice bead`);
          if (keyX[j] != null && Math.abs((r.left + r.right) / 2 - keyX[j]) > 0.5) fails.push(`${tag}: bead ${b.dataset.lcsBead} sits ${((r.left + r.right) / 2 - keyX[j]).toFixed(2)} px off its key column`);
          const t = svg && svg.querySelector('text');
          if (!t || t.textContent !== b.dataset.lcsBead) fails.push(`${tag}: bead ${j} prints "${t && t.textContent}"`);
          else if (t.getComputedTextLength() > r.width - 24 + 0.5) fails.push(`${tag}: "${t.textContent}" is ${t.getComputedTextLength().toFixed(1)} px in a ${r.width.toFixed(0)} px bead (> w − 24)`);
          if (r.height < 44 - 0.6) fails.push(`${tag}: bead ${r.height.toFixed(1)} px < the G1 floor 44`);
          if (t && parseFloat(t.getAttribute('font-size')) < 26) fails.push(`${tag}: bead text < 26 px`);
        });
        // the wire runs rail to rail
        const wl = w.querySelector('[data-lcs-rowwire]');
        if (!wl) fails.push(`${tag}: no wire`);
        else if (railL && railR) {
          const r = rect(wl), a = rect(railL), b = rect(railR);
          if (Math.abs(r.left - a.left) > 0.5 || Math.abs(r.right - b.right) > 0.5) fails.push(`${tag}: the wire runs ${r.left.toFixed(1)}..${r.right.toFixed(1)}, not rail to rail ${a.left.toFixed(1)}..${b.right.toFixed(1)}`);
          if (r.top < a.top || r.bottom > a.bottom) fails.push(`${tag}: the wire leaves the rails vertically`);
        }
      });
      // column counts, the order tells
      perCol.forEach((c, j) => { if (c < cfg.perTeam[0] || c > cfg.perTeam[1]) fails.push(`column ${j} (${teams[j]}) answers ${c} wires, outside [${cfg.perTeam}]`); });
      let run = 1;
      for (let i = 1; i < cols.length; i++) { run = cols[i] === cols[i - 1] ? run + 1 : 1; if (run > cfg.maxRun) fails.push(`column ${cols[i]} answers ${run} consecutive wires (> maxRun ${cfg.maxRun})`); }
      if (cols.length >= 3 && cols[0] === cols[1] && cols[1] === cols[2]) fails.push('one column answers wires 1-3');
      for (const dir of [1, -1]) { let len = 1; for (let i = 1; i < cols.length; i++) { len = cols[i] === (((cols[i - 1] + dir) % n) + n) % n ? len + 1 : 1; if (len === 6) fails.push(`the answer columns are a ${dir > 0 ? 'staircase' : 'reverse staircase'} over >= 6 wires`); } }
      // SPARSE: the blank band between consecutive rows' content (cap ∪ beads) and key -> row 1
      const blocks = [root.querySelector('[data-lcs-keyrow]'), ...wires].filter(Boolean).map((b) => {
        const els = b.matches('[data-lcs-keyrow]') ? [...b.querySelectorAll('[data-lcs-keybead]')] : [...b.querySelectorAll('[data-lcs-cap], [data-lcs-bead]')];
        return { top: Math.min(...els.map((e) => rect(e).top)), bottom: Math.max(...els.map((e) => rect(e).bottom)) };
      });
      for (let i = 1; i < blocks.length; i++) { const g = blocks[i].top - blocks[i - 1].bottom; if (g > SPARSE + 0.5) fails.push(`SPARSE — ${g.toFixed(1)} px blank band above row ${i} (> ${SPARSE})`); }
      // nothing printed but numerals and bead letters
      const clone = root.cloneNode(true);
      clone.querySelectorAll('[data-lcs-wire-n], svg[data-lcs-prim="team-bead"]').forEach((e) => e.remove());
      if (clone.textContent.trim()) fails.push(`text printed outside the numerals and beads: "${clone.textContent.trim().slice(0, 40)}"`);
      wires.forEach((w, i) => { const t = w.querySelector('[data-lcs-wire-n]'); if (!t || t.textContent.trim() !== String(i + 1)) fails.push(`wire ${i + 1}: numeral "${t && t.textContent}"`); });
      // above the footer, no horizontal overflow
      const foot = document.querySelector('.ws-foot'), ab = root.querySelector('[data-lcs-abacus]');
      if (foot && ab && rect(ab).bottom > rect(foot).top + 0.6) fails.push('the abacus reaches the footer');
      if (ab && ab.scrollHeight > ab.clientHeight + 1) fails.push(`the abacus content overflows its frame (${ab.scrollHeight} > ${ab.clientHeight})`);
      return fails;
    }, SPARSE_MAX);
  },
};

TYPE._helpers = { itemFitsPage, countVectors, orderTell, SPARSE_MAX, positionOf, printFits, seqTell, matchTell, countTell, targetHits, FACE_MODES, FILL_MIN };
module.exports = TYPE;
