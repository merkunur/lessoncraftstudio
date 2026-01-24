# Blog Post Import Instructions

## Overview

This will import **1,232 blog posts** (112 posts × 11 languages) from the `BLOG BUILDING` folder into your PostgreSQL database.

## Files Created

```
scripts/
├── import-blog-posts.js        # Main import script
├── test-html-parsing.js        # Test parsing before import
├── verify-blog-import.js       # Verify after import
└── IMPORT_INSTRUCTIONS.md      # This file
```

## Prerequisites

1. **Node.js dependencies:**
   ```bash
   cd frontend
   npm install node-html-parser
   ```

2. **Admin authentication token:**
   - Sign in to your admin account via the Blog Content Manager
   - Open browser DevTools → Application → Local Storage
   - Copy the `auth_token` value
   - Set it as an environment variable:
     ```bash
     export ADMIN_AUTH_TOKEN="your-token-here"
     ```

3. **Database running:**
   - Ensure PostgreSQL is running
   - Ensure the frontend server is running (npm run dev)

## Step-by-Step Import Process

### Step 1: Test HTML Parsing (2 minutes)

Run the test script to verify HTML parsing works:

```bash
cd frontend
node scripts/test-html-parsing.js
```

**Expected output:**
```
════════════════════════════════════════════════════
  HTML PARSING TEST
════════════════════════════════════════════════════

📄 Testing: English
   ✅ Parsed successfully
   Slug: 33-editable-worksheet-generators-elementary-teachers
   Title: 33 Editable Worksheet Generators Every Elementary Teacher...
   Content Length: 45000 chars

📄 Testing: Danish
   ✅ Parsed successfully
   ...

✅ TEST COMPLETE
```

**If any errors appear, STOP and report them.**

---

### Step 2: Dry Run Import (5 minutes)

Run the import script in DRY RUN mode to test without actually importing:

```bash
cd frontend
node scripts/import-blog-posts.js
```

The script defaults to `DRY_RUN = true`, so it won't actually import anything.

**Expected output:**
```
════════════════════════════════════════════════════
  BLOG POST IMPORT SCRIPT
  Importing 1,232 posts (112 posts × 11 languages)
════════════════════════════════════════════════════

⚠️  DRY RUN MODE - No actual imports will be performed

📖 Loading post 001...
   ✅ en: 33 Editable Worksheet Generators Every Elementary Teacher...
   ✅ da: 33 Redigerbare Arbejdsark-generatorer Alle Lærere Bør...
   ✅ sv: 33 Redigerbara Arbetsblad-generatorer Alla Lärare Bör...
   ... (11 languages)
   📊 Loaded 11 language versions
   🔍 DRY RUN - Would POST to /api/admin/blog/posts
   ✅ DRY RUN SUCCESS

... (continues for all 112 posts)

════════════════════════════════════════════════════
  IMPORT SUMMARY
════════════════════════════════════════════════════
  Total posts:      112
  ✅ Successful:     112
  ❌ Failed:         0
  ⏭️  Skipped:        0
  ⏱️  Time elapsed:   45s
```

**If you see errors or failed posts, STOP and investigate.**

---

### Step 3: Real Import (15-20 minutes)

Edit `scripts/import-blog-posts.js` and change:

```javascript
const DRY_RUN = false; // Change from true to false
```

Set your auth token:

```bash
export ADMIN_AUTH_TOKEN="your-actual-token-here"
```

Run the real import:

```bash
cd frontend
node scripts/import-blog-posts.js
```

**This will take 15-20 minutes** (500ms delay between each post to avoid overwhelming the server).

**Expected output:**
```
📖 Loading post 001...
   ✅ en: 33 Editable Worksheet Generators...
   ✅ da: 33 Redigerbare Arbejdsark-generatorer...
   ... (11 languages)
   📊 Loaded 11 language versions
   💾 Saving to database...
   ✅ Imported successfully! ID: ck9abc123xyz

... (continues for 112 posts)

════════════════════════════════════════════════════
  IMPORT SUMMARY
════════════════════════════════════════════════════
  Total posts:      112
  ✅ Successful:     112
  ❌ Failed:         0
  ⏭️  Skipped:        0
  ⏱️  Time elapsed:   1200s (20 minutes)
════════════════════════════════════════════════════

✅ Import completed!

Next steps:
1. Verify posts in database: node scripts/verify-blog-import.js
2. Check blog list page: https://lessoncraftstudio.com/blog
3. Check sitemap: https://lessoncraftstudio.com/sitemap.xml
4. Submit sitemap to Google Search Console
```

---

### Step 4: Verify Import (2 minutes)

Run the verification script:

```bash
cd frontend
node scripts/verify-blog-import.js
```

