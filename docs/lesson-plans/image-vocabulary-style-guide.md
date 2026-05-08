# IMAGE_VOCABULARY style guide — Wave 1 authoring reference

**Status:** Style-guide reference produced for Arc 5 Stream C (operator-pace image authoring) Wave 1 work. Produced via Read-tool multimodal sampling of 7 representative existing IMAGE_VOCABULARY entries across distinct clusters.
**Generated:** 2026-05-08
**Audience:** Operator authoring Wave 1's 43 unique images (per Stream B inventory commit `b9dd07de`).
**Companion document:** `docs/lesson-plans/substrate-gap-inventory.md` (the gap inventory that defines Wave 1 scope).

---

## Purpose

The existing IMAGE_VOCABULARY library (~1244 keys across 100+ themes) was authored across multiple eras and authors. Newly-authored Wave 1 images need to fit the established library aesthetic so they don't visually clash when composed into worksheets, decks, materials, and bundles. This document samples 7 representative existing images, extracts the common-denominator conventions, and gives acceptable variation ranges + per-Wave-1-cluster authoring guidance.

This document is reference-only; no validator enforces style. Operator's eye + this guide together calibrate Wave 1 authoring quality.

---

## Anchor samples (7 representative existing images)

### Sample 1 — `cat.png` (animals theme, color)

![cat](../../image%20library/animals/cat.png)

**Path:** `image library/animals/cat.png`
**Style:** Anthropomorphic cartoon character — cat in blue dress, full-body, standing pose.
**Background:** Transparent (PNG with alpha).
**Composition:** Centered; subject occupies ~70% of canvas height; symmetrical-vertical balance.
**Color palette:** Limited (gray-white cat fur + saturated blue dress + soft pink ears/nose accents).
**Outlines:** Soft thin outlines on dress edges + fur boundaries; not bold cartoon-stroke.
**Detail level:** Medium — recognizable cat features (ears, whiskers, tail), simplified body geometry, K-3-friendly large head.

**Notes:** This style — anthropomorphic K-3 character with clothing — is the convention for many animal-cluster images. Newly-authored animal images would fit if drawn in the same illustrated-character vein. NOT the convention for fruits, vehicles, or shapes (see below).

---

### Sample 2 — `apple.png` (fruits theme, color)

![apple](../../image%20library/fruits/apple.png)

**Path:** `image library/fruits/apple.png`
**Style:** Flat-design fruit with painterly shading — red apple with green leaf and brown stem.
**Background:** Transparent.
**Composition:** Centered; subject ~85% of canvas height.
**Color palette:** Saturated red + dark green + warm brown + bright pink highlight.
**Outlines:** None — color blocks define edges; shading produces depth without stroke.
**Detail level:** Medium — bottom shadow, top-left specular highlight, subtle gradient on leaf veining.

**Notes:** This is the canonical "isolated object" style — clean centered subject, no background, painterly shading, no outline. The apple's leaf is rendered with internal vein lines (medium detail). Other fruits in the cluster follow this pattern.

---

### Sample 3 — `car.png` (vehicles theme, color)

![car](../../image%20library/vehicles/car.png)

**Path:** `image library/vehicles/car.png`
**Style:** Flat-design vehicle in 3/4 perspective view — green compact car with cream-yellow headlights, gray windows.
**Background:** Transparent.
**Composition:** Centered; subject occupies most of canvas.
**Color palette:** Saturated green primary + cream highlights + gray secondary + soft tire-shadows.
**Outlines:** Soft inner-line detail (window frames, grille); no bold outer stroke.
**Detail level:** Medium-high — windshield reflections, headlight depth, grille texture, recognizable car body shape.

**Notes:** Vehicles use 3/4 angle (not pure side or front profile) for visual interest. Cars and similar vehicles share this convention.

---

### Sample 4 — `doctor.png` (occupations theme, color)

![doctor](../../image%20library/occupations/doctor.png)

