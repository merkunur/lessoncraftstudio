# 003 — Ten Beds

## Identity
- Slug: `ten-frame-fill`
- Subject / topic: Mathematics / quantities 1-10 on a ten-frame (structuring numbers as 5-and-some, 10)
- Age band: `5-6`
- Interaction pattern: `P6` — build on a grid
- Frame: THE SPAN
- Estimated build size: ~520 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P6 (ten-frame fills top row left → right, F-48/F-50). Frame contract: `../MISSIONS.md` FRAME 6 — THE SPAN, ruled by `../GAME-DESIGN-LAW.md` (moving is solving; the pattern is now only how the finger reaches the world).

## Learning
- Objective: Builds a target quantity 1-10 on a ten-frame by filling cells in the standard order (top row left to right, then bottom row) and checks it.
- Prerequisites: Recognises numerals 1-10 (games 001/002). No reading.
- Curriculum links: F-1, F-4 (ten frame and part-part-whole are on the UK reception map), F-21, F-50 (ten-frames are an evidence-backed manipulative), F-31 rows "Count to 10-20" and "Number bonds to 10 / part-whole" — conservative ages 6-7 → 5-6 lower edge (US K.CC.B.5 / K.OA.A.4; England Reception "subitise" + Y1 "number bonds within 10"; Germany Klasse 1 Zehnerfeld; Netherlands groep 2-3 "getalbeelden"; Nordic bridge year 0-10).
- Common misconceptions (F-101, F-104), each with this game's response:
  1. **Filling cells out of order (scattered) and losing count.** Response: **a body has one position.** The owl stands *in* the nook she is about to furnish; a tap lays the bed under her talons and steps her on to the next nook; a tap on a furnished nook behind her steps her back one and takes that bed up again. Scattering is not refused by a rule the child has to discover — it is unrepresentable, because she cannot be in two nooks at once. Everything behind her is furnished, everything ahead is bare, and the fill is a contiguous run by construction.
  2. **Off-by-one on Check (9 filled for 10, or 10 for 9).** Response: on the knock the frame counts itself, performed by the arrivals — the little ones come one per nook in standard order with `ART.countBadge` numerals 1..N, `tone("tap", k)` rising, and the last badge grows (`ANIM.lastBadge`). If the wall is short, the bare nooks outline in `ART.needCell` **one at a time, in order, 180 ms apart, with rising tones**, so the child sees *and hears* how many more; if it holds too many, the owl walks back and takes the spare beds up one at a time (`ANIM.takeUp`) with descending `tone("tap", k)` until the wall holds exactly N.
  3. **Not seeing 5 as a unit (the top row).** Response: **the fifth bed is the only moment in an item when the owl changes shelf.** Laying it puts her at the end of the top shelf with nowhere left up there, so she glides the 363 px down and back to the start of the lower shelf (`ANIM.glideShelf`, 380 ms, once per item); the top shelf plays `ANIM.rowLock` as she leaves it and `ART.fiveMark` is chalked on the end post at (648, 196). `ART.tenMark` is chalked at (648, 284) when the lower shelf fills, and the "5" stays, so five-and-five is visible at once. The 5-and-some structure is made visible without words, and as a move the child caused rather than a badge that appears at them.
  4. **Reading the numeral 6 as 9 (mirror).** Response: the slate carries the numeral (`ART.targetNumeral`) and **the little ones waiting on the floor in an evenly spaced, countable row ARE the second cue** — the same quantity, readable two ways, from the first tap; colour is never the only cue. At L3 the door is shut and they are inside, so the second cue is withdrawn as a physical fact rather than as a removed graphic (cue fading, F-46). And the procession reveals the true quantity on every knock at every level, so a mirror-misread is corrected by the world every time.

## Mission
- **Mission (as the child would say it).** *Everybody needs a bed before they can go to sleep.*
- **Hero.** The owl (`ART.owlIdle` and her poses), keeper of a bank of ten sleeping nooks. She carries one round moss bed in her talons and works along the shelves laying them, **always standing in the nook she is about to furnish** — never a spectator on a finished wall (the load-bearing rule of THE SPAN). She is nocturnal, she glides the 363 px from the end of the top shelf to the start of the bottom shelf in one move, and she is pale (`surface2` tints) against grey sleepers, so the warm-body clause (ART-BIBLE §10.1) does not apply and the coral budget stays free for meaning.
- **The want (the visible lack).** A bank of ten bare nooks; a slate chalked "7"; a row of small hedgehogs standing on the floor with nowhere to go; the owl in the first nook holding one moss bed. **The lack is that nobody has a bed yet**, and it is readable in a single still frame with no words and no motion (GAME-DESIGN-LAW §2.4). Payoff is inside the same item, per the band 5-6 policy: they all get in, the wall goes quiet, and that roost joins the rest of the bank.
- **The destination / the waiting party.** The door at a constant (96, 300) for the whole session, with the little ones behind or beside it. They wait, they are indoors and warm, they never leave and they never get worse (Device 1).
- **The single state variable `S` = the owl's position along the roost wall.**
  - **Mathematical reading:** how many beds are made — the cardinality currently built on the ten-frame, in standard order (top shelf left→right, then bottom shelf). `bedsMade = owl.nookIndex − 1`.
  - **Physical reading:** which of the ten nooks the owl is standing in, and therefore how far along the two shelves she has got. Everything behind her is furnished; everything ahead is bare.
