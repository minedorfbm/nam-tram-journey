import heavenImg from "@/assets/heaven.jpg";
import skyImg from "@/assets/sky.jpg";
import earthImg from "@/assets/earth.jpg";
import seaImg from "@/assets/sea.jpg";
import dFrenchDining from "@/assets/d-french-dining.jpg";
import dCitron from "@/assets/d-citron.jpg";
import dBar from "@/assets/d-bar.jpg";
import dWine from "@/assets/d-wine.jpg";
import dSpa from "@/assets/d-spa.jpg";
import dPool from "@/assets/d-pool.jpg";
import dBeach from "@/assets/d-beach.jpg";
import dVilla from "@/assets/d-villa.jpg";
import dGym from "@/assets/d-gym.jpg";
import dGallery from "@/assets/d-gallery.jpg";
import dTram from "@/assets/d-tram.jpg";
import dRetail from "@/assets/d-retail.jpg";
import offerEnchanted from "@/assets/offer-enchanted.jpg";
import offerBensley from "@/assets/offer-bensley.jpg";
import offerWedding from "@/assets/offer-wedding.jpg";
import ihgRewards from "@/assets/ihg-rewards.jpg";
import gDiningDetail from "@/assets/g-dining-detail.jpg";
import gBarDetail from "@/assets/g-bar-detail.jpg";
import gArchitectureDetail from "@/assets/g-architecture-detail.jpg";
import gTerraceDetail from "@/assets/g-terrace-detail.jpg";

/**
 * CMS-ready data layer.
 * Every field below maps 1:1 to a future database column so the frontend can be
 * switched to a CMS without touching components.
 */

export type Level = "heaven" | "sky" | "earth" | "sea";

export type DestinationType =
  | "restaurant"
  | "bar"
  | "spa"
  | "experience"
  | "pool"
  | "fitness"
  | "kids"
  | "retail"
  | "gallery"
  | "accommodation"
  | "service"
  | "beach"
  | "recreation";

export interface Destination {
  id: string;
  name: string;
  level: Level;
  cluster?: string;
  type: DestinationType;
  short_description: string;
  image: string;
  discover_url?: string;
  menu_url?: string;
  booking_url?: string;
  instagram_url?: string;
  booking_message?: string;
  photos?: DestinationPhoto[];
  display_order: number;
  active: boolean;
}

/** One curated gallery photo shown inside a destination detail sheet. */
export interface DestinationPhoto {
  image: string;
  caption?: string;
  post_url?: string;
}

/** Row shape returned by the `destination_photos` table. */
export interface DestinationPhotoRow {
  destination_id: string;
  image_url: string;
  caption: string | null;
  post_url: string | null;
  display_order: number;
}

/** Official resort channels — configurable, no invented accounts. */
export const OFFICIAL = {
  website: "https://www.danang.intercontinental.com/",
  adj: "https://www.danang.intercontinental.com/gallery/",
  ihg: "https://www.ihg.com/onerewards/content/us/en/home",
  instagram: "https://www.instagram.com/intercontinentaldanang/",
  map: "https://www.danang.intercontinental.com/contact-us/",
  contact: "tel:+842363938888",
  dining: "https://www.danang.intercontinental.com/dining/",
  spa: "https://www.danang.intercontinental.com/spa-and-wellbeing/",
} as const;

/** Existing human booking channel (WhatsApp). Editable via CMS. */
export const BOOKING_CHANNEL = {
  channel: "whatsapp" as const,
  destination: "842363938888",
};

export function bookingLink(d: Destination) {
  const template =
    d.booking_message ?? `Hello, I'm interested in booking ${d.name}. Could you please assist me?`;
  return `https://wa.me/${BOOKING_CHANNEL.destination}?text=${encodeURIComponent(template)}`;
}

