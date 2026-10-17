# Row 134 — The Stove Knob (L.1.5.d)

## 0. Identity
- id `shades.pick.l-1-5-d` (KEPT) · grade 1 · Common Core L.1.5.d (distinguish shades of meaning among verbs differing in manner and adjectives differing in intensity; also L.2.5.b) · strand Language · page title (frozen) "Pesto's Soup Stall — Shades of Meaning (Grade 1)" · own files `mini tools/stove-knob-core.js`, `stove-knob-activity.js`, `stove-knob-activity.html`; manifest row stays in `shades-activities.json` (id, en slug, page_title, page_intro unchanged), `tool` repointed. The ten other locales get new slug/title/intro at build.
- worksheets it covers: **G1-396** Shades of Meaning: From a Little to a Lot · **G2-358** Synonyms: Circle the Word That Means the Same · **G2-373** Synonym Pairs: Match the Words That Mean the Same · **G3-397** Word Fields: Words for Go and Look (the "tell close words apart: stroll/dash, glance/stare" half; the odd-one-out half lives in row 131).
- what the old activity did: Pesto the parrot's soup stall — read a customer's sentence and pick the right-strength word; order a ladder; find the word between two; pick a way to look. **Kept:** the four task shapes (pick, order, between, manner→now split into speed/time ladders); the word sets temp, wet, loud, size and the six pick sentences (soup/towel/voice × low/high) with their required strengths; the frozen intro's promise ("warm, toasty, hot, and scalding all mean heat — but the shade matters"). **Fixed:** the "loud" set ranked *quiet* as a shade of loud — it is the opposite end, not a shade; the set becomes the voice ladder whisper · talk · shout. The "look" set (stare/peek/glare/glance) was marked non-orderable and mixed four different manners (time, secrecy, anger) — peek and glare leave (they differ by feeling, not by strength, and a strength knob would teach a false order); glance · look · stare stay as a time ladder. "scalding" moves to the 4-word setting (above grade 1 as a default word).

## 1. The pitch
"Pesto's stove knob has a word on every click — turn it up and the flame grows click by click, and the soup's colour deepens with each word's real strength — so the words are in the right order only when the flame and the soup rise together."

## 2. Why a child will want it again (the fun)
- **A knob is irresistible.** A big round knob with a satisfying click at every notch; the flame under the pot grows one tongue per click (drawn geometry, a gentle flicker), the soup in the pot bubbles faster and its colour deepens. Turning it back down calms everything. Children turn it just to watch.
- **When the words are out of order, the soup lurches.** The flame keeps growing steadily, but at the misplaced word the soup's colour jumps paler (or leaps darker) and the bubbles stutter — a visible "hiccup" in the pot. Swap the two word tiles and the turn becomes smooth: flame and soup in step, from a little to a lot.
- **Serving is the payoff** (Level 2): pick the word the customer's sentence asks for, turn the knob to it, ladle — a bowl slides along the counter to the order ticket, and the ticket gets a coral tick stamp.
- **End-of-round show:** a correct ladder makes the knob spin once all the way up and back down while the soup goes pale→deep→pale like a breath; the ladder's words are written onto a little menu card that pins to the stall's menu board (a growing menu of word ladders).
- No timer, score, streak or lives.

## 3. The skill and the misconception
- **Skill:** order close words from weakest to strongest (G1-396); choose the word of exactly the strength a context asks for (L.1.5.d); find the word between two others; tell words that mean the SAME (synonyms, G2-358/373 — same strength, same click) from words that are merely close; tell verbs of going and looking apart by how fast / how long (G3-397: stroll/dash, glance/stare).
- **Misconception 1 — "close words all mean the same"** (warm = hot = boiling). Pushback: each word's soup colour is different; placing hot on the warm click makes the soup jump.
- **Misconception 2 — "the longer/stranger word is the strongest"** (picking "toasty" as stronger than "hot"). Pushback: the soup is driven by meaning, not by word length — toasty is a gentle colour.
- **Misconception 3 — "synonyms are any related words"** (big = huge). Pushback (Level 3): twins share one click; huge placed beside big makes the soup jump when the knob rests on that click (two different strengths in one notch).
- **Misconception 4 — "opposite end = a shade"** (quiet as a shade of loud). Pushback: removed from the data (the fix above); the voice ladder starts at whisper.

