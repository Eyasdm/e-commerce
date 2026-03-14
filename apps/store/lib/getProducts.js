import { products } from "./mockData";

// using mock data for now
export async function getFeaturedProducts() {
  return products;
}

/*
CHANGE: after finishing the api

export async function getFeaturedProducts() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products?featured=true`,
    { cache: "no-store" }
  );

  if (!res.ok) throw new Error("Failed to fetch");

  return res.json();
}
*/
