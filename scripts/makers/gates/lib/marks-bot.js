/**
 * The marks screen player shared by gates/screen-from-marks.js and gates/declared-screens.js (moved 2026-11-01, unchanged):
 * keyMarks reads what a key page marks; bot plays a served marks screen by real clicks (both run INSIDE the page).
 */
'use strict';
/** what the key page marks (its audit, as answer-keys.js reads it) */
const keyMarks = () => {
  const out = { written: [], ringedChoices: 0, rings: 0, badges: [], samples: document.querySelectorAll('[data-lcs-key-sample]').length };
  for (const el of document.querySelectorAll('[data-lcs-answer]')) { const w = el.getAttribute('data-lcs-answer'); if (w && !el.children.length && !el.textContent.trim()) out.written.push(w); }
  out.ringedChoices = document.querySelectorAll('[data-lcs-correct]').length;
  out.rings = document.querySelectorAll('[data-lcs-key-ring]').length;
  for (const el of document.querySelectorAll('[data-lcs-key-badge]')) out.badges.push(el.getAttribute('data-lcs-key-badge'));
  return out;
};

/**
 * The bot (runs in the served screen page): fills every question RIGHT (mode 'right'), every candidate WRONG ('wrong')
 * or all but one right ('short'), by real clicks on the overlay buttons and the pad keys; returns the states after Check.
 */
const bot = (mode) => {
  const M = window.__lcsMarks; if (!M) return { err: 'no runtime hook' };
  const Q = M.Q(), C = window.DECK_BUNDLE.ctx || {};
  const keyFor = (c) => Array.from(document.querySelectorAll('.lcs-key')).find((k) => k.textContent === (c === ' ' ? '␣' : c));
  const typeText = (q, right) => {
    const m = q.meta, set = m['data-lcs-set'], rg = m['data-lcs-range'];
    if (m['data-lcs-blank']) return right ? '' : '1';   // right when left empty (an optional box with no answer)
    // a decimal money box: the written amount ("17,36"); wrong = its last digit changed
    if (m['data-lcs-decimal'] != null) { const t = String(m['data-lcs-typed']); return right ? t : t.slice(0, -1) + ((+t.slice(-1) + 1) % 10); }
    if (set) { const nums = C.sets[set]; const mine = Q.filter((x) => x.cls === 'type' && x.meta['data-lcs-set'] === set); const k = mine.indexOf(q); if (k >= nums.length) return null; return right ? String(nums[k]) : String(nums[k] + 1); }   // wrong: the next number (the other parity / another set), within the digit cap
    if (rg) { const lo = String(rg).split('-')[0] || '0', hi = String(rg).split('-')[1]; return right ? lo : (hi ? String(+hi + 1) : String(Math.max(0, +lo - 1))); }
    const a = String(q.p.answers[q.i]);
    if (right) return a;
    if (q.num) return String(+a + 1);
    // a wrong word from the pad's own keys: the letters rotated, else another key of the pad
    const rot = Array.from(a).slice(1).concat(Array.from(a)[0]).join('');
    if (rot !== a) return rot;
    const other = (C.keys || []).find((k) => k !== ' ' && a.indexOf(k) < 0);
    return other ? a + other : a;
  };
  const click = (el) => el.click();
  // 'short': the LAST question that must be answered (a select candidate left untapped is an answer, so a select-only
  // page needs nothing left — Check enables on the first tap, as the key's own rings do)
  const spare = (q) => { const set = q.cls === 'type' && q.meta['data-lcs-set']; if (!set) return false; const mine = Q.filter((x) => x.cls === 'type' && x.meta['data-lcs-set'] === set); return mine.indexOf(q) >= C.sets[set].length; };
  const need = Q.filter((q) => q.cls !== 'select' && !spare(q) && !(q.cls === 'type' && q.meta['data-lcs-optional'] != null));
  const skip = mode === 'short' ? need[need.length - 1] : null;
  if (mode === 'short' && !skip) return { disabled: true, selectOnly: true };
  const groups = {};
  Q.forEach((q) => {
    const right = mode !== 'wrong';
    if (q === skip) return;
    if (skip && skip.cls === 'pair' && skip.p.mutual && String(skip.p.answers[skip.i]) === q.id) return;   // its partner would pair it back
    // a capital is typed as its small letter, as the runtime's own keyboard handler does (the pad is the locale's
    // lower-case letters; grading folds case) — "You" at the start of a sentence is typed y-o-u
    if (q.cls === 'type') { const txt = typeText(q, right); if (txt === null) return; click(q.el); for (const c of txt) { const k = keyFor(c) || keyFor(c.toLocaleLowerCase(window.DECK_BUNDLE.locale || 'en')); if (!k) throw new Error('no pad key for ' + c); click(k); } }
    else if (q.cls === 'choice') { const a = q.p.answers[q.i]; click(q.opts[right ? a : (a + 1) % q.opts.length]); }
    else if (q.cls === 'select' && q.p.countGroups) { const g = q.meta['data-lcs-group'], want = +q.meta['data-lcs-want']; groups[g] = groups[g] || 0; const n = right ? want : want + 1; if (groups[g] < n && !q.on) { click(q.el); groups[g]++; } }
    else if (q.cls === 'select') { const a = q.p.answers[q.i]; if (right ? a : !a) click(q.el); }
    else if (q.cls === 'pair') {
      if (q.to != null) return;   // paired already (a mutual pair links both ways)
      const a = String(q.p.answers[q.i]); const ts = Array.from(document.querySelectorAll('[data-lcs-t]'));
      let t = ts.find((x) => x.getAttribute('data-lcs-t') === a);
      // wrong: another target — of a still unpaired item when the pairs are mutual, so no earlier link is undone
      if (!right) t = ts.find((x) => { const id = x.getAttribute('data-lcs-t'); if (id === a || id === q.id) return false; const other = q.p.qs.find((o) => o.id === id); return !(q.p.mutual && other && other.to != null); }) || t;
      click(q.el); click(t);
    }
    // a bin tap is a TOGGLE in the runtime (tap the selected bin again = put it down): tap it only when it is not the
    // selected one, or two consecutive targets of the same bin leave the second empty (picture sudoku, task 6 2026-11-01)
    // a COUNTED group (K-454): wrong = every target the first bin (a swap of every colour keeps 5 + 5 right)
    else if (q.cls === 'place') { const a = String(q.p.answers[q.i]); const bs = Array.from(document.querySelectorAll('[data-lcs-b]')); let b = bs.find((x) => x.getAttribute('data-lcs-b') === a); if (!right) b = q.meta && q.meta['data-lcs-cgroup'] != null ? bs[0] : (bs.find((x) => x.getAttribute('data-lcs-b') !== a) || b); if (b.getAttribute('aria-pressed') !== 'true') click(b); click(q.el); }
  });
  const chk = document.getElementById('lcs-check');
  if (mode === 'short') return { disabled: chk.disabled };
  if (chk.disabled) return { err: 'Check disabled after answering everything' };
  click(chk);
  const states = Q.map((q) => (q.cls === 'choice' ? (q.pick >= 0 ? q.opts[q.pick].getAttribute('data-state') : null) : q.el.getAttribute('data-state')));
  return { states, progress: document.getElementById('lcs-progress').textContent };
};

module.exports = { keyMarks, bot };
