# Homepage v12 — MOTION SCORE for the revised eight-act spine (jury rulings folded in)

## 0. Conventions (read once)

- **act-% = `cover` %** on the act's own `--tN`, with **`view-timeline-inset: 0 100%`** on every `.hv12-act` track (end inset = the whole scrollport, so `cover 0%` = track top at viewport top = the pip anchor, `cover 100%` = track bottom at viewport top; act fractions are literal). Verify on day 1; fallback if an engine rejects a full-height inset: `cover% = 100·(V + f·H)/(H+V)`.
- Every SCRUB is `linear both` (plates `linear forwards`, `to {opacity:1}` only). **The wheel is the easing; no scrubbed motion has a curve.** Shorthand always before `animation-timeline`/`-range`.
- Properties: `transform` (individual `translate`/`rotate`/`scale`), `opacity`, `clip-path`, registered `--deal` / `--fill` / `--sun` only.
- **Three movers only: light, the camera, the visitor's hand (the wheel, the pointer).** Nothing travels under its own power; the instruments' shipped v6 loops are revealed by light, never driven.
- **Words never animate.** Captions, stamps, plaques, CTAs are real text in the tracks and scroll as a document. The one exception: the H1's transform-only load lift (ruling 14).
- ONCE = `.hv12-js` arms, `.is-in` runs. **One island change:** IO B observes 1px × 8%-tall `<i class="hv12-enter" data-enter>` bands placed at an act-% inside the track, `rootMargin: '0px 0px -99% 0px'`, `threshold: 0` (fires when the band crosses the viewport-top line; 8% ≥ 61px so a 2,500px/s fling cannot jump it). v11's bottom-edge IO would fire one viewport early on a pinned stage.
- `--sun` (daylight outside, monotonic) is **piecewise per track** on `.hv12-day` (8 comma animations, `forwards`, `cover 0–100%`). Consumers: `.hv12-cast { transform: skewX(calc((.5 - var(--sun))*44deg)) scaleX(calc(1.7 - var(--sun)*.9)) }`, `.hv12-rail-shadow` likewise; `.hv12-wall.is-cool { opacity: calc(1 - var(--sun)) }` / `.is-warm { opacity: var(--sun) }` (static gradients). **Interior darkness is the blind**: per-plate `.hv12-dusk { opacity: calc(1 - var(--sun-act)) }`.
- Clock (bar instance): 7 sequential `forwards` animations per hand on `--t1..--t7`, `cover 0–100%`; none on `--t8` (the stop). Hour = 240° + sun·210°; minute = 6°·(minutes since 8:00).
- Desktop 1366×768, header ≈ 120px, `.hv12-day` at y 120. Stage pinned 120 → 6,786 (releases when the day's bottom meets the stage's bottom); bar pinned to 7,554.

**Heights (svh):** 08:00 **80** · 08:20 **120** · 09:40 **150 + 8 beat = 158** · 11:00 **100** · 13:00 **110** · 14:00 **190** · 14:40 **90** · 15:00 **120** = **968 svh = 7,434px** (below the 1,030 ceiling; the peak stays the longest by a visible margin). Phone (390×844, 46svh stage): 90 · 110 · 120 · 100 · 100 · 170 · 110 · 90 = 890 svh = **7,512px** + 64 header ≈ 7,580 ≤ 9,000.

## 1. Per-act score

S = SCRUB · O = ONCE · L = LOAD · doc = real text scrolling in the track. `--sun` and hands at act start → end.

### 08:00 Before the bell · 80svh (614px, y 120→734) · phone 90 · plate 1 (morning plate; it IS scroll 0)
`--sun` 0 → .048 · hour 240° → 250° · minute 0° → 120° · veil 0 · trolley ALREADY parked under the board

