'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

/* ============================================================================
 * Types
 * ========================================================================== */

type Format = 'paperback' | 'hardcover';
type InkType = 'bw' | 'premium-color' | 'standard-color';
type PaperColor = 'white' | 'cream';
type UnitSystem = 'in' | 'mm';

interface TrimSize {
  id: string;
  widthIn: number;
  heightIn: number;
  widthMm: number;
  heightMm: number;
  label: string;
  labelMetric: string;
  group: 'regular' | 'large';
  note?: string;
}

interface PageCountRange {
  min: number;
  max: number;
}

interface MarginRow {
  minPages: number;
  maxPages: number;
  gutterIn: number;
  outsideNoBleedIn: number;
  outsideBleedIn: number;
}

/* ============================================================================
 * Constants — official KDP specifications (April 2026)
 * Source: docs/prompt-2-kdp-cover-size-calculator.md
 * ========================================================================== */

const COVER_BLEED_IN = 0.125;
const SPINE_TEXT_MIN_PAGES = 79;
const SPINE_TEXT_SAFE_IN = 0.0625;
const DPI = 300;
const IN_TO_MM = 25.4;

const SPINE_MULTIPLIERS = {
  bwWhite: 0.002252,
  bwCream: 0.0025,
  premiumColor: 0.002347,
  standardColor: 0.002252,
} as const;

const PAPERBACK_TRIMS: TrimSize[] = [
  { id: '5x8', widthIn: 5, heightIn: 8, widthMm: 127, heightMm: 203.2, label: '5" × 8"', labelMetric: '12.7 × 20.32 cm', group: 'regular' },
  { id: '5.06x7.81', widthIn: 5.06, heightIn: 7.81, widthMm: 128.5, heightMm: 198.4, label: '5.06" × 7.81"', labelMetric: '12.85 × 19.84 cm', group: 'regular' },
  { id: '5.25x8', widthIn: 5.25, heightIn: 8, widthMm: 133.4, heightMm: 203.2, label: '5.25" × 8"', labelMetric: '13.34 × 20.32 cm', group: 'regular' },
  { id: '5.5x8.5', widthIn: 5.5, heightIn: 8.5, widthMm: 139.7, heightMm: 215.9, label: '5.5" × 8.5"', labelMetric: '13.97 × 21.59 cm', group: 'regular' },
  { id: '6x9', widthIn: 6, heightIn: 9, widthMm: 152.4, heightMm: 228.6, label: '6" × 9"', labelMetric: '15.24 × 22.86 cm', group: 'regular', note: 'most popular' },
  { id: '6.14x9.21', widthIn: 6.14, heightIn: 9.21, widthMm: 156, heightMm: 233.9, label: '6.14" × 9.21"', labelMetric: '15.6 × 23.39 cm', group: 'large' },
  { id: '6.69x9.61', widthIn: 6.69, heightIn: 9.61, widthMm: 169.9, heightMm: 244.1, label: '6.69" × 9.61"', labelMetric: '16.99 × 24.41 cm', group: 'large' },
  { id: '7x10', widthIn: 7, heightIn: 10, widthMm: 177.8, heightMm: 254, label: '7" × 10"', labelMetric: '17.78 × 25.4 cm', group: 'large' },
  { id: '7.44x9.69', widthIn: 7.44, heightIn: 9.69, widthMm: 189, heightMm: 246.1, label: '7.44" × 9.69"', labelMetric: '18.9 × 24.61 cm', group: 'large' },
  { id: '7.5x9.25', widthIn: 7.5, heightIn: 9.25, widthMm: 190.5, heightMm: 235, label: '7.5" × 9.25"', labelMetric: '19.05 × 23.5 cm', group: 'large' },
  { id: '8x10', widthIn: 8, heightIn: 10, widthMm: 203.2, heightMm: 254, label: '8" × 10"', labelMetric: '20.32 × 25.4 cm', group: 'large' },
  { id: '8.25x6', widthIn: 8.25, heightIn: 6, widthMm: 209.6, heightMm: 152.4, label: '8.25" × 6"', labelMetric: '20.96 × 15.24 cm', group: 'large', note: 'landscape' },
  { id: '8.25x8.25', widthIn: 8.25, heightIn: 8.25, widthMm: 209.6, heightMm: 209.6, label: '8.25" × 8.25"', labelMetric: '20.96 × 20.96 cm', group: 'large', note: 'square' },
  { id: '8.5x8.5', widthIn: 8.5, heightIn: 8.5, widthMm: 215.9, heightMm: 215.9, label: '8.5" × 8.5"', labelMetric: '21.59 × 21.59 cm', group: 'large', note: 'square' },
  { id: '8.5x11', widthIn: 8.5, heightIn: 11, widthMm: 215.9, heightMm: 279.4, label: '8.5" × 11"', labelMetric: '21.59 × 27.94 cm', group: 'large', note: 'US Letter' },
  { id: '8.27x11.69', widthIn: 8.27, heightIn: 11.69, widthMm: 210, heightMm: 297, label: '8.27" × 11.69"', labelMetric: '21 × 29.7 cm', group: 'large', note: 'A4' },
];

const HARDCOVER_TRIMS: TrimSize[] = [
  { id: 'hc-5.5x8.5', widthIn: 5.5, heightIn: 8.5, widthMm: 139.7, heightMm: 215.9, label: '5.5" × 8.5"', labelMetric: '13.97 × 21.59 cm', group: 'regular' },
  { id: 'hc-6x9', widthIn: 6, heightIn: 9, widthMm: 152.4, heightMm: 228.6, label: '6" × 9"', labelMetric: '15.24 × 22.86 cm', group: 'regular', note: 'most popular' },
  { id: 'hc-6.14x9.21', widthIn: 6.14, heightIn: 9.21, widthMm: 156, heightMm: 233.9, label: '6.14" × 9.21"', labelMetric: '15.6 × 23.39 cm', group: 'large' },
  { id: 'hc-7x10', widthIn: 7, heightIn: 10, widthMm: 177.8, heightMm: 254, label: '7" × 10"', labelMetric: '17.78 × 25.4 cm', group: 'large' },
  { id: 'hc-8.25x11', widthIn: 8.25, heightIn: 11, widthMm: 209.6, heightMm: 279.4, label: '8.25" × 11"', labelMetric: '20.96 × 27.94 cm', group: 'large' },
];

const MARGIN_TABLE: MarginRow[] = [
  { minPages: 24, maxPages: 150, gutterIn: 0.375, outsideNoBleedIn: 0.25, outsideBleedIn: 0.375 },
  { minPages: 151, maxPages: 300, gutterIn: 0.5, outsideNoBleedIn: 0.25, outsideBleedIn: 0.375 },
  { minPages: 301, maxPages: 500, gutterIn: 0.625, outsideNoBleedIn: 0.25, outsideBleedIn: 0.375 },
  { minPages: 501, maxPages: 700, gutterIn: 0.75, outsideNoBleedIn: 0.25, outsideBleedIn: 0.375 },
  { minPages: 701, maxPages: 828, gutterIn: 0.875, outsideNoBleedIn: 0.25, outsideBleedIn: 0.375 },
];

interface Preset {
  label: string;
  sub: string;
  trimId: string;
  format: Format;
}

const PRESETS: Preset[] = [
  { label: 'US Trade', sub: '6 × 9', trimId: '6x9', format: 'paperback' },
  { label: 'Digest', sub: '5.5 × 8.5', trimId: '5.5x8.5', format: 'paperback' },
  { label: 'US Letter', sub: '8.5 × 11', trimId: '8.5x11', format: 'paperback' },
  { label: 'A4', sub: '8.27 × 11.69', trimId: '8.27x11.69', format: 'paperback' },
  { label: 'Pocket', sub: '5 × 8', trimId: '5x8', format: 'paperback' },
];

