# Swedish copy — `bundle-bot.bundle-machine.1-nbt-b-2-a` (Lgr22)

Read-only research + copy deliverable. Nothing edited outside this file.

---

## 0. What I measured (not taken from the brief)

| thing | measurement |
|---|---|
| shipped `slug.sv` | **76**, all match `^[a-z0-9-]+$`, 0 violations |
| slug length | min 9 · q1 20 · **median 24** · q3 32 · max 47 chars |
| slug segments | min 2 · q1 4 · **median 5** · q3 6 · max 10 |
| slug carries `-ak-N` | **28 of 76** (majority omit the grade) |
| folding | one-for-one: `jämför→jamfor`, `räkna→rakna`, `längder→langder`, `hoppräkning→hopprakning`, `gör→gor`, `läs→las`. No `ae/oe` anywhere. |
| `page_title.sv` length | min 9 · **q1 39 · median 49 · q3 60** · max 90 (mean 48) |
| `page_intro.sv` length | min 107 · q1 148 · **median 163** · q3 239 · max 460 |
| intros already in 120–170 | 35 of 76 |
| `about` | 3 items modal (53/76); **209/209 end in a period**; median item 352 ch |
| `practices` | 4 items modal (69/76); **303/311 have NO terminal period**; bare capitalised infinitive (`Läsa` 30, `Räkna` 28, `Bygga` 21…); only 4/311 start `Att` |
| `howToPlay` | **exactly 3 in all 76**; **228/228 end in a period**; median 92 ch |
| `learningGoals` | **exactly 3 in all 76**; **216/228 no terminal period**; opens `Barnet kan` (113) / `Barnet bygger` (42) / `Barnet förstår` (21) |

Brief's band for the intro is the **lower half** of the shipped distribution (median 163), not the top quartile. Complied with.

---

## 1. Deliverable

### slug.sv
```
tio-ental-blir-ett-tiotal-och-tillbaka
```
38 chars, 7 segments, `^[a-z0-9-]+$` ✓. No å/ä/ö to fold. **Deliberately carries no grade** — see §4.

### page_title.sv
```
Bults buntmaskin – tio ental blir ett tiotal, och tillbaka igen (åk 1)
```
70 chars — above q3 (60), under max (90), and in line with the current mascot-led sv batch (Kapten Quill 74, Kurre 67, Pip 60).

### page_intro.sv — **159 characters**
```
Roboten Bult buntar inte utan dig: lägg i ental ett i taget, räkna till tio och dra i spaken. Tryck på ett tiotal för att lösa upp det igen. Åk 1 enligt Lgr22.
```
Gate-checked in-session: `FREE_RE` false · `CODE_RE` false · "Common Core" absent · `Lgr22` present.

### prose block for `frontend/messages/activity-content/sv.json`

```json
"bundle-bot.bundle-machine.1-nbt-b-2-a": {
  "about": [
    "Bult är en robot som älskar ordning, men han får inte bunta något utan barnet. Barnet lägger i ental ett i taget, räknar tills det ligger tio i facket och drar sedan i spaken — då blir de tio till ett enda tiotal. Nio rundor bygger tal mellan 23 och 45, och en av dem är 40 med bara hela tiotal och inte ett enda löst ental.",
    "Den stora idén är att tio lösa ental och ett tiotal är exakt lika mycket — samma mängd, bara packad på två sätt. Därför går maskinen åt båda hållen: barnet trycker på ett tiotal och det faller isär till tio lösa ental igen. En runda ber om 32 som 2 tiotal och 12 ental i stället för 3 tiotal och 2 ental, och då är det just upplösningen som löser uppgiften.",
    "Aktiviteten är anpassad till Lgr22 inom taluppfattning och tals användning: naturliga tal och hur de kan delas upp i tiotal och ental. Spaken lyder inte förrän det verkligen ligger tio i facket, så ett för tidigt drag möts av ett vänligt ”inte tio än” i stället för ett rött kryss. Den här interaktiva övningen passar årskurs 1. Ingen timer, inga poäng."
  ],
  "practices": [
    "Räkna tio lösa ental i stället för att lita på att högen ser full ut",
    "Bunta ihop tio lösa ental till ett tiotal med spaken",
    "Lösa upp ett tiotal till tio lösa ental igen",
    "Se att 32 är lika mycket vare sig det är 3 tiotal och 2 ental eller 2 tiotal och 12 ental"
  ],
  "howToPlay": [
    "Läs måltalet högst upp, till exempel 34.",
    "Tryck på knappen för att lägga i ett ental i taget, räkna tills det ligger tio lösa ental i facket och dra sedan i spaken.",
    "Tryck på ett tiotal om du vill lösa upp det igen, och tryck på Kontrollera när talet är färdigt — utan timer och utan poäng."
  ],
  "learningGoals": [
    "Barnet kan räkna ihop tio lösa ental och göra dem till ett tiotal",
    "Barnet vet att ett tiotal kan lösas upp till tio ental igen och att talet är lika stort ändå",
    "Barnet bygger det tiotalsbegrepp som behövs för att förstå vad siffrorna i ett tvåsiffrigt tal betyder"
  ]
}
```

---

## 2. Differentiation

**Ceded (do not appear in my slug / title / intro):**
- `tiotal och ental` — owned **twice**: activity `place-value.tens-and-ones` (title *Tiotal och ental*) **and** the shipped **tool** `place-value-lab`, whose `slug.sv` is literally `tiotal-och-ental`.
- `bunta i tiotal` — owned by the **tool** `counting-cups`, slug `bunta-i-tiotal-rakna-stora-antal-lagstadiet`, title *Tioaskarna – bunta i tiotal och ental, åk 1–2*. **The brief did not name this surface; it is the closest competitor in Swedish.**
- `gör ett tiotal`, `tiotalsövergång`, `växla` — `place-value-regroup.*`.
- `hundratal, tiotal och ental` · `utvecklad form` · `tre sätt att visa ett tal` · `tio mer, tio mindre` · `jämför tvåsiffriga tal` · `hoppräkning`.
- `buntar av sugrör` / `buntar ihop` — `calendar-wall`, `estimation-jar`.