**Path:** `image library/occupations/doctor.png`
**Style:** Semi-realistic illustrated character portrait — adult male doctor wearing white coat, stethoscope, warm friendly expression, holding stethoscope head up.
**Background:** Transparent.
**Composition:** Half-body portrait (head + upper torso); centered; subject occupies ~80% of canvas.
**Color palette:** Saturated blue shirt + red tie + white coat + warm skin tones + dark hair.
**Outlines:** None — soft painterly shading defines forms.
**Detail level:** Higher than animals/fruits/vehicles — facial expression detail (eyes, smile, blush), hair texture, fabric folds, stethoscope depth.

**Notes:** Community-helpers (occupations cluster) use half-body or 3/4-body portraits showing the role's defining attribute (stethoscope for doctor; mailbag for mailman; etc.). Warm friendly K-3 expressions; non-stereotyped representations preferred.

---

### Sample 5 — `happy.png` (emotions theme, color)

![happy](../../image%20library/emotions/happy.png)

**Path:** `image library/emotions/happy.png`
**Style:** Emoji-style abstract emotion icon — yellow circle face with big smile, eyebrows raised, pink cheek blush, open mouth showing teeth + tongue.
**Background:** Transparent.
**Composition:** Centered circle; subject fills ~85% of canvas.
**Color palette:** Saturated yellow primary + soft pink blush + black features + red tongue.
**Outlines:** None — features painted directly; subtle shading at edges.
**Detail level:** Low-medium — simplified emoji-grade detail; expression is the load-bearing feature.

**Notes:** Emotions cluster uses emoji-style abstraction — simplified circle face, expression as primary signal, K-3-readable across cultures. Distinct style from realistic-character images (doctor, cat).

---

### Sample 6 — `sun.png` (weather theme, color)

![sun](../../image%20library/weather/sun.png)

**Path:** `image library/weather/sun.png`
**Style:** Anthropomorphic weather icon — yellow sun with friendly face (eyes + smile + cheek blush) and orange-yellow rays radiating outward.
**Background:** Transparent.
**Composition:** Centered radial; rays extend toward canvas edges; central face occupies ~50% of canvas.
**Color palette:** Yellow primary + orange ray accents + soft pink blush + black features.
**Outlines:** None.
**Detail level:** Low-medium — simplified anthropomorphic features; rays are stylized triangles/teardrops.

**Notes:** Weather cluster uses anthropomorphic faces on natural elements (sun, possibly clouds, rainbow) — adds K-3 personality. NOT the convention for `wind`, `storm`, `fog`, `snow` (Wave 1 targets) — these are atmospheric phenomena that may not have anthropomorphic faces; sample existing `rain.png` if available before authoring to confirm.

---

### Sample 7 — `eye.png` (body parts theme, color)

![eye](../../image%20library/body%20parts/eye.png)

**Path:** `image library/body parts/eye.png`
**Style:** Illustrated body part isolated — single eye with brown iris, pink eyelid surroundings, eyelashes top + bottom.
**Background:** Transparent.
**Composition:** Centered horizontal; subject ~80% of canvas width.
**Color palette:** Pink-peach skin tones + brown iris + black eyelashes + white sclera.
**Outlines:** None — color blocks + shading.
**Detail level:** Medium — eyelashes individually drawn; iris has gradient depth; subtle eyelid creases.

**Notes:** Body-parts cluster isolates single anatomical features against transparent background. Skin tones tend toward warm pink-peach; details simplified for K-3.

---

### Sample 8 — `circle.png` (shapes theme)

![circle](../../image%20library/shapes/circle.png)

**Path:** `image library/shapes/circle.png`
**Style:** Pure geometric shape — solid pale-blue circle with thin black outline.
**Background:** **WHITE** (NOT transparent — note the divergence).
**Composition:** Centered; circle occupies ~80% of canvas.
**Color palette:** Single pale-blue fill + thin black stroke.
**Outlines:** Thin (~2-3px) black outer stroke (defines shape boundary).
**Detail level:** Minimal — pure geometric primitive.

