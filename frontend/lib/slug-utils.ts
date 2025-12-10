/**
 * Professional slug normalization utilities
 * Handles special characters from all European languages
 */

// Character transliteration map for European languages
const CHAR_MAP: Record<string, string> = {
  // German
  'ä': 'ae', 'ö': 'oe', 'ü': 'ue', 'ß': 'ss',
  'Ä': 'Ae', 'Ö': 'Oe', 'Ü': 'Ue',

  // French
  'à': 'a', 'â': 'a', 'æ': 'ae', 'ç': 'c', 'é': 'e', 'è': 'e',
  'ê': 'e', 'ë': 'e', 'î': 'i', 'ï': 'i', 'ô': 'o', 'œ': 'oe',
  'ù': 'u', 'û': 'u', 'ü': 'u', 'ÿ': 'y',
  'À': 'A', 'Â': 'A', 'Æ': 'Ae', 'Ç': 'C', 'É': 'E', 'È': 'E',
  'Ê': 'E', 'Ë': 'E', 'Î': 'I', 'Ï': 'I', 'Ô': 'O', 'Œ': 'Oe',
  'Ù': 'U', 'Û': 'U', 'Ü': 'U', 'Ÿ': 'Y',

  // Spanish
  'á': 'a', 'í': 'i', 'ó': 'o', 'ú': 'u', 'ñ': 'n',
  'Á': 'A', 'Í': 'I', 'Ó': 'O', 'Ú': 'U', 'Ñ': 'N',

  // Portuguese
  'ã': 'a', 'õ': 'o',
  'Ã': 'A', 'Õ': 'O',

  // Italian
  // (shares many with French/Spanish, already covered)

  // Dutch
  // (shares characters with German, already covered)

  // Scandinavian (Danish, Swedish, Norwegian)
  'å': 'aa', 'ø': 'oe', 'æ': 'ae',
  'Å': 'Aa', 'Ø': 'Oe', 'Æ': 'Ae',

  // Polish (common characters)
  'ą': 'a', 'ć': 'c', 'ę': 'e', 'ł': 'l', 'ń': 'n',
  'ś': 's', 'ź': 'z', 'ż': 'z',
  'Ą': 'A', 'Ć': 'C', 'Ę': 'E', 'Ł': 'L', 'Ń': 'N',
  'Ś': 'S', 'Ź': 'Z', 'Ż': 'Z',

  // Czech/Slovak
  'č': 'c', 'ď': 'd', 'ě': 'e', 'ň': 'n', 'ř': 'r',
  'š': 's', 'ť': 't', 'ů': 'u', 'ž': 'z',
  'Č': 'C', 'Ď': 'D', 'Ě': 'E', 'Ň': 'N', 'Ř': 'R',
  'Š': 'S', 'Ť': 'T', 'Ů': 'U', 'Ž': 'Z',

  // Other common characters (using Unicode escape sequences)
  '\u2018': '', '\u2019': '', '\u201C': '', '\u201D': '', '\u2013': '-', '\u2014': '-',
  '\u2026': '...', '\u00AB': '', '\u00BB': '', '\u2039': '', '\u203A': '',
};

/**
 * Normalize a slug to be URL-safe
 * @param text - The text to convert to a slug
 * @returns URL-safe slug
 */
export function normalizeSlug(text: string): string {
  if (!text) return '';

  let slug = text;

  // Step 1: Transliterate special characters
  for (const [char, replacement] of Object.entries(CHAR_MAP)) {
    slug = slug.replace(new RegExp(char, 'g'), replacement);
  }

  // Step 2: Convert to lowercase
  slug = slug.toLowerCase();

  // Step 3: Remove any remaining non-ASCII characters
  slug = slug.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  // Step 4: Replace spaces and underscores with hyphens
  slug = slug.replace(/[\s_]+/g, '-');

  // Step 5: Remove all non-alphanumeric characters except hyphens
  slug = slug.replace(/[^a-z0-9-]/g, '');

  // Step 6: Remove duplicate hyphens
  slug = slug.replace(/-+/g, '-');

  // Step 7: Remove leading/trailing hyphens
  slug = slug.replace(/^-+|-+$/g, '');

  return slug;
}

/**
 * Validate a slug
 * @param slug - The slug to validate
 * @returns True if valid
 */
export function isValidSlug(slug: string): boolean {
  // Valid slug: lowercase letters, numbers, hyphens only
  // Cannot start or end with hyphen
  // No consecutive hyphens
  return /^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug);
}