**Owned by this page:** `tio ental blir ett tiotal, och tillbaka igen` — the **reversible** make/un-make, gated by the child's count. 0 repo hits for `lösa upp`, `plocka isär`, `tiobunt`, `buntmaskin` in any shipped sv copy.

Confirmation + sharpening of the brief's reading: the physical act is right, but the sharper claim is **reversibility plus refusal**. `pullLever` refuses below ten (`'refused'`), including on a scatter seeded at 9 that looks full; `unbundle` runs the transform backwards; and one round *requires* the non-canonical form (32 as 2 tens + 12 ones) so decomposition is load-bearing, not decorative. No sibling has a refusal gate or an un-make. Composing/decomposing is the face; *reversibility* is the head term.

---

## 3. English audit (defects all seven locales inherited)

1. **Raw CCSS code in `page_intro.en`** — "aligned to Common Core 1.NBT.B.2.a".
2. **"Build numbers up to forty-nine" is false.** Targets are 23,34,32,29,40,24,36,45,27 → **max 45, min 23**. fr/es/it say "20 to 49" — wrong at both ends.
3. **The intro describes one mode of six** — only build. Never mentions un-bundling, the impostor, the decade round or the seeded start.
4. **"when it's exactly ten"** — the gate is `ones >= 10`; at 11+ the lever bundles and leaves the remainder.
5. **`clumpSizes` is dead data.** `_feed` hard-codes `Core.feed(this.cstate, 1)`; `_peekClump` is defined and never called; `nextClump` is never called from the activity; the die renders `pips(1)`. So `overfill-thirty-six`'s `clumpSizes:[3]` has no effect and that round is mechanically a build round — its band-3 (hardest) placement is unearned.
6. **`speak()` has no `sv` arm** — a Swedish child would hear English ("not ten yet", "Ten ones make one ten", "— all bundled"). Same class as the recorded es/nl place-value-regroup defect.
7. **`numWord()` has no `numWordSV`** — `{w}` in the sv `win` string would render an **English** number word ("Twenty-three — allt hopbuntat!"). Hard blocker for a Swedish ship.
8. **`_win` capitalisation list** `fr|es|pt|it|nl` — `sv` must be added; `{w}` is sentence-initial.
9. **`boltSVG()` aria-label** ternary has no `sv` → falls back to English "Bundle Bot".
10. **`reward.label` is a bare English string** `"Bolt's Tidy Shelf"`, not a per-locale object. `game-collection.js` is **not** loaded by `bundle-bot-activity.html`, so it is dead today — but it is the wrong shape and would leak English to all 11 locales the moment the collection script is added.
11. **`read-state-twenty-four` is one tap** — start 2t/3o = 23, target 24. And the cog is named `read-state` while the prompt never asks the child to read the state.
12. **es intro cites Mexico's SEP** while `speak()` uses `es-MX` — internally consistent, flagged only because §A.13.49 lists es as "los planes de estudio".

**Not a defect (checked):** `bandOrder` shuffles *within* band and preserves band order, so band-1 → band-2 → band-3 progression claims are supported. Only *within-band* ordering is random.

---

## 4. Grade-token sites (sv)

| # | site | value | note |
|---|---|---|---|
| 1 | `frontend/app/[locale]/activities/[slug]/page.tsx` → `GRADE_OVERRIDE['bundle-bot.bundle-machine.1-nbt-b-2-a']` | currently `{de:'2', it:'2', nl:'2'}` | **the machine lever** — add `sv:'1'` or `sv:'2'`; drives chip + JSON-LD + educational level |
| 2 | `page_title.sv` | trailing `(åk 1)` | one token, at the end |
| 3 | `page_intro.sv` | `Åk 1 enligt Lgr22` | one token, at the end |
| 4 | prose `about[2]` | `passar årskurs 1` | one token |
| 5 | `slug.sv` | **none, by design** | a grade change does **not** force a URL change |
| — | manifest `alignment.grade` | `"1"` | shared by all locales — not the per-locale lever |

`STRAND_OVERRIDE` **not needed**: `Number & Operations in Base Ten` auto-maps sv → **"Taluppfattning och tals användning"**, the correct Lgr22 åk 1–3 heading.

## 5. Mascot-name sites (sv)

| # | site | proposed |
|---|---|---|
| 1 | `page_title.sv` | `Bults buntmaskin` |
| 2 | `page_intro.sv` | `Roboten Bult` |
| 3 | prose `about[0]` | `Bult är en robot…` |
| 4 | `strings.title.sv` (activity js) | in-tool title |
| 5 | `strings.qReadState.sv` | the **only** kid-facing string naming him |
| 6 | `boltSVG()` aria-label ternary | needs an sv arm |
| 7 | `reward.label` | English-only today (§3.10) |
| — | `slug.sv` | **none, by design** |

**Bult** — the exact Swedish fastener, keeps the pun and the 🔧 workshop register, 0 collisions across the 76 sv activity titles and the sv tool lexicon. Definite `bulten`, plural `bultar` — no homograph (the `bana→banan` trap does not fire). Only reservation: `Bult`/`bunt` is a near-minimal pair. Alternative if that reads clumsy: **Nita** (rivet; also a Swedish given name), which drops the `bunt` echo entirely.
