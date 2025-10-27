import { Skeleton } from "@/shared/components";

export const DataTableSkeleton = () => {
  return (
    <Skeleton className="w-full rounded-lg p-4 mt-4 h-[800px]">
      <div className="flex justify-between">
        <Skeleton className="h-8 w-64 rounded-t-lg" />
        <Skeleton className="h-8 w-32 rounded-t-lg" />
      </div>
      <Skeleton className="h-full max-h-[700px] w-full rounded-t-lg my-4" />
      <Skeleton className="my-4 w-full rounded-lg" />
    </Skeleton>
  );
};
