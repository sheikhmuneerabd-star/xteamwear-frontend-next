export default function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-3 shadow-sm space-y-3 animate-pulse">
      {/* Image Skeleton */}
      <div className="bg-slate-200/70 rounded-xl aspect-[4/5] w-full" />

      {/* Details Skeleton */}
      <div className="space-y-2.5 px-1 pt-1">
        <div className="h-4 bg-slate-200/70 rounded-md w-3/4" />
        <div className="h-3 bg-slate-200/70 rounded-md w-1/2" />
        
        <div className="flex items-center justify-between pt-1">
          <div className="h-5 bg-slate-200/70 rounded-md w-1/3" />
          
          {/* Swatches Skeleton */}
          <div className="flex gap-1">
            <div className="w-4 h-4 rounded-full bg-slate-200/70" />
            <div className="w-4 h-4 rounded-full bg-slate-200/70" />
            <div className="w-4 h-4 rounded-full bg-slate-200/70" />
          </div>
        </div>
      </div>
    </div>
  );
}