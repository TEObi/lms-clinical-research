export default function CourseDetailLoading() {
  return (
    <div className="animate-pulse">
      {/* Hero skeleton */}
      <div className="bg-[#0d2233] py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="h-4 bg-white/10 rounded w-32 mb-4" />
          <div className="h-9 bg-white/20 rounded w-3/4 mb-3" />
          <div className="h-5 bg-white/10 rounded w-1/2 mb-6" />
          <div className="flex gap-4 flex-wrap">
            <div className="h-6 bg-white/10 rounded w-24" />
            <div className="h-6 bg-white/10 rounded w-24" />
            <div className="h-6 bg-white/10 rounded w-24" />
          </div>
        </div>
      </div>

      {/* Body skeleton */}
      <div className="max-w-5xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="h-6 bg-gray-200 rounded w-48" />
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-5/6" />
            <div className="h-4 bg-gray-200 rounded w-4/6" />
          </div>
          {/* Module skeletons */}
          {[1, 2, 3].map((i) => (
            <div key={i} className="border border-gray-200 rounded-xl p-4 space-y-2">
              <div className="h-5 bg-gray-200 rounded w-2/3" />
              <div className="h-4 bg-gray-100 rounded w-1/2" />
            </div>
          ))}
        </div>

        {/* Right sidebar */}
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-xl p-5 space-y-4">
            <div className="h-8 bg-gray-200 rounded w-28" />
            <div className="h-11 bg-gray-300 rounded-lg w-full" />
            <div className="space-y-2">
              <div className="h-4 bg-gray-100 rounded w-full" />
              <div className="h-4 bg-gray-100 rounded w-3/4" />
              <div className="h-4 bg-gray-100 rounded w-2/3" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
