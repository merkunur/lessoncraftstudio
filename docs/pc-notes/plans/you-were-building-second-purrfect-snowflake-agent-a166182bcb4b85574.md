# Swedish panel — `olive-kind-of` (category-define / L.1.5.b) rebuild

Panel: native Swedish K-3 läromedel content creator. All Swedish exact, ready to paste.

Everything below was checked against the repo, not recalled. Five verifications are load-bearing
and two of them changed the design — they are marked ⚠ and written up in §3.

---

## 0. What I verified before designing (and what it changed)

| Check | Result |
|---|---|
| `överbegrepp` in repo | **0 hits.** Fence claim confirmed — the term is free. |
| `gruppera` in repo | 2 real hits, both body prose (`sv.json`, `tool-content/sv.json`). Free at slug level. |
| `Olga` in repo | 10 hits, **all false positives** — substrings of pt `folgas`/`empolgante`, es `colgadas`/`colgando`. Free. |
| Engine `speak()` / `aria-label` | ⚠ **No `sv` branch in either.** See §7 — three code defects. |
| `strings` object | ⚠ **No `sv` key at all.** Appendix A supplies it. |
| Every image file | All 8 resolve. ⚠ **Two of them are not what their filename says.** See §3 R4 and R5. |
| Four bot metrics | Computed, not eyeballed: **0.375 / 0.000 / 0.250 / 0.250**. All ≤ 0.45. |

I also read the shipped en/de/nl decks. The brief's two claims are both true and worse than stated:
in **de and nl the correct answer sits at index 0 in all 8 rounds** (positionBot = 1.0), and every
single clue in every locale describes the object that is already on the screen.

---

## 1. THE EIGHT ROUNDS

Label follows the **picture**, not the English file stem. `themeDir`/`noun` verified on disk.

| Band | id | noun @ themeDir | `label` | `category` | foils | `clue` |
|---|---|---|---|---|---|---|
| 1 | `banan-mat` | `banana` @ `At the Supermarket` | banan | **Mat** | Fordon, Möbler | Den är gul och böjd, och man äter den. |
| 1 | `buss-fordon` | `bus` @ `vehicles` | buss | **Fordon** | Växter, Djur | Den har hjul och kör många barn till skolan. |
| 1 | `stol-mobler` | `chair` @ `furniture` | stol | **Möbler** | Mat, Kläder | Den står inne i rummet och man sitter på den. |
| 2 | `byxor-klader` | `trousers` @ `clothing` | byxor | **Kläder** | Djur, Fordon | De är gjorda av tyg och man har dem på benen. |
| 2 | `trad-vaxter` | `oak` @ `tree` | träd | **Växter** | Möbler, Fordon | Det lever och växer, och det har rötter i marken. |
| 2 | `far-djur` | `sheep` @ `animals` | får | **Djur** | Kläder, Mat | Det lever och betar gräs, och det går dit det vill. |
| 3 | `agg-mat` | `egg` @ `At the Supermarket` | ägg | **Mat** | Djur, Växter | Det kommer från hönan, men man kokar det och äter det. |
| 3 | `kanot-fordon` | `canoe` @ `vehicles` | kanot | **Fordon** | Möbler, Djur | Den har inga hjul, men man färdas i den på vattnet. |

**`choices` arrays in shipped order** (positions chosen to spread the correct index 3/3/2):

```
banan-mat     ["Fordon","Mat","Möbler"]        → idx 1
buss-fordon   ["Fordon","Växter","Djur"]       → idx 0
stol-mobler   ["Möbler","Mat","Kläder"]        → idx 0
byxor-klader  ["Djur","Kläder","Fordon"]       → idx 1
trad-vaxter   ["Möbler","Fordon","Växter"]     → idx 2
far-djur      ["Kläder","Mat","Djur"]          → idx 2
agg-mat       ["Djur","Mat","Växter"]          → idx 1
kanot-fordon  ["Fordon","Möbler","Djur"]       → idx 0
```

**Gate results (computed):** positionBot **0.375** · longestBot **0.000** · shortestBot **0.250** ·
fixedGuessBot **0.250**. Board appearances 3–5 per label — no label is rare enough to be
guessed-against, and **all six categories are correct at least once**, so ”this word is never the
answer” is not learnable.

Two structural facts worth writing into the build gate's comments:

- **`Mat` is the only 3-letter label**, so every round where `Mat` is the answer is a free
  shortestBot hit. **Cap `Mat` answers at 3 of 8** or that gate fails on its own.
- Four labels are 6 letters (`Fordon`, `Kläder`, `Växter`, `Möbler`). Putting any two of them on a
  board kills longestBot for that round outright — that is how this deck reaches 0.000.

Pronoun coverage is deliberate and complete: **den** ×4 (banan, buss, stol, kanot), **det** ×3
(träd, får, ägg), **de/dem** ×1 (byxor). All three Swedish agreement patterns appear, and `byxor`
carries subject `De` *and* object `dem` in one sentence.

---

## 2. Per-round: why the foils are safely wrong, and is the clue load-bearing

| Round | Foils are safely wrong because | Clue |
|---|---|---|
| `banan-mat` | A banana is not a vehicle and not furniture — no reading makes either true. ⚠ **`Växter` is deliberately kept off this board**: a banana *is* plant matter, so it would be an arguable second correct answer. | **Decorative (by design).** Band-1 on-ramp: its job is to model what a category clue sounds like. |
| `buss-fordon` | A bus is not a plant and not an animal. `Djur` is the interesting foil — both animals and vehicles *move*, which is the distinction being drawn. | **Decorative.** But it plants ”har hjul”, which round 8 exists to contradict. |
| `stol-mobler` | A chair is not food and not clothing. ⚠ **`Växter` kept off**: the chair is visibly wooden and a child can reason trä → växt. | **Decorative.** Plants ”man sitter på den”, which round 8 exists to trap with. |
| `byxor-klader` | Trousers are not an animal and not a vehicle. `Djur` is the live foil (ull → får). | **Partly.** The clue supplies the criterion ”gjorda av tyg”, which the wool association cannot survive. |
| `trad-vaxter` | A tree is not furniture and not a vehicle. ⚠ **`Möbler` is the designed trap** — the image draws a thick brown trunk, and *trä → möbler* is the material-for-object conflation. Genuinely wrong: a tree is not a piece of furniture. | **LOAD-BEARING.** ”Det lever och växer … rötter i marken” is the criterion that a table fails. Nothing in the picture states it. |
| `far-djur` | A sheep is not clothing and not food. ⚠ **Both foils are designed traps** — ull → tröja, lamm → mat. Both genuinely wrong: the *animal* is not a garment and not a meal. | **LOAD-BEARING.** ”det går dit det vill” is the self-movement criterion that separates djur from both foils. |
| `agg-mat` | An egg is not furniture — and not an animal: it does not move, eat or grow. `Djur` is the designed trap (hönan). | **LOAD-BEARING**, and the strongest sentence in the deck: the clue *hands the child the trap* (”kommer från hönan”) and then overrides it with **men**. The pivot is the teaching. |
| `kanot-fordon` | A canoe is not furniture and not an animal. ⚠ **`Möbler` is the designed trap** — the image shows wooden bench seats, and round 3 has just taught ”man sitter på den → Möbler”. | **LOAD-BEARING.** ”inga hjul, **men** … färdas” repairs *fordon = hjul* (planted in round 2) and beats the sitting cue (planted in round 3). |

---

## 3. REJECTIONS

**R1 — `svamp` (mushroom), any category.** This is the fence's hazard in its purest form and it
cannot be fixed by choosing foils. A Swedish 7-year-old says *svampen växer i skogen* → `Växter`;
this library files mushroom under `At the Supermarket/` and `vegetables/` → `Mat`. Both readings
are defensible, so no board of three is provably disjoint. And `Växter` would additionally be
**false**: fungi are not plants. Rejected outright — not even as a foil.

**R2 — `mjölk` → Mat.** Rejected on a lexical ground, not a picture ground. Swedish separates
**`mat`** (eaten) from **`dryck`** (drunk) far more sharply than English separates *food* from
*drink*, and `dryck` is not on the button row. Filing milk under `Mat` would grade a child on a
distinction Swedish does not make. The tell that it was fatal: the intended trap was cow → `Djur`,
and the trap answer was more defensible than the ”correct” one.

**R3 — `bänk` (bench) → Möbler.** Rejected because *the child owns the derived compound but not the
base in the required sense*. A 7-year-old knows `parkbänk` and `skolbänk` as outdoor/school objects,
while everyday `möbler` is strongly indoor-home. The round would have measured whether the child
shares an adult's extension of `möbler`, not whether they can read a clue. `stol` has no such gap.

**R4 — ⚠ `ek` as the label for `tree/oak@2x.webp`.** Rejected **after opening the file**: the
picture is a generic broadleaf tree — thick brown trunk, rounded green crown, **no acorns and no
lobed oak leaves**. The English stem says `oak`; the picture does not. Since `label` is spoken aloud
by speech synthesis and used as `alt`, shipping ”ek” would teach a wrong word to exactly the child
who cannot check it. **The label follows the picture, not the filename** → `träd`.

**R5 — ⚠ `clothing/pants` for the Kläder round, and this is the one that would have shipped.**
`pants@2x.webp` is **knee-length shorts**. Swedish `byxor` over that image is wrong (`shorts` /
`kortbyxor`), and the plural clue ”…på benen” would have described a garment the picture does not
show. `clothing/trousers@2x.webp` is proper long trousers and is the correct file. Both files exist
in the same folder, so a stem-matching build would have picked either.

**R6 — `Växter` as a foil on the `banan`, `stol` and `kanot` boards.** Rejected three times for one
reason: a banana *is* plant matter, and the chair and canoe are visibly **wooden**. In each case
`Växter` stops being a safely-wrong foil and becomes an arguable second correct answer — which the
byte-equality grader would mark wrong. `Växter` appears only where the object is unambiguously not
plant-derived (`buss`, `ägg`) or is the answer (`träd`).

