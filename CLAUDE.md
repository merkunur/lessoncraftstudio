# Project Instructions for Claude Code

## Deployment - CRITICAL

### Before ANY Deployment
1. **COMMIT** all changes: `git add . && git commit -m "message"`
2. **PUSH** to remote: `git push`
3. **THEN** deploy (git pull on server only gets pushed commits)

### Scenario 1: Next.js Code Changes (Product Pages, Components, Config)
```bash
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "cd /opt/lessoncraftstudio && git pull && cd frontend && npm run build && cp -r .next/static .next/standalone/.next/static && pm2 restart lessoncraftstudio"
```

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

## Server Info
- **IP**: 65.108.5.250
- **User**: root
- **Path**: /opt/lessoncraftstudio

## Critical Rules
- **ALWAYS** include `-hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU` in plink/pscp commands
- **ALWAYS** commit and push BEFORE deploying (git pull gets nothing otherwise)
- **ALWAYS** use REFERENCE folders for worksheet generators and translations
- **NEVER** use `cp -r public` (overwrites protected files)

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
