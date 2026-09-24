---
name: project_estimation_jar_rebuild
description: "Estimation Jar (#23) rebuilt to the v4 bar (2026-08-05) — the honest jar, and the four things the frozen landing copy had been selling since launch"
metadata: 
  node_type: memory
  type: project
  originSessionId: 8969b510-0b35-425a-9426-dc7af0b85834
  modified: 2026-08-04T23:51:50.255Z
---

# Estimation Jar → a v4 instrument (2026-08-05, 6 commits, HELD at commit — NOT deployed)

`de73d324` honest jar · `a1779d94` benchmark + reveal · `4f381a85` dot plot +
integrity · `313fc295` gates · `f618443e` reveal timing + gate refresh ·
`0e573925` print sheet · `8b5de647` wide board.
**55,099 → ~110,000 bytes.** Key and all eleven native slugs UNCHANGED (indexed).

## Why it was forced (two independent reasons, both measured)

**(1) The operator's report** — "it always raises by tens, and the jar should
reflect the amount, because the whole teaching point is to estimate by eye."

⭐⭐ **His named fix was necessary and, alone, INVISIBLE.** The renderer had only
**seven distinct states across all thirty free counts** (8-13 all drew 30 blobs),
so ±1 would have moved the number and left the picture byte-identical six times
in seven. Worse: fill height was `n / TIER_ceiling`, so the same 12 cherries drew
30 blobs free / 18 paid, and a free jar of 30 was pixel-identical to a premium
jar of 200. **Render first, control second.**

**(2) §21.5a freezes the landing copy until ~2026-09-01, and that copy sold four
things that did not exist:** the benchmark ten ("benchmarking is the real
estimation skill"), the dot plot (by name), the saved weekly ritual, and a
printable jar for the wall. Same forcing as ten-frame and number-line — the copy
cannot be corrected, so the TOOL must be, and the copy therefore SCOPES the build.

## The design

**Thesis — THE HONEST JAR.** Exactly N real objects, packed by deposition; the
top of the pile IS the fill line. Uncountability comes from OCCLUSION, not from
anonymity — which is what the frozen copy already described ("refuses to be
counted from across the rug"). **Countable in principle, impractical in
practice** is the definition of an estimation task, not a compromise.

⭐ **The doctrine correction that makes it legal:** doctrine B is "NO NUMERAL
LEAK" and survives. What the file actually enforced was an unwritten stronger
rule — *no cardinality derivable from the DOM* — which is equivalent to *the
picture carries no quantity*, i.e. to the bug. **N sprites is not a leak; it is
the subject.** But the DOM must still not be countable → the pile is a
**`<canvas>`**, one node, `aria-hidden`. Post-reveal ten-frames stay `<img>`
(the count is public by then).

**Invention — the benchmark dish.** Ten of the same object, same size, same
ground line, labelled with the numeral 10 and no word in any language. Rejected:
a small jar (invites "which has more"), a ten-frame (it is this tool's REVEAL
apparatus — spending it up front spends the drama, and it organises ten into
something countable when the job is to give ten a MASS).

**Capacity is the TEACHER's choice (30/60/200), never the tier. The glass never
changes size — the objects do**, so a jar is comparable week to week. The number
line's range follows the JAR (a subscriber estimating 24 used to tap a 0-200
line).

## ⭐⭐ THE DURABLE LESSONS

**⭐⭐ MEASURE, DON'T FIT.** The obvious `R = sqrt(phi*A/(pi*cap))` with a fitted
efficiency was tried and ABANDONED: the lattice is discrete, and a 30-jar jumped
y116→y94 across 0.75 units of R. **A constant fitted to a knife edge is not a
constant.** Replaced by bisection for the largest R at which `cap` objects still
fit below the ring — true by construction, no magic number, one-line gate.

**⭐⭐ THE FIRST PROBE FOUND THREE THINGS THE DESIGN DIDN'T ANTICIPATE**: 83
non-monotonic steps (seeding per COUNT re-rolled everything, so adding an object
could lower the pile — fixed by seeding per (set, capacity) so packPile(n) is a
PREFIX); 328 objects outside the glass; and a full jar at 75%. None was visible
in any render.

**⭐⭐ A CRASHED GATE MASQUERADES AS A FAILED GATE — and I fell for it.** The
first mutation run reported "26 killed". The gate had an undefined `REPO`, so
every mutant died of a ReferenceError rather than of detection. Caught only by
running the gate against the REAL tool and finding it crash there too.
**Verify a gate PASSES what it should pass before believing anything it fails.**

**⭐⭐ A CHECK THAT HANDS A FUNCTION THE VALUE IT SHOULD COMPUTE HAS NOT TESTED
IT.** The last mutation survivor was the original defect: P8 called
`packPile(20, cap0, …)` with the capacity passed in by hand, so it never once
called `capacityOf()` — and `premium ? 200 : 30` inside that accessor sailed
through. Ask the tool through the door the renderer uses.

**⭐ SIX SURVIVORS SPLIT TWO WAYS, and the split is the finding.** TWO were real
gate holes (P10's test data had no guess NEAR the answer, so a ±2 BAND was
invisible — the sign/distance difference only shows one step either side; P1's
"spread ratio" smell test could not see one set's constant set to another's,
which forced P1b to re-derive from the sprites). FOUR were BAD MUTATIONS,
recorded at their sites: `^7` on a seed that deliberately excludes n; 8
bisection steps that already converge; flattening profile rows in the NECK that
the pile never reaches; and `!premium → freeMax()` which is provably EQUIVALENT
because freeMax and the only free capacity are both 30.

**⭐ READING THE RENDERS FOUND FIVE THINGS NO ASSERTION COULD**: the lid hovered
above a mouth it did not reach; the pile read as a lattice until the row offset
went random; a 10px `non-scaling-stroke` rendered the capacity icons as SOLID
BLOBS; the benchmark drew at two-thirds the jar's scale (worse than no
benchmark — it invites the wrong comparison); and the dish rim was drawn OVER
its own contents.

