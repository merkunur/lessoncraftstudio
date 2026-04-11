'use client';

import { useCallback, useMemo, useState } from 'react';

/* ============================================================================
 * Types
 * ========================================================================== */

type PlatformId =
  | 'etsy'
  | 'gumroad'
  | 'tpt'
  | 'payhip'
  | 'own-website'
  | 'kdp'
  | 'creative-market';

type ProductType = 'digital' | 'bundle' | 'kdp' | 'both';
type TptPlan = 'basic' | 'premium';
type PayhipPlan = 'free' | 'plus' | 'pro';
type OffsiteAds = 'off' | '15' | '12';
type KdpInk = 'bw' | 'premium-color' | 'standard-color';
type KdpTrim = 'regular' | 'large';

interface FeeLine {
  label: string;
  amount: number;
  tooltip?: string;
}

interface PlatformResult {
  id: PlatformId;
  name: string;
  emoji: string;
  tintBg: string;
  tintRing: string;
  tintText: string;
  sellingPrice: number;
  feeLines: FeeLine[];
  totalFees: number;
  productCost: number;
  profit: number;
  margin: number;
  note?: string;
  profitLabel: string; // "YOUR PROFIT" or "YOUR ROYALTY"
  marginLabel: string; // "Profit Margin" or "Royalty Margin"
  unavailable?: string; // reason platform disabled for this config
}

/* ============================================================================
 * Fee constants — Source: platform documentation, April 2026
 * ========================================================================== */

const ETSY_FEES = {
  listingFee: 0.2,
  transactionFeeRate: 0.065,
  paymentProcessingRate: 0.03,
  paymentProcessingFixed: 0.25,
  offsiteAdsRate_under10k: 0.15,
  offsiteAdsRate_over10k: 0.12,
} as const;

const GUMROAD_FEES = {
  platformFeeRate: 0.1,
  transactionFeeFixed: 0.5,
} as const;

const TPT_FEES = {
  basic: {
    commissionRate: 0.45,
    transactionFee: 0.3,
  },
  premium: {
    commissionRate: 0.2,
    transactionFee: 0.15,
    transactionFeeThreshold: 3.0,
    annualCost: 59.95,
  },
} as const;

const PAYHIP_FEES = {
  free: { platformFeeRate: 0.05, monthlyCost: 0 },
  plus: { platformFeeRate: 0.02, monthlyCost: 29 },
  pro: { platformFeeRate: 0, monthlyCost: 99 },
  paymentProcessingRate: 0.029,
  paymentProcessingFixed: 0.3,
} as const;

const OWN_WEBSITE_FEES = {
  paymentProcessingRate: 0.029,
  paymentProcessingFixed: 0.3,
} as const;

const CREATIVE_MARKET_FEES = {
  commissionRate: 0.5,
} as const;

const KDP_PRINTING: Record<
  KdpInk,
  {
    flatTier?: { minPages: number; maxPages: number; regular: number; large: number };
    perPageTier: {
      minPages: number;
      maxPages: number;
      fixed: number;
      perPageRegular: number;
      perPageLarge: number;
    };
  }
> = {
  bw: {
    flatTier: { minPages: 24, maxPages: 108, regular: 2.3, large: 2.84 },
    perPageTier: {
      minPages: 110,
      maxPages: 828,
      fixed: 1.0,
      perPageRegular: 0.012,
      perPageLarge: 0.017,
    },
  },
  'premium-color': {
    flatTier: { minPages: 24, maxPages: 40, regular: 3.6, large: 4.2 },
    perPageTier: {
      minPages: 42,
      maxPages: 828,
      fixed: 1.0,
      perPageRegular: 0.065,
      perPageLarge: 0.08,
    },
  },
  'standard-color': {
    perPageTier: {
      minPages: 72,
      maxPages: 600,
      fixed: 1.0,
      perPageRegular: 0.0255,
      perPageLarge: 0.0402,
    },
  },
};

const KDP_ROYALTY_THRESHOLD = 9.99;
const KDP_ROYALTY_HIGH = 0.6;
const KDP_ROYALTY_LOW = 0.5;

/* ============================================================================
 * Platform metadata — names, icons, background tints
 * ========================================================================== */

interface PlatformMeta {
  name: string;
  emoji: string;
  tintBg: string;
  tintRing: string;
  tintText: string;
}

const PLATFORM_META: Record<PlatformId, PlatformMeta> = {
  etsy: {
    name: 'Etsy',
    emoji: '🧡',
    tintBg: 'bg-orange-50',
    tintRing: 'ring-orange-200',
    tintText: 'text-orange-700',
  },
  gumroad: {
    name: 'Gumroad',
    emoji: '💗',
    tintBg: 'bg-pink-50',
    tintRing: 'ring-pink-200',
    tintText: 'text-pink-700',
  },
  tpt: {
    name: 'Teachers Pay Teachers',
    emoji: '🍎',
    tintBg: 'bg-emerald-50',
    tintRing: 'ring-emerald-200',
    tintText: 'text-emerald-700',
  },
  payhip: {
    name: 'Payhip',
    emoji: '💙',
    tintBg: 'bg-blue-50',
    tintRing: 'ring-blue-200',
    tintText: 'text-blue-700',
  },
  'own-website': {
    name: 'Own Website (Stripe)',
    emoji: '🌐',
    tintBg: 'bg-slate-100',
    tintRing: 'ring-slate-300',
    tintText: 'text-slate-700',
  },
  kdp: {
    name: 'Amazon KDP',
    emoji: '📚',
    tintBg: 'bg-amber-50',
    tintRing: 'ring-amber-200',
    tintText: 'text-amber-700',
  },
  'creative-market': {
    name: 'Creative Market',
    emoji: '🎨',
    tintBg: 'bg-teal-50',
    tintRing: 'ring-teal-200',
    tintText: 'text-teal-700',
  },
};

const DIGITAL_PLATFORMS: PlatformId[] = [
  'etsy',
  'gumroad',
  'tpt',
  'payhip',
  'own-website',
  'creative-market',
];

const ALL_PLATFORMS: PlatformId[] = [
  'etsy',
  'gumroad',
  'tpt',
  'payhip',
  'own-website',
  'kdp',
  'creative-market',
];

/* ============================================================================
 * Pure calculation functions
 * ========================================================================== */

function makeDigitalPlatform(
  id: PlatformId,
  price: number,
  productCost: number,
  feeLines: FeeLine[],
  note?: string,
): PlatformResult {
  const meta = PLATFORM_META[id];
  const totalFees = feeLines.reduce((sum, f) => sum + f.amount, 0);
  const profit = price - totalFees - productCost;
  return {
    id,
    name: meta.name,
    emoji: meta.emoji,
    tintBg: meta.tintBg,
    tintRing: meta.tintRing,
    tintText: meta.tintText,
    sellingPrice: price,
    feeLines,
    totalFees,
    productCost,
    profit,
    margin: price > 0 ? profit / price : 0,
    note,
    profitLabel: 'YOUR PROFIT',
    marginLabel: 'Profit Margin',
  };
}

function calcEtsy(price: number, productCost: number, offsiteAds: OffsiteAds): PlatformResult {
  const listing = ETSY_FEES.listingFee;
  const txn = price * ETSY_FEES.transactionFeeRate;
  const processing = price * ETSY_FEES.paymentProcessingRate + ETSY_FEES.paymentProcessingFixed;
  const feeLines: FeeLine[] = [
    {
      label: 'Listing fee',
      amount: listing,
      tooltip:
        'Etsy charges $0.20 per listing. For digital products, this fee is charged again on every sale as the listing renews automatically.',
    },
    {
      label: 'Transaction fee (6.5%)',
      amount: txn,
      tooltip:
        "6.5% of the item price. Digital products have no shipping, so it's calculated on just the price.",
    },
    {
      label: 'Payment processing',
      amount: processing,
      tooltip: 'Etsy Payments: 3% of the item price plus $0.25 fixed per transaction (US sellers).',
    },
  ];
  let note: string | undefined;
  if (offsiteAds !== 'off') {
    const rate =
      offsiteAds === '15' ? ETSY_FEES.offsiteAdsRate_under10k : ETSY_FEES.offsiteAdsRate_over10k;
    const pct = offsiteAds === '15' ? '15%' : '12%';
    feeLines.push({
      label: `Offsite Ads (${pct})`,
      amount: price * rate,
      tooltip: `${pct} fee on sales that come from Etsy's offsite advertising on Google, Facebook and Instagram. Only applies to some sales — toggling this on shows the worst case.`,
    });
    note = `Offsite Ads worst-case shown (${pct}). Only some sales trigger this fee.`;
  }
  return makeDigitalPlatform('etsy', price, productCost, feeLines, note);
}

