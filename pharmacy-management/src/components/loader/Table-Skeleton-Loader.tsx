import { SkeletonLoader } from './Skeleton-Loader';

interface TableSkeletonLoaderProps {
  rows?: number;
  }

export const TableSkeletonLoader = ({
  rows,
}: TableSkeletonLoaderProps) => {
  return (
    <div className="w-full">
      {/* Table Header */}
      <div className="flex bg-gray-300 py-3 px-4 rounded-md">
        <SkeletonLoader height="h-6" width="w-1/6" className="mr-4" />
        <SkeletonLoader height="h-6" width="w-1/4" className="mr-4" />
        <SkeletonLoader height="h-6" width="w-1/5" className="mr-4" />
        <SkeletonLoader height="h-6" width="w-1/6" className="mr-4" />
        <SkeletonLoader height="h-6" width="w-1/6" />
      </div>

      {/* Table Rows */}
      {Array.from({ length: rows ?? 10 }, (_, index) => (
        <div
          key={index}
          className="flex items-center border-b border-gray-300 py-3 px-4"
        >
          <SkeletonLoader height="h-5" width="w-1/6" className="mr-4" />
          <SkeletonLoader height="h-5" width="w-1/4" className="mr-4" />
          <SkeletonLoader height="h-5" width="w-1/5" className="mr-4" />
          <SkeletonLoader height="h-5" width="w-1/6" className="mr-4" />
          <SkeletonLoader height="h-5" width="w-1/6" />
        </div>
      ))}
    </div>
  );
};