| # | Subject | Property | From → To | Range / timing | Mode |
|---|---|---|---|---|---|
| 1 | `.hv12-cast.is-a` | clip-path polygon | 2-unit sliver at the window foot → full lozenge | 1400ms, 0ms, `cubic-bezier(.2,.8,.2,1)` | L |
| 2 | `.hv12-cast.is-b` | clip-path polygon | sliver → lozenge | 1400ms, +180ms, same | L |
| 3 | `.hv12-shade-load` (wrapper of the one shadow group) | transform | `scaleX(.3)` → `scaleX(1)`, origin at the window foot | 1400ms, +60ms, same | L |
| 4 | `.hv10-h1` (real text in `#t-0800`, on the floor line at scroll 0) | translate | `0 .6cqw` → `0 0` (v11 `hv11Lift`) | 560ms, +120ms | L |
| 5 | `.hv12-scene .hv6-clock` (drawn in the poster) | opacity | 1 → 0 | `cover 0–40%` | S |
| 6 | `.hv12-bar` | opacity | 0 → 1 | `cover 0–40%` | S |
| 7 | `.hv12-bar-cta` | opacity | 0 → 1 | `cover 25–45%` | S |
| 8 | H1 · sub · CTA · meter line | — | leave the viewport as a document (y ≈ 560–720 at scroll 0 → gone by scroll ≈ 720) | — | doc |
| — | silence on the plate | | | `45–100%` (the words are still leaving; hands) | |

Reduced-motion pose: casts and shadows full, H1 at rest, bar hidden, stamp "8:00".

### 08:20 The front of the room · 120svh (922px, y 734→1,656) · phone 110 · same plate, no entry
`--sun` .048 → .238 · hour 250° → 290° · minute 120° → 600°

| # | Subject | Property | From → To | Range | Mode |
|---|---|---|---|---|---|
| 1 | `.hv12-front` | scale (origin 50% 60% = the VP) | 1 → 1.06 | `0–60%` | S |
| 2 | `.hv12-rail` (desks) | translate · scale · opacity | `0 0`→`0 3.5cqw` · 1→.92 · 1→.38 | `0–60%` | S |
| 3 | `.hv12-lightband` (10 units, `--light` 1.6× alpha) | translate | `-10cqw 0` → `100cqw 0` | `20–78%` | S |
| 4 | `.hv12-shade.is-rek` (veil over the rekenrek, on her desk) | opacity | 1 → 0 | `38–42%` | S |
| 5 | `.hv12-shade.is-onl` (the chalk number line, already on the board) | opacity | 1 → 0 | `48–52%` | S |
| 6 | `.hv12-shade.is-balance` | opacity | 1 → 0 | `58–62%` | S |
| 7 | `.hv12-shade.is-lids` | opacity | 1 → 0 | `68–72%` | S |
| 8 | Play plaque (`live.cta`) | static real-px text in the track | scrolls into view ≈ 80% | — | doc |
| — | silence on the plate | | | `78–100%` | |

Four instruments (12 units ≈ 140px), on the parked trolley and her desk; the wake is the light band alone. The iframe mounts on click only.

### 09:40 Handing out · 158svh (1,213px, y 1,656→2,869) · phone 120 · plate 3 **dissolve `0–12%`**
`--sun` .238 → .429 · hour 290° → 330° · minute 600° → 1080°

