import { NextRequest, NextResponse } from 'next/server';
import { updateEmailLogStatus } from '@/lib/email-campaigns';

/**
 * Webhook endpoint for email provider (Resend)
 * This endpoint receives events from the email provider about email status
 *
 * Resend Webhook Events:
 * - email.sent
 * - email.delivered
 * - email.delivery_delayed
 * - email.complained
 * - email.bounced
 * - email.opened
 * - email.clicked
 *
 * Setup in Resend Dashboard:
 * https://resend.com/webhooks
 * Add webhook URL: https://lessoncraftstudio.com/api/webhooks/email
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, data } = body;

    console.log('Email webhook received:', type, data);

    // Verify webhook signature (optional but recommended)
    // const signature = request.headers.get('svix-signature');
    // if (!verifyWebhookSignature(signature, body)) {
    //   return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    // }

    // Process different event types
    switch (type) {
      case 'email.sent':
        // Email was accepted by the provider
        break;

      case 'email.delivered':
        // Email was successfully delivered
        if (data.email && data.subject) {
          await updateEmailLogStatus({
            email: data.email,
            subject: data.subject,
            status: 'delivered',
            timestamp: new Date(data.created_at),
          });
        }
        break;

      case 'email.opened':
        // Email was opened by recipient
        if (data.email && data.subject) {
          await updateEmailLogStatus({
            email: data.email,
            subject: data.subject,
            status: 'opened',
            timestamp: new Date(data.created_at),
          });
        }
        break;

      case 'email.clicked':
        // Link in email was clicked
        if (data.email && data.subject) {
          await updateEmailLogStatus({
            email: data.email,
            subject: data.subject,
            status: 'clicked',
            timestamp: new Date(data.created_at),
          });
        }
        break;

      case 'email.bounced':
        // Email bounced
        if (data.email && data.subject) {
          await updateEmailLogStatus({
            email: data.email,
            subject: data.subject,
            status: 'bounced',
            timestamp: new Date(data.created_at),
          });
        }
        break;

      case 'email.complained':
        // Email was marked as spam
        if (data.email && data.subject) {
          await updateEmailLogStatus({
            email: data.email,
            subject: data.subject,
            status: 'spam',
            timestamp: new Date(data.created_at),
          });
        }
        break;

      default:
        console.log('Unknown webhook event type:', type);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Email webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

// Allow GET for webhook verification
export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: 'Email webhook endpoint is active',
    url: 'https://lessoncraftstudio.com/api/webhooks/email',
  });
}
