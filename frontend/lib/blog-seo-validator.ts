/**
 * Blog SEO Validator
 *
 * Validates blog post content for SEO compliance before publishing.
 * Returns validation results with issues, warnings, and suggestions.
 */

import { validateHeadingStructure } from './blog-heading-validator';

export interface SEOValidationResult {
  valid: boolean;
  score: number; // 0-100
  errors: string[];
  warnings: string[];
  suggestions: string[];
  details: {
    metaTitle: { value: string | null; length: number; valid: boolean; message: string };
    metaDescription: { value: string | null; length: number; valid: boolean; message: string };
    focusKeyword: { value: string | null; valid: boolean; message: string };
    title: { value: string | null; length: number; valid: boolean; message: string };
    content: { wordCount: number; valid: boolean; message: string };
    headings: { valid: boolean; score: number; issues: string[] };
    featuredImage: { value: string | null; valid: boolean; message: string };
  };
}

// SEO Rules/Constants
const SEO_RULES = {
  // Meta title: 50-60 chars optimal, 30-70 acceptable
  META_TITLE_MIN: 30,
  META_TITLE_MAX: 70,
  META_TITLE_OPTIMAL_MIN: 50,
  META_TITLE_OPTIMAL_MAX: 60,

  // Meta description: 120-155 chars optimal, 100-160 acceptable
  META_DESCRIPTION_MIN: 100,
  META_DESCRIPTION_MAX: 160,
  META_DESCRIPTION_OPTIMAL_MIN: 120,
  META_DESCRIPTION_OPTIMAL_MAX: 155,

  // Title: 20-70 chars
  TITLE_MIN: 10,
  TITLE_MAX: 100,

  // Content: 300+ words minimum, 1000+ optimal
  CONTENT_MIN_WORDS: 300,
  CONTENT_OPTIMAL_WORDS: 1000,

  // Focus keyword: 2-5 words
  FOCUS_KEYWORD_MIN_WORDS: 1,
  FOCUS_KEYWORD_MAX_WORDS: 5,
};

/**
 * Count words in text content
 */
function countWords(text: string): number {
  if (!text) return 0;
  // Strip HTML tags
  const plainText = text.replace(/<[^>]*>/g, '');
  // Count words
  return plainText
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .filter(word => word.length > 0).length;
}

/**
 * Validate meta title
 */
function validateMetaTitle(metaTitle: string | null | undefined, title: string): {
  value: string | null;
  length: number;
  valid: boolean;
  message: string;
  isError: boolean;
  isWarning: boolean;
} {
  const value = metaTitle || null;
  const length = value?.length || 0;

  if (!value) {
    return {
      value: null,
      length: 0,
      valid: false,
      message: 'Meta title is missing. Using page title as fallback.',
      isError: false, // Warning, not error - title is used as fallback
      isWarning: true,
    };
  }

  if (length < SEO_RULES.META_TITLE_MIN) {
    return {
      value,
      length,
      valid: false,
      message: `Meta title too short (${length} chars). Minimum: ${SEO_RULES.META_TITLE_MIN} chars.`,
      isError: true,
      isWarning: false,
    };
  }

  if (length > SEO_RULES.META_TITLE_MAX) {
    return {
      value,
      length,
      valid: false,
      message: `Meta title too long (${length} chars). Maximum: ${SEO_RULES.META_TITLE_MAX} chars.`,
      isError: true,
      isWarning: false,
    };
  }

  if (length < SEO_RULES.META_TITLE_OPTIMAL_MIN) {
    return {
      value,
      length,
      valid: true,
      message: `Meta title could be longer (${length} chars). Optimal: ${SEO_RULES.META_TITLE_OPTIMAL_MIN}-${SEO_RULES.META_TITLE_OPTIMAL_MAX} chars.`,
      isError: false,
      isWarning: true,
    };
  }

  if (length > SEO_RULES.META_TITLE_OPTIMAL_MAX) {
    return {
      value,
      length,
      valid: true,
      message: `Meta title could be shorter (${length} chars). Optimal: ${SEO_RULES.META_TITLE_OPTIMAL_MIN}-${SEO_RULES.META_TITLE_OPTIMAL_MAX} chars.`,
      isError: false,
      isWarning: true,
    };
  }

  return {
    value,
    length,
    valid: true,
    message: `Meta title length is optimal (${length} chars).`,
    isError: false,
    isWarning: false,
  };
}

/**
 * Validate meta description
 */
