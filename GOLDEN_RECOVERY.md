# GOLDEN BACKUP v1.0.3 - DISASTER RECOVERY GUIDE

## 🔒 CRITICAL INFORMATION - ENGRAVE THIS INTO MEMORY

**Golden Backup Location:** `/opt/lessoncraftstudio/backups/GOLDEN_BACKUP_v1.0.3/`

**Git Tag:** `v1.0.3-GOLDEN`

**Date Created:** October 12, 2025

**This is a STABLE, FULLY FUNCTIONAL version** with:
- ✅ All CSS and JavaScript working correctly
- ✅ Prisma singleton fix (prevents deleted images from reappearing)
- ✅ Image library fully functional (add, edit, delete, translate)
- ✅ Blog content manager with full authentication system
- ✅ Blog posts displaying on frontend with categories
- ✅ SEO automation fully functional (meta tags, Open Graph, Schema.org)
- ✅ Deployment script and documentation in place
- ✅ All worksheet generators working
- ✅ Content manager v2 fully operational

---

## 📦 Backup Contents

### 1. Git Tag: `v1.0.3-GOLDEN`
- **Purpose:** Marks the exact code state in git history
- **Location:** Local git repository at `/opt/lessoncraftstudio/.git`
- **Verification:** `cd /opt/lessoncraftstudio && git tag | grep v1.0.3-GOLDEN`

### 2. Database Backup
- **File:** `/opt/lessoncraftstudio/backups/GOLDEN_BACKUP_v1.0.3/database_GOLDEN_2025-10-12.backup`
- **Format:** PostgreSQL custom format (compressed, complete)
- **Database:** `lessoncraftstudio_prod`
- **Includes:** All tables, blog posts, sequences, constraints, indexes

### 3. Public Files Backup
- **File:** `/opt/lessoncraftstudio/backups/GOLDEN_BACKUP_v1.0.3/public_files_GOLDEN_2025-10-12.tar.gz`
- **Contents:**
  - `public/uploads/` - User uploaded files
  - `public/worksheet-samples/` - Worksheet sample PDFs
  - `public/images/` - Image library (borders, backgrounds, themes, train-templates, worksheet-templates)
  - `public/worksheet-images/` - Worksheet-specific images
  - `public/blog/` - Blog images, PDFs, and thumbnails
  - `public/worksheet-generators/` - HTML worksheet generator files (including blog-content-manager.html)
  - `public/data/` - Blog categories JSON file

---

## 🚨 WHEN TO USE THIS BACKUP

Use the golden backup when:
1. New features break the website
2. Database becomes corrupted
3. Critical files are accidentally deleted
4. Need to rollback to a known-good state
5. Deployment goes wrong and website is broken
6. Blog system stops working

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
ls -lh /opt/lessoncraftstudio/frontend/public/images/
ls -lh /opt/lessoncraftstudio/frontend/public/blog/
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
git checkout v1.0.3-GOLDEN

# Verify we're on the right version
git describe --tags
# Should output: v1.0.3-GOLDEN
```

### Step 4: Restore Database (if needed)

**⚠️ WARNING:** This will COMPLETELY REPLACE your current database!

```bash
# 1. Drop and recreate the database
PGPASSWORD=LcS2025SecureDBPass dropdb -U lcs_user lessoncraftstudio_prod
PGPASSWORD=LcS2025SecureDBPass createdb -U lcs_user lessoncraftstudio_prod

# 2. Restore from backup
PGPASSWORD=LcS2025SecureDBPass pg_restore -U lcs_user -d lessoncraftstudio_prod -v /opt/lessoncraftstudio/backups/GOLDEN_BACKUP_v1.0.3/database_GOLDEN_2025-10-12.backup

# 3. Verify restoration
PGPASSWORD=LcS2025SecureDBPass psql -U lcs_user -d lessoncraftstudio_prod -c "SELECT COUNT(*) FROM image_library_items;"
PGPASSWORD=LcS2025SecureDBPass psql -U lcs_user -d lessoncraftstudio_prod -c "SELECT COUNT(*) FROM blog_posts;"
```

### Step 5: Restore Public Files (if needed)

**⚠️ WARNING:** This will OVERWRITE your current public files!

```bash
cd /opt/lessoncraftstudio/frontend

# 1. Backup current public directory (just in case)
mv public public.backup-$(date +%Y%m%d-%H%M%S)

