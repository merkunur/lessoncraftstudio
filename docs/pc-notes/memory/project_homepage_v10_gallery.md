---
name: project-homepage-v10-gallery
description: "Homepage v10 \"The Gallery of Lessons\" — the cartoon-art-gallery rebuild, its device-identical hero, and the gate traps it bought"
metadata: 
  node_type: memory
  type: project
  originSessionId: 22a6e7d0-c74b-474a-83d7-8425a3ae47a2
  modified: 2026-08-02T14:06:10.094Z
---

**Homepage v10 "THE GALLERY OF LESSONS"** — promoted 2026-08-02 (preview kept at
`/[locale]/preview/homepage-v10`). Replaces v9.2. Built after the operator rejected the v9 line
outright ("It is ugly", "the background colour is a piece of shit").

**Four operator directives, verbatim in force:** (1) the hero must look **the same on all
devices** and be a visual composition of the product as a whole; (2) **cartoon art gallery**
concept; (3) **animated tools in action**; (4) strikingly beautiful, creative, innovative,
professional.

**The governing sentence: THE GALLERY IS DRAWN, THE ART IS REAL.** Architecture (cornice, wall,
panelled dado, oak floor in one-point perspective, museum pedestals) is flat illustration built
in CSS. Everything hung or standing is real product — published deck thumbnails, the 47 apparatus
renders, and the pure-CSS instruments from `homepage-v6/`, running. ⭐ **The apparatus renders at
`/mini-tools/tool-previews/*.webp` ARE already flat-vector gallery art** — that is why no exhibit
art had to be invented; only the building was drawn.

**Files:** `frontend/components/homepage-v10/{homepage-v10.css,GrandHall.tsx,Rooms.tsx}`, route
`app/[locale]/page.tsx`. Keeps the `hv6` class (token scope + focus ring) and imports BOTH
stylesheets; the twelve instruments are consumed from `homepage-v6/`, never copied.

**i18n cost ZERO new strings and zero machine translation** — prose reads from the `homepageV6`
namespace (already native ×11, already tier-truthful), instrument names from `MANIPULATIVES`
(native per tool), and **room numbers are ROMAN NUMERALS — language-neutral by construction**.
Verified native in de/fi/es, 11/11 locales, 203 links each, 0 `MISSING_MESSAGE`.

## The hero law

One 3:2 poster, `container-type: inline-size`, every coordinate in `cqw` (both axes). Sized to
**FIT THE FOLD, not fill the width** — a width-filling poster is 911px tall at 1366 against a
~590px fold, which put the floor, plinths and every working instrument below it. Only deviation:
the H1 has a one-sided `max(27px, 7.1cqw)` legibility floor. Gate:
**`scripts/audit-hero-identity.js`** (poison-tested; clean ≤4.7, broken 94.6).

## ⭐ The traps this arc bought

- ⭐⭐ **A GATE THAT EXEMPTS A CLASS OF WIDTHS IS BLIND TO EXACTLY THAT CLASS.** My first
  hero-identity gate skipped the pixel check below the H1 crossover; the poison scored **92 at
  320 and the gate said PASS** — a fully broken PHONE hero, the case the operator cares about
  most, would have shipped. Fix: mask only the ONE licensed deviation (the headline band) and
  gate every width strictly. Never exempt a whole viewport class.
- ⭐⭐ **`cqw` INSIDE AN ELEMENT THAT DECLARES ITS OWN `container-type` RESOLVES AGAINST THAT
  ELEMENT.** `.hv6-rek` is its own container, so bead sizes written in poster-cqw rendered at
  1.7px instead of 10.5px — an instrument present, animating, and effectively invisible. An
  element is a container for its DESCENDANTS, never for itself, so its own box still resolves
  against the stage. Nothing in a DOM census or the responsive gate can see this.
- ⭐⭐ **NEVER RESTYLE `body` TO SUIT ONE SECTION.** Setting `body{background:#0E544A}` for
  overscroll made the whole category nav invisible: `CategoryNav.tsx:97` is
  `bg-[#146B5E]/[0.04]` — a 4%-opacity tint with dark text that relies entirely on what sits
  behind it. Site-wide chrome is sitting on the body. Measured after fix: 13.68:1.
