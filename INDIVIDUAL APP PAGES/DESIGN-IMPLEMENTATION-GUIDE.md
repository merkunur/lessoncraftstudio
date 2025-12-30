# Product Page Design & Implementation Guide

---

## 🚨🚨🚨 STOP! DEPLOYMENT IS MANDATORY - NOT OPTIONAL 🚨🚨🚨

```
╔═══════════════════════════════════════════════════════════════════════════════════╗
║                                                                                   ║
║   THE TASK IS NOT COMPLETE UNTIL THE PAGE IS LIVE ON PRODUCTION                   ║
║                                                                                   ║
║   Creating files locally and verifying "npm run build" passes is NOT enough!     ║
║                                                                                   ║
║   YOU MUST:                                                                       ║
║   1. git commit && git push                                                       ║
║   2. Deploy to server (git pull, npm run build, pm2 restart)                     ║
║   3. Copy samples to standalone directory on server                              ║
║   4. Verify LIVE URL returns HTTP 200:                                           ║
║      curl https://www.lessoncraftstudio.com/en/apps/{app-slug}                   ║
║                                                                                   ║
║   ❌ "Build passed locally" = NOT DONE                                            ║
║   ❌ "Files created" = NOT DONE                                                   ║
║   ❌ "Committed to git" = NOT DONE                                                ║
║   ✅ "Live URL returns 200" = DONE                                                ║
║                                                                                   ║
║   IF YOU SAY "DONE" BEFORE VERIFYING THE LIVE URL, YOU ARE WRONG.                ║
║                                                                                   ║
╚═══════════════════════════════════════════════════════════════════════════════════╝
```

### Complete Deployment Commands (COPY-PASTE READY)

```bash
# Step 1: Commit and push
git add frontend/content/product-pages/en/{app-slug}.ts
git add "frontend/public/samples/english/{app-name}/"
git add frontend/app/[locale]/apps/[slug]/page.tsx
git commit -m "feat: Add {App Name} product page (English)"
git push origin main

# Step 2: Deploy to server
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey "SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU" root@65.108.5.250 "cd /opt/lessoncraftstudio && git pull && cd frontend && npm run build && cp -r .next/static .next/standalone/.next/static && pm2 restart lessoncraftstudio"

# Step 3: Copy samples to standalone (CRITICAL - samples won't load without this!)
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey "SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU" root@65.108.5.250 "cp -r '/opt/lessoncraftstudio/frontend/public/samples/english/{app-name}' '/opt/lessoncraftstudio/frontend/.next/standalone/public/samples/english/' && pm2 restart lessoncraftstudio"

# Step 4: VERIFY LIVE URL (MUST return 200!)
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey "SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU" root@65.108.5.250 "curl -s -o /dev/null -w '%{http_code}' 'https://www.lessoncraftstudio.com/en/apps/{app-slug}'"
# Expected output: 200

# Step 5: VERIFY SAMPLE IMAGE (MUST return 200!)
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey "SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU" root@65.108.5.250 "curl -s -o /dev/null -w '%{http_code}' 'https://www.lessoncraftstudio.com/samples/english/{app-name}/{filename}.jpeg'"
# Expected output: 200
```

**ONLY AFTER BOTH CURL COMMANDS RETURN 200, THE TASK IS COMPLETE.**

---

## ⚠️⚠️⚠️ CRITICAL: COLLAPSIBLE TEXT - READ THIS FIRST ⚠️⚠️⚠️

```
╔═══════════════════════════════════════════════════════════════════════════════════╗
║                                                                                   ║
║   ALL LONG TEXT SECTIONS MUST BE COLLAPSIBLE WITH ONLY 3 SENTENCES SHOWN         ║
║                                                                                   ║
║   This applies to:                                                                ║
║   • Hero description                                                              ║
║   • Feature descriptions                                                          ║
║   • Use case descriptions                                                         ║
║   • How-to step descriptions                                                      ║
║   • FAQ answers                                                                   ║
║   • ANY text longer than 3 sentences                                              ║
║                                                                                   ║
║   DEFAULT STATE = COLLAPSED (showing only 3 sentences)                            ║
║   User clicks "Read more" to expand                                               ║
║                                                                                   ║
║   ❌ WRONG: useState(true)   - Shows all text                                     ║
║   ✅ RIGHT: useState(false)  - Shows only 3 sentences                             ║
║                                                                                   ║
╚═══════════════════════════════════════════════════════════════════════════════════╝
```

**THE COMPONENTS ALREADY HANDLE THIS AUTOMATICALLY.**
**YOU JUST PUT THE FULL TEXT IN THE CONTENT FILE.**
**THE COMPONENT WILL COLLAPSE IT TO 3 SENTENCES BY DEFAULT.**

**DO NOT:**
- Manually truncate text in the content file
- Worry about text length - components handle display
- Set any expansion state - default is collapsed

---

## 🌍🌍🌍 CRITICAL: 100% NATIVE LANGUAGE - ZERO ENGLISH ON NON-ENGLISH PAGES 🌍🌍🌍

```
╔═══════════════════════════════════════════════════════════════════════════════════╗
║                                                                                   ║
║   EVERY SINGLE WORD ON THE PAGE MUST BE IN THE TARGET LANGUAGE                    ║
║                                                                                   ║
║   When creating a Swedish page → EVERYTHING is Swedish                            ║
║   When creating a German page → EVERYTHING is German                              ║
║   When creating a French page → EVERYTHING is French                              ║
║                                                                                   ║
║   THIS INCLUDES:                                                                  ║
║   ✗ Product names: "Core Bundle" → "Grundpaketet" (Swedish)                       ║
║   ✗ UI labels: "Read more" → "Läs mer" (Swedish)                                  ║
║   ✗ Badge text: "Features" → "Funktioner" (Swedish)                               ║
║   ✗ Step labels: "Step 1" → "Steg 1" (Swedish)                                    ║
║   ✗ Completion text: "Done!" → "Klart!" (Swedish)                                 ║
║   ✗ Trust badges: "Secure payment" → "Säker betalning" (Swedish)                  ║
║   ✗ Button text: "Start Creating" → "Börja Skapa" (Swedish)                       ║
║   ✗ Section headers: "Who It's For" → "Vem Det Är För" (Swedish)                  ║
║   ✗ Pricing: "Full Access" → "Full Tillgång" (Swedish)                            ║
║                                                                                   ║
║   NOTHING IN ENGLISH - NOT EVEN PRODUCT NAMES!                                    ║
║   "Core Bundle" is NOT a proper noun like "iPhone" - it MUST be translated!       ║
║                                                                                   ║
║   ❌ WRONG: Swedish page with "Core Bundle", "Read more", "Features"              ║
║   ✅ RIGHT: Swedish page with "Grundpaketet", "Läs mer", "Funktioner"             ║
║                                                                                   ║
║   THE TEXT MUST SOUND NATURAL TO A NATIVE SPEAKER                                 ║
║   Not literal translations - idiomatic expressions!                               ║
║                                                                                   ║
╚═══════════════════════════════════════════════════════════════════════════════════╝
```

