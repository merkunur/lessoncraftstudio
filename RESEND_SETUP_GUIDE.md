# Resend Email Service Setup Guide

Complete guide to connect Resend with your LessonCraftStudio email campaign system.

## Step 1: Sign Up for Resend

1. **Go to https://resend.com**
2. **Click "Start Building" or "Sign Up"**
3. **Sign up with your email or GitHub**

**Pricing** (as of 2025):
- Free: 3,000 emails/month, 100 emails/day
- Pro ($20/month): 50,000 emails/month
- Start with free tier to test everything

---

## Step 2: Verify Your Domain

**Why?** To send emails from `noreply@lessoncraftstudio.com` instead of `@resend.dev`

### 2.1 Add Your Domain

1. **In Resend dashboard, go to "Domains"**
2. **Click "Add Domain"**
3. **Enter:** `lessoncraftstudio.com`
4. **Click "Add"**

### 2.2 Add DNS Records

Resend will show you DNS records to add. You need to add these to your domain registrar:

**Example DNS Records:**
```
Type: TXT
Name: @
Value: resend-verification=abc123xyz...
```

**SPF Record:**
```
Type: TXT
Name: @
Value: v=spf1 include:_spf.resend.com ~all
```

**DKIM Records:**
```
Type: CNAME
Name: resend1._domainkey
Value: resend1._domainkey.resend.com

Type: CNAME
Name: resend2._domainkey
Value: resend2._domainkey.resend.com
```

**Where to add these?**
- If using Cloudflare: Go to DNS settings
- If using Namecheap/GoDaddy: Go to DNS management
- If unsure: Check with your domain provider

### 2.3 Verify Domain

1. **After adding DNS records, click "Verify Domain" in Resend**
2. **DNS propagation takes 5-60 minutes**
3. **Status will change from "Pending" to "Verified"**

**Note:** You can skip this step temporarily and use the default `@resend.dev` domain for testing!

---

## Step 3: Get Your API Key

1. **In Resend dashboard, go to "API Keys"**
2. **Click "Create API Key"**
3. **Name:** `LessonCraftStudio Production`
4. **Permission:** Full access (or "Sending access" only)
5. **Click "Create"**
6. **COPY THE API KEY** - you won't see it again!

Example API key format: `re_123abc456def789ghi012jkl345mno678`

---

## Step 4: Configure Your Production Server

Now let's add the email configuration to your server.

### 4.1 SSH into Your Server

```bash
# From your Windows machine (or use PuTTY)
ssh root@65.108.5.250
```

### 4.2 Edit the .env File

```bash
cd /opt/lessoncraftstudio/frontend
nano .env
```

### 4.3 Add Email Configuration

**Add these lines to your `.env` file:**

```bash
# ============================================
# EMAIL CONFIGURATION (Resend)
# ============================================

# Email Provider
EMAIL_PROVIDER=smtp

# From Address (change after domain verification)
EMAIL_FROM_ADDRESS=noreply@lessoncraftstudio.com
EMAIL_FROM_NAME=LessonCraftStudio
EMAIL_REPLY_TO=support@lessoncraftstudio.com

# Resend SMTP Configuration
SMTP_HOST=smtp.resend.com
SMTP_PORT=587
SMTP_USER=resend
SMTP_PASSWORD=re_YOUR_API_KEY_HERE
SMTP_SECURE=false
```

**Important:** Replace `re_YOUR_API_KEY_HERE` with your actual Resend API key!

**If domain not verified yet, use:**
```bash
EMAIL_FROM_ADDRESS=onboarding@resend.dev
```

### 4.4 Save and Exit

- Press `Ctrl + O` to save
- Press `Enter` to confirm
- Press `Ctrl + X` to exit

### 4.5 Restart PM2

```bash
pm2 restart lessoncraftstudio
```

### 4.6 Verify PM2 is Running

```bash
pm2 logs lessoncraftstudio --lines 20
```

Look for: `[Email] Configuring smtp transporter`

---

## Step 5: Test Your Email System

### 5.1 Test via Admin Panel

1. **Go to:** https://lessoncraftstudio.com/admin/email/templates
2. **Login as admin**
3. **Click "New Template"**
4. **Create a simple test template:**
   - Name: `test`
   - Subject: `Test Email from LessonCraftStudio`
   - HTML Content:
   ```html
   <h1>Hello!</h1>
   <p>This is a test email from your new email campaign system.</p>
   <p>If you're reading this, everything works! 🎉</p>
   ```
5. **Save the template**

### 5.2 Send Test Email

**Option A: Via API (Quick Test)**

Create a file `test-email.sh`:

```bash
#!/bin/bash

# Get your admin JWT token first by logging in
TOKEN="your_admin_jwt_token"

curl -X POST https://lessoncraftstudio.com/api/admin/email/test \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "to": "your-email@example.com",
    "subject": "Test Email",
    "html": "<h1>Hello!</h1><p>This is a test email.</p>"
  }'
```

