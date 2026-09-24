---
name: feedback_next_tool_build_recipe
description: "How to build any v4 premium tool end to end — the trigger phrase, the gate order, the 5 registration points, the deploy chain, and the traps each bought by a real defect"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 687df0ed-5e52-416e-a786-f89237631f2d
  modified: 2026-08-01T09:01:52.707Z
---

# "Build the next tool" — the standing recipe

**The trigger.** *"build the next tool"* / *"build the next one"* / *"continue with the tools"* /
naming a catalog tool → the **Premium Tools v4 program** ([[project_premium_tools_v4_catalog]]),
never the German activity fan-out (paused) and never games (cancelled). **Do not re-research or
re-design the catalog** — it is approved. EnterPlanMode for ONE tool → four-surface fence → name
the invention, the moat and an explicit refuse-list → ExitPlanMode → build.

**Why:** two tools have shipped this way (`#36 number-sieve`, `#37 arrow-strip`) and the value is
almost entirely in the discipline, not the idea. Every gate in this list exists because it caught
a defect that five earlier green suites had missed. Skipping one does not save time; it moves the
discovery to the operator.

**How to apply:**

## Files + reuse
`mini tools/<key>.{js,html}` + `<key>-sets.json`. ES5 only. CSS prefix `<xxx>-`, root
`api.el('div','<xxx>-wrap')` (the liveness gate derives the prefix from it). **0 lines to
`lcs-shell.{js,css}` or any protected core — copy patterns, import nothing.** Reuse: the
entitlement block `pattern-bench.js:239-265` (**unknown entitlement is PESSIMISTIC**, and locking
a control is not enough — reset the state it produced) · the corpus loader `estimation-jar.js:270`
· the 2-D drag pattern `sort-bins-core.js:352-435` **plus its keyboard fallback at `:360-369`**,
which the liveness gate needs · the two-node gate line `folding-sheet.js:714-723`.
**The header states** the thesis, the invention, the moat, the fence result and a **refuse-list** —
*a tool without an anti-feature list is a widget.*

## Gates, in order, none skippable
1. `verify-<tool>.js` — exhaustive where the model is finite. ⚠ **The gate implements its OWN
   ground truth.** Reading the expectation off the tool means it marks its own homework — 19 of 51
   mutations survived on `number-sieve` for exactly that. Env indirection `<PREFIX>_TOOL_DIR`.
2. `mutate-<tool>.js` — **every mutation killed**, `timeout: 30000`. An **inert** mutation is a bad
   mutation, not a gate hole.
3. `local-test-<tool>.js` — real pointer events; sweep `320·360·412·768·1024·1366`; **two tap floors
   named separately** (controls ≥44px, canvas cells ≥34px — an or-shaped assertion hid a missing
   floor twice); text ≥14px; FITS at ≥768.
4. `smoke-<tool>-locales.js` ×11 — **fresh browser per locale**; **print the whole authored string
   set** with seen/unseen marks; reach controls by **index, never an English aria-label**.
5. `audit-<tool>-locale-layout.js` — 11 × 6. English fitting proves nothing about German compounds.
6. `audit-tool-control-liveness.js` — **all three entitlement states** (`--depth=1` for grid tools,
   it is combinatorial; `--depth=2` when the control count is small).
7. **I read the 360 / 768 / 1024 renders myself.**
8. `live-verify-<tool>.js` — 11 locales on production, fresh browser each, **driving the main
   control**. Never "it mounts".

## Registration — 7 points, inside the build commit (CLAUDE.md §21.5 / §23.5)
`live-tool-slugs.ts` ⚠ **the 410 trap** · `lib/seo/tool-content.ts` (4 edits) ·
`tools/[tool]/page.tsx` `TOOL_WRAPPER_VERSION` ⚠ **the one non-idempotent step, guard it** ·
`lib/manipulatives.ts` · 11 × `messages/tool-content/<locale>.json`.
Write `scripts/register-<tool>.js` for those five; **a second run must report every point done.**