/* ============================================================================
 * Pure calculation helpers
 * ========================================================================== */

function getTrimsForFormat(format: Format): TrimSize[] {
  return format === 'paperback' ? PAPERBACK_TRIMS : HARDCOVER_TRIMS;
}

function findTrim(format: Format, trimId: string): TrimSize | undefined {
  return getTrimsForFormat(format).find((t) => t.id === trimId);
}

function getSpineMultiplier(ink: InkType, paper: PaperColor): number {
  if (ink === 'bw') {
    return paper === 'cream' ? SPINE_MULTIPLIERS.bwCream : SPINE_MULTIPLIERS.bwWhite;
  }
  if (ink === 'premium-color') return SPINE_MULTIPLIERS.premiumColor;
  return SPINE_MULTIPLIERS.standardColor;
}

function calcSpineWidth(pageCount: number, ink: InkType, paper: PaperColor): number {
  return pageCount * getSpineMultiplier(ink, paper);
}

function calcFullCoverDims(
  trim: TrimSize,
  spineWidth: number,
): { widthIn: number; heightIn: number } {
  return {
    widthIn: COVER_BLEED_IN + trim.widthIn + spineWidth + trim.widthIn + COVER_BLEED_IN,
    heightIn: COVER_BLEED_IN + trim.heightIn + COVER_BLEED_IN,
  };
}

function calcInteriorPageDims(
  trim: TrimSize,
  bleed: boolean,
): { widthIn: number; heightIn: number } {
  if (!bleed) return { widthIn: trim.widthIn, heightIn: trim.heightIn };
  return {
    widthIn: trim.widthIn + COVER_BLEED_IN,
    heightIn: trim.heightIn + COVER_BLEED_IN * 2,
  };
}

function getMarginSpec(pageCount: number): MarginRow {
  for (const row of MARGIN_TABLE) {
    if (pageCount >= row.minPages && pageCount <= row.maxPages) return row;
  }
  // Out of range — clamp to nearest row
  if (pageCount < MARGIN_TABLE[0].minPages) return MARGIN_TABLE[0];
  return MARGIN_TABLE[MARGIN_TABLE.length - 1];
}

function canHaveSpineText(pageCount: number): boolean {
  return pageCount >= SPINE_TEXT_MIN_PAGES;
}

function inToMm(inches: number): number {
  return inches * IN_TO_MM;
}

function inToPx(inches: number): number {
  return Math.round(inches * DPI);
}

function fmtLen(inches: number, unit: UnitSystem, precision = 3): string {
  if (unit === 'mm') {
    return `${inToMm(inches).toFixed(1)} mm`;
  }
  return `${inches.toFixed(precision)}"`;
}

function fmtLenPlain(inches: number, unit: UnitSystem, precision = 3): string {
  if (unit === 'mm') return inToMm(inches).toFixed(1);
  return inches.toFixed(precision);
}

function roundUpEven(n: number): number {
  const rounded = Math.ceil(n);
  return rounded % 2 === 0 ? rounded : rounded + 1;
}

function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n));
}

function isStandardColorAllowed(format: Format, trim: TrimSize): boolean {
  if (format === 'hardcover') return false;
  if (trim.id === '8.27x11.69') return false; // A4 has no standard color
  return true;
}

function getPageCountRange(
  format: Format,
  trim: TrimSize,
  ink: InkType,
  paper: PaperColor,
): PageCountRange | null {
  if (format === 'hardcover') {
    if (ink === 'standard-color') return null;
    return { min: 75, max: 550 };
  }

  // Paperback
  const id = trim.id;
  const isA4 = id === '8.27x11.69';
  const isLargeSquareOrLetter = id === '8.5x8.5' || id === '8.5x11';
  const is825 = id === '8.25x6' || id === '8.25x8.25';

  if (ink === 'standard-color') {
    if (isA4) return null;
    return { min: 72, max: 600 };
  }

  if (ink === 'premium-color') {
    if (isA4) return { min: 24, max: 590 };
    if (isLargeSquareOrLetter) return { min: 24, max: 590 };
    if (is825) return { min: 24, max: 800 };
    return { min: 24, max: 828 };
  }

  // Black & white
  const cream = paper === 'cream';
  if (isA4) return { min: 24, max: cream ? 730 : 780 };
  if (isLargeSquareOrLetter) return { min: 24, max: cream ? 550 : 590 };
  if (is825) return { min: 24, max: cream ? 750 : 800 };
  return { min: 24, max: cream ? 776 : 828 };
}

/* ============================================================================
 * Copy spec builder
 * ========================================================================== */

function buildSpecString(args: {
  format: Format;
  trim: TrimSize;
  pageCount: number;
  ink: InkType;
  paper: PaperColor;
  bleed: boolean;
  spineWidth: number;
  fullCover: { widthIn: number; heightIn: number };
  interior: { widthIn: number; heightIn: number };
  margin: MarginRow;
}): string {
  const {
    format,
    trim,
    pageCount,
    ink,
    paper,
    bleed,
    spineWidth,
    fullCover,
    interior,
    margin,
  } = args;

  const inkLabel =
    ink === 'bw' ? 'B&W' : ink === 'premium-color' ? 'Premium Color' : 'Standard Color';
  const paperLabel = ink === 'bw' ? `${paper === 'cream' ? 'Cream' : 'White'} paper` : 'White paper';
  const spineText = canHaveSpineText(pageCount) ? 'Yes (≥79 pages)' : 'No (<79 pages)';

  return [
    'KDP Book Specifications — LessonCraftStudio.com',
    `Format: ${format === 'paperback' ? 'Paperback' : 'Hardcover'}`,
    `Trim Size: ${trim.label}`,
    `Pages: ${pageCount} (${inkLabel}, ${paperLabel})`,
    `Bleed: ${bleed ? 'Yes' : 'No'}`,
    '',
    'COVER DIMENSIONS:',
    `  Spine Width: ${spineWidth.toFixed(3)}"`,
    `  Full Cover: ${fullCover.widthIn.toFixed(3)}" × ${fullCover.heightIn.toFixed(3)}"`,
    `  Front/Back Cover: ${trim.widthIn}" × ${trim.heightIn}"`,
    `  Cover Bleed: 0.125" on all outside edges`,
    `  Spine Text: ${spineText}`,
    '',
    'INTERIOR PAGE SIZE:',
    `  Page Size${bleed ? ' (with bleed)' : ''}: ${interior.widthIn.toFixed(3)}" × ${interior.heightIn.toFixed(3)}"`,
    '',
    'MARGINS:',
    `  Inside (Gutter): ${margin.gutterIn}"`,
    `  Outside${bleed ? ' (with bleed)' : ' (no bleed)'}: ${bleed ? margin.outsideBleedIn : margin.outsideNoBleedIn}" minimum`,
  ].join('\n');
}

/* ============================================================================
 * Cover diagram sub-component
 * ========================================================================== */

interface CoverDiagramProps {
  trim: TrimSize;
  spineWidth: number;
  fullCover: { widthIn: number; heightIn: number };
  pageCount: number;
  unit: UnitSystem;
  canHaveSpineText: boolean;
}

