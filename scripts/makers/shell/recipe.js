/**
 * The recipe (ARCHITECTURE §5.1): what a saved worksheet IS — the settings that rebuild it, never the rendered page.
 * Pure functions, used by the maker screen and by Node tests (scripts/makers/tests/recipe.test.js).
 *
 *   toRecipe(state, ctx)  → recipe     ctx = { maker, makerVersion, dataVersion, lang, title }
 *   fromRecipe(recipe)    → state      (the screen's state object; throws a RecipeError on anything malformed)
 *   recipeBytes(recipe)   → size in bytes of its JSON (the store refuses more than MAX_RECIPE_BYTES)
 *
 * Adapted from §5.1 to the screen as built:
 *   - one template per worksheet (pages[i].template is the same on every page; kept per page so a later mixed
 *     worksheet needs no schema change);
 *   - seed "v:<n>" = the page's copy number (the screen's variant); the page is made by the same gated generate()
 *     ladder, so the same maker version + data version + copy number rebuild the same page byte for byte;
 *   - decor = { border, pageNumbers } for the whole worksheet;
 *   - ink is stored compactly: each stroke "c|x,y x,y …" with coordinates in page-box pixels (703 × 945; the screen records half pixels, kept exactly).
 * MAX_RECIPE_BYTES is 256 KB, not §5.1's 16 KB: ten heavily drawn pages measured 227 KB before simplification, and a
 * drawing is the teacher's work — it is never thrown away to fit a number. Strokes are simplified when the pen lifts
 * (simplifyStroke, 0.6 px — invisible under a 5 px pen), so what the screen shows IS what is saved; a worksheet still
 * over the cap is refused with a sentence, never silently cut.
 */

export const RECIPE_VERSION = 1;
export const MAX_RECIPE_BYTES = 256 * 1024;
const INK_COLOURS = ['black', 'blue', 'red', 'green', 'orange'];

export class RecipeError extends Error {}

/** Ramer–Douglas–Peucker: keep the points a stroke's shape needs (tolerance in page-box px); ends always kept. */
export function simplifyStroke(pts, tol = 0.6) {
  if (pts.length < 3) return pts.slice();
  const keep = new Uint8Array(pts.length);
  keep[0] = keep[pts.length - 1] = 1;
  const stack = [[0, pts.length - 1]];
  while (stack.length) {
    const [a, b] = stack.pop();
    const [ax, ay] = pts[a], [bx, by] = pts[b];
    const dx = bx - ax, dy = by - ay, len = Math.hypot(dx, dy) || 1;
    let far = -1, dmax = tol;
    for (let k = a + 1; k < b; k++) {
      const d = Math.abs(dy * pts[k][0] - dx * pts[k][1] + bx * ay - by * ax) / len;
      if (d > dmax) { dmax = d; far = k; }
    }
    if (far >= 0) { keep[far] = 1; stack.push([a, far], [far, b]); }
  }
  return pts.filter((_, k) => keep[k]);
}

const encStroke = (s) => `${s.c}|${s.pts.map(([x, y]) => `${x},${y}`).join(" ")}`;
function decStroke(str) {
  const [c, pts] = String(str).split('|');
  if (!INK_COLOURS.includes(c) || !pts) throw new RecipeError('bad ink stroke');
  return { c, pts: pts.split(' ').map((p) => p.split(',').map(Number)).filter((p) => p.length === 2 && p.every(Number.isFinite)) };
}

export function toRecipe(state, ctx) {
  const pages = state.pages.map((variant, i) => {
    const tx = state.texts[i] || {};
    const ed = state.edits[i] || {};
    const ink = state.ink[i] || [];
    return {
      template: state.id,
      level: state.level,
      seed: `v:${variant}`,
      theme: state.theme,
      unit: state.units[i] || null,
      strings: { title: tx.title || null, instruction: tx.instruction || null },
      edits: Object.keys(ed).length ? ed : null,
      ink: ink.length ? ink.map(encStroke) : null,
    };
  });
  return {
    v: RECIPE_VERSION,
    maker: ctx.maker,
    makerVersion: ctx.makerVersion,
    dataVersion: ctx.dataVersion,
    lang: ctx.lang,
    paper: state.paper,
    title: ctx.title,
    answerKey: !!state.answerKey,
    decor: { border: state.border || 'none', pageNumbers: !!state.pageNumbers },
    pages,
  };
}

export function fromRecipe(r) {
  if (!r || r.v !== RECIPE_VERSION) throw new RecipeError('unknown recipe version');
  if (!Array.isArray(r.pages) || !r.pages.length || r.pages.length > 10) throw new RecipeError('a worksheet has 1 to 10 pages');
  const first = r.pages[0];
  if (!r.pages.every((p) => p.template === first.template)) throw new RecipeError('one template per worksheet');
  const variant = (p) => { const m = /^v:(\d{1,9})$/.exec(p.seed || ''); if (!m) throw new RecipeError('bad seed'); return Number(m[1]); };
  return {
    id: first.template,
    level: first.level,
    theme: first.theme || null,
    pickedTheme: first.theme || null,
    unit: first.unit || null,
    answerKey: !!r.answerKey,
    paper: r.paper === 'letter' ? 'letter' : 'a4',
    pages: r.pages.map(variant),
    edits: r.pages.map((p) => (p.edits && typeof p.edits === 'object' ? p.edits : {})),
    units: first.unit ? r.pages.map((p) => p.unit || first.unit) : [],
    texts: r.pages.map((p) => ({ ...(p.strings && p.strings.title ? { title: String(p.strings.title) } : {}), ...(p.strings && p.strings.instruction ? { instruction: String(p.strings.instruction) } : {}) })),
    ink: r.pages.map((p) => (Array.isArray(p.ink) && p.ink.length ? p.ink.map(decStroke) : undefined)),
    border: (r.decor && r.decor.border) || 'none',
    pageNumbers: !!(r.decor && r.decor.pageNumbers),
    more: false,
  };
}

export const recipeBytes = (r) => new TextEncoder().encode(JSON.stringify(r)).length;