**R7 — `fisk` → Djur.** This is the round the brief flags as surviving on omission alone in every
shipped locale, and in Swedish it is **worse than in English**: `fisk` is the everyday word for both
the live animal and the fillet on the plate — Swedish has no *fish*/*seafood* split to hide behind.
Any board offering `Mat` beside a fish is ambiguous; any board omitting it is safe only by accident.
Dropped entirely rather than papered over.

**R8 — an honest downgrade, not a rejection.** I designed `agg-mat` as the deck's strongest
picture-trap, then opened the file: `At the Supermarket/egg@2x.webp` is **three eggs in a carton**,
which is loudly supermarket-coded and weakens the *djur* pull a single shell egg would have had.
The round is kept — the ”kommer från hönan, **men**…” pivot carries it on the clue rather than on the
picture — but I am recording that the picture is doing less work than the design assumed.

---

## 4. THE CATEGORY LABEL SET

```
Djur   Mat   Fordon   Kläder   Växter   Möbler
```

Initial capital, byte-exact, no other form anywhere in the deck.

**The governing ruling: every label is a plural or a mass noun.** `Djur` and `Fordon` are
plural-identical, `Kläder` and `Möbler` and `Växter` are plural, `Mat` is mass. So the set reads as
*six groups*, which is the concept the activity teaches — and it turns the brief's ”inherently mixed
in number” problem into the design. Capitalising is right because these are standalone button
labels, not words in a sentence.

- **`Fordon` — keep. Not too formal.** There is no everyday Swedish alternative: `Färdmedel` is more
  formal, `Bilar` is a hyponym, and *teaching the överbegrepp is the entire point of the activity*.
  Swedish children meet it on road signs (`fordonstrafik`). The deck compensates by giving it **two
  rounds with contradictory attribute clues** (hjul / inga hjul) so the word is learnable from use.
- **`Kläder` — keep the plural.** `Klädesplagg` is bureaucratic for åk 2 and there is no natural
  singular group-name. Under the plural ruling it is no longer an odd one out.
- **`Möbler`, not `Möbel`.** `Möbel` singular as a *group* name is not idiomatic Swedish — you say
  *möbler* for the class. Same ruling as `Kläder`.
- **`Växter`, not `Växt`.** Plural for consistency with the ruling. It also happens to help the
  gates: `Växter` (6) ties with the other four 6-letter labels, whereas `Växt` (4) would have tied
  with `Djur` and shifted shortestBot.

---

## 5. PUBLIC COPY

**`slug.sv`**
```
overbegrepp-vilken-grupp-tillhor-bilden-ak-2
```
Lowercase, ASCII-folded, hyphenated, `-ak-2` suffix matching the shipped sv shapes. Leads with
`överbegrepp` — verified 0 occurrences in the repo, and it is the exact term a Swedish teacher
searches. Avoids `sortera`/`sortering`, `hör ihop`, `ordgrupp`, `ordbildning`.
*Fallback if your fence matches `hor` as a bare substring rather than the phrase `hor-ihop`
(`tillhor` contains it): `overbegrepp-gruppera-ord-i-kategorier-ak-2` — `gruppera` verified free at
slug level.*

**`page_title.sv`**
```
Överbegrepp med Olga: vilken grupp tillhör bilden? (åk 2)
```
56 chars — in line with `Ord som hör ihop – …` at 60. Keyword first, year band last.

**`page_intro.sv`**
```
Olga är en uggla som vet vilken grupp allting tillhör. Barnet ser en bild, läser en kort
ledtråd – ”Det lever och betar gräs” – och trycker på rätt överbegrepp: Djur, Mat, Fordon,
Kläder, Växter eller Möbler. En interaktiv ordkunskapsövning för åk 2 där ledtråden avgör
svaret, i linje med Lgr22.
```
Names Lgr22, quotes no CCSS code, claims nothing about price or accounts.

**Grade and strand — both need a route override.** Every shipped locale placed this at the åk-2
equivalent (de Klasse 2, nl groep 4, fr CE1, es 2.º, pt 2º, it seconda) while `alignment.grade` is
`"1"`, so sv needs `GRADE_OVERRIDE` → `2`, as de did. For the strand, `alignment.strand` is
`Language`; the Lgr22 svenska åk 1–3 centralt innehåll heading that contains ordförråd work is
**`Språkbruk`**, and per the formal-curriculum-term rule that is the string to use rather than the
transparent `Ordförråd`. Recommend `STRAND_OVERRIDE` → `Språkbruk`.

---

## 6. THE CHARACTER — **Olga**

**Recommendation: rename the owl `Olga` in Swedish.**

The reason to rename is Swedish-specific and stronger than euphony: **`oliv` is an everyday Swedish
food noun**, and this very deck puts **Mat** on the button row. An owl named after a food, on a
screen that repeatedly asks *är det Mat?*, is a live confusion for exactly the age group. Every other
locale keeps *Olive* because in those languages it does not collide with a button.

`Olga` keeps the **Ol-** onset, so the character stays recognisably the same owl across the family.
It is a naturalised Swedish given name — common around 1900, now retro-fashionable — which reads
warm and slightly grandmotherly, the right register for a wise owl.

**What I checked, and what I could not.**

- Repo grep: 10 apparent hits, **all false positives** (substrings of pt `folgas`/`empolgante`,
  es `colgadas`/`colgando`). No real use of `Olga` anywhere in the codebase.
- Names I checked and **rejected** for collision:
  - **`Uggla`** — this is the Swedish name of Owl in *Nalle Puh*. Dominant collision.
  - **`Hedvig`** — Harry Potter's Hedwig in Swedish. Dominant collision.
  - **`Olivia`** — Ian Falconer's picture-book pig is published in Swedish as *Olivia*. Collision.
  - **`Olle`** — Elsa Beskow's *Olles skidfärd*, canonical Swedish picture book. Collision.
  - **keeping `Olive`** — rejected on the `oliv`/`Mat` ground above.
- **Honest limit:** I checked the repository and my knowledge of Swedish children's publishing.
  I did **not** run a PRV/Bolagsverket trademark search, which I cannot do from here. If you want
  belt-and-braces, that is a 60-second check before ship. I know of no dominant Swedish children's
  character named Olga; my confidence is high but not verified against a register.
- **Fallback if `Olga` is rejected:** `Alma` — common, warm, no collision I am aware of, but it
  loses the cross-locale `Ol-` thread.

---

## 7. ⚠ Three code defects the sv build must fix (activity layer only)

Found while reading `olive-kind-of-activity.js`. None is a content decision; all three ship broken
for Swedish unless patched.

1. **`speak()` has no `sv` branch.** The `SpeechSynthesisUtterance` fallback chain ends
   `… : LANG === 'nl' ? 'nl-NL' : 'en-US'`, so **a Swedish child hears `får` and `ägg` read by an
   American English voice.** Needs `LANG === 'sv' ? 'sv-SE'`.
2. **The picture button's `aria-label` has no `sv` branch** — it falls through to the English
   `'hear ' + dispWord`, so a screen reader announces *”hear får”*. Needs `dispWord + ' – lyssna'`
   (Swedish takes the postposed form like de/nl, not the fronted `écouter`/`escuchar` form).
3. **`strings` has no `sv` key at all.** Appendix A below.

Standing note from the project doctrine: TTS is reliable in only 5 of 11 locales and `LCSAudio`
never calls `getVoices()`, so **Swedish may be silent regardless of (1)**. The deck is legible with
the sound off — the label is also the `alt` — but fix (1) anyway so it works where a voice exists.

---

## 8. The pedagogical fix, and its honest ceiling

**Diagnosis.** The shipped clues fail because they describe the **object**, and the object is
already on the screen. *”Hij heeft vier poten en blaft”* under a picture of a dog is a caption, not a
clue. It teaches nothing transferable, so a non-reader scores 8/8 in every shipped locale.

**Three engine-free mechanisms, all used here:**

**(A) Criterion clues, not description clues — applied to all 8 rounds.** Every clue states a
defining attribute of the **category**, phrased so a child could apply it to an object they have
never seen. Compare: shipped nl *”groeit in de tuin en bloeit”* (describes the rose) against
`trad-vaxter` *”Det lever och växer, och det har rötter i marken”* (states what makes anything a
växt). This is the half of L.1.5.b — *by one or more key attributes* — that the shipped decks skip.

**(B) The superordinate climb.** Every picture is chosen so its **basic-level** name sits one rung
below the button: the child sees *blomma* → must reach `Växter`; *båt* → `Fordon`; *frukt* → `Mat`.
The picture supplies the basic level; the clue licenses the climb. This is the actual content of
L.1.5.b and costs nothing in the engine.

**(C) Counter-cue rounds — the four that punish picture-only play.** In rounds 5–8 the picture's
most salient association is a **foil that is on the board**, and only the clue overrides it:
*trä → Möbler*, *ull/lamm → Kläder/Mat*, *hönan → Djur*, *bänkar att sitta på → Möbler*.

**Cross-round design — the clues argue with each other.** This is where the deck earns the
standard, and it only works because the clues are criteria:

- Round 2 teaches ”**Den har hjul**” → Fordon. Round 8 says ”**Den har inga hjul**, men …” → also
  Fordon. The child cannot hold *fordon = hjul*; they have to move up to *carries you from place to
  place*.
- Round 3 teaches ”**man sitter på den**” → Möbler. Round 8's canoe has visible wooden bench seats
  and `Möbler` on the board. The sitting cue is deliberately made insufficient.

**The honest ceiling — and I want this on the record rather than a stronger claim.**
Rounds 1–4 remain picture-solvable **by design**: they are the on-ramp where a 7-year-old reads
three well-formed category definitions before being asked to depend on one, and they carry the
pronoun teaching (den / det / de). So a picture-only child does not score 0 — they score roughly
4/8 reliably and are genuinely uncertain on the other four. That is a real improvement on 8/8, and
it is not the same as ”the clue is now necessary”.

**The clue cannot be made strictly necessary inside this engine**, because the engine renders the
picture and the clue simultaneously and the picture can never be withheld. If you want that, it is
an engine change — clue first, picture revealed on tap, or picture revealed only after a choice is
committed. **I am not proposing it for this build**; I am naming it so the ceiling is understood
and nobody later reads ”four load-bearing rounds” as ”the picture strategy is dead”.

---

## Appendix A — `strings.sv` (the deck cannot ship without it)

```js
title:      'Olgas överbegreppsträd'
prompt:     'Vilken sorts sak är det?'
oliveIntro: 'Läs ledtråden – vilken grupp tillhör den?'
clueLab:    'Ledtråd:'
theAsk:     'Tryck på gruppen den tillhör.'
hintPick:   'Läs ledtråden och tryck sedan på en grupp!'
hintWrong:  'Inte den gruppen – läs ledtråden en gång till.'
win:        'Precis! Du hittade rätt grupp. 🦉'
```

Two notes for the visual-QA sweep:

- **`title` is 21 characters** and Swedish is the longest in this family. If `#lcs-title` wraps
  badly at 360px, the sanctioned shortening is **`Olgas ordträd`** — it keeps the tree metaphor and
  Olga, and drops only the term, which the page copy carries anyway. Do not shorten by dropping the
  name.
- **`oliveIntro` is clamped to 2 lines** (`-webkit-line-clamp:2`) in a bubble capped at 80% width.
  41 characters should hold at 360px but this is the string to check first.

## Appendix B — one house-style correction

The brief specifies ”em dash with spaces”. **Swedish does not use the em dash.** The Swedish
*tankstreck* is the **en dash `–` (U+2013)** with spaces on both sides; `—` reads as a typographic
import. All Swedish text above uses `–` deliberately. The `”…”` ruling in the brief is correct —
Swedish takes the right-pointing double quote on **both** sides — and I have followed it.