**⭐⭐ PROBING THE TIMELINE FOUND THE WORST ONE.** The true count was painted the
instant the reveal face mounted — the answer sat on the line while the room
chanted up to it. **Every assertion missed it because they all sampled AFTER the
count finished.** Sample DURING.

**⭐ THE BAN-TOO-WIDE TRAP, third dress.** T6 forbids a tool writing `.lcs-`
selectors — correct — but `audit-tool-print-sheets` REQUIRES the shell header
gone in print, and the house print reset clears the shell background. The
exemption is an AUDITABLE LIST with a citation each, poison-tested both ways.

## Gates
verify 13 new sections P1-P13 (own ground truth; P1b re-derives pack constants
from the sprites via the oracle, pointed at the sets file UNDER TEST) ·
**mutate 26/26 killed** · local-test **73/73** · print-sheet probe **10/10**
(145 descendants, 1225px, 125 inked) · wide-viewport **29/29** · new
`measure-jar-sprites.js`, `mutate-`, `shoot-`.

## ✅ COMPLETED + DEPLOYED (the operator asked why it stopped short; it did not)

**LIVE on production, 11 locales, `live-verify` 154/0.** Repertoire **11 → 122**
fillings. Saved weekly ritual, range mode and the clue all built. All 21+2 new
strings through **ten native panels**.

## ⭐⭐ THE PANELS FOUND MORE IN MY ENGLISH AND MY CODE THAN IN THEIR OWN LANGUAGE

