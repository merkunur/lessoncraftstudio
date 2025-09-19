# LessonCraftStudio Technical Architecture Documentation

## Executive Summary

LessonCraftStudio is a professional SaaS platform for educational worksheet generation, featuring 33 specialized applications, multi-language support (11 languages), subscription-based monetization, and a content management system for blog posts.

---

## 1. Technology Stack

### Frontend
- **Framework**: Next.js 14.2.18 (App Router)
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS 3.4.x
- **UI Components**: React 18.3.1
- **Internationalization**: next-intl 4.3.6
- **State Management**: React Hooks + Context API
- **Form Validation**: Zod 4.1.5
- **Animations**: Framer Motion 12.x
- **Worksheet Apps**: Vanilla JavaScript + Fabric.js 5.3.1
- **PDF Generation**: jsPDF 2.5.1

### Backend
- **Runtime**: Node.js 20.x LTS
- **API Framework**: Next.js API Routes
- **Database ORM**: Prisma 6.15.0
- **Authentication**: JWT (jsonwebtoken 9.0.2)
- **Password Hashing**: bcryptjs 3.0.2
- **Payment Processing**: Stripe 18.5.0
- **Email Service**: SendGrid/Resend (to be configured)
- **File Storage**: Local filesystem (production: S3/CloudFlare R2)

### Database
- **Primary Database**: PostgreSQL 15
- **CMS Database**: PostgreSQL (Directus)
- **Cache Layer**: Redis (future implementation)
- **Session Storage**: JWT in httpOnly cookies

### Infrastructure
- **Containerization**: Docker + Docker Compose
- **Development**: Local Docker environment
- **Production Host**: Vercel/AWS/DigitalOcean (TBD)
- **CDN**: CloudFlare
- **Image Storage**: Directus + Local/S3
- **Monitoring**: Sentry + Vercel Analytics

---

## 2. System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         FRONTEND                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │   Next.js    │  │  Worksheet   │  │    Static    │    │
│  │   App Pages  │  │  Generators  │  │  Marketing   │    │
│  │              │  │   (33 Apps)  │  │    Pages     │    │
│  └──────────────┘  └──────────────┘  └──────────────┘    │
│                                                             │
└─────────────────────────┬───────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                      API LAYER                              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │     Auth     │  │   Payment    │  │    Content   │    │
│  │     APIs     │  │     APIs     │  │     APIs     │    │
│  └──────────────┘  └──────────────┘  └──────────────┘    │
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │    Image     │  │     Blog     │  │   Analytics  │    │
│  │   Library    │  │  Management  │  │     APIs     │    │
│  └──────────────┘  └──────────────┘  └──────────────┘    │
│                                                             │
└─────────────────────────┬───────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                    DATA LAYER                               │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │  PostgreSQL  │  │   Directus   │  │     Redis    │    │
│  │   (Primary)  │  │     CMS      │  │    (Cache)   │    │
│  └──────────────┘  └──────────────┘  └──────────────┘    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Component Architecture

#### Frontend Components
1. **Public Pages** (No auth required)
   - Homepage (11 languages)
   - Pricing page
   - About page
   - Contact page
   - Blog listing/posts
   - Legal pages (Terms, Privacy)

2. **Protected Pages** (Auth required)
   - User dashboard
   - Worksheet generators (33 apps)
   - Account settings
   - Billing management
   - Analytics dashboard

3. **Admin Pages** (Admin role required)
   - User management
   - Content moderation
   - System monitoring
   - Revenue analytics

#### Backend Services
1. **Authentication Service**
   - User registration/login
   - JWT token management
   - Password reset
   - Email verification
   - Session management

2. **Subscription Service**
   - Tier management (Free/Core/Full)
   - Access control
   - Usage tracking
   - Upgrade/downgrade logic

3. **Payment Service**
   - Stripe integration
   - Checkout sessions
   - Webhook processing
   - Invoice generation
   - Refund handling

4. **Content Service**
   - Blog post management
   - Image library (Directus)
   - Sample worksheets
   - Static page serving

5. **Analytics Service**
   - Usage tracking
   - Conversion metrics
   - User behavior
   - Performance monitoring

---

## 3. API Structure

### RESTful API Endpoints

#### Authentication (`/api/auth/*`)
```
POST   /api/auth/signup          - User registration
POST   /api/auth/signin          - User login
POST   /api/auth/signout         - User logout
POST   /api/auth/refresh         - Refresh JWT token
POST   /api/auth/forgot-password - Request password reset
POST   /api/auth/reset-password  - Reset password with token
POST   /api/auth/verify-email    - Verify email address
GET    /api/auth/me             - Get current user
```

