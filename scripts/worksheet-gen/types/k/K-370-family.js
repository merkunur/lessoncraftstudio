/**
 * K-370 — Family Members: Who Is Who? (nt10-E; family key `family`, K,
 * letters (the lock default; `_PANEL-FINDINGS` open item 1), no CCSS —
 * social-studies readiness). Design: docs/worksheet-gen/b5-designs/K-370-family.md
 * §2 / §5; every ruling in _work/K-370-critic.md; build record _work/K-370-build.md.
 *
 * ONE invented family tree fills the upper two thirds: three generation rows of
 * picture-framed busts (primitives/family-figure.js) hanging in a soft tree
 * (primitives/family-tree.js — tealSoft crown over the older rows, creamDeep
 * trunk under the child's row), joined by teal couple bars and descent lines.
 * The ego's frame alone is coral with a coral star and a name plate; every
 * other frame carries a teal number disc in a shuffled order. Below: the kin
 * words on chips, each with an EMPTY dashed numeral box; the child writes the
 * number of the person the word names. Every bust is the same size (no size
 * cue); sex reads from hair reach (a measured rule), age from head : shoulder
 * proportion + grey hair.
 *
 * THE ONE STRUCTURE (lead ruling, binding): a mother and a father joined by a
 * couple bar, their children below, ONE grandparent couple above the
 * `grandSide` parent (the seed alternates M / F so the Nordic lineage word
 * follows the drawn side). The seed varies sexes, looks, names, side and
 * order; never the shape. A graph that is not this shape THROWS
 * (assertConventional). F5 (Phase 2) is the shape-free face.
 *
 * Every answer is re-derived from the GRAPH, never from a label: each person
 * carries a kinship `path` from the ego; the locale bank's `kin` map turns a
 * path into a wordKey; an item is legal only if exactly ONE person on the page
 * carries it (verify() re-derives it, and re-derives every person's parents
 * FROM THE DRAWN LINES). THEME OFF (themeAxis non-applicable; landings carry
 * coordinate.theme:''); 0 library pictures; no unitAxis. build() reads ONLY
 * its bank (lib/b5-common.js bank('family', loc) — a missing locale block
 * THROWS, never an en fallback).
 *
 * Ladder (guards key on the RESOLVED config, never the level index):
 *   d1 {mode:'base', grand:false, baby:false, frame:[120,138], chipPx 24} 4 people, 3 asked
 *   d2 {mode:'base', grand:true,  baby:false, frame:[104,120], chipPx 22} 6 people, 5 asked (ships)
 *   d3 {mode:'base', grand:true,  baby:true,  frame:[96,110],  chipPx 22} 7 people, 6 asked
 * d1 has no grandparents (the row where the Nordic point lives) and d3 adds a
 * baby sibling; neither ships nor is a face (design §2).
 *
 * Stack (README: body 722, designed to 677): a column [stage | 12 | word
 * block] packed to the TOP; every px of slack falls BELOW the word block,
 * never between the tree and the words (the design's `minmax(<stage>px,1fr)`
 * parked it above the tree, and an evenly-spread column left a ~130 px band
 * under the ground — coordinator review; the gate's SPARSE check) — d2 stage 457 + 12 + word block 190 = 659
 * <= 677; d1 341 + 12 + 122 = 475; d3 427 + 12 + 190 = 629.
 *
 * Answer hiding: no kin word inside [data-lcs-stage] (its only text = the
 * ego's name + the badge numerals); boxes are EMPTY; the badge -> word link is
 * data-lcs-answer on the box only. Stamps: root data-lcs-family / -mode /
 * -locale / -grand-side / -reading (badges in tree reading order); frame
 * groups data-lcs-person / -path / -sex / -age / -look (+ -ego); frame rects
 * data-lcs-frame; discs data-lcs-disc + text data-lcs-badge-text; kin rows
 * data-lcs-kin="<wordKey>"; boxes data-lcs-answer="<badge>".
 *
 * FACES (Phase E, 2026-09-23; record _work/K-370-faces.md): five CODE faces on the `mode` knob —
 * generations (G1-385) · trace-words (K-375) · tree-clues (G1-386) · relation-riddles (G2-362) ·
 * tree-template (G1-387). _buildWith dispatches any face mode to _buildFace BEFORE the base path, so
 * the base (mode 'base') is byte-identical; an unknown mode throws. verify() dispatches on the root's
 * data-lcs-mode (browserVerifyFace re-derives every face answer from the graph). The closed faces
 * draw the ONE conventional family; the template draws no shape at all (no connector between mats).
 * FILL: every face's gaps + rows grow (min -> max) so it fills >= 85 % of an 814 body and still fits 677.
 */
'use strict';
const { bank: loadBank } = require('../../lib/b5-common.js');
const C5 = require('../../templates/components-b5.js');
const FT = require('../../primitives/family-tree.js');
const tokens = require('../../primitives/_tokens.js');
const FF = require('../../primitives/family-figure.js');
const { makeRng } = require('../../lib/rng.js');
const { FAMILY_NEUTRAL } = require('../../data/b5/family.js');

const ID = 'K-370';
const KEY = 'family';
const BODY_W = 675;
const STACK_MAX = 677;          // the four-line fi title chrome (README)
const STAGE_GAP = 12;
const K_ELEMENT = 56, K_BUST = 72, K_FRAME_W = 80;
const TRIES = 400;
const TINTS = ['tealSoft', 'coralSoft', 'creamDeep'];
const FACE_MODES = ['generations', 'trace-words', 'tree-clues', 'relation-riddles', 'tree-template'];

/** the ONE structure: M + F + at least one child of theirs (the ego), at most one grand couple, no second parent pair */
function assertConventional(persons) {
  const paths = persons.map((p) => p.path);
  if (FAMILY_NEUTRAL.structure !== 'conventional') throw new Error(`${ID}: structure "${FAMILY_NEUTRAL.structure}" (only 'conventional' is built)`);
  if (!paths.includes('M') || !paths.includes('F')) throw new Error(`${ID}: a closed face must draw the conventional family (a mother AND a father) — got ${paths.join(',')}`);
  if (!paths.includes('')) throw new Error(`${ID}: no ego`);
  const grands = paths.filter((p) => FT.GRAND.includes(p));
  if (grands.length && !(grands.length === 2 && grands[0][0] === grands[1][0])) throw new Error(`${ID}: grandparents ${grands.join(',')} are not ONE couple on one side`);
  if (new Set(paths).size !== paths.length) throw new Error(`${ID}: a path drawn twice`);
  const babies = paths.filter((p) => p === 'Zy' || p === 'By');
  if (babies.length > 1) throw new Error(`${ID}: ${babies.length} babies (at most one per page)`);
  for (const p of paths) if (!FAMILY_NEUTRAL.paths.includes(p)) throw new Error(`${ID}: unknown path "${p}"`);
}

/** rule 4 / 5: every asked word names EXACTLY one person on the page, and no person is named twice */
function uniqueReferents(persons, kin, askedWords) {
  const fails = [];
  const seen = new Set();
  for (const w of askedWords) {
    const refs = persons.filter((p) => p.path !== '' && kin[p.path] === w);
    if (refs.length !== 1) fails.push(`"${w}" names ${refs.length} people on the page (${refs.map((r) => r.path).join(',') || 'none'})`);
    else if (seen.has(refs[0].path)) fails.push(`${refs[0].path} is named by two words`);
    else seen.add(refs[0].path);
  }
  if (new Set(askedWords).size !== askedWords.length) fails.push('a word asked twice');
  return fails;
}

const monotone = (a) => a.every((v, i) => i === 0 || v >= a[i - 1]) || a.every((v, i) => i === 0 || v <= a[i - 1]);
/** a run: three neighbours stepping +1 or -1 (1,2,3 / 5,4,3) — a column that reads as a count is a guessable pattern */
const hasRun = (a) => a.some((v, i) => i >= 2 && ((a[i - 1] === a[i - 2] + 1 && v === a[i - 1] + 1) || (a[i - 1] === a[i - 2] - 1 && v === a[i - 1] - 1)));

function literal(bankLoc, wordKey, loc) {
  const w = bankLoc.words && bankLoc.words[wordKey];
  if (!w || typeof w.text !== 'string' || !w.text.trim()) throw new Error(`${ID}: ${loc} has no words.${wordKey} literal (refuse, never pad)`);
  if (/[{}\d]/.test(w.text)) throw new Error(`${ID}: ${loc} words.${wordKey} "${w.text}" carries a slot or a digit`);
  return w;
}

/**
 * The browser half of verify() (serialised into page.evaluate; self-contained).
 * data = { kin, words, ID, K }
 */