### UI Labels That MUST Be Translated

All these fields in the content file MUST be in the target language:

| Field | English | Swedish | German | French |
|-------|---------|---------|--------|--------|
| `hero.readMoreLabel` | Read more | Läs mer | Mehr lesen | Lire plus |
| `hero.showLessLabel` | Show less | Visa mindre | Weniger anzeigen | Voir moins |
| `hero.floatingStats.time` | 3 min | 3 min | 3 Min | 3 min |
| `hero.floatingStats.action` | Create & Download | Skapa & Ladda Ner | Erstellen & Herunterladen | Créer et Télécharger |
| `hero.floatingStats.quality` | 300 DPI | 300 DPI | 300 DPI | 300 DPI |
| `samples.badgeText` | Free Samples | Gratis Exempel | Kostenlose Beispiele | Exemples Gratuits |
| `samples.downloadingLabel` | Downloading... | Laddar ner... | Wird heruntergeladen... | Téléchargement... |
| `samples.ofLabel` | of | av | von | de |
| `features.badgeText` | Features | Funktioner | Funktionen | Fonctionnalités |
| `features.trustBadges.allFeatures` | All features included | Alla funktioner ingår | Alle Funktionen enthalten | Toutes les fonctionnalités incluses |
| `features.trustBadges.noHiddenFees` | No hidden fees | Inga dolda avgifter | Keine versteckten Gebühren | Pas de frais cachés |
| `features.trustBadges.cancelAnytime` | Cancel anytime | Avsluta när som helst | Jederzeit kündbar | Annulez à tout moment |
| `howTo.badgeText` | How It Works | Så Fungerar Det | So funktioniert es | Comment ça marche |
| `howTo.stepLabel` | Step | Steg | Schritt | Étape |
| `howTo.completionTitle` | Done! | Klart! | Fertig! | Terminé ! |
| `howTo.completionSubtitle` | Your worksheet is ready | Ditt arbetsblad är redo | Ihr Arbeitsblatt ist fertig | Votre fiche est prête |
| `howTo.readyTime` | Ready in under 3 minutes | Klart på under 3 minuter | Fertig in unter 3 Minuten | Prêt en moins de 3 minutes |
| `howTo.noSkillsNeeded` | No design skills needed | Inga designkunskaper behövs | Keine Designkenntnisse erforderlich | Aucune compétence en design requise |
| `useCases.badgeText` | Who It's For | Vem Det Är För | Für wen es ist | Pour qui c'est |
| `faq.badgeText` | FAQ | Vanliga Frågor | Häufige Fragen | Questions fréquentes |
| `faq.secureCheckout` | Secure checkout | Säker betalning | Sichere Zahlung | Paiement sécurisé |
| `faq.cancelAnytime` | Cancel anytime | Avsluta när som helst | Jederzeit kündbar | Annulez à tout moment |
| `relatedApps.badgeText` | Works Great With | Fungerar Utmärkt Med | Funktioniert gut mit | Fonctionne bien avec |
| `relatedApps.exploreText` | Explore all apps | Utforska alla appar | Alle Apps erkunden | Explorer toutes les apps |
| `relatedApps.trustBadges.guarantee` | 30-day guarantee | 30 dagars garanti | 30-Tage-Garantie | Garantie 30 jours |
| `relatedApps.trustBadges.securePayment` | Secure payment | Säker betalning | Sichere Zahlung | Paiement sécurisé |
| `pricing.title` | Core Bundle | Grundpaketet | Basispaket | Forfait de Base |

### Product Names MUST Be Translated

| English | Swedish | German | French | Spanish | Italian |
|---------|---------|--------|--------|---------|---------|
| Core Bundle | Grundpaketet | Basispaket | Forfait de Base | Paquete Básico | Pacchetto Base |
| Full Access | Full Tillgång | Voller Zugang | Accès Complet | Acceso Completo | Accesso Completo |

### How to Verify: Page Language Audit

Before deploying any non-English page, search for these common English words:

```bash
# Search for English words that should NOT appear on non-English pages
grep -i "Read more\|Show less\|Features\|How It Works\|Step \|Done!\|Cancel anytime\|Core Bundle\|Full Access" content-file.ts
```

If ANY of these appear in the content file for a non-English page → FIX THEM!

---

## 8 UNBREAKABLE RULES

| # | Rule | Why It Matters |
|---|------|----------------|
| 1 | **🌍 100% NATIVE LANGUAGE** | EVERY word must be in target language - NO English on non-English pages! "Core Bundle" → "Grundpaketet" |
| 2 | **🚨 DEPLOY TO PRODUCTION** | Task is NOT complete until live URL returns HTTP 200 - local build is NOT enough! |
| 3 | **3 SENTENCES DEFAULT** | ALL long text shows only 3 sentences initially - components handle this automatically |
| 4 | NO FAKE STATS | Never invent user counts, ratings, or numbers |
| 5 | NO APP LINKS | Links go to `/signup`, `/apps`, `/pricing`, or homepage ONLY |
| 6 | FULL TEXT | Use 100% of .md content in content file - components will collapse it |
| 7 | REAL SAMPLES | Only use actual files from `samples/` folder - VERIFY THEY EXIST |
| 8 | FREE PDF | Direct download link, no login required |

---

## ⚠️ COLLAPSIBLE TEXT - DETAILED EXPLANATION ⚠️

### What Gets Collapsed (3 sentences shown by default)

| Component | Field | Collapsed? |
|-----------|-------|------------|
| HeroSection | `description` | ✅ YES - 3 sentences |
| FeaturesGrid | `feature.description` | ✅ YES - 3 sentences |
| UseCases | `useCase.description` | ✅ YES - 3 sentences |
| HowToGuide | `step.description` | ✅ YES - 3 sentences |
| FAQSection | `item.answer` | ✅ YES - 3 sentences |

### How It Works

The React components handle collapsing automatically:

```tsx
// INSIDE THE COMPONENT (already implemented)
const [isExpanded, setIsExpanded] = useState(false); // DEFAULT = COLLAPSED

const sentences = text.split(/(?<=[.!?])\s+/);
const maxSentences = 3;
const displayText = isExpanded ? text : sentences.slice(0, maxSentences).join(' ');
const needsToggle = sentences.length > maxSentences;

return (
  <>
    <p>{displayText}{!isExpanded && needsToggle && '...'}</p>
    {needsToggle && (
      <button onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? 'Show less' : 'Read more'}
      </button>
    )}
  </>
);
```

