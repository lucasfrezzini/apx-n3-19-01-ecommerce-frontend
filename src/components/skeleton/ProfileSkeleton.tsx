"use client";

const ProfileSkeleton = () => {
  return (
    <main className="flex-1 space-y-8">
      <section className="border border-primary p-6">
        <div className="h-6 w-36 bg-foreground animate-pulse mb-4" />
        <div className="space-y-4">
          <div>
            <div className="h-4 w-40 bg-foreground animate-pulse" />
          </div>

          <div>
            <div className="h-4 w-48 bg-foreground animate-pulse" />
          </div>

          <div>
            <div className="h-4 w-48 bg-foreground animate-pulse" />
          </div>

          <div className="space-y-2">
            <div className="h-4 w-64 bg-foreground animate-pulse" />
            <div className="mt-2">
              <div className="w-16 h-16 bg-foreground animate-pulse rounded-full" />
            </div>
          </div>
        </div>
      </section>

      <section className="border border-primary p-6">
        <div className="h-6 w-32 bg-foreground animate-pulse mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <div className="h-4 w-full bg-foreground animate-pulse" />
          </div>

          <div>
            <div className="h-4 w-full bg-foreground animate-pulse" />
          </div>

          <div>
            <div className="h-4 w-full bg-foreground animate-pulse" />
          </div>

          <div>
            <div className="h-4 w-full bg-foreground animate-pulse" />
          </div>

          <div>
            <div className="h-4 w-full bg-foreground animate-pulse" />
          </div>
        </div>
      </section>

      <div className="w-full md:w-auto">
        <div className="h-10 w-32 bg-foreground animate-pulse" />
      </div>
    </main>
  );
};

export default ProfileSkeleton;