/** Action sets by content type. */
export const CTA_BY_TYPE: Record<DestinationType, string[]> = {
  restaurant: ["DISCOVER", "MENU", "BOOK"],
  bar: ["DISCOVER", "MENU"],
  spa: ["DISCOVER", "TREATMENTS", "BOOK"],
  fitness: ["DISCOVER", "HOURS"],
  kids: ["DISCOVER", "ACTIVITIES"],
  pool: ["INFO", "HOURS"],
  experience: ["DISCOVER", "DETAILS", "BOOK"],
  retail: ["DISCOVER", "VISIT"],
  gallery: ["DISCOVER", "VISIT"],
  accommodation: ["DISCOVER", "DETAILS"],
  service: ["INFO"],
  beach: ["INFO"],
  recreation: ["DISCOVER", "DETAILS"],
};

export const LEVELS: {
  id: Level;
  title: string;
  line: string;
  image: string;
  clusters?: string[];
}[] = [
  { id: "heaven", title: "HEAVEN", line: "Above the bay.", image: heavenImg },
  { id: "sky", title: "SKY", line: "Where the horizon opens.", image: skyImg },
  {
    id: "earth",
    title: "EARTH",
    line: "Where the resort comes alive.",
    image: earthImg,
    clusters: ["EAT", "MOVE", "PLAY"],
  },
  { id: "sea", title: "SEA", line: "Where everything slows down.", image: seaImg },
];

const w = OFFICIAL.website;

/** Default photography per content type. */
const TYPE_IMAGE: Record<DestinationType, string> = {
  restaurant: dFrenchDining,
  bar: dBar,
  spa: dSpa,
  experience: dGallery,
  pool: dPool,
  fitness: dGym,
  kids: dBeach,
  retail: dRetail,
  gallery: dGallery,
  accommodation: dVilla,
  service: dVilla,
  beach: dBeach,
  recreation: dBeach,
};

/** Specific photography overrides by destination id. */
const IMAGE_BY_ID: Record<string, string> = {
  "enchanted-holiday": offerEnchanted,
  "bensley-package": offerBensley,
  "ihg-one-rewards": ihgRewards,
  weddings: offerWedding,
  citron: dCitron,
  "wine-cellar": dWine,
  tingara: dCitron,
  "nam-tram": dTram,
  "the-summit": dTram,
  "apec-garden": dGallery,
  "bensley-gallery": dGallery,
  "organic-garden": dGallery,
  "dia-tang": dGallery,
  "yoga-pavilion": dSpa,
  nursery: dSpa,
  "terra-mare": dFrenchDining,
};

/** Asset registry — maps a CMS `image_key` to the bundled photography. */
export const ASSET_BY_KEY: Record<string, string> = {
  "offer-enchanted": offerEnchanted,
  "offer-bensley": offerBensley,
  "offer-wedding": offerWedding,
  "ihg-rewards": ihgRewards,
  heaven: heavenImg,
  sky: skyImg,
  earth: earthImg,
  sea: seaImg,
  "d-french-dining": dFrenchDining,
  "d-citron": dCitron,
  "d-bar": dBar,
  "d-wine": dWine,
  "d-spa": dSpa,
  "d-pool": dPool,
  "d-beach": dBeach,
  "d-villa": dVilla,
  "d-gym": dGym,
  "d-gallery": dGallery,
  "d-tram": dTram,
  "d-retail": dRetail,
  "g-dining-detail": gDiningDetail,
  "g-bar-detail": gBarDetail,
  "g-architecture-detail": gArchitectureDetail,
  "g-terrace-detail": gTerraceDetail,
};

