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

## IMAGE INFRASTRUCTURE - ISOLATED STORAGE ARCHITECTURE

### Overview
- **363 product pages** + **11 homepages** display sample images
- Images stored in **isolated directory**: `/var/www/lcs-media/samples/`
- Images served **directly by nginx** (bypasses Next.js entirely)
- WebP thumbnails (_thumb.webp) and previews (_preview.webp) generated automatically
- Content uploaded via content manager is protected with **immutable flags**

### Server File Structure
```
/var/www/lcs-media/                    (ISOLATED from code - bulletproof)
├── samples/                           (sample images)
│   ├── english/                       (11 language folders)
│   ├── german/
│   ├── french/
│   ├── ... (8 more languages)
│   └── finnish/
├── scripts/                           (backup/health scripts)
│   ├── pre-deploy-backup.sh
│   ├── scheduled-backup.sh
│   ├── health-check.sh
│   └── emergency-restore.sh
└── backups/                           (backup archives)
    ├── pre-deploy/
    ├── hourly/
    ├── daily/
    ├── weekly/
    └── monthly/

/opt/lessoncraftstudio/                (CODE ONLY - git repo)
├── frontend/
├── deploy.sh                          (CANNOT touch /var/www/lcs-media/)
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

## Critical Rules
- **ALWAYS** include `-hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU` in plink/pscp commands
- **ALWAYS** commit and push BEFORE deploying (git pull gets nothing otherwise)
- **ALWAYS** use REFERENCE folders for worksheet generators and translations
- **NEVER** store sample images directly in `frontend/public/` (gets wiped on build)
- **NEVER** delete or modify `/var/www/lcs-media/samples/`
- **NEVER** run `git add .` in project root (could include samples)

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