function browserVerify(data) {
  const { kin, words, ID, K } = data;
  const fails = [];
  const root = document.querySelector(`[data-lcs-family][data-lcs-type="${ID}"]`);
  if (!root) return [`${ID}: no family root`];
  if (!root.hasAttribute('data-ws-content')) fails.push('root lacks data-ws-content');
  const rect = (e) => e.getBoundingClientRect();
  const foot = document.querySelector('.ws-foot');
  const footTop = foot ? rect(foot).top : Infinity;
  const body = document.querySelector('.ws-body');
  const br = body ? rect(body) : null;
  const stage = root.querySelector('[data-lcs-stage]');
  if (!stage) return fails.concat('no stage');
  const svg = stage.querySelector('svg[data-lcs-stage-svg]');
  const groups = [...svg.querySelectorAll('g[data-lcs-person]')];
  const persons = groups.map((g) => {
    const fr = g.querySelector('rect[data-lcs-frame]');
    const disc = svg.querySelector(`circle[data-lcs-disc="${g.dataset.lcsPerson}"]`);
    const bt = svg.querySelector(`text[data-lcs-badge-text="${g.dataset.lcsPerson}"]`);
    return { id: g.dataset.lcsPerson, path: g.dataset.lcsPath, sex: g.dataset.lcsSex, age: g.dataset.lcsAge, look: g.dataset.lcsLook, ego: g.hasAttribute('data-lcs-ego'),
      x: +fr.getAttribute('x'), y: +fr.getAttribute('y'), w: +fr.getAttribute('width'), h: +fr.getAttribute('height'),
      badge: bt ? +bt.textContent.trim() : null, disc: disc ? { cx: +disc.getAttribute('cx'), cy: +disc.getAttribute('cy'), r: +disc.getAttribute('r') } : null, g, fr };
  });
  const egos = persons.filter((p) => p.ego);
  if (egos.length !== 1 || egos[0].path !== '') fails.push(`${egos.length} ego frames (want exactly one, on path '')`);
  const byPath = new Map(persons.map((p) => [p.path, p]));
  // the ONE structure
  if (!byPath.has('M') || !byPath.has('F')) fails.push('not the conventional structure (M and F)');
  const grands = persons.filter((p) => ['MM', 'MF', 'FM', 'FF'].includes(p.path));
  if (grands.length && grands.length !== 2) fails.push(`${grands.length} grandparents drawn`);
  // sex / age agree with the path (the path is the fact; the figure must depict it)
  const SEXOF = { M: 'f', F: 'm', Z: 'f', B: 'm', MM: 'f', FM: 'f', MF: 'm', FF: 'm', MZ: 'f', FZ: 'f', MB: 'm', FB: 'm' };
  for (const p of persons) {
    if (SEXOF[p.path] && SEXOF[p.path] !== p.sex) fails.push(`${p.path} drawn as ${p.sex}`);
    const age = ['MM', 'MF', 'FM', 'FF'].includes(p.path) ? 'elder' : /^[MF]([ZB])?$/.test(p.path) ? 'adult' : /y$/.test(p.path) ? 'baby' : 'child';
    if (age !== p.age) fails.push(`${p.path} drawn as ${p.age}, want ${age}`);
    const fig = p.g.querySelector('svg[data-lcs-figure]');
    if (!fig) fails.push(`${p.path}: no figure`);
    else {
      if (fig.dataset.lcsAge !== p.age || fig.dataset.lcsSex !== p.sex) fails.push(`${p.path}: the figure stamps disagree with the frame`);
      const fh = fig.height.baseVal.value * (svg.getScreenCTM() ? svg.getScreenCTM().d : 1);   // the bust's box, not its ink (a nested <svg>'s client rect is its content bbox)
      if (fh < K.bust - 0.6) fails.push(`${p.path}: bust ${fh.toFixed(1)} px < ${K.bust}`);
    }
    if (p.w < K.frameW) fails.push(`${p.path}: frame ${p.w} wide < ${K.frameW}`);
  }
  // garment fill never tied to sex: one fill per generation row
  const gFill = (p) => { const g = p.g.querySelector('[data-lcs-garment]'); return g ? g.getAttribute('fill').toUpperCase() : null; };
  const rowFill = {};
  for (const p of persons) { const r = String(p.y); const f = gFill(p); if (rowFill[r] && rowFill[r] !== f) fails.push(`garment fills differ within a generation row (${rowFill[r]} vs ${f} on ${p.path || 'ego'}) — colour could carry sex`); rowFill[r] = rowFill[r] || f; }
  // no two people of one (age, sex) cell share a look
  const cell = {};
  for (const p of persons) { const k = p.age + p.sex + '|' + p.look; if (cell[k]) fails.push(`${cell[k]} and ${p.path} share the look ${p.look}`); cell[k] = p.path; }
  // badges: every non-ego person, 1..N distinct; the ego none
  const nonEgo = persons.filter((p) => !p.ego);
  const bs = nonEgo.map((p) => p.badge);
  if (egos[0] && egos[0].badge != null) fails.push('the ego carries a badge');
  if (bs.some((b) => b == null)) fails.push('a non-ego person without a badge');
  const sortedB = bs.slice().sort((a, b) => a - b);
  if (sortedB.some((b, i) => b !== i + 1)) fails.push(`badges ${sortedB.join(',')} are not 1..${bs.length}`);
  // PR2: badge order is NOT monotone in generation
  const genOf = (path) => (['MM', 'MF', 'FM', 'FF'].includes(path) ? 0 : /^[MF]([ZB])?$/.test(path) ? 1 : 2);
  const gensByBadge = nonEgo.slice().sort((a, b) => a.badge - b.badge).map((p) => genOf(p.path));
  const mono = (a) => a.every((v, i) => i === 0 || v >= a[i - 1]) || a.every((v, i) => i === 0 || v <= a[i - 1]);
  if (mono(gensByBadge)) fails.push(`badge order is monotone in generation (${gensByBadge.join('')}) — "1 = grandma" habit`);
  // the words: every chip names exactly one person; its badge is the box's answer
  const rows = [...root.querySelectorAll('[data-lcs-kin]')];
  if (rows.length !== nonEgo.length) fails.push(`${rows.length} words for ${nonEgo.length} people`);
  const asked = rows.map((r) => r.dataset.lcsKin);
  if (new Set(asked).size !== asked.length) fails.push('a word asked twice');
  const answers = [];
  const named = new Set();
  rows.forEach((r) => {
    const wk = r.dataset.lcsKin;
    const chip = r.querySelector('[data-lcs-chip-text]');
    const box = r.querySelector('[data-lcs-answer]');
    if (!chip || !box) { fails.push(`row ${wk}: chip or box missing`); return; }
    if (!words[wk] || chip.textContent !== words[wk].text) fails.push(`row ${wk}: printed "${chip.textContent}" ≠ the bank literal "${words[wk] && words[wk].text}"`);
    if (chip.scrollWidth > chip.clientWidth + 0.5) fails.push(`row ${wk}: the chip clips its word`);
    const refs = persons.filter((p) => !p.ego && kin[p.path] === wk);
    if (refs.length !== 1) { fails.push(`"${wk}" names ${refs.length} people`); return; }
    if (named.has(refs[0].path)) fails.push(`${refs[0].path} named twice`);
    named.add(refs[0].path);
    if (String(refs[0].badge) !== box.dataset.lcsAnswer) fails.push(`row ${wk}: box answer ${box.dataset.lcsAnswer} ≠ the badge of ${refs[0].path} (${refs[0].badge}) re-derived from the graph`);
    answers.push(+box.dataset.lcsAnswer);
    if (box.textContent.trim() || box.querySelector('text')) fails.push(`row ${wk}: the box prints something`);
    const cr = rect(chip), xr = rect(box);
    if (cr.height < K.element - 0.6) fails.push(`row ${wk}: chip ${cr.height.toFixed(1)} px < ${K.element}`);
    if (xr.height < K.element - 0.6 || xr.width < 64 - 0.6) fails.push(`row ${wk}: box ${xr.width.toFixed(0)} x ${xr.height.toFixed(0)} < 64 x ${K.element}`);
    if (cr.bottom > footTop + 0.6 || xr.bottom > footTop + 0.6) fails.push(`row ${wk} reaches the footer`);
    if (br && (cr.left < br.left - 0.6 || xr.right > br.right + 0.6)) fails.push(`row ${wk} leaves the body column`);
  });
  const reading = (root.dataset.lcsReading || '').split(',').map(Number);
  const run = answers.some((v, i) => i >= 2 && ((answers[i - 1] === answers[i - 2] + 1 && v === answers[i - 1] + 1) || (answers[i - 1] === answers[i - 2] - 1 && v === answers[i - 1] - 1)));
  if (run) fails.push(`the answer column reads ${answers.join(',')} (three in a counting run)`);
  if (answers.join(',') === reading.join(',')) fails.push('the answer column repeats the tree reading order');
  // no kin word inside the stage: its only text = the ego name + the badge numerals
  const stageText = [...stage.querySelectorAll('text, [data-lcs-plate]')].map((t) => t.textContent.trim()).filter(Boolean);
  const plate = stage.querySelector('[data-lcs-plate]');
  const allowed = new Set([...(plate ? [plate.textContent.trim()] : []), ...bs.map(String)]);
  for (const t of stageText) if (!allowed.has(t)) fails.push(`stage text "${t}" is neither the ego name nor a badge`);
  const lits = Object.values(words).map((w) => w.text.toLowerCase());
  const st = stage.textContent.toLowerCase();
  for (const l of lits) if (new RegExp(`(?<!\\p{L})${l.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?!\\p{L})`, 'u').test(st)) fails.push(`a kin word "${l}" is printed inside the stage`);
  if (!plate) fails.push('no ego name plate');
  else {
    const pr = rect(plate), er = rect(egos[0].fr);
    if (Math.abs((pr.top + pr.bottom) / 2 - er.bottom) > 2) fails.push('the ego plate is not centred on the frame bottom edge');
    if (parseFloat(getComputedStyle(plate).fontSize) < 16) fails.push('the ego plate text < 16 px');
  }
  // every text >= 16 px
  for (const t of svg.querySelectorAll('text')) if (+t.getAttribute('font-size') < 16) fails.push('stage text under 16 px');
  // THE LINES: re-derive every person's parents from the drawn geometry (bar -> drop -> frame)
  const segs = [...svg.querySelectorAll('line[data-lcs-conn]')].map((l) => ({ x1: +l.getAttribute('x1'), y1: +l.getAttribute('y1'), x2: +l.getAttribute('x2'), y2: +l.getAttribute('y2') }));
  const E = 0.6;
  const H = [], V = [];
  for (const s of segs) {
    if (Math.abs(s.y1 - s.y2) < E) H.push({ y: s.y1, x1: Math.min(s.x1, s.x2), x2: Math.max(s.x1, s.x2) });
    else if (Math.abs(s.x1 - s.x2) < E) V.push({ x: s.x1, y1: Math.min(s.y1, s.y2), y2: Math.max(s.y1, s.y2) });
    else fails.push(`a connector is neither horizontal nor vertical (${s.x1},${s.y1} -> ${s.x2},${s.y2})`);
  }
  const coupleOf = (h) => {
    const a = persons.find((p) => Math.abs(p.x + p.w - h.x1) < 1 && h.y > p.y && h.y < p.y + p.h);
    const b = persons.find((p) => Math.abs(p.x - h.x2) < 1 && h.y > p.y && h.y < p.y + p.h);
    return a && b ? [a.path, b.path] : null;
  };
  const onH = (x, y) => H.find((h) => Math.abs(h.y - y) < 1 && x >= h.x1 - 1 && x <= h.x2 + 1);
  const parentsFromLines = new Map(persons.map((p) => [p.path, []]));
  const sibParents = (h, depth) => {
    if (depth > 4) return null;
    const c = coupleOf(h);
    if (c) return c;
    const up = V.find((v) => Math.abs(v.y2 - h.y) < 1 && v.x >= h.x1 - 1 && v.x <= h.x2 + 1);
    if (!up) return null;
    const hh = onH(up.x, up.y1);
    return hh ? sibParents(hh, depth + 1) : null;
  };
  for (const v of V) {
    const child = persons.find((p) => Math.abs(p.y - v.y2) <= 2 && Math.abs(p.x + p.w / 2 - v.x) <= 2);
    if (!child) continue;
    const h = onH(v.x, v.y1);
    let ps = h ? sibParents(h, 0) : null;
    if (!ps) { const pf = persons.find((p) => Math.abs(p.y + p.h - v.y1) < 1 && v.x > p.x && v.x < p.x + p.w); if (pf) ps = [pf.path]; }
    if (ps) parentsFromLines.set(child.path, [...parentsFromLines.get(child.path), ...ps]);
  }
  const graphParents = (path) => (/^(|Z|B|Zy|By)$/.test(path) ? ['M', 'F'] : (path === 'M' || /^M[ZB]$/.test(path)) ? ['MM', 'MF'] : (path === 'F' || /^F[ZB]$/.test(path)) ? ['FM', 'FF'] : /^[MF][ZB][DS]$/.test(path) ? [path.slice(0, 2)] : []);
  for (const p of persons) {
    const want = graphParents(p.path).filter((q) => byPath.has(q)).sort().join('+');
    const got = [...new Set(parentsFromLines.get(p.path))].sort().join('+');
    if (want !== got) fails.push(`the drawn lines give ${p.path || 'ego'} the parents [${got}], the graph says [${want}]`);
  }
  // every drop ends on a frame top (± 2); no segment runs through a frame except at its endpoints; >= 10 px from every disc
  for (const v of V) {
    const endsOnTop = persons.some((p) => Math.abs(p.y - v.y2) <= 2 && Math.abs(p.x + p.w / 2 - v.x) <= 2);
    const endsOnBar = !!onH(v.x, v.y2);
    if (!endsOnTop && !endsOnBar) fails.push(`a vertical connector at x ${v.x} ends in the air (y ${v.y2})`);
  }
  const segIn = (s, p) => {
    const inset = 2;
    if (s.y !== undefined) return s.y > p.y + inset && s.y < p.y + p.h - inset && Math.min(s.x2, p.x + p.w - inset) - Math.max(s.x1, p.x + inset) > 0.5;
    return s.x > p.x + inset && s.x < p.x + p.w - inset && Math.min(s.y2, p.y + p.h - inset) - Math.max(s.y1, p.y + inset) > 0.5;
  };
  for (const p of persons) { for (const h of H) if (segIn(h, p)) fails.push(`a bar runs through ${p.path || 'ego'}'s frame`); for (const v of V) if (segIn(v, p)) fails.push(`a line runs through ${p.path || 'ego'}'s frame`); }
  const distSeg = (cx, cy, s) => { if (s.y !== undefined) { const x = Math.max(s.x1, Math.min(cx, s.x2)); return Math.hypot(cx - x, cy - s.y); } const y = Math.max(s.y1, Math.min(cy, s.y2)); return Math.hypot(cx - s.x, cy - y); };
  for (const p of persons) if (p.disc) for (const s of [...H, ...V]) { const d = distSeg(p.disc.cx, p.disc.cy, s) - p.disc.r; if (d < 10 - 0.01) fails.push(`a connector passes ${d.toFixed(1)} px from ${p.path}'s disc (< 10)`); }
  // frames: no overlap, gaps >= 14 within a row
  for (let i = 0; i < persons.length; i++) for (let j = i + 1; j < persons.length; j++) {
    const a = persons[i], b = persons[j];
    if (Math.abs(a.y - b.y) > 0.5) continue;
    const gap = Math.max(a.x, b.x) - Math.min(a.x + a.w, b.x + b.w);
    if (gap < 14) fails.push(`${a.path || 'ego'} and ${b.path || 'ego'} are ${gap.toFixed(1)} px apart (< 14)`);
  }
  // everything above the footer, inside the body column
  const sr = rect(stage);
  if (sr.bottom > footTop + 0.6) fails.push('the stage reaches the footer');
  if (br && (sr.left < br.left - 0.6 || sr.right > br.right + 0.6)) fails.push('the stage leaves the body column');
  if (root.querySelector('img, [data-lcs-pic]')) fails.push('a library picture on the page');
  return fails;
}

