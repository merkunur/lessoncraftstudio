# HANDOFF — resuming the 200-game redesign

Written 2026-09-06, at a session limit. **Read this first, then `GAME-DESIGN-LAW.md`, then
`MISSIONS.md`.** `REDESIGN-LOG.md` carries the running record and the `NEXT:` pointer.

---

## 1 · Where it stands

**27 of 200 specs redesigned. 173 remain.** Nothing is half-written on disk: a spec either carries a
`- Frame:` line in `## Identity` (redesigned) or it does not (untouched, and still passing the
original schema — the gate is conditional by design so the corpus never went red).

| wave | families | done | remaining |
|---|---|---|---|
| W01 | m-place-value | 13 / 16 | **036 038 178** |
| W02 | m-shape-space | 14 / 18 | **127 176 187 188** |
| W03 | m-add-sub · m-multiply-divide | 0 / 23 | **all 23** |
| W04-W10 | see `redesign-waves.json` | not started | 143 |

The waves were cut off by the session limit, not by a quality decision — 57 agents died mid-pipeline.

**Check the true state at any time, never trust this table:**

```
cd games
grep -l "^- Frame: THE" design/specs/*.md | wc -l      # how many are redesigned
node _tools/lint-specs.js    | tail -2                  # schema, all 200
node _tools/check-mission.js | tail -2                  # the mission gate, framed specs only
```

---

## 2 · Fix these before writing anything new

`lint-specs` reports 21 failures and `check-mission` 5, and **every one of them is inside these seven
specs. The other 20 redesigns are clean.**

| spec | defect | note |
|---|---|---|
| **123-position-hide-and-seek** | **enacted responses 5 → 1** | the serious one — four enacted corrections were dropped |
| **019-read-the-rods** | enacted responses 5 → 4 · dot rail on the play surface | |
| 009-balance-pans | 2 undeclared ART keys · dot rail on the play surface | |
| 132-order-three-numbers | 4 emoji outside the Art registry (`▪` in the layout diagram) · dot rail | |
| 179-number-to-1000-line | 3 undeclared ART keys · 4 emoji outside the registry (`⚠`/`⭐` in prose) | |
| 020-hundred-square-trail | 3 undeclared ART keys | |
| 180-expanded-form-cards | 1 undeclared ART key · 1 emoji outside the registry | |

The emoji failures are mostly authoring habit — agents decorate prose with `⭐`/`⚠` and draw layout
diagrams with `▪`. Worth putting in the author prompt: **the Art registry is the only place an emoji
may appear, including inside an ASCII diagram.**

---

## 3 · How to run the next wave

The pipeline is preserved in the repo at **`games/_tools/redesign-wave.workflow.js`** (it was
otherwise session-scoped and would have been lost). Three stages per game — design → author →
adversarially verify — pipelined so games flow independently.

```
Workflow({
  scriptPath: "C:\\Users\\rkgen\\lessoncraftstudio\\games\\_tools\\redesign-wave.workflow.js",
  args: [ {n,slug,band,pattern}, … ]     // read them out of design/redesign-waves.json
})
```

`design/redesign-waves.json` holds all ten waves with their games, families and band mixes;
`design/redesign-catalogue.json` holds all 200 catalogue rows with the family assignment.

**Size a wave to the session.** 16-23 games was too many: three concurrent waves (57 games, ~100
agents) exhausted the limit with a third of the work done. **Run ONE wave of ~10-12 games at a time
and let it finish** before starting another.

---

## 4 · Two decisions waiting for you

1. **`MISSIONS-v2-CANDIDATE.md` (112 KB, 13 frames) is NOT installed.** A judge panel — three
   independent frame systems, three adversarial judges, then a synthesis — produced it in parallel
   with the wave that was already running. **Its frame names differ** (THE FOOTING, THE APERTURE,
   THE MENDING, THE EXCHANGE, THE LIFT, THE ERRAND, THE GATHERING vs the live THE CLIMB, THE OPENING,
   THE ROUNDS, THE TENDING…), so installing it would orphan all 27 specs already written against v1.
   Either reconcile deliberately — port the better ideas into v1 keeping the names stable — or leave
   v1 standing. **Do not swap the file.**
2. **`CATALOGUE.md` still holds the old titles.** The hub reads a game's title from there (the 002
   precedent), so the retitles are not live: *Bar Chart Reader* → **The Lantern Lift**,
   *Shape Sorter* → **Mend the Harbour Wall**, 035 → **The Water Stair**, 019 → **The Winter Door**,
   177 → **The Hundred Road**, 179 → **Signpost Mountain**, 041 → **Stepping Stones**,
   123 → **Found You!**, 126 → **Stone by Stone**, 125 → **Shadow Show**. Each redesigned spec's
   `## Identity` carries its new title; the catalogue rows need updating to match.

