import { NextRequest, NextResponse } from 'next/server';
import { productPageSlugs } from '@/config/product-page-slugs';
import { toolPageSlugs } from '@/config/tool-page-slugs';
import { bundlePageSlugs } from '@/config/bundle-page-slugs';
import { startPageSlugs } from '@/config/start-page-slugs';
import { guidePageSlugs } from '@/config/guide-page-slugs';
import { ideaPageSlugs } from '@/config/idea-page-slugs';
import { SUPPORTED_LOCALES } from '@/config/locales';
import { getAppContent } from '@/config/app-content';
import { getToolContent } from '@/config/tool-content';
import { getBundleContent } from '@/config/bundle-content';
import { getStartContent } from '@/config/start-content';
import { getGuideContent } from '@/config/guide-content';
import { getIdeaContent } from '@/config/idea-content';

const baseUrl = 'https://www.lessoncraftstudio.com';
const allLocales = [...SUPPORTED_LOCALES];

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function buildVideoXml(youtubeId: string, videoTitle: string, description: string): string {
  return `    <video:video>
      <video:thumbnail_loc>https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg</video:thumbnail_loc>
      <video:title>${escapeXml(videoTitle)}</video:title>
      <video:description>${escapeXml(description)}</video:description>
      <video:content_loc>https://www.youtube.com/watch?v=${youtubeId}</video:content_loc>
      <video:player_loc>https://www.youtube-nocookie.com/embed/${youtubeId}</video:player_loc>
      <video:family_friendly>yes</video:family_friendly>
    </video:video>`;
}

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id, 10);
  const urlEntries: string[] = [];

  // ID 1: App detail pages
  if (id === 1) {
    for (const app of productPageSlugs) {
      for (const locale of allLocales) {
        const slug = app.slugs[locale as keyof typeof app.slugs];
        if (!slug) continue;
        const content = await getAppContent(app.appId, locale);
        if (!content?.visuals?.youtubeId) continue;
        const desc = content.seo?.metaDescription || content.hero?.description || '';
        urlEntries.push(
          `  <url>\n    <loc>${baseUrl}/${locale}/apps/${slug}</loc>\n${buildVideoXml(content.visuals.youtubeId, content.visuals.videoTitle, desc)}\n  </url>`
        );
      }
    }
  }

  // ID 3: Tool pages
  if (id === 3) {
    for (const tool of toolPageSlugs) {
      for (const locale of allLocales) {
        const slug = tool.slugs[locale as keyof typeof tool.slugs];
        if (!slug) continue;
        const content = await getToolContent(tool.toolId, locale);
        if (!content?.visuals?.youtubeId) continue;
        const desc = content.seo?.metaDescription || content.hero?.description || '';
        urlEntries.push(
          `  <url>\n    <loc>${baseUrl}/${locale}/tools/${slug}</loc>\n${buildVideoXml(content.visuals.youtubeId, content.visuals.videoTitle, desc)}\n  </url>`
        );
      }
    }
  }

  // ID 4: Bundle pages
  if (id === 4) {
    for (const bundle of bundlePageSlugs) {
      for (const locale of allLocales) {
        const slug = bundle.slugs[locale as keyof typeof bundle.slugs];
        if (!slug) continue;
        const content = await getBundleContent(bundle.bundleId, locale);
        if (!content?.visuals?.youtubeId) continue;
        const desc = content.seo?.metaDescription || content.hero?.description || '';
        urlEntries.push(
          `  <url>\n    <loc>${baseUrl}/${locale}/bundles/${slug}</loc>\n${buildVideoXml(content.visuals.youtubeId, content.visuals.videoTitle || content.hero.title, desc)}\n  </url>`
        );
      }
    }
  }

  // ID 5: Start pages
  if (id === 5) {
    for (const start of startPageSlugs) {
      for (const locale of allLocales) {
        const slug = start.slugs[locale as keyof typeof start.slugs];
        if (!slug) continue;
        const content = await getStartContent(start.startId, locale);
        if (!content?.visuals?.youtubeId) continue;
        const desc = content.seo?.metaDescription || content.hero?.description || '';
        urlEntries.push(
          `  <url>\n    <loc>${baseUrl}/${locale}/start/${slug}</loc>\n${buildVideoXml(content.visuals.youtubeId, content.visuals.videoTitle, desc)}\n  </url>`
        );
      }
    }
  }

  // ID 6: Guide pages
  if (id === 6) {
    for (const guide of guidePageSlugs) {
      for (const locale of allLocales) {
        const slug = guide.slugs[locale as keyof typeof guide.slugs];
        if (!slug) continue;
        const content = await getGuideContent(guide.guideId, locale);
        if (!content?.visuals?.youtubeId) continue;
        const desc = content.seo?.metaDescription || content.hero?.description || '';
        urlEntries.push(
          `  <url>\n    <loc>${baseUrl}/${locale}/guides/${slug}</loc>\n${buildVideoXml(content.visuals.youtubeId, content.visuals.videoTitle || content.hero.title, desc)}\n  </url>`
        );
      }
    }
  }

  // ID 7: Idea pages (youtubeId is top-level, not inside visuals)
  if (id === 7) {
    for (const idea of ideaPageSlugs) {
      for (const locale of allLocales) {
        const slug = idea.slugs[locale as keyof typeof idea.slugs];
        if (!slug) continue;
        const content = await getIdeaContent(idea.ideaId, locale);
        if (!content?.youtubeId) continue;
        const desc = content.seo?.metaDescription || content.hero?.description || '';
        urlEntries.push(
          `  <url>\n    <loc>${baseUrl}/${locale}/ideas/${slug}</loc>\n${buildVideoXml(content.youtubeId, content.videoTitle || content.hero.title, desc)}\n  </url>`
        );
      }
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${urlEntries.join('\n')}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
