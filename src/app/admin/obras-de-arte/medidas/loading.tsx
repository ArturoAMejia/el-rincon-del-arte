import { Skeleton } from "@/shared/components";
import { DataTableSkeleton } from "@/shared/components/data-table";

export default function Loading() {
  return (
    <div className="gap-4">
      <div className="">
        <Skeleton className="mb-4 h-[32px] w-[120px] rounded-lg" />
        <Skeleton className="h-[24px] w-[200px] rounded-lg" />
      </div>
      <DataTableSkeleton />
    </div>
  );
}
