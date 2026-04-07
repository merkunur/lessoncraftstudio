/**
 * Internal Linking Strategy — Reference/Audit File
 *
 * Defines the hub-and-spoke internal linking structure for all English pages.
 * NOT imported at runtime — content files contain their own internalLinks arrays.
 * Use this file for link audits, orphan detection, and linking strategy planning.
 *
 * Linking rules:
 *   1. Every app page links to: its guide, its tool, 2-3 related apps
 *   2. Every guide links to: relevant app(s), 2-3 related guides, pricing
 *   3. Every blog links to: at least 1 app, 1 guide, and /tools
 *   4. Homepage links to: top 6 apps, top 3 guides, pricing, tools
 *   5. Hub pages (apps, guides, ideas, start, bundles, tools) link to all children
 */

// =============================================================================
// Types
// =============================================================================

export interface InternalLinkRule {
  /** Source page path */
  source: string;
  /** Target pages to link TO from this source */
  targets: string[];
  /** Why this relationship exists */
  context: string;
}

export interface HubDefinition {
  /** Hub page path */
  hub: string;
  /** All spoke pages this hub links to */
  spokes: string[];
  /** Topic this hub covers */
  topic: string;
}

// =============================================================================
// APP <-> GUIDE <-> TOOL TRIPLETS
// Each app has a corresponding guide and tool page. These three always interlink.
// =============================================================================

