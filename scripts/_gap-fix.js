/* Apply the ten measured defects to `mini tools/the-gap.js`.
   ⚠ A FILE, not `node -e` — backticks in a shell-quoted script are command
   substitution and this header is full of them.
   ⚠ node fs, not Python text mode — no CRLF rewriting of multi-line needles.
   Every edit asserts its needle fired exactly once. */
const fs = require('fs');
const P = 'mini tools/the-gap.js';
let src = fs.readFileSync(P, 'utf8');

const edits = [];
function edit(name, needle, repl) { edits.push({ name: name, needle: needle, repl: repl }); }
const L = a => a.join('\n');

/* ---------------------------------------------------------------- HEADER */

edit('H1 lexical claims re-measured', L([
'   And `curtain` is lost as a part-name in ALL ELEVEN locales (easel +',
'   rekenrek ship es "detrás de la cortina" / pt "atrás da cortina" / nl',
'   "Gordijn open"; Danish has lost BOTH `tæppet` and `gardin`).',
'   ⚠ The obvious replacements were measured and are also out: `dark` is',
'   live in da/no (`mørkt` ×9) — and ⚠ the Spanish dark-word contains',
'   `sombrero`, a hat, which is the `banan` trap exactly; `pulse` is worse',
'   still, because Spanish `pulsa` means PRESS (20 hits) and this tool has',
'   buttons. So the third part is a span of TIME and is named for that.'
]), L([
'   ⚠⚠ AND THREE NUMBERS I PUT IN THIS BLOCK MYSELF WERE REFUTED BY',
'   RE-MEASUREMENT — "verify the measurement before the defect" firing',
'   against its own author. Measured over `mini tools/*.js`, this file',
'   excluded, by `scripts/_gap-measure-lex.js`:',
'     ❌ "lost in ALL ELEVEN" — FALSE. It is taken in NINE: en `curtain` 43,',
'        da `gardin` 11 + `tæppe` 6, nl `gordijn` 7, es + pt `cortina` 3',
'        each, de `Vorhang` 3, fr `rideau` 3, fi `verho` 3, sv',
'        `rullgardin` 2 — but ⚠ `no gardin` = 0 and `it tenda` = 0. Nine of',
'        eleven is still decisive, so the naming ruling stands unchanged;',
'        the COUNT does not, and is corrected here rather than defended.',
'     ❌ "`mørkt` ×9 in da/no" — FALSE, and so is the 3-da-plus-3-no a',
'        later re-measure proposed. `mørk*` occurs ONCE in the whole corpus',
'        (`reading-easel.js:216`, a Norwegian sentence). `dark` is refused',
'        on the OTHER ground only, which was always the better one: nothing',
'        here is unlit — the gap is a span of TIME, not an absence of light.',
'     ❌ "the Spanish dark-word contains `sombrero`" — FALSE as stated.',
'        `oscuro` and `oscuridad` measure 0 `sombrero` between them. The',
'        real adjacency is `sombra` -> `sombrero`, and `sombra` is banned',
'        anyway as SHADOW (7 hits, `sock-and-shadow-activity`).',
'     ✅ `pulse` SURVIVES re-measurement and stays out: es `pulsa` means',
'        PRESS, 6 hits across five sibling tools, and this tool has buttons.',
'        (This header said 20; a later re-measure said 4; it is 6.)',
'   So the third part is a span of TIME and is named for that.'
]));

