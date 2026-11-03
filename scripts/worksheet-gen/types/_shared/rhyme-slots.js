/**
 * types/_shared/rhyme-slots.js — tap-to-edit slots for the rhyme-class pages (final phase 2026-11-03; K-537 Rhyme Memory
 * Cards, K-538 Which One Does Not Rhyme?, K-539 Rhyme Dominoes): ONE ROLE PER RHYME CLASS on the page (rh0, rh1 … in order
 * of first appearance), its pool that class's own pictures of the reviewed bank (data/b3/rhyming-words.js) — so a teacher
 * is only ever offered a word that keeps what rhymes rhyming and what does not rhyme not rhyming. A choice already on the
 * page (by word or by vocab key) is refused. Key "theme/noun" (lib/slot.js anyPictures: a rhyme class spans themes).
 *
 *   items   [{ m, cls }] (m: a bank member with .pic, cls: its rhyme class id)
 *   ok      the page's own picture rule (picture present and opened)
 *   onPage  every member printed on the page
 * Returns { ms, stamp }: the members in item order (the teacher's where accepted), and stamp(html, srcOf) that puts each
 * item's tap target on its picture (slot.stampSrc). The catalogue page: the members as drawn, stamp = identity.
 */
'use strict';
const slot = require('../../lib/slot.js');

function rhymeSlots(ctx, items, R, ok, onPage, L, prefix = 'rh') {
  const ms = items.map((x) => x.m);
  if (!ctx || !(ctx.slotsOut || ctx.overrides) || !items.length) return { ms, stamp: (html) => html };
  const it = (m) => ({ theme: m.pic.theme, noun: m.pic.noun, m });
  const byId = new Map((R.classes || []).map((c) => [c.id, c]));
  const low = (w) => String(w).toLocaleLowerCase(L);
  const keys = new Set(onPage.map((m) => m.vocabKey)), words = new Set(onPage.map((m) => low(m.word)));
  const out = ms.slice(), taps = [];
  [...new Set(items.map((x) => x.cls))].forEach((cls, ci) => {
    const role = prefix + ci, idx = items.map((x, i) => (x.cls === cls ? i : -1)).filter((i) => i >= 0);
    const cur = idx.map((i) => it(ms[i]));
    const pool = ((byId.get(cls) || {}).members || []).filter(ok).map(it);
    const chosen = slot.anyPictures(ctx, cur, pool, role);
    const changed = chosen.map((x, j) => x !== cur[j]), nk = chosen.filter((x, j) => changed[j]).map((x) => x.m.vocabKey);
    const good = new Set(nk).size === nk.length && chosen.every((x, j) => !changed[j] || (!keys.has(x.m.vocabKey) && !words.has(low(x.m.word))));
    if (good) chosen.forEach((x, j) => { out[idx[j]] = x.m; });
    else { slot.anyPictures({ ...ctx, overrides: null }, cur, pool, role); slot.refuse(ctx, role); }
    taps.push({ role, idx });
  });
  const stamp = (html, srcOf) => taps.reduce((h, t) => slot.stampSrc(ctx, t.role, h, t.idx.map((i) => srcOf(out[i]))), html);
  return { ms: out, stamp };
}

module.exports = { rhymeSlots };
