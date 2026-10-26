# #129 — Cleo's Packing List → THE DIVIDER CASE (L.1.2.b; all 11 locales)

ORDER row 129 · id `cleo-packing-list.series-commas.l-1-2-b` (kept). Design: `designs/129-cleo-packing-list.md`.

## Files and wiring
- **New files:**
  - `mini tools/divider-case-core.js` (`DividerCaseCore`) holds the model:
    - every locale's 16 lists (8 of three things, 8 of four), its 8 picture shelves and its 10 Level-3 starts, built from the lists by mistake shape;
    - the rule: the conjunction divides everywhere but English, which keeps the serial comma of the frozen intro;
    - the case: tokens, walls and pockets, and Pack with its reasons (squash, lead, beside, enLast, afterConj) and hints;
    - the glow from miss 2;
    - the euphony: es y → e before an i-sound, it e → ed before e-;
    - the plan: a fresh order, the "3 then 4" bands grouped, and a shuffled shelf.
    - DATA is written by a build script from the picture labels (`mini tools/pictures/*.json`).
  - `divider-case-activity.js` draws the list and the case as one strip:
    - each word stands in a column over its part of the case, and each gap is a 44 px socket over a wall slot, so a wall always stands under its comma;
    - the library pictures drop into the pockets on Pack: squashed things are pushed together, an empty pocket is hatched;
    - the lid and latches shut on success, and a small row of packed cases builds up;
    - the level-2 shelf.

    The CSS prefix is `dc-`, `apparatusClasses: ['dc-art']`.
  - `divider-case-activity.html` loads core `?v=1` and activity `?v=1`.
  - The old `cleo-packing-list-activity.js` and `series-comma-core.js` stay on disk, unreferenced by this row.
- **Manifest:** the row stays in `cleo-packing-list-activities.json`.
  - `tool` → `divider-case-activity`.
  - `params` = `{level: [1, 2, 3], lists: [3, 4, 34], walls: [go, pack], rounds: {1: 16, 2: 8, 3: 10}}`.
  - en, de, fr, es, pt, it, nl and sv slug, title and intro are frozen; **da, no and fi are authored new**.
- **Route:** `ACTIVITY_WRAPPER_VERSION` 9.874.
- **Prose:** en–sv replaced; da, no and fi added. Each locale quotes one right list and one wrong one, both its own (gate-checked).
- **Strings:** 35 keys × 11.
- **Visual-QA driver:** `scripts/visual-qa-phases/cleo-packing-list.series-commas.l-1-2-b.js` (replaced):
  - picked: commas and walls are in, but nothing is graded before Pack;
  - missed: the pictures drop, the empty pocket shows, two things squash, and the hint appears;
  - resolved: the lid shuts over one thing per pocket, then Next appears 0.5 s later.
- **Sources** (scratchpad): `dvc-src.js` → `dvc-build.js`; `dvc-strings.js` → `dvc-apply.js`; `dvc-prose.js`, `dvc-manifest.js`, `dvc-dump.js`, `dvc-probe.js`, `dvc-review-fix.js`.

## The invention
**Every comma drops a wall into Cleo's packing case, so a list is right when each thing gets its own pocket.** A missing comma squashes two things into one pocket, exactly where the comma is missing. A comma before the first thing leaves an empty pocket at the left end. In the ten locales where und/et/y/e/en/och/og/ja divides, a comma beside the conjunction leaves an empty sliver. In English, "and" is a ribbon tied to the last thing, so the comma before it is needed and a comma after it cuts the ribbon. One physics, each language's own rule.

## The levels
1. **Place the commas:** 16 lists, the same 16 pictured lists in every locale, each with its own lead. The lists setting gives 3 things, 4 things, or 3 then 4.
2. **Make your own list:** a shelf of 8 pictures. The child picks 3 or 4 in any order, the sentence writes itself with the conjunction before the last thing, and the commas are the child's.
3. **Fix the list:** ten lists that already carry commas. Each start has one mistake shape: the first missing, one after the lead, the last gap, all missing, after the conjunction, a middle one missing, or two at once. Exactly one start is already right.