edit('H2 same-way claim corrected to what the CSS does', L([
'   2. ⭐⭐ REALITY DISAGREES WITHOUT ANYTHING BEING MARKED. The child taps',
'      a numeral to state a theory; the apparatus acts it out and lands',
'      where it lands. The landing count and the witnessed count are drawn',
'      THE SAME WAY on the SAME ground — the estimation-jar precedent,',
'      whose own `compare()` is never called in the render path. Nothing',
'      is green, nothing is red, nothing says wrong. The child sees the',
'      two numbers are not the same. The apparatus never says so.'
]), L([
'   2. ⭐⭐ REALITY DISAGREES WITHOUT ANYTHING BEING MARKED. The child taps',
'      a numeral to state a theory; the apparatus acts it out and lands',
'      where it lands. ⚠ THEY ARE NOT "DRAWN THE SAME WAY", AND THIS HEADER',
'      CLAIMED THEY WERE UNTIL A PANEL READ THE CSS: `.crt-num.is-try` adds',
'      a dashed border, a background, padding and a text stroke, and the',
'      rule comment far below concedes that it differs in KIND. That claim',
'      is load-bearing for the no-verdict rule, so it is restated as what',
'      the code does: the difference is of KIND AND NEVER OF HUE. Both',
'      numerals are `#0E5147`, the same size, on the same ground, so the',
'      outline says WHICH ONE IS YOURS and never which one is right; a',
'      coral/teal pair would have been a verdict delivered by the palette.',
'      That is the estimation-jar precedent, whose own `compare()` is never',
'      called in the render path. Nothing is green, nothing is red, nothing',
'      says wrong. The child sees the two numbers are not the same. The',
'      apparatus never says so.'
]));

edit('H3 defect record', L([
'   ---------------------------------------------------------------------',
'   THREE INVENTIONS',
'   ---------------------------------------------------------------------'
]), L([
'   ---------------------------------------------------------------------',
'   TEN DEFECTS THE NATIVE PANELS MEASURED, AND WHAT EACH ONE CHANGED',
'   ---------------------------------------------------------------------',
'   Ten panels read the MODEL, not the copy. Every gate in the suite was',
'   green while all ten of these were live, which is the recorded shape:',
'   the model gate reads arithmetic, the layout gate reads geometry, and',
'   NEITHER OF THEM READS A CONSEQUENCE.',
'',
'   ⭐⭐ THE PAID SHEET PRINTED THE ANSWER. `_buildSheet` had no phase',
'      guard and `beforeprint` checked only the TIER, so a subscriber',
'      pressing Ctrl+P during `before` or during the gap put `m` on the',
'      paper and on the projector before the class had watched anything.',
'      The band PAIR is now built only in phase `after`; every other phase',
'      prints the before-band and the ruled lines, and `m` is never built.',
'   ⭐⭐ THE DIRECTION LEAKED BEFORE THE PULSE, and 10 of 10 panels found',
'      it. `_paint` set `ariaCameIn`/`ariaWentOut` on the ground',
'      UNCONDITIONALLY, so a screen-reader user was told which way the',
'      change went AT MOUNT, in phase `before`, while the sighted class',
'      must wait for the pulse. It is set from the gap onward, cleared',
'      otherwise.',
'   ⚠ AND THOSE STRINGS MAY HAVE REACHED NOBODY: `_ground` was a bare',
'      `div` carrying an `aria-label` and NO ROLE, and ARIA forbids naming',
'      a `generic` element. Fixing the leak alone would have converted a',
'      SILENT leak into an AUDIBLE one, so the role lands in the same edit',
'      — `role="img"` while it carries evidence, `aria-hidden` when it',
'      carries none.',
'   ⭐ THE RAIL OFFERED LANDINGS `legal()` FORBIDS. `legal()` requires',
'      `m >= 1`; `rail()` and `tryK()` guarded `< 0`. Measured: 141 offers',
'      landed on 0 — a ground the scene generator would refuse to deal.',
'      Both guard `>= 1` now, so the rail cannot offer a landing the model',
'      would never have made.',
'   ⭐ A SETTINGS CHANGE MID-GAP STRANDED THE APPARATUS. `reset()`',
'      cancelled no timers and never cleared `_busy`: it ended in phase',
'      `gap` with 0 timers pending, the gap never lifted, and the next',
'      press of run SKIPPED THE PULSE ENTIRELY. The handles are stored and',
'      `_clearTimers()` is the one place they die.',
'   ⚠ PRINT WAS THE ONLY CONTROL NEVER GATED IN `_paint`, breaking the law',
'      stated verbatim in this same file at the top of the moves. A free',
'      user pressing it announced "Wait for the gap to lift" while shaking',
'      the RUN button. It is gated on entitlement, it keeps its own',
'      refusal, and the shake lands on the control that was pressed.',
'   ⚠ `saidMidRun` WAS FALSE IN PHASE `after` — the gap HAS lifted, so',
'      "wait for it to lift" is a lie — and `is-off` is opacity-only, so',
'      the click landed anyway. `disabled` now lands where there is nothing',
'      TRUE to say; while `_busy` the control stays live, because there the',
'      message IS true and disabling it would kill the key.',
'   ⚠ A REFUSED TRY ANNOUNCED NOTHING and shook the RUN button, because',
'      `try` matched neither `_refuse` branch. It has its own string now,',
'      and shakes the rail key the hand actually pressed.',
'   ⚠ THE LOCKED PANEL SHIPPED NO CTA — measured 0 here, where every',
'      comparable sibling ships `gateCta` (`landing-strip.js:605`,',
'      `number-drum.js:539`, `folding-wall.js:469`). It carries the pair.',
'   ⚠ AND THE COPY SAID THE GAP COVERS THE GROUND. The ground is',
'      deliberately the one thing left VISIBLE — the stage inverts so the',
'      pulse reads against it. What is covered is the MARKS. `saidDealt`',
'      likewise said "count the ground"; you count what is ON it.',
'',
'   ✅ REFUTED BY MEASUREMENT, RECORDED SO IT IS NOT RE-FILED: the review',
'      also reported `T_STEP` and `T_LOOK` as dead constants with 0 call',
'      sites each. THEY DO NOT EXIST — both were deleted in the pass the',
'      GEO block below documents, and `scripts/_gap-dead-consts.js`',
'      measures 14 of 14 constants reaching a call site, 0 dead, with a',
'      non-vacuity control. ⚠ The first run of that probe, written as a',
'      shell-quoted `node -e`, reported ALL FOURTEEN DEAD; it was an',
'      escaping artefact. A wrong measurement agreeing with a wrong',
'      expectation is how a correct file gets "fixed".',
'',
'   ---------------------------------------------------------------------',
'   THREE INVENTIONS',
'   ---------------------------------------------------------------------'
]));

