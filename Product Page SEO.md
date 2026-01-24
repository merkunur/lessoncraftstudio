# Product Page SEO v2.0 - GATE-Based Checklist

---

# ⛔⛔⛔ MANDATORY UNIVERSAL KEYWORD CHECK ⛔⛔⛔

## YOU MUST VERIFY THESE 7 KEYWORDS BEFORE DOING ANYTHING ELSE

**STOP. Do NOT proceed until you have run grep for ALL 7 keywords below and recorded ACTUAL COUNTS.**

### Spanish (es) - 7 Universal Keywords (Minimum 5 each):
| # | Keyword | grep command | Count |
|---|---------|--------------|-------|
| 1 | Ficha gratis | `grep -c -i "ficha gratis" {file}` | ____ |
| 2 | Ficha gratis para niños | `grep -c -i "ficha gratis para niños" {file}` | ____ |
| 3 | Fichas gratis | `grep -c -i "fichas gratis" {file}` | ____ |
| 4 | Imprimibles gratis | `grep -c -i "imprimibles gratis" {file}` | ____ |
| 5 | Ficha para niños | `grep -c -i "ficha para niños" {file}` | ____ |
| 6 | Ficha para preescolar | `grep -c -i "ficha para preescolar" {file}` | ____ |
| 7 | Ficha | `grep -c -i "ficha" {file}` | ____ |

### German (de) - 7 Universal Keywords (Minimum 5 each):
| # | Keyword | grep command | Count |
|---|---------|--------------|-------|
| 1 | Kostenloses Arbeitsblatt | `grep -c -i "kostenloses arbeitsblatt" {file}` | ____ |
| 2 | Kostenloses Arbeitsblatt für Kinder | `grep -c -i "kostenloses arbeitsblatt für kinder" {file}` | ____ |
| 3 | Kostenlose Arbeitsblätter | `grep -c -i "kostenlose arbeitsblätter" {file}` | ____ |
| 4 | Kostenlose Druckvorlagen | `grep -c -i "kostenlose druckvorlagen" {file}` | ____ |
| 5 | Arbeitsblatt für Kinder | `grep -c -i "arbeitsblatt für kinder" {file}` | ____ |
| 6 | Arbeitsblatt für Vorschule | `grep -c -i "arbeitsblatt für vorschule" {file}` | ____ |
| 7 | Arbeitsblatt | `grep -c -i "arbeitsblatt" {file}` | ____ |

### French (fr) - 7 Universal Keywords (Minimum 5 each):
| # | Keyword | grep command | Count |
|---|---------|--------------|-------|
| 1 | Fiche gratuite | `grep -c -i "fiche gratuite" {file}` | ____ |
| 2 | Fiche gratuite pour enfants | `grep -c -i "fiche gratuite pour enfants" {file}` | ____ |
| 3 | Fiches gratuites | `grep -c -i "fiches gratuites" {file}` | ____ |
| 4 | Imprimables gratuits | `grep -c -i "imprimables gratuits" {file}` | ____ |
| 5 | Fiche pour enfants | `grep -c -i "fiche pour enfants" {file}` | ____ |
| 6 | Fiche pour maternelle | `grep -c -i "fiche pour maternelle" {file}` | ____ |
| 7 | Fiche | `grep -c -i "fiche" {file}` | ____ |

### English (en) - 7 Universal Keywords (Minimum 5 each):
| # | Keyword | grep command | Count |
|---|---------|--------------|-------|
| 1 | Free worksheet | `grep -c -i "free worksheet" {file}` | ____ |
| 2 | Free worksheet for kids | `grep -c -i "free worksheet for kids" {file}` | ____ |
| 3 | Free worksheets | `grep -c -i "free worksheets" {file}` | ____ |
| 4 | Free printables | `grep -c -i "free printables" {file}` | ____ |
| 5 | Worksheet for kids | `grep -c -i "worksheet for kids" {file}` | ____ |
| 6 | Worksheet for kindergarten | `grep -c -i "worksheet for kindergarten" {file}` | ____ |
| 7 | Worksheet | `grep -c -i "worksheet" {file}` | ____ |

## ⛔ IF ANY COUNT IS BELOW 5 → STOP AND FIX CONTENT FIRST ⛔

**DO NOT:**
- Skip this check
- Write "present" or "needs verification" instead of numbers
- Proceed to GATE 0 until ALL 7 keywords show 5+ count
- Assume keywords are fine without running grep

---

# ⛔⛔⛔ CRITICAL: KEYWORDS MUST BE IN TITLES, NOT DESCRIPTIONS ⛔⛔⛔

## THE #1 FAILURE MODE - READ THIS CAREFULLY

**You CANNOT pass GATE 1 by adding keywords to:**
- ❌ sectionDescription (body text below title)
- ❌ description fields in features/useCases/howTo
- ❌ Paragraph text in hero.description
- ❌ Alt text or captions
- ❌ Any field that is NOT a title/subtitle/question

**Keywords MUST appear in these TITLE fields:**
- ✅ seo.title
- ✅ hero.title, hero.subtitle
- ✅ features.sectionTitle, features.items[].title
- ✅ howTo.sectionTitle, howTo.steps[].title
- ✅ useCases.sectionTitle, useCases.items[].title, useCases.items[].subtitle
- ✅ faq.sectionTitle, faq.items[].question
- ✅ samples.sectionTitle, relatedApps.sectionTitle

### WHY THIS MATTERS

Search engines give H2/H3 headings 10x more weight than body text. If all your keywords are in descriptions, Google won't rank the page for those terms.

### FAILING vs PASSING Example

