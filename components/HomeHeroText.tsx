"use client";

import Link from "next/link";
import { ArrowDownRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function HomeHeroText() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col justify-center gap-8 z-10">
      <h1 className="text-6xl md:text-8xl font-bold uppercase tracking-tighter leading-none text-ink">
        Plo<br/>cche
      </h1>
      
      <div className="max-w-md">
        {/* whitespace-pre-line allows \n in your dictionary to create line breaks */}
        <p className="font-mono text-sm md:text-base text-ink/70 leading-relaxed whitespace-pre-line">
          {t.home.subtitle}
        </p>
      </div>

      <div className="flex pt-4">
         <Link href="/shop" className="group bg-ink text-paper px-8 py-4 font-mono text-sm uppercase tracking-widest hover:bg-accent hover:text-ink transition-colors flex items-center gap-2">
           {t.home.cta}
           <ArrowDownRight size={16} className="group-hover:translate-x-1 transition-transform"/>
         </Link>
      </div>
    </div>
  );
}