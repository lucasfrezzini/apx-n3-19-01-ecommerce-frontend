"use client";

const OrdersListSkeleton = () => {
  return (
    <div className="space-y-6">
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
    </div>
  );
};

export default OrdersListSkeleton;