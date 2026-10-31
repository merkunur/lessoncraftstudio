# Spike S5 — live gate time

Pass line (ARCHITECTURE §6.2): lints + verify ≤ 150 ms p95 per page on a 2019 iPad. Each run below is appended.

## Run 2026-10-31 20:10 UTC

Machine: 12th Gen Intel(R) Core(TM) i9-12900 (24 threads), Windows, Puppeteer Chromium. Script: `node scripts/makers/spikes/s5-gate-time.js`. Pages: every template of ten-frames, counting, sight-words at level 2, copy 1, locales en + fi (with answer keys where the template has one).

**Throttle assumption.** CDP CPU throttling slows the renderer's main thread by a factor. A 2019 iPad is an A12 (iPad Air 3 / mini 5) or, for the base iPad 7, an A10; Speedometer-class JS benchmarks put an A12's Safari at about 1/4–1/5 of a current desktop and an A10 nearer 1/6–1/8. **6× is read as the 2019 iPad** (honest for the A12, optimistic only for the A10); 4× is the A12 midpoint; 1× is this PC. Throttling scales JS + layout + style on one thread; it does not model the iPad's GPU, memory or Safari's engine — the real-device run is still owed.

**gate** = `gatePage()` on a mounted page: all lints + 3-line title/instruction check + the type's verify (the §6.2 budget). **total** = `generate()`: build + mount (srcdoc, images, fonts) + gate + answer key — what the teacher waits for on a new page.

| throttle | maker | pages | gate p50 | gate p95 | gate max | total p50 | total p95 | total max |
|---|---|---|---|---|---|---|---|---|
| 1× | ten-frames | 20 | 1 | 1 | 1 | 17 | 21 | 21 |
| 1× | counting | 28 | 1 | 1 | 1 | 17 | 23 | 23 |
| 1× | sight-words | 30 | 1 | 2 | 2 | 19 | 24 | 25 |
| 1× | **all** | 78 | 1 | **2** | 2 | 18 | 23 | 25 |
| 4× | ten-frames | 20 | 4 | 5 | 5 | 59 | 81 | 83 |
| 4× | counting | 28 | 3 | 5 | 6 | 69 | 90 | 91 |
| 4× | sight-words | 30 | 5 | 10 | 12 | 65 | 89 | 92 |
| 4× | **all** | 78 | 4 | **9** | 12 | 65 | 90 | 92 |
| 6× | ten-frames | 20 | 7 | 9 | 11 | 92 | 131 | 141 |
| 6× | counting | 28 | 6 | 9 | 9 | 115 | 151 | 163 |
| 6× | sight-words | 30 | 7 | 16 | 21 | 102 | 149 | 160 |
| 6× | **all** | 78 | 6 | **12** | 21 | 108 | 151 | 163 |

Slowest gates at 6×: sight-words K-434 21 ms · sight-words K-434 16 ms · sight-words K-391 14 ms · sight-words K-391 12 ms · sight-words K-440 11 ms.

Poison: a verify busy-waiting 300 ms was measured as ≥ 300 ms — the timer brackets the verify.

**Result: PASS** — gate p95 at 6× (the 2019-iPad proxy) is 12 ms against the 150 ms line · 1×: 2 ms · 4×: 9 ms · 6×: 12 ms.

