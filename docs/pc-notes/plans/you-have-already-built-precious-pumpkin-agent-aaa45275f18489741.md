# SV landing copy + prose — clock-digital read-hour / read-half-hour (1.MD.B.3)

Authored against the artefacts, not from memory:
- `mini tools/clock-digital-activities.json` (rounds, EN/de/fr/es/pt/it/nl copy)
- `mini tools/clock-digital-activity.js` (`var L` line 17, hint dispatch line 412, `spoken()` line 128, `sprocketSVG()` line 244)
- `mini tools/clock-core.js` (shipped sv clock lexicon, lines 54–88)
- `mini tools/clock-activities.json` (the shipped sv SET activity — collision source)
- `frontend/messages/activity-content/sv.json` (`prose` — 66 entries; `clock.set-clock` at 469, `clock.tell-time-5-min` at 695)

## 1. Slugs — chosen family `lasa-klockan-*`

| row | slug.sv |
|---|---|
| `clock-digital.read-hour.1-md-b-3` | `lasa-klockan-hela-timmar-ak-1` |
| `clock-digital.read-half-hour.1-md-b-3` | `lasa-klockan-hela-och-halva-timmar-ak-1` |

Reads as READING (`läsa` → `lasa`), no collision with the shipped SET pair
(`stall-klockan-hela-och-halva-timmar-ak-1`, `stall-klockan-pa-5-minuter-ak-2`);
verb is the discriminator, exactly as German did (`uhr-ablesen-*` vs `stell-die-uhr-*`).
Folding checked: ä→a, å→a, ö→o; grade token `ak-1`.

Headroom left for the rest of the engine + siblings:
`lasa-klockan-kvart-over-och-kvart-i-ak-2`, `lasa-klockan-pa-5-minuter-ak-2`,
`lasa-klockan-pa-minuten-ak-3`, `para-ihop-analog-och-digital-klocka-ak-2`.
`vad-ar-klockan-*` deliberately NOT taken — reserve it for `clock-read.tell-time.1-md-b-3`
(EN "Owl's Cuckoo Cottage — Read **and Set** the Clock", a different mascot and a
combined read+set verb, so it must not be squeezed into the `lasa-klockan-` family).

## 2. page_title.sv / page_intro.sv

read-hour:
- title: `Läsa klockan – hela timmar på analog klocka för åk 1`
- intro: `Läs den analoga klockan och tryck på rätt digital tid. Hela timmar, som klockan 3 = 3:00 — ett första steg i att lära sig klockan. Följer Lgr22. För åk 1.` (~152)

read-half-hour:
- title: `Läsa klockan – hela och halva timmar på analog klocka för åk 1`
- intro: `Läs den analoga klockan och tryck på rätt digital tid — hela och halva timmar. Barnet läser båda visarna och ser att halv fyra är 3:30. Följer Lgr22, åk 1.` (~155)

Deliberate divergences from the German model: no mascot in the title (Sprocket has no
Swedish name and no search volume — the first 30 characters go to `Läsa klockan`);
no "gratis"; framework NAME only, no CCSS code.

## 3. If the pedagogue rules åk 2 — exact changes
slug token `ak-1`→`ak-2` (both rows) · title `för åk 1`→`för åk 2` · intro `För åk 1.`→`För åk 2.`
/ `Lgr22, åk 1.`→`Lgr22, åk 2.` · prose `för årskurs 1`→`för årskurs 2` (about[0]) and
`passar årskurs 1`→`passar årskurs 2` (about[2]). Nothing else moves — no Swedish
content claim in the copy is grade-bound.
Note: a split ruling (hour = åk 1, half-hour = åk 2) is the es/it precedent and is
internally consistent; the shipped sv SET pair is åk 1 / åk 2 on the same split logic.

## 4. Blocking finding
`clock-digital-activity.js` has **no `sv` in `L` (line 17) and no `sv` in `strings.title`
(line 259) and no `sv` branch in `spoken()`** — shipping these sv rows without an sv
engine block renders the whole in-activity UI in English ("What time is it?",
"Sprocket's Clock", "Yes! half past 3."). An sv `L` block + `spoken()` branch must land
in the same commit. `spoken()` sv MUST be toward-next-hour (`halv 4` = 3:30) to agree
with the shipped `clock-core.js` `timeExpr` sv (`halv 8` = 7:30).

## 5. English-source defects found (details in the report)
1. "A free interactive …" in both `page_intro.en` — false (trial-only); every locale copied it.
2. "Sprocket the rooster **crows the hours**" — false; verified static SVG, two eye poses,
   no audio anywhere in the file. it ("canta le ore") and nl ("kraait het uur") inherited it.
   "cheers them on" (half-hour) is the same claim in softer clothes.
3. Both EN intros are ~290 / ~330 chars against a 120–170 meta band; it/pt ballooned to 500+.
4. Grade signal not carried: EN says Grade 1 for the half-hour row, es/it shipped 2º/seconda,
   nl split Groep 3 / Groep 4.
5. Verified NOT a defect: the half-hour hint. `granularity:'half'` dispatches `hintMin`
   ("Read both hands…"), not `hint` — line 412. Checked before reporting.
