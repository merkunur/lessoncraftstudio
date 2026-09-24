---
name: Tier 2 i18n Track B Wave 2 (es) — collections + workspace + bulk + share ES draft
description: Native ES authoring of 112 Wave-2 subscriber-feature message keys drafted for operator review before es.json apply
type: project
originSessionId: de342ceb-c0c5-463a-8cea-62f861933fc9
---
# Tier 2 i18n Track B Wave 2 (es) — DRAFT v1

**Mirrors:** Wave 1 ES (`4e61c24d`) discipline + Tool 1A/2A/5A en+de production schema.
**Status:** ⏸ AWAITING OPERATOR REVIEW. No es.json edit yet.
**Apply:** in follow-up commission prompt after operator approves/revises.

---

## Recon findings (1.x)

### 1.1 + 1.2 — Major brief premise drift surfaced

The brief said "build verify reported only 6 nl + 6 es residual MISSING_MESSAGE on the 4 namespaces — but residual count counts unique-key warnings; the underlying inventory may be larger". Recon confirms: **all 4 namespaces are entirely absent from es.json** (and from nl.json) — not partially present.

| Namespace | en | de | es | nl |
|---|---:|---:|---:|---:|
| collections | 53 | 53 | **0 (MISSING)** | **0 (MISSING)** |
| workspace | 28 | 28 | **0 (MISSING)** | **0 (MISSING)** |
| bulk | 18 | 18 | **0 (MISSING)** | **0 (MISSING)** |
| share | 13 | 13 | **0 (MISSING)** | **0 (MISSING)** |
| **Total** | **112** | **112** | **0** | **0** |

**Total keys to author for ES Wave 2: 112** (not the "~120 estimate").

**Why the 6 MISSING_MESSAGE × 2 occurrence count surfaced as residual at e5679d69 build verify:** prerendering only exercises the 6 keys that appear during static-page generation (e.g., `collections.meta.title`, `workspace.metadata.title`, namespace-level lookups by next-intl). The remaining 106 keys are consumed only at runtime when authenticated subscribers visit `/es/workspace/` or `/es/collections/` routes — prerendering doesn't traverse those guarded routes. The 6 warnings were the visible tip of a 100% gap.

### 1.3 — DE substrate confirmed solid

DE has all 112 keys at full coverage from Tool 1A/2A/5A en+de Tier 1 launches (commits `53519e0c` + `256c6241` + `a2829d88`). Using DE as register-anchor for ES authoring per Wave 1 reconciliation discipline.

### 1.4 — Component upstream-gap audit ✓ PASS

| Component | Namespace | Subkey path | en.json resolution |
|---|---|---|---|
| BulkSelectModeToggle | bulk | (root) | ✓ |
| BulkAddToCollectionPicker | bulk.addToCollectionPicker + collections.create | both | ✓ |
| BulkSelectToolbar | bulk | (root) | ✓ |
| DeckGridClient (topic page) | bulk | (root) | ✓ |
| ShareLinkResultModal | share | (root) | ✓ |
| ShareDeckButton | share | (root) | ✓ |
| AddToCollectionButton | collections.addAffordance + collections.create | both | ✓ |
| CollectionsWidget (workspace) | workspace.collections + collections.create | both | ✓ |
| WorkspaceClient | workspace | (root) | ✓ |
| RecentActivityWidget | workspace.recentActivity | sub | ✓ |
| workspace/page.tsx (metadata) | workspace.metadata | sub | ✓ |
| collections/page.tsx (metadata) | collections.meta | sub | ✓ |
| collections/[id]/page.tsx (metadata) | collections.meta | sub | ✓ |
| CollectionDetailClient | collections + bulk | both | ✓ |
| CollectionsListClient | collections | (root) | ✓ |

All component-side `useTranslations()`/`getTranslations()` consumers resolve cleanly in en.json. No upstream gaps.

### Favorites residue check ✓ CLEAN

Per brief discipline: `favorites.*` is excluded from Wave 2 (Tool 2B not shipped per session-state row 95). Recon: `favorites` namespace does NOT exist in en.json or de.json; no component references found. No collateral residue to handle. Confirmed safe to omit from Wave 2 draft.

---

## Register decisions (locked defaults; no adjudication needed)

