/**
 * Part 14: Verify refund policy FAQ in all 128 English content files
 * Checks that each file has a FAQ entry about LCS's own refund/return policy
 * Reports inconsistencies in policy wording
 */
const fs = require('fs');
const path = require('path');

const dirs = [
  'frontend/config/guide-content/en',
  'frontend/config/bundle-content/en',
  'frontend/config/start-content/en',
  'frontend/config/idea-content/en',
];

const results = {
  hasRefundFaq: [],
  missingRefundFaq: [],
  policyVariants: {},
};

for (const dir of dirs) {
  const fullDir = path.resolve(dir);
  if (!fs.existsSync(fullDir)) continue;

  const files = fs.readdirSync(fullDir).filter(f => f.endsWith('.ts'));
  for (const file of files) {
    const filePath = path.join(fullDir, file);
    const content = fs.readFileSync(filePath, 'utf8');

    // Find FAQ entries that ask about refund policy (for LCS, not seller advice)
    const faqPattern = /question:\s*['"`].*(?:refund policy|return policy|money.back).*(?:commercial licens|worksheet generator|bundle|license).*['"`]/gi;
    const faqPattern2 = /question:\s*['"`](?:What is the refund policy|What is your refund|Do you offer refunds|Can I get a refund|Is there a refund).*['"`]/gi;

    const matches = content.match(faqPattern) || content.match(faqPattern2);

    if (matches) {
      results.hasRefundFaq.push(`${dir}/${file}`);

      // Categorize the policy variant
      if (content.includes('sales are final')) {
        const key = 'FINAL: "all sales are final" (try before buy)';
        (results.policyVariants[key] = results.policyVariants[key] || []).push(file);
      } else if (content.includes('30-day money-back guarantee')) {
        const key = 'GUARANTEE: "30-day money-back guarantee"';
        (results.policyVariants[key] = results.policyVariants[key] || []).push(file);
      } else if (content.includes('case-by-case basis')) {
        const key = 'CASE-BY-CASE: "handled on a case-by-case basis"';
        (results.policyVariants[key] = results.policyVariants[key] || []).push(file);
      } else if (content.includes('refund within 30 days')) {
        const key = 'CONDITIONAL: "refund within 30 days if technical issues"';
        (results.policyVariants[key] = results.policyVariants[key] || []).push(file);
      } else {
        const key = 'OTHER';
        (results.policyVariants[key] = results.policyVariants[key] || []).push(file);
      }
    } else {
      // Check if refund is mentioned at all but not in a proper FAQ
      const hasAnyRefund = /refund/i.test(content);
      if (hasAnyRefund) {
        // Check if it's in an FAQ question specifically about LCS policy
        const faqSection = content.match(/faq\s*:\s*\[([\s\S]*?)\]/);
        if (faqSection) {
          const faqText = faqSection[1];
          if (/refund/i.test(faqText)) {
            results.hasRefundFaq.push(`${dir}/${file} (refund in FAQ but non-standard question)`);
            const key = 'NON-STANDARD QUESTION';
            (results.policyVariants[key] = results.policyVariants[key] || []).push(file);
          } else {
            results.missingRefundFaq.push(`${dir}/${file} (refund in body but NOT in FAQ)`);
          }
        } else {
          results.missingRefundFaq.push(`${dir}/${file} (refund in body, no FAQ section found)`);
        }
      } else {
        results.missingRefundFaq.push(`${dir}/${file} (NO refund mention at all)`);
      }
    }
  }
}

console.log('=== REFUND FAQ AUDIT ===\n');
console.log(`Files WITH refund FAQ: ${results.hasRefundFaq.length}`);
console.log(`Files MISSING refund FAQ: ${results.missingRefundFaq.length}\n`);

if (results.missingRefundFaq.length > 0) {
  console.log('--- MISSING REFUND FAQ ---');
  results.missingRefundFaq.forEach(f => console.log(`  MISSING: ${f}`));
  console.log('');
}

console.log('--- POLICY VARIANTS ---');
for (const [variant, files] of Object.entries(results.policyVariants)) {
  console.log(`\n${variant} (${files.length} files):`);
  if (files.length <= 5) {
    files.forEach(f => console.log(`  - ${f}`));
  } else {
    files.slice(0, 3).forEach(f => console.log(`  - ${f}`));
    console.log(`  ... and ${files.length - 3} more`);
  }
}
