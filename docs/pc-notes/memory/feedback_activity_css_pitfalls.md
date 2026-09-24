---
name: activity-css-pitfalls
description: "10 unignorable CSS pitfalls from the v7.1→v7.13 activity-page polish session (2026-05-22). Re-discovering any wastes hours. iframe vh/vmin circular dep, flex axis confusion, grid max-width left-shift, 1fr huge gaps, width vs max-width, runtime CSS specificity, overflow:hidden clipping, tablet breakpoint, cache-buster requirement, tests vs visual approval."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 9aafa7f7-1a62-4256-b107-8ee77eb54f91
---

# Activity-CSS pitfalls — v7.x lessons

Hard-won rules from a 13-iteration polish session that should have been 2-3. Apply at every `/[locale]/activities/[slug]/` + `mini tools/*-activity.html` edit.

**Why:** I burned ~6 hours rediscovering the same handful of CSS pitfalls. Each rule below is a real iteration I shipped, the operator hated, and I had to undo.
**How to apply:** before adding any CSS to lcs-shell.css or a wrapper, scan this list. If your change is touching anything in these 10 categories, prove you've thought about the pitfall.

## The 10 rules

1. **iframe `vh`/`vmin` is iframe-relative, NOT viewport-relative.** Content that grows the iframe via ActivityIframe postMessage auto-resize creates a circular dependency: bigger iframe → bigger `vh`/`vmin` basis → bigger clamp values → more content growth → more iframe growth. Use `vw` (viewport-stable) for content font sizes that mustn't grow with iframe height. *(Anchor: v7.5 prompt clamp(22, 6vh, 48) → 48px ceiling → card 1228px tall.)*

2. **`display: flex` defaults to `flex-direction: row`.** `justify-content: flex-start` LEFT-aligns horizontally, not top-aligns vertically. Always set `flex-direction: column` explicitly when you want column behaviour. *(Anchor: v7.4 .lcs-stage{justify-content:flex-start} → engine wraps off-center -19 to -57px LEFT.)*

3. **CSS Grid items with `max-width` fall back to `start` (left) when stretch fails.** Default `justify-self: auto` inherits `justify-items: stretch`, but max-width prevents stretching → fallback is `start`. Always pair `max-width` with `place-self: center`. *(Anchor: v7.10 cb-tile{max-width:76} → tiles left-shifted in columns.)*

4. **`grid-template-columns: repeat(N, 1fr)` with content-sized items creates HUGE inter-item gaps.** Each column = board-width/N regardless of item content. Use `repeat(N, auto) + justify-content: center` for content-sized columns with only the explicit `gap` between items. *(Anchor: v7.11 desktop cb-cols-2 → inter-tile gap 320px between 49px tiles in 351px columns.)*

5. **`width: X` ≠ `max-width: X`.** For UNIFORM sizing across content variations, use `width: X` (forces exact). `max-width: X` is a cap — items can still vary smaller. *(Anchor: v7.11 Which-group-has-more: 3-item tile 170×170 vs 5-item tile 241×241; v7.12 fixed-width made both 220×220.)*

6. **Engine-injected CSS at runtime wins on same-specificity ties.** Engines (cb/tf/cvc/wb-core.js) call `appendStyles()` AFTER DOM parses → engine rules come later in cascade than wrapper inline `<style>`. Use `!important` on every engine-overriding rule. *(Anchor: v7.2 wrapper rules without !important → tf-frames-area stayed `row` instead of `column`.)*

7. **Card `overflow: hidden` + fixed height clips engine content → visually reads as "elements overlapping".** Stage child has `min-height: 0` (shell default) → shrinks below content height → overflow visible past stage into actions/Check area, clipped at card edge. Use `.lcs-app.activity { height: auto; overflow-y: visible }` universal; iframe `min-height: 66.67vh` (floor only). *(Anchor: v7.7 cvc engine overflow 171px → 141px overlap with Check.)*

8. **Tablet (768) is its own breakpoint, NOT a "wide mobile" or "small desktop".** Desktop grid layouts with `minmax(0, 1fr)` fr-columns shrink to 0 on tablet → controls overflow into title area. Extend mobile flex-stack header to `≤1023`; grid only at `≥1024`. Always test desktop + tablet + mobile separately. *(Anchor: v7.7 grid worked desktop, broke iPad-mini 768 with 71px title-controls overlap.)*

9. **iframe-src cache-buster `?v=N` is REQUIRED, not optional.** Browser bfcache + iOS Safari/Android WebView ignore `Cache-Control: max-age=0` under back-forward restoration. Use `ACTIVITY_WRAPPER_VERSION` constant in page.tsx; bump on every wrapper change. *(Anchor: v7.3 added the constant after operator's phone kept serving stale HTML despite max-age=0.)*

10. **Tests passing ≠ visual approval.** Programmatic assertions catch overlap/gap/padding/font-size but miss "looks unprofessional". Capture screenshots at desktop (1920) + tablet (768) + mobile (375/390) and EYEBALL them before declaring shipped. Cross-ref §A.13.43. *(Anchor: v7.5 reported 109/109 PASS while operator saw cramped + off-center layout.)*

## Operator-collaboration bonus

- **Precise deltas from operator (+30%/-30%) → apply literally.** Don't second-guess; declare side-effects but don't pre-adjust. v7.10 was first-try success because of this.
- **Engine has content-aware classes already** (`cb-cols-2`/`cb-cols-4`, `cb-tile--text`/`cb-tile--group`, `tf-double`, etc.). Use them for per-variant CSS. Don't try to detect activity ID from CSS.
- **Cache-busting cascade** (per CLAUDE.md §A.13.42): `lcs-shell.css?v=N` in ALL 7 wrappers same-commit when shell changes; `ACTIVITY_WRAPPER_VERSION` in page.tsx bumps independently when only wrapper HTML changes.
- **If operator hits frustration breaking point → STOP and offer rollback.** `git revert <commit>` is non-destructive. v7.9 → v7.8 rollback was the right move; powering through would have been worse.

Cross-reference [[feedback-activities-approval-cadence]] for the broader "tests passing isn't approval" doctrine, and CLAUDE.md §A.13.47 (canonical version of this same content).
