import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { LevelChapter } from "@/components/hub/LevelChapter";
import { NamTramRail } from "@/components/hub/NamTramRail";
import { GLOBAL_LINKS, LEVELS, OFFICIAL, type Level } from "@/data/resort";
import heavenImg from "@/assets/heaven.jpg";

export const Route = createFileRoute("/")({
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
  component: Hub,
});

function Hub() {
  const [active, setActive] = useState<Level>("heaven");
  const [progress, setProgress] = useState(0);
  const journeyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const el = journeyRef.current;
      if (!el) return;
      const top = el.offsetTop;
      const p = (window.scrollY + window.innerHeight * 0.5 - top) / el.offsetHeight;
      setProgress(Math.min(1, Math.max(0, p)));

      let current: Level = "heaven";
      for (const l of LEVELS) {
        const node = document.getElementById(l.id);
        if (node && node.getBoundingClientRect().top <= window.innerHeight * 0.45) {
          current = l.id;
        }
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const jump = (level: Level) =>
    document.getElementById(level)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <main className="bg-background text-foreground">
      <NamTramRail active={active} progress={progress} onJump={jump} />

      {/* ARRIVAL */}
      <section className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden">
        <img
          src={heavenImg}
          alt="InterContinental Danang Sun Peninsula Resort"
          width={900}
          height={1400}
          className="absolute inset-0 h-full w-full object-cover opacity-[0.55]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.99_0.005_90/0.75)] via-[oklch(0.99_0.005_90/0.4)] to-[oklch(0.99_0.005_90/0.95)]" />

        <header className="relative px-6 pt-16">
          <p className="text-[9px] tracking-[0.42em] opacity-60">SUN PENINSULA · DA NANG</p>
          <h1 className="mt-6 font-serif text-[clamp(38px,11vw,60px)] leading-[0.95] tracking-tight">
            InterContinental
            <br />
            Danang
          </h1>
          <p className="mt-5 max-w-[24ch] text-[13px] leading-relaxed opacity-65">
            A resort built on four levels. Scroll to descend from Heaven to Sea.
          </p>
        </header>

        <div className="relative px-6 pb-14">
          <ul className="flex flex-col divide-y divide-current/10 border-y border-current/10">
            {GLOBAL_LINKS.map((l) => (
              <li key={l.id}>
                <a
                  href={l.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between py-3 text-[11px] tracking-[0.22em]"
                >
                  {l.label.toUpperCase()}
                  <span className="opacity-40">↗</span>
                </a>
              </li>
            ))}
          </ul>

          <button
            onClick={() => jump("heaven")}
            className="mt-12 flex w-full flex-col items-center gap-3"
          >
            <span className="text-[10px] tracking-[0.4em]">BEGIN THE DESCENT</span>
            <span className="h-14 w-px bg-current/40" aria-hidden />
            <span className="text-[9px] tracking-[0.3em] opacity-50">FROM HEAVEN TO SEA</span>
          </button>
        </div>
      </section>

      {/* THE DESCENT */}
      <div ref={journeyRef}>
        {LEVELS.map((l) => (
          <LevelChapter key={l.id} {...l} />
        ))}
      </div>

      {/* END OF JOURNEY */}
      <section className="bg-[oklch(0.16_0.03_250)] px-6 py-24 text-[oklch(0.96_0.005_90)]">
        <h2 className="font-serif text-[30px] leading-tight tracking-tight">
          All of InterContinental Danang
        </h2>
        <ul className="mt-8 flex flex-col divide-y divide-current/10 border-y border-current/10">
          {([
            ["Website", OFFICIAL.website],
            ["Instagram", OFFICIAL.instagram],
            ["Dining", OFFICIAL.dining],
            ["Spa", OFFICIAL.spa],
            ["IHG One Rewards", OFFICIAL.ihg],
            ["Resort Map", OFFICIAL.map],
            ["Contact", OFFICIAL.contact],
          ] as [string, string][]).map(([label, url]) => (
            <li key={label}>
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between py-3 text-[11px] tracking-[0.22em]"
              >
                {label.toUpperCase()}
                <span className="opacity-40">↗</span>
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-14 text-[9px] tracking-[0.3em] opacity-40">
          DIGITAL EXPERIENCE BY ART DIGITAL JOURNEY
        </p>
      </section>
    </main>
  );
}