function validateMetaDescription(metaDescription: string | null | undefined): {
  value: string | null;
  length: number;
  valid: boolean;
  message: string;
  isError: boolean;
  isWarning: boolean;
} {
  const value = metaDescription || null;
  const length = value?.length || 0;

  if (!value) {
    return {
      value: null,
      length: 0,
      valid: false,
      message: 'Meta description is missing. This hurts click-through rates in search results.',
      isError: true,
      isWarning: false,
    };
  }

  if (length < SEO_RULES.META_DESCRIPTION_MIN) {
    return {
      value,
      length,
      valid: false,
      message: `Meta description too short (${length} chars). Minimum: ${SEO_RULES.META_DESCRIPTION_MIN} chars.`,
      isError: true,
      isWarning: false,
    };
  }

  if (length > SEO_RULES.META_DESCRIPTION_MAX) {
    return {
      value,
      length,
      valid: false,
      message: `Meta description too long (${length} chars). It will be truncated in search results.`,
      isError: false,
      isWarning: true,
    };
  }

  if (length < SEO_RULES.META_DESCRIPTION_OPTIMAL_MIN) {
    return {
      value,
      length,
      valid: true,
      message: `Meta description could be longer (${length} chars). Optimal: ${SEO_RULES.META_DESCRIPTION_OPTIMAL_MIN}-${SEO_RULES.META_DESCRIPTION_OPTIMAL_MAX} chars.`,
      isError: false,
      isWarning: true,
    };
  }

  return {
    value,
    length,
    valid: true,
    message: `Meta description length is good (${length} chars).`,
    isError: false,
    isWarning: false,
  };
}

/**
 * Validate focus keyword
 */
function validateFocusKeyword(focusKeyword: string | null | undefined): {
  value: string | null;
  valid: boolean;
  message: string;
  isError: boolean;
  isWarning: boolean;
} {
  const value = focusKeyword?.trim() || null;

  if (!value) {
    return {
      value: null,
      valid: false,
      message: 'Focus keyword is missing. Add a target keyword for better SEO.',
      isError: false,
      isWarning: true,
    };
  }

  const wordCount = value.split(/\s+/).length;

  if (wordCount > SEO_RULES.FOCUS_KEYWORD_MAX_WORDS) {
    return {
      value,
      valid: false,
      message: `Focus keyword has too many words (${wordCount}). Use ${SEO_RULES.FOCUS_KEYWORD_MAX_WORDS} or fewer words.`,
      isError: false,
      isWarning: true,
    };
  }

  return {
    value,
    valid: true,
    message: `Focus keyword is set: "${value}"`,
    isError: false,
    isWarning: false,
  };
}

/**
 * Validate content length
 */
function validateContent(content: string | null | undefined): {
  wordCount: number;
  valid: boolean;
  message: string;
  isError: boolean;
  isWarning: boolean;
} {
  const wordCount = countWords(content || '');

  if (wordCount < SEO_RULES.CONTENT_MIN_WORDS) {
    return {
      wordCount,
      valid: false,
      message: `Content too short (${wordCount} words). Minimum: ${SEO_RULES.CONTENT_MIN_WORDS} words.`,
      isError: true,
      isWarning: false,
    };
  }

  if (wordCount < SEO_RULES.CONTENT_OPTIMAL_WORDS) {
    return {
      wordCount,
      valid: true,
      message: `Content could be longer (${wordCount} words). Optimal: ${SEO_RULES.CONTENT_OPTIMAL_WORDS}+ words.`,
      isError: false,
      isWarning: true,
    };
  }

  return {
    wordCount,
    valid: true,
    message: `Content length is good (${wordCount} words).`,
    isError: false,
    isWarning: false,
  };
}

/**
 * Validate blog post for SEO compliance
 *
 * @param post - Blog post data to validate
 * @param locale - Locale being validated
 * @param strictMode - If true, warnings become errors (default: false)
 * @returns SEO validation result
 */
