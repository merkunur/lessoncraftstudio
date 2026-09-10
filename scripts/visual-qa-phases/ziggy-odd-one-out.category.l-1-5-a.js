/* =====================================================================
   visual-qa phase driver — ziggy-odd-one-out / category (L.1.5.a)

   ⚠⚠ SEVEN LOCALES HAVE SHIPPED AND ONLY THE OPENING FRAME HAS EVER BEEN
   PHOTOGRAPHED, in one language. Fifth consecutive engine in this fan-out with no
   driver.

   ⭐ What the missing frames hid. `answerType:'state'`, so nothing is graded until
   Check, and the whole visible life of a round is three states this file drives:
     open      — the zebra, one line of speech, the ask, and four picture-and-word
                 tiles.
     picked    — one tile SELECTED. ⚠ As shipped, `.zoo-opt.zoo-sel` was `#F2784B`,
                 byte-identical to `--lcs-accent`, the shell's `.tryagain` ink, and
                 `zoo-tried`/`zoo-right` did not exist at all — so the child's own
                 NEUTRAL choice was painted in the rejection colour and nothing ever
                 changed. This frame is where that lived.
     missed    — a wrong tile + Check. ⭐⭐ Only the TAPPED tile may be marked;
                 marking the correct one prints the answer.
     resolved  — Check on the outsider: the prompt celebrates, Next replaces Check.

   ⭐⭐ AND THE ONE THAT ONLY A PICTURE DECK HAS: EVERY TILE MUST ACTUALLY SHOW ITS
   PICTURE. The activity hides a failed image with
   `onerror="this.style.visibility='hidden'"`, so a missing or broken file renders as
   a tile with a word and NO PICTURE — and every text-based gate stays green. This
   driver asserts `naturalWidth > 0` and non-hidden visibility on all four tiles in
   every frame, which is the only place that defect is visible.

   ⚠⚠ THE TARGET IS DERIVED HERE, NOT ASKED OF THE CORE. The minority-of-one category
   is the entire computation, so this driver holds it independently — a driver that
   asks the thing under test what the answer is cannot notice when it is wrong.

   ⚠⚠ A FREEZE IS REQUIRED. `lcs-shell.js:883` clears `.tryagain` and blanks the hint
   after 1800 ms, while the harness drives a phase ONCE then sweeps six viewports.
   ===================================================================== */
'use strict';

const G = 'ZiggyOddOneOutActivity';
const CORAL = 'rgb(242, 120, 75)';   // --lcs-accent, the try-again ink

async function freezeAutoDismiss(page) {
  await page.evaluate(() => {
    if (window.__lcsFrozeAutoDismiss) return;
    window.__lcsFrozeAutoDismiss = true;
    const real = window.setTimeout;
    window.setTimeout = function (fn, ms) {
      if (ms === 1800) return 0;          // lcs-shell.js:883
      return real.apply(window, arguments);
    };
  });
}

const state = (page) => page.evaluate((g) => {
  const t = window[g], r = t && t.round;
  if (!r) return null;
  return {
    id: r.id,
    items: r.items.map((it) => ({ noun: it.noun, category: it.category, label: it.label || it.noun })),
    lang: (t.api && t.api.lang) || 'en',
    tiles: Array.prototype.map.call(document.querySelectorAll('.zoo-opt'),
      (b) => ({ id: +b.getAttribute('data-id'), text: b.textContent.trim() }))
  };
}, G);

async function reset(page) {
  await page.evaluate((g) => { const t = window[g]; t.setupTask(t.round); t.render(); }, G);
  await new Promise((r) => setTimeout(r, 200));   // the images have to decode
}

const tapTile = (page, id) => page.evaluate((x) => {
  const b = document.querySelector('.zoo-opt[data-id="' + x + '"]');
  if (!b) return false;
  b.click(); return true;
}, id);

const pressCheck = (page) => page.evaluate(() => {
  const c = document.querySelector('.lcs-activity-check');
  if (!c || c.disabled) return false;
  c.click(); return true;
});

/* the outsider, derived — never read off the core */
function classify(st) {
  const c = {};
  st.items.forEach((it) => { c[it.category] = (c[it.category] || 0) + 1; });
  const odd = st.items.findIndex((it) => c[it.category] === 1);
  if (odd < 0) throw new Error('no minority-of-one category in ' + st.id);
  const members = st.items.map((it, i) => i).filter((i) => i !== odd);
  if (members.length !== 3) throw new Error(st.id + ': not a 3-1 split');
  if (!st.tiles.some((t) => t.id === odd)) {
    throw new Error('the outsider tile (index ' + odd + ') is not on the board.\n    rendered: ' +
      st.tiles.map((t) => t.id + ':' + t.text).join(' ') +
      '\n    → if this fires in every round, the wrong pool is loaded for this locale.');
  }
  return { odd, members };
}

