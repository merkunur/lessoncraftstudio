---
name: shell-keypad-tap-target-fix
description: "The shared shell keypad's K-2 tap-target fix (≥36px at narrow widths) + the auto-fit minmax 1fr-vs-fixed lesson + the OPEN all-shell-tap-target follow-up audit."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: c449e1ef-7c7c-48e7-af05-927e055606b1
---

The shared shell keypad (`.lcs-activity-keypad` / `.lcs-activity-key` in `mini tools/lcs-shell.css` — the `answerType:'number'` answer surface) kept a **FIXED 6 columns** in `@media(max-width:600px)` (`repeat(6, minmax(0,1fr))` + keys `width:100%;aspect-ratio:1`), so on a narrow iframe the keys shrank **unbounded** — measured **18px @ iframe-216 (page-280)**, clearing the 36px K-2 minimum only ~iframe-366 (page-430). Blast radius = the 3 keypad activities (ten-frame how-many K.CC.B.5 + write-numeral K.CC.A.3 + array build-array 2.OA.C.4); the other 7 engines use `answerType:'state'` and never render the keypad. Fixed 2026-06-18 (commit `cc2235e4`) as an **authorized protected-core touch**.

**The fix (one rule):**
```css
@media (max-width: 360px) {
  .lcs-app.activity .lcs-activity-keypad {
    grid-template-columns: repeat(auto-fit, minmax(36px, 1fr));
  }
}
```
Columns drop 6→5→4→3 as the iframe narrows so every key stays ≥36px and the keypad never overflows; engages ONLY in the failure band (iframe ≤360), so iframe>360 + the desktop base rule (6×44) are unchanged. + `lcs-shell.css?v=16→17` cache-buster in the **12 htmls** that load it (§A.13.42).

**Why:** tap targets <36px are a real K-2 usability defect (7-8-yo fingers), not audit noise.

**How to apply / the durable lesson:**
- **`minmax(36px, 1fr)`, NOT `minmax(36px, var(--lcs-tap))`.** When a minmax MAX is a **fixed length** (44px), CSS auto-fit counts repetitions by that MAX → only 2 columns @140px → 6 tall rows. A flexible **`1fr`** max makes auto-fit count by the **36px MIN** → denser columns (3c×4r @216, not 2c×6r), fewer rows, keys stretch to fill, still ≥36px, ≤6 cols within the band.
- **Verify embedded keypad widths via the STANDALONE mini-tool at the iframe's own viewport** (the iframe ≈ page−64px chrome; e.g. page-280 → iframe 216). Driving `array-activity.html` / `ten-frame-activity.html?activity=…how-many…` at viewports [216,256,296,348,366,640] reproduces the failing widths without the Next stack. Post-deploy, `audit-activity-mobile.js` catalog-wide is the authoritative embedded regression.
- **Changing `lcs-shell.css` = bump `?v` in all 12 htmls that load it** + cp css+htmls to `/var/www/lcs-media/mini-tools/` before the build (mini-tools deploy race).

**OPEN FOLLOW-UP (separate work unit, NOT done):** the keypad fix covered only the keypad. **Audit ALL shell tap targets — chrome buttons (sound/fullscreen/reset/speaker), choice chips (`.lcs-chip`), Check/Next, drawer controls — for K-2 ≥36px down to 280px.** Captured in CLAUDE.md §A.13.55. Cross-ref [[project-activities-live-inventory]] (E13 array surfaced it).
