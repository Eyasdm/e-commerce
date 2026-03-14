import Image from "next/image";

export default function PaymentMethods() {
  const payments = [
    { name: "Visa", src: "/payments/visa.svg" },
    { name: "Mastercard", src: "/payments/mastercard.svg" },
    { name: "PayPal", src: "/payments/paypal.svg" },
  ];

  return (
    <div className="flex items-center gap-3 flex-wrap  rounded-xl  bg-white ">
      {payments.map((payment) => (
        <div
          key={payment.name}
          className="
            bg-white 
            w-20 h-12
            rounded-xl
            shadow-sm
            flex items-center justify-center
            p-3
            transition-all duration-200"
          //  hover:shadow-md hover:scale-105
        >
          <Image
            src={payment.src}
            alt={payment.name}
            width={48}
            height={24}
            className="object-contain"
          />
        </div>
      ))}
    </div>
  );
}
