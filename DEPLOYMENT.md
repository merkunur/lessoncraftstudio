# Production Deployment Guide

---

# 🚨🚨🚨 CRITICAL WARNING - READ THIS FIRST 🚨🚨🚨

## ⛔ MANDATORY SOURCE FILE POLICY ⛔

### 🔴 THE GOLDEN RULE - ABSOLUTELY NO EXCEPTIONS 🔴

**WHEN DEPLOYING OR MODIFYING ANY WORKSHEET GENERATOR OR CONTENT MANAGER:**

```
╔══════════════════════════════════════════════════════════════════╗
║                                                                  ║
║   ✋ STOP! BEFORE YOU DEPLOY ANY APP, READ THIS! ✋              ║
║                                                                  ║
║   ✅ WORKSHEET GENERATORS - Use REFERENCE APPS folder:           ║
║      C:\Users\rkgen\lessoncraftstudio\REFERENCE APPS\           ║
║                                                                  ║
║   ✅ CONTENT MANAGERS - Use REFERENCE CONTENT MANAGERS folder:   ║
║      C:\Users\rkgen\lessoncraftstudio\REFERENCE CONTENT MANAGERS\║
║                                                                  ║
║   ❌ NEVER USE: Random local files like:                         ║
║      • pattern-train-current.html                               ║
║      • addition-production.html                                 ║
║      • homepage-content-manager-v2.html                         ║
║      • blog-content-manager-old.html                            ║
║      • ANY file NOT in REFERENCE folders                        ║
║                                                                  ║
║   ⚠️  WARNING: Using wrong files WILL BREAK PRODUCTION!         ║
║                                                                  ║
╚══════════════════════════════════════════════════════════════════╝
```

### 📋 WHY THIS MATTERS

The project directory contains **HUNDREDS** of old, broken, test, and outdated versions with names like:

**Worksheet Generators:**
- `pattern-train-current.html` ❌ (could be 3 months old)
- `addition-production.html` ❌ (might be a broken test version)
- `wordsearch-deployed.html` ❌ (could be from last year)
- `sudoku-fix-attempt-v5.html` ❌ (experimental, broken)

**Content Managers:**
- `homepage-content-manager-v2.html` ❌ (old version)
- `blog-content-manager-old.html` ❌ (outdated)
- `content-manager-v2.html` ❌ (broken test version)

**THESE ARE NOT THE PRODUCTION VERSIONS!**

The **REFERENCE APPS** folder contains worksheet generators downloaded from:
```
https://www.lessoncraftstudio.com/worksheet-generators/
```

The **REFERENCE CONTENT MANAGERS** folder contains content managers downloaded from:
```
https://www.lessoncraftstudio.com/admin/user-control
https://www.lessoncraftstudio.com/worksheet-generators/content-manager-v2.html
https://www.lessoncraftstudio.com/homepage-content-manager.html
https://www.lessoncraftstudio.com/worksheet-generators/blog-content-manager.html
```

These are the GOLDEN, AUTHORITATIVE, CURRENT versions that users see on the live website.

### 🛡️ MANDATORY PRE-DEPLOYMENT CHECKLIST

**BEFORE deploying ANY worksheet generator app, you MUST:**

1. ✅ **Verify the source file is from REFERENCE APPS folder**
   ```bash
   # CORRECT source path example:
   C:\Users\rkgen\lessoncraftstudio\REFERENCE APPS\wordsearch.html

   # WRONG - DO NOT USE:
   C:\Users\rkgen\lessoncraftstudio\wordsearch-current.html
   C:\Users\rkgen\lessoncraftstudio\wordsearch-production.html
   ```

2. ✅ **Confirm the file exists in REFERENCE APPS**
   ```bash
   ls "C:\Users\rkgen\lessoncraftstudio\REFERENCE APPS\wordsearch.html"
   ```

3. ✅ **Check the file size is reasonable (100KB-200KB typically)**
   ```bash
   ls -lh "C:\Users\rkgen\lessoncraftstudio\REFERENCE APPS\wordsearch.html"
   ```

4. ✅ **State explicitly which file you're using BEFORE deployment**
   - Example: "I will deploy wordsearch.html from REFERENCE APPS folder"

### 🔧 CORRECT DEPLOYMENT WORKFLOW

**Step-by-step process for deploying a worksheet generator app:**

