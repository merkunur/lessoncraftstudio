/* =====================================================================
   TOOL #56 — THE GAP   (the-gap.js)
   ---------------------------------------------------------------------
   Free-play teacher instrument (no `tasks` — the shell renders zero
   activity chrome). v5 catalog, entry 12, commissioned as "THE CURTAIN".

   THE GROUND · THE MARKS · THE GAP. That is what the class sees and what
   every user-facing string names. (In the DOM those parts are `crt-shelf`,
   the `crt-mark`s standing on it, and the two `crt-board`s that travel in
   to FORM the gap — engineering names for the same three things.)

   THE ROUTINE:
     "Five. Watch the ground."                 ... the gap closes ...
     "Nine. What happened while we couldn't see?"

   ---------------------------------------------------------------------
   REBUILT 2026-08-11. WHAT WAS WRONG, MEASURED RATHER THAN ASSERTED.
   ---------------------------------------------------------------------
   The operator's verdict was that this was not a premium teaching tool:
   no teaching problem solved efficiently, no professional or
   child-friendly visual design. Both halves were correct, and the cause
   is in the history above: commissioned as a rich apparatus, it was cut
   down by three separate and individually reasonable rulings — the fence
   took the imagery, an art panel took the ducks on a contrast
   measurement, the pedagogy panel struck the claims — and what shipped
   was the defensive skeleton left over. The commission's killer
   mechanic was never built.

   ⭐⭐ THE TEACHER COULD NOT AIM IT, AND THAT IS THE HEADLINE. `newState`
   deals uniformly from 57 legal scenes at "up to ten" and 183 at "up to
   sixteen", so a teacher wanting one particular situation had to press
   again FORTY times for even odds, or a hundred and twenty-seven at
   sixteen. Nobody plans a lesson that way. The grips fix it, and they
   restore a routine the copy has advertised in eleven locales and the
   tool could never perform (`classroomIdeas[2]`: the same start twice,
   once arriving and once leaving) — which is now exactly the division of
   labour: THE GRIPS SET THE START, `again` RE-DEALS WHAT HAPPENS TO IT.

   ⚠ AND THE DEAL WAS DIRECTION-BIASED. 21 joining scenes against 36
   separating at the default cap — 63% take-away — because `legal()`
   needs `n >= 3` and `m >= 1`, so adding headroom shrinks as the start
   grows. Nobody had noticed; the counts are printed by the gate.

   ⭐⭐ THE EVIDENCE FAILED THE CONTRAST FLOOR IT WAS BUILT TO RESPECT.
   The pulse was `#F2784B` on `#F6EAD3`: 2.33:1, under the 3:1 non-text
   floor, on the one object carrying the whole meaning of the routine.
   `the-queue.js:429` had already measured exactly that and moved to
   coral's shadow `#A34122` at 5.28:1; this file contained `A34122` zero
   times. The marker is now two-tone — cream against the boards it
   crosses (3.71-5.95:1), coral in the cut track (4.25:1), `#A34122` rim
   tying both — and 144x52px at projector size against an 8px stub.

   ⚠ AND IT HAD NO RESPONSIVE DESIGN AT ALL: exactly two `@media`
   occurrences and both were `@media print`. `lcs-shell.css:125-130`
   widens the card to 1800px at >=1800px while `.crt-wrap` capped the
   apparatus at 660px with 34px counters, so the projector this
   instrument exists for showed a narrow column in a wide card.

   ---------------------------------------------------------------------
   THE BOARDS, AND WHY THE OLD GAP READ AS A BROKEN SCREEN
   ---------------------------------------------------------------------
   The old gap flipped the STAGE'S OWN BACKGROUND to `#0D4E44` and
   inverted the shelf's polarity. That is the grammar of a dropped
   signal, not of an event. Two painted boards now TRAVEL IN from the
   frame edges and meet: they arrive by moving, they are brown so
   nothing the class was already looking at changes value, and they are
   joinery with bevels, plank seams and a cast shadow. No handles — the
   boards are driven by the teacher's control, and an affordance nobody
   may use is a lie.
   ⚠ `shutter` is dead (`missing-question.js:32` records it as the
   REJECTED #55 mechanic; `ten-frame.js:172` names it in a prohibition);
   `gate`, `wall`, `sheet`, `easel`, `awning` are all taken. `boards` is
   free.

   ⚠⚠ THE COUNTERS STAY IN THE DOM WHILE THE BOARDS TRAVEL, and `st`
   flips to `gap` only when they are fully met — at which instant the
   shelf empties with NO VISIBLE CHANGE. The class watches them be
   covered instead of watching them vanish. This costs ZERO MODEL LINES:
   one existing assignment moved inside the first timeout, and
   `shown()` returning 0 during the gap — the load-bearing line in the
   file — is untouched.

   ---------------------------------------------------------------------
   THREE DEFECTS THE GATES COULD NOT SEE, FOUND BY READING
   ---------------------------------------------------------------------
   ⭐⭐ THE BLIND CHILD WAS NEVER TOLD WHICH WAY THE CHANGE WENT. The
   direction reached assistive tech only as an `aria-label` on a
   NON-FOCUSED `role="img"`, which announces nothing in JAWS, NVDA or
   VoiceOver — it is browse-mode content. `api.announce` was called in
   exactly two places in the whole file and never for the direction. The
   long, careful, much-commented gating written after ten panels caught a
   380ms leak had built a CORRECT AND COMPLETELY SILENT channel, and a
   carefully-timed announcement nobody hears is worse than the leak it
   replaced. It now fires on the line after the marker starts moving, and
   `verify` L6b drives it BY BUTTON and asserts it lands 0-40ms after —
   never before, which would be the mirror defect.

   ⭐⭐ UNDER REDUCED MOTION THE EVIDENCE TONE WAS SILENTLY DROPPED, for
   exactly the users most likely to depend on it: `_dur(T_FALL)`
   compresses to 106ms and `_snd` debounces at 160ms, so the call
   returned before reaching `api.sound`. The lift tone at 280ms survived,
   which is why nothing looked broken. It is `force`d now.

   ⭐⭐ AND `_clearTimers` CLEANED A PHANTOM. It read `this._wave`, which
   the rebuild renamed to `_marker` — the only reference in the file, a
   read with no write anywhere, so it was permanently undefined and the
   line did nothing. `_tPulse` is the only other thing that removes
   `is-on`, and `_clearTimers` cancels it, so abandoning a run mid-pulse
   left the marker OPAQUE and still carrying a direction into the next
   scene: an answer leak in the one phase the model never surrenders the
   sign. → GREP EVERY RENAMED FIELD FOR A WRITE SITE.

   ---------------------------------------------------------------------
   THE HEADER'S OWN LAW, BROKEN BY THE HEADER'S OWN FILE
   ---------------------------------------------------------------------
   ⚠⚠ Invention 3 below says this tool "must draw a before and an after
   at once". IT DID NOT — `shown()` returns `n` OR `m`, never both, so
   the class had to hold the first count in working memory across the
   gap, while THE PRINTED SHEET drew both bands. The paper was more
   faithful to the design than the screen. The readout now holds three
   fixed cells, before · after · your theory, and the witnessed start
   persists THROUGH the gap because the class counted it aloud and
   removing a fact they already hold would be dishonest.

   ⚠⚠ AND THE ACCESSIBLE NAME ON THE RAIL WAS `t('test') + ' ' + k`, the
   exact label-plus-number concatenation this file bans — all ten native
   panels found it independently. In Finnish `kokeilla` governs the
   partitive, so the phrase needs *viittä* where a digit can only supply
   *viisi*. The whole phrase now names the rail once as a group and each
   key is a bare numeral, which is grammatically inert in all eleven.

   ⚠ ONE FALSE CITATION IN THIS HEADER, CORRECTED. It claimed "#55's own
   free floor IS `5 + ? = 9` (`missing-question.js:609`)". Line 609 is a
   locale string map, and `missing-question.js:149` refuses equations BY
   NAME: "No equals sign and no arithmetic sentence, ever rendered." The
   claim is backwards, and it had already propagated into a fresh fence
   ruling before anyone read the bytes. A DOC IS NOT A FACT, LEAST OF ALL
   ONE WE WROTE OURSELVES.

   ---------------------------------------------------------------------
   IT IS NOT CALLED THE CURTAIN, AND THAT IS MEASURED, NOT TASTE
   ---------------------------------------------------------------------
   ⚠⚠ ALL THREE OF THE PITCH'S IMAGES ARE ALREADY SHIPPED PARTS:
      the HEM      -> number-talk-easel.js:528 `nte-hem` (and :1695, it
                      already sways)
      FOOTPRINTS   -> lids.js:2135 "the footprint ring"
      the CURTAIN  -> number-talk-easel.js:527 `nte-cloth`, :1681 — a
                      roller blind that covers a quantity and lifts
   ⚠⚠ AND THREE NUMBERS I PUT IN THIS BLOCK MYSELF WERE REFUTED BY
   RE-MEASUREMENT — "verify the measurement before the defect" firing
   against its own author. Measured over `mini tools/*.js`, this file
   excluded, by `scripts/_gap-measure-lex.js`:
     ❌ "lost in ALL ELEVEN" — FALSE. It is taken in NINE: en `curtain` 43,
        da `gardin` 11 + `tæppe` 6, nl `gordijn` 7, es + pt `cortina` 3
        each, de `Vorhang` 3, fr `rideau` 3, fi `verho` 3, sv
        `rullgardin` 2 — but ⚠ `no gardin` = 0 and `it tenda` = 0. Nine of
        eleven is still decisive, so the naming ruling stands unchanged;
        the COUNT does not, and is corrected here rather than defended.
     ❌ "`mørkt` ×9 in da/no" — FALSE, and so is the 3-da-plus-3-no a
        later re-measure proposed. `mørk*` occurs ONCE in the whole corpus
        (`reading-easel.js:216`, a Norwegian sentence). `dark` is refused
        on the OTHER ground only, which was always the better one: nothing
        here is unlit — the gap is a span of TIME, not an absence of light.
     ❌ "the Spanish dark-word contains `sombrero`" — FALSE as stated.
        `oscuro` and `oscuridad` measure 0 `sombrero` between them. The
        real adjacency is `sombra` -> `sombrero`, and `sombra` is banned
        anyway as SHADOW (7 hits, `sock-and-shadow-activity`).
     ✅ `pulse` SURVIVES re-measurement and stays out: es `pulsa` means
        PRESS, 6 hits across five sibling tools, and this tool has buttons.
        (This header said 20; a later re-measure said 4; it is 6.)
   So the third part is a span of TIME and is named for that.

   ---------------------------------------------------------------------
   WHAT IS ACTUALLY UNOWNED — the line this tool has to defend
   ---------------------------------------------------------------------
   The fence returned DO NOT BUILD, NOTHING SURVIVES, and it was right
   about almost everything: `lids.js:46-56` already refuses "cover part
   of a known total and ask what is under it" BY NAME; the whole CGI grid
   ships at `vet-diagnosis-core.js:45`; `_shared/picture-equation.js:106`
   is a wordless `a + [] = total` in eleven locales; and #55's own free
   floor IS `5 + ? = 9` (`missing-question.js:609`).

   ⭐⭐ BUT THE FENCE AND THE ART PANEL CONTRADICTED EACH OTHER ON THE ONE
      POINT THAT DECIDES IT, so I read the file instead of picking a
      panel. The fence said `part-whole-frame.js:1002-1006` "ships
      conceal -> change -> reveal in the free tier". IT IS AN
      ACCESSIBILITY NOTE — a covered tray staying keyboard-focusable —
      and the question it celebrates is not knowing the START. The art
      panel said "nothing hides a quantity while it changes"; that is too
      strong, because a counter really does leave a covered tray there.

      THE REMAINDER, on the only reading that survives both:
      in part-whole-frame THE CHILD makes the change and knows its size
      is one. HERE THE APPARATUS MAKES A CHANGE OF UNKNOWN MAGNITUDE
      WHILE COVERED. That is change-unknown proper, and it is the whole
      justification for this tool existing.
      ⚠ IF A LATER READER FINDS A SHIPPED SURFACE WHERE THE APPARATUS
      CHANGES A CONCEALED QUANTITY BY AN AMOUNT THE CHILD MUST INFER,
      THIS TOOL IS DEAD. That is the falsifiable form, and it is stated
      here because on #55 I wrote "CONSUMES entry 12" as a bare assertion
      and a panel had to grep 1,140 lines to catch that I had argued
      every other claim in that header and not this one.

   ---------------------------------------------------------------------
   THE PEDAGOGY PANEL RULED DO NOT BUILD, 3-0. WHAT IT CHANGED.
   ---------------------------------------------------------------------
   The operator's standing rule is that the tool ships and the panel's
   objections go in the header. These are not decoration — every one of
   them binds the COPY, and two of them bind tools other than this one.

   ❌ "THE DOCUMENTED SECOND RUNG OF THE DIFFICULTY LADDER" IS FALSE.
      Measured against the CGI literature it is FIFTH OF ELEVEN. The
      fourth consecutive panel to destroy the headline of the entry it
      was ruling on. ⚠ And the panel's own recorded prior was ALSO wrong,
      and wrong in the tool's FAVOUR — the direction this house keeps
      erring in. The claim may not appear in any of the eleven landings.

   ⚠⚠ THE BEST-EVIDENCED LEVER IN THIS PROBLEM CLASS IS LANGUAGE, AND
      §23.2 CONSTITUTIONALLY BANS IT. De Corte/Verschaffel/De Win:
      REWORDING a start-unknown problem moves Grade 1 from .33 to .79 —
      six words naming the unknown start set, a 46-point swing, zero
      mathematical change. A wordless tool forgoes the one measured lever
      and bets on an unproven visual substitute. The panel did NOT rule
      that wordless cannot work (a schema DEPICTION may carry the same
      conceptual clarification — that is what `vet-diagnosis` does), but
      THE BURDEN SITS ON THIS DESIGN TO PROVE IT SUBSTITUTES, and for a
      program whose thesis is "the proof is the moat" that is the wrong
      side to stand on. Recorded here rather than argued away.

   ⚠⚠ THE PITCH CONFLATED TWO LITERATURES AND THE APPARATUS ADDRESSES
      NEITHER OF THEM AS ADVERTISED. "Children believe maths always runs
      left to right" is the EQUALS-SIGN MISCONCEPTION, not CGI
      change-unknown difficulty — and this tool NEVER DISPLAYS AN EQUALS
      SIGN. A tool showing no equation cannot correct a belief about
      reading equations. ⭐ So that claim is struck from the copy too. The
      house already holds equals-sign-as-relation ground
      (`judge-balance-core.js`, `G3-350-number-balance`), and the one
      number in this whole territory that is large, twice-verified and
      unarguable — 0-10% correct on `8 + 4 = [] + 5` at EVERY grade 1-6,
      with Capraro's 98% CN vs 28% US proving it teachable — belongs to
      THAT tool, not this one.

   ✅ WHAT SURVIVES, AND IT IS ENOUGH FOR THE TOOL TO EXIST: join-change-
      unknown is ~30 points harder than result-unknown, and JCU appeared
      LITERALLY ZERO TIMES in three of four 1980s grade-1 textbooks. ⚠ But
      it must be stated as "textbooks do not contain them" — NO
      classroom-practice study exists, so the pitch's claim about what
      TEACHERS do is unevidenced.

   ⚠ FIVE NUMBERS ARE BANNED FROM ALL COPY, each verified unciteable:
      Behr/Erlwanger/Nichols (contains no percentages at all),
      Rittle-Johnson's 68% (a model-predicted probability; observed 57%),
      McNeil's per-age figures (graph-only), Carpenter 1989 (unverified),
      and ⚠ RILEY'S LADDER ITSELF — the table the entire difficulty
      hierarchy rests on — prints no N, derives to ~81 children, and
      three of its cells FALL from K to Grade 1. That is noise visible
      with the naked eye.

   ⚠⚠ AND ONE FINDING THAT BINDS OTHER TOOLS: Schoen et al. (2020),
      n=2,172 — CGI professional development is NULL at K-2, with a LARGE
      NEGATIVE effect on grade-2 computation. `vet-diagnosis` and
      `fix-it-corner` are CGI-grid instruments and NO COPY ANYWHERE MAY
      IMPLY A K-2 CGI EFFECT. ⭐ The converse is favourable and should be
      used instead: `vet-diagnosis`'s bind-to-iconic-role-slot mechanic
      IS direct schema instruction, which is the g=1.08 intervention.

   ---------------------------------------------------------------------
   TEN DEFECTS THE NATIVE PANELS MEASURED, AND WHAT EACH ONE CHANGED
   ---------------------------------------------------------------------
   Ten panels read the MODEL, not the copy. Every gate in the suite was
   green while all ten of these were live, which is the recorded shape:
   the model gate reads arithmetic, the layout gate reads geometry, and
   NEITHER OF THEM READS A CONSEQUENCE.

   ⭐⭐ THE PAID SHEET PRINTED THE ANSWER. `_buildSheet` had no phase
      guard and `beforeprint` checked only the TIER, so a subscriber
      pressing Ctrl+P during `before` or during the gap put `m` on the
      paper and on the projector before the class had watched anything.
      The band PAIR is now built only in phase `after`; every other phase
      prints the before-band and the ruled lines, and `m` is never built.
   ⭐⭐ THE DIRECTION LEAKED BEFORE THE PULSE, and 10 of 10 panels found
      it. `_paint` set `ariaCameIn`/`ariaWentOut` on the ground
      UNCONDITIONALLY, so a screen-reader user was told which way the
      change went AT MOUNT, in phase `before`, while the sighted class
      must wait for the pulse. It is set from the gap onward, cleared
      otherwise.
   ⚠ AND THOSE STRINGS MAY HAVE REACHED NOBODY: `_ground` was a bare
      `div` carrying an `aria-label` and NO ROLE, and ARIA forbids naming
      a `generic` element. Fixing the leak alone would have converted a
      SILENT leak into an AUDIBLE one, so the role lands in the same edit
      — `role="img"` while it carries evidence, `aria-hidden` when it
      carries none.
   ⭐ THE RAIL OFFERED LANDINGS `legal()` FORBIDS. `legal()` requires
      `m >= 1`; `rail()` and `tryK()` guarded `< 0`. Measured: 141 offers
      landed on 0 — a ground the scene generator would refuse to deal.
      Both guard `>= 1` now, so the rail cannot offer a landing the model
      would never have made.
   ⭐ A SETTINGS CHANGE MID-GAP STRANDED THE APPARATUS. `reset()`
      cancelled no timers and never cleared `_busy`: it ended in phase
      `gap` with 0 timers pending, the gap never lifted, and the next
      press of run SKIPPED THE PULSE ENTIRELY. The handles are stored and
      `_clearTimers()` is the one place they die.
   ⚠ PRINT WAS THE ONLY CONTROL NEVER GATED IN `_paint`, breaking the law
      stated verbatim in this same file at the top of the moves. A free
      user pressing it announced "Wait for the gap to lift" while shaking
      the RUN button. It is gated on entitlement, it keeps its own
      refusal, and the shake lands on the control that was pressed.
   ⚠ `saidMidRun` WAS FALSE IN PHASE `after` — the gap HAS lifted, so
      "wait for it to lift" is a lie — and `is-off` is opacity-only, so
      the click landed anyway. `disabled` now lands where there is nothing
      TRUE to say; while `_busy` the control stays live, because there the
      message IS true and disabling it would kill the key.
   ⚠ A REFUSED TRY ANNOUNCED NOTHING and shook the RUN button, because
      `try` matched neither `_refuse` branch. It has its own string now,
      and shakes the rail key the hand actually pressed.
   ⚠ THE LOCKED PANEL SHIPPED NO CTA — measured 0 here, where every
      comparable sibling ships `gateCta` (`landing-strip.js:605`,
      `number-drum.js:539`, `folding-wall.js:469`). It carries the pair.
   ⚠ AND THE COPY SAID THE GAP COVERS THE GROUND. The ground is
      deliberately the one thing left VISIBLE — the stage inverts so the
      pulse reads against it. What is covered is the MARKS. `saidDealt`
      likewise said "count the ground"; you count what is ON it.

   ✅ REFUTED BY MEASUREMENT, RECORDED SO IT IS NOT RE-FILED: the review
      also reported `T_STEP` and `T_LOOK` as dead constants with 0 call
      sites each. THEY DO NOT EXIST — both were deleted in the pass the
      GEO block below documents, and `scripts/_gap-dead-consts.js`
      measures 14 of 14 constants reaching a call site, 0 dead, with a
      non-vacuity control. ⚠ The first run of that probe, written as a
      shell-quoted `node -e`, reported ALL FOURTEEN DEAD; it was an
      escaping artefact. A wrong measurement agreeing with a wrong
      expectation is how a correct file gets "fixed".

   ---------------------------------------------------------------------
   THREE INVENTIONS
   ---------------------------------------------------------------------
   1. ⭐⭐ THE NON-LEAK IS STRUCTURAL, NOT CAREFUL. During the gap the
      hidden marks are NEVER BUILT (lids' own doctrine), so there is
      nothing in the DOM to leak. The evidence is a property of the
      GROUND, not of the marks: ONE pulse travels the baseline, inward or
      outward, FIXED AMPLITUDE, ONE iteration. It proves THAT a change
      happened and WHICH DIRECTION, and it is byte-identical for every
      magnitude in the legal range — which a gate can MEASURE rather than
      hope.

   2. ⭐⭐ REALITY DISAGREES WITHOUT ANYTHING BEING MARKED. The child taps
      a numeral to state a theory; the apparatus acts it out and lands
      where it lands. ⚠ THEY ARE NOT "DRAWN THE SAME WAY", AND THIS HEADER
      CLAIMED THEY WERE UNTIL A PANEL READ THE CSS: `.crt-num.is-try` adds
      a dashed border, a background, padding and a text stroke, and the
      rule comment far below concedes that it differs in KIND. That claim
      is load-bearing for the no-verdict rule, so it is restated as what
      the code does: the difference is of KIND AND NEVER OF HUE. Both
      numerals are `#0E5147`, the same size, on the same ground, so the
      outline says WHICH ONE IS YOURS and never which one is right; a
      coral/teal pair would have been a verdict delivered by the palette.
      That is the estimation-jar precedent, whose own `compare()` is never
      called in the render path. Nothing is green, nothing is red, nothing
      says wrong. The child sees the two numbers are not the same. The
      apparatus never says so.
      ⚠ This is the one thing the pedagogy panel was asked to rule on and
      had not returned when the build started: is it the material pushing
      back (house gate 4, required) or a verdict (forbidden)? It is built
      to the strictest reading — no comparison is COMPUTED anywhere in
      the render path, so the tool cannot be accused of judging even if
      the ruling lands on the strict side.

   3. ⭐ THE MARKS CARRY NO FEATURE, AND THAT IS FORCED. The art panel
      tried to give arrivals a facing silhouette so direction would read
      off the object, then refuted itself: in the replay residents and
      arrivals share the ground, so ANY distinguishing feature lets a
      child count the different-looking ones and the answer is handed
      over. Identical featureless marks are compelled by the same law
      that compelled them in #55 — the tools share a mark and share no
      stage. #55 partitions SPACE. This partitions TIME, and must draw a
      before and an after at once.

   ---------------------------------------------------------------------
   THE DUCKS
   ---------------------------------------------------------------------
   ⚠ #55's panel said the library had no duck. IT WAS WRONG — there are
   ducks in `animals/`, `farm animals/`, `birds 2/`, at 2000x2000 with
   near-identical silhouettes, which is what a counting stage wants.
   They still cannot be drawn, for a better reason: sampling all
   1,486,921 opaque pixels against the locked ground gives a MEDIAN DUCK
   PIXEL OF 1.62:1 on cream, 93.8% under 3:1, 22.8% under 1.5:1. `lids`
   once rejected a treatment at 1.17:1. The asset exists; the palette
   forbids it. (And `Things That Fly` is a semantic category, not a
   flight set — it contains frisbee.png and rocket.png.)

   ---------------------------------------------------------------------
   THE REFUSE-LIST, BINDING
   ---------------------------------------------------------------------
   ⭐ ADDED BY THE REBUILD, EACH BOUGHT BY A REAL DEFECT:
   No `--u` that reads `n`, `m` or `k` — a unit that moved with the count
   would broadcast both the direction and the magnitude across the gap;
   it is a function of container width and `cap` ONLY, and `cap` is a
   public setting the teacher chose. No per-counter entrance animation in
   any phase ever — a stagger makes the reveal's duration proportional to
   `n`, which is a real leak of the kind that ships. No operator glyph
   drawn on any control (the grips are chevrons: a `+` meaning ADD
   belongs to the arithmetic and would sit inches from one that does not
   — the recorded `baking-tray` defect, invisible to every string audit
   because nobody authors a glyph drawn by code). No accessible name
   built by concatenating a label with a number. No coral on any control:
   coral is the EVIDENCE, so a refusal rings BROWN — "not now", never
   "wrong". No unscoped `@media print` — an unscoped block hands a free
   visitor pressing Ctrl+P a blank page.

   Nothing marked right or wrong. No colour encodes correctness — and
   ⚠ `#146B5E` on `#0D4E44` measures 1.50:1, invisible, which is why the
   gate asserts MARK COUNT === 0 during the gap rather than trusting a
   colour to hide anything. No completeness readout. No order, no
   attribution, no trend (P14). No drag-only affordance. No curtain, hem
   or footprint noun. No feature on any mark. No words on the apparatus.
   No timer, score or streak. And NO EFFICACY CLAIM in any of the eleven
   landings.

   CCSS: 1.OA.D.8 (determine the unknown whole number in an addition or
   subtraction equation). Free-play, so no `tasks` -> no
   `educationalAlignment` -> the collision with #55's K.OA.A.3 is
   structurally impossible rather than merely absent.
   It loads NO ART and NO AUDIO beyond the shell's own pop.
   ===================================================================== */
