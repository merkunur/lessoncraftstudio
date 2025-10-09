# Professional Email System - LessonCraftStudio

Production-ready email infrastructure with queue support, retry logic, and multiple provider support.

## Features

✅ **Multiple Provider Support** - SendGrid, AWS SES, Postmark, or generic SMTP
✅ **Email Queue** - Reliable delivery with automatic retries
✅ **Priority System** - Critical, high, normal, low priorities
✅ **Scheduled Sending** - Send emails at a specific time
✅ **Error Handling** - Automatic retry with exponential backoff
✅ **Development Mode** - Console logging for local development
✅ **Admin Testing** - Built-in endpoint to test configuration

## Setup

### 1. Choose Your Email Provider

**Option A: SendGrid (Recommended for beginners)**
- Sign up at https://sendgrid.com
- Free tier: 100 emails/day
- Paid: $19.95/mo for 50k emails
- Best for: Easy setup, good deliverability

**Option B: AWS SES (Recommended for scale)**
- Sign up at https://aws.amazon.com/ses
- Cost: $0.10 per 1,000 emails
- Best for: High volume, AWS ecosystem

**Option C: Postmark (Recommended for transactional)**
- Sign up at https://postmarkapp.com
- Cost: $15/mo for 10k emails
- Best for: Highest deliverability, transactional focus

### 2. Configure Environment Variables

Edit `.env.local`:

```bash
# For SendGrid
EMAIL_PROVIDER=smtp
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=apikey
SMTP_PASSWORD=SG.your-actual-api-key-here

# For AWS SES
# EMAIL_PROVIDER=smtp
# SMTP_HOST=email-smtp.us-east-1.amazonaws.com
# SMTP_PORT=587
# SMTP_SECURE=false
# SMTP_USER=your-ses-smtp-username
# SMTP_PASSWORD=your-ses-smtp-password

# Email Addresses
SMTP_FROM_EMAIL=noreply@lessoncraftstudio.com
SMTP_FROM_NAME=LessonCraftStudio
EMAIL_REPLY_TO=support@lessoncraftstudio.com
```

### 3. Verify DNS Records

For production, configure these DNS records:

**SPF Record** (prevents spoofing):
```
TXT @ "v=spf1 include:sendgrid.net ~all"
```

**DKIM Record** (email authentication):
- Provided by your email service provider
- Add as TXT record

**DMARC Record** (reporting):
```
TXT _dmarc "v=DMARC1; p=none; rua=mailto:dmarc@lessoncraftstudio.com"
```

### 4. Test Configuration

```bash
# Test SMTP connection (as admin)
GET /api/email/test

# Send test email (as admin)
GET /api/email/test?send=true&to=your-email@example.com
```

## Usage

### Basic Email

```typescript
import { sendEmail } from '@/lib/email';

await sendEmail({
  to: 'user@example.com',
  subject: 'Welcome!',
  html: '<h1>Welcome to LessonCraftStudio</h1>',
});
```

### Priority Email

```typescript
await sendEmail(
  {
    to: 'user@example.com',
    subject: 'Critical: Payment Failed',
    html: '<p>Your payment failed...</p>',
  },
  {
    priority: 'critical', // critical | high | normal | low
  }
);
```

### Immediate Send (Skip Queue)

```typescript
await sendEmail(
  {
    to: 'user@example.com',
    subject: 'Verification Code',
    html: '<p>Your code: 123456</p>',
  },
  {
    immediate: true, // Send now, don't queue
  }
);
```

### Scheduled Email

```typescript
const sendAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // Tomorrow

await sendEmail(
  {
    to: 'user@example.com',
    subject: 'Reminder',
    html: '<p>Don\'t forget...</p>',
  },
  {
    sendAt, // Send at specific time
  }
);
```

### Email with Attachments

```typescript
await sendEmail({
  to: 'user@example.com',
  subject: 'Invoice Attached',
  html: '<p>Please find your invoice attached.</p>',
  attachments: [
    {
      filename: 'invoice.pdf',
      content: pdfBuffer,
      contentType: 'application/pdf',
    },
  ],
});
```

## Architecture

```
lib/email/
├── config.ts          # Email provider configuration
├── queue.ts           # Email queue with retry logic
└── README.md          # This file

lib/email.ts           # Main email API
```

### Queue System

The email queue provides reliability:

- **Automatic Retries**: 3 attempts by default (configurable)
- **Retry Delay**: 1 minute between retries (configurable)
- **Priority Queue**: Critical emails sent first
- **Failed Email Logging**: Stores failures for admin review

### Future Improvements

For production scale (>10k emails/day):

1. **Add Redis Queue**
   ```bash
   npm install bull @types/bull
   ```
   Replace in-memory queue with Bull/BullMQ

2. **Add Email Analytics**
   - Track opens (pixel tracking)
   - Track clicks (link tracking)
   - Bounce handling
   - Unsubscribe management

3. **Add Email Templates**
   - Use React Email for templates
   - Template versioning
   - A/B testing

## Monitoring

### Check Queue Status

```typescript
import emailQueue from '@/lib/email/queue';

const status = emailQueue.getStatus();
console.log(status);
// { queueLength: 5, processing: true }
```

### Production Monitoring

Monitor these metrics:

- **Delivery Rate**: Should be >95%
- **Bounce Rate**: Should be <5%
- **Queue Length**: Should stay <100
- **Failed Emails**: Should be <1%

## Troubleshooting

### Emails Not Sending

1. Check `.env.local` configuration
2. Test connection: `GET /api/email/test`
3. Check SMTP credentials are correct
4. Verify provider account is active
5. Check spam folder in recipient

### Emails Going to Spam

1. Verify SPF, DKIM, DMARC records
2. Warm up your domain (start slow)
3. Avoid spam trigger words
4. Use reputable provider
5. Monitor sender reputation

### Queue Processing Slow

1. Check queue length
2. Increase `maxConnections` in config
3. Consider Redis queue for scale
4. Check provider rate limits

## Security Best Practices

✅ Never expose SMTP credentials in client code
✅ Use environment variables only
✅ Validate email addresses before sending
✅ Rate limit email sending endpoints
✅ Log all email sending attempts
✅ Implement unsubscribe mechanism
✅ Comply with CAN-SPAM / GDPR

## Support

- **Documentation**: See Next.js app documentation
- **Provider Docs**:
  - [SendGrid](https://docs.sendgrid.com)
  - [AWS SES](https://docs.aws.amazon.com/ses)
  - [Postmark](https://postmarkapp.com/developer)