1. **Start with REFERENCE APPS version:**
   ```bash
   # Copy from REFERENCE APPS to working directory if modifications needed
   cp "C:\Users\rkgen\lessoncraftstudio\REFERENCE APPS\wordsearch.html" "C:\Users\rkgen\lessoncraftstudio\wordsearch-MODIFIED.html"
   ```

2. **Make your modifications** (if needed):
   - Edit the `-MODIFIED.html` version
   - Test locally
   - Verify changes

3. **Upload to production server:**
   ```bash
   "C:\Program Files\PuTTY\pscp.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU "C:\Users\rkgen\lessoncraftstudio\wordsearch-MODIFIED.html" root@65.108.5.250:"/opt/lessoncraftstudio/frontend/public/worksheet-generators/wordsearch.html"
   ```

4. **Copy to standalone and restart:**
   ```bash
   "C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "cd /opt/lessoncraftstudio/frontend && cp 'public/worksheet-generators/wordsearch.html' '.next/standalone/public/worksheet-generators/wordsearch.html' && pm2 restart lessoncraftstudio"
   ```

### 🚫 COMMON MISTAKES TO AVOID

❌ **NEVER do this:**
```bash
# WRONG - Using a random local file
pscp wordsearch-current.html root@server:/path/

# WRONG - Using production.html file
pscp addition-production.html root@server:/path/

# WRONG - Using any file outside REFERENCE APPS
pscp pattern-train-deployed.html root@server:/path/
```

✅ **ALWAYS do this:**
```bash
# CORRECT - Using REFERENCE APPS version
pscp "C:\Users\rkgen\lessoncraftstudio\REFERENCE APPS\wordsearch.html" root@server:/path/
```

### 📊 REFERENCE APPS FOLDER CONTENTS

The REFERENCE APPS folder contains exactly **33 production apps**:

1. addition.html
2. alphabet train.html
3. big small.html
4. bingo.html
5. chart count.html
6. code addition.html
7. coloring.html
8. crossword.html
9. cryptogram.html
10. draw and color.html
11. drawing lines.html
12. find and count.html
13. find objects.html
14. grid match.html
15. matching.html
16. math puzzle.html
17. math worksheet.html
18. missing pieces.html
19. more less.html
20. odd one out.html
21. pattern train.html
22. pattern worksheet.html
23. picture path.html
24. picture sort.html
25. prepositions.html
26. shadow match.html
27. subtraction.html
28. sudoku.html
29. treasure hunt.html
30. word guess.html
31. word scramble.html
32. wordsearch.html
33. writing.html

**If you need to deploy any of these 33 apps, you MUST use the version from REFERENCE APPS folder.**

### 🔄 UPDATING REFERENCE APPS

If production apps have been updated and you need to refresh REFERENCE APPS:

```bash
# Download all current production apps
cd "C:\Users\rkgen\lessoncraftstudio\REFERENCE APPS"

# Example: Download updated wordsearch
curl -s -o "wordsearch.html" "https://www.lessoncraftstudio.com/worksheet-generators/wordsearch.html?tier=full&locale=en"
```

---

## 🔴🔴🔴 MANDATORY: UPDATING REFERENCE APPS AFTER MODIFICATIONS 🔴🔴🔴

### ⛔ OBLIGATORY WORKFLOW - THIS IS NOT OPTIONAL ⛔

```
╔══════════════════════════════════════════════════════════════════╗
║                                                                  ║
║   🚨 CRITICAL: AFTER EVERY WORKSHEET/CONTENT MANAGER             ║
║      MODIFICATION, YOU **MUST** UPDATE REFERENCE FOLDERS! 🚨     ║
║                                                                  ║
║   THIS IS AN OBLIGATORY PART OF THE DEPLOYMENT TASK!            ║
║   IT IS NOT AN OPTIONAL FINAL STEP!                             ║
║                                                                  ║
╚══════════════════════════════════════════════════════════════════╝
```

### 📋 THE COMPLETE MANDATORY WORKFLOW

**EVERY time you modify a worksheet generator or content manager, follow this COMPLETE workflow:**

```
1. Start with REFERENCE folder file
   ↓
2. Make modifications
   ↓
3. Upload to production
   ↓
4. Copy to standalone & restart
   ↓
5. ✅ **IMMEDIATELY** update REFERENCE folder with modified version
   ↓
6. Deployment is NOW complete (not before step 5!)
```

### 🔴 WHY THIS IS MANDATORY

**If you skip step 5 (updating REFERENCE folders), you will:**
- ❌ Lose your modifications on next deployment
- ❌ Have outdated files in REFERENCE folders
- ❌ Deploy old versions and break production
- ❌ Create confusion about which version is current
- ❌ Waste hours re-doing work that was lost

