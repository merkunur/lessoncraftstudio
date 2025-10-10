# LessonCraftStudio - Production Deployment Checklist

Use this checklist before deploying to production. Check off each item as completed.

## 🔴 CRITICAL - Must Complete Before Deployment

### Environment Configuration
- [ ] Created `.env.production` file (never commit to git!)
- [ ] Generated NEW JWT_SECRET: `openssl rand -base64 32`
- [ ] Generated NEW JWT_REFRESH_SECRET: `openssl rand -base64 32`
- [ ] Generated NEW NEXTAUTH_SECRET: `openssl rand -base64 32`
- [ ] Set NODE_ENV=production
- [ ] Set NEXT_PUBLIC_APP_URL to production domain
- [ ] Set FORCE_HTTPS=true
- [ ] Updated CORS_ALLOWED_ORIGINS with production domains only

### Database
- [ ] PostgreSQL installed and running
- [ ] Created production database: `lessoncraftstudio_prod`
- [ ] Created database user with strong password
- [ ] Updated DATABASE_URL in .env.production
- [ ] Ran all Prisma migrations: `npx prisma migrate deploy`
- [ ] Tested database connection
- [ ] Configured automated daily backups
- [ ] Verified backup restoration works

### Stripe Configuration
- [ ] Switched Stripe Dashboard to Production mode
- [ ] Copied production Secret Key (sk_live_...)
- [ ] Copied production Publishable Key (pk_live_...)
- [ ] Updated STRIPE_SECRET_KEY in .env.production
- [ ] Updated NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY in .env.production
- [ ] Created production products in Stripe Dashboard
  - [ ] Core Bundle: $15/month
  - [ ] Core Bundle: $144/year
  - [ ] Full Access: $25/month
  - [ ] Full Access: $240/year
- [ ] Copied all 4 Price IDs to .env.production
- [ ] Created webhook endpoint: `https://yourdomain.com/api/stripe/webhook`
- [ ] Selected webhook events:
  - [ ] checkout.session.completed
  - [ ] customer.subscription.created
  - [ ] customer.subscription.updated
  - [ ] customer.subscription.deleted
  - [ ] invoice.paid
  - [ ] invoice.payment_failed
- [ ] Copied webhook signing secret (whsec_...) to .env.production
- [ ] Tested webhook with test event
- [ ] (Optional) Enabled Stripe Tax for automatic tax calculation

### Email Service
- [ ] Chose email provider (SendGrid, AWS SES, or SMTP)
- [ ] Created account and verified sender domain
- [ ] Obtained API key or SMTP credentials
- [ ] Updated EMAIL_PROVIDER in .env.production
- [ ] Updated SMTP_* variables in .env.production
- [ ] Tested email delivery (verification, password reset, receipts)
- [ ] Verified emails not going to spam folder

### Security
- [ ] Installed SSL certificate (HTTPS enabled)
- [ ] Verified SSL auto-renewal configured
- [ ] Security headers configured in next.config.js
- [ ] Rate limiting configured in Nginx
- [ ] Firewall configured (UFW or similar)
  - [ ] Port 22 (SSH) open
  - [ ] Port 80 (HTTP) open (redirects to HTTPS)
  - [ ] Port 443 (HTTPS) open
  - [ ] All other ports blocked
- [ ] Fail2ban installed and configured
- [ ] Changed default SSH port (optional but recommended)
- [ ] Disabled SSH password authentication (key-only)
- [ ] Created non-root user for running application

## 🟠 HIGH PRIORITY - Strongly Recommended

### Application Deployment
- [ ] Code deployed to server
- [ ] Dependencies installed: `npm ci --production`
- [ ] Application built: `npm run build`
- [ ] Build completed without errors
- [ ] PM2 or Docker configured for process management
- [ ] Application starts successfully
- [ ] Health check endpoint responding: `/api/health`
- [ ] Nginx reverse proxy configured
- [ ] Application accessible via domain

### Monitoring & Logging
- [ ] Sentry account created
- [ ] Sentry DSN added to .env.production
- [ ] Tested error reporting in Sentry
- [ ] Configured uptime monitoring (UptimeRobot, Pingdom, etc.)
- [ ] Set up alerts for downtime
- [ ] Set up alerts for failed payments
- [ ] Configured log rotation
- [ ] Application logs accessible and readable

### Legal & Compliance
- [ ] Reviewed Terms of Service
- [ ] Updated contact information in Terms
- [ ] Reviewed Privacy Policy
- [ ] Updated contact information in Privacy Policy
- [ ] Updated company address in Privacy Policy (currently shows Stockholm, Sweden)
- [ ] Updated data protection officer contact (dataprotection@lessoncraftstudio.com)
- [ ] Verified GDPR compliance for EU customers
- [ ] Reviewed refund policy
- [ ] Verified tax handling for applicable regions

### DNS & Domain
- [ ] Domain DNS records configured:
  - [ ] A record pointing to server IP
  - [ ] CNAME for www subdomain
  - [ ] (Optional) MX records for email
  - [ ] (Optional) SPF record for email
  - [ ] (Optional) DKIM records for email
- [ ] DNS propagation completed
- [ ] Domain accessible via HTTPS

## 🟡 MEDIUM PRIORITY - Complete Soon After Launch

### Performance Optimization
- [ ] Removed unnecessary console.log statements
- [ ] Configured proper logging system (Winston/Pino)
- [ ] Verified bundle size is reasonable
- [ ] Tested page load times
- [ ] Verified image optimization working
- [ ] (Optional) Configured CDN for static assets
- [ ] (Optional) Configured Redis for caching

