/**
 * VisualShowcaseEmbed — Server component that embeds standalone HTML visual files
 * from "visuals to enrich the pages/" into page layouts.
 *
 * Each visual is a 1000x1000px standalone HTML document with inline styles,
 * Google Fonts, and /samples/ image references. This component reads them at
 * build time, extracts the body content + font links, and passes them to
 * a client component for responsive scaling.
 */

import fs from 'fs';
import path from 'path';
import { VisualScaler } from './VisualScaler';

interface VisualShowcaseEmbedProps {
  /** Path relative to "visuals to enrich the pages/", e.g. "addition/001.html" */
  file: string;
}

export function VisualShowcaseEmbed({ file }: VisualShowcaseEmbedProps) {
  const filePath = path.join(process.cwd(), '..', 'visuals to enrich the pages', file);

  let html: string;
  try {
    html = fs.readFileSync(filePath, 'utf8');
  } catch {
    return null;
  }

  // Extract <style> blocks from head
  const styleBlocks: string[] = [];
  const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/gi;
  let styleMatch;
  while ((styleMatch = styleRegex.exec(html)) !== null) {
    styleBlocks.push(styleMatch[0]);
  }

  // Extract Google Font link(s) from head
  const fontLinks: string[] = [];
  const fontRegex = /<link[^>]*fonts\.googleapis\.com[^>]*>/gi;
  let fontMatch;
  while ((fontMatch = fontRegex.exec(html)) !== null) {
    fontLinks.push(fontMatch[0]);
  }

  // Extract body inner content
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  const bodyHtml = bodyMatch ? bodyMatch[1] : '';

  if (!bodyHtml.trim()) return null;

  // Combine font links + style blocks + body content
  const embeddedHtml = fontLinks.join('\n') + '\n' + styleBlocks.join('\n') + '\n' + bodyHtml;

  return (
    <div className="w-full max-w-3xl mx-auto my-8">
      <VisualScaler html={embeddedHtml} />
    </div>
  );
}
