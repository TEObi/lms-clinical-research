export default function CoursesLoading() {
  return (
    <div className="animate-pulse">
      {/* Hero */}
      <div className="bg-[#0d2233] py-14 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="h-4 bg-white/10 rounded w-24 mb-3" />
          <div className="h-9 bg-white/20 rounded w-64 mb-3" />
          <div className="h-5 bg-white/10 rounded w-96" />
        </div>
      </div>
      {/* Grid */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="h-44 bg-gray-200" />
              <div className="p-4 space-y-3">
                <div className="h-5 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-100 rounded w-full" />
                <div className="h-4 bg-gray-100 rounded w-5/6" />
                <div className="h-10 bg-gray-200 rounded-lg w-full mt-2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
