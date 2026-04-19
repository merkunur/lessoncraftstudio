# Design Elements — Integration Guide for Worksheet Apps

**Source of truth:** `REFERENCE APPS/coloring.html` (design elements live at the
bottom of the file in the `DESIGN_ELEMENTS` IIFE).

**When to read this:** any time you need to add the Design Elements accordion
to another worksheet generator app. This document captures every bugfix
discovered during the original coloring.html integration (2026-04-18 to
2026-04-19) so you do not repeat them.

---

## Architecture

- **Data source**: `GET /api/design-elements/list` — returns `{items, palettes}`.
  Prefer this over embedding SVGs inline (coloring.html embeds them as a
  one-time bootstrap; new apps should fetch at load).
- **SVG files on disk**: `/var/www/lcs-media/design-elements/<category>/<slug>.svg`,
  served directly by nginx. Each item's `url` in the API response is ready to
  fetch.
- **Palettes**: inline `palettes` array in the list response, OR fetch from
  `GET /api/design-elements/palettes`.
- **Fabric.js canvas** on the worksheet app is the render target.

---

## Integration checklist (new app)

1. **Expose the fabric canvas globally** inside the worksheet app's canvas init:
   ```js
   window.canvas = canvas;
   window.dispatchEvent(new CustomEvent('coloring-canvas-ready'));
   ```
   (The event name was kept as `coloring-canvas-ready` so listeners port
   cleanly. You may rename per app, but if you do, update all helpers.)
2. **Add `<details class="de-subsection">` blocks** inside the existing
   "Page Setup" accordion panel of the target app. Re-use the full set of
   subsection IDs from coloring.html — do not rename them or CSS/JS won't find
   their grids:
   `de-grid-bg-patterns`, `de-grid-bg-textures`, `de-grid-frames`,
   `de-grid-corners`, `de-grid-banners`, `de-grid-dividers`,
   `de-grid-badges`, `de-grid-title-banners`, `de-grid-accents`,
   `de-grid-scatter`, `de-grid-footers`, `de-grid-palettes`.
3. **Paste the `.de-*` CSS block** verbatim from coloring.html (lines ~511–686
   of the DE commit). It uses a `de-` prefix to avoid clashes and leans on the
   target app's CSS variables: `--app-text-secondary-dark-theme`,
   `--app-border-dark`, `--app-accent-primary`, `--app-surface-dark`. Make sure
   the app defines those (coloring.html does). If not, copy them in with your
   own values.
4. **Paste the IIFE** from coloring.html (the `<script>(function(){...})();</script>`
   starting ~line 2487 of the DE commit). Inside it:
   - Either keep `const DESIGN_ELEMENTS = { ... }` (bootstrap from inline data
     — faster first render, 81+ SVGs in the file), OR replace it with a
     `fetch('/api/design-elements/list')` that populates the grids. The API
     path is recommended going forward so edits in the content manager reach
     the app without redeploying the HTML.
5. **FontAwesome 5 already loaded** in each worksheet app. The accordion
   chevron is `content: '\f078'` with rotation. No extra CSS dependencies.

---

## Bugs to NOT repeat (the hard-won 15 + the extra 10)

### Fabric / SVG rendering

1. **`fabric.Image.fromURL` is unreliable for SVG blob URLs when you need
   `width`/`height` later.** It often fails to set them, breaking
   `scaleToWidth`. Use native `new Image()` → `onload` → wrap with
   `new fabric.Image(nativeImg)`. This is the `svgToFabricImage` helper.
2. **EXCEPTION**: for full-canvas patterns/textures, `fabric.Image.fromURL`
   IS used — because we explicitly inject `width="${W}" height="${H}"` into
   the SVG before creating the blob, so fromURL has stable dimensions to
   work with. Do not "fix" this inconsistency; it is intentional.
3. **URL.revokeObjectURL timing**:
   - `setPagePattern` / `setPageTexture` (fromURL path): revoke immediately
     in the fromURL callback (fabric has already loaded the pixels).
   - `svgToFabricImage` (native-Image path): do NOT revoke — the fabric.Image
     references the nativeImg which references the url. Revoke only in the
     `onerror` branch.
   - `addCornerOrnaments`: revoke AFTER the forEach that adds all 4 corners
     (all 4 fabric.Images share the single nativeImg, so one revoke after
     all are added is correct).
4. **Canvas dimensions are zoom-polluted** in coloring.html. It calls
   `canvas.setDimensions(displayDims)` *after* applying zoom, so
   `canvas.getWidth()` returns the *display* size, not the logical page
   size. Use `getLogicalSize(cv)` which divides by `cv.getZoom()`. If the
   new app doesn't do zoom this way, still use the helper — it's safe.
5. **Always call `img.setCoords()`** after programmatic position/scale
   changes or fabric's selection bounding box will be stale.
6. **Backgrounds must be non-interactive**: set
   `selectable:false, evented:false, hoverCursor:'default'`, then
   `cv.sendToBack(img)`.
7. **Replace, don't stack backgrounds**: before adding a new one, remove
   the previously-tracked `dePageBgObject` **from the canvas it actually
   lives on** (tracked via `dePageBgCanvas`, not `getCanvas()` — the user
   may have switched tabs since). Do not just set opacity=0.
