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
 * PHASE 2: the five faces are CODE faces on the `mode` knob (generations ·
 * trace-words · tree-clues · relation-riddles · tree-template); build() THROWS
 * on any mode other than 'base' until they are built, so a face config fed to
 * the base never renders the base under a face's name.
 */
'use strict';
const { bank: loadBank } = require('../../lib/b5-common.js');
const C5 = require('../../templates/components-b5.js');
const FT = require('../../primitives/family-tree.js');
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
    2: { mode: 'base', grand: true, baby: false, frame: [104, 120], chipPx: 22, register: 'K' },
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
      if (FACE_MODES.includes(d.mode)) throw new Error(`${ID}: mode "${d.mode}" is a Phase-2 face and is not built yet`);
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
      `<div style="flex:0 0 auto">${stage.html}</div><div style="flex:0 0 ${STAGE_GAP}px"></div><div style="flex:0 0 auto">${block}</div></div>`;
    return {
      bodyHtml,
      meta: { mode: 'base', grandSide: comp.grandSide, egoName, people: persons.length, asked: rows.map((r) => r.wordKey), answers: rows.map((r) => r.answer), reading, stackH, stageH: stage.height },
    };
  },

  async verify(page) {
    const loc = await page.evaluate((ID) => { const r = document.querySelector(`[data-lcs-family][data-lcs-type="${ID}"]`); return r ? r.dataset.lcsLocale : null; }, ID);
    if (!loc) return [`${ID}: no family root`];
    let b;
    try { b = loadBank(KEY, loc); } catch (e) { return [`${ID}: ${e.message}`]; }
    return page.evaluate(browserVerify, { kin: b.kin, words: b.words, ID, K: { element: K_ELEMENT, bust: K_BUST, frameW: K_FRAME_W } });
  },
};
TYPE._browserVerify = browserVerify;

module.exports = TYPE;
