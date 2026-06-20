/* Shared `es` render for the cross-language ("Aprender <X>") landing fan-out (es page-locale → {en, pt}).
 * Spanish agreement (definite plural article los/las) is handled by STORED, hand-verified theme forms in
 * es-themes.js — PURE SUBSTITUTION, no computed morphology (the it/sv-render model). Spanish does NOT
 * contract de/a + los/las (only the singular del/al), so no preposition-contraction slots are needed.
 *   {N_PL}    — the bare plural noun list ("vacas, ovejas y gallinas")
 *   {GEN}     — the plural collective ("animales")
 *   {GEN_ART} — the collective's definite plural article (los / las), stored per theme so
 *               "{GEN_ART} {GEN}" is always agreement-correct ("los animales", "las cosas")
 *   {H1}      — the display name (from topics-taxonomy.json name.es)
 * (The taught-language name is substituted separately by the engine's {TGT}/{TGT_CAP} pass.)
 * assertThemeTable() fail-halts on a missing field or a non-{los,las} article (the it precedent).
 */
'use strict';

function render(tpl, t) {
  return String(tpl)
    .replace(/\{GEN_ART\}/g, t.genArt)
    .replace(/\{N_PL\}/g, t.nPl)
    .replace(/\{GEN\}/g, t.gen)
    .replace(/\{H1\}/g, t.h1);
}

function assertThemeTable(THEMES) {
  const bad = [];
  Object.keys(THEMES).forEach(function (k) {
    const t = THEMES[k];
    if (!t || !t.nPl || !t.gen || !t.genArt || !t.h1) { bad.push(k + ' (missing field)'); return; }
    if (['los', 'las'].indexOf(t.genArt) === -1) bad.push(k + ' (bad genArt "' + t.genArt + '")');
  });
  if (bad.length) throw new Error('es-themes assertThemeTable FAIL: ' + bad.join(', '));
  return true;
}

module.exports = { render, assertThemeTable };
