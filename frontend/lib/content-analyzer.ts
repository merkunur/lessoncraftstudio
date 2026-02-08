/**
 * Content Analyzer for Blog Posts
 *
 * Automatically detects FAQ and HowTo patterns in blog content
 * and generates corresponding schema markup for rich snippets.
 */

export interface FAQItem {
  question: string;
  answer: string;
}

export interface HowToStep {
  name: string;
  text: string;
  position: number;
}

export interface ContentAnalysis {
  hasFAQ: boolean;
  hasHowTo: boolean;
  faqItems: FAQItem[];
  howToSteps: HowToStep[];
  howToName?: string;
  howToDescription?: string;
}

/**
 * Analyze HTML content for FAQ patterns
 * Looks for H2/H3 headings ending with "?" followed by paragraph content
 */
export function extractFAQItems(htmlContent: string): FAQItem[] {
  const faqItems: FAQItem[] = [];

  // Pattern: H2 or H3 ending with "?" followed by content until next heading
  const faqPattern = /<h[23][^>]*>([^<]*\?)<\/h[23]>\s*([\s\S]*?)(?=<h[23]|<\/article|<\/section|<footer|$)/gi;

  let match;
  while ((match = faqPattern.exec(htmlContent)) !== null) {
    const question = match[1].trim();
    const answerHtml = match[2].trim();

    // Extract text from answer HTML (remove tags, keep content)
    const answerText = answerHtml
      .replace(/<[^>]*>/g, ' ')  // Remove HTML tags
      .replace(/\s+/g, ' ')       // Normalize whitespace
      .trim();

    // Only include if we have both question and meaningful answer
    if (question && answerText && answerText.length > 20) {
      faqItems.push({
        question: question,
        answer: answerText.substring(0, 500) // Schema limit
      });
    }
  }

  return faqItems.slice(0, 10); // Limit to 10 FAQs for schema
}

/**
 * Analyze HTML content for HowTo patterns
 * Looks for "Step X:" patterns or ordered lists
 */
export function extractHowToSteps(htmlContent: string): HowToStep[] {
  const steps: HowToStep[] = [];

  // Pattern 1: "Step X:" in headings or paragraphs
  const stepPattern = /(?:Step\s*(\d+)[:\s.\-]*|(\d+)[.)]\s*)([^<\n]+)/gi;
  let match;

  while ((match = stepPattern.exec(htmlContent)) !== null) {
    const stepNum = parseInt(match[1] || match[2], 10);
    const stepText = match[3].replace(/<[^>]*>/g, '').trim();

    if (stepText && stepText.length > 5) {
      steps.push({
        name: `Step ${stepNum}`,
        text: stepText.substring(0, 500),
        position: stepNum
      });
    }
  }

  // Pattern 2: Ordered lists (<ol><li>)
  if (steps.length === 0) {
    const olPattern = /<ol[^>]*>([\s\S]*?)<\/ol>/gi;
    const olMatch = olPattern.exec(htmlContent);

    if (olMatch) {
      const listContent = olMatch[1];
      const liPattern = /<li[^>]*>([\s\S]*?)<\/li>/gi;
      let liMatch;
      let position = 1;

      while ((liMatch = liPattern.exec(listContent)) !== null) {
        const stepText = liMatch[1]
          .replace(/<[^>]*>/g, '')
          .replace(/\s+/g, ' ')
          .trim();

        if (stepText && stepText.length > 5) {
          steps.push({
            name: `Step ${position}`,
            text: stepText.substring(0, 500),
            position: position
          });
          position++;
        }
      }
    }
  }

  // Sort by position and deduplicate
  return steps
    .sort((a, b) => a.position - b.position)
    .filter((step, index, self) =>
      index === self.findIndex(s => s.position === step.position)
    )
    .slice(0, 10); // Limit to 10 steps
}

/**
 * Extract a title for HowTo schema
 * Looks for "How to..." in H1/H2 headings
 */
export function extractHowToTitle(htmlContent: string, pageTitle: string): string | undefined {
  // Try to find "How to..." in headings
  const howToTitlePattern = /<h[12][^>]*>([^<]*how\s+to[^<]*)<\/h[12]>/i;
  const match = howToTitlePattern.exec(htmlContent);

  if (match) {
    return match[1].trim();
  }

  // Check if page title contains "how to"
  if (pageTitle && /how\s+to/i.test(pageTitle)) {
    return pageTitle;
  }

  return undefined;
}

/**
 * Analyze blog post content for structured data opportunities
 */
export function analyzeContent(htmlContent: string, pageTitle: string = ''): ContentAnalysis {
  const faqItems = extractFAQItems(htmlContent);
  const howToSteps = extractHowToSteps(htmlContent);
  const howToTitle = extractHowToTitle(htmlContent, pageTitle);

  // Only consider HowTo valid if we have at least 3 steps
  const hasValidHowTo = howToSteps.length >= 3 && howToTitle !== undefined;

  return {
    hasFAQ: faqItems.length >= 2, // At least 2 Q&As for FAQ schema
    hasHowTo: hasValidHowTo,
    faqItems: faqItems,
    howToSteps: hasValidHowTo ? howToSteps : [],
    howToName: howToTitle,
    howToDescription: hasValidHowTo
      ? `Learn ${howToTitle?.toLowerCase().replace(/^how\s+to\s+/i, 'how to ')}`
      : undefined
  };
}

/**
 * Generate FAQPage schema markup
 * @param faqItems - Array of FAQ items
 * @param locale - Locale code for inLanguage property
 */
export function generateFAQSchema(faqItems: FAQItem[], locale: string = 'en'): object | null {
  if (faqItems.length < 2) return null;

  // Convert locale to proper hreflang format for regional variants
  const hreflangMap: Record<string, string> = {
    en: 'en', de: 'de', fr: 'fr', es: 'es', pt: 'pt-BR',
    it: 'it', nl: 'nl', sv: 'sv', da: 'da', no: 'no', fi: 'fi'
  };
  const inLanguage = hreflangMap[locale] || locale;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    })),
    "inLanguage": inLanguage
  };
}

/**
 * Generate HowTo schema markup
 * @param name - Name of the how-to guide
 * @param description - Description of the how-to
 * @param steps - Array of how-to steps
 * @param locale - Locale code for inLanguage property
 * @param totalTime - Optional ISO 8601 duration string
 */
export function generateHowToSchema(
  name: string,
  description: string,
  steps: HowToStep[],
  locale: string = 'en',
  totalTime?: string
): object | null {
  if (steps.length < 3) return null;

  // Convert locale to proper hreflang format for regional variants
  const hreflangMap: Record<string, string> = {
    en: 'en', de: 'de', fr: 'fr', es: 'es', pt: 'pt-BR',
    it: 'it', nl: 'nl', sv: 'sv', da: 'da', no: 'no', fi: 'fi'
  };
  const inLanguage = hreflangMap[locale] || locale;

  const schema: any = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": name,
    "description": description,
    "step": steps.map(step => ({
      "@type": "HowToStep",
      "name": step.name,
      "text": step.text,
      "position": step.position
    })),
    "inLanguage": inLanguage
  };

  if (totalTime) {
    schema.totalTime = totalTime;
  }

  return schema;
}
