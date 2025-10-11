# LessonCraft Studio

An educational worksheet generation platform with Next.js, Tailwind CSS, and PostgreSQL.

---

## 🚨 CRITICAL: Emergency Recovery Information

**⚠️ IF ANYTHING BREAKS, READ THIS FIRST:** [CRITICAL_RECOVERY.md](./CRITICAL_RECOVERY.md)

This file contains the complete recovery procedure for the last known working version.

- **Stable Version**: v1.0.1-stable-2025-10-12
- **Last Verified**: October 12, 2025 ✅
- **Git Tag**: `v1.0.1-stable-2025-10-12` (NEVER delete this tag)
- **Backups Location**: `/opt/lessoncraftstudio/backups/CRITICAL_STABLE_v1.0.1/`

**What's backed up:**
- ✅ Full source code (Git tag)
- ✅ Complete database (663KB)
- ✅ All public files (148MB)
- ✅ Exact working configuration

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

## 🛡️ What's Working in Stable Version

- ✅ Content Manager loads and saves correctly
- ✅ Frontend CSS/JavaScript functional
- ✅ All 33 worksheet generators
- ✅ Multi-language support (11 languages)
- ✅ User authentication
- ✅ Payment integration
- ✅ Blog system
- ✅ Database with 149 images

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
- Git tag: `v1.0.1-stable-2025-10-12`
- Backup folder: `/opt/lessoncraftstudio/backups/CRITICAL_STABLE_v1.0.1/`
- File: `CRITICAL_RECOVERY.md`

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

**Last Updated**: October 12, 2025
**Current Version**: v1.0.1-stable-2025-10-12
