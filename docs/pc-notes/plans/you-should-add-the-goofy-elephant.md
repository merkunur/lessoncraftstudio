# Homepage hero — pillar block under the H1 + premium redesign

## Context

The live homepage hero (v10 "The Gallery of Lessons", `frontend/components/homepage-v10/GrandHall.tsx`) is a 3:2 drawn-gallery poster: real worksheet thumbnails in frames, four working CSS instruments on plinths, and the H1 "Every lesson, hanging together." The explanation of WHAT the site offers lives in a band BELOW the poster.

**Measured defect (live, 2026-09-03):** at 1366×768 (nav ≈122px) the poster ends at y≈700 and the primary CTA's bottom edge is at **801px** — so a laptop visitor sees only the picture and a poetic headline. The sub/pillar line/CTAs are below the fold at 1920×1080 too. Only phones (390×844) show them in the fold. Visitors decide in seconds; the hero currently says nothing about the product in the first screen.

**The operator's ask:** under the H1, state the site's content — 40,000+ printable worksheets · worksheet makers (printable or interactive) · classroom tools · ready-to-play activities · interactive worksheets — formulated by us via expert marketing / communication / consumer-psychology agents; and upgrade the whole hero to a premium look via design agents + the Claude Design canvas. The v10 commit `f9568129` explicitly deferred exactly this ("rewriting hero.sub to name all four pillars … a deliberate commission").

**Operator rulings this session (binding):**
- The **40,000+** figure MUST appear ("to show the comprehensiveness of the library"). This is an explicit, scoped override of the v9.1 "no numbers for content" law — for this ONE figure only.
- **"Don't give any number for anything else."** No tool/activity/maker/language counts, numeral or spelled out.
- Standing: **nothing is free** (limited trial only) — the hero must never say "free" (`hero.sub` and the orphaned `hero.microLine` currently say "free to start"; both go). The grade band is written without a digit ("preschool to third grade") and "in your language" stays in words.

**Ground truth for the claim (live DB, read-only, 2026-09-03):** 48,069 published decks, every one with a PDF; 44,981 single-language (≈4,000 per locale). "40,000+" is true and conservative. Per-locale libraries are ~4k, so the number must read as the WHOLE library and "in your language" must stay a separate phrase (never "40,000+ in your language").

## Laws the redesign must keep (from CLAUDE.md / memory, verified in code)

- **Poster identity:** one composition at every width 320–2560, every coordinate in `cqw`; the H1's `max(27px, 7.1cqw)` floor is the only licensed deviation; gate `scripts/audit-hero-identity.js` masks that band and compares the rest at MAD ≤6. Any new DOM text inside the poster becomes part of the licensed "type band" and the gate's mask must be widened to the `.hv10-type` rect (then poison-tested).
- **Nothing cut off** at any width (`scripts/audit-homepage-responsive.js`, 14 widths, `[data-bleed]` exemption only for cornice/dado/floor).
- **The instrument animations are the signature** — keep all four; motion laws unchanged (transform/opacity, ≥65% rest, coprime periods, reduced-motion = composed poses).
- **Real text never inside a scaled subtree**; H1 stays LCP-eligible DOM text.
- **Body is never restyled** for the hero (CategoryNav sits on it at 4% tint).
- **Never `git checkout --`** to undo experiments; keep backups. Never edit repo files through Python text mode.
- Both `app/[locale]/page.tsx` AND `app/[locale]/preview/homepage-v10/page.tsx` change together (the preview is the gate target + visual-diff net).
- Refuse-list from the gallery layer stands: no gold/wide frames, no red dots, no plinth labels, no "curated by", no serif label type, no new animations beyond the machines.

## Copy — expert consensus (marketing + communication + consumer psychology, all three converged)

