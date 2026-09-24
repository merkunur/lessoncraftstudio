# Swedish authoring — `hoppers-number-line` (Hoppers tallinje)

Measured from the artefact 2026-09-08. Rebuild for Lgr22, åk 2. **Nothing applied — plan only.**

---

## 0. Corpus facts I measured (not assumed)

| Claim in the brief | Measured | Consequence |
|---|---|---|
| "grep `page_title.sv` for the mascot roster" | **Gives the WRONG answer here.** `skipcount-activities.json` `page_title.sv` = *"Hoppräkning 5, 10 och 100"* — mascot dropped for SEO. But `skipcount-activity.js:196-197` ships `sv: 'Hoppers näckroshopp'` and `sv: 'Hjälp grodan **Hopper** att hoppräkna från näckros till näckros!'` | **Hopper is ALREADY a shipped Swedish mascot.** Name ruling flips to KEEP. |
| "the `hopp-` root is claimed by a sibling title" | True for the *title* (`Hoppräkning`), false for the *lexicon* — skipcount sv ships `hopp`, `hoppen`, `hoppa`, `hoppräkna` for this same frog | Use `hopp`/`hoppa` freely in strings; keep `hoppräkning` out of `page_title`. |
| `tallinje` "owned four times over" | Confirmed: tools `number-line`→`tallinje`, `open-number-line`→`tom-tallinje`; activities `ten-stones` (title *"Räkna över tian på tallinjen"*), `line-plot` (*"…kryss på tallinjen"*) | Use the word for the child; keep it out of slug + lead of title. |
| — (not in brief) | `ten-stones` sv intro = **"Grodan Lily hoppar längs tallinjen 0–20"**; `pond-juice-activity.js:85` sv = **"Grodan Ebba"** | The sv corpus already has **three** frogs (Hopper, Lily, Ebba). Pre-existing; not ours to fix, but it makes the *concept* differentiation load-bearing. |
| — (not in brief) | `skipcount-activity.js:138` carries a binding sv lexical ruling: **use `näckros`, NOT `näckrosblad`** — *"'blad' är produktens ord för ett utskrivet ark i fem verktyg"* | Binding. Never write `näckrosblad`. |
| voice tag | `lcs-shell.js` `LCSAudio.ttsLang` **already maps `sv → 'sv-SE'`** | Only the tool's own inline fallback (line 29) needs the arm. |
| em-dash branch reachable? | Yes — `lcs-shell.js:880` `api.announce(chrome('tryAgain') + ' — ' + hintMsg)`; `hintKey()` returns `'hintCheck'` unconditionally and the shell `Kontrollera` grades `isCorrect()`, false until the child commits | **sv `hintCheck` must carry no dash.** Note `tryAgain.sv` = *"Inte än — försök igen!"* already has one. |

**Shipped sv mascot roster** (checked): Bult · Kapten Quill · Pip · Mätis · Snäckis · Alva · Tess · Ebba · Tilly · Mim · Kurre · Span · Tore · Lily · **Hopper**.

---

## 1. The two surfaces — 25 items

**Surface 1 — 16 keys** in `strings` (`hoppers-number-line-activity.js:51-68`):
`title` `prompt` `hop` `replay` `fwd` `back` `sizeHint` `sayWelcome` `sayDial` `sayWin` `sayWait` `hintCheck` `ariaStart` `ariaHop` `ariaEdit` `ariaClear`
*(`title` and `sayWait` are double-quoted — English apostrophes. All 16 are live; no dead string.)*

**Surface 2 — 9 `params.rounds[].storyL10n`** in `hoppers-number-line-activities.json`:
`fwd-6-8` · `fwd-9-12` · `back-16-6` · `back-24-9` · `fwd-15-20` · `back-45-20` · `fwd-30-40` · `back-80-50` · `fwd-40-30`
*(spoken on mount + on the 🔊 button, and displayed in `.hnl-storytext`)*

---

## 2. The Swedish — 16 strings