**REFERENCE folders must ALWAYS contain the most current production versions.**

### ✅ HOW TO UPDATE REFERENCE APPS (Step 5 - MANDATORY!)

**After deploying a worksheet generator modification:**

```bash
# Copy the modified file to REFERENCE APPS folder
copy "C:\Users\rkgen\lessoncraftstudio\wordsearch-MODIFIED.html" "C:\Users\rkgen\lessoncraftstudio\REFERENCE APPS\wordsearch.html"
```

**After deploying a content manager modification:**

```bash
# Copy the modified file to REFERENCE CONTENT MANAGERS folder
copy "C:\Users\rkgen\lessoncraftstudio\homepage-content-manager-MODIFIED.html" "C:\Users\rkgen\lessoncraftstudio\REFERENCE CONTENT MANAGERS\homepage-content-manager.html"
```

### 📝 DEPLOYMENT CHECKLIST - ALL STEPS REQUIRED

When modifying worksheet generators or content managers, you MUST complete ALL these steps:

- [ ] 1. Start with file from REFERENCE folder
- [ ] 2. Make modifications to a working copy
- [ ] 3. Upload to production server
- [ ] 4. Copy to standalone and restart PM2
- [ ] 5. **MANDATORY: Update REFERENCE folder with modified version**
- [ ] 6. Verify REFERENCE folder now has the updated file

**Steps 1-6 are ALL REQUIRED. The task is NOT complete until step 6 is done.**

### 🚨 CRITICAL REMINDER

```
╔══════════════════════════════════════════════════════════════════╗
║                                                                  ║
║   When you see "DEPLOYMENT.md" referenced:                      ║
║                                                                  ║
║   ✅ Updating REFERENCE folders is OBLIGATORY                    ║
║   ✅ It is a MANDATORY part of every modification task          ║
║   ✅ The deployment is NOT complete without it                  ║
║   ✅ This is NOT an "optional final step"                       ║
║   ✅ This IS a "required step in the workflow"                  ║
║                                                                  ║
╚══════════════════════════════════════════════════════════════════╝
```

---

### ⚠️ FINAL WARNING

**DEPLOYING THE WRONG VERSION CAUSES:**
- ✗ Production bugs that were already fixed
- ✗ Missing features that users expect
- ✗ Broken functionality
- ✗ Hours of debugging and rollback work
- ✗ User complaints and frustration

**Before ANY deployment, ask yourself:**
- "Am I using a file from REFERENCE APPS folder?"
- "Have I verified the full path contains 'REFERENCE APPS'?"
- "Did I check this is NOT a random local file?"

**If you cannot answer YES to all three questions, STOP and verify your source file.**

---

## ⚠️ CRITICAL: Deployment Workflows

**READ THIS SECOND** - Different types of changes require different deployment commands!

### IMPORTANT: Worksheet Generators Are No Longer in Git

**As of commit 9ce8ddf (2025-11-17)**, worksheet generators (*.html files in public/worksheet-generators/) are **NO LONGER TRACKED BY GIT**. They are treated as static assets/content, not source code.

**Why?** Worksheet generators are large files (150-280KB) that change independently of code releases. Having them in git caused repeated production overwrites during code deployments. See commit 9ce8ddf for details.

**What was fixed:** Previous documentation incorrectly claimed commit f9e10bb removed these files, but that commit never existed. In reality, 59 worksheet generators and 51 translation files remained tracked in git until commit 9ce8ddf properly removed them and added them to .gitignore.

---

## Deployment Scenarios

### Scenario 1: Next.js Code Changes (Components, Pages, Navigation, etc.)

**Use this when:** Changing TypeScript/JavaScript code in `frontend/components/`, `frontend/app/`, etc.

```bash
# CORRECT - Deploy code changes only (DO NOT copy worksheet-generators!)
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "cd /opt/lessoncraftstudio && git pull && cd frontend && npm run build && cp -r .next/static .next/standalone/.next/static && pm2 restart lessoncraftstudio"
```

**Note:** We do NOT copy `public/worksheet-generators/` because:
- Worksheet generators are not in git (removed in commit 9ce8ddf)
- Production versions live in REFERENCE APPS folder
- Copying them would use old/missing versions from git

### Scenario 2: Worksheet Generator Updates

**Use this when:** Updating any worksheet generator app (addition.html, wordsearch.html, etc.)

