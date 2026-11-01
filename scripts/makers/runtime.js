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
  const ctx = (extra) => ({ rng: makeRng(instanceSeed(seedArgs)), variant: o.variant || 1, ...(o.seedVariant ? { seedVariant: o.seedVariant } : {}), ...(o.buildExtra || {}), overrides: o.overrides || null, slotsOut: slots, ...(extra || {}) });

  let strings = resolveUnitTokens({ ...o.strings }, type, unit, locale);
  const built = type.build({ theme, difficulty, locale, unit }, ctx());
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
  return { html, keyHtml, screenHtml, meta: built.meta, seed: instanceSeed(seedArgs), slots };
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
 * @returns {Promise<{ok: true, html, keyHtml, meta, seed, attempt} | {ok: false, fails: string[]}>}
 */
async function generate(o, mount) {
  const type = o.type;
  // a maker page is always a NEW page: ask for the retries a new catalogue page gets (qaRetries withholds them from the
  // published level-2 copy 1 only, to keep live decks byte-unchanged — a teacher's page has no such constraint)
  const knobs = typeof type.qaRetries === 'function' ? (type.qaRetries({ typeId: type.id, difficulty: Number(o.difficulty || 2), locale: o.locale, variant: 2 }) || []) : [];
  const attempts = [{}].concat(knobs.map((k) => ({ buildExtra: k })));
  for (let k = 1; k <= SEED_RETRIES; k++) attempts.push({ seedVariant: (o.variant || 1) + '.' + k });
  let fails = [];
  for (const a of attempts) {
    let r;
    try { r = makePage({ ...o, ...a }); } catch (e) { fails = ['build: ' + e.message]; continue; }
    fails = await gatePage(type, await mount(r.html));
    if (!fails.length && r.keyHtml) fails = await gatePage(type, await mount(r.keyHtml), { key: true });
    if (!fails.length) return { ok: true, ...r, attempt: a };
  }
  return { ok: false, fails };
}

module.exports = { makePage, gatePage, generate, mountHtml, platform, keyMarks, screen: require('./screen.js') };
