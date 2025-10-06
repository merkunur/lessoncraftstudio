/**
 * SEO Schema Markup Generator
 * Automatically generates JSON-LD structured data for blog posts
 * Supports: Article, Breadcrumb, and LearningResource schemas
 */

interface BlogPostData {
  slug: string;
  title: string;
  metaTitle?: string;
  metaDescription?: string;
  excerpt?: string;
  content: string;
  featuredImage?: string | null;
  focusKeyword?: string;
  keywords?: string[];
  category?: string;
  author?: string;
  createdAt: Date;
  updatedAt: Date;
}

export function generateBlogSchemas(post: BlogPostData, locale: string, baseUrl: string = 'https://lessoncraftstudio.com') {
  const schemas: any[] = [];

  const postUrl = `${baseUrl}/${locale}/blog/${post.slug}`;
  const title = post.metaTitle || post.title;
  const description = post.metaDescription || post.excerpt || '';
  const image = post.featuredImage ? `${baseUrl}${post.featuredImage}` : `${baseUrl}/default-blog-image.jpg`;

  // 1. Article Schema (Primary)
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "description": description,
    "image": image,
    "author": {
      "@type": "Organization",
      "name": post.author || "LessonCraftStudio",
      "url": `${baseUrl}/${locale}`
    },
    "publisher": {
      "@type": "Organization",
      "name": "LessonCraftStudio",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/logo-lcs.png`,
        "width": 600,
        "height": 60
      }
    },
    "datePublished": post.createdAt.toISOString(),
    "dateModified": post.updatedAt.toISOString(),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": postUrl
    },
    "keywords": post.focusKeyword || post.keywords?.join(', ') || '',
    "articleSection": post.category || 'Education',
    "inLanguage": locale,
    "about": {
      "@type": "Thing",
      "name": post.category || 'Educational Resources'
    }
  };

  schemas.push(articleSchema);

  // 2. Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": `${baseUrl}/${locale}`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": `${baseUrl}/${locale}/blog`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": postUrl
      }
    ]
  };

  schemas.push(breadcrumbSchema);

  // 3. Educational Content Schema (LearningResource)
  // This is CRITICAL for educational websites
  const educationalSchema = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    "name": title,
    "description": description,
    "educationalUse": "assignment",
    "educationalLevel": "Elementary School",
    "learningResourceType": "Educational Article",
    "inLanguage": locale,
    "isAccessibleForFree": true,
    "provider": {
      "@type": "Organization",
      "name": "LessonCraftStudio",
      "url": `${baseUrl}/${locale}`
    },
    "teaches": post.focusKeyword || post.category || 'Educational content',
    "typicalAgeRange": "6-12",
    "url": postUrl,
    "dateCreated": post.createdAt.toISOString(),
    "dateModified": post.updatedAt.toISOString()
  };

  schemas.push(educationalSchema);

  // 4. ImageObject Schema (if featured image exists)
  if (post.featuredImage) {
    const imageSchema = {
      "@context": "https://schema.org",
      "@type": "ImageObject",
      "url": image,
      "width": 1200,
      "height": 630,
      "caption": title,
      "description": description
    };

    schemas.push(imageSchema);
  }

  // 5. Organization Schema (for E-A-T signals)
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "LessonCraftStudio",
    "url": `${baseUrl}/${locale}`,
    "logo": `${baseUrl}/logo-lcs.png`,
    "sameAs": [
      // Add social media profiles here when available
    ],
    "description": "Free printable educational worksheets for elementary school teachers and parents",
    "areaServed": "Worldwide",
    "availableLanguage": ["en", "de", "fr", "es", "pt", "it", "nl", "sv", "da", "no", "fi"]
  };

  schemas.push(organizationSchema);

  return schemas;
}

/**
 * Generate FAQ Schema if the post contains FAQ content
 */
export function generateFAQSchema(faqs: Array<{question: string; answer: string}>, locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    })),
    "inLanguage": locale
  };
}

/**
 * Generate HowTo Schema for tutorial/guide posts
 */
export function generateHowToSchema(
  title: string,
  description: string,
  steps: Array<{name: string; text: string}>,
  locale: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": title,
    "description": description,
    "step": steps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.name,
      "text": step.text
    })),
    "inLanguage": locale
  };
}
