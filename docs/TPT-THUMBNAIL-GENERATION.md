# TPT Thumbnail Generation Guide

Complete reference for creating Teachers Pay Teachers product thumbnails.

---

## Overview

TPT thumbnails are 2000x2000 PNG images generated from HTML templates using Puppeteer. Each product has 5 thumbnails showcasing different aspects.

**Output specifications:**
- Dimensions: 2000 x 2000 pixels
- Format: PNG
- Location: `tpt-thumbnails/` folder

---

## ⛔🚫❌ STOP - READ THIS FIRST ❌🚫⛔

### NEVER PUT COUNTS IN THUMBNAILS

**This is the #1 mistake. Read this BEFORE doing anything else.**

```
╔══════════════════════════════════════════════════════════════════════╗
║                                                                      ║
║   ❌ FORBIDDEN - NEVER USE THESE IN THUMBNAILS:                      ║
║                                                                      ║
║   • "36+ Worksheets"        • "20 Themes"                           ║
║   • "50+ Pages"             • "10 Activities"                       ║
║   • "15 Worksheets"         • "25 Problems"                         ║
║   • "100+ Problems"         • "15 Games"                            ║
║   • "12 Different Types"    • "30 Cards"                            ║
║   • "8 Levels"              • "5 Variations"                        ║
║                                                                      ║
║   🚫 ANY NUMBER + NOUN describing bundle contents = FORBIDDEN 🚫     ║
║                                                                      ║
╚══════════════════════════════════════════════════════════════════════╝
```

**Why?** Counts change when products are updated. Thumbnails are permanent. You will NOT remember to update them.

### ✅ What TO Use Instead

| ❌ NEVER Write | ✅ Write This Instead |
|----------------|----------------------|
| "20 Themes" | "Multiple Themes" or just "Themed Worksheets" |
| "15 Different Types" | "Variety Included" |
| "36+ Worksheets" | "Complete Bundle" or omit entirely |
| "10 Activities" | "Activity Collection" |
| "50+ Pages" | "Comprehensive Set" |
| "25 Problems per sheet" | "Practice Problems Included" |

### ✅ Numbers That ARE Allowed

- **Grade levels:** "Grades K-2", "Grade 3-5" ✅
- **Grid sizes:** "5x5 Bingo", "3x3 Grid" ✅
- **Math operations:** "1-10", "1-20" (number ranges being practiced) ✅
- **Dimensions:** "2000x2000" (technical specs) ✅

### Pre-Creation Checklist

Before finalizing ANY thumbnail, mentally verify:

- [ ] **No worksheet/page counts** ("36+ Worksheets" - NO)
- [ ] **No theme/activity counts** ("20 Themes" - NO)
- [ ] **No quantity descriptors** ("15 Different Types" - NO)
- [ ] **Only allowed numbers:** Grade levels, grid sizes, math ranges

**If you find yourself typing a number followed by "worksheets", "pages", "themes", "activities", "games", "cards", "problems", or similar nouns - STOP and rephrase.**

---

## ⚠️ MANDATORY WORKFLOW FOR NEW PRODUCTS

**This workflow is REQUIRED before creating thumbnails for any new product.** Following these steps ensures unique, high-quality marketing materials tailored to each specific product.

### 1. Enter Plan Mode (REQUIRED)

**ALWAYS enter plan mode before creating thumbnails for a new product.**

Plan mode enables the use of specialized agents:
- **Explore agent**: Analyze existing samples, product characteristics, and competitor designs
- **Plan agent**: Design a unique marketing strategy for this specific product

```
User: Create TPT thumbnails for [product-name]
Claude: [Enters plan mode to research and design before implementation]
```

**Why plan mode matters:**
- Prevents generic, copy-paste designs
- Ensures proper research before design decisions
- Creates space for strategic thinking about marketing angles

### 2. Invoke Frontend-Design Skill (REQUIRED)

**MUST invoke the `frontend-design` skill for every thumbnail creation task.**

```
/frontend-design
```

This skill:
- Creates distinctive, production-grade designs
- Avoids generic AI aesthetics
- Ensures professional marketing quality
- Produces creative layouts that stand out on TPT

**Never create thumbnails without this skill activated.**

