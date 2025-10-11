# 🚨 CRITICAL STABLE VERSION - RECOVERY DOCUMENTATION 🚨

**THIS IS THE MOST IMPORTANT FILE IN THE PROJECT**

## VERIFIED WORKING VERSION

**Date**: October 12, 2025
**Version**: v1.0.1-stable-2025-10-12
**Status**: ✅ FULLY FUNCTIONAL - TESTED AND VERIFIED
**Git Tag**: `v1.0.1-stable-2025-10-12`

---

## 🛡️ WHAT THIS VERSION INCLUDES

### ✅ All Features Working:
- ✅ Content Manager loads images correctly
- ✅ Content Manager saves without deleting images (CRITICAL BUG FIXED)
- ✅ Frontend CSS/JavaScript working
- ✅ All 33 worksheet generators functional
- ✅ Database has 149 images seeded
- ✅ Multi-language support (11 languages)
- ✅ Homepage with dynamic rendering
- ✅ User authentication and subscriptions
- ✅ Blog system
- ✅ Payment integration with Stripe

### 🐛 CRITICAL BUGS FIXED IN THIS VERSION:
1. **Content Manager Delete Bug** - POST handlers were deleting images not in request
2. **Frontend CSS/JS Not Loading** - Static files not copied to standalone build

---

## 📍 BACKUP LOCATIONS

### 1. Git Repository
**Location**: https://github.com/merkunur/lessoncraftstudio.git
**Tag**: `v1.0.1-stable-2025-10-12`
**Commit**: 86cbaf9

### 2. Server Backups
**Location**: `/opt/lessoncraftstudio/backups/CRITICAL_STABLE_v1.0.1/`

Files:
- `database_WORKING_2025-10-12.backup` (663KB)
- `public_files_WORKING_2025-10-12.tar.gz` (148MB)

### 3. Database State
- **Total Images**: 149 images (type='images')
- **Themes**: 17 image themes
- **Other Data**: All users, subscriptions, blog posts, etc.

---

## 🚑 EMERGENCY RECOVERY PROCEDURE

### If Everything Breaks - Use This:

#### Step 1: Restore Source Code
```bash
# On production server
cd /opt/lessoncraftstudio
git fetch --all --tags
git checkout tags/v1.0.1-stable-2025-10-12 -b recovery-v1.0.1
```

#### Step 2: Restore Database
```bash
# On production server
pm2 stop lessoncraftstudio

# Restore database
PGPASSWORD=LcS2025SecureDBPass pg_restore -U lcs_user -d lessoncraftstudio_prod -c -v \
  /opt/lessoncraftstudio/backups/CRITICAL_STABLE_v1.0.1/database_WORKING_2025-10-12.backup
```

#### Step 3: Restore Public Files
```bash
# On production server
cd /opt/lessoncraftstudio/frontend
tar -xzf /opt/lessoncraftstudio/backups/CRITICAL_STABLE_v1.0.1/public_files_WORKING_2025-10-12.tar.gz
```

#### Step 4: Rebuild Application
```bash
# On production server
cd /opt/lessoncraftstudio/frontend

# Install dependencies
npm install

# Build
npm run build

# CRITICAL: Copy static files to standalone (THIS IS REQUIRED!)
cp -r .next/static .next/standalone/.next/static
cp -r public .next/standalone/public

# Restart
fuser -k 3000/tcp
pm2 restart lessoncraftstudio
```

#### Step 5: Verify
```bash
# Check PM2 status
pm2 list

# Check logs
pm2 logs lessoncraftstudio --lines 20 --nostream

# Test website
curl -I http://localhost:3000

# Test static files
curl -I http://localhost:3000/_next/static/
```

---

## 🔧 CRITICAL KNOWLEDGE FOR FUTURE DEPLOYMENTS

### ALWAYS After `npm run build`:
```bash
# These commands are REQUIRED for standalone builds:
cp -r .next/static .next/standalone/.next/static
cp -r public .next/standalone/public
```

**Why**: Next.js standalone builds don't automatically copy static assets. Without this, CSS/JS won't load.

