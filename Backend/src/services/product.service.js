import Product from "../models/Product.js";

export const getAllProducts = async () => {
  return await Product.find();
};
