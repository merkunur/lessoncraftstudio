/**
 * G1-350 — Fill in the Blank Sentences (nt10-D; family key `cloze`; G1 in en;
 * the national framework NAME + band elsewhere; en L.1.1.b). Design:
 * docs/worksheet-gen/b4-designs/G1-350-cloze.md §2/§5 (critic record
 * _work/G1-350-critic.md; build record _work/G1-350-build.md).
 *
 * "Seven pictures down the left, seven coral boxes floating inside seven lines
 * of text, a dashed bank on top, nothing else." A two-row word bank across the
 * top, seven numbered cream lanes below. Each lane opens with the picture
 * (56 px), then ONE sentence in Nunito 800 18 that runs around a dashed coral
 * box exactly where the picture's name belongs. The child reads the sentence,
 * uses the picture to know WHICH noun, the bank to know HOW it is spelled, and
 * writes it in the box. The answer is never printed.
 *
 * THEMELESS (design §1): the binding pool is the FRAMES, not the nouns — a
 * frame is pinned to one noun by its exclusive predicate and a page needs 6-8
 * frames, so the panel authors 16+ singular frames per locale pinned to nouns
 * from the twelve strong themes and MIXED across themes on every page. The
 * picture per frame is PINNED by the panel (`pic:{theme, noun}`, `picOpened`),
 * rendered via `fileUri(pic.theme, pic.noun)`; `pictureFor` is NEVER called at
 * render (a random candidate would ship a picture nobody opened, the sv #35
 * lesson). No unit axis.
 *
 * THE RULE THAT LOCKS THE TYPE (design §1): a frame is a whole panel literal
 * with exactly one `{gap}` and NO answer text; the code READS the answer
 * literal from the reviewed bank (`answerFor(loc, noun, form)`: `sg` = the
 * vocab singular through displayWord — de keeps the capital; `pl` and every
 * other form = the b3 `objForms` literal of data/b3/locales/instructions.<loc>
 * via bank('instructions', loc)), prints it in the bank and stamps it; the
 * panel never types a noun form. Exclusivity is data: the composer places a
 * frame only when `bank ∩ fits === {answer}` (mechanical, poisoned) and the
 * panel signs `signedExclusive:true` (semantic). The article before the gap is
 * typed INSIDE the frame literal and checked against the locale's article
 * table for the declared case (de: `unique` = the ACCUSATIVE phrase for m nouns
 * and is FORBIDDEN; the gap prints the bare capitalised noun). Nothing
 * inflects; nothing is substituted but `{name}` (fillSlots, where `nameSlot`)
 * and the rendered gap.
 *
 * Difficulty is a CONFIG; every guard keys on the RESOLVED keys (never the
 * level index): rows / picPx / bank / extra / maxChars (frame text, gap removed)
 * / maxGlyphs (answer graphemes) / gapH / nameSlot ('perLocale' reads the bank)
 * / rowMin / rowGap / fontPx. d2 ships: 7 rows, 56 px pictures, a two-row bank
 * of the 7 answers, gapH 40, maxChars 48, maxGlyphs 12.
 *
 * Chrome budget (design §2; MEASURED by the gate — a 3-line title + a 3-line
 * instruction leave 710 px of body, not the README's 722, the G1-352 / G2-317
 * finding): bank two rows 108 + margin 10 = 118 (m), list
 * `repeat(rows, minmax(rowMin px, 1fr))` gap 8. The design's row of 78 gives
 * 118 + 7 x 78 + 48 = 712 > 710, so `rowMin` is 77 (a two-line row measures
 * 77.4 at 1.3 with the 40 box: 63.4 + 10 + 4 — but the row is a GRID track
 * and the lane's grid centres its content; at 710 the tracks resolve to
 * (710 - 118 - 48) / 7 = 77.7 >= 77.4, so nothing clips; recorded in the build
 * report). 118 + 7 x 77 + 48 = 705 <= 710; at one-line chrome the rows open to
 * ~92. At 677 (a four-line fi title) the base is 28 px over, so the fi title
 * of the base is validated <= 3 lines (design §5 rule 13, the gate's PR13).
 *
 * The gap box: ONE width for every box on the page (a per-row width would
 * leak word length): `gapW = clamp(round(1.6 * 10 * maxGlyphsOnPage + 24),
 * 150, 300)` where maxGlyphsOnPage is the longest answer's grapheme count
 * (spaces counted) and 10 px/glyph is the BUILD estimate (measured 9.3-10.2
 * at Nunito 800 18). The box is an inline-block, so a long frame wraps
 * BEFORE or AFTER it, never through it; two lines hold 1062 px, the longest
 * legal frame + the widest box = 860, so a third line cannot happen (verify
 * asserts every sentence <= 64 px).
 *
 * Answer hiding + stamps: root `[data-ws-content][data-lcs-cloze]`
 * data-lcs-mode="base" data-lcs-rows data-lcs-gapw data-lcs-bank (+ -extra);
 * each lane `.ws-lane[data-ws-content]` data-lcs-row data-lcs-frame
 * data-lcs-key data-lcs-form [data-lcs-case] data-lcs-answer; the picture
 * `img[data-lcs-pic=<key>]`; the box `[data-lcs-gapbox]`; the bank pills
 * `[data-lcs-bank-word]` under `[data-lcs-bank-order]`. verify(page) re-checks
 * the STRUCTURE from the stamps (one {gap} rendered per lane, the answer and
 * every bank word absent from every sentence, the picture on the row of its
 * frame and === the key, no key / answer / frame twice, uniform box width >=
 * 150, bank set === answers, bank deranged against the rows, <= 2 pill rows,
 * sentence height <= 64, floors, no stray text, no starter / chip); the node
 * gate (qa/verify-b4-cloze.js) re-derives every stamped answer from the bank
 * (`answerFor`), the `fits` disjointness, the article table, the twin
 * exclusion and the pinned pictures — diff, not trust.
 *
 * PHASE 2 — the five faces (design §3; record _work/G1-350-faces.md): ONE
 * additive `mode` knob (`letters` / `choice` / `plural` / `story` /
 * `match`), dispatched in `_buildWith` BEFORE the base path consumes the RNG
 * so the base's output stays byte-identical (tools/b3-baseline.js). Each face
 * is built by `_build<Face>` (guards on the RESOLVED config, the base
 * composer for the deal, `answerFor` for every literal, {name} filled LAST)
 * and verified by the VERIFY_FACE branch keyed on `data-lcs-mode`:
 *   letters (G1-366)  7 lanes, no bank; the gap = one dashed 44 px letter box per grapheme (letterGap) — SPELL
 *                     (the design's 26 px box is under the G1 element floor 44; 11 x 44 = 526 <= 531; the box
 *                     line wraps the frame to two lines = 84 px, so 7 rows: 7 x 84 + 48 = 636 <= 677 — measured)
 *   choice  (G1-367)  6 lanes; two chips (answer + the panel's same-gender foil) under a one-line sentence — DECIDE, then copy
 *   plural  (G2-349)  8 lanes, no bank, no hint; the picture cloned 2-3 times (cloneGapRow) — PRODUCE the plural
 *   story   (G2-350)  a 9-word bank + 3 three-sentence stories with a SHUFFLED picture strip (storyBlock) — READ ACROSS
 *   match   (G1-368)  6 gap sentences left, 6 deranged pictures right (sentenceMatch) — READ and connect, no writing
 * Every lane face top-anchors its list at the body top and lets the lanes
 * grow to fill it (minmax(rowMin, 1fr)); verify() measures the fill and the
 * blank band inside every lane / block (<= 44, the G1 element floor) — SPARSE
 * is a defect (nt10-D). A locale that refuses a face (`refuse.<mode>`, da
 * plural) THROWS at build: no filler, no en fallback.
 */
'use strict';
const { bank: loadBank, bankModule } = require('../../lib/b4-common.js');
const { bank: b3Bank } = require('../../lib/b3-common.js');
const { fileUri, vocab, displayWord } = require('../../lib/b2-common.js');
const { fillSlots } = require('../../lib/b3-instructions.js');
const { SENTENCES } = require('../../data/b2/sentences.js');
const C4 = require('../../templates/components-b4.js');

const KEY = 'cloze';
const ID = 'G1-350';
const MAX_TRIES = 300;
const FORMS = ['sg', 'pl', 'unique', 'def', 'defPl', 'part', 'gen', 'a2'];
const BW_MARK = /(^|[\s_])(bw|sw|bn|nb|zw|sh|pb|mv|sv)$/i;   // the localized B&W theme marker (§20.5)
const PX_PER_GLYPH = 10;         // the BUILD estimate for the gap width (design §2; measured 9.3-10.2 at Nunito 800 18)
const HAND_FACTOR = 1.6;         // a G1 hand writes at ~1.6 x the printed width (glyphH 26 vs 18 print)
const ELIDED_BEFORE_GAP = /(^|\s)(l'|un'|lo|l’|un’)\s*$/iu;   // fr l' / un' · it lo / l' glued to the gap: off the letters + choice faces (the article would be part of the written answer)

function nfd(s) { return String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, ''); }
function hasWord(text, word) {
  if (!word) return false;
  const w = nfd(word).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp('(?<!\\p{L})' + w + '(?!\\p{L})', 'iu').test(nfd(text));
}
function graphemes(s) { return [...String(s).normalize('NFC')].length; }

/* ------------------------------------------------------------------ pure helpers (the gate imports them) ------------------------------------------------------------------ */

let _forms = new Map();
/** The reviewed objForms of a locale (data/b3/locales/instructions.<loc>.json via the b3 bank). */
function objFormsOf(loc) {
  if (!_forms.has(loc)) {
    const b = b3Bank('instructions', loc);
    if (!b || !b.objForms) throw new Error(`${ID}: bank('instructions', '${loc}') carries no objForms — refuse`);
    _forms.set(loc, b.objForms);
  }
  return _forms.get(loc);
}

/**
 * The answer literal of (noun, form) in a locale — READ, never typed:
 *   sg  -> displayWord(vocab()[noun][loc][0], loc)  (de keeps the capital; every other locale lowercases)
 *   pl  -> objForms[noun].pl
 *   unique | def | defPl | part | gen | a2 -> objForms[noun][form]
 * null / missing / an unknown form -> throws (the frame is REFUSED at validate time, never rendered).
 */
function answerFor(loc, noun, form) {
  if (!FORMS.includes(form)) throw new Error(`${ID}: form "${form}" is not one of ${FORMS.join('|')}`);
  if (form === 'sg') {
    const e = vocab()[noun] && vocab()[noun][loc];
    if (!e || !e[0]) throw new Error(`${ID}: no ${loc} vocab singular for "${noun}" — refuse`);
    return displayWord(e[0], loc);
  }
  const f = objFormsOf(loc)[noun];
  const v = f && f[form];
  if (typeof v !== 'string' || !v.trim()) throw new Error(`${ID}: objForms.${noun}.${form} is missing in ${loc} — refuse`);
  return v;
}

/** The vocab gender code of a noun in a locale (de m/f/n · fr/es/pt/it m/f · nl d/h · sv/da t/n · no m/f/n) or null (en/fi). */
function genderOf(loc, noun) {
  const e = vocab()[noun] && vocab()[noun][loc];
  return (e && e[2]) || null;
}

/** ONE box width for the page: clamp(round(1.6 * 10 * maxGlyphs + 24), 150, max) — max 300 (base) or a face's cap (choice / story 168). */
function gapWidth(answers, opts) {
  if (!Array.isArray(answers) || !answers.length) throw new Error(`${ID}: gapWidth needs answers`);
  const max = opts && opts.max != null ? opts.max : 300;
  if (max < 150 || max > 300) throw new Error(`${ID}: gapWidth max ${max} outside [150, 300]`);
  const maxGlyphs = Math.max(...answers.map(graphemes));
  const w = Math.round(HAND_FACTOR * PX_PER_GLYPH * maxGlyphs + 24);
  // the base clamps at 300 (its glyph filter refuses >= 18-glyph answers first); a face's explicit cap REFUSES above it (a wider box would wrap the one-line row)
  if (opts && opts.max != null && w > max) throw new Error(`${ID}: an answer of ${maxGlyphs} glyphs needs a ${w} px box > the face's cap ${max} — refuse`);
  return Math.max(150, Math.min(max, w));
}

