/* =====================================================================
   visual-qa phase driver — sentence-clinic / fix-it (L.2.1 · Lgr22 åk 2)

   ⚠⚠ THE LARGEST UNPHOTOGRAPHED SURFACE IN THIS SERIES. Seven decks have
   shipped and no sweep had ever seen a single repair RESOLVE: without a
   driver the harness photographs only the OPENING frame, so the 21 renders
   on disk were 7 rounds × 3 widths × one phase. (They were also mislabelled
   — bare filenames, which by the harness's own convention means English,
   while the content is Italian: they predate the locale-suffix rule.)

   Three screens, of which only the first had ever been seen:

     open      — the faulty sentence as a row of chips, the owl, the pulse.
     nudge     — the round's WRONG-ANSWER response, whichever kind it has.
     resolved  — repaired in place, the rule caption beneath it, the owl's
                 eyes changed, and the shell's Check button APPEARING — a
                 layout change at every width that no gate had ever measured.

   ⭐⭐ WHY `nudge` IS ONE PHASE AND NOT TWO. I first wrote `alright` and
   `miss` as separate steps and the harness refused them: "the step ran but
   the screen did not change". It was right, and the reason is a real fact
   about this engine. The three SINGLE-TAP actions (capitalize, delete,
   split) resolve on a correct diagnosis, so they have no repair choice —
   a wrong tap routes to `_alright`, and there is no second, distinct
   "missed the repair" state to photograph. Only the chip actions (swap,
   insert-*) and reorder reach `_giggle`. So the two are not two phases of
   one round; they are the SAME phase wearing the response that round has.
   `nudge` prefers the repair miss (coral) where one exists and falls back
   to the diagnosis response (teal), which puts both message states in the
   sweep across the seven rounds.

   ⭐ And `nudge` is photographable at all only because of the `.sc-msg`
   line added in this build. `_alright` previously did `_setPose('examine')`
   — which collapses to 'idle', a NO-OP — plus a 520 Hz beep and an
   aria-live announce, so for a sighted child nothing on screen changed.

   ⚠⚠ A FREEZE IS REQUIRED HERE, unlike the pronoun driver. Measured: the
   `.sc-giggle` class is removed after 480 ms, the reorder miss path resets
   `placed` after 600 ms, and `_sparkle` removes itself after 700 ms. Three
   transient states, so the nudge frame would photograph itself away. The
   sentence-builder freeze pattern applies; sv #24's "no freeze needed"
   conclusion was specific to an activity with no setTimeout at all.
   Measure, do not pattern-match.

   ⚠ Controls are reached by MODEL INDEX or by the model's own value, never
   by matching rendered prose. `setupTask` seeds `_optOrder` from an id-hash
   so the repair tray is SHUFFLED; the reorder tray is NOT (it renders in
   descriptor order), which is exactly why its correctOrder may not be a
   reversal. Both facts are used below.
   ===================================================================== */
'use strict';

const G = 'SentenceClinicActivity';

/* Hold the three transient-state timers so a nudge survives long enough to be
   photographed at six viewports. Idempotent, applied once per page. */
async function freeze(page) {
  await page.evaluate(() => {
    if (window.__scFrozen) return;
    window.__scFrozen = true;
    const real = window.setTimeout;
    window.setTimeout = function (fn, ms) {
      /* 480 giggle / 600 reorder-reset / 700 sparkle are held; anything shorter is
         scheduling rather than animation and must still run. */
      if (typeof ms === 'number' && ms >= 400) return 0;
      return real.apply(window, arguments);
    };
  });
}

const round = (page) => page.evaluate((g) => {
  const r = window[g] && window[g].round;
  if (!r) return null;
  return { id: r.id, action: r.action, tokens: r.tokens, targetIndex: r.targetIndex, gapIndex: r.gapIndex, seamIndex: r.seamIndex, replacement: r.replacement, distractors: r.distractors, correctOrder: r.correctOrder };
}, G);

/* Re-run the round from scratch so each phase photographs a CLEAN state rather than one
   carrying the previous phase's leftovers — the sv #24 driver made exactly that mistake
   and the visual critic reasonably reported the leftover as a defect in the activity. */
async function reset(page) {
  await page.evaluate((g) => { const t = window[g]; t.setupTask(t.round); t._renderCard(); }, G);
  await new Promise((r) => setTimeout(r, 120));
}

const clickNth = (page, sel, i) => page.evaluate((s, k) => {
  const n = document.querySelectorAll(s);
  if (!n[k]) return false;
  n[k].click(); return true;
}, sel, i);

const clickOptValue = (page, val) => page.evaluate((v) => {
  const n = [...document.querySelectorAll('.sc-opt')].find((x) => x.textContent.trim() === v);
  if (!n) return false;
  n.click(); return true;
}, val);

/* the reorder tray renders unplaced tokens in DESCRIPTOR order, so a token index maps to a
   tray position by counting how many earlier tokens are still unplaced */
async function placeReorder(page, order) {
  const placed = [];
  for (const ti of order) {
    let pos = 0;
    for (let k = 0; k < ti; k++) if (placed.indexOf(k) < 0) pos++;
    if (!(await clickNth(page, '.sc-opt', pos))) throw new Error('reorder tray position ' + pos + ' absent');
    placed.push(ti);
    await new Promise((r) => setTimeout(r, 90));
  }
}

