# Remove the "free" claim from the activities hub, tools hub, activity FAQ and maker CTAs

## Context

Nothing on the platform is free. Free-tier users get **limited** usage as a trial;
`frontend/lib/quota.ts` is the tier truth. The copy on four surfaces still advertises
the product as free with "no signup and no paywall" — a claim the code contradicts.
Operator instruction: strip it.

Scope confirmed with the operator:
- **Visible copy only.** `metaTitle` / `metaDescription` on the two hubs are left alone
  in this pass (flagged below).
- **All 11 locales**, not just English — the same claim is made in every language.
- **Plus the one adjacent leftover**: after the "Is X free to use?" FAQ pair is deleted,
  answer 1 still calls the activity "a free interactive activity". That adjective goes too.

The §21.5a metadata churn freeze expired ~2026-09-01, and this pass does not touch
metadata anyway.

---

## 1. Activities hub — `frontend/app/[locale]/activities/page.tsx`

Edit `LANDING_STRINGS` (lines ~115-347). Two fields per locale; `metaTitle` /
`metaDescription` untouched.

**`pageTitle`** — delete the price adjective, keep the rest verbatim:

| loc | from → to |
|---|---|
| en | `Free K-3 Learning Activities` → `K-3 Learning Activities` |
| de | `Kostenlose Lernaufgaben für die Klassen K-3` → `Lernaufgaben für die Klassen K-3` |
| es | `Actividades de aprendizaje gratuitas para Infantil…` → drop `gratuitas` |
| fr | `Activités d'apprentissage gratuites (maternelle au CE1)` → drop `gratuites` |
| it | `Attività di apprendimento gratuite (scuola dell'infanzia…)` → drop `gratuite` |
| pt | `Atividades de aprendizagem gratuitas (educação infantil…)` → drop `gratuitas` |
| nl | `Gratis leeractiviteiten voor kleuters t/m groep 5` → `Leeractiviteiten voor…` |
| sv | `Gratis lärandeaktiviteter för förskoleklass till åk 2` → `Lärandeaktiviteter för…` |
| da | `Gratis læringsaktiviteter for børnehaveklasse…` → `Læringsaktiviteter for…` |
| no | `Gratis læringsaktiviteter for barnehage til 2. trinn` → `Læringsaktiviteter for…` |
| fi | `Ilmaisia oppimistehtäviä esiopetuksesta 2. luokalle` → `Oppimistehtäviä esiopetuksesta…` |

Fix the capital on the new first word where the dropped word carried it (nl/sv/da/no/fi).

**`pageIntro`** — delete the **entire trailing sentence** in every locale (operator said
"completely"), leaving the intro ending at the filter instruction:

- en `Free, no signup, in 11 languages.` · de `Kostenlos, ohne Anmeldung, in 11 Sprachen.`
- es `Gratis, sin registro, en 11 idiomas.` · fr `Gratuit, sans inscription, en 11 langues.`
- it `Gratis, senza registrazione, in 11 lingue.` · pt `Grátis, sem cadastro, em 11 idiomas.`
- nl `Gratis, zonder aanmelden, in 11 talen.` · sv `Gratis, utan registrering, på 11 språk.`
- da `Gratis, uden tilmelding, på 11 sprog.` · no `Gratis, uten registrering, på 11 språk.`
- fi `Ilmaisia, ei rekisteröitymistä, 11 kielellä.`

Trim the preceding whitespace so the intro does not end with a trailing space.

## 2. Tools hub — `frontend/lib/manipulatives.ts`

`LANDING_STRINGS` at line 2671. **English only** — measured: the other 10 locales carry no
price claim (their "freien Erkunden / explorar libremente / utforska fritt" is *explore
freely*, pedagogy, not price). Do not touch them.

- L2679 `pageTitle`: `Free Interactive Math Manipulatives` → `Interactive Math Manipulatives`
- L2680 `pageIntro`: `Free-play interactive tools your students explore directly. …` →
  `Interactive tools your students explore directly. No tasks, no checks — just the manipulative.`
  (The free-play *meaning* survives in "explore directly" + "No tasks, no checks", which is
  exactly how the 10 non-EN locales already phrase it.)

`metaTitle` L2682 / `metaDescription` L2683 left as-is per the operator's answer.
The code comment at `frontend/app/[locale]/tools/page.tsx:31` says "free-play" — a comment,
not UI; leave it.

## 3. Activity FAQ — 11 × `frontend/messages/<locale>.json` + `frontend/lib/seo/topic-faq.ts`

The FAQ is not authored per activity: it is one ICU template block at
`topicFaq.fallback.activity` per locale, rendered by `resolveActivityFaq`
(`frontend/lib/seo/topic-faq.ts:92`) → `TopicFaq.tsx` → visible `<dl>` **and** the FAQPage
JSON-LD, both built from the same `items` array.

**Per locale file** (all 11, key block `topicFaq.fallback.activity`):
1. Delete `q2` + `a2` (the "Is X free to use? / completely free, no signup, no paywall" pair).
2. Rename `q3`→`q2`, `a3`→`a2` so the numbering stays contiguous.
3. Drop the price adjective from `a1` — a clean adjective deletion in every locale, no
   agreement consequences: en `is a free interactive activity` → `is an interactive activity`;
   de `eine kostenlose interaktive Aktivität` → `eine interaktive Aktivität`;
   es `actividad interactiva gratis` → `actividad interactiva`; fr `activité interactive
   gratuite` → `activité interactive`; it `attività interattiva gratuita` → `attività
   interattiva`; pt `atividade interativa grátis` → `atividade interativa`; nl `een gratis
   interactieve activiteit` → `een interactieve activiteit`; sv `en gratis interaktiv
   aktivitet` → `en interaktiv aktivitet`; da `en gratis interaktiv aktivitet` → `en
   interaktiv aktivitet`; no same as da; fi `on ilmainen interaktiivinen aktiviteetti` →
   `on interaktiivinen aktiviteetti`.

