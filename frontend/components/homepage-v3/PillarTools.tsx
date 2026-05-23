/* Pillar 5 — Tools. Tier 2, the smallest pillar. Operator: keep it MODEST,
   no big "toolkit" framing — it's a small set, present it honestly.
   Three tools, each with a tiny icon-mark, short description, link.
   Compact 3-column row on desktop; stacked on mobile. */

import Link from 'next/link';

interface PillarToolsProps {
  locale: string;
}

const TOOLS = [
  {
    name: 'Ten-frame',
    desc: 'The five-and-ten grid for counting, subitizing, and early addition.',
    href: '/mini-tools/ten-frame.html',
    icon: (
      <svg viewBox="0 0 60 30" className="w-12 h-6">
        {/* Ten-frame: 2 rows × 5 cells, first row 3 filled */}
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={`r1-${i}`}>
            <rect x={2 + i * 11} y={2} width={9} height={11} fill="none" stroke="currentColor" strokeWidth="1" />
            {i < 3 && <circle cx={6.5 + i * 11} cy={7.5} r={3} fill="currentColor" />}
          </g>
        ))}
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={`r2-${i}`} x={2 + i * 11} y={15} width={9} height={11} fill="none" stroke="currentColor" strokeWidth="1" />
        ))}
      </svg>
    ),
  },
  {
    name: 'Number line',
    desc: 'A clean number line for skip-counting, jumps, and place value.',
    href: '/mini-tools/number-line.html',
    icon: (
      <svg viewBox="0 0 60 30" className="w-12 h-6">
        <line x1="3" y1="15" x2="57" y2="15" stroke="currentColor" strokeWidth="1.5" />
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <g key={i}>
            <line x1={5 + i * 7.5} y1={10} x2={5 + i * 7.5} y2={20} stroke="currentColor" strokeWidth="1" />
            <text x={5 + i * 7.5} y={28} textAnchor="middle" fontSize="6" fill="currentColor" fontFamily="monospace">{i}</text>
          </g>
        ))}
      </svg>
    ),
  },
  {
    name: 'Ruler',
    desc: 'A virtual ruler — measure on screen, project on the whiteboard.',
    href: '/mini-tools/ruler.html',
    icon: (
      <svg viewBox="0 0 60 30" className="w-12 h-6">
        <rect x="3" y="10" width="54" height="10" fill="none" stroke="currentColor" strokeWidth="1.2" rx="1" />
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => {
          const x = 4 + i * 5.4;
          const tall = i % 2 === 0;
          return <line key={i} x1={x} y1={10} x2={x} y2={tall ? 16 : 13} stroke="currentColor" strokeWidth="1" />;
        })}
      </svg>
    ),
  },
];

export default function PillarTools({ locale: _locale }: PillarToolsProps) {
  return (
    <section id="tools" className="relative overflow-hidden bg-lcs-sage pb-20 md:pb-28">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="max-w-2xl mb-10 md:mb-12">
          <div className="flex items-center gap-4 mb-3">
            <span className="hv3-pillar-num" style={{ color: 'rgba(20, 107, 94, 0.2)' }}>05</span>
            <span className="hv3-eyebrow">Tools</span>
          </div>
          <h2 className="font-lcsDisplay font-bold text-lcs-teal leading-[1.1] tracking-tight text-[1.875rem] sm:text-[2.25rem] md:text-[2.5rem]">
            The classics,<br />
            <span className="text-lcs-teal-deep">redrawn for the browser.</span>
          </h2>
          <p className="mt-5 font-lcsBody text-base md:text-lg text-lcs-teal/85 leading-relaxed">
            A small set of classroom math manipulatives — touch-first,
            whiteboard-friendly, embeddable anywhere. Free, no signup.
          </p>
        </div>

        {/* 3-column row of tools */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
          {TOOLS.map((tool) => (
            <a
              key={tool.name}
              href={tool.href}
              className="hv3-card p-6 md:p-7 group hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="text-lcs-teal mb-4">
                {tool.icon}
              </div>
              <h3 className="font-lcsDisplay font-bold text-xl text-lcs-teal mb-2">{tool.name}</h3>
              <p className="font-lcsBody text-sm text-lcs-teal/75 leading-relaxed">{tool.desc}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 font-lcsBody text-xs font-bold text-lcs-coral-deep uppercase tracking-wider group-hover:gap-2.5 transition-all">
                Open
                <svg className="w-3 h-3" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 10h10M11 5l5 5-5 5" />
                </svg>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
