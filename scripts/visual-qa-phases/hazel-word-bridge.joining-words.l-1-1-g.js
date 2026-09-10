/* =====================================================================
   visual-qa phase driver — hazel-word-bridge / joining-words (L.1.1.g)
   sv = «Vides ordbro» · Lgr22 åk 2 · Språkliga strukturer och normer

   ⚠⚠ SEVEN DECKS HAVE SHIPPED AND NO SWEEP HAS EVER SEEN A CHIP TAPPED. Without a
   driver the harness photographs only the OPENING frame, so the 24 renders tracked
   on disk are 8 rounds × 3 widths × ONE phase — and they are BARE-NAMED, which by
   the harness's own convention means English. The runner says so itself
   (visual-qa-activity.js:489): "phases: open ONLY … NOTHING below has ever seen it."
   This run restores a true English baseline at those names and writes all eight
   locales suffixed.

   Four screens, of which only the first had ever been photographed:

     open      — the heron, the speech bubble carrying the idea, the sentence card
                 with its literal `___` and the 🔊, the ask line, and four chips.
     picked    — one chip SELECTED (`.hwb-sel`), the shell's Check now enabled.
                 ⭐ Nothing is graded yet: answerType:'state', so correctness exists
                 only after Check. The frame has to show a selection that reveals
                 NOTHING about whether it is right — which is exactly what a critic
                 should be asked to judge.
                 ⚠ NOTE this deck does NOT write the chosen word into the gap (the
                 sentence keeps `___` on every render, in all eight locales), so the
                 selected chip is the ONLY thing that changes. That makes the chip's
                 own treatment load-bearing in a way it is not in sibling decks.
     missed    — tap → Check → WRONG. ⭐ THE STATE A CHILD HITS MOST OFTEN, and the
                 one the sweep could not see. ⭐⭐ Photographing it is what FOUND the
                 defect this driver now guards: `picked` and `missed` were rendering
                 PIXEL-IDENTICALLY, because the chosen chip kept its coral treatment
                 through Check and only the heading disagreed. Coral therefore meant
                 both "I chose this" and "this is wrong" — so before Check the screen
                 painted the child's own choice in the rejection colour, and after a
                 wrong Check the board said nothing new at all. Now: GOLD chosen,
                 CORAL wrong, GREEN right, and the three phases assert the RESOLVED
                 colour rather than the class list.
     resolved  — Check on the FITTING chip: the prompt celebrates, Next replaces
                 Check, and the layout changes at every width.

   ⚠⚠ THE EXPECTED CHIP IS COMPUTED FROM THE ROUND'S RELATION, NEVER FROM THE CORE.
   `ConjunctionCore.oracle` returns a plausible ENGLISH word for most relations and
   **''** for `alternative`, which every localized deck uses. A driver built on it
   would click a chip that does not exist, silently do nothing, and photograph an
   untouched board while reporting success — in seven of the eight locales this
   sweep exists to check. `hwbOracle` is module-private, so the table lives here.

   ⚠ CHIPS ARE REACHED BY THEIR OWN LABEL via `data-w`, which is safe precisely
   because the label IS the answer word for that locale — but the word must come
   from the table below, never from a hard-coded English list.

   ⚠⚠ A FREEZE IS REQUIRED. `lcs-shell.js:885` clears `.tryagain` and blanks the
   hint span after 1800 ms. The harness drives a phase ONCE and then sweeps six
   viewports at ~260 ms each, so the later (wider) viewports would photograph a
   state that has already auto-dismissed — the miss frame would show a plain heading
   and no message at 1024 while 360 showed both, and a critic would correctly report
   "the wrong-answer feedback does not appear at desktop" about a defect living in
   THIS FILE. A sibling driver shipped exactly that bug first.
   ===================================================================== */
'use strict';

const G = 'HazelWordBridgeActivity';

/* relation → conjunction, per locale. Mirrors REL_CONJ_L10N in the activity and the
   declared truth in scripts/verify-conjunction-core.js. ⚠ en uses `result`; every
   localized deck uses `alternative`. The two enums genuinely diverge. */
const CONJ = {
  en: { addition: 'and', contrast: 'but', cause: 'because', result: 'so' },
  de: { addition: 'und', alternative: 'oder', contrast: 'aber', cause: 'denn' },
  fr: { addition: 'et', alternative: 'ou', contrast: 'mais', cause: 'car' },
  es: { addition: 'y', alternative: 'o', contrast: 'pero', cause: 'porque' },
  pt: { addition: 'e', alternative: 'ou', contrast: 'mas', cause: 'porque' },
  it: { addition: 'e', alternative: 'o', contrast: 'ma', cause: 'perché' },
  nl: { addition: 'en', alternative: 'of', contrast: 'maar', cause: 'want' },
  sv: { addition: 'och', alternative: 'eller', contrast: 'men', cause: 'för' },
};

