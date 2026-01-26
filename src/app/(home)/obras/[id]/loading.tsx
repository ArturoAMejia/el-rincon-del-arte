import { Skeleton } from "@/shared/components";

export default function LoadingArtworkDetailPage() {
  return (
    <main className="bg-background text-foreground">
      <div className="px-4 pt-12 pb-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl items-center gap-2">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>

      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Skeleton className="bg-secondary mb-8 aspect-square w-full rounded-lg lg:aspect-auto lg:h-[600px]" />

              <div className="mb-12 flex gap-4">
                <Skeleton className="h-11 flex-1 rounded-lg" />
                <Skeleton className="h-11 flex-1 rounded-lg" />
              </div>

              <div className="mb-12 space-y-4">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-2/3" />
              </div>

              <div className="space-y-6">
                <Skeleton className="h-7 w-48" />
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="space-y-2">
                      <Skeleton className="bg-secondary mb-2 h-48 w-full rounded-lg" />
                      <Skeleton className="h-5 w-32" />
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-card border-border sticky top-24 space-y-8 rounded-lg border p-8">
                <div className="space-y-3">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-10 w-40" />
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-2 w-2 rounded-full" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>

                <div className="border-border space-y-4 border-b pb-8">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="space-y-2">
                      <Skeleton className="h-3 w-24" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <Skeleton className="h-11 w-full rounded-lg" />
                </div>

                <div className="border-border space-y-3 border-t pt-8">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