### Your Job (Content File)

Just put the FULL text. Don't truncate. Don't summarize.

```typescript
// CORRECT - Put full text, component handles display
description: `First sentence here. Second sentence here. Third sentence here. Fourth sentence here. Fifth sentence here. Sixth sentence here.`,

// WRONG - Don't manually truncate
description: `First sentence... [truncated]`,
```

---

## FILE STRUCTURE - KNOW WHERE EVERYTHING GOES

### Content Files Location
```
frontend/
└── content/
    └── product-pages/
        └── en/                              ← Language folder
            ├── addition-worksheets.ts       ← Content file
            └── word-search-worksheets.ts    ← Content file
```

**Path pattern:** `frontend/content/product-pages/{locale}/{app-slug}.ts`

**WRONG location (DO NOT USE):**
```
frontend/components/product-page/content/    ← NEVER put content files here!
```

### Sample Files Location
```
frontend/
└── public/
    └── samples/
        └── english/                         ← Language folder (full name, not code)
            ├── addition/                    ← App folder
            │   ├── addition_worksheet portrait.jpeg
            │   ├── addition_worksheet portrait.pdf
            │   └── ...
            └── wordsearch/                  ← App folder
                ├── wordsearch portrait.jpeg
                ├── wordsearch portrait.pdf
                └── ...
```

**Path pattern:** `frontend/public/samples/{language}/{app-name}/`

**URL pattern in content file:** `/samples/english/wordsearch/wordsearch portrait.pdf`

### Source Samples Location (master copies)
```
lessoncraftstudio/
└── samples/
    └── english/
        └── wordsearch/                      ← Master sample files
            ├── wordsearch portrait.jpeg
            └── ...
```

---

## 🔄 APP ID vs PRODUCT PAGE SLUG - CRITICAL DISTINCTION 🔄

```
╔═══════════════════════════════════════════════════════════════════════════════════╗
║                                                                                   ║
║   THE SYSTEM HAS TWO DIFFERENT IDENTIFIERS FOR EACH APP:                          ║
║                                                                                   ║
║   1. APP ID (internal identifier)                                                 ║
║      - Used in /apps listing grid                                                 ║
║      - Stored in apps array in AppCategories.tsx                                  ║
║      - Examples: math-puzzle, image-addition, matching-app                        ║
║                                                                                   ║
║   2. PRODUCT PAGE SLUG (SEO-optimized URL)                                        ║
║      - Used in product page URLs                                                  ║
║      - Stored in content file names and page.tsx                                  ║
║      - Examples: math-puzzle-worksheets, addition-worksheets, matching-worksheets ║
║                                                                                   ║
║   THE MAPPING BETWEEN THEM IS IN AppCard.tsx:                                     ║
║   'image-addition' → 'addition-worksheets'                                        ║
║   'matching-app' → 'matching-worksheets'                                          ║
║   'math-puzzle' → 'math-puzzle-worksheets'                                        ║
║                                                                                   ║
╚═══════════════════════════════════════════════════════════════════════════════════╝
```

### Why Two Different Identifiers?

| Identifier | Purpose | Example |
|------------|---------|---------|
| **App ID** | Internal system identifier, often technical or legacy names | `image-addition`, `matching-app`, `big-small-app` |
| **Product Page Slug** | SEO-optimized URL that users see, includes "worksheets" keyword | `addition-worksheets`, `matching-worksheets`, `big-small-worksheets` |

### The Mapping File: AppCard.tsx

Location: `frontend/components/apps/AppCard.tsx`

This file contains the `appIdToProductSlug` mapping that translates app IDs to product page slugs:

```typescript
const appIdToProductSlug: { [key: string]: string } = {
  'word-search': 'word-search-worksheets',
  'image-addition': 'addition-worksheets',
  'alphabet-train': 'alphabet-train-worksheets',
  'coloring': 'coloring-worksheets',
  'math-worksheet': 'math-worksheets',
  'word-scramble': 'word-scramble-worksheets',
  'find-and-count': 'find-and-count-worksheets',
  'matching-app': 'matching-worksheets',
  'drawing-lines': 'drawing-lines-worksheets',
  'picture-bingo': 'picture-bingo-worksheets',
  'sudoku': 'sudoku-worksheets',
  'big-small-app': 'big-small-worksheets',
  'chart-count-color': 'chart-count-worksheets',
  'code-addition': 'code-addition-worksheets',
  'draw-and-color': 'draw-and-color-worksheets',
  'find-objects': 'find-objects-worksheets',
  'grid-match': 'grid-match-worksheets',
  'image-crossword': 'crossword-worksheets',
  'image-cryptogram': 'cryptogram-worksheets',
  'math-puzzle': 'math-puzzle-worksheets',
};
```

### Complete App ID → Product Page Slug Mapping (All 33 Apps)

| # | App ID | Product Page Slug | HTML Generator |
|---|--------|-------------------|----------------|
| 1 | `word-search` | `word-search-worksheets` | wordsearch.html |
| 2 | `image-addition` | `addition-worksheets` | addition.html |
| 3 | `alphabet-train` | `alphabet-train-worksheets` | alphabet train.html |
| 4 | `coloring` | `coloring-worksheets` | coloring.html |
| 5 | `math-worksheet` | `math-worksheets` | math worksheet.html |
| 6 | `word-scramble` | `word-scramble-worksheets` | word scramble.html |
| 7 | `find-and-count` | `find-and-count-worksheets` | find and count.html |
| 8 | `matching-app` | `matching-worksheets` | matching.html |
| 9 | `drawing-lines` | `drawing-lines-worksheets` | drawing lines.html |
| 10 | `picture-bingo` | `picture-bingo-worksheets` | bingo.html |
| 11 | `sudoku` | `sudoku-worksheets` | sudoku.html |
| 12 | `big-small-app` | `big-small-worksheets` | big small.html |
| 13 | `chart-count-color` | `chart-count-worksheets` | chart count.html |
| 14 | `code-addition` | `code-addition-worksheets` | code addition.html |
| 15 | `draw-and-color` | `draw-and-color-worksheets` | draw and color.html |
| 16 | `find-objects` | `find-objects-worksheets` | find objects.html |
| 17 | `grid-match` | `grid-match-worksheets` | grid match.html |
| 18 | `image-crossword` | `crossword-worksheets` | crossword.html |
| 19 | `image-cryptogram` | `cryptogram-worksheets` | cryptogram.html |
| 20 | `math-puzzle` | `math-puzzle-worksheets` | math puzzle.html |
| 21 | `missing-pieces` | `missing-pieces-worksheets` | missing pieces.html |
| 22 | `more-less` | `more-less-worksheets` | more less.html |
| 23 | `odd-one-out` | `odd-one-out-worksheets` | odd one out.html |
| 24 | `pattern-train` | `pattern-train-worksheets` | pattern train.html |
| 25 | `pattern-worksheet` | `pattern-worksheets` | pattern worksheet.html |
| 26 | `picture-path` | `picture-path-worksheets` | picture path.html |
| 27 | `picture-sort` | `picture-sort-worksheets` | picture sort.html |
| 28 | `prepositions` | `prepositions-worksheets` | prepositions.html |
| 29 | `shadow-match` | `shadow-match-worksheets` | shadow match.html |
| 30 | `subtraction` | `subtraction-worksheets` | subtraction.html |
| 31 | `treasure-hunt` | `treasure-hunt-worksheets` | treasure hunt.html |
| 32 | `word-guess` | `word-guess-worksheets` | word guess.html |
| 33 | `writing-app` | `writing-worksheets` | writing.html |

