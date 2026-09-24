---
name: Design Elements — do not repeat the coloring.html integration bugs
description: Before adding the Design Elements accordion to another worksheet app, read docs/reference/design-elements-integration.md in the repo — it catalogs 22 load-bearing rules (fabric/SVG/palette/lifecycle) discovered the hard way during the original coloring.html integration.
type: feedback
originSessionId: 7e165e80-2f01-4cb3-9ef1-fe900163c4e9
---
**Rule:** Before touching any design-elements integration work in a new worksheet
app, read `docs/reference/design-elements-integration.md` end-to-end and port the
IIFE + CSS from `REFERENCE APPS/coloring.html` verbatim. Do NOT rewrite the
helpers.

**Why:** The coloring.html integration (2026-04-18 to 2026-04-19) went through
~15 bug/fix iterations in a single session. Every "cleaner" rewrite I tried
introduced at least one of them back. The final code encodes 22 load-bearing
rules covering:

- fabric.Image.fromURL being unreliable for SVG blob URLs with native-Image
  workaround (but still used intentionally for patterns/textures)
- zoom-polluted canvas dimensions (`getLogicalSize(cv)` helper needed)
- URL.revokeObjectURL timing differs per helper
- `<text>` placeholder stripping before canvas render
- Pattern viewBox expansion + 100%/100% rect conversion
- Texture-specific `preserveAspectRatio="none"`
- BlendColor filter de-dupe (else filters stack on repeated tinting)
- 3 fabric text types to tint: i-text, text, textbox
- Shape fill-vs-stroke fallback logic
- Palette click must be per-swatch with stopPropagation (not row-level)
- Canvas global exposure + `coloring-canvas-ready` event
- DOMContentLoaded race check via `document.readyState`
- Corner ornaments: 4-placement + flipX/flipY
- Footer scale 0.85 specifically (thin strokes)
- `setActiveObject(img)` for immediate editing
- `setCoords()` after every programmatic pos/scale
- Backgrounds: non-interactive + sendToBack + remove-before-replace
- `.de-` CSS prefix to avoid collisions
- Reuse existing `--app-*` CSS vars for theme consistency

The repo doc is the single source of truth. If it's missing anything that turns
out to matter, update the doc FIRST, then the code.

**How to apply:** On any task that mentions "add design elements to <app>",
"port Page Setup accordion to <app>", or edits the DE IIFE in coloring.html —
open the repo doc before writing code. On unrelated tasks, skip.
