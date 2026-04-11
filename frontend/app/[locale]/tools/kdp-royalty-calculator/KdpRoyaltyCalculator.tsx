'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';

/* ============================================================================
 * Types
 * ========================================================================== */

type Currency = 'USD' | 'GBP' | 'EUR' | 'CAD' | 'AUD' | 'JPY' | 'PLN' | 'SEK';
type InkType = 'bw' | 'standard-color' | 'premium-color';
type TrimCategory = 'regular' | 'large';
type Channel = 'amazon' | 'expanded';

interface MarketplaceDef {
  id: string;
  label: string;
  currency: Currency;
  intlLocale: string; // for Intl.NumberFormat
  symbol: string;
}

interface CostEntry {
  regular: number;
  large: number;
}

interface FlatTier {
  minPages: number;
  maxPages: number;
  /** Costs by currency. EU group uses the EUR key. */
  costs: Partial<Record<Currency, CostEntry>>;
}

interface PerPageTier {
  minPages: number;
  maxPages: number;
  fixed: Partial<Record<Currency, CostEntry>>;
  perPage: Partial<Record<Currency, CostEntry>>;
}

interface InkPricing {
  flatTier?: FlatTier;
  perPageTier: PerPageTier;
  /** Currencies in which this ink type is unavailable. */
  unavailableIn?: Currency[];
}

/* ============================================================================
 * Pricing data — Source: kdp.amazon.com (April 2026)
 * Numbers transcribed verbatim from docs/prompt-1-kdp-royalty-calculator.md
 * Note: amazon.de/es/fr/it/nl/ie/com.be all share the EUR cost group.
 * ========================================================================== */

const PRICING: Record<InkType, InkPricing> = {
  bw: {
    flatTier: {
      minPages: 24,
      maxPages: 108,
      costs: {
        USD: { regular: 2.30, large: 2.84 },
        GBP: { regular: 1.93, large: 2.15 },
        EUR: { regular: 2.05, large: 2.48 },
        CAD: { regular: 2.99, large: 3.53 },
        AUD: { regular: 4.74, large: 5.28 },
        JPY: { regular: 422, large: 530 },
        PLN: { regular: 9.58, large: 11.61 },
        SEK: { regular: 22.84, large: 27.67 },
      },
    },
    perPageTier: {
      minPages: 110,
      maxPages: 828,
      fixed: {
        USD: { regular: 1.00, large: 1.00 },
        GBP: { regular: 0.85, large: 0.85 },
        EUR: { regular: 0.75, large: 0.75 },
        CAD: { regular: 1.26, large: 1.26 },
        AUD: { regular: 2.42, large: 2.42 },
        JPY: { regular: 206, large: 206 },
        PLN: { regular: 3.51, large: 3.51 },
        SEK: { regular: 8.37, large: 8.37 },
      },
      perPage: {
        USD: { regular: 0.012, large: 0.017 },
        GBP: { regular: 0.010, large: 0.012 },
        EUR: { regular: 0.012, large: 0.016 },
        CAD: { regular: 0.016, large: 0.021 },
        AUD: { regular: 0.022, large: 0.027 },
        JPY: { regular: 2, large: 3 },
        PLN: { regular: 0.056, large: 0.075 },
        SEK: { regular: 0.134, large: 0.179 },
      },
    },
  },
  'premium-color': {
    flatTier: {
      minPages: 24,
      maxPages: 40,
      costs: {
        USD: { regular: 3.60, large: 4.20 },
        GBP: { regular: 2.59, large: 3.24 },
        EUR: { regular: 2.85, large: 3.61 },
        CAD: { regular: 4.66, large: 5.26 },
        AUD: { regular: 5.82, large: 6.42 },
        JPY: { regular: 475, large: 475 }, // identical for both trims
        PLN: { regular: 12.86, large: 15.32 },
        SEK: { regular: 30.65, large: 36.51 },
      },
    },
    perPageTier: {
      minPages: 42,
      maxPages: 828,
      fixed: {
        USD: { regular: 1.00, large: 1.00 },
        GBP: { regular: 0.85, large: 0.85 },
        EUR: { regular: 0.75, large: 0.75 },
        CAD: { regular: 1.26, large: 1.26 },
        AUD: { regular: 2.42, large: 2.42 },
        JPY: { regular: 206, large: 206 },
        PLN: { regular: 3.51, large: 3.51 },
        SEK: { regular: 8.37, large: 8.37 },
      },
      perPage: {
        USD: { regular: 0.065, large: 0.080 },
        GBP: { regular: 0.0435, large: 0.0598 },
        EUR: { regular: 0.0525, large: 0.0715 },
        CAD: { regular: 0.085, large: 0.100 },
        AUD: { regular: 0.085, large: 0.100 },
        JPY: { regular: 4, large: 5 },
        PLN: { regular: 0.267, large: 0.337 },
        SEK: { regular: 0.636, large: 0.804 },
      },
    },
  },
  'standard-color': {
    // No flat tier — standard color is per-page only.
    perPageTier: {
      minPages: 72,
      maxPages: 600,
      fixed: {
        USD: { regular: 1.00, large: 1.00 },
        GBP: { regular: 0.85, large: 0.85 },
        EUR: { regular: 0.75, large: 0.75 },
        CAD: { regular: 1.26, large: 1.26 },
        PLN: { regular: 3.51, large: 3.51 },
        SEK: { regular: 8.37, large: 8.37 },
      },
      perPage: {
        USD: { regular: 0.0255, large: 0.0402 },
        GBP: { regular: 0.020, large: 0.027 },
        EUR: { regular: 0.024, large: 0.035 },
        CAD: { regular: 0.037, large: 0.052 },
        PLN: { regular: 0.112, large: 0.164 },
        SEK: { regular: 0.268, large: 0.3691 },
      },
    },
    unavailableIn: ['JPY', 'AUD'],
  },
};