### 3. Product Analysis Phase (REQUIRED)

**Before designing, Claude MUST analyze and document:**

| Analysis Area | What to Examine |
|---------------|-----------------|
| **Sample Images** | Review samples in `tpt-thumbnails/` or on server at `/samples/english/[slug]/` |
| **Product Type** | Math, reading, science, language arts, etc. |
| **Target Audience** | Grade level, age range, special needs considerations |
| **Unique Selling Points** | What makes THIS product different from others? |
| **Color Schemes** | Colors that match worksheet themes and appeal to target audience |
| **Content Features** | Answer keys, difficulty levels, themes (NEVER include page/worksheet counts) |

**Document findings before proceeding to design.** This analysis directly informs design decisions.

Example analysis output:
```
Product: Multiplication Worksheets
- Target: Grades 2-4
- USP: Visual arrays with animal themes
- Colors: Green/orange (nature palette from samples)
- Features: 3 difficulty levels, answer keys included
- Design angle: Emphasize visual learning + fun animal characters
```

### 4. No Repetitive Designs Rule (ABSOLUTE)

**Each product MUST have unique, custom-designed thumbnails.**

| ❌ NOT ALLOWED | ✅ REQUIRED |
|----------------|-------------|
| Copy designs from previous products | Create fresh designs for each product |
| Reuse color schemes without justification | Choose colors based on THIS product's samples |
| Same layout with different text | Design layouts that highlight THIS product's strengths |
| Generic "worksheet bundle" messaging | Messaging tailored to THIS product's unique value |

**Previous templates are for REFERENCE ONLY, not copying.**

When reviewing existing thumbnails:
- Study the TECHNIQUES used (layout principles, typography hierarchy)
- Do NOT copy the specific implementation
- Ask: "What makes THIS product unique?" and design around that answer

### 5. NEVER Include Worksheet/Page Counts (ABSOLUTE)

**⛔ CRITICAL: DO NOT include ANY counts of bundle contents in thumbnails.**

This rule was already stated at the top of this document. This section provides the complete reference.

#### Forbidden Count Types

| ❌ NEVER USE | Why | ✅ Use Instead |
|--------------|-----|----------------|
| "36+ Worksheets" | Count changes when worksheets added | "Complete Bundle" |
| "50+ Pages" | Requires thumbnail updates when bundle grows | "Comprehensive Set" |
| "15 Worksheets" | Locks marketing to specific count | Omit entirely |
| "20 Themes" | Theme count may change | "Multiple Themes" |
| "10 Activities" | Activity count may change | "Activity Collection" |
| "25 Problems" | Problem count irrelevant to buyer | "Practice Problems" |
| "15 Games" | Game count may change | "Game Collection" |
| "30 Cards" | Card count may change | "Card Set" |
| "12 Different Types" | Type count may change | "Variety Included" |
| "8 Levels" | Level count may change | "Multiple Levels" |
| "5 Variations" | Variation count may change | "Multiple Variations" |

#### The Rule in Plain English

**If you're about to type a NUMBER followed by a NOUN that describes bundle contents, STOP and rephrase.**

Examples of the pattern to avoid:
- `[number] + Worksheets` → NO
- `[number] + Themes` → NO
- `[number] + Activities` → NO
- `[number] + Games` → NO
- `[number]+ Pages` → NO (even with "+")

#### Numbers That ARE Permitted

| ✅ Allowed | Example | Why It's OK |
|-----------|---------|-------------|
| Grade levels | "Grades K-2" | These don't change |
| Grid sizes | "5x5 Bingo" | This is a format, not a count |
| Number ranges | "1-10 Addition" | This is what's being practiced |
| Technical specs | "2000x2000" | Format specification |

#### Why This Rule Exists

1. **Thumbnails are permanent** - Once uploaded to TPT, updating them is tedious
2. **Counts are dynamic** - You will add worksheets later
3. **You won't update** - Nobody remembers to update thumbnails when counts change
4. **It's misleading** - Old thumbnails showing "20 Themes" when there are now 25 confuses buyers

**Worksheet/page/theme counts belong on the TPT listing page, NOT in thumbnail images.**

---

## File Structure

Thumbnails are organized by language and subject to match the samples folder structure:

