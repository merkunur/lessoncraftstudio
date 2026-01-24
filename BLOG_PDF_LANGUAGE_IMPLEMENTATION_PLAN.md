# Blog PDF Language-Specific Implementation Plan

**Date:** 2025-11-22
**Objective:** Add support for separate PDF worksheets per language in the Blog Content Manager

---

## Current State Analysis

### Database Schema (BlogPDF table)
```prisma
model BlogPDF {
  id          String   @id @default(cuid())
  postId      String   @map("post_id")
  title       String
  description String   @db.Text
  filename    String
  filePath    String   @map("file_path")
  fileSize    Int      @map("file_size")
  thumbnail   String?
  price       String   @default("Free")
  downloads   Int      @default(0)
  sortOrder   Int      @default(0) @map("sort_order")

  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")

  post      BlogPost @relation("BlogPostPDFs", fields: [postId], references: [id], onDelete: Cascade)
}
```

### Current Behavior
- **BlogPDF table:** Stores ONE PDF record per uploaded file (typically English)
- **BlogPost.translations[lang].pdfs[pdfId]:** Stores language-specific title/description overrides
- **Problem:** Publish API reads from filesystem, not database
- **Result:** Language-specific edits don't appear in published HTML

---

## Proposed Solution: Language-Specific PDF Files

### Design Approach
Each language will have **completely separate PDF files**, not just translated titles/descriptions.

### Database Schema Changes

#### Modified BlogPDF Model
```prisma
model BlogPDF {
  id          String   @id @default(cuid())
  postId      String   @map("post_id")
  language    String   @default("en")  // NEW: Language code (en, de, fr, etc.)
  title       String
  description String   @db.Text
  filename    String
  filePath    String   @map("file_path")
  fileSize    Int      @map("file_size")
  thumbnail   String?
  price       String   @default("Free")
  downloads   Int      @default(0)
  sortOrder   Int      @default(0) @map("sort_order")

  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")

  post      BlogPost @relation("BlogPostPDFs", fields: [postId], references: [id], onDelete: Cascade)

  @@index([postId, language])  // NEW: Compound index for efficient queries
  @@map("blog_pdfs")
}
```

**Key Changes:**
1. Add `language` field (defaults to "en")
2. Add compound index `[postId, language]` for efficient queries
3. Remove `BlogPost.translations[lang].pdfs` structure (no longer needed)

### File Storage Structure

#### Current:
```
/public/blog/pdfs/[slug]/
  - worksheet-1.pdf
  - worksheet-2.pdf
/public/blog/thumbnails/[slug]/
  - worksheet-1.png
  - worksheet-2.png
```

#### Proposed:
```
/public/blog/pdfs/[slug]/[language]/
  - worksheet-1.pdf
  - worksheet-2.pdf
/public/blog/thumbnails/[slug]/[language]/
  - worksheet-1.png
  - worksheet-2.png
```

**Example:**
```
/public/blog/pdfs/backward-design/en/
  - backward-planning-worksheet.pdf
/public/blog/pdfs/backward-design/de/
  - rueckwaertsplanung-arbeitsblatt.pdf
/public/blog/thumbnails/backward-design/en/
  - backward-planning-worksheet.png
/public/blog/thumbnails/backward-design/de/
  - rueckwaertsplanung-arbeitsblatt.png
```

---

## Implementation Steps

### Step 1: Database Migration

**File:** `frontend/prisma/migrations/YYYYMMDDHHMMSS_add_language_to_blog_pdfs/migration.sql`

```sql
-- Add language column with default value
ALTER TABLE "blog_pdfs" ADD COLUMN "language" TEXT NOT NULL DEFAULT 'en';

-- Create compound index for efficient queries
CREATE INDEX "blog_pdfs_postId_language_idx" ON "blog_pdfs"("post_id", "language");

-- Optional: Migrate existing PDFs to English
-- (All existing PDFs are assumed to be English)
UPDATE "blog_pdfs" SET "language" = 'en' WHERE "language" IS NULL;
```

**Migration Command:**
```bash
cd frontend
npx prisma migrate dev --name add_language_to_blog_pdfs
npx prisma generate
```

---

### Step 2: Backend API Changes

#### 2.1 Upload PDF API
**File:** `frontend/app/api/admin/blog/posts/[slug]/pdfs/route.ts`