---

## 📋 4 FILES TO UPDATE FOR EACH NEW PRODUCT PAGE 📋

```
╔═══════════════════════════════════════════════════════════════════════════════════╗
║                                                                                   ║
║   WHEN CREATING A NEW PRODUCT PAGE, YOU MUST UPDATE 4 FILES:                      ║
║                                                                                   ║
║   1. CONTENT FILE (create new)                                                    ║
║      frontend/content/product-pages/en/{app-slug}.ts                              ║
║                                                                                   ║
║   2. PAGE.TSX (add import, metadata, render, staticParams)                        ║
║      frontend/app/[locale]/apps/[slug]/page.tsx                                   ║
║                                                                                   ║
║   3. APPCARD.TSX (add to appIdToProductSlug mapping)                              ║
║      frontend/components/apps/AppCard.tsx                                         ║
║      → Makes "Learn More" button link to the product page                         ║
║                                                                                   ║
║   4. APPCATEGORIES.TSX (add app to homepage if not there)                         ║
║      frontend/components/homepage/AppCategories.tsx                               ║
║      → Makes app appear in "Browse by Category" on homepage                       ║
║                                                                                   ║
║   FORGETTING ANY OF THESE = BROKEN LINKS OR MISSING CONTENT                       ║
║                                                                                   ║
╚═══════════════════════════════════════════════════════════════════════════════════╝
```

### File 1: Content File
- **Location:** `frontend/content/product-pages/en/{app-slug}.ts`
- **Purpose:** Contains all SEO content for the product page
- **Naming:** Use the PRODUCT PAGE SLUG (e.g., `math-puzzle-worksheets.ts`)

### File 2: page.tsx
- **Location:** `frontend/app/[locale]/apps/[slug]/page.tsx`
- **Updates needed:**
  1. Add import statement for the content
  2. Add metadata generation for the slug
  3. Add rendering condition
  4. Add slug to `generateStaticParams`

### File 3: AppCard.tsx
- **Location:** `frontend/components/apps/AppCard.tsx`
- **Updates needed:**
  1. Add entry to `appIdToProductSlug` mapping
- **Purpose:** Links the "Learn More" button on app cards to the correct product page

### File 4: AppCategories.tsx
- **Location:** `frontend/components/homepage/AppCategories.tsx`
- **Updates needed:** Add app to the appropriate category array (if not already present)
- **Purpose:** Makes the app visible in "Browse by Category" section on homepage
- **Translations:** Must include ALL 11 languages for app name and description

---

## 🚨🚨🚨 WHERE TO FIND SAMPLE FILES - READ THIS CAREFULLY 🚨🚨🚨

```
╔═══════════════════════════════════════════════════════════════════════════════════╗
║                                                                                   ║
║   SAMPLES ARE IN THE ROOT "samples" FOLDER, NOT frontend/public/samples!          ║
║                                                                                   ║
║   MASTER LOCATION (source of truth):                                              ║
║   lessoncraftstudio/samples/english/{app-name}/                                   ║
║                                                                                   ║
║   Example paths:                                                                  ║
║   • samples/english/bingo/image and image.jpeg                                    ║
║   • samples/english/addition/addition_worksheet portrait.jpeg                     ║
║   • samples/english/wordsearch/wordsearch portrait.jpeg                           ║
║                                                                                   ║
║   HOW TO FIND SAMPLES:                                                            ║
║   1. List all app folders:                                                        ║
║      powershell -Command "Get-ChildItem -Path 'samples' -Recurse -Directory"      ║
║                                                                                   ║
║   2. Search for specific app:                                                     ║
║      Glob: samples/english/{app-name}/**/*                                        ║
║                                                                                   ║
║   3. List contents of an app folder:                                              ║
║      Glob: samples/english/bingo/**/*                                             ║
║                                                                                   ║
║   DO NOT:                                                                         ║
║   • Search in frontend/public/samples (these are COPIES, not source)              ║
║   • Use 'dir' or 'findstr' (use Glob tool or PowerShell instead)                  ║
║   • Assume samples don't exist without checking the root samples folder           ║
║                                                                                   ║
╚═══════════════════════════════════════════════════════════════════════════════════╝
```

---

## STEP-BY-STEP: CREATING A NEW PRODUCT PAGE

### Step 1: Verify Sample Files Exist
```bash
# CORRECT: Check if samples exist in the ROOT samples folder (master location)
Glob: samples/english/{app-name}/**/*

# OR using PowerShell:
powershell -Command "Get-ChildItem -Path 'samples/english/{app-name}' -Recurse"

# Examples:
Glob: samples/english/bingo/**/*
Glob: samples/english/addition/**/*
```

**IMPORTANT:** Always use Glob tool or PowerShell. Do not use `dir` or `findstr` as they often fail with special characters.

**If samples don't exist, CREATE THEM FIRST before proceeding.**

### Step 2: Copy Samples to Frontend Public Folder
```bash
# Create directory and copy samples
mkdir -p frontend/public/samples/english/{app-name}
cp -r samples/english/{app-name}/* frontend/public/samples/english/{app-name}/

# Verify
ls -la frontend/public/samples/english/{app-name}/
```

### Step 3: Create Content File
Create file at: `frontend/content/product-pages/en/{app-slug}.ts`

