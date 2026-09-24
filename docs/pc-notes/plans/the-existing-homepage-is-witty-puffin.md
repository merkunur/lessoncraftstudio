# Homepage v12 — "The Day, from the teacher's side"

Single authoritative plan (rewritten 2026-09-06 after the second and third planning waves; the earlier drafts with
the 12:15 lamp, the seven pips, the poker fan and the saving line are DEAD). Two companion files are BINDING:
- **The Drawing Bible** `the-existing-homepage-is-witty-puffin-agent-a7617cb1a71495659.md` (the ten-rule drawing law,
  the 22-part catalogue, the hand-authored 25-desk seating plan §2.21, the spread §2.22, the contact-sheet plan §5).
- **The Motion Score** `the-existing-homepage-is-witty-puffin-agent-a97391c7620d338cf.md` (every animated thing per act
  with ranges, the dead-scroll proof, the peak second by second, the clock, the phone table, the ten cheapness rules).
Where this file and a companion disagree, the reconciliations in §5 win.

---

## 0. ROUND 5 — THE HERO REWORK (2026-09-07, the ACTIVE step; §1–§12 below are the built and committed base)

### 0.1 Context
v12 is built, gated and promoted (commits `6f83f987` → `99e2a23e`, not deployed). The operator's read of the hero on
their own window (1876×1840, nearly square — screenshot `C:\Users\rkgen\Pictures\Screenshots\Skärmbild 2026-09-07
040834.png`) gave four verdicts: (1) the chairs at 8:00 are wrong — they should be UP ON the desks, upside down, but
they stand beside them; (2) the instruments on the cart are placed strangely and nobody can tell what they are or why;
(3) the bottom half of the screen is empty oak; (4) the hero, the first thing a visitor sees, "has to be a million
times better". The causes are in the CSS (Explore report, all verified): the `.is-up` chair polygon's foot sits at
`bottom: 33%` of the desk box, i.e. on the floor in front of the desk (`homepage-v12-room.css:291-303`); every
instrument is drawn at `opacity: .42` ("asleep") on a v10 museum plinth 4u wider than its cart, at ~40px
(`:442-475`, `Classroom.tsx:207-214`); the hero scene is width-capped at `--hv12-stage-max: 1600px` and TOP-aligned
in a 100svh stage, so at 1876×1840 the picture is 1600×800 and the remaining 1040px is the floor extension
(`bottom: -40cqw`) then bare green wall (`homepage-v12.css:75-134`, `homepage-v12-room.css:126-132`).
Intended outcome: the first screen impresses at every window shape — H1 → the pair → the room, the chairs upside
down on the desks, a named cart, sun on the floor — and no window ever shows bare floor under the picture.

### 0.2 The changes (art-director plan, verified against the source; units = cqw of `.hv12-scene`)
Files: `frontend/components/homepage-v12/{homepage-v12-room.css, homepage-v12.css, homepage-v12-tracks.css,
Classroom.tsx, Acts.tsx}`. Reuse: `ToolVignette` (hv6), `MANIPULATIVES` names via `d.front[].name` (native ×11),
the existing `hv12Wake`, `.hv12-slip`, the `.hv12-cast` shear, the phone block's reading model.

**A. Composition (eye order H1 → pair → room)**
1. H1 in a clean left column, higher: `.hv12-hero-type { left: 21.5cqw; width: 30cqw; bottom: 31cqw }` (same for
   `.hv12-track.is-last .hv12-hero-type`). Frees y 21→42 for the pair.
2. Wall clock to the corner, the framed work under it: `.hv12-wallclock { left: 14.8cqw; top: 4.8cqw; width/height:
   5.6cqw }` (inner hv6 sizes ×0.93); frame `--x 14.8, --y 11.6, --w 5.6`.
3. The stamp on the board in chalk (hero + last): `left: 54cqw; top: 5cqw; font-size: max(34px, 5.5cqw)`.
4. The number line reads as chalk: `.hv12-chalkline { left: 55cqw; top: 12cqw; width: 26cqw; height: 9cqw }`, axis
   `.3cqw`, arcs `.28cqw` coral, three hops; asleep = `opacity: .72` + paused (never .42); delete the dead swipe rule.
5. The pair 15u each, tops at y 21, feet on the desk: `.hv12-pair { left: 3cqw; top: 21cqw; width: 28cqw; height:
   21.6cqw }`, `.is-a { width: 15cqw; rotate: -4deg }`, `.is-b { left: 13.2cqw; width: 15cqw; rotate: 3deg }`; drop the
   `@media (max-width:1200px) .is-b` override; `.hv12-claim-fw { font-size: max(11px, 1.05cqw) }`.
6. The sub notice left of the cart: `.hv12-sub { left: 40cqw; top: 24.6cqw; width: 21cqw; font-size: 14px }` (shared
   with 15:00).
7. A real dawn shaft on the floor: `.hv12-cast::before { background: rgba(255,238,196,.40) }` (dawn, warm),
   `::after { rgba(236,246,250,.22) }` (day, cool); mullion mask bars narrowed to `48.6%/51.4%` and `45.5%/47.5%`;
   transform `skewX(calc((.5 - var(--sun))*44deg)) scaleX(calc(1.6 - min(var(--sun),.5)*1.9))` = the room's own shear.