/* Hold the shell's auto-dismiss so a driven state survives the viewport sweep.
   ⚠ Filtered to the exact 1800 ms delay rather than stubbing setTimeout wholesale:
   this activity's own 320 ms auto-speak must keep working, and a blanket stub would
   be the ban-too-wide trap in a new place. */
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

const state = (page) => page.evaluate((g) => {
  const t = window[g], r = t && t.round;
  if (!r) return null;
  return {
    id: r.id,
    relation: r.relation,
    lang: (t.api && t.api.lang) || 'en',
    chips: Array.prototype.map.call(document.querySelectorAll('.hwb-chip'), function (b) { return b.getAttribute('data-w'); }),
  };
}, G);

/* Re-run the round from scratch so each phase photographs a CLEAN state rather than
   one carrying the previous phase's selection — a leftover selection is exactly what
   a critic reasonably reads as a defect in the activity rather than in the driver. */
async function reset(page) {
  await page.evaluate((g) => { const t = window[g]; t.setupTask(t.round); t.render(); }, G);
  await new Promise((r) => setTimeout(r, 120));
}

const tapChip = (page, w) => page.evaluate((x) => {
  const b = document.querySelector('.hwb-chip[data-w="' + x + '"]');
  if (!b) return false;
  b.click(); return true;
}, w);

function answerFor(st) {
  const table = CONJ[st.lang] || CONJ.en;
  const a = table[st.relation];
  if (!a) throw new Error('relation "' + st.relation + '" has no chip in the ' + st.lang + ' table — REL_CONJ_' + st.lang.toUpperCase() + ' is probably missing');
  if (st.chips.indexOf(a) < 0) throw new Error('the expected chip "' + a + '" is not on the board (' + st.chips.join('/') + ') — the board is showing another locale\'s chips');
  return a;
}