- **Address-form:** formal `usted` throughout (mirror Wave 1 lock from `4e61c24d`).
- **Variety:** Standard Castilian (Peninsular). Mirror Wave 1.
- **Subscription terms:** "suscripción" / "suscribirse" (locked from Wave 1).
- **Sign-in/auth:** "Iniciar sesión" (canonical Castilian for "Sign in"; matches existing `es.json auth.*` conventions where applicable).
- **Recent activity:** "Actividad reciente".
- **Spring vocabulary placeholder:** "por ejemplo, Vocabulario de primavera".
- **By class / by unit / by week:** "por clase, por unidad, por semana".
- **Empty-state register:** neutral-functional (Wave 1 + DE precedent both); not cheerful-encouraging.
- **Pillar terms:**
  - "collection" → **"colección"** / plural **"colecciones"**
  - "deck" → **"deck"** (loanword retained per Wave 1 + DE precedent of retaining "Deck")
  - "save / saved" → **"guardar"** / **"guardado/-a"** (gender per referent: "deck guardado", "colección guardada")
  - "share / shared" → **"compartir"** / **"compartido"**
  - "play online" → **"Jugar en línea"** (matches Wave 1 ES topicPage `deckCard.playLink`)
  - "print PDF" → **"Imprimir PDF"** (matches Wave 1 ES `deckCard.pdfLink`)
- **Pricing in subscription gates:** "$69 al año" (mirror Wave 1 `subscription.price`).

---

## Adjudications surfaced (3 total — operator pick / revise)

### A1. "Workspace" lexical

**en source:** "Workspace" (UI noun + the namespace name)
**de Tool 1A/5A:** "Arbeitsbereich" (compound; formal; established in `workspace.header.title` and several gate prompts)

**ES options:**
- **(a) recommended default:** "**espacio de trabajo**" — standard Spanish productivity-tool register (Slack, Notion, Trello use this); transparent ownership/space semantics; mirrors DE register weight.
- (b) "panel" — shorter, dashboard-register; loses the personal-space ownership connotation that workspace UI conveys.
- (c) "área de trabajo" — close to (a); "área" reads slightly more "section" than "owned space".

Used at: `workspace.metadata.title`, `workspace.header.title`, `workspace.gate.subscribePromptTitle/Body`, `workspace.gate.signInPromptTitle/Body`, `workspace.metadata.description`.

---

### A2. "Bulk selection / bulk actions" lexical

**en source patterns:** namespace `bulk`; UI label `bulk.toolbarAria` = "Bulk selection actions"; `bulk.toggleSelect` = "Select"
**de Tool 1A:** "Mehrfachauswahl" (multi-selection; lexically transparent and natural in DE productivity tools)

**ES options for `toolbarAria`:**
- **(a) recommended default:** "**Acciones de selección múltiple**" — direct DE-mirror; standard Castilian productivity-tool register.
- (b) "Acciones masivas" — closer to "bulk" calque; reads less natural in Spanish UI.

Note: action-button labels (`bulk.toggleSelect` = "Seleccionar"; `bulk.action.addToCollection` = "Añadir a la colección") aren't affected by this adjudication — they're already short, action-clear verbs. A2 is specifically about how to label the selection-mode toolbar/aria text.

---

### A3. Action-verb register — Castilian "Añadir" vs Latin "Agregar"

**en source:** "Add to collection" (used in `collections.addAffordance.label`, `bulk.action.addToCollection`, etc.)
**de:** "Zur Sammlung hinzufügen"

**ES options:**
- **(a) recommended default:** "**Añadir a la colección**" — Standard Castilian (Peninsular); matches Wave 1 lock to Castilian register; consistent across the platform.
- (b) "Agregar a la colección" — Latin American Spanish; both verbs are valid and widely understood across regions. This pick would shift the ES register away from the Castilian default established in Wave 1.

Recommendation: stick with Castilian (a) for consistency with Wave 1. Surface here only because Wave 1 had no high-frequency action verbs to lock the pattern, and Wave 2 is action-verb-heavy.

---

## Full ES draft (112 keys)

### namespace: `collections` (53 keys)

