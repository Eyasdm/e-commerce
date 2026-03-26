import AppError from "./appError.js";

// ================= DELETE =================
export const deleteOne = (Model) => async (req, res, next) => {
  try {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(204).json({
      success: true,
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

// ================= UPDATE =================
export const updateOne = (Model) => async (req, res, next) => {
  try {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(200).json({
      success: true,
      data: doc,
    });
  } catch (error) {
    next(error);
  }
};

// ================= CREATE =================
export const createOne = (Model) => async (req, res, next) => {
  try {
    const doc = await Model.create(req.body);

    res.status(201).json({
      success: true,
      data: doc,
    });
  } catch (error) {
    next(error);
  }
};

// ================= GET ONE =================
export const getOne = (Model, popOptions) => async (req, res, next) => {
  try {
    let query = Model.findById(req.params.id);

    if (popOptions) query = query.populate(popOptions);

    const doc = await query;

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(200).json({
      success: true,
      data: doc,
    });
  } catch (error) {
    next(error);
  }
};

// ================= GET ALL =================
export const getAll = (Model) => async (req, res, next) => {
  try {
    const queryObj = { ...req.query };

    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    //  Build filter
    let filter = {};

    if (queryObj.category) {
      filter.category = queryObj.category;
    }

    if (queryObj.brand) {
      filter.brand = queryObj.brand;
    }

    if (queryObj.rating) {
      filter.rating = { $gte: Number(queryObj.rating) };
    }

    if (queryObj.min || queryObj.max) {
      filter.price = {};
      if (queryObj.min) filter.price.$gte = Number(queryObj.min);
      if (queryObj.max) filter.price.$lte = Number(queryObj.max);
    }

    //  Query
    let query = Model.find(filter);

    //  Sorting
    if (req.query.sort === "price-asc") {
      query = query.sort({ price: 1 });
    }

    if (req.query.sort === "price-desc") {
      query = query.sort({ price: -1 });
    }

    //  Pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    const docs = await query;

    res.status(200).json({
      success: true,
      results: docs.length,
      data: docs,
    });
  } catch (error) {
    next(error);
  }
};
