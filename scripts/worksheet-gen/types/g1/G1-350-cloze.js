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
 * PHASE 2 — the five faces (design §3): ONE additive `mode` knob (`letters` /
 * `choice` / `plural` / `story` / `match`), dispatched in `_buildWith` BEFORE
 * the base path consumes the RNG so the base's output stays byte-identical
 * (tools/b3-baseline.js). NOT BUILT in this phase: a `mode` other than 'base'
 * throws "Phase 2" so no face can ship half-built. The components exist
 * (templates/components-b4/cloze.js) and are smoke-measured by the gate.
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

/** ONE box width for the page: clamp(round(1.6 * 10 * maxGlyphs + 24), 150, 300). */
function gapWidth(answers) {
  if (!Array.isArray(answers) || !answers.length) throw new Error(`${ID}: gapWidth needs answers`);
  const maxGlyphs = Math.max(...answers.map(graphemes));
  return Math.max(150, Math.min(300, Math.round(HAND_FACTOR * PX_PER_GLYPH * maxGlyphs + 24)));
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

  /** Phase 2 seam: the five faces (`letters` / `choice` / `plural` / `story` / `match`) are NOT built yet — refuse loudly. */
  _buildFace(bank, d) {
    throw new Error(`${ID}: mode "${d.mode}" is a Phase 2 face and is not built yet — the base renders only when d.mode is undefined or 'base'`);
  },

  async verify(page) {
    return page.evaluate(VERIFY_BASE);
  },
};
