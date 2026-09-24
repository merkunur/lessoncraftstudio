# Make every settings option actually do something

## Context

The operator opened the **Ten Frame Activity**, set *Counter shape* to **Heart**, and the board kept
drawing cats. The chip highlighted, the drawer said Heart, nothing on the board changed. Their report
was broader than the one example: *"in many activities the settings options are not functional."*

**Root cause of the reported defect (confirmed, exact).**
`mini tools/ten-frame-activity.js:158-212` (`_setupImageTheme`) replaces `paint()` **wholesale** for any
manifest row that carries a `theme`. The replacement hard-codes the image token at line 189
(`this.api.token('image', key, 56)`) and never reads `s.shape` or `s.color` — `var s = this.api.settings`
at line 181 is a **dead binding**, read nowhere in the function body. `origPaint` is captured at line 178
and never called. So on the 4 themed rows of `ten-frame-activities.json` (`animals`, `fruits`) the
Dot/Heart/Star chips and all six colour swatches are inert; cell 0 of the `animals` pool is literally
`cat`. The core's path is correct (`ten-frame-core.js:150` reads `s.shape` → `api.token`); only the
override is broken.

Two more defects in the same family, both of which read to a teacher as "broken control":

- **The drawer states a value the board contradicts.** `defaults.shape` is `'dot'`, so on themed rows the
  drawer opens with **Dot** selected while the board shows pictures. "Picture" is not a representable
  value, so the UI cannot tell the truth.
- **Frames silently reverts.** Every task `setup()` writes `tool.api.settings.frames = row.params.frames`
  (`ten-frame-activity.js:227, 247, 272, 308, 335`), so a teacher's pick is overwritten on the next round.

**Why this needs a gate, not a code read.** A static scan for "declared setting key never referenced" was
run over all 53 settings-bearing files: **0 findings** — while the ten-frame defect is live. The key *is*
referenced, inside a function an override shadows. This is the repo's own recorded law: *"the string
exists" is not "the string is reached", and a source scan cannot tell them apart.* Two independent
surveys reached the same verdict: only runtime diffing can answer the operator's question.

The existing `scripts/audit-tool-control-liveness.js` cannot answer it either, and the reason is precise:
its `__world()` signature is scoped to `.lcs-app`, and `buildDrawer()` appends the drawer **inside**
`.lcs-app` (`lcs-shell.js:587`). A chip flipping its own `aria-checked` therefore already counts as
"the world changed". That is exactly the blind spot CLAUDE.md §23.6 names — *when a control's whole
output is its own appearance, assert what it CHANGES ELSEWHERE.*

**Scope (operator-chosen): all 53 settings-bearing surfaces** — the 8 ten-frame activities plus the ~52
standalone tools, ~143 fields in total.

---

## The contract this work is built on

Measured in `mini tools/lcs-shell.js`, do not re-derive:

- A tool declares `defaults: {key: value}` + `settings: [{key, type, labelKey, options?}]`.
- `type` is **only** `choice` | `color` | `toggle` (`:590-631`). An unknown type renders a label-only row
  with no control and **no `else` branch** — silently inert.
- The gear exists only when `tool.settings && tool.settings.length` (`:517`). All other activity engines
  declare `settings: []`, which is why ten-frame is the only activity with a drawer.
- One mutable store: `var settings = Object.assign({}, tool.defaults||{})` (`:472`), handed over as
  `api.settings` (`:484`). The drawer writes straight into it (`:610`, `:624`).
- On change, `commitSettings` (`:633-637`) runs **exactly** `track` → `tool.onSettings?.(key,val)` →
  `tool.render?.()`. Not `task.setup`, not `nextTask`, not `renderAnswerSurface`, not `postActivityResize`.
- The drawer is built **lazily on first gear click** and only once (`:638`).
- No persistence in the shell; a few tools hand-roll `localStorage` inside `onSettings`.
- `mini tools/game-shell.js` has no settings mechanism at all — out of scope by construction.

---

## Part 1 — `scripts/audit-settings-efficacy.js` (the standing gate)

New file. Reuses, does not re-author: the local http `serve()` + `resolveActivity()` shape from
`scripts/visual-qa-activity.js`, and the entitlement mocking + `LCSAudio` stubbing + click-then-keyboard
fallback from `scripts/audit-tool-control-liveness.js`.

### Discovery — derived, never a registration list
Scan `mini tools/*.js` for a `settings:` array with ≥1 `key:`. For each hit resolve its surfaces:
`<stem>.html` when it exists (standalone tool); for a `*-core.js`, find the wrapper `.html` files that
load it and enumerate every row of the matching `*-activities.json`, driving each as
`<wrapper>.html?activity=<id>` (`ten-frame-activity.js:97` reads that param). A new tool must need **no
entry here** — the `--all` roster is scope, not registration.

