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

/**
 * Pictures from SEVERAL themes (2026-11-02, Sorting): items are { theme, noun, … } — a reviewed list that spans themes
 * (the foods of a food group) or any picture a teacher sorts herself; the key is "theme/noun" (one noun may live in two
 * themes). The picker shows each key's own picture (multi: true).
 */
const anyPictures = (ctx, picked, pool, role) => apply(ctx, role, picked, pool, (p) => p.theme + '/' + p.noun, { multi: true });

/**
 * Free text (2026-11-02, Sorting): one value the teacher TYPES (a group's name). Accepted when it is 1 … max characters
 * after the spaces are tidied and holds no markup; anything else keeps the drawn value. The type escapes it when it
 * prints it. Records { pool: [], values: [text], free: true, max }.
 */
function text(ctx, value, role, max = 24) {
  const want = ctx && ctx.overrides && ctx.overrides[role] ? ctx.overrides[role][0] : undefined;
  let out = value;
  if (typeof want === 'string') {
    const t = want.replace(/\s+/g, ' ').trim();
    if (t && [...t].length <= max && !/[<>]/.test(t)) out = t;
  }
  if (ctx && ctx.slotsOut) ctx.slotsOut[role] = { pool: [], values: [out], free: true, max };
  return out;
}

/**
 * A TYPE'S OWN refusal (2026-11-02): the choice is in the pool and free, but the page cannot take it (two shadows alike,
 * a pair that brings a conflict) — the type draws its own pick again without the override and calls refuse(): the
 * screen then says "does not fit" and the gates count a refusal, not a slot that ignores its key.
 */
function refuse(ctx, role) { if (ctx && ctx.slotsOut && ctx.slotsOut[role]) ctx.slotsOut[role].refused = true; }

/** The tap target: ` data-lcs-slot="<role>.<i>"` in the maker, nothing in the catalogue (its pages stay byte-identical). */
const attr = (ctx, role, i) => (ctx && ctx.slotsOut ? ` data-lcs-slot="${role}.${i}"` : '');

/** The same tap target put on the FIRST tag of an element's markup (a card, a row) — maker only. */
const stamp = (ctx, role, i, html) => (ctx && ctx.slotsOut ? String(html).replace(/^(\s*<[a-zA-Z][\w-]*)/, '$1' + attr(ctx, role, i)) : html);

/**
 * Tap targets by PICTURE (2026-11-03, Rhyming): item i's tap target is the first `src="…"` of srcs[i] in the page (a page
 * shows each picture once) — for types whose markup names its items in many different attributes. The src is looked for
 * as written and HTML-escaped (components esc() it). Maker only: the catalogue page comes back unchanged.
 */
function stampSrc(ctx, role, html, srcs) {
  if (!(ctx && ctx.slotsOut)) return html;
  const escAttr = (x) => String(x).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  let out = String(html);
  srcs.forEach((src, i) => {
    for (const s of [String(src), escAttr(src)]) {
      const needle = `src="${s}"`, at = out.indexOf(needle);
      if (at >= 0) { out = out.slice(0, at + needle.length) + attr(ctx, role, i) + out.slice(at + needle.length); break; }
    }
  });
  return out;
}

/**
 * Slots BY KIND (2026-11-03, the final phase): one role per kind of item on the page (prefix + 0, 1 … in order of first
 * appearance), its pool = poolFor(kind) — the type's own candidates of THAT kind (a letter's pictures, a blend's words, a
 * long-vowel word) — so the picker only ever offers a choice that keeps the item's answer, and every role's probe is a
 * real one. A choice already on the page in ANOTHER role is refused too (the page never shows one thing twice); opts.ok
 * (item, old) adds the type's own rule. Items: { theme, noun } with opts.multi (anyPictures), { noun } with opts.theme
 * (pictures), or words (opts.words). Returns { items, tap(i) } — tap(i) = item i's tap-target attribute ('' in the catalogue).
 */
function byKind(ctx, items, kindOf, poolFor, opts = {}) {
  const prefix = opts.prefix || 'k';
  const keyOf = opts.multi ? (p) => p.theme + '/' + p.noun : opts.words ? (w) => (typeof w === 'string' ? w : w.word) : (p) => p.noun;
  const out = items.slice(), tapAt = new Array(items.length).fill('');
  if (!ctx || !(ctx.slotsOut || ctx.overrides) || !items.length) return { items: out, tap: () => '' };
  const kinds = [...new Set(items.map(kindOf))];
  const onPage = new Set(items.map(keyOf));
  const applied = [];
  kinds.forEach((k, ki) => {
    const role = prefix + ki, idx = items.map((x, i) => (kindOf(x) === k ? i : -1)).filter((i) => i >= 0);
    const cur = idx.map((i) => items[i]), pool = poolFor(k);
    const take = (c) => (opts.multi ? anyPictures(c, cur, pool, role) : opts.words ? words(c, cur, pool, role) : pictures(c, cur, pool, opts.theme, role));
    const chosen = take(ctx);
    const good = chosen.every((x, j) => x === cur[j] || (!onPage.has(keyOf(x)) && (!opts.ok || opts.ok(x, cur[j]))));
    if (good) { chosen.forEach((x, j) => { out[idx[j]] = x; }); if (chosen.some((x, j) => x !== cur[j])) applied.push({ role, take }); }
    else { take({ ...ctx, overrides: null }); refuse(ctx, role); }
    idx.forEach((i, j) => { tapAt[i] = attr(ctx, role, j); });
  });
  // opts.page(items): the type's rule over the WHOLE page (no repeated stem, at most two of a group …) — when the
  // teacher's choices together break it, every changed role is refused and the page is drawn as it was
  if (applied.length && opts.page && !opts.page(out)) {
    for (const a of applied) { a.take({ ...ctx, overrides: null }); refuse(ctx, a.role); }
    return { items: items.slice(), tap: (i) => tapAt[i] || '' };
  }
  return { items: out, tap: (i) => tapAt[i] || '' };
}

module.exports = { pictures, words, anyPictures, text, refuse, attr, stamp, stampSrc, byKind };