| # | Subject | Property | From → To | Range | Mode |
|---|---|---|---|---|---|
| 1 | plate 3 | opacity | 0 → 1 | `0–12%` | S |
| 2 | `.hv12-wallwide` (board, coats, door) | translate | `0` → `-24cqw 0` | `4–88%` | S |
| 3 | `.hv12-riverrail` (25 desks, hand-authored seating plan: pairs, a horseshoe fragment, one alone by the window) | translate | `12cqw 0` → `-150cqw 0` | `4–88%` | S |
| 4 | `.hv12-riverrail` | `--deal` | 0 → 1 | `10–88%` | S |
| 4a | `.hv12-sheet[style*=--i]` (derived) | transform · opacity | `--k: clamp(0, calc((var(--deal) - var(--i)*.0345)/.17), 1)`; `translate(calc((1 - var(--k))*-26cqw), calc((1 - var(--k))*9cqw)) rotateX(calc(var(--k)*35deg)) rotate(calc(-4deg - (1 - var(--k))*21deg)) scale(calc(1.25 - var(--k)*.25))`; opacity `min(1, calc(var(--k)*4))` | sheet i airborne from off-frame over deal [.0345i, +.17]; landed at ≤ 35° (ruling 3) | S |
| 5 | grade plaques + `Pick a grade…` | in the track from 60% | — | — | doc |
| 6 | `.hv12-cast-beat` (wrapper on plate 3's two casts) | transform | `scaleX(1)` → `scaleX(.72)`, origin at the window foot | **`95–100%`** (the beat: 61px, light doing something) | S |
| — | **THE BEAT** | only the casts shorten | | `95–100%` | |

No cuff, no stack: every sheet appears already in the air at −25° from the same off-frame point.

### 11:00 One desk · 100svh (768px, y 2,869→3,637) · phone 100 · plate 4 **cut `0–1.2%`**
`--sun` .429 → .714 (the cast's skew crosses 0 at 25%: noon inside this act) · `--sun-act` .86 (veil .14) · hour 330° → 390° · minute 1080° → 1800°

| # | Subject | Property | From → To | Range | Mode |
|---|---|---|---|---|---|
| 1 | plate 4 | opacity | 0 → 1 | `0–1.2%` | S |
| 2 | `.hv12-cam` | scale | 1.16 → 1 | `0–22%` | S |
| 3 | activity facade root | `--fill` | 0 → 1 | `24–72%` | S |
| 3a | `.hv10-act-dot` (derived) | opacity only | `clamp(0, calc((var(--fill)*20 - var(--i))*1000), 1)` — an opacity STEP per dot, one every 2.4% ≈ 18px; no scale | — | S |
| 4 | `.hv10-act-tick` | opacity · transform | `hv11TickOnce` 600ms `cubic-bezier(.34,1.4,.5,1)` (overshoot allowed only on ONCE) | `.hv12-enter` band **74–82%** | O |
| 5 | `practice.*`, caption, CTA, the printed framework header on the sheet | track 30–80% | — | — | doc |
| — | hold | | | `80–100%` (20%, 154px) | |

The real activity mounts on click (iframe, like the rekenrek); the facade carries the dots.

### 13:00 The send · 110svh (845px, y 3,637→4,482) · phone 100 · plate 5 **cut `0–1.2%`**, then **the BLIND, once**
`--sun` .714 → .857 · `--sun-act` 1.0 → **.45** (ONCE) · hour 390° → 420° · minute 1800° → 2160°

| # | Subject | Property | From → To | Timing | Mode |
|---|---|---|---|---|---|
| 1 | plate 5 (armed pose: blind up, board unlit, screens dark) | opacity | 0 → 1 | `0–1.2%` | S |
| 2 | `.hv12-blind` (the projector blind, a large element) | translate | `0 -100%` → `0 0` | 480ms, 0ms, `cubic-bezier(.4,0,.2,1)`; `.hv12-enter` band **4–12%** | O |
| 3 | plate 5 `.hv12-dusk` | opacity | 0 → .55 | 320ms, +160ms, ease-out (NEVER `steps` on a room-sized veil: photosensitivity) | O |
| 4 | `.hv12-board-lit` (the board becomes the brightest object) | opacity | 0 → 1 | 320ms, +240ms | O |
| 5 | `.hv12-qr` (projected, right of centre) | opacity | 0 → 1 | 240ms, +300ms | O |
| 6 | `.hv11-screen` ×25 on the seating plan (`--x/--y/--s` inline) | `hv11ScreenOn` 360ms ease-out | one beat | +900ms, **no stagger** | O |
| 7 | `share.*`, the two new lines, `embed.oneLiner` | track 20–85% | — | — | doc |
| — | hold (blind down) | | | `12–100%` (127px hands-only tail) | |

BASE (no JS / reduced) = blind down, board lit, screens on. Scrolling back up does not raise the blind (ONCE); the 11:00 cut hides it anyway.

### 14:00 THE PEAK · 190svh (1,459px, y 4,482→5,941; 1% = 14.6px) · phone 170 · plate 6 **dissolve-to-dark `0–7%`**
`--sun` .857 → .952 · `--sun-act` .38 (veil .62 outside the pool; the blind is still down, so the lamp is honest) · hour 420° → 440° · minute 2160° → 2400° (13°/100px: the slowest clock on the page)

Plate 6 BASE from its first frame: the desk from above under the lamp already ON (pool = `.hv12-lit` ellipse 34% 28% at 58% 46%, a light layer above the veil), **the three level sheets of hers already on the desk** in the pool (320px wide, the chosen one on top at −2°), the trays and the level dial at rest at the pool's edge. Nothing on this desk moves by itself.

| # | Subject | Property | From → To | Range | Mode |
|---|---|---|---|---|---|
| 1 | plate 6 | opacity | 0 → 1 | `0–7%` | S |
| — | **THE HELD SILENCE** (the page's only one before the climax): the still life under the lamp | | | `7–16%` (131px) | |
| 2 | headline (10%) · `make.body` (28%) · the levels line (42%) | track | the visitor compares the three levels while reading | `16–48%` still plate | doc |
| 3 | `.hv12-spread` | `--deal` | 0 → 1 | `48–100%` | S |
| 3a | `.hv12-spread-sheet[data-i]` i = 1..10 (derived) | transform | `--k: clamp(0, calc((var(--deal) - (var(--i) - 1)*.0833)/.25), 1)`; `translate(calc(var(--k)*var(--dx)), calc(var(--k)*var(--dy))) rotate(calc(var(--k)*var(--rot)))` | sheet i slides out from under hers over deal [.0833(i−1), +.25]: one every 51px, the last lands at 100% | S |
| 3b | `.hv12-tag[data-i]` (sibling at the resting pose; aria-hidden art, the real list is the track's 11 links) | opacity | `clamp(0, calc(var(--k)*3 - 2), 1)` | last third of its sheet's travel | S |
| 4 | `.hv12-lit` | clip-path | ellipse 34/28 → 56/42 | `48–96%` | S |
| 5 | `fan.fanLine` | track 70% | — | — | doc |

One climax; no second beat after it. The act ends on the complete spread, which is also the BASE frame and the jury frame.

### 14:40 Inside the classroom door · 90svh (691px, y 5,941→6,632) · phone 110 · plate 7 **dissolve `4–20%`**
`--sun` .952 → 1 · `--sun-act` .95 · hour 440° → 450° · minute 2400° → 2520°

| # | Subject | Property | From → To | Range | Mode |
|---|---|---|---|---|---|
| 1 | plate 6 `.hv12-lit` (on `--t7`) | clip-path | ellipse 56/42 → `ellipse(0% 0%)` | `0–8%` | S |
| 2 | plate 7 (the door, the two printed sheets, steel pins, blind still down behind) | opacity | 0 → 1 | `4–20%` | S |
| 3 | Sheet A (plans) · Sheet B (promises), real text on the site's own paper | track 10–100% | scroll as a document | — | doc |
| — | **NOTHING MOVES** | | | `20–100%` | |

### 15:00 Home time · 120svh (922px, y 6,632→7,554) · phone 90 · plate 8 **dissolve `0–14%`**; stage releases at y 6,786 (act 16.7%); bar at 7,554
`--sun` 1 (hold) · veil 0 (blind up) · hands **stopped at 450° / 2520°** (no `--t8` animation; `forwards` from `--t7` holds them)

| # | Subject | Property | From → To | Timing | Mode |
|---|---|---|---|---|---|
| 1 | plate 8 (blind up, door open, west light) | opacity | 0 → 1 | `0–14%` | S |
| 2 | `.hv12-doorcast.is-a/.is-b` | clip-path | sliver at the door foot → mirrored lozenges | 1600ms, b +200ms, `cubic-bezier(.2,.8,.2,1)`; `.hv12-enter` **10–18%** | O |
| 3 | `.hv12-shade-load` (plate 8) | transform | `scaleX(.3)` → 1, origin at the door foot | 1600ms, +80ms, same | O |
| 4 | the 15:00 words + shelf plaque (tool link) | real text in `#t-1500` at `top: 16.7%` | land in the hero's box exactly as the pin releases, then travel with the frame | — | doc |
| — | still | | | `14–16.7%` (25px); then the frame lifts as a page | |

The clock stops and stays; the bar leaves with the day; the catalogue is the corridor beyond the door (no motion).

## 2. Dead-scroll proof (desktop 1366×768)

| Window (y px) | What visibly changes |
|---|---|
| 0–120 | header leaves; sunrise LOAD (casts open to 1.4s, shadows stretch, H1 lifts) |
| 120–366 | bar clock crossfades in over the poster's clock; hour 240→244°, minute 0→48° |
| 274–396 | the bar CTA fades in |
| 120–720 | the H1, sub, CTA leave as a document (they stand at y 560–720) |
| 720–734 | minute hand only (14px) |
| 734–1,287 | the front wall pushes in, the desks recede |
| 918–1,453 | the light band crosses; four wakes at 1,084 / 1,177 / 1,269 / 1,361 |
| 1,453–1,656 | the Play plaque scrolls up (in the track from ≈1,470); minute +105° |
| 1,656–1,802 | dissolve to 09:40 (coats, chairs down, one desk alone by the window) |
| 1,705–2,723 | the wall dollies, the seating plan slides; a sheet lands every ≈38px (1,777→2,723) |
| 2,384–2,869 | grade plaques + first-step line scroll |
| 2,723–2,808 | plaques in view; minute +34° |
| **2,808–2,869** | **THE BEAT**: the casts shorten 28% in 61px |
| 2,869–3,038 | cut to the desk; the camera settles |
| 3,053–3,422 | twenty dots appear, one per ≈18px |
| 3,437 | the tick (ONCE) |
| 3,099–3,483 | `practice.*`, caption, CTA scroll |
| **3,483–3,637** | **minute hand only at 94°/100px** (two hours in one act): 154px; enough — the sweep is the event |
| 3,637–3,647 | cut to the back of the room, blind up |
| 3,671 | the BLIND drops (ONCE 0–0.5s), board lights, QR projected, screens on one beat at 0.9s |
| 3,806–4,355 | `share.*` + three lines scroll |
| **4,355–4,482** | **minute hand only** (+54°), 127px |
| 4,482–4,584 | dissolve to the desk under the lamp |
| **4,584–4,715** | **THE HELD SILENCE**, 131px, deliberate |
| 4,628–5,182 | headline, body, levels line scroll over the still life |
| 5,182–5,941 | the SPREAD: a sheet leaves from under hers every 51px; the pool widens |
| 5,941–6,079 | the lamp closes; the door dissolves in |
| 6,010–6,632 | Sheet A, Sheet B scroll as a document |
| 6,632–6,761 | dissolve into west light; 6,724 the door casts open (ONCE) |
| 6,761–6,786 | still, 25px |
| 6,786–7,554 | the frame lifts with the document; the words settle into the hero's box; the shelf rises past the stopped clock |

No window ≥ 300px is hands-only. Hands-only windows: 14 · 154 · 127 · 131 (designed) px. The harness rule "hour angle strictly increases per 100px" must **exempt `#t-1500`** and count caption travel only while a caption is inside the viewport.

## 3. The three transitions

Light per act (`.is-cool` / `.is-warm` = 1−sun / sun; interior veil = 1−`--sun-act`):

| Act | `--sun` | cool | warm | `--sun-act` | veil | interior light |
|---|---|---|---|---|---|---|
| 08:00 | 0 | 1.00 | 0 | 1 | 0 | dawn, casts +x long |
| 08:20 | .048 | .95 | .05 | 1 | 0 | the band |
| 09:40 | .238 | .76 | .24 | 1 | 0 | casts shortening |
| 11:00 | .429→.714 | .57→.29 | .43→.71 | .86 | .14 | noon crosses at 25% |
| 13:00 | .714 | .29 | .71 | 1.0 → .45 (ONCE) | 0 → .55 | **blind down**, board brightest |
| 14:00 | .857 | .14 | .86 | .38 | .62 / 0 in the pool | blind down, lamp |
| 14:40 | .952 | .05 | .95 | .95 | .05 | door open to the corridor |
| 15:00 | 1 | 0 | 1.00 | 1 | 0 | **blind up**, west light, −x long, orange |

**13:00 → 14:00 (the blind stays down).** The room is already dark from the blind; `--t6 0–7%` dissolves from the dark classroom to the desk from above, the lamp already on: no switch, no snap. `7–16%` the still life holds (the page's only held silence before the climax). The eye is on the three sheets before a word is read. Clock: 2:00 at the seam.

**14:00 → 14:40 (leaving the lamp).** On `--t7` the pool closes `0–8%` while the door dissolves in `4–20%`: she left the desk and switched the lamp off; the corridor light through the open door is the new source. Nothing moves after 20%.

**14:40 → 15:00 (the blind is up).** Plate 8 dissolves `0–14%` with the window clear and the door open; the ONCE at 10–18% lays the door casts across the floor (the sunrise mirrored, 1.6s). Clock: it arrives at 3:00 at the seam and never moves again.

## 4. The peak, second by second

1,459px. Wheel ≈ 1,000px/s (a notch ≈ 100px); trackpad fling ≈ 2,500px/s.

| t (wheel) | t (fling) | notches | Beat |
|---|---|---|---|
| 0.00–0.10 | 0.00–0.04 | 1 | dissolve to the desk under the lamp |
| **0.10–0.23** | 0.04–0.09 | 1.3 | **HELD**: three sheets of hers, the trays, the dial |
| 0.23–0.70 | 0.09–0.28 | 4.7 | still; headline, body, levels line pass over it |
| 0.70–1.46 | 0.28–0.58 | 7.6 | **THE SPREAD**: a sheet every 51px / 51ms; the pool widens to 1.40 |

A fling lands on the finished spread (the BASE frame). A notch reader stops at the held frame because the headline is arriving.

**The spread table.** Ten sheets 214×285 start stacked under hers (top-left 243,371 → centre 350,513) and slide to two overlapping rows to the right, the way paper lies; hers stays where it is, forward, 320×427 at (190,300), rot −2°, z 11. Back row y 200, front row y 330, step 132px; each sheet's exposed strip = its left 132px (× top 130px in the back row). Every tag (118×26, endonym · framework) sits in that exposed strip at (+6,+8), so no neighbour and no front-row sheet ever covers it; hers carries a 200×34 tag at (198,310). Right edge 1,348 ≤ 1,366; no axis of symmetry.

| i | row · col | --dx | --dy | --rot | z | starts at deal |
|---|---|---|---|---|---|---|
| 1 | back 0 | 297px | −171px | −2.5° | 1 | 0 |
| 2 | back 1 | 429 | −171 | 1.5° | 2 | .083 |
| 3 | back 2 | 561 | −171 | −1° | 3 | .167 |
| 4 | back 3 | 693 | −171 | 2° | 4 | .25 |
| 5 | back 4 | 825 | −171 | −1.5° | 5 | .333 |
| 6 | front 0 | 363 | −41 | 1.2° | 6 | .417 |
| 7 | front 1 | 495 | −41 | −2° | 7 | .5 |
| 8 | front 2 | 627 | −41 | .8° | 8 | .583 |
| 9 | front 3 | 759 | −41 | −1.4° | 9 | .667 |
| 10 | front 4 | 891 | −41 | 2.2° | 10 | .75 → lands 1.0 |

**Phone rail**: `.hv12-spread-rail` in flow after the stage; `display:flex; overflow-x:auto; scroll-snap-type:x mandatory; scroll-padding-inline:19vw; gap:12px`; cards `62vw` (242px) with the tag beneath, `scroll-snap-align:center`, hers first, 19vw slivers of the neighbours as the affordance; the three levels are a second, shorter rail above it. No scrubbed or once motion on either rail; the plate spread is `display:none` on phone.

## 5. Load (08:00) and entry (15:00)

| | 08:00 LOAD | 15:00 ONCE (`.hv12-enter` 10–18%) |
|---|---|---|
| cast a | clip-path sliver → lozenge, 1400ms, 0ms, `cubic-bezier(.2,.8,.2,1)` | mirrored polygons, 1600ms, 0ms, same |
| cast b | +180ms | +200ms |
| shadows | `.hv12-shade-load` scaleX .3→1, 1400ms, +60ms, origin window foot | scaleX .3→1, 1600ms, +80ms, origin door foot |
| H1 | translate `0 .6cqw`→0, 560ms, +120ms (the one text motion) | none |
| reduced-motion pose | casts + shadows full, H1 at rest | door casts + shadows full, hands at 3:00 |

No two starts share a frame (0 / 60 / 120 / 180ms).

## 6. The clock

Hands (bar instance; `.hv6-clock-hand` `transform-origin 50% 100%` kept; the v6 12s loop re-declared away). `transform: rotate()` two-frame keyframes, `linear forwards`, `cover 0% cover 100%`:

| Track | Hour | Minute |
|---|---|---|
| `--t1` 08:00 | 240 → 250 | 0 → 120 |
| `--t2` 08:20 | 250 → 290 | 120 → 600 |
| `--t3` 09:40 | 290 → 330 | 600 → 1080 |
| `--t4` 11:00 | 330 → 390 | 1080 → 1800 |
| `--t5` 13:00 | 390 → 420 | 1800 → 2160 |
| `--t6` 14:00 | 420 → 440 | 2160 → 2400 |
| `--t7` 14:40 | 440 → 450 | 2400 → 2520 |
| `--t8` 15:00 | **none** (holds 450) | **none** (holds 2520 ≡ 0) |

Poster clock (08:00 plate): static 240° / 0°. **Pips** (8, coral, 8px + 18px hit; `top:3px; transform-origin: 50% 25px` on the 56px dial): `rotate` 240 · 250 · 290 · 330 · 30 · 60 · 80 · 90 deg. **Stamps**: 24-hour in every locale (`hour12:false`, locale separator), no card, one large numeral in the track per act (Baloo 2 700, cream + the H1 shadow on green, ink on the 14:40 paper, fixed colour); the bar's numeral is eight stacked `<time>` swapped by `opacity` **`steps(1, jump-end)`** at `--tN cover 0–0.5%` (a small element; the flip-clock swap is honest, a fade is a word animating). **15:00**: the hands stop; no morph; the bar keeps its CTA until it leaves with the day. NOSCRUB: hands `transition: transform 600ms cubic-bezier(.2,.8,.2,1)` between per-act angles; stamps swap on `[data-act]`.

## 7. Phone (≤767px; 46svh stage + 56px bottom bar)

| Act | recrop `.hv12-scene` | simplified / removed |
|---|---|---|
| 08:00 | none (2:1 at 100vw) | shadow-stretch LOAD kept; CTA in the bottom bar |
| 08:20 | `scale 2.2; origin 50% 30%` + `translate 0 → -12cqw` `0–78%` (the pan) | front push removed (the recrop is the push); four wakes kept |
| 09:40 | `scale 2.0; origin 40% 62%` | ≈8 desks in view; beat `95–100%` kept (casts shorten); grade plaques a real-px horizontal scroller |
| 11:00 | `scale 1.5; origin 64% 42%` | camera settle removed; dots appear; tick ONCE kept |
| 13:00 | `scale 2.0; origin 50% 36%` | six screens visible; blind ONCE kept (large element: keep the 480ms, never faster) |
| 14:00 | `scale 1.9; origin 50% 50%` | plate spread `display:none`; stage holds the still life `7–100%`; the two rails follow in flow; pool-widen removed |
| 14:40 | none, no pin (the door 100vw in flow) | — |
| 15:00 | `scale 1.9; origin 70% 55%` | door-cast ONCE kept |

Pips hidden; no hover. Day 7,512px.

## 8. Ten ways this goes cheap, and the rule against each

1. **Eased scrub** feels like an elastic band → every scrubbed animation is linear; curves live only on LOAD/ONCE (the sunrise, the blind, the tick).
2. **Two arrivals on one frame** → unique starts everywhere (load 0/60/120/180ms; the blind sequence 0/160/240/300/900ms; the wakes 10% apart; the spread 8.3% apart).
3. **Bounce / overshoot under the wheel** → `y > 1` curves are allowed only on a ONCE (the tick), never on scroll or load.
4. **Fade-up on every section** → plates enter by light (cut, dissolve, the blind); words never fade, slide, or lift (the H1 load lift excepted).
5. **Things that move by themselves** (a rolling cart, a filling sheet, a self-switching lamp, a rising plaque) read as an animation demo → only light, the camera and the visitor's hand move anything; the instruments' loops are revealed, not driven.
6. **Steps(1) on a room** (a flash) → `steps` only on small elements (the bar numeral); the blind and its veil run 320–480ms ONCE.
7. **Colour recomputed per frame** (khaki wall, muddy casts) → temperature is two static layers cross-faded; `--sun` never touches `background`, `color`, `box-shadow`, `filter`.
8. **A moving target while reading** → nothing on a plate moves while a caption is entering its resting zone except the clock; the 14:40 paper never moves.
9. **The uniform stagger and the grid** (`--i*40ms`, 5×5) → 25 screens light on one beat on a hand-authored seating plan; the spread's rotations are hand-set; no act is symmetric.
10. **A cut that nobody motivated** → every plate change has a light source or a clock reading in the frame: a blind, a lamp, a door, the sun outside — and the hour hand reads the stamp at every seam.
