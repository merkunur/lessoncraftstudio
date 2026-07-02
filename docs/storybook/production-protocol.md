# Storybook Production Protocol

The end-to-end runbook for producing one story, the self-review rubric (the judgement the gates
can't make), and the onboarding test. This is what a producer — any model tier or the operator —
follows for story #2..#1000. It assumes you've read `authoring-playbook.md` (design) and
`authoring-guide.md` (mechanics).

## The protocol (in order)

1. **Pick the work.** Open `curriculum-ledger.json`; choose a row with `status:"open"` and remaining
   `storySlots`. Note its grade, teachingPoint, cssCode (or null), strand.
2. **Design.** Choose an **arc** (playbook §1) and the **guide** (cast-bible) + any companion. Write
   `blueprint.json` (`blueprint-format.md`): pages within the grade page-count, one mechanic per page
   (playbook §5) with `taskData` or `exerciseSpec`, narration lines within the grade word ceiling
   (playbook §3), the asset worklist, teaching-point metadata, the completion keepsake.
3. **Design gate.** `node scripts/storybook/gate-story.js --blueprint <path> --grade <G>`. Fix EVERY
   HARD finding per the playbook (the finding names the section). Re-run until clean. **Never move a
   threshold to pass — fix the design.**
4. **Expand.** `node scripts/storybook/blueprint-to-skeleton.js <id>` → story.json + strings.json
   skeleton. For `exerciseSpec` pages: `node scripts/storybook/sep-generate.js --from-blueprint <id>`
   materializes each SEP package into `exercises/ex-p<NN>/`.
5. **Compose.** Open the **Storybook Studio** (`studio-quickstart.md`): drop in scene art (placeholder
   art is fine to start — `gen-placeholder-art`), place characters, tune zone/hitbox coordinates on the
   canvas, add any `taskData` strings the skeleton didn't lift (e.g. count-tap `.word.<noun>` — must
   equal the IMAGE_VOCABULARY singular).
6. **Localize (per target locale).** The native-expert ensembles fill exactly the plug in
   authoring-guide §8 (strings values, reward label, SEO slug/title/intro, SEP `locales.<loc>` blocks,
   mp3s). Extend `story.locales`. **Never machine-translate; never leave English in a non-EN value.**
7. **Full gate + validate + QA (definition of done).**
   ```
   node scripts/storybook/validate-story.js <id>                     # fatal: schema/spatial/assets
   node scripts/storybook/gate-story.js <id> --grade <G> --blueprint <path>   # quality
   node scripts/preflight-activity-routes.js                         # route resolution
   node scripts/storybook/qa-storybook.js --story=<id>               # plays + solves + screenshots
   ```
   All green + **look at the screenshots (desktop first)**.
8. **Self-review** against the rubric below (the judgement no gate makes).
9. **SEO + deploy.** Add the `storybook-activities.json` row + `prose["storybook.<id>"]` + preview webp
   (authoring-guide §7). Deploy via the mini-tools flow — **cp scene/atlas/audio/exercise binaries to
   the server BEFORE `deploy.sh` builds** (§20.4). Verify live after the Cloudflare 5-min TTL.
10. **Ledger.** Bump the ledger row's `shipped` + record `storyId → point id` in `shippedIndex`.

## Self-review rubric (the gate can't check these — YOU must)

Score each; any "no" sends you back to the relevant playbook section, not to the gate.

- [ ] **Warmth.** Read the narration aloud. Does it sound like a kind adult reading to a small child on
      a lap? No quizzing, no pressure, no judgement. (playbook §3)
- [ ] **One clear point.** Every page reinforces the SAME teaching point; a child would come away having
      practised exactly one thing. (playbook §2)
- [ ] **Arc pays off.** Page 1 sets a promise; the last page pays it off (= the keepsake). It feels like
      a little story, not a worksheet in a costume. (playbook §1)
- [ ] **Distractor plausibility.** Wrong options are *reasonable* (same category / near value) so the
      child thinks — never absurd, never a trap. The correct answer is unambiguously correct. (playbook §4)
- [ ] **No answer tell.** Nothing marks the correct option (colour, position, size, gild). (§A.13.60)
- [ ] **Age fit.** Lines, vocabulary, quantities and pace suit the grade a real child of that age would
      enjoy — not just under the numeric ceilings. (playbook §2)
- [ ] **Standard honesty.** If a cssCode is set, the interaction *instantiates* the standard (child does
      the thing the standard describes), not merely touches its topic. PK carries no code. (§20.8)
- [ ] **Reduced-motion.** The story is fully solvable with animation off; every clip has a fallbackPose.
- [ ] **Localization integrity (per locale).** Reads natively, not translated; on-page words match the
      canonical vocabulary; no English leak.
- [ ] **Screenshots.** You looked at the rendered pages (desktop first) and they read well.

## The onboarding test (does the engine actually work without me?)

The engine is "done" when a **fresh session with no prior context**, given ONLY:
`authoring-playbook.md` + `authoring-guide.md` + `blueprint-format.md` + `cast-bible.md` +
`curriculum-ledger.json` + the gate scripts + the golden exemplars,

can produce a story that passes **both gates + QA** and holds the self-review rubric — WITHOUT asking a
question the docs don't answer. Any question it must ask, or any deficiency in its output, is an **engine
defect**: fix the doc/gate/exemplar so the next producer doesn't hit it. **Never hand-fix the story.**
This is the loop `empirical-perfection-loop` runs (C5).

## Golden exemplars (copy the nearest one for your grade)

| Story | Grade | Arc | Mechanics | Shows |
|---|---|---|---|---|
| `pip-counts-along` | PK | collect-and-sort | count-tap ×3 (≤5) | the pre-school readiness path (no cssCode) |
| `pip-picture-words` | K | discovery | worksheet-exercise ×4 (word-guess CVC) | the programmatic-SEP-from-blueprint path (B+C integration) |
| `pips-picnic` | 1 | quest | choice-board · find-object · 2×SEP · sort-bins | the multi-mechanic reference |

Grade 2 + 3 slots are open in the ledger; the pipeline is identical (author a blueprint at that grade,
gate, expand, compose, gate, qa).
