import * as productService from "../services/product.service.js";

export const getProducts = async (req, res) => {
  const products = await productService.getAllProducts();
  res.json(products);
};
