/* =====================================================================
   visual-qa phase driver — wally-capital-crane / special-names (L.2.2.a)
   sv = «Almas namnkran» · Lgr22 åk 3 · Språkliga strukturer och normer

   ⚠⚠ SEVEN DECKS HAVE SHIPPED AND ONLY THE OPENING FRAME HAS EVER BEEN PHOTOGRAPHED,
   in one locale. `visual-qa-activity.js` says so itself when no driver exists: "phases:
   open ONLY … NOTHING below has ever seen it." So the SELECTED state — which is this
   activity's entire signature move — has never been measured at any width in any
   language.

   ⭐ The signature move: the tapped chip re-renders CAPITALIZED
   (`b.textContent = seld ? Core.capitalize(o.word) : o.word`) and lifts 7px out of flow
   on `transform:translateY(-7px)`. Both change the box: a lifted chip can collide with
   the row above, and `sverige -> Sverige` is the same length only because Swedish
   capitals are single characters — `ß`-style expansions would not be.

   Four screens:
     open      — Alma, her speech bubble, and the sentence as word chips in order.
     picked    — one chip SELECTED, lifted and capitalised. ⭐ answerType:'state', so
                 nothing is graded until Check: this frame must reveal NOTHING about
                 whether the choice is right. As shipped, `.wcc-sel` was CORAL — the
                 try-again ink — so the board painted the child's own choice in the
                 rejection colour the instant they committed, and it never changed
                 again, which made picked / missed / resolved ONE colour.
     missed    — tap a wrong chip → Check. ⭐⭐ Only the TAPPED chip may be marked;
                 marking the correct one prints the answer.
     resolved  — Check on the right chip: the prompt celebrates, Next replaces Check.

   ⚠⚠ THE TARGET IS DERIVED HERE, NOT ASKED OF THE CORE. `tokens.indexOf(proper)` is
   the whole computation, so this driver holds it independently rather than calling
   `Core.oracle` — a driver that asks the thing under test what the answer is cannot
   notice when the thing under test is wrong.

   ⚠⚠ A FREEZE IS REQUIRED. `lcs-shell.js:883` clears `.tryagain` and blanks the hint
   after 1800 ms, while the harness drives a phase ONCE and then sweeps six viewports.
   Without it the wider viewports photograph a state that has already auto-dismissed.
   ===================================================================== */
'use strict';

const G = 'WallyCapitalCraneActivity';

const GOLD = 'rgb(232, 165, 58)';
const CORAL = 'rgb(242, 120, 75)';
const GOOD = 'rgb(47, 165, 106)';

/* ⚠ Filtered to the exact 1800 ms delay rather than stubbing setTimeout wholesale — a
   blanket stub would be the ban-too-wide trap in a new place. */
async function freezeAutoDismiss(page) {
  await page.evaluate(() => {
    if (window.__lcsFrozeAutoDismiss) return;
    window.__lcsFrozeAutoDismiss = true;
    const real = window.setTimeout;
    window.setTimeout = function (fn, ms) {
      if (ms === 1800) return 0;            // lcs-shell.js:883 — the .tryagain auto-dismiss
      return real.apply(window, arguments);
    };
  });
}

const state = (page) => page.evaluate((g) => {
  const t = window[g], r = t && t.round;
  if (!r) return null;
  return {
    id: r.id,
    tokens: r.tokens,
    proper: r.proper,
    lang: (t.api && t.api.lang) || 'en',
    chips: Array.prototype.map.call(document.querySelectorAll('.wcc-chip'),
      (b) => ({ id: +b.getAttribute('data-id'), text: b.textContent.trim() })),
  };
}, G);

/* Re-run the round from scratch so each phase photographs a CLEAN state instead of one
   carrying the previous phase's selection — a leftover selection is exactly what a critic
   reasonably reads as a defect in the activity rather than in the driver. */
async function reset(page) {
  await page.evaluate((g) => { const t = window[g]; t.setupTask(t.round); t.render(); }, G);
  await new Promise((r) => setTimeout(r, 120));
}

const tapChip = (page, id) => page.evaluate((x) => {
  const b = document.querySelector('.wcc-chip[data-id="' + x + '"]');
  if (!b) return false;
  b.click(); return true;
}, id);