**Changes:**
- Extract `language` from formData
- Create language-specific subdirectory: `/blog/pdfs/[slug]/[language]/`
- Save PDF to language-specific path
- Create BlogPDF record with language field

**Modified Code:**
```typescript
export async function POST(request: NextRequest, { params }: { params: { slug: string } }) {
  // ... auth check ...

  const formData = await request.formData();
  const language = (formData.get('language') as string) || 'en'; // NEW
  const pdfFile = formData.get('pdf') as File;
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const price = formData.get('price') as string || 'Free';
  const thumbnailFile = formData.get('thumbnail') as File | null;

  // ... validation ...

  // Save PDF to language-specific directory
  const pdfBuffer = Buffer.from(await pdfFile.arrayBuffer());
  const pdfFilename = generateUniqueFilename(pdfFile.name);
  const pdfPath = await saveFile(pdfBuffer, pdfFilename, 'blogPdfs', `${params.slug}/${language}`); // MODIFIED

  // Save thumbnail to language-specific directory (if provided)
  let thumbnailPath: string | null = null;
  if (thumbnailFile && thumbnailFile.size > 0) {
    const thumbnailBuffer = Buffer.from(await thumbnailFile.arrayBuffer());
    const thumbnailFilename = generateUniqueFilename(thumbnailFile.name);
    thumbnailPath = await saveFile(thumbnailBuffer, thumbnailFilename, 'blogThumbnails', `${params.slug}/${language}`); // MODIFIED
  }

  // Create BlogPDF record with language
  const pdf = await prisma.blogPDF.create({
    data: {
      postId: post.id,
      language,  // NEW
      title,
      description,
      filename: pdfFile.name,
      filePath: pdfPath,
      fileSize: pdfFile.size,
      thumbnail: thumbnailPath,
      price,
    },
  });

  return NextResponse.json({ pdf });
}
```

#### 2.2 Get PDFs API
**File:** `frontend/app/api/admin/blog/posts/[slug]/pdfs/route.ts`

**Changes:**
- Filter PDFs by language query parameter
- Return only PDFs for requested language

**Modified Code:**
```typescript
export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  // ... auth check ...

  const { searchParams } = new URL(request.url);
  const language = searchParams.get('language') || 'en'; // NEW

  const post = await prisma.blogPost.findUnique({
    where: { slug: params.slug },
    include: {
      pdfs: {
        where: { language },  // NEW: Filter by language
        orderBy: { sortOrder: 'asc' }
      }
    }
  });

  return NextResponse.json({ pdfs: post?.pdfs || [] });
}
```

#### 2.3 Update PDF API
**File:** `frontend/app/api/admin/blog/posts/[slug]/pdfs/[id]/route.ts`

