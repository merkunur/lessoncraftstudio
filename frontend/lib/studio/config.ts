// Story Studio tenancy — quotas + shared constants (premium class #3).
// These numbers become pricing-page-visible claims once the studio is
// marketed; change deliberately.

export const STUDIO_QUOTAS = {
  /** Maximum non-deleted stories per teacher. */
  MAX_STORIES_PER_TEACHER: 20,
  /** Maximum binary asset bytes per story (scenes + uploads + cast + exercises + audio). */
  MAX_ASSET_BYTES_PER_STORY: 60 * 1024 * 1024,
  /** Maximum single image upload (scenes, props, single-image characters). */
  MAX_IMAGE_BYTES: 10 * 1024 * 1024,
  /** Maximum SEP exercise package (matches the local studio-server's 40MB zip cap). */
  MAX_SEP_PACKAGE_BYTES: 40 * 1024 * 1024,
  /** Maximum serialized story.json. */
  MAX_STORY_JSON_BYTES: 2 * 1024 * 1024,
  /** Maximum serialized strings.json. */
  MAX_STRINGS_JSON_BYTES: 1 * 1024 * 1024,
} as const;

/** JSON revision snapshots kept per story (replaces the local .bak files). */
export const STUDIO_REVISIONS_KEPT = 10;

/** Days a soft-deleted story's files are kept before scripts/studio/cleanup-deleted.js removes them. */
export const STUDIO_DELETED_RETENTION_DAYS = 30;

/** Canonical stored-src prefix for tenant binaries. Serving rewrites this to /api/play/<linkId>/m/. */
export const STUDIO_CANONICAL_PREFIX = '/studio-media/';

/** Play-API base; media path under a link is /api/play/<linkId>/m/<relpath>. */
export const STUDIO_PLAY_API_PREFIX = '/api/play/';

/** Allowed src prefixes for PLATFORM (public, static) assets referenced by tenant stories. */
export const STUDIO_PUBLIC_SRC_PREFIXES = ['/mini-tools/', '/image-library-webp/'] as const;

/** Scene target dimensions (the sb-1 design space). */
export const STUDIO_SCENE_W = 1600;
export const STUDIO_SCENE_H = 1000;

export type StudioLinkKind = 'preview' | 'share';