```
tpt-thumbnails/
├── english/
│   ├── addition/
│   │   ├── tpt-thumbnail-1-hero.html         # Main showcase with worksheet stack
│   │   ├── tpt-thumbnail-1-hero.png          # Generated output
│   │   ├── tpt-thumbnail-2-features.html     # Feature highlights
│   │   ├── tpt-thumbnail-2-features.png
│   │   ├── tpt-thumbnail-3-progression.html  # Difficulty progression
│   │   ├── tpt-thumbnail-3-progression.png
│   │   ├── tpt-thumbnail-4-fun.html          # Fun/engaging elements
│   │   ├── tpt-thumbnail-4-fun.png
│   │   ├── tpt-thumbnail-5-professional.html # Professional quality focus
│   │   └── tpt-thumbnail-5-professional.png
│   ├── alphabet-train/
│   │   ├── tpt-thumbnail-1-hero.html
│   │   ├── tpt-thumbnail-1-hero.png
│   │   └── ... (5 HTML + 5 PNG files per product)
│   └── [other-subjects]/
├── german/
│   └── [subjects]/
├── french/
│   └── [subjects]/
└── [other-languages]/
```

**Each product folder contains 10 files:** 5 HTML templates + 5 PNG outputs.

---

## ⚠️ CRITICAL: Real Worksheet Images Required

**Thumbnails MUST display actual worksheet sample images, NOT blank placeholders or generic graphics.**

### Why This Matters

TPT buyers want to see what they're purchasing. Thumbnails with blank worksheet frames or placeholder images:
- Look unprofessional and generic
- Fail to showcase the actual product quality
- Result in lower conversion rates
- Violate TPT best practices

### Image Source Requirements

| Requirement | Details |
|-------------|---------|
| **Source** | Use sample images from `/samples/[language]/[subject]/` on the live server |
| **Format** | JPEG (sample-1.jpeg, sample-5.jpeg, etc.) |
| **URL Pattern** | `https://www.lessoncraftstudio.com/samples/[language]/[subject]/sample-N.jpeg` |
| **Variety** | Use different sample numbers (1, 5, 10, 15) to show worksheet variety |

### Correct Image URL Examples

```html
<!-- ✅ CORRECT - Real worksheet samples from live server -->
<img src="https://www.lessoncraftstudio.com/samples/english/addition/sample-1.jpeg" alt="Addition worksheet">
<img src="https://www.lessoncraftstudio.com/samples/english/addition/sample-5.jpeg" alt="Addition worksheet">
<img src="https://www.lessoncraftstudio.com/samples/german/addition/sample-1.jpeg" alt="Additionsarbeitsblatt">

<!-- ❌ WRONG - Blank placeholders -->
<div class="worksheet-placeholder" style="background: #f0f0f0;"></div>

<!-- ❌ WRONG - Generic stock images -->
<img src="https://example.com/generic-worksheet.png" alt="Worksheet">

<!-- ❌ WRONG - Local file paths (won't work in Puppeteer) -->
<img src="../samples/english/addition/sample-1.jpeg" alt="Worksheet">
```

### Before Creating Thumbnails

1. **Verify samples exist** on the server for your language/subject combination
2. **Test URLs in browser** to confirm images load
3. **Choose representative samples** that showcase worksheet quality

```bash
# Verify samples exist for a product
curl -sI "https://www.lessoncraftstudio.com/samples/english/[subject]/sample-1.jpeg" | head -1
# Expected: HTTP/2 200
```

---

## ⛔ CRITICAL: NEVER GUESS SAMPLE FILENAMES ⛔

```
╔═══════════════════════════════════════════════════════════════════╗
║                                                                   ║
║   NEVER GUESS FILENAMES                                           ║
║   NEVER ASSUME NAMING CONVENTIONS                                 ║
║   ALWAYS LIST THE FOLDER CONTENTS FIRST                           ║
║   ONLY USE FILENAMES YOU HAVE VERIFIED EXIST                      ║
║                                                                   ║
╚═══════════════════════════════════════════════════════════════════╝
```

### The Problem

If you GUESS a filename like `crossword_worksheet.jpeg` and it doesn't exist, you get:
- **404 errors** when Puppeteer tries to load images
- **Broken thumbnails** with missing worksheet previews
- **Wasted time** debugging non-existent files