```js
sv: 'Hoppers tallinje'                                              // title
sv: 'Hoppa till svaret.'                                            // prompt  (direction-NEUTRAL — 4 of 9 rounds go backwards)
sv: 'Hoppa! 🐸'                                                     // hop
sv: '🔊 Lyssna igen'                                                // replay
sv: '▶ Framåt'                                                      // fwd
sv: '◀ Bakåt'                                                       // back
sv: 'Hur långt är hoppet?'                                          // sizeHint
sv: 'Läs hoppet och visa det på tallinjen!'                         // sayWelcome
sv: 'Var landar Hopper? Knappa in talet!'                           // sayDial
sv: 'Plask! Mitt på näckrosen. 🪷'                                  // sayWin
sv: 'Hmm, vi hoppar en gång till.'                                  // sayWait
sv: 'Välj var Hopper börjar, åt vilket håll och hur långt. Knappa sedan in talet han landar på.'   // hintCheck — NO DASH
sv: 'börja på {v}'                                                  // ariaStart
sv: 'hoppa {sz}'                                                    // ariaHop
sv: 'ändra hoppet'                                                  // ariaEdit
sv: 'sudda'                                                         // ariaClear
```

### Why each
- **`title`** — mirrors EN exactly, correct term, and the shipped genitive `Hoppers` (already live in `Hoppers näckroshopp`). Feeds the shell's `srIntro` as *"Interaktiv Hoppers tallinje-aktivitet."* — reads fine.
- **`prompt`** — **not** *"Hoppa fram till svaret"*: `fram` prejudges direction and four rounds hop backwards. `Hoppa till svaret.` is neutral.
- **`replay`** — es/pt already chose *listen* over *read*; `Lyssna igen` is what the child actually does (the button calls `speak()`), it's warmer, and it fits `white-space:nowrap`.
- **`fwd`/`back`** — `Framåt`/`Bakåt` are the Lgr22 number-line words (*räkna framåt och bakåt*). ⚠ **`Tillbaka` would be wrong** — it means *return to where you came from*, the exact trap the file's own nl note flags for *Terug*.
- **`sizeHint`** — skipcount sv ships *"Hur stort är varje hopp?"* for the same question. I chose **`långt`** deliberately: a single measured leap along a line is *långt* in Swedish, and it keeps the two pages off each other's phrasing.
- **`sayDial`** — `knappa in` is the Swedish for keying a number into a keypad; a child knows it from *knappa in koden*. `Tryck på` stays reserved for tapping (register rule).
- **`sayWin`** — `Plask!` is the standard Swedish splash. `Mitt på` = dead on. ⚠ Deliberately avoids **`Rätt`**.
- **`sayWait`** — `vi hoppar en gång till` mirrors EN *let's hop again*, uses the shipped verb, zero shame axis, no `Fel`.
- **`hintCheck`** — two sentences, **no em dash and no en dash**, because the shell prepends *"Inte än — försök igen! — "*. `åt vilket håll` is the child-natural Swedish for direction (warmer than `riktning` at åk 2).
- **`ariaClear`** — `sudda` (the rubber, not the tech verb) matches the other locales' terseness. ⚠ See finding **D**: the control clears *everything* behind a ⌫ glyph. If the glyph is not fixed, the honest label is **`sudda talet`**.

### Nouns introduced, with forms + the unfortunate-reading check

| Noun | Indef. | Def. | Plural | Def. plural | Check |
|---|---|---|---|---|---|
| tallinje | en tallinje | tallinjen | tallinjer | tallinjerna | ⚠ `tal+linje` collides orthographically with **`tall`** = *pine tree*; a child can mis-segment *tall-linje*. Unavoidable — it is the term in every Swedish textbook and in two shipped titles. Note, do not act. |
| hopp | ett hopp | hoppet | hopp | hoppen | ⚠ Homonym with **`hopp`** = *hope*. Zero ambiguity beside a frog on a line; already shipped as *"Räkna hoppen"*. |
| näckros | en näckros | näckrosen | näckrosor | näckrosorna | ⚠ Checked `näck-` (dialectal/slang *naken*): no Swedish speaker segments `näckros`; it is the everyday word in every children's book. **Safe.** ⚠ **Never `näckrosblad`** — binding corpus ruling. |
| svar | ett svar | svaret | svar | svaren | clean |
| tal | ett tal | talet | tal | talen | clean (context is arithmetic throughout) |

