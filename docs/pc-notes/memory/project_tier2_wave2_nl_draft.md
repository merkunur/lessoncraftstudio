---
name: Tier 2 i18n Track B Wave 2 (nl) — collections + workspace + bulk + share NL draft
description: Native NL authoring of 112 Wave-2 subscriber-feature message keys drafted for operator review before nl.json apply
type: project
originSessionId: de342ceb-c0c5-463a-8cea-62f861933fc9
---
# Tier 2 i18n Track B Wave 2 (nl) — DRAFT v1

**Mirrors:** ES Wave 2 (`78d5d737`) shape exactly: 53 + 28 + 18 + 13 = 112 keys.
**Status:** ⏸ AWAITING OPERATOR REVIEW. No nl.json edit yet.
**Apply:** in follow-up commission prompt after operator approves/revises.

---

## Recon findings (1.x)

### 1.1 + 1.2 + 1.3 — Inventory confirmed

| Namespace | en | de | es (post-`78d5d737`) | nl |
|---|---:|---:|---:|---:|
| collections | 53 | 53 | 53 | **0 (MISSING)** |
| workspace | 28 | 28 | 28 | **0 (MISSING)** |
| bulk | 18 | 18 | 18 | **0 (MISSING)** |
| share | 13 | 13 | 13 | **0 (MISSING)** |
| **Total** | **112** | **112** | **112** | **0** |

NL has identical 0/112 gap as forecast at 78d5d737 close. en.json structure unchanged from 78d5d737 baseline (no Wave 3 commits in interval; no shift). DE + ES Wave 2 both available as register/lexical anchors.

### 1.4 — Component upstream-gap audit ✓ unchanged from 78d5d737

19 `t()`-call lines across 15 distinct component .tsx files (same as 78d5d737 — minor count difference reflects multiple t() calls per component, e.g., AddToCollectionButton has 2, BulkAddToCollectionPicker has 2, CollectionDetailClient has 2, CollectionsWidget has 2). All 19 namespace paths resolve cleanly in en.json (verified at 78d5d737 + spot-check unchanged here). No new components shipped between `78d5d737` and now.

### 1.5 — Favorites residue ✓ clean

`favorites.*` namespace still absent across en/de/es/nl. Zero component references. Tool 2B not yet shipped per session-state row 583. Safe to omit from Wave 2 NL draft.

---

## Register decisions

### Wave 1 NL carry-forward (locked)

- **Address-form:** formal `u` throughout (locked from `e5679d69`).
- **Variety:** Standard Dutch (Netherlands) primary register. Not Flemish-specific.
- **Worksheet noun:** `werkblad` / `werkbladen`.
- **Workspace noun:** `werkruimte` (locked Wave 1; matches DE Arbeitsbereich + ES espacio de trabajo semantic weight).
- **Subscription:** `abonnement` / `abonneren`.
- **Lesson plans:** `lesplannen` / `lesplan`.
- **Themed bundles:** `themapakketten` (A4 lock).

### Wave 2 NL new lexical locks (defaults; no adjudication)

- **Collection** → **`verzameling`** / plural **`verzamelingen`** — canonical native NL; mirrors DE Sammlung; preferred over loanword "collectie" per native-NL discipline.
- **Deck** → **`deck`** / plural **`decks`** — loanword retained; matches DE+ES Wave 2 lock.
- **Saved / save** → **`opslaan`** (verb) / **`opgeslagen`** (past participle, no gender shift since `het deck` is neuter; both `opgeslagen deck` and `opgeslagen decks` work).
- **Share** → **`delen`** (verb) / `gedeeld` (past participle).
- **Add (to collection)** → **`Toevoegen`** — canonical NL UI verb; mirrors DE hinzufügen + ES Añadir.
- **Recent activity** → **`Recente activiteit`**.
- **Loading…** → **`Laden…`** (concise; NL UI standard).
- **Cancel** → **`Annuleren`**.
- **Saving…** → **`Opslaan…`**.
- **Generating link…** → **`Link wordt aangemaakt…`**.
- **Copy / Copied!** → **`Kopiëren`** / **`Gekopieerd!`** / **`Alles kopiëren`** / **`Alles gekopieerd!`**.
- **Close** → **`Sluiten`**.
- **Rename** → **`Hernoemen`**.
- **Bulk selection / bulk actions** → **`meervoudige selectie`** / **`Acties voor meervoudige selectie`** — direct DE Mehrfachauswahl mirror; native NL register; avoids "bulk" loanword.
- **Empty-state register:** neutral-functional (mirror Wave 1 NL + DE + ES Wave 2 lock).
- **Pricing in subscription gates:** `$69 per jaar` (mirror Wave 1 `subscription.price`).
- **"By class / by unit / by week"** → `per klas, per eenheid, per week`.
- **"Spring vocabulary" placeholder** → `bijvoorbeeld, Lentewoordenschat`.

