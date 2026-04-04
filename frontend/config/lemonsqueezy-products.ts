/**
 * Lemon Squeezy Product Configuration
 *
 * Maps internal app IDs to Lemon Squeezy product IDs and checkout URLs.
 * Generated from Lemon Squeezy API on 2027-04-04.
 */

import type { AppId, CategoryId } from './products';

// ==========================================
// INDIVIDUAL APP PRODUCTS ($49 each)
// ==========================================

export const LS_APP_PRODUCTS: Record<AppId, { productId: string; buyNowUrl: string }> = {
  'addition': { productId: '946365', buyNowUrl: 'https://lessoncraftstudio-com.lemonsqueezy.com/checkout/buy/ae8092d9-782e-4a67-9238-0386bcfba433' },
  'subtraction': { productId: '946386', buyNowUrl: 'https://lessoncraftstudio-com.lemonsqueezy.com/checkout/buy/79c62944-ba01-4bd7-a9e3-bc86cb02f9bf' },
  'code-addition': { productId: '946395', buyNowUrl: 'https://lessoncraftstudio-com.lemonsqueezy.com/checkout/buy/8dc051aa-9be0-4145-972d-5c93f7df4588' },
  'more-less': { productId: '946400', buyNowUrl: 'https://lessoncraftstudio-com.lemonsqueezy.com/checkout/buy/55765ded-a494-438e-aa64-869acbd4bfee' },
  'math-puzzle': { productId: '946406', buyNowUrl: 'https://lessoncraftstudio-com.lemonsqueezy.com/checkout/buy/38b31c3f-90c9-4cbb-b372-301912a2db5f' },
  'math-worksheet': { productId: '946418', buyNowUrl: 'https://lessoncraftstudio-com.lemonsqueezy.com/checkout/buy/030fb81c-d0e9-40bf-a085-8ddbfb43c632' },
  'alphabet-train': { productId: '946422', buyNowUrl: 'https://lessoncraftstudio-com.lemonsqueezy.com/checkout/buy/9b84fd6e-e595-4534-8baf-4e75b7f2ec7a' },
  'prepositions': { productId: '946430', buyNowUrl: 'https://lessoncraftstudio-com.lemonsqueezy.com/checkout/buy/419fdca6-317e-420e-9c3e-3471cf283579' },
  'word-guess': { productId: '946434', buyNowUrl: 'https://lessoncraftstudio-com.lemonsqueezy.com/checkout/buy/b4197e38-4a45-4000-814b-6e8558aa34f3' },
  'word-scramble': { productId: '946438', buyNowUrl: 'https://lessoncraftstudio-com.lemonsqueezy.com/checkout/buy/17d5f1ae-0c1c-4467-ad7d-55fd62e9244a' },
  'wordsearch': { productId: '946443', buyNowUrl: 'https://lessoncraftstudio-com.lemonsqueezy.com/checkout/buy/4e59eac3-6c82-4821-ae1c-f5062b578168' },
  'cryptogram': { productId: '946447', buyNowUrl: 'https://lessoncraftstudio-com.lemonsqueezy.com/checkout/buy/2026c445-fba7-47d9-b066-a6cb55a1b577' },
  'writing': { productId: '946451', buyNowUrl: 'https://lessoncraftstudio-com.lemonsqueezy.com/checkout/buy/61e99705-d0bb-493e-9227-1cafcfe92b05' },
  'big-small': { productId: '946454', buyNowUrl: 'https://lessoncraftstudio-com.lemonsqueezy.com/checkout/buy/8bd59a26-151b-4fb2-93ce-3ac4daf64369' },
  'pattern-train': { productId: '946455', buyNowUrl: 'https://lessoncraftstudio-com.lemonsqueezy.com/checkout/buy/96b34c06-3dfc-496f-9c3e-d7dac079a959' },
  'pattern-worksheet': { productId: '946456', buyNowUrl: 'https://lessoncraftstudio-com.lemonsqueezy.com/checkout/buy/2e8278b9-6b47-4a27-a290-3a35b47ebffb' },
  'draw-and-color': { productId: '946459', buyNowUrl: 'https://lessoncraftstudio-com.lemonsqueezy.com/checkout/buy/37a306b2-be83-4e09-98ab-2b98903956e5' },
  'drawing-lines': { productId: '946464', buyNowUrl: 'https://lessoncraftstudio-com.lemonsqueezy.com/checkout/buy/cf7fb988-3b01-4293-a1a8-ceac1b35b298' },
  'coloring': { productId: '946467', buyNowUrl: 'https://lessoncraftstudio-com.lemonsqueezy.com/checkout/buy/075c13e2-187e-4fc7-b3f6-52511abb6f13' },
  'chart-count': { productId: '946471', buyNowUrl: 'https://lessoncraftstudio-com.lemonsqueezy.com/checkout/buy/3f01535b-98f8-4b5e-bd99-f4988a268e5e' },
  'matching': { productId: '946475', buyNowUrl: 'https://lessoncraftstudio-com.lemonsqueezy.com/checkout/buy/fbd93556-6f84-43c0-8d1e-3e8e45fa76c6' },
  'grid-match': { productId: '946478', buyNowUrl: 'https://lessoncraftstudio-com.lemonsqueezy.com/checkout/buy/b4ba4f7d-0090-4512-bc9f-05b34c2e9d7a' },
  'shadow-match': { productId: '946484', buyNowUrl: 'https://lessoncraftstudio-com.lemonsqueezy.com/checkout/buy/c362141b-a864-49cd-987d-73ad15252e39' },
  'bingo': { productId: '946488', buyNowUrl: 'https://lessoncraftstudio-com.lemonsqueezy.com/checkout/buy/077d63ee-092d-48a1-808b-1f7fe4ab2529' },
  'picture-sort': { productId: '946490', buyNowUrl: 'https://lessoncraftstudio-com.lemonsqueezy.com/checkout/buy/c2cb85ae-6721-416a-ab97-7b0aab35503a' },
  'missing-pieces': { productId: '946493', buyNowUrl: 'https://lessoncraftstudio-com.lemonsqueezy.com/checkout/buy/d358b402-8638-45f2-92f5-0cae295b4bfd' },
  'odd-one-out': { productId: '946496', buyNowUrl: 'https://lessoncraftstudio-com.lemonsqueezy.com/checkout/buy/5f9d6fa1-1f67-467a-bcf6-82d1e73bb129' },
  'sudoku': { productId: '946498', buyNowUrl: 'https://lessoncraftstudio-com.lemonsqueezy.com/checkout/buy/78d869a3-ecfd-442d-b664-9bc56422bd17' },
  'picture-path': { productId: '946502', buyNowUrl: 'https://lessoncraftstudio-com.lemonsqueezy.com/checkout/buy/0102b104-7021-41a3-b02e-f9f3a5346148' },
  'find-and-count': { productId: '946507', buyNowUrl: 'https://lessoncraftstudio-com.lemonsqueezy.com/checkout/buy/1b576ce4-fc7d-412f-b7f7-26e17cca0283' },
  'find-objects': { productId: '946510', buyNowUrl: 'https://lessoncraftstudio-com.lemonsqueezy.com/checkout/buy/a38679f1-12e5-453c-8cfb-4fb189078795' },
  'crossword': { productId: '946514', buyNowUrl: 'https://lessoncraftstudio-com.lemonsqueezy.com/checkout/buy/bf140774-aeb5-4a74-9710-08eb27cd0898' },
  'treasure-hunt': { productId: '946518', buyNowUrl: 'https://lessoncraftstudio-com.lemonsqueezy.com/checkout/buy/0bd031ab-b34a-44f7-b189-8c64d3314825' },
};

