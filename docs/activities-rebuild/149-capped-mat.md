# #149 — Hundreds, Tens, and Ones → THE CAPPED MAT (2.NBT.A.1; all 11 locales)

ORDER row 149 · id `place-value.hundreds-tens-and-ones.2-nbt-a-1` (kept). Design: `designs/149-place-value.md`.

## The invention
- **The place-value mat closes only when every column wears a numeral cap.**
  - A cap holds one digit, so a column takes at most nine blocks. The tenth is refused, and a rod or flat outline appears over the next column: ten ones make one ten.
  - **An empty column still needs its 0 cap.** Left bare, it folds shut, the other caps slide together, and 307 reads 37. That is the classic zero-placeholder slip, made visible.
- **Jobs (settings):**
  - **Build** — the ticket shows the number; + / − under each column. At Check the caps drop and read what was BUILT, not the target.
  - **Read** — cap given blocks by tapping a seat and then a cap, by dragging a cap, or by typing the digit. Blocks are tidy, or jumbled in a delivery tray where each pile is tapped across to its column.
  - **Match** — drag the ticket onto the tray that shows the number. With jumbled blocks, the trays lay their groups out of H-T-O order.
- **Miss 1:** a hint, with the differing column or tray glowing.
- **Miss 2:**
  - outlines where blocks are missing and crosses on extra blocks (both at once when both are wrong);
  - a faint 0 cap on the bare column;
  - numbered blocks for a wrong cap;
  - caps shown on every tray.
- **Success:** the lid closes over the blocks; the bubble reads "6 hundreds, 0 tens and 4 ones: 604."; Next follows 0.5 s later.

## Files and wiring
- **New:**
  - `mini tools/capped-mat-core.js` (`CappedMatCore`): tables, add/remove with the tenth refusal, delivery, caps, fold, check, literal hint keys, the plan.
  - `capped-mat-activity.js` (`CappedMatActivity`, prefix `cm-`, `apparatusClasses: ['cm-art']`).
  - `capped-mat-activity.html`.
- **Manifest:** the row stays in `place-value-activities.json`; only `tool` → `capped-mat-activity` and `task_template` change. Slug, title and intro are frozen.
- **Route:** `ACTIVITY_WRAPPER_VERSION` 9.893 → 9.894.
- **Prose ×11:** rewritten. Grade claims follow the reviewed bands for numbers to 1000:
  - de: 3. Klasse
  - fr: CE1
  - es: SEP segundo grado
  - pt: BNCC 2º ano
  - it: classe terza
  - nl: groep 5
  - sv: åk 3
  - da: 2. klasse
  - no: LK20 etter 3. trinn
  - fi: 2. luokka
  - ⚠ The frozen de page title says "Klasse 2"; it is metadata and is left untouched.
- **Narrow stages:**
  - The delivery fans its flats sideways only, and its padding tightens at cramp, so Check stays above the fold at 320 in every locale (pt and fi were 1–11 px under it).
  - The column dividers are drawn as straight ::before lines.

## Native + pedagogy review (one reviewer, all 11)
Fixed at the source:
- **`hintZeroFold` gave the answer away at miss 1 (all 11).**
  - It printed `{n}`, and in Read that number is shown nowhere: it is the answer. It now quotes only what the caps read (`{fold}`).
  - The gate asserts `{n}` is absent; two mutations prove it can fail.
- **The mat had a second name on screen** (Matte / tapis / tapete / tappetino / matta / måtte / matto) while the prose said Tafel / tableau / tablero / tabuleiro / tabella / bräda / bræt / taulu. The strings now match the prose.
  - nl and no instead changed their prose: in no, "brett" is the tray, and in nl, "kaart" sits too close to "kaartje".
- **fr:** U+202F before ? and : and inside « » in every string; "1 000" uses a narrow no-break space; caps "affichent", not "lisent".
- **es:** "agregar", not "añadir".
- **sv:** "en nolla"; "i kolumnen för {place}".
- **nl:** "van de", "zijn dop", "hoopje".
- **Grammar fixed:** de learningGoals 2; fi learningGoals 2 and `aCol`.
- **no:** "etter 3. trinn".
- **Rejected (checked in code):** "Match never has jumbled blocks" — it does (`trayOrder`).

## Gates
- `verify-capped-mat-core.js`: 1,938 / 0.
- `mutate-capped-mat.js`: 32 / 32 killed, control passes. Its first run left one survivor: a refusal hint routed nowhere. The fix is a check that the core's keys reach the screen through the activity's translator.
- `local-test-capped-mat.js`: 2,497 / 0 — real pointer taps and drags, 11 locales, six states × 320…1366.
- `visual-qa-activity`: 648 / 648; phase driver `visual-qa-phases/place-value.hundreds-tens-and-ones.2-nbt-a-1.js`.
- `audit-activity-hierarchy`: 596 / 0.
- `audit-settings-efficacy`: both settings live.
- Also passing: next-delay; content ×11; prose claims; SERP; tells; route preflight.
- Read by me: the 360 / 768 / 1024 renders (rest, help, fold, tray, solved).

## Live
Deployed 2026-10-28 (commit `c4bf683b`; mini-tools and the manifest copied before `deploy.sh`; preview scp'd). `live-verify-capped-mat.js`: **68 pass, 0 fail** (all 11 pages 200; en, de, sv, fi × 1366 / 390: a wrong build read by the caps, the right build closes the lid, the 307 fold, the 0 cap). The first run caught Cloudflare's cached copy of the old page, not a defect.
