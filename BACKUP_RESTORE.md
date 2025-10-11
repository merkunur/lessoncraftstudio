# Backup & Restore Documentation

## Backup Information

**Backup Date**: 2025-10-12
**Version**: v1.0.0-stable-2025-10-12
**Status**: Stable Production Version

This backup was created as a safe restore point before implementing new features.

---

## What's Included in This Backup

### 1. Source Code (Git Tag)
- **Tag**: `v1.0.0-stable-2025-10-12`
- **Location**: GitHub repository
- **Commit**: Latest commit on main branch (2025-10-12)

### 2. Database Backup
- **File**: `/opt/lessoncraftstudio/backups/lessoncraftstudio_prod_2025-10-12_v1.0.0.backup`
- **Size**: 665KB
- **Format**: PostgreSQL custom format (pg_dump -F c)
- **Database**: lessoncraftstudio_prod
- **Tables**: 31 tables including:
  - Users, sessions, subscriptions, payments
  - Blog posts, categories, tags, comments
  - Homepage content
  - Image library
  - Analytics and activity logs
  - All application data

### 3. Uploaded Files & Assets
- **File**: `/opt/lessoncraftstudio/backups/public_files_2025-10-12_v1.0.0.tar.gz`
- **Size**: 132MB (compressed)
- **Contents**:
  - `/public/uploads` (1.2MB) - User uploaded files
  - `/public/worksheet-samples` (11MB) - Worksheet sample images
  - `/public/images` (79MB) - General images
  - `/public/worksheet-images` (59MB) - Worksheet generator images
  - `/public/blog/images` - Blog post images

---

## Current Production Configuration

### System Information
- **Server**: 65.108.5.250
- **App Path**: /opt/lessoncraftstudio
- **Frontend Path**: /opt/lessoncraftstudio/frontend
- **Process Manager**: PM2 (process name: lessoncraftstudio)
- **Port**: 3000
- **Node.js**: Check with `node --version` on server
- **Framework**: Next.js 14.2.18

### Database Information
- **Type**: PostgreSQL
- **Name**: lessoncraftstudio_prod
- **User**: lcs_user
- **Password**: LcS2025SecureDBPass

### Features Included in This Version
- Homepage with dynamic rendering (unstable_noStore)
- Homepage content manager v3 with Base64 to file upload conversion
- 33 worksheet generators fully functional
- Multi-language support (11 languages: en, de, fr, es, it, pt, nl, sv, da, no, fi)
- Image library with 100+ themed images
- User authentication and subscription system
- Database-driven homepage content management
- Blog system with posts, categories, and tags
- Payment integration with Stripe
- Analytics and activity logging

---

## How to Restore from This Backup

### Option 1: Full Restore (Complete Website)

#### Step 1: Restore Source Code
```bash
# On production server
cd /opt/lessoncraftstudio
git fetch --all --tags
git checkout tags/v1.0.0-stable-2025-10-12 -b restore-v1.0.0
```

#### Step 2: Restore Database
```bash
# On production server
# This will DROP the existing database and restore from backup
PGPASSWORD=LcS2025SecureDBPass pg_restore -U lcs_user -d lessoncraftstudio_prod -c -v /opt/lessoncraftstudio/backups/lessoncraftstudio_prod_2025-10-12_v1.0.0.backup

# Alternative: Create new database if needed
# createdb -U lcs_user lessoncraftstudio_prod
# PGPASSWORD=LcS2025SecureDBPass pg_restore -U lcs_user -d lessoncraftstudio_prod -v /opt/lessoncraftstudio/backups/lessoncraftstudio_prod_2025-10-12_v1.0.0.backup
```

#### Step 3: Restore Uploaded Files
```bash
# On production server
cd /opt/lessoncraftstudio/frontend

# Backup current files first (optional)
mv public/uploads public/uploads.bak
mv public/worksheet-samples public/worksheet-samples.bak
mv public/images public/images.bak
mv public/worksheet-images public/worksheet-images.bak

# Extract backup
tar -xzf /opt/lessoncraftstudio/backups/public_files_2025-10-12_v1.0.0.tar.gz
```