### Past-participle gender note

Unlike ES (where `colección` is feminine and `deck` masculine, requiring agreement), NL doesn't gender-mark past participles attributively. So "added/-s" past participles work in single form across deck (neuter) and verzameling (de-word feminine/common). No gender-agreement complexity in plural rules.

---

## Adjudications surfaced (3 total — operator pick / revise)

### A1. Share-link label lexical

**en source:** `share.label` = "Share link"
**de Tool 1A:** "Link teilen" (verb-first imperative)
**es Wave 2:** "Compartir enlace" (verb-first imperative)

**NL options:**
- **(a) recommended default:** "**Link delen**" — verb-first imperative; mirrors DE+ES verb-first convergence; reads natural in NL UI.
- (b) "Deel-link" — compound noun (imperative-noun); shorter but reads slightly awkward as button label.
- (c) "Link voor delen" — phrase form ("link for sharing"); explicit but verbose.

Used at: `share.label`. Other share-related microcopy (e.g., `share.singleDeckTitle` = "Dit deck delen") stay verb-first natural regardless.

---

### A2. "Remove from collection" lexical (semantic-distinct from "Delete")

**en source distinction:**
- `collections.detail.deleteCta` = "Delete collection" — collection-level, irreversible
- `collections.detail.removeDeck` = "Remove" (from collection) — keeps deck in catalog
- `bulk.action.removeFromCollection` = "Remove" — bulk variant

**de:** Distinguishes via "Löschen" (delete) vs "Entfernen" (remove)
**es:** Distinguishes via "Eliminar" (delete) vs "Quitar" (remove)

**NL options for the "Remove from collection" verb (A2 affects `removeDeck`, `bulk.action.removeFromCollection`):**
- **(a) recommended default:** "**Verwijderen**" — concise; Dutch UI convention; context disambiguates ("Verwijderen" on a deck card in a collection ≠ "Verwijderen" on a "Delete this collection?" modal). Mirrors common Dutch productivity UI (Notion-NL, Trello-NL all use "Verwijderen" overloaded).
- (b) "Uit verzameling verwijderen" — explicit; mirrors the en+de+es semantic split visually; verbose for compact card-button placements.
- (c) "Weghalen" — preserves single-word semantic split with "Verwijderen=delete"; reads slightly informal/conversational; less common in Dutch productivity UI.

The `delete*` keys (`deleteCta`, `deleteConfirmTitle`, `deleteConfirmCta`) all stay "**Verwijderen**" / variants regardless of A2 pick.

---

### A3. Sign-in verb

**en source:** `gate.signInCta` = "Sign in"
**de:** "Anmelden" (etymologically "register" but standard DE UI for "sign in")
**es:** "Iniciar sesión" (literal "start session")

**NL options:**
- **(a) recommended default:** "**Inloggen**" — modern NL product-UI standard; unambiguously "log in / sign in"; most common in current Dutch productivity tools.
- (b) "Aanmelden" — older Dutch convention; etymologically can mean "register" OR "sign in" depending on context; some platforms use this for sign-in (mirroring DE Anmelden).

The `signInPromptTitle/Body` framing copy stays consistent with whichever verb wins ("Inloggen om uw verzamelingen te bekijken" vs "Aanmelden om uw verzamelingen te bekijken").

---

## Full NL draft (112 keys)

### namespace: `collections` (53 keys)

