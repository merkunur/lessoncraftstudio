# LessonCraftStudio Architecture Overview

## Project Status
✅ **Complete**: 33 worksheet generator apps with dynamic image library (141+ images)
🚧 **In Progress**: Website infrastructure for user management and monetization

## Hybrid Architecture Solution

### 1. Core Components (Completed)

#### Worksheet Generator Apps (33 apps)
- **Location**: `/worksheet-generators/`
- **Technology**: Vanilla JavaScript + Fabric.js
- **Features**:
  - Multi-language support (11 languages)
  - Dynamic image library from Directus CMS
  - Border and background themes
  - PDF/Image export
  - Professional worksheet quality

#### Directus CMS Integration
- **Purpose**: Manage image library and themes
- **Endpoints**:
  - `/api/images` - Get images by theme
  - `/api/borders/themes` - Get border themes
  - `/api/backgrounds/themes` - Get background themes
- **Database**: PostgreSQL

### 2. Website Infrastructure (In Development)

#### Dynamic Features (Next.js App Router)

##### User Authentication
- **Pages**: `/auth/signin`, `/auth/signup`
- **API Routes**: `/api/auth/signin`, `/api/auth/signup`
- **Technology**: JWT tokens, bcrypt for passwords
- **Database**: Prisma ORM with PostgreSQL

##### User Dashboard
- **Page**: `/dashboard`
- **Features**:
  - Grid view of all 33 apps
  - Access control based on subscription tier
  - Search and filter functionality
  - Usage statistics
  - Quick access to popular apps

##### Subscription Management
- **Pricing Page**: `/pricing`
- **Tiers**:
  - **Free**: 3 apps (Word Search, Addition, Coloring)
  - **Core Bundle ($9/mo)**: 10 apps
  - **Full Access ($19/mo)**: All 33 apps
- **Payment**: Stripe integration (pending)

#### Static Content Management

##### Simple Upload System
- **Tool**: `/simple-upload.html`
- **Purpose**: Easy upload of static HTML pages
- **Features**:
  - Language selection (11 languages)
  - Drag & drop HTML upload
  - Automatic page serving at `/static/[locale]/[page]`

### 3. Access Control Model

```javascript
Tier Access Matrix:
- Free: 3 apps (watermarked)
- Core: 10 apps (no watermarks)
- Full: 33 apps (all features)
```

### 4. Technology Stack

#### Frontend
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Internationalization**: next-intl
- **State Management**: React hooks
- **Authentication**: Custom JWT

#### Backend
- **API**: Next.js API routes
- **Database**: PostgreSQL
- **ORM**: Prisma
- **CMS**: Directus
- **File Storage**: Local filesystem

#### Infrastructure
- **Containers**: Docker
  - lcs-frontend (Next.js)
  - lcs-directus (CMS)
  - lcs-postgres (Database)

### 5. Key Design Decisions

#### Why Hybrid?
1. **Dynamic Features**: User auth, subscriptions, and payment require server-side logic
2. **Static Content**: Marketing pages can be simple HTML for easy editing
3. **Existing Apps**: 33 worksheet generators work perfectly as standalone HTML/JS

#### Benefits
- **Separation of Concerns**: Core apps remain independent
- **Easy Maintenance**: Static pages can be updated without deployment
- **Performance**: Static content serves fast
- **Flexibility**: Can add dynamic features as needed

### 6. User Flow

1. **Discovery**: User visits homepage → Views features
2. **Trial**: Signs up for free account → Access 3 apps
3. **Engagement**: Uses apps, sees value
4. **Conversion**: Views pricing → Upgrades to Core/Full
5. **Payment**: Stripe checkout → Instant access
6. **Usage**: Dashboard → Select app → Generate worksheets

### 7. Security Model

- **Authentication**: JWT tokens with 7-day expiry
- **Password Storage**: bcrypt hashing
- **API Protection**: Token verification on protected routes
- **CORS**: Configured for local development
- **Environment Variables**: Secrets in .env files

### 8. Monetization Strategy

#### Freemium Model
- **Free Tier**: Limited access to build trust
- **Core Bundle**: Most popular apps for regular users
- **Full Access**: Complete toolkit for professionals

#### Revenue Streams
1. **Subscriptions**: Monthly/yearly recurring
2. **Future**: API access, team plans, custom branding

### 9. Next Steps

#### Immediate (This Week)
- [ ] Complete Stripe payment integration
- [ ] Add email verification for signup
- [ ] Create password reset flow
- [ ] Add subscription management UI

#### Short Term (2 Weeks)
- [ ] Analytics dashboard
- [ ] User activity tracking
- [ ] Automated email campaigns
- [ ] Social login (Google, Facebook)

#### Long Term (1 Month)
- [ ] Team/organization accounts
- [ ] API for third-party integration
- [ ] Mobile app considerations
- [ ] CDN setup for global delivery

### 10. File Structure

```
lessoncraftstudio/
├── frontend/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── page.tsx (homepage)
│   │   │   ├── dashboard/page.tsx
│   │   │   ├── pricing/page.tsx
│   │   │   └── auth/
│   │   │       ├── signin/page.tsx
│   │   │       └── signup/page.tsx
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   ├── save-page/
│   │   │   └── images/
│   │   └── static/[locale]/[...slug]/route.ts
│   ├── public/
│   │   ├── worksheet-generators/ (33 apps)
│   │   ├── simple-upload.html
│   │   └── static-pages/
│   ├── lib/
│   │   ├── auth.ts
│   │   ├── prisma.ts
│   │   └── image-library-manager.ts
│   └── middleware.ts
├── backend/ (Directus)
└── docker-compose.yml
```

### 11. Success Metrics

- **Technical**: All 33 apps working, <2s page loads
- **Business**: User conversion rate, MRR growth
- **User Experience**: Easy onboarding, intuitive dashboard
- **Maintenance**: Clear separation, easy updates

### 12. Risk Mitigation

- **Backup Strategy**: Regular database backups
- **Error Handling**: Graceful degradation
- **Monitoring**: Error tracking, uptime monitoring
- **Support**: Documentation, FAQ, contact form

---

## Summary

The hybrid architecture leverages Next.js's strengths for dynamic features (auth, payments, dashboard) while keeping the successful worksheet generators as independent modules. Static content management via simple HTML upload provides flexibility for marketing pages without complex CMS overhead.

This approach balances:
- **Developer Experience**: Clear separation of concerns
- **User Experience**: Fast, responsive interface
- **Business Goals**: Scalable monetization
- **Maintenance**: Easy updates and additions

The system is designed to grow from a simple freemium model to a full-featured SaaS platform while maintaining the core value proposition: high-quality worksheet generation tools for educators.