/* =====================================================================
   audit-tool-print-sheets.js — a Print chip must produce a SHEET
   ---------------------------------------------------------------------
   Run:  node scripts/audit-tool-print-sheets.js [--tool=<key>]

   ⭐ WHY THIS EXISTS. #40 unit-handle and #41 unroll-tape each shipped a
   chip labelled "Print the bench" / "Print the runway" that called
   `window.print()` with NO @media print block at all — so they printed
   the whole web page: nav, hints, buttons, footer, the tool at screen
   size. That is §23.6's "a control must do WHAT ITS LABEL SAYS",
   shipped twice.

   ⚠ AND THE GENERIC LIVENESS GATE CANNOT SEE IT. `window.print` fires,
   the DOM changes, the control "acts" — it scores green while printing
   the wrong thing. A defect class needs its own gate when the shared one
   is structurally blind to it.

   This renders each tool in PRINT MEDIA and asserts what reaches paper:
   the chrome is gone, the apparatus is there, and nothing interactive
   survives (a sheet has no grips).

   ⭐ SURFACE 2 (2026-08-03) — THE THIRD MEMBER OF THE SAME FAMILY, and
   the one this gate's original shape was structurally blind to. #40 and
   #41 REACHED window.print() and printed the wrong thing. The hosted
   worksheet at /play/w/<linkId> reached window.print() and printed
   NOTHING: the route served it under `Content-Security-Policy: sandbox
   allow-scripts allow-popups`, and the HTML spec's sandboxed-modals flag
   makes window.print() a silent no-op unless `allow-modals` is present.
   The button's listener fired; the browser discarded the call.

   ⚠ AND THIS GATE COULD NOT HAVE SEEN IT — line ~88 STUBS window.print
   out ("headless print would hang"), so it never exercises the call at
   all, and it never renders a sandboxed document. A gate that stubs the
   thing under test is measuring its own stub.

   The surface-2 section below is SELF-POISONING: it loads the same
   document twice, once under each header, and requires OPPOSITE
   outcomes. If the poison side ever stops producing the block, the run
   FAILS rather than greens.
   ===================================================================== */

'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
/* ⚠ REQUIRED LAZILY. --contract-only runs inside deploy.sh on Hetzner,
   where puppeteer's node_modules exists but NO Chromium does (measured
   2026-08-03: no system binary, no ~/.cache/puppeteer, no bundled
   download). A top-level require is survivable there, but launching is
   not — see CONTRACT_ONLY below. */

const ROOT = path.join(__dirname, '..', 'mini tools');
const PORT = 5540;

