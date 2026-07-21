# Off-Site Identity Audit — LessonCraftStudio

**Domain:** https://www.lessoncraftstudio.com
**Audit date:** 2026-07-21
**Purpose:** Google composes a brand's entity ("Knowledge Graph") partly from the external
profiles it associates with a domain — the `sameAs` graph. Several profiles tied to this
domain are still branded around the **abandoned seller identity** (sell printables on
Etsy / Amazon-KDP / TPT, "profitable printable business", commercial license). Every day
those live, they re-teach Google the old identity and dilute the **new identity**:

> **Free, multilingual (11-language) K-3 worksheets & interactive activities for teachers** —
> dual-language, bilingual, and international-school classrooms. Everything free to browse,
> print, share, and embed. No signup.

This document audits each external profile so the operator can clean them, and so the
cleaned subset can be wired into the site's Organization `sameAs`.

**Verification legend:**
- ✅ **Directly verified** — page fetched and read this session.
- 🔎 **Search-derived** — page returned 403 / consent-wall to direct fetch; quotes and facts
  come from search-engine snapshots of the page and should be re-confirmed by the operator
  when logged in.

---

## Summary table

| # | Profile | Current identity | Seller-branded? | Verdict | sameAs-safe? |
|---|---------|------------------|-----------------|---------|--------------|
| 1 | TPT — `lesson-craft-studio-worksheet-generators` | "Professional Worksheet Generators" | **Yes (heavy)** | REWRITE or RETIRE | ❌ No |
| 2 | TPT — `lesson-craft-studio` | "Lesson Craft Studio" | Unverified | REWRITE (verify first) | ❌ No |
| 3 | YouTube — `@LessonCraftStudioApps` | "Lesson Craft Studio" | Handle leans tooling | REWRITE name+desc, KEEP handle | ✅ Yes (after cleanup) |
| 4 | Pinterest — `worksheetgenerators` | "Lesson Craft Studio" | **Yes** | REWRITE | ✅ Yes (after cleanup) |
| 5 | TES — `shop/LessonCraft` | "LessonCraft's Shop" | No (already free/teacher) | REWRITE (name align) | ⚠️ Optional (thin) |
| 6 | Lemon Squeezy — `lessoncraftstudio-com.lemonsqueezy.com` | "Lesson Craft Studio" | Commercial checkout | KEEP (payments) / noindex | ❌ No |

No Facebook, Instagram, LinkedIn, Twitter/X, Reddit, Gumroad, Etsy, or Amazon storefront
was found for this brand (see "Not found" section). Several **similarly-named but
unrelated** entities exist — do **not** touch or `sameAs` them (see "Name collisions").

---

## 1. Teachers Pay Teachers — Worksheet-Generators store 🔎

- **URL:** https://www.teacherspayteachers.com/store/lesson-craft-studio-worksheet-generators
- **Display name:** "Professional Worksheet Generators" / "Lesson Craft Studio"
- **Positioning (quoted from search snapshots):** the platform is described as
  *"a professional platform with 33 worksheet and puzzle generators for **entrepreneurs,
  Etsy sellers, Amazon KDP publishers**, and educators"*; generators are *"free to use with
  a watermark … paid products remove the watermark and include **full commercial rights**."*
- **Seller-branded?** **Yes — heavily.** This is the single most seller-coded profile in the
  graph: entrepreneurs, Etsy/KDP sellers, commercial rights, watermark-removal upsell.
- **Verdict:** **REWRITE** (if the operator wants to keep a free-teacher TPT presence) **or
  RETIRE.** Note TPT is inherently a paid marketplace, so even a rewritten store keeps a
  faint "seller" signal — retiring is the cleaner identity move.
- **sameAs-safe?** ❌ **No.** A marketplace storefront branded around commercial licensing
  must not anchor the free-teacher identity. Do not add to `sameAs` in any state.

**If REWRITE (free-only, teacher-facing):**
- Display name: `LessonCraftStudio`
- Bio (≤160): `Free multilingual K-3 worksheets & interactive activities for teachers — 11 languages, no signup. Browse, print, share & embed at lessoncraftstudio.com`

---

## 2. Teachers Pay Teachers — main store 🔎

- **URL:** https://www.teacherspayteachers.com/store/lesson-craft-studio
- **Display name:** "Lesson Craft Studio"
- **Positioning:** **Could not verify** — direct fetch returned HTTP 403, and search
  snapshots for this exact slug conflicted (one described ~1,600 unrelated resources on
  science/history/"King Arthur", which does not match this brand and is likely bleed from a
  different store). Treat the store's real contents as **unconfirmed**.
- **Seller-branded?** Unverified.
- **Verdict:** **REWRITE (verify first).** Operator should log in, confirm this store is
  actually theirs and what it contains, then either align it to the free-teacher identity or
  retire it. Do not act on the "1,600 resources" figure — it appears to be a search
  conflation.
