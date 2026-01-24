# GOLDEN BACKUP v2.2.0 - DISASTER RECOVERY GUIDE

## 🔒 CRITICAL INFORMATION - ENGRAVE THIS INTO MEMORY

**Golden Backup Location:** `/opt/lessoncraftstudio/backups/GOLDEN_BACKUP_v2.2.0/`

**Git Tag:** `v2.2.0-GOLDEN`

**Git Commit:** `503fc29`

**Date Created:** October 22, 2025

**This is a STABLE, FULLY FUNCTIONAL version** with:
- ✅ **28 WORKSHEET GENERATORS WITH MODERN UNIFIED HEADERS**
- ✅ All CSS and JavaScript working correctly
- ✅ Purple gradient modern header with zoom controls, undo/redo, and action buttons
- ✅ All latest fixes and enhancements from v1.6.0 through v2.1.0 merged
- ✅ **BINGO APP FIX:** Download file matches screenshot (objectCaching: false)
- ✅ **ADDITION APP:** Find Addend mode + child-friendly signs + mode descriptions (v2.1.0)
- ✅ **SUBTRACTION APP:** Professional spacing + mode descriptions (v2.1.0)
- ✅ **FIND OBJECTS APP:** I spy constraints + Odd One Out selection (v1.9.0)
- ✅ **PICTURE PATH APP:** All critical bug fixes + modern header
- ✅ **PATTERN TRAIN APP:** Latest deployed version with all fixes
- ✅ **MORE LESS APP:** Latest deployed version with all fixes
- ✅ Complete 6-feature modern implementation across all apps
- ✅ Universal undo/redo system with keyboard shortcuts
- ✅ Zoom controls (25%-300%) across all worksheet generators
- ✅ Enhanced layer management (4-button controls)
- ✅ Border/background editability
- ✅ Complete translation system for all apps
- ✅ Prisma singleton fix (prevents deleted images from reappearing)
- ✅ Image library fully functional (add, edit, delete, translate)
- ✅ Blog content manager with full authentication system
- ✅ Multi-language support (11 languages) for all UI elements
- ✅ Email notification system with Resend SMTP
- ✅ Support ticket system with response emails

---

## 📦 Backup Contents

### 1. Git Tag: `v2.2.0-GOLDEN`
- **Purpose:** Marks the exact code state in git history with ALL modern headers
- **Location:** Local git repository at `/opt/lessoncraftstudio/.git`
- **Verification:** `cd /opt/lessoncraftstudio && git tag | grep v2.2.0-GOLDEN`

### 2. Database Backup
- **File:** `/opt/lessoncraftstudio/backups/GOLDEN_BACKUP_v2.2.0/database_GOLDEN_2025-10-22.backup`
- **Format:** PostgreSQL custom format (compressed, complete)
- **Size:** 154KB
- **Database:** `lessoncraftstudio_prod`
- **Includes:** All tables, users, subscriptions, payments, blog posts, support tickets, sequences, constraints, indexes

### 3. Public Files Backup
- **File:** `/opt/lessoncraftstudio/backups/GOLDEN_BACKUP_v2.2.0/public_files_GOLDEN_2025-10-22.tar.gz`
- **Size:** 288MB
- **Contents:**
  - `public/uploads/` - User uploaded files
  - `public/worksheet-samples/` - Worksheet sample PDFs
  - `public/images/` - Image library (borders, backgrounds, themes)
  - `public/worksheet-images/` - Worksheet-specific images
  - `public/blog/` - Blog images, PDFs, and thumbnails
  - `public/worksheet-generators/` - **ALL 28 APPS WITH MODERN HEADERS:**

---

## 📋 ALL 28 APPS WITH MODERN UNIFIED HEADERS

Each app has the purple gradient header with:
- Zoom controls (zoom in, zoom out, reset, percentage display)
- Undo/Redo buttons with keyboard shortcuts
- Generate dropdown (New Worksheet, Answer Key)
- Download dropdown (JPEG, PDF, Grayscale option)
- Clear All button

### Complete List (Alphabetically):

1. **addition.html** (178KB) - **v2.1.0 ENHANCEMENTS**
   - Find Addend mode (A + ? = C)
   - Child-friendly circular plus signs (green)
   - Child-friendly circular equals signs (blue)
   - Mode-specific descriptions in 11 languages

2. **alphabet train.html** (171KB)
   - Modern header with full controls

3. **big small.html** (170KB)
   - Modern header with undo/redo and zoom