/* --------------------------------------------------------------- STRINGS */

edit("S1 ariaGap covers the marks, not the ground",
"      ariaGap: { en: 'The gap is covering the ground. Nothing can be counted.' },",
[ "      /* ⚠ NOT \"covering the ground\": the ground is the one thing left",
  "         VISIBLE, because the stage inverts so the pulse reads against it.",
  "         What the gap covers is the MARKS. */",
  "      ariaGap: { en: 'The gap is covering the marks. Nothing can be counted. The ground is still there.' },"
].join('\n'));

edit("S2 refusal keys",
[ "      /* refusals */",
  "      saidMidRun: { en: 'Wait for the gap to lift.' },",
  "      saidNoTry: { en: 'There is nothing to clear yet.' },",
  "      saidDealt: { en: 'A new one. Count the ground before you start it.' },"
].join('\n'),
[ "      /* refusals. ⚠⚠ EVERY REFUSAL MUST BE TRUE IN THE PHASE IT FIRES IN,",
  "         and two of the four channels had no string at all: a refused try",
  "         announced NOTHING, and the paywall spoke `saidMidRun`. Ten locales",
  "         are authored separately; these ship `en` only. */",
  "      saidMidRun: { en: 'Wait for the gap to lift.' },",
  "      saidNoTry: { en: 'There is nothing to clear yet.' },",
  "      saidTryOff: { en: 'That try would take the ground past what it can hold.' },",
  "      saidLocked: { en: 'The sheet is part of a Teacher plan.' },",
  "      /* ⚠ you count what is ON the ground, not the ground. */",
  "      saidDealt: { en: 'A new one. Count what is on the ground before you start it.' },"
].join('\n'));

