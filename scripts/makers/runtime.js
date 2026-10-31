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
  if (o.answerKey && type.interactive) {
    const keyBuilt = type.build({ theme, difficulty, locale, unit }, ctx({ answerKey: true }));
    if (JSON.stringify(keyBuilt.meta) !== JSON.stringify(built.meta)) throw new Error('maker: the answer key drew different content than the page (' + type.id + ')');
    keyHtml = buildPage({ title: head + (o.answerKeySuffix ? ' — ' + o.answerKeySuffix : ''), instruction: strings.instruction, bodyHtml: keyBuilt.bodyHtml, locale, pageSize });
  }
  return { html, keyHtml, meta: built.meta, seed: instanceSeed(seedArgs), slots };
}

/**
 * The catalogue's page gates on a mounted page: every lint (qa/lints.js) + the type's own verify. For an answer key only
 * the layout lints that render-instance.js applies to keys (footer overlap, page box).
 * @returns {Promise<string[]>} failures (empty = the page may be shown, printed and shared)
 */
async function gatePage(type, page, { key = false } = {}) {
  const lints = await runLints(page, { gradeBand: type.gradeBand });
  if (key) return lints.filter((l) => /footer overlap|exceeds page box/.test(l)).map((l) => 'answer key: ' + l);
  return lints.concat(type.verify ? await type.verify(page) : []);
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

module.exports = { makePage, gatePage, generate, mountHtml, platform };
