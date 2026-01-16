# Product Page SEO Reference Guide
## Professional SEO Optimization for 363 Individual App Promotion Pages

**Purpose:** This document serves as the definitive reference for optimizing each of the 363 product pages (33 apps × 11 languages) for maximum Google visibility. Each page represents a distinct product that generates worksheets in a specific language and should be treated by Google as a separate product, not a translation.

---

## HOW TO USE THIS DOCUMENT

> ⚠️ **MANDATORY DEPLOYMENT RULE** ⚠️
>
> After implementing SEO fixes, you **MUST** commit, push, and deploy immediately.
> Changes have ZERO value until they are live on production.
> See **STEP 10** for deployment commands.

### Standard Prompt Format
```
Analyze the "Product Page SEO.md" file and apply it to [URL]
```

**Example:**
```
Analyze the "Product Page SEO.md" file and apply it to https://www.lessoncraftstudio.com/en/apps/word-search-worksheets
```

### What Claude Must Do When This Prompt Is Given

**STEP 1: Parse the URL**
- Extract locale from URL (e.g., `en` from `/en/apps/...`)
- Extract slug from URL (e.g., `word-search-worksheets`)
- Identify the app (e.g., `wordsearch`)

**STEP 2: Locate the Content File**
- Path: `frontend/content/product-pages/{locale}/{app}.ts`
- Example: `frontend/content/product-pages/en/wordsearch.ts`

**STEP 3: Get Keywords for This Page**
- Get the 7 UNIVERSAL keywords for this locale (Section 0.2)
- Get the 10 APP-SPECIFIC keywords for this app+locale (Section 6)

**STEP 4: Audit Current Content**
Count keyword occurrences in H2/H3 titles:
- Each of 7 universal keywords must appear 5+ times
- Each of 10 app-specific keywords must appear 10+ times
- Total target: 135+ keyword instances

**STEP 5: Audit Metadata**
Check against Section 2 requirements:
- Title: 55-70 characters, primary keyword first
- Description: 150-160 characters, includes CTA
- og:locale present
- og:image set (app-specific)

**STEP 6: Audit Structured Data**
Verify schemas exist per Section 3:
- [ ] SoftwareApplication
- [ ] BreadcrumbList
- [ ] FAQPage
- [ ] HowTo
- [ ] ImageObject (for samples)

**STEP 7: Audit Images**
Check per Section 4:
- Alt text includes primary keyword
- Alt text is language-appropriate (80-125 chars)
- Figure/figcaption implemented
- Title attributes present

**STEP 8: Generate Improvement Report**
Create a report showing:
1. Current keyword counts vs targets
2. Missing/weak keywords
3. Metadata issues
4. Schema gaps
5. Image SEO issues

**STEP 9: Implement Fixes**
Edit the content file to:
1. Rewrite H2/H3 titles to include missing keywords
2. Fix metadata (title, description)
3. Optimize image alt text
4. Add any missing FAQ questions

**STEP 10: DEPLOY IMMEDIATELY (MANDATORY)**

⚠️ **CRITICAL: ALWAYS DEPLOY AFTER IMPLEMENTATION** ⚠️

After implementing SEO fixes, you MUST deploy immediately. Do NOT leave changes uncommitted or undeployed.

```bash
# 1. Commit changes
git add frontend/content/product-pages/{locale}/{app}.ts
git commit -m "SEO: Optimize {app} page for {language}

- [List key changes]

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"

# 2. Push to remote
git push

# 3. Deploy to production
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "bash /opt/lessoncraftstudio/deploy.sh"
```

**Why this is mandatory:**
- SEO changes have no value until they're live
- Uncommitted changes can be lost
- Google can only index deployed content
- Partial implementations cause confusion

### Output Format

```
## SEO Audit: {App Name} - {Language}

### URL: {full URL}
### Content File: {path}

### Keyword Analysis
| Keyword | Target | Current | Status |
|---------|--------|---------|--------|
| {kw1}   | 5/10   | X       | ✓/✗    |
...

### Metadata Analysis
| Element | Current | Optimal | Status |
|---------|---------|---------|--------|
| Title   | "..."   | "..."   | ✓/✗    |
...

### Issues Found
1. ...
2. ...

### Changes Made
1. ...
2. ...
```

---

## Table of Contents

