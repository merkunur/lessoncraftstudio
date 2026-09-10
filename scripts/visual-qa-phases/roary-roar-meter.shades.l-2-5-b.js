/* =====================================================================
   visual-qa phase driver — roary-roar-meter / shades of meaning (L.2.5.b)

   ⚠⚠ SEVEN LOCALES HAVE SHIPPED AND ONLY THE OPENING FRAME HAS EVER BEEN
   PHOTOGRAPHED, in one language. Fourth consecutive engine in this fan-out with
   no driver — the pattern, not a coincidence.

   ⭐ What the missing frames hid. `answerType:'state'`, so nothing is graded until
   Check, and the whole visible life of a round is three states this file drives:
     open      — the lion, one line of speech, the ASK ("Tap the STRONGEST word."),
                 and three word cards.
     picked    — one card SELECTED. ⚠ As shipped, `.rrm-opt.rrm-sel` was `#F2784B`,
                 byte-identical to `--lcs-accent`, the shell's `.tryagain` ink, and
                 `rrm-tried`/`rrm-right` did not exist at all — so the child's own
                 NEUTRAL choice was painted in the rejection colour and nothing ever
                 changed again. This frame is where that lived.
     missed    — a wrong card + Check. ⭐⭐ Only the TAPPED card may be marked.
                 ⭐ And the message must fit WHICH wrong answer it was: tapping the
                 MIDDLE-rank word means the child never ordered the three; tapping
                 the OTHER EXTREME means they ordered them perfectly and answered
                 the question that was not asked. Those are different mistakes and
                 the shipped deck gave them one message.
     resolved  — Check on the right card: the prompt celebrates, Next replaces Check.

   ⚠⚠ THE TARGET IS DERIVED HERE, NOT ASKED OF THE CORE. max/min rank by the round's
   own `ask` is the entire computation, so this driver holds it independently — a
   driver that asks the thing under test what the answer is cannot notice when the
   thing under test is wrong.

   ⚠⚠ A FREEZE IS REQUIRED. `lcs-shell.js:883` clears `.tryagain` and blanks the hint
   after 1800 ms, while the harness drives a phase ONCE then sweeps six viewports.
   ===================================================================== */
'use strict';

const G = 'RoaryRoarMeterActivity';
const CORAL = 'rgb(242, 120, 75)';   // --lcs-accent, the try-again ink

/* ⚠ Filtered to the exact 1800 ms delay, never a blanket setTimeout stub — that would
   be the ban-too-wide trap in a new place. */
async function freezeAutoDismiss(page) {
  await page.evaluate(() => {
    if (window.__lcsFrozeAutoDismiss) return;
    window.__lcsFrozeAutoDismiss = true;
    const real = window.setTimeout;
    window.setTimeout = function (fn, ms) {
      if (ms === 1800) return 0;
      return real.apply(window, arguments);
    };
  });
}

const state = (page) => page.evaluate((g) => {
  const t = window[g], r = t && t.round;
  if (!r) return null;
  return {
    setId: r.setId || r.id,
    ask: r.ask,
    words: r.words.map((w) => ({ word: w.word, rank: w.rank })),
    lang: (t.api && t.api.lang) || 'en',
    cards: Array.prototype.map.call(document.querySelectorAll('.rrm-opt'),
      (b) => ({ id: +b.getAttribute('data-id'), text: b.textContent.trim() }))
  };
}, G);

async function reset(page) {
  await page.evaluate((g) => { const t = window[g]; t.setupTask(t.round); t.render(); }, G);
  await new Promise((r) => setTimeout(r, 120));
}

const tapCard = (page, id) => page.evaluate((x) => {
  const b = document.querySelector('.rrm-opt[data-id="' + x + '"]');
  if (!b) return false;
  b.click(); return true;
}, id);

const pressCheck = (page) => page.evaluate(() => {
  const c = document.querySelector('.lcs-activity-check');
  if (!c || c.disabled) return false;
  c.click(); return true;
});

/* the target and the two wrong CLASSES, derived — never read off the core */
function classify(st) {
  const ranks = st.words.map((w) => w.rank);
  const t = st.ask === 'weakest' ? Math.min.apply(null, ranks) : Math.max.apply(null, ranks);
  const mid = ranks.slice().sort((a, b) => a - b)[1];
  const right = st.words.findIndex((w) => w.rank === t);
  const middle = st.words.findIndex((w) => w.rank === mid);
  const otherEnd = st.words.findIndex((w, i) => i !== right && i !== middle);
  if (right < 0 || middle < 0 || otherEnd < 0) throw new Error('could not classify ' + st.setId);
  if (!st.cards.some((c) => c.id === right)) {
    throw new Error('the answer card (index ' + right + ') is not on the board.\n    rendered: ' +
      st.cards.map((c) => c.id + ':' + c.text).join(' ') +
      '\n    → if this fires in every round, the wrong pool is loaded for this locale.');
  }
  return { right, middle, otherEnd };
}