function calcGumroad(price: number, productCost: number): PlatformResult {
  const feeLines: FeeLine[] = [
    {
      label: 'Platform fee (10%)',
      amount: price * GUMROAD_FEES.platformFeeRate,
      tooltip:
        'Gumroad charges a flat 10% platform fee on every sale on your own product link. Discover sales cost 30% — this tool assumes your own link.',
    },
    {
      label: 'Transaction fee',
      amount: GUMROAD_FEES.transactionFeeFixed,
      tooltip: 'Flat $0.50 per transaction. Payment processing is included in the 10% + $0.50.',
    },
  ];
  return makeDigitalPlatform(
    'gumroad',
    price,
    productCost,
    feeLines,
    'Assumes sales on your own Gumroad link. Gumroad Discover sales are charged 30%.',
  );
}

function calcTptBasic(price: number, productCost: number): PlatformResult {
  const commission = price * TPT_FEES.basic.commissionRate;
  const feeLines: FeeLine[] = [
    {
      label: 'TPT commission (45%)',
      amount: commission,
      tooltip:
        'TPT Basic keeps 45% of every sale. You keep the remaining 55%. Payment processing is included in this commission.',
    },
    {
      label: 'Transaction fee',
      amount: TPT_FEES.basic.transactionFee,
      tooltip: 'Flat $0.30 per resource sold on the Basic plan.',
    },
  ];
  return makeDigitalPlatform(
    'tpt',
    price,
    productCost,
    feeLines,
    'Basic Seller plan — no annual fee, 55% payout.',
  );
}

function calcTptPremium(price: number, productCost: number): PlatformResult {
  const commission = price * TPT_FEES.premium.commissionRate;
  const txn =
    price >= TPT_FEES.premium.transactionFeeThreshold ? 0 : TPT_FEES.premium.transactionFee;
  const feeLines: FeeLine[] = [
    {
      label: 'TPT commission (20%)',
      amount: commission,
      tooltip:
        'TPT Premium keeps 20% of every sale. You keep 80%. Payment processing is included.',
    },
    {
      label: 'Transaction fee',
      amount: txn,
      tooltip:
        "Premium plan: $0.15 per resource, waived when the order total is above $3.00. Most sales qualify.",
    },
  ];
  return makeDigitalPlatform(
    'tpt',
    price,
    productCost,
    feeLines,
    'Premium Seller plan — $59.95/year for 80% payout.',
  );
}

function calcPayhip(price: number, productCost: number, plan: PayhipPlan): PlatformResult {
  const planFees = PAYHIP_FEES[plan];
  const platformFee = price * planFees.platformFeeRate;
  const processing =
    price * PAYHIP_FEES.paymentProcessingRate + PAYHIP_FEES.paymentProcessingFixed;
  const rateLabel =
    plan === 'free' ? '5%' : plan === 'plus' ? '2%' : '0%';
  const feeLines: FeeLine[] = [];
  if (plan !== 'pro') {
    feeLines.push({
      label: `Payhip fee (${rateLabel})`,
      amount: platformFee,
      tooltip: `Payhip ${plan === 'free' ? 'Free' : 'Plus'} plan platform fee.`,
    });
  } else {
    feeLines.push({
      label: 'Payhip fee (0%)',
      amount: 0,
      tooltip: 'Pro plan has no platform fee — you only pay payment processing.',
    });
  }
  feeLines.push({
    label: 'Payment processing',
    amount: processing,
    tooltip: 'Stripe/PayPal: 2.9% + $0.30 per transaction, separate from the Payhip fee.',
  });
  const monthlyNotes: Record<PayhipPlan, string | undefined> = {
    free: 'Free plan — no monthly cost. Platform fee is 5% on every sale.',
    plus: 'Plus plan — $29/month. Worth it above ~$193/month in sales vs Free.',
    pro: 'Pro plan — $99/month. Worth it above ~$660/month in sales vs Free.',
  };
  return makeDigitalPlatform('payhip', price, productCost, feeLines, monthlyNotes[plan]);
}

function calcOwnWebsite(price: number, productCost: number): PlatformResult {
  const processing =
    price * OWN_WEBSITE_FEES.paymentProcessingRate + OWN_WEBSITE_FEES.paymentProcessingFixed;
  const feeLines: FeeLine[] = [
    {
      label: 'Stripe processing',
      amount: processing,
      tooltip: 'Stripe / PayPal standard US rate: 2.9% + $0.30 per transaction.',
    },
  ];
  return makeDigitalPlatform(
    'own-website',
    price,
    productCost,
    feeLines,
    'Excludes hosting costs (Shopify ~$39/month, or self-hosted ~$10-30/month).',
  );
}

function calcCreativeMarket(price: number, productCost: number): PlatformResult {
  const commission = price * CREATIVE_MARKET_FEES.commissionRate;
  const feeLines: FeeLine[] = [
    {
      label: 'Commission (50%)',
      amount: commission,
      tooltip:
        "Creative Market's standard non-exclusive commission. Payment processing is included.",
    },
  ];
  return makeDigitalPlatform(
    'creative-market',
    price,
    productCost,
    feeLines,
    'Best suited for design assets (fonts, graphics, templates) — not general printables.',
  );
}

function calcKdpPrintingCost(pageCount: number, ink: KdpInk, trim: KdpTrim): number | null {
  const data = KDP_PRINTING[ink];
  if (data.flatTier && pageCount >= data.flatTier.minPages && pageCount <= data.flatTier.maxPages) {
    return trim === 'large' ? data.flatTier.large : data.flatTier.regular;
  }
  if (pageCount >= data.perPageTier.minPages && pageCount <= data.perPageTier.maxPages) {
    const perPage =
      trim === 'large' ? data.perPageTier.perPageLarge : data.perPageTier.perPageRegular;
    return data.perPageTier.fixed + pageCount * perPage;
  }
  return null;
}

function calcKdp(
  listPrice: number,
  productCost: number,
  pageCount: number,
  ink: KdpInk,
  trim: KdpTrim,
): PlatformResult {
  const meta = PLATFORM_META.kdp;
  const printing = calcKdpPrintingCost(pageCount, ink, trim);
  if (printing === null) {
    return {
      id: 'kdp',
      name: meta.name,
      emoji: meta.emoji,
      tintBg: meta.tintBg,
      tintRing: meta.tintRing,
      tintText: meta.tintText,
      sellingPrice: listPrice,
      feeLines: [],
      totalFees: 0,
      productCost,
      profit: 0,
      margin: 0,
      profitLabel: 'YOUR ROYALTY',
      marginLabel: 'Royalty Margin',
      unavailable: `${pageCount} pages is outside the valid range for this ink/trim combination.`,
    };
  }
  const rate = listPrice >= KDP_ROYALTY_THRESHOLD ? KDP_ROYALTY_HIGH : KDP_ROYALTY_LOW;
  const amazonCut = listPrice * (1 - rate);
  const feeLines: FeeLine[] = [
    {
      label: `Amazon's cut (${Math.round((1 - rate) * 100)}%)`,
      amount: amazonCut,
      tooltip:
        listPrice >= KDP_ROYALTY_THRESHOLD
          ? 'At $9.99+ you get 60% royalty on Amazon.com. Amazon keeps 40%.'
          : 'Below $9.99 you only get 50% royalty on Amazon.com. Price at $9.99+ for the 60% tier.',
    },
    {
      label: 'Printing cost',
      amount: printing,
      tooltip: `${pageCount} pages, ${ink === 'bw' ? 'B&W' : ink === 'premium-color' ? 'premium color' : 'standard color'}, ${trim === 'large' ? 'large' : 'regular'} trim — calculated per the official KDP printing cost tables (US marketplace).`,
    },
  ];
  const totalFees = amazonCut + printing;
  const rawRoyalty = listPrice - totalFees;
  const royalty = rawRoyalty < 0 ? 0 : rawRoyalty;
  const profit = royalty - productCost;
  return {
    id: 'kdp',
    name: meta.name,
    emoji: meta.emoji,
    tintBg: meta.tintBg,
    tintRing: meta.tintRing,
    tintText: meta.tintText,
    sellingPrice: listPrice,
    feeLines,
    totalFees,
    productCost,
    profit,
    margin: listPrice > 0 ? profit / listPrice : 0,
    profitLabel: 'YOUR ROYALTY',
    marginLabel: 'Royalty Margin',
    note:
      listPrice < KDP_ROYALTY_THRESHOLD
        ? `Price at $${KDP_ROYALTY_THRESHOLD.toFixed(2)}+ to unlock the 60% royalty tier.`
        : 'US marketplace, amazon.com. Other markets have different royalty thresholds.',
  };
}

