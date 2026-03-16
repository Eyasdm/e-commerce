export default function OrderSummary() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm space-y-4">
      <h3 className="font-semibold">Order Summary</h3>

      <div className="flex justify-between">
        <span>Subtotal</span>
        <span>$770</span>
      </div>

      <div className="flex justify-between">
        <span>Shipping</span>
        <span>$15</span>
      </div>

      <div className="flex justify-between">
        <span>Tax</span>
        <span>$5</span>
      </div>

      <div className="flex justify-between">
        <span>Discount</span>
        <span>- $50</span>
      </div>

      <hr className="border-t border-gray-200/70" />

      <div className="flex justify-between font-semibold text-lg">
        <span>Total</span>
        <span>$740</span>
      </div>
    </div>
  );
}
