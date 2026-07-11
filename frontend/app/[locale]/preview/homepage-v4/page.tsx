/* Homepage v4 — PREVIEW route (noindex via layout.tsx).
   The live homepage at /<locale>/ is UNTOUCHED and stays byte-identical
   until the operator approves promotion (single import-swap commit in
   app/[locale]/page.tsx; rollback = revert it).

   12-section stack (Workstream 3):
     HeroV4 (magnitude chips + real locale links + embed micro-CTA)
     → TryItBandV4 (9-cell playable breadth band, §18.4.2 selection)
     → Tier 1 pillars (Activities → Interactive → Printables, unchanged v3)
     → TierTransition → PillarMakers → PillarTools (unchanged v3)
     → BrowseByTopicSSR EXPANDED (32 themes + grade group + 11 languages —
       parameterized; live defaults untouched)
     → FreeAndTeacherV4 (renders only when PRICING_PUBLIC)
     → EmbedShareV3 (unchanged v3)
     → SignupV4 (favorites re-copy; Teacher link launch-gated).

   i18n: new strings live in the homepageV4 namespace, EN-first in
   messages/en.json only. frontend/i18n/request.ts deep-merges the EN
   baseline into every locale, so all 11 locales render this preview
   without raw-key leaks (non-EN shows EN values pending the ×10
   native-ensemble fan-out commission). */

import HeroV4 from '@/components/homepage-v4/HeroV4';
import TryItBandV4 from '@/components/homepage-v4/TryItBandV4';
import PillarActivities from '@/components/homepage-v3/PillarActivities';
import PillarInteractive from '@/components/homepage-v3/PillarInteractive';
import PillarPrintables from '@/components/homepage-v3/PillarPrintables';
import TierTransition from '@/components/homepage-v3/TierTransition';
import PillarMakers from '@/components/homepage-v3/PillarMakers';
import PillarTools from '@/components/homepage-v3/PillarTools';
import BrowseByTopicSSR from '@/components/homepage-v3/BrowseByTopicSSR';
import FreeAndTeacherV4 from '@/components/homepage-v4/FreeAndTeacherV4';
import EmbedShareV3 from '@/components/homepage-v3/EmbedShareV3';
import SignupV4 from '@/components/homepage-v4/SignupV4';

interface PageProps {
  params: Promise<{ locale: string }>;
}

// ISR window — same as the live homepage.
export const revalidate = 3600;

export default async function HomepageV4Page({ params }: PageProps) {
  const { locale } = await params;

  return (
    <main className="hv3">
      <HeroV4 locale={locale} />
      <TryItBandV4 locale={locale} />
      <PillarActivities locale={locale} />
      <PillarInteractive locale={locale} />
      <PillarPrintables locale={locale} />
      <TierTransition locale={locale} />
      <PillarMakers locale={locale} />
      <PillarTools locale={locale} />
      <BrowseByTopicSSR
        locale={locale}
        maxThemesPerGroup={32}
        includeGradeGroup
        includeLanguageGroup
      />
      <FreeAndTeacherV4 locale={locale} />
      <EmbedShareV3 locale={locale} />
      <SignupV4 locale={locale} />
    </main>
  );
}
