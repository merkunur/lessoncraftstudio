# LessonCraftStudio - Deployment Strategy & Clarifications

## 📋 Content Management Workflow (SIMPLIFIED)

### ✅ What You Should Actually Do:

**Use ONLY the Custom Content Manager for everything!**
- **Access**: http://localhost:3000/worksheet-generators/admin-dashboard.html
- Upload images
- Create/edit themes
- Manage translations
- Everything you need is there!

**Why I mentioned Directus earlier**:
- Directus is the backend database, but you DON'T need to access it directly
- The Custom Content Manager already talks to Directus for you
- Think of Directus like MySQL - it's there, but you use a friendly UI instead

### 🎯 Correct Workflow:
1. **Add new theme**: Custom Content Manager → Add Theme button
2. **Upload images**: Custom Content Manager → Upload Images
3. **Edit translations**: Custom Content Manager → Edit in the interface
4. **Test in apps**: Open any worksheet app → Images appear instantly

**Forget about Directus admin panel** - you don't need it for daily operations!

---

## 🚀 Deployment to Hetzner Server

### ✅ YES, Everything Will Work! Here's Why:

**Current Architecture** (Docker-based):
```
Docker Compose orchestrates:
├── Frontend (Next.js) - Port 3000
├── API (Express) - Port 3001
├── Directus CMS - Port 8055
└── PostgreSQL - Port 5432
```

### 📦 What Makes Deployment Easy:

1. **Everything is containerized** - Same containers run anywhere
2. **No hardcoded localhost URLs** - All services communicate via Docker network
3. **Environment variables** handle configuration changes
4. **Single command deployment**: `docker-compose up -d`

---

## 🔧 Deployment Steps (Simple Version)

### Step 1: Prepare Your Hetzner Server
```bash
# SSH into your server
ssh root@your-server-ip

# Install Docker and Docker Compose
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
apt-get install docker-compose-plugin
```

### Step 2: Transfer Your Project
```bash
# On your local machine
git push origin main

# On Hetzner server
git clone https://github.com/yourusername/lessoncraftstudio.git
cd lessoncraftstudio
```

### Step 3: Configure for Production
```bash
# Copy and edit environment file
cp .env.example .env.production
nano .env.production
```

**Edit these values:**
```env
# .env.production
DIRECTUS_URL=https://yourdomain.com:8055
NEXT_PUBLIC_API_URL=https://yourdomain.com:3001
POSTGRES_PASSWORD=strong_production_password_here
DIRECTUS_KEY=generate-new-uuid-here
DIRECTUS_SECRET=generate-new-uuid-here
```

### Step 4: Update Docker Compose for Production
```yaml
# docker-compose.production.yml
version: '3.8'

services:
  frontend:
    image: lcs-frontend:latest
    ports:
      - "80:3000"  # Changed to port 80 for web
    environment:
      - NODE_ENV=production
    restart: always

  directus:
    image: directus/directus:latest
    ports:
      - "8055:8055"  # Keep internal, proxy through nginx
    environment:
      - NODE_ENV=production
    restart: always

  postgres:
    image: postgres:15-alpine
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: always
    # Remove ports - don't expose database publicly!

volumes:
  postgres_data:
    driver: local
```

### Step 5: Deploy!
```bash
# Build and start everything
docker-compose -f docker-compose.production.yml up -d

# Check if everything is running
docker ps

# View logs if needed
docker-compose logs -f
```

### Step 6: Set Up Nginx (Recommended)
```nginx
# /etc/nginx/sites-available/lessoncraftstudio
server {
    listen 80;
    server_name yourdomain.com;

    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    # Main app
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # API
    location /api {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
    }

    # Directus Admin (optional, can be internal only)
    location /admin {
        proxy_pass http://localhost:8055;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
    }
}
```

### Step 7: SSL Certificate
```bash
# Install Certbot
apt-get install certbot python3-certbot-nginx

# Get SSL certificate
certbot --nginx -d yourdomain.com

# Auto-renewal is set up automatically
```

---

## ✅ What Will Work Automatically:

1. **All 33 worksheet apps** - No changes needed
2. **Image library** - Uploads persist in Docker volumes
3. **Database** - PostgreSQL data persists
4. **Custom Content Manager** - Works exactly the same
5. **Multi-language support** - All translations work
6. **API endpoints** - All routes work identically

## ⚠️ What You Need to Configure:

1. **Domain name** - Point your domain to Hetzner server IP
2. **Environment variables** - Update URLs and passwords
3. **Backup strategy** - Set up automated backups
4. **Monitoring** - Add uptime monitoring (optional)

---

## 🔄 Updating After Deployment:

```bash
# On your local machine
git push origin main

# On Hetzner server
cd /path/to/lessoncraftstudio
git pull
docker-compose -f docker-compose.production.yml up -d --build
```

---

## 💾 Backup Strategy:

### Automated Daily Backups:
```bash
# Create backup script
cat > /root/backup-lcs.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="/backups/lessoncraftstudio"
DATE=$(date +%Y%m%d)

# Backup database
docker exec lcs-postgres pg_dump -U postgres lessoncraftstudio > $BACKUP_DIR/db_$DATE.sql

# Backup uploaded files
docker cp lcs-directus:/directus/uploads $BACKUP_DIR/uploads_$DATE

# Keep only last 7 days
find $BACKUP_DIR -name "*.sql" -mtime +7 -delete
find $BACKUP_DIR -name "uploads_*" -mtime +7 -delete
EOF

# Make executable and add to cron
chmod +x /root/backup-lcs.sh
(crontab -l 2>/dev/null; echo "0 2 * * * /root/backup-lcs.sh") | crontab -
```

---

## 🎯 Performance Optimizations for Production:

### 1. Enable Redis Cache:
```yaml
# Add to docker-compose.production.yml
redis:
  image: redis:alpine
  restart: always
  volumes:
    - redis_data:/data
```

### 2. CDN for Images (Optional):
- Use Cloudflare (free tier)
- Point image URLs through CDN
- Automatic global distribution

### 3. Database Indexes:
```sql
-- Run these after deployment for better performance
CREATE INDEX idx_images_theme ON image_assets(theme_id);
CREATE INDEX idx_images_status ON image_assets(status);
CREATE INDEX idx_translations ON image_assets USING GIN(translations);
```

---

## 🚨 Common Issues & Solutions:

### Issue: "Connection refused" errors
**Solution**: Wait 30 seconds for all services to start, or check Docker logs

### Issue: Images not loading
**Solution**: Check Directus is running: `docker logs lcs-directus`

### Issue: Database connection error
**Solution**: Ensure PostgreSQL started first: `docker-compose restart`

### Issue: Permission denied
**Solution**: Set correct permissions: `chmod -R 755 frontend/public`

---

## 📞 Monitoring & Health Checks:

### Simple Health Check Endpoint:
```javascript
// Already exists at: /api/health
// Returns: { status: 'ok', services: {...} }
```

### Uptime Monitoring:
- Use UptimeRobot (free)
- Monitor: https://yourdomain.com/api/health
- Get alerts if site goes down

---

## 🎉 Summary:

**Your deployment will be EASY because:**
1. ✅ Everything is containerized (works anywhere)
2. ✅ No localhost dependencies
3. ✅ Single command deployment
4. ✅ All paths are relative
5. ✅ Database included in Docker
6. ✅ Automatic service discovery

**Time to deploy: ~30 minutes** (including SSL setup)

**Monthly Hetzner costs:**
- Server: ~€40-60 (depending on specs)
- Everything else: FREE (no external services needed)

---

## 📝 Quick Deployment Checklist:

- [ ] Hetzner server with Ubuntu 22.04
- [ ] Domain name pointed to server
- [ ] Docker & Docker Compose installed
- [ ] Project files transferred
- [ ] Environment variables configured
- [ ] `docker-compose up -d` executed
- [ ] Nginx configured
- [ ] SSL certificate installed
- [ ] Test all 33 apps work
- [ ] Set up backups
- [ ] Add monitoring

**That's it! Your local setup WILL work on Hetzner with minimal changes!** 🚀