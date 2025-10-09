import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * Mock Stripe checkout page
 * Simulates the Stripe checkout process for development/testing
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const sessionId = searchParams.get('session_id');
  const userId = searchParams.get('user_id');
  const tier = searchParams.get('tier');
  const interval = searchParams.get('interval');
  const successUrl = searchParams.get('success_url');

  if (!sessionId || !userId || !tier || !successUrl) {
    return NextResponse.json(
      { error: 'Missing required parameters' },
      { status: 400 }
    );
  }

  console.log('[MOCK CHECKOUT] Processing mock payment...');
  console.log('[MOCK CHECKOUT] User ID:', userId);
  console.log('[MOCK CHECKOUT] Tier:', tier);
  console.log('[MOCK CHECKOUT] Interval:', interval);

  try {
    // Update user's subscription tier in database
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        subscriptionTier: tier.toLowerCase(),
      }
    });

    console.log('[MOCK CHECKOUT] ✅ User subscription tier updated to:', tier);

    // Create a mock subscription record
    const currentPeriodEnd = new Date();
    currentPeriodEnd.setMonth(currentPeriodEnd.getMonth() + (interval === 'yearly' ? 12 : 1));

    // Generate planName in the format: "core_monthly", "core_yearly", "full_monthly", "full_yearly"
    const planName = `${tier.toLowerCase()}_${interval || 'monthly'}`;

    // Delete any existing subscription records first (to handle re-purchases)
    await prisma.subscription.deleteMany({
      where: { userId: userId }
    });
    console.log('[MOCK CHECKOUT] Deleted any existing subscription records');

    // Now create the new subscription record
    try {
      const subscription = await prisma.subscription.create({
        data: {
          userId: userId,
          planName: planName,
          status: 'active',
          billingInterval: interval || 'monthly',
          stripeSubscriptionId: `sub_mock_${Date.now()}`,
          currentPeriodStart: new Date(),
          currentPeriodEnd: currentPeriodEnd,
        }
      });
      console.log('[MOCK CHECKOUT] ✅ Mock subscription created:', subscription.id);
    } catch (subError) {
      console.error('[MOCK CHECKOUT] ❌ Failed to create subscription:', subError);
      throw subError; // Don't silently ignore this error!
    }

    // Create activity log
    try {
      await prisma.activityLog.create({
        data: {
          userId: userId,
          action: 'mock_checkout_completed',
          details: JSON.stringify({
            tier,
            interval,
            sessionId,
            mode: 'DEVELOPMENT_MOCK'
          })
        }
      });
    } catch (logError) {
      console.log('[MOCK CHECKOUT] Could not create activity log');
    }

    // Redirect to success URL with session_id
    const successUrlWithSession = `${successUrl}${successUrl.includes('?') ? '&' : '?'}session_id=${sessionId}`;

    console.log('[MOCK CHECKOUT] ✅ Redirecting to success URL:', successUrlWithSession);

    // Get plan details for display
    const planNames: Record<string, string> = {
      'CORE': 'Core Plan',
      'FULL': 'Full Plan'
    };

    // Real pricing from the pricing page
    const planPrices: Record<string, { monthly: number; yearly: number }> = {
      'CORE': { monthly: 15.00, yearly: 144.00 },
      'FULL': { monthly: 25.00, yearly: 240.00 }
    };

    const displayPlanName = planNames[tier.toUpperCase()] || 'Core Plan';
    const price = planPrices[tier.toUpperCase()]?.[interval === 'yearly' ? 'yearly' : 'monthly'] || 15.00;
    // Note: In production, Stripe automatically calculates and adds tax based on customer location
    const billingPeriod = interval === 'yearly' ? 'year' : 'month';
    const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const invoiceNumber = 'INV-DEV-' + Date.now().toString().slice(-8);

    // Return a professional checkout page that shows invoice details and auto-redirects
    return new NextResponse(
      `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Checkout - LessonCraftStudio</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 2rem;
    }
    .checkout-container {
      background: white;
      border-radius: 1rem;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
      max-width: 600px;
      width: 100%;
      overflow: hidden;
    }
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 2rem;
      text-align: center;
    }
    .header h1 {
      font-size: 1.75rem;
      margin-bottom: 0.5rem;
    }
    .dev-badge {
      display: inline-block;
      background: rgba(255,255,255,0.2);
      padding: 0.25rem 0.75rem;
      border-radius: 0.5rem;
      font-size: 0.75rem;
      font-weight: 600;
      margin-top: 0.5rem;
    }
    .content {
      padding: 2rem;
    }
    .invoice-section {
      margin-bottom: 2rem;
    }
    .invoice-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 1.5rem;
      padding-bottom: 1rem;
      border-bottom: 2px solid #e5e7eb;
    }
    .invoice-header h2 {
      color: #1f2937;
      font-size: 1.25rem;
    }
    .invoice-number {
      color: #6b7280;
      font-size: 0.875rem;
    }
    .plan-details {
      background: #f9fafb;
      padding: 1.5rem;
      border-radius: 0.5rem;
      margin-bottom: 1.5rem;
    }
    .plan-name {
      font-size: 1.5rem;
      font-weight: 700;
      color: #1f2937;
      margin-bottom: 0.5rem;
    }
    .plan-description {
      color: #6b7280;
      font-size: 0.875rem;
    }
    .price-breakdown {
      margin: 1.5rem 0;
    }
    .price-row {
      display: flex;
      justify-content: space-between;
      padding: 0.75rem 0;
      border-bottom: 1px solid #e5e7eb;
    }
    .price-row.total {
      border-top: 2px solid #1f2937;
      border-bottom: none;
      font-weight: 700;
      font-size: 1.125rem;
      color: #1f2937;
      padding-top: 1rem;
    }
    .features {
      margin-top: 1.5rem;
    }
    .features h3 {
      color: #1f2937;
      font-size: 1rem;
      margin-bottom: 1rem;
    }
    .feature-item {
      display: flex;
      align-items: start;
      margin-bottom: 0.75rem;
    }
    .checkmark {
      color: #10b981;
      margin-right: 0.75rem;
      font-size: 1.25rem;
    }
    .feature-text {
      color: #4b5563;
      font-size: 0.875rem;
    }
    .processing-section {
      text-align: center;
      padding: 2rem;
      background: #fef3c7;
      border-radius: 0.5rem;
    }
    .spinner {
      border: 4px solid #fde68a;
      border-top: 4px solid #f59e0b;
      border-radius: 50%;
      width: 50px;
      height: 50px;
      animation: spin 1s linear infinite;
      margin: 0 auto 1rem;
    }
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    .processing-text {
      color: #92400e;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }
    .timer {
      color: #d97706;
      font-size: 0.875rem;
    }
  </style>
</head>
<body>
  <div class="checkout-container">
    <div class="header">
      <h1>✨ LessonCraftStudio</h1>
      <p>Secure Checkout</p>
      <div class="dev-badge">🧪 DEVELOPMENT MODE - TEST PAYMENT</div>
    </div>

    <div class="content">
      <div class="invoice-section">
        <div class="invoice-header">
          <h2>Order Summary</h2>
          <div class="invoice-number">Invoice #${invoiceNumber}</div>
        </div>

        <div class="plan-details">
          <div class="plan-name">${displayPlanName}</div>
          <div class="plan-description">Billed ${billingPeriod}ly • ${today}</div>
        </div>

        <div class="price-breakdown">
          <div class="price-row">
            <span>${displayPlanName} (${interval === 'yearly' ? 'Yearly' : 'Monthly'})</span>
            <span>$${price.toFixed(2)}</span>
          </div>
          <div class="price-row total">
            <span>Amount Due</span>
            <span>$${price.toFixed(2)}</span>
          </div>
          <div style="margin-top: 1rem; padding: 0.75rem; background: #f3f4f6; border-radius: 0.375rem;">
            <p style="font-size: 0.75rem; color: #6b7280; margin: 0;">
              💡 Tax will be automatically calculated by Stripe based on your location during checkout
            </p>
          </div>
        </div>

        <div class="features">
          <h3>✓ What's Included:</h3>
          <div class="feature-item">
            <span class="checkmark">✓</span>
            <span class="feature-text">Access to ${tier === 'CORE' ? '10 popular' : 'all 33+'} worksheet generators</span>
          </div>
          <div class="feature-item">
            <span class="checkmark">✓</span>
            <span class="feature-text">Unlimited worksheet generation</span>
          </div>
          <div class="feature-item">
            <span class="checkmark">✓</span>
            <span class="feature-text">No watermarks</span>
          </div>
          <div class="feature-item">
            <span class="checkmark">✓</span>
            <span class="feature-text">High-quality PDF downloads</span>
          </div>
          <div class="feature-item">
            <span class="checkmark">✓</span>
            <span class="feature-text">${tier === 'FULL' ? 'Priority' : 'Email'} support</span>
          </div>
          ${tier === 'FULL' ? `
          <div class="feature-item">
            <span class="checkmark">✓</span>
            <span class="feature-text">Commercial license included</span>
          </div>
          ` : ''}
        </div>
      </div>

      <div class="processing-section">
        <div class="spinner"></div>
        <div class="processing-text">Processing Payment...</div>
        <div class="timer">Completing in <span id="countdown">3</span> seconds</div>
      </div>
    </div>
  </div>

  <script>
    let countdown = 3;
    const countdownEl = document.getElementById('countdown');

    const timer = setInterval(() => {
      countdown--;
      countdownEl.textContent = countdown;

      if (countdown <= 0) {
        clearInterval(timer);
        window.location.href = '${successUrlWithSession}';
      }
    }, 1000);
  </script>
</body>
</html>`,
      {
        status: 200,
        headers: {
          'Content-Type': 'text/html',
        },
      }
    );
  } catch (error) {
    console.error('[MOCK CHECKOUT] Error processing mock payment:', error);
    return NextResponse.json(
      { error: 'Failed to process mock payment' },
      { status: 500 }
    );
  }
}
