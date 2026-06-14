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

// Preposition+article contractions (Italian: a+gli=agli, di+i=dei, …). The
// {A_GEN}/{DI_GEN}/{DA_GEN}/{IN_GEN}/{SU_GEN} placeholders render the contracted
// preposition + collective as one correct unit, so a frame never emits the
// uncontracted "a le cose" / "su i veicoli". (Plain "con {GEN_ART} {GEN}" stays
// the default — "con" does not contract.)
const PREP = {
  A:  { i: 'ai', gli: 'agli', le: 'alle' },
  DI: { i: 'dei', gli: 'degli', le: 'delle' },
  DA: { i: 'dai', gli: 'dagli', le: 'dalle' },
  IN: { i: 'nei', gli: 'negli', le: 'nelle' },
  SU: { i: 'sui', gli: 'sugli', le: 'sulle' },
};

function render(tpl, t) {
  return String(tpl)
    .replace(/\{A_GEN\}/g, PREP.A[t.genArt] + ' ' + t.gen)
    .replace(/\{DI_GEN\}/g, PREP.DI[t.genArt] + ' ' + t.gen)
    .replace(/\{DA_GEN\}/g, PREP.DA[t.genArt] + ' ' + t.gen)
    .replace(/\{IN_GEN\}/g, PREP.IN[t.genArt] + ' ' + t.gen)
    .replace(/\{SU_GEN\}/g, PREP.SU[t.genArt] + ' ' + t.gen)
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