- **The isomorphism — the answer is how far along the wall the owl got, and the world's test is a one-to-one fit.** Three things collapse into one:
  1. **Cardinality is extent.** The number of beds is not reported, it is *walked*. A tap means "lay this bed and move on"; the owl's body is the count marker, and it can only be in one nook at a time.
  2. **The standard order is her route.** She cannot skip, cannot scatter, cannot jump back two. Filling out of order is impossible rather than forbidden.
  3. **The five-boundary is a move the child causes.** The top shelf is a real shelf; the fifth bed forces the shelf change (misconception 3), so "five and some more" becomes the one structural event of the item.
  The commit is not a Check tile. The child taps **the door**, the little ones come out and climb in one per nook with rising tones, and the frame counts itself by being *inhabited*. The correctness check never compares a tap to a stored `answer` field: it reads `owl.nookIndex`, and the world's test is whether every hedgehog finds a bed with none left over and no bed left bare — a one-to-one correspondence, which is the mathematical definition of equal cardinality, performed physically. Correctness is not judged; it is fitted.
- **The mark that stays.** A laid bed is never removed by an error, only by the child's own hand, and it goes back where it came from. A sleeper that is in bed stays in bed. A finished roost shrinks into the bank strip and stays there for the rest of the session, still showing the quantity the child built on it.
- **Declared deviation from THE SPAN's letter.** The built extent is tested by *equality with a guest count*, not by *reaching a place across a gap*; by the §2.15 discriminator ("composition versus equality") that leans toward THE OPENING. THE SPAN is taken anyway on the strength of the frame's own load-bearing rule — *"the hero stands on the structure while it grows and walks out along it as it extends… never a spectator waiting for a finished bridge"* — which is exactly this owl, and on the pattern→frame map, which names 003 under P6 → THE SPAN. The hero behaviour and the Displacement rule decide it; the discriminator is noted, not hidden.
- **Declared reading of the persistence gate.** Hero position at the start of item *k+1* equals its position at the end of item *k*, exactly and by construction: the correct-answer act ends with the owl standing in nook 1 of the next roost, and the next item begins there. **There is no teleport anywhere in the session.** The accumulating record (the settled roosts) sits in zone H, which is where the Mission Layout puts the history when one apparatus occupies the whole of zone W; that placement is declared here rather than worked around.

## World
**Zone T (0-56):** language picker at (16, 16). Nothing else — no progress meter of any kind, because progress is the wall and the bank.

**Zone W (56-420) — the bank at night.** One scene element only (ART-BIBLE §4): a single `ART.bankWash` in `THEME.colour.surface2` with a `THEME.colour.line` top edge at y = 120 running to the bottom of the stage; the sky above it is plain `THEME.colour.bg`.

| element | coordinates | notes |
|---|---|---|
| **slate** (the prompt) | `ART.slate` 104 × 104 centred **(96, 150)** | carries `ART.targetNumeral`, 72 px `structure` display, centred (96, 150); its top 22 px stand above the bank edge, so it reads as hung |
| **door** (the commit) | `ART.door` 110 × 130 centred **(96, 300)** → x 41-151, y 235-365 | `ART.doorLive` outline appears once at least one bed is laid; `ART.doorGlow` sits beneath it when it is shut at L3; `ART.doorOpen` replaces the shut art on a knock |
| **the roost wall — the ten-frame** | 10 × `ART.nook` 80 × 80, gap 8; `ART.wallFrame` 456 × 184 centred **(400, 240)** | cells span x **184-616**, y **156-324**; the frame stands 12 px proud horizontally and 8 px vertically |
| cell centres | x = **224, 312, 400, 488, 576**; y = **196** (top shelf), **284** (bottom shelf) | the 80 px tap floor is met by every nook |
| shelves | `ART.shelf` 440 × 4 `structure`, centred x = 400, at **y = 236** and **y = 324** | the two shelves the owl walks; the 5 + 5 gestalt survives |
| **end post** | `ART.endPost` 24 × 200 centred (652, 248); `ART.fiveMark` "5" at **(648, 196)**; `ART.tenMark` "10" at **(648, 284)** | each mark is chalked when its shelf fills; `ART.perch` 44 × 10 at (664, 356) |
| **the owl** | 64 px, drawn at the centre of the nook she occupies — **(224, 196)** at item start | when the wall is full she steps out to the post and settles at **(664, 324)** on the perch |
| **the waiting little ones** | `ART.sleeper` 40 px, pitch 54, centred x = 360 − (N−1)·27 + i·54, y = **372** | N = 3 → 306 / 360 / 414; N = 10 → 117 … 603 (outer edges 97-623, clear of the stage). 14 px between instances (ART-BIBLE §5 wants ≥ 12) |

