/* SERVER COMPONENT — the header nav's sr-only crawl mesh.
 *
 * Measured on /en/pricing: the category row was 225 DOM nodes and 94 links, all
 * inside a Client Component, so React hydrated every one of them on every page
 * of the site. Only 7 of those nodes are interactive (the category buttons).
 * The 94 links are a static crawl mesh — the header-nav topic mesh that ships in
 * raw HTML precisely because the popover is gated on `isOpen` and renders
 * nothing server-side (§A.13.50).
 *
 * So the mesh is built here, on the server, and handed to CategoryNav as
 * `meshSlots`. React does not hydrate elements it receives as props, so the HTML
 * is byte-identical and in the same position while costing no main-thread time.
 *
 * ⚠ This must stay in step with CategoryNav's dropdown set: it calls the SAME
 * buildCategories() with the SAME inputs, so the two cannot diverge by
 * construction. Guarded by scripts/audit-nav-link-parity.js.
 */
import Link from 'next/link';
import { buildCategories, type ToolLabel, type AxisLabelMap } from '@/lib/category-nav-data';
import { getTranslations } from 'next-intl/server';

export async function buildCategoryMeshSlots(input: {
  locale: string;
  availableExerciseTypes?: string[];
  availableActivities?: Array<{ id: string; slug: string; title: string; code: string }>;
  availableThemes?: string[];
  availableTargets?: Array<{ iso: string; slug: string; name: string; count: number }>;
  toolSlugs?: Record<string, string>;
  toolLabels?: ToolLabel[];
  axisLabels?: AxisLabelMap;
  makerSlugs?: Record<string, string>;
}): Promise<Record<string, React.ReactNode>> {
  const t = await getTranslations({ locale: input.locale, namespace: 'nav.categories' });
  const dropdowns = buildCategories({ ...input, t: (k: string) => t(k) });
  const out: Record<string, React.ReactNode> = {};
  for (const d of dropdowns) {
    out[d.key] = (
      <ul className="sr-only">
        {d.items.map((item) => (
          <li key={item.href}>
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
        <li>
          <Link href={d.browseAllHref}>{d.browseAllLabel}</Link>
        </li>
      </ul>
    );
  }
  return out;
}
