#!/usr/bin/env node
// Stream B substrate-gap-inventory generator — Arc 5 parallel sub-arc.
// Read-only audit per CLAUDE.md §A.14.5. Output: docs/lesson-plans/substrate-gap-inventory.md.
//
// Scope: 182 unauthored packages of the 203-target taxonomy at v3-merge state (2026-05-08).
// For each unauthored target:
//   1. Classify substrate-class (RELEVANT-defined / RELEVANT-flexible / N/A)
//   2. For RELEVANT-defined targets, enumerate candidate IMAGE_VOCABULARY keys
//   3. Mark each candidate key exists/missing
// Aggregate per domain + per strand + missing-key-cluster summary.

const fs = require('fs');
const path = require('path');

const TARGETS = require('../frontend/config/learning-targets.json');
const VOCAB_PATH = 'REFERENCE TRANSLATIONS/image-vocabulary.js';
const OUT_PATH = 'docs/lesson-plans/substrate-gap-inventory.md';

// --- Load IMAGE_VOCABULARY keys ---
const vocabSource = fs.readFileSync(VOCAB_PATH, 'utf8');
const vocabKeys = new Set();
const keyRe = /^\s+"([a-z0-9_-]+)":\s*\{/gm;
let m;
while ((m = keyRe.exec(vocabSource)) !== null) {
  vocabKeys.add(m[1]);
}

// --- Load authored slugs from disk ---
const packagesDir = 'docs/lesson-plans/packages';
const authored = new Set(
  fs.readdirSync(packagesDir, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name)
);

// --- Flatten all targets ---
const allTargets = [];
for (const d of TARGETS.domains) {
  for (const s of d.strands) {
    for (const t of s.targets) {
      allTargets.push({
        domain: d.slug,
        strand: s.slug,
        slug: t.slug,
        name: t.name,
        description: t.description,
        prerequisites: t.prerequisites || [],
        curriculum: t.curriculum_alignment || [],
        authored: authored.has(t.slug),
      });
    }
  }
}

// --- Substrate-class classification heuristics ---
// Class A (RELEVANT-defined): vocab acquisition + classification with explicit cluster boundaries
//   → enumerate per-cluster candidate keys
// Class B (RELEVANT-flexible): uses image library breadth; specific keys not load-bearing
//   → "uses any image-library content; substrate-ready if theme-coverage is broad"
// Class C (N/A): language-bound (phonics/spelling/oral/text) OR abstract numeric
//   → image-vocabulary not load-bearing for this target

const CLUSTER_KEYS = {
  // Vocabulary-acquisition canonical clusters (subset already authored; this is the FULL cluster map)
  'farm-animals': ['cow', 'pig', 'sheep', 'horse', 'chicken', 'duck', 'goat', 'rabbit', 'donkey', 'dog'],
  'zoo-animals': ['lion', 'tiger', 'elephant', 'giraffe', 'zebra', 'monkey', 'panda', 'kangaroo', 'penguin', 'koala'],
  'pet-animals': ['cat', 'dog', 'rabbit', 'hamster', 'guinea-pig', 'fish', 'turtle', 'parrot', 'canary', 'gerbil'],
  'fruits': ['apple', 'banana', 'orange', 'pear', 'grape', 'strawberry', 'watermelon', 'pineapple', 'lemon', 'cherry'],
  'vegetables': ['carrot', 'tomato', 'potato', 'onion', 'lettuce', 'broccoli', 'cucumber', 'pepper', 'corn', 'pea'],
  'foods': ['pizza', 'bread', 'milk', 'egg', 'apple', 'banana', 'cheese', 'sandwich', 'water', 'juice'],
  'body-parts': ['head', 'eye', 'ear', 'nose', 'mouth', 'hand', 'foot', 'arm', 'leg', 'finger'],
  'clothing': ['shirt', 'pants', 'shoes', 'hat', 'jacket', 'dress', 'socks', 'gloves', 'scarf', 'sweater'],
  'vehicles': ['car', 'bus', 'truck', 'bicycle', 'motorcycle', 'airplane', 'boat', 'train', 'helicopter', 'ambulance'],
  'house-rooms': ['kitchen', 'bedroom', 'bathroom', 'living-room', 'garage', 'garden', 'attic', 'basement', 'hallway', 'dining-room'],
  'school-objects': ['pencil', 'pen', 'eraser', 'ruler', 'notebook', 'backpack', 'scissors', 'glue', 'crayon', 'book'],
  'weather-words': ['sun', 'rain', 'cloud', 'snow', 'wind', 'storm', 'rainbow', 'lightning', 'fog', 'ice'],
  'action-verbs': ['running', 'walking', 'jumping', 'sitting', 'standing', 'eating', 'drinking', 'sleeping', 'reading', 'writing'],
  'emotions': ['happy', 'sad', 'angry', 'scared', 'surprised', 'tired', 'excited', 'confused', 'proud', 'shy'],
  'family-members': ['mother', 'father', 'sister', 'brother', 'grandmother', 'grandfather', 'baby', 'son', 'daughter'],
  'colors': ['red', 'blue', 'yellow', 'green', 'orange', 'purple', 'pink', 'brown', 'black', 'white'],
  'community-helpers': ['doctor', 'teacher', 'firefighter', 'police-officer', 'chef', 'farmer', 'mailman', 'nurse', 'dentist', 'mechanic'],
  'community-places': ['school', 'hospital', 'park', 'library', 'bank', 'store', 'restaurant', 'post-office', 'fire-station', 'museum'],
  'transportation-land': ['car', 'bus', 'truck', 'bicycle', 'motorcycle', 'train'],
  'transportation-sea': ['boat', 'ship', 'submarine', 'sailboat'],
  'transportation-air': ['airplane', 'helicopter', 'hot-air-balloon', 'rocket'],
  'days-of-week': [], // calendar text; not image-vocabulary
  'months-of-year': [], // calendar text; not image-vocabulary
  'plant-parts': ['root', 'stem', 'leaf', 'flower', 'fruit', 'seed'],
  'plant-life-cycle-stages': ['seed', 'sprout', 'plant', 'flower', 'fruit'],
  'butterfly-life-cycle-stages': ['egg', 'caterpillar', 'chrysalis', 'butterfly'],
  'four-seasons': ['spring', 'summer', 'autumn', 'winter'],
  'materials': ['wood', 'plastic', 'metal', 'glass', 'paper', 'fabric', 'rubber', 'stone'],
  'shapes-2d-basic': ['circle', 'square', 'triangle', 'rectangle'],
  'shapes-2d-extended': ['circle', 'square', 'triangle', 'rectangle', 'oval', 'diamond', 'star', 'heart', 'pentagon', 'hexagon'],
  'shapes-3d': ['cube', 'sphere', 'cylinder', 'cone', 'pyramid'],
  'spatial-position-words': [], // prepositions are abstract — image-vocabulary supports rendering object-in-position
  'size-comparison-words': [], // abstract — image-vocabulary supports rendering big/small comparisons
};

// Classification map: target.slug → { class: 'A'|'B'|'C', cluster?: string, note: string }
function classify(t) {
  const s = t.slug;

  // === Class C (N/A) — language-bound or abstract-numeric ===
  if (t.strand === 'phonological-awareness') {
    return { class: 'C', note: 'Phonics — sound-based, not image-vocabulary-bound. Composes against phonics word lists.' };
  }
  if (t.strand === 'letter-recognition') {
    return { class: 'C', note: 'Alphabet recognition — letter inventory not in IMAGE_VOCABULARY (alphabet is universal across locale).' };
  }
  if (t.strand === 'phonics-decoding') {
    return { class: 'C', note: 'Phonics decoding — sound/grapheme-based, not image-vocabulary-bound.' };
  }
  if (t.strand === 'spelling-and-encoding') {
    return { class: 'C', note: 'Word-based; spelling/encoding does not compose against image-vocabulary.' };
  }
  if (t.strand === 'speaking-and-listening') {
    return { class: 'C', note: 'Oral language; no image-vocabulary load-bearing dependency.' };
  }
  if (t.strand === 'writing-composition') {
    return { class: 'C', note: 'Text production; not image-vocabulary-bound (some targets use picture prompts but image-vocabulary is not load-bearing).' };
  }
  if (t.strand === 'multilingual-language-awareness') {
    if (s === 'name-this-object-in-two-languages') {
      return { class: 'B', note: 'Uses image-library breadth (any object, named in two languages). Substrate-ready if theme-coverage broad.' };
    }
    return { class: 'C', note: 'Oral/text-based language-awareness; not image-vocabulary-bound.' };
  }
  if (t.strand === 'reading-comprehension') {
    return { class: 'C', note: 'Text-based comprehension; image-vocabulary not load-bearing (some targets use picture cues but composes against story content).' };
  }
  if (t.strand === 'handwriting') {
    return { class: 'C', note: 'Letter/numeral formation; no image-vocabulary dependency.' };
  }
  if (t.strand === 'drawing-and-tracing') {
    return { class: 'C', note: 'Tracing/drawing primitives; no image-vocabulary dependency.' };
  }

  // === Early-numeracy abstract-numeric ===
  if (t.strand === 'counting-and-cardinality') {
    if (['count-by-rote-1-to-100', 'skip-count-by-2', 'skip-count-by-5', 'skip-count-by-10'].includes(s)) {
      return { class: 'C', note: 'Abstract numeric counting; numeral-cards primary anchor, not image-vocabulary.' };
    }
  }
  if (t.strand === 'number-sense-comparison') {
    if (['compare-numerals-1-to-10', 'use-greater-less-equal-symbols', 'order-numerals-1-to-10', 'find-number-before-after'].includes(s)) {
      return { class: 'C', note: 'Numeral comparison; numeral-cards primary, not image-vocabulary.' };
    }
  }
  if (t.strand === 'addition-subtraction') {
    return { class: 'C', note: 'Numeric addition/subtraction; theme-mode visuals optional but image-vocabulary not load-bearing.' };
  }
  if (t.strand === 'place-value') {
    return { class: 'C', note: 'Place-value abstraction; numeral/place-value-blocks primary, not image-vocabulary.' };
  }

  // === Class A (RELEVANT-defined) — vocabulary-acquisition canonical clusters ===
  if (s === 'identify-and-name-vegetables' || s === 'point-to-named-vegetable') return { class: 'A', cluster: 'vegetables', note: 'Standard vocab cluster.' };
  if (s === 'identify-and-name-weather-words') return { class: 'A', cluster: 'weather-words', note: 'Weather vocab cluster.' };
  if (s === 'identify-and-name-action-verbs' || s === 'point-to-named-action') return { class: 'A', cluster: 'action-verbs', note: 'Verb-form complexity per CLAUDE.md §17.9; gerund forms expected; substrate gap from Arc 4 Phase 1 Path B.' };
  if (s === 'identify-and-name-family-members' || s === 'point-to-named-family-member') return { class: 'A', cluster: 'family-members', note: 'Cultural-variation sensitive per Arc 4 Path B; substrate gap.' };
  if (s === 'use-size-comparison-words') return { class: 'A', cluster: 'size-comparison-words', note: 'Abstract; image-vocabulary supports rendering big/small comparisons via size-attribute.' };
  if (s === 'use-spatial-position-words') return { class: 'A', cluster: 'spatial-position-words', note: 'Prepositions; abstract; image-vocabulary supports rendering object-in-position.' };

  // point-to-named-X variants (receptive)
  if (s === 'point-to-named-farm-animal') return { class: 'A', cluster: 'farm-animals', note: 'Receptive variant; same cluster as productive identify-and-name.' };
  if (s === 'point-to-named-zoo-animal') return { class: 'A', cluster: 'zoo-animals', note: 'Receptive variant.' };
  if (s === 'point-to-named-body-part') return { class: 'A', cluster: 'body-parts', note: 'Receptive variant.' };
  if (s === 'point-to-named-clothing-item') return { class: 'A', cluster: 'clothing', note: 'Receptive variant.' };
  if (s === 'point-to-named-vehicle') return { class: 'A', cluster: 'vehicles', note: 'Receptive variant.' };
  if (s === 'point-to-named-color') return { class: 'A', cluster: 'colors', note: 'Receptive variant.' };

  // === World-knowledge living-things ===
  if (s === 'classify-animals-by-habitat') return { class: 'A', cluster: 'farm-animals', note: 'Composes against farm-animals + zoo-animals + pet-animals + sea-creatures (multi-cluster); substrate breadth across animal clusters.' };
  if (s === 'classify-animals-by-diet') return { class: 'A', cluster: 'farm-animals', note: 'Same multi-cluster animal substrate (carnivore/herbivore/omnivore classification).' };
  if (s === 'identify-plant-parts') return { class: 'A', cluster: 'plant-parts', note: 'Plant anatomy cluster.' };
  if (s === 'describe-plant-life-cycle') return { class: 'A', cluster: 'plant-life-cycle-stages', note: 'Life-cycle sequence stages.' };
  if (s === 'describe-butterfly-life-cycle') return { class: 'A', cluster: 'butterfly-life-cycle-stages', note: 'Butterfly life-cycle stages.' };
  if (s === 'identify-living-vs-nonliving') return { class: 'B', note: 'Uses image-library breadth across animals/plants vs objects/materials. Substrate-ready if multi-cluster coverage broad.' };

  // === World-knowledge environment-and-weather ===
  if (s === 'identify-four-seasons') return { class: 'A', cluster: 'four-seasons', note: 'Seasons cluster (4 keys).' };
  if (s === 'identify-weather-types') return { class: 'A', cluster: 'weather-words', note: 'Weather cluster (overlaps with vocabulary-acquisition).' };
  if (s === 'describe-day-night-cycle') return { class: 'B', note: 'Sun/moon/star imagery; small-cluster.' };
  if (s === 'describe-water-cycle-basic') return { class: 'B', note: 'Water-cycle process imagery; small-cluster.' };

  // === World-knowledge community-and-roles ===
  if (s === 'identify-community-helpers') return { class: 'A', cluster: 'community-helpers', note: 'Community-helper jobs cluster.' };
  if (s === 'identify-community-places') return { class: 'A', cluster: 'community-places', note: 'Community-places cluster.' };
  if (s === 'identify-transportation-types') return { class: 'A', cluster: 'transportation-land', note: 'Transportation classification (land/sea/air); composes against transportation-land + transportation-sea + transportation-air clusters.' };

  // === World-knowledge time-and-routine ===
  if (s === 'identify-days-of-week') return { class: 'C', note: 'Calendar text labels; not image-vocabulary-bound.' };
  if (s === 'identify-months-of-year') return { class: 'C', note: 'Calendar text labels; not image-vocabulary-bound.' };
  if (s === 'sequence-daily-routine') return { class: 'B', note: 'Routine activity images (wake-up / brush-teeth / eat-breakfast etc.); image-library breadth.' };
  if (s === 'use-before-after-vocabulary') return { class: 'C', note: 'Time-sequence vocabulary; abstract.' };

  // === World-knowledge materials-and-properties ===
  if (s === 'identify-common-materials') return { class: 'A', cluster: 'materials', note: 'Material-types cluster.' };
  if (s === 'describe-material-properties') return { class: 'B', note: 'Material-property descriptions; composes against materials cluster + property attributes.' };

  // === World-knowledge personal-social-emotional-development ===
  if (s === 'identify-own-emotions-in-context' || s === 'identify-emotions-of-others-from-faces') {
    return { class: 'A', cluster: 'emotions', note: 'Emotions cluster (overlaps with vocabulary-acquisition; identify-and-name-emotions already authored at Arc 2).' };
  }
  if (s === 'name-things-i-can-do-myself') return { class: 'B', note: 'Self-care action images; composes against routine-activity image-library content.' };
  if (s === 'share-and-take-turns' || s === 'wait-my-turn' || s === 'identify-classroom-rules' || s === 'identify-safe-vs-unsafe-situations' || s === 'make-and-name-a-friend') {
    return { class: 'B', note: 'Social-scene image-library content; substrate-flexible.' };
  }

  // === Early-numeracy measurement ===
  if (s === 'compare-by-length' || s === 'compare-by-weight' || s === 'compare-by-capacity' || s === 'order-3-objects-by-length') {
    return { class: 'B', note: 'Comparison composes against image-library objects with comparable attribute; substrate-flexible.' };
  }
  if (s === 'tell-time-to-the-hour' || s === 'tell-time-to-half-hour' || s === 'tell-time-to-quarter-hour') {
    return { class: 'B', note: 'Analog-clock imagery (clock + hands); small-cluster (clock-related image-library content).' };
  }
  if (s === 'identify-coin-values' || s === 'recognize-money-amounts-up-to-1-unit') {
    return { class: 'B', note: 'Currency imagery (locale-dependent: US coins / EU coins / GBP coins / etc.); image-library breadth needed.' };
  }

  // === Early-numeracy geometry ===
  if (s === 'identify-2d-shapes-basic') return { class: 'A', cluster: 'shapes-2d-basic', note: '2D basic shapes cluster (4 keys).' };
  if (s === 'identify-2d-shapes-extended') return { class: 'A', cluster: 'shapes-2d-extended', note: '2D extended shapes cluster (10 keys).' };
  if (s === 'identify-3d-shapes') return { class: 'A', cluster: 'shapes-3d', note: '3D shapes cluster (5 keys).' };
  if (s === 'describe-shape-attributes' || s === 'compose-shapes-from-parts' || s === 'identify-symmetry-line' || s === 'partition-shape-halves-quarters' || s === 'identify-fractions-half-third-quarter') {
    return { class: 'B', note: 'Geometric-attribute reasoning; composes against shape clusters + diagram primitives.' };
  }

  // === Early-numeracy data-and-graphs ===
  if (s === 'sort-objects-by-attribute' || s === 'count-and-graph-categories' || s === 'interpret-simple-bar-graph' || s === 'interpret-simple-pictograph') {
    return { class: 'B', note: 'Composes against image-library breadth (objects to sort / graph). Substrate-flexible.' };
  }

  // === Cognitive-and-executive-function ===
  if (t.strand === 'pattern-recognition') {
    return { class: 'B', note: 'Pattern AB/AAB/ABB/ABC/AABB composes against image-library breadth (any objects in repeating patterns). Substrate-flexible.' };
  }
  if (t.strand === 'sorting-and-classification') {
    return { class: 'B', note: 'Sorting by color/shape/size/category/multi-attribute. Composes against image-library breadth + theme-coverage.' };
  }
  if (s === 'identify-odd-one-out-by-category' || s === 'identify-odd-one-out-by-attribute') {
    return { class: 'B', note: 'Odd-one-out composes against image-library breadth (categories + attributes); substrate-flexible.' };
  }
  if (s === 'complete-analogy-image-pair') {
    return { class: 'B', note: 'Analogy pairs (A:B :: C:?) compose against image-library breadth.' };
  }
  if (s === 'solve-4x4-picture-sudoku' || s === 'solve-6x6-picture-sudoku') {
    return { class: 'B', note: 'Picture-sudoku composes against any 4-6-key image set. Substrate-flexible.' };
  }
  if (s === 'find-hidden-target-in-busy-scene' || s === 'count-instances-of-target-in-grid' || s === 'remember-image-pair-positions') {
    return { class: 'B', note: 'Visual-scanning/memory composes against image-library breadth.' };
  }

  // === Fine-motor spatial-reasoning ===
  if (s === 'use-position-vocabulary') return { class: 'A', cluster: 'spatial-position-words', note: 'Position prepositions (in/on/under/next-to); abstract — image-vocabulary supports rendering object-in-position scenes.' };
  if (s === 'use-direction-vocabulary') return { class: 'C', note: 'Direction terms (left/right/up/down); abstract.' };
  if (s === 'follow-directions-on-grid' || s === 'navigate-simple-maze' || s === 'navigate-complex-maze') {
    return { class: 'B', note: 'Grid/maze navigation; composes against image-library breadth (target images on grid).' };
  }

  // === Fine-motor visual-discrimination ===
  if (s === 'match-image-to-shadow' || s === 'match-image-piece-to-whole' || s === 'find-missing-piece' || s === 'spot-the-difference-2-pictures') {
    return { class: 'B', note: 'Visual-discrimination composes against image-library breadth.' };
  }

  // Fallback
  return { class: 'C', note: 'No specific substrate-relevance heuristic matched; default N/A.' };
}

// === Apply classification + key existence check ===
const unauthored = allTargets.filter(t => !t.authored);
const enriched = unauthored.map(t => {
  const c = classify(t);
  if (c.class === 'A' && c.cluster && CLUSTER_KEYS[c.cluster]) {
    const candidates = CLUSTER_KEYS[c.cluster];
    const exist = candidates.filter(k => vocabKeys.has(k));
    const missing = candidates.filter(k => !vocabKeys.has(k));
    return {
      ...t, ...c, candidates, exist, missing,
      gapClass: missing.length === 0 ? 'CLEAN' : (exist.length === 0 ? 'EMPTY' : 'GAP')
    };
  }
  return { ...t, ...c, candidates: [], exist: [], missing: [], gapClass: c.class === 'C' ? 'N/A' : 'FLEXIBLE' };
});

// === Aggregate ===
const byClass = { A: 0, B: 0, C: 0 };
const byGap = { CLEAN: 0, GAP: 0, EMPTY: 0, FLEXIBLE: 0, 'N/A': 0 };
const byDomain = {};
const byStrand = {};
const missingKeyCount = {};

for (const t of enriched) {
  byClass[t.class]++;
  byGap[t.gapClass]++;
  byDomain[t.domain] = byDomain[t.domain] || { CLEAN: 0, GAP: 0, EMPTY: 0, FLEXIBLE: 0, 'N/A': 0 };
  byDomain[t.domain][t.gapClass]++;
  byStrand[t.strand] = byStrand[t.strand] || { CLEAN: 0, GAP: 0, EMPTY: 0, FLEXIBLE: 0, 'N/A': 0 };
  byStrand[t.strand][t.gapClass]++;
  for (const k of t.missing || []) {
    missingKeyCount[k] = (missingKeyCount[k] || 0) + 1;
  }
}

// === Generate markdown ===
const lines = [];
lines.push('# Substrate-gap inventory — Arc 5 Stream B sub-arc');
lines.push('');
lines.push('**Status:** Single-session read-only audit per CLAUDE.md §A.14.5 audit-only commission shape. Output of Arc 5 Stream B parallel sub-arc (commenced post-v3 SUBSCRIPTION-SCOPE.md merge, 2026-05-08).');
lines.push('**Generated:** 2026-05-08');
lines.push('**Generator script:** `scripts/substrate-gap-inventory.js`');
lines.push(`**IMAGE_VOCABULARY source:** \`${VOCAB_PATH}\` (${vocabKeys.size} canonical keys).`);
lines.push('**Targets source:** `frontend/config/learning-targets.json` (203 leaf target slugs across 5 domains).');
lines.push(`**Authored on disk:** ${authored.size} packages (subtracting README.md from \`docs/lesson-plans/packages/\`).`);
lines.push(`**Unauthored scope:** ${unauthored.length} targets (= 203 - ${authored.size}).`);
lines.push('');
lines.push('---');
lines.push('');
lines.push('## Methodology');
lines.push('');
lines.push('Each unauthored target classified into one of three substrate-classes:');
lines.push('');
lines.push('- **Class A — RELEVANT-defined-keys.** Target composes against a specific cluster of IMAGE_VOCABULARY keys (e.g., `identify-and-name-fruits` → `[apple, banana, orange, ...]`). Per-target candidate-key enumeration produces a missing-keys list; `gapClass` ∈ {`CLEAN`, `GAP`, `EMPTY`}.');
lines.push('- **Class B — RELEVANT-flexible.** Target composes against image-library breadth without specific-key bindings (e.g., `solve-4x4-picture-sudoku` works against any 4-key set; `pattern AB` works against any pair of distinct objects). Substrate-readiness measured by theme-coverage breadth, not specific keys. `gapClass` = `FLEXIBLE`.');
lines.push('- **Class C — N/A.** Target is language-bound (phonics / spelling / oral language / text production / reading comprehension) OR abstract-numeric (counting / addition / place-value); IMAGE_VOCABULARY is not load-bearing. `gapClass` = `N/A`.');
lines.push('');
lines.push('Class A candidate keys come from a hardcoded `CLUSTER_KEYS` map in the generator script. The map encodes the operator-strategic-locked cluster compositions for the canonical vocabulary domains. Future cluster-edits update the script and regenerate the inventory.');
lines.push('');
lines.push('---');
lines.push('');
lines.push('## Aggregate summary');
lines.push('');
lines.push(`**${unauthored.length} unauthored targets classified:**`);
lines.push('');
lines.push('| Class | Count | % | Description |');
lines.push('|---|---|---|---|');
const pct = n => ((n / unauthored.length) * 100).toFixed(1);
lines.push(`| A — RELEVANT-defined | ${byClass.A} | ${pct(byClass.A)}% | Specific candidate-key cluster; gap-measurable |`);
lines.push(`| B — RELEVANT-flexible | ${byClass.B} | ${pct(byClass.B)}% | Image-library-breadth-driven; theme-coverage-measured |`);
lines.push(`| C — N/A | ${byClass.C} | ${pct(byClass.C)}% | Language-bound or abstract-numeric; substrate-irrelevant |`);
lines.push('');
lines.push('**Class A gap classification breakdown:**');
lines.push('');
lines.push('| Gap class | Count | Description |');
lines.push('|---|---|---|');
lines.push(`| CLEAN | ${byGap.CLEAN} | All candidate keys exist in IMAGE_VOCABULARY |`);
lines.push(`| GAP | ${byGap.GAP} | Some candidate keys exist; some missing |`);
lines.push(`| EMPTY | ${byGap.EMPTY} | All candidate keys missing |`);
lines.push(`| FLEXIBLE | ${byGap.FLEXIBLE} | Class B; not gap-measurable per specific keys |`);
lines.push(`| N/A | ${byGap['N/A']} | Class C; image-vocabulary not load-bearing |`);
lines.push('');
lines.push('## Per-domain breakdown');
lines.push('');
lines.push('| Domain | CLEAN | GAP | EMPTY | FLEXIBLE | N/A | Total unauthored |');
lines.push('|---|---|---|---|---|---|---|');
for (const [d, counts] of Object.entries(byDomain)) {
  const total = counts.CLEAN + counts.GAP + counts.EMPTY + counts.FLEXIBLE + counts['N/A'];
  lines.push(`| ${d} | ${counts.CLEAN} | ${counts.GAP} | ${counts.EMPTY} | ${counts.FLEXIBLE} | ${counts['N/A']} | ${total} |`);
}
lines.push('');
lines.push('## Per-strand breakdown');
lines.push('');
lines.push('| Strand | CLEAN | GAP | EMPTY | FLEXIBLE | N/A | Total unauthored |');
lines.push('|---|---|---|---|---|---|---|');
const strandsByDomain = {};
for (const t of enriched) {
  strandsByDomain[t.domain] = strandsByDomain[t.domain] || new Set();
  strandsByDomain[t.domain].add(t.strand);
}
for (const d of Object.keys(byDomain)) {
  for (const st of [...strandsByDomain[d]].sort()) {
    const counts = byStrand[st];
    const total = counts.CLEAN + counts.GAP + counts.EMPTY + counts.FLEXIBLE + counts['N/A'];
    lines.push(`| ${d}/${st} | ${counts.CLEAN} | ${counts.GAP} | ${counts.EMPTY} | ${counts.FLEXIBLE} | ${counts['N/A']} | ${total} |`);
  }
}
lines.push('');
lines.push('## Top missing IMAGE_VOCABULARY keys (Class A gaps)');
lines.push('');
lines.push('Aggregated across all Class A targets. A key counted multiple times = appears as a candidate key in multiple unauthored targets (cross-cluster overlap).');
lines.push('');
const sortedMissing = Object.entries(missingKeyCount).sort((a, b) => b[1] - a[1]);
if (sortedMissing.length === 0) {
  lines.push('_(No missing keys — all Class A clusters are CLEAN against IMAGE_VOCABULARY.)_');
} else {
  lines.push('| Missing key | Cluster appearances |');
  lines.push('|---|---|');
  for (const [k, c] of sortedMissing) {
    lines.push(`| \`${k}\` | ${c} |`);
  }
}
lines.push('');
lines.push('---');
lines.push('');
lines.push('## Per-target detail (Class A — RELEVANT-defined-keys)');
lines.push('');
const classATargets = enriched.filter(t => t.class === 'A').sort((a, b) => a.slug.localeCompare(b.slug));
if (classATargets.length === 0) {
  lines.push('_(No Class A unauthored targets.)_');
} else {
  for (const t of classATargets) {
    lines.push(`### \`${t.slug}\` — ${t.name}`);
    lines.push('');
    lines.push(`- **Domain / strand:** ${t.domain} / ${t.strand}`);
    lines.push(`- **Description:** ${t.description}`);
    lines.push(`- **Cluster:** \`${t.cluster}\``);
    lines.push(`- **Gap class:** ${t.gapClass}`);
    lines.push(`- **Candidate keys (${t.candidates.length}):** ${t.candidates.length ? t.candidates.map(k => `\`${k}\``).join(', ') : '_(none in cluster map; abstract)_'}`);
    if (t.exist.length) lines.push(`- **Exist in IMAGE_VOCABULARY (${t.exist.length}):** ${t.exist.map(k => `\`${k}\``).join(', ')}`);
    if (t.missing.length) lines.push(`- **Missing from IMAGE_VOCABULARY (${t.missing.length}):** ${t.missing.map(k => `\`${k}\``).join(', ')}`);
    lines.push(`- **Note:** ${t.note}`);
    if (t.prerequisites && t.prerequisites.length) lines.push(`- **Prerequisites:** ${t.prerequisites.map(p => `\`${p}\``).join(', ')}`);
    lines.push('');
  }
}
lines.push('---');
lines.push('');
lines.push('## Per-target detail (Class B — RELEVANT-flexible)');
lines.push('');
lines.push('Class B targets compose against image-library breadth without specific-key bindings. Substrate-readiness is theme-coverage-measured at material-render time, not via candidate-key enumeration. Authoring proceeds without substrate gaps; theme-coverage breadth determines bundle-curation breadth (per v3 SUBSCRIPTION-SCOPE.md Pillar 2 redefinition).');
lines.push('');
const classBTargets = enriched.filter(t => t.class === 'B').sort((a, b) => a.slug.localeCompare(b.slug));
if (classBTargets.length === 0) {
  lines.push('_(No Class B unauthored targets.)_');
} else {
  lines.push('| Target | Domain / Strand | Note |');
  lines.push('|---|---|---|');
  for (const t of classBTargets) {
    const note = (t.note || '').replace(/\|/g, '\\|');
    lines.push(`| \`${t.slug}\` | ${t.domain} / ${t.strand} | ${note} |`);
  }
}
lines.push('');
lines.push('---');
lines.push('');
lines.push('## Per-target detail (Class C — N/A)');
lines.push('');
lines.push('Class C targets are language-bound (phonics / spelling / oral / text-production / reading-comprehension) OR abstract-numeric (counting / addition / place-value). IMAGE_VOCABULARY is not load-bearing for these targets; authoring proceeds against word-lists / numeral-cards / abstract pedagogical primitives. Listed for completeness; not actionable from substrate-gap perspective.');
lines.push('');
const classCTargets = enriched.filter(t => t.class === 'C').sort((a, b) => a.slug.localeCompare(b.slug));
if (classCTargets.length === 0) {
  lines.push('_(No Class C unauthored targets.)_');
} else {
  lines.push('| Target | Domain / Strand | Reason |');
  lines.push('|---|---|---|');
  for (const t of classCTargets) {
    const note = (t.note || '').replace(/\|/g, '\\|');
    lines.push(`| \`${t.slug}\` | ${t.domain} / ${t.strand} | ${note} |`);
  }
}
lines.push('');
lines.push('---');
lines.push('');
lines.push('## Operator-side image-authoring list trigger');
lines.push('');
lines.push('Per Arc 5 ratification 1 + v3 SUBSCRIPTION-SCOPE.md §5 Stream C: the operator\'s 1,000-image authoring pipeline triggers from this inventory data. Recommended sequencing for image-authoring waves to maximize substrate-gap closure:');
lines.push('');
lines.push('**Wave 1 (highest impact — closes Arc 5 Phase 1 substrate sweep dependencies):**');
lines.push('- `family-members` cluster: 9 keys (mother / father / sister / brother / grandmother / grandfather / baby / son / daughter). Per Arc 4 Phase 1 Path B finding.');
lines.push('- `action-verbs` cluster: 10 keys (running / walking / jumping / sitting / standing / eating / drinking / sleeping / reading / writing). Per Arc 4 Phase 1 Path B finding.');
lines.push('');
lines.push('**Wave 2 (vocabulary-acquisition completion — unblocks remaining `identify-and-name-X` targets):**');
lines.push('- Any Class A `EMPTY` clusters from this inventory.');
lines.push('- Any Class A `GAP` clusters from this inventory; complete the cluster.');
lines.push('');
lines.push('**Wave 3+ (theme-coverage breadth — supports Class B targets + bundle-curation):**');
lines.push('- Operator-strategic theme expansion against Class B theme-coverage targets.');
lines.push('- Curation-priority themes (per Pillar 2 launch list: back-to-school / Halloween / winter-holidays / Valentine\'s / end-of-year / unit-review).');
lines.push('');
lines.push('---');
lines.push('');
lines.push('## Methodology limitations + carry-forwards');
lines.push('');
lines.push('1. **Class A cluster map is heuristic.** The `CLUSTER_KEYS` map in `scripts/substrate-gap-inventory.js` encodes operator-strategic-locked cluster compositions for the canonical vocabulary-acquisition domains + auxiliary world-knowledge clusters. The map matches Arc 1-4 authored-package cluster choices (e.g., `pet-animals` matches Arc 4 Phase 1 lock; `vehicles` matches Arc 2 ship). Operator-side cluster-edits during image-authoring wave production update the map and regenerate the inventory.');
lines.push('');
lines.push('2. **Class B substrate-readiness is not specific-key-measurable.** Class B targets compose against image-library breadth; substrate-readiness is theme-coverage-measured at material-render time. The inventory records Class B targets without producing key-level gap data; future bundle-curation arcs determine which Class B targets are substrate-ready against which themes.');
lines.push('');
lines.push('3. **Class C targets are out of scope.** Phonics / spelling / oral language / text-production / reading-comprehension / abstract-numeric targets do not load-bear against IMAGE_VOCABULARY. The inventory lists them for completeness; image-authoring waves do not action them.');
lines.push('');
lines.push('4. **Cross-cluster overlap.** Some keys (e.g., `cat`, `dog`, `apple`, `banana`, `egg`) appear in multiple Class A clusters. The "Top missing IMAGE_VOCABULARY keys" aggregate counts cross-cluster appearances; an authoring wave that adds a missing key closes the gap across all clusters that reference it.');
lines.push('');
lines.push('5. **Future inventory regeneration.** This inventory is a snapshot at v3-merge state (2026-05-08; 21 packages authored). Re-run `scripts/substrate-gap-inventory.js` at any future arc closeout to regenerate the markdown against current authored-set + IMAGE_VOCABULARY state. Inventory regeneration produces a fresh substrate-gap snapshot; Stream B is one-shot at v3-merge, but the script remains as standing tooling for any future audit trigger.');

fs.writeFileSync(OUT_PATH, lines.join('\n') + '\n');
console.log(`Wrote ${OUT_PATH} (${lines.length} lines)`);
console.log(`Class A: ${byClass.A} | Class B: ${byClass.B} | Class C: ${byClass.C}`);
console.log(`Top missing keys: ${sortedMissing.slice(0, 10).map(([k, c]) => `${k}(${c})`).join(', ')}`);
