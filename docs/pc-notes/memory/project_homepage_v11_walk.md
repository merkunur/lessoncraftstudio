---
name: project-homepage-v11-walk
description: "WITHDRAWN 2026-09-07 (never deployed) — Homepage v11 'The Gallery of Lessons, walked through' (2026-09-06) — the scroll-driven evolution of v10: doorway, sticky easel, wall in three depths, once-sequences, exit shelf, the traveller; the body overflow-x:clip finding; gate changes; the traps bought"
metadata: 
  node_type: memory
  type: project
  originSessionId: e96fc6ab-0fbb-44e4-9733-18cdedb689af
  modified: 2026-09-06T14:55:15.718Z
---

# Homepage v11 — "The Gallery of Lessons, walked through" (built 2026-09-06, committed, NOT deployed)

**WITHDRAWN 2026-09-07 together with v12 (operator ruling: the live v10.1 homepage stays). `page.tsx` no longer renders v11 (commit `2af88922`); the `homepage-v11` components and the preview route stay on disk, unpublished. Historical record below.**

**Files:** `frontend/components/homepage-v11/{homepage-v11.css, Rooms.tsx, Threshold.tsx, FrontOfRoom.tsx, ExitShelf.tsx, Slip.tsx, ScrollStage.tsx}`, route `app/[locale]/page.tsx` (promoted), preview + gate target `app/[locale]/preview/homepage-v11/`. v10 stays on disk (`components/homepage-v10/*`, `preview/homepage-v10`) for rollback. Plan file: `~/.claude/plans/the-existing-homepage-is-witty-puffin.md`.

**What it is:** the v10 building unchanged (hero locked by three gates; six numbered rooms in the same order; cornice/dado; Direction A), made into a WALK: a drawn doorway (`.hv10-arch` profile v10 never used) opens under a CSS `view()` timeline; Room I is a sticky easel four pure-CSS instruments take turns on (balance · lids · draw-bag · sieve, native names/taglines from MANIPULATIVES); Room II hangs 15 works in three depth planes moving at three rates; Room III's alcoves play ONCE on entry + replay on hover (perpetual loops retired); Room IV's outputs slide out from behind the maker; Room V sends the sheet to 25 small screens ONCE; Room VI gains the monthly price, the reassurance line and the four promises; the exit shelf carries the hero's four instruments, running, plus the traveller. Floors only under the hero and at the exit. **Zero new i18n keys** — everything is `homepageV6` (incl. 12 v6-era keys v10 never rendered: `*.penTraveler`, `share.penClock`, `teach.penBalance`, `make.forkLabel`, `keep.chip*`, `teacher.reassure/teacherMonthly`, `paper.*Alt`) + MANIPULATIVES.

**The traveller:** `decks[3]` = hero frame 4 = first large work on the wall ("still the same sheet") = the dispatched sheet ("same sheet again — now in 25 kids' hands") = the embed deck = the frame by the door ("the lesson ends; the page is still there tomorrow"). Recovered from the v6 pen-notes.

**Stack:** CSS scroll-driven animations (`animation-timeline: view()` / named `view-timeline`), `position: sticky`, ONE client island (`ScrollStage.tsx`: IO → `.is-in`, `.hv11-js` arms once-sequences, `.hv11-noscrub` fallback when `CSS.supports('animation-timeline: view()')` is false — Firefox stable). No dependency added (§10.3). Three CSS layers: BASE = composed END poses (crawler/no-JS/reduced-motion), SCRUB (`@supports` + `no-preference`), ONCE/FALLBACK (`no-preference`). Reduced motion runs ZERO animations.

