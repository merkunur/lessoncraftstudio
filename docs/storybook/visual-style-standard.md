# Visual Style Standard — "Warm flat-vector storybook" (`wsv-1`)

**Binding for every story in the 250-story Interactive Story Library.** Locked by story #1
(`shellys-seashells`). One coherent world across all 250 stories: deliberately designed,
consistent, warm — never generic, never templated, never AI-soupy. Every color chosen on purpose.

The machine anchor is `PALETTE_VERSION = 'wsv-1'` in `scripts/storybook/art/style-lib.js`
(the single SoT for the allowed hexes). Per-story `library-meta.json` declares its
`paletteVersion`; `scripts/storybook/gate-library.js` HARD-fails a mismatch and HARD-fails any
authored color outside the palette (via the story's `art-manifest.json`). A style revision =
a new `wsv-N` version here + in style-lib, never a silent drift.

## 1. Palette (the library's only colors)

Seeded from the platform's Direction-A identity so stories, activities, and site chrome read
as one brand. Art helpers accept **token names only** — a raw hex in a story art generator is
a defect.

| Token | Hex | Use |
|---|---|---|
| `cream` | `#FBF3E4` | paper, letterbox, highlights, teeth/eye-whites |
| `creamDeep` | `#F3E6CC` | cream shading step |
| `orange` | `#F2784B` | Pip, warm accents, badges |
| `orangeDeep` | `#D96830` | orange shading / limbs |
| `coral` | `#E86A5A` | secondary warm accent, blush, flowers |
| `sunshine` | `#F7C948` | sun, sparkles, gold payoffs, sand highlights |
| `sand` | `#F0D9A7` | beaches, paths, warm ground |
| `sandDeep` | `#D9BC82` | sand shading step |
| `teal` | `#146B5E` | deep accents, success rings, sea-depths |
| `tealMid` | `#2E9B87` | mid teal, foliage accents, shallow water |
| `mint` | `#BFE5D4` | pale green-blue, far-band water/foliage |
| `leaf` | `#8FBF6C` | grass, foliage |
| `leafDeep` | `#5E9448` | foliage shading, trees |
| `sky` | `#BEE3F0` | day sky (top of the sky gradient) |
| `skyPale` | `#EAF6FB` | sky horizon, far-band lightening |
| `bluebird` | `#5FA8D3` | blue accents, water mid-band |
| `berry` | `#B76BA3` | purple accent (sparing) |
| `night` | `#31456E` | dusk/night skies, cool shadows |
| `outline` | `#5A3A26` | the ONE outline color (all characters + props) |
| `inkSoft` | `#3D2F21` | eyes, small facial marks |
| `white` | `#FFFFFF` | eye shine, foam, clouds |
| `shadow` | `#31456E` @ 0.12–0.18 alpha | the single soft ground-shadow ellipse |

Rules: no colors outside this table. Shading = the paired `*Deep` step (flat, hard-edged),
never a gradient. The ONLY gradient allowed anywhere is the sky (two palette tokens,
vertical). Scene-wide tints for time-of-day are built from `night`/`sunshine` overlay bands
at fixed alphas, not new hexes.

## 2. Construction (flat-vector language)

- **Flat fills, hard edges.** One fill + at most one flat `*Deep` shade shape per form.
- **Confident medium outlines** on characters and foreground props: `outline` token,
  **8–12 units at the 512-canvas character scale** (scale proportionally on scenes),
  round caps/joins, held at consistent weight within a frame.
- **Rounded, soft geometry.** No sharp or spiky silhouettes; stars/shell-points get rounded
  tips. Corner radii generous.
- **Simple expressive faces:** large friendly eyes (`inkSoft` disc + `white` shine dot,
  or a happy-arc stroke), small mouth shapes (closed / smile / open), optional `coral` blush.
- **Segment-separable rigs:** characters built from separable parts (head, body, arms, legs,
  tail/shell) so pose/idle/clip frames are parametric re-poses of one rig, never redraws.

## 3. Proportions

- **Oversized head:** head height ≥ 40% of total character height; big eyes set low-center.
- **Small friendly body**, short limbs, no necks (head sits on body).
- Warm and affectionate without being baby-ish — the register holds preschool → grade 3.
- Character source canvas: **512×640, feet at (256,620)** (the atlas contract).

## 4. Scenes (1600×1000)

- **Three depth bands:** far (lightened + desaturated toward `skyPale`), mid (main setting
  forms), foreground (a ground band + up to two framing elements). Never photographic,
  never busy.
- **Clutter cap:** ≤7 focal background elements per scene; large simple shapes.
- **Lighting:** warm, sunny default — key from upper-left, `sunshine` sun or warm sky.
  Characters/props get ONE soft shadow ellipse (`shadow` token) each, nothing else.
- **Interaction legibility is a feature:** the interaction zone sits over a calm, low-detail
  region of the scene (the art generator reserves it); interactive items must contrast with
  what's behind them. Visual calm > decoration.
- Delivery: exactly 1600×1000, webp q80, target ≤200KB (hard cap 300KB per pack-atlas).

## 5. Motion

- **Idle:** gentle bob, ≤2% squash-stretch, 6 frames @ ~7fps.
- **Celebrate clips:** bouncy, characterful easing (anticipate-squash → arc ≤90du lift →
  settle), ~24 frames @ 12fps, ends on the `happy` pose.
- **Every clip declares a `fallbackPose`** — the reduced-motion / weak-tablet still must be
  charming on its own (validator-enforced).
- Motion is decorative only; nothing pedagogical is carried by animation.

## 6. Success reactions

Never "correct → checkmark → advance". Every page's success is an in-world, characterful
reaction (the scene responds, a character delights, a running gag pays off) + a warm bravo
line; each story has ONE signature moment (declared in `library-meta.json`). Reduced-motion
fallback = the reacted end-state as a still. Reward the child, never rank.

## 7. Quality bar + reviewer checklist

Polish bar: a top published children's app (Sago Mini, Khan Academy Kids). Before shipping,
look at the rendered QA screenshots (desktop first) and check:

- [ ] Reads as ONE world with every other library story (palette, outlines, proportions).
- [ ] Every color on purpose; zero off-palette pixels beyond webp-lossy noise.
- [ ] Faces friendly and alive; silhouettes rounded; nothing spiky, generic, or clip-art.
- [ ] Scene calm; interaction elements clearly legible against their backing region.
- [ ] Warm light; shadows are single soft ellipses.
- [ ] Motion gentle + bouncy; reduced-motion stills hold up alone.
- [ ] The signature success moment lands; no bare-checkmark success anywhere.

## 8. How conformance is machine-checked

1. Art generators may only import `scripts/storybook/art/style-lib.js` primitives, which
   accept palette **tokens** — off-palette hexes cannot be expressed.
2. The generator emits `art-manifest.json` (`{paletteVersion, colorsUsed, files}`) into the
   story dir; `gate-library.js` asserts `colorsUsed ⊆ PALETTE` + version match (HARD).
3. `gate-library.js` pixel-samples the packed scene webps against the palette
   (WARN over a 5% off-palette budget — tolerance for webp loss + the sky gradient).
4. Everything the machine can't judge is the §7 checklist — a human (or the producing model)
   reads the screenshots, desktop first.
