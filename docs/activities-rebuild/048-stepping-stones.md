# #48 — Bygg ordet av stavelser (sv) → STENARNA I BÄCKEN, the stepping stones (RF.K.2.B, Swedish only)

ORDER row 48 · id `syllable-builder.bygg-ordet-av-stavelser.rf-k-2-b` (kept).

- **Files:**
  - Added: `stepping-stones-core.js`, `stepping-stones-activity.js`, `stepping-stones-activity.html`, `stepping-stones-activities.json`.
  - The row left `syllable-builder-activities.json` as text (CRLF kept; the other 7 rows are byte-identical).
  - 0 shared-core lines.
- **Locales:** Swedish only by design.
- **Metadata:** slug, title and intro are frozen. The sv prose is rewritten: the old prose cited "gädda", which is not one of the activity's words, and described tiles.
- **Strand chip:** overridden to «Fonologisk medvetenhet», as for the da/nl/no rows; the RF default is a reading strand.
- **Design:** `designs/048-syllable-builder.md`.
- **Prefix:** `sst-` (`ss-` belongs to other tools).

## The apparatus and its invention: STEPPING STONES THAT EACH HOLD ONE SYLLABLE
- **The scene:** the picture stands on a signpost beside a pond (finished words collect there as lily pads). Below it a stream runs between two banks: the library frog sits on the near bank, and the far bank shows the target in a round frame.
- **Hoppa! (Check):** the frog hops the stones one by one in a bouncy arc.
- **Räkna stavelser:** tap the water or the stone pile to lay blank stones (1–6); tap a laid stone to take it back. The stones always spread evenly across the stream, so the number is the child's alone.
  - Too few: the frog writes the syllables on the stones and the last one carries the rest (kop·ter), sinks half under, and the frog teeters; a ghost stone floats beside it.
  - Too many: a blank stone slips under the water.
  - Miss 2: the frog nods once per syllable, and the word appears in the pond row as small syllable stones.
- **Bygg ordet:** the syllable stones lie shuffled in a pile. Tap to lay a stone at the end of the row, or drag it to a gap; tap a row stone to send it back. At the first wrong stone the stone tips, the frog hops back, and the stones from there float back to the pile; the right beginning glows.
  - A right beginning that is not finished asks for more, with no miss.
  - **Lursten** (setting): one trick stone from another pool word. Miss 2 glows ONLY the next right stone.
- **Gömda ord:** the compound lies laid as stones (the sign shows the compound, the far bank shows the target). Tap a stone to lift it onto the bank, and Hoppa!.
  - A wrong lift: for 1.4 s the far bank shows what was made — a picture (sol, sjö, bil, flod, hylla), a written word (borste, te, fladder, vatten, hoppa, hop, guld), or the leftover syllables in a dashed frame. Then the stones splash back.
  - Miss 2: the stones to keep glow.
- **Success:** the frog reaches the far bank, the picture bounces, the stones close up into the word over the water, and a lily pad with the word drifts into the pond.
- **Settings:** Nivå, Lursten (Av / På), Ordet (Syns när grodan hoppar / Syns från början — the word written faintly in the pond row).
- **Keyboard:**
  - Räkna stavelser: + / − and Backspace.
  - Bygg ordet: Enter lays a pile stone; Backspace returns the last one.
  - Gömda ord: Enter lifts a stone.