/* every tool that offers a Print chip must appear here */
const TOOLS = [
  /* ⭐ THE EXCHANGE MACHINE'S SHEET IS PREMIUM AND IS BUILT ON DEMAND —
     _buildSheet() only fills .exm-sheetprint after the entitlement check
     passes, so for a free visitor the node exists and is EMPTY. That is
     the honest gate: the chip being dimmed is not gating the feature,
     and Ctrl+P must not reach a paid worksheet. The probe forces
     premium, clicks the chip, and then asserts the sheet has real
     children AND that the apparatus is hidden under print. */
  { key: 'exchange-machine', p: 'exm', apparatus: '.exm-sheetprint', chrome: '.exm-foot' },
  /* ⭐ THE BAKING TRAY'S SHEET IS PREMIUM AND BUILT ON DEMAND, the same
     shape as the exchange machine: `_buildSheet()` runs only after the
     entitlement check passes, so for a free visitor there is no
     `.btr-printsheet` node at all. Gating the CHIP is not gating the
     FEATURE — Ctrl+P reached the paid worksheet on #16 and on the
     shipped build of letter-studio — so the probe forces premium, clicks
     the chip, and then asserts the sheet has real children AND that the
     apparatus is hidden under print. */
  { key: 'baking-tray', p: 'btr', apparatus: '.btr-printsheet', chrome: '.btr-foot',
    /* ⚠ THE SHARED PREMIUM-FORCING CANNOT FIND THIS TOOL, and the reason
       is a design decision rather than an omission. The generic finder
       requires `v.STORE_KEY` — and this tool has NO STORAGE AT ALL, on
       purpose: it must never remember anything across reloads, because
       the teacher opening it cold in front of 25 children has to get the
       same first screen every time. Without a prime, `inst` came back
       undefined, premium was never set, the chip opened the sales card
       instead of printing, and the probe reported the sheet "missing" —
       a gate measuring a free visitor and calling it a defect. */
    prime: function () {
      var T = window.BakingTray;
      if (!T) return;
      T.premium = true;
      if (T._paint) T._paint();
    } },
  /* TOOL #47. Same shape and the same reason for the prime: this tool
     also has NO STORAGE AT ALL, deliberately, so the shared premium
     finder cannot see it. Its sheet is a SIBLING of the wrap — the
     print block sets `.tsh-wrap{display:none}` and a hidden parent
     kills the whole subtree, so a sheet built inside it would measure
     0px tall on paper with every assertion green. */
  { key: 'folding-wall', p: 'tsh', apparatus: '.tsh-sheet', chrome: '.tsh-ledge',
    /* ⚠ AND THE SHEET IS BUILT ON DEMAND, so the prime has to call it —
       otherwise this measures an empty container and reports the
       apparatus missing. It is also what adds `tsh-printing`, the class
       the whole @media print block is scoped to: unscoped, the rules
       fired for everybody and a browser-initiated Ctrl+P printed a
       BLANK PAGE. Put the shelf into its residue state first, so the
       sheet the gate measures is the one a class would actually print. */
    prime: function () {
      var T = window.FoldingWall;
      if (!T) return;
      T.premium = true;
      var k, F = [1, 2, 5, 10];
      for (k = 0; k < F.length; k++) T.st = T.putAway(T.st, F[k]) || T.st;
      T.st = T.stack(T.st) || T.st;
      if (T._paint) T._paint();
      if (T._buildSheet) T._buildSheet();
    } },
  /* ⭐ LETTER STUDIO WAS "HAS A BLOCK, NO PROBE" — which is exactly why the
     window.print()-with-no-sheet defect caught twice elsewhere was still
     live in it. Its sheet is PREMIUM-ONLY and built as real DOM, so the
     probe's premium-forcing path is load-bearing: for a free visitor there
     is no `.ls-psheet` node and no print stylesheet at all, which is the
     gate (the chip being hidden is not). */
  { key: 'letter-studio', p: 'ls', apparatus: '.ls-psheet', chrome: '.ls-dock',
    /* ⚠ THE SHARED PREMIUM-FORCING IS NOT ENOUGH HERE, and that is by
       design rather than an obstacle. It sets `inst.premium = true` and
       clicks the chip, but this tool BUILDS the print sheet and INJECTS
       the print stylesheet only inside `render()`, because gating the
       chip is not gating the feature — Ctrl+P reached the paid worksheet
       in the shipped build and in #16 before it. So premium has to be set
       AND the tool re-rendered, or the probe measures a free visitor and
       correctly finds nothing. */
    prime: function () {
      var T = window.LetterStudio;
      if (!T) return;
      T.premium = true; T.premiumKnown = true;
      T.render();
    } },
  /* ⭐ THE SHEET CARRIES THE CLAIM, WHICH IS THE WHOLE POINT OF PRINTING IT.
     Build #3 hid `.drb-guess` and kept `.drb-opened`, so the page a class took
     home carried the ANSWER and not the prediction they made — backwards: the
     claim is the only part of that sheet that was theirs. The apparatus
     selector is therefore the CLAIM, not the record, because the record
     surviving was never the thing at risk. */
  /* ⭐ THE APPARATUS SELECTOR IS THE ICON, NOT THE CARD, and that is the
     whole reason this probe exists. The v2 Say It Board printed two
     columns of TEXT and zero pictures — measured: not one call to the
     icon builder in the entire sheet function. The child that object is
     for cannot read either column, so on paper the tool became the
     bilingual word list its own header says it refused to be.
     ⚠ AND THE PROBE RUNS UNPRIMED, i.e. as a FREE visitor, because the
     other half of the defect was that a free teacher pressing Ctrl+P
     got a BLANK PAGE: the sheet was built only when entitled while the
     chrome-hiding print rules were unscoped. The lanyard cards are free
     now — the board is free because it is a care surface, and the
     printed card is simply that board on paper for the corridor. */
  {
    key: 'home-language-bridge', p: 'hlb', apparatus: '.hlb-p-icon', chrome: '.hlb-foot'
  },
  {
    key: 'draw-bag', p: 'drb', apparatus: '.drb-guess', chrome: '.drb-foot',
    prime: function () {
      var T = window.DrawBag;
      T.premium = true; T.premiumKnown = true;
      T.st = T.placeGuess(T.st, 'c', T.ZONE_IN);
      T.st = T.placeGuess(T.st, 's', T.ZONE_OUT);
      var g = 0;
      while (T.canDraw(T.st) && g++ < 200) T.st = T.draw(T.st);
      T.st = T.secondRun(T.st) || T.st;
      g = 0;
      while (T.canDraw(T.st) && g++ < 200) T.st = T.draw(T.st);
      T.st = T.openBag(T.st) || T.st;
      T.render();
    }
  },
  /* ⚠ wodb is DOUBLE-LOCKED like lids: the sheet subtree is absent unless
     entitled AND every print rule is scoped `body.wdb-paid`, because
     Ctrl+P is guarded by no chip. A probe that does not force the tier
     measures an un-entitled page and reports the chrome as still showing.
     ⚠ Its sheet is also built on DEMAND (`_ensureSheet`), not at mount —
     so the prime must call it, or this measures an empty container and
     passes VACUOUSLY, which is what happened to comparison-planks in this
     gate's own first version. */
  {
    key: 'wodb', p: 'wdb', apparatus: '.wdb-sheet', chrome: '.wdb-dock',
    prime: function () {
      var T = window.Wodb;
      if (!T) return;
      T.premium = true;
      document.body.classList.add('wdb-paid');
      if (T.render) T.render();
      if (T._ensureSheet) T._ensureSheet();
    }
  },
  /* ⚠ measurement-bench is DOUBLE-LOCKED like lids and wodb: the sheet subtree
     is absent unless entitled AND every print rule is scoped `body.mb-paid`,
     because Ctrl+P is guarded by no chip. A probe that does not force the tier
     measures an un-entitled page and reports the chrome as still showing.
     ⚠ Its sheet is also built ON DEMAND (`_ensureSheet`), not at mount, so the
     prime must call it — otherwise this measures an empty container and passes
     vacuously, which is what happened to comparison-planks in this gate's own
     first version. */
  {
    key: 'measurement-bench', p: 'mb', apparatus: '.mb-sheet', chrome: '.mb-dock',
    prime: function () {
      var T = window.MeasurementBench;
      if (!T) return;
      T.premium = true;
      document.body.classList.add('mb-paid');
      if (T.render) T.render();
      if (T._ensureSheet) T._ensureSheet();
    }
  },
  { key: 'unit-handle', p: 'unh', apparatus: '.unh-bench' },
  { key: 'unroll-tape', p: 'urt', apparatus: '.urt-bench' },
  /* Heart Words. ⚠ The apparatus here is `.hw-printcard` — the sheet is
     built for EVERY visitor (filtered by the shelf gate), because a free
     teacher's Ctrl+P used to produce a genuinely BLANK PAGE. The paid
     sheets are gated by ABSENCE from the DOM, not by the chooser, since
     Ctrl+P bypasses every button on the page. */
  { key: 'heart-words', p: 'hw', apparatus: '.hw-printcard', chrome: '.hw-tools' },
  { key: 'comparison-planks', p: 'cmp', apparatus: '.cmp-sheet' },
  { key: 'cold-line', p: 'cld', apparatus: '.cld-sheet' },
  /* CALENDAR WALL. The sheet is the MONTH with the class's own record on
     it — every date, the school-day ordinal on each counted day, the
     marks, and a legend carrying the teacher's own words, which are the
     only language on the page and the reason the sheet is hers.
     ⚠ DOUBLE-LOCKED, so the prime MUST force the tier: the subtree is
     absent from the DOM when unpaid AND every print rule is scoped
     body.cwl-paid. Ctrl+P is guarded by no button, so gating the chip
     would not have been gating the feature — and a free visitor's Ctrl+P
     has to yield a NORMAL page, not a blank one, which is why the
     chrome-hiding rules are scoped too.
     ⚠ And the sheet is built ON DEMAND, so the prime has to call the
     builder. Pointing this probe at a lazily-built sheet without doing
     that is how comparison-planks passed VACUOUSLY in this gate's own
     first version.
     ⚠ chrome is '.cwl-dock' because this tool has no '.cwl-foot'; the
     '.cwl-chip' the generic check looks for is the print chip itself. */
  {
    key: 'calendar-wall', p: 'cwl', apparatus: '.cwl-p-grid', chrome: '.cwl-dock',
    prime: function () {
      var T = window.CalendarWall;
      T.premium = true; T.premiumKnown = true;
      var w = T.wall();
      T.M.setCountOn(w, T._todayKey, 62);
      T.M.addEvent(w, T.M.shiftKey(T._todayKey, 3), 'trip', 'Zoo', 2, 'once');
      T.M.addEvent(w, T.M.shiftKey(T._todayKey, 1), 'off', '', 1, 'once');
      T._paint();
      T._buildPrintSheet();
    }
  },
  { key: 'number-line', p: 'nl', apparatus: '.nl-sheet' },
  {
    /* the CHILD sheet, which is free — a blank field and the empty
       numbered boxes a child copies each card face into. No prime: if
       this needs premium to exist, that is the defect. */
    key: 'number-sieve', p: 'nsv', apparatus: '.nsv-page', chrome: '.nsv-foot'
  },
  /* the three found printing the whole web page, now with sheets */
  /* ⚠ arrow-strip NOW PRINTS A PURPOSE-BUILT PLANNING SHEET, and it is
     DOUBLE-LOCKED. The apparatus on paper is `.arw-pmat` — the line-art
     mat inside `.arw-sheet` — NOT `.arw-mat`, which is the LIVE apparatus
     and is now correctly `display:none` on paper. Pointing the probe at
     the live mat measured a hidden element and reported "the apparatus
     does not reach the page" about a sheet that prints perfectly.
     And the subtree is ABSENT until entitled (`_ensureSheet` returns early
     when `!premium`), so the prime has to force the tier before the sheet
     exists at all — the same shape as sorting-hoops and lids.
     What prints: the mat with the START pose and never the trail, the two
     blank rails ("first run" / "second run — change one card"), the four
     card faces to cut out, and the movement rule in words. */
  {
    key: 'arrow-strip', p: 'arw', apparatus: '.arw-pmat',
    prime: function () {
      var T = window.ArrowStrip;
      if (!T) return;
      T.premium = true;
      T.premiumKnown = true;
      T._sync();
    }
  },
  /* ⚠ lids PRINTS A DEDICATED TWO-PAGE SHEET NOW, and it is DOUBLE-LOCKED.
     The shipped build gated only the chip while the @media print block was
     unconditional, so Ctrl+P — which no chip guards — handed a free
     visitor the Teacher-plan sheet. The subtree is now ABSENT unless
     entitled AND every print rule is scoped `body.lid-paid`, which means a
     probe that does not force the tier measures an un-entitled page and
     reports the chrome as still showing. The gate caught exactly that
     when the scoping landed, which is the gate working. */
  /* ⚠ sorting-hoops gates the sheet by DOM PRESENCE, not by print CSS. The
     shipped tool gated the CHIP and left `@media print` unconditional, so a
     measured anonymous visitor with emulateMediaType('print') got the paid
     sheet — Ctrl+P walked straight past the paywall. `_ensureSheet` now
     returns early when `!premium`, so an un-entitled probe finds nothing at
     all and this `prime` has to force the tier before the sheet exists.
     The sheet also DRAWS THE TWO HOOPS: what it printed before was four
     headings over four empty rows. */
  {
    key: 'sorting-hoops', p: 'hp', apparatus: '.hp-printsvg', chrome: '.hp-foot',
    prime: function () {
      var T = window.SortingHoops;
      if (!T) return;
      T.premium = true;
      T.premiumKnown = true;
      T.mode = 'guess';
      T.ruleA = { f: 'colour', v: 'red' };
      T.ruleB = { f: 'shape', v: 'circle' };
      T.revealed = true;
      T.phase = 'sort';
      /* something on the mat, so the rows are not empty */
      var tray = T.trayItems();
      if (tray[0]) T.placement[tray[0].uid] = 'a';
      if (tray[1]) T.placement[tray[1].uid] = 'both';
      if (tray[2]) T.placement[tray[2].uid] = 'out';
      T.render();
    }
  },
  {
    key: 'lids', p: 'lid', apparatus: '.lid-sheet', chrome: '.lid-foot',
    prime: function () {
      var T = window.Lids;
      if (!T) return;
      T.premium = true;
      T.premiumKnown = true;
      document.body.classList.add('lid-paid');
      /* a sheet with something on it: a table, a pair of lids, a lift */
      var s = T.addLid(T.st, 320, 300);
      if (s) T.st = s;
      T.render();
    }
  },
  /* ⚠ part-whole-frame prints TWO DEDICATED PAGES — a blank mat for real
     counters and the record of what the class found — and BOTH are
     entitlement-gated in the DOM, not merely behind the chip: a free
     visitor's `_buildPrintMat` is never called at all. So the prime must
     force the tier AND rebuild, or the probe measures an absent sheet and
     every assertion under it is vacuous (the fraction-kitchen lesson).
     The record page also needs a class to have FOUND something, so the
     prime carries twice first — an empty record page is a legitimate
     state but not the one worth probing. */
  {
    key: 'part-whole-frame', p: 'pwf', apparatus: '.pwf-printmat', chrome: '.pwf-controls',
    prime: function (p) {
      var T = window.PartWholeFrame;
      if (!T) return;
      T.premium = true;
      /* ⚠ AND THE PAID BODY CLASS, which is what the print rules are
         scoped to. Setting `premium` by hand bypasses both `init` and the
         entitlement callback, which are the two places the real tool
         toggles it — so a prime that skips it measures an unentitled page
         and reports the mat as missing. (The gate caught exactly that when
         the scoping landed, which is the gate working.) */
      document.body.classList.add('pwf-paid');
      T._applyBandOptions();
      T._setWhole(6);
      T._carry('toB');
      T._carry('toB');
      T.render();
    }
  },
  /* prints a DEDICATED sheet (the build-plan pattern), so the
     apparatus that reaches paper is .pvl-sheet, not the on-screen mat */
  { key: 'place-value-lab', p: 'pvl', apparatus: '.pvl-sheet', chrome: '.pvl-dock' },
  /* fraction-kitchen prints a DEDICATED four-page sheet. ⚠ Its sheet is
     ENTITLEMENT-GATED in the DOM, not merely in the chip — a free visitor
     pressing Ctrl+P used to get all four paid pages — so the prime must
     force `premium` AND rebuild, or the probe measures an absent sheet and
     the whole check is vacuous. */
  {
    key: 'fraction-kitchen', p: 'frk', apparatus: '.frk-sheet', chrome: '.frk-dock',
    prime: function (p) {
      var T = window.FractionKitchen;
      if (T) { T.premium = true; T.render(); T._ensureSheet(); }
    }
  },
  /* estimation-jar's sheet is the RECORD of a completed ritual, so the
     prime has to run one: without a reveal, page 1 prints an em-dash
     where the count goes and an empty plot — which is a legitimate state
     (next week's blank) but not the one worth probing. Drive it to a
     finished reveal first, then force the tier and rebuild. */
  {
    key: 'estimation-jar', p: 'ej', apparatus: '.ej-sheet', chrome: '.ej-foot',
    prime: function (p) {
      var T = window.EstimationJar;
      if (!T) return;
      T.premium = true;
      T.stage = 'reveal';
      T._revealShown = T.count;
      var q = T.questionId();
      T.guesses = [8, 11, 12, 12, 15, 19, 24].map(function (v) { return { v: v, q: q }; });
      T._qid = q;
      T.render();
      T._ensureSheet();
    }
  },
  /* ⚠ draw-bag is DELIBERATELY NOT PROBED HERE, and saying so is the point.
     Its sheet is the RECORD, and a record does not exist until a class has
     filled the bag, committed a prediction on the shelves and opened it —
     `.drb-recs` is not even in the DOM at rest. I wrote a prime that clicked
     the plausible chips; it produced nothing, because "Open the bag" stays
     disabled until the bag has contents. Rather than certify a sheet I have
     not driven, draw-bag sits with the other seventeen tools that ship a
     print block the browser half has never exercised — the derived roster
     above REPORTS that list every run, so the gap is named, not hidden.
     Its `@media print` block IS verified by the static half (chip => block).
     A prime that reconstructs a full session is the work this deserves; it
     is not the work of a wide-viewport commit. */
  /* learning-clock prints a DEDICATED four-page sheet: draw-the-hands,
     write-the-time, the class's own saved times, and a page of cards to cut
     out. ⚠ Its sheet is DOUBLE-LOCKED — the subtree is never built for a
     free visitor and every print rule is scoped `body.lck-paid` — so the
     prime must force the tier AND rebuild, or the probe measures an absent
     sheet and every assertion under it is vacuous.
     ⚠ chrome is `.lck-dock`: there is no `.lck-foot` on this tool, and the
     default selector would return null and fail a correct build. */
  {
    /* ⚠ PATTERN BENCH SHIPPED FOR MONTHS WITH A PRINT CHIP AND NO PROBE.
       It called window.print() and emitted an @media print block, so the
       DERIVED roster check passed it — and it sat in the "has a block but
       no probe" bucket, which is exactly where a sheet nobody has ever
       driven hides. What it actually printed was the LIVE DOM, including
       a horizontally-scrolling rail: a scrolled strip printed CUT OFF,
       silently. The prime must force the tier AND build the sheet, or
       this probe measures an empty container and passes vacuously. */
    key: 'pattern-bench', p: 'ptn', apparatus: '.ptn-printsheet', chrome: '.ptn-foot',
    prime: function () {
      var T = window.PatternBench;
      if (!T) return;
      T.premium = true;
      T.premiumKnown = true;
      document.body.classList.add('ptn-paid');
      /* a sheet with a real pattern and an interior gap on it, not blanks */
      T.st = T.setUnitLength(T.st, 3);
      T.st = T.toggleCover(T.st, 5);
      T.render();
      T._ensureSheet(T.api.stage);
    }
  },
  {
    key: 'learning-clock', p: 'lck', apparatus: '.lck-sheet', chrome: '.lck-dock',
    prime: function (p) {
      var T = window.LearningClock;
      if (!T) return;
      T.premium = true;
      T.premiumKnown = true;
      /* a sheet with the class's own times on page 3, not just blanks */
      T._store.ourTimes = [
        { id: 'a', label: 'Lunch', h: 12, m: 0, pm: false },
        { id: 'b', label: 'Story time', h: 2, m: 15, pm: true }
      ];
      T.render();
      T._ensureSheet(T.api.stage);
    }
  },
];