export const appGuideTriplets: { appId: string; app: string; guide: string; tool: string }[] = [
  // Math
  { appId: 'addition', app: '/en/apps/addition-worksheets', guide: '/en/guides/create-addition-worksheets', tool: '/en/tools/addition-worksheet-maker' },
  { appId: 'subtraction', app: '/en/apps/subtraction-worksheets', guide: '/en/guides/create-subtraction-worksheets', tool: '/en/tools/subtraction-worksheet-maker' },
  { appId: 'code-addition', app: '/en/apps/code-addition-worksheets', guide: '/en/guides/create-addition-worksheets', tool: '/en/tools/code-addition-worksheet-maker' },
  { appId: 'math-puzzle', app: '/en/apps/math-puzzle-worksheets', guide: '/en/guides/create-math-puzzle-worksheets', tool: '/en/tools/math-puzzle-maker' },
  { appId: 'math-worksheet', app: '/en/apps/math-worksheets', guide: '/en/guides/sell-math-worksheets-etsy', tool: '/en/tools/math-worksheet-maker' },
  { appId: 'chart-count', app: '/en/apps/chart-count-worksheets', guide: '/en/guides/create-chart-count-worksheets', tool: '/en/tools/chart-count-maker' },
  // Language
  { appId: 'word-search', app: '/en/apps/word-search-worksheets', guide: '/en/guides/create-word-search-puzzles', tool: '/en/tools/word-search-maker' },
  { appId: 'crossword', app: '/en/apps/crossword-worksheets', guide: '/en/guides/create-crossword-puzzles', tool: '/en/tools/crossword-maker' },
  { appId: 'cryptogram', app: '/en/apps/cryptogram-worksheets', guide: '/en/guides/create-cryptogram-puzzles', tool: '/en/tools/cryptogram-maker' },
  { appId: 'word-scramble', app: '/en/apps/word-scramble-worksheets', guide: '/en/guides/create-word-search-puzzles', tool: '/en/tools/word-scramble-maker' },
  { appId: 'word-guess', app: '/en/apps/word-guess-worksheets', guide: '/en/guides/create-word-search-puzzles', tool: '/en/tools/word-guess-maker' },
  { appId: 'writing', app: '/en/apps/writing-worksheets', guide: '/en/guides/create-handwriting-sheets', tool: '/en/tools/handwriting-worksheet-maker' },
  { appId: 'alphabet-train', app: '/en/apps/alphabet-train-worksheets', guide: '/en/guides/create-alphabet-worksheets', tool: '/en/tools/alphabet-train-maker' },
  // Visual Learning
  { appId: 'matching', app: '/en/apps/matching-worksheets', guide: '/en/guides/create-matching-worksheets', tool: '/en/tools/matching-worksheet-maker' },
  { appId: 'drawing-lines', app: '/en/apps/drawing-lines-worksheets', guide: '/en/guides/create-drawing-worksheets', tool: '/en/tools/drawing-lines-maker' },
  { appId: 'find-objects', app: '/en/apps/find-objects-worksheets', guide: '/en/guides/create-hidden-object-worksheets', tool: '/en/tools/hidden-object-maker' },
  { appId: 'grid-match', app: '/en/apps/grid-match-worksheets', guide: '/en/guides/create-matching-worksheets', tool: '/en/tools/grid-match-maker' },
  { appId: 'find-and-count', app: '/en/apps/find-and-count-worksheets', guide: '/en/guides/create-hidden-object-worksheets', tool: '/en/tools/find-and-count-maker' },
  { appId: 'missing-pieces', app: '/en/apps/missing-pieces-worksheets', guide: '/en/guides/create-missing-pieces-puzzles', tool: '/en/tools/missing-pieces-maker' },
  { appId: 'shadow-match', app: '/en/apps/shadow-match-worksheets', guide: '/en/guides/create-shadow-matching-worksheets', tool: '/en/tools/shadow-match-maker' },
  // Creative
  { appId: 'coloring', app: '/en/apps/coloring-worksheets', guide: '/en/guides/create-coloring-pages', tool: '/en/tools/coloring-page-maker' },
  { appId: 'draw-and-color', app: '/en/apps/draw-and-color-worksheets', guide: '/en/guides/create-drawing-worksheets', tool: '/en/tools/draw-and-color-maker' },
  { appId: 'bingo', app: '/en/apps/picture-bingo-worksheets', guide: '/en/guides/create-bingo-cards', tool: '/en/tools/bingo-card-maker' },
  // Logic & Puzzles
  { appId: 'pattern-train', app: '/en/apps/pattern-train-worksheets', guide: '/en/guides/create-pattern-worksheets', tool: '/en/tools/pattern-train-maker' },
  { appId: 'pattern-worksheet', app: '/en/apps/pattern-worksheets', guide: '/en/guides/create-pattern-worksheets', tool: '/en/tools/pattern-worksheet-maker' },
  { appId: 'treasure-hunt', app: '/en/apps/treasure-hunt-worksheets', guide: '/en/guides/create-treasure-hunt-worksheets', tool: '/en/tools/treasure-hunt-maker' },
  { appId: 'sudoku', app: '/en/apps/sudoku-worksheets', guide: '/en/guides/create-picture-sudoku', tool: '/en/tools/sudoku-maker' },
  { appId: 'big-small', app: '/en/apps/big-small-worksheets', guide: '/en/guides/create-size-comparison-worksheets', tool: '/en/tools/big-and-small-worksheet-maker' },
  { appId: 'more-less', app: '/en/apps/more-less-worksheets', guide: '/en/guides/sell-math-worksheets-etsy', tool: '/en/tools/more-or-less-worksheet-maker' },
  { appId: 'odd-one-out', app: '/en/apps/odd-one-out-worksheets', guide: '/en/guides/create-odd-one-out-puzzles', tool: '/en/tools/odd-one-out-maker' },
  { appId: 'picture-path', app: '/en/apps/picture-path-worksheets', guide: '/en/guides/create-maze-worksheets', tool: '/en/tools/picture-path-maker' },
  { appId: 'picture-sort', app: '/en/apps/picture-sort-worksheets', guide: '/en/guides/create-sorting-worksheets', tool: '/en/tools/picture-sort-maker' },
  { appId: 'prepositions', app: '/en/apps/prepositions-worksheets', guide: '/en/guides/create-preposition-worksheets', tool: '/en/tools/prepositions-worksheet-maker' },
];

// =============================================================================
// BUNDLE -> APP MAPPINGS
// Each bundle links to all apps it includes.
// =============================================================================