#### Step 4: Rebuild and Restart
```bash
# On production server
cd /opt/lessoncraftstudio/frontend
npm install
npm run build
fuser -k 3000/tcp
pm2 restart lessoncraftstudio
```

#### Step 5: Verify Restoration
```bash
# Check PM2 status
pm2 list

# Check logs
pm2 logs lessoncraftstudio --lines 50 --nostream

# Test the website
curl -I http://localhost:3000
```

### Option 2: Partial Restore (Database Only)

If you only need to restore the database:
```bash
# Stop the application
pm2 stop lessoncraftstudio

# Restore database
PGPASSWORD=LcS2025SecureDBPass pg_restore -U lcs_user -d lessoncraftstudio_prod -c -v /opt/lessoncraftstudio/backups/lessoncraftstudio_prod_2025-10-12_v1.0.0.backup

# Restart application
pm2 start lessoncraftstudio
```

### Option 3: Partial Restore (Files Only)

If you only need to restore uploaded files:
```bash
cd /opt/lessoncraftstudio/frontend
tar -xzf /opt/lessoncraftstudio/backups/public_files_2025-10-12_v1.0.0.tar.gz
# No restart needed for static files
```

### Option 4: Restore on New Server

#### Prerequisites
1. Fresh Ubuntu/Debian server
2. PostgreSQL installed
3. Node.js 18+ installed
4. PM2 installed globally (`npm install -g pm2`)
5. Git installed

#### Steps
```bash
# 1. Clone repository
git clone https://github.com/merkunur/lessoncraftstudio.git /opt/lessoncraftstudio
cd /opt/lessoncraftstudio
git checkout tags/v1.0.0-stable-2025-10-12

# 2. Create database
sudo -u postgres createuser lcs_user
sudo -u postgres createdb -O lcs_user lessoncraftstudio_prod
sudo -u postgres psql -c "ALTER USER lcs_user WITH PASSWORD 'LcS2025SecureDBPass';"

# 3. Copy backup files to server (use scp, rsync, or download)
# scp from old server to new server or upload from local machine

# 4. Restore database
PGPASSWORD=LcS2025SecureDBPass pg_restore -U lcs_user -d lessoncraftstudio_prod -v /path/to/lessoncraftstudio_prod_2025-10-12_v1.0.0.backup

# 5. Extract uploaded files
cd /opt/lessoncraftstudio/frontend
tar -xzf /path/to/public_files_2025-10-12_v1.0.0.tar.gz

# 6. Install dependencies and build
cd /opt/lessoncraftstudio/frontend
npm install
npm run build

# 7. Configure environment
cp .env.example .env.production
# Edit .env.production with production settings

# 8. Start with PM2
pm2 start npm --name "lessoncraftstudio" -- start
pm2 save
pm2 startup
```

---

## Backup File Locations

All backup files are stored on the production server:

```
/opt/lessoncraftstudio/backups/
├── lessoncraftstudio_prod_2025-10-12_v1.0.0.backup  (665KB - Database)
└── public_files_2025-10-12_v1.0.0.tar.gz            (132MB - Files)
```

**IMPORTANT**: These files are on the production server. For additional safety:
1. Download backups to your local machine
2. Upload to cloud storage (AWS S3, Google Cloud Storage, Dropbox, etc.)
3. Keep multiple copies in different locations

---

## Downloading Backups from Server

### Using PuTTY pscp (Windows)
```cmd
# Download database backup
"C:\Program Files\PuTTY\pscp.exe" -pw JfmiPF_QW4_Nhm root@65.108.5.250:/opt/lessoncraftstudio/backups/lessoncraftstudio_prod_2025-10-12_v1.0.0.backup C:\Users\YourUsername\backups\

# Download files backup
"C:\Program Files\PuTTY\pscp.exe" -pw JfmiPF_QW4_Nhm root@65.108.5.250:/opt/lessoncraftstudio/backups/public_files_2025-10-12_v1.0.0.tar.gz C:\Users\YourUsername\backups\
```