export function validateBlogSEO(
  post: {
    title?: string;
    metaTitle?: string;
    metaDescription?: string;
    focusKeyword?: string;
    content?: string;
    featuredImage?: string;
  },
  locale: string = 'en',
  strictMode: boolean = false
): SEOValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const suggestions: string[] = [];

  // Validate title
  const titleValidation = {
    value: post.title || null,
    length: post.title?.length || 0,
    valid: !!post.title && post.title.length >= SEO_RULES.TITLE_MIN,
    message: !post.title
      ? 'Title is required.'
      : post.title.length < SEO_RULES.TITLE_MIN
        ? `Title too short (${post.title.length} chars).`
        : 'Title is valid.',
  };

  if (!titleValidation.valid) {
    errors.push(`[${locale}] ${titleValidation.message}`);
  }

  // Validate meta title
  const metaTitleResult = validateMetaTitle(post.metaTitle, post.title || '');
  if (metaTitleResult.isError) {
    errors.push(`[${locale}] ${metaTitleResult.message}`);
  } else if (metaTitleResult.isWarning) {
    if (strictMode) {
      errors.push(`[${locale}] ${metaTitleResult.message}`);
    } else {
      warnings.push(`[${locale}] ${metaTitleResult.message}`);
    }
  }

  // Validate meta description
  const metaDescResult = validateMetaDescription(post.metaDescription);
  if (metaDescResult.isError) {
    errors.push(`[${locale}] ${metaDescResult.message}`);
  } else if (metaDescResult.isWarning) {
    if (strictMode) {
      errors.push(`[${locale}] ${metaDescResult.message}`);
    } else {
      warnings.push(`[${locale}] ${metaDescResult.message}`);
    }
  }

  // Validate focus keyword
  const focusKwResult = validateFocusKeyword(post.focusKeyword);
  if (focusKwResult.isError) {
    errors.push(`[${locale}] ${focusKwResult.message}`);
  } else if (focusKwResult.isWarning) {
    if (strictMode) {
      errors.push(`[${locale}] ${focusKwResult.message}`);
    } else {
      warnings.push(`[${locale}] ${focusKwResult.message}`);
    }
  }

  // Validate content
  const contentResult = validateContent(post.content);
  if (contentResult.isError) {
    errors.push(`[${locale}] ${contentResult.message}`);
  } else if (contentResult.isWarning) {
    warnings.push(`[${locale}] ${contentResult.message}`);
  }

  // Validate headings
  const headingResult = validateHeadingStructure(post.content || '');
  if (!headingResult.valid) {
    headingResult.issues.forEach(issue => {
      warnings.push(`[${locale}] Heading: ${issue}`);
    });
  }

  // Validate featured image
  const featuredImageValidation = {
    value: post.featuredImage || null,
    valid: !!post.featuredImage,
    message: post.featuredImage
      ? 'Featured image is set.'
      : 'Featured image is missing. Images improve engagement.',
  };

  if (!featuredImageValidation.valid) {
    warnings.push(`[${locale}] ${featuredImageValidation.message}`);
  }

  // Generate suggestions
  if (post.focusKeyword && post.metaTitle && !post.metaTitle.toLowerCase().includes(post.focusKeyword.toLowerCase())) {
    suggestions.push(`[${locale}] Consider including focus keyword "${post.focusKeyword}" in meta title.`);
  }

  if (post.focusKeyword && post.metaDescription && !post.metaDescription.toLowerCase().includes(post.focusKeyword.toLowerCase())) {
    suggestions.push(`[${locale}] Consider including focus keyword "${post.focusKeyword}" in meta description.`);
  }

  // Calculate score
  let score = 100;
  score -= errors.length * 15; // -15 per error
  score -= warnings.length * 5; // -5 per warning
  score = Math.max(0, Math.min(100, score));

  return {
    valid: errors.length === 0,
    score,
    errors,
    warnings,
    suggestions,
    details: {
      metaTitle: {
        value: metaTitleResult.value,
        length: metaTitleResult.length,
        valid: metaTitleResult.valid,
        message: metaTitleResult.message,
      },
      metaDescription: {
        value: metaDescResult.value,
        length: metaDescResult.length,
        valid: metaDescResult.valid,
        message: metaDescResult.message,
      },
      focusKeyword: {
        value: focusKwResult.value,
        valid: focusKwResult.valid,
        message: focusKwResult.message,
      },
      title: titleValidation,
      content: {
        wordCount: contentResult.wordCount,
        valid: contentResult.valid,
        message: contentResult.message,
      },
      headings: {
        valid: headingResult.valid,
        score: headingResult.score,
        issues: headingResult.issues,
      },
      featuredImage: featuredImageValidation,
    },
  };
}

/**
 * Validate all translations of a blog post
 *
 * @param translations - Object with locale keys and translation data
 * @param strictMode - If true, warnings become errors
 * @returns Combined validation result for all locales
 */
export function validateAllTranslations(
  translations: Record<string, {
    title?: string;
    metaTitle?: string;
    metaDescription?: string;
    focusKeyword?: string;
    content?: string;
    featuredImage?: string;
  }>,
  strictMode: boolean = false
): {
  valid: boolean;
  overallScore: number;
  results: Record<string, SEOValidationResult>;
  allErrors: string[];
  allWarnings: string[];
  allSuggestions: string[];
} {
  const results: Record<string, SEOValidationResult> = {};
  const allErrors: string[] = [];
  const allWarnings: string[] = [];
  const allSuggestions: string[] = [];
  let totalScore = 0;
  let localeCount = 0;

  for (const [locale, translation] of Object.entries(translations)) {
    // Skip empty translations
    if (!translation || !translation.title || !translation.content) {
      continue;
    }

    const result = validateBlogSEO(translation, locale, strictMode);
    results[locale] = result;

    allErrors.push(...result.errors);
    allWarnings.push(...result.warnings);
    allSuggestions.push(...result.suggestions);

    totalScore += result.score;
    localeCount++;
  }

  const overallScore = localeCount > 0 ? Math.round(totalScore / localeCount) : 0;

  return {
    valid: allErrors.length === 0,
    overallScore,
    results,
    allErrors,
    allWarnings,
    allSuggestions,
  };
}

/**
 * Quick check if a blog post meets minimum SEO requirements
 */
export function meetsMinimumSEO(post: {
  title?: string;
  content?: string;
  metaDescription?: string;
}): boolean {
  if (!post.title || post.title.length < SEO_RULES.TITLE_MIN) return false;
  if (!post.content || countWords(post.content) < SEO_RULES.CONTENT_MIN_WORDS) return false;
  if (!post.metaDescription || post.metaDescription.length < SEO_RULES.META_DESCRIPTION_MIN) return false;
  return true;
}
