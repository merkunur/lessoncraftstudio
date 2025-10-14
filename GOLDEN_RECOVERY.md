# GOLDEN BACKUP v1.0.7 - DISASTER RECOVERY GUIDE

## 🔒 CRITICAL INFORMATION - ENGRAVE THIS INTO MEMORY

**Golden Backup Location:** `/opt/lessoncraftstudio/backups/GOLDEN_BACKUP_v1.0.7/`

**Git Commit:** `f80263839d7f3e2a050193297156a679a9647617`

**Git Tag:** `v1.0.7-GOLDEN`

**Date Created:** October 14, 2025

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
- ✅ Admin user control with refund functionality (Credit Notes API)
- ✅ Account reactivation for suspended users
- ✅ Apps tier-based access control properly working
- ✅ Auth context properly merging subscription data
- ✅ Apps page differentiates between unauthenticated users and users with insufficient tier
- ✅ Sign-in required message for guests trying to access apps
- ✅ Multi-language support for sign-in messages (11 languages)
- ✅ Print Regular lowercase letters with consistent stroke thickness
- ✅ Transparent background and proper viewBox padding for Print Regular lowercase SVG letters
- ✅ Inner counters preserved in letters with holes (a, b, d, e, g, o, p, q)
- ✅ Cursive lowercase beginning letters height increased by 12%
- ✅ Cursive custom text moved downward by 12%
- ✅ All cursive uppercase letters height decreased by 7%
- ✅ **NEW:** Working email notification system with Resend SMTP
- ✅ **NEW:** Support ticket response emails sent to users
- ✅ **NEW:** Email configuration with verified domain (onboarding@resend.dev)
- ✅ **NEW:** Support ticket delete functionality (UI + Database)
- ✅ **NEW:** Confirmation dialog for ticket deletion
- ✅ **NEW:** Toast notifications for delete operations

---

## 📦 Backup Contents

### 1. Git Tag: `v1.0.7-GOLDEN`
- **Purpose:** Marks the exact code state in git history
- **Commit Hash:** `f80263839d7f3e2a050193297156a679a9647617`
- **Location:** Local git repository at `/opt/lessoncraftstudio/.git`
- **Verification:** `cd /opt/lessoncraftstudio && git tag | grep v1.0.7-GOLDEN`

### 2. Database Backup
- **File:** `/opt/lessoncraftstudio/backups/GOLDEN_BACKUP_v1.0.7/database_GOLDEN_2025-10-14.backup`
- **Size:** 955 KB
- **Format:** PostgreSQL custom format (compressed, complete)
- **Database:** `lessoncraftstudio_prod`
- **Includes:** All tables, users, subscriptions, payments, blog posts, support tickets, sequences, constraints, indexes

### 3. Public Files Backup
- **File:** `/opt/lessoncraftstudio/backups/GOLDEN_BACKUP_v1.0.7/public_files_GOLDEN_2025-10-14.tar.gz`
- **Size:** 151 MB
- **Contents:**
  - `public/uploads/` - User uploaded files
  - `public/worksheet-samples/` - Worksheet sample PDFs
  - `public/images/` - Image library (borders, backgrounds, themes, train-templates, worksheet-templates)
  - `public/images/alphabetsvg/print/regular/lowercase/` - Fixed SVG letters with transparent backgrounds and proper counters
  - `public/worksheet-images/` - Worksheet-specific images
  - `public/blog/` - Blog images, PDFs, and thumbnails
  - `public/worksheet-generators/` - HTML worksheet generator files (including updated writing.html with cursive adjustments)
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
7. Payment/refund system breaks
8. User authentication issues occur
9. Apps access control fails
10. Sign-in/authentication flow is broken
11. Writing worksheet generator stops working properly
12. SVG letters display incorrectly
13. Email notification system fails
14. Support ticket system stops working

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
ls -lh /opt/lessoncraftstudio/frontend/public/images/alphabetsvg/print/regular/lowercase/