function CoverDiagram({
  trim,
  spineWidth,
  fullCover,
  pageCount,
  unit,
  canHaveSpineText,
}: CoverDiagramProps) {
  // All coordinates in 1/100 inch for a true-to-life aspect ratio.
  const W = fullCover.widthIn * 100;
  const H = fullCover.heightIn * 100;
  const BL = COVER_BLEED_IN * 100; // 12.5
  const SW = spineWidth * 100;
  const padTop = 70;
  const padBottom = 50;
  const padLeft = 50;
  const padRight = 90;

  const trimLeft = BL;
  const trimTop = BL;
  const trimRight = W - BL;
  const trimBottom = H - BL;

  const spineX = trimLeft + trim.widthIn * 100;
  const spineRight = spineX + SW;
  const barcodeW = 200;
  const barcodeH = 120;
  const barcodeX = spineX - barcodeW - 25;
  const barcodeY = trimBottom - barcodeH - 25;

  const spineSafeLeft = spineX + SPINE_TEXT_SAFE_IN * 100;
  const spineSafeRight = spineRight - SPINE_TEXT_SAFE_IN * 100;

  const viewBox = `${-padLeft} ${-padTop} ${W + padLeft + padRight} ${H + padTop + padBottom}`;
  const fontSize = 22;

  return (
    <figure
      role="img"
      aria-label={`KDP cover layout diagram for a ${trim.label} ${pageCount}-page book: full cover ${fullCover.widthIn.toFixed(3)} by ${fullCover.heightIn.toFixed(3)} inches, spine width ${spineWidth.toFixed(3)} inches, bleed 0.125 inches on all outside edges.`}
      className="w-full"
    >
      <svg
        viewBox={viewBox}
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        style={{ maxHeight: 520 }}
      >
        {/* Bleed zone (pink) */}
        <rect
          x={0}
          y={0}
          width={W}
          height={H}
          fill="#fce7f3"
          stroke="#f9a8d4"
          strokeWidth={2}
        />

        {/* Back cover */}
        <rect
          x={trimLeft}
          y={trimTop}
          width={trim.widthIn * 100}
          height={trim.heightIn * 100}
          fill="#ffffff"
          stroke="#94a3b8"
          strokeWidth={2}
        />

        {/* Spine */}
        <rect
          x={spineX}
          y={trimTop}
          width={SW}
          height={trim.heightIn * 100}
          fill={canHaveSpineText ? '#bfdbfe' : '#e0f2fe'}
          stroke="#60a5fa"
          strokeWidth={2}
        />

        {/* Spine safe-area dotted lines */}
        {canHaveSpineText && SW > 14 && (
          <>
            <line
              x1={spineSafeLeft}
              y1={trimTop + 10}
              x2={spineSafeLeft}
              y2={trimBottom - 10}
              stroke="#1d4ed8"
              strokeWidth={1.2}
              strokeDasharray="4 4"
            />
            <line
              x1={spineSafeRight}
              y1={trimTop + 10}
              x2={spineSafeRight}
              y2={trimBottom - 10}
              stroke="#1d4ed8"
              strokeWidth={1.2}
              strokeDasharray="4 4"
            />
          </>
        )}

        {/* Front cover */}
        <rect
          x={spineRight}
          y={trimTop}
          width={trim.widthIn * 100}
          height={trim.heightIn * 100}
          fill="#ffffff"
          stroke="#94a3b8"
          strokeWidth={2}
        />

        {/* Barcode zone on back cover */}
        <rect
          x={barcodeX}
          y={barcodeY}
          width={barcodeW}
          height={barcodeH}
          fill="#f1f5f9"
          stroke="#94a3b8"
          strokeWidth={1.5}
          strokeDasharray="3 3"
        />
        <text
          x={barcodeX + barcodeW / 2}
          y={barcodeY + barcodeH / 2 + 8}
          textAnchor="middle"
          fontSize={fontSize - 4}
          fill="#64748b"
          fontFamily="system-ui, sans-serif"
        >
          Barcode
        </text>

        {/* Labels — back, spine, front */}
        <text
          x={trimLeft + (trim.widthIn * 100) / 2}
          y={trimTop + (trim.heightIn * 100) / 2 - 40}
          textAnchor="middle"
          fontSize={fontSize + 6}
          fontWeight={600}
          fill="#0f172a"
          fontFamily="system-ui, sans-serif"
        >
          Back cover
        </text>
        <text
          x={trimLeft + (trim.widthIn * 100) / 2}
          y={trimTop + (trim.heightIn * 100) / 2 + 0}
          textAnchor="middle"
          fontSize={fontSize}
          fill="#475569"
          fontFamily="system-ui, sans-serif"
        >
          {trim.label}
        </text>

        <text
          x={spineRight + (trim.widthIn * 100) / 2}
          y={trimTop + (trim.heightIn * 100) / 2 - 40}
          textAnchor="middle"
          fontSize={fontSize + 6}
          fontWeight={600}
          fill="#0f172a"
          fontFamily="system-ui, sans-serif"
        >
          Front cover
        </text>
        <text
          x={spineRight + (trim.widthIn * 100) / 2}
          y={trimTop + (trim.heightIn * 100) / 2 + 0}
          textAnchor="middle"
          fontSize={fontSize}
          fill="#475569"
          fontFamily="system-ui, sans-serif"
        >
          {trim.label}
        </text>

        {/* Spine label — vertical text when wide enough, otherwise hidden */}
        {SW > 28 && (
          <text
            x={spineX + SW / 2}
            y={trimTop + (trim.heightIn * 100) / 2}
            textAnchor="middle"
            fontSize={fontSize - 2}
            fontWeight={600}
            fill="#1e40af"
            fontFamily="system-ui, sans-serif"
            transform={`rotate(-90, ${spineX + SW / 2}, ${trimTop + (trim.heightIn * 100) / 2})`}
          >
            Spine
          </text>
        )}

        {/* Full-width dimension label (top) */}
        <line
          x1={0}
          y1={-28}
          x2={W}
          y2={-28}
          stroke="#0f172a"
          strokeWidth={1.5}
        />
        <line x1={0} y1={-34} x2={0} y2={-22} stroke="#0f172a" strokeWidth={1.5} />
        <line x1={W} y1={-34} x2={W} y2={-22} stroke="#0f172a" strokeWidth={1.5} />
        <text
          x={W / 2}
          y={-40}
          textAnchor="middle"
          fontSize={fontSize}
          fontWeight={600}
          fill="#0f172a"
          fontFamily="system-ui, sans-serif"
        >
          Full cover: {fmtLen(fullCover.widthIn, unit)}
        </text>

        {/* Full-height dimension label (right) */}
        <line x1={W + 28} y1={0} x2={W + 28} y2={H} stroke="#0f172a" strokeWidth={1.5} />
        <line x1={W + 22} y1={0} x2={W + 34} y2={0} stroke="#0f172a" strokeWidth={1.5} />
        <line x1={W + 22} y1={H} x2={W + 34} y2={H} stroke="#0f172a" strokeWidth={1.5} />
        <text
          x={W + 50}
          y={H / 2}
          textAnchor="middle"
          fontSize={fontSize}
          fontWeight={600}
          fill="#0f172a"
          fontFamily="system-ui, sans-serif"
          transform={`rotate(90, ${W + 50}, ${H / 2})`}
        >
          {fmtLen(fullCover.heightIn, unit)}
        </text>

        {/* Spine-width callout (bottom) */}
        <line
          x1={spineX}
          y1={H + 20}
          x2={spineRight}
          y2={H + 20}
          stroke="#1d4ed8"
          strokeWidth={1.5}
        />
        <line x1={spineX} y1={H + 14} x2={spineX} y2={H + 26} stroke="#1d4ed8" strokeWidth={1.5} />
        <line x1={spineRight} y1={H + 14} x2={spineRight} y2={H + 26} stroke="#1d4ed8" strokeWidth={1.5} />
        <text
          x={(spineX + spineRight) / 2}
          y={H + 42}
          textAnchor="middle"
          fontSize={fontSize - 2}
          fontWeight={600}
          fill="#1d4ed8"
          fontFamily="system-ui, sans-serif"
        >
          Spine {fmtLen(spineWidth, unit)}
        </text>

        {/* Bleed legend */}
        <rect x={-padLeft + 8} y={H + padBottom - 18} width={14} height={10} fill="#fce7f3" stroke="#f9a8d4" />
        <text
          x={-padLeft + 26}
          y={H + padBottom - 8}
          fontSize={fontSize - 4}
          fill="#64748b"
          fontFamily="system-ui, sans-serif"
        >
          Bleed 0.125" on all outside edges
        </text>
      </svg>
      <figcaption className="sr-only">
        KDP cover layout for a {trim.label} {pageCount}-page book: full cover width{' '}
        {fullCover.widthIn.toFixed(3)} inches, full cover height {fullCover.heightIn.toFixed(3)}{' '}
        inches, spine width {spineWidth.toFixed(3)} inches, cover bleed 0.125 inches on all
        outside edges.
      </figcaption>
    </figure>
  );
}

