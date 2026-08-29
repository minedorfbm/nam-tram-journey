import { useMemo, useState } from "react";
import { DestinationPanel } from "./DestinationPanel";
import { DESTINATIONS, type Level } from "@/data/resort";

interface Props {
  id: Level;
  title: string;
  line: string;
  image: string;
  clusters?: string[];
}

export function LevelChapter({ id, title, line, image, clusters }: Props) {
  const [showAll, setShowAll] = useState(false);
  const [cluster, setCluster] = useState(clusters?.[0]);

  const all = useMemo(
    () =>
      DESTINATIONS.filter((d) => d.active && d.level === id).sort(
        (a, b) => a.display_order - b.display_order,
      ),
    [id],
  );

  const scoped = clusters ? all.filter((d) => d.cluster === cluster) : all;
  const list = showAll ? scoped : scoped.filter((d) => d.featured || scoped.length <= 4);

  return (
    <section id={id} data-level={id} className="level relative min-h-[100svh] py-24">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <img
          src={image}
          alt=""
          aria-hidden
          loading="lazy"
          width={900}
          height={1400}
          className="level-bg h-full w-full object-cover"
        />
        <div className="level-veil absolute inset-0" />
      </div>

      <div className="relative">
        <header className="px-6">
          <h2 className="font-serif text-[clamp(56px,20vw,110px)] leading-[0.85] tracking-[-0.02em]">
            {title}
          </h2>
          <p className="mt-4 text-[13px] tracking-[0.18em] opacity-60">{line}</p>
        </header>

        {clusters && (
          <div className="mt-10 flex gap-6 px-6">
            {clusters.map((c) => (
              <button
                key={c}
                onClick={() => {
                  setCluster(c);
                  setShowAll(false);
                }}
                className={`border-b pb-1 text-[10px] tracking-[0.3em] transition-opacity ${
                  c === cluster ? "border-current opacity-100" : "border-transparent opacity-40"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        )}

        <p className="mt-10 px-6 text-[9px] tracking-[0.34em] opacity-45">
          {showAll ? "ALL DESTINATIONS" : "FEATURED DESTINATIONS"} · SWIPE →
        </p>

        <div className="mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-6 pb-2 [scrollbar-width:none] [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden">
          {list.map((dest) => (
            <DestinationPanel key={dest.id} dest={dest} />
          ))}
          <span className="w-2 shrink-0" aria-hidden />
        </div>

        {scoped.length > list.length && (
          <button
            onClick={() => setShowAll(true)}
            className="mt-6 ml-6 border-b border-current/40 pb-1 text-[10px] tracking-[0.3em] opacity-70"
          >
            VIEW ALL
          </button>
        )}
      </div>
    </section>
  );
}
