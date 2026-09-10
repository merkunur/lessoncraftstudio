/* =====================================================================
   visual-qa phase driver — robin-mirror / reflexive (L.2.1.c)
   sv = «Kottes ordspegel» · Lgr22 åk 3 · Språkliga strukturer och normer

   ⚠⚠ SEVEN DECKS HAVE SHIPPED AND ONLY THE OPENING FRAME HAS EVER BEEN
   PHOTOGRAPHED. Without a driver the harness takes the open state and nothing
   else, and it writes those files BARE-NAMED, which by its own convention means
   English — so de, fr, es, pt, it and nl have never been rendered at all, and
   neither the chosen state, the wrong-answer state nor the win screen has been
   seen in ANY locale.

   Four screens, of which only the first had been seen:

     open      — Kotte, the speech bubble carrying the rule, the sentence card
                 with its gap, and three word chips.
     picked    — one chip SELECTED. ⭐ answerType:'state', so nothing is graded until
                 Check: this frame must give away NOTHING about whether the choice is
                 right. As shipped, `.rmr-sel` was CORAL — the try-again ink — so the
                 board painted the child's own choice in the rejection colour the
                 instant they committed, and `C.GOOD` sat declared and never used, the
                 fossil of a correct-state that was never built. Fourth appearance of
                 the sv #28 blocker.
     missed    — tap a wrong chip → Check. ⭐⭐ The state a child hits most, and the one
                 no sweep could see. Only the TAPPED chip may be marked: marking the
                 correct one here prints the answer.
     resolved  — Check on the right chip: the prompt celebrates, Next replaces Check.

   ⚠⚠ THE EXPECTED CHIP IS COMPUTED FROM THE ROUND DATA AGAINST THIS FILE'S OWN
   TABLE, NEVER FROM THE CORE. `reflexive-pronoun-core.js` holds the ENGLISH table
   only and the activity routes every other locale through its own REFL_L10N, so
   `Core.oracle()` returns the EMPTY STRING on all seven — a driver that asked it
   would silently tap nothing and photograph the open frame under three other names.

   ⚠⚠ A FREEZE IS REQUIRED. `lcs-shell.js:883` clears `.tryagain` and blanks the hint
   after 1800 ms, while the harness drives a phase ONCE and then sweeps six viewports.
   Without it the wider viewports photograph a state that has already auto-dismissed,
   and a critic correctly reports "the wrong-answer feedback does not appear at
   desktop" about a defect living in THIS FILE.
   ===================================================================== */
'use strict';

const G = 'RobinMirrorActivity';

/* Per-locale subject -> form. Independent ground truth, mirroring REFL_L10N in the
   activity and the declared tables in scripts/verify-reflexive-pronoun-core.js.
   ⚠ Swedish collapses han/hon/den/det/de onto `sig`, and mig/dig/oss/er are the
   ordinary object pronouns — which is why its deck is a subject-finding ladder
   rather than a flat paradigm fan-out. */
const TABLE = {
  en: { i: 'myself', you: 'yourself', he: 'himself', she: 'herself', we: 'ourselves', they: 'themselves', it: 'itself' },
  de: { ich: 'mich', du: 'dich', er: 'sich', sie: 'sich', es: 'sich', wir: 'uns', ihr: 'euch' },
  fr: { je: 'me', tu: 'te', il: 'se', elle: 'se', on: 'se', nous: 'nous', vous: 'vous', ils: 'se', elles: 'se' },
  es: { yo: 'me', tu: 'te', el: 'se', ella: 'se', ellos: 'se', ellas: 'se', nosotros: 'nos', ustedes: 'se' },
  pt: { eu: 'me', voce: 'se', ele: 'se', ela: 'se', a_gente: 'se', nos: 'nos', voces: 'se', eles: 'se', elas: 'se' },
  it: { io: 'mi', tu: 'ti', lui: 'si', lei: 'si', noi: 'ci', voi: 'vi', loro: 'si' },
  nl: { ik: 'me', jij: 'je', hij: 'zich', zij: 'zich', het: 'zich', wij: 'ons' },
  sv: { jag: 'mig', du: 'dig', han: 'sig', hon: 'sig', den: 'sig', det: 'sig', de: 'sig', vi: 'oss', ni: 'er' },
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
    sentence: r.sentence,
    referent: r.referent,
    lang: (t.api && t.api.lang) || 'en',
    chips: Array.prototype.map.call(document.querySelectorAll('.rmr-chip'), (b) => b.getAttribute('data-w')),
  };
}, G);

