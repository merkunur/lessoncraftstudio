---
name: project_workspace_i18n_english_leak
description: "CLOSED 2026-08-09 — 811 strings authored by native panels across 4 namespaces; two gates now hold the line"
metadata:
  node_type: memory
  type: project
  originSessionId: ed8658b3-33fc-4a8a-bf03-9ea4bf22a2d3
  modified: 2026-08-09T14:50:56.251Z
---

**CLOSED 2026-08-09.** The leak is gone: `workspace` · `collections` · `bulk` · `share` are
0-untranslated across all 10 non-English locales, and **"Workspace" no longer appears as an H1
anywhere** (fr *Mon espace de travail* · sv *Min arbetsyta* · fi *Oma työtila* · no
*Arbeidsområdet mitt* …). **811 strings** authored: 520 leak + 41 review fixes + 237 `bulk`/`share`
+ 13 plan-name/label fixes. Discipline was §A.13.48 — one native three-hat panel per locale to
author, a SECOND independent native panel per locale to audit cold. Method + traps:
[[feedback_native_i18n_two_panel_authoring]]. Superseded most of the "also flagged" list below.

**The two gates (both poison-tested in both directions, both `frontend/scripts/i18n/`):**
- `workspace-leak-report.js` — byte-identity vs `en.json` over the 4 namespaces. Exit 1 on any
  leak. Its `ALLOWLIST` holds 4 entries, each justified BY MEANING (`{name}` is a bare ICU
  placeholder; de *Name*; fr *Collections*). ⚠ **My first allowlist excused 3 REAL leaks** — I
  allowlisted `nameLabel` for nl/sv/da/no on the assumption they say "Name", when they ship
  *Naam/Namn/Navn*. Sort an allowlist entry by what the word MEANS, never by whether it makes
  the run go green.
- `verify-workspace-i18n.js` — renders all 174 keys × 11 locales × counts {0,1,2,7,21} through
  next-intl's own `createTranslator` (9,570 formats). Catches malformed ICU, unresolved keys and
  un-substituted braces, which byte-identity cannot.

**Real defects the panels found that I had not been asked about** (each verified before acting):
- **`bulk.packUpsell` named the plan "Teacher" in 9 of 10 locales** while each file's own
  `pricingPage.tier.name` is native (Lehrkraft/Docente/Insegnante/Professor/Leerkracht/Lärare/
  Lærer/Opettaja). The recorded [[feedback_the_paywall_names_a_plan_that_does_not_exist]] class,
  again. Now 0. Panels also found the prose form is usually a COMPOUND product name
  (sv `Lärarplanen`, da/no `Lærerabonnementet`, de `Lehrkraft-Abo`), not the bare tier noun.
- **`share.label` is a `<button>`** (`ShareDeckButton.tsx:69-74`), and 4 locales had put a NOUN on
  the trigger (`Delningslänk`/`Delelink`/`Jakolinkki`/`Link para compartilhar`). Now imperatives.
- **fr BLOCKER:** `Ajout de {deckTitle}` — `de` elides, so a vowel-initial deck name rendered
  "Ajout de Automne". ICU cannot elide; the three feed lines became postposed participles.
- **pt BLOCKER:** `a {collectionName}` — a user-typed name cannot take crase, so
  "Adicionado a Alfabetização". Fixed by inserting a head noun: "à **coleção** {collectionName}".
- **it/fi card-vs-list contradiction:** `workspace.collections.cardDeckCount` said *deck* beside a
  list saying *scheda*/*tehtäväarkki* (fi's `=1` branch was still the literal English "1 deck").
  Re-cut. Other locales were self-consistent and were NOT churned.
- `hosted.views` / `sharedActivities.views` were not ICU plurals in ANY locale — now plural in all
  11, and *play* got its own noun where the file already had one in the quota wall (de *Runden*,
  es *jugadas*, nl *speelbeurten*, sv *spelomgångar*, fi *pelikerta*).

**STILL OPEN — deliberately not churned, each is an operator ruling, not a translation defect:**
1. **`deck` vs the native worksheet noun, catalog-wide.** 8 locales ship the loanword; it/fi were
   re-cut only because they contradicted themselves. sv/no/fi panels all say no teacher says
   "deck". Needs one ruling, then a sweep — do NOT fix one locale alone.
2. **`bulk.packTooMany` says "worksheets" while `bulk.selectionCount` says "decks" — IN ENGLISH.**
   Every locale inherited it faithfully. Re-nouning a locale would make it diverge from a source
   that is itself unsettled. Same ruling as (1).
3. **The two workspace gates contradict each other.** `gate.signInPromptBody` promises a free
   sign-up unlocks the feature; `gate.subscriberBody` says it needs a subscription. They are
   SEQUENTIAL in `WorkspaceClient.tsx:33,51` — a teacher follows "Join for free" and hits the
   paywall. Verified against tier truth: `PRICING_PUBLIC = true` and `isLcsSubscriptionActive`
   requires an active LS subscription, so **the free-sign-up copy is factually false**. Rewriting
   it encodes a pricing-communication choice, so it is the operator's. Found independently by the
   sv, no and it panels.
4. Register split WITHIN files (de Sie/du, es usted/tú, nl u/je) is pre-existing and file-wide;
   the new strings each took the side their own UI block uses.
5. `workspace.billing.line` drifts from the product plan name in de (*Lehrer-Abo*) and
   nl (*Leraren-abonnement*).
