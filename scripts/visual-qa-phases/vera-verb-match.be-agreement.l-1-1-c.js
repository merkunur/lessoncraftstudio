/* =====================================================================
   visual-qa phase driver — vera-verb-match / be-agreement (L.1.1.c)
   sv = «Tuvas ordäng» · Lgr22 åk 2 · Språkliga strukturer och normer

   ⚠⚠ SEVEN DECKS HAVE SHIPPED AND NO SWEEP HAS EVER SEEN A CARD TAPPED. Without a
   driver the harness photographs only the OPENING frame, so the 24 renders tracked
   on disk are 8 rounds × 3 widths × ONE phase — and they are BARE-NAMED, which by
   the harness's own convention means English. This run restores a true English
   baseline at those names and writes all eight locales suffixed.

   Four screens, of which only the first had ever been photographed:

     open      — the vole, the speech bubble carrying the RULE, the sentence with
                 its blank, and three cards.
     picked    — one card SELECTED (`.vvm-sel`), the word now standing IN the blank
                 (`.vvm-blank.vvm-filled`), the shell's Check enabled.
                 ⭐ Nothing is graded yet: answerType:'state', so correctness exists
                 only after Check. The frame therefore has to show a selection that
                 reveals NOTHING about whether it is right — and, because the chosen
                 word is written into the sentence, it must also stay READABLE there,
                 which is the one thing this activity can get wrong that its siblings
                 cannot.
     missed    — tap → Check → WRONG. ⭐ THE STATE A CHILD HITS MOST OFTEN, and the
                 one the sweep could not see. This deck deliberately marks no card:
                 the feedback is the prompt turning to try-again plus the hint line,
                 and the wrong word sitting visibly in the blank. That is exactly
                 what this phase exists to photograph — and to prove is legible at
                 every width, which is the harder claim.
     resolved  — Check on the CORRECT card: the prompt celebrates, Next replaces
                 Check, and the layout changes at every width.

   ⚠⚠ THE CORRECT CARD IS FOUND FROM THE ROUND'S OWN CARDS, NEVER FROM
   `BeAgreementCore.oracle`. The core hard-codes FORMS = ['am','is','are'], so
   oracle() returns -1 for EVERY non-English pool — a driver built on it would tap
   `.vvm-opt[data-id="-1"]`, find nothing, and then photograph an untouched board
   while reporting success. That is the whole point of a multi-locale sweep, so
   getting it wrong here would have hollowed out the run in the seven locales that
   matter most.

   ⚠ CARDS ARE REACHED BY MODEL INDEX, NEVER BY TEXT. setupTask() shuffles them and
   `data-id` carries the model index, so matching a word would drive the wrong
   element the moment the locale changes — and in sv the words change EVERY ROUND
   (the sv deck is a rebuild: predicative adjective agreement, one triple per round).

   ⚠⚠ A FREEZE IS REQUIRED, AND MEASURING ONLY THIS ACTIVITY'S TIMERS WOULD MISS IT.
   `lcs-shell.js:885` clears `.tryagain` and blanks the hint span after 1800 ms. The
   harness drives a phase ONCE and then sweeps six viewports at ~260 ms each, so the
   later (wider) viewports photograph a state that has already auto-dismissed — at
   1024 the miss frame would show a plain heading and no message while 360 showed
   both, and a visual critic would correctly report "the wrong-answer feedback does
   not appear at desktop" about a defect living in THIS FILE. The sibling
   olive-kind-of driver shipped that exact bug first. Freeze the one 1800 ms timer.
   ===================================================================== */
'use strict';

const G = 'VeraVerbMatchActivity';

/* Hold the shell's auto-dismiss so a driven state survives the viewport sweep.
   ⚠ Filtered to the exact 1800 ms delay rather than stubbing setTimeout wholesale:
   a blanket stub is the ban-too-wide trap in a new place. */
