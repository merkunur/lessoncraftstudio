/**
 * Quick Email Test Script
 * Tests if Resend SMTP is working
 */

const nodemailer = require('nodemailer');

async function testEmail() {
  console.log('🔧 Creating SMTP transporter...');

  const transporter = nodemailer.createTransport({
    host: 'smtp.resend.com',
    port: 587,
    secure: false,
    auth: {
      user: 'resend',
      pass: 're_QDWTDWus_K3mStC7AK9CqbzZM7YXuHNvB'
    }
  });

  console.log('✅ Transporter created');
  console.log('');
  console.log('📧 Sending test email...');

  try {
    const info = await transporter.sendMail({
      from: '"LessonCraftStudio" <onboarding@resend.dev>',
      to: 'merkunur@gmail.com', // Change this to your email
      subject: '✅ Test Email - LessonCraftStudio Email System',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #4F46E5;">🎉 Email System Test Successful!</h1>
          <p>This is a test email from your LessonCraftStudio automatic email system.</p>

          <div style="background: #F3F4F6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="margin-top: 0;">✅ System Status</h2>
            <ul>
              <li><strong>SMTP Provider:</strong> Resend</li>
              <li><strong>SMTP Host:</strong> smtp.resend.com</li>
              <li><strong>From Address:</strong> onboarding@resend.dev</li>
              <li><strong>Status:</strong> ✅ Working</li>
              <li><strong>Timestamp:</strong> ${new Date().toLocaleString()}</li>
            </ul>
          </div>

          <h3>📧 Automatic Emails Configured:</h3>
          <ol>
            <li>✅ Verification Email (on signup)</li>
            <li>✅ Welcome Email (after email verification)</li>
            <li>✅ Subscription Upgrade Confirmation</li>
            <li>✅ Payment Receipt Email</li>
            <li>✅ Failed Payment Notification</li>
          </ol>

          <p style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #E5E7EB; color: #6B7280; font-size: 14px;">
            If you received this email, your automatic email system is working correctly!
          </p>
        </div>
      `
    });

    console.log('✅ Email sent successfully!');
    console.log('');
    console.log('📋 Details:');
    console.log('   Message ID:', info.messageId);
    console.log('   Response:', info.response);
    console.log('');
    console.log('✅ Check your inbox: merkunur@gmail.com');
    console.log('   (Check spam folder if not in inbox)');

  } catch (error) {
    console.error('❌ Error sending email:', error.message);
    console.error('');
    console.error('Full error:', error);
  }
}

testEmail();
