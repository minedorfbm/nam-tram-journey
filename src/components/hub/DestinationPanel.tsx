import { CTA_BY_TYPE, bookingLink, type Destination } from "@/data/resort";

function actionHref(action: string, dest: Destination) {
  switch (action) {
    case "MENU":
    case "TREATMENTS":
    case "ACTIVITIES":
      return dest.menu_url ?? dest.discover_url;
    case "BOOK":
      return bookingLink(dest);
    default:
      return dest.discover_url;
  }
}

/** The single universal card used everywhere in the hub. */
export function DestinationPanel({
  dest,
  active,
}: {
  dest: Destination;
  active: boolean;
}) {
  const actions = CTA_BY_TYPE[dest.type].slice(0, 3);

  return (
    <article className="relative h-full w-full overflow-hidden rounded-[26px] bg-black shadow-[0_30px_70px_-30px_rgba(0,0,0,0.65)]">
      <img
        src={dest.image}
        alt={dest.name}
        loading="lazy"
        draggable={false}
        width={900}
        height={1400}
        className={`h-full w-full select-none object-cover transition-[filter,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          active ? "scale-100" : "scale-[1.04] brightness-[0.62] saturate-[0.7]"
        }`}
      />

      {/* readability gradient only at the bottom */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[28%] bg-gradient-to-b from-black/40 to-transparent" />

      <div className="absolute inset-0 flex flex-col justify-between p-7 text-[oklch(0.98_0.005_90)]">
        <p className="text-[9px] tracking-[0.42em] opacity-80">
          {dest.type.toUpperCase()}
        </p>

        <div
          className={`transition-opacity duration-500 ${active ? "opacity-100" : "opacity-60"}`}
        >
          <h3 className="font-serif text-[clamp(28px,8.5vw,40px)] leading-[0.98] tracking-[0.01em] drop-shadow-[0_2px_14px_rgba(0,0,0,0.45)]">
            {dest.name}
          </h3>
          <p className="mt-3 max-w-[30ch] font-serif text-[15px] italic leading-snug opacity-85">
            {dest.short_description}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
            {actions.map((a) => (
              <a
                key={a}
                href={actionHref(a, dest)}
                target="_blank"
                rel="noreferrer"
                tabIndex={active ? 0 : -1}
                className="text-[10px] tracking-[0.3em] transition-opacity hover:opacity-60"
              >
                {a}
              </a>
            ))}
            {dest.instagram_url && (
              <a
                href={dest.instagram_url}
                target="_blank"
                rel="noreferrer"
                tabIndex={active ? 0 : -1}
                className="text-[10px] tracking-[0.3em] opacity-55"
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