### The Rule

**Before writing ANY `<img src="...">` tag, you MUST run this command:**

```bash
# MANDATORY: List actual files in the product's sample folder
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "ls /var/www/lcs-media/samples/english/[product-slug]/"
```

**Then use ONLY the filenames that appear in the output.**

### Example Workflow

```bash
# Step 1: LIST what actually exists
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "ls /var/www/lcs-media/samples/english/crossword/"

# Output might show:
# sample-1.jpeg
# sample-2.jpeg
# sample-3.jpeg
# sample-1_thumb.webp
# sample-2_thumb.webp
# ...

# Step 2: USE those exact filenames in your HTML
<img src="https://www.lessoncraftstudio.com/samples/english/crossword/sample-1.jpeg">
<img src="https://www.lessoncraftstudio.com/samples/english/crossword/sample-2.jpeg">
```

### What NOT to Do

```html
<!-- ❌ WRONG - Guessing filename patterns -->
<img src=".../crossword_worksheet.jpeg">     <!-- GUESSED - doesn't exist -->
<img src=".../crossword-sample-1.jpeg">       <!-- GUESSED - doesn't exist -->
<img src=".../worksheet_01.jpeg">             <!-- GUESSED - doesn't exist -->

<!-- ✅ CORRECT - Using verified filenames from ls output -->
<img src=".../sample-1.jpeg">                 <!-- VERIFIED - from ls output -->
<img src=".../sample-2.jpeg">                 <!-- VERIFIED - from ls output -->
```

### Pre-Image Checklist

Before adding ANY sample image to a thumbnail:

- [ ] **I ran the `ls` command** on the product's sample folder
- [ ] **I copied the exact filename** from the command output
- [ ] **I did NOT guess or assume** any naming pattern
- [ ] **The URL I'm using matches** a file that actually exists

**If you haven't run `ls` on the folder, STOP and run it now.**

---

## ⛔ CRITICAL: NEVER ASSUME FOLDER NAMES ⛔

╔═══════════════════════════════════════════════════════════════════╗
║                                                                   ║
║   NEVER ASSUME A FOLDER NAME HAS HYPHENS                          ║
║   NEVER CONVERT SPACES TO HYPHENS IN YOUR HEAD                    ║
║   ALWAYS LIST THE PARENT DIRECTORY FIRST                          ║
║   URL-ENCODE SPECIAL CHARACTERS (space = %20)                     ║
║                                                                   ║
╚═══════════════════════════════════════════════════════════════════╝

### The Problem

If you ASSUME a folder is named `math-worksheet` when it's actually `math worksheet` (with a space):
- **ALL image URLs will 404**
- **ALL thumbnails will have broken images**
- **You'll waste time debugging non-existent paths**

### The Rule

**Before writing ANY image URL, you MUST verify the EXACT folder name:**

1. **List the parent directory to see the actual folder name:**
   ```bash
   "C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "ls /var/www/lcs-media/samples/english/"
   ```

