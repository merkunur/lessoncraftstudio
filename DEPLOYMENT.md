# Production Deployment Guide

## Quick Reference

- **deploy.sh** handles all code deployments (commit + push first!)
- **REFERENCE APPS/** = source of truth for worksheet generators
- **REFERENCE TRANSLATIONS/** = source of truth for translation files
- **REFERENCE CONTENT MANAGERS/** = source of truth for content managers
- Worksheet generators, translations, and content managers are **not in git** — they live on the server and in REFERENCE folders only

---

## Scenario 1: Code Changes (Next.js Components, Pages, Config)

Commit and push first, then run deploy.sh. It handles git pull, build, static asset copy, diacritics auto-fix, PM2 restart, and smoke tests.

```bash
# 1. Commit and push
git add frontend/path/to/changed-files
git commit -m "Description"
git push

# 2. Deploy
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "bash /opt/lessoncraftstudio/deploy.sh"
```

---

## Scenario 2: Worksheet Generator Updates

Upload from REFERENCE APPS, copy to standalone, restart PM2.

```bash
# Upload
"C:\Program Files\PuTTY\pscp.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU "C:\Users\rkgen\lessoncraftstudio\REFERENCE APPS\[app].html" root@65.108.5.250:"/opt/lessoncraftstudio/frontend/public/worksheet-generators/[app].html"

# Copy to standalone + restart
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "cd /opt/lessoncraftstudio/frontend && cp 'public/worksheet-generators/[app].html' '.next/standalone/public/worksheet-generators/[app].html' && pm2 restart lessoncraftstudio"
```

---

## Scenario 3: Content Manager Updates

### Root-level content managers (e.g., homepage-content-manager.html)

```bash
# Upload
"C:\Program Files\PuTTY\pscp.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU "C:\Users\rkgen\lessoncraftstudio\REFERENCE CONTENT MANAGERS\[manager].html" root@65.108.5.250:"/opt/lessoncraftstudio/frontend/public/[manager].html"

# Copy to standalone + restart
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "cd /opt/lessoncraftstudio/frontend && cp 'public/[manager].html' '.next/standalone/public/[manager].html' && pm2 restart lessoncraftstudio"
```

### Worksheet-generators content managers (e.g., blog-content-manager.html)

```bash
# Upload
"C:\Program Files\PuTTY\pscp.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU "C:\Users\rkgen\lessoncraftstudio\REFERENCE CONTENT MANAGERS\[manager].html" root@65.108.5.250:"/opt/lessoncraftstudio/frontend/public/worksheet-generators/[manager].html"

# Copy to standalone + restart
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "cd /opt/lessoncraftstudio/frontend && cp 'public/worksheet-generators/[manager].html' '.next/standalone/public/worksheet-generators/[manager].html' && pm2 restart lessoncraftstudio"
```

### Admin content managers (e.g., product-sample-manager.html)

```bash
# Upload
"C:\Program Files\PuTTY\pscp.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU "C:\Users\rkgen\lessoncraftstudio\REFERENCE CONTENT MANAGERS\[manager].html" root@65.108.5.250:"/opt/lessoncraftstudio/frontend/public/admin/[manager].html"

# Copy to standalone + restart
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "cd /opt/lessoncraftstudio/frontend && cp 'public/admin/[manager].html' '.next/standalone/public/admin/[manager].html' && pm2 restart lessoncraftstudio"
```

---

## Scenario 4: Translation File Updates

### Single file

```bash
# Upload
"C:\Program Files\PuTTY\pscp.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU "C:\Users\rkgen\lessoncraftstudio\REFERENCE TRANSLATIONS\translations-[app].js" root@65.108.5.250:"/opt/lessoncraftstudio/frontend/public/worksheet-generators/js/translations-[app].js"

# Copy to standalone + restart
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "cd /opt/lessoncraftstudio/frontend && cp 'public/worksheet-generators/js/translations-[app].js' '.next/standalone/public/worksheet-generators/js/translations-[app].js' && pm2 restart lessoncraftstudio"
```

### Bulk (all translation files)

```bash
# Upload all
"C:\Program Files\PuTTY\pscp.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU -r "REFERENCE TRANSLATIONS\translations-*.js" root@65.108.5.250:"/opt/lessoncraftstudio/frontend/public/worksheet-generators/js/"

# Copy to standalone + restart
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "cd /opt/lessoncraftstudio/frontend && cp -r public/worksheet-generators/js/*.js .next/standalone/public/worksheet-generators/js/ && pm2 restart lessoncraftstudio"
```

---

## Scenario 5: Static Assets (Images, Fonts, Uploads)

For assets that ARE in git, deploy.sh handles them. For manual static asset updates:

```bash
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "cd /opt/lessoncraftstudio/frontend && cp -r .next/static .next/standalone/.next/static && cp -r public/uploads .next/standalone/public/uploads && cp -r public/fonts .next/standalone/public/fonts && pm2 restart lessoncraftstudio"
```

Never use `cp -r public` — it would overwrite worksheet generators and translations with missing/old versions from git.

---

## Recovery: If Worksheet Generators or Translations Are Missing

```bash
# Re-upload all worksheet generators from REFERENCE APPS
"C:\Program Files\PuTTY\pscp.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU -r "REFERENCE APPS\*.html" root@65.108.5.250:"/opt/lessoncraftstudio/frontend/public/worksheet-generators/"

# Re-upload all translations from REFERENCE TRANSLATIONS
"C:\Program Files\PuTTY\pscp.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU -r "REFERENCE TRANSLATIONS\translations-*.js" root@65.108.5.250:"/opt/lessoncraftstudio/frontend/public/worksheet-generators/js/"
```

---

## Modification Workflow

When modifying a worksheet generator, translation, or content manager:

1. Start from the REFERENCE folder (the source of truth)
2. Make your modifications
3. Upload to production (pscp)
4. Copy to standalone + PM2 restart (plink)
5. Ensure the REFERENCE folder has the modified version
6. Run `scripts\master-sync.bat` to update all local copies

---

## Protected Apps

Two apps contain custom algorithms that must not be accidentally overwritten:

- **picture path.html** — LPF (Longest Path First) maze algorithm. Verify `generatePerfectMaze` and `findLongestMazePath` functions exist before rewriting.
- **find objects.html** — Odd One Out algorithm. Verify `generateOddOneOutMode` and `generateAttributeVariation` functions exist before rewriting.

---

## Server Info

| Item | Value |
|------|-------|
| IP | 65.108.5.250 |
| User | root |
| Code path | /opt/lessoncraftstudio |
| Frontend path | /opt/lessoncraftstudio/frontend |
| Samples (isolated) | /var/www/lcs-media/samples |
| Image library (isolated) | /var/www/lcs-media/image-library |
| Process manager | PM2 (`pm2 restart lessoncraftstudio`) |
| Production port | 3000 |
| Framework | Next.js (standalone mode) |

See CLAUDE.md for full infrastructure details, protection systems, and backup procedures.