#### User Management (`/api/users/*`)
```
GET    /api/users/profile        - Get user profile
PUT    /api/users/profile        - Update profile
DELETE /api/users/account        - Delete account
GET    /api/users/preferences    - Get preferences
PUT    /api/users/preferences    - Update preferences
```

#### Subscription (`/api/subscription/*`)
```
GET    /api/subscription/current     - Current subscription
GET    /api/subscription/plans       - Available plans
POST   /api/subscription/checkout    - Create checkout session
POST   /api/subscription/portal      - Customer portal link
POST   /api/subscription/webhook     - Stripe webhook handler
GET    /api/subscription/invoices    - Billing history
```

#### Content (`/api/content/*`)
```
GET    /api/content/samples          - Sample worksheets
GET    /api/content/blog             - Blog posts list
GET    /api/content/blog/[slug]      - Single blog post
POST   /api/content/blog             - Create blog post (admin)
PUT    /api/content/blog/[id]        - Update blog post (admin)
DELETE /api/content/blog/[id]        - Delete blog post (admin)
```

#### Image Library (`/api/images/*`)
```
GET    /api/images                   - List images by theme
GET    /api/images/themes            - Available themes
GET    /api/borders/themes           - Border themes
GET    /api/backgrounds/themes       - Background themes
```

#### Analytics (`/api/analytics/*`)
```
GET    /api/analytics/usage          - User usage stats
GET    /api/analytics/apps           - App usage breakdown
POST   /api/analytics/track          - Track events
GET    /api/analytics/export         - Export data
```

#### Admin (`/api/admin/*`)
```
GET    /api/admin/users              - List all users
GET    /api/admin/stats              - Platform statistics
GET    /api/admin/revenue            - Revenue metrics
POST   /api/admin/users/[id]/suspend - Suspend user
POST   /api/admin/users/[id]/restore - Restore user
```

### API Authentication Flow

```
1. User Login
   Client → POST /api/auth/signin → Server
   Server validates credentials
   Server generates JWT token
   Server → JWT token → Client

2. Authenticated Request
   Client → Request + JWT in header → Server
   Server validates JWT
   Server processes request
   Server → Response → Client

3. Token Refresh
   Client detects expired token
   Client → POST /api/auth/refresh → Server
   Server validates refresh token
   Server → New JWT token → Client
```

---

## 4. Database Schema

### Core Tables

#### Users Table
```sql
users {
  id              UUID PRIMARY KEY
  email           VARCHAR(255) UNIQUE NOT NULL
  password_hash   VARCHAR(255) NOT NULL
  first_name      VARCHAR(100)
  last_name       VARCHAR(100)
  email_verified  BOOLEAN DEFAULT false
  subscription_tier ENUM('free', 'core', 'full') DEFAULT 'free'
  stripe_customer_id VARCHAR(255)
  created_at      TIMESTAMP
  updated_at      TIMESTAMP
  last_login      TIMESTAMP
  is_admin        BOOLEAN DEFAULT false
  is_suspended    BOOLEAN DEFAULT false
  language        VARCHAR(2) DEFAULT 'en'
  timezone        VARCHAR(50)
}
```

#### Subscriptions Table
```sql
subscriptions {
  id                  UUID PRIMARY KEY
  user_id             UUID REFERENCES users(id)
  stripe_subscription_id VARCHAR(255)
  plan_id             VARCHAR(50)
  status              VARCHAR(50)
  current_period_start TIMESTAMP
  current_period_end   TIMESTAMP
  cancel_at           TIMESTAMP
  cancelled_at        TIMESTAMP
  trial_start         TIMESTAMP
  trial_end           TIMESTAMP
  created_at          TIMESTAMP
  updated_at          TIMESTAMP
}
```

#### Blog Posts Table
```sql
blog_posts {
  id              UUID PRIMARY KEY
  slug            VARCHAR(255) UNIQUE NOT NULL
  title           VARCHAR(255) NOT NULL
  description     TEXT
  content_html    TEXT
  featured_image  VARCHAR(500)
  author_id       UUID REFERENCES users(id)
  language        VARCHAR(2)
  category        VARCHAR(100)
  tags            TEXT[]
  status          ENUM('draft', 'published', 'archived')
  published_at    TIMESTAMP
  views_count     INTEGER DEFAULT 0
  created_at      TIMESTAMP
  updated_at      TIMESTAMP
}
```