export const bundleAppMappings: { bundle: string; apps: string[] }[] = [
  {
    bundle: '/en/bundles/math-bundle',
    apps: [
      '/en/apps/addition-worksheets',
      '/en/apps/subtraction-worksheets',
      '/en/apps/code-addition-worksheets',
      '/en/apps/math-puzzle-worksheets',
      '/en/apps/math-worksheets',
      '/en/apps/chart-count-worksheets',
    ],
  },
  {
    bundle: '/en/bundles/literacy-bundle',
    apps: [
      '/en/apps/word-search-worksheets',
      '/en/apps/crossword-worksheets',
      '/en/apps/cryptogram-worksheets',
      '/en/apps/word-scramble-worksheets',
      '/en/apps/word-guess-worksheets',
      '/en/apps/writing-worksheets',
      '/en/apps/alphabet-train-worksheets',
    ],
  },
  {
    bundle: '/en/bundles/visual-bundle',
    apps: [
      '/en/apps/coloring-worksheets',
      '/en/apps/draw-and-color-worksheets',
      '/en/apps/drawing-lines-worksheets',
      '/en/apps/pattern-train-worksheets',
      '/en/apps/pattern-worksheets',
      '/en/apps/chart-count-worksheets',
      '/en/apps/prepositions-worksheets',
    ],
  },
  {
    bundle: '/en/bundles/matching-bundle',
    apps: [
      '/en/apps/matching-worksheets',
      '/en/apps/shadow-match-worksheets',
      '/en/apps/grid-match-worksheets',
      '/en/apps/picture-bingo-worksheets',
      '/en/apps/picture-sort-worksheets',
    ],
  },
  {
    bundle: '/en/bundles/puzzle-bundle',
    apps: [
      '/en/apps/missing-pieces-worksheets',
      '/en/apps/odd-one-out-worksheets',
      '/en/apps/sudoku-worksheets',
      '/en/apps/picture-path-worksheets',
    ],
  },
  {
    bundle: '/en/bundles/search-bundle',
    apps: [
      '/en/apps/find-objects-worksheets',
      '/en/apps/find-and-count-worksheets',
      '/en/apps/crossword-worksheets',
      '/en/apps/treasure-hunt-worksheets',
    ],
  },
];

// =============================================================================
// HUB-AND-SPOKE STRUCTURE
// Major topic hubs that link to all related content.
// =============================================================================

