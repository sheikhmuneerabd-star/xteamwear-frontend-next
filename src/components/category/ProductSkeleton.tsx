export default function ProductSkeleton({ grid }: { grid: number }) {
  const count = grid === 1 ? 4 : grid === 2 ? 6 : 9;

  return (
    <div
      className={`grid ${grid === 1 ? "grid-cols-1" : ""} ${grid === 2 ? "grid-cols-2" : ""} ${
        grid === 3 ? "grid-cols-3" : ""
      } w-full gap-4 mt-10`}
    >
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={grid === 1 ? "flex gap-4" : "space-y-3"}>
          <div className={`bg-gray-200 animate-pulse rounded-md ${grid === 1 ? "w-[220px] h-[280px] shrink-0" : "aspect-[4/5] w-full"}`} />
          <div className={grid === 1 ? "flex-1 space-y-2 pt-2" : "space-y-2"}>
            <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4" />
            <div className="h-3 bg-gray-200 animate-pulse rounded w-1/2" />
            <div className="h-4 bg-gray-200 animate-pulse rounded w-1/3" />
          </div>
        </div>
      ))}
    </div>
  );
}