8. Desks separate from the floor: desk top `--g10-floor-lit` one step lighter with a hard front-edge band (the
   Bible's rule 5 — the oak-on-oak read is why the room looks flat).

**B. Chairs UP (foot on the desk top, legs up, backrest over the near edge; camera from the back of the room)**
9. `.hv12-desk.is-up::after { left: 33%; width: 34%; top: -27%; height: 93%; bottom: auto; background:
   linear-gradient(180deg, var(--hv12-teal) 0 61%, #0F5449 61%); clip-path: polygon(0 100%,100% 100%,100% 52%,72% 52%,
   82% 0,66% 0,58% 52%,42% 52%,34% 0,18% 0,28% 52%,0 52%) }` — legs 0–52% (tips 2.4u up), seat slab 52–61% whose
   bottom lands at y 30% of the desk box (ON the top face, 0.7u above the near edge), backrest 61–100% hanging over the
   edge in deeper teal. `--dev` on the two leg tips.
10. `.is-up[data-pose="side"]::after { left: 39%; width: 22%; clip-path: polygon(0 100%,100% 100%,100% 52%,64% 52%,
    70% 0,30% 0,36% 52%,0 52%) }` (end-on). No per-band values (all desk-%).
11. Chairs DOWN for 09:40/13:00/15:00: `.hv12-desk::after { height: 70%; bottom: 0 }`, backrest = top 43%; keep the
    `out`/`turned`/`none` poses. (Today the backrest starts at 10% and eats the top face.)

**C. The cart (stays by the door — the 08:20 wake and the 15:00 "asleep" rhyme both depend on it)**
12. Redraw `.hv12-trolley` as a classroom cart: `left: 62cqw; top: 24cqw; width: 24cqw; height: 15.6cqw` (foot 39.6);
    drop the `hv10-plinth` body; DOM: `<i class="hv12-cart-shelf is-top">` (y 30.2→31.2, walnut, cut top face),
    `is-low` (y 34.6→35.6), four `.hv12-cart-post` .5u walnut, castors 1.4u at each end, the handle at the LEFT end
    (`left: .4cqw; bottom: 8.4cqw; height: 3.5cqw`, teal U); one shadow (existing `::after`, foot 39.6).
13. Instruments ≥12u: balance 12u top-shelf left (`.is-balance { left: .8cqw; bottom: 8.4cqw; width: 12cqw }`, `--z`
    per container band = 12cqw / 260px native), lids 10u top-shelf right, rekenrek 12u on the lower shelf (`bottom:
    4cqw; height: 4cqw`). Asleep = `opacity: .78` + `animation-play-state: paused`. Remove the `.hv12-trolley
    .hv12-piece` `--z` overrides that defeat the container bands (`homepage-v12-room.css:568-571`). Re-anchor the
    08:20 `.hv12-liveover-box.is-rek` to the rekenrek's new place (measure with the probe, as before).
14. Name plaques as real text in the hero track (`Acts.tsx`): `<ul class="hv12-front-names">` with `d.front[i].name`
    for rekenrek / number-balance / lids, `<li class="hv12-plaque is-name">` on each shelf's front edge (`left
    63/75/63cqw; top 31.4/31.4/35.8cqw`), Nunito 700 11.5px on the cream slip. (The names are MANIPULATIVES titles,
    native in 11 locales — no new i18n.)

**D. Tall / square windows (the operator's 1.02:1) — the stage is picture + band, never floor**
15. `--hv12-stage-h` (default `100svh`) in `homepage-v12.css`: `.hv12-stage { height: var(--hv12-stage-h) }`,
    `.hv12-stage + .hv12-act { margin-top: calc(-1 * var(--hv12-stage-h)) }`, `.hv12-act { view-timeline-inset:
    var(--hv12-stage-h) calc(100svh - var(--hv12-stage-h)) }` (a zero-height line at the stage's foot; act 1 keeps
    `0 100%`).
16. Split the phone blocks (`homepage-v12.css:597-642`, `tracks:208-264`) into a READING-MODEL block under
    `@media (max-width: 1000px), ((min-width: 1001px) and (max-aspect-ratio: 5/4))` (stage-foot line, tracks
    `height:auto`, words static in flow at `max-width: 60ch; margin: 24px auto`, `.hv12-scenebox` static for
    `:not(.is-hero)`, the picture above the words in z) and a PHONE-ONLY block (`--hv12-chrome: 64px`, the `--cs`
    recrops, the 26px ink H1, the 8px pair head, the clock-pill sizes). In the tall block: `--hv12-stage-h:
    calc(min(100vw, var(--hv12-stage-max)) / 2 + var(--hv12-band))`; `.hv12-plate .hv12-scene { width: min(100%,
    var(--hv12-stage-max)); margin-top: 0 }`; the hero keeps its desktop scenebox (H1 in the picture, band under it);
    `.hv12-act[data-act="1"] { min-height: calc(var(--hv12-stage-h) + 30svh) }` so 08:20 does not start at scroll 0.
    The harness's phone anchor shift (`0.4 * vh`) becomes `stage-h`-based (read `--hv12-stage-h` from the page).

**E. Load: the sun comes up (the plan's one load move, finally built)**
17. `@property --dawn` (number, 0); `.hv12-js .hv12-plate[data-plate="1"] .hv12-room { animation: hv12Dawn 1400ms
    cubic-bezier(.2,.7,.2,1) 120ms forwards }`; consumers: `.hv12-cast::before { opacity: calc((1 - var(--sun)) *
    var(--dawn, 1)) }`, the foot shadows `opacity: calc(.55 + .45 * var(--dawn, 1))`, a per-bay `<i class="hv12-bay-dawn">`
    (dawn sky `#B9C9D6→#E7D3C4`, `opacity: calc(1 - var(--dawn, 1))`); H1 load lift `translate: 0 .35em → 0` 600ms
    (no opacity: it is the LCP). Under reduce / no JS `--dawn: 1`.

### 0.3 Order of work
Room first (B chairs, C cart + plaques, A.4/A.7/A.8 light + chalk + desks) → composition (A.1–A.3, A.5, A.6) → the
tall-window model (D) → the load move (E) → the 08:20 overlay re-anchor → gates.

### 0.4 Verification
- Shots at 1366×768, 1920×1080, **1876×1840** (the operator's window), 1600×1200, 2560×1440, 360×740 of 08:00, 08:20,
  09:40, 13:00, 15:00; I read the hero at 1366, 1876×1840 and 360 myself: chairs upside-down ON the desks, three
  named instruments legible on a cart, the pair's endonym + framework strips readable, no bare floor below the band
  at any width, the dawn shaft on the floor, the number line reading as chalk.
- `scripts/audit-homepage-day.js` en/de/fi at 1366×768, 360×740 and **1876×1840** (+ reduced, noscrub, cwv `--cpu=1`);
  `scripts/audit-homepage-v12-fold.js` en/de/fi with 1876×1840 and 1600×1200 added to its viewport table (+ the 3
  poisons); `audit-homepage-v12-copy.js`; the WebKit + Firefox engine probes (`.scratch/v12-engines.js`).
- The whole-page critic once more on the hero + 08:20 + 15:00 (design/craft/honesty/emotion ≥ 8), then the
  operator's own read on `http://localhost:3000/en` (dev server on 3000; the sitemap route disabled for dev, restored
  before the commit). Commit with explicit paths; no push, no deploy.

---

## 1. Context

**The brief.** Transform the homepage into a complete, art-directed, SOTD-level experience with a beginning, a
progression and an ending; keep the identity recognisable; full creative ownership; no generic SaaS patterns; use the four
design skills; employ consumer-psychology, marketing, art-director and artist experts as many times as needed; "a
masterpiece, a piece of art"; nothing on the current page is indispensable; the concept need not be a gallery.
**The governing principle (operator):** educational products is a market with very big established brands; unless
everything a teacher encounters (content AND design) impresses her, she will not subscribe; the page must show that we
understand her real problems and have a real solution.

**What the reviews established** (three v11 reviews; then a five-country K-3 teacher panel, a sixteen-homepage
competition analysis, an accessibility/SEO/performance review, an adversarial jury, a motion designer, an illustrator, a
typographer, an English copy panel and a fact check):
- v11 (the gallery walked through, commit `b66ec704`) ceilings at "Honourable Mention": the visitor is an observer, the
  moat (11 languages, native, national curriculum) is invisible, thirteen CTAs, no typographic climax.
- The teachers' real problems, ranked: three levels in one room (5/5); the sheet found is in the wrong language or badly
  translated (4/5); materials cost her own money; at the answer key while 25 wait (5/5); digital tools need student
  accounts and data agreements (no accounts = usable TOMORROW, otherwise a meeting); nobody says her curriculum word;
  Sunday-night planning; a class of many languages; paying in dollars; the projector fails. Our product genuinely solves
  the first, second, fourth, fifth, eighth and tenth. "Lunch under a lamp" is nobody's day in any of the five countries;
  the lamp is real after the children leave.
- Every competitor opens with a magnitude number, a search box or tiles, "free" with the limit hidden, a mascot on a
  gradient, and static screenshots. None shows the same resource in two languages on one screen, names a non-US/UK
  curriculum, or prints the limit of free beside the free button. The one image no competitor can fake is eleven real
  sheets of the same page.
- The jury's verdict on the revised concept: REWORK, not KILL: "beats every one of the sixteen; the plan contradicted
  itself and its proofs were illegible." Its rulings are folded in below.

**Intended outcome.** The visitor walks into a classroom at eight with the chairs still on the desks, and by three the
worksheet she watched being made is lying there in her own language. Tell-someone sentence: *"It's the site where you
scroll through a school day, the classroom instruments are actually running, and after the children leave one
worksheet turns into eleven languages on the desk."*

## 2. Design read, dials, stack

Reading this as: a redesign-overhaul of a K-3 educator platform's homepage for teachers in eleven countries, with an
illustrated paper-cut classroom language on the site's existing foundation (the drawn board wall, oak floor, walnut
frames, the pure-CSS instruments, Direction A cream `#FBF3E4` / teal `#146B5E` / coral `#F2784B` / ink `#14322D`, Baloo 2 +
Nunito). Dials: VARIANCE 8 · MOTION 8 · DENSITY 3. Stack locked (§10.3: no new dependencies): Next 14.2 / React 18 /
Tailwind 3.4 / hand CSS; motion = CSS scroll-driven animations (named view timelines + `timeline-scope`, registered
`@property`), `position: sticky`, ONE IntersectionObserver island; design-taste-frontend §3.A/§5 (Tailwind v4,
motion/react, GSAP) void; scroll-craft's dark tokens → Direction A. Real product is the only content: 40,000 real
thumbnails, the CSS instruments, the real activity, the real QR, the site's own worksheet paper.

