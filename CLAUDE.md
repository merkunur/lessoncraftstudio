# Project Instructions for Claude Code

## CRITICAL: BULLETPROOF SAMPLE STORAGE

**Samples are stored in ISOLATED STORAGE at `/var/www/lcs-media/samples/`**

This is **COMPLETELY SEPARATE** from the code repository at `/opt/lessoncraftstudio/`. The deployment script **CANNOT** touch sample files because they're in a different directory entirely.

### Why This Architecture?

Previous setups had samples at `/opt/lessoncraftstudio/samples/` which led to accidental deletion during deployments. The new architecture makes data loss physically impossible - deploy.sh runs in `/opt/lessoncraftstudio/` and cannot affect `/var/www/lcs-media/`.

---

## 7-LAYER PROTECTION SYSTEM

| Layer | Protection | How It Works |
|-------|------------|--------------|
| 1 | **Physical Isolation** | Samples in `/var/www/lcs-media/` - completely separate from code |
| 2 | **Dedicated User** | `lcs-media` user owns files - deploy runs as different user |
| 3 | **Immutable Flags** | `chattr +i` on files - even root can't delete without explicit unlock |
| 4 | **Pre-deploy Backup** | Automatic tar.gz before EVERY deployment |
| 5 | **Deployment Guards** | deploy.sh verifies count didn't drop |
| 6 | **Scheduled Backups** | Hourly/daily/weekly/monthly with rotation |
| 7 | **Health Monitoring** | 15-minute checks with alerting |

---

## SAMPLE PROTECTION - GIT ISOLATION (ABSOLUTE RULE)

**The samples folder must NEVER touch git:**

| Rule | Why |
|------|-----|
| Local `samples/` is in `.gitignore` | Already configured - verified |
| NEVER run `git add samples/` | Would add 16GB to repository |
| NEVER run `git add .` in project root | Could accidentally include samples |
| NEVER commit sample files to the repository | Would freeze/crash the repository |

**Upload path:** Content Manager UI → API → `/var/www/lcs-media/samples/` (NEVER through git)

**Pre-commit hook protection:** The `.git/hooks/pre-commit` hook will BLOCK any attempt to commit sample files.

### If you need to commit changes:
```bash
# CORRECT: Add specific files
git add frontend/app/api/product-samples/list/route.ts
git add frontend/components/product-page/SampleGallery.tsx
git commit -m "Update sample API"

# WRONG: Never do this
git add .  # DANGEROUS - could include samples if .gitignore fails
git add samples/  # BLOCKED by pre-commit hook
```

---

## Deployment - CRITICAL

### Before ANY Deployment
1. **COMMIT** all changes: `git add . && git commit -m "message"`
2. **PUSH** to remote: `git push`
3. **THEN** deploy (git pull on server only gets pushed commits)

### Scenario 1: Next.js Code Changes (Product Pages, Components, Config)
```bash
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "bash /opt/lessoncraftstudio/deploy.sh"
```
**Note:** The deploy.sh script handles everything. Samples are in isolated storage at `/var/www/lcs-media/samples/` and CANNOT be affected by deployment.

### Scenario 2: Worksheet Generator Updates (HTML files)
```bash
# 1. Upload to /tmp (files are immutable at destination)
"C:\Program Files\PuTTY\pscp.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU "C:\Users\rkgen\lessoncraftstudio\REFERENCE APPS\[app].html" root@65.108.5.250:/tmp/[app].html

# 2. Safe update (unlock -> copy -> re-lock)
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "bash /var/www/lcs-media/scripts/update-worksheet.sh /tmp/[app].html [app].html"

# 3. Copy to standalone and restart
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "cd /opt/lessoncraftstudio/frontend && cp 'public/worksheet-generators/[app].html' '.next/standalone/public/worksheet-generators/[app].html' && pm2 restart lessoncraftstudio"
```

### Scenario 3: Translation File Updates
```bash
# 1. Upload to /tmp
"C:\Program Files\PuTTY\pscp.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU "C:\Users\rkgen\lessoncraftstudio\REFERENCE TRANSLATIONS\translations-[app].js" root@65.108.5.250:/tmp/translations-[app].js

# 2. Safe update (unlock -> copy -> re-lock)
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "bash /var/www/lcs-media/scripts/update-worksheet.sh /tmp/translations-[app].js js/translations-[app].js"

# 3. Copy to standalone and restart
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "cd /opt/lessoncraftstudio/frontend && cp 'public/worksheet-generators/js/translations-[app].js' '.next/standalone/public/worksheet-generators/js/translations-[app].js' && pm2 restart lessoncraftstudio"
```