```jsonc
{
  "meta": {
    "title": "Sus colecciones | LessonCraftStudio",
    "description": "Guarde y organice los decks en colecciones — por clase, por unidad, por semana."
  },
  "list": {
    "title": "Sus colecciones",
    "loading": "Cargando…",
    "newCollection": "+ Nueva colección",
    "emptyStateTitle": "Aún no hay colecciones",
    "emptyStateBody": "Guarde y organice los decks en colecciones — por clase, por unidad, por semana. Pulse + Nueva colección para empezar.",
    "deckCount": "{count, plural, =0 {Sin decks} =1 {1 deck} other {# decks}}",
    "errorGeneric": "Algo salió mal. Por favor, inténtelo de nuevo."
  },
  "create": {
    "title": "Nueva colección",
    "nameLabel": "Nombre",
    "namePlaceholder": "por ejemplo, Vocabulario de primavera",
    "descriptionLabel": "Descripción (opcional)",
    "submit": "Crear",
    "cancel": "Cancelar",
    "submitting": "Creando…",
    "errorRequired": "Por favor, introduzca un nombre.",
    "errorGeneric": "No se pudo crear la colección. Por favor, inténtelo de nuevo."
  },
  "detail": {
    "metaTitle": "{name} | LessonCraftStudio",
    "back": "← Todas las colecciones",
    "renameCta": "Renombrar",
    "renameTitle": "Renombrar colección",
    "renameSubmit": "Guardar",
    "renameCancel": "Cancelar",
    "renameSubmitting": "Guardando…",
    "deleteCta": "Eliminar colección",
    "deleteConfirmTitle": "¿Eliminar esta colección?",
    "deleteConfirmBody": "Los decks no se eliminarán del catálogo.",
    "deleteConfirmCta": "Eliminar",
    "deleteCancel": "Cancelar",
    "deleteSubmitting": "Eliminando…",
    "removeDeck": "Quitar",
    "removeDeckConfirm": "¿Quitar este deck de la colección?",
    "playOnline": "Jugar en línea",
    "pdf": "Imprimir PDF",
    "emptyTitle": "Aún no hay decks en esta colección",
    "emptyBody": "Explore el catálogo y pulse \"Añadir a la colección\" en cualquier tarjeta de deck.",
    "errorGeneric": "Algo salió mal. Por favor, inténtelo de nuevo."
  },
  "gate": {
    "subscribePromptTitle": "Las colecciones forman parte de la suscripción",
    "subscribePromptBody": "Guardar y organizar los decks en colecciones es una de las herramientas del espacio de trabajo que la suscripción de $69 al año desbloquea. Los usuarios gratuitos pueden explorar, imprimir, insertar y compartir cada deck — sin cuenta.",
    "subscribeCta": "Ir a la suscripción",
    "signInPromptTitle": "Inicie sesión para acceder a sus colecciones",
    "signInPromptBody": "Sus colecciones están vinculadas a su cuenta. Inicie sesión para verlas.",
    "signInCta": "Iniciar sesión"
  },
  "addAffordance": {
    "label": "Añadir a la colección",
    "pickerTitle": "Añadir a una colección",
    "pickerLoading": "Cargando colecciones…",
    "pickerEmpty": "Aún no tiene colecciones. Cree una primero.",
    "pickerCreate": "+ Nueva colección",
    "pickerCancel": "Cancelar",
    "added": "Añadido a {collectionName}",
    "alreadyIn": "Ya está en esta colección",
    "errorGeneric": "No se pudo añadir. Por favor, inténtelo de nuevo."
  }
}
```

### namespace: `workspace` (28 keys)