## 4. The stage
**Layout: stacked at every width** (layout check 2026-10-17: no `layout:'split'` — its stage column is only ≈ 370 px at 704, too narrow for this apparatus). The stage takes the full card width, ≈ 648 px at 704 (≈ 656 at 1024); whatever §4 places in a left, right, side or bubble column stays side by side inside the stage when the activity draws it, while the shell's bubble, keypad and Check sit under the stage. Sizes written for a wider stage fit the 648 px by closing margins and gaps first; no picture drops below 96 px, no tap below 44, no data mark or grid cell below 40.

**At 704 px:**
- **The pot** (centre-top, 240 × 170): the library picture kitchen-tools/pot at 200 px wide (seen: a red-brown pot with an open dark top), with a drawn **soup surface** ellipse clipped to the pot's opening (measured from the picture's ink box) whose fill runs a per-ladder colour scale from pale to deep (heat `#F8E1B4` → `#E2574B`; cold `#F0F7FC` → `#5E8FC2`; wet `#E3F1FB` → `#2D6FB3`; voice and said `#EEE8F7` → `#6B3FA0`; size `#E8F4DC` → `#4E8A2E`; speed `#FFF0D9` → `#D9822B`; time `#E6F4F1` → `#146B5E`) and drawn bubbles (circles 4–10 px) whose rise speed follows the word's strength. **No sign or icon above the pot** — the ladder is named by its own words on the tiles; an icon would have been a 40 px library picture (below the 96/64 px floor), and a growing balloon icon for size would have answered the size ladder by itself.
- **The flame** (under the pot, drawn geometry): a row of flame tongues (teardrop shapes, `#F2784B` with a `#E8A53A` core); the number of tongues = the knob's click position (1 to 3, or 4).
- **The knob** (below the flame, 150 px diameter): drawn — a round body with a pointer notch, grip ridges; around it on a 240° arc, **3 or 4 click windows** (each 96 × 48 card slot with a dashed outline) where word tiles sit. The arc runs from bottom-left (weakest click) clockwise to bottom-right (strongest), like every real stove knob; a faint "low" small-flame mark and "high" big-flame mark are geometry glyphs, not words.
- **Word tiles** (Levels 1, 3, 4): 96 × 48 cream cards, Nunito 22 px bold (content words), waiting on a shelf under the knob in a row.
- **The order ticket** (Level 2, right of the pot, 150 × 120): a paper ticket with the customer's sentence (≤ 3 lines, 16 px) and a "keyword" or two in bold.
- **Task line** above; **bubble** right.

**At 360 px** (stacked): pot 160 px wide; flame tongues 22 px; knob 120 px with click windows 80 × 44 around it (labels 16 px — the arc keeps windows ≥ 44 px tall and never overlapping, measured for 4 clicks); shelf tiles 80 × 44 in one row (4 tiles) or two rows; ticket moves above the pot, full width, 14 px text. Serve / Check bottom ≤ 690 at 360 × 740 and ≤ 610 at 320 × 640 (at 320 the knob is 104 px and the windows 72 × 44).

Pictures (library, colour, verified on the kitchen-tools contact sheet by the critic): kitchen-tools/pot (200 / 160 px), kitchen-tools/ladle (drawn in the serve motion at 96 px), kitchen-tools/bowl (the served bowl, 96 px at 704 / 64 px at 360). Nothing else: the ladders need no pictures.

## 5. The hand
- **Drag a word tile** onto a click window (Levels 1, 3, 4); a tile dropped on an occupied window swaps. Drag back to the shelf to remove. Within 60 ms it snaps in with a paper *tick*.
- **Turn the knob**: drag around it (angle tracking, snaps to clicks with a detent *click* and a 40 ms haptic-style jolt), or tap a click window to turn straight to it, or use the arrow keys. At every click: the flame shows that many tongues (120 ms), the pointer points at that window, and **the soup takes the strength of the WORD in that window** (300 ms colour ease, bubble speed) — during the Check sweep always, and while turning only when Soup peek is on (§8; default off: before Check the soup stays plain and its bubbles follow the flame). An empty window gives no soup change (the pot simply waits, bubbles stop).
- **Serve** (Level 2, = Check): the ladle dips, a bowl slides to the ticket (500 ms).
- **Check** (Levels 1, 3, 4): the knob sweeps from the lowest click to the highest by itself (300 ms per click) while the child watches flame and soup together.
- **Free play:** between rounds the knob can be turned at will on any finished ladder from the menu board (tap a menu card to load it).

## 6. The rounds
One round = one ladder (Levels 1, 3, 4) or one order (Level 2). One right answer: the strength order per ladder is fixed in data and authored per locale.

