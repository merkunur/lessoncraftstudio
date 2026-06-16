/* Shared `pt` render for the Brazilian-Portuguese landing fan-out (PART PT).
 *
 * Portuguese agreement (definite article + adjective, masculine/feminine) is handled
 * by STORED, hand-verified theme forms in pt-themes.js — this render is PURE
 * SUBSTITUTION, computing NO morphology (the it-render.js model). Prose configs are
 * authored to use the placeholders grammatically:
 *   {N_PL}    — the bare plural noun list (e.g. after a counting verb:
 *               "conte quantas vacas, ovelhas e galinhas há")
 *   {GEN}     — the plural collective (e.g. "animais")
 *   {GEN_ART} — the collective's definite plural article (os / as), stored
 *               per theme so "{GEN_ART} {GEN}" is always agreement-correct
 *   {H1}      — the display name (from topics-taxonomy.json name.pt)
 *
 * assertThemeTable() fail-halts at generation time on any theme missing a required
 * field or carrying a non-{os,as} article, so a wrong article can never reach a
 * published page (the it i/gli/le guard, sv *djurna precedent).
 */
'use strict';

// Preposition+article contractions (Portuguese: de+os=dos, em+as=nas, a+os=aos, …).
// The {DE_GEN}/{EM_GEN}/{A_GEN}/{POR_GEN} placeholders render the contracted
// preposition + collective as one correct unit, so a frame never emits the
// uncontracted "de os brinquedos" / "em as flores". ("com" does NOT contract →
// "com {GEN_ART} {GEN}" stays the default = "com os/as ...".)
const PREP = {
  DE:  { os: 'dos', as: 'das' },
  EM:  { os: 'nos', as: 'nas' },
  A:   { os: 'aos', as: 'às' },
  POR: { os: 'pelos', as: 'pelas' },
};

function render(tpl, t) {
  return String(tpl)
    .replace(/\{DE_GEN\}/g, PREP.DE[t.genArt] + ' ' + t.gen)
    .replace(/\{EM_GEN\}/g, PREP.EM[t.genArt] + ' ' + t.gen)
    .replace(/\{A_GEN\}/g, PREP.A[t.genArt] + ' ' + t.gen)
    .replace(/\{POR_GEN\}/g, PREP.POR[t.genArt] + ' ' + t.gen)
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
    if (['os', 'as'].indexOf(t.genArt) === -1) bad.push(k + ' (bad genArt "' + t.genArt + '")');
  });
  if (bad.length) throw new Error('pt-themes assertThemeTable FAIL: ' + bad.join(', '));
  return true;
}

module.exports = { render, assertThemeTable };
