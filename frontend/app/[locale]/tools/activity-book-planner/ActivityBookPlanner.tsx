'use client';

import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  memo,
} from 'react';
import Link from 'next/link';
import {
  ACTIVITY_CATALOG,
  ACTIVITIES_BY_CATEGORY,
  ActivityCategory,
  ActivityType,
  AGE_GROUPS,
  AgeGroup,
  BOOK_TEMPLATES,
  BookTemplate,
  CATEGORY_META,
  getActivityById,
  getStructuralById,
  STRUCTURAL_TYPES,
  StructuralId,
  StructuralType,
} from './activity-catalog';

/* ============================================================================
 * Types
 * ========================================================================== */

type Ink = 'bw' | 'standard-color' | 'premium-color';
type PaperColor = 'white' | 'cream';

type TrimSizeId =
  | 'us-letter'
  | 'a4'
  | '8x10'
  | '7x10'
  | '6x9'
  | 'digest'
  | 'square-825'
  | 'square-85';

interface TrimSize {
  id: TrimSizeId;
  label: string;
  w: number;
  h: number;
  isLarge: boolean;
}

const TRIM_SIZES: TrimSize[] = [
  { id: 'us-letter', label: '8.5" × 11" (US Letter)', w: 8.5, h: 11, isLarge: true },
  { id: 'a4', label: '8.27" × 11.69" (A4)', w: 8.27, h: 11.69, isLarge: true },
  { id: '8x10', label: '8" × 10"', w: 8, h: 10, isLarge: true },
  { id: '7x10', label: '7" × 10"', w: 7, h: 10, isLarge: true },
  { id: '6x9', label: '6" × 9" (Trade)', w: 6, h: 9, isLarge: false },
  { id: 'digest', label: '5.5" × 8.5" (Digest)', w: 5.5, h: 8.5, isLarge: false },
  { id: 'square-825', label: '8.25" × 8.25" (Square)', w: 8.25, h: 8.25, isLarge: true },
  { id: 'square-85', label: '8.5" × 8.5" (Square)', w: 8.5, h: 8.5, isLarge: true },
];

interface BookSection {
  id: string;
  kind: 'structural' | 'activity';
  typeId: string;
  pages: number;
  titleOverride?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  note?: string;
  fixed?: boolean;
  autoComputed?: boolean;
}

interface Setup {
  bookTitle: string;
  ageGroup: AgeGroup;
  trimSize: TrimSizeId;
  ink: Ink;
  paperColor: PaperColor;
  targetPages: number;
}

interface PlannerCore {
  setup: Setup;
  sections: BookSection[];
}

interface PlannerState extends PlannerCore {
  history: PlannerCore[];
}

/* ============================================================================
 * KDP Pricing — US marketplace only (transcribed from KdpRoyaltyCalculator)
 * ========================================================================== */

const US_BW_FLAT = { regular: 2.3, large: 2.84 };
const US_BW_PER_PAGE = {
  fixed: { regular: 1.0, large: 1.0 },
  per: { regular: 0.012, large: 0.017 },
};
const US_PREMIUM_FLAT = { regular: 3.6, large: 4.2 };
const US_PREMIUM_PER_PAGE = {
  fixed: { regular: 1.0, large: 1.0 },
  per: { regular: 0.065, large: 0.08 },
};
const US_STANDARD_PER_PAGE = {
  fixed: { regular: 1.0, large: 1.0 },
  per: { regular: 0.0255, large: 0.0402 },
};
const ROYALTY_SIXTY_MIN_USD = 9.99;
const MAX_LIST_PRICE_USD = 250;

// Page-count limits per trim + ink, US marketplace.
// From prompt §KDP Pricing Data.
const PAGE_LIMITS: Record<TrimSizeId, Partial<Record<Ink, { min: number; max: number }>>> = {
  'us-letter': {
    bw: { min: 24, max: 590 },
    'standard-color': { min: 72, max: 600 },
    'premium-color': { min: 24, max: 590 },
  },
  a4: {
    bw: { min: 24, max: 780 },
    'premium-color': { min: 24, max: 590 },
  },
  '8x10': {
    bw: { min: 24, max: 828 },
    'standard-color': { min: 72, max: 600 },
    'premium-color': { min: 24, max: 828 },
  },
  '7x10': {
    bw: { min: 24, max: 828 },
    'standard-color': { min: 72, max: 600 },
    'premium-color': { min: 24, max: 828 },
  },
  '6x9': {
    bw: { min: 24, max: 828 },
    'standard-color': { min: 72, max: 600 },
    'premium-color': { min: 24, max: 828 },
  },
  digest: {
    bw: { min: 24, max: 828 },
    'standard-color': { min: 72, max: 600 },
    'premium-color': { min: 24, max: 828 },
  },
  'square-825': {
    bw: { min: 24, max: 590 },
    'standard-color': { min: 72, max: 600 },
    'premium-color': { min: 24, max: 590 },
  },
  'square-85': {
    bw: { min: 24, max: 590 },
    'standard-color': { min: 72, max: 600 },
    'premium-color': { min: 24, max: 590 },
  },
};

const SPINE_RATE_BW_WHITE = 0.002252;
const SPINE_RATE_BW_CREAM = 0.0025;
const SPINE_RATE_PREMIUM = 0.002347;
const SPINE_RATE_STANDARD = 0.002252;

/* ============================================================================
 * Pure calculations
 * ========================================================================== */

function getTrim(trimId: TrimSizeId): TrimSize {
  return TRIM_SIZES.find((t) => t.id === trimId) || TRIM_SIZES[0];
}

function getTrimCategory(trimId: TrimSizeId): 'regular' | 'large' {
  return getTrim(trimId).isLarge ? 'large' : 'regular';
}

function getPageCountLimits(trim: TrimSizeId, ink: Ink): { min: number; max: number } {
  const entry = PAGE_LIMITS[trim]?.[ink];
  if (entry) return entry;
  return { min: 24, max: 590 };
}

function computePrintingCostUSD(pages: number, ink: Ink, trim: TrimSizeId): number | null {
  if (pages <= 0) return null;
  const cat = getTrimCategory(trim);

  if (ink === 'bw') {
    if (pages < 24) return null;
    if (pages <= 108) return US_BW_FLAT[cat];
    return US_BW_PER_PAGE.fixed[cat] + pages * US_BW_PER_PAGE.per[cat];
  }
  if (ink === 'premium-color') {
    if (pages < 24) return null;
    if (pages <= 40) return US_PREMIUM_FLAT[cat];
    return US_PREMIUM_PER_PAGE.fixed[cat] + pages * US_PREMIUM_PER_PAGE.per[cat];
  }
  // standard-color
  if (pages < 72) return null;
  return US_STANDARD_PER_PAGE.fixed[cat] + pages * US_STANDARD_PER_PAGE.per[cat];
}

function computeSpineWidthInches(pages: number, ink: Ink, paper: PaperColor): number {
  let rate = SPINE_RATE_BW_WHITE;
  if (ink === 'bw') rate = paper === 'cream' ? SPINE_RATE_BW_CREAM : SPINE_RATE_BW_WHITE;
  else if (ink === 'premium-color') rate = SPINE_RATE_PREMIUM;
  else if (ink === 'standard-color') rate = SPINE_RATE_STANDARD;
  return pages * rate;
}

function computeRoyalty(
  listPrice: number,
  printingCost: number
): { rate: 0.5 | 0.6; royalty: number } {
  const rate: 0.5 | 0.6 = listPrice >= ROYALTY_SIXTY_MIN_USD ? 0.6 : 0.5;
  const royalty = listPrice * rate - printingCost;
  return { rate, royalty };
}

