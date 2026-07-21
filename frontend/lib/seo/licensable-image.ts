/**
 * A single source of truth for the "licensable image" JSON-LD field block.
 *
 * WHY. Google's Image-metadata / licensable-images feature (the Search Console "Image Metadata"
 * enhancement report) validates an ImageObject on its LICENSING fields — `license` (a URL to the
 * terms), `acquireLicensePage` (where to obtain the image), plus `creditText`, `creator`,
 * `copyrightHolder`, `copyrightNotice`. A title/description alone does not make an image show as
 * "valid" there. `schema-generator.ts` already had this exact block, but only on homepage showcase
 * images, and copied inline in two places. The worksheet images — the actual product — carried no
 * licensing fields at all. This helper is that block, defined once, so every image surface (deck
 * landing, showcase, gallery, future) emits the identical, valid shape and the license URL / credit
 * live in one place.
 *
 * The `license` URL points at `/{locale}/license`, a real indexable page that already renders the
 * pre-existing `license` message namespace in all 11 locales. `acquireLicensePage` is the page a
 * viewer lands on to get the image (the deck landing / worksheet page). Everything is free for
 * educational use (CLAUDE.md §7); the fields state that, they do not gate anything.
 */
import { CANONICAL_HOST } from './url';

/** The public license-terms page for a locale — the URL every image's `license` field points at. */
export function licenseUrlFor(locale: string): string {
  return `${CANONICAL_HOST}/${locale}/license`;
}

export interface LicensableImageInput {
  /** Absolute URL of the actual image file (the thumbnail / og-image / sample). */
  contentUrl: string;
  /** Human caption / alt — describes what the worksheet shows. */
  caption: string;
  /** Optional explicit name; defaults to the caption. */
  name?: string;
  width?: number;
  height?: number;
  encodingFormat?: string;
  locale: string;
  /** The page where a viewer can obtain this image (the deck landing / worksheet page). */
  acquireLicensePage: string;
  /** Emit `url` alongside `contentUrl` (the deck.html ImageObject shape does; nested LearningResource.image need not). */
  includeUrl?: boolean;
  representativeOfPage?: boolean;
}

/**
 * Build an ImageObject carrying the full licensable-image field block. No `@context` — intended to
 * be nested (e.g. `LearningResource.image`) or spread into a standalone node that adds its own.
 */
export function licensableImageObject(i: LicensableImageInput): Record<string, unknown> {
  const o: Record<string, unknown> = {
    '@type': 'ImageObject',
    contentUrl: i.contentUrl,
    name: i.name || i.caption,
    caption: i.caption,
    license: licenseUrlFor(i.locale),
    acquireLicensePage: i.acquireLicensePage,
    creditText: 'LessonCraftStudio',
    creator: { '@type': 'Organization', name: 'LessonCraftStudio' },
    copyrightHolder: { '@type': 'Organization', name: 'LessonCraftStudio' },
    copyrightNotice: '© LessonCraftStudio',
  };
  if (i.includeUrl) o.url = i.contentUrl;
  if (i.width) o.width = i.width;
  if (i.height) o.height = i.height;
  if (i.encodingFormat) o.encodingFormat = i.encodingFormat;
  if (i.representativeOfPage) o.representativeOfPage = true;
  return o;
}