edit("S3 gate CTA pair",
[ "      lockedBody: { en: 'The whole apparatus is free — every gap, the ground, and as many tries as the class wants. A Teacher plan adds the printed sheet, which carries the before and the after the class just watched and ruled lines for the sentences they wrote.' }",
  "    },"
].join('\n'),
[ "      lockedBody: { en: 'The whole apparatus is free — every gap, the ground, and as many tries as the class wants. A Teacher plan adds the printed sheet, which carries the before and the after the class just watched and ruled lines for the sentences they wrote.' },",
  "      /* ⚠ measured 0 CTA here, where every comparable sibling ships one.",
  "         A panel that says what a plan buys and offers no way to reach it",
  "         is a dead end wearing a price tag. */",
  "      gateCta: { en: 'See the Teacher plan' },",
  "      gateClose: { en: 'Not now' }",
  "    },"
].join('\n'));

/* ----------------------------------------------------------------- MODEL */

edit("D9 tryK floor",
"      if (s.n + k < 0 || s.n + k > cap) return null;",
[ "      /* ⚠⚠ `>= 1`, NOT `>= 0` — `legal()` requires `m >= 1` because an",
  "         empty ground is a different question (take-all) and not this",
  "         tool. Guarding `< 0` here let the rail offer, and this move",
  "         accept, 141 landings on a ground the generator would refuse. */",
  "      if (s.n + k < 1 || s.n + k > cap) return null;"
].join('\n'));

edit("D9 rail floor",
"        if (s.n + sg * k < 0 || s.n + sg * k > cap) continue;",
"        if (s.n + sg * k < 1 || s.n + sg * k > cap) continue;   /* `legal()` floor, not 0 */");

/* ------------------------------------------------------------- LIFECYCLE */

edit("D7 reset cancels timers",
"    reset: function () { this.st = this.newState(this.api.settings.range); this.render(); },\n    onSettings: function () { this.reset(); },",
[ "    /* ⚠⚠ A SETTINGS CHANGE MID-GAP STRANDED THE APPARATUS. `reset()`",
  "       cancelled nothing, so a run in flight kept its two timers, and the",
  "       fresh state they landed on was advanced out from under the new",
  "       scene: reproduced ending in phase `gap`, 0 timers pending, the gap",
  "       never lifting, and the next press of run SKIPPING THE PULSE. */",
  "    reset: function () {",
  "      this._clearTimers();",
  "      this.st = this.newState(this.api.settings.range);",
  "      this.render();",
  "    },",
  "",
  "    /* the ONE place a run in flight dies. Anything that abandons a run",
  "       calls this — never `_busy = false` on its own. */",
  "    _clearTimers: function () {",
  "      if (this._tFall) { window.clearTimeout(this._tFall); this._tFall = null; }",
  "      if (this._tPulse) { window.clearTimeout(this._tPulse); this._tPulse = null; }",
  "      this._busy = false;",
  "      if (this._wave) this._wave.classList.remove('is-on');",
  "    },",
  "",
  "    onSettings: function () { this.reset(); },"
].join('\n'));

/* ---------------------------------------------------------------- THE ACTS */