# 2. Extract golden backup
tar -xzf /opt/lessoncraftstudio/backups/GOLDEN_BACKUP_v1.0.3/public_files_GOLDEN_2025-10-12.tar.gz

# 3. Verify extraction
ls -lh public/images/
ls -lh public/blog/
ls -lh public/worksheet-generators/
ls -lh public/data/blog-categories.json
```

### Step 6: Rebuild and Deploy

```bash
cd /opt/lessoncraftstudio/frontend

# Install dependencies (in case package.json changed)
npm install

# Run the deployment script (includes build + static file copy)
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

# 3. Check CSS/JS are loading
curl -s http://localhost:3000 | grep -E '<link|<script' | head -5

# 4. Check database connection
PGPASSWORD=LcS2025SecureDBPass psql -U lcs_user -d lessoncraftstudio_prod -c "SELECT COUNT(*) FROM image_themes;"

# 5. Check blog posts
PGPASSWORD=LcS2025SecureDBPass psql -U lcs_user -d lessoncraftstudio_prod -c "SELECT slug, status FROM blog_posts LIMIT 3;"

# 6. Check blog categories API
curl -s http://localhost:3000/api/blog/categories?locale=en | head -100
```

### Step 8: Verify Website Functionality

Open the website and test:
1. ✅ Homepage loads with CSS/JavaScript
2. ✅ Login works
3. ✅ Content manager loads
4. ✅ Image library shows images
5. ✅ Can add/edit/delete images
6. ✅ Worksheet generators work
7. ✅ Blog listing page shows posts
8. ✅ Blog content manager loads with authentication
9. ✅ Can create/edit blog posts
10. ✅ SEO metadata appears on blog posts
11. ✅ Translations display correctly

---

## 🎯 QUICK RECOVERY COMMANDS (Copy-Paste)

### Full System Recovery (Code + Database + Files)

```bash
# Stop application
pm2 stop lessoncraftstudio

# Restore code
cd /opt/lessoncraftstudio
git checkout v1.0.3-GOLDEN

# Restore database
PGPASSWORD=LcS2025SecureDBPass dropdb -U lcs_user lessoncraftstudio_prod
PGPASSWORD=LcS2025SecureDBPass createdb -U lcs_user lessoncraftstudio_prod
PGPASSWORD=LcS2025SecureDBPass pg_restore -U lcs_user -d lessoncraftstudio_prod -v /opt/lessoncraftstudio/backups/GOLDEN_BACKUP_v1.0.3/database_GOLDEN_2025-10-12.backup

# Restore files
cd /opt/lessoncraftstudio/frontend
mv public public.backup-$(date +%Y%m%d-%H%M%S)
tar -xzf /opt/lessoncraftstudio/backups/GOLDEN_BACKUP_v1.0.3/public_files_GOLDEN_2025-10-12.tar.gz

# Rebuild and restart
cd /opt/lessoncraftstudio
bash deploy.sh
```

### Code-Only Recovery (Fastest)

```bash
cd /opt/lessoncraftstudio
pm2 stop lessoncraftstudio
git checkout v1.0.3-GOLDEN
bash deploy.sh
```

### Database-Only Recovery

```bash
PGPASSWORD=LcS2025SecureDBPass dropdb -U lcs_user lessoncraftstudio_prod
PGPASSWORD=LcS2025SecureDBPass createdb -U lcs_user lessoncraftstudio_prod
PGPASSWORD=LcS2025SecureDBPass pg_restore -U lcs_user -d lessoncraftstudio_prod -v /opt/lessoncraftstudio/backups/GOLDEN_BACKUP_v1.0.3/database_GOLDEN_2025-10-12.backup
pm2 restart lessoncraftstudio
```

### Files-Only Recovery

```bash
cd /opt/lessoncraftstudio/frontend
mv public public.backup-$(date +%Y%m%d-%H%M%S)
tar -xzf /opt/lessoncraftstudio/backups/GOLDEN_BACKUP_v1.0.3/public_files_GOLDEN_2025-10-12.tar.gz
cd /opt/lessoncraftstudio
bash deploy.sh
```

---

## 🔍 VERIFICATION CHECKLIST

After recovery, verify:

- [ ] PM2 shows application as "online"
- [ ] Website loads at http://localhost:3000
- [ ] CSS and JavaScript are working
- [ ] Homepage displays correctly
- [ ] Login works
- [ ] Content Manager v2 loads
- [ ] Image library shows themes and images
- [ ] Can delete images (they stay deleted after "Save All Changes")
- [ ] Blog listing page shows posts
- [ ] Blog content manager loads with login overlay
- [ ] Can authenticate to blog content manager
- [ ] Blog categories load without errors
- [ ] SEO metadata appears on blog posts (meta tags, Open Graph, Schema.org)
- [ ] Translations work correctly
- [ ] Worksheet generators load
- [ ] Database queries work: `PGPASSWORD=LcS2025SecureDBPass psql -U lcs_user -d lessoncraftstudio_prod -c "SELECT COUNT(*) FROM image_library_items;"`

---

## 📍 BACKUP LOCATION SUMMARY

**Primary Backup Directory:**
```
/opt/lessoncraftstudio/backups/GOLDEN_BACKUP_v1.0.3/
```

**Backup Files:**
1. `database_GOLDEN_2025-10-12.backup` (PostgreSQL dump with blog posts)
2. `public_files_GOLDEN_2025-10-12.tar.gz` (Compressed public files including blog data)

**Git Tag:**
```bash
cd /opt/lessoncraftstudio && git show v1.0.3-GOLDEN
```

**Recovery Documentation:**
- This file: `/opt/lessoncraftstudio/GOLDEN_RECOVERY.md`
- Deployment guide: `/opt/lessoncraftstudio/DEPLOYMENT.md`
- Deployment script: `/opt/lessoncraftstudio/deploy.sh`

---

## 🛡️ PROTECTION MEASURES

To prevent accidentally overwriting this backup:

```bash
# Make backup directory read-only
chmod -R 555 /opt/lessoncraftstudio/backups/GOLDEN_BACKUP_v1.0.3/

