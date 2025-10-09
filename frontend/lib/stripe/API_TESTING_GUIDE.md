# API Testing Guide - Complete Billing System

**Tool:** NativeRest (or any REST client)
**Base URL:** http://localhost:3000

---

## Prerequisites

Before testing, ensure:
1. ✅ PostgreSQL database is running
2. ✅ Frontend dev server is running (`npm run dev`)
3. ✅ You have a test user account
4. ✅ You have an admin user account
5. ✅ Stripe test keys are configured

---

## Testing Order

Follow this order for logical testing flow:

1. Authentication & Setup
2. Subscription Creation
3. Payment Processing
4. Subscription Management
5. Admin Analytics
6. GDPR Endpoints
7. Dunning System (requires failed payment simulation)

---

## 1. Authentication & User Setup

### 1.1 Create Test User (Sign Up)

**Endpoint:** `POST /api/auth/signup`

**Request Body:**
```json
{
  "email": "test@example.com",
  "password": "Test123!@#",
  "firstName": "Test",
  "lastName": "User"
}
```

**Expected Response:**
```json
{
  "success": true,
  "user": {
    "id": "...",
    "email": "test@example.com",
    "subscriptionTier": "free"
  }
}
```

---

### 1.2 Sign In

**Endpoint:** `POST /api/auth/signin`

**Request Body:**
```json
{
  "email": "test@example.com",
  "password": "Test123!@#",
  "deviceId": "test-device-123"
}
```

