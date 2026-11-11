/** Types for scripts/makers/play/ssr.js (the student play page, server side) — used by frontend/app/s/[id]/route.ts. */
export interface PlayHead {
  lang: string;
  url: string;
  title: string;
  description: string;
  image: string | null;
  imageAlt: string;
  siteName: string;
}
export interface PlayChrome {
  css: string;
  header: string;
  footer: string;
}
export interface PlayBar {
  title: string;
  landingUrl: string;
  homeUrl: string;
  makeYourOwn: string;
  madeWith: string;
}
export function renderPlayHtml(o: { template: string; base: string; lang: string; head: PlayHead; chrome: PlayChrome; bar: PlayBar; classLoader?: boolean }): string;
export const CLASS_LOADER: string;
export function headFor(o: {
  linkId: string;
  lang: string;
  title: string;
  makerName?: string | null;
  templateTitle?: string | null;
  level?: number | null;
  levelWord?: string | null;
  themeName?: string | null;
  thumbUrl?: string | null;
  origin?: string;
}): PlayHead;
export function headTags(h: PlayHead): string;
export function barHtml(b: PlayBar): string;
export function miniPage(o: { lang: string; title: string; lines: string[]; lastIsTeacher?: boolean }): string;
export function playStrings(all: Record<string, Record<string, Record<string, string>>>, lang: string): Record<string, string>;
export function fill(template: string, parts: Record<string, string>): string;
export const MARKERS: string[];
export const LOCALES: string[];
export const CANONICAL_BASE: string;
export const SITE: string;