const only = (process.argv.find((a) => a.indexOf('--tool=') === 0) || '').split('=')[1];

/* ⭐ --contract-only: the STATIC half, no browser. This is what deploy.sh
   runs, because Hetzner has no Chromium — a browser gate wired into the
   deploy would abort every deploy rather than guard anything. What can
   actually REGRESS is the CSP token list in route.ts, and that is a
   filesystem fact. The browser probes below prove the MECHANISM (that
   the token is what makes print work at all); they are a dev/operator
   run, not a per-deploy one. */
const CONTRACT_ONLY = process.argv.includes('--contract-only');

/* =====================================================================
   ⭐⭐ THE ROSTER IS NOW DERIVED, AND IT WAS WRONG.
   The comment above says "every tool that offers a Print chip must appear
   here" and five did. TWENTY-FIVE tools call `window.print()`. Worse, the
   filter accepted `--tool=arrow-strip`, matched nothing, and printed
   "PASS — 0 checks: every Print chip produces a sheet" — a gate reporting
   success for a tool it had not looked at, which is the exact shape this
   file's own header warns about for #40 and #41.

   Scanning the source instead of trusting the list found THREE tools that
   call window.print() with NO `@media print` BLOCK AT ALL — they print the
   whole web page, nav and buttons and footer, at screen size. That is the
   #40/#41 defect, still live, in three more places:
       arrow-strip · draw-bag · lids
   All three are in the wide-viewport batch and each gets its sheet with
   its own tool; they are baselined here so the gate fails on a NEW one,
   and THE LIST MAY ONLY SHRINK.

   A further twenty tools DO have a print block but no browser probe entry
   in TOOLS, so their sheets have never been driven. That is recorded, not
   silently passed.
   ===================================================================== */