/** The twin group index of a key (the GLOBAL `twins` list) or -1. */
function twinGroupOf(key, twins) {
  const i = twins.findIndex((g) => g.includes(key));
  return i;
}

/** The frames a config admits: no {name} unless nameSlot, text (gap removed) <= maxChars, answer <= maxGlyphs, an answer the bank carries. */
function eligibleFrames(frames, cfg, loc, who) {
  return frames.filter((f) => {
    if (!cfg.nameSlot && /\{name\}/.test(f.text)) return false;
    const bare = f.text.replace('{gap}', '').replace(/\{name\}/g, 'Emma');
    if ([...bare].length > cfg.maxChars) return false;
    let a;
    try { a = answerFor(loc, f.noun, f.form); } catch (e) { return false; }
    if (graphemes(a) > cfg.maxGlyphs) return false;
    return true;
  });
}

/**
 * The resolved base config for (d, bank): guards run on the RESULT. nameSlot
 * 'perLocale' reads the bank; a config outside the G1 floors throws.
 */
function resolveBase(d, bank) {
  const cfg = {
    rows: d.rows, picPx: d.picPx, bank: d.bank !== false, extra: d.extra || 0, maxChars: d.maxChars, maxGlyphs: d.maxGlyphs,
    gapH: d.gapH, nameSlot: d.nameSlot === 'perLocale' ? !!bank.nameSlot : !!d.nameSlot, rowMin: d.rowMin, rowGap: d.rowGap || 8, fontPx: d.fontPx || 18,
    padding: d.padding || '5px 16px',
  };
  if (!Number.isInteger(cfg.rows) || cfg.rows < 6 || cfg.rows > 12) throw new Error(`${ID}: rows ${cfg.rows} outside the G1 window [6, 12]`);
  if (cfg.picPx < 44) throw new Error(`${ID}: picPx ${cfg.picPx} below the G1 element floor 44`);
  if (cfg.gapH < 36) throw new Error(`${ID}: gapH ${cfg.gapH} below 36`);
  if (cfg.fontPx < 16) throw new Error(`${ID}: fontPx ${cfg.fontPx} below 16`);
  if (!cfg.bank && cfg.extra) throw new Error(`${ID}: extra bank words without a bank`);
  if (!(cfg.maxChars > 0) || !(cfg.maxGlyphs > 0) || !(cfg.rowMin > 0)) throw new Error(`${ID}: maxChars / maxGlyphs / rowMin required`);
  return cfg;
}

/**
 * The composer (design §2): over the rng-shuffled frames (sorted by id first, so
 * the deal is locale-neutral: same frame ids, same rows in every locale; only the
 * literals change), take `rows` frames with distinct nouns, distinct answers
 * (toLocaleLowerCase), at most 2 per pic.theme, at most ONE key per global twin
 * group, never both members of a panel `confusable` pair, and `bank ∩ fits ===
 * {answer}` for every taken frame (a frame whose `fits` collides with an
 * already-taken noun — or whose noun sits in an already-taken frame's `fits` —
 * is skipped, the next tried). null = no deal (the caller REFUSES).
 * RNG order: the frame shuffle ONLY — the bank derangement and the names are
 * drawn by the caller afterwards.
 */
function compose(rng, frames, cfg, loc, globals) {
  const twins = globals.twins || [];
  const confusable = (globals.confusable || []).map((p) => p.slice().sort().join('|'));
  const order = rng.shuffle(frames.slice().sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0)));
  const taken = [];
  const nouns = new Set(), answers = new Set(), themes = new Map(), groups = new Set();
  for (const f of order) {
    if (taken.length >= cfg.rows) break;
    if (nouns.has(f.noun)) continue;
    const a = answerFor(loc, f.noun, f.form);
    if (answers.has(a.toLocaleLowerCase(loc))) continue;
    if ((themes.get(f.pic.theme) || 0) >= 2) continue;
    const g = twinGroupOf(f.noun, twins);
    if (g >= 0 && groups.has(g)) continue;
    if ([...nouns].some((n) => confusable.includes([n, f.noun].sort().join('|')))) continue;
    // exclusivity: no taken noun in this frame's fits; this noun in no taken frame's fits
    if (f.fits.some((x) => x !== f.noun && nouns.has(x))) continue;
    if (taken.some((t) => t.fits.includes(f.noun))) continue;
    taken.push(f);
    nouns.add(f.noun); answers.add(a.toLocaleLowerCase(loc)); themes.set(f.pic.theme, (themes.get(f.pic.theme) || 0) + 1);
    if (g >= 0) groups.add(g);
  }
  return taken.length === cfg.rows ? taken : null;
}

/** Picture src for a pinned pic (theme + noun through fileUri; a B&W theme dir is refused). */
function picSrc(pic, key) {
  if (!pic || !pic.theme || !pic.noun) throw new Error(`${ID}: "${key}" has no pinned pic — refuse`);
  if (BW_MARK.test(pic.theme)) throw new Error(`${ID}: "${key}" pins a B&W theme "${pic.theme}" — refuse`);
  return fileUri(pic.theme, pic.noun);
}

/* ------------------------------------------------------------------ verify (page side; self-contained) ------------------------------------------------------------------ */

function VERIFY_BASE() {
  const fails = [];
  const root = document.querySelector('[data-lcs-cloze]');
  if (!root) return ['no cloze root'];
  if (root.dataset.lcsMode !== 'base') return [`mode "${root.dataset.lcsMode}" has no verify branch (Phase 2)`];
  const FLOOR = 44;
  const nfd = (s) => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '');
  const hasWord = (text, word) => { if (!word) return false; const w = nfd(word).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); return new RegExp('(?<!\\p{L})' + w + '(?!\\p{L})', 'iu').test(nfd(text)); };
  const r = (el) => el.getBoundingClientRect();
  const nRows = +root.dataset.lcsRows, gapW = +root.dataset.lcsGapw;
  const lanes = [...root.querySelectorAll('[data-lcs-row]')];
  if (lanes.length !== nRows) fails.push(`${lanes.length} lanes, config says ${nRows}`);
  if (lanes.length < 6 || lanes.length > 12) fails.push(`${lanes.length} lanes outside [6, 12]`);
  const keys = new Set(), answers = new Set(), frames = new Set(), srcs = new Set();
  const answerList = [];
  const widths = [];
  lanes.forEach((ln, i) => {
    const L = `lane ${i + 1}`;
    const n = +ln.dataset.lcsRow, key = ln.dataset.lcsKey, answer = ln.dataset.lcsAnswer, frame = ln.dataset.lcsFrame, form = ln.dataset.lcsForm;
    if (n !== i + 1) fails.push(`${L}: data-lcs-row ${n}`);
    if (!key || !answer || !frame || !form) fails.push(`${L}: missing stamps`);
    const badge = ln.querySelector('[data-lcs-badge]');
    if (!badge || badge.textContent.trim() !== String(i + 1)) fails.push(`${L}: badge "${badge && badge.textContent.trim()}" != ${i + 1}`);
    if (keys.has(key)) fails.push(`${L}: key "${key}" twice on the page`); keys.add(key);
    if (frames.has(frame)) fails.push(`${L}: frame "${frame}" twice`); frames.add(frame);
    const al = answer.toLowerCase();
    if (answers.has(al)) fails.push(`${L}: answer "${answer}" twice`); answers.add(al); answerList.push(answer);
    // the picture: one, the key, complete, >= floor, on the row of its frame
    const imgs = [...ln.querySelectorAll('img[data-lcs-pic]')];
    if (imgs.length !== 1) fails.push(`${L}: ${imgs.length} pictures`);
    const p = ln.querySelector('[data-lcs-sentence]');
    if (!p) fails.push(`${L}: no sentence`);
    imgs.forEach((img) => {
      if (!img.complete || img.naturalWidth === 0) fails.push(`${L}: broken picture`);
      if (img.dataset.lcsPic !== key) fails.push(`${L}: picture "${img.dataset.lcsPic}" != key "${key}"`);
      const b = r(img);
      if (b.width < FLOOR - 0.6 || b.height < FLOOR - 0.6) fails.push(`${L}: picture ${b.width.toFixed(1)} px < ${FLOOR}`);
      if (srcs.has(img.src)) fails.push(`${L}: picture src twice on the page`); srcs.add(img.src);
      if (p) { const pb = r(p); if (b.bottom < pb.top + 4 || b.top > pb.bottom - 4) fails.push(`${L}: the picture is not on the row of its sentence`); }
    });
    if (p) {
      const text = p.textContent;
      if (/\{|\}|___/.test(text)) fails.push(`${L}: an unfilled slot / ___ in "${text.trim()}"`);
      if (hasWord(text, answer)) fails.push(`${L}: the answer "${answer}" is printed in the sentence`);
      const boxes = [...p.querySelectorAll('[data-lcs-gapbox]')];
      if (boxes.length !== 1) fails.push(`${L}: ${boxes.length} gap boxes`);
      boxes.forEach((bx) => {
        if (bx.dataset.lcsSlim) fails.push(`${L}: a slim box on the base`);
        if (bx.textContent.trim()) fails.push(`${L}: the box is not empty`);
        const b = r(bx);
        widths.push(b.width);
        if (b.width < 150 - 0.6) fails.push(`${L}: box ${b.width.toFixed(1)} < 150`);
        if (b.height < 36 - 0.6) fails.push(`${L}: box ${b.height.toFixed(1)} high < 36`);
        if (Math.abs(b.width - gapW) > 1) fails.push(`${L}: box ${b.width.toFixed(1)} != stamped gapW ${gapW}`);
      });
      const ph = r(p).height;
      if (ph > 64.5) fails.push(`${L}: sentence ${ph.toFixed(1)} px high > 64 (a third line)`);
      const fs = parseFloat(getComputedStyle(p).fontSize);
      if (fs < 16) fails.push(`${L}: sentence font ${fs} < 16`);
      if (p.scrollWidth > p.clientWidth + 0.6) fails.push(`${L}: sentence overflows its column`);
    }
    if (ln.querySelector('[data-lcs-starter]')) fails.push(`${L}: a starter glyph on the base`);
    if (ln.querySelector('.ws-achip, [data-lcs-chip], [data-lcs-hint]')) fails.push(`${L}: a chip on the base (an answer printed)`);
    const outside = [...ln.childNodes].filter((x) => x.nodeType === 3).map((x) => x.textContent.trim()).join('');
    if (outside) fails.push(`${L}: stray text "${outside}"`);
    if (ln.scrollHeight > ln.clientHeight + 0.6) fails.push(`${L}: lane content overflows its track by ${(ln.scrollHeight - ln.clientHeight).toFixed(1)} px`);
  });
  if (widths.length && Math.max(...widths) - Math.min(...widths) > 1) fails.push(`gap boxes not uniform: ${widths.map((w) => w.toFixed(1)).join('/')}`);
  // every bank word absent from every sentence (a bank word in a frame = a second answer printed)
  const bankWords = [...root.querySelectorAll('[data-lcs-bank-word]')].map((e) => e.dataset.lcsBankWord);
  lanes.forEach((ln, i) => { const p = ln.querySelector('[data-lcs-sentence]'); if (p) for (const w of bankWords) if (hasWord(p.textContent, w)) fails.push(`lane ${i + 1}: the bank word "${w}" is printed in the sentence`); });
  // the bank
  const hasBank = root.dataset.lcsBank === '1';
  const banner = root.querySelector('[data-lcs-bank-banner]');
  if (hasBank && !banner) fails.push('no bank banner');
  if (!hasBank && banner) fails.push('a bank banner without a bank config');
  if (banner) {
    const pills = [...banner.querySelectorAll('[data-lcs-bank-word]')];
    const extra = +(root.dataset.lcsExtra || 0);
    if (pills.length !== lanes.length + extra) fails.push(`${pills.length} bank pills for ${lanes.length} lanes + ${extra} extra`);
    const words = pills.map((e) => e.dataset.lcsBankWord);
    if (new Set(words.map((w) => w.toLowerCase())).size !== words.length) fails.push('a bank word twice');
    pills.forEach((e) => { if (e.textContent.trim() !== e.dataset.lcsBankWord) fails.push(`a pill prints "${e.textContent.trim()}" not its stamp`); });
    for (const a of answerList) if (!words.some((w) => w.toLowerCase() === a.toLowerCase())) fails.push(`the answer "${a}" is not in the bank`);
    if (!extra) for (const w of words) if (!answers.has(w.toLowerCase())) fails.push(`the bank word "${w}" is no answer on the page`);
    // deranged against the row order: pill i's word != row i's answer; not the reverse
    const inRow = words.map((w) => w.toLowerCase()), rowAns = answerList.map((a) => a.toLowerCase());
    let fixed = 0;
    for (let i = 0; i < Math.min(inRow.length, rowAns.length); i++) if (inRow[i] === rowAns[i]) fixed++;
    if (fixed) fails.push(`the bank is not deranged (${fixed} pills at their row index)`);
    if (!extra && rowAns.length > 2 && inRow.join('|') === rowAns.slice().reverse().join('|')) fails.push('the bank is the reverse of the rows');
    const tops = new Set(pills.map((e) => Math.round(r(e).top)));
    if (tops.size > 2) fails.push(`bank has ${tops.size} pill rows (> 2)`);
    pills.forEach((e) => { const fs = parseFloat(getComputedStyle(e).fontSize); if (fs < 16) fails.push(`bank pill font ${fs} < 16`); });
    if (banner.getBoundingClientRect().bottom > (lanes[0] ? r(lanes[0]).top : Infinity) + 0.6) fails.push('the bank overlaps the first lane');
  }
  if (!lanes.length) fails.push('non-vacuity: 0 lanes');
  return fails;
}