export const hubs: HubDefinition[] = [
  // --- Category Hubs (index pages) ---
  {
    hub: '/en',
    topic: 'Homepage — top apps, guides, and navigation',
    spokes: [
      '/en/apps',
      '/en/tools',
      '/en/guides',
      '/en/ideas',
      '/en/start',
      '/en/bundles',
      '/en/blog',
      // Top 6 apps (one per category)
      '/en/apps/word-search-worksheets',
      '/en/apps/addition-worksheets',
      '/en/apps/coloring-worksheets',
      '/en/apps/matching-worksheets',
      '/en/apps/sudoku-worksheets',
      '/en/apps/find-objects-worksheets',
      // Top 3 guides
      '/en/start/complete-guide-printable-business',
      '/en/guides/start-etsy-printable-shop',
      '/en/guides/etsy-seo-educational-printables',
    ],
  },
  {
    hub: '/en/apps',
    topic: 'Apps index — all 33 worksheet generator apps',
    spokes: appGuideTriplets.map(t => t.app),
  },
  {
    hub: '/en/tools',
    topic: 'Tools index — all 33 free tool pages',
    spokes: appGuideTriplets.map(t => t.tool),
  },
  {
    hub: '/en/guides',
    topic: 'Guides index — all 65 seller guides',
    spokes: [], // Too many to list inline — all guide pages are linked from the index
  },
  {
    hub: '/en/ideas',
    topic: 'Ideas index — all 45 niche idea pages',
    spokes: [], // All idea pages linked from index
  },
  {
    hub: '/en/start',
    topic: 'Start index — 12 cornerstone guides',
    spokes: [
      '/en/start/complete-guide-printable-business',
      '/en/start/create-worksheets-that-sell',
      '/en/start/printable-business-blueprint',
      '/en/start/etsy-printable-business',
      '/en/start/amazon-kdp-activity-books',
      '/en/start/create-multilingual-worksheets',
      '/en/start/commercial-license-guide',
      '/en/start/printable-business-income',
      '/en/start/tools-for-printable-business',
      '/en/start/marketing-printable-business',
      '/en/start/scaling-printable-business',
      '/en/start/printable-business-legal',
    ],
  },
  {
    hub: '/en/bundles',
    topic: 'Bundles index — 6 category bundles',
    spokes: [
      '/en/bundles/math-bundle',
      '/en/bundles/literacy-bundle',
      '/en/bundles/visual-bundle',
      '/en/bundles/matching-bundle',
      '/en/bundles/puzzle-bundle',
      '/en/bundles/search-bundle',
    ],
  },

  // --- Topic Hubs (cross-content-type clusters) ---
  {
    hub: '/en/guides/sell-math-worksheets-etsy',
    topic: 'Math Hub — all math-related content',
    spokes: [
      '/en/apps/addition-worksheets',
      '/en/apps/subtraction-worksheets',
      '/en/apps/math-worksheets',
      '/en/apps/math-puzzle-worksheets',
      '/en/apps/code-addition-worksheets',
      '/en/apps/chart-count-worksheets',
      '/en/guides/create-addition-worksheets',
      '/en/guides/create-subtraction-worksheets',
      '/en/guides/create-math-puzzle-worksheets',
      '/en/guides/create-chart-count-worksheets',
      '/en/guides/math-activity-books-kdp',
      '/en/blog/sell-addition-worksheets-etsy-guide',
      '/en/blog/math-worksheet-bundles-that-sell',
      '/en/blog/math-puzzle-books-amazon-kdp',
      '/en/bundles/math-bundle',
    ],
  },
  {
    hub: '/en/guides/sell-word-search-etsy',
    topic: 'Language/Puzzle Hub — word puzzle content',
    spokes: [
      '/en/apps/word-search-worksheets',
      '/en/apps/crossword-worksheets',
      '/en/apps/cryptogram-worksheets',
      '/en/apps/word-scramble-worksheets',
      '/en/apps/word-guess-worksheets',
      '/en/guides/create-word-search-puzzles',
      '/en/guides/create-crossword-puzzles',
      '/en/guides/create-cryptogram-puzzles',
      '/en/guides/word-search-books-kdp',
      '/en/guides/publish-puzzle-books-kdp',
      '/en/blog/word-search-printables-profit',
      '/en/blog/crossword-books-kdp-niche',
      '/en/blog/cryptogram-worksheets-sell',
      '/en/bundles/literacy-bundle',
    ],
  },
  {
    hub: '/en/guides/sell-educational-printables-etsy',
    topic: 'Etsy Selling Hub — all Etsy-focused content',
    spokes: [
      '/en/guides/start-etsy-printable-shop',
      '/en/guides/etsy-seo-educational-printables',
      '/en/guides/price-etsy-printables',
      '/en/guides/get-reviews-printable-products',
      '/en/guides/create-etsy-coloring-pages',
      '/en/guides/create-etsy-worksheet-bundles',
      '/en/blog/etsy-seo-printable-sellers-2026',
      '/en/blog/etsy-listing-optimization-worksheets',
      '/en/blog/etsy-keyword-research-printables',
      '/en/blog/etsy-printable-pricing-strategy',
      '/en/blog/etsy-printable-shop-first-month',
      '/en/blog/etsy-ads-printables-worth-it',
      '/en/blog/etsy-reviews-printable-products',
      '/en/start/etsy-printable-business',
    ],
  },
  {
    hub: '/en/guides/publish-puzzle-books-kdp',
    topic: 'KDP Hub — all Amazon KDP content',
    spokes: [
      '/en/guides/kdp-formatting-worksheets',
      '/en/guides/best-kdp-activity-book-niches',
      '/en/guides/make-money-kdp-activity-books',
      '/en/guides/math-activity-books-kdp',
      '/en/guides/word-search-books-kdp',
      '/en/guides/sudoku-books-kdp',
      '/en/guides/kdp-vs-etsy-printables',
      '/en/blog/kdp-activity-book-formatting-guide',
      '/en/blog/kdp-vs-etsy-which-earns-more',
      '/en/blog/math-puzzle-books-amazon-kdp',
      '/en/blog/crossword-books-kdp-niche',
      '/en/blog/picture-sudoku-books-kdp',
      '/en/blog/missing-pieces-puzzles-kdp',
      '/en/blog/create-activity-book-kdp-start-finish',
      '/en/start/amazon-kdp-activity-books',
    ],
  },
  {
    hub: '/en/guides/multilingual-printable-business',
    topic: 'Multilingual Hub — international selling content',
    spokes: [
      '/en/guides/worksheets-multiple-languages',
      '/en/start/create-multilingual-worksheets',
      '/en/blog/multilingual-printables-advantage',
      '/en/blog/11-languages-sell-globally',
      '/en/blog/esl-worksheets-global-market',
      '/en/ideas/esl-printable-ideas',
    ],
  },
  {
    hub: '/en/guides/niche-selection-printables',
    topic: 'Niche Selection Hub — finding profitable niches',
    spokes: [
      '/en/guides/research-profitable-niches',
      '/en/guides/best-kdp-activity-book-niches',
      '/en/blog/best-printable-niches-low-competition',
      '/en/ideas',
    ],
  },
  {
    hub: '/en/guides/scale-printable-business-guide',
    topic: 'Scaling Hub — growing to full-time income',
    spokes: [
      '/en/guides/automate-printable-business',
      '/en/guides/passive-income-worksheets',
      '/en/guides/create-printable-product-line',
      '/en/guides/multilingual-printable-business',
      '/en/blog/scale-printable-business-automation',
      '/en/blog/passive-income-printables-truth',
      '/en/blog/printable-business-income-realistic',
      '/en/start/scaling-printable-business',
    ],
  },
];

