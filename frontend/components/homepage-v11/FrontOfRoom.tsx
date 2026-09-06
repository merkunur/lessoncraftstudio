import ToolVignette, { type VignetteVariant } from '@/components/homepage-v6/ToolVignette';
import Slip from '@/components/homepage-v11/Slip';

/* THE EASEL — Room I's front of the room.

   v10 stood four static apparatus renders on a bench. v11 stands ONE easel
   and lets four working instruments take turns on it: each panel is a
   `position: sticky` card holding a pure-CSS machine from homepage-v6/
   (the operator's standing law: the working apparatus is the signature and
   is multiplied, never removed). The next panel scrolls up over the last, so
   the visitor stands still while the lesson changes in front of them.

   Names and taglines are the native MANIPULATIVES strings for each tool, in
   all eleven locales; nothing here is new copy. The balance comes first
   because the room's own body copy says "the beam tips, so nobody has to say
   wrong", and it carries the v6 pen-note that says exactly that. */

export type EaselPanel = {
  key: string;
  variant: VignetteVariant;
  name: string;
  note: string;
  /** Optional pen-note slip (an existing native string). */
  slip?: string;
};

export default function FrontOfRoom({ panels }: { panels: EaselPanel[] }) {
  return (
    <div className="hv11-easel">
      {panels.map((p, i) => (
        <div key={p.key} className="hv11-panel" data-scrub data-enter style={{ ['--n' as string]: i }}>
          <div className="hv11-panel-art">
            <ToolVignette variant={p.variant} />
          </div>
          <div className="hv11-panel-foot">
            <span className="hv11-panel-name">{p.name}</span>
            <span className="hv11-panel-note">{p.note}</span>
          </div>
          {p.slip ? <Slip text={p.slip} className="hv11-panel-slip" /> : null}
        </div>
      ))}
    </div>
  );
}
