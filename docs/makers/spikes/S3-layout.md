# Spike S3 — cross-browser layout

Run 2026-10-31 20:18 UTC on the operator PC (Windows 11) with Playwright 1.55.0: Chromium, Firefox, WebKit. Script: `node scripts/makers/spikes/s3-layout.js`.

**WebKit on Windows is a proxy for Safari, not Safari**: it shares WebKit layout but not CoreText font shaping or the macOS/iPadOS font stack. The Safari/macOS, Safari/iPad and Chrome/ChromeOS rows of §16 are still owed on real hardware.

Each page is made in each browser through the served maker screen (generate(): build + live lints + verify, §6.2 ladder), mounted in a 703×945 frame after images settle and `document.fonts.ready`; boxes (relative to `[data-lcs-page]`) of every `data-lcs-*` element, every `.ws-page` child and every `.ws-body` child are compared — `getBoundingClientRect` for HTML elements and outer `<svg>` boxes, the geometry box (`getBBox` through `getScreenCTM`) for SVG graphics inside an `<svg>`, because Firefox's `getBoundingClientRect` of an SVG element includes the stroke and Chromium/WebKit's does not (the previous run read 1.52 px on K-391's writing-line groups whose geometry agreed within 0.24 px). Pass line: every rect within 1.0 px, every lint/verify identical.

| page | rects | HTML identical | attempt | gate (C / F / W) | max Δ C–F | max Δ C–W | max Δ F–W |
|---|---|---|---|---|---|---|---|
| ten-frames en K-004 L2 | 55 | yes | {} | pass / pass / pass | 0.05 | 0.00 | 0.05 |
| ten-frames de K-024 L2 | 46 | yes | {} | pass / pass / pass | 0.02 | 0.00 | 0.02 |
| ten-frames fi G1-105 L3 | 84 | yes | {} | pass / pass / pass | 0.08 | 0.00 | 0.08 |
| ten-frames sv K-014 L1 | 24 | yes | {} | pass / pass / pass | 0.02 | 0.00 | 0.02 |
| ten-frames no K-017 L2 | 51 | yes | {} | pass / pass / pass | 0.03 | 0.00 | 0.03 |
| counting en K-006 L2 | 20 | yes | {} | pass / pass / pass | 0.02 | 0.00 | 0.02 |
| counting fi K-060 L3 | 49 | yes | {} | pass / pass / pass | 0.03 | 0.00 | 0.03 |
| counting de K-013 L2 | 29 | yes | {} | pass / pass / pass | 0.01 | 0.00 | 0.01 |
| counting fr K-011 L2 | 16 | yes | {} | pass / pass / pass | 0.08 | 0.00 | 0.08 |
| sight-words fi K-239 L2 | 20 | yes | {} | pass / pass / pass | 0.04 | 0.00 | 0.04 |
| sight-words en K-433 L1 | 30 | yes | {} | pass / pass / pass | 0.22 | 0.50 | 0.49 |
| sight-words de K-391 L2 | 19 | yes | {} | pass / pass / pass | 0.02 | 0.39 | 0.40 |
| sight-words nl K-437 L2 | 40 | yes | {} | pass / pass / pass | 0.08 | 0.00 | 0.08 |

**Max |Δ| over all pages:** Chromium–Firefox 0.22 px · Chromium–WebKit 0.50 px · Firefox–WebKit 0.49 px.

**Result:** layout PASS (pass line: every rect ≤ 1.0 px) · lints/verify PASS (identical in all three) · HTML byte-identical in all three.
