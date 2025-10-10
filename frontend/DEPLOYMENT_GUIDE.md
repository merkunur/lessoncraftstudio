# LessonCraftStudio - Production Deployment Guide

Complete guide for deploying LessonCraftStudio to a Hetzner dedicated server.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Server Setup](#server-setup)
3. [Database Configuration](#database-configuration)
4. [Environment Configuration](#environment-configuration)
5. [Stripe Configuration](#stripe-configuration)
6. [Email Configuration](#email-configuration)
7. [Application Deployment](#application-deployment)
8. [SSL/HTTPS Setup](#sslhttps-setup)
9. [Post-Deployment](#post-deployment)
10. [Monitoring & Maintenance](#monitoring--maintenance)
11. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Accounts & Services
- [x] Hetzner dedicated server or VPS
- [x] Domain name configured (lessoncraftstudio.com)
- [x] Stripe account (production mode enabled)
- [x] Email service (SendGrid, AWS SES, or SMTP)
- [x] Git repository access
- [x] (Optional) Sentry account for error tracking

### Required Software on Server
- Ubuntu 22.04 LTS (recommended) or similar
- Node.js 18+ (LTS)
- PostgreSQL 15+
- Docker & Docker Compose (recommended)
- Nginx (reverse proxy)
- Certbot (SSL certificates)

---

## Server Setup

### 1. Initial Server Configuration

```bash
# SSH into your Hetzner server
ssh root@your-server-ip

# Update system
apt update && apt upgrade -y

# Install essential tools
apt install -y curl git build-essential ufw fail2ban

# Configure firewall
ufw allow 22/tcp      # SSH
ufw allow 80/tcp      # HTTP
ufw allow 443/tcp     # HTTPS
ufw enable

# Configure fail2ban for security
systemctl enable fail2ban
systemctl start fail2ban
```

### 2. Install Node.js

```bash
# Install Node.js 18 LTS
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs

# Verify installation
node --version  # Should show v18.x.x
npm --version
```

### 3. Install PostgreSQL

```bash
# Install PostgreSQL
apt install -y postgresql postgresql-contrib

# Start and enable PostgreSQL
systemctl start postgresql
systemctl enable postgresql

# Create production database and user
sudo -u postgres psql <<EOF
CREATE USER lcs_user WITH PASSWORD 'YOUR_STRONG_PASSWORD';
CREATE DATABASE lessoncraftstudio_prod OWNER lcs_user;
GRANT ALL PRIVILEGES ON DATABASE lessoncraftstudio_prod TO lcs_user;
\q
EOF
```

### 4. Install Docker (Recommended)

```bash
# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Install Docker Compose
apt install -y docker-compose

# Start Docker
systemctl start docker
systemctl enable docker
```

---

## Database Configuration

### 1. Configure PostgreSQL for Production

```bash
# Edit PostgreSQL config
nano /etc/postgresql/15/main/postgresql.conf

# Recommended settings:
# max_connections = 100
# shared_buffers = 256MB
# effective_cache_size = 1GB
# maintenance_work_mem = 64MB
# checkpoint_completion_target = 0.9
# wal_buffers = 16MB
# default_statistics_target = 100
# random_page_cost = 1.1

# Restart PostgreSQL
systemctl restart postgresql
```

### 2. Create Database Backup Script

```bash
# Create backup directory
mkdir -p /opt/backups/database
chmod 700 /opt/backups/database

# Create backup script
cat > /opt/backups/backup-db.sh <<'EOF'
#!/bin/bash
BACKUP_DIR="/opt/backups/database"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
DB_NAME="lessoncraftstudio_prod"
DB_USER="lcs_user"

# Create backup
PGPASSWORD="YOUR_STRONG_PASSWORD" pg_dump -U $DB_USER -h localhost $DB_NAME | gzip > $BACKUP_DIR/backup_$TIMESTAMP.sql.gz

# Keep only last 7 days of backups
find $BACKUP_DIR -name "backup_*.sql.gz" -mtime +7 -delete

echo "Backup completed: backup_$TIMESTAMP.sql.gz"
EOF

chmod +x /opt/backups/backup-db.sh

# Add to crontab (daily at 2 AM)
(crontab -l 2>/dev/null; echo "0 2 * * * /opt/backups/backup-db.sh >> /var/log/db-backup.log 2>&1") | crontab -
```

---

## Environment Configuration

### 1. Clone Repository

```bash
# Create application directory
mkdir -p /opt/lessoncraftstudio
cd /opt/lessoncraftstudio

# Clone repository
git clone https://github.com/your-org/lessoncraftstudio.git .
cd frontend
```

### 2. Create Production Environment File

```bash
# Copy template
cp .env.production.example .env.production

# Edit with your production values
nano .env.production
```

**CRITICAL**: Fill in all required values:
- Generate NEW JWT secrets: `openssl rand -base64 32`
- Add Stripe production keys
- Configure email service
- Set database URL
- Add monitoring credentials (Sentry, etc.)

### 3. Generate Secrets

```bash
# Generate JWT secrets
echo "JWT_SECRET=$(openssl rand -base64 32)"
echo "JWT_REFRESH_SECRET=$(openssl rand -base64 32)"
echo "NEXTAUTH_SECRET=$(openssl rand -base64 32)"
```

Copy these to your `.env.production` file.

---

## Stripe Configuration

### 1. Switch to Production Mode

1. Log into Stripe Dashboard: https://dashboard.stripe.com
2. Toggle from "Test mode" to "Production mode" (top right)
3. Go to **Developers > API Keys**
4. Copy your **Secret key** (sk_live_...) and **Publishable key** (pk_live_...)

### 2. Create Production Price IDs

1. Go to **Products**
2. Create products:
   - **Core Bundle**: $15/month, $144/year
   - **Full Access**: $25/month, $240/year
3. Copy the Price IDs (price_...) for each

### 3. Configure Webhook

1. Go to **Developers > Webhooks**
2. Click **Add endpoint**
3. Endpoint URL: `https://lessoncraftstudio.com/api/stripe/webhook`
4. Select events:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.paid`
   - `invoice.payment_failed`
5. Click **Add endpoint**
6. Copy the **Signing secret** (whsec_...)

### 4. Enable Stripe Tax (Optional but Recommended)

1. Go to **Settings > Tax**
2. Follow setup wizard
3. Enable automatic tax calculation
4. Set tax behavior to "exclusive"

Add to `.env.production`:
```env
STRIPE_TAX_ENABLED=true
STRIPE_DEFAULT_TAX_BEHAVIOR=exclusive
```

---

## Email Configuration

### Option 1: SendGrid (Recommended)

1. Sign up at https://sendgrid.com
2. Create API Key with "Mail Send" permissions
3. Verify sender identity (your domain)
4. Add to `.env.production`:

```env
EMAIL_PROVIDER=smtp
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=apikey
SMTP_PASSWORD=SG.your_api_key_here
SMTP_FROM_EMAIL=noreply@lessoncraftstudio.com
SMTP_FROM_NAME=LessonCraftStudio
```

### Option 2: AWS SES

1. Set up AWS SES in your region
2. Verify your domain
3. Create SMTP credentials
4. Add to `.env.production`:

```env
EMAIL_PROVIDER=smtp
SMTP_HOST=email-smtp.eu-central-1.amazonaws.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_ses_smtp_username
SMTP_PASSWORD=your_ses_smtp_password
```

### Test Email Configuration

```bash
# From application directory
npm run test:email
```

---

## Application Deployment

### Method 1: Docker Deployment (Recommended)

```bash
# Build production image
cd /opt/lessoncraftstudio/frontend
docker build -t lessoncraftstudio:latest -f Dockerfile .

# Create docker-compose.yml for production
cat > docker-compose.prod.yml <<'EOF'
version: '3.8'

services:
  app:
    image: lessoncraftstudio:latest
    restart: unless-stopped
    ports:
      - "3000:3000"
    env_file:
      - .env.production
    depends_on:
      - postgres
    volumes:
      - ./public/images:/app/public/images
      - ./public/data:/app/public/data
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  postgres:
    image: postgres:15-alpine
    restart: unless-stopped
    environment:
      POSTGRES_USER: lcs_user
      POSTGRES_PASSWORD: YOUR_STRONG_PASSWORD
      POSTGRES_DB: lessoncraftstudio_prod
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "127.0.0.1:5432:5432"

volumes:
  postgres_data:
EOF

# Start services
docker-compose -f docker-compose.prod.yml up -d

# Check logs
docker-compose -f docker-compose.prod.yml logs -f
```

### Method 2: Direct Deployment

```bash
# Install dependencies
npm ci --production

# Run Prisma migrations
npx prisma migrate deploy

# Build application
npm run build

# Install PM2 for process management
npm install -g pm2

# Create PM2 ecosystem file
cat > ecosystem.config.js <<'EOF'
module.exports = {
  apps: [{
    name: 'lessoncraftstudio',
    script: 'node_modules/next/dist/bin/next',
    args: 'start -p 3000',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
    },
    env_file: '.env.production',
    error_file: '/var/log/lessoncraftstudio/error.log',
    out_file: '/var/log/lessoncraftstudio/out.log',
    log_file: '/var/log/lessoncraftstudio/combined.log',
    time: true,
  }]
};
EOF

# Create log directory
mkdir -p /var/log/lessoncraftstudio

# Start application
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup systemd
```

---

## SSL/HTTPS Setup

### 1. Install Nginx

```bash
apt install -y nginx

# Remove default config
rm /etc/nginx/sites-enabled/default
```

### 2. Configure Nginx as Reverse Proxy

```bash
cat > /etc/nginx/sites-available/lessoncraftstudio <<'EOF'
# Rate limiting
limit_req_zone $binary_remote_addr zone=api_limit:10m rate=10r/s;
limit_req_zone $binary_remote_addr zone=general_limit:10m rate=30r/s;

server {
    listen 80;
    listen [::]:80;
    server_name lessoncraftstudio.com www.lessoncraftstudio.com;

    # Redirect to HTTPS (will be configured after SSL setup)
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name lessoncraftstudio.com www.lessoncraftstudio.com;

    # SSL certificates (will be added by Certbot)
    # ssl_certificate /etc/letsencrypt/live/lessoncraftstudio.com/fullchain.pem;
    # ssl_certificate_key /etc/letsencrypt/live/lessoncraftstudio.com/privkey.pem;

    # SSL security settings
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers 'ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256';
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    # Security headers
    add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Logging
    access_log /var/log/nginx/lessoncraftstudio-access.log;
    error_log /var/log/nginx/lessoncraftstudio-error.log;

    # Max upload size
    client_max_body_size 10M;

    # Proxy settings
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;

        # Rate limiting
        limit_req zone=general_limit burst=50 nodelay;
    }

    # API rate limiting
    location /api/ {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # Stricter rate limiting for API
        limit_req zone=api_limit burst=20 nodelay;
    }

    # Health check endpoint (no rate limiting)
    location /api/health {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        access_log off;
    }
}
EOF

# Enable site
ln -s /etc/nginx/sites-available/lessoncraftstudio /etc/nginx/sites-enabled/

# Test configuration
nginx -t

# Reload Nginx
systemctl reload nginx
```

### 3. Install SSL Certificate with Certbot

```bash
# Install Certbot
apt install -y certbot python3-certbot-nginx

# Obtain certificate
certbot --nginx -d lessoncraftstudio.com -d www.lessoncraftstudio.com

# Test auto-renewal
certbot renew --dry-run

# Certificates will auto-renew via cron
```

---

## Post-Deployment

### 1. Run Database Migrations

```bash
cd /opt/lessoncraftstudio/frontend
npx prisma migrate deploy
```

### 2. Create Admin User

```bash
# Run the admin setup script
npm run setup:dev-admin

# Or manually via Prisma Studio
npx prisma studio
```

### 3. Verify Health Check

```bash
curl https://lessoncraftstudio.com/api/health

# Should return:
# {
#   "status": "healthy",
#   "timestamp": "2025-01-01T00:00:00.000Z",
#   "checks": {
#     "database": "connected",
#     "filesystem": "ok"
#   }
# }
```

### 4. Test Stripe Webhook

```bash
# Install Stripe CLI
curl -s https://packages.stripe.com/api/security/keypair/stripe-cli-gpg/public | gpg --dearmor | tee /usr/share/keyrings/stripe.gpg
echo "deb [signed-by=/usr/share/keyrings/stripe.gpg] https://packages.stripe.com/stripe-cli-debian-local stable main" | tee /etc/apt/sources.list.d/stripe.list
apt update
apt install stripe

# Test webhook
stripe listen --forward-to https://lessoncraftstudio.com/api/stripe/webhook
stripe trigger checkout.session.completed
```

### 5. Test Email Delivery

```bash
# Test password reset email
curl -X POST https://lessoncraftstudio.com/api/auth/forgot-password \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'

# Check logs for email delivery
pm2 logs lessoncraftstudio --lines 50
```

### 6. Performance Testing

```bash
# Install Apache Bench
apt install -y apache2-utils

# Load test
ab -n 1000 -c 10 https://lessoncraftstudio.com/

# Check response times
ab -n 100 -c 5 https://lessoncraftstudio.com/api/health
```

---

## Monitoring & Maintenance

### 1. Set Up Monitoring

```bash
# Install monitoring tools
apt install -y htop iotop nethogs

# Monitor application
pm2 monit  # Real-time monitoring

# Check logs
pm2 logs lessoncraftstudio --lines 100

# Check error logs
tail -f /var/log/lessoncraftstudio/error.log
```

### 2. Configure Sentry (Error Tracking)

1. Sign up at https://sentry.io
2. Create new project
3. Copy DSN
4. Add to `.env.production`:
```env
NEXT_PUBLIC_SENTRY_DSN=https://your-dsn@sentry.io/project-id
```
5. Restart application

### 3. Set Up Uptime Monitoring

Use services like:
- UptimeRobot (free)
- Pingdom
- StatusCake

Monitor endpoint: `https://lessoncraftstudio.com/api/health`

### 4. Regular Maintenance Tasks

```bash
# Daily: Check logs for errors
pm2 logs --err --lines 50

# Weekly: Check disk space
df -h

# Weekly: Check database performance
sudo -u postgres psql -d lessoncraftstudio_prod -c "SELECT * FROM pg_stat_activity;"

# Monthly: Update dependencies
npm audit
npm update

# Monthly: Check SSL certificate expiry
certbot certificates
```

---

## Troubleshooting

### Application Won't Start

```bash
# Check logs
pm2 logs lessoncraftstudio --err --lines 100

# Check if port is already in use
lsof -i :3000

# Check environment variables
pm2 env lessoncraftstudio

# Restart application
pm2 restart lessoncraftstudio
```

### Database Connection Issues

```bash
# Check PostgreSQL status
systemctl status postgresql

# Test connection
psql -U lcs_user -d lessoncraftstudio_prod -h localhost

# Check logs
tail -f /var/log/postgresql/postgresql-15-main.log
```

### Stripe Webhook Failures

```bash
# Check webhook endpoint
curl -X POST https://lessoncraftstudio.com/api/stripe/webhook

# Check webhook logs in Stripe Dashboard
# https://dashboard.stripe.com/webhooks

# Test webhook locally
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

### Email Delivery Issues

```bash
# Check SMTP connection
telnet smtp.sendgrid.net 587

# Check email logs
grep "Email" /var/log/lessoncraftstudio/combined.log

# Test email configuration
curl -X POST https://lessoncraftstudio.com/api/test/email
```

### High CPU/Memory Usage

```bash
# Check process usage
htop

# Check Node.js memory
pm2 show lessoncraftstudio

# Increase memory limit if needed
pm2 restart lessoncraftstudio --node-args="--max-old-space-size=4096"

# Check for memory leaks
pm2 install pm2-logrotate
```

---

## Rollback Procedure

If deployment fails:

```bash
# Stop current application
pm2 stop lessoncraftstudio

# Revert to previous version
cd /opt/lessoncraftstudio/frontend
git reset --hard HEAD~1

# Rebuild
npm ci
npm run build

# Restart
pm2 restart lessoncraftstudio
```

---

## Support

For deployment issues:
- Check logs: `/var/log/lessoncraftstudio/`
- Review Sentry errors: https://sentry.io
- Check Stripe Dashboard: https://dashboard.stripe.com
- Contact: support@lessoncraftstudio.com

---

## Security Checklist

Before going live:

- [ ] All production secrets are unique (not from development)
- [ ] Firewall is configured (UFW)
- [ ] Fail2ban is active
- [ ] SSL certificate is installed and auto-renews
- [ ] Database has strong password
- [ ] SSH key-only authentication (disable password auth)
- [ ] Regular backups configured
- [ ] Monitoring and alerts set up
- [ ] Rate limiting configured
- [ ] Security headers enabled
- [ ] Stripe production mode verified
- [ ] Email delivery tested
- [ ] GDPR compliance verified

---

**Last Updated**: January 2025
**Version**: 1.0.0
