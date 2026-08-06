/**
 * Part 14: Normalize refund FAQ across all 128 English content files
 * Standard policy: "sales are final" because free trial with watermark lets you evaluate first
 */
const fs = require('fs');
const path = require('path');

const STANDARD_QUESTION = "What is the refund policy for commercial licenses?";
const STANDARD_ANSWER = "Every generator offers a free trial with watermark so you can test all features, create sample worksheets, and evaluate output quality before purchasing. Because you can fully evaluate the product before buying, all commercial license sales are final. This is standard practice for digital product tools where the full product can be previewed before purchase.";

const dirs = [
  'frontend/config/guide-content/en',
  'frontend/config/bundle-content/en',
  'frontend/config/start-content/en',
  'frontend/config/idea-content/en',
];

let totalFixed = 0;
let totalSkipped = 0;
let totalFiles = 0;

for (const dir of dirs) {
  const fullDir = path.resolve(dir);
  if (!fs.existsSync(fullDir)) continue;

  const files = fs.readdirSync(fullDir).filter(f => f.endsWith('.ts'));
  let dirFixed = 0;

  for (const file of files) {
    totalFiles++;
    const filePath = path.join(fullDir, file);
    const content = fs.readFileSync(filePath, 'utf8');

    // Check if already has standard policy
    if (content.includes('all commercial license sales are final')) {
      totalSkipped++;
      continue;
    }

    // Find the refund FAQ entry and replace it
    // Match patterns like: { question: '...refund...', answer: '...' }
    // This regex matches a FAQ object with refund in the question
    const faqEntryPattern = /\{\s*\n?\s*question:\s*['"`]([^'"`]*(?:refund|money.back|return)[^'"`]*)['"`],\s*\n?\s*answer:\s*['"`]((?:[^'"`\\]|\\.)*)['"`],?\s*\n?\s*\}/gi;

    let newContent = content;
    let replaced = false;

    newContent = newContent.replace(faqEntryPattern, (match, question, answer) => {
      // Only replace FAQ entries about LCS's own refund policy, not seller advice
      const q = question.toLowerCase();
      if (q.includes('refund policy') || q.includes('money back') || q.includes('return policy') || q.includes('refund') && (q.includes('license') || q.includes('generator') || q.includes('bundle') || q.includes('worksheet'))) {
        replaced = true;
        return `{\n      question: '${STANDARD_QUESTION}',\n      answer: '${STANDARD_ANSWER}',\n    }`;
      }
      return match;
    });

    if (replaced) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      dirFixed++;
      totalFixed++;
      console.log(`  FIXED: ${file}`);
    } else {
      // Try broader match - any FAQ with "refund" in question
      const broaderPattern = /\{\s*\n?\s*question:\s*['"`]([^'"`]*refund[^'"`]*)['"`],\s*\n?\s*answer:\s*['"`]((?:[^'"`\\]|\\.)*)['"`],?\s*\n?\s*\}/gi;

      newContent = content.replace(broaderPattern, (match, question) => {
        replaced = true;
        return `{\n      question: '${STANDARD_QUESTION}',\n      answer: '${STANDARD_ANSWER}',\n    }`;
      });

      if (replaced) {
        fs.writeFileSync(filePath, newContent, 'utf8');
        dirFixed++;
        totalFixed++;
        console.log(`  FIXED (broad): ${file}`);
      } else {
        console.log(`  SKIPPED (no matching pattern): ${file}`);
      }
    }
  }

  console.log(`${dir}: ${dirFixed} fixed\n`);
}

console.log(`\nTotal: ${totalFiles} files, ${totalFixed} fixed, ${totalSkipped} already correct`);
