/* =====================================================================
   mutate-arrow-strip.js — does verify-arrow-strip.js actually bite?
   ---------------------------------------------------------------------
   Run:  node scripts/mutate-arrow-strip.js
   Each mutation is a surgical edit to a COPY of the tool; the gate runs
   against the copy via ARW_TOOL_DIR and MUST fail. A survivor is a hole
   in the gate. An INERT mutation (one that provably cannot change
   behaviour) is a bad mutation, not a gate hole — fix the mutation.

   ⚠ Keep the tool file LF, or every multi-line anchor silently reports
   ANCHOR NOT FOUND and the whole harness reports a clean sweep of
   nothing.
   ===================================================================== */

'use strict';
const fs = require('fs');
const path = require('path');
const os = require('os');
const { execFileSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const SRC_FILE = path.join(ROOT, 'mini tools', 'arrow-strip.js');
const GATE = path.join(__dirname, 'verify-arrow-strip.js');
const ORIGINAL = fs.readFileSync(SRC_FILE, 'utf8');

const M = [
  /* ---- the kinematics ---- */
  ['a turn also moves the beetle',
    "if (card === 'L') { p.h = (p.h + 3) % 4; return p; }",
    "if (card === 'L') { p.h = (p.h + 3) % 4; p.c = p.c - 1; return p; }"],
  ['a turn goes the wrong way round',
    "if (card === 'L') { p.h = (p.h + 3) % 4; return p; }",
    "if (card === 'L') { p.h = (p.h + 1) % 4; return p; }"],
  ['L and R are the same card',
    "if (card === 'R') { p.h = (p.h + 1) % 4; return p; }",
    "if (card === 'R') { p.h = (p.h + 3) % 4; return p; }"],
  ['back is forward',
    "var d = (card === 'F') ? 1 : (card === 'B') ? -1 : 0;",
    "var d = (card === 'F') ? 1 : (card === 'B') ? 1 : 0;"],
  ['the heading table is rotated one quarter',
    'DR: [-1, 0, 1, 0],\n  DC: [0, 1, 0, -1],',
    'DR: [0, 1, 0, -1],\n  DC: [1, 0, -1, 0],'],
  ['the heading table is mirrored',
    'DC: [0, 1, 0, -1],',
    'DC: [0, -1, 0, 1],'],
  ['a step also nudges the facing',
    'p.r = nr; p.c = nc;\n    return p;',
    'p.r = nr; p.c = nc; p.h = (p.h + 1) % 4;\n    return p;'],

  /* ---- the edge: A3's three separate clauses ---- */
  ['a blocked move BOUNCES instead of standing still',
    "if (!this._onMat(n, nr, nc)) return p;",
    "if (!this._onMat(n, nr, nc)) { p.h = (p.h + 2) % 4; return p; }"],
  ['the mat WRAPS',
    "if (!this._onMat(n, nr, nc)) return p;",
    "if (!this._onMat(n, nr, nc)) { p.r = ((nr % n) + n) % n; p.c = ((nc % n) + n) % n; return p; }"],
  ['the edge check is off by one on the high side',
    'return r >= 0 && r < n && c >= 0 && c < n;',
    'return r >= 0 && r <= n && c >= 0 && c <= n;'],
  ['the edge check is off by one on the low side',
    'return r >= 0 && r < n && c >= 0 && c < n;',
    'return r >= -1 && r < n && c >= -1 && c < n;'],
  ['the edge is checked on the OLD square, not the new one',
    'if (!this._onMat(n, nr, nc)) return p;',
    'if (!this._onMat(n, p.r, p.c)) return p;'],

  /* ---- the run ---- */
  ['the run drops the last card',
    'for (i = 0; i < cards.length; i++) {\n      cur = this.applyCard(cur, cards[i], n);',
    'for (i = 0; i < cards.length - 1; i++) {\n      cur = this.applyCard(cur, cards[i], n);'],
  ['the run omits the start pose',
    "var out = [{ r: pose.r, c: pose.c, h: pose.h }], i, cur = out[0];",
    "var out = [], i, cur = { r: pose.r, c: pose.c, h: pose.h };"],
  ['the run executes the rail backwards',
    'var cards = this._cards(rail);\n    for (i = 0; i < cards.length; i++) {\n      cur = this.applyCard(cur, cards[i], n);',
    'var cards = this._cards(rail).slice().reverse();\n    for (i = 0; i < cards.length; i++) {\n      cur = this.applyCard(cur, cards[i], n);'],
  ['the run sorts the rail — order stops mattering',
    'var cards = this._cards(rail);\n    for (i = 0; i < cards.length; i++) {\n      cur = this.applyCard(cur, cards[i], n);',
    'var cards = this._cards(rail).slice().sort();\n    for (i = 0; i < cards.length; i++) {\n      cur = this.applyCard(cur, cards[i], n);'],

  /* ---- the inverse ---- */
  ['the inverse does not reverse the order',
    'return cards.reverse().map(function (c) { return map[c] || c; });',
    'return cards.map(function (c) { return map[c] || c; });'],
  ['the inverse does not invert the turns',
    "var map = { F: 'B', B: 'F', L: 'R', R: 'L' };",
    "var map = { F: 'B', B: 'F', L: 'L', R: 'R' };"],
  ['the inverse does not invert the steps',
    "var map = { F: 'B', B: 'F', L: 'R', R: 'L' };",
    "var map = { F: 'F', B: 'B', L: 'R', R: 'L' };"],

  /* ---- the blocked predicate that A2 leans on ---- */
  ['blocked() always says no — so A2 would assert the inverse over blocking runs too',
    "if ((cards[i] === 'F' || cards[i] === 'B') &&",
    "if (false && (cards[i] === 'F' || cards[i] === 'B') &&"],
  ['blocked() always says yes — so A2 checks nothing at all',
    'blocked: function (pose, rail, n) {',
    'blocked: function (pose, rail, n) { if (1) return true;'],
  ['blocked() ignores back cards',
    "if ((cards[i] === 'F' || cards[i] === 'B') &&",
    "if ((cards[i] === 'F') &&"],

  /* ---- A14: the two defects the browser test caught, so they cannot
     come back quietly ---- */
  ['⭐ the ghost is computed from the LIVE rail — the real shipped bug: invention 2 draws the new run twice',
    'if (s.ranRail && s.ranRail.length) s.ghost = this.run(s.pose, s.ranRail, s.n);',
    'if (s.ranRail && s.ranRail.length) s.ghost = this.run(s.pose, s.rail, s.n);'],
  ['⭐ the trail is derived from the rail as it stands, not the run that happened',
    '    return (s.ranRail && s.ranRail.length)\n      ? this.run(s.pose, s.ranRail, s.n)',
    '    return (s.ranRail && s.ranRail.length)\n      ? this.run(s.pose, s.rail, s.n)'],
  ['the ghost is never kept at all',
    'if (s.ranRail && s.ranRail.length) s.ghost = this.run(s.pose, s.ranRail, s.n);',
    ''],
  ['a run does not record what it ran',
    's.ranRail = s.rail.slice();',
    's.ranRail = s.ranRail || s.rail.slice();'],

  /* ---- purity and shape ---- */
  ['the model reaches for the DOM',
    'newState: function () {',
    'newState: function () { if (typeof document !== "undefined" && document.getElementById) { document.getElementById("x"); }'],
  ['the model rolls a die',
    'toggleEye: function (st) {',
    'toggleEye: function (st) { if (Math.random() < 0) return st;'],
  ['a model call mutates its input',
    'addCard: function (st, card) {\n    var s = this._clone(st);',
    'addCard: function (st, card) {\n    var s = st;'],
  ['a state key is dropped',
    "      eye: 'mat'\n    };",
    '    };'],
  ['a state key is added',
    "      eye: 'mat'\n    };",
    "      eye: 'mat',\n      tries: 0\n    };"],
  ['hostile input throws instead of clamping',
    '_cards: function (rail) { return Array.isArray(rail) ? rail : []; },',
    '_cards: function (rail) { return rail; },'],
  ['the array test goes back to duck-typing on .slice — the bug the gate caught',
    '_cards: function (rail) { return Array.isArray(rail) ? rail : []; },',
    '_cards: function (rail) { return (rail && rail.slice) ? rail : []; },'],

  /* ---- identity and the refusals ---- */
  ['the tool declares tasks',
    "  STORE_KEY: 'lcs:arrow-strip:v1',",
    "  tasks: [{ id: 1 }],\n  STORE_KEY: 'lcs:arrow-strip:v1',"],
  ['a goal appears — there is meant to be nothing to reach',
    "  MAX_RAIL: 12,",
    "  MAX_RAIL: 12,\n  goal: { r: 0, c: 0 },"],
  ['a solution concept appears',
    'endPose: function (st) {',
    'solution: function (st) { return null; },\n  endPose: function (st) {'],
  ['a verdict counter appears',
    "  MAX_RAIL: 12,",
    "  MAX_RAIL: 12,\n  attempts: 0,"],
  ['a stopwatch appears',
    "  MAX_RAIL: 12,",
    "  MAX_RAIL: 12,\n  _elapsed: 0,"],
  ['a function takes a direction as an argument',
    'applyCard: function (pose, card, n) {',
    'applyCard: function (pose, card, n, direction) {'],
  ['an exfiltration path appears',
    'toggleEye: function (st) {',
    'toggleEye: function (st) { if (0) navigator.sendBeacon("/x");'],

  /* ---- the eleven-locale vocabulary ban, one per family ---- */
  ['en names an absolute direction',
    'buildHint:    { en: "Put cards in the rail. Nothing moves yet.",',
    'buildHint:    { en: "Put cards in the rail. North is up.",'],
  ['de names an absolute direction',
    'de: "Legt Karten in die Bahn. Noch bewegt sich nichts."',
    'de: "Legt Karten in die Bahn. Nach oben ist Norden."'],
  ['fr names an absolute direction — and it must be caught THROUGH the est/sur homographs',
    "fr: \"Placez des cartes sur la piste. Rien ne bouge encore.\"",
    "fr: \"Placez des cartes sur la piste. Le haut est vers le nord.\""],
  ['es names an absolute direction',
    'es: "Pongan tarjetas en la pista. Todavía no se mueve nada."',
    'es: "Pongan tarjetas en la pista. Arriba está el norte."'],
  ['pt names an absolute direction',
    'pt: "Ponham cartas na pista. Ainda não se mexe nada."',
    'pt: "Ponham cartas na pista. Em cima fica o norte."'],
  ['it names an absolute direction',
    'it: "Mettete le carte sulla pista. Ancora non si muove niente."',
    'it: "Mettete le carte sulla pista. In alto c\'è il nord."'],
  ['nl names an absolute direction',
    'nl: "Leg kaarten in het spoor. Er beweegt nog niets."',
    'nl: "Leg kaarten in het spoor. Boven is het noorden."'],
  ['sv names an absolute direction',
    'sv: "Lägg kort i banan. Ingenting rör sig än."',
    'sv: "Lägg kort i banan. Uppåt är norr."'],
  ['da names an absolute direction',
    'da: "Læg kort i banen. Der sker ikke noget endnu."',
    'da: "Læg kort i banen. Opad er nord."'],
  ['no names an absolute direction',
    'no: "Legg kort i banen. Ingenting beveger seg ennå."',
    'no: "Legg kort i banen. Oppover er nord."'],
  ['fi names an absolute direction',
    'fi: "Aseta kortteja radalle. Mikään ei liiku vielä."',
    'fi: "Aseta kortteja radalle. Ylös on pohjoinen."'],

  /* ---- verdict wording ---- */
  ['a locale carries verdict wording',
    'againHint:    { en: "Change one card and run it again.",',
    'againHint:    { en: "Change one card. That one was wrong.",'],
  ['a comparison glyph appears in a string',
    'runBtn:       { en: "Run it",',
    'runBtn:       { en: "Run it >",'],
  ['an invisible character is hidden in a string',
    'da: "Kør"',
    'da: "K­or"'],
  ['a locale is missing',
    'fi: "Aja" },',
    '},'],

  /* ---- the Mat Book (A13) — proves the repertoire gate bites ---- */
  ['a mat starts off its own mat',
    null, null, { mats: true, from: '{ "id": "m4-01", "n": 4, "r": 3, "c": 0, "h": 0, "free": true }', to: '{ "id": "m4-01", "n": 4, "r": 9, "c": 0, "h": 0, "free": true }' }],
  ['a mat carries a heading that does not exist',
    null, null, { mats: true, from: '"id": "m6-01", "n": 6, "r": 5, "c": 0, "h": 0', to: '"id": "m6-01", "n": 6, "r": 5, "c": 0, "h": 7' }],
  ['a mat is a size the tool cannot render',
    null, null, { mats: true, from: '{ "id": "m6-02", "n": 6,', to: '{ "id": "m6-02", "n": 7,' }],
  ['⭐ a ROUTE rides in the Mat Book — treasure-hunt ground',
    null, null, { mats: true, from: '{ "id": "m4-02", "n": 4, "r": 0, "c": 3, "h": 2, "free": false }', to: '{ "id": "m4-02", "n": 4, "r": 0, "c": 3, "h": 2, "free": false, "route": ["F","F","L","F"] }' }],
  ['freeMax disagrees with the mats marked free',
    null, null, { mats: true, from: '"freeMax": 3,', to: '"freeMax": 5,' }],
  ['the first affordance is locked on arrival — no free mat at all',
    null, null, { mats: true, from: '"h": 0, "free": true }', to: '"h": 0, "free": false }' }],
  ['two mats share an id',
    null, null, { mats: true, from: '"id": "m8-02"', to: '"id": "m8-01"' }],

  /* ---- the poison test on the gate's own narrowing ---- */
  ['the fr vocabulary list is anchored into uselessness (a gate mutation, not a tool one)',
    null, null, { gate: true, from: "fr: /\\b(vers le haut|vers le bas|nord|sud|ouest)\\b|\\b(à|a|vers|de) l'est\\b/i", to: "fr: /\\bZZZZNEVERZZZZ\\b/i" }],
  ['the es vocabulary list is anchored into uselessness (a gate mutation)',
    null, null, { gate: true, from: 'es: /\\b(hacia arriba|hacia abajo|norte|sur|oeste)\\b|\\b(al|hacia el|del) este\\b/i', to: 'es: /\\bZZZZNEVERZZZZ\\b/i' }]
];

/* ⚠ THE MAT BOOK MUST TRAVEL WITH THE TOOL. A13 reads it from TOOL_DIR;
   without this copy every mutation would be "killed" by a missing file
   rather than by the defect it plants, and the harness would report a
   perfect sweep of nothing. The MATS entry below proves A13 itself bites. */
const MATS_FILE = path.join(ROOT, 'mini tools', 'arrow-strip-mats.json');
const MATS_SRC = fs.readFileSync(MATS_FILE, 'utf8');

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'arw-mut-'));
const tmpMats = path.join(tmp, 'arrow-strip-mats.json');
const tmpTool = path.join(tmp, 'arrow-strip.js');
const tmpGate = path.join(tmp, 'verify-arrow-strip.js');
const GATE_SRC = fs.readFileSync(GATE, 'utf8');