edit("D4 run refusal truthful per phase + stored timers",
[ "      if (this._busy) { this._refuse('run'); return; }",
  "      n1 = this.advance(null);",
  "      if (!n1) { this._refuse('run'); return; }",
  "      this._busy = true;",
  "      this.st = n1;                       /* -> gap */",
  "      this._snd(GEO.SND_FALL);",
  "      this._paint();",
  "      window.setTimeout(function () {",
  "        /* the pulse travels while nothing is countable */",
  "        self._wave.classList.add('is-on');",
  "        self._snd(GEO.SND_STEP);",
  "        window.setTimeout(function () {",
  "          self._wave.classList.remove('is-on');",
  "          var n2 = self.advance(null);",
  "          if (n2) self.st = n2;           /* -> after */",
  "          self._busy = false;",
  "          self._snd(GEO.SND_LIFT);",
  "          self._paint();",
  "        }, self._dur(GEO.T_PULSE));",
  "      }, self._dur(GEO.T_FALL));"
].join('\n'),
[ "      /* ⚠ `busy`, not `run` — the message this reaches is \"Wait for the",
  "         gap to lift\", which is TRUE only here. */",
  "      if (this._busy) { this._refuse('busy', this._btn.run); return; }",
  "      n1 = this.advance(null);",
  "      /* ⚠⚠ IN PHASE `after` THERE IS NOTHING TRUE TO SAY — the gap HAS",
  "         lifted, so `saidMidRun` was a lie, and `is-off` is opacity only,",
  "         so the click landed and told it. `_paint` sets `disabled` on this",
  "         exact condition, which makes the branch below unreachable; it",
  "         stays as a silent guard rather than as a false announcement. */",
  "      if (!n1) return;",
  "      this._busy = true;",
  "      this.st = n1;                       /* -> gap */",
  "      this._snd(GEO.SND_FALL);",
  "      this._paint();",
  "      /* ⚠ the handles are STORED. `_clearTimers()` is the only exit. */",
  "      this._tFall = window.setTimeout(function () {",
  "        self._tFall = null;",
  "        /* the pulse travels while nothing is countable */",
  "        self._wave.classList.add('is-on');",
  "        self._snd(GEO.SND_STEP);",
  "        self._tPulse = window.setTimeout(function () {",
  "          self._tPulse = null;",
  "          self._wave.classList.remove('is-on');",
  "          var n2 = self.advance(null);",
  "          if (n2) self.st = n2;           /* -> after */",
  "          self._busy = false;",
  "          self._snd(GEO.SND_LIFT);",
  "          self._paint();",
  "        }, self._dur(GEO.T_PULSE));",
  "      }, self._dur(GEO.T_FALL));"
].join('\n'));

edit("D5 refused try carries its own control + string",
[ "    _try: function (k) {",
  "      var n = this.tryK(null, k);",
  "      if (!n) { this._refuse('try'); return; }"
].join('\n'),
[ "    /* ⚠ the rail key that was pressed travels with the call, so a refusal",
  "       shakes THAT key. It used to shake the RUN button and say nothing. */",
  "    _try: function (k, el) {",
  "      var n = this.tryK(null, k);",
  "      if (!n) { this._refuse('try', el); return; }"
].join('\n'));

edit("D4 again shakes its own button",
"      if (this._busy) { this._refuse('run'); return; }\n      this.st = this.newState(this.api.settings.range);",
"      if (this._busy) { this._refuse('busy', this._btn.again); return; }\n      this.st = this.newState(this.api.settings.range);");

edit("D3/D5/D6 refuse channel",
[ "    _refuse: function (why) {",
  "      var self = this, t = this._btn[why === 'clear' ? 'clear' : 'run'];",
  "      this._snd(GEO.SND_REFUSE, true);",
  "      if (t) {",
  "        t.classList.add('is-refuse');",
  "        window.setTimeout(function () { t.classList.remove('is-refuse'); }, self._dur(GEO.T_REFUSE));",
  "      }",
  "      if (why === 'run') this.api.announce(this.api.t('saidMidRun'));",
  "      if (why === 'clear') this.api.announce(this.api.t('saidNoTry'));",
  "    },"
].join('\n'),
[ "    /* ⚠⚠ ONE CHANNEL, THREE THINGS IT HAS TO GET RIGHT: the message must",
  "       be TRUE in the phase it fires in, the shake must land on the control",
  "       the hand pressed, and every authored refusal must be REACHABLE. The",
  "       old two-branch form failed all three at once — `try` matched neither",
  "       branch, so a refused try announced NOTHING and shook the RUN button,",
  "       and `print` was never refused at all. */",
  "    _refuse: function (why, el) {",
  "      var self = this;",
  "      var MSG = { busy: 'saidMidRun', clear: 'saidNoTry', print: 'saidLocked', 'try': 'saidTryOff' };",
  "      var msg = MSG[why];",
  "      var t = el || this._btn[why] || null;",
  "      this._snd(GEO.SND_REFUSE, true);",
  "      if (t) {",
  "        t.classList.add('is-refuse');",
  "        window.setTimeout(function () { t.classList.remove('is-refuse'); }, self._dur(GEO.T_REFUSE));",
  "      }",
  "      if (msg) this.api.announce(this.api.t(msg));",
  "    },"
].join('\n'));

