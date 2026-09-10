/* =====================================================================
   visual-qa phase driver — cleo-packing-list / series-commas (L.1.2.b)
   sv = «Rankas listträd» · Lgr22 åk 2 · Språkliga strukturer och normer

   ⚠⚠ SEVEN DECKS HAVE SHIPPED AND NOT ONE NON-ENGLISH FRAME HAS EVER BEEN
   PHOTOGRAPHED. Without a driver the harness takes only the OPENING frame, so the
   24 files on disk are 8 rounds × 3 widths × ONE phase, all bare-named — which by
   the harness's own convention means English. de, fr, es, pt, it and nl had ZERO
   renders. The runner says so itself (visual-qa-activity.js:489): "phases: open
   ONLY … NOTHING below has ever seen it."
   ⭐ Adding the locales alone (before any phase) immediately found a live defect in
   two of them: `.cpl-say` clamped the chameleon's line to 2 at max-width 74%, and
   the German and Spanish tips were losing 16-17px at 360 AND 412. Nobody had ever
   looked, because nobody had ever rendered them.

   Four screens, of which only the first had been seen:

     open      — the chameleon, its speech bubble carrying the rule, and three
                 sentence cards that differ ONLY in where the commas sit.
     picked    — one card SELECTED (`.cpl-sel`). ⭐ answerType:'state', so nothing is
                 graded until Check: this frame must reveal NOTHING about whether the
                 choice is right. As shipped it revealed the opposite of nothing —
                 `.cpl-sel` was CORAL, the try-again colour, so the screen painted the
                 child's own choice in the rejection colour the instant they committed.
     missed    — tap → Check → WRONG. ⭐⭐ The state a child hits most, and the one no
                 sweep could see. As shipped, `picked` and `missed` rendered IDENTICALLY
                 and the board said nothing new at all after a wrong Check. Now: GOLD
                 chosen, CORAL wrong, GREEN right, and each phase asserts the RESOLVED
                 COLOUR rather than the class list.
     resolved  — Check on the correctly punctuated card: the prompt celebrates and Next
                 replaces Check.

   ⚠⚠ THE CORRECT CARD IS COMPUTED FROM THE ROUND DATA, NEVER FROM THE CORE.
   `series-comma-core.js` hardcodes the ENGLISH Oxford form (", and "), so asking it
   about any of the seven localized pools is meaningless. Every builder happens to put
   the correct form at `slot % 3`, so keying off `slot` would appear to work — and would
   be unable to notice a builder that ever stopped doing that. The table below rebuilds
   each locale's correct TEXT independently and matches it against the rendered card.

   ⚠ Swedish is the one locale with FOUR items and TWO commas: with three items the
   cards are character-identical up to the comma and a foil can only push it rightward,
   so "pick the earliest comma" solves de/fr/es/pt/it/nl 100% of the time. Four items
   let all three cards keep their FIRST comma in one place.

   ⚠⚠ A FREEZE IS REQUIRED. `lcs-shell.js:883` clears `.tryagain` and blanks the hint
   after 1800 ms, while the harness drives a phase ONCE and then sweeps six viewports.
   Without the freeze the wider viewports photograph a state that has already
   auto-dismissed, and a critic correctly reports "the wrong-answer feedback does not
   appear at desktop" about a defect living in THIS FILE.
   ===================================================================== */
'use strict';

const G = 'CleoPackingListActivity';

/* Per-locale correct form — independent ground truth, mirroring FORMS_BUILDER in the
   activity and the declared truth in scripts/verify-series-comma-core.js.
   ⚠ en is the ONLY locale with the serial comma before the conjunction. */
const CORRECT = {
  en: (r) => `${r.lead} ${r.items[0]}, ${r.items[1]}, and ${r.items[2]}.`,
  de: (r) => `${r.lead} ${r.items[0]}, ${r.items[1]} und ${r.items[2]}.`,
  fr: (r) => `${r.lead} ${r.items[0]}, ${r.items[1]} et ${r.items[2]}.`,
  es: (r) => `${r.lead} ${r.items[0]}, ${r.items[1]} y ${r.items[2]}.`,
  pt: (r) => `${r.lead} ${r.items[0]}, ${r.items[1]} e ${r.items[2]}.`,
  it: (r) => `${r.lead} ${r.items[0]}, ${r.items[1]} e ${r.items[2]}.`,
  nl: (r) => `${r.lead} ${r.items[0]}, ${r.items[1]} en ${r.items[2]}.`,
  /* four items, two commas: between each pair, none before the final «och» */
  sv: (r) => `${r.lead} ${r.items[0]}, ${r.items[1]}, ${r.items[2]} och ${r.items[3]}.`,
};

