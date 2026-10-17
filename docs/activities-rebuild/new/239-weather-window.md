# New 239 — The Weather Window → THE WINDOW WITH TWO GAUGES (NGSS K-ESS2-1)

## 0. Identity
- id `weather-window.play.k-ess2-1` · grade K (Week mode's forecast questions and Spell cards reach grade 1) · framework NGSS K-ESS2-1 · strand Science · files `weather-window-core.js`, `weather-window-activity.js`, `weather-window-activity.html`, `weather-window-activities.json` (scaffold `--num=239`).
- Worksheets covered: **K-356** Weather Symbols (symbol ↔ word: Sky mode, Cards = words) · **G1-362** Write the Weather Word (Sky mode, Cards = spell) · **K-211** Hot and Cold + **K-365** How Warm Is It? (Warmth mode) · **K-208** Day and Night (Day-and-night mode) · **K-364** Weather Chart Monday to Sunday + **G1-363** Read the Weekly Forecast (Week mode).
- Merged: grade-1 "The Weather Wardrobe" = Week mode's wardrobe rounds (clothes hung by the day's window, then the window opens and the weather comes in) and its forecast setting = Week mode's question rounds. The wardrobe's "library friend who is dressed" is replaced by the hook — no character is dressed or drawn (§12).
- Correctness SoT: the K-356 global bank `scripts/worksheet-gen/data/b4/weather-symbols-global.json` (the six symbols, the gear → band table, the cold/warm/hot bands; every picture opened there) + its locale banks (`data/b4/locales/weather-symbols.<loc>.json`: the weather words in 11 languages); `data/science/day-vs-night.json`, `data/science/hot-vs-cold.json` (K-208, K-211 items, re-filtered to labelled pictures).

## 1. The pitch
"The window has two gauges that do not know about each other — the sky outside and the thermometer on the frame — so a bright sunny sky can still be freezing, and you have to read both."

## 2. Why a child will want it again
A big painted window frame fills the stage, with a real-feeling sky behind the glass: on a rainy round, streaks slant down and run off the sill; on a snowy round, soft flakes drift and pile up on the sill; on a sunny round, light rays slide across the glass and make the frame glow; a storm flashes and the glass trembles. On the frame hangs an empty card holder, and down its side runs a tall thermometer whose red line the child can pull up and down with a finger like a slider — and as it moves, the sill outside changes: a snowman melts away, a coat on the hook swaps for a t-shirt, then a swimsuit. In Week mode there are seven little windows in a row like an advent strip; hang a raincoat on Wednesday's hook, open the window, and the rain bounces off it in tiny splashes — hang a t-shirt instead and the shirt darkens drop by drop. The show at the end of a round: the window throws itself open, the weather rolls through for two seconds (sun beams, a gust of flakes, a rainbow arching across), and closes with a soft latch click.

## 3. The skill and the misconception
- **Skill:** read and name the weather symbols (sunny, cloudy, rainy, stormy, snowy, rainbow) and match each to the sky it stands for; read a no-numeral thermometer as cold / warm / hot and pick clothing for it; tell day things from night things; read a seven-day chart and answer forecast questions; dress for a given day.
- **Misconceptions and the push-back (mechanism):**
  1. *"Sunny means hot."* Sky and thermometer are two separate gauges. Warmth rounds include a bright sunny sky with snow on the sill and the liquid low — a coat is what fits, and dragging the liquid up melts the snow, which contradicts the snow the child can see.
  2. *"I read the thermometer by its colour."* The liquid is always the same red, as in a real thermometer; the colours (blue · yellow · red) are painted bands on the SCALE beside it. Only the TOP of the liquid tells the band — a long red line can still end in the blue band.
  3. *"The symbol is just a picture."* The sky behind the glass is weather itself (moving rain, drifting snow, sliding light), never the symbol picture — the child carries the symbol card to it and the holder only accepts the card that stands for that sky; a wrong card hangs there next to a sky that clearly disagrees (rain streaking behind a sun card), then drops.
  4. *Wrong clothes for the day* (Week): the window opens and the weather tests the clothes — rain soaks a t-shirt, snow lands on bare hooks, the sun glints off sunglasses.