4. **chart count.html** (156KB)
   - Modern header with all features

5. **code addition.html** (162KB)
   - Modern header with full controls

6. **coloring.html** (99KB)
   - Modern header with zoom and undo

7. **crossword.html** (133KB)
   - Modern header with all features

8. **cryptogram.html** (135KB)
   - Modern header with full controls

9. **draw and color.html** (133KB)
   - Modern header with zoom and undo

10. **drawing lines.html** (139KB)
    - Modern header with all features

11. **find and count.html** (176KB)
    - Modern header with full controls

12. **find objects.html** (206KB) - **v1.9.0 ENHANCEMENTS**
    - I spy mode with angle variation and adjacency constraints
    - Odd One Out individual image selection
    - Modern header with all features

13. **grid match.html** (162KB)
    - Modern header with full controls

14. **matching.html** (157KB)
    - Modern header with zoom and undo

15. **math puzzle.html** (150KB)
    - Modern header with all features

16. **math worksheet.html** (189KB)
    - Modern header with undo/redo duplication fix

17. **missing pieces.html** (170KB)
    - Modern header with full controls

18. **more less.html** (176KB) - **LATEST DEPLOYED VERSION**
    - Modern header with all latest fixes

19. **odd one out.html** (170KB)
    - Modern header with full controls

20. **pattern train.html** (171KB) - **LATEST DEPLOYED VERSION**
    - Modern header with all latest fixes

21. **pattern worksheet.html** (177KB)
    - Modern header with full controls

22. **picture path.html** (279KB) - **LATEST WITH BUG FIXES**
    - Classic Maze mode
    - Choose the Right Path mode
    - All critical bugs fixed (answer key paths, real-time walls)
    - Modern header with full controls

23. **prepositions.html** (183KB)
    - Modern header with all features
    - Multiple choice mode

24. **shadow match.html** (148KB)
    - Modern header with full controls

25. **subtraction.html** (186KB) - **v2.1.0 ENHANCEMENTS**
    - Professional spacing (even distribution algorithm)
    - Mode-specific descriptions in 11 languages
    - Modern header with all features

26. **treasure hunt.html** (141KB)
    - Modern header with full controls

27. **word guess.html** (145KB)
    - Modern header with all features

28. **word scramble.html** (147KB)
    - Modern header with undo/redo bugfix

### Apps WITHOUT Modern Headers (Not Included):
- bingo.html - **HAS LATEST FIX** (objectCaching: false for download matching) but no modern header
- sudoku.html - Old header style
- wordsearch.html - Old header style
- picture sort.html - Old header style

---

## 🚨 WHEN TO USE THIS BACKUP

Use the golden backup when:
1. New features break the website
2. Database becomes corrupted
3. Critical files are accidentally deleted
4. Need to rollback to a known-good state
5. Deployment goes wrong and website is broken
6. Any worksheet generator stops working properly
7. Modern headers disappear from apps
8. Bingo download fix is lost
9. Addition/Subtraction enhancements are broken

**DO NOT** use this backup for minor issues - try fixing first!

---

## 🔧 COMPLETE RECOVERY PROCEDURE

### Step 1: Assess the Damage

```bash
# Check if application is running
pm2 status lessoncraftstudio

# Check if database is accessible
PGPASSWORD=LcS2025SecureDBPass psql -U lcs_user -d lessoncraftstudio_prod -c "SELECT COUNT(*) FROM users;"

# Check if files exist
ls -lh /opt/lessoncraftstudio/frontend/public/worksheet-generators/addition.html
```

### Step 2: Stop the Application

```bash
pm2 stop lessoncraftstudio
```

### Step 3: Restore Code from Git Tag

```bash
cd /opt/lessoncraftstudio

# Save current state (just in case)
git branch backup-before-recovery-$(date +%Y%m%d-%H%M%S)

# Checkout the golden tag
git checkout v2.2.0-GOLDEN

# Verify we're on the right version
git describe --tags
# Should output: v2.2.0-GOLDEN
```

### Step 4: Restore Database (if needed)

**⚠️ WARNING:** This will COMPLETELY REPLACE your current database!