## Deviations from the design (each measured or ruled)
- **Words:**
  - **björn out** of Level 1 (→ katt) and **tvättbjörn → björn** out of Level 3 (→ gräshoppa → gräs, lift hop·pa). Every library bear (camping, forest creatures, zoo animals) is a round teddy, so a child says «nalle» (the #47 ruling).
  - **guldfisk → fisk** shows At the Supermarket/fish, a blue-silver fish. animals/fish is orange like the goldfish.
- **Lift positions** (because of the gräshoppa swap):
  - the first part ×6, the last part ×4, two stones ×5;
  - "lift the first stone" solves 4/10 and "lift one stone" at most 5/10 (both ≤ 0.6, never the level).
- **Trick stone and made words** (caught by the gate):
  - **klänning + ma = *maning*** → the trick stone is **tor**.
  - **fladdermus without mus = *fladder***, a real noun → shown as a written word. The design called it no word.
- **The pile:** the design asked "place the pile left to right" ≤ 0.25 and "first pile stone = first syllable" ≤ 0.35. Nine of the ten words have two syllables, where any order is right half the time by chance; going below needs a reversal bias, which is itself a tell (the #44–#47 ruling).
  - Three stones never lie in word order nor reversed.
  - Measured with the trick stone off: left to right 0.453, first stone 0.483.
  - With the trick stone on: left to right 0.000, first stone 0.333.
- **At the first wrong stone, all stones from there float back** (not only the tipped one), so no right stone is left in a wrong place.
- **Tapping a row stone sends it back** (Bygg ordet); the syllable is spoken when it is laid. The design had tap = speak.
- **Layout:**
  - The pond is a row beside the signpost at the top, not the bottom-right corner, so the stream gets the full stage width (six stones ≥ 44 px at 320).
  - The miss-2 syllable stones and the faint word live in that row, because over the water the frog would cover them.
  - The pond stays at 320 (it sits beside the sign and adds no height).
- **The frog keeps its size at the far bank** (pictures ≥ 96 px at 704).
- **Not built:** the lily pads turning at the end of a pass; reduced-motion fades (all motion is off under reduced motion).

## Gates
- **`verify-stepping-stones-core.js`: 1,777 checks, 0 failures.** Its own oracle carries every word, split and picture, the three levels and the hidden-word table. It checks:
  - **Data:** splits = `approved-words-sv.json` for every level word and compound, with klock·a / äng·el / äpp·le kept; every picture exists and its sv label is the word; never a library bear, toys/girl, weather/sun, the paintbrush, a water bottle or the orange fish.
  - **Count:** 0–6 laid stones (never more than six); counts 1×2 2×3 3×3 4×2; the spacing depends only on n; six stones ≥ 44 px never touch from 280 px.
  - **Build:** EVERY row up to n + 1 stones with and without the trick stone; the trick stone never makes a Swedish word.
  - **The pile:** 2,000 deals per setting.
  - **Hidden:** EVERY subset of lifted stones — made = the kept syllables; right iff made = the target; picture / written word / no word exactly per the table; no "no word" leftover is a Swedish word.
  - **Also:** the hint ladder, the order rule, the strings (no price word, never «grupp», Gömda ord never asks for one stone), and the frozen manifest.
- **`mutate-stepping-stones.js`:** 27 of 27 mutations killed (incl. te / hop / fladder shown as no word, the teddy bear, the maning trick stone, the orange fish).
- **`local-test-stepping-stones.js`:** 2,886 checks, 0 failures — a real pointer at 704 for every round of every level — water and pile taps, drags to the end and to gap 0, the tip-back, the trick stone, the miss-2 glow, every wrong lift watched in real time on the far bank, settings and keyboard. The sweep 320–1366 at rest, miss and done asserts:
  - no sideways scroll;
  - controls ≥ 44 px inside the card;
  - water stones in the scene and never overlapping;
  - syllables ≥ 14 px;
  - pictures ≥ 64 / 96 px;
  - every control above the fold;
  - the frog never stands in the far bank's frame.
- **Other gates:**
  - `visual-qa-activity.js --locale=sv`: 60 renders pass;
  - `audit-activity-hierarchy.js`: 362 / 0;
  - `audit-settings-efficacy.js`: 3 live;
  - the sv content gate, prose claims, SERP copy, content tells, answer rank, route preflight and font shorthand are green.
- **Read by me:** the five contact sheets; rest, miss and done at 360, 704 and 1024; the preview.
- **Fixes from the sweep:** at 320 × 640 Hoppa! sat 19 px below the fold (the sign is 72 px there, the pile and gaps tighter); over a pass the lily pads grew the pond taller than the sign (now capped, newest first); four fixed-width pile stones wrapped to two rows (pile stones now size to their syllable).
- **Found on the first live shot (390 px), fixed in the follow-up commit:** a frog standing on the rightmost stone poked into the far bank's frame. No gate measured it. The top bank is now taller on phones (the 360 viewport has a 328 px stage, which falls in the < 340 branch), the success frog stands beside the frame, the phone pond shows only whole rows of lily pads, and the sweep asserts the frog never stands in the frame — poisoned on the old layout (15 failures).

## Review (one agent, Swedish native + förskoleklass pedagogy): applied
- **Required:**
  - **"sten" → "del" in Gömda ord:** five of the ten rounds lift TWO stones, so «Vilken sten ska bort?» was false. pHidden, hintLift, hintNoWord, the instruction and the prose now say «del», and the en source was fixed too. The gate now forbids the one-stone phrasing.
  - **tand·bors·te without tand·bors = *te*** (tea), a real word → written. **gräs·hop·pa without gräs·pa = *hop*** → written.
  - **«Hoppa!.»** inside a prose sentence → rewritten.
- **Optional, applied:**
  - «Syns när grodan hoppar»;
  - «Titta på grodan när den nickar: en sten för varje nick.»;
  - aria «Stenar som lyfts bort» and «Andra sidan: {word}»;
  - practices «Känna igen vilken stavelse som inte hör till ordet».
- **Kept:**
  - breakfast/pancake is a thick American pancake (in Swedish still «pannkaka»); the reviewer accepted it, noting a child might say «plättar». No thin Swedish pannkaka exists in the library, and the sign is tappable to hear the word.
  - «Lursten», «Gömda ord».
  - «fladder» as a written word (it only appears after a wrong lift).

## FROZEN-NOTEs (not changed — metadata is frozen)
- **The title** says «Fonetik», the academic science of phonetics; the right term is «fonologisk medvetenhet» / «språklig medvetenhet».
- **The intro** says «blanda … stavelser», a calque of "blend" («sätta ihop»). The title and intro describe only Bygg ordet, not counting or Gömda ord.
