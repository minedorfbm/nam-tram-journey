import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { Check, ChevronDown } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  ACTION,
  CLUSTER,
  LANGUAGES,
  LEVEL_LABEL,
  LEVEL_LINE,
  LINK_LABEL,
  TYPE_LABEL,
  UI,
  type Lang,
  type UIKey,
} from "./dictionary";
import { DESTINATION_DESCRIPTION } from "./destinations";

const STORAGE_KEY = "adj-lang";

interface I18nValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: UIKey) => string;
  levelLine: (id: string, fallback: string) => string;
  levelLabel: (id: string) => string;
  cluster: (c: string) => string;
  typeLabel: (t: string) => string;
  action: (a: string) => string;
  linkLabel: (l: string) => string;
  description: (id: string, fallback: string) => string;
}

const I18nContext = createContext<I18nValue | null>(null);

function isLang(v: string | null): v is Lang {
  return !!v && LANGUAGES.some((l) => l.code === v);
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  // English by default; a previous choice or the device language is restored after hydration.
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (isLang(stored)) {
      setLangState(stored);
      return;
    }
    const nav = navigator.language.slice(0, 2).toLowerCase();
    const guess = nav === "vi" ? "vi" : nav === "ru" ? "ru" : nav === "zh" ? "zh" : null;
    if (guess) setLangState(guess);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    localStorage.setItem(STORAGE_KEY, l);
  }, []);

  const value = useMemo<I18nValue>(
    () => ({
      lang,
      setLang,
      t: (key) => UI[lang][key],
      levelLine: (id, fallback) => LEVEL_LINE[lang][id] ?? fallback,
      levelLabel: (id) => LEVEL_LABEL[lang][id] ?? id.toUpperCase(),
      cluster: (c) => CLUSTER[lang][c] ?? c,
      typeLabel: (t) => TYPE_LABEL[lang][t] ?? t.toUpperCase(),
      action: (a) => ACTION[lang][a] ?? a,
      linkLabel: (l) => LINK_LABEL[lang][l] ?? l,
      description: (id, fallback) =>
        lang === "en" ? fallback : (DESTINATION_DESCRIPTION[lang][id] ?? fallback),
    }),
    [lang, setLang],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}

/** Discreet language selector, fixed at the top-right of the journey. */
export function LanguageSwitch() {
  const { lang, setLang, t } = useI18n();

  return (
    <nav
      aria-label={t("language")}
      className="fixed right-3 top-3 z-50 flex items-center gap-1 rounded-full border border-[oklch(0.78_0.11_85/0.2)] bg-[oklch(0.16_0.03_250/0.32)] px-1.5 py-1 backdrop-blur-md max-[360px]:right-2"
    >
      {LANGUAGES.map(({ code, label, name }) => (
        <button
          key={code}
          onClick={() => setLang(code)}
          aria-label={name}
          aria-current={lang === code}
          className={`rounded-full px-2 py-0.5 text-[9px] tracking-[0.18em] transition-opacity ${
            lang === code
              ? "bg-[oklch(0.78_0.11_85/0.16)] text-[oklch(0.86_0.1_85)] opacity-100"
              : "text-[oklch(0.92_0.01_90)] opacity-45 hover:opacity-80"
          }`}
        >
          {label}
        </button>
      ))}
    </nav>
  );
}