## 3. The concept

One room, one day, 08:00 → 15:00, from the teacher's side. Every act opens on a problem she recognises from her own
week and shows the product solving it in the same frame. Three signature devices:
- **The clock is the scrollbar, the table of contents and a product.** The shipping `hv6-clock` rides top-right for the
  whole page; its hands are the scroll position (piecewise per act, so at every anchor the hand reads the stamp and is
  always moving inside every act); eight coral pips are anchor links; at 15:00 the hands stop.
- **One light.** `--sun` (daylight outside, monotonic 0→1) swings the window casts from a long cool east cast to a long
  orange west cast through the door and cross-fades two static wall layers; the casts are positive paper shapes carrying
  the window's mullion cross.
- **The blind.** The only interior light event: at 13:00 the projector blind drops (the room darkens, the board is the
  brightest thing, the QR is projected); it stays down at 14:00 so the lamp is honest; it is up at 15:00. Every cut on the
  page is motivated by light or by the clock; nothing travels under its own power.

## 4. The eight acts (heights from the motion score; desktop 1366×768 total ≈ 7,434px + the catalogue; phone ≈ 7,580px)

| Time | Act · height | The problem drawn | The solution in the same frame · the moment | Device · feeling |
|---|---|---|---|---|
| 08:00 | Before the bell · 80svh (the hero) | the room she walks into at 7:50, chairs up; the sheet she rebuilt in Word last night because it only existed in English | dawn casts across the floor under the desks; the trolley already parked; on her desk **two sheets: the same page in her language and in one other, words and pictures visibly different** (k225-2 family, ≥24u each, ≤20° lie, the largest foreground objects); the H1 on the floor line; the wall clock at 8:00; ONE CTA. Load move once: the sun comes up (casts open, shadows stretch, the H1 lifts). Moment: the chairs upside-down on the desks | pinned diorama · anticipation 3 |
| 08:20 | The front of the room · 120svh (same plate) | setting out the manipulatives before the bell; the tablet cart is booked; the beamer works on Tuesdays | the camera pushes in; a light band crosses the front wall and each thing WAKES as the light reaches it: the live rekenrek on her desk first, the chalk number line on the board, then the balance and the lids on the parked trolley (four instruments, ~140px). "Try it here" is real text; the iframe mounts only on click. Moment: the rekenrek's beads under HER pointer before she has read a sentence | live instrument · recognition 5 |
| 09:40 | Handing out · 150 + 8svh beat | **"Twenty-five children. Not one of them in the same place."**; half the class does not read the instruction | the camera dollies right past the coat rail; the 25-desk seating plan slides left as one card, chairs down in three poses; twenty-five DIFFERENT sheets land one per desk from off-frame, already airborne; the four-sheet stack shrinks; six desks carry the same page in six other languages; caption leads with HER language and lists the six by endonym; the Say It Board's own tagline; "twenty-five sheets, out of forty thousand"; the grade plaques as the way in. The 8svh beat: only the casts shorten. Moment: her own bilingual class, and the empty room of 8:00 is full and you never saw anyone arrive | horizontal rail · first "oh" 7 |
| 11:00 | One desk · 100svh | at the answer key while twenty-five wait; where is this in MY curriculum | cut to one desk over the back of an empty pulled-out chair (she is walking the room); the tablet runs the REAL ten-frame activity (`ten-frame.how-many.0-10.animals`, click-to-load like the rekenrek); twenty dots appear one per ~18px, the tick lands ONCE; under the tablet the sheet with `Lgr22 · åk 1` printed as a real-text running header in its own margin; caption "On a tablet it checks itself. On paper, the answer key does." Moment: the page marked itself while the chair is empty | camera cut · intimate valley 6 |
| 13:00 | The send · 110svh | typing a link while the class waits; the PIN and leaderboard she does not want; the data agreement she cannot sign | cut to the back of the room; **the blind drops ONCE** (480ms, six steps), the veil comes in smoothly, the board lights, the QR is projected right of centre, and twenty-five screens on the seating plan light on ONE beat, each casting its own small light on its desk; text: no accounts, no data, no PIN, no countdown, the same QR at the foot of the sheet that goes home (verify), the free embed in one line. Moment: the class drawn by the light of its own screens | once-sequence · loud, short 8 |
| 14:00 | One lamp · 190svh (THE PEAK) | Sunday night, six tabs; three versions of the same sheet; the sheet found in English | dissolve to the desk from above, blind still down, the lamp already on; **the page's only held silence** (131px): her three level sheets already on the desk, the trays, the dial; then headline, `make.body`, the levels line pass over the still life; then **the spread**: ten more of the same page slide out from under hers into two overlapping rows, each with `endonym · framework` in its exposed strip, hers forward at 28u (321px) with a native word readable; the lamp's pool widens and reads them into colour, hers first. Moment: a teacher in Umeå sees her sheet with "Lgr22" under it and ten more of the same page in ten other countries' hands | held flat-lay then the spread · PEAK 10 |
| 14:40 | The noticeboard · 90svh, in flow | the offers pinned among colleagues; what free does NOT do (every competitor hides it); the school pays, not me | the inside of the classroom door where the fire drill hangs; two sheets printed on **the site's own worksheet paper** (Fredoka title ladder, Letter in en / A4 elsewhere, the "Made with LessonCraftStudio.com" footer verbatim), steel pins: Sheet A the plans ($69 the only big number, the monthly unit, the monthly product, the loss line, "Billed in US dollars", the coordinator line), Sheet B the four promises; the two CTAs OFF the paper in the track (Free primary, plan ghost). NOTHING MOVES. Moment: a pricing surface that says out loud what Free does not do | document typography · trust 4 |
| 15:00 | Going home · 120svh | 3pm, bag on the shoulder, tomorrow still to plan | the hero frame in west light: blind up, door open on a flat orange corridor light, casts mirrored (no cross), chairs down and pushed in, the number line still on the board, the instruments asleep on the trolley by the door, **the k225-2 sheet in her language propped on the trolley handle (20u) with the pen slip "made today, two o'clock"**, the h2 in exactly the hero's box, the clock stopped at three. Entry move once: the sunset mirror. Then the catalogue as the corridor (cream, document, the crawl mesh) | pinned diorama, rhymes with 08:00 · warm resolve 6 |

