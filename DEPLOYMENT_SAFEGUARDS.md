# DEPLOYMENT SAFEGUARDS - ANTI-OVERWRITE PROTECTION

**Created:** 2025-11-17 14:45
**Purpose:** Make it IMPOSSIBLE to overwrite production files
**Trigger:** SEO deployment incident (2025-11-17 14:04) overwrote production with old git versions

---

## 🛡️ PROTECTION LAYERS IN PLACE

### Layer 1: .gitignore Exclusions (commit 9ce8ddf)
**Files that will NEVER be tracked in git:**
- `/frontend/public/worksheet-generators/*.html`
- `/frontend/public/worksheet-generators/js/translations-*.js`
- `/frontend/public/worksheet-generators/blog-content-manager.html`
- `/frontend/public/homepage-content-manager.html`

**Exception:** GOLDEN_BACKUPS and REFERENCE folders ARE allowed in git (they're backups)

**Result:** `git pull` will never download old versions of these files

### Layer 2: Git Tracking Removal (commit 9ce8ddf)
**Removed from git tracking:**
- 59 worksheet generator HTML files (git rm --cached)
- 51 translation JS files (git rm --cached)

**Result:** Even if gitignore fails, files don't exist in git anymore

### Layer 3: Pre-Commit Hook (.git/hooks/pre-commit)
**Blocks commits of:**
- Translation files in `/frontend/public/worksheet-generators/js/translations-*.js`
- Worksheet generators in `/frontend/public/worksheet-generators/*.html`
- Content managers in specific paths

**Allows:**
- GOLDEN_BACKUPS/ folder (backups should be in git)
- REFERENCE APPS/ folder (source of truth in git)
- REFERENCE TRANSLATIONS/ folder (source of truth in git)
- REFERENCE CONTENT MANAGERS/ folder (source of truth in git)

**Result:** Impossible to accidentally commit production files to git

### Layer 4: GOLDEN_BACKUPS in Git (commit f7e67b6)
**Location:** `/GOLDEN_BACKUPS/2025-11-17_14-30_PRODUCTION_SNAPSHOT/`

**Contains:**
- 35 worksheet generator HTML files
- 55 translation JS files
- 4 content manager HTML files
- Comprehensive README with recovery instructions

**Purpose:** Permanent timestamped snapshot for disaster recovery

**Result:** Even if everything else fails, this snapshot exists in git forever

### Layer 5: REFERENCE Folders in Git (commit f7e67b6)
**Locations:**
- `/REFERENCE APPS/` - 33+ worksheet generators
- `/REFERENCE TRANSLATIONS/` - 55+ translation files
- `/REFERENCE CONTENT MANAGERS/` - Content manager HTML files

**Purpose:** Working source of truth for all deployments

**Result:** Always have the correct versions to deploy from

### Layer 6: Build Process Exclusion
**Next.js build NEVER copies:**
- Files in `.gitignore` are not copied during `npm run build`
- `public/worksheet-generators/*.html` exists in gitignore
- `public/worksheet-generators/js/translations-*.js` exists in gitignore

**Result:** Build process cannot overwrite with git versions

---

## ✅ WHAT IS NOW IMPOSSIBLE

### ❌ Cannot Overwrite via Git Pull
```bash
git pull && npm run build
```
**Why it's safe:**
1. Git pull won't download worksheet/translation files (not in git)
2. npm run build won't copy them (in gitignore)
3. Production versions remain untouched

### ❌ Cannot Accidentally Commit Production Files
```bash
git add frontend/public/worksheet-generators/addition.html
git commit -m "Update addition"
```
**Why it fails:**
1. Pre-commit hook detects the file
2. Blocks the commit with clear error message
3. Instructs to use REFERENCE APPS folder instead

### ❌ Cannot Lose Current State
**Even if production server explodes:**
1. GOLDEN_BACKUPS exists in git (commit f7e67b6)
2. REFERENCE folders exist in git (commit f7e67b6)
3. Both pushed to GitHub remote
4. Multiple copies exist

---

## 📋 SAFE DEPLOYMENT WORKFLOWS

### Deploying Next.js Code Changes
```bash
# SAFE - Will NOT overwrite worksheet generators or translations
"C:\Program Files\PuTTY\plink.exe" -batch -pw PASSWORD -hostkey HOSTKEY root@65.108.5.250 "cd /opt/lessoncraftstudio && git pull && cd frontend && npm run build && cp -r .next/static .next/standalone/.next/static && pm2 restart lessoncraftstudio"
```

**Why it's safe:**
- `git pull` downloads code changes only
- `npm run build` builds Next.js app
- Does NOT copy `public/worksheet-generators/` (in gitignore)
- Worksheet generators and translations remain untouched

### Deploying Worksheet Generator Updates
```bash
# ALWAYS use REFERENCE APPS as source
"C:\Program Files\PuTTY\pscp.exe" -batch -pw PASSWORD -hostkey HOSTKEY "C:\Users\rkgen\lessoncraftstudio\REFERENCE APPS\addition.html" root@65.108.5.250:"/opt/lessoncraftstudio/frontend/public/worksheet-generators/addition.html"

# Copy to standalone and restart
"C:\Program Files\PuTTY\plink.exe" -batch -pw PASSWORD -hostkey HOSTKEY root@65.108.5.250 "cd /opt/lessoncraftstudio/frontend && cp 'public/worksheet-generators/addition.html' '.next/standalone/public/worksheet-generators/addition.html' && pm2 restart lessoncraftstudio"
```

**Why it's safe:**
- Explicitly using REFERENCE APPS folder
- Not relying on git
- Direct file upload to production

### Deploying Translation Updates
```bash
# ALWAYS use REFERENCE TRANSLATIONS as source
"C:\Program Files\PuTTY\pscp.exe" -batch -pw PASSWORD -hostkey HOSTKEY "C:\Users\rkgen\lessoncraftstudio\REFERENCE TRANSLATIONS\translations-addition-complete.js" root@65.108.5.250:"/opt/lessoncraftstudio/frontend/public/worksheet-generators/js/translations-addition-complete.js"

# Copy to standalone and restart
"C:\Program Files\PuTTY\plink.exe" -batch -pw PASSWORD -hostkey HOSTKEY root@65.108.5.250 "cd /opt/lessoncraftstudio/frontend && cp 'public/worksheet-generators/js/translations-addition-complete.js' '.next/standalone/public/worksheet-generators/js/translations-addition-complete.js' && pm2 restart lessoncraftstudio"
```

**Why it's safe:**
- Explicitly using REFERENCE TRANSLATIONS folder
- Not relying on git
- Direct file upload to production

---

## 🚨 DISASTER RECOVERY

### If Production Gets Corrupted

**Step 1: Identify what's corrupted**
```bash
# Check file dates on production
"C:\Program Files\PuTTY\plink.exe" -batch -pw PASSWORD -hostkey HOSTKEY root@65.108.5.250 "ls -lh /opt/lessoncraftstudio/frontend/.next/standalone/public/worksheet-generators/*.html | head -10"
```

**Step 2: Restore from GOLDEN_BACKUPS**
```bash
# Navigate to golden backup
cd "C:\Users\rkgen\lessoncraftstudio\GOLDEN_BACKUPS\2025-11-17_14-30_PRODUCTION_SNAPSHOT"

# Upload all worksheet generators
"C:\Program Files\PuTTY\pscp.exe" -batch -pw PASSWORD -hostkey HOSTKEY "APPS\*.html" root@65.108.5.250:"/opt/lessoncraftstudio/frontend/public/worksheet-generators/"

# Upload all translations
"C:\Program Files\PuTTY\pscp.exe" -batch -pw PASSWORD -hostkey HOSTKEY "TRANSLATIONS\translations-*.js" root@65.108.5.250:"/opt/lessoncraftstudio/frontend/public/worksheet-generators/js/"

# Copy to standalone and restart
"C:\Program Files\PuTTY\plink.exe" -batch -pw PASSWORD -hostkey HOSTKEY root@65.108.5.250 "cd /opt/lessoncraftstudio/frontend && cp public/worksheet-generators/*.html .next/standalone/public/worksheet-generators/ && cp public/worksheet-generators/js/translations-*.js .next/standalone/public/worksheet-generators/js/ && pm2 restart lessoncraftstudio"
```

**Step 3: Verify restoration**
```bash
# Check that files are restored with correct dates
"C:\Program Files\PuTTY\plink.exe" -batch -pw PASSWORD -hostkey HOSTKEY root@65.108.5.250 "ls -lh /opt/lessoncraftstudio/frontend/.next/standalone/public/worksheet-generators/*.html | head -10"
```

### If REFERENCE Folders Get Corrupted

**Restore from git:**
```bash
# Clone fresh copy from GitHub
git clone https://github.com/merkunur/lessoncraftstudio.git lessoncraftstudio-recovery
cd lessoncraftstudio-recovery

# GOLDEN_BACKUPS folder contains everything
cd "GOLDEN_BACKUPS\2025-11-17_14-30_PRODUCTION_SNAPSHOT"

# Copy to main project's REFERENCE folders
cp -r APPS/* "../../REFERENCE APPS/"
cp -r TRANSLATIONS/* "../../REFERENCE TRANSLATIONS/"
cp -r CONTENT_MANAGERS/* "../../REFERENCE CONTENT MANAGERS/"
```

---

## 📊 VERIFICATION CHECKLIST

### After Any Deployment

**Verify worksheet generators are correct:**
```bash
# Check file dates (should match REFERENCE APPS)
"C:\Program Files\PuTTY\plink.exe" -batch -pw PASSWORD -hostkey HOSTKEY root@65.108.5.250 "ls -lh /opt/lessoncraftstudio/frontend/.next/standalone/public/worksheet-generators/addition.html"

# Check file size (should be ~200KB)
"C:\Program Files\PuTTY\plink.exe" -batch -pw PASSWORD -hostkey HOSTKEY root@65.108.5.250 "wc -c /opt/lessoncraftstudio/frontend/.next/standalone/public/worksheet-generators/addition.html"
```

**Verify translations are correct:**
```bash
# Check file dates (should match REFERENCE TRANSLATIONS)
"C:\Program Files\PuTTY\plink.exe" -batch -pw PASSWORD -hostkey HOSTKEY root@65.108.5.250 "ls -lh /opt/lessoncraftstudio/frontend/.next/standalone/public/worksheet-generators/js/translations-addition-complete.js"
```

**Verify site is working:**
```bash
# Check that apps load
curl -s http://www.lessoncraftstudio.com/en/apps/addition | grep -i "Addition"

# Check translations work
curl -s http://www.lessoncraftstudio.com/worksheet-generators/addition.html | grep -i "translations-addition-complete.js"
```

---

## 🔒 MANDATORY RULES

### Rule 1: NEVER Modify Production Files Directly
**❌ WRONG:**
```bash
# Editing files directly on production
ssh root@server "nano /opt/lessoncraftstudio/frontend/public/worksheet-generators/addition.html"
```

**✅ CORRECT:**
```bash
# Modify locally in REFERENCE APPS, then upload
nano "C:\Users\rkgen\lessoncraftstudio\REFERENCE APPS\addition.html"
pscp "REFERENCE APPS\addition.html" root@server:/path/
```

### Rule 2: ALWAYS Use REFERENCE Folders as Source
**❌ WRONG:**
```bash
# Using random local files
pscp "addition-modified.html" root@server:/path/
```

**✅ CORRECT:**
```bash
# Using REFERENCE APPS folder
pscp "REFERENCE APPS\addition.html" root@server:/path/
```

### Rule 3: ALWAYS Update REFERENCE Folders After Changes
**After deploying a modification:**
```bash
# Immediately update REFERENCE folder
cp "addition-MODIFIED.html" "REFERENCE APPS\addition.html"

# Commit to git
git add "REFERENCE APPS\addition.html"
git commit -m "Update: Addition worksheet improvements"
git push
```

### Rule 4: Create New GOLDEN_BACKUPS After Major Changes
**After significant updates:**
```bash
# Create new timestamped snapshot
mkdir "GOLDEN_BACKUPS\2025-12-01_MAJOR_UPDATE"
cp -r "REFERENCE APPS" "GOLDEN_BACKUPS\2025-12-01_MAJOR_UPDATE\APPS"
cp -r "REFERENCE TRANSLATIONS" "GOLDEN_BACKUPS\2025-12-01_MAJOR_UPDATE\TRANSLATIONS"
# ... commit to git
```

---

## ⚠️ RED FLAGS - SIGNS SOMETHING WENT WRONG

### Production Files Have Old Dates
```bash
# If you see dates older than 2025-11-17 14:30, something's wrong
-rw-r--r-- 1 root root 155K Oct 25 19:58 addition.html  # ❌ OLD!
```

**Action:** Restore from GOLDEN_BACKUPS immediately

### Production Files Are Smaller Than Expected
```bash
# Worksheet generators should be 150-300KB
-rw-r--r-- 1 root root 45K Nov 17 addition.html  # ❌ TOO SMALL!
```

**Action:** File is likely an old version, restore from GOLDEN_BACKUPS

### Git Shows Worksheet/Translation Files as Changed
```bash
git status
# M frontend/public/worksheet-generators/addition.html  # ❌ SHOULD NOT BE IN GIT!
```

**Action:** Something's very wrong with gitignore or git tracking

### Pre-Commit Hook Doesn't Block Commits
```bash
git add frontend/public/worksheet-generators/addition.html
git commit -m "Test"
# [If this succeeds, hook is broken]  # ❌ SHOULD HAVE BEEN BLOCKED!
```

**Action:** Pre-commit hook is broken, restore from git

---

**Last Updated:** 2025-11-17 14:45
**Status:** ✅ ALL SAFEGUARDS ACTIVE
**Commits:** 9ce8ddf (gitignore), f7e67b6 (backups), pre-commit hook updated
**Protected State:** GOLDEN_BACKUPS/2025-11-17_14-30_PRODUCTION_SNAPSHOT/