**❌ FAILING (keywords in descriptions only):**
```typescript
features: {
  sectionTitle: 'Características del Generador',  // NO KEYWORDS IN TITLE
  sectionDescription: 'Nuestro generador ofrece fichas gratis...',  // Keywords here don't help SEO
}
```

**✅ PASSING (keywords in titles):**
```typescript
features: {
  sectionTitle: 'Características del Generador - Fichas Gratis para Imprimir de Material Educativo',  // KEYWORDS IN TITLE
  sectionDescription: 'Nuestro generador ofrece...',
}
```

---

**Purpose:** Zero-miss SEO optimization for 363 product pages (33 apps × 11 languages)

---

## GATE SYSTEM

This document uses **6 mandatory GATEs**. Each GATE is a blocking checkpoint.

| GATE | What | STOP Condition |
|------|------|----------------|
| 0 | Sample Count | Unknown count = STOP |
| 1 | Keywords | Any below minimum = STOP |
| 2 | seo.images | Missing/invalid = STOP |
| 3 | Metadata | Invalid format = STOP |
| 4 | Alt Text | Missing keywords = STOP |
| 5 | Deployment | Push unverified = STOP |

**Standard prompt:** `Analyze the "Product Page SEO.md" file and apply it to [URL]`

---

# PART 1: CHECKLIST

## PRE-CHECK: Language Folder Validation (MANDATORY)

**BEFORE running ANY command, verify these three things:**

### Pre-Check 1: Identify target language from URL

- URL: `https://www.lessoncraftstudio.com/{locale}/apps/{slug}`
- Extract `{locale}` (e.g., `es`, `de`, `fr`)
- Map to folder using table in GATE 0

### Pre-Check 2: Verify existing file uses CORRECT language samples

```bash
grep "worksheetSrc:" frontend/content/product-pages/{locale}/{app}.ts
```

**STOP CONDITIONS:**
- If paths contain `/samples/english/` for a non-English page → **LOCALIZATION BUG - FIX FIRST**
- If paths contain wrong language folder → **LOCALIZATION BUG - FIX FIRST**

### Pre-Check 3: Compare with English reference page

```bash
grep -c "id:" frontend/content/product-pages/en/{app}.ts | head -1
```

Record the English sample count as baseline reference.

### Pre-Check Summary

| Pre-Check | Value |
|-----------|-------|
| Target locale | _____ |
| Language folder | _____ |
| Existing file uses correct folder? | [ ] Yes / [ ] NO - FIX FIRST |
| English reference sample count | _____ |

**If Pre-Check 2 shows wrong language → STOP and fix before proceeding**

---

## GATE 0: Sample Count (BLOCKING)

### ⛔⛔⛔ CRITICAL: ALL SAMPLES EXIST - SEARCH THOROUGHLY ⛔⛔⛔

**EVERY product page has samples in its corresponding language folder on the server. If you get zero results, YOU are searching wrong.**

**MANDATORY: Always list the directory FIRST before trying specific file searches:**

```bash
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "ls /opt/lessoncraftstudio/samples/{language}/"
```

**Then identify the exact folder name from the list and use it.**

**Common folder name formats (examples):**
- `draw-and-color` (with hyphens)
- `alphabet-train` (with hyphens)
- `find-and-count` (with hyphens)
- `addition` (single word)
- `wordsearch` (compound word)

**If your search returns 0 or empty results:**
1. You are using the WRONG folder name
2. List the language directory to see actual folder names
3. Use the exact folder name shown in the listing

**NEVER conclude that samples don't exist. They ALL exist. Find them.**

---

**Run FIRST. Do NOT skip.**

### Step 0.1: Count samples on server (CORRECT LANGUAGE)

**⚠️ CRITICAL: Replace {LANGUAGE} with the ACTUAL target language folder, NOT english (unless page is English)**

#### Locale-to-Folder Mapping

| Locale | Folder |
|--------|--------|
| en | english |
| de | german |
| fr | french |
| es | spanish |
| pt | portuguese |
| it | italian |
| nl | dutch |
| da | danish |
| sv | swedish |
| no | norwegian |
| fi | finnish |

```bash
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "ls /opt/lessoncraftstudio/samples/{LANGUAGE}/{app}/sample-*.jpeg 2>/dev/null | grep -v answer | grep -v bak | wc -l"
```

**Replace `{LANGUAGE}` with:** Use the locale-to-folder mapping table above. For Spanish pages use `spanish`, for German use `german`, etc.

**Replace `{app}` with:** Folder name (e.g., wordsearch, addition, alphabet-train)

**⚠️ VERIFICATION CHECKLIST:**
- [ ] I confirmed {LANGUAGE} is the TARGET language folder (NOT english, unless English page)
- [ ] I used the locale-to-folder mapping table above
- [ ] The folder matches the page I'm optimizing

### Step 0.1.5: LIST ACTUAL FILE NAMES (MANDATORY - DO NOT SKIP)

**⛔⛔⛔ CRITICAL: You MUST list the actual files BEFORE configuring any paths ⛔⛔⛔**

File naming conventions vary between apps. Some use `sample-1.jpeg`, others use `{app}-portrait.jpeg` or descriptive names like `worksheet-easy.jpeg`. **NEVER assume - ALWAYS verify.**

**Run this command to see ACTUAL file names:**
```bash
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "ls /opt/lessoncraftstudio/samples/{LANGUAGE}/{app}/"
```

**Record the EXACT file naming pattern:**

