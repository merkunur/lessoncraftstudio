'use client';

interface ComparisonRow {
  feature: string;
  ourApp: string;
  typical: string;
}

interface ComparisonTableProps {
  rows: ComparisonRow[];
}

export default function ComparisonTable({ rows }: ComparisonTableProps) {
  if (!rows || rows.length === 0) return null;

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-2">How We Compare</h2>
        <p className="text-gray-500 text-center mb-8 text-sm">See how our generator stacks up against typical alternatives</p>
        <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm bg-white">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-4 px-5 text-sm font-semibold text-gray-600 uppercase tracking-wider w-[40%]">Feature</th>
                <th className="py-4 px-5 text-sm font-semibold text-emerald-700 uppercase tracking-wider w-[30%]">LessonCraftStudio</th>
                <th className="py-4 px-5 text-sm font-semibold text-gray-500 uppercase tracking-wider w-[30%]">Typical Alternative</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="py-3.5 px-5 text-sm font-medium text-gray-800">{row.feature}</td>
                  <td className="py-3.5 px-5 text-sm text-emerald-700 font-medium">{row.ourApp}</td>
                  <td className="py-3.5 px-5 text-sm text-gray-500">{row.typical}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