**Notes:** Shapes cluster diverges from the rest of the library — WHITE backgrounds (not transparent), pale pastel fills, thin black outlines. This is intentional: shapes are geometric primitives that appear in worksheets where they need crisp boundaries against page backgrounds. Wave 1 doesn't include shapes, but documenting the divergence so future shape-authoring follows the convention.

---

## Common conventions (the load-bearing aesthetic anchors)

### Background

- **Object/character images: transparent PNG (alpha channel).** Confirmed: cat, apple, car, doctor, happy, sun, eye. This is the dominant convention.
- **Geometric shapes: white background (no alpha).** Documented divergence — shapes need crisp boundaries against worksheet page rendering.
- **Wave 1 default: transparent PNG** for all 43 images. None of the Wave 1 keys are shapes.

### Composition

- **Centered subject.** Subject sits at the canvas center; symmetrical-vertical balance for full-body characters; horizontal centering for objects.
- **Subject occupies 70–85% of canvas.** Padding around the subject prevents tight cropping when the image composites into worksheet/material backgrounds.
- **Aspect ratio: roughly square or 4:3.** Existing library mixes squarish (1:1) and slightly rectangular aspects; both work. Don't author landscape-wide or portrait-tall — composition into worksheets assumes near-square framing.

### Color palette

- **Saturated K-3-friendly colors.** Vivid mid-tones — saturated reds/yellows/blues/greens; avoid muted/desaturated/grayscale palettes (those have a separate `*_bw` cluster for B&W variants).
- **Limited palette per image.** 2–4 dominant colors + accent details. Avoid rainbow-multicolor unless the subject inherently is (e.g., a rainbow itself).
- **Warm pinks for skin, blush, accents.** Doctor's blushed cheeks; happy's blush; eye's eyelid surroundings — recurring warm-pink as a K-3 friendliness cue.

### Style register

- **Illustrated cartoon, NOT photographic.** All sampled images are illustration/painterly; none are photographs. Authored images should match.
- **Outlines mostly absent OR soft inner-detail strokes.** Don't author with bold cartoon outer-strokes (the doctor doesn't have a black outline; apple doesn't either). Shapes are the exception — they have a thin black outline.
- **Soft painterly shading or flat-design.** Both are acceptable. Apple has painterly shading + highlight; car is flatter; cat is between. Range is wide; commit to one approach per image.
- **K-3 friendly expressions.** Characters smile, eyes are warm, no aggressive expressions. Doctor is welcoming; happy is joyful; cat is calm-friendly; sun has a smile.

### Detail level

- **Medium detail — recognizable but not photorealistic.** Subject features clearly identifiable; not so detailed that the image reads as "for older audience"; not so abstract that it reads as "icon" rather than "image."
- **K-3 simplification:** larger heads on characters, simplified body geometry, exaggerated friendly features (big eyes on emotions, prominent stethoscope on doctor).

### File format

- **PNG with alpha channel** (transparent background) for non-shape clusters. WebP is the eventual library standard per CLAUDE.md §5, but existing library is mostly PNG; PNG authoring is fine; conversion to WebP happens at integration time if at all.
- **Resolution: ~1000-1500px on the longest side** based on existing library samples (apple ~500×500 visible; car ~600×600; doctor ~600×600). Higher resolution acceptable; resampling-down at composition time is non-degrading.

---

## Per-Wave-1-cluster authoring guidance

### Family-members (8 images: mother, father, sister, brother, grandmother, grandfather, son, daughter)

Anchor reference: doctor.png style (semi-realistic illustrated character, half-body portrait, transparent bg, warm friendly expression, K-3 simplification).

- **Half-body or 3/4-body portraits.** Like doctor; show enough body to convey age + role.
- **Inclusive representation.** Per Arc 5 ratification 2 (full agent depth on family-members package): authoring should support diverse-family-structure inclusion. Either:
  - Author "neutral/representative" appearance per locale norm (avoid stereotyping)
  - Author multiple variants per key for explicit diversity (extra effort but most inclusive — operator-strategic call)
