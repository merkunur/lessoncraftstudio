---
name: project-activities-architecture
description: "Activities architecture — lcs-shell+tool split, Direction A card design, mini-tools nginx-served (NOT Next.js), ActivityIframe postMessage auto-resize, native-language slugs, CC code NEVER in URL."
metadata: 
  node_type: memory
  type: project
  originSessionId: aa585226-31b9-437f-b029-655565fce24e
---

**Shell + tool split.** `mini tools/lcs-shell.{css,js}` own the chrome. Tools own only their stage.

**Shell-owned chrome:**
- Settings drawer (Settings / Sound / Fullscreen / Reset buttons)
- Activity chrome (when tool declares `tasks` array OR `nextTask`): prompt banner with TTS speaker → answer surface → Check button → feedback overlay → progress pill (TASKS DONE: N) → Next button
- TTS via browser SpeechSynthesis (no audio assets; works in 11 locales)
- TOKENS registry = the asset-swap point (code-drawn now, swap to art later without touching tool code)
- `LCS.drag.linear` shared drag primitive (used by number-line, ruler, picture-path)
- postMessage iframe auto-resize broadcast (`lcs-activity-resize` event)

**Tool-owned:**
- The interactive stage (board, slots, palette, etc.)
- `tasks` array OR `nextTask()` function
- `strings` dict (per-tool i18n)
- `defaults` + `settings` schema (drives the settings drawer)
- `init(api)`, `setupTask(opts)`, `render()`, `paint()`, `reset()`, `injectCSS()`

**CANONICAL ORDERING PATTERN — `nextTask` per-pass reshuffle (variety+shuffle Rule 5, CLAUDE.md §A.13.60 / [[feedback-activity-variety-shuffle-rule]]).** A `tasks` array gets the shell's per-MOUNT shuffle (`ensureTaskOrder`/`getTask`) but **loops the SAME order each cycle within a session** — so it does NOT satisfy the post-pass reshuffle rule. The canonical pattern is: the wrapper drops `tasks`, holds a `_pool` (≥7 task objects), and defines **`nextTask(opts)`** — the shell hands ordering fully to a `nextTask`-only tool (`getTask`→`nextTask({index,completed})`; chrome/reload/resize all gate on `tasks||nextTask`). `nextTask` builds a shuffled `order`, rebuilds it on pool length/ref change (async manifest swap), and reshuffles (≠ previous, order-only) on a FORWARD pass boundary `floor(index/N) > _curPass` (transition-driven → repeated `getTask(0)` idempotent). **Zero `lcs-shell.js` change** (it's protected) — the reshuffle lives in the wrapper. Reference: `mini tools/fractions-activity.js` (`shuffledOrder` + `nextTask`). **All NEW activity wrappers follow this pattern; the existing 7 still on `tasks`+shell-loop are a backlog to convert when next touched** (recommend a shared helper at the 2nd conversion). Gate: `scripts/audit-activity-variety.js`.

**Direction A card design (LOCKED).** Cream gradient (`--lcs-bg #FBF3E4`), teal structure (`--lcs-structure #146B5E`), coral accent (`--lcs-accent #F2784B`), green good (`--lcs-good #2FA56A`). Baloo 2 (display) + Nunito (body). Dual-shadow card with 32px radius, max-width 720px, padding-bottom. Chunky teal Check button with 4px hard-edge bottom-shadow. Big tactile tiles. Large prompt with speaker icon. IXL-level CLARITY in the brand palette — NOT IXL's gamified UI.

**ActivityIframe (`frontend/components/activities/ActivityIframe.tsx`).** Transparent wrapper (NOT a nested card). Listens for `lcs-activity-resize` postMessage events from the iframe and dynamically updates iframe height. Three-layer iframe scrollbar kill: `scrolling="no"` attribute + `html, body { overflow: hidden }` inside + `Math.ceil(rect.height) + 2` buffer on broadcast.

**Activity route.** `frontend/app/[locale]/activities/[slug]/page.tsx`. Server-rendered (SSR) with ISR revalidate=3600. Emits JSON-LD `LearningResource` with `educationalAlignment` carrying the CC code. Renders BreadcrumbTrail + page title + intro + "Grade · Strand · Code" teacher-facing chip (e.g., "Grade K · Counting & Cardinality · K.CC.B.4"). **The CC code is teacher-facing metadata only — NEVER visible to kids, NEVER in URL.**

**Native-language slugs.** Hand-written per locale per activity manifest. Example: en `which-group-has-more` / de `welche-gruppe-hat-mehr` / es `que-grupo-tiene-mas` / fi `kummalla-ryhmalla-on-enemman`. Slug components are localized; `activities` path-segment is English constant.

**Activity manifest.** `frontend/lib/activities.ts` reads from `MANIFEST_FILES` array — one JSON per engine (currently `ten-frame-activities.json`, `choice-board-activities.json`, `cvc-builder-activities.json`). Each manifest row has `id` + `tool` + `task_template` + `alignment` (CC code) + `params` + `slug × locale` + `page_title × locale` + `page_intro × locale`. `resolveActivitySlug(slug, locale)` returns the row OR null (graceful 404 for missing locales).

**Mini-tools serving — nginx, NOT Next.js.** Files live at `/var/www/lcs-media/mini-tools/` on Hetzner. Served via nginx static-files; `frontend/public/mini-tools/` is a SYMLINK to the storage path. Mini-tool URLs (`/mini-tools/<engine>-activity.html`) are NOT Next.js routes. Critical:
- `middleware.ts` `/mini-tools/*` carve-out prevents 307 locale-redirects
- Standalone build runs SSG against `frontend/public/mini-tools/` at build time → cp source to served storage BEFORE `deploy.sh` runs OR the SSG sees a stale manifest. Single chain `git pull → cp → deploy.sh`.

**Platform header (`frontend/components/header/CategoryNav.tsx`).** Wraps decks + activities + manipulatives. **Does NOT wrap the 33 worksheet-generator apps** (operator exception — the apps are operator-tooling and shouldn't share the kid-facing chrome). Search is scoped to tools + activities only, locale-bound. Did NOT rewrite CategoryNav; improved the existing component.

**Engine inventory** (see [[project-activities-live-inventory]] for details):
- 3 manipulatives: ten-frame, number-line, ruler
- E1 ten-frame-activity (`ten-frame-activity.html` + `ten-frame-activity-core.js`) — 5 K-Math activities
- E2 choice-tap (`choice-board-*`) — 8 activities; highest-leverage engine
- E7 CVC builder (`cvc-builder-*`) — 1 EN-only activity

**Origin:** CC-MEMORY-UPDATE-PROMPT.md commission 2026-05-22. Architecture details accreted across E1, E2, E7 builds (operator-approved + live).