```bash
# 1. Drop and recreate the database
PGPASSWORD=LcS2025SecureDBPass dropdb -U lcs_user lessoncraftstudio_prod
PGPASSWORD=LcS2025SecureDBPass createdb -U lcs_user lessoncraftstudio_prod

# 2. Restore from backup
PGPASSWORD=LcS2025SecureDBPass pg_restore -U lcs_user -d lessoncraftstudio_prod -v /opt/lessoncraftstudio/backups/GOLDEN_BACKUP_v2.2.0/database_GOLDEN_2025-10-22.backup

# 3. Verify restoration
PGPASSWORD=LcS2025SecureDBPass psql -U lcs_user -d lessoncraftstudio_prod -c "SELECT COUNT(*) FROM users;"
```

### Step 5: Restore Public Files (if needed)

**⚠️ WARNING:** This will OVERWRITE your current public files!

```bash
cd /opt/lessoncraftstudio/frontend

# 1. Backup current public directory (just in case)
mv public public.backup-$(date +%Y%m%d-%H%M%S)

# 2. Extract golden backup
tar -xzf /opt/lessoncraftstudio/backups/GOLDEN_BACKUP_v2.2.0/public_files_GOLDEN_2025-10-22.tar.gz

# 3. Verify extraction
ls -lh public/worksheet-generators/addition.html
grep -l 'MODERN UNIFIED HEADER' public/worksheet-generators/*.html | wc -l
# Should output: 28
```

### Step 6: Rebuild and Deploy

```bash
cd /opt/lessoncraftstudio/frontend

# Install dependencies
npm install

# Run the deployment script
cd /opt/lessoncraftstudio
bash deploy.sh
```

### Step 7: Verify Recovery

```bash
# 1. Check PM2 status
pm2 status lessoncraftstudio

# 2. Check website is accessible
sleep 5
curl -I http://localhost:3000

# 3. Check worksheet generators
curl -I http://localhost:3000/worksheet-generators/addition.html

# 4. Verify modern headers
grep -l 'MODERN UNIFIED HEADER' /opt/lessoncraftstudio/frontend/.next/standalone/public/worksheet-generators/*.html | wc -l
# Should output: 28
```

---

## 🎯 QUICK RECOVERY COMMANDS (Copy-Paste)

### Full System Recovery (Code + Database + Files)

```bash
# Stop application
pm2 stop lessoncraftstudio

# Restore code
cd /opt/lessoncraftstudio
git checkout v2.2.0-GOLDEN

# Restore database
PGPASSWORD=LcS2025SecureDBPass dropdb -U lcs_user lessoncraftstudio_prod
PGPASSWORD=LcS2025SecureDBPass createdb -U lcs_user lessoncraftstudio_prod
PGPASSWORD=LcS2025SecureDBPass pg_restore -U lcs_user -d lessoncraftstudio_prod -v /opt/lessoncraftstudio/backups/GOLDEN_BACKUP_v2.2.0/database_GOLDEN_2025-10-22.backup

# Restore files
cd /opt/lessoncraftstudio/frontend
mv public public.backup-$(date +%Y%m%d-%H%M%S)
tar -xzf /opt/lessoncraftstudio/backups/GOLDEN_BACKUP_v2.2.0/public_files_GOLDEN_2025-10-22.tar.gz

# Rebuild and restart
cd /opt/lessoncraftstudio
bash deploy.sh
```

### Code-Only Recovery (Fastest)

```bash
cd /opt/lessoncraftstudio
pm2 stop lessoncraftstudio
git checkout v2.2.0-GOLDEN
bash deploy.sh
```

---

## 📍 BACKUP LOCATION SUMMARY

**Primary Backup Directory:**
```
/opt/lessoncraftstudio/backups/GOLDEN_BACKUP_v2.2.0/
```

**Backup Files:**
1. `database_GOLDEN_2025-10-22.backup` (PostgreSQL dump - 154KB)
2. `public_files_GOLDEN_2025-10-22.tar.gz` (Compressed public files - 288MB)

**Git Tag:**
```bash
cd /opt/lessoncraftstudio && git show v2.2.0-GOLDEN
```

**Recovery Documentation:**
- This file: `/opt/lessoncraftstudio/GOLDEN_RECOVERY.md`

---

## 🛡️ PROTECTION MEASURES

To prevent accidentally overwriting this backup:

```bash
# Backup directory is already read-only (chmod 555)
ls -ld /opt/lessoncraftstudio/backups/GOLDEN_BACKUP_v2.2.0/
# Output: dr-xr-xr-x (read-only)

# To restore write access (if needed for deletion):
# chmod -R 755 /opt/lessoncraftstudio/backups/GOLDEN_BACKUP_v2.2.0/
```

---

## 🆕 CHANGES IN v2.2.0 (from v2.1.0)