// =============================================================================
// RELATED APP CLUSTERS
// Apps within the same category that should cross-link to each other.
// =============================================================================

export const relatedAppClusters: { category: string; apps: string[] }[] = [
  {
    category: 'Math',
    apps: [
      '/en/apps/addition-worksheets',
      '/en/apps/subtraction-worksheets',
      '/en/apps/code-addition-worksheets',
      '/en/apps/math-puzzle-worksheets',
      '/en/apps/math-worksheets',
      '/en/apps/chart-count-worksheets',
    ],
  },
  {
    category: 'Language',
    apps: [
      '/en/apps/word-search-worksheets',
      '/en/apps/crossword-worksheets',
      '/en/apps/cryptogram-worksheets',
      '/en/apps/word-scramble-worksheets',
      '/en/apps/word-guess-worksheets',
      '/en/apps/writing-worksheets',
      '/en/apps/alphabet-train-worksheets',
    ],
  },
  {
    category: 'Visual Learning',
    apps: [
      '/en/apps/matching-worksheets',
      '/en/apps/drawing-lines-worksheets',
      '/en/apps/find-objects-worksheets',
      '/en/apps/grid-match-worksheets',
      '/en/apps/find-and-count-worksheets',
      '/en/apps/missing-pieces-worksheets',
      '/en/apps/shadow-match-worksheets',
    ],
  },
  {
    category: 'Creative',
    apps: [
      '/en/apps/coloring-worksheets',
      '/en/apps/draw-and-color-worksheets',
      '/en/apps/picture-bingo-worksheets',
    ],
  },
  {
    category: 'Logic & Puzzles',
    apps: [
      '/en/apps/pattern-train-worksheets',
      '/en/apps/pattern-worksheets',
      '/en/apps/treasure-hunt-worksheets',
      '/en/apps/sudoku-worksheets',
      '/en/apps/big-small-worksheets',
      '/en/apps/more-less-worksheets',
      '/en/apps/odd-one-out-worksheets',
      '/en/apps/picture-path-worksheets',
      '/en/apps/picture-sort-worksheets',
      '/en/apps/prepositions-worksheets',
    ],
  },
];