7a. **Backgrounds must STAY at z-index 0 after new content is added.**
    `cv.sendToBack(img)` only orders at insertion time. When a worksheet
    generator later adds new objects, the bg ends up layered above them.
    Fix: attach a one-shot `object:added` listener per canvas via
    `attachBgGuard(cv)`; whenever any other object is added, re-send the
    bg to the back. Defer via `setTimeout(..., 0)` so the generator's
    batch of adds all settle first, then one `sendToBack` cleans up.
    Guard for re-entrance with a `cv.__deBgGuardAttached` flag so the
    listener is only installed once per canvas.
8. **Corner ornaments need flipX/flipY**: the same SVG is placed 4× into
   the corners, mirrored so each ornament points inward.

### SVG preprocessing

9. **Strip `<text>` placeholders before rendering to canvas.** Banner,
   title-banner, and badge SVGs contain `<text>TITLE</text>` for visual
   thumbnails — these must be removed before the shape goes on the
   worksheet canvas (text added separately via the Text tool):
   ```js
   svg.replace(/<text\b[^>]*>[\s\S]*?<\/text>/g, '')
   ```
10. **Patterns need viewBox expansion.** Pattern SVGs ship with
    `viewBox="0 0 100 100"` and `patternUnits="userSpaceOnUse"`. For tiles
    to render at their designed pixel scale on a full-canvas background,
    rewrite the viewBox to `0 0 W H` AND convert the `<rect width="100"
    height="100" ...>` fill rect to `width="100%" height="100%"` so it
    fills the new viewBox.
11. **Strip existing `width` / `height` / `preserveAspectRatio`** before
    injecting new ones into the `<svg>` tag, or you end up with duplicate
    attributes and invalid XML.
12. **Textures use `preserveAspectRatio="none"` specifically** so they
    stretch across any page aspect ratio. Patterns do NOT use this — they
    tile.

### Palette / tinting

13. **BlendColor filters stack.** When tinting a fabric.Image with a
    palette color, filter out existing BlendColor filters before pushing
    the new one:
    ```js
    obj.filters = obj.filters.filter(
      f => !(f instanceof fabric.Image.filters.BlendColor)
    );
    ```
14. **Tinting text checks three fabric types**: `i-text`, `text`, AND
    `textbox` — all three can exist depending on how text was added.
15. **Shape fill-vs-stroke fallback**: if the shape has a visible fill
    (`obj.fill && obj.fill !== 'transparent'`) set fill; else if it has a
    stroke, set stroke; else default to fill. Don't assume.
16. **Palette row click was ambiguous** — clicks on the row vs the swatch
    did different things. Make ONLY individual swatches clickable with
    `e.stopPropagation()`; set `cursor:default` on the row itself.

### UX / lifecycle / polish

17. **Expose the canvas globally**: `window.canvas = canvas;` plus a
    `coloring-canvas-ready` CustomEvent so the IIFE can late-bind.
    - **Multi-canvas apps** (addition, alphabet-train, bingo, big-small,
      chart-count, code-addition, crossword, cryptogram — anything with a
      worksheet+answerKey / worksheet+solution / worksheet+callouts pair)
      have a `getActiveCanvas()` helper already. Use a getter so clicks
      always target the active tab:
      ```js
      Object.defineProperty(window, 'canvas', {
          get() { return getActiveCanvas(); },
          configurable: true
      });
      ```
    - **Single-canvas apps** (coloring, draw-and-color, and anything else
      with only one fabric canvas and no `getActiveCanvas()` function)
      assign directly:
      ```js
      window.canvas = worksheetCanvas;
      ```
    Both paths dispatch the `coloring-canvas-ready` event. Check the target
    app's code before choosing — if it has two fabric canvases and a
    `getActiveCanvas()` function, use the getter; otherwise assign directly.
18. **DOMContentLoaded race**: the IIFE sits at the end of `<body>` and
    may load after DOMContentLoaded has already fired. Branch on
    `document.readyState === 'loading'` before attaching.
19. **`setActiveObject(img)` after `cv.add(img)`** in `addElement` so the
    newly-placed element is selected and editable immediately.
20. **Footer scale is 0.85** (not the default 0.5) specifically so thin
    strokes remain visible — going smaller makes footer lines vanish.
21. **CSS scope everything with `de-` prefix** to prevent collisions
    with the target app's Page Setup accordion styles.
22. **Reuse existing app CSS variables** (`--app-text-secondary-dark-theme`,
    etc.) so Design Elements inherits the target app's theme without
    hand-picking colors. Every worksheet app has these.

### Placement / scale table (memorize — do not tweak per app)

| Category | Placement | Scale |
|----------|-----------|-------|
| patterns | full page (pattern) | n/a (viewBox expands to W×H) |
| textures | full page (stretch, `preserveAspectRatio="none"`) | n/a |
| frames | `full-frame` | 0.92 of W |
| corners | custom 4-corner | fixed 70 px |
| banners | `top` | 0.80 of W (wide thumbs) |
| dividers | `divider` | 0.80 of W |
| badges | `center` | 0.35 of W |
| title-banners | `top` | 0.90 of W (wide thumbs) |
| accents | `center` | 0.25 of W |
| scatter-packs | `center` | 0.80 of W (wide thumbs) |
| footers | `bottom` | 0.85 of W (keeps strokes visible) |

---

## How to use this guide

Before writing a line of integration code, open
`REFERENCE APPS/coloring.html`, locate the DE IIFE and the `.de-*` CSS,
and port them verbatim. Then walk through the 22 rules above as a review
checklist. Resist the temptation to "simplify" any of them — each is
load-bearing.

If a future session needs to modify this behaviour, update this document
first, then the coloring.html implementation, then every other app that
has been integrated.