⭐⭐ **`ToolEntry` HAS EIGHT REQUIRED FIELDS AND THE PANELS WILL NOT GIVE YOU THREE OF THEM
UNLESS YOU ASK.** `slug · name · tagline · about · howToUse · classroomIdeas · metaTitle ·
metaDescription`. #42 shipped five, the build **failed the static export of all eleven landing
pages**, and TWO gates had already certified it — the register script checked three fields and
`preflight-tool-registration`'s `landing-content` check asserts only `.slug`. **tsc cannot help:
`tool-content/*.json` is untyped at runtime.** Ask the native panels for all eight in the FIRST
landing-copy round. Both guards now read the field list **off the interface** and refuse to run
if they parse implausibly few — but the round-trip still costs a rebuild.
⚠ And `register-` SKIPS a locale that already has the key (right for idempotence, wrong for a
REPAIR) — to backfill fields, rewrite the JSON entries from the SoT directly.
⚠ **The no-digits rule is for the APPARATUS STRINGS, not the landing SEO.** Every sibling ships
`Klasse 1-2` / `cycle 2` / `1.º y 2.º` / `K-2` in `metaTitle` and no gate forbids it; imposing the
ban there made #42's French under-name its own grade band, and my own EN violated it.

⭐ **Points 6 and 7 were MISSING from this list until #38, and BOTH FAIL SILENTLY:**
**6.** `lib/tool-categories.ts` → `TOOL_CATEGORY` — omission falls back to `'number'` and files the
tool in the wrong hub section forever. **7.** the hub thumbnail —
`node scripts/generate-tool-previews.js --only=<key>` then **scp the webp to
`/var/www/lcs-media/mini-tools/tool-previews/` BEFORE `deploy.sh`** (gitignored; travels by scp).
Omission swaps the card picture for a generic "plus over minus" glyph — which is what the operator
saw on #38. ⚠ Add a `SEEDS` entry first if the board is empty at rest, and **measure the stage
aspect**: `--fit=auto` top-crops over 0.85, and the top of a stage is usually chrome.
⭐ **All seven are now gated by `scripts/preflight-tool-registration.js` in `deploy.sh`** (poison-
tested every run). A silent-degradation registration step becomes a gate, never a longer checklist.

## Locales
**§A.13.48 three-agent native panel per locale**, rebuild never translate. **Expect every panel to
rename the tool** — every one has, on every tool, and they routinely catch what no English author
can (bokmål `pile-` = willow; `Matteboka` = the maths textbook; Swedish `banan` reads as banana;
Brazilian `sua esquerda` = *your* left). ⚠ **Normalise the paid-plan name (`unlock`) against the
shipped tools** — the panels cannot see the product lexicon.

## Deploy
`git pull` → `cp "mini tools"/<key>.{js,html,json} /var/www/lcs-media/mini-tools/` ⚠ **including
the `*.json`, and BEFORE `deploy.sh` runs the build** → `chown lcs-media:` → `deploy.sh` →
`live-verify-`. Bump the wrapper `?v=N` on any `.js` change (§A.13.42).

## ⭐ Traps, each bought by a real defect
- **A wildcard in a coverage check manufactures coverage** — numeric placeholders matched with
  `.{1,60}?` match any prose, so a string dead in all 11 locales reported as rendered.
- **A control must do WHAT ITS LABEL SAYS** — the generic liveness gate structurally cannot know
  this; it passed a "New cards" chip that set a flag and dealt nothing.
- **Containment is measured against the CARD**, not the inner box — `overflow-x` absorbs it.
- **Sweep every configuration, not just the default.**
- **A15 no dead strings** — scan for *referenced outside the strings declaration*; a key can be
  reached through a ternary inside `t()` or a lookup map, so scanning for a literal `t('key')`
  false-flags live keys.
- **An offline fallback must degrade to the FREE TIER, not to nothing.**
- **Locale mutations must self-anchor on the live file** — `apply-…-locales.js` rewrites the whole
  strings block and would silently un-anchor every literal.
- **The mutation harness must carry every data file the gate reads** into its tmp dir, or every
  mutation is "killed" by a missing file and it reports a clean sweep of nothing.
- **Assert the MEDIAN, not the mean** · **`vh` is forbidden inside a manipulative** · **never an
  inline `background` shorthand** · **poison-test every narrowed regex**.

Related: [[project_premium_tools_v4_catalog]] · [[project_arrow_strip_tool]] ·
`docs/claude-md/premium-tools-v4.md` · CLAUDE.md §23.