/* ==================================================================== THE FACES (Phase E) */
/**
 * FILL (lead note, 2026-09-23): a face must reach >= 85 % of the body at the 814 one-line chrome and still fit
 * the 677 four-line chrome — so no face is a fixed stack: the gaps BETWEEN blocks are flexible spacers
 * (min -> max <= 40, the SPARSE ceiling) and each face's rows grow from a min to a max height. stackH = the
 * minimum (checked against 677), stackMax = the fully grown stack (the gate measures the real bottom).
 */
const spacer = (min, max) => `<div data-lcs-gap="" style="flex:1 1 ${min}px;min-height:${min}px;max-height:${max == null ? min : max}px"></div>`;
const LS = require('../../data/tracing/letter-strokes.js');
const DIRECT = new Set(['M', 'F', 'Z', 'B', 'MM', 'MF', 'FM', 'FF']);
/** the single generation a word names in this locale (null = ambiguous / unmapped) */
function wordGen(kin, wk) {
  const gs = new Set(Object.keys(kin).filter((p) => kin[p] === wk).map((p) => FT.genOf(p)));
  return gs.size === 1 ? [...gs][0] : null;
}
/** a "sideline" word names nobody on the direct line (aunt / uncle / cousin / a baby sibling) */
const isSideline = (kin, wk) => { const ps = Object.keys(kin).filter((p) => kin[p] === wk); return ps.length > 0 && ps.every((p) => !DIRECT.has(p)); };
const traceable = (text) => { try { LS.textGlyphs(text); return true; } catch (e) { return false; } };
/** the name pool of one sex (>= 6, else refuse) */
function namePool(bankLoc, sex, locale) {
  const pool = (bankLoc.names || []).filter((n) => n.sex === sex);
  if (pool.length < 6) throw new Error(`${ID}: ${locale} has ${pool.length} ${sex} names (>= 6)`);
  return pool;
}
/** a slot frame filled with the ego's name / genitive (a missing genitive REFUSES) */
function fillFrame(frame, ego, locale) {
  if (frame.includes('{egoGen}') && !ego.gen) throw new Error(`${ID}: ${locale} name ${ego.name} has no genitive but the frame uses {egoGen}`);
  return frame.replace(/\{egoGen\}/g, ego.gen || '').replace(/\{egoName\}/g, ego.name);
}

/** F1 generations — order kin WORDS by generation (a picture legend, no figure beside a word) */
function faceGenerations(bankLoc, d, locale, rng, over) {
  const kin = bankLoc.kin;
  const ok = (bankLoc.generationOK || []).filter((wk) => !(bankLoc.f1Exclude || []).includes(wk));
  const byGen = [[], [], []];
  for (const wk of ok) {
    const w = literal(bankLoc, wk, locale);
    const g = wordGen(kin, wk);
    if (g == null) throw new Error(`${ID}: ${locale} generationOK word ${wk} has no single generation`);
    if (w.register !== d.register) continue;
    byGen[g].push(wk);
  }
  if (byGen.some((a) => !a.length)) throw new Error(`${ID}: ${locale} F1 pool has an empty generation (${byGen.map((a) => a.length).join('/')}) — refuse`);
  const PERMS = [[0, 2, 1], [1, 0, 2], [1, 2, 0], [2, 0, 1], [2, 1, 0]];   // [0,1,2] = printed in answer order: never
  let rows = null;
  for (let t = 0; t < TRIES && !rows; t++) {
    const cyc = byGen.map((a) => rng.shuffle(a));
    const cand = [];
    for (let r = 0; r < d.rows; r++) {
      const trio = [0, 1, 2].map((g) => cyc[g][r % cyc[g].length]);
      const perm = rng.pick(PERMS);
      cand.push(perm.map((g) => ({ wordKey: trio[g], gen: g })));
    }
    const side = cand.filter((row) => row.some((c) => isSideline(kin, c.wordKey))).length;
    if (side < d.minSideline) continue;
    const reverse = cand.filter((row) => row.map((c) => c.gen).join('') === '210').length;
    if (reverse > 1) continue;
    let slotOk = true;
    for (let s = 0; s < 3 && slotOk; s++) for (let g = 0; g < 3; g++) if (cand.filter((row) => row[s].gen === g).length > d.maxPerSlot) slotOk = false;
    if (!slotOk) continue;
    if (new Set(cand.map((row) => row.map((c) => c.wordKey).sort().join('|'))).size !== cand.length) continue;   // no trio repeated
    rows = cand;
  }
  if (over.rows) rows = over.rows(rows);   // the gate's poison seam
  if (!rows) throw new Error(`${ID}: ${locale} no admissible generations page in ${TRIES} tries`);
  // the legend: elder / adult / child pairs, one f + one m each, one tint per frame (a separate stream: cosmetic draws never move answers)
  const cos = makeRng(String(rng.seed) + '|legend');
  const tints = cos.shuffle(TINTS);
  const gens = ['elder', 'adult', 'child'].map((age, i) => ({ rank: i + 1, people: ['f', 'm'].map((sex) => ({ age, sex, look: cos.pick(FF.lookIds(age, sex)), tint: tints[i] })) }));
  const rail = C5.genRail({ gens, w: 639, frameW: d.legend[0], frameH: d.legend[1], px: d.legendPx });
  // each row on its own soft band (row grouping beats column grouping: "in each row")
  const band0 = d.rowH + 8, bandMax = d.rowMax + 8;
  const grid = `<div class="fam-genrows" data-lcs-genrows="" style="display:flex;flex-direction:column;align-items:center;gap:${d.rowGap}px;height:100%">` +
    rows.map((row, ri) => `<div data-lcs-genrow-band="${ri}" style="box-sizing:border-box;display:flex;gap:10px;padding:4px;background:${tokens.color.creamDeep};border-radius:18px;flex:1 1 ${band0}px;min-height:${band0}px;max-height:${bandMax}px">` +
      row.map((c) => C5.genPlacard({ wordKey: c.wordKey, text: literal(bankLoc, c.wordKey, locale).text, answer: c.gen + 1, gen: c.gen, px: d.chipPx, h: 'fill', boxW: d.box[0], boxH: d.box[1] }).replace('class="fam-placard"', `class="fam-placard" data-lcs-genrow="${ri}"`)).join('') + `</div>`).join('') + `</div>`;
  const gridH = d.rows * band0 + (d.rows - 1) * d.rowGap, gridMax = d.rows * bandMax + (d.rows - 1) * d.rowGap;
  return { blocks: [rail.html, grid], gaps: [24], gapMax: [40], blockStyles: [null, `flex:1 1 ${gridH}px;min-height:${gridH}px;max-height:${gridMax}px;display:flex;flex-direction:column`],
    stackH: rail.height + 24 + gridH, stackMax: rail.height + 40 + gridMax,
    meta: { rows: rows.map((r) => r.map((c) => c.wordKey)), answers: rows.map((r) => r.map((c) => c.gen + 1)) } };
}

/** F2 trace-words — a small tree where EVERY person but the ego is numbered; the words to trace sit
 *  UNNUMBERED in a panel apart from the numbered lines, so line N needs the tree (review round 1: the
 *  word printed beside its number made "find the person" a step with no consequence, and one elder
 *  carried neither a number nor a word). The child finds person N, traces that person's word in the
 *  panel and writes it again on line N. */
function faceTraceWords(bankLoc, d, locale, rng, over = {}) {
  const comp = this._compose({ grand: true, baby: false }, rng);
  const { persons } = comp;
  assertConventional(persons);
  const kin = bankLoc.kin;
  const excl = new Set(bankLoc.f2Exclude || []);
  const nonEgo = persons.filter((p) => p.path !== '');
  const isCand = (p) => {
    const wk = kin[p.path];
    if (!wk) throw new Error(`${ID}: ${locale} kin has no entry for path "${p.path}" (refuse, never pad)`);
    const w = literal(bankLoc, wk, locale);
    return !excl.has(wk) && w.register === d.register && traceable(w.text);
  };
  const cands = nonEgo.filter(isCand);
  if (cands.length < d.minRows) throw new Error(`${ID}: ${locale} only ${cands.length} traceable family words on the tree (< ${d.minRows}) — refuse`);
  const uf = uniqueReferents(persons, kin, cands.map((p) => kin[p.path]));
  if (uf.length) throw new Error(`${ID}: ${locale} ${uf.join('; ')}`);
  // EVERY drawn person but the ego carries a number (a figure with no number and no word is a defect)
  let badges = null;
  for (let t = 0; t < TRIES && !badges; t++) {
    const nums = rng.shuffle(Array.from({ length: nonEgo.length }, (_, i) => i + 1));
    const gens = nonEgo.map((p, i) => ({ g: FT.genOf(p.path), n: nums[i] })).sort((a, b) => a.n - b.n).map((x) => x.g);
    if (!monotone(gens)) badges = Object.fromEntries(nonEgo.map((p, i) => [p.id, nums[i]]));
  }
  if (!badges) throw new Error(`${ID}: no non-monotone badge order in ${TRIES} tries`);
  if (over.unbadge) delete badges[nonEgo.find((p) => p.path === over.unbadge).id];
  const ego = persons.find((p) => p.path === '');
  const pool = namePool(bankLoc, ego.sex, locale);
  const egoName = pool[rng.int(0, pool.length - 1)].name;
  const stage = C5.familyStage({ persons, frame: { w: d.frame[0], h: d.frame[1] }, badges, egoId: ego.id, egoName, skin: 'tree', w: d.stageW, crownClamp: true });
  // one numbered line per traceable numbered person, in number order
  const rows = cands.filter((p) => badges[p.id] != null).sort((a, b) => badges[a.id] - badges[b.id]).map((p) => {
    const text = literal(bankLoc, kin[p.path], locale).text;
    const g = f2Glyph(text, d);
    if (g < d.glyphH - 1e-6) throw new Error(`${ID}: ${locale} "${text}" shrinks to glyphH ${g.toFixed(1)} < ${d.glyphH} in the ${d.laneW} lane — refuse (the lane's silent shrink)`);
    return { badge: badges[p.id], answer: text };
  });
  // the panel order: a derangement of the line order (no word beside the line it answers), never the reverse
  let bank = null;
  for (let t = 0; t < TRIES && !bank; t++) {
    const o = rng.shuffle(rows.map((r) => r.answer));
    if (o.some((w, i) => w === rows[i].answer)) continue;
    if (o.length > 2 && o.every((w, i) => w === rows[rows.length - 1 - i].answer)) continue;
    bank = o;
  }
  if (!bank) throw new Error(`${ID}: no admissible trace-panel order in ${TRIES} tries`);
  if (over.bank) bank = over.bank(rows, bank);
  const n = rows.length, pad = 8;
  const panelH = n * d.trioH + (n - 1) * d.bankGap + 2 * pad, panelMax = n * d.trioH + (n - 1) * d.bankGapMax + 2 * pad;
  const rowsH = n * d.trioH + (n - 1) * d.rowGap, rowsMax = n * d.trioH + (n - 1) * d.rowGapMax;
  const colH = panelH + d.midGap + rowsH, colMax = panelMax + d.midGapMax + rowsMax;
  const panel = C5.famTraceBank({ words: bank, laneW: d.laneW, trioH: d.trioH, glyphH: d.glyphH, gap: d.bankGap, gapMax: d.bankGapMax, pad });
  const lines = C5.famWriteRows({ rows, laneW: d.laneW, trioH: d.trioH, glyphH: d.glyphH, gap: d.rowGap, gapMax: d.rowGapMax });
  const colW = BODY_W - d.stageW - d.colGap;
  const col = `<div style="display:flex;flex-direction:column;height:100%;width:${colW}px">` +
    `<div style="flex:1 1 ${panelH}px;min-height:${panelH}px;max-height:${panelMax}px;display:flex;flex-direction:column">${panel}</div>` + spacer(d.midGap, d.midGapMax) +
    `<div style="flex:1 1 ${rowsH}px;min-height:${rowsH}px;max-height:${rowsMax}px;display:flex;flex-direction:column">${lines}</div></div>`;
  const h = Math.max(stage.height, colH);
  const block = `<div data-lcs-trace-layout="" style="display:flex;align-items:center;gap:${d.colGap}px;width:${BODY_W}px;height:100%">` +
    `<div style="flex:0 0 ${d.stageW}px">${stage.html}</div><div style="flex:0 0 auto;align-self:stretch">${col}</div></div>`;
  const reading = stage.tree.nodes.filter((nd) => badges[nd.id] != null).sort((a, b) => a.row - b.row || a.cx - b.cx).map((nd) => badges[nd.id]);
  return { blocks: [block], gaps: [], blockStyles: [`flex:1 1 ${h}px;min-height:${h}px;max-height:${Math.max(h, colMax)}px;display:flex`], stackH: h, stackMax: Math.max(h, colMax), rootAttrs: ` data-lcs-grand-side="${comp.grandSide}" data-lcs-reading="${reading.join(',')}"`,
    meta: { grandSide: comp.grandSide, egoName, words: rows.map((r) => r.answer), bank, reading, stageH: stage.height } };
}
/** the RESOLVED glyph height of a word in the F2 stacked lane (trace-path.js strokeWordLane, the silent shrink) */
function f2Glyph(text, d) {
  const LM = LS.METRICS;
  const { width } = LS.textGlyphs(text);
  const units = LM.base - LM.ascender;
  let scale = Math.min(d.glyphH / units, (d.trioH - 6) / (LM.desc - LM.ascender));
  if (width * scale > d.laneW - 10 - 8) scale = (d.laneW - 18) / width;
  return scale * units;
}