# Check email configuration
cd /opt/lessoncraftstudio/frontend && grep -E '^(EMAIL_|SMTP_)' .env.production | grep -v PASSWORD
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
git checkout v1.0.7-GOLDEN

# Verify we're on the right version
git describe --tags
# Should output: v1.0.7-GOLDEN

# If tag doesn't exist, checkout by commit hash
git checkout f80263839d7f3e2a050193297156a679a9647617
```

### Step 4: Restore Database (if needed)

**⚠️ WARNING:** This will COMPLETELY REPLACE your current database!

```bash
# 1. Drop and recreate the database
PGPASSWORD=LcS2025SecureDBPass dropdb -U lcs_user lessoncraftstudio_prod
PGPASSWORD=LcS2025SecureDBPass createdb -U lcs_user lessoncraftstudio_prod

# 2. Restore from backup
PGPASSWORD=LcS2025SecureDBPass pg_restore -U lcs_user -d lessoncraftstudio_prod -v /opt/lessoncraftstudio/backups/GOLDEN_BACKUP_v1.0.7/database_GOLDEN_2025-10-14.backup

# 3. Verify restoration
PGPASSWORD=LcS2025SecureDBPass psql -U lcs_user -d lessoncraftstudio_prod -c "SELECT COUNT(*) FROM image_library_items;"
PGPASSWORD=LcS2025SecureDBPass psql -U lcs_user -d lessoncraftstudio_prod -c "SELECT COUNT(*) FROM blog_posts;"
PGPASSWORD=LcS2025SecureDBPass psql -U lcs_user -d lessoncraftstudio_prod -c "SELECT COUNT(*) FROM payments;"
PGPASSWORD=LcS2025SecureDBPass psql -U lcs_user -d lessoncraftstudio_prod -c "SELECT COUNT(*) FROM subscriptions;"
PGPASSWORD=LcS2025SecureDBPass psql -U lcs_user -d lessoncraftstudio_prod -c "SELECT COUNT(*) FROM support_tickets;"
```

### Step 5: Restore Public Files (if needed)

**⚠️ WARNING:** This will OVERWRITE your current public files!

```bash
cd /opt/lessoncraftstudio/frontend

# 1. Backup current public directory (just in case)
mv public public.backup-$(date +%Y%m%d-%H%M%S)

# 2. Extract golden backup
tar -xzf /opt/lessoncraftstudio/backups/GOLDEN_BACKUP_v1.0.7/public_files_GOLDEN_2025-10-14.tar.gz

# 3. Verify extraction
ls -lh public/images/
ls -lh public/blog/
ls -lh public/worksheet-generators/
ls -lh public/images/alphabetsvg/print/regular/lowercase/
ls -lh public/data/blog-categories.json
```

### Step 6: Restore Environment Variables (if needed)

**⚠️ IMPORTANT:** Email system requires correct environment variables!

```bash
cd /opt/lessoncraftstudio/frontend

# Verify email configuration in .env.production
grep -E '^(EMAIL_|SMTP_)' .env.production

# Should include:
# EMAIL_PROVIDER=smtp
# SMTP_FROM_EMAIL=onboarding@resend.dev
# SMTP_FROM_NAME=LessonCraft Studio
# SMTP_HOST=smtp.resend.com
# SMTP_PORT=587
# SMTP_SECURE=false
# SMTP_USER=resend
# SMTP_PASSWORD=re_QDW...HNvB (your actual API key)
# EMAIL_FROM=onboarding@resend.dev
# EMAIL_REPLY_TO=support@lessoncraftstudio.com
```

### Step 7: Rebuild and Deploy

```bash
cd /opt/lessoncraftstudio/frontend

# Install dependencies (in case package.json changed)
npm install

