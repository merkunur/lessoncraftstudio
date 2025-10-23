# Production Deployment Guide

---

# 🚨🚨🚨 CRITICAL WARNING - READ THIS FIRST 🚨🚨🚨

## ⛔ MANDATORY SOURCE FILE POLICY ⛔

### 🔴 THE GOLDEN RULE - ABSOLUTELY NO EXCEPTIONS 🔴

**WHEN DEPLOYING OR MODIFYING ANY WORKSHEET GENERATOR APP:**

```
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║   ✋ STOP! BEFORE YOU DEPLOY ANY APP, READ THIS! ✋           ║
║                                                               ║
║   ✅ ALWAYS USE: REFERENCE APPS folder                        ║
║      Location: C:\Users\rkgen\lessoncraftstudio\REFERENCE APPS\  ║
║                                                               ║
║   ❌ NEVER USE: Random local files like:                      ║
║      • pattern-train-current.html                            ║
║      • addition-production.html                              ║
║      • wordsearch-deployed.html                              ║
║      • sudoku-current.html                                   ║
║      • ANY file NOT in REFERENCE APPS folder                 ║
║                                                               ║
║   ⚠️  WARNING: Using wrong files WILL BREAK PRODUCTION!      ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
```

### 📋 WHY THIS MATTERS

The project directory contains **HUNDREDS** of old, broken, test, and outdated versions of apps with names like:
- `pattern-train-current.html` ❌ (could be 3 months old)
- `addition-production.html` ❌ (might be a broken test version)
- `wordsearch-deployed.html` ❌ (could be from last year)
- `sudoku-fix-attempt-v5.html` ❌ (experimental, broken)

**THESE ARE NOT THE PRODUCTION VERSIONS!**

The **REFERENCE APPS** folder contains the ACTUAL, LIVE, PRODUCTION versions downloaded directly from:
```
https://www.lessoncraftstudio.com/worksheet-generators/
```

These are the GOLDEN, AUTHORITATIVE, CURRENT versions that users see on the live website.

### 🛡️ MANDATORY PRE-DEPLOYMENT CHECKLIST

**BEFORE deploying ANY worksheet generator app, you MUST:**

1. ✅ **Verify the source file is from REFERENCE APPS folder**
   ```bash
   # CORRECT source path example:
   C:\Users\rkgen\lessoncraftstudio\REFERENCE APPS\wordsearch.html

   # WRONG - DO NOT USE:
   C:\Users\rkgen\lessoncraftstudio\wordsearch-current.html
   C:\Users\rkgen\lessoncraftstudio\wordsearch-production.html
   ```

2. ✅ **Confirm the file exists in REFERENCE APPS**
   ```bash
   ls "C:\Users\rkgen\lessoncraftstudio\REFERENCE APPS\wordsearch.html"
   ```

3. ✅ **Check the file size is reasonable (100KB-200KB typically)**
   ```bash
   ls -lh "C:\Users\rkgen\lessoncraftstudio\REFERENCE APPS\wordsearch.html"
   ```

4. ✅ **State explicitly which file you're using BEFORE deployment**
   - Example: "I will deploy wordsearch.html from REFERENCE APPS folder"

### 🔧 CORRECT DEPLOYMENT WORKFLOW

**Step-by-step process for deploying a worksheet generator app:**

1. **Start with REFERENCE APPS version:**
   ```bash
   # Copy from REFERENCE APPS to working directory if modifications needed
   cp "C:\Users\rkgen\lessoncraftstudio\REFERENCE APPS\wordsearch.html" "C:\Users\rkgen\lessoncraftstudio\wordsearch-MODIFIED.html"
   ```

2. **Make your modifications** (if needed):
   - Edit the `-MODIFIED.html` version
   - Test locally
   - Verify changes

3. **Upload to production server:**
   ```bash
   "C:\Program Files\PuTTY\pscp.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU "C:\Users\rkgen\lessoncraftstudio\wordsearch-MODIFIED.html" root@65.108.5.250:"/opt/lessoncraftstudio/frontend/public/worksheet-generators/wordsearch.html"
   ```

4. **Copy to standalone and restart:**
   ```bash
   "C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "cd /opt/lessoncraftstudio/frontend && cp 'public/worksheet-generators/wordsearch.html' '.next/standalone/public/worksheet-generators/wordsearch.html' && pm2 restart lessoncraftstudio"
   ```

### 🚫 COMMON MISTAKES TO AVOID

❌ **NEVER do this:**
```bash
# WRONG - Using a random local file
pscp wordsearch-current.html root@server:/path/

# WRONG - Using production.html file
pscp addition-production.html root@server:/path/

# WRONG - Using any file outside REFERENCE APPS
pscp pattern-train-deployed.html root@server:/path/
```

✅ **ALWAYS do this:**
```bash
# CORRECT - Using REFERENCE APPS version
pscp "C:\Users\rkgen\lessoncraftstudio\REFERENCE APPS\wordsearch.html" root@server:/path/
```

### 📊 REFERENCE APPS FOLDER CONTENTS

The REFERENCE APPS folder contains exactly **33 production apps**:

1. addition.html
2. alphabet train.html
3. big small.html
4. bingo.html
5. chart count.html
6. code addition.html
7. coloring.html
8. crossword.html
9. cryptogram.html
10. draw and color.html
11. drawing lines.html
12. find and count.html
13. find objects.html
14. grid match.html
15. matching.html
16. math puzzle.html
17. math worksheet.html
18. missing pieces.html
19. more less.html
20. odd one out.html
21. pattern train.html
22. pattern worksheet.html
23. picture path.html
24. picture sort.html
25. prepositions.html
26. shadow match.html
27. subtraction.html
28. sudoku.html
29. treasure hunt.html
30. word guess.html
31. word scramble.html
32. wordsearch.html
33. writing.html

**If you need to deploy any of these 33 apps, you MUST use the version from REFERENCE APPS folder.**

### 🔄 UPDATING REFERENCE APPS

If production apps have been updated and you need to refresh REFERENCE APPS:

```bash
# Download all current production apps
cd "C:\Users\rkgen\lessoncraftstudio\REFERENCE APPS"

# Example: Download updated wordsearch
curl -s -o "wordsearch.html" "https://www.lessoncraftstudio.com/worksheet-generators/wordsearch.html?tier=full&locale=en"
```

### ⚠️ FINAL WARNING

**DEPLOYING THE WRONG VERSION CAUSES:**
- ✗ Production bugs that were already fixed
- ✗ Missing features that users expect
- ✗ Broken functionality
- ✗ Hours of debugging and rollback work
- ✗ User complaints and frustration

**Before ANY deployment, ask yourself:**
- "Am I using a file from REFERENCE APPS folder?"
- "Have I verified the full path contains 'REFERENCE APPS'?"
- "Did I check this is NOT a random local file?"

**If you cannot answer YES to all three questions, STOP and verify your source file.**

---

## ⚠️ CRITICAL: Next.js Standalone Mode - Static Files Issue

**READ THIS SECOND** - Failure to follow this will result in website having NO CSS/JavaScript!

### The Problem

Next.js standalone mode (`output: 'standalone'`) does NOT automatically copy static files after building.

When you run `npm run build`, Next.js creates `.next/standalone/` but:
- ❌ Does NOT copy `.next/static` → `.next/standalone/.next/static` (CSS, JS, fonts)
- ❌ Does NOT copy `public` → `.next/standalone/public` (images, HTML files)

PM2 runs from `.next/standalone/server.js`, so if these files aren't copied, **the website will have no styling or JavaScript!**

### The Solution

**ALWAYS use the complete deployment command:**

```bash
# CORRECT - Full deployment with static files
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "cd /opt/lessoncraftstudio && git pull && cd frontend && npm run build && cp -r .next/static .next/standalone/.next/static && cp -r public .next/standalone/public && pm2 restart lessoncraftstudio"

# WRONG - Missing static file copies - WILL BREAK WEBSITE!
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "cd /opt/lessoncraftstudio && git pull && cd frontend && npm run build"
```

### Quick Fix If Website is Broken

If you forgot to copy the static files and the website has no CSS/JS:

```bash
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "cd /opt/lessoncraftstudio/frontend && cp -r .next/static .next/standalone/.next/static && cp -r public .next/standalone/public && pm2 restart lessoncraftstudio"
```

### Use the Deployment Script (Recommended)

A deployment script has been created at `/opt/lessoncraftstudio/deploy.sh` that handles all this automatically:

```bash
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "bash /opt/lessoncraftstudio/deploy.sh"
```

---

## Server Information

**Server Address**: 65.108.5.250
**Server User**: root
**Server Password**: JfmiPF_QW4_Nhm
**SSH Host Key Fingerprint**: SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU
**Application Path**: /opt/lessoncraftstudio
**Frontend Path**: /opt/lessoncraftstudio/frontend

## SSH Access Methods

### Method 1: Using PuTTY plink (Windows)
```bash
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "YOUR_COMMAND_HERE"
```

### Method 2: Using SSH (Linux/Mac/Git Bash)
```bash
ssh root@65.108.5.250
# Password: JfmiPF_QW4_Nhm
```

**Note**: PuTTY plink is preferred for Windows environments as it's already installed and configured.

## Important Notes

1. **🚨 ALWAYS USE REFERENCE APPS FOLDER** - Never use random local files for deployment!
2. **Always commit and push first** - Use git-based deployment rather than direct file uploads
3. **Production port is 3000** - Local development uses 3001, production uses 3000
4. **PM2 auto-restarts** - If the app crashes, PM2 will automatically restart it
5. **Check logs after deployment** - Always verify no errors in PM2 logs
6. **CRITICAL: Standalone mode** - Production runs in standalone mode. Public files MUST be copied to `.next/standalone/public/` after updates!
7. **Build when needed** - Only rebuild if code changes; for public files, just copy to standalone and restart
8. **Database scripts** - Remember to update port numbers in database scripts (3001 → 3000)
9. **Git conflicts** - Use `git stash && git pull` if local changes conflict
10. **Keep credentials secure** - This file contains sensitive information; do not commit to public repos

---

**Last Updated**: 2025-10-23
**Deployment Tool**: PuTTY plink for Windows
**Process Manager**: PM2
**Framework**: Next.js 14.2.18