async function freezeAutoDismiss(page) {
  await page.evaluate(() => {
    if (window.__lcsFrozeAutoDismiss) return;
    window.__lcsFrozeAutoDismiss = true;
    const real = window.setTimeout;
    window.setTimeout = function (fn, ms) {
      if (ms === 1800) return 0;            // lcs-shell.js:885 — the .tryagain auto-dismiss
      return real.apply(window, arguments);
    };
  });
}

const round = (page) => page.evaluate((g) => {
  const t = window[g], r = t && t.round;
  if (!r) return null;
  return {
    id: r.id,
    correct: r.correct,
    cards: t.view.choices.map((c) => c.word),
    /* ⭐ the index of the correct card in the round's OWN triple */
    oracle: t.view.choices.findIndex((c) => c.word === r.correct),
  };
}, G);

/* Re-run the round from scratch so each phase photographs a CLEAN state rather than
   one carrying the previous phase's selection — a leftover selection is exactly what
   a critic reasonably reads as a defect in the activity rather than in the driver. */
async function reset(page) {
  await page.evaluate((g) => { const t = window[g]; t.setupTask(t.round); t.render(); }, G);
  await new Promise((r) => setTimeout(r, 120));
}

const tapCard = (page, id) => page.evaluate((x) => {
  const b = document.querySelector('.vvm-opt[data-id="' + x + '"]');
  if (!b) return false;
  b.click(); return true;
}, id);

const wrongIndex = (page) => page.evaluate((g) => {
  const t = window[g];
  return t.view.choices.findIndex((c) => c.word !== t.round.correct);
}, G);