# Run the deployment script (includes build + static file copy)
cd /opt/lessoncraftstudio
bash deploy.sh
```

### Step 8: Verify Recovery

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

# 7. Check payments and subscriptions
PGPASSWORD=LcS2025SecureDBPass psql -U lcs_user -d lessoncraftstudio_prod -c "SELECT status, COUNT(*) FROM payments GROUP BY status;"

# 8. Check support tickets
PGPASSWORD=LcS2025SecureDBPass psql -U lcs_user -d lessoncraftstudio_prod -c "SELECT COUNT(*) FROM support_tickets;"

# 9. Check email configuration
pm2 logs lessoncraftstudio --lines 30 | grep -i "email\|smtp"
```

### Step 9: Verify Website Functionality

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
12. ✅ Admin user control panel works
13. ✅ Payment refund functionality works
14. ✅ Account reactivation works for suspended users
15. ✅ Apps page respects tier-based access control
16. ✅ Unauthenticated users see "Sign In Required" message
17. ✅ Authenticated users with insufficient tier see "Upgrade Required"
18. ✅ Writing worksheet generator displays correctly
19. ✅ Print Regular lowercase letters display with transparent backgrounds
20. ✅ Cursive letters have correct height adjustments
21. ✅ Support tickets can be created, viewed, responded to, and deleted
22. ✅ Email notifications are sent when tickets are responded to
23. ✅ Admin can delete support tickets from dashboard

---

## 🎯 QUICK RECOVERY COMMANDS (Copy-Paste)

### Full System Recovery (Code + Database + Files)

```bash
# Stop application
pm2 stop lessoncraftstudio

# Restore code
cd /opt/lessoncraftstudio
git checkout v1.0.7-GOLDEN

# Restore database
PGPASSWORD=LcS2025SecureDBPass dropdb -U lcs_user lessoncraftstudio_prod
PGPASSWORD=LcS2025SecureDBPass createdb -U lcs_user lessoncraftstudio_prod
PGPASSWORD=LcS2025SecureDBPass pg_restore -U lcs_user -d lessoncraftstudio_prod -v /opt/lessoncraftstudio/backups/GOLDEN_BACKUP_v1.0.7/database_GOLDEN_2025-10-14.backup

# Restore files
cd /opt/lessoncraftstudio/frontend
mv public public.backup-$(date +%Y%m%d-%H%M%S)
tar -xzf /opt/lessoncraftstudio/backups/GOLDEN_BACKUP_v1.0.7/public_files_GOLDEN_2025-10-14.tar.gz

# Rebuild and restart
cd /opt/lessoncraftstudio
bash deploy.sh
```

### Code-Only Recovery (Fastest)

```bash
cd /opt/lessoncraftstudio
pm2 stop lessoncraftstudio
git checkout v1.0.7-GOLDEN
bash deploy.sh
```

### Database-Only Recovery

```bash
PGPASSWORD=LcS2025SecureDBPass dropdb -U lcs_user lessoncraftstudio_prod
PGPASSWORD=LcS2025SecureDBPass createdb -U lcs_user lessoncraftstudio_prod
PGPASSWORD=LcS2025SecureDBPass pg_restore -U lcs_user -d lessoncraftstudio_prod -v /opt/lessoncraftstudio/backups/GOLDEN_BACKUP_v1.0.7/database_GOLDEN_2025-10-14.backup
pm2 restart lessoncraftstudio
```

### Files-Only Recovery