Not introduced on purpose: **`landning`** (aviation-flavoured — use the verb *landa*, matching de *landet* / nl *landt*), **`riktning`** (correct but formal for åk 2 — `åt vilket håll` used instead), **`starttal`** (coined noun — *var Hopper börjar* used instead), **`steg`** (would add a unit the screen never shows).

---

## 3. The Swedish — 9 stories

Pattern: `Hopper sitter på {start} och hoppar {size} {framåt|bakåt}. Var landar han?`
Matches the shipped nl shape verbatim (*"Hopper zit op 6 en springt 8 vooruit. Waar landt hij?"*). `han` — Hopper is masculine in de (`er`) and nl (`hij`); Swedish follows.

```json
"fwd-6-8":    "Hopper sitter på 6 och hoppar 8 framåt. Var landar han?"
"fwd-9-12":   "Hopper sitter på 9 och hoppar 12 framåt. Var landar han?"
"back-16-6":  "Hopper sitter på 16 och hoppar 6 bakåt. Var landar han?"
"back-24-9":  "Hopper sitter på 24 och hoppar 9 bakåt. Var landar han?"
"fwd-15-20":  "Hopper sitter på 15 och hoppar 20 framåt. Var landar han?"
"back-45-20": "Hopper sitter på 45 och hoppar 20 bakåt. Var landar han?"
"fwd-30-40":  "Hopper sitter på 30 och hoppar 40 framåt. Var landar han?"
"back-80-50": "Hopper sitter på 80 och hoppar 50 bakåt. Var landar han?"
"fwd-40-30":  "Hopper sitter på 40 och hoppar 30 framåt. Var landar han?"
```

Every number re-checked against `params.rounds` and against `Core.landing` (`start ± size`): 14, 21, 10, 15, 35, 25, 70, 30, 70. All land on a tick and inside `[0, max]`. No `{v}`/`{sz}` placeholders in this surface. Round 8 needs no elision in Swedish (unlike it `sull'80`).

TTS note: *"sitter på 6"* is spoken *"sitter på sex"*. That is simply the Swedish six and is said in every maths lesson — no action.

---

## 4. The voice-tag arm

`LCSAudio.ttsLang` in `lcs-shell.js` **already returns `'sv-SE'` for `'sv'`**, so the primary path is correct today. The defect is only in the tool's own inline fallback:

`hoppers-number-line-activity.js:29` — add before the `'en-US'` default:
```js
LANG === 'nl' ? 'nl-NL' : LANG === 'sv' ? 'sv-SE' : 'en-US'
```
Better: delete the inline chain and call `LCSAudio.ttsLang(LANG)` — it is the shell's declared single source of truth and this file silently forked it.

---

## 5. Name ruling — **KEEP `Hopper`**

**Keep.** Not for consistency-in-the-abstract: `skipcount-activity.js` already ships *"grodan Hopper"* and *"Hoppers näckroshopp"* in Swedish for **this same frog**, so a rename would create a fourth Swedish pond animal and orphan the sibling.

**Honest reading for a Swedish 7-year-old:** it does **not** read as a Swedish name. It reads as a near-miss of **`hoppar`** (*jumps*) — and, to any child with Norwegian or Danish around them, as literally *hopper* = *jumps* in those languages. So it lands as *"the one who hops"*: a transparent nickname rather than a name. That is serviceable and a child will not stumble on it, but it is a weaker name in Swedish than in English, and *"Hopper hoppar"* stutters in prose — which is why the stories say `Hopper sitter … och hoppar` rather than opening on the verb.