### Testing
- [ ] Smoke tested all critical user flows:
  - [ ] User registration
  - [ ] Email verification
  - [ ] Password reset
  - [ ] User login
  - [ ] Subscription purchase (test small amount)
  - [ ] Worksheet generation
  - [ ] Subscription cancellation
  - [ ] Billing portal access
- [ ] Tested payment flow end-to-end
- [ ] Verified webhook events are processed correctly
- [ ] Tested email delivery for all email types
- [ ] Verified mobile responsiveness
- [ ] Tested all 11 supported languages
- [ ] Load tested application (recommended: 100+ concurrent users)

### Additional Configuration
- [ ] Analytics configured (Google Analytics)
- [ ] (Optional) Hotjar or similar for user behavior tracking
- [ ] (Optional) LogRocket for session replay
- [ ] Robots.txt accessible: `/robots.txt`
- [ ] Sitemap accessible: `/sitemap.xml`
- [ ] Sitemap submitted to Google Search Console
- [ ] Configured 404 and 500 error pages
- [ ] Favicon and PWA icons configured

## 🟢 OPTIONAL - Nice to Have

### Advanced Features
- [ ] Social login configured (Google, Facebook, GitHub)
- [ ] Team accounts feature tested
- [ ] API access feature configured
- [ ] Newsletter integration tested
- [ ] Blog content migrated and tested

### DevOps
- [ ] CI/CD pipeline configured (GitHub Actions, GitLab CI, etc.)
- [ ] Staging environment set up
- [ ] Automated testing in CI/CD
- [ ] Automated deployment configured
- [ ] Rollback procedure documented and tested
- [ ] Disaster recovery plan documented
- [ ] Infrastructure as Code (Terraform, Ansible, etc.)

### Documentation
- [ ] Updated README.md with deployment instructions
- [ ] Created runbook for common operations
- [ ] Documented environment variables
- [ ] Created troubleshooting guide
- [ ] Created developer onboarding guide
- [ ] API documentation (if applicable)

## 📋 Post-Deployment (First 24-48 Hours)

### Immediate Monitoring
- [ ] Monitor application logs continuously
- [ ] Monitor error rates in Sentry
- [ ] Monitor server resources (CPU, memory, disk)
- [ ] Check Stripe webhook delivery status
- [ ] Monitor email delivery rates
- [ ] Track first real user signups
- [ ] Verify first real payment processes successfully
- [ ] Check health endpoint every 5 minutes

### First Week Tasks
- [ ] Review all error logs daily
- [ ] Monitor database performance
- [ ] Check backup completion daily
- [ ] Review Stripe transaction logs
- [ ] Respond to any support tickets quickly
- [ ] Collect user feedback
- [ ] Monitor page load times
- [ ] Check SSL certificate status
- [ ] Review rate limiting effectiveness

## 🔧 Maintenance Schedule

### Daily
- [ ] Check application health
- [ ] Review error logs
- [ ] Monitor uptime alerts
- [ ] Verify backups completed

### Weekly
- [ ] Review Sentry error reports
- [ ] Check disk space usage
- [ ] Review Stripe transactions
- [ ] Monitor user growth metrics
- [ ] Check for security updates

### Monthly
- [ ] Update npm dependencies
- [ ] Security audit
- [ ] Performance review
- [ ] Database optimization
- [ ] Backup restoration test
- [ ] SSL certificate expiry check
- [ ] Review and optimize costs

## 📞 Emergency Contacts

- **Technical Lead**: [Your Name/Email]
- **DevOps**: [DevOps Contact]
- **Stripe Support**: https://support.stripe.com
- **Hosting Provider (Hetzner)**: https://hetzner.com/support
- **Email Provider Support**: [Provider Support Link]
- **DNS Provider**: [Provider Support Link]

## 🚨 Rollback Plan

If critical issues occur post-deployment:

1. Immediately notify team
2. Check error logs and Sentry
3. If issue is critical:
   - Roll back to previous version: `git reset --hard HEAD~1`
   - Rebuild: `npm run build`
   - Restart: `pm2 restart lessoncraftstudio`
4. If database migration issue:
   - Restore from last backup
   - Roll back migrations: `npx prisma migrate resolve --rolled-back`
5. Notify users of issue via status page
6. Post-mortem meeting within 24 hours

## ✅ Final Sign-Off

Before marking deployment as complete:

- [ ] All CRITICAL items checked
- [ ] All HIGH PRIORITY items checked
- [ ] Application accessible and working
- [ ] Test transaction processed successfully
- [ ] All team members notified of deployment
- [ ] Status page updated (if applicable)
- [ ] Marketing team can announce launch

**Deployment Date**: _______________
**Deployed By**: _______________
**Verified By**: _______________
**Status**: [ ] Ready for Launch | [ ] Issues Found | [ ] Delayed

---

## 📚 Additional Resources

- [Deployment Guide](./DEPLOYMENT_GUIDE.md) - Complete step-by-step deployment instructions
- [Architecture Overview](./ARCHITECTURE-OVERVIEW.md) - System architecture documentation
- [Stripe Documentation](./lib/stripe/IMPLEMENTATION_SUMMARY.md) - Stripe integration details
- [Email System](./lib/email/README.md) - Email system documentation

---

**Version**: 1.0.0
**Last Updated**: January 2025
