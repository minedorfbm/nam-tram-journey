import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Phone } from "lucide-react";
import { LevelChapter } from "@/components/hub/LevelChapter";
import { NamTramRail } from "@/components/hub/NamTramRail";
import { type Level } from "@/data/resort";
import { HubProvider, useHub } from "@/data/hub-context";
import { getHubData } from "@/lib/hub.functions";
import heavenImg from "@/assets/heaven.jpg";

export const Route = createFileRoute("/")({
  loader: () => getHubData(),
  head: () => ({
    meta: [
      { title: "InterContinental Danang — Digital Hub | Heaven to Sea" },
      {
        name: "description",
        content:
          "Descend through InterContinental Danang Sun Peninsula Resort — Heaven, Sky, Earth and Sea. Dining, spa, beaches and experiences in one immersive mobile journey.",
      },
      { property: "og:title", content: "InterContinental Danang — Digital Hub" },
      {
        property: "og:description",
        content:
          "A digital descent through the resort: Heaven, Sky, Earth, Sea. By Art Digital Journey.",
      },
    ],
  }),
  component: HubRoute,
});

function HubRoute() {
  const data = Route.useLoaderData();
  return (
    <HubProvider data={data}>
      <Hub />
    </HubProvider>
  );
}

function Hub() {
  const [active, setActive] = useState<Level>("heaven");
  const [progress, setProgress] = useState(0);
  const journeyRef = useRef<HTMLDivElement>(null);
  const { levels, links, contact } = useHub();

  useEffect(() => {
    // Continuous descent progress for the gold rail fill
    const onScroll = () => {
      const el = journeyRef.current;
      if (!el) return;
      const top = el.offsetTop;
      const p = (window.scrollY + window.innerHeight * 0.5 - top) / el.offsetHeight;
      setProgress(Math.min(1, Math.max(0, p)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Active station detection via IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id as Level);
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    for (const l of levels) {
      const node = document.getElementById(l.id);
      if (node) observer.observe(node);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, [levels]);

  const jump = (level: Level) =>
    document.getElementById(level)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <main className="bg-background text-foreground">
      <NamTramRail active={active} progress={progress} onJump={jump} />

      {/* THRESHOLD */}
      <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden">
        <img
          src={heavenImg}
          alt="InterContinental Danang Sun Peninsula Resort seen from above the bay"
          width={900}
          height={1400}
          className="threshold-img absolute inset-0 h-full w-full object-cover opacity-[0.6]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.99_0.005_90/0.82)] via-[oklch(0.99_0.005_90/0.35)] to-[oklch(0.985_0.008_90/0.98)]" />
        <div className="grain pointer-events-none absolute inset-0" aria-hidden />

        <button
          onClick={() => jump("heaven")}
          className="relative flex flex-col items-center gap-6 px-6 text-center"
        >
          <span className="reveal text-[10px] tracking-[0.46em] opacity-55 [animation-delay:120ms]">
            SUN PENINSULA · DA NANG
          </span>
          <h1 className="reveal font-serif text-[clamp(40px,13vw,68px)] leading-[0.92] tracking-[-0.02em] [animation-delay:260ms]">
            Begin
            <br />
            the Descent
          </h1>
          <span className="reveal line-drop h-24 w-px bg-current/40 [animation-delay:520ms]" aria-hidden />
          <span className="reveal text-[9px] tracking-[0.42em] opacity-50 [animation-delay:680ms]">
            FROM HEAVEN TO SEA
          </span>
        </button>
      </section>


      {/* THE DESCENT */}
      <div ref={journeyRef}>
        {levels.map((l) => (
          <LevelChapter key={l.id} {...l} />
        ))}
      </div>

      {/* END OF JOURNEY */}
      <section className="bg-[oklch(0.16_0.03_250)] px-6 py-24 text-[oklch(0.96_0.005_90)]">
        <h2 className="font-serif text-[30px] leading-tight tracking-tight">
          All of InterContinental Danang
        </h2>
        <ul className="mt-8 flex flex-col divide-y divide-current/10 border-y border-current/10">
          {links.map(({ label, url }) => (
            <li key={label}>
              <a
                href={url}
                target={label === "Contact" ? undefined : "_blank"}
                rel={label === "Contact" ? undefined : "noreferrer"}
                className="flex items-center justify-between py-3 text-[11px] tracking-[0.22em]"
              >
                {label.toUpperCase()}
                <span className="opacity-40">↗</span>
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-16 text-[9px] tracking-[0.3em] opacity-40">
          DIGITAL EXPERIENCE BY ART DIGITAL JOURNEY
        </p>
      </section>

      {/* FIXED CONCIERGE BUTTON */}
      <a
        href={contact}
        aria-label="Call concierge"
        className="fixed bottom-5 right-3 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-[oklch(0.78_0.11_85/0.55)] bg-[oklch(0.16_0.03_250/0.78)] text-[oklch(0.78_0.11_85/0.85)] shadow-[0_4px_14px_oklch(0.16_0.03_250/0.22)] backdrop-blur-md transition-all duration-300 ease-out hover:scale-105 hover:border-[oklch(0.78_0.11_85/0.85)] hover:bg-[oklch(0.16_0.03_250/0.88)] active:scale-95"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <Phone size={17} strokeWidth={1.4} />
      </a>
    </main>
  );
}