- **sameAs-safe?** ❌ **No** (marketplace; and identity unconfirmed).

**If REWRITE:** same recommended copy as #1.

---

## 3. YouTube — @LessonCraftStudioApps 🔎

- **URL:** https://www.youtube.com/@LessonCraftStudioApps
- **Display name:** "Lesson Craft Studio"
- **Handle:** `@LessonCraftStudioApps`
- **Description:** **Could not read** — YouTube forced a consent-wall redirect and only the
  page footer was retrievable this session. The channel exists and its public title is
  "Lesson Craft Studio". Operator should read/quote the About text directly.
- **The "Apps" problem:** the handle `@LessonCraftStudioApps` embeds **"Apps"**, which leans
  toward tooling / software-product framing rather than the free-teacher-resource identity.
- **Verdict:** **REWRITE the channel NAME + description; KEEP the handle.**
  Renaming the *handle* (`@LessonCraftStudioApps` → `@LessonCraftStudio`) would **break the
  existing URL** and any inbound links/`sameAs` already pointing at it. The **channel display
  name** and **About** text are freely editable and are what Google/YouTube surface — change
  those, leave the `@handle` alone.
- **sameAs-safe?** ✅ **Yes, after cleanup.** YouTube is a strong, neutral identity anchor once
  the name/description are aligned.

**Recommended:**
- Channel name: `LessonCraftStudio` (drop "Apps" from the *display name*)
- About (≤160 lead line): `Free multilingual K-3 worksheets & interactive activities for teachers, in 11 languages. Browse, print, share & embed — no signup. lessoncraftstudio.com`
- Keep handle as-is: `@LessonCraftStudioApps`

---

## 4. Pinterest — worksheetgenerators 🔎

- **URL:** https://se.pinterest.com/worksheetgenerators/
- **Display name:** "Lesson Craft Studio"
- **Handle:** `worksheetgenerators`
- **Bio (quoted from search snapshot):** the profile *"describes itself as giving you the
  tools to build a **profitable printable business** without design skills, expensive
  software, or hours of manual work,"* mentions **"33 generators"**, and has **7 pins,
  0 followers / 0 following.**
- **Seller-branded?** **Yes** — "profitable printable business" is core seller copy.
- **Verdict:** **REWRITE.** Bio must move to free-teacher framing. The `worksheetgenerators`
  handle also leans tooling/seller; changing it would break the URL, so keep the handle and
  fix the display name + bio (same logic as YouTube).
- **sameAs-safe?** ✅ **Yes, after cleanup** (Pinterest is a legitimate teacher-discovery
  channel and a good identity anchor once the bio is aligned). Note the profile is currently
  near-empty (7 pins) — value is low until pins are added, but it is safe to include.

**Recommended:**
- Display name: `LessonCraftStudio — Free K-3 Worksheets`
- Bio (≤160): `Free multilingual K-3 worksheets & interactive activities for teachers, in 11 languages. Print, share & embed — no signup. lessoncraftstudio.com`

---

## 5. TES — shop/LessonCraft ✅ (directly verified)

- **URL:** https://www.tes.com/teaching-resources/shop/LessonCraft
- **Display name:** "LessonCraft's Shop"
- **Bio (quoted exactly):**
  > "Welcome to LessonCraft – a space where we create simple, engaging, and printable
  > resources for teachers and parents. From coloring worksheets to early learning
  > activities, each resource is thoughtfully designed to support fun, hands-on learning for
  > young children."
- **Contents:** 1 upload ("Numbers Coloring Worksheet"), marked **FREE**.
- **Seller-branded?** **No.** This bio is already close to the new identity — free, aimed at
  teachers and parents, early-learning. No selling/Etsy/KDP/commercial-license language.
- **Verdict:** **REWRITE (light — name alignment only).** The display name "LessonCraft's
  Shop" drops "Studio" and doesn't match the brand; the bio is missing the two strongest
  differentiators (**11 languages** and **interactive activities**). Fix name + add those.
  Also thin (1 resource).
- **sameAs-safe?** ⚠️ **Optional.** Aligned and safe, but very thin (1 upload) and TES is a
  marketplace context. Include only if the operator plans to populate it; otherwise low value.

**Recommended:**
- Display name: `LessonCraftStudio`
- Bio (≤160): `Free multilingual K-3 worksheets & interactive activities for teachers and parents, in 11 languages. Print, share & embed — no signup. lessoncraftstudio.com`

---

## 6. Lemon Squeezy storefront 🔎

- **URL:** https://lessoncraftstudio-com.lemonsqueezy.com/
- **Display name:** "Lesson Craft Studio"
- **What it is:** the **payment/checkout storefront** (Lemon Squeezy is the platform's
  payment processor per the codebase). Direct fetch returned HTTP 403.