function computeMinListPriceUSD(printingCost: number): number {
  // Minimum list price at 60% rate (or 50% if below threshold).
  // We report the lowest price at which royalty is non-negative.
  // At 60%, minimum is printingCost / 0.60.
  // At 50%, minimum is printingCost / 0.50.
  // Return the lower of the two (whichever is reachable given the rate boundary).
  const min60 = printingCost / 0.6;
  const min50 = printingCost / 0.5;
  if (min60 >= ROYALTY_SIXTY_MIN_USD) return Math.max(min60, 0.01);
  // Fall back to the 50% minimum, but only if it is strictly below the 60% threshold.
  if (min50 < ROYALTY_SIXTY_MIN_USD) return min50;
  return ROYALTY_SIXTY_MIN_USD;
}

function totalPages(sections: BookSection[]): number {
  return sections.reduce((sum, s) => sum + Math.max(0, s.pages || 0), 0);
}

function computeAnswerKeyPages(sections: BookSection[]): number {
  const keyPages = sections
    .filter((s) => s.kind === 'activity')
    .filter((s) => {
      const act = getActivityById(s.typeId);
      return act?.hasAnswerKey;
    })
    .reduce((sum, s) => sum + s.pages, 0);
  return Math.ceil(keyPages * 0.5);
}

function computeCategoryBreakdown(sections: BookSection[]): Record<ActivityCategory, number> {
  const totals: Record<ActivityCategory, number> = {
    math: 0,
    word: 0,
    creative: 0,
    visual: 0,
    logic: 0,
  };
  for (const s of sections) {
    if (s.kind !== 'activity') continue;
    const act = getActivityById(s.typeId);
    if (!act) continue;
    totals[act.category] += s.pages;
  }
  return totals;
}

function usd(n: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);
}

function makeId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `id-${Math.random().toString(36).slice(2, 10)}-${Date.now().toString(36)}`;
}

/* ============================================================================
 * Initial state + reducer
 * ========================================================================== */

const INITIAL_SETUP: Setup = {
  bookTitle: 'My Activity Book',
  ageGroup: 'early-elementary',
  trimSize: 'us-letter',
  ink: 'bw',
  paperColor: 'white',
  targetPages: 100,
};

function makeStructuralSection(id: StructuralId): BookSection {
  const meta = getStructuralById(id);
  return {
    id: makeId(),
    kind: 'structural',
    typeId: id,
    pages: meta?.defaultPages ?? 1,
    fixed: id === 'title-page',
    autoComputed: id === 'answer-key',
  };
}

function initialSections(): BookSection[] {
  return [
    makeStructuralSection('title-page'),
    makeStructuralSection('copyright'),
    makeStructuralSection('toc'),
    makeStructuralSection('how-to'),
    { ...makeStructuralSection('answer-key'), pages: 0 },
  ];
}

const INITIAL_STATE: PlannerState = {
  setup: INITIAL_SETUP,
  sections: initialSections(),
  history: [],
};

type Action =
  | { type: 'SET_SETUP_FIELD'; key: keyof Setup; value: Setup[keyof Setup] }
  | { type: 'ADD_SECTION'; section: BookSection; index?: number }
  | { type: 'UPDATE_SECTION'; id: string; patch: Partial<BookSection> }
  | { type: 'UPDATE_SECTION_SILENT'; id: string; patch: Partial<BookSection> }
  | { type: 'REMOVE_SECTION'; id: string }
  | { type: 'MOVE_SECTION'; from: number; to: number }
  | { type: 'LOAD_TEMPLATE'; template: BookTemplate }
  | { type: 'RESET' }
  | { type: 'UNDO' };

const HISTORY_MAX = 10;

function pushHistory(state: PlannerState): PlannerCore[] {
  const snap: PlannerCore = { setup: state.setup, sections: state.sections };
  const next = [snap, ...state.history];
  if (next.length > HISTORY_MAX) next.length = HISTORY_MAX;
  return next;
}

function reducer(state: PlannerState, action: Action): PlannerState {
  switch (action.type) {
    case 'SET_SETUP_FIELD': {
      // Paper color only matters for B&W; reset to white on ink change.
      let setup = { ...state.setup, [action.key]: action.value } as Setup;
      if (action.key === 'ink' && action.value !== 'bw') {
        setup.paperColor = 'white';
      }
      if (action.key === 'targetPages') {
        const v = Number(action.value);
        setup.targetPages = Math.max(1, Math.round(v));
      }
      return { ...state, setup, history: pushHistory(state) };
    }
    case 'ADD_SECTION': {
      const sections = [...state.sections];
      // Find insertion point: by default, insert just before the answer-key
      // section if the new section is a content section; otherwise append.
      let idx = action.index;
      if (idx == null) {
        const aiIdx = sections.findIndex(
          (s) => s.kind === 'structural' && s.typeId === 'answer-key'
        );
        idx = aiIdx >= 0 ? aiIdx : sections.length;
      }
      sections.splice(idx, 0, action.section);
      return { ...state, sections, history: pushHistory(state) };
    }
    case 'UPDATE_SECTION': {
      const sections = state.sections.map((s) =>
        s.id === action.id ? { ...s, ...action.patch } : s
      );
      return { ...state, sections, history: pushHistory(state) };
    }
    case 'UPDATE_SECTION_SILENT': {
      // Used for auto-computed answer-key — does NOT push history
      // so users can still undo their own edits.
      const sections = state.sections.map((s) =>
        s.id === action.id ? { ...s, ...action.patch } : s
      );
      return { ...state, sections };
    }
    case 'REMOVE_SECTION': {
      const target = state.sections.find((s) => s.id === action.id);
      if (!target || target.fixed) return state;
      const sections = state.sections.filter((s) => s.id !== action.id);
      return { ...state, sections, history: pushHistory(state) };
    }
    case 'MOVE_SECTION': {
      const { from, to } = action;
      if (from === to || from < 0 || to < 0 || from >= state.sections.length) return state;
      const sections = [...state.sections];
      // Guard: title page stays at index 0.
      const titleIdx = sections.findIndex((s) => s.typeId === 'title-page');
      if (from === titleIdx || to === 0) return state;
      const [moved] = sections.splice(from, 1);
      const clamped = Math.min(Math.max(1, to > from ? to - 1 : to), sections.length);
      sections.splice(clamped, 0, moved);
      return { ...state, sections, history: pushHistory(state) };
    }
    case 'LOAD_TEMPLATE': {
      const tpl = action.template;
      const newSections: BookSection[] = [];
      newSections.push(makeStructuralSection('title-page'));
      if (tpl.includeFrontMatter) newSections.push(makeStructuralSection('copyright'));
      if (tpl.includeTOC) newSections.push(makeStructuralSection('toc'));
      if (tpl.includeHowTo) newSections.push(makeStructuralSection('how-to'));
      for (const spec of tpl.sections) {
        if (spec.kind === 'activity') {
          newSections.push({
            id: makeId(),
            kind: 'activity',
            typeId: spec.typeId,
            pages: spec.pages,
          });
        } else {
          newSections.push({
            id: makeId(),
            kind: 'structural',
            typeId: spec.typeId,
            pages: spec.pages,
          });
        }
      }
      if (tpl.includeCertificate) newSections.push(makeStructuralSection('certificate'));
      newSections.push({ ...makeStructuralSection('answer-key'), pages: 0 });
      return {
        ...state,
        setup: {
          ...state.setup,
          bookTitle: tpl.name,
          ageGroup: tpl.ageGroup,
          targetPages: tpl.targetPages,
        },
        sections: newSections,
        history: pushHistory(state),
      };
    }
    case 'RESET':
      return {
        ...INITIAL_STATE,
        sections: initialSections(),
        history: pushHistory(state),
      };
    case 'UNDO': {
      if (state.history.length === 0) return state;
      const [prev, ...rest] = state.history;
      return { setup: prev.setup, sections: prev.sections, history: rest };
    }
    default:
      return state;
  }
}

