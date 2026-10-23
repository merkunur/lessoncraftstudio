# #78 — Mim's Memory Baskets → THE COUSIN RAIN (L.K.5.A, all 11 locales)

ORDER row 78 · id `mims-baskets.category-sort.l-k-5-a` (kept). Design: `designs/078-mims-baskets.md`.

## Files and wiring
- **New files:** `mini tools/cousin-rain-core.js`, `cousin-rain-activity.js`, `cousin-rain-activity.html`. CSS prefix `cr-`.
- **Pictures:** through `lcs-pictures.js`; all 90 opened on contact sheets before use.
- **Manifest:** the row stays in `mims-baskets-activities.json` (the design's own-manifest plan was not needed — no MANIFEST_FILES change).
  - `tool` is repointed; `params` became a mirror of the core's rounds;
  - en slug, title and intro are frozen (sha1 of [slug, title, intro, alignment] = `f3d5683e…`, unchanged by the script);
  - de/nl/da/sv/no/es/it/pt/fr/fi slug, title and intro are new (the row had an en page only).
- **Route:** `GRADE_OVERRIDE` de '1', no '1' (no school year before Klasse 1 / 1. trinn); the other eight keep K (Kleuters, Børnehaveklasse, Förskoleklass, Esiopetus, GS, Kínder, Pré-escola, Prescolare). `ACTIVITY_WRAPPER_VERSION` 9.819. Strand from `strand-names.ts` in all 11 (no override).
- **Legacy gates:** `verify-category-sort-core.js` and `local-test-mims-baskets.js` exit 0 with a pointer. The old files stay on disk, unused.
- **Sources:** scratchpad `cr-manifest.js` (manifest), `cr-prose.json` (page prose via `apply-activity-prose.js`), `cr-fix1.js` (reviewer fixes).

## The invention
- **Unlabelled baskets:** the child makes the groups; any order of kinds to baskets is right (one right grouping, never a right basket).
- **The cousin rain:** a basket of two or more things of ONE kind makes the little cloud over it rain a cousin — a new member of that kind (dog + cat → rabbit). Once per kind; a basket that becomes mixed loses it.
- **The split cloud:** at Check a mixed basket's cloud splits; each half rains a cousin onto its own family (teal / coral underlines). In the colour and shape rounds the cousins never share the confusing look (red apple → green kiwi, red tractor → purple airplane).
- **Levels:** Sort (14 rounds, 2–4 baskets, incl. colour / round / yellow confounds, fruit vs vegetable, habitats) · The stray (9, a little tilted basket for the one of another kind) · Two clouds (8, three baskets under two rule clouds shown as two pictures each, the middle = both; at Check each thing catches the drops of the traits it really has).
- **Settings:** Baskets two (7 two-kind rounds, opens on toys/clothes) / two to four · Helping rain while sorting / only at Check (the little clouds are hidden).
- **Misses:** grass not empty = hint, no miss; miss 1 = split cloud (Sort/stray) or drops (Two clouds); miss 2 = a dotted thread from each misplaced thing to its family's basket; any move clears the help.
- **Long press** shows (and speaks) the thing's word; drag or tap-tap; keyboard Enter / Escape.

## Rulings this build made
- ⭐ **The duckling never flies:** every duck picture is a duckling (RULINGS) — Two clouds #1 uses the goose; the gate proves no flying bird is the duckling picture.
- **The train is a toy-like engine:** "big in real life" uses ship + airplane as its rule pictures.
- **The two-basket pool needed 7 rounds:** two new two-kind Sort rounds (toys / clothes; vehicles / farm animals with the tractor as the look-alike).
- **The grass deal** keeps a kind apart in each row where that is possible (not in The stray: three of a kind in a row of four); lead balance only where kinds are the same size; the stray's spot is uniform.
- **Phones:** Two clouds drops the sky (the rule clouds are the sky); the rule panels drop their cloud picture; a grass row collapses when its things have all gone; solved = no Check, no empty grass, and a long success line scrolls into view, the next round waiting 55 ms per character.
- **Size floor kept during animation:** the spill and the cousin's fall are translate-only (the hierarchy gate measured them mid-scale).
- **Reviewer fixes** (all 11 locales read): Sort #4 lost the boat (fish + duck + turtle + boat vs dog + car was a second right sort); whales swim with the TAIL (flippers steer) ×11; es/fr possessive gave the dolphin the fox's fur; screen-reader rain line rebuilt with the basket name first ×10; "the new things never look alike" → "never have the confusing colour or shape" ×10; de possessive + hints; nl/de lettuce leaves; it macchina / aereo / «si indossa»; pt «Cervo» (Veado is a slur in BR), «Luva», «Maiô», «dela», «legume nem verdura»; es «guante»; fi «kuvia», «käpertyy», «Ei kuulu joukkoon». Picture words that the library labels wrongly for this activity are a per-activity `LABEL` override in the core.

## Gates
| Gate | Result |
|---|---|
| verify-cousin-rain-core (own kinds, traits, looks, names; 79,154 groupings exhaustive) | 104,272 / 0 |
| mutate-cousin-rain | 20 / 20 killed, control survives |
| local-test-cousin-rain (11 locales × 320–1366, real clicks + drag + keyboard + long press, every round at rest and solved) | 14,956 / 0 |
| visual-qa | 84 renders green |
| hierarchy | 836 / 0 |
| settings-efficacy | 3 live |
| preflight, prose-claims, serp-copy | green |

## Open
- The shared picture index labels `forest-creatures/deer` pt «Veado» (a slur in Brazil) and `clothing/mitten` pt «Mitene» (a fingerless glove); this activity overrides them, other activities still show them — a vocabulary fix for the operator (image-vocabulary.js).
- The library elephant is a chibi baby; it stands for "big in real life" in Two clouds #8 (true of elephants; the reviewer flagged it as worth a look).