/* ============================================================================
 * Interior page diagram sub-component
 * ========================================================================== */

interface InteriorDiagramProps {
  trim: TrimSize;
  bleed: boolean;
  margin: MarginRow;
  interior: { widthIn: number; heightIn: number };
  unit: UnitSystem;
}

function InteriorDiagram({ trim, bleed, margin, interior, unit }: InteriorDiagramProps) {
  const W = interior.widthIn * 100;
  const H = interior.heightIn * 100;
  const bleedIn = bleed ? COVER_BLEED_IN : 0;
  const bleedUnits = bleedIn * 100;
  const padTop = 60;
  const padBottom = 50;
  const padLeft = 60;
  const padRight = 60;

  // Trim edges inside the interior page (when bleed is on, the trim is inset)
  const trimLeft = 0; // inside/gutter edge is the page edge
  const trimTop = bleedUnits;
  const trimRight = W - bleedUnits;
  const trimBottom = H - bleedUnits;

  // Content safe zone inside margins
  const gutterUnits = margin.gutterIn * 100;
  const outsideUnits = (bleed ? margin.outsideBleedIn : margin.outsideNoBleedIn) * 100;
  const safeLeft = trimLeft + gutterUnits;
  const safeTop = trimTop + outsideUnits;
  const safeRight = trimRight - outsideUnits;
  const safeBottom = trimBottom - outsideUnits;

  const viewBox = `${-padLeft} ${-padTop} ${W + padLeft + padRight} ${H + padTop + padBottom}`;
  const fontSize = 22;

  return (
    <figure
      role="img"
      aria-label={`KDP interior page layout for a ${trim.label} book with ${bleed ? 'bleed' : 'no bleed'}, gutter margin ${margin.gutterIn.toFixed(3)} inches.`}
      className="w-full"
    >
      <svg
        viewBox={viewBox}
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        style={{ maxHeight: 460 }}
      >
        {/* Page background (includes bleed if any) */}
        <rect
          x={0}
          y={0}
          width={W}
          height={H}
          fill={bleed ? '#fce7f3' : '#ffffff'}
          stroke="#94a3b8"
          strokeWidth={2}
        />

        {/* Trim rectangle when bleed is on */}
        {bleed && (
          <rect
            x={trimLeft}
            y={trimTop}
            width={trimRight - trimLeft}
            height={trimBottom - trimTop}
            fill="#ffffff"
            stroke="#64748b"
            strokeDasharray="6 4"
            strokeWidth={1.5}
          />
        )}

        {/* Safe content zone */}
        <rect
          x={safeLeft}
          y={safeTop}
          width={Math.max(0, safeRight - safeLeft)}
          height={Math.max(0, safeBottom - safeTop)}
          fill="#ecfdf5"
          stroke="#10b981"
          strokeWidth={2}
        />
        <text
          x={(safeLeft + safeRight) / 2}
          y={(safeTop + safeBottom) / 2 - 6}
          textAnchor="middle"
          fontSize={fontSize + 4}
          fontWeight={600}
          fill="#065f46"
          fontFamily="system-ui, sans-serif"
        >
          Safe content area
        </text>
        <text
          x={(safeLeft + safeRight) / 2}
          y={(safeTop + safeBottom) / 2 + 20}
          textAnchor="middle"
          fontSize={fontSize - 2}
          fill="#047857"
          fontFamily="system-ui, sans-serif"
        >
          {trim.label}
        </text>

        {/* Gutter label (left edge) */}
        <text
          x={safeLeft / 2}
          y={(trimTop + trimBottom) / 2}
          textAnchor="middle"
          fontSize={fontSize - 4}
          fontWeight={600}
          fill="#1e40af"
          fontFamily="system-ui, sans-serif"
          transform={`rotate(-90, ${safeLeft / 2}, ${(trimTop + trimBottom) / 2})`}
        >
          Gutter {fmtLen(margin.gutterIn, unit)}
        </text>

        {/* Outside margin labels */}
        <text
          x={(safeRight + trimRight) / 2}
          y={(trimTop + trimBottom) / 2}
          textAnchor="middle"
          fontSize={fontSize - 4}
          fontWeight={600}
          fill="#475569"
          fontFamily="system-ui, sans-serif"
          transform={`rotate(90, ${(safeRight + trimRight) / 2}, ${(trimTop + trimBottom) / 2})`}
        >
          Outside {fmtLen(bleed ? margin.outsideBleedIn : margin.outsideNoBleedIn, unit)}
        </text>

        {/* Top & bottom margin labels */}
        <text
          x={(safeLeft + safeRight) / 2}
          y={(trimTop + safeTop) / 2 + 6}
          textAnchor="middle"
          fontSize={fontSize - 6}
          fill="#64748b"
          fontFamily="system-ui, sans-serif"
        >
          Top margin
        </text>
        <text
          x={(safeLeft + safeRight) / 2}
          y={(safeBottom + trimBottom) / 2 + 6}
          textAnchor="middle"
          fontSize={fontSize - 6}
          fill="#64748b"
          fontFamily="system-ui, sans-serif"
        >
          Bottom margin
        </text>

        {/* Width dimension label (top) */}
        <text
          x={W / 2}
          y={-28}
          textAnchor="middle"
          fontSize={fontSize}
          fontWeight={600}
          fill="#0f172a"
          fontFamily="system-ui, sans-serif"
        >
          Page width: {fmtLen(interior.widthIn, unit)}
        </text>

        {/* Height dimension label (right) */}
        <text
          x={W + 30}
          y={H / 2}
          textAnchor="middle"
          fontSize={fontSize}
          fontWeight={600}
          fill="#0f172a"
          fontFamily="system-ui, sans-serif"
          transform={`rotate(90, ${W + 30}, ${H / 2})`}
        >
          {fmtLen(interior.heightIn, unit)}
        </text>
      </svg>
      <figcaption className="sr-only">
        KDP interior page layout for a {trim.label} book with {bleed ? 'bleed enabled' : 'no bleed'}, gutter (inside) margin {margin.gutterIn.toFixed(3)} inches, outside margin{' '}
        {(bleed ? margin.outsideBleedIn : margin.outsideNoBleedIn).toFixed(3)} inches minimum.
      </figcaption>
    </figure>
  );
}

/* ============================================================================
 * Main component
 * ========================================================================== */

