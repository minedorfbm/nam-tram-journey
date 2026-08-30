import { CTA_BY_TYPE, bookingLink, type Destination } from "@/data/resort";

function actionHref(action: string, dest: Destination) {
  switch (action) {
    case "MENU":
      return dest.menu_url ?? dest.discover_url;
    case "BOOK":
      return bookingLink(dest);
    default:
      return dest.discover_url;
  }
}

export function DestinationPanel({ dest }: { dest: Destination }) {
  const actions = CTA_BY_TYPE[dest.type].slice(0, 3);

  return (
    <article className="w-[82vw] max-w-[340px] shrink-0 snap-center">
      <div className="relative aspect-[3/4.4] overflow-hidden rounded-[22px] shadow-[0_24px_60px_-24px_rgba(0,0,0,0.55)]">
        <img
          src={dest.image}
          alt={dest.name}
          loading="lazy"
          width={900}
          height={1400}
          className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.04]"
        />

        {/* soft legibility veils */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/5 to-black/60" />
        <span
          className="pointer-events-none absolute inset-2.5 rounded-[16px] border border-white/25"
          aria-hidden
        />

        {/* content */}
        <div className="absolute inset-0 flex flex-col items-center justify-between p-7 pt-12 text-center text-white">
          <div className="flex flex-col items-center">
            <p className="text-[9px] tracking-[0.42em] opacity-80">
              {dest.level.toUpperCase()} / {dest.type.toUpperCase()}
            </p>
            <h3 className="mt-4 font-serif text-[clamp(26px,8vw,36px)] leading-[1.02] tracking-[0.02em] drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)]">
              {dest.name}
            </h3>
            <span className="mt-4 h-px w-8 bg-white/50" aria-hidden />
            <p className="mt-4 max-w-[28ch] font-serif text-[15px] italic leading-relaxed opacity-90">
              {dest.short_description}
            </p>
          </div>

          <div className="flex w-full items-center justify-center gap-x-7">
            {actions.map((a) => (
              <a
                key={a}
                href={actionHref(a, dest)}
                target="_blank"
                rel="noreferrer"
                className="text-[10px] tracking-[0.32em] drop-shadow-[0_1px_6px_rgba(0,0,0,0.5)] transition-opacity hover:opacity-60"
              >
                {a}
              </a>
            ))}
            {dest.instagram_url && (
              <a
                href={dest.instagram_url}
                target="_blank"
                rel="noreferrer"
                className="text-[10px] tracking-[0.32em] opacity-60"
              >
                IG ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
