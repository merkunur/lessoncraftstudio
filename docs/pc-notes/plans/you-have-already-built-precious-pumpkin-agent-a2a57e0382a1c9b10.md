# Swedish authoring — `line-plot-activity` (Shelly's Tide-Line → Krysses snäckstrand)

Native-Swedish rebuild for 2.MD.D.9. Measured against `mini tools/line-plot-activity.js`,
`line-plot-core.js`, `line-plot-activities.json`, `lcs-shell.js`, `graph-it-activity.js`,
`frontend/app/[locale]/activities/[slug]/page.tsx`, `frontend/lib/seo/strand-names.ts`.

---

## 1. The 18 keys — enumerated from source

`strings` (8, lines 138–147): `title` `instruction` `qplot` `qAt` `qLonger` `qMode` `qDiff` `qMore`
`var L` (10, lines 24–36): `win` `winPlot` `winAt` `winMode` `winNum` `nPlot` `nRead` `srJoin` `srPlot` `srRead`

All 18 are reached (no dead string). `srJoin` is reached only on `read` rounds — see defect D3.

---

## 2. The Swedish

### `strings`
| key | Swedish |
|---|---|
| `title` | `Krysses snäckstrand` |
| `instruction` | `Hjälp eremitkräftan Krysse att mäta snäckor och läsa av kryssen över tallinjen!` |
| `qplot` | `Hur många cm är den här snäckan? Tryck på längden för att sätta ett kryss.` |
| `qAt` | `Hur många snäckor är {n} cm långa?` |
| `qLonger` | `Hur många snäckor är längre än {n} cm?` |
| `qMode` | `Vilken längd är vanligast?` |
| `qDiff` | `Hur många cm längre är den längsta snäckan än den kortaste?` |
| `qMore` | `Hur många fler snäckor är {a} cm än {b} cm?` |

### `var L`
| key | Swedish |
|---|---|
| `win` | `Precis — {note}!` |
| `winPlot` | `krysset sitter vid {a} cm` |
| `winAt` | `{a} snäckor` |
| `winMode` | `{a} cm är den vanligaste längden` |
| `winNum` | `svaret är {a}` |
| `nPlot` | `Titta var snäckan slutar på tallinjen.` |
| `nRead` | `Titta en gång till på kryssen över varje tal.` |
| `srJoin` | `{c} vid {v} cm` |
| `srPlot` | `Ett kryssdiagram med tallinje från 1 till {max}. En ny snäcka är {len} cm lång. Tryck på längden för att sätta krysset. Alternativ: {choices}.` |
| `srRead` | `Ett kryssdiagram med tallinje från 1 till {max}: {dist}. {q} Alternativ: {choices}.` |

Punctuation convention: `win` carries the final `!`; the five notes carry none (de/it convention,
not the EN one). `win`'s em dash is safe — see D7.

### Singular arm (line 311)
```js
: (LANG === 'sv' && a === 1) ? 'en snäcka'
```
Strictly `=== 1`, never `<= 1` — Swedish takes the **plural** after 0 (`0 snäckor`), unlike the
French `a <= 1` arm beside it.

---

## 3. Nouns

- **shell = `snäcka`** — `en snäcka / snäckan / snäckor / snäckorna`. The beach-collecting word.
- ⛔ **`mussla` is Swedish slang for the vulva.** Never ship it. (It is also a bivalve — wrong animal.)
- `snäckskal` — correct but neuter, uninflected plural, heavy. Not needed.
- ⛔ `skal` alone reads as *peel* (bananskal). Reject.
- apparatus: child-facing **`tallinjen`** + **`kryssen`**; SR/SEO **`kryssdiagram`** (coined, transparent).
- ⛔ `linjediagram` = connected line graph. ⛔ `punktdiagram` = scatter plot. ⛔ `stapeldiagram` is Pip's.
- verb: **`sätta ett kryss`**. ⛔ never `plotta`.
- ⛔ **`Val:` = whale.** Use `Alternativ:` in both SR strings.
- `tallinje` is established and already shipped (`open-number-line.js`, `ten-stones-activity.js`).

---

## 4. Mascot

`Shelly` → **`Krysse`**, genitive **`Krysses`** (no apostrophe in Swedish).

Roster checked (12 shipped): Bult, Span, Kurre, Mim, Tore, Kapten Quill, Alva, Ebba, Tilly, Mätis,
Tess, Pip. Rejected: `Ebbe` (collides with Ebba), `Skalman` (Bamse), `Nicke` (Curious George),
`Snurre` (Bugs Bunny), `Skalle` (= skull), `Snäckis` (ends in -s), any `snäck-` name (the crab would
share its name with the objects it measures — a confusion English does not have).

---

## 5. English audit — findings

- **D1** `winAt` has no `a === 1` arm in **en**, though de/fr/es/pt/it/nl all do → "1 shells!". Latent.
- **D2** `srPlot`/`srJoin`/`winPlot`/`qplot`/`qDiff` omit **cm** in en only. Plot rounds are unitless in EN.
- **D3** `_srMirror` computes `dist` then discards it on plot rounds — the SR user is never told what
  is already on the plot, yet is told `{len}` and `{choices}`, so the round is trivial. Fix = pass `dist`.
- **D4** `nearNums` puts the answer at the numeric **middle** of three consecutive choices whenever
  1 ≤ a ≤ 7 → **10 of 11 shipped rounds solvable by "tap the middle number"**. Core-level, all locales.
- **D5** `modeOf` returns the lowest of tied modes and `winMode` calls it "the most common". No
  uniqueness guard in `facts`. Shipped round is safe (unique mode 6).
- **D6** `qMode` distractors are the two **smallest** other present lengths → answer is the largest.
- **D7** The shell's `tryAgain + ' — ' + hint` path (line 880) is **unreachable** here: Check is
  `display:none` until `.shelly-resolved`. The em-dash ban does not bind; honoured anyway.
- **D8** `moreAB` can go negative; `nearNums` would emit choices below 0. Latent.
- **D9** After two wrong taps only the correct card is live, but the nudge still says "Look again".
- **D10** ✅ `longerN` is strictly `>`, matching "longer than". No off-by-one.
- **D11** ✅ `winNum` is correctly unitless — it serves both `maxMinusMin` (cm) and `moreAB` (a count).

---

## 6. Adjacent (outside the 18)

`page.tsx` line 215 `'line-plot.read.2-md-d-9'` has de/fr/es/pt/it/nl but **no `sv`** → falls through
to the auto-map **`'Mätning och data'`**, a Common-Core calque absent from Lgr22. Sibling graph-it
(line 214) already carries `sv: 'Sannolikhet och statistik'`. **Add `sv: 'Sannolikhet och statistik'`.**

`page_title`: `Krysses snäckstrand – läsa av ett kryssdiagram (åk 2)`
`slug`: `lasa-kryssdiagram-tallinje-ak-2`