**Changes:**
- Keep language field immutable (cannot change PDF's language after creation)
- Update title, description, thumbnail as before

**No significant changes needed** - language is set at creation and never changes.

#### 2.4 Delete PDF API
**File:** `frontend/app/api/admin/blog/posts/[slug]/pdfs/[id]/route.ts`

**No changes needed** - deletion works the same regardless of language.

---

### Step 3: Blog Content Manager UI Changes

**File:** `REFERENCE CONTENT MANAGERS/blog-content-manager.html`

#### 3.1 Modify loadPostPDFs() Function

**Current behavior:** Loads PDFs from BlogPDF table and merges with translations JSON

**New behavior:** Load PDFs filtered by current language

**Modified Code:**
```javascript
async function loadPostPDFs(slug) {
    console.log('🔍 [DIAGNOSTIC] loadPostPDFs() called');
    console.log('   📍 currentLanguage:', currentLanguage);
    console.log('   📍 slug:', slug);

    try {
        // Fetch PDFs for current language from BlogPDF table
        const pdfResponse = await authenticatedFetch(
            `/api/admin/blog/posts/${slug}/pdfs?language=${currentLanguage}`,  // MODIFIED: Add language parameter
            {}
        );

        if (pdfResponse.ok) {
            const pdfData = await pdfResponse.json();
            console.log(`   📦 BlogPDF table data for ${currentLanguage}:`, pdfData.pdfs);

            // No need to merge with translations anymore - PDFs are language-specific
            currentPDFs = pdfData.pdfs.map(pdf => ({
                id: pdf.id,
                title: pdf.title,
                description: pdf.description,
                filename: pdf.filename,
                size: formatFileSize(pdf.fileSize),
                price: pdf.price || 'Free',
                thumbnail: pdf.thumbnail,
                language: pdf.language  // NEW
            }));

            console.log(`   ✅ Loaded ${currentPDFs.length} PDFs for ${currentLanguage}`);
            renderPDFGrid();
        }
    } catch (error) {
        console.error('Error loading PDFs:', error);
        showMessage('Failed to load PDFs', 'error');
    }
}
```

#### 3.2 Modify savePDF() Function

**Current behavior:** Saves to BlogPDF with placeholder, then updates translations JSON

**New behavior:** Save directly to BlogPDF with current language

**Modified Code:**
```javascript
async function savePDF() {
    const title = document.getElementById('modalPDFTitle').value;
    const description = document.getElementById('modalPDFDescription').value;
    const fileInput = document.getElementById('modalPDFFile');
    const thumbnailInput = document.getElementById('modalPDFThumbnail');
    const price = document.getElementById('modalPDFPrice').value === 'free' ? 'Free' : 'Premium';

    if (!title || !fileInput.files[0]) {
        showMessage('Please provide a title and select a PDF file', 'error');
        return;
    }

    const slug = currentPost ? currentPost.slug :
                 (document.getElementById('editorPostSelect').value ||
                  document.getElementById('pdfManagerPostSelect').value);

    if (!slug) {
        showMessage('Please select a blog post first', 'error');
        return;
    }

    try {
        const formData = new FormData();
        formData.append('pdf', fileInput.files[0]);
        formData.append('language', currentLanguage);  // NEW: Send current language
        formData.append('title', title);
        formData.append('description', description);
        formData.append('price', price);

        if (thumbnailInput && thumbnailInput.files[0]) {
            formData.append('thumbnail', thumbnailInput.files[0]);
        }

        console.log(`📤 Uploading PDF for language: ${currentLanguage}`);

        const response = await authenticatedFetch(`/api/admin/blog/posts/${slug}/pdfs`, {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            showMessage(`PDF uploaded successfully for ${currentLanguage.toUpperCase()}!`, 'success');
            closePDFModal();
            await loadPostPDFs(slug);

            // Refresh PDF manager if active
            const pdfManagerSlug = document.getElementById('pdfManagerPostSelect').value;
            if (pdfManagerSlug === slug) {
                await loadPDFsForPost();
            }
        } else {
            const error = await response.json();
            throw new Error(error.error || 'Failed to upload PDF');
        }
    } catch (error) {
        console.error('Error uploading PDF:', error);
        showMessage(`Failed to upload PDF: ${error.message}`, 'error');
    }
}
```

#### 3.3 Modify saveEditedPDF() Function

**Current behavior:** Updates BlogPDF (English) OR translations JSON (other languages)

**New behavior:** Always update BlogPDF record (language is immutable)

**Modified Code:**
```javascript
async function saveEditedPDF() {
    const id = document.getElementById('editPDFId').value;
    const title = document.getElementById('editPDFTitle').value.trim();
    const description = document.getElementById('editPDFDescription').value.trim();
    const price = document.getElementById('editPDFPrice').value;
    const thumbnailInput = document.getElementById('editPDFThumbnail');

    if (!title) {
        showMessage('Title is required', 'error');
        return;
    }

    const slug = document.getElementById('editorPostSelect').value ||
                 document.getElementById('pdfManagerPostSelect').value;

    if (!slug) {
        showMessage('Error: No post selected', 'error');
        return;
    }

    try {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('price', price);
        // NOTE: Language is NOT sent - it's immutable and set at creation

        if (thumbnailInput.files && thumbnailInput.files[0]) {
            formData.append('thumbnail', thumbnailInput.files[0]);
        }

        const response = await authenticatedFetch(`/api/admin/blog/posts/${slug}/pdfs/${id}`, {
            method: 'PUT',
            body: formData
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to update PDF');
        }

        console.log(`✅ PDF updated successfully`);
        showMessage('PDF updated successfully!', 'success');
        closeEditPDFModal();
        await loadPostPDFs(slug);

        const pdfManagerSlug = document.getElementById('pdfManagerPostSelect').value;
        if (pdfManagerSlug === slug) {
            await loadPDFsForPost();
        }
    } catch (error) {
        console.error('Error updating PDF:', error);
        showMessage(`Failed to update PDF: ${error.message}`, 'error');
    }
}
```

#### 3.4 Add Language Indicator in PDF Grid

**Show which language each PDF belongs to:**

```javascript
function renderPDFGrid() {
    const grid = document.getElementById('pdfGrid');

    if (currentPDFs.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; color: #6b7280;">
                <div style="font-size: 48px; margin-bottom: 16px;">📄</div>
                <p style="font-size: 16px; margin-bottom: 20px;">No PDFs for ${currentLanguage.toUpperCase()} yet</p>
                <button class="btn btn-primary" onclick="openPDFModal()">Add Your First PDF</button>
            </div>
        `;
        return;
    }

    grid.innerHTML = currentPDFs.map(pdf => `
        <div class="pdf-card">
            ${pdf.thumbnail ?
                `<img src="${pdf.thumbnail}" alt="${pdf.title}" class="pdf-thumbnail">` :
                `<div class="pdf-thumbnail-placeholder">📄 PDF</div>`
            }
            <div class="pdf-card-content">
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 8px;">
                    <h4 class="pdf-card-title">${pdf.title}</h4>
                    <span class="language-badge">${pdf.language.toUpperCase()}</span>
                </div>
                <p class="pdf-card-description">${pdf.description}</p>
                <div class="pdf-card-meta">
                    <span>📦 ${pdf.size}</span>
                    <span>💰 ${pdf.price}</span>
                </div>
                <div class="pdf-card-actions">
                    <button class="btn btn-sm btn-secondary" onclick="editPDF('${pdf.id}')">✏️ Edit</button>
                    <button class="btn btn-sm btn-danger" onclick="removePDF('${pdf.id}')">🗑️ Delete</button>
                </div>
            </div>
        </div>
    `).join('');
}
```

**Add CSS for language badge:**
```css
.language-badge {
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    color: white;
    padding: 4px 12px;
    border-radius: 12px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.5px;
}
```

#### 3.5 Reload PDFs When Language Changes

**Add to loadPostForEditing() function:**

```javascript
async function loadPostForEditing() {
    const postSlug = document.getElementById('editorPostSelect').value;
    currentLanguage = document.getElementById('editorLanguage').value;

    // ... existing code to load post data ...

    // Reload PDFs for new language
    await loadPostPDFs(postSlug);  // NEW: Reload PDFs when language changes
}
```

---

### Step 4: Publish API Changes

**File:** `frontend/app/api/blog/publish/route.ts`

#### 4.1 Modify generateStaticHTML() Function

**Current behavior:** Reads PDFs from filesystem

**New behavior:** Fetch PDFs from database filtered by language

**Modified Code:**
```typescript
async function generateStaticHTML(data: any, locale: string): Promise<string> {
  const { title, content, metaTitle, metaDescription, keywords, category, author, date, readTime, slug } = data;

  // Fetch PDFs for this language from database
  const post = await prisma.blogPost.findUnique({
    where: { slug },
    include: {
      pdfs: {
        where: { language: locale },  // NEW: Filter by language
        orderBy: { sortOrder: 'asc' }
      }
    }
  });

  const pdfsToShow = post?.pdfs || [];

  // Get PDF section translations
  const pdfTitle = data.pdfSectionTitle || (WORKSHEET_TRANSLATIONS[locale] || WORKSHEET_TRANSLATIONS['en']).title;
  const pdfSubtitle = data.pdfSectionDescription || (WORKSHEET_TRANSLATIONS[locale] || WORKSHEET_TRANSLATIONS['en']).subtitle;
  const translations = WORKSHEET_TRANSLATIONS[locale] || WORKSHEET_TRANSLATIONS['en'];
  const pdfFreeLabel = data.pdfFreeLabel || translations.freeText;
  const pdfPremiumLabel = data.pdfPremiumLabel || 'Premium';
  const pdfDownloadButton = data.pdfDownloadButton || translations.downloadText;

  // Generate worksheet section
  const worksheetSection = pdfsToShow.length > 0 ? `
    <section class="sample-worksheets" id="sample-worksheets">
      <div class="worksheets-container">
        <div class="section-header">
          <h2 class="section-title">${pdfTitle}</h2>
          <p class="section-subtitle">${pdfSubtitle}</p>
        </div>

        <div class="worksheet-grid">
          ${pdfsToShow.map((pdf: any, index: number) => {
            const displayTitle = pdf.title;
            const displayDescription = pdf.description;
            const thumbnail = pdf.thumbnail || '/blog/thumbnails/default-pdf.svg';
            const fileSize = `${(pdf.fileSize / 1024).toFixed(1)} KB`;
            const filePath = pdf.filePath;

            return `
          <div class="worksheet-card">
            <div class="card-thumbnail">
              ${thumbnail && thumbnail !== '/blog/thumbnails/default-pdf.svg' ?
                `<img src="${thumbnail}" alt="${displayTitle} preview" loading="lazy" />` :
                `<div class="default-pdf-icon">
                  <svg width="80" height="100" viewBox="0 0 80 100" fill="none">
                    <rect width="80" height="100" rx="8" fill="url(#pdf-gradient-${index})"/>
                    <text x="40" y="60" font-family="system-ui" font-size="24" font-weight="bold" text-anchor="middle" fill="white">PDF</text>
                  </svg>
                  <defs>
                    <linearGradient id="pdf-gradient-${index}" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style="stop-color:#ef4444;stop-opacity:1" />
                      <stop offset="100%" style="stop-color:#dc2626;stop-opacity:1" />
                    </linearGradient>
                  </defs>
                </div>`
              }
              <div class="card-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
                  <path d="M14 2v6h6" stroke="white" stroke-width="2"/>
                </svg>
                PDF
              </div>
            </div>
            <div class="card-content">
              <h3 class="card-title">${displayTitle}</h3>
              <p class="card-description">${displayDescription}</p>
              <div class="card-meta">
                <span class="meta-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                    <line x1="9" y1="9" x2="15" y2="9"/>
                    <line x1="9" y1="15" x2="15" y2="15"/>
                  </svg>
                  ${fileSize}
                </span>
                <span class="meta-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                  </svg>
                  ${pdf.price === 'Free' ? pdfFreeLabel : pdfPremiumLabel}
                </span>
              </div>
            </div>
            <a href="${filePath}"
               download="${pdf.filename}"
               class="download-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M12 2v13m0 0l-4-4m4 4l4-4"/>
                <path d="M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2h-2"/>
                <path d="M5 19a2 2 0 01-2-2v-5a2 2 0 012-2h2"/>
              </svg>
              <span>${pdfDownloadButton}</span>
              <svg class="arrow-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M5 12h14m-7-7l7 7-7 7"/>
              </svg>
            </a>
          </div>`;
          }).join('')}
        </div>
      </div>
    </section>
  ` : '';

  // ... rest of HTML generation ...
}
```

---

## Deployment Workflow (CRITICAL - Following DEPLOYMENT.md)

### Phase 1: Database Migration (Production Server)

```bash
# SSH to production server
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250

