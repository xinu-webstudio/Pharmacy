import React from 'react';

interface SkeletonLoaderProps {
  height: string;
  width: string;
  className?: string; // Optional className prop
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  height,
  width,
  className,
}) => {
  return (
    <div
      className={`animate-pulse ${width} ${height} bg-gray-200 rounded-md ${className}`}
    />
  );
};
