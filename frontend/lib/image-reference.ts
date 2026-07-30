/**
 * Canonical image reference format for the LessonCraftStudio interactive
 * deck system. Source of truth for the shape of (key, theme, variant)
 * references that flow through deck bundles and the WebP lookup function.
 *
 * Runtime implementation lives at:
 *   frontend/public/worksheet-generators/js/image-reference.js
 * (loaded by the worksheet-generator apps via <script src=...>)
 *
 * Bundle JSON shape (interactive deck v5.0.0+):
 *   {
 *     "imageRefs": {
 *       "<theme>/<key>": { "variants": { "1x": "data:...", "2x": "...", "3x": "..." } }
 *     },
 *     "problems": [
 *       { ..., "imageRefs": [{ "key": "cow", "theme": "animals", "rect": {x,y,w,h} }, ...] }
 *     ]
 *   }
 */

export type ImageVariant = '1x' | '2x' | '3x';

/** A fully-qualified image lookup request (key + theme + the variant chosen by the renderer). */
export interface ImageReference {
  /** Vocabulary key, already passed through normalizeKey (lowercase, underscores, transliterated). */
  key: string;
  /** Theme folder name, kept verbatim (e.g. "animals", "At the Supermarket", "BACKGROUNDS"). */
  theme: string;
  /** Resolution variant chosen by the renderer based on display CSS width × device pixel ratio. */
  variant: ImageVariant;
}

/** A placement of an image on the worksheet page (key + theme + world rect). Variant is chosen later. */
export interface ImagePlacement {
  key: string;
  theme: string;
  /** World coordinates in canvas pixels: center-x, center-y, width, height (matches the existing rect convention used by attribution / answer-line). */
  rect: { x: number; y: number; w: number; h: number };
}

/** The deduplicated, base64-embedded variant set for one (theme, key) pair as carried in a deck bundle. */
export interface BundledImageVariants {
  /** "1x"/"2x"/"3x" → data URL. Variants that don't exist for the source (small images) are omitted. */
  variants: Partial<Record<ImageVariant, string>>;
}

/** Top-level imageRefs map carried in a deck bundle, keyed by `${theme}/${key}`. */
export type ImageRefsMap = Record<string, BundledImageVariants>;
