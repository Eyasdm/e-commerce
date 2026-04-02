"use client";

import Image from "next/image";
import { Star, ShoppingCart, Loader2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Recommended } from "@/components/cart/Recommended";
import { useProduct } from "@/lib/hooks/useProduct";
import { useProductReviews } from "@/lib/hooks/useProductReviews";
import { useAddToCart } from "@/lib/hooks/cart/useAddToCart";
import { useCart } from "@/lib/hooks/cart/useCart";
import { useAuth } from "@/context/AuthContext";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { data: product, isLoading, error } = useProduct(id);
  console.log("id:", id, "product:", product, "error:", error); // 👈

  const { data: reviews = [] } = useProductReviews(id);
  const { mutate: addToCart, isPending } = useAddToCart();
  const { data: cart = [] } = useCart();
  const [added, setAdded] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  const productId = product?.id || product?._id;
  const alreadyInCart = cart.some((item) => item.productId === productId);

  const imageUrl = product
    ? `${process.env.NEXT_PUBLIC_BASE_API_URL}${product.image}`
    : null;

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.error("Please login to add items to cart");
      router.push("/auth");
      return;
    }
    if (alreadyInCart) {
      router.push("/cart");
      return;
    }
    addToCart(
      { productId, quantity: 1 },
      {
        onSuccess: () => {
          setAdded(true);
          setTimeout(() => setAdded(false), 2000);
        },
      },
    );
  };

  const buttonContent = () => {
    if (alreadyInCart)
      return (
        <>
          <Check size={16} /> Go to Cart
        </>
      );
    if (isPending)
      return (
        <>
          <Loader2 size={16} className="animate-spin" /> Adding...
        </>
      );
    if (added)
      return (
        <>
          <Check size={16} /> Added!
        </>
      );
    return (
      <>
        <ShoppingCart size={16} /> Add to Cart
      </>
    );
  };

  if (isLoading)
    return (
      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid lg:grid-cols-2 gap-10">
          <div className="h-96 bg-gray-200 animate-pulse rounded-2xl" />
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 animate-pulse rounded w-3/4" />
            <div className="h-6 bg-gray-200 animate-pulse rounded w-1/2" />
            <div className="h-24 bg-gray-200 animate-pulse rounded" />
          </div>
        </div>
      </main>
    );

  if (error || !product)
    return (
      <main className="max-w-7xl mx-auto px-6 py-10">
        <p className="text-red-500">Product not found.</p>
      </main>
    );

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      <div className="grid lg:grid-cols-2 gap-10 mb-16">
        {/* Image */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="relative h-80 mb-4">
            <Image
              src={imageUrl}
              alt={product.name}
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Info */}
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <span className="text-sm text-blue-600 font-medium uppercase tracking-wide">
            {product.brand} · {product.category}
          </span>

          <h1 className="text-3xl font-bold mt-2 mb-3">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  fill={i < Math.round(product.rating) ? "#facc15" : "none"}
                  stroke="#facc15"
                />
              ))}
            </div>
            <span className="text-gray-500">
              {product.rating} / {reviews.length} Reviews
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-3xl font-bold">${product.price}</span>
            {product.oldPrice && (
              <span className="text-gray-400 line-through text-lg">
                ${product.oldPrice}
              </span>
            )}
            {product.discount > 0 && (
              <span className="bg-red-100 text-red-600 text-sm font-semibold px-2 py-0.5 rounded-full">
                {product.discount}% OFF
              </span>
            )}
          </div>

          <p className="text-gray-600 mb-6">{product.description}</p>

          <div
            className={`text-sm font-medium mb-6 ${product.stock > 0 ? "text-green-600" : "text-red-500"}`}
          >
            {product.stock > 0
              ? `In Stock (${product.stock} left)`
              : "Out of Stock"}
          </div>

          <div className="space-y-3">
            <Button
              onClick={handleAddToCart}
              disabled={isPending || product.stock === 0}
              className={`w-full h-12 text-lg flex items-center justify-center gap-2 rounded-full ${
                alreadyInCart
                  ? "bg-green-600 hover:bg-green-700"
                  : added
                    ? "bg-green-500 hover:bg-green-600"
                    : ""
              }`}
            >
              {buttonContent()}
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="description" className="mb-16">
        <TabsList className="mb-6">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="specs">Specifications</TabsTrigger>
          <TabsTrigger value="reviews">Reviews ({reviews.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="description">
          <p className="text-gray-600 max-w-3xl">{product.description}</p>
        </TabsContent>

        <TabsContent value="specs">
          <div className="grid md:grid-cols-2 gap-10 max-w-3xl">
            {product.specs?.map((spec, i) => (
              <div
                key={i}
                className="flex justify-between py-3 border-t border-gray-200/70"
              >
                <span className="text-gray-500">{spec.label}</span>
                <span className="font-medium text-gray-800">{spec.value}</span>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reviews">
          <div className="space-y-6 max-w-3xl">
            {reviews.length === 0 && (
              <p className="text-gray-400">No reviews yet.</p>
            )}
            {reviews.map((review) => (
              <div
                key={review._id}
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600 text-sm">
                    {review.user?.name?.[0]?.toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{review.user?.name}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex text-yellow-400 ml-auto">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        fill={i < review.rating ? "#facc15" : "none"}
                        stroke="#facc15"
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 text-sm">{review.comment}</p>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Recommended />
    </main>
  );
}