**Expected Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "...",
  "user": {
    "id": "...",
    "email": "test@example.com",
    "firstName": "Test",
    "subscriptionTier": "free"
  }
}
```

**Important:** Save the `token` - you'll need it for subsequent requests!

---

### 1.3 Get Current User

**Endpoint:** `GET /api/auth/me`

**Headers:**
```
Authorization: Bearer YOUR_TOKEN_HERE
```

**Expected Response:**
```json
{
  "success": true,
  "user": {
    "id": "...",
    "email": "test@example.com",
    "subscriptionTier": "free",
    "isAdmin": false
  }
}
```

---

## 2. Subscription Creation

### 2.1 Create Checkout Session (CORE Monthly)

**Endpoint:** `POST /api/stripe/checkout`

**Headers:**
```
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json
```

**Request Body:**
```json
{
  "tier": "core",
  "interval": "monthly",
  "successUrl": "http://localhost:3000/billing?success=true",
  "cancelUrl": "http://localhost:3000/billing?canceled=true"
}
```

**Expected Response:**
```json
{
  "success": true,
  "sessionId": "cs_test_...",
  "url": "https://checkout.stripe.com/c/pay/cs_test_..."
}
```

**Testing Note:**
- Open the `url` in browser to complete checkout
- Use Stripe test card: `4242 4242 4242 4242`
- Any future date, any CVC

---

### 2.2 Create Checkout Session (FULL Yearly)

**Endpoint:** `POST /api/stripe/checkout`

**Headers:**
```
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json
```

**Request Body:**
```json
{
  "tier": "full",
  "interval": "yearly",
  "successUrl": "http://localhost:3000/billing?success=true",
  "cancelUrl": "http://localhost:3000/billing?canceled=true",
  "taxLocationId": "txloc_1234567890"
}
```

---

### 2.3 Get Current Subscription

**Endpoint:** `GET /api/stripe/subscription`

**Headers:**
```
Authorization: Bearer YOUR_TOKEN_HERE
```

**Expected Response:**
```json
{
  "success": true,
  "subscription": {
    "id": "sub_...",
    "status": "active",
    "tier": "core",
    "interval": "monthly",
    "currentPeriodEnd": "2025-02-09T...",
    "cancelAtPeriodEnd": false,
    "amount": 599,
    "currency": "usd"
  }
}
```

---

## 3. Subscription Management

### 3.1 Upgrade Subscription (CORE → FULL)

**Endpoint:** `POST /api/stripe/subscription/upgrade`

**Headers:**
```
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json
```

**Request Body:**
```json
{
  "newTier": "full",
  "billingInterval": "monthly"
}
```

**Expected Response:**
```json
{
  "success": true,
  "subscription": {
    "id": "sub_...",
    "tier": "full",
    "status": "active",
    "proratedAmount": 400,
    "nextBillingDate": "2025-02-09T..."
  }
}
```

---

### 3.2 Downgrade Subscription (FULL → CORE)

**Endpoint:** `POST /api/stripe/subscription/downgrade`

**Headers:**
```
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json
```

**Request Body:**
```json
{
  "newTier": "core",
  "billingInterval": "monthly"
}
```

**Expected Response:**
```json
{
  "success": true,
  "subscription": {
    "id": "sub_...",
    "tier": "core",
    "status": "active",
    "effectiveDate": "2025-02-09T...",
    "message": "Your subscription will be downgraded at the end of the current billing period"
  }
}
```

---

### 3.3 Cancel Subscription

**Endpoint:** `POST /api/stripe/subscription/cancel`

**Headers:**
```
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json
```

**Request Body:**
```json
{
  "reason": "too_expensive",
  "feedback": "I found it too expensive for my needs"
}
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Subscription will be canceled at the end of the billing period",
  "cancelAt": "2025-02-09T...",
  "refund": null
}
```

---

### 3.4 Update Payment Method

**Endpoint:** `PUT /api/stripe/payment-method`

**Headers:**
```
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json
```

**Request Body:**
```json
{
  "paymentMethodId": "pm_card_visa"
}
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Payment method updated successfully",
  "paymentMethod": {
    "id": "pm_...",
    "type": "card",
    "card": {
      "brand": "visa",
      "last4": "4242",
      "expMonth": 12,
      "expYear": 2025
    }
  }
}
```

---

## 4. Payment & Refund Management

### 4.1 Get Payment History

**Endpoint:** `GET /api/payments?limit=10`

**Headers:**
```
Authorization: Bearer YOUR_TOKEN_HERE
```

**Expected Response:**
```json
{
  "success": true,
  "payments": [
    {
      "id": "...",
      "amount": 599,
      "currency": "usd",
      "status": "succeeded",
      "invoiceUrl": "https://invoice.stripe.com/...",
      "createdAt": "2025-01-09T..."
    }
  ],
  "total": 5
}
```

---

### 4.2 Request Refund (Admin Only)

**Endpoint:** `POST /api/stripe/refund`

**Headers:**
```
Authorization: Bearer YOUR_ADMIN_TOKEN_HERE
Content-Type: application/json
```

**Request Body:**
```json
{
  "paymentId": "pay_...",
  "amount": 599,
  "reason": "requested_by_customer"
}
```

**Expected Response:**
```json
{
  "success": true,
  "refund": {
    "id": "re_...",
    "amount": 599,
    "status": "succeeded",
    "reason": "requested_by_customer"
  }
}
```

---

## 5. Admin Analytics Endpoints

**Note:** All admin endpoints require admin authentication!

### 5.1 Billing Overview

**Endpoint:** `GET /api/admin/billing/overview?period=30`

**Headers:**
```
Authorization: Bearer YOUR_ADMIN_TOKEN_HERE
```

**Query Parameters:**
- `period`: 7, 30, or 90 (days)

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "period": {
      "days": 30,
      "startDate": "2024-12-10T...",
      "endDate": "2025-01-09T..."
    },
    "revenue": {
      "mrr": 5990,
      "mrrGrowth": 15.5,
      "mrrByTier": {
        "CORE": 2995,
        "FULL": 2995
      },
      "arr": 71880,
      "arpu": 5.99,
      "totalRevenue": 11980
    },
    "subscriptions": {
      "active": 1000,
      "new": 150,
      "churnRate": 3.5,
      "retentionRate": 96.5,
      "voluntaryChurn": 30,
      "involuntaryChurn": 5
    },
    "payments": {
      "totalRevenue": 11980,
      "successful": 1145,
      "failed": 55,
      "successRate": 95.4,
      "refundedAmount": 120,
      "refundRate": 1.0,
      "averageTransactionValue": 10.46
    },
    "ltv": {
      "average": 120.50,
      "byTier": {
        "CORE": 95.88,
        "FULL": 159.84
      },
      "averageLifetimeMonths": 18.5
    }
  }
}
```

---

### 5.2 Subscription Analytics

**Endpoint:** `GET /api/admin/billing/subscriptions?period=30`

