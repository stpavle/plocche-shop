export default function Loading() {
  return (
    <div className="min-h-screen p-6 md:p-12 max-w-7xl mx-auto pt-32 animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
        
        {/* Left: Image Skeleton */}
        <div className="aspect-square bg-ink/5 w-full border border-ink/10" />

        {/* Right: Text Skeleton */}
        <div className="flex flex-col gap-6">
           <div className="h-4 w-32 bg-ink/10" /> {/* Artist */}
           <div className="h-16 w-3/4 bg-ink/10" /> {/* Title */}
           
           <div className="flex gap-4">
             <div className="h-8 w-20 bg-ink/10" />
             <div className="h-8 w-20 bg-ink/10" />
           </div>

           <div className="space-y-2 mt-8">
             <div className="h-4 w-full bg-ink/5" />
             <div className="h-4 w-full bg-ink/5" />
             <div className="h-4 w-2/3 bg-ink/5" />
           </div>
        </div>
      </div>
    </div>
  );
}