**Genitive: `Hoppers`** — ends in `-r`, so a plain `-s` is correct and no double-s question arises. Already live as `Hoppers näckroshopp`; my `title` reuses it.

**Rejected alternatives, with reasons** (for the record, should the operator ever want a rename):
- **`Skutt`** ❌ — *Lille Skutt* is the hare in **Bamse**, Sweden's biggest children's comic. Same class as the Disney-dog finding.
- **`Plopp`** ❌ — a Cloetta chocolate bar; every Swedish child reads the sweet.
- **`Kalle`** ❌ — *Kalle Anka* is Donald Duck.
- **`Plask`** ❌ — it is the word `sayWin` needs; naming the frog after the splash makes the win line ambiguous.
- **`Grodis` / `Näckis`** ❌ — the roster already carries two `-is` names (Mätis, Snäckis).
- **`Kväk`** — the only genuinely good alternative (frog-specific croak; `Pip` sets the sound-as-name precedent; clean genitive `Kväks`). **Not recommended** solely because Hopper is already shipped.

---

## 6. Keeping this page off `tallinje` (bonus — beyond the 25)

Four owners: `number-line`→`tallinje`, `open-number-line`→`tom-tallinje`, `ten-stones` (*"Räkna över tian på tallinjen"*, åk 1), `line-plot` (*"…kryss på tallinjen"*, åk 2).

⚠ And the near-neighbour is not only the word: **`ten-stones` is already a Swedish frog hopping on a number line doing addition and subtraction.** The honest separation is the *cognition*, and it is real:

| | `ten-stones` (åk 1) | this page (åk 2) |
|---|---|---|
| line | 0–20, unit ticks | 0–100, **ticks every 2, 3, 5 or 10** |
| hop | two hops, bridging the ten | **one** hop of a stated size |
| child does | make-a-ten / tiokompisar | place the start, choose framåt/bakåt, choose the length, **compute** the landing |

So lead on **`räkna framåt och bakåt`** (the Lgr22 phrase, unclaimed in the sv roster) and let `tallinjen` appear once, in the body:

- `slug.sv` → **`rakna-framat-och-bakat-inom-100-ak-2`** (folds clean: å→a, ä→a, ö→o; matches `^[a-z0-9-]+$`)
- `page_title.sv` → **"Räkna framåt och bakåt inom 100 – ett hopp på tallinjen (åk 2)"**
- `page_intro.sv` → open on the operation and the scaled line, name Hopper second, say `tallinjen` once. Do **not** reuse *"addition och subtraktion"* as the lead — `number-bond` sv already runs *"Lästal upp till 100 – addition och subtraktion för årskurs 2"*.

---

## 7. English audit — 9 findings

Ordered by how much they change what the child gets.

**A. ⭐⭐ The core's central claim is not kept by the render — the landing can be read off the line in all 9 rounds.**
`numberline-jump-core.js:9-10`: *"The landing is shown as '?' on the line until dialed, so it must be COMPUTED, not read off."* But `_renderLine` draws the lily at `_pct(land)` (line 182) while `hnl-ticklab` prints the value of **every** tick (line 171). In `fwd-6-8` the lily sits directly above a visible **14**. The `?` hides the badge numeral, not the position. A child can read the answer against the labelled axis instead of computing it — in every round. Either the docblock claim is false, or the lily should not draw until after `_commit`, or the ticks should carry only anchor labels.

**B. ⭐ The difficulty of the *scale* runs backwards against the bands.**
Band 1 contains `step: 3` lines (`fwd-9-12`, `back-24-9`: 0, 3, 6, 9 … 30); band 3 contains only `step: 10`. So the **easiest** band has the **hardest** line to read and the hardest band has the easiest. The bands grade arithmetic and ignore the reading of the scale. Separately: a 3-step number line is not a shape a Grade-2 / åk-2 child meets in mainstream curricula — 2, 5 and 10 are.

