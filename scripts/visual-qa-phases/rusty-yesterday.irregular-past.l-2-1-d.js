/* =====================================================================
   visual-qa phase driver — rusty-yesterday / irregular-past (L.2.1.d)
   sv = «Murklas ordsluss» · Lgr22 åk 3 · Språkliga strukturer och normer

   ⚠⚠ EIGHT LOCALES HAVE SHIPPED AND ONLY THE OPENING FRAME HAS EVER BEEN PHOTOGRAPHED,
   in one language. This is the third consecutive engine in the Swedish fan-out with no
   phase driver — the pattern, not a coincidence.

   ⭐ What the missing frames hide here. `answerType:'state'`, so nothing is graded until
   Check, and the whole visible life of a round happens in three states this file drives:
     open      — Murkla, the speech line, «I dag {verb} jag.» with the verb in bold, the
                 gapped «I går ___ jag.» beneath it, and three word cards.
     picked    — one card SELECTED. ⚠ As shipped, `.ryd-opt.ryd-sel` was `#F2784B` —
                 byte-identical to `--lcs-accent`, the shell's `.tryagain` ink — so the
                 board painted the child's own neutral choice in the REJECTION colour the
                 instant they committed, and then never changed again, making picked /
                 wrong / right ONE colour. This frame is where that was visible and where
                 a regression would be.
     missed    — a wrong card + Check. ⭐⭐ Only the TAPPED card may be marked; marking
                 the correct one prints the answer. The hint must be the one that fits
                 THIS class of wrong answer: «sprungit» is not wrong, it is the har-word.
     resolved  — Check on the past-tense card: the prompt celebrates, Next replaces Check.

   ⚠⚠ THE TARGET IS DERIVED HERE, NOT ASKED OF THE CORE. `choices.findIndex(c => c.word
   === correct)` is the entire computation, so this driver holds it independently — a
   driver that asks the thing under test what the answer is cannot notice when the thing
   under test is wrong.

   ⚠⚠ A FREEZE IS REQUIRED. `lcs-shell.js:883` clears `.tryagain` and blanks the hint
   after 1800 ms while the harness drives a phase ONCE and then sweeps six viewports, so
   without it the wider viewports photograph a state that has already auto-dismissed.
   ===================================================================== */
'use strict';

const G = 'RustyYesterdayActivity';
const CORAL = 'rgb(242, 120, 75)';   // --lcs-accent, the try-again ink

/* ⚠ Filtered to the exact 1800 ms delay rather than stubbing setTimeout wholesale — a
   blanket stub would be the ban-too-wide trap in a new place, and this activity also
   uses a 320 ms timer to speak the sentence on mount. */
async function freezeAutoDismiss(page) {
  await page.evaluate(() => {
    if (window.__lcsFrozeAutoDismiss) return;
    window.__lcsFrozeAutoDismiss = true;
    const real = window.setTimeout;
    window.setTimeout = function (fn, ms) {
      if (ms === 1800) return 0;          // lcs-shell.js:883 — the .tryagain auto-dismiss
      return real.apply(window, arguments);
    };
  });
}

const state = (page) => page.evaluate((g) => {
  const t = window[g], r = t && t.round;
  if (!r) return null;
  return {
    id: r.id,
    present: r.present,
    correct: r.correct,
    choices: r.choices.map((c) => ({ word: c.word, cls: c.cls || null })),
    lang: (t.api && t.api.lang) || 'en',
    cards: Array.prototype.map.call(document.querySelectorAll('.ryd-opt'),
      (b) => ({ id: +b.getAttribute('data-id'), text: b.textContent.trim() }))
  };
}, G);

/* Re-run the round from scratch so each phase photographs a CLEAN state instead of one
   carrying the previous phase's selection — a leftover mark is exactly what a critic
   reasonably reads as a defect in the activity rather than in the driver. */
async function reset(page) {
  await page.evaluate((g) => { const t = window[g]; t.setupTask(t.round); t.render(); }, G);
  await new Promise((r) => setTimeout(r, 120));
}

const tapCard = (page, id) => page.evaluate((x) => {
  const b = document.querySelector('.ryd-opt[data-id="' + x + '"]');
  if (!b) return false;
  b.click(); return true;
}, id);

const pressCheck = (page) => page.evaluate(() => {
  const c = document.querySelector('.lcs-activity-check');
  if (!c || c.disabled) return false;
  c.click(); return true;
});

/* the target, derived — never read off the core */
function pick(st) {
  const right = st.choices.findIndex((c) => c.word === st.correct);
  if (right < 0) throw new Error('no choice equals correct ("' + st.correct + '") in ' + st.id);
  if (!st.cards.some((c) => c.id === right)) {
    throw new Error('the past-tense card (index ' + right + ') is not on the board.\n    rendered: ' +
      st.cards.map((c) => c.id + ':' + c.text).join(' ') +
      '\n    → if this fires in every round, the wrong pool is loaded for this locale.');
  }
  /* ⚠ Prefer a wrong card that carries a response CLASS, so the `missed` frame
     photographs a class-specific message rather than the generic fallback. */
  const wrongs = st.choices.map((c, i) => ({ i, cls: c.cls })).filter((x) => x.i !== right);
  const chosen = wrongs.find((x) => x.cls) || wrongs[0];
  if (!chosen) throw new Error('no wrong card in ' + st.id);
  return { right, wrong: chosen.i, wrongCls: chosen.cls };
}

