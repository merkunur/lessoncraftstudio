# Step 10: Subscription UI Components - Test Guide

## Overview
This step implements the frontend UI for the subscription system, including pricing page, billing dashboard, and upgrade flows.

## Components Created

### 1. Pricing Page (`/pricing`)
- Three-tier pricing display (Free, Core $9.99, Full $19.99)
- Feature comparison
- One-click checkout integration
- FAQ section
- Trust badges

### 2. Billing Dashboard (`/dashboard/billing`)
- Current subscription display
- Usage statistics
- Payment method management
- Billing portal access
- Cancel/reactivate options

### 3. Subscription Components
- `UpgradeModal`: In-app upgrade flow
- `SubscriptionStatus`: Compact status display
- Payment success/failure handling

## Testing Instructions

### Prerequisites
1. Ensure Stripe environment variables are set in `.env.local`
2. Have Stripe CLI running for webhooks:
```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```
3. Start development server:
```bash
cd frontend
npm run dev
```

### Test 1: Pricing Page Display
1. Navigate to http://localhost:3000/pricing (or :3001 if port 3000 is taken)
2. Verify:
   - Three pricing tiers are displayed
   - "Most Popular" badge on Core plan
   - Features lists are accurate
   - FAQ section is visible
   - Prices show correctly ($0, $9.99, $19.99)

### Test 2: Unauthenticated Checkout Flow
1. While logged out, visit `/pricing`
2. Click "Get Started" on Free plan
   - Should redirect to signup page
3. Click "Start Free Trial" on Core/Full plan
   - Should redirect to signin page with redirect parameter

### Test 3: Authenticated Checkout Flow
1. Sign in to your account
2. Go to `/pricing`
3. Click "Start Free Trial" on Core plan
4. Verify:
   - Loading state appears
   - Redirected to Stripe checkout
   - Can enter test card: 4242 4242 4242 4242
   - After success, returned to `/dashboard/billing?success=true`
   - Success toast appears

### Test 4: Billing Dashboard
1. Navigate to `/dashboard/billing`
2. For Free users, verify:
   - Shows "Free" plan status
   - "Upgrade Plan" button visible
   - Usage limits displayed
3. For paid users, verify:
   - Current plan details shown
   - Next billing date displayed
   - "Manage Billing" button works
   - Usage statistics shown

### Test 5: Subscription Management
1. **Cancel Subscription:**
   - Click "Cancel Subscription" in billing dashboard
   - Confirm the action
   - Verify warning message appears
   - "Reactivate" button becomes available

2. **Reactivate Subscription:**
   - Click "Reactivate Subscription"
   - Verify subscription is reactivated
   - Cancel warning disappears

### Test 6: Billing Portal Access
1. As a subscriber, go to `/dashboard/billing`
2. Click "Manage Billing"
3. Verify:
   - Redirected to Stripe billing portal
   - Can update payment method
   - Can download invoices
   - Can change billing details

### Test 7: Upgrade Modal (if implemented in app)
```javascript
// Test in browser console
// Open upgrade modal programmatically
const event = new CustomEvent('openUpgradeModal');
window.dispatchEvent(event);
```

### Test 8: Subscription Status Component
1. Check dashboard sidebar/header
2. Verify subscription status badge shows:
   - Correct tier name
   - Appropriate color (gray=Free, blue=Core, purple=Full)
   - "Upgrade" link for non-Full users

### Test 9: Usage Tracking Display
1. In billing dashboard, verify usage shows:
   - Downloads this month (with progress bar)
   - Generator access count
   - Worksheets generated count
2. For Free users:
   - Shows "3/10 downloads"
   - Shows "5/5 generators"
3. For paid users:
   - Shows "Unlimited downloads"
   - Shows appropriate generator count

### Test 10: Error Handling
1. **Payment Failure:**
   - Use test card: 4000 0000 0000 0002
   - Verify error message appears
   - User returned to pricing page

2. **Network Error:**
   - Disable network in DevTools
   - Try to upgrade
   - Verify error toast appears

## Visual Regression Tests

### Desktop (1920x1080)
1. Pricing page layout
2. Billing dashboard layout
3. Upgrade modal appearance

### Mobile (375x667)
1. Pricing cards stack vertically
2. Billing dashboard responsive
3. Modal fits screen

## API Integration Tests

```bash
# Test checkout session creation
curl -X POST http://localhost:3000/api/stripe/checkout \
  -H "Content-Type: application/json" \
  -H "Cookie: session-token=YOUR_TOKEN" \
  -d '{"tier": "CORE"}'

# Test subscription status
curl http://localhost:3000/api/stripe/subscription \
  -H "Cookie: session-token=YOUR_TOKEN"
```

## Success Criteria
✅ Pricing page displays all three tiers correctly
✅ Checkout flow redirects to Stripe
✅ Successful payment updates user status
✅ Billing dashboard shows accurate information
✅ Cancel/reactivate functions work
✅ Billing portal accessible
✅ Usage statistics display correctly
✅ Upgrade prompts appear for eligible users
✅ Error states handled gracefully
✅ Mobile responsive design works

## Known Issues & Limitations

1. **Test Mode Only**: Currently using Stripe test keys
2. **Mock Usage Data**: Usage statistics are mocked (not from real data)
3. **No Proration UI**: Upgrade proration shown but not fully implemented
4. **Email Notifications**: Not yet sending payment confirmation emails

## Common Test Cards

- **Success**: 4242 4242 4242 4242
- **Decline**: 4000 0000 0000 0002
- **Insufficient Funds**: 4000 0000 0000 9995
- **3D Secure Required**: 4000 0025 0000 3155

## Debugging Tips

1. Check browser console for errors
2. Monitor Network tab for API calls
3. Use Stripe Dashboard to see events
4. Check webhook logs: `stripe logs tail`
5. Verify environment variables are set

## Next Steps
Step 11 will implement Payment Processing Frontend with:
- Checkout form embedding
- Payment method collection
- 3D Secure handling
- Receipt generation