- **Seller-branded?** Inherently commercial — it's a checkout surface, not a brand-identity
  page.
- **Verdict:** **KEEP** (it's payment infrastructure and payments went live 2026-07-12) but
  **keep it out of the public identity graph** — ensure it is `noindex` and never linked as a
  brand profile. It is not a "seller identity" to clean so much as a back-end surface to keep
  private.
- **sameAs-safe?** ❌ **No.** Never add a checkout storefront to `sameAs`.

---

## Not found (searched, no brand profile located)

Searches for the brand on these platforms returned **no matching profile** (only unrelated
same-name accounts):

- **Facebook** — none.
- **Instagram** — none (many unrelated "*craft studio" handles).
- **LinkedIn** — none (an unrelated "The Lesson Studio" music company exists).
- **Twitter / X** — none confirmed (an unrelated `twitter.com/lessonstudio` handle surfaced;
  not this brand).
- **Reddit** — none.
- **Gumroad** — none (the brand only *references* Gumroad in seller-era blog/tool content).
- **Etsy** — no storefront (referenced only as a target marketplace in old copy).
- **Amazon / KDP** — no storefront (referenced only in old copy).

If the operator has (or opens) accounts on any of these, audit them before linking.

---

## Name collisions — do NOT touch or sameAs (these are other people's brands)

Search surfaced several **similarly-named but unrelated** entities. Confirm none of these get
wired into `sameAs`:

- `lessoncraftpro.com` — "LessonCraft's AI" (a different AI lesson-plan product).
- `getlessoncraft.com` — "LessonCraft — Smart lesson planning" (different product).
- TPT `store/lessoncraft-studio` (no internal hyphen) — "LessonCraft Studio", 1 resource
  ("200 Sketchbook Prompts"); appears unrelated.
- Various "*Craft Studio" social accounts (games, crafts, music) — all unrelated.

---

## ⚠️ Adjacent flag — the on-site titles are the biggest seller signal (out of audit scope, but material)

This audit is off-site, but Google's index still shows the **operator's own domain** carrying
seller-era titles, which reinforces the abandoned identity far more than any external profile:

- Homepage title in search: **"Professional Printable Generators | Create & Sell on Etsy & KDP"**
- App pages: **"…Bulk Create KDP Activity Book Pages"**, **"Matching Worksheet Generator for Etsy Sellers"**
- A `/tools/profit-hub` ("Compare Fees on Etsy, Gumroad, TPT, KDP") and seller-vs-seller blog posts.

Cleaning external `sameAs` while these on-site titles persist will only partly reset the
entity. **However**, per the codebase churn-freeze (`CLAUDE.md` §21.5a, in effect until
~2026-09-01), mass title/metadata rewrites of existing indexed pages are frozen without
operator sign-off. Recommend surfacing this to the operator as a **separate, post-freeze**
on-site identity cleanup — do not fold it into this off-site pass.

---

## ✅ Recommended `sameAs` list (post-cleanup)

Add to the Organization structured data **only after** each profile below is rewritten to the
free-teacher identity. All are neutral identity anchors (not commercial marketplaces/checkout):

```
- https://www.youtube.com/@LessonCraftStudioApps
- https://se.pinterest.com/worksheetgenerators/
```

**Optional (include only if populated & name-aligned):**
```
- https://www.tes.com/teaching-resources/shop/LessonCraft
```

**Explicitly excluded from `sameAs`** (marketplace / commercial / checkout / unconfirmed):
- Both Teachers Pay Teachers stores (paid marketplace; seller-coded)
- The Lemon Squeezy checkout storefront (payment back-end; keep noindex)

---

## Cleanup checklist (operator action)

1. **YouTube** — rename channel display to `LessonCraftStudio`, rewrite About to the free /
   11-language / interactive line. **Keep the `@LessonCraftStudioApps` handle.**
2. **Pinterest** — rewrite display name + bio to free-teacher copy. Keep the
   `worksheetgenerators` handle (don't break the URL). Add teacher-facing pins over time.
3. **TES** — align display name to `LessonCraftStudio`; add "11 languages" + "interactive
   activities" to the bio. Decide whether to populate.
4. **TPT (worksheet-generators)** — rewrite to free-only teacher copy, or retire. Either way,
   **not** a `sameAs`.
5. **TPT (main)** — log in, verify it's actually this brand and its contents, then align or
   retire.
6. **Lemon Squeezy** — leave as payment back-end; confirm it is `noindex` and unlinked as a
   public profile.
7. Once 1–3 are cleaned, wire the **Recommended `sameAs` list** into the Organization JSON-LD.
8. Post-freeze (~2026-09-01), open a separate task for the on-site seller-title cleanup.