2. **Use the EXACT folder name from the output** (copy-paste, don't type it)

3. **URL-encode special characters for web URLs:**
   - Space → `%20`
   - Ampersand → `%26`
   - Plus → `%2B`

### Common Assumption Mistakes

| ❌ ASSUMED NAME | ✅ ACTUAL NAME | Why Wrong |
|-----------------|----------------|-----------|
| `math-worksheet` | `math worksheet` | Assumed hyphen, actual is space |
| `find-and-count` | `find and count` | Assumed hyphens, actual is spaces |
| `draw_and_color` | `draw-and-color` | Assumed underscore, actual is hyphen |
| `alphabet-train` | `Alphabet Train` | Assumed lowercase, actual has capitals |

### Correct Workflow Example

```bash
# Step 1: LIST the parent directory to see actual folder names
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "ls /var/www/lcs-media/samples/english/"

# Output shows: "math worksheet" (with SPACE, not hyphen)

# Step 2: URL-encode the folder name for web URLs
# "math worksheet" → "math%20worksheet"

# Step 3: Use the correct URL
<img src="https://www.lessoncraftstudio.com/samples/english/math%20worksheet/sample-1.jpeg">
```

### What NOT to Do

```html
<!-- ❌ WRONG - Assumed folder name has hyphens -->
<img src=".../english/math-worksheet/sample-1.jpeg">

<!-- ❌ WRONG - Assumed folder name has underscores -->
<img src=".../english/math_worksheet/sample-1.jpeg">

<!-- ✅ CORRECT - Used verified folder name with URL encoding -->
<img src=".../english/math%20worksheet/sample-1.jpeg">
```

### Pre-URL Checklist

Before writing ANY image URL path:

- [ ] **I ran `ls` on the PARENT directory** to see actual folder names
- [ ] **I copied the EXACT folder name** from the command output
- [ ] **I did NOT assume hyphens, underscores, or any character**
- [ ] **I URL-encoded special characters** (spaces → %20)
- [ ] **I tested the final URL** returns HTTP 200

**If you haven't run `ls` on the parent directory, STOP and run it now.**

---

## ⛔ CRITICAL: VERIFY WORKSHEET ORIENTATION FIRST ⛔

```
╔═══════════════════════════════════════════════════════════════════════════╗
║                                                                           ║
║   STOP! Before designing ANY thumbnail frames:                            ║
║                                                                           ║
║   1. CHECK the actual worksheet dimensions                                ║
║   2. DETERMINE if worksheets are PORTRAIT or LANDSCAPE                    ║
║   3. DESIGN thumbnail frames to MATCH the worksheet orientation           ║
║                                                                           ║
║   Getting this wrong means redoing ALL 5 thumbnails!                      ║
║                                                                           ║
╚═══════════════════════════════════════════════════════════════════════════╝
```

### The Problem

If you design thumbnail frames as **portrait** (taller than wide) but the actual worksheets are **landscape** (wider than tall), the worksheets will appear distorted, cropped, or won't fit properly. This happened with Drawing Lines thumbnails—all 5 had to be recreated because portrait frames were used for landscape worksheets (4752×3672 px).

### The Rule

**ALWAYS check actual worksheet dimensions BEFORE designing any thumbnail layout.**

### How to Check Worksheet Dimensions

Run this command to get the pixel dimensions of sample images:

```bash
# Check dimensions of sample images for a product
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "identify /var/www/lcs-media/samples/english/[product-slug]/sample-1.jpeg"
```

**Example output:**
```
/var/www/lcs-media/samples/english/drawing-lines/sample-1.jpeg JPEG 4752x3672 ...
```

### Determining Orientation

| Dimension Result | Orientation | Thumbnail Frame Style |
|------------------|-------------|----------------------|
| `width > height` (e.g., 4752x3672) | **LANDSCAPE** | Frames should be **wider than tall** |
| `height > width` (e.g., 3672x4752) | **PORTRAIT** | Frames should be **taller than wide** |
| `width = height` (e.g., 2000x2000) | **SQUARE** | Frames should be **square** |

### Calculating Thumbnail Frame Aspect Ratio

Use the source dimensions to calculate the correct aspect ratio for thumbnail frames:

```
Source: 4752 x 3672 (landscape)
Ratio: 4752 / 3672 = 1.294

If your thumbnail frame width is 280px:
Frame height = 280 / 1.294 = 216px

Result: 280px wide × 216px tall (landscape frame)
```

### Common Worksheet Dimensions

| Worksheet Type | Typical Dimensions | Orientation | Frame Ratio |
|----------------|-------------------|-------------|-------------|
| US Letter Portrait | 2550 x 3300 | Portrait | 0.77:1 |
| US Letter Landscape | 3300 x 2550 | Landscape | 1.29:1 |
| A4 Portrait | 2480 x 3508 | Portrait | 0.71:1 |
| A4 Landscape | 3508 x 2480 | Landscape | 1.41:1 |
| Drawing Lines worksheets | 4752 x 3672 | Landscape | 1.29:1 |

### Pre-Design Checklist

Before creating ANY thumbnail for a new product:

- [ ] **I ran the `identify` command** on a sample image
- [ ] **I noted the dimensions** (width × height)
- [ ] **I determined the orientation** (portrait/landscape/square)
- [ ] **My thumbnail frame dimensions match** the worksheet orientation
- [ ] **I calculated the aspect ratio** for my frame sizes

### Visual Reference

```
PORTRAIT Worksheet (height > width)     LANDSCAPE Worksheet (width > height)
┌─────────────┐                         ┌────────────────────┐
│             │                         │                    │
│             │                         │                    │
│  Worksheet  │                         │     Worksheet      │
│             │                         │                    │
│             │                         │                    │
│             │                         └────────────────────┘
└─────────────┘

Thumbnail frame: TALL                   Thumbnail frame: WIDE
```

**If you haven't checked the worksheet dimensions, STOP and run the `identify` command now.**

---

## ⛔ CRITICAL: NEVER ROTATE WORKSHEET IMAGES ⛔

╔════════════════════════════════════════════════════════════════════════════════╗
║                                                                                ║
║   🚫 NEVER apply CSS rotate() to worksheet <img> elements                      ║
║   🚫 NEVER apply CSS rotate() to containers holding worksheet images           ║
║                                                                                ║
║   Rotation causes GRID LINES and FINE DETAILS to appear WAVY/DISTORTED        ║
║   due to browser anti-aliasing during Puppeteer rendering.                     ║
║                                                                                ║
╚════════════════════════════════════════════════════════════════════════════════╝

### The Problem

When you apply `transform: rotate(Xdeg)` to worksheet images, the browser applies
anti-aliasing to smooth the rotated edges. This causes:

- **Grid lines become wavy** (most visible on worksheets with grids/tables)
- **Fine lines appear distorted**
- **Text edges look fuzzy**
- **Overall image quality degrades**

This issue is NOT visible when viewing the HTML in a browser at 100% zoom, but
BECOMES VISIBLE in the final PNG after Puppeteer renders it.

### The Rule

**WORKSHEET IMAGES MUST ALWAYS BE DISPLAYED STRAIGHT (no rotation).**

| Element Type | Rotation Allowed? | Why |
|--------------|-------------------|-----|
| Worksheet `<img>` | ❌ NEVER | Causes distortion |
| Container holding worksheet | ❌ NEVER | Same effect - distorts contents |
| Decorative puzzle pieces | ✅ YES | No fine lines to distort |
| Badges/labels | ✅ YES | Solid colors handle anti-aliasing well |
| Confetti/sparkles | ✅ YES | Abstract shapes aren't affected |
| Background elements | ✅ YES | No precision needed |

### Code Examples

❌ **WRONG - Rotating worksheet image or container:**
```html
<!-- WRONG: Rotation on image -->
<img src=".../sample-1.jpeg" style="transform: rotate(3deg);">

<!-- WRONG: Rotation on container holding image -->
<div style="transform: rotate(-3deg);">
    <img src=".../sample-1.jpeg">
</div>

<!-- WRONG: Rotation combined with other transforms -->
<div style="transform: translateX(-50%) rotate(3deg);">
    <img src=".../sample-1.jpeg">
</div>
```

✅ **CORRECT - Worksheets stay straight, decorations can rotate:**
```html
<!-- CORRECT: Worksheet with NO rotation -->
<div style="transform: translateX(-50%);">
    <img src=".../sample-1.jpeg">
</div>

<!-- CORRECT: Decorative element CAN rotate -->
<div style="transform: rotate(-12deg);">
    <div class="puzzle-piece">1</div>  <!-- Solid color, no fine lines -->
</div>

<!-- CORRECT: Badge CAN rotate -->
<div style="transform: rotate(-8deg);">
    <span class="badge">FREE</span>  <!-- Text on solid background is fine -->
</div>
```

### Visual Comparison

```
ROTATED WORKSHEET (BAD)              STRAIGHT WORKSHEET (GOOD)
┌─────────────────────┐              ┌─────────────────────┐
│ ∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿ │              │ ─────────────────── │
│ ∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿ │              │ ─────────────────── │
│ ∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿ │   →→→       │ ─────────────────── │
│ ∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿ │              │ ─────────────────── │
│ ∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿ │              │ ─────────────────── │
└─────────────────────┘              └─────────────────────┘
Grid lines appear wavy              Grid lines appear straight
and distorted                       and clean
```

### Pre-Creation Checklist

Before adding ANY worksheet image to a thumbnail, verify:

- [ ] **The `<img>` tag has NO `rotate()` in its transform**
- [ ] **The parent container has NO `rotate()` in its transform**
- [ ] **Only non-worksheet decorations use rotation**

### If You Need Visual Interest Without Rotation

Instead of rotating worksheets, create visual interest with:

1. **Offset positioning** - Stagger worksheets horizontally/vertically
2. **Shadow depth** - Different shadow sizes create layering
3. **Scale variation** - Make some worksheets slightly smaller
4. **Decorative rotated elements AROUND the worksheet** - Puzzle pieces, badges, confetti
5. **Border treatments** - Colored borders, frames, mattes

### Real Example: Grid Match Fix

The Grid Match thumbnails had this issue. The fix was:

**Before (distorted):**
```html
transform: translateX(-50%) rotate(3deg);
```

**After (clean):**
```html
transform: translateX(-50%);
```

Simply removing the rotation fixed the wavy grid lines.

---

## Creating Thumbnails for a New Product

### Step 1: Prepare Sample Images

**FIRST, verify what sample images actually exist on the server:**

```bash
# MANDATORY: List actual files before writing any image URLs
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "ls /var/www/lcs-media/samples/english/[product-slug]/"
```

Use the filenames from the output. Common patterns include:
- `sample-1.jpeg`, `sample-2.jpeg`, etc.
- Thumbnails: `sample-1_thumb.webp`, `sample-1_preview.webp`

**Do NOT assume filenames exist. Always verify first.**

Verify images load in browser before proceeding:
```bash
curl -sI "https://www.lessoncraftstudio.com/samples/english/[product-slug]/[actual-filename]" | head -1
# Expected: HTTP/2 200
```

### Step 2: Copy Existing HTML Templates

Copy the 5 HTML files from an existing product (e.g., addition):

```bash
# In tpt-thumbnails folder, copy and rename for new product
cp tpt-thumbnail-1-hero.html tpt-thumbnail-1-hero-[newproduct].html
# Repeat for all 5 files
```

Or simply edit the existing files if replacing.

### Step 3: Update HTML Templates

For each HTML file, update:

1. **Title tag** (line ~6):
   ```html
   <title>FREE [Product Name] Worksheets - Hero</title>
   ```

2. **Image URLs** (find all `<img src=` tags):
   ```html
   <img src="https://www.lessoncraftstudio.com/samples/english/[product-slug]/sample-1.jpeg" alt="...">
   ```

3. **Text content**:
   - Main title: "Addition Worksheets" → "[Product] Worksheets"
   - Badge text: "Addition Bundle" → "[Product] Bundle"
   - Grade badge if different: "GRADES K-2" → appropriate grades

4. **Colors** (optional - match product theme):
   - Background gradient in `.container`
   - Accent colors for badges and borders

### Step 4: Run Conversion Script

```bash
node scripts/convert-tpt-thumbnails.js
```

**Expected output:**
```
Found 5 HTML files to convert

Converting: tpt-thumbnail-1-hero.html
  ✓ Saved: tpt-thumbnail-1-hero.png (1379 KB)
...
```

### Step 5: Verify Output

Check dimensions are 2000x2000:
```bash
node -e "
const fs = require('fs');
const path = require('path');
const dir = 'tpt-thumbnails';
fs.readdirSync(dir).filter(f => f.endsWith('.png')).forEach(file => {
    const buf = fs.readFileSync(path.join(dir, file));
    const width = buf.readUInt32BE(16);
    const height = buf.readUInt32BE(20);
    console.log(file + ': ' + width + ' x ' + height);
});
"
```

**Expected:** All files show `2000 x 2000`

---

## Conversion Script Reference

**Location:** `scripts/convert-tpt-thumbnails.js`

### Critical Settings - DO NOT CHANGE

```javascript
// Viewport: 1000x1000 CSS pixels
await page.setViewport({
    width: 1000,
    height: 1000,
    deviceScaleFactor: 2  // CRITICAL: Creates 2000x2000 output
});

// Screenshot clip: Must match viewport in CSS pixels (NOT physical pixels)
await page.screenshot({
    path: pngPath,
    type: 'png',
    clip: {
        x: 0,
        y: 0,
        width: 1000,   // CSS pixels - scaled to 2000 by deviceScaleFactor
        height: 1000   // CSS pixels - scaled to 2000 by deviceScaleFactor
    }
});
```

### Why These Settings Matter

| Setting | Value | Result |
|---------|-------|--------|
| `viewport.width/height` | 1000 | HTML renders at 1000px CSS |
| `deviceScaleFactor` | 2 | Output is 2x = 2000px physical |
| `clip.width/height` | 1000 | Captures full viewport (CSS pixels) |

**The clip uses CSS pixels, NOT physical pixels.** Puppeteer automatically scales by deviceScaleFactor.

---

## Common Mistakes to Avoid

### Mistake 1: Setting clip to 2000x2000

```javascript
// WRONG - produces 4000x4000 output
clip: { width: 2000, height: 2000 }

// CORRECT - produces 2000x2000 output
clip: { width: 1000, height: 1000 }
```

**Why:** Clip dimensions are CSS pixels. With `deviceScaleFactor: 2`, 1000 CSS = 2000 physical.

### Mistake 2: deviceScaleFactor of 1

```javascript
// WRONG - blurry worksheet images (only 280px effective)
deviceScaleFactor: 1

// CORRECT - sharp worksheet images (560px effective)
deviceScaleFactor: 2
```

**Why:** Worksheets in thumbnails are ~280px CSS containers. At 1x, you capture 280px. At 2x, you capture 560px, preserving detail.

### Mistake 3: Using local image paths

```html
<!-- WRONG - images won't load in Puppeteer -->
<img src="../samples/english/addition/sample-1.jpeg">
<img src="file:///C:/path/to/sample.jpeg">

<!-- CORRECT - use live URLs -->
<img src="https://www.lessoncraftstudio.com/samples/english/addition/sample-1.jpeg">
```

### Mistake 4: Forgetting to verify dimensions

Always verify output dimensions after running the script. Don't assume they're correct.

---

## HTML Template Structure

Each thumbnail HTML follows this structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=1000, height=1000">
    <title>...</title>
    <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Nunito:wght@400;600;700;800&display=swap" rel="stylesheet">
    <style>
        body {
            width: 1000px;
            height: 1000px;
            overflow: hidden;
        }
        .container {
            width: 1000px;
            height: 1000px;
            /* ... */
        }
        /* ... all styles inline ... */
    </style>
</head>
<body>
    <div class="container">
        <!-- All content here -->
    </div>
</body>
</html>
```

**Key requirements:**
- Body and container must be exactly 1000x1000px
- All styles must be inline (no external CSS files)
- Use Google Fonts via CDN (loads during `networkidle0`)
- Images must use full HTTPS URLs

---

## Thumbnail Purposes

| # | Name | Purpose | Key Elements |
|---|------|---------|--------------|
| 1 | Hero | Main product showcase | FREE badge, worksheet stack, grade badge |
| 2 | Features | Highlight included features | Feature icons, bullet points |
| 3 | Progression | Show difficulty levels | Easy/Medium/Hard worksheets |
| 4 | Fun | Emphasize engagement | Fun graphics, kid-friendly elements |
| 5 | Professional | Quality assurance | Print-ready, answer keys, no-prep badges |

---

## Troubleshooting

### Images not loading
- Verify URLs work in browser
- Check `waitUntil: 'networkidle0'` is set
- Increase timeout if needed

### Blurry worksheets
- Confirm `deviceScaleFactor: 2`
- Confirm clip is 1000x1000 (not 2000x2000)

### Wrong dimensions
- Run verification script above
- Check clip matches viewport

### Fonts not rendering
- Confirm Google Fonts link is in `<head>`
- `document.fonts.ready` wait is in script

---

## Quick Reference Commands

```bash
# Generate thumbnails
node scripts/convert-tpt-thumbnails.js

# Verify dimensions
node -e "const fs=require('fs');fs.readdirSync('tpt-thumbnails').filter(f=>f.endsWith('.png')).forEach(f=>{const b=fs.readFileSync('tpt-thumbnails/'+f);console.log(f+': '+b.readUInt32BE(16)+'x'+b.readUInt32BE(20))})"

# Check file sizes
ls -la tpt-thumbnails/*.png
```
