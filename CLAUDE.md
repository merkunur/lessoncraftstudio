# Project Instructions for Claude Code

## CRITICAL WARNING - READ FIRST

**DO NOT TOUCH THE IMAGE INFRASTRUCTURE!**

The sample images for this website have been broken multiple times by previous AI sessions. The current setup works perfectly. DO NOT:
- Delete, move, or modify `/opt/lessoncraftstudio/samples/`
- Run any commands that affect the samples directory
- Upload new sample images without following the exact procedures below
- Change the nginx configuration for /samples/
- Store images directly in `frontend/public/` (gets wiped on build)

If images stop working, see **IMAGE RECOVERY PROCEDURES** below.

---

## SAMPLE PROTECTION - GIT ISOLATION (ABSOLUTE RULE)

**The samples folder must NEVER touch git:**

| Rule | Why |
|------|-----|
| Local `samples/` is in `.gitignore` | Already configured - verified |
| NEVER run `git add samples/` | Would add 16GB to repository |
| NEVER run `git add .` in project root | Could accidentally include samples |
| NEVER commit sample files to the repository | Would freeze/crash the repository |

**Upload path:** Local folder → pscp → Server (NEVER through git)

**Pre-commit hook protection:** The `.git/hooks/pre-commit` hook will BLOCK any attempt to commit sample files and show an error message.

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
**Note:** The deploy.sh script handles everything. NO SYMLINKS NEEDED - nginx serves `/samples/` directly from `/opt/lessoncraftstudio/samples/`.

### Scenario 2: Worksheet Generator Updates (HTML files)
```bash
# Upload from REFERENCE APPS folder
"C:\Program Files\PuTTY\pscp.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU "C:\Users\rkgen\lessoncraftstudio\REFERENCE APPS\[app].html" root@65.108.5.250:"/opt/lessoncraftstudio/frontend/public/worksheet-generators/[app].html"

# Copy to standalone and restart
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "cd /opt/lessoncraftstudio/frontend && cp 'public/worksheet-generators/[app].html' '.next/standalone/public/worksheet-generators/[app].html' && pm2 restart lessoncraftstudio"
```

### Scenario 3: Translation File Updates
```bash
# Upload from REFERENCE TRANSLATIONS folder
"C:\Program Files\PuTTY\pscp.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU "C:\Users\rkgen\lessoncraftstudio\REFERENCE TRANSLATIONS\translations-[app].js" root@65.108.5.250:"/opt/lessoncraftstudio/frontend/public/worksheet-generators/js/translations-[app].js"

# Copy to standalone and restart
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "cd /opt/lessoncraftstudio/frontend && cp 'public/worksheet-generators/js/translations-[app].js' '.next/standalone/public/worksheet-generators/js/translations-[app].js' && pm2 restart lessoncraftstudio"
```

---

## IMAGE INFRASTRUCTURE - NGINX-FIRST ARCHITECTURE

### Overview
- **363 product pages** + **11 homepages** display sample images
- Images are served **directly by nginx** from `/opt/lessoncraftstudio/samples/`
- WebP thumbnails (_thumb.webp) and previews (_preview.webp) are required for product pages
- **NO SYMLINKS NEEDED** - nginx handles `/samples/` requests directly
- Content uploaded via content manager **survives all deployments**

### Server File Structure
```
/opt/lessoncraftstudio/samples/         (content uploaded via content manager)
├── danish/                             (34 app folders)
├── dutch/                              (34 app folders)
├── english/                            (34 app folders)
├── finnish/                            (34 app folders)
├── french/                             (34 app folders)
├── german/                             (34 app folders)
├── italian/                            (34 app folders)
├── norwegian/                          (34 app folders)
├── portuguese/                         (34 app folders)
├── spanish/                            (34 app folders)
├── swedish/                            (34 app folders)
├── generate-webp.sh                    (WebP generator script)
└── *-samples.tar.gz                    (Backup archives - DO NOT DELETE)
```

**File counts:**
- Samples are uploaded dynamically via `/admin/product-sample-manager.html`
- Zero samples is a valid starting state
- Count grows as content is uploaded through the content manager

### How Images Are Served (Nginx-First)
nginx serves `/samples/` requests directly from the filesystem:
```nginx
location /samples/ {
    alias /opt/lessoncraftstudio/samples/;
    # ... caching headers
}
```
**NO SYMLINKS NEEDED** - nginx bypasses Next.js entirely for sample images.

### NEVER DO LIST
1. NEVER delete `/opt/lessoncraftstudio/samples/`
2. NEVER run `rm -rf` on any samples directory
3. NEVER move sample images to a different location
4. NEVER delete the tar.gz backup archives in `/opt/lessoncraftstudio/backups/`
5. NEVER run `git add samples/` or `git add .` in project root
6. NEVER commit sample files to git (16GB would crash repository)
7. NEVER modify nginx samples configuration without explicit approval

### Backup Procedures
```bash
# Create backup before major changes
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "bash /opt/lessoncraftstudio/backup-samples.sh"

# List existing backups
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "ls -lh /opt/lessoncraftstudio/backups/samples_*.tar.gz"

# Restore from backup (if needed)
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "tar -xzf /opt/lessoncraftstudio/backups/samples_TIMESTAMP.tar.gz -C /opt/lessoncraftstudio/"
```

