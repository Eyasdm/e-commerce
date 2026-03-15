import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function OrderSummaryCard() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
      {/* Title */}
      <h2 className="font-semibold text-lg">Order Summary</h2>

      {/* Products */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex gap-4 items-center">
            <Image
              src="/products/headphones.png"
              width={50}
              height={50}
              alt="product"
            />

            <div>
              <p className="font-medium text-sm">
                Wireless Noise-Cancelling Headphones
              </p>

              <p className="text-xs text-gray-500">Midnight Blue</p>
            </div>
          </div>

          <div className="text-right">
            <p className="font-semibold">$169</p>
            <p className="text-xs text-gray-400">15% OFF</p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-4 items-center">
            <Image
              src="/products/powerbank.png"
              width={50}
              height={50}
              alt="product"
            />

            <div>
              <p className="font-medium text-sm">Compact 10000mAh Power Bank</p>

              <p className="text-xs text-gray-500">White</p>
            </div>
          </div>

          <div className="text-right">
            <p className="font-semibold">$67</p>
            <p className="text-xs text-gray-400">x2</p>
          </div>
        </div>
      </div>

      <hr className="border-t border-gray-200/70 my-4" />

      {/* Payment */}
      <div className="flex justify-between text-sm">
        <div>
          <p className="font-medium">Payment Method</p>
          <p className="text-gray-500">VISA •••• 4242</p>
        </div>

        <p className="font-semibold">$100</p>
      </div>

      <hr className="border-t border-gray-200/70 my-4" />

      {/* Address */}
      <div className="text-sm">
        <p className="font-medium mb-1">Shipping Address</p>

        <p className="text-gray-500">John Doe</p>

        <p className="text-gray-500">123 Example St</p>

        <p className="text-gray-500">San Francisco, CA 94101, United States</p>
      </div>

      <hr className="border-t border-gray-200/70 my-4" />

      {/* Delivery */}
      <div className="flex justify-between text-sm">
        <div>
          <p className="font-medium">Estimated Delivery</p>

          <p className="text-gray-500">April 20, 2024 - April 23, 2024</p>
        </div>

        <p className="font-semibold text-lg">$322</p>
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <Button className="flex-1">Track Order</Button>

        <Button variant="outline" className="flex-1">
          Continue Shopping
        </Button>
      </div>

      {/* Email */}
      <p className="text-center text-xs text-gray-500">
        A confirmation email has been sent to
        <span className="text-blue-600"> example@email.com</span>
      </p>
    </div>
  );
}