### Using scp (Linux/Mac)
```bash
# Download database backup
scp root@65.108.5.250:/opt/lessoncraftstudio/backups/lessoncraftstudio_prod_2025-10-12_v1.0.0.backup ~/backups/

# Download files backup
scp root@65.108.5.250:/opt/lessoncraftstudio/backups/public_files_2025-10-12_v1.0.0.tar.gz ~/backups/
```

---

## Testing the Backup

### Verify Database Backup
```bash
# Check backup file integrity
PGPASSWORD=LcS2025SecureDBPass pg_restore -l /opt/lessoncraftstudio/backups/lessoncraftstudio_prod_2025-10-12_v1.0.0.backup | head -20
```

### Verify Files Backup
```bash
# List contents without extracting
tar -tzf /opt/lessoncraftstudio/backups/public_files_2025-10-12_v1.0.0.tar.gz | head -20
```

---

## Automated Future Backups

To create similar backups in the future, you can use this script:

```bash
#!/bin/bash
# backup-lessoncraft.sh

DATE=$(date +%Y-%m-%d)
VERSION="manual-${DATE}"
BACKUP_DIR="/opt/lessoncraftstudio/backups"

mkdir -p ${BACKUP_DIR}

# Database backup
echo "Backing up database..."
PGPASSWORD=LcS2025SecureDBPass pg_dump -U lcs_user -d lessoncraftstudio_prod -F c -b -v -f ${BACKUP_DIR}/lessoncraftstudio_prod_${DATE}.backup

# Files backup
echo "Backing up files..."
cd /opt/lessoncraftstudio/frontend
tar -czf ${BACKUP_DIR}/public_files_${DATE}.tar.gz public/uploads public/worksheet-samples public/images public/worksheet-images public/blog/images

echo "Backup completed:"
ls -lh ${BACKUP_DIR}/*${DATE}*
```

---

## Important Notes

1. **Git Tag is Permanent**: The git tag `v1.0.0-stable-2025-10-12` is pushed to GitHub and will always be available
2. **Database Backup Format**: Using PostgreSQL custom format (-F c) which is compressed and can be selectively restored
3. **Files are Compressed**: The tar.gz file is compressed to save space (150MB → 132MB)
4. **No Passwords in Backups**: Passwords are hashed in the database, but backup files should still be kept secure
5. **Environment Variables**: .env files are NOT backed up (they contain secrets). You'll need to recreate them from .env.example
6. **Node Modules**: node_modules/ is NOT backed up (can be reinstalled with npm install)
7. **Build Files**: .next/ is NOT backed up (can be rebuilt with npm run build)

---

## Security Recommendations

1. **Encrypt Backups**: Consider encrypting backup files before storing them
2. **Access Control**: Limit access to backup files to authorized personnel only
3. **Regular Testing**: Test restore procedures regularly to ensure backups are valid
4. **Multiple Locations**: Store backups in at least 3 different locations
5. **Retention Policy**: Keep backups for at least 30 days, with weekly and monthly archives
6. **Automated Backups**: Set up automated daily/weekly backups using cron jobs
7. **Monitor Backup Size**: Track backup size over time to detect anomalies

---

## Troubleshooting

### Database Restore Fails
**Problem**: pg_restore shows errors about existing objects
**Solution**: Use the `-c` flag to drop existing objects, or create a fresh database

### Permission Errors
**Problem**: Cannot write to backup directory
**Solution**: Ensure proper ownership: `chown -R root:root /opt/lessoncraftstudio/backups`

### Large Backup Files
**Problem**: Backup files are too large
**Solution**: Use compression, exclude unnecessary files, or implement incremental backups

### Missing Files After Restore
**Problem**: Some files missing after tar extraction
**Solution**: Check tar command completed successfully, verify file paths in archive

---

## Contact & Support

For questions about this backup or restore procedures:
- Check DEPLOYMENT.md for deployment details
- Review git history for changes since this backup
- Test restore procedure in a staging environment first

**Last Updated**: 2025-10-12
**Created By**: Claude Code Assistant
**Version**: v1.0.0-stable-2025-10-12
