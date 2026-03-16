export default function PaymentInfo() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm flex items-center justify-between">
      <div>
        <p className="font-semibold">Payment Information</p>

        <p className="text-gray-500">VISA •••• 4242</p>
      </div>

      <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm">
        Paid
      </span>
    </div>
  );
}
