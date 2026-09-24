---
name: project_exchange_machine_tool
description: "TOOL #45 The Exchange Machine — built and live in 11 locales; the written column algorithm welded to the material, and the two defects that got past every gate"
metadata: 
  node_type: memory
  type: project
  originSessionId: 7ff223ef-444e-43b7-9051-4d8be79c24fc
  modified: 2026-08-09T20:12:38.552Z
---

**TOOL #45 `exchange-machine` — LIVE in all eleven locales, 2026-08-09.** The #1 idea of the
v5 batch (`docs/premium-tools-v5-ideas.md`) and the first of its three heroes. Topic:
**subtraction and addition WITH REGROUPING** — the most dreaded topic of the K-3 year.

**The thesis.** The written vertical sum and the material are ONE object, sharing the
place-value axis: **x-position IS place value** for the numerals and the counters
identically. Tap a column that has something to give and one leaves it and bursts into ten
in the tube to its right, while the pen mark is written in the same instant. Run it backwards
and ten fuse into one, so **carrying and borrowing are one machine in two directions**.
Fuson & Briars (1990, *JRME*) requires the material action and the written record to be
co-temporal AND co-located; here co-location means the shared axis.

**The fence (run fresh).** The written vertical algorithm is VIRGIN on all four surfaces —
the four apparent *Übertrag* hits are the ordinary German verb *übertragen* in unrelated
prose, and `addition.html`'s own analysis lists vertical format under LIMITATIONS.
`place-value-lab` owns the base-ten WORKMAT and `place-value-regroup-core` owns the same
exchange as a graded activity, so the remainder is **THE NOTATION AND THE LOCK** — a page
you write on, never a mat you build on.

**Discs not blocks.** Blocks are PROPORTIONAL (value by size); the written algorithm is
POSITIONAL (value by place). A third panel asked for one hue per column and was overruled:
material whose appearance tracks its value lets a child avoid ever looking at the column.
The tube carries the tint; the disc never does.

**The moat.** **GERMANY DOES NOT PRESCRIBE A METHOD** — PIKAS/DZLM: *"Der Lehrplan NRW
schreibt kein Verfahren vor"*. Bavaria names Abziehverfahren; France lets CP-CE2 choose
cassage or compensation. So the METHOD SWITCH IS FREE AND ON THE FIRST SCREEN, and every
NOTATION row carries its own confidence flag. NL and NO are `inBand:false` (cijferend
rekenen is groep 6, skriftlig regning 5. trinn) and the tool says so.

## ⭐⭐ THE TWO DEFECTS THAT GOT PAST EVERY GATE

**1. Counters past ten were drawn in a place that does not exist.** `_discX` carried
`i >= BASE ? U * 2.4 : 0` — a SIDEWAYS shift. On 42 − 17 the 11th and 12th ones sat outside
the tube, outside the tint, and at 360px the last was clipped by the paper's edge. In a tool
whose whole thesis is that x IS place value, a counter right of the ones column is drawn
where a lower place would be. **verify 104 · mutate 49/49 · local-test 50 · smoke ×11 ·
layout 396 · liveness 33 · print 10 · wide 27 — all green.** Each measured ONE box against a
FLOOR or checked the model's arithmetic; **not one asked whether a drawn thing is WHERE IT
CLAIMS TO BE.** Found by READING THE 360 RENDER twenty minutes after a green deploy.

**2. The fix created the next defect.** Reserving four rows above the brim left a tall EMPTY
strip at rest — honest and unreadable, the [[project_lids_rebuild]] lesson again. The band is
real apparatus, so it is drawn as apparatus: the tint runs through it and the dashed walls
span it, so tube + provisional region read as ONE VESSEL.

**MEASURE THE MAXIMUM, DON'T ASSUME IT.** A BFS over every reachable state of all 25 records
puts the true maximum in one lane at **EIGHTEEN** (`195 + 88` reaches 9+8+carry in the tens;
`48 - 23` reaches it in one gratuitous tap) — not the 19 I assumed, not the 12 the render
happened to show.

**AND THE HEIGHT WAS PAID FOR IN WIDTH.** The file's own header records that the first draft
drove the aspect to 1.2 and the discs came out at 9px. Measured at a 660px card: today 708px
at 1.07 · taller alone 839px at 1.27 (worse than the number that caused it) · **taller AND
wider 670px at 1.01**. Lane 88→112 / 104→128. Wide columns are also correct — a sum on
squared paper puts one digit to a square.

## ⭐⭐ AND THE GATE THAT CERTIFIED A STALE DEPLOY

`live-verify` passed **108 assertions against the previous bytes**. `/mini-tools/` serves
`max-age=3600`, so Cloudflare held the old file under the same `?v=1` key for an hour — and
nothing noticed, because **every assertion tested the MODEL, which was never wrong**.
Conservation, the lock, the carry and the solved record are all identical in the broken
build. See [[feedback_a_green_production_gate_is_not_proof_of_deployed_bytes]].

⚠ **§A.13.42 means EVERY .js change** — I changed the file and did not bump the wrapper's
`?v=`. MEMORY already records six commits lost to this exact omission.

⚠ **And my first byte-comparison lied in the reassuring direction:** the shell ate the `\B`
in `/i >= this\.BASE \? U \* 2\.4/`, so the pattern could not match and the probe reported the
old code "GONE" from a file that still contained it.

## What the native panels found in my ENGLISH

- **Half the product shipped false chrome** — the operation chip flipped to addition while
  five strings still said "take away". Fixed in the MODEL, with a gate assertion.
- `hintOver` was **off by one on the exact number the tool teaches**.
- `hintDone` was FALSE **and a verdict**.
- **Three nouns for the one object** the thesis says is one.
- The paywall sold what the free button already gave.
- `{c}` needs a place-value NOUN in de/fr/nl/es and an INDEX in it/pt/sv/da/no/fi — two
  panels contradicted each other and **both were right**.
- **BANANA-CLASS:** `lärarplanen`/`lærerplanen` is one letter from `läroplanen`/`læreplanen`,
  the NATIONAL CURRICULUM. Hyphenated plan name in sv/da/no.

## Files

`mini tools/exchange-machine.{js,html}` + `-sets.json` (25 sums, free seven; **the borrow is
free on purpose** — paywalling it leaves a free tier that demonstrates addition, and addition
is not what teachers dread) · `scripts/{verify,mutate,local-test,smoke,live-verify}-exchange-machine*.js`
· `scripts/_exchange-machine-{strings,content}.js` · `scripts/register-exchange-machine.js`.

Related: [[feedback_next_tool_build_recipe]] · [[project_premium_tools_v4_catalog]] ·
[[feedback_native_panels_read_the_model]] · [[feedback_verify_the_measurement_before_the_defect]]