- **Distinguishability between adult-vs-child variants.** mother vs sister vs daughter all-female; differentiate by age cues:
  - mother: adult, ~25-40, casual everyday clothing
  - sister: school-age, ~6-10, child-style clothing
  - daughter: younger child, ~3-7, slightly smaller scale
  - grandmother: older adult, ~60+, age cues (gray hair / glasses / softer features)
- **Same logic for father / brother / son / grandfather** for male variants.
- **Warm K-3 expressions.** No stern/severe; calm-friendly is the family register.
- **Existing in library:** `baby` already exists; sample it before authoring to match the family-cluster style and ensure the new images sit alongside it consistently.

### Action-verbs (6 images: walking, sitting, standing, eating, drinking, sleeping — `-ing` form)

Anchor reference: existing `running.png` / `jumping.png` / `reading.png` / `writing.png` (existing in library; sample these before authoring to match style).

- **Child-figure performing the action.** Library convention is to use a child or generic person figure (likely a stylized character similar in style to cat or doctor).
- **Action mid-gesture, recognizable at a glance.** walking = mid-stride; sitting = seated cross-legged or on chair; standing = upright neutral; eating = food at mouth; drinking = cup at lips; sleeping = eyes closed, head on pillow, peaceful.
- **Disambiguation.** walking vs running: less dynamic stance, no motion lines, casual stride. standing vs walking: no foot lift, balanced static. sitting on a chair vs sitting cross-legged: either works; pick one per K-3 cultural appropriateness.
- **Verbs are language-bound but image-grounded.** Image conveys the action regardless of locale; verb name in IMAGE_VOCABULARY's translation table renders the gerund per locale (running → corriendo / läuft / etc.).

### Community-places (8 images: school, hospital, park, library, bank, store, restaurant, fire-station)

No clear anchor sample in current set; sample existing `post-office.png` if available before authoring.

- **Building exteriors, recognizable at K-3 level.** Each place needs a defining visual cue:
  - school: school building + flag or "School" sign
  - hospital: hospital building + medical cross
  - park: outdoor scene with trees + grass + playground equipment (less building-y)
  - library: library building + "Library" sign or visible books
  - bank: bank building + dollar/currency sign or "Bank" sign
  - store: storefront with shopping items visible
  - restaurant: restaurant exterior with food/menu signage
  - fire-station: fire-station building + fire truck visible
- **K-3-readable signage.** Either visible word in English (universal-recognition surface) OR universal pictograph (medical cross, dollar sign, fork+knife). Avoid locale-specific signage.
- **Daytime, friendly atmosphere.** Sunlight, blue sky, no scary or dilapidated buildings.
- **Avoid stereotyping.** Bank shouldn't read as "rich" or "poor"; restaurant shouldn't be locale-specific cuisine; store should be generic (avoid brand-recognizable layouts).

### Materials (6 images: wood, plastic, metal, fabric, rubber, stone)

Material-sample images, not objects-made-of-material.

- **Texture-forward representation.** wood = wooden plank/log showing grain; metal = metal sheet/gear showing reflectivity; plastic = plastic surface/object showing characteristic finish; glass = transparent glass cup or pane; paper = paper sheet/stack; fabric = folded cloth swatch; rubber = rubber surface or band; stone = stone block or pebble.
- **Recognition-by-texture, not object-identity.** A wooden chair would read "chair" (vehicle-cluster-adjacent), not "wood." A plank reads "wood" because the grain is the load-bearing feature.
- **Limited palette per material.** wood = brown tones; metal = gray-silver; plastic = vibrant single color (often blue/yellow); fabric = soft varied; rubber = black; stone = gray-tan.

### Plant-parts (4 images: root, stem, fruit, seed)

Botanical-feature isolation.

