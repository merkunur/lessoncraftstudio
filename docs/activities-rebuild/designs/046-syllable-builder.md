# Row 46 — The Telescope: Kikkerten (RF.K.2.B, da)

## 0. Identity
- id `syllable-builder.byg-ordet-af-stavelser.da.rf-k-2-b` (KEPT) · grade K (da: børnehaveklasse) · Common Core RF.K.2.B; the page names Fælles Mål only (§20.10) · strand Reading: Foundational Skills · **locale-scoped row: ships in da only** (slug `byg-ordet-af-stavelser`, page title "Byg ordet af stavelser — Fonetik i børnehaveklassen" and intro frozen).
- own files: `mini tools/telescope-core.js`, `telescope-activity.js`, `telescope-activity.html`. Manifest row stays in `syllable-builder-activities.json`; `tool` → `telescope-activity`; `params` → §6 tables. 0 lines to shared engines or `lcs-shell.*`.
- worksheets it covers: none mapped.
- what the old activity did: tap scrambled syllable tiles into slots, 28 Danish words. **Kept:** the K-1-safe Danish words of the pool and the blend task (Level 2). **Defects found and fixed at the source (2026-10-17 check of every pool word against `approved-words-da.json` and the picture labels):**
  - **11 live words are `policy_managed: true`** (orthographic split ≠ how Danish is spoken; the §20.7 Danish policy keeps them OUT of K-1): snemand, handske, søstjerne, vandmelon, jordbær, helikopter, sommerfugl, tiger, skildpadde, fersken, kat. All removed.
  - **"klokke" was shown on the CLOCK picture** (around the house/clock, whose Danish label is *ur*): a clock is "et ur" — now "klokke" uses christmas/bell, whose label *is* klokke.
  - **"ankel"** has no library picture (body parts has no ankle) — removed.
  - The new pool is drawn only from the `policy_managed:false` list (402 words) with a colour picture whose da label equals the word.
- **Gone:** tile tapping.

## 1. The pitch
"A telescope you pull out one click for every syllable you say — look through it, and the picture is only sharp when the telescope has exactly as many parts as the word."

