# GOLDEN PRODUCTION SNAPSHOT - 2025-11-17 14:30

## ⚠️ CRITICAL: THIS IS THE AUTHORITATIVE PRODUCTION STATE

**Created:** 2025-11-17 14:30 UTC
**Purpose:** Permanent backup of production state after critical recovery

## What This Contains

This snapshot contains the EXACT production state of all worksheet generators, translations, and content managers as of 14:30 on November 17, 2025, AFTER the critical recovery from the SEO deployment incident.

### APPS/ (38 worksheet generator HTML files)
- All 33 production worksheet generators
- Uploaded to production at 14:12 from REFERENCE APPS
- Source: Restored from REFERENCE APPS after git overwrite incident

### TRANSLATIONS/ (55 translation JS files)
- All production translation files for worksheet generators
- Uploaded to production at 14:19 from REFERENCE TRANSLATIONS
- Source: Restored from REFERENCE TRANSLATIONS after git overwrite incident

### CONTENT_MANAGERS/ (2 content manager HTML files)
- blog-content-manager.html
- homepage-content-manager.html
- Downloaded directly from production

## Why This Snapshot Exists

### The Incident (2025-11-17 14:04)
During SEO fix deployment, worksheet generators and translations were overwritten with old versions from git because:
1. Documentation incorrectly claimed these files were removed from git in commit "f9e10bb"
2. That commit never existed
3. Files were still tracked in git with old versions
4. `git pull && npm run build` copied old versions, overwriting production improvements

### The Recovery (2025-11-17 14:12-14:19)
1. Restored all 38 worksheet generators from REFERENCE APPS (14:12)
2. Restored all 55 translation files from REFERENCE TRANSLATIONS (14:19)
3. Verified production working correctly
4. Removed files from git tracking (commit 9ce8ddf)
5. Added files to .gitignore
6. Created this snapshot

### The Fix (commit 9ce8ddf)
- Removed 59 worksheet generator HTML files from git tracking
- Removed 51 translation JS files from git tracking
- Added all to .gitignore
- Updated DEPLOYMENT.md with correct information

## THIS IS THE GOLDEN STATE

**If production is EVER corrupted again, restore from this snapshot.**

All files in this folder represent the CORRECT, WORKING, TESTED production versions that:
- Have all features and improvements from months of development
- Are multilingual (11 languages)
- Have been verified working on production
- Include all bug fixes and performance optimizations

## How to Use This Snapshot

### To Restore Production
```bash
# 1. Upload worksheet generators
pscp "APPS/*.html" root@server:/opt/lessoncraftstudio/frontend/public/worksheet-generators/

# 2. Upload translations
pscp "TRANSLATIONS/translations-*.js" root@server:/opt/lessoncraftstudio/frontend/public/worksheet-generators/js/

# 3. Upload content managers
pscp CONTENT_MANAGERS/blog-content-manager.html root@server:/opt/lessoncraftstudio/frontend/public/worksheet-generators/
pscp CONTENT_MANAGERS/homepage-content-manager.html root@server:/opt/lessoncraftstudio/frontend/public/

# 4. Copy to standalone and restart
plink root@server "cd /opt/lessoncraftstudio/frontend && cp public/worksheet-generators/*.html .next/standalone/public/worksheet-generators/ && cp public/worksheet-generators/js/translations-*.js .next/standalone/public/worksheet-generators/js/ && pm2 restart lessoncraftstudio"
```

### To Update REFERENCE Folders
```bash
# Copy from this snapshot to REFERENCE folders
cp -r APPS/* "../REFERENCE APPS/"
cp -r TRANSLATIONS/* "../REFERENCE TRANSLATIONS/"
cp -r CONTENT_MANAGERS/* "../REFERENCE CONTENT MANAGERS/"
```

## File Checksums

Generate checksums to verify integrity:
```bash
cd APPS && sha256sum *.html > ../apps-checksums.txt
cd ../TRANSLATIONS && sha256sum *.js > ../translations-checksums.txt
cd ../CONTENT_MANAGERS && sha256sum *.html > ../content-checksums.txt
```

## DO NOT MODIFY

**NEVER modify files in this snapshot.**
This is a read-only backup for disaster recovery.

If you need to make changes:
1. Modify files in REFERENCE folders
2. Test changes
3. Deploy to production
4. Create a NEW snapshot in a NEW dated folder
5. Keep this snapshot as historical reference

---

**Last Verified:** 2025-11-17 14:30
**Status:** ✅ GOLDEN - DO NOT MODIFY
**Production Server:** 65.108.5.250
**Deployment:** PM2 restart at 14:19, all verified working
