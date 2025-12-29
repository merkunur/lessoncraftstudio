# Product Page Design & Implementation Guide

## 5 UNBREAKABLE RULES

| # | Rule | Why It Matters |
|---|------|----------------|
| 1 | NO FAKE STATS | Never invent user counts, ratings, or numbers |
| 2 | NO APP LINKS | Links go to `/signup`, `/apps`, `/pricing`, or homepage ONLY |
| 3 | FULL TEXT | Use 100% of .md content - never truncate or summarize |
| 4 | REAL SAMPLES | Only use actual files from `samples/` folder - VERIFY THEY EXIST |
| 5 | FREE PDF | Direct download link, no login required |

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

## STEP-BY-STEP: CREATING A NEW PRODUCT PAGE

### Step 1: Verify Sample Files Exist
```bash
# Check if samples exist in the master samples folder
ls -la samples/english/{app-name}/

# Example:
ls -la samples/english/wordsearch/
```

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
  hero: { ... },
  samples: {
    items: [
      {
        id: '1',
        worksheetSrc: '/samples/english/{app-name}/filename.jpeg',  // Must match actual filename!
        answerKeySrc: '/samples/english/{app-name}/filename answer_key.jpeg',
        altText: 'Description',
        pdfDownloadUrl: '/samples/english/{app-name}/filename.pdf',
      },
    ],
  },
  // ... rest of content
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

### 1. Collapsible Text - DEFAULT TO COLLAPSED

**WRONG:**
```tsx
const [isExpanded, setIsExpanded] = useState(true);  // Shows everything
```

**CORRECT:**
```tsx
const [isExpanded, setIsExpanded] = useState(false); // Collapsed by default

// Split by sentences, show only 3
const sentences = text.split(/(?<=[.!?])\s+/);
const maxSentences = 3;
const displayText = isExpanded ? text : sentences.slice(0, maxSentences).join(' ');
```

**Rule:** Long text sections MUST show only 3 sentences by default with "Read more" toggle.

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
- [ ] Description text collapsed by default (3 sentences max)
- [ ] "Read more" toggle works
- [ ] No fake user counts or stats
- [ ] Design is distinctive (not generic corporate)

### SampleGallery.tsx
- [ ] Download buttons ON thumbnails (not separate)
- [ ] Only shows download for samples WITH PDFs
- [ ] PDF URLs work (test with curl)
- [ ] Descriptive filenames generated from altText

### FeaturesGrid.tsx
- [ ] Long descriptions collapsed (3 sentences default)
- [ ] "Read more" / "Show less" toggles work

### UseCases.tsx
- [ ] Long descriptions collapsed (3 sentences default)
- [ ] "Read more" / "Show less" toggles work

### RelatedApps.tsx
- [ ] NO links to individual app pages (`/apps/[slug]`)
- [ ] Cards link to `/apps` or `/auth/signup` only
- [ ] CTA buttons go to signup or apps page

---

## QUICK REFERENCE

| Component | Collapsed Default | Links Allowed | Download Location |
|-----------|------------------|---------------|-------------------|
| HeroSection | 3 sentences | N/A | N/A |
| FeaturesGrid | 3 sentences | N/A | N/A |
| UseCases | 3 sentences | N/A | N/A |
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
