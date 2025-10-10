# Production Deployment Guide

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

## Git-Based Deployment Process (Recommended)

### Step 1: Commit and Push Changes Locally

```bash
# Add files to git
git add frontend/path/to/file.js

# Create commit with descriptive message
git commit -m "$(cat <<'EOF'
Your commit title

Detailed description of changes

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
EOF
)"

# Push to GitHub
git push
```

### Step 2: Pull Changes on Production Server

```bash
# Using plink (Windows)
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "cd /opt/lessoncraftstudio && git pull"

# If there are conflicting local changes:
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "cd /opt/lessoncraftstudio && git stash && git pull"

# If specific files need to be removed:
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "cd /opt/lessoncraftstudio && rm frontend/conflicting-file.json && git pull"
```

### Step 3: Rebuild Next.js Application (if needed)

```bash
# Rebuild the application
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "cd /opt/lessoncraftstudio/frontend && npm run build"
```

**When to rebuild**:
- Code changes in components, pages, or lib files
- Updates to configuration files (next.config.js, etc.)
- Changes to TypeScript types or interfaces
- New dependencies added

**When NOT to rebuild**:
- Only public static files changed (HTML, images)
- Database-only changes
- Environment variable changes (restart only)

### Step 4: Restart Production Server

```bash
# Kill process on port 3000 and restart PM2
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "fuser -k 3000/tcp && pm2 restart lessoncraftstudio"

# Alternative: Just restart PM2 (if no port conflict)
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "pm2 restart lessoncraftstudio"
```

### Step 5: Verify Deployment

```bash
# Check PM2 status
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "pm2 list"

# Check logs for errors
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "pm2 logs lessoncraftstudio --lines 20 --nostream"

# Verify server is responding
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "curl -s http://localhost:3000 | head -20"
```

## Database Updates

### Method 1: Run Initialization Scripts

```bash
# Example: Update homepage database
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "cd /opt/lessoncraftstudio/frontend && node deploy-homepage-updates.js"
```

### Method 2: Update API Port in Scripts

If a script uses localhost:3001 but server runs on 3000:

```bash
# Update port and run script
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "cd /opt/lessoncraftstudio/frontend && sed -i 's|http://localhost:3001|http://localhost:3000|g' deploy-script.js && node deploy-script.js"
```

### Method 3: Prisma Migrations

```bash
# Generate Prisma client
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "cd /opt/lessoncraftstudio/frontend && npx prisma generate"

# Push schema changes
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "cd /opt/lessoncraftstudio/frontend && npx prisma db push"

# Run migrations
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "cd /opt/lessoncraftstudio/frontend && npx prisma migrate deploy"
```

## Production Server Configuration

### PM2 Process Manager

**Process Name**: lessoncraftstudio
**Command**: `npm start`
**Working Directory**: /opt/lessoncraftstudio/frontend
**Port**: 3000
**Auto-restart**: Enabled

### Common PM2 Commands

```bash
# List all processes
pm2 list

# Restart process
pm2 restart lessoncraftstudio

# Stop process
pm2 stop lessoncraftstudio

# Start process
pm2 start npm --name 'lessoncraftstudio' -- start

# View logs
pm2 logs lessoncraftstudio

# View logs (last 50 lines, no streaming)
pm2 logs lessoncraftstudio --lines 50 --nostream

# Save PM2 configuration
pm2 save

# Monitor processes
pm2 monit
```

### Check Running Processes

```bash
# Check if Next.js is running
ps aux | grep -i next | grep -v grep

# Check what's listening on port 3000
netstat -tuln | grep LISTEN | grep 3000

# Alternative: check with lsof
lsof -i :3000
```

### Kill Processes on Port 3000

```bash
# Method 1: Using fuser (recommended)
fuser -k 3000/tcp

# Method 2: Using lsof and kill
lsof -ti:3000 | xargs kill -9

# Method 3: Using specific PID
kill 12345  # Replace with actual PID
```

## Direct File Modifications on Server

### Edit Files Directly

```bash
# Using sed to replace text
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "cd /opt/lessoncraftstudio/frontend && sed -i 's|OLD_TEXT|NEW_TEXT|g' path/to/file.js"

# Using nano editor (interactive)
# SSH into server first, then:
nano /opt/lessoncraftstudio/frontend/path/to/file.js
# Save: Ctrl+O, Exit: Ctrl+X

# Using vi editor
vi /opt/lessoncraftstudio/frontend/path/to/file.js
# Edit mode: i, Save and exit: :wq
```

### Create New Files on Server

```bash
# Create a new file with content
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "cat > /opt/lessoncraftstudio/frontend/newfile.js <<'EOF'
const message = 'Hello World';
console.log(message);
EOF"
```

## Verification and Testing

### Test API Endpoints

```bash
# Test homepage content API (English)
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "curl -s 'http://localhost:3000/api/homepage/content?locale=en' | head -100"

# Test with German locale
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "curl -s 'http://localhost:3000/api/homepage/content?locale=de' | head -100"

# Test raw data endpoint
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "curl -s 'http://localhost:3000/api/homepage/content?raw=true' | head -100"
```

### Test Using Node.js