- **Four pillars, not five.** "Interactive worksheets" is a PROPERTY of the library (most worksheets also play and self-check in the browser; the hub exposes it as the Interactive tab `/worksheets?format=interactive`), so it rides in pillar 1's gloss. Five items exceed the ~4-chunk scan budget.
- **Order** mirrors the nav (Worksheets · Activities · Tools · Worksheet creators) and the eye: the number first (primacy), the differentiator last.
- **The count** is set as a confident numeral in the SAME ink as the words (no coral, `font-variant-numeric: tabular-nums`, the "+" slightly smaller), attached to a concrete noun so it reads counted, not inflated.
- **CTA order swaps:** primary = the library (the intent visitors arrive with; backed by the number); secondary = a try-it path. No sign-up CTA in the hero (reactance under a trial model; the header already has it).
- **Delete** `hero.sub` as a paragraph (40-word run-on, says "free", duplicates the pillar line).
- **Avoid:** "interactive" as a product name (say what happens: play and check in the browser), "makers" without an object, "manipulatives/apparatus" (say clock, number line, balance), any other numeral, any price talk.

### EN source strings (draft — the native panels audit this SOURCE too)

| key | EN |
|---|---|
| `hero.h1` | Every lesson, hanging together. *(unchanged)* |
| `hero.tagline` (new) | Worksheets, classroom tools and activities from preschool to third grade, in your language. |
| `hero.pillar1Label` / `hero.pillar1Count` | **40,000+** printable worksheets |
| `hero.pillar1Gloss` | Print the PDF, or play and check in the browser. |
| `hero.pillar2Label` | Ready-to-play activities |
| `hero.pillar2Gloss` | A child plays; it checks the answers. |
| `hero.pillar3Label` | Classroom tools |
| `hero.pillar3Gloss` | A clock, a number line, a balance — for the whiteboard. |
| `hero.pillar4Label` | Worksheet makers |
| `hero.pillar4Gloss` | Choose pictures and words. Make your own, to print or play. |
| `hero.ctaWorksheets` (primary now) | Browse the worksheets *(unchanged)* |
| `hero.ctaActivities` (new, secondary) | Try an activity |
| `hero.fanLabel` | *(unchanged, aria-label)* |
| REMOVED | `hero.sub`, `hero.microLine`, `hero.countsLine`, `hero.ctaTools` (after confirming no other consumer) |

The count is a SEPARATE key so the numeral can be typeset differently and each locale can use its own thousands separator (40.000+ / 40 000+ / 40,000+).

## Design — expert findings

**Critic verdict 5.5/10.** Bones right (real wall, real work, working machines); the materials are what read "template": striped cornice, fan-of-lines floor, paper-bag tapered plinths, frames overlapping each other and the clock, sticker-like drop shadows, foggy glazing, three khakis within a few units (trim-deep / floor-lit / dado bottom), and the below-poster band disconnected from the picture.

**Design lead diagnosis:** (1) dead centre — ~200px of empty green between the H1 and the plinth tops while the message fell below the fold; (2) "two pages, not one room" — the floor ends in a hard cut and green wall resumes beneath it, then a generic centred SaaS text stack in body type where the most important message is the smallest, faintest text; (3) plinths are squat tapered slabs on blob shadows and the rekenrek / number line hover above their tops (nothing is seated); (4) the hang pushes the largest works to the extremes and the small frame overlaps the large one; (5) one type level inside the picture, a heavy blurred H1 drop-shadow (the text-over-stock-photo tell), pills identical to the nav's Sign Up.

### The composition decision (design lead, adopted)

**The pillar block + CTAs live in a band directly under the poster — never inside it.** Poster-unit text at 390px is ~6px; px floors inside the poster would break the identity law (the same reason the CTAs already left the poster). The fold is solved by two CSS changes:

1. **Reserve the band in the fold calc:** `--g10-fold: calc(100svh - 122px - var(--g10-band, 180px))` (was `100svh - 190px`).
2. **Poster ratio 3:2 → 2:1** (`--g10-ratio: 2 / 1`, poster = 100 × 50 units). At 1366×768 → poster 932×466 (frames and instruments as large as today, because the width grows while the height shrinks); band ends at ≈746px < 768. Phones are width-bound so the ratio costs the art nothing there (390 → 390×195). 1920×1080 → 1596×798 poster, band in fold.

