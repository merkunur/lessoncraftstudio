# Storybook Blueprint format (`blueprint-1`)

A **blueprint** is a machine-validatable DESIGN of a story — authored BEFORE any story.json, gated
BEFORE any art or wiring, then expanded to an sb-1 skeleton by `blueprint-to-skeleton.js`. It captures
every design decision from the playbook so the gate can catch mistakes at the cheapest moment.

```
blueprint  --gate-->  (fix per playbook)  --blueprint-to-skeleton-->  story.json + strings.json (skeleton)
           --sep-generate --from-blueprint (materializes any exerciseSpec)-->  exercises/
           --Studio compose (art, coords)-->  --validate + gate + qa-->  ship
```

## File

`mini tools/stories/<storyId>/blueprint.json`. One per story. Committed (git).

## Shape

```jsonc
{
  "$schema": "blueprint-1",
  "id": "pips-count-to-ten",           // = storyId (kebab)
  "grade": "K",                         // PK | K | 1 | 2 | 3  (drives every grade-band gate)
  "arc": "quest",                       // one of the 5 (playbook §1)
  "teachingPoint": {                    // exactly ONE (playbook §2)
    "id": "k-count-to-10",              // = a curriculum-ledger row id
    "grade": "K",
    "cssCode": "K.CC.B.4",              // EN CCSS anchor; null for readiness/PK (gate-checked)
    "strand": "Counting & Cardinality",
    "label": "Count to 10"              // child-neutral
  },
  "guide": "pip",                        // a cast-bible guide id (exactly one)
  "companions": ["bud"],                 // per-story; optional
  "reward": { "id": "story.pips-count-to-ten", "emoji": "🧺", "label": "Picnic Basket" },
  "assets": [                            // the ASSET WORKLIST — every asset a page references (gate-checked)
    { "id": "scene1", "kind": "image", "src": "scenes/page-01.webp", "size": { "w": 1600, "h": 1000 }, "placeholder": true },
    { "id": "pip",    "kind": "atlas", "src": "cast/pip/pip.base.json" }
  ],
  "pages": [
    {
      "scene": { "image": "scene1" },
      "characters": [ { "characterId": "pip", "atlasBase": "pip", "pose": "neutral", "anchor": { "x": 200, "y": 880 }, "scale": 0.7, "flip": false } ],
      "narration": [ { "id": "p01-l01", "text": "Let's count the apples!" } ],   // text within the grade word ceiling
      "interaction": {
        "moduleType": "sb-choice-board",
        "zone": { "x": 520, "y": 200, "w": 760, "h": 600 },
        "completionMode": "check",
        "taskData": { "targetKey": "three", "options": [ { "key": "two", "text": "2" }, { "key": "three", "text": "3" } ] }
      },
      "success": { "celebration": "burst", "holdMs": 800 }
    }
    // …or, instead of a ready taskData, a programmatic exercise:
    // "interaction": { "moduleType": "sb-worksheet-exercise",
    //   "zone": {…}, "completionMode": "check",
    //   "exerciseSpec": { "app": "word-guess", "family": "A", "params": { "theme": "animals" },
    //                     "vocabKeys": ["cat"], "seed": 7 } }   // sep-generate --from-blueprint materializes it
  ]
}
```

### Field notes

- **`grade`** is the gate's authority for page count, line length, lines/page, and number ceilings.
- **`narration[].text`** is authored EN inline; the skeleton generator lifts each into `strings.json`
  under the cue `id` (which is also the mp3 filename) and replaces it with a cue ref. Keep every line
  within the grade's word ceiling (playbook §2) — the gate reads these.
- **`interaction`** is either a ready `taskData` OR an `exerciseSpec` (for `sb-worksheet-exercise`).
  An `exerciseSpec` is materialized by `sep-generate.js --from-blueprint <id>` into
  `exercises/ex-p<NN>/`, and the skeleton writes `taskData.package: "exercises/ex-p<NN>"` for it.
- **`assets`** is the worklist. `placeholder:true` = art not yet final (gen-placeholder-art fills it);
  the gate only requires the asset be DECLARED, not that final art exists. Every asset a page references
  must appear here (asset-gap gate).
- **`interaction.zone`** is a PROVISIONAL starting rectangle. Use the module's `minZone`
  (authoring-guide §4) or copy the zone from the nearest exemplar for that module — final coordinates
  are tuned visually in the Studio (step 5). The design gate only needs a sane rect; don't agonize over
  exact pixels in the blueprint.
- **`reward`** becomes the story's completion keepsake. Any thematic emoji is fine (cosmetic).

## How it's gated + expanded

```
node scripts/storybook/gate-story.js --blueprint mini tools/stories/<id>/blueprint.json   # design gate (no story yet)
node scripts/storybook/blueprint-to-skeleton.js <id>                                       # writes story.json + strings.json skeleton
node scripts/storybook/sep-generate.js --from-blueprint <id>                               # materializes exerciseSpec pages (if any)
# → open in the Studio, place art + tune coordinates, author non-EN strings via the ensembles
node scripts/storybook/gate-story.js <id> --blueprint mini tools/stories/<id>/blueprint.json  # full gate
node scripts/storybook/validate-story.js <id> && node scripts/storybook/qa-storybook.js --story=<id>
```

The blueprint stays in the story folder as the design-of-record; re-run the design gate whenever it
changes.