/** F3 tree-clues — a given tree with name plates; four clues fill the four empty plates */
function faceTreeClues(bankLoc, d, locale, rng, over) {
  const comp = over.compose ? over.compose(d, rng) : this._compose({ grand: true, baby: false, sideline: d.sideline }, rng);
  const { persons } = comp;
  assertConventional(persons);
  // review round 1: the Z / B path IS the older sibling (several locales' clue frames say "older brother"),
  // so it is drawn TALLER than the ego — a bigger bust filling its frame, the ego's at the K-2 bust floor band
  if (!over.sameSize) {
    const older = persons.find((p) => p.path === 'Z' || p.path === 'B'), egoP = persons.find((p) => p.path === '');
    if (older && egoP) { older.bustPx = d.frame[1] - 12; egoP.bustPx = Math.max(72, Math.round(d.frame[1] * 0.76)); }
  }
  const kin = bankLoc.kin;
  for (const p of persons) if (p.path !== '') literal(bankLoc, kin[p.path] || '__none__', locale);
  const uf = uniqueReferents(persons, kin, persons.filter((p) => p.path !== '').map((p) => kin[p.path]));
  if (uf.length) throw new Error(`${ID}: ${locale} ${uf.join('; ')}`);
  // names: sex-matched, pairwise distinct; the ego's the seed's index (as the base)
  const ego = persons.find((p) => p.path === '');
  const fPool = namePool(bankLoc, 'f', locale), mPool = namePool(bankLoc, 'm', locale);
  const egoRec = (ego.sex === 'f' ? fPool : mPool)[rng.int(0, 5)];
  const used = new Set([egoRec.name]);
  const nameOf = { [ego.id]: egoRec };
  for (const p of persons) {
    if (p === ego) continue;
    const pool = rng.shuffle(p.sex === 'f' ? fPool : mPool).filter((n) => !used.has(n.name));
    if (!pool.length) throw new Error(`${ID}: ${locale} runs out of ${p.sex} names`);
    nameOf[p.id] = pool[0]; used.add(pool[0].name);
  }
  // empty plates: the sideline adult + the parent of the same sex (a same-(age, sex) pair) + two more
  const side = persons.find((p) => /^[MF][ZB]$/.test(p.path));
  if (!side) throw new Error(`${ID}: tree-clues needs the sideline aunt / uncle`);
  const twin = persons.find((p) => p !== side && p.age === side.age && p.sex === side.sex);
  const rest = rng.shuffle(persons.filter((p) => p !== ego && p !== side && p !== twin));
  const empty = over.empty ? over.empty(persons) : [side, twin, ...rest.slice(0, d.clues - 2)];
  const emptyIds = new Set(empty.map((p) => p.id));
  const tree0 = FT.familyTree({ persons, frame: { w: d.frame[0], h: d.frame[1] }, nodeW: d.plate[0], labelH: d.plateGap + d.plate[1], rowGap: d.rowGap, plates: false, w: BODY_W });
  const reading = tree0.nodes.filter((n) => emptyIds.has(n.id)).sort((a, b) => a.row - b.row || a.cx - b.cx).map((n) => n.id);
  let order = null;
  for (let t = 0; t < TRIES && !order; t++) { const o = rng.shuffle(empty); if (o.map((p) => p.id).join() !== reading.join()) order = o; }
  if (over.clueOrder) order = over.clueOrder(order, reading);   // the gate's poison seam
  if (!order) throw new Error(`${ID}: no clue order off the reading order`);
  const clues = order.map((p) => {
    const frame = bankLoc.clueFrames && bankLoc.clueFrames[p.path];
    if (!frame) throw new Error(`${ID}: ${locale} has no clue frame for ${p.path} (refuse)`);
    return { path: p.path, text: fillFrame(frame, egoRec, locale).replace(/\{name\}/g, nameOf[p.id].name) };
  });
  const overlay = (tree) => tree.nodes.map((n) => {
    const p = persons.find((q) => q.id === n.id);
    const style = `position:absolute;left:${(n.cx - d.plate[0] / 2).toFixed(2)}px;top:${(n.y + d.frame[1] + d.plateGap).toFixed(2)}px;width:${d.plate[0]}px;height:${d.plate[1]}px;display:flex`;
    const at = `data-lcs-plate-for="${p.id}" data-lcs-plate-path="${p.path}"`;
    return `<div style="${style}">` + (emptyIds.has(p.id) ? C5.nameBox({ w: d.plate[0], h: d.plate[1], answer: nameOf[p.id].name, attrs: at }) : C5.famGivenPlate({ text: nameOf[p.id].name, w: d.plate[0], h: d.plate[1], attrs: at })) + `</div>`;
  }).join('');
  const stage = C5.familyStage({ persons, frame: { w: d.frame[0], h: d.frame[1] }, nodeW: d.plate[0], labelH: d.plateGap + d.plate[1], rowGap: d.rowGap, plates: false, badges: {}, egoId: ego.id, egoName: egoRec.name, skin: 'tree', w: BODY_W, overlay });
  const list = C5.clueList({ clues, rowH: d.clueH, rowMax: d.clueMax });
  const listH = clues.length * d.clueH, listMax = clues.length * d.clueMax;
  return { blocks: [stage.html, list], gaps: [d.gap], gapMax: [d.gapMax], blockStyles: [null, `flex:1 1 ${listH}px;min-height:${listH}px;max-height:${listMax}px;display:flex;flex-direction:column`],
    stackH: stage.height + d.gap + listH, stackMax: stage.height + d.gapMax + listMax,
    rootAttrs: ` data-lcs-grand-side="${comp.grandSide}" data-lcs-ego-name="${egoRec.name}"`,
    meta: { grandSide: comp.grandSide, egoName: egoRec.name, empty: empty.map((p) => p.path), clues: clues.map((c) => c.path), stageH: stage.height } };
}

/** F4 relation-riddles — compose two relations; write the one kin word from the bank (no tree) */
function faceRiddles(bankLoc, d, locale, rng, over) {
  const kin = bankLoc.kin;
  const paths = FAMILY_NEUTRAL.riddlePathsD2;
  const answers = Object.fromEntries(paths.map((p) => { const wk = kin[p]; if (!wk) throw new Error(`${ID}: ${locale} kin has no ${p}`); literal(bankLoc, wk, locale); return [p, wk]; }));
  for (const p of paths) if (!bankLoc.riddleFrames || !bankLoc.riddleFrames[p]) throw new Error(`${ID}: ${locale} has no riddle frame for ${p} (refuse)`);
  const distinct = [...new Set(Object.values(answers))];
  const dist = bankLoc.distractors || [];
  for (const x of dist) { literal(bankLoc, x, locale); if (distinct.includes(x)) throw new Error(`${ID}: ${locale} distractor ${x} fits a riddle`); }
  const egoSex = rng.pick(['f', 'm']);
  const ego = { id: 'ego', path: '', sex: egoSex, age: 'child', look: rng.pick(FF.lookIds('child', egoSex)), tint: makeRng(String(rng.seed) + '|garment').pick(TINTS) };
  const egoRec = namePool(bankLoc, egoSex, locale)[rng.int(0, 5)];
  let order = null;
  for (let t = 0; t < TRIES && !order; t++) {
    const o = rng.shuffle(paths);
    if (o.some((p, i) => i > 0 && answers[p] === answers[o[i - 1]])) continue;                 // two riddles with one answer never adjacent
    const gs = o.map((p) => FT.genOf(p));
    if (monotone(gs)) continue;                                                                 // not grandparents-first / aunts-first
    order = o;
  }
  if (over.order) order = over.order(order, answers);   // the gate's poison seam
  if (!order) throw new Error(`${ID}: no admissible riddle order in ${TRIES} tries`);
  // review round 1 (en/fr/it/pt panels): a bank word that answers no riddle sends a child hunting for its riddle, and the
  // instruction never says two words are left over — the printed bank holds ONLY the answer words. The locale's
  // `distractors` stay validated bank data (rule 7) but are not printed; `over.withDistractors` is the gate's poison seam.
  const bankWords = rng.shuffle(over.withDistractors ? [...distinct, ...dist] : [...distinct]);
  const bankHtml = `<div class="ws-scene-banner ws-bank" data-lcs-bank-banner="" style="flex:1 1 auto;margin:0;flex-wrap:wrap">` +
    bankWords.map((wk) => `<span class="ws-bankword" data-lcs-bank-word="${wk}" style="font-size:${d.bankPx}px;height:${d.bankH}px;box-sizing:border-box">${literal(bankLoc, wk, locale).text.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</span>`).join('') + `</div>`;
  const card = C5.famEgoCard({ person: ego, name: egoRec.name, w: d.frame[0], h: d.frame[1] });
  const band = `<div data-lcs-riddle-band="" style="display:flex;align-items:center;gap:16px;width:${BODY_W - 36}px;margin:0 auto">${card}${bankHtml}</div>`;
  const rowsHtml = `<div data-lcs-riddles="" style="display:flex;flex-direction:column;gap:${d.rowGap}px;width:${BODY_W - 36}px;margin:0 auto;height:100%">` + order.map((p, i) => {
    const txt = fillFrame(bankLoc.riddleFrames[p], egoRec, locale);
    const [before, after] = txt.split('___');
    return C5.riddleRow({ n: i + 1, before: before.replace(/\s+$/, ' ').replace(/^\s+/, ''), after, path: p, answer: answers[p], slotW: d.slot[0], slotH: d.slot[1], rowH: d.rowH, rowMax: d.rowMax });
  }).join('') + `</div>`;
  const bandH = d.frame[1] + 8 + 13;
  const rowsH = paths.length * d.rowH + (paths.length - 1) * d.rowGap, rowsMax = paths.length * d.rowMax + (paths.length - 1) * d.rowGap;
  return { blocks: [band, rowsHtml], gaps: [12], gapMax: [40], blockStyles: [null, `flex:1 1 ${rowsH}px;min-height:${rowsH}px;max-height:${rowsMax}px;display:flex;flex-direction:column`],
    stackH: bandH + 12 + rowsH, stackMax: bandH + 40 + rowsMax, rootAttrs: ` data-lcs-ego-name="${egoRec.name}"`,
    meta: { egoName: egoRec.name, order, answers: order.map((p) => answers[p]), bank: bankWords } };
}

/** F5 tree-template — the OPEN frame tree (no verify of answers; structure only) */
function faceTemplate(bankLoc, d, locale) {
  if (!bankLoc.meWord || !String(bankLoc.meWord).trim()) throw new Error(`${ID}: ${locale} has no meWord (refuse)`);
  const t = C5.templateTree({ meWord: bankLoc.meWord, w: BODY_W, shelf: d.shelf });
  return { blocks: [t.treeHtml, t.shelfHtml], gaps: [d.gap], gapMax: [d.gapMax], stackH: Math.ceil(t.treeH + d.gap + t.shelfH), stackMax: Math.ceil(t.treeH + d.gapMax + t.shelfH),
    meta: { mats: t.tree.mats.length + t.tree.smalls.length } };
}

/** the data a face's browser verify needs (never the stamps under test) */
function faceVerifyData(b, mode) {
  return { mode, ID, kin: b.kin, words: b.words, names: b.names || [], clueFrames: b.clueFrames || {}, riddleFrames: b.riddleFrames || {}, distractors: b.distractors || [],
    generationOK: b.generationOK || [], meWord: b.meWord || '', forbidden: b.forbiddenInTemplate || [],
    FL: { K: { element: 56, bust: 72, frameW: 80 }, G1: { element: 44, bust: 72, frameW: 80 }, G2: { element: 36, bust: 72, frameW: 80 } } };
}

