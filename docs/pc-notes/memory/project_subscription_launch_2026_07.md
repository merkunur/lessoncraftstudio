---
name: subscription-launch-2026-07
description: "The 2026-07-11 subscription launch program — approved plan, per-phase build state, deploy checklist, remaining units (hosted worksheet URLs = flagship; storybook stack removed)"
metadata: 
  node_type: memory
  type: project
  originSessionId: aaf336ec-30a7-4d56-b21f-c711a6b23431
---

## 🟢 METERED PAYWALL LIVE 2026-07-12 (operator: "deploy and flip the meter")
The education.com + IXL model is ON in production. VERIFIED LIVE: anon play = 10/day then
402 wall (proven: 10×200 then #11/#12 → 402); anon download → 401 signup_required; Googlebot
UA → allowed/unlimited (crawler bypass — SEO safe); deck.html carries lcs-meter.js on all
45,309 decks (injector applied 45309, 1 orphan-symlink skip pt/chart-count); raw PDF URLs +
deck pages still 200 for crawlers; metered copy live (homepage "10 a day"/"3 downloads",
pricing "Always a free tier"/"Unlimited play" Teacher). METERING_ENABLED=1 in
frontend/.env.production (backup /root/.env.production.bak-*). KILL SWITCH: set
METERING_ENABLED=0 + redeploy → instant full revert (subscription rail untouched). ABORT
WATCH: organic baseline 12.4/day at flip; revert if >30% below 7-day mean for 3 consecutive
days. Commits: M0 0aea3893 · M1a a6c1fadc · M2a 3ecbbf81 · M2b 802d4bb2 · M1b f0d6a715 ·
M1c (landing proxy) · M3 copy (this session). Deck-play wall = client overlay (embed-exempt
via window.top check). Surfaces: topic-grid + generators + landings (downloads), decks +
activities (play). The ONE topic type without a grid is prose-landing (/topic/addition) —
grid client still deployed, just not exercised there.

**Approved plan (operator 2026-07-11) = `C:\Users\rkgen\.claude\plans\lower-models-of-claude-zippy-backus.md`.**
Operator rulings: storybook project DEAD IN FULL (Story Studio included); no watermarks ever;
generator paid feature = SAVE-to-dashboard hosted URL, NO file downloads; best-possible
homepage in scope. Offer: FREE = every indexed byte unchanged (play/PDFs/generators);
free account = favorites; Teacher $69/yr·$8.99/mo = hosted interactive worksheets (flagship)
+ workspace/collections + deck play-links + topic packs. Cut from copy: storybooks, studio,
watermark-free, familyTeaser, first-access (games cancelled). SEO guardrails: no gate on any
existing GET; same-bytes-to-Googlebot; deck/PDF/landing corpora byte-frozen; /play/* noindex.

**BUILT + COMMITTED (all pushed through `c2a1067b`):**
- WS1 storybook removal: waves 0-4 DONE + DEPLOYED LIVE (backup studio_20260710_232114.tar.gz;
  master-sync story-spread hazard defused in .sh+.bat; pips-picnic 410 live; 42-file route-tree
  deletion `d533406f`; server mini-tools assets deleted — only storybook-library data kept).
  Wave 5 SEP-button strip ×29 COMMITTED `faaa62d1` (served copies NOT yet updated). Wave 6
  (archive docs/storybook + scripts/storybook, git-archive mini tools/stories) OPEN.
- WS2 P0 `c9e024ff`: lib/entitlements.ts (isSubscriptionUsable: active|past_due≤14d|
  canceled-paid-through|admin); requireAuthenticatedUser rename + requireActiveSubscriber;
  verify-app-access = tier oracle {tier, features.saveInteractive}, hasAccess stays admin.
- WS2 P1 `bf6be44c` [SCHEMA]: HostedWorksheet model + migration 20270711000000 (NOT applied
  to prod DB yet); lib/hosted-worksheets/core.ts (quotas 300/1GB/15MB, atomic FS at
  /var/www/lcs-media/hosted-worksheets/); /api/worksheets/hosted CRUD (kill switch
  HOSTED_WORKSHEETS_DISABLED); /play/w/[linkId] (noindex + CSP sandbox allow-scripts
  allow-popups + per-locale kid-safe paused page + instant revival) + qr.png;
  /play/[linkId] deck 302 (PlayLink URLs were DEAD — no route existed!); middleware play/ carve-out.
- WS2 P2 `b80520ce`: 8 API routes tier-enforced (collections ×5, play-links ×2, workspace).
- WS2 P3 `faaa62d1`: REFERENCE TRANSLATIONS/worksheet-host.js (LAUNCHED=false dark flag;
  capture-phase repurpose of #downloadInteractiveHtmlBtn; 11-locale strings; upsell/save/QR
  modals; Umami events) loaded via access-guard.js appended loader; access-guard
  filenameToAppId hyphen fix; probed 29/29 apps compatible (prepositions = window-assigned form).
- WS2 P4 `c2a1067b`: HostedWorksheetsWidget + FavoritesWidget + /api/favorites (auth-only,
  free layer) + workspace.hosted/favorites keys ×11.

**BLOCKED ON OPERATOR — the reviewed deploy batch (task #22):** the permission classifier
requires operator review for `npx prisma migrate deploy` (production DB). Full batch:
pull → migrate deploy → deploy.sh → cp worksheet-host.js+access-guard.js to
/var/www/lcs-media/worksheet-generators/js/ → update-worksheet.sh ×29 apps → verify
(deck byte-hash unchanged, admin dogfood save, curl head-diff ×3 apps).

**PROGRESS UPDATE (later same session):** topic packs DONE `a24a80ed` (client JSZip, bulk-select
"Download as ZIP pack", verify-app-access entitlement, cap 30, keys ×11). Flip wiring DONE
`c48a2a68` (nav/footer/sitemap pricing links real, gated). Storybook wave 6 DONE `2ea4293e`
(856 files archived: mini tools/stories + runtime + scripts/storybook + docs/storybook;
scripts/studio/backup-studio.sh KEPT for the cron) — REMOVAL COMPLETE 0-6. EN pricingPage
rewritten honest (hosted-links flagship; familyTeaser un-rendered; residue-checked);
subscription-launch.ts docstring = the real FLIP CHECKLIST (PRICING_PUBLIC + worksheet-host
LAUNCHED=true + ?v= bump together).

**BUILD COMPLETE (2026-07-11, commits through `d6210af5`):** pricing truth pass ×11 committed
`002ba38a` ([NSR] sv/da/no/fi); homepage v4 PREVIEW committed `d6210af5` (/[locale]/preview/
homepage-v4; live page byte-untouched; homepageV4 namespace EN-only — i18n/request.ts EN
deep-merge covers other locales pre-native-pass; BrowseByTopicSSR parameterized w/ identical
defaults; ~141 body links).

**DEPLOY BATCH ✅ DONE 2026-07-12 (operator said "continue"):** migration applied
(20270711000000 — "All migrations successfully applied"); deploy.sh green; worksheet-host.js
new-copied + access-guard.js via update-worksheet.sh (immutable) + 29 app HTMLs via
update-worksheet.sh loop. VERIFIED LIVE: SEP button gone from served apps; new access-guard
?v=1783727100000 + loader; /play/w/<bogus> 404 + X-Robots noindex,nofollow; /play/<bogus> 404;
/en/preview/homepage-v4 200 + noindex; de pricing = new copy (3× dauerhaften-Link, 0×
Bilderbuch/Wasserzeichen) + noindex + sitemap-absent pre-flip; live homepage 0 v4 markers;
deck corpus untouched. NOTE: admin dogfood of the save flow (sign in as admin in a generator →
save → URL plays) not yet exercised — needs a browser session.
2. ✅ HOMEPAGE V4 PROMOTED LIVE 2026-07-12 (operator: "promote"): ×10 native pass done
   ([NSR] sv/da/no/fi), PillarMakersV4 + EmbedShareV4 forks (flip-gated chips/copy),
   themes cap 40, single import-swap commit, deployed + verified (140 body links en,
   head byte-intact — NOTE: Next renders hreflang as camelCase `hrefLang` on SSR pages,
   grep case-insensitively!; flip-gated sections absent from rendered UI; rollback =
   revert the promotion commit).
3. 🚀 **FLIPPED LIVE 2026-07-12** (operator-approved plan after their test findings): the
   save-flow bug root-caused + fixed — the apps' worksheetCanvas/downloadInteractiveHtml are
   CLOSURE-scoped (probe checked string presence, not window attachment — LESSON); fix =
   per-app `window.__lcsWorksheetHost = { getHtml }` bridge next to each app's download
   wiring ×29 (__sepExport precedent) + worksheet-host v2 uses the bridge. PRICING_PUBLIC +
   LAUNCHED flipped together; VERIFIED LIVE: pricing index,follow + nav/footer ×3 links +
   sitemap ×11; homepage $69 Teacher card + chips; shim in all 29 served apps; v2 loader.
   Export-to-catalog = admin-by-design (operator confirmed admin account). REMAINING: the
   operator's save retest; real $8.99 test purchase + cancel (rail already webhook-proven);
   abort watch (>30% below 7d mean 3 days → revert, baseline ~12.4/day); maker-landing
   upsell copy ≥2 weeks post-flip as its own commit; [NSR] passes sv/da/no/fi.

**Key facts rediscovered:** deck runtime localStorage is try/catch-guarded (CSP sandbox safe);
REFERENCE APPS filenames are HYPHENATED (access-guard map was broken for multi-word apps);
downloadInteractiveHtml(canvas,'',{returnString:true}) returns the HTML string in 29/29;
migrations use a 2027-prefixed timestamp convention (follow it).