let killed = 0, survived = 0, anchorless = 0;

const runGate = (gateFile) => {
  try {
    execFileSync(process.execPath, [gateFile], {
      env: Object.assign({}, process.env, { ARW_TOOL_DIR: tmp }),
      timeout: 30000, stdio: 'pipe'
    });
    return 0;
  } catch (e) { return e.status === null ? -1 : (e.status || 1); }
};

console.log(`mutating the arrow strip — ${M.length} mutations\n`);

M.forEach(([label, from, to, opt]) => {
  let gateFile = GATE;
  fs.writeFileSync(tmpMats, (opt && opt.mats) ? MATS_SRC.replace(opt.from, opt.to) : MATS_SRC, 'utf8');
  if (opt && opt.mats) {
    if (MATS_SRC.indexOf(opt.from) === -1) { anchorless++; console.log(`  ANCHOR NOT FOUND (mats)  ${label}`); return; }
    fs.writeFileSync(tmpTool, ORIGINAL, 'utf8');
    const c = runGate(GATE);
    if (c === 0) { survived++; console.log(`  SURVIVED  ${label}`); } else { killed++; console.log(`  killed    ${label}`); }
    return;
  }
  if (opt && opt.gate) {
    if (GATE_SRC.indexOf(opt.from) === -1) { anchorless++; console.log(`  ANCHOR NOT FOUND (gate)  ${label}`); return; }
    fs.writeFileSync(tmpGate, GATE_SRC.replace(opt.from, opt.to), 'utf8');
    fs.writeFileSync(tmpTool, ORIGINAL, 'utf8');
    gateFile = tmpGate;
  } else {
    if (ORIGINAL.indexOf(from) === -1) { anchorless++; console.log(`  ANCHOR NOT FOUND        ${label}`); return; }
    const mutated = ORIGINAL.replace(from, to);
    if (mutated === ORIGINAL) { anchorless++; console.log(`  INERT (no-op edit)      ${label}`); return; }
    fs.writeFileSync(tmpTool, mutated, 'utf8');
  }
  const code = runGate(gateFile);
  if (code === 0) { survived++; console.log(`  SURVIVED  ${label}`); }
  else if (code === -1) { survived++; console.log(`  TIMED OUT (counts as survived)  ${label}`); }
  else { killed++; console.log(`  killed    ${label}`); }
});

fs.rmSync(tmp, { recursive: true, force: true });
console.log('');
console.log(`${killed} killed, ${survived} survived, ${anchorless} anchorless of ${M.length}`);
if (survived || anchorless) { console.log('FAIL — the gate has a hole, or a mutation is misanchored'); process.exit(1); }
console.log('PASS — every mutation killed');
