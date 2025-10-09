# Stripe Tax Integration Guide - LessonCraftStudio

Complete guide for setting up automatic tax calculation with Stripe Tax.

## 🌍 What is Stripe Tax?

Stripe Tax automatically calculates and collects sales tax, VAT, and GST for your SaaS subscriptions. It:
- ✅ Calculates tax for 50+ countries
- ✅ Updates tax rates automatically
- ✅ Provides tax reports for compliance
- ✅ Handles reverse charge VAT in EU
- ✅ Supports threshold monitoring

## 📋 Prerequisites

1. **Stripe Account** - Active Stripe account with API access
2. **Business Registration** - Your business must be registered
3. **Tax Nexus** - Determine where you have tax obligations
4. **Pricing** - Stripe Tax costs 0.5% of transaction value + standard Stripe fees

## 🚀 Setup Steps

### Step 1: Enable Stripe Tax in Dashboard

1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Navigate to **Settings** → **Tax**
3. Click **"Enable Stripe Tax"**
4. Complete the onboarding questionnaire:
   - Business location
   - Business type (SaaS/Digital services)
   - Where you sell to

### Step 2: Configure Tax Settings

#### A. Set Your Product Tax Category

1. Go to **Products** → **Tax settings**
2. For digital products/SaaS, select:
   - **Tax code:** `txcd_10000000` (Digital products)
   - This ensures correct VAT/GST treatment globally

#### B. Configure Tax Registrations

1. Go to **Settings** → **Tax** → **Registrations**
2. Add registrations for each country/state where you have tax nexus:

**Example: United States**
```
Country: United States
State: California (if you have nexus there)
Tax ID: Your state tax ID
Start collecting: [Date you have nexus]
```

**Example: European Union**
```
Country: European Union (via OSS)
VAT Number: Your EU VAT number
Start collecting: [Registration date]
Registration type: OSS (One Stop Shop)
```

**Example: United Kingdom**
```
Country: United Kingdom
VAT Number: Your UK VAT number
Start collecting: [Registration date]
```

### Step 3: Configure Customer Tax Collection

1. Go to **Settings** → **Tax** → **Customer data**
2. Enable **"Collect tax IDs from customers"**
3. This allows EU businesses to provide VAT numbers for reverse charge

### Step 4: Test in Test Mode

1. Switch to **Test mode** in Stripe Dashboard
2. Create a test checkout session (our code already supports this)
3. Test scenarios:
   - US customer (sales tax calculation)
   - EU B2C customer (VAT added)
   - EU B2B customer with VAT number (reverse charge)
   - UK customer (VAT added)

**Test VAT Numbers:**
```
Valid EU VAT: DE123456789 (Germany)
Valid UK VAT: GB123456789 (United Kingdom)
Invalid VAT: INVALID123
```

### Step 5: Environment Variables

Add to `.env.local`:
```bash
# Stripe Tax Configuration
STRIPE_TAX_ENABLED=true

# Optional: Set default tax behavior
# (Usually handled automatically by Stripe Tax)
STRIPE_DEFAULT_TAX_BEHAVIOR=exclusive  # Tax added on top of price
```

### Step 6: Go Live

1. Complete all test scenarios
2. Switch to **Live mode**
3. Verify tax registrations are active
4. Monitor first transactions in **Stripe Dashboard** → **Tax**

## 📊 Tax Reporting

### Monthly Tax Reports

1. Go to **Stripe Dashboard** → **Reports** → **Tax**
2. Download monthly tax reports for filing
3. Reports include:
   - Tax collected by jurisdiction
   - Exempt transactions
   - Reverse charge transactions
   - Customer tax IDs

### Automated Filing (Available in some regions)

1. Go to **Settings** → **Tax** → **Automate**
2. Enable automated filing for supported regions
3. Stripe will file and remit taxes on your behalf

## 🔍 Monitoring

### Dashboard Views

Check these regularly:
1. **Tax** → **Overview**: Current month's tax collected
2. **Tax** → **Transactions**: Individual transaction details
3. **Tax** → **Registrations**: Active tax registrations

### Key Metrics to Monitor

- **Tax collection rate**: Should be ~90%+ of eligible transactions
- **Failed tax calculations**: Should be <1%
- **Missing customer locations**: Monitor and address
- **Threshold monitoring**: Track when approaching registration thresholds

## 🌐 Country-Specific Notes

### United States

- **Economic nexus thresholds**: Vary by state ($100k-$500k in sales)
- **Stripe monitors**: Automatically tracks thresholds
- **Multi-state**: Register in each state where you have nexus
- **Tax rates**: Updated automatically as rates change

