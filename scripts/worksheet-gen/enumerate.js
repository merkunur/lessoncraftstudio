/**
 * enumerate.js — expand a wave plan into the deterministic instance list.
 *
 * Wave plan (waves/wave-NNN.json):
 *   {
 *     id: 'wave-001',
 *     seedEpoch: 1,
 *     locales: ['en'],
 *     themes: ['animals', 'fruits', ...],   // cache-form names
 *     themesPerType: 2,                     // cap per themed type (round-robin spread)
 *     difficulties: [2],
 *     variantsPerType: 1,                   // OPTIONAL (default 1): N distinct worksheets per slot
 *     variants: { 'G1-148': 10 },           // OPTIONAL per-type override of variantsPerType
 *     types: 'all' | ['K-002', ...] | { gradeBands?: [], assetClasses?: [], exclude?: [] }
 *   }
 *
 * Themed types fan over `themesPerType` themes picked round-robin by type
 * index (deterministic spread across the wave's theme list), filtered by the
 * type's themeAxis gates (minNouns vs cache, excludeBw). Themeless types
 * (themeAxis.applicable === false) emit ONE instance per (type, difficulty,
 * locale) with theme null.
 *
 * Each instance: { typeId, cacheTheme, difficulty, locale, deckId, seed }.
 * deckId = wsg-<waveShort>-<typeid>-<themeKey|nothm>-d<n>-<locale> — also the
 * staging ZIP basename (idempotent resume).
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { loadAllTypes } = require('./lib/load-types.js');
const { instanceSeed } = require('./lib/rng.js');
const { themeAxisKey, variantIdForSpec } = require('./emit/manifest.js');
const resolve = require('./image-cache/resolve.js');
const TAXONOMY = require('../../frontend/config/topics-taxonomy.json');

function selectSpecs(typesSel) {
  const all = loadAllTypes();
  if (!typesSel || typesSel === 'all') return all;
  if (Array.isArray(typesSel)) {
    const want = new Set(typesSel);
    const got = all.filter((s) => want.has(s.id));
    if (got.length !== want.size) {
      const found = new Set(got.map((s) => s.id));
      const missing = typesSel.filter((id) => !found.has(id));
      throw new Error('enumerate: unknown type ids: ' + missing.join(', '));
    }
    return got;
  }
  const bands = typesSel.gradeBands ? new Set(typesSel.gradeBands) : null;
  const classes = typesSel.assetClasses ? new Set(typesSel.assetClasses) : null;
  const exclude = new Set(typesSel.exclude || []);
  return all.filter((s) =>
    (!bands || bands.has(s.id.split('-')[0])) &&
    (!classes || classes.has(s.assetClass)) &&
    !exclude.has(s.id));
}

function isBwTheme(cacheTheme) {
  return /\bbw\b/i.test(cacheTheme);
}

/** True when a cached BW sibling exists for a color theme (K-011 class). */
function hasBwSibling(cacheTheme) {
  const m = resolve.manifest();
  return Object.values(m.themes).some((t) => t.bw && t.baseTheme &&
    t.baseTheme.toLowerCase() === String(cacheTheme).toLowerCase());
}

/** Themes (cache form) a spec can fan over, in wave-plan order. */
function eligibleThemes(spec, waveThemes) {
  return waveThemes.filter((t) => {
    if (spec.themeAxis.excludeBw && isBwTheme(t)) return false;
    if (spec.themeAxis.needsBwSibling && !hasBwSibling(t)) return false;
    let nouns;
    try { nouns = resolve.labelSafeNouns(t); }
    catch (e) { throw new Error('enumerate: theme not in image cache: ' + t + ' (run pull-themes.js)'); }
    return nouns.length >= (spec.themeAxis.minNouns || 1);
  });
}

