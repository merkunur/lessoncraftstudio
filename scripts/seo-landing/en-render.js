/* Shared `en` render for the cross-language ("Learn <X>") landing fan-out (en page-locale).
 * English has no noun declension and no gendered article, so this is PURE SUBSTITUTION (no morphology):
 *   {N_PL} — the plural example list ("cats, sheep and hens")
 *   {GEN}  — the collective ("animals")
 *   {H1}   — the display name ("Animals")
 * (The taught-language name is substituted separately by the engine's {TGT}/{TGT_CAP} pass.)
 * assertThemeTable() fail-halts on a theme missing a required field (the sv/it precedent).
 */
'use strict';

function render(tpl, t) {
  return String(tpl)
    .replace(/\{N_PL\}/g, t.nPl)
    .replace(/\{GEN\}/g, t.gen)
    .replace(/\{H1\}/g, t.h1);
}

function assertThemeTable(THEMES) {
  const bad = [];
  Object.keys(THEMES).forEach(function (k) {
    const t = THEMES[k];
    if (!t || !t.nPl || !t.gen || !t.h1) bad.push(k + ' (missing field)');
  });
  if (bad.length) throw new Error('en-themes assertThemeTable FAIL: ' + bad.join(', '));
  return true;
}

module.exports = { render, assertThemeTable };
