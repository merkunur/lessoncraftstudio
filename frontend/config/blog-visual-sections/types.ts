import type { BlogCategory } from '@/config/blog-content/types';

/** Which visual section type to render */
export type VisualSectionType = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J';

/** Locale-independent image reference — resolved to full URL at render time via imgUrl() */
export interface ImageRef {
  appFolder: string;   // sample folder name, e.g. 'addition', 'word search'
  filename: string;    // e.g. 'addition_worksheet portrait.jpeg'
}

/** Product showcase card config */
export interface ProductCardItem {
  image: ImageRef;
  productName: string;   // English display name (localized at render time if needed)
  price: string;         // e.g. '$4.99'
  stars: number;         // 1-5
}

/** Per-blog visual configuration — locale-independent */
export interface BlogVisualConfig {
  /** Primary generator(s) this post references */
  primaryGenerators: string[];

  /** Section A: Hero Sample Banner — 2-3 fanned worksheets */
  heroImages: [ImageRef, ImageRef] | [ImageRef, ImageRef, ImageRef];

  /** Section B: Product Showcase Cards (Category 1 & 3) */
  productCards?: { items: ProductCardItem[] };

  /** Section C: Before/After Comparison (Category 2) */
  beforeAfter?: { lcsImage: ImageRef };

  /** Section D: Difficulty Tier Showcase (Category 1 & 4) */
  difficultyTiers?: {
    beginner: ImageRef;
    intermediate: ImageRef;
    advanced: ImageRef;
  };

  /** Section E: Themed Image Grid (Category 3) — 8-12 images */
  themedGrid?: { images: ImageRef[] };

  /** Section F: Bundle Visualization (Category 2) */
  bundle?: { images: ImageRef[]; pageCount: number };

  /** Section G: Worksheet + Answer Key Pair (Category 1 & 4) */
  worksheetAnswerPair?: {
    worksheet: ImageRef;
    answerKey: ImageRef;
  };

  /** Section H: Platform Mockup (Category 2) */
  platformMockup?: { platform: 'etsy' | 'kdp'; image: ImageRef };

  /** Section J: CTA with Sample — rotated worksheet + button */
  ctaSample: ImageRef;

  /** Tailwind accent color name for CSS decorations */
  accentColor: string;
}

/** Where a visual section should be placed relative to the text content */
export interface SectionPlacement {
  type: VisualSectionType;
  /** Placement position in the blog post flow */
  position: 'after-hero' | 'after-intro' | 'after-section' | 'before-takeaways';
  /** For 'after-section': which text section index to place after */
  sectionIndex?: number;
}
