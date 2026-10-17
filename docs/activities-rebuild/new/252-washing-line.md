# New 252 — The Washing Line: every peg is one, every bag is a step, and a tag slides to where its number lives (2.NBT.A.2)

## 0. Identity
- **id** `washing-line.play.2-nbt-a-2` · grade 1 (taught in grade 1 in most locales; CCSS 2.NBT.A.2, with 1.NBT.A.1 counting to 120) · strand Number & Operations in Base Ten · key `washing-line` → `washing-line-core.js`, `washing-line-activity.js`, `washing-line-activity.html`, `washing-line-activities.json`. Start with `node scripts/new-activity.js --num=252`.
- **Worksheets covered:** G1-123 Count by Tens · G1-124 Count by Fives · G1-125 Count by Twos · G1-126 Count in Groups · G1-278 Number Line to 50: Counting in Fives · G1-279 Number Line to 100: Counting in Fives · G1-280 Number Line to 100: Counting in Tens · G1-281 Where on the Number Line? 0 to 120 · G1-285 Dot-to-Dot: Count by Twos (the step-chant skill) · G2-207 Count by Threes · G2-208 Count by Fours.
- **Merged:** grade-2 "The Stepping Stick — Count by 3s and 4s": the stick that must be laid end to end with no gap and no overlap *is* the bag here — each bag is exactly as long as its step and hangs only end to end after the last one; blank landing tags take a number from the keypad-like tray; the stick's miss help (see-through, dots under each stone) becomes miss 1 and miss 2.

## 1. The pitch
"A washing line with a peg for every number: each bag holds one equal group and is exactly as long as it holds — hang the next bag end to end, give its tag the running total, and a wrong tag slides along the line to the peg where its number really lives."

## 2. Why a child will want it again
- **Hanging washing is a real-world toy.** Bags swing on the line (a 1.5 s damped sway after each hang) and the line dips a little under each new bag, then lifts as the next peg takes the weight. The child drags a bag from the laundry basket and it *slides down the sagging line* by itself until it bumps the last bag — clack — no gaps, ever.
- **A tag that runs.** Give a tag the wrong number and it does not just say "no": it zips along the line like a cable car (300 ms per 10 pegs, a little whirr) and stops dangling at the peg where that number lives — the child sees "6" hanging in the middle of the third bag, not at its end. Then it floats back to the tray. Children will try a wrong number just to watch it run.
- **The chant at the end.** When the line is full, it pulls tight with a bounce, and the tags light from left to right while the totals are read as the count-by chant (2, 4, 6, 8 …), each with a soft marimba note going up a step.
- **The basket picture:** each bag, while the child holds it, shows its group as big library pictures (a pair of socks, five strawberries); once hung it shrinks onto the line and its pictures become beads in the same colours — one bead per peg — so the group and the line are the same thing.
- **Free play:** after the chant, the child can unpeg and re-hang bags, or switch to the "ticks" side and peg any number anywhere: the tag runs to its home and stays.