# To restore write access (if needed for deletion):
# chmod -R 755 /opt/lessoncraftstudio/backups/GOLDEN_BACKUP_v1.0.3/
```

---

## 💡 IMPORTANT NOTES

1. **Git Tag is Immutable:** The `v1.0.3-GOLDEN` tag will always point to this exact code state
2. **Backup is Complete:** Includes EVERYTHING needed to restore to this exact state
3. **Database Password:** Always in environment or use `PGPASSWORD=LcS2025SecureDBPass`
4. **Standalone Mode:** Remember to copy static files after build (handled by deploy.sh)
5. **Multiple Backups:** Keep this backup, create new ones for future stable versions
6. **Blog Categories:** The blog-categories.json file is essential for blog page to work
7. **Authentication:** Blog content manager requires proper authentication with accessToken

---

## 🚀 FUTURE GOLDEN BACKUPS

When creating new golden backups:

1. Choose a new version number (e.g., v1.0.4-GOLDEN, v1.1.0-GOLDEN)
2. Create new directory: `/opt/lessoncraftstudio/backups/GOLDEN_BACKUP_v1.0.4/`
3. Follow same backup procedure
4. Update this document for the new location
5. **Keep old backups!** Don't delete previous golden backups (v1.0.2, v1.0.3, etc.)

---

## 📞 EMERGENCY CONTACT

If recovery fails or you need help:

1. Check `/opt/lessoncraftstudio/DEPLOYMENT.md` for deployment issues
2. Check PM2 logs: `pm2 logs lessoncraftstudio`
3. Check application logs: `cd /opt/lessoncraftstudio/frontend && tail -100 .next/standalone/output.log`
4. Check database connection: `PGPASSWORD=LcS2025SecureDBPass psql -U lcs_user -d lessoncraftstudio_prod`
5. Check blog categories file: `cat /opt/lessoncraftstudio/frontend/.next/standalone/public/data/blog-categories.json`

---

## 🆕 CHANGES IN v1.0.3 (from v1.0.2)

**New Features:**
- ✅ Blog content manager now has full authentication system (login overlay, device ID, token management)
- ✅ All hardcoded 'Bearer dev-bypass' tokens removed from blog-content-manager
- ✅ Blog categories API fixed (blog-categories.json with proper format)
- ✅ Blog listing page now displays posts correctly
- ✅ SEO automation verified and working (real-time scoring, previews, Schema.org generation)

**Previous Golden Backups:**
- **v1.0.2-GOLDEN**: `/opt/lessoncraftstudio/backups/GOLDEN_BACKUP_v1.0.2/` (October 12, 2025)

---

**Last Updated:** October 12, 2025 (Evening)
**Version:** 1.0.3-GOLDEN
**Status:** STABLE - PRODUCTION READY - INCLUDES BLOG SYSTEM