---

## IMAGE INFRASTRUCTURE - ISOLATED STORAGE ARCHITECTURE

### Overview
- **33 app detail pages** + **11 homepages** may display sample images
- Images stored in **isolated directory**: `/var/www/lcs-media/samples/`
- Images served **directly by nginx** (bypasses Next.js entirely)
- WebP thumbnails (_thumb.webp) and previews (_preview.webp) generated automatically
- Content uploaded via content manager is protected with **immutable flags**

### Server File Structure
```
/var/www/lcs-media/                    (ISOLATED from code - bulletproof)
├── samples/                           (sample images - 46 MB)
│   ├── english/                       (11 language folders)
│   ├── german/
│   ├── french/
│   ├── ... (8 more languages)
│   └── finnish/
├── image-library/                     (source PNG images - 2.6 GB)
│   ├── animals/                       (104 theme folders)
│   ├── food/
│   ├── vehicles/
│   └── ... (101 more themes)
├── worksheet-generators/              (33+ HTML apps + 42+ JS translations)
│   ├── addition.html                  (worksheet generator apps)
│   ├── subtraction.html
│   ├── ...
│   └── js/
│       ├── translations-addition-complete.js
│       ├── image-vocabulary.js
│       └── ...
├── admin-panels/                      (admin tool HTML files)
│   ├── product-sample-manager.html
│   ├── homepage-thumbnail-manager.html
│   └── ...
├── scripts/                           (backup/health scripts)
│   ├── pre-deploy-backup.sh
│   ├── scheduled-backup.sh
│   ├── health-check.sh
│   ├── emergency-restore.sh
│   ├── emergency-restore-worksheets.sh
│   ├── protect-image-library.sh
│   ├── setup-worksheet-isolation.sh
│   └── update-worksheet.sh
└── backups/                           (backup archives)
    ├── pre-deploy/
    ├── hourly/
    ├── daily/
    ├── weekly/
    └── monthly/

/opt/lessoncraftstudio/                (CODE ONLY - git repo)
├── frontend/
│   └── public/
│       ├── worksheet-generators → /var/www/lcs-media/worksheet-generators  (SYMLINK)
│       ├── admin → /var/www/lcs-media/admin-panels  (SYMLINK)
│       ├── homepage-content-manager.html  (immutable flag)
│       └── user-control.html              (immutable flag)
├── deploy.sh                          (CANNOT touch /var/www/lcs-media/)
├── image library -> /var/www/lcs-media/image-library  (SYMLINK)
└── ...
```

