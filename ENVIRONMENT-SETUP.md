# Environment Configuration Guide

## Quick Start

1. **Copy the example file:**
   ```bash
   cp .env.example .env.local
   ```

2. **Update critical variables for local development:**
   - Database credentials
   - JWT secrets (use generated values for production)
   - Stripe test keys (get from Stripe dashboard)

3. **Generate secure secrets for production:**
   ```bash
   # Generate JWT Secret
   openssl rand -base64 32
   
   # Generate NextAuth Secret
   openssl rand -base64 32
   
   # Generate UUID for Directus
   node -e "console.log(require('crypto').randomUUID())"
   ```

## Environment Files

### Development
- `.env.local` - Local development settings (git ignored)
- `.env.development` - Shared development settings

### Production
- `.env.production` - Production settings (never commit secrets!)
- `.env.production.local` - Local overrides for production

### Testing
- `.env.test` - Test environment settings

## Critical Variables

### 🔴 Required for Basic Operation

| Variable | Description | Example |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection | `postgresql://user:pass@localhost:5432/db` |
| `JWT_SECRET` | JWT signing key (32+ chars) | Use `openssl rand -base64 32` |
| `NEXTAUTH_SECRET` | NextAuth encryption | Use `openssl rand -base64 32` |

### 🟡 Required for Features

| Variable | Description | Required For |
|----------|-------------|-------------|
| `STRIPE_SECRET_KEY` | Stripe API key | Payments |
| `SENDGRID_API_KEY` | Email service | Email notifications |
| `DIRECTUS_URL` | CMS endpoint | Image library |

### 🟢 Optional Enhancements

| Variable | Description | Default |
|----------|-------------|----------|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics | Disabled |
| `SENTRY_DSN` | Error tracking | Disabled |
| `ENABLE_BLOG` | Blog feature flag | true |

## Security Best Practices

### ⚠️ Never Commit These
- Any variable containing "SECRET", "KEY", or "TOKEN"
- Database passwords
- API keys
- OAuth credentials

### ✅ Safe to Commit
- Feature flags
- Public URLs
- Application names
- Default locales

## Service Configuration

### Stripe Setup

1. Create account at https://stripe.com
2. Get test keys from Dashboard > Developers > API Keys
3. Create products and prices
4. Set webhook endpoint: `{YOUR_URL}/api/subscription/webhook`
5. Copy webhook secret

### Email Service (SendGrid)

1. Create account at https://sendgrid.com
2. Verify sender email
3. Generate API key
4. Set up templates (optional)

### Directus CMS

1. Already configured in Docker
2. Access at http://localhost:8055
3. Default admin: admin@lessoncraftstudio.com
4. Generate static token in Settings > Access Tokens

## Docker Environment

### PostgreSQL
```yaml
POSTGRES_USER=postgres
POSTGRES_PASSWORD=lcspass123!
POSTGRES_DB=lessoncraftstudio
```

### Directus
```yaml
DIRECTUS_KEY=<generate-uuid>
DIRECTUS_SECRET=<generate-secret>
DB_CONNECTION_STRING=postgresql://...
```

## Troubleshooting

### Database Connection Issues
```bash
# Test connection
pg_isready -h localhost -p 5432

# Check Docker container
docker ps | grep postgres
```

### Environment Not Loading
```bash
# Check file exists
ls -la .env*

# Verify Next.js is reading it
npm run dev
# Should show: "Environment variables loaded from .env"
```

### Prisma Issues
```bash
# Regenerate client
npx prisma generate

# Reset database
npx prisma db push --force-reset
```

## Production Deployment

### Vercel
1. Add environment variables in Vercel dashboard
2. Use production values for all secrets
3. Enable preview deployments with staging variables

### Docker
1. Use Docker secrets for sensitive data
2. Mount `.env.production` as volume
3. Never bake secrets into images

### Security Checklist
- [ ] All secrets are 32+ characters
- [ ] Database has strong password
- [ ] CORS is properly configured
- [ ] HTTPS is enforced
- [ ] Rate limiting is enabled
- [ ] CSP headers are set

## Development vs Production

| Setting | Development | Production |
|---------|------------|------------|
| `NODE_ENV` | development | production |
| `DEBUG_MODE` | true | false |
| `FORCE_HTTPS` | false | true |
| `EMAIL_PROVIDER` | console | sendgrid |
| Database | Local PostgreSQL | Cloud PostgreSQL |
| File Storage | Local filesystem | S3/R2 |

## Useful Commands

```bash
# Validate environment
npx dotenv-cli -e .env.local -- node -e "console.log('DB:', process.env.DATABASE_URL ? '✓' : '✗')"

# Generate all secrets at once
node scripts/generate-secrets.js

# Check for exposed secrets
git secrets --scan
```

---

## Summary

The environment configuration is now complete with:
- ✅ All required variables documented
- ✅ Security best practices implemented  
- ✅ Development and production separation
- ✅ Service integration guides
- ✅ Troubleshooting documentation

Next step: Set up your services (Stripe, Email) and update the corresponding keys in `.env.local`.