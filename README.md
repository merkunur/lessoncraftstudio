# LessonCraft Studio

An educational worksheet generation platform with Next.js, Tailwind CSS, and PostgreSQL.

---

## 🚨 CRITICAL: Emergency Recovery Information

**⚠️ IF ANYTHING BREAKS, READ THIS FIRST:** [CRITICAL_RECOVERY.md](./CRITICAL_RECOVERY.md)

This file contains the complete recovery procedure for the GOLDEN backup version.

- **🏆 GOLDEN VERSION**: v1.0.2-stable-2025-10-12
- **Last Verified**: October 12, 2025 12:09 UTC ✅
- **Git Tag**: `v1.0.2-stable-2025-10-12` (NEVER delete this tag)
- **Backups Location**: `/opt/lessoncraftstudio/backups/GOLDEN_v1.0.2/`

**What's backed up:**
- ✅ Full source code (Git tag)
- ✅ Complete database (858KB, 60 tables)
- ✅ All public files (136MB, 1,581 files)
- ✅ All critical bug fixes included
- ✅ Verified working configuration

---

## 🎯 Quick Start

### Development
```bash
cd frontend
npm install
npm run dev
```

### Production Deployment
```bash
cd frontend
npm run build

# CRITICAL: After build, ALWAYS run:
cp -r .next/static .next/standalone/.next/static
cp -r public .next/standalone/public

# Then restart
pm2 restart lessoncraftstudio
```

---

## 📚 Documentation

- [CRITICAL_RECOVERY.md](./CRITICAL_RECOVERY.md) - **Most important file**
- [BACKUP_RESTORE.md](./BACKUP_RESTORE.md) - Backup procedures
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Deployment guide (if exists)

---

## 🛡️ What's Working in GOLDEN Version (v1.0.2)

- ✅ Content Manager fully functional (loads, edits, saves)
- ✅ Content Manager edit buttons work correctly
- ✅ Content Manager save button works correctly
- ✅ Prepositions app loads whiteboard template by default
- ✅ Frontend CSS/JavaScript working perfectly
- ✅ All 33 worksheet generators functional
- ✅ Multi-language support (11 languages)
- ✅ User authentication and subscriptions
- ✅ Payment integration with Stripe
- ✅ Blog system fully functional
- ✅ Database with 149 images
- ✅ All API endpoints working

---

## ⚠️ Critical Knowledge

### After Every Build:
Next.js standalone builds require manual copying of static assets:
```bash
cp -r .next/static .next/standalone/.next/static
cp -r public .next/standalone/public
```

**Why**: Without this, CSS/JS won't load. This is not a bug, it's how Next.js standalone works.

### Never Delete:
- 🏆 Git tag: `v1.0.2-stable-2025-10-12` (GOLDEN BACKUP)
- 🏆 Backup folder: `/opt/lessoncraftstudio/backups/GOLDEN_v1.0.2/`
- File: `CRITICAL_RECOVERY.md`
- File: `README.md` (this file)

---

## 📞 Support

For emergency recovery, see [CRITICAL_RECOVERY.md](./CRITICAL_RECOVERY.md)

**Production Server**: 65.108.5.250
**Database**: lessoncraftstudio_prod
**PM2 Process**: lessoncraftstudio

---

## 🔧 Tech Stack

- **Framework**: Next.js 14.2.18
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Styling**: Tailwind CSS
- **Process Manager**: PM2
- **Languages**: TypeScript, JavaScript
- **Multi-language**: 11 languages supported

---

**Last Updated**: October 12, 2025 12:09 UTC
**🏆 GOLDEN VERSION**: v1.0.2-stable-2025-10-12
**Status**: ✅ Fully Tested and Verified