| Field | Value |
|-------|-------|
| Worksheet pattern | _____ (e.g., `sample-1.jpeg` OR `wordsearch-portrait.jpeg`) |
| Answer key pattern | _____ (e.g., `sample-1-answer.jpeg` OR `wordsearch-portrait-answer-key.jpeg`) |
| PDF pattern | _____ (e.g., `sample-1.pdf` OR `wordsearch-portrait.pdf`) |

**⛔ DO NOT proceed to Step 0.2 until you have listed files and recorded the naming pattern**
**⛔ DO NOT guess file names - use EXACTLY what is shown in the ls output**

---

### Step 0.2: Record count

| Field | Value |
|-------|-------|
| Server sample count | _____ |

### GATE 0 Decision

- [ ] Count recorded → **GO** to Validation Checkpoint
- [ ] Count unknown → **STOP** - run command again

---

## ⚠️ CRITICAL VALIDATION CHECKPOINT

**Before proceeding to GATE 1, verify ALL items:**

| Check | Status |
|-------|--------|
| Pre-check completed? | [ ] |
| GATE 0 used correct language folder (NOT english unless English page)? | [ ] |
| Existing file samples.items uses correct language path? | [ ] |
| seo.images will use correct language path? | [ ] |

**If ANY checkbox is unchecked → STOP and fix before proceeding**

---

## GATE 1: Keyword Audit (BLOCKING)

### CRITICAL WARNING - GATE 1 FREQUENTLY SKIPPED

**DO NOT proceed to GATE 2 without:**
1. Running grep for ALL 7 universal keywords
2. Recording the ACTUAL count for each (not "present" or "needs verification")
3. Verifying ALL counts are 5+

**If you write "present" or "needs verification" instead of a number → You are FAILING this gate.**

---

### Step 1.1: Get keywords for this page

1. **Universal keywords (7):** See PART 2 - Table for locale
2. **App-specific keywords (10):** See `INDIVIDUAL APP PAGES/{language}/{app}.md`

### Step 1.2: MANDATORY - Run grep for EACH universal keyword

**You MUST run a grep command for EACH keyword. Do NOT skip any.**

#### Spanish (es) - Run ALL 7 commands:
```bash
grep -c -i "ficha gratis" frontend/content/product-pages/es/{app}.ts
grep -c -i "ficha gratis para niños" frontend/content/product-pages/es/{app}.ts
grep -c -i "fichas gratis" frontend/content/product-pages/es/{app}.ts
grep -c -i "imprimibles gratis" frontend/content/product-pages/es/{app}.ts
grep -c -i "ficha para niños" frontend/content/product-pages/es/{app}.ts
grep -c -i "ficha para preescolar" frontend/content/product-pages/es/{app}.ts
grep -c -i "ficha" frontend/content/product-pages/es/{app}.ts
```

#### German (de) - Run ALL 7 commands:
```bash
grep -c -i "kostenloses arbeitsblatt" frontend/content/product-pages/de/{app}.ts
grep -c -i "kostenloses arbeitsblatt für kinder" frontend/content/product-pages/de/{app}.ts
grep -c -i "kostenlose arbeitsblätter" frontend/content/product-pages/de/{app}.ts
grep -c -i "kostenlose druckvorlagen" frontend/content/product-pages/de/{app}.ts
grep -c -i "arbeitsblatt für kinder" frontend/content/product-pages/de/{app}.ts
grep -c -i "arbeitsblatt für vorschule" frontend/content/product-pages/de/{app}.ts
grep -c -i "arbeitsblatt" frontend/content/product-pages/de/{app}.ts
```

#### French (fr) - Run ALL 7 commands:
```bash
grep -c -i "fiche gratuite" frontend/content/product-pages/fr/{app}.ts
grep -c -i "fiche gratuite pour enfants" frontend/content/product-pages/fr/{app}.ts
grep -c -i "fiches gratuites" frontend/content/product-pages/fr/{app}.ts
grep -c -i "imprimables gratuits" frontend/content/product-pages/fr/{app}.ts
grep -c -i "fiche pour enfants" frontend/content/product-pages/fr/{app}.ts
grep -c -i "fiche pour maternelle" frontend/content/product-pages/fr/{app}.ts
grep -c -i "fiche" frontend/content/product-pages/fr/{app}.ts
```

#### Other Languages
Use the same pattern with keywords from PART 2 tables.

### Step 1.3: Fill tracking table with ACTUAL COUNTS

**Universal Keywords (7) - Minimum 5 each:**

**REQUIRED: Write the ACTUAL NUMBER from grep output. "present", "yes", or "needs verification" is NOT acceptable.**

| # | Keyword | Count (NUMBER ONLY) | Pass (5+)? |
|---|---------|---------------------|------------|
| 1 | _______ | _____ | [ ] |
| 2 | _______ | _____ | [ ] |
| 3 | _______ | _____ | [ ] |
| 4 | _______ | _____ | [ ] |
| 5 | _______ | _____ | [ ] |
| 6 | _______ | _____ | [ ] |
| 7 | _______ | _____ | [ ] |

**App-Specific Keywords (10) - Minimum 10 each:**

| # | Keyword | Count (NUMBER ONLY) | Pass (10+)? |
|---|---------|---------------------|-------------|
| 1 | _______ | _____ | [ ] |
| 2 | _______ | _____ | [ ] |
| 3 | _______ | _____ | [ ] |
| 4 | _______ | _____ | [ ] |
| 5 | _______ | _____ | [ ] |
| 6 | _______ | _____ | [ ] |
| 7 | _______ | _____ | [ ] |
| 8 | _______ | _____ | [ ] |
| 9 | _______ | _____ | [ ] |
| 10 | ______ | _____ | [ ] |

