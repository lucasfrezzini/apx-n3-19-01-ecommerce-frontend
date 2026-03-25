"use client";

const FavoritesSkeleton = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 mt-[49px]">
      <div className="h-8 w-32 bg-foreground animate-pulse mb-8" />

      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="border border-primary p-4">
            <div className="space-y-1">
              <div className="flex items-center gap-3 px-4 py-3 rounded hover:bg-primary/10">
                <div className="h-4 w-4 bg-foreground animate-pulse" />
                <div className="h-4 w-20 bg-foreground animate-pulse" />
              </div>
              <div className="flex items-center gap-3 px-4 py-3 rounded hover:bg-primary/10">
                <div className="h-4 w-4 bg-foreground animate-pulse" />
                <div className="h-4 w-20 bg-foreground animate-pulse" />
              </div>
              <div className="flex items-center gap-3 px-4 py-3 rounded hover:bg-primary/10">
                <div className="h-4 w-4 bg-foreground animate-pulse" />
                <div className="h-4 w-20 bg-foreground animate-pulse" />
              </div>
              <div className="flex items-center gap-3 px-4 py-3 rounded hover:bg-primary/10">
                <div className="h-4 w-4 bg-foreground animate-pulse" />
                <div className="h-4 w-20 bg-foreground animate-pulse" />
              </div>
              <div className="border-t border-primary mt-4 pt-4">
                <div className="flex items-center gap-3 px-4 py-3 w-full rounded text-red-600 hover:bg-red-50 transition-colors">
                  <div className="h-4 w-4 bg-foreground animate-pulse" />
                  <div className="h-4 w-20 bg-foreground animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </aside>

        <main className="flex-1 space-y-4">
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
        </main>
      </div>
    </div>
  );
};

export default FavoritesSkeleton;