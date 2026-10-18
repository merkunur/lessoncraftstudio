/**
 * HubTopBar — the worksheets hub's top bar (2026-10-18 redesign): subject tabs
 * on the left, the Interactive switch on the right.
 *
 * Why a top bar: the operator compared the hub with education.com, which keeps
 * its long-list facets SHORT by moving the broadest axis out of the rail. The
 * subject is that axis here — five subjects that used to be five discs at the
 * top of a ~140-row type list. As tabs they cost one line, and choosing one
 * shortens the rail to that subject's types.
 *
 * The format (All / Interactive) is a mode, not a filter, so it is a single
 * switch rather than a second row of tabs. Server-rendered, anchor-only: every
 * tab and the switch are plain <a href>, crawlable and working without JS.
 */

export interface HubTabVM {
  key: string;
  label: string;
  href: string;
  count?: number;
  active: boolean;
}

export default function HubTopBar({
  ariaLabel,
  tabs,
  interactive,
}: {
  ariaLabel: string;
  tabs: HubTabVM[];
  interactive: { label: string; href: string; on: boolean };
}) {
  return (
    <div className="flex flex-col-reverse gap-2 sm:flex-row sm:items-end sm:justify-between sm:gap-6 border-b border-lcs-teal/15 mb-6">
      <nav aria-label={ariaLabel} className="min-w-0 -mx-3 px-3 sm:mx-0 sm:px-0 overflow-x-auto snap-x [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [mask-image:linear-gradient(90deg,#000_82%,transparent)] sm:[mask-image:none]">
        <ul className="flex gap-1 sm:gap-2 whitespace-nowrap pr-10 sm:pr-0">
          {tabs.map((t) => (
            <li key={t.key} className="snap-start">
              <a
                href={t.href}
                aria-current={t.active ? 'page' : undefined}
                className={`inline-flex items-center gap-1.5 min-h-[44px] px-2.5 sm:px-3 -mb-px border-b-[3px] font-lcsDisplay text-[0.98rem] md:text-[1.04rem] leading-none transition-colors ${
                  t.active
                    ? 'border-lcs-coral text-lcs-teal font-bold'
                    : 'border-transparent text-lcs-teal/60 hover:text-lcs-teal hover:border-lcs-teal/25 font-semibold'
                }`}
              >
                {t.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <a
        href={interactive.href}
        role="switch"
        aria-checked={interactive.on}
        className="self-start sm:self-auto sm:mb-2 inline-flex items-center gap-2.5 min-h-[44px] lg:min-h-0 font-lcsBody text-sm font-semibold text-lcs-teal whitespace-nowrap"
      >
        <span
          aria-hidden="true"
          className={`relative inline-block w-9 h-5 rounded-full transition-colors ${interactive.on ? 'bg-lcs-teal' : 'bg-lcs-teal/20'}`}
        >
          <span
            className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-[left] ${interactive.on ? 'left-[18px]' : 'left-0.5'}`}
          />
        </span>
        {interactive.label}
      </a>
    </div>
  );
}
