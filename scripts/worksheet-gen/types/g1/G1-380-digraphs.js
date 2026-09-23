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
const { bank: loadBank } = require('../../lib/b5-common.js');
const { fileUri } = require('../../lib/b2-common.js');
const { hasPicture } = require('../../lib/b3-picture-index.js');
const C5 = require('../../templates/components-b5.js');
const { teamTextW } = require('../../primitives/team-bead.js');
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

  build({ difficulty, locale }, ctx) {
    const loc = (locale || 'en').slice(0, 2);
    if (DIGRAPHS_NEUTRAL.REFUSED_LOCALES.includes(loc)) throw new Error(`${ID}: ${loc} is REFUSED whole-family (design §1: its teams are owned by spelling-rules / syllable-reading or fall below 3 teams x 6 pictured words) — refuse`);
    return this._buildWith(loadBank(BANK, loc), this.difficulty[difficulty], { locale: loc }, ctx);
  },

  /** The whole build over an INJECTED bank + resolved config (the gate's poison seam). */
  _buildWith(B, d, { locale }, ctx) {
    if (!d) throw new Error(`${ID}: no difficulty config`);
    const loc = (locale || 'en').slice(0, 2);
    const rng = ctx && ctx.rng;
    if (!rng) throw new Error(`${ID}: no rng in ctx (a seeded page)`);
    if (d.mode !== 'base') throw new Error(`${ID}: mode "${d.mode}" is a Phase-2 face (not built yet)`);
    if (!B || typeof B !== 'object') throw new Error(`${ID}: no ${loc} bank block (refuse)`);
    if (B.refused) throw new Error(`${ID}: the ${loc} block is REFUSED (${B.refused.reason || 'no reason'}) — refuse`);
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
    return { bodyHtml, meta: { teams, counts, cols: order.map((x) => x.col), items: order.map((x) => x.item.vocabKey) } };
  },

  async verify(page) {
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

TYPE._helpers = { itemFitsPage, countVectors, orderTell, SPARSE_MAX };
module.exports = TYPE;
