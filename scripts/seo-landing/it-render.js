/* Shared `it` render for the Italian landing fan-out (PART IT).
 *
 * Italian agreement (definite article + adjective, masculine/feminine) is handled
 * by STORED, hand-verified theme forms in it-themes.js — this render is PURE
 * SUBSTITUTION, computing NO morphology (the sv-render.js model, NOT de's dative
 * engine). Prose configs are authored to use the placeholders grammatically:
 *   {N_PL}    — the bare plural noun list (e.g. after a counting verb:
 *               "conta quante mucche, pecore e galline ci sono")
 *   {GEN}     — the plural collective (e.g. "animali")
 *   {GEN_ART} — the collective's definite plural article (i / gli / le), stored
 *               per theme so "{GEN_ART} {GEN}" is always agreement-correct
 *   {H1}      — the display name (from topics-taxonomy.json name.it)
 *
 * assertThemeTable() fail-halts at generation time on any theme missing a required
 * field or carrying a non-{i,gli,le} article, so a wrong article can never reach a
 * published page (the A1 *djurna-class guard, sv precedent).
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
  var bad = [];
  Object.keys(THEMES).forEach(function (k) {
    var t = THEMES[k];
    if (!t || !t.nPl || !t.gen || !t.genArt || !t.h1) { bad.push(k + ' (missing field)'); return; }
    if (['i', 'gli', 'le'].indexOf(t.genArt) === -1) bad.push(k + ' (bad genArt "' + t.genArt + '")');
  });
  if (bad.length) throw new Error('it-themes assertThemeTable FAIL: ' + bad.join(', '));
  return true;
}

module.exports = { render, assertThemeTable };