const GOLD = 'rgb(232, 165, 58)';
const CORAL = 'rgb(242, 120, 75)';
const GOOD = 'rgb(47, 165, 106)';

/* ⚠ Filtered to the exact 1800 ms delay rather than stubbing setTimeout wholesale —
   a blanket stub would be the ban-too-wide trap in a new place. */
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
    lead: r.lead,
    items: r.items,
    slot: r.slot,
    lang: (t.api && t.api.lang) || 'en',
    cards: Array.prototype.map.call(document.querySelectorAll('.cpl-opt'), (b) => ({
      id: b.getAttribute('data-id'), text: b.textContent.trim(),
    })),
  };
}, G);

/* Re-run the round from scratch so each phase photographs a CLEAN state instead of one
   carrying the previous phase's selection — a leftover selection is exactly what a
   critic reasonably reads as a defect in the activity rather than in the driver. */
async function reset(page) {
  await page.evaluate((g) => { const t = window[g]; t.setupTask(t.round); t.render(); }, G);
  await new Promise((r) => setTimeout(r, 120));
}

const tapCard = (page, id) => page.evaluate((x) => {
  const b = document.querySelector('.cpl-opt[data-id="' + x + '"]');
  if (!b) return false;
  b.click(); return true;
}, id);

/* Which rendered card is the correctly punctuated one? Matched on TEXT, so a builder
   that moved the correct form off `slot` would be caught rather than followed. */
function pick(st) {
  const build = CORRECT[st.lang];
  if (!build) throw new Error('no declared correct form for locale "' + st.lang + '" — the driver table is behind the activity');
  const want = build(st);
  const hit = st.cards.find((c) => c.text === want);
  if (!hit) {
    throw new Error('the correct form is not on the board.\n    expected: ' + want +
      '\n    rendered: ' + st.cards.map((c) => c.text).join('\n              ') +
      '\n    → if this fires in every round, FORMS_BUILDER has no entry for "' + st.lang +
      '" and the English core is building the cards (' + st.items.length + ' items in the data).');
  }
  const wrong = st.cards.find((c) => c.id !== hit.id);
  return { right: hit, wrong };
}