function deckIdFor(waveId, spec, cacheTheme, difficulty, locale, variant) {
  const waveShort = String(waveId).replace(/[^a-z0-9]/gi, '').replace(/^wave0*/i, 'w');
  const themePart = cacheTheme ? themeAxisKey(cacheTheme) : 'nothm';
  const parts = ['wsg', waveShort, variantIdForSpec(spec), themePart, 'd' + difficulty, locale];
  // variant 1 omits the suffix so single-variant waves keep their current ZIP
  // basename (idempotent resume); variant >1 gets a -vN tail (unique deckId).
  if (variant && variant > 1) parts.push('v' + variant);
  return parts.join('-');
}

function enumerate(plan) {
  if (!plan || !plan.id || !Array.isArray(plan.locales) || !Array.isArray(plan.difficulties)) {
    throw new Error('enumerate: plan needs {id, locales, difficulties}');
  }
  const themes = plan.themes || [];
  const themesPerType = plan.themesPerType || 2;

  // Pre-flight: every wave theme must exist in the cache AND map to a
  // registered taxonomy theme axis-key (slug derivation + topic links).
  themes.forEach((t) => {
    resolve.themeEntry(t); // throws when not cached
    const key = themeAxisKey(t);
    if (!TAXONOMY.axes.theme[key]) {
      throw new Error('enumerate: theme "' + t + '" → axis-key "' + key + '" not in taxonomy axes.theme');
    }
  });

  const specs = selectSpecs(plan.types);

  // Pre-flight: non-EN locales need the full authored i18n layer (the lint
  // gate's invariants, asserted fail-fast here before any render).
  const nonEn = plan.locales.filter((l) => l !== 'en');
  for (const locale of nonEn) {
    for (const f of ['strings.' + locale + '.json', 'skill-sentences.' + locale + '.json']) {
      if (!fs.existsSync(path.join(__dirname, 'i18n', f))) {
        throw new Error('enumerate: missing i18n/' + f + ' (author the locale layer first; see lint-locale.js)');
      }
    }
    for (const fam of new Set(specs.map((s) => s.exerciseType))) {
      const entry = TAXONOMY.axes['exercise-type'][fam];
      if (!entry || !entry.slug || !entry.slug[locale] || !entry.name || !entry.name[locale]) {
        throw new Error('enumerate: family key "' + fam + '" missing taxonomy slug/name for locale ' + locale);
      }
    }
  }

  const instances = [];
  const skipped = [];
  specs.forEach((spec, idx) => {
    // Variant axis: N distinct worksheets per (type, theme, difficulty, locale).
    // Per-type override map wins over the wave-wide default; default 1 keeps
    // every pre-variant wave byte-identical.
    const variantsForType = (plan.variants && plan.variants[spec.id]) || plan.variantsPerType || 1;
    const themed = spec.themeAxis && spec.themeAxis.applicable;
    let themeList;
    if (themed) {
      const ok = eligibleThemes(spec, themes);
      if (!ok.length) {
        skipped.push({ typeId: spec.id, reason: 'no eligible theme (minNouns=' + spec.themeAxis.minNouns + ')' });
        return;
      }
      // Round-robin spread: type i starts at theme (i mod n) — deterministic,
      // balances theme coverage across the wave.
      themeList = [];
      for (let k = 0; k < Math.min(themesPerType, ok.length); k++) {
        themeList.push(ok[(idx + k) % ok.length]);
      }
    } else {
      themeList = [null];
    }
    for (const cacheTheme of themeList) {
      for (const difficulty of plan.difficulties) {
        for (const locale of plan.locales) {
          for (let variant = 1; variant <= variantsForType; variant++) {
            instances.push({
              typeId: spec.id,
              cacheTheme: cacheTheme,
              difficulty: difficulty,
              locale: locale,
              variant: variant,
              deckId: deckIdFor(plan.id, spec, cacheTheme, difficulty, locale, variant),
              seed: instanceSeed({ typeId: spec.id, theme: cacheTheme, difficulty, seedEpoch: plan.seedEpoch || 1, variant }),
            });
          }
        }
      }
    }
  });
  return { instances, skipped };
}

module.exports = { enumerate, selectSpecs, eligibleThemes, deckIdFor };
