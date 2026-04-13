import Link from 'next/link';

const freeTools = [
  {
    name: 'KDP Royalty Calculator',
    description: 'Calculate printing costs and royalties',
    href: '/en/tools/kdp-royalty-calculator',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25v-.008Zm2.25-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008v-.008Zm2.25-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V18ZM4.5 4.5h15A1.5 1.5 0 0 1 21 6v12a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 18V6a1.5 1.5 0 0 1 1.5-1.5Z" />
      </svg>
    ),
  },
  {
    name: 'KDP Cover Size Calculator',
    description: 'Get exact cover dimensions',
    href: '/en/tools/kdp-size-calculator',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v12.75c0 .621.504 1.125 1.125 1.125Z" />
      </svg>
    ),
  },
  {
    name: 'Activity Book Planner',
    description: 'Plan your book layout',
    href: '/en/tools/activity-book-planner',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15a2.25 2.25 0 0 1 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
      </svg>
    ),
  },
  {
    name: 'Printable Niche Finder',
    description: 'Discover profitable niches',
    href: '/en/tools/niche-finder',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
      </svg>
    ),
  },
  {
    name: 'Profit Hub',
    description: 'Compare platform fees',
    href: '/en/tools/profit-hub',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
      </svg>
    ),
  },
];

const localeContent: Record<string, { heading: string; intro: string; cta: string }> = {
  en: {
    heading: 'Free Tools for Your Printable Business',
    intro: 'Plan, research, and calculate before you create. These tools are 100% free — no signup, no watermark, no catch.',
    cta: 'View all free tools',
  },
  de: {
    heading: 'Kostenlose Tools fur Ihr Printable-Business',
    intro: 'Planen, recherchieren und kalkulieren Sie, bevor Sie erstellen. Diese Tools sind 100% kostenlos — keine Anmeldung, kein Wasserzeichen.',
    cta: 'Alle kostenlosen Tools ansehen',
  },
  fr: {
    heading: 'Outils gratuits pour votre business de printables',
    intro: 'Planifiez, recherchez et calculez avant de creer. Ces outils sont 100% gratuits — sans inscription, sans filigrane.',
    cta: 'Voir tous les outils gratuits',
  },
  es: {
    heading: 'Herramientas gratuitas para tu negocio de imprimibles',
    intro: 'Planifica, investiga y calcula antes de crear. Estas herramientas son 100% gratuitas — sin registro, sin marca de agua.',
    cta: 'Ver todas las herramientas gratuitas',
  },
  pt: {
    heading: 'Ferramentas gratuitas para seu negocio de printables',
    intro: 'Planeje, pesquise e calcule antes de criar. Estas ferramentas sao 100% gratuitas — sem cadastro, sem marca d\'agua.',
    cta: 'Ver todas as ferramentas gratuitas',
  },
  it: {
    heading: 'Strumenti gratuiti per il tuo business di stampabili',
    intro: 'Pianifica, ricerca e calcola prima di creare. Questi strumenti sono 100% gratuiti — senza registrazione, senza filigrana.',
    cta: 'Vedi tutti gli strumenti gratuiti',
  },
  nl: {
    heading: 'Gratis tools voor uw printable-business',
    intro: 'Plan, onderzoek en bereken voordat u maakt. Deze tools zijn 100% gratis — geen registratie, geen watermerk.',
    cta: 'Bekijk alle gratis tools',
  },
  sv: {
    heading: 'Gratisverktyg for ditt printable-foretag',
    intro: 'Planera, undersok och berakna innan du skapar. Dessa verktyg ar 100% gratis — ingen registrering, ingen vattenstampel.',
    cta: 'Visa alla gratisverktyg',
  },
  da: {
    heading: 'Gratis vaerktojer til din printable-virksomhed',
    intro: 'Planlg, undersog og beregn for du opretter. Disse vaerktojer er 100% gratis — ingen registrering, intet vandmaerke.',
    cta: 'Se alle gratis vaerktojer',
  },
  no: {
    heading: 'Gratisverktoy for din printable-virksomhet',
    intro: 'Planlegg, undersok og beregn for du lager. Disse verktoyene er 100% gratis — ingen registrering, ikke vannmerke.',
    cta: 'Se alle gratisverktoy',
  },
  fi: {
    heading: 'Ilmaiset tyokalut tulostettavien liiketoiminnallesi',
    intro: 'Suunnittele, tutki ja laske ennen kuin luot. Nama tyokalut ovat 100% ilmaisia — ei rekisteroitymista, ei vesileimaa.',
    cta: 'Nayta kaikki ilmaiset tyokalut',
  },
};

export default function FreeToolsSection({ locale }: { locale: string }) {
  const t = localeContent[locale] || localeContent.en;

  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            {t.heading}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t.intro}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {freeTools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group flex items-start gap-4 p-4 bg-white border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-sm transition-all"
            >
              <div className="flex-shrink-0 text-indigo-600 mt-0.5">
                {tool.icon}
              </div>
              <div className="min-w-0">
                <div className="text-sm font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                  {tool.name}
                </div>
                <div className="text-xs text-gray-500 mt-0.5">
                  {tool.description}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link
            href={`/${locale}/tools`}
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            {t.cta} &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
