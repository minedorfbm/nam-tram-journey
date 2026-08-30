import { useEffect, useRef, useState } from "react";
import { DestinationPanel } from "./DestinationPanel";
import type { Destination } from "@/data/resort";

const VISIBLE = 2; // active + 1 discreet peek behind
const PEEK = 18; // px offset of the next card
const TRAVEL = 200; // px of drag equal to one card

/**
 * Universal stacked card deck.
 * Same geometry & interaction in every level — only the atmosphere changes.
 */
export function CardStack({ items }: { items: Destination[] }) {
  const [index, setIndex] = useState(0);
  const [drag, setDrag] = useState(0);
  const [dragging, setDragging] = useState(false);
  const start = useRef<{
    x: number;
    y: number;
    t: number;
    lastX: number;
    lastT: number;
    v: number;
    locked: null | boolean;
  } | null>(null);

  useEffect(() => {
    setIndex(0);
    setDrag(0);
  }, [items]);

  if (items.length === 0) return null;

  const last = items.length - 1;
  const clamp = (i: number) => Math.min(last, Math.max(0, i));

  const onDown = (e: React.PointerEvent) => {
    start.current = {
      x: e.clientX,
      y: e.clientY,
      t: e.timeStamp,
      lastX: e.clientX,
      lastT: e.timeStamp,
      v: 0,
      locked: null,
    };
  };

  const onMove = (e: React.PointerEvent) => {
    const s = start.current;
    if (!s) return;
    const dx = e.clientX - s.x;
    const dy = e.clientY - s.y;
    if (s.locked === null) {
      if (Math.abs(dx) < 4 && Math.abs(dy) < 4) return;
      s.locked = Math.abs(dx) > Math.abs(dy) * 0.7;
      if (s.locked) {
        setDragging(true);
        (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
      }
    }
    if (!s.locked) return;

    const dt = Math.max(1, e.timeStamp - s.lastT);
    s.v = (e.clientX - s.lastX) / dt; // px per ms
    s.lastX = e.clientX;
    s.lastT = e.timeStamp;

    // rubber band at both ends
    const atStart = index === 0 && dx > 0;
    const atEnd = index === last && dx < 0;
    setDrag(atStart || atEnd ? dx * 0.32 : dx);
  };

  const onUp = () => {
    const s = start.current;
    start.current = null;
    setDragging(false);
    if (s?.locked) {
      const v = s.v;
      const flick = Math.abs(v) > 0.35;
      const passed = Math.abs(drag) > 40;
      if (flick || passed) {
        const dir = (flick ? v : drag) < 0 ? 1 : -1;
        setIndex((i) => clamp(i + dir));
      }
    }
    setDrag(0);
  };

  return (
    <div className="select-none">
      <div
        className="relative mx-5 aspect-[3/4.7] touch-pan-y"
        style={{ width: "88vw", maxWidth: 440 }}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
      >
        {items.map((dest, i) => {
          const offset = i - index;
          if (offset < -1 || offset > VISIBLE) return null;

          // continuous position influenced by the in-flight drag
          const pos = offset - drag / TRAVEL;
          const p = Math.max(0, pos);
          const x = p * PEEK + Math.min(0, pos) * 150;
          const scale = 1 - p * 0.035;
          const active = offset === 0;

          return (
            <div
              key={dest.id}
              className="absolute inset-0 origin-bottom will-change-transform"
              style={{
                transform: `translate3d(${x}px,0,0) scale(${scale})`,
                zIndex: items.length - i,
                opacity: pos > VISIBLE - 0.4 ? 0 : Math.min(1, 1 + pos),
                transition: dragging
                  ? "none"
                  : "transform 620ms cubic-bezier(0.22,1,0.36,1), opacity 420ms ease",
              }}
            >
              <DestinationPanel dest={dest} active={active} />
            </div>
          );
        })}
      </div>

      <div className="mt-5 flex items-center gap-1.5 px-6">
        {items.map((d, i) => (
          <button
            key={d.id}
            aria-label={d.name}
            onClick={() => setIndex(i)}
            className={`h-px transition-all duration-500 ${
              i === index ? "w-6 bg-current opacity-80" : "w-2 bg-current opacity-25"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