Nothing occludes anything: the owl always stands in a **bare** nook, so every laid bed stays fully visible.

**Level ⇄ world.** At L1 and L2 the door stands open and the little ones wait in their row — **they are the second cue** beside the numeral. At L3 the door is shut with `ART.doorGlow` behind it and no hedgehog is visible; only the slate tells you how many, and the knock is what brings them out. F-46 cue-fading becomes a physical fact instead of a withdrawn graphic.

**Zone H (420-560) — the hand, EMPTY of controls.** There is no Check tile, no keypad and no stepper: the world is the hand and the commit is a world object (the door, in zone W). This buys the single biggest compliance win in the redesign — **zero words on the play screen**, where the pre-redesign spec shipped a button labelled `t("ok")` and the F-42 text budget for this band is zero. The zone carries the continuation of the bank wash and the **settled roosts**: `ART.miniRoost` 60 × 24 at y = 494, x = 94 + i·76 (94, 170, 246, 322, 398, 474, 550, 626), one per completed item, left to right. They are inert scenery, not controls.

**Interactive elements (F-69, §5.1 reading): 3.** The wall is ONE instrument — ten keys of one apparatus, every tap doing the same thing (lay and step, or step back) and never ten candidates to evaluate — plus the door, plus the character. Everything else (slate, little ones, bank, shelves, end post, settled roosts) is inert and counts zero.

**Keyboard.** Tab order is the ten nooks in reading order, then the door. Arrow keys move the focus ring between nooks, Enter or Space taps. `THEME.colour.focus` is the ring, per the shared contract.

## How it plays
1. **Start screen.** Title (`STRINGS.title`, 40 px display `structure`) at (360, 150); the owl `ART.owlIdle` at (360, 250) on a settled roost with one moss bed in her talons; `makeButton` `t("start")` at (360, 420); picker at (16, 16). Never auto-starts. The breathing idle allowed on Boot and Finish only (ART-BIBLE §6) runs here.

2. **Item 1 opens frozen (L1, target 3).** Zero tweens are running and every target is enabled — the F-42 gate's DECIDE state. The still frame: the slate chalked "3" at (96, 150); the door open at (96, 300); ten bare nooks; three little ones standing at (306, 372), (360, 372), (414, 372); the owl `ART.owlIdle` in nook 1 at (224, 196) with a bed in her talons. Nobody has a bed. Nothing on screen is a question and there is no text anywhere. Per F-42's one permitted concession (R4), on the very first item of a session the owl lays her first bed unbidden, once, and then holds.

3. **A tap on any bare nook = lay and step.** The bed drops from her talons into the nook she occupies (`ANIM.layBed`, 160 ms, run on the container wrapping the art per ART-BIBLE §9.3) and she walks on to the next nook (`ANIM.step`, 260 ms, `ART.owlWalk` for the travel, `ART.owlIdle` on arrival). `tone("tap", k)` with k = beds made, so the count climbs in pitch (F-213). `bedsMade = owl.nookIndex − 1` — the commit handler will read a **position**, never a tile id (the Displacement rule). Tapping nook 7 while she stands in nook 2 lays the bed in **nook 2**: the tap says "lay it and move on", and where "it" goes is decided by where her body is.

4. **A tap on a furnished nook behind her = step back and take it up.** She walks back one nook (`ANIM.step`; `ANIM.glideShelf` if the step crosses shelves) and the bed rises into her talons (`ANIM.takeUp`, 220 ms), `tone("tap", k)` at the new, lower count. Child-initiated, cost-free, no attempt consumed, nothing lost — an error never removes a bed; only the child's own hand does, and the bed goes back where it came from.

5. **The shelf change (target ≥ 6 only).** Laying the fifth bed leaves her at the end of the top shelf with nowhere left up there. She glides down and back to nook 6 at (224, 284) — `ANIM.glideShelf`, 363 px, 380 ms, once per item — the top shelf plays `ANIM.rowLock` as she leaves it, and `ART.fiveMark` is chalked on the end post. At L1 (targets 1-5) she never leaves the top shelf, so the glide first happens exactly when the child first builds five.

