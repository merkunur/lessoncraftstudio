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

## 7 UNBREAKABLE RULES

| # | Rule | Why It Matters |
|---|------|----------------|
| 1 | **🚨 DEPLOY TO PRODUCTION** | Task is NOT complete until live URL returns HTTP 200 - local build is NOT enough! |
| 2 | **3 SENTENCES DEFAULT** | ALL long text shows only 3 sentences initially - components handle this automatically |
| 3 | NO FAKE STATS | Never invent user counts, ratings, or numbers |
| 4 | NO APP LINKS | Links go to `/signup`, `/apps`, `/pricing`, or homepage ONLY |
| 5 | FULL TEXT | Use 100% of .md content in content file - components will collapse it |
| 6 | REAL SAMPLES | Only use actual files from `samples/` folder - VERIFY THEY EXIST |
| 7 | FREE PDF | Direct download link, no login required |

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

### Step 5: Commit and Push
```bash
git add frontend/content/product-pages/en/{app-slug}.ts
git add frontend/public/samples/english/{app-name}/
git add frontend/app/[locale]/apps/[slug]/page.tsx
git commit -m "feat: Add {App Name} product page (English)"
git push origin main
```

### Step 6: Deploy to Server
```bash
# Pull and build
plink root@server "cd /opt/lessoncraftstudio && git pull && cd frontend && npm run build && cp -r .next/static .next/standalone/.next/static && pm2 restart lessoncraftstudio"
```

### Step 7: Upload Samples to Server
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

### Step 8: Verify Everything Works
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

### ⚠️ Text Display (MOST IMPORTANT)
- [ ] **All long text in content file is FULL text (not truncated)**
- [ ] **Components will auto-collapse to 3 sentences - you don't do anything**

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
║   🚨 0. DEPLOY TO PRODUCTION - THIS IS NOT OPTIONAL 🚨                            ║
║      git push → server git pull → npm run build → copy samples → verify URL      ║
║      "Local build passed" = NOT DONE. "Live URL returns 200" = DONE.             ║
║                                                                                   ║
║   1. PUT FULL TEXT IN CONTENT FILE                                                ║
║      Components auto-collapse to 3 sentences                                      ║
║                                                                                   ║
║   2. VERIFY SAMPLES EXIST BEFORE CREATING PAGE                                    ║
║      Check samples/english/{app}/ folder first                                    ║
║                                                                                   ║
║   3. COPY SAMPLES TO STANDALONE ON SERVER                                         ║
║      Or they won't be accessible                                                  ║
║                                                                                   ║
║   4. TEST ALL LIVE URLs BEFORE ANNOUNCING COMPLETION                              ║
║      Page, images, and PDFs must all return 200 ON PRODUCTION                     ║
║      curl https://www.lessoncraftstudio.com/en/apps/{app-slug}                   ║
║                                                                                   ║
╚═══════════════════════════════════════════════════════════════════════════════════╝
```
