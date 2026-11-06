/* The house fonts with the full weight range, for the pages that have always used it. See direction-a.ts. */
import { Baloo_2, Nunito } from 'next/font/google';

export const baloo2 = Baloo_2({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin', 'latin-ext'],
  variable: '--font-baloo-2',
  display: 'swap',
});

export const nunito = Nunito({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin', 'latin-ext'],
  variable: '--font-nunito',
  display: 'swap',
});