## 2. Why a child will want it again (the fun)
- **A telescope is a treasure.** Brass tubes that slide out with a heavy, oiled *klik* at each stop; a little lens glint runs along the tube as it extends; push it back and it nests shut with a soft *thunk*. Children pull it in and out just to feel the clicks.
- **The look.** Pressing "Kig!" (Check) swings a round eyepiece view onto the stage: the far-away picture appears big inside a black circle — perfectly sharp when the count is right, smeared with blur when it is not. Focus is the verdict, and a child understands focus without a word.
- **The syllables arrive on the brass.** When sharp, each tube segment wears its syllable engraved on its ring; push the telescope closed and the syllables slide into each other until the whole word sits on the big tube.
- **The earned show:** the telescope swings up and "spots" the picture — a gentle zoom-in with a twinkle in the lens — then a small drawn spyglass mark with the word written beside it (`kanin`, with one dot per syllable under it) is inked into the **logbook** strip at the top (a captain's log of everything spotted this pass — words and dots, never a shrunken picture).
- **Free play:** between rounds the child may extend and collapse the telescope freely (the view shows a blurry/sharp sea horizon of stripes — pure geometry) and tap a logbook entry to hear its word.
- No timer, score, streak or lives.

## 3. The skill and the misconception
- **Skill (RF.K.2.B):** count the syllables in a spoken word (Level 1, oral), blend syllables into a word in order (Level 2), find the missing syllable (Level 3).
- **Misconception 1 — "long word, many syllables / every sound is a syllable"** (pulling one click per sound). Pushback: too many segments → blurred view, the extra segments stay blank and dull.
- **Misconception 2 — swallowing a syllable** (rushing a word so its unstressed last syllable gets lost: *kjo-le* clapped once). Every round word is one whose written and spoken syllables agree (`policy_managed:false`), so the beat is really there to be heard. Pushback: too few segments → blurred view, the last segment carries two syllables squeezed with a groove between them where it should come apart.
- **Misconception 3 — "syllables go in any order"** (Level 2). Pushback: collapsing the telescope reads the word in segment order; a segment in the wrong place pops back out.
- **Misconception 4 — the missing piece is always at the end** (Level 3). Pushback: the gap moves (first/middle/last).

## 4. The stage
**Layout: stacked at every width** (layout check 2026-10-17: no `layout:'split'` — its stage column is only ≈ 370 px at 704, too narrow for this apparatus). The stage takes the full card width, ≈ 648 px at 704 (≈ 656 at 1024); whatever §4 places in a left, right, side or bubble column stays side by side inside the stage when the activity draws it, while the shell's bubble, keypad and Check sit under the stage. Sizes written for a wider stage fit the 648 px by closing margins and gaps first; no picture drops below 96 px, no tap below 44, no data mark or grid cell below 40.

**At 704 px:**
- **The picture** — top-right of the stage as the "far-away" thing: the library picture **144 px** on a round island of pale blue (a circle 170 px, `#DCEFF5`, ink outline) — tap = the word (TTS bonus).
- **The telescope** — lies across the stage at mid-height, pointing up-right at a 6° angle toward the island. Eyepiece end left: a short dark cap 46 × 50. **Main tube** 120 × 58 px. **Segments** — every segment is the SAME size, 84 × 52 px (a real telescope tapers, but a taper would show the order of the syllables, so this one does not), brass `#D7A84B`→`#B8862F`, 3 px ink outline, with a ring band at the outer end where the syllable is engraved (Nunito ExtraBold 26 px, ink `#4A3412`). Lens cap at the far end: a 20 × 60 glass disk with a highlight. Fully extended (4 segments) the telescope is 120 + 4·84 + 20 = 476 px; the stage keeps it inside 480 by starting it 2 px from the left edge.
- **The pull handle** — the lens cap is the handle (44 × 64 hit area).
- **The view** — on Check a circle 220 px (black ring 10 px) swings in over the island, showing the picture at 190 px: sharp, or with CSS blur 7 px (too few: blur + picture shifted 10 px left; too many: blur + picture shrunk 85 % — "too short" and "too long" look different).
- **The rack** (Levels 2/3) — a wooden rack under the telescope (470 × 96) holding loose segments with their syllables (84 × 52 each), shuffled.
- **The logbook** — a cream strip 470 × 34 at the top of the stage; each spotted word is inked as a tiny drawn spyglass (geometry) + the word (14 px) + one dot per syllable.
- **Task line** above (≤ 24 px); **bubble** in the right column; **Check** labelled by the shell.

**At 360 px** (stacked): logbook strip (26 px) · island with picture **96 px** (centred, top) · telescope 330 px long at max (main tube 74 × 46, segments 62 × 42, syllable 20 px), lying flat (no angle) · rack 336 × 84 (segments in two rows if 4+decoy) · view circle 200 px overlays the island area · bubble · Check. Check bottom ≤ 688 at 360 × 740; at 320 × 640 the logbook hides and segments are 56 × 40 → Check ≤ 610.

**Library pictures** (theme JSON checked, da label = word, `policy_managed:false`): animals/fish, rabbit (ka-nin via easter/bunny), panda, dolphin, zebra · miscellaneous/house · around the house/telephone, lamp · fruits/banana (At the Supermarket/banana) · hospital/ambulance · zoo animals/gorilla · vehicles/motorcycle, tractor · animals/penguin · christmas/angel, bell · Things That Fly/balloon · spring/bicycle · clothing/dress · toys/kite · beach/pelican · music/xylophone, drum · birds 2/parrot · accessories/belt · vegetables/radish · around the house/bathtub, fridge · clothing/raincoat · forest creatures/grasshopper · around the house/armchair. Contact sheets seen: animals, farm animals, christmas, toys, beach, weather.

## 5. The hand
- **Pull out (Level 1):** drag the lens cap outward (right) — the telescope extends in clicks; each 84 px of drag pulls out one segment (snap, 140 ms, *klik* — a short low wooden-metal tick), max 4. Or tap the lens cap: one segment out. Keyboard: → pulls one, ← pushes one in.
- **Push in:** drag the cap left, or tap a segment → that segment and all beyond it slide in (180 ms, *thunk*).
- **Fit segments (Level 2):** drag a segment from the rack onto the telescope's front end → it slides onto the tube and becomes the next segment out (200 ms). Drag a fitted segment back to the rack to remove it (the ones beyond it close up). Keyboard: Tab through rack segments, Enter fits, Backspace removes the outermost.
- **Fill the gap (Level 3):** the telescope stands built with one empty segment (a hollow ring, dashed outline). Drag a segment from the rack (3 candidates) into the hollow.
- **Kig! = Check.**
- **Tap a segment with a syllable** → it is spoken (TTS bonus) and its ring glints.

## 6. The rounds
Order-only reshuffle per pass; never the same order twice in a row.

**Level 1 — Træk kikkerten ud (pull one segment per syllable), 10 rounds.** The telescope starts collapsed (0 segments out) every round.

| # | picture | word | syllables | count |
|---|---|---|---|---|
| 1 | animals/fish | fisk | fisk | 1 |
| 2 | At the Supermarket/banana | banan | ba·nan | 2 |
| 3 | around the house/armchair | lænestol | læ·ne·stol | 3 |
| 4 | miscellaneous/house | hus | hus | 1 |
| 5 | easter/bunny | kanin | ka·nin | 2 |
| 6 | around the house/telephone | telefon | te·le·fon | 3 |
| 7 | hospital/ambulance | ambulance | am·bu·lan·ce | 4 |
| 8 | animals/penguin | pingvin | ping·vin | 2 |
| 9 | zoo animals/gorilla | gorilla | go·ril·la | 3 |
| 10 | vehicles/motorcycle | motorcykel | mo·tor·cy·kel | 4 |

Counts: 1 ×2, 2 ×3, 3 ×3, 4 ×2 — "always 2" and "always 3" each solve 3/10.

**Level 2 — Byg kikkerten (fit the syllable segments in order), 10 rounds.** Rack holds the word's segments shuffled (never in word order); setting *Ekstra ring* adds one decoy segment.

| # | picture | word | rack (shuffled) | decoy |
|---|---|---|---|---|
| 1 | christmas/angel | en·gel | gel, en | lon |
| 2 | Things That Fly/balloon | bal·lon | lon, bal | gel |
| 3 | christmas/bell | klok·ke | ke, klok | ze |
| 4 | spring/bicycle | cy·kel | kel, cy | bra |
| 5 | clothing/dress | kjo·le | le, kjo | fin |
| 6 | animals/zebra | ze·bra | bra, ze | kjo |
| 7 | animals/dolphin | del·fin | fin, del | ke |
| 8 | beach/pelican | pe·li·kan | li, kan, pe | fon |
| 9 | music/xylophone | xy·lo·fon | fon, xy, lo | kan |
| 10 | birds 2/parrot | pa·pe·gø·je | gø, je, pa, pe | lo |

Decoys are syllables of other pool words; none forms a real Danish word with the rack (gate-checked).

**Level 3 — Den manglende ring (the missing segment), 9 rounds.** Telescope built with one hollow; 3 candidates in the rack: the answer, one other syllable of the same word, one foreign.

| # | picture | shown | candidates |
|---|---|---|---|
| 1 | vehicles/tractor | trak · _ | tor, trak, ba |
| 2 | animals/panda | _ · da | pan, da, te |
| 3 | accessories/belt | bæl · _ | te, bæl, nin |
| 4 | around the house/lamp | _ · pe | lam, pe, gø |
| 5 | music/drum | trom · _ | me, trom, lan |
| 6 | vegetables/radish | ra · _ · se | di, se, kar |
| 7 | around the house/bathtub | _ · de · kar | ba, kar, li |
| 8 | around the house/fridge | kø · le · _ | skab, kø, fon |
| 9 | forest creatures/grasshopper | græs · _ · pe | hop, pe, la |

Hollow position: last ×4, first ×3, middle ×2.

**Answer position.** L1 none (the telescope starts closed; its length at rest never tells). L2: rack order is a fresh shuffle per render, never the word order; gate: "fit rack left-to-right" solves ≤ 0.25 over the level, "first rack segment is the first syllable" ≤ 0.35. L3: the answer's rack slot is balanced 3/3/3.

## 7. Check, the misses, the success
- **Check with nothing done:** L1 "Træk kikkerten ud: ét klik for hver stavelse du siger." (EN "Pull the telescope out: one click for every syllable you say.") · L2 "Sæt ringene på kikkerten." ("Fit the rings on the telescope.") · L3 "Find ringen, der mangler." ("Find the missing ring.") — no miss.
- **L1 miss 1** — the view swings in, blurred; the syllables engrave themselves onto the segments in order:
  - too few: the last segment carries two syllables squeezed together with a groove line between them, and a ghost segment outline pulses beyond the lens. "Der er to stavelser i den sidste ring. Træk én mere ud!" ("There are two syllables in the last ring. Pull one more out!")
  - too many: the extra segments stay blank and dull (no engraving), and they shiver once. "Den ring har ingen stavelse. Skub den ind!" ("That ring has no syllable. Push it in!")
  - the view stays (blurred) until the child moves the telescope; then it swings away.
- **L1 miss 2** — the word is said in syllables (TTS) while the view's blur pulses down one step per syllable; the right number of ghost segment outlines appear along the telescope. "Klap ordet og træk ét klik for hvert klap." ("Clap the word and pull one click for each clap.")
- **L2 miss 1** — the telescope collapses: segments slide into each other from the lens back to the eyepiece; every segment in its right place stays in and its ring glows; wrong segments pop back out and slide to the rack; a decoy pops out first. The view is blurred. "De lysende ringe sidder rigtigt." ("The glowing rings are in the right place.") · decoy: "Den ring hører ikke til ordet." ("That ring is not part of the word.")
- **L2 miss 2** — the first syllable's segment fits itself onto the telescope and locks (a small rivet appears on it). "Ordet begynder med {first}." ("The word starts with {first}.")
- **L3 miss 1** — the wrong candidate pops out of the hollow with a dull *dunk*; if it was a syllable of the same word, it slides to its own place and glows there for 800 ms (showing it *belongs* — just not in the hollow), then returns to the rack. "Den stavelse er med i ordet, men ikke her." ("That syllable is in the word, but not here.") / foreign: "Den stavelse er ikke med i ordet." ("That syllable is not in the word.")
- **L3 miss 2** — the word is said in syllables with a pause at the hollow; the hollow glows. "Lyt efter det, der mangler." ("Listen for what is missing.")
- **A new move takes the help away** until the next Check.
- **Success:** the view snaps sharp (blur 7 → 0 in 300 ms) with a lens twinkle; then the telescope slides shut and the syllables flow into the whole word on the main tube (500 ms); the word is inked into the logbook. Bubble: L1 "{word}: {n} stavelser — {s1} · {s2} …" ("{word}: {n} syllables — …"; n = 1: "{word}: én stavelse!") · L2/L3 "{s1} + {s2} … = {word}!" End of pass: the logbook entries twinkle in turn.

## 8. Settings
1. **Ekstra ring** (Level 2): Fra / Til — a decoy segment lies on the rack. Visible at rest.
2. **Ordet på øen** (Level 1): Nej (default) / Ja — the word is written under the picture on the island (for children who already read; the clicks still have to match the syllables, and a long written word like *ambulance* is still 4, *hus* still 1). Visible at rest. (The earlier "sharpen while pulling" setting was cut by the critic: it let a child pull until the picture went sharp, so Kig! checked nothing.)

## 9. Words (EN source; build authors da; one native da + pedagogy reviewer)
- Title frozen (da). Instrument name in aria: "Kikkerten".
- Instruction: EN "Pull the telescope out one click for every syllable. Look through it: the picture is sharp when you have it right." → da draft "Træk kikkerten ud ét klik for hver stavelse. Kig igennem: billedet er skarpt, når det passer."
- Task lines: L1 "Træk kikkerten ud: ét klik for hver stavelse." · L2 "Byg kikkerten: sæt stavelserne i rigtig rækkefølge." ("Build the telescope: the syllables in the right order.") · L3 "Hvilken ring mangler?" ("Which ring is missing?")
- Hints and celebrations: §7. Check is the shell's label; the instrument calls the act "Kig!" in its hint text only. Settings: "Ekstra ring" / "Fra" / "Til" · "Ordet på øen" / "Nej" / "Ja". Levels: "Træk ud" / "Byg kikkerten" / "Den manglende ring".
- aria: "Kikkert med {n} ringe ude" · "Ring {i}: {stavelse|tom}" · "Billedet er skarpt" / "Billedet er sløret" · "Stativ med {n} ringe".

**Locale traps (da):**
- **Spoken vs written syllables.** Danish speech swallows unstressed syllables (*klokke*, *kjole* can be heard as one beat; stød). The §20.7 ruling: orthographic syllables in K-1, phonemic divergence only from grade 2 — so the row uses ONLY the `policy_managed:false` words, where written and spoken syllables agree. The gate fails the build if any round word is `policy_managed:true`.
- **Labels must match pictures**: "klokke" = bell, "ur" = clock (fixed above). Every round word equals the picture's da label.
- **Danish letters æ ø å** in syllables (bæl·te, kø·le·skab, pa·pe·gø·je) — the engraving font must carry them at 20–26 px.
- **No articles** on the apparatus (en/et never appear), so gender is not a trap; "ring" is used for the telescope part in prose (common gender, "ringen") — the reviewer may prefer "led" or "rør".
- **Lowercase**, no capitalised nouns (Danish does not capitalise nouns).
- Word choice is Danish (not Norwegian): *cykel*, *ambulance*, *pingvin*, *telefon*; the reviewer confirms *lænestol* and *papegøje* are known to 6-year-olds.

## 10. Sound off, access, phones
- **Sound off:** Level 1 needs neither reading nor sound; focus (sharp/blurred), the two-syllable squeeze and the blank dull segment are visual. TTS is a bonus.
- **Keyboard:** §5; aria-live "Ring {i} trukket ud", "Billedet er skarpt", "Den sidste ring har to stavelser", "Ring {i} er tom".
- **Taps:** lens-cap handle 44 × 64; segments 84 × 52 (62 × 42 at 360 — tap area padded to 44 high); rack segments ≥ 62 × 44.
- **Pictures:** 144 px at 704 (view 190), 96 px at 360; the logbook holds words and dots only.
- **Reduced motion:** blur changes and zoom become instant swaps.
- **Phone:** stacked; telescope flat; at 320 the logbook hides.

## 11. Distinct from
- **Rows 44, 45, 47–50:** chop clay, roll lock dials, thread a lace, hop stones, hook a chain, topple dominoes — the telescope is the only one whose verdict is OPTICAL (focus) and whose blend is a physical collapse.
- **New #215 The Bead Rail** — beads per beat-pad tap; here the count is a length you pull, judged by focus, and Levels 2–3 build/repair the instrument itself.
- **Premium syllable-splitter** — drum + arcs; none here.
- **Registry:** no built activity uses extension or focus.

## 12. Build plan
- **Data:** `params.levels.{pull:[{noun,themeDir,word,split}], build:[{…,decoy}], gap:[{…,gapIndex,candidates}]}`; build script copies splits from `approved-words-da.json` and asserts `policy_managed === false` and picture label = word.
- **Core state** `{level, round, out:n, segments:[syllable|null], rack:[…], gapIndex, misses, viewOpen}`; functions `pull()`, `push(i)`, `fit(segId)`, `unfit(i)`, `fill(segId)`, `look()` → `{sharp, case:'short'|'long'|'order'|'decoy'|'gap', engraved:[[…]], stay:[…], popped:[…]}`.
- **Gate's own ground truth** (`verify-telescope-core.js`): typed list of the 29 round words with splits and their policy flag (all false); L1 sharp iff out = count for 1…4, short case puts all remaining syllables on the last segment, long case leaves out − count blank; telescope starts at 0 out every round; L2 sharp only for the word order; segments in right place stay, others pop; decoy always pops; never starts in word order; L3 sharp only for the answer; same-word-syllable feedback branch reached for candidate 2; slot balance; bots as §6.
- **Mutations:** the view sharpens before Kig! (live focus while pulling) · sharp with one extra segment · short case spreads syllables evenly · telescope starts extended · segments taper by index (a visual order tell) · collapse ignores order · decoy accepted · rack starts in word order · L3 accepts any syllable of the word · a `policy_managed:true` word allowed · "klokke" mapped to the clock picture · reshuffle repeats an order · miss-2 locks the last syllable instead of the first.
- **Pictures to verify on a contact sheet at build:** around the house/armchair, telephone, lamp, bathtub, fridge; hospital/ambulance; zoo animals/gorilla; vehicles/motorcycle, tractor; spring/bicycle; clothing/dress, raincoat; music/xylophone, drum; birds 2/parrot; vegetables/radish; forest creatures/grasshopper; easter/bunny.
- **Risks:** a 4-segment telescope at 320 px must fit (56 × 4 + main 64 + cap 16 = 304 ✓).
- **Blocked:** none.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — clicking a brass telescope out and seeing a picture snap into focus is a small magic trick, and the logbook fills with everything spotted.
2. **Would a teacher put it on the board?** Yes — focus is a verdict the whole class can read at once, the squeezed last ring shows exactly where a syllable was swallowed, and the pool now respects the Danish K-1 syllable policy (11 non-K-1 words and a wrong label removed).
3. **Would a parent trust it?** Yes — library pictures, calm sounds, no score, and words that are spoken the way they are written.
4. **The invention:** a telescope that must be exactly as long as the word has syllables — only then is the picture sharp.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 5→5 · correctness 4→5 · distinctness 5→5 · reality 4→5
What changed:
- Re-verified by script: all 29 round words are in `approved-words-da.json` with the shown split and WITHOUT `policy_managed` (the K-1-safe pool), and every da picture label equals the word (klokke = christmas/bell; the clock picture is *ur*).
- Cut the "Kig med det samme" setting: live focus while pulling let the child pull until sharp, so the count was never really checked. Replaced by "Ordet på øen" (word written under the picture for readers), with a mutation that fails the build if focus is ever live before Kig!.
- The logbook no longer shrinks pictures to 34 px (record ruling): each entry is a drawn spyglass mark, the word and one dot per syllable.
- Misconception 2 reworded: it claimed *klokke* is spoken as one beat, which contradicts the reason the word is allowed (spoken = written syllables); now it is "rushing the word", which the policy-safe pool makes honestly hearable.
- Kept: the telescope, the optical verdict (sharp / blurred-shifted / blurred-shrunk), the equal-size segments (no taper tell), the round tables.
- Layout check (2026-10-17): switched to stacked — split stage column is ~370 px at 704.