/**
 * verify() for the five faces (page side; self-contained — runs in page.evaluate, no require). Re-derives the STRUCTURE
 * from the stamps + geometry: floors, the answer never printed, the stage top-anchored at the body top AND filling it, and
 * the per-face SPARSE measure (the blank band inside a lane / block / between match items <= 44 = the G1 element floor:
 * a band you could seat another element in). The node gate re-derives the literals (answerFor / fits / foils / clones /
 * strip orders) from the bank.
 */
function VERIFY_FACE() {
  const fails = [];
  const root = document.querySelector('[data-lcs-cloze]');
  if (!root) return ['no cloze root'];
  const mode = root.dataset.lcsMode;
  const FLOOR = 44, BLANK_MAX = 44;
  const nfd = (s) => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '');
  const hasWord = (text, word) => { if (!word) return false; const w = nfd(word).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); return new RegExp('(?<!\\p{L})' + w + '(?!\\p{L})', 'iu').test(nfd(text)); };
  const r = (el) => el.getBoundingClientRect();
  const body = r(document.querySelector('[data-lcs-body]'));
  const foot = r(document.querySelector('.ws-foot')).top;
  const lower = (s) => String(s || '').toLowerCase();
  // the stage: top-anchored at the body top, ending at the body bottom (never a small stage floating in the page)
  const stageOk = (el, what) => {
    const b = r(el);
    const bn = root.querySelector('[data-lcs-bank-banner]');
    const top = bn ? Math.min(r(bn).top, b.top) : b.top;   // the stage = the bank (when there is one) + the list
    if (Math.abs(top - body.top) > 2) fails.push(`${what} top ${Math.round(top - body.top)} px under the body top: the stage floats`);
    if (body.bottom - b.bottom > 2) fails.push(`${what} ends ${Math.round(body.bottom - b.bottom)} px above the body bottom: the stage does not fill the page (sparse)`);
    if (b.bottom > foot + 0.6) fails.push(`${what} reaches ${Math.round(b.bottom)} against the attribution band at ${Math.round(foot)}`);
  };
  const pad = (el) => { const cs = getComputedStyle(el); return parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom); };
  const contentH = (el) => Math.max(0, ...[...el.children].map((c) => r(c).height));
  const bankWords = [...root.querySelectorAll('[data-lcs-bank-word]')].map((e) => e.dataset.lcsBankWord);
  const banner = root.querySelector('[data-lcs-bank-banner]');
  const hasBank = root.dataset.lcsBank === '1';
  if (hasBank && !banner) fails.push('no bank banner');
  if (!hasBank && banner) fails.push(`a bank banner on the ${mode} face (config bank 0)`);
  const checkBank = (answerList, orderText) => {
    if (!banner) return;
    const pills = [...banner.querySelectorAll('[data-lcs-bank-word]')];
    if (pills.length !== answerList.length) fails.push(`${pills.length} bank pills for ${answerList.length} answers`);
    const words = pills.map((e) => e.dataset.lcsBankWord);
    if (new Set(words.map(lower)).size !== words.length) fails.push('a bank word twice');
    pills.forEach((e) => { if (e.textContent.trim() !== e.dataset.lcsBankWord) fails.push(`a pill prints "${e.textContent.trim()}" not its stamp`); if (parseFloat(getComputedStyle(e).fontSize) < 16) fails.push('bank pill font < 16'); });
    for (const a of answerList) if (!words.some((w) => lower(w) === lower(a))) fails.push(`the answer "${a}" is not in the bank`);
    for (const w of words) if (!answerList.some((a) => lower(a) === lower(w))) fails.push(`the bank word "${w}" is no answer on the page`);
    let fixed = 0; for (let i = 0; i < Math.min(words.length, answerList.length); i++) if (lower(words[i]) === lower(answerList[i])) fixed++;
    if (fixed) fails.push(`the bank is not deranged (${fixed} pills at their ${orderText} index)`);
    if (answerList.length > 2 && words.map(lower).join('|') === answerList.map(lower).slice().reverse().join('|')) fails.push(`the bank is the reverse of the ${orderText}s`);
    if (new Set(pills.map((e) => Math.round(r(e).top))).size > 2) fails.push('bank > 2 pill rows');
    const first = root.querySelector('[data-lcs-list], [data-lcs-match]');
    if (first && r(banner).bottom > r(first).top + 0.6) fails.push('the bank overlaps the stage');
  };
  const sentenceChecks = (p, L, answer, maxH) => {
    const text = p.textContent;
    if (/\{|\}|___/.test(text)) fails.push(`${L}: an unfilled slot / ___ in "${text.trim()}"`);
    if (hasWord(text, answer)) fails.push(`${L}: the answer "${answer}" is printed in the sentence`);
    for (const w of bankWords) if (hasWord(text, w)) fails.push(`${L}: the bank word "${w}" is printed in the sentence`);
    const ph = r(p).height;
    if (ph > maxH + 0.5) fails.push(`${L}: sentence ${ph.toFixed(1)} px high > ${maxH}`);
    if (parseFloat(getComputedStyle(p).fontSize) < 16) fails.push(`${L}: sentence font < 16`);
    if (p.scrollWidth > p.clientWidth + 0.6) fails.push(`${L}: sentence overflows its column`);
  };

  /* ---------------- the lane faces: letters / choice / plural ---------------- */
  if (mode === 'letters' || mode === 'choice' || mode === 'plural') {
    const nRows = +root.dataset.lcsRows;
    const list = root.querySelector('[data-lcs-list]');
    if (!list) return ['no lane list'];
    stageOk(list, 'the lane list');
    const lanes = [...root.querySelectorAll('[data-lcs-row]')];
    if (lanes.length !== nRows) fails.push(`${lanes.length} lanes, config says ${nRows}`);
    if (lanes.length < 6 || lanes.length > (mode === 'plural' ? 16 : 12)) fails.push(`${lanes.length} lanes outside the band window`);
    const keys = new Set(), answers = new Set(), frames = new Set(), srcs = new Set();
    const answerList = [], widths = [], foilWords = [];
    let answerFirst = 0;
    const gapW = +root.dataset.lcsGapw;
    const picMin = mode === 'plural' ? Math.max(FLOOR, +root.dataset.lcsClonePx || 0) : Math.max(FLOOR, +root.dataset.lcsPicPx || 0);
    lanes.forEach((ln, i) => {
      const L = `lane ${i + 1}`;
      const n = +ln.dataset.lcsRow, key = ln.dataset.lcsKey, answer = ln.dataset.lcsAnswer, frame = ln.dataset.lcsFrame, form = ln.dataset.lcsForm;
      if (n !== i + 1) fails.push(`${L}: data-lcs-row ${n}`);
      if (!key || !answer || !frame || !form) fails.push(`${L}: missing stamps`);
      const badge = ln.querySelector('[data-lcs-badge]');
      if (!badge || badge.textContent.trim() !== String(i + 1)) fails.push(`${L}: badge "${badge && badge.textContent.trim()}" != ${i + 1}`);
      if (keys.has(key)) fails.push(`${L}: key "${key}" twice on the page`); keys.add(key);
      if (frames.has(frame)) fails.push(`${L}: frame "${frame}" twice`); frames.add(frame);
      if (answers.has(lower(answer))) fails.push(`${L}: answer "${answer}" twice`); answers.add(lower(answer)); answerList.push(answer);
      if (mode === 'plural' && !['pl', 'defPl'].includes(form)) fails.push(`${L}: form "${form}" on the plural face`);
      if (mode !== 'plural' && form !== 'sg') fails.push(`${L}: form "${form}" (the ${mode} face writes the singular)`);
      const p = ln.querySelector('[data-lcs-sentence]');
      if (!p) fails.push(`${L}: no sentence`);
      // the picture(s): the key, complete, >= the floor, on the row of the sentence, one src per key
      const imgs = [...ln.querySelectorAll('img[data-lcs-pic]')];
      if (mode === 'plural') {
        const strip = ln.querySelector('[data-lcs-clones]');
        const c = strip ? +strip.dataset.lcsClones : 0;
        if (!strip) fails.push(`${L}: no clone strip`);
        if (c < 2 || c > 3) fails.push(`${L}: ${c} clones outside 2..3`);
        if (imgs.length !== c) fails.push(`${L}: ${imgs.length} pictures for ${c} clones`);
        if (new Set(imgs.map((im) => im.src)).size > 1) fails.push(`${L}: the clones are not one picture`);
        if (ln.querySelector('.ws-achip, [data-lcs-chip], [data-lcs-hint]')) fails.push(`${L}: a hint chip on the plural face (the other number printed)`);
      } else if (imgs.length !== 1) fails.push(`${L}: ${imgs.length} pictures`);
      imgs.forEach((img, j) => {
        if (!img.complete || img.naturalWidth === 0) fails.push(`${L}: broken picture`);
        if (img.dataset.lcsPic !== key) fails.push(`${L}: picture "${img.dataset.lcsPic}" != key "${key}"`);
        const b = r(img);
        if (b.width < picMin - 0.6 || b.height < picMin - 0.6) fails.push(`${L}: picture ${b.width.toFixed(1)} px < ${picMin}`);
        if (j === 0) { if (srcs.has(img.src)) fails.push(`${L}: picture src twice on the page`); srcs.add(img.src); }
        if (p) { const pb = r(p); if (b.bottom < pb.top + 4 || b.top > pb.bottom - 4) fails.push(`${L}: the picture is not on the row of its sentence`); }
      });
      if (p) {
        const lineH = parseFloat(getComputedStyle(p).lineHeight) || 23.4;
        sentenceChecks(p, L, answer, mode === 'choice' ? 40 : mode === 'letters' ? (+root.dataset.lcsBox || 44) + 2 + lineH : 64);
        const boxes = [...p.querySelectorAll('[data-lcs-gapbox]')];
        const lgs = [...p.querySelectorAll('[data-lcs-lettergap]')];
        if (mode === 'letters') {
          if (boxes.length) fails.push(`${L}: a gap box on the letters face`);
          if (lgs.length !== 1) fails.push(`${L}: ${lgs.length} letter-box runs`);
          const want = [...answer.normalize('NFC')].length;
          lgs.forEach((lg) => {
            const nb = +lg.dataset.lcsBoxes, stamped = +ln.dataset.lcsBoxes;
            if (nb !== want) fails.push(`${L}: ${nb} boxes for "${answer}" (${want} graphemes)`);
            if (stamped !== want) fails.push(`${L}: lane stamps ${stamped} boxes, the answer has ${want}`);
            const rects = lg.querySelectorAll('rect');
            if (rects.length !== nb) fails.push(`${L}: ${rects.length} box rects for ${nb} boxes`);
            rects.forEach((rc) => { if (+rc.getAttribute('width') < 26) fails.push(`${L}: a box ${rc.getAttribute('width')} px < 26`); });
            if (root.dataset.lcsStarter !== '1' && (lg.querySelector('text') || lg.dataset.lcsStarter)) fails.push(`${L}: a letter glyph inside a box (a starter at d2)`);
            if (root.dataset.lcsStarter === '1') { const t = lg.querySelectorAll('text'); if (t.length !== 1) fails.push(`${L}: ${t.length} starters (want 1 at d1)`); }
            if (lg.scrollWidth > lg.clientWidth + 0.6) fails.push(`${L}: the letter run overflows`);
          });
          if (!/^\p{L}+$/u.test(answer)) fails.push(`${L}: the answer "${answer}" is not a single word`);
          if (/[Ĳĳ]/.test(answer)) fails.push(`${L}: the IJ ligature in "${answer}"`);
          if (ln.querySelector('.ws-achip, [data-lcs-chip]')) fails.push(`${L}: a chip on the letters face`);
        } else {
          if (lgs.length) fails.push(`${L}: letter boxes on the ${mode} face`);
          if (boxes.length !== 1) fails.push(`${L}: ${boxes.length} gap boxes`);
          boxes.forEach((bx) => {
            if (bx.dataset.lcsSlim) fails.push(`${L}: a slim box`);
            if (bx.textContent.trim()) fails.push(`${L}: the box is not empty`);
            const b = r(bx);
            widths.push(b.width);
            if (b.width < 150 - 0.6) fails.push(`${L}: box ${b.width.toFixed(1)} < 150`);
            if (b.height < 36 - 0.6) fails.push(`${L}: box ${b.height.toFixed(1)} high < 36`);
            if (Math.abs(b.width - gapW) > 1) fails.push(`${L}: box ${b.width.toFixed(1)} != stamped gapW ${gapW}`);
          });
          if (mode === 'choice' && gapW > 168) fails.push(`gapW ${gapW} > 168 (the one-line row)`);
        }
      }
      if (mode === 'choice') {
        const strip = ln.querySelector('[data-lcs-chips]');
        const chips = [...ln.querySelectorAll('[data-lcs-chip]')];
        if (!strip) fails.push(`${L}: no chip strip`);
        if (chips.length !== 2) fails.push(`${L}: ${chips.length} chips (want 2)`);
        if (new Set(chips.map((c) => lower(c.dataset.lcsChip))).size !== chips.length) fails.push(`${L}: duplicate chips`);
        const ans = chips.filter((c) => c.dataset.lcsRole === 'answer');
        if (ans.length !== 1) fails.push(`${L}: ${ans.length} answer chips`);
        if (ans[0] && ans[0].dataset.lcsChip !== answer) fails.push(`${L}: the answer chip "${ans[0].dataset.lcsChip}" != the stamped answer "${answer}"`);
        const idx = strip ? +strip.dataset.lcsIdx : -1;
        if (ans[0] && chips.indexOf(ans[0]) !== idx) fails.push(`${L}: data-lcs-idx ${idx} != the answer chip position ${chips.indexOf(ans[0])}`);
        if (idx === 0) answerFirst++;
        chips.forEach((c) => {
          if (c.textContent.trim() !== c.dataset.lcsChip) fails.push(`${L}: a chip prints "${c.textContent.trim()}" not its stamp`);
          if (c.children.length) fails.push(`${L}: a chip carries a child (pre-marked)`);
          const b = r(c);
          if (b.height < 44 - 0.6) fails.push(`${L}: chip ${b.height.toFixed(1)} px high < 44`);
          if (parseFloat(getComputedStyle(c).fontSize) < 16) fails.push(`${L}: chip font < 16`);
          if (c.dataset.lcsRole === 'foil') { foilWords.push(c.dataset.lcsChip); if (lower(c.dataset.lcsChip) === lower(answer)) fails.push(`${L}: the foil equals the answer`); }
          const lb = r(ln); if (b.right > lb.right + 0.6 || b.bottom > lb.bottom + 0.6) fails.push(`${L}: a chip leaves its lane`);
        });
        const cs = chips.map((c) => getComputedStyle(c));
        if (cs.length === 2 && (cs[0].borderColor !== cs[1].borderColor || cs[0].backgroundColor !== cs[1].backgroundColor || cs[0].borderWidth !== cs[1].borderWidth)) fails.push(`${L}: the two chips are styled differently (one pre-marked)`);
        if (strip && p && r(strip).top < r(p).bottom - 0.6) fails.push(`${L}: the chips overlap the sentence line`);
        if (ln.dataset.lcsFoil && ln.dataset.lcsFoil === key) fails.push(`${L}: the foil key is the lane's key`);
      } else if (ln.querySelector('[data-lcs-chips]')) fails.push(`${L}: a chip strip on the ${mode} face`);
      if (root.dataset.lcsStarter !== '1' && ln.querySelector('[data-lcs-starter]')) fails.push(`${L}: a starter glyph`);
      const outside = [...ln.childNodes].filter((x) => x.nodeType === 3).map((x) => x.textContent.trim()).join('');
      if (outside) fails.push(`${L}: stray text "${outside}"`);
      if (ln.scrollHeight > ln.clientHeight + 0.6) fails.push(`${L}: lane content overflows its track by ${(ln.scrollHeight - ln.clientHeight).toFixed(1)} px`);
      // SPARSE: the blank band inside the lane (its inner height minus the tallest content block) <= 44
      const blank = ln.clientHeight - pad(ln) - contentH(ln);
      if (blank > BLANK_MAX) fails.push(`${L}: ${Math.round(blank)} px of blank band inside the lane > ${BLANK_MAX} (sparse)`);
    });
    if (widths.length && Math.max(...widths) - Math.min(...widths) > 1) fails.push(`gap boxes not uniform: ${widths.map((w) => w.toFixed(1)).join('/')}`);
    if (mode === 'choice') {
      const hi = Math.ceil(lanes.length / 2);
      if (answerFirst < 2 || answerFirst > hi) fails.push(`the answer chip is first on ${answerFirst} rows (want [2, ${hi}])`);
      const keyList = [...keys];
      lanes.forEach((ln, i) => { if (ln.dataset.lcsFoil && keyList.includes(ln.dataset.lcsFoil)) fails.push(`lane ${i + 1}: the foil "${ln.dataset.lcsFoil}" is a key on the page`); });
      for (const w of foilWords) { if (answerList.some((a) => lower(a) === lower(w))) fails.push(`the foil "${w}" is an answer on the page`); lanes.forEach((ln, i) => { const p = ln.querySelector('[data-lcs-sentence]'); if (p && hasWord(p.textContent, w)) fails.push(`lane ${i + 1}: the foil "${w}" is printed in the sentence`); }); }
    }
    // lane answers also never printed in ANOTHER lane's sentence (a second answer on the row)
    lanes.forEach((ln, i) => { const p = ln.querySelector('[data-lcs-sentence]'); if (!p) return; answerList.forEach((a, j) => { if (j !== i && hasWord(p.textContent, a)) fails.push(`lane ${i + 1}: lane ${j + 1}'s answer "${a}" is printed`); }); });
    checkBank(answerList, 'row');
    if (!lanes.length) fails.push('non-vacuity: 0 lanes');
    return fails;
  }

  /* ---------------- the story face ---------------- */
  if (mode === 'story') {
    const nStories = +root.dataset.lcsStories;
    const list = root.querySelector('[data-lcs-list]');
    if (!list) return ['no story list'];
    stageOk(list, 'the story list');
    const blocks = [...root.querySelectorAll('[data-lcs-story]')];
    if (blocks.length !== nStories) fails.push(`${blocks.length} blocks, config says ${nStories}`);
    if (blocks.length < 2 || blocks.length > 4) fails.push(`${blocks.length} blocks outside [2, 4]`);
    const gapW = +root.dataset.lcsGapw, picMin = Math.max(36, +root.dataset.lcsPicPx || 0), shuffle = root.dataset.lcsShuffle === '1';
    const allAnswers = [], allKeys = new Set(), lines = [], widths = [], srcs = new Set();
    blocks.forEach((bk, bi) => {
      const B = `block ${bi + 1}`;
      if (+bk.dataset.lcsStory !== bi + 1) fails.push(`${B}: data-lcs-story ${bk.dataset.lcsStory}`);
      const badge = bk.querySelector('[data-lcs-badge]');
      if (!badge || badge.textContent.trim() !== String(bi + 1)) fails.push(`${B}: badge != ${bi + 1}`);
      const keys = (bk.dataset.lcsKeys || '').split(',');
      if (keys.length !== 3 || new Set(keys).size !== 3) fails.push(`${B}: keys "${bk.dataset.lcsKeys}" are not three distinct`);
      keys.forEach((k) => { if (allKeys.has(k)) fails.push(`${B}: key "${k}" twice on the page`); allKeys.add(k); });
      const strip = bk.querySelector('[data-lcs-strip-order]');
      const order = strip ? strip.dataset.lcsStripOrder.split(',').map(Number) : [];
      if (order.slice().sort().join(',') !== '0,1,2') fails.push(`${B}: strip order "${strip && strip.dataset.lcsStripOrder}" is not a permutation of 0..2`);
      if (shuffle && order.join(',') === '0,1,2') fails.push(`${B}: strip not shuffled (in sentence order: the answers' positions printed)`);
      const pics = [...bk.querySelectorAll('img[data-lcs-strip-pic]')];
      if (pics.length !== 3) fails.push(`${B}: ${pics.length} strip pictures`);
      pics.forEach((img, j) => {
        if (!img.complete || img.naturalWidth === 0) fails.push(`${B}: broken picture`);
        const b = r(img); if (b.width < picMin - 0.6 || b.height < picMin - 0.6) fails.push(`${B}: picture ${b.width.toFixed(1)} < ${picMin}`);
        if (order[j] != null && img.dataset.lcsPic !== keys[order[j]]) fails.push(`${B}: strip picture ${j + 1} is "${img.dataset.lcsPic}", the order says ${keys[order[j]]}`);
        if (srcs.has(img.src)) fails.push(`${B}: picture src twice on the page`); srcs.add(img.src);
      });
      const ps = [...bk.querySelectorAll('[data-lcs-sentence]')];
      if (ps.length !== 3) fails.push(`${B}: ${ps.length} sentences`);
      ps.forEach((p, li) => {
        const L = `${B} line ${li + 1}`;
        if (+p.dataset.lcsLine !== li) fails.push(`${L}: data-lcs-line ${p.dataset.lcsLine}`);
        if (p.dataset.lcsKey !== keys[li]) fails.push(`${L}: key "${p.dataset.lcsKey}" != keys[${li}] "${keys[li]}"`);
        const answer = p.dataset.lcsAnswer;
        if (!answer) fails.push(`${L}: no answer stamp`);
        sentenceChecks(p, L, answer, 40);
        allAnswers.push(answer); lines.push({ p, answer, L });
        const boxes = [...p.querySelectorAll('[data-lcs-gapbox]')];
        if (boxes.length !== 1) fails.push(`${L}: ${boxes.length} gap boxes`);
        boxes.forEach((bx) => { const b = r(bx); widths.push(b.width); if (bx.textContent.trim()) fails.push(`${L}: the box is not empty`); if (b.height < 36 - 0.6) fails.push(`${L}: box ${b.height.toFixed(1)} high < 36`); if (Math.abs(b.width - gapW) > 1 || b.width < 150 - 0.6) fails.push(`${L}: box ${b.width.toFixed(1)} vs gapW ${gapW}`); });
      });
      if (bk.querySelector('.ws-achip, [data-lcs-chip], [data-lcs-starter], [data-lcs-lettergap]')) fails.push(`${B}: a chip / starter / letter box on the story face`);
      const outside = [...bk.childNodes].filter((x) => x.nodeType === 3).map((x) => x.textContent.trim()).join('');
      if (outside) fails.push(`${B}: stray text "${outside}"`);
      if (bk.scrollHeight > bk.clientHeight + 0.6) fails.push(`${B}: block content overflows its track by ${(bk.scrollHeight - bk.clientHeight).toFixed(1)} px`);
      // SPARSE: the blank band inside the block (inner height minus strip + gap + the three lines) <= 44
      const inner = [...bk.children].reduce((s, c) => s + r(c).height, 0) + 8 * Math.max(0, bk.children.length - 1);
      const blank = bk.clientHeight - pad(bk) - inner;
      if (blank > BLANK_MAX) fails.push(`${B}: ${Math.round(blank)} px of blank band inside the block > ${BLANK_MAX} (sparse)`);
    });
    if (widths.length && Math.max(...widths) - Math.min(...widths) > 1) fails.push('gap boxes not uniform');
    if (gapW > 168) fails.push(`gapW ${gapW} > 168 (the one-line story sentence)`);
    if (new Set(allAnswers.map(lower)).size !== allAnswers.length) fails.push('an answer twice on the story page');
    // no line prints ANY answer of the page (its own is checked above; the other eight are the other pictures' names)
    lines.forEach(({ p, L }) => allAnswers.forEach((a) => { if (hasWord(p.textContent, a) && lower(a) !== lower(p.dataset.lcsAnswer)) fails.push(`${L}: the answer "${a}" of another line is printed`); }));
    checkBank(allAnswers, 'line');
    if (!blocks.length) fails.push('non-vacuity: 0 blocks');
    return fails;
  }

  /* ---------------- the match face ---------------- */
  if (mode === 'match') {
    const pairs = +root.dataset.lcsPairs;
    const m = root.querySelector('[data-lcs-match]');
    if (!m) return ['no match root'];
    stageOk(m, 'the match block');
    const left = [...m.querySelectorAll('[data-lcs-match-left]')], right = [...m.querySelectorAll('[data-lcs-match-right]')];
    if (left.length !== pairs || right.length !== pairs) fails.push(`${left.length} left / ${right.length} right items, config says ${pairs}`);
    if (pairs < 4 || pairs > 8) fails.push(`${pairs} pairs outside [4, 8]`);
    const picMin = Math.max(56, +root.dataset.lcsPicPx || 0), itemH = +root.dataset.lcsItemH || 74, itemMax = +root.dataset.lcsItemMax || 0;
    const lKeys = left.map((e) => e.dataset.lcsKey), rKeys = right.map((e) => e.dataset.lcsMatchRight);
    if (new Set(lKeys).size !== lKeys.length) fails.push('a key twice on the left');
    if (lKeys.slice().sort().join(',') !== rKeys.slice().sort().join(',')) fails.push(`the right keys (${rKeys.join(',')}) are not the left answers' keys (${lKeys.join(',')})`);
    rKeys.forEach((k, i) => { if (k === lKeys[i]) fails.push(`right item ${i + 1} sits straight across from its sentence (not a derangement)`); });
    const stampedOrder = (root.dataset.lcsOrder || '').split(',').map(Number);
    if (stampedOrder.length === pairs && stampedOrder.some((o, i) => lKeys[o] !== rKeys[i])) fails.push('the stamped order does not match the right column');
    const answers = left.map((e) => e.dataset.lcsAnswer);
    if (new Set(answers.map(lower)).size !== answers.length) fails.push('an answer twice');
    const srcs = new Set();
    left.forEach((it, i) => {
      const L = `left ${i + 1}`;
      if (it.querySelector('img')) fails.push(`${L}: a picture inside a sentence item (the picture is the answer)`);
      const t = it.querySelector('[data-lcs-match-text]');
      if (!t) { fails.push(`${L}: no text`); return; }
      const text = t.textContent;
      if (/\{|\}|___/.test(text)) fails.push(`${L}: an unfilled slot in "${text.trim()}"`);
      answers.forEach((a, j) => { if (hasWord(text, a)) fails.push(`${L}: the answer "${a}"${j === i ? '' : ` (of sentence ${j + 1})`} is printed`); });
      if (parseFloat(getComputedStyle(t).fontSize) < 16) fails.push(`${L}: text font < 16`);
      const boxes = [...t.querySelectorAll('[data-lcs-gapbox]')];
      if (boxes.length !== 1 || !boxes[0].dataset.lcsSlim) fails.push(`${L}: ${boxes.length} slim blanks`);
      if (boxes[0] && boxes[0].textContent.trim()) fails.push(`${L}: the blank is not empty`);
      if (!it.querySelector('.ws-match-dot--right')) fails.push(`${L}: no dot`);
      const b = r(it), tb = r(t);
      if (tb.bottom > b.bottom + 0.6 || tb.right > b.right + 0.6) fails.push(`${L}: the text leaves its item`);
      if (b.height < itemH - 0.6) fails.push(`${L}: item ${b.height.toFixed(1)} < ${itemH}`);
      if (t.textContent.trim().length === 0) fails.push(`${L}: empty sentence`);
      if (itemMax && b.height > itemMax + 0.6) fails.push(`${L}: item ${b.height.toFixed(1)} > itemMax ${itemMax}`);
    });
    right.forEach((it, i) => {
      const R = `right ${i + 1}`;
      const imgs = [...it.querySelectorAll('img')];
      if (imgs.length !== 1) fails.push(`${R}: ${imgs.length} pictures`);
      imgs.forEach((img) => { if (!img.complete || img.naturalWidth === 0) fails.push(`${R}: broken picture`); if (img.dataset.lcsPic !== it.dataset.lcsMatchRight) fails.push(`${R}: picture "${img.dataset.lcsPic}" != key`); const b = r(img); if (b.width < picMin - 0.6 || b.height < picMin - 0.6) fails.push(`${R}: picture ${b.width.toFixed(1)} < ${picMin}`); if (srcs.has(img.src)) fails.push(`${R}: picture src twice`); srcs.add(img.src); });
      if (it.textContent.trim()) fails.push(`${R}: a word inside a picture item ("${it.textContent.trim()}")`);
      if (!it.querySelector('.ws-match-dot--left')) fails.push(`${R}: no dot`);
      const b = r(it); if (b.height < itemH - 0.6) fails.push(`${R}: item ${b.height.toFixed(1)} < ${itemH}`);
    });
    // SPARSE: the band between consecutive items in a column <= 44, and the slack under the last item <= 44 + the 6 px block padding
    for (const col of [left, right]) for (let i = 1; i < col.length; i++) { const band = r(col[i]).top - r(col[i - 1]).bottom; if (band > BLANK_MAX) fails.push(`${Math.round(band)} px between items ${i} and ${i + 1} > ${BLANK_MAX} (sparse)`); }
    if (left.length && right.length) { const last = Math.max(...left.concat(right).map((e) => r(e).bottom)); if (foot - last > BLANK_MAX + 6) fails.push(`${Math.round(foot - last)} px of slack under the last item > ${BLANK_MAX + 6} (sparse)`); }
    if (left.length && right.length) { const dl = r(left[0].querySelector('.ws-match-dot--right')), dr = r(right[0].querySelector('.ws-match-dot--left')); if (dr.left - dl.right < 80) fails.push(`line zone ${Math.round(dr.left - dl.right)} px < 80`); }
    if (m.querySelector('.ws-achip, [data-lcs-chip], [data-lcs-starter], [data-lcs-lettergap], svg line, svg path')) fails.push('a chip / starter / letter box / pre-drawn line on the match face');
    if (bankWords.length) fails.push('a bank on the match face');
    if (!left.length) fails.push('non-vacuity: 0 pairs');
    return fails;
  }
  return [`mode "${mode}" has no verify branch`];
}

