/**
 * The old landings' SMART LINK (ARCHITECTURE §13; operator 2026-10-31: the 33 old `/<loc>/tools/<slug>` landings are
 * never deleted, re-slugged, redirected, noindexed or rewritten — only their launch button changes). The launch button
 * opens the new maker ON THE TEMPLATE THAT DOES WHAT THE OLD APP DID, in the landing's language:
 *
 *     /makers/app/?maker=<id>&lang=<loc>&t=<template>
 *
 * - which maker and template: `smart-links.json` (generated from scripts/makers/topic-map.js oldApps / oldAppTemplates
 *   by scripts/makers/build-smart-links.js — a committed file, so the website never imports the build scripts;
 *   the registration gate fails when it drifts from topic-map.js)
 * - only once the maker is RELEASED on this server (released.ts reads the served tree): until the release every old
 *   landing keeps launching its old app, and a deploy that happens to carry this code changes nothing on the live site
 * - where the template is refused in that language, the landing opens the maker's gallery (no `t=`)
 *
 * Returns null = keep the old generator URL (frontend/lib/seo/maker-content.ts makerGeneratorUrl).
 */
import links from './smart-links.json';
import { isReleased, templateOffered } from './released';

interface SmartLink { maker: string; template: string | null }
const LINKS = (links as { links: Record<string, SmartLink> }).links;

/** the new maker that replaced an old app (the old landing links to its landing and shows its worksheets) */
export function smartMaker(oldAppKey: string): string | null {
  return LINKS[oldAppKey]?.maker ?? null;
}

/** the new maker's launch URL for an old app's landing in this locale, or null while the maker is not released */
export function smartLaunchUrl(oldAppKey: string, locale: string): string | null {
  const l = LINKS[oldAppKey];
  if (!l || !isReleased(l.maker) || !/^[a-z]{2}$/.test(locale)) return null;
  const q = new URLSearchParams({ maker: l.maker, lang: locale });
  if (l.template && templateOffered(l.maker, l.template, locale)) q.set('t', l.template);
  return `/makers/app/?${q.toString()}`;
}

/** pure: the URL the smart link WOULD produce, given the release facts (the registration gate and tests use it) */
export function smartLaunchUrlGiven(oldAppKey: string, locale: string, released: (maker: string) => boolean, offered: (maker: string, template: string, locale: string) => boolean): string | null {
  const l = LINKS[oldAppKey];
  if (!l || !released(l.maker)) return null;
  const q = new URLSearchParams({ maker: l.maker, lang: locale });
  if (l.template && offered(l.maker, l.template, locale)) q.set('t', l.template);
  return `/makers/app/?${q.toString()}`;
}