module.exports = {
  steps: [
    {
      name: 'picked',
      async drive(page) {
        await reset(page);
        const st = await state(page);
        if (!st) throw new Error('could not read the round off window.' + G);
        const right = answerFor(st);
        /* pick a WRONG chip deliberately: the interesting question for this phase is
           whether the board gives anything away before Check, and a wrong selection is
           the state that would expose it. */
        const wrong = st.chips.filter(function (c) { return c !== right; })[0];
        if (!(await tapChip(page, wrong))) throw new Error('chip "' + wrong + '" absent');
        await new Promise((r) => setTimeout(r, 150));

        const m = await page.evaluate((g) => {
          const p = document.querySelector('.lcs-activity-prompt');
          const chk = document.querySelector('.lcs-activity-check');
          return {
            sel: window[g].sel,
            selected: document.querySelectorAll('.hwb-chip.hwb-sel').length,
            graded: document.querySelectorAll('.hwb-chip.hwb-correct, .hwb-chip.hwb-right, .hwb-chip.hwb-wrong, .hwb-chip.hwb-bad').length,
            celebrated: !!(p && p.classList.contains('celebrate')),
            checkShown: !!(chk && chk.offsetParent !== null),
            gapIntact: (document.querySelector('.hwb-senttxt') || {}).textContent.indexOf('___') >= 0,
            /* ⭐⭐ A SELECTION IS NOT A VERDICT. This frame used to paint the child's own
               choice in the screen's try-again colour the instant they committed, so `picked`
               and `missed` rendered identically. Assert the RESOLVED colour — the class list
               would look correct either way. */
            selBorder: (function () { var e = document.querySelector('.hwb-chip.hwb-sel'); return e ? getComputedStyle(e).borderTopColor : null; })(),
          };
        }, G);

        if (!m.sel) throw new Error('the tap did not select');
        if (m.selected !== 1) throw new Error('expected exactly 1 selected chip, saw ' + m.selected);
        /* ⭐ the leak assertion: nothing may be graded before Check */
        if (m.graded) throw new Error(m.graded + ' chip(s) marked BEFORE Check — the board is grading a selection');
        if (m.celebrated) throw new Error('a wrong selection celebrated before Check');
        if (!m.checkShown) throw new Error('the shell Check button is not available after a selection');
        /* ⚠ this deck never fills the gap — assert that, so a future change that DOES
           fill it is noticed here rather than silently altering seven locales. */
        if (!m.gapIntact) throw new Error('the gap was filled on selection — this deck has never done that, in any locale');
        if (m.selBorder === 'rgb(242, 120, 75)') throw new Error('the SELECTED chip wears the try-again colour before Check — a selection is not a verdict');
        if (m.selBorder === 'rgb(47, 165, 106)') throw new Error('the SELECTED chip wears the success colour before Check — the board is grading a selection');
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
        const right = answerFor(st);
        const wrong = st.chips.filter(function (c) { return c !== right; })[0];
        if (!(await tapChip(page, wrong))) throw new Error('chip "' + wrong + '" absent');
        await new Promise((r) => setTimeout(r, 120));
        await page.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); if (c && !c.disabled) c.click(); });
        await new Promise((r) => setTimeout(r, 280));

        const m = await page.evaluate(() => {
          const p = document.querySelector('.lcs-activity-prompt');
          return {
            tryagain: !!(p && p.classList.contains('tryagain')),
            celebrated: !!(p && p.classList.contains('celebrate')),
            /* ⭐ the class is not the message. Assert the hint TEXT is on screen, because
               the shell blanks the span when it auto-dismisses — the exact state the wide
               viewports would otherwise photograph. */
            hintText: (function () { const h = document.querySelector('.lcs-activity-prompt-hint'); return h ? h.textContent.trim() : ''; })(),
            marked: document.querySelectorAll('.hwb-chip.hwb-correct, .hwb-chip.hwb-right, .hwb-chip.hwb-wrong, .hwb-chip.hwb-bad').length,
            stillSelected: document.querySelectorAll('.hwb-chip.hwb-sel').length,
            tried: document.querySelectorAll('.hwb-chip.hwb-tried').length,
            triedBorder: (function () { var e = document.querySelector('.hwb-chip.hwb-tried'); return e ? getComputedStyle(e).borderTopColor : null; })(),
          };
        });

        if (m.celebrated) throw new Error('a WRONG answer celebrated in ' + st.id);
        if (!m.tryagain) throw new Error('a wrong answer did not put the prompt into try-again');
        if (!m.hintText) throw new Error('the try-again HINT LINE is empty — the shell auto-dismissed it before this frame was photographed (lcs-shell.js:885)');
        /* ⚠ and it must still not reveal WHICH chip is right */
        if (m.marked) throw new Error(m.marked + ' chip(s) marked after a WRONG answer — this deck grades in the prompt, not on the board');
        if (m.stillSelected !== 1) throw new Error('the tapped chip lost its selection after Check — the child cannot see what they tried');
        if (m.tried !== 1) throw new Error('expected exactly 1 chip marked as tried, saw ' + m.tried);
        if (m.triedBorder !== 'rgb(242, 120, 75)') throw new Error('the tapped chip is not wearing the try-again colour — got ' + m.triedBorder);
        return true;
      },
    },
    {
      /* ⚠ TERMINAL. After Check the round is answered, Next replaces Check, and the four
         chips remain on screen but are no longer the live control. `terminal` relaxes only
         the two gates that cannot apply to a win screen (NO-CONTROLS-MEASURED and TAP) and
         leaves CUT-OFF, OVERFLOW, TINY and SPARSE running; the assertions below replace them. */
      name: 'resolved',
      terminal: true,
      async drive(page) {
        await reset(page);
        const st = await state(page);
        if (!st) throw new Error('could not read the round off window.' + G);
        const right = answerFor(st);
        if (!(await tapChip(page, right))) throw new Error('the fitting chip "' + right + '" is absent');
        await new Promise((r) => setTimeout(r, 120));
        await page.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); if (c && !c.disabled) c.click(); });
        await new Promise((r) => setTimeout(r, 280));

        const m = await page.evaluate(() => {
          const p = document.querySelector('.lcs-activity-prompt');
          const nxt = document.querySelector('.lcs-activity-next');
          const chk = document.querySelector('.lcs-activity-check');
          return {
            celebrated: !!(p && p.classList.contains('celebrate')),
            tryagain: !!(p && p.classList.contains('tryagain')),
            nextShown: !!(nxt && nxt.offsetParent !== null),
            checkHidden: !chk || chk.offsetParent === null,
            chips: document.querySelectorAll('.hwb-chip').length,
            sentence: !!document.querySelector('.hwb-sent'),
            right: document.querySelectorAll('.hwb-chip.hwb-right').length,
            rightBorder: (function () { var e = document.querySelector('.hwb-chip.hwb-right'); return e ? getComputedStyle(e).borderTopColor : null; })(),
          };
        });

        if (m.tryagain) throw new Error('the FITTING chip "' + right + '" was graded wrong in ' + st.id + ' — if this fires in every round, REL_CONJ_' + st.lang.toUpperCase() + ' disagrees with the manifest relations');
        if (!m.celebrated) throw new Error('the fitting chip did not celebrate in ' + st.id);
        if (!m.nextShown) throw new Error('Next did not appear after a correct answer');
        if (!m.checkHidden) throw new Error('Check is still visible after the round resolved');
        if (m.chips !== 4) throw new Error('expected 4 chips on the resolved card, saw ' + m.chips);
        if (!m.sentence) throw new Error('the sentence card vanished from the resolved screen');
        if (m.right !== 1) throw new Error('expected exactly 1 chip wearing the success mark, saw ' + m.right);
        /* ⭐ assert the RESOLVED colour, never the class: .hwb-sel/.hwb-tried/.hwb-right are all
           two-class rules, so a reordering reverts the meaning silently. */
        if (m.rightBorder !== 'rgb(47, 165, 106)') throw new Error('the fitting chip is not wearing the success colour — got ' + m.rightBorder);
        return true;
      },
    },
  ],
};
