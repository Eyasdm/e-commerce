import Product from "../models/product.model.js";
import * as factory from "../utils/handlerFactory.js";
import { getAllProducts } from "../services/product.service.js";

export const createProduct = factory.createOne(Product);
export const deleteProduct = factory.deleteOne(Product);
export const updateProduct = factory.updateOne(Product);
export const getProduct = factory.getOne(Product);

// export const getProducts = factory.getAll(Product);
export const getProducts = async (req, res, next) => {
  try {
    const result = await getAllProducts(req.query);

    res.status(200).json({
      success: true,
      results: result.products.length,
      total: result.total,
      page: result.page,
      pages: result.pages,
      data: result.products,
    });
  } catch (error) {
    next(error);
  }
};