- **Single plant-part per image, isolated.** root = root system extracted from soil; stem = vertical green stem (possibly with leaf attached for context); fruit = single generic fruit (use anatomical "fruit-of-plant" representation, not a specific apple/banana); seed = single seed (bean, sunflower, or generic-seed shape).
- **Note: `fruit` is the BOTANICAL plant-part, NOT the specific-fruit cluster.** Fruits cluster (apple, banana, etc.) renders specific fruits; plant-parts `fruit` should render the abstract concept of "fruit as part of a plant" — possibly a generic round fruit hanging on a stem with leaves, or a cross-section showing seeds inside.
- **Same applies to `seed`.** seed in plant-parts (botanical concept) vs seed in plant-life-cycle (life-cycle stage 1) — the SAME image serves both per CC's note.

### Weather-words (4 images: snow, wind, storm, fog) — NOUN form

Anchor reference: sun.png (anthropomorphic weather face) — but check if `rain.png` and `cloud.png` use anthropomorphic faces too before deciding.

- **Atmospheric/elemental scenes.** snow = snow falling on landscape with white ground accumulation; wind = trees bending + leaves blowing + motion lines; storm = dark cloud with lightning bolt + rain; fog = soft gray overlay obscuring background scene.
- **Anthropomorphism is OPTIONAL.** sun has a face (sample 6); rain may or may not. Wave 1 weather images can either have personality (cute snow cloud face) OR be straight scene (snow on pine trees) — match the existing weather-cluster convention by sampling rain/cloud/rainbow first.
- **Distinct from each other.** snow vs storm: snow is calm white; storm is dark + dramatic. wind vs storm: wind shows movement (motion lines, bending trees) without dark sky; storm has dark sky.

### Plant-life-cycle (1 unique: sprout — seed + fruit shared with plant-parts)

- **sprout:** young plant emerging from soil — small green stem + first 2 leaves, soil visible at base. Distinct from "stem" (mature plant stem) and "plant" (full plant).

### Four-seasons (3 images: spring, summer, winter — autumn already exists)

Sample existing `autumn.png` first to match style.

- **Landscape vignettes representing each season.**
  - spring: light-green leaves, flowers blooming, sunny but cool tones, possibly lambs/baby animals
  - summer: full green trees, bright sun, warm tones, possibly beach/sun-overhead
  - winter: snow on ground, bare trees, cool blue-white tones, possibly snowman or warm-clothing element
- **Distinct from weather-words.** snow (weather) is precipitation event; winter (season) is the broader cold-period landscape vignette.
- **Avoid culture-specific.** Don't author Christmas-coded winter (cultural specificity); generic snowy landscape is broadly K-3 portable.

### Community-helpers (2 images: mailman, dentist)

Anchor reference: doctor.png style (sample 4) — half-body portrait, white-coat-equivalent uniform, defining tool.

- **mailman:** adult male/non-gendered mail carrier, blue uniform (or locale-equivalent postal-service uniform), holding a letter or mailbag. Inclusion note: the key name is gender-coded; future commission may rename to `mail-carrier` per Arc 5 inclusion-flag (separate from Wave 1 image authoring).
- **dentist:** adult, white coat or scrubs, holding a dental tool (mirror or oversized toothbrush). Friendly K-3 expression critical (dental visits are anxiety-prone for young children).

### Butterfly-life-cycle (1 image: chrysalis)

Anchor reference: existing egg/caterpillar/butterfly in same cluster (sample first to match style).

- **chrysalis:** pupa-stage casing on leaf or twig, greenish-brown color (monarch-style) or similar K-3-recognizable form. Distinct from egg (smaller, rounder) and caterpillar (segmented body); leads to butterfly visually (positioned on twig/branch as it would be in life-cycle progression).

---

## Acceptable variation range

Existing library aesthetic is wide; these variations are documented as acceptable:

