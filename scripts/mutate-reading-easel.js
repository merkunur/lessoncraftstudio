#!/usr/bin/env node
/* Mutation harness for verify-reading-easel.js.
   Each mutation is a defect a future edit could plausibly introduce; the
   gate must FAIL on every one. A SURVIVOR is a hole in the gate, never
   an acceptable mutation — fix the gate, never the mutation list.
   A gate run that HANGS counts as failed too (the Pattern Bench lesson),
   hence the timeout. */
'use strict';
const fs = require('fs');
const path = require('path');
const os = require('os');
const { execFileSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const SRC_PATH = path.join(ROOT, 'mini tools', 'reading-easel.js');
const ORIG = fs.readFileSync(SRC_PATH, 'utf8');
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), 'rde-mut-'));

/* anchor on the generated shape of a strings line, so a locale pass
   (which regenerates the block) does not silently un-anchor a mutation */
const sline = (k) => {
  const m = new RegExp('^ {4}' + k + ':\\s+\\{ ?en: [\'"][^\'"]*[\'"]', 'm').exec(ORIG);
  if (!m) throw new Error('cannot anchor string ' + k);
  return m[0];
};

const M = [
  /* the partition */
  ['groups stops closing at a boundary', "if (this.isBreak(st, i) && i < st.words.length - 1) { out.push(cur); cur = []; }", "if (false) { out.push(cur); cur = []; }"],
  ['groups drops the tail', "if (cur.length) out.push(cur);", "if (false) out.push(cur);"],
  ['groups duplicates a word', "cur.push(i);", "cur.push(i); if (i > 0) cur.push(i);"],
  ['groups goes out of order', "for (i = 0; i < st.words.length; i++) {", "for (i = st.words.length - 1; i >= 0; i--) {"],
  ['groups crashes on an empty line', "if (!st || !st.words || !st.words.length) return [];", "if (!st) return [];"],
  /* the two readings */
  ['the robot reading drops a word', "robotChunks: function (st) { return (st && st.words ? st.words : []).slice(); }", "robotChunks: function (st) { return (st && st.words ? st.words : []).slice(1); }"],
  ['the robot reading reorders', "robotChunks: function (st) { return (st && st.words ? st.words : []).slice(); }", "robotChunks: function (st) { return (st && st.words ? st.words : []).slice().reverse(); }"],
  ['the scooped reading is not the groups', "scoopedChunks: function (st) { return this.groupTexts(st); }", "scoopedChunks: function (st) { return this.robotChunks(st); }"],
  ['the robot reading stops separating', "if (i) out += this.PAUSE_MARK.test(chunks[i - 1]) ? ' ' : this.SEP;", "if (i) out += ' ';"],
  ['the teacher comma gets doubled', "if (i) out += this.PAUSE_MARK.test(chunks[i - 1]) ? ' ' : this.SEP;", "if (i) out += this.SEP;"],
  ['wordsOnly stops normalising', "+/g, ' ').replace(/\\s+/g, ' ').trim();", "+/g, ' ').trim();"],
  /* the tokeniser */
  ['tokenize crashes on null', "if (text == null) return [];", "if (false) return [];"],
  ['tokenize stops collapsing whitespace', "var raw = String(text).replace(/\\s+/g, ' ').trim();", "var raw = String(text).trim();"],
  ['tokenize splits punctuation off its word', "var parts = raw.split(' ');", "var parts = raw.split(/[\\s,]+/);"],
  ['the word cap is removed', "if (out.length >= this.MAX_WORDS) break;", "if (false) break;"],
  ['tokenize returns a shared array', "    var parts = raw.split(' ');\n    var out = [], i;", "    var parts = raw.split(' ');\n    var out = (this._shared = this._shared || []), i;\n    out.length = 0;"],
  /* the model */
  ['a boundary after the last word is accepted', "if (!(i >= 0 && i < next.words.length - 1)) return next;", "if (i < 0) return next;"],
  ['a negative boundary is accepted', "if (!(i >= 0 && i < next.words.length - 1)) return next;", "if (!(i < next.words.length - 1)) return next;"],
  ['toggleBreak is not a toggle', "if (at > -1) next.breaks.splice(at, 1); else next.breaks.push(i);", "next.breaks.push(i);"],
  ['toggleBreak mutates its input', "  toggleBreak: function (st, i) {\n    var next = this._clone(st);", "  toggleBreak: function (st, i) {\n    var next = st;"],
  ['breaks stop being sorted', "next.breaks.sort(function (a, b) { return a - b; });", ""],
  ['a new line inherits the old scoops', "    next.breaks = [];        /* a new line has no scoops on it */", "    next.breaks = next.breaks || [];"],
  ['clearBreaks does not clear', "    next.breaks = [];\n    next.step = -1;\n    return next;\n  },\n\n  /* ⚠ THE PARTITION", "    next.step = -1;\n    return next;\n  },\n\n  /* ⚠ THE PARTITION"],
  ['a state field appears', "return { words: [], breaks: [], step: -1 };", "return { words: [], breaks: [], step: -1, wpmSeen: 0 };"],
  /* the stance */
  ['a stopwatch appears', "  _stepScoop: function () {", "  _stopwatch: function () { var startTime = 0; return startTime; },\n  _stepScoop: function () {"],
  ['words per minute appears', "  FREE_STARTERS: 3,", "  FREE_STARTERS: 3,\n  wpm: 0,"],
  ['the reading is paced by a timer', "    this._sayGroup(g[next]);", "    setTimeout(function () {}, 400); this._sayGroup(g[next]);"],
  ['a verdict appears', "  _stepScoop: function () {", "  _stepScoop: function () { var isCorrect = true; void isCorrect;"],
  ['a verdict class appears', "'rde-word'", "'rde-word rde-correct'"],
  ['verdict wording in a string', sline('gapHint'), sline('gapHint').replace(/\{ ?en: ['"][^'"]*['"]/, "{ en: 'Wrong, try again'")],
  /* speech */
  ['a speak loses its literal type', "LCSAudio.speak({ type: 'ui', text: text, lang: this.api.lang, rate: 0.85 })", "LCSAudio.speak({ type: T, text: text, lang: this.api.lang, rate: 0.85 })"],
  ['a speak switches to the recorded-word namespace', "LCSAudio.speak({ type: 'ui', text: text, lang: this.api.lang, rate: 0.85 })", "LCSAudio.speak({ type: 'word', text: text, lang: this.api.lang, rate: 0.85 })"],
  ['a speak loses lang', "LCSAudio.speak({ type: 'ui', text: text, lang: this.api.lang, rate: 0.95 })", "LCSAudio.speak({ type: 'ui', text: text, rate: 0.95 })"],
  ['the robot reading is not slower', "rate: 0.85 }", "rate: 0.99 }"],
  ['the tool stops speaking at all', "LCSAudio.speak", "void LCSAudio && voidSpeak"],
  /* voice honesty */
  ['a reading skips the voice check', "    if (!this.api.settings.voice || !this._canSpeak()) return;\n    var text = this.robotText(st);", "    if (!this.api.settings.voice) return;\n    var text = this.robotText(st);"],
  ['hasVoice is removed', "  hasVoice: function (lang, voices) {", "  _hasVoiceOld: function (lang, voices) {"],
  ['the no->nb remap is dropped', "var want = ({ no: 'nb', pt: 'pt' }[lang] || lang).toLowerCase();", "var want = String(lang).toLowerCase();"],
  ['the muted affordance is dropped', "d.textContent = '\u{1F507} ' + api.t('voiceMissing');", "d.textContent = api.t('voiceMissing');"],
  ['the voiceMissing string goes unused', "if (!this._canSpeak() && api.settings.voice) wrap.appendChild(this._buildVoiceMissing());", ""],
  ['an arc is drawn before anyone scooped', "if (!this.st.breaks.length) return;", "if (false) return;"],
  /* teacher text safety */
  ['teacher text becomes markup', "      sp.textContent = w;", "        sp.innerHTML = w;"],
  /* fence */
  ['fence broken', "  FREE_STARTERS: 3,", "  FREE_STARTERS: 3,\n  SIBLING: 'syllable-splitter',"],
  /* identity + exfil */
  ['id drifts', "id: 'reading-easel'", "id: 'reading-easel-v2'"],
  ['store key drifts', "STORE_KEY: 'lcs:reading-easel:v1'", "STORE_KEY: 'lcs:rde:v1'"],
  ['premium defaults true', "premium: false,", "premium: true,"],
  ['tasks declared (activity chrome)', "premium: false,", "premium: false,\n  tasks: [{ id: 'x' }],"],
  ['exfiltration path', "injectReadingEaselCSS();", "navigator.sendBeacon('/track', '1'); injectReadingEaselCSS();"],
  ['unexpected fetch target', "fetch('/api/auth/me'", "fetch('/api/telemetry'"],
  /* strings + starters + css */
  ['a used string has no entry', sline('clearScoops'), sline('clearScoops').replace('clearScoops:', 'clearScoopsX:')],
  ['a string loses en', sline('changeLine'), sline('changeLine').replace(/\{ ?en:/, '{ zz:')],
  /* ⚠ the starters block is REGENERATED by the locale applier, so anchor
     on its generated shape (6 spaces, double quotes), not on the shape it
     had when it was hand-written */
  ['a starter line is too short to scoop', '      "The cat sat on my lap",', '      "Go now",'],
  /* collapse the EN pool to 2 lines, below the free tier of 3 */
  ['the starter pool drops below the free tier',
   '      "My little brother can run very fast",\n      "The old blue boat sailed away",\n      "When it rains, the ducks are happy",\n      "We keep our boots by the door",\n      "The moon came up behind the hill",\n      "Grandma made soup for all of us"\n',
   ''],
  ['css injector not idempotent', "if (document.getElementById('rde-style')) return;", "if (false) return;"],
  ['print block removed', "@media print", "@media screen and (min-width:99999px)"],
  ['reduced motion guard removed', "prefers-reduced-motion", "prefers-nothing"],
  ['restyles shell internals', ".rde-wrap{", ".lcs-stage{padding:0;}.rde-wrap{"],
  ['wide scope removed', "body.rde-wide", "body.rde-nope"],
  ['the word gap drops below the tap floor', "min-height:44px;padding:0;margin:0 1px;", "min-height:30px;padding:0;margin:0 1px;"]
];

let died = 0; const survivors = [];
M.forEach(([name, from, to], n) => {
  if (ORIG.indexOf(from) === -1) { survivors.push(`${name}  [ANCHOR NOT FOUND — mutation never applied]`); return; }
  const dir = path.join(TMP, 'm' + n);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'reading-easel.js'), ORIG.split(from).join(to), 'utf8');
  let failed = false;
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'verify-reading-easel.js')],
      { env: Object.assign({}, process.env, { RDE_TOOL_DIR: dir }), stdio: 'pipe', timeout: 20000 });
  } catch (e) { failed = true; }
  if (failed) { died++; console.log(`  killed   ${name}`); }
  else survivors.push(name);
});

console.log('');
survivors.forEach((s) => console.error(`  SURVIVED ${s}`));
console.log(`${died}/${M.length} mutations killed`);
try { fs.rmSync(TMP, { recursive: true, force: true }); } catch (_) {}
process.exit(survivors.length ? 1 : 0);
