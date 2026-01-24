/**
 * Blog Heading Structure Validator
 *
 * Validates HTML content for proper SEO heading structure:
 * - Exactly one H1 tag
 * - Proper heading hierarchy (no skipping levels)
 * - Headings contain meaningful text
 *
 * Used by blog content processing and SEO audit tools.
 */

export interface HeadingItem {
  level: number;
  text: string;
  position: number;
}

export interface HeadingValidationResult {
  valid: boolean;
  score: number; // 0-100
  issues: string[];
  warnings: string[];
  structure: HeadingItem[];
  stats: {
    h1Count: number;
    h2Count: number;
    h3Count: number;
    h4Count: number;
    h5Count: number;
    h6Count: number;
    totalHeadings: number;
  };
}

/**
 * Extract text content from HTML string
 */
function stripHtmlTags(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim();
}

/**
 * Validate heading structure in HTML content
 *
 * @param htmlContent - The HTML content to validate
 * @returns Validation result with issues, warnings, and structure
 */
export function validateHeadingStructure(htmlContent: string): HeadingValidationResult {
  const issues: string[] = [];
  const warnings: string[] = [];
  const headings: HeadingItem[] = [];

  // Initialize stats
  const stats = {
    h1Count: 0,
    h2Count: 0,
    h3Count: 0,
    h4Count: 0,
    h5Count: 0,
    h6Count: 0,
    totalHeadings: 0,
  };

  if (!htmlContent) {
    return {
      valid: false,
      score: 0,
      issues: ['No content provided'],
      warnings: [],
      structure: [],
      stats,
    };
  }

  // Extract all headings with their positions
  const headingRegex = /<h([1-6])([^>]*)>([\s\S]*?)<\/h\1>/gi;
  let match;
  let position = 0;

  while ((match = headingRegex.exec(htmlContent)) !== null) {
    const level = parseInt(match[1]);
    const text = stripHtmlTags(match[3]);

    headings.push({
      level,
      text: text.slice(0, 100), // Truncate for readability
      position: position++,
    });

    // Update stats
    switch (level) {
      case 1: stats.h1Count++; break;
      case 2: stats.h2Count++; break;
      case 3: stats.h3Count++; break;
      case 4: stats.h4Count++; break;
      case 5: stats.h5Count++; break;
      case 6: stats.h6Count++; break;
    }
  }

  stats.totalHeadings = headings.length;

  // RULE 1: Check for H1 tag (must have exactly one)
  if (stats.h1Count === 0) {
    issues.push('Missing H1 tag - Every page should have exactly one H1');
  } else if (stats.h1Count > 1) {
    issues.push(`Multiple H1 tags found (${stats.h1Count}) - Only one H1 should exist per page`);
  }

  // RULE 2: H1 should be first heading (if exists)
  if (headings.length > 0 && headings[0].level !== 1 && stats.h1Count > 0) {
    warnings.push('H1 is not the first heading - Consider placing H1 at the beginning');
  }

  // RULE 3: Check for proper heading hierarchy (no skipping levels)
  for (let i = 1; i < headings.length; i++) {
    const currentLevel = headings[i].level;
    const previousLevel = headings[i - 1].level;

    // Skip if jumping more than 1 level down (e.g., H2 -> H4)
    if (currentLevel > previousLevel + 1) {
      issues.push(
        `Heading hierarchy skip at position ${i + 1}: H${previousLevel} → H${currentLevel} ` +
        `(skipped H${previousLevel + 1})`
      );
    }
  }

  // RULE 4: Check for empty headings
  const emptyHeadings = headings.filter(h => !h.text || h.text.length < 2);
  if (emptyHeadings.length > 0) {
    issues.push(`${emptyHeadings.length} empty or near-empty heading(s) found`);
  }

  // RULE 5: Check for very long headings (>70 chars)
  const longHeadings = headings.filter(h => h.text.length > 70);
  if (longHeadings.length > 0) {
    warnings.push(`${longHeadings.length} heading(s) exceed 70 characters - Consider shortening`);
  }

  // RULE 6: Check for keyword stuffing in headings (same word 3+ times)
  headings.forEach((heading, index) => {
    const words = heading.text.toLowerCase().split(/\s+/);
    const wordCounts: Record<string, number> = {};

    words.forEach(word => {
      if (word.length > 3) { // Ignore short words
        wordCounts[word] = (wordCounts[word] || 0) + 1;
      }
    });

    const stuffedWords = Object.entries(wordCounts)
      .filter(([_, count]) => count >= 3)
      .map(([word]) => word);

    if (stuffedWords.length > 0) {
      warnings.push(
        `Potential keyword stuffing in H${heading.level} at position ${index + 1}: ` +
        `"${stuffedWords.join('", "')}" repeated 3+ times`
      );
    }
  });

  // RULE 7: Suggest having at least H2s for long content
  if (stats.h2Count === 0 && htmlContent.length > 2000) {
    warnings.push('No H2 headings found in long content - Consider adding section headings');
  }

  // Calculate score (0-100)
  let score = 100;

  // Deduct for issues (major problems)
  score -= issues.length * 15; // -15 per issue

  // Deduct for warnings (minor problems)
  score -= warnings.length * 5; // -5 per warning

  // Bonus for good structure
  if (stats.h1Count === 1 && stats.h2Count >= 2) {
    score += 5; // Bonus for well-structured content
  }

  // Ensure score is between 0 and 100
  score = Math.max(0, Math.min(100, score));

  return {
    valid: issues.length === 0,
    score,
    issues,
    warnings,
    structure: headings,
    stats,
  };
}