**Option B: Via Campaign (Full Test)**

1. **Go to:** https://lessoncraftstudio.com/admin/email/campaigns
2. **Click "New Campaign"**
3. **Fill in:**
   - Name: `Test Campaign`
   - Subject: `Test Email`
   - Target: Custom (enter your email)
   - HTML Content: `<h1>Hello!</h1><p>Test campaign email.</p>`
4. **Save as Draft**
5. **Click "Send Campaign"**
6. **Check your email!**

---

## Step 6: Configure Webhooks (Optional - For Tracking)

Webhooks allow you to track email opens, clicks, and bounces.

### 6.1 Add Webhook in Resend

1. **Go to Resend dashboard → Webhooks**
2. **Click "Add Endpoint"**
3. **Endpoint URL:** `https://lessoncraftstudio.com/api/webhooks/email`
4. **Events to track:**
   - ✅ `email.delivered`
   - ✅ `email.opened`
   - ✅ `email.clicked`
   - ✅ `email.bounced`
   - ✅ `email.complained`
5. **Click "Create Webhook"**

### 6.2 Test Webhook

1. **In Resend webhook dashboard, click "Send Test Event"**
2. **Check your server logs:**
```bash
pm2 logs lessoncraftstudio --lines 50 | grep "Email webhook"
```

You should see: `Email webhook received: email.delivered`

---

## Step 7: Verify Everything Works

### Checklist:

- [ ] Resend account created
- [ ] Domain added to Resend (or using @resend.dev for testing)
- [ ] API key generated
- [ ] Environment variables added to production server
- [ ] PM2 restarted successfully
- [ ] Test email sent and received
- [ ] Webhook configured (optional)
- [ ] Email logs showing in Admin Panel → Email → Logs

---

## Troubleshooting

### Issue: "SMTP connection failed"

**Check:**
```bash
cd /opt/lessoncraftstudio/frontend
cat .env | grep SMTP
```

Make sure:
- `SMTP_PASSWORD` has your actual API key (starts with `re_`)
- No spaces around the `=` sign
- API key is wrapped in quotes if it contains special characters

### Issue: "Email not received"

**Check:**
1. **Spam folder** - First time emails often go to spam
2. **Resend dashboard** - Go to "Logs" to see delivery status
3. **Server logs:**
```bash
pm2 logs lessoncraftstudio --lines 50
```

### Issue: "Domain not verified"

**Temporary workaround:**
```bash
EMAIL_FROM_ADDRESS=onboarding@resend.dev
```

Then restart PM2:
```bash
pm2 restart lessoncraftstudio
```

### Issue: "API key invalid"

**Regenerate API key:**
1. Go to Resend dashboard → API Keys
2. Delete old key
3. Create new key
4. Update `.env` file
5. Restart PM2

---

## Security Best Practices

1. **Never commit API keys to git**
   - API keys should only be in `.env` files
   - `.env` files are gitignored

2. **Use separate API keys for staging/production**
   - Create different keys for different environments

3. **Rotate API keys regularly**
   - Every 6 months, generate new keys

4. **Monitor email usage**
   - Set up alerts in Resend for unusual sending patterns

---

## Cost Estimation

**Free Tier (3,000 emails/month):**
- Good for: Testing, small apps, up to ~100 emails/day
- Sufficient for: User verifications, password resets, receipts

**Pro Tier ($20/month - 50,000 emails/month):**
- Good for: Marketing campaigns, newsletters
- Sufficient for: ~1,600 emails/day

**Your Current Needs:**
- Transactional emails (verification, receipts): ~500/month
- Campaign emails (if you send): Depends on user base

**Recommendation:** Start with free tier, upgrade when needed.

---

## Next Steps After Setup

1. **Create email templates** for common use cases:
   - Welcome email
   - Newsletter template
   - Feature announcement
   - Promotion/sale notification

2. **Set up your first campaign**:
   - Target a small group first (10-20 users)
   - Monitor delivery and open rates
   - Adjust based on results

3. **Monitor email health**:
   - Check bounce rates (should be < 5%)
   - Check spam complaints (should be < 0.1%)
   - Maintain good sender reputation

4. **Build your subscriber list**:
   - Add email preferences to user settings
   - Allow users to opt-in to marketing emails
   - Respect unsubscribe requests immediately

---

## Support Resources

**Resend:**
- Documentation: https://resend.com/docs
- Status page: https://status.resend.com
- Support: support@resend.com

**Your Email System:**
- Check logs: `pm2 logs lessoncraftstudio`
- View email logs: https://lessoncraftstudio.com/admin/email/logs
- Test endpoint: https://lessoncraftstudio.com/api/admin/email/test

---

**Setup completed?** Test by sending yourself an email! 🎉
