# Pedagogue critic — nt20-B design review (20 types)

Reviewed against: plan "The 20 types (locked)", design-A (#2 #3 #7 #10 #12 #17 #19), design-B (#1 #4 #5 #8 #9 #11), design-C (#6 #13 #14 #15 #16 #18 #20). Band ages: K 5-7 (beginning readers), G1 6-8, G2 7-9, G3 8-10.

Cross-cutting measurement used below: `strokeWordLane`/`writingRow` x-height ≈ glyphH × 40/70 (design-B §0: x-height line 44, baseline 84). At 0.265 mm/px: glyphH 16 → 2.4 mm · 17 → 2.6 mm · 20 → 3.0 mm · 26 → 3.9 mm · 30 → 4.5 mm · 46 → 7 mm. School rulings: de Klasse 1 = 5 mm, Klasse 2 = 4 mm; fr Seyès 2-interline ≈ 4 mm. **Any writing row for a full sentence below glyphH 24 is under every locale's convention** — this hits #14, #18, #20 (see BLOCKERS §12).

---

## #1 K-284 Trace and Write the Words — L.K.1.a (design-B §1)
- **CCSS**: L.K.1.a (print upper/lowercase letters) — instantiated (word tracing = letter printing in context). Honest. Note only de traces an uppercase initial; fine.
- **Load**: glyphH 46 (x-height ≈ 7 mm) is a real K size ✓. But d2 allows "any traceable ≤ 14 letters" and d3 "prefer 6-14" — a K child writing *granaattiomena* / *Schildkröte* alone on the third trio (no model directly above at d3) is a motor task well past K. Cap d2 ≤ 9 letters, d3 ≤ 11 (fi/de pools stay ≥ 8).
- **Ladder**: d1 (3 rows, ≤ 5 letters, model·trace·write) < d2 (4 rows) < d3 (trace·write·write, model demoted to caption) ✓ monotone. d2 is the right default.
- **Item design**: lowercase display everywhere except de ✓ (en K worksheets show lowercase). nl `ijsbeer` lowercase ✓. Uniqueness on display string ✓.
- **Improvement**: letter cap per band (above). Otherwise ship.

## #2 K-285 Dot-to-Dot 1 to 20 — K.CC.A.2 (design-A §"#2")
- **CCSS**: K.CC.A.2 is "count forward **from a given number**" — a 1→20 dot-to-dot instantiates K.CC.A.1 (the counting sequence by ones), not A.2. **d3 "2, 4 … 40" is skip-counting by 2s — there is no CCSS code for 2s at any grade (2.NBT.A.2 = 5s/10s/100s); in de/nl it is Klasse 1.** A K page must not carry it. Fix that also makes the claimed code TRUE: **d3 = 20 dots numbered from a non-1 start (e.g. 11…30 or 6…25), strip shows that window** — that IS K.CC.A.2.
- **Load**: dot r5, numerals Baloo 20 px, min spacing 39 px ✓. Strip chips 26 px are below the studio's own "K 56 px element" rule, but the strip is a reference, not a target — acceptable; d1 chips 34 ✓.
- **Ladder**: d1 (10 dots + preprinted remainder) < d2 (20) < d3 — monotone once d3 is the counting-on window.
- **Item design**: single coral ringed start dot ✓ B&W-safe. Resampled midpoints on straight edges produce trivial collinear runs (star 12→20) — harmless. d1 remainder in light `grid` at 3 px vs child pencil ✓.
- **Improvement**: d3 → counting-on window (BLOCKER 1).

## #3 K-286 Copy the Grid Picture — readiness (design-A §"#3")
- **CCSS**: readiness, no code ✓ honest.
- **Load**: 7×7 @ 42 px (11 mm cells), 20-25 cells × 2 figures = 40-50 coloured cells at K ✓. d3 8×8 @ 36 px, up to 72 cells — heavy but d3 ✓.
- **Ladder**: 6×6 < 7×7 < 8×8+labels ✓ monotone; d2 right default.
- **Item design**: asymmetry under 3 flips guarantees a mirrored copy is wrong ✓ (same orientation, so rotation is irrelevant). Mono teal model ✓. d3 A-H/1-8 labels on BOTH grids is the right bridge to #19.
- **Improvement**: ship as designed.

## #4 K-287 Singular and Plural — L.K.1.c (design-B §"#4")
- **CCSS**: L.K.1.c = "form **regular** plural nouns **orally** by adding /s/ or /es/". The page has the child SAY (concept) then trace/write — acceptable stretch. **But d2 admits 1 non-prefix plural and d3 REQUIRES ≥ 2 irregulars (Äpfel, mice, nuket) — that is L.2.1.b (frequently occurring irregular plurals), a G2 code, on a K page.** Fix: prefix-plurals only at every level; d3 difficulty from length and the -es/-en/-t class, not irregularity. (de has enough: Hunde, Katzen, Bären, Enten, Ziegen…)
- **Load**: plural lane glyphH 40 (≈ 6 mm) ✓ K. d3 5 rows at glyphH 34 + writing trio 40 px → 5 free-writes at ≈ 5 mm: at the K limit; keep d3 at 4 rows.
- **Ladder**: monotone after the fix (2 clones/short → 2-3 clones → longer words + -es class).
- **Item design**: count badges 1 / 3 make it readable with zero text ✓. `plural === singular` excluded ✓ (sheep, Hubschrauber, äpple/äpplen is NOT same → fine). en `glasses`-type via `exclude` ✓. fi omena→omenat passes prefix ✓; hevonen→hevoset correctly fails (excluded).
- **Improvement**: regular-only (BLOCKER 2); d3 4 rows.

## #5 K-288 Articles — L.1.1.h (en) (design-B §"#5")
- **CCSS**: **L.1.1.h (determiners) is a Grade-1 code on a K page** — K has no determiner standard. Claim readiness / no code (landing already carries none for K) or re-band. de/nl/es/pt/it/sv/da/no Artikel at K/Klasse 1 are fine as readiness.
- **fi rebuild is pedagogically ambiguous as proposed**: "Missä?" is answered by BOTH the inessive (*sammakossa*) and the adessive (*sammakolla*) — two correct chips, no picture can disambiguate. Replace with **yksikkö/monikko**: 1 vs 2-3 pictured nouns, chips `kissa / kissat` — the key comes from the picture count, reuses #4's plural data, and is a genuine esikoulu/1. lk staple.
- **it layout**: 4 chips (il/lo/la/l') × 84 + 3 × 12 = 372 > 299 inner — does not fit the 3-chip card. it d1/d2 = il/la only (refuse lo/l' nouns), d3 adds lo/l'.
- **no**: en/et two-way is correct Bokmål (all f nouns admit *en*) ✓. de colour convention der=blau / die=rot / das=grün ✓ matches the common Grundschule convention. fr elision refused ✓. en toys theme will likely lack ≥ 2 "an" nouns → throw → next theme ✓ (note for the wave order).
- **Load**: circle a chip, no writing ✓ K.
- **Ladder**: 4 < 6 < 8 cards + harder chip sets ✓.
- **Item design**: fixed canonical chip order + constant per-chip dot colour leaks nothing ✓.
- **Improvement**: BLOCKER 3 (code, fi, it chips).

## #6 G1-242 Read and Color — RF.1.4 (design-C §"#6")
- **CCSS**: RF.1.4.a (read with purpose and understanding) — a sentence-level following-directions task; acceptable, if thin. Honest enough.
- **Load**: 6 sentences of 4-6 words at 17 px ✓; 66 px colourable icons ✓ (56 at d3 is small for colouring but d3).
- **Ladder**: monotone in counts/colours ✓. d2 default ✓.
- **Item design — the number is never load-bearing**: §4 uniqueness requires that exactly `n` icons of the noun exist, so "Color **3** cats blue" is solved by colouring every cat; the digit is decorative and the count skill is not exercised. At d3 at least, put n+1 or n+2 target icons in the strip (colour exactly n; count determined, set free) — relax uniqueness to "count determined". Agreement devices (de "…blau an", fi partitive + translative, sv/da/no plural adjective, es/pt "de azul", it "di blu") ✓ all grammatical. `{n}` ≥ 2 ✓. Confusables list ✓. Coloured fruit in "wrong" colours: prefer animals/vehicles/toys for the published wave; fruits bw as fan-out only.
- **Improvement**: make n load-bearing at d3 (nice-to-have).

## #7 G1-243 Number of the Day — K.NBT.A.1 / 1.NBT.B.2 (design-A §"#7")
- **CCSS**: 1.NBT.B.2 (tens/ones) + 1.NBT.C.5 (±10) ✓ instantiated. K.NBT.A.1 covers 11-**19** only → d1 range must be 11-19 (20 is two tens). **Odd/even to 99 is 2.OA.C.3 (G2, and within 20)** — off-band on a G1 mat; replace the cell with "count back" (47 → 46 → 45) or "N = __ tens + __ ones" equation, or keep odd/even only when N ≤ 20.
- **Self-contradiction in the answer-hiding rule (§4/§3)**: d2 labels the line every 5 on 0-50 while N ∈ 21-50 "not a multiple of 10" — N = 25, 35, 45 ARE printed tick labels; the "N itself is never a ticklabel" assertion fails or the line prints the answer. Exclude multiples of **5** at d2 (and N = 15 at d1, where labels are every 5 on 0-20).
- **Load**: 0-50 line, tick 1 = 11 px per tick — marking 47 is fiddly for a G1 pencil; acceptable since labels every 5 make it "2 past 45". fi number word (22 chars) over two 270 px rows → the word will be split mid-word across rows; fi/de need one full-width row (or glyphH 24) — do not teach a broken compound.
- **Ladder**: 11-19 < 21-50 < 21-99 with ±1/±10/by-10s ✓ monotone.
- **Improvement**: BLOCKER 4 (tick-label collision); odd/even swap + d1 range + fi word row (nice-to-have).

## #8 G1-244 Write the Word / dictée muette — L.K.2.d / L.1.2.d (design-B §"#8")
- **CCSS**: with a full alphabetical word bank, d1/d2 are **copy-the-matching-word** (reading/matching, RF.1.3-ish), not spelling; only d3 instantiates L.1.2.d. And a French *dictée muette* is by definition bank-free (the picture is the dictation) — the fr title would be a misnomer on the default page. Fix: bank only at d1 (+ starter letter); **d2 = no bank, one letter box per letter (the classic dictée-muette scaffold: ▢▢▢▢ under the picture, `data-lcs-letters`)**; d3 = plain ruling. Code stays L.1.2.d honestly.
- **Load**: ruling glyphH 30 ≈ 4.5 mm ✓ Klasse-1-ish (5 mm ideal). ≤ 12 letters ✓.
- **Ladder**: after the fix: bank+starter < letter boxes < free ✓ (as designed, d2→d3 jumps from copying to spelling with nothing between).
- **Item design**: bank in collation order + card order ≠ bank order ✓; d1 "no two words share first two letters" ✓.
- **Improvement**: BLOCKER 5.

## #9 G1-245 Alphabetical Order — L.2.2.e (design-B §"#9")
- **CCSS**: **L.2.2.e (consult reference materials/dictionaries) is a G2 code on a G1 page**, and alphabetising is at best adjacent to it. CCSS has no alphabetical-order standard → claim readiness/no code (de "ABC-Reihenfolge Kl. 1-2", fr "ordre alphabétique CP-CE1" carry the SEO). If the G2 code is wanted, re-band to G2.
- **Load**: card word font drops to 13 px at ≥ 14 letters — under design-C's own 16 px G1 floor; cap words at 12 letters instead of shrinking. Copying 6 words on glyphH 26 rulings ✓.
- **Ladder**: rank-only (4) < rank+copy (6) < second-letter ties ✓ monotone; d2 default ✓.
- **Item design / collation**: sv/fi å ä ö after z ✓; da/no æ ø å ✓; es ñ after n ✓ (no ch/ll); de ä→a, ß→ss (DIN 5007-1) ✓; nl ij as i+j ✓ (ij-as-y is dated); it 21-letter strip ✓. d3 tie pairs resolved at letter 2 ≥ 2 apart ✓. Folded-prefix collisions forbidden ✓.
- **Improvement**: BLOCKER 6 (code); 12-letter cap (nice-to-have).

## #10 G1-246 Number Walls — 1.OA.C.6 / 1.OA.D.8 (design-A §"#10")
- **CCSS**: within-20 sums ✓ 1.OA.C.6; d3 base gap solved by subtraction = unknown addend ✓ 1.OA.D.8. Honest.
- **Load**: 28 px numerals in 88×52 bricks, 18 blanks at d2 ✓ G1.
- **Ladder**: ≤ 10 (4 walls) < ≤ 20 (6 walls) < 4 courses + gap ✓ monotone.
- **Item design**: base-up, sum-of-two-below = the Zahlenmauer as taught ✓ (no misconception: the "find the base from the top" variant is correctly rejected as non-unique). d3 propagation-uniqueness rule ✓; base ≥ 1 ✓; top ≤ 20 with base 1-5 in 4 courses will reject most tuples (max 40) — ensure the sampler enumerates rather than rejection-samples.
- **Improvement**: ship as designed.

## #11 G1-247 Doubles and Halves — 1.OA.C.6 (design-B §"#11")
- **CCSS**: doubles ✓ 1.OA.C.6 (known-sums strategy). Halves are not in 1.OA.C.6; nearest is 2.OA.C.3 (even = two equal addends, G2) — BUT written as an equation "12 = ▢ + ▢" (same box twice) halving becomes an unknown-equal-addends task = **1.OA.D.8** and is honest at G1.
- **Item design**: "12 → ▢" uses an arrow with no arithmetic meaning a G1 child has been taught; the `half` pill carries all the semantics. Write halves as `12 = ▢ + ▢` (or `▢ + ▢ = 12`); the dashed cut line then IS the equation. de/nl teachers write "Halbiere 12: 6" — the equation form is more locale-neutral than `→`.
- **Load**: 12 icons at 40 px in 270 px ✓; 6 cards ✓.
- **Ladder**: 1-4 → 2-6 → numeric 5-10 ✓ monotone. d2 default ✓.
- **Scaffold**: mirror lets the child count all 8 (counting, not doubling) — acceptable at d1/d2, removed at d3 ✓. Halves in two rows of N gives N ✓ acknowledged.
- **Improvement**: equation form for halves (nice-to-have, strong).

## #12 G1-248 Where on the Number Line? — 1.NBT.A.1 / 2.MD.B.6 (design-A §"#12")
- **CCSS**: 1.NBT.A.1 (read/write numerals, count on from any number) ✓. **2.MD.B.6 is G2** — drop it from a G1 page. d3 (0-100, tick 5, label 10) makes every pointer a midpoint between two labels — fine as 1.NBT.A.1 to 120.
- **Load**: 52 px boxes; 2-tick min gap puts boxes 4 px apart — raise min gap to 3 ticks when 3 pointers (the studio's own suggestion) ✓.
- **Ladder**: 0-10 < 0-20 < 0-100 ✓.
- **Item design**: pointers never on labelled ticks ✓; labelEvery=1 fails ✓.
- **Improvement**: drop the G2 code (BLOCKER 7, trivial); min gap 3.

## #13 G1-249 Unscramble the Sentence — L.1.1.j (design-C §"#13")
- **CCSS**: L.1.1.j (produce complete simple sentences) ✓ acceptable.
- **Bank contract breaks itself (design-C §0.4/§0.5)**: "no repeated token (case-insensitive)" rejects the spec's own `s1` ("**The** cat sleeps on **the** bed.") and nearly every article-bearing en/fr/es/it/pt sentence. Identical tiles are *fungible* — they create no ambiguity. Relax to: repeated tokens allowed when the strings are identical after the level's transform.
- **"One natural order" is violated by the EN source itself**: `s2` "{name} feeds the {noun} every day." also reads "Every day {name} feeds the cat." Brief rule: **no movable adverbials** (every day / today / at home) in `unscramble` frames. For de the criterion must be "the only **unmarked** order" — "the only grammatical order" is unattainable under V2 (any constituent may front).
- **Load**: 4 lanes, tiles 18 px, ruling glyphH 26 (≈ 3.9 mm) ✓ borderline-fine for G1 (5 mm ideal).
- **Ladder**: order → +end mark → +capital ✓ monotone; `visible[0] ≠ 0` ✓ good.
- **Improvement**: BLOCKER 8 (bank rules).

## #14 G2-274 Fix the Sentence — L.1.2.a/b / L.2.2.a (design-C §"#14")
- **CCSS**: **L.2.2.a = capitalise holidays, product names, geographic names** — the page never does that. It instantiates L.K.2.a (sentence-initial capital, *I*), L.1.2.a (names), L.1.2.b (end punctuation) — G1 codes reviewed at G2, which is honest. Drop L.2.2.a, or add d3 frames with a place name ("{name} lives in Paris.") to earn it.
- **Load — motor**: 6 lanes at ruling 46 / glyphH 20 → x-height ≈ 3 mm for rewriting a full sentence, six times. Under the Klasse-2 4 mm line. **5 lanes at glyphH 26 (h 60)**: 40 + 12 + 5 × (12+32+6+60+12) + 4 × 10 = 702 ✓ fits.
- **Uniqueness**: d3 "!" frames — an imperative ("Look at the big cat!") is equally correct with "." in every locale; the `exclaimOptional` flag admits it but verify asserts the exact canonical. Either restrict "!" to interjective frames ("What a big cat!", de "Wie groß der Hund ist!") or let verify accept `.|!` for imperatives.
- **de d1 (§3)**: the corruption lowercases nouns even at d1 while the checklist hides the Nomen chip — show the Nomen chip in de at every level (it is the Klasse-2 point).
- **Ladder**: initial+period → +names(+de nouns) → +?/!/¿¡ ✓ monotone.
- **Improvement**: BLOCKER 9 (code, lanes, "!" ambiguity).

## #15 G2-275 Word Classes — L.1.1.b/e, L.2.1.e (design-C §"#15")
- **CCSS**: sorting words by class *touches* L.1.1.b/e (use nouns/verbs) and L.2.1.e (use adjectives); CCSS has no parts-of-speech identification code. Acceptable as G2 (no upward claim); if a single code is wanted, L.2.1 (general conventions) or readiness with the national names (Wortarten Kl. 2 / nature des mots CE1 / sanaluokat).
- **Homograph hole (§4)**: the validator checks verbs∩adjectives and verbs/adj ∩ vocab nouns — but NOT vocab nouns that are common verbs/adjectives outside the authored lists. At **d3 (no pictures)** en `duck`, `fly`, `fish`, `bear`, `bat`, `seal`, `fox`, `orange`; fr `orange`; it `pesca`; sv `fluga` (noun only ✓) become genuinely ambiguous chips. Require a per-locale `nounExclude` list, applied at d3 (and validator-listed for the panel).
- **de**: capitalised noun chips give Nomen away — default `chipCase:'lower'` for de at d3 (Wortarten sorts are printed lowercase in Klasse 2).
- **Load**: 12 chips at 17 px, copy into bins on 40 px lines ✓ G2.
- **Ladder**: 9 (pictured nouns, tier-1 adj) < 12 < 15 (no pictures, tier 3) ✓.
- **Improvement**: BLOCKER 10 (d3 homographs).

## #16 G2-276 Shopping Math — 2.MD.C.8 (design-C §"#16")
- **CCSS**: money word problems with coins, sub-unit only ✓ honest.
- **Money conventions**: prices multiples of 5 (fi/nl rounding) ✓; sv 20 kr is a banknote, 50 kr as 5×10 kr coins ✓ handled; da/no 20 kr coins ✓. Paying **100 ct as coins** means 2 × 50 ct — unnatural; allow the unit coin (1 €, 1 $, 1 £) as a payment coin while the answer stays in ct (or cap pay-with at 50 ct). en sketch shows "35 ct" — en must follow the nt20 ruling (¢ / p), never "ct".
- **Item design**: "How much does **she** pay?" in the sketch contradicts the repeat-the-name rule the spec itself states — brief the panels with the rule, not the sketch. `canBuy` money ∈ {±5, ±10} ✓ determined; `change` ≥ 5 ✓; `diff` ✓.
- **Load**: 3 cards, inline icons, dot panel ✓ G2.
- **Ladder**: total/canBuy → +change → +diff, 3-item totals ✓.
- **Improvement**: unit coin + en symbol (nice-to-have).

## #17 G2-277 Read the Calendar — readiness (design-A §"#17")
- **CCSS**: readiness ✓ honest (no calendar code).
- **Convention error**: **pt = Brazilian Portuguese (CLAUDE.md §6) and Brazilian calendars start on Sunday (CLDR pt-BR firstDay = sun)** — "Monday for all 10 non-en" is wrong for pt. Also `es` needs a ruling: es-ES Monday, Latin-American Spanish Sunday. Make `weekStart` a per-locale panel field with pt = 0 by default.
- **Ambiguous item**: d3 `between` "How many days from the [A] to the [B]?" — inclusive vs exclusive counting (6th→9th: 3 or 4) is a known child (and adult) ambiguity. Rephrase "How many days **after** the [A] is the [B]?" (= dayB − dayA, unique) or drop.
- **6-row rule (§3)**: "31-day month starting Fri/Sat/Sun" is weekStart-dependent (Monday-start: only Sat/Sun starts give 6 rows; Sunday-start: Fri/Sat). Compute rows from (firstCol, days); do not name weekdays. Since en and the rest differ, the "same month everywhere" pick may be 5 rows in one locale and 6 in another — verify already recomputes, but d3's stated intent will not hold in en.
- **Load**: 6 questions ≤ 70 chars at 15 px ✓ G2; 88×56 cells with 34 px stickers ✓.
- **Ladder**: 4 → 6 → 6 harder ✓.
- **Improvement**: BLOCKER 11 (pt weekStart, `between`).

## #18 G2-278 Write About the Picture — W.1.3 / W.2.3 (design-C §"#18")
- **CCSS**: W.2.3 is **narrative** (recount an event/sequence). Starters "I can see… / In the picture…" produce a **description** — that is W.2.2 (informative). Either re-code to W.1.2/W.2.2, or (better pedagogy) make the starters narrative — "One day, … / Then …" (de "Eines Tages…", fr "Un jour, …") — so a story, not a list, is written and W.2.3 is honest. The picture already has a hero + repeats; a narrative starter is what turns the scene into a Schreibanlass.
- **Load — motor**: d2 5 rows at glyphH 20 (≈ 3 mm) and d3 8 rows at glyphH 17 (≈ 2.6 mm) — below any G2 ruling. d2 = 5 × glyphH 26 (h 64): 270+12+74+14+320+24 = 714 ✓ fits as-is; d3 = 6 rows × glyphH 24.
- **Ladder**: 3 starters/3 rows → 2 starters/5 rows → 0/8 rows ✓ monotone.
- **Item design**: open-ended, correctly declared the one non-unique type ✓; bank ↔ scene bijection ✓; no model sentence printed ✓.
- **Improvement**: BLOCKER 12 (x-height); narrative starters (nice-to-have).

## #19 G2-279 Grid Coordinates — readiness (design-A §"#19")
- **CCSS**: readiness ✓ honest (fr repérage CE1; de Kl. 2 Gitternetz).
- **Convention**: letters across / numbers down top-to-bottom (table/battleship) is a legitimate CE1/Kl. 2 convention and the mini legend teaches it ✓; the Cartesian variant correctly held for G3.
- **Item design**: shuffled codes within a colour ✓ (sorted would spell the picture — good catch); colour word carries B&W ✓; 20-25 cells @ 46 px ✓.
- **Load**: 36 chips at d3 is a lot of lookups but G2 d3 ✓.
- **Ladder**: 6×6/18-25 → 8×8/20-25 → 10×10/29-36 ✓.
- **Improvement**: ship as designed.

## #20 G3-370 Multiplication and Division Word Problems — 3.OA.A.3 (design-C §"#20")
- **CCSS**: equal-groups mul, partitive (share) and quotitive (group) division with actionable pictures ✓ instantiated (a subset of "within 100").
- **Range**: products ≤ 36 at every level is thin for G3 d3; allow d3 mul ≤ 50 with two-row group boxes (the studio notes the slack) — 6×8, 7×7 are the facts a G3 child needs.
- **Load — motor**: answer-sentence ruling glyphH 16 (≈ 2.4 mm) is unwritable at G3 → glyphH 24 / h 50 (+28 px total, 746 ✓).
- **Item design**: answer ∉ {n1, n2} ✓; answer digit never printed ✓; container noun ∉ theme plurals ✓; name repeated ✓. fi "{n2} ystävälle" with a digit ✓.
- **Ladder**: mul/mul → mul+share → mul+share+group ✓ monotone.
- **Improvement**: BLOCKER 12 (ruling); d3 ≤ 50 (nice-to-have).

---

## BLOCKERS (must fix before build)

1. **#2 d3 skip-count by 2s to 40 is off-band on a K page** (no CCSS code at K; Kl. 1 in de/nl). Replace d3 with a **counting-on window** (20 dots numbered e.g. 11…30, strip = that window) — which also makes the claimed K.CC.A.2 true (d1/d2 as designed are K.CC.A.1).
2. **#4 irregular plurals (d2 "≥3 of 4 prefix", d3 "≥2 non-prefix") are L.2.1.b (G2) on a K page**; L.K.1.c is regular-only. Prefix-plurals at every level; d3 difficulty from length / -es class.
3. **#5 (a) L.1.1.h is a G1 code on a K page** → readiness/no code (or re-band). **(b) fi "Missä?" has two correct chips** (inessive and adessive both answer *where*) → rebuild as yksikkö/monikko keyed by picture count. **(c) it 4 chips (il/lo/la/l') do not fit** the 3-chip card → il/la at d1/d2, lo/l' at d3.
4. **#7 tick-label collision**: d2 labels every 5 on 0-50 while N may be 25/35/45 → the line prints the answer and the "N never a ticklabel" invariant fails. Exclude multiples of 5 at d2, N=15 at d1 (and d1 range 11-19 for K.NBT.A.1).
5. **#8 default page (d2) with a full word bank is copying, not L.1.2.d spelling, and a bank-bearing page cannot be titled *dictée muette***. Bank at d1 only; d2 = letter-count boxes under each picture; d3 = plain ruling.
6. **#9 L.2.2.e is a G2 code on a G1 page** (and not an alphabetising standard) → readiness/no code.
7. **#12 drop 2.MD.B.6 (G2)** from the G1 page; keep 1.NBT.A.1.
8. **#13 bank contract**: (a) "no repeated token" rejects the spec's own `s1` and almost every article-bearing sentence — allow identical (fungible) tiles; (b) the EN source `s2` ("… every day") violates one-natural-order — ban movable adverbials in `unscramble` frames; (c) de criterion = only **unmarked** order, not "only grammatical" (V2 makes the latter unattainable).
9. **#14 (a) L.2.2.a (holidays/products/places) is not what the page does** → L.K.2.a/L.1.2.a/b, or add place-name frames at d3. **(b) 6 rewrite lanes at glyphH 20 (≈3 mm x-height)** → 5 lanes at glyphH 26. **(c) "!" frames are not unique** (imperatives take "." everywhere) → interjective-only "!" frames or verify accepts `.|!`.
10. **#15 d3 (no pictures) has no guard against vocab-noun homographs** (en duck/fly/fish/bear/bat/seal/orange, fr orange, it pesca …) → per-locale `nounExclude` list, validator-listed, applied at d3.
11. **#17 (a) pt-BR calendars start on Sunday** (CLDR pt-BR firstDay = sun; CLAUDE.md §6 pt = BR) — "Monday for all non-en" is wrong; make weekStart a per-locale field (pt 0; es needs a ruling ES vs LatAm). **(b) d3 `between` is inclusive/exclusive-ambiguous** → "how many days **after** A is B", or drop.
12. **Writing-row x-height floor for sentence writing**: #14 (glyphH 20), #18 (d2 20 / d3 17), #20 (16) are 2.4-3 mm — under every locale's G2/G3 ruling (≈4 mm). Set glyphH ≥ 24-26 for any full-sentence row at G2/G3 (all three fit: #14 5 lanes = 702, #18 = 714, #20 = 746).

## NICE-TO-HAVE
- #1 letter cap d2 ≤ 9 / d3 ≤ 11 (K free-writing load).
- #4 d3 4 rows (not 5).
- #5 note wave order: en toys / sv-da-no animals will throw on gender mix — put fruits/vehicles first.
- #6 make `n` load-bearing at d3 (n+1..n+2 target icons; count determined, set free); prefer non-fruit BW themes for the published wave.
- #7 swap odd/even (2.OA.C.3) for count-back or "N = __ tens + __ ones"; fi/de number word on one full-width row (never split a compound across rows).
- #9 cap card words at 12 letters instead of dropping to 13 px.
- #11 write halves as `12 = ▢ + ▢` (1.OA.D.8-honest, drops the meaningless `→`).
- #12 min pointer gap 3 ticks when 3 pointers per line.
- #14 show the Nomen chip for de at d1.
- #15 de `chipCase:'lower'` default at d3; consider claiming L.2.1 (general) rather than three touched sub-codes.
- #16 allow the unit coin (1 €/$/£, 10 kr) as a pay-with coin; en unit symbol per nt20 ruling (never "ct"); brief panels with the repeat-name rule, not the "she" sketch.
- #17 compute 6-row months from (firstCol, days) rather than naming weekdays; accept that en and Monday-start locales differ in row count for the same month.
- #18 narrative starters ("One day, … / Then …") to make W.2.3 honest — or re-code to W.2.2.
- #20 d3 mul products ≤ 50 with two-row group boxes.
- #3 #10 #19 ship as designed.
