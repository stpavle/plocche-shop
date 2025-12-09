"use client";

import { useLanguage } from "../context/LanguageContext";

export default function HomeFooter() {
  const { t } = useLanguage();

  return (
    <footer className="py-6 border-t border-ink/10 mt-20 flex flex-col md:flex-row justify-between md:items-end font-mono text-xs uppercase gap-4">
      <div className="flex flex-col gap-1">
        <span>{t.footer.locations}</span>
      </div>
      <div className="md:text-right text-ink/50">
        <span>{t.footer.rights}</span>
      </div>
    </footer>
  );
}