/* ============================================================================
 * Reverse pricing solvers — return the minimum price needed to hit `target`
 * ========================================================================== */

interface ReverseRow {
  id: PlatformId;
  variant: string;
  name: string;
  price: number | null;
  note?: string;
}

function reverseEtsy(target: number, offsiteAds: OffsiteAds): number {
  const fixedFees = ETSY_FEES.listingFee + ETSY_FEES.paymentProcessingFixed;
  let proportional =
    1 - ETSY_FEES.transactionFeeRate - ETSY_FEES.paymentProcessingRate;
  if (offsiteAds === '15') proportional -= ETSY_FEES.offsiteAdsRate_under10k;
  if (offsiteAds === '12') proportional -= ETSY_FEES.offsiteAdsRate_over10k;
  return (target + fixedFees) / proportional;
}

function reverseGumroad(target: number): number {
  return (target + GUMROAD_FEES.transactionFeeFixed) / (1 - GUMROAD_FEES.platformFeeRate);
}

function reverseTptBasic(target: number): number {
  return (target + TPT_FEES.basic.transactionFee) / (1 - TPT_FEES.basic.commissionRate);
}

function reverseTptPremium(target: number): number {
  const payoutRate = 1 - TPT_FEES.premium.commissionRate;
  const withoutFee = target / payoutRate;
  if (withoutFee >= TPT_FEES.premium.transactionFeeThreshold) return withoutFee;
  return (target + TPT_FEES.premium.transactionFee) / payoutRate;
}

function reversePayhip(target: number, plan: PayhipPlan): number {
  const platformRate = PAYHIP_FEES[plan].platformFeeRate;
  const proportional = 1 - platformRate - PAYHIP_FEES.paymentProcessingRate;
  return (target + PAYHIP_FEES.paymentProcessingFixed) / proportional;
}

function reverseOwnWebsite(target: number): number {
  return (
    (target + OWN_WEBSITE_FEES.paymentProcessingFixed) /
    (1 - OWN_WEBSITE_FEES.paymentProcessingRate)
  );
}

function reverseCreativeMarket(target: number): number {
  return target / (1 - CREATIVE_MARKET_FEES.commissionRate);
}

function reverseKdp(
  target: number,
  pageCount: number,
  ink: KdpInk,
  trim: KdpTrim,
): number | null {
  const printing = calcKdpPrintingCost(pageCount, ink, trim);
  if (printing === null) return null;
  const highTierPrice = (target + printing) / KDP_ROYALTY_HIGH;
  if (highTierPrice >= KDP_ROYALTY_THRESHOLD) return highTierPrice;
  const lowTierPrice = (target + printing) / KDP_ROYALTY_LOW;
  if (lowTierPrice < KDP_ROYALTY_THRESHOLD) return lowTierPrice;
  return highTierPrice;
}

/* ============================================================================
 * Formatting helpers
 * ========================================================================== */

const USD = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function fmt(amount: number): string {
  if (!Number.isFinite(amount)) return '—';
  return USD.format(amount);
}

function fmtSigned(amount: number, sign: '+' | '-' = '-'): string {
  if (!Number.isFinite(amount)) return '—';
  return `${sign}${USD.format(Math.abs(amount))}`;
}

function fmtPct(ratio: number): string {
  if (!Number.isFinite(ratio)) return '—';
  return `${(ratio * 100).toFixed(1)}%`;
}

/* ============================================================================
 * Main component
 * ========================================================================== */