module.exports = {
  id: ID,
  slug: 'fill-in-the-blank-sentences',
  gradeBand: 'G1',
  assetClass: 'icon-placement',
  exerciseType: KEY,
  themeAxis: { applicable: false },
  unitAxis: { applicable: false },
  difficulty: {
    1: { rows: 6, picPx: 64, bank: true, extra: 0, maxChars: 34, maxGlyphs: 8, gapH: 44, nameSlot: false, rowMin: 82, rowGap: 8, fontPx: 18 },
    // DEVIATION (measured, _work/G1-350-build.md): the design's rowMin 78 gives 118 + 7 x 78 + 48 = 712 > the measured 710 chrome; 77 fits (705)
    2: { rows: 7, picPx: 56, bank: true, extra: 0, maxChars: 48, maxGlyphs: 12, gapH: 40, nameSlot: 'perLocale', rowMin: 77, rowGap: 7, fontPx: 18 },
    3: { rows: 7, picPx: 56, bank: true, extra: 2, maxChars: 60, maxGlyphs: 14, gapH: 40, nameSlot: 'perLocale', rowMin: 77, rowGap: 7, fontPx: 18 },
  },
  i18n: {
    en: {
      title: 'Fill in the Blank Sentences',
      instruction: 'Look at the picture. Find the word that fits the sentence in the word bank and write it in the box.',
    },
  },
  answerFor, genderOf, gapWidth, twinGroupOf, eligibleFrames, resolveBase, compose, objFormsOf, hasWord, graphemes, FORMS,

  build({ theme, difficulty, locale }, ctx) {
    const loc = (locale || 'en').slice(0, 2);
    const all = bankModule(KEY);
    return this._buildWith(loadBank(KEY, loc), this.difficulty[difficulty], { theme, locale: loc, globals: { twins: all.twins, excludeKeys: all.excludeKeys } }, ctx);
  },

  /** The whole build over an INJECTED bank + resolved config (the gate's poison seam); build() passes the real ones. */
  _buildWith(bank, d, { locale, globals }, ctx) {
    if (!d) throw new Error(`${ID}: no difficulty config`);
    const rng = ctx.rng;
    const loc = (locale || 'en').slice(0, 2);
    const G = globals || { twins: bankModule(KEY).twins, excludeKeys: bankModule(KEY).excludeKeys };
    if (!bank || !Array.isArray(bank.frames) || bank.frames.length < 8) throw new Error(`${ID}: the ${loc} bank has < 8 frames`);
    if (!bank.strings || !bank.strings.base) throw new Error(`${ID}: the ${loc} bank has no strings.base`);
    // Phase 2 faces — the additive `mode` knob, dispatched BEFORE the base path touches the RNG
    if (d.mode && d.mode !== 'base') return this._buildFace(bank, d, { locale: loc, globals: G }, ctx);
    const cfg = resolveBase(d, bank);
    const gl = { twins: G.twins, confusable: bank.confusable || [] };
    const excluded = new Set(G.excludeKeys || []);
    const pool = eligibleFrames(bank.frames, cfg, loc, ID).filter((f) => !excluded.has(f.noun));
    if (pool.length < cfg.rows) throw new Error(`${ID}: ${loc} has ${pool.length} eligible frames for ${cfg.rows} rows (maxChars ${cfg.maxChars}, maxGlyphs ${cfg.maxGlyphs}, nameSlot ${cfg.nameSlot}) — REFUSED`);
    let taken = null;
    for (let t = 0; t < MAX_TRIES && !taken; t++) taken = compose(rng, pool, cfg, loc, gl);
    if (!taken) throw new Error(`${ID}: ${loc} cannot compose ${cfg.rows} exclusive frames from ${pool.length} (fits / twins / themes) — REFUSED`);
    const answers = taken.map((f) => answerFor(loc, f.noun, f.form));
    // d3 extras: frame-invalid bank words from fits-disjoint pool nouns (never an answer, never in any taken frame's fits)
    let extras = [];
    if (cfg.extra) {
      const takenNouns = new Set(taken.map((f) => f.noun));
      const cands = pool.filter((f) => !takenNouns.has(f.noun) && !taken.some((t) => t.fits.includes(f.noun)) && !f.fits.some((x) => takenNouns.has(x)))
        .map((f) => answerFor(loc, f.noun, f.form)).filter((a, i, arr) => arr.indexOf(a) === i && !answers.some((x) => x.toLocaleLowerCase(loc) === a.toLocaleLowerCase(loc)));
      if (cands.length < cfg.extra) throw new Error(`${ID}: ${loc} has ${cands.length} frame-invalid extras for ${cfg.extra} — REFUSED`);
      extras = rng.sample(cands, cfg.extra);
    }
    const bankWords = answers.concat(extras);
    const bankOrder = cfg.bank ? C4.derange(bankWords.map((_, i) => i), rng) : null;
    // names LAST (locale-dependent count of {name} frames must not move the deal)
    const names = (SENTENCES[loc] && SENTENCES[loc].names) || [];
    const rows = taken.map((f, i) => {
      const slots = {};
      const nameCount = (f.text.match(/\{name\}/g) || []).length;
      if (nameCount) {
        if (!cfg.nameSlot) throw new Error(`${ID}: frame ${f.id} carries {name} but nameSlot is off`);
        if (!names.length) throw new Error(`${ID}: no SENTENCES.${loc}.names for {name}`);
        slots.name = Array.from({ length: nameCount }, () => rng.pick(names));
      }
      // {gap} is not a fillSlots slot: park it, fill {name}, restore
      const text = fillSlots(f.text.replace('{gap}', ''), slots).replace('', '{gap}');
      return { f, text, answer: answers[i], name: slots.name ? slots.name.join('+') : '' };
    });
    const gapW = gapWidth(bankWords.length ? bankWords : answers);
    const list = rows.map((row, i) => C4.gapRow({
      n: i + 1, src: picSrc(row.f.pic, row.f.noun), key: row.f.noun, frameId: row.f.id, form: row.f.form, kase: row.f.case || null,
      text: row.text, answer: row.answer, slot: C4.gapBox({ w: gapW, h: cfg.gapH }), picPx: cfg.picPx, fontPx: cfg.fontPx, padding: cfg.padding,
    })).join('');
    const bankHtml = cfg.bank ? C4.gapBank({ words: bankWords, order: bankOrder, wordPx: 18 }) : '';
    const bodyHtml = `<div data-ws-content data-lcs-cloze data-lcs-mode="base" data-lcs-rows="${cfg.rows}" data-lcs-gapw="${gapW}" data-lcs-bank="${cfg.bank ? 1 : 0}"${cfg.extra ? ` data-lcs-extra="${cfg.extra}"` : ''} ` +
      `style="flex:1 1 auto;display:flex;flex-direction:column;min-height:0">${bankHtml}` +
      `<div data-lcs-list style="flex:1 1 auto;display:grid;grid-template-rows:repeat(${cfg.rows},minmax(${cfg.rowMin}px,1fr));row-gap:${cfg.rowGap}px;min-height:0">${list}</div></div>`;
    return {
      bodyHtml,
      meta: {
        face: 'base', gapW, bankOrder, extras,
        rows: rows.map((r) => [r.f.id, r.f.noun, r.f.form, r.answer, r.f.pic.theme, r.name]),
      },
    };
  },

  /* ================================================================== Phase 2: the five faces (design §3) ================================================================== */

  /**
   * The additive `mode` knob: `letters` / `choice` / `plural` / `story` / `match`, dispatched by _buildWith BEFORE the base path
   * touches the RNG (the base's output stays byte-identical). Every face reads its answers through `answerFor` (never typed),
   * deals its frames through the base composer (bank ∩ fits === {answer}, <= 1 key per twin group, no confusable pair, <= 2 per
   * theme) and fills {name} LAST; every guard keys on the RESOLVED config. A locale that refuses a face (`refuse.<mode>`) or lacks
   * its strings THROWS: no filler, no en fallback.
   */
  _buildFace(bank, d, { locale, globals }, ctx) {
    const fn = { letters: '_buildLetters', choice: '_buildChoice', plural: '_buildPlural', story: '_buildStory', match: '_buildMatch' }[d.mode];
    if (!fn) throw new Error(`${ID}: unknown mode "${d.mode}" (letters | choice | plural | story | match)`);
    if (!ctx || !ctx.rng) throw new Error(`${ID}: no rng in ctx`);
    if (bank.refuse && bank.refuse[d.mode] === true) throw new Error(`${ID}: ${locale} REFUSES the ${d.mode} face (refuse.${d.mode}: the record, never a filler)`);
    if (!bank.strings[d.mode] || !bank.strings[d.mode].title) throw new Error(`${ID}: the ${locale} bank has no strings.${d.mode} — refuse`);
    return this[fn](bank, d, locale, globals, ctx.rng);
  },

  /** The composer over a pool under a face's rows + an extra page predicate (`extraOk(taken)`); MAX_TRIES then REFUSED. */
  _deal(rng, pool, cfg, loc, gl, extraOk, what) {
    if (pool.length < cfg.rows) throw new Error(`${ID}: ${loc} has ${pool.length} eligible frames for ${cfg.rows} ${what} rows — REFUSED`);
    for (let t = 0; t < MAX_TRIES; t++) {
      const taken = compose(rng, pool, cfg, loc, gl);
      if (taken && (!extraOk || extraOk(taken))) return taken;
    }
    throw new Error(`${ID}: ${loc} cannot compose ${cfg.rows} exclusive ${what} frames from ${pool.length} (fits / twins / themes / foils) — REFUSED`);
  },

  /** {name} filled LAST (one rng.pick per slot; the SENTENCES names); {gap} parked so the shared fillSlots never sees it. */
  _fillNames(text, cfg, loc, rng, frameId) {
    const nameCount = (text.match(/\{name\}/g) || []).length;
    if (!nameCount) return { text, name: '' };
    if (!cfg.nameSlot) throw new Error(`${ID}: frame ${frameId} carries {name} but nameSlot is off`);
    const names = (SENTENCES[loc] && SENTENCES[loc].names) || [];
    if (!names.length) throw new Error(`${ID}: no SENTENCES.${loc}.names for {name}`);
    const picked = Array.from({ length: nameCount }, () => rng.pick(names));
    return { text: fillSlots(text.replace('{gap}', '\u0001'), { name: picked }).replace('\u0001', '{gap}'), name: picked.join('+') };
  },

  _faceRoot(mode, cfg, attrs, inner) {
    return `<div data-ws-content data-lcs-cloze data-lcs-mode="${mode}" ${attrs} style="flex:1 1 auto;display:flex;flex-direction:column;min-height:0">${inner}</div>`;
  },

  _laneList(rows, rowMin, rowGap, list) {
    // the lanes GROW to fill the body (minmax(rowMin, 1fr)): the stage is top-anchored at the body top and ends at its bottom — verify measures both
    return `<div data-lcs-list style="flex:1 1 auto;display:grid;grid-template-rows:repeat(${rows},minmax(${rowMin}px,1fr));row-gap:${rowGap}px;min-height:0">${list}</div>`;
  },

  /**
   * F1 `letters` (G1-366): SPELL the noun without a bank — the same picture-cued frame, the gap a run of dashed letter boxes
   * inside the sentence, one per grapheme (NFC; nl ij = 2, fi long vowel = 2, de ß = 1). Eligibility is a CONFIG guard on the
   * frame: `sg`, ^\p{L}+$, minLetters..maxLetters graphemes, the article outside the gap and not elided (fr l' / it lo, l').
   * d1 = a bank + a starter in box 1 (starterFontPx); d2 ships rows 8, box 26, no bank, no starter.
   */
  _buildLetters(bank, d, loc, G, rng) {
    const cfg = {
      rows: d.rows, picPx: d.picPx, box: d.box, gap: d.gap == null ? 4 : d.gap, starter: !!d.starter, bank: !!d.bank, maxLetters: d.maxLetters, minLetters: d.minLetters == null ? 2 : d.minLetters,
      maxChars: d.maxChars, maxGlyphs: d.maxLetters, fontPx: d.fontPx || 18, rowMin: d.rowMin, rowGap: d.rowGap || 8, nameSlot: d.nameSlot === 'perLocale' ? !!bank.nameSlot : !!d.nameSlot, padding: d.padding || '5px 16px',
      pxPerChar: ['de', 'fi', 'pt'].includes(loc) ? 9.2 : 8.6,
    };
    const longestName = ((SENTENCES[loc] && SENTENCES[loc].names) || ['Emma']).slice().sort((a, b) => graphemes(b) - graphemes(a))[0];
    if (!Number.isInteger(cfg.rows) || cfg.rows < 6 || cfg.rows > 12) throw new Error(`${ID}: letters rows ${cfg.rows} outside the G1 window [6, 12]`);
    if (!(cfg.box >= 44)) throw new Error(`${ID}: letters box ${cfg.box} below the G1 element floor 44 (the design's 26 is a component minimum, not a G1 box)`);
    if (cfg.picPx < 44) throw new Error(`${ID}: letters picPx ${cfg.picPx} below the G1 floor 44`);
    if (!(cfg.maxLetters >= cfg.minLetters && cfg.minLetters >= 1)) throw new Error(`${ID}: letters minLetters / maxLetters`);
    if (cfg.maxLetters * cfg.box + (cfg.maxLetters - 1) * cfg.gap + 2 > 531) throw new Error(`${ID}: ${cfg.maxLetters} boxes of ${cfg.box} exceed the 531 sentence column`);
    if (!(cfg.maxChars > 0) || !(cfg.rowMin > 0) || cfg.fontPx < 16) throw new Error(`${ID}: letters maxChars / rowMin / fontPx`);
    if (!cfg.bank && d.extra) throw new Error(`${ID}: letters extra bank words without a bank`);
    const excluded = new Set(G.excludeKeys || []);
    const gl = { twins: G.twins, confusable: bank.confusable || [] };
    const pool = eligibleFrames(bank.frames, cfg, loc, ID).filter((f) => {
      if (excluded.has(f.noun) || f.form !== 'sg') return false;
      const a = answerFor(loc, f.noun, f.form);
      if (!/^\p{L}+$/u.test(a)) return false;                                   // one word: no space / hyphen / apostrophe
      const n = graphemes(a);
      if (n < cfg.minLetters || n > cfg.maxLetters) return false;
      if (/[Ĳĳ]/.test(a)) return false;                                 // nl: never the IJ ligature (i + j = 2 boxes)
      if (ELIDED_BEFORE_GAP.test(f.text.split('{gap}')[0])) return false;       // fr l' / un' · it lo / l' before the gap
      // two lines at most: the box run (n x box + gaps + 2 + the 8 px margins) wraps as a unit, so the sentence fits when
      // pre + run + post is one line, or pre + run then post, or pre then run + post (px/char: de / fi / pt 9.2, others 8.6)
      const run = n * cfg.box + (n - 1) * cfg.gap + 2 + 8;
      const [pre, post] = f.text.replace(/{name}/g, longestName).split('{gap}');
      const ePre = [...pre].length * cfg.pxPerChar, ePost = [...post].length * cfg.pxPerChar;
      if (!((ePre + run + ePost <= 531) || (ePre + run <= 531 && ePost <= 531) || (ePre <= 531 && run + ePost <= 531))) return false;
      return true;
    });
    const taken = this._deal(rng, pool, cfg, loc, gl, null, 'letters');
    const answers = taken.map((f) => answerFor(loc, f.noun, f.form));
    const bankOrder = cfg.bank ? C4.derange(answers.map((_, i) => i), rng) : null;
    const rows = taken.map((f, i) => ({ f, ...this._fillNames(f.text, cfg, loc, rng, f.id), answer: answers[i] }));
    const list = rows.map((row, i) => {
      const n = graphemes(row.answer);
      const starter = cfg.starter ? [...row.answer.normalize('NFC')][0] : null;
      return C4.gapRow({
        n: i + 1, src: picSrc(row.f.pic, row.f.noun), key: row.f.noun, frameId: row.f.id, form: row.f.form, kase: row.f.case || null,
        text: row.text, answer: row.answer, slot: C4.letterGap({ n, box: cfg.box, gap: cfg.gap, starter }), picPx: cfg.picPx, fontPx: cfg.fontPx, padding: cfg.padding,
        attrs: `data-lcs-boxes="${n}"`,
      });
    }).join('');
    const bankHtml = cfg.bank ? C4.gapBank({ words: answers, order: bankOrder, wordPx: 18 }) : '';
    const attrs = `data-lcs-rows="${cfg.rows}" data-lcs-bank="${cfg.bank ? 1 : 0}" data-lcs-box="${cfg.box}" data-lcs-gap="${cfg.gap}" data-lcs-starter="${cfg.starter ? 1 : 0}" data-lcs-pic-px="${cfg.picPx}" data-lcs-max-letters="${cfg.maxLetters}"`;
    return { bodyHtml: this._faceRoot('letters', cfg, attrs, bankHtml + this._laneList(cfg.rows, cfg.rowMin, cfg.rowGap, list)), meta: { face: 'letters', bankOrder, rows: rows.map((r) => [r.f.id, r.f.noun, r.f.form, r.answer, r.f.pic.theme, r.name, graphemes(r.answer)]) } };
  },

  /**
   * F2 `choice` (G1-367): DECIDE between two printed words and COPY the right one — the frame + picture, then two chips under the
   * sentence (the answer + the panel's frame-valid same-gender foil, `answerFor(foil, 'sg')`), the child circles one and writes it
   * in the 36-high box. The sentence must NOT wrap (row = 36 + 6 + 44 = 86 + 14 = 100): the pool guard is the one-line estimate
   * est(pre) + gapW + est(post) + 12 <= 531 at the locale's px/char (de / fi / pt 9.2, others 8.6) plus maxChars 38 / 40; gapW is
   * capped at 168 (maxGlyphs 9). foilKind: 'near' | 'far' = the panel's foil; 'page' (d3) = another row's answer. The foil is never a
   * noun whose picture is on the page. Chip order per row = rng; answer-first count over the page in [2, ceil(rows / 2)].
   */
  _buildChoice(bank, d, loc, G, rng) {
    const longLoc = ['de', 'fi', 'pt'].includes(loc);
    const maxChars = typeof d.maxChars === 'object' ? (longLoc ? d.maxChars.long : d.maxChars.short) : d.maxChars;
    const cfg = {
      rows: d.rows, chips: d.chips, foilKind: d.foilKind || 'near', write: d.write !== false, gapH: d.gapH || 36, chipPx: d.chipPx || 20, chipH: d.chipH || 44, picPx: d.picPx,
      fontPx: d.fontPx || 18, maxGlyphs: d.maxGlyphs, maxChars, pxPerChar: longLoc ? 9.2 : 8.6, rowMin: d.rowMin, rowGap: d.rowGap || 8, nameSlot: d.nameSlot === 'perLocale' ? !!bank.nameSlot : !!d.nameSlot, padding: d.padding || '5px 16px',
    };
    if (!Number.isInteger(cfg.rows) || cfg.rows < 6 || cfg.rows > 12) throw new Error(`${ID}: choice rows ${cfg.rows} outside the G1 window [6, 12]`);
    if (cfg.chips !== 2) throw new Error(`${ID}: choice chips ${cfg.chips} (the face is a two-way decision)`);
    if (!['near', 'far', 'page'].includes(cfg.foilKind)) throw new Error(`${ID}: foilKind "${cfg.foilKind}"`);
    if (cfg.chipH < 44) throw new Error(`${ID}: chipH ${cfg.chipH} below the G1 floor 44`);
    if (cfg.gapH < 36) throw new Error(`${ID}: choice gapH ${cfg.gapH} below 36`);
    if (cfg.picPx < 44 || cfg.fontPx < 16) throw new Error(`${ID}: choice picPx / fontPx below the floor`);
    if (!(cfg.maxGlyphs > 0 && cfg.maxGlyphs <= 9)) throw new Error(`${ID}: choice maxGlyphs ${cfg.maxGlyphs} (<= 9 keeps gapW <= 168 and the row on one line)`);
    if (!(cfg.maxChars > 0) || !(cfg.rowMin > 0)) throw new Error(`${ID}: choice maxChars / rowMin`);
    if (d.bank) throw new Error(`${ID}: the choice face never prints a bank (the chips are the choice)`);
    const excluded = new Set(G.excludeKeys || []);
    const gl = { twins: G.twins, confusable: bank.confusable || [] };
    const gapMax = 168;
    const oneLine = (f) => {
      const [pre, post] = f.text.replace(/\{name\}/g, 'Emma').split('{gap}');
      return [...pre].length * cfg.pxPerChar + gapMax + [...post].length * cfg.pxPerChar + 12 <= 531;
    };
    const foilOf = (f) => (cfg.foilKind === 'page' ? null : f.foil);
    const pool = eligibleFrames(bank.frames, cfg, loc, ID).filter((f) => {
      if (excluded.has(f.noun) || f.form !== 'sg') return false;                 // the article outside the gap (no unique / def / a2)
      if (ELIDED_BEFORE_GAP.test(f.text.split('{gap}')[0])) return false;
      if (!oneLine(f)) return false;
      if (cfg.foilKind !== 'page') {
        if (!f.foil || f.foil === f.noun || (f.fits || []).includes(f.foil) || excluded.has(f.foil)) return false;
        try { answerFor(loc, f.foil, 'sg'); } catch (e) { return false; }
        const g1 = genderOf(loc, f.noun), g2 = genderOf(loc, f.foil);
        if (g1 && g2 && g1 !== g2) return false;
      }
      return true;
    });
    const taken = this._deal(rng, pool, cfg, loc, gl, (tk) => {
      if (cfg.foilKind === 'page') return true;
      const nouns = new Set(tk.map((f) => f.noun));
      const ans = new Set(tk.map((f) => answerFor(loc, f.noun, f.form).toLocaleLowerCase(loc)));
      return tk.every((f) => !nouns.has(f.foil) && !ans.has(answerFor(loc, f.foil, 'sg').toLocaleLowerCase(loc)));
    }, 'choice');
    const answers = taken.map((f) => answerFor(loc, f.noun, f.form));
    let foils;
    if (cfg.foilKind === 'page') { const o = C4.derange(answers.map((_, i) => i), rng); foils = o.map((i) => ({ key: taken[i].noun, word: answers[i] })); }
    else foils = taken.map((f) => ({ key: f.foil, word: answerFor(loc, f.foil, 'sg') }));
    // chip order: the answer first on [2, ceil(rows/2)] rows
    const lo = 2, hi = Math.ceil(cfg.rows / 2);
    let idx = null;
    for (let t = 0; t < MAX_TRIES && !idx; t++) { const v = taken.map(() => rng.int(0, 1)); const first = v.filter((x) => x === 0).length; if (first >= lo && first <= hi) idx = v; }
    if (!idx) throw new Error(`${ID}: no chip order with the answer first on [${lo}, ${hi}] rows`);
    const rows = taken.map((f, i) => ({ f, ...this._fillNames(f.text, cfg, loc, rng, f.id), answer: answers[i], foil: foils[i], idx: idx[i] }));
    const gapW = gapWidth(answers, { max: gapMax });
    const list = rows.map((row, i) => {
      const chips = row.idx === 0 ? [{ word: row.answer, role: 'answer' }, { word: row.foil.word, role: 'foil' }] : [{ word: row.foil.word, role: 'foil' }, { word: row.answer, role: 'answer' }];
      return C4.gapRow({
        n: i + 1, src: picSrc(row.f.pic, row.f.noun), key: row.f.noun, frameId: row.f.id, form: row.f.form, kase: row.f.case || null,
        text: row.text, answer: row.answer, slot: C4.gapBox({ w: gapW, h: cfg.gapH }), picPx: cfg.picPx, fontPx: cfg.fontPx, padding: cfg.padding,
        attrs: `data-lcs-foil="${row.foil.key}"`, below: C4.choiceGap({ chips, idx: row.idx, px: cfg.chipPx, h: cfg.chipH, ml: 2 }),
      });
    }).join('');
    const attrs = `data-lcs-rows="${cfg.rows}" data-lcs-gapw="${gapW}" data-lcs-bank="0" data-lcs-chips="${cfg.chips}" data-lcs-write="${cfg.write ? 1 : 0}" data-lcs-foil-kind="${cfg.foilKind}" data-lcs-chip-h="${cfg.chipH}" data-lcs-pic-px="${cfg.picPx}" data-lcs-gap-h="${cfg.gapH}"`;
    return { bodyHtml: this._faceRoot('choice', cfg, attrs, this._laneList(cfg.rows, cfg.rowMin, cfg.rowGap, list)), meta: { face: 'choice', gapW, idx, rows: rows.map((r) => [r.f.id, r.f.noun, r.f.form, r.answer, r.f.pic.theme, r.name, r.foil.key, r.foil.word, r.idx]) } };
  },

  /**
   * F3 `plural` (G2-349): PRODUCE the plural — the picture cloned 2-3 times on the row, the frame's predicate agreeing with a
   * plural subject / object, the child writes the plural literal from the picture alone (no bank, no hint chip at d2: a hint
   * would print the noun's OTHER number). Frames come from the separate `plural` list (form pl | defPl); `clones` = the frame's
   * number word when it names one, else rng.int(2, 3). Sentence width 431 (two lines budgeted). da REFUSES (refuse.plural).
   */
  _buildPlural(bank, d, loc, G, rng) {
    const cfg = {
      rows: d.rows, clonePx: d.clonePx || 48, cloneGap: d.cloneGap == null ? 6 : d.cloneGap, colW: d.colW || 156, clones: Array.isArray(d.clones) ? d.clones : [2, 3], bank: !!d.bank, hint: !!d.hint,
      fontPx: d.fontPx || 18, maxChars: d.maxChars, maxGlyphs: d.maxGlyphs, gapH: d.gapH || 40, rowMin: d.rowMin, rowGap: d.rowGap || 8, nameSlot: d.nameSlot === 'perLocale' ? !!bank.nameSlot : !!d.nameSlot,
    };
    if (!Number.isInteger(cfg.rows) || cfg.rows < 6 || cfg.rows > 16) throw new Error(`${ID}: plural rows ${cfg.rows} outside [6, 16]`);
    if (cfg.hint) throw new Error(`${ID}: a plural hint chip prints the singular (the noun's other number) — refused by rule`);
    if (cfg.clonePx < 36) throw new Error(`${ID}: clonePx ${cfg.clonePx} below the G2 floor 36`);
    if (!(cfg.clones[0] >= 2 && cfg.clones[1] <= 3 && cfg.clones[0] <= cfg.clones[1])) throw new Error(`${ID}: clones ${JSON.stringify(cfg.clones)} outside 2..3`);
    if (cfg.gapH < 36 || cfg.fontPx < 16 || !(cfg.maxChars > 0) || !(cfg.maxGlyphs > 0) || !(cfg.rowMin > 0)) throw new Error(`${ID}: plural gapH / fontPx / maxChars / maxGlyphs / rowMin`);
    if (!Array.isArray(bank.plural) || !bank.plural.length) throw new Error(`${ID}: the ${loc} bank has no plural frames — REFUSED`);
    const excluded = new Set(G.excludeKeys || []);
    const gl = { twins: G.twins, confusable: bank.confusable || [] };
    const pool = eligibleFrames(bank.plural, cfg, loc, ID).filter((f) => {
      if (excluded.has(f.noun) || !['pl', 'defPl'].includes(f.form)) return false;
      let sg; try { sg = answerFor(loc, f.noun, 'sg'); } catch (e) { return false; }
      if (sg.toLocaleLowerCase(loc) === answerFor(loc, f.noun, f.form).toLocaleLowerCase(loc)) return false;   // invariant plural (fr bus)
      if (f.clones != null && (f.clones < cfg.clones[0] || f.clones > cfg.clones[1])) return false;
      return true;
    });
    const taken = this._deal(rng, pool, cfg, loc, gl, null, 'plural');
    const answers = taken.map((f) => answerFor(loc, f.noun, f.form));
    const bankOrder = cfg.bank ? C4.derange(answers.map((_, i) => i), rng) : null;
    const clones = taken.map((f) => (f.clones != null ? f.clones : rng.int(cfg.clones[0], cfg.clones[1])));
    const rows = taken.map((f, i) => ({ f, ...this._fillNames(f.text, cfg, loc, rng, f.id), answer: answers[i], clones: clones[i] }));
    const gapW = gapWidth(answers);
    const list = rows.map((row, i) => C4.cloneGapRow({
      n: i + 1, src: picSrc(row.f.pic, row.f.noun), key: row.f.noun, clones: row.clones, clonePx: cfg.clonePx, gap: cfg.cloneGap, colW: cfg.colW,
      text: row.text, answer: row.answer, slot: C4.gapBox({ w: gapW, h: cfg.gapH }), frameId: row.f.id, form: row.f.form, kase: row.f.case || null,
    })).join('');
    const bankHtml = cfg.bank ? C4.gapBank({ words: answers, order: bankOrder, wordPx: 18 }) : '';
    const attrs = `data-lcs-rows="${cfg.rows}" data-lcs-gapw="${gapW}" data-lcs-bank="${cfg.bank ? 1 : 0}" data-lcs-clone-px="${cfg.clonePx}" data-lcs-clones-min="${cfg.clones[0]}" data-lcs-clones-max="${cfg.clones[1]}" data-lcs-gap-h="${cfg.gapH}"`;
    return { bodyHtml: this._faceRoot('plural', cfg, attrs, bankHtml + this._laneList(cfg.rows, cfg.rowMin, cfg.rowGap, list)), meta: { face: 'plural', gapW, bankOrder, rows: rows.map((r) => [r.f.id, r.f.noun, r.f.form, r.answer, r.f.pic.theme, r.name, r.clones]) } };
  },

  /**
   * F4 `story` (G2-350): HOLD a text in mind — `stories` three-sentence mini-stories, one {gap} per sentence, a three-picture strip
   * above each in an order that is NOT the sentence order (shuffleStrip), one shared bank of all the answers (deranged against the
   * line order). Any `stories` of the six make a legal page (the 18 nouns are pairwise distinct and every fits is disjoint from the
   * other stories' nouns: validated data); the composer still refuses a twin-group repeat or a confusable pair across the taken
   * stories. Block = strip 44 + 8 + 3 x gapH + 2 x 6 + padding; the stack is measured by the gate under the 710 chrome.
   */
  _buildStory(bank, d, loc, G, rng) {
    const cfg = {
      stories: d.stories, sentences: d.sentences || 3, bank: d.bank !== false, shuffleStrip: d.shuffleStrip !== false, picPx: d.picPx || 44, gapH: d.gapH || 36, fontPx: d.fontPx || 18,
      maxChars: d.maxChars, maxGlyphs: d.maxGlyphs, blockMin: d.blockMin, blockGap: d.blockGap == null ? 10 : d.blockGap, padding: d.storyPadding || '6px 16px', nameSlot: d.nameSlot === 'perLocale' ? !!bank.nameSlot : !!d.nameSlot,
    };
    if (!Number.isInteger(cfg.stories) || cfg.stories < 2 || cfg.stories > 4) throw new Error(`${ID}: stories ${cfg.stories} outside [2, 4]`);
    if (cfg.sentences !== 3) throw new Error(`${ID}: sentences ${cfg.sentences} (the story block is three sentences; a fourth no-gap sentence is not built)`);
    if (cfg.picPx < 36) throw new Error(`${ID}: story picPx ${cfg.picPx} below the G2 floor 36`);
    if (cfg.gapH < 36 || cfg.fontPx < 16 || !(cfg.maxChars > 0) || !(cfg.maxGlyphs > 0 && cfg.maxGlyphs <= 9) || !(cfg.blockMin > 0)) throw new Error(`${ID}: story gapH / fontPx / maxChars / maxGlyphs (<= 9) / blockMin`);
    if (!Array.isArray(bank.stories) || bank.stories.length < cfg.stories) throw new Error(`${ID}: the ${loc} bank has ${(bank.stories || []).length} stories for ${cfg.stories} — REFUSED`);
    const excluded = new Set(G.excludeKeys || []);
    const confusable = (bank.confusable || []).map((p) => p.slice().sort().join('|'));
    const longestName = ((SENTENCES[loc] && SENTENCES[loc].names) || ['Emma']).slice().sort((a, b) => graphemes(b) - graphemes(a))[0];
    const okStory = (s) => {
      if (!Array.isArray(s.nouns) || s.nouns.length !== 3 || !Array.isArray(s.text) || s.text.length !== 3 || !Array.isArray(s.forms) || !Array.isArray(s.fits) || !Array.isArray(s.pics)) return false;
      if (s.nouns.some((n) => excluded.has(n))) return false;
      for (let i = 0; i < 3; i++) {
        if (!cfg.nameSlot && /\{name\}/.test(s.text[i])) return false;
        if ([...s.text[i].replace('{gap}', '').replace(/\{name\}/g, longestName)].length > cfg.maxChars) return false;
        let a; try { a = answerFor(loc, s.nouns[i], s.forms[i]); } catch (e) { return false; }
        if (graphemes(a) > cfg.maxGlyphs) return false;
      }
      return true;
    };
    const pool = bank.stories.filter(okStory);
    if (pool.length < cfg.stories) throw new Error(`${ID}: ${loc} has ${pool.length} eligible stories for ${cfg.stories} — REFUSED`);
    let taken = null;
    for (let t = 0; t < MAX_TRIES && !taken; t++) {
      const order = rng.shuffle(pool.slice().sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0)));
      const tk = [], nouns = new Set(), groups = new Set();
      for (const s of order) {
        if (tk.length >= cfg.stories) break;
        if (s.nouns.some((n) => nouns.has(n))) continue;
        const gs = s.nouns.map((n) => twinGroupOf(n, G.twins || [])).filter((g) => g >= 0);
        if (new Set(gs).size !== gs.length || gs.some((g) => groups.has(g))) continue;
        if (s.nouns.some((n) => [...nouns].some((m) => confusable.includes([m, n].sort().join('|'))))) continue;
        if (s.fits.some((fl) => fl.some((x) => !s.nouns.includes(x) && nouns.has(x)))) continue;
        if (tk.some((o) => o.fits.some((fl) => fl.some((x) => s.nouns.includes(x))))) continue;
        tk.push(s); s.nouns.forEach((n) => nouns.add(n)); gs.forEach((g) => groups.add(g));
      }
      if (tk.length === cfg.stories) taken = tk;
    }
    if (!taken) throw new Error(`${ID}: ${loc} cannot compose ${cfg.stories} stories (twins / confusable / fits) — REFUSED`);
    const names = (SENTENCES[loc] && SENTENCES[loc].names) || [];
    const blocks = taken.map((s, bi) => {
      let order = [0, 1, 2];
      if (cfg.shuffleStrip) { for (let t = 0; t < MAX_TRIES; t++) { const o = rng.shuffle([0, 1, 2]); if (o.join(',') !== '0,1,2') { order = o; break; } } if (order.join(',') === '0,1,2') throw new Error(`${ID}: no shuffled strip order`); }
      let name = null;
      if (s.text.some((t) => /\{name\}/.test(t))) { if (!cfg.nameSlot) throw new Error(`${ID}: story ${s.id} carries {name} but nameSlot is off`); if (!names.length) throw new Error(`${ID}: no SENTENCES.${loc}.names`); name = rng.pick(names); }
      const lines = s.text.map((t, i) => ({
        text: name ? fillSlots(t.replace('{gap}', '\u0001'), { name: [name, name] }).replace('\u0001', '{gap}') : t,
        key: s.nouns[i], form: s.forms[i], answer: answerFor(loc, s.nouns[i], s.forms[i]), frameId: `${s.id}/${i}`, kase: s.cases ? s.cases[i] : null,
      }));
      return { s, order, name: name || '', lines, pics: s.nouns.map((n, i) => ({ src: picSrc(s.pics[i], n), key: n })) };
    });
    const answers = blocks.flatMap((b) => b.lines.map((l) => l.answer));
    if (new Set(answers.map((a) => a.toLocaleLowerCase(loc))).size !== answers.length) throw new Error(`${ID}: two story gaps share an answer — REFUSED`);
    const gapW = gapWidth(answers, { max: 168 });
    const bankOrder = cfg.bank ? C4.derange(answers.map((_, i) => i), rng) : null;
    const bankHtml = cfg.bank ? C4.gapBank({ words: answers, order: bankOrder, wordPx: 18 }) : '';
    const list = blocks.map((b, i) => C4.storyBlock({ n: i + 1, pics: b.pics, order: b.order, lines: b.lines, gapW, picPx: cfg.picPx, storyId: b.s.id, padding: cfg.padding, gapH: cfg.gapH })).join('');
    const grid = `<div data-lcs-list style="flex:1 1 auto;display:grid;grid-template-rows:repeat(${cfg.stories},minmax(${cfg.blockMin}px,1fr));row-gap:${cfg.blockGap}px;min-height:0">${list}</div>`;
    const attrs = `data-lcs-stories="${cfg.stories}" data-lcs-sentences="${cfg.sentences}" data-lcs-gapw="${gapW}" data-lcs-bank="${cfg.bank ? 1 : 0}" data-lcs-shuffle="${cfg.shuffleStrip ? 1 : 0}" data-lcs-pic-px="${cfg.picPx}" data-lcs-gap-h="${cfg.gapH}"`;
    return { bodyHtml: this._faceRoot('story', cfg, attrs, bankHtml + grid), meta: { face: 'story', gapW, bankOrder, stories: blocks.map((b) => [b.s.id, b.s.nouns.join(','), b.order.join(''), b.name, b.lines.map((l) => l.answer).join(',')]) } };
  },

  /**
   * F5 `match` (G1-368): READ, not write — `pairs` gap sentences in the LEFT column with NO picture beside them, the `pairs`
   * pictures (the answers) deranged in the RIGHT column; the child draws one line from each sentence to the picture that fills
   * its gap. The predicate is the only key, so the base composer's exclusivity (fits pairwise disjoint over the page, <= 1 key per
   * twin group, no confusable pair) carries the whole page. fr / it `unique` frames are fine here (nothing is written).
   */
  _buildMatch(bank, d, loc, G, rng) {
    const cfg = {
      rows: d.pairs, itemH: d.itemH || 92, itemMax: d.itemMax == null ? null : d.itemMax, leftW: d.leftW || 330, rightW: d.rightW || 100, picPx: d.picPx || 64, blankW: d.blankW || 90, fontPx: d.fontPx || 18,
      maxChars: d.maxChars, maxGlyphs: d.maxGlyphs || 14, nameSlot: d.nameSlot === 'perLocale' ? !!bank.nameSlot : !!d.nameSlot,
    };
    if (!Number.isInteger(cfg.rows) || cfg.rows < 4 || cfg.rows > 8) throw new Error(`${ID}: pairs ${cfg.rows} outside [4, 8]`);
    if (cfg.picPx < 56) throw new Error(`${ID}: match picPx ${cfg.picPx} below the K-late floor 56`);
    if (cfg.itemH < 74) throw new Error(`${ID}: itemH ${cfg.itemH} below 74 (a two-line text)`);
    if (cfg.itemMax != null && cfg.itemMax < cfg.itemH) throw new Error(`${ID}: itemMax ${cfg.itemMax} below itemH ${cfg.itemH}`);
    if (cfg.leftW + cfg.rightW > 615 - 100) throw new Error(`${ID}: leftW + rightW leave no line zone`);
    if (cfg.fontPx < 16 || !(cfg.maxChars > 0)) throw new Error(`${ID}: match fontPx / maxChars`);
    if (d.bank) throw new Error(`${ID}: the match face never prints a bank (nothing is written)`);
    const excluded = new Set(G.excludeKeys || []);
    const gl = { twins: G.twins, confusable: bank.confusable || [] };
    const pool = eligibleFrames(bank.frames, cfg, loc, ID).filter((f) => !excluded.has(f.noun));
    const taken = this._deal(rng, pool, cfg, loc, gl, null, 'match');
    const answers = taken.map((f) => answerFor(loc, f.noun, f.form));
    const rows = taken.map((f, i) => ({ f, ...this._fillNames(f.text, cfg, loc, rng, f.id), answer: answers[i] }));
    const order = C4.derange(rows.map((_, i) => i), rng);
    const html = C4.sentenceMatch({
      left: rows.map((r) => ({ frameId: r.f.id, key: r.f.noun, text: r.text, form: r.f.form, answer: r.answer })),
      right: rows.map((r) => ({ key: r.f.noun, src: picSrc(r.f.pic, r.f.noun) })),
      order, itemH: cfg.itemH, itemMax: cfg.itemMax, leftW: cfg.leftW, rightW: cfg.rightW, picPx: cfg.picPx, blankW: cfg.blankW,
    });
    const attrs = `data-lcs-pairs="${cfg.rows}" data-lcs-bank="0" data-lcs-item-h="${cfg.itemH}" data-lcs-item-max="${cfg.itemMax == null ? '' : cfg.itemMax}" data-lcs-pic-px="${cfg.picPx}" data-lcs-blank-w="${cfg.blankW}" data-lcs-order="${order.join(',')}"`;
    return { bodyHtml: this._faceRoot('match', cfg, attrs, html), meta: { face: 'match', order, rows: rows.map((r) => [r.f.id, r.f.noun, r.f.form, r.answer, r.f.pic.theme, r.name]) } };
  },

  /** The base branch (VERIFY_BASE, byte-untouched) or, when the root stamps a face mode, the VERIFY_FACE branch. */
  async verify(page) {
    const mode = await page.evaluate(() => { const r = document.querySelector('[data-lcs-cloze]'); return r ? (r.dataset.lcsMode || null) : null; });
    if (mode && mode !== 'base') return page.evaluate(VERIFY_FACE);
    return page.evaluate(VERIFY_BASE);
  },
};
