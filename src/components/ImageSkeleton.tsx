import { Skeleton } from "@/components/ui/skeleton";

function ImageCardSkeleton() {
  return (
    <div className="group relative shadow-2xl rounded-lg">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden lg:aspect-none group-hover:brightness-75 duration-200 delay-75 lg:h-80">
        <Skeleton className="h-full w-full object-cover object-center rounded-t-lg lg:h-full lg:w-full" />
      </div>
      <div className="mt-4 flex justify-between p-4">
        <div>
          <p>
            <Skeleton className="h-6 w-14 rounded-full" />
          </p>
          <p className="mt-1">
            <Skeleton className="h-6 w-20 rounded-full" />
          </p>
        </div>
        <Skeleton className="h-10 w-10 rounded-md" />
      </div>
    </div>
  );
}

export default function ImageSkeleton() {
  const imageCards = Array.from({ length: 20 }).map((_, index) => (
    <ImageCardSkeleton key={index} />
  ));

  return (
    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
      {imageCards}
    </div>
  );
}
