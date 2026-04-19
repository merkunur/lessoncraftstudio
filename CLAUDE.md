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

## DESIGN ELEMENTS PROTECTION - ISOLATED STORAGE (ABSOLUTE RULE)

**Decorative SVG elements (81 SVGs + 12 color palettes) are stored in ISOLATED STORAGE at `/var/www/lcs-media/design-elements/`**

These elements back the "Design Elements" accordion in the coloring worksheet generator and will back the same feature in other worksheet apps. Categories: patterns, textures, frames, corners, banners, dividers, badges, title-banners, accents, scatter-packs, footers. Color palettes stored as JSON.

### Source of truth & entry points
- **Content manager URL:** `https://www.lessoncraftstudio.com/admin/design-elements-manager.html`
- **Manager HTML source:** `REFERENCE CONTENT MANAGERS/design-elements-manager.html`
- **DB table:** `design_elements` (Prisma model: `DesignElement` in `frontend/prisma/schema.prisma`)
- **API routes:** `frontend/app/api/design-elements/` (list, upload, [slug], reorder, palettes, manifest/regenerate)
- **Health endpoint:** `/api/health/design-elements`
- **Integration guide (READ BEFORE porting to another app):** `docs/reference/design-elements-integration.md` — lists all 22 bugs discovered during the coloring.html integration that must not be repeated.

### Server File Structure
```
/var/www/lcs-media/design-elements/          (ISOLATED from code - bulletproof)
├── manifest.json                             (rebuilt from DB via API)
├── palettes.json                             (12 color palettes, edited via manager)
├── patterns/     (12 SVGs)
├── textures/     (8 SVGs)
├── frames/       (15 SVGs)
├── corners/      (6 SVGs)
├── banners/      (5 SVGs)
├── dividers/     (8 SVGs)
├── badges/       (2 SVGs)
├── title-banners/ (4 SVGs)
├── accents/      (13 SVGs)
├── scatter-packs/ (4 SVGs)
└── footers/      (5 SVGs)
```

### 7-Layer Protection

| Layer | Protection | How It Works |
|-------|------------|--------------|
| 1 | **Physical Isolation** | Files at `/var/www/lcs-media/design-elements/` - separate from code |
| 2 | **Dedicated User** | `lcs-media` owns files - deploy runs as different user |
| 3 | **Immutable Flags** | `chattr +i` on all SVGs + manifest.json + palettes.json |
| 4 | **Pre-deploy Backup** | `design-elements_*.tar.gz` before EVERY deployment |
| 5 | **Deployment Guards** | `deploy.sh` aborts if SVG count < 70 |
| 6 | **Scheduled Backups** | Hourly/daily/weekly/monthly via `scheduled-backup.sh` |
| 7 | **Health Monitoring** | 15-minute count check via `health-check.sh` |

### NEVER DO LIST - DESIGN ELEMENTS

**Claude must NEVER run these commands:**

```bash
# NEVER DELETE
rm -rf /var/www/lcs-media/design-elements
rm -rf /var/www/lcs-media/design-elements/*

# NEVER REMOVE IMMUTABLE FLAGS without explicit user request
chattr -i /var/www/lcs-media/design-elements/*
chattr -R -i /var/www/lcs-media/design-elements

# NEVER BULK DELETE
find /var/www/lcs-media/design-elements -delete

# NEVER MOVE
mv /var/www/lcs-media/design-elements /some/other/path
```

```sql
-- NEVER truncate or drop the DB table
DELETE FROM design_elements;
TRUNCATE design_elements;
DROP TABLE design_elements;
```

### Safe Operations

```bash
# READ operations - safe
ls /var/www/lcs-media/design-elements/
find /var/www/lcs-media/design-elements -name "*.svg" | wc -l
lsattr /var/www/lcs-media/design-elements/patterns/dotgrid.svg

# SAFE UPDATE (use update-design-element.sh)
bash /var/www/lcs-media/scripts/update-design-element.sh /tmp/scalloped.svg frames/scalloped.svg
bash /var/www/lcs-media/scripts/update-design-element.sh /tmp/manifest.json manifest.json
bash /var/www/lcs-media/scripts/update-design-element.sh /tmp/palettes.json palettes.json

# SAFE DELETE (requires --confirm)
bash /var/www/lcs-media/scripts/delete-design-element.sh --confirm frames/obsolete.svg
```

### Content Manager Deployment

Update the manager HTML via the admin-panel workflow:
```bash
"C:\Program Files\PuTTY\pscp.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU "C:\Users\rkgen\lessoncraftstudio\REFERENCE CONTENT MANAGERS\design-elements-manager.html" root@65.108.5.250:/tmp/design-elements-manager.html

"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "bash /var/www/lcs-media/scripts/update-worksheet.sh --admin /tmp/design-elements-manager.html design-elements-manager.html"

"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "cd /opt/lessoncraftstudio/frontend && cp 'public/admin/design-elements-manager.html' '.next/standalone/public/admin/design-elements-manager.html' && pm2 restart lessoncraftstudio"
```

