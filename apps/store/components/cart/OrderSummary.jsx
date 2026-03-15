import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function OrderSummary() {
  return (
    <Card className="sticky top-24 h-fit border-0 shadow-lg ">
      <CardHeader className="font-semibold text-lg">Order Summary</CardHeader>

      <CardContent className="space-y-4">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>$352</span>
        </div>

        <div className="flex justify-between">
          <span>Discount</span>
          <span>- $45</span>
        </div>

        <div className="flex justify-between">
          <span>Shipping</span>
          <span>$5</span>
        </div>

        <div className="flex justify-between">
          <span>Tax</span>
          <span>$10.5</span>
        </div>

        <hr />

        <div className="flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span>$322</span>
        </div>

        <Button className="w-full mt-4">Proceed to Checkout</Button>
      </CardContent>
    </Card>
  );
}