```jsonc
{
  "metadata": {
    "title": "Su espacio de trabajo | LessonCraftStudio",
    "description": "Su espacio de trabajo de suscriptor — colecciones, actividad reciente y las herramientas para mantener su enseñanza organizada."
  },
  "header": {
    "title": "Espacio de trabajo",
    "welcomeLine": "Sus colecciones y su actividad reciente, todo en un solo lugar."
  },
  "gate": {
    "subscribePromptTitle": "El espacio de trabajo forma parte de la suscripción",
    "subscribePromptBody": "Su espacio de trabajo — colecciones, actividad reciente y decks guardados — es una de las herramientas que la suscripción de $69 al año desbloquea.",
    "subscribeCta": "Ir a la suscripción",
    "signInPromptTitle": "Inicie sesión para acceder a su espacio de trabajo",
    "signInPromptBody": "Su espacio de trabajo está vinculado a su cuenta. Inicie sesión para verlo.",
    "signInCta": "Iniciar sesión"
  },
  "loading": "Cargando…",
  "errorGeneric": "Algo salió mal. Por favor, inténtelo de nuevo.",
  "collections": {
    "heading": "Sus colecciones",
    "viewAll": "Ver todas ({count})",
    "cardDeckCount": "{count, plural, =0 {Sin decks} =1 {1 deck} other {# decks}}",
    "empty": {
      "title": "Aún no hay colecciones",
      "body": "Guarde y organice los decks en colecciones — por clase, por unidad, por semana."
    }
  },
  "recentActivity": {
    "heading": "Actividad reciente",
    "empty": {
      "title": "Todavía no hay nada aquí",
      "body": "La actividad aparecerá aquí a medida que recopile, organice y comparta decks."
    },
    "activityType": {
      "collected": "{deckTitle} añadido a {collectionName}",
      "modified": "{collectionName} actualizada",
      "shared": "{deckTitle} compartido"
    },
    "relativeTime": {
      "justNow": "ahora mismo",
      "minutesAgo": "{count, plural, =1 {hace 1 minuto} other {hace # minutos}}",
      "hoursAgo": "{count, plural, =1 {hace 1 hora} other {hace # horas}}",
      "daysAgo": "{count, plural, =1 {hace 1 día} other {hace # días}}",
      "weeksAgo": "{count, plural, =1 {hace 1 semana} other {hace # semanas}}"
    }
  }
}
```

### namespace: `bulk` (18 keys)

```jsonc
{
  "toggleSelect": "Seleccionar",
  "toggleDone": "Listo",
  "toolbarAria": "Acciones de selección múltiple",
  "selectionCount": "{count, plural, =1 {1 deck seleccionado} other {# decks seleccionados}}",
  "checkboxAria": "Seleccionar {title}",
  "action": {
    "addToCollection": "Añadir a la colección",
    "removeFromCollection": "Quitar",
    "shareLinks": "Compartir enlaces",
    "cancel": "Cancelar"
  },
  "addedConfirmation": "{count, plural, =1 {1 deck añadido a {collectionName}} other {# decks añadidos a {collectionName}}}",
  "removedConfirmation": "{count, plural, =1 {1 deck quitado} other {# decks quitados}}",
  "errorGeneric": "Algo salió mal. Por favor, inténtelo de nuevo.",
  "addToCollectionPicker": {
    "pickerTitle": "{count, plural, =1 {Añadir 1 deck a una colección} other {Añadir # decks a una colección}}",
    "pickerLoading": "Cargando colecciones…",
    "pickerEmpty": "Aún no tiene colecciones. Cree una primero.",
    "pickerCreate": "+ Nueva colección",
    "pickerCancel": "Cancelar",
    "errorGeneric": "No se pudieron cargar las colecciones. Por favor, inténtelo de nuevo."
  }
}
```

### namespace: `share` (13 keys)

```jsonc
{
  "label": "Compartir enlace",
  "singleDeckTitle": "Compartir este deck",
  "singleDeckBody": "Cualquier persona con este enlace puede jugar el deck. El enlace no caduca.",
  "generating": "Generando enlace…",
  "copy": "Copiar",
  "copied": "¡Copiado!",
  "copyAll": "Copiar todo",
  "copiedAll": "¡Todo copiado!",
  "close": "Cerrar",
  "errorGeneric": "No se pudo generar el enlace. Por favor, inténtelo de nuevo.",
  "errorClipboard": "No se pudo acceder al portapapeles. Seleccione el enlace y cópielo manualmente.",
  "bulkResultsTitle": "{count, plural, =1 {1 enlace para compartir} other {# enlaces para compartir}}",
  "bulkResultsSkipped": "{count, plural, =1 {1 deck fue omitido (no publicado)} other {# decks fueron omitidos (no publicados)}}"
}
```

---

## ICU plural verification

All `{count, plural, =0 {…} =1 {…} other {…}}` and `{count, plural, =1 {…} other {…}}` rules preserved per en+de shape. Spanish CLDR plural categories `one + other` map cleanly. No rule shape changes.

