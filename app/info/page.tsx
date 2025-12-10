import Link from "next/link";
import { Instagram, Mail, MapPin, Disc } from "lucide-react";

export default function InfoPage() {
  return (
    <div className="min-h-screen p-6 md:p-12 max-w-4xl mx-auto pt-32">
      
      {/* Header */}
      <h1 className="text-6xl md:text-8xl font-bold uppercase tracking-tighter mb-12 leading-none">
        Info &<br/>Contact
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 font-mono text-sm leading-relaxed">
        
        {/* Column 1: Contact */}
        <div className="space-y-12">
          
          <section>
            <h3 className="uppercase tracking-widest text-ink/40 mb-4 border-b border-ink/10 pb-2">Get in Touch</h3>
            <div className="flex flex-col gap-4">
              <Link 
                href="https://instagram.com/plocche" 
                target="_blank"
                className="flex items-center gap-3 hover:text-accent transition-colors group"
              >
                <Instagram size={18} />
                <span className="uppercase group-hover:translate-x-1 transition-transform">@plocche</span>
              </Link>
              
              <Link 
                href="mailto:hello@plocche.com" 
                className="flex items-center gap-3 hover:text-accent transition-colors group"
              >
                <Mail size={18} />
                <span className="uppercase group-hover:translate-x-1 transition-transform">hello@plocche.com</span>
              </Link>
            </div>
          </section>

          <section>
            <h3 className="uppercase tracking-widest text-ink/40 mb-4 border-b border-ink/10 pb-2">Locations</h3>
            <div className="flex items-start gap-3 text-ink/70">
               <MapPin size={18} className="shrink-0 mt-1" />
               <div className="uppercase">
                 <p>Sarajevo</p>
                 <p>Banja Luka</p>
                 <p>Mostar</p>
               </div>
            </div>
          </section>

        </div>

        {/* Column 2: Grading System (Crucial for Vinyl Shops) */}
        <div className="space-y-8">
           <section>
             <h3 className="uppercase tracking-widest text-ink/40 mb-4 border-b border-ink/10 pb-2">Grading System</h3>
             <p className="mb-4 text-ink/60 italic">We use the Goldmine Standard for grading our records.</p>
             
             <ul className="space-y-4">
               <li>
                 <span className="font-bold text-accent">M (Mint)</span>
                 <p className="text-ink/60">Absolutely perfect in every way. Never played.</p>
               </li>
               <li>
                 <span className="font-bold text-ink">NM (Near Mint)</span>
                 <p className="text-ink/60">A nearly perfect record. No obvious signs of wear.</p>
               </li>
               <li>
                 <span className="font-bold text-ink">VG+ (Very Good Plus)</span>
                 <p className="text-ink/60">Will show some signs that it was played and otherwise handled by a previous owner who took good care of it.</p>
               </li>
             </ul>
           </section>

           <section>
              <h3 className="uppercase tracking-widest text-ink/40 mb-4 border-b border-ink/10 pb-2">We Buy Records</h3>
              <p className="text-ink/80">
                 Have a collection to sell? We are always looking for well-cared-for collections in the Balkan region. Send us a DM on Instagram with photos.
              </p>
           </section>
        </div>

      </div>
    </div>
  );
}