6. **The knock (the commit).** With at least one bed laid, `ART.doorLive` outlines the door in 4 px `structure` — the enabled cue is **outline weight**, not colour (§12). Tapping the door: `ANIM.doorSwing`, the shut art swaps to `ART.doorOpen` at L3, and the little ones come, one per nook, in standard order, 220 ms apart (`ANIM.arrive`), each carrying `ART.countBadge` 1, 2, 3 … with `tone("tap", k)` rising, each tucking into its bed (`ART.sleeperTucked`, `ANIM.tuck`). **The frame counts itself by being inhabited.** With zero beds laid the door is not live: the owl turns her head to the wall (`ART.owlThink`, 400 ms) and the door gives one `ANIM.nudge`; no attempt is consumed.
   - **Every one finds a bed, none left over, none left bare (k = N).** The last badge grows (`ANIM.lastBadge`), `tone("correct")`, `GameCore.showPraise` rotates its key, the owl swaps to `ART.owlHappy` for 700 ms and steps out along the shelf to the end post. Then the roost goes quiet: it shrinks into its slot on the bank strip as an `ART.miniRoost` still showing the quantity the child built (`ANIM.settleRoost`, 500 ms), the next bare roost rises into the working frame, and **the owl walks from the end post into its nook 1** — which is where the next item begins. No teleport, no reset, no erasure.
   - **Too few (k < N).** The first k climb in with badges 1..k and rising tones. The next one walks to the following nook, finds it bare, and **sits down on the shelf beside it** — indoors, warm, no sad face, and the enacted cue points at the apparatus, never at a creature. Then the bare nooks outline in `ART.needCell` **one at a time, in order, 180 ms apart, with rising tones** (`ANIM.needMark`), so exactly one coral element is lit at any instant (ART-BIBLE §8.3); `tone("nudge")`. The world is frozen throughout. **The ones already in bed stay in bed**; the surplus walk back to the door; the owl steps to the first bare nook and holds `ART.owlThink`. The child lays the rest and knocks again — attempt 2 costs only the beds actually missing, which is the shape F-46's ladder wants.
   - **Too many (k > N).** All N climb in with badges 1..N and the last badge grows — the self-count, unchanged. Then the owl walks back along the shelf and takes the **spare** beds up into her talons one at a time (`ANIM.takeUp`) with descending `tone("tap", k)`, leaving the wall holding exactly N. Nothing anyone needed was removed and nobody was displaced. Every little one is now asleep in a bed of its own, so the item **completes as a corrected attempt** (no praise pop, not first-try) — see the flag in Rules.
   - **Out-of-order fill.** Impossible by construction.
7. **Attempt 2 (a second short knock) is the show-me.** The owl lays the remaining beds herself, nook by nook with rising tones up to N (`ANIM.layBed` + `ANIM.step`, and `ANIM.glideShelf` if the run crosses the fifth), the door takes a **static** `ART.showRing` (4 px `structure`; it does not pulse, because a repeating tween while a target is enabled would break the F-42 freeze gate — outline weight is the second cue and needs no motion), and the child knocks. The procession completes the item as solved-with-help. No third wrong knock exists, no attempt 4, no losing state, no clock.

8. **A worked session.** Item 1 L1 "3" first-try; item 2 L1 "1"; two first-try knocks → item 3 comes from L2 "7", where the child lays 5, knocks, sees two nooks light in order with two rising tones, lays two more and knocks again (correct, not first-try); item 4 L2 "6"; item 5 L2 "10" first-try — the fifth bed forces the glide, "5" is chalked, then "10" is chalked as the lower shelf fills; item 6 L2 "8"; two first-try knocks → items 7 and 8 come from L3 "9" and "6", where the door is shut and the slate is the only cue.

9. **Between items nothing resets.** The wall the child sees is the *next* roost along the bank; the finished ones stay visible in zone H with their quantities in them. A child glancing at the screen at any moment reads how far along the owl is with no glyph at all, and how much of the bank is quiet.

10. **Finish.** The same bank, at the same coordinates, at the end of the night: every roost quiet, the last wall full, the owl `ART.owlSleep` asleep on the perch at (664, 324) with `ANIM.celebrate`. `t("all_done")` 52 px `structure` at (360, 92); the settled roosts move up to y = 440; `makeButton` `t("play_again")` at (250, 512) and `t("menu")` at (470, 512); `tone("finish")` once; `GameCore.reportHeight()`. No score, no first-try count, no stars — the learning summary is the bank itself, eight roosts each still showing the quantity the child built. A helped item is not marked: a settled roost is a settled roost.

Session ≈ 5 minutes. Act budget (≤ 60 s per session): lay-and-step 260 ms · shelf glide 380 ms once per item ≥ 6 · undo 220 ms · procession 220 ms per guest · correction ~900 ms · show-me ≤ 2200 ms · roost settle 500 ms. Eight items at ~6.5 beds plus four corrections ≈ **33.6 s**, measured against the cap with headroom.

