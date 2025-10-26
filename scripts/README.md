# Deployment Protection Scripts

This directory contains technical prevention scripts that make translation overwrites **technically impossible**.

Created: 2025-10-26
Purpose: Prevent future translation file overwrite disasters

---

## 📜 Scripts

### 1. `validate-deployment.sh`

**Purpose:** Validates deployment commands before execution to block dangerous operations.

**What it does:**
- Blocks commands containing `cp -r public` (dangerous!)
- Blocks commands copying from git instead of REFERENCE folders
- Provides safe alternatives when blocking a command

**How to use:**

```bash
# Validate a command before running it
./scripts/validate-deployment.sh cp -r public .next/standalone/public
# OUTPUT: ❌ BLOCKED: Dangerous command detected!

# It will pass safe commands
./scripts/validate-deployment.sh cp -r .next/static .next/standalone/.next/static
# OUTPUT: ✅ Command validation passed
```

**Integration (recommended):**

Add to your shell profile (`~/.bashrc` or `~/.zshrc`):

```bash
# Deployment command validator
deploy() {
    ./scripts/validate-deployment.sh "$@"
    if [ $? -eq 0 ]; then
        eval "$@"
    fi
}
```

Then use: `deploy plink "cd /opt/lessoncraftstudio && ..."`

---

### 2. `.git/hooks/pre-commit`

**Purpose:** Git pre-commit hook that prevents committing files that belong in REFERENCE folders.

**What it does:**
- Blocks commits containing `translations-*.js` files
- Blocks commits containing worksheet generator `.html` files
- Blocks commits containing content manager files
- Provides instructions to copy files to REFERENCE folders instead

**How to use:**

Automatic! Just try to commit a translation file:

```bash
git add frontend/public/worksheet-generators/js/translations-writing.js
git commit -m "Update translations"

# OUTPUT:
# ❌ COMMIT BLOCKED: Translation files detected!
# The following translation files are staged for commit:
#   - frontend/public/worksheet-generators/js/translations-writing.js
#
# ✅ CORRECT WORKFLOW:
# 1. Unstage these files:
#    git reset HEAD frontend/public/worksheet-generators/js/translations-*.js
# 2. Copy them to REFERENCE TRANSLATIONS folder:
#    cp frontend/public/worksheet-generators/js/translations-*.js "REFERENCE TRANSLATIONS/"
```

**To bypass (emergencies only):**

```bash
git commit -m "Message" --no-verify
```

**WARNING:** Only bypass if you REALLY know what you're doing!

---

### 3. `protect-reference-folders.sh`

**Purpose:** Adds read-only protection to REFERENCE folders to prevent accidental modifications.

**What it does:**
- Sets read-only attribute on all files in REFERENCE folders (Windows: `attrib +R`, Unix: `chmod 555`)
- Verifies warning README files exist
- Makes it technically difficult to accidentally edit golden source files

**How to use:**

```bash
# Run once to protect all REFERENCE folders
./scripts/protect-reference-folders.sh

# OUTPUT:
# 🔒 Protecting: REFERENCE APPS
#    ✅ Read-only attribute set on all files
#    ✅ Warning README already exists
#
# 🔒 Protecting: REFERENCE TRANSLATIONS
#    ✅ Read-only attribute set on all files
#    ✅ Warning README already exists
#
# 🔒 Protecting: REFERENCE CONTENT MANAGERS
#    ✅ Read-only attribute set on all files
#    ✅ Warning README already exists
```

**To modify a protected file:**

On Windows:
```bash
attrib -R "REFERENCE APPS\addition.html"
# Make your changes
attrib +R "REFERENCE APPS\addition.html"
```

On Unix/Linux:
```bash
chmod +w "REFERENCE APPS/addition.html"
# Make your changes
chmod -w "REFERENCE APPS/addition.html"
```

**Better approach:** Follow the 6-step workflow in DEPLOYMENT.md (copy → modify → deploy → update REFERENCE).

---

### 4. `backup-translations.sh`

**Purpose:** Daily automated backups of REFERENCE TRANSLATIONS folder with 30-day retention.