### GATE 1 Decision

**STOP CONDITIONS (any of these = FAIL):**
- Any universal keyword count < 5
- Any app-specific keyword count < 10
- Any count shows "present", "needs verification", or blank instead of a number

**ACTIONS:**
- [ ] All 17 keywords meet minimums (verified with actual counts) → **GO** to GATE 1.5
- [ ] Any keyword below minimum → **STOP** - rewrite H2/H3 titles to add missing keywords, then re-run grep to verify

---

## GATE 1.5: TITLE KEYWORD INJECTION (BLOCKING)

**This gate verifies keywords appear specifically in TITLE fields, not just anywhere in the file.**

### Step 1.5.1: Run Title-Specific Grep Command

**This is DIFFERENT from GATE 1. GATE 1 counts all occurrences. This counts ONLY title field occurrences.**

```bash
# Count keywords ONLY in title/subtitle/question fields (NOT descriptions)
grep -E "(title:|sectionTitle:|subtitle:|question:)" frontend/content/product-pages/{locale}/{app}.ts | grep -c -i "{keyword}"
```

**Run for EACH universal keyword:**

#### Spanish Example:
```bash
grep -E "(title:|sectionTitle:|subtitle:|question:)" frontend/content/product-pages/es/{app}.ts | grep -c -i "ficha gratis"
grep -E "(title:|sectionTitle:|subtitle:|question:)" frontend/content/product-pages/es/{app}.ts | grep -c -i "fichas gratis"
grep -E "(title:|sectionTitle:|subtitle:|question:)" frontend/content/product-pages/es/{app}.ts | grep -c -i "imprimibles gratis"
grep -E "(title:|sectionTitle:|subtitle:|question:)" frontend/content/product-pages/es/{app}.ts | grep -c -i "ficha para niños"
grep -E "(title:|sectionTitle:|subtitle:|question:)" frontend/content/product-pages/es/{app}.ts | grep -c -i "ficha para preescolar"
```

#### German Example:
```bash
grep -E "(title:|sectionTitle:|subtitle:|question:)" frontend/content/product-pages/de/{app}.ts | grep -c -i "kostenloses arbeitsblatt"
grep -E "(title:|sectionTitle:|subtitle:|question:)" frontend/content/product-pages/de/{app}.ts | grep -c -i "kostenlose arbeitsblätter"
grep -E "(title:|sectionTitle:|subtitle:|question:)" frontend/content/product-pages/de/{app}.ts | grep -c -i "arbeitsblatt für kinder"
grep -E "(title:|sectionTitle:|subtitle:|question:)" frontend/content/product-pages/de/{app}.ts | grep -c -i "arbeitsblatt für vorschule"
```

### Step 1.5.2: Record Title-Specific Counts

| Keyword | GATE 1 Count (whole file) | GATE 1.5 Count (titles only) | Pass? |
|---------|---------------------------|------------------------------|-------|
| Keyword 1 | _____ | _____ (must be 3+) | [ ] |
| Keyword 2 | _____ | _____ (must be 3+) | [ ] |
| Keyword 3 | _____ | _____ (must be 3+) | [ ] |
| Keyword 4 | _____ | _____ (must be 3+) | [ ] |
| Keyword 5 | _____ | _____ (must be 3+) | [ ] |
| Keyword 6 | _____ | _____ (must be 3+) | [ ] |
| Keyword 7 | _____ | _____ (must be 3+) | [ ] |

**⛔ If GATE 1 passes but GATE 1.5 fails → Keywords are in descriptions, NOT titles. STOP and fix titles.**

### Step 1.5.3: Field-by-Field Title Verification Checklist

**Complete EVERY checkbox. Write the EXACT keyword found, not "yes" or "present".**

#### CRITICAL FIELDS (ALL must contain keywords):

| Field | Required Keyword | Keyword Found (write exact text) | Pass? |
|-------|------------------|----------------------------------|-------|
| seo.title | Universal keyword (e.g., "Ficha gratis" / "Free worksheet") | __________________ | [ ] |
| hero.title | Universal keyword (e.g., "Ficha gratis" / "Free worksheet") | __________________ | [ ] |
| hero.subtitle | Universal keyword | __________________ | [ ] |

#### HIGH-PRIORITY SECTION TITLES (ALL must contain keywords):

| Field | Required Keyword | Keyword Found | Pass? |
|-------|------------------|---------------|-------|
| samples.sectionTitle | Universal keyword + app keyword | __________________ | [ ] |
| features.sectionTitle | Universal keyword | __________________ | [ ] |
| howTo.sectionTitle | Universal keyword | __________________ | [ ] |
| useCases.sectionTitle | Universal keyword | __________________ | [ ] |
| faq.sectionTitle | Universal keyword | __________________ | [ ] |
| relatedApps.sectionTitle | Universal keyword | __________________ | [ ] |

#### FEATURE TITLES (At least 6 of 8 must contain keywords):

| Field | Keyword Found | Pass? |
|-------|---------------|-------|
| features.items[0].title | __________________ | [ ] |
| features.items[1].title | __________________ | [ ] |
| features.items[2].title | __________________ | [ ] |
| features.items[3].title | __________________ | [ ] |
| features.items[4].title | __________________ | [ ] |
| features.items[5].title | __________________ | [ ] |
| features.items[6].title | __________________ | [ ] |
| features.items[7].title | __________________ | [ ] |

**Feature Score: ___/8 (minimum 6 required)**

#### HOWTO STEP TITLES (At least 4 of 5 must contain keywords):

