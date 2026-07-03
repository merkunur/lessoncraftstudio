# Pre-School Mechanics Pack — final report

**Commission:** add 7 pre-school (PK, ages 3–5) interaction modules + a runtime
band profile + 5 near-free variants + Studio drawing tools + gates + an
imprecise-touch QA harness. *The hard part was never the features — it was the
fingers.*

## 1. What shipped (all additive, 0 protected-core lines touched)

| Layer | Deliverable |
|---|---|
| **Band profile** | `mini tools/sb-bands.js` — the single source of truth for runtime tolerance numbers per grade; reaches modules via a frozen additive `ctx.band` (mirrors how `reducedMotion` is threaded). Legacy/K-3 modules never read it → zero behaviour change. |
| **Shared kit** | `mini tools/sb-preschool-kit.js` (`window.SBKit`) — geometry (`nearestOnPath`/`pointInRect`/`pointInPoly`/`segIntersect`/`pathLength`), `drag2d` (2-D pointer lifecycle), `equity` (audio-muted / 2-miss reveal), `ghostHand`, `rm`, `inflate`. A PEER script — never touches the protected socket. |
| **7 modules** | `sb-trace` (finger-tracing) · `sb-dot-stamp` (tap-to-stamp) · `sb-color-code` (tap legend → fill) · `sb-shape-fit` (drag shape → hole) · `sb-complete-picture` (drag missing tile) · `sb-listen-place` (audio-first spatial drag) · `sb-maze` (route a token through a corridor). |
| **5 variants** | size-order (sb-sequence) · peekaboo (sb-find-object) · odd-one-out (sb-choice-board) · feed-the-animal (sb-count-tap) · shadow-match (sb-worksheet-exercise shadow-pairs). Config + narration only — no new module code. |
| **QA harness** | `scripts/storybook/lib/touch-driver.js` + a `qaGesture()` seam per module → `qa-storybook.js` drives REAL jittered pointer input (path/taps/drops) and asserts the three invariants (below). |
| **Gates** | `validate-story.js` threads `v.band`; each PK module enforces `band.fatal.*` FATAL minimums. `gate-story.js` `GRADE_ENV.PK` narrative envelope + geometry-key exemption. |
| **Studio** | `startPlacePath` (multi-click polyline) + `startPlaceMaze` (wall drawer) in `studio-canvas.js`; `reencodeZoneChildren` extended to path/maze; prove-studio stage **m8**. |
| **Fixtures** | `module-gym` g16–g25 (one page per module + variant) · PK stories `pk-trace` · `pk-tap` · `pk-drag`. |
| **Docs** | authoring-guide §4 (PK palette + variants + Studio drawable-kind table) · authoring-playbook §5 (mechanic rows) + §6.1 (the 13 fine-motor traps). |

## 2. The tolerance model per module (what "the fingers" needed)

Every PK module is built so a kid-facing failure is **structurally impossible**:
the artifact only ever grows, a miss is a soft redirect (never a reset), and a
mid-gesture finger-lift never loses progress.

| Module | Gesture | Tolerance that makes it work | Miss behaviour |
|---|---|---|---|
| sb-trace | drag along a path | forward-ARC-gated ink (progress on forward arc-length, not lateral accuracy); band half-width 130du | off-band → soft pulsing guide-back ahead; ink never un-fills |
| sb-dot-stamp | tap near a target | snap radius 220du (tap target ≈440du); coverage-threshold completion | stray tap = gentle no-op |
| sb-color-code | tap legend → tap region | regions ≥260du, swatches ≥180du; wrong colour rejected | wrong colour → soft wobble, region stays open |
| sb-shape-fit | drag shape → hole | match by SHAPE; snap 220du | released away → drifts back to tray |
| sb-complete-picture | drag tile → gap | match by picture; snap 220du | same drift-home |
| sb-listen-place | drag object → spot | snap 220du; **muted → correct spot lit** (audio-equity) | wrong spot → drift home |
| sb-maze | drag token through corridor | corridor ≥340du; wall-cross refused (soft stop) | can't cross a wall; token persists, never resets |

## 3. Band parameters (PK vs K-3 defaults, design units)