```typescript
import { ProductPageContent } from '@/components/product-page/ProductPageClient';

export const appNameEnContent: ProductPageContent = {
  hero: {
    title: 'Page Title',
    subtitle: 'Subtitle here',
    // ⚠️ PUT FULL TEXT - Component will show only 3 sentences by default
    description: `Full paragraph 1. Full paragraph 2. Full paragraph 3. Full paragraph 4...`,
    previewImageSrc: '/samples/english/{app-name}/filename.jpeg',
    // ...
  },
  samples: {
    items: [
      {
        id: '1',
        worksheetSrc: '/samples/english/{app-name}/filename.jpeg',
        answerKeySrc: '/samples/english/{app-name}/filename answer_key.jpeg',
        altText: 'Description',
        pdfDownloadUrl: '/samples/english/{app-name}/filename.pdf',
      },
    ],
  },
  features: {
    items: [
      {
        id: '1',
        icon: '⚡',
        title: 'Feature Title',
        // ⚠️ PUT FULL TEXT - Component will show only 3 sentences by default
        description: 'Full feature description with many sentences...',
        highlighted: false,
      },
    ],
  },
  // ... rest of content - ALL LONG TEXT WILL BE COLLAPSED AUTOMATICALLY
};

export default appNameEnContent;
```

### Step 4: Update page.tsx
File: `frontend/app/[locale]/apps/[slug]/page.tsx`

Add:
1. Import statement
2. Metadata generation for the slug
3. Rendering condition
4. Add slug to generateStaticParams

```typescript
// 1. Add import at top of file
import appNameEnContent from '@/content/product-pages/en/{app-slug}';

// 2. Add metadata generation (inside generateMetadata function)
if (params.slug === '{app-slug}' && params.locale === 'en') {
  return {
    title: 'SEO Title | LessonCraft Studio',
    description: 'SEO meta description...',
    // ... rest of metadata
  };
}

// 3. Add rendering condition (inside component)
if (slug === '{app-slug}' && locale === 'en') {
  return <ProductPageClient locale={locale} content={appNameEnContent} />;
}

// 4. Add slug to generateStaticParams slugs array
export async function generateStaticParams() {
  const slugs = [
    // ... existing slugs ...
    '{app-slug}',  // Add this
  ];
  // ...
}
```

### Step 5: Update AppCard.tsx (CRITICAL - Makes "Learn More" Work!)
File: `frontend/components/apps/AppCard.tsx`

Add entry to `appIdToProductSlug` mapping:

```typescript
const appIdToProductSlug: { [key: string]: string } = {
  // ... existing mappings ...
  '{app-id}': '{app-slug}',  // Add this line
};
```

**Why is this needed?** Without this mapping, the "Learn More" button on the app card will link to `/{locale}/apps/{app-id}` instead of `/{locale}/apps/{app-slug}`, resulting in a 404 error.

### Step 6: Verify AppCategories.tsx (Homepage Visibility)
File: `frontend/components/homepage/AppCategories.tsx`

Check if the app is already in the `apps` array. If not, add it with ALL 11 language translations:

```typescript
// Inside the appropriate category array (math, language, visual, creative, or logic)
{
  nameEn: 'App Name',
  nameDe: 'German Name',
  nameFr: 'French Name',
  nameEs: 'Spanish Name',
  nameIt: 'Italian Name',
  namePt: 'Portuguese Name',
  nameNl: 'Dutch Name',
  nameDa: 'Danish Name',
  nameSv: 'Swedish Name',
  nameNo: 'Norwegian Name',
  nameFi: 'Finnish Name',
  slug: '{app-slug}',  // Use PRODUCT PAGE SLUG here
  icon: '🧩',
  descriptionEn: 'Short description in English',
  descriptionDe: 'German description',
  // ... all 11 language descriptions
},
```

**Note:** All 33 apps should already be in AppCategories.tsx. This step is usually just verification.

### Step 7: Commit and Push
```bash
git add frontend/content/product-pages/en/{app-slug}.ts
git add frontend/public/samples/english/{app-name}/
git add frontend/app/[locale]/apps/[slug]/page.tsx
git add frontend/components/apps/AppCard.tsx
git add frontend/components/homepage/AppCategories.tsx  # If modified
git commit -m "feat: Add {App Name} product page (English)"
git push origin main
```

### Step 8: Deploy to Server
```bash
# Pull and build
plink root@server "cd /opt/lessoncraftstudio && git pull && cd frontend && npm run build && cp -r .next/static .next/standalone/.next/static && pm2 restart lessoncraftstudio"
```

### Step 9: Upload Samples to Server
```bash
# Create directory on server
plink root@server "mkdir -p /opt/lessoncraftstudio/frontend/public/samples/english/{app-name}"

# Upload files
pscp -r frontend/public/samples/english/{app-name}/* root@server:/opt/lessoncraftstudio/frontend/public/samples/english/{app-name}/

# CRITICAL: Copy to standalone directory (or files won't be accessible!)
plink root@server "cp -r /opt/lessoncraftstudio/frontend/public/samples/english/{app-name} /opt/lessoncraftstudio/frontend/.next/standalone/public/samples/english/"

# Restart
plink root@server "pm2 restart lessoncraftstudio"
```

### Step 10: Verify Everything Works
```bash
# Test page loads
curl -s -o /dev/null -w '%{http_code}' 'https://www.lessoncraftstudio.com/en/apps/{app-slug}'
# Expected: 200

# Test image loads
curl -s -o /dev/null -w '%{http_code}' 'https://www.lessoncraftstudio.com/samples/english/{app-name}/filename.jpeg'
# Expected: 200

# Test PDF downloads
curl -s -I 'https://www.lessoncraftstudio.com/samples/english/{app-name}/filename.pdf' | head -5
# Expected: HTTP/1.1 200 OK, Content-Type: application/pdf
```

**DO NOT announce completion until ALL tests pass!**

---

## PRE-DEPLOYMENT CHECKLIST

Before saying "done", verify ALL of these:

### 🌍 Language Verification (MOST IMPORTANT FOR NON-ENGLISH PAGES)
- [ ] **ZERO English words on non-English pages** - search for "Read more", "Features", "Step", "Done!"
- [ ] **Product names translated** - "Core Bundle" → native language equivalent
- [ ] **All UI labels in target language** - badges, buttons, trust text, step labels
- [ ] **Text sounds natural** - not literal translations, idiomatic expressions
- [ ] **All fields populated** - hero.readMoreLabel, features.badgeText, howTo.stepLabel, etc.

### ⚠️ Text Display
- [ ] **All long text in content file is FULL text (not truncated)**
- [ ] **Components will auto-collapse to 3 sentences - you don't do anything**

### 4 Required File Updates
- [ ] **Content file created** at `frontend/content/product-pages/en/{app-slug}.ts`
- [ ] **page.tsx updated** with import, metadata, render condition, staticParams
- [ ] **AppCard.tsx updated** - entry added to `appIdToProductSlug` mapping
- [ ] **AppCategories.tsx verified** - app exists in homepage categories (all 33 apps should be there)