| Field | Keyword Found | Pass? |
|-------|---------------|-------|
| howTo.steps[0].title | __________________ | [ ] |
| howTo.steps[1].title | __________________ | [ ] |
| howTo.steps[2].title | __________________ | [ ] |
| howTo.steps[3].title | __________________ | [ ] |
| howTo.steps[4].title | __________________ | [ ] |

**HowTo Score: ___/5 (minimum 4 required)**

#### USE CASE SUBTITLES (At least 5 of 6 must contain keywords):

| Field | Keyword Found | Pass? |
|-------|---------------|-------|
| useCases.items[0].subtitle | __________________ | [ ] |
| useCases.items[1].subtitle | __________________ | [ ] |
| useCases.items[2].subtitle | __________________ | [ ] |
| useCases.items[3].subtitle | __________________ | [ ] |
| useCases.items[4].subtitle | __________________ | [ ] |
| useCases.items[5].subtitle | __________________ | [ ] |

**UseCase Score: ___/6 (minimum 5 required)**

#### FAQ QUESTIONS (At least 10 of 12 must contain keywords):

| Field | Keyword Found | Pass? |
|-------|---------------|-------|
| faq.items[0].question | __________________ | [ ] |
| faq.items[1].question | __________________ | [ ] |
| faq.items[2].question | __________________ | [ ] |
| faq.items[3].question | __________________ | [ ] |
| faq.items[4].question | __________________ | [ ] |
| faq.items[5].question | __________________ | [ ] |
| faq.items[6].question | __________________ | [ ] |
| faq.items[7].question | __________________ | [ ] |
| faq.items[8].question | __________________ | [ ] |
| faq.items[9].question | __________________ | [ ] |
| faq.items[10].question | __________________ | [ ] |
| faq.items[11].question | __________________ | [ ] |

**FAQ Score: ___/12 (minimum 10 required)**

### GATE 1.5 Decision

| Section | Score | Minimum | Pass? |
|---------|-------|---------|-------|
| Critical Fields | ___/3 | 3/3 | [ ] |
| Section Titles | ___/6 | 6/6 | [ ] |
| Feature Titles | ___/8 | 6/8 | [ ] |
| HowTo Titles | ___/5 | 4/5 | [ ] |
| UseCase Subtitles | ___/6 | 5/6 | [ ] |
| FAQ Questions | ___/12 | 10/12 | [ ] |

**TOTAL: ___/40 (minimum 34 required)**

- [ ] All sections meet minimums → **GO** to GATE 2
- [ ] Any section below minimum → **STOP** - add keywords to failing title fields using templates below

---

## TITLE TEMPLATES BY LANGUAGE

**Use these formulas when creating/fixing title fields:**

### Spanish (es) Templates

```
seo.title:
"{App Keyword} - Generador de Fichas Gratis de {Category} para Educación Infantil y Preescolar"

hero.title:
"Fichas para Imprimir de {App Name} - Generador de Fichas Gratis de {Feature} para Educación Infantil y Preescolar"

hero.subtitle:
"Generador de Fichas de {App Name} - Material Educativo Gratis con {Feature}"

features.sectionTitle:
"Características del Generador de {App Name} - Fichas para Imprimir con Material Educativo Gratis"

howTo.sectionTitle:
"Cómo Crear Fichas para Imprimir de {App Name} en 5 Pasos - Genera Material Educativo Gratis"

useCases.sectionTitle:
"Perfecto para Maestros y Padres - Fichas para Imprimir de {App Name} para Educación Infantil"

faq.sectionTitle:
"Preguntas Frecuentes sobre Fichas para Imprimir de {App Name} - Todo sobre Fichas Gratis"
```

### German (de) Templates

```
seo.title:
"{App Keyword} - Kostenloser Arbeitsblatt Generator für Kindergarten und Grundschule"

hero.title:
"Kostenlose Arbeitsblätter {App Name} - Professioneller Generator für Kindergarten und Grundschule"

hero.subtitle:
"{App Name} Arbeitsblatt Generator - Kostenlose Druckvorlagen für Kinder"

features.sectionTitle:
"Funktionen des {App Name} Generators - Kostenlose Arbeitsblätter zum Ausdrucken"

howTo.sectionTitle:
"So Erstellen Sie Kostenlose Arbeitsblätter für {App Name} in 5 Schritten"

useCases.sectionTitle:
"Perfekt für Lehrer und Eltern - Kostenlose {App Name} Arbeitsblätter für Vorschule"

faq.sectionTitle:
"Häufig Gestellte Fragen zu Kostenlosen {App Name} Arbeitsblättern"
```

### French (fr) Templates

```
seo.title:
"{App Keyword} - Générateur de Fiches Gratuites pour Maternelle et CP"

hero.title:
"Fiches Gratuites {App Name} - Générateur Professionnel pour Maternelle et CP"

hero.subtitle:
"Générateur de Fiches {App Name} - Imprimables Gratuits pour Enfants"

features.sectionTitle:
"Fonctionnalités du Générateur {App Name} - Fiches Gratuites à Imprimer"

howTo.sectionTitle:
"Comment Créer des Fiches Gratuites {App Name} en 5 Étapes"

useCases.sectionTitle:
"Parfait pour Enseignants et Parents - Fiches {App Name} Gratuites pour Maternelle"

faq.sectionTitle:
"Questions Fréquentes sur les Fiches {App Name} Gratuites"
```

### English (en) Templates