/* Re-run the round from scratch so each phase photographs a CLEAN state instead of one
   carrying the previous phase's selection — a leftover selection is exactly what a
   critic reasonably reads as a defect in the activity rather than in the driver. */
async function reset(page) {
  await page.evaluate((g) => { const t = window[g]; t.setupTask(t.round); t.render(); }, G);
  await new Promise((r) => setTimeout(r, 120));
}

const tapChip = (page, w) => page.evaluate((x) => {
  const b = document.querySelector('.rmr-chip[data-w="' + CSS.escape(x) + '"]');
  if (!b) return false;
  b.click(); return true;
}, w);

/* Which rendered chip is the right one? Resolved through THIS file's table, so a
   locale missing from the activity's REFL_L10N is named rather than followed. */
function pick(st) {
  const tbl = TABLE[st.lang];
  if (!tbl) throw new Error('no declared table for locale "' + st.lang + '" — this driver is behind the activity');
  const want = tbl[st.referent];
  if (!want) throw new Error('referent "' + st.referent + '" is not in the declared ' + st.lang + ' table');
  if (st.chips.indexOf(want) < 0) {
    throw new Error('the correct form "' + want + '" is not on the board.\n    rendered chips: ' + st.chips.join(' / ') +
      '\n    → if this fires in every round, REFL_L10N has no "' + st.lang + '" entry and the ENGLISH core is building the chips.');
  }
  return { right: want, wrong: st.chips.find((c) => c !== want) };
}

/* ⭐ No STANDING chrome may wear one of the three state inks as a border. The
   sentence panel shipped with a permanent GOLD border — the same ink that means
   "I chose this" — so the child met the chosen-colour on every frame before
   choosing anything. Scoped to BORDERS outside the chips: `.rmr-ask` legitimately
   uses the coral TEXT colour, and banning that would be the ban-too-wide trap. */
const chromeInk = (page) => page.evaluate(() => {
  const out = [];
  document.querySelectorAll('.rmr-root *').forEach((el) => {
    if (el.classList.contains('rmr-chip')) return;
    if (el.closest('.rmr-chip')) return;
    const c = getComputedStyle(el).borderTopColor;
    const w = parseFloat(getComputedStyle(el).borderTopWidth) || 0;
    if (w > 0) out.push({ cls: el.className, c });
  });
  return out;
});

