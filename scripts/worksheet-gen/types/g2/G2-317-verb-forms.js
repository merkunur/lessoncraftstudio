/**
 * G2-317 — Verb Forms (nt20-C; family key `verb-forms`; G2 in en de fr it es
 * nl da no, G3 in pt sv fi; en base L.1.1.c + L.2.1.d, the national framework
 * NAME elsewhere). Design: docs/worksheet-gen/b3-designs/G2-317-verb-forms.md
 * §2/§5.
 *
 * "One verb, all its people." A conjugation table with an ACTION picture and
 * the infinitive as the only model; some rows printed (givens), the rest
 * dashed coral boxes the child fills; under it three sentence lanes use the
 * SAME verbs with a gap, so the table is applied at once. The column axis is
 * DATA (`bank.mode`): 'persons' (de fr it es pt nl fi — two 330 px tables side
 * by side, one row per pronoun) or 'tense' (en sv da no — ONE 675 px table,
 * six pictured verbs × [present · past]). The answer is never printed.
 *
 * THEMELESS (README ruling): the verbs are a panel bank
 * (data/b3/verb-forms.js); the cue is a fixed per-verb `pic:{theme,noun}` from
 * the design's 9-picture ALLOWLIST (activities/{running reading jumping
 * dancing hiking writing baking} + occupations/{singer artist}), resolved
 * through lib/b3-picture-index.js (colour index candidates only — a pinned
 * picture the index does not carry for that key is a REFUSAL). The UNIT is the
 * unit axis (lib/unit-axis.js): `build()` renders `unit || bank.exemplar`; a
 * `kind:'tense'` unit swaps `forms[unit]`, a `kind:'group'` unit filters the
 * pool by `verb.group`. nt20-C ships exemplars only.
 *
 * Difficulty is a CONFIG; every guard keys on the RESOLVED keys, never the
 * level index:
 *   tables / verbsPerPage   persons-mode tables (1 | 2), one verb each
 *   given / minHardGaps     persons: givens per table = min(given,
 *                           nonAnchorRows − minHardGaps); every table keeps
 *                           >= minHardGaps hard gaps or the page is refused
 *   pool                    'regular' | 'all' (the bank's `poolMap` may remap
 *                           the NAME per locale: en regular → all, L.2.1.d)
 *   lanes / laneMode / hint sentence lanes under the table(s); hint = the
 *                           infinitive in a `.ws-nchip`
 *   pic / rowH / boxW / boxH / pronounW / tableW   persons-table geometry
 *   tenseRows / tenseGaps / gapCols / minPerRow / minPerCol   tense mode:
 *                           six verbs × two columns, `tenseGaps` gaps drawn
 *                           from `gapCols` with >= minPerRow per row and
 *                           >= minPerCol per column; the rest printed
 *   items                   the item window (gaps + lanes): [8,16] = the G23
 *                           density at d2/d3; d1 [4,16] — the design's d1
 *                           ladder (one table, 3 givens, 2 lanes) yields 4-5
 *                           items in persons mode, a deliberate entry rung
 *   laneMin / laneMax       the lane row floor / cap (px) — the lanes are a
 *                           grid `repeat(N, minmax(laneMin, 1fr))` that takes
 *                           the chrome's slack FIRST (up to laneMax each); the
 *                           table rows (`flex:1 0 rowH`) share what is left
 *   tenseIcon               the tense-table row picture (56 / 44; >= 36)
 * build() reads ONLY data/b3/verb-forms.js (lib/b3-common.js bank) + the
 * picture index; never image-vocabulary.js or word-classes.js at render.
 *
 * Anchor + given rules (design §2, the pedagogy's data rules): a cell whose
 * form equals ANY printed text on its own table (the infinitive, a given) is
 * an ANCHOR — printed, never gapped, never counted as a given; a given's text
 * never equals a gap's form; no verb twice on a page; lanes use a tabled verb
 * at a gapped or given column, never an anchor; the lane text never contains
 * its form and its hint never equals it.
 *
 * Chrome budget (MEASURED by the gate: a 3-line title + a 3-line instruction
 * leave 710 px of body — the README's 722 is optimistic): persons d2 = 364 +
 * 16 + 3 × 96 + 24 = 692 · tense = 360 + 16 + 3 × 96 + 24 = 688 · d1 persons =
 * 84 + 6 × 52 + 4 = 400 + 16 + 2 × 96 + 12 = 620. A taller body opens in the
 * lanes first (up to laneMax each), then in the table rows.
 *
 * Answer hiding + stamps: root `[data-ws-content][data-lcs-vf]` with
 * data-lcs-face="base" -mode -unit -tables -lanes -minhard -tensegaps
 * -minperrow -minpercol; table data-lcs-table data-lcs-verb data-lcs-inf
 * (tense: per row); cell data-lcs-col data-lcs-cell="given|gap|anchor"
 * data-lcs-form (+ data-lcs-hard="1" on gaps, which print NOTHING); lane
 * data-lcs-lane data-lcs-verb data-lcs-col data-lcs-form data-lcs-frame.
 * verify(page) re-checks every rule above from the stamps; it never inflects.
 * The node gate (qa/verify-b3-verb-forms.js) re-derives every stamped form
 * from bank.verbs[inf].forms[unit][col] — diff, not trust.
 *
 * PHASE 2 — the five faces (design §3; tools/b3var-rows/verb-forms.js; record
 * _work/G2-317-faces.md). Additive knobs on the RESOLVED config, dispatched in
 * `_buildWith` BEFORE the base path consumes the RNG, so the base's default
 * output stays byte-identical (tools/b3-baseline.js):
 *   match:true (G2-334)   `_buildMatch` — draw a line to the form. The KIND is
 *                         the bank's: tense (en sv da no) = ONE block, mTense.verbs
 *                         infinitives (pictured first, >= mTense.pictured) → 2n
 *                         forms = the PAST (target) + the PRESENT (distractor) of
 *                         each, shuffled into a DERANGEMENT (no verb level with
 *                         its own past; verbs whose past is the infinitive are
 *                         excluded); persons = mPersons.verbs pictured `match
 *                         !== false` regular blocks side by side (pronoun → form,
 *                         a derangement) + mPersons.lanes lanes; stack
 *                         (matchPersons < mStack.minPersons, nl) = mStack.verbs
 *                         full-width blocks, no lanes.
 *   tables:0, lanes:N (G2-335)  `_buildSentences` — N gap lanes over N DISTINCT
 *                         verbs (>= `pictured` pictured), the infinitive chip, no table.
 *   pool:'irregular' (G2-336)   the BASE composer over bank.irregularCore
 *                         (`poolFor` → core:true; chip-only headers; the persons
 *                         floor is d.tables, not 3). Stamps data-lcs-face="irregular"
 *                         data-lcs-pool="irregular"; verify() drops the picture rules.
 *   choice:true (G2-337)  `_buildChoice` — `rows` gap sentences × `candidates`
 *                         printed forms of the SAME verb's paradigm (tense: inf /
 *                         pres / past; persons: the unit's person forms; verbs
 *                         with fewer distinct forms are F5-excluded); the frame
 *                         prints none of them; the correct pill's index covers
 *                         every position over the page (data-lcs-idx).
 *   hunt:true (G2-338)    `_buildHunt` — `rows` sentences printed WHOLE with the
 *                         conjugated form inside (render 'text', never the
 *                         infinitive itself, no other bank form, no
 *                         hunt.nounHomographs token) + a dashed `infBox` for the
 *                         infinitive (data-lcs-inf).
 * Shared: `withForms` (a picture optional), `paradigmOf`, `pickRows` (distinct
 * verbs + frames, a (verb, col) whose form ≠ the infinitive, the frame text free
 * of `banned(verb, form)` tokens, pictured verbs drawn first with a varying
 * count >= minPictured). Rows / lanes are `_laneGrid` grids (minmax(min, 1fr))
 * that take the chrome's slack. verify(page) dispatches on data-lcs-face to
 * VERIFY_FACE (below) for match / sentences / choice / hunt.
 */
'use strict';
const { bank: loadBank } = require('../../lib/b3-common.js');
const { candidates } = require('../../lib/b3-picture-index.js');
const { fileUri } = require('../../lib/b2-common.js');
const { slotsIn } = require('../../lib/b3-instructions.js');
const { verbTable, sentenceGap, matchBlock } = require('../../templates/components-b3.js');

const KEY = 'verb-forms';
const ID = 'G2-317';
const BODY_W = 675;
const TABLE_GAP = 15;
const STACK_GAP = 16;
const LANE_GAP = 12;
const TENSE_ROW_H = 52;
const TENSE_LABEL_W = 199;
const TENSE_COL_W = 220;
const TENSE_BOX_W = 206;    // the tense form column is 220 whatever the level; the box stays 206 (design §2)
const MAX_TRIES = 200;
const BW_MARK = /(^|\s|_)(bw|sw|bn|nb|zw|sh|pb|mv|sv)$/i;