/**
 * The browser half of every face's verify() (serialised into page.evaluate; self-contained).
 * Every answer is re-derived from the kin GRAPH + the bank literals, never from the stamp under test.
 */
function browserVerifyFace(data) {
  const { mode, ID, kin, words, names, clueFrames, riddleFrames, distractors, generationOK, meWord, forbidden, FL } = data;
  const fails = [];
  const root = document.querySelector(`[data-lcs-family][data-lcs-type="${ID}"]`);
  if (!root) return [`${ID}: no family root`];
  if (!root.hasAttribute('data-ws-content')) fails.push('root lacks data-ws-content');
  if (root.dataset.lcsFace !== mode) fails.push(`the root stamps face "${root.dataset.lcsFace}" for mode ${mode}`);
  const rect = (e) => e.getBoundingClientRect();
  const foot = document.querySelector('.ws-foot');
  const footTop = foot ? rect(foot).top : Infinity;
  const body = document.querySelector('.ws-body');
  const br = body ? rect(body) : null;
  const GRAND = ['MM', 'MF', 'FM', 'FF'];
  const genOf = (p) => (GRAND.includes(p) ? 0 : /^[MF]([ZB])?$/.test(p) ? 1 : 2);
  const wordGen = (wk) => { const gs = new Set(Object.keys(kin).filter((p) => kin[p] === wk).map(genOf)); return gs.size === 1 ? [...gs][0] : null; };
  const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const lits = Object.values(words).map((w) => w.text.toLowerCase());
  const hasLit = (text) => lits.filter((l) => new RegExp(`(?<!\\p{L})${esc(l)}(?!\\p{L})`, 'u').test(text.toLowerCase()));
  // everything above the footer, inside the body column; no library picture
  for (const el of root.querySelectorAll('*')) {
    const r = rect(el);
    if (!r.width || !r.height) continue;
    if (r.bottom > footTop + 0.6) { fails.push(`${el.tagName.toLowerCase()} reaches the footer`); break; }
    if (br && (r.left < br.left - 0.6 || r.right > br.right + 0.6)) { fails.push(`${el.tagName.toLowerCase()} leaves the body column`); break; }
  }
  if (root.querySelector('img, [data-lcs-pic]')) fails.push('a library picture on the page');
  for (const t of root.querySelectorAll('text')) if (+t.getAttribute('font-size') < 16) fails.push('svg text under 16 px');

  /** read a drawn family (the tree faces): persons from the frames, parents from the LINES */
  const readTree = (svg, floors) => {
    const groups = [...svg.querySelectorAll('g[data-lcs-person]')];
    const persons = groups.map((g) => {
      const fr = g.querySelector('rect[data-lcs-frame]');
      const bt = svg.querySelector(`text[data-lcs-badge-text="${g.dataset.lcsPerson}"]`);
      const disc = svg.querySelector(`circle[data-lcs-disc="${g.dataset.lcsPerson}"]`);
      return { id: g.dataset.lcsPerson, path: g.dataset.lcsPath, sex: g.dataset.lcsSex, age: g.dataset.lcsAge, look: g.dataset.lcsLook, ego: g.hasAttribute('data-lcs-ego'), g, fr,
        x: +fr.getAttribute('x'), y: +fr.getAttribute('y'), w: +fr.getAttribute('width'), h: +fr.getAttribute('height'),
        badge: bt ? +bt.textContent.trim() : null, disc: disc ? { cx: +disc.getAttribute('cx'), cy: +disc.getAttribute('cy'), r: +disc.getAttribute('r') } : null };
    });
    const f = [];
    const byPath = new Map(persons.map((p) => [p.path, p]));
    if (!byPath.has('M') || !byPath.has('F') || !byPath.has('')) f.push('not the conventional structure (M, F and the ego)');
    if (persons.filter((p) => p.ego).length !== 1) f.push('not exactly one ego frame');
    const SEXOF = { M: 'f', F: 'm', Z: 'f', B: 'm', MM: 'f', FM: 'f', MF: 'm', FF: 'm', MZ: 'f', FZ: 'f', MB: 'm', FB: 'm' };
    const cell = {}, rowFill = {};
    for (const p of persons) {
      if (SEXOF[p.path] && SEXOF[p.path] !== p.sex) f.push(`${p.path} drawn as ${p.sex}`);
      const age = GRAND.includes(p.path) ? 'elder' : /^[MF]([ZB])?$/.test(p.path) ? 'adult' : /y$/.test(p.path) ? 'baby' : 'child';
      if (age !== p.age) f.push(`${p.path} drawn as ${p.age}, want ${age}`);
      const fig = p.g.querySelector('svg[data-lcs-figure]');
      if (!fig) f.push(`${p.path}: no figure`);
      else {
        if (fig.dataset.lcsAge !== p.age || fig.dataset.lcsSex !== p.sex) f.push(`${p.path}: the figure stamps disagree with the frame`);
        const fh = fig.height.baseVal.value * (svg.getScreenCTM() ? svg.getScreenCTM().d : 1);
        if (fh < floors.bust - 0.6) f.push(`${p.path}: bust ${fh.toFixed(1)} px < ${floors.bust}`);
      }
      if (p.w < floors.frameW) f.push(`${p.path}: frame ${p.w} wide < ${floors.frameW}`);
      const k = p.age + p.sex + '|' + p.look; if (cell[k]) f.push(`${cell[k]} and ${p.path} share the look ${p.look}`); cell[k] = p.path || 'ego';
      const gar = p.g.querySelector('[data-lcs-garment]'); const fill = gar ? gar.getAttribute('fill').toUpperCase() : null;
      const r = String(p.y); if (rowFill[r] && rowFill[r] !== fill) f.push(`garment fills differ within a generation row (${rowFill[r]} vs ${fill}) — colour could carry sex`); rowFill[r] = rowFill[r] || fill;
    }
    // THE LINES: parents re-derived from the drawn geometry (bar -> drop -> frame)
    const segs = [...svg.querySelectorAll('line[data-lcs-conn]')].map((l) => ({ x1: +l.getAttribute('x1'), y1: +l.getAttribute('y1'), x2: +l.getAttribute('x2'), y2: +l.getAttribute('y2') }));
    const H = [], V = [];
    for (const s of segs) {
      if (Math.abs(s.y1 - s.y2) < 0.6) H.push({ y: s.y1, x1: Math.min(s.x1, s.x2), x2: Math.max(s.x1, s.x2) });
      else if (Math.abs(s.x1 - s.x2) < 0.6) V.push({ x: s.x1, y1: Math.min(s.y1, s.y2), y2: Math.max(s.y1, s.y2) });
      else f.push('a connector is neither horizontal nor vertical');
    }
    const coupleOf = (h) => { const a = persons.find((p) => Math.abs(p.x + p.w - h.x1) < 1 && h.y > p.y && h.y < p.y + p.h); const b = persons.find((p) => Math.abs(p.x - h.x2) < 1 && h.y > p.y && h.y < p.y + p.h); return a && b ? [a.path, b.path] : null; };
    const onH = (x, y) => H.find((h) => Math.abs(h.y - y) < 1 && x >= h.x1 - 1 && x <= h.x2 + 1);
    const sibParents = (h, depth) => { if (depth > 4) return null; const c = coupleOf(h); if (c) return c; const up = V.find((v) => Math.abs(v.y2 - h.y) < 1 && v.x >= h.x1 - 1 && v.x <= h.x2 + 1); if (!up) return null; const hh = onH(up.x, up.y1); return hh ? sibParents(hh, depth + 1) : null; };
    const got = new Map(persons.map((p) => [p.path, []]));
    for (const v of V) {
      const child = persons.find((p) => Math.abs(p.y - v.y2) <= 2 && Math.abs(p.x + p.w / 2 - v.x) <= 2);
      if (!child) { if (!onH(v.x, v.y2)) f.push(`a vertical connector at x ${v.x} ends in the air`); continue; }
      const h = onH(v.x, v.y1);
      const ps = h ? sibParents(h, 0) : null;
      if (ps) got.set(child.path, [...got.get(child.path), ...ps]);
    }
    const graphParents = (path) => (/^(|Z|B|Zy|By)$/.test(path) ? ['M', 'F'] : (path === 'M' || /^M[ZB]$/.test(path)) ? ['MM', 'MF'] : (path === 'F' || /^F[ZB]$/.test(path)) ? ['FM', 'FF'] : []);
    for (const p of persons) {
      const want = graphParents(p.path).filter((q) => byPath.has(q)).sort().join('+');
      const have = [...new Set(got.get(p.path))].sort().join('+');
      if (want !== have) f.push(`the drawn lines give ${p.path || 'ego'} the parents [${have}], the graph says [${want}]`);
    }
    const segIn = (s, b) => (s.y !== undefined ? s.y > b.y + 2 && s.y < b.y + b.h - 2 && Math.min(s.x2, b.x + b.w - 2) - Math.max(s.x1, b.x + 2) > 0.5 : s.x > b.x + 2 && s.x < b.x + b.w - 2 && Math.min(s.y2, b.y + b.h - 2) - Math.max(s.y1, b.y + 2) > 0.5);
    for (const p of persons) for (const s of [...H, ...V]) if (segIn(s, p)) f.push(`a connector runs through ${p.path || 'ego'}'s frame`);
    for (let i = 0; i < persons.length; i++) for (let j = i + 1; j < persons.length; j++) { const a = persons[i], b = persons[j]; if (Math.abs(a.y - b.y) > 0.5) continue; const gap = Math.max(a.x, b.x) - Math.min(a.x + a.w, b.x + b.w); if (gap < 14) f.push(`${a.path || 'ego'} and ${b.path || 'ego'} are ${gap.toFixed(1)} px apart (< 14)`); }
    return { persons, fails: f, H, V, segIn };
  };

  if (mode === 'generations') {
    const rail = root.querySelector('svg[data-lcs-genrail]');
    if (!rail) fails.push('no generation legend');
    else {
      const ranks = [...rail.querySelectorAll('[data-lcs-gen-legend]')];
      if (ranks.length !== 3) fails.push(`${ranks.length} legend frames (want 3)`);
      const AGE = { 1: 'elder', 2: 'adult', 3: 'child' };
      for (const g of ranks) {
        const r = g.dataset.lcsGenLegend;
        const figs = [...g.querySelectorAll('svg[data-lcs-figure]')];
        if (figs.length !== 2 || figs.some((x) => x.dataset.lcsAge !== AGE[r])) fails.push(`legend ${r}: want two ${AGE[r]} figures`);
        if (new Set(figs.map((x) => x.dataset.lcsSex)).size !== 2) fails.push(`legend ${r}: not one f + one m (a sex would attach to a numeral)`);
        const fills = new Set(figs.map((x) => { const gg = x.querySelector('[data-lcs-garment]'); return gg ? gg.getAttribute('fill').toUpperCase() : ''; }));
        if (fills.size !== 1) fails.push(`legend ${r}: two garment fills in one frame — colour could carry sex`);
        const disc = rail.querySelector(`[data-lcs-gen-disc-text="${r}"]`);
        if (!disc || disc.textContent.trim() !== r) fails.push(`legend ${r}: the disc does not read ${r}`);
      }
      if (rail.querySelectorAll('text').length !== 3) fails.push('the legend prints something besides its three numerals');
    }
    const cards = [...root.querySelectorAll('[data-lcs-genword]')];
    const rows = {};
    for (const c of cards) (rows[c.dataset.lcsGenrow] = rows[c.dataset.lcsGenrow] || []).push(c);
    const rowList = Object.values(rows);
    if (rowList.length < 4) fails.push(`${rowList.length} rows`);
    const slotGen = [{}, {}, {}];
    let reverse = 0, side = 0;
    const DIRECT = ['M', 'F', 'Z', 'B', 'MM', 'MF', 'FM', 'FF'];
    const isSide = (wk) => { const ps = Object.keys(kin).filter((p) => kin[p] === wk); return ps.length && ps.every((p) => !DIRECT.includes(p)); };
    for (const row of rowList) {
      if (row.length !== 3) { fails.push(`a row of ${row.length} words`); continue; }
      const gens = row.map((c) => {
        const wk = c.dataset.lcsGenword;
        const chip = c.querySelector('[data-lcs-gen-chip]'), box = c.querySelector('[data-lcs-genbox]');
        if (!words[wk] || !chip || chip.textContent !== words[wk].text) fails.push(`${wk}: printed "${chip && chip.textContent}" ≠ the bank literal`);
        if (!generationOK.includes(wk)) fails.push(`${wk} is not in generationOK`);
        const g = wordGen(wk);
        if (g == null) fails.push(`${wk} names no single generation`);
        if (String(g + 1) !== (box && box.dataset.lcsAnswer)) fails.push(`${wk}: box answer ${box && box.dataset.lcsAnswer} ≠ rank ${g + 1} re-derived from the kin paths`);
        if (box && (box.textContent.trim() || box.children.length)) fails.push(`${wk}: the box prints something`);
        const cr = rect(c), xr = box ? rect(box) : null;
        if (cr.height < FL.G1.element - 0.6) fails.push(`${wk}: placard ${cr.height.toFixed(1)} < ${FL.G1.element}`);
        if (xr && xr.height < FL.G1.element - 0.6) fails.push(`${wk}: box ${xr.height.toFixed(1)} < ${FL.G1.element}`);
        if (chip && chip.scrollWidth > chip.clientWidth + 0.5) fails.push(`${wk}: the word overflows its placard`);
        if (chip) { const lines = Math.round(rect(chip).height / (parseFloat(getComputedStyle(chip).lineHeight) || 20)); if (lines > 2) fails.push(`${wk}: ${lines} lines`); }
        if (c.querySelector('svg[data-lcs-figure], img')) fails.push(`${wk}: a figure beside a word (height / face would carry the order)`);
        return g;
      });
      if (new Set(gens).size !== 3) fails.push(`a row repeats a generation (${gens.join(',')})`);
      if (gens.join('') === '012') fails.push('a row is printed in answer order (1 2 3)');
      if (gens.join('') === '210') reverse++;
      gens.forEach((g, s) => { slotGen[s][g] = (slotGen[s][g] || 0) + 1; });
      if (row.some((c) => isSide(c.dataset.lcsGenword))) side++;
    }
    if (reverse > 1) fails.push(`${reverse} rows in reverse order (at most one)`);
    for (let s = 0; s < 3; s++) for (const [g, n] of Object.entries(slotGen[s])) if (n > Math.ceil(rowList.length / 2)) fails.push(`slot ${s + 1} holds generation ${+g + 1} in ${n} of ${rowList.length} rows (an answer-position tell)`);
    if (side < Math.min(4, rowList.length)) fails.push(`${side} rows carry a sideline word (want >= 4 — "grand-" must not be the only cue)`);
  }

  if (mode === 'trace-words' || mode === 'tree-clues') {
    const stage = root.querySelector('[data-lcs-stage]');
    const svg = stage && stage.querySelector('svg[data-lcs-stage-svg]');
    if (!svg) return fails.concat('no tree');
    const floors = mode === 'trace-words' ? FL.K : FL.G1;
    const T = readTree(svg, floors);
    fails.push(...T.fails);
    const { persons } = T;
    if (mode === 'trace-words') {
      const badged = persons.filter((p) => p.badge != null);
      const bs = badged.map((p) => p.badge).sort((a, b) => a - b);
      if (bs.some((b, i) => b !== i + 1)) fails.push(`badges ${bs.join(',')} are not 1..${bs.length}`);
      if (badged.some((p) => p.ego)) fails.push('the ego carries a badge');
      const gensBy = badged.slice().sort((a, b) => a.badge - b.badge).map((p) => genOf(p.path));
      const mono = gensBy.every((v, i) => !i || v >= gensBy[i - 1]) || gensBy.every((v, i) => !i || v <= gensBy[i - 1]);
      if (mono) fails.push(`badge order is monotone in generation (${gensBy.join('')})`);
      // review round 1: EVERY drawn person but the ego carries a number (no figure with neither number nor word)
      const unnumbered = persons.filter((p) => !p.ego && p.badge == null);
      if (unnumbered.length) fails.push(`${unnumbered.map((p) => p.path).join(', ')} drawn with no number`);
      const rows = [...root.querySelectorAll('[data-lcs-trace-row]')];
      if (rows.length < 4 || rows.length > badged.length) fails.push(`${rows.length} lines for ${badged.length} numbered people (want 4..${badged.length})`);
      const seen = new Set(), rowWords = [];
      for (const r of rows) {
        const n = +r.dataset.lcsBadge;
        const p = badged.find((q) => q.badge === n);
        const lane = r.querySelector('svg[data-lcs-prim="trace-word"]');
        const disc = r.querySelector('[data-lcs-row-disc] text');
        if (!disc || disc.textContent.trim() !== String(n)) fails.push(`row ${n}: its disc does not read ${n}`);
        if (!p || !lane) { fails.push(`row ${n}: no numbered person or no line`); continue; }
        const want = words[kin[p.path]] && words[kin[p.path]].text;
        if (r.dataset.lcsAnswer !== want) fails.push(`row ${n}: the line answers "${r.dataset.lcsAnswer}", person ${n} (${p.path}) is "${want}" — re-derived from the graph`);
        if (lane.dataset.lcsReps !== '0' || !lane.querySelector('[data-lcs-empty-trio]') || lane.querySelector('path')) fails.push(`row ${n}: the numbered line is not an EMPTY trio (a word printed beside its number needs no tree)`);
        if (seen.has(want)) fails.push(`row ${n}: the word ${want} twice`);
        seen.add(want); rowWords.push(want);
        const lr = rect(lane);
        if (lr.height < FL.K.element - 0.6) fails.push(`row ${n}: line ${lr.height.toFixed(1)} px < ${FL.K.element}`);
      }
      const rowsSorted = rows.map((r) => +r.dataset.lcsBadge);
      if (rowsSorted.some((b, i) => i && b <= rowsSorted[i - 1])) fails.push(`lines out of number order (${rowsSorted.join(',')})`);
      // the trace panel: exactly the lines' words, UNNUMBERED, in an order that is no guide to the lines
      const bankEl = root.querySelector('[data-lcs-trace-bank]');
      const lanes = bankEl ? [...bankEl.querySelectorAll('[data-lcs-bank-lane]')] : [];
      const bankWords = lanes.map((l) => l.dataset.lcsText);
      if (!bankEl) fails.push('no trace panel');
      if (bankWords.slice().sort().join('|') !== rowWords.slice().sort().join('|')) fails.push(`the trace panel holds ${bankWords.join('/')} for lines ${rowWords.join('/')}`);
      if (bankEl && /[0-9]/.test(bankEl.textContent)) fails.push('a numeral inside the trace panel');
      const same = bankWords.filter((w, i) => w === rowWords[i]);
      if (same.length) fails.push(`the trace panel puts ${same.join(', ')} level with its own line (the lookup is not needed)`);
      if (bankWords.length > 2 && bankWords.every((w, i) => w === rowWords[rowWords.length - 1 - i])) fails.push('the trace panel is the lines reversed');
      for (const l of lanes) {
        const lane = l.querySelector('svg[data-lcs-prim="trace-word"]');
        if (!lane || lane.dataset.lcsText !== l.dataset.lcsText) { fails.push(`panel word ${l.dataset.lcsText}: no lane`); continue; }
        const trio = lane.querySelector(':scope > g');
        const ls = trio ? [...trio.querySelectorAll('line')].map((q) => +q.getAttribute('y1')) : [];
        const sc = lane.getScreenCTM() ? lane.getScreenCTM().d : 1;
        const glyph = ls.length >= 2 ? (Math.max(...ls) - Math.min(...ls)) * sc : 0;
        if (glyph < 40 - 0.6) fails.push(`panel "${l.dataset.lcsText}" resolves to glyphH ${glyph.toFixed(1)} < 40 (the lane's silent shrink)`);
        if (rect(lane).height < FL.K.element - 0.6) fails.push(`panel "${l.dataset.lcsText}": lane ${rect(lane).height.toFixed(1)} px < ${FL.K.element}`);
      }
      // the stage text: only the ego's name + the badge numerals
      const plate = stage.querySelector('[data-lcs-plate]');
      const allowed = new Set([...(plate ? [plate.textContent.trim()] : []), ...bs.map(String)]);
      for (const t of stage.querySelectorAll('text, [data-lcs-plate]')) { const s = t.textContent.trim(); if (s && !allowed.has(s)) fails.push(`stage text "${s}" is neither the ego name nor a badge`); }
      if (hasLit(stage.textContent).length) fails.push(`a kin word "${hasLit(stage.textContent)[0]}" inside the tree`);
      if (!plate) fails.push('no ego name plate');
    } else {
      // tree-clues
      if (persons.some((p) => p.badge != null)) fails.push('a number disc on the clue tree');
      // review round 1: the older sibling (Z / B) is drawn TALLER than the ego (a clue may say "older brother")
      { const bust = (sel) => { const g = svg.querySelector(sel); const f = g && g.querySelector('svg[data-lcs-figure]');
          return f && f.ownerSVGElement ? f.height.baseVal.value * f.ownerSVGElement.getScreenCTM().d : null; };
        const ob = bust('g[data-lcs-path="Z"], g[data-lcs-path="B"]'), eb = bust('g[data-lcs-ego]');
        if (ob != null && eb != null && !(ob >= eb * 1.12)) fails.push(`the older sibling's bust ${ob.toFixed(1)} px is not taller than the ego's ${eb.toFixed(1)} (want >= 1.12x)`); }
      const sr = rect(stage);
      const plates = [...stage.querySelectorAll('[data-lcs-plate-for]')].map((el) => {
        const r = rect(el);
        return { el, id: el.dataset.lcsPlateFor, path: el.dataset.lcsPlatePath, given: el.hasAttribute('data-lcs-given'), answer: el.dataset.lcsAnswer, text: el.textContent.trim(),
          box: { x: r.left - sr.left, y: r.top - sr.top, w: r.width, h: r.height } };
      });
      if (plates.length !== persons.length) fails.push(`${plates.length} name plates for ${persons.length} people`);
      const egoName = root.dataset.lcsEgoName;
      const nameSex = Object.fromEntries(names.map((n) => [n.name, n.sex]));
      const named = [];
      for (const pl of plates) {
        const p = persons.find((q) => q.id === pl.id);
        if (!p || p.path !== pl.path) { fails.push(`plate ${pl.id} sits on no matching frame`); continue; }
        const nm = pl.given ? pl.text : pl.answer;
        named.push(nm);
        if (nameSex[nm] !== p.sex) fails.push(`the name ${nm} (${nameSex[nm]}) sits on a ${p.sex} plate (${p.path || 'ego'})`);
        if (!pl.given && pl.text) fails.push(`the empty plate ${p.path} prints "${pl.text}"`);
        if (pl.box.h < FL.G1.element - 0.6) fails.push(`plate ${p.path}: ${pl.box.h.toFixed(1)} px < ${FL.G1.element}`);
        const cx = p.x + p.w / 2;
        if (Math.abs(pl.box.x + pl.box.w / 2 - cx) > 1.5 || pl.box.y < p.y + p.h - 0.5) fails.push(`plate ${p.path} is not under its frame`);
        for (const s of [...T.H, ...T.V]) if (T.segIn(s, pl.box)) fails.push(`a connector runs through ${p.path || 'ego'}'s name plate`);
        if (p.ego && (!pl.given || pl.text !== egoName)) fails.push('the ego plate is not the given ego name');
      }
      if (new Set(named).size !== named.length) fails.push('two plates carry the same name');
      const empty = plates.filter((pl) => !pl.given);
      const cells = empty.map((pl) => { const p = persons.find((q) => q.id === pl.id); return p ? p.age + p.sex : '?'; });
      if (new Set(cells).size === cells.length) fails.push('the empty plates hold no same-(age, sex) pair — a name could be placed from the figure alone');
      const clues = [...root.querySelectorAll('[data-lcs-clue-path]')];
      if (clues.length !== empty.length) fails.push(`${clues.length} clues for ${empty.length} empty plates`);
      const ego = names.find((n) => n.name === egoName) || { name: egoName, gen: null };
      const targeted = new Set();
      for (const c of clues) {
        const path = c.dataset.lcsCluePath;
        const wk = kin[path];
        const refs = persons.filter((p) => !p.ego && kin[p.path] === wk);
        if (refs.length !== 1) { fails.push(`clue ${path}: "${wk}" names ${refs.length} people on the tree`); continue; }
        const target = empty.find((pl) => pl.id === refs[0].id);
        if (!target) { fails.push(`clue ${path} targets a GIVEN plate`); continue; }
        if (targeted.has(target.id)) fails.push(`two clues target ${path}`);
        targeted.add(target.id);
        const want = (clueFrames[refs[0].path] || '').replace(/\{egoGen\}/g, ego.gen || '').replace(/\{egoName\}/g, ego.name).replace(/\{name\}/g, target.answer);
        const got = c.querySelector('[data-lcs-clue-text]').textContent;
        if (got !== want) fails.push(`clue ${path}: printed "${got}" ≠ the frame re-filled from the graph "${want}"`);
        for (const pl of plates) if (pl.given && !persons.find((q) => q.id === pl.id).ego && new RegExp(`(?<!\\p{L})${esc(pl.text)}(?!\\p{L})`, 'u').test(got)) fails.push(`clue ${path} names the given ${pl.text}`);
        const cr = rect(c);
        if (c.scrollWidth > c.clientWidth + 0.5 || cr.height > 40) fails.push(`clue ${path} does not fit one line`);
      }
      if (targeted.size !== empty.length) fails.push('an empty plate is the target of no clue');
      const reading = empty.map((pl) => ({ pl, p: persons.find((q) => q.id === pl.id) })).sort((a, b) => a.p.y - b.p.y || a.p.x - b.p.x).map((x) => x.p.path).join(',');
      if (clues.map((c) => c.dataset.lcsCluePath).join(',') === reading) fails.push('the clues run in the tree reading order (an answer-position tell)');
      const st = [...stage.querySelectorAll('svg text')].map((t) => t.textContent.trim()).filter(Boolean);
      if (st.length) fails.push(`text inside the tree svg: ${st.join(',')}`);
      if (hasLit(stage.textContent).length) fails.push(`a kin word "${hasLit(stage.textContent)[0]}" inside the tree`);
    }
  }

  if (mode === 'relation-riddles') {
    if (root.querySelector('g[data-lcs-person]:not([data-lcs-ego])') || root.querySelector('line[data-lcs-conn]')) fails.push('a tree on the riddle page (the child would read the answer off it)');
    const card = root.querySelector('[data-lcs-egocard]');
    const egoName = root.dataset.lcsEgoName;
    const ego = names.find((n) => n.name === egoName);
    if (!ego) fails.push(`the ego name ${egoName} is not a bank name`);
    if (!card || card.querySelector('[data-lcs-plate]').textContent.trim() !== egoName) fails.push('the ego card does not show the ego name');
    const bank = [...root.querySelectorAll('[data-lcs-bank-word]')];
    const bankKeys = bank.map((b) => b.dataset.lcsBankWord);
    if (new Set(bankKeys).size !== bankKeys.length) fails.push('the bank repeats a word');
    for (const b of bank) { const wk = b.dataset.lcsBankWord; if (!words[wk] || b.textContent !== words[wk].text) fails.push(`bank ${wk}: printed "${b.textContent}" ≠ the bank literal`); if (rect(b).height < FL.G2.element - 0.6) fails.push(`bank ${wk}: ${rect(b).height.toFixed(1)} px < ${FL.G2.element}`); }
    const rows = [...root.querySelectorAll('[data-lcs-riddle]')];
    const ans = [];
    for (const r of rows) {
      const slot = r.querySelector('[data-lcs-riddle-path]');
      const path = slot.dataset.lcsRiddlePath;
      const want = kin[path];
      if (slot.dataset.lcsAnswer !== want) fails.push(`riddle ${path}: slot answer ${slot.dataset.lcsAnswer} ≠ kin.${path} = ${want}`);
      if (!bankKeys.includes(want)) fails.push(`riddle ${path}: its answer ${want} is not in the bank`);
      ans.push(want);
      const txt = r.querySelector('[data-lcs-riddle-text]');
      const printed = [...txt.childNodes].filter((n) => n !== slot).map((n) => n.textContent).join('');
      const frame = (riddleFrames[path] || '').replace(/\{egoGen\}/g, ego ? ego.gen || '' : '').replace(/\{egoName\}/g, egoName);
      if (printed.replace(/\s+/g, ' ').trim() !== frame.replace('___', ' ').replace(/\s+/g, ' ').trim()) fails.push(`riddle ${path}: printed "${printed}" ≠ the frame "${frame}"`);
      if (hasLit(printed).includes(words[want].text.toLowerCase())) fails.push(`riddle ${path} prints its own answer`);
      const sr = rect(slot);
      if (sr.height < FL.G2.element - 0.6) fails.push(`riddle ${path}: slot ${sr.height.toFixed(1)} < ${FL.G2.element}`);
      if (slot.textContent.trim()) fails.push(`riddle ${path}: the slot prints something`);
      // the rendered LINES of the riddle: distinct line tops of its text runs (the inline slot sits on one of them)
      const tops = [];
      for (const n of [...txt.childNodes].filter((x) => x.nodeType === 3 && x.textContent.trim())) { const rg = document.createRange(); rg.selectNodeContents(n); for (const rc of rg.getClientRects()) if (rc.width > 1 && !tops.some((t) => Math.abs(t - rc.bottom) < 8)) tops.push(rc.bottom); }
      r.dataset.lcsLines = String(tops.length);
      if (tops.length > 2) fails.push(`riddle ${path} wraps to ${tops.length} lines (> 2)`);
    }
    if (rows.length < 6) fails.push(`${rows.length} riddles`);
    const wrapped = rows.filter((r) => +r.dataset.lcsLines > 1).length;
    if (wrapped > 2) fails.push(`${wrapped} riddles wrap (at most 2)`);
    for (let i = 1; i < ans.length; i++) if (ans[i] === ans[i - 1]) fails.push(`riddles ${i} and ${i + 1} share the answer ${ans[i]} (never adjacent)`);
    // review round 1: EVERY bank word answers at least one riddle on this page (no word left over)
    const unused = bankKeys.filter((k) => !ans.includes(k));
    if (unused.length) fails.push(`bank word(s) ${unused.join(', ')} answer no riddle on the page`);
    void distractors;
    const gs = rows.map((r) => genOf(r.querySelector('[data-lcs-riddle-path]').dataset.lcsRiddlePath));
    if (gs.every((v, i) => !i || v >= gs[i - 1]) || gs.every((v, i) => !i || v <= gs[i - 1])) fails.push('the riddles run grouped by generation (an answer-position tell)');
  }

  if (mode === 'tree-template') {
    const svgs = [...root.querySelectorAll('svg[data-lcs-frame-tree]')];
    if (svgs.length !== 2) fails.push(`${svgs.length} template svgs (want the tree + the shelf)`);
    const inflate = (b, d) => ({ x: b.x - d, y: b.y - d, w: b.w + 2 * d, h: b.h + 2 * d });
    const inB = (x, y, b) => x >= b.x && x <= b.x + b.w && y >= b.y && y <= b.y + b.h;
    const overlap = (a, b) => Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x) > 0.5 && Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y) > 0.5;
    let nMats = 0, nBranches = 0;
    for (const svg of svgs) {
      const mats = [...svg.querySelectorAll('[data-lcs-mat]')].map((m) => { const [x, y, w, h] = m.dataset.lcsBox.split(',').map(Number); return { m, x, y, w, h }; });
      nMats += mats.length;
      for (const m of mats) if (!m.m.hasAttribute('data-lcs-small-mat') && (m.w < 96 - 0.01 || m.h < 96 - 0.01)) fails.push(`a mat ${m.w} x ${m.h} < 96 x 96`);
      // THE RULE: nothing links two mats (no couple bar, no descent line)
      for (const l of [...svg.querySelectorAll('line')].filter((x) => x.ownerSVGElement === svg)) {   // a nested name-line svg has its own coordinates
        const x1 = +l.getAttribute('x1'), y1 = +l.getAttribute('y1'), x2 = +l.getAttribute('x2'), y2 = +l.getAttribute('y2');
        const a = mats.findIndex((m) => inB(x1, y1, inflate(m, 3))), b = mats.findIndex((m) => inB(x2, y2, inflate(m, 3)));
        if (a >= 0 && b >= 0 && a !== b) fails.push('a line joins two mats (it would presume a family shape)');
      }
      if (svg.querySelector('[data-lcs-conn]')) fails.push('a family connector on the template');
      const lines = [...svg.querySelectorAll('svg[data-lcs-nameline]')].map((x) => ({ x: +x.getAttribute('x'), y: +x.getAttribute('y'), w: +x.getAttribute('width'), h: +x.getAttribute('height') }));
      for (const l of lines) if (l.h < FL.G1.element - 0.01) fails.push(`a name line ${l.h} px < ${FL.G1.element}`);
      const branches = [...svg.querySelectorAll('[data-lcs-branch]')];
      nBranches += branches.length;
      for (const br of branches) {
        const pts = (br.dataset.lcsPts || '').split(';').map((q) => q.split(',').map(Number));
        let hit = false;
        for (let i = 1; i < pts.length && !hit; i++) for (let k = 0; k <= 4 && !hit; k++) {
          const t = k / 4, x = pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * t, y = pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * t, w = pts[i - 1][2] + (pts[i][2] - pts[i - 1][2]) * t;
          for (const b of [...mats, ...lines]) if (inB(x, y, inflate(b, w / 2))) { fails.push(`a branch passes through a ${b.m ? 'mat' : 'name line'} at (${x.toFixed(0)}, ${y.toFixed(0)})`); hit = true; break; }
        }
      }
      for (const lf of svg.querySelectorAll('[data-lcs-leaf]')) {
        const [x, y, w, h] = lf.dataset.lcsBox.split(',').map(Number);
        for (const b of [...mats, ...lines]) if (overlap({ x, y, w, h }, b)) { fails.push(`a leaf covers a ${b.m ? 'mat' : 'name line'} at (${x.toFixed(0)}, ${y.toFixed(0)})`); break; }
      }
      const all = [...mats, ...lines];
      for (let i = 0; i < all.length; i++) for (let j = i + 1; j < all.length; j++) if (overlap(all[i], all[j])) fails.push('two frames / name lines overlap');
      for (const m of mats) if (m.m.textContent.trim()) fails.push('a mat prints something');
    }
    if (nMats < 12) fails.push(`${nMats} mats (want >= 12)`);
    if (nBranches < 5) fails.push(`${nBranches} branches — the template does not read as a tree`);
    // review round 1: ONE name line per frame (13 frames over 12 lines left one frame nameless)
    { const nLines = root.querySelectorAll('svg[data-lcs-nameline]').length;
      if (nLines !== nMats) fails.push(`${nMats} frames but ${nLines} name lines (want one line per frame)`); }
    // review round 1: no ORPHAN branch — every branch carries a frame's cord, or joins (end within 14 px) a branch that does
    // (a bare twig reads as a MISSING frame). Measured on the drawn branch points + cord hooks, not on a stamp.
    { const tree = svgs.find((x) => !x.hasAttribute('data-lcs-shelf-svg'));
      if (tree) {
        const brs = [...tree.querySelectorAll('[data-lcs-branch]')].map((br) => (br.dataset.lcsPts || '').split(';').map((q) => q.split(',').map(Number)));
        const hooks = [...tree.querySelectorAll('[data-lcs-cord]')].map((c) => [+c.getAttribute('x1'), +c.getAttribute('y1')]);
        const near = (pts, x, y, tol) => pts.some((q) => Math.hypot(q[0] - x, q[1] - y) <= tol + (q[2] || 0) / 2);
        const bearing = brs.map((pts) => hooks.some(([x, y]) => near(pts, x, y, 3)));
        for (let pass = 0; pass < brs.length; pass++) brs.forEach((pts, i) => {
          if (bearing[i]) return;
          const ends = [pts[0], pts[pts.length - 1]];
          if (brs.some((o, j) => j !== i && bearing[j] && ends.some((e) => near(o, e[0], e[1], 14)))) bearing[i] = true;
        });
        brs.forEach((pts, i) => { if (!bearing[i]) fails.push(`an orphan branch ending at (${pts[pts.length - 1][0].toFixed(0)}, ${pts[pts.length - 1][1].toFixed(0)}) holds no frame (it reads as a missing one)`); });
      } }
    // the ONLY text: meWord; no kin literal, no forbidden word anywhere on the page body
    const texts = [...root.querySelectorAll('text')].map((t) => t.textContent.trim()).filter(Boolean);
    if (texts.length !== 1 || texts[0] !== meWord) fails.push(`the template prints ${JSON.stringify(texts)} (want only "${meWord}")`);
    const allText = root.textContent;
    if (hasLit(allText).length) fails.push(`a kin word "${hasLit(allText)[0]}" on the template`);
    for (const f of forbidden) if (new RegExp(`(?<!\\p{L})${esc(f)}(?!\\p{L})`, 'iu').test(allText)) fails.push(`the template prints "${f}"`);
  }
  return fails;
}

