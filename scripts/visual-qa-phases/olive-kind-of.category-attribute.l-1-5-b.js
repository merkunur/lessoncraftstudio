/* =====================================================================
   visual-qa phase driver — olive-kind-of / category-attribute
   (L.1.5.b · Lgr22 åk 2 · sv «Ord och begrepp»)

   ⚠⚠ SEVEN DECKS HAVE SHIPPED AND NO SWEEP HAS EVER SEEN A CHOICE MADE. Without
   a driver the harness photographs only the OPENING frame, so the 24 renders on
   disk are 8 rounds × 3 widths × one phase — and they are BARE-NAMED, which by
   the harness's own convention means English. This run restores a true English
   baseline at those names and writes all eight locales suffixed.

   Four screens, of which only the first had ever been photographed:

     open      — the owl, the speech bubble, the picture + 🔊, the clue, 3 cards.
     picked    — one card SELECTED (`.okt-sel`), the shell's Check now enabled.
                 ⭐ Nothing is graded yet: `answerType:'state'`, so correctness
                 exists only after Check. The frame therefore has to show a
                 selection that reveals NOTHING about whether it is right —
                 which is exactly what a critic should be asked to judge.
     missed    — tap → Check → WRONG. ⭐ THE STATE A CHILD HITS MOST OFTEN, and
                 the one the sweep could not see. Until this build the shell
                 turned the PROMPT to try-again while the board said nothing at
                 all: the tapped card kept the identical coral `.okt-sel`. The
                 quiet `.okt-tried` mark is what this phase exists to photograph.
     resolved  — Check on the CORRECT card: the prompt celebrates, Next replaces
                 Check, and the layout changes at every width.

   ⚠ CARDS ARE REACHED BY MODEL INDEX, NEVER BY TEXT. `setupTask` shuffles the
   cards (`olive-kind-of-activity.js`), and `data-id` carries the model index —
   so the correct card is found through `CategoryDefineCore.oracle(round)` and
   never by matching a word, which would drive the wrong element the moment this
   runs in a locale whose words differ (the entire point of the sweep).

   ⚠⚠ A FREEZE IS REQUIRED, AND MY FIRST VERSION OF THIS FILE SAID THE OPPOSITE.
   It claimed "no freeze needed, and this was MEASURED" — I had measured the
   ACTIVITY's timeouts (one, 320 ms, changing no pixels) and never looked at the
   SHELL's. `lcs-shell.js:885` clears `.tryagain` and blanks the hint span after
   **1800 ms**. The harness drives a phase ONCE and then sweeps six viewports at
   ~260 ms each, so the later (wider) viewports were photographing a state that
   had already auto-dismissed: at 1024 the miss frame showed a plain green
   heading and no message in all 8 rounds, while 360 showed both. The visual
   critic reported it as "the wrong-answer feedback does not appear at desktop"
   — a real observation of a real artefact, but the defect was in THIS FILE, not
   in the activity. Freezing that one timer is what makes the six viewports
   photograph the same state.

   ⭐ The lesson is narrower than "always freeze": measure the timers of every
   layer that can mutate the screen, not just the one you happen to own. The
   sibling fix-it clinic needed a freeze for three transient states; the pronoun
   deck and the root garden genuinely needed none.
   ===================================================================== */
'use strict';

const G = 'OliveKindOfActivity';

/* Hold the shell's auto-dismiss so a driven state survives the viewport sweep.
   ⚠ Filtered to the exact 1800 ms delay rather than stubbing setTimeout wholesale:
   this activity's own 320 ms read-aloud must keep working, and a blanket stub
   would be the ban-too-wide trap in a new place. */
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
  return { id: r.id, category: r.category, noun: r.target && r.target.noun, oracle: window.CategoryDefineCore.oracle(r) };
}, G);

/* Re-run the round from scratch so each phase photographs a CLEAN state rather than one carrying
   the previous phase's selection — a leftover selection is exactly what a critic reasonably reads
   as a defect in the activity rather than in the driver. */
async function reset(page) {
  await page.evaluate((g) => { const t = window[g]; t.setupTask(t.round); t.render(); }, G);
  await new Promise((r) => setTimeout(r, 120));
}

/* tap the card whose data-id is the MODEL index (not its position on screen) */
const tapCard = (page, id) => page.evaluate((x) => {
  const b = document.querySelector('.okt-opt[data-id="' + x + '"]');
  if (!b) return false;
  b.click(); return true;
}, id);

const wrongIndex = (page) => page.evaluate((g) => {
  const t = window[g], o = window.CategoryDefineCore.oracle(t.round);
  return t.round.choices.map((c, i) => i).filter((i) => i !== o)[0];
}, G);

