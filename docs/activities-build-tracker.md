# Activities Build Tracker

Durable, git-tracked progress for the **activity-build workflow** (CLAUDE.md §20 commission). The work unit is **ONE activity, built in all 11 languages, tested locally, deployed once.** This file is the source of truth that survives context limits — update the row as each step completes.

Locales (11): `en de es fr it pt nl sv da no fi`

---

## The standing per-activity cycle

0. **Plan-mode stop** (Rule 4) — at the start of each activity, ask the operator to switch to plan mode; present the build plan (engine, K-2 CCSS mapping, 11-locale scope, native-agent assignments, local-test plan); begin only after the switch.
1. **Build all 11 natively** (Rule 3) — one **native-linguist `general-purpose` agent per locale** (hardest-first: fi → Nordic → Romance → Germanic). Each authors that locale's language-bearing fields (kid prompt, slug, page_title, page_intro, any option text) from that locale's own curriculum framework name (§A.13.49 / `frontend/lib/seo/strand-names.ts`) and phonetics — never machine-translated, never cross-applied. `[NSR-FLAG]` the commit for sv/da/no/fi (§17.5.1). The engine (interaction logic) is shared; only the language layer differs.
2. **Local test** (Rule 2) — sync the served copy, then gate locally across all 11:
   - **Layer 1 (fast):** serve `frontend/public/mini-tools/` statically and open `…/mini-tools/<engine>-activity.html?v=<N>&activity=<id>&lang=<loc>&embed=1` per locale — confirm render + tap-logic.
   - **Layer 2 (the gate):** `npm run dev` (after §14.5 sitemap toggle) then `node scripts/test-activity-local.js --activity=<idSubstr>` — wraps `audit-activity-mobile.js` + `audit-activity-pages.js` against localhost, judges only this activity, **0 hard fails** required.
3. **Single deploy** (Rule 1) — only after all 11 pass: restore the sitemap route, bump cache-busters, commit+push, race-safe `git pull → cp "mini tools"/* /var/www/lcs-media/mini-tools/ → bash deploy.sh`. **No per-locale deploy.**
4. **Live re-verify** — re-run the two audits against production (mind the 5-min Cloudflare TTL) + curl spot-check + 3-viewport eyeball. Mark the activity **done**; the next activity returns to step 0.

**Tooling:** local gate `scripts/test-activity-local.js`; engine manifests `mini tools/*-activities.json`; route `frontend/app/[locale]/activities/[slug]/page.tsx`; strand names `frontend/lib/seo/strand-names.ts`.

Row legend: `✅` done · `⬜` not yet · `—` n/a.

---

## Activity 1 — What Number Comes Next? (K.CC.A.2)

| field | value |
|---|---|
| id | `choice-board.next-number.k-cc-a-2` |
| CCSS | K.CC.A.2 (count forward from a given number) · grade K · Counting & Cardinality |
| engine | E2 choice-board (`choice-board-core.js` **untouched** — 0 protected-core) |
| task_template | `next-number` (new branch in `choice-board-activity.js`) |
| mechanic | show number `n`; tap `n+1` from 4 number tiles; deferred Check |
| cache-buster | `choice-board-activity.js?v=63` (was 62) |
| EN slug | `what-number-comes-next` |

Local gate (2026-06-17, `npm run dev` @ localhost:3000, `node scripts/test-activity-local.js --activity=next-number`): **88/88 mobile renders (11 locales × 8 widths 280→768) + 11/11 SEO-floor pages — 0 fail, 0 EN-leak.**

| locale | strings (native agent) | local render (L1) | local audit (L2) | deployed | live re-verify |
|---|---|---|---|---|---|
| en | ✅ (CC author) | ✅ | ✅ | ⬜ | ⬜ |
| de | ✅ | ✅ | ✅ | ⬜ | ⬜ |
| es | ✅ | ✅ | ✅ | ⬜ | ⬜ |
| fr | ✅ | ✅ | ✅ | ⬜ | ⬜ |
| it | ✅ | ✅ | ✅ | ⬜ | ⬜ |
| pt | ✅ | ✅ | ✅ | ⬜ | ⬜ |
| nl | ✅ | ✅ | ✅ | ⬜ | ⬜ |
| sv | ✅ `[NSR-FLAG]` | ✅ | ✅ | ⬜ | ⬜ |
| da | ✅ `[NSR-FLAG]` | ✅ | ✅ | ⬜ | ⬜ |
| no | ✅ `[NSR-FLAG]` | ✅ | ✅ | ⬜ | ⬜ |
| fi | ✅ `[NSR-FLAG]` | ✅ | ✅ | ⬜ | ⬜ |

Notes: first activity through the new workflow — validates the cycle (local-test-before-deploy, single deploy), not an engine. fi prompt uses genitive framing (`luvun {n} jälkeen`) to handle the caseless substituted numeral.
