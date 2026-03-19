import Product from "../models/product.model.js";
import * as factory from "../utils/handlerFactory.js";

export const createProduct = factory.createOne(Product);
export const deleteProduct = factory.deleteOne(Product);
export const updateProduct = factory.updateOne(Product);
export const getProduct = factory.getOne(Product);
export const getProducts = factory.getAll(Product);
