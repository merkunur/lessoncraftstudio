'use client';

interface ResearchBackingItem {
  claim: string;
  source: string;
}

interface ResearchBackingProps {
  items: ResearchBackingItem[];
}

export default function ResearchBacking({ items }: ResearchBackingProps) {
  if (!items || items.length === 0) return null;

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-2">Research-Backed Approach</h2>
        <p className="text-gray-500 text-center mb-8 text-sm">Our methodology is grounded in educational research</p>
        <div className="grid gap-6 md:grid-cols-2">
          {items.map((item, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3 mb-3">
                <div className="flex-shrink-0 w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                  </svg>
                </div>
                <p className="text-gray-800 text-sm sm:text-base leading-relaxed flex-1">{item.claim}</p>
              </div>
              <p className="text-xs text-gray-400 italic pl-11">{item.source}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
