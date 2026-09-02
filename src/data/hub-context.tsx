import { createContext, useContext, useMemo, type ReactNode } from "react";
import {
  ASSET_BY_KEY,
  DESTINATIONS,
  LEVELS,
  OFFICIAL,
  toDestination,
  type Destination,
  type Level,
} from "@/data/resort";
import type { HubData } from "@/lib/hub.functions";

export interface HubLevel {
  id: Level;
  title: string;
  line: string;
  image: string;
  clusters?: string[];
}

interface HubValue {
  levels: HubLevel[];
  destinations: Destination[];
  links: { label: string; url: string }[];
  contact: string;
}

const FALLBACK_LINKS = [
  ["Website", OFFICIAL.website],
  ["Instagram", OFFICIAL.instagram],
  ["Dining", OFFICIAL.dining],
  ["Spa", OFFICIAL.spa],
  ["IHG One Rewards", OFFICIAL.ihg],
  ["Resort Map", OFFICIAL.map],
  ["Contact", OFFICIAL.contact],
] as [string, string][];

const FALLBACK: HubValue = {
  levels: LEVELS,
  destinations: DESTINATIONS,
  links: FALLBACK_LINKS.map(([label, url]) => ({ label, url })),
  contact: OFFICIAL.contact,
};

const HubContext = createContext<HubValue>(FALLBACK);

/** Database content, with the bundled editorial data as a safety net. */
export function HubProvider({ data, children }: { data?: HubData; children: ReactNode }) {
  const value = useMemo<HubValue>(() => {
    if (!data || data.levels.length === 0 || data.destinations.length === 0) return FALLBACK;

    const levels: HubLevel[] = data.levels.map((l) => ({
      id: l.id as Level,
      title: l.title,
      line: l.line,
      image:
        (l.image_key ? ASSET_BY_KEY[l.image_key] : undefined) ??
        LEVELS.find((x) => x.id === l.id)?.image ??
        "",
      ...(l.clusters.length > 0 ? { clusters: l.clusters } : {}),
    }));

    const s = data.settings;
    const links = (
      [
        ["Website", s["website"]],
        ["Instagram", s["instagram"]],
        ["Dining", s["dining"]],
        ["Spa", s["spa"]],
        ["IHG One Rewards", s["ihg"]],
        ["Resort Map", s["map"]],
        ["Contact", s["contact"]],
      ] as [string, string | undefined][]
    )
      .filter((entry): entry is [string, string] => Boolean(entry[1]))
      .map(([label, url]) => ({ label, url }));

    return {
      levels,
      destinations: data.destinations.map(toDestination),
      links: links.length > 0 ? links : FALLBACK.links,
      contact: s["contact"] ?? OFFICIAL.contact,
    };
  }, [data]);

  return <HubContext.Provider value={value}>{children}</HubContext.Provider>;
}

export function useHub() {
  return useContext(HubContext);
}
