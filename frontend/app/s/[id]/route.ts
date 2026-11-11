import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getLink, LINK_ID_RE } from '@/lib/makers/link-store';
import * as ssr from '../../../../scripts/makers/play/ssr.js';
import { classResultsEnabled } from '@/lib/class-results/http';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/**
 * GET /s/[id] — a worksheet maker's STUDENT link (INTERACTIVE-AND-SHARING §C.6 / §C.9; task 2 of the ten).
 *
 * One Postgres read (the link store), then the static play shell with its <head> filled for THIS link — title, Open
 * Graph / Twitter card (what Classroom, Teams, WhatsApp unfurl), <html lang>, robots — and the site chrome of the
 * recipe's language (brand, the four site sections, 11 language links with hreflang, the footer): the links a crawler
 * following a pasted student link from a public page finds are all INDEXABLE pages; the student page itself never is.
 *
 * Headers, non-negotiable (§C.2):
 *  - X-Robots-Tag: noindex   (+ the meta in the body; never indexifembedded, never nofollow: the chrome links must flow)
 *  - Cache-Control: public, max-age=0, s-maxage=300  (Cloudflare serves the viral case; a revoke propagates ≤ 5 min)
 * No canonical, no hreflang, no JSON-LD. The middleware matcher carves `s/` out (frontend/middleware.ts), so the intl
 * middleware never rewrites this URL into the locale tree.
 *
 * Files: the play tree built by scripts/makers/build-play.js (MAKERS_PLAY_DIR/<current>/: index.html, strings.json,
 * landings.json, chrome/<loc>.json) and the maker tree (MAKERS_DIR/<maker>/<version>/templates.json + strings.<loc>.json
 * + thumbs) — the same reads scripts/makers/play/link-page.js does for the local preview. The HTML is produced by the
 * shared pure module scripts/makers/play/ssr.js, so the local page and the live page are the same bytes.
 */

const PLAY_DIR = process.env.MAKERS_PLAY_DIR || '/var/www/lcs-media/makers/play';
const MAKERS_DIR = process.env.MAKERS_DIR || '/var/www/lcs-media/makers';
const ORIGIN = 'https://www.lessoncraftstudio.com';
const LOCALES = new Set(['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi']);

const HEADERS: Record<string, string> = {
  'Content-Type': 'text/html; charset=utf-8',
  'X-Robots-Tag': 'noindex',
  'Cache-Control': 'public, max-age=0, s-maxage=300',
  'X-Content-Type-Options': 'nosniff',
};

const cache = new Map<string, unknown>();
function readJson<T>(file: string): T | null {
  if (!cache.has(file)) {
    try { cache.set(file, JSON.parse(fs.readFileSync(file, 'utf8'))); } catch { cache.set(file, null); }
  }
  return cache.get(file) as T | null;
}
function readText(file: string): string | null {
  if (!cache.has(file)) {
    try { cache.set(file, fs.readFileSync(file, 'utf8')); } catch { cache.set(file, null); }
  }
  return cache.get(file) as string | null;
}

/** the play tree version the site serves (play/current.txt) */
function playTree(): { dir: string; base: string } | null {
  const cur = readText(path.join(PLAY_DIR, 'current.txt'));
  if (!cur) return null;
  const v = cur.trim();
  return { dir: path.join(PLAY_DIR, v), base: `/makers/play/${v}` };
}

type Strings = Record<string, Record<string, Record<string, string>>>;

function notFound(lang: string): NextResponse {
  const tree = playTree();
  const strings = tree ? readJson<Strings>(path.join(tree.dir, 'strings.json')) : null;
  const w = strings ? ssr.playStrings(strings, lang) : { notFoundTitle: 'This worksheet link does not exist.', notFoundBody: 'Please ask your teacher for a new link.' };
  return new NextResponse(ssr.miniPage({ lang, title: w.notFoundTitle, lines: [w.notFoundBody] }), { status: 404, headers: HEADERS });
}