// =============================================================================
// BLOG -> APP/GUIDE MAPPINGS
// Each blog post links to at least 1 app and 1 guide.
// (Encoded in blogKeywords[].internalLinksTo in keyword-map.ts)
// =============================================================================

export const blogLinkingRules = {
  /** Every blog post must link to at least 1 app page */
  minAppLinks: 1,
  /** Every blog post must link to at least 1 guide */
  minGuideLinks: 1,
  /** Every blog post should link to the free tools index */
  alwaysLinkTo: '/en/tools',
  /** Product-specific blogs link to their app and guide */
  productBlogPattern: 'blog about {app} -> /en/apps/{app} + /en/guides/create-{app}',
  /** Platform blogs link to the platform guide */
  platformBlogPattern: 'blog about {platform} -> /en/guides/{platform}-guide',
};

// =============================================================================
// GUIDE LINKING RULES
// =============================================================================

export const guideLinkingRules = {
  /** Product creation guides link to their app + tool */
  productGuideLinks: 'create-{app} guide -> /en/apps/{app} + /en/tools/{app}-maker',
  /** Platform guides link to the start page + related guides */
  platformGuideLinks: 'platform guide -> /en/start/{platform} + 2-3 related guides',
  /** All guides link to pricing at bottom */
  pricingLink: '/en/bundles',
  /** Strategy guides link to related strategy guides */
  strategyGuideClusters: [
    ['/en/guides/pricing-educational-printables', '/en/guides/price-etsy-printables', '/en/guides/create-worksheet-bundles'],
    ['/en/guides/etsy-seo-educational-printables', '/en/guides/get-reviews-printable-products', '/en/guides/pinterest-marketing-worksheets'],
    ['/en/guides/scale-printable-business-guide', '/en/guides/automate-printable-business', '/en/guides/passive-income-worksheets'],
    ['/en/guides/niche-selection-printables', '/en/guides/research-profitable-niches', '/en/guides/best-kdp-activity-book-niches'],
    ['/en/guides/copyright-printable-sellers', '/en/guides/understanding-commercial-licenses', '/en/guides/quality-standards-worksheets'],
    ['/en/guides/publish-puzzle-books-kdp', '/en/guides/kdp-formatting-worksheets', '/en/guides/make-money-kdp-activity-books'],
    ['/en/guides/social-media-printable-marketing', '/en/guides/pinterest-marketing-worksheets', '/en/guides/email-marketing-printables'],
  ],
};

// =============================================================================
// SEASONAL CONTENT CLUSTERS
// Seasonal blog posts and idea pages that interlink.
// =============================================================================

export const seasonalClusters: { season: string; pages: string[] }[] = [
  {
    season: 'Christmas / Winter',
    pages: [
      '/en/blog/best-printables-sell-christmas',
      '/en/blog/winter-printables-sell-december-january',
      '/en/ideas/christmas-printable-ideas',
      '/en/ideas/winter-printable-ideas',
    ],
  },
  {
    season: 'Halloween / Fall',
    pages: [
      '/en/blog/halloween-printables-sell-october',
      '/en/blog/thanksgiving-printables-sell-november',
      '/en/ideas/halloween-printable-ideas',
      '/en/ideas/thanksgiving-printable-ideas',
    ],
  },
  {
    season: 'Valentine / Spring',
    pages: [
      '/en/blog/valentines-day-printables-sell',
      '/en/blog/easter-printables-business-spring',
      '/en/blog/spring-printables-sell-march-april',
      '/en/ideas/valentines-day-printable-ideas',
      '/en/ideas/easter-printable-ideas',
      '/en/ideas/spring-printable-ideas',
    ],
  },
  {
    season: 'Summer',
    pages: [
      '/en/blog/summer-activity-printables-sell',
      '/en/ideas/summer-printable-ideas',
      '/en/ideas/summer-learning-printable-ideas',
      '/en/blog/travel-activity-printables-sell',
    ],
  },
  {
    season: 'Back to School',
    pages: [
      '/en/blog/back-to-school-printable-rush',
      '/en/ideas/back-to-school-printable-ideas',
    ],
  },
  {
    season: 'Mother\'s / Father\'s Day',
    pages: [
      '/en/blog/printables-sell-mothers-day-fathers-day',
      '/en/ideas/parents-day-printable-ideas',
    ],
  },
  {
    season: 'New Year / January',
    pages: [
      '/en/blog/new-year-printables-january',
    ],
  },
];