/* ============================================================================
 * Computed-values helper (used in dashboard + export)
 * ========================================================================== */

interface Computed {
  total: number;
  contentPages: number;
  frontMatterPages: number;
  backMatterPages: number;
  answerKeyPages: number;
  printingCost: number | null;
  spineWidth: number;
  minListPrice: number | null;
  breakdown: Record<ActivityCategory, number>;
  breakdownTotal: number;
  pageRanges: Array<{ start: number; end: number }>;
  warnings: Array<{ level: 'error' | 'warn' | 'info'; msg: string }>;
  limits: { min: number; max: number };
}

const FRONT_MATTER_IDS: StructuralId[] = ['title-page', 'copyright', 'toc', 'how-to'];

function computeAll(state: PlannerState): Computed {
  const { sections, setup } = state;
  const total = totalPages(sections);
  const answerKeySection = sections.find(
    (s) => s.kind === 'structural' && s.typeId === 'answer-key'
  );
  const answerKeyPages = answerKeySection?.pages ?? 0;

  let frontMatterPages = 0;
  let backMatterPages = 0;
  let contentPages = 0;
  for (const s of sections) {
    if (s.kind === 'structural') {
      if (FRONT_MATTER_IDS.includes(s.typeId as StructuralId)) frontMatterPages += s.pages;
      else if (s.typeId === 'answer-key' || s.typeId === 'certificate') backMatterPages += s.pages;
      else contentPages += s.pages;
    } else {
      contentPages += s.pages;
    }
  }

  const printingCost = computePrintingCostUSD(total, setup.ink, setup.trimSize);
  const spineWidth = computeSpineWidthInches(total, setup.ink, setup.paperColor);
  const minListPrice = printingCost != null ? computeMinListPriceUSD(printingCost) : null;
  const breakdown = computeCategoryBreakdown(sections);
  const breakdownTotal = Object.values(breakdown).reduce((a, b) => a + b, 0);

  // Running page numbers
  const pageRanges: Array<{ start: number; end: number }> = [];
  let cursor = 1;
  for (const s of sections) {
    const start = cursor;
    const end = cursor + Math.max(0, s.pages) - 1;
    pageRanges.push({ start, end: Math.max(start, end) });
    cursor += Math.max(0, s.pages);
  }

  // Warnings & tips
  const warnings: Computed['warnings'] = [];
  const limits = getPageCountLimits(setup.trimSize, setup.ink);

  if (total > 0 && total < 24) {
    warnings.push({ level: 'error', msg: 'KDP requires a minimum of 24 pages.' });
  }
  if (total > limits.max) {
    warnings.push({
      level: 'error',
      msg: `Exceeds KDP limit (${limits.max} pages) for this trim + ink combination.`,
    });
  }
  if (total > 0 && total % 2 !== 0) {
    warnings.push({
      level: 'warn',
      msg: 'KDP requires an even page count. Add or remove one page.',
    });
  }
  // Content-mix tips
  if (breakdownTotal > 0) {
    const over60 = (Object.entries(breakdown) as Array<[ActivityCategory, number]>).find(
      ([, pages]) => pages / breakdownTotal > 0.6
    );
    if (over60) {
      warnings.push({
        level: 'info',
        msg: 'Consider adding variety — books with mixed activity types get better reviews and sell more.',
      });
    }
    if (breakdown.creative === 0) {
      warnings.push({
        level: 'info',
        msg: 'Adding a few coloring or drawing pages between sections gives buyers a break and raises perceived value.',
      });
    }
  }
  // Answer key expected but missing
  const activityNeedsKey = sections.some((s) => {
    if (s.kind !== 'activity') return false;
    return getActivityById(s.typeId)?.hasAnswerKey;
  });
  if (activityNeedsKey && answerKeyPages === 0) {
    warnings.push({
      level: 'warn',
      msg: 'Your book includes puzzles but the answer key section has 0 pages. Buyers expect answer keys.',
    });
  }
  if (total >= 24 && total <= 108 && setup.ink === 'bw') {
    warnings.push({
      level: 'info',
      msg: 'B&W books with 24-108 pages have a flat printing cost. Adding pages up to 108 will not increase your cost.',
    });
  }

  return {
    total,
    contentPages,
    frontMatterPages,
    backMatterPages,
    answerKeyPages,
    printingCost,
    spineWidth,
    minListPrice,
    breakdown,
    breakdownTotal,
    pageRanges,
    warnings,
    limits,
  };
}

/* ============================================================================
 * Clipboard export
 * ========================================================================== */

function formatClipboardPlan(state: PlannerState, computed: Computed): string {
  const { setup, sections } = state;
  const trim = getTrim(setup.trimSize);
  const inkLabel =
    setup.ink === 'bw' ? 'Black & White' : setup.ink === 'premium-color' ? 'Premium Color' : 'Standard Color';
  const paperLabel = setup.ink === 'bw' ? (setup.paperColor === 'cream' ? ' | Paper: Cream' : ' | Paper: White') : '';
  const price = computed.minListPrice;
  const recommendedPrice = price != null ? Math.max(9.99, Math.ceil(price * 1.6 * 100) / 100) : null;

  const lines: string[] = [];
  lines.push('KDP Activity Book Plan — LessonCraftStudio.com');
  lines.push('='.repeat(48));
  lines.push(`Title: ${setup.bookTitle}`);
  lines.push(
    `Trim Size: ${trim.label.split(' (')[0]} | Ink: ${inkLabel}${paperLabel}`
  );
  lines.push(
    `Total Pages: ${computed.total} | Spine Width: ${computed.spineWidth.toFixed(3)}"`
  );
  if (computed.printingCost != null) {
    lines.push(
      `Printing Cost: ${usd(computed.printingCost)} (US)${
        recommendedPrice != null ? ` | Recommended Price: ${usd(recommendedPrice)}` : ''
      }`
    );
  }
  lines.push('');
  lines.push('TABLE OF CONTENTS');
  lines.push('-'.repeat(48));

  sections.forEach((s, i) => {
    const rng = computed.pageRanges[i];
    const title = sectionTitle(s);
    const pagesText =
      rng.start === rng.end ? `p.${rng.start}` : `p.${rng.start}-${rng.end}`;
    const pagesLabel = s.pages > 1 ? ` (${s.pages} pages)` : '';
    const dot = '.'.repeat(Math.max(3, 38 - title.length - pagesLabel.length));
    lines.push(`${String(i + 1).padStart(2)}. ${title}${pagesLabel} ${dot} ${pagesText}`);
  });

  lines.push('');
  lines.push('CONTENT BREAKDOWN');
  const bd = computed.breakdown;
  const bt = computed.breakdownTotal;
  if (bt > 0) {
    const parts: string[] = [];
    (Object.keys(bd) as ActivityCategory[]).forEach((k) => {
      if (bd[k] > 0) {
        parts.push(`${CATEGORY_META[k].label}: ${Math.round((bd[k] / bt) * 100)}%`);
      }
    });
    lines.push(parts.join(' | '));
  } else {
    lines.push('(no content sections added yet)');
  }

  // Creation checklist
  const uniqueActivities = new Map<string, { count: number; act: ActivityType }>();
  for (const s of sections) {
    if (s.kind !== 'activity') continue;
    const act = getActivityById(s.typeId);
    if (!act) continue;
    const prev = uniqueActivities.get(act.id);
    uniqueActivities.set(act.id, {
      count: (prev?.count ?? 0) + s.pages,
      act,
    });
  }
  if (uniqueActivities.size > 0) {
    lines.push('');
    lines.push('CREATE THESE PAGES WITH LESSONCRAFTSTUDIO:');
    uniqueActivities.forEach(({ act, count }) => {
      lines.push(
        `→ ${act.name} (${count} pages): lessoncraftstudio.com/en/apps/${act.appSlug}`
      );
    });
  }

  return lines.join('\n');
}