**The ladders (EN; the strength rank is the gate's ground truth):**
| id | 3-word (default) | 4-word setting | notes |
|---|---|---|---|
| heat | warm · hot · boiling | warm · toasty · hot · scalding | kept from the old set |
| cold | cool · cold · freezing | cool · chilly · cold · freezing | |
| wet | damp · wet · soaked | (stays 3 — soaked and dripping are too close to rank) | kept |
| voice | whisper · talk · shout | whisper · talk · call · shout | "talk" (the signed bank's middle) — "say" needs an object and does not sit between whisper and shout |
| said | whispered · said · shouted | (stays 3) | G2-358 "a word for said": the speech verbs a story uses, by loudness |
| size | small · big · huge | tiny · small · big · huge | kept |
| speed (go) | stroll · run · dash | stroll · walk · run · dash | |
| time (look) | glance · look · stare | (stays 3) | |

**Level 1 — Order the ladder** (G1-396), 8 rounds = the eight ladders; tiles shuffled on the shelf (never already in order; the order on the shelf is never the reverse either, so "reverse it" is not a strategy). Right = every window holds the word of its rank.

**Level 2 — Pick the strength** (the old "pick"), 12 orders. The knob comes pre-loaded with a correct ladder; the child reads the ticket, turns to the word the sentence needs, serves.
1 heat · "Grandpa likes his soup only a little heated, so he can sip it right away." → warm (old, reworded: the old sentence said "not hot", a ladder word) · 2 heat · "This soup has bubbled on the stove all morning — it would burn your tongue!" → boiling (old; scalding in the 4-word setting) · 3 wet · "The towel only caught a little mist from the sea — just a tiny bit moist." → damp (old) · 4 wet · "The towel fell right into the pond and came out dripping everywhere!" → soaked (old) · 5 voice · "Use your softest voice so the sleeping baby does not wake up." → whisper (old) · 6 voice · "Your friend is all the way across the field — make sure she hears you!" → shout (old, reworded: "call" is a 4-word ladder word) · 7 size · "The ant is so little you can hardly see it." → small (tiny in 4-word) · 8 size · "The whale is longer than a school bus!" → huge · 9 speed · "We take our time in the park and smell every flower." → stroll · 10 speed · "The bus is leaving — go as fast as you can!" → dash · 11 time · "Her eyes go to the clock for just one second." → glance · 12 time · "His eyes stay on the fish tank for a long, long time." → stare.
Ticket words name the STRENGTH ("a tiny bit", "for just one second", "as fast as you can") without using any word of that ladder — 3- or 4-word — or a form of one ("bigger" for big); asserted per locale with a stem check.

**Level 2b — The word between** (the old "bound"), inside Level 2 as 4 more orders: the ticket says "Not as {low} as {high}, but more than {low}." → the knob has only the low and high words placed and the middle window is empty; the child drags the middle word from a shelf of 3 (the right middle + one beyond each end). 13 heat warm|boiling → hot · 14 size small|huge → big · 15 voice whisper|shout → talk · 16 cold cool|freezing → cold.

**Level 2c — Middle orders and the "said" ladder** (5 more orders, so the middle click is a real answer and G2-358's "a word for said" is covered): 17 voice · "Tell Grandma about your day in your everyday voice." → talk · 18 size · "The puppy has grown — now it fills Grandpa's whole lap." → big · 19 said · '"The baby is asleep," ___ Mia, very softly.' → whispered · 20 said · '"Please pass the bread," ___ Tom at the table.' → said · 21 said · '"Watch out for the ball!" ___ Sam across the yard.' → shouted. (The said tickets are quotes with a blank; the knob for them carries whispered · said · shouted.)

**Level 3 — Twin words** (G2-358, G2-373): the knob's clicks are **double windows** (two slots per click). Some words have a twin of the same strength (synonyms); the child places twins in the same click. 8 rounds (EN):

| # | kind | clicks (twins share a click) | candidates on the shelf |
|---|---|---|---|
| 1 | ladder | small/little · big/large · huge | small, little, big, large, huge |
| 2 | ladder | okay · glad/happy · thrilled | okay, glad, happy, thrilled |
| 3 | same | shut/close | shut, close, open |
| 4 | ladder | whisper · talk/speak · shout/yell | whisper, talk, speak, shout, yell |
| 5 | same | start/begin (one double window) | start, begin, stop |
| 6 | same | smart/clever | smart, clever, funny |
| 7 | same | fast/quick | fast, quick, slow |
| 8 | same | fix/repair | fix, repair, break |

In the "same" rounds the knob has a single double window holding the target word; the right twin joins it; a wrong candidate placed there makes the soup jump (an off-ladder word — stop, open, funny, slow, break — turns the soup grey: "not this soup"). Pairs the design ruled out: say/tell (not twins), jump/hop (hop is one foot), big/huge (different clicks — that is the lesson of round 1).
Twins are fixed per locale by the native reviewer; a twin must be a true child-level synonym (asserted: both words on the same rank in the data).

**Level 4 — Go and look** (G3-397): two knobs side by side on one stove — the "go" knob and the "look" knob, each named by its field word under the knob ("go" / "look" — the two field words the worksheet itself names; content, not decoration), 3 windows each; six tiles mixed on one shelf; the child sorts by field AND orders by strength. Go words come from {creep, stroll, walk, run, dash} ordered by speed — creep and stroll are both slow and are NEVER on one knob together (their order is a matter of opinion); tiptoe is out (it is a manner — quiet — not a speed). Look words: glance · look · stare (by how long). 7 rounds (EN), each a different go-triple with the one look ladder:
1 stroll · run · dash · 2 creep · walk · dash · 3 stroll · walk · run · 4 creep · run · dash · 5 walk · run · dash · 6 creep · walk · run · 7 stroll · walk · dash — always with glance · look · stare. A going word on the look knob turns that soup grey ("not this soup").

**Answer position:** Level 1 shelf order shuffled per render with the constraints above; the gate's bots "keep shelf order", "reverse shelf order", "shortest word first", "longest word strongest" each ≤ 1/8. Level 2 the right click's position is balanced: the 12 kept orders give rank 1 / 2 / 3 = 6 / 0 / 6; orders 13–18 are rank 2 (6); the said orders add 1 / 1 / 1 → **7 / 7 / 7 of 21**. The knob always starts at click 1, so "don't turn" wins exactly 7/21 (chance) — the gate requires ≤ 7/21.
**Order:** order-only reshuffle per pass.

## 7. Check, the misses, the success
- **Check with an empty window:** hint, no miss — the empty window pulses: "Every click needs a word."
- **Miss 1** — the sweep itself is the showing: the flame grows steadily, and at each window whose word is out of rank the soup lurches (colour jumps back or leaps, bubbles stutter 300 ms) and the knob pauses on it for half a second. Hint: "The soup jumped at {word}. Is it stronger or weaker than its neighbours?" · Level 2 wrong serve: the bowl slides to the ticket and stops short, the soup in it visibly the colour of the word served; the ticket stays text only (a colour on the ticket would give the answer). Hint: "Read the ticket again — {keyword}. Is that a little or a lot?"
- **Miss 2** — the stronger showing: beside the knob, a strip of soup-colour swatches appears in the right order (pale → deep), unlabelled, and each tile on the knob shows a dot of its own soup colour; the child matches colours to places. Level 2: the ticket's keyword glows and the knob's windows show their soup dots. Hint: "Put the pale soup at the low flame and the deep soup at the high flame."
- **A new move takes the help away** until the next Check.
- **Success:** the knob spins up and down, the soup breathes pale→deep→pale, the menu card pins to the board. Bubble: "From a little to a lot: warm, hot, boiling!" · Level 2: "Just the right strength — {word}!" · Level 3: "{a} and {b} mean the same — same click, same soup." · Level 4: "Going: stroll, run, dash. Looking: glance, look, stare."

## 8. Settings
1. **Words on the knob:** 3 (default) · 4. Visible at rest: the knob shows three or four click windows.
2. **Soup peek:** off (default) · on (practice). **Off:** while the child places and turns, the soup keeps one plain colour and its bubbles follow the FLAME (the knob is still a toy); the soup shows each word's real strength only in the Check sweep — so the order must come from reading, never from turning each tile under the pot and sorting by colour. **On** (for a first go or a pre-reader with an adult): the soup takes each word's colour as the knob reaches it. Visible at rest: a small drawn "eye" toggle on the pot rim open/closed and the soup coloured or plain. In Level 2 the knob is pre-loaded with a correct ladder, so the peek gives nothing away there and is always on.
(The shell level picker: Order the ladder / Pick the strength / Twin words / Go and look.)

## 9. Words (EN source)
- title: "Pesto's Soup Stall".
- instruction: "Put the words on Pesto's knob from a little to a lot. Turn it: the flame and the soup should grow together."
- task lines: L1 "Put the words in order, from a little to a lot." · L2 "Read the order. Turn the knob to the word it needs, then serve." · L3 "Words that mean the same share a click." · L4 "Sort the going words and the looking words onto their knobs, from a little to a lot."
- hints/celebrations: §7. Labels: "Serve", settings names.
- aria: "Knob, click {n} of {m}: {word}", "Flame: {n} of {m}", "Soup strength {n} of {m}", "Order: {sentence}".

**Locale traps:**
- **Every ladder is rebuilt per locale; ranks are a native judgement.** de warm · heiß · kochend (lauwarm below warm in 4-word); fr tiède · chaud · bouillant; es tibio · caliente · hirviendo; pt morno · quente · fervendo; it tiepido · caldo · bollente; nl lauw · warm · heet (kokend at 4; nl splits warm/heet differently from en, so the reviewer confirms); sv ljum · varm · het (kokande at 4); da lun · varm · hed/kogende; no lunken · varm · het/kokende; fi haalea · lämmin · kuuma · kiehuva (4). The gate checks only that each locale's ladder has distinct ranks and that no two adjacent words are listed as synonyms.
- **Verbs of going/looking in infinitive or base form** per locale; fi verbs in the basic -a/-ä form (kävellä · juosta · kiitää; vilkaista · katsoa · tuijottaa); fr regarder · fixer · jeter un coup d'œil (multi-word tile, fine; jeter un coup d'œil is the weakest).
- **Size words with agreement:** cards show the base/masculine form; Level 2 tickets are authored so the adjective in the sentence agrees with its noun, but the tile is never inserted into the sentence (only placed on the knob), so no agreement is generated.
- **Twins (Level 3) — SETTLED (critic), from the native-signed synonym bank** (`scripts/worksheet-gen/data/b5/locales/synonyms.<loc>.json`, the G2-358/373 bank each locale's panel already signed) — but only its TRUE twins; the bank's near-synonyms are refused, and a locale ships fewer twin rounds rather than a near-synonym. **de ships 5 twin rounds, all "same" rounds:** anfangen/beginnen (aufhören) · schließen/zumachen (öffnen) · klug/schlau (langsam) · sprechen/reden (schreien) · schmutzig/dreckig (sauber). Refused from the de bank: groß/riesig and klein/winzig (riesig and winzig are a click further — they are the de size LADDER lesson, not twins), fröhlich/glücklich, springen/hüpfen (hüpfen is a hop), schreien/brüllen (brüllen is louder), lecker/köstlich (köstlich is stronger). de has no ladder-twin rounds (no grade-1 ladder in de has two true twins on one click). Every other locale: the reviewer picks from its signed bank by the same test — the two words must be swappable in a child's sentence with no change of strength — minimum 5 rounds, else a recorded partial refusal.
- **"Said" synonyms (G2-358)**: the said-ladder is per-locale (de flüstern · sagen · rufen · schreien; fr chuchoter · dire · crier; fi kuiskata · sanoa · huutaa).
- **Colour-only meaning is never the only cue:** the soup depth is backed by the flame count and the word positions; with "only when I check" it is not shown at all — and the colour scales pass contrast checks for colour-blind viewers (luminance steps ≥ 18 % between clicks).

## 10. Sound off, access, phones
- Silent legibility: flame count, soup depth, the lurch — all visual. TTS reads tiles and tickets as a bonus.
- Keyboard: Tab to the shelf, Enter picks a tile, arrows choose a window, Enter places; on the knob, Left/Right turn one click; Enter on Check/Serve.
- aria-live: "Click 2: hot — the soup jumped" / "Flame and soup rise together".
- Taps ≥ 44 px (windows ≥ 72 × 44, tiles 80 × 44+, knob 104+ with click hit sectors ≥ 44 px along the arc).
- Pictures ≥ 96 px at 704 (pot 200), ≥ 64 px at 360 (pot 160, sign icons are decorations).
- Phone: ticket above the pot; shelf under the knob.

## 11. Distinct from
- **Row 72 The Two-Ended Rod** — opposites as the two ends of one rod, middles in a groove; here a ladder of SAME-direction words on clicks, checked by two indicators moving together (position vs. meaning), plus synonyms as shared clicks.
- **Hush Owl (premium tool)** — reacts to the room's noise; nothing about words.
- **Row 131 The Group Photo** — the word-field odd-one-out half of G3-397; here the "tell close words apart" half.
- **Row 33 The Tipping Pour / New 209 The Bet Pan** — measurement comparisons by pouring or weighing; here a knob of meanings.
- Not a reused invention: no registered design uses a knob whose flame (position) and soup (meaning) must rise together.

## 12. Build plan
- **Data:** `stove-knob-rounds.json` per locale: `ladders:{id:{words:[{text, rank}], fourWord:[…]?, icon, scale:[colours]}}`, `orders:[{ladder, sentence, keywords, answer}]`, `between:[{ladder, low, high, answer, decoys}]`, `twins:[{ladder|null, clicks:[[a,b?]…], candidates}]`, `goLook:[{go:[3], look:[3]}]`.
- **Core state** `{level, round, windows:[word|null], knob:click, served:null, misses}`; functions `place(word, window)`, `turn(click)` → `{flame:click, soup:rank(windows[click])}`, `sweep()` → `[{click, rank, lurch:bool}]`, `serve()` → ok, `isOrdered()`.
- **Gate's own ground truth** (`verify-stove-knob-core.js`): its own rank tables per ladder per locale; for every round `isOrdered` iff ranks ascend with the window index; `sweep()` reports a lurch exactly at windows whose rank ≠ index (gate recomputes); twins share a rank; no ticket contains a ladder word; between-orders' decoys lie outside the low–high range; bots within bounds; Level 4: every tile belongs to exactly one field.
- **Mutations:** soup follows the click instead of the word (no lurch ever) · flame follows the word · twins allowed on different clicks · lurch not reported at a misplaced word · a ticket containing the answer word passes · "quiet" re-admitted to the voice ladder · shelf may start already ordered · knob start position at the answer.
- **Pictures verified on contact sheets:** kitchen-tools/pot (a red-brown cooking pot, open dark top — the soup ellipse is clipped to its rim), ladle (a purple ladle), bowl (a red bowl).
- **Risks:** the soup ellipse must be fitted to the pot picture's measured rim (ink-box measure at load) — fallback: draw the soup in a separate drawn bowl shape above the pot picture if the rim cannot be measured; colour-blind contrast of the scales (asserted by luminance).
- **Blocked:** none.

## 13. The four questions
1. **Would a 5–8-year-old choose it again?** Yes — a clicking knob, a growing flame and bubbling soup is a toy, and the "lurch" when a word is in the wrong place is funny and clear.
2. **Would a teacher put it on the board?** Yes — "from a little to a lot" is G1-396 exactly, the two indicators make the class argue about whether "toasty" is hotter than "warm", and synonyms sharing a click is a crisp picture of "means the same".
3. **Would a parent trust it?** Yes — library pictures, calm motion, no scores, ladders written by native speakers.
4. **The invention:** a stove knob with a word on every click — the flame follows the click, the soup follows the word, and the order is right when they rise together.

## 14. Critic review (2026-10-17)
Scores before → after: invention 3→5 · fun 5→5 · completeness 4→5 · correctness 3→5 · distinctness 5→5 · reality 3→5
What changed:
- The invention leaked its own answer: with soup colours on by default, a child could turn each tile under the pot and sort by colour without reading a word. Default is now "Soup peek: off" — the soup follows the flame while the child works and shows each word's real strength only in the Check sweep (the lurch is still the showing); peek is a practice setting.
- Level 2's position claim (5/2/5) was false: the 12 orders were 6/0/6 and "don't turn" won 6/16. Two middle orders (talk, big) and three "said" orders bring it to 7/7/7 of 21 — "don't turn" is exactly chance.
- G2-358's "a synonym for said" was a false pair (said/spoke). It is now a real "said" ladder (whispered · said · shouted) with three quote tickets. The voice ladder's middle is "talk" (the signed bank's word), not "say".
- Level 3: "walk · quick/fast · dash" mixed verbs and adjectives, big/large repeated round 1 — replaced with shut/close, fast/quick, fix/repair, talk/speak; Level 4 dropped "tiptoe" (a manner, not a speed) and never puts creep beside stroll.
- de twins SETTLED from the native-signed G2-358 bank, true twins only: 5 "same" rounds; groß/riesig, klein/winzig, fröhlich/glücklich, springen/hüpfen, schreien/brüllen, lecker/köstlich refused as near-synonyms.
- The 40 px ladder icons (and the self-answering growing balloon) are removed; the only pictures are the pot, ladle and bowl.
- Layout check (2026-10-17): switched to stacked — split stage column is ~370 px at 704.