export default function KdpSizeCalculator() {
  const [format, setFormat] = useState<Format>('paperback');
  const [trimId, setTrimId] = useState<string>('6x9');
  const [pageCount, setPageCount] = useState<number>(120);
  const [inkType, setInkType] = useState<InkType>('bw');
  const [paperColor, setPaperColor] = useState<PaperColor>('white');
  const [bleed, setBleed] = useState<boolean>(false);
  const [unit, setUnit] = useState<UnitSystem>('in');
  const [copied, setCopied] = useState<boolean>(false);

  // Snap trim to something valid for the selected format
  useEffect(() => {
    const trims = getTrimsForFormat(format);
    if (!trims.find((t) => t.id === trimId)) {
      setTrimId(format === 'paperback' ? '6x9' : 'hc-6x9');
    }
  }, [format, trimId]);

  // When color ink is selected, force white paper
  useEffect(() => {
    if (inkType !== 'bw' && paperColor !== 'white') {
      setPaperColor('white');
    }
  }, [inkType, paperColor]);

  // Disallow standard color on hardcover / A4
  useEffect(() => {
    const trim = findTrim(format, trimId);
    if (!trim) return;
    if (inkType === 'standard-color' && !isStandardColorAllowed(format, trim)) {
      setInkType('bw');
    }
  }, [format, trimId, inkType]);

  const trim = useMemo<TrimSize>(() => {
    return (
      findTrim(format, trimId) ??
      (format === 'paperback' ? PAPERBACK_TRIMS[4] : HARDCOVER_TRIMS[1])
    );
  }, [format, trimId]);

  const range = useMemo<PageCountRange | null>(
    () => getPageCountRange(format, trim, inkType, paperColor),
    [format, trim, inkType, paperColor],
  );

  // Clamp page count into the active range (round up to even)
  useEffect(() => {
    if (!range) return;
    const clamped = clamp(pageCount, range.min, range.max);
    const even = clamped % 2 === 0 ? clamped : clamped + 1;
    const finalVal = clamp(even, range.min, range.max);
    if (finalVal !== pageCount) setPageCount(finalVal);
  }, [range, pageCount]);

  const combinationInvalid = range === null;

  const spineWidth = useMemo(
    () => calcSpineWidth(pageCount, inkType, paperColor),
    [pageCount, inkType, paperColor],
  );

  const fullCover = useMemo(() => calcFullCoverDims(trim, spineWidth), [trim, spineWidth]);
  const interior = useMemo(() => calcInteriorPageDims(trim, bleed), [trim, bleed]);
  const margin = useMemo(() => getMarginSpec(pageCount), [pageCount]);
  const spineTextAllowed = canHaveSpineText(pageCount);

  const whiteVsCream = useMemo(() => {
    if (inkType !== 'bw') return null;
    const white = pageCount * SPINE_MULTIPLIERS.bwWhite;
    const cream = pageCount * SPINE_MULTIPLIERS.bwCream;
    return { white, cream, diff: cream - white };
  }, [pageCount, inkType]);

  const specString = useMemo(
    () =>
      buildSpecString({
        format,
        trim,
        pageCount,
        ink: inkType,
        paper: paperColor,
        bleed,
        spineWidth,
        fullCover,
        interior,
        margin,
      }),
    [format, trim, pageCount, inkType, paperColor, bleed, spineWidth, fullCover, interior, margin],
  );

  const handlePageCountChange = useCallback(
    (value: string) => {
      const parsed = parseInt(value, 10);
      if (Number.isNaN(parsed)) return;
      if (!range) {
        setPageCount(parsed);
        return;
      }
      const clamped = clamp(parsed, range.min, range.max);
      setPageCount(clamped);
    },
    [range],
  );

  const stepPageCount = useCallback(
    (delta: number) => {
      if (!range) return;
      const next = clamp(pageCount + delta, range.min, range.max);
      setPageCount(next);
    },
    [pageCount, range],
  );

  const handlePreset = useCallback((preset: Preset) => {
    setFormat(preset.format);
    setTrimId(preset.trimId);
  }, []);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(specString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable — silently ignore
    }
  }, [specString]);

  const trims = getTrimsForFormat(format);
  const regularTrims = trims.filter((t) => t.group === 'regular');
  const largeTrims = trims.filter((t) => t.group === 'large');

  const isActivityBookSize = trim.id === '8.5x11' || trim.id === '8.27x11.69';

  /* --------------------------------------------------------------------------
   * Render
   * ------------------------------------------------------------------------ */

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900">
          KDP Cover &amp; Interior Size Calculator
          <span className="block text-lg sm:text-xl md:text-2xl font-semibold text-slate-600 mt-2">
            Spine Width, Dimensions &amp; Bleed
          </span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
          This free <strong>KDP cover size calculator</strong> computes exact cover dimensions,
          spine width, interior page size, and margin requirements for every Amazon KDP trim
          size — paperback and hardcover. Interactive diagram, official 2026 formulas, no signup.
        </p>
      </div>

      {/* Preset row + unit toggle */}
      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((preset) => {
            const active = preset.format === format && preset.trimId === trimId;
            return (
              <button
                key={preset.trimId}
                type="button"
                onClick={() => handlePreset(preset)}
                className={[
                  'rounded-full px-3.5 py-1.5 text-xs font-semibold ring-1 transition',
                  active
                    ? 'bg-primary text-white ring-primary shadow-sm'
                    : 'bg-white text-slate-700 ring-slate-200 hover:ring-primary/40',
                ].join(' ')}
              >
                <span>{preset.label}</span>
                <span className={active ? 'ml-1.5 text-white/80' : 'ml-1.5 text-slate-400'}>
                  {preset.sub}
                </span>
              </button>
            );
          })}
        </div>
        <div
          role="group"
          aria-label="Unit system"
          className="inline-flex rounded-lg bg-white ring-1 ring-slate-200 p-0.5"
        >
          {(['in', 'mm'] as UnitSystem[]).map((u) => {
            const active = unit === u;
            return (
              <button
                key={u}
                type="button"
                onClick={() => setUnit(u)}
                className={[
                  'px-3 py-1 text-xs font-semibold rounded-md transition',
                  active ? 'bg-primary text-white shadow-sm' : 'text-slate-600 hover:text-primary',
                ].join(' ')}
              >
                {u === 'in' ? 'Inches' : 'Millimeters'}
              </button>
            );
          })}
        </div>
      </div>

      {/* Two-column main area */}
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] gap-6">
        {/* ============ INPUTS CARD ============ */}
        <section
          aria-labelledby="size-inputs-heading"
          className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-200 p-6"
        >
          <h2
            id="size-inputs-heading"
            className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4"
          >
            Book Details
          </h2>

          {/* Format */}
          <fieldset className="mb-5">
            <legend className="block text-sm font-medium text-slate-700 mb-2">Book format</legend>
            <div className="grid grid-cols-2 gap-2">
              {(['paperback', 'hardcover'] as Format[]).map((f) => {
                const active = format === f;
                return (
                  <label
                    key={f}
                    className={[
                      'cursor-pointer text-center text-sm font-medium rounded-lg px-3 py-2 ring-1 transition',
                      active
                        ? 'bg-primary text-white ring-primary shadow-sm'
                        : 'bg-white text-slate-700 ring-slate-200 hover:ring-primary/40',
                    ].join(' ')}
                  >
                    <input
                      type="radio"
                      name="size-format"
                      className="sr-only"
                      value={f}
                      checked={active}
                      onChange={() => setFormat(f)}
                    />
                    {f === 'paperback' ? 'Paperback' : 'Hardcover'}
                  </label>
                );
              })}
            </div>
          </fieldset>

          {/* Trim size */}
          <div className="mb-5">
            <label htmlFor="size-trim" className="block text-sm font-medium text-slate-700 mb-2">
              Trim size
            </label>
            <select
              id="size-trim"
              value={trimId}
              onChange={(e) => setTrimId(e.target.value)}
              className="w-full rounded-lg ring-1 ring-slate-200 px-3 py-2 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <optgroup label="Regular trim sizes">
                {regularTrims.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.label} ({t.labelMetric}){t.note ? ` — ${t.note}` : ''}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Large trim sizes">
                {largeTrims.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.label} ({t.labelMetric}){t.note ? ` — ${t.note}` : ''}
                  </option>
                ))}
              </optgroup>
            </select>
          </div>

          {/* Page count */}
          <div className="mb-5">
            <label htmlFor="size-pages" className="block text-sm font-medium text-slate-700 mb-2">
              Page count
            </label>
            <div className="flex items-stretch rounded-lg ring-1 ring-slate-200 overflow-hidden focus-within:ring-2 focus-within:ring-primary">
              <button
                type="button"
                aria-label="Decrease page count by 2"
                onClick={() => stepPageCount(-2)}
                disabled={!range}
                className="w-10 bg-slate-50 hover:bg-slate-100 text-slate-600 text-lg font-semibold disabled:opacity-40"
              >
                −
              </button>
              <input
                id="size-pages"
                type="number"
                inputMode="numeric"
                min={range?.min}
                max={range?.max}
                step={2}
                value={pageCount}
                onChange={(e) => handlePageCountChange(e.target.value)}
                className="flex-1 text-center text-base font-semibold text-slate-900 focus:outline-none"
              />
              <button
                type="button"
                aria-label="Increase page count by 2"
                onClick={() => stepPageCount(2)}
                disabled={!range}
                className="w-10 bg-slate-50 hover:bg-slate-100 text-slate-600 text-lg font-semibold disabled:opacity-40"
              >
                +
              </button>
            </div>
            <p className="mt-1.5 text-xs text-slate-500">
              {range
                ? `Valid range: ${range.min}–${range.max} pages (even numbers only)`
                : 'This combination is not supported by KDP — change ink type or trim size.'}
            </p>
          </div>

          {/* Ink type */}
          <fieldset className="mb-5">
            <legend className="block text-sm font-medium text-slate-700 mb-2">Ink type</legend>
            <div className="grid grid-cols-3 gap-2">
              {(
                [
                  { value: 'bw', label: 'Black & White' },
                  { value: 'premium-color', label: 'Premium Color' },
                  { value: 'standard-color', label: 'Standard Color' },
                ] as Array<{ value: InkType; label: string }>
              ).map((opt) => {
                const active = inkType === opt.value;
                const disabled =
                  opt.value === 'standard-color' && !isStandardColorAllowed(format, trim);
                return (
                  <label
                    key={opt.value}
                    className={[
                      'cursor-pointer text-center text-xs sm:text-sm font-medium rounded-lg px-2 py-2 ring-1 transition',
                      active
                        ? 'bg-primary text-white ring-primary shadow-sm'
                        : 'bg-white text-slate-700 ring-slate-200 hover:ring-primary/40',
                      disabled ? 'opacity-40 cursor-not-allowed' : '',
                    ].join(' ')}
                    title={
                      disabled
                        ? format === 'hardcover'
                          ? 'Standard Color is not available for hardcover'
                          : 'Standard Color is not available for A4 (8.27" × 11.69")'
                        : undefined
                    }
                  >
                    <input
                      type="radio"
                      name="size-ink"
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
          </fieldset>

          {/* Paper color — only when B&W */}
          {inkType === 'bw' && (
            <fieldset className="mb-5">
              <legend className="block text-sm font-medium text-slate-700 mb-2">Paper color</legend>
              <div className="grid grid-cols-2 gap-2">
                {(['white', 'cream'] as PaperColor[]).map((p) => {
                  const active = paperColor === p;
                  return (
                    <label
                      key={p}
                      className={[
                        'cursor-pointer text-center text-sm font-medium rounded-lg px-3 py-2 ring-1 transition',
                        active
                          ? 'bg-primary text-white ring-primary shadow-sm'
                          : 'bg-white text-slate-700 ring-slate-200 hover:ring-primary/40',
                      ].join(' ')}
                    >
                      <input
                        type="radio"
                        name="size-paper"
                        className="sr-only"
                        value={p}
                        checked={active}
                        onChange={() => setPaperColor(p)}
                      />
                      {p === 'white' ? 'White' : 'Cream'}
                    </label>
                  );
                })}
              </div>
              <p className="mt-1.5 text-xs text-slate-500">
                Cream paper is thicker than white, producing a slightly wider spine.
              </p>
            </fieldset>
          )}

          {/* Interior bleed */}
          <fieldset>
            <legend className="text-sm font-medium text-slate-700 mb-2 inline-flex items-center gap-1.5">
              Interior bleed
              <span className="group relative inline-flex">
                <button
                  type="button"
                  aria-describedby="bleed-tooltip"
                  className="w-4 h-4 rounded-full bg-slate-200 text-slate-600 text-[10px] font-bold flex items-center justify-center hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  ?
                </button>
                <span
                  id="bleed-tooltip"
                  role="tooltip"
                  className="invisible group-hover:visible group-focus-within:visible absolute z-10 left-1/2 -translate-x-1/2 top-full mt-1 w-60 rounded-md bg-slate-900 px-3 py-2 text-xs font-normal text-white shadow-lg"
                >
                  Choose bleed if any images, backgrounds, or illustrations in your book extend to
                  the edge of the page.
                </span>
              </span>
            </legend>
            <div className="grid grid-cols-2 gap-2">
              {([false, true] as boolean[]).map((b) => {
                const active = bleed === b;
                return (
                  <label
                    key={String(b)}
                    className={[
                      'cursor-pointer text-center text-sm font-medium rounded-lg px-3 py-2 ring-1 transition',
                      active
                        ? 'bg-primary text-white ring-primary shadow-sm'
                        : 'bg-white text-slate-700 ring-slate-200 hover:ring-primary/40',
                    ].join(' ')}
                  >
                    <input
                      type="radio"
                      name="size-bleed"
                      className="sr-only"
                      value={String(b)}
                      checked={active}
                      onChange={() => setBleed(b)}
                    />
                    {b ? 'With Bleed' : 'No Bleed'}
                  </label>
                );
              })}
            </div>
          </fieldset>
        </section>

        {/* ============ RESULTS COLUMN ============ */}
        <section
          aria-labelledby="specifications-heading"
          aria-live="polite"
          className="space-y-6"
        >
          <h2
            id="specifications-heading"
            className="sr-only"
          >
            Your Cover Specifications
          </h2>
          {/* Card 1: Cover dimensions */}
          <div
            aria-labelledby="cover-dims-heading"
            className="bg-gradient-to-br from-primary-50 to-white rounded-2xl shadow-sm ring-1 ring-slate-200 p-6"
          >
            <h3
              id="cover-dims-heading"
              className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4"
            >
              Cover Dimensions
            </h3>

            {combinationInvalid ? (
              <div className="text-sm text-red-700 bg-red-50 ring-1 ring-red-200 rounded-lg p-4">
                This combination is not supported by KDP. Try a different ink type or trim size.
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-xs text-slate-500">Spine width</div>
                    <div className="text-2xl font-bold text-slate-900 mt-0.5 tabular-nums">
                      {fmtLen(spineWidth, unit)}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      {pageCount} pages × {getSpineMultiplier(inkType, paperColor).toFixed(6)}"
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">Full cover size</div>
                    <div className="text-2xl font-bold text-slate-900 mt-0.5 tabular-nums">
                      {fmtLenPlain(fullCover.widthIn, unit)} × {fmtLenPlain(fullCover.heightIn, unit)}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      {unit === 'in' ? 'inches' : 'millimeters'} (includes bleed)
                    </div>
                  </div>
                </div>

                <dl className="grid grid-cols-3 gap-3 text-xs mb-4 pt-3 border-t border-slate-200/60">
                  <div>
                    <dt className="text-slate-500">Front / back cover</dt>
                    <dd className="text-sm font-semibold text-slate-900 tabular-nums">
                      {fmtLenPlain(trim.widthIn, unit)} × {fmtLenPlain(trim.heightIn, unit)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-slate-500">Cover bleed</dt>
                    <dd className="text-sm font-semibold text-slate-900 tabular-nums">
                      {fmtLen(COVER_BLEED_IN, unit)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-slate-500">Spine safe area</dt>
                    <dd className="text-sm font-semibold text-slate-900 tabular-nums">
                      {fmtLen(SPINE_TEXT_SAFE_IN, unit)}
                    </dd>
                  </div>
                </dl>

                <div
                  className={[
                    'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1',
                    spineTextAllowed
                      ? 'bg-emerald-50 text-emerald-700 ring-emerald-200'
                      : 'bg-amber-50 text-amber-700 ring-amber-200',
                  ].join(' ')}
                >
                  {spineTextAllowed ? '✓ Spine text allowed' : '✗ Spine text not allowed'}
                  <span className="font-normal text-slate-500">
                    {spineTextAllowed
                      ? `(${pageCount} ≥ 79 pages)`
                      : `(minimum 79 pages, yours is ${pageCount})`}
                  </span>
                </div>

                {format === 'hardcover' && (
                  <p className="mt-3 text-xs text-slate-600 leading-relaxed bg-amber-50 ring-1 ring-amber-200 rounded-lg p-3">
                    <strong>Hardcover note:</strong> the spine width above is the interior block
                    thickness. Hardcover covers wrap around the case with additional flap allowances,
                    so we recommend using{' '}
                    <a
                      href="https://kdp.amazon.com/cover-calculator"
                      target="_blank"
                      rel="nofollow noopener"
                      className="underline font-semibold"
                    >
                      KDP&apos;s official Cover Calculator
                    </a>{' '}
                    to generate the final hardcover wrap template.
                  </p>
                )}

                <button
                  type="button"
                  onClick={handleCopy}
                  className="mt-4 w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold px-4 py-2.5 transition"
                >
                  {copied ? (
                    <>
                      <span aria-hidden="true">✓</span> Copied to clipboard
                    </>
                  ) : (
                    <>
                      <span aria-hidden="true">📋</span> Copy full specifications
                    </>
                  )}
                </button>
              </>
            )}
          </div>

          {/* Card 2: Interior page size */}
          <div
            aria-labelledby="interior-heading"
            className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-200 p-6"
          >
            <h3
              id="interior-heading"
              className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4"
            >
              Interior Page Size
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-slate-500">
                  Page size {bleed ? '(with bleed)' : '(no bleed)'}
                </div>
                <div className="text-2xl font-bold text-slate-900 mt-0.5 tabular-nums">
                  {fmtLenPlain(interior.widthIn, unit)} × {fmtLenPlain(interior.heightIn, unit)}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  {unit === 'in' ? 'inches' : 'millimeters'}
                </div>
              </div>
              <div>
                <div className="text-xs text-slate-500">Trim size</div>
                <div className="text-2xl font-bold text-slate-900 mt-0.5 tabular-nums">
                  {fmtLenPlain(trim.widthIn, unit)} × {fmtLenPlain(trim.heightIn, unit)}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  {trim.group === 'regular' ? 'Regular trim' : 'Large trim'}
                </div>
              </div>
            </div>
            {bleed && (
              <p className="mt-3 text-xs text-slate-500 leading-relaxed">
                Bleed adds 0.125" to the outside edge (width) and 0.125" to the top &amp; bottom
                (height). The inside / gutter edge has <strong>no bleed</strong>.
              </p>
            )}
          </div>

          {/* Card 3: Margins */}
          <div
            aria-labelledby="margins-heading"
            className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-200 p-6"
          >
            <h3
              id="margins-heading"
              className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4"
            >
              Interior Margins
            </h3>
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div>
                <div className="text-[11px] text-slate-500">Inside (gutter)</div>
                <div className="text-lg font-bold text-slate-900 tabular-nums">
                  {fmtLen(margin.gutterIn, unit)}
                </div>
              </div>
              <div>
                <div className="text-[11px] text-slate-500">Outside (no bleed)</div>
                <div
                  className={
                    bleed
                      ? 'text-lg font-bold text-slate-400 tabular-nums'
                      : 'text-lg font-bold text-slate-900 tabular-nums'
                  }
                >
                  ≥ {fmtLen(margin.outsideNoBleedIn, unit)}
                </div>
              </div>
              <div>
                <div className="text-[11px] text-slate-500">Outside (with bleed)</div>
                <div
                  className={
                    bleed
                      ? 'text-lg font-bold text-slate-900 tabular-nums'
                      : 'text-lg font-bold text-slate-400 tabular-nums'
                  }
                >
                  ≥ {fmtLen(margin.outsideBleedIn, unit)}
                </div>
              </div>
            </div>

            <table className="w-full text-xs border-t border-slate-200">
              <thead>
                <tr className="text-left text-slate-500">
                  <th className="py-1.5 pr-2 font-medium">Pages</th>
                  <th className="py-1.5 pr-2 font-medium">Gutter</th>
                  <th className="py-1.5 pr-2 font-medium">Outside (no bleed)</th>
                  <th className="py-1.5 font-medium">Outside (bleed)</th>
                </tr>
              </thead>
              <tbody>
                {MARGIN_TABLE.map((row) => {
                  const active = pageCount >= row.minPages && pageCount <= row.maxPages;
                  return (
                    <tr
                      key={row.minPages}
                      className={
                        active
                          ? 'bg-primary-50 font-semibold text-slate-900'
                          : 'text-slate-600 border-t border-slate-100'
                      }
                    >
                      <td className="py-1.5 pr-2 tabular-nums">
                        {row.minPages}–{row.maxPages}
                      </td>
                      <td className="py-1.5 pr-2 tabular-nums">{fmtLen(row.gutterIn, unit)}</td>
                      <td className="py-1.5 pr-2 tabular-nums">≥ {fmtLen(row.outsideNoBleedIn, unit)}</td>
                      <td className="py-1.5 tabular-nums">≥ {fmtLen(row.outsideBleedIn, unit)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {/* ============ COVER LAYOUT DIAGRAM ============ */}
      {!combinationInvalid && (
        <section
          aria-labelledby="cover-diagram-heading"
          className="mt-8 bg-white rounded-2xl shadow-sm ring-1 ring-slate-200 p-6"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2
                id="cover-diagram-heading"
                className="font-display text-xl sm:text-2xl font-bold text-slate-900"
              >
                KDP Cover Layout Diagram
              </h2>
              <p className="text-sm text-slate-500 mt-0.5">
                Proportional preview — the spine scales automatically with your page count.
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-3 text-[11px] text-slate-500">
              <span className="inline-flex items-center gap-1">
                <span className="inline-block w-3 h-3 rounded-sm bg-[#fce7f3] ring-1 ring-[#f9a8d4]" />
                Bleed
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="inline-block w-3 h-3 rounded-sm bg-[#bfdbfe] ring-1 ring-[#60a5fa]" />
                Spine
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="inline-block w-3 h-3 rounded-sm bg-white ring-1 ring-slate-400" />
                Cover
              </span>
            </div>
          </div>
          <CoverDiagram
            trim={trim}
            spineWidth={spineWidth}
            fullCover={fullCover}
            pageCount={pageCount}
            unit={unit}
            canHaveSpineText={spineTextAllowed}
          />
        </section>
      )}

      {/* ============ INTERIOR PAGE DIAGRAM ============ */}
      {!combinationInvalid && (
        <section
          aria-labelledby="interior-diagram-heading"
          className="mt-6 bg-white rounded-2xl shadow-sm ring-1 ring-slate-200 p-6"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2
                id="interior-diagram-heading"
                className="font-display text-xl sm:text-2xl font-bold text-slate-900"
              >
                KDP Interior Page Layout
              </h2>
              <p className="text-sm text-slate-500 mt-0.5">
                Shows gutter, outside margins, and the safe content area.
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-3 text-[11px] text-slate-500">
              <span className="inline-flex items-center gap-1">
                <span className="inline-block w-3 h-3 rounded-sm bg-[#ecfdf5] ring-1 ring-[#10b981]" />
                Safe area
              </span>
              {bleed && (
                <span className="inline-flex items-center gap-1">
                  <span className="inline-block w-3 h-3 rounded-sm bg-[#fce7f3] ring-1 ring-[#f9a8d4]" />
                  Bleed
                </span>
              )}
            </div>
          </div>
          <InteriorDiagram
            trim={trim}
            bleed={bleed}
            margin={margin}
            interior={interior}
            unit={unit}
          />
        </section>
      )}

      {/* ============ WHITE VS CREAM COMPARISON ============ */}
      {whiteVsCream && !combinationInvalid && (
        <section
          aria-labelledby="white-cream-heading"
          className="mt-6 bg-white rounded-2xl shadow-sm ring-1 ring-slate-200 p-6"
        >
          <h2
            id="white-cream-heading"
            className="font-display text-xl sm:text-2xl font-bold text-slate-900"
          >
            White Paper vs Cream Paper Spine Comparison
          </h2>
          <p className="text-sm text-slate-500 mt-1 mb-4">
            Same page count ({pageCount}), different paper thickness. Cream is slightly thicker,
            so it produces a measurably wider spine on the same book.
          </p>
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-lg bg-slate-50 p-4">
              <div className="text-[11px] text-slate-500 uppercase font-semibold tracking-wider">
                White paper
              </div>
              <div className="mt-1 text-2xl font-bold text-slate-900 tabular-nums">
                {fmtLen(whiteVsCream.white, unit)}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                × 0.002252" per page
              </div>
            </div>
            <div className="rounded-lg bg-amber-50 p-4">
              <div className="text-[11px] text-amber-700 uppercase font-semibold tracking-wider">
                Cream paper
              </div>
              <div className="mt-1 text-2xl font-bold text-slate-900 tabular-nums">
                {fmtLen(whiteVsCream.cream, unit)}
              </div>
              <div className="text-[11px] text-amber-700 mt-0.5">
                × 0.0025" per page
              </div>
            </div>
            <div className="rounded-lg bg-primary-50 p-4">
              <div className="text-[11px] text-primary uppercase font-semibold tracking-wider">
                Difference
              </div>
              <div className="mt-1 text-2xl font-bold text-primary tabular-nums">
                +{fmtLen(whiteVsCream.diff, unit)}
              </div>
              <div className="text-[11px] text-primary/80 mt-0.5">Cream is thicker</div>
            </div>
          </div>
        </section>
      )}

      {/* ============ PIXEL DIMENSIONS ============ */}
      {!combinationInvalid && (
        <section
          aria-labelledby="pixel-dims-heading"
          className="mt-6 bg-white rounded-2xl shadow-sm ring-1 ring-slate-200 p-6"
        >
          <h2
            id="pixel-dims-heading"
            className="font-display text-xl sm:text-2xl font-bold text-slate-900"
          >
            Cover Dimensions in Pixels (300 DPI)
          </h2>
          <p className="text-sm text-slate-500 mt-1 mb-4">
            For designers working in Photoshop, Canva, or Affinity — 300 DPI is KDP&apos;s minimum
            for print covers. Multiply any inch dimension by 300 to get the pixel count.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-slate-500 border-b border-slate-200">
                  <th className="py-2 pr-4 font-medium">Element</th>
                  <th className="py-2 pr-4 font-medium">Inches</th>
                  <th className="py-2 pr-4 font-medium">Millimeters</th>
                  <th className="py-2 font-medium">Pixels @ 300 DPI</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-2 pr-4 font-semibold text-slate-900">Full cover</td>
                  <td className="py-2 pr-4 text-slate-700 tabular-nums">
                    {fullCover.widthIn.toFixed(3)}" × {fullCover.heightIn.toFixed(3)}"
                  </td>
                  <td className="py-2 pr-4 text-slate-700 tabular-nums">
                    {inToMm(fullCover.widthIn).toFixed(1)} × {inToMm(fullCover.heightIn).toFixed(1)} mm
                  </td>
                  <td className="py-2 text-slate-900 font-semibold tabular-nums">
                    {inToPx(fullCover.widthIn)} × {inToPx(fullCover.heightIn)} px
                  </td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-semibold text-slate-900">Front cover</td>
                  <td className="py-2 pr-4 text-slate-700 tabular-nums">
                    {trim.widthIn}" × {trim.heightIn}"
                  </td>
                  <td className="py-2 pr-4 text-slate-700 tabular-nums">
                    {trim.widthMm} × {trim.heightMm} mm
                  </td>
                  <td className="py-2 text-slate-900 font-semibold tabular-nums">
                    {inToPx(trim.widthIn)} × {inToPx(trim.heightIn)} px
                  </td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-semibold text-slate-900">Back cover</td>
                  <td className="py-2 pr-4 text-slate-700 tabular-nums">
                    {trim.widthIn}" × {trim.heightIn}"
                  </td>
                  <td className="py-2 pr-4 text-slate-700 tabular-nums">
                    {trim.widthMm} × {trim.heightMm} mm
                  </td>
                  <td className="py-2 text-slate-900 font-semibold tabular-nums">
                    {inToPx(trim.widthIn)} × {inToPx(trim.heightIn)} px
                  </td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-semibold text-slate-900">Spine</td>
                  <td className="py-2 pr-4 text-slate-700 tabular-nums">
                    {spineWidth.toFixed(3)}" × {trim.heightIn}"
                  </td>
                  <td className="py-2 pr-4 text-slate-700 tabular-nums">
                    {inToMm(spineWidth).toFixed(1)} × {trim.heightMm} mm
                  </td>
                  <td className="py-2 text-slate-900 font-semibold tabular-nums">
                    {inToPx(spineWidth)} × {inToPx(trim.heightIn)} px
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* ============ ACTIVITY BOOK MONETIZATION BRIDGE ============ */}
      {isActivityBookSize && !combinationInvalid && (
        <section className="mt-6 rounded-2xl bg-gradient-to-r from-amber-50 to-white ring-1 ring-amber-200 p-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5">
            <div className="text-2xl" aria-hidden="true">
              📚
            </div>
            <div className="flex-1 text-sm text-slate-700 leading-relaxed">
              <strong className="text-slate-900">
                {trim.label} is one of the most popular sizes for activity books, workbooks, and
                coloring books on Amazon KDP.
              </strong>{' '}
              Need professional interior pages? Create math worksheets, word searches, coloring
              pages, and 30+ other activity types in minutes — free trial with watermark, no signup
              required.
            </div>
            <a
              href="/en/apps"
              className="inline-flex items-center gap-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold px-4 py-2.5 whitespace-nowrap transition"
            >
              Try free generators →
            </a>
          </div>
        </section>
      )}
    </div>
  );
}