const ROYALTY_THRESHOLDS: Record<Currency, { fiftyMax: number; sixtyMin: number }> = {
  USD: { fiftyMax: 9.98, sixtyMin: 9.99 },
  EUR: { fiftyMax: 9.98, sixtyMin: 9.99 },
  GBP: { fiftyMax: 7.98, sixtyMin: 7.99 },
  CAD: { fiftyMax: 13.98, sixtyMin: 13.99 },
  AUD: { fiftyMax: 13.98, sixtyMin: 13.99 },
  JPY: { fiftyMax: 999, sixtyMin: 1000 },
  PLN: { fiftyMax: 39, sixtyMin: 40 },
  SEK: { fiftyMax: 98, sixtyMin: 99 },
};

const MAX_LIST_PRICE: Record<Currency, number> = {
  USD: 250,
  EUR: 250,
  GBP: 250,
  CAD: 350,
  AUD: 350,
  JPY: 30000,
  PLN: 1200,
  SEK: 2500,
};

const MARKETPLACES: MarketplaceDef[] = [
  { id: 'amazon-com',    label: 'Amazon.com',     currency: 'USD', intlLocale: 'en-US', symbol: '$'  },
  { id: 'amazon-co-uk',  label: 'Amazon.co.uk',   currency: 'GBP', intlLocale: 'en-GB', symbol: '£'  },
  { id: 'amazon-de',     label: 'Amazon.de',      currency: 'EUR', intlLocale: 'de-DE', symbol: '€'  },
  { id: 'amazon-fr',     label: 'Amazon.fr',      currency: 'EUR', intlLocale: 'fr-FR', symbol: '€'  },
  { id: 'amazon-es',     label: 'Amazon.es',      currency: 'EUR', intlLocale: 'es-ES', symbol: '€'  },
  { id: 'amazon-it',     label: 'Amazon.it',      currency: 'EUR', intlLocale: 'it-IT', symbol: '€'  },
  { id: 'amazon-nl',     label: 'Amazon.nl',      currency: 'EUR', intlLocale: 'nl-NL', symbol: '€'  },
  { id: 'amazon-co-jp',  label: 'Amazon.co.jp',   currency: 'JPY', intlLocale: 'ja-JP', symbol: '¥'  },
  { id: 'amazon-ca',     label: 'Amazon.ca',      currency: 'CAD', intlLocale: 'en-CA', symbol: 'C$' },
  { id: 'amazon-com-au', label: 'Amazon.com.au',  currency: 'AUD', intlLocale: 'en-AU', symbol: 'A$' },
  { id: 'amazon-pl',     label: 'Amazon.pl',      currency: 'PLN', intlLocale: 'pl-PL', symbol: 'zł' },
  { id: 'amazon-se',     label: 'Amazon.se',      currency: 'SEK', intlLocale: 'sv-SE', symbol: 'kr' },
];

/** All distinct cost groups for the "Compare All Marketplaces" table. */
const COST_GROUPS: Array<{ currency: Currency; label: string; intlLocale: string }> = [
  { currency: 'USD', label: 'Amazon.com (USD)',           intlLocale: 'en-US' },
  { currency: 'GBP', label: 'Amazon.co.uk (GBP)',         intlLocale: 'en-GB' },
  { currency: 'EUR', label: 'Amazon EU (EUR)',            intlLocale: 'de-DE' },
  { currency: 'CAD', label: 'Amazon.ca (CAD)',            intlLocale: 'en-CA' },
  { currency: 'AUD', label: 'Amazon.com.au (AUD)',        intlLocale: 'en-AU' },
  { currency: 'JPY', label: 'Amazon.co.jp (JPY)',         intlLocale: 'ja-JP' },
  { currency: 'PLN', label: 'Amazon.pl (PLN)',            intlLocale: 'pl-PL' },
  { currency: 'SEK', label: 'Amazon.se (SEK)',            intlLocale: 'sv-SE' },
];

/* ============================================================================
 * Pure calculation functions
 * ========================================================================== */

function pageCountRange(ink: InkType): { min: number; max: number } {
  const p = PRICING[ink];
  const min = p.flatTier ? p.flatTier.minPages : p.perPageTier.minPages;
  const max = p.perPageTier.maxPages;
  return { min, max };
}

function isInkAvailable(ink: InkType, currency: Currency): boolean {
  const p = PRICING[ink];
  if (p.unavailableIn?.includes(currency)) return false;
  // Also check the per-page tier table actually has the currency.
  return p.perPageTier.fixed[currency] !== undefined;
}

