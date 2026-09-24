# Make the four design toolkits reliable, forever

## Context

You installed four design toolkits and asked for two things: that they are installed
correctly, and that in future sessions I route to the right one and use it well without
you having to explain anything.

**Installation is already correct — verified, not assumed.** The real risk is routing.
Your "Taste Skill" install (`Leonxlnx/taste-skill`) shipped **13 skills, not 1**, and I
measured that **10 skills now answer to generic design language** ("landing page",
"premium", "templated", "generic"). Three are near-clones of yours:

| Your skill | Shadowed by | Verified collision |
|---|---|---|
| `scroll-craft` | `gpt-taste` | both claim "GSAP ScrollTriggers (pinning…" |
| `design-taste-frontend` | `redesign-existing-projects` | "Audits current design, identifies generic AI patterns" |
| `design-taste-frontend` | `design-taste-frontend-v1` | near-identical name |
| `design-dna` | `image-to-code` | both claim "deeply analyze them" |

**This cannot be fixed by configuration.** There is no per-skill enable/disable anywhere:
`settings.json` toggles whole *plugins* only, `.claude.json` holds usage counters only,
and the installer's `dismissed:{}` map is never read by Claude Code. **Nothing will be
deleted** — you said you need all four, and the extra nine came bundled inside the Taste
Skill repo you named.

That leaves exactly one durable mechanism: **persistent memory**, which is loaded into
every future session automatically. That is what this plan writes.

## Verified state

| You say | I invoke | SKILL.md | Health check |
|---|---|---|---|
| Design DNA | `design-dna` | 114 lines | `sharp` installed, test suite **9/9 pass** |
| Frontend Design | `frontend-design:frontend-design` | 71 lines | plugin active, version `1dd995193ba2` |
| Taste Skill | `design-taste-frontend` | 1206 lines | no dependencies |
| Scrollcraft | `nateherk-design:scroll-craft` | 420 lines | preflight **exits 0 "Ready"** |

Every `name:` matches its directory; **every internal file reference resolves**
(design-dna 4/4, scroll-craft 18/18); all 9 bundled `.mjs` scripts pass `node --check`.
scroll-craft support: ffmpeg **9.0.1 full build** (588 filters, libwebp), Chrome found,
playwright-core resolving, workspace at `lessoncraftstudio/scrollcraft` (gitignored).
Only `KIE_AI_API_KEY` unset — optional, paid, needed only to *generate* imagery.

## Two hazards this defuses

**1. Stack collision.** `design-taste-frontend` §3.A *mandates* Tailwind v4 and the Motion
library. Your frontend runs `tailwindcss ^3.4.17` with **neither `motion` nor
`framer-motion` installed**, and CLAUDE.md §5/§10.3 lock the stack. Followed literally it
would push three new dependencies and a major upgrade into a production repo. Separately
`mini tools/*.js` is **vanilla JS, not React** — a React-defaulting skill is simply wrong
there.

**2. Re-install duplication.** You cited `anthropics/skills` for Frontend Design, but it
is installed as a *plugin* from Anthropic's official marketplace. Running
`npx skills add anthropics/skills` later would create a **second competing copy**.

## Plan

### Step 1 — Write one memory file (the whole mechanism)

Create `C:\Users\rkgen\.claude\projects\C--Users-rkgen-lessoncraftstudio\memory\feedback_design_toolkit_routing.md`.
One file, not two: MEMORY.md is already 15.4 KB and has twice hit its read limit, so the
index gains a single line and all detail lives here. House frontmatter shape
(`node_type: memory`, `type: feedback`), bold run-in `**Why:**` / `**How to apply:**`,
`[[wiki-links]]` at the end.

Contents, in order:

1. **The routing table** — your four names → exact skill ids → source repo, exactly as in
   *Verified state* above.
2. **Disambiguation rules**, mechanical enough to apply without thinking:
   - *"Design DNA"* → `design-dna`. It is the only **images/URL in → JSON profile out**
     skill. If the request is *generate me a picture*, it is NOT this one.
   - *"Frontend Design"* → `frontend-design:frontend-design`. Anthropic's; **judgement and
     principles, no stack mandate**. The safe default when touching existing project UI.
   - *"Taste Skill"* → `design-taste-frontend` (never the `-v1`, never
     `redesign-existing-projects`). It **builds code** and is opinionated about stack.
   - *"Scrollcraft"* → `nateherk-design:scroll-craft` (never `gpt-taste`). It is the only
     one that **produces a standalone scroll-driven page**.
   - **Unnamed request** ("make this less generic"): do not guess among ten. Inside
     `frontend/` or `mini tools/` → `frontend-design`. A new standalone page → ask which
     of the four, naming them in your words.