function fold(s) { return String(s).trim().toLocaleLowerCase(); }
function tokens(s) { return fold(s).split(/[^\p{L}']+/u).filter(Boolean); }

/** The unit record; throws on an unknown unit. */
function unitOf(bank, key) {
  const u = (bank.units || []).find((x) => x.key === key);
  if (!u) throw new Error(`${ID}: unit "${key}" is not in the bank (units: ${(bank.units || []).map((x) => x.key).join(',')})`);
  return u;
}

/**
 * The resolved pool name + predicate for a config pool NAME (the bank may remap
 * it). `irregular` (Face 4, Phase 2) is the bank's `irregularCore` — every verb
 * of it, chip-only headers (`core:true`); the base's default pools never set it.
 */
function poolFor(bank, name) {
  if (name === 'irregular') return { name: 'irregular', pred: () => true, core: true };
  const resolved = (bank.poolMap && bank.poolMap[name]) || name;
  const preds = {
    all: () => true,
    regular: (v) => !v.irregular && !v.gradation,
    weak: (v) => !v.irregular,
    noGradation: (v) => !v.gradation,
  };
  if (!preds[resolved]) throw new Error(`${ID}: pool "${resolved}" is unknown (all|regular|weak|noGradation)`);
  return { name: resolved, pred: preds[resolved] };
}

/** The pinned picture's src, or throws — a verb with `pic` must resolve through the colour index. */
function pictureOf(v, loc) {
  const p = v.pic;
  if (!p) return null;
  if (BW_MARK.test(p.theme)) throw new Error(`${ID}: "${v.inf}" pins a B&W theme "${p.theme}" — refuse`);
  const ok = candidates(p.noun, loc).some((c) => c.theme === p.theme && c.noun === p.noun);
  if (!ok) throw new Error(`${ID}: picture ${p.theme}/${p.noun} on "${v.inf}" is not a colour-index candidate in ${loc} — refuse`);
  return fileUri(p.theme, p.noun);
}

/** Every verb of (bank, unit, pool) with every form of the unit — a picture OPTIONAL (the faces' pool; `pool.core` = the irregularCore) — PURE. */
function withForms(bank, unit, pool) {
  const cols = bank.columns.map((c) => c.key);
  const src = pool.core ? (bank.irregularCore || []) : (bank.verbs || []);
  return src.filter((v) => {
    if (!pool.pred(v)) return false;
    if (unit.kind === 'group' && v.group !== unit.key) return false;
    const f = v.forms && v.forms[unit.key];
    return !!f && cols.every((c) => typeof f[c] === 'string' && f[c].length > 0);
  });
}

/** The verbs of (bank, unit, pool) that carry a picture and every form of the unit — PURE (the core pool is chip-only: no picture asked). */
function eligible(bank, unit, pool) {
  return withForms(bank, unit, pool).filter((v) => pool.core || !!v.pic);
}

/** The distinct forms a Face-5 pill may show for a verb: the unit's forms (+ the infinitive in tense mode) — the "paradigm". */
function paradigmOf(bank, unit, v) {
  const out = [];
  const seen = new Set();
  const push = (s) => { const k = fold(s); if (!seen.has(k)) { seen.add(k); out.push(s); } };
  if (bank.mode === 'tense') push(v.inf);
  for (const c of bank.columns) push(v.forms[unit.key][c.key]);
  return out;
}

/**
 * Faces 3/5/6: `n` rows over `verbs` — DISTINCT verbs, DISTINCT frames, a
 * (verb, col) whose form is not the infinitive, a frame of that col fitting
 * the verb whose text carries none of `banned(verb, form)` as a token; the
 * pictured verbs are drawn first (k of them, k >= minPictured, k varies so
 * the verb set is not constant), the rest from the unpictured. Rows are
 * shuffled. null when no page satisfies every rule.
 */
function pickRows(rng, bank, unit, verbs, n, { minPictured = 0, banned = (v, form) => [form] } = {}) {
  const frames = (bank.frames || []).filter((f) => f.unit === unit.key);
  const cols = bank.columns.map((c) => c.key);
  const pictured = verbs.filter((v) => v.pic), plain = verbs.filter((v) => !v.pic);
  if (verbs.length < n) return null;
  const kMax = Math.min(n, pictured.length), kMin = Math.min(Math.max(minPictured, n - plain.length), kMax);
  if (kMin > kMax || kMax < minPictured) return null;
  for (let t = 0; t < MAX_TRIES; t++) {
    const k = rng.int(kMin, kMax);
    const chosen = [...rng.sample(pictured, k), ...rng.sample(plain, n - k)];
    const used = new Set();
    const rows = [];
    for (const v of chosen) {
      const forms = v.forms[unit.key];
      let row = null;
      for (const col of rng.shuffle(cols)) {
        const form = forms[col];
        if (fold(form) === fold(v.inf)) continue;
        const ban = new Set(banned(v, form).map(fold));
        const fit = frames.filter((f) => f.col === col && f.fits.some((x) => fold(x) === fold(v.inf)) && !used.has(f.id) && !tokens(f.text).some((w) => ban.has(w)));
        if (!fit.length) continue;
        row = { verb: v, col, form, frame: rng.pick(fit) };
        break;
      }
      if (!row) break;
      used.add(row.frame.id);
      rows.push(row);
    }
    if (rows.length !== n) continue;
    if (rows.filter((r) => r.verb.pic).length < minPictured) continue;
    return rng.shuffle(rows);
  }
  return null;
}

/**
 * Persons mode: the cell plan of one verb. Anchors = rows whose form equals
 * the infinitive or a chosen given's form; givens sampled among the
 * non-anchor rows; the rest are hard gaps. Retries the given set until every
 * rule holds; null when the verb cannot make the config's floors.
 */
function planPersons(rng, bank, unit, verb, d) {
  const cols = bank.columns;
  const forms = verb.forms[unit.key];
  const inf = fold(verb.inf);
  const rows = cols.map((c) => ({ key: c.key, label: (verb.labelOverride && verb.labelOverride[c.key]) || c.label, form: forms[c.key] }));
  const infAnchors = rows.filter((r) => fold(r.form) === inf);
  const nonAnchor = rows.filter((r) => fold(r.form) !== inf);
  const givenN = Math.max(0, Math.min(d.given, nonAnchor.length - d.minHardGaps));
  if (nonAnchor.length < d.minHardGaps) return null;
  for (let t = 0; t < MAX_TRIES; t++) {
    const givens = givenN ? rng.sample(nonAnchor, givenN) : [];
    const givenForms = new Set(givens.map((g) => fold(g.form)));
    const anchors2 = nonAnchor.filter((r) => !givens.includes(r) && givenForms.has(fold(r.form)));
    const gaps = nonAnchor.filter((r) => !givens.includes(r) && !anchors2.includes(r));
    if (gaps.length < d.minHardGaps) continue;
    const printed = new Set([inf, ...givens.map((g) => fold(g.form)), ...infAnchors.map((a) => fold(a.form)), ...anchors2.map((a) => fold(a.form)), ...rows.map((r) => fold(r.label))]);
    if (gaps.some((g) => printed.has(fold(g.form)))) continue;
    const state = new Map();
    givens.forEach((r) => state.set(r.key, 'given'));
    [...infAnchors, ...anchors2].forEach((r) => state.set(r.key, 'anchor'));
    gaps.forEach((r) => state.set(r.key, 'gap'));
    return rows.map((r) => ({ key: r.key, label: r.label, cells: [{ col: r.key, form: r.form, state: state.get(r.key) }] }));
  }
  return null;
}

/**
 * Tense mode: the cell plan of `rows` verbs × two columns. Anchors = cells
 * whose form equals the infinitive (never gapped); `tenseGaps` gaps drawn
 * from `gapCols` with >= minPerRow per row and >= minPerCol per column; the
 * remaining cells are givens; no given form equals a gap form.
 */
function planTense(rng, bank, unit, verbs, d) {
  const cols = bank.columns.map((c) => c.key);
  const cells = [];
  verbs.forEach((v, ri) => cols.forEach((c) => {
    const form = v.forms[unit.key][c];
    cells.push({ ri, col: c, form, anchor: fold(form) === fold(v.inf) });
  }));
  const gappable = cells.filter((c) => !c.anchor && d.gapCols.includes(c.col));
  if (gappable.length < d.tenseGaps) return null;
  for (let t = 0; t < MAX_TRIES; t++) {
    const chosen = new Set();
    // >= minPerRow per row first
    let ok = true;
    for (let ri = 0; ri < verbs.length && ok; ri++) {
      const own = gappable.filter((c) => c.ri === ri);
      // gapOrder 'first': the row's mandatory gap is the FIRST column of gapCols it can gap
      // (d1: the past preferred, the present only where the past is an anchor); 'random' otherwise
      const mine = d.gapOrder === 'first' ? d.gapCols.map((col) => own.find((c) => c.col === col)).filter(Boolean) : rng.shuffle(own);
      if (mine.length < d.minPerRow) { ok = false; break; }
      mine.slice(0, d.minPerRow).forEach((c) => chosen.add(c));
    }
    if (!ok) return null;
    // then >= minPerCol per column
    for (const col of cols) {
      const have = [...chosen].filter((c) => c.col === col).length;
      const more = rng.shuffle(gappable.filter((c) => c.col === col && !chosen.has(c))).slice(0, Math.max(0, d.minPerCol - have));
      more.forEach((c) => chosen.add(c));
    }
    if (chosen.size > d.tenseGaps) continue;
    // fill to tenseGaps
    for (const c of rng.shuffle(gappable)) { if (chosen.size >= d.tenseGaps) break; chosen.add(c); }
    if (chosen.size !== d.tenseGaps) continue;
    const gapForms = new Set([...chosen].map((c) => fold(c.form)));
    const printed = new Set([...cells.filter((c) => !chosen.has(c)).map((c) => fold(c.form)), ...verbs.map((v) => fold(v.inf)), ...bank.columns.map((c) => fold(c.label))]);
    if ([...gapForms].some((f) => printed.has(f))) continue;
    for (const col of cols) if ([...chosen].filter((c) => c.col === col).length < d.minPerCol) { ok = false; }
    if (!ok) continue;
    return verbs.map((v, ri) => ({
      key: v.inf, label: v.inf, src: null, verb: v,
      cells: cols.map((c) => { const cell = cells.find((x) => x.ri === ri && x.col === c); return { col: c, form: cell.form, state: cell.anchor ? 'anchor' : chosen.has(cell) ? 'gap' : 'given' }; }),
    }));
  }
  return null;
}

/** The (verb, col) slots a lane may use: gapped or given cells, never anchors. */
function laneSlots(tables) {
  const out = [];
  for (const t of tables) for (const r of t.rows) for (const c of r.cells) if (c.state !== 'anchor') out.push({ verb: r.verb || t.verb, col: c.col, form: c.form });
  return out;
}

/** Pick `d.lanes` lanes over the tabled verbs: distinct frames, distinct verbs where the pool allows, a frame whose col + unit + fits match. */
function pickLanes(rng, bank, unit, tables, d) {
  const slots = laneSlots(tables);
  const frames = (bank.frames || []).filter((f) => f.unit === unit.key);
  for (let t = 0; t < MAX_TRIES; t++) {
    const lanes = [];
    const usedFrames = new Set();
    const verbUse = new Map();
    const distinctVerbs = new Set(slots.map((s) => s.verb.inf)).size;
    const maxPerVerb = Math.ceil(d.lanes / Math.max(1, distinctVerbs));
    for (const s of rng.shuffle(slots)) {
      if (lanes.length === d.lanes) break;
      if ((verbUse.get(s.verb.inf) || 0) >= maxPerVerb) continue;
      const fit = rng.shuffle(frames.filter((f) => f.col === s.col && f.fits.includes(s.verb.inf) && !usedFrames.has(f.id)));
      if (fold(s.verb.inf) === fold(s.form)) continue;   // never a cell whose form is the printed infinitive (the hint / label would give it away)
      const f = fit.find((x) => !tokens(x.text).includes(fold(s.form)));
      if (!f) continue;
      lanes.push({ verb: s.verb, col: s.col, form: s.form, frame: f });
      usedFrames.add(f.id);
      verbUse.set(s.verb.inf, (verbUse.get(s.verb.inf) || 0) + 1);
    }
    if (lanes.length === d.lanes) return lanes;
  }
  return null;
}

/**
 * The faces' page-side verify (Phase 2; injected by source into page.evaluate —
 * self-contained, never inflects). Reads the root's data-lcs-face and checks
 * the face's structure from the stamps:
 *   match     blocks (tense: one, 2n right items = n targets + n distractors,
 *             one pair per verb, the target is the PAST, never the infinitive;
 *             persons/stack: >= 3 pronouns, n right targets, one per column, the
 *             header prints the infinitive over an action picture); right texts
 *             pairwise distinct; no left text printed on the right; every item
 *             >= 36 high with its dot; DERANGEMENT (no left item level with its
 *             own answer); lanes as the base (verb on a block, form ≠ hint).
 *   sentences 0 tables, N lanes: distinct verbs + frames, one box each, the
 *             chip === the infinitive, the form never printed, >= minpictured
 *             pictures.
 *   choice    N rows × `candidates` pills: texts distinct, exactly one === the
 *             form, none printed in the sentence, the stamped idx === the DOM
 *             index of the correct pill, every index reached over the page,
 *             pills >= 36 high inside their row, no hint chip.
 *   hunt      N rows: the sentence printed whole, the form exactly once as a
 *             token and never the infinitive, an EMPTY dashed box of the stamped
 *             size, no noun-homograph token, no hint, distinct verbs + frames.
 * Every face: pictures loaded, no alt, no B&W path; boxes empty and >= 22; the
 * item window from data-lcs-items.
 */
function VERIFY_FACE() {
  const fails = [];
  const fold = (s) => String(s || '').trim().toLowerCase();
  const toks = (s) => fold(s).split(/[^\p{L}']+/u).filter(Boolean);
  const root = document.querySelector('[data-lcs-vf]');
  if (!root) return ['no verb-forms root'];
  const face = root.dataset.lcsFace;
  const hint = root.dataset.lcsHint === '1';
  const minPic = +(root.dataset.lcsMinpictured || 0);
  const win = (root.dataset.lcsItems || '8,16').split(',').map(Number);
  const FLOOR = 36, BOX_FLOOR = 22;
  let items = 0;
  const sentenceOf = (l) => { const p = l.querySelector('[data-lcs-sentence]'); return p ? p.textContent.replace(/\s*\([^)]*\)\s*$/, '') : ''; };
  const laneCommon = (l, L, { render, wantHint }) => {
    const verb = l.dataset.lcsVerb, col = l.dataset.lcsCol, form = l.dataset.lcsForm, frame = l.dataset.lcsFrame;
    if (!verb || !col || !form || !frame) fails.push(`${L}: missing stamps`);
    if (l.dataset.lcsRender !== render) fails.push(`${L}: render ${l.dataset.lcsRender}, want ${render}`);
    const p = l.querySelector('[data-lcs-sentence]');
    if (!p) fails.push(`${L}: no sentence`);
    const text = p ? p.textContent : '';
    if (/\{/.test(text)) fails.push(`${L}: unfilled slot`);
    const h = l.querySelector('[data-lcs-hint]');
    if (wantHint && !h) fails.push(`${L}: no hint chip`);
    if (!wantHint && h) fails.push(`${L}: a hint chip where none belongs`);
    if (h && fold(h.textContent.replace(/[()]/g, '')) === fold(form)) fails.push(`${L}: the hint equals the form`);
    if (h && fold(h.textContent.replace(/[()]/g, '')) !== fold(verb)) fails.push(`${L}: the chip "${h.textContent.trim()}" is not the infinitive "${verb}"`);
    const r = l.getBoundingClientRect();
    if (r.height < FLOOR) fails.push(`${L}: ${r.height.toFixed(1)} high < ${FLOOR}`);
    return { verb, col, form, frame, text };
  };
  const distinct = (rows, what) => {
    const v = new Set(), f = new Set();
    rows.forEach((r, i) => { if (v.has(fold(r.verb))) fails.push(`${what} ${i + 1}: verb "${r.verb}" twice on the page`); v.add(fold(r.verb)); if (f.has(r.frame)) fails.push(`${what} ${i + 1}: frame ${r.frame} used twice`); f.add(r.frame); });
  };
  const picturedFloor = (lanes) => { const n = lanes.filter((l) => l.querySelector('img')).length; if (n < minPic) fails.push(`${n} pictured rows < ${minPic}`); };

  if (face === 'match') {
    const kind = root.dataset.lcsMatchkind, blocksN = +root.dataset.lcsBlocks, lanesN = +root.dataset.lcsLanes;
    if (!['tense', 'persons', 'stack'].includes(kind)) fails.push(`match kind "${kind}"`);
    const blocks = [...root.querySelectorAll('[data-lcs-matchblock]')];
    if (blocks.length !== blocksN || !blocks.length) fails.push(`${blocks.length} blocks, config says ${blocksN}`);
    const verbsOnPage = new Set();
    const slots = [];
    blocks.forEach((b, bi) => {
      const B = `block ${bi + 1}`;
      const left = [...b.querySelectorAll('[data-lcs-match-left]')], right = [...b.querySelectorAll('[data-lcs-match-right]')];
      if (!left.length || !right.length) { fails.push(`${B}: empty column`); return; }
      const rTexts = right.map((r) => fold(r.textContent)), lTexts = left.map((l) => fold(l.textContent));
      if (new Set(rTexts).size !== rTexts.length) fails.push(`${B}: a right-column form repeats (${rTexts.join(',')})`);
      lTexts.forEach((t) => { if (rTexts.includes(t)) fails.push(`${B}: left "${t}" is printed on the right (gap equals anchor)`); });
      left.forEach((l) => { if (!l.querySelector('.ws-match-dot--right')) fails.push(`${B}: a left item without its dot`); if (fold(l.textContent) !== fold(l.dataset.lcsMatchLeft)) fails.push(`${B}: left prints "${l.textContent.trim()}" not its stamp`); });
      right.forEach((r) => { if (!r.querySelector('.ws-match-dot--left')) fails.push(`${B}: a right item without its dot`); if (fold(r.textContent) !== fold(r.dataset.lcsMatchRight)) fails.push(`${B}: right prints "${r.textContent.trim()}" not its stamp "${r.dataset.lcsMatchRight}"`); });
      [...left, ...right].forEach((it) => { const r = it.getBoundingClientRect(); if (r.height < FLOOR - 0.6) fails.push(`${B}: an item ${r.height.toFixed(1)} high < ${FLOOR}`); });
      if (kind === 'tense') {
        if (right.length !== 2 * left.length) fails.push(`${B}: ${right.length} right items, want 2 × ${left.length} (past + present of every verb)`);
        if (right.filter((r) => r.dataset.lcsRole === 'target').length !== left.length) fails.push(`${B}: ${right.filter((r) => r.dataset.lcsRole === 'target').length} targets, want ${left.length}`);
        if (right.filter((r) => r.dataset.lcsRole === 'distractor').length !== left.length) fails.push(`${B}: ${right.filter((r) => r.dataset.lcsRole === 'distractor').length} present distractors, want ${left.length}`);
        left.forEach((l, i) => {
          const v = l.dataset.lcsVerb;
          if (!v) { fails.push(`${B}: a left item without a verb`); return; }
          if (verbsOnPage.has(fold(v))) fails.push(`verb "${v}" twice on the page`);
          verbsOnPage.add(fold(v));
          if (fold(l.textContent) !== fold(v)) fails.push(`${B}: left prints "${l.textContent.trim()}", not the infinitive "${v}"`);
          const own = right.filter((r) => fold(r.dataset.lcsVerb) === fold(v));
          const tg = own.filter((r) => r.dataset.lcsRole === 'target'), ds = own.filter((r) => r.dataset.lcsRole === 'distractor');
          if (tg.length !== 1 || ds.length !== 1) fails.push(`${B}: ${v} has ${tg.length} target + ${ds.length} distractor, want one pair`);
          if (tg[0] && tg[0].dataset.lcsCol !== 'past') fails.push(`${B}: ${v} target col ${tg[0].dataset.lcsCol}, want past`);
          if (ds[0] && ds[0].dataset.lcsCol !== 'pres') fails.push(`${B}: ${v} distractor col ${ds[0].dataset.lcsCol}, want pres`);
          if (tg[0] && fold(tg[0].textContent) === fold(v)) fails.push(`${B}: ${v}: the target equals the infinitive (an anchor, never matched)`);
          const level = right[i];
          if (level && level.dataset.lcsRole === 'target' && fold(level.dataset.lcsVerb) === fold(v)) fails.push(`${B}: derangement — "${v}" sits level with its own past form`);
          items++;
        });
      } else {
        const verb = b.dataset.lcsVerb;
        if (!verb) fails.push(`${B}: no verb stamp`);
        if (verbsOnPage.has(fold(verb))) fails.push(`verb "${verb}" twice on the page`);
        verbsOnPage.add(fold(verb));
        const head = b.querySelector('[data-lcs-thead] [data-lcs-inf]');
        if (!head || head.textContent.trim() !== b.dataset.lcsInf) fails.push(`${B}: header does not print the infinitive`);
        if (!b.querySelector('[data-lcs-thead] img')) fails.push(`${B}: no action picture in the header`);
        if (right.length !== left.length) fails.push(`${B}: ${right.length} right items, want ${left.length}`);
        if (right.some((r) => r.dataset.lcsRole !== 'target')) fails.push(`${B}: a distractor in persons mode`);
        if (left.length < 3) fails.push(`${B}: ${left.length} persons < 3`);
        const cols = new Set();
        left.forEach((l, i) => {
          const col = l.dataset.lcsCol;
          if (!col || cols.has(col)) fails.push(`${B}: left column stamp "${col}" missing or repeated`);
          cols.add(col);
          const own = right.filter((r) => r.dataset.lcsCol === col);
          if (own.length !== 1) fails.push(`${B}: ${own.length} right items for ${col}, want 1`);
          const level = right[i];
          if (level && level.dataset.lcsCol === col) fails.push(`${B}: derangement — "${l.textContent.trim()}" sits level with its own form`);
          if (own[0]) slots.push({ verb, col, form: own[0].dataset.lcsMatchRight });
          items++;
        });
      }
    });
    const lanes = [...root.querySelectorAll('[data-lcs-lane]')];
    if (lanes.length !== lanesN) fails.push(`${lanes.length} lanes, config says ${lanesN}`);
    if (kind === 'tense' && lanes.length) fails.push('lanes on the tense match page');
    const rows = lanes.map((l, i) => {
      const r = laneCommon(l, `lane ${i + 1}`, { render: 'gap', wantHint: hint });
      if (l.querySelectorAll('.ws-blankbox').length !== 1) fails.push(`lane ${i + 1}: ${l.querySelectorAll('.ws-blankbox').length} boxes, want 1`);
      if (toks(sentenceOf(l)).includes(fold(r.form))) fails.push(`lane ${i + 1}: the sentence prints its form "${r.form}"`);
      if (!verbsOnPage.has(fold(r.verb))) fails.push(`lane ${i + 1}: verb "${r.verb}" is not on a block`);
      if (fold(r.form) === fold(r.verb)) fails.push(`lane ${i + 1}: the form is the infinitive`);
      const s = slots.find((x) => fold(x.verb) === fold(r.verb) && x.col === r.col);
      if (s && fold(s.form) !== fold(r.form)) fails.push(`lane ${i + 1}: form "${r.form}" != the block's "${s.form}"`);
      items++;
      return r;
    });
    distinct(rows, 'lane');
    if (kind === 'tense') { const lefts = [...root.querySelectorAll('[data-lcs-match-left]')]; const n = lefts.filter((l) => l.querySelector('img')).length; if (n < minPic) fails.push(`${n} pictured verbs < ${minPic}`); }
  } else if (face === 'sentences') {
    const lanesN = +root.dataset.lcsLanes;
    if (root.querySelectorAll('[data-lcs-table]').length) fails.push('a table on the sentences face');
    const lanes = [...root.querySelectorAll('[data-lcs-lane]')];
    if (lanes.length !== lanesN || !lanes.length) fails.push(`${lanes.length} lanes, config says ${lanesN}`);
    const rows = lanes.map((l, i) => {
      const r = laneCommon(l, `lane ${i + 1}`, { render: 'gap', wantHint: hint });
      if (l.querySelectorAll('.ws-blankbox').length !== 1) fails.push(`lane ${i + 1}: ${l.querySelectorAll('.ws-blankbox').length} boxes, want 1`);
      if (toks(sentenceOf(l)).includes(fold(r.form))) fails.push(`lane ${i + 1}: the sentence prints its form "${r.form}"`);
      if (fold(r.form) === fold(r.verb)) fails.push(`lane ${i + 1}: the form is the infinitive (the chip gives it away)`);
      items++;
      return r;
    });
    distinct(rows, 'lane');
    picturedFloor(lanes);
  } else if (face === 'choice') {
    const rowsN = +root.dataset.lcsRows, cand = +root.dataset.lcsCandidates, pillH = +root.dataset.lcsPillh;
    const lanes = [...root.querySelectorAll('[data-lcs-lane]')];
    if (lanes.length !== rowsN || !lanes.length) fails.push(`${lanes.length} rows, config says ${rowsN}`);
    const idxSeen = new Set();
    const rows = lanes.map((l, i) => {
      const L = `row ${i + 1}`;
      const r = laneCommon(l, L, { render: 'choice', wantHint: false });
      if (l.querySelectorAll('.ws-blankbox').length !== 1) fails.push(`${L}: ${l.querySelectorAll('.ws-blankbox').length} boxes, want 1`);
      const pills = [...l.querySelectorAll('[data-lcs-pill]')];
      if (pills.length !== cand) fails.push(`${L}: ${pills.length} pills, want ${cand}`);
      const texts = pills.map((p) => fold(p.textContent));
      if (new Set(texts).size !== texts.length) fails.push(`${L}: duplicate pill (${texts.join(',')})`);
      const hits = texts.filter((t) => t === fold(r.form)).length;
      if (hits !== 1) fails.push(`${L}: ${hits} pills equal the form "${r.form}", want exactly one`);
      pills.forEach((p) => { if (fold(p.textContent) !== fold(p.dataset.lcsPill)) fails.push(`${L}: a pill prints "${p.textContent.trim()}" not its stamp`); });
      const sent = toks(sentenceOf(l));
      texts.forEach((t) => { if (sent.includes(t)) fails.push(`${L}: the sentence prints the candidate "${t}"`); });
      const idx = texts.indexOf(fold(r.form));
      if (String(idx) !== l.dataset.lcsIdx) fails.push(`${L}: stamped idx ${l.dataset.lcsIdx}, the correct pill sits at ${idx}`);
      idxSeen.add(idx);
      const lb = l.getBoundingClientRect();
      pills.forEach((p) => { const b = p.getBoundingClientRect(); if (b.height < FLOOR - 0.6) fails.push(`${L}: a pill ${b.height.toFixed(1)} high < ${FLOOR}`); if (pillH && Math.abs(b.height - pillH) > 0.6) fails.push(`${L}: a pill ${b.height.toFixed(1)} high, want ${pillH}`); if (b.bottom > lb.bottom + 0.6 || b.right > lb.right + 0.6 || b.left < lb.left - 0.6) fails.push(`${L}: a pill outside its row`); });
      items++;
      return r;
    });
    for (let k = 0; k < cand; k++) if (!idxSeen.has(k)) fails.push(`the correct pill never sits at position ${k + 1} (index constant / incomplete)`);
    distinct(rows, 'row');
    picturedFloor(lanes);
  } else if (face === 'hunt') {
    const rowsN = +root.dataset.lcsRows;
    const homos = (root.dataset.lcsHomos || '').split(',').filter(Boolean).map(fold);
    const [bw, bh] = (root.dataset.lcsInfbox || '0,0').split(',').map(Number);
    const lanes = [...root.querySelectorAll('[data-lcs-lane]')];
    if (lanes.length !== rowsN || !lanes.length) fails.push(`${lanes.length} rows, config says ${rowsN}`);
    const rows = lanes.map((l, i) => {
      const L = `row ${i + 1}`;
      const r = laneCommon(l, L, { render: 'text', wantHint: false });
      const inf = l.dataset.lcsInf;
      if (!inf) fails.push(`${L}: no infinitive stamp`);
      if (fold(inf) !== fold(r.verb)) fails.push(`${L}: inf stamp "${inf}" != verb "${r.verb}"`);
      if (fold(r.form) === fold(inf)) fails.push(`${L}: the printed form is the infinitive (nothing to write)`);
      const printed = l.querySelector('[data-lcs-printed-form]');
      if (!printed || printed.textContent.trim() !== r.form) fails.push(`${L}: the printed form span is not "${r.form}"`);
      const sent = toks(sentenceOf(l));
      const n = sent.filter((t) => t === fold(r.form)).length;
      if (n !== 1) fails.push(`${L}: the form "${r.form}" occurs ${n} times as a token, want exactly once`);
      if (sent.includes(fold(inf))) fails.push(`${L}: the sentence prints the infinitive "${inf}"`);
      homos.forEach((h) => { if (sent.includes(h)) fails.push(`${L}: carries the noun-homograph token "${h}"`); });
      const boxes = [...l.querySelectorAll('.ws-blankbox')];
      if (boxes.length !== 1 || !boxes[0].hasAttribute('data-lcs-infbox')) fails.push(`${L}: ${boxes.length} boxes, want one answer box`);
      boxes.forEach((b) => { const bb = b.getBoundingClientRect(); const lb = l.getBoundingClientRect(); if (bw && (Math.abs(bb.width - bw) > 0.6 || Math.abs(bb.height - bh) > 0.6)) fails.push(`${L}: box ${bb.width.toFixed(0)}x${bb.height.toFixed(0)}, want ${bw}x${bh}`); if (bb.bottom > lb.bottom + 0.6 || bb.right > lb.right + 0.6) fails.push(`${L}: the box is outside its row`); if (b.textContent.trim()) fails.push(`${L}: the box carries text`); });
      items++;
      return r;
    });
    distinct(rows, 'row');
    picturedFloor(lanes);
  } else fails.push(`face "${face}"`);

  root.querySelectorAll('img').forEach((img) => {
    if (!img.complete || img.naturalWidth === 0) fails.push('a broken picture');
    if (img.hasAttribute('alt') && img.getAttribute('alt')) fails.push('a picture carries alt text');
    if (/(^|\s|%20)(bw|sw|bn|nb|zw|sh|pb|mv|sv)(\/|%2F)/i.test(decodeURIComponent(img.getAttribute('src') || ''))) fails.push('a B&W picture path');
  });
  root.querySelectorAll('.ws-blankbox').forEach((b) => { if (b.textContent.trim()) fails.push('a dashed box carries text'); if (b.getBoundingClientRect().height < BOX_FLOOR) fails.push('a box below the 22 px answer floor'); });
  if (items < win[0] || items > win[1]) fails.push(`${items} items outside [${win}]`);
  if (!items) fails.push('non-vacuity: 0 items');
  return fails;
}

module.exports = {
  id: ID,
  slug: 'verb-forms',
  gradeBand: 'G2',
  assetClass: 'icon-placement',
  exerciseType: KEY,
  themeAxis: { applicable: false },
  unitAxis: {
    applicable: true,
    units: (loc) => (loadBank(KEY, loc).units || []).map((u) => u.key),
    exemplar: (loc) => loadBank(KEY, loc).exemplar,
    tokens: (unit, loc) => { const u = unitOf(loadBank(KEY, loc), unit); return { U: u.label, L: u.label.toLocaleLowerCase(loc), UNIT: u.label }; },
  },
  difficulty: {
    1: { tables: 1, verbsPerPage: 1, given: 3, minHardGaps: 2, pool: 'regular', lanes: 2, laneMode: 'write', hint: true, pic: 72, rowH: 52, boxW: 400, boxH: 36, pronounW: 120, tableW: 675, tenseRows: 6, tenseGaps: 6, gapCols: ['past', 'pres'], gapOrder: 'first', minPerRow: 1, minPerCol: 0, laneMin: 96, laneMax: 150, tenseIcon: 56, items: [4, 16] },
    2: { tables: 2, verbsPerPage: 2, given: 2, minHardGaps: 3, pool: 'regular', lanes: 3, laneMode: 'write', hint: true, pic: 64, rowH: 46, boxW: 206, boxH: 36, pronounW: 96, tableW: 330, tenseRows: 6, tenseGaps: 8, gapCols: ['pres', 'past'], gapOrder: 'random', minPerRow: 1, minPerCol: 3, laneMin: 96, laneMax: 132, tenseIcon: 44, items: [8, 16] },
    3: { tables: 2, verbsPerPage: 2, given: 0, minHardGaps: 4, pool: 'all', lanes: 3, laneMode: 'write', hint: false, pic: 64, rowH: 46, boxW: 206, boxH: 36, pronounW: 96, tableW: 330, tenseRows: 6, tenseGaps: 10, gapCols: ['pres', 'past'], gapOrder: 'random', minPerRow: 1, minPerCol: 3, laneMin: 96, laneMax: 132, tenseIcon: 44, items: [8, 16] },
  },
  i18n: {
    en: {
      title: 'Verb Forms: Today and Yesterday',
      instruction: 'Look at the picture and read the verb. Write its today form and its yesterday form in the dashed boxes, then finish the sentences.',
    },
  },
  eligible,
  poolFor,

  build({ theme, difficulty, locale, unit }, ctx) {
    const loc = (locale || 'en').slice(0, 2);
    return this._buildWith(loadBank(KEY, loc), this.difficulty[difficulty], { theme, locale: loc, unit }, ctx);
  },

  /** The whole build over an INJECTED bank + resolved config (the gate's poison seam); build() passes the real ones. */
  _buildWith(bank, d, { locale, unit }, ctx) {
    if (!d) throw new Error(`${ID}: no difficulty config`);
    const rng = ctx.rng;
    const loc = (locale || 'en').slice(0, 2);
    if (!bank || !Array.isArray(bank.verbs) || !Array.isArray(bank.columns) || !bank.columns.length) throw new Error(`${ID}: the ${loc} bank has no verbs/columns`);
    if (!['persons', 'tense'].includes(bank.mode)) throw new Error(`${ID}: the ${loc} bank mode "${bank.mode}" is not persons|tense`);
    if (bank.mode === 'tense' && bank.columns.length !== 2) throw new Error(`${ID}: tense mode needs exactly two columns (${loc} has ${bank.columns.length})`);
    if (d.laneMode !== 'write') throw new Error(`${ID}: the base renders laneMode 'write' only (got ${d.laneMode})`);
    if (d.boxH < 22) throw new Error(`${ID}: boxH ${d.boxH} < the G2 answer floor 22`);
    if (d.rowH < 36 || d.pic < 36 || (d.tenseIcon || 44) < 36) throw new Error(`${ID}: rowH ${d.rowH} / pic ${d.pic} / tenseIcon ${d.tenseIcon} below the G2 element floor 36`);
    if (!(d.laneMax >= d.laneMin)) throw new Error(`${ID}: laneMax ${d.laneMax} < laneMin ${d.laneMin}`);
    for (const f of bank.frames || []) { const s = slotsIn(f.text); if (s.length !== 1 || s[0] !== 'form') throw new Error(`${ID}: frame ${f.id} must carry {form} exactly once ("${f.text}")`); }
    const u = unitOf(bank, unit || bank.exemplar);
    const pool = poolFor(bank, d.pool);
    // Phase 2 faces — additive knobs, dispatched BEFORE the base path touches the RNG (the base's default output stays byte-identical)
    if (d.match) return this._buildMatch(bank, d, { locale: loc, unit: u, pool }, ctx);
    if (d.tables === 0) return this._buildSentences(bank, d, { locale: loc, unit: u, pool }, ctx);
    if (d.choice) return this._buildChoice(bank, d, { locale: loc, unit: u, pool }, ctx);
    if (d.hunt) return this._buildHunt(bank, d, { locale: loc, unit: u, pool }, ctx);
    const verbs = eligible(bank, u, pool);
    const tables = [];
    let items = 0;

    if (bank.mode === 'persons') {
      if (bank.columns.length < d.minHardGaps + 1) throw new Error(`${ID}: ${loc} has ${bank.columns.length} persons < minHardGaps ${d.minHardGaps} + 1`);
      if (verbs.length < (pool.core ? d.tables : 3)) throw new Error(`${ID}: unit ${u.key}/${loc}/${pool.name} has ${verbs.length} ${pool.core ? 'core' : 'pictured'} verbs < ${pool.core ? d.tables : 3} — REFUSED`);
      if (d.tables > 2 || d.tables < 1 || d.verbsPerPage !== d.tables) throw new Error(`${ID}: tables ${d.tables} / verbsPerPage ${d.verbsPerPage} outside the persons contract`);
      const w = d.tables === 1 ? BODY_W : d.tableW;
      if (d.tables * w + (d.tables - 1) * TABLE_GAP > BODY_W) throw new Error(`${ID}: ${d.tables} tables × ${w} exceed ${BODY_W}`);
      let picked = null, plans = null;
      for (let t = 0; t < MAX_TRIES && !plans; t++) {
        picked = rng.sample(verbs, d.tables);
        const p = picked.map((v) => planPersons(rng, bank, u, v, d));
        if (p.every(Boolean)) plans = p;
      }
      if (!plans) throw new Error(`${ID}: no ${d.tables} verbs of ${u.key}/${loc} keep >= ${d.minHardGaps} hard gaps under given ${d.given} — REFUSED`);
      picked.forEach((v, i) => {
        const rows = plans[i];
        items += rows.filter((r) => r.cells[0].state === 'gap').length;
        tables.push({ verb: v, rows, html: verbTable({ mode: 'persons', header: { inf: v.inf, src: pictureOf(v, loc) }, rows, w, rowH: d.rowH, boxW: d.boxW, boxH: d.boxH, pronounW: d.pronounW, iconPx: d.pic, headerH: 84, verb: v.inf, inf: v.inf }) });
      });
    } else {
      if (verbs.length < d.tenseRows) throw new Error(`${ID}: unit ${u.key}/${loc}/${pool.name} has ${verbs.length} pictured verbs < ${d.tenseRows} — REFUSED`);
      if (d.gapCols.some((c) => !bank.columns.some((x) => x.key === c))) throw new Error(`${ID}: gapCols ${d.gapCols} name a column the ${loc} bank lacks`);
      if (d.tenseGaps > d.tenseRows * d.gapCols.length) throw new Error(`${ID}: tenseGaps ${d.tenseGaps} > ${d.tenseRows} × ${d.gapCols.length} cells`);
      const rowsOk = verbs.filter((v) => d.gapCols.some((c) => fold(v.forms[u.key][c]) !== fold(v.inf)));   // a row must own >= 1 gappable cell
      if (rowsOk.length < d.tenseRows) throw new Error(`${ID}: only ${rowsOk.length} verbs of ${u.key}/${loc} own a gappable cell in ${d.gapCols} — REFUSED`);
      let plan = null;
      for (let t = 0; t < MAX_TRIES && !plan; t++) plan = planTense(rng, bank, u, rng.sample(rowsOk, d.tenseRows), d);
      if (!plan) throw new Error(`${ID}: no ${d.tenseRows}-verb table of ${u.key}/${loc} takes ${d.tenseGaps} gaps (>= ${d.minPerRow}/row, >= ${d.minPerCol}/col) — REFUSED`);
      plan.forEach((r) => { r.src = pictureOf(r.verb, loc); });
      items += plan.reduce((s, r) => s + r.cells.filter((c) => c.state === 'gap').length, 0);
      tables.push({ verb: null, rows: plan, html: verbTable({ mode: 'tense', colLabels: bank.columns, rows: plan, w: BODY_W, rowH: TENSE_ROW_H, boxW: TENSE_BOX_W, boxH: d.boxH, labelW: TENSE_LABEL_W, colW: TENSE_COL_W, iconPx: d.tenseIcon, headerH: 44 }) });
    }

    const seen = new Set();
    const infs = bank.mode === 'persons' ? tables.map((t) => t.verb.inf) : tables[0].rows.map((r) => r.verb.inf);
    for (const inf of infs) { const k = fold(inf); if (seen.has(k)) throw new Error(`${ID}: verb "${inf}" twice on the page`); seen.add(k); }

    const lanes = pickLanes(rng, bank, u, tables, d);
    if (!lanes) throw new Error(`${ID}: no ${d.lanes} lanes over the tabled verbs of ${u.key}/${loc} (frames lack a fitting col/verb) — REFUSED`);
    items += lanes.length;
    if (items < d.items[0] || items > d.items[1]) throw new Error(`${ID}: ${items} items outside the window [${d.items}]`);

    // the stack: lanes take the chrome's slack FIRST (flex-grow 100, capped at laneMax each), the table rows share the rest
    // ALWAYS the row wrapper: a lone table dropped straight into the column stack would read its `flex:0 0 <w>px` as a HEIGHT basis
    const tableRow = `<div data-lcs-tables style="display:flex;justify-content:${tables.length === 1 ? 'center' : 'space-between'};align-items:stretch;gap:${TABLE_GAP}px;flex:1 1 auto">${tables.map((t) => t.html).join('')}</div>`;
    const laneHtml = lanes.map((l) => sentenceGap({
      src: pictureOf(l.verb, loc), text: l.frame.text, hint: d.hint ? l.verb.inf : null, render: 'gap', minH: d.laneMin,
      attrs: `data-lcs-verb="${l.verb.inf}" data-lcs-col="${l.col}" data-lcs-form="${l.form}" data-lcs-frame="${l.frame.id}"`,
    })).join('');
    const lanesMin = lanes.length * d.laneMin + (lanes.length - 1) * LANE_GAP, lanesMax = lanes.length * d.laneMax + (lanes.length - 1) * LANE_GAP;
    const laneGrid = `<div data-lcs-lanes style="flex:100 1 auto;min-height:${lanesMin}px;max-height:${lanesMax}px;display:grid;grid-template-rows:repeat(${lanes.length},minmax(${d.laneMin}px,1fr));row-gap:${LANE_GAP}px">${laneHtml}</div>`;
    // Face 4 (pool 'irregular') stamps its face + pool; the base path appends nothing (byte-identical)
    const faceStamp = pool.core ? 'irregular' : 'base';
    const poolStamp = pool.core ? ' data-lcs-pool="irregular"' : '';
    const bodyHtml = `<div data-ws-content data-lcs-vf data-lcs-face="${faceStamp}"${poolStamp} data-lcs-mode="${bank.mode}" data-lcs-unit="${u.key}" data-lcs-locale="${loc}" ` +
      `data-lcs-tables="${tables.length}" data-lcs-lanes="${lanes.length}" data-lcs-minhard="${d.minHardGaps}" data-lcs-tensegaps="${bank.mode === 'tense' ? d.tenseGaps : ''}" ` +
      `data-lcs-minperrow="${d.minPerRow}" data-lcs-minpercol="${d.minPerCol}" data-lcs-hint="${d.hint ? 1 : 0}" data-lcs-boxh="${d.boxH}" data-lcs-items="${d.items.join(',')}" ` +
      `style="flex:1;display:flex;flex-direction:column;gap:${STACK_GAP}px;min-height:0">${tableRow}${laneGrid}</div>`;
    return {
      bodyHtml,
      meta: {
        mode: bank.mode, unit: u.key,
        tables: tables.map((t) => t.rows.map((r) => [r.verb ? r.verb.inf : t.verb.inf, r.cells.map((c) => c.col + ':' + c.state).join(',')])),
        lanes: lanes.map((l) => [l.verb.inf, l.col, l.frame.id]),
      },
    };
  },

  /* ------------------------------------------------------------------ Phase 2 faces ------------------------------------------------------------------ */

  /** The lanes grid the faces share with the base: N `.ws-lane` rows `repeat(N, minmax(min, 1fr))`, gap 12, taking the chrome's slack first. */
  _laneGrid(html, n, min, max, gap = LANE_GAP) {
    const lo = n * min + (n - 1) * gap, hi = n * max + (n - 1) * gap;
    return `<div data-lcs-lanes style="flex:100 1 auto;min-height:${lo}px;max-height:${hi}px;display:grid;grid-template-rows:repeat(${n},minmax(${min}px,1fr));row-gap:${gap}px">${html}</div>`;
  },

  _root(attrs, inner) {
    return `<div data-ws-content data-lcs-vf ${attrs} style="flex:1;display:flex;flex-direction:column;gap:${STACK_GAP}px;min-height:0">${inner}</div>`;
  },

  /**
   * Face 2 — `match` (G2-334). Draw a line to the form. The KIND is the bank's:
   *   tense (en sv da no): ONE block, left = d.mTense.verbs infinitives (pictured
   *     first, >= mTense.pictured of them), right = 2n forms — the PAST (target)
   *     and the PRESENT (distractor) of every verb, shuffled into a derangement
   *     (no verb sits level with its own past); verbs whose past is the
   *     infinitive are excluded (the answer would be printed on the left).
   *   persons (de fr it es pt fi …): mPersons.verbs blocks side by side, one
   *     pictured `match !== false` regular verb each, left = bank.matchPersons
   *     pronouns, right = their forms in a derangement; + mPersons.lanes lanes.
   *   stack (matchPersons.length < mStack.minPersons — nl): mStack.verbs
   *     full-width blocks stacked, no lanes.
   */
  _buildMatch(bank, d, { locale: loc, unit: u, pool }, ctx) {
    const rng = ctx.rng;
    const mode = bank.mode;
    const mp = Array.isArray(bank.matchPersons) ? bank.matchPersons : [];
    const kind = mode === 'tense' ? 'tense' : (mp.length < d.mStack.minPersons ? 'stack' : 'persons');
    const cfg = kind === 'tense' ? d.mTense : kind === 'persons' ? d.mPersons : d.mStack;
    if (!cfg) throw new Error(`${ID}: match face has no ${kind} config`);
    const blocks = [];
    let items = 0;
    const verbsOnPage = [];
    if (kind === 'tense') {
      const all = withForms(bank, u, pool).filter((v) => { const f = v.forms[u.key]; return fold(f.past) !== fold(v.inf) && fold(f.pres) !== fold(v.inf) && fold(f.pres) !== fold(f.past); });
      const n = cfg.verbs;
      const pictured = all.filter((v) => v.pic), plain = all.filter((v) => !v.pic);
      if (all.length < n) throw new Error(`${ID}: unit ${u.key}/${loc}/${pool.name} has ${all.length} matchable verbs < ${n} — REFUSED`);
      const kMax = Math.min(n, pictured.length), kMin = Math.min(Math.max(cfg.pictured, n - plain.length), kMax);
      if (kMax < cfg.pictured) throw new Error(`${ID}: unit ${u.key}/${loc}/${pool.name} has ${pictured.length} pictured matchable verbs < ${cfg.pictured} — REFUSED`);
      const k = rng.int(kMin, kMax);
      const verbs = rng.shuffle([...rng.sample(pictured, k), ...rng.sample(plain, n - k)]);
      const left = verbs.map((v) => { const src = pictureOf(v, loc); return { label: v.inf, src, spacer: !src, attrs: `data-lcs-verb="${v.inf}"` }; });
      const right = [];
      verbs.forEach((v) => {
        right.push({ form: v.forms[u.key].past, role: 'target', attrs: `data-lcs-verb="${v.inf}" data-lcs-col="past"`, verb: v.inf });
        right.push({ form: v.forms[u.key].pres, role: 'distractor', attrs: `data-lcs-verb="${v.inf}" data-lcs-col="pres"`, verb: v.inf });
      });
      const texts = right.map((r) => fold(r.form));
      if (new Set(texts).size !== texts.length) throw new Error(`${ID}: two right-column forms coincide (${texts.join(',')}) — REFUSED`);
      if (left.some((l) => texts.includes(fold(l.label)))) throw new Error(`${ID}: an infinitive is printed in the right column — REFUSED`);
      let order = null;
      for (let t = 0; t < MAX_TRIES && !order; t++) {
        const o = rng.shuffle(right.map((_, i) => i));
        if (verbs.every((v, i) => !(right[o[i]].role === 'target' && right[o[i]].verb === v.inf))) order = o;
      }
      if (!order) throw new Error(`${ID}: no derangement of the right column — REFUSED`);
      verbsOnPage.push(...verbs.map((v) => v.inf));
      items += verbs.length;
      blocks.push(matchBlock({ header: null, w: BODY_W, verb: '', inf: '', match: { left, right, order, leftW: cfg.leftW, rightW: cfg.rightW, leftH: cfg.leftH, rightH: cfg.rightH, padY: cfg.padY, padX: cfg.padX, fontPx: cfg.fontPx, iconPx: cfg.iconPx } }));
    } else {
      if (mp.length < 3) throw new Error(`${ID}: ${loc} matchPersons ${mp.length} < 3 — REFUSED`);
      if (mp.some((m) => !bank.columns.some((c) => c.key === m))) throw new Error(`${ID}: ${loc} matchPersons names a column the bank lacks`);
      const all = withForms(bank, u, pool).filter((v) => v.pic && v.match !== false && !v.irregular && new Set(mp.map((m) => fold(v.forms[u.key][m]))).size === mp.length);
      const n = cfg.verbs;
      if (all.length < n) throw new Error(`${ID}: unit ${u.key}/${loc}/${pool.name} has ${all.length} pictured match-able verbs < ${n} — REFUSED`);
      const verbs = rng.sample(all, n);
      for (const v of verbs) {
        const forms = v.forms[u.key];
        const left = mp.map((m) => ({ label: (v.labelOverride && v.labelOverride[m]) || bank.columns.find((c) => c.key === m).label, attrs: `data-lcs-col="${m}"` }));
        const right = mp.map((m) => ({ form: forms[m], role: 'target', attrs: `data-lcs-col="${m}"`, col: m }));
        if (left.some((l) => right.some((r) => fold(r.form) === fold(l.label)))) throw new Error(`${ID}: ${v.inf}: a pronoun equals a form — REFUSED`);
        let order = null;
        for (let t = 0; t < MAX_TRIES && !order; t++) { const o = rng.shuffle(right.map((_, i) => i)); if (o.every((x, i) => x !== i)) order = o; }
        if (!order) throw new Error(`${ID}: no derangement for ${v.inf} — REFUSED`);
        items += mp.length;
        verbsOnPage.push(v.inf);
        blocks.push(matchBlock({ header: { inf: v.inf, src: pictureOf(v, loc) }, w: cfg.blockW, headerH: cfg.headerH, iconPx: cfg.iconPx, verb: v.inf, inf: v.inf, match: { left, right, order, leftW: cfg.leftW, rightW: cfg.rightW, itemH: cfg.itemH, padY: cfg.padY, padX: cfg.padX, fontPx: cfg.fontPx, leftPad: cfg.leftPad } }));
      }
    }
    // lanes (persons only): one per block verb, at a non-anchor person, the frame never printing the form
    let lanes = [];
    if (cfg.lanes) {
      const tabled = withForms(bank, u, pool).filter((v) => verbsOnPage.includes(v.inf));
      lanes = pickRows(rng, bank, u, tabled, cfg.lanes, { minPictured: 0 });
      if (!lanes) throw new Error(`${ID}: no ${cfg.lanes} lanes over the matched verbs of ${u.key}/${loc} — REFUSED`);
      items += lanes.length;
    }
    if (items < d.items[0] || items > d.items[1]) throw new Error(`${ID}: ${items} items outside the window [${d.items}]`);
    const stacked = kind === 'stack';
    const blockRow = `<div data-lcs-blocks style="display:flex;flex-direction:${stacked ? 'column' : 'row'};justify-content:${blocks.length === 1 ? 'center' : 'space-between'};align-items:stretch;gap:${stacked ? cfg.gap : TABLE_GAP}px;flex:1 1 auto;min-height:0">${blocks.join('')}</div>`;
    const laneHtml = lanes.map((l) => sentenceGap({
      src: pictureOf(l.verb, loc), text: l.frame.text, hint: d.hint ? l.verb.inf : null, render: 'gap', minH: d.laneMin,
      attrs: `data-lcs-verb="${l.verb.inf}" data-lcs-col="${l.col}" data-lcs-form="${l.form}" data-lcs-frame="${l.frame.id}"`,
    })).join('');
    const laneGrid = lanes.length ? this._laneGrid(laneHtml, lanes.length, d.laneMin, d.laneMax) : '';
    const bodyHtml = this._root(`data-lcs-face="match" data-lcs-matchkind="${kind}" data-lcs-mode="${mode}" data-lcs-unit="${u.key}" data-lcs-locale="${loc}" data-lcs-blocks="${blocks.length}" ` +
      `data-lcs-lanes="${lanes.length}" data-lcs-hint="${d.hint ? 1 : 0}" data-lcs-minpictured="${kind === 'tense' ? cfg.pictured : 0}" data-lcs-items="${d.items.join(',')}"`, blockRow + laneGrid);
    return { bodyHtml, meta: { face: 'match', kind, mode, unit: u.key, verbs: verbsOnPage, lanes: lanes.map((l) => [l.verb.inf, l.col, l.frame.id]) } };
  },

  /** Face 3 — `tables:0, lanes:N` (G2-335): N gap sentences over N distinct verbs (>= d.pictured pictured), the infinitive in a chip, no table. */
  _buildSentences(bank, d, { locale: loc, unit: u, pool }, ctx) {
    const rng = ctx.rng;
    const verbs = withForms(bank, u, pool);
    if (verbs.length < d.lanes) throw new Error(`${ID}: unit ${u.key}/${loc}/${pool.name} has ${verbs.length} verbs < ${d.lanes} lanes — REFUSED`);
    const rows = pickRows(rng, bank, u, verbs, d.lanes, { minPictured: d.pictured });
    if (!rows) throw new Error(`${ID}: no ${d.lanes} lanes over distinct verbs of ${u.key}/${loc} (>= ${d.pictured} pictured; frames lack a fitting col/verb) — REFUSED`);
    const items = rows.length;
    if (items < d.items[0] || items > d.items[1]) throw new Error(`${ID}: ${items} items outside the window [${d.items}]`);
    const laneHtml = rows.map((l) => sentenceGap({
      src: pictureOf(l.verb, loc), text: l.frame.text, hint: d.hint ? l.verb.inf : null, render: 'gap', minH: d.laneMin,
      attrs: `data-lcs-verb="${l.verb.inf}" data-lcs-col="${l.col}" data-lcs-form="${l.form}" data-lcs-frame="${l.frame.id}"`,
    })).join('');
    const bodyHtml = this._root(`data-lcs-face="sentences" data-lcs-mode="${bank.mode}" data-lcs-unit="${u.key}" data-lcs-locale="${loc}" data-lcs-tables="0" data-lcs-lanes="${rows.length}" ` +
      `data-lcs-hint="${d.hint ? 1 : 0}" data-lcs-minpictured="${d.pictured}" data-lcs-items="${d.items.join(',')}"`, this._laneGrid(laneHtml, rows.length, d.laneMin, d.laneMax));
    return { bodyHtml, meta: { face: 'sentences', mode: bank.mode, unit: u.key, lanes: rows.map((l) => [l.verb.inf, l.col, l.frame.id]) } };
  },

  /**
   * Face 5 — `choice` (G2-337): d.rows gap sentences, each over d.candidates
   * printed forms of the SAME verb's paradigm (tense: inf/pres/past; persons:
   * the unit's person forms) — the correct one + others, never another verb,
   * never invented; the frame prints none of them; the correct pill's position
   * covers every index over the page.
   */
  _buildChoice(bank, d, { locale: loc, unit: u, pool }, ctx) {
    const rng = ctx.rng;
    const n = d.rows, c = d.candidates;
    if (n < c) throw new Error(`${ID}: rows ${n} < candidates ${c} (the correct index cannot cover every position)`);
    const verbs = withForms(bank, u, pool).filter((v) => paradigmOf(bank, u, v).length >= c);   // F5-excluded: fewer distinct forms than pills
    if (verbs.length < n) throw new Error(`${ID}: unit ${u.key}/${loc}/${pool.name} has ${verbs.length} verbs with >= ${c} distinct forms < ${n} rows — REFUSED`);
    const rows = pickRows(rng, bank, u, verbs, n, { minPictured: d.pictured, banned: (v) => paradigmOf(bank, u, v) });
    if (!rows) throw new Error(`${ID}: no ${n} choice rows over distinct verbs of ${u.key}/${loc} — REFUSED`);
    const idxs = rng.shuffle([...Array.from({ length: c }, (_, i) => i), ...Array.from({ length: n - c }, () => rng.int(0, c - 1))]);
    const laneHtml = rows.map((r, i) => {
      const others = rng.sample(paradigmOf(bank, u, r.verb).filter((f) => fold(f) !== fold(r.form)), c - 1);
      const chips = [...others];
      chips.splice(idxs[i], 0, r.form);
      return sentenceGap({
        src: pictureOf(r.verb, loc), text: r.frame.text, render: 'choice', chips, gapW: d.gapW, gapH: d.gapH, minH: d.rowMin, padding: d.lanePad, lineHeight: 1.25, chipsGap: 4,
        pillPx: d.pillPx, pillH: d.pillH, pillPad: d.pillPad, idx: idxs[i],
        attrs: `data-lcs-verb="${r.verb.inf}" data-lcs-col="${r.col}" data-lcs-form="${r.form}" data-lcs-frame="${r.frame.id}"`,
      });
    }).join('');
    const items = rows.length;
    if (items < d.items[0] || items > d.items[1]) throw new Error(`${ID}: ${items} items outside the window [${d.items}]`);
    const bodyHtml = this._root(`data-lcs-face="choice" data-lcs-mode="${bank.mode}" data-lcs-unit="${u.key}" data-lcs-locale="${loc}" data-lcs-rows="${n}" data-lcs-candidates="${c}" ` +
      `data-lcs-minpictured="${d.pictured}" data-lcs-pillh="${d.pillH}" data-lcs-items="${d.items.join(',')}"`, this._laneGrid(laneHtml, n, d.rowMin, d.rowMax, d.rowGap));
    return { bodyHtml, meta: { face: 'choice', mode: bank.mode, unit: u.key, rows: rows.map((r, i) => [r.verb.inf, r.col, r.frame.id, idxs[i]]) } };
  },

  /**
   * Face 6 — `hunt` (G2-338): d.rows sentences printed WHOLE with the conjugated
   * verb inside (the child underlines it) + a dashed box for the infinitive.
   * The frame prints no other bank form and no noun-homograph token; the
   * printed form is never the infinitive itself.
   */
  _buildHunt(bank, d, { locale: loc, unit: u, pool }, ctx) {
    const rng = ctx.rng;
    const n = d.rows;
    const verbs = withForms(bank, u, pool);
    if (verbs.length < n) throw new Error(`${ID}: unit ${u.key}/${loc}/${pool.name} has ${verbs.length} verbs < ${n} rows — REFUSED`);
    const homos = ((bank.hunt && bank.hunt.nounHomographs) || []).map(fold);
    const allForms = [];
    for (const v of [...(bank.verbs || []), ...(bank.irregularCore || [])]) { const f = v.forms && v.forms[u.key]; if (f) for (const col of bank.columns) allForms.push(f[col.key]); allForms.push(v.inf); }
    const rows = pickRows(rng, bank, u, verbs, n, { minPictured: d.pictured, banned: () => [...allForms, ...homos] });
    if (!rows) throw new Error(`${ID}: no ${n} hunt rows over distinct verbs of ${u.key}/${loc} — REFUSED`);
    const laneHtml = rows.map((r) => sentenceGap({
      src: pictureOf(r.verb, loc), text: r.frame.text, render: 'text', form: r.form, answerBox: d.infBox, minH: d.rowMin, padding: d.lanePad, lineHeight: 1.25, chipsGap: 4,
      attrs: `data-lcs-verb="${r.verb.inf}" data-lcs-inf="${r.verb.inf}" data-lcs-col="${r.col}" data-lcs-form="${r.form}" data-lcs-frame="${r.frame.id}"`,
    })).join('');
    const items = rows.length;
    if (items < d.items[0] || items > d.items[1]) throw new Error(`${ID}: ${items} items outside the window [${d.items}]`);
    const bodyHtml = this._root(`data-lcs-face="hunt" data-lcs-mode="${bank.mode}" data-lcs-unit="${u.key}" data-lcs-locale="${loc}" data-lcs-rows="${n}" data-lcs-minpictured="${d.pictured}" ` +
      `data-lcs-homos="${homos.join(',')}" data-lcs-infbox="${d.infBox.w},${d.infBox.h}" data-lcs-items="${d.items.join(',')}"`, this._laneGrid(laneHtml, n, d.rowMin, d.rowMax, d.rowGap));
    return { bodyHtml, meta: { face: 'hunt', mode: bank.mode, unit: u.key, rows: rows.map((r) => [r.verb.inf, r.col, r.frame.id]) } };
  },

  async verify(page) {
    const face = await page.evaluate(() => { const r = document.querySelector('[data-lcs-vf]'); return r ? r.dataset.lcsFace || '' : ''; });
    if (['match', 'sentences', 'choice', 'hunt'].includes(face)) return page.evaluate(VERIFY_FACE);
    return page.evaluate(() => {
      const fails = [];
      const fold = (s) => String(s || '').trim().toLowerCase();
      const toks = (s) => fold(s).split(/[^\p{L}']+/u).filter(Boolean);
      const root = document.querySelector('[data-lcs-vf]');
      if (!root) return ['no verb-forms root'];
      const mode = root.dataset.lcsMode, tablesN = +root.dataset.lcsTables, lanesN = +root.dataset.lcsLanes, minHard = +root.dataset.lcsMinhard;
      const minPerRow = +root.dataset.lcsMinperrow, minPerCol = +root.dataset.lcsMinpercol, hint = root.dataset.lcsHint === '1', boxH = +root.dataset.lcsBoxh;
      const core = root.dataset.lcsPool === 'irregular';   // Face 4: chip-only headers, no action pictures (design §3)
      if (!['persons', 'tense'].includes(mode)) fails.push(`mode "${mode}"`);
      if (root.dataset.lcsFace !== (core ? 'irregular' : 'base')) fails.push(`face "${root.dataset.lcsFace}"`);
      if (!root.dataset.lcsUnit) fails.push('no unit stamp');
      const tables = [...root.querySelectorAll('[data-lcs-table]')];
      if (tables.length !== tablesN || !tables.length) fails.push(`${tables.length} tables, config says ${tablesN}`);
      let gapsTotal = 0;
      const verbsOnPage = new Set();
      const slots = [];   // {verb, col, form, state}
      tables.forEach((t, ti) => {
        const T = `table ${ti + 1}`;
        if (t.dataset.lcsMode !== mode) fails.push(`${T}: mode ${t.dataset.lcsMode} != ${mode}`);
        const cells = [...t.querySelectorAll('[data-lcs-cell]')];
        if (!cells.length) fails.push(`${T}: no cells`);
        // every visible text on the table (labels, header, givens, anchors)
        const visible = new Set();
        t.querySelectorAll('[data-lcs-inf],[data-lcs-pronoun],[data-lcs-collabel]').forEach((el) => visible.add(fold(el.textContent)));
        const gapForms = [];
        const perRow = new Map(), perCol = new Map();
        cells.forEach((c) => {
          const col = c.dataset.lcsCol, state = c.dataset.lcsCell, form = c.dataset.lcsForm;
          const rowEl = mode === 'tense' ? c.closest('[data-lcs-row]') : t;
          const verb = rowEl ? rowEl.dataset.lcsVerb : null;
          if (!verb) fails.push(`${T}: a cell without a verb`);
          if (!form) fails.push(`${T}: ${verb}/${col} has no form stamp`);
          if (state === 'gap') {
            if (c.textContent.trim()) fails.push(`${T}: gap ${verb}/${col} prints "${c.textContent.trim()}"`);
            if (!c.querySelector('.ws-blankbox')) fails.push(`${T}: gap ${verb}/${col} has no dashed box`);
            if (c.dataset.lcsHard !== '1') fails.push(`${T}: gap ${verb}/${col} not marked hard`);
            gapForms.push(fold(form));
            gapsTotal++;
            perRow.set(verb, (perRow.get(verb) || 0) + 1);
            perCol.set(col, (perCol.get(col) || 0) + 1);
          } else if (state === 'given' || state === 'anchor') {
            if (c.textContent.trim() !== form) fails.push(`${T}: ${state} ${verb}/${col} prints "${c.textContent.trim()}" not "${form}"`);
            if (c.querySelector('.ws-blankbox')) fails.push(`${T}: ${state} ${verb}/${col} carries a box`);
            visible.add(fold(form));
            const inf = rowEl ? fold(rowEl.dataset.lcsInf) : '';
            if (state === 'given' && fold(form) === inf) fails.push(`${T}: given ${verb}/${col} equals the infinitive (must be an anchor)`);
          } else fails.push(`${T}: cell state "${state}"`);
          if (c.querySelector('img')) fails.push(`${T}: a picture inside a cell`);
          slots.push({ verb, col, form, state });
        });
        // anchors: every cell whose form equals a printed text is an anchor; no gap equals a printed text
        gapForms.forEach((g) => { if (visible.has(g)) fails.push(`${T}: gap form "${g}" equals a printed text on the table (gap equals anchor)`); });
        cells.forEach((c) => {
          const rowEl = mode === 'tense' ? c.closest('[data-lcs-row]') : t;
          const inf = rowEl ? fold(rowEl.dataset.lcsInf) : '';
          if (c.dataset.lcsCell !== 'anchor' && fold(c.dataset.lcsForm) === inf) fails.push(`${T}: ${c.dataset.lcsCell} ${rowEl && rowEl.dataset.lcsVerb}/${c.dataset.lcsCol} equals the infinitive but is not an anchor`);
        });
        const hard = cells.filter((c) => c.dataset.lcsCell === 'gap' && c.dataset.lcsHard === '1').length;
        if (mode === 'persons' && hard < minHard) fails.push(`${T}: hard gaps ${hard} < ${minHard}`);
        if (mode === 'persons') {
          const v = t.dataset.lcsVerb;
          if (verbsOnPage.has(fold(v))) fails.push(`verb "${v}" twice on the page`);
          verbsOnPage.add(fold(v));
          const head = t.querySelector('[data-lcs-thead] [data-lcs-inf]');
          if (!head || head.textContent.trim() !== t.dataset.lcsInf) fails.push(`${T}: header does not print the infinitive`);
        } else {
          const rows = [...t.querySelectorAll('[data-lcs-row]')];
          if (rows.length < 2) fails.push(`${T}: ${rows.length} verb rows`);
          rows.forEach((r) => {
            const v = r.dataset.lcsVerb;
            if (verbsOnPage.has(fold(v))) fails.push(`verb "${v}" twice on the page`);
            verbsOnPage.add(fold(v));
            const inf = r.querySelector('[data-lcs-inf]');
            if (!inf || inf.textContent.trim() !== r.dataset.lcsInf) fails.push(`${T}: row ${v} does not print its infinitive`);
            if (!core && !r.querySelector('img')) fails.push(`${T}: row ${v} has no picture`);
            if ((perRow.get(v) || 0) < minPerRow) fails.push(`${T}: row ${v} has ${perRow.get(v) || 0} gaps < ${minPerRow}`);
            if (r.querySelectorAll('[data-lcs-cell]').length !== 2) fails.push(`${T}: row ${v} has ${r.querySelectorAll('[data-lcs-cell]').length} cells, not 2`);
          });
          const cols = [...t.querySelectorAll('[data-lcs-collabel]')].map((l) => l.dataset.lcsCollabel);
          if (cols.length !== 2) fails.push(`${T}: ${cols.length} column labels`);
          cols.forEach((col) => { if ((perCol.get(col) || 0) < minPerCol) fails.push(`${T}: column ${col} has ${perCol.get(col) || 0} gaps < ${minPerCol}`); });
          const want = +root.dataset.lcsTensegaps;
          if (want && hard !== want) fails.push(`${T}: ${hard} gaps, config says ${want}`);
        }
        if (mode === 'persons' && !core && !t.querySelector('[data-lcs-thead] img')) fails.push(`${T}: no action picture in the header`);
      });
      // lanes
      const lanes = [...root.querySelectorAll('[data-lcs-lane]')];
      if (lanes.length !== lanesN) fails.push(`${lanes.length} lanes, config says ${lanesN}`);
      const frames = new Set();
      lanes.forEach((l, i) => {
        const L = `lane ${i + 1}`;
        const verb = l.dataset.lcsVerb, col = l.dataset.lcsCol, form = l.dataset.lcsForm, frame = l.dataset.lcsFrame;
        if (!verb || !col || !form || !frame) fails.push(`${L}: missing stamps`);
        if (frames.has(frame)) fails.push(`${L}: frame ${frame} used twice`);
        frames.add(frame);
        if (l.querySelectorAll('.ws-blankbox').length !== 1) fails.push(`${L}: ${l.querySelectorAll('.ws-blankbox').length} boxes, want 1`);
        if (l.dataset.lcsRender !== 'gap') fails.push(`${L}: render ${l.dataset.lcsRender}`);
        const p = l.querySelector('[data-lcs-sentence]');
        const text = p ? p.textContent : '';
        if (/\{/.test(text)) fails.push(`${L}: unfilled slot`);
        if (toks(text.replace(/\([^)]*\)\s*$/, '')).includes(fold(form))) fails.push(`${L}: the sentence prints its form "${form}"`);
        const h = l.querySelector('[data-lcs-hint]');
        if (hint && !h) fails.push(`${L}: no hint chip`);
        if (!hint && h) fails.push(`${L}: a hint chip at a no-hint level`);
        if (h && fold(h.textContent.replace(/[()]/g, '')) === fold(form)) fails.push(`${L}: the hint equals the form`);
        if (!verbsOnPage.has(fold(verb))) fails.push(`${L}: verb "${verb}" is not on a table`);
        const slot = slots.find((s) => fold(s.verb) === fold(verb) && s.col === col);
        if (!slot) fails.push(`${L}: ${verb}/${col} is not a table cell`);
        else { if (slot.state === 'anchor') fails.push(`${L}: ${verb}/${col} is an anchor cell`); if (fold(slot.form) !== fold(form)) fails.push(`${L}: form "${form}" != the table's "${slot.form}"`); }
        if (!core && !l.querySelector('img')) fails.push(`${L}: no picture`);
      });
      // pictures
      root.querySelectorAll('img').forEach((img) => {
        if (!img.complete || img.naturalWidth === 0) fails.push('a broken picture');
        if (img.hasAttribute('alt') && img.getAttribute('alt')) fails.push('a picture carries alt text');
        if (/(^|\s|%20)(bw|sw|bn|nb|zw|sh|pb|mv|sv)(\/|%2F)/i.test(decodeURIComponent(img.getAttribute('src') || ''))) fails.push('a B&W picture path');
      });
      root.querySelectorAll('.ws-blankbox').forEach((b) => { if (b.textContent.trim()) fails.push('a dashed box carries text'); if (b.getBoundingClientRect().height < 22) fails.push('a box below the 22 px answer floor'); });
      const items = gapsTotal + lanes.length;
      const win = (root.dataset.lcsItems || '8,16').split(',').map(Number);
      if (items < win[0] || items > win[1]) fails.push(`${items} items outside [${win}]`);
      if (!gapsTotal) fails.push('non-vacuity: 0 gaps');
      if (boxH && [...root.querySelectorAll('[data-lcs-cell="gap"] .ws-blankbox')].some((b) => Math.abs(b.getBoundingClientRect().height - boxH) > 0.6)) fails.push(`a gap box is not ${boxH} high`);
      return fails;
    });
  },
};