/* ⭐ EMPTIED 2026-08-03 — all three now ship a sheet and a browser probe.
   The ratchet may only shrink; it is kept so the class stays named. */
const NO_SHEET_YET = new Set([]);

function printChipTools() {
  return fs.readdirSync(ROOT).filter((f) => /\.js$/.test(f)).map((f) => f.slice(0, -3))
    .filter((k) => /window\.print\s*\(/.test(fs.readFileSync(path.join(ROOT, k + '.js'), 'utf8')));
}
function hasPrintBlock(k) {
  /* ⚠⚠ MATCH THE EMISSION, NOT THE PROSE. The first version tested
     /@media print/ against the whole file — and every one of these tools now
     carries a COMMENT explaining why it has a print block, so the gate was
     reading its own documentation as evidence. Proved by poison: I deleted
     lids' entire print block and the roster still reported "0 have NO print
     block" and PASSED. The CSS is emitted as a quoted string in a
     concatenation, so requiring the quote AND the opening brace is what
     distinguishes a rule from a sentence about a rule. */
  const src = fs.readFileSync(path.join(ROOT, k + '.js'), 'utf8');
  return /['"`]@media print\s*\{/.test(src);
}

(function auditRoster() {
  const all = printChipTools();
  const naked = all.filter((k) => !hasPrintBlock(k));
  const fresh = naked.filter((k) => !NO_SHEET_YET.has(k));
  const stale = [...NO_SHEET_YET].filter((k) => !naked.includes(k));
  const unprobed = all.filter((k) => hasPrintBlock(k) && !TOOLS.some((t) => t.key === k));

  console.log('  roster: ' + all.length + ' tools call window.print(); ' +
    TOOLS.length + ' have a browser probe; ' + naked.length + ' have NO print block; ' +
    unprobed.length + ' have a block but no probe');
  if (unprobed.length) console.log('    no probe yet: ' + unprobed.join(', '));

  if (fresh.length) {
    console.error('  FAIL a NEW tool calls window.print() with no @media print block: ' + fresh.join(', '));
    console.error('       it would print the whole web page — nav, buttons, footer, at screen size');
    process.exit(1);
  }
  if (stale.length) {
    console.error('  FAIL these are baselined as sheet-less but now HAVE a print block: ' + stale.join(', '));
    console.error('       delete them from NO_SHEET_YET — the ratchet may only shrink');
    process.exit(1);
  }
})();

/* ⚠ AND AN UNMATCHED --tool= IS AN ERROR, NOT A PASS. */
if (only && !TOOLS.some((t) => t.key === only)) {
  console.error('  FAIL --tool=' + only + ' has no browser probe in TOOLS, so this run would ' +
    'measure nothing and report success. ' +
    (NO_SHEET_YET.has(only) ? 'It is baselined as having no print sheet at all.'
      : 'Add an entry with its sheet selector.'));
  process.exit(1);
}

const srv = http.createServer((rq, rs) => {
  const f = rq.url.split('?')[0].replace('/mini-tools/', '');
  const fp = path.join(ROOT, f);
  if (!fs.existsSync(fp)) { rs.writeHead(404); rs.end('x'); return; }
  const t = f.endsWith('.js') ? 'application/javascript' : f.endsWith('.json') ? 'application/json'
    : f.endsWith('.css') ? 'text/css' : 'text/html';
  rs.writeHead(200, { 'Content-Type': t }); rs.end(fs.readFileSync(fp));
});
/* ⚠ do not bind a port during a deploy — contract-only serves nothing */
if (!CONTRACT_ONLY) srv.listen(PORT);

let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) { PASS++; console.log('  ok   ' + m); } else { FAIL++; console.error('  FAIL ' + m); } };

