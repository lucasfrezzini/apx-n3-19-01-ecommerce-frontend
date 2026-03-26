"use client";

const OrdersSkeleton = () => {
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

        <main className="flex-1 space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border border-primary p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="h-5 w-32 bg-foreground animate-pulse mb-2" />
                  <div className="h-4 w-24 bg-foreground animate-pulse" />
                </div>
                <div className="h-6 w-20 bg-foreground animate-pulse" />
              </div>

              <div className="space-y-4">
                {[1, 2].map((j) => (
                  <div key={j} className="flex gap-4">
                    <div className="w-16 h-16 bg-foreground animate-pulse" />
                    <div className="flex-1">
                      <div className="h-4 w-40 bg-foreground animate-pulse mb-2" />
                      <div className="h-3 w-20 bg-foreground animate-pulse" />
                    </div>
                    <div className="h-4 w-16 bg-foreground animate-pulse" />
                  </div>
                ))}
              </div>

              <div className="border-t border-primary mt-4 pt-4 flex justify-between">
                <div className="h-4 w-12 bg-foreground animate-pulse" />
                <div className="h-4 w-20 bg-foreground animate-pulse" />
              </div>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
};

export default OrdersSkeleton;