/* the target, derived — never read off the core */
function pick(st) {
  const want = st.tokens.indexOf(st.proper);
  if (want < 0) throw new Error('the round\'s `proper` ("' + st.proper + '") is not among its tokens');
  if (!st.chips.some((c) => c.id === want)) {
    throw new Error('the target chip (index ' + want + ') is not on the board.\n    rendered: ' +
      st.chips.map((c) => c.id + ':' + c.text).join(' ') +
      '\n    → if this fires in every round, the wrong pool is loaded for this locale.');
  }
  /* ⚠⚠ THE WRONG CHIP MUST BE A LOWERCASE ONE. My first version took the first chip
     whose id differed from the target — which is chip 0, the SENTENCE-INITIAL word, and
     that word is already capitalised. Tapping it produced NO visible change, so the
     `picked` frame photographed a crane that had lifted nothing, and the capital
     assertion passed TRIVIALLY because «Vi» already starts with a capital. A vacuous
     assertion that reports green. Found by reading the 768px render, not by a gate. */
  const wrong = st.chips.find((c) => c.id !== want && c.text === c.text.toLowerCase());
  if (!wrong) throw new Error('no LOWERCASE distractor chip in ' + st.id + ' — the picked frame would show no lift');
  return { right: want, wrong: wrong.id };
}

