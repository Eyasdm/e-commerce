import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function OrderCard({ id, date, status, total, payment }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h3 className="font-semibold text-lg">#{id}</h3>

          <span className="text-sm text-gray-400">{date}</span>

          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
            {status}
          </span>
        </div>

        <span className="font-semibold text-lg">${total}</span>
      </div>

      <hr className="border-t border-gray-200/70" />

      {/* Products */}
      <div className="flex gap-3">
        <ProductImg src="/products/headphones.png" />
        <ProductImg src="/products/powerbank.png" />
        <ProductImg src="/products/keyboard.png" />
        <ProductImg src="/products/charger.png" />
      </div>

      <hr className="border-t border-gray-200/70" />

      {/* Footer */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">{payment}</span>

        <div className="flex items-center gap-4">
          <span className="font-medium">Total ${total}</span>

          <Button className="rounded-full">View Details</Button>
        </div>
      </div>
    </div>
  );
}

function ProductImg({ src }) {
  return (
    <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center">
      <Image src={src} alt="" width={40} height={40} />
    </div>
  );
}