module.exports = {
  steps: [
    {
      name: 'picked',
      async drive(page) {
        await reset(page);
        const st = await state(page);
        if (!st) throw new Error('could not read the round off window.' + G);
        if (st.chips.length !== 3) throw new Error('expected 3 chips, saw ' + st.chips.length);
        if (new Set(st.chips).size !== 3) throw new Error('the chips are not distinct (' + st.chips.join('/') + ') — two referents collapse onto one form');
        const { wrong } = pick(st);
        /* Pick a WRONG chip deliberately: the question this frame answers is whether the
           board gives anything away before Check, and a wrong selection exposes it. */
        if (!(await tapChip(page, wrong))) throw new Error('chip "' + wrong + '" absent');
        await new Promise((r) => setTimeout(r, 150));

        const m = await page.evaluate((g) => {
          const p = document.querySelector('.lcs-activity-prompt');
          const chk = document.querySelector('.lcs-activity-check');
          const sel = document.querySelector('.rmr-chip.rmr-sel');
          return {
            sel: window[g].sel,
            selected: document.querySelectorAll('.rmr-chip.rmr-sel').length,
            graded: document.querySelectorAll('.rmr-chip.rmr-right, .rmr-chip.rmr-tried').length,
            celebrated: !!(p && p.classList.contains('celebrate')),
            checkShown: !!(chk && chk.offsetParent !== null),
            selBorder: sel ? getComputedStyle(sel).borderTopColor : null,
          };
        }, G);

        if (m.sel == null) throw new Error('the tap did not select');
        if (m.selected !== 1) throw new Error('expected exactly 1 selected chip, saw ' + m.selected);
        /* ⭐ the leak assertion: nothing may be graded before Check */
        if (m.graded) throw new Error(m.graded + ' chip(s) marked BEFORE Check — the board is grading a selection');
        if (m.celebrated) throw new Error('a wrong selection celebrated before Check');
        if (!m.checkShown) throw new Error('the shell Check button is not available after a selection');
        /* ⭐⭐ A SELECTION IS NOT A VERDICT — assert the RESOLVED colour, because
           .rmr-sel/.rmr-tried/.rmr-right are all two-class rules of equal specificity
           and a reordering reverts the meaning silently. */
        if (m.selBorder === CORAL) throw new Error('the SELECTED chip wears the try-again colour before Check — a selection is not a verdict');
        if (m.selBorder === GOOD) throw new Error('the SELECTED chip wears the success colour before Check — the board is grading a selection');
        if (m.selBorder !== GOLD) throw new Error('the selected chip is not wearing the "chosen" colour — got ' + m.selBorder);

        /* ⭐ and the chosen ink must not also be standing chrome */
        for (const el of await chromeInk(page)) {
          if (el.c === GOLD || el.c === CORAL || el.c === GOOD) {
            throw new Error('standing chrome (' + el.cls + ') wears a STATE ink (' + el.c +
              ') — gold/coral/green must mean chosen/tried/right and nothing else');
          }
        }
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
        if (!(await tapChip(page, wrong))) throw new Error('chip "' + wrong + '" absent');
        await new Promise((r) => setTimeout(r, 120));
        await page.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); if (c && !c.disabled) c.click(); });
        await new Promise((r) => setTimeout(r, 280));

        const m = await page.evaluate((rightWord) => {
          const p = document.querySelector('.lcs-activity-prompt');
          const tried = document.querySelector('.rmr-chip.rmr-tried');
          return {
            tryagain: !!(p && p.classList.contains('tryagain')),
            celebrated: !!(p && p.classList.contains('celebrate')),
            /* ⭐ the class is not the message — the shell BLANKS the hint span when it
               auto-dismisses, which is the state the wide viewports would photograph. */
            hintText: (() => { const h = document.querySelector('.lcs-activity-prompt-hint'); return h ? h.textContent.trim() : ''; })(),
            tried: document.querySelectorAll('.rmr-chip.rmr-tried').length,
            triedIsTheTappedOne: !!tried && tried.getAttribute('data-w') !== rightWord,
            rightMarked: document.querySelectorAll('.rmr-chip.rmr-right').length,
            stillSelected: document.querySelectorAll('.rmr-chip.rmr-sel').length,
            triedBorder: tried ? getComputedStyle(tried).borderTopColor : null,
          };
        }, right);

        if (m.celebrated) throw new Error('a WRONG chip celebrated in ' + st.id);
        if (!m.tryagain) throw new Error('a wrong chip did not put the prompt into try-again');
        if (!m.hintText) throw new Error('the try-again HINT LINE is empty — the shell auto-dismissed it before this frame was photographed (lcs-shell.js:883)');
        if (m.tried !== 1) throw new Error('expected exactly 1 chip marked as tried, saw ' + m.tried);
        if (!m.triedIsTheTappedOne) throw new Error('the TRIED mark is on the correct chip — the board is printing the answer');
        if (m.rightMarked) throw new Error(m.rightMarked + ' chip(s) marked correct after a WRONG answer — that prints the answer');
        if (m.stillSelected !== 1) throw new Error('the tapped chip lost its selection after Check — the child cannot see what they tried');
        if (m.triedBorder !== CORAL) throw new Error('the tapped chip is not wearing the try-again colour — got ' + m.triedBorder);
        return true;
      },
    },
    {
      /* ⚠ TERMINAL. After Check the round is answered and Next replaces Check, so the
         chips remain on screen but are no longer the live control. `terminal` relaxes only
         the two gates that cannot apply to a win screen (NO-CONTROLS-MEASURED and TAP) and
         leaves CUT-OFF, OVERFLOW, TINY and SPARSE running; the assertions below replace them. */
      name: 'resolved',
      terminal: true,
      async drive(page) {
        await reset(page);
        const st = await state(page);
        if (!st) throw new Error('could not read the round off window.' + G);
        const { right } = pick(st);
        if (!(await tapChip(page, right))) throw new Error('the correct chip "' + right + '" is absent');
        await new Promise((r) => setTimeout(r, 120));
        await page.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); if (c && !c.disabled) c.click(); });
        await new Promise((r) => setTimeout(r, 280));

        const m = await page.evaluate(() => {
          const p = document.querySelector('.lcs-activity-prompt');
          const nxt = document.querySelector('.lcs-activity-next');
          const chk = document.querySelector('.lcs-activity-check');
          const ok = document.querySelector('.rmr-chip.rmr-right');
          return {
            celebrated: !!(p && p.classList.contains('celebrate')),
            tryagain: !!(p && p.classList.contains('tryagain')),
            nextShown: !!(nxt && nxt.offsetParent !== null),
            checkHidden: !chk || chk.offsetParent === null,
            chips: document.querySelectorAll('.rmr-chip').length,
            right: document.querySelectorAll('.rmr-chip.rmr-right').length,
            rightBorder: ok ? getComputedStyle(ok).borderTopColor : null,
            sentence: (() => { const s = document.querySelector('.rmr-senttxt'); return s ? s.textContent.trim() : ''; })(),
          };
        });

        if (m.tryagain) throw new Error('the CORRECT chip was graded wrong in ' + st.id +
          ' — if this fires in every round, this locale\'s table disagrees with the activity\'s REFL_L10N');
        if (!m.celebrated) throw new Error('the correct chip did not celebrate in ' + st.id);
        if (!m.nextShown) throw new Error('Next did not appear after a correct answer');
        if (!m.checkHidden) throw new Error('Check is still visible after the round resolved');
        if (m.chips !== 3) throw new Error('expected 3 chips on the resolved screen, saw ' + m.chips);
        if (m.right !== 1) throw new Error('expected exactly 1 chip wearing the success mark, saw ' + m.right);
        if (m.rightBorder !== GOOD) throw new Error('the correct chip is not wearing the success colour — got ' + m.rightBorder);
        /* ⭐⭐ THE SENTENCE MUST BE COMPLETE HERE, AND MY FIRST VERSION ASSERTED THE
           OPPOSITE. I wrote "the gap must still be a gap" reasoning that filling it would
           print the answer — but this frame is reached only AFTER the round is won, so it
           prints nothing the child has not already earned, and seeing
           «Jag bryr mig om hunden.» WHOLE is the payoff: it is the moment the rule becomes
           a sentence. The critic caught that the child was being made to assemble it in
           their head from two separate places on the screen. An assertion can encode the
           wrong intent perfectly and stay green forever. */
        if (m.sentence.indexOf('___') >= 0) throw new Error('the win screen still shows a gap — the sentence is never completed, so the child never sees the rule as a whole sentence');
        if (m.sentence.indexOf(right) < 0) throw new Error('the win screen completed the sentence with something other than "' + right + '": ' + m.sentence);
        return true;
      },
    },
  ],
};