function calcPrintingCost(
  ink: InkType,
  currency: Currency,
  trim: TrimCategory,
  pageCount: number
): number | null {
  if (!isInkAvailable(ink, currency)) return null;
  const p = PRICING[ink];
  const range = pageCountRange(ink);
  if (pageCount < range.min || pageCount > range.max) return null;

  // Flat tier (e.g. B&W 24-108, Premium Color 24-40)
  if (p.flatTier && pageCount >= p.flatTier.minPages && pageCount <= p.flatTier.maxPages) {
    const entry = p.flatTier.costs[currency];
    if (!entry) return null;
    return entry[trim];
  }

  // Per-page tier
  const fixed = p.perPageTier.fixed[currency];
  const perPage = p.perPageTier.perPage[currency];
  if (!fixed || !perPage) return null;
  return fixed[trim] + pageCount * perPage[trim];
}

interface RoyaltyResult {
  rate: 0.4 | 0.5 | 0.6;
  royalty: number;
  belowMinimum: boolean;
}

function calcRoyalty(
  listPrice: number,
  printingCost: number,
  currency: Currency,
  channel: Channel
): RoyaltyResult {
  let rate: 0.4 | 0.5 | 0.6;
  if (channel === 'expanded') {
    rate = 0.4;
  } else {
    const threshold = ROYALTY_THRESHOLDS[currency].sixtyMin;
    rate = listPrice >= threshold ? 0.6 : 0.5;
  }
  const raw = rate * listPrice - printingCost;
  return {
    rate,
    royalty: raw < 0 ? 0 : raw,
    belowMinimum: raw < 0,
  };
}

interface MinPriceResult {
  min50: number;
  min60: number;
  effectiveMin: number;
  /** Which tier the effective minimum lands in. */
  effectiveTier: 50 | 60;
}

function calcMinListPrice(
  printingCost: number,
  currency: Currency,
  channel: Channel
): MinPriceResult {
  if (channel === 'expanded') {
    const min = printingCost / 0.4;
    return { min50: min, min60: min, effectiveMin: min, effectiveTier: 50 };
  }
  const min50 = printingCost / 0.5;
  const min60 = printingCost / 0.6;
  const threshold = ROYALTY_THRESHOLDS[currency].sixtyMin;
  // If pricing at the 60% tier requires going at or above the 60% threshold,
  // the 60% minimum is achievable. Otherwise the 50% minimum applies.
  if (min60 >= threshold) {
    return { min50, min60, effectiveMin: min60, effectiveTier: 60 };
  }
  return { min50, min60, effectiveMin: min50, effectiveTier: 50 };
}

function formatCurrency(amount: number, currency: Currency, intlLocale: string): string {
  try {
    return new Intl.NumberFormat(intlLocale, {
      style: 'currency',
      currency,
      minimumFractionDigits: currency === 'JPY' ? 0 : 2,
      maximumFractionDigits: currency === 'JPY' ? 0 : 2,
    }).format(amount);
  } catch {
    return `${amount.toFixed(currency === 'JPY' ? 0 : 2)} ${currency}`;
  }
}

/** Round a price up to the nearest "natural" step for that currency. */
function ceilToStep(amount: number, step: number): number {
  return Math.ceil(amount / step) * step;
}

/** Step size for the optimal-price table per currency. */
function priceStep(currency: Currency): number {
  if (currency === 'JPY') return 100;
  if (currency === 'SEK') return 5;
  if (currency === 'PLN') return 2;
  return 1;
}

/* ============================================================================
 * Component
 * ========================================================================== */

const INK_OPTIONS: { value: InkType; label: string }[] = [
  { value: 'bw',              label: 'Black & White' },
  { value: 'standard-color',  label: 'Standard Color' },
  { value: 'premium-color',   label: 'Premium Color' },
];

const TRIM_OPTIONS: { value: TrimCategory; label: string }[] = [
  { value: 'regular', label: 'Regular' },
  { value: 'large',   label: 'Large' },
];

const CHANNEL_OPTIONS: { value: Channel; label: string }[] = [
  { value: 'amazon',   label: 'Amazon (standard)' },
  { value: 'expanded', label: 'Expanded Distribution' },
];