// =============================================================================
// CALENDAR HUB
// The seasonal calendar post is the central node for all seasonal content.
// =============================================================================

export const seasonalCalendarHub: InternalLinkRule = {
  source: '/en/blog/seasonal-printable-calendar-sellers',
  targets: [
    '/en/blog/best-printables-sell-christmas',
    '/en/blog/halloween-printables-sell-october',
    '/en/blog/back-to-school-printable-rush',
    '/en/blog/valentines-day-printables-sell',
    '/en/blog/easter-printables-business-spring',
    '/en/blog/summer-activity-printables-sell',
    '/en/blog/thanksgiving-printables-sell-november',
    '/en/blog/printables-sell-mothers-day-fathers-day',
    '/en/blog/new-year-printables-january',
    '/en/blog/spring-printables-sell-march-april',
    '/en/blog/winter-printables-sell-december-january',
    '/en/guides/seasonal-marketing-printables',
  ],
  context: 'Central seasonal calendar linking to all monthly/holiday content',
};

// =============================================================================
// ANIMAL THEME CLUSTER
// Animal-themed blog posts and idea pages interlink.
// =============================================================================

export const animalThemeCluster: InternalLinkRule = {
  source: '/en/blog/animal-themed-printables-sell',
  targets: [
    '/en/blog/farm-animal-printables-sell',
    '/en/blog/ocean-themed-printables-sell',
    '/en/blog/dinosaur-printables-sell-evergreen',
    '/en/ideas/farm-animals-printable-ideas',
    '/en/ideas/ocean-animals-printable-ideas',
    '/en/ideas/safari-animals-printable-ideas',
    '/en/ideas/forest-animals-printable-ideas',
    '/en/ideas/pets-printable-ideas',
    '/en/ideas/birds-printable-ideas',
    '/en/ideas/insects-printable-ideas',
    '/en/ideas/dinosaur-printable-ideas',
    '/en/ideas/underwater-printable-ideas',
  ],
  context: 'Central animal theme post linking to all animal sub-theme content',
};

// =============================================================================
// COMPARE PAGE LINKS
// Comparison pages link to each other and to the apps/tools they compare.
// =============================================================================

export const compareLinks: InternalLinkRule[] = [
  {
    source: '/en/compare/best-puzzle-book-software',
    targets: ['/en/compare/lcs-vs-canva', '/en/compare/lcs-vs-book-bolt', '/en/apps', '/en/tools'],
    context: 'Roundup links to individual comparisons',
  },
  {
    source: '/en/compare/lcs-vs-canva',
    targets: ['/en/compare/best-puzzle-book-software', '/en/apps', '/en/tools', '/en/blog/worksheet-generator-vs-canva-comparison'],
    context: 'Individual comparison links to roundup and blog deep-dive',
  },
  {
    source: '/en/compare/lcs-vs-book-bolt',
    targets: ['/en/compare/best-puzzle-book-software', '/en/apps', '/en/start/amazon-kdp-activity-books'],
    context: 'Book Bolt comparison links to KDP start guide',
  },
];