module.exports = {
  steps: [
    {
      name: 'picked',
      async drive(page) {
        await reset(page);
        const r = await round(page);
        if (!r) throw new Error('could not read the round off window.' + G);
        if (r.oracle < 0) throw new Error('"' + r.correct + '" is not among the cards on screen ' + JSON.stringify(r.cards) + ' in ' + r.id);

        /* pick a WRONG card deliberately: the interesting question for this phase is
           whether the board gives anything away before Check, and a wrong selection is
           the state that would expose it. */
        const wrong = await wrongIndex(page);
        if (!(await tapCard(page, wrong))) throw new Error('card ' + wrong + ' absent');
        await new Promise((x) => setTimeout(x, 150));

        const st = await page.evaluate((g) => {
          const chk = document.querySelector('.lcs-activity-check');
          const p = document.querySelector('.lcs-activity-prompt');
          const blank = document.querySelector('.vvm-blank');
          return {
            sel: window[g].sel,
            selected: document.querySelectorAll('.vvm-opt.vvm-sel').length,
            graded: document.querySelectorAll('.vvm-opt.vvm-right, .vvm-opt.vvm-wrong, .vvm-opt.vvm-correct, .vvm-opt.vvm-bad, .vvm-opt.vvm-tried').length,
            celebrated: !!(p && p.classList.contains('celebrate')),
            checkShown: !!(chk && chk.offsetParent !== null),
            blankText: blank ? blank.textContent.trim() : '',
            blankFilled: !!(blank && blank.classList.contains('vvm-filled')),
            /* ⭐⭐ a SELECTION IS NOT A VERDICT. This frame used to paint the child's own
               choice in the screen's try-again colour the instant they committed — a
               shame signal for the act of answering, on a deck whose tone is no-shame. */
            selBorder: (function () { const e = document.querySelector('.vvm-opt.vvm-sel'); return e ? getComputedStyle(e).borderTopColor : null; })(),
          };
        }, G);

        if (st.sel == null) throw new Error('the tap did not select');
        if (st.selected !== 1) throw new Error('expected exactly 1 selected card, saw ' + st.selected);
        /* ⭐ the leak assertion: nothing may be graded before Check */
        if (st.graded) throw new Error(st.graded + ' card(s) marked BEFORE Check — the board is grading a selection');
        if (st.celebrated) throw new Error('a wrong selection celebrated before Check');
        if (!st.checkShown) throw new Error('the shell Check button is not available after a selection');
        /* ⭐ this activity writes the chosen word INTO the sentence. If that does not
           happen the frame is indistinguishable from `open` and the sweep photographs
           nothing new. */
        if (!st.blankFilled) throw new Error('the blank did not fill on select');
        if (st.blankText === '___' || !st.blankText) throw new Error('the blank still reads "' + st.blankText + '" after a selection');
        if (st.selBorder === 'rgb(242, 120, 75)') throw new Error('the SELECTED card wears the try-again colour before Check — a selection is not a verdict');
        if (st.selBorder === 'rgb(46, 125, 70)') throw new Error('the SELECTED card wears the success colour before Check — the board is grading a selection');
        return true;
      },
    },
    {
      name: 'missed',
      async drive(page) {
        await freezeAutoDismiss(page);
        await reset(page);
        const r = await round(page);
        if (!r) throw new Error('could not read the round off window.' + G);
        const wrong = await wrongIndex(page);
        if (!(await tapCard(page, wrong))) throw new Error('card ' + wrong + ' absent');
        await new Promise((x) => setTimeout(x, 120));
        await page.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); if (c && !c.disabled) c.click(); });
        await new Promise((x) => setTimeout(x, 280));

        const st = await page.evaluate(() => {
          const p = document.querySelector('.lcs-activity-prompt');
          const blank = document.querySelector('.vvm-blank');
          return {
            tryagain: !!(p && p.classList.contains('tryagain')),
            celebrated: !!(p && p.classList.contains('celebrate')),
            /* ⭐ the class is not the message. Assert the hint TEXT is on screen, because
               the shell blanks the span when it auto-dismisses — the exact state the wide
               viewports would otherwise photograph. */
            hintText: (function () { const h = document.querySelector('.lcs-activity-prompt-hint'); return h ? h.textContent.trim() : ''; })(),
            blankText: blank ? blank.textContent.trim() : '',
            marked: document.querySelectorAll('.vvm-opt.vvm-right, .vvm-opt.vvm-wrong, .vvm-opt.vvm-correct, .vvm-opt.vvm-bad').length,
            tried: document.querySelectorAll('.vvm-opt.vvm-tried').length,
            triedIsSelected: !!document.querySelector('.vvm-opt.vvm-tried.vvm-sel'),
            /* ⭐⭐ the RESOLVED colour of the tapped card. Until the critic pass this frame
               was PIXEL-IDENTICAL to `picked`: coral meant both "I chose this" and "this is
               wrong", and the whole distinction lived above the panel in the prompt. The
               board must now say coral, and `picked` must NOT. */
            triedBorder: (function () { const e = document.querySelector('.vvm-opt.vvm-tried'); return e ? getComputedStyle(e).borderTopColor : null; })(),
          };
        });

        if (st.celebrated) throw new Error('a WRONG answer celebrated in ' + r.id);
        if (!st.tryagain) throw new Error('a wrong answer did not put the prompt into try-again');
        if (!st.hintText) throw new Error('the try-again HINT LINE is empty — the shell auto-dismissed it before this frame was photographed (lcs-shell.js:885)');
        /* the wrong word must stay visible in the sentence: it is this deck's only
           board-level feedback, and a child re-reads the whole sentence to see why. */
        if (!st.blankText || st.blankText === '___') throw new Error('the wrong word left the blank after Check — the child has nothing to re-read');
        if (st.blankText === r.correct) throw new Error('the blank shows the CORRECT word after a wrong answer — the board is leaking the answer');
        /* ⚠ and it must still not reveal WHICH card is right */
        if (st.marked) throw new Error(st.marked + ' card(s) marked RIGHT after a WRONG answer — the board is leaking the answer');
        if (st.tried !== 1) throw new Error('expected exactly 1 card marked as tried, saw ' + st.tried);
        if (!st.triedIsSelected) throw new Error('the tried mark is not on the card the child tapped');
        if (st.triedBorder !== 'rgb(242, 120, 75)') throw new Error('the tapped card is not wearing the try-again colour — got ' + st.triedBorder);
        return true;
      },
    },
    {
      /* ⚠ TERMINAL. After Check the round is answered, Next replaces Check, and the three
         cards remain on screen but are no longer the live control. `terminal` relaxes only
         the two gates that cannot apply to a win screen (NO-CONTROLS-MEASURED and TAP) and
         leaves CUT-OFF, OVERFLOW, TINY and SPARSE running; the assertions below replace them. */
      name: 'resolved',
      terminal: true,
      async drive(page) {
        await reset(page);
        const r = await round(page);
        if (!r) throw new Error('could not read the round off window.' + G);
        if (!(await tapCard(page, r.oracle))) throw new Error('the correct card (' + r.oracle + ') is absent');
        await new Promise((x) => setTimeout(x, 120));

        await page.evaluate(() => {
          const c = document.querySelector('.lcs-activity-check');
          if (c && !c.disabled) c.click();
        });
        await new Promise((x) => setTimeout(x, 280));

        const st = await page.evaluate(() => {
          const p = document.querySelector('.lcs-activity-prompt');
          const nxt = document.querySelector('.lcs-activity-next');
          const chk = document.querySelector('.lcs-activity-check');
          const blank = document.querySelector('.vvm-blank');
          return {
            celebrated: !!(p && p.classList.contains('celebrate')),
            tryagain: !!(p && p.classList.contains('tryagain')),
            nextShown: !!(nxt && nxt.offsetParent !== null),
            checkHidden: !chk || chk.offsetParent === null,
            cards: document.querySelectorAll('.vvm-opt').length,
            sentence: !!document.querySelector('.vvm-sent'),
            blankText: blank ? blank.textContent.trim() : '',
            /* ⭐⭐ THE COLOUR THE WIN SCREEN IS ACTUALLY WEARING, RESOLVED FROM THE CASCADE
               — never the class list. Until this build the correct card and the filled
               blank kept the coral `.vvm-sel` treatment on the win screen, which is the
               SAME coral a wrong answer wears: one colour meaning both things, in all
               eight locales, with every gate green. Found by reading the render.
               `.vvm-sel` and `.vvm-right` are both two-class rules, so the cascade breaks
               the tie on ORDER alone — if `.vvm-right` ever moves above `.vvm-sel` this
               silently reverts, which is exactly how the sibling deck's version of this
               defect shipped inside its own fix. Assert the RESOLVED colour. */
            blankColor: blank ? getComputedStyle(blank).color : null,
            rightCards: document.querySelectorAll('.vvm-opt.vvm-right').length,
            rightBorder: (function () {
              const e = document.querySelector('.vvm-opt.vvm-right');
              return e ? getComputedStyle(e).borderTopColor : null;
            })(),
          };
        });

        if (st.tryagain) throw new Error('the CORRECT card was graded wrong in ' + r.id);
        if (!st.celebrated) throw new Error('the correct card did not celebrate in ' + r.id);
        if (!st.nextShown) throw new Error('Next did not appear after a correct answer');
        if (!st.checkHidden) throw new Error('Check is still visible after the round resolved');
        if (!st.cards) throw new Error('the cards vanished from the resolved card');
        if (!st.sentence) throw new Error('the sentence vanished from the resolved card');
        /* the completed sentence is the whole reward: the right word, standing in the gap */
        if (st.blankText !== r.correct) throw new Error('the blank reads "' + st.blankText + '" on the win screen, not the correct "' + r.correct + '"');
        if (st.rightCards !== 1) throw new Error('expected exactly 1 card wearing the success mark on the win screen, saw ' + st.rightCards);
        if (st.rightBorder !== 'rgb(46, 125, 70)') throw new Error('the correct card is not wearing the success colour — got ' + st.rightBorder + ' (coral would mean .vvm-sel is still winning the cascade)');
        if (st.blankColor !== 'rgb(27, 94, 51)') throw new Error('the completed sentence is not wearing the success colour — got ' + st.blankColor + ' (coral is what a WRONG answer wears)');
        return true;
      },
    },
  ],
};
