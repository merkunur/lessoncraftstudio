#!/usr/bin/env node
/* Mutation harness for verify-class-graph.js.
   Each mutation is a defect a future edit could plausibly introduce; the
   gate must FAIL on every one. A SURVIVOR is a hole in the gate, never
   an acceptable mutation — fix the gate, never the mutation list.
   A gate run that HANGS counts as failed too, hence the timeout. */
'use strict';
const fs = require('fs');
const path = require('path');
const os = require('os');
const { execFileSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const SRC_PATH = path.join(ROOT, 'mini tools', 'class-graph.js');
const ORIG = fs.readFileSync(SRC_PATH, 'utf8');
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), 'cgr-mut-'));

/* anchor on the GENERATED shape of a strings line, so the locale pass
   (which regenerates the block) cannot silently un-anchor a mutation */
const sline = (k) => {
  const m = new RegExp('^ {4}' + k + ':\\s+\\{ ?en: [\'"][^\'"]*[\'"]', 'm').exec(ORIG);
  if (!m) throw new Error('cannot anchor string ' + k);
  return m[0];
};

const M = [
  /* the data */
  ['the view writes to the data', "next.mode = mode;", "next.mode = mode; if (mode === 'bar') next.votes = next.votes.slice(0, -1);"],
  ['revealing changes the data', "next.revealed = !!on;", "next.revealed = !!on; next.votes = next.votes.concat([0]);"],
  ['counts stop matching the votes', "for (i = 0; i < st.votes.length; i++) {", "for (i = 1; i < st.votes.length; i++) {"],
  ['counts crash on a null state', "if (!st || !st.cats) return out;", "if (!st) return out;"],
  ['an out-of-range vote is accepted', "if (!(catIndex >= 0 && catIndex < next.cats.length)) return next;", "if (catIndex < 0) return next;"],
  ['undo removes two', "next.votes.pop();", "next.votes.pop(); next.votes.pop();"],
  ['undo mutates its input', "  undo: function (st) {\n    var next = this._clone(st);", "  undo: function (st) {\n    var next = st;"],
  ['vote mutates its input', "  vote: function (st, catIndex) {\n    var next = this._clone(st);", "  vote: function (st, catIndex) {\n    var next = st;"],
  ['clearVotes does not clear', "  clearVotes: function (st) {\n    var next = this._clone(st);\n    next.votes = [];", "  clearVotes: function (st) {\n    var next = this._clone(st);"],
  ['an unknown mode is accepted', "if (mode !== 'pile' && mode !== 'bar') return next;", "if (false) return next;"],
  /* the curtain */
  ['the count is shown before the reveal', "      if (self.st.revealed) {", "      if (true) {"],
  ['a board starts revealed', "return { question: '', cats: [], votes: [], mode: 'pile', revealed: false };", "return { question: '', cats: [], votes: [], mode: 'pile', revealed: true };"],
  ['the count leaks into aria', "      lab.textContent = cat.label;", "      lab.setAttribute('aria-label', cat.label + ' ' + String(n));\n      lab.textContent = cat.label;"],
  /* stance */
  ['a ranking function appears', "  total: function (st)", "  most: function (st) { return 0; },\n  total: function (st)"],
  ['the columns get sorted', "    this.st.cats.forEach(function (cat, ci) {", "    this.st.cats.slice().sort().forEach(function (cat, ci) {"],
  ['ranking vocabulary in a string', sline('voteHint'), sline('voteHint').replace(/\{ ?en: ['"][^'"]*['"]/, "{ en: 'See which answer wins'")],
  ['score vocabulary in a string', sline('emptyNote'), sline('emptyNote').replace(/\{ ?en: ['"][^'"]*['"]/, "{ en: 'The score is zero'")],
  ['a stopwatch appears', "  catCap: function ()", "  _elapsed: function () { return 0; },\n  catCap: function ()"],
  /* anonymity */
  ['the tool reaches for the roster', "  STORE_KEY: 'lcs:class-graph:v1',", "  MC_KEY: 'lcs:my-classes:v1',\n  STORE_KEY: 'lcs:class-graph:v1',"],
  ['the class answers get persisted', "    try { localStorage.setItem(this.STORE_KEY, JSON.stringify(this._store)); } catch (_) {}", "    this._store.votes = this.st ? this.st.votes : [];\n    try { localStorage.setItem(this.STORE_KEY, JSON.stringify(this._store)); } catch (_) {}"],
  ['a state field appears', "return { question: '', cats: [], votes: [], mode: 'pile', revealed: false };", "return { question: '', cats: [], votes: [], mode: 'pile', revealed: false, whoVoted: [] };"],
  /* setup */
  ['duplicate answers are accepted', "if (!lab || Object.prototype.hasOwnProperty.call(seen, lab.toLowerCase())) continue;", "if (!lab) continue;"],
  ['blank answers are accepted', "if (!lab || Object.prototype.hasOwnProperty.call(seen, lab.toLowerCase())) continue;", "if (Object.prototype.hasOwnProperty.call(seen, lab.toLowerCase())) continue;"],
  ['the answer cap is removed', "i < labels.length && next.cats.length < this.MAX_CATS", "i < labels.length"],
  ['the label length cap is removed', "if (typeof max === 'number' && t.length > max) t = t.slice(0, max).trim();", "if (false) t = t.slice(0, max).trim();"],
  ['a new question inherits the votes', "    next.votes = [];\n    next.mode = 'pile';", "    next.mode = 'pile';"],
  ['a new question keeps the reveal', "    next.revealed = false;\n    return next;\n  },\n\n  /* ⚠ PURE and TOTAL", "    return next;\n  },\n\n  /* ⚠ PURE and TOTAL"],
  ['an answer loses its colour', "colour: this.COLOURS[next.cats.length % this.COLOURS.length]", "colour: ''"],
  ['cleanText crashes on null', "if (s == null) return '';", "if (false) return '';"],
  /* teacher text safety */
  ['the question becomes markup', "    q.textContent = this.st.question;", "    q.innerHTML = this.st.question;"],
  ['an answer label becomes markup', "      lab.textContent = cat.label;", "      lab.innerHTML = cat.label;"],
  /* fence */
  ['fence broken', "  DENSE_AT: 12,", "  SIBLING: 'calendar-wall',\n  DENSE_AT: 12,"],
  /* identity + exfil */
  ['id drifts', "id: 'class-graph'", "id: 'class-graph-v2'"],
  ['store key drifts', "STORE_KEY: 'lcs:class-graph:v1'", "STORE_KEY: 'lcs:cgr:v1'"],
  ['premium defaults true', "premium: false,", "premium: true,"],
  ['tasks declared (activity chrome)', "premium: false,", "premium: false,\n  tasks: [{ id: 'x' }],"],
  ['exfiltration path', "injectClassGraphCSS();", "navigator.sendBeacon('/track', '1'); injectClassGraphCSS();"],
  ['unexpected fetch target', "fetch('/api/auth/me'", "fetch('/api/telemetry'"],
  /* the palette */
  ['a verdict red enters the palette', "'#9C6B43'", "'#D6453C'"],
  ['a verdict green enters the palette', "'#3E7CB1'", "'#3F8F5E'"],
  ['two answers share a colour', "'#6B4C9A'", "'#146B5E'"],
  ['the palette runs short', "'#3E7CB1', '#9C6B43', '#C2569B'", "'#3E7CB1'"],
  /* css + strings */
  ['the bar gets a computed height', ".cgr-bar{position:absolute;inset:0;", ".cgr-bar{position:absolute;left:0;height:120px;"],
  ['reduced motion deletes the morph', "'.cgr-stamp,.cgr-bar{transition-duration:.12s;transition-delay:0s;}'", "'.cgr-stamp,.cgr-bar{transition:none;}'"],
  ['the vote button drops below the tap floor', "border-radius:999px;border:2.5px solid rgba(20,107,94,.3);background:#FFFDF7;", "border-radius:999px;border:2.5px solid rgba(20,107,94,.3);background:#FFFDF7;height:30px;"],
  ['a used string has no entry', sline('undo'), sline('undo').replace('undo:', 'undoX:')],
  ['a string loses en', sline('asBars'), sline('asBars').replace(/\{ ?en:/, '{ zz:')],
  /* the starters block is REGENERATED by the locale applier, so anchor
     on its generated shape, not the hand-written one */
  ['a starter exceeds the free tier', 'cats: ["Walked", "Car", "Bus"]', 'cats: ["Walked", "Car", "Bus", "Bike"]'],
  ['the starter pool runs short',
   ',\n      { q: "What is the weather doing right now?", cats: ["Sun", "Cloud", "Rain"] },\n      { q: "Which fruit would you choose?", cats: ["Apple", "Banana", "Pear"] }',
   ''],
  ['css injector not idempotent', "if (document.getElementById('cgr-style')) return;", "if (false) return;"],
  ['print block removed', "@media print", "@media screen and (min-width:99999px)"],
  ['reduced motion guard removed', "prefers-reduced-motion", "prefers-nothing"],
  ['restyles shell internals', ".cgr-wrap{", ".lcs-stage{padding:0;}.cgr-wrap{"],
  ['wide scope removed', "body.cgr-wide", "body.cgr-nope"]
];

let died = 0; const survivors = [];
M.forEach(([name, from, to], n) => {
  if (ORIG.indexOf(from) === -1) { survivors.push(`${name}  [ANCHOR NOT FOUND — mutation never applied]`); return; }
  const dir = path.join(TMP, 'm' + n);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'class-graph.js'), ORIG.split(from).join(to), 'utf8');
  let failed = false;
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'verify-class-graph.js')],
      { env: Object.assign({}, process.env, { CGR_TOOL_DIR: dir }), stdio: 'pipe', timeout: 20000 });
  } catch (e) { failed = true; }
  if (failed) { died++; console.log(`  killed   ${name}`); }
  else survivors.push(name);
});

console.log('');
survivors.forEach((s) => console.error(`  SURVIVED ${s}`));
console.log(`${died}/${M.length} mutations killed`);
try { fs.rmSync(TMP, { recursive: true, force: true }); } catch (_) {}
process.exit(survivors.length ? 1 : 0);
