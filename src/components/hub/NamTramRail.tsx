import { LEVELS, type Level } from "@/data/resort";

interface Props {
  active: Level;
  progress: number; // 0..1 across the whole descent
  onJump: (level: Level) => void;
}

export function NamTramRail({ active, progress, onJump }: Props) {
  return (
    <nav
      aria-label="Resort levels"
      className="fixed right-3 top-1/2 z-40 -translate-y-1/2 select-none"
    >
      <div className="relative flex flex-col items-end gap-9 py-2">
        {/* rail line */}
        <span className="absolute right-[5px] top-0 bottom-0 w-px bg-current opacity-20" aria-hidden />
        <span
          className="absolute right-[5px] top-0 w-px bg-current opacity-70 transition-[height] duration-500"
          style={{ height: `${Math.min(100, Math.max(0, progress * 100))}%` }}
          aria-hidden
        />
        {LEVELS.map((l) => {
          const isActive = l.id === active;
          return (
            <button
              key={l.id}
              onClick={() => onJump(l.id)}
              className="group flex items-center gap-2 pr-[1px]"
              aria-current={isActive ? "true" : undefined}
            >
              <span
                className={`text-[9px] tracking-[0.32em] transition-opacity duration-300 ${
                  isActive ? "opacity-100" : "opacity-35"
                }`}
              >
                {l.title}
              </span>
              <span
                className={`relative block h-[11px] w-[11px] border transition-all duration-300 ${
                  isActive ? "border-current opacity-100" : "border-current opacity-30"
                }`}
                style={{
                  clipPath: isActive
                    ? "polygon(0 22%, 50% 0, 100% 22%, 100% 100%, 0 100%)"
                    : undefined,
                }}
                aria-hidden
              />
            </button>
          );
        })}
      </div>
    </nav>
  );
}
