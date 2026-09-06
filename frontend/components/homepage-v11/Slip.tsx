/* Slip — a pen-note on a cream slip, the gallery's handwritten label.

   Carries the traveller notes ("still the same sheet", "same sheet again —
   now in 25 kids' hands", "the lesson ends; the page is still there
   tomorrow") and the balance note in Room I. Every string it shows is an
   existing native key (homepageV6.*.pen*), authored ×11 for v6 and never
   rendered by v10; nothing here is new copy. Real text, in the a11y tree,
   never inside a scaled subtree. */

export default function Slip({ text, className = '' }: { text: string; className?: string }) {
  if (!text) return null;
  return <span className={`hv11-slip${className ? ` ${className}` : ''}`}>{text}</span>;
}