**ALWAYS use REFERENCE APPS folder as source:**

```bash
# Upload specific worksheet generator from REFERENCE APPS
"C:\Program Files\PuTTY\pscp.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU "C:\Users\rkgen\lessoncraftstudio\REFERENCE APPS\addition.html" root@65.108.5.250:"/opt/lessoncraftstudio/frontend/public/worksheet-generators/addition.html"

# Copy to standalone and restart
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "cd /opt/lessoncraftstudio/frontend && cp 'public/worksheet-generators/addition.html' '.next/standalone/public/worksheet-generators/addition.html' && pm2 restart lessoncraftstudio"
```

### Scenario 3: Content Manager Updates

**Use this when:** Updating any content manager (homepage-content-manager.html, blog-content-manager.html, etc.)

**ALWAYS use REFERENCE CONTENT MANAGERS folder as source:**

```bash
# Upload specific content manager from REFERENCE CONTENT MANAGERS
"C:\Program Files\PuTTY\pscp.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU "C:\Users\rkgen\lessoncraftstudio\REFERENCE CONTENT MANAGERS\homepage-content-manager.html" root@65.108.5.250:"/opt/lessoncraftstudio/frontend/public/homepage-content-manager.html"

# Copy to standalone and restart
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "cd /opt/lessoncraftstudio/frontend && cp 'public/homepage-content-manager.html' '.next/standalone/public/homepage-content-manager.html' && pm2 restart lessoncraftstudio"
```

**For worksheet-generators content managers:**
```bash
# Upload blog-content-manager.html
"C:\Program Files\PuTTY\pscp.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU "C:\Users\rkgen\lessoncraftstudio\REFERENCE CONTENT MANAGERS\blog-content-manager.html" root@65.108.5.250:"/opt/lessoncraftstudio/frontend/public/worksheet-generators/blog-content-manager.html"

# Copy to standalone and restart
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "cd /opt/lessoncraftstudio/frontend && cp 'public/worksheet-generators/blog-content-manager.html' '.next/standalone/public/worksheet-generators/blog-content-manager.html' && pm2 restart lessoncraftstudio"
```

**Note:** Content managers are NOT in git (added to .gitignore). Production versions live in REFERENCE CONTENT MANAGERS folder.

---

### Scenario 3.5: Translation Files Updates

**Use this when:** Updating translation files for worksheet generators (translations-*.js files)

**IMPORTANT:** Translation files are **NOT TRACKED BY GIT** (as of commit 9ce8ddf, 2025-11-17). They are treated as static content with months of improvements.

**Why?** Translation files contain:
- Natural language translations across 11 languages
- Contextual help texts and toolbar translations
- New feature translations (theme selectors, controls, etc.)
- Months of careful improvements

Having them in git caused the same deployment issues as worksheet generators - they would get overwritten with old versions.

**ALWAYS use REFERENCE TRANSLATIONS folder as source:**

```bash
# Upload specific translation file from REFERENCE TRANSLATIONS
"C:\Program Files\PuTTY\pscp.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU "C:\Users\rkgen\lessoncraftstudio\REFERENCE TRANSLATIONS\translations-more-less.js" root@65.108.5.250:"/opt/lessoncraftstudio/frontend/public/worksheet-generators/js/translations-more-less.js"

# Copy to standalone and restart
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "cd /opt/lessoncraftstudio/frontend && cp 'public/worksheet-generators/js/translations-more-less.js' '.next/standalone/public/worksheet-generators/js/translations-more-less.js' && pm2 restart lessoncraftstudio"
```

**Bulk Translation Updates** (when updating ALL translation files):

```bash
# 1. Upload all translation files from REFERENCE TRANSLATIONS
"C:\Program Files\PuTTY\pscp.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU -r "REFERENCE TRANSLATIONS\translations-*.js" root@65.108.5.250:"/opt/lessoncraftstudio/frontend/public/worksheet-generators/js/"

# 2. Copy to standalone and restart
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "cd /opt/lessoncraftstudio/frontend && cp -r public/worksheet-generators/js/*.js .next/standalone/public/worksheet-generators/js/ && pm2 restart lessoncraftstudio"
```

**Note:** Translation files are NOT in git. Production versions live in REFERENCE TRANSLATIONS folder.

**⚠️ CRITICAL WARNING:**
- NEVER use `cp -r public/worksheet-generators/js/` from git - this will overwrite improvements with old versions!
- ALWAYS start from REFERENCE TRANSLATIONS folder
- ALWAYS update REFERENCE TRANSLATIONS folder after successful deployment (Step 5 of 6-step workflow)

