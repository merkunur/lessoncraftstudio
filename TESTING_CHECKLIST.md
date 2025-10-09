# Pre-Testing Checklist

## ✅ System Status

- [x] PostgreSQL is running (port 5432)
- [x] Frontend dev server is running (port 3000)
- [ ] Test user account created
- [ ] Admin user account created
- [ ] Stripe test keys configured

---

## Quick Start Guide

### Step 1: Verify Database Connection

Run this command to check database connection:
```bash
cd frontend
npx prisma db push
```

Expected: "Your database is now in sync with your schema"

---

### Step 2: Create Admin User

You need an admin user to test admin endpoints. Let me check if you already have one...

If not, you'll need to:
1. Sign up a regular user
2. Manually set `isAdmin = true` in database

Or use Prisma Studio:
```bash
npx prisma studio
```

---

### Step 3: Configure NativeRest

**Import Collection Steps:**
1. Open NativeRest
2. Create new collection: "LessonCraft Billing API"
3. Set environment variables:
   - `BASE_URL` = http://localhost:3000
   - `USER_TOKEN` = (get after signin)
   - `ADMIN_TOKEN` = (get after admin signin)

---

## Testing Priority Order

### 🔥 Critical Tests (Do First)

1. **Authentication**
   - Sign up
   - Sign in
   - Get current user

2. **Subscription Creation**
   - Create checkout session
   - Complete checkout (in browser)
   - Verify subscription active

3. **Admin Dashboard**
   - Get billing overview
   - Check metrics calculated correctly

### 🟡 Important Tests (Do Second)

4. **Subscription Management**
   - Upgrade subscription
   - Downgrade subscription
   - Cancel subscription

5. **Payment History**
   - Get payments
   - View invoices

### 🟢 Nice to Have (Do Last)

6. **Admin Analytics**
   - Subscription analytics
   - Payment failure tracking
   - Revenue trends
   - CSV export

7. **GDPR**
   - Export user data
   - Delete account

---

## Common Issues & Solutions

### Issue 1: "Unauthorized" (401)
**Solution:** Make sure you're including the Bearer token in Authorization header

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

### Issue 2: "Admin access required" (403)
**Solution:** Use admin token, not regular user token

### Issue 3: Stripe errors
**Solution:** Check your `.env.local` file has:
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

### Issue 4: Database connection failed
**Solution:**
```bash
cd frontend
npx prisma generate
npx prisma db push
```

---

## Test Data

### Stripe Test Cards

**Successful Payment:**
- Card: `4242 4242 4242 4242`
- Exp: Any future date (e.g., 12/25)
- CVC: Any 3 digits (e.g., 123)
- ZIP: Any 5 digits (e.g., 12345)

**Failed Payment (Declined):**
- Card: `4000 0000 0000 0002`

**3D Secure (Requires Auth):**
- Card: `4000 0025 0000 3155`

**Insufficient Funds:**
- Card: `4000 0000 0000 9995`

---

## Ready to Start?

1. ✅ Open NativeRest
2. ✅ Open the testing guide: `frontend/lib/stripe/API_TESTING_GUIDE.md`
3. ✅ Start with authentication endpoints
4. ✅ Work through the endpoints in order

---

**Let's begin testing!** 🚀

Start with:
```
POST http://localhost:3000/api/auth/signin
```

Body:
```json
{
  "email": "admin@lessoncraftstudio.com",
  "password": "your_password_here",
  "deviceId": "test-device-123"
}
```

Save the token you get back!