### Verification Commands

```bash
# SVG count (should be >= 81)
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "find /var/www/lcs-media/design-elements -name '*.svg' | wc -l"

# Immutable flags (should show 'i')
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "lsattr /var/www/lcs-media/design-elements/patterns/*.svg 2>/dev/null | head -3"

# DB count (should match file count)
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "PGPASSWORD='LcS2025SecureDBPass' psql -U lcs_user -d lessoncraftstudio_prod -t -c \"SELECT COUNT(*) FROM design_elements WHERE is_active;\""

# Health endpoint
curl https://www.lessoncraftstudio.com/api/health/design-elements
```

### Initial Setup (One-Time)

If migrating design elements to isolated storage for the first time:
```bash
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "bash /opt/lessoncraftstudio/server-scripts/setup-design-elements-protection.sh"
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

## LEMON SQUEEZY PAYMENT SYSTEM - ABSOLUTE RULES

**Lemon Squeezy is the payment processor. There is NO license key system. App ownership is purchase-based: a row in the `purchases` table with `user_id` + `apps_access[]` array = the user owns those apps.**

### The actual payment flow

1. User clicks Buy → redirected to Lemon Squeezy hosted checkout (`lessoncraftstudio-com.lemonsqueezy.com/checkout/buy/{uuid}`)
2. User completes payment on LS
3. LS sends webhook → `/api/webhooks/lemonsqueezy` (handler: `frontend/app/api/webhooks/lemonsqueezy/route.ts`)
4. Webhook verifies HMAC-SHA256 signature via `LEMONSQUEEZY_WEBHOOK_SECRET`
5. Idempotency check via `ls_webhook_events` table (unique `event_id`)
6. For `order_created`: finds user by email OR auto-creates user + creates `Purchase` row with `apps_access[]` + sends password-reset email to new users
7. For `order_refunded`: sets `Purchase.status='refunded'`, user loses access on next watermark check
8. User logs in normally (email + password). Member dashboard at `/member/dashboard` queries `purchases` table by `userId`.

### Required environment variables

| Variable | Purpose |
|---|---|
| `LEMONSQUEEZY_WEBHOOK_SECRET` | HMAC-SHA256 signing — if missing ALL webhooks rejected |
| `LEMONSQUEEZY_API_KEY` | Lemon Squeezy API access |
| `LEMONSQUEEZY_STORE_ID` | Numeric store ID |
| `LEMONSQUEEZY_STORE_SLUG` | Subdomain (e.g., `lessoncraftstudio-com`) |
| `SMTP_*` or `EMAIL_PROVIDER` credentials | For password-reset emails to new accounts |

### Product config

- Source of truth: `frontend/config/lemonsqueezy-products.ts`
- 33 individual apps @ $49 + 6 category bundles @ $149 = 39 products
- Each entry maps app-slug → LS product_id → hosted checkout URL
- Helper: `getAppsForLSProduct(lsProductId)` returns array of app slugs

### NEVER DO LIST - LEMON SQUEEZY

**Claude must NEVER run these commands without EXPLICIT user request:**

```bash
# NEVER modify Lemon Squeezy environment variables
sed -i '.*LEMONSQUEEZY.*' /opt/lessoncraftstudio/frontend/.env*
echo "LEMONSQUEEZY_" >> .env*

# NEVER delete the webhook handler
rm /opt/lessoncraftstudio/frontend/app/api/webhooks/lemonsqueezy/route.ts

# NEVER delete the product config
rm /opt/lessoncraftstudio/frontend/config/lemonsqueezy-products.ts
```

```sql
-- NEVER clear purchase data in bulk
DELETE FROM purchases;
TRUNCATE purchases;

-- NEVER clear webhook audit log (breaks idempotency)
DELETE FROM ls_webhook_events;
TRUNCATE ls_webhook_events;

-- NEVER drop user accounts tied to purchases
DELETE FROM users WHERE id IN (SELECT user_id FROM purchases);
TRUNCATE users;
```

### Safe Operations

```bash
# Read (never edit) the webhook handler
cat /opt/lessoncraftstudio/frontend/app/api/webhooks/lemonsqueezy/route.ts

# Query purchase data - safe
# SELECT * FROM purchases WHERE user_id = '...';
# SELECT * FROM ls_webhook_events WHERE status = 'failed' ORDER BY processed_at DESC;
# SELECT * FROM users WHERE email = '...';