## Art registry
```js
const ART = {
  /* the hero — five poses, no "oops": the character is never the consequence (GAME-DESIGN-LAW §3).
     Pale surface2 tints, so the warm-body clause (ART-BIBLE §10.1) does not apply here.
     New entries: register owl.idle/walk/think/happy/sleep in _lib/art.js and run
     `node _tools/art-sheet.js ten-frame-fill owl.idle,owl.walk,owl.think,owl.happy,owl.sleep`
     at 48/96/192/384 BEFORE the build — an owl needs a facial disc, a hooked beak and
     forward-facing eyes or it reads as a generic bird (ART-BIBLE §11, §12). */
  owlIdle:       { kind: "svg", value: LCSArt.get("owl.idle"),   size: 64, fallback: "🦉" },
  owlWalk:       { kind: "svg", value: LCSArt.get("owl.walk"),   size: 64, fallback: "🦉" },
  owlThink:      { kind: "svg", value: LCSArt.get("owl.think"),  size: 64, fallback: "🦉" },
  owlHappy:      { kind: "svg", value: LCSArt.get("owl.happy"),  size: 64, fallback: "🦉" },
  owlSleep:      { kind: "svg", value: LCSArt.get("owl.sleep"),  size: 64, fallback: "🦉" },

  /* the countable things — identical instances (ART-BIBLE §4) */
  bed:           { kind: "svg", value: LCSArt.get("mossbed"),        size: 48 },
  sleeper:       { kind: "svg", value: LCSArt.get("hedgehog.idle"),  size: 40, fallback: "🦔" },
  sleeperTucked: { kind: "svg", value: LCSArt.get("hedgehog.sleep"), size: 40, fallback: "🦔" },

  /* the apparatus */
  nook:          { kind: "shape", shape: "roundRect", w: 80,  h: 80,  fill: "surface",  stroke: "line", strokeWidth: 2, radius: 10 },
  wallFrame:     { kind: "shape", shape: "rect",      w: 456, h: 184, stroke: "structure", strokeWidth: 3 },
  shelf:         { kind: "shape", shape: "rect",      w: 440, h: 4,   fill: "structure" },
  endPost:       { kind: "shape", shape: "roundRect", w: 24,  h: 200, fill: "surface2", stroke: "line", strokeWidth: 2, radius: 10 },
  perch:         { kind: "shape", shape: "roundRect", w: 44,  h: 10,  fill: "surface2", stroke: "line", strokeWidth: 2, radius: 5 },
  fiveMark:      { kind: "text",  value: "5",  size: 28, font: "display", color: "inkSoft" },
  tenMark:       { kind: "text",  value: "10", size: 28, font: "display", color: "structure" },

  /* the prompt and the commit */
  slate:         { kind: "shape", shape: "roundRect", w: 104, h: 104, fill: "surface", stroke: "line", strokeWidth: 2, radius: 12 },
  targetNumeral: { kind: "text",  value: "", size: 72, font: "display", color: "structure" },
  /* non-square scenery sets w/h AND size = w, or drawArt renders a postage stamp silently (ART-BIBLE §9.1) */
  door:          { kind: "svg", value: "<svg viewBox='0 0 110 130'>…round-topped door, surface2 fill, 3 px line…</svg>",      w: 110, h: 130, size: 110 },
  doorOpen:      { kind: "svg", value: "<svg viewBox='0 0 110 130'>…the same door swung, dark surface2 interior…</svg>",      w: 110, h: 130, size: 110 },
  doorLive:      { kind: "svg", value: "<svg viewBox='0 0 116 136'>…outline only, 3 px structure, round-topped…</svg>",       w: 116, h: 136, size: 116 },
  doorGlow:      { kind: "shape", shape: "ellipse", w: 90, h: 26, fill: "structureSoft" },

  /* the scene — ONE element (ART-BIBLE §4) */
  bankWash:      { kind: "shape", shape: "rect", w: 720, h: 440, fill: "surface2", stroke: "line", strokeWidth: 2 },

  /* enacted feedback — needCell is the ONE accent entry in this registry: one grep, one number */
  needCell:      { kind: "shape", shape: "roundRect", w: 84, h: 84, stroke: "accent", strokeWidth: 4, radius: 12 },
  countBadge:    { kind: "shape", shape: "circle", r: 16, fill: "bg" },              // numeral on it: 20 px display, colour structure — carried by an arriving sleeper
  showRing:      { kind: "shape", shape: "roundRect", w: 122, h: 142, stroke: "structure", strokeWidth: 4, radius: 22 },

  /* the record that accumulates */
  miniRoost:     { kind: "shape", shape: "rect", w: 60, h: 24, stroke: "line", strokeWidth: 1 }  // two rows of five 10×10 cells; filled cells drawn as 8×8 structure squares
};
```

