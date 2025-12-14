import Image from "next/image";

interface VinylProps {
  title?: string;
  artist?: string;
  price?: string;
  color?: string;
  imageUrl?: string; 
  stock?: number;
  // NOTE: isScrolling prop has been removed to revert to original state
}

export default function VinylDisplay({ 
  title = "Unknown Artist", 
  artist = "Sarajevo Sessions", 
  price = "35 KM",
  // Default color is set to black to match the current monochrome design
  color = "#1A1A1A", 
  imageUrl,
  stock = 1,
}: VinylProps) {
  
  const isSoldOut = stock === 0;

  return (
    <div className="group relative w-64 h-64 md:w-72 md:h-72 cursor-pointer mx-auto">
      
      {/* 1. The Vinyl Disc - Now ONLY controlled by hover */}
      <div className={`absolute top-2 right-2 w-[90%] h-[90%] rounded-full bg-black flex items-center justify-center transition-transform duration-500 ease-out shadow-xl ${!isSoldOut ? 'group-hover:translate-x-12 group-hover:rotate-90' : ''}`}>
        <div className="w-1/3 h-1/3 rounded-full flex items-center justify-center" style={{ backgroundColor: color }}>
          <div className="w-2 h-2 bg-black rounded-full"></div>
        </div>
        <div className="absolute inset-0 rounded-full border-4 border-white/5"></div>
        <div className="absolute inset-4 rounded-full border border-white/5"></div>
      </div>

      {/* 2. The Album Cover */}
      <div className={`relative w-full h-full border border-ink/10 shadow-lg z-10 overflow-hidden flex flex-col justify-between p-4 transition-transform duration-300 bg-paper ${!isSoldOut ? 'group-hover:-translate-y-1' : ''}`}>
        
        {/* SOLD OUT OVERLAY */}
        {isSoldOut && (
            <div className="absolute inset-0 z-50 bg-paper/60 backdrop-blur-[2px] flex items-center justify-center">
                <span className="bg-ink text-paper px-4 py-2 font-mono font-bold uppercase tracking-widest text-sm -rotate-12 border border-paper">
                    Sold Out
                </span>
            </div>
        )}

        <div className="flex justify-between items-start relative z-20">
          <span className="font-mono text-xs uppercase tracking-widest text-ink/60 bg-paper/80 backdrop-blur-sm px-1">Stereo</span>
          <span className="font-mono text-xs font-bold text-ink bg-paper/80 backdrop-blur-sm px-1">{price}</span>
        </div>

        {/* IMAGE LOGIC - Fixed SVG for rendering stability */}
        <div className="absolute inset-0 z-0">
            {imageUrl ? (
                <Image 
                    src={imageUrl} 
                    alt={title}
                    fill
                    className={`object-cover opacity-90 mix-blend-multiply grayscale contrast-125 transition-all duration-500 ease-in-out ${!isSoldOut && 'group-hover:grayscale-0 group-hover:opacity-100 group-hover:contrast-100'}`}
                />
            ) : (
                <div className="w-full h-full opacity-10 mix-blend-multiply pointer-events-none">
                    <svg width="100%" height="100%">
                        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="1"/>
                        </pattern>
                        {/* Ensure rect is correctly closed */}
                        <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>
                </div>
            )}
        </div>

        <div className="relative z-20 bg-paper/80 backdrop-blur-sm p-1 inline-block mt-auto w-fit">
          <h3 className="font-bold uppercase text-2xl leading-none break-words hyphens-auto">{title}</h3>
          <p className="font-mono text-xs mt-2 text-ink/60 uppercase">{artist}</p>
        </div>
      </div>
    </div>
  );
}