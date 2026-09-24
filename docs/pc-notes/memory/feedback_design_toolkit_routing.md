---
name: feedback_design_toolkit_routing
description: "The operator's four design toolkits — the exact skill id behind each informal name, the bundled shadow skills that hijack them, and the CLAUDE.md guardrails a skill may never override"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: bad60604-1244-43d7-b5f3-9e76284fb636
  modified: 2026-09-04T11:29:47.693Z
---

The operator installed **four** design toolkits on 2026-09-04 and will refer to them by
informal name. **Route on the name they said, never on the trigger words**, because ten
other installed skills answer to the same generic design language.

| Operator says (any of these spellings) | INVOKE EXACTLY | Source repo |
|---|---|---|
| "Design DNA" / "Design-dna" / "the DNA one" | `design-dna` | zanwei/design-dna |
| "Frontend Design" / "Frontend-design" | `frontend-design:frontend-design` | Anthropic official marketplace |
| "Taste Skill" / "Design-taste-frontend" / "taste" | `design-taste-frontend` | Leonxlnx/taste-skill |
| "Scrollcraft" / "Scroll-craft" / "the scroll one" | `nateherk-design:scroll-craft` | nateherkai/scroll-craft |

⚠ **Two of the four ids carry a `plugin:skill` colon.** If you are about to invoke a bare
`frontend-design` or a bare `scroll-craft`, you have the wrong token.

**Why:** the "Taste Skill" repo installed **13 skills, not 1**. Measured 2026-09-04:
**10 of the 16 live skills** match generic design language (7 of them not the operator's) ("landing page", "premium",
"templated", "generic"), so a bare request is a coin-flip. ⚠ **There is NO per-skill
enable/disable in Claude Code** — `settings.json` toggles whole *plugins*, `.claude.json`
holds only usage counters, and the installer's `.agents/.skill-lock.json` `dismissed:{}`
map is never read. Nothing was deleted (the operator needs all four, and the other twelve
came bundled inside the repo they named), so **this file is the entire routing mechanism.**

**How to apply — the four, and the shadow each one must beat:**

- **`design-dna`** — the ONLY images/URL **in** → JSON design-profile **out** skill.
  ⚠ Shadowed by `image-to-code` (also claims "deeply analyze them"). If the ask is
  *generate me a picture*, it is NOT this one — that is the `imagegen-*` family.
  Phases are combinable: 1 = show schema, 2 = analyse a reference, 3 = build from a DNA
  JSON. Optional `sharp` measurement scripts ARE installed (`npm test` → 9/9).
- **`frontend-design:frontend-design`** — Anthropic's. Judgement and principles only,
  **no stack mandate**, 71 lines. ⭐ **The safe default when touching existing project UI.**
  ⚠ Shadowed by `high-end-visual-design` and `stitch-design-taste`.