const TYPE = {
  id: ID,
  slug: KEY,
  gradeBand: 'K',
  assetClass: 'geometry',
  exerciseType: KEY,
  themeAxis: { applicable: false },
  unitAxis: { applicable: false },
  difficulty: {
    1: { mode: 'base', grand: false, baby: false, frame: [120, 138], chipPx: 24, register: 'K' },
    2: { mode: 'base', grand: true, baby: false, frame: [108, 126], chipPx: 22, register: 'K', fillGap: 40 },
    3: { mode: 'base', grand: true, baby: true, frame: [96, 110], chipPx: 22, register: 'K' },
  },
  i18n: {
    en: {
      title: 'Family Members: Who Is Who?',   // plain spaces: page.css .ws-title text-wrap:balance prevents the orphaned "Who?" (NBSPs would leak into every SEO surface)
      instruction: 'Find each person on the family tree and write their number in the box next to their family word.',
    },
  },
  FACE_MODES,
  assertConventional,
  uniqueReferents,

  build({ difficulty, locale }, ctx) {
    const loc = (locale || 'en').slice(0, 2);
    const d = this.difficulty[difficulty];
    if (!d) throw new Error(`${ID}: no difficulty ${difficulty}`);
    return this._buildWith(loadBank(KEY, loc), d, { locale: loc }, ctx);
  },

  /** the family graph for a resolved config (seeded, locale-neutral) */
  _compose(d, rng) {
    const grandSide = d.grand ? (rng.next() < 0.5 ? 'M' : 'F') : null;
    const egoSex = rng.pick(['f', 'm']);
    const sibSex = rng.pick(['f', 'm']);
    const babySex = d.baby ? rng.pick(['f', 'm']) : null;
    const persons = [
      { path: 'M', sex: 'f', age: 'adult' },
      { path: 'F', sex: 'm', age: 'adult' },
    ];
    if (grandSide) persons.push({ path: grandSide + 'M', sex: 'f', age: 'elder' }, { path: grandSide + 'F', sex: 'm', age: 'elder' });
    // F3 (tree-clues): the grandSide parent's sibling — a face-only draw, AFTER every base draw, so the base sequence is untouched
    if (d.sideline) {
      if (!grandSide) throw new Error(`${ID}: a sideline aunt / uncle needs the grandparents drawn`);
      const sideSex = rng.pick(['f', 'm']);
      persons.push({ path: grandSide + (sideSex === 'f' ? 'Z' : 'B'), sex: sideSex, age: 'adult' });
    }
    const kids = [{ path: '', sex: egoSex, age: 'child' }, { path: sibSex === 'f' ? 'Z' : 'B', sex: sibSex, age: 'child' }];
    if (babySex) kids.push({ path: babySex === 'f' ? 'Zy' : 'By', sex: babySex, age: 'baby' });
    persons.push(...rng.shuffle(kids));
    // looks: no two people of one (age, sex) cell share a look
    const cells = {};
    for (const p of persons) (cells[p.age + '|' + p.sex] = cells[p.age + '|' + p.sex] || []).push(p);
    for (const [k, ps] of Object.entries(cells)) {
      const [age, sex] = k.split('|');
      const looks = rng.sample(FF.lookIds(age, sex), ps.length);
      ps.forEach((p, i) => { p.look = looks[i]; });
    }
    // garment tint: ONE seeded tint per generation row, shared by everyone in it (a grand couple, the parents,
    // the children), so a fill can never carry sex (coordinator review 2026-09-23: the look-bound tints put the
    // grandmother alone in coralSoft). The look's own default tint is ignored on this page.
    // a SEPARATE rng stream: a cosmetic draw must never shift the answer draws (badges, word order) that follow
    const rowTint = makeRng(String(rng.seed) + '|garment').shuffle(TINTS);
    for (const p of persons) p.tint = rowTint[FT.genOf(p.path)];
    persons.forEach((p, i) => { p.id = 'p' + i; });
    return { persons, grandSide, egoSex };
  },

  /** The whole build over an INJECTED bank block + resolved config (the gate's poison seam). */
  _buildWith(bankLoc, d, { locale }, ctx, over = {}) {
    if (!bankLoc || typeof bankLoc !== 'object' || !bankLoc.kin || !bankLoc.words) throw new Error(`${ID}: the ${locale} bank block carries no kin / words`);
    if (!d || typeof d !== 'object') throw new Error(`${ID}: no difficulty config`);
    // the config guard (PR7): only the base is built — a face config fed to the base never renders the base
    if (d.mode !== 'base') {
      // the five faces are CODE faces on this ONE knob (Phase E); a face config never renders the base
      if (FACE_MODES.includes(d.mode)) return this._buildFace(bankLoc, d, { locale }, ctx, over);
      throw new Error(`${ID}: unknown mode "${d.mode}"`);
    }
    const [fw, fh] = d.frame || [];
    if (!(fw >= K_FRAME_W)) throw new Error(`${ID}: frame ${fw} wide < the K floor ${K_FRAME_W}`);
    if (!(Math.round(fh * 0.8) >= K_BUST)) throw new Error(`${ID}: frame ${fh} high draws a ${Math.round(fh * 0.8)} px bust < ${K_BUST}`);
    const rng = ctx.rng;
    const comp = over.compose ? over.compose(d, rng) : this._compose(d, rng);
    const { persons } = comp;
    assertConventional(persons);
    const kin = bankLoc.kin;
    const nonEgo = persons.filter((p) => p.path !== '');
    // the asked words: every non-ego person (5 at d2); a path the locale leaves unmapped REFUSES
    const asked = nonEgo.map((p) => {
      const wk = kin[p.path];
      if (!wk) throw new Error(`${ID}: ${locale} kin has no entry for path "${p.path}" (refuse, never pad)`);
      return { person: p, wordKey: wk, word: literal(bankLoc, wk, locale) };
    });
    const regs = new Set(asked.map((a) => a.word.register));
    if (regs.size !== 1 || !regs.has(d.register)) throw new Error(`${ID}: ${locale} words on one page mix registers ${[...regs].join('/')} (want one: ${d.register})`);
    const uf = uniqueReferents(persons, kin, asked.map((a) => a.wordKey));
    if (uf.length) throw new Error(`${ID}: ${locale} ${uf.join('; ')}`);
    // badges 1..N, redrawn until the generations read by badge are NOT monotone (no "1 = grandma" habit)
    const N = nonEgo.length;
    let badges = null;
    for (let t = 0; t < TRIES && !badges; t++) {
      const nums = rng.shuffle(Array.from({ length: N }, (_, i) => i + 1));
      const gens = nonEgo.map((p, i) => ({ g: FT.genOf(p.path), n: nums[i] })).sort((a, b) => a.n - b.n).map((x) => x.g);
      if (!monotone(gens)) badges = Object.fromEntries(nonEgo.map((p, i) => [p.id, nums[i]]));
    }
    if (!badges) throw new Error(`${ID}: no non-monotone badge order in ${TRIES} tries`);
    if (over.badges) badges = over.badges(nonEgo, badges);
    // ego name: the seed's index into the locale's names of the ego's sex
    const ego = persons.find((p) => p.path === '');
    const pool = (bankLoc.names || []).filter((n) => n.sex === ego.sex);
    if (pool.length < 6) throw new Error(`${ID}: ${locale} has ${pool.length} ${ego.sex} names (>= 6)`);
    const egoName = pool[rng.int(0, pool.length - 1)].name;
    // the stage
    const stage = C5.familyStage({ persons, frame: { w: fw, h: fh }, badges, egoId: ego.id, egoName, skin: d.skin || 'tree', w: BODY_W });
    const reading = stage.tree.nodes.filter((n) => badges[n.id] != null).sort((a, b) => a.row - b.row || a.cx - b.cx).map((n) => badges[n.id]);
    // word order: a shuffle until the answer column is no run and differs from the reading order
    let order = null;
    for (let t = 0; t < TRIES && !order; t++) {
      const o = rng.shuffle(asked);
      const seq = o.map((a) => badges[a.person.id]);
      if (hasRun(seq)) continue;
      if (seq.join(',') === reading.join(',')) continue;
      order = o;
    }
    if (!order) throw new Error(`${ID}: no admissible word order in ${TRIES} tries`);
    const rows = order.map((a) => ({ wordKey: a.wordKey, text: a.word.text, answer: badges[a.person.id] }));
    const block = C5.kinWordBlock({ rows, px: d.chipPx, chipW: 196, boxW: 64, boxH: K_ELEMENT });
    const blockH = Math.ceil(rows.length / 2) * K_ELEMENT + (Math.ceil(rows.length / 2) - 1) * 8;
    const stackH = stage.height + STAGE_GAP + blockH;
    if (stackH > STACK_MAX) throw new Error(`${ID}: stack ${stackH} px > ${STACK_MAX} (the 677 chrome)`);
    const bodyHtml = `<div class="fam-page" data-ws-content="" data-lcs-family="" data-lcs-type="${ID}" data-lcs-mode="base" data-lcs-locale="${locale}"` +
      ` data-lcs-grand-side="${comp.grandSide || ''}" data-lcs-reading="${reading.join(',')}" data-lcs-stack="${stackH}"` +
      ` style="display:flex;flex-direction:column;justify-content:flex-start;height:100%;width:${BODY_W}px;margin:0 auto">` +
      `<div style="flex:0 0 auto">${stage.html}</div>${d.fillGap ? spacer(STAGE_GAP, d.fillGap) : `<div style="flex:0 0 ${STAGE_GAP}px"></div>`}<div style="flex:0 0 auto">${block}</div></div>`;
    return {
      bodyHtml,
      meta: { mode: 'base', grandSide: comp.grandSide, egoName, people: persons.length, asked: rows.map((r) => r.wordKey), answers: rows.map((r) => r.answer), reading, stackH, stageH: stage.height },
    };
  },

  /**
   * THE FIVE FACES (Phase E; design §3). One knob, `mode`; every face reads the SAME bank
   * block through the same literal() door and re-derives every answer from the kinship
   * graph. Each returns the family root (data-lcs-mode = data-lcs-face = the mode) packed
   * to the top (the SPARSE rule: slack falls below the last block).
   */
  _buildFace(bankLoc, d, { locale }, ctx, over = {}) {
    const rng = ctx.rng;
    const fn = { generations: faceGenerations, 'trace-words': faceTraceWords, 'tree-clues': faceTreeClues, 'relation-riddles': faceRiddles, 'tree-template': faceTemplate }[d.mode];
    const out = fn.call(this, bankLoc, d, locale, rng, over);
    if (out.stackH > STACK_MAX) throw new Error(`${ID}: ${d.mode} stack ${out.stackH} px > ${STACK_MAX} (the 677 chrome)`);
    const bodyHtml = `<div class="fam-page" data-ws-content="" data-lcs-family="" data-lcs-type="${ID}" data-lcs-mode="${d.mode}" data-lcs-face="${d.mode}" data-lcs-locale="${locale}"` +
      ` data-lcs-stack="${out.stackH}"${out.rootAttrs || ''} style="display:flex;flex-direction:column;justify-content:flex-start;height:100%;width:${BODY_W}px;margin:0 auto">` +
      out.blocks.map((b, i) => (i ? spacer(out.gaps[i - 1], (out.gapMax || [])[i - 1]) : '') +
        `<div data-lcs-block="${i}" style="${(out.blockStyles || [])[i] || 'flex:0 0 auto'}">${b}</div>`).join('') + `</div>`;
    return { bodyHtml, meta: { mode: d.mode, stackH: out.stackH, stackMax: out.stackMax || out.stackH, ...out.meta } };
  },

  async verify(page) {
    const info =await page.evaluate((ID) => { const r = document.querySelector(`[data-lcs-family][data-lcs-type="${ID}"]`); return r ? { loc: r.dataset.lcsLocale, mode: r.dataset.lcsMode } : null; }, ID);
    if (!info || !info.loc) return [`${ID}: no family root`];
    const loc = info.loc;
    let b;
    try { b = loadBank(KEY, loc); } catch (e) { return [`${ID}: ${e.message}`]; }
    if (info.mode && info.mode !== 'base') return page.evaluate(browserVerifyFace, faceVerifyData(b, info.mode));
    return page.evaluate(browserVerify, { kin: b.kin, words: b.words, ID, K: { element: K_ELEMENT, bust: K_BUST, frameW: K_FRAME_W } });
  },
};
TYPE._browserVerify = browserVerify;

module.exports = TYPE;
