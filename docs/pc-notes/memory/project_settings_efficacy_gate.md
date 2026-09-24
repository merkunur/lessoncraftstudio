---
name: project-settings-efficacy-gate
description: "The settings-drawer efficacy gate and the ten-frame Counter-shape fix — why a chip highlighting itself passed every existing gate, and the seven ways the new gate first accused correct tools."
metadata: 
  node_type: memory
  type: project
  originSessionId: 259ee510-6fa8-4418-878a-34ee86d291e3
  modified: 2026-09-03T20:49:41.180Z
---

**2026-09-03.** The operator set Ten Frame's *Counter shape* to Heart and the board kept drawing
cats. Root cause: `mini tools/ten-frame-activity.js` `_setupImageTheme` REPLACED `paint()` wholesale
for themed rows and hard-coded the image token, so `s.shape` and `s.color` were read nowhere on 4 of
the 8 rows — `var s = this.api.settings` was a dead binding and the captured `origPaint` was never
called. Fixed by making the override a BRANCH with `picture` as a real fourth chip. Two sibling
defects went with it: `frames` was overwritten by every task's `setup()` (a pick reverted on the next
round) and `showNumber` cannot act on a `how-many` row; neither is offered any more. One mechanism
does all three — **`settings` is an accessor on the activity object**, so the drawer describes the
ROW rather than the engine. Live and verified in production. 0 lines to `ten-frame-core.js`,
`ten-frame.js`, `lcs-shell.js`.

**Scope discovered:** only ten-frame activities have a drawer at all. Every other activity engine
declares `settings: []`. The other 143 options live in 52 standalone tools. See
[[project-premium-tools-v4-catalog]].

⭐⭐ **A CHIP THAT HIGHLIGHTS ITSELF PASSES EVERY GATE WE HAD.** `audit-tool-control-liveness` scopes
`__world()` to `.lcs-app`, and `buildDrawer()` appends the drawer INSIDE `.lcs-app`
(`lcs-shell.js:587`), so flipping its own `aria-checked` already counts as "the world changed".
Proven mechanically: `--poison=drawer-scope` flips both dead settings to LIVE. And a static
"declared key never referenced" scan of all 53 files returns **zero findings against the live
defect** — the key IS referenced, inside a function an override shadows. See [[verify-rendered-not-source]].

⭐⭐ **THREE CHANNELS WOULD HAVE LET THE NEW GATE MARK ITS OWN HOMEWORK,** and two were not obvious:
`localStorage` (~40 of 53 tools `_saveStore()` from `onSettings`, so storage moves on EVERY commit
whatever the consequence — kept out of the verdict entirely) and `tool.render()`, which the shell
calls unconditionally, so any tool that reshuffles on render would diff for every setting. The
answer is the **null transition**: re-commit the value the field already has, twice, and require the
two runs to agree before crediting anything.

⭐⭐ **A NEW GATE ACCUSES CORRECT CODE BEFORE IT CATCHES ANYTHING — SEVEN TIMES HERE.** Every one was
fixed by changing WHAT is measured, never the rule:
- `money-mat` / `part-whole-frame` assemble their options in `init()`; the source literal is a
  template, not the schema. Options checks moved to the runtime half.
- `class-graph` `pop`, `center-board` `showNames`, `calendar-wall` `weatherSet` are state-conditional
  — dead on an untouched board. Drive further (4 → 14 clicks) and, more importantly, **wider**:
  taking candidates in DOM order spent the whole budget on the first control CLASS it met.
- `place-value-lab` `bundle` only bites at the TENTH unit, so the drive must repeat the control that
  MOVES the board — found by measuring, not by position; its "+ ones" is the tenth control class.
- `place-value-lab` `speakOnChange` is on a 1200 ms debounce, so a board static at 400 ms has not
  spoken yet.
- `baking-tray` churned from an in-flight tween and from its own 300 ms tap-lock.
- `hush-owl` reloads itself by design (`location.href`, :550/:768); the harness reported its own
  exception as a tool FAILURE.

⭐ **BOTH ENDS ARE DETERMINISTIC; ONLY THE MIDDLE IS NOT.** Pacing clicks at 140 ms against a 300 ms
tap-lock made things WORSE than 0 ms — at 0 every tap after the first is reliably swallowed, at 400
every tap reliably lands, and in between it is a coin toss. Default 0, retry at 400.

⭐ **EVIDENCE IS PER-PHASE, AND YOU KEEP ALL OF IT.** Collapsing at-rest and after-use stability into
one flag made a verdict flip between runs. Making the read patient fixed one tool and broke another.
Three phases (at-rest / quick / settled), each with its own control; a field proven by any is
proven; DEAD requires every phase readable.

⚠ `location` **cannot** be redefined in-page ("Cannot redefine property"), and a `beforeunload`
guard leaves the page alive on `chrome-error://` with the tool gone. Only not clicking the control
works.

**Files:** `scripts/audit-settings-efficacy.js` (`--contract-only` browser-free half wired into
`deploy.sh`; runtime half is a dev run: `--all`, `--all-activities`, `--tool=`, `--activity=`,
`--poison=static|drawer-scope`). Commits `ccea1f15` → `67551f95`.

⭐ **CONFIRM A DEAD THE WAY YOU CONFIRM A POSITIVE, AND NEVER LET TWO RUNS SHARE A LOG.**
letter-studio's `wide` read LIVE alone and DEAD under load (it renders nothing — it only widens the
corridor a stroke is graded against), so the whole evidence pass now runs twice before anything is
called dead. And two overlapping background sweeps redirected to the same file produced a log with
NUL padding, 46 headers, and a summary from the OTHER run — the `--json` output was the only clean
record. Give every run its own path.

**Measured result.** Activities: **22/22 live, 0 failed, 0 unproven** — every option on every
ten-frame activity. Tools: **143 fields across 53 files pass the static contract**; the runtime sweep
final sweep is **117 live, 0 DEAD, 0 REVERTED, 19 unproven** (15 unreached-with-citation, 4 phase-churn), each with the guard that blocks it read out of
the source (a class roster nobody typed, a day plan nobody built, a timer that has not run a minute,
a duration whose two values differ only in how long a veil stays, a value read only inside a pointer
drag). **Zero DEAD.** Eleven fields across four tools read DEAD and were not — every failure
investigated in depth was the harness failing to reach a state.

⭐ **THREE VERBS, NOT ONE.** Click, then the keyboard path, then a real mouse drag. `open-number-line`'s
`snap` lives only inside a drag (:1258) and no synthetic click can produce one. And a PROBE may open a
tool where a teacher would be — `letter-tiles` needed its own `?list=` deep link to enter prompt mode,
which brought three settings back at once.

⭐ **AN UNREACHED LIST IS NOT AN EXEMPTION LIST.** Entries report UNPROVEN, stay in the count, and
carry a source citation. Excusing them into `ok` would have made the gate say the thing it cannot
know.

**Open:** `visual-qa-activity.js` sweeps viewports × rounds but always in the DEFAULT settings state,
so a setting that changes what renders creates layouts no visual gate has ever seen. Measured for
ten-frame (all four shapes are dimensionally identical, so no regression there); not measured
anywhere else.