- **Painterly vs flat-design shading.** apple is painterly with highlight; car is flatter. Both work. Pick one approach per image; avoid mixing painterly + flat within a single image.
- **Anthropomorphic vs neutral.** cat (full character with clothing) vs apple (object only). Per cluster convention — animals tend anthropomorphic; objects tend neutral.
- **Detail level: low to medium-high.** happy (low-detail emoji) vs doctor (medium-high detail portrait). Match the cluster's existing convention.
- **Color saturation: medium to high.** All samples use saturated colors; avoid pastels or muted tones (those are for `*_bw` clusters or specific stylistic deviations).

---

## Quality bar / rejection criteria

Authored images that miss this bar should be re-authored before integration:

1. **Wrong background.** Non-shape image with white/colored background instead of transparent.
2. **Wrong aspect.** Landscape-wide or portrait-tall instead of squarish/4:3.
3. **Subject too small.** Subject occupies <50% of canvas (excessive padding).
4. **Subject too large.** Subject crops at canvas edges (insufficient padding).
5. **Style clash.** Photographic instead of illustrated; bold cartoon outlines on object images; muted/grayscale palette on color cluster.
6. **K-3 register break.** Stern/severe/aggressive expression; overly detailed/realistic face; subject reads as "for older audience."
7. **Stereotyping or non-inclusion.** Race/gender/cultural stereotyping on character images; avoid.
8. **Resolution too low.** <500px on longest side renders blurry at worksheet composition scale.

---

## Existing-key reference samples for cluster matching

Before authoring each Wave 1 cluster, operator should sample 2-3 existing-cluster keys to confirm style. Suggested existing-key references:

| Wave 1 cluster | Existing-key reference samples |
|---|---|
| Family-members | `baby.png` (only existing family key) + sample `mother`-adjacent style from `occupations/teacher.png` or `nurse.png` for adult-female look |
| Action-verbs | `running.png`, `jumping.png`, `reading.png`, `writing.png` — all 4 existing gerund-form action keys |
| Community-places | `post-office.png`, `museum.png` (existing in cluster) + theme-folder samples for outdoor scenes |
| Materials | `glass.png`, `paper.png` (existing in cluster) |
| Plant-parts | `leaf.png`, `flower.png` (existing in cluster) |
| Weather-words | `sun.png`, `rain.png`, `cloud.png`, `rainbow.png`, `lightning.png`, `ice.png` (6 existing) |
| Plant-life-cycle | `plant.png`, `flower.png` (existing in cluster) |
| Four-seasons | `autumn.png` (only existing season) |
| Community-helpers | `doctor.png`, `teacher.png`, `firefighter.png`, `police-officer.png`, `nurse.png` (5 existing samples) |
| Butterfly-life-cycle | `egg.png`, `caterpillar.png`, `butterfly.png` (3 existing) |

---

## Authoring workflow

Per operator's Wave 1 protocol:

1. **Pre-authoring (this turn):** style-guide reference reviewed; existing-cluster samples inspected.
2. **Per-batch authoring:** operator authors 6-8 images per batch (one Wave sub-cluster at a time).
3. **Per-batch shipping:** each batch shipped to CC for IMAGE_VOCABULARY integration via small `[INFRA][LESSON-PLANS]` commission.
4. **Recommended sub-wave order** (per operator's ratification): Wave 1.1 family-members + Wave 1.2 action-verbs first (unblock Arc 5 Phase 2 packages); Wave 1.3-1.10 follow at operator pace.
5. **Style-guide is reference, not enforcer.** Match the spirit (not the letter) of the conventions; cluster-by-cluster style matching to existing samples is the load-bearing discipline.

---

## Carry-forward for Wave 2-N

Wave 2-N (the remaining ~950 images of the operator's 1,000-image authoring goal) covers:
- Class A scattered 1/N gaps not in Wave 1
- Class B RELEVANT-flexible packages (theme-coverage breadth — sub-wave organization driven by bundle-curation priorities)

This style-guide reference applies to Wave 2-N as well. Future authoring waves may surface additional convention notes (e.g., specific theme-cluster style anchors not covered in Wave 1); update this document inline as conventions accumulate.