```bash
cd /opt/lessoncraftstudio/frontend
mv public public.backup-$(date +%Y%m%d-%H%M%S)
tar -xzf /opt/lessoncraftstudio/backups/GOLDEN_BACKUP_v1.0.7/public_files_GOLDEN_2025-10-14.tar.gz
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
- [ ] Writing worksheet generator displays correctly
- [ ] Print Regular lowercase letters have transparent backgrounds
- [ ] Letters with holes (a, b, d, e, g, o, p, q) display properly
- [ ] Cursive lowercase beginning letters have correct height
- [ ] Cursive custom text positioned correctly
- [ ] Cursive uppercase letters have correct height reduction
- [ ] Admin user control panel accessible
- [ ] Payment refund functionality works (including Credit Notes)
- [ ] Account reactivation button appears for suspended users
- [ ] Apps page shows correct tier-based access
- [ ] Unauthenticated users see "Sign In Required" on apps
- [ ] Authenticated users with insufficient tier see "Upgrade Required"
- [ ] User subscription tier displayed correctly after admin upgrade
- [ ] Support tickets page loads in admin dashboard
- [ ] Can view, respond to, and delete support tickets
- [ ] Email notifications are sent for ticket responses (check logs)
- [ ] Email configuration shows "smtp" mode (not "console")
- [ ] Database queries work: `PGPASSWORD=LcS2025SecureDBPass psql -U lcs_user -d lessoncraftstudio_prod -c "SELECT COUNT(*) FROM image_library_items;"`

---

## 📍 BACKUP LOCATION SUMMARY

**Primary Backup Directory:**
```
/opt/lessoncraftstudio/backups/GOLDEN_BACKUP_v1.0.7/
```

**Backup Files:**
1. `database_GOLDEN_2025-10-14.backup` (PostgreSQL dump - 955 KB)
2. `public_files_GOLDEN_2025-10-14.tar.gz` (Compressed public files - 151 MB)

**Git Tag:**
```bash
cd /opt/lessoncraftstudio && git show v1.0.7-GOLDEN
```

**Git Commit:**
```bash
cd /opt/lessoncraftstudio && git show f80263839d7f3e2a050193297156a679a9647617
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
chmod -R 555 /opt/lessoncraftstudio/backups/GOLDEN_BACKUP_v1.0.7/