/* ----------------------------------------------------------------- PAINT */

edit("D5 rail passes its own button",
"          b.addEventListener('click', function () { self._try(k); });",
"          b.addEventListener('click', function () { self._try(k, b); });");

edit("D4/D6 control gating",
[ "      this._btn.run.classList.toggle('is-off', !this.advance(null) || !!this._busy);",
  "      this._btn.clear.classList.toggle('is-off', !this.clearTry(null));",
  "      this._btn.again.classList.toggle('is-off', !!this._busy);"
].join('\n'),
[ "      var runDead = !this.advance(null);",
  "      this._btn.run.classList.toggle('is-off', runDead || !!this._busy);",
  "      /* ⚠⚠ `is-off` IS OPACITY ONLY, SO THE CLICK LANDED. `disabled` goes",
  "         exactly where there is nothing TRUE to say — phase `after`. While",
  "         `_busy` the control stays live on purpose: there the message IS",
  "         true, and disabling it would make `saidMidRun` a dead string. */",
  "      this._btn.run.disabled = runDead;",
  "      this._btn.clear.classList.toggle('is-off', !this.clearTry(null));",
  "      this._btn.again.classList.toggle('is-off', !!this._busy);",
  "      /* ⚠⚠ PRINT WAS THE ONLY CONTROL NEVER GATED HERE, which breaks the",
  "         law stated verbatim at the head of the moves block above. It is",
  "         drawn off for a free user but stays CLICKABLE, because the whole",
  "         point of the paywall refusal is that it gets to say why. */",
  "      this._btn.print.classList.toggle('is-off', !this.premium);"
].join('\n'));

edit("D1/D2 direction aria",
[ "      /* ⚠ the direction is announced too, or a screen-reader user gets",
  "         the gap and no evidence at all — the fourth channel the non-leak",
  "         gate measures, and the one most easily forgotten. */",
  "      this._ground.setAttribute('aria-label', t(this.sign(s) > 0 ? 'ariaCameIn' : 'ariaWentOut'));"
].join('\n'),
[ "      /* ⚠⚠ THE DIRECTION IS THE EVIDENCE, AND IT LEAKED. This was set",
  "         UNCONDITIONALLY, so a screen-reader user was told which way the",
  "         change went AT MOUNT, in phase `before` — before the pulse the",
  "         sighted class has to wait for. 10 of 10 panels found it.",
  "         ⚠ AND `_ground` is a bare div: ARIA forbids naming a `generic`",
  "         element, so the string may have reached nobody at all. The role",
  "         lands in the SAME edit, or the fix converts a silent leak into an",
  "         audible one. */",
  "      if (s.phase === 'before') {",
  "        this._ground.removeAttribute('aria-label');",
  "        this._ground.removeAttribute('role');",
  "        this._ground.setAttribute('aria-hidden', 'true');",
  "      } else {",
  "        this._ground.removeAttribute('aria-hidden');",
  "        this._ground.setAttribute('role', 'img');",
  "        this._ground.setAttribute('aria-label', t(this.sign(s) > 0 ? 'ariaCameIn' : 'ariaWentOut'));",
  "      }"
].join('\n'));

/* -------------------------------------------------------- GATE AND SHEET */

edit("D10 gate CTA pair rendered",
[ "      var b = document.createElement('p');",
  "      b.className = 'crt-gate-b';",
  "      b.textContent = t('lockedBody');",
  "      this._gateHost.appendChild(h);",
  "      this._gateHost.appendChild(b);",
  "    },"
].join('\n'),
[ "      var b = document.createElement('p');",
  "      b.className = 'crt-gate-b';",
  "      b.textContent = t('lockedBody');",
  "      /* ⚠ MEASURED 0 CTA HERE. A panel that names what a plan buys and",
  "         offers no way to reach it is a dead end wearing a price tag. */",
  "      var a = document.createElement('a');",
  "      a.className = 'crt-gate-cta';",
  "      a.href = '/pricing';",
  "      a.textContent = t('gateCta');",
  "      var c = document.createElement('button');",
  "      c.type = 'button';",
  "      c.className = 'crt-gate-x';",
  "      c.textContent = t('gateClose');",
  "      c.addEventListener('click', function () { self._gateHost.classList.remove('is-on'); });",
  "      this._gateHost.appendChild(h);",
  "      this._gateHost.appendChild(b);",
  "      this._gateHost.appendChild(a);",
  "      this._gateHost.appendChild(c);",
  "    },"
].join('\n'));