/**
 * Generate a heading structure report as formatted string
 */
export function generateHeadingReport(result: HeadingValidationResult): string {
  const lines: string[] = [];

  lines.push('=== HEADING STRUCTURE REPORT ===');
  lines.push('');
  lines.push(`Status: ${result.valid ? 'VALID ✓' : 'INVALID ✗'}`);
  lines.push(`Score: ${result.score}/100`);
  lines.push('');

  // Stats
  lines.push('Heading Counts:');
  lines.push(`  H1: ${result.stats.h1Count}`);
  lines.push(`  H2: ${result.stats.h2Count}`);
  lines.push(`  H3: ${result.stats.h3Count}`);
  lines.push(`  H4: ${result.stats.h4Count}`);
  lines.push(`  H5: ${result.stats.h5Count}`);
  lines.push(`  H6: ${result.stats.h6Count}`);
  lines.push(`  Total: ${result.stats.totalHeadings}`);
  lines.push('');

  // Issues
  if (result.issues.length > 0) {
    lines.push('Issues (must fix):');
    result.issues.forEach(issue => {
      lines.push(`  ✗ ${issue}`);
    });
    lines.push('');
  }

  // Warnings
  if (result.warnings.length > 0) {
    lines.push('Warnings (recommended):');
    result.warnings.forEach(warning => {
      lines.push(`  ⚠ ${warning}`);
    });
    lines.push('');
  }

  // Structure
  if (result.structure.length > 0) {
    lines.push('Heading Structure:');
    result.structure.forEach(heading => {
      const indent = '  '.repeat(heading.level);
      const preview = heading.text.slice(0, 50) + (heading.text.length > 50 ? '...' : '');
      lines.push(`${indent}H${heading.level}: ${preview}`);
    });
  }

  return lines.join('\n');
}

/**
 * Quick validation check - returns true if heading structure is valid
 */
export function isHeadingStructureValid(htmlContent: string): boolean {
  const result = validateHeadingStructure(htmlContent);
  return result.valid;
}

/**
 * Get heading structure score (0-100)
 */
export function getHeadingScore(htmlContent: string): number {
  const result = validateHeadingStructure(htmlContent);
  return result.score;
}
