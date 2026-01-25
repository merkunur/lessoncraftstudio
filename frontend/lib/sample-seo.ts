/**
 * Server-side Sample SEO Metadata Access
 *
 * Provides direct database access to sample SEO metadata for server-side rendering.
 * Used by product pages to include database SEO metadata in JSON-LD schemas.
 */

import { prisma } from '@/lib/prisma';

export interface SampleSeoMetadata {
  id: string;
  appId: string;
  locale: string;
  filename: string;
  altText: string | null;
  title: string | null;
  description: string | null;
  grade: string | null;
  keywords: string[];
  subject: string | null;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Get all sample SEO metadata for a specific app and locale
 * Returns empty array if no metadata exists
 */
export async function getSampleSeoMetadata(
  appId: string,
  locale: string
): Promise<SampleSeoMetadata[]> {
  try {
    const samples = await prisma.productSample.findMany({
      where: {
        appId,
        locale,
      },
      orderBy: {
        filename: 'asc',
      },
    });

    return samples.map(sample => ({
      id: sample.id,
      appId: sample.appId,
      locale: sample.locale,
      filename: sample.filename,
      altText: sample.altText,
      title: sample.title,
      description: sample.description,
      grade: sample.grade,
      keywords: sample.keywords || [],
      subject: sample.subject,
      createdAt: sample.createdAt,
      updatedAt: sample.updatedAt,
    }));
  } catch (error) {
    console.error('Failed to fetch sample SEO metadata:', error);
    return [];
  }
}

/**
 * Get sample SEO metadata indexed by filename
 * Convenient for merging with static sample data
 */
export async function getSampleSeoMetadataMap(
  appId: string,
  locale: string
): Promise<Map<string, SampleSeoMetadata>> {
  const samples = await getSampleSeoMetadata(appId, locale);
  const map = new Map<string, SampleSeoMetadata>();

  for (const sample of samples) {
    map.set(sample.filename, sample);
  }

  return map;
}

/**
 * Merge static sample data with database SEO metadata
 * Returns enhanced sample data with database SEO values taking precedence
 */
export function mergeSampleSeoData(
  staticSamples: Array<{
    worksheetSrc: string;
    altText?: string;
    imageTitle?: string;
  }>,
  seoMetadataMap: Map<string, SampleSeoMetadata>,
  languageFolder: string
): Array<{
  src: string;
  name: string;
  description: string;
  caption: string;
  thumbnailSrc: string;
  width: number;
  height: number;
  grade?: string;
}> {
  return staticSamples.map((sample) => {
    // Extract filename from worksheetSrc path
    // e.g., "/samples/english/addition/sample-1.jpeg" -> "sample-1.jpeg"
    const pathParts = sample.worksheetSrc.split('/');
    const filename = pathParts[pathParts.length - 1];

    // Look up database SEO metadata
    const dbMeta = seoMetadataMap.get(filename);

    // Use database values if available, fall back to static content
    const name = dbMeta?.title || sample.imageTitle || sample.altText?.split(' - ')[0] || 'Sample Worksheet';
    const description = dbMeta?.altText || sample.altText || 'Free printable worksheet';
    const caption = dbMeta?.description || `Free printable ${name.toLowerCase()} for educational use`;

    return {
      src: sample.worksheetSrc,
      name,
      description,
      caption,
      thumbnailSrc: sample.worksheetSrc.replace(/\.(jpeg|jpg|png)$/i, '_thumb.webp'),
      width: 2480,
      height: 3508,
      grade: dbMeta?.grade || undefined,
    };
  });
}