```jsonc
{
  "meta": {
    "title": "Uw verzamelingen | LessonCraftStudio",
    "description": "Bewaar en organiseer decks in verzamelingen — per klas, per eenheid, per week."
  },
  "list": {
    "title": "Uw verzamelingen",
    "loading": "Laden…",
    "newCollection": "+ Nieuwe verzameling",
    "emptyStateTitle": "Nog geen verzamelingen",
    "emptyStateBody": "Bewaar en organiseer decks in verzamelingen — per klas, per eenheid, per week. Klik op + Nieuwe verzameling om te beginnen.",
    "deckCount": "{count, plural, =0 {Geen decks} =1 {1 deck} other {# decks}}",
    "errorGeneric": "Er is iets misgegaan. Probeer het opnieuw."
  },
  "create": {
    "title": "Nieuwe verzameling",
    "nameLabel": "Naam",
    "namePlaceholder": "bijvoorbeeld, Lentewoordenschat",
    "descriptionLabel": "Beschrijving (optioneel)",
    "submit": "Aanmaken",
    "cancel": "Annuleren",
    "submitting": "Bezig met aanmaken…",
    "errorRequired": "Voer een naam in.",
    "errorGeneric": "De verzameling kon niet worden aangemaakt. Probeer het opnieuw."
  },
  "detail": {
    "metaTitle": "{name} | LessonCraftStudio",
    "back": "← Alle verzamelingen",
    "renameCta": "Hernoemen",
    "renameTitle": "Verzameling hernoemen",
    "renameSubmit": "Opslaan",
    "renameCancel": "Annuleren",
    "renameSubmitting": "Opslaan…",
    "deleteCta": "Verzameling verwijderen",
    "deleteConfirmTitle": "Deze verzameling verwijderen?",
    "deleteConfirmBody": "De decks blijven in de catalogus staan.",
    "deleteConfirmCta": "Verwijderen",
    "deleteCancel": "Annuleren",
    "deleteSubmitting": "Verwijderen…",
    "removeDeck": "Verwijderen",
    "removeDeckConfirm": "Dit deck uit de verzameling verwijderen?",
    "playOnline": "Online spelen",
    "pdf": "PDF afdrukken",
    "emptyTitle": "Nog geen decks in deze verzameling",
    "emptyBody": "Doorblader de catalogus en klik op \"Toevoegen aan verzameling\" op een deck-kaart.",
    "errorGeneric": "Er is iets misgegaan. Probeer het opnieuw."
  },
  "gate": {
    "subscribePromptTitle": "Verzamelingen maken deel uit van het abonnement",
    "subscribePromptBody": "Decks bewaren en organiseren in verzamelingen is een van de werkruimte-tools die het abonnement van $69 per jaar ontgrendelt. Gratis gebruikers kunnen elk deck bekijken, afdrukken, insluiten en delen — zonder account.",
    "subscribeCta": "Naar abonnement",
    "signInPromptTitle": "Log in om uw verzamelingen te bekijken",
    "signInPromptBody": "Uw verzamelingen zijn aan uw account gekoppeld. Log in om ze te bekijken.",
    "signInCta": "Inloggen"
  },
  "addAffordance": {
    "label": "Toevoegen aan verzameling",
    "pickerTitle": "Toevoegen aan een verzameling",
    "pickerLoading": "Verzamelingen laden…",
    "pickerEmpty": "U heeft nog geen verzamelingen. Maak er eerst een aan.",
    "pickerCreate": "+ Nieuwe verzameling",
    "pickerCancel": "Annuleren",
    "added": "Toegevoegd aan {collectionName}",
    "alreadyIn": "Zit al in deze verzameling",
    "errorGeneric": "Toevoegen mislukt. Probeer het opnieuw."
  }
}
```

### namespace: `workspace` (28 keys)