**Expected output:**
```
════════════════════════════════════════════════════
  BLOG IMPORT VERIFICATION
════════════════════════════════════════════════════

📊 Total blog posts in database: 112
✅ Published posts: 112
📝 Draft posts: 0

📚 Language Coverage:
───────────────────────────────────────────────────
  English      (en): 112 posts
  German       (de): 112 posts
  French       (fr): 112 posts
  Spanish      (es): 112 posts
  Portuguese   (pt): 112 posts
  Italian      (it): 112 posts
  Dutch        (nl): 112 posts
  Danish       (da): 112 posts
  Swedish      (sv): 112 posts
  Norwegian    (no): 112 posts
  Finnish      (fi): 112 posts
───────────────────────────────────────────────────
  Total translations: 1,232

... (shows sample posts)

════════════════════════════════════════════════════
  VERIFICATION SUMMARY
════════════════════════════════════════════════════
  Expected posts: 112
  Actual posts:   112

  Expected total translations: 1,232
  Actual total translations:   1,232

✅ VERIFICATION PASSED
   All posts imported successfully!
════════════════════════════════════════════════════
```

---

### Step 5: Verify on Live Site (5 minutes)

1. **Check Blog List Page:**
   - Visit: `https://lessoncraftstudio.com/blog`
   - Should see all 112 posts listed
   - Try switching languages to see translated posts

2. **Check Individual Post:**
   - Click on a post
   - Verify content displays correctly
   - Check that images, formatting, and links work

3. **Check Sitemap:**
   - Visit: `https://lessoncraftstudio.com/sitemap.xml`
   - Should see all 112 blog post URLs (with language variants)
   - Example URLs should appear:
     ```
     /en/blog/33-editable-worksheet-generators-elementary-teachers
     /da/blog/redigerbare-arbejdsark-generatorer-skolelærere
     /sv/blog/redigerbara-arbetsblad-generatorer-larare
     ```

---

### Step 6: Submit to Google Search Console (10 minutes)

1. **Open Google Search Console:**
   - Go to: https://search.google.com/search-console

2. **Submit Sitemap:**
   - Click "Sitemaps" in left menu
   - Enter: `sitemap.xml`
   - Click "Submit"

3. **Request Indexing (Priority Pages):**
   - Click "URL Inspection" in left menu
   - Enter top 10 blog post URLs (Scandinavian languages first)
   - Click "Request Indexing" for each

4. **Monitor Over Next 7 Days:**
   - Check "Coverage" report daily
   - Should see pages moving from "Discovered" → "Indexed"

---

## Troubleshooting

### Error: "ADMIN_AUTH_TOKEN environment variable not set"

**Solution:**
```bash
# Get token from Blog Content Manager (sign in first)
export ADMIN_AUTH_TOKEN="your-token-here"
```

### Error: "Failed to fetch blog post data"

**Solution:**
- Ensure frontend server is running: `npm run dev`
- Check that PostgreSQL is running
- Verify database connection in `.env` file

### Error: "No HTML file found for post XXX"

**Solution:**
- Check that the HTML file exists in the language folder
- Verify filename format: `001-slug-here.html`
- Check if file was accidentally deleted or moved

### Some posts have fewer than 11 translations

**Solution:**
- This is expected if some language folders are incomplete
- The script will import whatever translations exist
- You can add missing translations later via Blog Content Manager

### Posts imported but not showing on blog page

**Solution:**
1. Check status is "published": `node scripts/verify-blog-import.js`
2. Clear Next.js cache: `rm -rf .next` and restart server
3. Force ISR revalidation by visiting: `/api/revalidate?secret=YOUR_SECRET`

---

## After Import: Next Steps

### Immediate (Week 1):
1. ✅ Verify all 112 posts imported successfully
2. ✅ Submit sitemap to Google Search Console
3. ✅ Request indexing for top 20 Scandinavian posts
4. ✅ Monitor Search Console for indexing status

### Short-term (Week 2-4):
1. Check which posts are getting indexed first
2. Monitor keyword rankings (use Google Search Console)
3. Fix any posts with errors or formatting issues
4. Add featured images to top-performing posts

### Long-term (Month 2-6):
1. Monitor traffic from organic search
2. Identify top-performing keywords
3. Create new posts based on high-traffic keywords
4. Add internal links between related posts

---

## Success Metrics

### Week 1:
- ✅ 112 posts in database
- ✅ All posts show "status: published"
- ✅ Sitemap includes all blog URLs
- ✅ Blog list page shows all posts

### Month 1:
- ⏳ 50%+ of Scandinavian posts indexed by Google
- ⏳ First organic traffic from search engines
- ⏳ Posts appearing in Google Search Console (positions 20-100)

### Month 3:
- ⏳ 90%+ of all posts indexed
- ⏳ Scandinavian posts ranking in top 20 for target keywords
- ⏳ Consistent organic traffic (100+ visits/month)

### Month 6:
- ⏳ Multiple Scandinavian posts in top 10
- ⏳ Major European languages starting to rank
- ⏳ Significant organic traffic (500+ visits/month)

---

## Contact / Questions

If you encounter issues during import:

1. **Check the error message** - most issues are self-explanatory
2. **Run verification script** - it will identify specific problems
3. **Review import logs** - look for patterns in errors
4. **Check database directly** - use Prisma Studio or psql

**Remember:** This is a one-time import. Once successful, you can use the Blog Content Manager to add/edit posts normally.