**STATUS: STABLE - COMPLETE RESTORATION WITH ALL MODERN HEADERS**

This version represents the **complete recovery** of all 28 worksheet generators with modern headers, combining the best of all previous versions:

### What Was Restored:

**Base (v1.6.0):** 28 apps with modern unified headers
- Purple gradient header design
- Zoom controls (in/out/reset/percentage)
- Undo/Redo with keyboard shortcuts
- Generate dropdown menu
- Download dropdown with JPEG/PDF options
- Clear All button

**Updates Applied:**

1. **Picture Path (Latest)** - Merged bug fixes with modern header
   - All critical bugs fixed (answer key paths through walls, etc.)
   - Modern header preserved

2. **Find Objects (v1.9.0)** - I spy + Odd One Out enhancements
   - Angle variation and adjacency constraints
   - Individual image selection for Odd One Out

3. **Addition (v2.1.0)** - Latest professional enhancements
   - Find Addend mode (A + ? = C)
   - Child-friendly circular signs
   - Mode-specific descriptions (11 languages)

4. **Subtraction (v2.1.0)** - Latest professional enhancements
   - Even distribution spacing algorithm
   - Mode-specific descriptions (11 languages)

5. **Bingo** - Download fix restored
   - objectCaching: false (fixes download/screenshot mismatch)

6. **Pattern Train, More Less, Sudoku** - Latest deployed versions
   - All recent fixes preserved

### Key Improvements Over v2.1.0:

- ✅ **28 apps now in git** (v2.1.0 only had 3)
- ✅ **All modern headers preserved** (v2.1.0 lost them during deploy)
- ✅ **Bingo download fix** included
- ✅ **All latest updates** from every version merged correctly
- ✅ **Properly committed to git** (won't be lost again)
- ✅ **288MB backup** with all files (v2.1.0 was only 151MB)

---

## 📝 PREVIOUS GOLDEN BACKUPS

**Historical Backups (Keep All):**
- **v2.2.0-GOLDEN**: `/opt/lessoncraftstudio/backups/GOLDEN_BACKUP_v2.2.0/` (October 22, 2025) - **CURRENT** - 28 apps with modern headers
- **v2.1.0-GOLDEN**: `/opt/lessoncraftstudio/backups/GOLDEN_BACKUP_v2.1.0/` (October 21, 2025) - Addition & Subtraction enhancements (only 3 apps)
- **v2.0.0-GOLDEN**: `/opt/lessoncraftstudio/backups/GOLDEN_BACKUP_v2.0.0/` (October 21, 2025) - Stable checkpoint (1 app)
- **v1.9.0-GOLDEN**: `/opt/lessoncraftstudio/backups/GOLDEN_BACKUP_v1.9.0/` (October 21, 2025) - Find Objects enhancements (19 apps)
- **v1.7.0-GOLDEN**: `/opt/lessoncraftstudio/backups/GOLDEN_BACKUP_v1.7.0/` (October 21, 2025) - Picture Path bug fixes (18 apps)
- **v1.6.0-GOLDEN**: `/opt/lessoncraftstudio/backups/GOLDEN_BACKUP_v1.6.0/` (October 19, 2025) - Original modernization (29 apps)

**Why v2.2.0 is the GOLDEN standard:**
- Most complete set of modern headers (28 apps)
- All latest fixes and enhancements merged
- Everything properly committed to git
- Won't be lost during deployment

---

## 🚀 FUTURE GOLDEN BACKUPS

When creating new golden backups:

1. **Commit to git FIRST** - Never skip this!
2. Create git tag: `git tag -a vX.X.X-GOLDEN -m "Description"`
3. Create backup directory: `mkdir -p /opt/lessoncraftstudio/backups/GOLDEN_BACKUP_vX.X.X/`
4. Backup public files: `tar -czf public_files_GOLDEN_DATE.tar.gz public/`
5. Backup database: `pg_dump -F c -f database_GOLDEN_DATE.backup`
6. Set read-only: `chmod -R 555 /opt/lessoncraftstudio/backups/GOLDEN_BACKUP_vX.X.X/`
7. Update this document
8. **Verify backup** by extracting and checking files
9. **Keep old backups!** Don't delete previous golden backups

---

**Last Updated:** October 22, 2025
**Version:** 2.2.0-GOLDEN
**Status:** STABLE - ALL MODERN HEADERS RESTORED - PRODUCTION READY
**Total Apps with Modern Headers:** 28
**Backup Size:** 288MB
**Git Commit:** 503fc29