## Animation registry
```js
const ANIM = {
  step:         { duration: 260, ease: "Sine.InOut", trigger: "the owl moves one nook; the game sets the target x/y before the call" },
  glideShelf:   { duration: 380, ease: "Sine.InOut", trigger: "the owl changes shelf — nook 5 → 6, or the same move backwards (363 px)" },
  layBed:       { alpha: 1, scale: 1, duration: 160, ease: "Back.Out", trigger: "a bed is laid (from alpha 0, scale 0.6) — run on the CONTAINER wrapping the art, never on a kind:svg object (ART-BIBLE §9.3)" },
  takeUp:       { y: "-=30", alpha: 0, duration: 220, ease: "Sine.In", trigger: "a bed rises into the owl's talons — the child's undo, or a spare gathered on a too-many correction" },
  rowLock:      { scale: 1.06, duration: 160, ease: "Sine.InOut", yoyo: true, trigger: "the top shelf completes (the shelf container)" },
  arrive:       { duration: 220, ease: "Sine.InOut", trigger: "one sleeper walks from the row or the doorway to its nook" },
  tuck:         { alpha: 1, scale: 1, duration: 160, ease: "Back.Out", trigger: "a sleeper settles into its bed (container)" },
  lastBadge:    { scale: 1.4, duration: 220, ease: "Back.Out", yoyo: true, trigger: "the last badge of a procession (container)" },
  needMark:     { alpha: 1, duration: 180, ease: "Sine.Out", trigger: "one needCell outline appears, 180 ms after the previous one, in nook order" },
  doorSwing:    { scaleX: 0.86, duration: 120, ease: "Sine.InOut", yoyo: true, trigger: "the knock (the door container); the shut art swaps to doorOpen at the midpoint" },
  nudge:        { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "a knock with no bed laid — 'not yet', never a shake that reads as anger" },
  settleRoost:  { duration: 500, ease: "Sine.InOut", trigger: "the finished roost shrinks into its slot on the bank strip and the next bare roost rises into the frame" },
  celebrate:    { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "the finish owl (Finish scene only)" }
};
```
No entry repeats indefinitely. There is deliberately **no pulsing show-me tween**: the show-me is a static `ART.showRing`, because any running tween while a target is enabled fails the F-42 freeze assertion.

## Screen layout
```
y   0 ┌────────────────────────────────────────────────────────────────┐
      │ [lang 16,16]                                                    │  zone T   0-56
 56   ├────────────────────────────────────────────────────────────────┤  chrome only
      │  sky = THEME.colour.bg                                          │
120   │ ── bank top edge ─────────────────────────────────────────────  │
      │  ┌──────┐        ┌────┬────┬────┬────┬────┐   "5" (648,196) ║   │  zone W
      │  │slate │        │ 1  │ 2  │ 3  │ 4  │ 5  │  shelf y=236    ║   │  56-420
      │  │ "7"  │        ├────┼────┼────┼────┼────┤                 ║   │  THE WORLD
      │  └──────┘        │ 6  │ 7  │ 8  │ 9  │ 10 │  shelf y=324    ║   │
      │  ┌──────┐        └────┴────┴────┴────┴────┘   "10"(648,284) ╨   │
      │  │ door │  nook centres x = 224 312 400 488 576 · y = 196 / 284 │
      │  └──────┘        o   o   o     the little ones, y = 372         │
420   ├────────────────────────────────────────────────────────────────┤
      │  the bank continues · settled roosts y = 494, x = 94 + i·76     │  zone H
      │  [::]  [::]  [::]                          no controls at all   │  420-560
560   └────────────────────────────────────────────────────────────────┘
```
Fixed 720 × 560, `Scale.FIT`, static camera, no scrolling. The owl stands inside whichever nook she occupies; the wall, the door, the slate, the little ones and the hero are all in one frame, one saccade apart, with zero camera movement between item start and the knock. Progress is diegetic — the wall filling, the owl's own position, the bank going quiet — and there is no abstract completion meter anywhere on the play surface.