## 3. The skill and the misconception
- **Skill:** skip-count by 2s, 3s, 4s, 5s and 10s (2.NBT.A.2; 3s and 4s from G2-207/208 and the merged Stepping Stick), from 0 and from 25 or 50 on the number line (G1-278–281); a skip count is a running total of equal groups (G1-126).
- **Misconception 1 — counting the groups instead of the things** (2 bags of 5 → "2"). **Pushback:** the tag "2" runs back along the line to peg 2 — inside the *first* bag, two beads from the start. The child sees that 2 is not where the second bag ends.
- **Misconception 2 — adding 1 after a ten** (10, 20, 21) or an off-by-one slip (5, 10, 16). **Pushback:** every bag is exactly the step long and the line only accepts it end to end, so the next end is always one step further; "21" runs to peg 21, one peg past the end of bag 2 — hanging in thin air at the start of bag 3, clearly not at an end.
- **Misconception 3 — the number line labels the gaps / counts the first tick as 1** (ticks mode). **Pushback:** pegs are the numbers, the line starts at the post (the scale's origin — it is never asked, never a tag, never in the tray), the first step lands on {s}, and the bracket at miss 2 spans *from peg to peg*.

## 4. The stage
**At 704 px (stacked; the line is the hero):**
- **The line:** a rope across the stage (620 px), between two posts (drawn), sagging up to 18 px under weight. The rope is always drawn **two steps longer than the round's last bag** (units = (bags + 2) × s), so every numeral the tray can offer (T ± 1, T ± s, k) has a real peg to run to. Pegs (tiny clothes pegs, drawn) at every unit, numbered pegs only where a tag is printed. Unit spacing = 620 / units (2s, 8 bags → 20 units → 31 px; 5s → 50 units → 12.4 px; 10s → 100 units → 6.2 px — pegs become a ruler of ticks with every fifth tick taller).
- **Bags on the line:** a net bag (drawn mesh) exactly s units wide. While the unit is ≥ 10 px the bag holds s round beads (⌀ = 0.7 × unit) in the colour of its picture kind; below 10 px (5s on phones, all 10s lines) the beads join into a **segmented bar** — s cells, alternating full colour and a lighter tint every five — so a bag of ten still reads as two fives and nothing is drawn smaller than it can be seen. A numbered tag (44 × 36 px) hangs under each bag's *right end* by a string.
- **The laundry basket** (bottom-left, 260 × 150): the next bag waits, showing its group as library pictures at 96 px — socks: `accessories/sock` twice (the second mirrored) for 2s; `fruits/lemon` ×3 for 3s; `fruits/pear` ×4 for 4s; `fruits/strawberry` ×5 for 5s; `vegetables/carrot` ×10 (two rows of five) for 10s. When the basket holds 10 carrots at 96 px it widens to 520 × 200 and the tray tucks under it.
- **The tag tray** (bottom-right, 300 × 64): four numeral tags (44 × 44 min) — reshuffled for every tag.
- **Ticks mode** (setting): no bags, no basket — the line is a number line with pegs every step (windows listed in §6), the printed tags listed per window in §6, little arrows pointing at three empty pegs; the child gives each arrowed peg a tag. When a window starts at the origin, the left post carries the scale's 0 as small print (it is a measuring scale, like a ruler — never a tag, never in the tray, never asked).
- **Task line** (≤ 24 px), EN: **"Hang the next bag. What is the total so far?"** (ticks: **"Count on by {s}. Which number goes on each arrow?"**)
- **No words on the apparatus.**

**At 360 px:** line 336 px wide (2s: 21 px pegs; 5s: 11 px; 10s: 4.2 px → the 10s groups line shows only up to 60 units on phones and scrolls smoothly as bags are hung, the last two bags always in view); basket 328 × 120 with pictures at 64 px (the 10s basket: two rows of five at 64 px = 344 px wide, which fits 360; at 320 the basket strip scrolls sideways); tags 44 px; Check above the 740 fold. At 320: line 300 px.

## 5. The hand
- **Hang:** drag the bag from the basket onto the line anywhere to the right of the last bag (or tap the basket — the bag flies up). It is pegged at the drop point, then slides down the sagging rope to the left until it bumps the last bag (or the post at 0): 120–400 ms, a soft clatter. Dropped *over* hung bags, it rides over them and lands at the end. So the gap/overlap error cannot happen: the rope does the snapping, like the merged stick's end-to-end rule. The bag's group shrinks from pictures into beads (240 ms).
- **Tag:** an empty tag under the newest bag (and any printed-blank tag) pulses. Drag a numeral from the tray onto it (or tap the tag, then tap a numeral). Right numeral: the tag clips on with a *snip*. Wrong numeral: the tag runs along the line to its own peg (the number's home), dangles there for 900 ms with its peg glowing, then floats back to the tray. (The run is the feedback; it also steps the help ladder for that tag — see §7.) In ticks mode a tag clips wherever it is put and glows until Check.
- **Unpeg:** drag a hung bag off the line → the bags to its right slide left to close the gap (the rope again), their tags clear (their totals changed) — undo by hanging it back.
- **Ticks mode:** tags are placed on arrowed pegs the same way; on Check a wrong one runs to its home and back.
- **Sound:** pluck note per hang (pitch by total), *snip* for a tag; all optional.

## 6. The rounds
**Groups mode** — one line per round. The line comes with some bags already hung (with some tags printed), the child hangs the last two bags and fills every blank tag. Seven line templates per step (positions are bag numbers 1…n; "printed" tags show their totals; every other tag is blank; the child hangs the last two bags):
| line | bags | printed tags at | blank tags | 
|---|---|---|---|
| G1 | 6 | 1, 2, 4 | 3, 5, 6 |
| G2 | 6 | 1, 3, 4 | 2, 5, 6 |
| G3 | 6 | 2, 3, 5 | 1, 4, 6 |
| G4 | 7 | 1, 2, 3, 6 | 4, 5, 7 |
| G5 | 7 | 1, 4, 5 | 2, 3, 6, 7 |
| G6 | 8 | 1, 2, 5, 6 | 3, 4, 7, 8 |
| G7 | 8 | 2, 3, 5, 7 | 1, 4, 6, 8 |
Totals = step × bag number. Written out for **2s**: G1 2 4 _ 8 _ _ (blank 6, 10, 12) · G2 2 _ 6 8 _ _ (4, 10, 12) · G3 _ 4 6 _ 10 _ (2, 8, 12) · G4 2 4 6 _ _ 12 _ (8, 10, 14) · G5 2 _ _ 8 10 _ _ (4, 6, 12, 14) · G6 2 4 _ _ 10 12 _ _ (6, 8, 14, 16) · G7 _ 4 6 _ 10 _ 14 _ (2, 8, 12, 16). For **3s** the same templates give 3…24, **4s** 4…32, **5s** 5…40, **10s** 10…80. Blank tags are never only the last (every template has a blank in the first half).
- **Tag tray per blank tag:** the right total T, T + 1 (or T − 1, alternating), T + s or T − s, and the count-of-bags k — four distinct numbers ≥ 1. Sign rule (decided, so the builder never improvises and the right numeral is never simply the biggest): the pair of signs (±1, ±s) cycles per tag through (+1, +s), (−1, +s), (+1, −s), (−1, −s) in a per-pass shuffled order, so the right total ranks 2nd, 3rd, 3rd or 4th of the four numerals; a minus value that would be < 1 or would equal k flips to its plus value; k is always smaller than T (T = s × k, s ≥ 2), and if k still collides it is replaced by T + 2. The gate measures that T is the largest numeral on ≤ 30 % of tags per pass and never the smallest. Example, 2s bag 1: T = 2, k = 1 → tray {2, 3, 4, 1}. Reshuffled for every tag so the right numeral has no fixed place.

**Ticks mode** — pegs every step; printed tags as listed (window [printed] → three arrowed pegs to tag); the origin 0, where a window starts there, is scale print on the post, not a tag:
- **2s:** 0–20 [10, 20] → 4, 14, 18 · 0–20 [10, 20] → 6, 12, 16 · 20–40 [20, 30, 40] → 24, 32, 38 · 20–40 [20, 30, 40] → 22, 28, 36 · 50–70 [50, 60, 70] → 54, 58, 66 · 50–70 [50, 60, 70] → 52, 62, 68 · 30–50 [30, 40, 50] → 34, 42, 48
- **3s (from the origin, G2-207):** 0–30 [15, 30] → 6, 21, 27 · 3, 12, 24 · 9, 18, 24 · 12, 21, 27 · 3, 9, 18 · 6, 12, 24 · 9, 21, 27
- **4s (from the origin, G2-208):** 0–40 [20, 40] → 8, 28, 36 · 4, 16, 32 · 12, 24, 36 · 8, 16, 28 · 4, 12, 32 · 16, 24, 36 · 12, 28, 32
- **5s:** 0–50 [25, 50] → 10, 35, 45 · 0–50 [25, 50] → 5, 15, 40 · 25–75 [25, 50, 75] → 35, 40, 65 · 25–75 [25, 50, 75] → 30, 55, 70 · 50–100 [50, 75, 100] → 55, 85, 90 · 50–100 [50, 75, 100] → 60, 65, 95 · 0–100 [50, 100] → 15, 65, 95
- **10s:** 0–100 [50, 100] → 20, 70, 90 · 0–100 [50, 100] → 10, 40, 80 · 0–100 [50, 100] → 30, 60, 90 · 50–120 [50, 100, 120] → 60, 80, 110 · 50–120 [50, 100, 120] → 70, 90, 110 · 0–120 [50, 100] → 30, 80, 110 · 0–120 [50, 100] → 20, 70, 120 (G1-281: past 100)
- Tray per arrow: right number, ± 1, ± step (signs by the same cycling sign rule as the bag tags), and the *peg count* from the window start (e.g. 3 for the third peg; replaced by right + 2 if it collides) — reshuffled every arrow.
- **Answer position:** the gate measures the right numeral's tray slot over a pass (each of 4 slots 20–30 %), that blank tags/arrowed pegs are not concentrated at the line's end (≥ 1 in the first half every round), and that no two consecutive rounds use the same template.
- **Order:** order-only reshuffle per pass, never the same order twice. No 0 is ever asked (0 is always a printed peg).

## 7. Check, the misses, the success
- **Check with nothing done** → bubble "Hang the next bag from the basket." (no miss).
- **Check with a blank tag left** → that tag pulses; bubble "One tag is still empty." (no miss).
- **How misses are counted:** in bags mode a wrong numeral never clips — it runs to its home peg and comes back, which is the first teaching. A **run counts as a miss** for the help ladder on *that tag*: the first run is miss 1, the second run on the same tag is miss 2. In ticks mode tags clip where they are put (they glow until Check) and Check counts the miss as usual.
- **Miss 1** (first run on a tag / first wrong Check in ticks): the bags go see-through and the beads (or bar cells) of the newest bag get tiny numerals counted on from the last right tag (e.g. 11, 12, 13, 14, 15 after the tag 10) — the merged stick's "count its stones", but counting *on*, never from the post; in ticks mode the pegs between the last printed tag and the arrow get faint dots. EN **"Each bag holds {s}. Count on from the last tag."**
- **Miss 2** (second run / second wrong Check): a bracket is drawn between the last filled tag and the empty one with "+{s}" on it, and the right numeral's tray slot gets a soft ring. EN **"{a} and {s} more is {b}."**
- A new hang or tag takes the help away until the next run or Check.
- **Success:** the line pulls tight with a bounce (the sag disappears, 400 ms), the tags light left to right with the chant note per tag. EN **"2, 4, 6, 8, 10, 12 — six pairs of socks make 12!"** (ticks: **"25, 30, 35 … counting by 5!"**). The chant list is built from the line's tags.

## 8. Settings
1. **Count by:** 2 / 3 / 4 / 5 (default) / 10 — changes the basket's group and the bag width on the line at rest.
2. **Line:** bags (default) / ticks — bags shows the basket and the hung groups; ticks shows a bare number line with arrowed pegs.

## 9. Words (EN source)
- title: **"The Washing Line"**
- instruction: **"Hang the next bag. What is the total so far?"** · ticks: **"Count on by {s}. Which number goes on each arrow?"**
- hints: **"Hang the next bag from the basket."** · **"One tag is still empty."** · **"Each bag holds {s}. Count on from the last tag."** · **"{a} and {s} more is {b}."**
- celebrations: **"{chant} — {k} {groupPlural} make {total}!"** (groups: "pairs of socks", "bags of lemons", "bags of pears", "bags of strawberries", "bags of carrots" — whole phrases per locale) · ticks: **"{chant} … counting by {s}!"**
- settings: **"Count by"**: "2" / "3" / "4" / "5" / "10" · **"Line"**: "bags" / "ticks"
- picture labels from `image-vocabulary.js` (aria + sound-off captions: "a pair of socks", "5 strawberries").
- **Locale traps:** (a) **group phrases** need natural counted forms — "pairs of socks": de *Paar Socken* (Paar invariable after a numeral), fr *paires de chaussettes*, es *pares de calcetines* (es-MX *calcetines*), pt *pares de meias*, it *paia di calzini* (irregular plural *paia*!), nl *paar sokken* (invariable), sv *par strumpor*, da *par sokker*, no *par sokker*, fi *sukkaparia* (partitive after numeral) — author whole phrases. (b) **Count-by phrasing**: de *in Zweierschritten / Fünferschritten*, fr *de 2 en 2*, es/pt *de 2 en 2 / de 2 em 2*, it *di 2 in 2*, nl *tellen met sprongen van 2*, sv *räkna två steg i taget*, da *tælle 2 ad gangen*, no *telle med 2*, fi *luetella kahden välein / kahden hypyin*. (c) **Number line conventions:** some locales mark 0 at the left with an arrow-head only at the right (de *Zahlenstrahl*, a ray) vs a two-headed line (en/fr *droite graduée*): the line here is a rope between posts — no arrowheads, neutral. (d) **No decimal or thousands separators** occur (max 120). (e) **Fruit choice:** `fruits/plum` and `fruits/cherry` both read as apples — never used; lemon and pear are unambiguous.

## 10. Sound off, access, phones
- Legible with sound off: the sliding bag, the running tag, the glowing home peg, the bracket, the lighting chant are all visible; notes and TTS are bonus.
- Keyboard: Enter on the basket hangs the next bag; Tab to a blank tag; ←/→ choose a tray numeral; Enter clips (a wrong one runs and returns); Delete on a bag unpegs it.
- aria: line `aria-label="line: 4 bags of 5, tags 5, 10, blank, 20"`; tag `aria-label="tag under bag 3, empty"`.
- Taps: basket ≥ 120 px; tags 44 × 44; bags dragged as wholes. Pictures 96 px at 704 / 64 px at 360 in the basket; beads on the line are apparatus. Check above the fold at 360×740 and 320×640.

## 11. Distinct from
- **story-line (tool):** a clothesline of story cards pegged in order — ordering, not counting; here the rope enforces end-to-end steps and a tag finds its own peg.
- **choral-counting (tool):** a counting chart highlighted for patterns; **number-line / open-number-line (tools):** free jumps. Here the step is the bag's own length and a wrong number physically runs to where it lives.
- **#2 Ten-Shelf (built):** count by tens with egg cartons — one step size, no line.
- **New #251 Chart Patches (this batch):** counting paths painted on the chart; here the line is one-dimensional and the groups are visible.
- **New #269 Tick Comb (designed):** reading unlabelled ticks by combing from a label; here the child *makes* the steps and the line answers.

## 12. Build plan
- **Core state:** `{ step, mode:'bags'|'ticks', window:{from,to}, bags:[{n}], tags:[{bag, printed?, value?}], tray:[a,b,c,d], arrows:[peg…], placed:{peg:value} }`.
- **Functions:** `hang()` → appends a bag at the end (no position argument — the rope decides), `unpeg(i)`, `totalAt(bag)` = step × bag, `tagTry(tag, value)` → `{ok}` or `{run:homePeg(value)}` where `homePeg(v)` = v (units from 0), `trayFor(T, k)` (distinct, ≥ 1, shuffled), `check()`.
- **Gate's truth (`verify-washing-line-core.js`):** independent arithmetic: every tag's right value = step × bag (ticks: the peg's value); every template has a blank in the first half; trays contain T, a ± 1, a ± step and the count distractor, four distinct values ≥ 1; right-slot distribution 20–30 % per slot over 1,000 shuffles; the 3s/4s ticks windows start at 0; 10s windows reach 120; no line exceeds 80 units in bags mode (phones: ≤ 60 visible with scroll); chant text equals the tags.
- **Mutations:** `hang` accepts a position (a gap possible) · a bag one unit too long · wrong tag clips instead of running · run goes to the bag's index instead of the number's peg · tray without the count-of-groups distractor · right numeral always first · a template whose blanks are only at the end · 3s ticks starting at 25 · same order twice · chant from the previous line.
- **Mutations (added by the critic):** the rope drawn without its two spare steps (a T + s numeral has no peg to run to) · round beads drawn below 10 px instead of the segmented bar · a 0 numeral in any tray or as an arrowed peg · miss-1 numerals counted from the post instead of on from the last tag.
- **Pictures to verify (seen on the contact sheets 2026-10-17):** `accessories/sock` (one green striped sock — the pair is the picture and its mirror, identical otherwise), `fruits/lemon`, `fruits/pear`, `fruits/strawberry`, `vegetables/carrot` — all unambiguous. Never `fruits/plum` or `fruits/cherry` (both drawn as apples, already ruled). **Risks:** the 10s groups line at 6.2 px per unit — the segmented bar and the two-fives tint keep it legible; phones scroll with the last two bags always in view. Nothing blocked.

## 13. The four questions
1. **Choose it again?** Yes — swinging bags that slide down the rope by themselves, and a tag that zips along the line to its home.
2. **Teacher on the board?** Yes — skip counting finally *means* equal groups: each bag is one group and as long as it holds, and the line shows exactly why "2 bags" is not "2".
3. **Parent trust?** Socks, fruit, a washing line, numerals; calm, no timer.
4. **Invention:** every peg is one and every bag is exactly one step long — hang it end to end, and a wrong tag slides along the line to the peg where its number really lives.

## 14. Critic review (2026-10-17)
Scores before → after: invention 5→5 · fun 5→5 · completeness 4→5 · correctness 3→5 · distinctness 5→5 · reality 4→5
What changed:
- **Ticks windows had invalid printed tags** ("start, middle, end" puts 85 on a 10s line from 50 to 120, and 120 both printed and asked in 0–120); every window now lists its printed tags explicitly, all on the step.
- **0 handled per the never-zero rule:** 0 is never a tag, a tray numeral, an arrow or prose; where a ticks window starts at the origin it is scale print on the post (a measuring scale, allowed); miss-1 numerals now count *on* from the last tag instead of from 0.
- **A wrong tag had nowhere to run:** T + s for the last bag lay past the rope's end; the rope is now drawn two steps longer than the last bag.
- **Bead geometry was impossible** (min 6 px beads on a 6.2–7.75 px unit overlap); below 10 px per unit the bag becomes a segmented bar tinted in fives.
- The tray rule is now exact, and fixed a hidden tell: taking T − 1 and T − s whenever possible made the right numeral the biggest in the tray; the signs now cycle so it ranks 2nd–4th, gate-measured.
- All templates and windows re-computed for 2/3/4/5/10; pictures confirmed on the contact sheets.
