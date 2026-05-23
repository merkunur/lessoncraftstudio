/* Closing sign-up CTA — light, inclusive, no pressure.
   Free framing. Acknowledges that signup is optional (resources are free
   to play without an account per CLAUDE.md §7). */

import Link from 'next/link';
import MascotPlaceholder from './MascotPlaceholder';
import { Sparkle } from './DoodleAccents';

interface Props {
  locale: string;
}

export default function SignupV3({ locale }: Props) {
  return (
    <section className="hv3-section-coral-deep py-24 md:py-32 relative overflow-hidden">
      {/* Decorative diagonal accent — cream stripe on the deep coral */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-1/3 h-full opacity-22"
        style={{
          background: 'linear-gradient(135deg, transparent 40%, #FBF3E4 40%, #FBF3E4 42%, transparent 42%)',
        }}
      />
      {/* Atmosphere — soft cream halo behind the mascot. */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 right-[10%] w-[420px] h-[420px] rounded-full pointer-events-none -translate-y-1/2"
        style={{ background: 'radial-gradient(circle, rgba(251,243,228,0.18) 0%, transparent 65%)' }}
      />

      <div className="container mx-auto px-4 max-w-5xl relative">
        {/* Mascot — waving / welcoming on the right at desktop, top on phone.
            Positioned on teal ground so silhouette uses cream-tone fill for
            contrast against the dark teal. Marks "this is where the
            character waves you off / welcomes you in." */}
        <div
          aria-hidden="true"
          className="hidden md:block absolute right-2 lg:right-8 top-1/2 -translate-y-1/2 z-10 pointer-events-none w-[280px] lg:w-[340px]"
        >
          <MascotPlaceholder
            size="signup"
            poseHint="emphasizing"
            alt="Friendly elephant mascot waving you in"
          />
        </div>

        <div className="text-center md:text-left md:max-w-2xl">
        <p className="hv3-eyebrow inline-flex items-center" style={{ color: '#FBE3D8' }}>
          <span style={{ background: '#F2784B' }} className="!w-6 !h-0.5 inline-block" />
          Free
          <Sparkle className="text-lcs-coral ml-2" size={16} rotate={20} />
        </p>
        <h2 className="mt-4 font-lcsDisplay font-bold text-lcs-cream leading-[1.05] tracking-tight text-[2rem] md:text-[3rem] lg:text-[3.5rem]">
          No signup needed.<br />
          <span className="text-lcs-coral-soft">Make one if you want to save things.</span>
        </h2>
        <p className="mt-7 font-lcsBody text-lg md:text-xl text-lcs-cream/85 leading-relaxed max-w-2xl mx-auto md:mx-0">
          Every activity, worksheet, and tool on this site is free to use without
          an account. An account just lets you keep favorites, build collections,
          and embed your own decks.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
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
      </div>
    </section>
  );
}
