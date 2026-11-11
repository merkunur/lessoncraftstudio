'use client';
/* Prints the checklist as its coverage document (Daily Teaching System, Part 6): the page's own print style sheet
 * (components/curriculum/curriculum.css, @media print) leaves the codes, the descriptions, the lessons and the list
 * of what is not covered, and takes away the site's navigation. No file is made on the server. */
export default function PrintButton({ label }: { label: string }) {
  return (
    <button type="button" className="cu-print-button" onClick={() => window.print()}>
      {label}
    </button>
  );
}