0. [**UNIVERSAL PRIORITY KEYWORDS**](#0-universal-priority-keywords-highest-priority)
1. [Core SEO Philosophy](#1-core-seo-philosophy)
2. [Metadata Specifications](#2-metadata-specifications)
3. [Structured Data (JSON-LD Schemas)](#3-structured-data-json-ld-schemas)
4. [Image SEO for Google Image Search](#4-image-seo-for-google-image-search)
5. [Keyword Implementation Strategy](#5-keyword-implementation-strategy)
6. [Language-Specific Keyword Reference](#6-language-specific-keyword-reference)
7. [Content Structure Requirements](#7-content-structure-requirements)
8. [hreflang Implementation](#8-hreflang-implementation)
9. [Technical SEO Checklist](#9-technical-seo-checklist)
10. [Per-Page Implementation Checklist](#10-per-page-implementation-checklist)

---

## 0. UNIVERSAL PRIORITY KEYWORDS (HIGHEST PRIORITY)

**These 7 keywords must be implemented on EVERY product page in the appropriate language. They take priority over app-specific keywords.**

### 0.1 Master Keyword List (English Base)

| # | English Keyword | Search Intent |
|---|----------------|---------------|
| 1 | Free worksheet | High-intent free resource seeker |
| 2 | Free worksheet for kids | Parent/teacher seeking children's materials |
| 3 | Free worksheets | Plural variant (higher volume) |
| 4 | Free printables | Alternative term (high volume) |
| 5 | Worksheet for kids | General children's worksheet seeker |
| 6 | Worksheet for kindergarten | Grade-specific seeker |
| 7 | Worksheet | Broad match anchor term |

### 0.2 Translations by Language

#### ENGLISH (en)
| Keyword | Usage in H2/H3 |
|---------|---------------|
| Free worksheet | "Download Your Free Worksheet" |
| Free worksheet for kids | "Free Worksheet for Kids: Addition Practice" |
| Free worksheets | "Access Free Worksheets for Math" |
| Free printables | "Free Printables for Classroom Use" |
| Worksheet for kids | "Worksheet for Kids with Colorful Images" |
| Worksheet for kindergarten | "Worksheet for Kindergarten Students" |
| Worksheet | "Create Your Custom Worksheet" |

#### GERMAN (de)
| English | German Translation | Usage in H2/H3 |
|---------|-------------------|---------------|
| Free worksheet | Kostenloses Arbeitsblatt | "Kostenloses Arbeitsblatt herunterladen" |
| Free worksheet for kids | Kostenloses Arbeitsblatt für Kinder | "Kostenloses Arbeitsblatt für Kinder: Mathe" |
| Free worksheets | Kostenlose Arbeitsblätter | "Kostenlose Arbeitsblätter zum Ausdrucken" |
| Free printables | Kostenlose Druckvorlagen | "Kostenlose Druckvorlagen für die Grundschule" |
| Worksheet for kids | Arbeitsblatt für Kinder | "Arbeitsblatt für Kinder mit bunten Bildern" |
| Worksheet for kindergarten | Arbeitsblatt für Vorschule | "Arbeitsblatt für Vorschule und 1. Klasse" |
| Worksheet | Arbeitsblatt | "Eigenes Arbeitsblatt erstellen" |

#### FRENCH (fr)
| English | French Translation | Usage in H2/H3 |
|---------|-------------------|---------------|
| Free worksheet | Fiche gratuite | "Télécharger votre fiche gratuite" |
| Free worksheet for kids | Fiche gratuite pour enfants | "Fiche gratuite pour enfants: Addition" |
| Free worksheets | Fiches gratuites | "Fiches gratuites à imprimer" |
| Free printables | Imprimables gratuits | "Imprimables gratuits pour la classe" |
| Worksheet for kids | Fiche pour enfants | "Fiche pour enfants avec images colorées" |
| Worksheet for kindergarten | Fiche pour maternelle | "Fiche pour maternelle et CP" |
| Worksheet | Fiche | "Créez votre propre fiche" |

#### SPANISH (es)
| English | Spanish Translation | Usage in H2/H3 |
|---------|---------------------|---------------|
| Free worksheet | Ficha gratis | "Descarga tu ficha gratis" |
| Free worksheet for kids | Ficha gratis para niños | "Ficha gratis para niños: Matemáticas" |
| Free worksheets | Fichas gratis | "Fichas gratis para imprimir" |
| Free printables | Imprimibles gratis | "Imprimibles gratis para el aula" |
| Worksheet for kids | Ficha para niños | "Ficha para niños con imágenes" |
| Worksheet for kindergarten | Ficha para preescolar | "Ficha para preescolar y primaria" |
| Worksheet | Ficha | "Crea tu propia ficha" |

#### PORTUGUESE (pt)
| English | Portuguese Translation | Usage in H2/H3 |
|---------|----------------------|---------------|
| Free worksheet | Atividade grátis | "Baixe sua atividade grátis" |
| Free worksheet for kids | Atividade grátis para crianças | "Atividade grátis para crianças: Matemática" |
| Free worksheets | Atividades grátis | "Atividades grátis para imprimir" |
| Free printables | Imprimíveis grátis | "Imprimíveis grátis para sala de aula" |
| Worksheet for kids | Atividade para crianças | "Atividade para crianças com imagens" |
| Worksheet for kindergarten | Atividade para educação infantil | "Atividade para educação infantil" |
| Worksheet | Atividade | "Crie sua própria atividade" |

#### ITALIAN (it)
| English | Italian Translation | Usage in H2/H3 |
|---------|---------------------|---------------|
| Free worksheet | Scheda gratuita | "Scarica la tua scheda gratuita" |
| Free worksheet for kids | Scheda gratuita per bambini | "Scheda gratuita per bambini: Matematica" |
| Free worksheets | Schede gratuite | "Schede gratuite da stampare" |
| Free printables | Stampabili gratuiti | "Stampabili gratuiti per la classe" |
| Worksheet for kids | Scheda per bambini | "Scheda per bambini con immagini" |
| Worksheet for kindergarten | Scheda per scuola dell'infanzia | "Scheda per scuola dell'infanzia" |
| Worksheet | Scheda | "Crea la tua scheda" |

#### DUTCH (nl)
| English | Dutch Translation | Usage in H2/H3 |
|---------|------------------|---------------|
| Free worksheet | Gratis werkblad | "Download je gratis werkblad" |
| Free worksheet for kids | Gratis werkblad voor kinderen | "Gratis werkblad voor kinderen: Rekenen" |
| Free worksheets | Gratis werkbladen | "Gratis werkbladen om te printen" |
| Free printables | Gratis printables | "Gratis printables voor de klas" |
| Worksheet for kids | Werkblad voor kinderen | "Werkblad voor kinderen met plaatjes" |
| Worksheet for kindergarten | Werkblad voor kleuters | "Werkblad voor kleuters en groep 3" |
| Worksheet | Werkblad | "Maak je eigen werkblad" |

#### SWEDISH (sv)
| English | Swedish Translation | Usage in H2/H3 |
|---------|---------------------|---------------|
| Free worksheet | Gratis arbetsblad | "Ladda ner ditt gratis arbetsblad" |
| Free worksheet for kids | Gratis arbetsblad för barn | "Gratis arbetsblad för barn: Matematik" |
| Free worksheets | Gratis arbetsblad | "Gratis arbetsblad att skriva ut" |
| Free printables | Gratis utskrifter | "Gratis utskrifter för klassrummet" |
| Worksheet for kids | Arbetsblad för barn | "Arbetsblad för barn med färgglada bilder" |
| Worksheet for kindergarten | Arbetsblad för förskoleklass | "Arbetsblad för förskoleklass" |
| Worksheet | Arbetsblad | "Skapa ditt eget arbetsblad" |

#### DANISH (da)
| English | Danish Translation | Usage in H2/H3 |
|---------|-------------------|---------------|
| Free worksheet | Gratis arbejdsark | "Download dit gratis arbejdsark" |
| Free worksheet for kids | Gratis arbejdsark til børn | "Gratis arbejdsark til børn: Matematik" |
| Free worksheets | Gratis arbejdsark | "Gratis arbejdsark til print" |
| Free printables | Gratis printables | "Gratis printables til klassen" |
| Worksheet for kids | Arbejdsark til børn | "Arbejdsark til børn med farverige billeder" |
| Worksheet for kindergarten | Arbejdsark til børnehaveklasse | "Arbejdsark til børnehaveklasse og 1. klasse" |
| Worksheet | Arbejdsark | "Lav dit eget arbejdsark" |

#### NORWEGIAN (no)
| English | Norwegian Translation | Usage in H2/H3 |
|---------|----------------------|---------------|
| Free worksheet | Gratis arbeidsark | "Last ned ditt gratis arbeidsark" |
| Free worksheet for kids | Gratis arbeidsark for barn | "Gratis arbeidsark for barn: Matematikk" |
| Free worksheets | Gratis arbeidsark | "Gratis arbeidsark til utskrift" |
| Free printables | Gratis utskrifter | "Gratis utskrifter for klasserommet" |
| Worksheet for kids | Arbeidsark for barn | "Arbeidsark for barn med fargerike bilder" |
| Worksheet for kindergarten | Arbeidsark for 1. trinn | "Arbeidsark for 1. trinn og barneskolen" |
| Worksheet | Arbeidsark | "Lag ditt eget arbeidsark" |

#### FINNISH (fi)
| English | Finnish Translation | Usage in H2/H3 |
|---------|---------------------|---------------|
| Free worksheet | Ilmainen työarkki | "Lataa ilmainen työarkki" |
| Free worksheet for kids | Ilmainen työarkki lapsille | "Ilmainen työarkki lapsille: Matematiikka" |
| Free worksheets | Ilmaiset työarkit | "Ilmaiset työarkit tulostettavaksi" |
| Free printables | Ilmaiset tulosteet | "Ilmaiset tulosteet luokkahuoneeseen" |
| Worksheet for kids | Työarkki lapsille | "Työarkki lapsille värikkäillä kuvilla" |
| Worksheet for kindergarten | Työarkki esiopetukseen | "Työarkki esiopetukseen ja 1. luokalle" |
| Worksheet | Työarkki | "Luo oma työarkki" |

### 0.3 Implementation Rules for Universal Keywords

**REQUIREMENT:** Each of the 7 universal keywords must appear:
- **Minimum 5 times** in H2/H3 titles (in addition to the 10 app-specific keywords)
- Combined with app-specific terms where possible

**Example Combinations:**

| Universal Keyword | + App Keyword | Result |
|------------------|---------------|--------|
| Free worksheet | + Addition | "Free Addition Worksheet for Practice" |
| Free worksheet for kids | + Math | "Free Math Worksheet for Kids" |
| Free printables | + Kindergarten | "Free Kindergarten Printables for Math" |
| Worksheet for kindergarten | + Coloring | "Coloring Worksheet for Kindergarten" |

### 0.4 Priority Integration in H2/H3 Titles

When writing H2/H3 titles, prioritize universal keywords:

**Section 2 (Features) - Example H3 Titles:**
- "Create Your Free Worksheet in 3 Clicks"
- "Free Worksheets with Professional Quality"
- "Perfect Worksheet for Kids of All Ages"
- "Worksheet for Kindergarten Made Easy"

**Section 4 (Use Cases) - Example H3 Titles:**
- "Teachers: Free Worksheets for Every Subject"
- "Parents: Free Worksheet for Kids at Home"
- "Free Printables for Classroom Centers"

**Section 7 (FAQ) - Example H3 Questions:**
- "Is This Really a Free Worksheet Generator?"
- "Can I Get Free Worksheets Without Signing Up?"
- "What Makes This Worksheet for Kids Different?"
- "How Do I Print My Free Printables?"

---

## 1. Core SEO Philosophy

### 1.1 Treating Language Versions as Separate Products

**Critical Understanding:** These are NOT translation pages. Each language version:
- Generates worksheets with content IN that language
- Serves a different educational market with different curriculum standards
- Uses different pedagogical terminology
- Targets different keyword search patterns

**Google Signal Strategy:**
- Unique title tags per language (not translations)
- Unique meta descriptions per language
- Language-specific keywords in H2/H3 headings
- Country/education-system specific content
- Distinct structured data per page

### 1.2 The Goldsmith Approach

Each page must be individually crafted with:
- **10 target keywords** appearing minimum 10 times each in H2/H3 titles
- **Unique, locally-relevant content** (not translated boilerplate)
- **Market-specific terminology** (German: Grundschule, French: Maternelle/CP, etc.)
- **Localized pricing references** matching each country's expectations

---

## 2. Metadata Specifications

### 2.1 Title Tag Formula

**Format:** `{Primary Keyword} | {Benefit} - {Brand}`

**Requirements:**
- Length: 55-70 characters (optimal display in SERPs)
- Primary keyword at the START
- Include language-specific terms
- Avoid generic "Worksheet Generator" alone

**Examples by Language:**

| Language | Good Title | Bad Title |
|----------|-----------|-----------|
| English | Free Printable Addition Worksheets \| Professional Math Worksheet Generator | Addition Worksheet Generator |
| German | Kostenlose Mathe Arbeitsblätter Grundschule \| Professioneller Generator | Addition Worksheets - German |
| French | Fiches d'Addition Maternelle CP Gratuites \| Générateur Professionnel | Addition Worksheets - French |
| Spanish | Fichas de Suma para Imprimir Gratis \| Generador de Matemáticas | Addition Worksheets - Spanish |
| Swedish | Gratis Additions Arbetsblad Förskoleklass \| Professionell Generator | Addition Worksheets - Swedish |

**Implementation Location:** `frontend/content/product-pages/{locale}/{app}.ts` → `seo.title`

### 2.2 Meta Description Formula

**Format:** `{Action verb} + {product} + {benefit}. {Feature highlight}. {Call-to-action with time/value}.`

**Requirements:**
- Length: 150-160 characters
- Include primary keyword naturally
- Include secondary keyword
- End with value proposition or CTA
- Language-appropriate, not translated

**Examples:**

```
English (156 chars):
Create professional addition worksheets with our math worksheet generator. Generate custom printable worksheets for kindergarten. Download PDF in 3 minutes.

German (158 chars):
Erstellen Sie professionelle Mathe Arbeitsblätter für die Grundschule. Kostenlose Arbeitsblätter zum Ausdrucken. PDF-Download in 3 Minuten.

French (159 chars):
Créez des fiches d'addition pour la maternelle et le CP. Générateur de fiches mathématiques gratuites à imprimer. Téléchargez en PDF en 3 minutes.
```

**Implementation Location:** `frontend/content/product-pages/{locale}/{app}.ts` → `seo.description`

### 2.3 Open Graph Tags (Social Sharing)

**Required Tags:**

```typescript
openGraph: {
  title: content.seo.title,
  description: content.seo.description,
  url: `https://www.lessoncraftstudio.com/${locale}/apps/${slug}`,
  siteName: 'LessonCraftStudio',
  type: 'website',
  locale: ogLocaleMap[locale],  // NEW: Must add
  images: [{                     // NEW: Must add per-page
    url: content.seo.ogImage || `/samples/${language}/${app}/sample-1_preview.webp`,
    width: 1200,
    height: 630,
    alt: content.hero.title
  }]
}
```

**Locale Mapping for og:locale:**

```typescript
const ogLocaleMap = {
  en: 'en_US',
  de: 'de_DE',
  fr: 'fr_FR',
  es: 'es_ES',
  pt: 'pt_BR',
  it: 'it_IT',
  nl: 'nl_NL',
  sv: 'sv_SE',
  da: 'da_DK',
  no: 'nb_NO',
  fi: 'fi_FI'
};
```

### 2.4 Twitter Card Tags

```typescript
twitter: {
  card: 'summary_large_image',
  title: content.seo.title,
  description: content.seo.description,
  images: [content.seo.ogImage || `/samples/${language}/${app}/sample-1_preview.webp`]
}
```

### 2.5 Keywords Meta Tag

**Note:** While Google doesn't use meta keywords for ranking, they help with:
- Internal search relevance
- Analytics tracking
- Content organization

**Format:** 10-15 keywords, comma-separated, primary keywords first

```typescript
seo: {
  keywords: 'addition worksheets, math worksheets, kindergarten worksheets, free printable worksheets, first grade worksheets, addition practice, math worksheet generator, counting worksheets, number worksheets, printable math activities'
}
```

---

## 3. Structured Data (JSON-LD Schemas)

### 3.1 Required Schemas per Product Page

Each product page MUST include these 6 schemas:

1. **SoftwareApplication** (Primary - for rich results)
2. **BreadcrumbList** (Navigation context)
3. **FAQPage** (FAQ rich snippets) ← **CURRENTLY MISSING**
4. **HowTo** (Tutorial rich snippets) ← **CURRENTLY MISSING**
5. **ImageObject** (For each sample image) ← **CURRENTLY MISSING**
6. **Product** (For downloadable PDF samples) ← **CURRENTLY MISSING**

### 3.2 FAQPage Schema (NEW - Must Implement)

**Purpose:** Enables FAQ rich snippets in Google SERPs

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is This Addition Worksheet Generator Really Free to Use?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The addition worksheet generator requires a Core Bundle subscription costing $144 per year. However, 'free printable worksheets' describes what you create with your subscription. Generate unlimited addition worksheets without per-worksheet fees."
      }
    },
    // ... all 18 FAQ items
  ],
  "inLanguage": "en"
}
```

**Implementation:** Add to `schema-generator.ts`:

```typescript
export function generateProductPageFAQSchema(
  faqs: Array<{question: string; answer: string}>,
  locale: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    })),
    "inLanguage": locale
  };
}
```

### 3.3 HowTo Schema (NEW - Must Implement)

**Purpose:** Enables How-To rich snippets showing steps

```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Create Addition Worksheets in 5 Easy Steps",
  "description": "Creating professional addition worksheets takes less than 3 minutes with our generator.",
  "totalTime": "PT3M",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Select Images for Your Addition Worksheets",
      "text": "Start by choosing images for your math worksheets. Browse over 3000 child-friendly images organized by theme.",
      "image": "https://www.lessoncraftstudio.com/samples/english/addition/sample-1.jpeg"
    },
    // ... all 5 steps
  ],
  "inLanguage": "en"
}
```

### 3.4 ImageObject Schema (NEW - Critical for Google Images)

**Purpose:** Enables image rich results and Google Image Search visibility

**Must be generated for EACH sample image:**

```json
{
  "@context": "https://schema.org",
  "@type": "ImageObject",
  "contentUrl": "https://www.lessoncraftstudio.com/samples/english/addition/addition_worksheet portrait.jpeg",
  "url": "https://www.lessoncraftstudio.com/en/apps/addition-worksheets",
  "name": "Addition Worksheet Portrait Mode - Kindergarten Math",
  "description": "Addition worksheet portrait mode with colorful image counting for kindergarten students",
  "caption": "Free printable addition worksheet with colorful counting images for kindergarten math practice",
  "width": 2480,
  "height": 3508,
  "encodingFormat": "image/jpeg",
  "thumbnailUrl": "https://www.lessoncraftstudio.com/samples/english/addition/addition_worksheet portrait_thumb.webp",
  "license": "https://www.lessoncraftstudio.com/terms",
  "acquireLicensePage": "https://www.lessoncraftstudio.com/pricing",
  "creditText": "LessonCraftStudio",
  "copyrightNotice": "© 2024 LessonCraftStudio",
  "creator": {
    "@type": "Organization",
    "name": "LessonCraftStudio"
  },
  "associatedArticle": {
    "@type": "WebPage",
    "url": "https://www.lessoncraftstudio.com/en/apps/addition-worksheets"
  }
}
```

**Implementation for each sample in content file:**

```typescript
samples: {
  items: [
    {
      id: '1',
      worksheetSrc: '/samples/english/addition/addition_worksheet portrait.jpeg',
      answerKeySrc: '/samples/english/addition/addition_answer_key portrait.jpeg',
      altText: 'Addition worksheet portrait mode with colorful image counting for kindergarten',
      pdfDownloadUrl: '/samples/english/addition/addition_worksheet portrait.pdf',
      // NEW: Rich image metadata
      imageSchema: {
        name: 'Addition Worksheet Portrait Mode - Kindergarten Math',
        description: 'Addition worksheet portrait mode with colorful image counting for kindergarten students',
        caption: 'Free printable addition worksheet with colorful counting images for kindergarten math practice',
        width: 2480,
        height: 3508
      }
    }
  ]
}
```

### 3.5 Product Schema for PDF Downloads (NEW)

**Purpose:** Mark downloadable PDFs as products for rich results

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Addition Worksheet PDF - Portrait Mode",
  "description": "Free printable addition worksheet with colorful image counting for kindergarten",
  "image": "https://www.lessoncraftstudio.com/samples/english/addition/addition_worksheet portrait.jpeg",
  "brand": {
    "@type": "Brand",
    "name": "LessonCraftStudio"
  },
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
    "url": "https://www.lessoncraftstudio.com/samples/english/addition/addition_worksheet portrait.pdf"
  },
  "category": "Educational Materials > Math Worksheets"
}
```

---

## 4. Image SEO for Google Image Search

> ⚠️ **MANDATORY: IMAGE ALT TEXT OPTIMIZATION** ⚠️
>
> Every sample image on every product page MUST have keyword-optimized alt text.
> This is NOT optional. Images without proper alt text will NOT appear in Google Image searches.
> When users search for keywords like "word search worksheets" or "kindergarten worksheets",
> our sample images MUST appear in the results.

### 4.0 MANDATORY Alt Text Requirements (DO NOT SKIP)

**Why This Matters:**
- Google Image Search drives 20-30% of educational worksheet traffic
- Users searching "[keyword] + worksheets" often click on image results first
- Properly optimized alt text = FREE organic traffic from Google Images
- Missing or generic alt text = INVISIBLE to Google Image Search

**REQUIRED Alt Text Formula:**

```
{App-Specific Keyword} + {Universal Keyword} + {Variant/Mode} + {Educational Context}
```

**Character Length:** 80-150 characters (optimal for Google)

**MANDATORY Elements in EVERY Sample Alt Text:**
1. **Primary app-specific keyword** (e.g., "word search worksheets", "addition worksheets")
2. **At least one universal keyword** (e.g., "free printable worksheets", "worksheet for kindergarten")
3. **Variant description** (e.g., "portrait mode", "landscape", "with answer key")
4. **Educational context** (e.g., "for kindergarten", "first grade math practice")

**CORRECT Examples:**

```typescript
// Word Search - English
altText: 'Word search worksheets free printable - portrait mode vocabulary puzzles for kindergarten and first grade'
altText: 'Word search generator printable worksheets - landscape puzzle with colorful images for kids'
altText: 'Free word search worksheets with custom word list - sight words practice for first grade'

// Addition - English
altText: 'Free printable addition worksheets for kindergarten - colorful counting pictures math practice'
altText: 'Addition worksheets with answer key - first grade math worksheet for kids'

// German Example
altText: 'Kostenlose Arbeitsblätter Wortsuchrätsel - Grundschule Wortschatz Übungen zum Ausdrucken'

// French Example
altText: 'Fiches mots cachés gratuites à imprimer - jeux de vocabulaire maternelle et CP'

// Spanish Example
altText: 'Sopa de letras para imprimir gratis - fichas vocabulario preescolar y primaria'
```

**WRONG Examples (DO NOT USE):**

```typescript
// Too generic - no keywords
altText: 'Word search puzzle portrait mode'  // ❌ WRONG

// Missing universal keywords
altText: 'Word search with themed images'  // ❌ WRONG

// Too short - missing context
altText: 'Addition worksheet'  // ❌ WRONG

// Not language-appropriate
altText: 'German word search worksheet'  // ❌ WRONG (should be in German!)
```

**Implementation Checklist for EACH Sample Image:**

- [ ] Contains primary app-specific keyword (e.g., "word search worksheets")
- [ ] Contains at least one universal keyword (e.g., "free printable", "worksheet for kids")
- [ ] Describes the specific variant (portrait/landscape/custom/etc.)
- [ ] Includes target audience (kindergarten/first grade/kids)
- [ ] Is in the SAME LANGUAGE as the page (German pages need German alt text!)
- [ ] Length is 80-150 characters
- [ ] Reads naturally (not keyword stuffing)

### 4.1 Image File Naming Convention

**Current:** `addition_worksheet portrait.jpeg`

**Optimal:** `{keyword}-{variant}-{language}.jpeg`

**Examples:**
- `addition-worksheet-kindergarten-counting-english.jpeg`
- `mathe-arbeitsblatt-grundschule-addition-german.jpeg`
- `fiche-addition-maternelle-cp-french.jpeg`

### 4.2 Alt Text Optimization (Reinforced)

**⚠️ REMINDER: This is MANDATORY for Google Image Search visibility!**

**Formula:** `{App-Specific Keyword} + {Universal Keyword} + {Variant} + {Educational Context}`

**Requirements:**
- **80-150 characters** (optimal range)
- **MUST include primary app-specific keyword** (e.g., "word search worksheets")
- **MUST include at least one universal keyword** (e.g., "free printable worksheets")
- Be genuinely descriptive (accessibility compliant)
- **MUST be in the same language as the page** (German page = German alt text!)

**Transformation Examples:**

| ❌ Generic Alt Text | ✅ Optimized Alt Text |
|-----------------|-------------------|
| Word search puzzle portrait mode with themed images | Word search worksheets free printable - portrait vocabulary puzzles for kindergarten kids |
| Addition worksheet portrait mode with colorful image counting | Free printable addition worksheets for kindergarten - colorful counting pictures for math practice |
| Landscape word search with picture clues | Word search generator printable worksheets - landscape puzzle with images for first grade |
| Custom word list word search | Free word search worksheets custom word list - sight words and vocabulary practice for kids |

**Complete Language Examples:**

```typescript
// ENGLISH - Word Search
altText: 'Word search worksheets free printable - portrait vocabulary puzzles for kindergarten and first grade'
altText: 'Word search generator printable worksheets - landscape word puzzle with colorful images for kids'
altText: 'Free word search worksheets with custom word list - sight words practice worksheet for kindergarten'

// GERMAN - Wortsuchrätsel
altText: 'Wortsuchrätsel Arbeitsblätter kostenlos zum Ausdrucken - Hochformat Wortschatz Übungen für Grundschule'
altText: 'Wortsuchrätsel Generator Arbeitsblatt - Querformat Buchstabenrätsel mit Bildern für Kinder'

// FRENCH - Mots Cachés
altText: 'Mots cachés fiches gratuites à imprimer - puzzles vocabulaire portrait pour maternelle et CP'
altText: 'Générateur mots cachés fiches imprimables - jeux de lettres paysage pour enfants'

// SPANISH - Sopa de Letras
altText: 'Sopa de letras fichas gratis para imprimir - puzzles vocabulario vertical para preescolar'
altText: 'Generador sopa de letras fichas imprimibles - juegos de palabras horizontal para niños'
```

### 4.3 Image Title Attribute (NEW - Must Implement)

Add `title` attribute to all images in SampleGallery.tsx:

```tsx
<Image
  src={sample.worksheetSrc}
  alt={sample.altText}
  title={sample.imageTitle || sample.altText}  // NEW
  fill
  className="object-cover"
  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
/>
```

### 4.4 Figure/Figcaption Semantic HTML (NEW - Must Implement)

Replace current thumbnail containers with semantic HTML:

```tsx
// Current (SampleGallery.tsx)
<div className="relative aspect-[3/4]">
  <Image src={...} alt={...} />
</div>

// Optimized
<figure className="relative aspect-[3/4]">
  <Image src={...} alt={...} title={...} />
  <figcaption className="sr-only">
    {sample.caption || sample.altText}
  </figcaption>
</figure>
```

### 4.5 Image Sitemap (NEW - Must Implement)

Create `/app/sitemap-images.ts`:

```typescript
export default function imagesSitemap(): MetadataRoute.Sitemap {
  const images = [];

  for (const locale of locales) {
    for (const app of apps) {
      const samples = getProductSamples(locale, app);
      for (const sample of samples) {
        images.push({
          loc: `https://www.lessoncraftstudio.com/samples/${localeToFolder[locale]}/${app}/${sample.filename}`,
          title: sample.imageTitle,
          caption: sample.caption,
          license: 'https://www.lessoncraftstudio.com/terms'
        });
      }
    }
  }

  return images;
}
```

### 4.6 Image Loading Optimization

```tsx
// For above-fold images (first 4 thumbnails)
<Image priority={index < 4} ... />

// For main preview
<Image priority={currentIndex === 0} ... />

// Explicit dimensions for CLS prevention
<Image width={800} height={1132} ... />
```

---

## 5. Keyword Implementation Strategy

### 5.1 The 10×10 Rule

**Target:** Each product page must include the 10 primary keywords for that language, with each keyword appearing MINIMUM 10 times in H2/H3 titles.

**Placement Rules:**
- Keywords appear in H2/H3 titles ONLY (not body text)
- Never keyword stuff in paragraphs
- Distribute across all 7 sections
- Track per-section to ensure coverage

### 5.2 Section Distribution Target

| Section | H2/H3 Count | Keyword Target |
|---------|-------------|----------------|
| Section 1 (Hero) | 0 | 0 (intro only) |
| Section 2 (Features) | 8 | 15-20 keywords |
| Section 3 (How-To) | 6 | 12-15 keywords |
| Section 4 (Use Cases) | 11 | 20-25 keywords |
| Section 5 (Tips) | 8 | 15-18 keywords |
| Section 6 (Pricing) | 1 | 0 (CTA only) |
| Section 7 (FAQ) | 11 | 25-30 keywords |
| **TOTAL** | **45+** | **100+** |

### 5.3 Keyword Tracking Template

Use this template for each page:

```
KEYWORD TRACKING - {App Name} - {Language}

=== UNIVERSAL PRIORITY KEYWORDS (5+ instances each) ===
TARGET: Each universal keyword must appear MINIMUM 5 times in H2/H3 titles

[ ] U1. Free worksheet / {translation}: 0/5
[ ] U2. Free worksheet for kids / {translation}: 0/5
[ ] U3. Free worksheets / {translation}: 0/5
[ ] U4. Free printables / {translation}: 0/5
[ ] U5. Worksheet for kids / {translation}: 0/5
[ ] U6. Worksheet for kindergarten / {translation}: 0/5
[ ] U7. Worksheet / {translation}: 0/5

=== APP-SPECIFIC KEYWORDS (10+ instances each) ===
TARGET: Each keyword must appear MINIMUM 10 times in H2/H3 titles ONLY

[ ] 1. {Primary Keyword 1}: 0/10
[ ] 2. {Primary Keyword 2}: 0/10
[ ] 3. {Primary Keyword 3}: 0/10
[ ] 4. {Primary Keyword 4}: 0/10
[ ] 5. {Primary Keyword 5}: 0/10
[ ] 6. {Primary Keyword 6}: 0/10
[ ] 7. {Primary Keyword 7}: 0/10
[ ] 8. {Primary Keyword 8}: 0/10
[ ] 9. {Primary Keyword 9}: 0/10
[ ] 10. {Primary Keyword 10}: 0/10

TOTAL TARGET:
- Universal keywords: 35+ instances (7 × 5)
- App-specific keywords: 100+ instances (10 × 10)
- GRAND TOTAL: 135+ keyword instances in H2/H3 titles

After each section, update counts.
```

---

## 6. Language-Specific Keyword Reference

### 6.1 English Keywords (K-3)

| Rank | Keyword | Category |
|------|---------|----------|
| 1 | Kindergarten worksheets | General |
| 2 | Math worksheets | Math |
| 3 | Sight words worksheets | Literacy |
| 4 | Phonics worksheets | Literacy |
| 5 | Alphabet worksheets / ABC worksheets | Literacy |
| 6 | Addition worksheets | Math |
| 7 | Tracing worksheets / Letter tracing worksheets | Motor |
| 8 | Free printable worksheets | General |
| 9 | Coloring worksheets | Art |
| 10 | First grade worksheets | General |

**High-value modifiers:** free, printable, PDF, download

### 6.2 German Keywords (Grundschule)

| Rank | Keyword | Translation |
|------|---------|-------------|
| 1 | Arbeitsblätter Grundschule | Elementary worksheets |
| 2 | Mathe Arbeitsblätter | Math worksheets |
| 3 | Vorschule Arbeitsblätter | Preschool worksheets |
| 4 | Einmaleins | Multiplication tables |
| 5 | Schwungübungen | Pre-writing exercises |
| 6 | Buchstaben lernen | Learning letters |
| 7 | Ausmalbilder / Malvorlagen | Coloring pages |
| 8 | Kostenlose Arbeitsblätter | Free worksheets |
| 9 | Rechnen lernen / 1. Klasse | Learning math |
| 10 | Deutsch Arbeitsblätter | German worksheets |

**Education system:** Grundschule (grades 1-4), Vorschule (preschool)
**Grade terms:** 1. Klasse, 2. Klasse, 3. Klasse

### 6.3 French Keywords (Maternelle & Primaire)

| Rank | Keyword | Translation |
|------|---------|-------------|
| 1 | Fiches maternelle | Preschool worksheets |
| 2 | Exercices CP / CE1 | 1st/2nd grade exercises |
| 3 | Graphisme maternelle | Pre-writing skills |
| 4 | Coloriage / à imprimer | Coloring pages |
| 5 | Apprendre à lire | Learning to read |
| 6 | Exercices maths / Calcul | Math exercises |
| 7 | Alphabet / les lettres | Alphabet/letters |
| 8 | Tables de multiplication | Multiplication tables |
| 9 | Fiches à imprimer gratuit | Free printable sheets |
| 10 | Écriture / cursive | Writing/cursive |

**Education system:** Maternelle (PS/MS/GS ages 3-6), CP (age 6-7), CE1 (age 7-8)

### 6.4 Spanish Keywords (Educación Infantil & Primaria)

| Rank | Keyword | Translation |
|------|---------|-------------|
| 1 | Fichas para imprimir | Printable worksheets |
| 2 | Fichas infantil / preescolar | Preschool worksheets |
| 3 | Grafomotricidad | Pre-writing skills |
| 4 | Lectoescritura | Reading-writing |
| 5 | Ejercicios matemáticas | Math exercises |
| 6 | Colorear / Dibujos para colorear | Coloring |
| 7 | Abecedario / las letras | Alphabet/letters |
| 8 | Números / los números | Numbers |
| 9 | Tablas de multiplicar | Multiplication tables |
| 10 | Fichas gratis / material educativo | Free worksheets |

**Education system:** Educación Infantil (ages 3-6), Primaria (ages 6-12)

### 6.5 Portuguese Keywords (Brazil)

| Rank | Keyword | Translation |
|------|---------|-------------|
| 1 | Atividades para imprimir | Activities to print |
| 2 | Atividades de alfabetização | Literacy activities |
| 3 | Atividades educação infantil | Preschool activities |
| 4 | Atividades de matemática | Math activities |
| 5 | Coordenação motora | Motor coordination |
| 6 | Desenhos para colorir | Coloring pages |
| 7 | Atividades vogais / alfabeto | Vowels/alphabet |
| 8 | Letra cursiva / Pontilhado | Cursive/dotted |
| 9 | Atividades 1º ano / 2º ano | 1st/2nd grade |
| 10 | Tabuada | Multiplication tables |

**Education system:** Educação Infantil (ages 0-5), 1º ano (age 6-7)

### 6.6 Italian Keywords

| Rank | Keyword | Translation |
|------|---------|-------------|
| 1 | Schede didattiche | Educational worksheets |
| 2 | Schede didattiche scuola primaria | Primary school |
| 3 | Pregrafismo | Pre-writing |
| 4 | Schede matematica | Math worksheets |
| 5 | Disegni da colorare | Coloring pages |
| 6 | Tabelline | Multiplication tables |
| 7 | Alfabeto / Lettere | Alphabet/letters |
| 8 | Schede italiano classe prima | 1st grade Italian |
| 9 | Scuola dell'infanzia | Kindergarten |
| 10 | Numeri da stampare | Numbers to print |

**Education system:** Scuola dell'Infanzia (ages 3-6), Scuola Primaria (ages 6-11)

### 6.7 Dutch Keywords

| Rank | Keyword | Translation |
|------|---------|-------------|
| 1 | Werkbladen groep 3 | Worksheets group 3 |
| 2 | Werkbladen kleuters / Groep 1 2 | Kindergarten |
| 3 | Rekenen werkbladen | Math worksheets |
| 4 | Kleurplaten | Coloring pages |
| 5 | Letters leren / Schrijven oefenen | Learning letters |
| 6 | Oefenbladen gratis | Free practice sheets |
| 7 | Tafels oefenen | Tables practice |
| 8 | Veilig leren lezen | Reading method |
| 9 | Fijne motoriek | Fine motor skills |
| 10 | Sommen tot 20 | Sums to 20 |

**Education system:** Groep 1-2 (ages 4-6), Groep 3-5 (ages 6-9)

### 6.8 Swedish Keywords

| Rank | Keyword | Translation |
|------|---------|-------------|
| 1 | Arbetsblad gratis | Free worksheets |
| 2 | Målarbilder barn | Coloring for children |
| 3 | Bokstäver lära sig | Learning letters |
| 4 | Matematik arbetsblad | Math worksheets |
| 5 | Multiplikationstabellen | Multiplication tables |
| 6 | Siffror och tal | Numbers and digits |
| 7 | Finmotorik övningar | Fine motor exercises |
| 8 | Klockan lära sig | Learning to tell time |
| 9 | Förskoleklass material | Preschool materials |
| 10 | Addition och subtraktion | Addition/subtraction |

**Education system:** Förskoleklass (age 6), Årskurs 1-3 (ages 7-9)

### 6.9 Danish Keywords

| Rank | Keyword | Translation |
|------|---------|-------------|
| 1 | Opgaver til print | Tasks for printing |
| 2 | Matematikopgaver | Math exercises |
| 3 | Lære bogstaver | Learning letters |
| 4 | Malebog / Farvelægning | Coloring |
| 5 | Arbejdsark / Kopiark | Worksheets |
| 6 | Finmotorik øvelser | Fine motor exercises |
| 7 | 0. klasse opgaver / 1. klasse | Grade 0/1 tasks |
| 8 | Gangetabeller | Multiplication tables |
| 9 | Læse og skrive / Stavning | Reading/spelling |
| 10 | Gratis skoleopgaver | Free school tasks |

**Education system:** 0. klasse (age 5-6), Indskoling (grades 0-3)

### 6.10 Norwegian Keywords

| Rank | Keyword | Translation |
|------|---------|-------------|
| 1 | Arbeidsark gratis | Free worksheets |
| 2 | Fargeleggingsbilder | Coloring pages |
| 3 | Bokstaver lære skrive | Learning letters |
| 4 | Matematikk oppgaver | Math exercises |
| 5 | Gangetabellen | Multiplication tables |
| 6 | Tall og telling | Numbers/counting |
| 7 | Finmotorikk øvelser | Fine motor exercises |
| 8 | Addisjon og subtraksjon | Addition/subtraction |
| 9 | Oppgavehefter barn | Task booklets |
| 10 | Lesetrening / Leseforståelse | Reading practice |

**Education system:** 1. trinn, 2. trinn, 3. trinn (grades 1-3)

### 6.11 Finnish Keywords

| Rank | Keyword | Translation |
|------|---------|-------------|
| 1 | Tulostettavat tehtävät ilmainen | Free printable tasks |
| 2 | Värityskuvia tulostettava | Coloring printable |
| 3 | Kirjaimet harjoittelu | Letter practice |
| 4 | Matematiikka tehtävät | Math exercises |
| 5 | Kertotaulut tulostettava | Multiplication tables |
| 6 | Yhteenlasku ja vähennyslasku | Addition/subtraction |
| 7 | Hienomotoriikka harjoitukset | Fine motor exercises |
| 8 | Pisteestä pisteeseen | Dot-to-dot |
| 9 | Esiopetus materiaali ilmainen | Free preschool |
| 10 | Lukemaan oppiminen | Learning to read |

**Education system:** Esiopetus (age 6), 1. luokka, 2. luokka (grades 1-2)

---

## 7. Content Structure Requirements

### 7.1 Heading Hierarchy

```
H1: {Primary Keyword} (ONE per page, in Hero)
├── H2: Section Title with Keyword
│   ├── H3: Feature/Step with Keyword
│   ├── H3: Feature/Step with Keyword
│   └── H3: Feature/Step with Keyword
├── H2: Section Title with Keyword
│   ├── H3: Subsection with Keyword
│   └── H3: Subsection with Keyword
```

### 7.2 Section Content Requirements

**Section 1: Hero (400-500 words)**
- H1 title only (no H2/H3)
- 4 paragraphs of benefit-focused content
- Primary keyword in first paragraph
- Include trust signals

**Section 2: Features (1000-1200 words)**
- 1 H2 + 7 H3 titles
- Each H3 contains a keyword
- 150-200 words per feature

**Section 3: How-To (1200-1400 words)**
- 1 H2 + 5 H3 step titles
- Each step includes relevant keyword
- Step descriptions 200-250 words each

**Section 4: Use Cases (2000-2500 words)**
- 1 H2 + 6-10 H3 persona titles
- Keyword-rich persona descriptions
- Include customer quotes

**Section 5: Tips/Best Practices (1500-1800 words)**
- 1 H2 + 7 H3 tip titles
- Cross-references to other worksheet types
- Keywords distributed evenly

**Section 6: Pricing (400-500 words)**
- 1 H2 (no H3s)
- Clear pricing with value proposition
- No keyword stuffing

**Section 7: FAQ (2000-2500 words)**
- 1 H2 + 10-18 H3 questions
- Questions ARE the keywords
- Comprehensive answers (50-200 words each)

### 7.3 Internal Linking

Each product page must include:
- 6 related app links in RelatedApps section
- Contextual links within body content
- Breadcrumb links
- Language switcher links

---

## 8. hreflang Implementation

### 8.1 Page-Level hreflang (in Metadata)

```typescript
alternates: {
  canonical: `https://www.lessoncraftstudio.com/${locale}/apps/${slug}`,
  languages: {
    'en': 'https://www.lessoncraftstudio.com/en/apps/addition-worksheets',
    'de': 'https://www.lessoncraftstudio.com/de/apps/addition-arbeitsblatter',
    'fr': 'https://www.lessoncraftstudio.com/fr/apps/fiches-addition',
    'es': 'https://www.lessoncraftstudio.com/es/apps/fichas-suma',
    'pt': 'https://www.lessoncraftstudio.com/pt/apps/atividades-adicao',
    'it': 'https://www.lessoncraftstudio.com/it/apps/schede-addizione',
    'nl': 'https://www.lessoncraftstudio.com/nl/apps/werkbladen-optellen',
    'sv': 'https://www.lessoncraftstudio.com/sv/apps/arbetsblad-addition',
    'da': 'https://www.lessoncraftstudio.com/da/apps/opgaver-addition',
    'no': 'https://www.lessoncraftstudio.com/no/apps/arbeidsark-addisjon',
    'fi': 'https://www.lessoncraftstudio.com/fi/apps/tehtavat-yhteenlasku',
    'x-default': 'https://www.lessoncraftstudio.com/en/apps/addition-worksheets'
  }
}
```

### 8.2 Key hreflang Rules

1. **x-default** always points to English version
2. Use **localized slugs** not translated slugs
3. **Bidirectional** references required
4. Include in **both** page metadata AND sitemap
5. **Canonical** URL must match one hreflang URL exactly

---

## 9. Technical SEO Checklist

### 9.1 Page Load Performance

- [ ] First Contentful Paint < 1.8s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Cumulative Layout Shift < 0.1
- [ ] Time to Interactive < 3.8s

### 9.2 Image Optimization

- [ ] All images have _thumb.webp (400px) versions
- [ ] All images have _preview.webp (800px) versions
- [ ] Explicit width/height on all Image components
- [ ] Lazy loading on below-fold images
- [ ] Priority loading on above-fold images

### 9.3 Structured Data Validation

Test all schemas at: https://search.google.com/test/rich-results

- [ ] SoftwareApplication schema valid
- [ ] BreadcrumbList schema valid
- [ ] FAQPage schema valid
- [ ] HowTo schema valid
- [ ] ImageObject schemas valid

### 9.4 Crawlability

- [ ] Page indexed in Google Search Console
- [ ] No robots noindex directives
- [ ] Canonical URL correct
- [ ] hreflang tags validated
- [ ] Internal links working

---

## 10. Per-Page Implementation Checklist

Use this checklist when optimizing each of the 363 product pages:

### Pre-Optimization

- [ ] Identify the app name
- [ ] Identify the language/locale
- [ ] Get the 7 UNIVERSAL PRIORITY keywords for this language (from Section 0)
- [ ] Get the 10 app-specific keywords for this language (from Section 6)
- [ ] Review existing content file

### Metadata

- [ ] Title tag: 55-70 chars, primary keyword first
- [ ] Meta description: 150-160 chars, includes CTA
- [ ] Keywords meta: 10-15 keywords, comma-separated
- [ ] Canonical URL correct
- [ ] og:title set
- [ ] og:description set
- [ ] og:image set (app-specific)
- [ ] og:locale set
- [ ] twitter:card set
- [ ] twitter:image set

### Content

- [ ] H1 contains primary keyword (ONE H1 only)
- [ ] 50+ H2/H3 headings total
- [ ] **UNIVERSAL KEYWORDS:** Each of 7 universal keywords appears 5+ times in H2/H3
- [ ] **APP-SPECIFIC KEYWORDS:** Each of 10 keywords appears 10+ times in H2/H3
- [ ] Total keyword instances: 135+ (35 universal + 100 app-specific)
- [ ] 5500-6000 words total content
- [ ] 18+ FAQ questions
- [ ] 5 how-to steps
- [ ] 7 features
- [ ] 6 use cases/personas
- [ ] 6 related apps

### Images

- [ ] All sample images have optimized alt text
- [ ] Alt text includes primary keyword
- [ ] Alt text is language-appropriate
- [ ] Title attributes added
- [ ] Figure/figcaption implemented
- [ ] ImageObject schema for each sample

### Structured Data

- [ ] SoftwareApplication schema present
- [ ] BreadcrumbList schema present
- [ ] FAQPage schema present
- [ ] HowTo schema present
- [ ] ImageObject schemas present
- [ ] All schemas validate in Rich Results Test

### Language/International

- [ ] hreflang tags for all 11 languages
- [ ] x-default points to English
- [ ] Slug is language-appropriate
- [ ] Content uses local education terminology
- [ ] Pricing shows appropriate currency context

### Final Verification

- [ ] Page loads < 3 seconds
- [ ] No console errors
- [ ] Mobile responsive
- [ ] All links working
- [ ] PDF downloads working
- [ ] **UNIVERSAL keywords: 7 keywords × 5 instances = 35+ (100%+)**
- [ ] **APP-SPECIFIC keywords: 10 keywords × 10 instances = 100+ (100%+)**
- [ ] **GRAND TOTAL: 135+ keyword instances in H2/H3**

### Deployment (MANDATORY - DO NOT SKIP)

- [ ] Changes committed to git with descriptive message
- [ ] Changes pushed to remote repository
- [ ] Deployment script executed successfully
- [ ] Live page verified at production URL

---

## Implementation Priority

### Phase 0: UNIVERSAL KEYWORD INTEGRATION (HIGHEST PRIORITY)
**Must be done FIRST for all 363 pages**
1. Implement 7 universal priority keywords in each language
2. Ensure each universal keyword appears 5+ times in H2/H3
3. Combine universal keywords with app-specific terms
4. Update all FAQ questions to include universal keywords

### Phase 1: Critical Schema Fixes (All 363 Pages)
1. Add FAQPage schema
2. Add HowTo schema
3. Add og:locale tag
4. Add app-specific og:image

### Phase 2: Image SEO (All 363 Pages)
1. Implement ImageObject schema for each sample
2. Add title attributes to images
3. Implement figure/figcaption
4. Optimize alt text per language (include universal keywords)
5. Create image sitemap

### Phase 3: Content Optimization (Per Page)
1. Verify 7×5 universal keyword rule
2. Verify 10×10 app-specific keyword rule
3. Update H2/H3 titles as needed
4. Expand FAQ if < 18 questions
5. Add language-specific content

### Phase 4: Technical Polish
1. Validate all structured data
2. Test page speed
3. Verify hreflang bidirectionality
4. Submit to Google Search Console

---

## File Locations Reference

| Component | Path |
|-----------|------|
| Product Page Template | `frontend/app/[locale]/apps/[slug]/page.tsx` |
| Content Files | `frontend/content/product-pages/{locale}/{app}.ts` |
| Schema Generator | `frontend/lib/schema-generator.ts` |
| SampleGallery Component | `frontend/components/product-page/SampleGallery.tsx` |
| Sitemap Generator | `frontend/app/sitemap.ts` |
| Middleware (i18n) | `frontend/middleware.ts` |
| Keywords Reference | `INDIVIDUAL APP PAGES/keywords.txt` |

---

**Document Version:** 1.0
**Created:** January 2026
**Purpose:** Reference guide for applying professional SEO to each of 363 product pages individually