**Headers:**
```
Authorization: Bearer YOUR_ADMIN_TOKEN_HERE
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "byTier": {
      "CORE": 500,
      "FULL": 500
    },
    "byInterval": {
      "monthly": 700,
      "yearly": 300
    },
    "byStatus": {
      "active": 950,
      "past_due": 30,
      "canceled": 20
    },
    "trend": [
      { "month": "Jan 2025", "count": 150 },
      { "month": "Dec 2024", "count": 130 }
    ],
    "cancellations": {
      "total": 35,
      "byReason": {
        "too_expensive": 15,
        "not_using": 10,
        "found_alternative": 10
      }
    },
    "averageLifetimeDays": 555
  }
}
```

---

### 5.3 Payment Failure Analytics

**Endpoint:** `GET /api/admin/billing/failures?period=30`

**Headers:**
```
Authorization: Bearer YOUR_ADMIN_TOKEN_HERE
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "overview": {
      "total": 55,
      "recovered": 38,
      "pending": 12,
      "recoveryRate": 69.1,
      "averageRecoveryHours": 48.5,
      "atRiskRevenue": 720
    },
    "byReason": {
      "card_declined": 30,
      "insufficient_funds": 15,
      "expired_card": 10
    },
    "byStatus": {
      "pending": 12,
      "retrying": 5,
      "recovered": 38
    },
    "trend": [
      { "date": "Jan 9", "count": 3 },
      { "date": "Jan 8", "count": 2 }
    ],
    "recent": [
      {
        "id": "pf_...",
        "amount": 5.99,
        "currency": "usd",
        "failureCode": "card_declined",
        "status": "pending",
        "retryCount": 1,
        "nextRetryAt": "2025-01-12T...",
        "user": {
          "email": "user@example.com",
          "name": "John Doe",
          "tier": "core"
        }
      }
    ]
  }
}
```

---

### 5.4 Revenue Trends

**Endpoint:** `GET /api/admin/billing/revenue?months=12&period=30`

**Headers:**
```
Authorization: Bearer YOUR_ADMIN_TOKEN_HERE
```

**Query Parameters:**
- `months`: Number of months for MRR/churn trends (default: 12)
- `period`: Days for current period analysis (default: 30)

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "total": 11980,
    "trends": {
      "mrr": [
        { "month": "Jan 2025", "mrr": 5990 },
        { "month": "Dec 2024", "mrr": 5200 }
      ],
      "churn": [
        { "month": "Jan 2025", "churnRate": 3.5 },
        { "month": "Dec 2024", "churnRate": 4.2 }
      ],
      "daily": [
        { "date": "Jan 9", "revenue": 450 },
        { "date": "Jan 8", "revenue": 380 }
      ]
    },
    "breakdown": {
      "byTier": {
        "CORE": 5990,
        "FULL": 5990
      },
      "byInterval": {
        "monthly": 8386,
        "yearly": 3594
      }
    },
    "topCustomers": [
      {
        "userId": "...",
        "email": "whale@example.com",
        "name": "Big Customer",
        "tier": "full",
        "revenue": 999
      }
    ]
  }
}
```

---

### 5.5 Export Data (CSV)

**Endpoint:** `GET /api/admin/billing/export?format=csv&type=subscriptions&period=30`

**Headers:**
```
Authorization: Bearer YOUR_ADMIN_TOKEN_HERE
```

**Query Parameters:**
- `format`: csv (only)
- `type`: subscriptions, payments, failures, analytics
- `period`: 7, 30, or 90 (days)

**Expected Response:** CSV file download

**Example CSV (subscriptions):**
```csv
ID,User Email,User Name,Tier,Status,Billing Interval,Created At,Canceled At,Cancel Reason
sub_123,user@example.com,"John Doe",CORE,active,monthly,2024-12-10T...,
sub_124,user2@example.com,"Jane Smith",FULL,active,yearly,2024-12-15T...,
```

---

## 6. GDPR Endpoints

### 6.1 Export User Data (GDPR Article 15)

**Endpoint:** `GET /api/gdpr/export`

**Headers:**
```
Authorization: Bearer YOUR_TOKEN_HERE
```

**Expected Response:** JSON file download

**Sample Response:**
```json
{
  "exportDate": "2025-01-09T...",
  "dataSubject": {
    "userId": "...",
    "email": "test@example.com",
    "name": "Test User"
  },
  "personalInformation": {
    "id": "...",
    "email": "test@example.com",
    "firstName": "Test",
    "lastName": "User",
    "subscriptionTier": "core",
    "createdAt": "2024-12-01T..."
  },
  "subscriptionHistory": {
    "total": 1,
    "subscriptions": [...]
  },
  "paymentHistory": {
    "total": 5,
    "totalAmount": 2995,
    "payments": [...]
  },
  "sessions": {
    "total": 3,
    "active": 1,
    "sessions": [...]
  },
  "gdprCompliance": {
    "rightToAccess": "Fulfilled",
    "dataController": "LessonCraft Studio",
    "dataProcessors": ["Stripe", "SendGrid/AWS SES"]
  }
}
```

---

### 6.2 Delete User Account (GDPR Article 17)

**Endpoint:** `POST /api/gdpr/delete`

**Headers:**
```
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json
```

**Request Body:**
```json
{
  "confirmEmail": "test@example.com"
}
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Account successfully deleted",
  "deletionDetails": {
    "userId": "...",
    "email": "test@example.com",
    "deletedAt": "2025-01-09T...",
    "dataRetention": {
      "personalData": "Immediately deleted",
      "paymentRecords": "Anonymized and retained for 7 years (legal requirement)",
      "stripeData": "Deletion requested (subject to Stripe retention policies)"
    }
  }
}
```

---

## 7. Stripe Webhook Testing

### 7.1 Simulate Webhook Event

**Endpoint:** `POST /api/stripe/webhook`

**Headers:**
```
Content-Type: application/json
stripe-signature: whsec_test_secret
```

**Testing Note:**
You cannot easily test webhooks via REST client. Instead:

1. Use Stripe CLI:
```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

