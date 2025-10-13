import { NextRequest, NextResponse } from 'next/server';
import { withAdmin } from '@/lib/server-auth';
import { sendTestEmail } from '@/lib/email-campaigns';

export const dynamic = 'force-dynamic';

// POST /api/admin/email/test - Send a test email
export const POST = withAdmin(async (request: NextRequest) => {
  try {
    const body = await request.json();
    const { to, subject, html, text } = body;

    // Validate inputs
    if (!to || !subject || !html) {
      return NextResponse.json(
        { error: 'Email requires to, subject, and html fields' },
        { status: 400 }
      );
    }

    // Send test email (integrates with existing email system)
    const result = await sendTestEmail({
      to,
      subject,
      html,
      text,
    });

    if (result.success) {
      return NextResponse.json({
        message: 'Test email sent successfully',
      });
    } else {
      return NextResponse.json(
        { error: result.error || 'Failed to send test email' },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('Send test email error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to send test email' },
      { status: 500 }
    );
  }
});