**`frontend/lib/seo/topic-faq.ts` — required, or the page renders a raw key.**
`fallbackItems` (line 49) hard-codes `[1, 2, 3].map(...)`. With `q3`/`a3` gone, next-intl
would render the literal key path on every activity page. Add a per-variant count next to
the `FaqVariant` type and drive the loop from it:

```ts
const FALLBACK_ITEM_COUNT: Record<FaqVariant, number> = {
  single: 3, intersection: 3, activity: 2, standards: 3,
};
```

then `Array.from({ length: FALLBACK_ITEM_COUNT[variant] }, (_, i) => i + 1).map(...)`.
The JSON-LD follows automatically — it is generated from the same array
(`TopicFaq.tsx:75`), so visible text and structured data stay in agreement.

`scripts/audit-activity-pages.js` only asserts a FAQPage block *exists* (line 100), so a
2-item FAQ keeps that gate green.

## 4. Worksheet-maker CTA buttons — 11 × `frontend/messages/maker-content/<locale>.json`

One shared label per locale (`labels.launchCta`, line 927), consumed by both
`frontend/components/makers/MakerLanding.tsx:76` and
`frontend/app/[locale]/worksheets/[slug]/page.tsx:680` — so **one edit per locale fixes
all 33 maker pages plus the deck-landing maker CTA**.

en `Open the free {name}` → `Open the {name}` · de `{name} kostenlos öffnen` → `{name} öffnen`
· es/pt/it `Abrir/Apri {name} gratis|grátis` → `Abrir/Apri {name}` · fr `Ouvrir {name}
gratuitement` → `Ouvrir {name}` · nl `Open {name} gratis` → `Open {name}` · sv `Öppna {name}
gratis` → `Öppna {name}` · da `Åbn gratis {name}` → `Åbn {name}` · no `Åpne gratis {name}` →
`Åpne {name}` · fi `Avaa ilmainen {name}` → `Avaa {name}`.

**Gate repair (§23.6 — a marker that can never fire is a vacuous check).**
`scripts/audit-maker-pages.js:39` lists `'Open the free'` in `EN_LEAK_MARKERS` (the
English-text-on-a-non-English-page detector). After this change that string exists nowhere
and the check silently stops testing anything. Update it to `'Open the '` and **poison-test
in both directions**: it must FIRE against the rendered EN maker body, and must NOT fire
against any of the 10 non-EN bodies.

---

## Verification

1. `cd frontend && npx tsc --noEmit` (covers `topic-faq.ts`, `manipulatives.ts`, `activities/page.tsx`).
2. Parse-check every edited JSON: `node -e` over the 11 `messages/*.json` + 11 `maker-content/*.json`.
3. Key-parity assert: `topicFaq.fallback.activity` holds exactly `q1,a1,q2,a2` in all 11 —
   no locale left with a stale `q3` (§17.10.3).
4. Grep sweep — 0 price-word hits (`free|gratis|gratuit|kostenlos|grátis|ilmai`) in:
   `LANDING_STRINGS.pageTitle/pageIntro` (activities), the EN tools-hub `pageTitle/pageIntro`,
   `topicFaq.fallback.activity.*`, and `labels.launchCta` across all locale files.
5. Local render (`npm run dev`, remembering the `sitemap.xml/route.ts` rename per §14.5 —
   **rename it back before pushing**): `/en/activities`, `/de/activities`, `/fi/activities`,
   `/en/tools`, one activity detail page (FAQ shows **2** items and the FAQPage JSON-LD
   contains 2 — not a raw `topicFaq.fallback.activity.q3` key), one maker landing per
   en + one non-EN.
6. Commit + push, then `deploy.sh`. These are Next SSR routes only — **no `mini tools/` cp
   step, no deck republish, no `publish-wave`**.
7. Post-deploy: `node scripts/audit-activity-pages.js` (expect `faqJsonLd` still passing) and
   `node scripts/audit-maker-pages.js` with the repaired marker. Allow the 300s edge TTL
   (§15.8 / §21.8-D) before curling.

## Not changed in this pass — flagged, not forgotten

- **`metaTitle` / `metaDescription` on both hubs** still say "Free K-3 Learning Activities"
  and "Free Interactive K-3 Math Manipulatives" — that is the browser tab and the Google
  search result. Operator chose visible-copy-only; say the word and it is a 4-line follow-up.
- **`topicFaq.fallback.standards.a1`** ("gathers the **free** interactive activities and
  worksheets") on `/standards/<code>` — same one-word deletion × 11, different page.
- **`labels.samplesIntroDefault`** on maker pages: "every worksheet is **free** to print".
- **The maker and tool landing-page bodies** — measured ~1,300 price-word occurrences across
  `maker-content/*.json` and ~1,200 across `tool-content/*.json` (titles, meta and prose).
  Not a find-and-replace: some are legitimate "free-play / explore freely" pedagogy and the
  rest need native rewriting per locale. That is its own commission.
