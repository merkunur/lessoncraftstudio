# Automatic Email Testing Guide

This guide shows where each automatic email is triggered and how to test them.

---

## 📧 Email #1: Verification Email (Signup)

**Location:** `frontend/app/api/auth/signup/route.ts:104-109`

**Triggered When:** User signs up for a new account

**Code:**
```typescript
sendVerificationEmail({
  email: user.email,
  firstName: user.firstName || '',
  token: verificationToken,
  language: user.language || 'en',
}).catch(console.error);
```

**How to Test:**
1. Go to: https://lessoncraftstudio.com/auth/signup
2. Fill in signup form with a REAL email address you can access
3. Submit the form
4. Check your email inbox (and spam folder) for verification email
5. Email should arrive within 1-2 minutes

**Expected Email:**
- Subject: "Verify Your Email - LessonCraftStudio"
- Contains: Verification link to confirm email address

---

## 📧 Email #2: Welcome Email (After Verification)

**Location:** `frontend/app/api/auth/verify-email/route.ts:110-115`

**Triggered When:** User clicks verification link and confirms email

**Code:**
```typescript
sendWelcomeEmail({
  email: user.email,
  firstName: user.firstName || '',
  language: user.language,
  subscriptionTier: user.subscriptionTier,
}).catch(console.error);
```

**How to Test:**
1. After receiving verification email from Email #1
2. Click the verification link in the email
3. Check your email inbox for welcome email
4. Email should arrive within 1-2 minutes

**Expected Email:**
- Subject: "Welcome to LessonCraftStudio!"
- Contains: Welcome message, dashboard link, getting started info

---

## 📧 Email #3: Subscription Upgrade Confirmation

**Location:** `frontend/app/api/stripe/webhook/route.ts:542-554`

**Triggered When:** User upgrades from one tier to another (free → core, core → full)

**Code:**
```typescript
if (isUpgrade && currentUser && status === 'active') {
  console.log(`📧 Sending upgrade confirmation email: ${oldTier} → ${tier}`);
  sendSubscriptionUpgradeEmail({
    email: currentUser.email,
    firstName: currentUser.firstName || '',
    language: currentUser.language || 'en',
    oldPlan: oldTier,
    newPlan: tier,
  }).catch(error => {
    console.error('❌ Failed to send upgrade confirmation email:', error);
  });
}
```

**How to Test:**

**Option A: Real Purchase (Stripe Test Mode)**
1. Login to your lessoncraftstudio account
2. Go to: https://lessoncraftstudio.com/pricing
3. Click "Upgrade" on Core or Full plan
4. Use Stripe test card: `4242 4242 4242 4242`
5. Complete checkout
6. Stripe webhook will trigger → Email sent automatically
7. Check your email inbox

**Option B: Using Stripe CLI (Recommended for Testing)**
```bash
# Install Stripe CLI: https://stripe.com/docs/stripe-cli
stripe login

# Forward webhooks to local (if testing locally)
stripe listen --forward-to localhost:3000/api/stripe/webhook

# Trigger subscription update event
stripe trigger customer.subscription.updated
```

**Option C: Check After Real User Upgrades**
1. Wait for a real user to upgrade their subscription
2. Check server logs: `pm2 logs lessoncraftstudio | grep "Sending upgrade confirmation email"`
3. Verify in Resend dashboard: https://resend.com/logs

**Expected Email:**
- Subject: "Subscription Upgraded - LessonCraftStudio"
- Contains: Old plan, new plan, dashboard link

---

## 📧 Email #4: Payment Receipt

**Location:** `frontend/app/api/stripe/webhook/route.ts:269-291`

**Triggered When:** Successful subscription payment processed

**Code:**
```typescript
sendPaymentReceiptEmail({
  email: user.email,
  firstName: user.firstName || '',
  invoiceNumber: invoice.number || invoice.id || `INV-${Date.now()}`,
  amount: invoice.amount_paid / 100,
  currency: invoice.currency,
  date: new Date().toLocaleDateString(),
  plan: subscription.planName,
  billingPeriod: subscription.billingInterval || 'monthly',
  paymentMethod: 'Card',
  invoiceUrl: invoice.hosted_invoice_url || undefined,
  language: user.language || 'en',
}).catch(error => {
  console.error('❌ Failed to send payment receipt email:', error);
});
```

**How to Test:**

**Option A: Complete a Test Purchase**
1. Follow steps from Email #3 (Option A)
2. After successful checkout, Stripe will send `invoice.paid` webhook
3. Email is automatically sent
4. Check your email inbox

**Option B: Using Stripe CLI**
```bash
# Trigger invoice paid event
stripe trigger invoice.payment_succeeded
```

**Option C: Check Production Logs**
```bash
# SSH into server
ssh root@65.108.5.250

# Check for payment receipt emails in logs
pm2 logs lessoncraftstudio | grep "Sending payment receipt email"

# Check Resend logs
# Go to: https://resend.com/logs
```

**Expected Email:**
- Subject: "Payment Receipt - Invoice [NUMBER]"
- Contains: Invoice number, amount, plan, payment method, invoice link

---

## 📧 Email #5: Failed Payment Notification

**Location:** `frontend/app/api/stripe/webhook/route.ts:361-382`

**Triggered When:** Subscription payment fails

**Code:**
```typescript
sendFailedPaymentEmail({
  email: user.email,
  firstName: user.firstName || '',
  amount: invoice.amount_due / 100,
  currency: invoice.currency,
  plan: subscription.planName,
  failureReason: (invoice as any).last_payment_error?.message || 'Payment declined',
  updatePaymentUrl,
  language: user.language || 'en',
}).catch(error => {
  console.error('❌ Failed to send payment failed email:', error);
});
```