// ==========================================
// BUNDLE PRODUCTS ($149 each)
// ==========================================

export const LS_BUNDLE_PRODUCTS: Record<CategoryId, { productId: string; buyNowUrl: string }> = {
  'math': { productId: '946521', buyNowUrl: 'https://lessoncraftstudio-com.lemonsqueezy.com/checkout/buy/2663fd82-fbc5-4ef6-a505-56e41c991357' },
  'literacy': { productId: '946524', buyNowUrl: 'https://lessoncraftstudio-com.lemonsqueezy.com/checkout/buy/33f1e937-a6cc-4095-a0d0-692b33baad83' },
  'visual': { productId: '946526', buyNowUrl: 'https://lessoncraftstudio-com.lemonsqueezy.com/checkout/buy/d70b9fbf-5a28-4960-bc4f-72070a2b4ef1' },
  'matching': { productId: '946533', buyNowUrl: 'https://lessoncraftstudio-com.lemonsqueezy.com/checkout/buy/5057a59a-6c6e-4108-8460-ea5df3fb2c87' },
  'puzzle': { productId: '946534', buyNowUrl: 'https://lessoncraftstudio-com.lemonsqueezy.com/checkout/buy/81fadebe-fe28-4ec5-b4b7-1168cc15b74a' },
  'search': { productId: '946535', buyNowUrl: 'https://lessoncraftstudio-com.lemonsqueezy.com/checkout/buy/e2f3766e-d552-42c9-a887-d0d6ef493d58' },
};

// ==========================================
// CHECKOUT URL HELPERS
// ==========================================

/** Get the Lemon Squeezy checkout URL for an individual app */
export function getCheckoutUrl(appId: AppId): string {
  return LS_APP_PRODUCTS[appId].buyNowUrl;
}

/** Get the Lemon Squeezy checkout URL for a category bundle */
export function getBundleCheckoutUrl(categoryId: CategoryId): string {
  return LS_BUNDLE_PRODUCTS[categoryId].buyNowUrl;
}

/** Look up an app ID from a Lemon Squeezy product ID */
export function getAppIdFromProductId(productId: string): AppId | null {
  for (const [appId, product] of Object.entries(LS_APP_PRODUCTS)) {
    if (product.productId === productId) return appId as AppId;
  }
  return null;
}

/** Look up a category ID from a Lemon Squeezy product ID */
export function getCategoryIdFromProductId(productId: string): CategoryId | null {
  for (const [categoryId, product] of Object.entries(LS_BUNDLE_PRODUCTS)) {
    if (product.productId === productId) return categoryId as CategoryId;
  }
  return null;
}

/** Get all app IDs that a Lemon Squeezy product grants access to */
export function getAppsForLSProduct(productId: string): AppId[] {
  const appId = getAppIdFromProductId(productId);
  if (appId) return [appId];

  const categoryId = getCategoryIdFromProductId(productId);
  if (categoryId) {
    const { APP_CATEGORIES } = require('./products');
    return [...APP_CATEGORIES[categoryId].apps];
  }

  return [];
}
