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
/opt/lessoncraftstudio/samples/         (~9.1 GB, 9,278+ files)
├── danish/                             (34 app folders, ~450 MB)
├── dutch/                              (34 app folders, ~410 MB)
├── english/                            (34 app folders, ~850 MB)
├── finnish/                            (34 app folders, ~490 MB)
├── french/                             (34 app folders, ~370 MB)
├── german/                             (34 app folders, ~360 MB)
├── italian/                            (34 app folders, ~400 MB)
├── norwegian/                          (34 app folders, ~450 MB)
├── portuguese/                         (34 app folders, ~400 MB)
├── spanish/                            (34 app folders, ~390 MB)
├── swedish/                            (34 app folders, ~330 MB)
├── generate-webp.sh                    (WebP generator script)
└── *-samples.tar.gz                    (Backup archives - DO NOT DELETE)
```

**File counts:**
- JPEG files: ~3,039 original sample images
- WebP files: ~6,096 optimized versions (_thumb.webp, _preview.webp)
- Total files: ~9,278

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
4. NEVER delete the tar.gz backup archives in `/tmp/`

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
**Expected:** ~3,039 JPEG, ~6,096 WebP

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
