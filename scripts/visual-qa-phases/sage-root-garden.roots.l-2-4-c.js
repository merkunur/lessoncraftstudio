/* =====================================================================
   visual-qa phase driver — sage-root-garden / roots (L.2.4.c · Lgr22 åk 2)

   ⚠⚠ SEVEN DECKS HAVE SHIPPED AND NO SWEEP HAS EVER SEEN A CHOICE MADE. Without
   a driver the harness photographs only the OPENING frame, so the 24 renders on
   disk are 8 rounds × 3 widths × one phase. They are also BARE-NAMED, which by
   the harness's own convention means English — the same hazard that turned out
   to be mislabelled Italian on the sibling activity two builds ago. This run
   restores a true English baseline at those names and writes all eight locales
   suffixed.

   Three screens, of which only the first had ever been photographed:

     open      — the tortoise, the speech bubble, the root card, three word cards.
     picked    — one card SELECTED (`.srg-sel`) and the shell's Check now enabled.
                 ⭐ Nothing is graded yet: this activity is `answerType:'state'`,
                 so correctness exists only after Check. The frame therefore has
                 to show a selection that reveals NOTHING about whether it is
                 right — which is exactly what a critic should be asked to judge.
     resolved  — Check pressed on the CORRECT card: the prompt celebrates, Next
                 replaces Check, and the layout changes at every width.

   ⚠ CARDS ARE REACHED BY MODEL INDEX, NEVER BY TEXT. `setupTask` shuffles the
   cards (`sage-root-garden-activity.js:66`), and `data-id` carries the model
   index — so the correct card is found through `RootWordCore.oracle(round)` and
   never by matching a word, which would drive the wrong element the moment this
   runs in a locale whose words differ (the point of the sweep).

   ⚠ NO FREEZE NEEDED, and this was MEASURED rather than assumed. The activity
   holds exactly one `setTimeout` — 320 ms, the root read-aloud at `:98` — and it
   changes no pixels. The sibling fix-it clinic needed a freeze for three
   transient states; the pronoun deck needed none. Measure, do not pattern-match.
   ===================================================================== */
'use strict';

const G = 'SageRootGardenActivity';

const round = (page) => page.evaluate((g) => {
  const t = window[g], r = t && t.round;
  if (!r) return null;
  return { id: r.id, root: r.root, correct: r.correct, oracle: window.RootWordCore.oracle(r) };
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
  const b = document.querySelector('.srg-opt[data-id="' + x + '"]');
  if (!b) return false;
  b.click(); return true;
}, id);

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
        const wrong = await page.evaluate((g) => {
          const t = window[g], o = window.RootWordCore.oracle(t.round);
          return t.round.choices.map((c, i) => i).filter((i) => i !== o)[0];
        }, G);
        if (!(await tapCard(page, wrong))) throw new Error('card ' + wrong + ' absent');
        await new Promise((x) => setTimeout(x, 150));

        const st = await page.evaluate((g) => {
          const chk = document.querySelector('.lcs-activity-check');
          return {
            sel: window[g].sel,
            selected: document.querySelectorAll('.srg-opt.srg-sel').length,
            graded: document.querySelectorAll('.srg-opt.srg-correct, .srg-opt.srg-right, .srg-opt.srg-wrong, .srg-opt.srg-bad').length,
            celebrated: !!(document.querySelector('.lcs-activity-prompt') || {}).classList?.contains('celebrate'),
            checkShown: !!(chk && chk.offsetParent !== null),
          };
        }, G);

        if (st.sel == null) throw new Error('the tap did not select');
        if (st.selected !== 1) throw new Error('expected exactly 1 selected card, saw ' + st.selected);
        /* ⭐ the leak assertion: nothing may be graded before Check */
        if (st.graded) throw new Error(st.graded + ' card(s) marked correct/wrong BEFORE Check — the board is grading a selection');
        if (st.celebrated) throw new Error('a wrong selection celebrated before Check');
        if (!st.checkShown) throw new Error('the shell Check button is not available after a selection');
        return true;
      },
    },
    {
      /* ⭐ THE STATE A CHILD HITS MOST OFTEN, and it was the one the sweep could not see. `picked`
         captures a selection before Check; this captures tap → Check → WRONG, which is where the
         whole lesson lands. The critic found it as a code fact (the wrong branch changed nothing on
         the board) and as a coverage gap in the same breath — the frames could not have shown it,
         because no phase drove it. */
      name: 'missed',
      async drive(page) {
        await reset(page);
        const r = await round(page);
        if (!r) throw new Error('could not read the round off window.' + G);
        const wrong = await page.evaluate((g) => {
          const t = window[g], o = window.RootWordCore.oracle(t.round);
          return t.round.choices.map((c, i) => i).filter((i) => i !== o)[0];
        }, G);
        if (!(await tapCard(page, wrong))) throw new Error('card ' + wrong + ' absent');
        await new Promise((x) => setTimeout(x, 120));
        await page.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); if (c && !c.disabled) c.click(); });
        await new Promise((x) => setTimeout(x, 260));

        const st = await page.evaluate(() => {
          const p = document.querySelector('.lcs-activity-prompt');
          return {
            tryagain: !!(p && p.classList.contains('tryagain')),
            celebrated: !!(p && p.classList.contains('celebrate')),
            missed: document.querySelectorAll('.srg-opt.srg-miss').length,
            right: document.querySelectorAll('.srg-opt.srg-right').length,
          };
        });

        if (st.celebrated) throw new Error('a WRONG answer celebrated in ' + r.id);
        if (!st.tryagain) throw new Error('a wrong answer did not put the prompt into try-again');
        /* ⭐ the board must now say something — this is the assertion the missing state needed */
        if (st.missed !== 1) throw new Error('expected exactly 1 card marked as tried, saw ' + st.missed);
        /* ⚠ and it must still not reveal WHICH card is right */
        if (st.right) throw new Error(st.right + ' card(s) marked correct after a WRONG answer — the board is leaking the answer');
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
        await new Promise((x) => setTimeout(x, 260));

        const st = await page.evaluate(() => {
          const p = document.querySelector('.lcs-activity-prompt');
          const nxt = document.querySelector('.lcs-activity-next');
          const chk = document.querySelector('.lcs-activity-check');
          return {
            celebrated: !!(p && p.classList.contains('celebrate')),
            tryagain: !!(p && p.classList.contains('tryagain')),
            nextShown: !!(nxt && nxt.offsetParent !== null),
            checkHidden: !chk || chk.offsetParent === null,
            cards: document.querySelectorAll('.srg-opt').length,
          };
        });

        if (st.tryagain) throw new Error('the CORRECT card was graded wrong in ' + r.id);
        if (!st.celebrated) throw new Error('the correct card did not celebrate in ' + r.id);
        if (!st.nextShown) throw new Error('Next did not appear after a correct answer');
        if (!st.checkHidden) throw new Error('Check is still visible after the round resolved');
        if (!st.cards) throw new Error('the word cards vanished from the resolved card');
        return true;
      },
    },
  ],
};