New poster-unit table (2:1), all above the chair rail, no overlaps, large works inboard-anchored:
- `HORIZON 39`; dado 33–39; cornice 0–7.4; a step nosing at 49.4–50 (the poster's bottom edge becomes a gallery step the band sits on — kills the "floor then green wall again" cut).
- H1 slot `{x:23, y:10.5, w:54}`, `font-size: max(27px, 6.6cqw)`; ends ≈26 (3-line locales ≈31, still above the rail).
- FRAMES: left `{2.5, 9.5, 12}` `{15.5, 8.5, 8}` `{15.5, 20.2, 8}`; right mirrored `{85.5, 9.5, 12}` `{76.5, 8.5, 8}` `{76.5, 20.2, 8}`; tilts ±1.1 / ±0.9 / ±0.6.
- PLINTHS `y 42.5, h 6.5`: clock `{x:6, w:15}` (clock scoped to 11cqw), rekenrek `{x:27.5, w:22}`, number line `{x:55.5, w:16}`, weigh `{x:78, w:16}` — one even rank, 6-unit gaps, symmetric margins. Every instrument bottom-anchored ON the top face (fixes the hover gap).

```
1366×768                                 nav 0-122
┌──────────────── cornice ─────────────────────────┐ 122
│ [A ][b]                                  [b][ A ]│
│ [  ][c]      Every lesson,               [c][   ]│
│ [  ]         hanging together.              [   ]│
│═══════ chair rail / dado ════════════════════════│ ~430
│  (clock) (rekenrek)     (number line)  (weigh)   │
│  [plinth] [ plinth ]      [plinth]     [plinth]  │  floor
├──── step nosing ─────────────────────────────────┤ 588
│ ┌40,000+ ───┐┌Activities┐┌Tools────┐┌Makers────┐ │ placards 604-678
│ └gloss──────┘└gloss─────┘└gloss────┘└gloss─────┘ │
│        [ Browse the worksheets ] [ Try … ]       │ CTAs 698-746
└──────────────────────────────────────────────────┘ 768
390 wide                                 nav 0-120
┌──────── poster 390×195 ───────┐ 120-315
│[A][b] Every lesson,   [b][A]  │
│   [c] hanging together.[c]    │
│ ◷ ●●●●   ⌒→   ⚖  on plinths   │
├───────────────────────────────┤
│ ┌ 40,000+ printable ws ──────┐│ lead card full width
│ ┌Activities─┐ ┌Tools────────┐│ 2×2
│ ┌Makers─────┘ └─────────────┘│
│ [ Browse the worksheets     ]│
│ [ Try an activity           ]│ ends ≈760 < 844
```

### The pillar block: museum wall-labels ("placards")

The one label object a gallery already owns — not chips (SaaS), not brass (gold is on the refuse list). The band shares the poster's width formula so labels align to the picture's edges.
- **Card:** `--g10-cream` fill, `border-radius: 6px`, a 3px top rule in teal (`#146B5E`; the lead card's rule is coral), `box-shadow: inset 0 1px 0 rgba(255,255,255,.5), 0 6px 14px -8px rgba(4,26,22,.5)`, padding 12px 14px. Each card is a `<Link>` to its hub (whole card = tap target ≥48px; raises crawl-bait).
- **Title:** Baloo 2 600, `clamp(16px, 1.25vw, 18px)`, `--g10-ink`, `text-wrap: balance`. **Gloss:** Nunito 400, `clamp(14px, 1.05vw, 15px)`, line-height 1.35, `#3E5C55` (6.7:1 on cream), `overflow-wrap: anywhere` (Finnish compounds), never truncated; `align-items: stretch`.
- **40,000+:** the lead card's title, Baloo 2 700 at `clamp(26px, 2.2vw, 32px)` (~1.7× the labels), `letter-spacing: -0.01em`, `font-variant-numeric: tabular-nums`, same ink as the words (no coral — the critic's "letterpress, not sale banner"), the noun "printable worksheets" beneath it.
- **No icons** (a row of stroke icons is a feature grid; museum labels carry none). No uppercase, no eyebrows.
- **Wrap rule:** ≥1024px `grid-template-columns: 1.35fr repeat(3, 1fr)`; 640–1023 lead spans `1 / -1`, three below; <640 lead spans, then 2-up. Gap 12px. 40%-longer strings wrap inside their card.
- **CTAs** 16px below, centred; ≥640 side by side, <640 stacked full width. Primary coral fill + ink text (`#2A1206`, 6.3:1) with a *coloured* shadow `0 8px 20px -8px rgba(217,99,58,.55)` and `border-radius: 14px` (not the nav's pill); ghost = 1.5px cream@55% border, hover fills cream 12%.

### Premium finish (both design experts; implementable CSS)

1. **One light source:** key light `radial-gradient(90% 120% at 30% -10%)` on the wall, cooler (`rgba(232,246,236,.16)`, not yellow), matching floor pool at 30%, every shadow offset +0.4cqw right; a corner vignette `radial-gradient(90% 80% at 50% 40%, transparent 55%, rgba(10,40,32,.28) 100%)`.
2. **Wall tooth:** a 4%-opacity SVG noise data-URI over the green so it reads as plaster.
3. **Cornice:** one real moulding profile (lit fillet → 3% shade line → one broad lit face with a soft gradation → one 1.5% bed line → cast shadow to 30% of height at α .28) instead of the venetian-blind stripes.
4. **Dado:** remove the 19cqw vertical seams (the "random pilaster" artefact already cut once); top line α .14; bottom stop `#BBA985` so the rail separates from the floor.
5. **Floor:** half as many conic joints, lighter (`rgba(94,62,26,.16) 0 .12deg` per 5.8deg); keep only the 3 / 9.4 / 14.6cqw cross joints at α ≤ .14 — fewer, longer boards.
6. **Plinths:** drop the clip-path taper; height 9 → 6.5; body turning-face `inset -0.6cqw 0 1.2cqw rgba(60,40,10,.14)`; top slab same width as the body with a 0.2cqw front edge in `--g10-stone-edge`; replace the blob with a seated contact shadow (α .55, doubled height) + `inset 0 -1px rgba(40,22,6,.25)` at the foot.
7. **Frames:** thinner moulding 0.55cqw with a 0.06cqw lit inner bevel + `inset 0 0 0 .1cqw #4E3721`, mat 0.6cqw with `inset 0 .12cqw .3cqw rgba(0,0,0,.18)` so the work sits IN a window; drop shadow `0 .5cqw 1.1cqw rgba(10,30,24,.34), 0 .1cqw .2cqw rgba(10,30,24,.4)` (a picture hangs 2cm off plaster); glazing sheen `linear-gradient(118deg, rgba(255,255,255,.14) 0, transparent 38%)` (0.22 read as fog over the worksheet).
8. **H1:** hairline shadow `0 .06cqw 0 rgba(4,26,22,.35)` + soft `0 .4cqw .9cqw rgba(4,26,22,.22)` instead of the blur; `letter-spacing: -0.018em`; `line-height: 1.0`.
9. **Instruments:** rekenrek rail visible as a walnut bar (`--g10-frame-wood`); balance + number line scaled up to their plinths (`--w` ≈ 17); clock 11cqw. Keyframes untouched.
10. **Tokens (critic):** `--g10-wall #1F5E4C / -lit #2A7461 / -deep #16483A` (toward brand teal, less olive), `--g10-floor #A88A63 / -lit #C2A884 / -deep #7C6244` (darker, lower chroma so the white plinths are the brightest objects), `--g10-trim-deep #CFC3AA`. Verify the H1/cream contrasts after the change (all currently ≥5.4:1).

**Removed (Chanel rule):** the `.hv10-sub` paragraph + `.hv10-pillars` line (content is now the placards); the H1 blur shadow; the plinth taper + blob shadows; the naked floor cut (the step nosing replaces it); the dado seams.

**Contrast floors:** H1 `#FDFBF6` on wall-lit ≥5.4:1; ink on cream 12.5:1; gloss `#3E5C55` on cream 6.7:1; coral only as FILL with `#2A1206` text (coral text on green is 2.65:1 — never). Band text ≥14px; H1 ≥27px; placards + CTAs ≥48px tall; `:focus-visible` 3px cream ring.

## Operator decisions (asked + answered this session)

- **Four placards** (interactive stated in the worksheets card's gloss).
- **Poster 3:2 → 2:1** as the fold fix (art stays as large; band ends inside the 1366×768 fold).
- **Rename the nav item to "Worksheet makers"** (`nav.categories.apps` + the "All worksheet creators" browse-all key). Note: 9 of the 10 non-EN nav labels already say generators/makers (de *Arbeitsblatt-Generatoren*, nl *Werkblad-makers*, fr *Générateurs de fiches*…) — EN "creators" is the odd one out; each native panel decides whether its hero label matches its own nav word.
- **Local screenshot approval round** before commit/push/deploy.

## Implementation

### Phase A — the design canvas (before any code)
1. Follow the `design` skill workflow (loaded this session). Author `.dc.html` artboards in a scratch working dir, pixel-matching the real tokens (`--g10-*`, Baloo 2 / Nunito, frame/plinth values lifted from `homepage-v10.css`): **`Main.dc.html`** = the recommended "Refined Gallery" at 1440×~700 (2:1 poster + placard band + CTAs, full premium finish); **`Phone.dc.html`** = the same at 390; **`DirectionB.dc.html`** = one genuinely different band treatment for comparison (placards as one continuous cream "information desk" strip with the number inset, vs four separate wall labels). Named options stay named. `canvas.json` lays them out; seed with `node <skill-dir>/seed-canvas.mjs --template <skill-dir>/payload.template.html --out gallery-hero.html --title "The Gallery Hero" …`, run `--check`, publish with the Artifact tool per the skill (contract pin, favicon, capabilities from the roster).
2. Operator picks the direction on the canvas; the unchosen one moves to a second page. Only then code.

### Phase B — copy (EN source) + i18n keys
3. `frontend/messages/en.json` → `homepageV6.hero`: add `tagline`, `pillar1Count`, `pillar1Label`, `pillar1Gloss`, `pillar2Label/Gloss`, `pillar3Label/Gloss`, `pillar4Label/Gloss`, `ctaActivities`; keep `h1`, `ctaWorksheets`, `fanLabel`; delete `sub`, `microLine`, `countsLine`, `ctaTools`. ⚠ Consumers of the deleted keys: the two homepage routes AND the legacy `frontend/components/homepage-v6/OpeningV6.tsx` (:49-50 renders `countsLine`/`microLine` for `/preview/homepage-v6`) — patch it in the same commit or the v6 preview throws `MISSING_MESSAGE`. `nav.categories.apps` → "Worksheet makers", the browse-all key → "All worksheet makers". The grade band is spelled without a digit ("preschool to third grade") so the copy gate can be a flat "no digits outside the count" rule; panels use their native spelled form.
3b. New `frontend/components/homepage-v10/hero-strings.ts` exporting `HeroStrings` + `heroStrings(t)` — ONE builder read by both `app/[locale]/page.tsx` (:230-237) and `app/[locale]/preview/homepage-v10/page.tsx` (:98-105), so the preview route (the gate target) can never drift from the live one again.
4. **Native panels, 10 locales** (§A.13.48: linguist + K-3 educator + marketing per locale), ≤4 panels at a time (the session-limit lesson), each handed the EN block as a SOURCE TO AUDIT plus its locale's existing `hero.h1` / `ctaWorksheets` / nav `apps` strings and the two rules (never "free"; the count is the only numeral). Panels return the full key set with the locale's thousands separator for `pillar1Count` (de 40.000+ · fr/sv/fi/no 40 000+ · en 40,000+ …). `[NSR-FLAG]` on sv/da/no/fi (§17.5.1). `npm run validate:i18n` after.

### Phase C — the hero component
5. `frontend/components/homepage-v10/GrandHall.tsx`:
   - constants → the 2:1 table (`HORIZON 39`, `POSTER_H = 50`, new `FRAMES`, `PLINTH_Y 42.5`, `PLINTH_H 6.5`, new `PLINTHS`; `--b: POSTER_H - PLINTH_Y`).
   - add a `.hv10-step` nosing element (`data-bleed`) at the poster's bottom edge.
   - type slot `{x:23, y:10.5, w:54}`; the `<h1>` unchanged.
   - replace the `.hv10-below` contents with: optional `<p.hv10-tagline>` (dropped if the canvas/panels show it crowds the band), a `<nav aria-label>` holding `<ul.hv10-placards>` of four `<li><Link className="hv10-placard [is-lead]">` (lead: `<strong.hv10-placard-count>40,000+</strong>` + label + gloss; others: title + gloss) with hrefs `/worksheets`, `/activities`, `/tools`, `/worksheet-makers`; then `.hv10-ctas` — primary `/worksheets` (`ctaWorksheets`), ghost `/activities` (`ctaActivities`).
   - The `strings` prop type grows; `app/[locale]/page.tsx` :230-237 AND `app/[locale]/preview/homepage-v10/page.tsx` :98-105 build the identical object.
6. `frontend/components/homepage-v10/homepage-v10.css`:
   - `.hv10 { --g10-ratio: 2 / 1; --g10-band: 180px }` + the token nudges (wall / floor / trim-deep).
   - `.hv10-stage { --g10-fold: calc(100svh - 122px - var(--g10-band)); width: min(100%, var(--g10-stage-max), max(300px, calc(var(--g10-fold) * 2))) }`.
   - cornice / dado / floor / frame / plinth / H1 rules per the premium-finish list; `.hv10-step` (cream nosing gradient + cast shadow, `left:-50vw; right:-50vw`).
   - new `.hv10-placards` grid (breakpoints 1024 / 640), `.hv10-placard`, `.is-lead`, `.hv10-placard-count`, `.hv10-placard-gloss`; the band's width = the stage's width formula; CTA restyle (14px radius, coloured shadow); reduced-motion block unchanged (no new keyframes).
   - instrument overrides: clock 11cqw; onl/weigh piece widths 17; the rekenrek rail bar visible.
   - delete `.hv10-sub`, `.hv10-pillars`, the dead `.hv9-planks` / `.hv9-lids` overrides.
   - any new layout-critical rule on a shared single-class goes through `:where()` (the three-time trap).
7. Room I opens below the step: confirm `Rooms.tsx` `InstrumentHall` still reads as the next room. The hero's horizon moves 48 → 39; the rooms keep their own `--g10-horizon` — either amend the "floor line constant in every room" comment honestly or let the step nosing carry the transition (decide on the canvas).

### Phase D — gates
8. `scripts/audit-hero-identity.js`: the ratio census reads 2.0; the H1 mask logic is unchanged (the band is outside `.hv10-stage`). Census gains three assertions the pixel diff is structurally blind to (an overlap moves identically at every width, so MAD stays equal): `typeChildren` (`.hv10-type > *` === 1 — only the H1 lives in the poster), `strayText` (`.hv10-placards, .hv10-ctas, .hv10-sub, .hv10-pillars` inside the stage === 0), and `overlaps` (pairwise bounding-box intersection of `.hv10-frame` + `.hv10-piece`, tolerance 1px, must be empty — today frames 1/3 and 5/6 overlap and frame 3 overlaps the clock). `--poison` becomes a mode: bare = today's width-conditional rearrangement; `overlap` drops one frame onto the clock via an injected `--y`; `stray` appends a `<p class="hv10-sub">` into `.hv10-type` before the census. Each mode must FAIL; the clean build must PASS.
9. **New gate `scripts/audit-hero-fold.js`** — the commission's defect, measured. Puppeteer; viewports `1280×720, 1366×768, 1536×864, 1920×1080, 390×844, 375×667, 360×740`; locales en,de,fi; asserts per shot: `.hv10-h1`, the last `.hv10-placard` and `.hv10-cta.is-primary` bottoms ≤ `innerHeight − 4`; `.hv10-stage` width ≥ 700 at widths ≥ 1280 (the poster stays the dominant object — stops the band constant creeping); `.hv10-placard-count` computed color === the label color (same-ink law); screenshots to `.scratch/hero-fold/`. `--poison` injects `.hv10-below{padding-top:240px}` → must FAIL.
10. **New standing gate `scripts/audit-hero-copy.js`** (browser-free; also `npm run validate:hero-copy`, appended to `validate:all`): reads `homepageV6.hero` in all 11 locale files. (a) **Key parity, hard fail**: every locale's key set === EN's; any retired key (`sub`, `microLine`, `countsLine`) anywhere → FAIL (stale copy in a key nobody renders). (b) **Digits**: any `p{Nd}` in any key other than `pillar1Count` → FAIL; `pillar1Count` must contain exactly five digit characters and match a pattern pinning the figure to 40 000 in every locale (allows "40,000+", "40.000+", "40 000+" incl. NBSP/narrow NBSP, "Über 40.000", "Plus de 40 000", "Yli 40 000"). (c) **Price words**, whole-word with Unicode boundaries `(?<!p{L})…(?!p{L})` (never ``): free, kostenlos*/kostenfrei*/umsonst, gratuit*, gratis, grátis, kosteloos, kostnadsfri*, ilmai*/maksut*; plus `{count}`/`{tools}` placeholders. (d) Non-vacuity: ≥12 keys read per locale or INCONCLUSIVE — never a silent PASS. `--poison=<mode>` mutates in memory only: `digit` (a de gloss → "24 Generatoren") FAILs; `free` (en tagline → "Free to start") FAILs; `stale` (fi gains `microLine`) FAILs; `figure` (fr count → "45 309+") FAILs; `figure-ok` (de count → "Über 40.000") PASSes; the German pedagogical "frei erkunden" PASSes — both directions proven before wiring into `deploy.sh` beside the other preflights.
11. `scripts/audit-homepage-responsive.js`: the `.hv10-step` carries `data-bleed`; nothing else changes. `audit-room-order.js` unchanged. The four placard links add +4 internal links for `audit-homepage-link-count.js`.

## Verification (in this order; all local first)
1. Dev: rename `frontend/app/sitemap.xml/route.ts` → `route.ts.DISABLED-FOR-DEV`; kill stale `next dev` processes and wipe `.next`; `npm run dev` in `frontend/`. **Rename it back before any push.**
2. `node scripts/audit-hero-copy.js` (+ its five poison modes) → PASS / expected FAILs.
3. `node scripts/audit-hero-identity.js --base=http://localhost:3000 --path=/en` (also `/de`, `/fi`) → PASS at all 8 widths; then `--poison`, `--poison=overlap`, `--poison=stray` → each FAILs (gate alive).
3b. `node scripts/audit-hero-fold.js --base=http://localhost:3000 --locales=en,de,fi` → PASS; then `--poison` → FAIL. Tune `--g10-band` until the primary CTA bottom ≤ fold − 12 at 1366×768 with the poster ≥ 700px wide.
4. `MSYS_NO_PATHCONV=1 node scripts/audit-homepage-responsive.js --base=http://localhost:3000 --path=/{locale} --locales=en,de,fi` → 14/14 widths PASS ×3 (de/fi = the long-string locales).
5. `node scripts/audit-homepage-link-count.js --base=http://localhost:3000 --locales=en,de,fi` ≥140.
6. (folded into 3b — `audit-hero-fold.js` is the committed proof that the commission's core defect is fixed, not a scratch script.)
7. Screenshots 360 / 768 / 1024 / 1366 / 1920 / 2560 for en + de + fi; **I read the 768, 1024 and 1366 renders myself**; a visual-critic agent judges the full sweep against the refuse-list + contrast floors; fix and re-run until clean.
8. `npx tsc --noEmit`, `npm run validate:i18n`, `npm run lint`.
9. Post the local renders → **operator approval** (ruled: required).
10. Commit (`[FEATURE][HOMEPAGE] v10.1 — the placard band: four pillars + 40,000+ inside the fold, premium hall finish`; i18n + gate in their own commits), push, `deploy.sh` per §A.5. Live: `curl` the homepage per locale for the new strings and 0 hits of "free"; `node scripts/audit-room-order.js --locales=en,de,fi` (live default base); `audit-hero-identity.js --base=https://www.lessoncraftstudio.com --path=/en`; re-shoot 1366×768 on production to confirm the CTA bottom < 768 (mind the 5-min Cloudflare TTL). Update `memory/project_homepage_v10_gallery.md` + the MEMORY.md pointer.

## Risks + rollback
- **Long-locale wrap** (de/fi glosses ~40% longer) can push the band past the fold at 1366 in those locales — the fold script runs for de/fi; the tagline is the first thing to drop; a gloss line-clamp is never the fix (no truncation).
- **Hero horizon 48 → 39** vs the rooms' shared floor line — resolved on the canvas (step 7).
- **`homepage-v6.css` single-class ties** (three prior bites): `:where()` for any layout-critical shared rule.
- **Pricing page still says "45,000+" and "200+ activities"** (`pricingPage.free.*`) — out of scope, flagged; the DB count supports "40,000+" there too.
- Rollback = `git revert` of the hero commit(s); the preview route keeps the v10.1 composition for visual diffing either way.
