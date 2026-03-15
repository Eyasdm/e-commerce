"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Review } from "@/components/Review";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Recommended } from "@/components/cart/Recommended";

export default function ProductPage() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      {/* Product Section */}
      <div className="grid lg:grid-cols-2 gap-10 mb-16">
        {/* Images */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="relative h-100 mb-6">
            <Image
              src="/products/headphones.png"
              alt="product"
              fill
              className="object-contain"
            />
          </div>

          {/* Thumbnails */}
          <div className="flex gap-3">
            {[
              "/products/headphones.png",
              "/products/headphones-white.png",
              "/products/headphones-black.png",
            ].map((img, i) => (
              <div key={i} className="border rounded-lg p-2">
                <Image src={img} alt="" width={60} height={60} />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <h1 className="text-3xl font-bold mb-3">
            TechNest X-300 Wireless Headphones
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill="#facc15" stroke="#facc15" />
              ))}
            </div>

            <span className="text-gray-500">4.8 / 124 Reviews</span>
          </div>

          {/* Price */}
          <div className="text-3xl font-bold mb-6">$199.99</div>

          {/* Description */}
          <p className="text-gray-600 mb-6">
            Premium noise-cancelling wireless headphones with 30hr battery life.
          </p>

          {/* Stock */}
          <div className="text-green-600 mb-6 font-medium">In Stock</div>

          {/* Buttons */}
          <div className="space-y-3">
            <Button className="w-full h-12 text-lg">Add to Cart</Button>

            <Button variant="outline" className="w-full h-12 text-lg">
              Buy Now
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="description" className="mb-16">
        <TabsList className="mb-6">
          <TabsTrigger value="description">Description</TabsTrigger>

          <TabsTrigger value="specs">Specifications</TabsTrigger>

          <TabsTrigger value="reviews">Reviews (124)</TabsTrigger>
        </TabsList>

        {/* Description */}
        <TabsContent value="description">
          <p className="text-gray-600 max-w-3xl">
            Experience exceptional sound quality with the TechNest X-300
            Wireless Headphones. These premium headphones offer advanced
            noise-cancelling technology, 30 hours of battery life, and a
            comfortable over-ear design perfect for long listening sessions.
          </p>
        </TabsContent>

        {/* Specifications */}
        <TabsContent value="specs">
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl">
            <Spec label="Brand" value="TechNest" />
            <Spec label="Model" value="X-300" />
            <Spec label="Battery Life" value="30 Hours" />
            <Spec label="Connectivity" value="Bluetooth 5.2" />
            <Spec label="Noise Cancelling" value="Active ANC" />
            <Spec label="Weight" value="245g" />
          </div>
        </TabsContent>

        {/* Reviews */}
        <TabsContent value="reviews">
          <div className="space-y-6 max-w-3xl">
            <Review
              name="John Carter"
              rating={5}
              comment="Amazing sound quality and battery life. Highly recommended!"
            />

            <Review
              name="Sarah Williams"
              rating={4}
              comment="Very comfortable headphones with great ANC."
            />

            <Review
              name="Michael Brown"
              rating={5}
              comment="Best wireless headphones I have used so far."
            />
          </div>
        </TabsContent>
      </Tabs>

      {/* Recommended */}
      <Recommended />
    </main>
  );
}

function Spec({ label, value }) {
  return (
    <div className="flex justify-between py-3 border-t border-gray-200/70">
      <span className="text-gray-800">{label}</span>
      <span className="font-medium text-gray-650">{value}</span>
    </div>
  );
}