```
seo.title:
"{App Keyword} - Free Printable Worksheet Generator for Kids and Kindergarten"

hero.title:
"Free {App Name} Worksheets - Professional Generator for Kids and Kindergarten"

hero.subtitle:
"{App Name} Worksheet Generator - Free Printables for Children"

features.sectionTitle:
"{App Name} Generator Features - Free Worksheets for Kids to Print"

howTo.sectionTitle:
"How to Create Free {App Name} Worksheets in 5 Easy Steps"

useCases.sectionTitle:
"Perfect for Teachers and Parents - Free {App Name} Worksheets for Kindergarten"

faq.sectionTitle:
"Frequently Asked Questions About Free {App Name} Worksheets"
```

### Feature/HowTo/UseCase Title Patterns

**Distribute keywords across individual item titles:**

```
features.items[0].title: "... - {Universal keyword} for {audience}"
features.items[1].title: "... - {App keyword} with {feature}"
features.items[2].title: "... - {Universal keyword} Customizable"
features.items[3].title: "... - {Universal keyword} in Multiple Languages"
features.items[4].title: "Commercial License - Sell {Universal keyword}"
features.items[5].title: "... - High Quality {App keyword}"
features.items[6].title: "... - {Universal keyword} PDF Export"
features.items[7].title: "... - {App keyword} and {related skill}"

howTo.steps[0].title: "Select Images - {Universal keyword} for {audience}"
howTo.steps[1].title: "Configure Exercises - {App keyword} Settings"
howTo.steps[2].title: "Generate Your Sheet - Instant {Universal keyword}"
howTo.steps[3].title: "Edit on Canvas - Customize {Universal keyword}"
howTo.steps[4].title: "Download and Print - High Quality {App keyword}"
```

---

## GATE 2: seo.images Array (BLOCKING)

**Google displays image thumbnails in search results ONLY if this exists.**

### Step 2.1: Check if seo.images exists

```bash
grep -A 20 "images:" frontend/content/product-pages/{locale}/{app}.ts | head -25
```

### Step 2.2: Verify requirements