export default function ProfitHub() {
  const [productType, setProductType] = useState<ProductType>('digital');
  const [priceInput, setPriceInput] = useState('6.99');
  const [productCostInput, setProductCostInput] = useState('0');
  const [monthlyVolume, setMonthlyVolume] = useState(30);

  const [offsiteAds, setOffsiteAds] = useState<OffsiteAds>('off');
  const [tptPlan, setTptPlan] = useState<TptPlan>('basic');
  const [payhipPlan, setPayhipPlan] = useState<PayhipPlan>('free');

  const [kdpPageCount, setKdpPageCount] = useState(100);
  const [kdpInk, setKdpInk] = useState<KdpInk>('bw');
  const [kdpTrim, setKdpTrim] = useState<KdpTrim>('large');

  const [disabledPlatforms, setDisabledPlatforms] = useState<Set<PlatformId>>(new Set());

  const [targetProfitInput, setTargetProfitInput] = useState('5.00');

  const [bundleWorksheets, setBundleWorksheets] = useState(10);
  const [singlePrice, setSinglePrice] = useState('1.99');
  const [bundlePrice, setBundlePrice] = useState('6.99');
  const [kdpListPriceInput, setKdpListPriceInput] = useState('9.99');
  const [kdpBundlePageOverride, setKdpBundlePageOverride] = useState<number | null>(null);

  const [adsBudget, setAdsBudget] = useState(5);
  const [adsClicks, setAdsClicks] = useState(50);
  const [adsConversion, setAdsConversion] = useState(3);

  const [showReverse, setShowReverse] = useState(true);
  const [showBundle, setShowBundle] = useState(true);
  const [showProjections, setShowProjections] = useState(true);
  const [showAds, setShowAds] = useState(true);

  const [copied, setCopied] = useState(false);

  /* ------------------------------------------------------------- parsing */

  const price = useMemo(() => {
    const n = parseFloat(priceInput);
    return Number.isFinite(n) && n > 0 ? n : 0;
  }, [priceInput]);

  const productCost = useMemo(() => {
    const n = parseFloat(productCostInput);
    return Number.isFinite(n) && n >= 0 ? n : 0;
  }, [productCostInput]);

  const targetProfit = useMemo(() => {
    const n = parseFloat(targetProfitInput);
    return Number.isFinite(n) && n > 0 ? n : 0;
  }, [targetProfitInput]);

  const includesDigital = productType === 'digital' || productType === 'bundle' || productType === 'both';
  const includesKdp = productType === 'kdp' || productType === 'both';

  const visiblePlatforms: PlatformId[] = useMemo(() => {
    const base: PlatformId[] = [];
    if (includesDigital) base.push(...DIGITAL_PLATFORMS);
    if (includesKdp) base.push('kdp');
    return base;
  }, [includesDigital, includesKdp]);

  /* ------------------------------------------------------------- results */

  const kdpListPrice = useMemo(() => {
    const n = parseFloat(kdpListPriceInput);
    return Number.isFinite(n) && n > 0 ? n : 0;
  }, [kdpListPriceInput]);

  const platformResults: PlatformResult[] = useMemo(() => {
    const results: PlatformResult[] = [];
    if (!includesDigital && !includesKdp) return results;

    if (includesDigital) {
      if (visiblePlatforms.includes('etsy'))
        results.push(calcEtsy(price, productCost, offsiteAds));
      if (visiblePlatforms.includes('gumroad')) results.push(calcGumroad(price, productCost));
      if (visiblePlatforms.includes('tpt')) {
        results.push(
          tptPlan === 'basic'
            ? calcTptBasic(price, productCost)
            : calcTptPremium(price, productCost),
        );
      }
      if (visiblePlatforms.includes('payhip'))
        results.push(calcPayhip(price, productCost, payhipPlan));
      if (visiblePlatforms.includes('own-website'))
        results.push(calcOwnWebsite(price, productCost));
      if (visiblePlatforms.includes('creative-market'))
        results.push(calcCreativeMarket(price, productCost));
    }
    if (includesKdp) {
      results.push(calcKdp(kdpListPrice, productCost, kdpPageCount, kdpInk, kdpTrim));
    }
    return results;
  }, [
    includesDigital,
    includesKdp,
    visiblePlatforms,
    price,
    productCost,
    offsiteAds,
    tptPlan,
    payhipPlan,
    kdpListPrice,
    kdpPageCount,
    kdpInk,
    kdpTrim,
  ]);

  const enabledResults = useMemo(
    () => platformResults.filter((r) => !disabledPlatforms.has(r.id) && !r.unavailable),
    [platformResults, disabledPlatforms],
  );

  const sortedByProfit = useMemo(
    () => [...enabledResults].sort((a, b) => b.profit - a.profit),
    [enabledResults],
  );

  const bestPlatform = sortedByProfit[0];
  const worstPlatform = sortedByProfit[sortedByProfit.length - 1];
  const maxProfit = bestPlatform?.profit ?? 0;

  const togglePlatform = useCallback((id: PlatformId) => {
    setDisabledPlatforms((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  /* ----------------------------------------------- reverse pricing rows */

  const reverseRows: ReverseRow[] = useMemo(() => {
    if (targetProfit <= 0) return [];
    const rows: ReverseRow[] = [];
    if (includesDigital) {
      rows.push({
        id: 'own-website',
        variant: 'own-website',
        name: 'Own Website (Stripe)',
        price: reverseOwnWebsite(targetProfit),
      });
      rows.push({
        id: 'payhip',
        variant: `payhip-${payhipPlan}`,
        name: `Payhip ${payhipPlan === 'free' ? 'Free' : payhipPlan === 'plus' ? 'Plus' : 'Pro'}`,
        price: reversePayhip(targetProfit, payhipPlan),
      });
      rows.push({
        id: 'etsy',
        variant: `etsy-${offsiteAds}`,
        name: offsiteAds === 'off' ? 'Etsy' : `Etsy (Offsite Ads ${offsiteAds}%)`,
        price: reverseEtsy(targetProfit, offsiteAds),
      });
      rows.push({
        id: 'gumroad',
        variant: 'gumroad',
        name: 'Gumroad',
        price: reverseGumroad(targetProfit),
      });
      rows.push({
        id: 'tpt',
        variant: `tpt-${tptPlan}`,
        name: tptPlan === 'basic' ? 'TPT Basic' : 'TPT Premium',
        price: tptPlan === 'basic' ? reverseTptBasic(targetProfit) : reverseTptPremium(targetProfit),
      });
      rows.push({
        id: 'creative-market',
        variant: 'creative-market',
        name: 'Creative Market',
        price: reverseCreativeMarket(targetProfit),
      });
    }
    if (includesKdp) {
      const kdpPrice = reverseKdp(targetProfit, kdpPageCount, kdpInk, kdpTrim);
      rows.push({
        id: 'kdp',
        variant: 'kdp',
        name: 'Amazon KDP',
        price: kdpPrice,
        note:
          kdpPrice && kdpPrice < KDP_ROYALTY_THRESHOLD
            ? '50% royalty tier'
            : '60% royalty tier',
      });
    }
    return rows
      .filter((r) => !disabledPlatforms.has(r.id))
      .sort((a, b) => {
        const pa = a.price ?? Infinity;
        const pb = b.price ?? Infinity;
        return pa - pb;
      });
  }, [
    targetProfit,
    includesDigital,
    includesKdp,
    offsiteAds,
    tptPlan,
    payhipPlan,
    kdpPageCount,
    kdpInk,
    kdpTrim,
    disabledPlatforms,
  ]);

  /* -------------------------------------------------- bundle comparison */

  const effectiveBundlePages = kdpBundlePageOverride ?? bundleWorksheets * 2 + 10;
  const singleAsNum = parseFloat(singlePrice) || 0;
  const bundleAsNum = parseFloat(bundlePrice) || 0;
  const kdpBundlePriceNum = parseFloat(kdpListPriceInput) || 0;

  const bundleScenarios = useMemo(() => {
    const etsyForSingles = calcEtsy(singleAsNum, 0, offsiteAds);
    const etsyForBundle = calcEtsy(bundleAsNum, 0, offsiteAds);
    const kdpForBook = calcKdp(kdpBundlePriceNum, 0, effectiveBundlePages, kdpInk, kdpTrim);
    return {
      singles: {
        label: `Sell ${bundleWorksheets} singles @ ${fmt(singleAsNum)} each on Etsy`,
        platform: 'Etsy',
        revenue: etsyForSingles.profit * bundleWorksheets,
        perSale: etsyForSingles.profit,
        note: `Assumes a single customer buys all ${bundleWorksheets} — unusual. Most customers buy 1 at a time, meaning the per-item profit is what matters.`,
      },
      bundle: {
        label: `Sell bundle @ ${fmt(bundleAsNum)} on Etsy`,
        platform: 'Etsy',
        revenue: etsyForBundle.profit,
        perSale: etsyForBundle.profit,
        note: 'Most common approach — one download, one transaction, minimal customer service.',
      },
      kdpBook: {
        label: `Sell as KDP book @ ${fmt(kdpBundlePriceNum)} (${effectiveBundlePages} pages)`,
        platform: 'KDP',
        revenue: kdpForBook.profit,
        perSale: kdpForBook.profit,
        note: kdpForBook.unavailable
          ? kdpForBook.unavailable
          : 'Passive income. Amazon handles printing, shipping, returns, customer service.',
      },
    };
  }, [
    singleAsNum,
    bundleAsNum,
    kdpBundlePriceNum,
    effectiveBundlePages,
    kdpInk,
    kdpTrim,
    bundleWorksheets,
    offsiteAds,
  ]);

  /* ------------------------------------------------ monthly projections */

  const projections = useMemo(() => {
    return sortedByProfit.map((r) => ({
      result: r,
      monthly: r.profit * monthlyVolume,
      annual: r.profit * monthlyVolume * 12,
    }));
  }, [sortedByProfit, monthlyVolume]);

  const subscriptionInsights = useMemo(() => {
    const insights: string[] = [];
    // TPT Basic vs Premium
    if (includesDigital && !disabledPlatforms.has('tpt')) {
      const basic = calcTptBasic(price, 0);
      const premium = calcTptPremium(price, 0);
      const perSaleGain = premium.profit - basic.profit;
      const monthlyGain = perSaleGain * monthlyVolume;
      const annualGain = monthlyGain * 12 - TPT_FEES.premium.annualCost;
      if (perSaleGain > 0 && annualGain > 0) {
        const monthsToBreakeven = TPT_FEES.premium.annualCost / monthlyGain;
        insights.push(
          `Upgrading TPT from Basic to Premium earns you ${fmt(perSaleGain)} more per sale — ${fmt(monthlyGain)}/month at ${monthlyVolume} sales. The $59.95/year subscription pays for itself in ${monthsToBreakeven < 1 ? 'under a month' : `${Math.ceil(monthsToBreakeven)} month${monthsToBreakeven >= 2 ? 's' : ''}`} and nets you ${fmt(annualGain)} extra per year.`,
        );
      } else if (perSaleGain > 0) {
        const breakevenVolume = Math.ceil(TPT_FEES.premium.annualCost / 12 / perSaleGain);
        insights.push(
          `TPT Premium would earn you ${fmt(perSaleGain)} more per sale, but at ${monthlyVolume} sales/month the $59.95/year subscription doesn't yet pay off. You need ~${breakevenVolume} sales/month to break even.`,
        );
      }
    }
    // Payhip Free vs Plus
    if (includesDigital && !disabledPlatforms.has('payhip') && payhipPlan === 'free') {
      const free = calcPayhip(price, 0, 'free');
      const plus = calcPayhip(price, 0, 'plus');
      const perSaleGain = plus.profit - free.profit;
      const monthlyGain = perSaleGain * monthlyVolume;
      const plusMonthlyCost = PAYHIP_FEES.plus.monthlyCost;
      if (perSaleGain > 0 && monthlyGain > plusMonthlyCost) {
        insights.push(
          `Upgrading Payhip from Free to Plus saves you ${fmt(monthlyGain)}/month at ${monthlyVolume} sales. That beats the $29/month cost — net gain of ${fmt(monthlyGain - plusMonthlyCost)}/month.`,
        );
      } else if (perSaleGain > 0) {
        const breakevenVolume = Math.ceil(plusMonthlyCost / perSaleGain);
        insights.push(
          `Payhip Plus ($29/month) would save you ${fmt(perSaleGain)} per sale in fees, but you need ~${breakevenVolume} sales/month to break even. Stay on Free until then.`,
        );
      }
      // Payhip Free vs Pro
      const pro = calcPayhip(price, 0, 'pro');
      const proGain = pro.profit - free.profit;
      const proMonthlyGain = proGain * monthlyVolume;
      const proMonthlyCost = PAYHIP_FEES.pro.monthlyCost;
      if (proGain > 0 && proMonthlyGain > proMonthlyCost) {
        insights.push(
          `Payhip Pro ($99/month) would save ${fmt(proMonthlyGain)}/month at ${monthlyVolume} sales — net gain of ${fmt(proMonthlyGain - proMonthlyCost)}/month vs Free.`,
        );
      }
    }
    return insights;
  }, [includesDigital, disabledPlatforms, price, monthlyVolume, payhipPlan]);

  const multiPlatformInsight = useMemo(() => {
    if (!includesDigital || !includesKdp) return null;
    const etsy = platformResults.find((r) => r.id === 'etsy');
    const kdp = platformResults.find((r) => r.id === 'kdp');
    if (!etsy || !kdp || etsy.profit <= 0 || kdp.profit <= 0) return null;
    const combinedMonthly = (etsy.profit + kdp.profit) * monthlyVolume;
    const combinedAnnual = combinedMonthly * 12;
    return `If you sell on Etsy AND KDP simultaneously (${monthlyVolume} sales each per month), your combined monthly profit would be ${fmt(combinedMonthly)} (${fmt(combinedAnnual)}/year).`;
  }, [includesDigital, includesKdp, platformResults, monthlyVolume]);

  /* ------------------------------------------------------ Etsy Ads ROI */

  const adsResults = useMemo(() => {
    const etsy = platformResults.find((r) => r.id === 'etsy');
    if (!etsy || etsy.profit <= 0) return null;
    const clicks = adsClicks;
    if (clicks <= 0) return null;
    const cpc = adsBudget / clicks;
    const convRate = adsConversion / 100;
    const salesPerClick = convRate;
    const costPerSale = convRate > 0 ? cpc / convRate : Infinity;
    const profitPerAdSale = etsy.profit - costPerSale;
    const dailySales = clicks * convRate;
    const dailyProfit = dailySales * etsy.profit - adsBudget;
    const dailyRoi = adsBudget > 0 ? (dailyProfit / adsBudget) * 100 : 0;
    const breakEvenBudget = dailySales > 0 ? dailySales * etsy.profit : 0;
    return {
      cpc,
      costPerSale,
      profitPerAdSale,
      dailySales,
      dailyProfit,
      dailyRoi,
      breakEvenBudget,
      profitable: profitPerAdSale > 0,
      etsyProfit: etsy.profit,
    };
  }, [platformResults, adsBudget, adsClicks, adsConversion]);

  /* ------------------------------------------------------ copy summary */

  const handleCopy = useCallback(async () => {
    const lines: string[] = [];
    lines.push(`Printable Profit Hub — ${fmt(price)} selling price`);
    lines.push('─'.repeat(48));
    for (const r of sortedByProfit) {
      const rank = sortedByProfit.indexOf(r) + 1;
      lines.push(
        `#${rank} ${r.name}: ${fmt(r.profit)} profit (${fmtPct(r.margin)} margin)`,
      );
    }
    if (bestPlatform && worstPlatform && bestPlatform !== worstPlatform) {
      const diff = bestPlatform.profit - worstPlatform.profit;
      lines.push('');
      lines.push(
        `You keep ${fmt(diff)} more per sale on ${bestPlatform.name} vs ${worstPlatform.name}.`,
      );
    }
    lines.push('');
    lines.push('Generated at lessoncraftstudio.com/en/tools/profit-hub');
    try {
      await navigator.clipboard.writeText(lines.join('\n'));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard not available — ignore silently
    }
  }, [price, sortedByProfit, bestPlatform, worstPlatform]);

  /* ============================================================================
   * Render
   * ========================================================================== */

  const hasPrice = price > 0 || (includesKdp && kdpListPrice > 0);

  return (
    <div className="space-y-6">
      {/* ======================== Product Setup ======================== */}
      <section
        aria-labelledby="setup-heading"
        className="bg-white rounded-2xl ring-1 ring-slate-200 p-5 sm:p-6 shadow-sm"
      >
        <h2
          id="setup-heading"
          className="text-base font-bold font-display text-slate-900 mb-4 flex items-center gap-2"
        >
          <span aria-hidden="true">⚙️</span>
          Product Setup
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Product type
            </label>
            <select
              value={productType}
              onChange={(e) => setProductType(e.target.value as ProductType)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="digital">Digital download</option>
              <option value="bundle">Digital bundle</option>
              <option value="kdp">KDP paperback book</option>
              <option value="both">Both (digital + KDP)</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="selling-price"
              className="block text-xs font-semibold text-slate-700 mb-1"
            >
              {includesKdp && !includesDigital ? 'List price' : 'Selling price'}
            </label>
            <div className="relative">
              <span
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm"
                aria-hidden="true"
              >
                $
              </span>
              <input
                id="selling-price"
                type="number"
                inputMode="decimal"
                min="0"
                step="0.01"
                value={includesKdp && !includesDigital ? kdpListPriceInput : priceInput}
                onChange={(e) => {
                  if (includesKdp && !includesDigital) setKdpListPriceInput(e.target.value);
                  else setPriceInput(e.target.value);
                }}
                placeholder="6.99"
                className="w-full rounded-lg border border-slate-300 bg-white pl-7 pr-3 py-2 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="product-cost"
              className="block text-xs font-semibold text-slate-700 mb-1"
              title="Include clipart licenses, fonts, software, your time — or leave at $0"
            >
              Product cost <span className="text-slate-400 font-normal">(optional)</span>
            </label>
            <div className="relative">
              <span
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm"
                aria-hidden="true"
              >
                $
              </span>
              <input
                id="product-cost"
                type="number"
                inputMode="decimal"
                min="0"
                step="0.01"
                value={productCostInput}
                onChange={(e) => setProductCostInput(e.target.value)}
                placeholder="0.00"
                className="w-full rounded-lg border border-slate-300 bg-white pl-7 pr-3 py-2 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="monthly-volume"
              className="block text-xs font-semibold text-slate-700 mb-1"
            >
              Monthly sales{' '}
              <span className="text-slate-500 font-normal">({monthlyVolume})</span>
            </label>
            <input
              id="monthly-volume"
              type="range"
              min={1}
              max={500}
              step={1}
              value={monthlyVolume}
              onChange={(e) => setMonthlyVolume(parseInt(e.target.value, 10))}
              className="w-full accent-primary"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
              <span>1</span>
              <span>500</span>
            </div>
          </div>
        </div>

        <p className="mt-4 text-xs text-slate-500">
          All amounts in USD. This calculator uses US seller fee structures for every platform.
        </p>
      </section>

      {/* ======================== Quick Settings ======================== */}
      <section
        aria-labelledby="settings-heading"
        className="bg-white rounded-2xl ring-1 ring-slate-200 p-5 sm:p-6 shadow-sm"
      >
        <h2
          id="settings-heading"
          className="text-base font-bold font-display text-slate-900 mb-4 flex items-center gap-2"
        >
          <span aria-hidden="true">🎛️</span>
          Platform Settings
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Etsy offsite ads */}
          <div>
            <div className="text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1">
              Etsy Offsite Ads
              <span
                className="text-slate-400 text-[10px] font-normal cursor-help"
                title="Etsy charges 15% (or 12% for shops earning >$10K/year) on sales from Etsy's offsite advertising on Google, Facebook and Instagram. Only applies to some sales."
              >
                (?)
              </span>
            </div>
            <div className="flex rounded-lg ring-1 ring-slate-300 overflow-hidden text-xs font-semibold">
              {(['off', '15', '12'] as OffsiteAds[]).map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setOffsiteAds(opt)}
                  className={`flex-1 px-2 py-2 transition ${
                    offsiteAds === opt
                      ? 'bg-primary text-white'
                      : 'bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {opt === 'off' ? 'Off' : opt === '15' ? 'On (15%)' : 'On (12%)'}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              15% = shops under $10K/yr. 12% = over $10K/yr (mandatory).
            </p>
          </div>

          {/* TPT plan */}
          <div>
            <div className="text-xs font-semibold text-slate-700 mb-1.5">TPT Plan</div>
            <div className="flex rounded-lg ring-1 ring-slate-300 overflow-hidden text-xs font-semibold">
              <button
                type="button"
                onClick={() => setTptPlan('basic')}
                className={`flex-1 px-2 py-2 transition ${
                  tptPlan === 'basic'
                    ? 'bg-primary text-white'
                    : 'bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                Basic (55% payout)
              </button>
              <button
                type="button"
                onClick={() => setTptPlan('premium')}
                className={`flex-1 px-2 py-2 transition ${
                  tptPlan === 'premium'
                    ? 'bg-primary text-white'
                    : 'bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                Premium ($59.95/yr)
              </button>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Premium pays 80% and waives the $0.15 txn fee above $3.
            </p>
          </div>

          {/* Payhip plan */}
          <div>
            <div className="text-xs font-semibold text-slate-700 mb-1.5">Payhip Plan</div>
            <div className="flex rounded-lg ring-1 ring-slate-300 overflow-hidden text-xs font-semibold">
              {(['free', 'plus', 'pro'] as PayhipPlan[]).map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setPayhipPlan(opt)}
                  className={`flex-1 px-2 py-2 transition ${
                    payhipPlan === opt
                      ? 'bg-primary text-white'
                      : 'bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {opt === 'free' ? 'Free (5%)' : opt === 'plus' ? 'Plus (2%)' : 'Pro (0%)'}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Plus: $29/mo · Pro: $99/mo · all three add Stripe processing.
            </p>
          </div>
        </div>

        {/* KDP details — only when product type includes KDP */}
        {includesKdp && (
          <div className="mt-5 rounded-xl bg-amber-50 ring-1 ring-amber-200 p-4">
            <div className="text-xs font-semibold text-amber-900 mb-3 flex items-center gap-2">
              <span aria-hidden="true">📚</span>
              KDP Book Details
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] font-semibold text-amber-900 mb-1">
                  Page count
                </label>
                <input
                  type="number"
                  min={24}
                  max={828}
                  step={2}
                  value={kdpPageCount}
                  onChange={(e) => setKdpPageCount(parseInt(e.target.value, 10) || 0)}
                  className="w-full rounded-lg border border-amber-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-amber-900 mb-1">
                  Ink
                </label>
                <select
                  value={kdpInk}
                  onChange={(e) => setKdpInk(e.target.value as KdpInk)}
                  className="w-full rounded-lg border border-amber-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="bw">Black &amp; white</option>
                  <option value="premium-color">Premium color</option>
                  <option value="standard-color">Standard color</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-amber-900 mb-1">
                  Trim size
                </label>
                <select
                  value={kdpTrim}
                  onChange={(e) => setKdpTrim(e.target.value as KdpTrim)}
                  className="w-full rounded-lg border border-amber-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="large">Large (&gt;6.12″ or &gt;9″)</option>
                  <option value="regular">Regular (≤6.12″ × ≤9″)</option>
                </select>
              </div>
            </div>
            {includesKdp && productType === 'both' && (
              <div className="mt-3">
                <label className="block text-[11px] font-semibold text-amber-900 mb-1">
                  KDP list price
                </label>
                <div className="relative max-w-xs">
                  <span
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-700 text-sm"
                    aria-hidden="true"
                  >
                    $
                  </span>
                  <input
                    type="number"
                    inputMode="decimal"
                    min="0"
                    step="0.01"
                    value={kdpListPriceInput}
                    onChange={(e) => setKdpListPriceInput(e.target.value)}
                    className="w-full rounded-lg border border-amber-300 bg-white pl-7 pr-3 py-1.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>
            )}
            <p className="text-[11px] text-amber-800 mt-2">
              Price at $9.99+ to unlock Amazon&apos;s 60% royalty tier (vs 50% below).
            </p>
          </div>
        )}
      </section>

      {/* ======================== Platform toggle chips ======================== */}
      {visiblePlatforms.length > 0 && (
        <section
          aria-label="Enable or disable platforms"
          className="bg-white rounded-2xl ring-1 ring-slate-200 p-4 shadow-sm"
        >
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide mr-1">
              Compare:
            </span>
            {visiblePlatforms.map((id) => {
              const meta = PLATFORM_META[id];
              const on = !disabledPlatforms.has(id);
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => togglePlatform(id)}
                  aria-pressed={on}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ring-1 transition ${
                    on
                      ? `${meta.tintBg} ${meta.tintRing} ${meta.tintText}`
                      : 'bg-slate-100 ring-slate-200 text-slate-400 line-through'
                  }`}
                >
                  <span aria-hidden="true">{meta.emoji}</span>
                  {meta.name}
                </button>
              );
            })}
            <button
              type="button"
              onClick={handleCopy}
              disabled={!hasPrice || enabledResults.length === 0}
              className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-primary text-white px-3 py-1.5 text-xs font-semibold hover:bg-primary-700 transition disabled:bg-slate-300 disabled:cursor-not-allowed"
            >
              <span aria-hidden="true">📋</span>
              {copied ? 'Copied!' : 'Copy comparison'}
            </button>
          </div>
        </section>
      )}

      {/* ======================== Empty state ======================== */}
      {!hasPrice && (
        <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-white p-10 text-center">
          <div className="text-4xl mb-3" aria-hidden="true">
            💰
          </div>
          <p className="text-slate-600 font-medium">
            Enter a selling price above to see your profit across all {visiblePlatforms.length}{' '}
            platforms — side by side, instantly.
          </p>
        </div>
      )}

      {/* ======================== Platform cards grid ======================== */}
      {hasPrice && enabledResults.length > 0 && (
        <section aria-labelledby="comparison-heading">
          <div className="flex items-end justify-between mb-3">
            <h2
              id="comparison-heading"
              className="text-lg sm:text-xl font-bold font-display text-slate-900"
            >
              Your profit across {enabledResults.length}{' '}
              {enabledResults.length === 1 ? 'platform' : 'platforms'}
            </h2>
            {bestPlatform && (
              <div className="text-xs text-slate-500 hidden sm:block">
                Best:{' '}
                <span className="font-semibold text-emerald-700">
                  {bestPlatform.name} · {fmt(bestPlatform.profit)}
                </span>
              </div>
            )}
          </div>
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            aria-live="polite"
          >
            {sortedByProfit.map((r) => {
              const isBest = r.id === bestPlatform?.id;
              return (
                <article
                  key={r.id}
                  className={`relative rounded-xl ring-1 ${r.tintRing} ${r.tintBg} p-5 flex flex-col ${
                    isBest ? 'shadow-lg ring-2 ring-emerald-400' : 'shadow-sm'
                  }`}
                >
                  {isBest && (
                    <span className="absolute -top-2 -right-2 inline-flex items-center gap-1 rounded-full bg-emerald-500 text-white text-[10px] font-bold px-2.5 py-1 shadow-md uppercase tracking-wide">
                      <span aria-hidden="true">👑</span> Best
                    </span>
                  )}

                  <header className="flex items-center gap-2 mb-3">
                    <span className="text-2xl" aria-hidden="true">
                      {r.emoji}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h3 className={`text-sm font-bold ${r.tintText} truncate`}>
                        {r.name}
                      </h3>
                      <p className="text-[11px] text-slate-500">
                        {r.id === 'kdp' ? 'List price' : 'Selling price'} {fmt(r.sellingPrice)}
                      </p>
                    </div>
                  </header>

                  <div className="border-t border-slate-200/70 pt-3 space-y-1.5 text-xs">
                    {r.feeLines.map((fee) => (
                      <div key={fee.label} className="flex justify-between items-baseline gap-2">
                        <span
                          className="text-slate-600 truncate"
                          title={fee.tooltip}
                        >
                          {fee.label}
                          {fee.tooltip && (
                            <span
                              className="ml-0.5 text-slate-400 text-[9px] align-top cursor-help"
                              aria-hidden="true"
                            >
                              ⓘ
                            </span>
                          )}
                        </span>
                        <span className="tabular-nums font-semibold text-red-600 shrink-0">
                          {fmtSigned(fee.amount)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-slate-200/70 mt-3 pt-2 space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-600 font-semibold">Total fees</span>
                      <span className="tabular-nums font-bold text-red-700">
                        {fmtSigned(r.totalFees)}
                      </span>
                    </div>
                    {r.productCost > 0 && (
                      <div className="flex justify-between">
                        <span className="text-slate-600">Your cost</span>
                        <span className="tabular-nums font-semibold text-red-600">
                          {fmtSigned(r.productCost)}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="border-t-2 border-slate-300 mt-3 pt-3">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      {r.profitLabel}
                    </div>
                    <div className="flex items-baseline justify-between gap-2 mt-0.5">
                      <div
                        className={`text-2xl sm:text-3xl font-black ${
                          r.profit > 0
                            ? isBest
                              ? 'text-emerald-600'
                              : 'text-slate-900'
                            : 'text-red-600'
                        }`}
                      >
                        {fmt(r.profit)}
                      </div>
                      <div
                        className={`text-xs font-bold ${
                          r.margin > 0.5
                            ? 'text-emerald-700'
                            : r.margin > 0
                              ? 'text-slate-600'
                              : 'text-red-600'
                        }`}
                      >
                        {fmtPct(r.margin)}
                      </div>
                    </div>
                  </div>

                  {r.note && (
                    <p className="mt-3 text-[10px] text-slate-500 italic leading-snug">
                      {r.note}
                    </p>
                  )}
                </article>
              );
            })}
          </div>
        </section>
      )}

      {/* ======================== Bar chart ======================== */}
      {hasPrice && enabledResults.length > 1 && (
        <section
          aria-labelledby="chart-heading"
          className="bg-white rounded-2xl ring-1 ring-slate-200 p-5 sm:p-6 shadow-sm"
        >
          <h2
            id="chart-heading"
            className="text-base sm:text-lg font-bold font-display text-slate-900 mb-4 flex items-center gap-2"
          >
            <span aria-hidden="true">📊</span>
            Profit per sale — ranked
          </h2>
          <div className="space-y-2.5">
            {sortedByProfit.map((r, idx) => {
              const barPct =
                maxProfit > 0 ? Math.max(2, (Math.max(0, r.profit) / maxProfit) * 100) : 0;
              const isBest = idx === 0;
              const isWorst = idx === sortedByProfit.length - 1 && sortedByProfit.length > 1;
              return (
                <div
                  key={r.id}
                  className="flex items-center gap-3 text-xs sm:text-sm"
                  aria-label={`${r.name}: ${fmt(r.profit)} profit per sale, ${fmtPct(r.margin)} margin`}
                >
                  <div className="w-32 sm:w-40 shrink-0 font-semibold text-slate-700 truncate flex items-center gap-1.5">
                    <span className="text-slate-400 tabular-nums">#{idx + 1}</span>
                    {r.name}
                  </div>
                  <div className="flex-1 bg-slate-100 rounded-md h-7 sm:h-8 overflow-hidden relative">
                    <div
                      className={`h-full rounded-md transition-all duration-300 ${
                        isBest
                          ? 'bg-gradient-to-r from-emerald-400 to-emerald-600'
                          : isWorst
                            ? 'bg-slate-300'
                            : 'bg-gradient-to-r from-primary to-primary-700'
                      }`}
                      style={{ width: `${barPct}%` }}
                    />
                  </div>
                  <div
                    className={`w-20 sm:w-24 shrink-0 text-right font-bold tabular-nums ${
                      isBest ? 'text-emerald-700' : 'text-slate-900'
                    }`}
                  >
                    {fmt(r.profit)}
                  </div>
                </div>
              );
            })}
          </div>

          {bestPlatform && worstPlatform && bestPlatform !== worstPlatform && (
            <div className="mt-5 rounded-lg bg-emerald-50 ring-1 ring-emerald-200 px-4 py-3">
              <p className="text-xs sm:text-sm text-emerald-900">
                <strong>You keep {fmt(bestPlatform.profit - worstPlatform.profit)} more per sale</strong>{' '}
                on {bestPlatform.name} ({fmt(bestPlatform.profit)}) vs {worstPlatform.name} (
                {fmt(worstPlatform.profit)})
                {worstPlatform.profit > 0 &&
                  ` — ${((bestPlatform.profit / worstPlatform.profit - 1) * 100).toFixed(0)}% more profit`}
                .
              </p>
            </div>
          )}
        </section>
      )}

      {/* ======================== Reverse Pricing ======================== */}
      <CollapsibleSection
        id="reverse-pricing"
        title={'Reverse pricing — "I want to earn $X"'}
        emoji="🎯"
        open={showReverse}
        onToggle={() => setShowReverse((v) => !v)}
      >
        <p className="text-sm text-slate-600 mb-4">
          Enter the profit you want to keep per sale. We&apos;ll show the minimum selling price
          you need on each platform to hit that target.
        </p>

        <div className="mb-5 max-w-xs">
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Target profit per sale
          </label>
          <div className="relative">
            <span
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm"
              aria-hidden="true"
            >
              $
            </span>
            <input
              type="number"
              inputMode="decimal"
              min="0"
              step="0.01"
              value={targetProfitInput}
              onChange={(e) => setTargetProfitInput(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white pl-7 pr-3 py-2 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {targetProfit > 0 && reverseRows.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-2 pr-3 font-semibold text-slate-600">Platform</th>
                  <th className="text-right py-2 px-3 font-semibold text-slate-600">
                    Price needed
                  </th>
                  <th className="text-right py-2 pl-3 font-semibold text-slate-600">
                    Your profit
                  </th>
                </tr>
              </thead>
              <tbody>
                {reverseRows.map((row) => (
                  <tr
                    key={row.variant}
                    className="border-b border-slate-100 last:border-b-0"
                  >
                    <td className="py-2 pr-3 text-slate-700 font-medium">
                      {row.name}
                      {row.note && (
                        <span className="ml-2 text-[10px] text-slate-500 font-normal">
                          ({row.note})
                        </span>
                      )}
                    </td>
                    <td className="py-2 px-3 text-right tabular-nums font-bold text-slate-900">
                      {row.price !== null ? fmt(row.price) : '—'}
                    </td>
                    <td className="py-2 pl-3 text-right tabular-nums font-semibold text-emerald-700">
                      {fmt(targetProfit)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-xs text-slate-500 mt-3 italic">
              Lower price = platform takes less of your cut. The cheapest platforms for reaching
              your target are best for price-sensitive products.
            </p>
          </div>
        ) : (
          <p className="text-sm text-slate-500 italic">Enter a target profit to see results.</p>
        )}
      </CollapsibleSection>

      {/* ======================== Bundle comparison ======================== */}
      <CollapsibleSection
        id="bundle-comparison"
        title="Singles vs bundle vs KDP book"
        emoji="📦"
        open={showBundle}
        onToggle={() => setShowBundle((v) => !v)}
      >
        <p className="text-sm text-slate-600 mb-4">
          Compare selling the same content three ways: as individual singles on Etsy, as one
          bundled download, or compiled into a KDP paperback book.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              # worksheets
            </label>
            <input
              type="number"
              min={1}
              max={200}
              value={bundleWorksheets}
              onChange={(e) => {
                setBundleWorksheets(parseInt(e.target.value, 10) || 1);
                setKdpBundlePageOverride(null);
              }}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              Single price
            </label>
            <div className="relative">
              <span
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs"
                aria-hidden="true"
              >
                $
              </span>
              <input
                type="number"
                inputMode="decimal"
                step="0.01"
                value={singlePrice}
                onChange={(e) => setSinglePrice(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white pl-6 pr-2 py-1.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              Bundle price
            </label>
            <div className="relative">
              <span
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs"
                aria-hidden="true"
              >
                $
              </span>
              <input
                type="number"
                inputMode="decimal"
                step="0.01"
                value={bundlePrice}
                onChange={(e) => setBundlePrice(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white pl-6 pr-2 py-1.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              KDP book price
            </label>
            <div className="relative">
              <span
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs"
                aria-hidden="true"
              >
                $
              </span>
              <input
                type="number"
                inputMode="decimal"
                step="0.01"
                value={kdpListPriceInput}
                onChange={(e) => setKdpListPriceInput(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white pl-6 pr-2 py-1.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>

        <div className="mb-4 text-xs text-slate-500">
          KDP page count auto-estimated at {effectiveBundlePages} pages (
          {bundleWorksheets} × 2 + 10 for front/back matter).{' '}
          <button
            type="button"
            onClick={() => {
              const input = window.prompt(
                'Override KDP page count (enter a number):',
                String(effectiveBundlePages),
              );
              if (input) {
                const n = parseInt(input, 10);
                if (Number.isFinite(n) && n > 0) setKdpBundlePageOverride(n);
              }
            }}
            className="text-primary font-semibold hover:underline"
          >
            Override
          </button>
          {kdpBundlePageOverride && (
            <>
              {' · '}
              <button
                type="button"
                onClick={() => setKdpBundlePageOverride(null)}
                className="text-slate-500 underline"
              >
                reset to auto
              </button>
            </>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-2 pr-3 font-semibold text-slate-600">Scenario</th>
                <th className="text-left py-2 px-3 font-semibold text-slate-600 hidden sm:table-cell">
                  Platform
                </th>
                <th className="text-right py-2 px-3 font-semibold text-slate-600">
                  Your profit
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="py-3 pr-3 text-slate-700 font-medium align-top">
                  {bundleScenarios.singles.label}
                  <p className="text-[11px] text-slate-500 font-normal mt-0.5">
                    {bundleScenarios.singles.note}
                  </p>
                </td>
                <td className="py-3 px-3 text-slate-600 hidden sm:table-cell align-top">
                  {bundleScenarios.singles.platform}
                </td>
                <td className="py-3 px-3 text-right tabular-nums align-top">
                  <div className="font-bold text-slate-900">
                    {fmt(bundleScenarios.singles.perSale)} ×{bundleWorksheets}
                  </div>
                  <div className="text-[11px] text-slate-500 font-normal">
                    if 1 customer buys all
                  </div>
                  <div className="font-bold text-emerald-700 mt-0.5">
                    {fmt(bundleScenarios.singles.revenue)}
                  </div>
                </td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-3 pr-3 text-slate-700 font-medium align-top">
                  {bundleScenarios.bundle.label}
                  <p className="text-[11px] text-slate-500 font-normal mt-0.5">
                    {bundleScenarios.bundle.note}
                  </p>
                </td>
                <td className="py-3 px-3 text-slate-600 hidden sm:table-cell align-top">
                  {bundleScenarios.bundle.platform}
                </td>
                <td className="py-3 px-3 text-right tabular-nums font-bold text-emerald-700 align-top">
                  {fmt(bundleScenarios.bundle.revenue)}
                </td>
              </tr>
              <tr>
                <td className="py-3 pr-3 text-slate-700 font-medium align-top">
                  {bundleScenarios.kdpBook.label}
                  <p className="text-[11px] text-slate-500 font-normal mt-0.5">
                    {bundleScenarios.kdpBook.note}
                  </p>
                </td>
                <td className="py-3 px-3 text-slate-600 hidden sm:table-cell align-top">
                  {bundleScenarios.kdpBook.platform}
                </td>
                <td className="py-3 px-3 text-right tabular-nums font-bold text-emerald-700 align-top">
                  {fmt(bundleScenarios.kdpBook.revenue)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-5 rounded-lg bg-slate-50 ring-1 ring-slate-200 px-4 py-3 text-sm text-slate-700">
          <strong>Insight:</strong> Bundles give you the best per-customer profit on Etsy because
          one transaction = one set of fees. KDP books generate passive income with zero customer
          service — and reach buyers who would never find you on Etsy.{' '}
          <a
            href="/en/apps"
            className="text-primary font-semibold hover:underline"
          >
            Need to create the pages for your KDP book? →
          </a>
        </div>
      </CollapsibleSection>

      {/* ======================== Monthly projections ======================== */}
      {hasPrice && enabledResults.length > 0 && (
        <CollapsibleSection
          id="monthly-projections"
          title="Monthly revenue projections"
          emoji="📈"
          open={showProjections}
          onToggle={() => setShowProjections((v) => !v)}
        >
          <p className="text-sm text-slate-600 mb-4">
            At <strong>{monthlyVolume} sales/month</strong> (adjust the slider at the top), here
            is your projected monthly and annual profit on each platform.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-2 pr-3 font-semibold text-slate-600">Platform</th>
                  <th className="text-right py-2 px-3 font-semibold text-slate-600">
                    Per sale
                  </th>
                  <th className="text-right py-2 px-3 font-semibold text-slate-600 hidden sm:table-cell">
                    × {monthlyVolume}
                  </th>
                  <th className="text-right py-2 px-3 font-semibold text-slate-600">Monthly</th>
                  <th className="text-right py-2 pl-3 font-semibold text-slate-600 hidden md:table-cell">
                    Annual
                  </th>
                </tr>
              </thead>
              <tbody>
                {projections.map(({ result: r, monthly, annual }, idx) => (
                  <tr
                    key={r.id}
                    className={`border-b border-slate-100 last:border-b-0 ${
                      idx === 0 ? 'bg-emerald-50/40' : ''
                    }`}
                  >
                    <td className="py-2 pr-3 font-medium text-slate-700 flex items-center gap-1.5">
                      <span aria-hidden="true">{r.emoji}</span>
                      {r.name}
                      {idx === 0 && (
                        <span className="text-[9px] font-bold uppercase text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded-full">
                          Top
                        </span>
                      )}
                    </td>
                    <td className="py-2 px-3 text-right tabular-nums text-slate-700">
                      {fmt(r.profit)}
                    </td>
                    <td className="py-2 px-3 text-right tabular-nums text-slate-400 hidden sm:table-cell">
                      × {monthlyVolume}
                    </td>
                    <td
                      className={`py-2 px-3 text-right tabular-nums font-bold ${
                        idx === 0 ? 'text-emerald-700' : 'text-slate-900'
                      }`}
                    >
                      {fmt(monthly)}
                    </td>
                    <td className="py-2 pl-3 text-right tabular-nums text-slate-600 hidden md:table-cell">
                      {fmt(annual)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {subscriptionInsights.length > 0 && (
            <div className="mt-5 space-y-2">
              {subscriptionInsights.map((insight, i) => (
                <div
                  key={i}
                  className="rounded-lg bg-blue-50 ring-1 ring-blue-200 px-4 py-3 text-xs sm:text-sm text-blue-900"
                >
                  <strong>💡 Subscription breakeven:</strong> {insight}
                </div>
              ))}
            </div>
          )}

          {multiPlatformInsight && (
            <div className="mt-3 rounded-lg bg-emerald-50 ring-1 ring-emerald-200 px-4 py-3 text-xs sm:text-sm text-emerald-900">
              <strong>🎯 Multi-platform strategy:</strong> {multiPlatformInsight}
            </div>
          )}
        </CollapsibleSection>
      )}

      {/* ======================== Etsy Ads ROI ======================== */}
      {hasPrice && includesDigital && !disabledPlatforms.has('etsy') && (
        <CollapsibleSection
          id="etsy-ads"
          title="Etsy Ads ROI calculator"
          emoji="📣"
          open={showAds}
          onToggle={() => setShowAds((v) => !v)}
        >
          <p className="text-sm text-slate-600 mb-4">
            Are Etsy Ads profitable for your product? Enter your daily budget and estimated
            performance — we&apos;ll tell you the verdict.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Daily budget
              </label>
              <div className="relative">
                <span
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs"
                  aria-hidden="true"
                >
                  $
                </span>
                <input
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="0.50"
                  value={adsBudget}
                  onChange={(e) => setAdsBudget(parseFloat(e.target.value) || 0)}
                  className="w-full rounded-lg border border-slate-300 bg-white pl-6 pr-2 py-1.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Expected clicks/day ({adsClicks})
              </label>
              <input
                type="range"
                min={1}
                max={500}
                value={adsClicks}
                onChange={(e) => setAdsClicks(parseInt(e.target.value, 10))}
                className="w-full accent-primary"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Conversion rate ({adsConversion}%)
              </label>
              <input
                type="range"
                min={0.5}
                max={15}
                step={0.5}
                value={adsConversion}
                onChange={(e) => setAdsConversion(parseFloat(e.target.value))}
                className="w-full accent-primary"
              />
            </div>
          </div>

          {adsResults ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                <Metric label="Cost per click" value={fmt(adsResults.cpc)} />
                <Metric
                  label="Cost per sale"
                  value={
                    Number.isFinite(adsResults.costPerSale) ? fmt(adsResults.costPerSale) : '—'
                  }
                />
                <Metric
                  label="Daily sales"
                  value={adsResults.dailySales.toFixed(1)}
                />
                <Metric label="Daily ROI" value={`${adsResults.dailyRoi.toFixed(0)}%`} />
              </div>

              <div
                className={`rounded-xl p-4 ring-1 ${
                  adsResults.profitable
                    ? 'bg-emerald-50 ring-emerald-200'
                    : 'bg-red-50 ring-red-200'
                }`}
              >
                {adsResults.profitable ? (
                  <p className="text-sm text-emerald-900">
                    <strong>✅ Profitable.</strong> After ad costs you still earn{' '}
                    <strong>{fmt(adsResults.profitPerAdSale)}</strong> per ad-driven sale (your
                    Etsy profit {fmt(adsResults.etsyProfit)} minus {fmt(adsResults.costPerSale)}{' '}
                    ad cost). Daily net profit after ads:{' '}
                    <strong>{fmt(adsResults.dailyProfit)}</strong>.
                  </p>
                ) : (
                  <p className="text-sm text-red-900">
                    <strong>❌ Unprofitable.</strong> Each ad-driven sale costs you{' '}
                    <strong>{fmt(Math.abs(adsResults.profitPerAdSale))}</strong> more than it
                    earns. Your Etsy profit of {fmt(adsResults.etsyProfit)} can&apos;t cover the{' '}
                    {fmt(adsResults.costPerSale)} ad cost per sale. Either cut your budget to
                    around <strong>{fmt(adsResults.breakEvenBudget)}/day</strong>, improve your
                    conversion rate, or raise your price.
                  </p>
                )}
              </div>
            </>
          ) : (
            <p className="text-sm text-slate-500 italic">
              Etsy is unavailable or profit is zero. Enable Etsy and enter a profitable price to
              see ads ROI.
            </p>
          )}
        </CollapsibleSection>
      )}
    </div>
  );
}

/* ============================================================================
 * Small reusable bits
 * ========================================================================== */

function CollapsibleSection({
  id,
  title,
  emoji,
  open,
  onToggle,
  children,
}: {
  id: string;
  title: string;
  emoji: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <section
      aria-labelledby={`${id}-heading`}
      className="bg-white rounded-2xl ring-1 ring-slate-200 shadow-sm overflow-hidden"
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={`${id}-content`}
        className="w-full flex items-center justify-between gap-3 px-5 sm:px-6 py-4 text-left hover:bg-slate-50 transition"
      >
        <h2
          id={`${id}-heading`}
          className="text-base sm:text-lg font-bold font-display text-slate-900 flex items-center gap-2"
        >
          <span aria-hidden="true">{emoji}</span>
          {title}
        </h2>
        <span
          className={`text-slate-400 transform transition-transform ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        >
          ▼
        </span>
      </button>
      {open && (
        <div id={`${id}-content`} className="px-5 sm:px-6 pb-5 sm:pb-6 border-t border-slate-100 pt-5">
          {children}
        </div>
      )}
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-slate-50 ring-1 ring-slate-200 px-3 py-2">
      <div className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </div>
      <div className="text-base font-bold text-slate-900 tabular-nums mt-0.5">{value}</div>
    </div>
  );
}