Measured: of the 53 settings-bearing files, **52 have a matching `<stem>.html`** and exactly one —
`ten-frame-core.js` — does not, so the wrapper+manifest branch has precisely one client today and is
still the branch that must exist, because it is where the reported defect lives.

### Static pre-checks (cheap, catch whole classes by construction)
Per field: `type` ∈ {choice, color, toggle}; choice/color carry a non-empty `options`; every `key` exists
in `defaults`; every `labelKey` — field **and** option — resolves in `tool.strings` for all 11 locales;
the tool defines `render` (exact spelling) or a correctly-spelled `onSettings`. Misspelling `onSettings`
or naming the repaint `draw()` is silently fatal today (`:635-636` are both guarded).

### Runtime efficacy — the actual gate
**Signature = the app with the drawer subtree removed.** Clone `.lcs-app`, delete `.lcs-drawer` and
`.lcs-drawer-scrim`, hash the remaining `innerHTML` (captures SVG `fill`, `img src`, text, classes,
`style`), plus `document.body.className` and root attributes (a few tools theme above the app), plus
counters for stubbed speech, tone, `window.print` and `localStorage`.

⚠ **Non-vacuity first, per the `.unh-tape` lesson.** Before asserting anything: a gear was found, a drawer
was built, N fields were rendered, the signature is non-empty, and **removing the drawer subtree actually
removed nodes**. A run that measured nothing must report "measured nothing", never pass.

Per field, escalating only as far as needed:

1. **At rest** — open the drawer, set each option in turn, compare signatures.
2. **After exercise** — if inert at rest, re-run with a scripted interaction after the change (tap the
   stage centre, press the first non-chrome tool button, press Check when present) and compare against
   the identical exercise with the setting unchanged. This is what reaches `speakOnCheck`, `tileSound`,
   `chimes`, `flashDuration` and the rest of the audio-deferred keys.
3. **Paired depth** — if still inert, retry with each *other* field held at each of its values. This is
   required for correctness, not thoroughness: ten-frame's colour genuinely cannot act while shape is
   `picture`, exactly as the liveness gate's comment records for *"Colours only acts after you switch to
   Shapes"*.

⚠⚠ **A CONTROL RUN, OR THE VERDICT IS WORTHLESS.** Several tools randomise (`name-sticks`, `number-drum`,
draw-style shelves), so two runs differ whether or not the setting did anything. Before crediting a field
as LIVE, run the same exercise twice with the setting **unchanged**. If that control already differs, the
surface is non-deterministic and the probe cannot speak — report `UNPROVEN-NONDETERMINISTIC`, never LIVE.
Without this the gate manufactures its own passes.

**Verdicts: LIVE / DEAD / UNPROVEN.** DEAD fails the run. UNPROVEN is reported, counted, and carried in an
explicit **auditable list with a one-line reason each** — never a loosened rule, and the list may only
shrink (the `KNOWN_GAPS` ratchet pattern already used by `preflight-tool-registration.js`).

### Two extra invariants the drawer owes the teacher
- **`api.settings[key]` is always a member of the field's declared `options`** — at rest and after every
  task load. This is the check that would have caught "drawer says Dot, board shows cat" as a defect
  rather than a mystery, and it catches any tool whose default is not in its own option list.
- **The chip's `aria-checked` matches `api.settings[key]` after any programmatic change.** The drawer is
  built once (`:638`), so a tool that bounces a value back — `hush-owl.js:778`, `class-timer.js:700`
  bouncing a premium value on a free account — leaves the drawer showing the rejected chip as selected.

### States and budget
Run `anon` and `premium` by default (`--states=all` for the third): a premium-gated option is
unreachable anonymously, and the bounce-back defect is only visible anonymously. ~53 surfaces × ~143
fields; expect 15–30 min for `--all`, shardable with `--tool=` / `--activity=`.

### Poison tests — both directions, per check
Mandatory before the gate is trusted, and the reason is on record: three separate gates in this repo
first shipped condemning **correct** code.
- Prove it **FAILS** on today's unfixed ten-frame `shape` (run against the pre-fix file).
- Prove it **PASSES** on a known-good field (`ten-frame.js` `upright`, read at `:645-646`).
- Every static check: fire it on a synthetic violation **and** pass it on a correct neighbour.
- Prove the non-vacuity guard fires when the drawer-exclusion selector matches nothing — the vacuous-
  selector failure that let `.unh-tape[data-t="a"]` compare two empty NodeLists.
