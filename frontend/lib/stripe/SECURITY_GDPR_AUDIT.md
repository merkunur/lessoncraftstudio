# Security Audit & GDPR Compliance Guide

## Overview

This document provides a comprehensive security audit checklist and GDPR compliance requirements for the LessonCraft Studio billing and payment system.

---

## Table of Contents

1. [Security Audit Checklist](#security-audit-checklist)
2. [GDPR Compliance Requirements](#gdpr-compliance-requirements)
3. [Data Protection Measures](#data-protection-measures)
4. [Audit Logging](#audit-logging)
5. [Incident Response](#incident-response)

---

## Security Audit Checklist

### Authentication & Authorization

#### ✅ Already Implemented

- **JWT-based authentication** with device fingerprinting
- **Session management** with active session tracking
- **Admin-only endpoints** protected by `withAdmin()` middleware
- **Single-device login** enforcement with conflict detection

#### 🔍 Review Required

1. **Token Security**
   - [ ] JWT secret is strong (minimum 256 bits)
   - [ ] Tokens have appropriate expiration (recommendation: 15 minutes access, 7 days refresh)
   - [ ] Refresh tokens are rotated on use
   - [ ] Tokens are properly invalidated on logout
   - [ ] HttpOnly cookies used for token storage (if applicable)

2. **Password Security**
   - [ ] Passwords are hashed with bcrypt (minimum 10 rounds)
   - [ ] Password reset tokens expire after 1 hour
   - [ ] Rate limiting on password reset requests
   - [ ] Account lockout after failed login attempts

3. **Admin Access**
   - [ ] Multi-factor authentication (MFA) required for admin accounts
   - [ ] Admin actions are logged
   - [ ] Admin access is reviewed quarterly
   - [ ] Least privilege principle applied

**File to Review:** `lib/auth-server.ts`, `lib/auth.ts`

---

### API Endpoint Security

#### Payment Endpoints

**Critical Endpoints:**
- `POST /api/stripe/checkout`
- `POST /api/stripe/subscription/upgrade`
- `POST /api/stripe/subscription/downgrade`
- `POST /api/stripe/refund`
- `POST /api/stripe/webhook`

#### Security Requirements

1. **Input Validation**
   ```typescript
   // All inputs must be validated with Zod schemas
   import { z } from 'zod';

   const checkoutSchema = z.object({
     tier: z.enum(['core', 'full']),
     interval: z.enum(['monthly', 'yearly']),
     taxLocationId: z.string().optional(),
   });
   ```

2. **Rate Limiting**
   - [ ] Implement rate limiting on all payment endpoints
   - [ ] Recommendation: 10 requests per minute per user
   - [ ] Use Redis or similar for distributed rate limiting

3. **CSRF Protection**
   - [ ] Verify requests come from your domain
   - [ ] Check Origin and Referer headers
   - [ ] Use SameSite cookies

4. **Webhook Security**
   - [x] **CRITICAL:** Stripe webhook signature verification
   - [ ] Idempotency checks to prevent duplicate processing
   - [ ] Replay attack prevention (timestamp validation)

   ```typescript
   // Already implemented in webhook handler
   const signature = req.headers['stripe-signature'];
   const event = stripe.webhooks.constructEvent(
     body,
     signature,
     process.env.STRIPE_WEBHOOK_SECRET
   );
   ```

**Files to Review:**
- `app/api/stripe/checkout/route.ts`
- `app/api/stripe/webhook/route.ts`
- `app/api/stripe/refund/route.ts`

---

### Admin Dashboard Security

#### Access Control

1. **Admin Verification**
   ```typescript
   // Every admin endpoint must use withAdmin wrapper
   export const GET = withAdmin(async (req: NextRequest) => {
     // Admin-only logic
   });
   ```

2. **Data Filtering**
   - [ ] Admin can only access data they're authorized for
   - [ ] PII is masked unless explicitly needed
   - [ ] Export functionality includes audit trail

3. **CORS Configuration**
   - [ ] Admin API endpoints have strict CORS policies
   - [ ] Only allow requests from your domain

**Files to Review:**
- `app/api/admin/billing/*/route.ts`
- `lib/auth-server.ts`

---

### Database Security

#### Query Safety

1. **SQL Injection Prevention**
   - [x] Using Prisma ORM (prevents SQL injection)
   - [ ] Review raw SQL queries (if any)
   - [ ] Parameterized queries only

2. **Data Access**
   - [ ] Use Prisma field selection to limit data exposure
   - [ ] Never return sensitive data unless required
   - [ ] Use database-level encryption for sensitive fields

3. **Connection Security**
   - [ ] Database uses SSL/TLS connections
   - [ ] Connection string stored in environment variables
   - [ ] Database user has minimal required permissions

**File to Review:** `lib/prisma.ts`

---

### Sensitive Data Handling

#### Payment Card Data - PCI DSS Compliance

**✅ Compliant Approach (Current Implementation):**
- **Never store card numbers** - Stripe handles all card data
- Use Stripe Elements or Stripe Checkout
- Only store Stripe tokens and payment method IDs

**❌ Never Do:**
- Store full card numbers
- Store CVV codes
- Store unencrypted cardholder data

#### Personal Identifiable Information (PII)

**Data Classification:**

| Data Type | Sensitivity | Storage | Encryption |
|-----------|-------------|---------|------------|
| Email | High | Database | At rest |
| Name | Medium | Database | At rest |
| Payment history | High | Database | At rest |
| Session tokens | Critical | Database | At rest + in transit |
| Stripe IDs | Medium | Database | At rest |

**Requirements:**
- [ ] Encryption at rest enabled on database
- [ ] TLS 1.3 for data in transit
- [ ] PII access is logged
- [ ] PII is masked in logs and error messages

---

## GDPR Compliance Requirements

### Right to Access (Article 15)

**Implementation Required:**

```typescript
// app/api/gdpr/data-export/route.ts
export async function getUserData(userId: string) {
  return {
    personalInfo: await prisma.user.findUnique({ where: { id: userId } }),
    subscriptions: await prisma.subscription.findMany({ where: { userId } }),
    payments: await prisma.payment.findMany({ where: { userId } }),
    activityLog: await prisma.activityLog.findMany({ where: { userId } }),
    sessions: await prisma.session.findMany({ where: { userId } }),
  };
}
```

**Checklist:**
- [ ] Create `/api/gdpr/export` endpoint
- [ ] User can download all their data in JSON format
- [ ] Response time: within 30 days (GDPR requirement)
- [ ] Include all data categories

---

### Right to Erasure (Article 17)

**Implementation Required:**

```typescript
// app/api/gdpr/delete-account/route.ts
export async function deleteUserData(userId: string) {
  // 1. Cancel active subscriptions
  await stripe.subscriptions.cancel(stripeSubscriptionId);

  // 2. Delete user data (with cascade)
  await prisma.user.delete({ where: { id: userId } });

  // 3. Anonymize required data (for legal/accounting)
  await prisma.payment.updateMany({
    where: { userId },
    data: {
      userId: 'DELETED_USER',
      // Preserve transaction data for tax records
    },
  });

  // 4. Request Stripe data deletion
  await stripe.customers.del(stripeCustomerId);
}
```

**Retention Periods:**

| Data Type | Retention Period | Reason |
|-----------|------------------|--------|
| User profile | Immediate deletion | GDPR |
| Payment records | 7 years | Tax/legal requirement |
| Anonymized analytics | Permanent | No PII |
| Session logs | 90 days | Security |

**Checklist:**
- [ ] Create account deletion endpoint
- [ ] Soft delete vs hard delete strategy defined
- [ ] Anonymize data that must be retained
- [ ] Notify Stripe to delete customer data
- [ ] Confirm deletion within 30 days

---

### Right to Data Portability (Article 20)

**Requirements:**
- [ ] User can export data in JSON format
- [ ] Data is machine-readable
- [ ] Include subscription history, payments, usage data
- [ ] Provide within 30 days

---

### Consent Management (Articles 6 & 7)

#### Email Communications

**Consent Required For:**
- Marketing emails ❌ (Must opt-in)
- Transactional emails ✅ (Implied consent)
- Payment failure notifications ✅ (Legitimate interest)
- Service updates ✅ (Contract)

**Implementation:**

```typescript
// User model should include
interface User {
  emailConsent: {
    marketing: boolean;
    productUpdates: boolean;
    // Transactional emails always allowed
  };
  consentDate: Date;
  consentIpAddress: string; // Proof of consent
}
```

**Checklist:**
- [ ] Add consent fields to User model
- [ ] Create consent management UI
- [ ] Log consent changes with timestamp + IP
- [ ] Easy opt-out mechanism in every email
- [ ] Separate consent for different purposes

---

### Data Processing Agreement (Article 28)

**Third-Party Processors:**

| Service | Purpose | DPA Required | Status |
|---------|---------|--------------|--------|
| Stripe | Payment processing | ✅ Yes | [Stripe DPA](https://stripe.com/legal/dpa) |
| SendGrid/SES | Email delivery | ✅ Yes | Must sign |
| Hetzner | Hosting | ✅ Yes | Must verify |

**Action Items:**
- [ ] Sign DPA with all data processors
- [ ] Maintain list of all processors
- [ ] Verify GDPR compliance of each service
- [ ] Document data flows

---

### Privacy Policy & Terms

**Must Include:**
- [ ] What data is collected
- [ ] How data is used
- [ ] Who data is shared with (Stripe, email provider)
- [ ] How long data is retained
- [ ] User rights (access, deletion, portability)
- [ ] Contact information for privacy officer
- [ ] Cookie policy
- [ ] Last updated date

**Location:** `/privacy-policy` and `/terms-of-service`

---

## Data Protection Measures

### Encryption

#### In Transit
- [x] HTTPS/TLS 1.3 enforced
- [ ] HSTS headers configured
- [ ] Secure cipher suites only

```typescript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
        ],
      },
    ];
  },
};
```

#### At Rest
- [ ] Database encryption enabled
- [ ] Backup encryption enabled
- [ ] Environment variables secured (not in source control)

---

### Access Controls

**Principle of Least Privilege:**

| Role | Access |
|------|--------|
| User | Own data only |
| Support | Read-only user data (with audit log) |
| Admin | All data + billing operations |
| Developer | No production access |

**Implementation:**
- [ ] Role-based access control (RBAC)
- [ ] Audit logging for privileged actions
- [ ] Regular access reviews

---

## Audit Logging

### What to Log

**High Priority (Security Events):**
- Login attempts (success/failure)
- Password changes
- Admin actions
- Payment processing
- Subscription changes
- Refunds
- Account deletions
- Failed authentication
- API rate limit violations

**Medium Priority (Business Events):**
- Subscription upgrades/downgrades
- Payment failures
- Email bounces
- User registrations

### Implementation

```typescript
// lib/audit-log.ts
export async function logAuditEvent({
  userId,
  action,
  resource,
  metadata,
  ipAddress,
  userAgent,
}: AuditLogEntry) {
  await prisma.auditLog.create({
    data: {
      userId,
      action,
      resource,
      metadata,
      ipAddress,
      userAgent,
      timestamp: new Date(),
    },
  });
}
```

**Files to Create:**
- [ ] `lib/audit-log.ts` - Audit logging utility
- [ ] Add `AuditLog` model to Prisma schema
- [ ] Log all security-critical events

---

### Log Retention

| Log Type | Retention Period |
|----------|------------------|
| Security events | 2 years |
| Payment logs | 7 years |
| User activity | 90 days |
| Error logs | 30 days |

---

## Incident Response

### Data Breach Response Plan

**Within 24 Hours:**
1. Identify scope of breach
2. Contain the breach (revoke tokens, block access)
3. Notify internal stakeholders
4. Begin forensic analysis

**Within 72 Hours:**
1. Notify supervisory authority (GDPR requirement)
2. Assess risk to individuals
3. Document incident

**Within 1 Week:**
1. Notify affected users (if high risk)
2. Implement remediation
3. Update security measures

### Contacts

- **Data Protection Officer:** [Email]
- **Security Team:** [Email]
- **Legal Team:** [Email]

---

## Security Testing

### Recommended Tests

1. **Penetration Testing**
   - [ ] Annual penetration test by third party
   - [ ] Focus on payment flows

2. **Vulnerability Scanning**
   - [ ] Weekly automated scans
   - [ ] Use tools like Snyk, OWASP ZAP

3. **Code Review**
   - [ ] Security review for all payment code
   - [ ] Use static analysis tools

4. **Dependency Scanning**
   ```bash
   npm audit
   npm audit fix
   ```

---

## Compliance Checklist

### Pre-Launch

- [ ] All security measures implemented
- [ ] GDPR endpoints created (export, delete)
- [ ] Privacy policy published
- [ ] Terms of service published
- [ ] Cookie consent banner implemented
- [ ] DPAs signed with processors
- [ ] Security testing completed
- [ ] Incident response plan documented
- [ ] Staff training completed

### Post-Launch

- [ ] Monthly security reviews
- [ ] Quarterly access audits
- [ ] Annual penetration testing
- [ ] GDPR compliance review (annual)
- [ ] Update privacy policy as needed

---

## Next Steps

1. **Immediate Actions:**
   - Create GDPR export endpoint
   - Create GDPR delete endpoint
   - Add audit logging
   - Implement rate limiting
   - Add consent management

2. **Within 1 Week:**
   - Complete security testing
   - Review all authentication flows
   - Enable database encryption
   - Configure HSTS headers

3. **Within 1 Month:**
   - Conduct penetration test
   - Sign processor DPAs
   - Complete staff training
   - Document incident response procedures

---

## Resources

- [Stripe Security Best Practices](https://stripe.com/docs/security/guide)
- [GDPR Official Text](https://gdpr-info.eu/)
- [PCI DSS Requirements](https://www.pcisecuritystandards.org/)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)

---

**Last Updated:** 2025-01-09
**Next Review:** 2025-04-09 (Quarterly)
