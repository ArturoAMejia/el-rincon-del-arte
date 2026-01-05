import { Skeleton } from "@/shared/components";
import { DataTableSkeleton } from "@/shared/components/data-table";

export default function Loading() {
  return (
    <div className="gap-4">
      <div className="">
        <Skeleton className="h-[32px] w-[120px] rounded-lg mb-4" />
        <Skeleton className="h-[24px] w-[200px] rounded-lg" />
      </div>
      <DataTableSkeleton />
    </div>
  );
}