# Navigate to frontend directory
cd /opt/lessoncraftstudio/frontend

# Run migration
npx prisma migrate deploy

# Generate Prisma client
npx prisma generate

# Restart application
pm2 restart lessoncraftstudio
```

### Phase 2: Backend API Deployment

**Files to modify:**
1. `frontend/app/api/admin/blog/posts/[slug]/pdfs/route.ts` (POST and GET)
2. `frontend/app/api/blog/publish/route.ts` (generateStaticHTML)

**Steps:**
1. Modify files locally in git
2. Commit changes
3. Push to GitHub
4. Deploy to production:
```bash
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "cd /opt/lessoncraftstudio && git pull && cd frontend && npm run build && cp -r .next/static .next/standalone/.next/static && pm2 restart lessoncraftstudio"
```

### Phase 3: Blog Content Manager Deployment

**MANDATORY PRE-DEPLOYMENT CHECKLIST:**
- [ ] ✅ Source file is from: `C:\Users\rkgen\lessoncraftstudio\REFERENCE CONTENT MANAGERS\blog-content-manager.html`
- [ ] ✅ Verified full path contains 'REFERENCE CONTENT MANAGERS'
- [ ] ✅ NOT using random local files
- [ ] ✅ Stated explicitly: "I will deploy blog-content-manager.html from REFERENCE CONTENT MANAGERS folder"

**Steps:**
1. **Start with REFERENCE folder file:**
   ```bash
   copy "C:\Users\rkgen\lessoncraftstudio\REFERENCE CONTENT MANAGERS\blog-content-manager.html" "C:\Users\rkgen\lessoncraftstudio\blog-content-manager-LANGUAGE-PDFS.html"
   ```

2. **Make modifications** (as outlined in Step 3 above)

3. **Upload to production:**
   ```bash
   "C:\Program Files\PuTTY\pscp.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU "C:\Users\rkgen\lessoncraftstudio\blog-content-manager-LANGUAGE-PDFS.html" root@65.108.5.250:"/opt/lessoncraftstudio/frontend/public/worksheet-generators/blog-content-manager.html"
   ```

4. **Copy to standalone and restart:**
   ```bash
   "C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "cd /opt/lessoncraftstudio/frontend && cp 'public/worksheet-generators/blog-content-manager.html' '.next/standalone/public/worksheet-generators/blog-content-manager.html' && pm2 restart lessoncraftstudio"
   ```

5. **✅ MANDATORY: Update REFERENCE folder:**
   ```bash
   copy "C:\Users\rkgen\lessoncraftstudio\blog-content-manager-LANGUAGE-PDFS.html" "C:\Users\rkgen\lessoncraftstudio\REFERENCE CONTENT MANAGERS\blog-content-manager.html"
   ```

6. **Deployment is NOW complete** (not before step 5!)

---

## Testing Plan

### Test Case 1: Upload PDF for English
1. Open Blog Content Manager
2. Select a blog post
3. Select language: English (en)
4. Upload a PDF with English title/description
5. **Verify:** PDF appears in grid with "EN" badge
6. **Verify:** Database has BlogPDF record with language="en"
7. **Verify:** File saved to `/blog/pdfs/[slug]/en/`

### Test Case 2: Upload PDF for German
1. Select same blog post
2. Select language: German (de)
3. Upload a DIFFERENT PDF with German title/description
4. **Verify:** PDF appears in grid with "DE" badge
5. **Verify:** English PDF still shows when switching back to English
6. **Verify:** Database has separate BlogPDF record with language="de"
7. **Verify:** File saved to `/blog/pdfs/[slug]/de/`

### Test Case 3: Edit PDF
1. Select English language
2. Edit an English PDF's title/description
3. **Verify:** Changes saved to BlogPDF table
4. Switch to German
5. **Verify:** German PDFs unchanged

### Test Case 4: Publish Blog Post
1. Save blog post with content in multiple languages
2. Upload PDFs for multiple languages
3. Click "Publish to Static HTML"
4. **Verify:** Each language HTML file shows only that language's PDFs
5. **Verify:** English HTML shows English PDFs
6. **Verify:** German HTML shows German PDFs

### Test Case 5: Delete PDF
1. Select a language
2. Delete a PDF
3. **Verify:** PDF removed from database
4. **Verify:** File deleted from filesystem
5. **Verify:** Other language PDFs unaffected

---

## Migration of Existing Data

### Current State
- Existing BlogPDF records have no language field (will default to "en")
- Existing PDFs stored in `/blog/pdfs/[slug]/` (no language subdirectory)

### Migration Strategy

**Option 1: Automatic Migration (Recommended)**
- After adding `language` column, all existing PDFs automatically get `language = 'en'`
- No data loss
- Existing PDFs continue to work
- Can manually reorganize files later

**Option 2: File Reorganization**
- Create script to move existing PDFs to `/en/` subdirectories
- Update filePath in database
- More clean, but riskier

**Recommendation:** Use Option 1. Existing PDFs work immediately as English PDFs.

---

## Backwards Compatibility

### BlogPost.translations[lang].pdfs Structure
- **Current:** Used for language-specific title/description overrides
- **After migration:** NO LONGER USED
- **Action:** Can be removed from BlogPost.translations in future cleanup
- **Safety:** Keep for now to avoid breaking existing code that reads it

---

## Rollback Plan

If implementation fails, rollback steps:

1. **Database rollback:**
   ```bash
   cd /opt/lessoncraftstudio/frontend
   npx prisma migrate resolve --rolled-back MIGRATION_NAME
   ```

2. **Restore blog content manager from REFERENCE:**
   - Download previous version from REFERENCE CONTENT MANAGERS
   - Upload to production

3. **Restore backend files from git:**
   ```bash
   cd /opt/lessoncraftstudio
   git revert COMMIT_HASH
   git push
   # Deploy as usual
   ```

---

## Summary

This implementation provides:
- ✅ **Separate PDF files per language** (not just translated titles)
- ✅ **Database-backed** (publish API reads from database)
- ✅ **Language-specific file organization**
- ✅ **Clean UI** (language badges, filtered display)
- ✅ **Backwards compatible** (existing English PDFs work)
- ✅ **Follows DEPLOYMENT.md** (uses REFERENCE folders, 6-step workflow)

**Next Step:** Review this plan and confirm approval to proceed with implementation.
