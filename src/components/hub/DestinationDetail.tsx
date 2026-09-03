import { useEffect } from "react";
import { ArrowLeft, Instagram } from "lucide-react";
import { CTA_BY_TYPE, bookingLink, type Destination } from "@/data/resort";

function actionHref(action: string, dest: Destination) {
  switch (action) {
    case "MENU":
    case "TREATMENTS":
    case "ACTIVITIES":
      return dest.menu_url ?? dest.discover_url ?? "#";
    case "BOOK":
      return bookingLink(dest);
    default:
      return dest.discover_url ?? "#";
  }
}

/** Full-screen editorial detail view for one destination. */
export function DestinationDetail({ dest, onClose }: { dest: Destination; onClose: () => void }) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const actions = CTA_BY_TYPE[dest.type];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={dest.name}
      className="detail-enter fixed inset-0 z-[80] overflow-y-auto overscroll-contain bg-[oklch(0.13_0.02_250)] text-[oklch(0.97_0.005_90)]"
    >
      <div className="relative h-[62svh] w-full overflow-hidden">
        <img
          src={dest.image}
          alt={dest.name}
          className="h-full w-full object-cover"
          width={900}
          height={1400}
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[oklch(0.13_0.02_250)] via-[oklch(0.13_0.02_250/0.4)] to-transparent" />

        <button
          onClick={onClose}
          className="absolute left-5 top-6 flex items-center gap-2 rounded-full border border-current/25 bg-black/25 px-4 py-2 text-[9px] tracking-[0.32em] backdrop-blur-sm transition-opacity hover:opacity-70"
        >
          <ArrowLeft className="size-3" strokeWidth={1.5} />
          BACK
        </button>

        <div className="absolute inset-x-0 bottom-0 px-7 pb-8">
          <p className="text-[9px] tracking-[0.42em] opacity-70">
            {dest.level.toUpperCase()} · {dest.type.toUpperCase()}
          </p>
          <h2 className="mt-4 font-serif text-[clamp(34px,10vw,52px)] leading-[0.95] tracking-[-0.01em]">
            {dest.name}
          </h2>
        </div>
      </div>

      <div className="px-7 pb-24 pt-8">
        <p className="max-w-[38ch] font-serif text-[18px] italic leading-relaxed opacity-85">
          {dest.short_description}
        </p>

        <span className="mt-8 block h-px w-10 bg-current/30" aria-hidden />

        <dl className="mt-8 divide-y divide-current/10 border-y border-current/10 text-[10px] tracking-[0.24em]">
          <div className="flex justify-between py-3">
            <dt className="opacity-45">LEVEL</dt>
            <dd>{dest.level.toUpperCase()}</dd>
          </div>
          <div className="flex justify-between py-3">
            <dt className="opacity-45">CATEGORY</dt>
            <dd>{dest.type.toUpperCase()}</dd>
          </div>
          {dest.cluster && (
            <div className="flex justify-between py-3">
              <dt className="opacity-45">AREA</dt>
              <dd>{dest.cluster}</dd>
            </div>
          )}
        </dl>

        <div className="mt-10 flex flex-col gap-3">
          {actions.map((a) => (
            <a
              key={a}
              href={actionHref(a, dest)}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between border-b border-current/20 pb-3 text-[11px] tracking-[0.3em] transition-opacity hover:opacity-60"
            >
              {a}
              <span className="opacity-40">↗</span>
            </a>
          ))}
          {dest.instagram_url && (
            <a
              href={dest.instagram_url}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-3 text-[10px] tracking-[0.3em] opacity-75 transition-opacity hover:opacity-50"
            >
              <span className="grid size-8 place-items-center rounded-full border border-current/30">
                <Instagram className="size-3.5" strokeWidth={1.5} />
              </span>
              INSTAGRAM
            </a>
          )}
        </div>

        <button
          onClick={onClose}
          className="mt-14 text-[10px] tracking-[0.32em] opacity-55 transition-opacity hover:opacity-90"
        >
          ← BACK TO THE JOURNEY
        </button>
      </div>
    </div>
  );
}
