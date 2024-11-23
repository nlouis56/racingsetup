// src/components/Dashboard/LoaderSkeleton.tsx
type LoaderSkeletonProps = {
  count: number
}

export default function LoaderSkeleton({ count }: LoaderSkeletonProps) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="p-4 bg-gray-700 rounded-lg animate-pulse"
        >
          <div className="w-3/4 h-4 bg-gray-600 rounded-md"></div>
          <div className="w-1/2 h-4 mt-2 bg-gray-600 rounded-md"></div>
          <div className="w-1/3 h-4 mt-2 bg-gray-600 rounded-md"></div>
        </div>
      ))}
    </div>
  )
}
