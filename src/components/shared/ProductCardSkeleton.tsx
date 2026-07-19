export default function ProductCardSkeleton() {
  return (
    <div className="space-y-3">
      <div className="bg-gray-200 animate-pulse rounded-md aspect-[4/5] w-full" />
      <div className="space-y-2 px-1">
        <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4" />
        <div className="h-3 bg-gray-200 animate-pulse rounded w-1/2" />
        <div className="h-4 bg-gray-200 animate-pulse rounded w-1/3" />
        <div className="flex gap-1.5 pt-1">
          <div className="w-6 h-6 rounded-full bg-gray-200 animate-pulse" />
          <div className="w-6 h-6 rounded-full bg-gray-200 animate-pulse" />
          <div className="w-6 h-6 rounded-full bg-gray-200 animate-pulse" />
        </div>
      </div>
    </div>
  );
}