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

/**
 * @param {object} o
 *   type        the template module (a worksheet-gen type)
 *   strings     { title, instruction, printTitle? } for this template + locale
 *   locale, difficulty, theme, unit (a template's own axis, e.g. the sight word), variant, seedEpoch,
 *   pageSize ('letter' | 'a4'), answerKey (bool), answerKeySuffix
 * @returns {{ html: string, keyHtml: string|null, meta: object, seed: string }}
 */
function makePage(o) {
  const { type, locale } = o;
  const difficulty = Number(o.difficulty || 2);
  const theme = o.theme || null;
  const pageSize = o.pageSize || (locale === 'en' ? 'letter' : 'a4');
  const unit = o.unit || null;
  const seedArgs = { typeId: type.id, theme, difficulty, seedEpoch: o.seedEpoch || 1, variant: o.variant || 1, unit };
  const ctx = (extra) => ({ rng: makeRng(instanceSeed(seedArgs)), variant: o.variant || 1, ...(extra || {}) });

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
  return { html, keyHtml, meta: built.meta, seed: instanceSeed(seedArgs) };
}

module.exports = { makePage, platform };