#### Analytics Events Table
```sql
analytics_events {
  id              UUID PRIMARY KEY
  user_id         UUID REFERENCES users(id)
  event_type      VARCHAR(100)
  event_data      JSONB
  app_name        VARCHAR(100)
  session_id      VARCHAR(255)
  ip_address      INET
  user_agent      TEXT
  created_at      TIMESTAMP
}
```

#### Payment History Table
```sql
payment_history {
  id              UUID PRIMARY KEY
  user_id         UUID REFERENCES users(id)
  stripe_payment_id VARCHAR(255)
  amount          DECIMAL(10, 2)
  currency        VARCHAR(3)
  status          VARCHAR(50)
  description     TEXT
  invoice_url     VARCHAR(500)
  created_at      TIMESTAMP
}
```

---

## 5. Security Architecture

### Authentication & Authorization
- **JWT tokens** with 7-day expiry
- **Refresh tokens** with 30-day expiry
- **httpOnly cookies** for token storage
- **CORS configuration** for API protection
- **Rate limiting** on auth endpoints
- **Password requirements**: Min 8 chars, complexity rules

### Data Protection
- **Bcrypt** for password hashing (10 salt rounds)
- **SQL injection prevention** via Prisma ORM
- **XSS protection** via React escaping
- **CSRF tokens** for form submissions
- **Input validation** with Zod schemas
- **File upload restrictions** (type, size)

### Infrastructure Security
- **HTTPS only** in production
- **Security headers** (CSP, HSTS, etc.)
- **Environment variables** for secrets
- **Docker secrets** management
- **Regular security updates**
- **Automated vulnerability scanning**

### Compliance
- **GDPR compliant** data handling
- **COPPA compliant** for educational use
- **PCI DSS** via Stripe (no card data stored)
- **Cookie consent** management
- **Data retention policies**
- **Right to deletion** implementation

---

## 6. Deployment Strategy

### Development Environment
```yaml
Local Docker Setup:
- Frontend: Next.js dev server (port 3000)
- Directus CMS: Admin panel (port 8055)
- PostgreSQL: Database (port 5432)
- Hot reload enabled
- Source maps enabled
- Debug logging active
```

### Staging Environment
```yaml
Staging Server:
- Identical to production
- Separate database
- Test payment keys
- Basic auth protection
- Performance monitoring
- Error tracking enabled
```

### Production Environment
```yaml
Production Setup:
- Load balanced servers
- Auto-scaling enabled
- CDN for static assets
- Database replication
- Redis cache layer
- Zero-downtime deployments
```

### CI/CD Pipeline
```
1. Code Push → GitHub
2. Automated Tests
   - Unit tests
   - Integration tests
   - Linting/formatting
3. Build Docker Image
4. Push to Registry
5. Deploy to Staging
6. Run E2E Tests
7. Manual Approval
8. Deploy to Production
9. Health Checks
10. Rollback if Failed
```

---

## 7. Scalability Considerations

### Performance Targets
- **Page Load**: < 2 seconds
- **API Response**: < 200ms
- **Uptime**: 99.9%
- **Concurrent Users**: 10,000+
- **Database Queries**: < 50ms

### Optimization Strategies
1. **Frontend**
   - Code splitting per route
   - Image optimization (WebP, lazy loading)
   - Static page generation
   - Browser caching
   - Service workers

2. **Backend**
   - Database indexing
   - Query optimization
   - Connection pooling
   - Redis caching
   - CDN for static files

3. **Infrastructure**
   - Horizontal scaling
   - Load balancing
   - Database read replicas
   - Auto-scaling policies
   - Geographic distribution

---

## 8. Monitoring & Logging

### Application Monitoring
- **Sentry**: Error tracking
- **Vercel Analytics**: Performance metrics
- **Google Analytics**: User behavior
- **Stripe Dashboard**: Payment metrics
- **Custom dashboards**: Business KPIs

### Infrastructure Monitoring
- **Uptime monitoring**: Pingdom/UptimeRobot
- **Server metrics**: CPU, RAM, Disk
- **Database monitoring**: Query performance
- **Log aggregation**: CloudWatch/Datadog
- **Alert system**: PagerDuty integration

### Key Metrics to Track
- User registration rate
- Trial to paid conversion
- App usage frequency
- Error rates
- Page load times
- API response times
- Payment success rate
- User retention

---

## 9. Integration Points

### Third-Party Services
1. **Stripe**
   - Payment processing
   - Subscription management
   - Invoice generation
   - Tax calculation