module.exports = {
  steps: [
    {
      name: 'picked',
      async drive(page) {
        await reset(page);
        const st = await state(page);
        if (!st) throw new Error('could not read the round off window.' + G);
        const { right, wrong } = pick(st);
        const beforeText = (st.chips.find((c) => c.id === wrong) || {}).text;
        /* Pick a WRONG chip deliberately: the question this frame answers is whether the
           board gives anything away before Check, and a wrong selection exposes it. */
        if (!(await tapChip(page, wrong))) throw new Error('chip ' + wrong + ' absent');
        await new Promise((r) => setTimeout(r, 150));

        const m = await page.evaluate((g) => {
          const p = document.querySelector('.lcs-activity-prompt');
          const chk = document.querySelector('.lcs-activity-check');
          const sel = document.querySelector('.wcc-chip.wcc-sel');
          return {
            sel: window[g].sel,
            selected: document.querySelectorAll('.wcc-chip.wcc-sel').length,
            graded: document.querySelectorAll('.wcc-chip.wcc-right, .wcc-chip.wcc-tried').length,
            celebrated: !!(p && p.classList.contains('celebrate')),
            checkShown: !!(chk && chk.offsetParent !== null),
            selBorder: sel ? getComputedStyle(sel).borderTopColor : null,
            selText: sel ? sel.textContent.trim() : null,
          };
        }, G);

        if (m.sel == null) throw new Error('the tap did not select');
        if (m.selected !== 1) throw new Error('expected exactly 1 selected chip, saw ' + m.selected);
        /* ⭐ the leak assertion: nothing may be graded before Check */
        if (m.graded) throw new Error(m.graded + ' chip(s) marked BEFORE Check — the board is grading a selection');
        if (m.celebrated) throw new Error('a wrong selection celebrated before Check');
        if (!m.checkShown) throw new Error('the shell Check button is not available after a selection');
        /* ⭐ the crane lift must actually have happened, asserted by COMPARISON so it
           cannot pass on a chip that was already capitalised */
        const lifted = beforeText.charAt(0).toUpperCase() + beforeText.slice(1);
        if (m.selText === beforeText) throw new Error('the selected chip did not change — the crane lifted nothing (was "' + beforeText + '")');
        if (m.selText !== lifted) throw new Error('the selected chip reads "' + m.selText + '", expected the lifted form "' + lifted + '"');
        /* ⭐⭐ A SELECTION IS NOT A VERDICT. Assert the RESOLVED colour: `.wcc-chip.wcc-sel`
           is a TWO-class rule, so a single-class override loses on SPECIFICITY rather than
           source order and fails silently — which is exactly what happened in this build
           until it was measured on the pixel. */
        if (m.selBorder === CORAL) throw new Error('the SELECTED chip wears the try-again colour before Check — a selection is not a verdict');
        if (m.selBorder === GOOD) throw new Error('the SELECTED chip wears the success colour before Check — the board is grading a selection');
        if (m.selBorder !== GOLD) throw new Error('the selected chip is not wearing the "chosen" colour — got ' + m.selBorder);
        return true;
      },
    },
    {
      name: 'missed',
      async drive(page) {
        await freezeAutoDismiss(page);
        await reset(page);
        const st = await state(page);
        if (!st) throw new Error('could not read the round off window.' + G);
        const { right, wrong } = pick(st);
        if (!(await tapChip(page, wrong))) throw new Error('chip ' + wrong + ' absent');
        await new Promise((r) => setTimeout(r, 120));
        await page.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); if (c && !c.disabled) c.click(); });
        await new Promise((r) => setTimeout(r, 280));

        const m = await page.evaluate((rightId) => {
          const p = document.querySelector('.lcs-activity-prompt');
          const tried = document.querySelector('.wcc-chip.wcc-tried');
          const target = document.querySelector('.wcc-chip[data-id="' + rightId + '"]');
          return {
            tryagain: !!(p && p.classList.contains('tryagain')),
            celebrated: !!(p && p.classList.contains('celebrate')),
            /* ⭐ the class is not the message — the shell BLANKS the hint span when it
               auto-dismisses, which is the state the wide viewports would photograph. */
            hintText: (() => { const h = document.querySelector('.lcs-activity-prompt-hint'); return h ? h.textContent.trim() : ''; })(),
            tried: document.querySelectorAll('.wcc-chip.wcc-tried').length,
            triedId: tried ? +tried.getAttribute('data-id') : null,
            targetMarked: !!(target && /wcc-(right|tried)/.test(target.className)),
            targetText: target ? target.textContent.trim() : null,
            triedBorder: tried ? getComputedStyle(tried).borderTopColor : null,
          };
        }, right);

        if (m.celebrated) throw new Error('a WRONG chip celebrated in ' + st.id);
        if (!m.tryagain) throw new Error('a wrong chip did not put the prompt into try-again');
        if (!m.hintText) throw new Error('the try-again HINT LINE is empty — the shell auto-dismissed it before this frame was photographed (lcs-shell.js:883)');
        if (m.tried !== 1) throw new Error('expected exactly 1 chip marked as tried, saw ' + m.tried);
        if (m.triedId !== wrong) throw new Error('the TRIED mark is not on the chip that was tapped');
        /* ⭐⭐ and the answer must still be hidden — both in colour AND in letterform */
        if (m.targetMarked) throw new Error('the CORRECT chip is marked after a WRONG answer — that prints the answer');
        if (/^\p{Lu}/u.test(m.targetText || '')) throw new Error('the correct chip is rendering CAPITALISED after a wrong answer — that prints the answer');
        if (m.triedBorder !== CORAL) throw new Error('the tapped chip is not wearing the try-again colour — got ' + m.triedBorder);
        return true;
      },
    },
    {
      /* ⚠ TERMINAL. After Check the round is answered and Next replaces Check, so the chips
         remain on screen but are no longer the live control. `terminal` relaxes only the two
         gates that cannot apply to a win screen (NO-CONTROLS-MEASURED and TAP) and leaves
         CUT-OFF, OVERFLOW, TINY and SPARSE running; the assertions below replace them. */
      name: 'resolved',
      terminal: true,
      async drive(page) {
        await reset(page);
        const st = await state(page);
        if (!st) throw new Error('could not read the round off window.' + G);
        const { right } = pick(st);
        if (!(await tapChip(page, right))) throw new Error('the correct chip ' + right + ' is absent');
        await new Promise((r) => setTimeout(r, 120));
        await page.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); if (c && !c.disabled) c.click(); });
        await new Promise((r) => setTimeout(r, 280));

        const m = await page.evaluate((rightId) => {
          const p = document.querySelector('.lcs-activity-prompt');
          const nxt = document.querySelector('.lcs-activity-next');
          const chk = document.querySelector('.lcs-activity-check');
          const ok = document.querySelector('.wcc-chip.wcc-right');
          const target = document.querySelector('.wcc-chip[data-id="' + rightId + '"]');
          return {
            celebrated: !!(p && p.classList.contains('celebrate')),
            tryagain: !!(p && p.classList.contains('tryagain')),
            nextShown: !!(nxt && nxt.offsetParent !== null),
            checkHidden: !chk || chk.offsetParent === null,
            right: document.querySelectorAll('.wcc-chip.wcc-right').length,
            rightId: ok ? +ok.getAttribute('data-id') : null,
            rightBorder: ok ? getComputedStyle(ok).borderTopColor : null,
            targetText: target ? target.textContent.trim() : null,
          };
        }, right);

        if (m.tryagain) throw new Error('the CORRECT chip was graded wrong in ' + st.id +
          ' — if this fires in every round, the deck\'s `proper` disagrees with what the engine grades');
        if (!m.celebrated) throw new Error('the correct chip did not celebrate in ' + st.id);
        if (!m.nextShown) throw new Error('Next did not appear after a correct answer');
        if (!m.checkHidden) throw new Error('Check is still visible after the round resolved');
        if (m.right !== 1) throw new Error('expected exactly 1 chip wearing the success mark, saw ' + m.right);
        if (m.rightId !== right) throw new Error('the success mark is on the wrong chip');
        if (m.rightBorder !== GOOD) throw new Error('the correct chip is not wearing the success colour — got ' + m.rightBorder);
        /* ⭐ the payoff: the child sees the capitalised word standing in its own sentence */
        if (!/^\p{Lu}/u.test(m.targetText || '')) throw new Error('the win screen does not show the word capitalised — got "' + m.targetText + '"');
        return true;
      },
    },
  ],
};