## ⭐ Measured facts / traps
- ⭐⭐ **`body { overflow-x: hidden }` (globals.css) makes the body a SCROLL CONTAINER, and on the live v10 page `position: sticky` NEVER stuck (probe at −400px) and `view()` timelines NEVER progressed.** `body { overflow-x: clip }` alone fixes both; shipped homepage-scoped in the page's inline body `<style>` (unlayered, beats `@layer base` without `!important`). Never restyle body site-wide for one page (CategoryNav lesson).
- ⭐⭐ **An element is a container for its DESCENDANTS, never itself** (the `.hv6-rek` trap, again): the exit shelf's own `grid-template-columns` in `cqw` resolved against the viewport and pushed the traveller off-screen (1477px on a 1366 screen). Percentages for the container's own tracks; cqw for what is inside.
- ⭐ **`html { scroll-behavior: smooth }` is global**: any harness must scroll with `behavior: 'instant'` (or set `scrollBehavior='auto'`) or it measures mid-scroll — my first sticky probe read −400 vs 572 for that reason.
- ⭐ **`audit-hero-identity.js` seeks every animation to 0** → a `fill-mode: both` load-in would be captured at its START pose (frames at opacity 0) identically at every width, and the MAD would PASS a frameless hero. Patched: finite animations are `finish()`ed, infinite ones paused+seeked; new `framesVisible` census + `--poison=loadin` (proven: 0/6 visible → FAIL).
- ⭐ **`audit-hero-fold.js` did not abort favicon** → on the dev server the app/+public/ favicon conflict 500s, compiles pages-router `/_error`, and POISONS app-router SSR (`Cannot read properties of null (reading 'useContext')` on every later request). Patched to abort favicon like the other gates. Recovery = kill node + wipe `.next` + restart.
- ⭐ A slip hung over a sticky card's top edge (`top:-10px`) pokes out ABOVE the later cards stacked on it — anything positioned outside a sticky-stack card's box is visible through the stack. Keep it inside.
- The local dev server has NO database: the catalogue renders only its two static groups (classroom tools, languages), so local link counts (252) understate production and the columns packing cannot be seen locally.
- `audit-room-order.js` had no `--path` (defaulted to production) — added `--path={locale}` template.
- Page height 1366×768: v10 11,614 → v11 11,424 (local dev; the DB-fed catalogue is ~1,300px taller in production for BOTH); phone 390: 15,157 → 13,316. Room I (four easel panels at 34svh + the touchable rekenrek) ≈2,050. The 9,500 target was unreachable with a pinned four-panel sequence; the harness budget is 12,000.
- ⭐ **The operator's mid-build ruling: "The homepage should be perfect. You can ignore my previous choices. Take only the current prompt as reference."** → the critic's findings I had set aside as inherited v10 choices (alcove exhibit size, the maker's dark sidebar on phones, the raw rekenrek facade, the terracotta exit, half-empty viewports) were all fixed. The visual-critic agent's first verdict was NOT-YET with 8 ranked defects; every one was addressed.
- ⭐ **A sticky box measured BELOW THE FOLD is at its pre-entry scale** (0.97 from its view() animation) — `getBoundingClientRect().height` was 3% short and the released-panel formula was 10px off. Use `offsetHeight` for layout sizes. And a scroll gate must check whether its "approach" position is even reachable: at 768×1000 the threshold is already 18% in view at scroll 0 (short hero), so the door is part-open on first paint there by design.
- ⭐ **`getComputedStyle(el).translate` returns "Xpx" with y OMITTED when zero, and keeps percentages** — parse to a full [x, y] pair or `Math.hypot` returns NaN and the assertion silently passes/fails wrongly.
- ⭐ **An element translated behind a clipped sibling can never satisfy its own IntersectionObserver** — the no-scroll-timeline fallback for the studio outputs also keys on the ROOM container's `.is-in`.
- ⭐ **A poison the page legitimately clips is a poison the gate cannot see**: the 200vw overflow div inside a `overflow-x: clip` room never grows scrollWidth; the harness now walks the page's own moving parts for right-edge breakouts at every position (the responsive gate's refusal of `clip` as an exemption, in a new dress).
- Census at 1280: v10 58 → v11 151 (of 220). Scroll-driven, paused and finished-with-fill animations all count.
- Browser support 2026-09: Chrome/Edge/Safari 26+ native scroll-driven animations; Firefox stable behind a flag → the IO fallback is first-class.

## Gates
identity (patched) · fold (favicon abort added) · copy · room-order (`--path`) · room-labels run A `--cell=.hv11-panel --art=.hv11-panel-art --label=.hv11-panel-name` + run B `--cell=.hv11-shelf-item --art=.hv11-shelf-slot --label=.hv11-shelf-plaque` · responsive · link-count · **NEW `scripts/audit-homepage-scroll.js`** (sticky, door progress, parallax rates, studio, send-once, contrast, per-block heights + `--budget`; `--mode=reduced|noscrub`; poisons sticky/arch/parallax/screens/overflow/budget). None is in deploy.sh; all manual against `localhost:3000` with the sitemap route renamed (restore BEFORE COMMIT).
