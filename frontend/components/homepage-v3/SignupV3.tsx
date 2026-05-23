/* Closing sign-up CTA — light, inclusive, no pressure.
   Free framing. Acknowledges that signup is optional (resources are free
   to play without an account per CLAUDE.md §7). */

import Link from 'next/link';

interface Props {
  locale: string;
}

export default function SignupV3({ locale }: Props) {
  return (
    <section className="bg-lcs-teal py-20 md:py-28 relative overflow-hidden">
      {/* Decorative diagonal accent */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-1/3 h-full opacity-20"
        style={{
          background: 'linear-gradient(135deg, transparent 40%, #F2784B 40%, #F2784B 42%, transparent 42%)',
        }}
      />

      <div className="container mx-auto px-4 max-w-4xl text-center relative">
        <p className="hv3-eyebrow" style={{ color: '#FBE3D8' }}>
          <span style={{ background: '#F2784B' }} className="!w-6 !h-0.5 inline-block" />
          Free
        </p>
        <h2 className="mt-4 font-lcsDisplay font-bold text-lcs-cream leading-[1.05] tracking-tight text-[2rem] md:text-[3rem] lg:text-[3.5rem]">
          No signup needed.<br />
          <span className="text-lcs-coral-soft">Make one if you want to save things.</span>
        </h2>
        <p className="mt-7 font-lcsBody text-lg md:text-xl text-lcs-cream/85 leading-relaxed max-w-2xl mx-auto">
          Every activity, worksheet, and tool on this site is free to use without
          an account. An account just lets you keep favorites, build collections,
          and embed your own decks.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={`/${locale}/activities/count-to-10-with-animals/`}
            className="inline-flex items-center justify-center font-lcsDisplay font-semibold text-lg px-7 py-3.5 rounded-2xl bg-lcs-coral text-lcs-cream hover:bg-lcs-coral-deep transition-colors shadow-[0_8px_20px_-4px_rgba(242,120,75,0.5)]"
          >
            Start an activity
          </Link>
          <Link
            href={`/${locale}/auth/signup`}
            className="inline-flex items-center justify-center font-lcsDisplay font-semibold text-lg px-7 py-3 rounded-2xl border-2 border-lcs-cream text-lcs-cream hover:bg-lcs-cream hover:text-lcs-teal transition-colors"
          >
            Make an account
          </Link>
        </div>
      </div>
    </section>
  );
}