### After Deployment
Just run: `bash /opt/lessoncraftstudio/deploy.sh`
No symlinks needed. No manual steps required.

---

## IMAGE RECOVERY PROCEDURES

If images are not loading:

### Step 1: Check nginx is serving samples
```bash
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "curl -sI 'https://www.lessoncraftstudio.com/samples/english/addition/Addition%20Worksheet%201.jpeg' | head -5"
```
**Expected:** HTTP 200, Server: nginx

### Step 2: Check samples health API
```bash
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "curl -s 'http://localhost:3000/api/health/samples'"
```
**Expected:** `{"status":"healthy",...}`

### Step 3: If samples directory is empty, restore from backups
```bash
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "cd /opt/lessoncraftstudio/samples && for f in /tmp/*-samples.tar.gz; do tar -xzf \$f; done"
```

### Step 4: Regenerate WebP files if missing
```bash
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "/opt/lessoncraftstudio/samples/generate-webp.sh"
```

---

## IMAGE VERIFICATION COMMANDS

Run these to verify images are working:

### Check file counts
```bash
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "echo 'JPEG:' && find /opt/lessoncraftstudio/samples -name '*.jpeg' | wc -l && echo 'WebP:' && find /opt/lessoncraftstudio/samples -name '*.webp' | wc -l"
```
**Note:** Count varies based on content uploaded via content manager. Zero is valid.

### Check symlinks exist
```bash
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "ls -la /opt/lessoncraftstudio/frontend/public/ | grep samples && ls -la /opt/lessoncraftstudio/frontend/.next/standalone/public/ | grep samples"
```
**Expected:** Both show `samples -> /opt/lessoncraftstudio/samples`

### Test HTTP access
```bash
curl -I "https://www.lessoncraftstudio.com/samples/english/addition/Addition%20Worksheet%201.jpeg"
```
**Expected:** HTTP 200

---

## Server Info
- **IP**: 65.108.5.250
- **User**: root
- **Path**: /opt/lessoncraftstudio

## Critical Rules
- **ALWAYS** include `-hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU` in plink/pscp commands
- **ALWAYS** commit and push BEFORE deploying (git pull gets nothing otherwise)
- **ALWAYS** use REFERENCE folders for worksheet generators and translations
- **ALWAYS** recreate symlinks after `npm run build` (use Scenario 1 command)
- **NEVER** use `cp -r public` (overwrites protected files)
- **NEVER** store sample images directly in `frontend/public/` (they will be wiped on build)
- **NEVER** delete or modify `/opt/lessoncraftstudio/samples/`

## Reference Folders (Source of Truth)
- `REFERENCE APPS/` - 33 worksheet generator HTML files
- `REFERENCE TRANSLATIONS/` - Translation JS files
- `REFERENCE CONTENT MANAGERS/` - Content manager HTML files

## After Modifying Worksheet Generators
Run master-sync to update all local copies:
```bash
scripts\master-sync.bat
```

## Full Documentation
See `DEPLOYMENT.md` for complete details on all scenarios and security considerations.

---

## SAMPLE PROTECTION SYSTEM - 7 LAYERS

Samples are protected by **7 independent layers**. All must be bypassed for data loss:

### Layer 1: Storage Isolation
- Samples stored at `/opt/lessoncraftstudio/samples/` (outside git)
- Never in `frontend/public/` (wiped on build)

### Layer 2: Nginx Direct Serving
- nginx serves `/samples/` directly from filesystem
- Bypasses Next.js entirely - immune to Next.js bugs

### Layer 3: Pre-commit Hooks
- **Server:** `/opt/lessoncraftstudio/.git/hooks/pre-commit` blocks `*.jpeg` and `*.webp` commits
- Prevents accidental `git add .` disasters

### Layer 4: Symlink Protection
- `deploy.sh` removes symlinks before build, recreates after
- Prevents Next.js build from following symlinks into samples

### Layer 5: Automated Backups (Cron)
- **Weekly samples:** Sundays 2 AM → `/opt/lessoncraftstudio/backups/samples_*.tar.gz`
- **Daily database:** 3 AM → `/opt/lessoncraftstudio/backups/db_*.sql.gz`
- Retention: 4 sample backups, 30 days of DB backups

### Layer 6: Pre-deploy Database Snapshot
- `deploy.sh` creates database backup before every deployment
- File: `/opt/lessoncraftstudio/backups/pre-deploy-*.sql.gz`

### Layer 7: Post-deploy Validation
- `deploy.sh` verifies sample count didn't drop
- `deploy.sh` verifies database record count didn't drop
- Sitemap revalidation triggered after deployment

### Health Check Endpoints
```bash
# Sample images health
curl http://localhost:3000/api/health/samples

# Database health
curl http://localhost:3000/api/health/database
```

### Verify Protection Status
```bash
# Check pre-commit hook
plink "cat /opt/lessoncraftstudio/.git/hooks/pre-commit"

# Check backups
plink "ls -lh /opt/lessoncraftstudio/backups/"

# Check cron jobs
plink "crontab -l | grep lessoncraftstudio"
```
