"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";

export default function CartItem({ item }) {
  const increase = useCartStore((s) => s.increase);
  const decrease = useCartStore((s) => s.decrease);
  const remove = useCartStore((s) => s.remove);

  const total = item.price * item.quantity;

  return (
    <div className="flex items-center gap-6 bg-white rounded-xl p-4 shadow-sm">
      {/* Product */}
      <div className="flex items-center gap-4 flex-1">
        <Image
          src={item.image}
          alt={item.name}
          width={80}
          height={80}
          className="rounded-lg"
        />

        <div className="min-w-0">
          <h3 className="font-semibold truncate">{item.name}</h3>

          <p className="text-muted-foreground">${item.price}</p>
        </div>
      </div>

      {/* Quantity */}
      <div className="flex items-center gap-3">
        <Button size="icon" variant="outline" onClick={() => decrease(item.id)}>
          <Minus size={16} />
        </Button>

        <span className="font-medium w-6 text-center">{item.quantity}</span>

        <Button size="icon" variant="outline" onClick={() => increase(item.id)}>
          <Plus size={16} />
        </Button>
      </div>

      {/* Price */}
      <div className="font-semibold text-lg w-20 text-right">${total}</div>

      {/* Remove */}
      <Button variant="ghost" size="icon" onClick={() => remove(item.id)}>
        <Trash size={18} />
      </Button>
    </div>
  );
}
