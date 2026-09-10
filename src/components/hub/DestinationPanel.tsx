import { Instagram } from "lucide-react";
import { useI18n } from "@/i18n";
import { CTA_BY_TYPE, bookingLink, type Destination } from "@/data/resort";

function actionHref(action: string, dest: Destination) {
  switch (action) {
    case "MENU":
    case "TREATMENTS":
    case "ACTIVITIES":
    case "BROCHURE":
      return dest.menu_url ?? dest.discover_url;
    case "PRICE_LIST":
      return dest.price_list_url ?? dest.menu_url ?? dest.discover_url;
    case "VEGETARIAN_MENU":
      return dest.vegetarian_menu_url ?? dest.menu_url ?? dest.discover_url;
    case "VEGAN_MENU":
      return dest.vegan_menu_url ?? dest.menu_url ?? dest.discover_url;
    case "BREAKFAST_MENU":
      return dest.breakfast_menu_url ?? dest.menu_url ?? dest.discover_url;
    case "LUNCH_MENU":
      return dest.lunch_menu_url ?? dest.menu_url ?? dest.discover_url;
    case "DINNER_MENU":
      return dest.dinner_menu_url ?? dest.menu_url ?? dest.discover_url;
    case "BOOK":
      return bookingLink(dest);
    default:
      return dest.discover_url;
  }
}

/** Action list for a destination — swaps DETAILS for BROCHURE when a brochure URL exists. */
export function actionsFor(dest: Destination, limit?: number) {
  let list = CTA_BY_TYPE[dest.type];
  if (dest.menu_url && !list.includes("MENU")) {
    list = list.map((a) => (a === "DETAILS" ? "BROCHURE" : a));
    if (!list.includes("BROCHURE")) list = [...list, "BROCHURE"];
  }
  if (dest.booking_url && !list.includes("BOOK")) list = [...list, "BOOK"];
  // Lunch/dinner menus replace the generic MENU action
  if (dest.breakfast_menu_url || dest.lunch_menu_url || dest.dinner_menu_url) {
    const menus = [
      ...(dest.breakfast_menu_url ? ["BREAKFAST_MENU"] : []),
      ...(dest.lunch_menu_url ? ["LUNCH_MENU"] : []),
      ...(dest.dinner_menu_url ? ["DINNER_MENU"] : []),
    ];
    list = list.includes("MENU") ? list.flatMap((a) => (a === "MENU" ? menus : [a])) : [...list, ...menus];
  }
  if (dest.price_list_url && !list.includes("PRICE_LIST")) list = [...list, "PRICE_LIST"];
  if (dest.vegetarian_menu_url && !list.includes("VEGETARIAN_MENU")) list = [...list, "VEGETARIAN_MENU"];
  if (dest.vegan_menu_url && !list.includes("VEGAN_MENU")) list = [...list, "VEGAN_MENU"];
  return limit ? list.slice(0, limit) : list;
}

/** The single universal card used everywhere in the hub. */
export function DestinationPanel({ dest, active }: { dest: Destination; active: boolean }) {
  const { typeLabel, action, description } = useI18n();
  const actions = actionsFor(dest, 3);

  return (
    <article className="relative h-full w-full overflow-hidden rounded-[26px] bg-black shadow-[0_30px_70px_-30px_rgba(0,0,0,0.65)]">
      <img
        src={dest.image}
        alt={dest.name}
        loading="lazy"
        draggable={false}
        width={768}
        height={1152}
        className={`h-full w-full select-none object-cover transition-[filter,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          active ? "scale-100" : "scale-[1.03] brightness-[0.68] saturate-[0.75]"
        }`}
      />

      {/* readability gradient only at the bottom */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[28%] bg-gradient-to-b from-black/40 to-transparent" />

      <div className="absolute inset-0 flex flex-col justify-between p-7 text-[oklch(0.98_0.005_90)]">
        <p className="text-[9px] tracking-[0.42em] opacity-80">{typeLabel(dest.type)}</p>

        <div className={`transition-opacity duration-500 ${active ? "opacity-100" : "opacity-60"}`}>
          <h3 className="font-serif text-[clamp(28px,8.5vw,40px)] leading-[0.98] tracking-[0.01em] drop-shadow-[0_2px_14px_rgba(0,0,0,0.45)]">
            {dest.name}
          </h3>
          <p className="mt-3 max-w-[30ch] font-serif text-[15px] italic leading-snug opacity-85">
            {description(dest.id, dest.short_description)}
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
                {action(a)}
              </a>
            ))}
            {dest.instagram_url && (
              <a
                href={dest.instagram_url}
                target="_blank"
                rel="noreferrer"
                aria-label={`${dest.name} on Instagram`}
                tabIndex={active ? 0 : -1}
                className="grid size-8 -my-1 place-items-center rounded-full border border-current/30 opacity-80 transition-opacity hover:opacity-50"
              >
                <Instagram className="size-3.5" strokeWidth={1.5} />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