# To restore write access (if needed for deletion):
# chmod -R 755 /opt/lessoncraftstudio/backups/GOLDEN_BACKUP_v1.0.7/
```

---

## 💡 IMPORTANT NOTES

1. **Git Tag is Immutable:** The `v1.0.7-GOLDEN` tag will always point to this exact code state
2. **Backup is Complete:** Includes EVERYTHING needed to restore to this exact state
3. **Database Password:** Always in environment or use `PGPASSWORD=LcS2025SecureDBPass`
4. **Standalone Mode:** Remember to copy static files after build (handled by deploy.sh)
5. **Multiple Backups:** Keep this backup, create new ones for future stable versions
6. **Blog Categories:** The blog-categories.json file is essential for blog page to work
7. **Authentication:** Blog content manager requires proper authentication with accessToken
8. **Payment System:** Stripe Credit Notes API is used for refunding invoices without charges
9. **Subscription Data:** Auth context properly merges subscription data into user object
10. **Messages Directory:** Must be copied to standalone directory for i18n to work
11. **Apps Access Control:** Now properly differentiates between guests and authenticated users
12. **SVG Files:** Print Regular lowercase letters have transparent backgrounds with proper viewBox padding
13. **Inner Counters:** Letters with holes (a, b, d, e, g, o, p, q) have white fill for inner counters
14. **Cursive Adjustments:** Multiple height and position adjustments applied to cursive fonts
15. **Email System:** Uses Resend SMTP with verified domain (onboarding@resend.dev)
16. **Email Environment:** EMAIL_PROVIDER must be "smtp" in .env.production (not "console")
17. **Next.js Standalone:** Environment variables are baked at build time - rebuild after changes
18. **Support Tickets:** Includes complete CRUD functionality with email notifications

---

## 🚀 FUTURE GOLDEN BACKUPS

When creating new golden backups:

1. Choose a new version number (e.g., v1.0.8-GOLDEN, v1.1.0-GOLDEN)
2. Create new directory: `/opt/lessoncraftstudio/backups/GOLDEN_BACKUP_v1.0.8/`
3. Follow same backup procedure
4. Update this document for the new location
5. **Keep old backups!** Don't delete previous golden backups (v1.0.3, v1.0.4, v1.0.5, v1.0.6, v1.0.7, etc.)

---

## 📞 EMERGENCY CONTACT

If recovery fails or you need help:

1. Check `/opt/lessoncraftstudio/DEPLOYMENT.md` for deployment issues
2. Check PM2 logs: `pm2 logs lessoncraftstudio`
3. Check application logs: `cd /opt/lessoncraftstudio/frontend && tail -100 .next/standalone/output.log`
4. Check database connection: `PGPASSWORD=LcS2025SecureDBPass psql -U lcs_user -d lessoncraftstudio_prod`
5. Check blog categories file: `cat /opt/lessoncraftstudio/frontend/.next/standalone/public/data/blog-categories.json`
6. Check messages directory: `ls -lh /opt/lessoncraftstudio/frontend/.next/standalone/messages/`
7. Check SVG files: `ls -lh /opt/lessoncraftstudio/frontend/.next/standalone/public/images/alphabetsvg/print/regular/lowercase/`
8. Check email configuration: `grep -E '^(EMAIL_|SMTP_)' /opt/lessoncraftstudio/frontend/.env.production`
9. Check PM2 environment: `pm2 show lessoncraftstudio`

---

## 🆕 CHANGES IN v1.0.7 (from v1.0.6)

**New Features:**
- ✅ **Email Notification System with Resend SMTP**:
  - Configured EMAIL_PROVIDER to use "smtp" instead of "console"
  - Fixed duplicate EMAIL_PROVIDER entries in .env files
  - Updated .env.production to take precedence with correct values
  - Changed SMTP_FROM_EMAIL to verified domain (onboarding@resend.dev)
  - Email system now sends actual emails via Resend SMTP transporter
  - Support ticket responses trigger automatic email notifications
  - Beautiful HTML email templates with inline CSS styling
  - Plain text fallback for email clients that don't support HTML

- ✅ **Support Ticket Delete Functionality**:
  - Added "Delete Ticket" button to admin support tickets dashboard
  - Confirmation dialog to prevent accidental deletions
  - DELETE API endpoint removes tickets from PostgreSQL database
  - UI updates immediately after successful deletion
  - Toast notifications for user feedback
  - Loading states during delete operation
  - Proper error handling with user-friendly messages

**Technical Improvements:**
- Fixed Next.js standalone build environment variable handling
- Proper .env.production configuration for production deployments
- Email configuration debugging with console logging
- PM2 process restart with environment variable updates
- Database table name case sensitivity handling (support_tickets vs SupportTicket)
- Support ticket API includes user relationship data
- Email HTML templates with responsive design and branding

**Bug Fixes:**
- Fixed EMAIL_PROVIDER defaulting to 'console' mode in production
- Fixed domain verification error by using Resend verified domain
- Fixed multiple duplicate EMAIL_PROVIDER entries in .env
- Fixed .env.production overriding .env with incorrect values
- Fixed Next.js not picking up environment variable changes (required rebuild)

**Previous Golden Backups:**
- **v1.0.6-GOLDEN**: `/opt/lessoncraftstudio/backups/GOLDEN_BACKUP_v1.0.6/` (October 14, 2025)
- **v1.0.5-GOLDEN**: `/opt/lessoncraftstudio/backups/GOLDEN_BACKUP_v1.0.5/` (October 14, 2025)
- **v1.0.4-GOLDEN**: `/opt/lessoncraftstudio/backups/GOLDEN_BACKUP_v1.0.4/` (October 13, 2025)
- **v1.0.3-GOLDEN**: `/opt/lessoncraftstudio/backups/GOLDEN_BACKUP_v1.0.3/` (October 12, 2025)
- **v1.0.2-GOLDEN**: `/opt/lessoncraftstudio/backups/GOLDEN_BACKUP_v1.0.2/` (October 12, 2025)

---

**Last Updated:** October 14, 2025
**Version:** 1.0.7-GOLDEN
**Commit:** f80263839d7f3e2a050193297156a679a9647617
**Status:** STABLE - PRODUCTION READY - INCLUDES EMAIL SYSTEM AND SUPPORT TICKET MANAGEMENT
