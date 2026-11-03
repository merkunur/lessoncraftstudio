/**
 * Maker runtime — the browser side of render/render-instance.js (ARCHITECTURE §1, §3).
 *
 * Builds one worksheet page (and its answer key) from a template module, exactly the way the catalogue pipeline does:
 * the same seed (lib/rng.js), the same build(), the same page shell — so a page made in the browser is byte-identical
 * to the page the Node pipeline makes for the same settings (gate: scripts/makers/gates/parity.js).
 *
 * The strings for each (template, locale) come from the maker's strings slice, built at bundle time from
 * i18n/strings.<loc>.json. A template whose locale has no native strings is NOT offered there: there is no English
 * fallback on a non-English page (OLD-APP-LESSONS F5).
 */
'use strict';
const platform = require('../worksheet-gen/lib/platform/index.js');
const { makeRng, instanceSeed } = require('../worksheet-gen/lib/rng.js');
const { buildPage } = require('../worksheet-gen/page/shell.js');
const { resolveUnitTokens } = require('../worksheet-gen/lib/unit-axis.js');
const { runLints } = require('../worksheet-gen/qa/lints.js');
const { mountHtml } = require('../worksheet-gen/lib/platform/page-shim.js');

/**
 * @param {object} o
 *   type        the template module (a worksheet-gen type)
 *   strings     { title, instruction, printTitle? } for this template + locale
 *   locale, difficulty, theme, unit (a template's own axis, e.g. the sight word), variant, seedEpoch,
 *   pageSize ('letter' | 'a4'), answerKey (bool), answerKeySuffix,
 *   buildExtra (a type's qaRetries knob), seedVariant (a fresh-seed retry; the page keeps its variant),
 *   overrides ({ pic: {i: noun}, word: {i: word} } — the teacher's tap-to-edit choices, lib/slot.js)
 * @returns {{ html: string, keyHtml: string|null, meta: object, seed: string, slots: object }} slots = per role
 *   { pool, values } for every slot the type exposes (what the screen may offer, and what was applied)
 */
/*
 * The answer key of a print-only template (2026-10-31): the page every right answer marked, by ONE layer for all
 * templates — the answers the page already carries for its own checks:
 *   - a write-in box with its answer (.ws-answerbox[data-lcs-answer], empty on the page) shows that answer, in teal;
 *   - the right choice ([data-lcs-correct]: a numeral chip, a word, ✓ / ✗, a group) gets a coral ring.
 * A template whose task is drawn (draw that many, colour the parts, write a tally) draws ONE correct example itself
 * when built with ctx.answerKey (its key build may add answers, never change the content: the meta check below).
 * Interactive templates keep the key they draw themselves (the catalogue's). A page with nothing to mark has no key
 * (KEY_MARKS = 0; build-bundles.js records it and the screen does not offer the switch).
 */
