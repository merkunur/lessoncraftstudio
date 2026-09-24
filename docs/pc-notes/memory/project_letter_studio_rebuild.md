---
name: project-letter-studio-rebuild
description: Letter Studio #25 rebuilt to the v4 bar — the autocomplete, a mode that was theatre, a leaking paywall, and the six times a wrong measurement produced a confident false defect
metadata:
  type: project
---

LIVE 2026-08-07. `live-verify-letter-studio.js` **29/29 on production**, all 11 locales.
27 commits. The operator reported one defect; measuring it found several worse.

## What was wrong

- **The complaint.** `TOL = 18` did two jobs — corridor AND checkpoint capture radius. Measured:
  the tool drew **36.2 % of every stroke for the child** (75 % of capital `I`'s serifs), and 14
  strokes completed from a **single tap**. Now the shortfall never exceeds **one pen width**
  (worst 0.74, mean 0.61 of 5.4u) — invisible, versus 3.3 pen widths before.
- **⭐ Numbers mode was theatre.** The renderer took digits from `NumberTraceCore`; the judge
  asked `AlphabetTraceCore`, which has none, and `glyphOf()` fell back to lowercase `l`. All ten
  digits were scored against a vertical line. Fixed **structurally**: `stroke-trace-core.js`
  takes STROKES, never a key, so drawn and judged are the same object.
- **The paywall leaked.** Print CSS injected at `init` for everyone → Ctrl+P gave a free visitor
  the paid worksheet. The #16 defect verbatim.
- **No letter picker existed** — three of the landing page's four classroom ideas were
  instructions a teacher could not follow.
- **`o O Q` ran clockwise** while `c C G` ran the other way, so the tool *refused the child who
  wrote it as taught*. The argument that settled it was internal: `number-trace-core` already
  drew digit `0` anticlockwise.
- **51 of 52 letterforms** rebuilt; `p`'s bowl floated 11 units above the baseline.

## The tracer model (stroke-trace-core.js)

Progress is **arc length the finger actually swept**, capped so the cursor can never outrun the
finger (`SLACK 1.15`), with `RESUME 6u` bounding a re-entry. The autocomplete came back **four
times in different dress** while building it — a LOOK term, a corridor acting as a forward
tolerance for collinear points, a zero-length sweep after a detour, and a sweep starting where
the finger had never been. Each is recorded at the line that fixes it.

⚠ **Correct geometry, wrong physics.** A swept-segment perpendicular test is right on paper and
wrong for fingers: samples arrive under a unit apart and a child's hand wobbles by more, so the
SEGMENT'S DIRECTION IS NOISE. Measured: ±2u of tremor and the ink stalled at **1.9 %** of the
letter. Direction cannot be recovered from two adjacent noisy samples; distance can.

## ⭐⭐ Six wrong measurements, each producing a confident false defect

Every one was mine, and every fix changed WHAT was measured, never a threshold:

1. `getBoundingClientRect` on a child an `overflow` ancestor clipped — reported collisions that
   did not exist (twice in probes, once in the **shared** `audit-tool-wide-viewport`, where it
   read a 2591px apparatus in a 1311px card).
2. A container-query rung set on the container ITSELF — **a container cannot style itself by its
   own size**, so no rung applied and the sheet stayed 440px on every desktop.
3. `live-verify` fetching the **bare URL no browser requests** — every script tag carries `?v=N`,
   a different cache key. Reported the deploy stale twice while it was correct.
4. md5-ing the served HTML — **Cloudflare appends a per-request token**, so it could never match.
   An assertion that cannot pass is as useless as one that cannot fail.
5. Hard-coding `/de/tools/letter-studio` — the route uses each locale's **native slug**
   (`buchstaben-nachspuren`). Reported ten locales broken on a site serving 200.
6. One browser across eleven heavy SSR pages — the **eleventh** failed every run and passed
   alone. A gate that fails by POSITION teaches you to distrust it.

## What the native panels found by reading the MODEL

- **A child who finished writing her own name was STRANDED** — the primary disabled itself on the
  last letter and is the only exit from a sequence. Five panels, independently.
- **Dutch lost fourteen graphemes including `ij`**, Spanish `ch ll rr qu` — dropped by the exact
  pattern the code condemns one function away for `ß`.
- **The paywall named a plan that does not exist** → [[feedback_the_paywall_names_a_plan_that_does_not_exist]].
- **Finland was shown a barred 7 it does not teach**, and since the bar is a separate STROKE the
  pip row told Finnish children the seven is two-stroke → [[project_per_locale_digit_variants]].
- **My spec was wrong**: the printable is 8/8/8/8/1/0, not "six rows of eight" — and the empty
  last row is a FEATURE, the row a teacher grades. My English omitted it entirely.

## Gates

`verify-stroke-trace-core` 32/32 (poison rejects the old tracer 13/32) · `verify-letter-studio`
305/305 · `mutate-letter-studio` **27 killed, 0 survived, 0 fault** · `local-test` 182/0 (704px
iframe AND standalone) · `smoke` 1603/0 (11 × 3 surfaces × 2 tiers) · `locale-layout` 66 renders ·
`print-sheets` 10/10 · `control-liveness` 346/0, **0 dead** · `wide-viewport` 12/12.

⚠ The `?v=9` cache-buster **was never committed** — served wrapper still asked for v=8 after a
successful deploy. Caught only because live-verify md5s before asserting behaviour.
