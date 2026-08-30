import { useEffect, useRef, useState } from "react";
import { DestinationPanel } from "./DestinationPanel";
import type { Destination } from "@/data/resort";

const VISIBLE = 3; // active + 2 behind

/**
 * Universal stacked card deck.
 * Same geometry & interaction in every level — only the atmosphere changes.
 */
export function CardStack({ items }: { items: Destination[] }) {
  const [index, setIndex] = useState(0);
  const [drag, setDrag] = useState(0);
  const start = useRef<{ x: number; y: number; locked: null | boolean } | null>(null);

  useEffect(() => {
    setIndex(0);
    setDrag(0);
  }, [items]);

  if (items.length === 0) return null;

  const clamp = (i: number) => Math.min(items.length - 1, Math.max(0, i));

  const onDown = (e: React.PointerEvent) => {
    start.current = { x: e.clientX, y: e.clientY, locked: null };
  };

  const onMove = (e: React.PointerEvent) => {
    const s = start.current;
    if (!s) return;
    const dx = e.clientX - s.x;
    const dy = e.clientY - s.y;
    if (s.locked === null) {
      if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
      s.locked = Math.abs(dx) > Math.abs(dy);
    }
    if (!s.locked) return;
    setDrag(dx);
  };

  const onUp = () => {
    const s = start.current;
    start.current = null;
    if (s?.locked && Math.abs(drag) > 48) {
      setIndex((i) => clamp(i + (drag < 0 ? 1 : -1)));
    }
    setDrag(0);
  };

  return (
    <div className="select-none">
      <div
        className="relative mx-6 aspect-[3/4.35] touch-pan-y"
        style={{ width: "75vw", maxWidth: 360 }}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
      >
        {items.map((dest, i) => {
          const offset = i - index;
          if (offset < 0 || offset > VISIBLE) return null;

          // continuous position influenced by the in-flight drag
          const pos = offset - drag / 260;
          const p = Math.max(0, pos);
          const x = p * 46 - Math.min(0, pos) * 120;
          const scale = 1 - p * 0.07;
          const active = offset === 0;

          return (
            <div
              key={dest.id}
              className="absolute inset-0 origin-left will-change-transform"
              style={{
                transform: `translateX(${x}px) scale(${scale})`,
                zIndex: items.length - i,
                opacity: pos > VISIBLE - 0.2 ? 0 : 1,
                transition: start.current
                  ? "none"
                  : "transform 700ms cubic-bezier(0.16,1,0.3,1), opacity 500ms ease",
              }}
            >
              <DestinationPanel dest={dest} active={active} />
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex items-center gap-2 px-6">
        {items.map((d, i) => (
          <button
            key={d.id}
            aria-label={d.name}
            onClick={() => setIndex(i)}
            className={`h-px transition-all duration-500 ${
              i === index ? "w-8 bg-current opacity-90" : "w-3 bg-current opacity-30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