Feeling curve 3·5·7·6·8·10·4·6; devices 1→5→3→2→once→6→document→1; alignment lead·trail·lead·split·centre·document·
document·lead (13:00 is the ONE centred act); `--sun` 0 · .048 · .238 · .429→.714 · .714 · .857 · .952 · 1; hour hand
240° → 250° → 290° → 330° → 390° → 420° → 440° → 450° (stops); stamps 8:00 · 8:20 · 9:40 · 11:00 · 13:00 · 14:00 · 14:40 ·
15:00 (24-hour numerals in every locale).

## 5. The laws (each with its companion; reconciliations are final here)

**Drawing (Bible §1):** five cuts only; one shadow node per part at the foot, sheared by `--sun`, soft edge by a static
mask never blur; imperfection by the deviation cycle on one or two vertices, never on architecture, never by rotation;
gradients only on light; no line weight; depth by band scale + per-band ink veil + overlap, one shared lie angle (52°
scenery, 28° claim sheets); **tilt budget two rotated objects per frame**; colour by object, pins steel; **never drawn:**
person, hand, cuff, silhouette, mascot, sun disc, cloud, bunting, wobble filters; **never self-moved:** trolley parked all
day, castors static, the lamp never switches itself. Identity anchors byte-identical: the `--g10-*` tokens, `.hv10-field`
+ noise, `.hv10-floor` oak (conic re-centred to the new VP (50,30)), `.hv10-plinth` + lit slab, `.hv10-h1`, `.hv10-cta`,
the hv6 clock/rekenrek/`OpenNumberLine`/`WeighBench`, the italic pen slip, the site header, and ONE framed "work of the
week" beside the board. Room geometry: 100×50 poster units, VP (50,30), front-wall foot y = 39, left wall (two window bays)
to x = 14, right wall (door) from x = 86, **board x 50→84** (moved right so the H1 clears it), teacher's desk x 8→41.