### NEVER Delete These:
- Git tag: `v1.0.1-stable-2025-10-12`
- Backup directory: `/opt/lessoncraftstudio/backups/CRITICAL_STABLE_v1.0.1/`
- This file: `CRITICAL_RECOVERY.md`

---

## 📋 DATABASE VERIFICATION

To verify database is in correct state:

```bash
# Should return 149
PGPASSWORD=LcS2025SecureDBPass psql -U lcs_user -d lessoncraftstudio_prod -c \
  "SELECT COUNT(*) FROM image_library_items WHERE theme_id IN (SELECT id FROM image_themes WHERE type = 'images');"

# Should show image types
PGPASSWORD=LcS2025SecureDBPass psql -U lcs_user -d lessoncraftstudio_prod -c \
  "SELECT type, COUNT(*) as theme_count FROM image_themes GROUP BY type ORDER BY type;"
```

Expected output:
```
     type     | theme_count
-------------+-------------
 backgrounds |           6
 borders     |           5
 images      |          17
 train       |           2
 worksheet   |           2
```

---

## 🔐 CRITICAL FILES TO NEVER MODIFY

These files contain the bug fixes:

1. **`frontend/app/api/admin/images/update/route.ts`**
   Lines 219-220: Comment that prevents deletion

2. **`frontend/app/api/admin/backgrounds/update/route.ts`**
   Lines 200-201: Comment that prevents deletion

3. **`frontend/app/api/admin/borders/update/route.ts`**
   Should NOT have destructive delete logic

---

## 📞 EMERGENCY CONTACTS

**Production Server**: 65.108.5.250
**SSH User**: root
**Database**: lessoncraftstudio_prod
**DB User**: lcs_user
**PM2 Process**: lessoncraftstudio

---

## 🎯 QUICK REFERENCE COMMANDS

```bash
# View this tag
git show v1.0.1-stable-2025-10-12

# List all backups
ls -lh /opt/lessoncraftstudio/backups/CRITICAL_STABLE_v1.0.1/

# Re-seed images if needed
cd /opt/lessoncraftstudio/frontend
npx tsx scripts/seed-images.ts

# Check what's running
pm2 status

# View logs
pm2 logs lessoncraftstudio

# Restart app
pm2 restart lessoncraftstudio
```

---

## ⚠️ WARNING SIGNS THAT YOU NEED TO RESTORE

1. Content manager shows no images
2. Website has no CSS/styling
3. Database query shows 0 images for type='images'
4. PM2 logs show "MODULE_NOT_FOUND" errors
5. Static files return 404

**IF YOU SEE ANY OF THESE** → Use the Emergency Recovery Procedure above

---

## 📝 CHANGELOG - What Was Fixed

### October 12, 2025 - v1.0.1-stable

**Critical Bugs Fixed:**

1. **Content Manager Destructive Delete Bug**
   - Problem: Saving in content manager deleted all images not in request
   - Cause: Pagination sent only visible images, API deleted others
   - Fix: Removed delete logic from POST handlers (lines 222-230)
   - Files: `images/update/route.ts`, `backgrounds/update/route.ts`

2. **Frontend CSS/JS Not Loading**
   - Problem: No styling, broken functionality
   - Cause: Static files not copied to standalone build
   - Fix: Added copy commands after build
   - Command: `cp -r .next/static .next/standalone/.next/static`

3. **Database Images Missing**
   - Problem: Database had 0 images
   - Cause: Images never seeded from filesystem
   - Fix: Ran `npx tsx scripts/seed-images.ts`
   - Result: 149 images imported

---

## 🏆 SUCCESS CRITERIA

This version is considered working if:

- [x] Homepage loads with CSS/styling
- [x] Content manager at `/worksheet-generators/content-manager-v2.html` loads
- [x] Content manager shows image themes and images
- [x] Clicking "Save All Changes" doesn't delete images
- [x] Database has 149+ images
- [x] All worksheet generators work
- [x] No "MODULE_NOT_FOUND" errors in logs

---

**REMEMBER**: This file is your safety net. If anything breaks, start here.

**Last Verified Working**: October 12, 2025 01:48 UTC
**Verified By**: Claude Code Assistant
**Next Verification Due**: Before any major changes
