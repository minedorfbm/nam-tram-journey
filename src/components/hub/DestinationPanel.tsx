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
    <article className="w-[84vw] shrink-0 snap-center">
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={dest.image}
          alt={dest.name}
          loading="lazy"
          width={900}
          height={1400}
          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
        <span className="pointer-events-none absolute inset-3 border border-[oklch(1_0_0/0.16)]" aria-hidden />
        <div className="absolute inset-x-0 bottom-0 p-6 text-[oklch(0.98_0_0)]">
          <p className="text-[9px] tracking-[0.34em] opacity-70">{dest.type.toUpperCase()}</p>
          <h3 className="mt-2 font-serif text-[28px] leading-[1.02] tracking-[-0.01em]">{dest.name}</h3>
          <p className="mt-2 max-w-[32ch] text-[12px] leading-relaxed opacity-75">
            {dest.short_description}
          </p>
        </div>
      </div>


      <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2">
        {actions.map((a) => (
          <a
            key={a}
            href={actionHref(a, dest)}
            target="_blank"
            rel="noreferrer"
            className="border-b border-current/30 pb-0.5 text-[10px] tracking-[0.26em] transition-opacity hover:opacity-60"
          >
            {a}
          </a>
        ))}
        {dest.instagram_url && (
          <a
            href={dest.instagram_url}
            target="_blank"
            rel="noreferrer"
            className="text-[10px] tracking-[0.26em] opacity-50"
          >
            IG ↗
          </a>
        )}
      </div>
    </article>
  );
}