function sectionTitle(section: BookSection): string {
  if (section.titleOverride) return section.titleOverride;
  if (section.kind === 'activity') {
    return getActivityById(section.typeId)?.name ?? section.typeId;
  }
  return getStructuralById(section.typeId as StructuralId)?.name ?? section.typeId;
}

function sectionIcon(section: BookSection): string {
  if (section.kind === 'activity') {
    return getActivityById(section.typeId)?.icon ?? '\u{1F4C4}';
  }
  return getStructuralById(section.typeId as StructuralId)?.icon ?? '\u{1F4C4}';
}

/* ============================================================================
 * Main component
 * ========================================================================== */

export default function ActivityBookPlanner() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const [setupOpen, setSetupOpen] = useState(true);
  const [listPriceInput, setListPriceInput] = useState<string>('9.99');
  const [copyToast, setCopyToast] = useState<string | null>(null);

  const computed = useMemo(() => computeAll(state), [state]);

  // Auto-compute answer key pages whenever activities change.
  const lastAutoRef = useRef<number>(-1);
  useEffect(() => {
    const ak = state.sections.find(
      (s) => s.kind === 'structural' && s.typeId === 'answer-key'
    );
    if (!ak || !ak.autoComputed) return;
    const want = computeAnswerKeyPages(state.sections);
    if (want === lastAutoRef.current) return;
    if (want === ak.pages) {
      lastAutoRef.current = want;
      return;
    }
    lastAutoRef.current = want;
    dispatch({ type: 'UPDATE_SECTION_SILENT', id: ak.id, patch: { pages: want } });
  }, [state.sections]);

  // Keyboard shortcut: Ctrl+Z / Cmd+Z for undo.
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        const target = e.target as HTMLElement | null;
        const tag = target?.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA' || target?.isContentEditable) return;
        e.preventDefault();
        dispatch({ type: 'UNDO' });
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const addActivity = useCallback((act: ActivityType) => {
    dispatch({
      type: 'ADD_SECTION',
      section: {
        id: makeId(),
        kind: 'activity',
        typeId: act.id,
        pages: act.defaultPages,
      },
    });
    setCopyToast(`Added ${act.name}`);
    window.setTimeout(() => setCopyToast(null), 1500);
  }, []);

  const addStructural = useCallback((s: StructuralType) => {
    dispatch({
      type: 'ADD_SECTION',
      section: {
        id: makeId(),
        kind: 'structural',
        typeId: s.id,
        pages: s.defaultPages || 1,
      },
    });
  }, []);

  const onCopyPlan = useCallback(async () => {
    try {
      const text = formatClipboardPlan(state, computed);
      await navigator.clipboard.writeText(text);
      setCopyToast('Book plan copied to clipboard');
      window.setTimeout(() => setCopyToast(null), 2500);
    } catch {
      setCopyToast('Clipboard unavailable — use your browser\'s copy instead.');
      window.setTimeout(() => setCopyToast(null), 3000);
    }
  }, [state, computed]);

  const onLoadTemplate = useCallback(
    (tpl: BookTemplate) => {
      const hasContent = state.sections.some((s) => s.kind === 'activity');
      if (hasContent) {
        const ok = window.confirm(
          `Loading "${tpl.name}" will replace your current outline. Continue?`
        );
        if (!ok) return;
      }
      dispatch({ type: 'LOAD_TEMPLATE', template: tpl });
      setCopyToast(`Loaded template: ${tpl.name}`);
      window.setTimeout(() => setCopyToast(null), 2000);
    },
    [state.sections]
  );

  const onReset = useCallback(() => {
    const ok = window.confirm('Reset the planner? All sections will be cleared.');
    if (ok) dispatch({ type: 'RESET' });
  }, []);

  return (
    <div className="space-y-6">
      {/* Live toast */}
      {copyToast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] rounded-full bg-slate-900 text-white text-sm px-5 py-2.5 shadow-xl ring-1 ring-white/10"
        >
          {copyToast}
        </div>
      )}

      {/* Template strip */}
      <TemplateStrip onLoad={onLoadTemplate} />

      <div className="grid grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)_340px] gap-4 lg:gap-6">
        {/* LEFT: Book Setup */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <BookSetupPanel
            setup={state.setup}
            open={setupOpen}
            onToggle={() => setSetupOpen((v) => !v)}
            onChange={(key, value) =>
              dispatch({ type: 'SET_SETUP_FIELD', key, value })
            }
            limits={computed.limits}
          />
        </aside>

        {/* CENTER: Outline */}
        <main className="min-w-0">
          <BookOutline
            state={state}
            computed={computed}
            dispatch={dispatch}
          />

          {/* Mobile: palette/dashboard triggers */}
          <div className="lg:hidden mt-4 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setPaletteOpen(true)}
              className="rounded-xl bg-primary text-white font-semibold py-3 shadow-sm active:bg-primary-700"
            >
              + Add Activity
            </button>
            <button
              type="button"
              onClick={() => setDashboardOpen(true)}
              className="rounded-xl bg-slate-900 text-white font-semibold py-3 shadow-sm active:bg-slate-700"
            >
              {computed.total} / {state.setup.targetPages} pages
            </button>
          </div>

          <CreationChecklist sections={state.sections} />
        </main>

        {/* RIGHT: Palette + Dashboard (desktop only) */}
        <aside className="hidden lg:flex flex-col gap-6 lg:sticky lg:top-24 lg:self-start lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto">
          <ActivityPalette
            ageGroup={state.setup.ageGroup}
            onAddActivity={addActivity}
            onAddStructural={addStructural}
          />
          <LiveDashboard
            state={state}
            computed={computed}
            listPriceInput={listPriceInput}
            onListPriceChange={setListPriceInput}
            onCopyPlan={onCopyPlan}
            onReset={onReset}
            onUndo={() => dispatch({ type: 'UNDO' })}
            canUndo={state.history.length > 0}
          />
        </aside>
      </div>

      {/* Mobile palette sheet */}
      {paletteOpen && (
        <MobileSheet title="Add a section" onClose={() => setPaletteOpen(false)}>
          <ActivityPalette
            ageGroup={state.setup.ageGroup}
            onAddActivity={(a) => {
              addActivity(a);
              setPaletteOpen(false);
            }}
            onAddStructural={(s) => {
              addStructural(s);
              setPaletteOpen(false);
            }}
          />
        </MobileSheet>
      )}
      {dashboardOpen && (
        <MobileSheet title="Book dashboard" onClose={() => setDashboardOpen(false)}>
          <LiveDashboard
            state={state}
            computed={computed}
            listPriceInput={listPriceInput}
            onListPriceChange={setListPriceInput}
            onCopyPlan={onCopyPlan}
            onReset={onReset}
            onUndo={() => dispatch({ type: 'UNDO' })}
            canUndo={state.history.length > 0}
          />
        </MobileSheet>
      )}
    </div>
  );
}

/* ============================================================================
 * Sub-components
 * ========================================================================== */