// Every rule is scoped to .lcs-keypage (the key page's body): Print puts all pages in ONE document, and an unscoped rule
// would write the answers onto the worksheet pages too (shell.js printAll carries the body class onto each page).
const KEY_RULES = [
  '.ws-answerbox[data-lcs-answer]:empty:not([data-lcs-answer=""])::after{content:attr(data-lcs-answer);color:#146B5E;font-family:\'Baloo 2\',cursive;font-weight:700}',
  '[data-lcs-correct]{box-shadow:0 0 0 4px #F2784B;border-radius:999px}',
  '.ws-subgroup[data-lcs-correct]{border-radius:12px}',
  // an empty answer cell that is not a write-in box (a missing letter, a glue square): the letter, in teal
  '[data-lcs-answer]:empty:not([data-lcs-answer=""]):not(.ws-answerbox)::after{content:attr(data-lcs-answer);color:#146B5E}',
  // a picture / cell to circle (the Nth one, every one like the model): a coral ring
  '[data-lcs-key-ring]{outline:4px solid #F2784B;outline-offset:3px;border-radius:10px}',
  // which number an item matches (matching pages): a teal badge on the item
  '[data-lcs-key-badge]{position:relative}[data-lcs-key-badge]::after{content:attr(data-lcs-key-badge);position:absolute;top:6px;right:6px;min-width:32px;height:32px;padding:0 7px;box-sizing:border-box;border-radius:16px;background:#146B5E;color:#FFFFFF;font:700 19px/32px \'Baloo 2\',cursive;text-align:center}',
];
const KEY_CSS = '<style data-lcs-key>' + KEY_RULES.join('').replace(/(^|})([^{}]+){/g, (m, b, sel) => b + sel.split(',').map((x) => '.lcs-keypage ' + x.trim()).join(',') + '{') + '</style>';
/** how many answers a key page shows: filled boxes + ringed choices + drawn examples */
function keyMarks(html) {
  const empty = (html.match(/data-lcs-answer="[^"]+"[^>]*><\/(span|div)>/g) || []).length;
  return empty + ['data-lcs-correct', 'data-lcs-key-sample', 'data-lcs-key-ring', 'data-lcs-key-badge'].reduce((a, k) => a + (html.split(k).length - 1), 0);
}

function makePage(o) {
  const { type, locale } = o;
  const difficulty = Number(o.difficulty || 2);
  const theme = o.theme || null;
  const pageSize = o.pageSize || (locale === 'en' ? 'letter' : 'a4');
  const unit = o.unit || null;
  // the same seed rule as render-instance.js: a seedVariant (retry) replaces the variant in the seed only
  const seedArgs = { typeId: type.id, theme, difficulty, seedEpoch: o.seedEpoch || 1, variant: o.seedVariant || o.variant || 1, unit };
  const slots = {};
  // Level 2, copy 1 is the CATALOGUE's published page in every type that has one: built byte-identical from its June
  // content, without the marks its screen and key need. A maker page is always a NEW page, so the maker's level-2 copy k
  // is the type's copy k + 1 (2026-11-03: ~80 templates offered no level-2 screen, and their level-2 pages skipped the
  // Level Set's reviewed content); every other level keeps its number. ctx.makerCopy = the maker's own copy number;
  // ctx.maker: a type whose copies the publishing tools numbered by seedVariant maps a maker copy onto the same list
  // (G2-254 Reading Comprehension) — the publishing pipeline never sets either, so a published page is unchanged.
  const typeVariant = (o.variant || 1) + (difficulty === 2 ? 1 : 0);
  const ctx = (extra) => ({ rng: makeRng(instanceSeed(seedArgs)), variant: typeVariant, makerCopy: o.variant || 1, maker: true, ...(o.seedVariant ? (/^\d+$/.test(String(o.seedVariant)) ? { seedVariant: o.seedVariant } : { retry: String(o.seedVariant) }) : {}), ...(o.buildExtra || {}), overrides: o.overrides || null, slotsOut: slots, ...(extra || {}) });

  let strings = resolveUnitTokens({ ...o.strings }, type, unit, locale);
  const built = type.build({ theme, difficulty, locale, unit }, ctx());
  // a page asked for with no unit may draw one itself (a Color by Number copy picks a design of its level): its title
  // names that unit (makers 2026-11-02)
  if (built.unit && built.unit !== unit) strings = resolveUnitTokens({ ...o.strings }, type, built.unit, locale);
  // a copy may bring its own words (makers 2026-11-02, Mazes: copy 2 is a Level Set scene with its own hero, title and
  // instruction) — never over a field the teacher edited (o.strings differs from o.baseStrings there)
  if (built.strings) for (const k of ['title', 'printTitle', 'instruction']) {
    if (built.strings[k] == null) continue;
    const field = k === 'printTitle' ? 'title' : k;   // an edited title is the page's heading too
    if (o.baseStrings && (o.baseStrings[field] !== (o.strings || {})[field] || o.baseStrings[k] !== (o.strings || {})[k])) continue;
    strings = { ...strings, [k]: built.strings[k] };
  }
  // a copy's own words may carry the unit's tokens ({L}, {N}: How to Draw's Level Set titles) — filled with its unit
  if (built.strings) strings = resolveUnitTokens(strings, type, built.unit || unit, locale);
  if (built.tokens) strings = { ...strings, instruction: String(strings.instruction).replace(/{([A-Z]+)}/g, (m, k) => (built.tokens[k] != null ? built.tokens[k] : m)) };
  if (/{[A-Z]+}/.test(strings.instruction || '')) throw new Error('maker: ' + type.id + ' instruction keeps an unfilled token');
  const head = strings.printTitle || strings.title;
  const html = buildPage({ title: head, instruction: strings.instruction, bodyHtml: built.bodyHtml, locale, pageSize });

  let keyHtml = null;
  if (o.answerKey) {
    const keyBuilt = type.build({ theme, difficulty, locale, unit }, ctx({ answerKey: true }));
    if (JSON.stringify(keyBuilt.meta) !== JSON.stringify(built.meta)) throw new Error('maker: the answer key drew different content than the page (' + type.id + ')');
    keyHtml = buildPage({ title: head + (o.answerKeySuffix ? ' — ' + o.answerKeySuffix : ''), instruction: strings.instruction, bodyHtml: keyBuilt.bodyHtml, locale, pageSize });
    if (!type.interactive) keyHtml = keyMarks(keyHtml) ? keyHtml.replace('</head>', KEY_CSS + '</head>').replace(/<body([^>]*)>/, (m, at) => (/class="/.test(at) ? m.replace('class="', 'class="lcs-keypage ') : `<body${at} class="lcs-keypage">`)) : null;
  }
  // the SCREEN build (screen-from-marks, 2026-11-01): the page with every answer mark its key build stamps, without the
  // key's drawn samples — what scripts/makers/screen.js reads the tap targets and answers from; same content (meta)
  let screenHtml = null;
  if (o.screen) {
    const scBuilt = type.build({ theme, difficulty, locale, unit }, ctx({ screen: true }));
    if (JSON.stringify(scBuilt.meta) !== JSON.stringify(built.meta)) throw new Error('maker: the screen build drew different content than the page (' + type.id + ')');
    screenHtml = buildPage({ title: head, instruction: strings.instruction, bodyHtml: scBuilt.bodyHtml, locale, pageSize });
  }
  // the DECLARED screen build (2026-11-01): a template whose module declares `interactive` gets the screen the catalogue
  // gives it — its own build with ctx.interactive, the native screen instruction (o.screenInstruction) and the screen's
  // page height; scripts/makers/screen.js buildDeclaredScreen measures it in the browser (render-instance.js's capture)
  let declaredHtml = null;
  if (o.declared) {
    if (!type.interactive) throw new Error('maker: ' + type.id + ' declares no interactive screen');
    if (!o.screenInstruction) throw new Error('maker: ' + type.id + ' has no screen instruction for ' + locale);
    // publishedScreen: the published face (level 2, copy 1) builds exactly as it shipped, so its families skip the screen
    // path there; the maker asks for that page's screen anyway (built FROM the published page — same content, asserted)
    const dBuilt = type.build({ theme, difficulty, locale, unit }, ctx({ interactive: true, publishedScreen: true }));
    if (JSON.stringify(dBuilt.meta) !== JSON.stringify(built.meta)) throw new Error('maker: the screen build drew different content than the page (' + type.id + ')');
    // a copy that brings its own words brings its own screen line too (a Level Set maze names its own goal)
    const scrIns = (built.strings && built.strings.screenInstruction) || o.screenInstruction;
    declaredHtml = buildPage({ title: head, instruction: scrIns, bodyHtml: dBuilt.bodyHtml, locale, pageSize, pageHeight: type.interactive.screenHeight || null });
  }
  // unit: the one the page was drawn with (a copy may pick its own: a pinned maze scene, a Color by Number design)
  return { html, keyHtml, screenHtml, declaredHtml, meta: built.meta, seed: instanceSeed(seedArgs), slots, unit: built.unit || unit };
}

/**
 * The catalogue's page gates on a mounted page: every lint (qa/lints.js) + the type's own verify. For an answer key only
 * the layout lints that render-instance.js applies to keys (footer overlap, page box).
 * @returns {Promise<string[]>} failures (empty = the page may be shown, printed and shared)
 */
async function gatePage(type, page, { key = false } = {}) {
  const lints = await runLints(page, { gradeBand: type.gradeBand });
  if (key) return lints.filter((l) => /footer overlap|exceeds page box/.test(l)).map((l) => 'answer key: ' + l);
  // a title or instruction a teacher typed may not run past three lines (ARCHITECTURE §4.4) — measured, not counted in
  // characters: the page's own fonts and width decide
  const lines = await page.evaluate(() => {
    // the rendered lines themselves (one client rect per line box), not height / line-height: 'normal' line height is a guess
    const count = (el) => { if (!el) return 0; const r = document.createRange(); r.selectNodeContents(el); return new Set([...r.getClientRects()].filter((x) => x.width > 0).map((x) => Math.round(x.top))).size; };
    return { title: count(document.querySelector('[data-lcs-title]')), instruction: count(document.querySelector('[data-lcs-instruction]')) };
  });
  const textFails = [];
  if (lines.title > 3) textFails.push(`title runs to ${lines.title} lines (3 at most)`);
  if (lines.instruction > 3) textFails.push(`instruction runs to ${lines.instruction} lines (3 at most)`);
  return lints.concat(textFails, type.verify ? await type.verify(page) : []);
}

/** Fresh-seed retries after the type's own knobs (ARCHITECTURE §6.2 step 1). */
const SEED_RETRIES = 4;

/**
 * Make a page that passes every gate, or refuse (ARCHITECTURE §6.2): the requested page first, then the type's own
 * qaRetries knobs, then up to SEED_RETRIES fresh seeds — the first attempt whose page AND answer key pass is used. The
 * ladder is deterministic, so the same settings always land on the same attempt (a saved recipe rebuilds the same page).
 * @param {object} o      makePage options
 * @param {(html: string) => Promise<object>} mount  shows html in a gate frame, returns a Puppeteer-shaped page
 * A page with the teacher's edits (o.overrides, or its own title / instruction against o.baseStrings) is built with the
 * attempt its UNEDITED page landed on, and with that one only: a swap changes its own item and nothing else (2026-11-02: a page whose plain build needed a fresh seed refused
 * every swap — the edited build started the ladder again and moved the whole page). A swap the page cannot take there is
 * refused (ok: false).
 * @param {object} o      makePage options
 * @param {(html: string) => Promise<object>} mount  shows html in a gate frame, returns a Puppeteer-shaped page
 * @returns {Promise<{ok: true, html, keyHtml, meta, seed, attempt} | {ok: false, fails: string[]}>}
 */
const BASE_ATTEMPTS = new Map();   // the unedited page's attempt per settings (the editor asks again on every swap)
async function generate(o, mount) {
  const type = o.type;
  let attempts;
  // edited = the teacher's swaps (overrides) or own title / instruction (o.baseStrings: the template's own words)
  const bs = o.baseStrings || null;
  const textEdited = !!(bs && o.strings && (bs.title !== o.strings.title || bs.instruction !== o.strings.instruction));
  if ((o.overrides && Object.keys(o.overrides).length) || textEdited) {
    const plain = { ...o, overrides: null, strings: bs || o.strings, baseStrings: null };
    const key = JSON.stringify([type.id, o.locale, o.difficulty, o.theme, o.unit, o.variant, o.seedEpoch || 1, o.pageSize || null, !!o.answerKey, o.answerKeySuffix || null, plain.strings && plain.strings.title, plain.strings && plain.strings.instruction]);
    if (!BASE_ATTEMPTS.has(key)) {
      const base = await generate(plain, mount);
      if (!base.ok) return base;
      if (BASE_ATTEMPTS.size > 400) BASE_ATTEMPTS.clear();
      BASE_ATTEMPTS.set(key, base.attempt || {});
    }
    attempts = [BASE_ATTEMPTS.get(key)];
  } else {
    // a maker page is always a NEW page: ask for the retries a new catalogue page gets (qaRetries withholds them from the
    // published level-2 copy 1 only, to keep live decks byte-unchanged — a teacher's page has no such constraint)
    const knobs = typeof type.qaRetries === 'function' ? (type.qaRetries({ typeId: type.id, difficulty: Number(o.difficulty || 2), locale: o.locale, variant: 2 }) || []) : [];
    attempts = [{}].concat(knobs.map((k) => ({ buildExtra: k })));
    for (let k = 1; k <= SEED_RETRIES; k++) attempts.push({ seedVariant: (o.variant || 1) + '.' + k });
  }
  let fails = [];
  for (const a of attempts) {
    let r = null;
    // an art file the build needs and the browser has not loaded yet (one picture of a picture family) is fetched and the
    // SAME attempt built again — a missing file is never a refusal (platform.fetchMissing; Node has no such files)
    for (let fetched = 0; ; fetched++) {
      try { r = makePage({ ...o, ...a }); break; } catch (e) {
        if (e && e.name === 'PlatformMissing' && fetched < 12 && platform.fetchMissing && await platform.fetchMissing(e.path)) continue;
        fails = ['build: ' + e.message]; break;
      }
    }
    if (!r) continue;
    fails = await gatePage(type, await mount(r.html));
    if (!fails.length && r.keyHtml) fails = await gatePage(type, await mount(r.keyHtml), { key: true });
    // a teacher's longer title / instruction on a page that fills its body (type.fitsChrome: Find the Differences, How to
    // Draw): the page is built again giving back the px the text took past the footer (ctx.chromeExtra), at most 3 times —
    // the published build never sees chromeExtra, so the catalogue page is unchanged (2026-11-02)
    for (let k = 0, extra = 0; fails.length && textEdited && type.fitsChrome && k < 3; k++) {
      const over = Math.max(0, ...fails.map((f) => { const m = String(f).match(/reaches (\d+) against the attribution band at (\d+)/); return m ? +m[1] - +m[2] : -1; }));
      if (!(over > 0)) break;
      extra += over + 6;
      const a2 = { ...a, buildExtra: { ...(a.buildExtra || {}), chromeExtra: extra } };
      try { r = makePage({ ...o, ...a2 }); } catch (e) { fails = ['build: ' + e.message]; break; }
      fails = await gatePage(type, await mount(r.html));
      if (!fails.length && r.keyHtml) fails = await gatePage(type, await mount(r.keyHtml), { key: true });
      if (!fails.length) return { ok: true, ...r, attempt: a2 };
    }
    if (!fails.length) return { ok: true, ...r, attempt: a };
  }
  return { ok: false, fails };
}

/**
 * The screen of a page (2026-11-01), the ONE decision the maker screen, the student page, build-screens and the gates
 * share: a template whose module declares `interactive` gets its declared screen (the catalogue's); where that build has
 * nothing to measure — the published face (level 2, copy 1) builds exactly as it shipped, without its screen layout —
 * the same page's answer marks give it the generic screen. A template without a declaration gets the marks screen.
 * @param {object} o   makePage options (type, strings, locale, difficulty, theme, unit, variant, …) + tpl (the
 *                     templates.json entry), runtimeStrings (the locale's), marksInstructions (screenInstructions of the
 *                     locale: the generic sentences), decorate? (html → html, the teacher's drawing on a marks screen)
 * @returns {Promise<{ html, path: 'declared' | 'marks' }>}  throws with .reasons when the page cannot be a screen
 */
async function screenFor(o, mount) {
  const screen = require('./screen.js');
  const { tpl, type } = o;
  const lv = Number(o.difficulty || 2);
  let declaredErr = null;
  if (tpl.screen === 'declared' || type.interactive) {
    const instr = tpl.screenInstructions && tpl.screenInstructions[o.locale] && tpl.screenInstructions[o.locale][lv];
    try {
      if (!instr) throw Object.assign(new Error('no screen instruction for ' + o.locale + ' level ' + lv), { reasons: ['no screen instruction'] });
      const made = makePage({ ...o, declared: true, screenInstruction: instr });
      const sc = await screen.buildDeclaredScreen({ html: made.declaredHtml, type, theme: o.theme, difficulty: lv, locale: o.locale, unit: made.unit, design: made.meta && made.meta.design, strings: o.runtimeStrings, mount });
      return { html: sc.html, path: 'declared' };
    } catch (e) { declaredErr = e; }
  }
  try {
    const made = makePage({ ...o, screen: true });
    const html = o.decorate ? o.decorate(made.screenHtml) : made.screenHtml;
    // the template's own screen sentence when it has one (build-screens.js), else the generic one for the kind of answers
    const own = tpl && tpl.screen === 'marks' && tpl.screenInstructions && tpl.screenInstructions[o.locale] && tpl.screenInstructions[o.locale][lv];
    const sc = await screen.buildScreen({ html, locale: o.locale, strings: o.runtimeStrings, instruction: (pl) => own || (o.marksInstructions || {})[screen.instructionKey(pl)] || '', mount });
    return { html: sc.html, path: 'marks' };
  } catch (e) {
    if (!declaredErr) throw e;
    const err = new Error('screen: declared — ' + (declaredErr.reasons ? declaredErr.reasons.join('; ') : declaredErr.message) + ' | marks — ' + (e.reasons ? e.reasons.join('; ') : e.message));
    err.reasons = [].concat(declaredErr.reasons || [declaredErr.message], e.reasons || [e.message]);
    throw err;
  }
}

module.exports = { makePage, gatePage, generate, mountHtml, platform, keyMarks, screenFor, screen: require('./screen.js') };
