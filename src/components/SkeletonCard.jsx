import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[249px] w-[321px] rounded-xl" />
      <div className="space-y-2"></div>
    </div>
  );
}
