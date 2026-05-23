/* Homepage v3 — instruments-led prototype (Phase 2 build).
   PROTOTYPE on a preview route. The live homepage at /<locale>/ is
   UNTOUCHED and stays byte-identical until the operator approves this.

   Structure (operator-locked):
     Hero → Tier 1 (Activities → Interactive worksheets → Printables)
          → Tier transition ("And if you're the one teaching…")
          → Tier 2 (Worksheet makers → Tools)
          → Embed/share acquisition CTA
          → Sign-up close (free, inclusive)

   Locale: EN-only for the prototype. Other locales render the same EN
   copy via this same route — the route resolves but the strings are
   hardcoded in the components for prototype clarity. Native-language
   copy is a later commission. */

import HeroV3 from '@/components/homepage-v3/HeroV3';
import PillarActivities from '@/components/homepage-v3/PillarActivities';
import PillarInteractive from '@/components/homepage-v3/PillarInteractive';
import PillarPrintables from '@/components/homepage-v3/PillarPrintables';
import TierTransition from '@/components/homepage-v3/TierTransition';
import PillarMakers from '@/components/homepage-v3/PillarMakers';
import PillarTools from '@/components/homepage-v3/PillarTools';
import EmbedShareV3 from '@/components/homepage-v3/EmbedShareV3';
import SignupV3 from '@/components/homepage-v3/SignupV3';

interface PageProps {
  params: Promise<{ locale: string }>;
}

// ISR window — same as the live homepage.
export const revalidate = 3600;

export default async function HomepageV3Page({ params }: PageProps) {
  const { locale } = await params;

  return (
    <main className="hv3">
      <HeroV3 locale={locale} />
      <PillarActivities locale={locale} />
      <PillarInteractive locale={locale} />
      <PillarPrintables locale={locale} />
      <TierTransition />
      <PillarMakers locale={locale} />
      <PillarTools locale={locale} />
      <EmbedShareV3 locale={locale} />
      <SignupV3 locale={locale} />
    </main>
  );
}
