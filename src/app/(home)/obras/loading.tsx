import { Skeleton } from "@/shared/components";

export default function LoadingArtworksPage() {
  return (
    <main className="bg-background text-foreground">
      {/* Hero Section Skeleton */}
      <section className="border-r px-4 pt-12 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-4">
          <Skeleton className="h-14 w-4/5 max-w-3xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full max-w-2xl" />
            <Skeleton className="h-4 w-5/6 max-w-xl" />
            <Skeleton className="h-4 w-3/4 max-w-lg" />
          </div>
          <div className="flex gap-4 pt-4">
            <Skeleton className="h-11 w-36 rounded-lg" />
            <Skeleton className="h-11 w-40 rounded-lg" />
          </div>
        </div>
      </section>

      {/* Artworks Bento Grid Skeleton */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid auto-rows-max grid-cols-1 gap-6 md:grid-cols-4">
            {/* Featured Large Artwork */}
            <Skeleton className="h-96 w-full rounded-lg md:col-span-2 md:row-span-2 md:h-[520px]" />

            {/* Top Right - Medium Card */}
            <div className="group border-border bg-card overflow-hidden border md:col-span-1">
              <Skeleton className="h-40 w-full" />
              <div className="space-y-2 p-4">
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-3 w-1/3" />
                <div className="flex items-center justify-between pt-2">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-8" />
                </div>
              </div>
            </div>

            {/* Middle Right - Small Card */}
            <div className="group bg-card flex flex-col justify-between p-4 md:col-span-1">
              <Skeleton className="mb-3 h-32 w-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-3 w-1/3" />
              </div>
            </div>

            {/* Bottom Right - Small Card */}
            <div className="group border-border bg-card flex flex-col justify-between border p-4 md:col-span-1">
              <Skeleton className="mb-3 h-32 w-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-3 w-1/3" />
              </div>
            </div>

            {/* Remaining Artwork Cards */}
            {Array.from({ length: 8 }).map((_, idx) => (
              <div
                key={idx}
                className={`group border-border bg-card overflow-hidden border transition ${
                  idx === 0 ? "md:col-span-2" : "md:col-span-1"
                }`}
              >
                <Skeleton
                  className={`w-full ${idx === 0 ? "h-48 md:h-64" : "h-40"}`}
                />
                <div className="space-y-2 p-4">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                  <Skeleton className="h-3 w-2/5" />
                  <div className="flex items-center justify-between pt-3">
                    <Skeleton className="h-4 w-16" />
                    <div className="flex gap-2">
                      <Skeleton className="h-4 w-6" />
                      <Skeleton className="h-4 w-6" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Load More Section Skeleton */}
      <section className="border-border border-t px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-3 text-center">
          <Skeleton className="mx-auto h-11 w-48" />
          <Skeleton className="mx-auto h-4 w-64" />
        </div>
      </section>
    </main>
  );
}
