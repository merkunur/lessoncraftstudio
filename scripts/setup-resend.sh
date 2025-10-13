#!/bin/bash

# Resend Email Configuration Setup Script
# This script helps you configure Resend email service

echo "================================================"
echo "  LessonCraftStudio - Resend Email Setup"
echo "================================================"
echo ""

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "❌ Error: .env file not found!"
    echo "Please run this script from /opt/lessoncraftstudio/frontend/"
    exit 1
fi

# Backup .env file
echo "📋 Creating backup of .env file..."
cp .env .env.backup.$(date +%Y%m%d_%H%M%S)
echo "✅ Backup created"
echo ""

# Prompt for configuration
echo "📧 Email Configuration"
echo "====================="
echo ""

# Check if domain is verified
read -p "Has your domain been verified in Resend? (y/n): " domain_verified

if [ "$domain_verified" = "y" ]; then
    from_email="noreply@lessoncraftstudio.com"
    echo "✅ Using custom domain email"
else
    from_email="onboarding@resend.dev"
    echo "⚠️  Using Resend default domain (verify your domain later)"
fi

echo ""
read -p "Enter your Resend API key (starts with re_): " api_key

if [[ ! $api_key =~ ^re_ ]]; then
    echo "⚠️  Warning: API key doesn't start with 're_'. Are you sure it's correct?"
    read -p "Continue anyway? (y/n): " continue
    if [ "$continue" != "y" ]; then
        echo "Setup cancelled."
        exit 0
    fi
fi

echo ""
echo "🔧 Configuring email settings..."
echo ""

# Remove any existing email configuration
sed -i '/^EMAIL_PROVIDER=/d' .env
sed -i '/^EMAIL_FROM_ADDRESS=/d' .env
sed -i '/^EMAIL_FROM_NAME=/d' .env
sed -i '/^EMAIL_REPLY_TO=/d' .env
sed -i '/^SMTP_HOST=/d' .env
sed -i '/^SMTP_PORT=/d' .env
sed -i '/^SMTP_USER=/d' .env
sed -i '/^SMTP_PASSWORD=/d' .env
sed -i '/^SMTP_SECURE=/d' .env

# Add new configuration
cat >> .env << EOF

# ============================================
# EMAIL CONFIGURATION (Resend)
# Added: $(date)
# ============================================
EMAIL_PROVIDER=smtp
EMAIL_FROM_ADDRESS=$from_email
EMAIL_FROM_NAME=LessonCraftStudio
EMAIL_REPLY_TO=support@lessoncraftstudio.com

# Resend SMTP Configuration
SMTP_HOST=smtp.resend.com
SMTP_PORT=587
SMTP_USER=resend
SMTP_PASSWORD=$api_key
SMTP_SECURE=false
EOF

echo "✅ Email configuration added to .env"
echo ""

# Show configuration (without revealing full API key)
echo "📋 Configuration Summary:"
echo "========================"
echo "Provider: Resend (SMTP)"
echo "From Address: $from_email"
echo "From Name: LessonCraftStudio"
echo "SMTP Host: smtp.resend.com"
echo "SMTP Port: 587"
echo "API Key: ${api_key:0:7}...${api_key: -4}"
echo ""

# Offer to restart PM2
read -p "Restart PM2 to apply changes? (y/n): " restart_pm2

if [ "$restart_pm2" = "y" ]; then
    echo ""
    echo "🔄 Restarting PM2..."
    pm2 restart lessoncraftstudio
    echo ""
    echo "✅ PM2 restarted"
    echo ""

    # Show logs
    echo "📋 Recent logs (checking for email configuration):"
    echo "=================================================="
    sleep 2
    pm2 logs lessoncraftstudio --nostream --lines 10 | grep -i email
fi

echo ""
echo "================================================"
echo "  ✅ Setup Complete!"
echo "================================================"
echo ""
echo "Next steps:"
echo "1. Go to https://lessoncraftstudio.com/admin/email/templates"
echo "2. Create a test template"
echo "3. Send a test email to yourself"
echo "4. Check the logs: pm2 logs lessoncraftstudio"
echo ""
echo "If domain not verified yet:"
echo "- Emails will be sent from: onboarding@resend.dev"
echo "- Add DNS records in Resend dashboard"
echo "- Verify domain"
echo "- Update EMAIL_FROM_ADDRESS and restart PM2"
echo ""
echo "Troubleshooting:"
echo "- View logs: pm2 logs lessoncraftstudio --lines 50"
echo "- Test email: https://lessoncraftstudio.com/admin/email/test"
echo "- Resend logs: https://resend.com/logs"
echo ""
echo "Configuration backup saved to: .env.backup.*"
echo ""