### European Union

- **VAT OSS**: Recommended for multi-country EU sales
- **Threshold**: €10,000 across all EU countries
- **Reverse charge**: Automatic for B2B with valid VAT ID
- **Rate**: Standard VAT rate per country (17-27%)

### United Kingdom

- **VAT threshold**: £85,000 annually
- **Rate**: 20% standard rate (0% for some education services)
- **Post-Brexit**: Separate from EU, requires separate registration

### Canada

- **GST/HST**: Federal and provincial taxes
- **Threshold**: C$30,000 annually
- **Rate**: 5-15% depending on province

### Australia

- **GST**: Goods and Services Tax
- **Threshold**: A$75,000 annually
- **Rate**: 10%

## 🧪 Testing Scenarios

### Test Case 1: US Customer (California)
```
Customer location: CA, United States
Expected: Sales tax ~9.5% (varies by CA location)
Tax ID: Not required
```

### Test Case 2: EU B2C Customer (Germany)
```
Customer location: Germany
Expected: 19% VAT added
Tax ID: Not provided (B2C)
```

### Test Case 3: EU B2B Customer (France)
```
Customer location: France
Tax ID: FR12345678901
Expected: 0% tax (reverse charge)
Invoice shows: "Reverse charge applies"
```

### Test Case 4: UK Customer
```
Customer location: United Kingdom
Expected: 20% VAT added
Tax ID: Optional
```

## 🚨 Common Issues

### Issue 1: Tax Not Calculated

**Symptom**: Checkout shows no tax
**Causes**:
- Stripe Tax not enabled in test/live mode
- No tax registration for customer's location
- Customer location not collected

**Solution**:
1. Check Stripe Dashboard → Tax → Settings
2. Verify tax registration for country
3. Ensure `automatic_tax: { enabled: true }` in code

### Issue 2: Wrong Tax Amount

**Symptom**: Tax seems incorrect
**Causes**:
- Wrong product tax code
- Incorrect customer location
- Registration in wrong jurisdiction

**Solution**:
1. Verify product tax code is `txcd_10000000`
2. Check customer's actual location
3. Review tax registrations

### Issue 3: Customer Can't Provide VAT Number

**Symptom**: EU customer wants to add VAT number
**Causes**:
- Tax ID collection not enabled
- Wrong customer type selected

**Solution**:
1. Enable in Settings → Tax → Customer data
2. Use `tax_id_collection: { enabled: true }` in checkout

## 📚 Resources

- [Stripe Tax Documentation](https://stripe.com/docs/tax)
- [Tax Codes Reference](https://stripe.com/docs/tax/tax-codes)
- [Tax ID Validation](https://stripe.com/docs/tax/tax-ids)
- [EU VAT OSS Guide](https://stripe.com/guides/eu-vat-oss)
- [US Sales Tax Guide](https://stripe.com/guides/sales-tax)

## 💰 Pricing

**Stripe Tax Cost:**
- 0.5% of transaction amount
- Example: $25 subscription = $0.125 Stripe Tax fee
- Included in standard Stripe Dashboard

**Total Stripe Fees (with Tax):**
- Card processing: 2.9% + $0.30
- Stripe Tax: 0.5%
- **Total**: ~3.4% + $0.30 per transaction

## ✅ Go-Live Checklist

Before enabling in production:

- [ ] Stripe Tax enabled in Live mode
- [ ] Tax registrations added for all nexus locations
- [ ] Product tax codes set correctly
- [ ] Tested in Test mode (all scenarios)
- [ ] Customer tax ID collection enabled
- [ ] Tax reporting process established
- [ ] Accounting/bookkeeping system updated
- [ ] Prices reviewed (inclusive vs. exclusive)
- [ ] Customer communication plan (if prices changing)
- [ ] First month monitoring plan

## 🔐 Security & Compliance

**Data Privacy:**
- Customer tax IDs are encrypted by Stripe
- PCI DSS compliant
- GDPR compliant data handling

**Tax Compliance:**
- Stripe Tax is not tax advice
- Consult with tax professional for:
  - Tax registration requirements
  - Filing obligations
  - Deduction eligibility
  - International tax treaties

**Audit Trail:**
- All tax calculations logged
- Customer tax IDs stored securely
- Transaction receipts include tax breakdown

## 📞 Support

**Stripe Support:**
- Dashboard → Help → Contact support
- Tax-specific questions: Mark as "Tax" category

**LessonCraftStudio Implementation:**
- Contact development team for code-related issues
- See `/lib/stripe/` for tax integration code