### How Images Are Served (Nginx-First)
nginx serves `/samples/` requests directly from isolated storage:
```nginx
location /samples/ {
    alias /var/www/lcs-media/samples/;
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

### NEVER DO LIST
1. NEVER delete `/var/www/lcs-media/samples/`
2. NEVER run `rm -rf` on any samples directory
3. NEVER move sample images to a different location
4. NEVER run `git add samples/` or `git add .` in project root
5. NEVER commit sample files to git (16GB would crash repository)

---

## IMAGE LIBRARY PROTECTION - ABSOLUTE RULES

**Source PNG images (2.6GB) are stored in ISOLATED STORAGE at `/var/www/lcs-media/image-library/`**

A symlink at `/opt/lessoncraftstudio/image library` points to the isolated storage, so import scripts still work.

### 7-Layer Protection (Same as Samples)

| Layer | Protection | How It Works |
|-------|------------|--------------|
| 1 | **Physical Isolation** | Images in `/var/www/lcs-media/image-library/` - separate from code |
| 2 | **Symlink Bridge** | `/opt/lessoncraftstudio/image library` → isolated storage |
| 3 | **Dedicated User** | `lcs-media` user owns files - deploy runs as different user |
| 4 | **Immutable Flags** | `chattr +i` on files - even root can't delete without unlock |
| 5 | **Deploy Guards** | deploy.sh aborts if count drops below 3000 |
| 6 | **Git Isolation** | `image library/` is in `.gitignore` |
| 7 | **CLAUDE.md Rules** | Explicit NEVER commands below |

### NEVER DO LIST - IMAGE LIBRARY

**Claude must NEVER run these commands:**

```bash
# NEVER DELETE
rm -rf /var/www/lcs-media/image-library
rm -rf "/opt/lessoncraftstudio/image library"
rm -rf /var/www/lcs-media/image-library/*

# NEVER REMOVE IMMUTABLE FLAGS
chattr -i /var/www/lcs-media/image-library/*
chattr -R -i /var/www/lcs-media/image-library

# NEVER BULK DELETE
find /var/www/lcs-media/image-library -delete
find "/opt/lessoncraftstudio/image library" -delete

# NEVER MOVE
mv /var/www/lcs-media/image-library /some/other/path

# NEVER TRUNCATE DATABASE WITHOUT EXPLICIT REQUEST
DELETE FROM image_library_items;
TRUNCATE image_library_items;
```

### Safe Operations

These operations ARE safe:
```bash
# READ operations - safe
ls /var/www/lcs-media/image-library/
find /var/www/lcs-media/image-library -name "*.png" | wc -l
lsattr /var/www/lcs-media/image-library/animals/*.png

# COPY operations - safe (copies, doesn't move)
cp /var/www/lcs-media/image-library/animals/cat.png /tmp/

# VERIFY operations - safe
/opt/lessoncraftstudio/server-scripts/protect-image-library.sh
```

### Verification Commands

```bash
# Check file count (should be 3000+)
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "find /var/www/lcs-media/image-library -type f -name '*.png' | wc -l"

# Check symlink
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "ls -la '/opt/lessoncraftstudio/image library'"

# Check immutable flags
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "lsattr /var/www/lcs-media/image-library/animals/*.png 2>/dev/null | head -3"
```

### Initial Setup (One-Time)

If migrating image library to isolated storage for the first time:
```bash
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "bash /opt/lessoncraftstudio/server-scripts/protect-image-library.sh"
```

---

## WORKSHEET & CONTENT MANAGER PROTECTION - ISOLATED STORAGE (ABSOLUTE RULE)

**Worksheet generators, translations, and admin panels are stored in ISOLATED STORAGE at `/var/www/lcs-media/`**

Symlinks at `frontend/public/worksheet-generators` and `frontend/public/admin` point to isolated storage. Next.js and deploy.sh follow symlinks transparently. No nginx changes needed.

### 7-Layer Protection

| Layer | Protection | How It Works |
|-------|------------|--------------|
| 1 | **Physical Isolation** | Files at `/var/www/lcs-media/worksheet-generators/` and `/var/www/lcs-media/admin-panels/` |
| 2 | **Dedicated User** | `lcs-media` owns files - deploy runs as different user |
| 3 | **Immutable Flags** | `chattr +i` on all files - prevents deletion even by root |
| 4 | **Pre-deploy Backup** | `worksheets_*.tar.gz` before EVERY deployment |
| 5 | **Deployment Guards** | `deploy.sh` aborts if HTML < 30 or JS < 30 |
| 6 | **Scheduled Backups** | Hourly/daily/weekly/monthly rotation |
| 7 | **Health Monitoring** | 15-minute count checks with alerting |

### NEVER DO LIST - WORKSHEETS & CONTENT MANAGERS

**Claude must NEVER run these commands:**

```bash
# NEVER DELETE
rm -rf /var/www/lcs-media/worksheet-generators
rm -rf /var/www/lcs-media/admin-panels
rm -rf /var/www/lcs-media/worksheet-generators/*
rm -rf /var/www/lcs-media/admin-panels/*

# NEVER REMOVE IMMUTABLE FLAGS without explicit user request
chattr -i /var/www/lcs-media/worksheet-generators/*
chattr -R -i /var/www/lcs-media/worksheet-generators
chattr -i /var/www/lcs-media/admin-panels/*

# NEVER BULK DELETE
find /var/www/lcs-media/worksheet-generators -delete
find /var/www/lcs-media/admin-panels -delete

# NEVER MOVE
mv /var/www/lcs-media/worksheet-generators /some/other/path
mv /var/www/lcs-media/admin-panels /some/other/path

# NEVER REMOVE SYMLINKS
rm /opt/lessoncraftstudio/frontend/public/worksheet-generators
rm /opt/lessoncraftstudio/frontend/public/admin
```

### Safe Operations

```bash
# READ operations - safe
ls /var/www/lcs-media/worksheet-generators/
find /var/www/lcs-media/worksheet-generators -name "*.html" | wc -l
lsattr /var/www/lcs-media/worksheet-generators/addition.html

# SAFE UPDATE (use update-worksheet.sh helper)
bash /var/www/lcs-media/scripts/update-worksheet.sh /tmp/addition.html addition.html
bash /var/www/lcs-media/scripts/update-worksheet.sh /tmp/translations-addition.js js/translations-addition.js
bash /var/www/lcs-media/scripts/update-worksheet.sh --admin /tmp/manager.html manager.html
bash /var/www/lcs-media/scripts/update-worksheet.sh --public /tmp/homepage-content-manager.html homepage-content-manager.html
```

### Updated Deployment Scenarios (Post-Isolation)

#### Worksheet App Update
```bash
# 1. Upload to /tmp
"C:\Program Files\PuTTY\pscp.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU "C:\Users\rkgen\lessoncraftstudio\REFERENCE APPS\[app].html" root@65.108.5.250:/tmp/[app].html

# 2. Safe update (unlock -> copy -> re-lock)
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "bash /var/www/lcs-media/scripts/update-worksheet.sh /tmp/[app].html [app].html"

# 3. Copy to standalone + restart
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "cd /opt/lessoncraftstudio/frontend && cp 'public/worksheet-generators/[app].html' '.next/standalone/public/worksheet-generators/[app].html' && pm2 restart lessoncraftstudio"
```

#### Translation Update
```bash
"C:\Program Files\PuTTY\pscp.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU "C:\Users\rkgen\lessoncraftstudio\REFERENCE TRANSLATIONS\translations-[app].js" root@65.108.5.250:/tmp/translations-[app].js

"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "bash /var/www/lcs-media/scripts/update-worksheet.sh /tmp/translations-[app].js js/translations-[app].js"

"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "cd /opt/lessoncraftstudio/frontend && cp 'public/worksheet-generators/js/translations-[app].js' '.next/standalone/public/worksheet-generators/js/translations-[app].js' && pm2 restart lessoncraftstudio"
```

#### Content Manager Update
```bash
# For admin/ managers:
"C:\Program Files\PuTTY\pscp.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU "C:\Users\rkgen\lessoncraftstudio\REFERENCE CONTENT MANAGERS\[manager].html" root@65.108.5.250:/tmp/[manager].html

"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "bash /var/www/lcs-media/scripts/update-worksheet.sh --admin /tmp/[manager].html [manager].html"

"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "cd /opt/lessoncraftstudio/frontend && cp 'public/admin/[manager].html' '.next/standalone/public/admin/[manager].html' && pm2 restart lessoncraftstudio"

# For public/ root managers (homepage-content-manager.html, user-control.html):
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "bash /var/www/lcs-media/scripts/update-worksheet.sh --public /tmp/[file].html [file].html"
```

### Verification Commands - Worksheets

```bash
# Check file counts (HTML should be 30+, JS should be 30+)
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "echo 'HTML:' && find /var/www/lcs-media/worksheet-generators -maxdepth 1 -name '*.html' -type f | wc -l && echo 'JS:' && find /var/www/lcs-media/worksheet-generators/js -name '*.js' -type f | wc -l"

# Check symlink
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "ls -la /opt/lessoncraftstudio/frontend/public/worksheet-generators"

# Check immutable flags
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "lsattr /var/www/lcs-media/worksheet-generators/addition.html 2>/dev/null"

# Emergency restore
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "bash /var/www/lcs-media/scripts/emergency-restore-worksheets.sh"
```

### Initial Setup (One-Time)

```bash
# Upload and run the migration script
"C:\Program Files\PuTTY\pscp.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU "C:\Users\rkgen\lessoncraftstudio\server-scripts\*.sh" root@65.108.5.250:/opt/lessoncraftstudio/server-scripts/

"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "bash /opt/lessoncraftstudio/server-scripts/setup-worksheet-isolation.sh"
```

---

## DIACRITICS PROTECTION - IMAGE TRANSLATIONS (ABSOLUTE RULE)

**The `image_library_items.translations` database was fixed on 2026-03-03.**
- 837 translation fields corrected across 417 rows in 11 locales
- Auto-healing runs during every deployment via deploy.sh
- Smoke test (Test 13) verifies diacritics after every deployment

### NEVER DO LIST - DIACRITICS
- **NEVER re-run import scripts** (`scripts/import-*-images.js`) without also running the fix scripts afterward — import scripts have BAD hardcoded translations with stripped diacritics
- **NEVER regenerate `image-vocabulary.js`** without verifying diacritics are correct in the raw JSON source
- **NEVER bulk-update `image_library_items.translations`** without checking diacritics

### Fix Scripts (Permanent, on Server)
| Script | Location | Purpose |
|--------|----------|---------|
| `audit-db-diacritics.js` | `/opt/lessoncraftstudio/server-scripts/` | Reports all mismatches |
| `fix-db-diacritics.js` | `/opt/lessoncraftstudio/server-scripts/` | Fixes base-key translations |
| `fix-db-diacritics-numbered.js` | `/opt/lessoncraftstudio/server-scripts/` | Fixes numbered variants |
| `image-vocabulary-raw.json` | `/opt/lessoncraftstudio/server-scripts/` | Reference source of truth |

### Manual Verification
```bash
# Check for stripped diacritics (should return 0)
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "PGPASSWORD='LcS2025SecureDBPass' psql -U lcs_user -d lessoncraftstudio_prod -t -c \"SELECT COUNT(*) FROM image_library_items WHERE translations->>'sv' IN ('Bjorn','Dorr','Fonster','Kylskap','Sang');\""

# Run full audit
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "cd /opt/lessoncraftstudio/frontend && node /opt/lessoncraftstudio/server-scripts/audit-db-diacritics.js"

# Manual fix (if needed)
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "cd /opt/lessoncraftstudio/frontend && node /opt/lessoncraftstudio/server-scripts/fix-db-diacritics.js && node /opt/lessoncraftstudio/server-scripts/fix-db-diacritics-numbered.js"
```

---

## STRIPE PROTECTION - ABSOLUTE RULES

**Stripe code was removed during the Feb 2027 pivot (Stage 1). It will be rebuilt for Stage 3. The backup and protection rules remain in effect.**

### Current Working Configuration

| Protection | Location |
|------------|----------|
| **Immutable Backup** | `/opt/lessoncraftstudio/stripe-backup/stripe-config.backup` (chattr +i) |
| **PM2 Ecosystem** | `/opt/lessoncraftstudio/frontend/ecosystem.config.js` |
| **Database Triggers** | Prevent TRUNCATE on users/subscriptions tables |

### Multi-Layer Protection System

| Layer | Protection | How It Works |
|-------|------------|--------------|
| 1 | **Immutable Backup** | `stripe-config.backup` with chattr +i flag |
| 2 | **PM2 Ecosystem Config** | Stripe vars loaded separately from .env files |
| 3 | **Database Triggers** | Prevent TRUNCATE on users and subscriptions tables |
| 4 | **Audit Triggers** | Log all stripe_customer_id changes |
| 5 | **CLAUDE.md Rules** | Explicit NEVER commands below |

### NEVER DO LIST - STRIPE

**Claude must NEVER run these commands without EXPLICIT user request:**

```bash
# NEVER modify Stripe environment variables
sed -i '.*STRIPE.*' /opt/lessoncraftstudio/frontend/.env*
echo "STRIPE_" >> .env*

# NEVER delete ecosystem config
rm /opt/lessoncraftstudio/frontend/ecosystem.config.js

# NEVER unlock immutable backup
chattr -i /opt/lessoncraftstudio/stripe-backup/stripe-config.backup
```

```sql
-- NEVER clear customer data in bulk
UPDATE users SET stripe_customer_id = NULL;
DELETE FROM users WHERE stripe_customer_id IS NOT NULL;
TRUNCATE users;

-- NEVER delete subscriptions in bulk
DELETE FROM subscriptions;
TRUNCATE subscriptions;

-- NEVER clear payment history
DELETE FROM payments;
TRUNCATE payments;
```

### Safe Operations

These operations ARE safe:
```bash
# READ Stripe config - safe
cat /opt/lessoncraftstudio/stripe-backup/stripe-config.backup
cat /opt/lessoncraftstudio/frontend/ecosystem.config.js

# Query subscription data - safe
SELECT * FROM subscriptions WHERE user_id = 'specific-user-id';
SELECT * FROM payments WHERE user_id = 'specific-user-id';

# Create checkout sessions - safe (handled by API)
# Process webhook events - safe (handled by API)
# Query subscription status - safe (handled by API)
```

### Recovery Procedure

If Stripe breaks, restore from immutable backup:
```bash
# View correct values (backup is read-only while immutable)
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "cat /opt/lessoncraftstudio/stripe-backup/stripe-config.backup"

# To restore (requires explicit user permission):
# 1. Unlock: chattr -i /opt/lessoncraftstudio/stripe-backup/stripe-config.backup
# 2. Copy values to .env.production
# 3. Re-lock: chattr +i /opt/lessoncraftstudio/stripe-backup/stripe-config.backup
# 4. Restart PM2: pm2 restart ecosystem.config.js
```

### Verification Commands

```bash
# Check backup exists and is immutable
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "lsattr /opt/lessoncraftstudio/stripe-backup/stripe-config.backup"

# Check ecosystem config exists
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "ls -la /opt/lessoncraftstudio/frontend/ecosystem.config.js"

# Check database triggers exist
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "PGPASSWORD='LcS2025SecureDBPass' psql -U lcs_user -d lessoncraftstudio_prod -c \"SELECT tgname FROM pg_trigger WHERE tgname LIKE '%stripe%' OR tgname LIKE '%truncate%';\""
```

---

## BACKUP PROCEDURES

### Automated Backups (Cron)
Backups run automatically via `/etc/cron.d/lcs-media-backups`:
- **Hourly:** 4x daily during business hours → `/var/www/lcs-media/backups/hourly/`
- **Daily:** 2 AM → `/var/www/lcs-media/backups/daily/`
- **Weekly:** Sundays 3 AM → `/var/www/lcs-media/backups/weekly/`
- **Monthly:** 1st of month 4 AM → `/var/www/lcs-media/backups/monthly/`

### Manual Backup Commands
```bash
# Create immediate backup
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "/var/www/lcs-media/scripts/scheduled-backup.sh daily"

# List existing backups
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "find /var/www/lcs-media/backups -name '*.tar.gz' -ls"

# Emergency restore (interactive)
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "/var/www/lcs-media/scripts/emergency-restore.sh"
```

---

## IMAGE RECOVERY PROCEDURES

If images are not loading:

### Step 1: Check nginx is serving samples
```bash
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "curl -sI 'https://www.lessoncraftstudio.com/samples/english/addition/sample-1.jpeg' | head -5"
```
**Expected:** HTTP 200, Server: nginx

### Step 2: Check samples health API
```bash
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "curl -s 'http://localhost:3000/api/health/samples'"
```
**Expected:** `{"status":"healthy",...}`

### Step 3: Check file counts
```bash
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "/var/www/lcs-media/scripts/health-check.sh"
```

### Step 4: If samples are missing, restore from backups
```bash
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "/var/www/lcs-media/scripts/emergency-restore.sh"
```

---

## IMAGE VERIFICATION COMMANDS

```bash
# Check file counts in isolated storage
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "echo 'JPEG:' && find /var/www/lcs-media/samples -name '*.jpeg' | wc -l && echo 'WebP:' && find /var/www/lcs-media/samples -name '*.webp' | wc -l"

# Check immutable flags on files
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "lsattr /var/www/lcs-media/samples/english/addition/*.jpeg 2>/dev/null | head -5"

# Test HTTP access
curl -I "https://www.lessoncraftstudio.com/samples/english/addition/sample-1.jpeg"
```
**Note:** Count varies based on content uploaded via content manager. Zero is valid.

---

## Server Info
- **IP**: 65.108.5.250
- **User**: root
- **Code Path**: /opt/lessoncraftstudio
- **Samples Path**: /var/www/lcs-media/samples (ISOLATED)
- **Image Library Path**: /var/www/lcs-media/image-library (ISOLATED)
- **Worksheet Generators Path**: /var/www/lcs-media/worksheet-generators (ISOLATED)
- **Admin Panels Path**: /var/www/lcs-media/admin-panels (ISOLATED)

## Critical Rules
- **ALWAYS** include `-hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU` in plink/pscp commands
- **ALWAYS** commit and push BEFORE deploying (git pull gets nothing otherwise)
- **ALWAYS** use REFERENCE folders for worksheet generators and translations
- **ALWAYS** use `update-worksheet.sh` to update protected files on server (never direct `cp`)
- **NEVER** store sample images directly in `frontend/public/` (gets wiped on build)
- **NEVER** delete or modify `/var/www/lcs-media/samples/`
- **NEVER** delete or modify `/var/www/lcs-media/image-library/`
- **NEVER** delete or modify `/var/www/lcs-media/worksheet-generators/`
- **NEVER** delete or modify `/var/www/lcs-media/admin-panels/`
- **NEVER** remove symlinks at `frontend/public/worksheet-generators` or `frontend/public/admin`
- **NEVER** run `rm -rf` on any image, sample, or worksheet directories
- **NEVER** run `chattr -i` on protected files without explicit user request
- **NEVER** run `git add .` in project root (could include samples/images)
- **NEVER** modify Stripe environment variables without explicit user request
- **NEVER** run TRUNCATE or bulk DELETE on users or subscriptions tables
- **NEVER** delete or modify `/opt/lessoncraftstudio/stripe-backup/`

## Current Architecture (Post-Pivot Feb 2027)

**Business:** Professional Printable Business Toolkit for entrepreneurs, Etsy sellers, Amazon KDP publishers.

**Three-stage plan:**
1. **Stage 1 (CURRENT):** Launch individual apps on WarriorPlus with 50% affiliate commissions
2. **Stage 2:** Bundle apps into 6 category packages on WarriorPlus
3. **Stage 3:** Rebuild subscription model, website becomes self-sufficient

### What's Live
- **33 worksheet generator apps** (all free with watermark, no signup required)
- **11 locales:** en, de, fr, es, pt, it, nl, sv, da, no, fi
- **App detail pages:** `frontend/app/[locale]/apps/[slug]/page.tsx` (localized slugs)
- **Apps listing:** `frontend/app/[locale]/apps/page.tsx` (6 categories)
- **Homepage:** Entrepreneur-focused messaging
- **Auth system:** Intact (login, signup, email verification)
- **Admin system:** Intact (dormant, accessible at `/dashboard/admin`)
- **Member portal:** WarriorPlus license key activation at `/member`
- **Legal pages:** Terms, privacy, license
- **WarriorPlus integration:** `frontend/config/warriorplus-products.ts` (source of truth for 33 apps, 6 categories)

### What's Removed (Returns 410 Gone)
- Blog (`/[locale]/blog/*`)
- Theme/worksheet pages (`/[locale]/worksheets/*`)
- Pricing page (`/[locale]/pricing`)
- Category pages (`/[locale]/apps/category/*`)
- Grade pages (`/[locale]/apps/grades/*`)
- Buy pages (`/buy/*`)
- Stripe API routes (removed from code, backup preserved)
- 550 theme content files, 363 product content files
- Blog components, theme-page components, pricing components

### Key Files
| File | Purpose |
|------|---------|
| `frontend/middleware.ts` | 410 Gone routing for removed URLs + locale handling |
| `frontend/config/warriorplus-products.ts` | Source of truth: 33 apps, 6 categories |
| `frontend/config/product-page-slugs.ts` | Localized app detail page slugs (11 locales) |
| `frontend/app/[locale]/apps/[slug]/page.tsx` | App detail pages |
| `frontend/app/sitemap.ts` | Sitemap: static pages + app detail pages only |
| `frontend/lib/schema-generator.ts` | JSON-LD schemas (cleaned, 543 lines) |

---

## Reference Folders (Source of Truth)
- `REFERENCE APPS/` - 33 worksheet generator HTML files
- `REFERENCE TRANSLATIONS/` - Translation JS files
- `REFERENCE CONTENT MANAGERS/` - Content manager HTML files

## After Modifying Worksheet Generators
Run master-sync to update all local copies:
```bash
scripts\master-sync.bat
```

---

## INITIAL SETUP (One-Time)

If setting up the isolated storage for the first time:

```bash
# Upload and run the setup script
"C:\Program Files\PuTTY\pscp.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU "C:\Users\rkgen\lessoncraftstudio\server-scripts\*.sh" root@65.108.5.250:/opt/lessoncraftstudio/server-scripts/

"C:\Program Files\PuTTY\pscp.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU "C:\Users\rkgen\lessoncraftstudio\server-scripts\lcs-media-backups.cron" root@65.108.5.250:/opt/lessoncraftstudio/server-scripts/

"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "bash /opt/lessoncraftstudio/server-scripts/setup-isolated-storage.sh"
```

Then update nginx config to serve `/samples/` from `/var/www/lcs-media/samples/`.

---

## Health Check Endpoints
```bash
# Sample images health
curl http://localhost:3000/api/health/samples

# Database health
curl http://localhost:3000/api/health/database
```

## Full Documentation
See `DEPLOYMENT.md` for complete details on all scenarios and security considerations.