## Visual specification
- Background `THEME.colour.bg`. `ART.bankWash` centred (360, 340) so its `THEME.colour.line` top edge sits at y = 120 and it runs to the foot of the stage; it is the only scene element and is never animated.
- `ART.slate` at (96, 150) with `ART.targetNumeral` centred on it at (96, 150), 72 px `THEME.font.display` in `THEME.colour.structure`. A new item's numeral arrives with `ANIM.layBed`'s house-appear shape (alpha 0 → 1, 160 ms).
- `ART.door` at (96, 300) in `THEME.colour.surface2` with a 3 px `THEME.colour.line` edge. `ART.doorLive` is drawn concentrically once at least one bed is laid. `ART.doorGlow` at (96, 372) under the shut door at L3 only. `ART.doorOpen` replaces the shut art from the knock until the item ends.
- Ten `ART.nook` tiles via `makeTile`, centres x = 224 / 312 / 400 / 488 / 576 and y = 196 / 284; `ART.wallFrame` centred (400, 240); `ART.shelf` at (400, 236) and (400, 324). The 8 px gap is the ten-frame's own structural gap, inherited unchanged from the pre-redesign spec: the wall is one instrument rather than ten independent candidates, every nook clears the 80 px floor, and a mis-tap lands on a neighbouring nook of the same instrument, which is either the same action or an undo — never an error.
- A furnished nook draws `ART.bed` centred on it; an inhabited one draws `ART.sleeperTucked` over the bed. The owl is drawn at the centre of her nook, always a **bare** one, so no laid bed is ever occluded; while she carries a bed it is drawn at her talons, offset (0, +22).
- `ART.endPost` centred (652, 248) with `ART.perch` at (664, 356); `ART.fiveMark` chalked at (648, 196) and `ART.tenMark` at (648, 284) — once chalked, both stay until the roost settles.
- `ART.sleeper` instances at y = 372, pitch 54, centred on x = 360; identical instances, never differing in size or colour, so the child counts rather than compares.
- `ART.needCell` outlines a bare nook; `ART.countBadge` is carried by an arriving sleeper and drawn at its centre with the numeral in 20 px `THEME.font.display`, `THEME.colour.structure`. `ART.needCell` is the only `accent` element in the game and only ever one instance is lit at a time.
- `ART.showRing` is drawn concentrically around the door for the show-me, static, 4 px `THEME.colour.structure`.
- `ART.miniRoost` at y = 494, x = 94 + i·76, filled cells as 8 × 8 `THEME.colour.structure` squares; they accumulate left to right and never change once settled.
- Keyboard focus is `THEME.colour.focus` per the shared contract; every state also changes shape, position or outline weight, so nothing is carried by colour alone.

## Content
Language-neutral: there is no text on the play screen at all, and the only game-specific string is the title.

Level pools (target quantity = the number of little ones who came tonight):
- **L1** (1-5, top shelf only; door open, the row visible): 3 · 1 · 5 · 2 · 4
- **L2** (6-10, both shelves; door open, the row visible): 7 · 6 · 10 · 8 · 9
- **L3** (6-10, door shut — the slate is the only cue): 8 · 6 · 9 · 10 · 7

Play list of 8: per Rules. No target repeats within a level in one session, and never the same target on two consecutive items (the fixed-world reading of the randomisation rule — the wall is a place and does not rearrange itself, so the *candidate set* varies instead of the *positions*).

`STRINGS` ships all eleven locales for `title` (en de fr it es pt nl sv da no fi) per the shared contract; no `LOCALE_DATA` is needed, since quantities, beds and sleepers are culture-neutral and metric-free.

