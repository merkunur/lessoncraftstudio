# NEW SECTION TO INSERT IN DEPLOYMENT.MD AFTER LINE 369

---

### Scenario 3.5: Translation Files Updates

**Use this when:** Updating translation files for worksheet generators (translations-*.js files)

**IMPORTANT:** Translation files are **NOT TRACKED BY GIT** (as of commit f9e10bb, 2025-10-23). They are treated as static content with months of improvements.

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

# REPLACEMENT FOR "QUICK FIX" SECTION (LINES 382-388)

### ⚠️ WARNING: There Is NO "Quick Fix" Command

**If website is broken or missing CSS/JS:** DO NOT use `cp -r public` - this is DANGEROUS and will overwrite production files!

**Why `cp -r public` is dangerous:**
- Copies ALL of public/ directory from git
- Git has old/missing versions of:
  - Worksheet generators (not in git since commit f9e10bb)
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

---