export async function GET(_request: NextRequest, { params }: { params: { id: string } }) {
  const linkId = params.id;
  if (!LINK_ID_RE.test(linkId)) return notFound('en');
  const link = await getLink(linkId);
  if (!link) return notFound('en');
  const recipe = link.recipe;
  const lang = LOCALES.has(recipe.lang) ? recipe.lang : 'en';
  const tree = playTree();
  if (!tree) { console.error('play tree missing: ' + PLAY_DIR); return notFound(lang); }
  const template = readText(path.join(tree.dir, 'index.html'));
  const strings = readJson<Strings>(path.join(tree.dir, 'strings.json'));
  const landings = readJson<Record<string, Record<string, { url: string; name: string }>>>(path.join(tree.dir, 'landings.json')) || {};
  const chrome = readJson<{ css: string; header: string; footer: string }>(path.join(tree.dir, 'chrome', lang + '.json')) || { css: '', header: '', footer: '' };
  const ui = readJson<{ makers?: Record<string, string>; level?: string }>(path.join(process.cwd(), 'messages', 'makers', lang + '.json')) || {};
  if (!template || !strings) { console.error('play tree incomplete: ' + tree.dir); return notFound(lang); }

  // the card: the maker's name, the first page's template title / level / theme, its sample thumbnail in this language
  const first = recipe.pages && recipe.pages[0] ? recipe.pages[0] : { template: '', level: 2, theme: null };
  const pinned = /^[a-f0-9]{6,20}$/.test(String(recipe.makerVersion)) ? path.join(MAKERS_DIR, recipe.maker, recipe.makerVersion) : '';
  let vdir = pinned && fs.existsSync(path.join(pinned, 'templates.json')) ? pinned : '';
  let version = vdir ? recipe.makerVersion : '';
  if (!vdir) { const cur = readText(path.join(MAKERS_DIR, recipe.maker, 'current.txt')); if (cur) { version = cur.trim(); vdir = path.join(MAKERS_DIR, recipe.maker, version); } }
  const tj = vdir ? readJson<{ themeNames?: Record<string, Record<string, string>> }>(path.join(vdir, 'templates.json')) : null;
  const st = vdir ? readJson<Record<string, { title?: string; printTitle?: string }>>(path.join(vdir, 'strings.' + lang + '.json')) : null;
  const tpl = st && st[first.template];
  const makerName = (ui.makers && ui.makers[recipe.maker]) || recipe.maker;
  const themeName = first.theme && tj && tj.themeNames && tj.themeNames[lang] ? (tj.themeNames[lang][first.theme] || first.theme) : (first.theme || null);
  const thumb = vdir && first.template && fs.existsSync(path.join(vdir, 'thumbs', lang, first.template + '.webp')) ? `/makers/${recipe.maker}/${version}/thumbs/${lang}/${first.template}.webp` : null;
  const head = ssr.headFor({ linkId, lang, title: link.title || recipe.title, makerName, templateTitle: tpl ? (tpl.printTitle || tpl.title || null) : null, level: first.level, levelWord: ui.level ? ui.level + ' {n}' : null, themeName, thumbUrl: thumb, origin: ORIGIN });
  const landing = (landings[recipe.maker] && landings[recipe.maker][lang]) || { url: `/${lang}/tools`, name: makerName };
  const words = ssr.playStrings(strings, lang);
  const html = ssr.renderPlayHtml({
    template, base: tree.base, lang, head, chrome,
    // class links (Part 9): one line that loads the class reporter only for a visit that carries a class token
    classLoader: classResultsEnabled(),
    bar: { title: head.title, landingUrl: ORIGIN + landing.url, homeUrl: `${ORIGIN}/${lang}/`, makeYourOwn: words.makeYourOwn, madeWith: words.madeWith },
  });
  return new NextResponse(html, { status: 200, headers: HEADERS });
}