2. **SendGrid/Resend**
   - Transactional emails
   - Newsletter campaigns
   - Email templates

3. **Directus CMS**
   - Image library management
   - Content versioning
   - Asset optimization

4. **CloudFlare**
   - CDN
   - DDoS protection
   - SSL certificates
   - DNS management

5. **Analytics Services**
   - Google Analytics
   - Hotjar (user recordings)
   - Mixpanel (product analytics)

---

## 10. Disaster Recovery

### Backup Strategy
- **Database**: Daily automated backups (30-day retention)
- **Code**: Git version control
- **User uploads**: S3 versioning
- **Configuration**: Infrastructure as Code

### Recovery Procedures
1. **Database failure**: Restore from backup (RTO: 1 hour)
2. **Server failure**: Auto-failover to standby (RTO: 5 minutes)
3. **Data corruption**: Point-in-time recovery (RPO: 1 hour)
4. **Security breach**: Incident response plan activation

### Business Continuity
- Service Level Agreement (SLA): 99.9% uptime
- Recovery Time Objective (RTO): 1 hour
- Recovery Point Objective (RPO): 1 hour
- Regular disaster recovery drills
- Documented runbooks

---

## 11. Development Guidelines

### Code Standards
- **TypeScript** strict mode enabled
- **ESLint** + **Prettier** configuration
- **Conventional Commits** for git messages
- **Feature branch** workflow
- **Code review** required for PRs
- **Test coverage** minimum 80%

### Documentation Requirements
- API documentation (OpenAPI/Swagger)
- Component documentation (Storybook)
- README files for each module
- Inline code comments for complex logic
- Architecture Decision Records (ADRs)

### Testing Strategy
- **Unit tests**: Jest + React Testing Library
- **Integration tests**: Supertest
- **E2E tests**: Playwright
- **Performance tests**: Lighthouse
- **Security tests**: OWASP ZAP
- **Accessibility tests**: axe-core

---

## 12. Future Enhancements

### Phase 2 Features (Post-Launch)
- Mobile applications (iOS/Android)
- API for third-party integrations
- White-label solution
- Team/organization accounts
- Advanced analytics dashboard
- AI-powered worksheet generation
- Collaborative editing features
- Offline mode support

### Technical Improvements
- GraphQL API layer
- Microservices architecture
- Kubernetes orchestration
- Event-driven architecture
- Real-time collaboration (WebSockets)
- Machine learning recommendations
- Progressive Web App (PWA)
- WebAssembly for performance

---

## Conclusion

This architecture provides a solid foundation for LessonCraftStudio, balancing:
- **Performance** with user experience
- **Scalability** with simplicity
- **Security** with accessibility
- **Feature richness** with maintainability

The modular design allows for incremental improvements and easy maintenance while supporting the platform's growth from launch to scale.

---

## Appendix A: Environment Variables

```env
# Application
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://lessoncraftstudio.com

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/lessoncraftstudio
DIRECTUS_DB_URL=postgresql://user:password@localhost:5432/directus

# Authentication
JWT_SECRET=your-secret-key-min-32-chars
JWT_REFRESH_SECRET=your-refresh-secret-min-32-chars
NEXTAUTH_SECRET=your-nextauth-secret

# Stripe
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Email
SENDGRID_API_KEY=SG...
EMAIL_FROM=noreply@lessoncraftstudio.com

# Storage
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_S3_BUCKET=lessoncraftstudio-assets

# Monitoring
SENTRY_DSN=https://...
GOOGLE_ANALYTICS_ID=G-...

# Directus
DIRECTUS_URL=http://localhost:8055
DIRECTUS_STATIC_TOKEN=...
```

---

## Appendix B: Docker Compose Configuration

```yaml
version: '3.8'

services:
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
    volumes:
      - ./frontend:/app
      - /app/node_modules
    depends_on:
      - postgres
      - directus

  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: lessoncraftstudio
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: secure_password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  directus:
    image: directus/directus:latest
    ports:
      - "8055:8055"
    environment:
      KEY: unique-uuid-here
      SECRET: unique-secret-here
      DB_CLIENT: pg
      DB_CONNECTION_STRING: postgresql://admin:password@postgres:5432/directus
    depends_on:
      - postgres

volumes:
  postgres_data:
```

---

**Document Version**: 1.0.0
**Last Updated**: December 2024
**Author**: LessonCraftStudio Development Team
**Status**: APPROVED FOR IMPLEMENTATION