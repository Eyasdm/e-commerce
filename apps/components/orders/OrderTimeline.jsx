export default function OrderTimeline() {
  return (
    <div className="w-full flex items-center gap-6">
      <div className="flex-1 h-1 bg-blue-600 rounded-full relative">
        <span className="absolute -top-3 left-0 w-4 h-4 bg-blue-600 rounded-full"></span>
      </div>

      <div className="flex-1 h-1 bg-blue-600 rounded-full relative">
        <span className="absolute -top-3 left-0 w-4 h-4 bg-blue-600 rounded-full"></span>
      </div>

      <div className="flex-1 h-1 bg-blue-600 rounded-full relative">
        <span className="absolute -top-3 left-0 w-4 h-4 bg-blue-600 rounded-full"></span>
      </div>

      <div className="flex-1 h-1 bg-gray-300 rounded-full relative">
        <span className="absolute -top-3 left-0 w-4 h-4 bg-gray-300 rounded-full"></span>
      </div>
    </div>
  );
}