2. Trigger test events:
```bash
stripe trigger payment_intent.succeeded
stripe trigger invoice.payment_failed
stripe trigger customer.subscription.updated
```

---

## Test Scenarios

### Scenario 1: Complete Subscription Flow

1. ✅ Sign up new user
2. ✅ Create CORE monthly subscription
3. ✅ Wait for webhook (checkout.session.completed)
4. ✅ Verify subscription is active
5. ✅ Get payment history
6. ✅ Upgrade to FULL
7. ✅ Verify prorated charge
8. ✅ Cancel subscription
9. ✅ Verify cancellation scheduled

### Scenario 2: Payment Failure & Dunning

1. ✅ Create subscription with test card
2. ⚠️ Trigger payment failure (use Stripe CLI)
3. ✅ Check payment failure record created
4. ✅ Verify Day 0 email sent
5. ⏰ Wait for retry (or trigger manually)
6. ✅ Check dunning status in admin dashboard

### Scenario 3: Admin Analytics

1. ✅ Create multiple test subscriptions
2. ✅ Get billing overview
3. ✅ Check MRR calculation
4. ✅ View churn rate
5. ✅ Export CSV reports
6. ✅ Verify all metrics accurate

### Scenario 4: GDPR Compliance

1. ✅ Export user data
2. ✅ Verify all data included
3. ✅ Delete account
4. ✅ Verify user deleted
5. ✅ Check payments anonymized
6. ✅ Confirm cannot login

---

## Error Responses

All endpoints return consistent error format:

```json
{
  "success": false,
  "error": "Error message here",
  "code": "ERROR_CODE"
}
```

**Common HTTP Status Codes:**
- `200` - Success
- `400` - Bad Request (validation error)
- `401` - Unauthorized (missing/invalid token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `500` - Internal Server Error

---

## NativeRest Collection Setup

### Environment Variables

Create these environment variables in NativeRest:

```
BASE_URL=http://localhost:3000
USER_TOKEN=<your_user_token_here>
ADMIN_TOKEN=<your_admin_token_here>
USER_EMAIL=test@example.com
ADMIN_EMAIL=admin@lessoncraftstudio.com
```

### Request Template

All requests should include:

**Headers:**
```
Content-Type: application/json
Authorization: Bearer {{USER_TOKEN}}
```

---

## Next Steps

1. ✅ Start PostgreSQL database
2. ✅ Run Prisma migrations
3. ✅ Create test user account
4. ✅ Create admin user account
5. ✅ Test each endpoint systematically
6. ✅ Document any issues found

---

**Happy Testing!** 🚀