```jsonc
{
  "metadata": {
    "title": "Uw werkruimte | LessonCraftStudio",
    "description": "Uw abonnee-werkruimte — verzamelingen, recente activiteit en de tools om uw lesgeven georganiseerd te houden."
  },
  "header": {
    "title": "Werkruimte",
    "welcomeLine": "Uw verzamelingen en recente activiteit, alles op één plek."
  },
  "gate": {
    "subscribePromptTitle": "De werkruimte maakt deel uit van het abonnement",
    "subscribePromptBody": "Uw werkruimte — verzamelingen, recente activiteit en opgeslagen decks — is een van de tools die het abonnement van $69 per jaar ontgrendelt.",
    "subscribeCta": "Naar abonnement",
    "signInPromptTitle": "Log in om uw werkruimte te openen",
    "signInPromptBody": "Uw werkruimte hoort bij uw account. Log in om hem te bekijken.",
    "signInCta": "Inloggen"
  },
  "loading": "Laden…",
  "errorGeneric": "Er is iets misgegaan. Probeer het opnieuw.",
  "collections": {
    "heading": "Uw verzamelingen",
    "viewAll": "Alle bekijken ({count})",
    "cardDeckCount": "{count, plural, =0 {Geen decks} =1 {1 deck} other {# decks}}",
    "empty": {
      "title": "Nog geen verzamelingen",
      "body": "Bewaar en organiseer decks in verzamelingen — per klas, per eenheid, per week."
    }
  },
  "recentActivity": {
    "heading": "Recente activiteit",
    "empty": {
      "title": "Hier staat nog niets",
      "body": "Activiteit verschijnt hier zodra u decks verzamelt, organiseert en deelt."
    },
    "activityType": {
      "collected": "{deckTitle} toegevoegd aan {collectionName}",
      "modified": "{collectionName} bijgewerkt",
      "shared": "{deckTitle} gedeeld"
    },
    "relativeTime": {
      "justNow": "zojuist",
      "minutesAgo": "{count, plural, =1 {1 minuut geleden} other {# minuten geleden}}",
      "hoursAgo": "{count, plural, =1 {1 uur geleden} other {# uur geleden}}",
      "daysAgo": "{count, plural, =1 {1 dag geleden} other {# dagen geleden}}",
      "weeksAgo": "{count, plural, =1 {1 week geleden} other {# weken geleden}}"
    }
  }
}
```

### namespace: `bulk` (18 keys)

```jsonc
{
  "toggleSelect": "Selecteren",
  "toggleDone": "Klaar",
  "toolbarAria": "Acties voor meervoudige selectie",
  "selectionCount": "{count, plural, =1 {1 deck geselecteerd} other {# decks geselecteerd}}",
  "checkboxAria": "{title} selecteren",
  "action": {
    "addToCollection": "Toevoegen aan verzameling",
    "removeFromCollection": "Verwijderen",
    "shareLinks": "Links delen",
    "cancel": "Annuleren"
  },
  "addedConfirmation": "{count, plural, =1 {1 deck toegevoegd aan {collectionName}} other {# decks toegevoegd aan {collectionName}}}",
  "removedConfirmation": "{count, plural, =1 {1 deck verwijderd} other {# decks verwijderd}}",
  "errorGeneric": "Er is iets misgegaan. Probeer het opnieuw.",
  "addToCollectionPicker": {
    "pickerTitle": "{count, plural, =1 {1 deck aan een verzameling toevoegen} other {# decks aan een verzameling toevoegen}}",
    "pickerLoading": "Verzamelingen laden…",
    "pickerEmpty": "U heeft nog geen verzamelingen. Maak er eerst een aan.",
    "pickerCreate": "+ Nieuwe verzameling",
    "pickerCancel": "Annuleren",
    "errorGeneric": "Verzamelingen konden niet worden geladen. Probeer het opnieuw."
  }
}
```

### namespace: `share` (13 keys)

```jsonc
{
  "label": "Link delen",
  "singleDeckTitle": "Dit deck delen",
  "singleDeckBody": "Iedereen met deze link kan het deck spelen. De link verloopt niet.",
  "generating": "Link wordt aangemaakt…",
  "copy": "Kopiëren",
  "copied": "Gekopieerd!",
  "copyAll": "Alles kopiëren",
  "copiedAll": "Alles gekopieerd!",
  "close": "Sluiten",
  "errorGeneric": "De link kon niet worden aangemaakt. Probeer het opnieuw.",
  "errorClipboard": "Geen toegang tot het klembord. Selecteer de link en kopieer hem handmatig.",
  "bulkResultsTitle": "{count, plural, =1 {1 deel-link} other {# deel-links}}",
  "bulkResultsSkipped": "{count, plural, =1 {1 deck is overgeslagen (niet gepubliceerd)} other {# decks zijn overgeslagen (niet gepubliceerd)}}"
}
```

---

## ICU plural verification

All `=0/=1/other` and `=1/other` rules preserved per en+de+es shape. Dutch CLDR plural categories `one + other` map cleanly. No rule shape changes.