- Prove the determinism control fires on a genuinely random surface.

### Wiring
Add to `deploy.sh` beside the other preflights once the corpus is green, and to §21.4's verification
table. Until then it runs on demand.

---

## Part 2 — the ten-frame fix (activity layer; 0 lines to `lcs-shell.*`)

The three defects share one cause: **the settings array is static while the row is not.** One mechanism
fixes all three.

**`mini tools/ten-frame-activity.js`**
- Define `settings` as an **accessor** on the activity object (`Object.defineProperty` after the
  `Object.assign`, so the assign does not invoke it). The shell reads `tool.settings.length` at mount and
  `tool.settings.forEach` at first gear click, so a getter is evaluated at both moments and is
  **race-free** against the async manifest fetch — no shell change, no timing luck. It returns, per
  resolved row:
  - **Frames: omitted in activity mode.** The task owns capacity (a make-15 row needs 2 frames), so the
    control is not offered. `setup()` may keep writing `api.settings.frames` — it is now internal state,
    not a promise to the teacher. Frames stays on the standalone `ten-frame.js` manipulative, where the
    teacher really does own it.
  - **Shape: gains a `picture` option, first, on themed rows only**, with `api.settings.shape` seeded to
    `'picture'` so the board looks exactly as it does today and the drawer finally tells the truth.
  - **Show number: omitted on rows that force `hideReadout`** (`how-many`, `write-numeral`) — the readout
    is suppressed there on purpose (the anti-answer-leak guard at `ten-frame-core.js:159-172`), so the
    toggle cannot act and must not be offered.
- **Make the override delegate instead of replacing.** `origPaint` is already captured at line 178 and
  unused: `if (s.shape !== 'picture') return origPaint.call(this);` restores dot/heart/star **and** the
  colour path, the `cell.dataset.color` dirty-check (`ten-frame-core.js:147`) and the `splitAt`/
  `splitColor` two-colour addend split the override silently dropped. Keep the image branch for
  `'picture'`, and keep its `readoutNum` guard — ⚠ the numeral-leak fix exists in **both** copies on
  purpose (`ten-frame-activity.js:191-206`); do not collapse it away.

**`mini tools/ten-frame-core.js`** — one new string, `shapePicture`, ×11 locales, beside `shapeDot` /
`shapeHeart` / `shapeStar` at `:31-33`. ⚠ Per §A.13.48 and the repeated recorded finding that *the
English source is the locale nobody reviews*, hand the EN word to the native panels as a **source to
audit**, not a target — and check each locale's noun against the shipped lexicon of the other tools
rather than against English.

**Cache-busters (§A.13.42):** bump `ten-frame-activity.js?v=4` and `ten-frame-core.js?v=3` in
`mini tools/ten-frame-activity.html` in the same commit.

---

## Part 3 — remediation loop

1. Build the gate, poison-test it in both directions, prove it fails on unfixed ten-frame.
2. Fix ten-frame; the gate goes green on all 8 rows.
3. Run `--all` across the other 52 tools. Triage into: real DEAD (fix), UNPROVEN (probe or ratchet entry
   with a written reason), false alarm (fix **what** is measured — ⚠ **never** move a threshold or widen
   a ban to pass; three recorded defects in this repo came from doing exactly that).
4. Fix in small reviewable commits grouped by tool, re-running the gate per commit.
5. Wire into `deploy.sh`.

---

## Verification

- `node scripts/audit-settings-efficacy.js --activity=ten-frame.count-to-10.make-n.animals` — DEAD before
  the fix on `shape` and `color`; LIVE after.
- `node scripts/audit-settings-efficacy.js --all` — 0 DEAD; UNPROVEN list short and each entry reasoned.
- `node scripts/visual-qa-activity.js --activity=<each of the 8 ten-frame ids>` — the §A.13.62 DoD:
  full sweep `320·360·412·768·1024·1366` green, since a counter SVG and a themed `@2x.webp` are different
  sizes and the not-tiny floor is real here.
- `node scripts/audit-activity-mobile.js` on the 8 rows; `node scripts/audit-activity-variety.js`.
- `git diff --name-only` shows **no** `lcs-shell.js` / `lcs-shell.css` change.
- ⭐ **I read the 360 / 768 / 1024 renders myself**, on a themed row, with shape switched to Heart —
  the operator's exact path. A green harness over a defect only the render shows is the recurring shape
  of every failure in this repo's log.
- Deploy per §20.4: `git pull` → `cp "mini tools"/ten-frame*.{js,json,html} /var/www/lcs-media/mini-tools/`
  **before** `deploy.sh` runs the build → `chown lcs-media:` → live check on a themed activity page.
