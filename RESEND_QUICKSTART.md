# Resend Quick Start - 5 Minutes Setup

## Fast Track Setup (Before Domain Verification)

### 1. Get API Key (2 minutes)
1. Go to https://resend.com → Sign up
2. Go to API Keys → Create API Key
3. Copy the key (starts with `re_`)

### 2. Configure Server (1 minute)
```bash
# SSH into server
ssh root@65.108.5.250

# Run setup script
cd /opt/lessoncraftstudio/frontend
chmod +x ../scripts/setup-resend.sh
../scripts/setup-resend.sh
```

The script will ask:
- **Domain verified?** → Type `n` (no, not yet)
- **API key?** → Paste your `re_...` key
- **Restart PM2?** → Type `y` (yes)

### 3. Test (2 minutes)
```bash
# Send test email
curl -X POST https://lessoncraftstudio.com/api/admin/email/test \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "to": "your-email@example.com",
    "subject": "Test Email",
    "html": "<h1>Hello!</h1><p>It works!</p>"
  }'
```

Or visit: https://lessoncraftstudio.com/admin/email/templates

**Done!** Emails will send from `onboarding@resend.dev`

---

## Verify Domain Later (Optional - For Custom From Address)

### Add DNS Records to Your Domain Provider

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

**Verification TXT:**
```
Type: TXT
Name: @
Value: [Get from Resend dashboard]
```

After DNS propagates (5-60 minutes):
1. Click "Verify Domain" in Resend
2. Update `.env`: Change `EMAIL_FROM_ADDRESS=noreply@lessoncraftstudio.com`
3. Restart: `pm2 restart lessoncraftstudio`

---

## Troubleshooting

**"SMTP connection failed"**
```bash
cd /opt/lessoncraftstudio/frontend
grep SMTP .env  # Check API key is correct
pm2 restart lessoncraftstudio
pm2 logs lessoncraftstudio --lines 20
```

**"Email not received"**
- Check spam folder
- Check Resend dashboard → Logs
- Verify API key is correct

**Need help?**
- Full guide: `RESEND_SETUP_GUIDE.md`
- Server logs: `pm2 logs lessoncraftstudio`
- Resend docs: https://resend.com/docs

---

## Cost

- **Free**: 3,000 emails/month (100/day) - Good for testing & transactional
- **Pro**: $20/month - 50,000 emails/month - Good for marketing campaigns

Start with free tier! ✅
