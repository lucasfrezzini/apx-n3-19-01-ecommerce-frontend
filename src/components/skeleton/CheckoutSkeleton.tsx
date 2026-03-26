"use client";

const CheckoutSkeleton = () => {
  return (
    <main className="flex-1 space-y-6">
      <section className="border border-primary p-6">
        <div className="h-6 w-40 bg-foreground animate-pulse mb-4" />
        <div className="space-y-4">
          <div>
            <div className="h-4 w-20 bg-foreground animate-pulse mb-1" />
            <div className="h-8 w-full bg-foreground animate-pulse" />
          </div>
          <div>
            <div className="h-4 w-20 bg-foreground animate-pulse mb-1" />
            <div className="h-8 w-full bg-foreground animate-pulse" />
          </div>
          <div>
            <div className="h-4 w-20 bg-foreground animate-pulse mb-1" />
            <div className="h-8 w-full bg-foreground animate-pulse" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="h-4 w-24 bg-foreground animate-pulse mb-1" />
              <div className="h-8 w-full bg-foreground animate-pulse" />
            </div>
            <div>
              <div className="h-4 w-20 bg-foreground animate-pulse mb-1" />
              <div className="h-8 w-full bg-foreground animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      <section className="border border-primary p-6">
        <div className="h-6 w-32 bg-foreground animate-pulse mb-4" />
        <div className="space-y-4 mb-6">
          <div className="flex gap-4">
            <div className="w-16 h-16 bg-foreground animate-pulse" />
            <div className="flex-1">
              <div className="h-4 w-32 bg-foreground animate-pulse mb-1" />
              <div className="h-3 w-16 bg-foreground animate-pulse" />
            </div>
            <div className="h-4 w-12 bg-foreground animate-pulse" />
          </div>
          <div className="flex gap-4">
            <div className="w-16 h-16 bg-foreground animate-pulse" />
            <div className="flex-1">
              <div className="h-4 w-32 bg-foreground animate-pulse mb-1" />
              <div className="h-3 w-16 bg-foreground animate-pulse" />
            </div>
            <div className="h-4 w-12 bg-foreground animate-pulse" />
          </div>
        </div>
        <div className="border-t border-primary pt-4">
          <div className="flex justify-between">
            <div className="h-5 w-16 bg-foreground animate-pulse" />
            <div className="h-5 w-20 bg-foreground animate-pulse" />
          </div>
        </div>
        <div className="h-10 w-full bg-foreground animate-pulse mt-6" />
      </section>
    </main>
  );
};

export default CheckoutSkeleton;