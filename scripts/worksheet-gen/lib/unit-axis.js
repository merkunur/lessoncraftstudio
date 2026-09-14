/**
 * unit-axis.js — the ONE fan mechanism for every non-theme axis (nt20-C
 * cross-type ruling): letter of the week, spelling rule, syllable unit, animal,
 * bilingual partner, divisor set. Additive-with-fallback: a wave that sets
 * neither `unitsPerType` nor `unitOverrides` enumerates exactly as before
 * (deckId, seed, manifest, strings byte-identical — proven by b3-baseline).
 *
 * Spec contract:
 *   unitAxis: {
 *     applicable: true,
 *     units(locale)    -> string[]   unit ids in bank order (the first N ship)
 *     exemplar(locale) -> string     the unit a unit-less build() must use
 *     tokens?(unit, locale) -> { U, L, UNIT }   optional; default U = upper-first,
 *                                               L = lower, UNIT = unit
 *   }
 *   build({ theme, difficulty, locale, unit }) — `unit` is null unless the wave
 *   configured one; the spec falls back to its bank's exemplar.
 *
 * Wave contract: `unitsPerType: N` and/or `unitOverrides: { '<id>': '<unit>' }`
 * (an override is PINNED, like themeOverrides — the deck id, title and landing
 * are written against it; cli.js must never substitute it).
 *
 * Strings: `{U}` `{L}` `{UNIT}` in title/instruction resolve at the STRINGS
 * boundary (render-instance + cli), because page/shell.js prints the title on
 * the sheet and manifest.title stores it BEFORE deck-html runs. deck-html only
 * asserts nothing is left unresolved.
 */
'use strict';
const { slugify } = require('../../publish-cli/slug.js');

const TOKEN_RE = /\{(U|L|UNIT)\}/g;
const TOKEN_TEST = /\{(U|L|UNIT)\}/;   // non-global: .test() on a /g regex carries lastIndex between calls

function hasAxis(spec) { return !!(spec && spec.unitAxis && spec.unitAxis.applicable); }

/** deckId / variant_id tail for a unit — the same ASCII fold the slug gets. */
function unitKey(unit) {
  const k = slugify(unit).replace(/-/g, '');
  if (!k) throw new Error('unit-axis: unit "' + unit + '" folds to an empty key');
  return k;
}

/**
 * The units a wave asks a spec to fan over, per locale.
 * @returns {{ units: (string|null)[], pinned: boolean }}
 */
function unitListFor(spec, plan, locale) {
  const override = plan && plan.unitOverrides && plan.unitOverrides[spec.id];
  const perType = plan && plan.unitsPerType;
  if (!override && !perType) return { units: [null], pinned: false };
  if (!hasAxis(spec)) {
    if (override) throw new Error('unit-axis: unitOverrides names ' + spec.id + ', which has no unitAxis');
    return { units: [null], pinned: false };
  }
  const all = spec.unitAxis.units(locale) || [];
  if (override) {
    if (!all.includes(override)) throw new Error('unit-axis: unitOverrides ' + spec.id + ' → "' + override + '" is not in units(' + locale + ')');
    return { units: [override], pinned: true };
  }
  const units = all.slice(0, perType);
  if (!units.length) throw new Error('unit-axis: ' + spec.id + ' has no units for locale ' + locale);
  return { units, pinned: false };
}

/** Throws when a wave sets unit knobs that reach no selected spec. */
function assertUnitKnobsReach(plan, specs) {
  if (!plan || (!plan.unitsPerType && !plan.unitOverrides)) return;
  if (!specs.some(hasAxis)) throw new Error('unit-axis: the wave sets unitsPerType/unitOverrides but no selected spec has a unitAxis');
}

function unitTokens(spec, unit, locale) {
  if (spec.unitAxis && typeof spec.unitAxis.tokens === 'function') return spec.unitAxis.tokens(unit, locale);
  const u = String(unit);
  return { U: u.charAt(0).toLocaleUpperCase(locale) + u.slice(1), L: u.toLocaleLowerCase(locale), UNIT: u };
}

/**
 * Resolve {U}/{L}/{UNIT} in a strings object. Returns the SAME object when the
 * spec has no unit axis or no token is present (byte-identity for every live
 * type). With the axis and no unit configured, the exemplar fills the tokens.
 */
function resolveUnitTokens(strings, spec, unit, locale) {
  if (!strings || !hasAxis(spec)) return strings;
  const fields = Object.keys(strings).filter((k) => typeof strings[k] === 'string' && TOKEN_TEST.test(strings[k]));
  if (!fields.length) return strings;
  const u = unit || spec.unitAxis.exemplar(locale);
  const tok = unitTokens(spec, u, locale);
  const out = Object.assign({}, strings);
  for (const k of fields) out[k] = strings[k].replace(TOKEN_RE, (m, t) => (t in tok ? String(tok[t]) : m));
  return out;
}

function assertNoUnitTokens(strings, where) {
  for (const k of Object.keys(strings || {})) {
    if (typeof strings[k] === 'string' && TOKEN_TEST.test(strings[k])) {
      throw new Error('unit-axis: unresolved token in ' + where + '.' + k + ': ' + strings[k]);
    }
  }
}

module.exports = { hasAxis, unitKey, unitListFor, assertUnitKnobsReach, unitTokens, resolveUnitTokens, assertNoUnitTokens, TOKEN_RE };
