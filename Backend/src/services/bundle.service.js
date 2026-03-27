import Bundle from "../models/bundle.model.js";

export const getAllBundles = async () => {
  const bundles = await Bundle.find({ isActive: true }).populate(
    "products",
    "name price image",
  );

  return bundles;
};

export const getBundleById = async (id) => {
  return await Bundle.findById(id).populate("products");
};

export const createBundle = async (data) => {
  return await Bundle.create(data);
};