async function solve(page, r) {
  if (r.action === 'capitalize' || r.action === 'delete') {
    if (!(await clickNth(page, 'button.sc-chip', r.targetIndex))) throw new Error('word chip ' + r.targetIndex + ' absent');
  } else if (r.action === 'split') {
    if (!(await clickNth(page, '.sc-seam', r.seamIndex))) throw new Error('seam ' + r.seamIndex + ' absent');
  } else if (r.action === 'insert-punct' || r.action === 'insert-word') {
    if (!(await clickOptValue(page, r.replacement))) throw new Error('option "' + r.replacement + '" absent');
  } else if (r.action === 'swap') {
    if (!(await clickNth(page, 'button.sc-chip', r.targetIndex))) throw new Error('word chip ' + r.targetIndex + ' absent');
    await new Promise((x) => setTimeout(x, 110));
    if (!(await clickOptValue(page, r.replacement))) throw new Error('option "' + r.replacement + '" absent');
  } else if (r.action === 'reorder') {
    await placeReorder(page, r.correctOrder);
  }
  await new Promise((x) => setTimeout(x, 160));
}

module.exports = {
  steps: [
    {
      name: 'nudge',
      async drive(page) {
        await freeze(page);
        await reset(page);
        const r = await round(page);
        if (!r) throw new Error('could not read the round off window.' + G);

        const wrongChip = (r.distractors || []).find((d) => d !== r.replacement);

        if (r.action === 'swap') {
          /* diagnose correctly first, then miss the REPAIR — the coral response */
          if (!(await clickNth(page, 'button.sc-chip', r.targetIndex))) throw new Error('word chip absent');
          await new Promise((x) => setTimeout(x, 110));
          if (!wrongChip) throw new Error('no distractor in ' + r.id);
          if (!(await clickOptValue(page, wrongChip))) throw new Error('option "' + wrongChip + '" absent');
        } else if (r.action === 'insert-punct' || r.action === 'insert-word') {
          if (!wrongChip) throw new Error('no distractor in ' + r.id);
          if (!(await clickOptValue(page, wrongChip))) throw new Error('option "' + wrongChip + '" absent');
        } else if (r.action === 'reorder') {
          /* a full order that is deliberately wrong: the correct one rotated by one place */
          await placeReorder(page, r.correctOrder.slice(1).concat(r.correctOrder[0]));
        } else if (r.action === 'split') {
          /* no repair choice — a wrong SEAM is this round's only wrong-answer state */
          let bad = -1;
          const seams = await page.evaluate(() => document.querySelectorAll('.sc-seam').length);
          for (let i = 0; i < seams; i++) if (i !== r.seamIndex) { bad = i; break; }
          if (bad < 0) throw new Error('only one seam in ' + r.id + ' — nothing wrong to tap');
          if (!(await clickNth(page, '.sc-seam', bad))) throw new Error('seam ' + bad + ' absent');
        } else {
          /* capitalize / delete — a wrong WORD is this round's only wrong-answer state */
          let bad = -1;
          for (let i = 0; i < r.tokens.length; i++) if (i !== r.targetIndex && /\p{L}/u.test(r.tokens[i])) { bad = i; break; }
          if (bad < 0) throw new Error('no wrong word available in ' + r.id);
          if (!(await clickNth(page, 'button.sc-chip', bad))) throw new Error('word chip ' + bad + ' absent');
        }
        await new Promise((x) => setTimeout(x, 180));

        const st = await page.evaluate((g) => ({
          resolved: !!window[g].readOnly,
          msg: (document.querySelector('.sc-msg') || {}).textContent || '',
          rule: !!document.querySelector('.sc-rule'),
        }), G);
        if (st.resolved) throw new Error('a WRONG choice resolved ' + r.id);
        if (!st.msg.trim()) throw new Error('a wrong choice produced no visible message in ' + r.id);
        if (st.rule) throw new Error('the rule caption is visible BEFORE ' + r.id + ' is solved');
        return true;
      },
    },
    {
      /* ⚠ TERMINAL. Once the round resolves, `readOnly` turns every chip from a <button> into a
         <span> and removes the tray, so the card legitimately carries NO tool control — the child
         advances with the shell's own Check. `terminal` relaxes exactly the two gates that cannot
         apply to that screen (NO-CONTROLS-MEASURED and TAP) and leaves CUT-OFF, OVERFLOW, TINY and
         SPARSE running. The per-step assertions below are what replaces them: the rule caption, the
         success message, no stray gap, and Check actually visible. */
      name: 'resolved',
      terminal: true,
      async drive(page) {
        await freeze(page);
        await reset(page);
        const r = await round(page);
        if (!r) throw new Error('could not read the round off window.' + G);
        await solve(page, r);

        const st = await page.evaluate((g) => {
          const chk = document.querySelector('.lcs-activity-check');
          return {
            resolved: !!window[g].readOnly,
            rule: (document.querySelector('.sc-rule') || {}).textContent || '',
            msg: (document.querySelector('.sc-msg') || {}).textContent || '',
            strayGaps: [...document.querySelectorAll('.sc-gap')].filter((n) => !n.textContent.trim()).length,
            checkShown: !!(chk && chk.offsetParent !== null),
          };
        }, G);

        if (!st.resolved) throw new Error('the correct interaction did not resolve ' + r.id);
        if (!st.rule.trim()) throw new Error('the rule caption did not appear after solving ' + r.id);
        if (!st.msg.trim()) throw new Error('the success message did not appear for ' + r.id);
        if (st.strayGaps) throw new Error(st.strayGaps + ' empty .sc-gap left on the SOLVED card in ' + r.id);
        if (!st.checkShown) throw new Error('the shell Check button did not appear after resolving ' + r.id);
        return true;
      },
    },
  ],
};
