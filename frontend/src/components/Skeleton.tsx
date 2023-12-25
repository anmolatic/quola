import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonImageUpload() {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full bg-white " />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px] bg-white" />
        <Skeleton className="h-4 w-[200px] bg-white" />
      </div>
    </div>
  );
}