edit("D10 gate needs self",
"    _gate: function () {\n      if (!this._gateHost) return;\n      var t = this.api.t.bind(this.api);",
"    _gate: function () {\n      if (!this._gateHost) return;\n      var t = this.api.t.bind(this.api), self = this;");

edit("D8 sheet phase guard",
[ "      var frame = document.createElement('div');",
  "      frame.className = 'crt-sh-frame';",
  "      [s.n, s.m].forEach(function (cnt) {"
].join('\n'),
[ "      var frame = document.createElement('div');",
  "      frame.className = 'crt-sh-frame';",
  "      /* ⚠⚠ THE PAID SHEET PRINTED THE ANSWER. There was no phase guard",
  "         here and `beforeprint` checks only the TIER, so a subscriber",
  "         pressing Print or Ctrl+P during `before` or during the gap put",
  "         `m` on the paper and on the projector before the class had",
  "         watched anything. `m` is BUILT ONLY IN PHASE `after` — the other",
  "         phases get the before-band and the ruled lines, which is exactly",
  "         what a teacher setting up wants and carries no answer. */",
  "      var bands = (s.phase === 'after') ? [s.n, s.m] : [s.n];",
  "      bands.forEach(function (cnt) {"
].join('\n'));

/* ------------------------------------------------------------------- CSS */

edit("CSS refuse on a rail key + disabled control",
"        '.crt-btn.is-refuse{transform:translateX(-3px)}',",
[ "        '.crt-btn.is-refuse{transform:translateX(-3px)}',",
  "        /* ⚠ a refused TRY shakes the rail key that was pressed, so the",
  "           shake needs a rule on `.crt-k` too — it had none. */",
  "        '.crt-k.is-refuse{transform:translateX(-3px)}',",
  "        '.crt-btn:disabled{opacity:.45;cursor:default}',"
].join('\n'));

edit("CSS gate CTA pair",
"        '.crt-gate-b{margin:0;font-family:Nunito,system-ui,sans-serif;font-size:14px;color:#7A6A55;line-height:1.45}',",
[ "        '.crt-gate-b{margin:0 0 10px;font-family:Nunito,system-ui,sans-serif;font-size:14px;color:#7A6A55;line-height:1.45}',",
  "        '.crt-gate-cta{display:inline-flex;align-items:center;min-height:44px;padding:0 16px;border-radius:11px;background:#146B5E;color:#FBF3E4;font-family:Nunito,system-ui,sans-serif;font-size:15px;text-decoration:none}',",
  "        '.crt-gate-x{min-height:44px;margin-left:8px;padding:0 12px;border:0;background:none;color:#7A6A55;font-family:Nunito,system-ui,sans-serif;font-size:14px;cursor:pointer;text-decoration:underline}',",
  "        '.crt-gate-cta:focus-visible,.crt-gate-x:focus-visible{outline:3px solid #0D4E44;outline-offset:2px}',"
].join('\n'));

/* ----------------------------------------------------------------- APPLY */

let fail = 0;
for (const e of edits) {
  const n = src.split(e.needle).length - 1;
  if (n !== 1) { console.error('FAULT ' + e.name + ': needle matched ' + n + ' times'); fail++; continue; }
  src = src.replace(e.needle, e.repl);
  console.log('ok   ' + e.name);
}
if (fail) { console.error('\n' + fail + ' needle(s) failed — NOTHING WRITTEN'); process.exit(1); }

fs.writeFileSync(P, src, 'utf8');
console.log('\nwrote ' + P + ' (' + edits.length + ' edits)');