export default function KdpRoyaltyCalculator() {
  const [inkType, setInkType] = useState<InkType>('bw');
  const [trim, setTrim] = useState<TrimCategory>('regular');
  const [pageCount, setPageCount] = useState<number>(120);
  const [marketplaceId, setMarketplaceId] = useState<string>('amazon-com');
  const [listPriceInput, setListPriceInput] = useState<string>('');
  const [channel, setChannel] = useState<Channel>('amazon');
  const [showCompare, setShowCompare] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const marketplace = useMemo(
    () => MARKETPLACES.find((m) => m.id === marketplaceId) ?? MARKETPLACES[0],
    [marketplaceId]
  );
  const currency = marketplace.currency;
  const intlLocale = marketplace.intlLocale;

  /* --------- Auto-correct invalid combinations --------- */

  // If user picks a marketplace that doesn't support the current ink, fall back to B&W.
  useEffect(() => {
    if (!isInkAvailable(inkType, currency)) {
      setInkType('bw');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  // Clamp page count to the active ink's range whenever ink changes.
  useEffect(() => {
    const range = pageCountRange(inkType);
    setPageCount((prev) => {
      let next = prev;
      if (next < range.min) next = range.min;
      if (next > range.max) next = range.max;
      if (next % 2 !== 0) next += 1;
      return next;
    });
  }, [inkType]);

  /* --------- Derived calculations --------- */

  const range = pageCountRange(inkType);
  const printingCost = useMemo(
    () => calcPrintingCost(inkType, currency, trim, pageCount),
    [inkType, currency, trim, pageCount]
  );

  const listPrice = useMemo(() => {
    const v = parseFloat(listPriceInput);
    return Number.isFinite(v) && v > 0 ? v : null;
  }, [listPriceInput]);

  const maxPrice = MAX_LIST_PRICE[currency];
  const listPriceTooHigh = listPrice !== null && listPrice > maxPrice;

  const minPriceResult = useMemo(() => {
    if (printingCost === null) return null;
    return calcMinListPrice(printingCost, currency, channel);
  }, [printingCost, currency, channel]);

  const royaltyResult = useMemo(() => {
    if (printingCost === null || listPrice === null) return null;
    if (listPriceTooHigh) return null;
    return calcRoyalty(listPrice, printingCost, currency, channel);
  }, [listPrice, printingCost, currency, channel, listPriceTooHigh]);

  const royaltyMargin = useMemo(() => {
    if (!royaltyResult || listPrice === null || listPrice === 0) return null;
    return (royaltyResult.royalty / listPrice) * 100;
  }, [royaltyResult, listPrice]);

  /* --------- Compare-all-marketplaces rows --------- */

  const compareRows = useMemo(() => {
    return COST_GROUPS.map((g) => {
      const cost = calcPrintingCost(inkType, g.currency, trim, pageCount);
      const min = cost === null ? null : calcMinListPrice(cost, g.currency, channel);
      return {
        currency: g.currency,
        label: g.label,
        intlLocale: g.intlLocale,
        printingCost: cost,
        minListPrice: min?.effectiveMin ?? null,
        sixtyMin: ROYALTY_THRESHOLDS[g.currency].sixtyMin,
        max: MAX_LIST_PRICE[g.currency],
      };
    });
  }, [inkType, trim, pageCount, channel]);

  /* --------- Optimal price finder rows --------- */

  const optimalRows = useMemo(() => {
    if (printingCost === null || !minPriceResult) return [];
    const step = priceStep(currency);
    const start = ceilToStep(minPriceResult.effectiveMin, step);
    const rows: Array<{ price: number; rate: 0.4 | 0.5 | 0.6; royalty: number; isThreshold: boolean }> = [];
    let foundThreshold = false;
    for (let i = 0; i < 16; i++) {
      const price = start + i * step;
      if (price > maxPrice) break;
      const r = calcRoyalty(price, printingCost, currency, channel);
      const isFirstSixty = !foundThreshold && r.rate === 0.6 && channel !== 'expanded';
      if (isFirstSixty) foundThreshold = true;
      rows.push({ price, rate: r.rate, royalty: r.royalty, isThreshold: isFirstSixty });
    }
    return rows;
  }, [printingCost, minPriceResult, currency, channel, maxPrice]);

  /* --------- Handlers --------- */

  const handlePageCountChange = useCallback(
    (raw: string) => {
      const n = parseInt(raw, 10);
      if (Number.isNaN(n)) {
        setPageCount(range.min);
        return;
      }
      let next = n;
      if (next < range.min) next = range.min;
      if (next > range.max) next = range.max;
      if (next % 2 !== 0) next += 1;
      if (next > range.max) next -= 2;
      setPageCount(next);
    },
    [range.min, range.max]
  );

  const stepPageCount = useCallback(
    (delta: number) => {
      setPageCount((prev) => {
        let next = prev + delta;
        if (next < range.min) next = range.min;
        if (next > range.max) next = range.max;
        if (next % 2 !== 0) next += delta > 0 ? 1 : -1;
        return next;
      });
    },
    [range.min, range.max]
  );

  const handleCopy = useCallback(async () => {
    if (printingCost === null) return;
    const inkLabel = INK_OPTIONS.find((o) => o.value === inkType)?.label ?? inkType;
    const trimLabel = trim === 'regular' ? 'Regular' : 'Large';
    const lines: string[] = [
      'KDP Royalty Estimate — LessonCraftStudio.com',
      `Book: ${pageCount} pages, ${inkLabel}, ${trimLabel} trim`,
      `Marketplace: ${marketplace.label} (${currency})`,
    ];
    if (listPrice !== null && !listPriceTooHigh) {
      lines.push(`List Price: ${formatCurrency(listPrice, currency, intlLocale)}`);
    }
    lines.push(`Printing Cost: ${formatCurrency(printingCost, currency, intlLocale)}`);
    if (royaltyResult) {
      lines.push(`Royalty Rate: ${Math.round(royaltyResult.rate * 100)}%`);
      lines.push(`Your Royalty: ${formatCurrency(royaltyResult.royalty, currency, intlLocale)}`);
    } else if (minPriceResult) {
      lines.push(
        `Minimum List Price: ${formatCurrency(minPriceResult.effectiveMin, currency, intlLocale)}`
      );
    }
    try {
      await navigator.clipboard.writeText(lines.join('\n'));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard blocked — silent fail
    }
  }, [
    printingCost,
    inkType,
    trim,
    pageCount,
    marketplace,
    currency,
    intlLocale,
    listPrice,
    listPriceTooHigh,
    royaltyResult,
    minPriceResult,
  ]);

  /* --------- Helpers for the cost-breakdown bar --------- */

  type BarSegment = { label: string; value: number; color: string; pct: number };
  const barSegments = useMemo<BarSegment[] | null>(() => {
    if (!royaltyResult || printingCost === null || listPrice === null || listPriceTooHigh) {
      return null;
    }
    const amazonCut = listPrice - printingCost - royaltyResult.royalty;
    const segs: BarSegment[] = [
      { label: "Amazon's cut", value: Math.max(0, amazonCut), color: 'bg-slate-400', pct: 0 },
      { label: 'Printing cost', value: printingCost,           color: 'bg-secondary', pct: 0 },
      { label: 'Your royalty',  value: royaltyResult.royalty,   color: 'bg-primary',   pct: 0 },
    ];
    const total = segs.reduce((a, s) => a + s.value, 0) || 1;
    segs.forEach((s) => {
      s.pct = (s.value / total) * 100;
    });
    return segs;
  }, [royaltyResult, printingCost, listPrice, listPriceTooHigh]);

  /* ========================================================================
   * Render
   * ====================================================================== */

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900">
          KDP Royalty Calculator
          <span className="block text-lg sm:text-xl md:text-2xl font-semibold text-slate-600 mt-2">
            Free Amazon Printing Cost &amp; Profit Tool
          </span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
          Calculate Amazon KDP printing costs, royalties, and minimum list price for paperback
          books across all 8 marketplaces. Instant, no signup, official 2026 rates.
        </p>
      </div>

      {/* Two-column main area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ============ INPUTS CARD ============ */}
        <section
          aria-labelledby="kdp-inputs-heading"
          className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-200 p-6"
        >
          <h2
            id="kdp-inputs-heading"
            className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4"
          >
            Book Details
          </h2>

          {/* Ink type */}
          <fieldset className="mb-5">
            <legend className="block text-sm font-medium text-slate-700 mb-2">Ink type</legend>
            <div className="grid grid-cols-3 gap-2">
              {INK_OPTIONS.map((opt) => {
                const disabled = !isInkAvailable(opt.value, currency);
                const active = inkType === opt.value;
                return (
                  <label
                    key={opt.value}
                    className={[
                      'cursor-pointer text-center text-sm font-medium rounded-lg px-3 py-2 ring-1 transition',
                      active
                        ? 'bg-primary text-white ring-primary shadow-sm'
                        : 'bg-white text-slate-700 ring-slate-200 hover:ring-primary/40',
                      disabled ? 'opacity-40 cursor-not-allowed' : '',
                    ].join(' ')}
                  >
                    <input
                      type="radio"
                      name="kdp-ink"
                      className="sr-only"
                      value={opt.value}
                      checked={active}
                      disabled={disabled}
                      onChange={() => !disabled && setInkType(opt.value)}
                    />
                    {opt.label}
                  </label>
                );
              })}
            </div>
            {!isInkAvailable('standard-color', currency) && (
              <p className="mt-2 text-xs text-slate-500">
                Standard Color is not available on {marketplace.label}.
              </p>
            )}
          </fieldset>

          {/* Trim */}
          <fieldset className="mb-5">
            <legend className="text-sm font-medium text-slate-700 mb-2 inline-flex items-center gap-1.5">
              Trim size
              <span className="group relative inline-flex">
                <button
                  type="button"
                  aria-describedby="trim-tooltip"
                  className="w-4 h-4 rounded-full bg-slate-200 text-slate-600 text-[10px] font-bold flex items-center justify-center hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  ?
                </button>
                <span
                  id="trim-tooltip"
                  role="tooltip"
                  className="invisible group-hover:visible group-focus-within:visible absolute z-10 left-1/2 -translate-x-1/2 top-full mt-1 w-56 rounded-md bg-slate-900 px-3 py-2 text-xs font-normal text-white shadow-lg"
                >
                  Regular = width ≤ 6.12&quot; AND height ≤ 9&quot;. Anything wider OR taller counts as Large.
                </span>
              </span>
            </legend>
            <div className="grid grid-cols-2 gap-2">
              {TRIM_OPTIONS.map((opt) => {
                const active = trim === opt.value;
                return (
                  <label
                    key={opt.value}
                    className={[
                      'cursor-pointer text-center text-sm font-medium rounded-lg px-3 py-2 ring-1 transition',
                      active
                        ? 'bg-primary text-white ring-primary shadow-sm'
                        : 'bg-white text-slate-700 ring-slate-200 hover:ring-primary/40',
                    ].join(' ')}
                  >
                    <input
                      type="radio"
                      name="kdp-trim"
                      className="sr-only"
                      value={opt.value}
                      checked={active}
                      onChange={() => setTrim(opt.value)}
                    />
                    {opt.label}
                  </label>
                );
              })}
            </div>
          </fieldset>

          {/* Page count */}
          <div className="mb-6">
            <label htmlFor="kdp-pages" className="block text-sm font-medium text-slate-700 mb-2">
              Page count
            </label>
            <div className="flex items-stretch rounded-lg ring-1 ring-slate-200 overflow-hidden focus-within:ring-2 focus-within:ring-primary">
              <button
                type="button"
                aria-label="Decrease page count by 2"
                onClick={() => stepPageCount(-2)}
                className="w-10 bg-slate-50 hover:bg-slate-100 text-slate-600 text-lg font-semibold"
              >
                −
              </button>
              <input
                id="kdp-pages"
                type="number"
                inputMode="numeric"
                min={range.min}
                max={range.max}
                step={2}
                value={pageCount}
                onChange={(e) => handlePageCountChange(e.target.value)}
                className="flex-1 text-center text-base font-semibold text-slate-900 focus:outline-none"
              />
              <button
                type="button"
                aria-label="Increase page count by 2"
                onClick={() => stepPageCount(2)}
                className="w-10 bg-slate-50 hover:bg-slate-100 text-slate-600 text-lg font-semibold"
              >
                +
              </button>
            </div>
            <p className="mt-1.5 text-xs text-slate-500">
              {range.min}–{range.max} pages, even numbers only
            </p>
          </div>

          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4 pt-2 border-t border-slate-100">
            Pricing
          </h2>

          {/* Marketplace */}
          <div className="mb-5">
            <label htmlFor="kdp-marketplace" className="block text-sm font-medium text-slate-700 mb-2">
              Marketplace
            </label>
            <select
              id="kdp-marketplace"
              value={marketplaceId}
              onChange={(e) => setMarketplaceId(e.target.value)}
              className="w-full rounded-lg ring-1 ring-slate-200 px-3 py-2 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {MARKETPLACES.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.label} ({m.currency})
                </option>
              ))}
            </select>
          </div>

          {/* List price */}
          <div className="mb-5">
            <label htmlFor="kdp-list-price" className="block text-sm font-medium text-slate-700 mb-2">
              List price
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-slate-500 text-sm font-medium pointer-events-none">
                {marketplace.symbol}
              </span>
              <input
                id="kdp-list-price"
                type="number"
                inputMode="decimal"
                min={0}
                step={currency === 'JPY' ? 1 : 0.01}
                placeholder={
                  minPriceResult
                    ? formatCurrency(minPriceResult.effectiveMin, currency, intlLocale).replace(/^[^0-9]*/, '')
                    : ''
                }
                value={listPriceInput}
                onChange={(e) => setListPriceInput(e.target.value)}
                className={[
                  'w-full rounded-lg ring-1 px-3 py-2 pl-9 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2',
                  listPriceTooHigh
                    ? 'ring-red-300 focus:ring-red-500'
                    : 'ring-slate-200 focus:ring-primary',
                ].join(' ')}
              />
            </div>
            {listPriceTooHigh && (
              <p className="mt-1.5 text-xs text-red-600">
                Maximum list price for {marketplace.label} is{' '}
                {formatCurrency(maxPrice, currency, intlLocale)}.
              </p>
            )}
            {!listPriceTooHigh && minPriceResult && (
              <p className="mt-1.5 text-xs text-slate-500">
                Suggested minimum: {formatCurrency(minPriceResult.effectiveMin, currency, intlLocale)}
              </p>
            )}
          </div>

          {/* Channel */}
          <fieldset>
            <legend className="block text-sm font-medium text-slate-700 mb-2">Distribution channel</legend>
            <div className="grid grid-cols-2 gap-2">
              {CHANNEL_OPTIONS.map((opt) => {
                const active = channel === opt.value;
                return (
                  <label
                    key={opt.value}
                    className={[
                      'cursor-pointer text-center text-sm font-medium rounded-lg px-3 py-2 ring-1 transition',
                      active
                        ? 'bg-primary text-white ring-primary shadow-sm'
                        : 'bg-white text-slate-700 ring-slate-200 hover:ring-primary/40',
                    ].join(' ')}
                  >
                    <input
                      type="radio"
                      name="kdp-channel"
                      className="sr-only"
                      value={opt.value}
                      checked={active}
                      onChange={() => setChannel(opt.value)}
                    />
                    {opt.label}
                  </label>
                );
              })}
            </div>
          </fieldset>
        </section>

        {/* ============ RESULTS CARD ============ */}
        <section
          aria-labelledby="kdp-results-heading"
          aria-live="polite"
          className="bg-gradient-to-br from-primary-50 to-white rounded-2xl shadow-sm ring-1 ring-slate-200 p-6"
        >
          <h2
            id="kdp-results-heading"
            className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4"
          >
            Your estimate
          </h2>

          {/* Primary metrics row */}
          <div className="grid grid-cols-2 gap-4 mb-5">
            <div>
              <div className="text-xs text-slate-500">Printing cost</div>
              <div className="text-2xl font-bold text-slate-900 mt-0.5">
                {printingCost !== null
                  ? formatCurrency(printingCost, currency, intlLocale)
                  : '—'}
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-500">Royalty rate</div>
              <div className="text-2xl font-bold text-slate-900 mt-0.5">
                {royaltyResult
                  ? `${Math.round(royaltyResult.rate * 100)}%`
                  : channel === 'expanded'
                    ? '40%'
                    : '—'}
              </div>
              {royaltyResult && channel !== 'expanded' && (
                <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                  {royaltyResult.rate === 0.6
                    ? `Priced at or above ${formatCurrency(ROYALTY_THRESHOLDS[currency].sixtyMin, currency, intlLocale)} (60% tier)`
                    : `Below ${formatCurrency(ROYALTY_THRESHOLDS[currency].sixtyMin, currency, intlLocale)} = 50% tier`}
                </p>
              )}
              {channel === 'expanded' && (
                <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                  Expanded distribution always pays 40%
                </p>
              )}
            </div>
          </div>

          {/* Hero royalty number */}
          <div className="bg-white rounded-xl ring-1 ring-slate-200 p-5 mb-5">
            <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold">
              Your royalty per sale
            </div>
            {royaltyResult ? (
              <>
                <div className="text-4xl sm:text-5xl font-bold text-primary mt-2">
                  {formatCurrency(royaltyResult.royalty, currency, intlLocale)}
                </div>
                {royaltyResult.belowMinimum && (
                  <p className="mt-2 text-sm text-red-600 font-medium">
                    ⚠ Your list price is below the minimum required to earn royalties.
                  </p>
                )}
              </>
            ) : (
              <p className="mt-2 text-sm text-slate-500">
                Enter a list price to see your royalty.
              </p>
            )}
          </div>

          {/* Min / max list price + margin */}
          <dl className="grid grid-cols-2 gap-4 text-sm mb-5">
            <div>
              <dt className="text-xs text-slate-500">Minimum list price</dt>
              <dd className="font-semibold text-slate-900 mt-0.5">
                {minPriceResult
                  ? formatCurrency(minPriceResult.effectiveMin, currency, intlLocale)
                  : '—'}
              </dd>
              {minPriceResult && channel !== 'expanded' && (
                <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                  50% tier: {formatCurrency(minPriceResult.min50, currency, intlLocale)} · 60% tier:{' '}
                  {formatCurrency(minPriceResult.min60, currency, intlLocale)}
                </p>
              )}
            </div>
            <div>
              <dt className="text-xs text-slate-500">Maximum list price</dt>
              <dd className="font-semibold text-slate-900 mt-0.5">
                {formatCurrency(maxPrice, currency, intlLocale)}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-slate-500">Royalty margin</dt>
              <dd className="font-semibold text-slate-900 mt-0.5">
                {royaltyMargin !== null ? `${royaltyMargin.toFixed(1)}%` : '—'}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-slate-500 inline-flex items-center gap-1.5">
                Break-even ACOS
                <span className="group relative inline-flex">
                  <button
                    type="button"
                    aria-describedby="acos-tooltip"
                    className="w-4 h-4 rounded-full bg-slate-200 text-slate-600 text-[10px] font-bold flex items-center justify-center hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    ?
                  </button>
                  <span
                    id="acos-tooltip"
                    role="tooltip"
                    className="invisible group-hover:visible group-focus-within:visible absolute z-10 left-1/2 -translate-x-1/2 top-full mt-1 w-56 rounded-md bg-slate-900 px-3 py-2 text-xs font-normal text-white shadow-lg"
                  >
                    If you run Amazon Ads, keep your ACOS below this number to stay profitable.
                  </span>
                </span>
              </dt>
              <dd className="font-semibold text-slate-900 mt-0.5">
                {royaltyMargin !== null ? `${royaltyMargin.toFixed(1)}%` : '—'}
              </dd>
            </div>
          </dl>

          {/* Cost breakdown bar */}
          <div className="mb-4">
            <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-2">
              Where each sale goes
            </div>
            {barSegments ? (
              <>
                <div
                  role="img"
                  aria-label={`Cost breakdown for a ${pageCount}-page ${
                    inkType === 'bw' ? 'black and white' : inkType === 'standard-color' ? 'standard color' : 'premium color'
                  } ${trim} trim paperback on ${marketplace.label} priced at ${
                    listPrice !== null ? formatCurrency(listPrice, currency, intlLocale) : 'list price'
                  }: Amazon's cut ${formatCurrency(barSegments[0].value, currency, intlLocale)}, printing cost ${formatCurrency(
                    barSegments[1].value,
                    currency,
                    intlLocale
                  )}, your royalty ${formatCurrency(barSegments[2].value, currency, intlLocale)}.`}
                  className="flex h-7 w-full rounded-full overflow-hidden ring-1 ring-slate-200 bg-slate-100"
                >
                  {barSegments.map((seg) => (
                    <div
                      key={seg.label}
                      className={`${seg.color} transition-[width] duration-300 ease-out`}
                      style={{ width: `${seg.pct}%` }}
                      title={`${seg.label}: ${formatCurrency(seg.value, currency, intlLocale)}`}
                    />
                  ))}
                </div>
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11px]">
                  {barSegments.map((seg) => (
                    <div key={seg.label} className="inline-flex items-center gap-1.5">
                      <span className={`inline-block w-2.5 h-2.5 rounded-sm ${seg.color}`} />
                      <span className="text-slate-600">
                        {seg.label}:{' '}
                        <span className="font-semibold text-slate-900">
                          {formatCurrency(seg.value, currency, intlLocale)}
                        </span>{' '}
                        ({seg.pct.toFixed(0)}%)
                      </span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="h-7 w-full rounded-full bg-slate-100 ring-1 ring-slate-200" />
            )}
          </div>

          {/* Copy results */}
          <div className="pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={handleCopy}
              disabled={printingCost === null}
              className="inline-flex items-center gap-2 rounded-lg bg-slate-900 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium px-4 py-2 transition"
            >
              {copied ? '✓ Copied!' : 'Copy results'}
            </button>
          </div>
        </section>
      </div>

      {/* ============ COMPARE ALL MARKETPLACES ============ */}
      <section className="mt-10 bg-white rounded-2xl shadow-sm ring-1 ring-slate-200 p-6">
        <button
          type="button"
          onClick={() => setShowCompare((v) => !v)}
          aria-expanded={showCompare}
          className="w-full flex items-center justify-between text-left"
        >
          <div>
            <h2 className="text-lg font-bold text-slate-900">Compare Royalties Across All Amazon Marketplaces</h2>
            <p className="text-sm text-slate-500 mt-0.5">
              Same book specs, all 8 currency groups side by side. A unique feature most KDP calculators lack.
            </p>
          </div>
          <span className="ml-4 text-primary text-sm font-semibold">
            {showCompare ? 'Hide ▲' : 'Show ▼'}
          </span>
        </button>
        {showCompare && (
          <div className="mt-5 -mx-2 sm:mx-0 overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-200">
                  <th className="py-2 pr-4 font-semibold">Marketplace</th>
                  <th className="py-2 pr-4 font-semibold">Printing cost</th>
                  <th className="py-2 pr-4 font-semibold">Min list price</th>
                  <th className="py-2 pr-4 font-semibold">60% tier at</th>
                  <th className="py-2 pr-4 font-semibold">Max list price</th>
                </tr>
              </thead>
              <tbody>
                {compareRows.map((row) => (
                  <tr key={row.currency} className="border-b border-slate-100 last:border-0">
                    <td className="py-2.5 pr-4 font-medium text-slate-900">{row.label}</td>
                    <td className="py-2.5 pr-4 text-slate-700">
                      {row.printingCost !== null
                        ? formatCurrency(row.printingCost, row.currency, row.intlLocale)
                        : <span className="text-slate-400">N/A</span>}
                    </td>
                    <td className="py-2.5 pr-4 text-slate-700">
                      {row.minListPrice !== null
                        ? formatCurrency(row.minListPrice, row.currency, row.intlLocale)
                        : <span className="text-slate-400">—</span>}
                    </td>
                    <td className="py-2.5 pr-4 text-slate-700">
                      {formatCurrency(row.sixtyMin, row.currency, row.intlLocale)}
                    </td>
                    <td className="py-2.5 pr-4 text-slate-700">
                      {formatCurrency(row.max, row.currency, row.intlLocale)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-xs text-slate-500 mt-3">
              Note: list prices and royalties shown are in each marketplace&apos;s local currency.
              KDP does not auto-convert prices — you set each storefront price manually.
            </p>
          </div>
        )}
      </section>

      {/* ============ OPTIMAL PRICE FINDER ============ */}
      <section className="mt-6 bg-white rounded-2xl shadow-sm ring-1 ring-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-900">Find Your Optimal Book Price</h2>
        <p className="text-sm text-slate-500 mt-0.5">
          Royalty at every list price from the minimum upward. The highlighted row is the
          first price that earns the 60% royalty tier — where most KDP authors should aim.
        </p>
        {optimalRows.length > 0 ? (
          <div className="mt-5 -mx-2 sm:mx-0 overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-200">
                  <th className="py-2 pr-4 font-semibold">List price</th>
                  <th className="py-2 pr-4 font-semibold">Royalty rate</th>
                  <th className="py-2 pr-4 font-semibold">Your royalty</th>
                  <th className="py-2 pr-4 font-semibold">Margin</th>
                </tr>
              </thead>
              <tbody>
                {optimalRows.map((row) => {
                  const margin = (row.royalty / row.price) * 100;
                  return (
                    <tr
                      key={row.price}
                      className={[
                        'border-b border-slate-100 last:border-0',
                        row.isThreshold ? 'bg-primary-50 font-semibold' : '',
                      ].join(' ')}
                    >
                      <td className="py-2 pr-4 text-slate-900">
                        {formatCurrency(row.price, currency, intlLocale)}
                        {row.isThreshold && (
                          <span className="ml-2 inline-block text-[10px] font-semibold uppercase tracking-wider text-primary bg-primary-100 px-1.5 py-0.5 rounded">
                            60% tier
                          </span>
                        )}
                      </td>
                      <td className="py-2 pr-4 text-slate-700">
                        {Math.round(row.rate * 100)}%
                      </td>
                      <td className="py-2 pr-4 text-slate-700">
                        {formatCurrency(row.royalty, currency, intlLocale)}
                      </td>
                      <td className="py-2 pr-4 text-slate-700">{margin.toFixed(1)}%</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="mt-5 text-sm text-slate-500">
            Set a valid book configuration to see the price ladder.
          </p>
        )}
      </section>
    </div>
  );
}
