# sv #25 — Sentence Clinic (`sentence-clinic.fix-it.l-2-1`): Swedish design ruling

**Status:** design ruling only (plan mode). No files changed.

## Measured facts established this session

Source: Skolverket syllabus database, `syllabuswebb.skolverket.se`.

- **svenska, GRGRSVE01, åk 1–3**, Läsa och skriva:
  - "Språkliga strukturer och normer. Grundläggande skrivregler, med gemener och versaler, de vanligaste skiljetecknen samt stavning av vanligt förekommande ord i elevnära texter."
  - "Gemensamt och enskilt skrivande. Strategier för att skriva ord, meningar och olika typer av texter…"
  - "Grundläggande textbearbetning."
  - Språkbruk: "Skillnader mellan tal- och skriftspråk."
  - ⚠ **`meningsbyggnad` does NOT appear. `ordklasser` does NOT appear.**
- **svenska som andraspråk, GRGRSVA01, åk 1–3**:
  - "Språkliga strukturer och normer. **Ords böjningsformer och meningsbyggnad med sambandsord**, i jämförelse med andra språk eleven kan."
- **svenska åk 4–6**: "Meningsbyggnad, med huvudsatser, bisatser och skiljetecken samt textbindning" · "Stavning, ords böjningsformer och **ordklasser**."

→ #23's cited bullet ("gemener och versaler, de vanligaste skiljetecknen") **is** the svenska bullet. Not the SVA one. That citation is sound.

## Engine facts (read from source)

- `fix-it-core.js:143-145` — `split` inserts the mark **and auto-capitalises the next token** (`t[seamIndex+2] = cap(...)`). No capitalisation contradiction. `replacement` is declarative.
- `fix-it-core.js:127-129` — `reorder` `repairCorrect` accepts **exactly one** index array. Any second grammatical Swedish order = marked wrong. ⚠ design-law hazard.
- `sentence-clinic-activity.js` `speak()` — `u.lang` ladder has no `sv` branch → **falls through to `'en-US'`**. Must be fixed in the sv build.
- `promptSwap` en/de/… = "the word that **sounds wrong**". Breaks for any orthographic fault.

## Rulings

1. **Årskurs 2** — holds.
2. **Collision with #23 is real; design it out at zero cost** — shift the fault inside the same action.
3. Seven rounds:

| # | action | Swedish teaching point | tokens |
|---|---|---|---|
| 1 | capitalize | stor bokstav i **namn**, mid-sentence | `["Min","hund","heter","bella","."]` t=3 → `Bella` |
| 2 | insert-punct | **frågetecken** | `["Vad","heter","din","hund"]` gap=4 → `?` / `.` `!` |
| 3 | swap | **å → och** (tal vs skrift) | `["Jag","å","min","bror","cyklar","."]` t=1 → `och` / `o` `åh` |
| 4 | insert-word | missing verb (functional gloss, no ordklass term) | `["Katten","mjölk","."]` gap=1 → `dricker` / `glad` `snabbt` ⚠ no copula distractor |
| 5 | reorder | omvänd ordföljd after fronted tidsord | `["cykla","jag","ska","Imorgon"]` order `[3,2,1,0]` — capital-locked |
| 6 | delete | duplicated **function word** | `["Vi","gick","till","till","skogen","."]` t=3 |
| 7 | split | satsradning | `["Jag","sprang","det","var","roligt"]` seam=1 |

4. **Rejected:** var/vart (design law + mellanstadiet), de/dem (högstadiet + contested), doubled subject (*Min mamma hon…* is real spoken left-dislocation), subject–verb agreement (does not exist).
5. **Frame shift:** Swedish must be "**blir rätt / rätt skriven**", not "låter rätt". 3 of 7 Swedish faults are inaudible.
6. **Character:** Doktor Plåster (0 collisions). Fallback: Fixar-Fia.