Specific plural keys:
- `collections.list.deckCount`: `=0 {Sin decks} =1 {1 deck} other {# decks}`
- `workspace.collections.cardDeckCount`: same shape
- `workspace.recentActivity.relativeTime.{minutesAgo,hoursAgo,daysAgo,weeksAgo}`: `=1 {hace 1 X} other {hace # Y}` (Spanish "hace" = "ago"; verb-first phrasing matches DE "vor 1 Minute")
- `bulk.selectionCount`: `=1 {1 deck seleccionado} other {# decks seleccionados}` (gender-agreement on "seleccionado": deck is masculine loanword; plural takes plural-`s`)
- `bulk.checkboxAria`: simple interpolation, no plural
- `bulk.addedConfirmation`: nested interpolation `{collectionName}` inside plural branches; gender-agreement on "añadido/-s" (deck masculine)
- `bulk.removedConfirmation`: gender-agreement on "quitado/-s"
- `bulk.addToCollectionPicker.pickerTitle`: simple plural
- `share.bulkResultsTitle`: `1 enlace para compartir` / `# enlaces para compartir`
- `share.bulkResultsSkipped`: gender-agreement on "omitido/-s" + parenthetical "no publicado/-s"

---

## Carryover deferrals (out of Wave 2 scope)

- `favorites.*` — Tool 2B engineering closeout pending; not in en/de yet; excluded from Wave 2 draft.
- `footer.tagline` + extended copyright — still deferred from Wave 1 (cross-locale add filed).
- `support.*` / `billing.*` / `auth.*` extension keys — Wave 3 scope.

---

## Apply checklist (for follow-up commission)

Do NOT execute now. For the apply commission:

1. Insert 4 new top-level namespaces into es.json: `collections` (53), `workspace` (28), `bulk` (18), `share` (13)
2. Verify keys against en.json by structural diff (every en path has es entry; no extras)
3. Verify no `\uXXXX` escapes (write real characters per MEMORY.md File Encoding rule)
4. Verify ICU plural rules match en/de shape
5. Verify no informal address-form (`tú`/`tu`/`tus`/`te`/`vos`/`vosotros`) in any new key — formal `usted` throughout
6. Run `node scripts/find-broken-quotes.js` per MEMORY.md
7. Single commit on `pivot/printable-business-toolkit`
8. Commit message: `Tier 2 i18n Track B Wave 2 (es) — collections + workspace + bulk + share es message keys`
9. Plain `git push`; deploy
10. Production verify: build verify expects 0 MISSING_MESSAGE on es Wave-2 namespaces (regression from prior 6 → 0); /es/workspace/ + /es/collections/ render with subscriber-feature ES chrome (these routes require auth — verify via signed-in subscriber session OR via the gate/login prompt copy which is unauthenticated and renders ES chrome regardless)

---

## Halt-and-surface to operator

**Artifact path:** `C:\Users\rkgen\.claude\projects\C--Users-rkgen-lessoncraftstudio\memory\project_tier2_wave2_es_draft.md`

**Adjudications (3):**
- A1: Workspace lexical → default "espacio de trabajo" | alts "panel" / "área de trabajo"
- A2: Bulk toolbar register → default "Acciones de selección múltiple" | alt "Acciones masivas"
- A3: Action verb → default "Añadir" (Castilian) | alt "Agregar" (Latin American)

**Recon findings:**
- 1.1/1.2: 4 namespaces entirely absent from es.json (and nl.json); 112 keys to author per locale (not the ~120 estimate; not the partial-gap implied by 6-residual-warnings)
- 1.3: DE substrate solid; 112/112 coverage
- 1.4: All 15 component consumer paths resolve in en.json — no upstream gaps
- Favorites residue: clean — `favorites.*` not in en/de/components; safe to omit

**Operator response options:**
- "Approve" → next prompt commissions apply (NL Wave 1 precedent: I'll execute apply directly)
- "Approve with: A1=panel, A2=masivas, A3=agregar, …" → CC applies revised choices directly (no v2 re-halt; mechanical key-value rewrite)
- "Revise: <substantive>" → CC produces v2 draft, re-halts
- "Pause" → hold v1 artifact
