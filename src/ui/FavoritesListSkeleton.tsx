"use client";

const FavoritesListSkeleton = () => {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex gap-4 border border-primary p-4">
          <div className="w-24 h-24 bg-foreground animate-pulse flex-shrink-0" />
          <div className="flex-1">
            <div className="h-5 w-48 bg-foreground animate-pulse mb-2" />
            <div className="h-4 w-24 bg-foreground animate-pulse mb-2" />
            <div className="h-4 w-20 bg-foreground animate-pulse" />
          </div>
          <div className="flex items-start">
            <div className="w-8 h-8 bg-foreground animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FavoritesListSkeleton;