| Requirement | Status |
|-------------|--------|
| `seo.images` array exists | [ ] |
| All available samples (match GATE 0 count) | [ ] |
| All URLs absolute (https://...) | [ ] |
| All images 1200px+ wide | [ ] |
| Each has caption with keywords | [ ] |

### Step 2.3: Add if missing

**⛔ Use ACTUAL file names from Step 0.1.5 - DO NOT guess file names**

```typescript
seo: {
  // ... other seo fields
  images: [
    // Add ALL samples from server (must match GATE 0 count)
    // ⚠️ Use EXACT file names from Step 0.1.5 - NEVER guess!
    {
      url: 'https://www.lessoncraftstudio.com/samples/{language}/{app}/{ACTUAL-FILENAME}.jpeg',
      width: 2480,
      height: 3508,
      caption: '{Primary keyword} worksheet - {description} for {audience}'
    },
    // ... continue for each file found in Step 0.1.5
    // Include ALL samples that exist on server
  ]
}
```

### GATE 2 Decision

- [ ] seo.images includes ALL samples (count matches GATE 0) → **GO** to GATE 3
- [ ] seo.images missing or invalid → **STOP** - add array

---

## GATE 3: Metadata Validation

### Step 3.1: Check current metadata

| Field | Current | Valid? |
|-------|---------|--------|
| Title | "______" | 55-70 chars, keyword first [ ] |
| Description | "______" | 150-160 chars, has CTA [ ] |
| canonicalUrl | _______ | Matches page URL [ ] |
| og:locale | _______ | Present [ ] |

### Step 3.2: Title formula

```
{Primary Keyword} | {Benefit} - {Brand}
```

**Examples:**
- EN: `Free Printable Addition Worksheets | Math Worksheet Generator`
- DE: `Kostenlose Mathe Arbeitsblätter Grundschule | Professioneller Generator`
- FR: `Fiches d'Addition Maternelle CP Gratuites | Générateur Professionnel`

### Step 3.3: Description formula

```
{Action verb} + {product} + {benefit}. {Feature}. {CTA with time/value}.
```

### GATE 3 Decision

- [ ] All metadata valid → **GO** to GATE 4
- [ ] Any metadata invalid → **STOP** - fix metadata

---

## GATE 4: Sample Alt Text (BLOCKING)

### Step 4.1: Verify samples.items count matches GATE 0

| Check | Value |
|-------|-------|
| Server count (GATE 0) | _____ |
| samples.items count | _____ |
| Match? | [ ] |

**If counts don't match → STOP - add/remove items to match**

### Step 4.2: Alt text formula

```
{App Keyword} + {Universal Keyword} + {Variant} + {Audience}
```

**Length:** 80-150 characters

**Must include:**
1. Primary app-specific keyword
2. At least one universal keyword
3. Same language as page

### Step 4.3: Check each alt text

| Sample | Has app keyword? | Has universal keyword? | Correct language? |
|--------|------------------|------------------------|-------------------|
| 1 | [ ] | [ ] | [ ] |
| 2 | [ ] | [ ] | [ ] |
| 3 | [ ] | [ ] | [ ] |
| 4 | [ ] | [ ] | [ ] |
| 5 | [ ] | [ ] | [ ] |

### Alt text examples by language

**English:**
```
Word search worksheets free printable - portrait vocabulary puzzles for kindergarten
```

**German:**
```
Wortsuchrätsel Arbeitsblätter kostenlos zum Ausdrucken - Wortschatz Übungen für Grundschule
```

**French:**
```
Mots cachés fiches gratuites à imprimer - puzzles vocabulaire pour maternelle et CP
```

**Spanish:**
```
Sopa de letras fichas gratis para imprimir - puzzles vocabulario para preescolar
```

### GATE 4 Decision

- [ ] All alt texts have both keyword types in correct language → **GO** to GATE 5
- [ ] Any alt text missing keywords → **STOP** - fix alt text

---

## GATE 5: Deployment (BLOCKING)

### Step 5.1: Commit

```bash
git add frontend/content/product-pages/{locale}/{app}.ts
git commit -m "$(cat <<'EOF'
SEO: Optimize {app} page for {language}

- [List key changes]

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
EOF
)"
```

**Verify output shows:** `[main xxxxxxx] SEO: ...` with file changes

- [ ] Commit succeeded

### Step 5.2: Push

```bash
git push
```

**Verify output shows:** `main -> main`

- [ ] Push succeeded

### Step 5.3: Verify push (MANDATORY)

```bash
git log origin/main..HEAD --oneline
```

**Expected output:** NOTHING (empty = all pushed)

**If shows commits → Push FAILED - run `git push` again**

- [ ] No unpushed commits

### Step 5.4: Deploy

```bash
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "bash /opt/lessoncraftstudio/deploy.sh"
```

- [ ] Deploy succeeded

### GATE 5 Decision

- [ ] All 4 steps verified → **COMPLETE**
- [ ] Any step failed → **STOP** - retry failed step

---

# PART 2: KEYWORD REFERENCE

## Universal Keywords (7) - All 11 Languages

These MUST appear 5+ times each in H2/H3 titles on EVERY page.

### Group 1: EN, DE, FR, ES, PT, IT

| # | EN | DE | FR | ES | PT | IT |
|---|----|----|----|----|----|----|
| 1 | Free worksheet | Kostenloses Arbeitsblatt | Fiche gratuite | Ficha gratis | Atividade grátis | Scheda gratuita |
| 2 | Free worksheet for kids | Kostenloses Arbeitsblatt für Kinder | Fiche gratuite pour enfants | Ficha gratis para niños | Atividade grátis para crianças | Scheda gratuita per bambini |
| 3 | Free worksheets | Kostenlose Arbeitsblätter | Fiches gratuites | Fichas gratis | Atividades grátis | Schede gratuite |
| 4 | Free printables | Kostenlose Druckvorlagen | Imprimables gratuits | Imprimibles gratis | Imprimíveis grátis | Stampabili gratuiti |
| 5 | Worksheet for kids | Arbeitsblatt für Kinder | Fiche pour enfants | Ficha para niños | Atividade para crianças | Scheda per bambini |
| 6 | Worksheet for kindergarten | Arbeitsblatt für Vorschule | Fiche pour maternelle | Ficha para preescolar | Atividade para educação infantil | Scheda per scuola dell'infanzia |
| 7 | Worksheet | Arbeitsblatt | Fiche | Ficha | Atividade | Scheda |

### Group 2: NL, SV, DA, NO, FI

| # | NL | SV | DA | NO | FI |
|---|----|----|----|----|----|
| 1 | Gratis werkblad | Gratis arbetsblad | Gratis arbejdsark | Gratis arbeidsark | Ilmainen työarkki |
| 2 | Gratis werkblad voor kinderen | Gratis arbetsblad för barn | Gratis arbejdsark til børn | Gratis arbeidsark for barn | Ilmainen työarkki lapsille |
| 3 | Gratis werkbladen | Gratis arbetsblad | Gratis arbejdsark | Gratis arbeidsark | Ilmaiset työarkit |
| 4 | Gratis printables | Gratis utskrifter | Gratis printables | Gratis utskrifter | Ilmaiset tulosteet |
| 5 | Werkblad voor kinderen | Arbetsblad för barn | Arbejdsark til børn | Arbeidsark for barn | Työarkki lapsille |
| 6 | Werkblad voor kleuters | Arbetsblad för förskoleklass | Arbejdsark til børnehaveklasse | Arbeidsark for 1. trinn | Työarkki esiopetukseen |
| 7 | Werkblad | Arbetsblad | Arbejdsark | Arbeidsark | Työarkki |

## App-Specific Keywords (10)

**Location:** `INDIVIDUAL APP PAGES/{language}/{app}.md`

**Target:** 10 keywords × 10 occurrences each = 100 instances

---

# PART 3: SPECIFICATIONS

## Metadata Specs

| Element | Min | Max | Requirements |
|---------|-----|-----|--------------|
| Title | 55 | 70 chars | Primary keyword FIRST |
| Description | 150 | 160 chars | Include CTA |
| Alt text | 80 | 150 chars | App keyword + universal keyword |

## Content Structure

| Section | H2/H3 Count | Word Count |
|---------|-------------|------------|
| Hero | 1 H1 only | 400-500 |
| Features | 1 H2 + 7 H3 | 1000-1200 |
| How-To | 1 H2 + 5 H3 | 1200-1400 |
| Use Cases | 1 H2 + 6-10 H3 | 2000-2500 |
| Tips | 1 H2 + 7 H3 | 1500-1800 |
| Pricing | 1 H2 | 400-500 |
| FAQ | 1 H2 + 18 H3 | 2000-2500 |
| **Total** | **50+ H2/H3** | **5500-6000** |

## Required Schemas

| Schema | Required Items |
|--------|----------------|
| SoftwareApplication | Must include `image` property (all samples - must match GATE 0 count) |
| BreadcrumbList | 3 items |
| FAQPage | 18+ questions |
| HowTo | 5 steps |
| ImageObject | One per sample |

## samples.items Template

**⚠️ CRITICAL: {language} MUST match the page locale**
- Spanish page (es) → `/samples/spanish/...`
- German page (de) → `/samples/german/...`
- French page (fr) → `/samples/french/...`
- **NEVER** use `/samples/english/...` for non-English pages

**⛔⛔⛔ VERIFY FILE NAMES FIRST (Step 0.1.5) ⛔⛔⛔**
- **DO NOT** use the template below without first running `ls` on the server
- File names vary: `sample-1.jpeg`, `wordsearch-portrait.jpeg`, `worksheet-easy.jpeg`, etc.
- Use the EXACT file names from Step 0.1.5 output - NEVER guess

```typescript
samples: {
  items: [
    {
      id: '1',
      // ⚠️ REPLACE file names with ACTUAL names from Step 0.1.5
      worksheetSrc: '/samples/{language}/{app}/{ACTUAL-FILENAME}.jpeg',  // ⚠️ USE EXACT NAME FROM ls
      answerKeySrc: '/samples/{language}/{app}/{ACTUAL-ANSWER-KEY-FILENAME}.jpeg',
      altText: '{App keyword} {universal keyword} - {variant} for {audience}',
      pdfDownloadUrl: '/samples/{language}/{app}/{ACTUAL-FILENAME}.pdf'
    },
    // Repeat for each sample (must match server count from GATE 0)
    // ALL paths must use the TARGET language folder
    // ALL file names must match EXACTLY what you saw in Step 0.1.5
  ]
}
```

---

# PART 4: COMMANDS REFERENCE

## Sample Count (GATE 0)

```bash
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "ls /opt/lessoncraftstudio/samples/{language}/{app}/sample-*.jpeg 2>/dev/null | grep -v answer | grep -v bak | wc -l"
```

## Keyword Count (GATE 1 - Whole File)

```bash
grep -c -i "{keyword}" frontend/content/product-pages/{locale}/{app}.ts
```

## Title-Specific Keyword Count (GATE 1.5)

**IMPORTANT: This is DIFFERENT from the GATE 1 command. Use this to verify keywords are in TITLES, not descriptions.**

```bash
# Count keywords ONLY in title fields (not descriptions)
grep -E "(title:|sectionTitle:|subtitle:|question:)" frontend/content/product-pages/{locale}/{app}.ts | grep -c -i "{keyword}"
```

**Example for Spanish "ficha gratis":**
```bash
grep -E "(title:|sectionTitle:|subtitle:|question:)" frontend/content/product-pages/es/resta-fichas.ts | grep -c -i "ficha gratis"
# Expected: 3+ (if less, keywords are in descriptions, not titles)
```

**Find title fields MISSING keywords:**
```bash
grep -E "(title:|sectionTitle:|subtitle:|question:)" frontend/content/product-pages/es/{app}.ts | grep -v -i -E "(ficha gratis|fichas gratis|imprimibles gratis|ficha para niños|ficha para preescolar)"
```

## Commit

```bash
git add frontend/content/product-pages/{locale}/{app}.ts
git commit -m "$(cat <<'EOF'
SEO: Optimize {app} page for {language}

- [List key changes]

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
EOF
)"
```

## Push

```bash
git push
```

## Verify Push

```bash
git log origin/main..HEAD --oneline
```
**Empty output = success**

## Deploy

```bash
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "bash /opt/lessoncraftstudio/deploy.sh"
```

## Schema Verification

```bash
# Check all schemas exist
curl -s "https://www.lessoncraftstudio.com/{locale}/apps/{slug}" | grep -o '"@type":"FAQPage"'
curl -s "https://www.lessoncraftstudio.com/{locale}/apps/{slug}" | grep -o '"@type":"HowTo"'
curl -s "https://www.lessoncraftstudio.com/{locale}/apps/{slug}" | grep -o '"@type":"SoftwareApplication"'
```

---

# Quick Reference Card

## The 7 Most Commonly Missed Items

| # | Item | Fix |
|---|------|-----|
| 1 | **Universal keywords not verified** | **MUST run grep for EACH of the 7 universal keywords and record actual count. If ANY is below 5 → STOP and rewrite content. See giant warning box at TOP of document.** |
| 2 | Didn't count samples first | Run GATE 0 command BEFORE editing |
| 3 | samples.items count mismatch | Must equal server count exactly |
| 4 | Alt text missing universal keyword | Add "free printable/worksheet for kids/etc." |
| 5 | seo.images array missing | Add ALL samples with absolute URLs |
| 6 | Push not verified | Run `git log origin/main..HEAD` - must be empty |
| 7 | Wrong language folder | ALWAYS use target language folder (es→spanish, de→german). NEVER use english for non-English pages |
| 8 | **Keywords in descriptions, not titles** | **Run GATE 1.5 title-specific grep. If GATE 1 passes but GATE 1.5 fails → keywords are in wrong place. Use title templates to fix.** |
| 9 | **Sample file names guessed, not verified** | **ALWAYS run `ls` to see actual file names before configuring paths. File naming varies: some use `sample-1.jpeg`, others use `{app}-portrait.jpeg`. NEVER assume - run Step 0.1.5 FIRST.** |

## Minimum Requirements Summary

| Requirement | Target |
|-------------|--------|
| Universal keywords (7) | 5+ each |
| App-specific keywords (10) | 10+ each |
| Total keyword instances | 135+ |
| seo.images | = server count |
| samples.items | = server count |
| FAQs | 18+ |
| How-To steps | 5 |
| Features | 7 |
| Total H2/H3 | 50+ |

**IMPORTANT:** Keyword counts MUST be actual numbers from grep commands. Writing "present", "yes", "needs verification", or leaving blank is NOT acceptable. Run `grep -c -i "{keyword}" {file}` for each keyword and record the number.