**6-Step Workflow for Translation Files:**

1. **Start from REFERENCE TRANSLATIONS** - Copy file from `C:\Users\rkgen\lessoncraftstudio\REFERENCE TRANSLATIONS\`
2. **Make modifications** - Add new translation keys, improve existing text
3. **Upload to production** - Use pscp command above
4. **Copy to standalone and restart** - Use plink command above
5. **✅ IMMEDIATELY update REFERENCE TRANSLATIONS folder** - Copy modified file back
6. **Deployment is NOW complete** (not before step 5!)

**Example: Adding new translation keys to More Less app:**

```bash
# 1. Work on local copy from REFERENCE TRANSLATIONS
cd "C:\Users\rkgen\lessoncraftstudio\REFERENCE TRANSLATIONS"
# Edit translations-more-less.js - add new key: "moreless.newfeature": "New Feature"

# 2. Upload to production
"C:\Program Files\PuTTY\pscp.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU "translations-more-less.js" root@65.108.5.250:"/opt/lessoncraftstudio/frontend/public/worksheet-generators/js/translations-more-less.js"

# 3. Deploy to standalone
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "cd /opt/lessoncraftstudio/frontend && cp 'public/worksheet-generators/js/translations-more-less.js' '.next/standalone/public/worksheet-generators/js/translations-more-less.js' && pm2 restart lessoncraftstudio"

# 4. ✅ File is already in REFERENCE TRANSLATIONS (you edited it there)
# Deployment complete!
```

---

### Scenario 4: Static Assets (Images, Uploads, Fonts, etc.)

**Use this when:** Updating images, fonts, or other static assets in `public/images/`, `public/uploads/`, etc.

```bash
# Copy specific public subdirectories (NOT worksheet-generators!)
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "cd /opt/lessoncraftstudio && git pull && cd frontend && npm run build && cp -r .next/static .next/standalone/.next/static && cp -r public/images .next/standalone/public/images && cp -r public/uploads .next/standalone/public/uploads && pm2 restart lessoncraftstudio"
```

**Note:** Copy specific subdirectories, NEVER `cp -r public` which would copy missing worksheet generators!

### ⚠️ WARNING: There Is NO "Quick Fix" Command

**If website is broken or missing CSS/JS:** DO NOT use `cp -r public` - this is DANGEROUS and will overwrite production files!

**Why `cp -r public` is dangerous:**
- Copies ALL of public/ directory from git
- Git has old/missing versions of:
  - Worksheet generators (not in git since commit 9ce8ddf)
  - Content managers (not in git)
  - Translation files (not in git)
- **RESULT:** Months of improvements get overwritten with old versions!

**✅ SAFE Solution - Copy only what you need:**

If CSS/JS is missing (static assets):
```bash
# SAFE: Copy only static assets - excludes worksheet-generators, content managers, and translations
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "cd /opt/lessoncraftstudio/frontend && cp -r .next/static .next/standalone/.next/static && cp -r public/uploads .next/standalone/public/uploads && cp -r public/fonts .next/standalone/public/fonts && pm2 restart lessoncraftstudio"
```

If worksheet generators are missing:
```bash
# Upload from REFERENCE APPS folder - NEVER from git!
"C:\Program Files\PuTTY\pscp.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU -r "REFERENCE APPS\*.html" root@65.108.5.250:"/opt/lessoncraftstudio/frontend/public/worksheet-generators/"
```

If translation files are missing:
```bash
# Upload from REFERENCE TRANSLATIONS folder - NEVER from git!
"C:\Program Files\PuTTY\pscp.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU -r "REFERENCE TRANSLATIONS\translations-*.js" root@65.108.5.250:"/opt/lessoncraftstudio/frontend/public/worksheet-generators/js/"
```

**Remember:** There is NO shortcut. Always follow the proper deployment workflow for the file type you're updating.

**See:** TRANSLATION_OVERWRITE_ROOT_CAUSE_ANALYSIS.md for details on why the "Quick Fix" command was removed.

### Use the Deployment Script (Recommended)

A deployment script has been created at `/opt/lessoncraftstudio/deploy.sh` that handles all this automatically:

```bash
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "bash /opt/lessoncraftstudio/deploy.sh"
```

---

## 🔐🔐🔐 CRITICAL: AUTHENTICATION & SESSION SECURITY FILES 🔐🔐🔐

### ⛔ NEVER MODIFY THESE FILES WITHOUT UNDERSTANDING SECURITY IMPLICATIONS ⛔

**These files implement critical device signout and session validation functionality:**

```
╔═══════════════════════════════════════════════════════════════════╗
║                                                                   ║
║   🚨 AUTHENTICATION-CRITICAL FILES - DO NOT MODIFY! 🚨            ║
║                                                                   ║
║   These files were updated on 2025-10-26 to fix authentication   ║
║   issues. Modifying them incorrectly will BREAK security and     ║
║   UI functionality!                                               ║
║                                                                   ║
║   📁 SECURITY CRITICAL (Device Signout - Commit c6d4950):         ║
║   • frontend/lib/auth.ts (getCurrentUser function)               ║
║   • frontend/lib/auth-middleware.ts (session validation)         ║
║   • frontend/app/api/auth/me/route.ts (session verification)     ║
║   • frontend/app/[locale]/dashboard/page.tsx (session check)     ║
║   • frontend/app/api/auth/force-signin/route.ts (device signout) ║
║                                                                   ║
║   📁 UI STATE CRITICAL (Header Update - Commit 968dfb1):          ║
║   • frontend/app/[locale]/auth/signin/signin-client.tsx          ║
║     (checkAuth() calls on lines 114 & 211)                       ║
║                                                                   ║
║   ⚠️  SECURITY WARNING: Database session checks prevent revoked   ║
║      sessions from continuing to work.                           ║
║                                                                   ║
║   ⚠️  UX WARNING: checkAuth() calls update header immediately.    ║
║      Removing them breaks signin UI state update!                ║
║                                                                   ║
╚═══════════════════════════════════════════════════════════════════╝
```

### 🔒 WHAT THESE FILES DO (Security Implementation)

**Commit:** `c6d4950` (2025-10-26)
**Purpose:** Implement proper session revocation for device conflict modal

#### 1. `frontend/lib/auth.ts` - Core Authentication Logic

**Function:** `getCurrentUser(request: NextRequest)`

**CRITICAL CODE (Lines 25-39):**
```typescript
// Check if session still exists in database (prevents revoked sessions from working)
const session = await prisma.session.findFirst({
  where: {
    token: token,
    userId: payload.userId,
    expiresAt: {
      gt: new Date()  // Session not expired
    }
  }
});