## Deviations from the design (each measured or ruled)
- **One shared set of 16 pictured lists in every locale.** The old seed rounds (plums, colours, stars, scissors) had no usable pictures, and the design's swap rule would have rewritten most of them anyway. Every locale gets its own leads and plurals.
- **Tap, not drag.** The level-3 comma pot is gone: in every level a gap is tapped in or out.
- **The conjunction adapts:** es y → e before i-/hi-, it e → ed before e-. The design's alternative, greying a picture that would land last, wasn't needed, and no list or shelf word triggers either rule today. The gate checks both rules directly.
- **The "one comma after the first thing" bot is not capped.** For a three-thing list outside English, that is the rule itself. The gate caps "a comma in every gap" (never), "before the conjunction only" (never), "after every thing" (every en list, no other) and "leave it as it is" in level 3 (exactly one of ten).
- **Narrow phones:** at ≤ 340 px, and in level 2 while picking, the case rests as a shallow outline under the words. Its walls still show, and it opens to full depth on Pack. At 340 px and below the level-2 shelf sits under Pack, as the design's 320 rule asks.
- **Squash:** the squashed things shrink, tilt and are pushed toward each other inside their pocket. Across a line break they stay on their own lines.

## Review
ONE native + early-primary pedagogy reviewer covered all 11 locales: every list with its pictures, every shelf label in combination, every Level-3 start, the strings, the prose and the new metadata.

**Applied:**
- **Pictures each with their own word:**
  - de *Obstkuchen* (pie, beside *Torten*);
  - es *cupcakes* (a *panquecito* is also a muffin);
  - it *abitini* (*vestiti* reads as clothes);
  - pt *luvas* (a *mitene* is fingerless);
  - sv *saltkringlor* (a *kringla* is a sweet pastry);
  - fr *crayons de cire* (the picture is a wax crayon).
- **Children's words:** de *Hühner*, nl *kippen*, it *macchinine*, es *maíz* (you sow maíz, not elote).
- **Cleo is feminine in pt everywhere** (*A Cleo*, *da Cleo*).
- **Titles and wording:** the sv title *Rankas packlista*; it missLead *Davanti alla prima cosa*; nl missSquash *zijn … geperst*; fr prose *seule la liste*; no prose *veggen som hører til*.

The reviewer found no compound risk in de/nl/sv/da/no (every item is a separate word). The sv/da *kor får* / *køer får* ("cows get") reading when the comma is missing is a useful demonstration of the comma.

**Open (frozen metadata, not edited):** the en intro and the de, fr, es, pt, it, nl and sv titles and intros describe the retired three-card quiz with Cleo the chameleon. The de, fr, es, pt, it and nl titles also name grade 3.

## Gates
- **`verify-divider-case-core.js`:** 9,743 checks, 0 fail. Its own tables are the serial-comma rule and conjunctions, its own pocket count, and its own euphony rule. Over EVERY comma set of every list and of a fifth of all 3- and 4-picks from every shelf, Pack passes iff the commas are the own required set. It also checks:
  - empty and squashed pockets, the cut ribbon, the reasons, and the glow at miss 2;
  - the hints without a miss, and the bots;
  - Level 3 has exactly one right start, and the plan;
  - the data (pictures exact case, lower case, de nouns capitalised, fr articles, no thing twice), strings × 11, prose quotes and the manifest.
- **`mutate-divider-case.js`:** 15 of 15 killed, control survived.
- **`local-test-divider-case.js`:** real pointer, 11 locales, 320–1366, pictures served case-exactly. It also measures that every wall stands under its gap. **41,360 pass, 0 fail.** The squash-together change came after that run, so the en and fr rerun was clean too (7,520 / 0).
- **`visual-qa-activity`:** PASSED, 384 renders (16 rounds × 4 phases × 6 viewports).
- **`audit-activity-hierarchy`:** 200 / 0.
- **`audit-settings-efficacy`:** "level", "lists" and "walls" all change the board at rest.
- **`audit-activity-next-delay`:** pass. Content × 11, prose claims, SERP copy, content tells and route preflight: pass.

**My own render reads found five problems:**
- The case floor stepped up and down, because gap columns had no top part.
- A four-thing list wrapped with its last thing alone; it now breaks before the second-to-last thing.
- Level 2 and the 320 px lists pushed Pack below the fold.
- The lid floated above the case.
- Squashed things sat apart; they are now pushed together.

## Live
`live-verify-divider-case.js` on production, 2026-10-26: **52 pass, 0 fail.** All 11 pages return 200, and en, de, sv and fi at 1366 and 390 embed divider-case-activity.html at wrapper 9.874. With a real pointer, a comma after the lead plus a missing first comma packs to an empty left pocket and a squashed pair, with the hint. The right commas shut the lid and show the success line, and the iframe grows with the card. The first run saw the old page in the cache window; once curl showed 9.874 in every checked locale, the second run was clean.