const marks = (page) => page.evaluate((g) => {
  const p = document.querySelector('.lcs-activity-prompt');
  const chk = document.querySelector('.lcs-activity-check');
  const hint = document.querySelector('.lcs-activity-prompt-hint');
  const sel = document.querySelector('.rrm-opt.rrm-sel');
  const q = (s) => Array.prototype.map.call(document.querySelectorAll(s), (b) => +b.getAttribute('data-id'));
  return {
    sel: window[g].sel,
    selected: q('.rrm-opt.rrm-sel'),
    tried: q('.rrm-opt.rrm-tried'),
    right: q('.rrm-opt.rrm-right'),
    celebrated: !!(p && p.classList.contains('celebrate')),
    triedAgain: !!(p && p.classList.contains('tryagain')),
    checkShown: !!(chk && chk.offsetParent !== null),
    hint: hint ? hint.textContent.trim() : '',
    ask: (document.querySelector('.rrm-ask') || {}).textContent || '',
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
        const { right, otherEnd } = classify(st);
        /* ⚠ Tap the OTHER EXTREME, not just "any card that is not the answer". The
           middle-rank card is the boring wrong answer; the other extreme is the one
           that proves the board reveals nothing about WHICH end was asked for. */
        if (!(await tapCard(page, otherEnd))) throw new Error('card ' + otherEnd + ' absent');
        await new Promise((r) => setTimeout(r, 150));

        const m = await marks(page);
        if (m.sel == null) throw new Error('the tap did not select');
        if (m.selected.length !== 1) throw new Error('expected exactly 1 selected card, saw ' + m.selected.length);
        if (m.selected[0] !== otherEnd) throw new Error('the selection landed on card ' + m.selected[0] + ', not the tapped ' + otherEnd);
        if (m.tried.length || m.right.length) throw new Error((m.tried.length + m.right.length) + ' card(s) marked BEFORE Check — the board is grading a selection');
        if (m.celebrated) throw new Error('celebrating before Check');
        if (!m.checkShown) throw new Error('Check is not on screen with a selection made');
        /* the ask must be legible in every frame — it is the only thing that changes
           round to round, and without it the deck is a coin flip by construction */
        if (!m.ask.trim()) throw new Error('the ask line is empty — the child cannot know which end is wanted');
        if (m.selBorder === CORAL) throw new Error('the selected card is drawn in ' + CORAL + ' — that is --lcs-accent, the try-again ink');
      }
    },
    {
      name: 'missed',
      async drive(page) {
        await freezeAutoDismiss(page);
        await reset(page);
        const st = await state(page);
        const { right, middle } = classify(st);
        /* the MIDDLE-rank card: the child who never ordered the three */
        await tapCard(page, middle);
        if (!(await pressCheck(page))) throw new Error('Check was not clickable with a selection made');
        await new Promise((r) => setTimeout(r, 220));

        const m = await marks(page);
        if (!m.triedAgain) throw new Error('a wrong card did not produce try-again');
        if (m.celebrated) throw new Error('a wrong card celebrated');
        if (m.right.indexOf(right) >= 0) throw new Error('the CORRECT card is marked green after a wrong pick — the answer is on screen');
        if (m.tried.length !== 1 || m.tried[0] !== middle) throw new Error('expected the tapped card ' + middle + ' marked, saw [' + m.tried.join(',') + ']');
        if (!m.hint) throw new Error('no hint text on a wrong answer');
        if (/^hint[A-Z]/.test(m.hint)) throw new Error('the hint rendered as the raw KEY "' + m.hint + '" — that string is missing for ' + st.lang);
      }
    },
    {
      name: 'resolved',
      async drive(page) {
        await freezeAutoDismiss(page);
        await reset(page);
        const st = await state(page);
        const { right } = classify(st);
        await tapCard(page, right);
        if (!(await pressCheck(page))) throw new Error('Check was not clickable with the answer selected');
        await new Promise((r) => setTimeout(r, 260));

        const m = await marks(page);
        if (!m.celebrated) throw new Error('the correct word did not celebrate');
        if (m.triedAgain) throw new Error('the correct word produced try-again');
        if (m.right.indexOf(right) < 0) throw new Error('the correct card is not marked right on the win frame');
        if (m.tried.length) throw new Error('a card is still marked as tried on the win frame');
        /* ⭐ The payoff is seeing the whole scale with the chosen end marked, so all
           three words must still be on screen — not replaced by chrome. */
        const still = await page.$$eval('.rrm-opt', (e) => e.length).catch(() => 0);
        if (still !== 3) throw new Error('the win frame shows ' + still + ' cards, not 3 — the scale is the payoff');
      }
    }
  ]
};