**Motion (Score §0, §8):** three movers only: light, the camera, the visitor's hand; every scrub `linear both`, curves
only on LOAD/ONCE; words never animate (the H1 load lift excepted); no two arrivals on one frame; no bounce under the
wheel; `steps()` only on small elements (the bar numeral; the blind is ONCE, its veil smooth: photosensitivity); colour
never recomputed per frame (two static layers cross-faded; `--sun`/`--deal` never touch background/color/box-shadow/
filter); nothing on a plate moves while a caption enters its resting zone except the clock; no act symmetric; every cut
motivated. Heights as §4; dead-scroll proof in Score §2 (no window ≥300px is hands-only; the harness exempts `#t-1500` and
counts caption travel only while a caption is in view). **Reconciliations:** the 09:40 four-sheet stack STAYS (Bible §2.19;
opacity steps on `--deal`, four nodes); the blind is `translate` 480ms in `steps(6, jump-end)` ONCE with the veil fading
320ms; stamps use `hourCycle:'h23'` (never `hour12:false`); plates 1 and 2 are one plate.

**Type (typographer's system):** two families, Baloo 2 700 (H1, h2, stamps, price, CTA) and Nunito 400/600/700 (all else),
the pen slip the only italic, `font-synthesis: none`; H1 `max(26px, var(--h1-cqw)*1cqw)` with `--h1-cqw` 5.2 en/es/it ·
4.8 de/fr/pt/nl/sv/da/no · 4.4 fi, box x 4→64, ≤3 lines desktop, bottom-anchored on y 39, `text-wrap: balance`; **the
stamp** = one large numeral per act (`max(34px, 7.4cqw)` wide acts; `clamp(3rem, 1.8rem + 4vw, 5.5rem)` desk acts) with NO
card, cream + the H1 shadow on green/oak, ink on the 14:40 paper, from `formatToParts()` into a right-aligned tabular
cell so `:00` sits in one column (verify Baloo 2 `tnum`; else Nunito 700 for numerals); measures 44ch body / 26ch h2 /
48ch sub; slips 3px radius `rgba(253,251,246,.96)`, ≥13:1 ink (the "15:1" was invented); banned: `text-transform`, positive
letter-spacing, a third family, an accented word, justify, centred body, `!`, `…`, digits in headlines, pills with type,
middle-dot strings except `endonym · framework`, em/en dashes in EN (reused v6 EN keys re-punctuated). **Budgets** (gated):
H1 ≤46/62/68(fi); sub ≤120/156/165; act h2 ≤60/80/84; caption ≤190/250/250; CTA ≤18/26; plaque ≤14/22/24. **Claim
sheets** carry a live running-header word at `max(26px, 2.3u)` (guaranteed 11px x-height) plus the raster's own words:
08:00 pair ≥24u each, 11:00 sheet 18u, 14:00 forward 28u, 15:00 propped 20u; these four use `sizes="400px"`.

**Copy (EN source, W0 panel):** `homepageV12` ≈45 leaves; H1 *"Worksheets in your language. Not translated."*; the full key
list and text are in §8; problems in headlines, counts in captions ("forty thousand" only at 09:40; "eleven" only in the
fan line); "free" only in five allow-listed keys; never "premium", "unlimited", days, a saving, a competitor, "school plan";
every number arrives through an ICU placeholder.

**Accessibility / SEO / performance (all MUST):** every link lives in the TRACKS (sheet grid at `#t-0940`, the eleven at
`#t-1400`, grade chips), plates are `inert` decoration; plate 1 is never `aria-hidden` (its art nodes are, individually);
the bar animates `visibility` with opacity, pips in `<nav aria-label>` with ≥24px non-intersecting hits, and an in-flow
pip list under REDUCE; focus ring `0 0 0 3px #FDFBF6, 0 0 0 6px #14322D`; no text on bare wall except the H1, the 15:00 h2
and the stamps (all measured ≥4.5:1 by pixel sampling at each anchor); caption window ≥220px, stage 40svh below
`(max-height: 600px)`, UNPIN below `(max-height: 500px)`; inactive plates `visibility: hidden` and `content-visibility:
hidden` until `.is-in` (≤150KB of images before the first scroll, ≤900KB total); the 25 sheets and 25 screens are
per-node compositor animations (`--i` ranges), `--deal` only for the ten spread sheets, `--sun` for ≤6 light layers;
`@supports ((animation-timeline: view()) and (animation-range: 0% 100%) and (timeline-scope: --x))` ⇔ the identical
`CSS.supports` triple; `html { scroll-behavior: auto }` under reduce in the unlayered inline style; one `<h1>`; the `<p>`
after it carries worksheets · language · curriculum; `hreflang` + `lang` on the eleven anchors (a hint, not the
alternate signal); `<img alt="">` where a visible label sits in the same `<a>`; `Organization.knowsLanguage` added;
`<time datetime="08:20">` without `lang`; no live region on the tablet; `<link rel="prefetch">` of the activity on act 2's
`.is-in`. Budget: LCP ≤2.0s (the H1), CLS ≤0.05, INP ≤150ms, no frame >16ms during a scripted scroll at 4× throttle.

## 6. File plan (all new files additive; v11 stays on disk for rollback exactly as v10 does)

```
frontend/components/homepage-v12/
  homepage-v12.css      @property --sun/--deal/--fill; tokens; the room parts (Bible §2, by class); BASE poses;
                        SCRUB (@supports triple + no-preference); ONCE (.hv12-js + .is-in); FALLBACK (.hv12-noscrub +
                        [data-act]); REDUCE (stacked strip); phone recrops; the paper document; print of nothing
  Day.tsx               <section class="hv12-day"> timeline-scope; .hv12-bar; .hv12-stage with the plates; 8 tracks
                        (#t-0800 … #t-1500, view-timeline-name --t1..--t8, view-timeline-inset 0 100%); .hv12-cta-bar
  Classroom.tsx         the wide room drawing function ({hour: 8|15, blind, door, chairs, trolley, casts}) used by the
                        morning plate, the 09:40 plate's shell, the 13:00 plate and the 15:00 plate
  Seating.ts            the 25-desk seating plan (Bible §2.21) + poses; Spread.ts the 11-sheet spread table (Score §4)
  plates/Morning.tsx    08:00 + 08:20 (the pair, the light band, the four instruments, the number line)
  plates/Handout.tsx    09:40 (wide wall, coats, the river on the seating plan, 25 sheets, the stack, the beat casts)
  plates/OneDesk.tsx    11:00 (chair rail, tablet facade + click-to-load ActivityIframe, the sheet + printed header)
  plates/Send.tsx       13:00 (blind, throw, projected QR via /api/qr, 25 screens + screen-light on the seating plan)
  plates/Lamp.tsx       14:00 (desk from above, lamp + pool, trays, dial, theme cards, three levels, the spread)
  plates/Door.tsx       14:40 (the inside of the door, steel pins) — the two PaperSheets render in the TRACK
  plates/Home.tsx       15:00 (Classroom hour 15, door open, casts, trolley asleep, propped sheet + pen slip)
  Tracks.tsx            the eight captions (stamps, h2, body, links, plaques, the spread rail, the sheet grid)
  Stamp.tsx             <time> from hourStamp() parts into the numeral cell
  ClockBar.tsx          ToolVignette clock + eight stacked <time> + <nav> pips + the bar CTA
  PaperSheet.tsx        the site's own worksheet paper (Fredoka, --pt, margins, title ladder, attribution footer)
  ScrollStage.tsx       the island (copied from v11: reduce early-return; hv12-js; the CSS.supports triple; act-spy IO
                        under noscrub; .hv12-enter band IO for ONCE with rootMargin '0px 0px -99% 0px')
frontend/lib/day-decks.ts        FAN_FAMILY (k225-2 ×11) · elevenLanguageFamily(locale) · desksForLocale(locale)
frontend/lib/day-format.ts       INTL_TAG · hourStamp() (formatToParts, hourCycle h23) · currencyParts() · DAY schedule
frontend/lib/seo/framework-names.ts   FRAMEWORK_BY_LOCALE + frameworkName() (dedupes the three maps; §20.10 note)
frontend/lib/seo/organization-schema.ts   + knowsLanguage
frontend/app/[locale]/preview/homepage-v12/{layout,page}.tsx   robots noindex; the gate target until promotion
frontend/app/[locale]/page.tsx   promotion: v12 imports, the inline body style kept verbatim, Fredoka next/font
                                 (preload:false), the catalogue block kept
frontend/app/[locale]/layout.tsx  SERVER_ONLY_NAMESPACES += 'homepageV12'
frontend/messages/<11>.json      homepageV12 ×11; EN v6 keys re-punctuated (en.json only)
scripts/audit-homepage-v12-copy.js   the copy gate (§9)
scripts/audit-homepage-day.js        the new harness (§9)
scripts/audit-act-order.js           replaces audit-room-order for v12
scripts/homepage-v12-art-sheet.js    contact sheets of every Bible part at 48/96/192/384 on its true ground
```

## 7. Data plan (`day-decks.ts`, `day-format.ts`)

- `elevenLanguageFamily(locale)`: one `prisma.deck.findMany` with `OR` over the eleven `(language, slug)` pairs of
  `FAN_FAMILY` (each hits the compound unique), `DECK_SELECT` from `showcase-decks.ts`; any missing locale (and the no-DB
  dev server) filled statically with `deckAssets(l, slug).thumbnail` (slug-derived, §8.1) and `href=/${l}/decks/${slug}/`;
  title via `titleFor`; `languageName` from `NATIVE_LOCALE_NAMES`; order = visitor's locale first, then `SUPPORTED_LOCALES`
  rotated (deterministic, ISR-stable). `contentFamilyId` is only a drift log.
- `desksForLocale(locale)`: 19 own-language from `selectShowcaseDecks(locale, 19)` (featured + thumbs; ceiling 25 types;
  `fallbackShowcase(19)` on throw) + the six k225-2 siblings in the six locales after the visitor; the own-language k225-2
  is desk 0; foreign desks at seating-plan slots 3, 8, 12, 16, 20, 23; the caption's `{languages}` via `formatList`
  (ONE placeholder, nominative endonyms after a colon); the six must match the list length (the EN caption says "six").
- The 08:00 pair = k225-2 hers + the next locale's sibling; the 14:00 three levels = three real decks of hers of one type
  at three ranges IF `selectShowcaseDecks` yields them, else the family sheet at three dial positions with the levels line
  carrying the claim (decide at build from the data, never fake a level).
- `hourStamp(locale, h, m)`: `Intl.DateTimeFormat(INTL_TAG[locale], {hour:'numeric', minute:'2-digit', hourCycle:'h23',
  timeZone:'UTC'}).formatToParts()` on fixed `Date.UTC` values, leading zero stripped; `INTL_TAG` en-US · de-DE · fr-FR ·
  es-MX · pt-BR · it-IT · nl-NL · sv-SE · da-DK · nb-NO · fi-FI. `currencyParts(locale, n)` for 69 / 5.75 / 8.99 from
  `SUBSCRIPTION_PRODUCT.priceUsd` (69/12 exactly) and the monthly product's `priceUsd` (8.99). Counts: `{plays}` /
  `{downloads}` from `quota.ts`, `{count}` = `Object.keys(await getToolSlugMap(locale)).length` (61; fi 60).
- Grade plaques from `LEVEL_ORDER[locale]` (`worksheets-catalog.ts`; 4 or 5 per locale) with the level's native name from
  the landing taxonomy, linking `/${locale}/worksheets?level=<key>`.
- The QR: `/api/qr?u=<the visitor's k225-2 deck URL>` (verify cache headers; else eleven static PNGs generated once).
- Activity: `ten-frame.how-many.0-10.animals` by slug per locale; framework chip text `frameworkName(locale)`; the Say It
  Board tagline from `MANIPULATIVES` id `home-language-bridge`; the Learning Clock link from `getToolSlugMap`.

## 8. i18n: the `homepageV12` namespace and the native panels

**Keys (EN final; §5 budgets; ICU in braces):** hero.h1 · hero.sub `{language}{framework}` · hero.ctaPrimary ·
hero.trialLine · hero.meterLine `{plays}{downloads}` · hero.sceneLabel · shelf.countCaption `{count}` · shelf.play ·
desks.headline · desks.caption `{language}{languages}` · desks.countLine · desks.gradeLine · desks.deskAlt `{title}{language}` ·
desk.caption · send.headline · send.body · send.noAccounts · send.silence · send.homeQr (verify; cut if the printable has
no play QR) · send.embed · lamp.headline · lamp.levels · lamp.fanLine · lamp.thumbAlt `{language}` · lamp.pen · board.anchor
`{price}` · board.monthly `{monthly}` · board.unsaved · board.currency · board.coordinator · board.coordinatorCta ·
board.free2 `{plays}` · board.free3 `{downloads}` · board.teacher1 · board.freeCta · board.planCta · tomorrow.headline ·
tomorrow.body · bar.nav · bar.pip `{stamp}{act}` · bar.acts.{0800…1500}. EN text as delivered by the W0 panel (H1
*"Worksheets in your language. Not translated."*; sub *"Worksheets, activities and classroom instruments in {language},
aligned to the {framework}. No accounts for children, nothing to install."*; desks.headline *"Twenty-five children. Not
one of them in the same place."*; send.headline *"From the board to twenty-five screens. No link to type."*; lamp.headline
*"Six tabs on a Sunday night, or one page before you go home."*; tomorrow.headline *"Tomorrow's lesson is already here."*;
the rest verbatim from the panel's JSON in the transcript, pasted into `en.json` at build).
**Reused v6 keys** by reference: `teach.heading/body`, `live.cta/openFull`, `practice.heading/body/caption`, `make.body/cta`,
`share.chip1-4` (as a `formatList` sentence), `share.qrAlt`, `keep.chip*`, `teacher.freeTitle/teacherTitle/free1/free4/
teacher3/teacher4`, `planTag`, `close.ctaSecondary` (text link). EN-only re-punctuation: `live.note`, `make.body`,
`teacher.freeTag`, `teacher.teacher2`, `teacher.reassure`. Not reused: `hero.*`, `close.body`, `teacher.heading/body`,
`share.heading/body`, `teacher.free2/free3/teacher1/freeCta/teacherCta/teacherPrice/teacherMonthly`, `ticks.*`.
**Panels (§A.13.48; ≤4 agents in flight):** W1–W10 one locale per wave, 3 native agents (linguist + K-3 teacher +
marketer) + the machine gate on the previous wave; order fi, de, nl, sv, da, no, fr, es, pt, it; `[NSR-FLAG]` on sv/da/no/fi.
Each panel receives the byte-exact EN source, the per-locale brief from the W0 panel (rebuild not translate; placeholders
byte-exact; nominative endonyms after a colon or in parentheses; the budgets; the ban list; de "ausprobieren"; fr may
write CE2; the locale's shipped plan and tool names) and answers *which sentence would a teacher in your country never say*.

## 9. Gates (none skippable; every gate poison-tested before it is trusted)

- **`audit-homepage-v12-copy.js`** (new): deep key parity vs EN; ICU placeholder-name parity; zero `\p{Nd}` (fr `CE2`
  allow-listed); "free" only in `hero.trialLine, hero.meterLine, tomorrow.body, board.unsaved, send.embed`; em/en dash FAIL
  in EN (incl. the reused-key list), report elsewhere; the §5 character budgets per role per locale; tripwires
  `SUPPORTED_LOCALES.length === 11`, `DESK_COUNT === 25`, `Object.keys(FAN_FAMILY).length === 11`, every plaque key ∈
  `LEVEL_ORDER[locale]`; `MIN_KEYS = 40`; poisons parity/placeholder/digit/free/emdash/budget/tripwire must FAIL, ce2 and
  trial-free must PASS. After each wave also `seo-i18n-integrity.js --locale=<l>`.
- **`audit-homepage-day.js`** (new; cut from `audit-homepage-scroll.js`: preflight fetch, favicon abort, instant scroll,
  double-rAF `at(y)`, `--path`, per-locale × viewport, `--mode=default|reduced|noscrub|cwv`): (1) hour-hand angle at each of
  the eight anchors ±2°; (2) `--sun` monotonic, first ≤.02 last ≥.98; (3) dead-scroll: per 100px the hand angle strictly
  increases, exempting `#t-1500`, and a visible change is counted from caption travel only while a caption is in view;
  (4) per-track `offsetHeight/innerHeight` within the §4 table ±5%; (5) **legibility**: the live header word's x-height
  ≥11px on the four claim sheets at 1366×768 and each ≥ its minimum rendered width; (6) the eleven: 11 rail links with
  11 distinct `hreflang` and `/xx/decks/` segments; the 25: 25 sheet sources, ≥6 from other locales; (7) the 13:00
  ONCE: blind down, 25 screens on, no running animation in plate 5 after 3s; (8) phone recrop bounds at 360×740, 375×667,
  320×568, 360×640, 740×360 (scene covers the stage; caption top ≥ stage bottom; window ≥220px; unpinned below 500px
  height); (9) contrast by pixel sampling behind every text box at each anchor (H1 and stamps ≥4.5:1 large, slips ≥13:1);
  (10) budget: `scrollHeight − catalogue ≤ 8,000` at 1366×768 (default mode only), ≤9,000 at 360×740, zero hscroll at every
  visited position with the right-edge walk; (11) reduced: 0 running CSSAnimations, stage not sticky, eight stills, the
  in-flow pip list; (12) noscrub: `data-act` 1…8 at the anchors, hands within 700ms; (13) `--cwv`: LCP element is the H1,
  LCP ≤2.0s, CLS ≤0.05, long animation frames during a scripted scroll at 4× CPU throttle, image bytes before first
  scroll ≤150KB, total ≤900KB, fonts-blocked vs loaded H1 `getClientRects().length` equal; (14) the `tnum` check (`1111` vs
  `8888` widths). Poisons (each must FAIL): rail, hands, sun, screens, eleven, abroad, recrop, stacked, overflow, budget,
  legibility, contrast, bytes.
- **Retargeted:** `audit-hero-identity.js --selector=.hv12-hero` with a non-vacuous census (`.hv12-desk` ×25 at every width,
  the pair ×2, bays ×2, casts ×2; `--poison=loadin` kept); `audit-hero-fold.js --placards=0` (one CTA, the H1, the pair
  inside the fold at 21 viewports en/de/fi); `audit-homepage-responsive.js` (add `.hv12-hero`; 14 widths + the a11y
  heights; census ≤220; reduced pass); `audit-room-labels.js` on the 15:00 shelf; `audit-homepage-link-count.js` (≥140);
  `audit-act-order.js` (eight `#t-` ids in order, eight monotonic `<time datetime>`, non-vacuity first).
- **Art:** `homepage-v12-art-sheet.js` renders every Bible part alone at 48/96/192/384 on its true ground; the Bible §5
  rejection table is applied by a second artist agent AND read by me before any part is placed.
- **Per act:** the §A.13.62-style DoD: harness green → the visual-critic agent scores design · craft · honesty · emotion
  /10 on the full sweep (360/768/1024/1366) → <8 is reworked → I read 768 + 1024 + 360 myself → `git diff` 0 lines to
  `homepage-v6/v10/v11` CSS, the cores and `lcs-shell.*`.
- Standing: `npx tsc --noEmit`, `npm run lint`, `npm run test:homepage` (keep `data-testid="hero-section"`), `validate:i18n`.

## 10. Order of work

0. Install the tools (state change, so after approval): `modern-web-guidance@claude-plugins-official`,
   `chrome-devtools-mcp@claude-plugins-official`, `npx add-skill addyosmani/web-quality-skills`. Read the scrollytelling,
   parallax, scroll-entry-exit, physics-easing, shaped-cutouts, visually-texture-content and optimize-image-priority
   guides before writing CSS.
1. Dev loop: rename `frontend/app/sitemap.xml/route.ts` → `route.ts.DISABLED-FOR-DEV`; `npm run dev`; **restore before any
   commit**; `MSYS_NO_PATHCONV=1` for `--path`; one puppeteer gate at a time; kill node + wipe `.next` on the favicon poison.
2. Data + facts: `day-decks.ts`, `day-format.ts`, `framework-names.ts` (+ the three import swaps), `knowsLanguage`; verify the
   printable's QR (send.homeQr), `/api/qr` cache headers, the three-levels data, `tnum`; `npx tsc --noEmit`.
3. Copy: paste the EN `homepageV12`; re-punctuate the five EN v6 keys; register the namespace; write the copy gate and run
   every poison. Start the W1–W10 panels in parallel with the build (the long pole), ≤4 agents.
4. Art first: `homepage-v12-art-sheet.js` + the parts in `homepage-v12.css` per the Bible; the contact sheets reviewed by a
   second artist agent and by me at 48/96/192/384 before placement; the identity anchors byte-identical (diff).
5. Skeleton: preview route, `Day.tsx`, the tracks with real text, the bar, `ScrollStage.tsx`; write `audit-homepage-day.js`
   FIRST and run its poisons against the skeleton (a gate that has never failed is not a gate); verify the
   `view-timeline-inset: 0 100%` convention on day one (fallback formula in Score §0).
6. Acts in this order, each with its own artist → motion → critic round (≤4 agents, artefacts under
   `docs/audit-results/homepage-v12/<act>/`): 08:00 (identity + fold gates) → 15:00 (the rhyme, the same component) →
   08:20 → 09:40 → 13:00 → 11:00 → 14:00 (the peak; the jury frame = the no-JS frame) → 14:40 (the paper).
7. Phone: recrops, 46/40svh stage, the rails, the bottom bar, the unpin; the a11y heights in the sweep.
8. Modes: noscrub + reduced polish; a real Firefox and an iOS Safari 26 device pass for `timeline-scope`.
9. Whole-page critic round (progression, pacing, the peak, the ending) → rework until SHIP and I am proud of it.
10. Promotion: `page.tsx` swap (body style verbatim, catalogue kept, Fredoka font), `package.json` scripts, the page-header
    gate list, CLAUDE.md §20.10 dedupe note; rerun every gate on `/{locale}`; memory file + MEMORY.md pointer; commit with
    explicit paths (never `git add .`; never stage `.scratch/`, memory or the plan files); no push, no deploy.

## 11. Verification (end to end)

- Every gate in §9 green on `/en/preview/homepage-v12` and then on `/{locale}` after promotion, all eleven locales for
  copy/order/fold/link-count, en+de+fi for the DOM sweeps; screenshots and logs under `docs/audit-results/homepage-v12/`.
- Per act and whole-page critic verdicts recorded (≥8/10 per act on all four axes).
- The four claim sheets measured legible; the eleven and the twenty-five counted; `--sun` and the hands proven.
- CWV mode green (LCP = H1 ≤2.0s, CLS ≤0.05, no long frames at 4×); image bytes before first scroll ≤150KB.
- Reduced motion: zero running animations; noscrub: the act spy drives eight states; Firefox + Safari device passes.
- Search Console rendered-HTML check after deploy (operator-batched): eight captions and 36 links present; `curl … | grep
  -c "Common Core"` = 0 on the ten non-EN roots.

## 12. Decisions taken and items surfaced for the operator (not blocking)

- The monthly product ($8.99) is shown on the page as "or {monthly} month by month" (it exists and is sold on /pricing).
- "Billed in US dollars." is stated once; local-currency checkout (Lemon Squeezy localized pricing) is an operator item:
  DE and BR teachers close the tab on USD-only.
- "Ask about school access" links `/contact/` (no school product exists); BNCC/Lehrplan CODES are not claimed (§20.10).
- `send.homeQr` ships only if the printable PDF carries the play QR (verified at build); otherwise the drawn foot-QR and the
  key are cut.
- The em-dash re-punctuation of five EN `homepageV6` keys changes v11's live EN text by punctuation only.