module.exports = {
  steps: [
    {
      name: 'picked',
      async drive(page) {
        await reset(page);
        const r = await round(page);
        if (!r) throw new Error('could not read the round off window.' + G);
        if (r.oracle < 0) throw new Error('the core reports no oracle for ' + r.id);

        /* pick a WRONG card deliberately: the interesting question for this phase is whether the
           board gives anything away before Check, and a wrong selection is the state that would
           expose it. */
        const wrong = await wrongIndex(page);
        if (!(await tapCard(page, wrong))) throw new Error('card ' + wrong + ' absent');
        await new Promise((x) => setTimeout(x, 150));

        const st = await page.evaluate((g) => {
          const chk = document.querySelector('.lcs-activity-check');
          const p = document.querySelector('.lcs-activity-prompt');
          return {
            sel: window[g].sel,
            selected: document.querySelectorAll('.okt-opt.okt-sel').length,
            graded: document.querySelectorAll('.okt-opt.okt-tried, .okt-opt.okt-correct, .okt-opt.okt-right, .okt-opt.okt-wrong').length,
            celebrated: !!(p && p.classList.contains('celebrate')),
            checkShown: !!(chk && chk.offsetParent !== null),
          };
        }, G);

        if (st.sel == null) throw new Error('the tap did not select');
        if (st.selected !== 1) throw new Error('expected exactly 1 selected card, saw ' + st.selected);
        /* ⭐ the leak assertion: nothing may be graded before Check */
        if (st.graded) throw new Error(st.graded + ' card(s) marked BEFORE Check — the board is grading a selection');
        if (st.celebrated) throw new Error('a wrong selection celebrated before Check');
        if (!st.checkShown) throw new Error('the shell Check button is not available after a selection');
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
          return {
            tryagain: !!(p && p.classList.contains('tryagain')),
            celebrated: !!(p && p.classList.contains('celebrate')),
            /* ⭐ the class is not the message. Assert the hint TEXT is on screen, because the
               shell blanks the span when it auto-dismisses — the exact state the wide viewports
               used to photograph. */
            hintText: (function () { const h = document.querySelector('.lcs-activity-prompt-hint'); return h ? h.textContent.trim() : ''; })(),
            tried: document.querySelectorAll('.okt-opt.okt-tried').length,
            triedIsSelected: !!document.querySelector('.okt-opt.okt-tried.okt-sel'),
            correctMarked: document.querySelectorAll('.okt-opt.okt-correct, .okt-opt.okt-right, .okt-opt.okt-good').length,
          };
        });

        if (st.celebrated) throw new Error('a WRONG answer celebrated in ' + r.id);
        if (!st.tryagain) throw new Error('a wrong answer did not put the prompt into try-again');
        if (!st.hintText) throw new Error('the try-again HINT LINE is empty — the shell auto-dismissed it before this frame was photographed (lcs-shell.js:885)');
        /* ⭐ the board must now say something — this is the assertion the missing state needed */
        if (st.tried !== 1) throw new Error('expected exactly 1 card marked as tried, saw ' + st.tried);
        if (!st.triedIsSelected) throw new Error('the tried mark is not on the card the child tapped');
        /* ⚠ and it must still not reveal WHICH card is right */
        if (st.correctMarked) throw new Error(st.correctMarked + ' card(s) marked correct after a WRONG answer — the board is leaking the answer');
        return true;
      },
    },
    {
      /* ⚠ TERMINAL. After Check the round is answered, Next replaces Check, and the three word
         cards remain on screen but are no longer the live control. `terminal` relaxes only the two
         gates that cannot apply to a win screen (NO-CONTROLS-MEASURED and TAP) and leaves CUT-OFF,
         OVERFLOW, TINY and SPARSE running; the per-step assertions below replace them. */
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
          return {
            celebrated: !!(p && p.classList.contains('celebrate')),
            tryagain: !!(p && p.classList.contains('tryagain')),
            nextShown: !!(nxt && nxt.offsetParent !== null),
            checkHidden: !chk || chk.offsetParent === null,
            cards: document.querySelectorAll('.okt-opt').length,
            picture: !!document.querySelector('.okt-img'),
            right: document.querySelectorAll('.okt-opt.okt-right').length,
            /* ⚠ the colour the correct card is actually WEARING, resolved from the cascade —
               not the class list. Until this build it kept the coral .okt-sel treatment on a
               success screen, beside a green celebration, and every gate passed. */
            rightBorder: (function () {
              const e = document.querySelector('.okt-opt.okt-right');
              return e ? getComputedStyle(e).borderTopColor : null;
            })(),
          };
        });

        if (st.tryagain) throw new Error('the CORRECT card was graded wrong in ' + r.id);
        if (!st.celebrated) throw new Error('the correct card did not celebrate in ' + r.id);
        if (!st.nextShown) throw new Error('Next did not appear after a correct answer');
        if (!st.checkHidden) throw new Error('Check is still visible after the round resolved');
        if (!st.cards) throw new Error('the word cards vanished from the resolved card');
        if (!st.picture) throw new Error('the picture vanished from the resolved card');
        if (st.right !== 1) throw new Error('expected exactly 1 card marked correct on the win screen, saw ' + st.right);
        /* ⭐ the cascade assertion: .okt-right and .okt-sel are both two-class rules, so a tie is
           broken by ORDER alone. If .okt-right ever moves above .okt-sel this silently reverts to
           coral-on-a-success-screen, which is precisely how the sv #26 version of this defect
           shipped inside its own fix. Assert the RESOLVED colour, never the class. */
        if (st.rightBorder !== 'rgb(46, 125, 70)') throw new Error('the correct card is not wearing the success colour — got ' + st.rightBorder + ' (coral would mean .okt-sel is still winning the cascade)');
        return true;
      },
    },
  ],
};