Specific plural keys:
- `collections.list.deckCount`: `=0 {Geen decks} =1 {1 deck} other {# decks}`
- `workspace.collections.cardDeckCount`: same shape
- `workspace.recentActivity.relativeTime.{minutesAgo,hoursAgo,daysAgo,weeksAgo}`: `=1 {1 X geleden} other {# Xs geleden}` — note "uur" stays same in plural (Dutch convention for time-units in countdown context).
- `bulk.selectionCount`: `=1 {1 deck geselecteerd} other {# decks geselecteerd}` (no gender shift; deck is `het` neuter)
- `bulk.checkboxAria`: simple interpolation, no plural
- `bulk.addedConfirmation`: nested interpolation `{collectionName}`; no gender shift on past participle ("toegevoegd")
- `bulk.removedConfirmation`: no gender shift on "verwijderd"
- `bulk.addToCollectionPicker.pickerTitle`: simple plural
- `share.bulkResultsTitle`: `1 deel-link` / `# deel-links`
- `share.bulkResultsSkipped`: no gender shift on "overgeslagen"; verb form shifts `is` (singular) → `zijn` (plural) per Dutch grammar

---

## Carryover deferrals (out of Wave 2 NL scope)

- `favorites.*` — Tool 2B engineering closeout pending; not in en/de/es; excluded from Wave 2 draft.
- `footer.tagline` + extended copyright — still deferred from Wave 1 (cross-locale add filed).
- `support.*` / `billing.*` / `auth.*` extension keys — Wave 3 scope.
- FOOTER_LANGUAGES nl entry — still pre-staged-absent until first nl deck publishes (NL Track C Batch 1).

---

## Apply checklist (for follow-up commission)

Do NOT execute now. For the apply commission:

1. INSERT 4 new top-level namespaces into nl.json: `collections` (53), `workspace` (28), `bulk` (18), `share` (13)
2. Verify keys against en.json by structural diff (every en path has nl entry; no extras)
3. Verify no `\uXXXX` escapes (write real characters per MEMORY.md File Encoding rule)
4. Verify ICU plural rules match en/de/es shape
5. Verify no informal `je`/`jij`/`jouw`/`jullie`/`jij` in any new key — formal `u` throughout
6. Run `node scripts/find-broken-quotes.js` per MEMORY.md
7. Single commit on `pivot/printable-business-toolkit`
8. Commit message: `Tier 2 i18n Track B Wave 2 (nl) — collections + workspace + bulk + share nl message keys`
9. Plain `git push`; deploy
10. Production verify: build verify expects 0 MISSING_MESSAGE on nl Wave-2 namespaces (regression from prior 6 → 0); /nl/workspace/ + /nl/collections/ render with subscriber-feature NL chrome (auth-gated; Path-A authenticated curl OR Path-B unauthenticated route render of gate/sign-in chrome — mirror ES Wave 2 verification approach)

---

## Halt-and-surface to operator

**Artifact path:** `C:\Users\rkgen\.claude\projects\C--Users-rkgen-lessoncraftstudio\memory\project_tier2_wave2_nl_draft.md`

**Adjudications (3):**
- A1: Share-link label → default "Link delen" | alts "Deel-link" / "Link voor delen"
- A2: "Remove from collection" verb → default "Verwijderen" (concise, context-disambiguated) | alts "Uit verzameling verwijderen" (explicit) / "Weghalen" (informal)
- A3: Sign-in verb → default "Inloggen" (modern NL UI standard) | alt "Aanmelden" (older Dutch UI convention)

**Recon findings:**
- 1.1: en.json structurally unchanged from 78d5d737 baseline (53+28+18+13 = 112)
- 1.2: nl 0/0/0/0 — full 100% gap as forecast at 78d5d737 (no partial pre-existing keys)
- 1.3: DE + ES Wave 2 both at 112/112 — dual register/lexical anchors available
- 1.4: 19 t()-call lines across 15 components (same as 78d5d737 — no new components since); all paths resolve in en.json
- 1.5: favorites residue clean across en/de/es/nl + 0 component refs

**Operator response options:**
- "Approve" → next prompt commissions apply (NL Wave 1 + ES Wave 2 precedent: I'll execute apply directly)
- "Approve with: A1=alt-b, A2=alt-b, A3=alt, …" → CC applies revised choices directly (no v2 re-halt; mechanical key-value rewrite)
- "Revise: <substantive>" → CC produces v2 draft, re-halts
- "Pause" → hold v1 artifact
