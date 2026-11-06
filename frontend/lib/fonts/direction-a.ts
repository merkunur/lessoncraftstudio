/*
 * The house fonts, loaded once. next/font fetches Google's CSS once per call site at build time, and Google now and then
 * answers with /l/font?kit= URLs that next/font cannot read (measured 2026-11-06: about 1 reply in 30, which failed two
 * deploys). One module instead of one call per page keeps those fetches few. The wide set is in direction-a-wide.ts: a
 * page that imports this file preloads these faces, so the two sets stay in separate modules.
 */
import { Baloo_2, Nunito } from 'next/font/google';

export const baloo2 = Baloo_2({
  weight: ['600', '700'],
  subsets: ['latin', 'latin-ext'],
  variable: '--font-baloo-2',
  display: 'swap',
  preload: true,
});

export const nunito = Nunito({
  weight: ['400', '600', '700'],
  subsets: ['latin', 'latin-ext'],
  variable: '--font-nunito',
  display: 'swap',
  preload: true,
});
