import * as bundleService from "../services/bundle.service.js";

// ================= GET ALL BUNDLES =================
export const getBundles = async (req, res, next) => {
  try {
    const bundles = await bundleService.getAllBundles();

    res.status(200).json({
      success: true,
      results: bundles.length,
      data: bundles,
    });
  } catch (err) {
    next(err);
  }
};

// ================= GET SINGLE BUNDLE =================
export const getBundle = async (req, res, next) => {
  try {
    const bundle = await bundleService.getBundleById(req.params.id);

    if (!bundle) {
      return res.status(404).json({ message: "Bundle not found" });
    }

    res.status(200).json({
      success: true,
      data: bundle,
    });
  } catch (err) {
    next(err);
  }
};

// ================= CREATE BUNDLE =================
export const createBundle = async (req, res, next) => {
  try {
    const bundle = await bundleService.createBundle(req.body);

    res.status(201).json({
      success: true,
      data: bundle,
    });
  } catch (err) {
    next(err);
  }
};