---

## 5 · Traps this session paid for — do not re-buy them

- ⭐⭐ **A gate's prose bans were 42/42 false on their first real run.** `check-mission`'s CHARACTER
  check banned **"cross"** for meaning *angry* — in a corpus whose central frame is **THE CROSSING**
  — matching *"the goat crosses"*, *"lines cross"*, *"ANIM.cross"*. RATCHET matched design rationale,
  a balance pan **sinking** (a balance pan working), the **required** adaptive ladder (*"drops the
  next item one level"*), correct refusal (*"until they are taken back"*), and the goal being
  **reached** (*"the yard empties"*). `cross` is gone; RATCHET is a **warning** now, with the
  measurement in its docblock. **A gate with a 100% false-positive rate gets ignored — and then it is
  ignored on the day it is right.** In the same run the two *decidable* checks earned their keep:
  NO-RAIL caught 3 specs, MISCONCEPTIONS caught 2 real losses.
- ⭐⭐ **A design agent found a contradiction in the law I had written and shipped.** Test C's table
  said *"the session must play identically"*; the paragraph beneath said the opposite. And the test
  could not discriminate at all — a correct walk and a decorative one both play identically under an
  instant cut. §2.2a is the correction: **Test C is a load audit; the Displacement rule is the
  isomorphism proof.** Read §2.2a before judging any spec on Test C.
- ⭐ **The inherited `NO-PUNISH` ban has a third word sense.** It guarded *"lives in/on/at"* (animal);
  the redesign added *"L3 **lives from** all four kinds"*. Widened and poison-tested three ways.
- ⚠ **`Math.max()` in a gate masks the loss it exists to catch** — the misconception check reported
  "5 → 5" while a correction had been deleted. Named and enacted counts are compared separately now.
- ⚠ **Backticks inside `node -e` and `git commit -m` are command substitution** and silently delete
  text. It ate a MEMORY.md line here. Write scripts to a file; commit with `-F -` and a quoted
  heredoc. Git Bash `/tmp` is **not** Windows `%TEMP%` — node and python disagree about it.
- ⚠ Shell heredocs ate a large markdown document twice. Use the Write tool for docs.

---

## 6 · The one thing that must not drift

Every redesigned spec has to fail all three deletions, and the sharpest single check is the one to
apply first when reading one:

> **`answer = f(character.position)`.** If the commit handler reads a tile id, compares it to a
> stored `answer` field, and *then* animates the character walking there — **reject it.** That is
> answer-then-arcade with a shorter arcade, and it is exactly what a well-meaning redesign produces.

And the pedagogy is the corpus's real asset: **the misconception counts may never fall.**
`check-mission` diffs them against the committed original in git, per spec, automatically.

---

## 7 · An agent exceeded its brief — what I did with it

The wave was scoped to redesign **specs**. One agent also drew a **five-pose owl mascot + a lantern**
into `_lib/art.js` (+133 lines, `owl.idle/think/happy/oops/hang`, `lantern`), added six lines to
`ART-BIBLE.md`, and **started building `games/bar-chart-reader/index.html`**.

- **The build is quarantined**, not deleted — moved to the session scratchpad as
  `UNAPPROVED-bar-chart-reader-build/`. It had to leave `games/`: **`build-hub.js` treats any
  `<slug>/index.html` as BUILT**, so a half-finished game from an unverified spec would have appeared
  on the hub as shipped.
- **The art is kept** (additive, unused, follows the hen/fox one-shared-body-string template, and the
  85 unit tests still pass) — **but it is NOT APPROVED.** I rendered it with
  `node _tools/art-sheet.js owl-review "owl.idle,owl.think,owl.happy,owl.oops,owl.hang,lantern"`
  and read it at 384 px, per the standing rule that exists because the fox shipped three times
  without anyone looking. Three defects, all needing a redraw before any game uses it:
  1. **The body is near-white on the cream stage** — the *exact* weakness already recorded against
     the hen ("leans on its 3 px outline alone for separation"), repeated on a bigger, paler
     character. ART-BIBLE §9 territory.
  2. **The beak reads wrong in two of five poses.** A grey teardrop hangs below the diamond in
     `owl.happy` and `owl.think`, reading as a drip or a lolling tongue — the same class as the
     fox's "muzzle read as a bill" (§11.4).
  3. `lantern` carries a pale halo disc that no other entry has; inconsistent at size.

  It reads correctly as an owl at 48 px (the silhouette test passes) and the pose set is
  distinguishable, so this is a redraw of details, not of the character.

**Lesson for the next wave's prompt:** say explicitly that the author stage writes **the spec file
and nothing else** — no `_lib` edits, no art, no `games/<slug>/` directory.