if (!session) {
  // Session was revoked or doesn't exist
  return null;
}
```

**Why Critical:** This function is used by **most API routes** in the application. It validates that sessions still exist in the database after JWT validation. Without this check, revoked sessions continue to work.

**Used By:**
- `/api/users/me/generations`
- All admin API routes
- All protected API endpoints

#### 2. `frontend/lib/auth-middleware.ts` - Middleware Functions

**Functions:** `withAuth()`, `withAdmin()`, `withSubscription()`, `getUserIdFromRequest()`

**CRITICAL CODE (Lines 28-45 in each function):**
```typescript
// Check if session still exists in database (prevents revoked sessions from working)
const session = await prisma.session.findFirst({
  where: {
    token: token,
    userId: payload.userId,
    expiresAt: {
      gt: new Date()  // Session not expired
    }
  }
});

if (!session) {
  // Session was revoked or doesn't exist
  return NextResponse.json(
    { error: 'Session expired or revoked. Please sign in again.' },
    { status: 401 }
  );
}
```

**Why Critical:** These middleware functions protect API routes that explicitly use middleware pattern. Session validation ensures revoked tokens cannot access protected resources.

#### 3. `frontend/app/api/auth/me/route.ts` - User Profile API

**Endpoints:** `GET /api/auth/me` and `PATCH /api/auth/me`

**CRITICAL CODE (Lines 28-45 in GET, Lines 180-197 in PATCH):**
```typescript
// Check if session still exists in database (prevents revoked sessions from working)
const session = await prisma.session.findFirst({
  where: {
    token: token,
    userId: payload.userId,
    expiresAt: {
      gt: new Date()  // Session not expired
    }
  }
});