**C. ⭐ The mascot is de-personified in the only language nobody reviews.** All 9 English stories ask **"Where does *it* land?"** while de says `er`, nl says `hij`, fr repeats the name. The same file contradicts itself two lines away: `sayDial.en` = *"Where does **Hopper** land?"* and `page_intro.en` = *"which number **Hopper** lands on"*. Fix: *"Where does he land?"*.

**D. `hintCheck.en` says "the way" for a thing the UI calls Forward/Back.** Every other locale says *direction* (Richtung / direction / dirección / direção / direzione / richting). English is the outlier and the vaguer word. And EN, de, pt and it all put a dash *inside* `hintCheck`, which `lcs-shell.js:880` then prefixes with `tryAgain + ' — '` — the English announce reads **"Not yet — try again! — Set the start, the way, and the hop size — then dial the landing."** Three em dashes in one spoken sentence.

**E. The ⌫ glyph lies about what the control does.** `_clearDial` (line 199) sets `dialed = null` — it clears **everything**. A child correcting the second digit of *70* loses both. The aria-label (*clear*) is honest; the icon promises backspace. Either implement a real backspace (`Math.floor(this.dialed/10) || null`) or change the glyph to ✕.

**F. Selection state is invisible to a screen reader, and all three controls toggle.** The tick buttons, the two direction buttons and the size chips signal selection **only** through the `hnl-on` CSS class — no `aria-pressed` anywhere. `ariaStart`/`ariaHop` label the *action*, never the *state*. Because `_setStart`/`_setDir`/`_setSize` all toggle, a screen-reader user cannot tell whether their tap selected or **de**selected, nor what is currently chosen.

**G. The story and the 🔊 button vanish exactly when the question is asked.** Line 111 renders the story only while `!ready`. The instant the model is complete, `sayDial` asks *"Where does Hopper land?"* — and at that moment the sentence and the replay control are gone, leaving `6 + 8 = ?`. A child who needs to re-hear it must press ↺ and rebuild the model. The recap carries the numbers, so this is a judgement call rather than a bug, but the replay affordance disappears at the point of maximum need.

**H. `sayWelcome` and `sayDial` are never spoken and never announced**, despite the `say…` prefix. They are display-only in `hnl-saytop` (line 105). Only `sayWin`/`sayWait` reach `api.announce`; only the *story* reaches `speak()`. No dead string — but the naming misleads the next author, and it means the two strings that carry the actual instruction are the two a non-reader never hears.

**I. Rounds 7 and 9 are the same fact reversed onto the same lily.** `fwd-30-40` and `fwd-40-30` both land on **70**, both band 3, both `max:100 / step:10`, and `50` is a decoy in both. In a nine-round pool that is a fifth of the deck spent twice. Deliberate commutativity is a defensible reading — nothing in the data or the copy says so.

*(Checked and clean: all 16 strings are reachable; every story's numbers match its round; `_pushDigit`'s `>100` cap admits every landing; `startOnTick`/`sizeOnTick`/`onLine`/`withinHundred` hold for all 9 rounds; `it` handles the `sull'80` elision.)*

---

## 8. If applied — files touched

1. `mini tools/hoppers-number-line-activity.js` — 16 `sv:` arms + the `sv-SE` voice arm (+ an `sv` block comment, matching the it/nl precedent).
2. `mini tools/hoppers-number-line-activities.json` — 9 `storyL10n.sv` + `slug.sv` + `page_title.sv` + `page_intro.sv`.
3. Cache-buster: `?v=N` on the wrapper's script tag **and** `ACTIVITY_WRAPPER_VERSION` (§A.13.42 — two levels).
4. 0 lines to `numberline-jump-core.js` / `lcs-shell.*` / Direction A CSS.

Gates: `verify-activity-content-sv` · `preflight-activity-routes` · `tsc --noEmit` · `visual-qa-activity.js --activities=hoppers-number-line.jump-sums.2-md-b-6 --widths=320,360,412,768,1024,1366` · personal Read at 768/1024/360.