**How to Test:**

**Option A: Use Stripe Test Card (Declined)**
1. Login to your lessoncraftstudio account
2. Go to checkout for upgrade
3. Use DECLINED test card: `4000 0000 0000 0002`
4. Submit payment → It will fail
5. Stripe webhook triggers → Email sent
6. Check your email inbox

**Option B: Using Stripe CLI**
```bash
# Trigger invoice payment failed event
stripe trigger invoice.payment_failed
```

**Option C: Simulate Failed Payment in Stripe Dashboard**
1. Go to Stripe Dashboard: https://dashboard.stripe.com/test/invoices
2. Create a test invoice
3. Mark it as payment failed
4. Webhook will trigger automatically

**Expected Email:**
- Subject: "Payment Failed - Action Required"
- Contains: Failure reason, amount due, link to update payment method

---

## 🔍 How to Verify Emails Are Working

### 1. Check Server Logs
```bash
# SSH into production server
ssh root@65.108.5.250

# Watch live logs for email sending
pm2 logs lessoncraftstudio --lines 100 | grep -i "email\|📧"

# Look for these messages:
# - "📧 Sending upgrade confirmation email: free → core"
# - "📧 Sending payment receipt email to user@example.com"
# - "📧 Sending failed payment notification email to user@example.com"
```

### 2. Check Resend Dashboard
1. Login to Resend: https://resend.com/logs
2. View all sent emails with delivery status
3. Check for:
   - ✅ Delivered
   - ⏱️ Pending
   - ❌ Failed (with error details)

### 3. Check Email Logs in Admin Panel
1. Go to: https://lessoncraftstudio.com/admin/email/logs
2. Login as admin
3. View all email logs with status tracking
4. Filter by:
   - Email type (verification, welcome, upgrade, receipt, failed_payment)
   - Status (pending, sent, delivered, failed)
   - Date range

### 4. Test Email Configuration
```bash
# SSH into server
ssh root@65.108.5.250

# Check email environment variables
cd /opt/lessoncraftstudio/frontend
grep -E '^(EMAIL_|SMTP_)' .env | grep -v PASSWORD

# Should show:
# EMAIL_PROVIDER=smtp
# EMAIL_FROM_ADDRESS=onboarding@resend.dev
# EMAIL_FROM_NAME=LessonCraftStudio
# EMAIL_REPLY_TO=support@lessoncraftstudio.com
# SMTP_HOST=smtp.resend.com
# SMTP_PORT=587
# SMTP_USER=resend
# SMTP_SECURE=false
```

---

## 🚨 Quick Test: Send Test Email

**API Endpoint for Quick Testing:**
```bash
# Use the test email endpoint
curl -X POST https://lessoncraftstudio.com/api/admin/email/test \
  -H "Authorization: Bearer YOUR_ADMIN_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "to": "your-email@example.com",
    "subject": "Test Email from LessonCraftStudio",
    "html": "<h1>Hello!</h1><p>This is a test email. If you receive this, the email system is working!</p>"
  }'
```

**Steps:**
1. Get admin JWT token by logging in as admin
2. Replace `YOUR_ADMIN_JWT_TOKEN` with actual token
3. Replace `your-email@example.com` with your email
4. Run the curl command
5. Check your email inbox

---

## 📊 Email Flow Summary

```
┌─────────────────────────────────────────────────────────────┐
│                    User Signs Up                            │
│                         ↓                                    │
│          📧 Email #1: Verification Email                    │
│                         ↓                                    │
│              User Clicks Verify Link                        │
│                         ↓                                    │
│            📧 Email #2: Welcome Email                       │
│                         ↓                                    │
│               User Upgrades Plan                            │
│                         ↓                                    │
│       📧 Email #3: Upgrade Confirmation                     │
│                         ↓                                    │
│         Stripe Charges Subscription                         │
│                         ↓                                    │
│            📧 Email #4: Payment Receipt                     │
│                         ↓                                    │
│      (If payment fails next billing cycle)                  │
│                         ↓                                    │
│      📧 Email #5: Failed Payment Notification               │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎯 Recommended Testing Approach

**For Complete End-to-End Test:**
1. ✅ Sign up with a new test email → Test Email #1
2. ✅ Click verification link → Test Email #2
3. ✅ Upgrade to Core plan (use test card) → Test Email #3 & #4
4. ✅ Use declined test card → Test Email #5

**Time Required:** ~10 minutes
**Cost:** $0 (using Stripe test mode)

---

## 💡 Pro Tips

1. **Always check spam folder** - First-time emails often go to spam
2. **Use Resend sandbox domain** - Currently using `onboarding@resend.dev` (no domain verification needed)
3. **Verify domain later** - For custom `noreply@lessoncraftstudio.com` address
4. **Monitor Resend logs** - Real-time delivery tracking
5. **Check server logs** - Best for debugging webhook issues

---

## 🔐 Email Service Configuration

**Current Setup:**
- Provider: Resend (SMTP)
- From Address: `onboarding@resend.dev`
- SMTP Host: `smtp.resend.com`
- SMTP Port: 587
- API Key: `re_QDW...HNvB` (configured in .env)

**Status:** ✅ Active and working

---

## 📝 Notes

- All emails send **asynchronously** (non-blocking)
- Failed sends are logged but don't break the main flow
- Email queue system with automatic retries
- All emails support multiple languages (en, de, fr, es, etc.)
- Emails are rendered using React Email templates

---

**Last Updated:** 2025-10-14
**System Status:** ✅ All automatic emails operational