if (!session) {
  // Session was revoked or doesn't exist
  return NextResponse.json(
    { error: 'Session expired or revoked. Please sign in again.' },
    { status: 401 }
  );
}
```

**Why Critical:** The dashboard calls this endpoint to verify session validity. This is the FIRST endpoint called when a user loads the dashboard, ensuring revoked sessions are immediately detected.

#### 4. `frontend/app/[locale]/dashboard/page.tsx` - Dashboard Session Check

**Function:** `verifySession(token: string)`

**CRITICAL CODE (Lines 143-171):**
```typescript
const verifySession = async (token: string) => {
  try {
    const response = await fetch('/api/auth/me', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      // Session expired or revoked - redirect to signin
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      router.push('/auth/signin');
      return;
    }

    const data = await response.json();
    setUser(data.user);
    fetchRecentGenerations(token);
  } catch (error) {
    console.error('Session verification failed:', error);
    // On error, clear tokens and redirect
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    router.push('/auth/signin');
  }
};
```

**Why Critical:** This is called IMMEDIATELY when dashboard loads. It verifies the session with the API, and if the session was revoked, it clears localStorage and redirects to signin. This is the user-facing trigger for device signout.

#### 5. `frontend/app/api/auth/force-signin/route.ts` - Device Signout

**Endpoint:** `POST /api/auth/force-signin`

**CRITICAL CODE (Lines 106-111):**
```typescript
// REVOKE ALL OTHER SESSIONS (force single device)
const revokedSessions = await prisma.session.deleteMany({
  where: {
    userId: user.id,
    deviceId: { not: deviceId }, // Delete all sessions except current device
  }
});
```

**Why Critical:** This deletes sessions from the database when "Sign out from another device and continue" is clicked. The deletion is what triggers the 401 errors on other devices.

### 🔄 HOW THE COMPLETE FLOW WORKS

**When user clicks "Sign out from another device and continue":**

```
1. Device 2 calls /api/auth/force-signin
   └─> Deletes Device 1's session from database (force-signin/route.ts:106-111)
   └─> Creates new session for Device 2

2. Device 1 loads dashboard (or refreshes page)
   └─> Calls verifySession() (dashboard/page.tsx:143-171)
   └─> Fetches /api/auth/me

3. /api/auth/me validates request
   └─> Checks JWT token validity (me/route.ts:20-26)
   └─> Checks database for session (me/route.ts:28-45)
   └─> Session not found in database!
   └─> Returns 401 "Session expired or revoked"

4. Dashboard receives 401 error
   └─> Clears localStorage (dashboard/page.tsx:153-155)
   └─> Redirects to /auth/signin (dashboard/page.tsx:156)
   └─> ✅ Device 1 is signed out!
```

### ⚠️ CRITICAL WARNINGS

#### ❌ NEVER DO THIS:

1. **Remove database session checks**
   ```typescript
   // ❌ WRONG - This breaks device signout!
   const payload = verifyAccessToken(token);
   if (!payload) {
     return null;
   }
   // Missing: Database session validation
   return user;
   ```

2. **Skip /api/auth/me call in dashboard**
   ```typescript
   // ❌ WRONG - Revoked sessions won't be detected!
   useEffect(() => {
     const token = localStorage.getItem('accessToken');
     const userStr = localStorage.getItem('user');

     if (!token || !userStr) {
       router.push('/auth/signin');
       return;
     }

     setUser(JSON.parse(userStr)); // ❌ No API call!
   }, [router]);
   ```

3. **Only check JWT without database**
   ```typescript
   // ❌ WRONG - Revoked sessions with valid JWTs will work!
   const payload = verifyAccessToken(token);
   if (payload) {
     return user; // ❌ No database check!
   }
   ```

#### ✅ CORRECT PATTERN:

```typescript
// ✅ CORRECT - Always check both JWT AND database
const payload = verifyAccessToken(token);
if (!payload) {
  return null;
}

// Check database - this is CRITICAL
const session = await prisma.session.findFirst({
  where: {
    token: token,
    userId: payload.userId,
    expiresAt: { gt: new Date() }
  }
});

if (!session) {
  return null; // Session revoked
}

