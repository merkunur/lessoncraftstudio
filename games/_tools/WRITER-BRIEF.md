# Writer brief — how a spec-writer agent produces a batch of game specs

> **SUPERSEDED for building (2026-09-05).** All 200 specs exist. This brief describes how the SPECS were written; it is kept as the record of that phase. Building a game follows `games/BUILD-WORKFLOW.md` (Claude Code + the expert ensemble), not a local model.

You are writing build-ready game specifications for LessonCraft Studio. A literal local model will turn each spec into a single Phaser 3.90 `index.html`; it cannot ask questions and will guess at anything you leave open. The human reviewer does not write JavaScript. **A spec that leaves a design decision open has failed.**

## Read first, in this order (paths are absolute)
1. `C:\Users\rkgen\lessoncraftstudio\games\GAME-DESIGN-BRIEF.md` — sections 2, 3, 7, 8, 9 (constraints, bands, quality bar, template, anti-patterns).
2. `C:\Users\rkgen\lessoncraftstudio\games\catalogue\BUILD-CONVENTIONS.md` — the shared contract every spec cites (stage 720×560, ART/ANIM formats, tap floors, zones, the adaptive template §8, strings §9, finish §10, sound §11, locale §14).
3. `C:\Users\rkgen\lessoncraftstudio\games\catalogue\PATTERNS.md` — the twelve interaction patterns; your games each use one.
4. `C:\Users\rkgen\lessoncraftstudio\games\research\FINDINGS.md` — cite by `F-nn`; section 5 (F-101…F-136) is the misconception catalogue every spec draws its "Common misconceptions" from; section 2 has the curriculum links.
5. The two exemplar specs named in your task (in `C:\Users\rkgen\lessoncraftstudio\games\specs\`). Match their depth, voice and structure exactly.
6. Your rows in `C:\Users\rkgen\lessoncraftstudio\games\catalogue\CATALOGUE.md` (number, slug, title, subject, topic, band, pattern, objective, description, F-refs). The row is binding: same slug, same band, same pattern, same objective.

## What you produce
One file per game: `C:\Users\rkgen\lessoncraftstudio\games\specs\NNN-slug.md`, using the section-8 template headings **verbatim and in order**:
`# NNN — Title` · `## Identity` · `## Learning` · `## How it plays` · `## Art registry` · `## Animation registry` · `## Screen layout` · `## Visual specification` · `## Content` · `## Rules` · `## Strings` · `## Sound` · `## Testing checklist`.

**Write each spec to disk the moment it is finished** (one Write call per spec). Do not batch them in memory. Do NOT create or edit any other file (no PROGRESS.md, no SELF-CHECK.md, no catalogue edits). If a game cannot be built within the constraints, write the workable alternative that covers the same objective and put a line `SUBSTITUTION: <what changed and why>` at the top of "## Identity"; the designer logs it.

## Hard rules the linter enforces (a spec failing any of these is sent back)
- Identity: `- Slug: \`kebab-case\`` equal to the filename; `- Age band: \`5-6\`|\`6-8\`|\`8-9\``; `- Interaction pattern: \`P<n>\` — name`; `- Estimated build size: ~N lines` with N in 300-800.
- Exactly one `- Objective:` line, an observable behaviour ("counts a set of up to 10 objects and taps the matching numeral").
- At least one `F-nn` citation in Learning (curriculum links AND misconceptions); every cited ID must exist in FINDINGS.md.
- **Emoji characters may appear ONLY inside `## Art registry`.** Everywhere else refer to `ART.key`. (This is the brief's art-upgrade rule; the linter scans every other line.)
- `## Art registry` contains a fenced `const ART = { ... }` block; every `ART.x` you mention elsewhere is declared there; every declared key is used somewhere. Entry kinds per BUILD-CONVENTIONS §4 (`emoji` with `size` and `fallback` if the glyph is newer than Unicode 12; `shape`; `text`). Colours are THEME token NAMES.
- `## Animation registry` contains a fenced `const ANIM = { ... }` block; every motion in the spec is an entry (Phaser tween config minus targets).
- THEME references must exist in `_lib/theme.js` (`THEME.colour.bg|surface|surface2|ink|inkSoft|inkOnAccent|line|structure|structureSoft|accent|good|focus`, `THEME.font.display|body`, `THEME.size.radius|radiusSmall|minTap|cardMaxWidth`, `THEME.button.width|height|fontSize|gap`). No raw hex anywhere.
- `t("key")` keys must exist in `_lib/ui-strings.js` (list in BUILD-CONVENTIONS §9). Everything else is a game-specific string listed in `## Strings` as `key` = "English".
- `## Rules` carries lines for: Item count · Difficulty progression · Adaptation · What happens on a correct answer · What happens on a wrong answer (one bullet PER anticipated misconception, naming the enacted hint) · Retry behaviour · Finish condition.
- Forbidden anywhere except in a "never/no" sentence: lives, game over, you lose, red X, buzzer. "timer"/"countdown" only with the words "optional" and a justification.
- `## Sound` names the events and says it is silent under `?sound=off`.
- `## Testing checklist`: ≥ 8 `- [ ]` items including works in all 11 languages · works at narrow width · keyboard operable · never auto-starts · no losing state, plus game-specific checkable facts.
- Length ≥ 150 lines; target 220-320. Tables and bullets over prose.

## What "complete enough" means, section by section
- **How it plays**: a concrete narrative of ONE full session from tapping Start to the finish screen — what appears (by ART key and zone coordinates), what the child does, what happens, including one wrong answer and its enacted feedback, the level change, and the finish screen. This is the section the builder leans on most.
- **Screen layout**: a text diagram on the 720×560 stage with coordinates for every element; state what stays fixed (default: everything, FIT scaling).
- **Visual specification**: background token; every element's position, size and ART key; tile sizes at or above the band floor (80 for 5-6, 56 for 6-9).
- **Content**: EVERY item — every number, word, pair, set, distractor — in English, grouped by level L1/L2/L3, with the randomisation rule. No "etc.", no "and similar". For locale-varying content give the `LOCALE_DATA` table for all 11 codes (en de fr it es pt nl sv da no fi) or say explicitly that content is language-neutral (numerals, shapes, emoji).
- **Learning → Common misconceptions**: 3-5 specific errors from the F-1xx catalogue, each with the game's distinct response (what the child sees, not "show feedback").
- **Rules**: numbers, not adjectives. Use BUILD-CONVENTIONS §8 as the template and fill every threshold. Praise keys named and their rotation order stated.
- **Band discipline**: 5-6 specs have zero instruction sentences on the play screen (the prompt is an ART element plus ≤ 3 words), the first item is discoverable by tapping, and no drag-and-drop (P5) at all.
- **Cultural neutrality**: no national holidays, no imperial units, no people's names, no English-only word play in the base content; locale differences (currency, number words, half-hour idioms, digraph sets, sentence order) go in `LOCALE_DATA` or are declared out of scope for this game.

## Return
When all specs in your batch are on disk, reply with: the list of files written, one line per game with its emoji list (from its ART block), and any SUBSTITUTION lines. Nothing else.
