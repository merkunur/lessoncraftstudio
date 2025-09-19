# Step 11: Payment Processing Frontend - Test Guide

## Overview
This step implements advanced payment processing features including embedded checkout, payment element integration, 3D Secure handling, and receipt generation.

## Components Created

### 1. Embedded Checkout Component
- `EmbeddedCheckoutForm`: Stripe-hosted checkout embedded in your app
- Seamless payment experience without redirects
- Automatic session creation and management

### 2. Payment Method Component
- `PaymentMethodForm`: Collect payment details with Stripe Elements
- Support for cards, bank transfers, and wallets
- Built-in 3D Secure authentication
- Real-time validation and error handling

### 3. Payment Success Page
- Confirmation page after successful payment
- Payment details display
- Receipt download functionality
- Next steps guidance

### 4. Receipt Generation
- PDF receipt generation API
- Downloadable receipts for all payments
- Professional receipt format with branding

## Testing Instructions

### Prerequisites
1. Ensure Stripe keys are configured in `.env.local`
2. Run Stripe webhook listener:
```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```
3. Start development server:
```bash
cd frontend
npm run dev
```

### Test 1: Embedded Checkout Form
1. Create a test component that uses `EmbeddedCheckoutForm`:
```tsx
import EmbeddedCheckoutForm from '@/components/payment/embedded-checkout';

function TestPage() {
  return (
    <EmbeddedCheckoutForm 
      tier="CORE"
      onSuccess={() => console.log('Success!')}
      onCancel={() => console.log('Cancelled')}
    />
  );
}
```
2. Verify:
   - Checkout form loads inline
   - Can enter payment details
   - Success redirects properly

### Test 2: Payment Element Form
1. Test payment collection with PaymentMethodForm
2. Use test cards:
   - **Success**: 4242 4242 4242 4242
   - **3D Secure**: 4000 0025 0000 3155
   - **Decline**: 4000 0000 0000 0002
3. Verify:
   - Form validates card details
   - 3D Secure modal appears when needed
   - Errors display properly

### Test 3: Payment Success Flow
1. Complete a payment through checkout
2. Verify redirect to `/payment/success`
3. Check that page displays:
   - Success animation
   - Payment amount and details
   - Receipt download button
   - Navigation options

### Test 4: 3D Secure Authentication
1. Use test card: 4000 0025 0000 3155
2. Complete checkout
3. Verify:
   - 3D Secure authentication modal appears
   - Can complete authentication
   - Payment succeeds after authentication
   - Proper redirect on failure

### Test 5: Receipt Generation
1. Complete a successful payment
2. On success page, click "Download Receipt"
3. Verify:
   - PDF downloads successfully
   - Receipt contains correct information:
     - Payment amount
     - Date and receipt number
     - User details
     - Item description
   - Professional formatting

### Test 6: Payment Method Management
```bash
# Test adding a payment method
curl -X POST http://localhost:3000/api/stripe/payment-method \
  -H "Content-Type: application/json" \
  -H "Cookie: session-token=YOUR_TOKEN" \
  -d '{"type": "card"}'
```

### Test 7: Error Handling
1. **Insufficient Funds**: Use card 4000 0000 0000 9995
   - Verify error message appears
   - User can retry with different card

2. **Network Error**: Disconnect internet during payment
   - Verify graceful error handling
   - Retry option available

### Test 8: Mobile Responsiveness
1. Test on mobile viewport (375x667)
2. Verify:
   - Payment forms fit screen
   - Touch-friendly inputs
   - 3D Secure modal works on mobile
   - Success page responsive

### Test 9: Receipt List API
```bash
# Get user's receipts
curl http://localhost:3000/api/stripe/receipt \
  -H "Cookie: session-token=YOUR_TOKEN"

# Should return:
# {
#   "receipts": [
#     {
#       "id": "pay_xxx",
#       "date": "2024-12-19",
#       "amount": 9.99,
#       "currency": "usd",
#       "downloadUrl": "/api/stripe/receipt?id=pay_xxx"
#     }
#   ]
# }
```

### Test 10: Payment Intent Details
```bash
# Get payment details
curl http://localhost:3000/api/stripe/payment-intent/pi_xxx \
  -H "Cookie: session-token=YOUR_TOKEN"
```

## Browser Console Tests

```javascript
// Test Stripe initialization
console.log('Stripe loaded:', typeof Stripe !== 'undefined');

// Check for payment element
const elements = document.querySelectorAll('.StripeElement');
console.log('Payment elements found:', elements.length);

// Verify 3D Secure frame
const frames = document.querySelectorAll('iframe[name*="stripe"]');
console.log('Stripe frames:', frames.length);
```

## Security Tests

1. **CSRF Protection**: Verify all payment APIs require authentication
2. **Amount Tampering**: Confirm amounts can't be modified client-side
3. **Customer Verification**: Ensure users can only access their own payments
4. **Webhook Signature**: Test webhook rejects unsigned requests

## Performance Tests

1. **Checkout Load Time**: Should load within 2 seconds
2. **Payment Processing**: Should complete within 5 seconds
3. **Receipt Generation**: PDF should generate within 1 second
4. **3D Secure**: Modal should appear within 2 seconds

## Success Criteria
✅ Embedded checkout loads and functions
✅ Payment element collects card details
✅ 3D Secure authentication works
✅ Success page displays payment details
✅ Receipts generate and download
✅ Error states handled gracefully
✅ Mobile responsive design
✅ All test cards work as expected
✅ Security measures in place
✅ Performance targets met

## Common Issues & Solutions

### Issue: "Stripe is not defined"
- Solution: Ensure Stripe.js is loaded before components mount
- Check that publishable key is set in environment

### Issue: 3D Secure not appearing
- Solution: Use test card 4000 0025 0000 3155
- Ensure return_url is set correctly

### Issue: Receipt download fails
- Solution: Check jsPDF is installed
- Verify user has completed payment

### Issue: Payment element not showing
- Solution: Check client secret is valid
- Ensure Stripe Elements Provider wraps component

## Test Payment Scenarios

1. **Successful Payment**
   - Card: 4242 4242 4242 4242
   - Any future expiry, any CVC

2. **3D Secure Required**
   - Card: 4000 0025 0000 3155
   - Complete authentication

3. **3D Secure Fail**
   - Card: 4000 0000 0000 3220
   - Fail authentication

4. **Insufficient Funds**
   - Card: 4000 0000 0000 9995

5. **Card Declined**
   - Card: 4000 0000 0000 0002

6. **Processing Error**
   - Card: 4000 0000 0000 0119

## Next Steps
Step 12 will implement Usage Tracking System with:
- Download limits enforcement
- Generator access control
- Usage analytics
- Quota management