- ⭐ **A REUSED INSTRUMENT'S TRAVEL CAN SILENTLY FLOOR TO ZERO.** `--push: clamp(0px, 100cqw −
  333px, 92px)` returns 0 below a 333px rail — the beads would not have moved at all. Restate
  travel as a FRACTION of the rail's own width.
- ⭐ **AND THE RAIL MUST BE WIDER THAN ITS BEADS**, or `overflow: clip` slices them mid-push.
  Row 2 pushes four beads and was cut; row 1 pushes three and looked fine — a defect visible
  only mid-animation, so the probe SEEKS the animation to its held pose.
- ⭐ **I BLAMED THE PAGE TWICE FOR DEFECTS IN MY OWN MEASUREMENT** — upscaling the 412 shot to
  the comparison width, then comparing a heavily-downsampled large shot against a barely-touched
  small one. Both fixed by measuring fairly (downsample-only, equal blur), NEVER by loosening the
  threshold.
- ⭐ **`--path` WAS DEAD CODE IN `audit-homepage-responsive.js`** — documented at line 19, never
  read; the gate could not target a preview route at all. Also replaced the rotting class-name
  exemption list with a semantic `[data-bleed]` hook (`.hv6-masthead` had ZERO references).
- ⚠ **Git Bash mangles a leading-slash argument** into a Windows path — `--path=/{locale}/…`
  needs `MSYS_NO_PATHCONV=1`. The link-count gate substitutes an EXISTING locale in the path
  (`--path=/en/…`), the responsive gate uses a `{locale}` token. They differ.
- ⚠ **`frontend/app/sitemap.xml/route.ts` must be renamed back** after any dev session
  (CLAUDE.md §14.5) or the live sitemap breaks.

## Two things cut after building them

**The figures** (flat silhouettes for scale) read as TOMBSTONES — a dark rounded-top slab on a
pale floor is a gravestone. **The pilasters** read as RENDERING ARTEFACTS at any contrast
visible enough to see. Both recorded rather than silently dropped.

## Operator corrections (2026-08-02, after the first deploy)

**Hero plinths.** `planks` and `lids` were rejected: at ~110px the planks read as two coloured
bars and a chevron, the lids as an orange blob. Neither says "instrument" to someone who has not
met the tool. Replaced by the **open number line** (axis + three jump arcs drawing themselves +
a marker that lands) and the **weight bench** (measurement-bench weight mode: an apple weighed
against a growing stack of cubes). Both are new cqw-authored CSS vignettes in `homepage-v10/`,
17s and 13s — coprime with the clock (12s) and rekenrek (9s) beside them. The number balance was
tried in between and then replaced on operator instruction; its cqw overrides were DELETED, not
left behind.
⚠ **The weight bench is Premium-gated** (`measurement-bench.js:83`) and gating is structural, so
its preview cannot be rendered by `generate-tool-previews.js` at all — which is why the hero uses
a hand-built vignette. The touchable piece stays the free rekenrek.

**Room I was rebuilt** as a sculpture bench after "neither beautiful nor creative".
⭐⭐ **MY DIAGNOSIS WAS WRONG AND MEASUREMENT CAUGHT IT.** I read the screenshot as overlapping
labels; they tiled their columns exactly. The real defect was ALIGNMENT — labels fed the tools'
full-sentence *taglines* ran 2/3/5/2 lines, so with `align-items:end` four exhibits sat at four
different tops. I would have fixed the wrong thing. Now one grid whose first row is a FIXED
height, so baseline and label-top are shared by construction; labels carry the NAME only.
Gate: **`scripts/audit-room-labels.js`** (alignment per row, label-height variance, collisions,
column spill, non-vacuity, exhibit-not-a-slab), poison-proven against the shipped build.

**Four self-inflicted traps from that rebuild:**
- ⭐⭐ **A GATE THAT EXEMPTS A CASE IS BLIND TO IT — TWICE NOW.** v1 of this gate measured
  collisions that did not exist and PASSED the broken build. v2 compared every exhibit to every
  other and over-fired at 320, where a single-column grid is CORRECT. Group into rows first.
- ⭐ **AN INLINE CUSTOM PROPERTY BEATS EVERY MEDIA QUERY.** `style={{'--bench-n': 4}}` pinned the
  bench to four columns at 320px. Column counts belong in the stylesheet.
- ⭐ **TWO COMPONENTS SHARED `.hv10-bench`** — the Studio's white card background leaked onto
  Room I and made four exhibits read as one white slab.
- ⭐ **`height: 100%` ON AN `align-self: end` GRID ITEM RESOLVES AGAINST NOTHING**, so an `<img>`
  with width/height attributes fell back to its intrinsic aspect and rendered 188px tall in a
  112px row, overflowing the row above. A wrapper with a DEFINITE height is the fix; appending a
  second rule instead of editing the first also left an `aspect-ratio` alive to fight it.

## Still open

The visual-critic pass, and operator sign-off on the promoted page. Deploy is batched by the
operator and has NOT run.

## Room order changed 2026-08-02 — worksheets moved to II

Operator: put worksheets between tools and activities. Order is now
**I Tools · II Worksheets · III Activities · IV Makers · V Sharing · VI Plans** + unnumbered exit.

⭐⭐ **A REORDER HERE IS NOT A LINE SWAP — two things fail SILENTLY:**

1. **The Roman numerals are HARDCODED literals inside each room component**
   (`<p className="hv10-room-label">II</p>` in `Rooms.tsx`), NOT derived from position.
   Swap the JSX alone and the gallery renders **I, III, II, IV, V, VI** — valid HTML,
   visibly wrong, caught by no existing gate.
2. **The rooms are a CHAINED NARRATIVE.** Room III read *"Every worksheet is **also**
   paper"* — an answer to the activities room before it. Moved to second it becomes the
   first mention and the "also" refers to nothing. **The coupling was in every language**
   (de *auch*, fr *aussi*, fi *myös*, es *también*, sv *också*, nl *ook*, da/no *også*).

Both are now covered by **`scripts/audit-room-order.js`** (section order + I-VI numeral
sequence + connector absence, per locale, non-vacuity asserted first). Poison-proven: it
FAILED against production's old order before deploy.

⭐⭐ **ALL ELEVEN PANELS FOUND THE SAME DEFECT IN MY ENGLISH.** I proposed *"Every
worksheet, on screen and on paper"*. Every panel independently rejected it:
**"on screen" is a LOCATION, not a behaviour** — a PDF in a viewer is also on screen, so
it silently drops the interactivity claim that is the room's whole point; and a **verbless
comma makes a caption**, which the body (*"Not some of them — all of them"*) cannot argue
with. fi and da added that the comma invites the **distributive** reading — *some* on
screen, *others* on paper — the exact misconception the room exists to kill. Three
proposed the same repair, now shipped: **"Every worksheet plays and prints"**.

⭐ **The eleven finals deliberately DIVERGE in form, and that divergence IS the native
judgement** — fr/it/nl/sv/da/no chose paired verbs; de+es chose a colon label (es because
the room's own chips already say *Se juega / Se imprime* and a third statement stutters);
pt rejected verbs because *joga* only reads as "plays interactively" to someone already
told so; fi dropped the quantifier so the body's *"Ei vain osa"* answers an unqualified
plural. **Do not homogenise these.**

⚠ **OPEN, from the Swedish panel unprompted:** `practice.heading` ("Then hand the idea to
every child" / *"Lämna **sedan** över idén…"*) has the SAME defect one room down — the
sequencing adverb now points across an intervening room and *"the idea"* has a nearer
wrong antecedent (the worksheets). Weakened, not broken; **not fixed, awaiting the
operator's call.** All ten other panels said `practice.body`'s worksheet clause is
"merely redundant, not broken".

Also corrected (all pre-existing): `Rooms.tsx` had **two** `ROOM III` banners and headed
Members' Room `ROOM IV` while rendering `VI`; `page.tsx` said "five rooms". The comments
now match what renders and carry the numeral trap.