/* ⭐ the picture assertion — the only place a silently-hidden broken image shows up */
const pictures = (page) => page.evaluate(() => Array.prototype.map.call(
  document.querySelectorAll('.zoo-opt'), (b) => {
    const img = b.querySelector('img');
    const word = b.querySelector('.zoo-word');
    return {
      id: +b.getAttribute('data-id'),
      loaded: !!(img && img.complete && img.naturalWidth > 0),
      hidden: !!(img && getComputedStyle(img).visibility === 'hidden'),
      src: img ? img.getAttribute('src') : null,
      word: word ? word.textContent.trim() : ''
    };
  }));

async function assertPictures(page, where) {
  const pics = await pictures(page);
  if (pics.length !== 4) throw new Error(where + ': ' + pics.length + ' tiles, expected 4');
  pics.forEach((p) => {
    if (!p.word) throw new Error(where + ': tile ' + p.id + ' renders no word');
    if (p.hidden) throw new Error(where + ': tile ' + p.id + ' has a HIDDEN image — onerror fired on ' + p.src);
    if (!p.loaded) throw new Error(where + ': tile ' + p.id + ' image did not load — ' + p.src);
  });
}

const marks = (page) => page.evaluate((g) => {
  const p = document.querySelector('.lcs-activity-prompt');
  const chk = document.querySelector('.lcs-activity-check');
  const hint = document.querySelector('.lcs-activity-prompt-hint');
  const sel = document.querySelector('.zoo-opt.zoo-sel');
  const q = (s) => Array.prototype.map.call(document.querySelectorAll(s), (b) => +b.getAttribute('data-id'));
  return {
    sel: window[g].sel,
    selected: q('.zoo-opt.zoo-sel'),
    tried: q('.zoo-opt.zoo-tried'),
    right: q('.zoo-opt.zoo-right'),
    celebrated: !!(p && p.classList.contains('celebrate')),
    triedAgain: !!(p && p.classList.contains('tryagain')),
    checkShown: !!(chk && chk.offsetParent !== null),
    hint: hint ? hint.textContent.trim() : '',
    ask: (document.querySelector('.zoo-ask') || {}).textContent || '',
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
        await assertPictures(page, st.id + '/picked');
        const { odd, members } = classify(st);
        /* tap a MEMBER, not the outsider: the question this frame answers is whether
           the board gives anything away before Check. */
        if (!(await tapTile(page, members[0]))) throw new Error('tile ' + members[0] + ' absent');
        await new Promise((r) => setTimeout(r, 150));

        const m = await marks(page);
        if (m.sel == null) throw new Error('the tap did not select');
        if (m.selected.length !== 1) throw new Error('expected exactly 1 selected tile, saw ' + m.selected.length);
        if (m.selected[0] !== members[0]) throw new Error('the selection landed on tile ' + m.selected[0] + ', not the tapped ' + members[0]);
        if (m.tried.length || m.right.length) throw new Error((m.tried.length + m.right.length) + ' tile(s) marked BEFORE Check');
        if (m.celebrated) throw new Error('celebrating before Check');
        if (!m.checkShown) throw new Error('Check is not on screen with a selection made');
        if (!m.ask.trim()) throw new Error('the ask line is empty');
        if (m.selBorder === CORAL) throw new Error('the selected tile is drawn in ' + CORAL + ' — that is --lcs-accent, the try-again ink');
      }
    },
    {
      name: 'missed',
      async drive(page) {
        await freezeAutoDismiss(page);
        await reset(page);
        const st = await state(page);
        const { odd, members } = classify(st);
        await tapTile(page, members[1]);
        if (!(await pressCheck(page))) throw new Error('Check was not clickable with a selection made');
        await new Promise((r) => setTimeout(r, 220));
        await assertPictures(page, st.id + '/missed');

        const m = await marks(page);
        if (!m.triedAgain) throw new Error('a wrong tile did not produce try-again');
        if (m.celebrated) throw new Error('a wrong tile celebrated');
        if (m.right.indexOf(odd) >= 0) throw new Error('the OUTSIDER is marked green after a wrong pick — the answer is on screen');
        if (m.tried.length !== 1 || m.tried[0] !== members[1]) throw new Error('expected the tapped tile ' + members[1] + ' marked, saw [' + m.tried.join(',') + ']');
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
        const { odd } = classify(st);
        await tapTile(page, odd);
        if (!(await pressCheck(page))) throw new Error('Check was not clickable with the outsider selected');
        await new Promise((r) => setTimeout(r, 260));
        await assertPictures(page, st.id + '/resolved');

        const m = await marks(page);
        if (!m.celebrated) throw new Error('the outsider did not celebrate');
        if (m.triedAgain) throw new Error('the outsider produced try-again');
        if (m.right.indexOf(odd) < 0) throw new Error('the outsider is not marked right on the win frame');
        if (m.tried.length) throw new Error('a tile is still marked as tried on the win frame');
        /* ⭐ The payoff is seeing all four together with the outsider named, so the
           board must still be on screen — not replaced by chrome. */
        const still = await page.$$eval('.zoo-opt', (e) => e.length).catch(() => 0);
        if (still !== 4) throw new Error('the win frame shows ' + still + ' tiles, not 4 — the set is the payoff');
      }
    }
  ]
};