3. **The guardrails**:
   - 🛑 **CLAUDE.md outranks every skill** on stack, palette, and protected cores. Never
     add a dependency because a skill says so (§5/§10.3). Report any override in the reply.
   - `mini tools/` is vanilla JS — ignore React/RSC instructions there entirely.
   - ⭐ scroll-craft is **safe by construction**: it writes standalone HTML to the
     gitignored `scrollcraft/builds/` and never touches the Next app.
4. **The ready-made brand bridge** so Scrollcraft output is on-brand instead of its default
   dark theme (`#0A0806`) — Direction A from `mini tools/lcs-shell.css`:

   ```css
   :root {
     --sc-canvas: #FBF3E4;  --sc-surface: #FFFFFF;
     --sc-ink:    #2A2A35;  --sc-ink-soft: #6B6B78;
     --sc-accent: #F2784B;  --sc-accent-ink: #FFFFFF;
     --sc-font-display: "Baloo 2", system-ui, sans-serif;
     --sc-font-text:    "Nunito", system-ui, sans-serif;
   }
   ```
   (teal `#146B5E` is the alternate accent for structural elements)
5. **Question discipline**, which matters because you are not technical:
   - ⭐⭐ Ask **content** questions, never **technical** ones. scroll-craft *requires* an
     8-question interview (vibe, journey, assets) before generating — those are fair to
     ask. "Tailwind v3 or v4" is not; I decide that from CLAUDE.md.
   - `design-taste-frontend` §0.C caps itself at **one** clarifying question. Honour it.
6. **The gotchas**: no per-skill disable exists; never `npx skills add anthropics/skills`;
   `KIE_AI_API_KEY` is the only optional gap; the ten shadow skills stay installed
   deliberately.

### Step 2 — Add exactly one MEMORY.md index line

At the top region of `MEMORY.md`, matching house style verbatim:

```
## 🎨 LIVE 2026-09-04 — **FOUR DESIGN TOOLKITS live + routing locked**: Design DNA=`design-dna` · Frontend Design=`frontend-design:frontend-design` · Taste Skill=`design-taste-frontend` · Scrollcraft=`nateherk-design:scroll-craft`; ⚠ the taste repo also installed 9 SHADOW skills (gpt-taste shadows scroll-craft, redesign-existing-projects shadows taste) and NO per-skill disable exists; ⭐⭐ a skill NEVER adds deps — CLAUDE.md §5/§10.3 beat its Tailwind-v4+Motion mandate. → [design toolkits](feedback_design_toolkit_routing.md)
```

### Step 3 — Commit the one repo change already made

`.gitignore` is currently modified but uncommitted — it carries the `scrollcraft/` entry
that keeps the workspace out of git. Commit that alone (`[CHORE] gitignore: scroll-craft
workspace`). No other tracked file was touched.

## Files

- **Create** `…\memory\feedback_design_toolkit_routing.md` — the routing rule (only new file)
- **Edit** `…\memory\MEMORY.md` — one index line
- **Commit** `C:\Users\rkgen\lessoncraftstudio\.gitignore` — already-written `scrollcraft/` entry

Nothing under `frontend/`, `mini tools/`, or any skill directory is touched. Nothing is
deleted or uninstalled.

## Verification

**Prove the four are healthy** (re-runnable any time):

```bash
# Scrollcraft — must print "Ready" and exit 0
cd "$USERPROFILE/lessoncraftstudio/scrollcraft" && \
  node "$USERPROFILE/.claude/plugins/cache/nateherk/nateherk-design/0.2.0/skills/scroll-craft/scripts/doctor.mjs"

# Design DNA — must report 9 pass / 0 fail
cd "$USERPROFILE/.claude/skills/design-dna/scripts" && npm test

# All four registered under the exact ids
ls "$USERPROFILE/.claude/skills/design-dna" "$USERPROFILE/.claude/skills/design-taste-frontend"
grep -c . "$USERPROFILE/.claude/plugins/cache/nateherk/nateherk-design/0.2.0/skills/scroll-craft/SKILL.md"
```

**Prove the memory works** — the real test, and it must be done in a *fresh* session,
because that is the only place the mechanism is exercised:

1. Start a new session and say *"use Scrollcraft"*. Correct behaviour: I invoke
   `nateherk-design:scroll-craft` (not `gpt-taste`), and I open with the 8 content
   questions rather than generating anything.
2. Say *"use Taste Skill on the homepage"*. Correct behaviour: I invoke
   `design-taste-frontend`, build on **Tailwind 3**, and state plainly that I overrode its
   Tailwind-v4/Motion mandate per CLAUDE.md — without installing anything.
3. If either misroutes, the memory file is the single place to sharpen.