### Sample Files
- [ ] Sample files exist in `samples/english/{app}/` (master location)
- [ ] Sample files copied to `frontend/public/samples/english/{app}/`
- [ ] Filenames in content file EXACTLY match actual filenames (including spaces!)
- [ ] Both JPEG and PDF versions exist for each sample

### Server Deployment
- [ ] Sample files uploaded to `/opt/lessoncraftstudio/frontend/public/samples/english/{app}/`
- [ ] Sample files copied to `/opt/lessoncraftstudio/frontend/.next/standalone/public/samples/english/{app}/`
- [ ] PM2 restarted after copying files

### URL Verification (run these commands!)
- [ ] Page URL returns HTTP 200
- [ ] Each image URL returns HTTP 200
- [ ] Each PDF URL returns HTTP 200 with `Content-Type: application/pdf`

---

## CRITICAL DESIGN MISTAKES TO AVOID

### 1. ⚠️⚠️⚠️ COLLAPSIBLE TEXT - DEFAULT TO COLLAPSED ⚠️⚠️⚠️

**THIS IS THE #1 MOST COMMON MISTAKE**

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│   The components ALREADY handle collapsing.                         │
│   You just put FULL TEXT in the content file.                       │
│   The component shows 3 sentences by default.                       │
│   User clicks "Read more" to see the rest.                          │
│                                                                     │
│   YOU DO NOT NEED TO:                                               │
│   • Truncate text manually                                          │
│   • Set any state                                                   │
│   • Add "Read more" buttons                                         │
│   • Split text into sentences                                       │
│                                                                     │
│   JUST PUT THE FULL TEXT. THAT'S IT.                                │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

**Components that auto-collapse:**
- `HeroSection.tsx` - hero.description
- `FeaturesGrid.tsx` - feature.description
- `UseCases.tsx` - useCase.description
- `HowToGuide.tsx` - step.description
- `FAQSection.tsx` - faq.answer

**How it's implemented in components:**
```tsx
const [isExpanded, setIsExpanded] = useState(false); // COLLAPSED by default

const sentences = text.split(/(?<=[.!?])\s+/);
const maxSentences = 3;
const displayText = isExpanded ? text : sentences.slice(0, maxSentences).join(' ');
```

---

### 2. PDF Downloads - MIDDLEWARE EXCLUSIONS

**Problem:** PDFs return HTML because middleware redirects `/samples/...` to `/en/samples/...`

**Fix in `middleware.ts`:**
```typescript
export const config = {
  matcher: [
    '/((?!api|_next/static|...|samples|...\\.pdf).*)',
    //                        ^^^^^^^ ADD THIS
  ]
};
```

**Exclusions that MUST be in matcher:**
- `samples` - PDF sample files directory
- `pdf` - PDF file extension
- `blog/pdfs` - Blog PDF downloads

---

### 3. Related Apps - NO INDIVIDUAL APP LINKS

**WRONG:**
```tsx
<Link href={`/${locale}/apps/${app.slug}`}>  // Links to individual app
```

**CORRECT:**
```tsx
<Link href={`/${locale}/apps`}>  // Links to apps listing page
// OR
<Link href={`/${locale}/auth/signup`}>  // Links to signup
```

**Rule:** RelatedApps cards are informational only. CTA buttons go to `/apps` or `/auth/signup`.

---

### 4. Design Quality - NO GENERIC AI AESTHETICS

**NEVER USE:**
- Generic fonts: Inter, Roboto, Arial, system fonts
- Cliche colors: Purple gradients on white, indigo/slate palettes
- Boring layouts: Predictable grids, cookie-cutter patterns

**ALWAYS USE:**
- Distinctive fonts: Cormorant Garamond, Space Grotesk, Playfair Display
- Rich palettes: Stone, amber, rose, emerald, cream tones
- Bold design: Animated gradients, mesh backgrounds, parallax effects

**Test:** Would a user remember this design? If it looks like every other SaaS page, redesign it.

---

### 5. Download Buttons - ON THE THUMBNAILS

**WRONG:** Separate download button below gallery

**CORRECT:** Download button directly ON each thumbnail that has a PDF
```tsx
{sample.pdfDownloadUrl && (
  <button className="absolute bottom-2 left-1/2 -translate-x-1/2 ...">
    <DownloadIcon /> PDF
  </button>
)}
```

---

## SERVER COMMANDS REFERENCE

### Full Connection Details
```
Server: 65.108.5.250
User: root
Password: JfmiPF_QW4_Nhm
Hostkey: SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU
```

### Upload Files
```bash
pscp -batch -pw PASSWORD -hostkey "HOSTKEY" "local/path/*" root@65.108.5.250:"/remote/path/"
```

### Run Commands
```bash
plink -batch -pw PASSWORD -hostkey "HOSTKEY" root@65.108.5.250 "command here"
```

### Full Deploy Sequence
```bash
# 1. Pull, build, restart
plink ... "cd /opt/lessoncraftstudio && git pull && cd frontend && npm run build && cp -r .next/static .next/standalone/.next/static && pm2 restart lessoncraftstudio"

# 2. Upload samples
pscp ... -r "frontend/public/samples/english/{app}/*" root@server:"/opt/lessoncraftstudio/frontend/public/samples/english/{app}/"

# 3. Copy to standalone (CRITICAL!)
plink ... "cp -r /opt/lessoncraftstudio/frontend/public/samples/english/{app} /opt/lessoncraftstudio/frontend/.next/standalone/public/samples/english/"

# 4. Restart
plink ... "pm2 restart lessoncraftstudio"
```

---

## COMPONENT CHECKLIST

### HeroSection.tsx
- [ ] ⚠️ Description text collapsed by default (3 sentences max) - **AUTOMATIC**
- [ ] "Read more" toggle works
- [ ] No fake user counts or stats
- [ ] Design is distinctive (not generic corporate)

### SampleGallery.tsx
- [ ] Download buttons ON thumbnails (not separate)
- [ ] Only shows download for samples WITH PDFs
- [ ] PDF URLs work (test with curl)
- [ ] Descriptive filenames generated from altText

### FeaturesGrid.tsx
- [ ] ⚠️ Long descriptions collapsed (3 sentences default) - **AUTOMATIC**
- [ ] "Read more" / "Show less" toggles work

### UseCases.tsx
- [ ] ⚠️ Long descriptions collapsed (3 sentences default) - **AUTOMATIC**
- [ ] "Read more" / "Show less" toggles work

### HowToGuide.tsx
- [ ] ⚠️ Long descriptions collapsed (3 sentences default) - **AUTOMATIC**
- [ ] "Read more" / "Show less" toggles work

### FAQSection.tsx
- [ ] ⚠️ Long answers collapsed (3 sentences default) - **AUTOMATIC**
- [ ] "Read more" / "Show less" toggles work