## 4. The stage
Layout `split` at ≥ 700 px (stage left 480; right column 200: the card tray / peg rail / item tray + bubble); stacked below.

**At 704 px:**
- **The window** (380 × 400, centred-left): a drawn frame (cream, 16 px, 3 px ink outline) with four panes (mullions 8 px), a sill (380 × 34) and a latch. **The sky** inside is apparatus: a colour gradient + a particle layer — sunny (blue, sliding light bars), cloudy (grey, slow soft blobs), rainy (grey, slanted streaks 2 px, splashes on the sill), stormy (dark, streaks, a white flash every 3 s), snowy (pale, drifting 4–7 px dots that settle on the sill), rainbow (light blue after rain, with the library `weather/rainbow` picture outside at 150 px).
- **The card holder** (on the frame's top bar, 120 × 120): an empty brass clip frame.
- **The thermometer** (right side of the window frame, 46 × 360): a glass tube with a bulb; the liquid is red; to its left a painted scale of three bands — blue (cold, bottom 40 %), yellow (warm, middle 30 %), red (hot, top 30 %), each with 3 tick marks, **no numerals**. A round grip (44 px) at the top of the liquid.
- **The sill and hook:** on the sill, a slot for one library picture at 110 px (the "outside thing": snowman, puddle, pool…) and on the frame's left a peg hook for one clothing picture at 110 px.
- **Day-and-night mode:** the window's panes split left/right: left half day sky (blue, light bars), right half night sky (navy, small twinkle dots); above the window a half-dial with a library sun (`weather/sunny`) on the left end and moon (`space/moon`) on the right. In this mode the window widens to 440 × 420 so each half (214 px) holds a 2 × 2 grid of slots at 100 px; things drop into a half's pane (pictures 96 px).
- **Week mode:** the stage widens to the full 680 px (bubble below). Seven windows in two rows — Monday to Thursday on top, Friday to Sunday below, read left to right like a calendar page — each 150 × 180, the weekday's short name above it (from `data/b2/calendar.js`), its pane showing its weather as a mini sky + the symbol picture at 100 px in its holder; under each window a hook. The peg rail runs under the two rows (clothes at 96 px).

**At 360 px:** stacked — task → window 300 × 320 (thermometer 36 × 280 along its right edge, grip 44 px; sill picture 80 px; hook picture 80 px) → card tray as a row of 3 cards (88 px) wrapping to 2 rows → Check. Week mode: the same two rows (4 + 3), each window 76 × 100, the symbol 64 px filling its holder (the floor is met; the weekday name sits above the frame, not inside it), the clothes on the rail 64 px. At 320: window 276 × 300, cards 72 px.

**Library pictures** (activity labels):
- Symbols (cards): `weather/sunny`, `weather/cloudy`, `weather/rainy`, **`weather/thunderstorm`** (the storm), `weather/snowflake`, `weather/rainbow` — exactly the K-356 bank's six. **Critic ruling (64 px contact sheet, 2026-10-17): `weather/stormy` does NOT read as a storm** — a red cloud with rain and a lightning bolt about 12 px tall at 64 px; next to `rainy` it reads as "red rainy", which is why the K-356 bank itself refused it ("the red misreads"). The storm card is `weather/thunderstorm` (navy cloud, big red-and-yellow bolt — unmistakable at 64 px). That file is in the library but has no entry in `mini tools/pictures/weather.json`; the build adds it to the activity picture index (the art exists, only the index line is missing) with the bank's per-locale storm word as its label. **If the index cannot take it, the storm is dropped** (five symbols; Sky rounds 5 and Week round 2 swap to rainbow / snowy) — `weather/stormy` is never used.
- Warmth sill things (one per scene): cold `winter/snowman`, `winter/icicle`, `winter/igloo`; warm — none (the warm band is shown by the clothes alone; no picture reads unambiguously "warm"); hot `summer/pool`, `summer/sandcastle`. While the child drags the liquid, the warm band shows the cold picture melting away (the snowman fades) and the sill empty.
- Clothes (hook): cold `winter/coat`, `clothing/mitten`, `weather/scarf`, `winter/earmuffs`; warm `clothing/t-shirt`, `clothing/cap`; hot `clothing/swimsuit`, `weather/sunglasses`.
- Hot/cold things (K-211, Warmth "sort" rounds): hot `summer/campfire`, `winter/fireplace`, `summer/barbecue`, `around-the-house/oven`, `around-the-house/toaster`; cold `winter/snowman`, `winter/icicle`, `winter/igloo`, `weather/snowflake`, `clothing/mitten`, `desserts-and-sweets/popsicle`.
- Day: `weather/sunny`, `farm-animals/rooster`, `weather/rainbow`, `summer/kite`, `spring/bird`, `weather/sunglasses`. Night: `space/moon`, `animals/owl`, `animals/bat`, `furniture/bed`, `shapes/star`, `camping/lantern`.
- Week wardrobe rail: `weather/raincoat`, `weather/umbrella`, `winter/coat`, `clothing/mitten`, `weather/scarf`, `clothing/t-shirt`, `clothing/swimsuit`, `weather/sunglasses`.
- **Refused:** `weather/hot` and `weather/cold` (a second smiling sun; a penguin in a hat — the bank's ruling), `weather/thermometer` (the apparatus draws it), `weather/puddle` (a pond in grass), wind (no art), pyjamas (no art), every picture with a contested day/night reading (cat, car, star-shaped toys).

**Task line** (≤ 24 px): Sky "Which card shows this weather? Hang it on the window." · Warmth (set) "Pull the thermometer to show how warm it is outside." · Warmth (dress) "The thermometer says how warm it is. Hang the right clothes." · Day-and-night "Is it a day thing or a night thing? Put it in the window." · Week (ask) "Read the week. {question}" · Week (dress) "Dress for {day}. Hang clothes, then open the window."

## 5. The hand
- **Hang a card** (Sky): drag a card from the tray to the holder; it clips in (snap 140 ms, metal click). Right → the card and the sky "agree": the sky's effect brightens once and the card's frame turns gold. Wrong → §7.
- **Pull the thermometer** (Warmth set): drag the grip; the liquid follows the finger within one frame; crossing a band edge gives a soft tick and the sill picture cross-fades with the band (cold: the snowman stands; warm: it melts away to an empty wet sill; hot: sun glare on a dry sill), and the hook's clothing swaps (coat → t-shirt → swimsuit) — the scene answers the hand live (free exploration). Release = the answer for that round (the band the liquid top is in).
- **Hang clothes** (Warmth dress): the liquid is set by the round; drag one clothing picture to the hook.
- **Sort hot/cold** (Warmth sort round set): drag a thing onto the thermometer's top half (hot) or bottom half (cold); it hangs beside the scale at its band.
- **Day and night:** drag a thing into the day or night half of the window; the half's light falls on it (a day thing in the day half gets a warm highlight; a night thing in the night half gets moon-blue rim light).
- **Week — ask:** tap a day's window (it lifts 6 px, frame glows); Check.
- **Week — dress:** drag up to two clothes from the rail to the asked day's hook; tap the latch: the little window swings open (300 ms) and its weather pours over the hook for 1.5 s.
- **Free play:** the thermometer can always be pulled between rounds; the window latch opens and closes; the sky effects play on.
- Sound (optional): rain patter, a soft wind for snow, birds for sunny, a far rumble for storm, latch click; TTS reads the task line and the weather words (5 locales).

## 6. The rounds
**Sky mode (9 rounds; 3 cards per round in the tray; each symbol is the answer at least once per pass, the 6th to 9th repeat with new decoys):**
| # | sky | cards in tray (answer ★) |
|---|---|---|
| 1 | rainy | ★rainy, sunny, snowflake |
| 2 | sunny | cloudy, ★sunny, stormy |
| 3 | snowy | rainbow, rainy, ★snowflake |
| 4 | cloudy | ★cloudy, rainbow, sunny |
| 5 | stormy | rainy, ★stormy, cloudy |
| 6 | rainbow | snowflake, sunny, ★rainbow |
| 7 | rainy | stormy, ★rainy, cloudy |
| 8 | snowy | ★snowflake, cloudy, rainbow |
| 9 | sunny | rainbow, snowflake, ★sunny |
★ in tray slot 1 ×3, 2 ×3, 3 ×3 before the reshuffle; after each per-pass reshuffle the slot is re-dealt so no slot holds ★ more than 40 % (gate). Rainy and stormy share a tray only in rounds 5 and 7, where the lightning flash is the deciding cue (a stormy sky also rains); the reviewer confirms the two words are distinct enough in every locale for Cards = words.
- **Cards = words (K-356):** the same rounds, but the tray holds WORD cards (the bank's weather words, 22 px, e.g. "rainy"); a right card shows its symbol picture faintly behind the word as it clips.
- **Cards = spell (G1-362):** the holder shows N empty letter boxes (N = the word's length in the locale) and a tile tray of the word's letters + 2 decoys (letters from the bank's other weather words); the child drops letters into boxes; Check.

**Warmth mode (9 rounds: 3 "set the thermometer", 3 "hang the clothes", 3 "hot or cold?" sorts; each band the answer 3 times):**
| # | type | given | answer |
|---|---|---|---|
| 1 | set | sky sunny + sill snowman + hook coat | cold |
| 2 | dress | liquid in warm, sky cloudy | t-shirt — rail: coat, t-shirt, swimsuit |
| 3 | sort | campfire, snowman, oven, icicle | hot, cold, hot, cold |
| 4 | set | sky sunny + sill pool + hook swimsuit | hot |
| 5 | dress | liquid in cold, sky sunny (!) | coat — rail: sunglasses, coat, t-shirt |
| 6 | sort | fireplace, igloo, toaster, snowflake | hot, cold, hot, cold |
| 7 | set | sky cloudy + hook t-shirt | warm |
| 8 | dress | liquid in hot, sky sunny | swimsuit — rail: mitten, t-shirt, swimsuit |
| 9 | sort | barbecue, mitten, popsicle, campfire | hot, cold, cold, hot |
Rounds 1 and 5 are the sunny-but-cold lures (sky sunny, answer cold). "Set" scenes never show the thermometer's answer: the liquid starts at the band edge furthest from the answer. Rail order shuffled; the right clothing sits in each rail slot equally across the pass.

**Day-and-night mode (8 rounds, 6 things per round, 3 day + 3 night):**
| # | day | night |
|---|---|---|
| 1 | sunny, rooster, kite | moon, owl, bed |
| 2 | rainbow, bird, sunglasses | bat, star, lantern |
| 3 | rooster, sunny, bird | owl, moon, bat |
| 4 | kite, rainbow, sunglasses | bed, lantern, star |
| 5 | bird, kite, rooster | moon, bat, bed |
| 6 | sunglasses, sunny, rainbow | star, owl, lantern |
| 7 | rooster, rainbow, kite | lantern, moon, owl |
| 8 | sunny, sunglasses, bird | bed, bat, star |

**Week mode (8 rounds; each round one 7-day chart, Monday-first as in K-364; symbols drawn so every question has exactly one right day):**
| # | week (Mon → Sun) | task |
|---|---|---|
| 1 | sunny, rainy, cloudy, sunny, snowy, cloudy, sunny | Which day is rainy? → Tue |
| 2 | cloudy, sunny, stormy, cloudy, rainbow, rainy, cloudy | Which day is stormy? → Wed |
| 3 | rainy, cloudy, rainy, snowy, rainy, cloudy, rainy | Which day is snowy? → Thu |
| 4 | sunny, cloudy, sunny, sunny, rainy, sunny, sunny | Dress for Friday (rainy) → raincoat or umbrella |
| 5 | snowy, snowy, cloudy, snowy, snowy, sunny, snowy | Which day has no snow and no clouds? → Sat |
| 6 | cloudy, rainy, cloudy, cloudy, cloudy, cloudy, rainbow | Which day has a rainbow? → Sun |
| 7 | rainy, snowy, rainy, rainy, cloudy, rainy, rainy | Dress for Tuesday (snowy) → coat / mitten / scarf |
| 8 | sunny, rainy, rainy, cloudy, rainy, rainy, rainy | Which day is sunny? → Mon |
The answer day is each weekday at least once across the pass. Dress rounds accept any clothing the bank's gear table maps to that weather (raincoat/umbrella for rain; coat/mitten/scarf for snow; sunglasses/t-shirt/swimsuit for sunny); one or two pieces; a piece for the wrong weather is a miss.
- **Order:** order-only reshuffle per pass (`nextTask`).

## 7. Check, the misses, the success
- **Check with nothing done** → hint, no miss: Sky "Hang a card on the window." · Warmth "Pull the red line, or hang something." · Day/night "Put each thing in a window." · Week "Tap a day."
- **Sky — miss 1:** the wrong card clips in and stays 1.5 s while the sky keeps doing its own weather right behind it (rain streaking past a sun card) — the disagreement is the lesson — then the clip opens and the card falls back to the tray · "Look outside. Does the card show that weather?" **miss 2:** the sky's effect pulses stronger and the right card in the tray gets the same effect as a faint animated edge (raindrops running down its border) · "Find the card with the same weather."
- **Warmth set — miss 1:** the liquid stays where the child left it, the sill shows that band's scene, and the original scene's key picture (the snowman / the pool) stays as a ghost beside it — the two scenes are compared · "Look at the {sill thing}. Is it that warm?" **miss 2:** the right band on the scale glows · "The line should end in the glowing part."
- **Warmth dress — miss 1:** the clothing hangs; the liquid top pulses and a small matching scene appears on the sill (snow for cold, sun glare for hot) · "Look where the red line ends." **miss 2:** the right clothing on the rail lifts.
- **Warmth sort — miss 1:** the thing slides along the scale to the other band and back · "Is it hot or cold?" **miss 2:** its band glows.
- **Day/night — miss 1:** the thing slides to the other half · "Do we see it in the day, or at night?" **miss 2:** the sun or the moon on the dial points at its half.
- **Week ask — miss 1:** the tapped window's symbol enlarges for 1 s beside the question card · "Is that the weather the question asks for?" **miss 2:** the right window's frame glows.
- **Week dress — miss 1:** the window opens and the weather tests the clothes: rain soaks a t-shirt (it darkens with drops), snow lands on a swimsuit, the sun makes a coat steam faintly (warm) · "What would keep you dry / warm / cool?" (stored per weather) **miss 2:** the right clothes on the rail lift and glow.
- A new move takes the help away until the next Check.
- **Success:** the window opens and its weather sweeps through (1.8 s), then the latch clicks shut. Bubble: Sky "Yes — it is {weather} today!" · Warmth set "It is {band} outside." · dress "Good choice for a {band} day!" · Day/night "Day things in the day, night things at night." · Week "Yes — {day} is {weather}." / "Ready for {day}!"

## 8. Settings
1. **Mode:** sky symbols · how warm? · day and night · the week — each changes the board at rest (one window + card holder · window with thermometer and sill · split day/night pane · seven windows).
2. **Cards** (Sky mode): pictures · words · spell — visible at rest (symbol cards · word cards · empty letter boxes and tiles).

## 9. Words (EN source)
- title "The Weather Window" · instruction "Read the sky and the thermometer — they are two different things — then choose the weather card, the warmth and the clothes."
- prompts (§4); question frames per round stored whole: "Which day is rainy?" · "Which day is stormy?" · "Which day is snowy?" · "Which day has no snow and no clouds?" · "Which day has a rainbow?" · "Which day is sunny?" · "Dress for {day}. Hang clothes, then open the window."
- hints and celebrations: all §7 strings, with weather adjectives and band words stored per value per locale (no assembled agreement).
- weather words: from the bank's locale blocks (sunny / cloudy / rainy / stormy / snowy / rainbow).
- band words: cold · warm · hot.
- settings: setMode "Mode" · modeSky "Sky symbols" · modeWarm "How warm?" · modeDay "Day and night" · modeWeek "The week" · setCards "Cards" · cardsPictures "Pictures" · cardsWords "Words" · cardsSpell "Spell".
- **Locale traps:**
  - **No numerals on the thermometer** — °C vs °F never arises.
  - **Weekdays:** short names and Monday-first order from `calendar.js` for all 11 (K-364 is Monday-to-Sunday in every locale; en-US calendars start Sunday, but the worksheet's chart is Monday-first and so is this); names are lower-case in fr/es/it/pt/nl/sv/da/no/fi.
  - **Weather words are not one part of speech everywhere:** en "sunny/rainy" (adjectives) vs de "sonnig/regnerisch" vs fr "ensoleillé / pluvieux" (agreeing adjectives — "il fait beau / il pleut" is how a child says it) vs fi "aurinkoinen / sateinen". The bank's words (already reviewed per locale) are used on cards; sentences like "Yes — it is {weather} today!" are stored per weather per locale (fr "Oui, il pleut aujourd'hui !"), never assembled.
  - **Spell mode:** letters per locale incl. ä/ö/å/æ/ø/é/ü; the bank flags `vocabNounNever` (raindrop, snowflake, thunderstorm) — spell uses the bank's weather word, never the vocab noun. Words longer than 9 letters (de "regnerisch" 10, fi "aurinkoinen" 11) use smaller boxes (34 px) at 360 or are refused for spell by the reviewer.
  - **nl band words (critic ruling): "koud · warm · heet"** — three distinct words, exactly the K-365 bank's nl `bandWords`. "Lauw" is refused (it means lukewarm, for water, never for the weather). The 2-group K-211 bank pairs "Warm / Koud", which is natural Dutch for a two-way sort; on the three-band scale "warm" names only the middle band and HOT is always "heet".
  - Symbol conventions: all 11 countries' school charts use sun/cloud/rain/snow/lightning; the reviewer checks the rainbow is a chart symbol in each.

## 10. Sound off, access, phones
- Sound off: every sky is moving weather; the card-sky disagreement is visible; the thermometer is height; clothes visibly get wet.
- Keyboard: Sky — Tab to a card, Enter hangs it; Warmth — ↑ / ↓ move the liquid one tick, Enter commits; Day/night — Tab to a thing, ← / → choose half, Enter; Week — ← / → between windows, Enter; Space opens the latch.
- aria-live: "Sky: it is raining." · "Thermometer: cold." · "Wednesday: the raincoat kept dry."
- Taps: cards 88 px (72 at 320); thermometer grip 44 px; window halves are big targets; each week window ≥ 76 × 96; rail clothes 64 px; Check 48 px.
- Pictures: sill/hook 110 px, cards 96+, day/night things 96, week symbols 100 at 704; ≥ 64 px everywhere at 360 (week symbols 64 px).
- Fold at 360 × 740: header 56 + task 52 + window 320 + tray 2 × 96 + Check 56 = 676 px. At 320 × 640: window 300, tray 2 × 80 → 624 px. Week at 360: header 56 + task 52 + two rows of windows (2 × 124) + rail (2 × 72) + Check 56 = 556 px.

## 11. Distinct from
- **calendar-wall** tool (a weather graph tally for morning meeting) — no window, no thermometer, no card matching.
- **The Season Wheel** (238, same batch) — the year's cycle; this is today's sky and warmth.
- **The Moon Between Every Day** (new 210) — the week's night/day rhythm on a necklace; here the week is seven windows of weather to read.
- No registered invention uses two independent gauges (sky + no-numeral thermometer).

## 12. Build plan
- **Model (core):** `state = { mode, cards, round, sky, holder:null, liquidY:0..1, band(), sill, hook, halves:{day:[],night:[]}, week:[7 weather], tapped, hooks:{day:[]} }`. `hang(card)` → right iff `card === round.sky` (words: `card.word === bank.word[sky]`); `setLiquid(y)` → band by edges 0.40 / 0.70; `hangClothes(id)` → right iff `GEAR_BAND[id] === round.band` (from the bank's gear table extended with coat/mitten/swimsuit/cap); `dropHalf(id, half)`; `tapDay(i)`; `dress(day, ids)` → right iff every id fits the weather; `nextTask`.
- **Gate ground truth (`verify-weather-window-core.js`, own tables):** every round has exactly one right answer under its own table (incl. Week questions: exactly one day matches); the sunny-cold lures exist (≥ 2 per Warmth pass); each band answer 3×; each symbol answer ≥ 1× per pass; ★ slot ≤ 40 %; every picture labelled and not refused; Spell letters = the bank word's letters + 2 decoys from other weather words, never forming a second weather word; weekday names from calendar.js; liquid start never inside the answer band.
- **Mutations:** `weather/stormy` admitted as the storm card · nl hot band word = "warm" · card accepted regardless of sky · liquid colour changes with band (the colour tell) · band edges wrong · sunny-cold lure removed · Week question with two right days · dress accepts swimsuit for snow · day thing accepted in night half · ★ always slot 1 · weekday order Sunday-first · spell tiles with no decoys · fixed shuffle · liquid starts in the answer band.
- **Pictures to re-open at 64 px:** `weather/thunderstorm` once indexed (checked on the critic's 64 px sheet: reads as a storm), `shapes/star` (reads as a night star, not a toy), `camping/lantern`, `farm-animals/rooster`, `furniture/bed`.
- **BLOCKED (partial):** wind has no art (no wind rounds, by design); pyjamas absent (bed stands in for night). **Needed:** the activity-index line for `weather/thunderstorm` (the storm card — fallback: five symbols, never `stormy`). Wanted: `weather/rain_boots`.

## 13. The four questions
1. **Choose it again?** Weather that really moves behind glass, a thermometer you pull that melts a snowman, windows that open and soak a t-shirt — yes.
2. **On the board?** The sunny-but-freezing round is the discussion every K weather unit wants; the week strip is the K-364 chart alive.
3. **Parent trust?** No numerals to confuse, reviewed weather words, calm motion, nothing scored.
4. **The invention:** "A window with two gauges that do not know about each other — the sky and the thermometer — so the child has to read both, and the weather itself tests the clothes."

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 4→5 · distinctness 5→5 · reality 3→5
What changed:
- **Storm ruling:** `weather/stormy` does not read as a storm at 64 px (a red cloud, a ~12 px bolt — the K-356 bank refused it for the same reason). The storm card is `weather/thunderstorm`, which needs only an activity-index line (the art exists); fallback = five symbols, never `stormy`. Two mutations added (stormy admitted; nl hot = "warm").
- **nl band words ruled: koud · warm · heet** (the K-365 bank's own words; "lauw" refused).
- **Picture floor:** week symbols were 64 px at 704 and 56 px at 360, day/night things 88 px. Week mode is now two calendar rows at both widths (symbols 100 / 64 px), the day/night window widens so things sit at 96 px.
- Warmth round 2 simplified to one right clothing on the rail (the cap/t-shirt either-or was two answers).
- Checked: every Week question has exactly one matching day and each weekday is the answer once (Tue twice); Sky uses each symbol ≥ 1× per pass; the Warmth sunny-but-cold lures are rounds 1 and 5; the hot/cold, day/night and clothing items agree with the K-211, K-208, K-207 and K-365 banks (gear: scarf cold, t-shirt warm, sunglasses hot).
