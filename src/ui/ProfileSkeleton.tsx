"use client";

const ProfileSkeleton = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 mt-[49px]">
      {/* Header */}
      <div className="h-8 w-32 bg-foreground animate-pulse mb-8" />

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Skeleton */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="border border-primary p-4">
            {/* Sidebar items skeleton */}
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
            </div>
            
            {/* Exit button skeleton */}
            <div className="border-t border-primary mt-4 pt-4">
              <div className="flex items-center gap-3 px-4 py-3 w-full rounded text-red-600 hover:bg-red-50 transition-colors">
                <div className="h-4 w-4 bg-foreground animate-pulse" />
                <div className="h-4 w-20 bg-foreground animate-pulse" />
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Skeleton */}
        <main className="flex-1 space-y-8">
          {/* Personal Information Section */}
          <section className="border border-primary p-6">
            <div className="h-6 w-36 bg-foreground animate-pulse mb-4" />
            <div className="space-y-4">
              {/* Email (disabled) */}
              <div>
                <div className="h-4 w-40 bg-foreground animate-pulse" />
              </div>
              
              {/* Name */}
              <div>
                <div className="h-4 w-48 bg-foreground animate-pulse" />
              </div>
              
              {/* Phone */}
              <div>
                <div className="h-4 w-48 bg-foreground animate-pulse" />
              </div>
              
              {/* Avatar URL */}
              <div className="space-y-2">
                <div className="h-4 w-64 bg-foreground animate-pulse" />
                <div className="mt-2">
                  <div className="w-16 h-16 bg-foreground animate-pulse rounded-full" />
                </div>
              </div>
            </div>
          </section>

          {/* Shipping Address Section */}
          <section className="border border-primary p-6">
            <div className="h-6 w-32 bg-foreground animate-pulse mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Street (full width on md) */}
              <div className="md:col-span-2">
                <div className="h-4 w-full bg-foreground animate-pulse" />
              </div>
              
              {/* City */}
              <div>
                <div className="h-4 w-full bg-foreground animate-pulse" />
              </div>
              
              {/* State/Province */}
              <div>
                <div className="h-4 w-full bg-foreground animate-pulse" />
              </div>
              
              {/* Postal Code */}
              <div>
                <div className="h-4 w-full bg-foreground animate-pulse" />
              </div>
              
              {/* Country */}
              <div>
                <div className="h-4 w-full bg-foreground animate-pulse" />
              </div>
            </div>
          </section>

          {/* Save Button Skeleton */}
          <div className="w-full md:w-auto">
            <div className="h-10 w-32 bg-foreground animate-pulse" />
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProfileSkeleton;