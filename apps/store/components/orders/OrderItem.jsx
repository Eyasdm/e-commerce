import Image from "next/image";

export default function OrderItem({ image, name, price, qty, total }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center">
          <Image src={image} alt="" width={40} height={40} />
        </div>

        <span className="font-medium">{name}</span>
      </div>

      <div className="flex gap-10 text-gray-600">
        <span>{price}</span>
        <span>{qty}</span>
        <span className="font-semibold">{total}</span>
      </div>
    </div>
  );
}