module.exports = {
  steps: [
    {
      name: 'picked',
      async drive(page) {
        await reset(page);
        const st = await state(page);
        if (!st) throw new Error('could not read the round off window.' + G);
        const { wrong } = pick(st);
        /* Pick a WRONG card deliberately: the question this frame answers is whether the
           board gives anything away before Check, and a wrong selection exposes it. */
        if (!(await tapCard(page, wrong.id))) throw new Error('card ' + wrong.id + ' absent');
        await new Promise((r) => setTimeout(r, 150));

        const m = await page.evaluate((g) => {
          const p = document.querySelector('.lcs-activity-prompt');
          const chk = document.querySelector('.lcs-activity-check');
          const sel = document.querySelector('.cpl-opt.cpl-sel');
          return {
            sel: window[g].sel,
            selected: document.querySelectorAll('.cpl-opt.cpl-sel').length,
            graded: document.querySelectorAll('.cpl-opt.cpl-right, .cpl-opt.cpl-tried').length,
            celebrated: !!(p && p.classList.contains('celebrate')),
            checkShown: !!(chk && chk.offsetParent !== null),
            selBorder: sel ? getComputedStyle(sel).borderTopColor : null,
          };
        }, G);

        if (m.sel == null) throw new Error('the tap did not select');
        if (m.selected !== 1) throw new Error('expected exactly 1 selected card, saw ' + m.selected);
        /* ⭐ the leak assertion: nothing may be graded before Check */
        if (m.graded) throw new Error(m.graded + ' card(s) marked BEFORE Check — the board is grading a selection');
        if (m.celebrated) throw new Error('a wrong selection celebrated before Check');
        if (!m.checkShown) throw new Error('the shell Check button is not available after a selection');
        /* ⭐⭐ A SELECTION IS NOT A VERDICT. This is the frame that shipped broken: the chosen
           card wore the try-again colour, so `picked` and `missed` were pixel-identical.
           Assert the RESOLVED colour — the class list would look correct either way. */
        if (m.selBorder === CORAL) throw new Error('the SELECTED card wears the try-again colour before Check — a selection is not a verdict');
        if (m.selBorder === GOOD) throw new Error('the SELECTED card wears the success colour before Check — the board is grading a selection');
        if (m.selBorder !== GOLD) throw new Error('the selected card is not wearing the "chosen" colour — got ' + m.selBorder);
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
        if (!(await tapCard(page, wrong.id))) throw new Error('card ' + wrong.id + ' absent');
        await new Promise((r) => setTimeout(r, 120));
        await page.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); if (c && !c.disabled) c.click(); });
        await new Promise((r) => setTimeout(r, 280));

        const m = await page.evaluate((rightId) => {
          const p = document.querySelector('.lcs-activity-prompt');
          const tried = document.querySelector('.cpl-opt.cpl-tried');
          return {
            tryagain: !!(p && p.classList.contains('tryagain')),
            celebrated: !!(p && p.classList.contains('celebrate')),
            /* ⭐ the class is not the message — the shell BLANKS the hint span when it
               auto-dismisses, which is the state the wide viewports would photograph. */
            hintText: (() => { const h = document.querySelector('.lcs-activity-prompt-hint'); return h ? h.textContent.trim() : ''; })(),
            tried: document.querySelectorAll('.cpl-opt.cpl-tried').length,
            triedIsTheTappedOne: !!tried && tried.getAttribute('data-id') !== rightId,
            rightMarked: document.querySelectorAll('.cpl-opt.cpl-right').length,
            stillSelected: document.querySelectorAll('.cpl-opt.cpl-sel').length,
            triedBorder: tried ? getComputedStyle(tried).borderTopColor : null,
          };
        }, right.id);

        if (m.celebrated) throw new Error('a WRONG card celebrated in ' + st.id);
        if (!m.tryagain) throw new Error('a wrong card did not put the prompt into try-again');
        if (!m.hintText) throw new Error('the try-again HINT LINE is empty — the shell auto-dismissed it before this frame was photographed (lcs-shell.js:883)');
        if (m.tried !== 1) throw new Error('expected exactly 1 card marked as tried, saw ' + m.tried);
        if (!m.triedIsTheTappedOne) throw new Error('the TRIED mark is on the correct card — the board is printing the answer');
        /* ⚠ and it must still not reveal WHICH card is right */
        if (m.rightMarked) throw new Error(m.rightMarked + ' card(s) marked correct after a WRONG answer — that prints the answer');
        if (m.stillSelected !== 1) throw new Error('the tapped card lost its selection after Check — the child cannot see what they tried');
        if (m.triedBorder !== CORAL) throw new Error('the tapped card is not wearing the try-again colour — got ' + m.triedBorder);
        return true;
      },
    },
    {
      /* ⚠ TERMINAL. After Check the round is answered and Next replaces Check, so the three
         cards remain on screen but are no longer the live control. `terminal` relaxes only the
         two gates that cannot apply to a win screen (NO-CONTROLS-MEASURED and TAP) and leaves
         CUT-OFF, OVERFLOW, TINY and SPARSE running; the assertions below replace them. */
      name: 'resolved',
      terminal: true,
      async drive(page) {
        await reset(page);
        const st = await state(page);
        if (!st) throw new Error('could not read the round off window.' + G);
        const { right } = pick(st);
        if (!(await tapCard(page, right.id))) throw new Error('the correct card ' + right.id + ' is absent');
        await new Promise((r) => setTimeout(r, 120));
        await page.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); if (c && !c.disabled) c.click(); });
        await new Promise((r) => setTimeout(r, 280));

        const m = await page.evaluate(() => {
          const p = document.querySelector('.lcs-activity-prompt');
          const nxt = document.querySelector('.lcs-activity-next');
          const chk = document.querySelector('.lcs-activity-check');
          const ok = document.querySelector('.cpl-opt.cpl-right');
          return {
            celebrated: !!(p && p.classList.contains('celebrate')),
            tryagain: !!(p && p.classList.contains('tryagain')),
            nextShown: !!(nxt && nxt.offsetParent !== null),
            checkHidden: !chk || chk.offsetParent === null,
            cards: document.querySelectorAll('.cpl-opt').length,
            right: document.querySelectorAll('.cpl-opt.cpl-right').length,
            rightBorder: ok ? getComputedStyle(ok).borderTopColor : null,
          };
        });

        if (m.tryagain) throw new Error('the CORRECTLY punctuated card was graded wrong in ' + st.id +
          ' — if this fires in every round, this locale\'s builder disagrees with the driver\'s declared correct form');
        if (!m.celebrated) throw new Error('the correct card did not celebrate in ' + st.id);
        if (!m.nextShown) throw new Error('Next did not appear after a correct answer');
        if (!m.checkHidden) throw new Error('Check is still visible after the round resolved');
        if (m.cards !== 3) throw new Error('expected 3 sentence cards on the resolved screen, saw ' + m.cards);
        if (m.right !== 1) throw new Error('expected exactly 1 card wearing the success mark, saw ' + m.right);
        /* ⭐ assert the RESOLVED colour, never the class: .cpl-sel/.cpl-tried/.cpl-right are all
           two-class rules of equal specificity, so a reordering reverts the meaning silently. */
        if (m.rightBorder !== GOOD) throw new Error('the correct card is not wearing the success colour — got ' + m.rightBorder);
        return true;
      },
    },
  ],
};