# Test webhook endpoint liveness (returns 401 without valid signature - that's correct)
curl -X POST https://www.lessoncraftstudio.com/api/webhooks/lemonsqueezy -d '{}'
```

### Recovery Procedure

If the payment system breaks:
1. Check env vars: `cat /opt/lessoncraftstudio/frontend/.env.production | grep LEMONSQUEEZY`
2. Check webhook handler exists: `ls -la /opt/lessoncraftstudio/frontend/app/api/webhooks/lemonsqueezy/route.ts`
3. Check product config intact: `head -5 /opt/lessoncraftstudio/frontend/config/lemonsqueezy-products.ts`
4. Check recent webhook failures: `PGPASSWORD='LcS2025SecureDBPass' psql -U lcs_user -d lessoncraftstudio_prod -c "SELECT event_id, event_type, error_message, processed_at FROM ls_webhook_events WHERE status = 'failed' ORDER BY processed_at DESC LIMIT 10;"`
5. Check Lemon Squeezy dashboard for webhook delivery failures (webhooks tab shows retry attempts + response codes)

### Verification Commands

```bash
# Webhook endpoint responds correctly (401 = signature check is running, which is what we want)
curl -s -o /dev/null -w "%{http_code}\n" -X POST https://www.lessoncraftstudio.com/api/webhooks/lemonsqueezy
# Expected: 401

# Count purchases
PGPASSWORD='LcS2025SecureDBPass' psql -U lcs_user -d lessoncraftstudio_prod -c "SELECT COUNT(*) FROM purchases WHERE status='active';"

# Check for any webhook failures
PGPASSWORD='LcS2025SecureDBPass' psql -U lcs_user -d lessoncraftstudio_prod -c "SELECT status, COUNT(*) FROM ls_webhook_events GROUP BY status;"

# Verify all purchases linked to users
PGPASSWORD='LcS2025SecureDBPass' psql -U lcs_user -d lessoncraftstudio_prod -c "SELECT COUNT(*) FROM purchases WHERE user_id IS NULL;"
# Expected: 0
```

### Legacy Stripe backup (reference only — NOT the active system)

An immutable Stripe backup at `/opt/lessoncraftstudio/stripe-backup/stripe-config.backup` is preserved for historical reference. **Do not use it — Stripe is NOT the active payment processor.** Do not delete it either (immutable flag).

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
- **NEVER** delete or modify `/var/www/lcs-media/design-elements/`
- **NEVER** run TRUNCATE, DROP, or bulk DELETE on the `design_elements` DB table
- **NEVER** remove symlinks at `frontend/public/worksheet-generators` or `frontend/public/admin`
- **NEVER** run `rm -rf` on any image, sample, or worksheet directories
- **NEVER** run `chattr -i` on protected files without explicit user request
- **NEVER** run `git add .` in project root (could include samples/images)
- **NEVER** modify `LEMONSQUEEZY_*` environment variables without explicit user request
- **NEVER** run TRUNCATE or bulk DELETE on `users`, `purchases`, or `ls_webhook_events` tables
- **NEVER** delete the webhook handler at `/opt/lessoncraftstudio/frontend/app/api/webhooks/lemonsqueezy/route.ts`
- **NEVER** delete the product config at `/opt/lessoncraftstudio/frontend/config/lemonsqueezy-products.ts`
- **NEVER** delete or modify `/opt/lessoncraftstudio/stripe-backup/` (legacy — preserved for reference, NOT the active system)

## Current Architecture

**Business:** Professional Printable Business Toolkit for entrepreneurs, Etsy sellers, Amazon KDP publishers.

**Payment model:** Direct sales via **Lemon Squeezy**.
- **33 individual apps** at **$49** each (one-time, full access, commercial license)
- **6 category bundles** at **$149** each (Math, Literacy, Visual, Matching, Puzzle, Search)
- All purchases are one-time, no tiers, no subscriptions, no upsell funnels
- Access to an app = a row in the `purchases` table with `status='active'` linking `user_id` to `apps_access[]`

### What's Live
- **33 worksheet generator apps** (all free to try with watermark, no signup required; paid access removes watermark)
- **11 locales:** en, de, fr, es, pt, it, nl, sv, da, no, fi
- **App detail pages:** `frontend/app/[locale]/apps/[slug]/page.tsx` (localized slugs)
- **Apps listing:** `frontend/app/[locale]/apps/page.tsx` (6 categories)
- **Homepage:** Entrepreneur-focused messaging
- **Auth system:** Email + password, signup at `/auth/signup` or `/[locale]/auth/signup`, signin at `/auth/signin` or `/[locale]/auth/signin`
- **Admin system:** Accessible at `/dashboard/admin`
- **Member portal:** `/member` + `/member/dashboard` — shows user's active purchases (from `purchases` table). New users are auto-created on first Lemon Squeezy purchase and receive a password-reset email to set up login.
- **Legal pages:** Terms, privacy, license
- **Lemon Squeezy integration:** `frontend/config/lemonsqueezy-products.ts` (source of truth for 33 apps + 6 bundles)
- **Webhook handler:** `frontend/app/api/webhooks/lemonsqueezy/route.ts`

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
| `frontend/config/lemonsqueezy-products.ts` | Source of truth: 33 apps + 6 bundles, LS product IDs, checkout URLs |
| `frontend/app/api/webhooks/lemonsqueezy/route.ts` | Lemon Squeezy webhook handler (order_created, order_refunded) |
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
