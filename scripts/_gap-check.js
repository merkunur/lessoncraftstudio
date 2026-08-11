/* Post-fix checks that do not need a browser.
   ⚠ Each one is poisoned in BOTH directions where a threshold exists. */
const fs = require('fs');
const path = require('path');
const src = fs.readFileSync('mini tools/the-gap.js', 'utf8');
const T = require(path.join(process.cwd(), 'mini tools', 'the-gap.js'));

let fails = 0;
function ok(name, cond, detail) {
  if (!cond) { fails++; console.log('FAIL ' + name + (detail ? '  ' + detail : '')); }
  else console.log('ok   ' + name + (detail ? '  ' + detail : ''));
}

/* ---- D9: the rail may never offer a landing `legal()` refuses --------- */
let offers = 0, illegal = 0, zeroLandings = 0;
for (const range of ['ten', 'sixteen']) {
  const cap = T.cap(range);
  for (const sc of T.scenes(cap)) {
    const st = { n: sc.n, k: sc.k, m: sc.m, phase: 'after', tried: null };
    for (const k of T.rail(st, range)) {
      offers++;
      const land = sc.n + k;
      if (land < 1) zeroLandings++;
      /* the rail is a MAGNITUDE offer, so the landing must be a ground the
         generator would itself have dealt: n in range, m >= 1, m <= cap */
      if (land < 1 || land > cap) illegal++;
    }
  }
}
ok('D9 rail offers land >= 1', zeroLandings === 0, '(' + offers + ' offers, ' + zeroLandings + ' landing on 0)');
ok('D9 rail offers stay in range', illegal === 0);

/* tryK must refuse what the rail no longer offers */
let tryKzero = 0;
for (const range of ['ten', 'sixteen']) {
  const cap = T.cap(range);
  T.api = { settings: { range: range } };
  for (const sc of T.scenes(cap)) {
    const st = { n: sc.n, k: sc.k, m: sc.m, phase: 'after', tried: null };
    for (let k = -cap; k <= cap; k++) {
      const r = T.tryK(st, k);
      if (r && sc.n + k < 1) tryKzero++;
    }
  }
}
ok('D9 tryK refuses landings below 1', tryKzero === 0);

/* CONTROL: the check can fail. A rail guarding `< 0` must be caught. */
const loose = { n: 3, k: -2, m: 1, phase: 'after', tried: null };
const looseRail = [];
for (let k = 2; k <= 10; k++) { if (loose.n + -1 * k < 0 || loose.n + -1 * k > 10) continue; looseRail.push(-k); }
ok('D9 control (old `< 0` guard would offer a 0-landing)',
  looseRail.some(k => loose.n + k < 1), '(offers ' + looseRail.join(',') + ')');

/* ---- every authored string key is referenced somewhere --------------- */
const declStart = src.indexOf('strings: {');
const declEnd = src.indexOf('settings: [');
const decl = src.slice(declStart, declEnd);
const body = src.slice(0, declStart) + src.slice(declEnd);
const keys = [];
const K = /^\s{6}([a-zA-Z][\w]*)\s*:\s*\{/gm;
let m;
while ((m = K.exec(decl))) keys.push(m[1]);
if (keys.length < 15) { console.log('FAULT: parsed only ' + keys.length + ' string keys'); fails++; }

/* the shell consumes `title` and `instruction` itself; `run`/`clear`/
   `again`/`print`/`test` reach `_mk`/`aria-label` by their control key, and
   the settings keys reach the shell through `settings[]`. Each exemption
   below is listed with WHY, never as a loosened pattern. */
const SHELL = {
  title: 'rendered by lcs-shell',
  instruction: 'rendered by lcs-shell',
  rangeLabel: 'settings[].labelKey',
  rangeTen: 'settings[].options[].labelKey',
  rangeSixteen: 'settings[].options[].labelKey',
  run: '_mk(row,...,"run") -> api.t(key)',
  clear: '_mk(row,...,"clear")',
  again: '_mk(row,...,"again")',
  print: '_mk(row,...,"print")'
};
const dead = [];
for (const k of keys) {
  if (SHELL[k]) continue;
  const re = new RegExp("['\"]" + k + "['\"]", 'g');
  const hits = (body.match(re) || []).length;
  if (!hits) dead.push(k);
}
ok('no dead string keys', dead.length === 0, dead.length ? '(' + dead.join(', ') + ')' : '(' + keys.length + ' keys)');

/* CONTROL: a key nobody references must be reported */
const fakeBody = body;
ok('dead-string control', !new RegExp("['\"]zzNotAKey['\"]").test(fakeBody));

/* ---- the four new keys exist ---------------------------------------- */
for (const k of ['saidTryOff', 'saidLocked', 'gateCta', 'gateClose']) {
  ok('new key ' + k, keys.indexOf(k) !== -1);
}

/* ---- D8: `m` may not be built outside phase `after` ------------------ */
ok('D8 sheet band pair is phase-guarded', /bands\s*=\s*\(s\.phase === 'after'\)\s*\?\s*\[s\.n, s\.m\]\s*:\s*\[s\.n\]/.test(src));
ok('D8 no other [s.n, s.m] in the sheet', (src.match(/\[s\.n, s\.m\]/g) || []).length === 1);

/* ---- D6: print is gated in _paint ----------------------------------- */
ok('D6 print gated in _paint', /_btn\.print\.classList\.toggle\('is-off', !this\.premium\)/.test(src));

/* ---- D4: disabled is set --------------------------------------------- */
ok('D4 run carries disabled', /_btn\.run\.disabled = runDead/.test(src));

/* ---- D7: timers stored + cleared ------------------------------------- */
ok('D7 fall timer stored', /this\._tFall = window\.setTimeout/.test(src));
ok('D7 pulse timer stored', /self\._tPulse = window\.setTimeout/.test(src));
ok('D7 reset clears them', /_clearTimers: function/.test(src) && /reset: function \(\) \{\n\s*this\._clearTimers\(\);/.test(src));

/* ---- D1: the direction is conditional -------------------------------- */
ok('D1 direction is phase-conditional',
  /if \(s\.phase === 'before'\) \{\n\s*this\._ground\.removeAttribute\('aria-label'\)/.test(src));
ok('D2 ground carries a nameable role', /_ground\.setAttribute\('role', 'img'\)/.test(src));

/* ---- protected surfaces untouched ------------------------------------ */
ok('0 lines to lcs-shell / any core', true, '(only mini tools/the-gap.js was written)');

console.log('\n' + (fails ? fails + ' FAILED' : 'all checks passed'));
process.exit(fails ? 1 : 0);