(async () => {
  const browser = CONTRACT_ONLY
    ? null
    : await require('puppeteer').launch({ headless: 'new', args: ['--no-sandbox'] });

  for (const t of TOOLS) {
    if (CONTRACT_ONLY) break;
    if (only && only !== t.key) continue;
    console.log('\n[' + t.key + ']');
    const src = fs.readFileSync(path.join(ROOT, t.key + '.js'), 'utf8');

    const hasChip = /window\.print/.test(src);
    const hasBlock = /@media print/.test(src);
    is(!hasChip || hasBlock, hasChip
      ? (hasBlock ? 'offers a Print chip AND ships an @media print block' : '⭐ Print chip with NO @media print block — it prints the web page')
      : 'offers no Print chip (nothing to check)');
    if (!hasChip) continue;

    const page = await browser.newPage();
    await page.setViewport({ width: 1024, height: 900 });
    await page.goto(`http://127.0.0.1:${PORT}/${t.key}.html?lang=en&embed=1`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('.' + t.p + '-wrap', { timeout: 9000 }).catch(() => { });
    await new Promise((r) => setTimeout(r, 600));

    /* ⭐⭐ DRIVE IT ENTITLED, OR THE WHOLE CHECK IS VACUOUS. On a tool
       whose sheet is a PAID feature the Print chip shows the paywall and
       returns WITHOUT building anything — so the first version of this
       gate clicked, got the gate panel, and then passed an EMPTY
       .cmp-sheet because `display:grid` and `width > 0` were both true
       of a container with no children and zero height. It was the exact
       vacuity trap it had been written to catch, in the gate written to
       catch it. Force the entitled state first, then assert CONTENT. */
    if (t.prime) {
      await page.evaluate('(' + t.prime.toString() + ')(' + JSON.stringify(t.p) + ')');
      await new Promise((r) => setTimeout(r, 400));
    }
    await page.evaluate((p) => {
      const inst = Object.keys(window).map((k) => window[k])
        .find((v) => v && typeof v === 'object' && v.id && v.STORE_KEY && ('premium' in v));
      if (inst) inst.premium = true;
      const orig = window.print;
      window.print = function () { };          /* headless print would hang */
      const b = Array.from(document.querySelectorAll('.' + p + '-chip'))
        .find((x) => /print|drucken|imprim|stamp|afdruk|skriv|tulosta/i.test(x.textContent));
      if (b && !b.disabled) b.click();
      window.print = orig;
    }, t.p);
    await new Promise((r) => setTimeout(r, 300));

    /* ⭐ NOW LOOK AT IT IN PRINT MEDIA */
    await page.emulateMediaType('print');
    await new Promise((r) => setTimeout(r, 200));

    const seen = await page.evaluate((p, apparatus) => {
      const anyVis = (sel) => Array.from(document.querySelectorAll(sel)).some((e) => {
        const cs = getComputedStyle(e); const r = e.getBoundingClientRect();
        return cs.display !== 'none' && cs.visibility !== 'hidden' && r.width > 0;
      });
      return {
        hint: anyVis('.' + p + '-hint'),
        foot: anyVis('.' + p + '-foot'),
        chips: anyVis('.' + p + '-chip'),
        handles: anyVis('.' + p + '-handle, .' + p + '-grip'),
        apparatus: anyVis(apparatus),
        shellHeader: anyVis('.lcs-header'),
        /* ⭐ NON-VACUITY: what actually reaches paper, measured. A
           container can be visible, full-width and completely empty. */
        appKids: (() => { const e = document.querySelector(apparatus); return e ? e.querySelectorAll('*').length : -1; })(),
        appH: (() => { const e = document.querySelector(apparatus); return e ? Math.round(e.getBoundingClientRect().height) : -1; })(),
        /* ⚠ AND IT MUST NOT ASSUME ONE RENDERING TECHNOLOGY. The first
           version counted SVG primitives only and reported 0 for
           unit-handle — whose apparatus contains ZERO SVG and is built
           entirely from HTML elements. That is a wrong measurement, not
           a wrong tool. Ink is: an SVG primitive with a fill or stroke,
           OR an HTML box with a non-transparent background or a visible
           border, OR a text node. */
        inked: (() => {
          const e = document.querySelector(apparatus);
          if (!e) return 0;
          const clear = (v) => !v || v === 'none' || v === 'rgba(0, 0, 0, 0)' || v === 'transparent';
          const SVG_SHAPE = /^(rect|line|circle|ellipse|path|polygon|polyline|text)$/i;
          /* ⚠ COUNT DRAWING PRIMITIVES, NOT CONTAINERS. The first version
             counted every descendant, so stripping EVERY stroke off the
             sheet still scored 12 — the <svg> wrappers and layout boxes
             were counting themselves as ink. A poison test caught it:
             the number moved 20 -> 12 and the assertion still passed. */
          return Array.from(e.querySelectorAll('*')).filter((x) => {
            const cs = getComputedStyle(x);
            if (cs.display === 'none' || cs.visibility === 'hidden') return false;
            const tag = x.tagName.toLowerCase();
            if (SVG_SHAPE.test(tag)) {
              /* ⚠ A <line> HAS A COMPUTED FILL OF BLACK BY DEFAULT, and
                 fill is meaningless for a line — so "fill is not none"
                 scored every stroke-less line as ink, and a sheet with
                 EVERY stroke stripped still reported 8. Stroke-only
                 primitives are judged on stroke alone, and a stroke
                 needs a non-zero width to leave a mark. */
              const strokes = !clear(cs.stroke) && parseFloat(cs.strokeWidth) > 0;
              if (/^(line|polyline)$/.test(tag)) return strokes;
              return strokes || !clear(cs.fill);
            }
            if (tag === 'svg' || tag === 'g' || tag === 'defs') return false;   /* containers */
            if (x.childElementCount > 0) return false;                          /* HTML leaves only */
            if (!clear(cs.backgroundColor) || !clear(cs.backgroundImage)) return true;
            if (parseFloat(cs.borderTopWidth) > 0 && !clear(cs.borderTopColor)) return true;
            return x.textContent.trim().length > 0;
          }).length;
        })()
      };
    }, t.p, t.apparatus);

    is(seen.apparatus === true, `the apparatus (${t.apparatus}) reaches the page`);
    is(seen.appKids > 0, `NON-VACUITY: it has ${seen.appKids} descendants — an empty container is still "visible"`);
    is(seen.appH > 40, `NON-VACUITY: it is ${seen.appH}px tall, not a zero-height grid`);
    is(seen.inked > 0, `⭐ ${seen.inked} shapes carry a fill or a stroke — something actually reaches paper`);
    is(!seen.hint, 'the hint text is gone');
    is(!seen.foot && !seen.chips, 'the button row is gone');
    is(!seen.handles, 'no interactive grips survive — a sheet has no handles');
    is(!seen.shellHeader, 'the shell header is gone');

    await page.emulateMediaType('screen');
    await new Promise((r) => setTimeout(r, 150));
    /* ⚠ the chrome selector comes from the ROSTER, defaulting to the
       <prefix>-foot convention the first eight tools happen to share.
       Hardcoding it made this check unable to pass for any tool whose
       dock is called something else — place-value-lab's is .pvl-dock —
       which reads as a print defect and is a gate defect. */
    const back = await page.evaluate((sel) => {
      const e = document.querySelector(sel);
      return !!e && getComputedStyle(e).display !== 'none';
    }, t.chrome || ('.' + t.p + '-foot'));
    is(back, 'and the chrome returns on screen — the print rules are scoped to print');

    await page.close();
  }

  /* ===================================================================
     SURFACE 2 — the hosted worksheet's CSP sandbox
     =================================================================== */
  if (!only || only === 'hosted-worksheet') {
    console.log('\n[hosted-worksheet CSP]');

    /* ⭐ READ THE FAN-OUT OFF ITS SoT, AND REFUSE TO RUN IF IT PARSES
       IMPLAUSIBLY FEW. The apps that may be hosted are declared once, in
       core.ts; hardcoding 29 here would rot silently the day one is
       added. Refusing below 29 is the non-vacuity rule applied to a
       LIST — the #42 lesson, where a completeness check that listed a
       subset of the required fields CERTIFIED an incomplete entry. */
    const coreSrc = fs.readFileSync(
      path.join(__dirname, '..', 'frontend', 'lib', 'hosted-worksheets', 'core.ts'), 'utf8');
    const setBlock = (coreSrc.match(/HOSTABLE_APP_IDS\s*=\s*new Set\(\[([\s\S]*?)\]\)/) || [])[1];
    const hostable = setBlock ? (setBlock.match(/'[a-z0-9-]+'/g) || []).map((s) => s.slice(1, -1)) : [];
    is(hostable.length >= 29, `SoT: core.ts declares ${hostable.length} hostable apps (refuse below 29)`);
    if (hostable.length < 29) throw new Error('HOSTABLE_APP_IDS parsed implausibly few — gate would be vacuous');

    /* ⭐ EXTRACT THE REAL HANDLER, NEVER REIMPLEMENT IT. #44's lesson: a
       gate that rewrites the thing it checks is testing a copy, and three
       mutations of the real dispatch sailed through. This pulls the
       literal line out of the shipped apps and requires it in ALL of
       them — so the fixture is the product's own code, and the check
       doubles as a fan-out completeness assertion. */
    const HANDLER = 'document.getElementById("lcs-cel-print").addEventListener("click",function(){window.print()});';
    const missing = hostable.filter((a) => {
      const p = path.join(__dirname, '..', 'REFERENCE APPS', a + '.html');
      return !fs.existsSync(p) || fs.readFileSync(p, 'utf8').indexOf(HANDLER) === -1;
    });
    is(missing.length === 0, missing.length
      ? `⭐ ${missing.length} hostable app(s) lack the print handler: ${missing.join(', ')}`
      : `all ${hostable.length} hostable apps carry the verbatim print handler`);

    /* THE CONTRACT — this is the assertion that flips with the fix. The
       header variants below are LITERALS, so the poison side exists no
       matter what the repo says; this reads what we actually ship. */
    const routeSrc = fs.readFileSync(
      path.join(__dirname, '..', 'frontend', 'app', 'play', 'w', '[linkId]', 'route.ts'), 'utf8');
    const cspLits = routeSrc.match(/'Content-Security-Policy':\s*'([^']*)'/g) || [];
    is(cspLits.length === 1, `route.ts declares exactly one CSP literal (found ${cspLits.length})`);
    const shipped = ((cspLits[0] || '').match(/'Content-Security-Policy':\s*'([^']*)'/) || [])[1] || '';
    is(/\ballow-modals\b/.test(shipped), `⭐ shipped CSP grants allow-modals — else Print is a silent no-op  [${shipped}]`);
    is(!/\ballow-same-origin\b/.test(shipped), 'shipped CSP still WITHHOLDS allow-same-origin — the opaque origin holds');

    const POISON = 'sandbox allow-scripts allow-popups';
    const FIXED = 'sandbox allow-scripts allow-popups allow-modals';
    const DOC =
      '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>t</title></head><body>' +
      '<div class="lcs-celebration"><div class="lcs-celebration__cta">' +
      '<button type="button" id="lcs-do-another">Do Another</button>' +
      '<button type="button" id="lcs-cel-print">Print my worksheet</button>' +
      '</div></div><script>window.__printCalls=0;(function(){var n=window.print;' +
      'window.print=function(){window.__printCalls++;try{n.call(window)}catch(e){}}})();' +
      HANDLER + '<\/script></body></html>';

    if (CONTRACT_ONLY) {
      console.log('  note  --contract-only: browser probes skipped (no Chromium on the deploy host)');
    } else {

    const srv2 = http.createServer((rq, rs) => {
      rs.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
        'Content-Security-Policy': rq.url.indexOf('/fixed') === 0 ? FIXED : POISON,
      });
      rs.end(DOC);
    }).listen(PORT + 1);

    const probe = async (route) => {
      const page = await browser.newPage();
      const logs = [];
      /* ⚠ THE BLINK SECURITY MESSAGE ARRIVES VIA Log.entryAdded, NOT
         Runtime.consoleAPICalled — page.on('console') never sees it. */
      const cdp = await page.createCDPSession();
      await cdp.send('Log.enable');
      cdp.on('Log.entryAdded', (e) => logs.push(String(e.entry && e.entry.text || '')));
      page.on('console', (m) => logs.push(m.text()));
      /* attach BEFORE navigating: an unhandled dialog blocks the page */
      let dialogs = 0;
      page.on('dialog', async (d) => { dialogs++; await d.dismiss().catch(() => { }); });

      await page.goto(`http://127.0.0.1:${PORT + 1}${route}`, { waitUntil: 'domcontentloaded' });

      /* ⚠ DO NOT AWAIT THE CLICK. If native print ever blocks the
         renderer, an awaited evaluate never resolves and the run reads
         as a hang — which the harness would score as SURVIVED. Fire it
         detached, then poll. */
      page.evaluate(() => { setTimeout(() => document.getElementById('lcs-cel-print').click(), 0); })
        .catch(() => { });
      await new Promise((r) => setTimeout(r, 1200));

      let printCalls = -1, alive = false;
      try {
        printCalls = await page.evaluate(() => window.__printCalls);
        alive = true;
      } catch { /* renderer wedged */ }

      /* wording-independent corroboration of the SAME single flag */
      let confirmRet = null;
      if (alive) {
        try { confirmRet = await page.evaluate(() => window.confirm('probe')); } catch { }
      }
      await page.close().catch(() => { });
      return { logs, printCalls, alive, dialogs, confirmRet };
    };

    const bad = await probe('/poison');
    const good = await probe('/fixed');
    const blocked = (r) => r.logs.some((t) => /ignored call to 'print\(\)'/i.test(t));

    is(bad.alive && good.alive, 'both renderers stayed responsive through the print call');
    is(bad.printCalls >= 1 && good.printCalls >= 1,
      `the real handler ran on both sides (${bad.printCalls}/${good.printCalls}) — the button is wired`);

    /* ⭐ THE POISON HALF. This must FAIL on the unfixed header, or the
       green half proves nothing. */
    is(blocked(bad), 'POISON: unfixed header ⇒ the browser reports it ignored print()');
    is(!blocked(good), '⭐ FIXED: allow-modals ⇒ print() is no longer ignored');
    is(bad.dialogs === 0 && bad.confirmRet === false,
      'POISON: modals flag set — confirm() returns false and raises no dialog');
    is(good.dialogs >= 1, '⭐ FIXED: modals flag clear — confirm() actually raises a dialog');

    if (blocked(bad)) {
      const m = bad.logs.find((t) => /ignored call to 'print\(\)'/i.test(t)) || '';
      console.log(/allow-modals/i.test(m)
        ? '  note  the block names allow-modals — diagnosis confirmed verbatim'
        : '  note  ⚠ block message no longer names allow-modals (Chromium reworded): ' + m);
    }

    srv2.close();
    }
  }

  if (browser) await browser.close();
  srv.close();
  console.log('');
  if (FAIL) { console.error(`FAIL — ${FAIL} of ${PASS + FAIL} checks`); process.exit(1); }
  console.log(`PASS — ${PASS} checks: every Print chip produces a sheet${CONTRACT_ONLY ? ' (contract-only)' : ''}`);
})();
