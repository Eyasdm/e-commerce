import { Star } from "lucide-react";

export function Review({ name, rating, comment }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold">{name}</h4>

        <div className="flex text-yellow-400">
          {[...Array(rating)].map((_, i) => (
            <Star key={i} size={16} fill="#facc15" stroke="#facc15" />
          ))}
        </div>
      </div>

      <p className="text-gray-600 text-sm">{comment}</p>
    </div>
  );
}