`minTapTarget` 200/112 · `minDragHandle` 240/140 · `nearFitSnapRadius` 220/120 ·
`pathBandHalfWidth` 130/70 · `mazeCorridorWidth` 340/220 · `maxTaps` 4/— ·
`maxDrags` 3/— · `coverageCompletionThreshold` 0.70/0.85 · `offPathGrace`
170du·900ms / 100du·600ms. FATAL floors (validator-enforced): minTapTarget 200 ·
minDragHandle 240 · nearFitSnapRadius 180 · pathBandHalfWidth 110 ·
mazeCorridorWidth 300 · maxTaps 4 · maxDrags 3.

## 4. What the imprecise-touch simulation revealed

The QA drives a real jittered pointer and asserts three invariants per touch
page: **(a)** a wobbly-but-correct gesture (0.55×tol jitter + a mid-drag lift)
COMPLETES; **(b)** an off-target gesture (1.6×tol) does NOT falsely complete AND
leaves the page answerable; **(c)** progress is monotonic (never un-fills).

It earned its keep by catching two real bugs the eyeball + PK stories missed:
1. **Mis-centred drag pieces** (complete-picture, listen-place) — `setPos`
   translated to `(x-TS/2, y-TS/2)` while the shape was centred at (0,0), leaving
   the drop ~170du off. Masked by PK's 220 snap; the gym's **defaults** band
   (snap 120) exposed it. → the gym is a *distinct*, tighter test surface.
2. **Grab-offset from a jittered press** — the driver pressed DOWN on the jittered
   first point, so a drag-follow module (maze) grabbed the handle off-centre and
   the whole drag drifted into a wall (seed-dependent). Fixed by pressing on the
   exact first point. Trace never noticed (it is arc-gated).

## 5. Studio-drawable vs data-authored (the report-what-remains)

Every PK module's PRIMARY geometry is now Studio-drawable (`rect`/`point`/`path`/
`maze`), and all four kinds re-encode on a zone move (abs-fixed). The ONLY
remainder is **sb-maze's `start`/`end`/`solution`** — draw the walls visually,
set those three route scalars in the Advanced (raw settings) panel. Next Studio
increments: a `region` kind + a maze start/end/route picker.

## 6. Weak-model perfection-loop trial

A **weaker model** (Haiku), given ONLY the authoring-guide + playbook + two gym PK
stories as reference (no engine source, no coaching), authored a fresh 3-page PK
story (`pk-trial`: dot-stamp → shape-fit → listen-place). Result: it passed
`validate-story` (0 err), `gate-story --grade PK` (0 HARD / 0 WARN), and
`qa-storybook` (0 fail — autoSolve + reduced-motion + imprecise-touch taps & drops)
**with zero human geometry fixes**. The docs + gym + gates are self-sufficient.

The trial surfaced ONE real doc gap (fixed, not worked around): the guide §4 PK
palette table formally listed only `sb-trace`; the tap/drag cluster was shown only
in the fixtures. The table now lists all 7 PK modules with their taskData shapes —
so the next author doesn't have to reverse-engineer them from a fixture.

## 7. What the age band taught the playbook

- **Tolerance is the product for PK** — the band's `fatal.*` minimums are the real
  spec; the mechanics are easy, the forgiveness is the work.
- **Two test surfaces beat one** — a PK story (band 220) and the gym (defaults 120)
  disagree exactly where a centring/snap bug hides. Always run both.
- **Never-reset is a hard invariant, not a nicety** — proven by driving a
  mid-drag lift and an off-target run and asserting the page stays answerable.
- **Audio-equity is mandatory for audio-first tasks** — muted play must reveal the
  visual tell, or a non-hearing 3-yo is locked out.
- **Verify on the rendered artifact** — every module was eyeballed at phone /
  tablet / desktop + reduced-motion; the two bugs above were functional, not
  visible in a single screenshot.

## Gym URL (after deploy)
`https://www.lessoncraftstudio.com/mini-tools/storybook.html?activity=storybook.module-gym`
(pages g16–g25 are the PK modules + variants). PK stories: `…storybook.pk-trace`
/ `…storybook.pk-tap` / `…storybook.pk-drag`.