```bash
# Verify data structure with Node.js
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "cd /opt/lessoncraftstudio/frontend && node -e \"fetch('http://localhost:3000/api/homepage/content?raw=true').then(r => r.json()).then(d => console.log(JSON.stringify({samples: d.samples.length, categories: Object.keys(d.samplesSection.categories)}, null, 2)))\""

# Test multiple locales
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "cd /opt/lessoncraftstudio/frontend && node -e \"Promise.all([fetch('http://localhost:3000/api/homepage/content?locale=en').then(r=>r.json()), fetch('http://localhost:3000/api/homepage/content?locale=de').then(r=>r.json())]).then(([en,de]) => console.log(JSON.stringify({en_title: en.content.hero.title, de_title: de.content.hero.title}, null, 2)))\""
```

## Troubleshooting

### Server Not Responding

```bash
# Check if server is running
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "pm2 list"

# Check logs for errors
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "pm2 logs lessoncraftstudio --lines 50 --nostream"

# Check Next.js processes
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "ps aux | grep next"
```

### Port Already in Use

```bash
# Kill whatever is using port 3000
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "fuser -k 3000/tcp"

# Then restart PM2
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "pm2 restart lessoncraftstudio"
```

### Build Failures

```bash
# Clear Next.js cache
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "cd /opt/lessoncraftstudio/frontend && rm -rf .next && npm run build"

# Reinstall dependencies
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "cd /opt/lessoncraftstudio/frontend && rm -rf node_modules && npm install && npm run build"
```

### Database Connection Issues

```bash
# Check Prisma connection
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "cd /opt/lessoncraftstudio/frontend && npx prisma db pull"

# Regenerate Prisma client
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "cd /opt/lessoncraftstudio/frontend && npx prisma generate"
```

## Environment Variables

```bash
# View environment variables
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "cat /opt/lessoncraftstudio/frontend/.env.production"

# Edit environment variables
# SSH in first, then:
nano /opt/lessoncraftstudio/frontend/.env.production
```

## Complete Deployment Example (Recent Homepage Update)

This is the actual process used to deploy category translations:

```bash
# Step 1: Commit changes locally
git add frontend/deploy-homepage-updates.js frontend/public/dashboard-apps-data.js frontend/public/homepage-content-manager.html
git commit -m "Add category translations and homepage deployment system"
git push

# Step 2: Pull on production server
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "cd /opt/lessoncraftstudio && rm frontend/production_data.json && git pull"

# Step 3: Run database initialization script
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "cd /opt/lessoncraftstudio/frontend && sed -i 's|http://localhost:3001|http://localhost:3000|g' deploy-homepage-updates.js && node deploy-homepage-updates.js"

# Step 4: Rebuild Next.js
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "cd /opt/lessoncraftstudio/frontend && npm run build"

# Step 5: Restart server
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "fuser -k 3000/tcp && pm2 restart lessoncraftstudio"

# Step 6: Verify deployment
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "pm2 logs lessoncraftstudio --lines 20 --nostream"
```

## Quick Reference Commands

### Full Deployment (Code + Restart)
```bash
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "cd /opt/lessoncraftstudio && git pull && cd frontend && npm run build && fuser -k 3000/tcp && pm2 restart lessoncraftstudio"
```

### Quick Restart (No Build)
```bash
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "cd /opt/lessoncraftstudio && git pull && fuser -k 3000/tcp && pm2 restart lessoncraftstudio"
```

### Public Files Only (No Build/Restart Needed)
```bash
"C:\Program Files\PuTTY\plink.exe" -batch -pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU root@65.108.5.250 "cd /opt/lessoncraftstudio && git pull"
```

## Important Notes

1. **Always commit and push first** - Use git-based deployment rather than direct file uploads
2. **Production port is 3000** - Local development uses 3001, production uses 3000
3. **PM2 auto-restarts** - If the app crashes, PM2 will automatically restart it
4. **Check logs after deployment** - Always verify no errors in PM2 logs
5. **Build when needed** - Only rebuild if code changes; skip for static file updates
6. **Database scripts** - Remember to update port numbers in database scripts (3001 → 3000)
7. **Git conflicts** - Use `git stash && git pull` if local changes conflict
8. **Keep credentials secure** - This file contains sensitive information; do not commit to public repos

## Server File Structure

```
/opt/lessoncraftstudio/
├── frontend/
│   ├── .next/               # Built files (delete to force rebuild)
│   ├── app/                 # Next.js app directory
│   ├── components/          # React components
│   ├── lib/                 # Library code
│   ├── public/              # Static files
│   ├── prisma/              # Database schema
│   ├── node_modules/        # Dependencies
│   ├── package.json         # Dependencies list
│   ├── .env.production      # Production environment variables
│   └── deploy-*.js          # Deployment scripts
└── .git/                    # Git repository
```

## Database Information

**Database Type**: PostgreSQL
**Database Name**: lessoncraftstudio_prod
**Database User**: lcs_user
**Database Password**: LcS2025SecureDBPass
**Prisma Schema**: /opt/lessoncraftstudio/frontend/prisma/schema.prisma

## PostgreSQL Commands (if needed)

```bash
# Connect to database
PGPASSWORD=LcS2025SecureDBPass psql -U lcs_user -d lessoncraftstudio_prod

# Run SQL query
PGPASSWORD=LcS2025SecureDBPass psql -U lcs_user -d lessoncraftstudio_prod -c "SELECT * FROM homepage_content LIMIT 5;"
```

---

**Last Updated**: 2025-10-11
**Deployment Tool**: PuTTY plink for Windows
**Process Manager**: PM2
**Framework**: Next.js 14.2.18
**Node Version**: Check with `node --version` on server