// Now safe to return user
return user;
```

### 📋 TESTING CHECKLIST

**After ANY modification to these files, you MUST test:**

1. ✅ Sign in on Device 1 (Chrome)
2. ✅ Sign in on Device 2 (Firefox) → Device conflict modal appears
3. ✅ Click "Sign out from another device and continue" on Device 2
4. ✅ Go to Device 1 → Refresh page
5. ✅ **VERIFY:** Device 1 redirects to signin page
6. ✅ **VERIFY:** Device 1 cannot access dashboard
7. ✅ **VERIFY:** Device 2 continues to work normally

**If ANY of these fail, the fix is BROKEN!**

### 📄 REFERENCE DOCUMENTATION

See `DEVICE_SIGNOUT_BUG_ANALYSIS.md` for complete technical analysis and fix details.

**Analysis Date:** 2025-10-26
**Fixed By:** Claude Code
**Commits:** `79f32f4` (partial), `c6d4950` (complete fix)

---

## Server Information

**Server Address**: 65.108.5.250
**Server User**: root
**Server Password**: JfmiPF_QW4_Nhm
**SSH Host Key Fingerprint**: SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU
**Application Path**: /opt/lessoncraftstudio
**Frontend Path**: /opt/lessoncraftstudio/frontend

## SSH Access Methods

### Method 1: Using PuTTY plink (Windows)
```bash
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "YOUR_COMMAND_HERE"
```

### Method 2: Using SSH (Linux/Mac/Git Bash)
```bash
ssh root@65.108.5.250
# Password: JfmiPF_QW4_Nhm
```

**Note**: PuTTY plink is preferred for Windows environments as it's already installed and configured.

## Important Notes

1. **🔐 CRITICAL: AUTHENTICATION FILES - NEVER MODIFY!** - See "CRITICAL: AUTHENTICATION & SESSION SECURITY FILES" section above. These files implement device signout functionality AND signin UI state updates. Modifying them incorrectly will BREAK security features and UI! (commits c6d4950 & 968dfb1, 2025-10-26)
   - Security: lib/auth.ts, lib/auth-middleware.ts, api/auth/me, dashboard/page.tsx
   - UI State: signin/signin-client.tsx (checkAuth() lines 114 & 211)
2. **🚨 MANDATORY: UPDATE REFERENCE FOLDERS AFTER EVERY MODIFICATION** - This is OBLIGATORY, not optional. See "MANDATORY: UPDATING REFERENCE APPS AFTER MODIFICATIONS" section above. The deployment task is NOT complete until REFERENCE folders are updated!
3. **🚨 WORKSHEET GENERATORS NOT IN GIT** - As of commit 9ce8ddf (2025-11-17), worksheet generators and translation files are NO LONGER tracked by git. Use REFERENCE APPS and REFERENCE TRANSLATIONS folders!
4. **🚨 CONTENT MANAGERS NOT IN GIT** - As of commit [next], content managers are NO LONGER tracked by git. Use REFERENCE CONTENT MANAGERS folder!
5. **🚨 NEVER `cp -r public` IN DEPLOYMENTS** - This will copy MISSING files from git! Use scenario-based commands above.
6. **For code changes** - Use Scenario 1 command (git pull + build, NO public copy)
7. **For worksheet updates** - Use Scenario 2 command (REFERENCE APPS upload + copy to standalone)
8. **For content manager updates** - Use Scenario 3 command (REFERENCE CONTENT MANAGERS upload + copy to standalone)
9. **Production port is 3000** - Local development uses 3001, production uses 3000
10. **PM2 auto-restarts** - If the app crashes, PM2 will automatically restart it
11. **Check logs after deployment** - Always verify no errors in PM2 logs
12. **CRITICAL: Standalone mode** - Production runs in standalone mode. Static files must be copied to `.next/standalone/.next/static/`
13. **Database scripts** - Remember to update port numbers in database scripts (3001 → 3000)
14. **Git conflicts** - Use `git stash && git pull` if local changes conflict
15. **Keep credentials secure** - This file contains sensitive information; do not commit to public repos
16. **Architecture change** - Worksheet generators and content managers are now treated as content/assets, not source code (see ROOT_CAUSE_ANALYSIS.md)

---

**Last Updated**: 2025-11-17 (CRITICAL FIX: Properly removed worksheet generators and translations from git - commit 9ce8ddf)
**Previous Update**: 2025-10-26 (Added critical authentication files documentation)
**Deployment Tool**: PuTTY plink for Windows
**Process Manager**: PM2
**Framework**: Next.js 14.2.18

## 2025-11-17 CRITICAL FIX NOTES

**What Happened:** During SEO deployment, worksheet generators were overwritten with old versions from git.

**Root Cause:** Documentation claimed commit f9e10bb removed worksheet generators from git, but that commit never existed. In reality, 59 worksheet generators and 51 translation files remained tracked in git.

**Fix Applied:** Commit 9ce8ddf properly:
- Added worksheet generators and translations to .gitignore
- Removed all 110 files from git tracking (git rm --cached)
- Restored production from REFERENCE APPS folder
- Updated all incorrect references in this documentation

**Result:** Worksheet generators and translations are now permanently excluded from git. Code deployments will NEVER overwrite them again.
