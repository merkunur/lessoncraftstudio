---
name: project-tool-landing-pages
description: "Per-manipulative SSR landing pages (/[locale]/tools/<native-slug>/) — ten-frame, number-line, ruler — live in 11 locales; how to extend"
metadata: 
  node_type: memory
  type: project
  originSessionId: f49d98aa-7160-4f31-8825-295b5fd203ec
---

The 3 free-play manipulatives (ten-frame, number-line, ruler) each have a dedicated indexable SSR landing page at `/[locale]/tools/<native-slug>/` (e.g. `/de/tools/zehnerfeld/`, `/fi/tools/lukusuora/`, `/pt/tools/regua/`). Shipped 2026-05-30 (commit `fef2b985`, branch `pivot/printable-business-toolkit`, LIVE). The mini-tool itself stays the JS-only `/mini-tools/<tool>.html` shell (no SEO); the landing page is the indexable surface that embeds it via `ActivityIframe`. Mirrors the activity-detail pattern ([[project-activity-page-seo]]).

**Structure:**
- `frontend/lib/seo/tool-content.ts` — `getToolContent(locale, toolKey)`, `resolveToolSlug(slug, locale)`, `listToolSitemapEntries()`, `hreflangAlternatesForTool()`. `TOOL_KEYS = ['ten-frame','number-line','ruler']`. 11-locale `LOADERS`.
- `frontend/messages/tool-content/<locale>.json` ×11 — per tool: `slug` (native-language URL segment, ASCII-folded), `name`, `tagline`, `metaTitle`, `metaDescription`, `about[3]`, `howToUse[4]`, `classroomIdeas[4]` + shared `labels`. Native-expert authored.
- `frontend/app/[locale]/tools/[tool]/page.tsx` — SSR, `generateStaticParams` (3×11=33), `generateMetadata` (canonical + hreflang + OG), ActivityIframe embed + "open full screen" link, "activities that use this tool" strip (filters `listAllActivities()` by `tool.startsWith(prefix)`; ten-frame → its 5 activities; number-line/ruler self-skip until engines ship), other-languages strip, LearningResource JSON-LD (`learningResourceType: "Manipulative"`).
- `frontend/app/[locale]/tools/page.tsx` — landing cards now link to the SSR pages + read per-locale copy from `getToolContent`.
- `frontend/app/sitemap.ts` — 33 per-tool URLs in shard 3.

**Live verified:** en/de/fi/pt tool pages = 445–535 visible words, LearningResource+Manipulative JSON-LD, single h1, iframe + mini-tool embed; ten-frame shows 5 related activities + other-language links; sitemap shard 3 has all 33 `/tools/` URLs.

**To add a 4th manipulative:** add its key to `TOOL_KEYS` + `TOOL_MINI_URL` + `TOOL_ACTIVITY_PREFIX` in tool-content.ts, add its entry to all 11 `tool-content/<locale>.json`, ensure the `/mini-tools/<key>.html` shell exists. Audit with `node scripts/audit-activity-pages.js` once the tool-page checks are added there (currently audits activities only).