/** Resolves a stored photo reference: either an absolute URL or an asset key. */
export function resolveImage(ref: string): string {
  if (/^(https?:)?\/\//.test(ref) || ref.startsWith("/")) return ref;
  return ASSET_BY_KEY[ref] ?? "";
}

/**
 * Bundled fallback galleries, used when the database is unreachable.
 * Placeholder photography in the resort's visual style — to be replaced by the
 * resort's own Instagram imagery.
 */
const DINING_SET = ["g-dining-detail", "g-terrace-detail", "g-architecture-detail"];
const BAR_SET = ["g-bar-detail", "d-bar", "g-terrace-detail", "g-architecture-detail"];

export const FALLBACK_PHOTOS: Record<string, string[]> = {
  "terra-mare": ["d-french-dining", ...DINING_SET],
  citron: ["d-citron", ...DINING_SET],
  "la-maison-1888": ["d-french-dining", ...DINING_SET],
  "b-lounge": BAR_SET,
  "long-bar": BAR_SET,
  "buffalo-bar": BAR_SET,
  "wine-cellar": ["d-wine", "g-bar-detail", "g-dining-detail", "g-architecture-detail"],
  tingara: ["d-citron", ...BAR_SET.slice(0, 3)],
  "bensley-package": ["offer-bensley", "g-architecture-detail", "d-gallery", "d-villa"],
  weddings: ["offer-wedding", "g-terrace-detail", "d-beach", "g-dining-detail"],
};

/** Groups photo rows by destination, ready to attach to a destination. */
export function groupPhotos(rows: DestinationPhotoRow[]): Record<string, DestinationPhoto[]> {
  const out: Record<string, DestinationPhoto[]> = {};
  for (const row of [...rows].sort((a, b) => a.display_order - b.display_order)) {
    const image = resolveImage(row.image_url);
    if (!image) continue;
    (out[row.destination_id] ??= []).push({
      image,
      ...(row.caption ? { caption: row.caption } : {}),
      ...(row.post_url ? { post_url: row.post_url } : {}),
    });
  }
  return out;
}

/** Row shape returned by the database (see the `destinations` table). */
export interface DestinationRow {
  id: string;
  name: string;
  level_id: string;
  cluster: string | null;
  type: string;
  short_description: string;
  image_key: string | null;
  discover_url: string | null;
  menu_url: string | null;
  booking_url: string | null;
  instagram_url: string | null;
  booking_message: string | null;
  display_order: number;
  active: boolean;
}

/** Converts a database row into the shape the components already consume. */
export function toDestination(row: DestinationRow, photos?: DestinationPhoto[]): Destination {
  const type = row.type as DestinationType;
  return {
    id: row.id,
    name: row.name,
    level: row.level_id as Level,
    ...(row.cluster ? { cluster: row.cluster } : {}),
    type,
    short_description: row.short_description,
    image: (row.image_key ? ASSET_BY_KEY[row.image_key] : undefined) ?? TYPE_IMAGE[type],
    ...(row.discover_url ? { discover_url: row.discover_url } : {}),
    ...(row.menu_url ? { menu_url: row.menu_url } : {}),
    ...(row.booking_url ? { booking_url: row.booking_url } : {}),
    ...(row.instagram_url ? { instagram_url: row.instagram_url } : {}),
    ...(row.booking_message ? { booking_message: row.booking_message } : {}),
    ...(photos && photos.length > 0 ? { photos } : {}),
    display_order: row.display_order,
    active: row.active,
  };
}

const d = (
  id: string,
  name: string,
  level: Level,
  type: DestinationType,
  short_description: string,
  order: number,
  extra: Partial<Destination> = {},
): Destination => ({
  id,
  name,
  level,
  type,
  short_description,
  image: IMAGE_BY_ID[id] ?? TYPE_IMAGE[type],
  discover_url: w,
  // restaurants surface the resort's Instagram presence
  ...(type === "restaurant" ? { instagram_url: OFFICIAL.instagram } : {}),
  display_order: order,
  active: true,
  ...extra,
});

export const DESTINATIONS: Destination[] = [
  // HEAVEN — summit of the resort
  d(
    "enchanted-holiday",
    "Enchanted Holiday Escape",
    "heaven",
    "experience",
    "Christmas 2026 — a festive stay with daily breakfast, Afternoon Tea, celebratory drinks and Charles's nature discovery trail.",
    0,
    {
      discover_url:
        "https://www.danang.intercontinental.com/offers/enchanted-holiday-escape-offer-2/",
      booking_message:
        "Hello, I'm interested in the Enchanted Holiday Escape offer. Could you please assist me?",
    },
  ),
  d(
    "club-lounge",
    "Club InterContinental Lounge",
    "heaven",
    "service",
    "Private lounge above the bay.",
    1,
  ),
  d(
    "ihg-one-rewards",
    "IHG One Rewards",
    "heaven",
    "service",
    "The loyalty programme of IHG Hotels & Resorts — earn and enjoy worldwide.",
    2,
    { discover_url: OFFICIAL.ihg },
  ),
  d(
    "bensley-package",
    "The Bensley Design Discovery Package",
    "heaven",
    "experience",
    "Two nights in the Heavenly Penthouse, a private Design Tour, Champagne art viewing at the Bensley Outsider Gallery and Heavenly Afternoon Tea.",
    3,
    {
      discover_url: "https://www.danang.intercontinental.com/offers/bensley-design-package/",
      instagram_url: "https://www.instagram.com/billbensley/",
      booking_message:
        "Hello, I'm interested in the Bensley Design Discovery Package. Could you please assist me?",
    },
  ),
  d(
    "weddings",
    "Weddings & Celebrations",
    "heaven",
    "experience",
    "Say 'I do' above the bay — beachfront ceremonies, bespoke receptions and honeymoon moments crafted by our wedding specialists.",
    4,
    {
      discover_url: "https://www.danang.intercontinental.com/weddings/",
      menu_url:
        "https://www.danang.intercontinental.com/wp-content/uploads/2026/06/InterContinental-Danang-Wedding-Brochure.pdf",
      instagram_url: "https://www.instagram.com/p/Db-zN6-Gorb/",
      booking_message:
        "Hello, I'm interested in planning a wedding at the resort. Could you please assist me?",
    },
  ),
  d(
    "reception",
    "Reception",
    "heaven",
    "service",
    "Arrival at the highest point of the resort.",
    5,
  ),
  d(
    "penthouses",
    "Heavenly Penthouses",
    "heaven",
    "accommodation",
    "Panoramic suites at the summit.",
    6,
  ),
  d("the-summit", "The Summit", "heaven", "experience", "Events and ceremonies in the clouds.", 7, {
    booking_message: "Hello, I'm interested in booking The Summit. Could you please assist me?",
  }),
  d("rooms", "Rooms & Villas", "heaven", "accommodation", "Bensley design, level by level.", 7),
  d(
    "m-club",
    "Conference · Cinema · M-Club",
    "heaven",
    "experience",
    "Gatherings, screenings, celebrations.",
    9,
  ),
  d("sports-centre", "Sports Centre", "heaven", "fitness", "Tennis and mountaintop play.", 9),
  d("apec-garden", "APEC Sculpture Garden", "heaven", "gallery", "Sculpture along the ridge.", 10),
  d("nam-tram", "Nam Tram", "heaven", "service", "The funicular between the four worlds.", 11),
  d("information", "Information Desk", "heaven", "service", "Concierge and guest assistance.", 12),

  // SKY — dining and heritage terrace
  d("citron", "Citron", "sky", "restaurant", "Vietnamese cuisine in hanging nest pods.", 1, {
    booking_message:
      "Hello, I would like to reserve a table at Citron. Could you please assist me?",
  }),
  d(
    "la-maison-1888",
    "La Maison 1888",
    "sky",
    "restaurant",
    "MICHELIN-recognised French dining.",
    2,
    {
      booking_message:
        "Hello, I would like to reserve a table at La Maison 1888. Could you please assist me?",
    },
  ),
  d("buffalo-bar", "Buffalo Bar", "sky", "bar", "Cocktails beneath the Heritage Village.", 3),
  d("wine-cellar", "The Wine Cellar", "sky", "bar", "Rare vintages in a hidden room.", 4),
  d("tingara", "Tingara", "sky", "bar", "Sunset drinks above the horizon.", 5),
  d(
    "heritage-village",
    "Heritage Village",
    "sky",
    "experience",
    "Vietnamese craft and architecture.",
    6,
  ),
  d(
    "bensley-gallery",
    "Bensley Outsider Gallery",
    "sky",
    "gallery",
    "The world of the resort's architect.",
    7,
  ),
  d("kate-mccoy", "Kate McCoy", "sky", "retail", "Contemporary resort wear.", 8),
  d("sammys", "Sammy's Boutique", "sky", "retail", "Curated pieces and keepsakes.", 9),

  // EARTH — jungle level, clustered
  d("terra-mare", "Terra Mare", "earth", "restaurant", "Land and sea, all day long.", 1, {
    cluster: "EAT",
    booking_message:
      "Hello, I would like to reserve a table at Terra Mare. Could you please assist me?",
  }),
  d("b-lounge", "B Lounge", "earth", "bar", "Afternoon tea in the trees.", 2, { cluster: "EAT" }),
  d("long-bar", "L_O_N_G Bar", "earth", "bar", "The long line above the jungle.", 3, {
    cluster: "EAT",
  }),
  d("soar-gym", "Soar Gym", "earth", "fitness", "Train inside the canopy.", 4, { cluster: "MOVE" }),
  d("yoga-pavilion", "Yoga Pavilion", "earth", "experience", "Breath among the leaves.", 5, {
    cluster: "MOVE",
    booking_message:
      "Hello, I'm interested in booking a session at the Yoga Pavilion. Could you please assist me?",
  }),
  d("long-pool", "L_O_N_G Pool", "earth", "pool", "Green water, endless length.", 6, {
    cluster: "MOVE",
  }),
  d("planet-trekkers", "Planet Trekkers", "earth", "kids", "A world for younger explorers.", 7, {
    cluster: "PLAY",
  }),
  d("family-pool", "Family Pool", "earth", "pool", "Shallow, shaded, together.", 8, {
    cluster: "PLAY",
  }),
  d("kids-pool", "Kids Pool", "earth", "pool", "Small water for small guests.", 9, {
    cluster: "PLAY",
  }),
  d("garden-jacuzzi", "Garden Jacuzzi", "earth", "pool", "Warm water in the vegetation.", 10, {
    cluster: "PLAY",
  }),
  d("nail-hair", "The Nail & Hair Studio", "earth", "retail", "Quiet care between swims.", 11, {
    cluster: "PLAY",
  }),
  d("nursery", "Nursery", "earth", "kids", "Care for the youngest guests.", 12, {
    cluster: "PLAY",
  }),
  d("organic-garden", "Organic Garden", "earth", "experience", "Where the kitchens begin.", 13, {
    cluster: "PLAY",
  }),
  d("dia-tang", "Địa Tạng Shrine", "earth", "experience", "A pause in the hillside.", 14, {
    cluster: "PLAY",
  }),

  // SEA — shoreline
  d("mi-sol-spa", "Mi Sol Spa & Wellness", "sea", "spa", "Sound. Stillness. Renewal.", 1, {
    booking_message: "Hello, I'm interested in booking Mi Sol Spa. Could you please assist me?",
  }),
  d("marine-centre", "Marine Recreation Centre", "sea", "recreation", "Explore the bay.", 2),
  d("coconut-beach", "Coconut Beach", "sea", "beach", "At the edge of Son Tra.", 3),
  d("family-beach", "Family Beach", "sea", "beach", "Soft sand, calm water.", 4),
  d(
    "club-beach",
    "Club InterContinental Beach",
    "sea",
    "beach",
    "Private shoreline for Club guests.",
    5,
  ),
  d(
    "spa-lagoon-villas",
    "Spa Lagoon Villas",
    "sea",
    "accommodation",
    "Sleep beside still water.",
    6,
  ),
  d(
    "sea-experiences",
    "Seaside Experiences",
    "sea",
    "experience",
    "Sunrise sailing and quiet dives.",
    7,
    {
      booking_message:
        "Hello, I'm interested in booking a seaside experience. Could you please assist me?",
    },
  ),
];

export const GLOBAL_LINKS = [
  { id: "website", label: "Official Website", url: OFFICIAL.website },
  { id: "adj", label: "Art Digital Journey", url: OFFICIAL.adj },
  { id: "ihg_rewards", label: "IHG One Rewards", url: OFFICIAL.ihg },
  { id: "instagram", label: "Instagram", url: OFFICIAL.instagram },
  { id: "resort_map", label: "Resort Map", url: OFFICIAL.map },
  { id: "contact", label: "Contact", url: OFFICIAL.contact },
];
