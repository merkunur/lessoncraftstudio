/**
 * Tap-to-edit slots (docs/makers/ARCHITECTURE.md §4.3) — how a teacher's "use THIS picture / THIS word here" reaches a
 * type's build without breaking the page.
 *
 * A type picks its items in one place (rng.sample from a pool). It passes that pick through pictures() / words() right
 * AFTER the sample: the item the teacher chose replaces item i, the random stream is untouched (no rng call is added or
 * removed), so every later choice — counts, distractors, positions — and the answer key stay exactly what they were.
 *
 *   const picked = slot.pictures(ctx, rng.sample(pool, k), pool);      // pool = the type's own pool (labelSafeNouns …)
 *   … data-lcs-slot="pic.<i>" on the element a teacher taps to change item i
 *
 * Rules (each a refusal the screen explains, never a broken page):
 *   - a choice is accepted only from the type's own pool (its words are native-reviewed; its pictures fit the type)
 *   - a choice already used in another slot of the page is refused (two cards would show the same thing)
 * Without ctx.overrides the pick comes back unchanged (the catalogue path: byte-identical pages).
 *
 * When the maker passes ctx.slotsOut = {}, each role records { pool: [keys], values: [keys] } there, so the screen can
 * offer exactly this type's pool and see which choices were applied.
 */
'use strict';

function apply(ctx, role, picked, pool, keyOf, extra) {
  const want = (ctx && ctx.overrides && ctx.overrides[role]) || null;
  let out = picked;
  if (want) {
    out = picked.slice();
    const byKey = new Map(pool.map((p) => [keyOf(p), p]));
    for (const [i, key] of Object.entries(want)) {
      const idx = Number(i);
      if (!(idx >= 0 && idx < out.length) || !byKey.has(key)) continue;   // not this type's pool: refused
      const taken = out.some((x, j) => j !== idx && keyOf(x) === key);
      if (taken) continue;                                                   // already on the page: refused
      out[idx] = byKey.get(key);
    }
  }
  if (ctx && ctx.slotsOut) ctx.slotsOut[role] = { pool: pool.map(keyOf), values: out.map(keyOf), ...(extra || {}) };
  return out;
}

/**
 * Pictures: items are { noun, vocabKey, … } from labelSafeNouns(theme); the key is the noun (unique in a theme).
 * theme = the theme the pool comes from (a type may draw from another theme than the page's: a B&W sibling, a partner)
 */
const pictures = (ctx, picked, pool, theme, role = 'pic') => apply(ctx, role, picked, pool, (p) => p.noun, { theme });

/** Words: items are strings (or { word }); the key is the word itself. */
const words = (ctx, picked, pool, role = 'word') => apply(ctx, role, picked, pool, (w) => (typeof w === 'string' ? w : w.word));

/** The tap target: ` data-lcs-slot="<role>.<i>"` in the maker, nothing in the catalogue (its pages stay byte-identical). */
const attr = (ctx, role, i) => (ctx && ctx.slotsOut ? ` data-lcs-slot="${role}.${i}"` : '');

/** The same tap target put on the FIRST tag of an element's markup (a card, a row) — maker only. */
const stamp = (ctx, role, i, html) => (ctx && ctx.slotsOut ? String(html).replace(/^(\s*<[a-zA-Z][\w-]*)/, '$1' + attr(ctx, role, i)) : html);

module.exports = { pictures, words, attr, stamp };