- **`design-taste-frontend`** — 1206 lines, **writes code**, opinionated about stack.
  ⚠ Shadowed by `redesign-existing-projects` ("Audits current design, identifies generic
  AI patterns" — nearly the same sentence) and by `design-taste-frontend-v1`, a near
  name-match. Never route to either.
- **`nateherk-design:scroll-craft`** — the ONLY one producing a standalone scroll-driven
  page. ⚠ Shadowed by `gpt-taste`, which also claims "GSAP ScrollTriggers (pinning…".
  ⭐ Safe by construction: writes standalone HTML to `lessoncraftstudio/scrollcraft/builds/`
  (gitignored) and never touches the Next app.

**Unnamed request** ("make this less generic") — do NOT weigh ten skills and do NOT ask a
technical question. Route on the SURFACE, first hit wins:

1. A name (or obvious variant — "the DNA one", "scroll thing", "taste") is present → that
   skill, exactly as spelt above. Never a shadow.
2. Operator supplied reference imagery or a URL and wants its look → `design-dna`.
3. Scroll-driven / cinematic / "Apple-style" / "feels like an experience", and the page can
   stand alone → `nateherk-design:scroll-craft`.
4. An EXISTING surface inside `frontend/` → `frontend-design:frontend-design` (the only one
   of the four with no stack mandate, so it cannot breach §5).
5. A NEW standalone page outside the Next app → `design-taste-frontend`, §3.A overridden.
6. ⭐⭐ Target is `mini tools/*.js` (an activity, manipulative, or premium tool) → **NONE OF
   THE FOUR.** That layer is vanilla JS on the `lcs-shell` split, 0 lines to protected
   cores, DoD is CLAUDE.md §A.13.62. Every React-defaulting skill is simply wrong there —
   use [[feedback_next_tool_build_recipe]].
7. Still ambiguous → `frontend-design:frontend-design`, and say it in ONE plain sentence
   ("Using Frontend Design — say 'Taste Skill' or 'Scrollcraft' if you wanted one of
   those"). A statement with a one-word correction path, NOT a question.

**🛑 CLAUDE.md OUTRANKS EVERY SKILL** on stack, palette and protected cores:

- ⭐⭐ **A skill NEVER adds a dependency.** `design-taste-frontend` §3.A *mandates*
  Tailwind v4 (`@tailwindcss/postcss`) + the Motion library (`motion/react`) and suggests
  Zustand/Jotai. Measured: the frontend runs `next 14.2.18`, `react ^18.3.1`,
  `tailwindcss ^3.4.17`, with **none** of motion / framer-motion / zustand / jotai
  installed. CLAUDE.md §5 locks the stack and §10.3 forbids new deps. **Build on the real
  stack and say in the reply which skill instruction was overridden.**
- ⚠ `mini tools/*.js` is **vanilla JS, not React** — ignore React/RSC instructions there
  entirely. Direction A palette + the 0-protected-core-lines rule still bind.
- The homepage standing law "NO NUMBERS for content" and scroll-craft's own hard rule
  ("Invented statistics in a counter → no number, no counter") AGREE. No conflict.

**Brand bridge — Scrollcraft ships DARK by default** (verified `engine/scrollcraft.css:20`:
canvas `#08090b`, surface `#101217`, ink `#f4f2ef`, ink-soft `#9a9ba1`, accent `#d8ff3e`,
accent-ink `#08090b`), **so always override before the operator sees anything.** Its whole
theme is 6 colour tokens + 2 fonts:

```css
:root {
  --sc-canvas:       #FBF3E4;  /* Direction A cream. Drift interpolates this. */
  --sc-surface:      #FFFFFF;
  --sc-ink:          #2A2A35;
  --sc-ink-soft:     #6B6B78;
  --sc-accent:       #F2784B;  /* coral — scroll-craft allows exactly ONE accent */
  --sc-accent-ink:   #14322D;  /* ⚠⚠ NOT #FFFFFF — see below */
  --sc-font-display: 'Baloo 2', 'Trebuchet MS', system-ui, sans-serif;
  --sc-font-text:    'Nunito', system-ui, -apple-system, sans-serif;
}
```

⚠⚠ **`--sc-accent-ink` is NOT the shell's `--lcs-accent-ink`.** `lcs-shell.css` says
`#FFFFFF`, but white-on-coral measures **2.73:1 — a WCAG failure the operator has banned**
("INK-on-coral CTAs; never white-on-coral", MEMORY.md). The shipped value is `#14322D` at
4.97:1 ([[project_workspace_redesign]] line 42). **Every scroll-craft CTA sits on the
accent**, so a naive 1:1 token copy puts banned contrast on every button. Do NOT "correct"
it back to white. Teal `#146B5E` has no `--sc-` slot (one accent only) — carry it in your
own markup for frames and structure. Drift cream → teal-tinted cream, never toward dark.

**⭐⭐ Question discipline — the operator is NOT technical and says so.** Ask **content**
questions, never **technical** ones. scroll-craft Step 0 *requires* an 8-question
interview (vibe, scroll journey, assets owned) before generating anything — those are
fair and must not be skipped. "Tailwind v3 or v4" is never a question for them; decide it
from CLAUDE.md. `design-taste-frontend` §0.C caps itself at **one** clarifying question —
honour that. A multi-question technical dump was rejected outright on 2026-09-04.

**Gotchas:**
- ⚠ **Never `npx skills add anthropics/skills`** — Frontend Design is already installed as
  a *plugin*; a repo install would create a second competing copy.
- ⚠ `-g` is what makes `npx skills add` global. Without it, it installs into the CURRENT
  REPO (`.agents/skills/` + `.claude/skills/` symlinks + `skills-lock.json`) — that
  happened once and was cleaned up.
- The only optional gap is `KIE_AI_API_KEY` (paid, kie.ai), needed ONLY to *generate*
  imagery. Building from the operator's own assets needs no key and no spend.
- Health checks: scroll-craft `node <skill>/scripts/doctor.mjs` must exit 0 "Ready";
  design-dna `npm test` in its `scripts/` must be 9/9.

Cross-ref [[feedback-write-full-urls]], [[project_homepage_redesign_2026_07]]