Four panels independently found `capLabel` DEAD (authored ×11, referenced
nowhere) and its English wrong — "How big is the jar?" asked the one thing the
design refuses. Also: **the jar's aria-label was HARDCODED ENGLISH with
pluralisation by concatenation** (`'a jar of ' + noun + 's'` → "a jar of
cherrys", in every locale, on the tool's largest a11y string) · `histAria`
promised a jar the handler never rebuilt, and `_newJar` never touched `count`
so it neither repeated nor re-rolled · `p1Note` printed "a real forty" on a wall
sheet, impossible on a 30 ceiling · `holdBack` named a gesture a keyboard user
cannot make while the code implemented Shift+Enter · `clueTen` flipped a TEACHER
SETTING permanently · **range mode was invisible to three of four record
surfaces, so the PAID print sheet printed a blank plot** · `rangeTally` was dead
code — the `compare()` defect the header brags about fixing, one feature later.

⭐⭐ **The Nordic panel MEASURED that four bans could never fire:** `\w` is
ASCII-only **even under `/u`**, so a tail cannot cross ä/ö/å/æ/ø (`virhe\w*` vs
`virheitä` → false). And three bans guarded a noun the tool does not ship (da
banned `bedste gæt` while shipping `bud`). ⚠ But the widening had to stop short:
sv `rätt`, da/no `rigtig` are intensifiers and **this tool's own shipped Swedish
landing copy says "hamnade i rätt trakt"** — now a must-PASS poison case.

## ⚠ MORE TRAPS BOUGHT
- ⭐⭐ **A crashed gate masquerades as a failed one** — the first "26 killed" was
  26 ReferenceErrors. **Verify a gate PASSES what it should before believing a
  failure.**
- ⭐⭐ **A check that hands a function the value it should compute has not tested
  it** — the last survivor was the original defect.
- ⭐⭐ **`poisonRanking()` was DEFINED AND NEVER CALLED**, then failed once wired:
  `'\w'` in a JS single-quoted string is just `'w'`, so eleven bans were toothless.
- ⚠ **Heredocs in this environment eat backslashes** — write regex-bearing code
  with the Edit tool or python `io.open(newline='')`, never `cat <<'EOF'`.
- ⚠ **The deploy glob `estimation-jar.*` does not match `estimation-jar-sets.json`**
  — the recorded comparison-planks trap, walked into again; `chown` each by name.
- ⚠ My own live gate reported two defects that were **wrong measurements**: a
  button index off by one, and a doctrine-B check firing on the number line's own
  public tick label.

## ⚠ Genuinely open
- **122 is the honest ceiling of the current artwork**, not 200+: ~230 candidates
  are vertebrates, ~150 people/emotions, and several canonical jar objects
  (`jelly beans`, `grapes`, `peas`) are PLURAL cards whose art is already a pile.
  The lever is new art (buttons, marbles, beads, coins), not a looser filter.
- The saved wall is a paid feature **no gate string mentions** — a free teacher
  cannot discover it exists (the inverse of the recorded "paywall sold the free
  Print").
- `nudgeDown`/`nudgeUp` label two different jobs (teacher's exact count vs child's
  estimate) under one string.
- The wide-viewport `FILL_EXEMPT` for `.ej-jar` is still in place.

## ⚠ Surfaced, deliberately not changed
**The paid-plan name is split catalog-wide and the pricing page matches
NEITHER.** 21 tools say "the Teacher plan", 24 (incl. this one) say "Premium";
`pricingPage.tier.name` renders **Teacher / Lehrkraft / Enseignant / Docente**
against the tools' "Lehrer-Paket". A teacher taps **"See Premium"** and lands on
a page with no such plan. Kept internally consistent here (one tool, one voice —
naming two plans in one paywall is itself a recorded defect); the fix is a
catalog decision with an eleven-locale grammar tail.

Also: **2.MD.D.9 should not be claimed** by the landing copy (it is measured
lengths, not counts — the plot *prepares* it), and **2.NBT.A.1 is unearnable on
the free tier** (needs jars ≥100).

Related: [[feedback_next_tool_build_recipe]] · [[project_ten_frame_rebuild]] ·
[[feedback_native_panels_audit_the_source]] · CLAUDE.md §23.
