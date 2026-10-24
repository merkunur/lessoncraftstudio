# #93 — Bo's Berry Pantry → THE STRETCHING DOOR TAG (1.NBT.B.2, all 11 locales)

ORDER row 93 · id `bos-berry-pantry.slingshot-tens.1-nbt-b-2` (kept). Design: `designs/093-bos-berry-pantry.md`.

## Files and wiring
- **New files:**
  - `mini tools/door-tag-core.js`: the round tables, the shelf (deck, bowl of nine, lip), fling / take-back, wheels, hooks, packing, the crack-count, check / hint / compare, and the plan. It replaces the old shared `slingshot-tens-core.js`, which only the old pantry used.
  - `door-tag-activity.js`
  - `door-tag-activity.html`, which loads `lcs-pictures.js`.
  - CSS prefix `sdt-`.
- **Pictures:** Bo is forest creatures/rabbit (mirrored to face the shelf). The berry kind rotates per round through fruits/strawberry, blueberry, raspberry and blackberry, on the basket at 96 / 64 px. Everything counted on the shelf is drawn apparatus: sealed crates with a bead emblem, and berry beads in the kind's colour.
- **Words-mode cards** are GENERATED from `scripts/worksheet-gen/lib/number-words.js` into a marked block (scratchpad `dt-words.js`), never a hand table. The gate checks every card against the SoT.
- **Manifest:**
  - The row stays in `bos-berry-pantry-activities.json`. `tool` is repointed, and `params` mirrors the core.
  - en..nl slug, title and intro are frozen (sha1 `c1b7be20…`, checked).
  - sv/da/no/fi are new.
- **Route:** `ACTIVITY_WRAPPER_VERSION` 9.834. The existing grade and strand overrides are kept.
- **Legacy gates step aside:** `verify-slingshot-tens-core.js` and `local-test-bos-berry-pantry.js` exit 0 with a pointer while the row runs the Door Tag.
- **Sources:** scratchpad `dt-manifest.js`, `dt-meta.json`, `dt-strings.json` + `dt-apply-strings.js`, `dt-words.js`, `dt-prose.json`, `dt-dump.md` (the reviewer's text), `dt-fix1.js`, `dt-fr.js`, `dt-probe.js`.

## The invention
**Bo's door tag stretches apart into tens and ones.**
- **The stretch:** 34 becomes 30 and 4, and the hidden 0 rolls out. Each part hangs over the crates or the bowl it counts, while the crates are counted by tens and the loose berries by ones. A count that misses its part turns coral.
- **Four round types:**
  - STOCK: sling crates and berries to make the tag's number (or the word on the order card);
  - LABEL: write a stocked shelf's number on two wheels;
  - STRETCH: hang a tens plaque and a ones plaque;
  - OVERFLOW: a full bowl with a spill; write the number.
- **Ten loose ones are a ten:** the bowl has nine dimples and the ones wheel stops at 9. A right total with a spill is packed by Bo into a crate (shown, not refused).

## Rulings this build made
- **Reviewer (MUST), no answer in the count row.** In LABEL and STRETCH the shelf is given, so its crate/berry counts ARE the answer. They now appear only from the second miss. On the first miss only the wrong wheel or hook turns coral. STOCK counts describe the child's own build, and OVERFLOW counts ("10 | 14") still need regrouping, so both show from miss 1.
- **Reviewer (SHOULD), words mode:** the tag's numeral stays hidden until the second miss, so the child must read the word.
- **Overflow kinds:** a reversed or crate-counted-as-one answer in an overflow round is named as such before the "ten loose make a crate" fallback.
- **Overflow success** packs ten berries into a crate, so the shelf shows what the number says. The old "2 crates and 3 berries" message stood over a shelf of 1 crate and 13 loose.
- **No grey total under the wheels:** it would write the answer after one miss (the design asked for it; it is dropped).
- **The sling:** tap a pile to load it, then pull the pouch back and let go, or tap the same pile again (the design's double-tap quick path, made a deliberate second tap). Keyboard C / B fling, Backspace takes back.
- **Phones:**
  - two rows of crates, and a 44 px hit area on the last crate or dimple (take-back);
  - the spill lies along the whole shelf lip in one row;
  - rounds without a sling put Check between Bo and the basket, and the basket is dropped on the smallest screens;
  - 58 / 42 columns at < 330 px;
  - everything stays above the fold down to 320 × 640.
- **Plaques:** tap a plaque, then a hook (no drag). A hung plaque taps back off.
- **Reviewer SHOULD fixes, applied:**
  - "after a second wrong try" in every locale (the crates open after the second MISS);
  - en "no loose berries";
  - de "so viele …, wie auf … steht", "ein Zehner";
  - da "Cifre", "tiercifferet";
  - sv "Skjut lådor och bär upp på hyllan" (skjuta upp = postpone);
  - no "spretterten … den";
  - fi "eikä yhtään", the about[1] clause;
  - it "La cifra {t} di {n}" (no "Il 8"), "sfusi", "vale dieci";
  - es/pt "vale diez/dez";
  - pt "para tirar";
  - fr "70, c'est …".

## Gates
| Gate | Result |
|---|---|
| verify-door-tag-core (details below) | 7,786 / 0 |
| mutate-door-tag | 18 / 18 killed, control survives |
| local-test-door-tag (details below) | 24,453 / 0 |
| visual-qa | 66 renders green |
| hierarchy | 276 / 0 |
| settings-efficacy | 2 live |
| preflight, prose-claims, serp-copy | green |

**What verify-door-tag-core checks**, against its own oracle (the design tables as text, split here):
- tens ≠ ones and no doubled digit; overflow rounds have a full bowl, a spill, and tens = crates + 1; nothing past the range or the deck;
- the racks hold the right pair, both face values and a reversal, never shown right-pair-first;
- EVERY build in every stock round: right, packed, reversal, face, overflow, and the compare;
- EVERY wheel pair in every label/overflow round, with the kinds and the packing;
- EVERY plaque pair;
- the crack-count counts a crate as ten;
- the plan: no same number side by side, never three of a type in a row, the seed replay;
- the words cards equal number-words.js;
- the pictures.

**What local-test-door-tag covers:**
- 11 locales, with REAL taps, a REAL sling pull and the keyboard:
  - stock 34: hintEmpty → pull → 4 crates + 3 berries → the stretch, the crate count 40 coral, hintReverse → take back → okBuild;
  - stock 28 in words: the card, then C + B×18 → packed → okPack;
  - label 25: 5 · 2 → coral wheels with NO counts, then the counts at the second miss → okBuild;
  - stretch 63: 6 + 3 → hintFace → 60 + 3 → okBuild;
  - overflow 23: 1 · 3 → hintOverflow → 2 · 3 → okPack.
- Every round of both ranges at rest, at miss 2 and solved, each reached ONCE, then resized 320–1366: the fold, ≥ 44 px, pictures ≥ floors, the tag's parts over the deck and the bowl.
- Poison: the phone plaque at 40 px fails 4× at 360 and 0× at 1366.

## Open (page metadata — for the operator)
- **en / de / nl / it / pt / fr intros** still describe the old game: choosing or slinging to "the matching shelf", "read Bo's pile".
- **de:** slug/title "Klasse 2" (defensible, because the range to 100 is Klasse 2 in Germany).
- **pt:** title "2º ano".
- **it / pt:** "fino a circa 85" / "até 85" (the range goes to 99).
- **fr:** "jusqu'à 100".
- **es / it:** no-sign-up claims ("sin registro", "senza registrazione").
- None of these were changed, because they are frozen metadata.