function TemplateStrip({ onLoad }: { onLoad: (t: BookTemplate) => void }) {
  return (
    <section className="bg-white rounded-2xl ring-1 ring-slate-200 p-4 sm:p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div>
          <h2 className="text-sm font-bold text-slate-900">Quick Start Templates</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Start from a proven book structure, then customize.
          </p>
        </div>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 sm:grid sm:grid-cols-2 md:grid-cols-3 sm:gap-3 sm:overflow-visible">
        {BOOK_TEMPLATES.map((tpl) => (
          <button
            key={tpl.id}
            type="button"
            onClick={() => onLoad(tpl)}
            className="flex-shrink-0 sm:flex-shrink text-left bg-slate-50 hover:bg-primary-50 hover:ring-primary ring-1 ring-slate-200 rounded-xl px-4 py-3 transition min-w-[240px] sm:min-w-0"
          >
            <div className="flex items-start gap-2.5">
              <span className="text-2xl" aria-hidden="true">{tpl.icon}</span>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold text-slate-900 truncate">
                  {tpl.name}
                </div>
                <div className="text-xs text-slate-500 truncate">{tpl.tagline}</div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

function BookSetupPanel({
  setup,
  open,
  onToggle,
  onChange,
  limits,
}: {
  setup: Setup;
  open: boolean;
  onToggle: () => void;
  onChange: <K extends keyof Setup>(key: K, value: Setup[K]) => void;
  limits: { min: number; max: number };
}) {
  return (
    <section className="bg-white rounded-2xl ring-1 ring-slate-200 shadow-sm">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3 text-left lg:cursor-default lg:pointer-events-none"
      >
        <h2 className="text-sm font-bold text-slate-900">Book Setup</h2>
        <span className="lg:hidden text-slate-400 text-xs">{open ? 'Hide' : 'Show'}</span>
      </button>
      <div className={`${open ? 'block' : 'hidden'} lg:block px-4 pb-4 space-y-4`}>
        {/* Title */}
        <div>
          <label htmlFor="bp-title" className="block text-xs font-semibold text-slate-700 mb-1">
            Book Title
          </label>
          <input
            id="bp-title"
            type="text"
            value={setup.bookTitle}
            onChange={(e) => onChange('bookTitle', e.target.value)}
            className="w-full rounded-lg ring-1 ring-slate-300 focus:ring-2 focus:ring-primary focus:outline-none px-3 py-2 text-sm"
            placeholder="My Activity Book"
          />
        </div>

        {/* Age group */}
        <div>
          <label htmlFor="bp-age" className="block text-xs font-semibold text-slate-700 mb-1">
            Target Audience
          </label>
          <select
            id="bp-age"
            value={setup.ageGroup}
            onChange={(e) => onChange('ageGroup', e.target.value as AgeGroup)}
            className="w-full rounded-lg ring-1 ring-slate-300 focus:ring-2 focus:ring-primary focus:outline-none px-3 py-2 text-sm bg-white"
          >
            {AGE_GROUPS.map((g) => (
              <option key={g.id} value={g.id}>{g.label}</option>
            ))}
          </select>
        </div>

        {/* Trim size */}
        <div>
          <label htmlFor="bp-trim" className="block text-xs font-semibold text-slate-700 mb-1">
            Trim Size
          </label>
          <select
            id="bp-trim"
            value={setup.trimSize}
            onChange={(e) => onChange('trimSize', e.target.value as TrimSizeId)}
            className="w-full rounded-lg ring-1 ring-slate-300 focus:ring-2 focus:ring-primary focus:outline-none px-3 py-2 text-sm bg-white"
          >
            {TRIM_SIZES.map((t) => (
              <option key={t.id} value={t.id}>{t.label}</option>
            ))}
          </select>
        </div>

        {/* Ink */}
        <fieldset>
          <legend className="block text-xs font-semibold text-slate-700 mb-1">Ink Type</legend>
          <div className="grid grid-cols-1 gap-1.5">
            {(['bw', 'premium-color', 'standard-color'] as Ink[]).map((ink) => (
              <label
                key={ink}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm cursor-pointer ring-1 transition ${
                  setup.ink === ink
                    ? 'bg-primary-50 ring-primary text-primary'
                    : 'ring-slate-200 text-slate-700 hover:ring-slate-300'
                }`}
              >
                <input
                  type="radio"
                  name="bp-ink"
                  value={ink}
                  checked={setup.ink === ink}
                  onChange={() => onChange('ink', ink)}
                  className="accent-primary"
                />
                <span>
                  {ink === 'bw' ? 'Black & White' : ink === 'premium-color' ? 'Premium Color' : 'Standard Color'}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        {/* Paper color (B&W only) */}
        {setup.ink === 'bw' && (
          <fieldset>
            <legend className="block text-xs font-semibold text-slate-700 mb-1">Paper Color</legend>
            <div className="grid grid-cols-2 gap-2">
              {(['white', 'cream'] as PaperColor[]).map((p) => (
                <label
                  key={p}
                  className={`flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm cursor-pointer ring-1 capitalize transition ${
                    setup.paperColor === p
                      ? 'bg-primary-50 ring-primary text-primary'
                      : 'ring-slate-200 text-slate-700 hover:ring-slate-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="bp-paper"
                    value={p}
                    checked={setup.paperColor === p}
                    onChange={() => onChange('paperColor', p)}
                    className="accent-primary"
                  />
                  <span>{p}</span>
                </label>
              ))}
            </div>
          </fieldset>
        )}

        {/* Target pages */}
        <div>
          <label htmlFor="bp-target" className="block text-xs font-semibold text-slate-700 mb-1">
            Target Page Count
          </label>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onChange('targetPages', Math.max(2, setup.targetPages - 2))}
              className="w-9 h-9 rounded-lg ring-1 ring-slate-300 text-slate-700 hover:bg-slate-50 font-bold"
              aria-label="Decrease target pages"
            >
              −
            </button>
            <input
              id="bp-target"
              type="number"
              value={setup.targetPages}
              onChange={(e) => onChange('targetPages', Number(e.target.value) || 0)}
              className="flex-1 min-w-0 text-center rounded-lg ring-1 ring-slate-300 focus:ring-2 focus:ring-primary focus:outline-none px-2 py-2 text-sm font-semibold"
            />
            <button
              type="button"
              onClick={() => onChange('targetPages', setup.targetPages + 2)}
              className="w-9 h-9 rounded-lg ring-1 ring-slate-300 text-slate-700 hover:bg-slate-50 font-bold"
              aria-label="Increase target pages"
            >
              +
            </button>
          </div>
          <p className="mt-1 text-[11px] text-slate-500">
            Allowed range: {limits.min}–{limits.max} pages (must be even).
          </p>
        </div>
      </div>
    </section>
  );
}

function ActivityPalette({
  ageGroup,
  onAddActivity,
  onAddStructural,
}: {
  ageGroup: AgeGroup;
  onAddActivity: (a: ActivityType) => void;
  onAddStructural: (s: StructuralType) => void;
}) {
  const [query, setQuery] = useState('');
  const [openCats, setOpenCats] = useState<Record<string, boolean>>({
    math: true,
    word: true,
    creative: true,
    visual: true,
    logic: true,
    structural: false,
  });

  const filteredByCat = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filter = (list: ActivityType[]) =>
      q === '' ? list : list.filter((a) => a.name.toLowerCase().includes(q));
    return {
      math: filter(ACTIVITIES_BY_CATEGORY.math),
      word: filter(ACTIVITIES_BY_CATEGORY.word),
      creative: filter(ACTIVITIES_BY_CATEGORY.creative),
      visual: filter(ACTIVITIES_BY_CATEGORY.visual),
      logic: filter(ACTIVITIES_BY_CATEGORY.logic),
    };
  }, [query]);

  const isSuggested = useCallback(
    (a: ActivityType) => a.ageFit.includes(ageGroup),
    [ageGroup]
  );

  return (
    <section className="bg-white rounded-2xl ring-1 ring-slate-200 p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-bold text-slate-900">Activity Palette</h2>
        <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
          Click to add
        </span>
      </div>
      <div className="relative mb-3">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search activities…"
          className="w-full rounded-lg ring-1 ring-slate-300 focus:ring-2 focus:ring-primary focus:outline-none px-3 py-2 text-sm"
        />
      </div>
      <div className="space-y-3">
        {(Object.keys(filteredByCat) as ActivityCategory[]).map((catKey) => {
          const list = filteredByCat[catKey];
          if (list.length === 0) return null;
          const meta = CATEGORY_META[catKey];
          const isOpen = openCats[catKey] !== false;
          return (
            <div key={catKey} className="rounded-lg ring-1 ring-slate-200 overflow-hidden">
              <button
                type="button"
                onClick={() =>
                  setOpenCats((prev) => ({ ...prev, [catKey]: !isOpen }))
                }
                className={`w-full flex items-center justify-between px-3 py-2 text-xs font-bold uppercase tracking-wider ${meta.badgeClass} ring-0`}
              >
                <span>{meta.label}</span>
                <span aria-hidden="true">{isOpen ? '−' : '+'}</span>
              </button>
              {isOpen && (
                <ul className="divide-y divide-slate-100">
                  {list.map((a) => {
                    const suggested = isSuggested(a);
                    return (
                      <li key={a.id}>
                        <button
                          type="button"
                          onClick={() => onAddActivity(a)}
                          className={`w-full flex items-center gap-2 px-3 py-2 text-left text-sm hover:bg-slate-50 ${
                            suggested ? 'bg-amber-50/40' : ''
                          }`}
                          title={suggested ? 'Suggested for this age group' : undefined}
                        >
                          <span aria-hidden="true" className="text-lg">{a.icon}</span>
                          <span className="flex-1 text-slate-800">{a.name}</span>
                          {a.hasAnswerKey && (
                            <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 ring-1 ring-emerald-200 rounded px-1.5 py-0.5">
                              Key
                            </span>
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}

        {/* Structural pages group */}
        <div className="rounded-lg ring-1 ring-slate-200 overflow-hidden">
          <button
            type="button"
            onClick={() =>
              setOpenCats((prev) => ({ ...prev, structural: !prev.structural }))
            }
            className="w-full flex items-center justify-between px-3 py-2 text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-700"
          >
            <span>Structural Pages</span>
            <span aria-hidden="true">{openCats.structural ? '−' : '+'}</span>
          </button>
          {openCats.structural && (
            <ul className="divide-y divide-slate-100">
              {STRUCTURAL_TYPES.filter(
                (s) => s.id !== 'title-page' && s.id !== 'answer-key'
              ).map((s) => (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => onAddStructural(s)}
                    className="w-full flex items-center gap-2 px-3 py-2 text-left text-sm hover:bg-slate-50"
                  >
                    <span aria-hidden="true" className="text-lg">{s.icon}</span>
                    <span className="flex-1 text-slate-800">{s.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

interface OutlineProps {
  state: PlannerState;
  computed: Computed;
  dispatch: React.Dispatch<Action>;
}

function BookOutline({ state, computed, dispatch }: OutlineProps) {
  const [dragId, setDragId] = useState<string | null>(null);
  const [dropBeforeId, setDropBeforeId] = useState<string | null>(null);

  const onDragStart = (e: React.DragEvent<HTMLElement>, section: BookSection) => {
    if (section.fixed) {
      e.preventDefault();
      return;
    }
    setDragId(section.id);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', section.id);
  };

  const onDragOver = (e: React.DragEvent<HTMLElement>, section: BookSection) => {
    if (!dragId) return;
    e.preventDefault();
    setDropBeforeId(section.id);
  };

  const onDrop = (e: React.DragEvent<HTMLElement>, target: BookSection) => {
    if (!dragId) return;
    e.preventDefault();
    const fromIdx = state.sections.findIndex((s) => s.id === dragId);
    const toIdx = state.sections.findIndex((s) => s.id === target.id);
    if (fromIdx < 0 || toIdx < 0 || fromIdx === toIdx) {
      setDragId(null);
      setDropBeforeId(null);
      return;
    }
    dispatch({ type: 'MOVE_SECTION', from: fromIdx, to: toIdx });
    setDragId(null);
    setDropBeforeId(null);
  };

  const onDragEnd = () => {
    setDragId(null);
    setDropBeforeId(null);
  };

  const moveBy = (id: string, delta: number) => {
    const idx = state.sections.findIndex((s) => s.id === id);
    if (idx < 0) return;
    const to = idx + delta;
    if (to <= 0 || to >= state.sections.length) return;
    dispatch({ type: 'MOVE_SECTION', from: idx, to });
  };

  return (
    <section className="bg-white rounded-2xl ring-1 ring-slate-200 shadow-sm overflow-hidden">
      <div className="px-4 py-3 sm:px-5 sm:py-4 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-slate-900">Book Outline</h2>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Drag to reorder. Click a section to edit.
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="font-semibold text-slate-900">{computed.total}</span>
          <span className="text-slate-400">/</span>
          <span className="text-slate-500">{state.setup.targetPages} pages</span>
        </div>
      </div>
      <ol className="px-3 sm:px-4 py-3 space-y-1.5">
        {state.sections.map((s, i) => {
          const range = computed.pageRanges[i];
          const isContent = s.kind === 'activity';
          const category = isContent ? getActivityById(s.typeId)?.category : undefined;
          const borderClass = category
            ? CATEGORY_META[category].borderClass
            : 'border-l-slate-300';
          return (
            <SectionCard
              key={s.id}
              section={s}
              index={i}
              range={range}
              borderClass={borderClass}
              draggingId={dragId}
              dropBeforeId={dropBeforeId}
              onDragStart={(e) => onDragStart(e, s)}
              onDragOver={(e) => onDragOver(e, s)}
              onDrop={(e) => onDrop(e, s)}
              onDragEnd={onDragEnd}
              onUpdate={(patch) =>
                dispatch({ type: 'UPDATE_SECTION', id: s.id, patch })
              }
              onRemove={() => dispatch({ type: 'REMOVE_SECTION', id: s.id })}
              onMoveUp={() => moveBy(s.id, -1)}
              onMoveDown={() => moveBy(s.id, 1)}
              onUnlockAnswerKey={() =>
                dispatch({ type: 'UPDATE_SECTION', id: s.id, patch: { autoComputed: false } })
              }
            />
          );
        })}
      </ol>
      {computed.warnings.length > 0 && (
        <div className="px-4 pb-4 space-y-1.5">
          {computed.warnings.map((w, i) => (
            <div
              key={i}
              role="alert"
              className={`text-xs rounded-lg px-3 py-2 ring-1 ${
                w.level === 'error'
                  ? 'bg-rose-50 text-rose-800 ring-rose-200'
                  : w.level === 'warn'
                  ? 'bg-amber-50 text-amber-800 ring-amber-200'
                  : 'bg-primary-50 text-primary ring-primary/20'
              }`}
            >
              {w.level === 'error' ? '⚠ ' : w.level === 'warn' ? '⚠ ' : '💡 '}
              {w.msg}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

interface SectionCardProps {
  section: BookSection;
  index: number;
  range: { start: number; end: number };
  borderClass: string;
  draggingId: string | null;
  dropBeforeId: string | null;
  onDragStart: (e: React.DragEvent<HTMLElement>) => void;
  onDragOver: (e: React.DragEvent<HTMLElement>) => void;
  onDrop: (e: React.DragEvent<HTMLElement>) => void;
  onDragEnd: () => void;
  onUpdate: (patch: Partial<BookSection>) => void;
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onUnlockAnswerKey: () => void;
}

const SectionCard = memo(function SectionCard(props: SectionCardProps) {
  const {
    section,
    index,
    range,
    borderClass,
    draggingId,
    dropBeforeId,
    onDragStart,
    onDragOver,
    onDrop,
    onDragEnd,
    onUpdate,
    onRemove,
    onMoveUp,
    onMoveDown,
    onUnlockAnswerKey,
  } = props;
  const [expanded, setExpanded] = useState(false);

  const title = sectionTitle(section);
  const icon = sectionIcon(section);
  const isDragging = draggingId === section.id;
  const isDropTarget = dropBeforeId === section.id && draggingId && draggingId !== section.id;
  const isActivity = section.kind === 'activity';
  const isAnswerKey = section.kind === 'structural' && section.typeId === 'answer-key';
  const activity = isActivity ? getActivityById(section.typeId) : undefined;
  const hasKey = activity?.hasAnswerKey;
  const appSlug = activity?.appSlug;

  return (
    <li>
      <article
        draggable={!section.fixed}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onDragEnd={onDragEnd}
        className={`group border-l-4 ${borderClass} bg-white rounded-lg ring-1 ring-slate-200 transition ${
          isDragging ? 'opacity-40' : ''
        } ${isDropTarget ? 'ring-2 ring-primary' : ''}`}
      >
        <div className="flex items-center gap-2 px-2.5 py-2">
          {/* Drag handle */}
          <span
            className={`text-slate-300 text-base select-none ${
              section.fixed ? 'opacity-0' : 'cursor-grab active:cursor-grabbing'
            }`}
            aria-hidden="true"
          >
            ⋮⋮
          </span>
          {/* Index */}
          <span className="text-[11px] font-semibold text-slate-400 w-6 text-right tabular-nums">
            {index + 1}
          </span>
          <span aria-hidden="true" className="text-lg leading-none">{icon}</span>
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="flex-1 text-left min-w-0"
          >
            <div className="text-sm font-semibold text-slate-900 truncate">
              {title}
              {isAnswerKey && section.autoComputed && (
                <span className="ml-2 text-[9px] font-bold uppercase tracking-wider text-primary bg-primary-50 ring-1 ring-primary/20 rounded px-1.5 py-0.5 align-middle">
                  Auto
                </span>
              )}
              {hasKey && (
                <span className="ml-2 text-[9px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 ring-1 ring-emerald-200 rounded px-1.5 py-0.5 align-middle">
                  Key
                </span>
              )}
            </div>
            <div className="text-[11px] text-slate-500 tabular-nums">
              {range.start === range.end ? `p. ${range.start}` : `p. ${range.start}–${range.end}`}
            </div>
          </button>

          {/* Page count stepper */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => onUpdate({ pages: Math.max(0, section.pages - 1) })}
              disabled={section.fixed || section.pages <= (isAnswerKey ? 0 : 1)}
              className="w-7 h-7 rounded ring-1 ring-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40"
              aria-label={`Decrease pages for ${title}`}
            >
              −
            </button>
            <span className="w-6 text-center text-sm font-semibold tabular-nums">
              {section.pages}
            </span>
            <button
              type="button"
              onClick={() => onUpdate({ pages: section.pages + 1 })}
              disabled={section.fixed}
              className="w-7 h-7 rounded ring-1 ring-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40"
              aria-label={`Increase pages for ${title}`}
            >
              +
            </button>
          </div>

          {/* Keyboard reorder (mobile-friendly) */}
          <div className="hidden sm:flex flex-col">
            <button
              type="button"
              onClick={onMoveUp}
              className="w-5 h-4 text-slate-400 hover:text-primary disabled:opacity-30"
              aria-label={`Move ${title} up`}
            >
              ▲
            </button>
            <button
              type="button"
              onClick={onMoveDown}
              className="w-5 h-4 text-slate-400 hover:text-primary"
              aria-label={`Move ${title} down`}
            >
              ▼
            </button>
          </div>

          {/* Delete */}
          <button
            type="button"
            onClick={onRemove}
            disabled={section.fixed}
            className="w-7 h-7 rounded text-slate-400 hover:text-rose-600 disabled:opacity-20"
            aria-label={`Remove ${title}`}
          >
            ✕
          </button>
        </div>

        {expanded && (
          <div className="border-t border-slate-100 px-4 py-3 bg-slate-50 space-y-3">
            {/* Title override */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Section title (optional)
              </label>
              <input
                type="text"
                value={section.titleOverride ?? ''}
                placeholder={title}
                onChange={(e) =>
                  onUpdate({ titleOverride: e.target.value || undefined })
                }
                className="w-full rounded-md ring-1 ring-slate-300 focus:ring-2 focus:ring-primary focus:outline-none px-2 py-1.5 text-sm bg-white"
              />
            </div>
            {isActivity && (
              <>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Difficulty
                  </label>
                  <div className="flex gap-1.5">
                    {(['easy', 'medium', 'hard'] as const).map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() =>
                          onUpdate({ difficulty: section.difficulty === d ? undefined : d })
                        }
                        className={`flex-1 text-xs font-semibold capitalize rounded-md py-1.5 ring-1 transition ${
                          section.difficulty === d
                            ? 'bg-primary-50 text-primary ring-primary'
                            : 'bg-white text-slate-600 ring-slate-200 hover:ring-slate-300'
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Theme note (e.g. "Farm animals")
                  </label>
                  <input
                    type="text"
                    value={section.note ?? ''}
                    onChange={(e) => onUpdate({ note: e.target.value || undefined })}
                    className="w-full rounded-md ring-1 ring-slate-300 focus:ring-2 focus:ring-primary focus:outline-none px-2 py-1.5 text-sm bg-white"
                  />
                </div>
                {appSlug && (
                  <Link
                    href={`/en/apps/${appSlug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                  >
                    Create these pages with the {activity?.name} generator →
                  </Link>
                )}
              </>
            )}
            {isAnswerKey && section.autoComputed && (
              <button
                type="button"
                onClick={onUnlockAnswerKey}
                className="text-xs font-semibold text-primary hover:underline"
              >
                Unlock to override auto-calculated page count
              </button>
            )}
          </div>
        )}
      </article>
    </li>
  );
});

function LiveDashboard({
  state,
  computed,
  listPriceInput,
  onListPriceChange,
  onCopyPlan,
  onReset,
  onUndo,
  canUndo,
}: {
  state: PlannerState;
  computed: Computed;
  listPriceInput: string;
  onListPriceChange: (v: string) => void;
  onCopyPlan: () => void;
  onReset: () => void;
  onUndo: () => void;
  canUndo: boolean;
}) {
  const { total, contentPages, frontMatterPages, backMatterPages, printingCost, spineWidth, minListPrice, breakdown, breakdownTotal } = computed;
  const target = state.setup.targetPages;
  const progressPct = Math.min(100, Math.round((total / Math.max(1, target)) * 100));
  const diff = total - target;
  const diffAbs = Math.abs(diff);
  const diffRatio = target > 0 ? diffAbs / target : 0;
  let progressColor = 'bg-emerald-500';
  if (diffRatio > 0.2) progressColor = 'bg-rose-500';
  else if (diffRatio > 0.05) progressColor = 'bg-amber-500';

  const parsedListPrice = parseFloat(listPriceInput || '0');
  const listPriceValid = isFinite(parsedListPrice) && parsedListPrice > 0 && parsedListPrice <= MAX_LIST_PRICE_USD;
  const royalty =
    printingCost != null && listPriceValid
      ? computeRoyalty(parsedListPrice, printingCost)
      : null;

  return (
    <section className="bg-white rounded-2xl ring-1 ring-slate-200 p-4 shadow-sm space-y-5" aria-live="polite">
      <div>
        <h2 className="text-sm font-bold text-slate-900 mb-2">Live Dashboard</h2>
        <dl className="text-xs space-y-1">
          <div className="flex justify-between text-slate-600">
            <dt>Content Pages</dt>
            <dd className="font-semibold text-slate-900 tabular-nums">{contentPages}</dd>
          </div>
          <div className="flex justify-between text-slate-600">
            <dt>Front Matter</dt>
            <dd className="font-semibold text-slate-900 tabular-nums">{frontMatterPages}</dd>
          </div>
          <div className="flex justify-between text-slate-600">
            <dt>Back Matter</dt>
            <dd className="font-semibold text-slate-900 tabular-nums">{backMatterPages}</dd>
          </div>
          <div className="flex justify-between text-slate-900 pt-1 border-t border-slate-100 mt-1">
            <dt className="font-bold">Total Pages</dt>
            <dd className="font-bold tabular-nums">{total}</dd>
          </div>
        </dl>

        <div className="mt-3">
          <div className="flex justify-between text-[11px] text-slate-500 mb-1">
            <span>{total} / {target} pages</span>
            <span>
              {diff > 0
                ? `${diffAbs} over`
                : diff < 0
                ? `${diffAbs} to fill`
                : 'On target'}
            </span>
          </div>
          <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
            <div
              className={`h-full ${progressColor} transition-all`}
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* KDP specs */}
      <div className="border-t border-slate-100 pt-4">
        <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
          KDP Specs (US)
        </h3>
        <dl className="text-xs space-y-1.5">
          <div className="flex justify-between">
            <dt className="text-slate-600">Spine Width</dt>
            <dd className="font-semibold text-slate-900 tabular-nums">
              {spineWidth.toFixed(3)}"
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-slate-600">Printing Cost</dt>
            <dd className="font-semibold text-slate-900 tabular-nums">
              {printingCost != null ? usd(printingCost) : '—'}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-slate-600">Min List Price</dt>
            <dd className="font-semibold text-slate-900 tabular-nums">
              {minListPrice != null ? usd(minListPrice) : '—'}
            </dd>
          </div>
        </dl>
      </div>

      {/* Royalty estimator */}
      <div className="border-t border-slate-100 pt-4">
        <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
          Royalty Estimator
        </h3>
        <label className="block text-xs text-slate-600 mb-1" htmlFor="bp-list-price">
          Try a list price (USD)
        </label>
        <input
          id="bp-list-price"
          type="number"
          step="0.01"
          value={listPriceInput}
          onChange={(e) => onListPriceChange(e.target.value)}
          className="w-full rounded-lg ring-1 ring-slate-300 focus:ring-2 focus:ring-primary focus:outline-none px-3 py-2 text-sm font-semibold tabular-nums"
        />
        {royalty != null ? (
          <dl className="mt-2 text-xs space-y-1">
            <div className="flex justify-between">
              <dt className="text-slate-600">Royalty Rate</dt>
              <dd className="font-semibold text-slate-900">
                {Math.round(royalty.rate * 100)}%
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-600">Royalty / Sale</dt>
              <dd
                className={`font-bold tabular-nums ${
                  royalty.royalty >= 0 ? 'text-emerald-700' : 'text-rose-700'
                }`}
              >
                {usd(royalty.royalty)}
              </dd>
            </div>
          </dl>
        ) : (
          <p className="mt-2 text-[11px] text-slate-400">
            {printingCost == null ? 'Add pages to calculate printing cost.' : 'Enter a valid list price.'}
          </p>
        )}
        <Link
          href="/en/tools/kdp-royalty-calculator"
          className="mt-2 inline-block text-[11px] font-semibold text-primary hover:underline"
        >
          Full multi-marketplace calculator →
        </Link>
      </div>

      {/* Content balance */}
      {breakdownTotal > 0 && (
        <div className="border-t border-slate-100 pt-4">
          <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
            Content Balance
          </h3>
          <ul className="space-y-1.5">
            {(Object.keys(breakdown) as ActivityCategory[]).map((cat) => {
              const pages = breakdown[cat];
              if (pages === 0) return null;
              const pct = Math.round((pages / breakdownTotal) * 100);
              const meta = CATEGORY_META[cat];
              return (
                <li key={cat} className="text-[11px]">
                  <div className="flex justify-between text-slate-600 mb-0.5">
                    <span>{meta.label}</span>
                    <span className="tabular-nums font-semibold">{pct}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className={`h-full ${meta.barClass}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Actions */}
      <div className="border-t border-slate-100 pt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={onCopyPlan}
          className="flex-1 min-w-[140px] rounded-lg bg-primary text-white text-sm font-semibold px-3 py-2.5 hover:bg-primary-700 transition"
        >
          📋 Copy Book Plan
        </button>
        <button
          type="button"
          onClick={onUndo}
          disabled={!canUndo}
          className="rounded-lg bg-white text-slate-700 text-sm font-semibold px-3 py-2.5 ring-1 ring-slate-300 hover:bg-slate-50 disabled:opacity-40"
        >
          Undo
        </button>
        <button
          type="button"
          onClick={onReset}
          className="rounded-lg bg-white text-slate-700 text-sm font-semibold px-3 py-2.5 ring-1 ring-slate-300 hover:bg-rose-50 hover:text-rose-700 hover:ring-rose-200"
        >
          Reset
        </button>
      </div>
    </section>
  );
}

function CreationChecklist({ sections }: { sections: BookSection[] }) {
  const uniqueActivities = useMemo(() => {
    const map = new Map<string, { activity: ActivityType; count: number }>();
    for (const s of sections) {
      if (s.kind !== 'activity') continue;
      const act = getActivityById(s.typeId);
      if (!act) continue;
      const prev = map.get(act.id);
      map.set(act.id, {
        activity: act,
        count: (prev?.count ?? 0) + s.pages,
      });
    }
    return Array.from(map.values());
  }, [sections]);

  if (uniqueActivities.length === 0) return null;

  return (
    <section className="mt-6 bg-gradient-to-br from-primary-50 to-white ring-1 ring-primary/20 rounded-2xl p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span aria-hidden="true">📋</span>
            Your Creation Checklist
          </h2>
          <p className="text-xs text-slate-600 mt-1">
            {uniqueActivities.length} generator{uniqueActivities.length === 1 ? '' : 's'} to create the pages in your plan. Click to start — every generator is free to try with a watermark.
          </p>
        </div>
      </div>
      <ul className="space-y-2">
        {uniqueActivities.map(({ activity, count }) => (
          <li key={activity.id}>
            <Link
              href={`/en/apps/${activity.appSlug}`}
              className="group flex items-center gap-3 bg-white rounded-lg ring-1 ring-slate-200 px-4 py-3 hover:ring-primary transition"
            >
              <span className="text-xl" aria-hidden="true">{activity.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-slate-900 group-hover:text-primary truncate">
                  {activity.name}
                </div>
                <div className="text-[11px] text-slate-500">
                  {count} page{count === 1 ? '' : 's'} ·{' '}
                  <span className={`${CATEGORY_META[activity.category].barClass} inline-block w-2 h-2 rounded-full align-middle mr-1`} />
                  {CATEGORY_META[activity.category].label}
                  {activity.hasAnswerKey && ' · includes answer key'}
                </div>
              </div>
              <span className="text-primary text-sm font-semibold whitespace-nowrap">
                Open generator →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

function MobileSheet({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 flex items-end lg:items-center justify-center"
      onClick={onClose}
      role="dialog"
      aria-label={title}
    >
      <div
        className="w-full max-w-xl max-h-[85vh] bg-slate-50 rounded-t-2xl lg:rounded-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-slate-200">
          <h3 className="text-sm font-bold text-slate-900">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full text-slate-500 hover:bg-slate-100"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <div className="overflow-y-auto p-4">{children}</div>
      </div>
    </div>
  );
}