const marks = (page) => page.evaluate((g) => {
  const p = document.querySelector('.lcs-activity-prompt');
  const chk = document.querySelector('.lcs-activity-check');
  const hint = document.querySelector('.lcs-activity-prompt-hint');
  const sel = document.querySelector('.ryd-opt.ryd-sel');
  const q = (s) => Array.prototype.map.call(document.querySelectorAll(s), (b) => +b.getAttribute('data-id'));
  return {
    sel: window[g].sel,
    selected: q('.ryd-opt.ryd-sel'),
    tried: q('.ryd-opt.ryd-tried'),
    right: q('.ryd-opt.ryd-right'),
    celebrated: !!(p && p.classList.contains('celebrate')),
    triedAgain: !!(p && p.classList.contains('tryagain')),
    checkShown: !!(chk && chk.offsetParent !== null),
    hint: hint ? hint.textContent.trim() : '',
    selBorder: sel ? getComputedStyle(sel).borderTopColor : null
  };
}, G);

module.exports = {
  steps: [
    {
      name: 'picked',
      async drive(page) {
        await freezeAutoDismiss(page);
        await reset(page);
        const st = await state(page);
        if (!st) throw new Error('could not read the round off window.' + G);
        const { right, wrong } = pick(st);
        /* Pick a WRONG card deliberately: the question this frame answers is whether the
           board gives anything away before Check, and a wrong selection exposes it. */
        if (!(await tapCard(page, wrong))) throw new Error('card ' + wrong + ' absent');
        await new Promise((r) => setTimeout(r, 150));

        const m = await marks(page);
        if (m.sel == null) throw new Error('the tap did not select');
        if (m.selected.length !== 1) throw new Error('expected exactly 1 selected card, saw ' + m.selected.length);
        if (m.selected[0] !== wrong) throw new Error('the selection landed on card ' + m.selected[0] + ', not the tapped ' + wrong);
        /* ⭐ the leak assertion: nothing may be graded before Check */
        if (m.tried.length || m.right.length) throw new Error((m.tried.length + m.right.length) + ' card(s) marked BEFORE Check — the board is grading a selection');
        if (m.celebrated) throw new Error('celebrating before Check');
        if (!m.checkShown) throw new Error('Check is not on screen with a selection made');
        /* ⚠ the shipped defect this build fixes: a NEUTRAL selection must not wear the
           try-again ink, or the child is told they are wrong for choosing at all. */
        if (m.selBorder === CORAL) throw new Error('the selected card is drawn in ' + CORAL + ' — that is --lcs-accent, the try-again ink');
      }
    },
    {
      name: 'missed',
      async drive(page) {
        await freezeAutoDismiss(page);
        await reset(page);
        const st = await state(page);
        const { right, wrong, wrongCls } = pick(st);
        await tapCard(page, wrong);
        if (!(await pressCheck(page))) throw new Error('Check was not clickable with a selection made');
        await new Promise((r) => setTimeout(r, 220));

        const m = await marks(page);
        if (!m.triedAgain) throw new Error('a wrong card did not produce try-again');
        if (m.celebrated) throw new Error('a wrong card celebrated');
        /* ⭐⭐ only the TAPPED card may be marked. Marking the correct one prints the answer. */
        if (m.right.indexOf(right) >= 0) throw new Error('the CORRECT card is marked green after a wrong pick — the answer is on screen');
        if (m.tried.length !== 1 || m.tried[0] !== wrong) throw new Error('expected the tapped card ' + wrong + ' marked, saw [' + m.tried.join(',') + ']');
        if (!m.hint) throw new Error('no hint text on a wrong answer');
        if (/^hint[A-Z]/.test(m.hint)) throw new Error('the hint rendered as the raw KEY "' + m.hint + '" — that string is missing for ' + st.lang);
        /* the response must fit THIS class of wrong answer; sv ships three */
        if (st.lang === 'sv' && wrongCls === 'har' && !/har-ordet/.test(m.hint)) {
          throw new Error('tapping the har-word did not get the har-word message — got "' + m.hint + '"');
        }
        if (st.lang === 'sv' && wrongCls === 'att' && !/att-ordet/.test(m.hint)) {
          throw new Error('tapping the att-word did not get the att-word message — got "' + m.hint + '"');
        }
      }
    },
    {
      name: 'resolved',
      async drive(page) {
        await freezeAutoDismiss(page);
        await reset(page);
        const st = await state(page);
        const { right } = pick(st);
        await tapCard(page, right);
        if (!(await pressCheck(page))) throw new Error('Check was not clickable with the past-tense card selected');
        await new Promise((r) => setTimeout(r, 260));

        const m = await marks(page);
        if (!m.celebrated) throw new Error('the past-tense card did not celebrate');
        if (m.triedAgain) throw new Error('the past-tense card produced try-again');
        if (m.right.indexOf(right) < 0) throw new Error('the past-tense card is not marked right on the win frame');
        if (m.tried.length) throw new Error('a card is still marked as tried on the win frame');
        /* ⭐⭐ THE PAYOFF IS READING THE SENTENCE WHOLE, so assert the gap is FILLED —
           not merely that the line is present. On sv #31 I asserted the opposite ("the
           gap must still be a gap") and the visual critic had to correct me; this deck
           shipped with the same defect until it was read at 360px. es and pt carry no
           slot in their template, so they are exempt by construction. */
        const yest = await page.$eval('.ryd-yest', (e) => e.textContent.trim()).catch(() => '');
        if (!yest) throw new Error('the yesterday line is gone on the win frame — the payoff is reading the sentence');
        if (['es', 'pt'].indexOf(st.lang) < 0) {
          if (/___|…/.test(yest)) throw new Error('the win frame still shows a GAP ("' + yest + '") — the child never sees the finished sentence');
          if (yest.indexOf(st.correct) < 0) throw new Error('the win frame does not contain the past-tense word "' + st.correct + '" — got "' + yest + '"');
        }
      }
    }
  ]
};