### RelatedApps.tsx
- [ ] NO links to individual app pages (`/apps/[slug]`)
- [ ] Cards link to `/apps` or `/auth/signup` only
- [ ] CTA buttons go to signup or apps page

---

## QUICK REFERENCE

| Component | Collapsed Default | Links Allowed | Download Location |
|-----------|------------------|---------------|-------------------|
| HeroSection | ⚠️ 3 sentences (AUTO) | N/A | N/A |
| FeaturesGrid | ⚠️ 3 sentences (AUTO) | N/A | N/A |
| UseCases | ⚠️ 3 sentences (AUTO) | N/A | N/A |
| HowToGuide | ⚠️ 3 sentences (AUTO) | N/A | N/A |
| FAQSection | ⚠️ 3 sentences (AUTO) | N/A | N/A |
| SampleGallery | N/A | N/A | ON thumbnail |
| RelatedApps | N/A | `/apps`, `/signup` only | N/A |

---

## COMMON MISTAKES & FIXES

| Mistake | Symptom | Fix |
|---------|---------|-----|
| Content file in wrong folder | Import fails | Move to `frontend/content/product-pages/en/` |
| Samples not on server | Images show broken | Upload with pscp |
| Samples not in standalone | 404 errors | Copy to `.next/standalone/public/samples/` |
| Wrong sample filename | 404 errors | Match exact filename including spaces |
| Forgot pm2 restart | Old content shows | `pm2 restart lessoncraftstudio` |
| Middleware blocking PDFs | PDF returns HTML | Add `samples` to middleware exclusions |

---

## TL;DR - THE MOST IMPORTANT THINGS

```
╔═══════════════════════════════════════════════════════════════════════════════════╗
║                                                                                   ║
║   🌍 0. 100% NATIVE LANGUAGE - ZERO ENGLISH ON NON-ENGLISH PAGES 🌍               ║
║      EVERY word must be in the target language - including product names!         ║
║      "Core Bundle" → "Grundpaketet" (Swedish), "Basispaket" (German)             ║
║      "Full Access" → "Full Tillgång" (Swedish), "Voller Zugang" (German)         ║
║      "Read more" → "Läs mer" (Swedish), "Mehr lesen" (German)                    ║
║      "Features" → "Funktioner" (Swedish), "Funktionen" (German)                  ║
║      ALL UI LABELS, BADGES, BUTTONS - EVERYTHING IN TARGET LANGUAGE!             ║
║                                                                                   ║
║   🚨 1. DEPLOY TO PRODUCTION - THIS IS NOT OPTIONAL 🚨                            ║
║      git push → server git pull → npm run build → copy samples → verify URL      ║
║      "Local build passed" = NOT DONE. "Live URL returns 200" = DONE.             ║
║                                                                                   ║
║   2. PUT FULL TEXT IN CONTENT FILE                                                ║
║      Components auto-collapse to 3 sentences                                      ║
║                                                                                   ║
║   3. VERIFY SAMPLES EXIST BEFORE CREATING PAGE                                    ║
║      Check samples/english/{app}/ folder first                                    ║
║                                                                                   ║
║   4. COPY SAMPLES TO STANDALONE ON SERVER                                         ║
║      Or they won't be accessible                                                  ║
║                                                                                   ║
║   5. TEST ALL LIVE URLs BEFORE ANNOUNCING COMPLETION                              ║
║      Page, images, and PDFs must all return 200 ON PRODUCTION                     ║
║      curl https://www.lessoncraftstudio.com/en/apps/{app-slug}                   ║
║                                                                                   ║
║   🏠 6. NEVER REGENERATE THE HOMEPAGE - IT IS COMPLETE 🏠                          ║
║      The homepage was finished in Dec 2025 with 11 languages and 12 samples      ║
║      Only fix bugs - never redesign or regenerate from scratch                   ║
║                                                                                   ║
╚═══════════════════════════════════════════════════════════════════════════════════╝
```

---

## 🏠 HOMEPAGE ARCHITECTURE - DO NOT OVERWRITE

```
╔═══════════════════════════════════════════════════════════════════════════════════╗
║                                                                                   ║
║   ⚠️⚠️⚠️ THE HOMEPAGE IS COMPLETE - DO NOT REGENERATE ⚠️⚠️⚠️                          ║
║                                                                                   ║
║   The homepage was completed in December 2025 with:                               ║
║   - 11 languages fully translated                                                 ║
║   - 12 downloadable PDF samples                                                   ║
║   - All links to product pages working                                            ║
║   - Responsive design tested across devices                                       ║
║                                                                                   ║
║   DO NOT use the frontend-design skill on the homepage!                           ║
║   DO NOT regenerate from a plan file!                                             ║
║   DO NOT copy old homepage code from backups!                                     ║
║                                                                                   ║
║   ONLY fix bugs (broken links, missing translations, typos)                       ║
║                                                                                   ║
╚═══════════════════════════════════════════════════════════════════════════════════╝
```

### Current Homepage Structure (December 2025)

The homepage is composed of 6 modular components located in `frontend/components/homepage/`:

| Component | File | Purpose |
|-----------|------|---------|
| HomepageHero | `HomepageHero.tsx` | Dark gradient hero with badge, title, 3D preview cards |
| SampleGallery | `SampleGallery.tsx` | 12 downloadable PDF samples with translations |
| AppCategories | `AppCategories.tsx` | Category cards linking to product pages |
| HomepageFeatures | `HomepageFeatures.tsx` | 6 feature cards with amber highlights |
| HowItWorks | `HowItWorks.tsx` | 4-step timeline with scroll animations |
| HomepageCTA | `HomepageCTA.tsx` | Final dark CTA section |

### Main Page File
- **`frontend/app/[locale]/page.tsx`** - Imports and renders all 6 components

### Language Support
All components support **11 languages** with inline `localeContent` objects:
- English (en), German (de), French (fr), Spanish (es), Italian (it)
- Portuguese (pt), Dutch (nl), Danish (da), Swedish (sv), Norwegian (no), Finnish (fi)

### Design System
- **Dark sections**: Hero, Sample Gallery, CTA - using `#0a0a0a`, `#1a1a2e`, `#16213e`
- **Light sections**: Features, How It Works - using white, stone-50
- **Accents**: Cyan `#06b6d4`, Purple `#a855f7`, Pink `#ec4899`, Amber highlights
- **Typography**: Space Grotesk (hero), Cormorant Garamond (sections)
- **Animations**: Framer Motion for scroll reveals, hovers, parallax

---

## 🔗 HOW TO ADD LINKS TO INDIVIDUAL APP PAGES ON HOMEPAGE

### Adding a New Sample to SampleGallery.tsx

To add a new downloadable sample that links to a product page:

1. Open `frontend/components/homepage/SampleGallery.tsx`
2. Find the `samples` array (around line 200)
3. Add a new sample object:

```typescript
{
  id: '13',                              // Next available ID
  nameEn: 'App Name',                    // English name
  nameDe: 'German Name',                 // German translation
  nameFr: 'French Name',                 // French translation
  nameEs: 'Spanish Name',                // Spanish translation
  nameIt: 'Italian Name',                // Italian translation
  namePt: 'Portuguese Name',             // Portuguese translation
  nameNl: 'Dutch Name',                  // Dutch translation
  nameDa: 'Danish Name',                 // Danish translation
  nameSv: 'Swedish Name',                // Swedish translation
  nameNo: 'Norwegian Name',              // Norwegian translation
  nameFi: 'Finnish Name',                // Finnish translation
  categoryEn: 'Math',                    // Category in each language
  categoryDe: 'Mathematik',
  // ... all category translations ...
  imageSrc: '/samples/english/app-name/filename.jpeg',    // Preview image
  pdfUrl: '/samples/english/app-name/filename.pdf',       // Download PDF
  productPageSlug: 'app-name-worksheets',                 // ← CREATES LINK TO PRODUCT PAGE
},
```

4. Update `statSamples` from `12+` to `13+` in all locale content objects
5. Commit and deploy

**The link is automatically generated as:** `/${locale}/apps/${productPageSlug}`

### Adding a New Category Card to AppCategories.tsx

**Location:** `frontend/components/homepage/AppCategories.tsx`

This file contains ALL 33 apps organized into 5 categories that appear in the "Browse by Category" section on the homepage.

#### The 5 Categories and Their Apps

| Category | Apps (33 total) |
|----------|-----------------|
| **Math** (6 apps) | Addition, Subtraction, Math Worksheet, Code Addition, Chart Count, Math Puzzle |
| **Language** (6 apps) | Word Search, Word Scramble, Crossword, Cryptogram, Word Guess, Writing |
| **Visual Learning** (10 apps) | Find & Count, Find Objects, Matching, Grid Match, Drawing Lines, Missing Pieces, Shadow Match, Picture Path, Picture Sort, Prepositions |
| **Creative** (7 apps) | Coloring, Draw & Color, Alphabet Train, Big Small, Pattern Train, Pattern Worksheet, Treasure Hunt |
| **Logic & Puzzles** (4 apps) | Sudoku, Picture Bingo, More or Less, Odd One Out |

#### To add a new app:

1. Open `frontend/components/homepage/AppCategories.tsx`
2. Find the appropriate category array (math, language, visual, creative, or logic)
3. Add a new app object with ALL 11 language translations:

```typescript
{
  nameEn: 'App Name',
  nameDe: 'German Name',           // Must sound natural in German
  nameFr: 'French Name',           // Must sound natural in French
  nameEs: 'Spanish Name',          // Must sound natural in Spanish
  nameIt: 'Italian Name',          // Must sound natural in Italian
  namePt: 'Portuguese Name',       // Must sound natural in Portuguese (Brazilian)
  nameNl: 'Dutch Name',            // Must sound natural in Dutch
  nameDa: 'Danish Name',           // Must sound natural in Danish
  nameSv: 'Swedish Name',          // Must sound natural in Swedish
  nameNo: 'Norwegian Name',        // Must sound natural in Norwegian
  nameFi: 'Finnish Name',          // Must sound natural in Finnish
  slug: 'app-name-worksheets',     // Use PRODUCT PAGE SLUG (not App ID!)
  icon: '🧩',                      // Emoji icon
  descriptionEn: 'Short description',
  descriptionDe: 'German description',
  // ... all 11 language descriptions
},
```

#### Translation Quality Requirements

**CRITICAL:** All translations must:
- Sound natural in the target language (not literal translations)
- Be consistent with existing app names in that language
- Use proper terminology for that country's education system

**Example of GOOD translations:**
```typescript
nameEn: 'Math Puzzle',
nameDe: 'Mathe-Puzzle',          // ✅ Natural German compound word
nameFr: 'Puzzle mathématique',   // ✅ Natural French word order
```

**Example of BAD translations:**
```typescript
nameEn: 'Math Puzzle',
nameDe: 'Mathematik Puzzle',     // ❌ Awkward - should be "Mathe-Puzzle"
nameFr: 'Math Puzzle',           // ❌ Not translated at all
```

### All 33 Apps Are Already in AppCategories.tsx

As of December 2025, all 33 apps have been added to AppCategories.tsx with complete translations in all 11 languages. When creating a new product page, you typically only need to **verify** the app exists, not add it.

---

## 🛡️ PROTECTING HOMEPAGE FROM ACCIDENTAL OVERWRITES

### NEVER DO THESE THINGS:
```
❌ Do NOT copy old homepage code from backups or archives
❌ Do NOT revert homepage commits without explicit user approval
❌ Do NOT regenerate the homepage from scratch - it's COMPLETE
❌ Do NOT use the frontend-design skill on the homepage
❌ Do NOT delete or replace any homepage component files
```

### Git Commands to Verify Homepage Status

Before ANY homepage changes, run these commands:

```bash
# Check recent homepage commits
git log --oneline -10 -- frontend/components/homepage/ frontend/app/[locale]/page.tsx

# Verify all homepage files are tracked
git ls-files frontend/components/homepage/

# Expected output:
# frontend/components/homepage/AppCategories.tsx
# frontend/components/homepage/HomepageCTA.tsx
# frontend/components/homepage/HomepageFeatures.tsx
# frontend/components/homepage/HomepageHero.tsx
# frontend/components/homepage/HowItWorks.tsx
# frontend/components/homepage/SampleGallery.tsx
```

### If You Accidentally Modify Homepage

```bash
# View what changed
git diff frontend/components/homepage/

# Restore a single file to last commit
git checkout HEAD -- frontend/components/homepage/SampleGallery.tsx

# Restore entire homepage folder to last commit
git checkout HEAD -- frontend/components/homepage/

# If already committed, revert the specific commit
git revert <commit-hash>
```

### What Changes ARE Allowed

✅ **Bug fixes only:**
- Fix broken PDF download links
- Fix missing/incorrect translations
- Fix typos in text content
- Fix layout bugs (overflow, spacing)

✅ **Adding content:**
- Add new samples to SampleGallery (when new apps are created)
- Update sample count from "12+" to "13+"
- Add new app cards to AppCategories

### What Changes ARE NOT Allowed

❌ **Never do these without explicit user approval:**
- Redesign the layout or structure
- Change the component architecture
- Replace components with new implementations
- Change the color scheme or typography
- Regenerate from the plan file
- Use frontend-design skill on homepage