(function () {
  'use strict';

  var GEO = {
    /* ⚠⚠ CAP = 16, DERIVED, and it matches the only accepted precedent:
       a 12px minimum featureless mark in a 265px arena at the 296px
       narrowest viewport leaves 12.6% margin. 17 was rejected at 7.1%
       and 18 at 1.5% — margin, not arithmetic. ⚠ The brief guessed this
       might halve because a before AND an after must both be on screen;
       that is TRUE side-by-side and FALSE stacked, and the shell's
       ResizeObserver is attached only for manipulatives, so height grows
       and width does not. Stacked it is. */
    CAP: 16,
    /* the smallest start worth watching: below 3 the whole scene is
       countable at a glance and there is nothing to wonder about */
    FLOOR: 3,
    /* ⚠⚠ k >= 2 IS REQUIRED, AND IT WAS FOUND BY RUNNING THE COUNT, not
       by taste. At k = 1 the change is the modal answer at 13% with a
       single pulse sitting over it looking like a reason — the (4,2,2)
       lesson from #55 in a new dress: the frame a naive generator emits
       most often is the one that teaches nothing. */
    KMIN: 2,

    /* motion, ms. ⚠ Reduced motion COMPRESSES, never skips. ⚠ Every one
       of these reaches a call site — #55 shipped SEVEN dead constants
       past a 8,903-assertion gate written to catch exactly that, and
       three native panels found them by reading.
       ⚠⚠ AND THIS TOOL SHIPPED THREE OF ITS OWN, under that very claim,
       until `verify-the-gap.js` L4 measured it: T_LIFT, T_STEP and
       T_LOOK were declared, documented and never read. The doctrine
       allows exactly two answers, and both are taken here, per constant:
         T_LIFT  — MADE TRUE. The lift IS the ground coming back out of
                   the dark, which is the stage's own background
                   transition; it was hard-coded `.25s`. It now reads
                   this constant, so the named duration and the drawn one
                   are one number.
         T_STEP  — DELETED. No motion of that name exists; the try is a
                   state change, not a movement. `SND_STEP` survives
                   because the sound does.
         T_LOOK  — DELETED, and the law it stated is not lost: the class
                   looks at the start for as long as it likes, because
                   the `before` phase persists until the TEACHER presses
                   the control. A fixed 800ms wait would have been a
                   second, worse implementation of a law the pacing
                   already keeps. */
    /* ⚠⚠ T_FALL WAS A LIE AND IS NOW TRUE. Nothing fell: the marks were
       removed instantly at the phase switch and this constant was only
       the delay before the pulse. The header prosecutes T_STEP and
       T_LOOK for exactly that and DELETES them, so this one survived on
       a technicality — it reached a call site while naming a motion that
       did not exist. It now times the BOARDS TRAVELLING SHUT, which is a
       real movement of a real object, and the name is honest. */
    T_FALL: 380,
    T_PULSE: 620,
    T_LIFT: 380,
    T_REFUSE: 200,
    /* the boards land with weight — a 110ms settle on the shelf */
    T_SETTLE: 110,
    /* a theory numeral inks in rather than appearing */
    T_INK: 160,
    /* secondary-button hover rise */
    T_HOVER: 120,
    RM_F: 0.28,
    RM_FLOOR: 90,

    SND_FALL: 380,
    SND_LIFT: 620,
    SND_STEP: 520,
    SND_REFUSE: 300,
    /* ⚠ T_, NOT SND_. Every other SND_* here is a FREQUENCY and this one
       is MILLISECONDS. `pair-gate.js:126` STILL ships that defect and is
       filed; this tool does not repeat it. */
    T_SND_DEBOUNCE: 160
  };

  var TheGap = {

    id: 'the-gap',

    /* ⚠ EVERY SIBLING SHIPS THIS (doubling-mirror.js:679), and its absence
       is an assertion, not a harness inconvenience: without it a model
       gate cannot read the constants it exists to check and has to
       `eval` them back out of the source. */
    GEO: GEO,

    strings: {
      title: {
        en: 'The Gap',
        de: 'Die Zwischenzeit',
        fr: 'L’Éclipse',
        es: 'El parpadeo',
        pt: 'O que aconteceu no intervalo',
        it: 'Il frattempo',
        nl: 'De tussentijd',
        sv: 'Ögonblicket',
        da: 'Mellemtiden',
        no: 'Øyeblikket vi ikke ser',
        fi: 'Väliaika'
      },
      instruction: {
        en: 'Count the marks on the ground. The gap covers the marks for a moment — the ground stays visible, and it shows you only whether something came or went, never how many. When the gap lifts, count again and work out what happened while the marks were hidden.',
        de: 'Zählt die Kiesel auf dem Boden. Dann kommt die Zwischenzeit: Die Kiesel sind verdeckt, nur der Boden bleibt zu sehen. Er verrät, ob etwas dazugekommen oder weggegangen ist — nie, wie viele. Danach zählt noch einmal und überlegt gemeinsam, was passiert ist, während die Kiesel verdeckt waren.',
        fr: 'Comptez les billes sur le sol. L’éclipse passe et couvre les billes un instant : le sol, lui, reste visible et montre seulement si quelque chose est entré ou sorti, jamais combien. Quand l’éclipse est finie, comptez de nouveau et cherchez ensemble ce qui s’est passé pendant que les billes étaient cachées.',
        es: 'Cuenten en voz alta las marcas que hay sobre el suelo. En el parpadeo no queda ninguna a la vista: lo único que se sigue viendo es el suelo, y el suelo solo dice si algo entró o si algo salió, nunca cuántas. Cuando el parpadeo termina, vuelvan a contar y averigüen qué pasó mientras las marcas no se veían.',
        pt: 'Contem as bolinhas no chão. O intervalo cobre as bolinhas por um instante — o chão continua à vista e só mostra se alguma coisa entrou ou saiu, nunca quantas. Quando o intervalo acaba, contem de novo e descubram o que aconteceu enquanto as bolinhas estavam escondidas.',
        it: 'Contate i sassi sulla riva. Poi arriva il frattempo e i sassi non si vedono più: la riva resta, e dice soltanto se qualcosa è entrato o se è uscito, mai quanti sassi. Quando il frattempo è passato, contate di nuovo e ragionate su che cosa è successo mentre i sassi non si vedevano.',
        nl: 'Tel de knikkers op de stoep. In de tussentijd zie je ze even niet — de stoep blijft wel zichtbaar, en die laat alleen zien dát er iets bij is gekomen of weg is gegaan, nooit hoeveel. Als de tussentijd voorbij is, tel je opnieuw en zoek je samen uit wat er gebeurd is terwijl je de knikkers niet kon zien.',
        sv: 'Räkna prickarna som ligger på golvet. Sedan täcker ögonblicket prickarna en stund — golvet syns hela tiden och visar bara om något kom eller gick, aldrig hur många. När ögonblicket är över räknar ni igen och listar ut vad som hände medan ni inte kunde se dem.',
        da: 'Tæl kastanjerne på jorden. Så kommer mellemtiden, hvor kastanjerne ikke er at se: jorden ligger der stadig, og den røber kun, om der kom noget ind, eller om der gik noget ud — aldrig hvor mange. Når mellemtiden er forbi, så tæl igen, og find ud af, hvad der skete, mens I ikke kunne se dem.',
        no: 'Tell punktene på bakken. Så blir punktene borte et øyeblikk — bakken er der hele tiden, og den viser dere bare om noe kom eller gikk, aldri hvor mange. Når øyeblikket er over, teller dere på nytt og finner ut hva som skjedde mens punktene var borte.',
        fi: 'Laskekaa yhdessä, kuinka monta merkkiä maassa on. Sitten väliaika peittää merkit hetkeksi: maa jää näkyviin ja näyttää vain sen, tuliko jotakin lisää vai lähtikö jotakin pois — ei koskaan sitä, kuinka paljon. Kun väliaika on ohi, laskekaa uudelleen ja päätelkää yhdessä, mitä väliajalla tapahtui.'
      },

      /* controls */
      again: {
        en: 'Another change',
        de: 'Neue Veränderung',
        fr: 'Autre changement',
        es: 'Otro cambio',
        pt: 'Outra mudança',
        it: 'Altro cambiamento',
        nl: 'Andere verandering',
        sv: 'Ny förändring',
        da: 'Ny forandring',
        no: 'Ny endring',
        fi: 'Uusi muutos'
      },
      run: {
        en: 'Show the gap',
        de: 'Die Zwischenzeit zeigen',
        fr: 'Lancer l’éclipse',
        es: 'Pasar por el parpadeo',
        pt: 'Começar o intervalo',
        it: 'Fai partire il frattempo',
        nl: 'De tussentijd laten lopen',
        sv: 'Låt ögonblicket gå',
        da: 'Lad mellemtiden gå',
        no: 'Start øyeblikket',
        fi: 'Aloita väliaika'
      },
      test: {
        en: 'Try',
        de: 'Versuch mit',
        fr: 'Essayer le nombre',
        es: 'Probar con',
        pt: 'Testar este tanto:',
        it: 'Prova con',
        nl: 'Probeer dit aantal:',
        sv: 'Pröva',
        da: 'Prøv med',
        no: 'Prøv med',
        fi: 'Kokeile lukua'
      },
      clear: {
        en: 'Clear the try',
        de: 'Versuch wegnehmen',
        fr: 'Effacer l’essai',
        es: 'Quitar la idea',
        pt: 'Apagar a tentativa',
        it: 'Togli la prova',
        nl: 'Het idee weghalen',
        sv: 'Ta bort förslaget',
        da: 'Fjern forslaget',
        no: 'Ta bort forslaget',
        fi: 'Poista ehdotus'
      },
      print: {
        en: 'Print the sheet',
        de: 'Blatt drucken',
        fr: 'Imprimer la fiche',
        es: 'Imprimir la hoja',
        pt: 'Imprimir a folha',
        it: 'Stampa la scheda',
        nl: 'Het stoepblad afdrukken',
        sv: 'Skriv ut arbetsbladet',
        da: 'Print arket',
        no: 'Skriv ut arket',
        fi: 'Tulosta paperipohja'
      },

      /* aria — the marks are not tap targets, so these carry the scene */
      ariaStart: {
        en: 'The ground has {n} marks on it.',
        de: 'Auf dem Boden liegen {n} Kiesel.',
        fr: 'Sur le sol, il y a {n} billes.',
        es: 'Marcas en el suelo: {n}.',
        pt: 'O chão tem {n} bolinhas.',
        it: 'Sassi sulla riva: {n}.',
        nl: 'Knikkers op de stoep: {n}.',
        sv: 'Det ligger {n} prickar på golvet.',
        da: 'Der ligger {n} kastanjer på jorden.',
        no: 'Det ligger {n} punkt på bakken.',
        fi: 'Maassa on merkkejä {n}.'
      },
      /* ⚠ NOT "covering the ground": the ground is the one thing left
         VISIBLE, because the stage inverts so the pulse reads against it.
         What the gap covers is the MARKS. */
      ariaGap: {
        en: 'The gap is covering the marks. Nothing can be counted. The ground is still there.',
        de: 'Jetzt läuft die Zwischenzeit. Die Kiesel sind verdeckt, es ist nichts zu zählen. Der Boden ist weiter zu sehen.',
        fr: 'L’éclipse couvre les billes. Il n’y a rien à compter. Le sol, lui, est toujours là.',
        es: 'Es el parpadeo: no queda ninguna marca a la vista y no hay nada que contar. El suelo se sigue viendo.',
        pt: 'O intervalo está cobrindo as bolinhas. Não dá para contar nada. O chão continua aí.',
        it: 'C’è il frattempo: i sassi non si vedono e non si può contare niente. La riva c’è ancora.',
        nl: 'De tussentijd loopt. Je kunt de knikkers nu even niet tellen. De stoep zie je nog wel.',
        sv: 'Ögonblicket täcker prickarna. Ingenting går att räkna. Golvet finns kvar.',
        da: 'Mellemtiden er i gang. Kastanjerne er ikke at se, og der er ikke noget at tælle. Jorden ligger der stadig.',
        no: 'Øyeblikket er i gang. Punktene er borte, og det er ingenting å telle. Bakken er der fortsatt.',
        fi: 'Väliaika peittää merkit. Nyt ei voi laskea mitään. Maa on yhä näkyvissä.'
      },
      ariaCameIn: {
        en: 'The ground shows something came in from the edge.',
        de: 'Der Boden zeigt: Vom Rand her ist etwas dazugekommen.',
        fr: 'Sur le sol : quelque chose est entré par le bord.',
        es: 'El suelo muestra que algo entró por un extremo.',
        pt: 'O chão mostra que alguma coisa entrou pela beirada.',
        it: 'La riva mostra che qualcosa è entrato da un lato.',
        nl: 'De stoep laat zien dat er iets bij is gekomen, van opzij.',
        sv: 'Golvet visar att något kom in från kanten.',
        da: 'Jorden viser, at der kom noget ind fra kanten.',
        no: 'Bakken viser at noe kom inn fra kanten.',
        fi: 'Maa näyttää, että jotakin tuli reunalta.'
      },
      ariaWentOut: {
        en: 'The ground shows something went out to the edge.',
        de: 'Der Boden zeigt: Zum Rand hin ist etwas weggegangen.',
        fr: 'Sur le sol : quelque chose est sorti par le bord.',
        es: 'El suelo muestra que algo salió por un extremo.',
        pt: 'O chão mostra que alguma coisa saiu pela beirada.',
        it: 'La riva mostra che qualcosa è uscito da un lato.',
        nl: 'De stoep laat zien dat er iets weg is gegaan, naar opzij.',
        sv: 'Golvet visar att något gick ut mot kanten.',
        da: 'Jorden viser, at der gik noget ud til kanten.',
        no: 'Bakken viser at noe gikk ut mot kanten.',
        fi: 'Maa näyttää, että jotakin lähti reunalle.'
      },
      ariaEnd: {
        en: 'The gap has lifted. Marks on the ground now: {m}. Before: {n}.',
        de: 'Die Zwischenzeit ist vorbei. Jetzt auf dem Boden: {m} Kiesel. Vorher waren es {n}.',
        fr: 'L’éclipse est finie. Nombre de billes sur le sol : {m} maintenant, {n} avant.',
        es: 'Terminó el parpadeo. Marcas en el suelo ahora: {m}. Antes había: {n}.',
        pt: 'O intervalo acabou. Agora o chão tem {m}, e antes tinha {n}.',
        it: 'Il frattempo è passato. Sassi sulla riva adesso: {m}. Prima del frattempo erano {n}.',
        nl: 'De tussentijd is voorbij. Knikkers op de stoep nu: {m}. Daarvoor: {n}.',
        sv: 'Ögonblicket är över. Nu är antalet på golvet {m}. Innan var det {n}.',
        da: 'Mellemtiden er forbi. Nu er der {m} på jorden. Før var der {n}.',
        no: 'Øyeblikket er over. Nå ligger det {m} punkt på bakken. Før lå det {n}.',
        fi: 'Väliaika on ohi. Maassa on nyt merkkejä {m}. Ennen väliaikaa niitä oli {n}.'
      },
      ariaTry: {
        en: 'Trying {k}: it started at {n} and lands on {r}. The class counted {m}.',
        de: 'Versuch mit {k}: Los ging es bei {n}, und es landet auf {r}. Gezählt hat die Klasse {m}.',
        fr: 'Essai avec {k} : on part de {n} et on arrive à {r}. La classe a compté {m}.',
        es: 'La idea es {k}. Empezó en {n} y llega a {r}. La clase contó {m}.',
        pt: 'Testando {k}: começou em {n} e chega a {r}. A turma contou {m}.',
        it: 'Prova con {k}: si parte da {n} e si arriva a {r}. La classe ha contato {m}.',
        nl: 'Idee: {k}. Het begon bij {n}, daarmee kom je op {r}. De klas telde er {m}.',
        sv: 'Förslaget {k}: från {n} till {r}. Klassen räknade {m}.',
        da: 'Forslaget er {k}. Fra {n} lander det på {r}. På jorden ligger der {m}.',
        no: 'Forslaget er {k}. Det begynte på {n} og lander på {r}. Klassen telte {m}.',
        fi: 'Kokeillaan lukua {k}. Alussa maassa oli merkkejä {n}, ja tämä ehdotus päätyy lukuun {r}. Luokka laski: {m}.'
      },

      /* the two counts, stated and never judged */
      sayBefore: {
        en: 'Before the gap: {n}.',
        de: 'Vor der Zwischenzeit: {n}.',
        fr: 'Avant l’éclipse : {n}.',
        es: 'Antes del parpadeo: {n}.',
        pt: 'Antes do intervalo: {n}.',
        it: 'Prima del frattempo: {n}.',
        nl: 'Vóór de tussentijd: {n}.',
        sv: 'Före ögonblicket: {n}.',
        da: 'Før mellemtiden: {n}.',
        no: 'Før øyeblikket: {n}.',
        fi: 'Ennen väliaikaa: {n}.'
      },
      sayAfter: {
        en: 'After the gap: {m}.',
        de: 'Nach der Zwischenzeit: {m}.',
        fr: 'Après l’éclipse : {m}.',
        es: 'Después del parpadeo: {m}.',
        pt: 'Depois do intervalo: {m}.',
        it: 'Dopo il frattempo: {m}.',
        nl: 'Na de tussentijd: {m}.',
        sv: 'Efter ögonblicket: {m}.',
        da: 'Efter mellemtiden: {m}.',
        no: 'Etter øyeblikket: {m}.',
        fi: 'Väliajan jälkeen: {m}.'
      },
      sayLands: {
        en: 'That try lands on {r}.',
        de: 'Dieser Versuch landet auf {r}.',
        fr: 'Cet essai arrive à {r}.',
        es: 'Esa idea llega a {r}.',
        pt: 'Essa tentativa chega a {r}.',
        it: 'Con questa prova si arriva a {r}.',
        nl: 'Met dit idee: {r}.',
        sv: 'Det förslaget hamnar på {r}.',
        da: 'Forslaget lander på {r}.',
        no: 'Det forslaget lander på {r}.',
        fi: 'Tämä ehdotus päätyy lukuun {r}.'
      },

      /* refusals. ⚠⚠ EVERY REFUSAL MUST BE TRUE IN THE PHASE IT FIRES IN,
         and two of the four channels had no string at all: a refused try
         announced NOTHING, and the paywall spoke `saidMidRun`. All ten
         non-English locales are now authored — by the ten native panels
         in `scripts/_the-gap-strings.js`, applied and VERIFIED ON DISK by
         `scripts/apply-the-gap-locales.js`.
         ⚠⚠ NO REFUSAL MAY EVER CARRY A PLACEHOLDER: `_refuse` calls
         `api.announce(api.t(msg))` with NO `_fmt`, so a `{k}` here
         renders as literal braces. Three panels found that by reading
         the dispatch; it is recorded so the next author does not.
         ⚠⚠ AND `saidMidRun` HAS TWO CALL SITES, NOT ONE: `_refuse('busy',
         …)` fires from `_run` AND from `_again`. Five locales (fr, es,
         pt, it, fi) had narrowed it to "you cannot start another gap",
         so a teacher who pressed DEAL-A-NEW-SCENE was refused in the
         name of the control they had not touched — and the Spanish went
         further and INSTRUCTED them to press the very button that had
         just refused them. The English is branch-agnostic and was true
         throughout, which is exactly why no English-side review could
         have found this. A refusal must be true in every branch that
         reaches it, not merely in the one its author had in mind. */
      saidMidRun: {
        en: 'Wait for the gap to lift.',
        de: 'Gerade ist keine neue Zwischenzeit möglich.',
        fr: 'Attendez la fin de l’éclipse.',
        es: 'Esperen a que termine el parpadeo.',
        pt: 'Esperem o intervalo acabar.',
        it: 'Aspettate che passi il frattempo.',
        nl: 'Wacht tot de tussentijd voorbij is.',
        sv: 'Vänta tills ögonblicket är över.',
        da: 'Det kan ikke lade sig gøre lige nu.',
        no: 'Vent til øyeblikket er over.',
        fi: 'Odotetaan, kunnes väliaika on ohi.'
      },
      saidNoTry: {
        en: 'There is nothing to clear yet.',
        de: 'Es gibt noch keinen Versuch zum Wegnehmen.',
        fr: 'Il n’y a encore rien à effacer.',
        es: 'Todavía no hay ninguna idea que quitar.',
        pt: 'Ainda não há nenhuma tentativa para apagar.',
        it: 'Non c’è ancora nessuna prova da togliere.',
        nl: 'Er is nog geen idee om weg te halen.',
        sv: 'Det finns inget förslag att ta bort än.',
        da: 'Der er ikke sat noget forslag endnu.',
        no: 'Det er ikke lagt fram noe forslag ennå.',
        fi: 'Ei ole vielä ehdotusta, jonka voisi poistaa.'
      },
      /* ⚠⚠⚠ THIS ONE STRING HAS NOW BEEN WRONG TWICE, AND THE SECOND
         WRONG ANSWER WAS THE FIX FOR THE FIRST. That is the recorded
         shape: a repair is not finished when the thing it repaired
         starts working.
           v1 "That try would take the ground past what it can hold" —
              false because the out-of-range branch CANNOT FIRE.
           v2 "That try is already on the ground" — the fix for v1, and
              false in a second way: nothing about a try is ever drawn on
              the ground. `_paint` does `add(this.lands(s), 'is-try')`
              into `this._counts`, which is a SIBLING of `this._stage`;
              `this._ground` is a CHILD of the stage. The try is a
              numeral in the readout, not a mark on the ground — and
              "the ground" is a NAMED PART of this tool, in the one
              instrument whose entire correction pass was about
              ground-versus-marks confusion. v1 was caught by measuring
              the model; v2 needed TEN NATIVE PANELS, 10 of 10, reading
              the render path. Neither was caught by a gate.
           v3 names the thing the child actually pressed: a NUMBER.
         ⚠ THE BRANCH, MEASURED, NOT READ: enumerated over every
         (legal scene x rail offer) at both caps — 1,960 pairs — `tryK`
         accepts 1,960 of 1,960 on first press and refuses 1,960 of 1,960
         on a REPEAT press. Out-of-range 0. Below-KMIN 0. `rail()` and
         `tryK()` share their bounds to the character, so the only
         refusal a pointer can produce is pressing the theory that is
         already stated, and the string speaks for exactly that.
         ⚠ IF THE RAIL IS EVER WIDENED PAST WHAT `tryK` ACCEPTS, this
         becomes two branches and needs two strings. */
      saidTryOff: {
        en: 'That number is already your try.',
        de: 'Diese Zahl ist schon euer Versuch.',
        fr: 'Ce nombre est déjà l’essai en cours.',
        es: 'Esa idea ya está puesta.',
        pt: 'Esse número já é a tentativa de vocês.',
        it: 'Questo numero è già la prova.',
        nl: 'Dat idee staat er al.',
        sv: 'Det förslaget är redan valt.',
        da: 'Det er allerede jeres forslag.',
        no: 'Det forslaget er allerede lagt fram.',
        fi: 'Tämä ehdotus on jo valittuna.'
      },
      saidLocked: {
        en: 'The sheet is part of a Teacher plan.',
        de: 'Das Blatt zum Ausdrucken gehört zum Lehrkraft-Abo.',
        fr: 'La fiche fait partie de l’abonnement Enseignant.',
        es: 'La hoja forma parte del plan Docente.',
        pt: 'A folha faz parte do plano Professor.',
        it: 'La scheda fa parte del piano Insegnante.',
        nl: 'Het stoepblad hoort bij het Leerkracht-abonnement.',
        sv: 'Arbetsbladet ingår i Lärarplanen.',
        da: 'Arket hører til Lærerabonnementet.',
        no: 'Arket hører til Lærerabonnementet.',
        fi: 'Paperipohjan tulostus kuuluu Opettajatilaukseen.'
      },
      /* ⚠ you count what is ON the ground, not the ground. */
      saidDealt: {
        en: 'The same marks are on the ground. This time something different happens to them.',
        de: 'Auf dem Boden liegen dieselben Kiesel wie vorher. Diesmal passiert etwas anderes mit ihnen.',
        fr: 'Sur le sol, il y a les mêmes billes qu’avant. Cette fois, il va leur arriver autre chose.',
        es: 'En el suelo están las mismas marcas de antes. Esta vez les va a pasar otra cosa.',
        pt: 'No chão estão as mesmas bolinhas de antes. Desta vez vai acontecer outra coisa com elas.',
        it: 'Sulla riva ci sono gli stessi sassi di prima. Questa volta succede qualcosa di diverso.',
        nl: 'Op de stoep liggen dezelfde knikkers als daarnet. Deze keer gebeurt er iets anders mee.',
        sv: 'Det ligger lika många prickar som förut på golvet. Den här gången händer det något annat med dem.',
        da: 'Der ligger de samme kastanjer som før på jorden. Denne gang sker der noget andet med dem.',
        no: 'Det ligger like mange punkt på bakken som før. Denne gangen skjer det noe annet med dem.',
        fi: 'Maassa on yhtä monta merkkiä kuin äsken. Tällä kertaa niille tapahtuu jotakin muuta.'
      },

      /* ⭐ THE TEACHER'S GRIPS. Each accessible name is its OWN WHOLE
         PHRASE — never a label concatenated with a number, which is the
         construction recorded as having broken Finnish case-marking on a
         sibling tool and caught by three separate ensembles. */
      /* ⚠ MY OWN BRIEF, VIOLATED IN MY OWN DRAFT. I told the panels that
         every accessible name here must be a whole phrase that stands
         alone, and then wrote "Start with more" — which is the same
         not-a-whole-phrase defect one step earlier. The panel caught it
         and named the counters. */
      setStartUp: {
        en: 'Start with more counters',
        de: 'Mit mehr Kieseln beginnen',
        fr: 'Commencer avec plus de billes',
        es: 'Empezar con más marcas',
        pt: 'Começar com mais bolinhas',
        it: 'Comincia con più sassi',
        nl: 'Met meer knikkers beginnen',
        sv: 'Börja med fler prickar',
        da: 'Start med flere kastanjer',
        no: 'Start med flere punkt',
        fi: 'Aloita useammalla merkillä'
      },
      setStartDown: {
        en: 'Start with fewer counters',
        de: 'Mit weniger Kieseln beginnen',
        fr: 'Commencer avec moins de billes',
        es: 'Empezar con menos marcas',
        pt: 'Começar com menos bolinhas',
        it: 'Comincia con meno sassi',
        nl: 'Met minder knikkers beginnen',
        sv: 'Börja med färre prickar',
        da: 'Start med færre kastanjer',
        no: 'Start med færre punkt',
        fi: 'Aloita harvemmalla merkillä'
      },
      /* ⚠ ONE STRING FOR BOTH ENDS, deliberately: `_step` fires
         `_refuse('set', el)` from either grip, so this sentence has to
         be true at the ceiling AND at the floor. Every panel wrote it
         direction-agnostic for that reason. */
      saidSetEnd: {
        en: 'The starting count stops here.',
        de: 'Weiter geht die Anfangszahl nicht.',
        fr: 'Le nombre de départ ne va pas plus loin.',
        es: 'Hasta aquí llega el número de partida.',
        pt: 'O número inicial vai até aqui.',
        it: 'Il numero di partenza non va oltre.',
        nl: 'Verder gaat het beginaantal niet.',
        sv: 'Det finns inget mer att välja åt det hållet.',
        da: 'Længere kan startantallet ikke sættes.',
        no: 'Her stopper starttallene.',
        fi: 'Aloitusmäärät loppuvat tähän.'
      },

      /* settings */
      rangeLabel: {
        en: 'How many marks',
        de: 'Anzahl der Kiesel',
        fr: 'Combien de billes',
        es: 'Cuántas marcas',
        pt: 'Quantas bolinhas',
        it: 'Quanti sassi',
        nl: 'Hoeveel knikkers',
        sv: 'Hur många prickar',
        da: 'Hvor mange kastanjer',
        no: 'Hvor mange punkt',
        fi: 'Merkkien määrä'
      },
      rangeTen: {
        en: 'up to ten',
        de: 'bis zehn',
        fr: 'jusqu’à dix',
        es: 'hasta diez',
        pt: 'até dez',
        it: 'fino a dieci',
        nl: 'tot tien',
        sv: 'upp till tio',
        da: 'op til ti',
        no: 'opp til ti',
        fi: 'enintään kymmenen'
      },
      rangeSixteen: {
        en: 'up to sixteen',
        de: 'bis sechzehn',
        fr: 'jusqu’à seize',
        es: 'hasta dieciséis',
        pt: 'até dezesseis',
        it: 'fino a sedici',
        nl: 'tot zestien',
        sv: 'upp till sexton',
        da: 'op til seksten',
        no: 'opp til seksten',
        fi: 'enintään kuusitoista'
      },

      /* paid sheet */
      sheetTitle: {
        en: 'The ground as the class watched it, and room to write what happened',
        de: 'Der Boden, wie ihn die Klasse gesehen hat — und Platz für das, was passiert ist',
        fr: 'Le sol comme la classe l’a vu, et de la place pour écrire ce qui s’est passé',
        es: 'El suelo tal como lo vio la clase, y espacio para escribir qué pasó',
        pt: 'O chão como a turma viu, e espaço para escrever o que aconteceu',
        it: 'La riva come l’ha vista la classe, con lo spazio per scrivere che cosa è successo',
        nl: 'De stoep zoals de klas hem zag, en ruimte om op te schrijven wat er gebeurde',
        sv: 'Golvet precis som klassen såg det, med plats att skriva vad som hände',
        da: 'Jorden, som klassen så den — og plads til at skrive, hvad der skete',
        no: 'Bakken slik klassen så den, med plass til å skrive hva som skjedde',
        fi: 'Maa sellaisena kuin luokka sen näki, ja tilaa kirjoittaa mitä tapahtui'
      },
      sheetHint: {
        en: 'Use one line for each gap the class watched, and write the number sentence that goes with it.',
        de: 'Für jede Zwischenzeit eine Zeile — und darauf die passende Rechnung.',
        fr: 'Des lignes réglées pour écrire ce que la classe a vu, et le calcul qui va avec.',
        es: 'Usen una línea para cada parpadeo que vio la clase y escriban la operación que le corresponde.',
        pt: 'Em cada linha, um intervalo que a turma viu e a sentença matemática que corresponde a ele.',
        it: 'Una riga per ogni frattempo che la classe ha guardato, con l’operazione corrispondente.',
        nl: 'Op elke regel één tussentijd die de klas zag, met de som die erbij hoort.',
        sv: 'Skriv en rad för varje ögonblick klassen har sett, och likheten som hör ihop med det.',
        da: 'Brug en linje til hver mellemtid, klassen har set, og skriv det regnestykke, der hører til.',
        no: 'Skriv én linje for hvert øyeblikk klassen så på, og regnestykket som hører til.',
        fi: 'Täytetään yksi rivi jokaista väliaikaa kohden ja kirjoitetaan siihen kuuluva lasku.'
      },
      lockedTitle: {
        en: 'The sheet is part of a Teacher plan',
        de: 'Das Blatt gehört zum Lehrkraft-Abo',
        fr: 'La fiche fait partie de l’abonnement Enseignant',
        es: 'La hoja forma parte del plan Docente',
        pt: 'A folha faz parte do plano Professor',
        it: 'La scheda fa parte del piano Insegnante',
        nl: 'Het stoepblad hoort bij het Leerkracht-abonnement',
        sv: 'Arbetsbladet ingår i Lärarplanen',
        da: 'Arket hører til Lærerabonnementet',
        no: 'Arket hører til Lærerabonnementet',
        fi: 'Paperipohja kuuluu Opettajatilaukseen'
      },
      lockedBody: {
        en: 'The whole apparatus is free — every gap, the ground, and as many tries as the class wants. A Teacher plan adds the printed sheet, which carries the ground as the class watched it, and ruled lines for the sentences the class writes.',
        de: 'Alles hier ist kostenlos — jede Zwischenzeit, der Boden und so viele Versuche, wie die Klasse möchte. Das Lehrkraft-Abo bringt zusätzlich das Blatt zum Ausdrucken: der Boden, wie ihn die Klasse gerade gesehen hat, und Linien zum Aufschreiben.',
        fr: 'Tout l’outil est gratuit — chaque éclipse, le sol et autant d’essais que la classe veut. L’abonnement Enseignant ajoute la fiche imprimée : elle reprend le sol comme la classe l’a vu, avec des lignes réglées pour écrire ses phrases.',
        es: 'Usar el instrumento es gratis: cada parpadeo, el suelo y todas las ideas que la clase quiera probar. El plan Docente añade la hoja impresa, que lleva el suelo tal como lo vio la clase, con renglones para escribir qué pasó.',
        pt: 'Aqui tudo é grátis — todos os intervalos, o chão e quantas tentativas a turma quiser. O plano Professor acrescenta a folha impressa: o chão como a turma viu, com linhas pautadas para ela escrever as sentenças.',
        it: 'Qui è tutto gratuito: ogni frattempo, la riva e tutte le prove che la classe vuole fare. Il piano Insegnante aggiunge la scheda da stampare: riporta la riva come l’ha vista la classe, con le righe su cui scrivere le operazioni.',
        nl: 'Het hele apparaat is gratis — elke tussentijd, de stoep en zoveel ideeën als de klas wil. Het Leerkracht-abonnement voegt het stoepblad toe: daarop staat de stoep zoals de klas hem zag, met lijnen om de sommen op te schrijven die de klas erbij bedacht.',
        sv: 'Allt här är gratis — varje nytt ögonblick, golvet och så många förslag som klassen vill. Lärarplanen lägger till arbetsbladet, som visar golvet precis som klassen såg det, med linjerade rader för de likheter klassen skriver.',
        da: 'Alt her er gratis — hver eneste mellemtid, jorden og lige så mange forslag, som klassen har lyst til. Lærerabonnementet giver desuden det printede ark med jorden, præcis som klassen lige har set den, og med linjer til de regnestykker, klassen selv skriver.',
        no: 'Hele apparatet er gratis — hvert øyeblikk, bakken og så mange forslag klassen vil prøve. Lærerabonnementet gir i tillegg arket, som viser bakken slik klassen nettopp så den, med linjer å skrive regnestykkene på.',
        fi: 'Täällä koko väline on maksuton — jokainen näytös, jokainen väliaika, maa ja niin monta ehdotusta kuin luokka haluaa kokeilla. Opettajatilaus tuo lisäksi paperipohjan, jossa on maa sellaisena kuin luokka sen näki, ja viivat, joille luokka kirjoittaa lauseensa.'
      },
      /* ⚠ measured 0 CTA here, where every comparable sibling ships one.
         A panel that says what a plan buys and offers no way to reach it
         is a dead end wearing a price tag. */
      gateCta: {
        en: 'See the Teacher plan',
        de: 'Das Lehrkraft-Abo ansehen',
        fr: 'Voir l’abonnement Enseignant',
        es: 'Ver el plan Docente',
        pt: 'Ver o plano Professor',
        it: 'Scopri il piano Insegnante',
        nl: 'Bekijk het Leerkracht-abonnement',
        sv: 'Se Lärarplanen',
        da: 'Se Lærerabonnementet',
        no: 'Se Lærerabonnementet',
        fi: 'Tutustu Opettajatilaukseen'
      },
      gateClose: {
        en: 'Not now',
        de: 'Jetzt nicht',
        fr: 'Pas maintenant',
        es: 'Ahora no',
        pt: 'Agora não',
        it: 'Non ora',
        nl: 'Nu niet',
        sv: 'Inte nu',
        da: 'Ikke nu',
        no: 'Ikke nå',
        fi: 'Ei nyt'
      }
    },

    settings: [
      { key: 'range', type: 'choice', labelKey: 'rangeLabel',
        options: [ { value: 'ten', labelKey: 'rangeTen' }, { value: 'sixteen', labelKey: 'rangeSixteen' } ] }
    ],

    defaults: { range: 'ten' },

    premium: false,

    /* ================= THE MODEL ===================================
       Pure, total, DOM-free. ⚠ The gate must reach these states BY
       BUTTON as well (law L2b) — #55's headline branch was unreachable
       under a 626-assertion gate because the gate only ever called the
       model. */

    cap: function (range) { return range === 'sixteen' ? GEO.CAP : 10; },

    /* ⭐⭐ A SCENE IS LEGAL IFF the change is at least KMIN, both ends sit
       inside the range, and the ground never empties — an empty ground
       after the gap is a different question (take-all) and it is not
       this tool's. */
    legal: function (n, k, cap) {
      if (n !== Math.round(n) || k !== Math.round(k)) return false;
      if (n < GEO.FLOOR || n > cap) return false;
      if (Math.abs(k) < GEO.KMIN) return false;
      var m = n + k;
      if (m < 1 || m > cap) return false;
      return true;
    },

    /* every legal scene at a cap, in a fixed order */
    scenes: function (cap) {
      var out = [], n, k;
      for (n = GEO.FLOOR; n <= cap; n++)
        for (k = -cap; k <= cap; k++)
          if (this.legal(n, k, cap)) out.push({ n: n, k: k, m: n + k });
      return out;
    },

    newState: function (range, pick) {
      var all = this.scenes(this.cap(range));
      var s = all[(pick == null ? Math.floor(Math.random() * all.length) : pick) % all.length];
      /* phase: 'before' -> 'gap' -> 'after'. `try` is the class's theory. */
      return { n: s.n, k: s.k, m: s.m, phase: 'before', tried: null };
    },

    /* ⭐⭐ EVERY LEGAL SCENE THAT STARTS AT `n`. This is what makes the
       instrument AUTHORABLE, and the number it replaces is the measured
       indictment of the old build: `newState` deals uniformly from 57
       scenes at "up to ten" and 183 at "up to sixteen", so a teacher who
       wanted one particular situation — a start of five that becomes
       nine — had to press `again` FORTY times for even odds, or a
       hundred and twenty-seven at sixteen. In practice nobody plans a
       lesson with that; they accept what the dice give. The tool's own
       landing copy proposes "use the same starting count twice, once
       with something coming in and once with something going out" as a
       classroom idea, and the tool provided no way to do it.
       ⚠ AUTHORSHIP NARROWS THE DEAL, IT NEVER WIDENS IT. This filters
       `scenes()`, so `legal()` is untouched and a scene the model refuses
       stays unreachable — the teacher cannot stage an illegal situation
       any more than the child can. */
    scenesStartingAt: function (cap, n) {
      return this.scenes(cap).filter(function (s) { return s.n === n; });
    },

    /* the starts a teacher can actually choose at this cap, in order */
    startsAvailable: function (cap) {
      var seen = {}, out = [];
      this.scenes(cap).forEach(function (s) { if (!seen[s.n]) { seen[s.n] = 1; out.push(s.n); } });
      return out.sort(function (a, b) { return a - b; });
    },

    /* ⚠ null is the single refusal channel here too: a step past either
       end of the available starts returns null and the paint draws the
       grip refused, so a live control can never sit over a dead move. */
    setStart: function (st, range, step) {
      var s = this._st(st);
      if (s.phase !== 'before') return null;
      var cap = this.cap(range), starts = this.startsAvailable(cap);
      var i = starts.indexOf(s.n);
      if (i < 0) return null;
      var j = i + step;
      if (j < 0 || j >= starts.length) return null;
      var pool = this.scenesStartingAt(cap, starts[j]);
      if (!pool.length) return null;
      /* keep the direction the teacher was already showing where that is
         possible, so stepping the start does not silently flip a join
         into a separation mid-lesson */
      var want = pool.filter(function (x) { return (x.k > 0) === (s.k > 0); });
      var pick = (want.length ? want : pool)[0];
      return { n: pick.n, k: pick.k, m: pick.m, phase: 'before', tried: null };
    },

    _st: function (st) { return st || this.st; },

    /* ⭐⭐ THE SIGN IS THE ONLY THING THE GROUND MAY EXPOSE. It is derived
       from k, never FROM the magnitude, and the renderer is given this
       and nothing else — which is what makes the non-leak structural
       rather than careful. */
    sign: function (st) { var s = this._st(st); return s.k > 0 ? 1 : -1; },

    /* how many marks are BUILT in a phase. ⚠ During the gap this is 0 —
       not hidden, not transparent, NOT BUILT — because `#146B5E` on
       `#0D4E44` measures 1.50:1 and a colour that looks like hiding is
       not hiding. */
    shown: function (st) {
      var s = this._st(st);
      if (s.phase === 'before') return s.n;
      if (s.phase === 'gap') return 0;
      return s.m;
    },

    /* ---- the moves. null is the single refusal channel, and the paint
       gates every control on its own move returning non-null, so a
       control can never LOOK live while the model refuses it. */

    advance: function (st) {
      var s = this._st(st);
      if (s.phase === 'before') return { n: s.n, k: s.k, m: s.m, phase: 'gap', tried: null };
      if (s.phase === 'gap') return { n: s.n, k: s.k, m: s.m, phase: 'after', tried: null };
      return null;
    },

    /* ⚠⚠ THE THEORY IS ONLY LIVE ONCE THE QUESTION EXISTS. Before the gap
       has lifted there is nothing to have a theory about, and a control
       that took an answer to a question nobody had asked is a recorded
       house defect across four tools. */
    tryK: function (st, k) {
      var s = this._st(st);
      if (s.phase !== 'after') return null;
      if (k == null || k !== Math.round(k)) return null;
      if (Math.abs(k) < GEO.KMIN) return null;
      var cap = this.cap((this.api && this.api.settings && this.api.settings.range) || 'ten');
      /* ⚠⚠ `>= 1`, NOT `>= 0` — `legal()` requires `m >= 1` because an
         empty ground is a different question (take-all) and not this
         tool. Guarding `< 0` here let the rail offer, and this move
         accept, 141 landings on a ground the generator would refuse. */
      if (s.n + k < 1 || s.n + k > cap) return null;
      if (s.tried === k) return null;
      return { n: s.n, k: s.k, m: s.m, phase: 'after', tried: k };
    },

    clearTry: function (st) {
      var s = this._st(st);
      if (s.tried === null) return null;
      return { n: s.n, k: s.k, m: s.m, phase: s.phase, tried: null };
    },

    /* ⭐⭐ WHERE A THEORY LANDS — and the tool NEVER compares this to `m`.
       Both are rendered the same way on the same ground; no comparison
       is COMPUTED anywhere in the render path, which is the
       estimation-jar precedent and the strictest reading of the "the
       tally never compares" ruling. */
    lands: function (st) {
      var s = this._st(st);
      if (s.tried === null) return null;
      return s.n + s.tried;
    },

    /* the choices offered on the rail — every legal magnitude, signed by
       what the ground already showed, so the child chooses HOW MANY and
       never has to also guess the direction the ground told them */
    rail: function (st, range) {
      var s = this._st(st), cap = this.cap(range), sg = this.sign(s), out = [], k;
      for (k = GEO.KMIN; k <= cap; k++) {
        if (s.n + sg * k < 1 || s.n + sg * k > cap) continue;   /* `legal()` floor, not 0 */
        out.push(sg * k);
      }
      return out;
    },

    /* ================= LIFECYCLE ==================================== */

    init: function (api) {
      this.api = api;
      /* ⚠⚠ THE SCROLL ESCAPE, TWO RULES, and the complete house form.
         `overflow-y:auto` ALONE is present-and-inert against a shell that
         pins html,body{height:100%} — measured on #55 at 320x568 as an
         1150px card in a 568px window with scrollY immovable. Two
         SHIPPED siblings still carry the inert form. */
      document.documentElement.classList.add('crt-scroll');
      document.body.classList.add('crt-scroll');
      this._lastSound = 0;
      this._reduced = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
      this.st = this.newState(api.settings.range);
      this._checkEntitlement();
      this._bindPrint();
    },

    /* ⚠⚠ A SETTINGS CHANGE MID-GAP STRANDED THE APPARATUS. `reset()`
       cancelled nothing, so a run in flight kept its two timers, and the
       fresh state they landed on was advanced out from under the new
       scene: reproduced ending in phase `gap`, 0 timers pending, the gap
       never lifting, and the next press of run SKIPPING THE PULSE. */
    reset: function () {
      this._clearTimers();
      this.st = this.newState(this.api.settings.range);
      this.render();
    },

    /* the ONE place a run in flight dies. Anything that abandons a run
       calls this — never `_busy = false` on its own. */
    _clearTimers: function () {
      if (this._tFall) { window.clearTimeout(this._tFall); this._tFall = null; }
      if (this._tPulse) { window.clearTimeout(this._tPulse); this._tPulse = null; }
      this._busy = false;
      /* ⚠⚠ THIS NAMED `_wave`, WHICH THE REBUILD RENAMED TO `_marker`,
         AND IT WAS THE ONLY REFERENCE IN THE FILE — a read with no
         assignment anywhere, so it was permanently undefined and this
         line did nothing. `_tPulse` is the only other thing that removes
         `is-on`, and `_clearTimers` cancels it, so abandoning a run
         mid-pulse (a settings change, a reset) left the marker OPAQUE
         and still carrying a direction into the next scene. That is an
         answer leak in the one phase the model never surrenders the
         sign, and no gate could see it because the flag it depended on
         read as ordinary falsy. Found by a native panel reading the
         model. → grep every renamed field for a WRITE site. */
      if (this._marker) this._marker.classList.remove('is-on');
    },

    onSettings: function () { this.reset(); },

    _dur: function (ms) {
      if (!this._reduced) return ms;
      return Math.max(GEO.RM_FLOOR, Math.round(ms * GEO.RM_F));
    },

    _snd: function (f, force) {
      var now = Date.now();
      if (!force && now - this._lastSound < GEO.T_SND_DEBOUNCE) return;
      this._lastSound = now;
      if (this.api && this.api.sound) this.api.sound(f);
    },

    _fmt: function (s, v) {
      return String(s).replace(/\{(\w+)\}/g, function (mm, k) {
        return (v && v[k] != null) ? String(v[k]) : mm;
      });
    },

    render: function () { this._build(); this._paint(); },

    /* ================= DOM ========================================== */

    /* ⭐ THE APPARATUS IS THE BOARDS. Two painted boards travel in from
       the two frame edges and meet over a shelf. The stage's own colour
       never changes — a DIFFERENT MATERIAL arrives and covers part of
       it, which is why this cannot read as a rendering fault the way the
       old full-stage colour flip did. It arrives by travelling, it is
       brown rather than teal, and it has thickness. No handles: the
       boards are driven by the teacher's control, and an affordance
       nobody may use is a lie. */
    _build: function () {
      /* ⚠⚠ api.STAGE, NOT api.root. #55 read `api.root`, which the shell
         does not put on its frozen api, and threw on the first line of
         its first paint in every locale at every viewport — under 8,903
         green model assertions. A model gate proves the model. */
      var api = this.api, self = this;
      this.injectCSS();
      var root = api.stage || api.root;
      root.innerHTML = '';

      var wrap = document.createElement('div');
      wrap.className = 'crt-wrap';
      root.appendChild(wrap);
      this._wrap = wrap;

      /* ⭐⭐ EVERY DRAWN DURATION IS WRITTEN HERE FROM THE NAMED CONSTANT,
         so the named number and the drawn number are ONE number by
         construction. The old build baked `_dur(T_PULSE)` into a cached
         stylesheet at first paint, so a teacher who turned reduced
         motion on mid-lesson got a JS timeline at one duration and a CSS
         animation at another — the exact desynchronisation the old
         comment claimed to have closed, closed only for the mount-time
         value. Setting properties per build cannot drift. */
      this._writeVars();

      var stage = document.createElement('div');
      stage.className = 'crt-stage';
      wrap.appendChild(stage);
      this._stage = stage;

      /* the band the counters stand in */
      this._marks = document.createElement('div');
      this._marks.className = 'crt-band';
      stage.appendChild(this._marks);

      /* the shelf. Its cut track exists in EVERY phase, empty — so when
         the marker runs it reads as "something moved along the track",
         not as "a bar appeared from nowhere". */
      this._shelf = document.createElement('div');
      this._shelf.className = 'crt-shelf';
      stage.appendChild(this._shelf);

      /* ⭐ the five-ticks: three rules at 5 | 10 | 15, FIXED, never a
         function of `n`, so a row of 12 reads as "two ticks and two
         more" without a word. This is the second representation the
         instrument was missing, and it is what makes the routine's own
         first step — "count the ground" — possible at a glance. */
      this._buildTicks();

      var floor = document.createElement('div');
      floor.className = 'crt-floor';
      stage.appendChild(floor);

      this._boardL = document.createElement('div');
      this._boardL.className = 'crt-board crt-board-l';
      this._boardL.setAttribute('aria-hidden', 'true');
      stage.appendChild(this._boardL);

      this._boardR = document.createElement('div');
      this._boardR.className = 'crt-board crt-board-r';
      this._boardR.setAttribute('aria-hidden', 'true');
      stage.appendChild(this._boardR);

      /* ⚠ THE MARKER IS CREATED ONCE AND ONLY ITS CLASSES TOGGLE. It is
         never removed and re-appended (the `the-queue.js:408` lesson), so
         no `n`-dependent DOM churn can ever creep into the evidence
         path. */
      this._marker = this._buildMarker();
      stage.appendChild(this._marker);

      /* the readout: three fixed cells, before · after · your theory.
         ⚠⚠ THE CELLS AND THE GRIPS ARE BUILT ONCE AND MUTATED IN PLACE.
         The old rail rebuilt every key on every paint, so pressing one
         destroyed the node you pressed and dropped keyboard focus to
         `<body>` — the user had to tab back from the top of the
         document. Anything focusable in this tool is now created once. */
      this._read = document.createElement('div');
      this._read.className = 'crt-read';
      wrap.appendChild(this._read);

      this._cell = [];
      var ci;
      for (ci = 0; ci < 3; ci++) {
        var cell = document.createElement('div');
        cell.className = 'crt-cell';
        this._read.appendChild(cell);
        this._cell.push(cell);
      }

      /* ⭐⭐ THE TEACHER'S CONTROL, AND IT SITS ON THE NUMBER IT SETS.
         Chevrons, never `+` and `−`: a real `+` meaning ADD belongs to
         the arithmetic this instrument is about, and drawing one on a
         grip inches away would be the recorded `baking-tray` defect —
         an operator glyph drawn by code, invisible to every string audit
         and to every native panel because nobody authored it. */
      this._set = document.createElement('div');
      this._set.className = 'crt-set';
      this._grip = {};
      this._grip.up = this._grip_(this._set, 'up', 'setStartUp');
      this._grip.down = this._grip_(this._set, 'down', 'setStartDown');
      this._cell[0].appendChild(this._set);
      this._grip.up.addEventListener('click', function () { self._step(1, self._grip.up); });
      this._grip.down.addEventListener('click', function () { self._step(-1, self._grip.down); });

      this._rail = document.createElement('div');
      this._rail.className = 'crt-rail';
      wrap.appendChild(this._rail);

      var row = document.createElement('div');
      row.className = 'crt-row';
      wrap.appendChild(row);

      /* ⚠⚠ ICONS, NOT UNICODE TEXT. The old chrome drew `◑ ↺ ↻ ⎙`: `↺`
         and `↻` are MIRROR IMAGES of one another at 17px and sat
         adjacent while meaning two different things, and `U+2399` has
         patchy font coverage — it rendered as an ambiguous round mark
         rather than a printer in the shipped screenshot. Hand-built SVG
         on the shell's own 24-grid removes both problems, and it also
         dissolves an eleven-locale layout problem: the label "Make
         something else happen" is 30 characters in German and could not
         fit one row in any language. */
      /* ⚠ THE STRING KEY IS THE LAST ARGUMENT, ALWAYS. `verify` finds the
         call sites with `/_mk\([^)]*?'(\w+)'\)/`, so a trailing
         `true` for "this one is primary" made `run`'s key invisible to
         the scan — and the scan's own non-vacuity check caught it. The
         primary styling is a class like any other. */
      this._btn = {};
      this._btn.run = this._mk(row, 'crt-b-run is-primary', 'run', 'run');
      this._btn.clear = this._mk(row, 'crt-b-clear', 'clear', 'clear');
      this._btn.again = this._mk(row, 'crt-b-again', 'again', 'again');
      this._btn.print = this._mk(row, 'crt-b-print', 'print', 'print');

      this._btn.run.addEventListener('click', function () { self._run(); });
      this._btn.clear.addEventListener('click', function () { self._clear(); });
      this._btn.again.addEventListener('click', function () { self._again(); });
      this._btn.print.addEventListener('click', function () { self._print(); });

      this._gateHost = document.createElement('div');
      this._gateHost.className = 'crt-gate';
      wrap.appendChild(this._gateHost);

      /* ⚠⚠ THE SHEET IS A SIBLING OF THE WRAP, NEVER A CHILD — the print
         block sets `.crt-wrap{display:none}` and a hidden parent kills
         the whole subtree, so a sheet built inside it measures 0mm on
         paper while every assertion stays green. */
      this._sheet = document.createElement('div');
      this._sheet.className = 'crt-sheet';
      root.appendChild(this._sheet);

      this._gate();
    },

    /* ⭐ The ticks stand at the GROUP BOUNDARIES — after 5, after 10,
       after 15 — and their positions are computed from `--u`, `--g1`,
       `--g2` and `--inset` only.
       ⚠ THE COUNT OF TICKS IS A FUNCTION OF `cap`, NEVER OF `n`, `m` OR
       `k`. `cap` comes from the `range` SETTING, which the teacher chose
       and which is public, so it discloses nothing; a tick that appeared
       or moved with the count would hand over the magnitude. A boundary
       beyond `cap` is not drawn because nothing can ever stand there —
       at "up to ten" that is two ticks, at "up to sixteen" three. */
    _buildTicks: function () {
      var cap = this.cap(this.api.settings.range), i, x, tick;
      var group = 'calc(5 * var(--u) + 4 * var(--g1))';
      for (i = 1; i * 5 < cap; i++) {
        x = 'calc(var(--inset) + ' + i + ' * ' + group +
            ' + ' + (i - 0.5) + ' * var(--g2))';
        tick = document.createElement('span');
        tick.className = 'crt-tick';
        tick.setAttribute('aria-hidden', 'true');
        tick.style.left = x;
        this._shelf.appendChild(tick);
      }
    },

    /* ⭐⭐ THE SIZE LAW, AND IT HAS TWO TERMS, NOT ONE. `--u` is a function
       of container width AND `cap` — I shipped only the first term and
       the projector showed why: at "up to ten" the row can never be
       longer than 13.02u, so a fixed 4.0cqw (derived for the 21.06u that
       a cap of sixteen needs) left a 1160px shelf carrying three
       counters in one corner.
         row width in u = C + (C - groups)*g1 + (groups - 1)*g2 + inset
       and the unit is solved so the row occupies 87.4% of the container
       at EVERY cap — the same constant margin the CAP comment accepted.
       ⚠ `cap` comes from the `range` SETTING, which the teacher chose and
       which is public. It is NOT `n`, `m` or `k`, and it must never
       become them: a unit that moved with the count would broadcast both
       the direction and the magnitude of the change across the gap. */
    _rowUnits: function (cap) {
      var groups = Math.ceil(cap / 5);
      return cap + (cap - groups) * 0.20 + (groups - 1) * 0.62 + 0.8;
    },

    _writeVars: function () {
      if (!this._wrap) return;
      this._wrap.style.setProperty('--rowu',
        String(this._rowUnits(this.cap(this.api.settings.range))));
      this._writeDurations();
    },

    _writeDurations: function () {
      if (!this._wrap) return;
      var s = this._wrap.style, self = this;
      var put = function (name, ms) { s.setProperty(name, self._dur(ms) + 'ms'); };
      put('--t-fall', GEO.T_FALL);
      put('--t-lift', GEO.T_LIFT);
      put('--t-pulse', GEO.T_PULSE);
      put('--t-refuse', GEO.T_REFUSE);
      put('--t-settle', GEO.T_SETTLE);
      put('--t-ink', GEO.T_INK);
      put('--t-hover', GEO.T_HOVER);
    },

    _svg: function (vb, cls) {
      var s = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      s.setAttribute('viewBox', vb);
      s.setAttribute('aria-hidden', 'true');
      s.setAttribute('focusable', 'false');
      if (cls) s.setAttribute('class', cls);
      return s;
    },

    _path: function (d, attrs) {
      var p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      p.setAttribute('d', d);
      var k;
      for (k in attrs) if (attrs.hasOwnProperty(k)) p.setAttribute(k, attrs[k]);
      return p;
    },

    /* ⭐ THE EVIDENCE. An 8px stub at 2.33:1 was not evidence — it was
       the least visible thing on a stage whose whole meaning it carried.
       This is a two-tone arrow: its upper half is cream against the
       brown boards it crosses (3.71–5.95:1) and its lower half is coral
       inside the dark cut track (4.25:1), tied by an `#A34122` rim
       (5.28:1 on cream). Two tones because there are two grounds. At
       projector size it is 144×52px.
       ⚠ Nothing here is a function of magnitude: width, height, colour,
       easing, duration and iteration-count are all constant, and the
       ONLY thing that varies is `scaleX(±1)` plus which keyframe runs —
       which is `sign(k)`, precisely the fact the instrument intends to
       disclose. */
    _buildMarker: function () {
      var s = this._svg('0 0 320 115', 'crt-marker');
      var defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
      var g = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
      g.setAttribute('id', 'crt-mkr');
      g.setAttribute('x1', '0'); g.setAttribute('y1', '0');
      g.setAttribute('x2', '0'); g.setAttribute('y2', '1');
      var stops = [['0', '#FBF3E4'], ['0.56', '#FBF3E4'], ['0.56', '#F2784B'], ['1', '#DF6435']];
      stops.forEach(function (st) {
        var e = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        e.setAttribute('offset', st[0]);
        e.setAttribute('stop-color', st[1]);
        g.appendChild(e);
      });
      defs.appendChild(g);
      s.appendChild(defs);
      s.appendChild(this._path(
        'M6 0 H232 L318 57.5 L232 115 H6 A6 6 0 0 1 0 109 V6 A6 6 0 0 1 6 0 Z',
        { fill: 'url(#crt-mkr)', stroke: '#A34122', 'stroke-width': '2',
          'stroke-linejoin': 'round', 'vector-effect': 'non-scaling-stroke' }));
      return s;
    },

    ICONS: {
      /* two things closing on the middle */
      run: ['M3 12 H10', 'M7 8.5 L10.5 12 L7 15.5', 'M21 12 H14', 'M17 8.5 L13.5 12 L17 15.5', 'M12 3.5 V20.5'],
      /* undo — an arc with its head at the arc's start */
      clear: ['M19.8 13.6 A8 8 0 1 1 12 4', 'M8.4 6.6 L12 4 L14.4 7.6'],
      /* a different arrangement — a shuffle, distinct from undo at a glance */
      again: ['M3.5 7 H8 L16 17 H20.5', 'M3.5 17 H8 L16 7 H20.5',
        'M17.8 4.6 L20.6 7 L17.8 9.4', 'M17.8 14.6 L20.6 17 L17.8 19.4'],
      print: ['M7.5 9 V3.5 H16.5 V9', 'M5 9 H19 A2 2 0 0 1 21 11 V16 H17 M7 16 H3 V11 A2 2 0 0 1 5 9',
        'M7 13.5 H17 V20.5 H7 Z']
    },

    _icon: function (key) {
      var s = this._svg('0 0 24 24', 'crt-icon'), self = this;
      s.setAttribute('fill', 'none');
      s.setAttribute('stroke', 'currentColor');
      s.setAttribute('stroke-width', '2');
      s.setAttribute('stroke-linecap', 'round');
      s.setAttribute('stroke-linejoin', 'round');
      (this.ICONS[key] || []).forEach(function (d) { s.appendChild(self._path(d, {})); });
      return s;
    },

    /* a chevron grip. Its accessible name is its OWN WHOLE PHRASE, never
       a label concatenated with a number — that construction is recorded
       as having broken Finnish case-marking on a sibling tool, caught by
       three ensembles. */
    _grip_: function (parent, dir, key) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'crt-grip crt-grip-' + dir;
      var s = this._svg('0 0 24 24', 'crt-chev');
      s.setAttribute('fill', 'none');
      s.setAttribute('stroke', 'currentColor');
      s.setAttribute('stroke-width', '2.6');
      s.setAttribute('stroke-linecap', 'round');
      s.setAttribute('stroke-linejoin', 'round');
      s.appendChild(this._path(dir === 'up' ? 'M5 15 L12 8 L19 15' : 'M5 9 L12 16 L19 9', {}));
      b.appendChild(s);
      b.setAttribute('aria-label', this.api.t(key));
      b._key = key;
      parent.appendChild(b);
      return b;
    },

    _step: function (delta, el) {
      var n1 = this.setStart(null, this.api.settings.range, delta);
      if (!n1) { this._refuse('set', el); return; }
      this._clearTimers();
      this._shut = false;
      this.st = n1;
      this._snd(GEO.SND_STEP);
      this._paint();
      this.api.announce(this._fmt(this.api.t('sayBefore'), { n: n1.n }));
    },

    _mk: function (parent, cls, iconKey, key) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'crt-btn ' + cls;
      b.appendChild(this._icon(iconKey));
      var t = document.createElement('span');
      t.className = 'crt-label';
      t.textContent = this.api.t(key);
      b.appendChild(t);
      b._key = key;
      parent.appendChild(b);
      return b;
    },

    /* ---- the acts ---------------------------------------------------- */

    _run: function () {
      var self = this, n1;
      /* ⚠⚠ THE PAINT DRAWS THIS CONTROL `is-off` WHILE THE RUN IS IN
         FLIGHT, AND WITHOUT THIS LINE IT STILL ACTED — a control that
         LOOKS refused and is not is the recorded #55 defect with its
         sign flipped, and here it let a second press SKIP THE GAP. */
      if (this._busy) { this._refuse('busy', this._btn.run); return; }
      n1 = this.advance(null);
      if (!n1) return;
      this._busy = true;

      /* ⭐⭐ THE ONE BEHAVIOUR CHANGE, AND IT COSTS ZERO MODEL LINES.
         The old build flipped `st` to `gap` at t=0, so the counters
         popped out of existence while the covering had not yet arrived.
         Now the boards begin travelling at t=0 with the counters STILL
         IN THE DOM AND STILL VISIBLE — the class is watching them be
         covered — and `st` flips only at t=T_FALL, when the boards are
         fully met and emptying the shelf produces no visual change at
         all. `advance`, `shown`, `sign`, `rail` and `lands` are
         untouched. */
      this._shut = true;
      this._paint();
      this._snd(GEO.SND_FALL);

      this._tFall = window.setTimeout(function () {
        self._tFall = null;
        self.st = n1;                        /* -> gap, marks leave the DOM */
        self._shelf.classList.add('is-settle');
        window.setTimeout(function () {
          if (self._shelf) self._shelf.classList.remove('is-settle');
        }, self._dur(GEO.T_SETTLE));

        /* the marker travels while nothing is countable */
        self._marker.classList.add('is-on');
        /* ⚠ THE FLAG THE PAINT READS — a never-written flag reads as
           ordinary falsy, which is how this shipped half-applied once. */
        self._paint();

        /* ⚠⚠ `force`. MEASURED: `_dur(T_FALL)` compresses to 106ms under
           reduced motion and `_snd` debounces at 160ms, so this call
           returned before reaching `api.sound` and THE EVIDENCE TONE WAS
           SILENTLY DROPPED — for exactly the users most likely to be
           relying on it. The lift tone at 280ms survived, which is why
           nothing looked broken. */
        self._snd(GEO.SND_STEP, true);

        /* ⚠⚠ AND THE DIRECTION IS SPOKEN HERE, ON THE LINE AFTER THE
           MARKER STARTS. The old build set an `aria-label` on a
           `role="img"` the user was not focused on, which announces
           NOTHING in JAWS, NVDA or VoiceOver — it is browse-mode content.
           So the sighted class saw the evidence and the blind child got
           it only by navigating onto that element, after everything else
           on the page. A carefully-timed announcement that is never
           spoken is worse than the leak it replaced. `announce` is the
           shell's one live region, and firing it HERE rather than in
           `_paint` keeps the two channels within one frame of each
           other — and never in the other order. */
        self.api.announce(self.api.t(self.sign(self.st) > 0 ? 'ariaCameIn' : 'ariaWentOut'));

        self._tPulse = window.setTimeout(function () {
          self._tPulse = null;
          self._marker.classList.remove('is-on');
          self.st = self.advance(null) || self.st;   /* -> after */
          /* the new count is built behind the still-closed boards, then
             the boards part. The parting IS the reveal — there is no
             per-counter entrance animation, in any phase, ever, because
             a stagger would make the reveal's duration proportional to
             `n`, and that is a real leak of the kind that ships. */
          self._paint();
          self._shut = false;
          self._paint();
          self._busy = false;
          self._snd(GEO.SND_LIFT);
        }, self._dur(GEO.T_PULSE));
      }, self._dur(GEO.T_FALL));
    },

    _try: function (k, el) {
      var n1 = this.tryK(null, k);
      if (!n1) { this._refuse('try', el); return; }
      this.st = n1;
      this._snd(GEO.SND_STEP);
      this._paint();
      this.api.announce(this._fmt(this.api.t('ariaTry'), {
        k: Math.abs(k), n: this.st.n, r: this.lands(this.st), m: this.st.m
      }));
    },

    _clear: function () {
      var n1 = this.clearTry(null);
      if (!n1) { this._refuse('clear'); return; }
      this.st = n1;
      this._snd(GEO.SND_STEP);
      this._paint();
    },

    /* ⭐⭐ IT RE-DEALS THE CHANGE AND KEEPS THE START, AND THAT IS THE
       WHOLE DIVISION OF LABOUR: the grips set the start, this re-deals
       what happens to it. A native panel caught the alternative as a
       defect — a plain re-deal silently discards the number the teacher
       just set, with a label that does not warn them, one press after
       they set it.
       ⭐ It is also the one classroom routine the tool has advertised in
       eleven locales and could never perform: `classroomIdeas[2]` says
       "use the same starting count twice — once with something coming
       in, once with something going out", which was impossible while
       every press re-rolled the start as well. */
    _again: function () {
      if (this._busy) { this._refuse('busy', this._btn.again); return; }
      this._clearTimers();
      this._shut = false;
      var cap = this.cap(this.api.settings.range);
      var pool = this.scenesStartingAt(cap, this.st.n);
      /* ⚠ prefer a change the class has not just watched, so a second
         press is never a no-op; fall back to the whole pool, and to a
         fresh deal only if this start has somehow no scenes at all. */
      var k0 = this.st.k;
      var fresh = pool.filter(function (x) { return x.k !== k0; });
      var use = fresh.length ? fresh : pool;
      if (!use.length) {
        this.st = this.newState(this.api.settings.range);
      } else {
        var pick = use[Math.floor(Math.random() * use.length)];
        this.st = { n: pick.n, k: pick.k, m: pick.m, phase: 'before', tried: null };
      }
      this._paint();
      this.api.announce(this.api.t('saidDealt'));
    },

    _refuse: function (why, el) {
      var self = this;
      var MSG = { busy: 'saidMidRun', clear: 'saidNoTry', print: 'saidLocked', 'try': 'saidTryOff', set: 'saidSetEnd' };
      var msg = MSG[why];
      var t = el || this._btn[why] || null;
      this._snd(GEO.SND_REFUSE, true);
      if (t) {
        t.classList.add('is-refuse');
        window.setTimeout(function () { t.classList.remove('is-refuse'); }, self._dur(GEO.T_REFUSE));
      }
      if (msg) this.api.announce(this.api.t(msg));
    },

    /* ⭐⭐ GROUPS OF FIVE, LEFT-ALIGNED FROM A FIXED START, ALWAYS ONE
       ROW. The old build was a uniform wrapping flex row of up to
       sixteen identical dots, which actively fought the routine's own
       first step — "count the ground". Left-aligned rather than centred
       so the row's left edge never moves and 7 -> 12 reads as a
       LENGTHENING as well as a re-count; centring would slide both ends
       and destroy that reading.
       ⚠ Grouping is by POSITION only. Every counter stays byte-identical
       to its siblings, because any distinguishing feature would let a
       child count the different-looking ones and hand the answer over. */
    _fill: function (host, n) {
      host.innerHTML = '';
      if (!n) return;
      var i, grp = null;
      for (i = 0; i < n; i++) {
        if (i % 5 === 0) {
          grp = document.createElement('span');
          grp.className = 'crt-grp';
          host.appendChild(grp);
        }
        var m = document.createElement('span');
        m.className = 'crt-mark';
        m.setAttribute('aria-hidden', 'true');
        grp.appendChild(m);
      }
    },

    /* three fixed slots so nothing jumps when 9 becomes 16. An empty
       slot is not blank — it draws a dotted baseline, so the
       composition never collapses and the empty slot INVITES the
       number. No words. */
    /* ⚠⚠ AND THE SLOT CARRIES A SENTENCE, NOT A BARE NUMERAL. Deleting
       `.crt-say` orphaned `sayBefore`, `sayAfter` and `sayLands` — three
       strings authored in eleven locales that nothing called any more,
       which is the dead-string class this house keeps shipping. They do
       the work they were always best at here: a screen-reader user hears
       "Before the gap: 7" instead of the digit 7 with no idea which of
       three numerals it is. That is also the sighted readout's own
       problem answered on the one channel that can carry words at all —
       the apparatus itself stays wordless. */
    _slot: function (val, kind, labelKey) {
      var e = document.createElement('span');
      if (val === null) {
        e.className = 'crt-num crt-num-empty';
        e.setAttribute('aria-hidden', 'true');
        return e;
      }
      e.className = 'crt-num' + (kind ? ' ' + kind : '');
      e.textContent = String(val);
      if (labelKey) {
        e.setAttribute('role', 'img');
        e.setAttribute('aria-label', this._fmt(this.api.t(labelKey),
          { n: val, m: val, r: val }));
      }
      return e;
    },

    _paint: function () {
      var s = this.st, api = this.api, t = api.t.bind(api), self = this;

      /* ⭐⭐ NOT BUILT during the gap — `shown()` returns 0 and this loop
         creates nothing. There is no hidden node to inspect, so the
         non-leak is a fact about the DOM rather than about a colour. */
      this._fill(this._marks, this.shown(s));

      /* the boards are shut while a run is in flight OR while the model
         is in the gap; the two agree everywhere except the 380ms of
         travel, which is the whole point of separating them. */
      this._stage.classList.toggle('is-shut', !!this._shut || s.phase === 'gap');
      this._marker.classList.toggle('is-out', this.sign(s) < 0);

      /* the readout: before · after · your theory. `n` persists through
         the gap because the class watched it — it is a witnessed fact
         and removing it would be dishonest. Nothing about `m` exists
         before it is seen. */
      /* ⚠ the CELLS persist; only the numeral inside each is replaced, so
         the grips keep their identity and their focus across every
         paint. */
      var vals = [
        [s.n, null, 'sayBefore'],
        [s.phase === 'after' ? s.m : null, null, 'sayAfter'],
        [(s.phase === 'after' && s.tried !== null) ? this.lands(s) : null, 'is-try', 'sayLands']
      ];
      this._cell.forEach(function (cell, i) {
        var old = cell.querySelector('.crt-num');
        if (old) cell.removeChild(old);
        cell.insertBefore(self._slot(vals[i][0], vals[i][1], vals[i][2]), cell.firstChild);
      });

      /* ⭐ the teacher's grips are live only where the move is: in phase
         `before`, and only while there is a further start to step to. */
      var up = this.setStart(null, api.settings.range, 1);
      var dn = this.setStart(null, api.settings.range, -1);
      this._set.classList.toggle('is-on', s.phase === 'before' && !this._busy);
      this._grip.up.classList.toggle('is-off', !up);
      this._grip.up.setAttribute('aria-disabled', String(!up));
      this._grip.down.classList.toggle('is-off', !dn);
      this._grip.down.setAttribute('aria-disabled', String(!dn));

      /* the rail of magnitudes — only once there is a question */
      this._rail.innerHTML = '';
      this._rail.classList.toggle('is-on', s.phase === 'after');
      this._rail.setAttribute('role', 'group');
      this._rail.setAttribute('aria-label', t('test'));
      if (s.phase === 'after') {
        this.rail(s, api.settings.range).forEach(function (k) {
          var b = document.createElement('button');
          b.type = 'button';
          b.className = 'crt-k' + (s.tried === k ? ' is-on' : '');
          b.textContent = String(Math.abs(k));
          /* ⚠⚠ THIS WAS `t('test') + ' ' + Math.abs(k)` — the exact
             label-plus-number concatenation this file bans 970 lines
             above, and all ten native panels found it independently. In
             Finnish `kokeilla` governs the partitive, so the phrase
             needs *viittä* where a digit can only supply *viisi*. The
             whole phrase now names the RAIL once, as a group, and each
             key's accessible name is the bare numeral — which is
             grammatically inert in every one of the eleven. */
          b.setAttribute('aria-label', String(Math.abs(k)));
          b.addEventListener('click', function () { self._try(k, b); });
          self._rail.appendChild(b);
        });
      }

      /* ⚠⚠ GATE THE PAINT ON THE MOVE, NOT ON A FLAG — #55's controls
         looked live while the model refused them. */
      var runDead = !this.advance(null);
      this._btn.run.classList.toggle('is-off', runDead || !!this._busy);
      this._btn.run.disabled = runDead;
      this._btn.clear.classList.toggle('is-off', !this.clearTry(null));
      this._btn.again.classList.toggle('is-off', !!this._busy);
      /* the lock lives on the ONE control it governs, not across the
         page. It stays clickable, because the whole point of the
         paywall refusal is that it gets to say why. */
      this._btn.print.classList.toggle('is-locked', !this.premium);
      this._btn.print.setAttribute('aria-disabled', String(!this.premium));

      var key, v = { n: s.n, m: s.m, k: Math.abs(s.tried || 0), r: this.lands(s) };
      if (s.phase === 'before') key = 'ariaStart';
      else if (s.phase === 'gap') key = 'ariaGap';
      else if (s.tried !== null) key = 'ariaTry';
      else key = 'ariaEnd';
      this._stage.setAttribute('role', 'group');
      this._stage.setAttribute('aria-label', this._fmt(t(key), v));
    },

    /* ================= ENTITLEMENT + PRINT ========================== */

    _checkEntitlement: function () {
      var self = this;
      this.premium = false;
      try {
        if (typeof fetch !== 'function') return;
        fetch('/api/entitlement', { credentials: 'include' })
          .then(function (r) { return r.ok ? r.json() : null; })
          .then(function (j) {
            if (!j) return;
            var tier = j.tier || (j.entitlement && j.entitlement.tier);
            if (!tier) return;
            self.premium = tier !== 'free';
            self._gate();
            if (self._btn) self._paint();
          })['catch'](function () { /* degrades to the FREE TIER, never to nothing */ });
      } catch (e) { this.premium = false; }
    },

    /* ⭐⭐ A FOOTNOTE, NOT A CARD. The old panel was a permanently open
       55-word block that took roughly a quarter of the page — and forty
       per cent of the catalogue thumbnail, which is this tool's shop
       window — on an instrument that is free apart from one sheet. The
       lock belongs on the control it governs. Pressing a locked Print
       expands this; nothing else does. */
    _gate: function () {
      if (!this._gateHost) return;
      var t = this.api.t.bind(this.api), self = this;
      this._gateHost.innerHTML = '';
      this._gateHost.classList.remove('is-open');
      if (this.premium) { this._gateHost.classList.remove('is-on'); return; }
      this._gateHost.classList.add('is-on');

      /* the collapsed footnote is the SHORT sentence; the fuller one
         appears only when a locked Print is pressed. Both keys stay
         alive and each says the thing its length suits. */
      var h = document.createElement('p');
      h.className = 'crt-gate-h';
      h.textContent = t('lockedTitle');

      var b = document.createElement('p');
      b.className = 'crt-gate-b';
      b.textContent = t('lockedBody');

      var a = document.createElement('a');
      a.className = 'crt-gate-cta';
      /* ⚠ THE LINK USED TO NAVIGATE THE IFRAME AND DROP THE LOCALE — a
         bare `/pricing` with no target replaced the instrument with a
         pricing page inside a 704px frame. */
      a.href = '/' + this.api.lang + '/pricing?from=tool-the-gap';
      a.target = '_top';
      a.rel = 'noopener';
      a.textContent = t('gateCta');

      var c = document.createElement('button');
      c.type = 'button';
      c.className = 'crt-gate-x';
      c.textContent = t('gateClose');
      c.addEventListener('click', function () {
        self._gateHost.classList.remove('is-open');
        self._gateDismissed = true;
      });

      this._gateHost.appendChild(h);
      this._gateHost.appendChild(b);
      this._gateHost.appendChild(a);
      this._gateHost.appendChild(c);
    },

    _bindPrint: function () {
      var self = this;
      if (typeof window.addEventListener !== 'function') return;
      /* ⚠⚠ Ctrl+P IS A PRINT PATH TOO — gating the CHIP is not gating the
         FEATURE. */
      window.addEventListener('beforeprint', function () {
        if (!self.premium) { if (self._sheet) self._sheet.innerHTML = ''; return; }
        self._buildSheet();
        document.body.classList.add('crt-printing');
      });
      window.addEventListener('afterprint', function () {
        document.body.classList.remove('crt-printing');
      });
    },

    _print: function () {
      if (!this.premium) {
        this._refuse('print', this._btn.print);
        if (this._gateHost) this._gateHost.classList.add('is-open');
        return;
      }
      this._buildSheet();
      document.body.classList.add('crt-printing');
      window.print();
    },

    _buildSheet: function () {
      if (!this._sheet) return;
      var t = this.api.t.bind(this.api), s = this.st, i;
      this._sheet.innerHTML = '';
      var h = document.createElement('h2');
      h.className = 'crt-sh-h';
      h.textContent = t('sheetTitle');
      this._sheet.appendChild(h);

      var frame = document.createElement('div');
      frame.className = 'crt-sh-frame';
      /* ⚠⚠ THE PAID SHEET PRINTED THE ANSWER. `m` is BUILT ONLY IN PHASE
         `after` — the other phases get the before-band and the ruled
         lines, which is exactly what a teacher setting up wants and
         carries no answer. */
      var bands = (s.phase === 'after') ? [s.n, s.m] : [s.n];
      bands.forEach(function (cnt) {
        var band = document.createElement('div');
        band.className = 'crt-sh-band';
        for (i = 0; i < cnt; i++) {
          var d = document.createElement('span');
          d.className = 'crt-sh-dot';
          band.appendChild(d);
        }
        var line = document.createElement('div');
        line.className = 'crt-sh-ground';
        frame.appendChild(band);
        frame.appendChild(line);
      });
      this._sheet.appendChild(frame);

      var hint = document.createElement('p');
      hint.className = 'crt-sh-hint';
      hint.textContent = t('sheetHint');
      this._sheet.appendChild(hint);

      /* ⚠⚠ RULED LINES, NOT A CAPTURED RECORD. `class-graph.js:62` is the
         platform ruling: a class's answers are a moment, not a record. */
      var lines = document.createElement('div');
      lines.className = 'crt-sh-lines';
      for (i = 0; i < 6; i++) {
        var l = document.createElement('div');
        l.className = 'crt-sh-line';
        lines.appendChild(l);
      }
      this._sheet.appendChild(lines);
    },

    /* ================= CSS ========================================== */

    injectCSS: function () {
      if (document.getElementById('crt-css')) return;
      var st = document.createElement('style');
      st.id = 'crt-css';
      /* ⚠⚠ NO DURATION IS WRITTEN HERE. Every one is a custom property
         set by `_writeDurations()` from the named GEO constant, so the
         drawn duration and the named one are structurally one number and
         reduced motion can never desynchronise them. The old build baked
         `_dur(T_PULSE)` into this cached string at first paint. */
      st.textContent = [
        /* ⚠⚠ TWO SEPARATE RULES. `html.x,body.x{}` is a selector LIST
           whose html half applies unconditionally, which makes the class
           decorative and its mutation unkillable. And the COMPLETE house
           form needs height:auto + min-height:100%. */
        'html.crt-scroll{overflow-y:auto;height:auto;min-height:100%}',
        'body.crt-scroll{overflow-y:auto;overflow-x:hidden;height:auto;min-height:100%}',

        /* ---- shell -------------------------------------------------- */
        /* ⚠ 880px, not 660. The old cap was the narrow standard and is
           why the stage read as a letterbox: `lcs-shell.css` widens the
           card to 1240px at >=1367px and 1800px at >=1800px, and a
           660px column inside an 1800px card is what a classroom
           projector was actually showing. */
        '.crt-wrap{container-type:inline-size;--num:clamp(30px,calc(var(--u,30px) * 1.25),76px);' +
          'display:flex;flex-direction:column;align-items:center;gap:14px;width:100%;' +
          'max-width:880px;margin:0 auto;padding:8px 10px 14px;box-sizing:border-box}',

        /* ---- the stage: a room, not a page -------------------------- */
        /* ⚠ `--u` IS A FUNCTION OF CONTAINER WIDTH AND CAP ONLY. It may
           NEVER read n, m or k: counters that changed size across the
           gap would broadcast both the direction and the magnitude of
           the change. This is the single most dangerous line here. */
        /* ⚠⚠ THE `--rowu` FALLBACK LIVES ON THE WRAP, NOT ON THE STAGE,
           AND THAT IS NOT A TIDINESS CHOICE. `_writeVars()` writes the
           real value onto `.crt-wrap`; a custom property declared on the
           STAGE would be set on the element itself and therefore beat
           the value inherited from its own parent, so the JS number
           could never apply. Measured with it on the stage: `--rowu`
           read 13.02 at every viewport even at "up to sixteen", and the
           widest row overflowed the frame by 88-271px everywhere. The
           declaration has to sit on the same element the script writes,
           or the default silently shadows the authority. */
        '.crt-stage{--u:clamp(12px,3.7vw,44px);' +
          '--u:clamp(12px,calc(87.4cqw / var(--rowu,13.02)),44px);' +
          '--shelf:max(11px,calc(var(--u) * 0.34));--g1:calc(var(--u) * 0.20);' +
          '--g2:calc(var(--u) * 0.62);--inset:calc(var(--u) * 0.8);' +
          'position:relative;overflow:hidden;width:100%;box-sizing:border-box;' +
          'border:1px solid #E7DCC8;border-radius:16px;padding:calc(var(--u) * 0.5) 0 0;' +
          'background:linear-gradient(180deg,#F1E4CB 0%,#F8EEDA 62%,#F6EAD3 100%);' +
          'box-shadow:inset 0 1px 0 rgba(255,255,255,.80),0 1px 2px rgba(30,20,10,.06)}',

        /* the band the counters stand in */
        '.crt-band{position:relative;z-index:1;display:flex;align-items:flex-end;' +
          'padding-left:var(--inset);gap:var(--g2);min-height:calc(var(--u) * 2.6);' +
          'margin-bottom:-1px}',
        '.crt-grp{display:flex;align-items:flex-end;gap:var(--g1)}',

        /* ---- the counter: the element IS the edge, ::before is the fill */
        '.crt-mark{position:relative;display:block;flex:0 0 auto;padding:0;' +
          'width:var(--u);height:var(--u);border-radius:50%;' +
          '--lit:#2E7266;--fill:#146B5E;--shade:#0E5147;--edge:#0A3F37;' +
          '--bw:2px;--hl:.36;--lift:0 2px 3px rgba(30,20,10,.22);' +
          'background:var(--edge);filter:drop-shadow(var(--lift))}',
        '.crt-mark::before{content:"";position:absolute;inset:var(--bw);border-radius:50%;' +
          'background:radial-gradient(120% 100% at 50% 12%,rgba(255,255,255,var(--hl)) 0%,rgba(255,255,255,0) 46%),' +
          'linear-gradient(180deg,var(--lit) 0%,var(--fill) 58%,var(--shade) 100%);' +
          'box-shadow:inset 0 1px 0 rgba(255,255,255,.34),inset 0 -2px 0 rgba(0,0,0,.13)}',

        /* ---- the shelf, and the track the marker runs in ------------- */
        '.crt-shelf{position:relative;z-index:2;height:var(--shelf);width:100%;' +
          'background:linear-gradient(180deg,#2E7266 0 2px,#146B5E 2px 62%,#0E5147 62% 100%);' +
          'border-bottom:1.5px solid #0A3F37;box-shadow:0 4px 8px -3px rgba(30,20,10,.30)}',
        /* the track exists in EVERY phase, empty — so the marker reads as
           "something moved along the track", never "a bar appeared" */
        '.crt-shelf::before{content:"";position:absolute;left:0;right:0;' +
          'top:calc(var(--shelf) * 0.30);height:calc(var(--shelf) * 0.52);background:#0A3F37;' +
          'box-shadow:inset 0 1px 2px rgba(0,0,0,.55),inset 0 -1px 0 rgba(255,255,255,.10)}',
        '.crt-shelf.is-settle{animation:crt-settle var(--t-settle,110ms) ease-out 1}',
        '@keyframes crt-settle{0%{transform:translateY(0)}45%{transform:translateY(1px)}100%{transform:translateY(0)}}',

        /* ---- the five-ticks: at the group boundaries, a function of
           `cap` and never of the count. They rise out of the shelf's top
           face into the band, so a row of 12 reads as "two ticks and two
           more" without a word. */
        '.crt-tick{position:absolute;bottom:calc(var(--shelf) * 0.40);width:2px;' +
          'height:calc(var(--shelf) * 1.35);background:rgba(10,63,55,.55);' +
          'pointer-events:none;z-index:2}',

        '.crt-floor{position:relative;z-index:3;height:calc(var(--u) * 0.70);background:#EFE0C4;' +
          'box-shadow:inset 0 3px 6px -3px rgba(30,20,10,.28)}',

        /* ---- THE BOARDS --------------------------------------------- */
        /* they overlap 4% at the seam, so no sub-pixel rounding can ever
           open a crack down the middle */
        '.crt-board{position:absolute;z-index:4;top:0;width:52%;' +
          'height:calc(var(--u) * 3.1 + 2px);' +
          'background:linear-gradient(90deg,rgba(255,255,255,.22) 0 1.5px,rgba(255,255,255,0) 1.5px),' +
          'repeating-linear-gradient(90deg,rgba(0,0,0,.16) 0 1px,rgba(255,255,255,.10) 1px 2px,' +
          'rgba(0,0,0,0) 2px calc(var(--u) * 1.6)),' +
          'linear-gradient(180deg,#8C7B63 0%,#7A6A55 42%,#6A5B48 100%);' +
          'box-shadow:inset 0 2px 0 rgba(255,255,255,.28),inset 0 -3px 0 rgba(0,0,0,.22),' +
          '0 5px 12px -3px rgba(30,20,10,.45)}',
        '.crt-board-l{left:0;border-right:3px solid #5A4C3C;border-radius:0 4px 4px 0;' +
          'transform:translateX(-102%);transition:transform var(--t-lift,380ms) cubic-bezier(.4,0,.2,1)}',
        '.crt-board-r{right:0;border-left:3px solid #5A4C3C;border-radius:4px 0 0 4px;' +
          'transform:translateX(102%);transition:transform var(--t-lift,380ms) cubic-bezier(.4,0,.2,1)}',
        /* closing decelerates into the meeting — a board that is pushed
           shut arrives and stops; opening starts under control */
        '.crt-stage.is-shut .crt-board-l,.crt-stage.is-shut .crt-board-r{transform:translateX(0);' +
          'transition:transform var(--t-fall,380ms) cubic-bezier(.22,.68,.24,1)}',

        /* ---- THE MARKER: crosses in FRONT of the closed boards -------- */
        /* ⚠ THE MARKER RIDES IN THE SHELF, NOT ABOVE IT. Anchoring it to
           the track's own bottom edge (`0.70u + 0.18 * shelf`) floated it
           clear of the plinth, because the track is only `0.18u` deep
           while the marker is `1.15u` tall — a ratio the spec's "lower
           44% sits inside the track" cannot survive. Sitting it on the
           floor line puts roughly a third of its body over the shelf, so
           it reads as travelling ALONG the plinth rather than hovering
           over it, which is the whole reason the track is cut. */
        '.crt-marker{position:absolute;z-index:5;pointer-events:none;' +
          'bottom:calc(var(--u) * 0.70);' +
          'width:calc(var(--u) * 3.2);height:calc(var(--u) * 1.15);left:-24%;opacity:0;' +
          'filter:drop-shadow(0 2px 3px rgba(30,20,10,.38))}',
        '.crt-marker.is-on{opacity:1;animation:crt-in var(--t-pulse,620ms) linear 1}',
        '.crt-marker.is-out{transform:scaleX(-1)}',
        '.crt-marker.is-out.is-on{animation:crt-out var(--t-pulse,620ms) linear 1}',
        '@keyframes crt-in{from{left:-24%}to{left:104%}}',
        '@keyframes crt-out{from{left:104%}to{left:-24%}}',

        /* ---- the readout: three fixed slots -------------------------- */
        '.crt-read{display:grid;grid-template-columns:1fr 1fr 1fr;align-items:end;' +
          'justify-items:center;gap:clamp(10px,2.4vw,28px);width:100%;' +
          'min-height:calc(var(--num) * 1.5)}',
        /* ⚠ `flex-end`, NOT `center`. The three numerals must sit on ONE
           baseline — they differ in KIND and in nothing else, and a
           numeral riding higher than its neighbours reads as a different
           KIND of thing. Cell 1 is taller than the other two because it
           carries the grip stack (which keeps its space even when
           hidden, so nothing moves when it goes live), and centring the
           numeral inside that taller box lifted the witnessed start ~25px
           above the other two. Measured in the German render. */
        '.crt-cell{display:flex;align-items:flex-end;gap:8px}',
        /* ⭐ the teacher's grips are visually SUBORDINATE to the numeral
           they set — a teacher sets the start once and the class looks
           at the material, not at the controls. They reserve their space
           at all times so nothing on the row moves when they go live. */
        '.crt-set{display:flex;flex-direction:column;gap:4px;visibility:hidden}',
        '.crt-set.is-on{visibility:visible}',
        '.crt-grip{display:flex;align-items:center;justify-content:center;' +
          'width:44px;height:44px;padding:0;border-radius:9px;cursor:pointer;' +
          'border:1.5px solid #7A6A55;background:#FBF3E4;color:#146B5E;' +
          'box-shadow:0 1px 0 rgba(255,255,255,.9) inset,0 1px 2px rgba(30,20,10,.10)}',
        '.crt-grip.is-off{opacity:.42;box-shadow:none;cursor:default}',
        '.crt-grip.is-refuse{animation:crt-shake var(--t-refuse,200ms) ease-in-out 1;' +
          'box-shadow:0 0 0 3px rgba(122,106,85,.45)}',
        '.crt-grip:focus-visible{outline:3px solid #0D4E44;outline-offset:3px}',
        '.crt-chev{width:20px;height:20px}',
        '.crt-num{font-family:"Baloo 2",Nunito,system-ui,sans-serif;font-weight:700;' +
          'font-size:var(--num);line-height:1;color:#0E5147;font-variant-numeric:tabular-nums;' +
          'min-width:2ch;text-align:center}',
        /* ⚠ SOLID INK vs HOLLOW INK. Kind, never hue: both are #0E5147,
           both the same size, both on one baseline. A coral/teal pair
           would be a verdict delivered by the palette. */
        '.crt-num.is-try{color:#0E5147;color:transparent;-webkit-text-stroke:2.5px #0E5147;' +
          'background:#FBF3E4;border:2px dashed #7A6A55;border-radius:10px;padding:2px 10px;' +
          'animation:crt-ink var(--t-ink,160ms) cubic-bezier(.2,.8,.2,1) 1}',
        '@keyframes crt-ink{from{opacity:0;transform:scale(.92)}to{opacity:1;transform:scale(1)}}',
        /* an empty slot is not blank — it invites the number */
        '.crt-num-empty{display:inline-block;width:1.4ch;height:0;' +
          'border-bottom:2px dotted #7A6A55;margin-bottom:calc(var(--num) * 0.12)}',

        /* ---- the rail ------------------------------------------------ */
        '.crt-rail{display:none;flex-wrap:wrap;justify-content:center;gap:8px;width:100%}',
        '.crt-rail.is-on{display:flex}',
        '.crt-k{min-width:52px;min-height:52px;border-radius:12px;border:1.5px solid #7A6A55;' +
          'background:#FBF3E4;color:#0E5147;font-family:"Baloo 2",system-ui,sans-serif;' +
          'font-weight:700;font-size:20px;cursor:pointer;' +
          'box-shadow:0 1px 0 rgba(255,255,255,.9) inset,0 1px 2px rgba(30,20,10,.10)}',
        /* a SELECTION, not a verdict — it differs in depth as well as fill */
        '.crt-k.is-on{background:#146B5E;color:#FBF3E4;' +
          'box-shadow:inset 0 2px 0 rgba(255,255,255,.22),inset 0 -2px 0 rgba(0,0,0,.18)}',
        '.crt-k.is-refuse{animation:crt-shake var(--t-refuse,200ms) ease-in-out 1}',

        /* ---- chrome -------------------------------------------------- */
        '.crt-row{display:flex;flex-wrap:wrap;justify-content:center;align-items:center;' +
          'gap:10px;width:100%}',
        '.crt-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;' +
          'position:relative;min-height:48px;min-width:48px;padding:0 14px;border-radius:12px;' +
          'font-family:Nunito,system-ui,sans-serif;font-size:15px;cursor:pointer;' +
          'background:#FBF3E4;color:#2A2A35;border:1.5px solid #7A6A55;' +
          'box-shadow:0 1px 0 rgba(255,255,255,.9) inset,0 1px 2px rgba(30,20,10,.10);' +
          'transition:transform var(--t-hover,120ms) ease-out}',
        '.crt-btn:hover:not(.is-off):not(:disabled){transform:translateY(-1px)}',
        '.crt-btn.is-primary{background:#146B5E;color:#FBF3E4;border:1px solid #0E5147;' +
          'box-shadow:0 2px 0 #0E5147,0 3px 6px rgba(30,20,10,.18)}',
        '.crt-btn.is-primary:active{transform:translateY(2px);box-shadow:0 0 0 #0E5147}',
        '.crt-icon{width:22px;height:22px;flex:0 0 auto}',
        /* ⚠ disabled loses its SHADOW — it stops looking pressable, which
           is a difference in KIND and not only in value */
        '.crt-btn.is-off,.crt-btn:disabled{opacity:.42;box-shadow:none;cursor:default;transform:none}',
        /* ⚠ a BROWN ring, never coral: coral is the evidence, and a
           refusal is "not now", not "wrong" */
        '.crt-btn.is-refuse{animation:crt-shake var(--t-refuse,200ms) ease-in-out 1;' +
          'box-shadow:0 0 0 3px rgba(122,106,85,.45)}',
        '@keyframes crt-shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-4px)}' +
          '75%{transform:translateX(4px)}}',
        '.crt-k:focus-visible,.crt-btn:focus-visible{outline:3px solid #0D4E44;outline-offset:3px}',
        '.crt-label{white-space:nowrap}',
        /* the lock lives on the one control it governs */
        '.crt-btn.is-locked::after{content:"";position:absolute;top:5px;right:6px;width:9px;height:11px;' +
          'border-radius:2px;background:#7A6A55;box-shadow:0 -4px 0 -1.5px transparent,' +
          'inset 0 0 0 10px #7A6A55}',
        '.crt-btn.is-locked::before{content:"";position:absolute;top:2px;right:8.5px;width:5px;height:5px;' +
          'border:1.5px solid #7A6A55;border-bottom:0;border-radius:3px 3px 0 0}',

        /* ---- the paywall: a footnote, not a card --------------------- */
        '.crt-gate{display:none;width:100%;text-align:center}',
        '.crt-gate.is-on{display:block}',
        '.crt-gate-h{margin:0 0 4px;font-family:Nunito,system-ui,sans-serif;font-size:13px;color:#7A6A55}',
        '.crt-gate-b{margin:0 0 6px;font-family:Nunito,system-ui,sans-serif;font-size:13px;' +
          'color:#7A6A55;line-height:1.45;max-height:0;overflow:hidden;opacity:0;' +
          'transition:max-height 240ms cubic-bezier(.2,.8,.2,1),opacity 240ms ease-out}',
        '.crt-gate.is-open .crt-gate-b{max-height:8em;opacity:1}',
        '.crt-gate-cta{display:inline-block;font-family:Nunito,system-ui,sans-serif;font-size:13px;' +
          'color:#146B5E;text-decoration:underline;padding:6px 4px}',
        '.crt-gate.is-open .crt-gate-cta{display:inline-flex;align-items:center;min-height:44px;' +
          'padding:0 16px;border-radius:11px;background:#146B5E;color:#FBF3E4;text-decoration:none;' +
          'font-size:15px}',
        '.crt-gate-x{display:none;min-height:44px;margin-left:8px;padding:0 12px;border:0;' +
          'background:none;color:#7A6A55;font-family:Nunito,system-ui,sans-serif;font-size:14px;' +
          'cursor:pointer;text-decoration:underline}',
        '.crt-gate.is-open .crt-gate-x{display:inline-block}',
        '.crt-gate-cta:focus-visible,.crt-gate-x:focus-visible{outline:3px solid #0D4E44;outline-offset:2px}',

        /* ---- reflow -------------------------------------------------- */
        '@media (max-width:400px){.crt-mark{--bw:1px;--hl:0;--lift:0 1px 1px rgba(30,20,10,.18)}}',
        '@media (max-width:340px){.crt-wrap{padding-left:0;padding-right:0}' +
          '.crt-stage{--g1:calc(var(--u) * 0.22);--g2:calc(var(--u) * 0.22);--inset:0}}',
        '@media (min-width:560px){.crt-b-print{margin-inline-start:auto}}',
        /* ⚠ the wide tier the tool never had. It shipped with exactly two
           @media occurrences and both were @media print. */
        '@media (min-width:1367px){.crt-wrap{max-width:1180px}' +
          '.crt-stage{--u:clamp(12px,calc(87.4cqw / var(--rowu,13.02)),64px)}' +
          '.crt-mark{--bw:2.5px;--hl:.42;--lift:0 3px 5px rgba(30,20,10,.24)}' +
          '.crt-btn{min-height:52px}.crt-icon{width:24px;height:24px}}',

        /* ---- the sheet ----------------------------------------------- */
        '.crt-sheet{display:none}',
        /* ⚠⚠ SCOPED to a class the print flow itself adds. The old block
           was UNSCOPED, so a free visitor pressing Ctrl+P got `.crt-wrap`
           hidden and an empty sheet — A BLANK PAGE. The file's own
           comment conceded this and deferred it. And it hid
           `.lcs-header,.lcs-controls` only, so `.lcs-app`'s card surface,
           radius and shadow still printed around the sheet. */
        '@media print{body.crt-printing .lcs-header,body.crt-printing .lcs-controls,' +
          'body.crt-printing .crt-wrap{display:none !important}',
        'body.crt-printing .lcs-app,body.crt-printing .lcs-stage{background:none !important;' +
          'box-shadow:none !important;border:0 !important;padding:0 !important;margin:0 !important;' +
          'max-width:none !important}',
        'body.crt-printing .crt-sheet{display:block !important;padding:0}',
        '.crt-sh-h{font-family:"Baloo 2",system-ui,sans-serif;font-size:19pt;color:#000;margin:0 0 10pt}',
        '.crt-sh-frame{border:1pt solid #000;border-radius:6pt;padding:10pt;margin:0 0 10pt}',
        '.crt-sh-band{display:flex;flex-wrap:wrap;gap:4pt;min-height:24pt;align-items:flex-end}',
        '.crt-sh-ground{height:2pt;background:#000;margin:4pt 0 12pt}',
        /* the screen fills, the paper outlines */
        '.crt-sh-dot{width:11pt;height:11pt;border-radius:50%;border:1pt solid #000;display:block}',
        '.crt-sh-hint{font-family:Nunito,system-ui,sans-serif;font-size:10pt;margin:0 0 8pt}',
        '.crt-sh-line{border-bottom:0.75pt solid #000;height:26pt}',
        '@page{margin:15mm}}'
      ].join('');
      document.head.appendChild(st);
    }
  };

  if (typeof window !== 'undefined') window.TheGap = TheGap;
  if (typeof module !== 'undefined' && module.exports) module.exports = TheGap;
})();