## Rules
- Item count: 8.
- Difficulty progression: 2 consecutive first-try correct knocks → the next item comes from the next level up (cap L3).
- Adaptation: a wrong knock, or a wrong first-try on 2 consecutive items → the next item comes from one level down (floor L1).
- What happens on a correct answer: every little one finds a bed with none left over and none left bare; the procession counts itself with `ART.countBadge` 1..N and rising tones, `ANIM.lastBadge` on the last, `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"], the owl `ART.owlHappy`, then `ANIM.settleRoost` moves the finished roost into the bank strip and the owl walks into nook 1 of the next roost.
- What happens on a wrong answer:
  - Too few: the first k climb in, the next one sits down beside its bare nook, the bare nooks outline in `ART.needCell` one at a time in order 180 ms apart with rising tones, `tone("nudge")`. Beds already laid stay laid; the surplus walk back to the door; the owl steps to the first bare nook. The item stays open.
  - Too many: the self-count runs to N, then the spare beds are taken up one at a time with descending tones until the wall holds exactly N. The item then **completes as a corrected attempt** (no praise pop, not first-try).
  - A knock with no bed laid: refused, not punished — `ART.owlThink` and one `ANIM.nudge` on the door; no attempt consumed.
  - Out-of-order fill: impossible by construction, because the owl has one position.
- Retry behaviour: attempt 1 → the enacted correction above → attempt 2 → on a second short knock the show-me plays (the owl lays the remaining beds herself, the door takes the static `ART.showRing`) and the child's knock completes the item as solved-with-help. No attempt 4.
- Finish condition: 8 items. No losing state, no clock, no score; nothing in the world ever decays.
- **Anti-brute-force guard — THE TWO-KNOCK LATCH.** The re-shuffle guard of P1 is unavailable here: the nooks are a persistent wall, and a station that jumps when you knock on it destroys the constancy that makes it a place. The named replacement is structural:
  1. **There is no third wrong knock.** One wrong commit plays the correction; a second hands the item to the show-me. A guesser gets **two of ten** values, never a sweep.
  2. **The first miss resolves the item.** After one wrong knock the world has already shown the answer physically — too few and the exact bare nooks light in order with rising tones, too many and the exact spares are taken away with descending ones — so the second knock is informed, and "try them all" is not a strategy that exists.
  3. **Commitment is a one-way door.** The first knock of an item consumes attempt 1 irrevocably; an item solved after any wrong knock never counts as first-try and never advances the level.
  4. **The candidate set varies, not the positions.** The wall is fixed for the session — that is the point of a place — and the target varies instead, with no repeat within a level and never the same target twice running.
  There is no brute force available at the bed-laying level either: the wall has no wrong nook and every tap is legal. The only judgement in the game is the count, and the latch governs it.
- **One flagged change to a pre-redesign correction, recorded rather than dropped.** The old spec required a second Check after a too-many correction ("this shows the correction without doing the child's checking for them"). On this apparatus that cannot be re-staged honestly: once the spares are gathered, every little one is asleep in a bed of its own and the item is *visibly finished*, so a world that then refused to end would be a verdict wearing a costume. The enacted correction is intact and its duration is preserved; the re-commit is not. The alternative — holding the last sleeper back on the shelf until the child knocks again — is available but arbitrary in the fiction, so it has not been taken. Operator's call.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Ten Beds", authored in all eleven locales. **No text of any kind on the play screen** — the old `t("ok")` Check tile is gone, because the commit is the door, which is how this redesign gets the 5-6 band's zero-word budget down to an actual zero.

## Sound
`tone("tap", k)` on each bed laid or taken up (k = beds made, so an undo sounds lower); `tone("tap", k)` rising through the procession, one note per sleeper; descending `tone("tap", k)` as spares are gathered; `tone("nudge")` on a short knock; `tone("correct")`; `tone("finish")` once on the Finish screen. Sound never carries meaning the screen does not also show. Silent under `?sound=off`.

## Testing checklist
- [ ] Works in all 11 languages (title, Start, All done, Play again, Menu and the praise rotation change with the picker).
- [ ] Works at narrow width (400-px iframe: all ten nooks, the door, the slate and the waiting row visible and tappable).
- [ ] Keyboard operable (arrows move between nooks, Enter lays or takes up; Tab reaches the door; Enter knocks).
- [ ] Never auto-starts.
- [ ] No losing state (wrong knocks never end the session; the owl eventually lays the remaining beds herself and the knock completes the item). No clock, no score.
- [ ] **Mission (deletion test B):** with `mission.hero` and `mission.goal` removed the game cannot complete a single item — no owl means no nook can be furnished and `bedsMade` has no referent; no door means there is no way to commit at all, because there is no Check tile to fall back on. `mutate-mission.js` must fail the build.
- [ ] **Maths (deletion test A):** with the target, the guest count and the frame structure removed there is no state of the wall the door will accept, no procession that fits, and nothing to finish.
- [ ] **Instant-cut (deletion test C):** patch `ANIM.step`, `ANIM.glideShelf`, `ANIM.takeUp`, `ANIM.arrive` and `ANIM.settleRoost` to `duration: 0` and the item log is byte-identical — every move lands on the same coordinate, fires the same `ANIM.rowLock`, chalks the same mark and commits the same `owl.nookIndex`.
- [ ] **Ratchet:** driven with a wrong answer on every item, no laid bed is ever removed by the game, no sleeper ever leaves a bed, no settled roost ever un-settles, and the count of settled roosts never decreases.
- [ ] **Freeze (F-42):** at every decision point, with any target enabled, the running tween count is zero — including during the show-me, whose ring is static.
- [ ] The character is never the consequence: on a wrong knock the owl's pose changes only to `ART.owlThink`, and the screenshot shows the correction on the apparatus.
- [ ] Tapping a bare nook lays the bed in the nook the owl occupies, never in the nook tapped; tapping a furnished nook steps her back exactly one and returns exactly one bed.
- [ ] Completing the top shelf plays the shelf glide once and chalks "5"; completing the wall chalks "10" with the "5" still there.
- [ ] The door is inert until at least one bed is laid, and the inert knock consumes no attempt.
- [ ] From the third level the door is shut and no sleeper is visible before the knock.
- [ ] The finish screen re-draws the bank at its play coordinates with eight settled roosts matching the solved quantities, and no score.
- [ ] Every mascot pose has been rendered at 384 px on the cream stage and looked at before the build (`art-sheet.js`), and the art registry census matches after any `_lib/art.js` edit.
- [ ] With `?sound=off` nothing is audible.