**What it does:**
- Creates timestamped `.tar.gz` backup of all translation files
- Organizes backups by date (`backups/translations/YYYY-MM-DD/`)
- Maintains symlink to latest backup
- Automatically deletes backups older than 30 days
- Optional: Uploads backups to production server

**How to use:**

```bash
# Run manually
./scripts/backup-translations.sh

# OUTPUT:
# 💾 Translation Files Backup Script
# 📅 Backup Date: 2025-10-26
# ⏰ Timestamp: 2025-10-26_14-30-00
#
# 📊 Found 54 translation files to backup
# 💾 Creating backup archive...
#    ✅ Backup created: backups/translations/2025-10-26/translations-backup-2025-10-26_14-30-00.tar.gz
#    📦 Size: 892K
# ✅ Backup Complete!
```

**Set up daily automated backups:**

On Windows (Task Scheduler):
```bash
# Create scheduled task to run daily at 2 AM
schtasks /create /tn "Translation Backups" /tr "C:\Program Files\Git\bin\bash.exe C:\Users\rkgen\lessoncraftstudio\scripts\backup-translations.sh" /sc daily /st 02:00
```

On Unix/Linux (cron):
```bash
# Add to crontab: Run daily at 2 AM
0 2 * * * /path/to/lessoncraftstudio/scripts/backup-translations.sh
```

**To restore from backup:**

```bash
# Find available backups
ls -lh backups/translations/

# Restore from specific backup
tar -xzf backups/translations/2025-10-26/translations-backup-2025-10-26_14-30-00.tar.gz

# Or restore from latest backup
tar -xzf backups/translations/latest/translations-backup-*.tar.gz
```

**Enable server backups (optional):**

Edit `backup-translations.sh` and uncomment the server upload section (lines starting with `# if [ ! -z "$SERVER_HOST" ]`).

---

## 🎯 Implementation Status

- [x] `validate-deployment.sh` - Created and executable
- [x] `.git/hooks/pre-commit` - Created and executable
- [x] `protect-reference-folders.sh` - Created and executable
- [x] `backup-translations.sh` - Created and executable

**Next Steps:**

1. **Run protection script once:**
   ```bash
   ./scripts/protect-reference-folders.sh
   ```

2. **Set up daily backups** (choose one method above)

3. **Optional: Integrate validation into deployment workflow**

---

## 🔒 Defense in Depth

These scripts implement "Defense in Depth" - multiple layers of protection:

**Layer 1: Documentation** ✅
- DEPLOYMENT.md contains correct workflows
- README files in REFERENCE folders warn against direct edits

**Layer 2: Structural Organization** ✅
- REFERENCE folders separate golden source from working files
- Clear naming convention prevents confusion

**Layer 3: Technical Barriers** ✅
- Git pre-commit hook blocks wrong commits
- Validation script blocks dangerous commands
- Read-only protection makes accidental edits harder

**Layer 4: Automated Backup** ✅
- Daily backups provide 30-day recovery window
- Automatic cleanup prevents disk space issues

**Layer 5: Monitoring** (Future)
- Dashboard showing REFERENCE folder status
- Alerts when REFERENCE folders are out of date with production

---

## 📚 Related Documentation

- **Root Cause Analysis:** `TRANSLATION_OVERWRITE_ROOT_CAUSE_ANALYSIS.md`
- **Prevention Summary:** `TRANSLATION_OVERWRITE_PREVENTION_SUMMARY.md`
- **Deployment Workflows:** `DEPLOYMENT.md`

---

## ⚠️ Important Notes

- These scripts are designed for **prevention**, not cure
- If you need to modify files, follow the 6-step workflow in DEPLOYMENT.md
- Never use `--no-verify` flag on git commits unless absolutely necessary
- The scripts log their actions - check output for any warnings
- Backups are YOUR SAFETY NET - don't skip setting up daily backups!

---

**Last Updated:** 2025-10-26
**Implements Solutions From:** TRANSLATION_OVERWRITE_ROOT_CAUSE_ANALYSIS.md
**Status:** Production Ready ✅
